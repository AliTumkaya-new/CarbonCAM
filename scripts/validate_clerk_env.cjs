const fs = require("node:fs");
const path = require("node:path");
const { isPublishableKey } = require("../web/node_modules/@clerk/shared/keys");

const envPath = path.resolve(process.argv[2] || ".vercel/.env.production.local");
const line = fs
  .readFileSync(envPath, "utf8")
  .split(/\r?\n/)
  .find((entry) => entry.startsWith("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="));

if (!line) throw new Error("Publishable key entry not found");

const raw = line.slice(line.indexOf("=") + 1);
const unquoted = raw.startsWith('"') && raw.endsWith('"') ? raw.slice(1, -1) : raw;
const stripped = unquoted.replace(/\\n$/, "");
let parsed = "";

try {
  parsed = JSON.parse(raw).trim();
} catch {
  parsed = "";
}

console.log({
  rawLength: raw.length,
  unquotedLength: unquoted.length,
  strippedLength: stripped.length,
  parsedLength: parsed.length,
  rawValid: isPublishableKey(raw),
  unquotedValid: isPublishableKey(unquoted),
  strippedValid: isPublishableKey(stripped),
  parsedValid: isPublishableKey(parsed),
  hasPlaceholder: /X{4}/.test(parsed || stripped),
});
