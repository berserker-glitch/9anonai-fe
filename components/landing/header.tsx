"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";
import { useTheme } from "@/components/providers/theme-provider";

const legalTopics = [
    { href: "/family-law",        ar: "مدونة الأسرة",        fr: "Droit de la Famille", en: "Family Law" },
    { href: "/labor-law",         ar: "مدونة الشغل",          fr: "Code du Travail",     en: "Labor Law" },
    { href: "/traffic-law",       ar: "مدونة السير",          fr: "Code de la Route",    en: "Traffic Law" },
    { href: "/divorce-law",       ar: "الطلاق",               fr: "Divorce",             en: "Divorce Law" },
    { href: "/inheritance-law",   ar: "الإرث",                fr: "Droit Successoral",   en: "Inheritance Law" },
    { href: "/employee-rights",   ar: "حقوق العامل",          fr: "Droits Salariés",     en: "Employee Rights" },
    { href: "/tenant-rights",     ar: "حقوق المكتري",         fr: "Droits Locataire",    en: "Tenant Rights" },
    { href: "/immigration-law",   ar: "الإقامة والتأشيرة",    fr: "Immigration",         en: "Immigration Law" },
    { href: "/rental-law",        ar: "قانون الكراء",         fr: "Bail & Location",     en: "Rental Law" },
    { href: "/real-estate-law",   ar: "العقار",               fr: "Immobilier",          en: "Real Estate Law" },
    { href: "/commercial-law",    ar: "القانون التجاري",      fr: "Droit Commercial",    en: "Commercial Law" },
    { href: "/business-legal",    ar: "قانون الأعمال",        fr: "Droit des Affaires",  en: "Business Legal" },
    { href: "/tax-legal",         ar: "الضرائب",              fr: "Fiscalité",           en: "Tax Law" },
    { href: "/crypto-law",        ar: "العملات الرقمية",      fr: "Cryptomonnaies",      en: "Crypto Law" },
    { href: "/cybersecurity-law", ar: "الأمن السيبراني",      fr: "Cybersécurité",       en: "Cybersecurity Law" },
];



type Lang = "ar" | "fr" | "en";

function getLabel(item: { ar: string; fr: string; en: string }, lang: string): string {
    return item[lang as Lang] ?? item.en;
}

