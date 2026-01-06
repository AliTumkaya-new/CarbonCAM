import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
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

async function auditLog(params: {
  userId: string;
  companyId: string;
  actorName: string | null;
  actorEmail: string | null;
  action: string;
  resourceId: string | null;
}) {
  const apiBase = process.env.CARBONCAM_API_URL;
  const secret = process.env.AUDIT_LOG_SECRET;
  if (!apiBase || !secret) return;

  try {
    const { userId, companyId, actorName, actorEmail, action, resourceId } = params;
    await fetch(`${apiBase.replace(/\/+$/, "")}/internal/audit/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Audit-Secret": secret,
        "X-Carboncam-User-Id": userId,
      },
      body: JSON.stringify({
        action,
        resource_id: resourceId,
        company_id: companyId,
        actor_name: actorName,
        actor_email: actorEmail,
      }),
      cache: "no-store",
    });
  } catch {
    // best-effort
  }
}

export async function GET() {
  const env = getSupabaseAdminEnv();
  if (!env) return NextResponse.json({ detail: "Supabase not configured" }, { status: 503 });

  if (!isClerkConfigured()) {
    return NextResponse.json({ detail: "Auth not configured", machines: [] }, { status: 200 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(env, userId);

    const res = await supabaseAdminFetch(
      env,
      `custom_machines?select=id,company_id,name,brand,standby_power_kw,max_power_kw,efficiency_percent,created_at,updated_at&company_id=eq.${companyId}&order=created_at.desc`,
    );

    const contentType = res.headers.get("content-type") ?? "application/json";
    const body = contentType.includes("application/json") ? await res.json() : await res.text();

    return NextResponse.json(body, { status: res.status });
  } catch (error) {
    console.error("GET /api/library/machines error:", error);
    return NextResponse.json({ detail: "Auth not available or failed", machines: [] }, { status: 200 });
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

    const user = await currentUser();
    const actorName = user?.fullName ?? [user?.firstName, user?.lastName].filter(Boolean).join(" ") ?? null;
    const actorEmail = user?.primaryEmailAddress?.emailAddress ?? null;

    const companyId = await getOrCreateCompanyId(env, userId);

    const payload = (await req.json()) as {
      name: string;
      brand?: string;
      standby_power_kw: number;
      max_power_kw: number;
      efficiency_percent: number;
    };

    const res = await supabaseAdminFetch(env, "custom_machines", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({ ...payload, company_id: companyId }),
    });

    const contentType = res.headers.get("content-type") ?? "application/json";
    const body = contentType.includes("application/json") ? await res.json() : await res.text();

    if (res.ok && Array.isArray(body) && body[0] && typeof body[0] === "object" && "id" in body[0]) {
      await auditLog({
        userId,
        companyId,
        actorName,
        actorEmail,
        action: "custom_machine.create",
        resourceId: String((body[0] as { id?: unknown }).id ?? "") || null,
      });
    }

    return NextResponse.json(body, { status: res.status });
  } catch (error) {
    console.error("POST /api/library/machines error:", error);
    return NextResponse.json({ detail: "Auth not available or failed" }, { status: 401 });
  }
}
