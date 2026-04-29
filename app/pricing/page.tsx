"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

// ---------------------------------------------------------------------------
// Copy
// ---------------------------------------------------------------------------

const T: Record<string, Record<string, string>> = {
    page_title: {
        ar: "الأسعار",
        fr: "Tarifs",
        en: "Pricing",
    },
    page_subtitle: {
        ar: "استشارات قانونية بالذكاء الاصطناعي — بكسر تكلفة محامٍ واحد",
        fr: "Assistance juridique par IA — à une fraction du coût d'un avocat",
        en: "AI legal assistance — at a fraction of one lawyer's fee",
    },
    billing_monthly: {
        ar: "شهري",
        fr: "Mensuel",
        en: "Monthly",
    },
    // Tier names
    free_name: { ar: "مجاني", fr: "Gratuit", en: "Free" },
    basic_name: { ar: "أساسي", fr: "Asasi", en: "Basic" },
    pro_name: { ar: "مهني", fr: "Mihani", en: "Pro" },
    enterprise_name: { ar: "مؤسسة", fr: "Mouassasa", en: "Enterprise" },
    // Prices
    free_price: { ar: "0 درهم", fr: "0 MAD", en: "0 MAD" },
    basic_price_mad: { ar: "49 درهم/شهر", fr: "49 MAD/mois", en: "49 MAD/mo" },
    basic_price_eur: { ar: "4.99 يورو/شهر", fr: "4,99 €/mois", en: "€4.99/mo" },
    pro_price_mad: { ar: "149 درهم/شهر", fr: "149 MAD/mois", en: "149 MAD/mo" },
    pro_price_eur: { ar: "14.99 يورو/شهر", fr: "14,99 €/mois", en: "€14.99/mo" },
    enterprise_price: { ar: "500+ درهم/شهر", fr: "500+ MAD/mois", en: "500+ MAD/mo" },
    // Tag labels
    tag_popular: { ar: "الأكثر شعبية", fr: "Populaire", en: "Most popular" },
    tag_power: { ar: "للمحترفين", fr: "Pour les pros", en: "For power users" },
    // CTAs
    cta_free: { ar: "ابدأ مجاناً", fr: "Commencer gratuitement", en: "Start for free" },
    cta_basic: { ar: "اشترك في الأساسي", fr: "S'abonner à Asasi", en: "Subscribe to Basic" },
    cta_pro: { ar: "اشترك في المهني", fr: "S'abonner à Mihani", en: "Subscribe to Pro" },
    cta_enterprise: { ar: "تواصل معنا", fr: "Nous contacter", en: "Contact us" },
    // Feature group headings
    feat_chat: { ar: "المحادثة", fr: "Chat", en: "Chat" },
    feat_contracts: { ar: "منشئ العقود", fr: "Générateur de contrats", en: "Contract Builder" },
    feat_history: { ar: "السجل", fr: "Historique", en: "History" },
    feat_files: { ar: "الملفات", fr: "Fichiers", en: "Files" },
    feat_support: { ar: "الدعم", fr: "Support", en: "Support" },
    // Feature values — chat
    f_msg_free: {
        ar: "15 رسالة / محادثة (محادثات غير محدودة)",
        fr: "15 messages / conversation (conversations illimitées)",
        en: "15 messages / conversation (unlimited conversations)",
    },
    f_msg_paid: {
        ar: "رسائل غير محدودة",
        fr: "Messages illimités",
        en: "Unlimited messages",
    },
    f_lang: {
        ar: "العربية والفرنسية والإنجليزية",
        fr: "Arabe, français, anglais",
        en: "Arabic, French, English",
    },
    // Feature values — contracts
    f_contracts_free: { ar: "غير متاح", fr: "Non disponible", en: "Not available" },
    f_contracts_basic: { ar: "3 عقود/شهر", fr: "3 contrats/mois", en: "3 contracts/month" },
    f_contracts_pro: { ar: "عقود غير محدودة", fr: "Contrats illimités", en: "Unlimited contracts" },
    f_contracts_types: {
        ar: "إيجار، عمل، سرية، خدمات، وأكثر",
        fr: "Bail, travail, NDA, prestation de services et plus",
        en: "Rental, employment, NDA, services & more",
    },
    f_pdf: { ar: "تصدير PDF", fr: "Export PDF", en: "PDF export" },
    // Feature values — history
    f_history_free: { ar: "آخر 10 محادثات", fr: "10 dernières conversations", en: "Last 10 conversations" },
    f_history_paid: { ar: "سجل غير محدود", fr: "Historique illimité", en: "Unlimited history" },
    // Feature values — files
    f_files_no: { ar: "غير متاح", fr: "Non disponible", en: "Not available" },
    f_files_pro: { ar: "رفع المستندات وتحليلها", fr: "Dépôt et analyse de documents", en: "Document upload & analysis" },
    // Feature values — support
    f_support_std: { ar: "دعم عبر البريد الإلكتروني", fr: "Support par e-mail", en: "Email support" },
    f_support_priority: { ar: "دعم ذو أولوية", fr: "Support prioritaire", en: "Priority support" },
    f_support_sla: { ar: "دعم مخصص + SLA", fr: "Support dédié + SLA", en: "Dedicated support + SLA" },
    // Enterprise extras
    f_api: { ar: "وصول API", fr: "Accès API", en: "API access" },
    f_team: { ar: "مقاعد متعددة للفريق", fr: "Sièges multi-utilisateurs", en: "Multi-seat team access" },
    f_templates: { ar: "قوالب عقود مخصصة", fr: "Modèles de contrats personnalisés", en: "Custom contract templates" },
    // FAQ section
    faq_title: { ar: "أسئلة شائعة", fr: "Questions fréquentes", en: "Frequently Asked Questions" },
    // Lawyer comparison
    compare_title: {
        ar: "مقارنة مع المحامي",
        fr: "Comparaison avec un avocat",
        en: "vs. a Lawyer",
    },
    compare_body: {
        ar: "استشارة محامٍ واحدة في المغرب تكلف 500–2000 درهم. اشتراك الأساسي السنوي = 588 درهم فقط — أقل من استشارة واحدة.",
        fr: "Une consultation d'avocat au Maroc coûte 500–2 000 MAD. L'abonnement Asasi annuel = 588 MAD seulement — moins d'une seule consultation.",
        en: "One lawyer consultation in Morocco costs 500–2,000 MAD. A full year of Basic = 588 MAD — less than a single consultation.",
    },
};

