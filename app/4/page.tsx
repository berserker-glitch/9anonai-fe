"use client";

/**
 * Landing Page 4: Organic / Flowing Design
 * 
 * Aesthetic: Nature-inspired, fluid motion, peaceful and inviting.
 * Blob shapes, flowing wave backgrounds, organic curves, soft rounded edges,
 * liquid morphing effects, gradient transitions, parallax depth.
 * 
 * @author 9anon Team
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function OrganicLandingPage() {
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Track scroll position for parallax effects
     */
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /**
     * Intersection Observer for organic reveal animations
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("organic-revealed");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        document.querySelectorAll(".organic-animate").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-background text-foreground overflow-x-hidden"
        >
            {/* ============================================
          HERO SECTION - Flowing Organic Layout
          ============================================ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Wave Background */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Wave Layer 1 - Slow */}
                    <svg
                        className="absolute bottom-0 w-[200%] text-primary/5"
                        style={{
                            transform: `translateX(${-scrollY * 0.05}px)`,
                        }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="currentColor"
                            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>

                    {/* Wave Layer 2 - Medium */}
                    <svg
                        className="absolute bottom-0 w-[200%] text-gold/5"
                        style={{
                            transform: `translateX(${scrollY * 0.03}px)`,
                        }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="currentColor"
                            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,133.3C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </div>

                {/* Floating Organic Blobs */}
                <div
                    className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-primary/20 to-gold/10 blur-3xl"
                    style={{
                        transform: `translateY(${scrollY * 0.1}px)`,
                        borderRadius: "60% 40% 70% 30% / 40% 50% 50% 60%",
                    }}
                />
                <div
                    className="absolute bottom-40 left-[5%] w-96 h-96 rounded-full bg-gradient-to-br from-gold/15 to-primary/5 blur-3xl"
                    style={{
                        transform: `translateY(${-scrollY * 0.08}px)`,
                        borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
                    }}
                />

                {/* Main Content - Organic Centered Layout */}
                <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
                    {/* Floating Badge */}
                    <div className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 ease-out mb-12">
                        <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-gold/10 border border-primary/20 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm font-medium text-muted-foreground">
                                Moroccan Legal AI
                            </span>
                        </span>
                    </div>

                    {/* Main Headline - Organic Typography */}
                    <h1 className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out">
                        <span className="block text-5xl sm:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                            Legal wisdom that
                        </span>
                        <span className="block text-5xl sm:text-6xl lg:text-7xl font-light leading-tight tracking-tight mt-2">
                            <span className="relative inline-block">
                                <span className="text-gradient-emerald font-medium">flows</span>
                                {/* Organic underline */}
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/40" viewBox="0 0 100 10">
                                    <path d="M0 5 Q25 0, 50 5 T100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                            {" "}naturally
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 delay-400 ease-out mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Experience Moroccan law through an AI that speaks your language—
                        Arabic, French, English, or Darija. Seamless, intuitive, always available.
                    </p>

                    {/* Organic CTA Buttons */}
                    <div className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 delay-600 ease-out mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/chat"
                            className="group relative px-10 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-medium overflow-hidden shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Exploring
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            {/* Ripple effect on hover */}
                            <span className="absolute inset-0 bg-gold/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        </Link>

                        <Link
                            href="#features"
                            className="px-10 py-4 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 delay-800 ease-out mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        {["Free to use", "No signup required", "Private & secure"].map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator - Organic Style */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* ============================================
          FEATURES SECTION - Blob Card Layout
          ============================================ */}
            <section id="features" className="py-32 px-8 relative">
                {/* Organic Background Shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-gold/5 blur-3xl pointer-events-none"
                    style={{ borderRadius: "60% 40% 55% 45% / 45% 60% 40% 55%" }}
                />

                <div className="relative max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <span className="organic-animate opacity-0 translate-y-4 transition-all duration-700 inline-block text-sm font-medium text-primary uppercase tracking-wider">
                            Why Choose 9anon
                        </span>
                        <h2 className="organic-animate opacity-0 translate-y-4 transition-all duration-700 delay-100 mt-4 text-4xl lg:text-5xl font-light">
                            Built for <span className="text-gradient-gold font-medium">harmony</span>
                        </h2>
                    </div>

                    {/* Organic Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                ),
                                title: "Deep Legal Knowledge",
                                desc: "Comprehensive understanding of Moroccan law from criminal to family codes",
                                gradient: "from-primary/20 to-primary/5",
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                ),
                                title: "Speaks Your Language",
                                desc: "Fluent in Arabic, French, English, and Moroccan Darija",
                                gradient: "from-gold/20 to-gold/5",
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: "Instant Responses",
                                desc: "Get answers to your legal questions in real-time, 24/7",
                                gradient: "from-primary/20 to-gold/10",
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                ),
                                title: "Cited References",
                                desc: "Every answer includes links to official legal sources",
                                gradient: "from-gold/20 to-primary/10",
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                                title: "Private & Secure",
                                desc: "Your conversations are encrypted and never shared",
                                gradient: "from-primary/15 to-primary/5",
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                ),
                                title: "Free Forever",
                                desc: "Access to legal knowledge should be a right, not a privilege",
                                gradient: "from-gold/15 to-gold/5",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="organic-animate opacity-0 translate-y-8 transition-all duration-700 group"
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div
                                    className={`relative p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-colors overflow-hidden`}
                                    style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
                                >
                                    {/* Floating decoration */}
                                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-xl group-hover:scale-150 transition-transform duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-background/80 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          TESTIMONIAL SECTION - Flowing Quote
          ============================================ */}
            <section className="py-32 px-8 relative overflow-hidden">
                {/* Wave Decoration */}
                <svg
                    className="absolute top-0 left-0 w-full text-muted/20"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="currentColor"
                        d="M0,0L120,10.7C240,21,480,43,720,42.7C960,43,1200,21,1320,10.7L1440,0L1440,100L1320,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"
                    />
                </svg>

                <div className="relative max-w-4xl mx-auto text-center pt-16">
                    <blockquote className="organic-animate opacity-0 translate-y-8 transition-all duration-1000">
                        <p className="text-3xl lg:text-4xl font-light leading-relaxed text-foreground">
                            "9anon made me feel empowered. For the first time, I understood my{" "}
                            <span className="text-gradient-gold font-medium">legal rights</span>{" "}
                            without needing a law degree."
                        </p>
                    </blockquote>

                    <div className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 delay-200 mt-12 flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold" />
                        <div className="text-left">
                            <p className="font-medium">Sarah M.</p>
                            <p className="text-sm text-muted-foreground">Small Business Owner, Rabat</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Wave */}
                <svg
                    className="absolute bottom-0 left-0 w-full text-muted/20 rotate-180"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="currentColor"
                        d="M0,0L120,10.7C240,21,480,43,720,42.7C960,43,1200,21,1320,10.7L1440,0L1440,100L1320,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"
                    />
                </svg>
            </section>

            {/* ============================================
          CTA SECTION - Organic Finale
          ============================================ */}
            <section className="py-32 px-8 relative overflow-hidden">
                {/* Flowing Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-gold/10" />

                {/* Organic Blob Shapes */}
                <div
                    className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent blur-3xl"
                    style={{ borderRadius: "70% 30% 30% 70% / 60% 40% 60% 40%" }}
                />
                <div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-gold/20 to-transparent blur-3xl"
                    style={{ borderRadius: "30% 70% 70% 30% / 40% 60% 40% 60%" }}
                />

                <div className="relative max-w-3xl mx-auto text-center">
                    <h2 className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 text-4xl lg:text-5xl font-light mb-6">
                        Ready to{" "}
                        <span className="relative inline-block">
                            <span className="text-gradient-emerald font-medium">navigate</span>
                            <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/40" viewBox="0 0 100 8">
                                <path d="M0 4 Q25 0, 50 4 T100 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        {" "}Moroccan law?
                    </h2>

                    <p className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 delay-100 text-xl text-muted-foreground mb-12">
                        Start your journey to legal clarity today. It's free, private, and available in your language.
                    </p>

                    <Link
                        href="/chat"
                        className="organic-animate opacity-0 translate-y-8 transition-all duration-1000 delay-200 inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-primary to-gold text-white font-medium rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 transition-all"
                    >
                        Begin Your Consultation
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ============================================
          FOOTER - Soft Organic Style
          ============================================ */}
            <footer className="py-16 px-8 bg-muted/30 relative overflow-hidden">
                {/* Subtle Wave Top Border */}
                <svg
                    className="absolute top-0 left-0 w-full text-background"
                    viewBox="0 0 1440 30"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="currentColor"
                        d="M0,30L120,25C240,20,480,10,720,10C960,10,1200,20,1320,25L1440,30L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
                    />
                </svg>

                <div className="relative max-w-6xl mx-auto text-center pt-8">
                    {/* Logo */}
                    <span className="text-3xl font-light">
                        <span className="text-gradient-emerald">9</span>anon
                    </span>

                    {/* Links */}
                    <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/tos" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>

                    {/* Copyright */}
                    <p className="mt-8 text-xs text-muted-foreground">
                        © 2024 9anon. Made with ❤️ for Morocco's legal community.
                    </p>
                </div>
            </footer>

            {/* Organic Page Specific Styles */}
            <style jsx>{`
        .organic-animate.organic-revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </div>
    );
}
