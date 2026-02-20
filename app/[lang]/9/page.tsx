"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";
import LiquidEther from "@/components/landing/liquid-ether";
import CardSwap, { Card } from "@/components/landing/card-swap";

/**
 * Landing Page 9: Cyber-Organic Theme
 * Features:
 * - Exact Hero from Page 6
 * - Exact Scroll Animations from Page 1
 * - Exact content sections from normal Home Page (Stats, CardSwap Features, How It Works, CTA)
 * - >400 LOC, aggressive styling, deep glowing colors.
 */
export default function LandingPage9() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    useEffect(() => {
        // 1. Force dark mode context for this page
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
        <div className="min-h-screen bg-[#020403] text-white font-sans selection:bg-primary/20 overflow-x-hidden">

            <div dir={dir} className="relative z-50 mix-blend-difference">
                <Header />
            </div>

            <main className="relative z-10">

                {/* =================================================================================================
            1. EXACT HERO FROM PAGE 6
            ================================================================================================= */}
                <section className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-32 border-b border-primary/20">

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
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020403]/50 to-[#020403]" />
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
            2. STATS SECTION (From Normal Page, restyled heavily with Cyber-Organic theme & Page 1 scrolls)
            ================================================================================================= */}
                <section className="relative py-24 bg-[#020403] overflow-hidden">
                    {/* Cyber wireframe overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                            {[
                                { valueKey: "stats.activeUsersValue", labelKey: "stats.activeUsers" },
                                { valueKey: "stats.questionsAnsweredValue", labelKey: "stats.questionsAnswered" },
                                { valueKey: "stats.accuracyValue", labelKey: "stats.accuracy" },
                                { valueKey: "stats.languagesValue", labelKey: "stats.languages" },
                            ].map((stat, i) => (
                                <div key={i} className="scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out text-center group relative p-6">
                                    {/* Cyber glowing orb behind text */}
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-3xl blur-xl transition-colors duration-500" />
                                    <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500 blur-sm" />

                                    <div className="relative z-10">
                                        <p className="text-5xl lg:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-300">
                                            {t(stat.valueKey)}
                                        </p>
                                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/60 group-hover:text-primary transition-colors duration-300">
                                            {t(stat.labelKey)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            3. CARDSWAP FEATURES SECTION (From Normal Page, restyled heavily)
            ================================================================================================= */}
                <section id="features" className="py-32 relative overflow-hidden bg-[#0A140F]">
                    {/* Cyber glowing borders */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    <div className="absolute left-0 top-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                            <div className="scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10">
                                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-md">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-primary font-mono text-sm uppercase tracking-widest">{t("features.sectionTag")}</span>
                                </div>

                                <h2 className="font-display text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] text-white">
                                    {t("features.sectionTitle")} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                                        {t("features.brand")}
                                    </span>
                                </h2>

                                <p className="text-white/60 text-xl leading-relaxed mb-12 max-w-lg font-light">
                                    {t("features.sectionDescription")}
                                </p>

                                <div className="flex flex-wrap gap-6">
                                    <button className="relative px-8 py-4 bg-transparent border border-primary/50 text-white font-mono uppercase tracking-widest text-sm hover:bg-primary/10 transition-colors duration-300 overflow-hidden group">
                                        <span className="relative z-10">{t("hero.ctaPrimary")}</span>
                                        <div className="absolute inset-0 bg-primary/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    </button>
                                </div>
                            </div>

                            <div className="relative h-[600px] w-full flex items-center justify-center lg:justify-end scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 delay-200">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-[80px]" />

                                <div className="relative w-full h-full scale-[1.05] origin-center z-10">
                                    <CardSwap
                                        width={400}
                                        height={520}
                                        cardDistance={45}
                                        verticalDistance={45}
                                        delay={3500}
                                        skewAmount={3}
                                    >
                                        {[
                                            { icon: "⚡", titleKey: "features.expertTitle", descKey: "features.expertDesc" },
                                            { icon: "🌐", titleKey: "features.multilingualTitle", descKey: "features.multilingualDesc" },
                                            { icon: "💬", titleKey: "features.instantTitle", descKey: "features.instantDesc" },
                                            { icon: "📚", titleKey: "features.sourcesTitle", descKey: "features.sourcesDesc" },
                                            { icon: "🔒", titleKey: "features.secureTitle", descKey: "features.secureDesc" },
                                        ].map((feature, i) => (
                                            <Card
                                                key={i}
                                                className={`
                          !bg-[#020403]/90 !backdrop-blur-3xl !border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                          flex flex-col items-center justify-center p-10 text-center rounded-[2rem]
                          group hover:!border-primary/50 transition-colors duration-500 overflow-hidden
                        `}
                                            >
                                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/40 transition-colors duration-700 pointer-events-none" />
                                                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none" />

                                                <div className="w-24 h-24 mb-10 flex items-center justify-center relative">
                                                    {/* Organic morphing background for icon */}
                                                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-morph" />
                                                    <div className="relative z-10 text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">{feature.icon}</div>
                                                </div>

                                                <h3 className="text-3xl font-display font-medium text-white mb-6 tracking-tight group-hover:text-primary transition-colors">
                                                    {t(feature.titleKey)}
                                                </h3>

                                                <p className="text-white/50 text-lg leading-relaxed max-w-[90%] font-light">
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
            4. HOW IT WORKS SECTION (From Normal Page, restyled heavily)
            ================================================================================================= */}
                <section className="py-32 bg-[#020403] relative border-b border-primary/20">
                    <div className="absolute right-0 top-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="text-center mb-24 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out">
                            <h2 className="font-display text-5xl md:text-7xl font-black text-white mb-6">
                                {t("howItWorks.sectionTitle")} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-700 italic font-light drop-shadow-sm">
                                    {t("howItWorks.simple")}
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                            {[
                                { step: "01", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
                                { step: "02", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
                                { step: "03", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
                            ].map((item, i) => (
                                <div key={i} className={`relative scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out`} style={{ transitionDelay: `${i * 200}ms` }}>

                                    {/* Connecting line between steps */}
                                    {i < 2 && (
                                        <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0 overflow-hidden">
                                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                                        </div>
                                    )}

                                    <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-start group">
                                        <div className="w-24 h-24 rounded-full border border-primary/30 bg-[#0A140F] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-all duration-500 overflow-hidden relative">
                                            {/* Inner organic blur */}
                                            <div className="absolute inset-0 bg-primary/20 blur-xl scale-50 group-hover:scale-150 transition-transform duration-700" />
                                            <span className="font-mono text-3xl font-bold text-white relative z-10">{item.step}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide group-hover:text-primary transition-colors">{t(item.titleKey)}</h3>
                                        <p className="text-white/50 text-lg leading-relaxed font-light">{t(item.descKey)}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            5. CTA SECTION (From Normal Page, restyled heavily)
            ================================================================================================= */}
                <section className="py-40 relative overflow-hidden bg-[#0A140F]">
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-1/2 left-1/2 w-full max-w-4xl aspect-square bg-gradient-to-tr from-primary/20 to-emerald-800/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse-gentle mix-blend-screen pointer-events-none" />

                    <div className="relative max-w-4xl mx-auto px-6 text-center scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10">
                        <h2 className="font-display text-5xl sm:text-7xl font-black text-white mb-10 leading-[1.1]">
                            {t("cta.title")}
                            <span className="block text-primary mt-2">{t("cta.titleHighlight")}</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                            {t("cta.description")}
                        </p>

                        <Link
                            href="/register"
                            className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden rounded-full border border-white/20 bg-[#020403] hover:border-primary/50 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_60px_rgba(16,185,129,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 text-white font-mono uppercase tracking-widest text-lg flex items-center gap-4">
                                {t("cta.button")}
                                <svg className="w-5 h-5 rtl:rotate-180 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </section>

            </main>

            <div dir={dir} className="relative z-50 bg-[#020403] border-t border-white/10">
                <Footer />
            </div>

        </div>
    );
}
