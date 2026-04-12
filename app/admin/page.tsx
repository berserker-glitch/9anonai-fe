"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    Users,
    MessageSquare,
    Activity,
    ThumbsUp,
    FileText,
    Zap,
    TrendingUp,
    Upload,
    CheckCircle,
    BarChart2,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { AreaChartWrapper } from "@/components/admin/area-chart-wrapper";
import { PieChartWrapper } from "@/components/admin/pie-chart-wrapper";
import { useAdminFetch } from "@/components/admin/use-admin-fetch";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OverviewData {
    totalUsers: number;
    totalConversations: number;
    totalMessages: number;
    totalDocuments: number;
    totalContractSessions: number;
    totalFileUploads: number;
    newUsersInPeriod: number;
    userGrowthRate: number;
    conversationGrowthRate: number;
    messageGrowthRate: number;
    dau: number;
    wau: number;
    mau: number;
    onboardingRate: number;
    totalLikes: number;
    totalDislikes: number;
    satisfactionRate: number;
}

interface TimeseriesData {
    data: Array<{ date: string; count: number }>;
    granularity: "day" | "week" | "month";
}

interface EngagementTimeseriesData {
    data: Array<{ date: string; messages: number; conversations: number }>;
    granularity: "day" | "week" | "month";
}

interface MarketingSourceData {
    data: Array<{ source: string; count: number; percentage: number }>;
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

function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// ─── Overview Page ───────────────────────────────────────────────────────────

function OverviewContent({ range }: { range: string }) {
    const { data: overview, isLoading: overviewLoading } = useAdminFetch<OverviewData>("/admin/analytics/overview", range);
    const { data: userTs, isLoading: userTsLoading } = useAdminFetch<TimeseriesData>("/admin/analytics/users/timeseries", range);
    const { data: engTs, isLoading: engTsLoading } = useAdminFetch<EngagementTimeseriesData>("/admin/analytics/engagement/timeseries", range);
    const { data: sources } = useAdminFetch<MarketingSourceData>("/admin/analytics/users/marketing-sources", range);
    const { data: powerUsers } = useAdminFetch<PowerUsersData>("/admin/analytics/engagement/power-users", range);

    const granularity = userTs?.granularity || "day";

    const userChartData = (userTs?.data || []).map((d) => ({
        date: formatXAxisDate(d.date, granularity),
        count: d.count,
    }));

    const engChartData = (engTs?.data || []).map((d) => ({
        date: formatXAxisDate(d.date, engTs?.granularity || "day"),
        messages: d.messages,
        conversations: d.conversations,
    }));

    const sourceChartData = (sources?.data || [])
        .slice(0, 5)
        .map((s) => ({ name: s.source, value: s.count }));

    const topUsers = (powerUsers?.users || []).slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Page Title */}
            <div>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground text-sm mt-1">Your platform's health at a glance</p>
            </div>

