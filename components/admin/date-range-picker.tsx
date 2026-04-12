"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const RANGES = [
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
    { label: "12M", value: "12m" },
    { label: "All", value: "all" },
];

interface DateRangePickerProps {
    value: string;
}

export function DateRangePicker({ value }: DateRangePickerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = useCallback(
        (range: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("range", range);
            router.replace(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams]
    );

    return (
        <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
            {RANGES.map((r) => (
                <button
                    key={r.value}
                    onClick={() => handleChange(r.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        value === r.value
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
}
