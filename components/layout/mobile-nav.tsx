"use client";

import { useSidebar } from "./sidebar";
import { IconButton } from "../ui/icon-button";

interface MobileNavProps {
    title?: string;
    onNewChat?: () => void;
}

export function MobileNav({ title = "9anon AI", onNewChat }: MobileNavProps) {
    const { open } = useSidebar();

    return (
        <header className="sticky top-0 z-30 flex md:hidden items-center justify-between h-12 px-3 bg-background/80 backdrop-blur-xl border-b border-border">
            <IconButton
                label="Open menu"
                onClick={open}
                variant="ghost"
                size="sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
            </IconButton>

            <span className="text-sm font-semibold text-foreground">{title}</span>

            <IconButton
                label="New chat"
                onClick={onNewChat}
                variant="ghost"
                size="sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
            </IconButton>
        </header>
    );
}
