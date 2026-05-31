"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Crown, Check, X, MessageSquare, Upload, Infinity as InfinityIcon } from "lucide-react";

export type UpgradeReason = "messages" | "uploads";

interface UpgradeDialogProps {
    /** Which limit triggered the dialog. `null` keeps it closed. */
    reason: UpgradeReason | null;
    onClose: () => void;
    /** Fired when the user chooses to upgrade (e.g. open Settings → Subscription). */
    onUpgrade: () => void;
    lang: string;
}

type Lang = "ar" | "fr" | "en";

const COPY: Record<string, Record<Lang, string>> = {
    badge: { ar: "ترقية إلى Pro", fr: "Passez à Pro", en: "Upgrade to Pro" },
    messages_title: {
        ar: "لقد وصلت إلى حد الخطة المجانية",
        fr: "Vous avez atteint la limite gratuite",
        en: "You've reached the free limit",
    },
    messages_body: {
        ar: "تشمل الخطة الأساسية 5 إجابات بالذكاء الاصطناعي لكل محادثة. قم بالترقية إلى Pro للحصول على إجابات غير محدودة.",
        fr: "Le plan Basic inclut 5 réponses IA par conversation. Passez à Pro pour des réponses illimitées.",
        en: "Basic includes 5 AI answers per conversation. Upgrade to Pro to keep the conversation going.",
    },
    uploads_title: {
        ar: "رفع الملفات ميزة في Pro",
        fr: "L'envoi de fichiers est réservé à Pro",
        en: "Uploads are a Pro feature",
    },
    uploads_body: {
        ar: "أرفق وحلّل المستندات والصور مع Pro، واحصل أيضاً على إجابات غير محدودة.",
        fr: "Joignez et analysez documents et images avec Pro, et profitez de réponses illimitées.",
        en: "Attach and analyze documents and images with Pro — plus unlimited AI answers.",
    },
    feat_unlimited: { ar: "إجابات غير محدودة", fr: "Réponses illimitées", en: "Unlimited AI answers" },
    feat_uploads: { ar: "رفع وتحليل المستندات والصور", fr: "Envoi & analyse de documents et images", en: "Upload & analyze documents and images" },
    feat_price: { ar: "5 دولار / شهر — بدون التزام", fr: "5 $ / mois — sans engagement", en: "$5 / month — cancel anytime" },
    cta: { ar: "الترقية إلى Pro", fr: "Passer à Pro", en: "Upgrade to Pro" },
    plans: { ar: "عرض جميع الخطط", fr: "Voir tous les plans", en: "See all plans" },
    later: { ar: "ربما لاحقاً", fr: "Plus tard", en: "Maybe later" },
};

function c(key: string, lang: string): string {
    const l: Lang = lang === "ar" ? "ar" : lang === "fr" ? "fr" : "en";
    return COPY[key]?.[l] ?? COPY[key]?.en ?? key;
}

export function UpgradeDialog({ reason, onClose, onUpgrade, lang }: UpgradeDialogProps) {
    const isOpen = reason !== null;
    const isArabic = lang === "ar";

    // Lock body scroll + close on Escape while open
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const title = reason === "messages" ? c("messages_title", lang) : c("uploads_title", lang);
    const body = reason === "messages" ? c("messages_body", lang) : c("uploads_body", lang);

    const features = [
        { icon: InfinityIcon, label: c("feat_unlimited", lang) },
        { icon: Upload, label: c("feat_uploads", lang) },
        { icon: MessageSquare, label: c("feat_price", lang) },
    ];

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            dir={isArabic ? "rtl" : "ltr"}
        >
            {/* Backdrop */}
            <button
                aria-label="Close"
                onClick={onClose}
                className="absolute inset-0 bg-background/70 backdrop-blur-md animate-in fade-in duration-200"
            />

            {/* Card */}
            <div className="relative w-full max-w-md border-glow-emerald rounded-3xl bg-card/95 backdrop-blur-xl p-7 sm:p-8 shadow-2xl shadow-primary/20 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300">
                {/* Close */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className={`absolute top-4 ${isArabic ? "left-4" : "right-4"} w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-muted/60 transition-colors`}
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Crown badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-[0.12em] shadow-lg shadow-primary/30 mb-5">
                    <Crown className="w-3.5 h-3.5" />
                    {c("badge", lang)}
                </div>

                {/* Heading */}
                <h2 className={`font-display text-2xl sm:text-[1.7rem] font-bold tracking-tight leading-tight mb-2.5 ${isArabic ? "text-right" : ""}`}>
                    {title}
                </h2>
                <p className={`text-muted-foreground text-sm leading-relaxed mb-6 ${isArabic ? "text-right" : ""}`}>
                    {body}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-7">
                    {features.map((f, i) => (
                        <li key={i} className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse text-right" : ""}`}>
                            <span className="shrink-0 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <f.icon className="w-4 h-4" />
                            </span>
                            <span className="text-sm font-medium text-foreground/90 flex-1">{f.label}</span>
                            <Check className="w-4 h-4 text-primary shrink-0" />
                        </li>
                    ))}
                </ul>

                {/* CTAs */}
                <button
                    onClick={onUpgrade}
                    className="btn-premium w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl shadow-xl shadow-primary/25"
                >
                    <Crown className="w-4.5 h-4.5" />
                    <span>{c("cta", lang)}</span>
                </button>

                <div className="flex items-center justify-center gap-4 mt-4">
                    <Link
                        href="/pricing"
                        onClick={onClose}
                        className="text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                    >
                        {c("plans", lang)}
                    </Link>
                    <span className="w-px h-3 bg-border/60" />
                    <button
                        onClick={onClose}
                        className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {c("later", lang)}
                    </button>
                </div>
            </div>
        </div>
    );
}
