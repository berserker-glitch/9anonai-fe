"use client";

import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";
import CardSwap, { Card } from "@/components/landing/card-swap";

/**
 * Landing Page 7: Light Glassmorphism & Interactive Features
 * Focus: Clean light theme from Page 1 + Glass panels from Page 2 + CardSwap from normal Home
 */
export default function LandingPage7() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-primary/20 overflow-x-hidden">

            {/* Abstract Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-[120px]" />
            </div>

            <div dir={dir} className="relative z-50 bg-white/50 backdrop-blur-xl border-b border-white/20 shadow-sm shadow-slate-200/50">
                <Header />
            </div>

            <main className="relative z-10 pt-20 pb-40">

                {/* Interactive Hero Section */}
                <section className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

                    <div className="animate-slide-right order-2 lg:order-1 text-center lg:text-start">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-2xl border border-white mb-8 shadow-sm text-sm font-semibold text-primary">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            {t("hero.badge")}
                        </div>

                        <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-slate-900 drop-shadow-sm">
                            {t("hero.title1")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                {t("hero.title2")}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                            {t("hero.description")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/chat"
                                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform"
                            >
                                {t("hero.ctaPrimary")}
                            </Link>
                            <Link
                                href="#explore"
                                className="px-8 py-4 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-white hover:border-slate-300 transition-colors duration-300"
                            >
                                {t("hero.ctaSecondary")}
                            </Link>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative h-[500px] sm:h-[600px] w-full flex items-center justify-center animate-scale-in [animation-delay:200ms]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gold/10 rounded-full blur-[100px] opacity-60" />

                        {/* Light Glassmorphism CardSwap */}
                        <div className="relative w-full h-full scale-90 sm:scale-100 origin-center z-10">
                            <CardSwap
                                width={360}
                                height={480}
                                cardDistance={35}
                                verticalDistance={35}
                                delay={3500}
                                skewAmount={5}
                            >
                                {[
                                    {
                                        icon: "⚡",
                                        title: "features.expertTitle",
                                        desc: "features.expertDesc",
                                        gradient: "from-emerald-50 to-white"
                                    },
                                    {
                                        icon: "🌍",
                                        title: "features.multilingualTitle",
                                        desc: "features.multilingualDesc",
                                        gradient: "from-amber-50 to-white"
                                    },
                                    {
                                        icon: "💬",
                                        title: "features.instantTitle",
                                        desc: "features.instantDesc",
                                        gradient: "from-sky-50 to-white"
                                    },
                                ].map((item, i) => (
                                    <Card
                                        key={i}
                                        className={`
                          !bg-gradient-to-br ${item.gradient} !backdrop-blur-2xl !border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] 
                          flex flex-col items-center justify-center p-8 text-center rounded-[2.5rem]
                        `}
                                    >
                                        <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center text-4xl mb-8 border border-slate-100">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{t(item.title)}</h3>
                                        <p className="text-slate-600 font-medium leading-relaxed">{t(item.desc)}</p>
                                    </Card>
                                ))}
                            </CardSwap>
                        </div>
                    </div>

                </section>

                {/* Floating Glass Stats Grid */}
                <section id="explore" className="max-w-7xl mx-auto px-6 lg:px-12 mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { val: "stats.activeUsersValue", label: "stats.activeUsers" },
                            { val: "stats.accuracyValue", label: "stats.accuracy" },
                            { val: "stats.questionsAnsweredValue", label: "stats.questionsAnswered" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white/60 backdrop-blur-2xl border border-white shadow-xl shadow-slate-200/40 p-10 rounded-[2.5rem] text-center transform hover:-translate-y-2 transition-transform duration-500"
                            >
                                <div className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-4 drop-shadow-sm">
                                    {t(stat.val)}
                                </div>
                                <div className="text-slate-500 font-bold uppercase tracking-wider text-sm">
                                    {t(stat.label)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <div dir={dir} className="relative z-50 bg-white/80 backdrop-blur-xl border-t border-slate-200">
                <Footer />
            </div>

        </div>
    );
}
