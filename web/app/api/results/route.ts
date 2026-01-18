import { getOrCreateCompanyId, sql } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function isClerkConfigured() {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const sk = process.env.CLERK_SECRET_KEY;
  return (
    typeof pk === "string" &&
    pk.startsWith("pk_") &&
    pk.length >= 20 &&
    !pk.includes("XXXX") &&
    typeof sk === "string" &&
    sk.startsWith("sk_") &&
    sk.length >= 20 &&
    !sk.includes("XXXX")
  );
}

export async function GET() {
  if (!isClerkConfigured()) {
    return NextResponse.json({
      calculations: [],
      summary: { total: 0, totalCarbon: 0, totalEnergy: 0 },
    });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(userId);

    // Get calculations
    const result = await sql`
      SELECT 
        id, machine_name, material_name,
        initial_weight_kg, final_weight_kg, process_time_minutes,
        total_energy_kwh, total_carbon_kg, carbon_intensity,
        created_at
      FROM calculations
      WHERE company_id = ${companyId}
      ORDER BY created_at DESC
      LIMIT 100
    `;

    // Get summary
    const summaryResult = await sql`
      SELECT 
        COUNT(*) as total,
        COALESCE(SUM(total_carbon_kg), 0) as total_carbon,
        COALESCE(SUM(total_energy_kwh), 0) as total_energy
      FROM calculations
      WHERE company_id = ${companyId}
    `;

    const summary = summaryResult.rows[0] || { total: 0, total_carbon: 0, total_energy: 0 };

    return NextResponse.json({
      calculations: result.rows,
      summary: {
        total: parseInt(summary.total) || 0,
        totalCarbon: parseFloat(summary.total_carbon) || 0,
        totalEnergy: parseFloat(summary.total_energy) || 0,
      },
    });
  } catch (error) {
    console.error("GET /api/results error:", error);
    return NextResponse.json({
      calculations: [],
      summary: { total: 0, totalCarbon: 0, totalEnergy: 0 },
    });
  }
}

// POST endpoint for saving AI photo analysis results
export async function POST(req: Request) {
  console.log("POST /api/results called");

  try {
    const body = await req.json();
    console.log("Request body:", body);

    const {
      machine_name,
      machine_type,
      brand,
      model,
      power_kw,
      operating_hours,
      standby_hours,
      total_energy_kwh,
      total_carbon_kg,
      source = "ai_photo_analysis",
    } = body;

    // Validate required fields
    if (!machine_name || total_energy_kwh === undefined || total_carbon_kg === undefined) {
      console.log("Missing required fields");
      return NextResponse.json({ detail: "Missing required fields" }, { status: 400 });
    }

    // Check if Clerk is configured
    if (!isClerkConfigured()) {
      console.log("Clerk not configured, returning success without saving");
      return NextResponse.json({
        ok: true,
        calculation_id: null,
        message: "Calculation completed (not saved - auth not configured)",
      });
    }

    const { userId } = await auth();
    if (!userId) {
      console.log("User not authenticated");
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    console.log("User authenticated:", userId);
    const companyId = await getOrCreateCompanyId(userId);
    console.log("Company ID:", companyId);

    // Insert into calculations table
    const result = await sql`
      INSERT INTO calculations (
        company_id, user_id, machine_name, material_name,
        initial_weight_kg, final_weight_kg, process_time_minutes,
        total_energy_kwh, total_carbon_kg, carbon_intensity
      )
      VALUES (
        ${companyId}, ${userId}, 
        ${machine_name},
        ${source === "ai_photo_analysis" ? "AI Photo Analysis" : "Manual Entry"},
        ${power_kw || 0}, 
        ${operating_hours || 0}, 
        ${standby_hours || 0},
        ${total_energy_kwh}, 
        ${total_carbon_kg}, 
        ${0.44}
      )
      RETURNING id
    `;

    console.log("Insert result:", result.rows);

    return NextResponse.json({
      ok: true,
      calculation_id: result.rows[0]?.id,
      message: "Calculation saved successfully",
    });
  } catch (error) {
    console.error("POST /api/results error:", error);
    return NextResponse.json(
      {
        detail: "Database error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!isClerkConfigured()) {
    return NextResponse.json({ detail: "Auth not configured" }, { status: 401 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(userId);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ detail: "ID required" }, { status: 400 });
    }

    await sql`
      DELETE FROM calculations
      WHERE id = ${id} AND company_id = ${companyId}
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/results error:", error);
    return NextResponse.json({ detail: "Database error" }, { status: 500 });
  }
}
