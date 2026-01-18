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
      kc_value: number;
      density: number;
    }>;

    const result = await sql`
      UPDATE custom_materials
      SET 
        name = COALESCE(${payload.name ?? null}, name),
        kc_value = COALESCE(${payload.kc_value ?? null}, kc_value),
        density = COALESCE(${payload.density ?? null}, density),
        updated_at = NOW()
      WHERE id = ${id} AND company_id = ${companyId}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ detail: "Not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /api/library/materials/[id] error:", error);
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
      DELETE FROM custom_materials
      WHERE id = ${id} AND company_id = ${companyId}
      RETURNING id
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ detail: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/library/materials/[id] error:", error);
    return NextResponse.json({ detail: "Database error" }, { status: 500 });
  }
}
