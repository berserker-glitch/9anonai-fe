import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Adjusted path to point to content/blogs at the root or specific location
// Since this is running in Next.js, process.cwd() is usually the root of the implementation (FE)
const contentDirectory = path.join(process.cwd(), 'content/blogs');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

export function getAllPosts(): BlogPost[] {
    // Ensure directory exists to prevent crash on first load if empty
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                date: data.date || new Date().toISOString(),
                description: data.description || '',
                content,
            };
        });

    return allPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.md`);
        if (!fs.existsSync(fullPath)) {
            return null;
        }
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString(),
            description: data.description || '',
            content,
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}
