"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export interface UserStats {
    id: string;
    email: string;
    name: string | null;
    role: string;
    isFavorite: boolean;
    createdAt: string;
    marketingSource: string | null;
    authMethod: "google" | "email";
    conversationCount: number;
    messageCount: number;
    lastActive: string;
}

interface UserChat {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messageCount: number;
}

interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
}

interface ConversationDrawerProps {
    user: UserStats | null;
    isOpen: boolean;
    token: string | null;
    onClose: () => void;
}

function formatTime(dateString: string) {
    return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function ConversationDrawer({ user, isOpen, token, onClose }: ConversationDrawerProps) {
    const [userChats, setUserChats] = useState<UserChat[]>([]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [drawerLoading, setDrawerLoading] = useState(false);

    // Fetch chats when user changes
    const handleOpen = async (u: UserStats) => {
        setDrawerLoading(true);
        setSelectedChat(null);
        setChatMessages([]);
        try {
            const res = await fetch(`${API_URL}/admin/users/${u.id}/chats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setUserChats(data.chats || []);
        } catch (e) {
            console.error("Failed to fetch user chats", e);
            setUserChats([]);
        } finally {
            setDrawerLoading(false);
        }
    };

    const handleSelectConversation = async (chatId: string) => {
        setSelectedChat(chatId);
        setDrawerLoading(true);
        try {
            const res = await fetch(`${API_URL}/admin/chats/${chatId}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setChatMessages(data.messages || []);
        } catch (e) {
            console.error("Failed to fetch chat messages", e);
            setChatMessages([]);
        } finally {
            setDrawerLoading(false);
        }
    };

    const handleClose = () => {
        setUserChats([]);
        setSelectedChat(null);
        setChatMessages([]);
        onClose();
    };

    // Expose open handler via ref-like pattern
    if (!isOpen || !user) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
            <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border z-50 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold">
                                {selectedChat ? "Conversation" : "Conversations"}
                            </h2>
                            {user.authMethod === "google" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.name || user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedChat && (
                            <button
                                onClick={() => { setSelectedChat(null); setChatMessages([]); }}
                                className="px-3 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                            >
                                ← Back
                            </button>
                        )}
                        <button onClick={handleClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {drawerLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : selectedChat ? (
                        <div className="p-4 space-y-4">
                            {chatMessages.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No messages</p>
                            ) : (
                                chatMessages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                            <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                                {formatTime(msg.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {userChats.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">
                                    <MessageBubbleIcon />
                                    <p className="mt-2 text-sm">No conversations yet</p>
                                </div>
                            ) : (
                                userChats.map((chat) => (
                                    <button
                                        key={chat.id}
                                        onClick={() => handleSelectConversation(chat.id)}
                                        className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium truncate pr-4">{chat.title}</p>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.messageCount} msgs</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{formatTime(chat.updatedAt)}</p>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Trigger fetch on first render */}
                <FetchTrigger user={user} onMount={handleOpen} />
            </div>
        </>
    );
}

// Internal trigger component that calls onMount once on first render
function FetchTrigger({ user, onMount }: { user: UserStats; onMount: (u: UserStats) => void }) {
    useEffect(() => {
        onMount(user);
    // Only run once per user change (userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id]);
    return null;
}

function MessageBubbleIcon() {
    return (
        <svg className="h-10 w-10 mx-auto text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}
