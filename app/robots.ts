import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/chat/", "/_next/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
            },
            {
                userAgent: "Bingbot",
                allow: "/",
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
