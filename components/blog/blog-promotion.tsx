import Link from "next/link";

interface BlogPromotionProps {
    lang: string;
}

/**
 * BlogPromotion Component
 * A premium CTA banner embedded in blog posts to convert readers into users.
 */
export function BlogPromotion({ lang }: BlogPromotionProps) {
    const content = {
        ar: {
            title: "هل لديك المزيد من الأسئلة القانونية؟",
            description: "استشر 9anon AI الآن واحصل على إجابات دقيقة وفورية حول وضعيتك القانونية في ثوانٍ.",
            buttonChat: "ابدأ الدردشة مجاناً",
            buttonContract: "منشئ العقود الذكي",
        },
        en: {
            title: "Have More Legal Questions?",
            description: "Consult 9anon AI now and get accurate, instant answers about your legal situation in seconds.",
            buttonChat: "Start Chatting Free",
            buttonContract: "AI Contract Builder",
        },
        fr: {
            title: "D'autres questions juridiques ?",
            description: "Consultez 9anon AI dès maintenant et obtenez des réponses précises et instantanées en quelques secondes.",
            buttonChat: "Démarrer le Chat Gratuit",
            buttonContract: "Générateur de Contrats",
        },
    };

    const t = content[lang as keyof typeof content] || content.ar;

    return (
        <div className="my-16 p-8 sm:p-10 rounded-3xl relative overflow-hidden glass-premium border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5">
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
                <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-foreground">
                        {t.title}
                    </h2>
                    <p className="text-muted-foreground text-lg sm:text-lg">
                        {t.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto min-w-[300px]">
                    <Link
                        href="/chat"
                        className="btn-premium px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all text-center"
                    >
                        {t.buttonChat}
                    </Link>
                    <Link
                        href="/contract-builder"
                        className="px-8 py-4 glass-premium border border-primary/20 text-primary font-bold rounded-xl hover:bg-primary/5 transition-all text-center"
                    >
                        {t.buttonContract}
                    </Link>
                </div>
            </div>
        </div>
    );
}
