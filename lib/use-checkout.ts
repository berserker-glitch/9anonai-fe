"use client";

import { useState } from "react";
import { useAuth } from "./auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function useCheckout() {
    const { token } = useAuth();
    const [loading, setLoading] = useState<string | null>(null);

    const openCheckout = async (plan: "basic" | "pro") => {
        if (!token) {
            window.location.href = "/login?redirect=/pricing";
            return;
        }

        setLoading(plan);
        try {
            const res = await fetch(`${API_URL}/billing/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ plan }),
            });

            if (!res.ok) throw new Error("Checkout failed");

            const { checkout_url } = await res.json();
            if (checkout_url) {
                window.location.href = checkout_url;
            }
        } catch {
            setLoading(null);
        }
    };

    return { openCheckout, loading };
}
