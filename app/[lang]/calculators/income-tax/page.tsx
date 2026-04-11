"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Link from "next/link";

/** 2026 Moroccan IR tax brackets (annual income in MAD) */
const BRACKETS_2026 = [
    { min: 0,       max: 40000,  rate: 0,    label: { ar: "معفى",   fr: "Exonéré", en: "Exempt" } },
    { min: 40001,   max: 60000,  rate: 0.10, label: { ar: "10%",    fr: "10%",      en: "10%" } },
    { min: 60001,   max: 80000,  rate: 0.20, label: { ar: "20%",    fr: "20%",      en: "20%" } },
    { min: 80001,   max: 100000, rate: 0.30, label: { ar: "30%",    fr: "30%",      en: "30%" } },
    { min: 100001,  max: 180000, rate: 0.34, label: { ar: "34%",    fr: "34%",      en: "34%" } },
    { min: 180001,  max: Infinity,rate: 0.38,label: { ar: "38%",    fr: "38%",      en: "38%" } },
];

type Lang = "ar" | "fr" | "en";

function calculateTax(annualIncome: number) {
    let totalTax = 0;
    const breakdown: { label: { ar: string; fr: string; en: string }; taxable: number; tax: number; rate: number }[] = [];

    for (const bracket of BRACKETS_2026) {
        if (annualIncome <= bracket.min - 1) break;
        const taxable = Math.min(annualIncome, bracket.max) - (bracket.min - 1);
        const tax = taxable * bracket.rate;
        totalTax += tax;
        breakdown.push({ label: bracket.label, taxable: Math.max(0, taxable), tax, rate: bracket.rate });
    }

    const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;
    return { totalTax, effectiveRate, breakdown, netAnnual: annualIncome - totalTax, netMonthly: (annualIncome - totalTax) / 12 };
}

const UI = {
    ar: {
        title: "حاسبة الضريبة على الدخل في المغرب 2026",
        subtitle: "احسب ضريبتك على الدخل بناءً على الشرائح الضريبية الرسمية لسنة 2026",
        inputLabel: "الدخل السنوي الإجمالي (درهم)",
        monthlyLabel: "أو أدخل الدخل الشهري (درهم)",
        calcBtn: "احسب الضريبة",
        reset: "إعادة حساب",
        brackets: "تفصيل الشرائح الضريبية",
        bracketCol: "الشريحة",
        taxableCol: "الدخل الخاضع",
        taxCol: "الضريبة",
        totalTax: "إجمالي الضريبة على الدخل",
        effectiveRate: "المعدل الضريبي الفعلي",
        netAnnual: "الدخل الصافي السنوي",
        netMonthly: "الدخل الصافي الشهري",
        disclaimer: "هذه الحاسبة للأغراض المعلوماتية فقط. استشر مختصاً ضريبياً للحصول على حساب دقيق لوضعك الشخصي.",
        askAI: "اسأل 9anon AI عن ضريبتك",
        dir: "rtl",
    },
    fr: {
        title: "Calculateur IR Maroc 2026",
        subtitle: "Calculez votre impôt sur le revenu selon les tranches fiscales officielles 2026",
        inputLabel: "Revenu annuel brut (MAD)",
        monthlyLabel: "Ou saisissez le revenu mensuel (MAD)",
        calcBtn: "Calculer l'Impôt",
        reset: "Recalculer",
        brackets: "Détail des tranches d'imposition",
        bracketCol: "Tranche",
        taxableCol: "Revenu imposable",
        taxCol: "Impôt",
        totalTax: "Impôt total sur le revenu",
        effectiveRate: "Taux d'imposition effectif",
        netAnnual: "Revenu net annuel",
        netMonthly: "Revenu net mensuel",
        disclaimer: "Ce calculateur est à titre informatif uniquement. Consultez un spécialiste fiscal pour un calcul précis de votre situation.",
        askAI: "Demandez à 9anon AI",
        dir: "ltr",
    },
    en: {
        title: "Morocco Income Tax Calculator 2026",
        subtitle: "Calculate your income tax based on the official 2026 Moroccan IR tax brackets",
        inputLabel: "Annual gross income (MAD)",
        monthlyLabel: "Or enter monthly income (MAD)",
        calcBtn: "Calculate Tax",
        reset: "Recalculate",
        brackets: "Tax bracket breakdown",
        bracketCol: "Bracket",
        taxableCol: "Taxable income",
        taxCol: "Tax",
        totalTax: "Total income tax",
        effectiveRate: "Effective tax rate",
        netAnnual: "Annual net income",
        netMonthly: "Monthly net income",
        disclaimer: "This calculator is for informational purposes only. Consult a tax professional for an accurate calculation of your personal situation.",
        askAI: "Ask 9anon AI About Your Tax",
        dir: "ltr",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Morocco Income Tax Calculator 2026 | 9anon AI",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "inLanguage": ["ar", "fr", "en"],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" },
    "description": "Calculate Moroccan income tax (IR) based on 2026 tax brackets. Free trilingual calculator.",
    "url": "https://9anonai.com/calculators/income-tax",
};

