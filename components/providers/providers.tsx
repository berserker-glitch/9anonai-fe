"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            <LanguageProvider defaultNamespaces={["landing", "tos", "privacy"]}>
                <ThemeProvider defaultTheme="dark">
                    {children}
                </ThemeProvider>
            </LanguageProvider>
        </AuthProvider>
    );
}

