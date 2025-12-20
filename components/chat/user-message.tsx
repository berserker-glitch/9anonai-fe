"use client";

import { ReactNode } from "react";

interface UserMessageProps {
    children: ReactNode;
    className?: string;
}

export function UserMessage({ children, className = "" }: UserMessageProps) {
    return (
        <div
            className={`
        inline-block max-w-[85%]
        px-4 py-2.5
        rounded-2xl rounded-br-md
        bg-emerald-500
        text-white
        shadow-md
        ${className}
      `}
        >
            {children}
        </div>
    );
}
