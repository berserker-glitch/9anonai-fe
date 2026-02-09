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
            title: "9anon AI | الذكاء الاصطناعي القانوني المغربي (مجاني)",
            description: "أول مساعد قانوني ذكي في المغرب. احصل على إجابات فورية ودقيقة حول مدونة الأسرة، القانون الجنائي، وقانون الشغل. مجاني ومتاح 24/7.",
            keywords: ["الذكاء الاصطناعي القانوني المغربي", "مستشار قانوني ذكي", "قانون مغربي", "استشارة قانونية مجانية", "9anon ai"],
        };
    }

    if (isFrench) {
        return {
            title: "9anon AI | IA Juridique Marocaine (Gratuit)",
            description: "Le premier assistant juridique IA au Maroc. Obtenez des réponses instantanées sur la Moudawana, le Code Pénal et le Droit du Travail. Gratuit et disponible 24/7.",
            keywords: ["IA Juridique Marocaine", "Assistant juridique IA", "Droit marocain", "Conseil juridique gratuit", "9anon ai"],
        };
    }

    // English (Default)
    return {
        title: "9anon AI | Moroccan Legal AI Assistant (Free)",
        description: "The #1 Moroccan Legal AI Assistant. Get instant, accurate answers about Moroccan law, Moudawana, and penal code. Free and available 24/7.",
        keywords: ["Moroccan Legal AI", "Legal AI Assistant Morocco", "Moroccan Law", "Free Legal Advice Morocco", "9anon ai"],
    };
}

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
