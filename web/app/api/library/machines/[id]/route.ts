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

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isClerkConfigured()) {
    return NextResponse.json({ detail: "Auth not configured" }, { status: 401 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(userId);
    const { id } = await ctx.params;

    const payload = (await req.json()) as Partial<{
      name: string;
      brand: string;
      standby_power_kw: number;
      max_power_kw: number;
      efficiency_percent: number;
    }>;

    const result = await sql`
      UPDATE custom_machines
      SET 
        name = COALESCE(${payload.name ?? null}, name),
        brand = COALESCE(${payload.brand ?? null}, brand),
        standby_power_kw = COALESCE(${payload.standby_power_kw ?? null}, standby_power_kw),
        max_power_kw = COALESCE(${payload.max_power_kw ?? null}, max_power_kw),
        efficiency_percent = COALESCE(${payload.efficiency_percent ?? null}, efficiency_percent),
        updated_at = NOW()
      WHERE id = ${id} AND company_id = ${companyId}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ detail: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /api/library/machines/[id] error:", error);
    return NextResponse.json({ detail: "Database error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isClerkConfigured()) {
    return NextResponse.json({ detail: "Auth not configured" }, { status: 401 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(userId);
    const { id } = await ctx.params;

    const result = await sql`
      DELETE FROM custom_machines
      WHERE id = ${id} AND company_id = ${companyId}
      RETURNING id
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ detail: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/library/machines/[id] error:", error);
    return NextResponse.json({ detail: "Database error" }, { status: 500 });
  }
}
