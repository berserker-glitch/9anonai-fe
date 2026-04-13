/**
 * Google Analytics 4 utility for 9anon AI.
 * Wraps gtag() with a safe check so it never throws in SSR or when GA is blocked.
 *
 * Usage:
 *   import { trackEvent } from "@/lib/analytics";
 *   trackEvent("first_message_sent", { language: "ar" });
 */

export const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

/**
 * Track a custom GA4 event.
 * @param eventName  - Snake-case GA4 event name (e.g. "sign_up")
 * @param params     - Optional event parameters
 */
export function trackEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>
): void {
    if (typeof window === "undefined") return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", eventName, params);
}

/**
 * Track a page view (useful for SPA navigations).
 */
export function trackPageView(url: string): void {
    if (!GA_MEASUREMENT_ID) return;
    trackEvent("page_view", { page_location: url });
}
