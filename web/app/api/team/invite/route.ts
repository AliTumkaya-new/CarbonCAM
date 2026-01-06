import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { clerkAdminFetch } from "../_clerk";
import { getOrCreateCompanyId, getSupabaseAdminEnv } from "../../library/_supabase";

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

export async function POST(req: Request) {
  const { userId, orgId, orgRole } = await auth();
  if (!userId) return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  if (!orgId) return NextResponse.json({ detail: "No active organization" }, { status: 400 });
  if (orgRole !== "org:admin") return NextResponse.json({ detail: "Forbidden" }, { status: 403 });

  const env = getSupabaseAdminEnv();
  const companyId = env ? await getOrCreateCompanyId(env, userId) : null;

  const user = await currentUser();
  const actorName = user?.fullName ?? [user?.firstName, user?.lastName].filter(Boolean).join(" ") ?? null;
  const actorEmail = user?.primaryEmailAddress?.emailAddress ?? null;

  const body = (await req.json()) as { email: string; role: string };
  const email = (body.email ?? "").trim();
  const role = (body.role ?? "org:member").trim();

  if (!email) return NextResponse.json({ detail: "Email is required" }, { status: 400 });

  // Not: redirect_url opsiyonel. Davet linki açılınca nereye dönsün?
  const redirectUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`
    : undefined;

  const res = await clerkAdminFetch(`/organizations/${orgId}/invitations`, {
    method: "POST",
    body: JSON.stringify({
      inviter_user_id: userId,
      email_address: email,
      role,
      ...(redirectUrl ? { redirect_url: redirectUrl } : null),
    }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json({ detail: json?.errors?.[0]?.message ?? "Invite failed" }, { status: res.status });
  }

  if (companyId) {
    await auditLog({
      userId,
      companyId,
      actorName,
      actorEmail,
      action: "team.invite",
      resourceId: email,
    });
  }

  return NextResponse.json(json, { status: 200 });
}
