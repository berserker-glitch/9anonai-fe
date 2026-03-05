import { getAllPosts, BlogLanguage } from "@/lib/blog";
import { NextResponse } from "next/server";

const BASE_URL = "https://9anonai.com";

/** Supported blog languages */
const LANGS: BlogLanguage[] = ["ar", "fr", "en"];

/**
 * GET /image-sitemap.xml
 *
 * Generates an image sitemap following the Google image sitemap extension spec:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 *
 * Each blog post with a cover image gets one `<url>` block per language.
 * WHY one-per-language: Google's spec requires exactly one `<loc>` per `<url>`.
 * The image caption uses the resolved `imageAlt` for that language, which is
 * a key ranking signal for Google Images (descriptive captions > generic titles).
 *
 * Also includes `<image:geo_location>` since this is a Morocco-focused legal blog,
 * helping Google Images surface results for location-relevant searches.
 *
 * @returns XML response consumed by Googlebot and other crawlers
 */
export async function GET(): Promise<NextResponse> {
    // Build <url> blocks — one per post × language, using resolved imageAlt
    const urlBlocks: string[] = [];

    LANGS.forEach((lang) => {
        const posts = getAllPosts(lang);
        const postsWithImages = posts.filter((p) => Boolean(p.image));

        postsWithImages.forEach((post) => {
            const imageUrl = `${BASE_URL}${post.image}`;
            // Use the resolved imageAlt (with fallback chain) for the caption
            const caption = post.imageAlt || post.title;

            urlBlocks.push(
                `  <url>\n` +
                `    <loc>${BASE_URL}/${lang}/blog/${post.slug}</loc>\n` +
                `    <image:image>\n` +
                `      <image:loc>${imageUrl}</image:loc>\n` +
                `      <image:title><![CDATA[${post.title}]]></image:title>\n` +
                `      <image:caption><![CDATA[${caption}]]></image:caption>\n` +
                `      <image:geo_location>Morocco</image:geo_location>\n` +
                `      <image:license>https://creativecommons.org/licenses/by/4.0/</image:license>\n` +
                `    </image:image>\n` +
                `  </url>`
            );
        });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlBlocks.join("\n")}
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

