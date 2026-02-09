import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

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
                lastModified: new Date(post.date),
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
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
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
        // NOTE: Legacy /blog index removed - localized /ar/blog, /en/blog, /fr/blog are in blogUrls
        ...blogUrls,
    ];
}
