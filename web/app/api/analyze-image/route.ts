import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Known machine types with their specifications
const MACHINE_DATABASE: Record<
  string,
  {
    type: string;
    category: string;
    standby_power_kw: number;
    operating_power_kw: number;
    efficiency_percent: number;
    description: string;
  }
> = {
  cnc_machine: {
    type: "CNC Machine",
    category: "machining",
    standby_power_kw: 2.0,
    operating_power_kw: 15.0,
    efficiency_percent: 85,
    description: "Computer Numerical Control machining center",
  },
  lathe: {
    type: "Lathe",
    category: "machining",
    standby_power_kw: 1.5,
    operating_power_kw: 12.0,
    efficiency_percent: 80,
    description: "Turning/lathe machine for cylindrical parts",
  },
  milling_machine: {
    type: "Milling Machine",
    category: "machining",
    standby_power_kw: 1.8,
    operating_power_kw: 18.0,
    efficiency_percent: 82,
    description: "Milling machine for cutting and shaping",
  },
  drill_press: {
    type: "Drill Press",
    category: "machining",
    standby_power_kw: 0.5,
    operating_power_kw: 3.0,
    efficiency_percent: 90,
    description: "Drilling machine for creating holes",
  },
  welding_machine: {
    type: "Welding Machine",
    category: "joining",
    standby_power_kw: 0.3,
    operating_power_kw: 8.0,
    efficiency_percent: 75,
    description: "Arc/MIG/TIG welding equipment",
  },
  "3d_printer": {
    type: "3D Printer",
    category: "additive",
    standby_power_kw: 0.2,
    operating_power_kw: 1.5,
    efficiency_percent: 95,
    description: "Additive manufacturing / 3D printing machine",
  },
  laser_cutter: {
    type: "Laser Cutter",
    category: "cutting",
    standby_power_kw: 1.0,
    operating_power_kw: 10.0,
    efficiency_percent: 70,
    description: "Laser cutting machine for precision cuts",
  },
  injection_molding: {
    type: "Injection Molding Machine",
    category: "molding",
    standby_power_kw: 5.0,
    operating_power_kw: 50.0,
    efficiency_percent: 80,
    description: "Plastic injection molding machine",
  },
  grinding_machine: {
    type: "Grinding Machine",
    category: "finishing",
    standby_power_kw: 1.2,
    operating_power_kw: 8.0,
    efficiency_percent: 85,
    description: "Surface/cylindrical grinding machine",
  },
  press_brake: {
    type: "Press Brake",
    category: "forming",
    standby_power_kw: 2.0,
    operating_power_kw: 25.0,
    efficiency_percent: 78,
    description: "Metal bending/forming press brake",
  },
  compressor: {
    type: "Air Compressor",
    category: "utility",
    standby_power_kw: 1.0,
    operating_power_kw: 15.0,
    efficiency_percent: 70,
    description: "Industrial air compressor",
  },
  conveyor: {
    type: "Conveyor System",
    category: "material_handling",
    standby_power_kw: 0.5,
    operating_power_kw: 5.0,
    efficiency_percent: 90,
    description: "Material handling conveyor belt system",
  },
  robot_arm: {
    type: "Industrial Robot",
    category: "automation",
    standby_power_kw: 0.8,
    operating_power_kw: 6.0,
    efficiency_percent: 92,
    description: "Industrial robotic arm/manipulator",
  },
  unknown: {
    type: "Unknown Machine",
    category: "other",
    standby_power_kw: 2.0,
    operating_power_kw: 10.0,
    efficiency_percent: 80,
    description: "Unidentified manufacturing equipment",
  },
};

// Turkey grid carbon intensity (kg CO2 / kWh)
const CARBON_INTENSITY = 0.44;

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

// Models to try in order (fallback chain)
const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.0-flash", 
  "gemini-2.5-flash-lite",
  "gemini-3-flash-preview",
];

