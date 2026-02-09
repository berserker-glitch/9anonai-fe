"use client";

import { useEffect, useRef } from "react";
import { ScrollToBottom } from "@/components/utility/scroll-to-bottom";
import { MessageBubble } from "@/components/chat/message-bubble";
import { UserMessage } from "@/components/chat/user-message";
import { AssistantMessage } from "@/components/chat/assistant-message";
import { MessageContent } from "@/components/chat/message-content";
import { SourcesAccordion } from "@/components/chat/sources-accordion";
import { ChatInput } from "@/components/interaction/chat-input";
import { ContractReviewBadge } from "./contract-review-badge";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: any[]; // LegalDocument[]
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
    className?: string;
}

export function ContractChatPanel({
    messages,
    input,
    setInput,
    onSend,
    isLoading,
    className,
}: ContractChatPanelProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    return (
        <div className={cn("flex flex-col h-full bg-background", className)}>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground mt-20 px-4">
                        <h3 className="text-lg font-semibold mb-2">Contract Assistant</h3>
                        <p>Describe the contract you need, and I'll draft it under Moroccan law.</p>
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

                                    {/* Sources Accordion */}
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

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start">
                        <AssistantMessage>
                            <div className="flex items-center gap-2">
                                <span className="animate-pulse">Thinking...</span>
                            </div>
                        </AssistantMessage>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-background">
                <ChatInput onSubmit={onSend} isLoading={isLoading}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe the contract you need (e.g. 'Rental agreement for apartment in Casablanca')..."
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/70"
                        disabled={isLoading}
                    />
                </ChatInput>
            </div>
        </div>
    );
}
