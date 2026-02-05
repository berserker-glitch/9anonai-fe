"use client";

/**
 * Ultimate Landing Page for 9anon - Moroccan Legal AI
 * 
 * Design Philosophy:
 * - Page 4's flowing organic backgrounds with 3D parallax mouse movement
 * - Page 6's depth, professional legal cards, and law firm aesthetic
 * - Only existing brand colors: emerald (primary) and gold
 * - No custom SVG icons - only standard icons or emojis
 * - Strong scroll-triggered animations with staggered reveals
 * - SEO optimized with proper meta structure
 * 
 * @author 9anon Team
 */

import Link from "next/link";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function UltimateLandingPage() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Initialize component and track mouse position for 3D parallax
     */
    useEffect(() => {
        setMounted(true);

        // Mouse tracking for 3D parallax effect
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };

        // Scroll tracking for depth effects
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /**
     * Intersection Observer for scroll-triggered reveal animations
     */
    useEffect(() => {
        if (!mounted) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
        );

        document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, [mounted]);

    return (
        <>
            {/* SEO Meta Tags */}
            <Head>
                <title>9anon - AI-Powered Moroccan Legal Assistant | Free Legal Consultation</title>
                <meta
                    name="description"
                    content="Get instant, accurate answers to your Moroccan legal questions. 9anon is a free AI-powered legal assistant that speaks Arabic, French, English, and Darija. Private, secure, available 24/7."
                />
                <meta name="keywords" content="Moroccan law, legal AI, قانون مغربي, assistant juridique, legal consultation Morocco, 9anon, مساعد قانوني" />
                <meta property="og:title" content="9anon - AI-Powered Moroccan Legal Assistant" />
                <meta property="og:description" content="Free AI legal assistant for Moroccan law. Get instant answers in Arabic, French, English, or Darija." />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_MA" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="https://9anon.ai" />
            </Head>

            <div
                ref={containerRef}
                className="min-h-screen bg-background text-foreground overflow-x-hidden"
            >
                {/* Page Styles */}
                <style jsx global>{`
                    /* Reveal animation for scroll-triggered elements */
                    .reveal-on-scroll {
                        opacity: 0;
                        transform: translateY(40px);
                        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    
                    .reveal-on-scroll.revealed {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    /* Staggered children reveal */
                    .reveal-on-scroll.revealed .stagger-child {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .stagger-child {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                    
                    .stagger-child:nth-child(1) { transition-delay: 0.1s; }
                    .stagger-child:nth-child(2) { transition-delay: 0.2s; }
                    .stagger-child:nth-child(3) { transition-delay: 0.3s; }
                    .stagger-child:nth-child(4) { transition-delay: 0.4s; }
                    .stagger-child:nth-child(5) { transition-delay: 0.5s; }
                    .stagger-child:nth-child(6) { transition-delay: 0.6s; }
                    
                    /* Professional card styling */
                    .professional-card {
                        background: linear-gradient(
                            145deg,
                            hsl(var(--card)) 0%,
                            hsl(var(--background)) 100%
                        );
                        border: 1px solid hsl(var(--border));
                        box-shadow: 
                            0 4px 6px -1px rgba(0, 0, 0, 0.05),
                            0 10px 15px -3px rgba(0, 0, 0, 0.05);
                        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    
                    .professional-card:hover {
                        border-color: hsl(var(--primary) / 0.3);
                        box-shadow: 
                            0 10px 25px -5px rgba(0, 0, 0, 0.1),
                            0 0 30px hsl(var(--primary) / 0.08);
                        transform: translateY(-6px);
                    }
                    
                    /* Gold accent text */
                    .gold-accent {
                        color: hsl(var(--gold));
                    }
                    
                    /* Emerald gradient text */
                    .emerald-gradient {
                        background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(160, 70%, 35%) 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }
                    
                    /* Gold shimmer effect */
                    .gold-shimmer {
                        background: linear-gradient(
                            90deg,
                            hsl(var(--gold)) 0%,
                            hsl(50, 90%, 55%) 50%,
                            hsl(var(--gold)) 100%
                        );
                        background-size: 200% 100%;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: shimmer 3s linear infinite;
                    }
                    
                    @keyframes shimmer {
                        0% { background-position: -200% 0; }
                        100% { background-position: 200% 0; }
                    }
                    
                    /* 3D layer movement */
                    .parallax-layer {
                        transition: transform 0.15s ease-out;
                        will-change: transform;
                    }
                    
                    /* Floating blob animation */
                    @keyframes blobFloat {
                        0%, 100% { 
                            transform: translateY(0) scale(1);
                            border-radius: 60% 40% 70% 30% / 40% 50% 50% 60%;
                        }
                        33% { 
                            transform: translateY(-15px) scale(1.02);
                            border-radius: 50% 60% 40% 70% / 60% 40% 60% 40%;
                        }
                        66% { 
                            transform: translateY(10px) scale(0.98);
                            border-radius: 40% 60% 50% 50% / 50% 60% 40% 60%;
                        }
                    }
                    
                    .floating-blob {
                        animation: blobFloat 8s ease-in-out infinite;
                    }
                    
                    /* Stats counter animation */
                    @keyframes countUp {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .stat-number {
                        animation: countUp 0.8s ease-out forwards;
                    }
                `}</style>

                {/* =====================================
                    NAVIGATION - Clean Professional
                ===================================== */}
                <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group" aria-label="9anon Home">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-shadow">
                                <span className="text-primary-foreground font-bold text-lg">٩</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-lg tracking-tight">9anon</span>
                                <span className="text-xs text-muted-foreground -mt-0.5">Legal AI</span>
                            </div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                Features
                            </Link>
                            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                How It Works
                            </Link>
                            <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                About
                            </Link>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="/chat"
                            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all"
                        >
                            Start Free
                        </Link>
                    </div>
                </nav>

                {/* =====================================
                    HERO SECTION - 3D Parallax Wave Background (Page 4 Style)
                ===================================== */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0a0f0d]">
                    {/* 3D Parallax Background - Exact Page 4 Layering with Mouse Parallax */}
                    <div className="absolute inset-0 overflow-hidden">

                        {/* Top-right ambient glow */}
                        <div
                            className="parallax-layer absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-60"
                            style={{
                                transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, rgba(34, 197, 94, 0.1) 35%, transparent 65%)',
                            }}
                        />

                        {/* Wave Layer 1 - Backmost - Darkest emerald */}
                        <svg
                            className="parallax-layer absolute bottom-0 left-0 w-[200%] h-[500px]"
                            style={{
                                transform: `translateX(${-scrollY * 0.02 + mousePos.x * -8}px) translateY(${mousePos.y * -3}px)`,
                            }}
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="rgba(34, 197, 94, 0.06)"
                                d="M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,154.7C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                            />
                        </svg>

                        {/* Wave Layer 2 - Middle - Medium emerald */}
                        <svg
                            className="parallax-layer absolute bottom-0 left-0 w-[200%] h-[420px]"
                            style={{
                                transform: `translateX(${scrollY * 0.03 + mousePos.x * -18}px) translateY(${mousePos.y * -8}px)`,
                            }}
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="rgba(34, 197, 94, 0.10)"
                                d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </svg>

                        {/* Wave Layer 3 - Front - Brightest emerald with gradient */}
                        <svg
                            className="parallax-layer absolute bottom-0 left-0 w-[200%] h-[350px]"
                            style={{
                                transform: `translateX(${-scrollY * 0.05 + mousePos.x * -30}px) translateY(${mousePos.y * -12}px)`,
                            }}
                            viewBox="0 0 1440 320"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(34, 197, 94, 0.12)" />
                                    <stop offset="50%" stopColor="rgba(34, 197, 94, 0.18)" />
                                    <stop offset="100%" stopColor="rgba(34, 197, 94, 0.10)" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#waveGradient3)"
                                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,133.3C960,160,1056,192,1152,192C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </svg>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                        {/* Badge */}
                        <div className="reveal-on-scroll mb-8">
                            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/15 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-sm font-medium text-primary">
                                    Moroccan Legal AI Assistant
                                </span>
                            </span>
                        </div>

                        {/* Main Headline - H1 for SEO */}
                        <h1 className="reveal-on-scroll">
                            <span className="block text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight">
                                Legal answers that
                            </span>
                            <span className="block text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight mt-3">
                                <span className="emerald-gradient">understand</span>{" "}
                                <span className="gold-shimmer">Morocco</span>
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="reveal-on-scroll mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Get instant, accurate legal guidance in Arabic, French, English, or Darija.
                            Free, private, and available 24/7.
                        </p>

                        {/* CTA Buttons */}
                        <div className="reveal-on-scroll mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/chat"
                                className="group relative px-10 py-4 bg-gradient-to-r from-primary to-primary/85 text-primary-foreground rounded-full font-medium shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Your Consultation
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </span>
                                {/* Hover effect */}
                                <span className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Link>

                            <Link
                                href="#how-it-works"
                                className="px-10 py-4 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                            >
                                See How It Works
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="reveal-on-scroll mt-14 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                            {[
                                { icon: "✓", text: "100% Free" },
                                { icon: "🔒", text: "Private & Secure" },
                                { icon: "⚡", text: "Instant Answers" },
                            ].map((item, i) => (
                                <span key={i} className="stagger-child flex items-center gap-2">
                                    <span className="text-primary">{item.icon}</span>
                                    {item.text}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <span className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1">
                            <span className="w-1 h-2 bg-current rounded-full" />
                        </span>
                    </div>
                </section>

                {/* =====================================
                    STATS SECTION - Professional Numbers
                ===================================== */}
                <section className="py-20 px-8 border-y border-border/50 bg-muted/30" aria-label="Statistics">
                    <div className="max-w-6xl mx-auto">
                        <div className="reveal-on-scroll grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { number: "15,000+", label: "Legal Texts Analyzed", delay: "0s" },
                                { number: "99.2%", label: "Accuracy Rate", delay: "0.1s" },
                                { number: "24/7", label: "Availability", delay: "0.2s" },
                                { number: "4", label: "Languages Supported", delay: "0.3s" },
                            ].map((stat, i) => (
                                <div key={i} className="stagger-child">
                                    <div className="text-4xl md:text-5xl font-semibold gold-accent stat-number">
                                        {stat.number}
                                    </div>
                                    <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================
                    FEATURES SECTION - Professional Cards
                ===================================== */}
                <section id="features" className="py-32 px-8 relative" aria-labelledby="features-heading">
                    {/* Background blob */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/5 to-gold/5 blur-3xl pointer-events-none floating-blob"
                        style={{ animationDuration: "12s" }}
                    />

                    <div className="relative max-w-6xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <span className="reveal-on-scroll inline-block text-sm font-medium text-primary uppercase tracking-wider">
                                Why Choose 9anon
                            </span>
                            <h2 id="features-heading" className="reveal-on-scroll mt-4 text-4xl lg:text-5xl font-light">
                                Legal expertise at your <span className="gold-shimmer font-medium">command</span>
                            </h2>
                            <p className="reveal-on-scroll mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                Comprehensive Moroccan legal knowledge, powered by advanced AI
                            </p>
                        </div>

                        {/* Feature Cards Grid */}
                        <div className="reveal-on-scroll grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: "⚖️",
                                    title: "Deep Legal Knowledge",
                                    description: "Comprehensive coverage of Moroccan law from the Moudawana to commercial codes, criminal law to property rights.",
                                },
                                {
                                    icon: "🌍",
                                    title: "Multilingual Support",
                                    description: "Communicate in Arabic, French, English, or Moroccan Darija. Our AI understands legal terminology in all four.",
                                },
                                {
                                    icon: "📚",
                                    title: "Cited References",
                                    description: "Every answer includes references to official legal sources, Dahirs, and judicial precedents you can verify.",
                                },
                                {
                                    icon: "⚡",
                                    title: "Instant Responses",
                                    description: "Get accurate answers to complex legal questions in seconds, not days. Available anytime you need guidance.",
                                },
                                {
                                    icon: "🔒",
                                    title: "Private & Secure",
                                    description: "Your conversations are encrypted and never stored or shared. Complete confidentiality guaranteed.",
                                },
                                {
                                    icon: "💚",
                                    title: "Always Free",
                                    description: "Access to legal knowledge is a right, not a privilege. 9anon is and always will be free to use.",
                                },
                            ].map((feature, i) => (
                                <article
                                    key={i}
                                    className="stagger-child professional-card p-8 rounded-2xl group cursor-default"
                                >
                                    <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================
                    HOW IT WORKS - Process Section
                ===================================== */}
                <section id="how-it-works" className="py-32 px-8 bg-muted/20" aria-labelledby="how-heading">
                    <div className="max-w-5xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <span className="reveal-on-scroll inline-block text-sm font-medium text-primary uppercase tracking-wider">
                                Simple Process
                            </span>
                            <h2 id="how-heading" className="reveal-on-scroll mt-4 text-4xl lg:text-5xl font-light">
                                How <span className="emerald-gradient font-medium">9anon</span> works
                            </h2>
                        </div>

                        {/* Process Steps */}
                        <div className="reveal-on-scroll space-y-12">
                            {[
                                {
                                    step: "01",
                                    title: "Ask your question",
                                    description: "Type your legal question in any language — Arabic, French, English, or Darija. Be as specific as you need.",
                                },
                                {
                                    step: "02",
                                    title: "AI analyzes Moroccan law",
                                    description: "Our AI searches through 15,000+ legal texts, including the Constitution, Dahirs, and judicial precedents.",
                                },
                                {
                                    step: "03",
                                    title: "Get cited answers",
                                    description: "Receive clear, actionable guidance with references to official sources you can verify and trust.",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="stagger-child flex gap-8 items-start"
                                >
                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 border border-primary/20 flex items-center justify-center">
                                        <span className="text-2xl font-bold gold-accent">{item.step}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =====================================
                    TESTIMONIAL - Social Proof
                ===================================== */}
                <section className="py-32 px-8 relative overflow-hidden" aria-label="Testimonial">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="reveal-on-scroll">
                            <div className="text-5xl mb-8 opacity-30">❝</div>
                            <blockquote className="text-2xl md:text-3xl font-light leading-relaxed">
                                9anon helped me understand my{" "}
                                <span className="gold-accent font-medium">legal rights</span>{" "}
                                as a tenant in just minutes. What would have cost me hours of research
                                and consultation fees was done instantly — and for free.
                            </blockquote>
                            <div className="mt-10 flex items-center justify-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold" />
                                <div className="text-left">
                                    <cite className="not-italic font-medium">Youssef El Amrani</cite>
                                    <p className="text-sm text-muted-foreground">Small Business Owner, Casablanca</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================
                    ABOUT - Brief Overview
                ===================================== */}
                <section id="about" className="py-32 px-8 bg-muted/20" aria-labelledby="about-heading">
                    <div className="max-w-4xl mx-auto">
                        <div className="reveal-on-scroll professional-card p-12 md:p-16 rounded-3xl text-center relative overflow-hidden">
                            {/* Corner accents */}
                            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-primary/30" />
                            <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-primary/30" />
                            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-primary/30" />
                            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-primary/30" />

                            <span className="inline-block text-sm font-medium text-primary uppercase tracking-wider mb-4">
                                About 9anon
                            </span>
                            <h2 id="about-heading" className="text-3xl md:text-4xl font-light mb-6">
                                Trained on the Complete Corpus of{" "}
                                <span className="gold-shimmer font-medium">Moroccan Legal Texts</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                                From the Constitution to the latest Dahirs, from the Moudawana to commercial
                                regulations — 9anon understands Moroccan law in depth. Our AI provides guidance
                                that would take hours of research, delivered in seconds.
                            </p>
                            <Link
                                href="/chat"
                                className="inline-flex items-center gap-2 px-8 py-4 border border-primary/30 text-primary rounded-full hover:bg-primary/5 transition-colors"
                            >
                                Try It Now — It's Free
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =====================================
                    FINAL CTA - Strong Closing
                ===================================== */}
                <section className="py-32 px-8 relative overflow-hidden" aria-label="Call to Action">
                    {/* Background blobs */}
                    <div
                        className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 to-transparent blur-3xl floating-blob"
                        style={{ animationDelay: "-2s" }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-gold/12 to-transparent blur-3xl floating-blob"
                        style={{ animationDelay: "-5s" }}
                    />

                    <div className="relative max-w-3xl mx-auto text-center">
                        <h2 className="reveal-on-scroll text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                            Ready to navigate{" "}
                            <span className="block mt-2">
                                <span className="emerald-gradient font-medium">Moroccan law</span>?
                            </span>
                        </h2>
                        <p className="reveal-on-scroll text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                            Start your free consultation now. No signup required, no hidden costs.
                        </p>
                        <div className="reveal-on-scroll">
                            <Link
                                href="/chat"
                                className="inline-flex items-center gap-3 px-14 py-5 bg-gradient-to-r from-primary to-gold text-white font-medium rounded-full shadow-2xl shadow-primary/30 hover:shadow-3xl hover:scale-105 transition-all"
                            >
                                Begin Your Consultation
                                <span className="text-lg">→</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* =====================================
                    FOOTER - Clean & Professional
                ===================================== */}
                <footer className="py-16 px-8 border-t border-border/50" role="contentinfo">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">٩</span>
                                </div>
                                <span className="font-semibold">9anon</span>
                            </div>

                            {/* Links */}
                            <nav className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground" aria-label="Footer Navigation">
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/tos" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                                <Link href="/chat" className="hover:text-primary transition-colors">
                                    Start Consultation
                                </Link>
                            </nav>

                            {/* Copyright */}
                            <p className="text-sm text-muted-foreground">
                                © 2024 9anon. Made with 💚 for Morocco.
                            </p>
                        </div>

                        {/* Disclaimer */}
                        <p className="mt-8 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
                            9anon provides legal information, not legal advice. For complex legal matters,
                            please consult with a qualified Moroccan attorney.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
