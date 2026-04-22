"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";
import { useTheme } from "@/components/providers/theme-provider";

/** Topics shown in the "Legal Topics" dropdown */
const legalTopics = [
    { href: "/family-law",       ar: "مدونة الأسرة",       fr: "Droit de la Famille", en: "Family Law" },
    { href: "/labor-law",        ar: "مدونة الشغل",         fr: "Code du Travail",     en: "Labor Law" },
    { href: "/traffic-law",      ar: "مدونة السير",         fr: "Code de la Route",    en: "Traffic Law" },
    { href: "/divorce-law",      ar: "الطلاق",              fr: "Divorce",             en: "Divorce Law" },
    { href: "/inheritance-law",  ar: "الإرث",               fr: "Droit Successoral",   en: "Inheritance Law" },
    { href: "/employee-rights",  ar: "حقوق العامل",         fr: "Droits Salariés",     en: "Employee Rights" },
    { href: "/tenant-rights",    ar: "حقوق المكتري",        fr: "Droits Locataire",    en: "Tenant Rights" },
    { href: "/immigration-law",  ar: "الإقامة والتأشيرة",   fr: "Immigration",         en: "Immigration Law" },
    { href: "/rental-law",       ar: "قانون الكراء",        fr: "Bail & Location",     en: "Rental Law" },
    { href: "/real-estate-law",  ar: "العقار",              fr: "Immobilier",          en: "Real Estate Law" },
    { href: "/commercial-law",   ar: "القانون التجاري",     fr: "Droit Commercial",    en: "Commercial Law" },
    { href: "/business-legal",   ar: "قانون الأعمال",       fr: "Droit des Affaires",  en: "Business Legal" },
    { href: "/tax-legal",        ar: "الضرائب",             fr: "Fiscalité",           en: "Tax Law" },
    { href: "/crypto-law",       ar: "العملات الرقمية",     fr: "Cryptomonnaies",      en: "Crypto Law" },
    { href: "/cybersecurity-law",ar: "الأمن السيبراني",     fr: "Cybersécurité",       en: "Cybersecurity Law" },
];

/** Tools shown in the "Tools" dropdown */
const tools = [
    { href: "/calculators/inheritance", ar: "حاسبة الإرث",          fr: "Calculateur d'Héritage", en: "Inheritance Calculator" },
    { href: "/calculators/income-tax",  ar: "حاسبة الضريبة على الدخل", fr: "Calculateur IR",         en: "Income Tax Calculator" },
    { href: "/calculators/rent-increase",ar: "حاسبة الزيادة في الكراء", fr: "Calculateur Loyer",      en: "Rent Increase Calculator" },
];

type Lang = "ar" | "fr" | "en";

function getLabel(item: { ar: string; fr: string; en: string }, lang: string): string {
    return item[lang as Lang] ?? item.en;
}

