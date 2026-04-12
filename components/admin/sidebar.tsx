"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    FileText,
    TrendingUp,
    Menu,
    X,
    Shield,
} from "lucide-react";

const NAV_ITEMS = [
    {
        label: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
    },
    {
        label: "User Analytics",
        href: "/admin/users",
        icon: Users,
        exact: false,
    },
    {
        label: "Engagement",
        href: "/admin/engagement",
        icon: MessageSquare,
        exact: false,
    },
    {
        label: "Content & Features",
        href: "/admin/content",
        icon: FileText,
        exact: false,
    },
    {
        label: "Retention & Cohorts",
        href: "/admin/retention",
        icon: TrendingUp,
        exact: false,
    },
];

interface SidebarProps {
    userEmail: string;
    onLogout: () => void;
}

export function AdminSidebar({ userEmail, onLogout }: SidebarProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (item: typeof NAV_ITEMS[0]) => {
        // Strip query params for comparison
        const cleanPath = pathname.split("?")[0];
        if (item.exact) return cleanPath === item.href;
        return cleanPath === item.href;
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shrink-0">
                        <span className="text-white text-base font-bold">9</span>
                    </div>
                    <div>
                        <p className="font-bold text-sm">9anon Admin</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Super Admin
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const active = isActive(item);
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                active
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User info + logout */}
            <div className="p-4 border-t border-border">
                <div className="px-3 py-2 mb-2">
                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
                <button
                    onClick={onLogout}
                    className="w-full px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors text-left"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-card border-r border-border min-h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Mobile Hamburger */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-2 bg-card border border-border rounded-xl shadow-sm"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <>
                    <div
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside className="lg:hidden fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 shadow-2xl">
                        <div className="absolute right-4 top-4">
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="p-2 hover:bg-muted rounded-lg"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <SidebarContent />
                    </aside>
                </>
            )}
        </>
    );
}
