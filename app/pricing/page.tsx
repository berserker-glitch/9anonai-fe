"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Check, X, ArrowRight, Shield, Zap, Scale, Building2, Users, FileText, MessageSquare, Clock, Upload, Headphones } from "lucide-react";

// ─── Translations ─────────────────────────────────────────────────────────────

const T: Record<string, Record<string, string>> = {
    badge:        { ar: "الأسعار",           fr: "Tarifs",              en: "Pricing"                  },
    hero_title:   { ar: "بسيط. شفاف.",       fr: "Simple. Honnête.",    en: "Simple. Honest."          },
    hero_hl:      { ar: "بدون مفاجآت.",      fr: "Sans surprises.",     en: "No surprises."            },
    hero_sub:     {
        ar: "ابدأ مجاناً واترقِّ فقط حين تحتاج — بدون عقود، بدون رسوم خفية. استشارة محامٍ واحدة تكلف أكثر من سنة كاملة معنا.",
        fr: "Commencez gratuitement, passez à la vitesse supérieure quand vous en avez besoin — sans contrat, sans frais cachés. Une consultation d'avocat coûte plus qu'une année entière chez nous.",
        en: "Start free, upgrade only when you need to — no contracts, no hidden fees. One lawyer consultation costs more than a full year with us.",
    },
    // Tier names
    free_name:    { ar: "مجاني",             fr: "Gratuit",             en: "Free"                     },
    basic_name:   { ar: "أساسي",             fr: "Asasi",               en: "Basic"                    },
    pro_name:     { ar: "مهني",              fr: "Mihani",              en: "Pro"                      },
    ent_name:     { ar: "مؤسسة",             fr: "Mouassasa",           en: "Enterprise"               },
    // Prices
    free_price:   { ar: "مجاناً",            fr: "Gratuit",             en: "Free"                     },
    basic_price:  { ar: "$4.99",             fr: "$4.99",               en: "$4.99"                    },
    pro_price:    { ar: "$14.99",            fr: "$14.99",              en: "$14.99"                   },
    ent_price:    { ar: "تواصل معنا",        fr: "Sur devis",           en: "Contact us"               },
    per_mo:       { ar: "/ شهر",             fr: "/ mois",              en: "/ mo"                     },
    // Descriptions
    free_desc:    { ar: "لاستفسارات قانونية عرضية",       fr: "Pour les questions occasionnelles",        en: "For occasional legal questions"           },
    basic_desc:   { ar: "للأفراد ذوي الاحتياجات القانونية المنتظمة", fr: "Pour les besoins juridiques réguliers", en: "For regular legal needs"          },
    pro_desc:     { ar: "للمهنيين وأصحاب الأعمال",       fr: "Pour les professionnels et entrepreneurs", en: "For professionals & business owners"      },
    ent_desc:     { ar: "للفرق والمؤسسات",               fr: "Pour les équipes et organisations",        en: "For teams and organizations"              },
    // CTAs
    cta_free:     { ar: "ابدأ مجاناً",       fr: "Commencer",           en: "Start free"               },
    cta_basic:    { ar: "اشترك الآن",        fr: "S'abonner",           en: "Subscribe"                },
    cta_pro:      { ar: "ترقية إلى المهني",  fr: "Passer à Mihani",     en: "Upgrade to Pro"           },
    cta_ent:      { ar: "تواصل معنا",        fr: "Nous contacter",      en: "Contact sales"            },
    // Popular
    popular:      { ar: "الأكثر شعبية",      fr: "Populaire",           en: "Most popular"             },
    // Feature table header
    table_feat:   { ar: "الميزة",            fr: "Fonctionnalité",      en: "Feature"                  },
    // Feature rows
    f_msgs:       { ar: "رسائل",             fr: "Messages",            en: "Messages"                 },
    f_history:    { ar: "سجل المحادثات",     fr: "Historique",          en: "Chat history"             },
    f_contracts:  { ar: "منشئ العقود",       fr: "Générateur de contrats", en: "Contract Builder"     },
    f_pdf:        { ar: "تصدير PDF",         fr: "Export PDF",          en: "PDF export"               },
    f_files:      { ar: "رفع الملفات",       fr: "Import de fichiers",  en: "File uploads"             },
    f_support:    { ar: "الدعم",             fr: "Support",             en: "Support"                  },
    f_api:        { ar: "وصول API",          fr: "Accès API",           en: "API access"               },
    f_team:       { ar: "مقاعد الفريق",      fr: "Sièges équipe",       en: "Team seats"               },
    f_sla:        { ar: "SLA مضمون",         fr: "SLA garanti",         en: "Guaranteed SLA"           },
    // Feature values
    v_msgs_free:  { ar: "15 رسالة / محادثة", fr: "15 messages / conversation", en: "15 msgs / conversation" },
    v_msgs_paid:  { ar: "غير محدود",         fr: "Illimité",            en: "Unlimited"                },
    v_hist_free:  { ar: "آخر 10",            fr: "10 dernières",        en: "Last 10"                  },
    v_hist_paid:  { ar: "غير محدود",         fr: "Illimité",            en: "Unlimited"                },
    v_contr_free: { ar: "—",                 fr: "—",                   en: "—"                        },
    v_contr_basic:{ ar: "3 / شهر",           fr: "3 / mois",            en: "3 / month"                },
    v_contr_pro:  { ar: "غير محدود",         fr: "Illimité",            en: "Unlimited"                },
    v_email:      { ar: "بريد إلكتروني",     fr: "E-mail",              en: "Email"                    },
    v_priority:   { ar: "أولوية",            fr: "Prioritaire",         en: "Priority"                 },
    v_dedicated:  { ar: "مخصص + SLA",        fr: "Dédié + SLA",         en: "Dedicated + SLA"          },
    v_custom:     { ar: "مخصص",              fr: "Personnalisé",        en: "Custom"                   },
    // Lawyer compare section
    compare_tag:  { ar: "مقارنة",            fr: "Comparaison",         en: "Comparison"               },
    compare_title:{ ar: "مقابل محامٍ تقليدي",fr: "Face à un avocat classique", en: "vs. a Traditional Lawyer" },
    compare_sub:  {
        ar: "الاشتراك الأساسي لسنة كاملة = 59.88 دولار. استشارة محامٍ واحدة = 50–200 دولار. الحساب بسيط.",
        fr: "L'abonnement Asasi pour une année complète = 59,88 $. Une consultation d'avocat = 50–200 $. Le calcul est simple.",
        en: "A full year of Basic = $59.88. One lawyer consultation = $50–200. The math is simple.",
    },
    // FAQ
    faq_title:    { ar: "أسئلة شائعة",       fr: "Questions fréquentes",en: "Frequently asked questions" },
    // Guarantee
    guarantee:    {
        ar: "جميع الخطط المدفوعة مشمولة بضمان استرداد لمدة 14 يوماً.",
        fr: "Tous les plans payants sont couverts par une garantie de remboursement de 14 jours.",
        en: "All paid plans covered by a 14-day money-back guarantee.",
    },
    refund_link:  { ar: "سياسة الاسترداد", fr: "Politique de remboursement", en: "Refund policy" },
};

