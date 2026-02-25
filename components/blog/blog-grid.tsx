"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { BlogPromotion } from "@/components/blog/blog-promotion";

interface BlogGridProps {
    posts: BlogPost[];
    lang: string;
    dir: string;
}

export function BlogGrid({ posts, lang, dir }: BlogGridProps) {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = useMemo(() => {
        const cats = new Set<string>();
        posts.forEach((p) => {
            if (p.category) cats.add(p.category);
        });
        return ["All", ...Array.from(cats)];
    }, [posts]);

    const filteredPosts = posts.filter(
        (p) => activeCategory === "All" || p.category === activeCategory
    );

    const featuredPost = activeCategory === "All" ? filteredPosts[0] : null;
    const restPosts = activeCategory === "All" ? filteredPosts.slice(1) : filteredPosts;

    const allLabel = lang === "ar" ? "الكل" : lang === "fr" ? "Tous" : "All";

    const uiLabels = {
        ar: {
            readMore: "اقرأ المزيد",
            category: "قانون",
            featured: "مقال مميز",
            readTime: (min: number) => `${min} دقائق قراءة`,
        },
        fr: {
            readMore: "Lire la suite",
            category: "Droit",
            featured: "Article en vedette",
            readTime: (min: number) => `${min} min de lecture`,
        },
        en: {
            readMore: "Read More",
            category: "Law",
            featured: "Featured Article",
            readTime: (min: number) => `${min} min read`,
        },
    };
    const t = uiLabels[lang as keyof typeof uiLabels] || uiLabels.ar;

    // Generates a subtle, tech-focused dark background instead of playful gradients
    const getTechBackground = (slug: string) => {
        let hash = 0;
        for (let i = 0; i < slug.length; i++) {
            hash = slug.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Use a consistent, premium dark emerald/slate palette matching the rest of the site
        const hue1 = 150 + (hash % 30); // 150-180 (emerald/teal range)

        return {
            background: `linear-gradient(135deg, hsl(${hue1}, 20%, 6%), hsl(${hue1}, 30%, 12%))`,
        };
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Category Filter Pills */}
            {categories.length > 2 && (
                <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === category
                                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10"
                                : "glass-premium text-muted-foreground border-border/40 hover:text-foreground hover:border-primary/40"
                                }`}
                        >
                            {category === "All" ? allLabel : category}
                        </button>
                    ))}
                </div>
            )}

            {/* Featured Post Hero */}
            {featuredPost && (
                <Link
                    href={`/${lang}/blog/${featuredPost.slug}`}
                    className="group relative block glass-premium rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 border border-border/40"
                >
                    <div className="flex flex-col md:flex-row h-full">
                        {/* Elegant Tech Banner / Generated Image */}
                        <div
                            className="h-48 md:h-auto md:w-[45%] flex-shrink-0 relative overflow-hidden flex items-center justify-center p-8 border-b md:border-b-0 md:rtl:border-l md:ltr:border-r border-border/40"
                            style={!featuredPost.image ? getTechBackground(featuredPost.slug) : {}}
                        >
                            {featuredPost.image ? (
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                />
                            ) : (
                                <>
                                    {/* Abstract overlay to give it a "code/tech" texture */}
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

                                    {/* Grid pattern overlay */}
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }}></div>
                                </>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"></div>
                            {!featuredPost.image && (
                                <h3 className="relative text-foreground/90 font-display font-medium text-2xl lg:text-3xl text-center leading-tight [text-wrap:balance] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                    {featuredPost.title}
                                </h3>
                            )}
                        </div>

                        <div className="p-8 md:p-12 flex flex-col flex-1 bg-background/50 backdrop-blur-sm relative overflow-hidden">
                            {/* Subtle hover glow inside the card text area */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6 relative">
                                <span className="px-3 py-1 rounded border border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-wider font-medium">
                                    {t.featured}
                                </span>
                                <time dateTime={featuredPost.date}>
                                    {new Date(featuredPost.date).toLocaleDateString(
                                        lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US",
                                        { year: "numeric", month: "long", day: "numeric" }
                                    )}
                                </time>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t.readTime(featuredPost.readingTime)}
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors leading-tight relative">
                                {featuredPost.title}
                            </h2>

                            <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-2xl leading-relaxed relative">
                                {featuredPost.description}
                            </p>

                            <div className="mt-auto flex items-center text-primary font-medium text-base relative">
                                <span>{t.readMore}</span>
                                <svg className={`w-5 h-5 mx-2 ${dir === "rtl" ? "rotate-180" : ""} transition-transform duration-300 group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* Content Promos */}
            <div className="my-2">
                <BlogPromotion lang={lang} />
            </div>

            {/* Posts Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {restPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/${lang}/blog/${post.slug}`}
                        className="group flex flex-col glass-premium rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 border border-border/40 bg-background/40 hover:bg-background/60 hover:-translate-y-0.5"
                    >
                        {/* Tech Cover Header / Image */}
                        <div
                            className="h-48 sm:h-56 flex-shrink-0 relative overflow-hidden flex items-center justify-center border-b border-border/40"
                            style={!post.image ? getTechBackground(post.slug) : {}}
                        >
                            {post.image ? (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                                        backgroundSize: '30px 30px'
                                    }}></div>
                                </>
                            )}
                            <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 px-3 py-1 rounded bg-background/80 backdrop-blur-md text-foreground text-[10px] font-medium uppercase tracking-widest z-10 border border-border/50 shadow-sm">
                                {post.category || t.category}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-0"></div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 relative overflow-hidden">
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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

                            <h2 className="text-lg font-display font-medium mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug relative">
                                {post.title}
                            </h2>

                            <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 text-sm leading-relaxed relative">
                                {post.description}
                            </p>

                            <div className="mt-auto pt-4 border-t border-border/40 flex items-center text-primary font-medium text-sm relative">
                                <span>{t.readMore}</span>
                                <svg className={`w-4 h-4 mx-2 ${dir === "rtl" ? "rotate-180" : ""} transition-transform duration-300 group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-xl mb-2">{lang === 'ar' ? "لا توجد مقالات في هذا التصنيف" : lang === 'fr' ? "Aucun article dans cette catégorie" : "No articles found in this category"}</p>
                </div>
            )}
        </div>
    );
}
