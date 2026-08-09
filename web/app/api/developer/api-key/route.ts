import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  if (!value) return false;
  if (!value.startsWith(prefix)) return false;
  if (value.includes("XXXX") || value.includes("xxxxxxxx")) return false;
  return value.length >= 20;
}

function base64Url(input: Buffer) {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export async function POST() {
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

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ detail: "Supabase env missing" }, { status: 500 });
  }

  // Produce a secret that looks like: sk_live_....
  const secret = `sk_live_${base64Url(crypto.randomBytes(32))}`;
  const keyHash = crypto.createHash("sha256").update(secret, "utf8").digest("hex");
  const keyPrefix = secret.slice(0, 12);

  const insertRes = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/api_keys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      user_id: userId,
      key_hash: keyHash,
      key_prefix: keyPrefix,
    }),
  });

  if (!insertRes.ok) {
    const text = await insertRes.text().catch(() => "");
    return NextResponse.json(
      { detail: `API key oluşturulamadı: ${text || insertRes.status}` },
      { status: 500 },
    );
  }

  // Return the plaintext key once. We never store it.
  return NextResponse.json({ api_key: secret });
}
