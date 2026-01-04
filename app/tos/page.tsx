"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useLanguage } from "@/lib/language-context";

interface TosTranslations {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: {
        [key: string]: {
            title: string;
            content: string;
            items?: string[];
            important?: string;
            email?: string;
        };
    };
}

export default function TermsOfServicePage() {
    const { language, dir } = useLanguage();
    const [translations, setTranslations] = useState<TosTranslations | null>(null);

    useEffect(() => {
        async function loadTranslations() {
            try {
                const response = await fetch(`/locales/${language}/tos.json`);
                if (response.ok) {
                    const data = await response.json();
                    setTranslations(data);
                }
            } catch (error) {
                console.error("Failed to load ToS translations:", error);
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
        "acceptance",
        "description",
        "disclaimer",
        "userObligations",
        "intellectualProperty",
        "privacy",
        "modifications",
        "governing",
        "contact",
    ];

    return (
        <div className="min-h-screen bg-background" dir={dir}>
            <Header />

            {/* Hero Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-br from-primary/10 to-gold/5 rounded-full blur-[150px] opacity-50 pointer-events-none" />

            <main className="relative pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Header */}
                    <div className="text-center mb-16 animate-reveal-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-emerald mb-6">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm font-medium text-primary">Legal Document</span>
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

                    {/* Table of Contents */}
                    <div className="animate-reveal-up delay-100 glass-premium rounded-2xl p-6 mb-8 hidden sm:block">
                        <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                            Table of Contents
                        </h3>
                        <nav className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {sectionOrder.map((key) => {
                                const section = translations.sections[key];
                                if (!section) return null;
                                return (
                                    <a
                                        key={key}
                                        href={`#${key}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                                    >
                                        {section.title}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Introduction */}
                    <div className="animate-reveal-up delay-200 glass-premium rounded-2xl p-8 mb-8 border-l-4 border-primary">
                        <p className="text-lg leading-relaxed">{translations.intro}</p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-6">
                        {sectionOrder.map((key, index) => {
                            const section = translations.sections[key];
                            if (!section) return null;

                            return (
                                <div
                                    key={key}
                                    id={key}
                                    className="animate-reveal-up glass-premium rounded-2xl p-8 scroll-mt-24"
                                    style={{ animationDelay: `${(index + 3) * 50}ms` }}
                                >
                                    <h2 className="font-display text-xl sm:text-2xl font-semibold mb-4 text-gradient-emerald flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                                            {index + 1}
                                        </span>
                                        {section.title.replace(/^[١٢٣٤٥٦٧٨٩0-9]+\.\s*/, '')}
                                    </h2>
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
                                    {section.important && (
                                        <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-xl flex items-start gap-3">
                                            <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-gold font-medium">{section.important}</p>
                                        </div>
                                    )}
                                    {section.email && (
                                        <a
                                            href={`mailto:${section.email}`}
                                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                            href="/privacy"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
                        >
                            <span>{language === "ar" ? "سياسة الخصوصية" : language === "fr" ? "Politique de Confidentialité" : "Privacy Policy"}</span>
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
