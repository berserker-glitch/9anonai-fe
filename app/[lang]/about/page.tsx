"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";

export default function AboutPage() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    // GSAP-like Scroll Reveal using simple Intersection Observer to match existing site behavior
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-scroll-reveal');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.scroll-animate').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/20">
            <div dir={dir}>
                <Header />
            </div>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
                {/* Immersive Background */}
                <div className="absolute inset-0 bg-dots opacity-[0.15]" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full blur-[150px] opacity-70 animate-pulse-gentle" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gold/10 via-gold/5 to-transparent rounded-full blur-[150px] opacity-50 animate-morph" />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <div className="animate-reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-emerald mb-8 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-sm font-medium text-gradient-emerald">Our Mission</span>
                    </div>

                    <h1 className="animate-reveal-up delay-100 font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
                        <span className="block text-foreground drop-shadow-sm">
                            {t("aboutUs.title")}
                        </span>
                        <span className="block text-gradient-gold drop-shadow-glow">
                            {t("aboutUs.titleHighlight")}
                        </span>
                    </h1>

                    <p className="animate-reveal-up delay-200 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                        {t("aboutUs.subtitle")}
                    </p>
                </div>
            </section>

            {/* PHILOSOPHY (Problem vs Solution) */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="mb-16 text-center scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                        <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
                            {t("aboutUs.philosophyTag")}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* The Old Way */}
                        <div className="glass-premium rounded-[2.5rem] p-10 sm:p-12 border border-border/40 relative overflow-hidden group scroll-animate opacity-0 transform translate-y-8 transition-all duration-700 delay-100">
                            <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-8 border border-destructive/20">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-display font-semibold mb-4 text-foreground/80 group-hover:text-destructive transition-colors">
                                    {t("aboutUs.philosophyOld")}
                                </h3>
                                <p className="text-xl text-muted-foreground leading-relaxed flex-grow">
                                    {t("aboutUs.philosophyOldDesc")}
                                </p>
                            </div>
                        </div>

                        {/* The 9anon Way */}
                        <div className="glass-premium rounded-[2.5rem] p-10 sm:p-12 border-glow-emerald relative overflow-hidden group scroll-animate opacity-0 transform translate-y-8 transition-all duration-700 delay-200">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-700" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-4 text-gradient-emerald">
                                    {t("aboutUs.philosophyNew")}
                                </h3>
                                <p className="text-xl text-foreground/90 leading-relaxed font-medium flex-grow">
                                    {t("aboutUs.philosophyNewDesc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE ENGINE (Tech Stack) */}
            <section className="py-24 lg:py-32 relative border-y border-white/5 overflow-hidden" style={{ background: '#0D1117' }}>
                <div className="absolute inset-0 bg-zellige opacity-[0.03]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-gold/5 rounded-full blur-[200px] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20">
                                {t("aboutUs.techTag")}
                            </span>
                            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
                                {t("aboutUs.techTitle")}
                            </h2>
                            <p className="text-[#8b949e] text-xl leading-relaxed mb-10">
                                {t("aboutUs.techDesc")}
                            </p>

                            <div className="space-y-8">
                                {[
                                    { titleKey: "aboutUs.techFeature1", descKey: "aboutUs.techFeature1Desc", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
                                    { titleKey: "aboutUs.techFeature2", descKey: "aboutUs.techFeature2Desc", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
                                    { titleKey: "aboutUs.techFeature3", descKey: "aboutUs.techFeature3Desc", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-5 group">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:text-primary transition-all duration-300 text-white/50">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                                                {t(feature.titleKey)}
                                            </h4>
                                            <p className="text-[#8b949e]">
                                                {t(feature.descKey)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Data Node Visualization (CSS only) */}
                        <div className="relative aspect-square w-full max-w-md mx-auto scroll-animate opacity-0 transform scale-95 transition-all duration-1000 delay-300">
                            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_60s_linear_infinite]" />
                            <div className="absolute inset-4 rounded-full border border-gold/10 animate-[spin_40s_linear_infinite_reverse]" />
                            <div className="absolute inset-12 rounded-full border border-primary/30 animate-[spin_20s_linear_infinite] border-dashed" />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-gold/80 p-[1px] shadow-2xl shadow-primary/40 animate-pulse-gentle">
                                    <div className="w-full h-full rounded-full bg-[#0D1117] flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/20 animate-morph" />
                                        <span className="text-3xl font-display font-bold text-white relative z-10">9anon</span>
                                    </div>
                                </div>
                            </div>

                            {/* Orbiting nodes */}
                            {[0, 72, 144, 216, 288].map((deg, i) => (
                                <div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-primary shadow-[0_0_15px_var(--primary)]"
                                    style={{
                                        transform: `rotate(${deg}deg) translateX(14rem) rotate(-${deg}deg)`,
                                        animation: `spin 20s linear infinite`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST SIGNAL STATS */}
            <section className="py-16 md:py-24 border-b border-border/30 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/30 text-center">
                        {[
                            { value: "statsAccuracy", label: "statsAccuracyLabel" },
                            { value: "statsLatency", label: "statsLatencyLabel" },
                            { value: "statsSources", label: "statsSourcesLabel" },
                            { value: "statsUptime", label: "statsUptimeLabel" },
                        ].map((stat, i) => (
                            <div key={i} className="scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                                <p className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-3 drop-shadow-sm">
                                    {t(`aboutUs.${stat.value}`)}
                                </p>
                                <p className="text-sm md:text-base text-muted-foreground tracking-wider font-semibold">
                                    {t(`aboutUs.${stat.label}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 lg:py-32 relative text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
                <div className="relative z-10 scroll-animate opacity-0 transform scale-95 transition-all duration-700">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                        {t("cta.title")} <span className="block text-gradient-emerald mt-2">{t("cta.titleHighlight")}</span>
                    </h2>
                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 btn-premium px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-gold/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all duration-300"
                    >
                        <span>{t("cta.button")}</span>
                    </Link>
                </div>
            </section>

            <div dir={dir}>
                <Footer />
            </div>
        </div>
    );
}
