import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Fix Turbopack module resolution for tailwindcss */
  turbopack: {
    resolveAlias: {
      tailwindcss: path.resolve(__dirname, "node_modules/tailwindcss"),
    },
  },

  /* Block access to test landing pages 1-11 */
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
