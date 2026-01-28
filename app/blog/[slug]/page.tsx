import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground font-sans" dir="rtl">
            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 text-sm"
                >
                    <svg className="w-4 h-4 ml-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    العودة للمدونة
                </Link>

                <article className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-2xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline max-w-none">
                    <header className="mb-10 not-prose border-b border-border/40 pb-10">
                        <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6 text-foreground leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString("ar-MA", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>9anon AI Team</span>
                        </div>
                    </header>

                    <div className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>

                <div className="mt-16 pt-8 border-t border-border/40 flex justify-center">
                    <Link
                        href="/"
                        className="btn-premium px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-bold transition-all"
                    >
                        استشر 9anon AI الآن في هذا الموضوع
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
