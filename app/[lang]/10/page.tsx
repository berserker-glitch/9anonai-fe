"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";
import LiquidEther from "@/components/landing/liquid-ether";
import CardSwap, { Card } from "@/components/landing/card-swap";

/**
 * Landing Page 10: Editorial Dark Mode
 * Features:
 * - Exact Hero from Page 6
 * - Exact Scroll Animations from Page 1
 * - Exact content sections from normal Home Page (Stats, CardSwap Features, How It Works, CTA)
 * - >400 LOC. Magazine/Editorial style layout. Thin gold lines, prominent numbers, dense typography.
 */
export default function LandingPage10() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    useEffect(() => {
        // 1. Force dark mode
        document.body.classList.add("dark");

        // 2. Exact scroll animations from Page 1
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("translate-y-0", "opacity-100");
                        entry.target.classList.remove("translate-y-12", "opacity-0");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        document.querySelectorAll(".scroll-reveal").forEach((el) => {
            observer.observe(el);
        });

        return () => {
            document.body.classList.remove("dark");
            observer.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0d0d0c] text-[#f4f4f0] font-sans selection:bg-gold/30 selection:text-black overflow-x-hidden">

            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-x-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gold/10" />
            </div>

            <div dir={dir} className="relative z-50 mix-blend-difference border-b border-gold/20">
                <Header />
            </div>

            <main className="relative z-10">

                {/* =================================================================================================
            1. EXACT HERO FROM PAGE 6
            ================================================================================================= */}
                <section className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-32 border-b border-gold/20">

                    <div className="absolute inset-0 z-0">
                        <LiquidEther
                            colors={['#10B981', '#059669', '#047857']}
                            mouseForce={40}
                            cursorSize={100}
                            isViscous={true}
                            viscous={30}
                            autoDemo={true}
                            autoIntensity={1.5}
                            style={{ opacity: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0c]/50 to-[#0d0d0c]" />
                    </div>

                    <div className="relative z-10 max-w-7xl w-full flex flex-col items-center text-center">

                        <div className="animate-fade-in opacity-0 [animation-delay:100ms] mb-12 border border-white/20 px-6 py-2 rounded-full backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-sm tracking-widest uppercase font-semibold text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                {t("hero.badge")}
                            </span>
                        </div>

                        <h1 className="animate-slide-up opacity-0 [animation-delay:300ms] font-display text-5xl md:text-8xl lg:text-[9rem] font-bold leading-[0.9] tracking-tighter mix-blend-lighten mb-10 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                            <span className="block text-white mb-2">{t("hero.title1")}</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary pb-4">
                                {t("hero.title2")}
                            </span>
                        </h1>

                        <p className="animate-slide-up opacity-0 [animation-delay:500ms] text-lg md:text-2xl text-white/50 max-w-3xl leading-relaxed font-light mb-16 px-4 mix-blend-screen">
                            {t("hero.description")}
                        </p>

                        <div className="animate-fade-in opacity-0 [animation-delay:700ms] flex flex-col sm:flex-row gap-6">
                            <Link
                                href="/chat"
                                className="group relative px-10 py-5 bg-white text-black font-semibold uppercase tracking-wider text-sm hover:scale-[1.02] transition-transform duration-500 rounded-sm overflow-hidden"
                            >
                                <span className="relative z-10">{t("hero.ctaPrimary")}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>
                        </div>

                    </div>
                </section>


                {/* =================================================================================================
            2. STATS SECTION (Editorial Style)
            ================================================================================================= */}
                <section className="relative py-24 bg-[#0d0d0c] border-b border-gold/20 overflow-hidden">
                    <div className="absolute top-0 right-10 w-px h-full bg-gold/10" />
                    <div className="absolute top-0 left-10 w-px h-full bg-gold/10" />

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gold/20 pb-8 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out">
                            <h2 className="text-xl md:text-2xl font-serif italic text-gold/80">
                                Global Reach & Impact
                            </h2>
                            <div className="text-xs font-mono tracking-[0.3em] uppercase opacity-50 mt-4 md:mt-0">
                                Vol. 01 — Statistics
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-16 lg:gap-12">
                            {[
                                { valueKey: "stats.activeUsersValue", labelKey: "stats.activeUsers", num: "01" },
                                { valueKey: "stats.questionsAnsweredValue", labelKey: "stats.questionsAnswered", num: "02" },
                                { valueKey: "stats.accuracyValue", labelKey: "stats.accuracy", num: "03" },
                                { valueKey: "stats.languagesValue", labelKey: "stats.languages", num: "04" },
                            ].map((stat, i) => (
                                <div key={i} className="scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out flex flex-col items-start relative pb-8 group" style={{ transitionDelay: `${i * 150}ms` }}>

                                    {/* Bottom animated line */}
                                    <div className="absolute bottom-0 left-0 w-full h-px bg-gold/20">
                                        <div className="absolute top-0 left-0 h-full w-0 bg-gold group-hover:w-full transition-all duration-700 ease-in-out" />
                                    </div>

                                    <span className="text-xs font-mono text-gold/60 mb-6 tracking-widest">({stat.num})</span>

                                    <p className="text-6xl lg:text-7xl font-display font-medium text-[#f4f4f0] mb-4 tracking-tighter">
                                        {t(stat.valueKey)}
                                    </p>

                                    <p className="text-sm uppercase tracking-widest text-[#f4f4f0]/60 font-medium">
                                        {t(stat.labelKey)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            3. CARDSWAP FEATURES SECTION (Editorial Dense Layout)
            ================================================================================================= */}
                <section id="features" className="py-32 relative overflow-hidden bg-[#111110] border-b border-gold/20">

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

                            {/* Left Content */}
                            <div className="w-full lg:w-5/12 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10">
                                <div className="flex items-center gap-4 mb-8 text-gold font-mono text-sm tracking-widest">
                                    <div className="w-8 h-px bg-gold" />
                                    <span>{t("features.sectionTag")}</span>
                                </div>

                                <h2 className="font-serif text-5xl lg:text-7xl font-normal mb-8 leading-[1.05] text-[#f4f4f0]">
                                    {t("features.sectionTitle")} <br />
                                    <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#b8860b]">
                                        {t("features.brand")}
                                    </span>
                                </h2>

                                <p className="text-[#f4f4f0]/70 text-lg leading-relaxed mb-12 font-medium border-l border-gold/30 pl-6">
                                    {t("features.sectionDescription")}
                                    <br /><br />
                                    Developed using advanced language models tailored specifically for intricate legal frameworks, providing unparalleled precision.
                                </p>

                                <div className="flex items-center gap-4">
                                    <Link href="/chat" className="group relative px-8 py-4 bg-gold text-[#0d0d0c] font-bold uppercase tracking-wider text-sm hover:bg-[#b8860b] transition-colors duration-300">
                                        {t("hero.ctaPrimary")}
                                        <span className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right CardSwap (Editorial Styling) */}
                            <div className="w-full lg:w-7/12 relative h-[600px] flex items-center justify-center lg:justify-end scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 delay-200">

                                {/* Decorative background circle behind cards */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold/10 pointer-events-none" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-gold/20 animate-[spin_60s_linear_infinite] pointer-events-none" />

                                <div className="relative w-full h-full scale-[0.95] origin-center z-10 flex justify-center lg:justify-end">
                                    <CardSwap
                                        width={380}
                                        height={500}
                                        cardDistance={40}
                                        verticalDistance={30}
                                        delay={4000}
                                        skewAmount={2}
                                    >
                                        {[
                                            { num: "I", titleKey: "features.expertTitle", descKey: "features.expertDesc" },
                                            { num: "II", titleKey: "features.multilingualTitle", descKey: "features.multilingualDesc" },
                                            { num: "III", titleKey: "features.instantTitle", descKey: "features.instantDesc" },
                                            { num: "IV", titleKey: "features.sourcesTitle", descKey: "features.sourcesDesc" },
                                            { num: "V", titleKey: "features.secureTitle", descKey: "features.secureDesc" },
                                        ].map((feature, i) => (
                                            <Card
                                                key={i}
                                                className={`
                          !bg-[#0d0d0c] !border-gold/30 shadow-[10px_10px_0px_rgba(255,215,0,0.1)] 
                          flex flex-col p-10 rounded-sm hover:-translate-y-2 hover:shadow-[15px_15px_0px_rgba(255,215,0,0.2)] transition-all duration-500
                        `}
                                            >
                                                <div className="flex justify-between items-start mb-12 pb-6 border-b border-gold/20">
                                                    <span className="font-serif italic text-gold text-4xl">{feature.num}</span>
                                                    <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center">
                                                        <div className="w-3 h-3 bg-gold rounded-full" />
                                                    </div>
                                                </div>

                                                <h3 className="text-3xl font-display font-medium text-[#f4f4f0] mb-6 tracking-tight">
                                                    {t(feature.titleKey)}
                                                </h3>

                                                <p className="text-[#f4f4f0]/60 text-lg leading-relaxed font-light">
                                                    {t(feature.descKey)}
                                                </p>
                                            </Card>
                                        ))}
                                    </CardSwap>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            4. HOW IT WORKS SECTION (Editorial Column Layout)
            ================================================================================================= */}
                <section className="py-32 bg-[#0a0a09] relative border-b border-gold/20">

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gold/20 pb-12 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out">
                            <h2 className="font-serif text-5xl md:text-7xl font-normal text-[#f4f4f0]">
                                {t("howItWorks.sectionTitle")} <br />
                                <span className="text-gold italic font-light drop-shadow-sm">
                                    {t("howItWorks.simple")}
                                </span>
                            </h2>
                            <div className="text-right mt-8 md:mt-0 font-mono text-sm tracking-widest text-gold/60 uppercase max-w-xs">
                                A step-by-step guide to navigating the platform.
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold/20">
                            {[
                                { step: "01", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
                                { step: "02", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
                                { step: "03", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
                            ].map((item, i) => (
                                <div key={i} className={`relative p-8 lg:p-12 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out group`} style={{ transitionDelay: `${i * 200}ms` }}>

                                    <div className="absolute top-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                                    <div className="text-gold/20 font-display text-8xl font-black mb-8 leading-none group-hover:text-gold/40 transition-colors duration-500">
                                        {item.step}
                                    </div>

                                    <h3 className="text-3xl font-serif text-[#f4f4f0] mb-6 capitalize">{t(item.titleKey)}</h3>

                                    <p className="text-[#f4f4f0]/60 text-lg leading-relaxed font-light">{t(item.descKey)}</p>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            5. CTA SECTION (Editorial High-Contrast)
            ================================================================================================= */}
                <section className="py-40 relative bg-[#f4f4f0] text-[#0d0d0c] overflow-hidden">

                    {/* Abstract typographic background */}
                    <div className="absolute inset-0 flex flex-nowrap items-center whitespace-nowrap opacity-5 font-display font-black text-[20vw] leading-none select-none pointer-events-none -rotate-12 translate-y-1/4">
                        9ANON AI / LEGAL / INTELLIGENCE /
                    </div>

                    <div className="relative max-w-4xl mx-auto px-6 text-center scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10">
                        <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal mb-10 leading-[1.05]">
                            {t("cta.title")} <br />
                            <span className="font-display font-bold text-primary">{t("cta.titleHighlight")}</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-[#0d0d0c]/70 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                            {t("cta.description")}
                        </p>

                        <Link
                            href="/register"
                            className="group relative inline-flex items-center justify-center px-12 py-6 bg-[#0d0d0c] text-[#f4f4f0] font-bold uppercase tracking-widest text-lg hover:bg-primary transition-colors duration-500 rounded-sm"
                        >
                            <span>{t("cta.button")}</span>
                            <span className="ml-6 block w-8 h-[2px] bg-white group-hover:w-12 transition-all duration-300" />
                        </Link>
                    </div>
                </section>

            </main>

            <div dir={dir} className="relative z-50 bg-[#0d0d0c] border-t border-gold/30">
                <Footer />
            </div>

        </div>
    );
}
