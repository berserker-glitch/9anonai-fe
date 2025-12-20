"use client";

import { useSidebar } from "./sidebar";
import { IconButton } from "../ui/icon-button";

interface SidebarHeaderProps {
    onNewChat?: () => void;
}

export function SidebarHeader({ onNewChat }: SidebarHeaderProps) {
    const { toggle } = useSidebar();

    return (
        <div className="flex items-center justify-between p-3">
            <button
                onClick={onNewChat}
                className="
          flex items-center gap-2 flex-1
          px-3 py-2.5 mr-2
          text-sm font-medium text-sidebar-foreground
          bg-sidebar-accent rounded-lg
          hover:bg-sidebar-accent/80
          transition-colors duration-200
        "
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
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
                New chat
            </button>

            <IconButton
                label="Toggle sidebar"
                onClick={toggle}
                variant="ghost"
                size="sm"
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
    );
}
