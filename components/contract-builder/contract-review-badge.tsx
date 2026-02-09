"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp } from "lucide-react";

interface ReviewIssue {
    clause: string;
    severity: "critical" | "warning" | "info";
    description: string;
    lawReference: string;
}

interface ContractReviewBadgeProps {
    issues: ReviewIssue[];
    summary: string;
    className?: string;
}

export function ContractReviewBadge({ issues, summary, className }: ContractReviewBadgeProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const criticalCount = issues.filter((i) => i.severity === "critical").length;
    const warningCount = issues.filter((i) => i.severity === "warning").length;
    const infoCount = issues.filter((i) => i.severity === "info").length;
    const totalIssues = criticalCount + warningCount + infoCount;

    const isClean = totalIssues === 0;

    return (
        <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm mb-4", className)}>
            <div
                className={cn(
                    "flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors rounded-lg",
                    isExpanded && "rounded-b-none border-b"
                )}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-full", isClean ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600")}>
                        {isClean ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">
                            {isClean ? "Legal Review Passed" : `Legal Review: ${totalIssues} Issues`}
                        </h4>
                        <p className="text-xs text-muted-foreground w-full line-clamp-1">{summary}</p>
                    </div>
                </div>
                <div>{isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
            </div>

            {isExpanded && !isClean && (
                <div className="p-3 bg-muted/20 space-y-3 max-h-[300px] overflow-y-auto">
                    {issues.map((issue, idx) => (
                        <div key={idx} className="flex gap-3 text-sm p-2 rounded border bg-background">
                            <div className="mt-0.5">
                                {issue.severity === "critical" && <AlertCircle size={16} className="text-destructive" />}
                                {issue.severity === "warning" && <AlertCircle size={16} className="text-yellow-500" />}
                                {issue.severity === "info" && <Info size={16} className="text-blue-500" />}
                            </div>
                            <div className="space-y-1">
                                <div className="font-medium flex items-center gap-2">
                                    <span className={cn(
                                        "capitalize text-xs px-1.5 py-0.5 rounded",
                                        issue.severity === "critical" && "bg-destructive/10 text-destructive",
                                        issue.severity === "warning" && "bg-yellow-100 text-yellow-700",
                                        issue.severity === "info" && "bg-blue-100 text-blue-700"
                                    )}>
                                        {issue.severity}
                                    </span>
                                    <span>{issue.clause}</span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{issue.description}</p>
                                <p className="text-xs font-mono text-primary bg-primary/5 px-1 py-0.5 rounded inline-block">
                                    {issue.lawReference}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
