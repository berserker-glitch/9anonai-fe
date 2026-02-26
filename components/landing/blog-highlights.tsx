"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/** Minimal shape returned by /api/blog/featured-images */
interface FeaturedPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
    readingTime: number;
    category: string;
}

interface BlogHighlightsProps {
    /** Current page language — used to build localized blog links */
    lang: string;
}

/**
 * BlogHighlights — Homepage blog preview section.
 *
 * Fetches only posts that have a cover image from the API and renders
 * them as a card grid. Placing image-rich blog links on the homepage
 * boosts internal linking strength (PageRank flow) and encourages
 * Google to index the blog posts faster via the homepage crawl path.
 *
 * @param lang - e.g. "ar" | "fr" | "en"
 */
export function BlogHighlights({ lang }: BlogHighlightsProps) {
    const [posts, setPosts] = useState<FeaturedPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Labels per language
    const ui = {
        ar: {
            tag: "المدونة القانونية",
            title: "آخر المقالات",
            highlight: "القانونية",
            sub: "مقالات متعمقة حول القانون المغربي، مكتوبة بمساعدة الذكاء الاصطناعي.",
            readMore: "اقرأ المزيد",
            viewAll: "عرض جميع المقالات",
            readTime: (n: number) => `${n} دقائق`,
        },
        fr: {
            tag: "Blog Juridique",
            title: "Derniers Articles",
            highlight: "Juridiques",
            sub: "Articles approfondis sur le droit marocain, rédigés avec l'aide de l'IA.",
            readMore: "Lire la suite",
            viewAll: "Voir tous les articles",
            readTime: (n: number) => `${n} min`,
        },
        en: {
            tag: "Legal Blog",
            title: "Latest Legal",
            highlight: "Articles",
            sub: "In-depth articles on Moroccan law, written with AI assistance.",
            readMore: "Read More",
            viewAll: "View All Articles",
            readTime: (n: number) => `${n} min read`,
        },
    };

    const t = ui[lang as keyof typeof ui] || ui.ar;
    const isRtl = lang === "ar";

    useEffect(() => {
        // Fetch posts with images from the dedicated API endpoint
        fetch(`/api/blog/featured-images?lang=${lang}`)
            .then((r) => r.json())
            .then((data: FeaturedPost[]) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false)); // Fail silently — section just won't render
    }, [lang]); // re-fetch when language changes

    // Don't render anything while loading or if no image posts exist
    if (loading || posts.length === 0) return null;

    return (
        <section
            className="py-24 lg:py-32 relative overflow-hidden"
            dir={isRtl ? "rtl" : "ltr"}
            aria-labelledby="blog-highlights-heading"
        >
            {/* Subtle background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-14 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20">
                        {t.tag}
                    </span>
                    <h2
                        id="blog-highlights-heading"
                        className="font-display text-4xl sm:text-5xl font-bold mb-4 tracking-tight"
                    >
                        {t.title}{" "}
                        <span className="text-gradient-emerald">{t.highlight}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.sub}</p>
                </div>

                {/* Card Grid — matches blog-grid.tsx card structure exactly */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/${lang}/blog/${post.slug}`}
                            className="group flex flex-col glass-premium rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 border border-border/40 bg-background/40 hover:bg-background/60 hover:-translate-y-0.5"
                        >
                            {/* Cover image area — same dimensions as blog-grid.tsx */}
                            <div
                                className="h-48 sm:h-56 flex-shrink-0 relative overflow-hidden flex items-center justify-center border-b border-border/40"
                            >
                                {/* Plain img to avoid next/image fill CSS conflicts */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    loading="lazy"
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Category badge — exact position from blog-grid.tsx */}
                                <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 rounded bg-background/80 backdrop-blur-md text-foreground text-[10px] font-medium uppercase tracking-widest z-10 border border-border/50 shadow-sm">
                                    {post.category}
                                </span>
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-0" />
                            </div>

                            {/* Card body */}
                            <div className="p-6 flex flex-col flex-1 relative overflow-hidden">
                                {/* Hover glow — same as blog-grid.tsx */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Meta */}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 relative">
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString(
                                            lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US",
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}
                                    </time>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {t.readTime(post.readingTime)}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-display font-medium mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug relative">
                                    {post.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 text-sm leading-relaxed relative">
                                    {post.description}
                                </p>

                                {/* Read more */}
                                <div className="mt-auto pt-4 border-t border-border/40 flex items-center text-primary font-medium text-sm relative">
                                    <span>{t.readMore}</span>
                                    <svg
                                        className={`w-4 h-4 mx-2 transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View all link */}
                <div className="mt-12 text-center">
                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-2 px-8 py-4 glass-premium rounded-2xl border border-border/40 hover:border-primary/30 text-primary font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
                    >
                        <span>{t.viewAll}</span>
                        <svg
                            className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
