"use client";

import { useEffect, useState } from "react";

/**
 * ReadingProgress Component
 * Displays a fixed progress bar at the top of the screen indicating how far the user has scrolled.
 */
export function ReadingProgress({ lang }: { lang: string }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentScrollY = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollHeight) {
                setProgress(Number((currentScrollY / scrollHeight).toFixed(4)) * 100);
            }
        };

        // Initialize and add listener
        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });

        return () => {
            window.removeEventListener("scroll", updateProgress);
        };
    }, []);

    const isRtl = lang === "ar";

    return (
        <div
            className="fixed top-0 left-0 w-full h-1.5 z-[100] bg-transparent pointer-events-none"
            aria-hidden="true"
        >
            <div
                className={`h-full bg-gradient-to-r from-primary to-emerald-400 ${isRtl ? "origin-right" : "origin-left"
                    }`}
                style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: "transform 100ms ease-out",
                }}
            />
        </div>
    );
}
