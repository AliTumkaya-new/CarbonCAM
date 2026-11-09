import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

function isLikelyValidClerkKey(value: string | undefined, prefix: string) {
  if (!value || !value.startsWith(prefix)) return false;
  if (value.includes("XXXX") || value.includes("xxxxxxxx")) return false;
  return value.length >= 20;
}

const clerkConfigured =
  isLikelyValidClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, "pk_") &&
  isLikelyValidClerkKey(process.env.CLERK_SECRET_KEY, "sk_");

const devAuthEnabled = process.env.CARBONCAM_DEV_AUTH === "true";

const isPublicRoute = createRouteMatcher([
  "/",
  "/app-ads.txt",
  "/ads.txt",
  "/blog(.*)",
  "/app(.*)",
  "/account-deletion(.*)",
  "/contact(.*)",
  "/cookies(.*)",
  "/docs(.*)",
  "/features(.*)",
  "/help(.*)",
  "/pricing(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/clerk/webhook(.*)",
  "/api/health(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/results(.*)",
  "/library(.*)",
  "/settings(.*)",
]);

const configuredProxy = clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return NextResponse.next();
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", `${req.nextUrl.pathname}${req.nextUrl.search}`);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
});

function missingAuthProxy(req: NextRequest) {
  if (!devAuthEnabled && isProtectedRoute(req)) {
    return NextResponse.json(
      { detail: "Authentication service is not configured" },
      { status: 503 },
    );
  }
  return NextResponse.next();
}

export default clerkConfigured ? configuredProxy : missingAuthProxy;

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
