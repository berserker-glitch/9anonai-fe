import { ButtonHTMLAttributes, forwardRef } from "react";

interface StopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export const StopButton = forwardRef<HTMLButtonElement, StopButtonProps>(
    ({ className = "", ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                className={`
          flex items-center justify-center shrink-0
          h-10 w-10
          rounded-full
          bg-secondary hover:bg-secondary/80
          text-foreground
          transition-all duration-200
          active:scale-95
          border border-border
          ${className}
        `}
                {...props}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                >
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
            </button>
        );
    }
);

StopButton.displayName = "StopButton";
