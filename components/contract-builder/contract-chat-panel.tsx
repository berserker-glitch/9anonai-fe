"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "@/components/chat/message-bubble";
import { UserMessage } from "@/components/chat/user-message";
import { AssistantMessage } from "@/components/chat/assistant-message";
import { MessageContent } from "@/components/chat/message-content";
import { SourcesAccordion } from "@/components/chat/sources-accordion";
import { ChatInput } from "@/components/interaction/chat-input";
import { ContractReviewBadge } from "./contract-review-badge";
import { ContractProgressBar } from "./contract-progress-bar";
import { cn } from "@/lib/utils";
import { t, QUICK_ACTIONS, SupportedLanguage } from "@/lib/contract-ui-strings";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: any[];
    reviewResults?: {
        issues: any[];
        summary: string;
    };
    isStreaming?: boolean;
}

interface ContractChatPanelProps {
    messages: Message[];
    input: string;
    setInput: (value: string) => void;
    onSend: () => void;
    isLoading: boolean;
    currentStep?: string | null;
    language?: string;
    className?: string;
}

export function ContractChatPanel({
    messages,
    input,
    setInput,
    onSend,
    isLoading,
    currentStep,
    language = "fr",
    className,
}: ContractChatPanelProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const lang = (["fr", "ar", "en"].includes(language) ? language : "fr") as SupportedLanguage;
    const isRtl = lang === "ar";

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleQuickAction = (action: string) => {
        setInput(action);
    };

    const showQuickActions = messages.length > 0 && !isLoading;

    return (
        <div className={cn("flex flex-col h-full bg-background", className)} dir={isRtl ? "rtl" : "ltr"}>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className={cn("text-center text-muted-foreground mt-20 px-4", isRtl && "text-right")}>
                        <h3 className="text-lg font-semibold mb-2">{t("chatEmptyTitle", lang)}</h3>
                        <p className="text-sm">{t("chatEmptySubtitle", lang)}</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className="space-y-4">
                        <MessageBubble variant={msg.role}>
                            {msg.role === "user" ? (
                                <UserMessage>{msg.content}</UserMessage>
                            ) : (
                                <AssistantMessage>
                                    <MessageContent content={msg.content} />

                                    {/* Sources */}
                                    {msg.sources && msg.sources.length > 0 && (
                                        <div className="mt-4">
                                            <SourcesAccordion sources={msg.sources} />
                                        </div>
                                    )}

                                    {/* Legal Review Badge */}
                                    {msg.reviewResults && (
                                        <div className="mt-4">
                                            <ContractReviewBadge
                                                issues={msg.reviewResults.issues}
                                                summary={msg.reviewResults.summary}
                                            />
                                        </div>
                                    )}
                                </AssistantMessage>
                            )}
                        </MessageBubble>
                    </div>
                ))}

                {/* Loading indicator when streaming but no content yet */}
                {isLoading && messages[messages.length - 1]?.id === "streaming-placeholder" &&
                    !messages[messages.length - 1]?.content && (
                    <div className="flex justify-start">
                        <AssistantMessage>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                <span className="flex gap-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce [animation-delay:300ms]" />
                                </span>
                            </div>
                        </AssistantMessage>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Progress bar — shown during streaming */}
            <ContractProgressBar currentStep={currentStep ?? null} isStreaming={isLoading} />

            {/* Quick action chips */}
            {showQuickActions && (
                <div className="px-4 pt-2 pb-1">
                    <p className={cn("text-[10px] text-muted-foreground mb-1.5", isRtl && "text-right")}>
                        {t("suggestionsLabel", lang)}
                    </p>
                    <div className={cn("flex gap-2 overflow-x-auto pb-1 scrollbar-hide", isRtl && "flex-row-reverse")}>
                        {QUICK_ACTIONS[lang].map((action) => (
                            <button
                                key={action}
                                onClick={() => handleQuickAction(action)}
                                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-border bg-muted/30 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground transition-all duration-150"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
                <ChatInput onSubmit={onSend} isLoading={isLoading}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t("chatInputPlaceholder", lang)}
                        className={cn(
                            "flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/70",
                            isRtl && "text-right"
                        )}
                        disabled={isLoading}
                        dir={isRtl ? "rtl" : "ltr"}
                    />
                </ChatInput>
            </div>
        </div>
    );
}
