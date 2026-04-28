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

      // SEO: Redirect standalone topic pages to localized versions (middleware handles locale detection)
      // These were English-only; now they are served trilingual via app/[lang]/[slug]
      { source: '/family-law', destination: '/ar/family-law', permanent: true },
      { source: '/labor-law', destination: '/ar/labor-law', permanent: true },
      { source: '/traffic-law', destination: '/ar/traffic-law', permanent: true },
      { source: '/consumer-protection', destination: '/ar/consumer-protection', permanent: true },
      { source: '/company-registration', destination: '/ar/company-registration', permanent: true },
      { source: '/citizenship-law', destination: '/ar/citizenship-law', permanent: true },

      // SEO: Redirect HTTP non-www to HTTPS www (handled at hosting level, but good to document)
      // SEO: Redirect www.9anonai.com to 9anonai.com (handled at hosting level)
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
