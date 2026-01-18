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
    return NextResponse.json([], { status: 200 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(userId);

    const result = await sql`
      SELECT id, company_id, name, brand, standby_power_kw, max_power_kw, efficiency_percent, created_at, updated_at
      FROM custom_machines
      WHERE company_id = ${companyId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/library/machines error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  if (!isClerkConfigured()) {
    return NextResponse.json({ detail: "Auth not configured" }, { status: 401 });
  }

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });

    const companyId = await getOrCreateCompanyId(userId);

    const payload = (await req.json()) as {
      name: string;
      brand?: string;
      standby_power_kw: number;
      max_power_kw: number;
      efficiency_percent: number;
    };

    if (!payload.name?.trim()) {
      return NextResponse.json({ detail: "Machine name is required" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO custom_machines (company_id, name, brand, standby_power_kw, max_power_kw, efficiency_percent)
      VALUES (${companyId}, ${payload.name}, ${payload.brand || null}, ${payload.standby_power_kw}, ${payload.max_power_kw}, ${payload.efficiency_percent})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/library/machines error:", error);
    return NextResponse.json({ detail: "Database error" }, { status: 500 });
  }
}
