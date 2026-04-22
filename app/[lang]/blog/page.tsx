import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { getAllPosts, BlogLanguage } from "@/lib/blog";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { BlogGrid } from "@/components/blog/blog-grid";

export async function generateMetadata({ params }: { params: Promise<{ lang: BlogLanguage }> }) {
    const { lang } = await params;

    const titles = {
        ar: "مدونة القانون المغربي | 9anon AI",
        fr: "Blog Juridique Marocain | 9anon AI",
        en: "Moroccan Law Blog | 9anon AI",
    };

    const descriptions = {
        ar: "آخر المستجدات القانونية، شروحات مبسطة للقوانين المغربية، وتحليلات للإصلاحات الجديدة. 9anon AI - مصدرك الموثوق للمعلومة القانونية.",
        fr: "Dernières actualités juridiques, explications simplifiées des lois marocaines et analyses des nouvelles réformes. 9anon AI - Votre source fiable d'informations juridiques.",
        en: "Latest legal updates, simplified explanations of Moroccan laws, and analysis of new reforms. 9anon AI - Your trusted source for legal information.",
    };

    return {
        title: titles[lang] || titles.ar,
        description: descriptions[lang] || descriptions.ar,
    };
}

export async function generateStaticParams() {
    return [
        { lang: "ar" },
        { lang: "fr" },
        { lang: "en" },
    ];
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: BlogLanguage }> }) {
    const { lang } = await params;
    const posts = getAllPosts(lang);
    const dir = lang === "ar" ? "rtl" : "ltr";
    const isRtl = lang === "ar";

    const labels = {
        ar: {
            title: "المدونة",
            subtitle: "القانونية",
            desc: "اكتشف أحدث المقالات والتحليلات حول القانون المغربي، الإصلاحات الجديدة، والنصائح القانونية.",
            readMore: "اقرأ المزيد",
            category: "قانون",
            featured: "مقال مميز",
            readTime: (min: number) => `${min} دقائق قراءة`,
        },
        fr: {
            title: "Blog",
            subtitle: "Juridique",
            desc: "Découvrez les derniers articles et analyses sur le droit marocain, les nouvelles réformes et des conseils juridiques.",
            readMore: "Lire la suite",
            category: "Droit",
            featured: "Article en vedette",
            readTime: (min: number) => `${min} min de lecture`,
        },
        en: {
            title: "Legal",
            subtitle: "Blog",
            desc: "Discover the latest articles and analysis on Moroccan law, new reforms, and legal advice.",
            readMore: "Read More",
            category: "Law",
            featured: "Featured Article",
            readTime: (min: number) => `${min} min read`,
        },
    };

    const t = labels[lang] || labels.ar;

    // JSON-LD for Blog listing page
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": `${t.title} ${t.subtitle}`,
        "description": t.desc,
        "url": `https://9anonai.com/${lang}/blog`,
        "publisher": {
            "@type": "Organization",
            "name": "9anon AI",
            "url": "https://9anonai.com",
        },
        "blogPost": posts.slice(0, 10).map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "datePublished": post.date,
            "url": `https://9anonai.com/${lang}/blog/${post.slug}`,
        })),
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans" dir={dir}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Header />

            {/* Hero */}
            <section className="relative pt-36 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient" />
                <div className="absolute inset-0 bg-background/50" />
                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <Breadcrumbs
                        items={[
                            { label: "9anon AI", href: "/" },
                            { label: `${t.title} ${t.subtitle}` },
                        ]}
                    />
                    <div className="mt-8 max-w-3xl">
                        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.06]">
                            <span className="block text-foreground">{t.title}</span>
                            <span className="block text-gradient-emerald italic pb-[0.2em] -mb-[0.2em]">{t.subtitle}</span>
                        </h1>
                        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
                            {t.desc}
                        </p>
                    </div>
                </div>
            </section>

            <main className="pb-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto pt-12">
                <BlogGrid posts={posts} lang={lang} dir={dir} />
            </main>

            <Footer />
        </div>
    );
}
