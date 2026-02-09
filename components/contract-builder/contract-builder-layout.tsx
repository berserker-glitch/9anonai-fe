"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContractBuilderLayoutProps {
    children: [ReactNode, ReactNode]; // Expects distinctly [ChatPanel, PreviewPanel]
    className?: string;
}

export function ContractBuilderLayout({ children, className }: ContractBuilderLayoutProps) {
    const [chatPanel, previewPanel] = children;
    const [leftWidth, setLeftWidth] = useState(40); // Initial percentage
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

            // Clamping the width between 20% and 80%
            if (newLeftWidth >= 20 && newLeftWidth <= 80) {
                setLeftWidth(newLeftWidth);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={cn("flex h-[calc(100vh-64px)] overflow-hidden bg-background relative", className)}
        >
            {/* Chat Panel (Left) */}
            <div
                style={{ width: `${leftWidth}%` }}
                className="h-full min-w-[300px] overflow-hidden flex flex-col border-r border-border/50"
            >
                {chatPanel}
            </div>

            {/* Resize Handle */}
            <div
                className={cn(
                    "w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors absolute z-10",
                    isDragging && "bg-primary w-1.5"
                )}
                style={{ left: `${leftWidth}%` }}
                onMouseDown={handleMouseDown}
            />

            {/* Preview Panel (Right) */}
            <div
                style={{ width: `${100 - leftWidth}%` }}
                className="h-full min-w-[400px] overflow-hidden flex flex-col bg-muted/30"
            >
                {previewPanel}
            </div>
        </div>
    );
}
