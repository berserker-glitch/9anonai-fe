"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";
import { ToastProvider } from "@/components/ui/toast";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

interface ProvidersProps {
    children: ReactNode;
}

// @ts-ignore
export function Providers({ children, lang }: ProvidersProps & { lang?: string }) {
    return (
        <AuthProvider>
            <LanguageProvider defaultNamespaces={["landing", "tos", "privacy", "auth"]} initialLanguage={lang as any}>
                <ThemeProvider defaultTheme="dark">
                    <ToastProvider>
                        <SmoothScrollProvider>
                            {children}
                        </SmoothScrollProvider>
                    </ToastProvider>
                </ThemeProvider>
            </LanguageProvider>
        </AuthProvider>
    );
}

