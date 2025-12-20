import { ReactNode } from "react";
import { Avatar } from "../ui/avatar";

interface AssistantMessageProps {
    children: ReactNode;
    showAvatar?: boolean;
    className?: string;
}

export function AssistantMessage({
    children,
    showAvatar = true,
    className = ""
}: AssistantMessageProps) {
    return (
        <div className={`flex gap-3 max-w-[90%] md:max-w-[85%] ${className}`}>
            {showAvatar && (
                <Avatar
                    fallback="AI"
                    size="md"
                    className="shrink-0 mt-1"
                />
            )}
            <div
                className={`
          flex-1
          px-4 py-3
          rounded-2xl rounded-bl-md
          bg-card
          text-card-foreground
        `}
            >
                {children}
            </div>
        </div>
    );
}
