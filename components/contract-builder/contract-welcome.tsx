"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { t, WELCOME_EXAMPLES, SupportedLanguage } from "@/lib/contract-ui-strings";

interface ContractWelcomeProps {
    onSubmit: (description: string, language: string) => void;
    className?: string;
}

const LANGUAGES: { code: SupportedLanguage; label: string; dir: "ltr" | "rtl" }[] = [
    { code: "fr", label: "FR", dir: "ltr" },
    { code: "ar", label: "AR", dir: "rtl" },
    { code: "en", label: "EN", dir: "ltr" },
];

export function ContractWelcome({ onSubmit, className }: ContractWelcomeProps) {
    const [lang, setLang] = useState<SupportedLanguage>("fr");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isRtl = lang === "ar";

    const handleSubmit = () => {
        if (!description.trim()) {
            setError(t("validationEmpty", lang));
            textareaRef.current?.focus();
            return;
        }
        setError("");
        onSubmit(description.trim(), lang);
    };

    const handleChipClick = (example: string) => {
        setDescription(example);
        setError("");
        textareaRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div
            className={cn("flex flex-col items-center justify-center min-h-full px-4 py-10", className)}
            dir={isRtl ? "rtl" : "ltr"}
        >
            <div className="w-full max-w-2xl space-y-6">

                {/* Language Selector */}
                <div className={cn("flex gap-1.5", isRtl ? "justify-end" : "justify-start")}>
                    {LANGUAGES.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => { setLang(l.code); setError(""); }}
                            className={cn(
                                "px-3 py-1 rounded-md text-xs font-semibold border transition-all duration-150",
                                lang === l.code
                                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                            )}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <h1 className={cn(
                        "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60",
                        isRtl && "text-right"
                    )}>
                        {t("welcomeTitle", lang)}
                    </h1>
                    <p className={cn("text-muted-foreground text-base leading-relaxed", isRtl && "text-right")}>
                        {t("welcomeSubtitle", lang)}
                    </p>
                </div>

                {/* Feature badges */}
                <div className={cn("flex flex-wrap gap-2", isRtl && "flex-row-reverse")}>
                    {t("welcomeBadge", lang).split("•").map((badge, i) => (
                        <span key={i} className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {badge.trim()}
                        </span>
                    ))}
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                    <div className={cn(
                        "relative rounded-xl border bg-background shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/60",
                        error ? "border-destructive focus-within:ring-destructive/30" : "border-border"
                    )}>
                        <textarea
                            ref={textareaRef}
                            value={description}
                            onChange={(e) => { setDescription(e.target.value); if (error) setError(""); }}
                            onKeyDown={handleKeyDown}
                            placeholder={t("placeholder", lang)}
                            rows={5}
                            dir={isRtl ? "rtl" : "ltr"}
                            className={cn(
                                "w-full px-4 pt-4 pb-12 bg-transparent text-sm resize-none outline-none",
                                "placeholder:text-muted-foreground/60 leading-relaxed",
                                isRtl && "text-right"
                            )}
                        />
                        {/* Bottom bar inside textarea */}
                        <div className={cn(
                            "absolute bottom-0 left-0 right-0 flex items-center px-3 pb-2",
                            isRtl ? "flex-row-reverse" : "flex-row"
                        )}>
                            <span className="text-[10px] text-muted-foreground/50 flex-1">
                                {isRtl ? "Ctrl+Enter للإرسال" : "Ctrl+Enter to generate"}
                            </span>
                            <span className={cn(
                                "text-[10px] font-mono",
                                description.length > 1000 ? "text-destructive" : "text-muted-foreground/50"
                            )}>
                                {description.length}/2000
                            </span>
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <p className={cn("text-xs text-destructive", isRtl && "text-right")}>{error}</p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    onClick={handleSubmit}
                    disabled={!description.trim()}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
                        "bg-primary text-primary-foreground font-semibold text-sm",
                        "hover:bg-primary/90 active:scale-[0.99] transition-all duration-150 shadow-sm",
                        "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                    )}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                    {t("generateButton", lang)}
                </button>

                {/* Example chips */}
                <div className="space-y-2">
                    <p className={cn("text-xs text-muted-foreground font-medium", isRtl && "text-right")}>
                        {t("exampleChipsLabel", lang)}
                    </p>
                    <div className={cn("flex flex-wrap gap-2", isRtl && "flex-row-reverse")}>
                        {WELCOME_EXAMPLES[lang].map((example) => (
                            <button
                                key={example}
                                onClick={() => handleChipClick(example)}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs",
                                    "border border-border bg-muted/40 text-muted-foreground",
                                    "hover:border-primary/50 hover:bg-primary/5 hover:text-foreground",
                                    "transition-all duration-150"
                                )}
                            >
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 5v14" /><path d="M5 12h14" />
                                </svg>
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
