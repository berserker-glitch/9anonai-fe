"use client";

import { useEffect, ReactNode, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminSidebar } from "@/components/admin/sidebar";
import { DateRangePicker } from "@/components/admin/date-range-picker";

function AdminLayoutInner({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { user, token, logout, isLoading: authLoading } = useAuth();
    const searchParams = useSearchParams();
    const range = searchParams.get("range") || "30d";

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
            } else if (user.role !== "superadmin") {
                router.push("/chat");
            }
        }
    }, [user, authLoading, router]);

    if (authLoading) {
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
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <AdminSidebar userEmail={user.email} onLogout={logout} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 lg:gap-0">
                        {/* Spacer for mobile hamburger */}
                        <div className="w-10 lg:w-0 lg:hidden" />
                        <div>
                            <h1 className="font-semibold text-sm text-foreground">Analytics Dashboard</h1>
                            <p className="text-xs text-muted-foreground hidden sm:block">
                                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </p>
                        </div>
                    </div>
                    <DateRangePicker value={range} />
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <AdminLayoutInner>{children}</AdminLayoutInner>
        </Suspense>
    );
}
