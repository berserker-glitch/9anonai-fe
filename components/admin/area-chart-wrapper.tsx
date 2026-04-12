"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface SeriesConfig {
    key: string;
    label: string;
    color: string;
}

interface AreaChartWrapperProps {
    data: Record<string, string | number>[];
    series: SeriesConfig[];
    xKey?: string;
    height?: number;
    formatXAxis?: (value: string) => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatTooltip?: (value: any, name: any) => [string, string];
    emptyMessage?: string;
}

// Use oklch colors matching the app theme (chart-1 through chart-5 from globals.css)
const FILL_COLORS = [
    "oklch(0.55 0.14 160)",
    "oklch(0.62 0.12 140)",
    "oklch(0.72 0.14 85)",
    "oklch(0.58 0.10 200)",
    "oklch(0.50 0.12 280)",
];

const TOOLTIP_STYLE = {
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    color: "var(--foreground)",
    fontSize: "13px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
};

export function AreaChartWrapper({
    data,
    series,
    xKey = "date",
    height = 280,
    formatXAxis,
    formatTooltip,
    emptyMessage = "No data for this period",
}: AreaChartWrapperProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center text-muted-foreground text-sm" style={{ height }}>
                {emptyMessage}
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    {series.map((s, i) => (
                        <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={FILL_COLORS[i % FILL_COLORS.length]} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={FILL_COLORS[i % FILL_COLORS.length]} stopOpacity={0} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                    dataKey={xKey}
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatXAxis}
                />
                <YAxis
                    tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                />
                <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={formatTooltip}
                    labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                {series.length > 1 && (
                    <Legend
                        wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
                        formatter={(value) => series.find(s => s.key === value)?.label || value}
                    />
                )}
                {series.map((s, i) => (
                    <Area
                        key={s.key}
                        type="monotone"
                        dataKey={s.key}
                        name={s.key}
                        stroke={FILL_COLORS[i % FILL_COLORS.length]}
                        strokeWidth={2}
                        fill={`url(#gradient-${s.key})`}
                        dot={false}
                        activeDot={{ r: 5 }}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}
