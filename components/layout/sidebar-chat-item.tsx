"use client";

import { useState } from "react";
import { IconButton } from "../ui/icon-button";

interface SidebarChatItemProps {
    id: string;
    title: string;
    isActive?: boolean;
    isPinned?: boolean;
    onClick?: () => void;
    onRename?: (id: string) => void;
    onDelete?: (id: string) => void;
    onPin?: (id: string) => void;
}

export function SidebarChatItem({
    id,
    title,
    isActive = false,
    isPinned = false,
    onClick,
    onRename,
    onDelete,
    onPin,
}: SidebarChatItemProps) {
    const [showActions, setShowActions] = useState(false);

    return (
        <div
            className={`
        group relative flex items-center gap-2
        px-3 py-2.5 rounded-lg
        cursor-pointer
        transition-colors duration-150
        ${isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                }
      `}
            onClick={onClick}
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
        >
            {/* Pin indicator */}
            {isPinned && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="shrink-0 text-primary">
                    <path d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
                </svg>
            )}
            {!isPinned && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 opacity-60"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            )}

            <span className="flex-1 truncate text-sm">{title}</span>

            {/* Action buttons on hover */}
            {showActions && (
                <div className="absolute right-1 flex items-center gap-0.5 bg-sidebar-accent rounded-md p-0.5">
                    {/* Pin button */}
                    <IconButton
                        label={isPinned ? "Unpin" : "Pin"}
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPin?.(id);
                        }}
                        className={`h-6 w-6 ${isPinned ? "text-primary" : ""}`}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={isPinned ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="17" x2="12" y2="22" />
                            <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
                        </svg>
                    </IconButton>
                    <IconButton
                        label="Rename"
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRename?.(id);
                        }}
                        className="h-6 w-6"
                    >
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
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                        </svg>
                    </IconButton>
                    <IconButton
                        label="Delete"
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(id);
                        }}
                        className="h-6 w-6 text-destructive hover:text-destructive"
                    >
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
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                    </IconButton>
                </div>
            )}
        </div>
    );
}

