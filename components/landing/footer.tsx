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
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                            {t("footer.description")}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-8">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-xl glass-premium flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
                                href="mailto:contact@9anonai.com"
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
