"use client";

import { useTranslation } from "@/lib/language-context";

/**
 * AboutPhilosophy — "Old Way vs 9anon Way" contrast section.
 * Two glass cards side-by-side: one for the problem (old way),
 * one for the solution (9anon AI approach). Each features icons,
 * headings, and descriptive text with hover glow effects.
 */
export function AboutPhilosophy() {
    const { t } = useTranslation("landing");

    return (
        <section className="py-24 relative z-10 bg-muted/20">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section heading */}
                <div className="mb-16 text-center scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
                    <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
                        {t("aboutUs.philosophyTag")}
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-4 mb-6">
                        {t("aboutUs.philosophyTitle")}{" "}
                        <span className="text-gradient-emerald">
                            {t("aboutUs.philosophyTitleHighlight")}
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {t("aboutUs.philosophySubtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* The Old Way — problem card */}
                    <div className="glass-premium rounded-[2.5rem] p-10 sm:p-12 border border-border/40 relative overflow-hidden group scroll-animate opacity-0 transform translate-y-8 transition-all duration-700 delay-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Warning icon */}
                            <div className="w-14 h-14 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-8 border border-destructive/20">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-display font-semibold mb-4 text-foreground/80 group-hover:text-destructive transition-colors">
                                {t("aboutUs.philosophyOld")}
                            </h3>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6 flex-grow">
                                {t("aboutUs.philosophyOldDesc")}
                            </p>
                            {/* Pain point bullets */}
                            <ul className="space-y-3 text-muted-foreground/80">
                                {[
                                    "aboutUs.painPoint1",
                                    "aboutUs.painPoint2",
                                    "aboutUs.painPoint3",
                                ].map((key, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-destructive/60 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span>{t(key)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* The 9anon Way — solution card */}
                    <div className="glass-premium rounded-[2.5rem] p-10 sm:p-12 border-glow-emerald relative overflow-hidden group scroll-animate opacity-0 transform translate-y-8 transition-all duration-700 delay-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-700" />

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Checkmark icon */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-display font-bold mb-4 text-gradient-emerald">
                                {t("aboutUs.philosophyNew")}
                            </h3>
                            <p className="text-xl text-foreground/90 leading-relaxed font-medium mb-6 flex-grow">
                                {t("aboutUs.philosophyNewDesc")}
                            </p>
                            {/* Solution point bullets */}
                            <ul className="space-y-3 text-foreground/80">
                                {[
                                    "aboutUs.solutionPoint1",
                                    "aboutUs.solutionPoint2",
                                    "aboutUs.solutionPoint3",
                                ].map((key, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span>{t(key)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
