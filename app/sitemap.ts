import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SEO_PAGE_SLUGS } from "@/lib/seo-page-types";

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

// SEO_PAGE_SLUGS is imported from lib/seo-page-types.ts — single source of truth.
// Adding a new page to the registry automatically includes it in the sitemap.

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
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/tos`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        // About page (trilingual) — high-value SEO page for brand trust and legal authority
        ...["ar", "fr", "en"].map((lang) => ({
            url: `${baseUrl}/${lang}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
            alternates: {
                languages: {
                    ar: `${baseUrl}/ar/about`,
                    fr: `${baseUrl}/fr/about`,
                    en: `${baseUrl}/en/about`,
                },
            },
        })),
        {
            url: `${baseUrl}/vs-9anoun`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Calculator pages (trilingual) — high-value tool pages for viral Moroccan traffic
        ...["ar", "fr", "en"].flatMap((lang) => [
            {
                url: `${baseUrl}/${lang}/calculators/inheritance`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.9,
                alternates: {
                    languages: {
                        ar: `${baseUrl}/ar/calculators/inheritance`,
                        fr: `${baseUrl}/fr/calculators/inheritance`,
                        en: `${baseUrl}/en/calculators/inheritance`,
                    },
                },
            },
            {
                url: `${baseUrl}/${lang}/calculators/income-tax`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.9,
                alternates: {
                    languages: {
                        ar: `${baseUrl}/ar/calculators/income-tax`,
                        fr: `${baseUrl}/fr/calculators/income-tax`,
                        en: `${baseUrl}/en/calculators/income-tax`,
                    },
                },
            },
            {
                url: `${baseUrl}/${lang}/calculators/rent-increase`,
                lastModified: new Date(),
                changeFrequency: "monthly" as const,
                priority: 0.9,
                alternates: {
                    languages: {
                        ar: `${baseUrl}/ar/calculators/rent-increase`,
                        fr: `${baseUrl}/fr/calculators/rent-increase`,
                        en: `${baseUrl}/en/calculators/rent-increase`,
                    },
                },
            },
        ]),
        // SEO landing pages — driven by SEO_PAGE_SLUGS (single source of truth in seo-page-types.ts)
        ...seoPageUrls,
        // Blog posts (trilingual)
        ...blogUrls,
    ];
}