function NavDropdown({
    label,
    items,
    lang,
    isRtl,
    wide,
}: {
    label: string;
    items: { href: string; ar: string; fr: string; en: string }[];
    lang: string;
    isRtl: boolean;
    wide?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onMouseEnter={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
            >
                {label}
                <svg
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    className={`absolute top-full mt-2 bg-background border border-border rounded-xl shadow-xl shadow-black/20 p-1.5 z-50 animate-reveal-up ${
                        wide ? "w-[440px]" : "w-48"
                    } ${isRtl ? "right-0" : "left-0"}`}
                >
                    {wide ? (
                        <div className="grid grid-cols-2 gap-px">
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150"
                                >
                                    {getLabel(item, lang)}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <>
                            {items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150"
                                >
                                    {getLabel(item, lang)}
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export function Header() {
    const [mobileOpen, setMobileOpen]         = useState(false);
    const [scrolled, setScrolled]             = useState(false);
    const [mobileTopicsOpen, setMobileTopics] = useState(false);


    const { user, isLoading } = useAuth();
    const { t, language }     = useTranslation("landing");
    const { resolvedTheme, toggleTheme } = useTheme();
    const isRtl = language === "ar";

    useEffect(() => {
        let ticking = false;

        const update = () => {
            setScrolled(window.scrollY > 20);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* ── Header bar ── */}
            <header
                className="fixed top-0 inset-x-0 z-50"
            >
                <div
                    className={`transition-all duration-300 ${
                        scrolled
                            ? "bg-background/95 backdrop-blur-xl border-b border-border/60"
                            : "bg-transparent"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="flex items-center justify-between h-16">

                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-3 shrink-0 group">
                                <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                                    <Image
                                        src="/9anon-logo.webp"
                                        alt="9anon"
                                        className="object-cover"
                                        fill
                                        priority
                                        sizes="36px"
                                    />
                                </div>
                                <span className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                                    9anon
                                </span>
                            </Link>

                            {/* Desktop nav */}
                            <nav className="hidden md:flex items-center gap-6">
                                {[
                                    { href: "#features",         key: "nav.features" },
                                    { href: "/about",            key: "nav.about"    },
                                    { href: `/${language}/blog`, key: "nav.blog"     },
                                ].map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    >
                                        {t(item.key)}
                                    </Link>
                                ))}

                                <NavDropdown
                                    label={t("nav.legalTopics")}
                                    items={legalTopics}
                                    lang={language}
                                    isRtl={isRtl}
                                    wide
                                />

                            </nav>

                            {/* Right actions */}
                            <div className="hidden md:flex items-center gap-2">
                                <button
                                    onClick={toggleTheme}
                                    aria-label="Toggle theme"
                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                                >
                                    {resolvedTheme === "dark" ? (
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="4" />
                                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>

                                <LanguageSwitcher />

                                {!isLoading && user ? (
                                    <Link
                                        href="/chat"
                                        className="ml-1 px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity duration-200"
                                    >
                                        {t("nav.goToChat")}
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                                        >
                                            {t("nav.login")}
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity duration-200"
                                        >
                                            {t("nav.getStarted")}
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile controls */}
                            <div className="md:hidden flex items-center gap-1">
                                <button
                                    onClick={toggleTheme}
                                    aria-label="Toggle theme"
                                    className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-all"
                                >
                                    {resolvedTheme === "dark" ? (
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="4" />
                                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                                <LanguageSwitcher />
                                <button
                                    onClick={() => setMobileOpen(!mobileOpen)}
                                    aria-label="Toggle menu"
                                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                        {mobileOpen ? (
                                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                        ) : (
                                            <>
                                                <path d="M4 6h16" strokeLinecap="round" />
                                                <path d="M4 12h12" strokeLinecap="round" />
                                                <path d="M4 18h8"  strokeLinecap="round" />
                                            </>
                                        )}
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            {/* ── Mobile menu ── */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute inset-x-0 top-0 bg-background border-b border-border pt-[72px] pb-6 px-5 max-h-screen overflow-y-auto">
                        <nav className="flex flex-col">
                            {[
                                { href: "#features",         key: "nav.features" },
                                { href: "/about",            key: "nav.about"    },
                                { href: `/${language}/blog`, key: "nav.blog"     },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
                                >
                                    {t(item.key)}
                                </Link>
                            ))}

                            {/* Legal Topics */}
                            <button
                                onClick={() => setMobileTopics((o) => !o)}
                                className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground border-b border-border/40 flex items-center justify-between w-full transition-colors"
                            >
                                {t("nav.legalTopics")}
                                <svg className={`w-4 h-4 transition-transform ${mobileTopicsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {mobileTopicsOpen && (
                                <div className="grid grid-cols-2 gap-px py-2 border-b border-border/40">
                                    {legalTopics.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="py-2 px-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                        >
                                            {getLabel(item, language)}
                                        </Link>
                                    ))}
                                </div>
                            )}



                            <div className="flex flex-col gap-3 pt-5">
                                {!isLoading && user ? (
                                    <Link
                                        href="/chat"
                                        onClick={() => setMobileOpen(false)}
                                        className="py-3 text-sm font-semibold text-center bg-primary text-primary-foreground rounded-lg"
                                    >
                                        {t("nav.goToChat")}
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setMobileOpen(false)}
                                            className="py-3 text-sm font-medium text-center border border-border rounded-lg hover:bg-muted transition-colors"
                                        >
                                            {t("nav.login")}
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setMobileOpen(false)}
                                            className="py-3 text-sm font-semibold text-center bg-primary text-primary-foreground rounded-lg"
                                        >
                                            {t("nav.getStarted")}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