/** Simple dropdown component */
function NavDropdown({
    label,
    items,
    lang,
    isRtl,
}: {
    label: string;
    items: { href: string; ar: string; fr: string; en: string }[];
    lang: string;
    isRtl: boolean;
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
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 flex items-center gap-1 group"
                aria-expanded={open}
            >
                {label}
                <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-[width] duration-300" />
            </button>

            {open && (
                <div
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    className={`absolute top-full mt-1 w-56 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/20 p-2 z-50 animate-reveal-up ${isRtl ? "right-0" : "left-0"}`}
                >
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-200"
                        >
                            {getLabel(item, lang)}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(true);
    const [mobileTopicsOpen, setMobileTopicsOpen] = useState(false);
    const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
    const { user, isLoading } = useAuth();
    const { t, language } = useTranslation("landing");
    const { resolvedTheme, toggleTheme } = useTheme();
    const isRtl = language === "ar";

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHeaderVisible(false);
            } else {
                setHeaderVisible(true);
            }

            setScrolled(currentScrollY > 20);
            lastScrollY = currentScrollY;
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg'
            : 'bg-transparent'
            } ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-[box-shadow,transform] duration-300 group-hover:scale-105">
                            <Image
                                src="/9anon-logo.webp"
                                alt="9anon Logo"
                                className="object-cover"
                                fill
                                priority
                                sizes="40px"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-display font-semibold tracking-tight group-hover:text-gradient-emerald transition-colors duration-300">
                                9anon
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium -mt-0.5 group-hover:text-primary transition-colors duration-300">
                                قانون
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {/* Static links */}
                        {[
                            { href: "#features", key: "nav.features" },
                            { href: "/about", key: "nav.about" },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 group"
                            >
                                {t(item.key)}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-[width] duration-300" />
                            </Link>
                        ))}

                        {/* Blog link */}
                        <Link
                            href={`/${language}/blog`}
                            className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 group"
                        >
                            {t("nav.blog")}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-[width] duration-300" />
                        </Link>

                        {/* Legal Topics dropdown */}
                        <NavDropdown
                            label={t("nav.legalTopics")}
                            items={legalTopics}
                            lang={language}
                            isRtl={isRtl}
                        />

                        {/* Tools dropdown */}
                        <NavDropdown
                            label={t("nav.tools")}
                            items={tools}
                            lang={language}
                            isRtl={isRtl}
                        />
                    </nav>

                    {/* Auth Buttons + Language Switcher */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-300"
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === "dark" ? (
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
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
                                className="btn-premium px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-[transform,box-shadow] duration-300"
                            >
                                {t("nav.goToChat")}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 hover:scale-105"
                                >
                                    {t("nav.login")}
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn-premium px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-[transform,box-shadow] duration-300"
                                >
                                    {t("nav.getStarted")}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-accent/50 transition-all"
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === "dark" ? (
                                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                        <LanguageSwitcher />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 rounded-xl hover:bg-accent/50 transition-colors duration-300 hover:scale-105"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                {mobileMenuOpen ? (
                                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                ) : (
                                    <>
                                        <path d="M4 7h16" strokeLinecap="round" />
                                        <path d="M4 12h12" strokeLinecap="round" />
                                        <path d="M4 17h8" strokeLinecap="round" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-border/30 animate-reveal-up max-h-[80vh] overflow-y-auto">
                        <nav className="flex flex-col gap-1">
                            <Link
                                href="#features"
                                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t("nav.features")}
                            </Link>
                            <Link
                                href="/about"
                                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t("nav.about")}
                            </Link>
                            <Link
                                href={`/${language}/blog`}
                                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t("nav.blog")}
                            </Link>

                            {/* Mobile Legal Topics accordion */}
                            <button
                                onClick={() => setMobileTopicsOpen((o) => !o)}
                                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-300 flex items-center justify-between w-full text-left"
                            >
                                {t("nav.legalTopics")}
                                <svg className={`w-3.5 h-3.5 transition-transform ${mobileTopicsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {mobileTopicsOpen && (
                                <div className="ml-4 flex flex-col gap-0.5 border-l border-border/40 pl-3">
                                    {legalTopics.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-200"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {getLabel(item, language)}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Mobile Tools accordion */}
                            <button
                                onClick={() => setMobileToolsOpen((o) => !o)}
                                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-300 flex items-center justify-between w-full text-left"
                            >
                                {t("nav.tools")}
                                <svg className={`w-3.5 h-3.5 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {mobileToolsOpen && (
                                <div className="ml-4 flex flex-col gap-0.5 border-l border-border/40 pl-3">
                                    {tools.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="py-2 px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-200"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {getLabel(item, language)}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-border/30">
                                {!isLoading && user ? (
                                    <Link
                                        href="/chat"
                                        className="py-3 text-sm font-semibold text-center bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        {t("nav.goToChat")}
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="py-3 text-sm font-medium text-center rounded-xl border border-border hover:bg-accent/50 transition-all duration-300"
                                        >
                                            {t("nav.login")}
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="py-3 text-sm font-semibold text-center bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            {t("nav.getStarted")}
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
