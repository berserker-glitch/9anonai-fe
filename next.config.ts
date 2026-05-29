import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Block access to test landing pages 1-11 */
  async redirects() {
    return [
      // Test landing page redirects
      { source: '/1', destination: '/', permanent: false },
      { source: '/2', destination: '/', permanent: false },
      { source: '/3', destination: '/', permanent: false },
      { source: '/4', destination: '/', permanent: false },
      { source: '/5', destination: '/', permanent: false },
      { source: '/6', destination: '/', permanent: false },
      { source: '/7', destination: '/', permanent: false },
      { source: '/8', destination: '/', permanent: false },
      { source: '/9', destination: '/', permanent: false },
      { source: '/10', destination: '/', permanent: false },
      { source: '/11', destination: '/', permanent: false },

      // SEO: Redirect legacy non-localized blog URLs to Arabic (default) versions
      { source: '/blog', destination: '/ar/blog', permanent: true },
      { source: '/blog/:slug', destination: '/ar/blog/:slug', permanent: true },

      // SEO: Redirect /about to localized version (prevents GSC "Autre page avec balise canonique correcte")
      { source: '/about', destination: '/fr/about', permanent: true },

      // SEO: Redirect ALL non-localized SEO page slugs to localized versions
      // This prevents Google from indexing bare /{slug} URLs as duplicates of /{lang}/{slug}
      // Core AI / consultation
      { source: '/legal-ai', destination: '/fr/legal-ai', permanent: true },
      { source: '/legal-chatbot', destination: '/fr/legal-chatbot', permanent: true },
      { source: '/online-consultation', destination: '/fr/online-consultation', permanent: true },
      // Individual rights
      { source: '/divorce-law', destination: '/fr/divorce-law', permanent: true },
      { source: '/employee-rights', destination: '/fr/employee-rights', permanent: true },
      { source: '/tenant-rights', destination: '/fr/tenant-rights', permanent: true },
      { source: '/inheritance-law', destination: '/fr/inheritance-law', permanent: true },
      { source: '/immigration-law', destination: '/fr/immigration-law', permanent: true },
      // Business / commercial
      { source: '/business-legal', destination: '/fr/business-legal', permanent: true },
      { source: '/startup-legal', destination: '/fr/startup-legal', permanent: true },
      { source: '/contract-review', destination: '/fr/contract-review', permanent: true },
      { source: '/commercial-law', destination: '/fr/commercial-law', permanent: true },
      { source: '/tax-legal', destination: '/fr/tax-legal', permanent: true },
      // Property
      { source: '/rental-law', destination: '/fr/rental-law', permanent: true },
      { source: '/real-estate-law', destination: '/fr/real-estate-law', permanent: true },
      // Digital law
      { source: '/cybersecurity-law', destination: '/fr/cybersecurity-law', permanent: true },
      { source: '/crypto-law', destination: '/fr/crypto-law', permanent: true },
      { source: '/digital-law', destination: '/fr/digital-law', permanent: true },
      // Topic hub pages
      { source: '/family-law', destination: '/fr/family-law', permanent: true },
      { source: '/labor-law', destination: '/fr/labor-law', permanent: true },
      { source: '/traffic-law', destination: '/fr/traffic-law', permanent: true },
      // High-impression pages
      { source: '/consumer-protection', destination: '/fr/consumer-protection', permanent: true },
      { source: '/company-registration', destination: '/fr/company-registration', permanent: true },
      { source: '/citizenship-law', destination: '/fr/citizenship-law', permanent: true },

      // SEO: www → non-www redirect handled in middleware.ts (301)
    ];
  },

  async headers() {
    return [
      {
        // Cache static assets (JS, CSS, images) for 1 year — they have content hashes
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache public assets (images, fonts) for 1 week
        source: '/:path*.(ico|png|jpg|jpeg|webp|svg|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
        ],
      },
      {
        // Cache sitemaps and robots for 1 day
        source: '/:path*(sitemap.xml|robots.txt)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=3600' },
        ],
      },
      {
        // Security + performance headers on all routes
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
