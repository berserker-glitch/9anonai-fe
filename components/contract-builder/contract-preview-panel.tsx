"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ContractToolbar } from "./contract-toolbar";

interface ContractPreviewPanelProps {
    htmlContent: string;
    version: number;
    isLoading: boolean;
    onDownloadPdf: () => void;
    className?: string;
}

export function ContractPreviewPanel({
    htmlContent,
    version,
    isLoading,
    onDownloadPdf,
    className,
}: ContractPreviewPanelProps) {
    const [scale, setScale] = useState(1);
    const [isDownloading, setIsDownloading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await onDownloadPdf();
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className={cn("flex flex-col h-full bg-muted/30 relative", className)}>
            <ContractToolbar
                onDownload={handleDownload}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                scale={scale}
                version={version}
                isDownloading={isDownloading}
            />

            <div className="flex-1 overflow-auto p-8 flex justify-center bg-muted/30" ref={containerRef}>
                {htmlContent ? (
                    <div
                        className="bg-white shadow-lg text-black origin-top transition-transform duration-200 ease-out"
                        style={{
                            width: "210mm", // A4 width
                            minHeight: "297mm", // A4 height
                            padding: "20mm",
                            transform: `scale(${scale})`,
                            marginBottom: `${(scale - 1) * 300}px`, // Add margin when zoomed in to allow scrolling
                        }}
                    >
                        <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground h-full opacity-50">
                        <svg
                            className="w-16 h-16 mb-4 text-muted-foreground/50"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <p>Contract preview will appear here...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
