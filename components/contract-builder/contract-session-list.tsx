"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ContractSession {
    id: string;
    title: string;
    status: string;
    updatedAt: string;
    contractType: string;
}

interface ContractSessionListProps {
    sessions: ContractSession[];
    onSelectSession: (id: string) => void;
    currentSessionId?: string | null;
    onDeleteSession?: (id: string) => void;
    onRenameSession?: (id: string, currentTitle: string) => void;
    className?: string;
}

function PencilIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" /><path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
    );
}

export function ContractSessionList({
    sessions,
    onSelectSession,
    currentSessionId,
    onDeleteSession,
    onRenameSession,
    className,
}: ContractSessionListProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    // The session currently showing the "Confirm delete?" inline panel
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const confirmTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Close the confirm panel when clicking outside
    useEffect(() => {
        if (!confirmDeleteId) return;
        const handleClickOutside = () => setConfirmDeleteId(null);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [confirmDeleteId]);

    if (sessions.length === 0) return null;

    const formatDate = (dateString: string) => {
        try {
            return new Intl.DateTimeFormat("fr-FR", {
                day: "numeric",
                month: "short",
            }).format(new Date(dateString));
        } catch {
            return "";
        }
    };

    const openConfirm = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        // Clear any existing timeout
        if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
        setConfirmDeleteId(id);
        // Auto-dismiss after 5 seconds if user does nothing
        confirmTimeoutRef.current = setTimeout(() => setConfirmDeleteId(null), 5000);
    };

    const cancelConfirm = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
        setConfirmDeleteId(null);
    };

    const confirmDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
        setConfirmDeleteId(null);
        onDeleteSession?.(id);
    };

    const handleRenameClick = (e: React.MouseEvent, id: string, title: string) => {
        e.stopPropagation();
        onRenameSession?.(id, title);
    };

    return (
        <div className={cn("space-y-0.5", className)}>
            <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                Recent Contracts
            </h3>

            {sessions.map((session) => {
                const isActive = currentSessionId === session.id;
                const isHovered = hoveredId === session.id;
                const isConfirming = confirmDeleteId === session.id;

                return (
                    <div key={session.id} className="space-y-0.5">
                        {/* Session row */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setHoveredId(session.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <button
                                onClick={() => {
                                    if (confirmDeleteId) {
                                        setConfirmDeleteId(null);
                                        return;
                                    }
                                    onSelectSession(session.id);
                                }}
                                className={cn(
                                    "w-full text-left px-2 py-2 rounded-md transition-colors text-sm",
                                    isActive
                                        ? "bg-accent text-accent-foreground"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground",
                                    isConfirming && "opacity-50 pointer-events-none"
                                )}
                            >
                                <div className="flex items-center justify-between pr-14">
                                    <span className="font-medium truncate">{session.title}</span>
                                    {session.status === "finalized" && (
                                        <span
                                            className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1"
                                            title="Finalized"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-between items-center text-[10px] opacity-60 mt-0.5">
                                    <span className="capitalize">{session.contractType}</span>
                                    <span>{formatDate(session.updatedAt)}</span>
                                </div>
                            </button>

                            {/* Hover action buttons — shown while hovering or active */}
                            {(isHovered || isActive) && !isConfirming && (onDeleteSession || onRenameSession) && (
                                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                                    {onRenameSession && (
                                        <button
                                            onClick={(e) => handleRenameClick(e, session.id, session.title)}
                                            title="Rename"
                                            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                                        >
                                            <PencilIcon />
                                        </button>
                                    )}
                                    {onDeleteSession && (
                                        <button
                                            onClick={(e) => openConfirm(e, session.id)}
                                            title="Delete"
                                            className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            <TrashIcon />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Inline confirmation panel — appears below the row on first click */}
                        {isConfirming && (
                            <div
                                className="mx-1 px-3 py-2 rounded-md bg-destructive/10 border border-destructive/20 flex items-center justify-between gap-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="text-[11px] text-destructive font-medium">
                                    Delete this contract?
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={(e) => cancelConfirm(e)}
                                        className="px-2 py-0.5 rounded text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={(e) => confirmDelete(e, session.id)}
                                        className="px-2 py-0.5 rounded text-[11px] bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
