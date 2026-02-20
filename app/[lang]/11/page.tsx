"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";
import LiquidEther from "@/components/landing/liquid-ether";
import CardSwap, { Card } from "@/components/landing/card-swap";

/**
 * Landing Page 11: Maximalist Gradient Bleed
 * Features:
 * - Exact Hero from Page 6
 * - Exact Scroll Animations from Page 1
 * - Exact content sections from normal Home Page (Stats, CardSwap Features, How It Works, CTA)
 * - >400 LOC. Extreme gradient meshes, components bleeding out of their containers, vibrant colors.
 */
export default function LandingPage11() {
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
        <div className="min-h-screen bg-[#050510] text-[#f8f9fa] font-sans selection:bg-fuchsia-500/30 overflow-x-hidden relative">

            {/* Global Maximalist Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-60">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-emerald-600 to-transparent blur-[150px] animate-pulse-gentle" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-fuchsia-700 to-transparent blur-[120px] animate-pulse-gentle" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[40%] left-[30%] w-[50vw] h-[40vw] rounded-full bg-gradient-to-r from-blue-700 via-transparent to-transparent blur-[130px] animate-morph" style={{ animationDuration: '15s' }} />
            </div>

            <div dir={dir} className="relative z-50 mix-blend-difference bg-black/10 backdrop-blur-3xl border-b border-white/5">
                <Header />
            </div>

            <main className="relative z-10">

                {/* =================================================================================================
            1. EXACT HERO FROM PAGE 6
            ================================================================================================= */}
                <section className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-32 border-b border-white/5">

                    <div className="absolute inset-0 z-0 opacity-50">
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
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050510]/60 to-[#050510]" />
                    </div>

                    <div className="relative z-10 max-w-7xl w-full flex flex-col items-center text-center">

                        <div className="animate-fade-in opacity-0 [animation-delay:100ms] mb-12 border border-white/20 px-6 py-2 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <span className="text-sm tracking-widest uppercase font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                                {t("hero.badge")}
                            </span>
                        </div>

                        <h1 className="animate-slide-up opacity-0 [animation-delay:300ms] font-display text-5xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mix-blend-lighten mb-10 drop-shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                            <span className="block text-white mb-2">{t("hero.title1")}</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-cyan-400 pb-4">
                                {t("hero.title2")}
                            </span>
                        </h1>

                        <p className="animate-slide-up opacity-0 [animation-delay:500ms] text-lg md:text-3xl font-bold bg-white/5 text-white/90 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-4xl leading-relaxed mb-16 px-4 shadow-2xl">
                            {t("hero.description")}
                        </p>

                        <div className="animate-fade-in opacity-0 [animation-delay:700ms] flex flex-col sm:flex-row gap-6">
                            <Link
                                href="/chat"
                                className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:scale-110 transition-transform duration-500 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                            >
                                <span className="relative z-10">{t("hero.ctaPrimary")}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                            </Link>
                        </div>

                    </div>
                </section>


                {/* =================================================================================================
            2. STATS SECTION (Bleeding Gradients)
            ================================================================================================= */}
                <section className="relative py-32 overflow-hidden border-b border-white/5">
                    <div className="absolute inset-0 bg-[url('/noise.svg')] mix-blend-overlay opacity-30 pointer-events-none" />

                    <div className="relative max-w-full px-4 sm:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { valueKey: "stats.activeUsersValue", labelKey: "stats.activeUsers", color: "from-emerald-500 to-teal-500" },
                                { valueKey: "stats.questionsAnsweredValue", labelKey: "stats.questionsAnswered", color: "from-fuchsia-500 to-purple-500" },
                                { valueKey: "stats.accuracyValue", labelKey: "stats.accuracy", color: "from-cyan-500 to-blue-500" },
                                { valueKey: "stats.languagesValue", labelKey: "stats.languages", color: "from-yellow-500 to-orange-500" },
                            ].map((stat, i) => (
                                <div key={i} className="scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out group">
                                    <div className={`relative w-full aspect-square bg-gradient-to-br ${stat.color} rounded-[3rem] p-10 flex flex-col justify-end overflow-hidden shadow-2xl transform hover:scale-[1.03] transition-transform duration-500`}>

                                        {/* Inner Bleed effect */}
                                        <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-white/30 rounded-full blur-[60px] group-hover:bg-white/50 transition-colors duration-500" />
                                        <div className="absolute bottom-[-20%] left-[-20%] w-[80%] h-[80%] bg-black/40 rounded-full blur-[40px]" />

                                        <div className="relative z-10 mix-blend-overlay">
                                            <p className="text-6xl lg:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-md">
                                                {t(stat.valueKey)}
                                            </p>
                                            <p className="text-xl font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">
                                                {t(stat.labelKey)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            3. CARDSWAP FEATURES SECTION (Maximalist)
            ================================================================================================= */}
                <section id="features" className="py-40 relative overflow-hidden bg-black/40 backdrop-blur-3xl border-b border-white/5">

                    <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-emerald-600/30 via-fuchsia-600/30 to-blue-600/30 blur-[150px] mix-blend-screen -translate-y-1/2 translate-x-1/4 pointer-events-none animate-[spin_20s_linear_infinite]" />

                    <div className="relative max-w-[100rem] mx-auto px-6 sm:px-12 lg:px-24">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                            <div className="lg:col-span-5 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10">
                                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse" />
                                    <span className="text-white font-bold text-sm tracking-widest uppercase">{t("features.sectionTag")}</span>
                                </div>

                                <h2 className="font-display text-6xl lg:text-8xl font-black mb-10 leading-[1] text-white">
                                    {t("features.sectionTitle")} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-fuchsia-400 to-cyan-400">
                                        {t("features.brand")}
                                    </span>
                                </h2>

                                <p className="text-white/80 text-2xl leading-relaxed mb-16 font-medium bg-gradient-to-r from-white/5 to-transparent p-8 rounded-3xl border-l-4 border-emerald-500 backdrop-blur-sm">
                                    {t("features.sectionDescription")}
                                </p>

                                <Link href="/chat" className="inline-block relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black uppercase tracking-[0.2em] text-sm hover:scale-105 hover:rotate-2 transition-transform duration-300 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                                    {t("hero.ctaPrimary")}
                                </Link>
                            </div>

                            <div className="lg:col-span-7 relative h-[700px] lg:h-[900px] w-full flex items-center justify-center scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 delay-200">

                                <div className="relative w-full h-full scale-[1.1] origin-center z-10">
                                    <CardSwap
                                        width={500}
                                        height={650}
                                        cardDistance={60}
                                        verticalDistance={50}
                                        delay={3500}
                                        skewAmount={5}
                                    >
                                        {[
                                            { icon: "⚡", titleKey: "features.expertTitle", descKey: "features.expertDesc", color: "from-emerald-900 to-[#020403]" },
                                            { icon: "🌐", titleKey: "features.multilingualTitle", descKey: "features.multilingualDesc", color: "from-fuchsia-900 to-[#020403]" },
                                            { icon: "💬", titleKey: "features.instantTitle", descKey: "features.instantDesc", color: "from-cyan-900 to-[#020403]" },
                                            { icon: "📚", titleKey: "features.sourcesTitle", descKey: "features.sourcesDesc", color: "from-blue-900 to-[#020403]" },
                                            { icon: "🔒", titleKey: "features.secureTitle", descKey: "features.secureDesc", color: "from-indigo-900 to-[#020403]" },
                                        ].map((feature, i) => (
                                            <Card
                                                key={i}
                                                className={`
                          !bg-gradient-to-br ${feature.color} !backdrop-blur-3xl !border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] 
                          flex flex-col justify-between p-12 lg:p-16 rounded-[3rem] overflow-hidden group
                        `}
                                            >
                                                <div className="absolute inset-0 bg-[url('/noise.svg')] mix-blend-overlay opacity-50" />

                                                <div className="relative z-10">
                                                    <div className="w-32 h-32 bg-white/10 rounded-[2rem] flex items-center justify-center text-7xl mb-12 shadow-inner border border-white/10 backdrop-blur-md transform group-hover:scale-110 transition-transform duration-500">
                                                        {feature.icon}
                                                    </div>

                                                    <h3 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tighter drop-shadow-lg">
                                                        {t(feature.titleKey)}
                                                    </h3>

                                                    <p className="text-white/70 text-2xl leading-relaxed font-semibold">
                                                        {t(feature.descKey)}
                                                    </p>
                                                </div>
                                            </Card>
                                        ))}
                                    </CardSwap>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            4. HOW IT WORKS SECTION (Maximalist Number Bleed)
            ================================================================================================= */}
                <section className="py-40 bg-zinc-950 relative border-b border-white/10 overflow-hidden">

                    <div className="relative max-w-[100rem] mx-auto px-6 sm:px-12 lg:px-24">
                        <div className="text-center mb-32 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out relative z-10">
                            <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-[0.8]">
                                {t("howItWorks.sectionTitle")} <br />
                                <span className="text-emerald-500">
                                    {t("howItWorks.simple")}
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {[
                                { step: "1", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
                                { step: "2", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
                                { step: "3", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
                            ].map((item, i) => (
                                <div key={i} className="relative p-12 bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out group hover:bg-white/10" style={{ transitionDelay: `${i * 150}ms` }}>

                                    {/* Massive bleeding number text */}
                                    <div className="absolute -right-10 -bottom-20 text-[20rem] font-black text-white/5 leading-none select-none pointer-events-none group-hover:text-emerald-500/10 group-hover:-translate-y-10 group-hover:-translate-x-10 transition-all duration-700 pointer-events-none">
                                        {item.step}
                                    </div>

                                    <div className="relative z-10">
                                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 text-black font-black text-4xl flex items-center justify-center rounded-[2rem] mb-12 shadow-[0_20px_40px_rgba(16,185,129,0.3)]">
                                            {item.step}
                                        </div>

                                        <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-wider">{t(item.titleKey)}</h3>

                                        <p className="text-white/60 text-xl leading-relaxed font-bold">{t(item.descKey)}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            5. CTA SECTION (Maximalist Typography)
            ================================================================================================= */}
                <section className="py-60 relative bg-emerald-600 text-black overflow-hidden flex items-center justify-center text-center">

                    {/* Abstract expanding background circles */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
                        <div className="w-[100vw] h-[100vw] rounded-full border-[10vw] border-emerald-900 animate-[ping_10s_cubic-bezier(0,0,0.2,1)_infinite]" />
                        <div className="absolute w-[80vw] h-[80vw] rounded-full border-[5vw] border-black" />
                    </div>

                    <div className="relative z-10 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out w-full px-4">
                        <h2 className="font-display text-[15vw] leading-[0.8] font-black mb-12 tracking-tighter uppercase mix-blend-overlay">
                            {t("cta.titleHighlight")}
                        </h2>

                        <Link
                            href="/register"
                            className="inline-block px-16 py-8 bg-black text-white font-black uppercase tracking-[0.3em] text-2xl hover:scale-110 hover:bg-fuchsia-600 transition-all duration-500 rounded-full shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                        >
                            {t("cta.button")}
                        </Link>
                    </div>
                </section>

            </main>

            <div dir={dir} className="relative z-50 bg-[#050510] border-t border-white/10">
                <Footer />
            </div>

        </div>
    );
}
