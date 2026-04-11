/**
 * @fileoverview Central registry that exports all SEO page configs.
 * The dynamic [lang]/[slug]/page.tsx route imports from this single file.
 *
 * WHY a separate registry: keeps each data file focused on one domain,
 * while providing a single lookup point for the dynamic route.
 * @module lib/seo-pages-registry
 */

import { SEOPageConfig, SEO_PAGE_SLUGS } from "./seo-page-types";
import { legalAiPage, legalChatbotPage, onlineConsultationPage } from "./seo-data-general";
import { divorceLawPage, employeeRightsPage, tenantRightsPage, familyLawPage, laborLawPage, trafficLawPage } from "./seo-data-individual";
import { businessLegalPage, startupLegalPage, contractReviewPage, commercialLawPage } from "./seo-data-business";
import { taxLegalPage } from "./seo-data-finance";
import { inheritanceLawPage, immigrationLawPage } from "./seo-data-civic";
import { rentalLawPage, realEstateLawPage } from "./seo-data-property";
import { cybersecurityLawPage, cryptoLawPage, digitalLawPage } from "./seo-data-digital";

/**
 * Master map of slug → page config.
 * Slugs must match entries in SEO_PAGE_SLUGS (seo-page-types.ts).
 */
export const SEO_PAGES: Record<string, SEOPageConfig> = {
    // Core AI / consultation
    "legal-ai": legalAiPage,
    "legal-chatbot": legalChatbotPage,
    "online-consultation": onlineConsultationPage,
    // Individual rights
    "divorce-law": divorceLawPage,
    "employee-rights": employeeRightsPage,
    "tenant-rights": tenantRightsPage,
    "inheritance-law": inheritanceLawPage,
    "immigration-law": immigrationLawPage,
    // Business / commercial
    "business-legal": businessLegalPage,
    "startup-legal": startupLegalPage,
    "contract-review": contractReviewPage,
    "commercial-law": commercialLawPage,
    "tax-legal": taxLegalPage,
    // Property
    "rental-law": rentalLawPage,
    "real-estate-law": realEstateLawPage,
    // Digital law
    "cybersecurity-law": cybersecurityLawPage,
    "crypto-law": cryptoLawPage,
    "digital-law": digitalLawPage,
    // Topic hub pages (trilingual — migrated from standalone /family-law etc.)
    "family-law": familyLawPage,
    "labor-law": laborLawPage,
    "traffic-law": trafficLawPage,
};

/**
 * Get a page config by slug, returns undefined if not found
 * @param {string} slug - The URL slug
 * @returns The page config or undefined
 */
export function getPageBySlug(slug: string): SEOPageConfig | undefined {
    return SEO_PAGES[slug];
}

/**
 * Get all valid slugs — used by generateStaticParams
 * @returns Array of all registered page slugs
 */
export function getAllSlugs(): string[] {
    return Object.keys(SEO_PAGES);
}

export { SEO_PAGE_SLUGS };
