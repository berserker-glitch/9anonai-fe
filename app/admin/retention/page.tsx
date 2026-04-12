"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { UserCheck, Clock, Calendar, TrendingDown, Info } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { ChartCard } from "@/components/admin/chart-card";
import { CohortTable } from "@/components/admin/cohort-table";
import { useAdminFetch } from "@/components/admin/use-admin-fetch";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RetentionRates {
    day1: { eligible: number; retained: number; rate: number };
    day7: { eligible: number; retained: number; rate: number };
    day30: { eligible: number; retained: number; rate: number };
    churnRate: number;
}

interface CohortData {
    cohorts: Array<{
        cohortMonth: string;
        totalUsers: number;
        retention: Array<{
            monthOffset: number;
            activeUsers: number;
            retentionRate: number;
        }>;
    }>;
}

// ─── Retention Page ───────────────────────────────────────────────────────────

function RetentionContent() {
    const { data: rates, isLoading: ratesLoading } = useAdminFetch<RetentionRates>("/admin/analytics/retention/rates", "all");
    const { data: cohorts, isLoading: cohortsLoading } = useAdminFetch<CohortData>("/admin/analytics/retention/cohorts", "all");

    const getRateColor = (rate: number) => {
        if (rate >= 50) return "text-emerald-600 dark:text-emerald-400";
        if (rate >= 25) return "text-amber-600 dark:text-amber-400";
        return "text-red-600 dark:text-red-400";
    };

    const getRateLabel = (rate: number) => {
        if (rate >= 50) return "Excellent";
        if (rate >= 30) return "Good";
        if (rate >= 15) return "Average";
        return "Needs work";
    };

    return (
        <div className="space-y-6">
            {/* Title */}
            <div>
                <h2 className="text-2xl font-bold">Retention & Cohorts</h2>
                <p className="text-muted-foreground text-sm mt-1">How well you keep users coming back over time</p>
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                    <strong className="text-foreground">How retention is calculated:</strong> Day-N retention measures the percentage
                    of users who signed up at least N days ago and then sent at least one more message after their Nth day.
                    The cohort table shows monthly groupings.
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Day-1 Retention</p>
                            <p className={`text-2xl font-bold ${ratesLoading ? "text-muted-foreground" : getRateColor(rates?.day1.rate ?? 0)}`}>
                                {ratesLoading ? "—" : `${rates?.day1.rate ?? 0}%`}
                            </p>
                        </div>
                    </div>
                    {!ratesLoading && rates && (
                        <div className="space-y-1.5">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(rates.day1.rate, 100)}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{rates.day1.retained} retained</span>
                                <span>{rates.day1.eligible} eligible</span>
                            </div>
                            <p className={`text-xs font-medium ${getRateColor(rates.day1.rate)}`}>{getRateLabel(rates.day1.rate)}</p>
                        </div>
                    )}
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Day-7 Retention</p>
                            <p className={`text-2xl font-bold ${ratesLoading ? "text-muted-foreground" : getRateColor(rates?.day7.rate ?? 0)}`}>
                                {ratesLoading ? "—" : `${rates?.day7.rate ?? 0}%`}
                            </p>
                        </div>
                    </div>
                    {!ratesLoading && rates && (
                        <div className="space-y-1.5">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(rates.day7.rate, 100)}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{rates.day7.retained} retained</span>
                                <span>{rates.day7.eligible} eligible</span>
                            </div>
                            <p className={`text-xs font-medium ${getRateColor(rates.day7.rate)}`}>{getRateLabel(rates.day7.rate)}</p>
                        </div>
                    )}
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <UserCheck className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Day-30 Retention</p>
                            <p className={`text-2xl font-bold ${ratesLoading ? "text-muted-foreground" : getRateColor(rates?.day30.rate ?? 0)}`}>
                                {ratesLoading ? "—" : `${rates?.day30.rate ?? 0}%`}
                            </p>
                        </div>
                    </div>
                    {!ratesLoading && rates && (
                        <div className="space-y-1.5">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(rates.day30.rate, 100)}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{rates.day30.retained} retained</span>
                                <span>{rates.day30.eligible} eligible</span>
                            </div>
                            <p className={`text-xs font-medium ${getRateColor(rates.day30.rate)}`}>{getRateLabel(rates.day30.rate)}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Churn Rate Card */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                        <TrendingDown className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h3 className="font-semibold text-lg">Monthly Churn Rate</h3>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Users active 30–60 days ago who did not return in the last 30 days
                                </p>
                            </div>
                            <div className="text-right">
                                <p className={`text-4xl font-bold ${ratesLoading ? "text-muted-foreground" : rates && rates.churnRate > 50 ? "text-red-500" : rates && rates.churnRate > 25 ? "text-amber-500" : "text-emerald-500"}`}>
                                    {ratesLoading ? "—" : `${rates?.churnRate ?? 0}%`}
                                </p>
                                {!ratesLoading && rates && (
                                    <p className="text-sm text-muted-foreground mt-0.5">
                                        {rates.churnRate > 50 ? "High churn — investigate" : rates.churnRate > 25 ? "Moderate churn" : "Healthy retention"}
                                    </p>
                                )}
                            </div>
                        </div>
                        {!ratesLoading && rates && (
                            <div className="mt-4 h-2.5 bg-muted rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${rates.churnRate > 50 ? "bg-red-500" : rates.churnRate > 25 ? "bg-amber-500" : "bg-emerald-500"}`}
                                    style={{ width: `${Math.min(rates.churnRate, 100)}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cohort Table */}
            <ChartCard
                title="Cohort Retention Table"
                subtitle="Each row is a signup cohort. Each column shows the % of that cohort still active N months later."
            >
                {cohortsLoading ? (
                    <div className="h-48 flex items-center justify-center">
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <CohortTable cohorts={cohorts?.cohorts || []} />
                )}
            </ChartCard>

            {/* Benchmark Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: "Industry Avg Day-1", value: "25–40%", color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Industry Avg Day-7", value: "10–25%", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Industry Avg Day-30", value: "5–15%", color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map((bench) => (
                    <div key={bench.label} className={`${bench.bg} border border-border/50 rounded-2xl p-5`}>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{bench.label}</p>
                        <p className={`text-2xl font-bold mt-1 ${bench.color}`}>{bench.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">SaaS benchmark reference</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RetentionPageInner() {
    // Retention always uses "all" data (ignores range for cohort/rates)
    return <RetentionContent />;
}

export default function RetentionPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <RetentionPageInner />
        </Suspense>
    );
}
