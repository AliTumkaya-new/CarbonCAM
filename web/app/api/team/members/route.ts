import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkAdminFetch } from "../_clerk";

export async function GET() {
  const { userId, orgId, orgRole } = await auth();
  if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  if (!orgId) return NextResponse.json({ detail: "No active organization" }, { status: 400 });

  // Admin dışındaki rollerin üye listesini görmesini istemiyorsanız burada kısıtlayın.
  // Bu prompt'ta Engineer da takım görebilir mi belirsiz; en basit yorum: sadece Admin görür.
  if (orgRole !== "org:admin") {
    return NextResponse.json({ detail: "Forbidden" }, { status: 403 });
  }

  const membershipsRes = await clerkAdminFetch(`/organizations/${orgId}/memberships?limit=100`);
  const invitationsRes = await clerkAdminFetch(`/organizations/${orgId}/invitations/pending?limit=100`);

  const membershipsJson = await membershipsRes.json().catch(() => null);
  const invitationsJson = await invitationsRes.json().catch(() => null);

  if (!membershipsRes.ok) {
    return NextResponse.json(
      { detail: membershipsJson?.errors?.[0]?.message ?? "Memberships fetch failed" },
      { status: membershipsRes.status },
    );
  }

  if (!invitationsRes.ok) {
    return NextResponse.json(
      { detail: invitationsJson?.errors?.[0]?.message ?? "Invitations fetch failed" },
      { status: invitationsRes.status },
    );
  }

  return NextResponse.json({ memberships: membershipsJson, invitations: invitationsJson });
}
