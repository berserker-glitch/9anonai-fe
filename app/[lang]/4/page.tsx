"use client";

import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";

/**
 * Landing Page 4: Art Deco & Symmetrical
 * Focus: Symmetry, thin gold borders, zellige background, elegant typography, structured rhythm.
 */
export default function LandingPage4() {
    const { t } = useTranslation("landing");
    const { dir } = useLanguage();

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-serif selection:bg-[#D4AF37]/30">

            {/* Ornate Header Border */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

            <div dir={dir}>
                <Header />
            </div>

            <main className="relative overflow-hidden">

                {/* Subtle Zellige Background Pattern (Art Deco twist) */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                {/* Hero Section */}
                <section className="relative z-10 py-24 md:py-32 px-6">
                    <div className="max-w-4xl mx-auto text-center border-x border-[#D4AF37]/30 px-4 md:px-12 py-16 relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#D4AF37] before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#D4AF37] after:to-transparent">

                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FDFBF7] px-4">
                            <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#D4AF37]">
                                {t("hero.badge")}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#1A1A1A] leading-[1.1] mb-8 animate-fade-in">
                            <span className="block">{t("hero.title1")}</span>
                            <span className="block text-gradient-gold italic mt-2">{t("hero.title2")}</span>
                        </h1>

                        <p className="text-lg md:text-xl text-[#4A4A4A] max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in [animation-delay:200ms]">
                            {t("hero.description")}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in [animation-delay:400ms]">
                            <Link
                                href="/chat"
                                className="group relative px-10 py-4 bg-[#1A1A1A] text-[#FDFBF7] font-sans font-medium uppercase tracking-wider text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-500 overflow-hidden"
                            >
                                <span className="relative z-10">{t("hero.ctaPrimary")}</span>
                                <div className="absolute inset-0 border border-[#D4AF37] m-1 group-hover:border-[#1A1A1A] transition-colors duration-500 pointer-events-none" />
                            </Link>

                            <Link
                                href="#features"
                                className="px-10 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-sans font-medium uppercase tracking-wider text-sm hover:bg-[#1A1A1A] hover:text-[#FDFBF7] transition-colors duration-500"
                            >
                                {t("hero.ctaSecondary")}
                            </Link>
                        </div>

                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FDFBF7] px-4 flex items-center justify-center gap-2">
                            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                            <div className="w-2 h-2 rotate-45 bg-[#1A1A1A]" />
                            <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                        </div>

                    </div>
                </section>

                {/* Symmetry Features */}
                <section id="features" className="py-24 bg-[#1A1A1A] text-[#FDFBF7] relative z-10 mt-12 border-y border-[#D4AF37]/40">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-20 relative">
                            <h2 className="text-3xl md:text-5xl font-display mb-6 inline-block relative px-8 border-b border-[#D4AF37] pb-4">
                                {t("features.sectionTitle")}
                                {/* Decorative diamond pins */}
                                <div className="absolute -bottom-[3px] left-0 w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                                <div className="absolute -bottom-[3px] right-0 w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#D4AF37]/20">
                            {[
                                { title: "features.expertTitle", desc: "features.expertDesc" },
                                { title: "features.instantTitle", desc: "features.instantDesc" },
                                { title: "features.secureTitle", desc: "features.secureDesc" },
                                { title: "features.freeTitle", desc: "features.freeDesc" },
                            ].map((feat, i) => (
                                <div key={i} className={`p-10 border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 transition-colors duration-500 text-center ${i % 2 === 0 ? 'md:border-r md:border-b' : 'md:border-b'} ${(i === 2 || i === 3) ? 'md:border-b-0 border-b md:border-b-none' : 'border-b'}`}>
                                    <h3 className="text-xl font-display text-[#D4AF37] mb-4">{t(feat.title)}</h3>
                                    <p className="text-[#A0A0A0] font-light leading-relaxed font-sans">{t(feat.desc)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Minimalist CTA */}
                <section className="py-32 px-6 text-center relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-12 h-12 mx-auto border border-[#D4AF37] rotate-45 mb-10 flex items-center justify-center">
                            <div className="w-6 h-6 border border-[#1A1A1A]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display text-[#1A1A1A] mb-8 leading-tight">
                            {t("cta.title")}
                        </h2>
                        <Link
                            href="/chat"
                            className="inline-block px-12 py-5 bg-[#D4AF37] text-[#1A1A1A] font-sans font-bold uppercase tracking-widest text-sm hover:bg-[#C5A030] transition-colors duration-300 shadow-[4px_4px_0_0_#1A1A1A]"
                        >
                            {t("cta.button")}
                        </Link>
                    </div>
                </section>

            </main>

            <div dir={dir} className="border-t border-[#D4AF37]/40 bg-[#1A1A1A] hover:bg-[#151515] transition-colors">
                <Footer />
            </div>

        </div>
    );
}
