"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, languages, Language } from "@/lib/language-context";

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Language flags/icons
    const langIcons: Record<Language, string> = {
        ar: "🇲🇦",
        en: "🇬🇧",
        fr: "🇫🇷",
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Enhanced Button - More Visible */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium bg-accent/30 hover:bg-accent/50 border border-border/50 hover:border-primary/30 rounded-xl transition-all duration-300 group"
                aria-label="Select language"
            >
                <span className="text-lg">{langIcons[language]}</span>
                <span className="font-medium text-foreground">{languages[language].nativeName}</span>
                <svg className={`w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-all duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full mt-2 right-0 min-w-[180px] py-2 glass-premium rounded-xl border border-border/50 shadow-2xl animate-reveal-up z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30 mb-1">
                        Select Language
                    </div>
                    {(Object.keys(languages) as Language[]).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => {
                                setLanguage(lang);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent/50 transition-colors duration-200 ${language === lang
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-foreground"
                                }`}
                        >
                            <span className="text-lg">{langIcons[lang]}</span>
                            <span className="flex-1 text-left">{languages[lang].nativeName}</span>
                            {language === lang && (
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
