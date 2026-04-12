"use client";

interface HeatmapData {
    dayOfWeek: number;
    hour: number;
    count: number;
}

interface HeatmapChartProps {
    data: HeatmapData[];
    emptyMessage?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function HeatmapChart({ data, emptyMessage = "No activity data" }: HeatmapChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center text-muted-foreground text-sm h-48">
                {emptyMessage}
            </div>
        );
    }

    // Build a lookup map
    const lookup: Record<string, number> = {};
    let maxCount = 0;
    for (const d of data) {
        const key = `${d.dayOfWeek}-${d.hour}`;
        lookup[key] = d.count;
        if (d.count > maxCount) maxCount = d.count;
    }

    const getOpacity = (day: number, hour: number) => {
        const count = lookup[`${day}-${hour}`] || 0;
        if (maxCount === 0) return 0;
        return count / maxCount;
    };

    const getCount = (day: number, hour: number) => lookup[`${day}-${hour}`] || 0;

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[500px]">
                {/* Hour labels */}
                <div className="flex mb-1 ml-10">
                    {HOURS.map((h) => (
                        <div
                            key={h}
                            className="flex-1 text-center text-[9px] text-muted-foreground"
                            style={{ minWidth: 18 }}
                        >
                            {h % 3 === 0 ? `${h}h` : ""}
                        </div>
                    ))}
                </div>

                {/* Grid */}
                {DAYS.map((day, dayIdx) => (
                    <div key={day} className="flex items-center gap-0 mb-1">
                        <div className="w-9 text-[10px] text-muted-foreground text-right pr-2 shrink-0">
                            {day}
                        </div>
                        {HOURS.map((hour) => {
                            const opacity = getOpacity(dayIdx, hour);
                            const count = getCount(dayIdx, hour);
                            return (
                                <div
                                    key={hour}
                                    className="flex-1 rounded-[3px] mx-[1px] cursor-default group relative"
                                    style={{
                                        minWidth: 16,
                                        height: 18,
                                        backgroundColor: `color-mix(in oklch, var(--color-chart-1) ${Math.round(opacity * 90 + 5)}%, transparent)`,
                                    }}
                                    title={`${day} ${hour}:00 — ${count} messages`}
                                >
                                    {/* Tooltip */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-50 pointer-events-none">
                                        <div className="bg-popover border border-border rounded-lg px-2 py-1 text-[10px] whitespace-nowrap shadow-lg text-foreground">
                                            {day} {hour}:00 · {count} msgs
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}

                {/* Legend */}
                <div className="flex items-center gap-2 mt-3 ml-10">
                    <span className="text-[10px] text-muted-foreground">Less</span>
                    {[0.05, 0.25, 0.5, 0.75, 1].map((op) => (
                        <div
                            key={op}
                            className="h-3.5 w-3.5 rounded-[3px]"
                            style={{
                                backgroundColor: `color-mix(in oklch, var(--color-chart-1) ${Math.round(op * 90 + 5)}%, transparent)`,
                            }}
                        />
                    ))}
                    <span className="text-[10px] text-muted-foreground">More</span>
                </div>
            </div>
        </div>
    );
}
