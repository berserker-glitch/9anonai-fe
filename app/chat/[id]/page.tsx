"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

// Layout Components
import { Sidebar, SidebarProvider } from "@/components/layout/sidebar";
import { SidebarHeader } from "@/components/layout/sidebar-header";
import { SidebarChatList } from "@/components/layout/sidebar-chat-list";
import { SidebarChatItem } from "@/components/layout/sidebar-chat-item";

// Chat Components
import { ChatContainer } from "@/components/chat/chat-container";
import { MessageBubble } from "@/components/chat/message-bubble";
import { UserMessage } from "@/components/chat/user-message";
import { AssistantMessage } from "@/components/chat/assistant-message";
import { MessageContent } from "@/components/chat/message-content";
import { MessageTimestamp } from "@/components/chat/message-timestamp";
import { MessageActions } from "@/components/chat/message-actions";
import { SourcesAccordion } from "@/components/chat/sources-accordion";

// Interaction Components
import { ChatInput } from "@/components/interaction/chat-input";
import { AttachButton } from "@/components/interaction/attach-button";
import { ScrollToBottom } from "@/components/utility/scroll-to-bottom";
import { ConfirmModal } from "@/components/utility/modal";
import { SettingsModal } from "@/components/settings/settings-modal";
import { FilesModal } from "@/components/chat/files-modal";

// UI Components
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Types
interface Message {
    id: string;
    dbId?: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    steps?: string[];
    sources?: any[];
    isThinking?: boolean;
    feedback?: "like" | "dislike" | null;
    version?: number;
    totalVersions?: number;
    parentId?: string;
    images?: string[];
    files?: { name: string; type: string }[];
    contract?: { title: string; path: string; type: string };
}

interface ChatHistory {
    id: string;
    title: string;
    updatedAt: string;
    isPinned?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function ChatWithIdPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const chatId = params?.id as string;
    const initialMessage = searchParams?.get("message");
    const router = useRouter();
    const { user, token, logout, isLoading: authLoading } = useAuth();