export default function IncomeTaxCalculatorPage({ params }: { params: { lang: string } }) {
    const lang = (params?.lang ?? "ar") as Lang;
    const ui = UI[lang] ?? UI.ar;

    const [annualInput, setAnnualInput] = useState("");
    const [monthlyInput, setMonthlyInput] = useState("");
    const [result, setResult] = useState<ReturnType<typeof calculateTax> | null>(null);

    const handleMonthly = (val: string) => {
        setMonthlyInput(val);
        const monthly = parseFloat(val);
        if (!isNaN(monthly)) {
            setAnnualInput(String(monthly * 12));
        }
    };

    const handleAnnual = (val: string) => {
        setAnnualInput(val);
        const annual = parseFloat(val);
        if (!isNaN(annual)) {
            setMonthlyInput(String((annual / 12).toFixed(2)));
        }
    };

    const calculate = () => {
        const income = parseFloat(annualInput);
        if (!isNaN(income) && income >= 0) {
            setResult(calculateTax(income));
        }
    };

    const fmt = (n: number) =>
        n.toLocaleString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-MA" : "en-US", {
            minimumFractionDigits: 0, maximumFractionDigits: 2,
        });

    return (
        <div className="min-h-screen bg-background" dir={ui.dir}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 max-w-3xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-6">
                        <span className="text-sm font-medium text-primary">📊 IR 2026</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">{ui.title}</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">{ui.subtitle}</p>
                </div>

                {/* Calculator card */}
                <div className="rounded-2xl border border-border/40 bg-card p-6 sm:p-8 shadow-xl shadow-black/10 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">{ui.inputLabel}</label>
                            <input
                                type="number"
                                min="0"
                                value={annualInput}
                                onChange={(e) => handleAnnual(e.target.value)}
                                placeholder="120 000"
                                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{ui.monthlyLabel}</label>
                            <input
                                type="number"
                                min="0"
                                value={monthlyInput}
                                onChange={(e) => handleMonthly(e.target.value)}
                                placeholder="10 000"
                                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-lg"
                            />
                        </div>
                    </div>

                    <button
                        onClick={calculate}
                        className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300"
                    >
                        {ui.calcBtn}
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="space-y-6 animate-reveal-up">
                        {/* Summary cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { label: ui.totalTax, value: `${fmt(result.totalTax)} MAD`, accent: true },
                                { label: ui.effectiveRate, value: `${result.effectiveRate.toFixed(1)}%`, accent: false },
                                { label: ui.netAnnual, value: `${fmt(result.netAnnual)} MAD`, accent: false },
                                { label: ui.netMonthly, value: `${fmt(result.netMonthly)} MAD`, accent: false },
                            ].map((card) => (
                                <div key={card.label} className={`rounded-2xl p-4 border ${card.accent ? "border-primary/40 bg-primary/5" : "border-border/40 bg-card"}`}>
                                    <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                                    <p className={`font-bold text-lg ${card.accent ? "text-primary" : ""}`}>{card.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Bracket breakdown */}
                        <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
                            <div className="px-5 py-4 border-b border-border/30">
                                <h2 className="font-semibold">{ui.brackets}</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border/20 text-muted-foreground">
                                            <th className="px-5 py-3 text-start font-medium">{ui.bracketCol}</th>
                                            <th className="px-5 py-3 text-end font-medium">{ui.taxableCol}</th>
                                            <th className="px-5 py-3 text-end font-medium">{ui.taxCol}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.breakdown.map((row, i) => (
                                            <tr key={i} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                                                <td className="px-5 py-3">{row.label[lang] ?? row.label.en} ({(row.rate * 100).toFixed(0)}%)</td>
                                                <td className="px-5 py-3 text-end tabular-nums">{fmt(row.taxable)} MAD</td>
                                                <td className="px-5 py-3 text-end tabular-nums font-medium">{fmt(row.tax)} MAD</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground text-center">{ui.disclaimer}</p>

                        <Link
                            href="/chat"
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary via-emerald-600 to-teal-500 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.01] transition-all duration-300"
                        >
                            🤖 {ui.askAI}
                        </Link>
                    </div>
                )}

                {/* 2026 bracket reference */}
                <div className="mt-10 rounded-2xl border border-border/40 bg-muted/20 p-6">
                    <h2 className="font-semibold mb-4 text-base">
                        {lang === "ar" ? "شرائح الضريبة على الدخل المغرب 2026" : lang === "fr" ? "Tranches IR Maroc 2026" : "Morocco IR Tax Brackets 2026"}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <tbody>
                                {BRACKETS_2026.map((b, i) => (
                                    <tr key={i} className="border-b border-border/20">
                                        <td className="py-2 pr-4 text-muted-foreground">
                                            {b.max === Infinity ? `> ${b.min.toLocaleString()}` : `${b.min.toLocaleString()} – ${b.max.toLocaleString()}`} MAD
                                        </td>
                                        <td className="py-2 font-semibold text-primary">
                                            {b.label[lang] ?? b.label.en}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Related links */}
                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                    {[
                        { href: "/tax-legal", label: lang === "ar" ? "قانون الضرائب" : lang === "fr" ? "Droit Fiscal" : "Tax Law" },
                        { href: "/business-legal", label: lang === "ar" ? "قانون الأعمال" : lang === "fr" ? "Droit des Affaires" : "Business Legal" },
                        { href: "/calculators/inheritance", label: lang === "ar" ? "حاسبة الإرث" : lang === "fr" ? "Calcul Héritage" : "Inheritance Calc" },
                        { href: "/calculators/rent-increase", label: lang === "ar" ? "حاسبة الكراء" : lang === "fr" ? "Calcul Loyer" : "Rent Calc" },
                    ].map((l) => (
                        <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-border/40 text-sm hover:border-primary/50 hover:text-primary transition-all">
                            {l.label}
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
