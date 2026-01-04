"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

// Supported languages
export type Language = "ar" | "en" | "fr";

// Language metadata
export const languages: Record<Language, { name: string; nativeName: string; dir: "ltr" | "rtl" }> = {
    ar: { name: "Arabic", nativeName: "العربية", dir: "rtl" },
    en: { name: "English", nativeName: "English", dir: "ltr" },
    fr: { name: "French", nativeName: "Français", dir: "ltr" },
};

// Translation cache type
type TranslationCache = Record<string, Record<string, any>>;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, namespace?: string) => string;
    dir: "ltr" | "rtl";
    isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Load translations dynamically
async function loadTranslations(lang: Language, namespace: string): Promise<Record<string, any>> {
    try {
        const response = await fetch(`/locales/${lang}/${namespace}.json`);
        if (!response.ok) {
            console.warn(`Failed to load translations for ${lang}/${namespace}`);
            return {};
        }
        return await response.json();
    } catch (error) {
        console.warn(`Error loading translations for ${lang}/${namespace}:`, error);
        return {};
    }
}

// Get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
    const result = path.split(".").reduce<unknown>((acc, key) => {
        if (acc && typeof acc === "object" && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
    return typeof result === "string" ? result : undefined;
}

interface LanguageProviderProps {
    children: ReactNode;
    defaultNamespaces?: string[];
}

export function LanguageProvider({ children, defaultNamespaces = ["landing"] }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>("ar");
    const [translations, setTranslations] = useState<TranslationCache>({});
    const [isLoading, setIsLoading] = useState(true);

    // Initialize language from localStorage or browser
    useEffect(() => {
        const stored = localStorage.getItem("9anon-language") as Language | null;
        if (stored && languages[stored]) {
            setLanguageState(stored);
        } else {
            // Detect browser language
            const browserLang = navigator.language.split("-")[0] as Language;
            if (languages[browserLang]) {
                setLanguageState(browserLang);
            }
        }
    }, []);

    // Load translations when language changes
    useEffect(() => {
        async function load() {
            setIsLoading(true);
            const newTranslations: TranslationCache = {};

            for (const namespace of defaultNamespaces) {
                const cacheKey = `${language}-${namespace}`;
                if (!translations[cacheKey]) {
                    newTranslations[cacheKey] = await loadTranslations(language, namespace);
                }
            }

            setTranslations(prev => ({ ...prev, ...newTranslations }));
            setIsLoading(false);
        }

        load();
    }, [language, defaultNamespaces]);

    // Update HTML lang attribute only (not dir - that's handled per-page)
    useEffect(() => {
        document.documentElement.lang = language;
        // Note: dir is intentionally NOT set globally
        // Landing pages apply dir themselves, chat interface stays LTR
    }, [language]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("9anon-language", lang);
    }, []);

    const t = useCallback((key: string, namespace: string = "landing"): string => {
        const cacheKey = `${language}-${namespace}`;
        const trans = translations[cacheKey];

        if (!trans) {
            return key; // Return key if translations not loaded
        }

        const value = getNestedValue(trans, key);
        return value ?? key; // Return key if translation not found
    }, [language, translations]);

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t,
                dir: languages[language].dir,
                isLoading,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

// Shorthand for translation
export function useTranslation(namespace?: string) {
    const { t, language, dir, isLoading } = useLanguage();

    const translate = useCallback((key: string) => t(key, namespace), [t, namespace]);

    return { t: translate, language, dir, isLoading };
}
