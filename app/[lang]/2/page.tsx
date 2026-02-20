"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";

/**
 * Landing Page 2: Dark & Cinematic Glassmorphism
 * Focus: Deep shadows, floating orbs, glass panels, gold borders.
 */
export default function LandingPage2() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    useEffect(() => {
        // Force dark mode context for this page if possible, or build it intrinsically dark
        document.body.classList.add("dark");
        return () => document.body.classList.remove("dark");
    }, []);

    return (
        <div className="min-h-screen bg-[#050B07] text-white selection:bg-gold/30 font-sans overflow-hidden">
            <div dir={dir} className="relative z-50">
                <Header />
            </div>

            {/* Cinematic Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-primary/20 rounded-full blur-[120px] animate-orb-1" />
                <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-gold/15 rounded-full blur-[100px] animate-orb-2" />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center pt-24 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="text-left rtl:text-right">
                        <div className="inline-flex px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                            <span className="text-gold text-sm font-medium tracking-wide flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                {t("hero.badge")}
                            </span>
                        </div>

                        <h1 className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-6 animate-slide-up [animation-delay:200ms]">
                            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">{t("hero.title1")}</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]">
                                {t("hero.title2")}
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-white/60 mb-10 leading-relaxed max-w-lg animate-slide-up [animation-delay:400ms]">
                            {t("hero.description")}
                        </p>

                        <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:600ms]">
                            <Link
                                href="/chat"
                                className="px-8 py-4 rounded-xl bg-gradient-to-br from-gold/90 to-gold/70 text-black font-bold shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] hover:scale-105 transition-all duration-300"
                            >
                                {t("hero.ctaPrimary")}
                            </Link>
                            <Link
                                href="#features"
                                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium backdrop-blur-md hover:bg-white/10 transition-colors duration-300"
                            >
                                {t("hero.ctaSecondary")}
                            </Link>
                        </div>
                    </div>

                    <div className="relative animate-fade-in [animation-delay:800ms] hidden lg:block perspective-1000">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-gold/20 blur-3xl transform -skew-y-12 rotate-12" />
                        <div className="relative bg-[#0A140F]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-primary/20 transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">

                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                    <span className="text-lg">٩</span>
                                </div>
                                <div>
                                    <div className="text-white font-medium">{t("features.brand")}</div>
                                    <div className="text-white/40 text-xs">AI Assistant</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/5 rounded-xl p-4 ml-8">
                                    <p className="text-white/80 text-sm leading-relaxed" dir="rtl">{t("chat.userQuestion")}</p>
                                </div>
                                <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl p-4 mr-8 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                                    <p className="text-white/90 text-sm leading-relaxed" dir="rtl">{t("chat.aiResponse")}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* Glass Features Grid */}
            <section id="features" className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                            {t("features.sectionTitle")}
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: "⚡", title: "expertTitle", desc: "expertDesc" },
                            { icon: "🌐", title: "multilingualTitle", desc: "multilingualDesc" },
                            { icon: "💬", title: "instantTitle", desc: "instantDesc" },
                            { icon: "📚", title: "sourcesTitle", desc: "sourcesDesc" },
                            { icon: "🔒", title: "secureTitle", desc: "secureDesc" },
                            { icon: "🎁", title: "freeTitle", desc: "freeDesc" },
                        ].map((feat, i) => (
                            <div
                                key={i}
                                className="group relative bg-[#0A140F]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-8 hover:bg-[#0A140F]/80 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <div className="text-4xl mb-6 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                    {feat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{t(`features.${feat.title}`)}</h3>
                                <p className="text-white/60 text-sm leading-relaxed relative z-10">{t(`features.${feat.desc}`)}</p>

                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div dir={dir} className="relative z-50">
                <Footer />
            </div>
        </div>
    );
}
