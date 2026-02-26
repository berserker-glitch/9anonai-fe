import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

const BASE_URL = "https://9anonai.com";

/** Supported blog languages */
const LANGS = ["ar", "fr", "en"] as const;

/**
 * GET /image-sitemap.xml
 *
 * Generates an image sitemap following the Google image sitemap extension spec:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 *
 * Every blog post that has a cover image is listed here with all its localized
 * URL variants, allowing Google Image Search to attribute the image to all
 * three language editions of the same article.
 *
 * @returns XML response consumed by Googlebot and other crawlers
 */
export async function GET(): Promise<NextResponse> {
    // Fetch all Arabic (base) posts — they share slugs with fr/en counterparts
    const posts = getAllPosts("ar");

    // Only posts that have a resolved cover image
    const postsWithImages = posts.filter((p) => Boolean(p.image));

    // Build <url> blocks — one per post, listing all language URLs and the image once
    const urlBlocks = postsWithImages
        .map((post) => {
            const imageUrl = `${BASE_URL}${post.image}`;

            // All localized page URLs that display this image
            const locUrls = LANGS.map(
                (lang) => `    <loc>${BASE_URL}/${lang}/blog/${post.slug}</loc>`
            ).join("\n");

            return `  <url>\n${locUrls}\n    <image:image>\n      <image:loc>${imageUrl}</image:loc>\n      <image:title><![CDATA[${post.title}]]></image:title>\n      <image:caption><![CDATA[AI-generated illustrative image for: ${post.title}]]></image:caption>\n      <image:license>https://creativecommons.org/licenses/by/4.0/</image:license>\n    </image:image>\n  </url>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlBlocks}
</urlset>`;

    return new NextResponse(xml, {
        status: 200,
        headers: {
            // Let CDN/browser cache for 1 day; revalidate in background
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        },
    });
}
