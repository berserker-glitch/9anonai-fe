import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { getPostBySlug, getAllPosts, getRelatedPosts, BlogLanguage } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogPromotion } from "@/components/blog/blog-promotion";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "المقال غير موجود | 9anon AI",
        };
    }

    return {
        title: `${post.title} | 9anon AI`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: ["9anon AI Team"],
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const lang: BlogLanguage = "ar";
    const post = getPostBySlug(slug, lang);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, lang);
    const isRtl = lang === "ar";
    const pageUrl = `https://9anonai.com/blog/${slug}`;

    return (
        <div className={`min-h-screen bg-background text-foreground font-sans ${isRtl ? "font-arabic" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
                {/* Breadcrumbs with JSON-LD for Google rich snippets */}
                <Breadcrumbs
                    items={[
                        { label: "9anon AI", href: "/" },
                        { label: isRtl ? "المدونة" : "Blog", href: "/blog" },
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
                                {new Date(post.date).toLocaleDateString(isRtl ? "ar-MA" : "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>9anon AI Team</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            {/* Reading time estimate */}
                            <span className="inline-flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {isRtl ? `${post.readingTime} دقائق قراءة` : `${post.readingTime} min read`}
                            </span>
                        </div>

                        {/* Social share buttons */}
                        <ShareButtons url={pageUrl} title={post.title} lang={lang} />
                    </header>

                    {/* Auto-generated Table of Contents */}
                    <TableOfContents content={post.content} lang={lang} />

                    <div className="markdown-content">
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
