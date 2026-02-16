/**
 * @fileoverview Central registry that exports all SEO page configs.
 * The dynamic [lang]/[slug]/page.tsx route imports from this single file.
 * 
 * WHY a separate registry: keeps each data file focused on one domain,
 * while providing a single lookup point for the dynamic route.
 * @module lib/seo-pages-registry
 */

import { SEOPageConfig, SEO_PAGE_SLUGS } from "./seo-page-types";
import { legalAiPage, legalChatbotPage } from "./seo-data-general";
import { divorceLawPage, employeeRightsPage, tenantRightsPage } from "./seo-data-individual";
import { businessLegalPage, startupLegalPage, contractReviewPage } from "./seo-data-business";

/**
 * Master map of slug → page config.
 * Add new pages here after creating their data in the appropriate seo-data-*.ts file.
 */
export const SEO_PAGES: Record<string, SEOPageConfig> = {
    "legal-ai": legalAiPage,
    "legal-chatbot": legalChatbotPage,
    "divorce-law": divorceLawPage,
    "employee-rights": employeeRightsPage,
    "tenant-rights": tenantRightsPage,
    "business-legal": businessLegalPage,
    "startup-legal": startupLegalPage,
    "contract-review": contractReviewPage,
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
