"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { useAuth } from "@/lib/auth-context";
import { PaypalButtons } from "@/components/billing/paypal-buttons";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Check, X, ArrowRight, Shield, Sparkles, Upload, MessageSquare, Zap, Scale, Crown, Infinity as InfinityIcon } from "lucide-react";

// ─── Config ─────────────────────────────────────────────────────────────────
const PRICE = "$5";
const LOCALE: Record<string, string> = { ar: "ar-MA", fr: "fr-FR", en: "en-US" };

// ─── Translations ─────────────────────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
    badge:       { ar: "الأسعار",            fr: "Tarifs",                  en: "Pricing" },
    hero_title:  { ar: "ابدأ مجاناً.",       fr: "Commencez gratuitement.", en: "Start free." },
    hero_hl:     { ar: "ترقَّ مقابل 5 دولار.", fr: "Passez Pro pour 5 $.",   en: "Go Pro for $5." },
    hero_sub: {
        ar: "بدون عقود، بدون رسوم خفية. ألغِ متى شئت — استشارة محامٍ واحدة تكلّف أكثر من سنة كاملة من Pro.",
        fr: "Sans contrat, sans frais cachés. Annulez quand vous voulez — une seule consultation d'avocat coûte plus qu'une année entière de Pro.",
        en: "No contracts, no hidden fees, cancel whenever. One lawyer consultation costs more than a full year of Pro.",
    },

    // Basic tier
    basic_name:  { ar: "أساسي",   fr: "Basic",              en: "Basic" },
    basic_tag:   { ar: "مجاني للأبد", fr: "Gratuit pour toujours", en: "Free forever" },
    basic_price: { ar: "مجاناً",  fr: "Gratuit",            en: "Free" },
    basic_desc:  { ar: "كل ما تحتاجه للحصول على إجابات قانونية حقيقية.", fr: "Tout le nécessaire pour de vraies réponses juridiques.", en: "Everything you need to get real legal answers." },
    basic_cta:   { ar: "ابدأ مجاناً", fr: "Commencer gratuitement", en: "Start free" },

    // Pro tier
    pro_name:    { ar: "Pro",     fr: "Pro",                en: "Pro" },
    pro_tag:     { ar: "الأفضل قيمة", fr: "Meilleur choix", en: "Best value" },
    pro_per:     { ar: "/ شهر",   fr: "/ mois",             en: "/ month" },
    pro_desc:    { ar: "إجابات غير محدودة وتحليل كامل للمستندات.", fr: "Réponses illimitées et analyse complète de documents.", en: "Unlimited answers and full document analysis." },
    pro_cta:     { ar: "الترقية إلى Pro", fr: "Passer à Pro", en: "Upgrade to Pro" },
    pro_cta_guest: { ar: "سجّل الدخول للترقية", fr: "Connectez-vous pour passer Pro", en: "Sign in to upgrade" },
    pro_active:  { ar: "أنت مشترك في Pro", fr: "Vous êtes Pro", en: "You're on Pro" },
    pro_until:   { ar: "نشط حتى", fr: "Actif jusqu'au",     en: "Active until" },
    pro_manage:  { ar: "الإدارة في الإعدادات", fr: "Gérer dans les paramètres", en: "Manage in settings" },
    pay_note: {
        ar: "تجديد شهري يدوي — تدفع 5 دولارات كل شهر. لا خصم تلقائي، ولا تخزين لبطاقتك.",
        fr: "Renouvellement mensuel manuel — vous payez 5 $ chaque mois. Aucun prélèvement automatique, aucune carte enregistrée.",
        en: "Manual monthly renewal — you pay $5 each month. No automatic charges, no stored card.",
    },
    paid_title:  { ar: "تم تفعيل Pro!", fr: "Pro activé !",  en: "Pro is active!" },
    paid_sub:    { ar: "شكراً لك — تم ترقية حسابك.", fr: "Merci — votre compte a été mis à niveau.", en: "Thank you — your account has been upgraded." },

    // Trust strip
    trust:       { ar: "دفع آمن عبر PayPal — لا نخزّن بيانات بطاقتك أبداً.", fr: "Paiement sécurisé via PayPal — nous n'enregistrons jamais votre carte.", en: "Secured by PayPal — we never store your card." },

    // Comparison
    cmp_tag:     { ar: "مقارنة", fr: "Comparer",            en: "Compare" },
    cmp_title:   { ar: "Basic مقابل Pro", fr: "Basic vs Pro", en: "Basic vs Pro" },
    cmp_feature: { ar: "الميزة", fr: "Fonctionnalité",       en: "Feature" },
    f_answers:   { ar: "إجابات الذكاء الاصطناعي / محادثة", fr: "Réponses IA / conversation", en: "AI answers / conversation" },
    f_convos:    { ar: "محادثات جديدة", fr: "Nouvelles conversations", en: "New conversations" },
    f_upload:    { ar: "رفع المستندات والصور", fr: "Import de documents et images", en: "Document & image upload" },
    f_domains:   { ar: "جميع المجالات القانونية", fr: "Tous les domaines juridiques", en: "All legal domains" },
    f_langs:     { ar: "العربية · الفرنسية · الإنجليزية · الدارجة", fr: "AR · FR · EN · Darija", en: "AR · FR · EN · Darija" },
    f_priority:  { ar: "إجابات ذات أولوية", fr: "Réponses prioritaires", en: "Priority responses" },
    f_support:   { ar: "الدعم", fr: "Support",              en: "Support" },
    v_unlimited: { ar: "غير محدود", fr: "Illimité",         en: "Unlimited" },
    v_email:     { ar: "بريد إلكتروني", fr: "E-mail",        en: "Email" },
    v_priority:  { ar: "أولوية", fr: "Prioritaire",         en: "Priority" },

    // vs lawyer
    law_tag:     { ar: "المقارنة", fr: "Comparaison",        en: "Comparison" },
    law_title:   { ar: "مقابل محامٍ تقليدي", fr: "Face à un avocat classique", en: "vs. a traditional lawyer" },
    law_sub: {
        ar: "سنة كاملة من Pro = 60 دولار. استشارة محامٍ واحدة = 50–200 دولار. الحساب بسيط.",
        fr: "Une année entière de Pro = 60 $. Une consultation d'avocat = 50–200 $. Le calcul est simple.",
        en: "A full year of Pro = $60. One lawyer consultation = $50–200. The math is simple.",
    },
    law_name:    { ar: "محامٍ تقليدي", fr: "Avocat classique", en: "Traditional lawyer" },
    law_per:     { ar: "لكل استشارة", fr: "par consultation", en: "per consultation" },
    nanon_per:   { ar: "لسنة كاملة من Pro", fr: "pour une année entière de Pro", en: "for a full year of Pro" },

    // FAQ
    faq_title:   { ar: "أسئلة شائعة", fr: "Questions fréquentes", en: "Frequently asked questions" },

    // Final CTA
    final_title: { ar: "جرّبه مجاناً. ترقَّ عندما تكون جاهزاً.", fr: "Essayez gratuitement. Passez Pro quand vous voulez.", en: "Try it free. Upgrade when you're ready." },
    final_sub:   { ar: "لا حاجة لبطاقة للبدء. لا عقود على الإطلاق.", fr: "Aucune carte requise pour commencer. Aucun contrat, jamais.", en: "No card to start. No contracts, ever." },
    refund_link: { ar: "سياسة الاسترداد", fr: "Politique de remboursement", en: "Refund policy" },
};

