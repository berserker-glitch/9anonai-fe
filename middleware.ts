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
    const { pathname, hostname } = request.nextUrl;

    // SEO: Redirect www to non-www (canonical domain)
    if (hostname === "www.9anonai.com") {
        const url = request.nextUrl.clone();
        url.hostname = "9anonai.com";
        return NextResponse.redirect(url, 301);
    }

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        // Extract the locale from the URL
        const locale = locales.find(
            (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
        );

        // SEO FIX: Use rewrite instead of redirect to keep localized URLs indexable
        // The URL stays as /en/blog/xyz in the browser, but we serve /[lang]/blog/xyz content
        const response = NextResponse.rewrite(new URL(pathname, request.url));
        if (locale) {
            // Still set the cookie so client-side context knows the language
            response.cookies.set("NEXT_LOCALE", locale);
        }
        return response;
    }

    // === SEO page slugs that live under app/[lang]/[slug]/ ===
    // These base paths get rewritten to /[lang]/[slug] for locale detection
    const seoPageSlugs = [
        "legal-ai", "legal-chatbot", "business-legal", "startup-legal",
        "divorce-law", "employee-rights", "tenant-rights", "contract-review",
    ];

    // Check if the pathname matches a SEO page slug
    const isSeoPage = seoPageSlugs.some(
        (slug) => pathname === `/${slug}` || pathname === `/${slug}/`
    );

    // Identify paths that NEED rewriting to /[lang] structure (routes inside app/[lang])
    // Includes: /, /blog/*, and all SEO landing pages
    if (pathname === "/" || pathname.startsWith("/blog") || isSeoPage) {
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
