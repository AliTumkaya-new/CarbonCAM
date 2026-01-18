import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  if (!value) return false;
  if (!value.startsWith(prefix)) return false;
  // Placeholder örneklerini (XXXX...) ve çok kısa değerleri devre dışı bırak.
  if (value.includes("XXXX") || value.includes("xxxxxxxx")) return false;
  return value.length >= 20;
}

const clerkConfigured =
  isLikelyValidClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_") &&
  isLikelyValidClerkKey(process.env.CLERK_SECRET_KEY, "sk_");

// Public routes:
// - / (Landing page) - herkese açık
// - /api/webhooks(.*)  - Clerk webhooks için açık olmalı
// - /sign-in, /sign-up  - Auth sayfaları
// - Marketing pages - features, pricing, docs, blog, privacy, terms, cookies, help
// Clerk yapılandırılmamışsa tüm sayfalar public (development mode).
const isPublicRoute = createRouteMatcher(
  clerkConfigured
    ? [
        "/",
        "/api(.*)",
        "/sign-in(.*)",
        "/sign-up(.*)",
        "/features(.*)",
        "/pricing(.*)",
        "/docs(.*)",
        "/blog(.*)",
        "/privacy(.*)",
        "/terms(.*)",
        "/cookies(.*)",
        "/help(.*)",
      ]
    : ["/(.*)"]
);

// Korumalı sayfalar (sadece Clerk yapılandırılmışsa)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/results(.*)",
  "/library(.*)",
  "/settings(.*)",
]);

const noopMiddleware = () => NextResponse.next();

// Clerk keyleri yoksa/invalid ise tamamen no-op middleware export et.
// Önemli: clerkMiddleware() çağrısı module init'te key doğrulaması yaptığı için,
// invalid key ile crash'i engellemenin yolu export'u burada override etmektir.
export default clerkConfigured
  ? clerkMiddleware((auth, req) => {
      if (isPublicRoute(req)) return NextResponse.next();
      if (isProtectedRoute(req)) auth.protect();
      return NextResponse.next();
    })
  : noopMiddleware;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
