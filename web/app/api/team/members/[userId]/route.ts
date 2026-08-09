import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkAdminFetch } from "../../_clerk";

export async function DELETE(_req: Request, ctx: { params: Promise<{ userId: string }> }) {
  const { userId: requestingUserId, orgId, orgRole } = await auth();
  if (!requestingUserId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  if (!orgId) return NextResponse.json({ detail: "No active organization" }, { status: 400 });
  if (orgRole !== "org:admin") return NextResponse.json({ detail: "Forbidden" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!userId) return NextResponse.json({ detail: "userId is required" }, { status: 400 });

  const res = await clerkAdminFetch(`/organizations/${orgId}/memberships/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const json = await res.json().catch(() => null);
    return NextResponse.json({ detail: json?.errors?.[0]?.message ?? "Remove failed" }, { status: res.status });
  }

  return NextResponse.json({ ok: true });
}
