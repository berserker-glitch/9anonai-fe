"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useCheckout } from "@/lib/use-checkout";
import { Check, Zap, ArrowRight } from "lucide-react";

// ─── Translations ────────────────────────────────────────────────────────────

const copy: Record<string, Record<string, string>> = {
    badge:      { ar: "الأسعار",       fr: "Tarifs",            en: "Pricing"          },
    title:      { ar: "بسيط وشفاف",    fr: "Simple et honnête", en: "Simple & honest"  },
    highlight:  { ar: "بدون مفاجآت",   fr: "Sans surprises",    en: "No surprises"     },
    sub: {
        ar: "ابدأ مجاناً واترقِّ فقط حين تحتاج — بدون عقود، بدون رسوم خفية.",
        fr: "Commencez gratuitement et passez à la vitesse supérieure quand vous en avez besoin — sans contrat, sans frais cachés.",
        en: "Start free, upgrade only when you need to — no contracts, no hidden fees.",
    },
    // tier names
    free_name:  { ar: "مجاني",         fr: "Gratuit",           en: "Free"             },
    basic_name: { ar: "أساسي",         fr: "Asasi",             en: "Basic"            },
    pro_name:   { ar: "مهني",          fr: "Mihani",            en: "Pro"              },
    ent_name:   { ar: "مؤسسة",         fr: "Mouassasa",         en: "Enterprise"       },
    // prices
    free_price: { ar: "مجاناً",        fr: "Gratuit",           en: "Free"             },
    basic_price:{ ar: "49 د.م",        fr: "49 MAD",            en: "49 MAD"           },
    pro_price:  { ar: "149 د.م",       fr: "149 MAD",           en: "149 MAD"          },
    ent_price:  { ar: "تواصل معنا",    fr: "Sur devis",         en: "Contact us"       },
    per_mo:     { ar: "/ شهر",         fr: "/ mois",            en: "/ mo"             },
    // descriptions
    free_desc: {
        ar: "لاستفسارات قانونية عرضية",
        fr: "Pour les questions occasionnelles",
        en: "For occasional legal questions",
    },
    basic_desc: {
        ar: "للأفراد ذوي الاحتياجات القانونية المنتظمة",
        fr: "Pour les besoins juridiques réguliers",
        en: "For individuals with regular legal needs",
    },
    pro_desc: {
        ar: "للمهنيين وأصحاب الأعمال",
        fr: "Pour les professionnels et entrepreneurs",
        en: "For professionals and business owners",
    },
    ent_desc: {
        ar: "للفرق والمؤسسات",
        fr: "Pour les équipes et organisations",
        en: "For teams and organizations",
    },
    // features (included only — unlisted = not available)
    f_chat_free:  { ar: "5 رسائل / محادثة",              fr: "5 messages / conversation",    en: "5 messages / conversation"    },
    f_chat_unl:   { ar: "رسائل غير محدودة",             fr: "Messages illimités",            en: "Unlimited messages"           },
    f_history_free:{ ar: "آخر 10 محادثات",             fr: "10 dernières conversations",    en: "Last 10 conversations"        },
    f_history_unl: { ar: "سجل غير محدود",              fr: "Historique illimité",           en: "Unlimited history"            },
    f_contract_3:  { ar: "3 عقود / شهر",               fr: "3 contrats / mois",             en: "3 contracts / month"          },
    f_contract_unl:{ ar: "عقود غير محدودة",            fr: "Contrats illimités",            en: "Unlimited contracts"          },
    f_pdf:         { ar: "تصدير PDF",                    fr: "Export PDF",                   en: "PDF export"                   },
    f_img_free:    { ar: "1 صورة / يوم",               fr: "1 image / jour",               en: "1 image / day"                },
    f_files:       { ar: "صور غير محدودة",             fr: "Images illimitées",             en: "Unlimited images"             },
    f_support:     { ar: "دعم بالبريد الإلكتروني",      fr: "Support par e-mail",           en: "Email support"                },
    f_priority:    { ar: "دعم ذو أولوية",               fr: "Support prioritaire",          en: "Priority support"             },
    f_api:         { ar: "API + مقاعد الفريق",          fr: "API + sièges équipe",          en: "API + team seats"             },
    f_sla:         { ar: "SLA مضمون",                   fr: "SLA garanti",                  en: "Guaranteed SLA"               },
    // CTAs
    cta_free:   { ar: "ابدأ مجاناً",      fr: "Commencer",        en: "Start free"       },
    cta_basic:  { ar: "اشترك الآن",       fr: "S'abonner",        en: "Subscribe"        },
    cta_pro:    { ar: "ترقية إلى المهني", fr: "Passer à Mihani",  en: "Upgrade to Pro"   },
    cta_ent:    { ar: "تواصل معنا",       fr: "Nous contacter",   en: "Contact sales"    },
    // misc
    popular:    { ar: "الأكثر شعبية",     fr: "Populaire",        en: "Most popular"     },
    full_comp:  { ar: "مقارنة كاملة",     fr: "Comparaison complète", en: "Full comparison" },
    guarantee:  {
        ar: "جميع الخطط المدفوعة مشمولة بضمان استرداد لمدة 14 يوماً.",
        fr: "Tous les plans payants sont couverts par une garantie de remboursement de 14 jours.",
        en: "All paid plans covered by a 14-day money-back guarantee.",
    },
};

function c(key: string, lang: string) {
    return copy[key]?.[lang] ?? copy[key]?.["en"] ?? key;
}

