"use client";

import { ReactNode, FormEvent } from "react";

interface ChatInputProps {
    children: ReactNode;
    onSubmit?: () => void;
    className?: string;
    isLoading?: boolean;
}

export function ChatInput({ children, onSubmit, className = "", isLoading }: ChatInputProps) {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit?.();
    };

    return (
        <div className={`sticky bottom-0 bg-background/95 backdrop-blur-xl ${className}`}>
            <form
                onSubmit={handleSubmit}
                className="
          flex items-center gap-2
          w-full max-w-4xl mx-auto
          px-3 sm:px-6 lg:px-8
          py-2
        "
            >
                {children}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="m22 2-11 11" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
