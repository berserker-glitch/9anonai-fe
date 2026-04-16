import type { Metadata } from "next";

const BASE_URL = "https://9anonai.com";

type Props = {
    params: Promise<{ lang: string }>;
    children: React.ReactNode;
};

/**
 * About page metadata — SEO-optimized per language.
 * Generates unique title, description, and keywords for AR/FR/EN,
 * each targeting high-value search queries for the about/brand page.
 * Includes hreflang alternates for cross-language discoverability.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    const isArabic = lang === "ar";
    const isFrench = lang === "fr";

    // Shared hreflang alternates — same for every language variant
    const alternates: Metadata["alternates"] = {
        canonical: `${BASE_URL}/${lang}/about`,
        languages: {
            "ar-MA": `${BASE_URL}/ar/about`,
            "fr-MA": `${BASE_URL}/fr/about`,
            "en-US": `${BASE_URL}/en/about`,
        },
    };

    if (isArabic) {
        return {
            title: "حول 9anon AI | مساعد قانوني ذكي مغربي — قصتنا ورؤيتنا",
            description:
                "تعرف على 9anon AI — أول مساعد قانوني ذكي مجاني في المغرب. قصتنا، رؤيتنا، قيمنا، والتقنية وراء الدقة القانونية المطلقة. نغطي مدونة الأسرة، قانون الشغل، العقار، التجارة، الإرث والمزيد.",
            keywords: [
                "حول 9anon AI", "مساعد قانوني ذكي المغرب", "قصة 9anon AI",
                "ذكاء اصطناعي قانوني مغربي", "تكنولوجيا قانونية المغرب",
                "مدونة الأسرة", "مدونة الشغل", "القانون المغربي",
                "استشارة قانونية مجانية المغرب", "محكمة النقض المغربية",
            ],
            alternates,
        };
    }

    if (isFrench) {
        return {
            title: "À propos de 9anon AI | IA juridique marocaine — Notre mission",
            description:
                "Découvrez 9anon AI — le premier assistant juridique IA gratuit au Maroc. Notre histoire, notre vision, nos valeurs et la technologie derrière la précision juridique absolue. Couvre la Moudawana, le Code du Travail, l'immobilier, le droit commercial, les successions et plus.",
            keywords: [
                "à propos 9anon AI", "assistant juridique IA Maroc", "histoire 9anon AI",
                "intelligence artificielle droit marocain", "technologie juridique Maroc",
                "Moudawana", "Code du Travail Maroc", "droit marocain",
                "consultation juridique gratuite Maroc", "Cour de Cassation Maroc",
            ],
            alternates,
        };
    }

    // English (Default)
    return {
        title: "About 9anon AI | Morocco's Free AI Legal Assistant — Our Mission",
        description:
            "Learn about 9anon AI — Morocco's first free AI legal assistant. Our story, vision, values, and the technology behind absolute legal precision. Covering Moudawana, Labor Law, Real Estate, Commercial Law, Inheritance and more.",
        keywords: [
            "about 9anon AI", "AI legal assistant Morocco", "9anon AI story",
            "Moroccan legal AI technology", "legal tech Morocco",
            "Moudawana", "Code du Travail Morocco", "Moroccan law",
            "free legal consultation Morocco", "Cour de Cassation Morocco",
        ],
        alternates,
    };
}

/**
 * AboutLayout — passes through children with About-specific JSON-LD.
 * Injects an AboutPage schema for rich results in Google.
 */
export default function AboutLayout({ children }: { children: React.ReactNode }) {
    /** AboutPage JSON-LD — signals to Google this is the "about" page of the organization */
    const aboutJsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About 9anon AI",
        "description":
            "9anon AI is Morocco's first free AI-powered legal assistant, providing instant, accurate answers on Moroccan law in Arabic, French, English, and Darija.",
        "url": `${BASE_URL}/about`,
        "mainEntity": {
            "@type": "Organization",
            "name": "9anon AI",
            "url": BASE_URL,
            "foundingDate": "2024",
            "areaServed": "MA",
            "availableLanguage": ["ar", "fr", "en"],
        },
    };

    return (
        <>
            {/* AboutPage JSON-LD for Google rich results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutJsonLd),
                }}
            />
            {children}
        </>
    );
}
