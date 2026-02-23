"use client";

import { useEffect, useState } from "react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface ScrollSpyTocProps {
    headings: TocItem[];
    lang: string;
}

export function ScrollSpyToc({ headings, lang }: ScrollSpyTocProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -80% 0px", // Trigger when heading is near the top
            threshold: 1.0,
        };

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        // Optional: set initial active id if scrolled
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveId("");
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) observer.unobserve(element);
            });
            window.removeEventListener("scroll", handleScroll);
        };
    }, [headings]);

    const labels = {
        ar: "محتويات المقال",
        en: "Table of Contents",
        fr: "Sommaire",
    };

    const label = labels[lang as keyof typeof labels] || labels.ar;
    const isRtl = lang === "ar";

    if (headings.length < 3) return null;

    return (
        <nav
            aria-label="Table of Contents"
            className="sticky top-28 hidden lg:block p-6 rounded-2xl glass-premium border border-border/40 max-h-[80vh] overflow-y-auto w-64 xl:w-72"
        >
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                {label}
            </h2>
            <ul className="space-y-3 relative before:absolute before:inset-y-0 before:bg-border/50 before:w-px before:left-0 rtl:before:left-auto rtl:before:right-0">
                {headings.map((heading, index) => {
                    const isActive = activeId === heading.id;
                    return (
                        <li
                            key={index}
                            className={`relative ${heading.level === 3 ? (isRtl ? "pr-4" : "pl-4") : ""}`}
                        >
                            <a
                                href={`#${heading.id}`}
                                className={`text-sm transition-colors block leading-relaxed ${isActive
                                        ? "text-primary font-bold"
                                        : "text-muted-foreground hover:text-foreground"
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById(heading.id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                        // Update URL hash without jumping
                                        window.history.pushState(null, "", `#${heading.id}`);
                                        setActiveId(heading.id);
                                    }
                                }}
                            >
                                {/* Active indicator dot */}
                                <span
                                    className={`absolute top-1.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-primary scale-100" : "bg-transparent scale-0"
                                        } ${isRtl ? "-right-[3px]" : "-left-[3px]"}`}
                                />
                                {heading.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
