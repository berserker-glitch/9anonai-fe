"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { trackEvent } from "@/lib/analytics";

type Lang = "ar" | "fr" | "en" | "auto";
type Step = "persona" | "main";
type Persona = "individual" | "business" | "legal" | "student";

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

// Scenario indices reordered by persona relevance
const PERSONA_SCENARIO_ORDER: Record<Persona, number[]> = {
    individual: [0, 1, 2, 4, 7, 6, 5, 3],
    business:   [3, 0, 6, 1, 7, 5, 4, 2],
    legal:      [0, 1, 2, 3, 4, 5, 6, 7],
    student:    [4, 0, 2, 7, 6, 3, 1, 5],
};

const LANG_OPTIONS = [
    { id: "auto", label: "Auto", labelAr: "تلقائي", icon: "✨" },
    { id: "ar",   label: "العربية", labelAr: "العربية", icon: "🇲🇦" },
    { id: "fr",   label: "Français", labelAr: "Français", icon: "🇫🇷" },
    { id: "en",   label: "English", labelAr: "English", icon: "🇬🇧" },
];

const MARKETING_OPTIONS = [
    { id: "Social Media (Instagram, LinkedIn, etc.)", ar: "شبكات التواصل الاجتماعي", fr: "Réseaux sociaux", en: "Social Media" },
    { id: "Friend / Colleague",                       ar: "صديق / زميل",             fr: "Ami / Collègue", en: "Friend / Colleague" },
    { id: "Search Engine (Google)",                   ar: "محرك البحث",               fr: "Moteur de recherche", en: "Search Engine" },
    { id: "Advertisement",                            ar: "إعلان",                    fr: "Publicité",      en: "Advertisement" },
    { id: "Other",                                    ar: "أخرى",                     fr: "Autre",          en: "Other" },
];

interface PersonaCard {
    id: Persona;
    icon: string;
    ar: string; arSub: string;
    fr: string; frSub: string;
    en: string; enSub: string;
}

const PERSONAS: PersonaCard[] = [
    { id: "individual", icon: "👤", ar: "فرد",            arSub: "مسائل شخصية وعائلية",       fr: "Particulier",    frSub: "Questions personnelles & familiales", en: "Individual",         enSub: "Personal & family matters"    },
    { id: "business",   icon: "🏢", ar: "مقاول / شركة",   arSub: "الأعمال والضرائب والعقود",  fr: "Entrepreneur",   frSub: "Business, fiscalité & contrats",     en: "Business Owner",     enSub: "Business, tax & contracts"    },
    { id: "legal",      icon: "⚖️", ar: "محامٍ / قانوني", arSub: "بحث قانوني ومراجعة وثائق", fr: "Juriste / Avocat",frSub: "Recherche juridique & documents",    en: "Legal Professional", enSub: "Research & document review"   },
    { id: "student",    icon: "🎓", ar: "طالب / باحث",    arSub: "التعليم والبحث القانوني",   fr: "Étudiant",       frSub: "Études & recherche juridique",       en: "Student",            enSub: "Legal studies & research"     },
];

const UI_TEXT = {
    personaTitle:    { ar: "من أنت؟",                                fr: "Qui êtes-vous ?",                              en: "Who are you?" },
    personaSubtitle: { ar: "سيساعدنا هذا في تخصيص إجاباتنا لك",    fr: "Cela nous aide à personnaliser nos réponses",  en: "This helps us tailor answers for you" },
    continueBtn:     { ar: "متابعة",                                  fr: "Continuer",                                    en: "Continue" },
    step:            { ar: "الخطوة",                                  fr: "Étape",                                        en: "Step" },
    stepOf:          { ar: "من",                                      fr: "sur",                                          en: "of" },
    title:           { ar: "ما هو سؤالك القانوني؟",                  fr: "Quelle est votre question juridique ?",        en: "What's your legal question?" },
    subtitle:        { ar: "اختر موضوعاً أو اكتب سؤالك الخاص",      fr: "Choisissez un sujet ou posez votre question",  en: "Pick a topic or type your own question" },
    langLabel:       { ar: "لغة المحادثة",                           fr: "Langue",                                       en: "Language" },
    sourceLabel:     { ar: "كيف عرفت عنا؟ (اختياري)",               fr: "Comment nous avez-vous trouvés ? (optionnel)", en: "How did you find us? (optional)" },
    or:              { ar: "أو اكتب سؤالك الخاص",                   fr: "ou posez votre propre question",               en: "or type your own question" },
    askBtn:          { ar: "ابدأ",                                    fr: "Démarrer",                                     en: "Start" },
    saving:          { ar: "جارٍ التحميل...",                        fr: "Chargement...",                                en: "Loading..." },
};

