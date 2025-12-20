"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/lib/auth-context";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            <ThemeProvider defaultTheme="dark">
                {children}
            </ThemeProvider>
        </AuthProvider>
    );
}
