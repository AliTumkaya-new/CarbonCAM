import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,

  // Turbopack config - webpack yerine
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  experimental: {
    optimizePackageImports: ["recharts", "@clerk/nextjs"],
  },
};

// next-intl plugin - güvenli yükleme
type NextConfigPlugin = (config: NextConfig) => NextConfig;
let withNextIntl: NextConfigPlugin = (config) => config;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require("next-intl/plugin");
  const createNextIntlPlugin = (mod?.default ?? mod) as (
    requestConfig: string
  ) => NextConfigPlugin;
  withNextIntl = createNextIntlPlugin("./i18n/request.ts");
} catch {
  console.warn("[next.config] next-intl plugin disabled");
}

const nextConfigWithIntl = withNextIntl(nextConfig);

// Sentry - sadece AUTH_TOKEN varsa
const sentryOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
};

export default process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(nextConfigWithIntl, sentryOptions)
  : nextConfigWithIntl;
