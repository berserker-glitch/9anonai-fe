"use client";

import { ReactNode } from "react";

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
    action?: ReactNode;
}

export function ChartCard({ title, subtitle, children, className = "", action }: ChartCardProps) {
    return (
        <div className={`bg-card border border-border rounded-2xl p-6 shadow-sm ${className}`}>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
            {children}
        </div>
    );
}
