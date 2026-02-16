import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { getPostBySlug, getAllPosts, BlogLanguage, getRelatedPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";
import { BlogPromotion } from "@/components/blog/blog-promotion";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";

export async function generateStaticParams() {
    const supportedLangs: BlogLanguage[] = ["ar", "fr", "en"];
    const params: { lang: string; slug: string }[] = [];

    // For each language, get all posts
    supportedLangs.forEach(lang => {
        const posts = getAllPosts(lang);
        posts.forEach(post => {
            params.push({
                lang,
                slug: post.slug,
            });
        });
    });

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: BlogLanguage; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const post = getPostBySlug(slug, lang);

    if (!post) {
        return {
            title: "404 | 9anon AI",
        };
    }

    const titles = {
        ar: " | 9anon AI - قانون",
        fr: " | 9anon AI",
        en: " | 9anon AI",
    };

    return {
        title: `${post.title}${titles[lang] || titles.ar}`,
        description: post.description,
        alternates: {
            canonical: `https://9anonai.com/${lang}/blog/${slug}`,
            languages: {
                "ar-MA": `https://9anonai.com/ar/blog/${slug}`,
                "fr-MA": `https://9anonai.com/fr/blog/${slug}`,
                "en-US": `https://9anonai.com/en/blog/${slug}`,
            },
        },
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: ["9anon AI Team"],
            locale: lang === "ar" ? "ar_MA" : lang === "fr" ? "fr_MA" : "en_US",
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ lang: BlogLanguage; slug: string }> }) {
    const { lang, slug } = await params;
    const post = getPostBySlug(slug, lang);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, lang);
    const dir = lang === "ar" ? "rtl" : "ltr";
    const isRtl = lang === "ar";
    const pageUrl = `https://9anonai.com/${lang}/blog/${slug}`;

    const labels = {
        ar: {
            back: "العودة للمدونة",
            team: "فريق 9anon AI",
            readTime: (min: number) => `${min} دقائق قراءة`,
            blogLabel: "المدونة",
        },
        fr: {
            back: "Retour au blog",
            team: "Équipe 9anon AI",
            readTime: (min: number) => `${min} min de lecture`,
            blogLabel: "Blog",
        },
        en: {
            back: "Back to Blog",
            team: "9anon AI Team",
            readTime: (min: number) => `${min} min read`,
            blogLabel: "Blog",
        },
    };

    const t = labels[lang] || labels.ar;

    // JSON-LD Schema for Blog Posting (enhanced with wordCount)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": post.date,
        "dateModified": post.date,
        "description": post.description,
        "wordCount": post.content.trim().split(/\s+/).length,
        "author": {
            "@type": "Organization",
            "name": "9anon AI Team",
            "url": "https://9anonai.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "9anon AI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://9anonai.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
        },
        "inLanguage": lang
    };

    return (
        <div className={`min-h-screen bg-background text-foreground font-sans ${isRtl ? "font-arabic" : ""}`} dir={dir}>
            {/* BlogPosting JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
                {/* Breadcrumbs with JSON-LD for Google rich snippets */}
                <Breadcrumbs
                    items={[
                        { label: "9anon AI", href: "/" },
                        { label: t.blogLabel, href: `/${lang}/blog` },
                        { label: post.title },
                    ]}
                />

                <article className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
                    <header className="mb-10 not-prose border-b border-border/40 pb-10">
                        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6 text-foreground leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{t.team}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            {/* Reading time estimate */}
                            <span className="inline-flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t.readTime(post.readingTime)}
                            </span>
                        </div>

                        {/* Social share buttons */}
                        <ShareButtons url={pageUrl} title={post.title} lang={lang} />
                    </header>

                    {/* Auto-generated Table of Contents */}
                    <TableOfContents content={post.content} lang={lang} />

                    <div className={`markdown-content ${isRtl ? "font-arabic" : "font-sans"}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Bottom share buttons */}
                    <div className="not-prose border-t border-border/40 mt-12 pt-6">
                        <ShareButtons url={pageUrl} title={post.title} lang={lang} />
                    </div>

                    {/* Promotion banner */}
                    <div className="not-prose mt-8">
                        <BlogPromotion lang={lang} />
                    </div>

                    {/* Related Articles for internal linking */}
                    <div className="not-prose">
                        <RelatedPosts posts={relatedPosts} lang={lang} />
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
