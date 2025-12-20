interface SuggestionCardProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export function SuggestionCard({
    title,
    description,
    icon,
    onClick,
}: SuggestionCardProps) {
    return (
        <button
            onClick={onClick}
            className="
        flex items-start gap-3
        p-4
        text-left
        bg-card hover:bg-accent
        border border-border
        rounded-xl
        card-hover hover-glow
        transition-theme
        group
      "
        >
            {icon ? (
                <span className="text-muted-foreground group-hover:text-primary transition-colors duration-200">
                    {icon}
                </span>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground group-hover:text-primary transition-all duration-200 shrink-0 mt-0.5 group-hover:translate-x-0.5"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors duration-200">{title}</p>
                {description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </button>
    );
}
