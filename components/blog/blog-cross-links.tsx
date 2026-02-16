import Link from "next/link";
import { getAllPosts, BlogLanguage, BlogPost } from "@/lib/blog";

interface BlogCrossLinksProps {
    /** Language to fetch posts in */
    lang?: BlogLanguage;
    /** Maximum number of posts to show */
    limit?: number;
    /** Direction for RTL/LTR */
    dir?: "ltr" | "rtl";
}

/**
 * BlogCrossLinks Component
 * Embedded in SEO landing pages to create a bidirectional link ecosystem
 * between the landing pages and the blog content.
 * WHY: This creates "topical clusters" — Google rewards pages that link
 * to related, high-quality content within the same domain.
 */
export function BlogCrossLinks({ lang = "en", limit = 3, dir = "ltr" }: BlogCrossLinksProps) {
    const posts = getAllPosts(lang).slice(0, limit);

    if (posts.length === 0) return null;

    const labels = {
        ar: { title: "من مدونتنا القانونية", readMore: "اقرأ المزيد", viewAll: "جميع المقالات" },
        en: { title: "From Our Legal Blog", readMore: "Read More", viewAll: "View All Articles" },
        fr: { title: "De Notre Blog Juridique", readMore: "Lire la suite", viewAll: "Voir Tous les Articles" },
    };

    const t = labels[lang] || labels.en;
    const blogBase = lang === "ar" ? "/blog" : `/${lang}/blog`;

    return (
        <section className="py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">
                        {t.title}
                    </h2>
                    <Link
                        href={blogBase}
                        className="text-primary text-sm font-medium hover:underline"
                    >
                        {t.viewAll} →
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`${blogBase}/${post.slug}`}
                            className="group block glass-premium p-6 rounded-2xl hover:shadow-lg transition-all border border-border/40 hover:-translate-y-1"
                        >
                            {/* Reading time badge */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                    {post.readingTime} min
                                </span>
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>

                            <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                {post.description}
                            </p>
                            <span className="text-primary text-sm font-medium">
                                {t.readMore} →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
