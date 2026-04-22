"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/language-context";
import { trackEvent } from "@/lib/analytics";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { register, loginWithGoogle, user } = useAuth();
    const { t } = useTranslation("auth");

    useEffect(() => {
        if (user) {
            if (user.role === "superadmin") router.push("/admin");
            else if (!user.isOnboarded) router.push("/setup");
            else router.push("/chat");
        }
    }, [user, router]);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            setError("");
            const result = await loginWithGoogle(tokenResponse.access_token);
            if (result.success) {
                trackEvent("sign_up", { method: "google" });
                router.push("/setup");
            } else {
                setError(result.error || "Google sign-in failed");
                setIsLoading(false);
            }
        },
        onError: () => setError("Google sign-in was cancelled or failed"),
        flow: "implicit",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        const result = await register(email, password, name);
        if (result.success) {
            trackEvent("sign_up", { method: "email" });
            router.push("/setup");
        } else {
            setError(result.error || "Registration failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-mesh-gradient" />
            <div className="absolute inset-0 bg-background/55" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-primary/8 blur-[130px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[440px] mx-auto px-5 py-12">

                {/* Logo */}
                <div className="animate-reveal-up text-center mb-7">
                    <Link href="/" className="inline-block">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-primary/20 mx-auto hover:scale-105 transition-transform duration-300">
                            <Image src="/9anon-logo.webp" alt="9anon AI" className="object-cover" fill priority sizes="64px" />
                        </div>
                    </Link>
                </div>

                {/* Heading */}
                <div className="animate-reveal-up delay-100 text-center mb-8">
                    <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tighter text-foreground leading-[1.1]">
                        {t("register.title")}
                    </h1>
                    <p className="mt-3 text-gradient-emerald font-display italic text-[17px] font-medium">
                        {t("register.subtitle")}
                    </p>
                </div>

                {/* Glass card */}
                <div className="animate-reveal-up delay-200 glass-premium rounded-3xl border border-border/50 p-7 shadow-xl">

                    {error && (
                        <div className="flex items-center gap-2.5 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm mb-5">
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Google — primary action */}
                    <button
                        type="button"
                        onClick={() => googleLogin()}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-border/70 bg-background/60 backdrop-blur-sm text-foreground text-[15px] font-semibold hover:bg-background/90 hover:border-border hover:shadow-md disabled:opacity-50 transition-all duration-200"
                    >
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        {t("register.continueWithGoogle")}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-border/50" />
                        <span className="text-xs text-muted-foreground px-1">{t("register.or")}</span>
                        <div className="flex-1 h-px bg-border/50" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="register-name" className="block text-sm font-semibold text-foreground mb-2">
                                {t("register.name")}
                            </label>
                            <input
                                id="register-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-[15px]"
                                placeholder={t("register.namePlaceholder")}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="register-email" className="block text-sm font-semibold text-foreground mb-2">
                                {t("register.email")}
                            </label>
                            <input
                                id="register-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-[15px]"
                                placeholder={t("register.emailPlaceholder")}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="register-password" className="block text-sm font-semibold text-foreground mb-2">
                                {t("register.password")}
                            </label>
                            <div className="relative">
                                <input
                                    id="register-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    autoComplete="new-password"
                                    className="w-full px-4 py-3 pe-11 rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-[15px]"
                                    placeholder={t("register.passwordPlaceholder")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 end-0 flex items-center pe-3.5 text-muted-foreground hover:text-foreground transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground/60">
                                {t("register.passwordHint")}
                            </p>
                        </div>

                        {/* Terms */}
                        <p className="text-xs text-muted-foreground/70 leading-relaxed">
                            {t("register.agreeTerms")}{" "}
                            <Link href="/tos" className="text-primary font-semibold hover:underline underline-offset-2">{t("register.termsOfService")}</Link>
                            {" "}{t("register.and")}{" "}
                            <Link href="/privacy" className="text-primary font-semibold hover:underline underline-offset-2">{t("register.privacyPolicy")}</Link>
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 mt-1 bg-primary text-primary-foreground rounded-xl font-bold text-[15px] tracking-tight hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    {t("register.submitting")}
                                </span>
                            ) : t("register.submit")}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="animate-reveal-up delay-300 mt-6 text-center text-muted-foreground text-sm">
                    {t("register.hasAccount")}{" "}
                    <Link href="/login" className="text-primary font-bold hover:underline underline-offset-4 transition-colors">
                        {t("register.signIn")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