function t(key: keyof typeof UI_TEXT, lang: Lang): string {
    const l = lang === "auto" ? "ar" : lang;
    return (UI_TEXT[key] as Record<string, string>)[l] ?? (UI_TEXT[key] as Record<string, string>)["ar"];
}

function scenarioLabel(s: Scenario, lang: Lang): string {
    if (lang === "auto" || lang === "ar") return s.ar;
    if (lang === "fr") return s.fr;
    return s.en;
}

function personaLabel(p: PersonaCard, lang: Lang): { title: string; sub: string } {
    if (lang === "auto" || lang === "ar") return { title: p.ar, sub: p.arSub };
    if (lang === "fr") return { title: p.fr, sub: p.frSub };
    return { title: p.en, sub: p.enSub };
}

function detectLang(): Lang {
    if (typeof navigator === "undefined") return "ar";
    const l = navigator.language.toLowerCase();
    if (l.startsWith("ar")) return "ar";
    if (l.startsWith("fr")) return "fr";
    if (l.startsWith("en")) return "en";
    return "ar";
}

interface ProgressBarProps {
    stepNum: number;
    lang: Lang;
}

function ProgressBar({ stepNum, lang }: ProgressBarProps) {
    return (
        <div className="flex items-center gap-2 mb-8">
            <div className="flex gap-1.5">
                {[1, 2].map((n) => (
                    <div
                        key={n}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            n <= stepNum ? "w-8 bg-primary" : "w-5 bg-border"
                        }`}
                    />
                ))}
            </div>
            <span className="text-xs text-muted-foreground">
                {t("step", lang)} {stepNum} {t("stepOf", lang)} 2
            </span>
        </div>
    );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SetupPage() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const { setLanguage } = useLanguage();

    const [step, setStep] = useState<Step>("persona");
    const [persona, setPersona] = useState<Persona | null>(null);
    const [spokenLanguage, setSpokenLanguage] = useState<Lang>("auto");
    const [marketingSource, setMarketingSource] = useState("");
    const [customQuestion, setCustomQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isRtl = spokenLanguage === "ar" || spokenLanguage === "auto";

    // Auto-detect browser language on mount
    useEffect(() => {
        setSpokenLanguage(detectLang());
    }, []);

    // Redirect if already onboarded
    useEffect(() => {
        if (user?.isOnboarded) router.push("/chat");
    }, [user, router]);

    // Apply language direction immediately
    useEffect(() => {
        if (spokenLanguage !== "auto") setLanguage(spokenLanguage);
    }, [spokenLanguage, setLanguage]);

    const orderedScenarios = persona
        ? PERSONA_SCENARIO_ORDER[persona].map((i) => SCENARIOS[i])
        : SCENARIOS;

    const handlePersonaContinue = () => {
        if (!persona) return;
        trackEvent("persona_selected", { persona, language: spokenLanguage });
        setStep("main");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFinish = async (question: string) => {
        setLoading(true);
        setError("");
        const personalizationData = JSON.stringify({
            tones: [],
            customInstructions: "",
            spokenLanguage,
            role: persona,
        });
        const source = marketingSource || "Other";

        try {
            const res = await updateProfile({
                personalization: personalizationData,
                marketingSource: source,
                isOnboarded: true,
            });

            if (res.success) {
                trackEvent("onboarding_completed", { language: spokenLanguage, source, persona: persona ?? "" });
                const encoded = question ? encodeURIComponent(question) : "";
                router.push(encoded ? `/chat?q=${encoded}` : "/chat");
            } else {
                setError(res.error || "Failed to save setup.");
                setLoading(false);
            }
        } catch {
            setError("Something went wrong.");
            setLoading(false);
        }
    };

    const handleCustomSubmit = () => {
        const q = customQuestion.trim();
        if (!q) return;
        handleFinish(q);
    };

    // ── Step 1: Persona (unskippable) ────────────────────────────────────────
    if (step === "persona") {
        return (
            <div className="min-h-screen bg-background" dir={isRtl ? "rtl" : "ltr"}>
                <div className="max-w-2xl mx-auto px-4 py-10">

                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border border-border/50">
                            <img src="/9anon-logo.png" alt="9anon" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">9anon AI</span>
                    </div>

                    <ProgressBar stepNum={1} lang={spokenLanguage} />

                    <div className="space-y-2 mb-6">
                        <h1 className="text-3xl font-bold tracking-tight">{t("personaTitle", spokenLanguage)}</h1>
                        <p className="text-muted-foreground text-sm">{t("personaSubtitle", spokenLanguage)}</p>
                    </div>

                    {/* Language toggle — small, non-blocking */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {LANG_OPTIONS.filter((o) => o.id !== "auto").map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setSpokenLanguage(opt.id as Lang)}
                                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all flex items-center gap-1 ${
                                    spokenLanguage === opt.id
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                                }`}
                            >
                                <span>{opt.icon}</span>
                                <span>{isRtl ? opt.labelAr : opt.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Persona cards 2×2 */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {PERSONAS.map((p) => {
                            const { title, sub } = personaLabel(p, spokenLanguage);
                            const selected = persona === p.id;
                            return (
                                <button
                                    key={p.id}
                                    onClick={() => setPersona(p.id)}
                                    className={`relative flex flex-col items-start gap-2 p-5 rounded-2xl border-2 text-start transition-all duration-200 ${
                                        selected
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-border hover:border-primary/40 hover:bg-muted/30"
                                    }`}
                                >
                                    <span className="text-3xl">{p.icon}</span>
                                    <div>
                                        <p className="font-semibold text-sm leading-tight">{title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{sub}</p>
                                    </div>
                                    {selected && (
                                        <div className="absolute top-3 end-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                            <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M2 6l3 3 5-5" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={handlePersonaContinue}
                        disabled={!persona}
                        className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                    >
                        {t("continueBtn", spokenLanguage)} →
                    </button>
                </div>
            </div>
        );
    }

    // ── Step 2: Scenarios + source chips (no separate source screen) ─────────
    return (
        <div className="min-h-screen bg-background" dir={isRtl ? "rtl" : "ltr"}>
            <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg overflow-hidden border border-border/50">
                        <img src="/9anon-logo.png" alt="9anon" className="w-full h-full object-cover" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">9anon AI</span>
                </div>

                <ProgressBar stepNum={2} lang={spokenLanguage} />

                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("title", spokenLanguage)}</h1>
                    <p className="text-muted-foreground text-sm">{t("subtitle", spokenLanguage)}</p>
                </div>

                {/* Language picker */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {t("langLabel", spokenLanguage)}
                    </label>
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

                {/* Scenario grid — reordered by persona */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {orderedScenarios.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => !loading && handleFinish(scenarioLabel(s, spokenLanguage))}
                            disabled={loading}
                            className="flex items-start gap-3 p-4 rounded-xl border border-border text-start hover:border-primary/60 hover:bg-primary/5 hover:shadow-sm transition-all duration-200 group disabled:opacity-50"
                        >
                            <span className="text-2xl mt-0.5 shrink-0">{s.icon}</span>
                            <span className="text-sm font-medium leading-snug text-foreground/90 group-hover:text-foreground">
                                {loading ? t("saving", spokenLanguage) : scenarioLabel(s, spokenLanguage)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Custom question input */}
                <div className="space-y-3 pt-1">
                    <p className="text-center text-xs text-muted-foreground">{t("or", spokenLanguage)}</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={customQuestion}
                            onChange={(e) => setCustomQuestion(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
                            placeholder={
                                spokenLanguage === "ar" || spokenLanguage === "auto"
                                    ? "اكتب سؤالك القانوني هنا..."
                                    : spokenLanguage === "fr"
                                    ? "Posez votre question juridique ici..."
                                    : "Type your legal question here..."
                            }
                            className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
                        />
                        <button
                            onClick={handleCustomSubmit}
                            disabled={!customQuestion.trim() || loading}
                            className="px-5 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 text-sm shrink-0"
                        >
                            {t("askBtn", spokenLanguage)}
                        </button>
                    </div>
                </div>

                {/* Source chips — inline, optional */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                    <p className="text-xs font-medium text-muted-foreground">{t("sourceLabel", spokenLanguage)}</p>
                    <div className="flex flex-wrap gap-2">
                        {MARKETING_OPTIONS.map((opt) => {
                            const label =
                                spokenLanguage === "ar" || spokenLanguage === "auto"
                                    ? opt.ar
                                    : spokenLanguage === "fr"
                                    ? opt.fr
                                    : opt.en;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => setMarketingSource(marketingSource === opt.id ? "" : opt.id)}
                                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                                        marketingSource === opt.id
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <p className="text-center text-xs text-muted-foreground pb-4">
                    9anon AI ·{" "}
                    {spokenLanguage === "ar" || spokenLanguage === "auto"
                        ? "مساعدك القانوني المغربي"
                        : spokenLanguage === "fr"
                        ? "Votre assistant juridique marocain"
                        : "Your Moroccan legal assistant"}
                </p>
            </div>
        </div>
    );
}
