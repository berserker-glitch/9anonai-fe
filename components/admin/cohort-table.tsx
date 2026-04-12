"use client";

interface CohortRetention {
    monthOffset: number;
    activeUsers: number;
    retentionRate: number;
}

interface CohortData {
    cohortMonth: string;
    totalUsers: number;
    retention: CohortRetention[];
}

interface CohortTableProps {
    cohorts: CohortData[];
    emptyMessage?: string;
}

function formatCohortMonth(yearMonth: string) {
    const [year, month] = yearMonth.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function getCellColor(rate: number): string {
    if (rate === 0) return "transparent";
    if (rate >= 80) return "oklch(0.55 0.14 160 / 0.85)";
    if (rate >= 60) return "oklch(0.55 0.14 160 / 0.65)";
    if (rate >= 40) return "oklch(0.55 0.14 160 / 0.45)";
    if (rate >= 20) return "oklch(0.55 0.14 160 / 0.25)";
    return "oklch(0.55 0.14 160 / 0.12)";
}

function getCellTextColor(rate: number): string {
    return rate >= 50 ? "white" : "var(--foreground)";
}

export function CohortTable({ cohorts, emptyMessage = "No cohort data available" }: CohortTableProps) {
    if (!cohorts || cohorts.length === 0) {
        return (
            <div className="flex items-center justify-center text-muted-foreground text-sm py-16">
                {emptyMessage}
            </div>
        );
    }

    // Find the max number of columns (month offsets)
    const maxOffset = Math.max(...cohorts.map((c) => c.retention.length - 1), 0);
    const offsets = Array.from({ length: maxOffset + 1 }, (_, i) => i);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border">
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Cohort</th>
                        <th className="text-right px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Users</th>
                        {offsets.map((offset) => (
                            <th key={offset} className="text-center px-2 py-3 font-medium text-muted-foreground whitespace-nowrap min-w-[56px]">
                                {offset === 0 ? "Month 0" : `+${offset}m`}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {cohorts.map((cohort) => (
                        <tr key={cohort.cohortMonth} className="hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                                {formatCohortMonth(cohort.cohortMonth)}
                            </td>
                            <td className="px-4 py-2.5 text-right text-muted-foreground whitespace-nowrap">
                                {cohort.totalUsers.toLocaleString()}
                            </td>
                            {offsets.map((offset) => {
                                const entry = cohort.retention.find((r) => r.monthOffset === offset);
                                if (!entry) {
                                    return (
                                        <td key={offset} className="px-2 py-2.5 text-center">
                                            <span className="text-muted-foreground/40 text-xs">—</span>
                                        </td>
                                    );
                                }
                                const rate = entry.retentionRate;
                                return (
                                    <td key={offset} className="px-2 py-2.5 text-center">
                                        <div
                                            className="mx-auto rounded-md px-1 py-0.5 text-xs font-semibold tabular-nums"
                                            style={{
                                                backgroundColor: getCellColor(rate),
                                                color: getCellTextColor(rate),
                                                minWidth: 44,
                                            }}
                                            title={`${entry.activeUsers} active users`}
                                        >
                                            {rate.toFixed(0)}%
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-4 px-4 pb-2">
                <span className="text-xs text-muted-foreground">Retention rate:</span>
                {[
                    { label: "0-19%", bg: "oklch(0.55 0.14 160 / 0.12)" },
                    { label: "20-39%", bg: "oklch(0.55 0.14 160 / 0.25)" },
                    { label: "40-59%", bg: "oklch(0.55 0.14 160 / 0.45)" },
                    { label: "60-79%", bg: "oklch(0.55 0.14 160 / 0.65)" },
                    { label: "80%+", bg: "oklch(0.55 0.14 160 / 0.85)" },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.bg }} />
                        <span className="text-[10px] text-muted-foreground">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
