"use client";

import { useState, useEffect } from "react";

interface StickySubscribeBarProps {
    lang: string;
}

const CONTENT = {
    ar: {
        text: "احصل على تحديثات قانونية أسبوعية مجاناً",
        placeholder: "بريدك الإلكتروني",
        button: "اشترك",
        success: "✅ تم الاشتراك!",
    },
    fr: {
        text: "Recevez les actus juridiques chaque semaine",
        placeholder: "Votre email",
        button: "S'abonner",
        success: "✅ Abonné !",
    },
    en: {
        text: "Get free weekly Moroccan legal updates",
        placeholder: "Your email",
        button: "Subscribe",
        success: "✅ Subscribed!",
    },
};

const DISMISS_KEY = "9anon_newsletter_bar_dismissed";

export function StickySubscribeBar({ lang }: StickySubscribeBarProps) {
    const l = (lang === "fr" || lang === "en") ? lang : "ar";
    const c = CONTENT[l];
    const isRtl = l === "ar";

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        // Don't show if already dismissed
        if (typeof window !== "undefined" && localStorage.getItem(DISMISS_KEY)) return;

        const handleScroll = () => {
            const scrolled = window.scrollY + window.innerHeight;
            const total = document.body.scrollHeight;
            if (scrolled / total >= 0.6) {
                setVisible(true);
                window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleDismiss = () => {
        setVisible(false);
        if (typeof window !== "undefined") {
            localStorage.setItem(DISMISS_KEY, "1");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || status === "loading") return;
        setStatus("loading");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), lang: l, source: "blog_sticky" }),
            });
            if (res.ok || res.status === 409) {
                setStatus("success");
                setTimeout(() => {
                    handleDismiss();
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (!visible) return null;

    return (
        <div
            dir={isRtl ? "rtl" : "ltr"}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg animate-in slide-in-from-bottom duration-300"
        >
            <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
                <p className="text-sm font-medium text-foreground shrink-0 flex-1 text-center sm:text-start">
                    {status === "success" ? c.success : c.text}
                </p>
                {status !== "success" && (
                    <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={c.placeholder}
                            disabled={status === "loading"}
                            className="flex-1 sm:w-52 px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={!email.trim() || status === "loading"}
                            className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-40 shrink-0"
                        >
                            {status === "loading" ? "..." : c.button}
                        </button>
                    </form>
                )}
                <button
                    onClick={handleDismiss}
                    aria-label="Dismiss"
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
