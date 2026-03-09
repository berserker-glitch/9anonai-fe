"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function AnimatedThinkingSvg({ className = "w-12 h-12 text-white" }: { className?: string }) {
    const containerRef = useRef<SVGSVGElement>(null);
    const p1 = useRef<SVGPolygonElement>(null);
    const p2 = useRef<SVGPolygonElement>(null);
    const p3 = useRef<SVGPolygonElement>(null);
    const p4 = useRef<SVGPolygonElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });

            // Set transform origin for better scaling/rotating behavior
            gsap.set([p1.current, p2.current, p3.current, p4.current], {
                transformOrigin: "50% 50%"
            });

            // The disassemble & reassemble animation sequence
            tl.to(p1.current, { x: -30, y: -60, rotation: -6, scale: 0.9, opacity: 0.5, duration: 0.7, ease: "power2.inOut" }, 0)
                .to(p2.current, { x: -30, y: 60, rotation: 4, scale: 0.9, opacity: 0.5, duration: 0.7, ease: "power2.inOut" }, 0.1)
                .to(p3.current, { x: 30, y: 60, rotation: -4, scale: 0.9, opacity: 0.5, duration: 0.7, ease: "power2.inOut" }, 0.2)
                .to(p4.current, { x: 30, y: -60, rotation: 6, scale: 0.9, opacity: 0.5, duration: 0.7, ease: "power2.inOut" }, 0.3);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="flex items-center justify-center p-2">
            <svg
                ref={containerRef}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-100 -100 753.5 1658.42"
                className={`${className} overflow-visible`}
                fill="currentColor"
            >
                <g>
                    {/* Part 1: Top Left */}
                    <polygon ref={p1} points="235.03 0 235.03 590.61 0 428.19 0 162.38 235.03 0" />
                    {/* Part 2: Bottom Left */}
                    <polygon ref={p2} points="235.03 692.64 235.03 1143.76 0 981.38 0 530.22 235.03 692.64" />
                    {/* Part 3: Bottom Right */}
                    <polygon ref={p3} points="553.5 912.72 553.5 1296.38 318.97 1458.42 318.97 750.65 553.5 912.72" />
                    {/* Part 4: Top Right */}
                    <polygon ref={p4} points="553.5 423.38 553.5 810.7 318.97 648.62 318.97 261.34 553.5 423.38" />
                </g>
            </svg>
        </div>
    );
}
