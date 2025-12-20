import { HTMLAttributes } from "react";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: AvatarSize;
    isOnline?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
    xl: "h-12 w-12 text-lg",
};

const statusSizeStyles: Record<AvatarSize, string> = {
    sm: "h-2 w-2 border",
    md: "h-2.5 w-2.5 border-[1.5px]",
    lg: "h-3 w-3 border-2",
    xl: "h-3.5 w-3.5 border-2",
};

export function Avatar({
    src,
    alt = "Avatar",
    fallback,
    size = "md",
    isOnline,
    className = "",
    ...props
}: AvatarProps) {
    const initials = fallback
        ? fallback
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "?";

    return (
        <div className={`relative inline-block ${className}`} {...props}>
            <div
                className={`
          ${sizeStyles[size]}
          rounded-full overflow-hidden
          bg-gradient-to-br from-primary to-emerald-400
          flex items-center justify-center
          font-medium text-primary-foreground
          ring-2 ring-background
        `}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </div>
            {isOnline !== undefined && (
                <span
                    className={`
            absolute -bottom-0.5 -right-0.5
            ${statusSizeStyles[size]}
            rounded-full border-background
            ${isOnline ? "bg-emerald-500" : "bg-muted-foreground"}
          `}
                />
            )}
        </div>
    );
}
