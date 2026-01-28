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

        // 3. Keep Legacy URLs (pointing to Arabic implies canonical is /ar)
        blogUrls.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: "weekly" as const,
            priority: 0.7,
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
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        ...blogUrls,
    ];
}
