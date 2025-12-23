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
    conversationCount: number;
    messageCount: number;
}

interface SystemStats {
    totalUsers: number;
    totalConversations: number;
    totalMessages: number;
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
                                    <th
                                        className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                        onClick={() => handleSort("createdAt")}
                                    >
                                        <div className="flex items-center gap-1">
                                            Joined
                                            {sortField === "createdAt" && (
                                                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                                            )}
                                        </div>
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
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
