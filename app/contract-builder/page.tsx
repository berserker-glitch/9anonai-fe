"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/toast";
import { ContractBuilderLayout } from "@/components/contract-builder/contract-builder-layout";
import { ContractChatPanel } from "@/components/contract-builder/contract-chat-panel";
import { ContractPreviewPanel } from "@/components/contract-builder/contract-preview-panel";
import { ContractWelcome } from "@/components/contract-builder/contract-welcome";
import { ContractSessionList } from "@/components/contract-builder/contract-session-list";
import { SidebarProvider, Sidebar, useSidebar } from "@/components/layout/sidebar";
import { SidebarHeader } from "@/components/layout/sidebar-header";
import { IconButton } from "@/components/ui/icon-button";
import { Spinner } from "@/components/ui/spinner";
import { detectContractType, getContractTitle } from "@/lib/contract-type-detector";
import { t } from "@/lib/contract-ui-strings";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strips legacy XML wrapper tags from assistant message content.
 *
 * Old sessions have messages stored with <response>...</response> wrappers
 * because the previous AI prompt used that format. This sanitizer removes them
 * so they don't appear as literal text in the chat panel.
 *
 * Also removes any <contract> tag leakage that shouldn't appear in chat.
 */
function sanitizeMessageContent(content: string): string {
    return content
        // Remove <response> / </response> wrappers (old format)
        .replace(/<response>/gi, "")
        .replace(/<\/response>/gi, "")
        // Remove any <contract> block that leaked into chat text
        .replace(/<contract>[\s\S]*?<\/contract>/gi, "")
        .replace(/<contract>[\s\S]*/gi, "") // unclosed tag
        // Remove other common wrapper tags
        .replace(/<\/?chat>/gi, "")
        .replace(/<\/?message>/gi, "")
        .trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

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
    language?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Inner page — needs useSidebar so it must live inside SidebarProvider
// ─────────────────────────────────────────────────────────────────────────────

function ContractBuilderInner() {
    const router = useRouter();
    const { user, token, isLoading: authLoading } = useAuth();
    const { showToast } = useToast();
    const { toggle } = useSidebar();

    // Session state
    const [sessions, setSessions] = useState<ContractSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [activeSessionLanguage, setActiveSessionLanguage] = useState<string>("fr");
    const [messages, setMessages] = useState<Message[]>([]);
    const [htmlContent, setHtmlContent] = useState("");
    const [version, setVersion] = useState(1);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoadingSessions, setIsLoadingSessions] = useState(true);
    const [currentStep, setCurrentStep] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

    // ── Auth guard ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (!authLoading && !user) router.push("/login");
    }, [user, authLoading, router]);

    // ── Load sessions ───────────────────────────────────────────────────────
    useEffect(() => {
        if (token) fetchSessions();
    }, [token]);

    const fetchSessions = async () => {
        try {
            const res = await fetch(`${API}/contract-builder/sessions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setSessions(data);
            } else {
                showToast(t("errorLoadSessions", "fr"), "error");
            }
        } catch {
            showToast(t("errorLoadSessions", "fr"), "error");
        } finally {
            setIsLoadingSessions(false);
        }
    };

    // ── Load session details ────────────────────────────────────────────────
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
            const res = await fetch(`${API}/contract-builder/sessions/${sessionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setHtmlContent(data.htmlContent || "");
                setVersion(data.version || 1);
                setActiveSessionLanguage(data.language || "fr");

                const uiMessages: Message[] = data.messages.map((m: any, idx: number) => ({
                    id: m.id,
                    role: m.role,
                    // Sanitize assistant messages — old sessions stored content with
                    // <response>...</response> wrapper tags that must not be displayed.
                    content: m.role === "assistant"
                        ? sanitizeMessageContent(m.content)
                        : m.content,
                    reviewResults:
                        idx === data.messages.length - 1 && m.role === "assistant" && data.reviewNotes
                            ? (() => { try { return JSON.parse(data.reviewNotes); } catch { return undefined; } })()
                            : undefined,
                }));
                setMessages(uiMessages);
            } else {
                showToast(t("errorLoadSession", "fr"), "error");
            }
        } catch {
            showToast(t("errorLoadSession", "fr"), "error");
        }
    };

    // ── Create session ──────────────────────────────────────────────────────
    const handleCreateSession = async (contractType: string, title: string, language: string): Promise<string | null> => {
        if (!token) return null;
        try {
            const res = await fetch(`${API}/contract-builder/sessions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ contractType, title, language }),
            });
            if (res.ok) {
                const session = await res.json();
                setSessions((prev) => [session, ...prev]);
                return session.id;
            } else {
                showToast(t("errorCreateSession", language), "error");
                return null;
            }
        } catch {
            showToast(t("errorCreateSession", "fr"), "error");
            return null;
        }
    };

    // ── New contract from welcome page ──────────────────────────────────────
    const handleNewContract = async (description: string, language: string) => {
        const contractType = detectContractType(description);
        const title = getContractTitle(contractType, language);

        const sessionId = await handleCreateSession(contractType, title, language);
        if (!sessionId) return;

        setActiveSessionId(sessionId);
        setActiveSessionLanguage(language);

        // Small delay to let state settle, then auto-send
        setTimeout(() => {
            handleSendMessage(description, sessionId, language);
        }, 100);
    };

    // ── Send message (accepts overrides for auto-send on session creation) ──
    const handleSendMessage = async (
        overrideMessage?: string,
        overrideSessionId?: string,
        overrideLanguage?: string
    ) => {
        const userMsg = overrideMessage || input.trim();
        const sessionId = overrideSessionId || activeSessionId;
        const lang = overrideLanguage || activeSessionLanguage;

        if (!userMsg || !sessionId || !token || isStreaming) return;

        if (!overrideMessage) setInput("");
        setIsStreaming(true);
        setCurrentStep(null);

        // Optimistic messages
        const tempId = Date.now().toString();
        setMessages((prev) => [
            ...prev,
            { id: tempId, role: "user", content: userMsg },
            { id: "streaming-placeholder", role: "assistant", content: "", isStreaming: true },
        ]);

        abortControllerRef.current = new AbortController();

        try {
            const res = await fetch(`${API}/contract-builder/sessions/${sessionId}/stream`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
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
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (!line.startsWith("data: ")) continue;
                    try {
                        const event = JSON.parse(line.slice(6));

                        switch (event.type) {
                            case "token":
                                // Sanitize tokens in case the AI still outputs legacy tags
                                assistantContent += sanitizeMessageContent(event.content);
                                break;
                            case "html_update":
                                setHtmlContent(event.html);
                                setVersion(event.version);
                                break;
                            case "review_result":
                                currentReview = { issues: event.issues, summary: event.summary };
                                break;
                            case "sources":
                                currentSources = event.sources;
                                break;
                            case "step":
                                setCurrentStep(event.content);
                                break;
                            case "error":
                                showToast(event.content || t("errorStream", lang), "error");
                                break;
                        }

                        // Update streaming placeholder
                        setMessages((prev) => {
                            const next = [...prev];
                            const last = next[next.length - 1];
                            if (last?.id === "streaming-placeholder") {
                                last.content = assistantContent;
                                last.sources = currentSources;
                                last.reviewResults = currentReview || undefined;
                            }
                            return next;
                        });
                    } catch {
                        // Malformed SSE line — skip
                    }
                }
            }

            // Finalize message
            setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.id === "streaming-placeholder") {
                    last.id = Date.now().toString();
                    last.isStreaming = false;
                }
                return next;
            });

            fetchSessions();
        } catch (err: any) {
            if (err.name !== "AbortError") {
                showToast(t("errorStream", lang), "error");
                setMessages((prev) => [
                    ...prev.filter((m) => m.id !== "streaming-placeholder"),
                    {
                        id: Date.now().toString(),
                        role: "assistant",
                        content: t("errorStream", lang),
                    },
                ]);
            }
        } finally {
            setIsStreaming(false);
            setCurrentStep(null);
            abortControllerRef.current = null;
        }
    };

    // ── Download PDF ────────────────────────────────────────────────────────
    const handleDownloadPdf = async () => {
        if (!activeSessionId || !token) return;
        try {
            // Step 1: Export — generates the PDF and returns the document ID
            const exportRes = await fetch(`${API}/contract-builder/sessions/${activeSessionId}/export`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!exportRes.ok) {
                showToast(t("errorExport", activeSessionLanguage), "error");
                return;
            }

            const data = await exportRes.json();
            if (!data.success || !data.document) {
                showToast(t("errorExport", activeSessionLanguage), "error");
                return;
            }

            // Step 2: Fetch the PDF blob with the auth token
            // (window.open cannot send Authorization headers)
            const pdfRes = await fetch(`${API}/pdf/download/${data.document.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!pdfRes.ok) {
                showToast(t("errorExport", activeSessionLanguage), "error");
                return;
            }

            const blob = await pdfRes.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Step 3: Trigger browser download via a hidden <a> click
            const anchor = document.createElement("a");
            anchor.href = blobUrl;
            anchor.download = data.document.filename || "contract.pdf";
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            URL.revokeObjectURL(blobUrl);

            // Refresh sessions list so the session shows as "finalized"
            fetchSessions();
        } catch {
            showToast(t("errorExport", activeSessionLanguage), "error");
        }
    };

    // ── Delete session ──────────────────────────────────────────────────────
    const handleDeleteSession = async (id: string) => {
        if (!token) return;
        try {
            const res = await fetch(`${API}/contract-builder/sessions/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                setSessions((prev) => prev.filter((s) => s.id !== id));
                if (activeSessionId === id) setActiveSessionId(null);
                showToast(t("successDelete", activeSessionLanguage), "success");
            } else {
                showToast(t("errorDelete", activeSessionLanguage), "error");
            }
        } catch {
            showToast(t("errorDelete", activeSessionLanguage), "error");
        }
    };

    // ── Rename session ──────────────────────────────────────────────────────
    const handleRenameSession = async (id: string, currentTitle: string) => {
        const newTitle = window.prompt(t("renamePrompt", activeSessionLanguage), currentTitle);
        if (!newTitle || newTitle === currentTitle || !token) return;
        try {
            const res = await fetch(`${API}/contract-builder/sessions/${id}/title`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: newTitle }),
            });
            if (res.ok) {
                setSessions((prev) =>
                    prev.map((s) => (s.id === id ? { ...s, title: newTitle } : s))
                );
                showToast(t("successRename", activeSessionLanguage), "success");
            } else {
                showToast(t("errorRename", activeSessionLanguage), "error");
            }
        } catch {
            showToast(t("errorRename", activeSessionLanguage), "error");
        }
    };

    // ── Auth loading ────────────────────────────────────────────────────────
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Spinner size="lg" />
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Sidebar */}
            <Sidebar>
                <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
                    {/* Reuse chat sidebar header (search, contracts link, toggle) */}
                    <SidebarHeader
                        searchQuery=""
                        onSearchChange={() => {}}
                        onOpenFiles={() => {}}
                    />

                    {/* Back to Chat link */}
                    <div className="px-3 pb-1">
                        <a
                            href="/chat"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
                            </svg>
                            {t("backToChat", activeSessionLanguage)}
                        </a>
                    </div>

                    {/* Session list */}
                    <div className="flex-1 overflow-y-auto py-2 px-2">
                        <ContractSessionList
                            sessions={sessions}
                            onSelectSession={(id) => {
                                const s = sessions.find((s) => s.id === id);
                                if (s?.language) setActiveSessionLanguage(s.language);
                                setActiveSessionId(id);
                            }}
                            currentSessionId={activeSessionId}
                            onDeleteSession={handleDeleteSession}
                            onRenameSession={handleRenameSession}
                        />
                    </div>

                    {/* New Contract button */}
                    <div className="p-3 border-t border-sidebar-border">
                        <button
                            onClick={() => setActiveSessionId(null)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                            {t("newContract", activeSessionLanguage)}
                        </button>
                    </div>
                </div>
            </Sidebar>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile header */}
                <header className="h-14 flex items-center justify-between px-4 border-b lg:hidden shrink-0">
                    <IconButton label="Open menu" onClick={toggle} variant="ghost" size="sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" x2="20" y1="12" y2="12" />
                            <line x1="4" x2="20" y1="6" y2="6" />
                            <line x1="4" x2="20" y1="18" y2="18" />
                        </svg>
                    </IconButton>
                    <span className="font-semibold text-sm">
                        {t("welcomeTitle", activeSessionLanguage)}
                    </span>
                    <a
                        href="/chat"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        {t("backToChat", activeSessionLanguage)}
                    </a>
                </header>

                {activeSessionId ? (
                    <ContractBuilderLayout>
                        <ContractChatPanel
                            messages={messages}
                            input={input}
                            setInput={setInput}
                            onSend={() => handleSendMessage()}
                            isLoading={isStreaming}
                            currentStep={currentStep}
                            language={activeSessionLanguage}
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
                        <ContractWelcome onSubmit={handleNewContract} />
                    </div>
                )}
            </main>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page export — wraps inner component in SidebarProvider
// ─────────────────────────────────────────────────────────────────────────────

export default function ContractBuilderPage() {
    return (
        <SidebarProvider defaultOpen={true}>
            <ContractBuilderInner />
        </SidebarProvider>
    );
}
