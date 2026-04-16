"use client";

import { useTranslation } from "@/lib/language-context";

/**
 * AboutEngine — Technical deep-dive section.
 * Showcases the AI architecture: what data sources power 9anon,
 * how the model avoids hallucination, and what makes it reliable.
 * Features a rotating orbital CSS visualization on desktop.
 */
export function AboutEngine() {
    const { t } = useTranslation("landing");

    /** Tech features — icon SVG path + translation keys */
    const techFeatures = [
        {
            titleKey: "aboutUs.techFeature1",
            descKey: "aboutUs.techFeature1Desc",
            icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
        },
        {
            titleKey: "aboutUs.techFeature2",
            descKey: "aboutUs.techFeature2Desc",
            icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
        },
        {
            titleKey: "aboutUs.techFeature3",
            descKey: "aboutUs.techFeature3Desc",
            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
        },
        {
            titleKey: "aboutUs.techFeature4",
            descKey: "aboutUs.techFeature4Desc",
            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
    ];

    return (
        <section
            className="py-24 lg:py-32 relative border-y border-border/20 overflow-hidden bg-[oklch(0.14_0.015_160)]"
        >
            {/* Background texture */}
            <div className="absolute inset-0 bg-zellige opacity-[0.03]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-gold/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left column — text content */}
                    <div className="scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20">
                            {t("aboutUs.techTag")}
                        </span>
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white">
                            {t("aboutUs.techTitle")}
                        </h2>
                        <p className="text-white/55 text-xl leading-relaxed mb-10">
                            {t("aboutUs.techDesc")}
                        </p>

                        {/* Feature list */}
                        <div className="space-y-8">
                            {techFeatures.map((feature, i) => (
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
                                        <p className="text-white/55">
                                            {t(feature.descKey)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right column — Orbital CSS visualization */}
                    <div className="relative aspect-square w-full max-w-md mx-auto scroll-animate opacity-0 transform scale-95 transition-all duration-1000 delay-300">
                        <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-4 rounded-full border border-gold/10 animate-[spin_40s_linear_infinite_reverse]" />
                        <div className="absolute inset-12 rounded-full border border-primary/30 animate-[spin_20s_linear_infinite] border-dashed" />

                        {/* Core node */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-gold/80 p-[1px] shadow-2xl shadow-primary/40 animate-pulse-gentle">
                                <div className="w-full h-full rounded-full bg-[oklch(0.14_0.015_160)] flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/20 animate-morph" />
                                    <span className="text-3xl font-display font-bold text-white relative z-10">
                                        9anon
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Orbiting satellite nodes */}
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
    );
}
