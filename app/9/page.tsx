"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Landing Page 9: Gradient Aurora/Cosmic Style
 * 
 * Design Philosophy:
 * - Multi-color aurora gradient backgrounds
 * - Soft organic blob shapes with blur
 * - Deep parallax scroll depth
 * - Star field or cosmic dust particles
 * - Ethereal typography with glow effects
 * - Premium atmospheric feel
 * 
 * Target Aesthetic: Premium cosmic/aurora experience
 */
export default function LandingPage9() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Animate elements
        const elements = document.querySelectorAll(".aurora-animate");
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("opacity-100", "translate-y-0");
                el.classList.remove("opacity-0", "translate-y-8");
            }, i * 150);
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a15] text-white overflow-hidden">
            {/* Custom Styles */}
            <style jsx global>{`
        /* Aurora gradient animation */
        @keyframes auroraShift {
          0%, 100% {
            transform: translateX(-25%) translateY(-25%) rotate(0deg);
          }
          25% {
            transform: translateX(25%) translateY(-25%) rotate(90deg);
          }
          50% {
            transform: translateX(25%) translateY(25%) rotate(180deg);
          }
          75% {
            transform: translateX(-25%) translateY(25%) rotate(270deg);
          }
        }
        
        .aurora-blob {
          animation: auroraShift 20s ease-in-out infinite;
          filter: blur(80px);
        }
        
        .aurora-blob-alt {
          animation: auroraShift 25s ease-in-out infinite reverse;
          filter: blur(100px);
        }
        
        /* Star field */
        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.5), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 160px 30px, rgba(255,255,255,0.5), transparent),
            radial-gradient(2px 2px at 200px 60px, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 230px 90px, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 270px 20px, rgba(255,255,255,0.3), transparent);
          background-size: 300px 100px;
        }
        
        /* Ethereal text glow */
        .ethereal-glow {
          text-shadow: 
            0 0 40px rgba(139, 92, 246, 0.5),
            0 0 80px rgba(59, 130, 246, 0.3),
            0 0 120px rgba(236, 72, 153, 0.2);
        }
        
        /* Cosmic gradient text */
        .cosmic-gradient {
          background: linear-gradient(
            135deg,
            #c084fc 0%,
            #60a5fa 25%,
            #34d399 50%,
            #60a5fa 75%,
            #c084fc 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cosmicShift 6s ease-in-out infinite;
        }
        
        @keyframes cosmicShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Aurora card */
        .aurora-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .aurora-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 20px 60px rgba(139, 92, 246, 0.15),
            0 0 40px rgba(59, 130, 246, 0.1);
          transform: translateY(-4px);
        }
        
        /* Floating dust particles */
        @keyframes floatDust {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        .dust-particle {
          animation: floatDust linear infinite;
        }
        
        /* Smooth wave */
        @keyframes waveFlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .wave-flow {
          animation: waveFlow 20s linear infinite;
        }
      `}</style>

            {/* Aurora Background */}
            <div className="fixed inset-0 overflow-hidden">
                {/* Primary aurora blob */}
                <div
                    className="aurora-blob absolute w-[150%] h-[150%] -top-1/4 -left-1/4"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 60%)",
                        transform: `translateY(${scrollY * 0.1}px)`,
                    }}
                />

                {/* Secondary aurora blob */}
                <div
                    className="aurora-blob-alt absolute w-[120%] h-[120%] top-1/4 -right-1/4"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, transparent 55%)",
                        transform: `translateY(${scrollY * 0.05}px)`,
                    }}
                />

                {/* Tertiary aurora blob */}
                <div
                    className="aurora-blob absolute w-[100%] h-[100%] bottom-0 left-1/4"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 50%)",
                        transform: `translateY(${scrollY * -0.05}px)`,
                    }}
                />

                {/* Green/teal blob like page 4 */}
                <div
                    className="aurora-blob-alt absolute w-[80%] h-[80%] top-1/2 right-0"
                    style={{
                        background: "radial-gradient(ellipse at center, rgba(52, 211, 153, 0.1) 0%, transparent 50%)",
                    }}
                />
            </div>

            {/* Star field overlay */}
            <div className="fixed inset-0 stars opacity-40" />

            {/* Floating dust particles */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {mounted && [...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="dust-particle absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-10px',
                            animationDuration: `${15 + Math.random() * 20}s`,
                            animationDelay: `${Math.random() * 10}s`,
                        }}
                    />
                ))}
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                                <span className="cosmic-gradient text-lg font-bold">٩</span>
                            </div>
                            <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-lg font-light tracking-wide text-white/80">9anon</span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-10">
                        {["Features", "About", "Pricing"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <Link
                        href="/chat"
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 text-white/80 text-sm rounded-full hover:border-white/20 hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-300"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-8 pt-24">
                <div
                    className="relative z-10 text-center max-w-5xl mx-auto"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                >
                    {/* Badge */}
                    <div className="aurora-animate opacity-0 translate-y-8 transition-all duration-700 mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/60">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Moroccan Legal AI
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1 className="aurora-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white/90 mb-4 ethereal-glow">
                            Navigate Law
                        </span>
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
                            <span className="cosmic-gradient">Effortlessly</span>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="aurora-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-10 text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
                        Experience the future of legal consultation. AI-powered insights into
                        Moroccan law, available whenever you need them.
                    </p>

                    {/* CTA Buttons */}
                    <div className="aurora-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/chat"
                            className="group relative px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full overflow-hidden"
                        >
                            <span className="relative z-10">Start Exploring</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>

                        <Link
                            href="#features"
                            className="px-10 py-4 border border-white/10 text-white/60 rounded-full hover:border-white/20 hover:text-white/80 transition-all duration-300"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-3 bg-white/40 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Flowing wave transition */}
            <div className="relative h-32 overflow-hidden">
                <svg
                    className="absolute bottom-0 w-[200%] wave-flow text-white/5"
                    viewBox="0 0 1440 100"
                    preserveAspectRatio="none"
                >
                    <path d="M0,50 C360,100 1080,0 1440,50 C1800,100 2160,0 2880,50 L2880,100 L0,100 Z" fill="currentColor" />
                </svg>
            </div>

            {/* Features Section */}
            <section id="features" className="relative py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-20">
                        <p className="text-purple-400/60 text-sm tracking-wider uppercase mb-4">
                            Built for Excellence
                        </p>
                        <h2 className="text-4xl md:text-5xl font-light text-white/90">
                            Why Choose <span className="cosmic-gradient">9anon</span>
                        </h2>
                    </div>

                    {/* Feature cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "✨",
                                title: "Instant Answers",
                                description: "Get accurate legal guidance in seconds. Our AI understands context and nuance."
                            },
                            {
                                icon: "🎯",
                                title: "Precision Focused",
                                description: "Trained specifically on Moroccan legal texts for unmatched accuracy."
                            },
                            {
                                icon: "🌙",
                                title: "24/7 Available",
                                description: "Access legal intelligence whenever you need it, day or night."
                            },
                            {
                                icon: "🔐",
                                title: "Private & Secure",
                                description: "Your consultations remain completely confidential and encrypted."
                            },
                            {
                                icon: "🌍",
                                title: "Multilingual",
                                description: "Communicate in Arabic, French, or English with full understanding."
                            },
                            {
                                icon: "⚡",
                                title: "Always Learning",
                                description: "Continuously updated with the latest legal developments and precedents."
                            },
                        ].map((feature, i) => (
                            <div
                                key={feature.title}
                                className="aurora-card p-8 rounded-2xl"
                            >
                                <div className="text-4xl mb-6">{feature.icon}</div>
                                <h3 className="text-xl text-white/90 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-white/40 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Section */}
            <section className="relative py-32 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="aurora-card p-12 md:p-16 rounded-3xl text-center relative overflow-hidden">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

                        <div className="relative z-10">
                            <p className="text-purple-400/60 text-sm tracking-wider uppercase mb-6">
                                Powerful Intelligence
                            </p>

                            <h2 className="text-3xl md:text-5xl font-light text-white/90 mb-8 leading-tight ethereal-glow">
                                Trained on the Complete
                                <span className="block cosmic-gradient mt-2">Moroccan Legal Corpus</span>
                            </h2>

                            <p className="text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
                                From the Moudawana to commercial codes, our AI comprehends the full depth
                                of Moroccan jurisprudence. Ask anything, get precise answers.
                            </p>

                            {/* Stats row */}
                            <div className="flex flex-wrap justify-center gap-12 mt-12 pt-8 border-t border-white/10">
                                {[
                                    { value: "15,000+", label: "Legal Documents" },
                                    { value: "99.2%", label: "Accuracy Rate" },
                                    { value: "<1s", label: "Response Time" },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="text-3xl font-light cosmic-gradient mb-1">{stat.value}</div>
                                        <div className="text-sm text-white/40">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <section className="relative py-32 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-6xl mb-8 opacity-30">✦</div>
                    <blockquote className="text-2xl md:text-3xl font-light text-white/70 leading-relaxed mb-10 italic">
                        "9anon has transformed how I approach legal research. It's like having
                        a brilliant colleague available at any hour."
                    </blockquote>
                    <div>
                        <p className="text-white/80 font-medium">Karim Alaoui</p>
                        <p className="text-white/40 text-sm mt-1">Legal Consultant, Rabat</p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-6 ethereal-glow">
                        Ready to Begin?
                    </h2>

                    <p className="text-white/40 mb-10 max-w-xl mx-auto">
                        Join thousands of legal professionals who trust 9anon for their research needs.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-2 px-12 py-5 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-full hover:from-purple-400 hover:to-blue-400 transition-all duration-300"
                    >
                        <span>Start Free Consultation</span>
                        <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="cosmic-gradient text-xl font-bold">٩</span>
                        <span className="text-white/40 text-sm">9anon Legal AI</span>
                    </div>

                    <p className="text-white/30 text-sm">
                        © 2024 9anon. Crafted with care.
                    </p>
                </div>
            </footer>
        </div>
    );
}