async function tryGeminiModel(
  model: string,
  apiKey: string,
  base64Image: string,
  mimeType: string
): Promise<{ success: boolean; result?: any; error?: string }> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `What type of manufacturing machine is this? Reply ONLY with this JSON format, no other text:
{"machine_type":"cnc_machine","confidence":0.95,"brand":null,"model":null,"description":"CNC router machine"}

Valid machine_type values: cnc_machine, lathe, milling_machine, drill_press, welding_machine, 3d_printer, laser_cutter, injection_molding, grinding_machine, press_brake, compressor, conveyor, robot_arm, unknown`,
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 150,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Model ${model} failed:`, response.status);
      return { success: false, error: `${response.status}: ${errorText.substring(0, 100)}` };
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!content) {
      return { success: false, error: "No content in response" };
    }

    console.log(`Model ${model} response:`, content);

    // Try to parse JSON
    const jsonMatch = content.match(/\{[^{}]*\}/);
    if (!jsonMatch) {
      return { success: false, error: "No JSON found" };
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return { success: true, result: parsed };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

async function analyzeImageWithGemini(
  base64Image: string,
  mimeType: string
): Promise<{
  machine_key: string;
  confidence: number;
  description: string;
  detected_brand?: string;
  detected_model?: string;
  additional_info?: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      machine_key: "unknown",
      confidence: 0.5,
      description: "Gemini API key not configured. Please add GEMINI_API_KEY to environment variables.",
      additional_info: "Manual machine selection required.",
    };
  }

  // Try each model in order
  for (const model of GEMINI_MODELS) {
    console.log(`Trying model: ${model}`);
    const result = await tryGeminiModel(model, apiKey, base64Image, mimeType);
    
    if (result.success && result.result) {
      console.log(`Success with model: ${model}`);
      return {
        machine_key: result.result.machine_type || "unknown",
        confidence: result.result.confidence || 0.8,
        description: result.result.description || "Machine identified",
        detected_brand: result.result.brand || undefined,
        detected_model: result.result.model || undefined,
        additional_info: `Analyzed with ${model}`,
      };
    }
    console.log(`Model ${model} failed: ${result.error}`);
  }

  // All models failed
  return {
    machine_key: "unknown",
    confidence: 0.3,
    description: "Could not analyze image with any model. Please select machine type manually.",
    additional_info: "All Gemini models failed",
  };
}

export async function POST(req: Request) {
  if (isClerkConfigured()) {
    try {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  }

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ detail: "No image provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ detail: "File must be an image" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ detail: "Image must be less than 10MB" }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Analyze image with Gemini Vision
    const analysis = await analyzeImageWithGemini(base64, file.type);

    // Get machine specifications
    const machineSpec = MACHINE_DATABASE[analysis.machine_key] || MACHINE_DATABASE["unknown"];

    return NextResponse.json({
      success: true,
      analysis: {
        machine_type: machineSpec.type,
        machine_key: analysis.machine_key,
        category: machineSpec.category,
        confidence: analysis.confidence,
        confidence_percent: Math.round(analysis.confidence * 100),
        description: analysis.description,
        detected_brand: analysis.detected_brand,
        detected_model: analysis.detected_model,
        additional_info: analysis.additional_info,
      },
      specifications: {
        standby_power_kw: machineSpec.standby_power_kw,
        operating_power_kw: machineSpec.operating_power_kw,
        efficiency_percent: machineSpec.efficiency_percent,
        description: machineSpec.description,
      },
      carbon_intensity: CARBON_INTENSITY,
      available_machines: Object.entries(MACHINE_DATABASE).map(([key, spec]) => ({
        key,
        type: spec.type,
        category: spec.category,
      })),
    });
  } catch (error) {
    console.error("Image analysis error:", error);
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Image analysis failed" },
      { status: 500 }
    );
  }
}

// Calculate carbon for a machine based on operating time
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { machine_key, operating_hours, standby_hours = 0, custom_power_kw } = body;

    if (!machine_key || operating_hours === undefined) {
      return NextResponse.json(
        { detail: "machine_key and operating_hours are required" },
        { status: 400 }
      );
    }

    const machineSpec = MACHINE_DATABASE[machine_key] || MACHINE_DATABASE["unknown"];

    // Use custom power if provided, otherwise use default
    const operatingPower = custom_power_kw || machineSpec.operating_power_kw;
    const standbyPower = machineSpec.standby_power_kw;

    // Calculate energy consumption
    const operatingEnergy = operatingPower * operating_hours;
    const standbyEnergy = standbyPower * standby_hours;
    const totalEnergy = operatingEnergy + standbyEnergy;

    // Calculate carbon emissions
    const operatingCarbon = operatingEnergy * CARBON_INTENSITY;
    const standbyCarbon = standbyEnergy * CARBON_INTENSITY;
    const totalCarbon = totalEnergy * CARBON_INTENSITY;

    return NextResponse.json({
      success: true,
      machine: {
        type: machineSpec.type,
        category: machineSpec.category,
        operating_power_kw: operatingPower,
        standby_power_kw: standbyPower,
        efficiency_percent: machineSpec.efficiency_percent,
      },
      input: {
        operating_hours,
        standby_hours,
      },
      energy: {
        operating_energy_kwh: Math.round(operatingEnergy * 1000) / 1000,
        standby_energy_kwh: Math.round(standbyEnergy * 1000) / 1000,
        total_energy_kwh: Math.round(totalEnergy * 1000) / 1000,
      },
      carbon: {
        operating_carbon_kg: Math.round(operatingCarbon * 10000) / 10000,
        standby_carbon_kg: Math.round(standbyCarbon * 10000) / 10000,
        total_carbon_kg: Math.round(totalCarbon * 10000) / 10000,
        carbon_intensity: CARBON_INTENSITY,
      },
      equivalents: {
        trees_needed_yearly: Math.round((totalCarbon / 21) * 100) / 100, // 1 tree absorbs ~21kg CO2/year
        car_km_equivalent: Math.round((totalCarbon / 0.21) * 10) / 10, // ~0.21 kg CO2 per km
        smartphone_charges: Math.round(totalEnergy * 100), // ~0.01 kWh per charge
      },
    });
  } catch (error) {
    console.error("Calculation error:", error);
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Calculation failed" },
      { status: 500 }
    );
  }
}
