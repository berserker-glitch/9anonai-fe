"use client";

import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
    className?: string;
}

export function MainLayout({ children, className = "" }: MainLayoutProps) {
    return (
        <main className={`flex-1 flex flex-col min-w-0 ${className}`}>
            {children}
        </main>
    );
}
