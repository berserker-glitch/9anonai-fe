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
import { BlogJsonLd } from "@/components/blog/blog-json-ld";
import Image from "next/image";

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
        // Canonical URL prevents duplicate content issues
        alternates: {
            canonical: `https://9anonai.com/blog/${slug}`,
        },
        // Keywords meta tag from frontmatter
        ...(post.keywords && post.keywords.length > 0 ? {
            keywords: post.keywords.join(", "),
        } : {}),
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            modifiedTime: post.lastModified || post.date,
            authors: [post.author || "9anon AI Team"],
            // og:image for rich social previews
            ...(post.image ? {
                images: [{
                    url: post.image.startsWith("http") ? post.image : `https://9anonai.com${post.image}`,
                    alt: post.imageAlt || post.title,
                }],
            } : {}),
        },
        // Twitter card for rich Twitter previews
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            ...(post.image ? {
                images: [post.image.startsWith("http") ? post.image : `https://9anonai.com${post.image}`],
            } : {}),
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

    const relatedPosts = getRelatedPosts(slug, lang, 3, post.keywords);
    const isRtl = lang === "ar";
    const pageUrl = `https://9anonai.com/blog/${slug}`;

    return (
        <div className={`min-h-screen bg-background text-foreground font-sans ${isRtl ? "font-arabic" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
            <Header />

            {/* Article + FAQ + Breadcrumb JSON-LD for Google rich results */}
            <BlogJsonLd
                title={post.title}
                description={post.description}
                date={post.date}
                lastModified={post.lastModified}
                author={post.author}
                image={post.image}
                imageAlt={post.imageAlt}
                url={pageUrl}
                slug={slug}
                lang={lang}
                faq={post.faq}
                keyTakeaways={post.keyTakeaways}
            />

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
                        {/* Hero image with SEO-optimized alt text and semantic HTML */}
                        {post.image && (
                            <figure className="mb-10">
                                <div className="w-full relative h-[300px] sm:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-border/40">
                                    <Image
                                        src={post.image}
                                        alt={post.imageAlt || post.title}
                                        title={post.imageAlt || post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none"></div>
                                </div>
                                {/* AI-generated image disclaimer as figcaption — Google uses this for image context */}
                                <figcaption className="mt-2 text-xs text-muted-foreground/60 flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        {isRtl
                                            ? "هذه الصورة تم إنشاؤها بواسطة الذكاء الاصطناعي لأغراض توضيحية. الأشخاص والمشاهد المصورة ليست حقيقية."
                                            : "This image was AI-generated for illustrative purposes. Any people or scenes depicted are not real."}
                                    </span>
                                </figcaption>
                            </figure>
                        )}
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
