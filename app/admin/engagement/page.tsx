"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageSquare, MessageCircle, BarChart2, Layers } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { AreaChartWrapper } from "@/components/admin/area-chart-wrapper";
import { BarChartWrapper } from "@/components/admin/bar-chart-wrapper";
import { HeatmapChart } from "@/components/admin/heatmap-chart";
import { useAdminFetch } from "@/components/admin/use-admin-fetch";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OverviewData {
    totalConversations: number;
    totalMessages: number;
    conversationGrowthRate: number;
    messageGrowthRate: number;
}

interface EngagementTimeseriesData {
    data: Array<{ date: string; messages: number; conversations: number }>;
    granularity: "day" | "week" | "month";
}

interface HeatmapData {
    data: Array<{ dayOfWeek: number; hour: number; count: number }>;
}

interface DepthData {
    avgMessagesPerUser: number;
    avgConversationsPerUser: number;
    medianMessagesPerUser: number;
    distribution: Array<{ bucket: string; count: number }>;
}

interface PowerUsersData {
    users: Array<{
        id: string;
        email: string;
        name: string | null;
        messageCount: number;
        conversationCount: number;
        lastActive: string | null;
    }>;
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

function formatTime(dateString: string | null) {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ─── Engagement Page ─────────────────────────────────────────────────────────

function EngagementContent({ range }: { range: string }) {
    const { data: overview, isLoading: overviewLoading } = useAdminFetch<OverviewData>("/admin/analytics/overview", range);
    const { data: engTs, isLoading: tsLoading } = useAdminFetch<EngagementTimeseriesData>("/admin/analytics/engagement/timeseries", range);
    const { data: heatmap, isLoading: heatmapLoading } = useAdminFetch<HeatmapData>("/admin/analytics/engagement/activity-heatmap", range);
    const { data: depth, isLoading: depthLoading } = useAdminFetch<DepthData>("/admin/analytics/engagement/depth", range);
    const { data: powerUsers, isLoading: powerLoading } = useAdminFetch<PowerUsersData>("/admin/analytics/engagement/power-users", range);

    const granularity = engTs?.granularity || "day";
    const chartData = (engTs?.data || []).map((d) => ({
        date: formatXAxisDate(d.date, granularity),
        messages: d.messages,
        conversations: d.conversations,
    }));

    const distributionData = (depth?.distribution || []).map((d) => ({
        name: d.bucket + " msgs",
        count: d.count,
    }));

    return (
        <div className="space-y-6">
            {/* Title */}
            <div>
                <h2 className="text-2xl font-bold">Engagement Analytics</h2>
                <p className="text-muted-foreground text-sm mt-1">How actively users interact with your platform</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    title="Total Conversations"
                    value={overviewLoading ? "—" : (overview?.totalConversations ?? 0)}
                    icon={<MessageSquare className="h-6 w-6" />}
                    iconBg="bg-blue-500/10"
                    iconColor="text-blue-500"
                    trend={overview ? { value: overview.conversationGrowthRate, isPositive: overview.conversationGrowthRate >= 0 } : undefined}
                />
                <StatCard
                    title="Total Messages"
                    value={overviewLoading ? "—" : (overview?.totalMessages ?? 0)}
                    icon={<MessageCircle className="h-6 w-6" />}
                    iconBg="bg-purple-500/10"
                    iconColor="text-purple-500"
                    trend={overview ? { value: overview.messageGrowthRate, isPositive: overview.messageGrowthRate >= 0 } : undefined}
                />
                <StatCard
                    title="Avg Messages / User"
                    value={depthLoading ? "—" : (depth?.avgMessagesPerUser ?? 0)}
                    subtitle={depthLoading ? "" : `Median: ${depth?.medianMessagesPerUser ?? 0}`}
                    icon={<BarChart2 className="h-6 w-6" />}
                    iconBg="bg-emerald-500/10"
                    iconColor="text-emerald-500"
                />
                <StatCard
                    title="Avg Conversations / User"
                    value={depthLoading ? "—" : (depth?.avgConversationsPerUser ?? 0)}
                    icon={<Layers className="h-6 w-6" />}
                    iconBg="bg-amber-500/10"
                    iconColor="text-amber-500"
                />
            </div>

            {/* Dual-series timeseries chart */}
            <ChartCard
                title="Messages & Conversations Over Time"
                subtitle="Combined activity trend"
            >
                {tsLoading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <AreaChartWrapper
                        data={chartData}
                        series={[
                            { key: "messages", label: "Messages", color: "chart-1" },
                            { key: "conversations", label: "Conversations", color: "chart-2" },
                        ]}
                        height={280}
                        emptyMessage="No engagement data in this period"
                    />
                )}
            </ChartCard>

            {/* Activity Heatmap + Distribution */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard
                    title="Activity Heatmap"
                    subtitle="When users are most active (hour × day)"
                >
                    {heatmapLoading ? (
                        <div className="h-48 flex items-center justify-center">
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        <HeatmapChart data={heatmap?.data || []} />
                    )}
                </ChartCard>

                <ChartCard
                    title="Engagement Depth"
                    subtitle="Distribution of messages per user"
                >
                    {depthLoading ? (
                        <div className="h-48 flex items-center justify-center">
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        <BarChartWrapper
                            data={distributionData}
                            xKey="name"
                            bars={[{ key: "count", label: "Users" }]}
                            height={260}
                            emptyMessage="No depth data available"
                        />
                    )}
                </ChartCard>
            </div>

            {/* Power Users Table */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h3 className="font-semibold">Power Users Leaderboard</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Top 20 most active users by message count</p>
                </div>
                {powerLoading ? (
                    <div className="p-8 flex items-center justify-center">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">#</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">User</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">Messages</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">Conversations</th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground">Last Active</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {(powerUsers?.users || []).length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-sm">
                                            No user data yet
                                        </td>
                                    </tr>
                                ) : (
                                    (powerUsers?.users || []).map((u, i) => (
                                        <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-6 py-3 text-sm text-muted-foreground font-bold">{i + 1}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                                                        {u.name?.[0] || u.email[0].toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium truncate">{u.name || "—"}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className="text-sm font-bold text-primary">{u.messageCount.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className="text-sm">{u.conversationCount.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-3 text-sm text-muted-foreground">{formatTime(u.lastActive)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function EngagementPageInner() {
    const searchParams = useSearchParams();
    const range = searchParams.get("range") || "30d";
    return <EngagementContent range={range} />;
}

export default function EngagementPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <EngagementPageInner />
        </Suspense>
    );
}
