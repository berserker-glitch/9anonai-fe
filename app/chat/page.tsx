"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { trackEvent } from "@/lib/analytics";
import { looksLikeContractRequest } from "@/lib/contract-type-detector";

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
import { PaywallBanner } from "@/components/billing/paywall-banner";

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

// ─── Suggestion chips (language-aware) ─────────────────────────────────────

const SUGGESTIONS: Record<string, { icon: string; text: string }[]> = {
    ar: [
        { icon: "👔", text: "ما هي حقوقي عند الفصل التعسفي من العمل؟" },
        { icon: "🏠", text: "كيف يمكنني فسخ عقد الكراء؟" },
        { icon: "💍", text: "ما هي إجراءات الطلاق في القانون المغربي؟" },
        { icon: "🏗️", text: "كيف أؤسس شركة في المغرب؟" },
        { icon: "⚖️", text: "ما هي قواعد الإرث في المغرب؟" },
        { icon: "🛡️", text: "كيف أحمي نفسي من الجرائم الإلكترونية؟" },
    ],
    fr: [
        { icon: "👔", text: "Quels sont mes droits en cas de licenciement abusif ?" },
        { icon: "🏠", text: "Comment résilier ou augmenter un contrat de bail ?" },
        { icon: "💍", text: "Quelle est la procédure de divorce au Maroc ?" },
        { icon: "🏗️", text: "Comment créer une société au Maroc ?" },
        { icon: "⚖️", text: "Quelles sont les règles d'héritage au Maroc ?" },
        { icon: "🛡️", text: "Que faire en cas de cybercriminalité ?" },
    ],
    en: [
        { icon: "👔", text: "What are my rights if I'm unfairly dismissed from work?" },
        { icon: "🏠", text: "How can I terminate or change my rental contract?" },
        { icon: "💍", text: "What is the divorce procedure under Moroccan law?" },
        { icon: "🏗️", text: "How do I start a company in Morocco?" },
        { icon: "⚖️", text: "What are the inheritance rules in Morocco?" },
        { icon: "🛡️", text: "What are my consumer rights for defective products?" },
    ],
};

// ─── UI strings for the chat page ───────────────────────────────────────────

const CHAT_UI: Record<string, Record<string, string>> = {
    // Prefix only — "9anon" is always rendered separately as a styled span
    welcome_prefix: {
        ar: "مرحباً بك في ",
        fr: "Bienvenue sur ",
        en: "Welcome to ",
    },
    welcome_subtitle: {
        ar: "مساعدك الذكي للقانون المغربي. اسألني أي سؤال قانوني، عن الإجراءات أو حقوقك.",
        fr: "Votre assistant IA pour le droit marocain. Posez-moi toute question juridique, sur les procédures ou vos droits.",
        en: "Your AI-powered Moroccan law assistant. Ask me anything about legal matters, procedures, or rights.",
    },
    input_placeholder: {
        ar: "اكتب رسالتك إلى 9anon...",
        fr: "Message à 9anon IA...",
        en: "Message 9anon AI...",
    },
    disclaimer: {
        // Keep "9anon AI" at the front to avoid Arabic bidi reordering splitting the brand name
        ar: "9anon AI قد ينتج معلومات غير دقيقة",
        fr: "9anon AI peut produire des informations inexactes",
        en: "9anon AI may produce inaccurate information",
    },
    share: {
        ar: "مشاركة",
        fr: "Partager",
        en: "Share",
    },
    share_copied: {
        ar: "تم نسخ الرابط!",
        fr: "Lien copié !",
        en: "Link copied!",
    },
    delete_confirm_title: {
        ar: "هل أنت متأكد؟",
        fr: "Êtes-vous sûr ?",
        en: "Are you sure?",
    },
    delete_confirm_body: {
        ar: "سيتم حذف هذه المحادثة نهائياً ولا يمكن التراجع عنه.",
        fr: "Cette conversation sera définitivement supprimée. Cette action est irréversible.",
        en: "This conversation will be permanently deleted. This action cannot be undone.",
    },
    delete_confirm_btn: {
        ar: "حذف",
        fr: "Supprimer",
        en: "Delete",
    },
    delete_cancel_btn: {
        ar: "إلغاء",
        fr: "Annuler",
        en: "Cancel",
    },
    free_plan: {
        ar: "الخطة المجانية",
        fr: "Plan Gratuit",
        en: "Free Plan",
    },
    basic_plan: {
        ar: "الخطة الأساسية",
        fr: "Plan Asasi",
        en: "Basic Plan",
    },
    pro_plan: {
        ar: "الخطة المهنية",
        fr: "Plan Mihani",
        en: "Pro Plan",
    },
    // Contract suggestion card
    contract_title: {
        ar: "هل تريد صياغة عقد احترافي؟",
        fr: "Besoin d'un contrat professionnel ?",
        en: "Need a professional contract?",
    },
    contract_body: {
        ar: "منشئ العقود يصيغ وثائق متوافقة مع القانون المغربي مع مراجعة قانونية تلقائية وتصدير PDF.",
        fr: "Le Générateur de Contrats rédige des documents conformes au droit marocain avec révision juridique automatique et export PDF.",
        en: "The Contract Builder drafts legally compliant documents with automatic legal review and PDF export.",
    },
    contract_cta: {
        ar: "فتح منشئ العقود →",
        fr: "Ouvrir le Générateur →",
        en: "Open Contract Builder →",
    },
    // Progressive tips
    tip_contract_text: {
        ar: "يمكنك أيضاً صياغة العقود القانونية بالذكاء الاصطناعي 📄",
        fr: "Vous pouvez aussi rédiger des contrats juridiques avec l'IA 📄",
        en: "You can also draft legal contracts with AI 📄",
    },
    tip_contract_cta: {
        ar: "جرّب منشئ العقود",
        fr: "Essayer le générateur de contrats",
        en: "Try the Contract Builder",
    },
    tip_upload_text: {
        ar: "هل تعلم أنك يمكنك إرفاق وثائق للحصول على تحليل مخصص؟ 📎",
        fr: "Savez-vous que vous pouvez joindre des documents pour une analyse personnalisée ? 📎",
        en: "Did you know you can attach documents for personalized analysis? 📎",
    },
    tip_upload_cta: {
        ar: "جرّب الآن",
        fr: "Essayer maintenant",
        en: "Try it now",
    },
    tip_pin_text: {
        ar: "ثبّت المحادثات المهمة للوصول إليها بسرعة 📌",
        fr: "Épinglez vos conversations importantes pour les retrouver rapidement 📌",
        en: "Pin important conversations for quick access 📌",
    },
};

