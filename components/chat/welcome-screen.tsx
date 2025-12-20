"use client";

import { SuggestionCard } from "./suggestion-card";
import { Avatar } from "../ui/avatar";

interface WelcomeScreenProps {
    onSuggestionClick?: (prompt: string) => void;
    className?: string;
}

const suggestions = [
    { title: "Explain quantum computing", description: "in simple terms" },
    { title: "Write a poem", description: "about nature and technology" },
    { title: "Help me debug", description: "my React component" },
    { title: "Plan a trip", description: "to a nearby city" },
];

export function WelcomeScreen({ onSuggestionClick, className = "" }: WelcomeScreenProps) {
    return (
        <div className={`flex flex-col items-center justify-center flex-1 py-8 ${className}`}>
            {/* Logo/Avatar */}
            <div className="mb-6">
                <Avatar
                    fallback="9"
                    size="lg"
                    className="h-16 w-16 text-2xl bg-primary text-primary-foreground"
                />
            </div>

            {/* Greeting */}
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 text-center">
                How can I help you today?
            </h1>
            <p className="text-muted-foreground text-sm mb-8 text-center">
                Ask me anything or try one of these suggestions
            </p>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-4">
                {suggestions.map((suggestion) => (
                    <SuggestionCard
                        key={suggestion.title}
                        title={suggestion.title}
                        description={suggestion.description}
                        onClick={() => onSuggestionClick?.(suggestion.title + " " + suggestion.description)}
                    />
                ))}
            </div>
        </div>
    );
}
