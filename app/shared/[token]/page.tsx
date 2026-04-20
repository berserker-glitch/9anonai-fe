"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    const router = useRouter();
    const token = params?.token as string;

    const [chat, setChat] = useState<SharedChat | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!token) return;
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats/shared/${token}`)
            .then((r) => {
                if (!r.ok) throw new Error("Not found");
                return r.json();
            })
            .then((data) => setChat(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-muted-foreground text-sm">Loading conversation…</p>
                </div>
            </div>
        );
    }

    if (error || !chat) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="text-center space-y-4 max-w-sm">
                    <div className="text-5xl">🔗</div>
                    <h1 className="text-xl font-bold">Link not found</h1>
                    <p className="text-muted-foreground text-sm">
                        This shared conversation doesn't exist or has been revoked.
                    </p>
                    <Link href="/chat" className="inline-block mt-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all">
                        Ask your own question →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        <Link href="/" className="shrink-0">
                            <div className="w-8 h-8 rounded-lg overflow-hidden border border-border/50">
                                <img src="/9anon-logo.png" alt="9anon" className="w-full h-full object-cover" />
                            </div>
                        </Link>
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">Shared conversation via</p>
                            <p className="text-sm font-semibold truncate">9anon AI</p>
                        </div>
                    </div>
                    <Link
                        href="/chat"
                        className="shrink-0 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all"
                    >
                        Ask your own question →
                    </Link>
                </div>
            </header>

            {/* Chat title */}
            <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
                <h1 className="text-2xl font-bold text-foreground">{chat.title}</h1>
                <p className="text-xs text-muted-foreground mt-1">
                    {new Date(chat.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric"
                    })} · {chat.messages.length} messages
                </p>
            </div>

            {/* Messages */}
            <main className="max-w-3xl mx-auto px-4 pb-24 space-y-6">
                {chat.messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        {msg.role === "assistant" && (
                            <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1 mr-3">
                                <span className="text-xs font-bold text-primary">AI</span>
                            </div>
                        )}
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                    : "bg-card border border-border rounded-tl-sm prose prose-sm dark:prose-invert max-w-none"
                            }`}
                        >
                            {msg.role === "user" ? (
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            ) : (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content}
                                </ReactMarkdown>
                            )}
                        </div>
                    </div>
                ))}
            </main>

            {/* CTA footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
                <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
                    <div>
                        <p className="text-sm font-semibold text-foreground">Have a legal question?</p>
                        <p className="text-xs text-muted-foreground">9anon AI — Free Moroccan legal assistant, 24/7</p>
                    </div>
                    <Link
                        href="/chat"
                        className="shrink-0 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        Start for free →
                    </Link>
                </div>
            </div>
        </div>
    );
}
