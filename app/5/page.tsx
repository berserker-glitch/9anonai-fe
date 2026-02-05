"use client";

/**
 * Landing Page 5: Minimalist 3D / Isometric Design
 * 
 * Aesthetic: Clean, modern, subtle depth and dimension.
 * Isometric elements, 3D card transforms, layered shadows for depth,
 * mathematical layouts with golden ratio spacing, wireframe touches.
 * 
 * @author 9anon Team
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Minimalist3DLandingPage() {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const heroRef = useRef<HTMLDivElement>(null);

    /**
     * Track mouse for 3D tilt effects on hero elements
     */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePos({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    /**
     * Intersection Observer for 3D reveal animations
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("iso-revealed");
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll(".iso-animate").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* ============================================
          HERO SECTION - Clean 3D Depth
          ============================================ */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
                style={{ perspective: "1200px" }}
            >
                {/* Isometric Grid Background */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="iso-grid" width="60" height="52" patternUnits="userSpaceOnUse">
                                {/* Isometric grid lines */}
                                <path d="M0 26 L30 0 L60 26" stroke="currentColor" strokeWidth="0.5" fill="none" />
                                <path d="M0 26 L30 52 L60 26" stroke="currentColor" strokeWidth="0.5" fill="none" />
                                <path d="M30 0 L30 52" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#iso-grid)" />
                    </svg>
                </div>

                {/* 3D Floating Elements - Parallax */}
                <div
                    className="absolute top-1/4 left-[15%] w-20 h-20 border border-primary/20"
                    style={{
                        transform: `
              rotateX(${(mousePos.y - 0.5) * 20}deg) 
              rotateY(${(mousePos.x - 0.5) * 20}deg) 
              translateZ(50px)
            `,
                        transformStyle: "preserve-3d",
                    }}
                />
                <div
                    className="absolute top-1/3 right-[20%] w-16 h-16 bg-primary/10"
                    style={{
                        transform: `
              rotateX(${(mousePos.y - 0.5) * -15}deg) 
              rotateY(${(mousePos.x - 0.5) * -15}deg)
              rotateZ(45deg)
              translateZ(30px)
            `,
                        transformStyle: "preserve-3d",
                    }}
                />
                <div
                    className="absolute bottom-1/4 left-[25%] w-12 h-12 border-2 border-gold/30"
                    style={{
                        transform: `
              rotateX(${(mousePos.y - 0.5) * 25}deg) 
              rotateY(${(mousePos.x - 0.5) * 25}deg)
              translateZ(70px)
            `,
                        transformStyle: "preserve-3d",
                    }}
                />

                {/* Main Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                    {/* Minimal Badge */}
                    <div className="iso-animate opacity-0 -translate-y-4 transition-all duration-700 mb-12">
                        <span className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-muted-foreground">
                            <span className="w-8 h-px bg-border" />
                            Moroccan Legal AI
                            <span className="w-8 h-px bg-border" />
                        </span>
                    </div>

                    {/* 3D Text Block */}
                    <div
                        className="iso-animate opacity-0 transition-all duration-1000"
                        style={{
                            transform: `
                rotateX(${(mousePos.y - 0.5) * -5}deg) 
                rotateY(${(mousePos.x - 0.5) * 5}deg)
              `,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <h1 className="text-6xl lg:text-8xl xl:text-9xl font-extralight tracking-tight leading-none">
                            <span className="block">9anon</span>
                            <span className="block text-4xl lg:text-5xl xl:text-6xl mt-4 text-muted-foreground font-light">
                                قانون
                            </span>
                        </h1>
                    </div>

                    {/* Minimal Divider */}
                    <div className="iso-animate opacity-0 scale-x-0 transition-all duration-700 delay-200 my-12 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

                    {/* Subtitle */}
                    <p className="iso-animate opacity-0 translate-y-4 transition-all duration-700 delay-300 text-xl lg:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
                        Legal intelligence, elevated.
                        <br />
                        <span className="text-foreground">Arabic • French • English • Darija</span>
                    </p>

                    {/* 3D CTA Button */}
                    <div className="iso-animate opacity-0 translate-y-4 transition-all duration-700 delay-500 mt-16">
                        <Link
                            href="/chat"
                            className="group relative inline-flex items-center gap-4 px-12 py-5 font-medium"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Button Surface with 3D Effect */}
                            <span
                                className="absolute inset-0 bg-primary rounded-lg transition-transform duration-300 group-hover:translate-z-4"
                                style={{
                                    boxShadow: `
                    0 4px 0 0 oklch(0.35 0.12 160),
                    0 8px 16px -4px rgba(0,0,0,0.2)
                  `,
                                    transform: "translateZ(0)",
                                }}
                            />
                            <span
                                className="absolute inset-0 bg-gold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    boxShadow: `
                    0 4px 0 0 oklch(0.62 0.12 85),
                    0 8px 16px -4px rgba(0,0,0,0.2)
                  `,
                                }}
                            />
                            <span className="relative z-10 text-primary-foreground flex items-center gap-3">
                                Start Consultation
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Minimal Features Row */}
                    <div className="iso-animate opacity-0 translate-y-4 transition-all duration-700 delay-700 mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
                        {[
                            { value: "Free", label: "Always" },
                            { value: "Private", label: "Encrypted" },
                            { value: "24/7", label: "Available" },
                        ].map((item, i) => (
                            <div key={i}>
                                <span className="block text-2xl font-light text-gradient-emerald">{item.value}</span>
                                <span className="block text-xs text-muted-foreground uppercase tracking-widest mt-1">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          FEATURES SECTION - Isometric Cards
          ============================================ */}
            <section className="py-32 px-8 bg-muted/20">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header - Ultra Minimal */}
                    <div className="text-center mb-20">
                        <h2 className="iso-animate opacity-0 translate-y-4 transition-all duration-700 text-4xl lg:text-5xl font-extralight">
                            Precision. Clarity. <span className="text-gradient-gold font-light">Depth.</span>
                        </h2>
                    </div>

                    {/* Isometric Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "⚖️",
                                title: "Legal Expertise",
                                desc: "Comprehensive coverage of Moroccan law",
                            },
                            {
                                icon: "🌍",
                                title: "Multilingual",
                                desc: "Four languages, one seamless experience",
                            },
                            {
                                icon: "⚡",
                                title: "Instant",
                                desc: "Real-time responses, no waiting",
                            },
                            {
                                icon: "📑",
                                title: "Referenced",
                                desc: "Every answer cites official sources",
                            },
                            {
                                icon: "🔒",
                                title: "Secure",
                                desc: "End-to-end encryption, always private",
                            },
                            {
                                icon: "💎",
                                title: "Free",
                                desc: "No cost, no limits, no catch",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="iso-animate opacity-0 translate-y-8 transition-all duration-500 group"
                                style={{
                                    transitionDelay: `${i * 80}ms`,
                                    perspective: "1000px",
                                }}
                            >
                                <div
                                    className="relative p-8 bg-card border border-border rounded-lg transition-all duration-300 hover:-translate-y-2"
                                    style={{
                                        boxShadow: `
                      0 4px 0 0 var(--border),
                      0 8px 0 0 var(--muted),
                      0 16px 32px -8px rgba(0,0,0,0.1)
                    `,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {/* Icon */}
                                    <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </span>

                                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.desc}</p>

                                    {/* Hover Indicator */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          STATS SECTION - 3D Number Display
          ============================================ */}
            <section className="py-32 px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { value: "10K+", label: "Users" },
                            { value: "50K+", label: "Queries" },
                            { value: "99%", label: "Accuracy" },
                            { value: "4", label: "Languages" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="iso-animate opacity-0 translate-y-8 transition-all duration-500"
                                style={{
                                    transitionDelay: `${i * 100}ms`,
                                    perspective: "500px",
                                }}
                            >
                                <div
                                    className="group cursor-default"
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <span
                                        className="block text-5xl lg:text-6xl font-extralight text-gradient-emerald transition-transform duration-300 group-hover:translate-z-4"
                                        style={{
                                            textShadow: `
                        0 2px 0 oklch(0.35 0.12 160 / 0.3),
                        0 4px 0 oklch(0.35 0.12 160 / 0.2),
                        0 6px 0 oklch(0.35 0.12 160 / 0.1)
                      `,
                                        }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mt-3">
                                        {stat.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          QUOTE SECTION - Minimal 3D
          ============================================ */}
            <section className="py-32 px-8 bg-muted/10 relative overflow-hidden">
                {/* Subtle Depth Lines */}
                <div className="absolute inset-0 opacity-[0.02]">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-px bg-foreground"
                            style={{
                                top: `${10 + i * 10}%`,
                                transform: `rotateZ(-2deg) translateY(${i * 2}px)`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative max-w-3xl mx-auto text-center">
                    <blockquote className="iso-animate opacity-0 translate-y-4 transition-all duration-700">
                        <p className="text-3xl lg:text-4xl font-extralight leading-relaxed">
                            "Simple interface.{" "}
                            <span className="text-gradient-gold font-light">Profound</span> understanding."
                        </p>
                    </blockquote>

                    <div className="iso-animate opacity-0 translate-y-4 transition-all duration-700 delay-200 mt-8">
                        <span className="text-sm text-muted-foreground">— The 9anon Philosophy</span>
                    </div>
                </div>
            </section>

            {/* ============================================
          CTA SECTION - Clean 3D Finale
          ============================================ */}
            <section className="py-32 px-8" style={{ perspective: "1000px" }}>
                <div
                    className="max-w-2xl mx-auto text-center"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <h2 className="iso-animate opacity-0 translate-y-4 transition-all duration-700 text-4xl lg:text-5xl font-extralight mb-6">
                        Begin.
                    </h2>

                    <p className="iso-animate opacity-0 translate-y-4 transition-all duration-700 delay-100 text-muted-foreground mb-12">
                        Your legal questions deserve clear answers.
                    </p>

                    <Link
                        href="/chat"
                        className="iso-animate opacity-0 translate-y-4 transition-all duration-700 delay-200 group relative inline-flex items-center gap-3"
                    >
                        <span
                            className="relative px-16 py-6 bg-foreground text-background font-medium rounded-sm transition-transform duration-300 group-hover:-translate-y-1"
                            style={{
                                boxShadow: `
                  0 4px 0 0 var(--primary),
                  0 8px 0 0 var(--gold),
                  0 12px 24px -4px rgba(0,0,0,0.2)
                `,
                            }}
                        >
                            Start Free
                            <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </section>

            {/* ============================================
          FOOTER - Ultra Minimal
          ============================================ */}
            <footer className="py-16 px-8 border-t border-border">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
                    {/* Logo */}
                    <span className="text-2xl font-extralight">
                        9anon<span className="text-muted-foreground">/</span><span className="text-gradient-emerald">قانون</span>
                    </span>

                    {/* Links */}
                    <div className="flex gap-12 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/tos" className="hover:text-foreground transition-colors">Terms</Link>
                    </div>

                    {/* Copyright */}
                    <span className="text-xs text-muted-foreground">© 2024</span>
                </div>
            </footer>

            {/* 3D Page Specific Styles */}
            <style jsx>{`
        .iso-animate.iso-revealed {
          opacity: 1;
          transform: translateY(0) scaleX(1);
        }
        
        .translate-z-4 {
          transform: translateZ(4px);
        }
      `}</style>
        </div>
    );
}
