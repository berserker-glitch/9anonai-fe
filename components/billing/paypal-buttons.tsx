"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { Loader2, ShieldCheck } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

// Load the PayPal JS SDK exactly once across the whole app.
let sdkPromise: Promise<void> | null = null;
function loadPaypalSdk(): Promise<void> {
    if (typeof window === "undefined") return Promise.resolve();
    if ((window as any).paypal) return Promise.resolve();
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&currency=USD&intent=capture`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => { sdkPromise = null; reject(new Error("Failed to load PayPal SDK")); };
        document.body.appendChild(script);
    });
    return sdkPromise;
}

const TX: Record<string, Record<string, string>> = {
    loading:    { ar: "جارٍ تحميل الدفع الآمن…", fr: "Chargement du paiement sécurisé…", en: "Loading secure checkout…" },
    processing: { ar: "جارٍ تأكيد الدفع…",       fr: "Confirmation du paiement…",        en: "Confirming your payment…" },
    secured:    { ar: "دفع آمن عبر PayPal — لا نخزّن بيانات بطاقتك", fr: "Paiement sécurisé via PayPal — nous ne stockons aucune carte", en: "Secured by PayPal — we never store your card" },
    notConfigured: { ar: "الدفع غير متاح حالياً.", fr: "Paiement indisponible pour le moment.", en: "Payments are temporarily unavailable." },
    failed:     { ar: "تعذّر إتمام الدفع. حاول مرة أخرى.", fr: "Le paiement a échoué. Réessayez.", en: "Payment could not be completed. Please try again." },
};

interface Props {
    /** Called after a successful capture (user is now Pro). */
    onSuccess?: () => void;
}

/**
 * Renders PayPal smart buttons that create + capture a one-month Pro order via
 * our backend. On approval the backend extends `proExpiresAt` by one month.
 */
export function PaypalButtons({ onSuccess }: Props) {
    const { token, refetchUser } = useAuth();
    const { language: lang } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<"loading" | "ready" | "processing" | "error">("loading");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const tx = (k: string) => TX[k]?.[lang] ?? TX[k]?.en ?? k;

    useEffect(() => {
        let cancelled = false;

        if (!PAYPAL_CLIENT_ID) {
            setStatus("error");
            setErrorMsg(tx("notConfigured"));
            return;
        }

        loadPaypalSdk()
            .then(() => {
                if (cancelled || !containerRef.current) return;
                const paypal = (window as any).paypal;
                if (!paypal?.Buttons) { setStatus("error"); return; }

                containerRef.current.innerHTML = "";
                paypal.Buttons({
                    style: { layout: "vertical", color: "black", shape: "pill", label: "pay", height: 48 },
                    createOrder: async () => {
                        setErrorMsg(null);
                        const res = await fetch(`${API_URL}/billing/create-order`, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        const data = await res.json();
                        if (!res.ok || !data.orderId) throw new Error(data.error || "create-order failed");
                        return data.orderId;
                    },
                    onApprove: async (data: { orderID: string }) => {
                        setStatus("processing");
                        try {
                            const res = await fetch(`${API_URL}/billing/capture-order`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                                body: JSON.stringify({ orderId: data.orderID }),
                            });
                            const body = await res.json();
                            if (!res.ok) {
                                setStatus("ready");
                                setErrorMsg(body.error || tx("failed"));
                                return;
                            }
                            await refetchUser();
                            setStatus("ready");
                            onSuccess?.();
                        } catch {
                            setStatus("ready");
                            setErrorMsg(tx("failed"));
                        }
                    },
                    onError: () => {
                        setStatus("ready");
                        setErrorMsg(tx("failed"));
                    },
                }).render(containerRef.current);

                setStatus("ready");
            })
            .catch(() => { if (!cancelled) setStatus("error"); });

        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, lang]);

    return (
        <div className="w-full">
            {(status === "loading" || status === "processing") && (
                <div className="flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {tx(status === "processing" ? "processing" : "loading")}
                </div>
            )}

            {status === "error" && (
                <p className="text-sm text-destructive text-center py-3">{errorMsg || tx("notConfigured")}</p>
            )}

            {/* PayPal renders its iframe buttons here */}
            <div ref={containerRef} className={status === "processing" ? "opacity-50 pointer-events-none" : ""} />

            {errorMsg && status !== "error" && (
                <p className="text-sm text-destructive text-center mt-2">{errorMsg}</p>
            )}

            {status === "ready" && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    {tx("secured")}
                </p>
            )}
        </div>
    );
}
