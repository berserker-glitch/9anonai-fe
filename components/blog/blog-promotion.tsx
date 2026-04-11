import Link from "next/link";

interface BlogPromotionProps {
    lang: string;
    /** Optional: post category or title keyword to personalize the CTA */
    topic?: string;
}

/** Topic-to-CTA mapping for the most common Moroccan law categories */
const TOPIC_CTAS: Record<string, { ar: string; fr: string; en: string }> = {
    "family-law":        { ar: "هل لديك سؤال حول مدونة الأسرة؟",      fr: "Une question sur la Moudawana ?",          en: "Have a question about family law?" },
    "divorce":           { ar: "هل لديك سؤال حول الطلاق؟",             fr: "Une question sur le divorce ?",            en: "Have a question about divorce?" },
    "inheritance":       { ar: "هل لديك سؤال حول الإرث؟",              fr: "Une question sur la succession ?",         en: "Have a question about inheritance?" },
    "labor-law":         { ar: "هل لديك سؤال حول مدونة الشغل؟",        fr: "Une question sur le Code du Travail ?",    en: "Have a question about labor law?" },
    "employee-rights":   { ar: "هل لديك سؤال عن حقوقك كموظف؟",        fr: "Une question sur vos droits salariaux ?",  en: "Have a question about your employee rights?" },
    "traffic-law":       { ar: "هل لديك سؤال عن مخالفة أو حادثة سير؟", fr: "Une question sur une amende ou accident ?", en: "Got a traffic fine or accident question?" },
    "rental-law":        { ar: "هل لديك سؤال عن عقد الكراء؟",         fr: "Une question sur votre bail ?",            en: "Have a question about your rental contract?" },
    "tax-law":           { ar: "هل لديك سؤال عن الضرائب؟",             fr: "Une question fiscale ?",                   en: "Have a tax question?" },
    "immigration":       { ar: "هل لديك سؤال عن الإقامة أو التأشيرة؟", fr: "Une question sur votre visa ou séjour ?",  en: "Have an immigration or residency question?" },
    "business":          { ar: "هل لديك سؤال عن تأسيس شركتك؟",        fr: "Une question sur votre entreprise ?",      en: "Have a business legal question?" },
    "real-estate":       { ar: "هل لديك سؤال عن عقار أو شراء بيت؟",  fr: "Une question sur l'immobilier ?",          en: "Have a property or real estate question?" },
    "crypto":            { ar: "هل لديك سؤال عن العملات الرقمية؟",     fr: "Une question sur les cryptomonnaies ?",    en: "Have a crypto law question?" },
};

const DEFAULT_TITLES = {
    ar: "هل لديك المزيد من الأسئلة القانونية؟",
    en: "Have More Legal Questions?",
    fr: "D'autres questions juridiques ?",
};

const DESCRIPTIONS = {
    ar: "استشر 9anon AI الآن واحصل على إجابات دقيقة وفورية حول وضعيتك القانونية في ثوانٍ.",
    en: "Consult 9anon AI now and get accurate, instant answers about your legal situation in seconds.",
    fr: "Consultez 9anon AI dès maintenant et obtenez des réponses précises et instantanées en quelques secondes.",
};

const BUTTONS = {
    chat: { ar: "ابدأ الدردشة مجاناً", en: "Start Chatting Free", fr: "Démarrer le Chat Gratuit" },
    contract: { ar: "منشئ العقود الذكي", en: "AI Contract Builder", fr: "Générateur de Contrats" },
};

/**
 * BlogPromotion Component
 * Topic-aware CTA banner embedded in blog posts.
 * Personalizes heading based on the post's category to improve CTR.
 */
export function BlogPromotion({ lang, topic }: BlogPromotionProps) {
    const l = (lang as keyof typeof DEFAULT_TITLES) in DEFAULT_TITLES
        ? (lang as keyof typeof DEFAULT_TITLES)
        : "ar";

    // Find the best matching topic CTA
    let topicTitle: string | undefined;
    if (topic) {
        const topicLower = topic.toLowerCase();
        for (const [key, cta] of Object.entries(TOPIC_CTAS)) {
            if (topicLower.includes(key.replace("-", " ")) || topicLower.includes(key)) {
                topicTitle = cta[l];
                break;
            }
        }
    }

    const title = topicTitle ?? DEFAULT_TITLES[l];

    return (
        <div className="my-16 p-8 sm:p-10 rounded-3xl relative overflow-hidden glass-premium border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5">
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
                <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-foreground">
                        {title}
                    </h2>
                    <p className="text-muted-foreground text-lg sm:text-lg">
                        {DESCRIPTIONS[l]}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto min-w-[300px]">
                    <Link
                        href="/chat"
                        className="btn-premium px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all text-center"
                    >
                        {BUTTONS.chat[l]}
                    </Link>
                    <Link
                        href="/contract-builder"
                        className="px-8 py-4 glass-premium border border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition-all text-center"
                    >
                        {BUTTONS.contract[l]}
                    </Link>
                </div>
            </div>
        </div>
    );
}
