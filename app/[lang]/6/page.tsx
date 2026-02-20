"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";
import LiquidEther from "@/components/landing/liquid-ether";

/**
 * Landing Page 6: Dark Minimalist with Hero Animation
 * Focus: Merges Page 2's cinematic dark mode with Page 1's oversized typography.
 * Uses LiquidEther from the normal Home Page as an interactive backdrop.
 */
export default function LandingPage6() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    useEffect(() => {
        // Force dark mode context for this page
        document.body.classList.add("dark");
        return () => document.body.classList.remove("dark");
    }, []);

    return (
        <div className="min-h-screen bg-[#020403] text-white font-sans selection:bg-primary/20 overflow-hidden">

            <div dir={dir} className="relative z-50 mix-blend-difference">
                <Header />
            </div>

            <main className="relative">

                {/* Hero Section with LiquidEther Backdrop */}
                <section className="relative min-h-screen flex items-center justify-center px-4 md:px-12 py-32">

                    <div className="absolute inset-0 z-0">
                        <LiquidEther
                            colors={['#10B981', '#059669', '#047857']} // Deep emerald shades
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

                        {/* Oversized Typography from Page 1, but with dark cinematic aesthetics */}
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

                {/* Minimal Feature Grid with Glassmorphism from Page 2 */}
                <section className="relative z-10 py-32 bg-[#020403]">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
                            <h2 className="text-4xl md:text-6xl font-display font-medium text-white/90">
                                {t("features.sectionTitle")}
                            </h2>
                            <div className="text-primary font-mono text-xl">/ 01</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 p-px rounded-[2rem] overflow-hidden">
                            {[
                                { title: "expertTitle", desc: "expertDesc", number: "01" },
                                { title: "instantTitle", desc: "instantDesc", number: "02" },
                                { title: "secureTitle", desc: "secureDesc", number: "03" },
                                { title: "sourcesTitle", desc: "sourcesDesc", number: "04" },
                            ].map((feat, i) => (
                                <div key={i} className="group relative bg-[#050B07] p-12 hover:bg-[#08120C] transition-all duration-500">
                                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <div className="text-white/20 font-mono text-sm mb-8 group-hover:text-primary/50 transition-colors">[{feat.number}]</div>
                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{t(`features.${feat.title}`)}</h3>
                                    <p className="text-white/40 leading-relaxed font-light text-lg">{t(`features.${feat.desc}`)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <div dir={dir} className="relative z-50 bg-[#020403] border-t border-white/10">
                <Footer />
            </div>

        </div>
    );
}
