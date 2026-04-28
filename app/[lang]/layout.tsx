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

// FAQ schema data — questions mirror actual search queries from Google Search Console
const faqSchemaItems = {
    ar: [
        { q: "ما هي استشارة قانونية مجانية في المغرب؟", a: "9anon AI هو مساعد قانوني ذكي مجاني يُجيب فوراً على أسئلتك القانونية المتعلقة بالقانون المغربي، بما فيها مدونة الأسرة، قانون الشغل، الإرث، الطلاق والعقارات. الخدمة متاحة 24 ساعة في اليوم 7 أيام في الأسبوع." },
        { q: "كيف أحسب ضريبة الكراء في المغرب 2026؟", a: "يُحتسب دخل الكراء بعد خصم 40% كأعباء جزافية، ثم يُطبق عليه سلم الضريبة على الدخل (IR). يمكنك استخدام حاسبة الضريبة في 9anon AI للحصول على النتيجة الدقيقة." },
        { q: "ما هي إجراءات الطلاق بالتراضي في المغرب؟", a: "يتم الطلاق الاتفاقي بتقديم طلب مشترك أمام قاضي الأسرة، ثم محاولة الصلح، وإن فشلت يُحدد المبلغ المالي للمطلقة وحضانة الأطفال. تستغرق المسطرة عادةً بين 3 و6 أشهر." },
        { q: "ما هي شرائح الضريبة على الدخل في المغرب 2026؟", a: "شرائح الضريبة على الدخل لسنة 2026: معفى حتى 40,000 درهم، 10% من 40,001 إلى 60,000، 20% من 60,001 إلى 80,000، 30% من 80,001 إلى 100,000، 34% من 100,001 إلى 180,000، 38% فوق 180,000 درهم." },
        { q: "كيف يُقسم الإرث في القانون المغربي؟", a: "يُطبق القانون المغربي أحكام الفقه الإسلامي في توزيع الإرث. للزوجة الربع أو الثمن، للأم السدس أو الثلث، وللبنات النصف أو الثلثان. يمكن لـ 9anon AI حساب نصيب كل وارث بدقة." },
    ],
    fr: [
        { q: "Comment obtenir une consultation juridique gratuite au Maroc ?", a: "9anon AI est un assistant juridique IA gratuit qui répond instantanément à vos questions sur le droit marocain: Moudawana, Code du Travail, héritage, divorce et immobilier. Disponible 24h/24, 7j/7." },
        { q: "Quelle est l'augmentation de loyer légale au Maroc en 2026 ?", a: "La loi marocaine encadre les révisions de loyer. Pour les baux d'habitation, l'augmentation ne peut dépasser certains plafonds fixés par la loi. Consultez 9anon AI pour connaître le taux exact applicable à votre situation." },
        { q: "Comment calculer l'impôt sur les revenus locatifs au Maroc ?", a: "Les revenus locatifs sont soumis à l'IR après déduction forfaitaire de 40% pour charges. Le résultat est soumis aux tranches de l'IR. 9anon AI peut calculer votre impôt précis en quelques secondes." },
        { q: "Quelles sont les tranches d'IR au Maroc pour 2026 ?", a: "Tranches IR 2026: exonéré jusqu'à 40 000 MAD; 10% de 40 001 à 60 000; 20% de 60 001 à 80 000; 30% de 80 001 à 100 000; 34% de 100 001 à 180 000; 38% au-delà de 180 000 MAD." },
        { q: "Quelle est la procédure de divorce par consentement mutuel au Maroc ?", a: "Le divorce par consentement mutuel nécessite une demande conjointe au juge de la famille, une tentative de réconciliation, puis fixation des droits financiers et de garde. La procédure dure généralement 3 à 6 mois." },
    ],
    en: [
        { q: "How do I get free legal advice in Morocco?", a: "9anon AI is a free AI legal assistant that gives instant answers about Moroccan law, including family law (Moudawana), labor law, inheritance, divorce, and real estate. Available 24/7, no sign-up required." },
        { q: "What are Morocco's income tax brackets for 2026?", a: "Morocco income tax (IR) 2026: exempt up to 40,000 MAD; 10% from 40,001 to 60,000; 20% from 60,001 to 80,000; 30% from 80,001 to 100,000; 34% from 100,001 to 180,000; 38% above 180,000 MAD." },
        { q: "How is rental income taxed in Morocco?", a: "Rental income in Morocco is subject to IR after a 40% flat deduction for expenses. The remaining amount is taxed at progressive IR rates. Professional tenants must withhold 10-15% at source." },
        { q: "What is the Moudawana (Moroccan Family Code)?", a: "The Moudawana is Morocco's Family Code governing marriage, divorce, child custody, and inheritance. It was last reformed in 2004 and is currently under review for further updates in 2026." },
        { q: "How does inheritance work in Moroccan law?", a: "Moroccan inheritance follows Islamic law (fiqh). Spouses, children, and parents receive fixed shares. 9anon AI can calculate each heir's exact share based on the family composition." },
    ],
};

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
            "en-MA": `${BASE_URL}/en`,
        },
    };

    if (isArabic) {
        return {
            title: "9anon AI | استشارة قانونية مجانية في المغرب - ذكاء اصطناعي قانوني",
            description: "استشارة قانونية مجانية في 30 ثانية. 9anon AI يجيب على مدونة الأسرة، قانون الشغل، الإرث، الطلاق والعقارات. مجاني 100٪، متاح 24/7.",
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
            title: "9anon AI | IA Juridique Gratuite Maroc — Moudawana, Travail, Contrats",
            description: "Réponse juridique gratuite en 30 secondes. Moudawana, Code du Travail, divorce, héritage, immobilier. L'IA juridique #1 au Maroc. 100% gratuit, 24h/24.",
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
        title: "9anon AI | Free Legal AI Morocco — Family Law, Labor, Divorce, Tax",
        description: "Free legal answer in 30 seconds. 9anon AI covers Moroccan family law, labor law, divorce, inheritance & tax. No sign-up. 100% free, 24/7. Morocco's #1 legal AI.",
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

export default async function LandingLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const faqLang = (lang === "ar" || lang === "fr" || lang === "en") ? lang : "fr";
    const faqItems = faqSchemaItems[faqLang];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a,
            },
        })),
    };

    return (
        <>
            {/* Organization + WebSite JSON-LD for Google Knowledge Panel & site entity */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(siteJsonLd),
                }}
            />
            {/* FAQPage schema — enables FAQ rich results on homepage SERP */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />
            {children}
        </>
    );
}
