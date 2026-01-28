import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cairo, Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";
import { FontSwitcher } from "@/components/debug/font-switcher";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://9anonai.com"),
  title: {
    default: "9anon AI | The Faster 9anoun Alternative (Free Access)",
    template: "%s | 9anon AI",
  },
  description:
    "9anon AI (قانون / 9anoun) - المساعد القانوني الذكي للقانون المغربي. احصل على إجابات فورية حول القانون المغربي، الإجراءات القانونية، وحقوقك. متاح بالعربية والفرنسية والإنجليزية والدارجة. 9anon AI - Your intelligent Moroccan law assistant.",
  keywords: [
    "AI Mohami Maroc",
    "Istichara 9anounia AI",
    "9anon",
    "9anon ai",
    "9anon AI",
    "9anoun",
    "9anoun ai",
    "kanoun ai",
    "قانون",
    "قانون ai",
    "qanon ai",
    "qanun ai",
    "Moroccan law",
    "القانون المغربي",
    "مساعد قانوني",
    "legal assistant Morocco",
    "AI legal",
    "droit marocain",
    "avocat maroc",
    "محامي",
    "استشارة قانونية",
    "legal advice Morocco",
    "conseil juridique Maroc",
  ],
  authors: [{ name: "9anon AI Team" }],
  creator: "9anon AI",
  publisher: "9anon AI",
  applicationName: "9anon AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://9anonai.com",
    languages: {
      "ar-MA": "https://9anonai.com/ar",
      "fr-MA": "https://9anonai.com/fr",
      "en-US": "https://9anonai.com/en",
    },
  },
  // icons and openGraph images removed to use file-based convention (icon.png)
  openGraph: {
    type: "website",
    locale: "ar_MA",
    alternateLocale: ["fr_MA", "en_US"],
    url: "https://9anonai.com",
    siteName: "9anon AI - قانون",
    title: "9anon AI - قانون | مساعد قانوني مغربي ذكي",
    description:
      "المساعد القانوني الذكي للقانون المغربي. احصل على إجابات فورية حول حقوقك والإجراءات القانونية.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@9anonai",
    creator: "@9anonai",
    title: "9anon AI - قانون | Moroccan Law AI Assistant",
    description:
      "Your intelligent Moroccan law assistant. Get instant legal answers in Arabic, French, English & Darija.",
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "Legal Technology",
  classification: "AI Legal Assistant",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "9anon AI",
  alternateName: ["قانون", "Qanon AI", "9anon", "Qanun AI", "9anoun", "9anoun AI", "Kanoun AI"],
  description:
    "AI-powered Moroccan law assistant providing instant legal guidance in Arabic, French, English, and Darija.",
  url: "https://9anonai.com",
  applicationCategory: "LegalService",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MAD",
    priceValidUntil: "2024-12-31",
  },
  provider: {
    "@type": "Organization",
    name: "9anon AI",
    url: "https://9anonai.com",
  },
  inLanguage: ["ar", "fr", "en"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1200",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${jakarta.variable} ${cairo.variable} ${tajawal.variable} ${ibmArabic.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <FontSwitcher />
        </Providers>
      </body>
    </html>
  );
}
