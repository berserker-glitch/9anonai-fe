import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Supported languages
export type BlogLanguage = "ar" | "fr" | "en";

/** Single FAQ item for Google FAQ rich snippets */
export interface FaqItem {
    question: string;
    answer: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: string;
    image?: string;
    language: BlogLanguage;
    /** Estimated reading time in minutes */
    readingTime: number;
    /** Category tag for grouping (from frontmatter, defaults to "law") */
    category: string;
    /** Optional FAQ items — used for FAQPage JSON-LD rich snippets */
    faq?: FaqItem[];
}

const blogsDirectory = path.join(process.cwd(), "content/blogs");

/**
 * Resolves the cover image for a post.
 * Non-Arabic (fr/en) posts often lack an `image` field in their frontmatter,
 * so we fall back to reading the Arabic base file for the same slug.
 * If that also has no image, we check if `/blog-images/<slug>.png` exists
 * in the public directory, which is our AI-generated image convention.
 * @param slug - The post slug (no lang suffix)
 * @param directImage - The image value already found in frontmatter (may be empty)
 * @param lang - The post language
 */
function resolveImage(slug: string, directImage: string | undefined, lang: BlogLanguage): string {
    // If the frontmatter already has an image, use it directly
    if (directImage) return directImage;

    // For translated posts, fall back to the base Arabic post's image field
    if (lang !== "ar") {
        try {
            const arPath = path.join(blogsDirectory, `${slug}.md`);
            if (fs.existsSync(arPath)) {
                const arFileContents = fs.readFileSync(arPath, "utf8");
                const { data: arData } = matter(arFileContents);
                if (arData.image) return arData.image;
            }
        } catch {
            // silently fall through to the convention-based fallback
        }
    }

    // Final fallback: check the AI-generated image convention path
    const conventionPath = `/blog-images/${slug}.png`;
    const publicPath = path.join(process.cwd(), "public", conventionPath);
    if (fs.existsSync(publicPath)) return conventionPath;

    return "";
}

/**
 * Calculate estimated reading time from content
 * @param content - Markdown content
 * @param wordsPerMinute - Average reading speed (lower for Arabic)
 * @returns Reading time in minutes (minimum 1)
 */
function calculateReadingTime(content: string, lang: BlogLanguage): number {
    // Arabic readers average ~180 WPM, French/English ~220 WPM
    const wpm = lang === "ar" ? 180 : 220;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wpm));
}

export function getAllPosts(lang: BlogLanguage = "ar"): BlogPost[] {
    // Ensure directory exists
    if (!fs.existsSync(blogsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory);

    // Filter files based on language suffix
    // ar: no suffix (or .ar.md if we wanted, but sticking to legacy for now)
    // fr: .fr.md
    // en: .en.md
    const targetFiles = fileNames.filter(fileName => {
        if (lang === "ar") {
            // Match .md files that DO NOT have .fr.md or .en.md
            return fileName.endsWith(".md") && !fileName.endsWith(".fr.md") && !fileName.endsWith(".en.md");
        }
        return fileName.endsWith(`.${lang}.md`);
    });

    const allPostsData = targetFiles.map((fileName) => {
        // Remove ".md" and language suffix from file name to get slug
        const slug = fileName.replace(/\.(?:[a-z]{2}\.)?md$/, "");

        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || slug,
            description: data.description || "",
            date: data.date || new Date().toISOString(),
            content,
            image: resolveImage(slug, data.image, lang),
            language: lang,
            readingTime: calculateReadingTime(content, lang),
            category: data.category || "law",
            // Parse optional FAQ items from frontmatter for Google rich snippets
            ...(Array.isArray(data.faq) && data.faq.length > 0 ? { faq: data.faq } : {}),
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getPostBySlug(slug: string, lang: BlogLanguage = "ar"): BlogPost | null {
    try {
        let fileName = `${slug}.md`;
        if (lang !== "ar") {
            fileName = `${slug}.${lang}.md`;
        }

        const fullPath = path.join(blogsDirectory, fileName);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || slug,
            description: data.description || "",
            date: data.date || new Date().toISOString(),
            content,
            image: resolveImage(slug, data.image, lang),
            language: lang,
            readingTime: calculateReadingTime(content, lang),
            category: data.category || "law",
            // Parse optional FAQ items from frontmatter for Google rich snippets
            ...(Array.isArray(data.faq) && data.faq.length > 0 ? { faq: data.faq } : {}),
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug} (${lang}):`, error);
        return null;
    }
}

/**
 * Get related posts for internal linking
 * @param currentSlug The slug of the post to exclude
 * @param lang The language of posts to search for
 * @param limit Number of related posts to return
 * @returns Array of BlogPost objects
 */
export function getRelatedPosts(currentSlug: string, lang: BlogLanguage = "ar", limit: number = 3): BlogPost[] {
    const allPosts = getAllPosts(lang);
    return allPosts
        .filter(post => post.slug !== currentSlug)
        .slice(0, limit);
}
