"use client";

import { useTranslation } from "@/lib/language-context";

/**
 * AboutStats — Trust signal statistics strip.
 * Displays key metrics (accuracy, latency, sources indexed, uptime)
 * in a horizontal grid with gradient text and scroll-reveal animation.
 */
export function AboutStats() {
    const { t } = useTranslation("landing");

    /** Stat entries — value + label translation keys */
    const stats = [
        { value: "statsAccuracy", label: "statsAccuracyLabel" },
        { value: "statsLatency", label: "statsLatencyLabel" },
        { value: "statsSources", label: "statsSourcesLabel" },
        { value: "statsUptime", label: "statsUptimeLabel" },
    ];

    return (
        <section className="py-16 md:py-24 border-y border-border/30 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/30 text-center">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="scroll-animate opacity-0 transform translate-y-8 transition-all duration-700"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <p className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-3 drop-shadow-sm">
                                {t(`aboutUs.${stat.value}`)}
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground tracking-wider font-semibold">
                                {t(`aboutUs.${stat.label}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
