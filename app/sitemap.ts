import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

/**
 * Safely parse a date string to a valid Date object.
 * Falls back to current date if parsing fails.
 * @param dateString - The date string to parse (e.g., "2026-02-07")
 * @returns A valid Date object
 */
function parseDate(dateString: string): Date {
    const parsed = new Date(dateString);
    // Check for invalid date (NaN timestamp = 1970-01-01 issue)
    if (isNaN(parsed.getTime())) {
        console.warn(`[Sitemap] Invalid date "${dateString}", using current date`);
        return new Date();
    }
    return parsed;
}

/**
 * SEO landing page slugs — each served under /[lang]/[slug]
 * with trilingual hreflang alternates
 */
const SEO_PAGE_SLUGS = [
    "legal-ai",
    "legal-chatbot",
    "business-legal",
    "startup-legal",
    "divorce-law",
    "employee-rights",
    "tenant-rights",
    "contract-review",
];

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://9anonai.com";

    // Get all base posts (Arabic) to extract slugs
    // Since we have 1-to-1 mapping for languages, the slugs are consistent
    const posts = getAllPosts("ar");
    const languages = ["ar", "fr", "en"];

    const blogUrls: MetadataRoute.Sitemap = [];

    // 1. Add Localized Blog Indices
    languages.forEach((lang) => {
        blogUrls.push({
            url: `${baseUrl}/${lang}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
            alternates: {
                languages: {
                    ar: `${baseUrl}/ar/blog`,
                    fr: `${baseUrl}/fr/blog`,
                    en: `${baseUrl}/en/blog`,
                }
            }
        });
    });

    // 2. Add Localized Blog Posts
    posts.forEach((post) => {
        languages.forEach((lang) => {
            blogUrls.push({
                url: `${baseUrl}/${lang}/blog/${post.slug}`,
                lastModified: parseDate(post.date),
                changeFrequency: "weekly" as const,
                priority: 0.7,
                alternates: {
                    languages: {
                        ar: `${baseUrl}/ar/blog/${post.slug}`,
                        fr: `${baseUrl}/fr/blog/${post.slug}`,
                        en: `${baseUrl}/en/blog/${post.slug}`,
                    }
                }
            });
        });
        // NOTE: Legacy /blog/{slug} URLs removed - they now redirect to /ar/blog/{slug}
    });

    // 3. Add Trilingual SEO Landing Pages with hreflang alternates
    const seoPageUrls: MetadataRoute.Sitemap = [];
    SEO_PAGE_SLUGS.forEach((slug) => {
        languages.forEach((lang) => {
            seoPageUrls.push({
                url: `${baseUrl}/${lang}/${slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.85,
                alternates: {
                    languages: {
                        ar: `${baseUrl}/ar/${slug}`,
                        fr: `${baseUrl}/fr/${slug}`,
                        en: `${baseUrl}/en/${slug}`,
                    },
                },
            });
        });
    });

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
            alternates: {
                languages: {
                    ar: `${baseUrl}/ar`,
                    fr: `${baseUrl}/fr`,
                    en: `${baseUrl}/en`,
                },
            },
        },
        {
            url: `${baseUrl}/chat`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/register`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        // NOTE: /about removed - page doesn't exist in app directory
        {
            url: `${baseUrl}/vs-9anoun`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/labor-law`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/traffic-law`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/family-law`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        // SEO landing pages (trilingual, 8 pages × 3 langs = 24 URLs)
        ...seoPageUrls,
        // Blog posts (trilingual)
        ...blogUrls,
    ];
}
