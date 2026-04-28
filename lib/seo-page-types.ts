/**
 * @fileoverview Type definitions and shared utilities for SEO landing pages.
 * Each trilingual page uses these types for consistent data structure.
 * @module lib/seo-page-types
 */

import { FAQItem } from "@/components/landing/faq-section";
import { FeatureItem, ContentSection, RelatedLink } from "@/components/landing/seo-landing-page";

/**
 * @description Trilingual text — one value per supported language
 */
export interface TrilingualText {
    ar: string;
    en: string;
    fr: string;
}

/**
 * @description Complete page configuration for one SEO landing page
 * across all 3 languages
 */
export interface SEOPageConfig {
    /** URL slug (e.g., "legal-ai") */
    slug: string;
    /** Page titles per language */
    titles: TrilingualText;
    /** Meta descriptions per language */
    descriptions: TrilingualText;
    /** Meta keywords per language */
    keywords: { ar: string[]; en: string[]; fr: string[] };
    /** H1 heading per language */
    h1: TrilingualText;
    /** Badge text above H1 */
    badge: TrilingualText;
    /** Subtitle paragraph below H1 */
    subtitle: TrilingualText;
    /** CTA button text */
    ctaText: TrilingualText;
    /** FAQ section title */
    faqTitle: TrilingualText;
    /** FAQ items per language */
    faqItems: { ar: FAQItem[]; en: FAQItem[]; fr: FAQItem[] };
    /** Feature cards (same across langs for now, can be extended) */
    features: { ar: FeatureItem[]; en: FeatureItem[]; fr: FeatureItem[] };
    /** Content sections per language */
    contentSections: { ar: ContentSection[]; en: ContentSection[]; fr: ContentSection[] };
    /** Related page links (shared across langs) */
    relatedLinks: RelatedLink[];
    /** Gradient colors */
    gradientFrom?: string;
    gradientTo?: string;
    glowColor?: string;
}

/**
 * Helper to get localized value from a TrilingualText object
 * @param {TrilingualText} text - The trilingual text object
 * @param {string} lang - The language code (ar, en, fr)
 * @returns The text in the requested language, falling back to English
 */
export function t(text: TrilingualText, lang: string): string {
    return text[lang as keyof TrilingualText] || text.en;
}

/**
 * All valid SEO page slugs — single source of truth.
 * Used by: generateStaticParams (app/[lang]/[slug]/page.tsx),
 *           sitemap (app/sitemap.ts), and middleware (middleware.ts).
 * Adding a slug here + registering it in seo-pages-registry.ts is all that's needed.
 */
export const SEO_PAGE_SLUGS = [
    // Core AI / consultation pages
    "legal-ai",
    "legal-chatbot",
    "online-consultation",
    // Individual rights pages
    "divorce-law",
    "employee-rights",
    "tenant-rights",
    "inheritance-law",
    "immigration-law",
    // Business / commercial pages
    "business-legal",
    "startup-legal",
    "contract-review",
    "commercial-law",
    "tax-legal",
    // Property / real-estate pages
    "rental-law",
    "real-estate-law",
    // Digital law pages
    "cybersecurity-law",
    "crypto-law",
    "digital-law",
    // Topic hub pages (migrated from standalone /family-law etc.)
    "family-law",
    "labor-law",
    "traffic-law",
    // New high-impression zero-click opportunity pages
    "consumer-protection",
    "company-registration",
    "citizenship-law",
] as const;

export type SEOPageSlug = typeof SEO_PAGE_SLUGS[number];
