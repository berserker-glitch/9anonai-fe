"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Reuse the exact same chat components as the main chat interface
import { ChatContainer } from "@/components/chat/chat-container";
import { MessageBubble } from "@/components/chat/message-bubble";
import { UserMessage } from "@/components/chat/user-message";
import { AssistantMessage } from "@/components/chat/assistant-message";
import { MessageContent } from "@/components/chat/message-content";
import { MessageTimestamp } from "@/components/chat/message-timestamp";
import { MessageActions } from "@/components/chat/message-actions";
import { SourcesAccordion } from "@/components/chat/sources-accordion";
import { ScrollToBottom } from "@/components/utility/scroll-to-bottom";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    sources?: string | null;
    createdAt: string;
}

interface SharedChat {
    id: string;
    title: string;
    createdAt: string;
    messages: Message[];
}

export default function SharedChatPage() {
    const params = useParams();
    const token = params?.token as string;

    const [chat, setChat] = useState<SharedChat | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!token) return;
        fetch(`${API_URL}/chats/shared/${token}`)
            .then((r) => {
                if (!r.ok) throw new Error("Not found");
                return r.json();
            })
            .then((data) => setChat(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [token]);

    const scrollToBottom = useCallback(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, []);

    const handleScroll = useCallback(() => {
        if (messageContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
            setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
        }
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen bg-sidebar">
                <main className="flex-1 flex flex-col min-w-0 bg-background md:rounded-[2rem] md:border border-border md:m-2 overflow-hidden items-center justify-center">
                    <div className="text-center space-y-3">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-muted-foreground text-sm">Loading conversation…</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !chat) {
        return (
            <div className="flex h-screen bg-sidebar">
                <main className="flex-1 flex flex-col min-w-0 bg-background md:rounded-[2rem] md:border border-border md:m-2 overflow-hidden items-center justify-center p-6">
                    <div className="text-center space-y-4 max-w-sm">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white mx-auto">
                            <img src="/9anon-logo.png" alt="9anon" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground">Link not found</h1>
                        <p className="text-muted-foreground text-sm">
                            This shared conversation doesn&apos;t exist or has been revoked.
                        </p>
                        <Link
                            href="/chat"
                            className="inline-block mt-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all"
                        >
                            Ask your own question
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const parsedMessages = chat.messages.map((msg) => ({
        ...msg,
        parsedSources: msg.sources
            ? typeof msg.sources === "string"
                ? (() => { try { return JSON.parse(msg.sources as string); } catch { return []; } })()
                : msg.sources
            : [],
    }));

    return (
        <div className="flex h-screen bg-sidebar">
            {/* Main Content — matches the chat interface layout */}
            <main className="flex-1 flex flex-col min-w-0 bg-background md:rounded-[2rem] md:border border-border md:m-2 overflow-hidden relative">
                <ChatContainer className="flex-1 overflow-hidden md:rounded-[2rem]">
                    {/* Top bar — shared conversation banner */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border/40">
                        <div className="flex items-center gap-3 min-w-0">
                            <Link href="/" className="shrink-0">
                                <div className="w-7 h-7 rounded-lg overflow-hidden border border-border/50">
                                    <img src="/9anon-logo.png" alt="9anon" className="w-full h-full object-cover" />
                                </div>
                            </Link>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{chat.title}</p>
                                <p className="text-[10px] text-muted-foreground">
                                    Shared conversation · {new Date(chat.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric", month: "short", day: "numeric"
                                    })} · {chat.messages.length} messages
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/chat"
                            className="shrink-0 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:bg-primary/90 transition-all"
                        >
                            Try 9anon AI
                        </Link>
                    </div>

                    {/* Messages area — identical structure to chat/[id] */}
                    <div
                        ref={messageContainerRef}
                        onScroll={handleScroll}
                        className="flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-8 py-4"
                    >
                        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
                            {parsedMessages.map((message) => (
                                <MessageBubble key={message.id} variant={message.role}>
                                    {message.role === "user" ? (
                                        <div className="flex flex-col items-end">
                                            <UserMessage>
                                                <MessageContent content={message.content} />
                                            </UserMessage>
                                            <MessageTimestamp date={new Date(message.createdAt)} align="right" />
                                        </div>
                                    ) : (
                                        <div className="w-full group relative">
                                            <AssistantMessage>
                                                <MessageContent content={message.content} />
                                                {message.parsedSources && message.parsedSources.length > 0 && (
                                                    <SourcesAccordion sources={message.parsedSources} />
                                                )}
                                            </AssistantMessage>
                                            <div className="flex items-center gap-2 mt-1 ml-4 text-xs text-muted-foreground opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MessageTimestamp date={new Date(message.createdAt)} />
                                                <span className="text-muted-foreground/30">&bull;</span>
                                                <MessageActions
                                                    content={message.content}
                                                    showRegenerate={false}
                                                    onCopy={() => {
                                                        navigator.clipboard.writeText(message.content);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </MessageBubble>
                            ))}
                        </div>
                    </div>

                    <ScrollToBottom isVisible={showScrollButton} onClick={scrollToBottom} />
                </ChatContainer>

                {/* CTA footer — replaces the chat input area */}
                <div className="border-t border-border/40 bg-background px-4 py-3">
                    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
                        <div>
                            <p className="text-sm font-semibold text-foreground">Have a legal question?</p>
                            <p className="text-xs text-muted-foreground">9anon AI — Free Moroccan legal assistant, 24/7</p>
                        </div>
                        <Link
                            href="/chat"
                            className="shrink-0 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            Start for free
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
