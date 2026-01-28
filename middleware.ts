import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "fr", "ar"];
const defaultLocale = "ar"; // Default to Arabic as per 9anon

function getLocale(request: NextRequest): string {
    // 1. Check cookie
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // 2. Check Accept-Language header
    const headers = { "accept-language": request.headers.get("accept-language") || "" };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        // Extract the locale and the rest of the path
        const locale = locales.find(
            (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
        );
        const newPath = pathname.replace(`/${locale}`, "") || "/";

        // Redirect to the path without locale, setting the cookie
        const response = NextResponse.redirect(new URL(newPath, request.url));
        if (locale) {
            response.cookies.set("NEXT_LOCALE", locale);
        }
        return response;
    }

    // Identify paths that NEED rewriting to /[lang] structure (routes inside app/[lang])
    // Based on directory structure: scheme is / -> /[lang]/... and /blog -> /[lang]/blog
    if (pathname === "/" || pathname.startsWith("/blog")) {
        const locale = getLocale(request);
        return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));
    }

    // For other routes (e.g. /chat, /login), do NOT rewrite as they are not under [lang]
    // They will pick up the language from the client-side context (cookies/localstorage)
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        // Skip all API routes
        // Skip all static files (images, favicon, etc)
        "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|images|icons|.*\\..*).*)",
    ],
};
