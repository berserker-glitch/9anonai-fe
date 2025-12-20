"use client";

interface ThinkingStepsProps {
    steps: string[];
    isThinking?: boolean;
}

export function ThinkingSteps({ steps, isThinking = false }: ThinkingStepsProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="mb-3 text-xs space-y-1.5">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 text-muted-foreground animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    {isThinking && index === steps.length - 1 ? (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                    ) : (
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                    <span>{step}</span>
                </div>
            ))}
        </div>
    );
}
