import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateCompanyId, getSupabaseAdminEnv, supabaseAdminFetch } from "../../_supabase";

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const env = getSupabaseAdminEnv();
  if (!env) return NextResponse.json({ detail: "Supabase not configured" }, { status: 503 });

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const companyId = await getOrCreateCompanyId(env, userId);
  const { id } = await ctx.params;

  const payload = (await req.json()) as Partial<{
    name: string;
    kc_value: number;
    density: number;
  }>;

  const res = await supabaseAdminFetch(
    env,
    `custom_materials?id=eq.${encodeURIComponent(id)}&company_id=eq.${companyId}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload),
    },
  );

  const contentType = res.headers.get("content-type") ?? "application/json";
  const body = contentType.includes("application/json") ? await res.json() : await res.text();

  return NextResponse.json(body, { status: res.status });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const env = getSupabaseAdminEnv();
  if (!env) return NextResponse.json({ detail: "Supabase not configured" }, { status: 503 });

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

  const companyId = await getOrCreateCompanyId(env, userId);
  const { id } = await ctx.params;

  const res = await supabaseAdminFetch(
    env,
    `custom_materials?id=eq.${encodeURIComponent(id)}&company_id=eq.${companyId}`,
    { method: "DELETE" },
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ detail: text }, { status: res.status });
  }

  return NextResponse.json({ ok: true });
}
