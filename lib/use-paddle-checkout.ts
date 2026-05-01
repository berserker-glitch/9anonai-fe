"use client";

import { useState, useEffect } from "react";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { useAuth } from "./auth-context";

const PRICE_IDS: Record<string, string> = {
    basic: process.env.NEXT_PUBLIC_PADDLE_PRICE_BASIC || "",
    pro:   process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO   || "",
};

export function usePaddleCheckout() {
    const { user, token } = useAuth();
    const [paddle, setPaddle] = useState<Paddle | undefined>();
    const [loading, setLoading] = useState<string | null>(null);

    useEffect(() => {
        const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
        if (!clientToken) return;

        initializePaddle({
            environment: process.env.NEXT_PUBLIC_PADDLE_SANDBOX === "true" ? "sandbox" : "production",
            token: clientToken,
            eventCallback: (event: any) => {
                if (event.name === "checkout.completed") {
                    setLoading(null);
                    window.location.href = "/pricing?status=success";
                }
                if (event.name === "checkout.closed") {
                    setLoading(null);
                }
            },
        }).then(setPaddle);
    }, []);

    const openCheckout = (plan: "basic" | "pro") => {
        if (!token) {
            window.location.href = "/login?redirect=/pricing";
            return;
        }
        if (!user || !paddle) return;

        const priceId = PRICE_IDS[plan];
        if (!priceId) return;

        setLoading(plan);
        paddle.Checkout.open({
            items: [{ priceId, quantity: 1 }],
            customer: { email: user.email },
            customData: { userId: user.id, planName: plan } as any,
        });
    };

    return { openCheckout, loading };
}
