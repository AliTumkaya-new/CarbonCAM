import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const webDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(webDirectory, "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  turbopack: {
    root: workspaceRoot,
  },
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable gzip compression

  async headers() {
    return [
      {
        source: "/app-ads.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/ads.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=86400" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), microphone=()",
          },
        ],
      },
    ];
  },
  
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

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
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
