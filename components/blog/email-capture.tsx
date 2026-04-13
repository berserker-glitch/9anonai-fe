"use client";

import { useState } from "react";

interface EmailCaptureProps {
    lang: string;
}

const CONTENT = {
    ar: {
        title: "احصل على أهم الأخبار القانونية أسبوعياً 📬",
        subtitle: "تحديثات حصرية حول القانون المغربي، حقوق المواطنين، والقرارات القضائية الجديدة — مباشرة إلى بريدك.",
        placeholder: "بريدك الإلكتروني",
        button: "اشترك مجاناً",
        success: "✅ تم الاشتراك! ستصلك النشرة الأسبوعية.",
        error: "حدث خطأ. حاول مرة أخرى.",
    },
    fr: {
        title: "Recevez les actualités juridiques chaque semaine 📬",
        subtitle: "Mises à jour exclusives sur le droit marocain, les droits des citoyens et les nouvelles décisions de justice — directement dans votre boîte mail.",
        placeholder: "Votre adresse email",
        button: "S'abonner gratuitement",
        success: "✅ Abonnement confirmé ! Vous recevrez la newsletter chaque semaine.",
        error: "Une erreur est survenue. Réessayez.",
    },
    en: {
        title: "Get weekly Moroccan legal updates 📬",
        subtitle: "Exclusive insights on Moroccan law, citizen rights, and new court decisions — delivered straight to your inbox.",
        placeholder: "Your email address",
        button: "Subscribe free",
        success: "✅ Subscribed! You'll receive the weekly newsletter.",
        error: "Something went wrong. Please try again.",
    },
};

export function EmailCapture({ lang }: EmailCaptureProps) {
    const l = (lang === "fr" || lang === "en") ? lang : "ar";
    const c = CONTENT[l];
    const isRtl = l === "ar";

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || status === "loading") return;
        setStatus("loading");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), lang: l, source: "blog_inline" }),
            });
            if (res.ok || res.status === 409) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div dir={isRtl ? "rtl" : "ltr"} className="my-10 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center">
                <p className="text-emerald-700 dark:text-emerald-300 font-semibold text-base">{c.success}</p>
            </div>
        );
    }

    return (
        <div dir={isRtl ? "rtl" : "ltr"} className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-emerald-500/5 border border-primary/20 not-prose">
            <div className="max-w-xl mx-auto text-center space-y-4">
                <h3 className="text-xl font-bold text-foreground">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.subtitle}</p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-2">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={c.placeholder}
                        disabled={status === "loading"}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!email.trim() || status === "loading"}
                        className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-40 shrink-0"
                    >
                        {status === "loading" ? "..." : c.button}
                    </button>
                </form>
                {status === "error" && (
                    <p className="text-xs text-red-500">{c.error}</p>
                )}
                <p className="text-xs text-muted-foreground/60">
                    {isRtl ? "لا سبام. إلغاء الاشتراك في أي وقت." : l === "fr" ? "Aucun spam. Désabonnement à tout moment." : "No spam. Unsubscribe anytime."}
                </p>
            </div>
        </div>
    );
}
