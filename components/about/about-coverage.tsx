"use client";

import { useTranslation } from "@/lib/language-context";

/**
 * AboutCoverage — Moroccan law coverage section.
 * Showcases the specific domains of Moroccan law that 9anon AI
 * covers, organised in a multi-column grid of glass-premium pills.
 * Important for SEO: each domain keyword targets a high-value search query.
 */
export function AboutCoverage() {
    const { t } = useTranslation("landing");

    /** Legal domain items — icon paths + translation keys */
    const domains = [
        { titleKey: "aboutUs.domain1", descKey: "aboutUs.domain1Desc", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
        { titleKey: "aboutUs.domain2", descKey: "aboutUs.domain2Desc", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
        { titleKey: "aboutUs.domain3", descKey: "aboutUs.domain3Desc", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { titleKey: "aboutUs.domain4", descKey: "aboutUs.domain4Desc", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
        { titleKey: "aboutUs.domain5", descKey: "aboutUs.domain5Desc", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
        { titleKey: "aboutUs.domain6", descKey: "aboutUs.domain6Desc", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    ];

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden bg-muted/20">
            <div className="absolute inset-0 bg-zellige opacity-[0.03]" />
            <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-gradient-to-bl from-primary/8 to-transparent rounded-full blur-[200px] opacity-50 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section heading */}
                <div className="text-center mb-16 lg:mb-20 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                    <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-6 border border-gold/20">
                        {t("aboutUs.coverageTag")}
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        {t("aboutUs.coverageTitle")}{" "}
                        <span className="text-gradient-emerald">
                            {t("aboutUs.coverageTitleHighlight")}
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {t("aboutUs.coverageSubtitle")}
                    </p>
                </div>

                {/* 3x2 domain cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {domains.map((domain, i) => (
                        <div
                            key={i}
                            className="glass-premium rounded-[2rem] p-8 border border-border/40 relative overflow-hidden group glass-card-hover scroll-animate opacity-0 transform translate-y-8 transition-all duration-700"
                            style={{ transitionDelay: `${100 + i * 80}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex items-start gap-5">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={domain.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-display font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                                        {t(domain.titleKey)}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {t(domain.descKey)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
