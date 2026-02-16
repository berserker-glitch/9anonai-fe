import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
    posts: BlogPost[];
    lang: string;
}

/**
 * RelatedPosts Component
 * Displays a section with links to other blog posts to improve internal linking and SEO.
 */
export function RelatedPosts({ posts, lang }: RelatedPostsProps) {
    if (posts.length === 0) return null;

    const labels = {
        ar: "مقالات ذات صلة",
        en: "Related Articles",
        fr: "Articles Connexes",
    };

    const readMore = {
        ar: "اقرأ المزيد",
        en: "Read More",
        fr: "Lire la suite",
    };

    const label = labels[lang as keyof typeof labels] || labels.ar;
    const readMoreLabel = readMore[lang as keyof typeof readMore] || readMore.ar;

    return (
        <div className="mt-20 pt-12 border-t border-border/40">
            <h2 className="text-2xl font-display font-bold mb-8 text-foreground">
                {label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block glass-premium p-6 rounded-2xl hover:shadow-lg transition-all border border-border/40 hover:-translate-y-1"
                    >
                        <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {post.description}
                        </p>
                        <div className="text-primary text-sm font-medium flex items-center">
                            {readMoreLabel}
                            <svg className="w-4 h-4 mr-2 rtl:rotate-180 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
