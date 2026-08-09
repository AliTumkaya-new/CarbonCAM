import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const maxDuration = 30;

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type EnergySource = "electricity" | "diesel" | "gasoline" | "natural_gas" | "unknown";

type EquipmentAnalysis = {
  object_name: string;
  category: string;
  energy_source: EnergySource;
  consumption_per_hour: number;
  consumption_unit: "kWh" | "L" | "m3" | "unknown";
  confidence: number;
  identification_basis: string;
  requires_nameplate: boolean;
};

type OpenAIResponse = {
  output_text?: unknown;
  output?: Array<{
    type?: unknown;
    content?: Array<{ type?: unknown; text?: unknown; refusal?: unknown }>;
  }>;
  error?: { message?: unknown; code?: unknown };
};

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  return Boolean(
    value &&
      value.startsWith(prefix) &&
      value.length >= 20 &&
      !value.includes("XXXX") &&
      !value.includes("xxxxxxxx"),
  );
}

function readOutputText(payload: OpenAIResponse) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  for (const item of payload.output ?? []) {
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        return content.text;
      }
    }
  }

  return null;
}

function isEquipmentAnalysis(value: unknown): value is EquipmentAnalysis {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<EquipmentAnalysis>;
  return (
    typeof candidate.object_name === "string" &&
    candidate.object_name.trim().length > 0 &&
    typeof candidate.category === "string" &&
    ["electricity", "diesel", "gasoline", "natural_gas", "unknown"].includes(
      String(candidate.energy_source),
    ) &&
    typeof candidate.consumption_per_hour === "number" &&
    Number.isFinite(candidate.consumption_per_hour) &&
    candidate.consumption_per_hour >= 0 &&
    ["kWh", "L", "m3", "unknown"].includes(String(candidate.consumption_unit)) &&
    typeof candidate.confidence === "number" &&
    Number.isFinite(candidate.confidence) &&
    candidate.confidence >= 0 &&
    candidate.confidence <= 1 &&
    typeof candidate.identification_basis === "string" &&
    typeof candidate.requires_nameplate === "boolean"
  );
}

async function consumeCredit(userId: string) {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return 999;

  const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/consume_monthly_credit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({ p_user_id: userId }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Credit service failed with ${response.status}`);
  }

  const value = Number(await response.json());
  if (!Number.isFinite(value)) throw new Error("Credit service returned an invalid response");
  return value;
}

async function requestAnalysis(apiKey: string, imageDataUrl: string, model: string) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      store: false,
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: [
                "You are CarbonCAM's equipment analyst.",
                "Identify the main machine, appliance, vehicle, tool, or object in the image.",
                "Estimate its normal operational energy or fuel consumption per hour.",
                "Use visible nameplate values when readable. Otherwise use a conservative, realistic typical value.",
                "For electricity return average kWh consumed in one operating hour (numerically equal to average kW).",
                "For diesel or gasoline return liters per operating hour. For natural gas return cubic meters per hour.",
                "If the object does not consume energy or cannot be identified, use unknown and zero consumption.",
                "Do not invent an exact brand or model unless it is visible. Write user-facing text in Turkish.",
              ].join(" "),
            },
          ],
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Bu fotoğraftaki ana nesneyi analiz et." },
            { type: "input_image", image_url: imageDataUrl, detail: "low" },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "carboncam_equipment_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              object_name: {
                type: "string",
                description: "Short Turkish name for the identified object",
              },
              category: {
                type: "string",
                description: "Short Turkish category such as CNC tezgahı, ev aleti, araç or el aleti",
              },
              energy_source: {
                type: "string",
                enum: ["electricity", "diesel", "gasoline", "natural_gas", "unknown"],
              },
              consumption_per_hour: {
                type: "number",
                minimum: 0,
                maximum: 10000,
                description: "Typical consumption during one hour of normal operation",
              },
              consumption_unit: {
                type: "string",
                enum: ["kWh", "L", "m3", "unknown"],
              },
              confidence: { type: "number", minimum: 0, maximum: 1 },
              identification_basis: {
                type: "string",
                description: "One concise Turkish sentence explaining visible evidence and estimation basis",
              },
              requires_nameplate: {
                type: "boolean",
                description: "True when a nameplate photo would materially improve the estimate",
              },
            },
            required: [
              "object_name",
              "category",
              "energy_source",
              "consumption_per_hour",
              "consumption_unit",
              "confidence",
              "identification_basis",
              "requires_nameplate",
            ],
          },
        },
      },
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as OpenAIResponse;
  return { response, payload };
}

export async function POST(request: Request) {
  const clerkConfigured =
    isLikelyValidClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_") &&
    isLikelyValidClerkKey(process.env.CLERK_SECRET_KEY, "sk_");
  const devAuthEnabled = process.env.CARBONCAM_DEV_AUTH === "true";

  if (!clerkConfigured && !devAuthEnabled) {
    return NextResponse.json({ detail: "Kimlik doğrulama servisi yapılandırılmamış." }, { status: 503 });
  }

  let userId = devAuthEnabled && !clerkConfigured ? "local-dev-user" : null;
  if (clerkConfigured) {
    userId = (await auth()).userId;
    if (!userId) {
      return NextResponse.json({ detail: "Fotoğraf analizi için giriş yapmalısınız." }, { status: 401 });
    }
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ detail: "Fotoğraf analiz servisi henüz yapılandırılmamış." }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ detail: "Fotoğraf verisi okunamadı." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ detail: "Lütfen bir fotoğraf seçin." }, { status: 400 });
  }
  if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ detail: "Yalnızca JPG, PNG ve WebP fotoğrafları desteklenir." }, { status: 415 });
  }
  if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ detail: "Fotoğraf 4 MB'den küçük olmalıdır." }, { status: 413 });
  }

  const imageDataUrl = `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`;
  const configuredModel = process.env.OPENAI_VISION_MODEL?.trim();
  const models = configuredModel ? [configuredModel] : ["gpt-5.4-mini", "gpt-4.1-mini"];

  try {
    let lastStatus = 502;
    let lastMessage = "Fotoğraf analiz edilemedi.";

    for (const model of models) {
      const { response, payload } = await requestAnalysis(apiKey, imageDataUrl, model);
      if (!response.ok) {
        lastStatus = response.status;
        lastMessage = typeof payload.error?.message === "string" ? payload.error.message : lastMessage;
        if ([400, 403, 404].includes(response.status) && models.length > 1) continue;
        break;
      }

      const outputText = readOutputText(payload);
      if (!outputText) {
        lastMessage = "Analiz servisi geçerli bir sonuç döndürmedi.";
        continue;
      }

      const parsed = JSON.parse(outputText) as unknown;
      if (!isEquipmentAnalysis(parsed)) {
        lastMessage = "Analiz sonucu doğrulanamadı.";
        continue;
      }

      const creditsLeft = await consumeCredit(userId ?? "local-dev-user");
      if (creditsLeft < 0) {
        return NextResponse.json({ detail: "Aylık ücretsiz analiz hakkınız tükendi." }, { status: 402 });
      }

      return NextResponse.json({ analysis: parsed, credits_left: creditsLeft, model });
    }

    console.error("Photo analysis provider error:", { status: lastStatus, message: lastMessage });
    return NextResponse.json(
      { detail: "Fotoğraf analiz servisine şu anda ulaşılamıyor. Lütfen tekrar deneyin." },
      { status: 502 },
    );
  } catch (error) {
    console.error("Photo analysis error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { detail: "Fotoğraf işlenirken beklenmeyen bir hata oluştu." },
      { status: 500 },
    );
  }
}
