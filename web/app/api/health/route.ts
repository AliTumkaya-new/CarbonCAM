import { NextResponse } from "next/server";
import { hasProductionBackend } from "@/lib/carboncam-api";

function configured(value: string | undefined, placeholder: string) {
  return Boolean(value && !value.includes(placeholder) && !value.includes("XXXX"));
}

export async function GET() {
  const checks = {
    clerk:
      configured(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_test_") &&
      configured(process.env.CLERK_SECRET_KEY, "sk_test_"),
    backend: hasProductionBackend(),
    supabase:
      configured(process.env.SUPABASE_URL, "YOUR_PROJECT_REF") &&
      configured(process.env.SUPABASE_SERVICE_ROLE_KEY, "XXXXXXXX"),
    webhook: configured(process.env.CLERK_WEBHOOK_SECRET, "XXXXXXXX"),
  };

  return NextResponse.json(
    {
      status: "ok",
      service: "CarbonCAM Web",
      environment: process.env.NODE_ENV ?? "development",
      readyForProduction: checks.clerk && checks.backend && checks.supabase,
      checks,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
