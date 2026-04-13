"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { trackEvent } from "@/lib/analytics";

// ─── Trilingual scenario cards ───────────────────────────────────────────────

type Lang = "ar" | "fr" | "en" | "auto";

interface Scenario {
    icon: string;
    ar: string;
    fr: string;
    en: string;
}

const SCENARIOS: Scenario[] = [
    { icon: "👔", ar: "ما هي حقوقي عند الفصل التعسفي من العمل؟", fr: "Quels sont mes droits en cas de licenciement abusif ?", en: "What are my rights if I'm unfairly dismissed from work?" },
    { icon: "🏠", ar: "كيف يمكنني فسخ عقد الكراء أو رفع قيمته؟", fr: "Comment résilier ou augmenter un contrat de bail ?", en: "How can I terminate or increase a rental contract?" },
    { icon: "💍", ar: "ما هي إجراءات الطلاق في القانون المغربي؟", fr: "Quelle est la procédure de divorce au Maroc ?", en: "What is the divorce procedure under Moroccan law?" },
    { icon: "🏗️", ar: "كيف أؤسس شركة في المغرب؟ ما الخطوات والمتطلبات؟", fr: "Comment créer une société au Maroc ? Étapes et exigences ?", en: "How do I start a company in Morocco? Steps and requirements?" },
    { icon: "⚖️", ar: "ما هي قواعد الإرث في المغرب وكيف تُقسَّم التركة؟", fr: "Quelles sont les règles d'héritage au Maroc ?", en: "What are the inheritance rules in Morocco?" },
    { icon: "🛡️", ar: "تعرضت لجريمة إلكترونية — ما الإجراءات القانونية؟", fr: "Je suis victime d'une cybercriminalité — que faire légalement ?", en: "I've been a victim of cybercrime — what are my legal options?" },
    { icon: "📋", ar: "كيف أطعن في قرار إداري صادر بحقي؟", fr: "Comment contester une décision administrative ?", en: "How do I appeal an administrative decision against me?" },
    { icon: "💼", ar: "ما هي حقوق المستهلك عند شراء منتج معيب؟", fr: "Quels sont mes droits si j'achète un produit défectueux ?", en: "What are my consumer rights when I buy a defective product?" },
];

const LANG_OPTIONS = [
    { id: "auto", label: "Auto-detect", labelAr: "كشف تلقائي", icon: "✨" },
    { id: "ar",   label: "العربية",    labelAr: "العربية",     icon: "🇲🇦" },
    { id: "fr",   label: "Français",   labelAr: "Français",    icon: "🇫🇷" },
    { id: "en",   label: "English",    labelAr: "English",     icon: "🇬🇧" },
];

const MARKETING_OPTIONS = [
    { id: "Social Media (Instagram, LinkedIn, etc.)", ar: "شبكات التواصل الاجتماعي", fr: "Réseaux sociaux", en: "Social Media" },
    { id: "Friend / Colleague",                       ar: "صديق / زميل",             fr: "Ami / Collègue", en: "Friend / Colleague" },
    { id: "Search Engine (Google)",                   ar: "محرك البحث (Google)",     fr: "Moteur de recherche (Google)", en: "Search Engine (Google)" },
    { id: "Advertisement",                            ar: "إعلان",                   fr: "Publicité",      en: "Advertisement" },
    { id: "Other",                                    ar: "أخرى",                    fr: "Autre",          en: "Other" },
];

const UI_TEXT = {
    title:       { ar: "مرحباً بك في 9anon 👋",          fr: "Bienvenue sur 9anon 👋",            en: "Welcome to 9anon 👋" },
    subtitle:    { ar: "اختر موضوعاً لتبدأ محادثتك القانونية الأولى — أو اكتب سؤالك الخاص", fr: "Choisissez un sujet pour commencer ou posez votre propre question", en: "Pick a topic to start your first legal chat — or type your own question" },
    langLabel:   { ar: "لغة المحادثة",                   fr: "Langue de conversation",           en: "Conversation language" },
    sourceLabel: { ar: "كيف عرفت عن 9anon؟",            fr: "Comment avez-vous entendu parler de 9anon ?", en: "How did you hear about 9anon?" },
    skip:        { ar: "تخطي",                           fr: "Ignorer",                          en: "Skip" },
    or:          { ar: "أو اكتب سؤالك الخاص",           fr: "ou posez votre propre question",   en: "or type your own question" },
    askBtn:      { ar: "ابدأ المحادثة",                  fr: "Démarrer la conversation",         en: "Start chatting" },
    saving:      { ar: "جارٍ التحميل...",                fr: "Chargement...",                    en: "Loading..." },
};

function t(key: keyof typeof UI_TEXT, lang: Lang): string {
    const l = lang === "auto" ? "ar" : lang;
    return UI_TEXT[key][l as "ar" | "fr" | "en"] ?? UI_TEXT[key]["ar"];
}

