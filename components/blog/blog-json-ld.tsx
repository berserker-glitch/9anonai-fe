"use client";

/**
 * BlogJsonLd Component
 *
 * Renders structured data (JSON-LD) for blog post pages to enable
 * Google rich results. Supports three schema types:
 * - Article: For the blog post itself (headline, author, dates, image)
 * - FAQPage: For FAQ sections (renders as expandable Q&A in SERPs)
 * - BreadcrumbList: For navigation breadcrumbs in search results
 *
 * @module components/blog/blog-json-ld
 */

import { FaqItem } from "@/lib/blog";

/** Props for the BlogJsonLd component */
interface BlogJsonLdProps {
    /** Post title — becomes the Article headline */
    title: string;
    /** Meta description — becomes the Article description */
    description: string;
    /** ISO date string (YYYY-MM-DD) for datePublished */
    date: string;
    /** ISO date string (YYYY-MM-DD) for dateModified */
    lastModified?: string;
    /** Author name for the Article schema */
    author?: string;
    /** Absolute URL of the cover image */
    image?: string;
    /** SEO-optimized alt text for the cover image (for ImageObject caption) */
    imageAlt?: string;
    /** Full canonical URL of the blog post */
    url: string;
    /** Post slug for breadcrumb URL construction */
    slug: string;
    /** Language code (ar, en, fr) for breadcrumb labels */
    lang?: string;
    /** Optional FAQ items for FAQPage schema */
    faq?: FaqItem[];
    /** Optional key takeaways for the article */
    keyTakeaways?: string[];
}

/**
 * BlogJsonLd — Renders Article, FAQPage, and BreadcrumbList JSON-LD.
 *
 * WHY: Structured data is the #1 factor for earning Google rich results
 * (FAQ dropdowns, article cards, breadcrumbs in SERPs). Without it,
 * Google treats the page as generic HTML with no enhanced display.
 */
export function BlogJsonLd({
    title,
    description,
    date,
    lastModified,
    author = "9anon AI",
    image,
    imageAlt,
    url,
    slug,
    lang = "ar",
    faq,
    keyTakeaways,
}: BlogJsonLdProps) {
    const baseUrl = "https://9anonai.com";

    /**
     * Build a full ImageObject with all properties Google Images uses for ranking.
     * WHY: A bare `url` string gives Google minimal info. A full ImageObject with
     * dimensions, caption, and credit tells Google exactly what the image shows,
     * who created it, and how large it is — all ranking signals for Google Images.
     */
    const imageUrl = image
        ? (image.startsWith("http") ? image : `${baseUrl}${image}`)
        : null;

    const imageObject = imageUrl ? {
        "@type": "ImageObject",
        url: imageUrl,
        contentUrl: imageUrl,
        // Standard OG dimensions — Google uses these for thumbnail generation
        width: 1200,
        height: 630,
        // Caption is a key ranking signal for Google Images
        caption: imageAlt || title,
        // Tells Google this is THE primary image for this page
        representativeOfPage: true,
        // Credit and copyright — helps with image attribution in Google Images
        creditText: "9anon AI",
        creator: {
            "@type": "Organization",
            name: "9anon AI",
            url: baseUrl,
        },
        copyrightHolder: {
            "@type": "Organization",
            name: "9anon AI",
        },
    } : null;

    // --- Article JSON-LD schema ---
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        datePublished: date,
        dateModified: lastModified || date,
        author: {
            "@type": "Organization",
            name: author,
            url: baseUrl,
        },
        publisher: {
            "@type": "Organization",
            name: "9anon AI",
            url: baseUrl,
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/Layer 3.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        // Full ImageObject with dimensions, caption, and credit for Google Images
        ...(imageObject ? { image: imageObject } : {}),
        // Add key takeaways as article body summary if available
        ...(keyTakeaways && keyTakeaways.length > 0 ? {
            articleBody: keyTakeaways.join(". "),
        } : {}),
        inLanguage: lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US",
    };

    // --- FAQPage JSON-LD schema (only if FAQ items exist) ---
    const faqSchema = faq && faq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    } : null;

    // --- BreadcrumbList JSON-LD schema ---
    const breadcrumbLabels = {
        ar: { home: "9anon AI", blog: "المدونة" },
        en: { home: "9anon AI", blog: "Blog" },
        fr: { home: "9anon AI", blog: "Blog" },
    };
    const labels = breadcrumbLabels[lang as keyof typeof breadcrumbLabels] || breadcrumbLabels.ar;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: labels.home,
                item: baseUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: labels.blog,
                item: `${baseUrl}/${lang}/blog`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: url,
            },
        ],
    };

    return (
        <>
            {/* Article structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            {/* FAQ structured data (if FAQ items exist) */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            {/* Breadcrumb structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
}
