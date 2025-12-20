"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { IconButton } from "../ui/icon-button";

interface DropdownMenuProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: "start" | "end";
}

export function DropdownMenu({ trigger, children, align = "end" }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={menuRef} className="relative inline-block">
            <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

            {isOpen && (
                <div
                    className={`
            absolute z-50 mt-1
            min-w-[180px]
            bg-popover text-popover-foreground
            border border-border
            rounded-lg shadow-lg
            py-1
            animate-in fade-in-0 zoom-in-95 duration-150
            ${align === "end" ? "right-0" : "left-0"}
          `}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

interface DropdownMenuItemProps {
    children: ReactNode;
    onClick?: () => void;
    destructive?: boolean;
    icon?: ReactNode;
}

export function DropdownMenuItem({
    children,
    onClick,
    destructive = false,
    icon,
}: DropdownMenuItemProps) {
    return (
        <button
            onClick={onClick}
            className={`
        w-full flex items-center gap-2
        px-3 py-2
        text-sm text-left
        transition-colors duration-150
        ${destructive
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-accent"
                }
      `}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {children}
        </button>
    );
}

interface DropdownMenuSeparatorProps { }

export function DropdownMenuSeparator({ }: DropdownMenuSeparatorProps) {
    return <div className="h-px bg-border my-1" />;
}
