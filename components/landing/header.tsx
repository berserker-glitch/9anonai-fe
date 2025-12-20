"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isLoading } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25">
                            <span className="text-white font-bold text-lg">9</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            9anon
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </Link>
                        <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </Link>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {!isLoading && user ? (
                            <Link
                                href="/chat"
                                className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                            >
                                Go to Chat
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-accent"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {mobileMenuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
                        <nav className="flex flex-col gap-4">
                            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                                Features
                            </Link>
                            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                                About
                            </Link>
                            <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                                {!isLoading && user ? (
                                    <Link href="/chat" className="px-4 py-2 text-sm font-medium text-center bg-primary text-primary-foreground rounded-xl">
                                        Go to Chat
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login" className="px-4 py-2 text-sm font-medium text-center rounded-xl border border-border hover:bg-accent">
                                            Login
                                        </Link>
                                        <Link href="/register" className="px-4 py-2 text-sm font-medium text-center bg-primary text-primary-foreground rounded-xl">
                                            Get Started
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
