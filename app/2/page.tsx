"use client";

/**
 * Landing Page 2: Brutalist/Raw Design
 * 
 * Aesthetic: Bold, unapologetic, raw power with industrial feel.
 * Massive typography, harsh geometric shapes, high contrast, intentional
 * misalignment for visual tension, glitch-inspired effects.
 * 
 * @author 9anon Team
 */

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BrutalistLandingPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    /**
     * Track mouse position for interactive distortion effects
     */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
            {/* ============================================
          HERO SECTION - Massive Typography Block
          ============================================ */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
                {/* Harsh Grid Background */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="w-full h-full" style={{
                        backgroundImage: `
              linear-gradient(90deg, currentColor 1px, transparent 1px),
              linear-gradient(180deg, currentColor 1px, transparent 1px)
            `,
                        backgroundSize: "80px 80px",
                    }} />
                </div>

                {/* Offset Border Frame - Intentionally Misaligned */}
                <div className="absolute top-8 left-8 right-12 bottom-12 border-2 border-border pointer-events-none" />
                <div className="absolute top-12 left-12 right-8 bottom-8 border border-primary/30 pointer-events-none" />

                {/* Main Content */}
                <div className="relative px-8 lg:px-16 py-24">
                    {/* Glitch Header Label */}
                    <div className="mb-8 relative inline-block">
                        <span className="text-xs tracking-[0.5em] uppercase font-mono border border-border px-4 py-2 inline-block">
                            Moroccan Legal AI
                        </span>
                        {/* Glitch shadow */}
                        <span className="absolute top-[2px] left-[2px] text-xs tracking-[0.5em] uppercase font-mono text-primary opacity-50 -z-10 px-4 py-2">
                            Moroccan Legal AI
                        </span>
                    </div>

                    {/* MASSIVE Typography */}
                    <div className="relative">
                        <h1
                            className="text-[15vw] lg:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter"
                            style={{
                                transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
                            }}
                        >
                            <span className="block text-foreground">9ANON</span>
                            <span className="block text-transparent" style={{
                                WebkitTextStroke: "2px var(--primary)",
                            }}>
                                قانون
                            </span>
                        </h1>

                        {/* Offset Duplicate - Glitch Effect */}
                        <div className="absolute top-2 left-2 -z-10 opacity-20 pointer-events-none select-none">
                            <span className="text-[15vw] lg:text-[12vw] font-black uppercase leading-[0.8] tracking-tighter text-gold block">
                                9ANON
                            </span>
                        </div>
                    </div>

                    {/* Stark Description Block */}
                    <div className="mt-12 max-w-xl">
                        <div className="border-l-4 border-primary pl-6">
                            <p className="text-lg lg:text-xl font-mono uppercase tracking-wide">
                                Raw. Unfiltered. Legal Intelligence.
                            </p>
                            <p className="mt-4 text-muted-foreground">
                                No fluff. No jargon. Just answers to your legal questions in
                                Arabic, French, English, or Darija.
                            </p>
                        </div>
                    </div>

                    {/* Brutalist CTA Buttons */}
                    <div className="mt-16 flex flex-wrap gap-4">
                        <Link
                            href="/chat"
                            className="group relative px-12 py-5 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-200"
                        >
                            <span className="relative z-10">Ask Now →</span>
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary-foreground group-hover:border-primary transition-colors" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary-foreground group-hover:border-primary transition-colors" />
                        </Link>

                        <Link
                            href="#info"
                            className="px-12 py-5 bg-transparent text-foreground font-mono uppercase tracking-wider text-sm border-2 border-border hover:border-gold hover:text-gold transition-all duration-200"
                        >
                            Learn More
                        </Link>
                    </div>

                    {/* Stats Row - Raw Numbers */}
                    <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
                        {[
                            { value: "10K+", label: "USERS" },
                            { value: "50K+", label: "QUERIES" },
                            { value: "99%", label: "UPTIME" },
                            { value: "4", label: "LANGUAGES" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-background p-6 text-center">
                                <span className="block text-4xl lg:text-5xl font-black text-gradient-emerald">
                                    {stat.value}
                                </span>
                                <span className="block text-xs font-mono tracking-widest text-muted-foreground mt-2">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Harsh Scroll Indicator */}
                <div className="absolute bottom-8 right-8 font-mono text-xs tracking-widest uppercase flex items-center gap-4">
                    <span>Scroll</span>
                    <div className="w-8 h-px bg-foreground" />
                </div>
            </section>

            {/* ============================================
          FEATURES SECTION - High Contrast Blocks
          ============================================ */}
            <section id="info" className="relative">
                {/* Section Header - Harsh Typography */}
                <div className="bg-primary text-primary-foreground py-4 px-8 lg:px-16">
                    <span className="font-mono text-xs tracking-[0.3em] uppercase">
                        002 — Features
                    </span>
                </div>

                {/* Alternating High-Contrast Blocks */}
                <div className="divide-y-2 divide-border">
                    {[
                        {
                            num: "01",
                            title: "LEGAL EXPERTISE",
                            desc: "Trained on Moroccan Penal Code, Family Code, Labor Law, Commercial Code, and Constitutional Law.",
                            dark: false,
                        },
                        {
                            num: "02",
                            title: "MULTILINGUAL",
                            desc: "Seamless communication in العربية, Français, English, and الدارجة المغربية.",
                            dark: true,
                        },
                        {
                            num: "03",
                            title: "CITED SOURCES",
                            desc: "Every response includes references to specific legal articles and documents.",
                            dark: false,
                        },
                        {
                            num: "04",
                            title: "ENCRYPTED",
                            desc: "Your conversations are private. No data sharing. GDPR compliant.",
                            dark: true,
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className={`group relative py-16 lg:py-24 px-8 lg:px-16 ${feature.dark ? "bg-foreground text-background" : "bg-background"
                                } hover:bg-primary hover:text-primary-foreground transition-colors duration-300`}
                        >
                            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
                                {/* Number */}
                                <span className={`text-8xl lg:text-9xl font-black ${feature.dark ? "text-muted" : "text-muted/30"
                                    } group-hover:text-primary-foreground/20 transition-colors`}>
                                    {feature.num}
                                </span>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-3xl lg:text-5xl font-black uppercase tracking-tight mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className={`text-lg ${feature.dark ? "text-muted" : "text-muted-foreground"
                                        } group-hover:text-primary-foreground/80 max-w-2xl transition-colors`}>
                                        {feature.desc}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <svg
                                    className="w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============================================
          QUOTE SECTION - Raw Statement
          ============================================ */}
            <section className="py-32 px-8 lg:px-16 bg-muted/30 relative">
                {/* Harsh Corner Markers */}
                <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-primary" />
                <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-gold" />

                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-4xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight tracking-tight">
                        Legal help shouldn't require a{" "}
                        <span className="text-transparent" style={{ WebkitTextStroke: "2px var(--gold)" }}>
                            law degree
                        </span>
                        {" "}to understand.
                    </p>
                </div>
            </section>

            {/* ============================================
          CTA SECTION - Final Brutalist Push
          ============================================ */}
            <section className="relative bg-primary text-primary-foreground py-32 overflow-hidden">
                {/* Large Background Number */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[40rem] font-black opacity-5 pointer-events-none select-none leading-none">
                    ٩
                </div>

                <div className="relative max-w-4xl mx-auto px-8 lg:px-16">
                    <div className="border-4 border-primary-foreground/20 p-8 lg:p-16">
                        <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight mb-6">
                            Stop Guessing.<br />Start Knowing.
                        </h2>
                        <p className="text-xl text-primary-foreground/70 mb-12 max-w-xl">
                            Your legal questions deserve real answers. Get them now, free.
                        </p>
                        <Link
                            href="/chat"
                            className="inline-block px-16 py-6 bg-background text-foreground font-mono uppercase tracking-widest text-sm hover:bg-gold hover:text-gold-foreground transition-colors border-4 border-background hover:border-gold"
                        >
                            Start Conversation →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================================
          FOOTER - Minimal Brutalist
          ============================================ */}
            <footer className="bg-foreground text-background py-8 px-8 lg:px-16">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
                    <span className="font-mono text-xs tracking-widest uppercase">
                        9anon © 2024
                    </span>
                    <div className="flex gap-8 font-mono text-xs tracking-widest uppercase">
                        <Link href="/privacy" className="hover:text-gold transition-colors">
                            Privacy
                        </Link>
                        <Link href="/tos" className="hover:text-gold transition-colors">
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
