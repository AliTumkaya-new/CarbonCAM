import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getCarboncamApiBase } from "@/lib/carboncam-api";

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  if (!value) return false;
  if (!value.startsWith(prefix)) return false;
  if (value.includes("XXXX") || value.includes("xxxxxxxx")) return false;
  return value.length >= 20;
}

async function getUserMetadata(orgId: string | null) {
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    null;

  const name =
    user?.fullName ??
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ??
    null;

  let companyName: string | null = null;
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (orgId && secretKey && secretKey.startsWith("sk_") && !secretKey.includes("XXXX")) {
    try {
      const res = await fetch(`https://api.clerk.com/v1/organizations/${orgId}`, {
        headers: { Authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      });
      if (res.ok) {
        const json = (await res.json()) as unknown;
        if (typeof json === "object" && json && "name" in json) {
          companyName = String((json as { name?: unknown }).name ?? "") || null;
        }
      }
    } catch {
      // best-effort
    }
  }

  return { email, name, companyName };
}

export async function POST(req: Request) {
  const clerkConfigured =
    isLikelyValidClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_") &&
    isLikelyValidClerkKey(process.env.CLERK_SECRET_KEY, "sk_");

  const devAuthEnabled = process.env.CARBONCAM_DEV_AUTH === "true";
  if (!clerkConfigured && !devAuthEnabled) {
    return NextResponse.json({ detail: "Authentication service is not configured" }, { status: 503 });
  }

  // Local bypass is explicit so a deployment with missing Clerk keys fails closed.
  let userId: string | null = devAuthEnabled && !clerkConfigured ? "local-dev-user" : null;
  let orgId: string | null = null;
  let meta = { email: null as string | null, name: null as string | null, companyName: null as string | null };

  if (clerkConfigured) {
    const authResult = await auth();
    userId = authResult.userId;
    orgId = authResult.orgId ?? null;

    if (!userId) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }

    try {
      meta = await getUserMetadata(orgId);
    } catch (error) {
      console.error("Calculate user metadata error:", error);
    }
  }

  const body = await req.json();

  const apiBase = getCarboncamApiBase();
  
  try {
    const upstream = await fetch(`${apiBase}/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(userId ? { "X-Carboncam-User-Id": userId } : {}),
        ...(meta.email ? { "X-Carboncam-User-Email": meta.email } : {}),
        ...(meta.name ? { "X-Carboncam-User-Name": meta.name } : {}),
        ...(meta.companyName ? { "X-Carboncam-Company-Name": meta.companyName } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") ?? "application/json";

    if (contentType.includes("application/json")) {
      const data = await upstream.json();
      return NextResponse.json(data, { status: upstream.status });
    }

    const text = await upstream.text();
    return new NextResponse(text, { status: upstream.status, headers: { "Content-Type": contentType } });
  } catch (error) {
    console.error("Calculate backend error:", error);
    return NextResponse.json(
      { detail: "Backend service unavailable. Make sure the Python backend is running." },
      { status: 503 }
    );
  }
}
