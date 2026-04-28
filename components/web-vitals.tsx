"use client";

import { useReportWebVitals } from "next/dist/client/web-vitals";


/**
 * Reports Core Web Vitals (LCP, INP, CLS, FCP, TTFB) to GA4.
 * Mount once in the root layout — fires on client only.
 */
export function WebVitals() {
    useReportWebVitals((metric) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (typeof (window as any).gtag !== "function") return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", metric.name, {
            event_category: "Web Vitals",
            value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
            event_label: metric.id,
            non_interaction: true,
        });
    });

    return null;
}
