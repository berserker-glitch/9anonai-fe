"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";

/**
 * Landing Page 8: High-Contrast Split Layout
 * Focus: 50/50 split design. Dark aesthetic of Page 2 with typography of Page 1. 
 * Includes an interactive chat preview on the right side.
 */
export default function LandingPage8() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!chatContainerRef.current) return;
            const { left, top, width, height } = chatContainerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            chatContainerRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-gold/30">

            {/* Absolute Header (Transparent over split layout) */}
            <div dir={dir} className="absolute top-0 inset-x-0 z-50 bg-transparent border-b border-black/10 mix-blend-difference text-white">
                <Header />
            </div>

            <main className="relative flex flex-col lg:flex-row min-h-screen">

                {/* Left Side: Light Typography Focus */}
                <section className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-8 sm:px-12 lg:px-20 pt-32 pb-16 bg-[#FAFAFA] z-10">

                    <div className="absolute top-0 right-0 bottom-0 w-px bg-slate-200 hidden lg:block" />
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                    <div className="animate-slide-up">
                        <div className="inline-block px-4 py-1.5 border border-slate-900 rounded-full mb-8 hover:bg-slate-900 hover:text-white transition-colors duration-300">
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {t("hero.badge")}
                            </span>
                        </div>

                        <h1 className="font-display text-5xl sm:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 mb-8">
                            {t("hero.title1")} <br />
                            <span className="text-primary italic font-light">{t("hero.title2")}</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-md mb-12">
                            {t("hero.description")}
                        </p>

                        <div className="flex gap-4">
                            <Link href="/chat" className="px-8 py-4 bg-slate-900 text-white font-bold hover:bg-primary transition-colors duration-300 rounded-sm">
                                {t("hero.ctaPrimary")}
                            </Link>
                            <Link href="#explore" className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-100 transition-colors duration-300 rounded-sm">
                                {t("hero.ctaSecondary")}
                            </Link>
                        </div>

                        <div className="mt-16 flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                            <div className="flex flex-col">
                                <span className="text-3xl font-black">{t("stats.activeUsersValue")}</span>
                                <span className="text-xs uppercase font-bold tracking-widest">{t("stats.activeUsers")}</span>
                            </div>
                            <div className="w-px h-12 bg-slate-300" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-black">{t("stats.accuracyValue")}</span>
                                <span className="text-xs uppercase font-bold tracking-widest">{t("stats.accuracy")}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Side: Dark Cinematic Chat Preview */}
                <section className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-[#050B07] flex items-center justify-center p-8 lg:p-20 overflow-hidden text-white border-l border-white/10">

                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[100px] animate-pulse-gentle mix-blend-screen" />
                        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-gold/15 rounded-full blur-[80px] animate-pulse-gentle mix-blend-screen" style={{ animationDelay: '2s' }} />
                    </div>

                    <div ref={chatContainerRef} className="relative z-10 w-full max-w-xl transition-transform duration-200 ease-out will-change-transform">

                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-gold to-primary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                        <div className="relative bg-[#020403]/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">

                            {/* Browser Bar */}
                            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <div className="ml-auto text-xs font-mono text-white/30">9anonai.com/chat</div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-end pr-4">
                                    <div className="bg-white/10 border border-white/10 text-white rounded-2xl rounded-tr-sm px-6 py-4 max-w-[85%] font-medium">
                                        <p dir="rtl">{t("chat.userQuestion")}</p>
                                    </div>
                                </div>

                                <div className="flex justify-start pl-4 gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-primary to-emerald-700 flex items-center justify-center shadow-lg shadow-primary/30">
                                        <span className="font-bold">٩</span>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#0c1c14] to-[#0A140F] border border-primary/30 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] text-white/90 rounded-2xl rounded-tl-sm px-6 py-5 max-w-[85%]">
                                        <p dir="rtl" className="leading-relaxed">{t("chat.aiResponse")}</p>
                                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-gold" />
                                            </div>
                                            <span className="text-xs text-gold/80 font-bold uppercase">{t("features.sourcesTitle")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>

            {/* Feature Strip (Crosses both sections) */}
            <section id="explore" className="relative z-20 -mt-8 mx-8 lg:mx-20 bg-black text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gold/5 to-transparent pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {[
                        { icon: "⚡", title: "expertTitle", desc: "expertDesc" },
                        { icon: "🌍", title: "multilingualTitle", desc: "multilingualDesc" },
                        { icon: "🔒", title: "secureTitle", desc: "secureDesc" },
                    ].map((f, i) => (
                        <div key={i} className="p-8 hover:bg-white/5 transition-colors duration-300">
                            <div className="text-2xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{t(`features.${f.title}`)}</h3>
                            <p className="text-white/60 font-medium">{t(`features.${f.desc}`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div dir={dir} className="mt-20">
                <Footer />
            </div>

        </div>
    );
}
