"use client";

import { useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import Link from "next/link";

type Lang = "ar" | "fr" | "en";

const UI = {
    ar: {
        title: "حاسبة الإرث في المغرب",
        subtitle: "احسب أنصبة الورثة وفق أحكام مدونة الأسرة والفرائض الشرعية المغربية",
        heirs: "أدخل معلومات الورثة",
        spouse: "الزوج/الزوجة",
        hasSpouse: "هل ترك المتوفى زوجاً/زوجة؟",
        spouseGender: "جنس الزوج الباقي على قيد الحياة",
        husband: "زوج (ذكر)",
        wife: "زوجة (أنثى)",
        children: "الأبناء",
        numSons: "عدد الأبناء الذكور",
        numDaughters: "عدد البنات",
        parents: "الوالدان",
        fatherAlive: "هل الأب حي؟",
        motherAlive: "هل الأم حية؟",
        estateValue: "قيمة التركة الإجمالية (درهم) — اختياري",
        calcBtn: "احسب الأنصبة",
        result: "نتيجة توزيع الإرث",
        heir: "الوارث",
        share: "النصيب الشرعي",
        amount: "المبلغ (درهم)",
        noHeirs: "لم يتم إدخال أي وارث. يرجى إدخال معلومات الورثة.",
        disclaimer: "هذه الحاسبة تعطي نتائج تقريبية للأنصبة الشرعية الأساسية. المسائل الإرثية المعقدة (الحجب، العول، الرد) تستلزم استشارة قانونية متخصصة.",
        askAI: "اسأل 9anon AI عن الإرث",
        yes: "نعم",
        no: "لا",
        dir: "rtl",
    },
    fr: {
        title: "Calculateur d'Héritage Maroc",
        subtitle: "Calculez les parts héritiers selon le droit successoral marocain (Moudawana)",
        heirs: "Saisir les informations sur les héritiers",
        spouse: "Époux/Épouse",
        hasSpouse: "Le défunt laisse-t-il un conjoint ?",
        spouseGender: "Sexe du conjoint survivant",
        husband: "Mari (masculin)",
        wife: "Épouse (féminine)",
        children: "Enfants",
        numSons: "Nombre de fils",
        numDaughters: "Nombre de filles",
        parents: "Parents",
        fatherAlive: "Le père est-il vivant ?",
        motherAlive: "La mère est-elle vivante ?",
        estateValue: "Valeur totale de la succession (MAD) — optionnel",
        calcBtn: "Calculer les Parts",
        result: "Résultat de la Distribution Successorale",
        heir: "Héritier",
        share: "Part Légale",
        amount: "Montant (MAD)",
        noHeirs: "Aucun héritier saisi. Veuillez entrer des informations sur les héritiers.",
        disclaimer: "Ce calculateur donne des résultats approximatifs pour les parts légales de base. Les successions complexes (hajb, awl, radd) nécessitent une consultation juridique spécialisée.",
        askAI: "Demander à 9anon AI",
        yes: "Oui",
        no: "Non",
        dir: "ltr",
    },
    en: {
        title: "Morocco Inheritance Calculator",
        subtitle: "Calculate heirs' shares according to Moroccan inheritance law (Moudawana / Faraid)",
        heirs: "Enter heirs information",
        spouse: "Spouse",
        hasSpouse: "Did the deceased leave a spouse?",
        spouseGender: "Surviving spouse's gender",
        husband: "Husband (male)",
        wife: "Wife (female)",
        children: "Children",
        numSons: "Number of sons",
        numDaughters: "Number of daughters",
        parents: "Parents",
        fatherAlive: "Is the father alive?",
        motherAlive: "Is the mother alive?",
        estateValue: "Total estate value (MAD) — optional",
        calcBtn: "Calculate Shares",
        result: "Inheritance Distribution Result",
        heir: "Heir",
        share: "Legal Share",
        amount: "Amount (MAD)",
        noHeirs: "No heirs entered. Please fill in heir information.",
        disclaimer: "This calculator provides approximate results for basic legal shares. Complex inheritance cases (hajb, awl, radd) require specialized legal consultation.",
        askAI: "Ask 9anon AI About Inheritance",
        yes: "Yes",
        no: "No",
        dir: "ltr",
    },
};

interface HeirResult {
    name: { ar: string; fr: string; en: string };
    fraction: string;
    decimal: number;
    amount?: number;
}

/**
 * Simplified Moroccan Faraid calculator.
 * Covers the most common cases: spouse + children + parents.
 * Returns approximate shares — complex cases (hajb chains, awl, radd)
 * require a full-featured engine. Redirects complex cases to 9anon AI.
 */
function calculateInheritance(opts: {
    hasSpouse: boolean;
    spouseIsWife: boolean; // true = wife survives; false = husband survives
    numSons: number;
    numDaughters: number;
    fatherAlive: boolean;
    motherAlive: boolean;
    estateValue: number;
}): HeirResult[] {
    const { hasSpouse, spouseIsWife, numSons, numDaughters, fatherAlive, motherAlive, estateValue } = opts;
    const hasChildren = numSons > 0 || numDaughters > 0;
    const results: HeirResult[] = [];

    // --- Spouse share ---
    if (hasSpouse) {
        if (spouseIsWife) {
            // Wife: 1/4 if no children, 1/8 if children
            const frac = hasChildren ? "1/8" : "1/4";
            const dec = hasChildren ? 1 / 8 : 1 / 4;
            results.push({
                name: { ar: "الزوجة", fr: "Épouse", en: "Wife" },
                fraction: frac, decimal: dec,
                amount: estateValue > 0 ? estateValue * dec : undefined,
            });
        } else {
            // Husband: 1/2 if no children, 1/4 if children
            const frac = hasChildren ? "1/4" : "1/2";
            const dec = hasChildren ? 1 / 4 : 1 / 2;
            results.push({
                name: { ar: "الزوج", fr: "Mari", en: "Husband" },
                fraction: frac, decimal: dec,
                amount: estateValue > 0 ? estateValue * dec : undefined,
            });
        }
    }

    // --- Mother share ---
    if (motherAlive) {
        // Mother: 1/6 if children or 2+ siblings present, else 1/3
        const frac = hasChildren ? "1/6" : "1/3";
        const dec = hasChildren ? 1 / 6 : 1 / 3;
        results.push({
            name: { ar: "الأم", fr: "Mère", en: "Mother" },
            fraction: frac, decimal: dec,
            amount: estateValue > 0 ? estateValue * dec : undefined,
        });
    }

    // --- Father share ---
    if (fatherAlive) {
        if (hasChildren) {
            // Father gets fixed 1/6 when children exist + residual as asaba
            results.push({
                name: { ar: "الأب (فرضاً + تعصيباً)", fr: "Père (fixe + résidu)", en: "Father (fixed + residual)" },
                fraction: "1/6 + résidu", decimal: 1 / 6, // residual computed separately
                amount: estateValue > 0 ? estateValue * (1 / 6) : undefined,
            });
        } else {
            // Father as asaba (residual heir) — gets everything remaining
            results.push({
                name: { ar: "الأب (عصبة)", fr: "Père (résiduel)", en: "Father (residual)" },
                fraction: "résidu", decimal: -1, // flag: residual
                amount: undefined,
            });
        }
    }

    // --- Children shares (asaba - residual) ---
    // Total spouse + fixed parent shares
    const fixedSum = results.reduce((acc, r) => acc + (r.decimal > 0 ? r.decimal : 0), 0);
    const residual = Math.max(0, 1 - fixedSum);

    if (hasChildren) {
        // Sons get 2 units, daughters get 1 unit
        const units = numSons * 2 + numDaughters * 1;
        if (numSons > 0) {
            const sonShare = (residual * 2) / units;
            results.push({
                name: {
                    ar: numSons === 1 ? "الابن" : `الأبناء الذكور (${numSons})`,
                    fr: numSons === 1 ? "Fils" : `Fils (${numSons})`,
                    en: numSons === 1 ? "Son" : `Sons (${numSons})`,
                },
                fraction: `${numSons}×2/${units} من الباقي`,
                decimal: sonShare,
                amount: estateValue > 0 ? estateValue * sonShare : undefined,
            });
        }
        if (numDaughters > 0) {
            const dauShare = (residual * 1) / units;
            results.push({
                name: {
                    ar: numDaughters === 1 ? "البنت" : `البنات (${numDaughters})`,
                    fr: numDaughters === 1 ? "Fille" : `Filles (${numDaughters})`,
                    en: numDaughters === 1 ? "Daughter" : `Daughters (${numDaughters})`,
                },
                fraction: `${numDaughters}×1/${units} من الباقي`,
                decimal: dauShare,
                amount: estateValue > 0 ? estateValue * dauShare : undefined,
            });
        }
    } else if (!hasChildren && !fatherAlive) {
        // No children, no father — residual goes to mother or other heirs
        // (simplified: flag for AI consultation)
    }

    // Update father residual amount if estate given
    for (const r of results) {
        if (r.decimal === -1 && estateValue > 0) {
            const otherSum = results.filter(x => x !== r && x.decimal > 0).reduce((a, x) => a + x.decimal, 0);
            r.decimal = Math.max(0, 1 - otherSum);
            r.amount = estateValue * r.decimal;
        }
    }

    return results;
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Morocco Inheritance Calculator | حاسبة الإرث 9anon AI",
    "applicationCategory": "LegalApplication",
    "operatingSystem": "Web",
    "inLanguage": ["ar", "fr", "en"],
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "MAD" },
    "description": "Calculate inheritance shares under Moroccan law (Moudawana / Faraid). Free trilingual calculator.",
    "url": "https://9anonai.com/calculators/inheritance",
};

