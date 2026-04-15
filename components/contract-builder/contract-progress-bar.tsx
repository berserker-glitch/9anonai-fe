"use client";

import { cn } from "@/lib/utils";

interface ContractProgressBarProps {
    currentStep: string | null;
    isStreaming: boolean;
    className?: string;
}

// Maps known step substrings to a progress percentage and label
const STEP_MAP: { match: string; progress: number; phase: "search" | "draft" | "review" | "done" }[] = [
    { match: "searching",   progress: 15, phase: "search" },
    { match: "recherche",   progress: 15, phase: "search" },
    { match: "بحث",         progress: 15, phase: "search" },
    { match: "found",       progress: 35, phase: "search" },
    { match: "trouvé",      progress: 35, phase: "search" },
    { match: "référence",   progress: 35, phase: "search" },
    { match: "drafting",    progress: 55, phase: "draft" },
    { match: "rédaction",   progress: 55, phase: "draft" },
    { match: "صياغة",       progress: 55, phase: "draft" },
    { match: "reviewing",   progress: 78, phase: "review" },
    { match: "révision",    progress: 78, phase: "review" },
    { match: "مراجع",       progress: 78, phase: "review" },
    { match: "ready",       progress: 100, phase: "done" },
    { match: "prêt",        progress: 100, phase: "done" },
    { match: "جاهز",        progress: 100, phase: "done" },
];

function resolveProgress(step: string | null): { progress: number; phase: string } {
    if (!step) return { progress: 0, phase: "" };
    const lower = step.toLowerCase();
    for (const entry of STEP_MAP) {
        if (lower.includes(entry.match.toLowerCase())) {
            return { progress: entry.progress, phase: entry.phase };
        }
    }
    return { progress: 20, phase: "search" };
}

// Phase icons
function SearchIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}
function PenIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    );
}
function ShieldIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    );
}
function CheckIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

const phaseIcons: Record<string, React.ReactNode> = {
    search: <SearchIcon />,
    draft:  <PenIcon />,
    review: <ShieldIcon />,
    done:   <CheckIcon />,
};

export function ContractProgressBar({ currentStep, isStreaming, className }: ContractProgressBarProps) {
    if (!isStreaming && !currentStep) return null;

    const { progress, phase } = resolveProgress(currentStep);
    const isDone = phase === "done";

    return (
        <div className={cn("px-4 py-2 border-t bg-background/80 backdrop-blur-sm", className)}>
            {/* Step label row */}
            <div className="flex items-center gap-2 mb-1.5">
                <span className={cn(
                    "flex items-center gap-1.5 text-xs font-medium",
                    isDone ? "text-emerald-600 dark:text-emerald-400" : "text-primary"
                )}>
                    <span className={cn(isDone ? "text-emerald-600 dark:text-emerald-400" : "text-primary")}>
                        {phaseIcons[phase] || <SearchIcon />}
                    </span>
                    {currentStep || "..."}
                </span>
                {!isDone && (
                    <span className="ml-auto text-[10px] text-muted-foreground font-mono">{progress}%</span>
                )}
            </div>

            {/* Progress bar track */}
            <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out",
                        isDone
                            ? "bg-emerald-500"
                            : "bg-primary",
                        !isDone && "animate-pulse"
                    )}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
