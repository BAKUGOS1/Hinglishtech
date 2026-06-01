import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Routes that require authentication.
// Learning discovery and detail routes stay public for SEO and onboarding.
const PROTECTED_PREFIXES = ["/dashboard", "/profile", "/settings"];
// Routes that are only for guests (redirect if already logged in)
const GUEST_ONLY = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);
  const isLoggedIn = !!sessionCookie;

  // Redirect authenticated users away from guest-only pages
  if (isLoggedIn && GUEST_ONLY.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (!isLoggedIn && PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Skip static files, _next internal routes, and API auth endpoints
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
