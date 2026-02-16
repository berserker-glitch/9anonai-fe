import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEOLandingPage } from "@/components/landing/seo-landing-page";
import { getPageBySlug, getAllSlugs } from "@/lib/seo-pages-registry";
import { t } from "@/lib/seo-page-types";
import { getAllPosts, BlogLanguage } from "@/lib/blog";

/**
 * @description Dynamic SEO landing page route.
 * Renders all trilingual SEO pages from a single component using
 * the data in lib/seo-pages-registry.ts.
 * 
 * URL pattern: /[lang]/[slug] (e.g., /en/legal-ai, /fr/legal-ai, /ar/legal-ai)
 * 
 * WHY a dynamic route: avoids 8+ nearly identical page files. One component
 * serves all SEO pages × 3 languages = 24 unique, indexable URLs.
 */

/** Only allow registered slugs — everything else 404s */
export const dynamicParams = false;

/**
 * Pre-generate all page + language combinations at build time.
 * This ensures all 24 URLs are statically generated for optimal performance.
 */
export async function generateStaticParams() {
    const slugs = getAllSlugs();
    const langs = ["ar", "en", "fr"];

    return slugs.flatMap((slug) =>
        langs.map((lang) => ({ lang, slug }))
    );
}

/**
 * Generate per-page, per-language metadata for SEO.
 * Each combination gets unique title, description, and keywords.
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await params;
    const page = getPageBySlug(slug);

    if (!page) return {};

    const langKey = lang as "ar" | "en" | "fr";

    return {
        title: page.titles[langKey] || page.titles.en,
        description: page.descriptions[langKey] || page.descriptions.en,
        keywords: page.keywords[langKey] || page.keywords.en,
        alternates: {
            canonical: `https://9anonai.com/en/${slug}`,
            languages: {
                en: `https://9anonai.com/en/${slug}`,
                fr: `https://9anonai.com/fr/${slug}`,
                ar: `https://9anonai.com/ar/${slug}`,
            },
        },
        openGraph: {
            title: page.titles[langKey] || page.titles.en,
            description: page.descriptions[langKey] || page.descriptions.en,
            type: "website",
            url: `https://9anonai.com/${lang}/${slug}`,
            siteName: "9anon AI",
        },
    };
}

/**
 * @description Dynamic SEO page component.
 * Reads the slug + lang from params, fetches the trilingual data,
 * and renders the SEOLandingPage with language-specific content.
 */
export default async function SEOPage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;
    const page = getPageBySlug(slug);

    // 404 for unknown slugs (shouldn't happen with dynamicParams = false)
    if (!page) notFound();

    const langKey = lang as "ar" | "en" | "fr";
    const dir = lang === "ar" ? "rtl" : "ltr";

    /**
     * Build FAQPage JSON-LD schema for Google rich results.
     * This must match the visible FAQ content exactly.
     */
    const faqItems = page.faqItems[langKey] || page.faqItems.en;
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    /** BreadcrumbList schema for navigation trail in search results */
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "9anon AI",
                item: "https://9anonai.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: page.titles[langKey] || page.titles.en,
                item: `https://9anonai.com/${lang}/${slug}`,
            },
        ],
    };

    /** Fetch recent blog posts for the cross-linking ecosystem */
    const recentPosts = getAllPosts(langKey).slice(0, 3);

    return (
        <>
            {/* Structured data for search engines */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([faqJsonLd, breadcrumbJsonLd]),
                }}
            />

            <SEOLandingPage
                badge={t(page.badge, lang)}
                h1={t(page.h1, lang)}
                subtitle={t(page.subtitle, lang)}
                ctaText={t(page.ctaText, lang)}
                ctaHref="/chat"
                faqTitle={t(page.faqTitle, lang)}
                faqItems={faqItems}
                features={page.features[langKey] || page.features.en}
                contentSections={page.contentSections[langKey] || page.contentSections.en}
                relatedLinks={page.relatedLinks}
                gradientFrom={page.gradientFrom}
                gradientTo={page.gradientTo}
                glowColor={page.glowColor}
                dir={dir}
                blogPosts={recentPosts}
            />
        </>
    );
}
