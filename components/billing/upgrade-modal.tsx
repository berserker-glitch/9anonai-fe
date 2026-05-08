"use client";

/**
 * UpgradeModal — shown when a free user tries to access a premium feature
 * (e.g. Contract Builder). Explains the value and links to pricing.
 */

import { Modal } from "@/components/utility/modal";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    language: string;
    /** Which feature triggered the modal — determines copy */
    feature?: "contract_builder" | "file_upload" | "generic";
}

const T: Record<string, Record<string, string>> = {
    // Contract Builder copy
    cb_heading: {
        ar: "منشئ العقود — ميزة مدفوعة",
        fr: "Générateur de contrats — Fonctionnalité payante",
        en: "Contract Builder — Premium Feature",
    },
    cb_body: {
        ar: "أنشئ عقوداً قانونية احترافية بالذكاء الاصطناعي: عقود إيجار، عمل، سرية، خدمات، وأكثر — جاهزة للتنزيل بصيغة PDF.\n\nبدلاً من دفع 500–2000 درهم لمحامٍ، اشترك بـ 49 درهم/شهر.",
        fr: "Générez des contrats juridiques professionnels avec l'IA : bail, travail, NDA, prestation de services et plus — exportables en PDF.\n\nAu lieu de payer 500–2 000 MAD à un avocat, abonnez-vous pour 49 MAD/mois.",
        en: "Generate professional legal contracts with AI: rental, employment, NDA, service agreements and more — ready to download as PDF.\n\nInstead of paying 500–2,000 MAD to a lawyer, subscribe for 49 MAD/month.",
    },
    // Generic copy
    generic_heading: {
        ar: "هذه الميزة متاحة للمشتركين",
        fr: "Fonctionnalité réservée aux abonnés",
        en: "Premium Feature",
    },
    generic_body: {
        ar: "قم بالترقية للوصول إلى هذه الميزة وغيرها — رسائل غير محدودة، منشئ العقود، وأكثر.",
        fr: "Passez à un abonnement payant pour accéder à cette fonctionnalité et bien d'autres.",
        en: "Upgrade to access this feature and more — unlimited messages, contract builder, and more.",
    },
    // CTA
    upgrade_basic: {
        ar: "الترقية إلى الأساسي — 49 درهم/شهر",
        fr: "Passer à Asasi — 49 MAD/mois",
        en: "Upgrade to Basic — 49 MAD/mo",
    },
    upgrade_pro: {
        ar: "الترقية إلى المهني — 149 درهم/شهر",
        fr: "Passer à Mihani — 149 MAD/mois",
        en: "Upgrade to Pro — 149 MAD/mo",
    },
    see_plans: {
        ar: "عرض جميع الخطط",
        fr: "Voir tous les plans",
        en: "See all plans",
    },
    close: {
        ar: "إغلاق",
        fr: "Fermer",
        en: "Close",
    },
};

function t(key: string, lang: string): string {
    return T[key]?.[lang] ?? T[key]?.["fr"] ?? key;
}

export function UpgradeModal({ isOpen, onClose, language, feature = "generic" }: UpgradeModalProps) {
    const isCB = feature === "contract_builder";
    const heading = isCB ? t("cb_heading", language) : t("generic_heading", language);
    const body = isCB ? t("cb_body", language) : t("generic_body", language);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <div className="flex flex-col gap-5 p-1">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>

                <div>
                    <h2 className="text-base font-semibold mb-2">{heading}</h2>
                    <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{body}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <a
                        href="/pricing"
                        className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-center"
                    >
                        {t("upgrade_basic", language)}
                    </a>
                    <a
                        href="/pricing"
                        className="w-full px-4 py-2.5 text-sm font-medium rounded-xl border border-border bg-background hover:bg-accent transition-colors text-center text-muted-foreground"
                    >
                        {t("see_plans", language)}
                    </a>
                    <button
                        onClick={onClose}
                        className="text-xs text-muted-foreground hover:underline mt-1"
                    >
                        {t("close", language)}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
