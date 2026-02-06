"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

export function Footer() {
    const { t } = useTranslation("landing");

    return (
        <footer className="relative border-t border-border/30 bg-muted/20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dots opacity-10" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
                    {/* Brand */}
                    <div className="md:col-span-5 lg:col-span-6">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
                                <img src="/9anon-logo.png" alt="9anon Logo" className="w-full h-full object-cover" />
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
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                            {t("footer.description")}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-8">
                            <a
                                href="https://web.facebook.com/profile.php?id=61587241558455"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/9anonai/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://x.com/9anonAi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors duration-300"
                                aria-label="X (Twitter)"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/9anon-ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-colors duration-300"
                                aria-label="GitHub"
                            >
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-3 lg:col-span-3">
                        <h3 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-foreground">
                            {t("footer.product")}
                        </h3>
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="#features"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                            >
                                {t("footer.features")}
                            </Link>
                            <Link
                                href="/blog"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                            >
                                {t("footer.blog")}
                            </Link>
                            <Link
                                href="#about"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                            >
                                {t("footer.howItWorks")}
                            </Link>
                            <Link
                                href="/chat"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                            >
                                {t("footer.startChat")}
                            </Link>
                        </nav>
                    </div>

                    <div className="md:col-span-3 lg:col-span-3">
                        <h3 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-foreground">
                            {t("footer.legal")}
                        </h3>
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/privacy"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                            >
                                {t("footer.privacy")}
                            </Link>
                            <Link
                                href="/tos"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                            >
                                {t("footer.terms")}
                            </Link>
                            <Link
                                href="mailto:9anonai@gmail.com"
                                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                            >
                                {t("footer.contact")}
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        {t("footer.copyright")}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {t("footer.madeWith")}
                        <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {t("footer.inMorocco")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
