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
            {/* Blog listing JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: "9anon AI", href: "/" },
                        { label: `${t.title} ${t.subtitle}` },
                    ]}
                />

                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        {t.title} <span className="text-gradient-emerald">{t.subtitle}</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t.desc}
                    </p>
                </div>

                {/* Interactive Blog Grid with Categories */}
                <BlogGrid posts={posts} lang={lang} dir={dir} />
            </main>

            <Footer />
        </div>
    );
}
