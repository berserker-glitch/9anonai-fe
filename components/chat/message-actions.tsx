"use client";

import { useState } from "react";
import { IconButton } from "../ui/icon-button";
import { Tooltip } from "../ui/tooltip";
import { ReadAloudButton } from "./read-aloud-button";

interface MessageActionsProps {
    messageId?: string;
    chatId?: string;
    content?: string;  // For TTS
    onCopy?: () => void;
    onRegenerate?: () => void;
    onFeedback?: (feedback: "like" | "dislike" | null) => void;
    initialFeedback?: "like" | "dislike" | null;
    showRegenerate?: boolean;
    // Version navigation
    currentVersion?: number;
    totalVersions?: number;
    onPrevVersion?: () => void;
    onNextVersion?: () => void;
    className?: string;
}

export function MessageActions({
    messageId,
    chatId,
    content,
    onCopy,
    onRegenerate,
    onFeedback,
    initialFeedback = null,
    showRegenerate = true,
    currentVersion,
    totalVersions,
    onPrevVersion,
    onNextVersion,
    className = "",
}: MessageActionsProps) {
    const [copied, setCopied] = useState(false);
    const [feedback, setFeedback] = useState<"like" | "dislike" | null>(initialFeedback);

    const handleCopy = () => {
        onCopy?.();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleLike = () => {
        const newFeedback = feedback === "like" ? null : "like";
        setFeedback(newFeedback);
        onFeedback?.(newFeedback);
    };

    const handleDislike = () => {
        const newFeedback = feedback === "dislike" ? null : "dislike";
        setFeedback(newFeedback);
        onFeedback?.(newFeedback);
    };

    const hasVersions = totalVersions && totalVersions > 1;

    return (
        <div className={`flex items-center gap-0.5 mt-2 ${className}`}>
            {/* Version Navigation */}
            {hasVersions && (
                <div className="flex items-center gap-1 mr-2 text-xs text-muted-foreground">
                    <IconButton
                        label="Previous version"
                        size="sm"
                        variant="ghost"
                        onClick={onPrevVersion}
                        disabled={currentVersion === 1}
                        className="h-6 w-6"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </IconButton>
                    <span>{currentVersion}/{totalVersions}</span>
                    <IconButton
                        label="Next version"
                        size="sm"
                        variant="ghost"
                        onClick={onNextVersion}
                        disabled={currentVersion === totalVersions}
                        className="h-6 w-6"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </IconButton>
                </div>
            )}

            <Tooltip content={copied ? "Copied!" : "Copy"}>
                <IconButton
                    label="Copy message"
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy}
                    className="h-7 w-7"
                >
                    {copied ? (
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
                            className="text-emerald-500"
                        >
                            <polyline points="20 6 9 17 4 12" />
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
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                    )}
                </IconButton>
            </Tooltip>

            {showRegenerate && (
                <Tooltip content="Regenerate">
                    <IconButton
                        label="Regenerate response"
                        size="sm"
                        variant="ghost"
                        onClick={onRegenerate}
                        className="h-7 w-7"
                    >
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
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M3 21v-5h5" />
                        </svg>
                    </IconButton>
                </Tooltip>
            )}

            {/* Read Aloud */}
            {content && <ReadAloudButton text={content} />}

            <Tooltip content="Good response">
                <IconButton
                    label="Like"
                    size="sm"
                    variant="ghost"
                    onClick={handleLike}
                    className={`h-7 w-7 ${feedback === "like" ? "text-emerald-500" : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={feedback === "like" ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                </IconButton>
            </Tooltip>

            <Tooltip content="Bad response">
                <IconButton
                    label="Dislike"
                    size="sm"
                    variant="ghost"
                    onClick={handleDislike}
                    className={`h-7 w-7 ${feedback === "dislike" ? "text-destructive" : ""}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={feedback === "dislike" ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M17 14V2" />
                        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                    </svg>
                </IconButton>
            </Tooltip>
        </div>
    );
}
