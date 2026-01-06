import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  if (!value) return false;
  if (!value.startsWith(prefix)) return false;
  if (value.includes("XXXX") || value.includes("xxxxxxxx")) return false;
  return value.length >= 20;
}

export async function GET() {
  const clerkConfigured =
    isLikelyValidClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_") &&
    isLikelyValidClerkKey(process.env.CLERK_SECRET_KEY, "sk_");

  if (!clerkConfigured) {
    return NextResponse.json({ detail: "Auth not configured" }, { status: 503 });
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const apiBase = process.env.CARBONCAM_API_URL ?? "http://localhost:8000";
  const upstream = await fetch(`${apiBase}/batch/template`, {
    method: "GET",
    headers: { "X-Carboncam-User-Id": userId },
    cache: "no-store",
  });

  const arrayBuffer = await upstream.arrayBuffer();
  const contentType =
    upstream.headers.get("content-type") ??
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const disposition = upstream.headers.get("content-disposition") ??
    "attachment; filename=Template.xlsx";

  return new NextResponse(Buffer.from(arrayBuffer), {
    status: upstream.status,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": disposition,
    },
  });
}
