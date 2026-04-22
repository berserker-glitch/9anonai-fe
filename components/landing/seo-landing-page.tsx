"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { FAQSection, FAQItem } from "@/components/landing/faq-section";
import { BlogCrossLinks } from "@/components/blog/blog-cross-links";

export interface RelatedLink {
    href: string;
    label: string;
}

export interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface ContentSection {
    heading: string;
    text: string;
}

interface SEOLandingPageProps {
    badge: string;
    h1: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    faqItems: FAQItem[];
    faqTitle: string;
    relatedLinks: RelatedLink[];
    features: FeatureItem[];
    contentSections: ContentSection[];
    gradientFrom?: string;
    gradientTo?: string;
    glowColor?: string;
    dir?: "ltr" | "rtl";
    blogPosts?: { slug: string; title: string; description: string; date: string; readingTime: number }[];
}

export function SEOLandingPage({
    badge,
    h1,
    subtitle,
    ctaText,
    ctaHref,
    faqItems,
    faqTitle,
    relatedLinks,
    features,
    contentSections,
    dir = "ltr",
    blogPosts = [],
}: SEOLandingPageProps) {
    const isRtl = dir === "rtl";

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-scroll-reveal");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const relatedTitle = isRtl ? "مواضيع قانونية ذات صلة" : "Related Legal Topics";
    const finalCtaTitle = isRtl ? "ابدأ استشارتك القانونية المجانية" : "Start Your Free Legal Consultation";
    const finalCtaDesc = isRtl
        ? "اسأل 9anon AI أي سؤال قانوني مجاناً. إجابات فورية ودقيقة حول القانون المغربي."
        : "Ask 9anon AI any legal question for free. Get instant, accurate answers about Moroccan law.";

    return (
        <div className="min-h-screen bg-background overflow-hidden" dir={dir}>
            <Header />

            {/* ── HERO ── */}
            <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-mesh-gradient" />
                <div className="absolute inset-0 bg-background/40" />

                <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    {/* Pulsing badge */}
                    <div className="animate-reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">{badge}</span>
                    </div>

                    {/* H1 */}
                    <h1 className={`animate-reveal-up delay-100 font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] ${isRtl ? "text-right" : ""}`}>
                        <span className="text-gradient-emerald">{h1}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`animate-reveal-up delay-200 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed ${isRtl ? "text-right" : ""}`}>
                        {subtitle}
                    </p>

                    {/* CTA */}
                    <div className="animate-reveal-up delay-300">
                        <Link
                            href={ctaHref}
                            className="inline-flex items-center gap-3 btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl shadow-xl shadow-primary/25 group"
                        >
                            <span>{ctaText}</span>
                            <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? "rotate-180" : ""}`} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-muted/15 via-transparent to-muted/15 pointer-events-none" />
                <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Section header */}
                    <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <span className="w-8 h-px bg-primary/40" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{badge}</span>
                            <span className="w-8 h-px bg-primary/40" />
                        </div>
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12]">
                            {isRtl ? "ما الذي نقدمه لك" : "What We Offer"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="relative bg-muted/20 hover:bg-muted/40 rounded-2xl p-8 lg:p-10 transition-all duration-300 scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700"
                            >
                                <div className={`flex items-center gap-3 mb-5 ${isRtl ? "flex-row-reverse" : ""}`}>
                                    <span className="font-mono text-xs font-bold tracking-widest text-primary/40">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className={`font-display font-bold text-lg mb-3 ${isRtl ? "text-right" : ""}`}>
                                    {feature.title}
                                </h3>
                                <p className={`text-muted-foreground text-sm leading-relaxed ${isRtl ? "text-right" : ""}`}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTENT SECTIONS ── */}
            <section className="py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
                <div className="relative max-w-3xl mx-auto px-6 sm:px-8">
                    {contentSections.map((section, i) => (
                        <div
                            key={i}
                            className="mb-14 last:mb-0 scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700"
                        >
                            <div className={`flex items-center gap-3 mb-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                                <span className="w-6 h-px bg-primary/40" />
                                <span className="font-mono text-xs font-bold tracking-widest text-primary/50 uppercase">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <h2 className={`font-display text-2xl sm:text-3xl font-bold mb-4 leading-snug ${isRtl ? "text-right" : ""}`}>
                                {section.heading}
                            </h2>
                            <p className={`text-muted-foreground leading-relaxed text-base sm:text-lg ${isRtl ? "text-right" : ""}`}>
                                {section.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <FAQSection items={faqItems} title={faqTitle} dir={dir} />

            {/* ── RELATED LINKS ── */}
            <section className="py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-muted/15 pointer-events-none" />
                <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-12 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <span className="w-8 h-px bg-primary/40" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{relatedTitle}</span>
                            <span className="w-8 h-px bg-primary/40" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                        {relatedLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className={`group flex items-center gap-4 px-5 py-4 rounded-xl bg-muted/25 hover:bg-muted/50 transition-all duration-200 ${isRtl ? "flex-row-reverse" : ""}`}
                            >
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm font-semibold text-foreground/80">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BLOG CROSS-LINKS ── */}
            {blogPosts.length > 0 && (
                <BlogCrossLinks
                    posts={blogPosts}
                    lang={isRtl ? "ar" : "en"}
                    blogBasePath={isRtl ? "/blog" : "/en/blog"}
                    dir={dir}
                />
            )}

            {/* ── FINAL CTA ── */}
            <section className="py-28 lg:py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient" />
                <div className="absolute inset-0 bg-background/40" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[350px] rounded-full bg-primary/10 blur-[100px]" />
                </div>

                <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                    <div className="flex items-center justify-center gap-3 mb-7">
                        <span className="w-8 h-px bg-primary/40" />
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-border/40">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{badge}</span>
                        </div>
                        <span className="w-8 h-px bg-primary/40" />
                    </div>

                    <h2 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 ${isRtl ? "text-right" : ""}`}>
                        <span className="text-gradient-emerald">{finalCtaTitle}</span>
                    </h2>

                    <p className={`text-muted-foreground mb-12 max-w-2xl mx-auto text-lg leading-relaxed ${isRtl ? "text-right" : ""}`}>
                        {finalCtaDesc}
                    </p>

                    <Link
                        href={ctaHref}
                        className="inline-flex items-center gap-3 btn-premium px-12 py-6 text-xl font-bold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/30 group"
                    >
                        <span>{ctaText}</span>
                        <ArrowRight className={`w-6 h-6 group-hover:translate-x-1.5 transition-transform ${isRtl ? "rotate-180" : ""}`} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
