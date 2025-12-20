interface TypingIndicatorProps {
    className?: string;
}

export function TypingIndicator({ className = "" }: TypingIndicatorProps) {
    return (
        <div className={`flex items-center gap-1.5 px-1 py-1 ${className}`}>
            <span className="h-2 w-2 rounded-full bg-primary typing-dot" />
            <span className="h-2 w-2 rounded-full bg-primary typing-dot" />
            <span className="h-2 w-2 rounded-full bg-primary typing-dot" />
        </div>
    );
}
