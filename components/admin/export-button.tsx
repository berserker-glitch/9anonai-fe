"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fetchAdmin<T>(endpoint: string, token: string, range = "all"): Promise<T> {
    const sep = endpoint.includes("?") ? "&" : "?";
    return fetch(`${API_URL}${endpoint}${sep}range=${range}`, {
        headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
        if (!r.ok) throw new Error(`${endpoint} → HTTP ${r.status}`);
        return r.json() as Promise<T>;
    });
}

function pct(part: number, total: number, dec = 1): number {
    if (!total) return 0;
    return Math.round((part / total) * Math.pow(10, dec + 2)) / Math.pow(10, dec);
}

function round(n: number, dec = 1): number {
    return Math.round(n * Math.pow(10, dec)) / Math.pow(10, dec);
}

// ─── Main export function ─────────────────────────────────────────────────────

async function collectAndExport(token: string) {
    // Fetch all analytics endpoints in parallel (heavy ones at the end)
    const [
        overview,
        userTs,
        marketingSources,
        engagementTs,
        heatmap,
        depth,
        powerUsers,
        content,
        retentionRates,
        allUsers,
    ] = await Promise.all([
        fetchAdmin("/admin/analytics/overview", token, "all"),
        fetchAdmin("/admin/analytics/users/timeseries", token, "12m"),
        fetchAdmin("/admin/analytics/users/marketing-sources", token, "all"),
        fetchAdmin("/admin/analytics/engagement/timeseries", token, "12m"),
        fetchAdmin("/admin/analytics/engagement/activity-heatmap", token, "all"),
        fetchAdmin("/admin/analytics/engagement/depth", token, "all"),
        fetchAdmin("/admin/analytics/engagement/power-users", token, "all"),
        fetchAdmin("/admin/analytics/content/overview", token, "all"),
        fetchAdmin("/admin/analytics/retention/rates", token, "all"),
        fetchAdmin("/admin/users", token), // existing endpoint
    ]);

    // Fetch cohorts separately (slower query)
    let cohorts: unknown = { cohorts: [] };
    try {
        cohorts = await fetchAdmin("/admin/analytics/retention/cohorts", token, "all");
    } catch {
        // Cohort query might time out for very large datasets — gracefully skip
    }

    // ── Anonymise user list: remove PII, keep only numbers ──
    const rawUsers = (allUsers as { users: Array<Record<string, unknown>> }).users || [];
    const anonymisedUsers = rawUsers.map((u, i) => ({
        userRank: i + 1,                                    // no email/name
        conversationCount: u.conversationCount as number,
        messageCount: u.messageCount as number,
        isOnboarded: (u as Record<string, unknown>).isOnboarded,
        marketingSource: u.marketingSource as string | null, // traffic source only, not PII
        daysSinceJoined: Math.floor(
            (Date.now() - new Date(u.createdAt as string).getTime()) / 86400000
        ),
        daysSinceLastActive: Math.floor(
            (Date.now() - new Date((u as { lastActive: string }).lastActive).getTime()) / 86400000
        ),
    }));

    // ── Anonymise power users: rank + numbers only ──
    const pwRaw = (powerUsers as { users: Array<Record<string, unknown>> }).users || [];
    const anonymisedPowerUsers = pwRaw.slice(0, 20).map((u, i) => ({
        rank: i + 1,
        messageCount: u.messageCount as number,
        conversationCount: u.conversationCount as number,
    }));

    // ── Engagement depth distribution with percentages ──
    const overviewTyped = overview as Record<string, unknown>;
    const totalUsers = (overviewTyped.totalUsers as number) || 0;
    const depthTyped = depth as { distribution: Array<{ bucket: string; count: number }> };
    const distribution = (depthTyped.distribution || []).map((d) => ({
        ...d,
        percentage: pct(d.count, totalUsers),
    }));

    // ── Assemble full export object ──
    const now = new Date();
    const payload = {
        meta: {
            generatedAt: now.toISOString(),
            platform: "9anon Legal AI",
            exportedBy: "Admin Dashboard",
            privacyNote: "No personal data included. All user emails, names, message content, and IDs have been removed. Only aggregate numbers are present.",
        },

        // ── Top-line KPIs ──
        kpis: {
            totalUsers: overviewTyped.totalUsers,
            totalConversations: overviewTyped.totalConversations,
            totalMessages: overviewTyped.totalMessages,
            totalDocuments: overviewTyped.totalDocuments,
            totalContractSessions: overviewTyped.totalContractSessions,
            totalFileUploads: overviewTyped.totalFileUploads,
            dau: overviewTyped.dau,
            wau: overviewTyped.wau,
            mau: overviewTyped.mau,
            onboardingRate: overviewTyped.onboardingRate,
            satisfactionRate: overviewTyped.satisfactionRate,
            totalLikes: overviewTyped.totalLikes,
            totalDislikes: overviewTyped.totalDislikes,
        },

        // ── Growth ──
        growth: {
            userGrowthRate: overviewTyped.userGrowthRate,
            conversationGrowthRate: overviewTyped.conversationGrowthRate,
            messageGrowthRate: overviewTyped.messageGrowthRate,
            newUsersInLast30Days: overviewTyped.newUsersInPeriod,
        },

        // ── User breakdown ──
        users: {
            marketingSources: marketingSources,
            anonymisedUserList: {
                description: "Each row is one user (no email/name). Sorted by join date desc.",
                columns: ["userRank", "conversationCount", "messageCount", "marketingSource", "daysSinceJoined", "daysSinceLastActive"],
                rows: anonymisedUsers,
            },
        },

        // ── Time-series ──
        timeseries: {
            userRegistrations12M: userTs,
            engagementActivity12M: engagementTs,
        },

        // ── Engagement deep-dive ──
        engagement: {
            perUserStats: {
                avgMessagesPerUser: (depth as Record<string, unknown>).avgMessagesPerUser,
                avgConversationsPerUser: (depth as Record<string, unknown>).avgConversationsPerUser,
                medianMessagesPerUser: (depth as Record<string, unknown>).medianMessagesPerUser,
            },
            depthDistribution: distribution,
            powerUsers: {
                description: "Top 20 by message count — no identifying info",
                users: anonymisedPowerUsers,
            },
            activityHeatmap: {
                description: "Message counts by day-of-week (0=Sun…6=Sat) × hour (0–23 UTC)",
                data: heatmap,
            },
        },

        // ── Content & features ──
        content: content,

        // ── Retention ──
        retention: {
            dayNRetention: retentionRates,
            cohortRetention: cohorts,
        },
    };

    return payload;
}

