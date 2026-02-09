"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ContractToolbarProps {
    onDownload: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    scale: number;
    version: number;
    isDownloading?: boolean;
    className?: string;
}

export function ContractToolbar({
    onDownload,
    onZoomIn,
    onZoomOut,
    scale,
    version,
    isDownloading,
    className,
}: ContractToolbarProps) {
    return (
        <div className={cn("flex items-center justify-between p-2 border-b bg-background/50 backdrop-blur sticky top-0 z-10", className)}>
            <div className="flex items-center gap-2">
                <div className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                    v{version}.0
                </div>
            </div>

            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
                <Button variant="ghost" size="sm" onClick={onZoomOut} className="h-8 w-8 p-0">
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
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </Button>
                <span className="text-xs font-medium w-12 text-center select-none">
                    {Math.round(scale * 100)}%
                </span>
                <Button variant="ghost" size="sm" onClick={onZoomIn} className="h-8 w-8 p-0">
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
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </Button>
            </div>

            <Button size="sm" onClick={onDownload} disabled={isDownloading} className="gap-2">
                {isDownloading ? (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : (
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
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                )}
                {isDownloading ? "Exporting..." : "Download PDF"}
            </Button>
        </div>
    );
}
