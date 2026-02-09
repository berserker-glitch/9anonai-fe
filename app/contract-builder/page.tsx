"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ContractBuilderLayout } from "@/components/contract-builder/contract-builder-layout";
import { ContractChatPanel } from "@/components/contract-builder/contract-chat-panel";
import { ContractPreviewPanel } from "@/components/contract-builder/contract-preview-panel";
import { ContractWelcome } from "@/components/contract-builder/contract-welcome";
import { ContractSessionList } from "@/components/contract-builder/contract-session-list";
import { SidebarProvider, Sidebar } from "@/components/layout/sidebar";
import { SidebarHeader } from "@/components/layout/sidebar-header";

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

interface ContractSession {
    id: string;
    title: string;
    updatedAt: string;
    status: string;
    contractType: string;
}

export default function ContractBuilderPage() {
    const router = useRouter();
    const { user, token, isLoading: authLoading } = useAuth();

    // State
    const [sessions, setSessions] = useState<ContractSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [htmlContent, setHtmlContent] = useState("");
    const [version, setVersion] = useState(1);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoadingSessions, setIsLoadingSessions] = useState(true);

    const abortControllerRef = useRef<AbortController | null>(null);

    // Auth check
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    // Load sessions on mount
    useEffect(() => {
        if (token) {
            fetchSessions();
        }
    }, [token]);

    const fetchSessions = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/contract-builder/sessions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setSessions(data);
            }
        } catch (error) {
            console.error("Failed to load sessions:", error);
        } finally {
            setIsLoadingSessions(false);
        }
    };

    // Load active session details
    useEffect(() => {
        if (activeSessionId && token) {
            loadSession(activeSessionId);
        } else {
            setMessages([]);
            setHtmlContent("");
            setVersion(1);
        }
    }, [activeSessionId, token]);

    const loadSession = async (sessionId: string) => {
        try {
            // Get session details + messages
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/contract-builder/sessions/${sessionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const data = await res.json();
                setHtmlContent(data.htmlContent || "");
                setVersion(data.version || 1);

                // Transform messages to UI format
                // Note: reviewNotes are stored on the session, not per message in DB currently,
                // but we can parse them from the message content if we store them there, 
                // or just use the session's current review notes for the latest assistant message.
                // For now, simpler approach: parse the last assistant message for review notes if available?
                // Actually, the backend streaming logic adds review notes to the stream events.
                // We'll trust the stream for live updates, and for history load, we might need a better way.
                // For V1, let's just show review notes on the *latest* assistant message if session has them.

                const uiMessages: Message[] = data.messages.map((m: any, idx: number) => ({
                    id: m.id,
                    role: m.role,
                    content: m.content,
                    reviewResults: (idx === data.messages.length - 1 && m.role === "assistant" && data.reviewNotes)
                        ? JSON.parse(data.reviewNotes)
                        : undefined
                }));

                setMessages(uiMessages);
            }
        } catch (error) {
            console.error("Failed to load session:", error);
        }
    };

    const handleCreateSession = async (contractType: string, title: string) => {
        if (!token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/contract-builder/sessions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ contractType, title }),
            });

            if (res.ok) {
                const session = await res.json();
                setSessions((prev) => [session, ...prev]);
                setActiveSessionId(session.id);
            }
        } catch (error) {
            console.error("Failed to create session:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || !activeSessionId || !token || isStreaming) return;

        const userMsg = input;
        setInput("");
        setIsStreaming(true);

        // Add user message optimistically
        const tempId = Date.now().toString();
        setMessages((prev) => [
            ...prev,
            { id: tempId, role: "user", content: userMsg },
            { id: "streaming-placeholder", role: "assistant", content: "", isStreaming: true },
        ]);

        abortControllerRef.current = new AbortController();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/contract-builder/sessions/${activeSessionId}/stream`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ message: userMsg }),
                signal: abortControllerRef.current.signal,
            });

            if (!res.ok || !res.body) throw new Error("Stream failed");

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            let assistantContent = "";
            let currentSources: any[] = [];
            let currentReview: any = null;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split("\n\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const event = JSON.parse(line.slice(6));

                            switch (event.type) {
                                case "token":
                                    assistantContent += event.content;
                                    break;
                                case "html_update":
                                    setHtmlContent(event.html);
                                    setVersion(event.version);
                                    break;
                                case "review_result":
                                    currentReview = {
                                        issues: event.issues,
                                        summary: event.summary,
                                    };
                                    break;
                                case "sources":
                                    currentSources = event.sources;
                                    break;
                                case "step":
                                    // Could show step toasts or status indicator
                                    break;
                            }

                            // Update the streaming message
                            setMessages((prev) => {
                                const newMessages = [...prev];
                                const lastMsg = newMessages[newMessages.length - 1];
                                if (lastMsg.id === "streaming-placeholder") {
                                    lastMsg.content = assistantContent;
                                    lastMsg.sources = currentSources;
                                    lastMsg.reviewResults = currentReview;
                                }
                                return newMessages;
                            });

                        } catch (e) {
                            console.error("Error parsing SSE event:", e);
                        }
                    }
                }
            }

            // Finalize message
            setMessages((prev) => {
                const newMessages = [...prev];
                const lastMsg = newMessages[newMessages.length - 1];
                if (lastMsg.id === "streaming-placeholder") {
                    lastMsg.id = Date.now().toString(); // Replace temp ID
                    lastMsg.isStreaming = false;
                }
                return newMessages;
            });

            // Refresh sessions list to update timestamp/status
            fetchSessions();

        } catch (error: any) {
            if (error.name !== "AbortError") {
                console.error("Stream error:", error);
                setMessages((prev) => [
                    ...prev.filter(m => m.id !== "streaming-placeholder"),
                    { id: Date.now().toString(), role: "assistant", content: "Sorry, I encountered an error. Please try again." }
                ]);
            }
        } finally {
            setIsStreaming(false);
            abortControllerRef.current = null;
        }
    };

    const handleDownloadPdf = async () => {
        if (!activeSessionId || !token) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/contract-builder/sessions/${activeSessionId}/export`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success && data.document) {
                    // Trigger download
                    window.open(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"}/pdf/download/${data.document.id}`, "_blank");
                }
            }
        } catch (error) {
            console.error("PDF export failed:", error);
        }
    };

    if (authLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;



    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full overflow-hidden bg-background">
                {/* Desktop Sidebar (or Mobile Drawer via Sidebar component) */}
                <Sidebar>
                    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
                        <SidebarHeader
                            searchQuery=""
                            onSearchChange={() => { }}
                            onOpenFiles={() => { }}
                        />
                        <div className="flex-1 overflow-y-auto py-2">
                            <ContractSessionList
                                sessions={sessions}
                                onSelectSession={setActiveSessionId}
                                currentSessionId={activeSessionId}
                            />
                        </div>
                        <div className="p-4 border-t border-sidebar-border">
                            <button
                                onClick={() => setActiveSessionId(null)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                                + New Contract
                            </button>
                        </div>
                    </div>
                </Sidebar>

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Header for mobile triggers mostly */}
                    <header className="h-14 flex items-center px-4 border-b lg:hidden">
                        {/* SidebarTrigger would go here if we had access to the context trigger */}
                        <span className="font-semibold">Contract Builder</span>
                    </header>

                    {activeSessionId ? (
                        <ContractBuilderLayout>
                            <ContractChatPanel
                                messages={messages}
                                input={input}
                                setInput={setInput}
                                onSend={handleSendMessage}
                                isLoading={isStreaming}
                            />
                            <ContractPreviewPanel
                                htmlContent={htmlContent}
                                version={version}
                                isLoading={false}
                                onDownloadPdf={handleDownloadPdf}
                            />
                        </ContractBuilderLayout>
                    ) : (
                        <div className="flex-1 overflow-y-auto">
                            <ContractWelcome onSelectType={handleCreateSession} />
                        </div>
                    )}
                </main>
            </div>
        </SidebarProvider>
    );
}
