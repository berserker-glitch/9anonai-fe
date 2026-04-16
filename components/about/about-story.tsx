"use client";

import { useTranslation } from "@/lib/language-context";

/**
 * AboutStory — "Our Story" narrative section.
 * A long-form editorial layout telling the origin story of 9anon AI:
 * why it was built, the problem it solves, and the founders' vision.
 * Uses a two-column grid on desktop for visual balance.
 */
export function AboutStory() {
    const { t } = useTranslation("landing");

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background texture for editorial feel */}
            <div className="absolute inset-0 bg-zellige opacity-[0.03]" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-[180px] opacity-60 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section tag */}
                <div className="mb-16 text-center scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                    <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-6 border border-gold/20">
                        {t("aboutUs.storyTag")}
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        {t("aboutUs.storyTitle")}{" "}
                        <span className="text-gradient-emerald">
                            {t("aboutUs.storyTitleHighlight")}
                        </span>
                    </h2>
                </div>

                {/* Two-column editorial layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left column — origin narrative */}
                    <div className="space-y-8 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700 delay-100">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-gold to-transparent rounded-full hidden lg:block" />
                            <div className="lg:pl-8">
                                <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                                    {t("aboutUs.storyOriginTitle")}
                                </h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    {t("aboutUs.storyOriginP1")}
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {t("aboutUs.storyOriginP2")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right column — vision & impact */}
                    <div className="space-y-8 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700 delay-200">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gold via-primary to-transparent rounded-full hidden lg:block" />
                            <div className="lg:pl-8">
                                <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">
                                    {t("aboutUs.storyVisionTitle")}
                                </h3>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    {t("aboutUs.storyVisionP1")}
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {t("aboutUs.storyVisionP2")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pull-quote — centered editorial emphasis */}
                <div className="mt-20 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700 delay-300">
                    <blockquote className="relative max-w-4xl mx-auto text-center">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-8xl text-primary/10 font-display leading-none">"</div>
                        <p className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-display font-medium italic text-foreground/90 leading-snug">
                            {t("aboutUs.storyQuote")}
                        </p>
                        <footer className="mt-6 text-sm text-muted-foreground font-semibold tracking-wider uppercase">
                            {t("aboutUs.storyQuoteAttribution")}
                        </footer>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
