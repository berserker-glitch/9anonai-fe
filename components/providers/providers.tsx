"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";

interface ProvidersProps {
    children: ReactNode;
}

// @ts-ignore
export function Providers({ children, lang }: ProvidersProps & { lang?: string }) {
    return (
        <AuthProvider>
            <LanguageProvider defaultNamespaces={["landing", "tos", "privacy"]} initialLanguage={lang as any}>
                <ThemeProvider defaultTheme="dark">
                    {children}
                </ThemeProvider>
            </LanguageProvider>
        </AuthProvider>
    );
}

