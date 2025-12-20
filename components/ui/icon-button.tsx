import { forwardRef, ButtonHTMLAttributes } from "react";

type IconButtonSize = "sm" | "md" | "lg";
type IconButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: IconButtonSize;
    variant?: IconButtonVariant;
    label: string;
}

const sizeStyles: Record<IconButtonSize, string> = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
};

const variantStyles: Record<IconButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground",
    outline: "border border-border bg-transparent hover:bg-accent text-foreground",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ size = "md", variant = "ghost", label, children, className = "", ...props }, ref) => {
        return (
            <button
                ref={ref}
                aria-label={label}
                title={label}
                className={`
          inline-flex items-center justify-center
          rounded-full transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
          disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${className}
        `}
                {...props}
            >
                {children}
            </button>
        );
    }
);

IconButton.displayName = "IconButton";
