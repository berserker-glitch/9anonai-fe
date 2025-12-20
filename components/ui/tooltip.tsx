"use client";

import { useState, useRef, ReactNode } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
    content: string;
    children: ReactNode;
    position?: TooltipPosition;
    delay?: number;
}

const positionStyles: Record<TooltipPosition, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<TooltipPosition, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-popover border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-popover border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-popover border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-popover border-y-transparent border-l-transparent",
};

export function Tooltip({
    content,
    children,
    position = "top",
    delay = 200,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>(undefined);

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = () => {
        clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {isVisible && (
                <div
                    className={`
            absolute z-50 ${positionStyles[position]}
            px-2.5 py-1.5
            text-xs font-medium
            bg-popover text-popover-foreground
            rounded-md shadow-lg
            whitespace-nowrap
            animate-in fade-in-0 zoom-in-95 duration-150
          `}
                    role="tooltip"
                >
                    {content}
                    <span
                        className={`
              absolute border-4
              ${arrowStyles[position]}
            `}
                    />
                </div>
            )}
        </div>
    );
}
