import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkAdminFetch } from "../_clerk";

export async function POST(req: Request) {
  const { userId, orgId, orgRole } = await auth();
  if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  if (!orgId) return NextResponse.json({ detail: "No active organization" }, { status: 400 });
  if (orgRole !== "org:admin") return NextResponse.json({ detail: "Forbidden" }, { status: 403 });

  const body = (await req.json()) as { targetUserId: string; role: string };
  const targetUserId = (body.targetUserId ?? "").trim();
  const role = (body.role ?? "").trim();

  if (!targetUserId || !role) {
    return NextResponse.json({ detail: "targetUserId and role are required" }, { status: 400 });
  }

  // Clerk Backend API: PATCH /organizations/{organization_id}/memberships/{user_id}
  const res = await clerkAdminFetch(`/organizations/${orgId}/memberships/${targetUserId}`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json({ detail: json?.errors?.[0]?.message ?? "Role update failed" }, { status: res.status });
  }

  return NextResponse.json(json, { status: 200 });
}