function t(key: string, lang: string): string {
    return T[key]?.[lang] ?? T[key]?.["fr"] ?? key;
}

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const FAQ_KEYS = [
    {
        q: { ar: "هل يمكنني الإلغاء في أي وقت؟", fr: "Puis-je annuler à tout moment ?", en: "Can I cancel anytime?" },
        a: {
            ar: "نعم. يمكنك إلغاء اشتراكك في أي وقت. ستحتفظ بإمكانية الوصول حتى نهاية فترة الفوترة الحالية.",
            fr: "Oui. Vous pouvez annuler votre abonnement à tout moment. Vous conservez l'accès jusqu'à la fin de la période de facturation en cours.",
            en: "Yes. Cancel any time. You keep access until the end of your current billing period.",
        },
    },
    {
        q: { ar: "كيف تتم المدفوعات؟", fr: "Comment les paiements sont-ils traités ?", en: "How are payments processed?" },
        a: {
            ar: "ندعم البطاقات الدولية (Visa، Mastercard، PayPal) عبر Paddle، وهو وكيل تجاري دولي يتعامل مع ضريبة القيمة المضافة والتحويلات.",
            fr: "Nous acceptons les cartes internationales (Visa, Mastercard, PayPal) via Paddle, un marchand de référence mondial gérant la TVA et les conversions.",
            en: "We accept international cards (Visa, Mastercard, PayPal) via Paddle, a global merchant of record that handles VAT and currency conversion.",
        },
    },
    {
        q: { ar: "هل المحادثات المجانية فعلاً غير محدودة؟", fr: "Les conversations gratuites sont-elles vraiment illimitées ?", en: "Are free conversations truly unlimited?" },
        a: {
            ar: "نعم. يمكنك بدء محادثات جديدة بشكل غير محدود. الحد الوحيد هو 15 رسالة داخل كل محادثة فردية، وبعد ذلك يمكنك ببساطة فتح محادثة جديدة.",
            fr: "Oui. Vous pouvez commencer autant de nouvelles conversations que vous souhaitez. La seule limite est de 15 messages par conversation, après quoi vous pouvez simplement en ouvrir une nouvelle.",
            en: "Yes. You can start unlimited new conversations. The only cap is 15 messages inside each individual conversation — after that, just open a new one.",
        },
    },
    {
        q: { ar: "ما هو منشئ العقود؟", fr: "Qu'est-ce que le Générateur de contrats ?", en: "What is the Contract Builder?" },
        a: {
            ar: "أداة مدعومة بالذكاء الاصطناعي تُنشئ عقوداً قانونية احترافية (إيجار، عمل، سرية، خدمات...) جاهزة للتنزيل بصيغة PDF.",
            fr: "Un outil propulsé par l'IA qui génère des contrats juridiques professionnels (bail, travail, NDA, prestation de services…) exportables en PDF.",
            en: "An AI-powered tool that generates professional legal contracts (rental, employment, NDA, services…) ready to download as PDF.",
        },
    },
    {
        q: { ar: "هل هناك أسعار للشتات المغربي في أوروبا؟", fr: "Existe-t-il des tarifs pour la diaspora marocaine en Europe ?", en: "Are there diaspora prices for Moroccans in Europe?" },
        a: {
            ar: "نعم. يُعرض السعر باليورو تلقائياً للمستخدمين خارج المغرب: الأساسي بـ 4.99 يورو/شهر والمهني بـ 14.99 يورو/شهر.",
            fr: "Oui. Le prix en euros est affiché automatiquement pour les utilisateurs hors Maroc : Asasi à 4,99 €/mois et Mihani à 14,99 €/mois.",
            en: "Yes. EUR prices are shown automatically for users outside Morocco: Basic at €4.99/mo and Pro at €14.99/mo.",
        },
    },
];