function c(key: string, lang: string): string {
    return T[key]?.[lang] ?? T[key]?.["en"] ?? key;
}

// ─── Feature lists (per tier) ─────────────────────────────────────────────────
function basicFeatures(lang: string): string[] {
    return {
        ar: ["5 إجابات بالذكاء الاصطناعي لكل محادثة", "محادثات غير محدودة", "جميع مجالات القانون المغربي", "العربية والفرنسية والإنجليزية والدارجة"],
        fr: ["5 réponses IA par conversation", "Conversations illimitées", "Tous les domaines du droit marocain", "Arabe, français, anglais & darija"],
        en: ["5 AI answers per conversation", "Unlimited conversations", "All Moroccan legal domains", "Arabic, French, English & Darija"],
    }[lang] ?? [];
}
function proFeatures(lang: string): string[] {
    return {
        ar: ["إجابات غير محدودة بالذكاء الاصطناعي", "رفع وتحليل المستندات والصور", "إجابات ذات أولوية", "كل مزايا Basic"],
        fr: ["Réponses IA illimitées", "Import & analyse de documents et images", "Réponses prioritaires", "Tout ce qui est inclus dans Basic"],
        en: ["Unlimited AI answers", "Upload & analyze documents and images", "Priority responses", "Everything in Basic"],
    }[lang] ?? [];
}

