"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/**
 * Landing Page 8: Futuristic Neural/AI Style
 * 
 * Design Philosophy:
 * - Neural network node visualization (animated)
 * - Glowing/holographic text effects
 * - Circuit board pattern backgrounds
 * - Gradient mesh with cyan/purple tech colors
 * - Floating data particles animation
 * - Modern monospace accent typography
 * 
 * Target Aesthetic: Cutting-edge AI lab / Neural interface
 */
export default function LandingPage8() {
    const [mounted, setMounted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setMounted(true);

        // Mouse tracking for parallax
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animate elements
        const elements = document.querySelectorAll(".neural-animate");
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("opacity-100", "translate-y-0");
                el.classList.remove("opacity-0", "translate-y-8");
            }, i * 100);
        });

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Neural network canvas animation
    useEffect(() => {
        if (!mounted || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Neural nodes
        const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
        const nodeCount = 50;

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0, 255, 200, 0.6)";
                ctx.fill();

                // Draw connections to nearby nodes
                nodes.forEach((other, j) => {
                    if (i === j) return;
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 255, 200, ${0.15 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, [mounted]);

    return (
        <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
            {/* Custom Styles */}
            <style jsx global>{`
        /* Circuit pattern */
        .circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2300ffc8' stroke-width='0.3' stroke-opacity='0.1'%3E%3Cpath d='M0 50 L30 50 L30 20 L50 20 M50 20 L50 0 M70 50 L100 50 M50 80 L50 100 M50 50 L50 80 L80 80'/%3E%3Ccircle cx='30' cy='50' r='3'/%3E%3Ccircle cx='50' cy='20' r='3'/%3E%3Ccircle cx='50' cy='80' r='3'/%3E%3Ccircle cx='80' cy='80' r='3'/%3E%3C/g%3E%3C/svg%3E");
        }
        
        /* Holographic text */
        .holographic {
          background: linear-gradient(
            90deg,
            #00ffc8 0%,
            #00a8ff 25%,
            #c800ff 50%,
            #00a8ff 75%,
            #00ffc8 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hologramShift 4s linear infinite;
        }
        
        @keyframes hologramShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        /* Neon glow */
        .neon-glow {
          text-shadow: 
            0 0 10px rgba(0, 255, 200, 0.8),
            0 0 20px rgba(0, 255, 200, 0.6),
            0 0 30px rgba(0, 255, 200, 0.4),
            0 0 40px rgba(0, 255, 200, 0.2);
        }
        
        /* Tech card */
        .tech-card {
          background: linear-gradient(
            135deg,
            rgba(0, 255, 200, 0.05) 0%,
            rgba(0, 168, 255, 0.02) 50%,
            rgba(200, 0, 255, 0.05) 100%
          );
          border: 1px solid rgba(0, 255, 200, 0.2);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .tech-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 200, 0.1),
            transparent
          );
          transition: left 0.5s ease;
        }
        
        .tech-card:hover::before {
          left: 100%;
        }
        
        /* Data stream */
        @keyframes dataStream {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        .data-stream {
          animation: dataStream 8s linear infinite;
        }
        
        /* Pulse ring */
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .pulse-ring {
          animation: pulseRing 2s ease-out infinite;
        }
        
        /* Gradient mesh */
        .gradient-mesh {
          background: 
            radial-gradient(at 20% 30%, rgba(0, 255, 200, 0.15) 0%, transparent 50%),
            radial-gradient(at 80% 20%, rgba(0, 168, 255, 0.15) 0%, transparent 50%),
            radial-gradient(at 40% 80%, rgba(200, 0, 255, 0.15) 0%, transparent 50%),
            radial-gradient(at 90% 70%, rgba(0, 255, 200, 0.1) 0%, transparent 50%);
        }
      `}</style>

            {/* Neural Network Canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0"
            />

            {/* Background Layers */}
            <div className="fixed inset-0 circuit-pattern opacity-30" />
            <div className="fixed inset-0 gradient-mesh" />

            {/* Scanlines effect */}
            <div
                className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            {/* Pulse rings */}
                            <div className="absolute inset-0 border border-cyan-400/30 rounded-full pulse-ring" />
                            <div className="w-10 h-10 bg-cyan-400/10 border border-cyan-400/50 rounded-full flex items-center justify-center">
                                <span className="text-cyan-400 font-mono font-bold">9</span>
                            </div>
                        </div>
                        <div className="font-mono">
                            <span className="text-cyan-400 text-lg">9anon</span>
                            <span className="text-white/30 text-xs block">v2.0</span>
                        </div>
                    </Link>

                    {/* Status indicator */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-white/50">SYSTEM ONLINE</span>
                        </div>
                        <div className="w-px h-6 bg-white/10" />
                        <span className="text-xs font-mono text-cyan-400/60">
                            {new Date().toLocaleTimeString()}
                        </span>
                    </div>

                    {/* CTA */}
                    <Link
                        href="/chat"
                        className="px-6 py-2 bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 font-mono text-sm hover:bg-cyan-400/20 transition-all duration-300"
                    >
                        INITIALIZE_
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-8 pt-24">
                {/* Central AI core visualization */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                        transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`,
                    }}
                >
                    {/* Concentric rings */}
                    <div className="relative w-[400px] h-[400px]">
                        <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                        <div className="absolute inset-8 border border-cyan-400/15 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                        <div className="absolute inset-16 border border-cyan-400/10 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
                        <div className="absolute inset-24 border border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />

                        {/* Core */}
                        <div className="absolute inset-32 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center animate-pulse">
                                <div className="w-8 h-8 bg-cyan-400/40 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Terminal-style header */}
                    <div className="neural-animate opacity-0 translate-y-8 transition-all duration-700 mb-8">
                        <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 font-mono text-xs text-cyan-400/80">
                            {'>'} INITIALIZING LEGAL_AI_CORE...
                        </span>
                    </div>

                    {/* Main headline */}
                    <h1 className="neural-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                            <span className="holographic">NEURAL</span>
                        </span>
                        <span className="block text-4xl md:text-6xl lg:text-7xl font-light text-white/80">
                            Legal Intelligence
                        </span>
                    </h1>

                    {/* Code-style subheadline */}
                    <div className="neural-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 mt-10 font-mono text-sm md:text-base text-white/40 max-w-2xl mx-auto">
                        <span className="text-purple-400">const</span> <span className="text-cyan-400">response</span> = <span className="text-purple-400">await</span> <span className="text-yellow-400">9anon</span>.<span className="text-green-400">analyze</span>(<span className="text-orange-400">"moroccan_law"</span>);
                    </div>

                    <p className="neural-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-8 text-lg text-white/50 max-w-xl mx-auto">
                        Advanced neural networks trained on comprehensive Moroccan legal datasets.
                        Experience law at the speed of thought.
                    </p>

                    {/* CTA Buttons */}
                    <div className="neural-animate opacity-0 translate-y-8 transition-all duration-700 delay-400 mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/chat"
                            className="group relative px-10 py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-mono font-semibold tracking-wider overflow-hidden"
                        >
                            <span className="relative z-10">CONNECT TO AI</span>
                            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>

                        <Link
                            href="#capabilities"
                            className="px-10 py-4 border border-cyan-400/30 text-cyan-400/80 font-mono tracking-wider hover:bg-cyan-400/10 transition-all duration-300"
                        >
                            VIEW_SPECS →
                        </Link>
                    </div>
                </div>

                {/* Data streams on sides */}
                <div className="absolute left-8 top-0 h-full w-px overflow-hidden opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent data-stream"
                            style={{
                                height: '100px',
                                animationDelay: `${i * 1.5}s`,
                            }}
                        />
                    ))}
                </div>
                <div className="absolute right-8 top-0 h-full w-px overflow-hidden opacity-20">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full bg-gradient-to-b from-transparent via-purple-400 to-transparent data-stream"
                            style={{
                                height: '100px',
                                animationDelay: `${i * 1.5 + 0.5}s`,
                            }}
                        />
                    ))}
                </div>
            </section>

            {/* Capabilities Section */}
            <section id="capabilities" className="relative py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 font-mono text-xs text-green-400 mb-6">
                            CAPABILITIES.json
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white/90">
                            System <span className="holographic">Specifications</span>
                        </h2>
                    </div>

                    {/* Tech cards grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "🧠",
                                title: "Neural Processing",
                                stat: "100B+",
                                unit: "parameters",
                                description: "Deep learning model trained specifically on Moroccan legal corpus"
                            },
                            {
                                icon: "⚡",
                                title: "Response Time",
                                stat: "<500",
                                unit: "ms",
                                description: "Near-instantaneous analysis of complex legal queries"
                            },
                            {
                                icon: "📊",
                                title: "Accuracy Rate",
                                stat: "99.2",
                                unit: "%",
                                description: "Verified against expert legal opinions and case outcomes"
                            },
                            {
                                icon: "🔒",
                                title: "Encryption",
                                stat: "AES",
                                unit: "256-bit",
                                description: "Military-grade security for all consultations"
                            },
                            {
                                icon: "🌐",
                                title: "Languages",
                                stat: "3",
                                unit: "supported",
                                description: "Arabic, French, and English with legal terminology"
                            },
                            {
                                icon: "📚",
                                title: "Legal Texts",
                                stat: "15K+",
                                unit: "documents",
                                description: "Comprehensive coverage of Moroccan legal framework"
                            },
                        ].map((item, i) => (
                            <div
                                key={item.title}
                                className="tech-card p-6 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className="text-3xl">{item.icon}</span>
                                    <span className="text-xs font-mono text-green-400/60 px-2 py-1 bg-green-400/10 rounded">
                                        ONLINE
                                    </span>
                                </div>
                                <h3 className="text-lg font-mono text-white/90 mb-2 group-hover:text-cyan-400 transition-colors">
                                    {item.title}
                                </h3>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-3xl font-bold text-cyan-400">{item.stat}</span>
                                    <span className="text-sm text-white/40 font-mono">{item.unit}</span>
                                </div>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interface Preview */}
            <section className="relative py-32 px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="tech-card p-8 md:p-12">
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <span className="ml-4 font-mono text-xs text-white/40">9anon_terminal v2.0</span>
                        </div>

                        {/* Terminal content */}
                        <div className="font-mono text-sm space-y-4">
                            <div>
                                <span className="text-green-400">user@9anon</span>
                                <span className="text-white/40">:</span>
                                <span className="text-blue-400">~</span>
                                <span className="text-white/40">$ </span>
                                <span className="text-white/80">analyze "ما هي شروط عقد الكراء في المغرب؟"</span>
                            </div>

                            <div className="text-cyan-400/80 pl-4 border-l-2 border-cyan-400/30">
                                <p className="mb-2">{'>'} Analyzing query...</p>
                                <p className="mb-2">{'>'} Matching against: Dahir of May 24, 2013</p>
                                <p className="mb-2">{'>'} Found 12 relevant articles</p>
                                <p className="text-green-400">{'>'} Analysis complete in 0.3s</p>
                            </div>

                            <div className="bg-white/5 p-4 rounded border border-white/10">
                                <p className="text-white/70 leading-relaxed">
                                    بناءً على ظهير 24 ماي 2013 المتعلق بتنظيم العلاقة التعاقدية بين المكري والمكتري...
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-white/30">
                                <span className="animate-pulse">▋</span>
                                <span>Ready for next query</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-32 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6">
                        Ready to <span className="holographic">Initialize</span>?
                    </h2>

                    <p className="text-white/40 mb-10 font-mono">
                        Connect to the future of legal intelligence.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-mono font-bold tracking-wider hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300"
                    >
                        <span>START_SESSION</span>
                        <span className="animate-pulse">_</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 font-mono">
                        <span className="text-cyan-400">9anon</span>
                        <span className="text-white/20">|</span>
                        <span className="text-white/40 text-xs">Neural Legal AI</span>
                    </div>

                    <p className="text-white/30 text-xs font-mono">
                        © 2024 9anon. All systems operational.
                    </p>
                </div>
            </footer>
        </div>
    );
}
