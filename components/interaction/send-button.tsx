import { ButtonHTMLAttributes, forwardRef } from "react";

interface SendButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
}

export const SendButton = forwardRef<HTMLButtonElement, SendButtonProps>(
    ({ isActive = false, className = "", ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="submit"
                className={`
          flex items-center justify-center shrink-0
          h-10 w-10
          rounded-full
          transition-all duration-200
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isActive
                        ? "bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-secondary text-muted-foreground"
                    }
          ${className}
        `}
                aria-label="Send message"
                {...props}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isActive ? "translate-x-0.5" : ""}
                >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                </svg>
            </button>
        );
    }
);

SendButton.displayName = "SendButton";
