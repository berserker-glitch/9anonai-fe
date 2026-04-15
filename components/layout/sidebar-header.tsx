"use client";

import { useSidebar } from "./sidebar";
import { IconButton } from "../ui/icon-button";

interface SidebarHeaderProps {
    onNewChat?: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onOpenFiles: () => void;
}

export function SidebarHeader({ onNewChat, searchQuery, onSearchChange, onOpenFiles }: SidebarHeaderProps) {
    const { toggle } = useSidebar();

    return (
        <div className="flex flex-col p-3 gap-2">
            {/* Top Row: New Chat, Contract Builder, Toggle */}
            <div className="flex items-center gap-1">
                {/* New Chat button */}
                <button
                    onClick={onNewChat}
                    className="
                        flex items-center gap-2 flex-1
                        px-3 py-2
                        text-sm font-medium text-sidebar-foreground
                        hover:bg-sidebar-accent rounded-lg
                        transition-colors duration-200
                        group
                    "
                >
                    <div className="w-6 h-6 rounded-full bg-sidebar-accent/50 group-hover:bg-background flex items-center justify-center border border-border/50 shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
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
                    </div>
                    New chat
                </button>

                {/* Contract Builder link — always visible */}
                <a
                    href="/contract-builder"
                    className="
                        flex items-center gap-1.5
                        px-3 py-2
                        text-sm font-medium text-sidebar-foreground
                        hover:bg-sidebar-accent rounded-lg
                        transition-colors duration-200
                        group
                        shrink-0
                    "
                    title="AI Contract Builder"
                >
                    <div className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                    </div>
                    <span className="text-xs">Contracts</span>
                </a>

                {/* Sidebar Toggle */}
                <IconButton
                    label="Toggle sidebar"
                    onClick={toggle}
                    variant="ghost"
                    size="sm"
                    className="text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M9 3v18" />
                    </svg>
                </IconButton>
            </div>

            {/* Search */}
            <div className="relative group">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70 group-focus-within:text-primary transition-colors duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" strokeWidth="2" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                </svg>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search chats"
                    className="
                        w-full pl-9 pr-3 py-2
                        bg-transparent
                        hover:bg-sidebar-accent/50 focus:bg-sidebar-accent
                        rounded-lg
                        text-sm text-sidebar-foreground
                        placeholder:text-muted-foreground/70
                        outline-none
                        transition-colors duration-200
                    "
                />
            </div>
        </div>
    );
}
