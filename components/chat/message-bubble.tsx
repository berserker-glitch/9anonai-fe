import { ReactNode } from "react";

interface MessageBubbleProps {
    children: ReactNode;
    variant: "user" | "assistant";
    className?: string;
}

export function MessageBubble({ children, variant, className = "" }: MessageBubbleProps) {
    return (
        <div
            className={`
        flex w-full
        message-enter
        ${variant === "user" ? "justify-end" : "justify-start"}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