// ─── Comparison rows ────────────────────────────────────────────────────────
type CellVal = string | boolean;
function compRows(lang: string): { icon: React.ReactNode; label: string; basic: CellVal; pro: CellVal }[] {
    return [
        { icon: <MessageSquare className="w-3.5 h-3.5" />, label: c("f_answers", lang), basic: "5", pro: c("v_unlimited", lang) },
        { icon: <InfinityIcon className="w-3.5 h-3.5" />,  label: c("f_convos", lang),  basic: c("v_unlimited", lang), pro: c("v_unlimited", lang) },
        { icon: <Upload className="w-3.5 h-3.5" />,        label: c("f_upload", lang),  basic: false, pro: true },
        { icon: <Scale className="w-3.5 h-3.5" />,         label: c("f_domains", lang), basic: true,  pro: true },
        { icon: <Sparkles className="w-3.5 h-3.5" />,      label: c("f_langs", lang),   basic: true,  pro: true },
        { icon: <Zap className="w-3.5 h-3.5" />,           label: c("f_priority", lang),basic: false, pro: true },
        { icon: <Shield className="w-3.5 h-3.5" />,        label: c("f_support", lang), basic: c("v_email", lang), pro: c("v_priority", lang) },
    ];
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
    {
        q: { ar: "كيف تتم الفوترة؟", fr: "Comment fonctionne la facturation ?", en: "How does billing work?" },
        a: {
            ar: "اشتراك Pro هو 5 دولارات شهرياً بتجديد يدوي. كل شهر تظهر فاتورة وتدفع 5 دولارات عبر PayPal. لا توجد خصومات تلقائية ولا نخزّن بيانات بطاقتك أبداً.",
            fr: "Pro coûte 5 $/mois avec renouvellement manuel. Chaque mois, une facture apparaît et vous payez 5 $ via PayPal. Aucun prélèvement automatique, et nous n'enregistrons jamais votre carte.",
            en: "Pro is $5/month with manual renewal. Each month an invoice appears and you pay $5 through PayPal. There are no automatic charges, and we never store your card.",
        },
    },
    {
        q: { ar: "ماذا يحدث إن لم أدفع؟", fr: "Que se passe-t-il si je ne paie pas ?", en: "What happens if I don't pay?" },
        a: {
            ar: "لا شيء سيّئ — يعود حسابك ببساطة إلى الخطة المجانية Basic عند انتهاء الشهر المدفوع. لا فترة سماح ولا غرامات. جدّد في أي وقت لاستعادة Pro فوراً.",
            fr: "Rien de grave — votre compte revient simplement au plan gratuit Basic à la fin du mois payé. Aucune période de grâce, aucune pénalité. Renouvelez à tout moment pour retrouver Pro instantanément.",
            en: "Nothing bad — your account simply returns to the free Basic plan when the paid month ends. There's no grace period and no penalty. Renew anytime to get Pro back instantly.",
        },
    },
    {
        q: { ar: "ما الفرق بين Basic و Pro؟", fr: "Quelle est la différence entre Basic et Pro ?", en: "What's the difference between Basic and Pro?" },
        a: {
            ar: "Basic مجاني ويمنحك 5 إجابات لكل محادثة مع محادثات غير محدودة. Pro يزيل هذا الحد ويفتح رفع المستندات والصور ليحلّل الذكاء الاصطناعي ملفاتك.",
            fr: "Basic est gratuit et offre 5 réponses IA par conversation, avec un nombre illimité de conversations. Pro supprime cette limite et débloque l'import de documents et d'images pour que l'IA analyse vos fichiers.",
            en: "Basic is free and gives you 5 AI answers per conversation, with unlimited conversations. Pro removes that limit and unlocks document & image uploads so the AI can analyze your files.",
        },
    },
    {
        q: { ar: "كيف تتم معالجة المدفوعات؟", fr: "Comment les paiements sont-ils traités ?", en: "How are payments processed?" },
        a: {
            ar: "بأمان عبر PayPal Business. يمكنك الدفع من رصيد PayPal أو بأي بطاقة — تتم المعالجة بالكامل عبر PayPal ولا تمرّ بيانات بطاقتك عبر خوادمنا أبداً.",
            fr: "En toute sécurité via PayPal Business. Vous pouvez payer avec votre solde PayPal ou une carte — le paiement est entièrement géré par PayPal et vos données bancaires ne transitent jamais par nos serveurs.",
            en: "Securely through PayPal Business. You can pay with your PayPal balance or any major card — the payment is handled entirely by PayPal and your card details never touch our servers.",
        },
    },
    {
        q: { ar: "هل يمكنني الإلغاء في أي وقت؟", fr: "Puis-je annuler à tout moment ?", en: "Can I cancel anytime?" },
        a: {
            ar: "نعم. بما أن التجديد يدوي، فإن «الإلغاء» يعني ببساطة عدم دفع الفاتورة التالية. تحتفظ بـ Pro حتى نهاية الشهر الذي دفعته بالفعل.",
            fr: "Oui. Comme le renouvellement est manuel, « annuler » signifie simplement ne pas payer la prochaine facture. Vous gardez Pro jusqu'à la fin du mois déjà payé.",
            en: "Yes. Because renewal is manual, 'cancelling' just means not paying the next invoice. You keep Pro until the end of the month you already paid for.",
        },
    },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function PricingPage() {
    const { language: lang, dir } = useLanguage();
    const { user, token, isPro, refetchUser } = useAuth();
    const [showPaypal, setShowPaypal] = useState(false);
    const [paid, setPaid] = useState(false);

    // Scroll-reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("animate-scroll-reveal"); }),
            { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
        );
        document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const proActive = isPro || paid;
    const expiry = user?.proExpiresAt
        ? new Date(user.proExpiresAt).toLocaleDateString(LOCALE[lang] ?? "en-US", { year: "numeric", month: "long", day: "numeric" })
        : null;

    const handleSuccess = () => { setPaid(true); setShowPaypal(false); refetchUser(); };

    return (
        <div className="min-h-screen bg-background flex flex-col" dir={dir}>
            <Header />

            <main className="flex-1">

                {/* Success banner */}
                {paid && (
                    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/30 text-sm font-semibold animate-reveal-up">
                        <Crown className="w-4 h-4 shrink-0" />
                        {c("paid_title", lang)} {c("paid_sub", lang)}
                    </div>
                )}

                {/* ══════════ HERO ══════════ */}
                <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
                    <div className="absolute inset-0 bg-mesh-gradient" />
                    <div className="absolute inset-0 bg-background/50" />
                    <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-[120px] animate-orb-1 pointer-events-none" />
                    <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/6 blur-[100px] animate-orb-2 pointer-events-none" />

                    <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-8 animate-reveal-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{c("badge", lang)}</span>
                        </div>

                        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-5 animate-reveal-up delay-100">
                            <span className="text-foreground">{c("hero_title", lang)}</span>{" "}
                            <span className="text-gradient-emerald italic">{c("hero_hl", lang)}</span>
                        </h1>

                        <p className="animate-reveal-up delay-200 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {c("hero_sub", lang)}
                        </p>
                    </div>
                </section>

                {/* ══════════ TIER CARDS ══════════ */}
                <section className="relative pb-24">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch">

                            {/* ─── BASIC ─── */}
                            <div className="scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                                <div className="flex flex-col h-full rounded-3xl border border-border/50 bg-card p-8 hover:border-border/80 transition-colors">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <h3 className="text-xl font-bold tracking-tight text-foreground">{c("basic_name", lang)}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{c("basic_tag", lang)}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-6">{c("basic_desc", lang)}</p>

                                    <div className="flex items-baseline gap-1.5 mb-7">
                                        <span className="font-display text-5xl font-bold tracking-tight leading-none text-foreground">{c("basic_price", lang)}</span>
                                    </div>

                                    <ul className="space-y-3.5 flex-1 mb-8">
                                        {basicFeatures(lang).map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-[18px] h-[18px] rounded-full border border-border bg-muted/40 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-2.5 h-2.5 text-muted-foreground" strokeWidth={3} />
                                                </div>
                                                <span className="text-sm text-foreground/80 leading-snug">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/chat" className="w-full py-3.5 rounded-xl text-sm font-semibold text-center border border-border/60 text-foreground bg-transparent hover:border-primary/50 hover:text-primary transition-all duration-150 block">
                                        {c("basic_cta", lang)}
                                    </Link>
                                </div>
                            </div>

                            {/* ─── PRO ─── */}
                            <div className="scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700 delay-100 md:-mt-4 md:-mb-4">
                                <div className="relative flex flex-col h-full rounded-3xl border border-primary bg-card p-8 border-glow-emerald overflow-hidden">
                                    {/* top accent */}
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                                    {/* subtle emerald wash */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] to-transparent pointer-events-none" />

                                    {/* Best value badge */}
                                    <div className="absolute top-6 end-6 z-10">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold shadow-lg shadow-primary/40">
                                            <Crown className="w-3 h-3" />
                                            {c("pro_tag", lang)}
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <h3 className="text-xl font-bold tracking-tight text-primary mb-1.5">{c("pro_name", lang)}</h3>
                                        <p className="text-sm text-muted-foreground mb-6">{c("pro_desc", lang)}</p>

                                        <div className="flex items-baseline gap-1.5 mb-7">
                                            <span className="font-display text-6xl font-bold tracking-tight leading-none text-foreground">{PRICE}</span>
                                            <span className="text-sm text-muted-foreground">{c("pro_per", lang)}</span>
                                        </div>

                                        <ul className="space-y-3.5 flex-1 mb-8">
                                            {proFeatures(lang).map((feat, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-[18px] h-[18px] rounded-full border border-primary/60 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                        <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />
                                                    </div>
                                                    <span className="text-sm text-foreground/90 leading-snug">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA zone */}
                                    <div className="relative mt-auto">
                                        {proActive ? (
                                            <div className="text-center">
                                                <div className="inline-flex items-center gap-2 w-full justify-center py-3.5 rounded-xl bg-primary/10 text-primary font-semibold text-sm border border-primary/30">
                                                    <Crown className="w-4 h-4" />
                                                    {c("pro_active", lang)}
                                                </div>
                                                {expiry && (
                                                    <p className="text-xs text-muted-foreground mt-2.5">{c("pro_until", lang)} {expiry}</p>
                                                )}
                                            </div>
                                        ) : !token ? (
                                            <Link href="/login?redirect=/pricing" className="w-full py-3.5 rounded-xl text-sm font-semibold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 block">
                                                {c("pro_cta_guest", lang)}
                                            </Link>
                                        ) : showPaypal ? (
                                            <div className="animate-fade-in">
                                                <PaypalButtons onSuccess={handleSuccess} />
                                            </div>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setShowPaypal(true)}
                                                    className="w-full py-3.5 rounded-xl text-sm font-semibold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 flex items-center justify-center gap-2 group"
                                                >
                                                    {c("pro_cta", lang)}
                                                    <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                                                </button>
                                                <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">{c("pay_note", lang)}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust strip */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground scroll-animate opacity-0 transform translate-y-4 transition-[opacity,transform] duration-700 delay-300 text-center">
                            <span className="inline-flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary shrink-0" />
                                {c("trust", lang)}
                            </span>
                            <Link href="/refund" className="text-primary hover:text-primary/80 font-medium underline-offset-2 hover:underline transition-colors">
                                {c("refund_link", lang)}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════════ COMPARISON TABLE ══════════ */}
                <section className="py-20 lg:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-muted/10 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                    <div className="relative max-w-3xl mx-auto px-6 sm:px-8">
                        <div className="text-center mb-12 scroll-animate opacity-0 transform translate-y-6 transition-[opacity,transform] duration-700">
                            <div className="flex items-center justify-center gap-3 mb-5">
                                <span className="w-8 h-px bg-primary/40" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{c("cmp_tag", lang)}</span>
                                <span className="w-8 h-px bg-primary/40" />
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{c("cmp_title", lang)}</h2>
                        </div>

                        <div className="scroll-animate opacity-0 transform translate-y-6 transition-[opacity,transform] duration-700 delay-100 overflow-x-auto">
                            <table className="w-full min-w-[440px] border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-start text-xs font-semibold text-muted-foreground pb-5 pe-4 w-1/2">{c("cmp_feature", lang)}</th>
                                        <th className="text-center text-sm font-bold text-foreground pb-5 px-3">{c("basic_name", lang)}</th>
                                        <th className="text-center text-sm font-bold text-primary pb-5 px-3">{c("pro_name", lang)}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compRows(lang).map((row, i) => (
                                        <tr key={i} className={`border-t ${i % 2 === 0 ? "border-border/20" : "border-border/10 bg-muted/10"}`}>
                                            <td className="py-4 pe-4">
                                                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                                                    <span className="text-primary/60 shrink-0">{row.icon}</span>
                                                    {row.label}
                                                </div>
                                            </td>
                                            <td className="py-4 px-3 text-center text-xs"><CompCell val={row.basic} highlight={false} /></td>
                                            <td className="py-4 px-3 text-center text-xs bg-primary/[0.04]"><CompCell val={row.pro} highlight /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ══════════ VS LAWYER ══════════ */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
                    <div className="absolute inset-0 bg-background/60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

                    <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="w-8 h-px bg-primary/40" />
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-border/40">
                                <Scale className="w-3 h-3 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{c("law_tag", lang)}</span>
                            </div>
                            <span className="w-8 h-px bg-primary/40" />
                        </div>

                        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">{c("law_title", lang)}</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">{c("law_sub", lang)}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <div className="rounded-2xl border border-border/40 bg-muted/20 p-6 text-start">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">{c("law_name", lang)}</p>
                                <p className="font-display text-3xl font-bold text-foreground mb-1">$50–200</p>
                                <p className="text-sm text-muted-foreground">{c("law_per", lang)}</p>
                                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                                    {[
                                        { ar: "ساعات العمل فقط", fr: "Heures de bureau uniquement", en: "Business hours only" },
                                        { ar: "انتظار أسابيع للموعد", fr: "Des semaines d'attente", en: "Weeks of waiting" },
                                        { ar: "تكاليف مرتفعة لكل وثيقة", fr: "Coût élevé par document", en: "High cost per document" },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <X className="w-3.5 h-3.5 text-destructive/60 shrink-0" />
                                            {item[lang as keyof typeof item] ?? item.en}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 text-start relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">9anon AI</p>
                                <p className="font-display text-3xl font-bold text-foreground mb-1">$60</p>
                                <p className="text-sm text-muted-foreground">{c("nanon_per", lang)}</p>
                                <ul className="mt-4 space-y-2 text-xs text-foreground/80">
                                    {[
                                        { ar: "متاح 24/7 بدون انتظار", fr: "Disponible 24/7 sans attente", en: "24/7 with no waiting" },
                                        { ar: "إجابات غير محدودة", fr: "Réponses illimitées", en: "Unlimited answers" },
                                        { ar: "تحليل المستندات مُضمَّن", fr: "Analyse de documents incluse", en: "Document analysis included" },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                            {item[lang as keyof typeof item] ?? item.en}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ FAQ ══════════ */}
                <section className="py-20 lg:py-24 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <div className="max-w-2xl mx-auto px-6 sm:px-8">
                        <div className="text-center mb-12 scroll-animate opacity-0 transform translate-y-6 transition-[opacity,transform] duration-700">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{c("faq_title", lang)}</h2>
                        </div>
                        <div className="space-y-3">
                            {FAQ_ITEMS.map((item, i) => (
                                <details
                                    key={i}
                                    className="scroll-animate opacity-0 transform translate-y-4 transition-[opacity,transform] duration-700 group rounded-2xl border border-border/40 bg-muted/10 hover:border-border/60 overflow-hidden"
                                    style={{ transitionDelay: `${i * 60}ms` }}
                                >
                                    <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold list-none gap-4">
                                        <span>{item.q[lang as keyof typeof item.q] ?? item.q.en}</span>
                                        <span className="text-primary text-xl font-light shrink-0 transition-transform group-open:rotate-45 select-none">+</span>
                                    </summary>
                                    <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed -mt-1">
                                        {item.a[lang as keyof typeof item.a] ?? item.a.en}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════ FINAL CTA ══════════ */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                    <div className="absolute inset-0 bg-background/70" />
                    <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                        <Crown className="w-12 h-12 text-primary/50 mx-auto mb-6" />
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">{c("final_title", lang)}</h2>
                        <p className="text-muted-foreground text-base mb-8">{c("final_sub", lang)}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 text-foreground font-medium text-sm transition-all duration-200">
                                {c("basic_cta", lang)}
                            </Link>
                            <Link
                                href={token ? "#" : "/login?redirect=/pricing"}
                                onClick={(e) => { if (token) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setShowPaypal(true); } }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200 group"
                            >
                                {c("pro_cta", lang)}
                                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}

// ─── CompCell ─────────────────────────────────────────────────────────────────
function CompCell({ val, highlight }: { val: CellVal; highlight: boolean }) {
    if (val === true) return <Check className={`w-4 h-4 mx-auto ${highlight ? "text-primary" : "text-primary/70"}`} />;
    if (val === false) return <X className="w-4 h-4 mx-auto text-muted-foreground/30" />;
    return <span className={highlight ? "font-semibold text-primary" : "text-foreground/80"}>{val}</span>;
}
