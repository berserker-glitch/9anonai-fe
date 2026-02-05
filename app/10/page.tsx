"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/**
 * Landing Page 10: Clean Product Showcase Style
 * 
 * Design Philosophy:
 * - Apple-inspired minimal layout
 * - Massive impact typography (hero text)
 * - Scroll-triggered section reveals
 * - 3D product mockup presentations
 * - Sharp shadows and depth layers
 * - Focused single-column flow
 * 
 * Target Aesthetic: Apple product page / premium SaaS
 */
export default function LandingPage10() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const sectionsRef = useRef<NodeListOf<Element> | null>(null);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // IntersectionObserver for scroll reveals
        sectionsRef.current = document.querySelectorAll(".reveal-section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
        );

        sectionsRef.current.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#1d1d1f] overflow-hidden">
            {/* Custom Styles */}
            <style jsx global>{`
        /* Reveal animation */
        .reveal-section {
          opacity: 0;
          transform: translateY(60px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .reveal-section.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Staggered children */
        .reveal-section.revealed .reveal-child {
          opacity: 1;
          transform: translateY(0);
        }
        
        .reveal-child {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .reveal-child:nth-child(1) { transition-delay: 0.1s; }
        .reveal-child:nth-child(2) { transition-delay: 0.2s; }
        .reveal-child:nth-child(3) { transition-delay: 0.3s; }
        .reveal-child:nth-child(4) { transition-delay: 0.4s; }
        
        /* Gradient text */
        .gradient-primary {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(160, 80%, 35%) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Product card shadow */
        .product-shadow {
          box-shadow: 
            0 50px 100px -20px rgba(0, 0, 0, 0.15),
            0 30px 60px -30px rgba(0, 0, 0, 0.2);
        }
        
        /* Floating mockup */
        @keyframes floatMockup {
          0%, 100% { transform: translateY(0) rotateX(5deg) rotateY(-5deg); }
          50% { transform: translateY(-15px) rotateX(5deg) rotateY(-5deg); }
        }
        
        .float-mockup {
          animation: floatMockup 6s ease-in-out infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        /* Clean button */
        .btn-clean {
          background: #1d1d1f;
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-clean:hover {
          background: #424245;
          transform: scale(1.02);
        }
        
        /* Secondary button */
        .btn-secondary {
          background: transparent;
          color: #1d1d1f;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        
        /* Feature number */
        .feature-number {
          background: linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, transparent 50%);
        }
      `}</style>

            {/* Navigation - Clean and minimal */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-5 bg-[#fafafa]/80 backdrop-blur-xl border-b border-black/5">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">٩</span>
                        </div>
                        <span className="font-semibold text-lg">9anon</span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {["Features", "Pricing", "About", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-sm text-[#1d1d1f]/60 hover:text-[#1d1d1f] transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link
                        href="/chat"
                        className="btn-clean px-5 py-2.5 text-sm font-medium rounded-full"
                    >
                        Try Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section - Massive Typography */}
            <section className="relative min-h-screen flex items-center justify-center px-8 pt-24">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Pre-headline */}
                    <div className="reveal-section mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm text-primary font-medium">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            Moroccan Legal AI
                        </span>
                    </div>

                    {/* Main headline - MASSIVE */}
                    <h1 className="reveal-section text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.95] tracking-tight mb-8">
                        <span className="block">Legal answers.</span>
                        <span className="block gradient-primary">In seconds.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="reveal-section text-xl md:text-2xl text-[#1d1d1f]/50 max-w-2xl mx-auto leading-relaxed font-light mb-12">
                        The most advanced AI for Moroccan law. Ask anything, get accurate answers instantly.
                    </p>

                    {/* CTA Buttons */}
                    <div className="reveal-section flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/chat"
                            className="btn-clean px-8 py-4 text-base font-medium rounded-full"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="#demo"
                            className="btn-secondary px-8 py-4 text-base font-medium rounded-full flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Watch Demo
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="w-6 h-10 border-2 border-black/10 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-black/20 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Product Showcase - 3D Mockup */}
            <section id="demo" className="relative py-32 px-8 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="reveal-section text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                            See it in action
                        </h2>
                        <p className="text-lg text-[#1d1d1f]/50">
                            A glimpse of the power at your fingertips
                        </p>
                    </div>

                    {/* 3D Mockup */}
                    <div className="reveal-section relative mx-auto max-w-4xl">
                        <div className="float-mockup">
                            <div className="product-shadow bg-white rounded-2xl p-6 border border-black/5">
                                {/* Browser chrome */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                                    </div>
                                    <div className="flex-1 bg-gray-100 rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center">
                                        9anon.ai/chat
                                    </div>
                                </div>

                                {/* Chat interface mockup */}
                                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                    {/* User message */}
                                    <div className="flex justify-end">
                                        <div className="bg-primary text-white px-4 py-3 rounded-2xl rounded-br-md max-w-sm">
                                            <p className="text-sm">ما هي شروط عقد الكراء في المغرب؟</p>
                                        </div>
                                    </div>

                                    {/* AI response */}
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-md shadow-sm">
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                بناءً على ظهير 24 ماي 2013، تشمل الشروط الأساسية لعقد الكراء:
                                            </p>
                                            <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                                                <li>تحديد هوية المتعاقدين</li>
                                                <li>وصف العين المكتراة</li>
                                                <li>تحديد مبلغ الكراء</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Typing indicator */}
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shadow underneath */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-black/5 blur-2xl rounded-full" />
                    </div>
                </div>
            </section>

            {/* Features - Number-based layout */}
            <section className="relative py-32 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="reveal-section text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                            Why professionals choose 9anon
                        </h2>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-24">
                        {[
                            {
                                number: "01",
                                title: "Instant Legal Research",
                                description: "Get accurate answers to complex legal questions in seconds. Our AI understands the nuances of Moroccan law and provides relevant citations.",
                                stat: "500ms",
                                statLabel: "average response time"
                            },
                            {
                                number: "02",
                                title: "Comprehensive Coverage",
                                description: "From the Moudawana to commercial codes, 9anon covers the full spectrum of Moroccan legal texts with unprecedented depth.",
                                stat: "15,000+",
                                statLabel: "legal documents analyzed"
                            },
                            {
                                number: "03",
                                title: "Always Available",
                                description: "Legal questions don't wait for business hours. Access professional-grade legal intelligence whenever you need it.",
                                stat: "24/7",
                                statLabel: "availability"
                            },
                        ].map((feature, i) => (
                            <div
                                key={feature.number}
                                className={`reveal-section grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                                    <div className="feature-number inline-block px-4 py-2 rounded-lg mb-4">
                                        <span className="text-sm font-mono text-primary">{feature.number}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-[#1d1d1f]/50 leading-relaxed mb-6">
                                        {feature.description}
                                    </p>
                                    <div>
                                        <span className="text-4xl font-semibold gradient-primary">{feature.stat}</span>
                                        <span className="block text-sm text-[#1d1d1f]/40 mt-1">{feature.statLabel}</span>
                                    </div>
                                </div>

                                <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
                                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center product-shadow">
                                        <div className="text-8xl opacity-20">
                                            {i === 0 ? '⚡' : i === 1 ? '📚' : '🌙'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="relative py-32 px-8 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-4xl mx-auto">
                    <div className="reveal-section text-center">
                        <p className="text-sm text-[#1d1d1f]/40 uppercase tracking-wider mb-6">
                            Trusted by Legal Professionals
                        </p>

                        {/* Quote */}
                        <blockquote className="text-2xl md:text-3xl font-light text-[#1d1d1f]/80 leading-relaxed mb-8">
                            "9anon has become an indispensable tool in my practice.
                            The accuracy and speed are remarkable."
                        </blockquote>

                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full" />
                            <div className="text-left">
                                <p className="font-medium">Youssef El Mansouri</p>
                                <p className="text-sm text-[#1d1d1f]/40">Attorney at Law, Casablanca</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="reveal-section text-4xl md:text-6xl font-semibold tracking-tight mb-6">
                        Ready to transform your
                        <span className="block gradient-primary">legal practice?</span>
                    </h2>

                    <p className="reveal-section text-xl text-[#1d1d1f]/50 mb-10">
                        Start your free trial today. No credit card required.
                    </p>

                    <div className="reveal-section flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/chat"
                            className="btn-clean px-10 py-5 text-lg font-medium rounded-full"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            href="#"
                            className="text-[#1d1d1f]/60 hover:text-[#1d1d1f] transition-colors flex items-center gap-2"
                        >
                            <span>Contact Sales</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer - Minimal */}
            <footer className="relative py-12 px-8 border-t border-black/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">٩</span>
                        </div>
                        <span className="font-medium text-sm">9anon</span>
                    </div>

                    <div className="flex items-center gap-6">
                        {["Terms", "Privacy", "Contact"].map((link) => (
                            <Link
                                key={link}
                                href="#"
                                className="text-sm text-[#1d1d1f]/40 hover:text-[#1d1d1f] transition-colors"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    <p className="text-sm text-[#1d1d1f]/40">
                        © 2024 9anon
                    </p>
                </div>
            </footer>
        </div>
    );
}
