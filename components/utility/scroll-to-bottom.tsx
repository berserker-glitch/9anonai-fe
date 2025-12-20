"use client";

import { IconButton } from "../ui/icon-button";

interface ScrollToBottomProps {
    onClick: () => void;
    isVisible: boolean;
    className?: string;
}

export function ScrollToBottom({ onClick, isVisible, className = "" }: ScrollToBottomProps) {
    if (!isVisible) return null;

    return (
        <div
            className={`
        absolute bottom-4 left-1/2 -translate-x-1/2
        animate-in fade-in-0 slide-in-from-bottom-2 duration-200
        ${className}
      `}
        >
            <IconButton
                label="Scroll to bottom"
                onClick={onClick}
                variant="secondary"
                size="md"
                className="shadow-lg border border-border"
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
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </IconButton>
        </div>
    );
}
