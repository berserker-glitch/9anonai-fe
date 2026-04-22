"use client";

import { useState, useMemo } from "react";
import { Search, Download, RefreshCw, Star, Mail } from "lucide-react";
import { ConversationDrawer, UserStats } from "./conversation-drawer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface UsersTableProps {
    users: UserStats[];
    token: string | null;
    onRefresh: () => void;
    isLoading?: boolean;
    onUsersChange?: (updatedUsers: UserStats[]) => void;
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatTime(dateString: string) {
    return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

type SortField = "conversationCount" | "messageCount" | "createdAt" | "lastActive";

export function UsersTable({ users, token, onRefresh, isLoading, onUsersChange }: UsersTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<SortField>("lastActive");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [showGoogleOnly, setShowGoogleOnly] = useState(false);
    const [togglingId, setTogglingId] = useState<string | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserStats | null>(null);

    const filteredUsers = useMemo(() => {
        return users
            .filter(
                (u) =>
                    (!showFavoritesOnly || u.isFavorite) &&
                    (!showGoogleOnly || u.authMethod === "google") &&
                    (u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())))
            )
            .sort((a, b) => {
                let comparison = 0;
                if (sortField === "createdAt" || sortField === "lastActive") {
                    comparison = new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
                } else {
                    comparison = a[sortField] - b[sortField];
                }
                return sortOrder === "asc" ? comparison : -comparison;
            });
    }, [users, searchQuery, sortField, sortOrder, showFavoritesOnly, showGoogleOnly]);

    const handleToggleFavorite = async (userId: string) => {
        if (!token || togglingId) return;
        setTogglingId(userId);
        try {
            const res = await fetch(`${API_URL}/admin/users/${userId}/favorite`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const { isFavorite } = await res.json();
                const updated = users.map((u) => u.id === userId ? { ...u, isFavorite } : u);
                onUsersChange?.(updated);
            }
        } catch (e) {
            console.error("Failed to toggle favorite", e);
        } finally {
            setTogglingId(null);
        }
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("desc");
        }
    };

    const handleExport = () => {
        const headers = ["ID", "Email", "Name", "Role", "Auth Method", "Created At", "Marketing Source", "Conversations", "Messages", "Last Active"];
        const csvContent = [
            headers.join(","),
            ...users.map((u) =>
                [
                    u.id,
                    u.email,
                    `"${u.name || ""}"`,
                    u.role,
                    u.authMethod,
                    new Date(u.createdAt).toISOString(),
                    u.marketingSource || "",
                    u.conversationCount,
                    u.messageCount,
                    new Date(u.lastActive).toISOString(),
                ].join(",")
            ),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `users_export_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const SortIcon = ({ field }: { field: SortField }) =>
        sortField === field ? <span className="text-primary">{sortOrder === "asc" ? "↑" : "↓"}</span> : null;

    return (
        <>
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                {/* Table Header Controls */}
                <div className="p-6 border-b border-border">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold">All Users</h2>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={onRefresh}
                                disabled={isLoading}
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                                title="Refresh"
                            >
                                <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                            </button>
                            <button
                                onClick={() => setShowFavoritesOnly((v) => !v)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${showFavoritesOnly ? "bg-amber-400/20 text-amber-500 border border-amber-400/40 hover:bg-amber-400/30" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
                                title="Show favorites only"
                            >
                                <Star className={`h-4 w-4 ${showFavoritesOnly ? "fill-amber-400 text-amber-400" : ""}`} />
                                Favorites
                            </button>
                            <button
                                onClick={() => setShowGoogleOnly((v) => !v)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-colors ${showGoogleOnly ? "bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`}
                                title="Show Google users only"
                            >
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                            >
                                <Download className="h-4 w-4" />
                                Export CSV
                            </button>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-56 px-4 py-2 pl-9 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-4 py-4 w-10"></th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">User</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Role</th>
                                <th
                                    className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                    onClick={() => handleSort("conversationCount")}
                                >
                                    <div className="flex items-center gap-1">Conversations <SortIcon field="conversationCount" /></div>
                                </th>
                                <th
                                    className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                    onClick={() => handleSort("messageCount")}
                                >
                                    <div className="flex items-center gap-1">Messages <SortIcon field="messageCount" /></div>
                                </th>
                                <th
                                    className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                    onClick={() => handleSort("createdAt")}
                                >
                                    <div className="flex items-center gap-1">Joined <SortIcon field="createdAt" /></div>
                                </th>
                                <th
                                    className="text-left px-6 py-4 text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                    onClick={() => handleSort("lastActive")}
                                >
                                    <div className="flex items-center gap-1">Last Active <SortIcon field="lastActive" /></div>
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Auth</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Source</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => handleToggleFavorite(u.id)}
                                            disabled={togglingId === u.id}
                                            title={u.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                            className="p-1 rounded-md hover:bg-muted transition-colors disabled:opacity-40"
                                        >
                                            <Star className={`h-4 w-4 transition-colors ${u.isFavorite ? "fill-amber-400 text-amber-400" : "text-muted-foreground hover:text-amber-400"}`} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-9 w-9 shrink-0">
                                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                                                    {u.name?.[0] || u.email[0].toUpperCase()}
                                                </div>
                                                {u.authMethod === "google" && (
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-card border border-border flex items-center justify-center">
                                                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-sm truncate">{u.name || "—"}</p>
                                                <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${u.role === "superadmin" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-sm">{u.conversationCount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-sm">{u.messageCount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm">{formatDate(u.createdAt)}</td>
                                    <td className="px-6 py-4 text-muted-foreground text-sm">{formatTime(u.lastActive)}</td>
                                    <td className="px-6 py-4">
                                        {u.authMethod === "google" ? (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                                <svg className="w-3 h-3" viewBox="0 0 24 24">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                                Google
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                                                <Mail className="w-3 h-3" />
                                                Email
                                            </span>
                                        )}
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
                                            onClick={() => { setSelectedUser(u); setDrawerOpen(true); }}
                                            className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                        >
                                            View Chats
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={10} className="px-6 py-12 text-center text-muted-foreground text-sm">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-border bg-muted/20">
                    <p className="text-xs text-muted-foreground">
                        Showing {filteredUsers.length} of {users.length} users
                    </p>
                </div>
            </div>

            <ConversationDrawer
                user={selectedUser}
                isOpen={drawerOpen}
                token={token}
                onClose={() => { setDrawerOpen(false); setSelectedUser(null); }}
            />
        </>
    );
}
