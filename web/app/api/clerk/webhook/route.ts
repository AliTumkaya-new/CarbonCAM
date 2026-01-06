import { NextResponse } from "next/server";
import { Webhook } from "svix";

type ClerkWebhookEvent = {
  type: string;
  data: Record<string, unknown>;
};

function pickPrimaryEmail(data: Record<string, unknown>): string | null {
  const primaryId = typeof data.primary_email_address_id === "string" ? data.primary_email_address_id : null;
  const emailsRaw = data.email_addresses;
  if (!Array.isArray(emailsRaw)) return null;

  const emails = emailsRaw.filter((x) => typeof x === "object" && x !== null) as Array<Record<string, unknown>>;

  const primary = primaryId
    ? emails.find((e) => e.id === primaryId)
    : emails[0];

  const email = primary && typeof primary.email_address === "string" ? primary.email_address : null;
  return email && email.trim() ? email.trim() : null;
}

function buildName(data: Record<string, unknown>): string {
  const first = typeof data.first_name === "string" ? data.first_name : "";
  const last = typeof data.last_name === "string" ? data.last_name : "";
  const full = `${first} ${last}`.trim();
  if (full) return full;
  const username = typeof data.username === "string" ? data.username : "";
  return username || "";
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ detail: "CLERK_WEBHOOK_SECRET missing" }, { status: 500 });
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ detail: "Missing Svix headers" }, { status: 400 });
  }

  const payload = await req.text();
  let evt: ClerkWebhookEvent;
  try {
    const wh = new Webhook(secret);
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return NextResponse.json({ detail: "Invalid webhook signature" }, { status: 400 });
  }

  if (evt.type === "user.created") {
    const email = pickPrimaryEmail(evt.data);
    if (email) {
      const name = buildName(evt.data);

      const apiBase = process.env.CARBONCAM_API_URL ?? "http://localhost:8000";
      const secretHeader = process.env.EMAIL_AUTOMATION_SECRET;

      // Email otomasyonu opsiyonel: secret yoksa sessizce pas geç.
      if (secretHeader) {
        const howtoUrl = process.env.HOWTO_URL ?? process.env.WEB_BASE_URL;

        try {
          await fetch(`${apiBase}/internal/email/welcome`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Email-Secret": secretHeader,
            },
            body: JSON.stringify({
              to_email: email,
              user_name: name,
              company_name: null,
              howto_url: howtoUrl ?? null,
            }),
            cache: "no-store",
          });
        } catch {
          // best-effort
        }
      }
    }
  }

  return NextResponse.json({ ok: true });
}
