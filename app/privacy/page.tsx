"use client";

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useLanguage } from "@/lib/language-context";

interface PrivacyTranslations {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: {
        [key: string]: {
            title: string;
            content: string;
            items?: string[];
            email?: string;
        };
    };
}

export default function PrivacyPolicyPage() {
    const { language, dir } = useLanguage();
    const [translations, setTranslations] = useState<PrivacyTranslations | null>(null);

    useEffect(() => {
        async function loadTranslations() {
            try {
                const response = await fetch(`/locales/${language}/privacy.json`);
                if (response.ok) {
                    const data = await response.json();
                    setTranslations(data);
                }
            } catch (error) {
                console.error("Failed to load Privacy translations:", error);
            }
        }
        loadTranslations();
    }, [language]);

    if (!translations) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    const sectionOrder = [
        "collection",
        "usage",
        "protection",
        "sharing",
        "cookies",
        "rights",
        "retention",
        "children",
        "changes",
        "contact",
    ];

    // Icons for each section
    const sectionIcons: Record<string, JSX.Element> = {
        collection: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        usage: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
        protection: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
        sharing: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />,
        cookies: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
        rights: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
        retention: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
        children: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
        changes: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
        contact: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    };

    return (
        <div className="min-h-screen bg-background" dir={dir}>
            <Header />

            {/* Hero Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-gold/10 to-primary/5 rounded-full blur-[150px] opacity-50 pointer-events-none" />

            <main className="relative pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Header */}
                    <div className="text-center mb-16 animate-reveal-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-gold mb-6">
                            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="text-sm font-medium text-gold">Your Privacy Matters</span>
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                            {translations.title}
                        </h1>
                        <p className="text-muted-foreground flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {translations.lastUpdated}
                        </p>
                    </div>

                    {/* Quick Summary */}
                    <div className="animate-reveal-up delay-100 glass-premium rounded-2xl p-6 mb-8 border-l-4 border-gold">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-lg leading-relaxed">{translations.intro}</p>
                        </div>
                    </div>

                    {/* Sections Grid for larger screens */}
                    <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                        {sectionOrder.map((key, index) => {
                            const section = translations.sections[key];
                            if (!section) return null;

                            return (
                                <div
                                    key={key}
                                    className="animate-reveal-up glass-premium rounded-2xl p-6"
                                    style={{ animationDelay: `${(index + 2) * 50}ms` }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {sectionIcons[key] || sectionIcons.collection}
                                            </svg>
                                        </div>
                                        <h2 className="font-display text-lg font-semibold">
                                            {section.title.replace(/^[١٢٣٤٥٦٧٨٩0-9]+\.\s*/, '')}
                                        </h2>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                                        {section.content}
                                    </p>
                                    {section.items && (
                                        <ul className="space-y-1.5 text-muted-foreground text-sm">
                                            {section.items.slice(0, 3).map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="line-clamp-1">{item}</span>
                                                </li>
                                            ))}
                                            {section.items.length > 3 && (
                                                <li className="text-primary text-xs font-medium">
                                                    +{section.items.length - 3} more
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                    {section.email && (
                                        <a
                                            href={`mailto:${section.email}`}
                                            className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:underline"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {sectionIcons.contact}
                                            </svg>
                                            {section.email}
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Single Column for smaller screens */}
                    <div className="lg:hidden space-y-6">
                        {sectionOrder.map((key, index) => {
                            const section = translations.sections[key];
                            if (!section) return null;

                            return (
                                <div
                                    key={key}
                                    className="animate-reveal-up glass-premium rounded-2xl p-6"
                                    style={{ animationDelay: `${(index + 2) * 50}ms` }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {sectionIcons[key] || sectionIcons.collection}
                                            </svg>
                                        </div>
                                        <h2 className="font-display text-lg font-semibold">
                                            {section.title.replace(/^[١٢٣٤٥٦٧٨٩0-9]+\.\s*/, '')}
                                        </h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {section.content}
                                    </p>
                                    {section.items && (
                                        <ul className="space-y-2 text-muted-foreground">
                                            {section.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <svg className="w-5 h-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.email && (
                                        <a
                                            href={`mailto:${section.email}`}
                                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {sectionIcons.contact}
                                            </svg>
                                            {section.email}
                                        </a>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Back Link */}
                    <div className="mt-12 flex items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 glass-premium rounded-xl hover:border-primary/30 transition-colors"
                        >
                            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>{language === "ar" ? "العودة للرئيسية" : language === "fr" ? "Retour à l'accueil" : "Back to Home"}</span>
                        </Link>
                        <Link
                            href="/tos"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 text-gold rounded-xl hover:bg-gold/20 transition-colors"
                        >
                            <span>{language === "ar" ? "شروط الخدمة" : language === "fr" ? "Conditions d'Utilisation" : "Terms of Service"}</span>
                            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