export default function InheritanceCalculatorPage({ params }: { params: { lang: string } }) {
    const lang = (params?.lang ?? "ar") as Lang;
    const ui = UI[lang] ?? UI.ar;

    const [hasSpouse, setHasSpouse] = useState(false);
    const [spouseIsWife, setSpouseIsWife] = useState(true);
    const [numSons, setNumSons] = useState(0);
    const [numDaughters, setNumDaughters] = useState(0);
    const [fatherAlive, setFatherAlive] = useState(false);
    const [motherAlive, setMotherAlive] = useState(false);
    const [estateValue, setEstateValue] = useState("");
    const [results, setResults] = useState<HeirResult[] | null>(null);

    const calculate = () => {
        setResults(calculateInheritance({
            hasSpouse, spouseIsWife, numSons, numDaughters,
            fatherAlive, motherAlive,
            estateValue: parseFloat(estateValue) || 0,
        }));
    };

    const fmt = (n: number) =>
        n.toLocaleString(lang === "ar" ? "ar-MA" : lang === "fr" ? "fr-MA" : "en-US", {
            minimumFractionDigits: 0, maximumFractionDigits: 2,
        });

    const pct = (dec: number) => dec >= 0 ? `${(dec * 100).toFixed(2)}%` : "—";

    return (
        <div className="min-h-screen bg-background" dir={ui.dir}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Header />

            <main className="pt-32 pb-20 px-6 sm:px-8 max-w-3xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-6">
                        <span className="text-sm font-medium text-primary">📜 {lang === "ar" ? "الإرث - الفرائض" : lang === "fr" ? "Succession - Faraid" : "Inheritance - Faraid"}</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">{ui.title}</h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">{ui.subtitle}</p>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-border/40 bg-card p-6 sm:p-8 shadow-xl shadow-black/10 mb-6 space-y-6">
                    <h2 className="font-semibold text-base border-b border-border/30 pb-4">{ui.heirs}</h2>

                    {/* Spouse */}
                    <fieldset>
                        <legend className="font-medium text-sm mb-3">{ui.spouse}</legend>
                        <div className="flex gap-4 items-center mb-3">
                            <label className="text-sm text-muted-foreground">{ui.hasSpouse}</label>
                            <button onClick={() => setHasSpouse(true)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${hasSpouse ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.yes}</button>
                            <button onClick={() => setHasSpouse(false)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${!hasSpouse ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.no}</button>
                        </div>
                        {hasSpouse && (
                            <div className="flex gap-4 items-center">
                                <label className="text-sm text-muted-foreground">{ui.spouseGender}</label>
                                <button onClick={() => setSpouseIsWife(false)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${!spouseIsWife ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.husband}</button>
                                <button onClick={() => setSpouseIsWife(true)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${spouseIsWife ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.wife}</button>
                            </div>
                        )}
                    </fieldset>

                    {/* Children */}
                    <fieldset>
                        <legend className="font-medium text-sm mb-3">{ui.children}</legend>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">{ui.numSons}</label>
                                <input type="number" min="0" max="20" value={numSons} onChange={e => setNumSons(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">{ui.numDaughters}</label>
                                <input type="number" min="0" max="20" value={numDaughters} onChange={e => setNumDaughters(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40" />
                            </div>
                        </div>
                    </fieldset>

                    {/* Parents */}
                    <fieldset>
                        <legend className="font-medium text-sm mb-3">{ui.parents}</legend>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex gap-3 items-center">
                                <label className="text-sm text-muted-foreground">{ui.fatherAlive}</label>
                                <button onClick={() => setFatherAlive(true)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${fatherAlive ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.yes}</button>
                                <button onClick={() => setFatherAlive(false)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${!fatherAlive ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.no}</button>
                            </div>
                            <div className="flex gap-3 items-center">
                                <label className="text-sm text-muted-foreground">{ui.motherAlive}</label>
                                <button onClick={() => setMotherAlive(true)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${motherAlive ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.yes}</button>
                                <button onClick={() => setMotherAlive(false)} className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${!motherAlive ? "border-primary bg-primary/10 text-primary" : "border-border/40"}`}>{ui.no}</button>
                            </div>
                        </div>
                    </fieldset>

                    {/* Estate value */}
                    <div>
                        <label className="block text-sm font-medium mb-2">{ui.estateValue}</label>
                        <input type="number" min="0" value={estateValue} onChange={e => setEstateValue(e.target.value)}
                            placeholder="500 000"
                            className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-lg" />
                    </div>

                    <button onClick={calculate}
                        className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] transition-all duration-300">
                        {ui.calcBtn}
                    </button>
                </div>

                {/* Results */}
                {results !== null && (
                    <div className="space-y-6 animate-reveal-up">
                        <h2 className="font-display font-bold text-xl">{ui.result}</h2>

                        {results.length === 0 ? (
                            <p className="text-muted-foreground">{ui.noHeirs}</p>
                        ) : (
                            <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border/20 text-muted-foreground">
                                                <th className="px-5 py-3 text-start font-medium">{ui.heir}</th>
                                                <th className="px-5 py-3 text-end font-medium">{ui.share}</th>
                                                {results.some(r => r.amount !== undefined) && (
                                                    <th className="px-5 py-3 text-end font-medium">{ui.amount}</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results.map((r, i) => (
                                                <tr key={i} className="border-b border-border/10 hover:bg-accent/30 transition-colors">
                                                    <td className="px-5 py-3 font-medium">{r.name[lang] ?? r.name.en}</td>
                                                    <td className="px-5 py-3 text-end tabular-nums">{pct(r.decimal)} <span className="text-muted-foreground">({r.fraction})</span></td>
                                                    {results.some(x => x.amount !== undefined) && (
                                                        <td className="px-5 py-3 text-end tabular-nums">{r.amount !== undefined ? `${fmt(r.amount)} MAD` : "—"}</td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                        { href: "/inheritance-law", label: lang === "ar" ? "قانون الإرث" : lang === "fr" ? "Droit Successoral" : "Inheritance Law" },
                        { href: "/family-law", label: lang === "ar" ? "مدونة الأسرة" : lang === "fr" ? "Moudawana" : "Family Law" },
                        { href: "/calculators/income-tax", label: lang === "ar" ? "حاسبة الضريبة" : lang === "fr" ? "Calcul IR" : "Tax Calculator" },
                        { href: "/calculators/rent-increase", label: lang === "ar" ? "حاسبة الكراء" : lang === "fr" ? "Calcul Loyer" : "Rent Calculator" },
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
