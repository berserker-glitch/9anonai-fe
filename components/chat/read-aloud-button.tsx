"use client";

import { useState } from "react";
import { IconButton } from "../ui/icon-button";
import { Tooltip } from "../ui/tooltip";

interface ReadAloudButtonProps {
    text: string;
    className?: string;
}

export function ReadAloudButton({ text, className = "" }: ReadAloudButtonProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    const handleToggle = () => {
        if (isPlaying) {
            // Stop
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            // Start
            const newUtterance = new SpeechSynthesisUtterance(text);

            // Auto-detect language
            const arabicPattern = /[\u0600-\u06FF]/;
            const frenchPattern = /[\u00C0-\u00FF]/;

            if (arabicPattern.test(text)) {
                newUtterance.lang = "ar-MA"; // Moroccan Arabic
            } else if (frenchPattern.test(text)) {
                newUtterance.lang = "fr-FR";
            } else {
                newUtterance.lang = "en-US";
            }

            newUtterance.onend = () => setIsPlaying(false);
            newUtterance.onerror = () => setIsPlaying(false);

            setUtterance(newUtterance);
            window.speechSynthesis.speak(newUtterance);
            setIsPlaying(true);
        }
    };

    return (
        <Tooltip content={isPlaying ? "Stop" : "Read aloud"}>
            <IconButton
                label={isPlaying ? "Stop reading" : "Read aloud"}
                size="sm"
                variant="ghost"
                onClick={handleToggle}
                className={`h-7 w-7 ${isPlaying ? "text-primary" : ""} ${className}`}
            >
                {isPlaying ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                    >
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                )}
            </IconButton>
        </Tooltip>
    );
}
