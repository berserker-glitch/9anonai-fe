import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { BlogPromotion } from "@/components/blog/blog-promotion";

export const metadata = {
    title: "مدونة القانون المغربي | 9anon AI",
    description: "آخر المستجدات القانونية، شروحات مبسطة للقوانين المغربية، وتحليلات للإصلاحات الجديدة. 9anon AI - مصدرك الموثوق للمعلومة القانونية.",
};

export default function BlogIndex() {
    const posts = getAllPosts();
    const [featuredPost, ...restPosts] = posts;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans" dir="rtl">
            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: "9anon AI", href: "/" },
                        { label: "المدونة القانونية" },
                    ]}
                />

                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        المدونة <span className="text-gradient-emerald">القانونية</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        اكتشف أحدث المقالات والتحليلات حول القانون المغربي، الإصلاحات الجديدة، والنصائح القانونية.
                    </p>
                </div>

                {/* Featured Post Hero */}
                {featuredPost && (
                    <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="group relative block glass-premium rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-border/40 mb-12"
                    >
                        <div className="p-8 md:p-12 flex flex-col h-full">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wider">
                                    مقال مميز
                                </span>
                                <time dateTime={featuredPost.date}>
                                    {new Date(featuredPost.date).toLocaleDateString("ar-MA", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {featuredPost.readingTime} دقائق قراءة
                                </span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                {featuredPost.title}
                            </h2>

                            <p className="text-muted-foreground text-lg mb-6 max-w-3xl leading-relaxed">
                                {featuredPost.description}
                            </p>

                            <div className="mt-auto flex items-center text-primary font-medium">
                                <span>اقرأ المزيد</span>
                                <svg className="w-5 h-5 mr-2 rtl:rotate-180 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>

                        {/* Background gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </Link>
                )}

                {/* CTA banner between featured and grid */}
                <div className="mb-12">
                    <BlogPromotion lang="ar" />
                </div>

                {/* Posts Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {restPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group relative flex flex-col glass-premium rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/40"
                        >
                            <div className="p-6 md:p-8 flex flex-col h-full">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString("ar-MA", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </time>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {post.readingTime} دقائق قراءة
                                    </span>
                                </div>

                                <h2 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                                    {post.description}
                                </p>

                                <div className="mt-auto flex items-center text-primary font-medium text-sm">
                                    <span>اقرأ المزيد</span>
                                    <svg className="w-4 h-4 mr-2 rtl:rotate-180 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
