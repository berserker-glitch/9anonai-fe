"use client";

import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";

/**
 * Landing Page 3: Bento Box & Playful
 * Focus: Dense bento grid layout, interconnected cards, scale-in animations, playful hovering.
 */
export default function LandingPage3() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-primary/20">
            <div dir={dir} className="bg-white border-b border-slate-200 shadow-sm relative z-50">
                <Header />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Bento Grid Header */}
                <div className="mb-12 text-center md:text-start animate-slide-up">
                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-xl mb-6 shadow-sm border border-primary/20 transform rotate-1 hover:rotate-0 transition-transform cursor-default">
                        👋 {t("hero.badge")}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm">
                        {t("hero.title1")} <br />
                        <span className="text-primary bg-primary/10 px-2 rounded-xl border border-primary/20 inline-block mt-2 -rotate-1 hover:rotate-1 transition-transform">
                            {t("hero.title2")}
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
                        {t("hero.description")}
                    </p>
                </div>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[250px] animate-fade-in [animation-delay:300ms]">

                    {/* Main Hero Card (Spans 2x2) */}
                    <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden relative group hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/30 to-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 drop-shadow-sm">{t("cta.title")}</h2>
                                <p className="text-slate-600 text-lg font-medium max-w-sm">{t("cta.description")}</p>
                            </div>
                            <div className="pt-8 mt-auto">
                                <Link href="/chat" className="inline-flex items-center justify-center bg-slate-900 text-white hover:bg-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 transform group-hover:scale-105 w-full sm:w-auto">
                                    {t("hero.ctaPrimary")}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Feature Card 1 */}
                    <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-primary to-emerald-600 rounded-3xl p-6 shadow-lg shadow-primary/20 flex flex-col justify-end relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                        <div className="absolute top-6 right-6 text-white/50 group-hover:scale-125 transition-transform duration-300">
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-10 5 10 5 10-5-10-5z" /></svg>
                        </div>
                        <h3 className="text-white font-bold text-xl relative z-10">{t("features.expertTitle")}</h3>
                        <p className="text-white/80 text-sm mt-2 relative z-10">{t("features.expertDesc")}</p>
                    </div>

                    {/* Stat Card */}
                    <div className="md:col-span-1 md:row-span-1 bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col items-center justify-center text-center group hover:border-gold/50 hover:bg-gold/5 transition-all">
                        <div className="text-gold font-black text-5xl mb-2 group-hover:scale-110 transition-transform">{t("stats.accuracyValue")}</div>
                        <div className="text-slate-500 font-bold uppercase tracking-wider text-sm">{t("stats.accuracy")}</div>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="md:col-span-2 md:row-span-1 bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex items-center justify-between group hover:shadow-2xl transition-shadow relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                        <div className="relative z-10 max-w-[60%]">
                            <h3 className="font-bold text-2xl mb-2 text-gold">{t("features.secureTitle")}</h3>
                            <p className="text-slate-400 font-medium">{t("features.secureDesc")}</p>
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner">
                            <span className="text-3xl">🔒</span>
                        </div>
                    </div>

                    {/* Chat Preview Card (Spans 2 columns) */}
                    <div className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-6 shadow-md border border-slate-200 hover:border-primary/30 transition-colors overflow-hidden relative">
                        <div className="flex gap-4 items-start mb-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 font-bold text-slate-400 shadow-inner">U</div>
                            <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm text-slate-700 font-medium text-sm">
                                {t("chat.userQuestion")}
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white font-bold shadow-md">9</div>
                            <div className="bg-primary/10 px-4 py-3 rounded-2xl rounded-tr-sm text-slate-800 font-medium text-sm border border-primary/20">
                                {t("chat.aiResponse")}
                            </div>
                        </div>
                    </div>

                    {/* Social Proof Card */}
                    <div className="md:col-span-2 md:row-span-1 bg-gradient-to-tr from-gold/20 to-yellow-100 rounded-3xl p-8 border border-gold/30 flex flex-col justify-center shadow-lg shadow-gold/10 group hover:-translate-y-1 transition-transform">
                        <div className="flex -space-x-4 rtl:space-x-reverse mb-4 items-center gap-4">
                            <div className="flex -space-x-4">
                                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 shadow-md"></div>
                                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-300 shadow-md"></div>
                                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-xs font-bold text-white shadow-md">+10k</div>
                            </div>
                            <div className="text-slate-800 font-bold text-sm bg-white/70 px-3 py-1 rounded-full">{t("stats.activeUsersValue")} {t("stats.activeUsers")}</div>
                        </div>
                        <p className="text-slate-700 font-medium max-w-sm">
                            {t("hero.free")} • {t("hero.noRegistration")} • {t("hero.available247")}
                        </p>
                    </div>

                </div>

            </main>

            <div dir={dir} className="bg-slate-900 border-t-0 text-white">
                <Footer />
            </div>
        </div>
    );
}