function scenarioLabel(s: Scenario, lang: Lang): string {
    if (lang === "auto" || lang === "ar") return s.ar;
    if (lang === "fr") return s.fr;
    return s.en;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SetupPage() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const { setLanguage } = useLanguage();

    const [spokenLanguage, setSpokenLanguage] = useState<Lang>("auto");
    const [marketingSource, setMarketingSource] = useState("");
    const [customQuestion, setCustomQuestion] = useState("");
    const [showSourcePicker, setShowSourcePicker] = useState(false);
    const [pendingQuestion, setPendingQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isRtl = spokenLanguage === "ar" || spokenLanguage === "auto";

    // Redirect if already onboarded
    useEffect(() => {
        if (user?.isOnboarded) router.push("/chat");
    }, [user, router]);

    // Apply language direction immediately for visual feedback
    useEffect(() => {
        if (spokenLanguage !== "auto") setLanguage(spokenLanguage);
    }, [spokenLanguage, setLanguage]);

    const handleScenarioClick = (question: string) => {
        trackEvent("scenario_selected", { language: spokenLanguage, question });
        setPendingQuestion(question);
        setShowSourcePicker(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCustomSubmit = () => {
        const q = customQuestion.trim();
        if (!q) return;
        setPendingQuestion(q);
        setShowSourcePicker(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFinish = async (source: string) => {
        setLoading(true);
        setError("");
        const personalizationData = JSON.stringify({
            tones: [],
            customInstructions: "",
            spokenLanguage,
        });

        try {
            const res = await updateProfile({
                personalization: personalizationData,
                marketingSource: source,
                isOnboarded: true,
            });

            if (res.success) {
                trackEvent("onboarding_completed", { language: spokenLanguage, source });
                const encoded = encodeURIComponent(pendingQuestion);
                router.push(pendingQuestion ? `/chat?q=${encoded}` : "/chat");
            } else {
                setError(res.error || "Failed to save setup.");
                setLoading(false);
            }
        } catch {
            setError("Something went wrong.");
            setLoading(false);
        }
    };

    const handleSkip = async () => {
        setLoading(true);
        const personalizationData = JSON.stringify({ tones: [], customInstructions: "", spokenLanguage });
        try {
            const res = await updateProfile({ personalization: personalizationData, isOnboarded: true });
            if (res.success) router.push("/chat");
        } catch {
            setLoading(false);
        }
    };

    // ── Source picker screen ─────────────────────────────────────────────────
    if (showSourcePicker) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4" dir={isRtl ? "rtl" : "ltr"}>
                <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8 space-y-6 animate-in fade-in duration-300">
                    <div className="text-center space-y-1">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl overflow-hidden border border-border/50">
                            <img src="/9anon-logo.png" alt="9anon" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-xl font-bold">{t("sourceLabel", spokenLanguage)}</h2>
                    </div>

                    <div className="space-y-2">
                        {MARKETING_OPTIONS.map((opt) => {
                            const label = spokenLanguage === "ar" || spokenLanguage === "auto" ? opt.ar
                                : spokenLanguage === "fr" ? opt.fr : opt.en;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => !loading && handleFinish(opt.id)}
                                    disabled={loading}
                                    className="w-full p-4 rounded-xl border border-border text-start hover:border-primary/60 hover:bg-primary/5 transition-all disabled:opacity-50 font-medium text-sm"
                                >
                                    {loading ? t("saving", spokenLanguage) : label}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => !loading && handleFinish("Other")}
                        disabled={loading}
                        className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors pt-2 disabled:opacity-50"
                    >
                        {t("skip", spokenLanguage)}
                    </button>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                </div>
            </div>
        );
    }

    // ── Main scenario picker screen ──────────────────────────────────────────
    return (
        <div className="min-h-screen bg-background" dir={isRtl ? "rtl" : "ltr"}>
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-border/50">
                            <img src="/9anon-logo.png" alt="9anon" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">9anon AI</span>
                    </div>
                    <button
                        onClick={handleSkip}
                        disabled={loading}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    >
                        {t("skip", spokenLanguage)} →
                    </button>
                </div>

                {/* Title */}
                <div className="text-center space-y-3 pt-2">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        {t("title", spokenLanguage)}
                    </h1>
                    <p className="text-muted-foreground text-base max-w-xl mx-auto leading-relaxed">
                        {t("subtitle", spokenLanguage)}
                    </p>
                </div>

                {/* Language picker */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t("langLabel", spokenLanguage)}</label>
                    <div className="flex flex-wrap gap-2">
                        {LANG_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setSpokenLanguage(opt.id as Lang)}
                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-1.5 ${
                                    spokenLanguage === opt.id
                                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                                }`}
                            >
                                <span>{opt.icon}</span>
                                <span>{isRtl ? opt.labelAr : opt.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scenario grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SCENARIOS.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => handleScenarioClick(scenarioLabel(s, spokenLanguage))}
                            className="flex items-start gap-3 p-4 rounded-xl border border-border text-start hover:border-primary/60 hover:bg-primary/5 hover:shadow-sm transition-all duration-200 group"
                        >
                            <span className="text-2xl mt-0.5 shrink-0">{s.icon}</span>
                            <span className="text-sm font-medium leading-snug text-foreground/90 group-hover:text-foreground">
                                {scenarioLabel(s, spokenLanguage)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Custom question input */}
                <div className="space-y-3 pt-2">
                    <p className="text-center text-xs text-muted-foreground">{t("or", spokenLanguage)}</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customQuestion}
                            onChange={(e) => setCustomQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
                            placeholder={spokenLanguage === "ar" || spokenLanguage === "auto" ? "اكتب سؤالك القانوني هنا..." : spokenLanguage === "fr" ? "Posez votre question juridique ici..." : "Type your legal question here..."}
                            className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
                        />
                        <button
                            onClick={handleCustomSubmit}
                            disabled={!customQuestion.trim()}
                            className="px-5 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 text-sm shrink-0"
                        >
                            {t("askBtn", spokenLanguage)}
                        </button>
                    </div>
                </div>

                <p className="text-center text-xs text-muted-foreground pb-6">
                    9anon AI · {spokenLanguage === "ar" || spokenLanguage === "auto" ? "مساعدك القانوني المغربي المجاني" : spokenLanguage === "fr" ? "Votre assistant juridique marocain gratuit" : "Your free Moroccan legal assistant"}
                </p>
            </div>
        </div>
    );
}
