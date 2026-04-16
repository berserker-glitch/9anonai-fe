"use client";

import { useTranslation } from "@/lib/language-context";

/**
 * AboutHero — Full-bleed hero section for the About Us page.
 * Features animated background orbs, gradient text, and staggered
 * reveal animations consistent with the landing page design system.
 */
export function AboutHero() {
    const { t } = useTranslation("landing");

    return (
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
            {/* Immersive Background — floating gradient orbs + dot grid */}
            <div className="absolute inset-0 bg-dots opacity-[0.15]" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full blur-[150px] opacity-70 animate-pulse-gentle" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gold/10 via-gold/5 to-transparent rounded-full blur-[150px] opacity-50 animate-morph" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                {/* Mission badge with pulsing indicator */}
                <div className="animate-reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-emerald mb-8 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-sm font-medium text-gradient-emerald">
                        {t("aboutUs.badge")}
                    </span>
                </div>

                {/* Main headline — split across two lines with gradient accent */}
                <h1 className="animate-reveal-up delay-100 font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
                    <span className="block text-foreground drop-shadow-sm">
                        {t("aboutUs.title")}
                    </span>
                    <span className="block text-gradient-gold drop-shadow-glow">
                        {t("aboutUs.titleHighlight")}
                    </span>
                </h1>

                {/* Subtitle paragraph — descriptive mission statement */}
                <p className="animate-reveal-up delay-200 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                    {t("aboutUs.subtitle")}
                </p>
            </div>
        </section>
    );
}
