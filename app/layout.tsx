import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cairo } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  // swap = show system font immediately, swap in custom font when ready → eliminates FOIT LCP delay
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
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
  // Default description is French — the primary SERP-facing audience.
  // Arabic and English descriptions are served on their respective /ar and /en routes.
  description:
    "Obtenez des conseils juridiques gratuits en 30 secondes — 9anon AI répond instantanément sur la Moudawana, le Code du Travail, les contrats et plus. L'assistant juridique IA #1 au Maroc. Disponible 24h/24, 100% gratuit.",
  keywords: [
    // === PRIMARY TARGET ===
    "Intelligence artificielle du droit marocain",
    "Moroccan Legal AI",
    "IA Juridique Marocaine",
    "الذكاء الاصطناعي القانوني المغربي",

    // === BRAND ===
    "9anon ai", "9anon AI", "9anoun ai", "9anoun AI",
    "kanon ai", "kanoun ai", "qanon ai", "qanoun ai",
    "9anonai", "9anounai", "canoun ai", "kanon morocco", "9anoun maroc",
    "قانون", "قانون ai", "قانون الذكاء الاصطناعي",

    // === ENGLISH HIGH-INTENT (CONVERSION) ===
    "legal AI assistant Morocco", "online legal advice Morocco",
    "business legal help Morocco", "AI lawyer Morocco",
    "legal chatbot Morocco", "contract review AI Morocco",
    "Moroccan legal consultation online", "startup legal advice Morocco",
    "company registration legal help Morocco",

    // === ENGLISH PROBLEM-BASED (INDIVIDUALS) ===
    "divorce lawyer Morocco online", "inheritance law Morocco help",
    "labor law advice Morocco", "tenant rights Morocco",
    "employee rights Morocco", "how to file complaint in Morocco",

    // === ENGLISH BUSINESS-FOCUSED ===
    "corporate legal compliance Morocco", "business contract review Morocco",
    "Moroccan commercial law advice", "legal support for startups Morocco",
    "SME legal services Morocco", "tax compliance legal help Morocco",

    // === FRENCH HIGH-INTENT ===
    "assistant juridique IA Maroc", "conseil juridique en ligne Maroc",
    "avocat en ligne Maroc", "aide juridique entreprise Maroc",
    "chatbot juridique Maroc", "consultation juridique digitale Maroc",

    // === FRENCH INDIVIDUALS ===
    "droit du travail Maroc conseil", "divorce Maroc procédure",
    "droit successoral Maroc", "litige locatif Maroc",
    "droits des employés Maroc",

    // === FRENCH BUSINESS ===
    "conformité légale entreprise Maroc", "droit commercial Maroc conseil",
    "rédaction contrat Maroc", "création société Maroc assistance juridique",
    "conseil juridique startup Maroc",

    // === ARABIC HIGH-INTENT ===
    "مساعد قانوني ذكي المغرب", "استشارة قانونية اونلاين المغرب",
    "محامي اونلاين المغرب", "شات بوت قانوني المغرب",
    "ذكاء اصطناعي قانوني المغرب",

    // === ARABIC INDIVIDUALS ===
    "قانون الشغل المغرب استشارة", "الطلاق في المغرب إجراءات",
    "الإرث في القانون المغربي", "حقوق الموظف في المغرب",
    "حقوق المستأجر في المغرب",

    // === ARABIC BUSINESS ===
    "استشارة قانونية للشركات المغرب", "القانون التجاري المغربي",
    "صياغة عقد شركة المغرب", "تسجيل شركة في المغرب مساعدة",
    "الامتثال القانوني للشركات المغرب",
    "استشارة قانونية للشركات الناشئة",

    // === LEGACY MOROCCAN LAW TERMS ===
    "istichara ai", "استشارة قانونية ai", "AI Mohami Maroc",
    "Istichara 9anounia AI", "Moroccan law", "القانون المغربي",
    "مساعد قانوني", "legal assistant Morocco", "AI legal",
    "droit marocain", "avocat maroc", "محامي", "استشارة قانونية",
    "legal advice Morocco", "conseil juridique Maroc",
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
    // fr_MA as default locale — matches the default description language
    locale: "fr_MA",
    alternateLocale: ["ar_MA", "en_US"],
    url: "https://9anonai.com",
    siteName: "9anon AI - Intelligence artificielle du droit marocain",
    title: "9anon AI | Intelligence artificielle du droit marocain",
    description:
      "Intelligence artificielle du droit marocain. 9anon AI offre des conseils juridiques gratuits sur la Moudawana, le Code du Travail, le droit commercial et plus.",
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

// JSON-LD Structured Data — multiple schemas for maximum search visibility
const jsonLdSchemas = [
  // 1. Software Application schema
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "9anon AI",
    alternateName: ["Intelligence artificielle du droit marocain", "Moroccan Legal AI", "IA Juridique Marocaine", "الذكاء الاصطناعي القانوني المغربي", "قانون", "9anoun AI"],
    description:
      "Intelligence artificielle du droit marocain. AI-powered Moroccan Legal AI assistant providing instant legal guidance.",
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
  },
  // 2. LegalService schema — tells Google we are a legal service provider
  {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "9anon AI - Intelligence artificielle du droit marocain",
    alternateName: ["Assistant Juridique IA Maroc", "Intelligence artificielle du droit marocain", "مساعد قانوني ذكي المغرب"],
    description:
      "Intelligence artificielle du droit marocain. Free AI-powered legal consultation for Moroccan law.",
    url: "https://9anonai.com",
    serviceType: ["Legal Advice", "AI Legal Chatbot", "Contract Review", "Legal Consultation"],
    areaServed: {
      "@type": "Country",
      name: "Morocco",
      alternateName: ["Maroc", "المغرب"],
    },
    availableLanguage: [
      { "@type": "Language", name: "Arabic", alternateName: "العربية" },
      { "@type": "Language", name: "French", alternateName: "Français" },
      { "@type": "Language", name: "English" },
    ],
    provider: {
      "@type": "Organization",
      name: "9anon AI",
      url: "https://9anonai.com",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal AI Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family Law Consultation (Moudawana)" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Labor Law Advice (Code du Travail)" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Law Consultation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Contract Review" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Company Registration Help" } },
      ],
    },
  },
  // 3. Organization schema — credibility and brand signals
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "9anon AI",
    alternateName: ["9anoun AI", "قانون"],
    url: "https://9anonai.com",
    logo: "https://9anonai.com/icon.png",
    description:
      "The first AI-powered legal assistant for Moroccan law. Provides free legal consultation in Arabic, French, and English.",
    foundingDate: "2024",
    areaServed: "Morocco",
    knowsLanguage: ["ar", "fr", "en"],
    knowsAbout: [
      "Moroccan Law", "Moudawana", "Code du Travail", "Commercial Law",
      "Family Law", "Labor Law", "Tenant Rights", "Employee Rights",
      "القانون المغربي", "مدونة الأسرة", "مدونة الشغل",
    ],
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("NEXT_LOCALE")?.value || "fr"; // Bots get French — primary SERP audience

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Render all JSON-LD schemas for rich search results */}
        {jsonLdSchemas.map((schema, i) => (
          <script
            key={`jsonld-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      {/* Google Analytics 4 — afterInteractive so it never blocks rendering */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
      <body className={`${playfair.variable} ${jakarta.variable} ${cairo.variable} font-sans antialiased`}>
        <Providers lang={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