function c(key: string, lang: string): string {
    return T[key]?.[lang] ?? T[key]?.["en"] ?? key;
}

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
    {
        q: { ar: "هل يمكنني الإلغاء في أي وقت؟", fr: "Puis-je annuler à tout moment ?", en: "Can I cancel anytime?" },
        a: {
            ar: "نعم. يمكنك إلغاء اشتراكك في أي وقت. ستحتفظ بإمكانية الوصول حتى نهاية فترة الفوترة الحالية.",
            fr: "Oui. Vous pouvez annuler à tout moment. Vous conservez l'accès jusqu'à la fin de la période de facturation en cours.",
            en: "Yes. Cancel any time. You keep access until the end of your current billing period.",
        },
    },
    {
        q: { ar: "كيف تتم معالجة المدفوعات؟", fr: "Comment les paiements sont-ils traités ?", en: "How are payments processed?" },
        a: {
            ar: "ندعم البطاقات الدولية (Visa، Mastercard، PayPal) عبر Paddle، وهو وكيل تجاري دولي يتعامل مع ضريبة القيمة المضافة والتحويلات.",
            fr: "Nous acceptons les cartes internationales (Visa, Mastercard, PayPal) via Paddle, un marchand de référence mondial gérant la TVA et les conversions.",
            en: "We accept international cards (Visa, Mastercard, PayPal) via Paddle — a global merchant of record that handles VAT and currency conversion.",
        },
    },
    {
        q: { ar: "هل المحادثات المجانية فعلاً غير محدودة؟", fr: "Les conversations gratuites sont-elles vraiment illimitées ?", en: "Are free conversations truly unlimited?" },
        a: {
            ar: "نعم. يمكنك بدء محادثات جديدة بشكل غير محدود. الحد الوحيد هو 15 رسالة داخل كل محادثة. بعد ذلك، افتح محادثة جديدة مجاناً.",
            fr: "Oui. Vous pouvez commencer autant de nouvelles conversations que vous le souhaitez. La seule limite est de 15 messages par conversation — ouvrez-en une nouvelle ensuite.",
            en: "Yes. Unlimited new conversations. The only cap is 15 messages per conversation — after that, just open a new one for free.",
        },
    },
    {
        q: { ar: "ما هو منشئ العقود؟", fr: "Qu'est-ce que le Générateur de contrats ?", en: "What is the Contract Builder?" },
        a: {
            ar: "أداة مدعومة بالذكاء الاصطناعي تُنشئ عقوداً قانونية احترافية (إيجار، عمل، سرية، خدمات...) جاهزة للتنزيل بصيغة PDF، بأقل تكلفة من محامٍ بكثير.",
            fr: "Un outil IA qui génère des contrats juridiques professionnels (bail, travail, NDA, prestation de services…) exportables en PDF — à une fraction du prix d'un avocat.",
            en: "An AI tool that generates professional legal contracts (rental, employment, NDA, services…) as downloadable PDFs — at a fraction of lawyer fees.",
        },
    },
    {
        q: { ar: "هل هناك نسخة تجريبية؟", fr: "Y a-t-il une période d'essai ?", en: "Is there a trial period?" },
        a: {
            ar: "يُعتبر المستوى المجاني نسخة تجريبية دائمة — 15 رسالة لكل محادثة بدون حدود زمنية. بالإضافة إلى ذلك، تأتي جميع الخطط المدفوعة مع ضمان استرداد لمدة 14 يوماً.",
            fr: "Le plan gratuit est un essai permanent — 15 messages par conversation, sans limite de temps. De plus, tous les plans payants incluent une garantie de remboursement de 14 jours.",
            en: "The free plan is a permanent trial — 15 messages per conversation, no time limit. Plus, all paid plans come with a 14-day money-back guarantee.",
        },
    },
];

