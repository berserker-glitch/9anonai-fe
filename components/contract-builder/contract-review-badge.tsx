"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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

    // Icons as SVG components
    const CheckCircleIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    );

    const AlertCircleIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
    );

    const InfoIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    );

    const ChevronDownIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );

    const ChevronUpIcon = ({ className }: { className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    );

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
                        {isClean ? <CheckCircleIcon /> : <AlertCircleIcon />}
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">
                            {isClean ? "Legal Review Passed" : `Legal Review: ${totalIssues} Issues`}
                        </h4>
                        <p className="text-xs text-muted-foreground w-full line-clamp-1">{summary}</p>
                    </div>
                </div>
                <div>{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
            </div>

            {isExpanded && !isClean && (
                <div className="p-3 bg-muted/20 space-y-3 max-h-[300px] overflow-y-auto">
                    {issues.map((issue, idx) => (
                        <div key={idx} className="flex gap-3 text-sm p-2 rounded border bg-background">
                            <div className="mt-0.5 shrink-0">
                                {issue.severity === "critical" && <AlertCircleIcon className="text-destructive h-4 w-4" />}
                                {issue.severity === "warning" && <AlertCircleIcon className="text-yellow-500 h-4 w-4" />}
                                {issue.severity === "info" && <InfoIcon className="text-blue-500 h-4 w-4" />}
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
