"use client";

import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { FAQSection, FAQItem } from "@/components/landing/faq-section";

/**
 * @description Shape for a related page link shown in the "Related Topics" section
 */
export interface RelatedLink {
    href: string;
    label: string;
}

/**
 * @description Feature item for the features grid
 */
export interface FeatureItem {
    icon: string;  // Emoji or icon character
    title: string;
    description: string;
}

/**
 * @description Content section with heading and paragraph for indexable content
 */
export interface ContentSection {
    heading: string;
    text: string;
}

/**
 * @description Props for the SEOLandingPage component
 * @property {string} badge - Small badge text above the H1 (e.g., "AI Legal Assistant")
 * @property {string} h1 - The main H1 heading (must contain primary keyword)
 * @property {string} subtitle - Paragraph below H1 explaining the page purpose
 * @property {string} ctaText - Text for the main CTA button
 * @property {string} ctaHref - Link destination for the CTA (usually "/chat")
 * @property {FAQItem[]} faqItems - FAQ questions and answers
 * @property {string} faqTitle - FAQ section title
 * @property {RelatedLink[]} relatedLinks - Internal links to related pages
 * @property {FeatureItem[]} features - Feature grid items
 * @property {ContentSection[]} contentSections - Additional text content for SEO depth
 * @property {string} [gradientFrom] - Gradient start color class (default: "from-primary")
 * @property {string} [gradientTo] - Gradient end color class (default: "to-primary/90")
 * @property {string} [glowColor] - Background glow color class (default: "bg-primary/20")
 * @property {string} [dir] - Text direction ('ltr' or 'rtl')
 */
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
}

/**
 * @description Reusable SEO-optimized landing page template.
 * WHY this structure matters for ranking:
 * - Single H1 matching primary keyword
 * - H2/H3 hierarchy for content sections and FAQs
 * - 800+ words of indexable text content
 * - Internal links for topical clustering
 * - FAQ section targeting "People Also Ask" snippets
 * - Strong CTA driving user engagement (reduces bounce rate)
 */
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
    gradientFrom = "from-primary",
    gradientTo = "to-primary/90",
    glowColor = "bg-primary/20",
    dir = "ltr",
}: SEOLandingPageProps) {
    return (
        <div className="min-h-screen bg-background overflow-hidden" dir={dir}>
            <Header />

            {/* === HERO SECTION === */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
                <div className="absolute inset-0 bg-dots opacity-30" />
                <div className={`absolute top-20 right-[10%] w-[400px] h-[400px] ${glowColor} rounded-full blur-[120px] opacity-40`} />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-emerald mb-8">
                        <span className="text-sm font-medium text-gradient-emerald">{badge}</span>
                    </div>

                    {/* H1 — THE most important on-page SEO element */}
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                        {h1}
                    </h1>

                    {/* Subtitle with SEO-rich description */}
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Primary CTA */}
                    <Link
                        href={ctaHref}
                        className={`inline-flex items-center gap-3 btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all`}
                    >
                        <span>{ctaText}</span>
                        <svg className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* === FEATURES GRID === */}
            <section className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="glass-premium rounded-2xl p-6 sm:p-8 border border-border/40 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="font-display text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CONTENT SECTIONS (indexable text for SEO depth) === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    {contentSections.map((section, i) => (
                        <div key={i} className="mb-12 last:mb-0">
                            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                                {section.heading}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                                {section.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* === FAQ SECTION === */}
            <FAQSection items={faqItems} title={faqTitle} dir={dir} />

            {/* === INTERNAL LINKS (topical clustering) === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
                        {dir === "rtl" ? "مواضيع قانونية ذات صلة" : "Related Legal Topics"}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {relatedLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="inline-flex items-center px-5 py-2.5 rounded-full glass-premium border border-border/40 text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* === FINAL CTA === */}
            <section className="py-16 sm:py-20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
                        {dir === "rtl" ? "ابدأ استشارتك القانونية المجانية الآن" : "Start Your Free Legal Consultation Now"}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                        {dir === "rtl"
                            ? "اسأل 9anon AI أي سؤال قانوني مجاناً. إجابات فورية ودقيقة حول القانون المغربي."
                            : "Ask 9anon AI any legal question for free. Get instant, accurate answers about Moroccan law."}
                    </p>
                    <Link
                        href={ctaHref}
                        className={`inline-flex items-center gap-3 btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r ${gradientFrom} ${gradientTo} text-primary-foreground rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all`}
                    >
                        <span>{ctaText}</span>
                        <svg className={`w-5 h-5 ${dir === "rtl" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
