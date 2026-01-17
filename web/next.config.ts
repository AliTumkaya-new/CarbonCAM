import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.platform === "win32" ? undefined : "standalone", // For Docker deployments (Windows local build can fail)
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['recharts', '@clerk/nextjs'],
  },

  // Webpack configuration
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

type NextConfigPlugin = (config: NextConfig) => NextConfig;

let withNextIntl: NextConfigPlugin = (config) => config;

try {
  // next-intl/plugin bazen @parcel/watcher prebuild eksikliğinden ötürü config load aşamasında crash edebiliyor.
  // Bu durumda prod build'i bloklamamak için plugin'i devre dışı bırakıp devam ediyoruz.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("next-intl/plugin");
  const createNextIntlPlugin = (mod?.default ?? mod) as (requestConfig: string) => NextConfigPlugin;
  withNextIntl = createNextIntlPlugin("./i18n/request.ts");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[next.config] next-intl plugin disabled: ${message}`);
}

const nextConfigWithIntl = withNextIntl(nextConfig);

const sentryWebpackPluginOptions = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: true,
};

export default process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(nextConfigWithIntl, sentryWebpackPluginOptions)
  : nextConfigWithIntl;
