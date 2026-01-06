import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

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

  if (!clerkConfigured) {
    return NextResponse.json({ detail: "Auth not configured" }, { status: 503 });
  }

  const { userId, orgId } = await auth();
  if (!userId) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const meta = await getUserMetadata(orgId ?? null);

  const formData = await req.formData();
  const apiBase = process.env.CARBONCAM_API_URL ?? "http://localhost:8000";

  const upstream = await fetch(`${apiBase}/batch/process`, {
    method: "POST",
    headers: {
      "X-Carboncam-User-Id": userId,
      ...(meta.email ? { "X-Carboncam-User-Email": meta.email } : {}),
      ...(meta.name ? { "X-Carboncam-User-Name": meta.name } : {}),
      ...(meta.companyName ? { "X-Carboncam-Company-Name": meta.companyName } : {}),
    },
    body: formData,
    cache: "no-store",
  });

  const contentType = upstream.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  }

  const arrayBuffer = await upstream.arrayBuffer();
  const disposition = upstream.headers.get("content-disposition") ??
    "attachment; filename=Results.xlsx";
  const contentTypeSafe =
    contentType || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  return new NextResponse(Buffer.from(arrayBuffer), {
    status: upstream.status,
    headers: {
      "Content-Type": contentTypeSafe,
      "Content-Disposition": disposition,
    },
  });
}
