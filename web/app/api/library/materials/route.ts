import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateCompanyId, getSupabaseAdminEnv, supabaseAdminFetch } from "../_supabase";

function isClerkConfigured() {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const sk = process.env.CLERK_SECRET_KEY;
  return (
    typeof pk === "string" &&
    pk.startsWith("pk_") &&
    pk.length >= 20 &&
    !pk.includes("XXXX") &&
    !pk.includes("xxxxxxxx") &&
    typeof sk === "string" &&
    sk.startsWith("sk_") &&
    sk.length >= 20 &&
    !sk.includes("XXXX") &&
    !sk.includes("xxxxxxxx")
  );
}

export async function GET() {
  const env = getSupabaseAdminEnv();
  if (!env) return NextResponse.json({ detail: "Supabase not configured" }, { status: 503 });

  if (!isClerkConfigured()) {
    return NextResponse.json({ detail: "Auth not configured", materials: [] }, { status: 200 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(env, userId);

    const res = await supabaseAdminFetch(
      env,
      `custom_materials?select=id,company_id,name,kc_value,density,created_at,updated_at&company_id=eq.${companyId}&order=created_at.desc`,
    );

    const contentType = res.headers.get("content-type") ?? "application/json";
    const body = contentType.includes("application/json") ? await res.json() : await res.text();

    return NextResponse.json(body, { status: res.status });
  } catch (error) {
    console.error("GET /api/library/materials error:", error);
    return NextResponse.json({ detail: "Auth not available or failed", materials: [] }, { status: 200 });
  }
}

export async function POST(req: Request) {
  const env = getSupabaseAdminEnv();
  if (!env) return NextResponse.json({ detail: "Supabase not configured" }, { status: 503 });

  if (!isClerkConfigured()) {
    return NextResponse.json({ detail: "Auth not configured" }, { status: 401 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(env, userId);

    const payload = (await req.json()) as {
      name: string;
      kc_value: number;
      density: number;
    };

    const res = await supabaseAdminFetch(env, "custom_materials", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ ...payload, company_id: companyId }),
    });

    const contentType = res.headers.get("content-type") ?? "application/json";
    const body = contentType.includes("application/json") ? await res.json() : await res.text();

    return NextResponse.json(body, { status: res.status });
  } catch (error) {
    console.error("POST /api/library/materials error:", error);
    return NextResponse.json({ detail: "Auth not available or failed" }, { status: 401 });
  }
}
