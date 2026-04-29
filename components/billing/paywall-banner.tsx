"use client";

/**
 * PaywallBanner — shown inside the chat when the free-plan conversation cap
 * (15 messages) is reached. Offers two CTAs: start a new conversation (free)
 * or upgrade to Basic.
 */

interface PaywallBannerProps {
    language: string;
    onNewConversation: () => void;
}

const T: Record<string, Record<string, string>> = {
    heading: {
        ar: "وصلت إلى حد المحادثة المجانية",
        fr: "Limite de conversation atteinte",
        en: "Free conversation limit reached",
    },
    body: {
        ar: "لقد استخدمت 15 رسالة في هذه المحادثة. ابدأ محادثة جديدة مجاناً، أو قم بالترقية للحصول على ردود غير محدودة.",
        fr: "Vous avez utilisé 15 messages dans cette conversation. Commencez une nouvelle conversation gratuitement, ou passez à l'offre Asasi pour des réponses illimitées.",
        en: "You've used 15 messages in this conversation. Start a new one for free, or upgrade to Basic for unlimited back-and-forth.",
    },
    new_chat: {
        ar: "محادثة جديدة",
        fr: "Nouvelle conversation",
        en: "New Conversation",
    },
    upgrade: {
        ar: "ترقية — 49 درهم / شهر",
        fr: "Passer à Asasi — 49 MAD/mois",
        en: "Upgrade — 49 MAD/mo",
    },
    lawyer_comparison: {
        ar: "أرخص بكثير من استشارة محامٍ واحدة (500–2000 درهم)",
        fr: "Bien moins cher qu'une consultation d'avocat (500–2 000 MAD)",
        en: "Far less than one lawyer consultation (500–2,000 MAD)",
    },
};

function t(key: string, lang: string): string {
    return T[key]?.[lang] ?? T[key]?.["fr"] ?? key;
}

export function PaywallBanner({ language, onNewConversation }: PaywallBannerProps) {
    return (
        <div className="mx-4 mb-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 flex flex-col gap-4">
            <div>
                <p className="text-sm font-semibold text-foreground mb-1">
                    {t("heading", language)}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("body", language)}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <button
                    onClick={onNewConversation}
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl border border-border bg-background hover:bg-accent transition-colors"
                >
                    {t("new_chat", language)}
                </button>
                <a
                    href="/pricing"
                    className="flex-1 px-4 py-2.5 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
                >
                    {t("upgrade", language)}
                </a>
            </div>

            <p className="text-[11px] text-muted-foreground/70 text-center">
                {t("lawyer_comparison", language)}
            </p>
        </div>
    );
}