    // State
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(chatId);
    const [searchQuery, setSearchQuery] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [showWelcome, setShowWelcome] = useState(true);
    const [filesModalOpen, setFilesModalOpen] = useState(false);
    const [pendingMessage, setPendingMessage] = useState<string | null>(initialMessage || null);
    // Message editing state
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    // Load chat history
    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/chats`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const sorted = data.sort((a: ChatHistory, b: ChatHistory) =>
                            (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)
                        );
                        setChatHistory(sorted);
                    }
                })
                .catch(err => console.error("Failed to load chats", err));
        }
    }, [token]);

    // Load messages for current chat - triggered by activeChatId change
    useEffect(() => {
        if (activeChatId && token) {
            fetch(`${API_URL}/chats/${activeChatId}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const formattedMessages: Message[] = data.map((msg: any) => ({
                            id: msg.id,
                            dbId: msg.id,
                            role: msg.role,
                            content: msg.content,
                            timestamp: new Date(msg.createdAt),
                            sources: msg.sources ? JSON.parse(msg.sources) : [],
                            contract: msg.attachmentUrl ? {
                                title: msg.attachmentName || "Generated Document",
                                path: msg.attachmentUrl,
                                type: "pdf"
                            } : undefined,
                        }));
                        setMessages(formattedMessages);
                        setShowWelcome(formattedMessages.length === 0);
                    }
                })
                .catch(err => console.error("Failed to load messages", err));
        }
    }, [activeChatId, token]);

    // Handle pending message from URL query (when redirected from new chat)
    useEffect(() => {
        if (pendingMessage && token && activeChatId && !isGenerating) {
            setInputValue(pendingMessage);
            setPendingMessage(null);
            // Clear the query param from URL
            window.history.replaceState(null, '', `/chat/${activeChatId}`);
            // Trigger send after a short delay to ensure state is set
            setTimeout(() => {
                const sendBtn = document.querySelector('form button[type="submit"]');
                if (sendBtn) (sendBtn as HTMLButtonElement).click();
            }, 100);
        }
    }, [pendingMessage, token, activeChatId, isGenerating]);

    // Scroll to bottom
    const scrollToBottom = useCallback(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, []);

    // Handle scroll
    const handleScroll = useCallback(() => {
        if (messageContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
            setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
        }
    }, []);

    // File upload handler
    const handleFileUpload = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const fileArray = Array.from(files);
        setAttachedFiles(prev => [...prev, ...fileArray]);
    };

    // Create new chat
    const handleNewChat = async () => {
        setActiveChatId(null);
        setMessages([]);
        setShowWelcome(true);
        router.push("/chat");
    };

    // Select chat - use state and shallow URL update to avoid page reload
    const handleSelectChat = (id: string) => {
        setActiveChatId(id);
        setMessages([]); // Clear messages while loading
        setShowWelcome(false);
        window.history.pushState(null, '', `/chat/${id}`);
    };

    // Pin chat
    const handlePinChat = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/chats/${id}/pin`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            const updated = await res.json();
            setChatHistory(prev =>
                prev
                    .map(chat => (chat.id === id ? { ...chat, isPinned: updated.isPinned } : chat))
                    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
            );
        } catch (e) {
            console.error("Failed to pin chat", e);
        }
    };

    // Delete chat
    const handleDeleteChat = async () => {
        if (!chatToDelete) return;
        try {
            await fetch(`${API_URL}/chats/${chatToDelete}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setChatHistory(prev => prev.filter(chat => chat.id !== chatToDelete));
            if (activeChatId === chatToDelete) {
                handleNewChat();
            }
        } catch (e) {
            console.error("Failed to delete chat", e);
        } finally {
            setDeleteModalOpen(false);
            setChatToDelete(null);
        }
    };

    // Send message
    const handleSendMessage = async () => {
        const content = inputValue.trim();
        if (!content && attachedFiles.length === 0) return;
        if (isGenerating) return;

        setInputValue("");
        setIsTyping(true);
        setIsGenerating(true);
        setShowWelcome(false);

        let currentChatId = activeChatId;

        // Create new chat if needed
        if (!currentChatId) {
            try {
                const res = await fetch(`${API_URL}/chats`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ firstMessage: content }),
                });
                const newChat = await res.json();
                currentChatId = newChat.id;
                setActiveChatId(currentChatId);
                router.push(`/chat/${currentChatId}`);
                setChatHistory(prev => {
                    const pinnedCount = prev.filter(c => c.isPinned).length;
                    const newHistory = [...prev];
                    newHistory.splice(pinnedCount, 0, newChat);
                    return newHistory;
                });
            } catch (e) {
                console.error("Failed to create chat", e);
                setIsTyping(false);
                setIsGenerating(false);
                return;
            }
        }

        // Create image URLs for display
        const imageUrls = attachedFiles
            .filter(f => f.type.startsWith("image/"))
            .map(f => URL.createObjectURL(f));

        const otherFiles = attachedFiles
            .filter(f => !f.type.startsWith("image/"))
            .map(f => ({ name: f.name, type: f.type }));

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: content,
            timestamp: new Date(),
            images: imageUrls,
            files: otherFiles,
        };
        setMessages(prev => [...prev, userMessage]);

        // Save user message to DB
        try {
            await fetch(`${API_URL}/chats/${currentChatId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: "user", content: content }),
            });
        } catch (e) {
            console.error("Failed to save user message", e);
        }

        // Add assistant message stub
        const assistantId = (Date.now() + 1).toString();
        const assistantMsg: Message = {
            id: assistantId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
            steps: [],
            sources: [],
            isThinking: true,
        };
        setMessages(prev => [...prev, assistantMsg]);

        let fullContent = "";
        let finalSources: any[] = [];
        let finalContract: { title: string; path: string; type: string } | null = null;

        // Compress images
        const imageData: { data: string; mimeType: string }[] = [];
        for (const file of attachedFiles) {
            if (file.type.startsWith("image/")) {
                const compressed = await new Promise<string>(resolve => {
                    const img = new Image();
                    const url = URL.createObjectURL(file);
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        const maxSize = 800;
                        let { width, height } = img;
                        if (width > maxSize || height > maxSize) {
                            if (width > height) {
                                height = (height / width) * maxSize;
                                width = maxSize;
                            } else {
                                width = (width / height) * maxSize;
                                height = maxSize;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d")!;
                        ctx.drawImage(img, 0, 0, width, height);
                        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
                        URL.revokeObjectURL(url);
                        resolve(dataUrl.split(",")[1]);
                    };
                    img.src = url;
                });
                imageData.push({ data: compressed, mimeType: "image/jpeg" });
            }
        }

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: content,
                    history: messages,
                    images: imageData,
                }),
            });

            setAttachedFiles([]);

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const event = JSON.parse(line.slice(6));
                            if (event.type === "token") {
                                fullContent += event.content;
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantId
                                            ? { ...m, content: fullContent, isThinking: false }
                                            : m
                                    )
                                );
                                setTimeout(scrollToBottom, 50);
                            } else if (event.type === "citation") {
                                finalSources = event.sources || [];
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantId ? { ...m, sources: finalSources } : m
                                    )
                                );
                            }
                            // else if (event.type === "contract_generated") {
                            //     // DISABLED: Contract generation
                            //     console.log("Ignored contract_generated event");
                            // }
                        } catch (e) {
                            console.error("Parse error", e);
                        }
                    }
                }
            }

            // Save assistant message
            try {
                await fetch(`${API_URL}/chats/${currentChatId}/messages`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        role: "assistant",
                        content: fullContent,
                        sources: JSON.stringify(finalSources)
                    }),
                });
            } catch (e) {
                console.error("Failed to save assistant message", e);
            }
        } catch (error) {
            console.error("Stream error:", error);
            setMessages(prev =>
                prev.map(m =>
                    m.id === assistantId
                        ? { ...m, content: "Sorry, there was an error. Please try again.", isThinking: false }
                        : m
                )
            );
        } finally {
            setIsTyping(false);
            setIsGenerating(false);
            scrollToBottom();
        }
    };

    // Regenerate assistant response - keeps user message, replaces assistant message
    const handleRegenerate = async (assistantMsgId: string, userContent: string) => {
        if (isGenerating) return;

        setIsTyping(true);
        setIsGenerating(true);

        // Replace the old assistant message with a new thinking one
        const newAssistantId = Date.now().toString();
        setMessages(prev =>
            prev.map(m =>
                m.id === assistantMsgId
                    ? { ...m, id: newAssistantId, content: "", isThinking: true, sources: [] }
                    : m
            )
        );

        let fullContent = "";
        let finalSources: any[] = [];

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userContent,
                    history: messages.filter(m => m.id !== assistantMsgId),
                    images: [],
                }),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const event = JSON.parse(line.slice(6));
                            if (event.type === "token") {
                                fullContent += event.content;
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === newAssistantId
                                            ? { ...m, content: fullContent, isThinking: false }
                                            : m
                                    )
                                );
                                setTimeout(scrollToBottom, 50);
                            } else if (event.type === "citation") {
                                finalSources = event.sources || [];
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === newAssistantId ? { ...m, sources: finalSources } : m
                                    )
                                );
                            }
                        } catch (e) {
                            console.error("Parse error", e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Regenerate error:", error);
            setMessages(prev =>
                prev.map(m =>
                    m.id === newAssistantId
                        ? { ...m, content: "Sorry, there was an error. Please try again.", isThinking: false }
                        : m
                )
            );
        } finally {
            setIsTyping(false);
            setIsGenerating(false);
            scrollToBottom();
        }
    };

    /**
     * Handle editing a user message.
     * Removes all subsequent messages and regenerates the AI response.
     * @param messageId - The ID of the message being edited
     * @param newContent - The new content for the message
     */
    const handleEditMessage = async (messageId: string, newContent: string) => {
        if (!newContent.trim() || isGenerating) return;

        // Find the message index
        const messageIndex = messages.findIndex(m => m.id === messageId);
        if (messageIndex === -1) return;

        // Keep only messages up to and including the edited message
        const messagesUpToEdit = messages.slice(0, messageIndex);

        // Update the edited message content
        const editedMessage: Message = {
            ...messages[messageIndex],
            content: newContent.trim(),
        };

        // Set the new messages state (removes all subsequent messages)
        setMessages([...messagesUpToEdit, editedMessage]);
        setEditingMessageId(null);
        setEditValue("");

        // Now regenerate the AI response
        setIsTyping(true);
        setIsGenerating(true);

        const assistantId = Date.now().toString();
        const assistantMsg: Message = {
            id: assistantId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
            steps: [],
            sources: [],
            isThinking: true,
        };
        setMessages(prev => [...prev, assistantMsg]);

        let fullContent = "";
        let finalSources: any[] = [];

        try {
            const response = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: newContent.trim(),
                    history: messagesUpToEdit,
                    images: [],
                }),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const event = JSON.parse(line.slice(6));
                            if (event.type === "token") {
                                fullContent += event.content;
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantId
                                            ? { ...m, content: fullContent, isThinking: false }
                                            : m
                                    )
                                );
                                setTimeout(scrollToBottom, 50);
                            } else if (event.type === "citation") {
                                finalSources = event.sources || [];
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantId ? { ...m, sources: finalSources } : m
                                    )
                                );
                            }
                        } catch (e) {
                            console.error("Parse error", e);
                        }
                    }
                }
            }

            // Save messages to DB
            if (activeChatId) {
                try {
                    await fetch(`${API_URL}/chats/${activeChatId}/messages`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            role: "assistant",
                            content: fullContent,
                            sources: JSON.stringify(finalSources),
                        }),
                    });
                } catch (e) {
                    console.error("Failed to save assistant message", e);
                }
            }
        } catch (error) {
            console.error("Edit regenerate error:", error);
            setMessages(prev =>
                prev.map(m =>
                    m.id === assistantId
                        ? { ...m, content: "Sorry, there was an error. Please try again.", isThinking: false }
                        : m
                )
            );
        } finally {
            setIsTyping(false);
            setIsGenerating(false);
            scrollToBottom();
        }
    };

    // Filter chats by search
    const filteredChats = chatHistory.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background">
                {/* Sidebar */}
                <Sidebar>
                    <SidebarHeader
                        onNewChat={handleNewChat}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onOpenFiles={() => setFilesModalOpen(true)}
                    />
                    <SidebarChatList>
                        {filteredChats.map(chat => (
                            <SidebarChatItem
                                key={chat.id}
                                id={chat.id}
                                title={chat.title}
                                isActive={activeChatId === chat.id}
                                isPinned={chat.isPinned}
                                onClick={() => handleSelectChat(chat.id)}
                                onRename={async (newTitle) => {
                                    try {
                                        await fetch(`${API_URL}/chats/${chat.id}`, {
                                            method: "PATCH",
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify({ title: newTitle }),
                                        });
                                        setChatHistory(prev =>
                                            prev.map(c => (c.id === chat.id ? { ...c, title: newTitle } : c))
                                        );
                                    } catch (e) {
                                        console.error("Failed to rename", e);
                                    }
                                }}
                                onDelete={() => {
                                    setChatToDelete(chat.id);
                                    setDeleteModalOpen(true);
                                }}
                                onPin={() => handlePinChat(chat.id)}
                            />
                        ))}
                    </SidebarChatList>

                    {/* User Footer */}
                    <div className="p-3 border-t border-border mt-auto">
                        <div className="flex items-center gap-3 px-2">
                            <button
                                onClick={() => setSettingsOpen(true)}
                                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                                title="Open settings"
                            >
                                <Avatar fallback={user?.name?.[0] || user?.email?.[0] || "U"} size="md" isOnline />
                            </button>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user?.name || user?.email}</p>
                                <p className="text-xs text-muted-foreground">Free Plan</p>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0">
                    {showWelcome ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-6 shadow-xl">
                                <span className="text-white text-2xl font-bold">9</span>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Welcome to 9anon</h1>
                            <p className="text-muted-foreground mb-8 text-center max-w-md">
                                Your AI-powered Moroccan law assistant. Ask me anything about legal matters.
                            </p>
                            <div className="w-full max-w-2xl">
                                <ChatInput onSubmit={handleSendMessage}>
                                    {/* AttachButton hidden */}
                                    <div className="relative flex-1">
                                        {attachedFiles.length > 0 && (
                                            <div className="flex gap-2 mb-2 flex-wrap pb-2 border-b border-border">
                                                {attachedFiles.map((file, idx) => (
                                                    <div key={idx} className="relative">
                                                        {file.type.startsWith("image/") ? (
                                                            <img src={URL.createObjectURL(file)} alt={file.name} className="h-16 w-16 object-cover rounded-lg" />
                                                        ) : (
                                                            <div className="h-16 w-16 flex items-center justify-center bg-muted rounded-lg text-xs">{file.name.slice(-4)}</div>
                                                        )}
                                                        <button
                                                            onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                            className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <Textarea
                                            placeholder="Message 9anon AI..."
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSendMessage();
                                                }
                                            }}
                                            className="resize-none min-h-[48px] max-h-[200px]"
                                        />
                                    </div>
                                </ChatInput>
                            </div>
                        </div>
                    ) : (
                        <ChatContainer className="flex-1 overflow-hidden">
                            <p className="text-center text-[11px] text-muted-foreground py-2">
                                9anon AI may produce inaccurate information
                            </p>
                            <div ref={messageContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto py-4">
                                <div className="flex flex-col gap-6">
                                    {messages.map(message => (
                                        <MessageBubble key={message.id} variant={message.role}>
                                            {message.role === "user" ? (
                                                <div className="flex flex-col items-end">
                                                    {message.images && message.images.length > 0 && (
                                                        <div className="flex gap-2 mb-2 justify-end flex-wrap">
                                                            {message.images.map((img, idx) => (
                                                                <img key={idx} src={img} alt={`Attached ${idx + 1}`} className="h-20 w-20 object-cover rounded-lg border border-border" />
                                                            ))}
                                                        </div>
                                                    )}
                                                    {message.files && message.files.length > 0 && (
                                                        <div className="flex gap-2 mb-2 justify-end flex-wrap">
                                                            {message.files.map((file, idx) => (
                                                                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border text-xs">
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                                                        <polyline points="14 2 14 8 20 8" />
                                                                    </svg>
                                                                    <span className="max-w-[100px] truncate">{file.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {/* Edit mode for user messages */}
                                                    {editingMessageId === message.id ? (
                                                        <div className="w-full max-w-md">
                                                            <textarea
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                className="w-full p-3 rounded-xl border border-border bg-background resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary"
                                                                autoFocus
                                                            />
                                                            <div className="flex justify-end gap-2 mt-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingMessageId(null);
                                                                        setEditValue("");
                                                                    }}
                                                                    className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                                >
                                                                    Cancel
                                                                </button>
                                                                <button
                                                                    onClick={() => handleEditMessage(message.id, editValue)}
                                                                    disabled={!editValue.trim() || isGenerating}
                                                                    className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                                                >
                                                                    Save & Regenerate
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <UserMessage>
                                                                <MessageContent content={message.content} />
                                                            </UserMessage>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <MessageTimestamp date={message.timestamp} align="right" />
                                                                {/* Edit button - only show for the last user message */}
                                                                {messages.indexOf(message) === messages.length - 2 && !isGenerating && (
                                                                    <button
                                                                        onClick={() => {
                                                                            setEditingMessageId(message.id);
                                                                            setEditValue(message.content);
                                                                        }}
                                                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                                                        title="Edit message"
                                                                    >
                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                                        </svg>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="w-full">
                                                    <AssistantMessage>
                                                        {message.isThinking && !message.content && (
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                                                                <span>Thinking...</span>
                                                            </div>
                                                        )}
                                                        <MessageContent content={message.content} />
                                                        {message.sources && message.sources.length > 0 && (
                                                            <SourcesAccordion sources={message.sources} />
                                                        )}
                                                        {/* Contract display removed */}

                                                    </AssistantMessage>
                                                    {/* Actions aligned with message bubble (after avatar space) */}
                                                    <div className="flex items-center gap-2 mt-1 ml-[52px] text-xs text-muted-foreground">
                                                        <MessageTimestamp date={message.timestamp} />
                                                        <span className="text-muted-foreground/30">•</span>
                                                        <MessageActions
                                                            messageId={message.id}
                                                            content={message.content}
                                                            initialFeedback={message.feedback}
                                                            currentVersion={message.version}
                                                            totalVersions={message.totalVersions}
                                                            onCopy={() => {
                                                                navigator.clipboard.writeText(message.content);
                                                            }}
                                                            onRegenerate={async () => {
                                                                const msgIndex = messages.findIndex(m => m.id === message.id);
                                                                if (msgIndex > 0) {
                                                                    const prevUserMsg = messages[msgIndex - 1];
                                                                    if (prevUserMsg && prevUserMsg.role === "user") {
                                                                        handleRegenerate(message.id, prevUserMsg.content);
                                                                    }
                                                                }
                                                            }}
                                                            onFeedback={async (type) => {
                                                                setMessages(prev =>
                                                                    prev.map(m => (m.id === message.id ? { ...m, feedback: type } : m))
                                                                );
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
                    )}

                    {/* Input Area when not in welcome mode */}
                    {!showWelcome && (
                        <ChatInput onSubmit={handleSendMessage}>
                            {/* AttachButton hidden */}
                            <div className="relative flex-1">
                                {attachedFiles.length > 0 && (
                                    <div className="flex gap-2 mb-2 flex-wrap">
                                        {attachedFiles.map((file, idx) => (
                                            <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                                                <span className="max-w-[100px] truncate">{file.name}</span>
                                                <button
                                                    onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                    className="text-muted-foreground hover:text-destructive"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <Textarea
                                    placeholder="Message 9anon AI..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    disabled={isGenerating}
                                    className="resize-none min-h-[48px] max-h-[200px]"
                                />
                            </div>
                        </ChatInput>
                    )}
                </main>

                <ConfirmModal
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleDeleteChat}
                    title="Delete Chat"
                    description="Are you sure you want to delete this chat? This action cannot be undone."
                    variant="destructive"
                />

                {/* Settings Modal - Placed outside of Sidebar to prevent containment */}
                <SettingsModal
                    isOpen={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                    user={user}
                    onLogout={logout}
                />

                <FilesModal
                    isOpen={filesModalOpen}
                    onClose={() => setFilesModalOpen(false)}
                />
            </div>
        </SidebarProvider>
    );
}
