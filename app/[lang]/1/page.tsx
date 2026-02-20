"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";

/**
 * Landing Page 1: Minimalist & Typographic
 * Focus: High contrast, oversized typography, abundant negative space.
 */
export default function LandingPage1() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    useEffect(() => {
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

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
            <div dir={dir}>
                <Header />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="animate-fade-in opacity-0 [animation-delay:200ms] mb-6">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold border-b border-muted-foreground/30 pb-1">
                            {t("hero.badge")}
                        </span>
                    </div>

                    <h1 className="animate-slide-up opacity-0 [animation-delay:400ms] font-display text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter mix-blend-difference mb-8">
                        <span className="block text-foreground">{t("hero.title1")}</span>
                        <span className="block text-primary/80 italic pr-4 md:pr-12">{t("hero.title2")}</span>
                    </h1>

                    <p className="animate-slide-up opacity-0 [animation-delay:600ms] max-w-2xl text-lg md:text-2xl font-light text-muted-foreground/80 leading-relaxed mb-16">
                        {t("hero.description")}
                    </p>

                    <div className="animate-fade-in opacity-0 [animation-delay:800ms] flex space-x-6 rtl:space-x-reverse">
                        <Link
                            href="/chat"
                            className="relative overflow-hidden group px-8 py-4 bg-foreground text-background font-medium hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="relative z-10 flex items-center gap-2">
                                <span>{t("hero.ctaPrimary")}</span>
                                <svg className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </Link>
                    </div>
                </div>

                {/* Decorative Grid Lines */}
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-border/40 hidden lg:block" />
                <div className="absolute right-1/4 top-0 bottom-0 w-px bg-border/40 hidden lg:block" />
            </section>

            {/* Feature Section */}
            <section className="py-32 px-6 border-t border-border/20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                        <div className="md:col-span-5 scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out">
                            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
                                {t("features.sectionTitle")} <br />
                                <span className="text-primary/60 italic">{t("features.brand")}</span>
                            </h2>
                            <p className="text-lg text-muted-foreground font-light leading-relaxed">
                                {t("features.sectionDescription")}
                            </p>
                        </div>

                        <div className="md:col-span-1" />

                        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
                            {[
                                { title: "features.expertTitle", desc: "features.expertDesc", delay: "0" },
                                { title: "features.multilingualTitle", desc: "features.multilingualDesc", delay: "100" },
                                { title: "features.instantTitle", desc: "features.instantDesc", delay: "200" },
                                { title: "features.secureTitle", desc: "features.secureDesc", delay: "300" },
                            ].map((feat, i) => (
                                <div
                                    key={i}
                                    className="scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out group"
                                    style={{ transitionDelay: `${feat.delay}ms` }}
                                >
                                    <div className="w-12 h-12 mb-6 border-l-2 border-primary/50 group-hover:border-primary transition-colors flex items-center px-4">
                                        <span className="font-mono text-sm text-primary">0{i + 1}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {t(feat.title)}
                                    </h3>
                                    <p className="text-muted-foreground/80 font-light leading-relaxed">
                                        {t(feat.desc)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats as huge typography */}
            <section className="py-32 bg-primary/5 border-y border-border/20 overflow-hidden">
                <div className="flex flex-nowrap whitespace-nowrap animate-[shimmer_30s_linear_infinite] opacity-50 hover:opacity-100 transition-opacity duration-700">
                    <h2 className="text-9xl md:text-[15rem] font-black text-transparent opacity-20" style={{ WebkitTextStroke: '2px var(--color-primary)' }}>
                        {t("stats.activeUsersValue")} {t("stats.activeUsers")} • {t("stats.accuracyValue")} {t("stats.accuracy")} •
                    </h2>
                    <h2 className="text-9xl md:text-[15rem] font-black text-transparent opacity-20" style={{ WebkitTextStroke: '2px var(--color-primary)' }}>
                        {t("stats.activeUsersValue")} {t("stats.activeUsers")} • {t("stats.accuracyValue")} {t("stats.accuracy")} •
                    </h2>
                </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-40 px-6 text-center">
                <div className="max-w-3xl mx-auto scroll-reveal translate-y-12 opacity-0 transition-all duration-1000 ease-out">
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">
                        {t("cta.titleHighlight")}
                    </h2>
                    <Link
                        href="/chat"
                        className="inline-block relative overflow-hidden group px-12 py-5 bg-foreground text-background text-lg font-medium hover:scale-105 transition-transform duration-500 rounded-full"
                    >
                        <div className="relative z-10">{t("cta.button")}</div>
                        <div className="absolute inset-0 bg-primary/20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                </div>
            </section>

            <div dir={dir}>
                <Footer />
            </div>
        </div>
    );
}
