"use client";

import { useRef, useEffect, useState, FormEvent } from "react";

interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onFileUpload?: (files: FileList) => void;
    attachedFiles?: File[];
    onRemoveFile?: (index: number) => void;
    isLoading?: boolean;
    placeholder?: string;
    className?: string;
    /** Whether the current user's plan allows file uploads (Pro+). Defaults to false. */
    canUpload?: boolean;
    /**
     * "chat"    → compact height, sticky to bottom (default)
     * "welcome" → expanded height, centered on page, not sticky
     */
    variant?: "chat" | "welcome";
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function FileChipIcon({ file }: { file: File }) {
    if (file.type.startsWith("image/")) {
        return (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        );
    }
    if (file.name.endsWith(".pdf") || file.type === "application/pdf") {
        return (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        );
    }
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    );
}

export function ChatInput({
    value,
    onChange,
    onSubmit,
    onFileUpload,
    attachedFiles = [],
    onRemoveFile,
    isLoading = false,
    placeholder = "Message 9anon AI...",
    className = "",
    canUpload = false,
    variant = "chat",
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const isWelcome = variant === "welcome";

    // Auto-resize textarea
    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = `${Math.min(ta.scrollHeight, isWelcome ? 240 : 200)}px`;
    }, [value, isWelcome]);

    const handleSubmit = (e?: FormEvent) => {
        e?.preventDefault();
        if (isLoading || (!value.trim() && attachedFiles.length === 0)) return;
        onSubmit();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileUpload?.(e.target.files);
            e.target.value = "";
        }
    };

    const hasContent = value.trim().length > 0 || attachedFiles.length > 0;

    const card = (
        <form
            onSubmit={handleSubmit}
            className={[
                "relative w-full max-w-4xl mx-auto overflow-hidden",
                "border bg-card",
                "transition-all duration-300 ease-out",
                isWelcome ? "rounded-3xl" : "rounded-2xl",
                isFocused || hasContent
                    ? "border-primary/30 shadow-[0_0_0_3px_oklch(0.45_0.14_160_/_0.07),_0_6px_28px_rgba(0,0,0,0.08)]"
                    : isWelcome
                        ? "border-border/50 shadow-[0_4px_28px_rgba(0,0,0,0.06),_0_1px_6px_rgba(0,0,0,0.04)]"
                        : "border-border/60 shadow-[0_2px_12px_rgba(0,0,0,0.04),_0_1px_4px_rgba(0,0,0,0.03)]",
            ].join(" ")}
        >
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt,.md,.csv"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* ── File chips ─────────────────────────────────────────── */}
            {attachedFiles.length > 0 && (
                <div className={`flex flex-wrap gap-1.5 ${isWelcome ? "px-4 pt-4" : "px-3 pt-2.5"}`}>
                    {attachedFiles.map((file, idx) => (
                        <div
                            key={`${file.name}-${idx}`}
                            className="flex items-center gap-1.5 px-2 py-1 bg-primary/8 border border-primary/12 rounded-lg text-[11px] font-medium text-foreground/70"
                        >
                            <span className="text-primary/60 shrink-0">
                                <FileChipIcon file={file} />
                            </span>
                            <span className="max-w-[140px] truncate">{file.name}</span>
                            <span className="text-muted-foreground/35 tabular-nums shrink-0">
                                {formatFileSize(file.size)}
                            </span>
                            <button
                                type="button"
                                onClick={() => onRemoveFile?.(idx)}
                                className="shrink-0 ml-0.5 text-muted-foreground/35 hover:text-foreground/70 transition-colors"
                                aria-label={`Remove ${file.name}`}
                            >
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Textarea ───────────────────────────────────────────── */}
            <div className={isWelcome ? "px-5 pt-5 pb-2" : "px-4 pt-3 pb-1"}>
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    rows={1}
                    dir="auto"
                    className={[
                        "w-full bg-transparent border-none outline-none resize-none",
                        "text-foreground placeholder:text-muted-foreground/40",
                        "text-base leading-relaxed overflow-y-auto",
                        isWelcome ? "min-h-[80px] max-h-[240px]" : "min-h-[42px] max-h-[200px]",
                    ].join(" ")}
                    style={{ fontFamily: "inherit" }}
                />
            </div>

            {/* ── Bottom toolbar (always ltr: attach left, send right) ── */}
            <div
                dir="ltr"
                className={[
                    "flex items-center justify-between gap-3",
                    isWelcome ? "px-4 pb-4 pt-1.5" : "px-3 pb-2.5 pt-0.5",
                ].join(" ")}
            >
                {/* Left: attach button + keyboard hint */}
                <div className="flex items-center gap-2.5">
                    {canUpload && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        data-attach-button
                        title="Attach file"
                        aria-label="Attach file"
                        className={[
                            "flex items-center justify-center shrink-0",
                            "bg-primary/10 border border-primary/15 text-primary",
                            "hover:bg-primary/15 hover:border-primary/22",
                            "rounded-xl transition-all duration-150 active:scale-95",
                            isWelcome ? "w-9 h-9" : "w-7 h-7",
                        ].join(" ")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={isWelcome ? 16 : 14}
                            height={isWelcome ? 16 : 14}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                    </button>
                    )}

                    <span
                        className={[
                            "font-mono select-none",
                            isWelcome
                                ? "text-[10px] text-muted-foreground/28"
                                : "text-[10px] text-muted-foreground/20 hidden sm:block",
                        ].join(" ")}
                    >
                        ↵&thinsp;send&emsp;⇧↵&thinsp;newline
                    </span>
                </div>

                {/* Right: generating pill or send button */}
                {isLoading ? (
                    <div
                        className={[
                            "flex items-center gap-1.5 rounded-xl select-none",
                            "bg-muted/50 border border-border/40 text-muted-foreground/50 font-medium",
                            isWelcome ? "h-9 px-4 text-sm" : "h-7 px-3 text-xs",
                        ].join(" ")}
                    >
                        <svg
                            className="animate-spin shrink-0 text-primary"
                            width={isWelcome ? 14 : 12}
                            height={isWelcome ? 14 : 12}
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
                            <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        <span className="hidden sm:inline">Generating</span>
                    </div>
                ) : (
                    <button
                        type="submit"
                        disabled={!hasContent}
                        className={[
                            "flex items-center gap-1.5 rounded-xl font-semibold tracking-wide",
                            "transition-all duration-200 ease-out",
                            isWelcome ? "h-9 text-sm" : "h-7 text-xs",
                            hasContent
                                ? [
                                    isWelcome ? "px-5" : "px-3.5",
                                    "bg-primary text-primary-foreground",
                                    "shadow-sm shadow-primary/20",
                                    "hover:shadow-md hover:shadow-primary/30",
                                    "hover:-translate-y-px active:translate-y-0 active:scale-[0.97]",
                                ].join(" ")
                                : [
                                    isWelcome ? "px-5" : "px-3",
                                    "bg-muted/40 text-muted-foreground/20 cursor-not-allowed",
                                ].join(" "),
                        ].join(" ")}
                        aria-label="Send message"
                    >
                        Send
                        <svg
                            width={isWelcome ? 13 : 11}
                            height={isWelcome ? 13 : 11}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m5 12 14 0" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );

    // Welcome variant: non-sticky, centered
    if (isWelcome) {
        return (
            <div className={`w-full ${className}`}>
                {card}
            </div>
        );
    }

    // Chat variant: sticky bottom with gradient fade above
    return (
        <div className={`sticky bottom-0 z-10 ${className}`}>
            <div className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="relative bg-background/95 backdrop-blur-sm px-3 sm:px-6 lg:px-8 pb-4 pt-1">
                {card}
            </div>
        </div>
    );
}
