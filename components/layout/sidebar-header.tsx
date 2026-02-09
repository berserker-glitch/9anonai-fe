"use client";

import { useSidebar } from "./sidebar";
import { IconButton } from "../ui/icon-button";
import { useState, useEffect } from "react";

declare global {
    interface Window {
        showButton: () => void;
    }
}

interface SidebarHeaderProps {
    onNewChat?: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onOpenFiles: () => void;
}

export function SidebarHeader({ onNewChat, searchQuery, onSearchChange, onOpenFiles }: SidebarHeaderProps) {
    const { toggle } = useSidebar();
    const [showContractButton, setShowContractButton] = useState(false);

    useEffect(() => {
        // Expose function to window to show the button
        window.showButton = () => setShowContractButton(true);

        // Cleanup
        return () => {
            // @ts-ignore
            delete window.showButton;
        };
    }, []);

    return (
        <div className="flex flex-col p-3 gap-2">
            {/* Top Row: New Chat and Toggle */}
            <div className="flex items-center gap-2">
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
                    <div className="w-6 h-6 rounded-full bg-sidebar-accent/50 group-hover:bg-background flex items-center justify-center border border-border/50">
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

                {showContractButton && (
                    <a
                        href="/contract-builder"
                        className="
                            flex items-center gap-2
                            px-3 py-2
                            text-sm font-medium text-sidebar-foreground
                            hover:bg-sidebar-accent rounded-lg
                            transition-colors duration-200
                            group
                            border border-transparent hover:border-sidebar-border/50
                        "
                        title="AI Contract Builder"
                    >
                        <div className="w-6 h-6 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center text-primary">
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
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                    </a>
                )}

                <IconButton
                    label="Toggle sidebar"
                    onClick={toggle}
                    variant="ghost"
                    size="sm"
                    className="text-sidebar-foreground hover:bg-sidebar-accent"
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

            {/* Search Item */}
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

            {/* Files Item - HIDDEN */}
            {/* <button
                onClick={onOpenFiles}
                className="
                    flex items-center gap-3 w-full
                    px-3 py-2
                    text-sm font-medium text-sidebar-foreground
                    hover:bg-sidebar-accent rounded-lg
                    transition-colors duration-200
                    group
                "
            >
                <div className="relative">
                    <svg
                        className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <span>PDFs Generated</span>
                <span className="ml-auto text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">NEW</span>
            </button> */}
        </div>
    );
}
