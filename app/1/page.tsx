"use client";

/**
 * Landing Page 1: Editorial/Magazine Style
 * 
 * Aesthetic: High-fashion editorial with asymmetric layouts, dramatic typography,
 * split-screen hero, and vertical text accents. Inspired by premium magazine spreads.
 * 
 * @author 9anon Team
 */

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function EditorialLandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Intersection Observer for scroll-triggered animations
     * Reveals elements as they enter the viewport
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("editorial-revealed");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
        );

        document.querySelectorAll(".editorial-animate").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-background text-foreground overflow-x-hidden"
            style={{
                /* Custom CSS properties for this page's unique animations */
                "--editorial-gold": "oklch(0.75 0.15 85)",
                "--editorial-emerald": "oklch(0.55 0.16 160)",
            } as React.CSSProperties}
        >
            {/* ============================================
          HERO SECTION - Split Screen Editorial Layout
          ============================================ */}
            <section className="relative min-h-screen flex">
                {/* Left Panel - Typography Focus */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-24 relative z-10">
                    {/* Vertical Text Accent */}
                    <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                        <span
                            className="text-xs tracking-[0.3em] text-muted-foreground uppercase"
                            style={{
                                writingMode: "vertical-rl",
                                textOrientation: "mixed",
                                transform: "rotate(180deg)",
                            }}
                        >
                            Moroccan Legal AI • Est. 2024
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-xl ml-auto lg:mr-12">
                        {/* Issue Number - Magazine Style */}
                        <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 mb-8">
                            <span className="inline-flex items-center gap-4">
                                <span className="text-8xl lg:text-9xl font-serif font-bold text-gradient-emerald opacity-20">
                                    01
                                </span>
                                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground border-l border-border pl-4">
                                    Legal<br />Innovation
                                </span>
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                            <span className="block text-5xl lg:text-7xl xl:text-8xl font-serif font-bold leading-[0.9] mb-4">
                                قانون
                            </span>
                            <span className="block text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-muted-foreground leading-tight">
                                Your Legal
                                <br />
                                <span className="text-gradient-gold font-medium italic">
                                    Intelligence
                                </span>
                            </span>
                        </h1>

                        {/* Subhead with Pull Quote Styling */}
                        <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-12 relative">
                            <div className="absolute -left-6 top-0 text-6xl text-primary/20 font-serif">
                                "
                            </div>
                            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed pl-4 border-l-2 border-gold/30">
                                Navigate Moroccan law with AI-powered precision.
                                Instant answers in Arabic, French, English, and Darija.
                            </p>
                        </div>

                        {/* CTA Section */}
                        <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-12 flex flex-wrap items-center gap-6">
                            <Link
                                href="/chat"
                                className="group relative px-8 py-4 bg-primary text-primary-foreground font-medium overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Start Conversation
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                            </Link>
                            <span className="text-sm text-muted-foreground">
                                Free • No registration
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Visual Element */}
                <div className="hidden lg:flex w-1/2 relative bg-muted/30 items-center justify-center overflow-hidden">
                    {/* Geometric Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 400 800">
                            <pattern id="editorial-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M0 0v40M40 0v40M0 0h40M0 40h40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#editorial-grid)" />
                        </svg>
                    </div>

                    {/* Floating Feature Cards - Overlapping */}
                    <div className="relative w-80 h-96">
                        {/* Card 1 */}
                        <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 delay-400 absolute top-0 left-0 w-64 p-6 bg-card border border-border shadow-2xl">
                            <span className="text-5xl font-serif font-bold text-gradient-emerald">01</span>
                            <h3 className="mt-4 font-medium text-lg">Expert Knowledge</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Trained on comprehensive Moroccan legal texts
                            </p>
                        </div>

                        {/* Card 2 - Offset */}
                        <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 delay-500 absolute top-32 left-24 w-64 p-6 bg-card border border-gold/30 shadow-2xl">
                            <span className="text-5xl font-serif font-bold text-gradient-gold">02</span>
                            <h3 className="mt-4 font-medium text-lg">Multilingual</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Arabic, French, English, and Moroccan Darija
                            </p>
                        </div>

                        {/* Card 3 - More Offset */}
                        <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 delay-600 absolute top-64 left-12 w-64 p-6 bg-card border border-border shadow-2xl">
                            <span className="text-5xl font-serif font-bold text-gradient-emerald">03</span>
                            <h3 className="mt-4 font-medium text-lg">Cited Sources</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Every answer includes legal references
                            </p>
                        </div>
                    </div>

                    {/* Decorative Typography */}
                    <div className="absolute bottom-12 right-12 text-right">
                        <span className="text-[12rem] font-serif font-bold text-primary/5 leading-none">
                            ٩
                        </span>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent animate-pulse" />
                </div>
            </section>

            {/* ============================================
          FEATURE SECTION - Magazine Spread Layout
          ============================================ */}
            <section className="py-32 px-8 lg:px-16 relative">
                {/* Section Header - Editorial Style */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="flex items-end justify-between border-b border-border pb-8">
                        <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700">
                            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                Features
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-serif font-bold mt-4">
                                Why <span className="italic text-gradient-gold">9anon</span>?
                            </h2>
                        </div>
                        <span className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 delay-100 text-8xl font-serif font-bold text-muted/30">
                            02
                        </span>
                    </div>
                </div>

                {/* Features Grid - Asymmetric */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Large Feature - Spans 7 columns */}
                    <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700 lg:col-span-7 relative group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-gold/5 p-8 lg:p-12 flex flex-col justify-end relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--primary)_10px,var(--primary)_11px)] opacity-10" />
                            </div>

                            <div className="relative z-10">
                                <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4 block">
                                    Core Expertise
                                </span>
                                <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                                    Comprehensive Legal Coverage
                                </h3>
                                <p className="text-muted-foreground max-w-lg">
                                    From criminal and family law to labor and commercial regulations —
                                    access expert guidance across all major areas of Moroccan law.
                                </p>
                            </div>

                            {/* Hover Reveal */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    </div>

                    {/* Stacked Features - Spans 5 columns */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {[
                            {
                                num: "01",
                                title: "Instant Answers",
                                desc: "Get immediate responses to your legal questions, 24/7",
                            },
                            {
                                num: "02",
                                title: "Private & Secure",
                                desc: "Your conversations are encrypted and never shared",
                            },
                            {
                                num: "03",
                                title: "Always Current",
                                desc: "Updated with the latest legal developments",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className={`editorial-animate opacity-0 translate-y-8 transition-all duration-700`}
                                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                            >
                                <div className="group flex gap-6 p-6 border border-border hover:border-primary/50 transition-colors">
                                    <span className="text-3xl font-serif font-bold text-gradient-emerald group-hover:text-gradient-gold transition-all">
                                        {feature.num}
                                    </span>
                                    <div>
                                        <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          TESTIMONIAL SECTION - Pull Quote Style
          ============================================ */}
            <section className="py-32 bg-muted/30 relative overflow-hidden">
                {/* Large Background Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif font-bold text-muted/20 select-none pointer-events-none whitespace-nowrap">
                    قانون
                </div>

                <div className="relative max-w-5xl mx-auto px-8 text-center">
                    <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700">
                        <span className="text-6xl lg:text-8xl font-serif text-primary/30">"</span>
                        <blockquote className="text-2xl lg:text-4xl font-serif leading-relaxed -mt-8">
                            9anon transformed how I understand my legal rights.
                            <span className="text-gradient-gold italic"> Finally, legal help in my language.</span>
                        </blockquote>
                        <div className="mt-12 flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold" />
                            <div className="text-left">
                                <p className="font-medium">Moroccan User</p>
                                <p className="text-sm text-muted-foreground">Casablanca</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================
          CTA SECTION - Bold Editorial Close
          ============================================ */}
            <section className="py-32 px-8 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="editorial-animate opacity-0 translate-y-8 transition-all duration-700">
                        <h2 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-8">
                            Ready to navigate
                            <br />
                            <span className="text-gradient-gold italic">Moroccan law</span>?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                            Join thousands who trust 9anon for instant, accurate legal guidance.
                        </p>
                        <Link
                            href="/chat"
                            className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-primary-foreground text-lg font-medium hover:bg-gold transition-colors duration-300"
                        >
                            Start Free Consultation
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Footer Line */}
                <div className="absolute bottom-0 left-0 right-0 border-t border-border">
                    <div className="max-w-7xl mx-auto px-8 py-8 flex flex-wrap justify-between items-center gap-4 text-sm text-muted-foreground">
                        <span>© 2024 9anon — Moroccan Legal AI</span>
                        <div className="flex gap-8">
                            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                            <Link href="/tos" className="hover:text-foreground transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Editorial Page Specific Styles */}
            <style jsx>{`
        .editorial-animate.editorial-revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
}
