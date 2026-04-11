import type { NextConfig } from "next";
import path from "path";

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

      // SEO: Redirect HTTP non-www to HTTPS www (handled at hosting level, but good to document)
      // SEO: Redirect www.9anonai.com to 9anonai.com (handled at hosting level)
    ];
  },
};

export default nextConfig;
