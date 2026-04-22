"use client";

import { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
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
        </GoogleOAuthProvider>
    );
}

