import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, BlogLanguage } from "@/lib/blog";

/**
 * GET /api/blog/featured-images?lang=ar|fr|en
 *
 * Returns up to 6 blog posts (in the requested language) that have a cover image.
 * Used by the homepage BlogHighlights client component.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
    // Read the language from query string — default to Arabic
    const lang = (req.nextUrl.searchParams.get("lang") || "ar") as BlogLanguage;

    const posts = getAllPosts(lang);

    const withImages = posts
        .filter((p) => Boolean(p.image))
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
        .map(({ slug, title, description, date, image, readingTime, category, imageAlt }) => ({
            slug, title, description, date, image, readingTime, category, imageAlt,
        }));

    return NextResponse.json(withImages, {
        headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
    });
}
