import { ReactNode } from "react";

interface ChatContainerProps {
    children: ReactNode;
    className?: string;
}

export function ChatContainer({ children, className = "" }: ChatContainerProps) {
    return (
        <div
            className={`
        flex flex-col
        flex-1
        w-full max-w-4xl
        mx-auto
        px-4 sm:px-6 lg:px-8
        ${className}
      `}
        >
            {children}
        </div>
    );
}
