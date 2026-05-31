"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Crown, ShieldCheck, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { PaypalButtons } from "@/components/billing/paypal-buttons";

interface PaypalCheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
    title?: string;
    description?: string;
}

const COPY: Record<string, Record<string, string>> = {
    title: {
        ar: "إتمام الدفع الآمن",
        fr: "Finaliser le paiement sécurisé",
        en: "Complete secure checkout",
    },
    description: {
        ar: "اختر PayPal أو بطاقة ائتمان/خصم لإتمام دفعة Pro الشهرية بقيمة 5 دولارات.",
        fr: "Choisissez PayPal ou une carte bancaire pour régler le mois Pro à 5 $.",
        en: "Choose PayPal or a debit/credit card to pay for one month of Pro at $5.",
    },
    badge: {
        ar: "PayPal / بطاقة",
        fr: "PayPal / carte",
        en: "PayPal / card",
    },
    close: {
        ar: "إغلاق",
        fr: "Fermer",
        en: "Close",
    },
    trust: {
        ar: "تتم المعالجة عبر PayPal. لا نخزّن بيانات البطاقة.",
        fr: "Traitement via PayPal. Nous ne stockons aucune carte.",
        en: "Processed by PayPal. We never store card details.",
    },
};

function t(key: string, lang: string): string {
    return COPY[key]?.[lang] ?? COPY[key]?.en ?? key;
}

export function PaypalCheckoutModal({ isOpen, onClose, onSuccess, title, description }: PaypalCheckoutModalProps) {
    const { language, dir } = useLanguage();

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        const previousOverflow = document.body.style.overflow;

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === "undefined") return null;

    return createPortal(
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-background/75 p-0 backdrop-blur-md sm:items-center sm:p-5" role="dialog" aria-modal="true" dir={dir}>
            <button className="absolute inset-0 cursor-default" aria-label={t("close", language)} onClick={onClose} />

            <div className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-y-auto rounded-t-3xl border border-border bg-card px-5 py-5 text-card-foreground shadow-2xl shadow-black/20 sm:max-w-lg sm:rounded-3xl sm:px-7 sm:py-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            <Crown className="h-3.5 w-3.5" />
                            {t("badge", language)}
                        </div>
                        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                            {title || t("title", language)}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {description || t("description", language)}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={t("close", language)}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                    <PaypalButtons
                        onSuccess={() => {
                            onSuccess?.();
                            onClose();
                        }}
                    />
                </div>

                <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {t("trust", language)}
                </p>
            </div>
        </div>,
        document.body
    );
}
