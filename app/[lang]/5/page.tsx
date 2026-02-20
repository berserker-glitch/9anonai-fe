"use client";

import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";

/**
 * Landing Page 5: Flowing & Organic
 * Focus: Asymmetry, overlapping elements, smooth gradients, morphing blobs.
 */
export default function LandingPage5() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/30 overflow-x-hidden">

            <div dir={dir} className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100">
                <Header />
            </div>

            <main className="relative">

                {/* Organic Morphing Blobs */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-morph pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute top-[20%] left-0 w-[40vw] h-[40vw] bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-morph pointer-events-none -translate-x-1/2" style={{ animationDelay: '2s', animationDuration: '10s' }} />
                <div className="absolute bottom-0 right-[20%] w-[60vw] h-[60vw] bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-morph pointer-events-none translate-y-1/2" style={{ animationDelay: '4s', animationDuration: '12s' }} />

                {/* Hero Section */}
                <section className="relative z-10 pt-32 pb-20 px-6 sm:px-12 lg:px-24">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        <div className="lg:col-span-7 z-10 animate-slide-right">
                            <div className="inline-block bg-white rounded-full px-5 py-2 shadow-sm border border-emerald-100 mb-8 transform -rotate-2 hover:rotate-0 transition-transform">
                                <span className="text-emerald-600 font-medium text-sm flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    {t("hero.badge")}
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8 drop-shadow-sm">
                                {t("hero.title1")} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                                    {t("hero.title2")}
                                </span>
                            </h1>

                            <p className="text-xl sm:text-2xl text-slate-600 font-medium max-w-2xl leading-relaxed mb-12">
                                {t("hero.description")}
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                <Link
                                    href="/chat"
                                    className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white transition-all duration-200 bg-emerald-600 border border-transparent rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {t("hero.ctaPrimary")}
                                        <svg className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 ease-out group-hover:scale-100 group-hover:bg-white/10 z-0"></div>
                                </Link>
                                <p className="text-sm font-semibold text-slate-500 flex flex-col">
                                    <span>{t("hero.free")}</span>
                                    <span className="text-emerald-500">{t("hero.noRegistration")}</span>
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative animate-scale-in [animation-delay:400ms]">
                            {/* Asymmetrical Image/Chat Mockup placeholder */}
                            <div className="relative w-full aspect-[4/5] bg-white rounded-[4rem] rounded-tr-[8rem] rounded-bl-[8rem] shadow-2xl shadow-emerald-900/10 border border-emerald-50 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-700">
                                <div className="absolute inset-x-8 top-12 bg-slate-50 rounded-2xl p-6 shadow-inner">
                                    <div className="w-2/3 h-4 bg-slate-200 rounded-full mb-3" />
                                    <div className="w-1/2 h-4 bg-slate-200 rounded-full" />
                                </div>
                                <div className="absolute inset-x-8 bottom-12 bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm ml-auto">
                                    <div className="w-3/4 h-4 bg-emerald-200 rounded-full mb-3 ml-auto text-right" dir="rtl" />
                                    <div className="w-full h-4 bg-emerald-200 rounded-full mb-3 ml-auto text-right" dir="rtl" />
                                    <div className="w-2/3 h-4 bg-emerald-200 rounded-full ml-auto text-right" dir="rtl" />
                                    <div className="flex gap-2 justify-end content-end items-center mt-6">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">٩</div>
                                        <span className="text-xs font-bold text-emerald-600">{t("features.brand")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Overlapping Features Section */}
                <section className="relative z-10 py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-20 text-center max-w-3xl mx-auto leading-tight">
                            {t("features.sectionTitle")} <br />
                            <span className="text-emerald-600 inline-block mt-2 px-6 py-2 bg-emerald-50 rounded-full transform -rotate-2">{t("features.brand")}</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                            {/* Left stack of feature cards */}
                            <div className="space-y-8 relative">
                                <div className="absolute top-1/2 left-0 w-1 bg-emerald-100 h-full -translate-y-1/2 rounded-full hidden md:block" />
                                {[
                                    { title: "expertTitle", desc: "expertDesc" },
                                    { title: "multilingualTitle", desc: "multilingualDesc" },
                                    { title: "secureTitle", desc: "secureDesc" },
                                ].map((feat, i) => (
                                    <div key={i} className={`bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 relative group hover:scale-[1.02] transition-transform z-10 ${i % 2 !== 0 ? 'md:ml-12' : ''}`}>
                                        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full hidden md:block group-hover:scale-150 group-hover:bg-emerald-500 transition-all font-bold" />
                                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t(`features.${feat.title}`)}</h3>
                                        <p className="text-slate-600 leading-relaxed font-medium">{t(`features.${feat.desc}`)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Right visual / CTA area */}
                            <div className="bg-emerald-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-emerald-900/20 transform md:rotate-2 hover:rotate-0 transition-transform overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                <h3 className="text-4xl font-black mb-6 drop-shadow-md leading-tight">{t("cta.titleHighlight")}</h3>
                                <p className="text-emerald-100 text-xl font-medium mb-12">{t("cta.description")}</p>

                                <Link href="/chat" className="inline-block bg-white text-emerald-700 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-emerald-50 hover:-translate-y-1 transition-all w-full text-center">
                                    {t("cta.button")}
                                </Link>

                                {/* Decorative stats */}
                                <div className="mt-12 pt-8 border-t border-emerald-500/50 flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-black">{t("stats.accuracyValue")}</div>
                                        <div className="text-emerald-200 text-sm font-semibold uppercase">{t("stats.accuracy")}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black">{t("stats.activeUsersValue")}</div>
                                        <div className="text-emerald-200 text-sm font-semibold uppercase">{t("stats.activeUsers")}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <div dir={dir} className="relative z-50">
                <Footer />
            </div>

        </div>
    );
}
