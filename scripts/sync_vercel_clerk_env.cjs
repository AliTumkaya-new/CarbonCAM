const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { isPublishableKey } = require("../web/node_modules/@clerk/shared/keys");

const envPath = path.resolve(process.argv[2] || ".vercel/.env.production.local");
const target = process.argv[3] || "preview";
const content = fs.readFileSync(envPath, "utf8");

function readValue(name) {
  const line = content.split(/\r?\n/).find((entry) => entry.startsWith(`${name}=`));
  if (!line) throw new Error(`Missing ${name}`);
  const raw = line.slice(line.indexOf("=") + 1);
  try {
    return JSON.parse(raw).trim();
  } catch {
    return raw.trim();
  }
}

const values = new Map([
  ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", readValue("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY")],
  ["CLERK_SECRET_KEY", readValue("CLERK_SECRET_KEY")],
  ["NEXT_PUBLIC_CLERK_SIGN_IN_URL", readValue("NEXT_PUBLIC_CLERK_SIGN_IN_URL")],
  ["NEXT_PUBLIC_CLERK_SIGN_UP_URL", readValue("NEXT_PUBLIC_CLERK_SIGN_UP_URL")],
  ["NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL", "/dashboard"],
  ["NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL", "/dashboard"],
]);

if (!isPublishableKey(values.get("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"))) {
  throw new Error("Parsed Clerk publishable key is invalid");
}

const vercel = process.platform === "win32" ? "vercel.cmd" : "vercel";
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
    throw new Error(`Failed to update ${name}: ${result.error || result.stderr || result.stdout}`);
  }
  console.log(`Updated ${name} in ${target}`);
}
