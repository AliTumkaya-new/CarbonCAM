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
      SELECT id, company_id, name, kc_value, density, created_at, updated_at
      FROM custom_materials
      WHERE company_id = ${companyId}
      ORDER BY created_at DESC
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/library/materials error:", error);
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
      kc_value: number;
      density: number;
    };

    if (!payload.name?.trim()) {
      return NextResponse.json({ detail: "Material name is required" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO custom_materials (company_id, name, kc_value, density)
      VALUES (${companyId}, ${payload.name}, ${payload.kc_value}, ${payload.density})
      RETURNING *
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/library/materials error:", error);
    return NextResponse.json({ detail: "Database error" }, { status: 500 });
  }
}
