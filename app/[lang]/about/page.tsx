"use client";

import { useEffect } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useLanguage } from "@/lib/language-context";
import {
    AboutHero,
    AboutStory,
    AboutPhilosophy,
    AboutEngine,
    AboutValues,
    AboutStats,
    AboutCoverage,
    AboutCTA,
} from "@/components/about";

/**
 * AboutPage — Trilingual (AR/FR/EN) About Us page for 9anon AI.
 *
 * Structured for SEO:
 * - Single h1 in the hero section
 * - Semantic section hierarchy with descriptive headings
 * - Rich keyword-laden trilingual content
 * - About-specific JSON-LD injected for Organization entity
 *
 * Architecture:
 * - Each section is a separate component under components/about/
 * - Page-level scroll-reveal observer applied once
 * - Header/Footer wrapped with dir for RTL consistency
 */
export default function AboutPage() {
    const { dir } = useLanguage();

    // GSAP-like Scroll Reveal using IntersectionObserver
    // Matches existing site behavior — adds class to trigger CSS transitions
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-scroll-reveal");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        document.querySelectorAll(".scroll-animate").forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/20">
            <div dir={dir}>
                <Header />
            </div>

            {/* Hero — mission statement + animated headline */}
            <AboutHero />

            {/* Our Story — origin narrative + pull-quote */}
            <AboutStory />

            {/* Philosophy — Old Way vs 9anon Way contrast cards */}
            <AboutPhilosophy />

            {/* The Engine — tech architecture deep-dive */}
            {/* <AboutEngine /> */}

            {/* Trust Metrics — accuracy, latency, sources, uptime */}
            <AboutStats />

            {/* Core Values — 6-card grid */}
            <AboutValues />

            {/* Legal Coverage — Moroccan law domains */}
            <AboutCoverage />

            {/* CTA — call to action */}
            <AboutCTA />

            <div dir={dir}>
                <Footer />
            </div>
        </div>
    );
}
