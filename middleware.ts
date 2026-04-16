import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "fr", "ar"];
const defaultLocale = "fr"; // Bots (no cookie, no Accept-Language) get French — primary SERP audience

/**
 * Lightweight Accept-Language parser — replaces @formatjs/intl-localematcher
 * + negotiator which are incompatible with Turbopack's edge runtime parser.
 */
function getLocale(request: NextRequest): string {
    // 1. Check cookie
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // 2. Parse Accept-Language header (e.g. "fr-FR,fr;q=0.9,en;q=0.8,ar;q=0.7")
    const acceptLang = request.headers.get("accept-language") || "";
    const preferred = acceptLang
        .split(",")
        .map((part) => {
            const [lang, qPart] = part.trim().split(";");
            const q = qPart ? parseFloat(qPart.replace("q=", "")) : 1;
            return { lang: lang.trim().split("-")[0].toLowerCase(), q };
        })
        .sort((a, b) => b.q - a.q);

    for (const { lang } of preferred) {
        if (locales.includes(lang)) return lang;
    }

    return defaultLocale;
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
        // Core AI / consultation
        "legal-ai", "legal-chatbot", "online-consultation",
        // Individual rights
        "divorce-law", "employee-rights", "tenant-rights",
        "inheritance-law", "immigration-law",
        // Business / commercial
        "business-legal", "startup-legal", "contract-review",
        "commercial-law", "tax-legal",
        // Property
        "rental-law", "real-estate-law",
        // Digital law
        "cybersecurity-law", "crypto-law", "digital-law",
        // Topic hub pages
        "family-law", "labor-law", "traffic-law",
    ];

    // Check if the pathname matches a SEO page slug
    const isSeoPage = seoPageSlugs.some(
        (slug) => pathname === `/${slug}` || pathname === `/${slug}/`
    );

    // Identify paths that NEED rewriting to /[lang] structure (routes inside app/[lang])
    // Includes: /, /blog/*, /about, all SEO landing pages, and the new test landing pages /1 to /11
    if (
        pathname === "/" ||
        pathname.startsWith("/blog") ||
        pathname === "/about" ||
        isSeoPage ||
        /^\/([1-9]|10|11)(\/|$)/.test(pathname)
    ) {
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
