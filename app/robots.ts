import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                // Disallow crawlers from dynamic chat pages, APIs, and administrative setup areas to optimize crawl budget
                disallow: [
                    "/api/", 
                    "/_next/", 
                    "/chat", 
                    "/chat/", 
                    "/admin/", 
                    "/setup/",
                    "/pricing",
                    "/refund"
                ],
            },
        ],
        // Main sitemap + dedicated image sitemap for Google Image indexing
        sitemap: [
            "https://9anonai.com/sitemap.xml",
            "https://9anonai.com/image-sitemap.xml",
        ],
        host: "https://9anonai.com",
    };
}