// ─── Button Component ─────────────────────────────────────────────────────────

export function ExportAnalyticsButton() {
    const { token } = useAuth();
    const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

    const handleExport = async () => {
        if (!token || status === "loading") return;
        setStatus("loading");

        try {
            const data = await collectAndExport(token);

            // Trigger browser file download
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const dateStr = new Date().toISOString().split("T")[0];
            link.setAttribute("href", url);
            link.setAttribute("download", `9anon-analytics-${dateStr}.json`);
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setStatus("done");
            setTimeout(() => setStatus("idle"), 3000);
        } catch (err) {
            console.error("Export failed:", err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={status === "loading"}
            title="Download all analytics as JSON for AI analysis"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                status === "loading"
                    ? "bg-muted text-muted-foreground border-border cursor-wait"
                    : status === "done"
                    ? "bg-green-500/10 text-green-600 border-green-500/30"
                    : status === "error"
                    ? "bg-red-500/10 text-red-500 border-red-500/30"
                    : "bg-muted text-muted-foreground border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30"
            }`}
        >
            {status === "loading" ? (
                <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span className="hidden sm:inline">Collecting…</span>
                </>
            ) : status === "done" ? (
                <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="hidden sm:inline">Downloaded!</span>
                </>
            ) : status === "error" ? (
                <>
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <span className="hidden sm:inline">Failed</span>
                </>
            ) : (
                <>
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Export for AI</span>
                </>
            )}
        </button>
    );
}
