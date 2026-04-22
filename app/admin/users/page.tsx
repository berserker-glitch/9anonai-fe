"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Users, UserPlus, TrendingUp, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { AreaChartWrapper } from "@/components/admin/area-chart-wrapper";
import { BarChartWrapper } from "@/components/admin/bar-chart-wrapper";
import { PieChartWrapper } from "@/components/admin/pie-chart-wrapper";
import { UsersTable } from "@/components/admin/users-table";
import { useAdminFetch } from "@/components/admin/use-admin-fetch";
import { UserStats } from "@/components/admin/conversation-drawer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OverviewData {
    totalUsers: number;
    newUsersInPeriod: number;
    userGrowthRate: number;
    onboardingRate: number;
}

interface TimeseriesData {
    data: Array<{ date: string; count: number }>;
    granularity: "day" | "week" | "month";
}

interface MarketingSourceData {
    data: Array<{ source: string; count: number; percentage: number }>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatXAxisDate(dateStr: string, granularity: "day" | "week" | "month"): string {
    try {
        if (granularity === "month") {
            const [year, month] = dateStr.split("-");
            return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
        }
        return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
        return dateStr;
    }
}

// ─── Users Analytics Page ────────────────────────────────────────────────────

function UsersAnalyticsContent({ range }: { range: string }) {
    const { token } = useAuth();
    const [allUsers, setAllUsers] = useState<UserStats[]>([]);
    const [usersLoading, setUsersLoading] = useState(true);

    const { data: overview, isLoading: overviewLoading } = useAdminFetch<OverviewData>("/admin/analytics/overview", range);
    const { data: userTs, isLoading: tsLoading } = useAdminFetch<TimeseriesData>("/admin/analytics/users/timeseries", range);
    const { data: sources } = useAdminFetch<MarketingSourceData>("/admin/analytics/users/marketing-sources", "all");

    // Fetch all users for the table
    const fetchUsers = async () => {
        if (!token) return;
        setUsersLoading(true);
        try {
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (data.users) setAllUsers(data.users);
        } catch (e) {
            console.error("Failed to fetch users", e);
        } finally {
            setUsersLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const granularity = userTs?.granularity || "day";

    const chartData = (userTs?.data || []).map((d) => ({
        date: formatXAxisDate(d.date, granularity),
        count: d.count,
    }));

    const sourceBarData = (sources?.data || []).map((s) => ({
        name: s.source.length > 18 ? s.source.slice(0, 16) + "…" : s.source,
        count: s.count,
    }));

    const rolePieData = [
        { name: "Regular Users", value: allUsers.filter((u) => u.role !== "superadmin").length },
        { name: "Super Admins", value: allUsers.filter((u) => u.role === "superadmin").length },
    ].filter((d) => d.value > 0);

    const authPieData = [
        { name: "Email / Password", value: allUsers.filter((u) => u.authMethod === "email").length },
        { name: "Google", value: allUsers.filter((u) => u.authMethod === "google").length },
    ].filter((d) => d.value > 0);

    return (
        <div className="space-y-6">
            {/* Title */}
            <div>
                <h2 className="text-2xl font-bold">User Analytics</h2>
                <p className="text-muted-foreground text-sm mt-1">Registration trends, growth, and user distribution</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={overviewLoading ? "—" : (overview?.totalUsers ?? 0)}
                    icon={<Users className="h-6 w-6" />}
                    iconBg="bg-blue-500/10"
                    iconColor="text-blue-500"
                />
                <StatCard
                    title="New Users"
                    value={overviewLoading ? "—" : (overview?.newUsersInPeriod ?? 0)}
                    subtitle="In selected period"
                    icon={<UserPlus className="h-6 w-6" />}
                    iconBg="bg-emerald-500/10"
                    iconColor="text-emerald-500"
                />
                <StatCard
                    title="Growth Rate"
                    value={overviewLoading ? "—" : `${Math.abs(overview?.userGrowthRate ?? 0).toFixed(1)}%`}
                    subtitle="vs previous period"
                    icon={<TrendingUp className="h-6 w-6" />}
                    iconBg="bg-purple-500/10"
                    iconColor="text-purple-500"
                    trend={overview ? { value: overview.userGrowthRate, isPositive: overview.userGrowthRate >= 0 } : undefined}
                />
                <StatCard
                    title="Onboarding Rate"
                    value={overviewLoading ? "—" : `${overview?.onboardingRate ?? 0}%`}
                    subtitle="Setup completed"
                    icon={<CheckCircle className="h-6 w-6" />}
                    iconBg="bg-amber-500/10"
                    iconColor="text-amber-500"
                />
            </div>

            {/* Registration Timeseries */}
            <ChartCard
                title="User Registration Trend"
                subtitle="New signups over the selected period"
            >
                {tsLoading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <AreaChartWrapper
                        data={chartData}
                        series={[{ key: "count", label: "New Users", color: "chart-1" }]}
                        height={260}
                        emptyMessage="No registrations in this period"
                    />
                )}
            </ChartCard>

            {/* Source + Role + Auth Distribution */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard
                    title="Marketing Sources"
                    subtitle="Where users are coming from"
                >
                    <BarChartWrapper
                        data={sourceBarData}
                        xKey="name"
                        bars={[{ key: "count", label: "Users" }]}
                        height={260}
                        layout="vertical"
                        emptyMessage="No source data available"
                    />
                </ChartCard>

                <ChartCard
                    title="User Role Distribution"
                    subtitle="Breakdown by account type"
                >
                    <PieChartWrapper
                        data={rolePieData}
                        height={260}
                        emptyMessage="No users yet"
                        showLegend
                    />
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard
                    title="Sign-in Method"
                    subtitle="Google OAuth vs Email / Password"
                >
                    <PieChartWrapper
                        data={authPieData}
                        height={260}
                        emptyMessage="No users yet"
                        showLegend
                    />
                </ChartCard>
            </div>

            {/* Full Users Table */}
            {usersLoading ? (
                <div className="bg-card border border-border rounded-2xl p-8 flex items-center justify-center">
                    <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                </div>
            ) : (
                <UsersTable
                    users={allUsers}
                    token={token}
                    onRefresh={fetchUsers}
                    isLoading={usersLoading}
                    onUsersChange={setAllUsers}
                />
            )}
        </div>
    );
}

function UsersPageInner() {
    const searchParams = useSearchParams();
    const range = searchParams.get("range") || "30d";
    return <UsersAnalyticsContent range={range} />;
}

export default function UsersAnalyticsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <UsersPageInner />
        </Suspense>
    );
}
