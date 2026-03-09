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
        flex-1 w-full
        ${className}
      `}
        >
            {children}
        </div>
    );
}
