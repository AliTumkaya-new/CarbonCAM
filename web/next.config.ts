import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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
