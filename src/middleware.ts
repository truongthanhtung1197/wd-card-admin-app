import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const protectedRoutes = ["/management", "/my-profile", "/partner", "/seoer"];

// Map route patterns to allowed roles
function getLocaleFromPath(pathname: string) {
  const match = pathname.match(/^\/([a-zA-Z-]{2,5})(?=\/|$)/);
  return match ? match[1] : null;
}

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Lấy path sau locale, ví dụ: /en/management -> /management
  const pathWithoutLocale = pathname.replace(/^\/[a-zA-Z-]{2,5}(?=\/|$)/, "");
  const accessToken = request.cookies.get("accessToken")?.value;

  if (/^\/auth(\/|$)/.test(pathWithoutLocale)) {
    return intlMiddleware(request);
  }

  if (pathname === "/") {
    // TODO: setup auth
  }

  if (protectedRoutes.some((route) => pathWithoutLocale.startsWith(route))) {
    if (!accessToken) {
      const url = request.nextUrl.clone();
      const locale = getLocaleFromPath(pathname) || "vi";
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  }

  if (
    pathname === "/" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return intlMiddleware(request);
  }

  if (!accessToken && !["", "/"].includes(pathWithoutLocale)) {
    const url = request.nextUrl.clone();
    const locale = getLocaleFromPath(pathname) || "vi";
    if (url.pathname !== `/${locale}`) {
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
