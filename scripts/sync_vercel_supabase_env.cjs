const { spawnSync } = require("node:child_process");

const projectRef = process.argv[2];
const targets = process.argv.slice(3);

if (!projectRef) {
  throw new Error("Usage: node scripts/sync_vercel_supabase_env.cjs <project-ref> [preview] [production]");
}

if (targets.length === 0) targets.push("preview", "production");

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const keyResult = spawnSync(
  npx,
  [
    "--yes",
    "supabase@latest",
    "projects",
    "api-keys",
    "--project-ref",
    projectRef,
    "--reveal",
    "--output-format",
    "json",
  ],
  {
    encoding: "utf8",
    windowsHide: true,
    shell: process.platform === "win32",
  },
);

if (keyResult.status !== 0) {
  throw new Error(`Could not retrieve Supabase API keys: ${keyResult.stderr || keyResult.error}`);
}

const payload = JSON.parse(keyResult.stdout);
const keys = Array.isArray(payload) ? payload : payload.keys;
if (!Array.isArray(keys)) throw new Error("Unexpected Supabase API key response");

const anonKey = keys.find((key) => key.name === "anon" && key.type === "legacy")?.api_key;
const serviceRoleKey = keys.find(
  (key) => key.name === "service_role" && key.type === "legacy",
)?.api_key;

if (!anonKey || !serviceRoleKey) {
  throw new Error("Supabase legacy anon/service_role keys were not found");
}

const supabaseUrl = `https://${projectRef}.supabase.co`;
const values = new Map([
  ["NEXT_PUBLIC_SUPABASE_URL", supabaseUrl],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", anonKey],
  ["SUPABASE_URL", supabaseUrl],
  ["SUPABASE_SERVICE_ROLE_KEY", serviceRoleKey],
]);

const vercel = process.platform === "win32" ? "vercel.cmd" : "vercel";
for (const target of targets) {
  if (!new Set(["development", "preview", "production"]).has(target)) {
    throw new Error(`Unsupported Vercel environment: ${target}`);
  }

  for (const [name, value] of values) {
    const result = spawnSync(
      vercel,
      ["env", "add", name, target, "--force", "--sensitive"],
      {
        input: value,
        encoding: "utf8",
        windowsHide: true,
        shell: process.platform === "win32",
      },
    );

    if (result.status !== 0) {
      throw new Error(`Failed to update ${name} in ${target}: ${result.stderr || result.error}`);
    }
    console.log(`Updated ${name} in ${target}`);
  }
}