// ---------------------------------------------------------------------------
// Tier card config
// ---------------------------------------------------------------------------

interface FeatureItem {
    label: string;
    included: boolean;
    note?: string;
}

interface TierConfig {
    nameKey: string;
    priceKey: string;
    altPriceKey?: string;
    ctaKey: string;
    ctaHref: string;
    highlight: boolean;
    tagKey?: string;
    features: {
        groupKey: string;
        items: { labelKey: string; noteKey?: string; included: boolean }[];
    }[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PricingPage() {
    const { language, dir } = useLanguage();

    const tiers: TierConfig[] = [
        {
            nameKey: "free_name",
            priceKey: "free_price",
            ctaKey: "cta_free",
            ctaHref: "/chat",
            highlight: false,
            features: [
                {
                    groupKey: "feat_chat",
                    items: [
                        { labelKey: "f_msg_free", included: true },
                        { labelKey: "f_lang", included: true },
                    ],
                },
                {
                    groupKey: "feat_contracts",
                    items: [{ labelKey: "f_contracts_free", included: false }],
                },
                {
                    groupKey: "feat_history",
                    items: [{ labelKey: "f_history_free", included: true }],
                },
                {
                    groupKey: "feat_files",
                    items: [{ labelKey: "f_files_no", included: false }],
                },
                {
                    groupKey: "feat_support",
                    items: [{ labelKey: "f_support_std", included: true }],
                },
            ],
        },
        {
            nameKey: "basic_name",
            priceKey: "basic_price_mad",
            altPriceKey: "basic_price_eur",
            ctaKey: "cta_basic",
            ctaHref: "/api/billing/checkout?plan=basic",
            highlight: true,
            tagKey: "tag_popular",
            features: [
                {
                    groupKey: "feat_chat",
                    items: [
                        { labelKey: "f_msg_paid", included: true },
                        { labelKey: "f_lang", included: true },
                    ],
                },
                {
                    groupKey: "feat_contracts",
                    items: [
                        { labelKey: "f_contracts_basic", included: true },
                        { labelKey: "f_contracts_types", included: true },
                        { labelKey: "f_pdf", included: true },
                    ],
                },
                {
                    groupKey: "feat_history",
                    items: [{ labelKey: "f_history_paid", included: true }],
                },
                {
                    groupKey: "feat_files",
                    items: [{ labelKey: "f_files_no", included: false }],
                },
                {
                    groupKey: "feat_support",
                    items: [{ labelKey: "f_support_std", included: true }],
                },
            ],
        },
        {
            nameKey: "pro_name",
            priceKey: "pro_price_mad",
            altPriceKey: "pro_price_eur",
            ctaKey: "cta_pro",
            ctaHref: "/api/billing/checkout?plan=pro",
            highlight: false,
            tagKey: "tag_power",
            features: [
                {
                    groupKey: "feat_chat",
                    items: [
                        { labelKey: "f_msg_paid", included: true },
                        { labelKey: "f_lang", included: true },
                    ],
                },
                {
                    groupKey: "feat_contracts",
                    items: [
                        { labelKey: "f_contracts_pro", included: true },
                        { labelKey: "f_contracts_types", included: true },
                        { labelKey: "f_pdf", included: true },
                    ],
                },
                {
                    groupKey: "feat_history",
                    items: [{ labelKey: "f_history_paid", included: true }],
                },
                {
                    groupKey: "feat_files",
                    items: [{ labelKey: "f_files_pro", included: true }],
                },
                {
                    groupKey: "feat_support",
                    items: [{ labelKey: "f_support_priority", included: true }],
                },
            ],
        },
        {
            nameKey: "enterprise_name",
            priceKey: "enterprise_price",
            ctaKey: "cta_enterprise",
            ctaHref: "mailto:contact@9anonai.com",
            highlight: false,
            features: [
                {
                    groupKey: "feat_chat",
                    items: [
                        { labelKey: "f_msg_paid", included: true },
                        { labelKey: "f_lang", included: true },
                    ],
                },
                {
                    groupKey: "feat_contracts",
                    items: [
                        { labelKey: "f_contracts_pro", included: true },
                        { labelKey: "f_templates", included: true },
                        { labelKey: "f_pdf", included: true },
                    ],
                },
                {
                    groupKey: "feat_history",
                    items: [{ labelKey: "f_history_paid", included: true }],
                },
                {
                    groupKey: "feat_files",
                    items: [{ labelKey: "f_files_pro", included: true }],
                },
                {
                    groupKey: "feat_support",
                    items: [
                        { labelKey: "f_support_sla", included: true },
                        { labelKey: "f_api", included: true },
                        { labelKey: "f_team", included: true },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col" dir={dir}>
            <Header />

            <main className="flex-1 px-4 py-16 md:py-24">
                {/* Hero */}
                <div className="max-w-4xl mx-auto text-center mb-14">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        {t("page_title", language)}
                    </h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
                        {t("page_subtitle", language)}
                    </p>
                </div>

                {/* Tier cards */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {tiers.map((tier) => (
                        <TierCard key={tier.nameKey} tier={tier} language={language} />
                    ))}
                </div>

                {/* Lawyer comparison banner */}
                <div className="max-w-2xl mx-auto mt-14 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 text-center">
                    <p className="text-sm font-semibold mb-1">{t("compare_title", language)}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t("compare_body", language)}</p>
                </div>

                {/* FAQ */}
                <div className="max-w-2xl mx-auto mt-16">
                    <h2 className="text-xl font-semibold mb-6 text-center">{t("faq_title", language)}</h2>
                    <div className="space-y-4">
                        {FAQ_KEYS.map((item, i) => (
                            <details key={i} className="group rounded-xl border border-border bg-card">
                                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium list-none">
                                    <span>{item.q[language as keyof typeof item.q] ?? item.q.fr}</span>
                                    <span className="text-muted-foreground transition-transform group-open:rotate-45 select-none">+</span>
                                </summary>
                                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                                    {item.a[language as keyof typeof item.a] ?? item.a.fr}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

// ---------------------------------------------------------------------------
// TierCard sub-component
// ---------------------------------------------------------------------------

function TierCard({ tier, language }: { tier: TierConfig; language: string }) {
    const isHighlighted = tier.highlight;

    return (
        <div
            className={`relative flex flex-col rounded-2xl border p-5 ${
                isHighlighted
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card"
            }`}
        >
            {/* Popular tag */}
            {tier.tagKey && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-primary-foreground whitespace-nowrap">
                    {t(tier.tagKey, language)}
                </span>
            )}

            {/* Name */}
            <p className="text-base font-semibold mb-1">{t(tier.nameKey, language)}</p>

            {/* Price */}
            <div className="mb-4">
                <span className="text-2xl font-bold">{t(tier.priceKey, language)}</span>
                {tier.altPriceKey && (
                    <span className="text-xs text-muted-foreground ms-2">
                        / {t(tier.altPriceKey, language)}
                    </span>
                )}
            </div>

            {/* CTA */}
            <Link
                href={tier.ctaHref}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium text-center transition-colors mb-5 block ${
                    isHighlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-background hover:bg-accent text-foreground"
                }`}
            >
                {t(tier.ctaKey, language)}
            </Link>

            {/* Features */}
            <div className="flex flex-col gap-4 flex-1">
                {tier.features.map((group) => (
                    <div key={group.groupKey}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                            {t(group.groupKey, language)}
                        </p>
                        <ul className="space-y-1.5">
                            {group.items.map((item) => (
                                <li key={item.labelKey} className="flex items-start gap-2 text-xs">
                                    <span
                                        className={`mt-0.5 shrink-0 text-[13px] leading-none ${
                                            item.included ? "text-primary" : "text-muted-foreground/40"
                                        }`}
                                    >
                                        {item.included ? "✓" : "×"}
                                    </span>
                                    <span
                                        className={
                                            item.included
                                                ? "text-foreground/90"
                                                : "text-muted-foreground/50 line-through"
                                        }
                                    >
                                        {t(item.labelKey, language)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
