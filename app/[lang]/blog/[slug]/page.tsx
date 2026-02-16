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

    const labels = {
        ar: {
            back: "العودة للمدونة",
            cta: "استشر 9anon AI الآن في هذا الموضوع",
            team: "فريق 9anon AI",
        },
        fr: {
            back: "Retour au blog",
            cta: "Consulter 9anon AI sur ce sujet maintenant",
            team: "Équipe 9anon AI",
        },
        en: {
            back: "Back to Blog",
            cta: "Consult 9anon AI on this topic now",
            team: "9anon AI Team",
        },
    };

    const t = labels[lang] || labels.ar;

    // JSON-LD Schema for Blog Posting
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "datePublished": post.date,
        "dateModified": post.date,
        "description": post.description,
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
            "@id": `https://9anonai.com/${lang}/blog/${slug}`
        },
        "inLanguage": lang
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans" dir={dir}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
                <Link
                    href={`/${lang}/blog`}
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
                >
                    <svg className={`w-4 h-4 mx-2 ${dir === "rtl" ? "rotate-180" : ""} transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    {t.back}
                </Link>

                <article className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
                    <header className="mb-10 not-prose border-b border-border/40 pb-10">
                        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6 text-foreground leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-FR" : "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{t.team}</span>
                        </div>
                    </header>

                    <div className={`markdown-content ${lang === "ar" ? "font-arabic" : "font-sans"}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Promotion Section */}
                    <div className="mt-16 pt-8 border-t border-border/40">
                        <BlogPromotion lang={lang} />
                    </div>

                    {/* Related Articles for internal linking */}
                    <RelatedPosts posts={relatedPosts} lang={lang} />
                </article>

                <div className="mt-16 pt-8 border-t border-border/40 flex justify-center">
                    <Link
                        href={`/chat?q=${encodeURIComponent(post.title)}`}
                        className="btn-premium px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-bold transition-all"
                    >
                        {t.cta}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
