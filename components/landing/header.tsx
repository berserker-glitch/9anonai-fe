"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/language-context";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, isLoading } = useAuth();
    const { t } = useTranslation("landing");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                            <span className="text-primary-foreground font-display font-bold text-xl">٩</span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-display font-semibold tracking-tight">
                                9anon
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium -mt-0.5">
                                قانون
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        {[
                            { href: "#features", key: "nav.features" },
                            { href: "#about", key: "nav.about" },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2 group"
                            >
                                {t(item.key)}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-gold group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Buttons + Language Switcher */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        {!isLoading && user ? (
                            <Link
                                href="/chat"
                                className="btn-premium px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                            >
                                {t("nav.goToChat")}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                                >
                                    {t("nav.login")}
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn-premium px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                                >
                                    {t("nav.getStarted")}
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageSwitcher />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 rounded-xl hover:bg-accent/50 transition-colors duration-300"
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
                    <div className="md:hidden py-6 border-t border-border/30 animate-reveal-up">
                        <nav className="flex flex-col gap-1">
                            <Link
                                href="#features"
                                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t("nav.features")}
                            </Link>
                            <Link
                                href="#about"
                                className="py-3 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-xl transition-all duration-300"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t("nav.about")}
                            </Link>
                            <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-border/30">
                                {!isLoading && user ? (
                                    <Link
                                        href="/chat"
                                        className="py-3 text-sm font-semibold text-center bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg"
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
                                            className="py-3 text-sm font-semibold text-center bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg"
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
