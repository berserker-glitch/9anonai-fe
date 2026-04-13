import type { Metadata } from "next";

const BASE_URL = "https://9anonai.com";

/**
 * Organization and WebSite JSON-LD schemas — injected server-side on every
 * landing page. These signal the brand entity to Google:
 * - Organization: logo, contact, social profiles → Knowledge Panel eligibility
 * - WebSite: sitelink search box support
 */
const siteJsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "9anon AI",
        "url": BASE_URL,
        "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/og-default.png`,
            "width": 1200,
            "height": 630,
        },
        "description": "Intelligence artificielle du droit marocain. The best and fastest AI-powered legal assistant for Moroccan law.",
        "foundingDate": "2024",
        "areaServed": "MA",
        "availableLanguage": ["ar", "fr", "en"],
        "sameAs": [
            "https://www.linkedin.com/company/9anon-ai",
            "https://twitter.com/9anonai",
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "9anon AI",
        "url": BASE_URL,
        // Enables Google Sitelinks Search Box
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${BASE_URL}/chat?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    },
    // LegalService schema — tells Google this is a legal service specifically for Morocco.
    // Critical for local Moroccan search prominence and Knowledge Panel eligibility.
    {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "9anon AI",
        "alternateName": ["9anon", "9anoun AI", "قانون AI"],
        "url": BASE_URL,
        "description": "مساعد قانوني ذكي مجاني للقانون المغربي. Free AI legal assistant for Moroccan law. Assistant juridique IA gratuit pour le droit marocain.",
        "serviceType": ["AI Legal Consultation", "Legal Information", "استشارة قانونية", "Consultation Juridique"],
        "areaServed": {
            "@type": "Country",
            "name": "Morocco",
            "alternateName": "المغرب",
            "sameAs": "https://en.wikipedia.org/wiki/Morocco",
        },
        "availableLanguage": [
            { "@type": "Language", "name": "Arabic", "alternateName": "العربية" },
            { "@type": "Language", "name": "French", "alternateName": "Français" },
            { "@type": "Language", "name": "English" },
        ],
        "priceRange": "Free",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "MAD",
            "description": "Free AI-powered legal consultation for Moroccan law",
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Moroccan Legal Topics",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "مدونة الأسرة / Family Law (Moudawana)" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "قانون الشغل / Labor Law (Code du Travail)" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "القانون التجاري / Commercial Law" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "قانون الكراء / Rental Law" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الإرث / Inheritance Law" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تسجيل الشركات / Company Registration" } },
            ],
        },
    },
    // SoftwareApplication schema — signals to Google that 9anon AI is a legal app,
    // enabling rich results in app-related searches and AI tool directories.
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "9anon AI",
        "applicationCategory": "LegalApplication",
        "applicationSubCategory": "AI Legal Assistant",
        "operatingSystem": "Web",
        "inLanguage": ["ar", "fr", "en"],
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "MAD",
        },
        "featureList": [
            "Free AI legal consultation in Arabic, French and English",
            "Moroccan Family Law (Moudawana) guidance",
            "Labor Law and employee rights advice",
            "AI Contract Builder",
            "24/7 availability",
        ],
        "url": BASE_URL,
    },
];

type Props = {
    params: Promise<{ lang: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    const isArabic = lang === "ar";
    const isFrench = lang === "fr";

    // Shared hreflang alternates — same for every language variant
    const alternates: Metadata["alternates"] = {
        canonical: `${BASE_URL}/${lang}`,
        languages: {
            "ar-MA": `${BASE_URL}/ar`,
            "fr-MA": `${BASE_URL}/fr`,
            "en-US": `${BASE_URL}/en`,
        },
    };

    if (isArabic) {
        return {
            title: "9anon AI | مساعد قانوني ذكي المغرب - استشارة قانونية مجانية",
            description: "احصل على إجابة قانونية في 30 ثانية — 9anon AI يجيب فوراً على أسئلتك حول مدونة الأسرة، قانون الشغل، الطلاق، الإرث والعقارات. مجاناً 100٪، متاح 24/7. المساعد القانوني الذكي الأول في المغرب.",
            keywords: [
                "مساعد قانوني ذكي المغرب", "استشارة قانونية اونلاين المغرب",
                "محامي اونلاين المغرب", "شات بوت قانوني المغرب",
                "ذكاء اصطناعي قانوني المغرب", "قانون الشغل المغرب استشارة",
                "الطلاق في المغرب إجراءات", "الإرث في القانون المغربي",
                "حقوق الموظف في المغرب", "حقوق المستأجر في المغرب",
                "استشارة قانونية للشركات المغرب", "القانون التجاري المغربي",
                "صياغة عقد شركة المغرب", "تسجيل شركة في المغرب مساعدة",
                "الامتثال القانوني للشركات المغرب",
                "الذكاء الاصطناعي القانوني المغربي", "قانون مغربي",
                "استشارة قانونية مجانية", "9anon ai",
            ],
            alternates,
        };
    }

    if (isFrench) {
        return {
            title: "9anon AI | Intelligence artificielle du droit marocain",
            description: "Réponse juridique gratuite en 30 secondes — 9anon AI répond instantanément sur la Moudawana, le Code du Travail, les contrats, l'immobilier et plus. 100% gratuit, disponible 24h/24. L'IA juridique #1 au Maroc.",
            keywords: [
                "Intelligence artificielle du droit marocain",
                "assistant juridique IA Maroc", "conseil juridique en ligne Maroc",
                "avocat en ligne Maroc", "aide juridique entreprise Maroc",
                "chatbot juridique Maroc", "consultation juridique digitale Maroc",
                "droit du travail Maroc conseil", "divorce Maroc procédure",
                "droit successoral Maroc", "litige locatif Maroc",
                "droits des employés Maroc", "conformité légale entreprise Maroc",
                "droit commercial Maroc conseil", "rédaction contrat Maroc",
                "création société Maroc assistance juridique",
                "conseil juridique startup Maroc",
                "IA Juridique Marocaine", "droit marocain", "9anon ai",
            ],
            alternates,
        };
    }

    // English (Default)
    return {
        title: "9anon AI | Free AI Legal Assistant Morocco — Instant Answers 24/7",
        description: "Get a free legal answer in 30 seconds — 9anon AI gives instant, accurate advice on Moroccan family law, labor law, divorce, inheritance, real estate & contracts. 100% free, no sign-up needed. Morocco's #1 AI legal assistant.",
        keywords: [
            "legal AI assistant Morocco", "online legal advice Morocco",
            "business legal help Morocco", "AI lawyer Morocco",
            "legal chatbot Morocco", "contract review AI Morocco",
            "Moroccan legal consultation online", "startup legal advice Morocco",
            "company registration legal help Morocco",
            "divorce lawyer Morocco online", "inheritance law Morocco help",
            "labor law advice Morocco", "tenant rights Morocco",
            "employee rights Morocco", "how to file complaint in Morocco",
            "corporate legal compliance Morocco", "business contract review Morocco",
            "Moroccan commercial law advice", "legal support for startups Morocco",
            "SME legal services Morocco", "tax compliance legal help Morocco",
            "Moroccan Legal AI", "9anon ai",
        ],
        alternates,
    };
}

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Organization + WebSite JSON-LD for Google Knowledge Panel & site entity */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(siteJsonLd),
                }}
            />
            {children}
        </>
    );
}