// ─── Tier data ────────────────────────────────────────────────────────────────

interface Tier {
    nameKey: string;
    priceKey: string;
    descKey: string;
    showPerMo: boolean;
    ctaKey: string;
    ctaHref: string;
    checkoutPlan?: 'basic' | 'pro';
    highlight: boolean;
    features: string[]; // only included features
}

const TIERS: Tier[] = [
    {
        nameKey: "free_name", priceKey: "free_price", descKey: "free_desc",
        showPerMo: false, ctaKey: "cta_free", ctaHref: "/chat", highlight: false,
        features: ["f_chat_free", "f_history_free", "f_img_free", "f_support"],
    },
    {
        nameKey: "basic_name", priceKey: "basic_price", descKey: "basic_desc",
        showPerMo: true, ctaKey: "cta_basic", ctaHref: "", checkoutPlan: "basic" as const, highlight: true,
        features: ["f_chat_unl", "f_history_unl", "f_contract_3", "f_pdf", "f_files", "f_support"],
    },
    {
        nameKey: "ent_name", priceKey: "ent_price", descKey: "ent_desc",
        showPerMo: false, ctaKey: "cta_ent", ctaHref: "mailto:contact@9anonai.com", highlight: false,
        features: ["f_chat_unl", "f_history_unl", "f_contract_unl", "f_files", "f_api", "f_sla"],
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function PricingSection() {
    const { language: lang, dir } = useLanguage();
    const { openCheckout, loading: checkoutLoading } = useCheckout();

    return (
        <section className="relative py-24 lg:py-36 overflow-hidden" dir={dir}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

                {/* ── Section header ── */}
                <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="w-8 h-px bg-primary/40" />
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-border/40">
                            <Zap className="w-3 h-3 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                {c("badge", lang)}
                            </span>
                        </div>
                        <span className="w-8 h-px bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-4">
                        {c("title", lang)}{" "}
                        <span className="text-gradient-emerald">{c("highlight", lang)}</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
                        {c("sub", lang)}
                    </p>
                </div>

                {/* ── Cards grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                    {TIERS.map((tier, i) => (
                        <div
                            key={tier.nameKey}
                            className="relative scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700"
                            style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                        >
                            <TierCard
                                tier={tier}
                                lang={lang}
                                onCheckout={tier.checkoutPlan ? () => openCheckout(tier.checkoutPlan!) : undefined}
                                isLoading={checkoutLoading === tier.checkoutPlan}
                            />
                        </div>
                    ))}
                </div>

                {/* ── Footer row ── */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 scroll-animate opacity-0 transform translate-y-6 transition-[opacity,transform] duration-700 delay-500">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        {c("guarantee", lang)}
                    </p>
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
                    >
                        {c("full_comp", lang)}
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ─── TierCard ─────────────────────────────────────────────────────────────────

function TierCard({ tier, lang, onCheckout, isLoading }: { tier: Tier; lang: string; onCheckout?: () => void; isLoading?: boolean }) {
    const isPopular = tier.highlight;

    return (
        <>
            {/* Popular badge — top-right, overlaps card border */}
            {isPopular && (
                <div className="absolute -top-3 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold shadow-lg shadow-primary/40">
                        <Zap className="w-3 h-3" />
                        {c("popular", lang)}
                    </span>
                </div>
            )}

            <div className={`flex flex-col h-full rounded-2xl border transition-colors duration-200
                ${isPopular
                    ? "border-primary bg-card"
                    : "border-border/50 bg-card hover:border-border/80"
                }`}
            >
                {/* Header: name, description, price */}
                <div className="p-6 pb-5">
                    <h3 className={`text-xl font-bold tracking-tight mb-1 ${isPopular ? "text-primary" : "text-foreground"}`}>
                        {c(tier.nameKey, lang)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">
                        {c(tier.descKey, lang)}
                    </p>
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-display text-[3.25rem] font-bold tracking-tight leading-none text-foreground">
                            {c(tier.priceKey, lang)}
                        </span>
                        {tier.showPerMo && (
                            <span className="text-sm text-muted-foreground">{c("per_mo", lang)}</span>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50 mx-6" />

                {/* Features */}
                <div className="flex-1 p-6 py-5">
                    <ul className="space-y-3.5">
                        {tier.features.map((key) => (
                            <li key={key} className="flex items-start gap-3">
                                <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${isPopular ? "border-primary/60 bg-primary/10" : "border-primary/40 bg-primary/8"}`}>
                                    <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />
                                </div>
                                <span className="text-sm text-foreground/80 leading-snug">
                                    {c(key, lang)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50 mx-6" />

                {/* CTA */}
                <div className="p-6 pt-5">
                    {onCheckout ? (
                        <button
                            onClick={onCheckout}
                            disabled={isLoading}
                            className={`w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-150 block disabled:opacity-60 disabled:cursor-not-allowed
                                ${isPopular
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "border border-border/60 text-foreground bg-transparent hover:border-primary/50 hover:text-primary"
                                }`}
                        >
                            {isLoading ? "..." : c(tier.ctaKey, lang)}
                        </button>
                    ) : (
                        <Link
                            href={tier.ctaHref}
                            className={`w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all duration-150 block
                                ${isPopular
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "border border-border/60 text-foreground bg-transparent hover:border-primary/50 hover:text-primary"
                                }`}
                        >
                            {c(tier.ctaKey, lang)}
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
