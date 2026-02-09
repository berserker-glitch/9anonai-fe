"use client";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
    className?: string;
}

export function ContractSessionList({
    sessions,
    onSelectSession,
    currentSessionId,
    className,
}: ContractSessionListProps) {
    if (sessions.length === 0) return null;

    return (
        <div className={cn("space-y-1", className)}>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                Recent Contracts
            </h3>
            {sessions.map((session) => (
                <button
                    key={session.id}
                    onClick={() => onSelectSession(session.id)}
                    className={cn(
                        "w-full text-left p-2 rounded-md transition-colors text-sm group relative",
                        currentSessionId === session.id
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-medium truncate pr-2">{session.title}</span>
                        {session.status === "finalized" && (
                            <span className="shrink-0 w-2 h-2 rounded-full bg-green-500" title="Finalized" />
                        )}
                    </div>
                    <div className="flex justify-between items-center text-[10px] opacity-70 mt-0.5">
                        <span className="capitalize">{session.contractType}</span>
                        <span>
                            {format(new Date(session.updatedAt), "dd MMM", { locale: fr })}
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );
}
