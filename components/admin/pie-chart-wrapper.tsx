"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PieChartWrapperProps {
    data: Array<{ name: string; value: number }>;
    height?: number;
    emptyMessage?: string;
    showLegend?: boolean;
    innerRadius?: number;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    if (!percent || percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = (innerRadius ?? 0) + ((outerRadius ?? 0) - (innerRadius ?? 0)) * 0.5;
    const x = (cx ?? 0) + radius * Math.cos(-((midAngle ?? 0) * RADIAN));
    const y = (cy ?? 0) + radius * Math.sin(-((midAngle ?? 0) * RADIAN));
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export function PieChartWrapper({
    data,
    height = 280,
    emptyMessage = "No data for this period",
    showLegend = true,
    innerRadius = 0,
}: PieChartWrapperProps) {
    if (!data || data.length === 0 || data.every((d) => d.value === 0)) {
        return (
            <div className="flex items-center justify-center text-muted-foreground text-sm" style={{ height }}>
                {emptyMessage}
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={innerRadius ? "65%" : "70%"}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    label={innerRadius === 0 ? renderCustomLabel : undefined}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={FILL_COLORS[index % FILL_COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    formatter={(value: any, name: any) => [(Number(value)).toLocaleString(), name]}
                />
                {showLegend && (
                    <Legend
                        wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                        formatter={(value) => <span style={{ color: "var(--foreground)" }}>{value}</span>}
                    />
                )}
            </PieChart>
        </ResponsiveContainer>
    );
}