// ─── Comparison rows ──────────────────────────────────────────────────────────

type CellVal = string | boolean;

interface CompRow {
    icon: React.ReactNode;
    labelKey: string;
    free: CellVal;
    basic: CellVal;
    pro: CellVal;
    ent: CellVal;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PricingPage() {
    const { language: lang, dir } = useLanguage();

    // Scroll-reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("animate-scroll-reveal");
                });
            },
            { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
        );
        document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const compRows: CompRow[] = [
        {
            icon: <MessageSquare className="w-3.5 h-3.5" />,
            labelKey: "f_msgs",
            free: c("v_msgs_free", lang),
            basic: c("v_msgs_paid", lang),
            pro: c("v_msgs_paid", lang),
            ent: c("v_msgs_paid", lang),
        },
        {
            icon: <Clock className="w-3.5 h-3.5" />,
            labelKey: "f_history",
            free: c("v_hist_free", lang),
            basic: c("v_hist_paid", lang),
            pro: c("v_hist_paid", lang),
            ent: c("v_hist_paid", lang),
        },
        {
            icon: <FileText className="w-3.5 h-3.5" />,
            labelKey: "f_contracts",
            free: false,
            basic: c("v_contr_basic", lang),
            pro: c("v_contr_pro", lang),
            ent: c("v_contr_pro", lang),
        },
        {
            icon: <FileText className="w-3.5 h-3.5" />,
            labelKey: "f_pdf",
            free: false,
            basic: true,
            pro: true,
            ent: true,
        },
        {
            icon: <Upload className="w-3.5 h-3.5" />,
            labelKey: "f_files",
            free: false,
            basic: false,
            pro: true,
            ent: true,
        },
        {
            icon: <Headphones className="w-3.5 h-3.5" />,
            labelKey: "f_support",
            free: c("v_email", lang),
            basic: c("v_email", lang),
            pro: c("v_priority", lang),
            ent: c("v_dedicated", lang),
        },
        {
            icon: <Zap className="w-3.5 h-3.5" />,
            labelKey: "f_api",
            free: false,
            basic: false,
            pro: false,
            ent: true,
        },
        {
            icon: <Users className="w-3.5 h-3.5" />,
            labelKey: "f_team",
            free: false,
            basic: false,
            pro: false,
            ent: c("v_custom", lang),
        },
    ];

    const tiers = [
        {
            nameKey: "free_name",  priceKey: "free_price",  descKey: "free_desc",
            ctaKey: "cta_free",   ctaHref: "/chat",                         highlight: false, icon: <Scale className="w-5 h-5" />,
            showPerMo: false,
        },
        {
            nameKey: "basic_name", priceKey: "basic_price", descKey: "basic_desc",
            ctaKey: "cta_basic",  ctaHref: "/api/billing/checkout?plan=basic", highlight: true, icon: <Zap className="w-5 h-5" />,
            showPerMo: true,
        },
        {
            nameKey: "pro_name",   priceKey: "pro_price",   descKey: "pro_desc",
            ctaKey: "cta_pro",    ctaHref: "/api/billing/checkout?plan=pro",   highlight: false, icon: <FileText className="w-5 h-5" />,
            showPerMo: true,
        },
        {
            nameKey: "ent_name",   priceKey: "ent_price",   descKey: "ent_desc",
            ctaKey: "cta_ent",    ctaHref: "mailto:contact@9anonai.com",        highlight: false, icon: <Building2 className="w-5 h-5" />,
            showPerMo: false,
        },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col" dir={dir}>
            <Header />

            <main className="flex-1">

                {/* ══════════════════════════════════════════════════════════
                    HERO
                ══════════════════════════════════════════════════════════ */}
                <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
                    {/* Mesh background */}
                    <div className="absolute inset-0 bg-mesh-gradient" />
                    <div className="absolute inset-0 bg-background/50" />

                    {/* Orbs */}
                    <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-[120px] animate-orb-1 pointer-events-none" />
                    <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/6 blur-[100px] animate-orb-2 pointer-events-none" />

                    <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-8 animate-reveal-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                {c("badge", lang)}
                            </span>
                        </div>

                        {/* Headline */}
                        <div className="overflow-visible pb-3">
                            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4 animate-reveal-up delay-100">
                                <span className="text-foreground">{c("hero_title", lang)}</span>
                                {" "}
                                <span className="text-gradient-emerald italic">{c("hero_hl", lang)}</span>
                            </h1>
                        </div>

                        <p className="animate-reveal-up delay-200 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {c("hero_sub", lang)}
                        </p>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════
                    TIER CARDS
                ══════════════════════════════════════════════════════════ */}
                <section className="relative py-4 pb-24">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-end">
                            {tiers.map((tier, i) => (
                                <div
                                    key={tier.nameKey}
                                    className="scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700"
                                    style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                                >
                                    <div className={`relative flex flex-col rounded-2xl border transition-all duration-300
                                        ${tier.highlight
                                            ? "border-primary/40 bg-primary/5 shadow-2xl shadow-primary/12 lg:-translate-y-3"
                                            : "border-border/40 bg-muted/15 hover:bg-muted/25 hover:border-border/60"
                                        }`}
                                    >
                                        {/* Top accent line */}
                                        {tier.highlight && (
                                            <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent" />
                                        )}

                                        {/* Popular badge — inside card, no overflow-hidden needed */}
                                        {tier.highlight && (
                                            <div className="px-7 pt-6 pb-0">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wide">
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                                                    </span>
                                                    {c("popular", lang)}
                                                </span>
                                            </div>
                                        )}

                                        <div className={`flex flex-col flex-1 ${tier.highlight ? "p-7 pt-4" : "p-7"}`}>
                                            {/* Name + desc */}
                                            <div className="mb-6">
                                                <p className={`text-xs font-bold uppercase tracking-[0.18em] mb-2 ${tier.highlight ? "text-primary" : "text-muted-foreground"}`}>
                                                    {c(tier.nameKey, lang)}
                                                </p>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {c(tier.descKey, lang)}
                                                </p>
                                            </div>

                                            {/* Price */}
                                            <div className="mb-7 pb-6 border-b border-border/25">
                                                <div className="flex items-baseline gap-1.5 flex-wrap">
                                                    <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                                                        {c(tier.priceKey, lang)}
                                                    </span>
                                                    {tier.showPerMo && (
                                                        <span className="text-sm text-muted-foreground">{c("per_mo", lang)}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <Link
                                                href={tier.ctaHref}
                                                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-center transition-all duration-200 block mb-7
                                                    ${tier.highlight
                                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                                                        : "border border-border/50 bg-background/40 hover:bg-muted/50 text-foreground"
                                                    }`}
                                            >
                                                {c(tier.ctaKey, lang)}
                                            </Link>

                                            {/* Feature highlights */}
                                            <ul className="flex-1 space-y-3">
                                                {getHighlights(tier.nameKey, lang).map((feat, j) => (
                                                    <li key={j} className="flex items-start gap-3 text-sm">
                                                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${tier.highlight ? "text-primary" : "text-primary/70"}`} />
                                                        <span className="text-foreground/85 leading-snug">{feat}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Guarantee row */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 scroll-animate opacity-0 transform translate-y-4 transition-[opacity,transform] duration-700 delay-500">
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Shield className="w-4 h-4 text-primary shrink-0" />
                                {c("guarantee", lang)}{" "}
                                <Link href="/refund" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
                                    {c("refund_link", lang)}
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════
                    FEATURE COMPARISON TABLE
                ══════════════════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-muted/10 pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                    <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                        {/* Header */}
                        <div className="text-center mb-12 scroll-animate opacity-0 transform translate-y-6 transition-[opacity,transform] duration-700">
                            <div className="flex items-center justify-center gap-3 mb-5">
                                <span className="w-8 h-px bg-primary/40" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{c("table_feat", lang)}</span>
                                <span className="w-8 h-px bg-primary/40" />
                            </div>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                                {{
                                    ar: "مقارنة كاملة للخطط",
                                    fr: "Comparaison complète des plans",
                                    en: "Full plan comparison",
                                }[lang] ?? "Full plan comparison"}
                            </h2>
                        </div>

                        {/* Table */}
                        <div className="scroll-animate opacity-0 transform translate-y-6 transition-[opacity,transform] duration-700 delay-100 overflow-x-auto">
                            <table className="w-full min-w-[640px] border-collapse">
                                <thead>
                                    <tr>
                                        <th className="text-start text-xs font-semibold text-muted-foreground pb-4 pe-4 w-1/3">
                                            {c("table_feat", lang)}
                                        </th>
                                        {tiers.map((tier) => (
                                            <th key={tier.nameKey} className={`text-center text-xs font-bold pb-4 px-2 ${tier.highlight ? "text-primary" : "text-foreground"}`}>
                                                {c(tier.nameKey, lang)}
                                            </th>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className="pb-6" />
                                        {tiers.map((tier) => (
                                            <td key={tier.nameKey} className="pb-6 px-2 text-center">
                                                <span className={`text-lg font-bold font-display ${tier.highlight ? "text-primary" : "text-foreground"}`}>
                                                    {c(tier.priceKey, lang)}
                                                </span>
                                                {tier.showPerMo && (
                                                    <span className="text-xs text-muted-foreground"> {c("per_mo", lang)}</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {compRows.map((row, i) => (
                                        <tr key={row.labelKey} className={`border-t ${i % 2 === 0 ? "border-border/20 bg-transparent" : "border-border/10 bg-muted/10"}`}>
                                            <td className="py-3.5 pe-4">
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span className="text-primary/60 shrink-0">{row.icon}</span>
                                                    {c(row.labelKey, lang)}
                                                </div>
                                            </td>
                                            {[row.free, row.basic, row.pro, row.ent].map((val, j) => (
                                                <td key={j} className={`py-3.5 px-2 text-center text-xs ${tiers[j].highlight ? "bg-primary/3" : ""}`}>
                                                    <CompCell val={val} highlight={tiers[j].highlight} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════
                    VS LAWYER BANNER
                ══════════════════════════════════════════════════════════ */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
                    <div className="absolute inset-0 bg-background/60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

                    <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="w-8 h-px bg-primary/40" />
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-border/40">
                                <Scale className="w-3 h-3 text-primary" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                    {c("compare_tag", lang)}
                                </span>
                            </div>
                            <span className="w-8 h-px bg-primary/40" />
                        </div>

                        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
                            {c("compare_title", lang)}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            {c("compare_sub", lang)}
                        </p>

                        {/* Comparison cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <div className="rounded-2xl border border-border/40 bg-muted/20 p-6 text-start">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                                    {{ar:"محامٍ تقليدي", fr:"Avocat classique", en:"Traditional Lawyer"}[lang]}
                                </p>
                                <p className="font-display text-3xl font-bold text-foreground mb-1">$50–200</p>
                                <p className="text-sm text-muted-foreground">
                                    {{ar:"لكل استشارة", fr:"par consultation", en:"per consultation"}[lang]}
                                </p>
                                <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                                    {[
                                        {ar:"ساعات العمل فقط", fr:"Heures de bureau uniquement", en:"Business hours only"},
                                        {ar:"انتظار أسابيع للموعد", fr:"Semaines d'attente", en:"Weeks of waiting"},
                                        {ar:"تكاليف مرتفعة للعقود", fr:"Contrats à prix élevé", en:"High cost per contract"},
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <X className="w-3.5 h-3.5 text-destructive/60 shrink-0" />
                                            {item[lang as keyof typeof item]}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 text-start relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">9anon AI</p>
                                <p className="font-display text-3xl font-bold text-foreground mb-1">$59.88</p>
                                <p className="text-sm text-muted-foreground">
                                    {{ar:"لسنة كاملة (الأساسي)", fr:"pour une année entière (Asasi)", en:"for a full year (Basic)"}[lang]}
                                </p>
                                <ul className="mt-4 space-y-2 text-xs text-foreground/80">
                                    {[
                                        {ar:"متاح 24/7 بدون انتظار", fr:"Disponible 24/7 sans attente", en:"24/7 with no waiting"},
                                        {ar:"محادثات غير محدودة", fr:"Conversations illimitées", en:"Unlimited conversations"},
                                        {ar:"منشئ عقود مدمج", fr:"Générateur de contrats inclus", en:"Contract Builder included"},
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                                            {item[lang as keyof typeof item]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/api/billing/checkout?plan=basic"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/25 hover:bg-primary/90 transition-all duration-200 group"
                            >
                                {c("cta_basic", lang)}
                                <ArrowRight className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════════════
                    FAQ
                ══════════════════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                    <div className="max-w-2xl mx-auto px-6 sm:px-8">
                        <div className="text-center mb-12 scroll-animate opacity-0 transform translate-y-6 transition-[opacity,transform] duration-700">
                            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                                {c("faq_title", lang)}
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {FAQ_ITEMS.map((item, i) => (
                                <details
                                    key={i}
                                    className="scroll-animate opacity-0 transform translate-y-4 transition-[opacity,transform] duration-700 group rounded-2xl border border-border/40 bg-muted/10 hover:border-border/60 transition-colors overflow-hidden"
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

                {/* ══════════════════════════════════════════════════════════
                    FINAL CTA
                ══════════════════════════════════════════════════════════ */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
                    <div className="absolute inset-0 bg-background/70" />

                    <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                        <Shield className="w-12 h-12 text-primary/50 mx-auto mb-6" />
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                            {c("guarantee", lang).split(".")[0]}.
                        </h2>
                        <p className="text-muted-foreground text-base mb-8">
                            {c("guarantee", lang)}{" "}
                            <Link href="/refund" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
                                {c("refund_link", lang)}
                            </Link>
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/chat"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/40 text-foreground font-medium text-sm transition-all duration-200"
                            >
                                {c("cta_free", lang)}
                            </Link>
                            <Link
                                href="/api/billing/checkout?plan=basic"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-200 group"
                            >
                                {c("cta_basic", lang)}
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
    if (val === "—") return <span className="text-muted-foreground/40">—</span>;
    return <span className={highlight ? "font-semibold text-primary" : "text-foreground/80"}>{val}</span>;
}

// ─── Tier highlight features ──────────────────────────────────────────────────

function getHighlights(nameKey: string, lang: string): string[] {
    const map: Record<string, Record<string, string[]>> = {
        free_name: {
            ar: ["15 رسالة / محادثة", "محادثات غير محدودة", "آخر 10 محادثات", "دعم بالبريد الإلكتروني"],
            fr: ["15 messages / conversation", "Conversations illimitées", "10 dernières conversations", "Support par e-mail"],
            en: ["15 messages / conversation", "Unlimited conversations", "Last 10 conversations", "Email support"],
        },
        basic_name: {
            ar: ["رسائل غير محدودة", "3 عقود / شهر", "سجل غير محدود", "تصدير PDF"],
            fr: ["Messages illimités", "3 contrats / mois", "Historique illimité", "Export PDF"],
            en: ["Unlimited messages", "3 contracts / month", "Unlimited history", "PDF export"],
        },
        pro_name: {
            ar: ["رسائل غير محدودة", "عقود غير محدودة", "رفع الملفات وتحليلها", "دعم ذو أولوية"],
            fr: ["Messages illimités", "Contrats illimités", "Dépôt & analyse de docs", "Support prioritaire"],
            en: ["Unlimited messages", "Unlimited contracts", "Document upload & analysis", "Priority support"],
        },
        ent_name: {
            ar: ["كل ميزات المهني", "وصول API", "مقاعد متعددة للفريق", "دعم مخصص + SLA"],
            fr: ["Tout Mihani inclus", "Accès API", "Sièges multi-utilisateurs", "Support dédié + SLA"],
            en: ["Everything in Pro", "API access", "Multi-seat team access", "Dedicated support + SLA"],
        },
    };
    return map[nameKey]?.[lang] ?? map[nameKey]?.["en"] ?? [];
}
