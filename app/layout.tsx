import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cairo } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    default: "9anon AI | Moroccan Legal AI Assistant (Free Access)",
    template: "%s | 9anon AI - Moroccan Legal AI",
  },
  description:
    "9anon AI (قانون / 9anoun) - The First Moroccan Legal AI. Your intelligent legal assistant for Moroccan law. Get instant answers about Moudawana, Labor Law, Penal Code, and more. Available in Arabic, French, English, and Darija.",
  keywords: [
    // Primary Target Keyword
    "Moroccan Legal AI",
    "IA Juridique Marocaine",
    "الذكاء الاصطناعي القانوني المغربي",

    // Brand keywords
    "9anon ai",
    "9anon AI",
    "9anoun ai",
    "9anoun AI",
    "kanon ai",
    "kanoun ai",
    "qanon ai",
    "qanoun ai",
    "9anonai",
    "9anounai",

    // Arabic brand keywords
    "قانون",
    "قانون ai",
    "قانون الذكاء الاصطناعي",

    // Moroccan law terms
    "istichara ai",
    "استشارة قانونية ai",
    "AI Mohami Maroc",
    "Istichara 9anounia AI",
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

    // Alternative spellings
    "canoun ai",
    "kanon morocco",
    "9anoun maroc",
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
    siteName: "9anon AI - Moroccan Legal AI",
    title: "9anon AI - Moroccan Legal AI | مساعد قانوني مغربي ذكي",
    description:
      "The First AI Legal Assistant for Moroccan Law. Instant answers for your legal questions in Arabic, French, and English.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@9anonai",
    creator: "@9anonai",
    title: "9anon AI | Moroccan Legal AI Assistant",
    description:
      "Your intelligent Moroccan Legal AI assistant. Get instant legal answers in Arabic, French, English & Darija.",
  },
  // Verification handled via DNS (Namecheap)
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
  "@type": "SoftwareApplication",
  name: "9anon AI",
  alternateName: ["Moroccan Legal AI", "IA Juridique Marocaine", "الذكاء الاصطناعي القانوني المغربي", "قانون", "9anoun AI"],
  description:
    "AI-powered Moroccan Legal AI assistant providing instant legal guidance in Arabic, French, English, and Darija.",
  url: "https://9anonai.com",
  applicationCategory: "LegalService",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MAD",
    priceValidUntil: "2027-12-31",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "ar";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${jakarta.variable} ${cairo.variable} font-sans antialiased`}>
        <Providers lang={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
