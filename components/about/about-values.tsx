"use client";

import { useTranslation } from "@/lib/language-context";

/**
 * AboutValues — Core values grid section.
 * Displays 6 foundational values of 9anon AI in a responsive
 * grid of glass cards with icons, titles, and descriptions.
 * Each card features a subtle hover glow effect.
 */
export function AboutValues() {
    const { t } = useTranslation("landing");

    /** Six core value cards with icon paths and translation keys */
    const values = [
        {
            titleKey: "aboutUs.value1Title",
            descKey: "aboutUs.value1Desc",
            icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
            color: "primary",
        },
        {
            titleKey: "aboutUs.value2Title",
            descKey: "aboutUs.value2Desc",
            icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
            color: "primary",
        },
        {
            titleKey: "aboutUs.value3Title",
            descKey: "aboutUs.value3Desc",
            icon: "M13 10V3L4 14h7v7l9-11h-7z",
            color: "primary",
        },
        {
            titleKey: "aboutUs.value4Title",
            descKey: "aboutUs.value4Desc",
            icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
            color: "primary",
        },
        {
            titleKey: "aboutUs.value5Title",
            descKey: "aboutUs.value5Desc",
            icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
            color: "primary",
        },
        {
            titleKey: "aboutUs.value6Title",
            descKey: "aboutUs.value6Desc",
            icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
            color: "primary",
        },
    ];

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-dots opacity-[0.1]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-primary/8 to-transparent rounded-full blur-[180px] opacity-50 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section heading */}
                <div className="text-center mb-16 lg:mb-20 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20">
                        {t("aboutUs.valuesTag")}
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        {t("aboutUs.valuesTitle")}{" "}
                        <span className="text-gradient-emerald">
                            {t("aboutUs.valuesTitleHighlight")}
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {t("aboutUs.valuesSubtitle")}
                    </p>
                </div>

                {/* 3x2 grid of value cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, i) => (
                        <div
                            key={i}
                            className="glass-premium rounded-[2rem] p-8 sm:p-10 border border-border/40 relative overflow-hidden group glass-card-hover scroll-animate opacity-0 transform translate-y-8 transition-all duration-700"
                            style={{ transitionDelay: `${100 + i * 80}ms` }}
                        >
                            {/* Hover overlay glow */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${
                                    false
                                        ? "from-primary/5 to-transparent"
                                        : "from-primary/5 to-transparent"
                                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            <div className="relative z-10">
                                {/* Icon container */}
                                <div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${
                                        "bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-lg shadow-primary/10"
                                    }`}
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                                    </svg>
                                </div>

                                <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/80 transition-all">
                                    {t(value.titleKey)}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t(value.descKey)}
                                </p>
                            </div>

                            {/* Corner accent dot */}
                            <div
                                className={`absolute top-4 right-4 w-2 h-2 rounded-full opacity-50 ${
                                    "bg-primary"
                                }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
