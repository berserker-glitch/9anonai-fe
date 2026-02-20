"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";
import LiquidEther from "@/components/landing/liquid-ether";
import CardSwap, { Card } from "@/components/landing/card-swap";

/**
 * Landing Page 9: Cyber-Organic Theme (Enhanced)
 * Features:
 * - Light and Dark Theme support (responsive to system/toggle)
 * - Exact Hero from Page 6 (restyled for readability and dual-theme)
 * - Exact Scroll Animations from Page 1
 * - Exact content sections from normal Home Page
 * - NEW: Core Technologies scrolling marquee
 * - NEW: 3D tilt hover effects on Stats cards
 */
export default function LandingPage9() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // We removed forced dark mode so it uses system/app preference

        // Scroll animations from Page 1
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
            observer.disconnect();
        };
    }, []);

    const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020403] text-slate-900 dark:text-white font-sans selection:bg-primary/20 overflow-x-hidden transition-colors duration-500">

            {/* Dynamic Parallax Background (Visible in Light Mode) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-100 dark:opacity-0 transition-opacity duration-500">
                <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-emerald-100 rounded-full blur-[120px] mix-blend-multiply animate-pulse-gentle" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-yellow-50 rounded-full blur-[150px] mix-blend-multiply" />
            </div>

            <div dir={dir} className="relative z-50 bg-white/50 dark:bg-black/20 backdrop-blur-3xl border-b border-slate-200 dark:border-white/10 transition-colors duration-500">
                <Header />
            </div>

            <main className="relative z-10">

                {/* =================================================================================================
            1. EXACT HERO FROM PAGE 6 (Enhanced for Readability & Dual Theme)
            ================================================================================================= */}
                <section className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-32 overflow-hidden border-b border-slate-200 dark:border-primary/20 transition-colors duration-500">

                    <div className="absolute inset-0 z-0">
                        <LiquidEther
                            colors={['#10B981', '#059669', '#34d399']}
                            mouseForce={50}
                            cursorSize={120}
                            isViscous={true}
                            viscous={30}
                            autoDemo={true}
                            autoIntensity={1.2}
                            style={{ opacity: 0.8 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-slate-50 dark:from-[#020403]/80 dark:via-transparent dark:to-[#020403] transition-colors duration-500" />
                    </div>

                    <div className="relative z-10 max-w-7xl w-full flex flex-col items-center text-center">

                        <div className="animate-fade-in opacity-0 [animation-delay:100ms] mb-12 border border-slate-300 dark:border-white/20 bg-white/60 dark:bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            <span className="text-sm tracking-[0.3em] font-black text-emerald-600 dark:text-primary uppercase drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                {t("hero.badge")}
                            </span>
                        </div>

                        <h1 className="animate-slide-up opacity-0 [animation-delay:300ms] font-display text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter mb-10 text-slate-900 dark:text-white drop-shadow-2xl dark:drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                            <span className="block mb-2">{t("hero.title1")}</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-500 dark:from-primary dark:via-emerald-400 dark:to-primary pb-4">
                                {t("hero.title2")}
                            </span>
                        </h1>

                        <p className="animate-slide-up opacity-0 [animation-delay:500ms] text-xl md:text-3xl text-slate-700 dark:text-white/80 max-w-4xl leading-relaxed font-medium mb-16 px-8 py-6 bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/60 dark:border-white/10 shadow-xl transition-colors duration-500">
                            {t("hero.description")}
                        </p>

                        <div className="animate-fade-in opacity-0 [animation-delay:700ms] flex flex-col sm:flex-row gap-6">
                            <Link
                                href="/chat"
                                className="group relative px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm hover:scale-105 transition-all duration-500 rounded-full shadow-2xl overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    {t("hero.ctaPrimary")}
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-primary dark:to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </Link>
                        </div>

                    </div>
                </section>


                {/* =================================================================================================
            2. NEW SECTION: Core Technologies Marquee
            ================================================================================================= */}
                <section className="py-12 bg-emerald-50 dark:bg-[#07110A] border-b border-slate-200 dark:border-primary/20 overflow-hidden flex items-center transition-colors duration-500">
                    <div className="flex gap-16 animate-marquee whitespace-nowrap opacity-60 dark:opacity-40">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-16 items-center">
                                {['Natural Language Processing', 'Neural Networks', 'Machine Learning', 'Legal Intelligence AI', 'Arabic Sentiment Analysis', 'Contextual Embeddings'].map((tech, j) => (
                                    <span key={j} className="text-2xl font-display font-bold uppercase tracking-widest text-emerald-900 dark:text-primary flex items-center gap-8">
                                        {tech}
                                        <span className="w-4 h-4 rounded-sm bg-emerald-400 rotate-45" />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>


                {/* =================================================================================================
            3. STATS SECTION (Enhanced with 3D Hover Tilt & Light/Dark)
            ================================================================================================= */}
                <section className="relative py-32 bg-slate-50 dark:bg-[#020403] overflow-hidden transition-colors duration-500">
                    {/* Cyber wireframe overlay (Adaptive) */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none transition-colors duration-500" />

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 perspective-1000">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { valueKey: "stats.activeUsersValue", labelKey: "stats.activeUsers" },
                                { valueKey: "stats.questionsAnsweredValue", labelKey: "stats.questionsAnswered" },
                                { valueKey: "stats.accuracyValue", labelKey: "stats.accuracy" },
                                { valueKey: "stats.languagesValue", labelKey: "stats.languages" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10"
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    <div
                                        onMouseMove={handleTilt}
                                        onMouseLeave={handleMouseLeave}
                                        className="relative p-10 bg-white/80 dark:bg-[#0A140F]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center text-center transition-transform duration-200 ease-out will-change-transform cursor-pointer overflow-hidden group"
                                    >
                                        {/* Hover glow */}
                                        <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10 transition-colors duration-500" />

                                        <div className="relative z-10 pointer-events-none">
                                            <p className="text-5xl lg:text-6xl xl:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-emerald-900 dark:from-white dark:to-white/40 mb-4 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                                {t(stat.valueKey)}
                                            </p>
                                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-primary/60 group-hover:text-emerald-600 dark:group-hover:text-primary transition-colors duration-300">
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
            4. CARDSWAP FEATURES SECTION (Enhanced Readability)
            ================================================================================================= */}
                <section id="features" className="py-32 relative overflow-hidden bg-white dark:bg-[#0A140F] transition-colors duration-500">

                    <div className="absolute left-0 top-1/4 w-[600px] h-[600px] bg-emerald-100/50 dark:bg-primary/10 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors duration-500" />

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                            <div className="scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10">
                                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-50 dark:bg-primary/10 border border-emerald-200 dark:border-primary/20 mb-10 shadow-sm">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-primary animate-pulse" />
                                    <span className="text-emerald-700 dark:text-primary font-bold text-sm uppercase tracking-widest">{t("features.sectionTag")}</span>
                                </div>

                                <h2 className="font-display text-5xl lg:text-7xl font-black mb-8 leading-[1.1] text-slate-900 dark:text-white">
                                    {t("features.sectionTitle")} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-600">
                                        {t("features.brand")}
                                    </span>
                                </h2>

                                <p className="text-slate-600 dark:text-white/70 text-2xl leading-relaxed mb-12 max-w-lg font-medium">
                                    {t("features.sectionDescription")}
                                </p>
                            </div>

                            <div className="relative h-[600px] lg:h-[700px] w-full flex items-center justify-center lg:justify-end scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 delay-200">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200 to-transparent dark:from-primary/20 dark:to-transparent rounded-full blur-[100px] transition-colors duration-500" />

                                <div className="relative w-full h-full scale-[1.05] origin-center z-10">
                                    <CardSwap
                                        width={420}
                                        height={550}
                                        cardDistance={50}
                                        verticalDistance={40}
                                        delay={3500}
                                        skewAmount={4}
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
                          !bg-white/90 dark:!bg-[#020403]/90 !backdrop-blur-3xl !border-slate-200 dark:!border-white/10 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] 
                          flex flex-col items-center justify-center p-12 text-center rounded-[2.5rem]
                          group hover:!border-emerald-400 dark:hover:!border-primary/50 transition-colors duration-500 overflow-hidden
                        `}
                                            >
                                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-100 dark:bg-primary/20 blur-3xl rounded-full group-hover:bg-emerald-200 dark:group-hover:bg-primary/40 transition-colors duration-700 pointer-events-none" />

                                                <div className="w-28 h-28 mb-10 flex items-center justify-center relative">
                                                    <div className="absolute inset-0 bg-emerald-100 dark:bg-primary/20 rounded-full blur-2xl animate-morph transition-colors duration-500" />
                                                    <div className="relative z-10 text-6xl drop-shadow-md">{feature.icon}</div>
                                                </div>

                                                <h3 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-6 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-primary transition-colors">
                                                    {t(feature.titleKey)}
                                                </h3>

                                                <p className="text-slate-600 dark:text-white/60 text-xl leading-relaxed max-w-[95%] font-medium">
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
            5. HOW IT WORKS SECTION (Dual Theme)
            ================================================================================================= */}
                <section className="py-40 bg-slate-50 dark:bg-[#020403] relative border-y border-slate-200 dark:border-primary/20 transition-colors duration-500">

                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="text-center mb-32 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out">
                            <h2 className="font-display text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6">
                                {t("howItWorks.sectionTitle")} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-primary dark:to-emerald-700 italic font-light">
                                    {t("howItWorks.simple")}
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">

                            {/* Connecting Line */}
                            <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-1 bg-gradient-to-r from-transparent via-emerald-200 dark:via-primary/30 to-transparent z-0 overflow-hidden rounded-full">
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-500 dark:via-white to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                            </div>

                            {[
                                { step: "01", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
                                { step: "02", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
                                { step: "03", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
                            ].map((item, i) => (
                                <div key={i} className={`relative scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10`} style={{ transitionDelay: `${i * 200}ms` }}>

                                    <div className="flex flex-col items-center text-center group">
                                        <div className="w-32 h-32 rounded-[2.5rem] border-2 border-emerald-200 dark:border-primary/30 bg-white dark:bg-[#0A140F] flex items-center justify-center mb-10 shadow-xl group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)] group-hover:-translate-y-4 transition-all duration-500 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-emerald-100 dark:bg-primary/20 blur-2xl scale-50 group-hover:scale-150 transition-transform duration-700" />
                                            <span className="font-display text-5xl font-black text-emerald-600 dark:text-white relative z-10">{item.step}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-emerald-600 dark:group-hover:text-primary transition-colors">{t(item.titleKey)}</h3>
                                        <p className="text-slate-600 dark:text-white/60 text-xl leading-relaxed font-medium">{t(item.descKey)}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* =================================================================================================
            6. CTA SECTION 
            ================================================================================================= */}
                <section className="py-40 relative overflow-hidden bg-white dark:bg-[#0A140F] transition-colors duration-500">

                    <div className="absolute top-1/2 left-1/2 w-full max-w-5xl aspect-square bg-emerald-100 dark:bg-gradient-to-tr dark:from-primary/20 dark:to-emerald-800/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 animate-pulse-gentle mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors duration-500" />

                    <div className="relative max-w-5xl mx-auto px-6 text-center scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out z-10">
                        <h2 className="font-display text-6xl sm:text-8xl font-black text-slate-900 dark:text-white mb-10 leading-[1.05]">
                            {t("cta.title")}
                            <span className="block text-emerald-600 dark:text-primary mt-4">{t("cta.titleHighlight")}</span>
                        </h2>

                        <p className="text-2xl text-slate-600 dark:text-white/60 mb-20 max-w-3xl mx-auto font-medium leading-relaxed">
                            {t("cta.description")}
                        </p>

                        <Link
                            href="/register"
                            className="group relative inline-flex items-center justify-center px-16 py-8 overflow-hidden rounded-full bg-slate-900 dark:bg-[#020403] border border-transparent dark:border-white/20 hover:border-emerald-500 transition-all duration-500 shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-primary/20 dark:via-primary/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="relative z-10 text-white font-black uppercase tracking-widest text-xl flex items-center gap-4">
                                {t("cta.button")}
                                <svg className="w-6 h-6 rtl:rotate-180 transform group-hover:translate-x-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </section>

            </main>

            <div dir={dir} className="relative z-50 bg-slate-50 dark:bg-[#020403] border-t border-slate-200 dark:border-white/10 transition-colors duration-500">
                <Footer />
            </div>

        </div>
    );
}
