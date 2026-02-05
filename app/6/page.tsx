"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Landing Page 6: Luxury Legal/Law Firm Style
 * 
 * Design Philosophy:
 * - Dark charcoal background with gold accents
 * - Marble-like gradient textures
 * - Scales of justice iconography with 3D shadows
 * - Premium serif typography (high-end law firm aesthetic)
 * - Layered card components with glass effect
 * - Subtle grid pattern background
 * 
 * Target Aesthetic: High-end international law firm website
 */
export default function LandingPage6() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animation trigger based on scroll
    useEffect(() => {
        if (!mounted) return;

        const elements = document.querySelectorAll(".luxury-animate");
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("opacity-100", "translate-y-0");
                el.classList.remove("opacity-0", "translate-y-8");
            }, i * 150);
        });
    }, [mounted]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Custom Styles */}
            <style jsx global>{`
        /* Marble texture gradient */
        .marble-texture {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          background-size: 400% 400%;
          animation: marbleShift 15s ease-in-out infinite;
        }
        
        @keyframes marbleShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Gold shimmer effect */
        .gold-shimmer {
          background: linear-gradient(
            90deg,
            hsl(var(--gold)) 0%,
            hsl(45, 90%, 60%) 50%,
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
        
        /* Luxury card hover */
        .luxury-card {
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .luxury-card:hover {
          border-color: hsl(var(--gold) / 0.3);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 60px hsl(var(--gold) / 0.1);
          transform: translateY(-8px);
        }
        
        /* Grid pattern */
        .luxury-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        
        /* Scales icon glow */
        .scales-glow {
          filter: drop-shadow(0 0 30px hsl(var(--gold) / 0.4))
                  drop-shadow(0 10px 40px rgba(0, 0, 0, 0.5));
        }
      `}</style>

            {/* Background Layers */}
            <div className="fixed inset-0 luxury-grid opacity-50" />
            <div className="fixed inset-0 marble-texture" />

            {/* Radial gradient vignette */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors">
                            <span className="text-gold font-serif text-xl">٩</span>
                        </div>
                        <span className="text-lg tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors">
                            9anon
                        </span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-12">
                        {["Practice Areas", "About", "Resources", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-sm tracking-wider uppercase text-white/50 hover:text-gold transition-colors duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link
                        href="/chat"
                        className="hidden md:flex px-6 py-3 border border-gold/40 text-gold text-sm tracking-wider uppercase hover:bg-gold hover:text-black transition-all duration-300"
                    >
                        Consult Now
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-8 pt-24">
                {/* Scales of Justice Icon */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none"
                    style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.1}px))` }}
                >
                    <svg className="w-[600px] h-[600px] scales-glow" viewBox="0 0 100 100" fill="currentColor">
                        {/* Scales of Justice SVG */}
                        <path d="M50 5 L50 20 M30 20 L70 20 M30 20 L30 25 L15 45 L45 45 L30 25 M70 20 L70 25 L55 45 L85 45 L70 25 M50 20 L50 85 M35 85 L65 85 M40 90 L60 90"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-gold"
                        />
                        {/* Left pan */}
                        <ellipse cx="30" cy="47" rx="18" ry="4" className="text-gold/50" />
                        {/* Right pan */}
                        <ellipse cx="70" cy="47" rx="18" ry="4" className="text-gold/50" />
                    </svg>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Pre-headline */}
                    <p className="luxury-animate opacity-0 translate-y-8 transition-all duration-700 text-gold/60 text-sm tracking-[0.5em] uppercase mb-8">
                        Moroccan Legal Excellence
                    </p>

                    {/* Main headline */}
                    <h1 className="luxury-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight text-white/90 mb-4">
                            Where Law Meets
                        </span>
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-serif italic gold-shimmer">
                            Intelligence
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="luxury-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-10 text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
                        Premium AI-powered legal consultation for discerning clients.
                        Navigate Moroccan law with unprecedented precision and sophistication.
                    </p>

                    {/* CTA Buttons */}
                    <div className="luxury-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/chat"
                            className="group relative px-10 py-4 bg-gold text-black font-medium tracking-wider uppercase text-sm overflow-hidden"
                        >
                            <span className="relative z-10">Begin Consultation</span>
                            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>

                        <Link
                            href="#services"
                            className="px-10 py-4 border border-white/20 text-white/70 font-medium tracking-wider uppercase text-sm hover:border-white/40 hover:text-white transition-all duration-300"
                        >
                            Our Services
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="w-px h-20 bg-gradient-to-b from-transparent via-gold/50 to-transparent animate-pulse" />
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="relative py-20 px-8 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: "15K+", label: "Cases Analyzed" },
                            { number: "99.2%", label: "Accuracy Rate" },
                            { number: "24/7", label: "Availability" },
                            { number: "100%", label: "Confidential" },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className="luxury-animate opacity-0 translate-y-8 transition-all duration-700 text-center"
                                style={{ transitionDelay: `${400 + i * 100}ms` }}
                            >
                                <div className="text-4xl md:text-5xl font-serif text-gold mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm tracking-wider uppercase text-white/40">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="relative py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-20">
                        <p className="text-gold/60 text-sm tracking-[0.5em] uppercase mb-4">
                            Practice Areas
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-white/90">
                            Legal Expertise at Your Command
                        </h2>
                    </div>

                    {/* Services grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "⚖️",
                                title: "Civil Law",
                                description: "Comprehensive guidance on contracts, property rights, family matters, and civil disputes under Moroccan jurisdiction."
                            },
                            {
                                icon: "🏛️",
                                title: "Corporate Law",
                                description: "Expert analysis of business regulations, company formation, mergers, and commercial transactions."
                            },
                            {
                                icon: "📜",
                                title: "Administrative Law",
                                description: "Navigate government procedures, permits, licensing, and regulatory compliance with precision."
                            },
                            {
                                icon: "🏠",
                                title: "Real Estate",
                                description: "Property transactions, land registration, construction permits, and ownership verification."
                            },
                            {
                                icon: "👥",
                                title: "Labor Law",
                                description: "Employment contracts, workplace regulations, disputes resolution, and worker rights."
                            },
                            {
                                icon: "🔒",
                                title: "Privacy & Data",
                                description: "Data protection compliance, privacy policies, and digital rights under Moroccan law."
                            },
                        ].map((service, i) => (
                            <div
                                key={service.title}
                                className="luxury-card p-8 group cursor-pointer"
                            >
                                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-serif text-white/90 mb-3 group-hover:text-gold transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-white/40 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                                <div className="mt-6 flex items-center text-gold/60 text-sm tracking-wider uppercase group-hover:text-gold transition-colors">
                                    <span>Learn More</span>
                                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Feature */}
            <section className="relative py-32 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="luxury-card p-12 md:p-20 text-center">
                        {/* Decorative corners */}
                        <div className="absolute top-6 left-6 w-12 h-12 border-l border-t border-gold/30" />
                        <div className="absolute top-6 right-6 w-12 h-12 border-r border-t border-gold/30" />
                        <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b border-gold/30" />
                        <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-gold/30" />

                        <p className="text-gold/60 text-sm tracking-[0.5em] uppercase mb-6">
                            Premium Intelligence
                        </p>

                        <h2 className="text-3xl md:text-5xl font-serif font-light text-white/90 mb-8 max-w-3xl mx-auto leading-tight">
                            Trained on the Complete Corpus of
                            <span className="italic text-gold"> Moroccan Legal Texts</span>
                        </h2>

                        <p className="text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Our AI has been meticulously trained on decades of Moroccan legal precedents,
                            statutes, and judicial decisions. Experience legal research that would take
                            weeks, completed in moments.
                        </p>

                        <Link
                            href="/chat"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gold/40 text-gold tracking-wider uppercase text-sm hover:bg-gold hover:text-black transition-all duration-300"
                        >
                            <span>Experience the Difference</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="relative py-32 px-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-6xl text-gold/20 mb-8">"</div>
                    <blockquote className="text-2xl md:text-3xl font-serif font-light text-white/80 leading-relaxed mb-10">
                        9anon has transformed how we approach legal research. What previously
                        took our team days now takes minutes, with remarkable accuracy.
                    </blockquote>
                    <div>
                        <p className="text-white/90 font-medium">Ahmed Benali</p>
                        <p className="text-white/40 text-sm tracking-wider uppercase mt-1">
                            Senior Partner, Atlas Legal Group
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-8 bg-gradient-to-b from-transparent to-black/50">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-serif font-light text-white/90 mb-6">
                        Ready to Elevate Your
                        <span className="block italic text-gold mt-2">Legal Practice?</span>
                    </h2>

                    <p className="text-white/40 mb-10 max-w-xl mx-auto">
                        Join the elite professionals who trust 9anon for their most critical legal matters.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex px-12 py-5 bg-gold text-black font-medium tracking-wider uppercase text-sm hover:bg-white transition-colors duration-300"
                    >
                        Start Your Consultation
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-16 px-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                                <span className="text-gold font-serif">٩</span>
                            </div>
                            <span className="text-sm tracking-[0.2em] uppercase text-white/60">
                                9anon Legal AI
                            </span>
                        </div>

                        <p className="text-white/30 text-sm">
                            © 2024 9anon. Privileged & Confidential.
                        </p>

                        <div className="flex items-center gap-6">
                            {["Terms", "Privacy", "Contact"].map((link) => (
                                <Link
                                    key={link}
                                    href="#"
                                    className="text-sm text-white/40 hover:text-gold transition-colors"
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
