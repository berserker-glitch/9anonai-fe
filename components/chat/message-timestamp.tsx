interface MessageTimestampProps {
    date: Date;
    align?: "left" | "right";
    className?: string;
}

export function MessageTimestamp({
    date,
    align = "left",
    className = ""
}: MessageTimestampProps) {
    const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <span
            className={`
        block mt-1
        text-[10px] text-muted-foreground
        ${align === "right" ? "text-right" : "text-left"}
        ${className}
      `}
        >
            {formattedTime}
        </span>
    );
}
