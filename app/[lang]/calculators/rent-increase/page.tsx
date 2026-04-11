"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Link from "next/link";

type Lang = "ar" | "fr" | "en";

/**
 * Moroccan rent increase rules (Law 67.12):
 * - For residential leases: no automatic indexation formula is set in law;
 *   any increase must be agreed or go through court.
 * - For commercial leases: can be revised every 3 years by agreement or court.
 * - General guidance: rent increases tied to CPI inflation index.
 * We use the official Moroccan CPI increase as a reference.
 */

const CPI_RATE_2024 = 0.038; // ~3.8% inflation 2024
const CPI_RATE_2025 = 0.022; // ~2.2% inflation 2025

const UI = {
    ar: {
        title: "حاسبة الزيادة في الكراء بالمغرب",
        subtitle: "احسب الزيادة القانونية القصوى في الكراء وفق مؤشر أسعار الاستهلاك",
        currentRent: "الكراء الحالي (درهم شهرياً)",
        lastIncreaseYear: "السنة الأخيرة للزيادة في الكراء",
        leaseType: "نوع الكراء",
        residential: "سكني",
        commercial: "تجاري",
        calcBtn: "احسب الزيادة",
        result: "نتيجة الحساب",
        currentRentLabel: "الكراء الحالي",
        maxIncrease: "الزيادة القصوى المرجعية (CPI)",
        newRentLabel: "الكراء بعد الزيادة",
        increaseAmount: "مبلغ الزيادة",
        years: "سنوات منذ آخر زيادة",
        warning: "⚠️ تنبيه مهم",
        warningText: "لا يُحدد القانون المغربي نسبة زيادة تلقائية في الكراء. أي زيادة تستلزم اتفاقاً بين الطرفين أو قراراً قضائياً. هذه الحاسبة تستعمل مؤشر أسعار الاستهلاك (CPI) كمرجع تقريبي فقط.",
        disclaimer: "هذه الأداة للأغراض التوجيهية فقط. استشر 9anon AI أو محامياً قبل أي قرار برفع الكراء.",
        askAI: "اسأل 9anon AI عن زيادة الكراء",
        dir: "rtl",
        notYet: "لا توجد زيادة مقررة لهذه الفترة — الكراء يبقى كما هو",
    },
    fr: {
        title: "Calculateur d'Augmentation de Loyer Maroc",
        subtitle: "Calculez l'augmentation de loyer de référence selon l'indice des prix à la consommation",
        currentRent: "Loyer actuel (MAD/mois)",
        lastIncreaseYear: "Dernière année d'augmentation du loyer",
        leaseType: "Type de bail",
        residential: "Résidentiel",
        commercial: "Commercial",
        calcBtn: "Calculer l'Augmentation",
        result: "Résultat du Calcul",
        currentRentLabel: "Loyer actuel",
        maxIncrease: "Augmentation maximale de référence (IPC)",
        newRentLabel: "Loyer après augmentation",
        increaseAmount: "Montant de l'augmentation",
        years: "Années depuis la dernière augmentation",
        warning: "⚠️ Avertissement Important",
        warningText: "La loi marocaine ne fixe pas de taux d'augmentation automatique des loyers. Toute augmentation nécessite un accord entre les parties ou une décision judiciaire. Ce calculateur utilise l'IPC comme référence approximative.",
        disclaimer: "Cet outil est à titre indicatif uniquement. Consultez 9anon AI ou un avocat avant toute décision d'augmentation de loyer.",
        askAI: "Demander à 9anon AI",
        dir: "ltr",
        notYet: "Pas d'augmentation prévue pour cette période — le loyer reste inchangé",
    },
    en: {
        title: "Morocco Rent Increase Calculator",
        subtitle: "Calculate the reference maximum rent increase based on Morocco's Consumer Price Index",
        currentRent: "Current rent (MAD/month)",
        lastIncreaseYear: "Last year rent was increased",
        leaseType: "Lease type",
        residential: "Residential",
        commercial: "Commercial",
        calcBtn: "Calculate Increase",
        result: "Calculation Result",
        currentRentLabel: "Current rent",
        maxIncrease: "Reference maximum increase (CPI)",
        newRentLabel: "Rent after increase",
        increaseAmount: "Increase amount",
        years: "Years since last increase",
        warning: "⚠️ Important Warning",
        warningText: "Moroccan law does not set an automatic rent increase rate. Any increase requires agreement between parties or a court decision. This calculator uses CPI as an approximate reference only.",
        disclaimer: "This tool is for guidance only. Consult 9anon AI or a lawyer before any rent increase decision.",
        askAI: "Ask 9anon AI About Rent Law",
        dir: "ltr",
        notYet: "No increase scheduled for this period — rent remains unchanged",
    },
};

