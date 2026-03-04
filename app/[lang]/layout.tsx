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
];

type Props = {
    params: Promise<{ lang: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    const isArabic = lang === "ar";
    const isFrench = lang === "fr";

    if (isArabic) {
        return {
            title: "9anon AI | مساعد قانوني ذكي المغرب - استشارة قانونية مجانية",
            description: "أفضل وأسرع مساعد قانوني ذكي في المغرب. استشارة قانونية اونلاين مجانية. احصل على إجابات فورية حول مدونة الأسرة، قانون الشغل، القانون التجاري، حقوق الموظف، حقوق المستأجر، الطلاق، الإرث، وتسجيل الشركات. شات بوت قانوني متاح 24/7.",
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
        };
    }

    if (isFrench) {
        return {
            title: "9anon AI | Intelligence artificielle du droit marocain",
            description: "Intelligence artificielle du droit marocain - 9anon AI est le meilleur et le plus rapide assistant juridique au Maroc. Obtenez des réponses instantanées pour la Moudawana, le Code du Travail, et plus.",
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
        };
    }

    // English (Default)
    return {
        title: "9anon AI | Free AI Legal Assistant Morocco - Legal Chatbot",
        description: "The best and fastest AI Legal Assistant for Moroccan Law. Free online legal advice, AI lawyer, legal chatbot for Morocco. Get instant answers about family law, labor law, commercial law, employee rights, tenant rights, divorce, inheritance, contracts, and company registration. Available 24/7.",
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
