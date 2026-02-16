"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface UserStats {
    id: string;
    email: string;
    name: string | null;
    role: string;
    createdAt: string;
    marketingSource: string | null;
    conversationCount: number;
    messageCount: number;
}

interface SystemStats {
    totalUsers: number;
    totalConversations: number;
    totalMessages: number;
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export default function AdminDashboard() {
    const router = useRouter();
    const { user, token, logout, isLoading: authLoading } = useAuth();
    const [users, setUsers] = useState<UserStats[]>([]);
    const [stats, setStats] = useState<SystemStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<"conversationCount" | "messageCount" | "createdAt">("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    // Drawer state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserStats | null>(null);
    const [userChats, setUserChats] = useState<UserChat[]>([]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [drawerLoading, setDrawerLoading] = useState(false);

    // Redirect if not authenticated or not superadmin
    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
            } else if (user.role !== "superadmin") {
                router.push("/chat");
            }
        }
    }, [user, authLoading, router]);

    // Fetch data
    useEffect(() => {
        if (token && user?.role === "superadmin") {
            Promise.all([
                fetch(`${API_URL}/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                }).then(res => res.json()),
                fetch(`${API_URL}/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                }).then(res => res.json())
            ])
                .then(([usersData, statsData]) => {
                    if (usersData.users) setUsers(usersData.users);
                    if (statsData.totalUsers !== undefined) setStats(statsData);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch admin data:", err);
                    setError("Failed to load dashboard data");
                    setIsLoading(false);
                });
        }
    }, [token, user]);

    // Filter and sort users
    const filteredUsers = users
        .filter(u =>
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .sort((a, b) => {
            let comparison = 0;
            if (sortField === "createdAt") {
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else {
                comparison = a[sortField] - b[sortField];
            }
            return sortOrder === "asc" ? comparison : -comparison;
        });

    const handleSort = (field: typeof sortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("desc");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // Open drawer and fetch user's conversations
    const handleViewConversations = async (u: UserStats) => {
        setSelectedUser(u);
        setDrawerOpen(true);
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

    const handleExport = () => {
        const headers = ["ID", "Email", "Name", "Role", "Created At", "Marketing Source", "Conversations", "Messages"];
        const csvContent = [
            headers.join(","),
            ...users.map(u => [
                u.id,
                u.email,
                `"${u.name || ""}"`,
                u.role,
                new Date(u.createdAt).toISOString(),
                u.marketingSource || "",
                u.conversationCount,
                u.messageCount
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `users_export_${new Date().toISOString().split("T")[0]}.csv`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleRefresh = () => {
        setIsLoading(true);
        Promise.all([
            fetch(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.json()),
            fetch(`${API_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(res => res.json())
        ])
            .then(([usersData, statsData]) => {
                if (usersData.users) setUsers(usersData.users);
                if (statsData.totalUsers !== undefined) setStats(statsData);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch admin data:", err);
                setError("Failed to load dashboard data");
                setIsLoading(false);
            });
    };

    // Fetch messages for selected conversation
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

    const closeDrawer = () => {
        setDrawerOpen(false);
        setSelectedUser(null);
        setUserChats([]);
        setSelectedChat(null);
        setChatMessages([]);
    };

    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user || user.role !== "superadmin") {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                            <span className="text-white text-lg font-bold">9</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">Super Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Manage users and view system stats</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm font-medium bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-xl">
                        {error}
                    </div>
                )}

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Users</p>
                                    <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Conversations</p>
                                    <p className="text-3xl font-bold">{stats.totalConversations.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Messages</p>
                                    <p className="text-3xl font-bold">{stats.totalMessages.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold">All Users</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                    title="Refresh Data"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                        <path d="M3 3v5h5" />
                                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                        <path d="M16 21h5v-5" />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Export CSV
                                </button>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-64 px-4 py-2 pl-10 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <svg
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.35-4.35" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">User</th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Role</th>
                                    <th
                                        className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                        onClick={() => handleSort("conversationCount")}
                                    >
                                        <div className="flex items-center gap-1">
                                            Conversations
                                            {sortField === "conversationCount" && (
                                                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                        onClick={() => handleSort("messageCount")}
                                    >
                                        <div className="flex items-center gap-1">
                                            Messages
                                            {sortField === "messageCount" && (
                                                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                        onClick={() => handleSort("createdAt")}
                                    >
                                        <div className="flex items-center gap-1">
                                            Joined
                                            {sortField === "createdAt" && (
                                                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                                        Marketing
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                                    {u.name?.[0] || u.email[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{u.name || "—"}</p>
                                                    <p className="text-sm text-muted-foreground">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${u.role === "superadmin"
                                                ? "bg-primary/10 text-primary"
                                                : "bg-muted text-muted-foreground"
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium">{u.conversationCount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-medium">{u.messageCount.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {formatDate(u.createdAt)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.marketingSource ? (
                                                <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                                                    {u.marketingSource}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground text-sm">—</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewConversations(u)}
                                                className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                            >
                                                View Chats
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Conversation Drawer */}
            {drawerOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={closeDrawer}
                    />
                    {/* Drawer */}
                    <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border z-50 shadow-2xl flex flex-col">
                        {/* Drawer Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {selectedChat ? "Conversation" : "Conversations"}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {selectedUser?.name || selectedUser?.email}
                                </p>
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
                                <button
                                    onClick={closeDrawer}
                                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto">
                            {drawerLoading ? (
                                <div className="flex items-center justify-center h-32">
                                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                                </div>
                            ) : selectedChat ? (
                                // Messages View
                                <div className="p-4 space-y-4">
                                    {chatMessages.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-8">No messages</p>
                                    ) : (
                                        chatMessages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${msg.role === "user"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted"
                                                        }`}
                                                >
                                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                                    <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                                                        }`}>
                                                        {formatTime(msg.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                // Conversations List
                                <div className="divide-y divide-border">
                                    {userChats.length === 0 ? (
                                        <p className="text-center text-muted-foreground py-8">No conversations</p>
                                    ) : (
                                        userChats.map((chat) => (
                                            <button
                                                key={chat.id}
                                                onClick={() => handleSelectConversation(chat.id)}
                                                className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium truncate pr-4">{chat.title}</p>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                        {chat.messageCount} msgs
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {formatTime(chat.updatedAt)}
                                                </p>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
