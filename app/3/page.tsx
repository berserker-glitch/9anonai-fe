"use client";

/**
 * Landing Page 3: Art Deco / Geometric Luxury
 * 
 * Aesthetic: 1920s glamour, geometric elegance, golden ratios.
 * Ornate frames, fan shapes, sunbursts, chevrons, symmetrical layouts,
 * gold gradient text, elegant line dividers.
 * 
 * @author 9anon Team
 */

import Link from "next/link";
import { useEffect } from "react";

export default function ArtDecoLandingPage() {
    /**
     * Intersection Observer for scroll-triggered reveal animations
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("deco-revealed");
                    }
                });
            },
            { threshold: 0.15 }
        );

        document.querySelectorAll(".deco-animate").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* ============================================
          HERO SECTION - Geometric Elegance
          ============================================ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
                {/* Art Deco Background Pattern */}
                <div className="absolute inset-0 opacity-[0.04]">
                    <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="deco-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                                {/* Fan/Sunburst Element */}
                                <path d="M50 100 L50 50 L0 100 Z" fill="currentColor" opacity="0.5" />
                                <path d="M50 100 L50 50 L100 100 Z" fill="currentColor" opacity="0.5" />
                                <path d="M50 50 L25 100" stroke="currentColor" strokeWidth="0.5" />
                                <path d="M50 50 L75 100" stroke="currentColor" strokeWidth="0.5" />
                                {/* Chevron Lines */}
                                <path d="M0 0 L50 25 L100 0" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#deco-pattern)" />
                    </svg>
                </div>

                {/* Ornate Frame */}
                <div className="absolute inset-8 lg:inset-16 pointer-events-none">
                    {/* Corner Ornaments */}
                    <svg className="absolute top-0 left-0 w-24 h-24 text-gold" viewBox="0 0 100 100">
                        <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" />
                        <path d="M10 10 L30 10 L30 12 L12 12 L12 30 L10 30 Z" fill="currentColor" opacity="0.5" />
                        <circle cx="20" cy="20" r="4" fill="currentColor" />
                    </svg>
                    <svg className="absolute top-0 right-0 w-24 h-24 text-gold rotate-90" viewBox="0 0 100 100">
                        <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" />
                        <path d="M10 10 L30 10 L30 12 L12 12 L12 30 L10 30 Z" fill="currentColor" opacity="0.5" />
                        <circle cx="20" cy="20" r="4" fill="currentColor" />
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-24 h-24 text-gold -rotate-90" viewBox="0 0 100 100">
                        <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" />
                        <path d="M10 10 L30 10 L30 12 L12 12 L12 30 L10 30 Z" fill="currentColor" opacity="0.5" />
                        <circle cx="20" cy="20" r="4" fill="currentColor" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-24 h-24 text-gold rotate-180" viewBox="0 0 100 100">
                        <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="currentColor" />
                        <path d="M10 10 L30 10 L30 12 L12 12 L12 30 L10 30 Z" fill="currentColor" opacity="0.5" />
                        <circle cx="20" cy="20" r="4" fill="currentColor" />
                    </svg>
                    {/* Frame Lines */}
                    <div className="absolute top-0 left-24 right-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="absolute bottom-0 left-24 right-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    <div className="absolute left-0 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
                    <div className="absolute right-0 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
                </div>

                {/* Central Content */}
                <div className="relative text-center px-8 max-w-4xl">
                    {/* Sunburst Decoration Above */}
                    <div className="deco-animate opacity-0 scale-90 transition-all duration-1000 mx-auto w-32 h-16 mb-8">
                        <svg viewBox="0 0 120 60" className="w-full h-full text-gold">
                            <path d="M60 60 L60 10" stroke="currentColor" strokeWidth="2" />
                            <path d="M60 60 L30 15" stroke="currentColor" strokeWidth="1" />
                            <path d="M60 60 L90 15" stroke="currentColor" strokeWidth="1" />
                            <path d="M60 60 L10 30" stroke="currentColor" strokeWidth="0.5" />
                            <path d="M60 60 L110 30" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="60" cy="5" r="4" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Pre-title */}
                    <div className="deco-animate opacity-0 translate-y-4 transition-all duration-700">
                        <span className="inline-flex items-center gap-4 text-sm tracking-[0.4em] uppercase text-muted-foreground">
                            <span className="w-12 h-px bg-gold" />
                            Moroccan Legal AI
                            <span className="w-12 h-px bg-gold" />
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-150 mt-8">
                        <span className="block text-6xl lg:text-8xl xl:text-9xl font-serif tracking-tight">
                            <span className="text-gradient-gold">٩</span>
                            <span className="mx-2">انون</span>
                        </span>
                        <span className="block text-3xl lg:text-4xl font-serif font-light mt-4 tracking-widest uppercase text-muted-foreground">
                            9anon
                        </span>
                    </h1>

                    {/* Art Deco Divider */}
                    <div className="deco-animate opacity-0 scale-x-0 transition-all duration-700 delay-300 my-12 mx-auto max-w-md">
                        <svg viewBox="0 0 400 30" className="w-full h-8 text-gold">
                            <path d="M0 15 L150 15" stroke="currentColor" strokeWidth="1" />
                            <path d="M250 15 L400 15" stroke="currentColor" strokeWidth="1" />
                            <path d="M175 15 L200 0 L225 15 L200 30 Z" fill="currentColor" />
                            <circle cx="200" cy="15" r="4" fill="var(--background)" />
                            <circle cx="160" cy="15" r="2" fill="currentColor" />
                            <circle cx="240" cy="15" r="2" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Tagline */}
                    <p className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-500 text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        Navigate the elegance of Moroccan law with
                        <span className="text-gradient-gold font-medium"> precision</span> and
                        <span className="text-gradient-gold font-medium"> grace</span>
                    </p>

                    {/* CTA Button - Art Deco Style */}
                    <div className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-700 mt-12">
                        <Link
                            href="/chat"
                            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-transparent border-2 border-gold text-gold font-serif tracking-widest uppercase hover:bg-gold hover:text-gold-foreground transition-all duration-300"
                        >
                            {/* Corner Accents */}
                            <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gold" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gold" />
                            <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gold" />
                            <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gold" />

                            <span>Begin Consultation</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================
          FEATURES SECTION - Symmetrical Layout
          ============================================ */}
            <section className="py-32 px-8 bg-muted/20 relative">
                {/* Section Header with Ornate Styling */}
                <div className="text-center mb-20">
                    <div className="deco-animate opacity-0 translate-y-4 transition-all duration-700">
                        <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">Our Virtues</span>
                    </div>
                    <h2 className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-100 mt-4 text-4xl lg:text-5xl font-serif">
                        <span className="text-gradient-gold">Distinguished</span> Features
                    </h2>
                    {/* Ornate Subtitle Divider */}
                    <div className="deco-animate opacity-0 scale-x-0 transition-all duration-700 delay-200 mt-8 mx-auto max-w-sm">
                        <svg viewBox="0 0 300 20" className="w-full h-5 text-gold">
                            <path d="M0 10 L120 10" stroke="currentColor" strokeWidth="1" />
                            <path d="M180 10 L300 10" stroke="currentColor" strokeWidth="1" />
                            <polygon points="150,0 160,10 150,20 140,10" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                {/* Features Grid - Symmetrical 3-Column */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {[
                        {
                            icon: (
                                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                                    <path d="M24 4 L24 44" strokeWidth="1" />
                                    <path d="M12 16 L24 4 L36 16" strokeWidth="1.5" />
                                    <circle cx="24" cy="28" r="8" strokeWidth="1.5" />
                                    <circle cx="24" cy="28" r="3" fill="currentColor" />
                                </svg>
                            ),
                            title: "Legal Mastery",
                            desc: "Comprehensive coverage of Moroccan legal codes and procedures",
                        },
                        {
                            icon: (
                                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                                    <rect x="8" y="8" width="32" height="32" strokeWidth="1.5" />
                                    <path d="M8 8 L24 24 L40 8" strokeWidth="1" />
                                    <path d="M8 40 L24 24 L40 40" strokeWidth="1" />
                                    <circle cx="24" cy="24" r="4" fill="currentColor" />
                                </svg>
                            ),
                            title: "Four Languages",
                            desc: "Arabic, French, English, and Moroccan Darija at your service",
                        },
                        {
                            icon: (
                                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                                    <path d="M24 4 L4 24 L24 44 L44 24 Z" strokeWidth="1.5" />
                                    <path d="M24 12 L12 24 L24 36 L36 24 Z" strokeWidth="1" />
                                    <circle cx="24" cy="24" r="4" fill="currentColor" />
                                </svg>
                            ),
                            title: "Cited Sources",
                            desc: "Every answer backed by official legal references",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="deco-animate opacity-0 translate-y-8 transition-all duration-700 group text-center p-8"
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            {/* Icon with Art Deco Frame */}
                            <div className="relative mx-auto w-24 h-24 flex items-center justify-center mb-6">
                                <div className="absolute inset-0 border border-gold/30 rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                <div className="text-gold group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                            </div>

                            <h3 className="text-xl font-serif text-gradient-gold mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============================================
          QUOTE SECTION - Elegant Statement
          ============================================ */}
            <section className="py-32 px-8 relative overflow-hidden">
                {/* Fan Pattern Background */}
                <div className="absolute inset-0 flex items-end justify-center overflow-hidden opacity-[0.03]">
                    <svg className="w-[150%] h-auto" viewBox="0 0 500 250">
                        {[...Array(12)].map((_, i) => (
                            <path
                                key={i}
                                d={`M250 250 L${250 + Math.cos((i * 15 - 82.5) * Math.PI / 180) * 400} ${250 - Math.sin((i * 15 - 82.5) * Math.PI / 180) * 400}`}
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        ))}
                    </svg>
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Decorative Quote Mark */}
                    <div className="deco-animate opacity-0 scale-90 transition-all duration-700 text-8xl font-serif text-gold/30 leading-none">
                        ❝
                    </div>

                    <blockquote className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-200 text-3xl lg:text-4xl font-serif leading-relaxed -mt-8">
                        Where <span className="text-gradient-gold italic">tradition</span> meets{" "}
                        <span className="text-gradient-emerald italic">innovation</span>,
                        <br />
                        legal wisdom finds its voice.
                    </blockquote>

                    {/* Attribution with Ornate Styling */}
                    <div className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-400 mt-12">
                        <div className="inline-flex items-center gap-4">
                            <span className="w-8 h-px bg-gold" />
                            <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
                                9anon Philosophy
                            </span>
                            <span className="w-8 h-px bg-gold" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
          STATS SECTION - Geometric Display
          ============================================ */}
            <section className="py-24 px-8 bg-primary text-primary-foreground relative overflow-hidden">
                {/* Chevron Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                        <pattern id="chevrons" width="60" height="30" patternUnits="userSpaceOnUse">
                            <path d="M0 30 L30 15 L60 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#chevrons)" />
                    </svg>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "10,000+", label: "Legal Queries Answered" },
                            { value: "99.5%", label: "Accuracy Rate" },
                            { value: "24/7", label: "Always Available" },
                            { value: "4", label: "Languages Supported" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="deco-animate opacity-0 translate-y-4 transition-all duration-700"
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <span className="block text-4xl lg:text-5xl font-serif text-gold">
                                    {stat.value}
                                </span>
                                <span className="block text-sm tracking-widest uppercase opacity-70 mt-2">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          CTA SECTION - Grand Finale
          ============================================ */}
            <section className="py-32 px-8 relative">
                {/* Ornate Border Frame */}
                <div className="max-w-3xl mx-auto relative">
                    {/* Double Frame */}
                    <div className="absolute inset-0 border border-gold/30" />
                    <div className="absolute inset-3 border border-gold/20" />

                    <div className="relative p-12 lg:p-20 text-center">
                        <h2 className="deco-animate opacity-0 translate-y-4 transition-all duration-700 text-4xl lg:text-5xl font-serif mb-6">
                            Begin Your <span className="text-gradient-gold">Journey</span>
                        </h2>

                        <p className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-100 text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
                            Experience the sophistication of AI-powered legal guidance,
                            crafted for the discerning citizen.
                        </p>

                        {/* Ornate Divider */}
                        <div className="deco-animate opacity-0 scale-x-0 transition-all duration-700 delay-200 mb-12 mx-auto max-w-xs">
                            <svg viewBox="0 0 200 20" className="w-full h-5 text-gold">
                                <path d="M0 10 L80 10" stroke="currentColor" strokeWidth="1" />
                                <path d="M120 10 L200 10" stroke="currentColor" strokeWidth="1" />
                                <circle cx="100" cy="10" r="5" fill="currentColor" />
                                <circle cx="85" cy="10" r="2" fill="currentColor" />
                                <circle cx="115" cy="10" r="2" fill="currentColor" />
                            </svg>
                        </div>

                        <Link
                            href="/chat"
                            className="deco-animate opacity-0 translate-y-4 transition-all duration-700 delay-300 inline-flex items-center gap-3 px-12 py-5 bg-gold text-gold-foreground font-serif tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                        >
                            Enter 9anon
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================
          FOOTER - Elegant Minimal
          ============================================ */}
            <footer className="py-12 px-8 border-t border-border">
                <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
                    {/* Logo */}
                    <span className="text-3xl font-serif text-gradient-gold">٩انون</span>

                    {/* Links */}
                    <div className="flex gap-8 text-sm tracking-widest uppercase text-muted-foreground">
                        <Link href="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
                        <Link href="/tos" className="hover:text-gold transition-colors">Terms</Link>
                    </div>

                    {/* Copyright with Ornament */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="w-8 h-px bg-border" />
                        <span>© 2024 9anon</span>
                        <span className="w-8 h-px bg-border" />
                    </div>
                </div>
            </footer>

            {/* Art Deco Page Specific Styles */}
            <style jsx>{`
        .deco-animate.deco-revealed {
          opacity: 1;
          transform: translateY(0) scale(1) scaleX(1);
        }
      `}</style>
        </div>
    );
}