            {/* Row 1: Primary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={overviewLoading ? "—" : (overview?.totalUsers ?? 0)}
                    subtitle={overviewLoading ? "" : `+${overview?.newUsersInPeriod ?? 0} this period`}
                    icon={<Users className="h-6 w-6" />}
                    iconBg="bg-blue-500/10"
                    iconColor="text-blue-500"
                    trend={overview ? { value: overview.userGrowthRate, isPositive: overview.userGrowthRate >= 0 } : undefined}
                />
                <StatCard
                    title="Active Users"
                    value={overviewLoading ? "—" : (overview?.mau ?? 0)}
                    subtitle={overviewLoading ? "" : `DAU: ${overview?.dau ?? 0} · WAU: ${overview?.wau ?? 0}`}
                    icon={<Activity className="h-6 w-6" />}
                    iconBg="bg-green-500/10"
                    iconColor="text-green-500"
                />
                <StatCard
                    title="Total Messages"
                    value={overviewLoading ? "—" : (overview?.totalMessages ?? 0)}
                    subtitle={overviewLoading ? "" : `${overview?.totalConversations?.toLocaleString() ?? 0} conversations`}
                    icon={<MessageSquare className="h-6 w-6" />}
                    iconBg="bg-purple-500/10"
                    iconColor="text-purple-500"
                    trend={overview ? { value: overview.messageGrowthRate, isPositive: overview.messageGrowthRate >= 0 } : undefined}
                />
                <StatCard
                    title="Satisfaction Rate"
                    value={overviewLoading ? "—" : `${overview?.satisfactionRate ?? 0}%`}
                    subtitle={overviewLoading ? "" : `${overview?.totalLikes ?? 0} likes · ${overview?.totalDislikes ?? 0} dislikes`}
                    icon={<ThumbsUp className="h-6 w-6" />}
                    iconBg="bg-amber-500/10"
                    iconColor="text-amber-500"
                />
            </div>

            {/* Row 2: Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard
                    title="User Registrations"
                    subtitle="New signups over time"
                >
                    {userTsLoading ? (
                        <div className="h-64 flex items-center justify-center">
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        <AreaChartWrapper
                            data={userChartData}
                            series={[{ key: "count", label: "New Users", color: "chart-1" }]}
                            height={240}
                            emptyMessage="No registrations in this period"
                        />
                    )}
                </ChartCard>

                <ChartCard
                    title="Messages & Conversations"
                    subtitle="Activity over time"
                >
                    {engTsLoading ? (
                        <div className="h-64 flex items-center justify-center">
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        <AreaChartWrapper
                            data={engChartData}
                            series={[
                                { key: "messages", label: "Messages", color: "chart-1" },
                                { key: "conversations", label: "Conversations", color: "chart-2" },
                            ]}
                            height={240}
                            emptyMessage="No activity in this period"
                        />
                    )}
                </ChartCard>
            </div>

            {/* Row 3: Secondary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    title="Onboarding Rate"
                    value={overviewLoading ? "—" : `${overview?.onboardingRate ?? 0}%`}
                    subtitle="Users who completed setup"
                    icon={<CheckCircle className="h-6 w-6" />}
                    iconBg="bg-emerald-500/10"
                    iconColor="text-emerald-500"
                />
                <StatCard
                    title="Documents Generated"
                    value={overviewLoading ? "—" : (overview?.totalDocuments ?? 0)}
                    subtitle="Legal documents created"
                    icon={<FileText className="h-6 w-6" />}
                    iconBg="bg-orange-500/10"
                    iconColor="text-orange-500"
                />
                <StatCard
                    title="Contract Sessions"
                    value={overviewLoading ? "—" : (overview?.totalContractSessions ?? 0)}
                    subtitle="Contract builder sessions"
                    icon={<Zap className="h-6 w-6" />}
                    iconBg="bg-cyan-500/10"
                    iconColor="text-cyan-500"
                />
            </div>

            {/* Row 4: Marketing sources + Power Users */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ChartCard
                    title="Traffic Sources"
                    subtitle="Where your users come from"
                >
                    <PieChartWrapper
                        data={sourceChartData}
                        height={260}
                        emptyMessage="No source data available"
                        innerRadius={60}
                    />
                </ChartCard>

                <ChartCard title="Top 5 Power Users" subtitle="Most active users on the platform">
                    {topUsers.length === 0 ? (
                        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
                            No user activity yet
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {topUsers.map((u, i) => (
                                <div key={u.id} className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-muted-foreground w-5 text-right">{i + 1}</span>
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                                        {u.name?.[0] || u.email[0].toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{u.name || u.email}</p>
                                        <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold">{u.messageCount.toLocaleString()}</p>
                                        <p className="text-xs text-muted-foreground">messages</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ChartCard>
            </div>

            {/* Row 5: File uploads stat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title="File Uploads"
                    value={overviewLoading ? "—" : (overview?.totalFileUploads ?? 0)}
                    subtitle="Documents uploaded by users"
                    icon={<Upload className="h-6 w-6" />}
                    iconBg="bg-violet-500/10"
                    iconColor="text-violet-500"
                />
                <StatCard
                    title="Conversations Growth"
                    value={overviewLoading ? "—" : (overview?.totalConversations ?? 0)}
                    subtitle={overviewLoading ? "" : `${overview?.conversationGrowthRate?.toFixed(1) ?? 0}% vs previous period`}
                    icon={<TrendingUp className="h-6 w-6" />}
                    iconBg="bg-pink-500/10"
                    iconColor="text-pink-500"
                    trend={overview ? { value: overview.conversationGrowthRate, isPositive: overview.conversationGrowthRate >= 0 } : undefined}
                />
            </div>
        </div>
    );
}

function OverviewPageInner() {
    const searchParams = useSearchParams();
    const range = searchParams.get("range") || "30d";
    return <OverviewContent range={range} />;
}

export default function OverviewPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <OverviewPageInner />
        </Suspense>
    );
}
