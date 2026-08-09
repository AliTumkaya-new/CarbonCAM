/**
 * Sentry build-time config notları.
 *
 * Runtime init: sentry.client.config.ts / sentry.server.config.ts / sentry.edge.config.ts
 * Sourcemap upload (opsiyonel): next.config.ts içinde withSentryConfig kullanılır.
 *
 * Gerekli env (browser):
 * - NEXT_PUBLIC_SENTRY_DSN
 *
 * Gerekli env (server):
 * - SENTRY_DSN (opsiyonel, server için ayrı DSN)
 *
 * Sourcemap upload için (CI/CD):
 * - SENTRY_AUTH_TOKEN
 * - SENTRY_ORG
 * - SENTRY_PROJECT
 */

module.exports = {
  // Bu dosya bilgilendirme amaçlıdır.
};
