export type ClerkAdminEnv = {
  secretKey: string;
};

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  if (!value) return false;
  if (!value.startsWith(prefix)) return false;
  if (value.includes("XXXX") || value.includes("xxxxxxxx")) return false;
  return value.length >= 20;
}

export function getClerkAdminEnv(): ClerkAdminEnv | null {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!isLikelyValidClerkKey(secretKey, "sk_")) return null;
  return { secretKey: secretKey as string };
}

export async function clerkAdminFetch(path: string, init?: RequestInit) {
  const env = getClerkAdminEnv();
  if (!env) {
    return new Response(JSON.stringify({ detail: "Clerk not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `https://api.clerk.com/v1/${path.replace(/^\//, "")}`;
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${env.secretKey}`);
  if (!headers.has("Content-Type") && init?.body) headers.set("Content-Type", "application/json");

  return fetch(url, { ...init, headers, cache: "no-store" });
}
