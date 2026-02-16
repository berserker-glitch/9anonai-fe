import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Supported languages
export type BlogLanguage = "ar" | "fr" | "en";

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: string;
    language: BlogLanguage;
    /** Estimated reading time in minutes */
    readingTime: number;
    /** Category tag for grouping (from frontmatter, defaults to "law") */
    category: string;
}

const blogsDirectory = path.join(process.cwd(), "content/blogs");

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
            language: lang,
            readingTime: calculateReadingTime(content, lang),
            category: data.category || "law",
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
            language: lang,
            readingTime: calculateReadingTime(content, lang),
            category: data.category || "law",
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
