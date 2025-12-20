"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IconButton } from "../ui/icon-button";

interface SidebarContextType {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    open: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

interface SidebarProviderProps {
    children: ReactNode;
    defaultOpen?: boolean;
}

export function SidebarProvider({ children, defaultOpen = false }: SidebarProviderProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        // Only run once on mount
        if (!hasInitialized) {
            const isDesktop = window.matchMedia("(min-width: 768px)").matches;
            if (isDesktop) {
                setIsOpen(true);
            }
            setHasInitialized(true);
        }
    }, [hasInitialized]);

    const toggle = () => setIsOpen((prev: boolean) => !prev);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    return (
        <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
            {children}
        </SidebarContext.Provider>
    );
}

interface SidebarProps {
    children: ReactNode;
    className?: string;
}

export function Sidebar({ children, className = "" }: SidebarProps) {
    const { isOpen, close, open } = useSidebar();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={close}
                />
            )}

            {/* Mobile Toggle Button - visible when sidebar is closed on mobile */}
            {!isOpen && (
                <div className="flex md:hidden fixed left-4 top-4 z-50">
                    <IconButton
                        label="Open menu"
                        onClick={open}
                        variant="ghost"
                        size="md"
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
                </div>
            )}

            {/* Desktop Toggle Button - visible when sidebar is closed */}
            {!isOpen && (
                <div className="hidden md:flex fixed left-4 top-4 z-50">
                    <IconButton
                        label="Open sidebar"
                        onClick={open}
                        variant="ghost"
                        size="md"
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
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M9 3v18" />
                        </svg>
                    </IconButton>
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:relative inset-y-0 left-0 z-50
          flex flex-col shrink-0
          w-[280px] h-full
          bg-sidebar
          transition-all duration-300 ease-in-out
          ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:-translate-x-full"
                    }
          ${!isOpen && "md:w-0 md:overflow-hidden"}
          ${className}
        `}
            >
                <div className={`flex flex-col h-full w-[280px] transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    {children}
                </div>
            </aside>
        </>
    );
}
