export type SupabaseAdminEnv = {
  url: string;
  serviceRoleKey: string;
};

export function getSupabaseAdminEnv(): SupabaseAdminEnv | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

export async function supabaseAdminFetch(
  env: SupabaseAdminEnv,
  pathAndQuery: string,
  init?: RequestInit,
) {
  const url = `${env.url.replace(/\/$/, "")}/rest/v1/${pathAndQuery.replace(/^\//, "")}`;
  const headers = new Headers(init?.headers);
  headers.set("apikey", env.serviceRoleKey);
  headers.set("Authorization", `Bearer ${env.serviceRoleKey}`);
  if (!headers.has("Content-Type") && init?.body) headers.set("Content-Type", "application/json");

  const res = await fetch(url, { ...init, headers, cache: "no-store" });
  return res;
}

export async function getOrCreateCompanyId(env: SupabaseAdminEnv, userId: string) {
  const lookup = await supabaseAdminFetch(
    env,
    `company_members?select=company_id&user_id=eq.${encodeURIComponent(userId)}&limit=1`,
  );
  if (!lookup.ok) {
    const text = await lookup.text();
    throw new Error(`Supabase lookup failed: ${text}`);
  }
  const existing = (await lookup.json()) as Array<{ company_id: string }>;
  if (existing[0]?.company_id) return existing[0].company_id;

  const createCompany = await supabaseAdminFetch(env, "companies", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ name: "My Company", created_by: userId }),
  });
  if (!createCompany.ok) {
    const text = await createCompany.text();
    throw new Error(`Supabase create company failed: ${text}`);
  }
  const created = (await createCompany.json()) as Array<{ id: string }>;
  const companyId = created[0]?.id;
  if (!companyId) throw new Error("Supabase create company returned no id");

  const createMember = await supabaseAdminFetch(env, "company_members", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ company_id: companyId, user_id: userId, role: "owner" }),
  });
  if (!createMember.ok) {
    const text = await createMember.text();
    throw new Error(`Supabase create member failed: ${text}`);
  }

  return companyId;
}
