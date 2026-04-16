"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

/**
 * AboutCTA — Bottom call-to-action section for the About Us page.
 * Full-width gradient background with headline, description,
 * and dual CTA buttons (primary chat link + secondary learn more).
 */
export function AboutCTA() {
    const { t } = useTranslation("landing");

    return (
        <section className="py-24 lg:py-32 relative text-center overflow-hidden">
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-gold/5 to-primary/10" />
            <div className="absolute inset-0 bg-zellige opacity-5" />
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-gold/10 rounded-full blur-[200px] -translate-y-1/2 -translate-x-1/2 opacity-60 animate-morph" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight drop-shadow-sm">
                    {t("aboutUs.ctaTitle")}{" "}
                    <span className="block text-gradient-emerald mt-2 drop-shadow-glow">
                        {t("aboutUs.ctaTitleHighlight")}
                    </span>
                </h2>
                <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg lg:text-xl leading-relaxed">
                    {t("aboutUs.ctaDescription")}
                </p>

                {/* Dual CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 btn-premium px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-gold/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-[transform,box-shadow] duration-300 group"
                    >
                        <span>{t("aboutUs.ctaButton")}</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        href="#features"
                        className="px-10 py-5 text-lg font-medium glass-premium rounded-2xl hover:border-primary/30 hover:scale-105 hover:bg-primary/5 transition-all duration-300 border border-border/50"
                    >
                        {t("aboutUs.ctaSecondary")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
