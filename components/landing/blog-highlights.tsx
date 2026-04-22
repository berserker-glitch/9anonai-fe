"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

/** Minimal shape returned by /api/blog/featured-images */
interface FeaturedPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    image: string;
    readingTime: number;
    category: string;
    /** SEO-optimized alt text for the cover image */
    imageAlt?: string;
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
        fetch(`/api/blog/featured-images?lang=${lang}`)
            .then((r) => r.json())
            .then((data: FeaturedPost[]) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [lang]);

    if (loading) {
        return (
            <section className="py-24 lg:py-32" aria-hidden="true">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-14 space-y-4">
                        <div className="skeleton h-6 w-32 rounded-full mx-auto" />
                        <div className="skeleton h-10 w-64 rounded-lg mx-auto" />
                        <div className="skeleton h-4 w-80 rounded mx-auto" />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-border/40 overflow-hidden">
                                <div className="skeleton h-52 w-full" />
                                <div className="p-6 space-y-3">
                                    <div className="skeleton h-3 w-20 rounded" />
                                    <div className="skeleton h-6 w-full rounded" />
                                    <div className="skeleton h-4 w-3/4 rounded" />
                                    <div className="skeleton h-4 w-1/2 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (posts.length === 0) return null;

    return (
        <section
            className="py-24 lg:py-32 relative overflow-hidden"
            dir={isRtl ? "rtl" : "ltr"}
            aria-labelledby="blog-highlights-heading"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-14 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <span className="w-8 h-px bg-primary/40" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t.tag}</span>
                        <span className="w-8 h-px bg-primary/40" />
                    </div>
                    <h2
                        id="blog-highlights-heading"
                        className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold mb-4 tracking-tight leading-[1.12]"
                    >
                        {t.title}{" "}
                        <span className="text-gradient-emerald">{t.highlight}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.sub}</p>
                </div>

                {/* Card Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, i) => (
                        <Link
                            key={post.slug}
                            href={`/${lang}/blog/${post.slug}`}
                            className="group flex flex-col bg-muted/20 rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300"
                        >
                            {/* Cover image */}
                            <div className="h-52 flex-shrink-0 relative overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={post.image}
                                    alt={post.imageAlt || post.title}
                                    title={post.imageAlt || post.title}
                                    loading="lazy"
                                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Bottom fade into card body */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                                {/* Category badge */}
                                <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 glass-premium border border-border/40 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest z-10">
                                    {post.category}
                                </span>
                            </div>

                            {/* Card body */}
                            <div className="p-6 flex flex-col flex-1">
                                {/* Meta */}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString(
                                            lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US",
                                            { year: "numeric", month: "short", day: "numeric" }
                                        )}
                                    </time>
                                    <span className="text-border">•</span>
                                    <span className="inline-flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {t.readTime(post.readingTime)}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                    {post.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground line-clamp-2 mb-6 flex-1 text-sm leading-relaxed">
                                    {post.description}
                                </p>

                                {/* Read more */}
                                <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                                    <span className="text-sm font-semibold text-primary">{t.readMore}</span>
                                    <ArrowRight className={`w-4 h-4 text-primary transition-transform duration-300 group-hover:translate-x-1 ${isRtl ? "rotate-180" : ""}`} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View all */}
                <div className="mt-12 text-center">
                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-3 btn-premium px-8 py-4 font-semibold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl shadow-lg shadow-primary/20 group"
                    >
                        <span>{t.viewAll}</span>
                        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180" : ""}`} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
