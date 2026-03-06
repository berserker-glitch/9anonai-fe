"use client";

/**
 * @fileoverview Feedback modal component displayed to active users (20+ messages).
 * Prompts them to fill out a Google Form for feedback, offering early access
 * to new features as an incentive. Dismissal is persisted in the database.
 * Includes a self-contained language toggle (en/fr/ar).
 * @module components/chat/feedback-modal
 */

import { useState } from "react";
import { Modal } from "../utility/modal";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/auth-context";

/** Google Form URL for user feedback collection */
const FEEDBACK_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdRwPmQo96kPe_etLP4eyxrKJxaQKAAHqk6mLQEvHLIwHg1ZQ/viewform?usp=header";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

/** Supported languages for this modal */
type Lang = "en" | "fr" | "ar";

/**
 * Inline translations for all modal text.
 * Kept self-contained so the modal doesn't depend on global i18n.
 */
const translations: Record<Lang, {
    title: string;
    description: string;
    body: string;
    earlyAccess: string;
    hint: string;
    dismiss: string;
    cta: string;
}> = {
    en: {
        title: "📋 We'd Love Your Feedback!",
        description: "Help us make 9anon even better for you.",
        body: "Since you're an active user of our app, your feedback is invaluable! Fill out this short form and you'll be granted access to",
        earlyAccess: "early access features",
        hint: "This feedback form takes less than 2 minutes to complete and helps us prioritize the features you care about most.",
        dismiss: "Maybe Later",
        cta: "Fill Out Feedback Form",
    },
    fr: {
        title: "📋 Votre avis nous intéresse !",
        description: "Aidez-nous à améliorer 9anon pour vous.",
        body: "En tant qu'utilisateur actif de notre application, votre avis est précieux ! Remplissez ce court formulaire et vous aurez accès à des",
        earlyAccess: "fonctionnalités en avant-première",
        hint: "Ce formulaire prend moins de 2 minutes et nous aide à prioriser les fonctionnalités qui comptent le plus pour vous.",
        dismiss: "Plus tard",
        cta: "Remplir le formulaire",
    },
    ar: {
        title: "📋 !نحب نسمعو رأيك",
        description: ".ساعدنا نحسنو 9anon ليك",
        body: "بما أنك مستخدم نشط ديال التطبيق، رأيك مهم بزاف! عمّر هاد الاستمارة القصيرة وغادي تحصل على",
        earlyAccess: "ميزات الوصول المبكر",
        hint: "هاد الاستمارة كتاخد أقل من دقيقتين وكتساعدنا نعرفو شنو المزايا اللي مهمة ليك بزاف.",
        dismiss: "ربما لاحقاً",
        cta: "عمّر الاستمارة",
    },
};

/** Language labels shown on the toggle buttons */
const langLabels: Record<Lang, string> = { en: "EN", fr: "FR", ar: "AR" };

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Modal shown to users with 20+ messages asking for product feedback.
 * On dismiss or CTA click, calls PATCH /api/auth/dismiss-feedback
 * to persist the dismissal in the database so it won't show again.
 * Includes a language toggle (en/fr/ar) scoped to this modal only.
 *
 * @param {FeedbackModalProps} props - isOpen and onClose handlers
 */
export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const { token, dismissFeedback } = useAuth();
    const [lang, setLang] = useState<Lang>("fr");

    /** Current translation strings */
    const t = translations[lang];

    /** Whether the current language is RTL (Arabic) */
    const isRtl = lang === "ar";

    /**
     * Persists the feedback dismissal in the DB and closes the modal.
     * Called on both CTA click and modal close to ensure the flag is always set.
     */
    const handleDismiss = async () => {
        await dismissFeedback();
        onClose();
    };

    /**
     * Opens the Google Form in a new tab and then dismisses the modal.
     */
    const handleFillForm = () => {
        window.open(FEEDBACK_FORM_URL, "_blank", "noopener,noreferrer");
        handleDismiss();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleDismiss}
            title={t.title}
            description={t.description}
            size="md"
            footer={
                <>
                    <Button variant="ghost" onClick={handleDismiss}>
                        {t.dismiss}
                    </Button>
                    <Button variant="primary" onClick={handleFillForm}>
                        {t.cta}
                    </Button>
                </>
            }
        >
            <div className="space-y-4" dir={isRtl ? "rtl" : "ltr"}>
                {/* Language toggle — scoped to this modal only */}
                <div className="flex items-center gap-1 justify-end">
                    {(Object.keys(langLabels) as Lang[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => setLang(l)}
                            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${lang === l
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                                }`}
                        >
                            {langLabels[l]}
                        </button>
                    ))}
                </div>

                <p className="text-sm text-foreground leading-relaxed">
                    {t.body}{" "}
                    <span className="font-semibold text-primary">
                        {t.earlyAccess}
                    </span>{" "}
                    {lang === "en" ? "when possible." : lang === "fr" ? "dès que possible." : "إن شاء الله."}
                </p>

                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {t.hint}
                    </p>
                </div>
            </div>
        </Modal>
    );
}
