"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import { ScrollToBottom } from "@/components/utility/scroll-to-bottom";
import { ConfirmModal } from "@/components/utility/modal";
import { SettingsModal } from "@/components/settings/settings-modal";
import { FilesModal } from "@/components/chat/files-modal";
import { FeedbackModal } from "@/components/chat/feedback-modal";
import { AttachButton } from "@/components/interaction/attach-button";
import { FilePreview } from "@/components/chat/file-preview";
import { AnimatedThinkingSvg } from "@/components/interaction/animated-thinking-svg";

// UI Components
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AuthenticatedImage } from "@/components/ui/authenticated-image";

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

export default function NewChatPage() {
    const router = useRouter();
    const { user, token, logout, isLoading: authLoading } = useAuth();

    // State
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [showWelcome, setShowWelcome] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [filesModalOpen, setFilesModalOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    // Show feedback modal immediately if not dismissed
    useEffect(() => {
        if (!token || !user || user.feedbackDismissed) return;
        setFeedbackModalOpen(true);
    }, [token, user]);

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

    // Scroll to bottom
    const scrollToBottom = useCallback(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, []);

    // Scroll specific message to top
    const scrollToMessage = useCallback((messageId: string) => {
        setTimeout(() => {
            const el = document.getElementById(`message-${messageId}`);
            if (el) {
                // Scroll the element into view at the top of the container
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }, []);

    // Auto-scroll when a new user message is added
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            // If the last message is the user's message, or if it's the AI's "thinking" stub right after
            if (lastMessage.role === "user") {
                scrollToMessage(lastMessage.id);
            } else if (lastMessage.role === "assistant" && lastMessage.isThinking && messages.length >= 2) {
                const prevMessage = messages[messages.length - 2];
                if (prevMessage.role === "user") {
                    scrollToMessage(prevMessage.id);
                }
            }
        }
    }, [messages, scrollToMessage]);

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
    const handleNewChat = () => {
        setActiveChatId(null);
        setMessages([]);
        setShowWelcome(true);
        setInputValue("");
        window.history.pushState(null, '', '/chat');
    };

    // Select chat - navigate to [id] page for existing chats
    const handleSelectChat = (id: string) => {
        router.push(`/chat/${id}`);
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
        } catch (e) {
            console.error("Failed to delete chat", e);
        } finally {
            setDeleteModalOpen(false);
            setChatToDelete(null);
        }
    };

    // Send message - handles both new chat creation and sending
    const handleSendMessage = async () => {
        const content = inputValue.trim();
        if (!content && attachedFiles.length === 0) return;
        if (isGenerating) return;

        setInputValue("");
        setIsTyping(true);
        setIsGenerating(true);
        setShowWelcome(false);

        const currentMessageId = Date.now().toString();

        let currentChatId = activeChatId;

        // Create image URLs for display
        const imageUrls = attachedFiles
            .filter(f => f.type.startsWith("image/"))
            .map(f => URL.createObjectURL(f));

        const otherFiles = attachedFiles
            .filter(f => !f.type.startsWith("image/"))
            .map(f => ({
                name: f.name,
                type: f.type,
                url: URL.createObjectURL(f),
                size: f.size,
                mimetype: f.type
            }));

        // Add user message optimistically
        const userMessage: Message = {
            id: currentMessageId,
            role: "user",
            content: content,
            timestamp: new Date(),
            images: imageUrls,
            files: otherFiles,
        };

        // Add assistant message stub optimistically
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

        setMessages(prev => [...prev, userMessage, assistantMsg]);

        // Cache files for processing and clear UI attachment state immediately
        const filesToProcess = [...attachedFiles];
        setAttachedFiles([]);

        // Update scroll position early
        setTimeout(() => scrollToMessage(currentMessageId), 50);

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
                // Update URL without navigation
                window.history.pushState(null, '', `/chat/${currentChatId}`);
                // Add to chat history
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
                setMessages(prev => prev.filter(m => m.id !== currentMessageId && m.id !== assistantId));
                return;
            }
        }

        // Read text/md/csv files to provide context to the AI
        let extractedTextContext = "";
        const textFiles = filesToProcess.filter(f =>
            f.type === "text/plain" || f.type === "text/markdown" || f.type === "text/csv" || f.name.endsWith('.md') || f.name.endsWith('.txt') || f.name.endsWith('.csv')
        );

        for (const file of textFiles) {
            try {
                const text = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.onerror = reject;
                    reader.readAsText(file);
                });
                extractedTextContext += `\n\n--- Content of attached file: ${file.name} ---\n${text}\n-----------------------------------\n`;
            } catch (err) {
                console.error(`Failed to read ${file.name}`, err);
            }
        }

        const systemMessageWithFiles = extractedTextContext
            ? `I have attached some files for your reference. Here is their content:\n${extractedTextContext}\n\nMy question/message is: ${content}`
            : content;

        // Upload files to server
        let uploadedFilesData: any[] = [];
        if (filesToProcess.length > 0) {
            try {
                const formData = new FormData();
                filesToProcess.forEach(file => formData.append("files", file));

                const uploadRes = await fetch(`${API_URL}/upload/multiple`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                });

                if (uploadRes.ok) {
                    const uploadResult = await uploadRes.json();
                    if (uploadResult.success && uploadResult.files) {
                        uploadedFilesData = uploadResult.files.map((f: any) => ({
                            id: f.id,
                            url: `${API_URL}/upload/files/${f.id}/download`,
                            name: f.originalName,
                            mimetype: f.mimetype,
                            size: f.size
                        }));
                    }
                }
            } catch (err) {
                console.error("Failed to upload files to server", err);
            }
        }

        // Save user message to DB
        try {
            await fetch(`${API_URL}/chats/${currentChatId}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role: "user",
                    content: content,
                    files: uploadedFilesData.length > 0 ? JSON.stringify(uploadedFilesData) : undefined
                }),
            });
        } catch (e) {
            console.error("Failed to save user message", e);
        }

        let fullContent = "";
        let finalSources: any[] = [];
        let finalContract: { title: string; path: string; type: string } | null = null;

        // Compress images
        const imageData: { data: string; mimeType: string }[] = [];
        for (const file of filesToProcess) {
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
                    message: systemMessageWithFiles,
                    history: messages,
                    images: imageData,
                    chatId: currentChatId, // Pass chatId for backend persistence
                    files: uploadedFilesData.length > 0 ? uploadedFilesData.map(f => f.id) : undefined // Only send the IDs here for association if needed
                }),
            });

            setAttachedFiles([]);

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            }

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
                                // Do not force scroll to bottom here, just rely on auto-scroll of the message
                            } else if (event.type === "citation") {
                                finalSources = event.sources || [];
                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantId ? { ...m, sources: finalSources } : m
                                    )
                                );
                            } else if (event.type === "contract_generated") {
                                // Handle generated contract - add to message
                                const doc = event.document;
                                // Save for DB persistence - just store the doc ID
                                finalContract = {
                                    title: doc.title,
                                    path: doc.id, // Just store the ID
                                    type: doc.type
                                };

                                setMessages(prev =>
                                    prev.map(m =>
                                        m.id === assistantId
                                            ? { ...m, contract: finalContract! } // Use the properly formatted contract
                                            : m
                                    )
                                );
                            }
                        } catch (e) {
                            console.error("Parse error", e);
                        }
                    }
                }
            }

            // Assistant message is now saved by the backend

        } catch (error) {
            console.error("Stream error:", error);
            setMessages(prev =>
                prev.map(m =>
                    m.id === assistantId
                        ? {
                            ...m,
                            content: m.content ? m.content + "\n\n*[Connection interrupted]*" : "Sorry, there was an error. Please try again.",
                            isThinking: false
                        }
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

        // Remove the old assistant message and add a new thinking one
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
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: userContent,
                    history: messages.filter(m => m.id !== assistantMsgId),
                    images: [],
                    chatId: activeChatId, // Pass chatId for backend persistence
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            }

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

            // Ensure thinking state is cleared
            setMessages(prev => prev.map(m => m.id === newAssistantId ? { ...m, isThinking: false } : m));
        } catch (error) {
            console.error("Regenerate error:", error);
            setMessages(prev =>
                prev.map(m =>
                    m.id === newAssistantId
                        ? {
                            ...m,
                            content: m.content ? m.content + "\n\n*[Connection interrupted]*" : "Sorry, there was an error. Please try again.",
                            isThinking: false
                        }
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
            <div className="flex h-screen bg-sidebar">
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
                                onRename={() => { }}
                                onDelete={() => {
                                    setChatToDelete(chat.id);
                                    setDeleteModalOpen(true);
                                }}
                                onPin={() => handlePinChat(chat.id)}
                            />
                        ))}
                    </SidebarChatList>

                    {/* User Footer */}
                    <div className="p-3 mt-auto">
                        <div className="flex items-center gap-3 px-2">
                            <button
                                onClick={() => setSettingsOpen(true)}
                                className="focus:outline-none rounded-full"
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
                <main className="flex-1 flex flex-col min-w-0 bg-background md:rounded-[2rem] md:border border-border md:m-2 overflow-hidden relative">
                    {showWelcome ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-700">
                            <div className="flex flex-col items-center max-w-3xl w-full">
                                <div className="relative w-24 h-24 mb-8">
                                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                                    <div className="relative w-full h-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl overflow-hidden bg-white border border-border/50 transition-transform duration-500 hover:scale-105">
                                        <img src="/9anon-logo.png" alt="9anon Logo" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground bg-clip-text">
                                    Welcome to <span className="text-primary">9anon</span>
                                </h1>
                                <p className="text-lg text-muted-foreground mb-12 text-center max-w-xl font-light">
                                    Your AI-powered Moroccan law assistant. Ask me anything about legal matters, procedures, or rights.
                                </p>

                                <div className="w-full relative z-10 mb-12">
                                    <ChatInput onSubmit={handleSendMessage} className="!sticky-none bg-transparent">
                                        <div className="flex-1 flex items-end gap-2 w-full min-w-0 bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-2 shadow-sm transition-all duration-300 focus-within:shadow-md focus-within:border-primary/50 focus-within:bg-card">
                                            <AttachButton onFilesSelected={handleFileUpload} />
                                            <div className="relative flex-1 w-full min-w-0">
                                                {attachedFiles.length > 0 && (
                                                    <div className="flex gap-2 mb-2 flex-wrap pb-2 border-b border-border/50">
                                                        {attachedFiles.map((file, idx) => (
                                                            <FilePreview
                                                                key={idx}
                                                                file={{
                                                                    id: idx.toString(),
                                                                    name: file.name,
                                                                    url: URL.createObjectURL(file),
                                                                    mimetype: file.type,
                                                                    size: file.size
                                                                }}
                                                                mode="input"
                                                                onRemove={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                            />
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
                                                    className="resize-none min-h-[48px] max-h-[200px] border-none focus-visible:ring-0 bg-transparent px-2 py-3 text-base"
                                                />
                                            </div>
                                        </div>
                                    </ChatInput>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    {[
                                        { title: "ما هي حقوقي", desc: "في حالة توقيفي؟", icon: "⚖️" },
                                        { title: "Comment créer", desc: "une société au Maroc?", icon: "🏢" },
                                        { title: "What are the", desc: "labor laws in Morocco?", icon: "💼" },
                                        { title: "شرح لي", desc: "قانون الأسرة", icon: "👨‍👩‍👧‍👦" },
                                    ].map((s, i) => (
                                        <button
                                            key={s.title}
                                            onClick={() => setInputValue(s.title + " " + s.desc)}
                                            className="group flex items-start gap-4 p-5 text-left bg-card/30 hover:bg-card border border-border/40 hover:border-primary/30 rounded-2xl transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                                            style={{ animationDelay: `${i * 100}ms` }}
                                        >
                                            <div className="text-2xl opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                                                {s.icon}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-semibold text-foreground/90 group-hover:text-primary transition-colors">{s.title}</span>
                                                <span className="text-sm text-muted-foreground font-medium">{s.desc}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ChatContainer className="flex-1 overflow-hidden md:rounded-[2rem]">
                            <p className="text-center text-[11px] text-muted-foreground py-2">
                                9anon AI may produce inaccurate information
                            </p>
                            <div ref={messageContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-8 py-4">
                                <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
                                    {messages.map(message => (
                                        <MessageBubble key={message.id} variant={message.role}>
                                            {message.role === "user" ? (
                                                <div id={`message-${message.id}`} className="flex flex-col items-end w-full">
                                                    <UserMessage>
                                                        {message.images && message.images.length > 0 && (
                                                            <div className="flex gap-2 mb-2 flex-wrap">
                                                                {message.images.map((img, idx) => (
                                                                    <AuthenticatedImage key={idx} src={img} alt={`Attached ${idx + 1}`} className="h-24 w-24 object-cover rounded-xl border border-white/20 shadow-sm" />
                                                                ))}
                                                            </div>
                                                        )}
                                                        {message.files && message.files.length > 0 && (
                                                            <div className="flex gap-2 mb-2 flex-wrap">
                                                                {message.files.map((file, idx) => (
                                                                    <FilePreview
                                                                        key={idx}
                                                                        file={{
                                                                            id: (file as any).id || idx.toString(),
                                                                            name: file.name,
                                                                            url: (file as any).url || "",
                                                                            mimetype: (file as any).mimetype || file.type,
                                                                            size: (file as any).size || 0
                                                                        }}
                                                                        mode="display"
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                        <MessageContent content={message.content} />
                                                    </UserMessage>
                                                    <MessageTimestamp date={message.timestamp} align="right" />
                                                </div>
                                            ) : (
                                                <div className="w-full group relative">
                                                    <AssistantMessage>
                                                        {message.isThinking && !message.content && (
                                                            <div className="flex items-center py-2">
                                                                <AnimatedThinkingSvg />
                                                            </div>
                                                        )}
                                                        <MessageContent content={message.content} />
                                                        {message.sources && message.sources.length > 0 && (
                                                            <SourcesAccordion sources={message.sources} />
                                                        )}
                                                        {message.contract && (
                                                            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                                                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                                            <polyline points="14 2 14 8 20 8" />
                                                                            <line x1="16" y1="13" x2="8" y2="13" />
                                                                            <line x1="16" y1="17" x2="8" y2="17" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="font-medium text-sm">{message.contract.title}</p>
                                                                        <p className="text-xs text-muted-foreground">PDF Document</p>
                                                                    </div>
                                                                    <a
                                                                        href={`https://api.9anonai.com/api/pdf/download/${message.contract.path.split('/').pop()}?token=${token}`}
                                                                        download
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                                                                    >
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                                            <polyline points="7 10 12 15 17 10" />
                                                                            <line x1="12" y1="15" x2="12" y2="3" />
                                                                        </svg>
                                                                        Download
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </AssistantMessage>
                                                    {/* Actions aligned with message bubble */}
                                                    <div className="flex items-center gap-2 mt-1 ml-4 text-xs text-muted-foreground opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
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
                        <ChatInput onSubmit={handleSendMessage} isLoading={isGenerating}>
                            <div className="flex-1 flex items-end gap-2 w-full min-w-0">
                                <AttachButton onFilesSelected={handleFileUpload} />
                                <div className="relative flex-1 w-full min-w-0">
                                    {attachedFiles.length > 0 && (
                                        <div className="flex gap-2 mb-2 flex-wrap">
                                            {attachedFiles.map((file, idx) => (
                                                <FilePreview
                                                    key={idx}
                                                    file={{
                                                        id: idx.toString(),
                                                        name: file.name,
                                                        url: URL.createObjectURL(file),
                                                        mimetype: file.type,
                                                        size: file.size
                                                    }}
                                                    mode="input"
                                                    onRemove={() => setAttachedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                />
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
                            </div>
                        </ChatInput>
                    )}
                </main>
            </div>

            {/* Settings Modal - Placed outside of Sidebar to prevent containment */}
            <SettingsModal
                isOpen={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                user={user}
                onLogout={logout}
            />

            <ConfirmModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteChat}
                title="Delete chat?"
                description="This will permanently delete this chat history."
                confirmText="Delete"
                variant="destructive"
            />

            <FilesModal
                isOpen={filesModalOpen}
                onClose={() => setFilesModalOpen(false)}
            />

            {/* Feedback Modal - shown to active users with 20+ messages */}
            <FeedbackModal
                isOpen={feedbackModalOpen}
                onClose={() => setFeedbackModalOpen(false)}
            />
        </SidebarProvider>
    );
}
