"use client";

import { ReactNode, useRef, useEffect } from "react";

interface MessageListProps {
    children: ReactNode;
    className?: string;
}

export function MessageList({ children, className = "" }: MessageListProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        <div
            ref={containerRef}
            className={`
        flex-1
        overflow-y-auto overflow-x-hidden
        py-4
        scroll-smooth
        ${className}
      `}
        >
            <div className="flex flex-col gap-6">
                {children}
            </div>
        </div>
    );
}
