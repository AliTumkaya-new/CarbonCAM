import { getOrCreateCompanyId, sql } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Machine configurations (hardcoded for now, can be moved to database)
const MACHINES: Record<string, { name: string; standby_power_kw: number; max_power_kw: number }> = {
  cnc_1: { name: "Mazak CNC", standby_power_kw: 1.5, max_power_kw: 15 },
  cnc_2: { name: "Doosan CNC", standby_power_kw: 2.0, max_power_kw: 20 },
  cnc_3: { name: "DMG Mori", standby_power_kw: 2.5, max_power_kw: 25 },
  lathe_1: { name: "Haas Lathe", standby_power_kw: 1.2, max_power_kw: 12 },
  mill_1: { name: "Hurco Mill", standby_power_kw: 1.8, max_power_kw: 18 },
};

// Material configurations
const MATERIALS: Record<string, { name: string; kc_value: number; density: number }> = {
  mat_4140: { name: "Steel 4140", kc_value: 2400, density: 7850 },
  mat_6061: { name: "Aluminum 6061", kc_value: 900, density: 2700 },
  mat_304: { name: "Stainless 304", kc_value: 2800, density: 8000 },
  mat_titanium: { name: "Titanium Ti-6Al-4V", kc_value: 1400, density: 4430 },
  mat_brass: { name: "Brass C360", kc_value: 1200, density: 8500 },
};

// Turkey grid carbon intensity (kg CO2 / kWh)
const CARBON_INTENSITY = 0.44;

function calculateMachiningCarbon(
  initialWeightKg: number,
  finalWeightKg: number,
  processTimeMinutes: number,
  kcValue: number,
  standbyPowerKw: number,
  carbonIntensity: number,
  density: number
): {
  removed_material_weight_kg: number;
  removed_volume_cm3: number;
  processing_energy_kwh: number;
  idle_energy_kwh: number;
  total_energy_kwh: number;
  total_carbon_kg: number;
} {
  if (initialWeightKg < 0 || finalWeightKg < 0) {
    throw new Error("Weights must be non-negative.");
  }
  if (finalWeightKg > initialWeightKg) {
    throw new Error("final_weight_kg cannot be greater than initial_weight_kg.");
  }
  if (processTimeMinutes <= 0) {
    throw new Error("process_time_minutes must be > 0.");
  }

  const removedMaterialWeight = initialWeightKg - finalWeightKg;

  // removed_volume_cm3 = removed_mass(kg) / density(kg/m^3) -> m^3, then convert to cm^3
  const removedVolumeCm3 = (removedMaterialWeight / density) * 1_000_000.0;

  // Processing Energy: (Volume * Kc) / 60 / 1000 / 0.85
  const processingEnergyKwh = (removedVolumeCm3 * kcValue) / 60.0 / 1000.0 / 0.85;

  // Idle Energy: standby_power_kw * (process_time_minutes / 60)
  const idleEnergyKwh = standbyPowerKw * (processTimeMinutes / 60.0);

  const totalEnergyKwh = processingEnergyKwh + idleEnergyKwh;
  const totalCarbon = totalEnergyKwh * carbonIntensity;

  return {
    removed_material_weight_kg: removedMaterialWeight,
    removed_volume_cm3: removedVolumeCm3,
    processing_energy_kwh: processingEnergyKwh,
    idle_energy_kwh: idleEnergyKwh,
    total_energy_kwh: totalEnergyKwh,
    total_carbon_kg: totalCarbon,
  };
}

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  if (!value) return false;
  if (!value.startsWith(prefix)) return false;
  if (value.includes("XXXX") || value.includes("xxxxxxxx")) return false;
  return value.length >= 20;
}

async function getUserMetadata(orgId: string | null) {
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress ?? null;

  const name =
    user?.fullName ?? [user?.firstName, user?.lastName].filter(Boolean).join(" ") ?? null;

  let companyName: string | null = null;
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (orgId && secretKey && secretKey.startsWith("sk_") && !secretKey.includes("XXXX")) {
    try {
      const res = await fetch(`https://api.clerk.com/v1/organizations/${orgId}`, {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      });
      if (res.ok) {
        const json = (await res.json()) as unknown;
        if (typeof json === "object" && json && "name" in json) {
          companyName = String((json as { name?: unknown }).name ?? "") || null;
        }
      }
    } catch {
      // best-effort
    }
  }

  return { email, name, companyName };
}

export async function POST(req: Request) {
  const clerkConfigured =
    isLikelyValidClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_") &&
    isLikelyValidClerkKey(process.env.CLERK_SECRET_KEY, "sk_");

  let userId: string | null = null;
  let orgId: string | null = null;
  let meta = {
    email: null as string | null,
    name: null as string | null,
    companyName: null as string | null,
  };

  if (clerkConfigured) {
    try {
      const authResult = await auth();
      userId = authResult.userId;
      orgId = authResult.orgId ?? null;

      if (!userId) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
      }

      meta = await getUserMetadata(orgId);
    } catch (error) {
      console.error("Calculate auth error:", error);
      // Continue without auth metadata
    }
  }

  const body = await req.json();

  // Extract parameters from request body
  const { machine_id, material_id, initial_weight_kg, final_weight_kg, time_min } = body;

  // Validate required fields
  if (!machine_id || !material_id) {
    return NextResponse.json(
      { detail: "machine_id and material_id are required" },
      { status: 400 }
    );
  }

  // Get machine and material configurations
  const machine = MACHINES[machine_id];
  const material = MATERIALS[material_id];

  if (!machine) {
    return NextResponse.json({ detail: `Unknown machine: ${machine_id}` }, { status: 400 });
  }

  if (!material) {
    return NextResponse.json({ detail: `Unknown material: ${material_id}` }, { status: 400 });
  }

  try {
    const result = calculateMachiningCarbon(
      parseFloat(initial_weight_kg) || 0,
      parseFloat(final_weight_kg) || 0,
      parseFloat(time_min) || 0,
      material.kc_value,
      machine.standby_power_kw,
      CARBON_INTENSITY,
      material.density
    );

    // Save calculation to database if user is authenticated
    let calculationId: string | null = null;
    if (userId) {
      try {
        const companyId = await getOrCreateCompanyId(userId);
        const dbResult = await sql`
          INSERT INTO calculations (
            company_id, user_id, machine_name, material_name,
            initial_weight_kg, final_weight_kg, process_time_minutes,
            total_energy_kwh, total_carbon_kg, carbon_intensity
          )
          VALUES (
            ${companyId}, ${userId}, ${machine.name}, ${material.name},
            ${parseFloat(initial_weight_kg) || 0}, ${parseFloat(final_weight_kg) || 0}, ${parseFloat(time_min) || 0},
            ${result.total_energy_kwh}, ${result.total_carbon_kg}, ${CARBON_INTENSITY}
          )
          RETURNING id
        `;
        calculationId = dbResult.rows[0]?.id || null;
      } catch (dbError) {
        console.error("Failed to save calculation:", dbError);
        // Continue without saving - calculation still works
      }
    }

    return NextResponse.json({
      ...result,
      calculation_id: calculationId,
      machine_name: machine.name,
      material_name: material.name,
      carbon_intensity_used: CARBON_INTENSITY,
    });
  } catch (error) {
    console.error("Calculation error:", error);
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Calculation failed" },
      { status: 400 }
    );
  }
}
