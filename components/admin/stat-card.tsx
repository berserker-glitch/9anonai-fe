"use client";

import { ReactNode } from "react";

interface TrendInfo {
    value: number;
    isPositive: boolean;
}

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: ReactNode;
    trend?: TrendInfo;
    iconBg?: string;
    iconColor?: string;
}

export function StatCard({
    title,
    value,
    subtitle,
    icon,
    trend,
    iconBg = "bg-primary/10",
    iconColor = "text-primary",
}: StatCardProps) {
    return (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                        <span className={iconColor}>{icon}</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm text-muted-foreground truncate">{title}</p>
                        <p className="text-2xl font-bold mt-0.5 truncate">
                            {typeof value === "number" ? value.toLocaleString() : value}
                        </p>
                        {subtitle && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>
                        )}
                    </div>
                </div>
                {trend !== undefined && (
                    <div
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
                            trend.isPositive
                                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                    >
                        <span>{trend.isPositive ? "↑" : "↓"}</span>
                        <span>{Math.abs(trend.value).toFixed(1)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
}
