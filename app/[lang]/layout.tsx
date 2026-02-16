import type { Metadata } from "next";

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
            description: "أول مساعد قانوني ذكي في المغرب. استشارة قانونية اونلاين مجانية. احصل على إجابات فورية حول مدونة الأسرة، قانون الشغل، القانون التجاري، حقوق الموظف، حقوق المستأجر، الطلاق، الإرث، وتسجيل الشركات. شات بوت قانوني متاح 24/7.",
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
            title: "9anon AI | Assistant Juridique IA Maroc - Conseil Juridique Gratuit",
            description: "Le premier assistant juridique IA au Maroc. Conseil juridique en ligne gratuit. Obtenez des réponses instantanées sur la Moudawana, le Code du Travail, le droit commercial, les droits des employés, le divorce, la succession, et la création de société. Chatbot juridique disponible 24/7.",
            keywords: [
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
        description: "The #1 AI Legal Assistant for Moroccan Law. Free online legal advice, AI lawyer, legal chatbot for Morocco. Get instant answers about family law, labor law, commercial law, employee rights, tenant rights, divorce, inheritance, contracts, and company registration. Available 24/7.",
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
    return <>{children}</>;
}
