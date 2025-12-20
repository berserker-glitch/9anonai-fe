import { HTMLAttributes } from "react";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
    size?: SpinnerSize;
}

const sizeStyles: Record<SpinnerSize, string> = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-[3px]",
};

export function Spinner({ size = "md", className = "", ...props }: SpinnerProps) {
    return (
        <div
            className={`
        ${sizeStyles[size]}
        rounded-full
        border-primary/30
        border-t-primary
        animate-spin
        ${className}
      `}
            role="status"
            aria-label="Loading"
            {...props}
        />
    );
}