/** Get a UI string for the current language, falling back to French */
function ui(key: string, lang: string): string {
    return CHAT_UI[key]?.[lang] ?? CHAT_UI[key]?.["fr"] ?? key;
}

function getLanguageFromPersonalization(personalization?: string | null): string {
    if (!personalization) return "ar";
    try {
        const p = JSON.parse(personalization);
        const lang = p.spokenLanguage;
        if (lang === "fr") return "fr";
        if (lang === "en") return "en";
        return "ar";
    } catch {
        return "ar";
    }
}

// ────────────────────────────────────────────────────────────────────────────

export default function NewChatPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, token, logout, isLoading: authLoading } = useAuth();
    const { language } = useLanguage();

    // State
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [conversationLimitReached, setConversationLimitReached] = useState(false);
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
    // Track assistant responses in this session for inline feedback prompt
    const [sessionAssistantCount, setSessionAssistantCount] = useState(0);
    // Sharing state
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [shareCopied, setShareCopied] = useState(false);
    const [shareLoading, setShareLoading] = useState(false);
    // Progressive tips (dismissed in localStorage)
    const [dismissedTips, setDismissedTips] = useState<Set<string>>(() => {
        if (typeof window === "undefined") return new Set();
        try { return new Set(JSON.parse(localStorage.getItem("9anon_dismissed_tips") || "[]")); }
        catch { return new Set(); }
    });
    // Contract Builder suggestion — shown inline below assistant responses when contract intent detected
    const [contractSuggestionMessageIds, setContractSuggestionMessageIds] = useState<Set<string>>(new Set());
    const [dismissedContractSuggestions, setDismissedContractSuggestions] = useState<Set<string>>(new Set());

    const autoSentRef = useRef(false);

    const messageContainerRef = useRef<HTMLDivElement>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    // Auto-send ?q= query param (from onboarding scenario picker)
    useEffect(() => {
        if (!user || !token || autoSentRef.current) return;
        const q = searchParams.get("q");
        if (q && q.trim()) {
            autoSentRef.current = true;
            // Clear the query param from URL without re-render
            window.history.replaceState(null, "", "/chat");
            handleSendMessageDirect(q.trim());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, token]);

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
        setSessionAssistantCount(0);
        setConversationLimitReached(false);
        window.history.pushState(null, '', '/chat');
    };

    // Send a message directly with a string (chips, onboarding auto-send, deep links)
    const handleSendMessageDirect = (text: string) => {
        setInputValue(text);
        // Use a microtask so state flush happens before handleSendMessage reads inputValue
        setTimeout(() => {
            setInputValue("");
            triggerSend(text);
        }, 0);
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

    // Core send logic — accepts content directly (used by chips, ?q= param, and the textarea)
    const triggerSend = async (content: string) => {
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
                trackEvent("chat_created");
                // Track first-ever message
                if (chatHistory.length === 0) trackEvent("first_message_sent");
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
                if (response.status === 402 && errData.error === 'conversation_limit_reached') {
                    setConversationLimitReached(true);
                    setMessages(prev => prev.filter(m => m.id !== currentMessageId && m.id !== assistantId));
                    setIsTyping(false);
                    setIsGenerating(false);
                    return;
                }
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

            // Contract Builder suggestion disabled — feature is admin-only during development

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
            setSessionAssistantCount(prev => prev + 1);
        }
    };

    // Public handleSendMessage — reads from textarea inputValue state
    const handleSendMessage = () => {
        const content = inputValue.trim();
        setInputValue("");
        triggerSend(content);
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

    // Share current chat — generates a public link
    const handleShareChat = async () => {
        if (!activeChatId || shareLoading) return;
        if (shareUrl) {
            // Already generated — just copy again
            navigator.clipboard.writeText(shareUrl);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2000);
            return;
        }
        setShareLoading(true);
        try {
            const res = await fetch(`${API_URL}/chats/${activeChatId}/share`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setShareUrl(data.shareUrl);
            navigator.clipboard.writeText(data.shareUrl);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2500);
            trackEvent("chat_shared");
        } catch (e) {
            console.error("Failed to share chat", e);
        } finally {
            setShareLoading(false);
        }
    };

    // Dismiss a progressive tip
    const dismissTip = (tipId: string) => {
        const next = new Set(dismissedTips);
        next.add(tipId);
        setDismissedTips(next);
        try { localStorage.setItem("9anon_dismissed_tips", JSON.stringify([...next])); } catch {}
    };

    // Which tip to show based on conversation count
    const getProgressiveTip = (): { id: string; text: string; cta: string; href: string } | null => {
        const count = chatHistory.length;
        const lang = language;
        const tips = [

            {
                id: "tip_upload",
                threshold: 3,
                text: ui("tip_upload_text", lang),
                cta: ui("tip_upload_cta", lang),
                href: "#attach",
            },
            {
                id: "tip_pin",
                threshold: 5,
                text: ui("tip_pin_text", lang),
                cta: "",
                href: "",
            },
        ];
        for (const tip of tips) {
            if (count >= tip.threshold && !dismissedTips.has(tip.id)) return tip;
        }
        return null;
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
                                <p className="text-xs text-muted-foreground">
                                    {user?.plan === 'pro' ? ui("pro_plan", language)
                                        : user?.plan === 'basic' ? ui("basic_plan", language)
                                        : ui("free_plan", language)}
                                </p>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>


                </Sidebar>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-background md:rounded-[2rem] md:border border-border md:m-2 overflow-hidden relative">
                    {showWelcome ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 animate-in fade-in duration-1000">
                            <div className="w-full max-w-3xl flex flex-col items-center mb-8">
                                <div className="w-20 h-20 mb-6 rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-white transition-transform duration-500 hover:scale-105">
                                    <img src="/9anon-logo.png" alt="9anon Logo" className="w-full h-full object-cover" />
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground bg-clip-text text-center">
                                    {ui("welcome_prefix", language)}<span className="text-primary">9anon</span>
                                </h1>
                                <p className="text-lg text-muted-foreground mb-12 text-center max-w-xl font-light">
                                    {ui("welcome_subtitle", language)}
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
                                                    placeholder={ui("input_placeholder", language)}
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

                                {/* Language-aware suggestion chips — auto-send on click */}
                                {(() => {
                                    const chips = SUGGESTIONS[language] ?? SUGGESTIONS.fr;
                                    return (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl mt-4">
                                            {chips.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSendMessageDirect(s.text)}
                                                    disabled={isGenerating}
                                                    className="flex items-start gap-2 px-4 py-3 text-sm font-medium text-start text-muted-foreground bg-secondary/40 hover:bg-secondary hover:text-foreground border border-transparent hover:border-border/60 rounded-xl transition-all duration-200 disabled:opacity-50"
                                                    style={{ animationDelay: `${i * 80}ms` }}
                                                >
                                                    <span className="shrink-0">{s.icon}</span>
                                                    <span className="leading-snug">{s.text}</span>
                                                </button>
                                            ))}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    ) : (
                        <ChatContainer className="flex-1 overflow-hidden md:rounded-[2rem]">
                            <div className="flex items-center justify-between px-4 py-1.5">
                                <p className="text-[11px] text-muted-foreground">
                                    {ui("disclaimer", language)}
                                </p>
                                {activeChatId && messages.some(m => m.role === "assistant" && m.content) && (
                                    <button
                                        onClick={handleShareChat}
                                        disabled={shareLoading}
                                        title="Share this conversation"
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted/60 disabled:opacity-50"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        {shareCopied ? ui("share_copied", language) : shareLoading ? "..." : ui("share", language)}
                                    </button>
                                )}
                            </div>
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
                                                        {/* Contract Builder suggestion — shown when contract intent detected */}
                                        {contractSuggestionMessageIds.has(message.id) &&
                                            !dismissedContractSuggestions.has(message.id) &&
                                            !message.isThinking && (
                                            <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary mt-0.5">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                            <line x1="16" y1="13" x2="8" y2="13" />
                                                            <line x1="16" y1="17" x2="8" y2="17" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-foreground mb-0.5">
                                                            {ui("contract_title", language)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                                            {ui("contract_body", language)}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-2">
                                                            <a
                                                                href="/contract-builder"
                                                                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                                                            >
                                                                {ui("contract_cta", language)}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setDismissedContractSuggestions(prev => new Set(prev).add(message.id))}
                                                        className="shrink-0 text-muted-foreground/50 hover:text-muted-foreground transition-colors p-0.5"
                                                        title="Dismiss"
                                                    >
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
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

                    {/* Inline satisfaction prompt — appears after 3rd assistant response */}
                    {!showWelcome && sessionAssistantCount === 3 && !user?.feedbackDismissed && (
                        <div className="flex items-center justify-between gap-4 px-6 py-3 bg-primary/5 border-t border-primary/10 text-sm animate-in slide-in-from-bottom duration-300">
                            <span className="text-muted-foreground">
                                {getLanguageFromPersonalization(user?.personalization) === "fr"
                                    ? "Les réponses vous sont-elles utiles ?"
                                    : getLanguageFromPersonalization(user?.personalization) === "en"
                                    ? "Are the answers helpful so far?"
                                    : "هل الإجابات مفيدة لك حتى الآن؟"}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => setFeedbackModalOpen(true)}
                                    className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                                >
                                    {getLanguageFromPersonalization(user?.personalization) === "fr" ? "Donner un avis"
                                        : getLanguageFromPersonalization(user?.personalization) === "en" ? "Give feedback"
                                        : "أعطِ رأيك"}
                                </button>
                                <button
                                    onClick={async () => {
                                        await fetch(`${API_URL}/auth/dismiss-feedback`, {
                                            method: "PATCH",
                                            headers: { Authorization: `Bearer ${token}` },
                                        });
                                        setSessionAssistantCount(0);
                                    }}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Progressive engagement tip — appears at conversation milestones */}
                    {!showWelcome && !isGenerating && (() => {
                        const tip = getProgressiveTip();
                        if (!tip) return null;
                        return (
                            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-emerald-500/5 border-t border-emerald-500/15 text-sm animate-in slide-in-from-bottom duration-300">
                                <span className="text-foreground/80 text-xs">{tip.text}</span>
                                <div className="flex items-center gap-2 shrink-0">
                                    {tip.href && tip.href !== "#attach" && tip.cta && (
                                        <a href={tip.href} className="text-xs text-primary font-medium hover:underline">{tip.cta}</a>
                                    )}
                                    {tip.href === "#attach" && tip.cta && (
                                        <button onClick={() => document.querySelector<HTMLElement>("[data-attach-button]")?.click()} className="text-xs text-primary font-medium hover:underline">{tip.cta}</button>
                                    )}
                                    <button onClick={() => dismissTip(tip.id)} className="text-muted-foreground hover:text-foreground text-xs px-1 transition-colors">✕</button>
                                </div>
                            </div>
                        );
                    })()}

                    {/* Paywall banner — shown when free conversation cap is reached */}
                    {!showWelcome && conversationLimitReached && (
                        <PaywallBanner language={language} onNewConversation={handleNewChat} />
                    )}

                    {/* Input Area when not in welcome mode */}
                    {!showWelcome && !conversationLimitReached && (
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
                title={ui("delete_confirm_title", language)}
                description={ui("delete_confirm_body", language)}
                confirmText={ui("delete_confirm_btn", language)}
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