function calculateRentIncrease(currentRent: number, lastIncreaseYear: number, isCommercial: boolean) {
    const currentYear = 2026;
    const yearsSince = Math.max(0, currentYear - lastIncreaseYear);

    if (yearsSince === 0) return null;

    // For commercial: minimum 3 years between revisions
    if (isCommercial && yearsSince < 3) return null;

    // Compound CPI increases
    let multiplier = 1;
    for (let y = lastIncreaseYear + 1; y <= currentYear; y++) {
        if (y <= 2024) multiplier *= (1 + CPI_RATE_2024);
        else multiplier *= (1 + CPI_RATE_2025);
    }

    const newRent = currentRent * multiplier;
    const increaseAmount = newRent - currentRent;
    const increaseRate = ((multiplier - 1) * 100);

    return { newRent, increaseAmount, increaseRate, yearsSince, currentRent };
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Morocco Rent Increase Calculator | حاسبة الزيادة في الكراء",
    "applicationCategory": "LegalApplication",
    "operatingSystem": "Web",
    "inLanguage": ["ar", "fr", "en"],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" },
    "description": "Calculate the reference maximum rent increase in Morocco based on CPI. Free trilingual calculator.",
    "url": "https://9anonai.com/calculators/rent-increase",
};

export default function RentIncreaseCalculatorPage({ params }: { params: { lang: string } }) {
    const lang = (params?.lang ?? "ar") as Lang;
    const ui = UI[lang] ?? UI.ar;

    const [currentRent, setCurrentRent] = useState("");
    const [lastYear, setLastYear] = useState("2022");
    const [isCommercial, setIsCommercial] = useState(false);
    const [result, setResult] = useState<ReturnType<typeof calculateRentIncrease> | "no-increase" | null>(null);

    const calculate = () => {
        const rent = parseFloat(currentRent);
        const year = parseInt(lastYear);
        if (isNaN(rent) || rent <= 0 || isNaN(year)) return;
        const r = calculateRentIncrease(rent, year, isCommercial);
        setResult(r ?? "no-increase");
    };

    const fmt = (n: number) =>
        n.toLocaleString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-MA" : "en-US", {
            minimumFractionDigits: 0, maximumFractionDigits: 2,
        });

    const years = Array.from({ length: 20 }, (_, i) => 2026 - i);

    return (
        <div className="min-h-screen bg-background" dir={ui.dir}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 max-w-2xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-6">
                        <span className="text-sm font-medium text-primary">🏠 {lang === "ar" ? "الكراء" : lang === "fr" ? "Bail" : "Rental"}</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">{ui.title}</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">{ui.subtitle}</p>
                </div>

                {/* Warning banner */}
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 mb-6 text-sm text-muted-foreground">
                    <p className="font-semibold text-amber-600 mb-1">{ui.warning}</p>
                    <p>{ui.warningText}</p>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-border/40 bg-card p-6 sm:p-8 shadow-xl shadow-black/10 mb-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">{ui.currentRent}</label>
                        <input type="number" min="0" value={currentRent} onChange={e => setCurrentRent(e.target.value)}
                            placeholder="3 500"
                            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">{ui.lastIncreaseYear}</label>
                        <select value={lastYear} onChange={e => setLastYear(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-base">
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-3">{ui.leaseType}</label>
                        <div className="flex gap-3">
                            <button onClick={() => setIsCommercial(false)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${!isCommercial ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>
                                {ui.residential}
                            </button>
                            <button onClick={() => setIsCommercial(true)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${isCommercial ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>
                                {ui.commercial}
                            </button>
                        </div>
                    </div>

                    <button onClick={calculate}
                        className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300">
                        {ui.calcBtn}
                    </button>
                </div>

                {/* Results */}
                {result !== null && (
                    <div className="space-y-5 animate-reveal-up">
                        {result === "no-increase" ? (
                            <div className="rounded-2xl border border-border/40 bg-card p-6 text-center text-muted-foreground">
                                {ui.notYet}
                            </div>
                        ) : (
                            <>
                                <h2 className="font-display font-bold text-xl">{ui.result}</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: ui.currentRentLabel, value: `${fmt(result.currentRent)} MAD`, accent: false },
                                        { label: ui.years, value: String(result.yearsSince), accent: false },
                                        { label: ui.maxIncrease, value: `${result.increaseRate.toFixed(1)}%`, accent: false },
                                        { label: ui.increaseAmount, value: `+${fmt(result.increaseAmount)} MAD`, accent: true },
                                        { label: ui.newRentLabel, value: `${fmt(result.newRent)} MAD`, accent: true },
                                    ].map((card) => (
                                        <div key={card.label} className={`rounded-2xl p-4 border ${card.accent ? "border-primary/40 bg-primary/5 col-span-2" : "border-border/40 bg-card"}`}>
                                            <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                                            <p className={`font-bold text-lg ${card.accent ? "text-primary" : ""}`}>{card.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        <p className="text-xs text-muted-foreground text-center">{ui.disclaimer}</p>

                        <Link href="/chat"
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-primary via-emerald-600 to-teal-500 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.01] transition-all duration-300">
                            🤖 {ui.askAI}
                        </Link>
                    </div>
                )}

                {/* Related links */}
                <div className="mt-10 flex flex-wrap gap-2 justify-center">
                    {[
                        { href: "/rental-law", label: lang === "ar" ? "قانون الكراء" : lang === "fr" ? "Loi sur le Bail" : "Rental Law" },
                        { href: "/tenant-rights", label: lang === "ar" ? "حقوق المكتري" : lang === "fr" ? "Droits Locataire" : "Tenant Rights" },
                        { href: "/real-estate-law", label: lang === "ar" ? "العقار" : lang === "fr" ? "Immobilier" : "Real Estate" },
                        { href: "/calculators/inheritance", label: lang === "ar" ? "حاسبة الإرث" : lang === "fr" ? "Calcul Héritage" : "Inheritance Calc" },
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
