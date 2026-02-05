"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Landing Page 7: Moroccan Heritage Style
 * 
 * Design Philosophy:
 * - Zellige tile-inspired geometric patterns
 * - Islamic geometric star patterns
 * - Traditional Moroccan color palette (emerald, gold, terracotta)
 * - Arabesque decorative elements
 * - Keyhole arch shapes for sections
 * - Cultural authenticity with modern execution
 * 
 * Target Aesthetic: Luxury Moroccan riad meets modern tech
 */
export default function LandingPage7() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const elements = document.querySelectorAll(".heritage-animate");
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("opacity-100", "translate-y-0");
                el.classList.remove("opacity-0", "translate-y-8");
            }, i * 120);
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#0c1810] text-white overflow-hidden">
            {/* Custom Styles */}
            <style jsx global>{`
        /* Zellige Pattern SVG Background */
        .zellige-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='0.5' stroke-opacity='0.15'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z'/%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30 Z'/%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        /* Islamic star pattern */
        .star-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a227' stroke-width='0.3' stroke-opacity='0.1'%3E%3Cpolygon points='40,0 50,30 80,30 55,50 65,80 40,60 15,80 25,50 0,30 30,30'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        /* Arabesque border */
        .arabesque-border {
          border-image: linear-gradient(
            90deg,
            transparent 0%,
            hsl(var(--gold) / 0.3) 20%,
            hsl(var(--gold) / 0.5) 50%,
            hsl(var(--gold) / 0.3) 80%,
            transparent 100%
          ) 1;
        }
        
        /* Keyhole arch clip */
        .keyhole-arch {
          clip-path: polygon(
            0% 30%,
            10% 15%,
            25% 5%,
            40% 0%,
            50% 0%,
            60% 0%,
            75% 5%,
            90% 15%,
            100% 30%,
            100% 100%,
            0% 100%
          );
        }
        
        /* Moroccan tile card */
        .moroccan-card {
          background: linear-gradient(
            145deg,
            rgba(16, 40, 28, 0.9) 0%,
            rgba(12, 24, 16, 0.95) 100%
          );
          border: 1px solid hsl(var(--gold) / 0.2);
          position: relative;
        }
        
        .moroccan-card::before {
          content: '';
          position: absolute;
          inset: 8px;
          border: 1px solid hsl(var(--gold) / 0.1);
          pointer-events: none;
        }
        
        /* Gold calligraphy effect */
        .calligraphy-gold {
          background: linear-gradient(
            180deg,
            hsl(45, 80%, 55%) 0%,
            hsl(var(--gold)) 50%,
            hsl(45, 70%, 40%) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px hsl(var(--gold) / 0.3));
        }
        
        /* Terracotta accent */
        .terracotta {
          color: #c45c3e;
        }
        
        /* Floating animation for decorative elements */
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .float-gentle {
          animation: gentleFloat 6s ease-in-out infinite;
        }
      `}</style>

            {/* Background Layers */}
            <div className="fixed inset-0 zellige-pattern" />
            <div className="fixed inset-0 star-pattern opacity-50" />

            {/* Gradient overlay */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at top center, rgba(16, 40, 28, 0.3) 0%, rgba(12, 24, 16, 0.9) 70%)",
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo with arabesque frame */}
                    <Link href="/" className="group flex items-center gap-4">
                        <div className="relative">
                            {/* Decorative frame */}
                            <div className="absolute -inset-2 border border-gold/20 transform rotate-45 scale-75 group-hover:rotate-[50deg] transition-transform duration-500" />
                            <div className="w-12 h-12 bg-primary/20 border border-gold/40 flex items-center justify-center">
                                <span className="calligraphy-gold text-2xl font-serif">٩</span>
                            </div>
                        </div>
                        <div>
                            <span className="block text-lg tracking-[0.2em] text-gold/80">قانون</span>
                            <span className="block text-xs tracking-[0.3em] uppercase text-white/40">9anon</span>
                        </div>
                    </Link>

                    {/* CTA */}
                    <Link
                        href="/chat"
                        className="px-8 py-3 bg-gradient-to-r from-gold/20 to-transparent border border-gold/40 text-gold text-sm tracking-wider hover:from-gold/30 transition-all duration-300"
                    >
                        استشارة قانونية
                    </Link>
                </div>
            </nav>

            {/* Hero Section with Keyhole Arch */}
            <section className="relative min-h-screen flex items-center justify-center px-8 pt-24">
                {/* Large decorative star */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] opacity-[0.05] float-gentle">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
                        <polygon
                            points="50,0 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35"
                            fill="currentColor"
                        />
                    </svg>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Decorative top element */}
                    <div className="heritage-animate opacity-0 translate-y-8 transition-all duration-700 flex justify-center mb-8">
                        <svg className="w-32 h-8 text-gold/40" viewBox="0 0 120 30">
                            <path d="M0 15 L20 15 M25 10 L35 20 M35 10 L25 20 M40 15 L60 15 M60 5 L60 25 M60 15 L80 15 M85 10 L95 20 M95 10 L85 20 M100 15 L120 15"
                                stroke="currentColor"
                                strokeWidth="1"
                                fill="none"
                            />
                        </svg>
                    </div>

                    {/* Arabic headline */}
                    <h1 className="heritage-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                        <span className="block text-6xl md:text-8xl lg:text-9xl calligraphy-gold font-serif leading-none mb-4">
                            قانون
                        </span>
                        <span className="block text-3xl md:text-4xl font-light text-white/70 tracking-wide mt-6">
                            Moroccan Legal Intelligence
                        </span>
                    </h1>

                    {/* Decorative divider */}
                    <div className="heritage-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 my-10 flex items-center justify-center gap-4">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
                        <svg className="w-6 h-6 text-gold/60" viewBox="0 0 24 24">
                            <polygon points="12,2 15,10 24,10 17,15 20,24 12,18 4,24 7,15 0,10 9,10" fill="currentColor" />
                        </svg>
                        <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
                    </div>

                    {/* Subheadline */}
                    <p className="heritage-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                        Embrace the wisdom of centuries, powered by cutting-edge artificial intelligence.
                        Navigate the majesty of Moroccan law with grace and precision.
                    </p>

                    {/* CTA Buttons */}
                    <div className="heritage-animate opacity-0 translate-y-8 transition-all duration-700 delay-400 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/chat"
                            className="group relative px-12 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-medium tracking-wider overflow-hidden"
                        >
                            {/* Corner decorations */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/60" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-gold/60" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-gold/60" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/60" />
                            <span className="relative z-10">Begin Your Journey</span>
                        </Link>

                        <Link
                            href="#heritage"
                            className="px-12 py-4 border border-gold/30 text-gold/80 tracking-wider hover:bg-gold/10 transition-all duration-300"
                        >
                            Discover More
                        </Link>
                    </div>
                </div>

                {/* Bottom arch decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
                    <svg className="w-full h-full text-gold/10" viewBox="0 0 1440 100" preserveAspectRatio="none">
                        <path d="M0 100 L0 50 Q360 0 720 50 Q1080 100 1440 50 L1440 100 Z" fill="currentColor" />
                    </svg>
                </div>
            </section>

            {/* Heritage Section */}
            <section id="heritage" className="relative py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-20">
                        <p className="text-gold/60 text-sm tracking-[0.4em] uppercase mb-4">
                            تراث قانوني
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif text-white/90 mb-4">
                            A Legacy of <span className="calligraphy-gold">Justice</span>
                        </h2>
                        <p className="text-white/40 max-w-xl mx-auto">
                            Combining centuries of Moroccan legal tradition with modern AI capabilities
                        </p>
                    </div>

                    {/* Feature cards with Moroccan styling */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                arabicTitle: "المدونة",
                                title: "Family Code",
                                description: "Expert guidance on the Moudawana, Morocco's comprehensive family law code governing marriage, divorce, and inheritance.",
                                icon: "🕌"
                            },
                            {
                                arabicTitle: "التجارة",
                                title: "Commercial Law",
                                description: "Navigate business regulations, contracts, and commercial disputes with AI trained on Moroccan commercial codes.",
                                icon: "📿"
                            },
                            {
                                arabicTitle: "الأراضي",
                                title: "Property Law",
                                description: "Land registration, property rights, and real estate transactions under Moroccan territorial law.",
                                icon: "🏛️"
                            },
                        ].map((item, i) => (
                            <div
                                key={item.title}
                                className="moroccan-card p-8 group hover:border-gold/40 transition-all duration-500"
                            >
                                <div className="text-4xl mb-6">{item.icon}</div>
                                <p className="text-gold/60 text-lg mb-2 font-serif">{item.arabicTitle}</p>
                                <h3 className="text-xl text-white/90 mb-4 group-hover:text-gold transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/40 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Geometric Pattern Showcase */}
            <section className="relative py-32 px-8 overflow-hidden">
                {/* Large decorative pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                    <div className="w-[800px] h-[800px] border border-gold rotate-45" />
                    <div className="absolute w-[600px] h-[600px] border border-gold rotate-45" />
                    <div className="absolute w-[400px] h-[400px] border border-gold rotate-45" />
                    <div className="absolute w-[200px] h-[200px] border border-gold rotate-45" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="moroccan-card p-12 md:p-16">
                        <p className="text-gold/60 text-sm tracking-[0.4em] uppercase mb-8">
                            الذكاء الاصطناعي
                        </p>

                        <h2 className="text-3xl md:text-5xl font-serif text-white/90 mb-8 leading-tight">
                            Where Ancient Wisdom
                            <span className="block calligraphy-gold mt-2">Meets Modern Intelligence</span>
                        </h2>

                        <p className="text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Our AI understands not just the letter of Moroccan law, but its spirit —
                            the cultural context, the historical precedents, and the nuanced interpretations
                            that make Moroccan jurisprudence unique.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gold/10">
                            {[
                                { value: "١٥٠٠٠+", label: "Legal Texts" },
                                { value: "٩٩٪", label: "Accuracy" },
                                { value: "٢٤/٧", label: "Available" },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-3xl calligraphy-gold font-serif mb-2">{stat.value}</div>
                                    <div className="text-sm text-white/40 tracking-wider uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial with arabesque frame */}
            <section className="relative py-32 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Decorative frame */}
                    <div className="relative p-12 border border-gold/20">
                        {/* Corner ornaments */}
                        <svg className="absolute -top-4 -left-4 w-8 h-8 text-gold" viewBox="0 0 32 32">
                            <path d="M0 16 Q0 0 16 0 M16 0 L16 4 Q4 4 4 16 L0 16" fill="currentColor" />
                        </svg>
                        <svg className="absolute -top-4 -right-4 w-8 h-8 text-gold transform rotate-90" viewBox="0 0 32 32">
                            <path d="M0 16 Q0 0 16 0 M16 0 L16 4 Q4 4 4 16 L0 16" fill="currentColor" />
                        </svg>
                        <svg className="absolute -bottom-4 -left-4 w-8 h-8 text-gold transform -rotate-90" viewBox="0 0 32 32">
                            <path d="M0 16 Q0 0 16 0 M16 0 L16 4 Q4 4 4 16 L0 16" fill="currentColor" />
                        </svg>
                        <svg className="absolute -bottom-4 -right-4 w-8 h-8 text-gold transform rotate-180" viewBox="0 0 32 32">
                            <path d="M0 16 Q0 0 16 0 M16 0 L16 4 Q4 4 4 16 L0 16" fill="currentColor" />
                        </svg>

                        <div className="text-5xl text-gold/30 mb-6">❝</div>
                        <blockquote className="text-xl md:text-2xl font-serif text-white/80 leading-relaxed mb-8 italic">
                            9anon brings the elegance and depth of our legal heritage into the digital age.
                            It's like having a scholar of Moroccan law available at any moment.
                        </blockquote>
                        <div>
                            <p className="text-gold/80 font-medium text-lg">فاطمة الزهراء</p>
                            <p className="text-white/40 text-sm mt-1">Legal Consultant, Casablanca</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Decorative arch */}
                    <div className="relative inline-block mb-12">
                        <svg className="w-48 h-24 text-gold/20" viewBox="0 0 200 100">
                            <path d="M10 100 L10 50 Q100 0 190 50 L190 100" stroke="currentColor" strokeWidth="1" fill="none" />
                            <path d="M30 100 L30 55 Q100 15 170 55 L170 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </svg>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif text-white/90 mb-6">
                        <span className="calligraphy-gold">ابدأ رحلتك</span>
                        <span className="block text-2xl text-white/60 mt-4 font-light">Begin Your Journey</span>
                    </h2>

                    <p className="text-white/40 mb-10 max-w-xl mx-auto">
                        Experience the harmony of tradition and innovation.
                        Let 9anon guide you through Moroccan law with wisdom and precision.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-primary to-primary/80 text-white font-medium tracking-wider border border-gold/30 hover:border-gold/60 transition-all duration-300"
                    >
                        <span>استشارة الآن</span>
                        <span className="text-gold">←</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-8 border-t border-gold/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="calligraphy-gold text-2xl font-serif">٩</span>
                        <span className="text-white/40 text-sm tracking-wider">قانون | 9anon</span>
                    </div>

                    <p className="text-white/30 text-sm">
                        © 2024 9anon. Proudly Moroccan.
                    </p>
                </div>
            </footer>
        </div>
    );
}
