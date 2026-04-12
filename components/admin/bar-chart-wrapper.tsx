"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
} from "recharts";

interface BarChartWrapperProps {
    data: Record<string, string | number>[];
    xKey?: string;
    bars: Array<{ key: string; label?: string; color?: string }>;
    height?: number;
    layout?: "horizontal" | "vertical";
    formatXAxis?: (value: string) => string;
    formatYAxis?: (value: string) => string;
    emptyMessage?: string;
    showLegend?: boolean;
}

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

export function BarChartWrapper({
    data,
    xKey = "name",
    bars,
    height = 280,
    layout = "horizontal",
    formatXAxis,
    formatYAxis,
    emptyMessage = "No data for this period",
    showLegend = false,
}: BarChartWrapperProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center text-muted-foreground text-sm" style={{ height }}>
                {emptyMessage}
            </div>
        );
    }

    if (layout === "vertical") {
        return (
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                    <XAxis
                        type="number"
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={formatXAxis}
                    />
                    <YAxis
                        type="category"
                        dataKey={xKey}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        tickLine={false}
                        axisLine={false}
                        width={110}
                        tickFormatter={formatYAxis}
                    />
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                    {bars.map((bar, i) => (
                        <Bar
                            key={bar.key}
                            dataKey={bar.key}
                            name={bar.label || bar.key}
                            fill={bar.color || FILL_COLORS[i % FILL_COLORS.length]}
                            radius={[0, 4, 4, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
                    tickFormatter={formatYAxis}
                />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                {showLegend && <Legend wrapperStyle={{ fontSize: 12, paddingTop: 16 }} />}
                {bars.map((bar, i) => (
                    <Bar
                        key={bar.key}
                        dataKey={bar.key}
                        name={bar.label || bar.key}
                        fill={bar.color || FILL_COLORS[i % FILL_COLORS.length]}
                        radius={[4, 4, 0, 0]}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}
