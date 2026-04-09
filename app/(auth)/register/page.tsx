"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useTranslation, useLanguage } from "@/lib/language-context";
import { LanguageSwitcher } from "@/components/landing/language-switcher";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { register, user } = useAuth();
    const { t } = useTranslation("auth");
    const { dir, language } = useLanguage();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            if (user.role === "superadmin") {
                router.push("/admin");
            } else if (!user.isOnboarded) {
                router.push("/setup");
            } else {
                router.push("/chat");
            }
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await register(email, password, name);

        if (result.success) {
            router.push("/setup");
        } else {
            setError(result.error || "Registration failed");
        }
        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen bg-background relative overflow-hidden" dir={dir}>
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-gold/12 via-primary/8 to-transparent rounded-full blur-[120px] -translate-y-1/3 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-[100px] translate-y-1/3 opacity-40" />
                <div className="absolute inset-0 bg-zellige opacity-[0.02]" />
            </div>

            {/* Language Switcher - top right */}
            <div className="absolute top-6 right-6 z-20 rtl:right-auto rtl:left-6">
                <LanguageSwitcher />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-[440px] space-y-8">
                    {/* Logo & Header */}
                    <div className="flex flex-col items-center animate-reveal-up">
                        <Link href="/" className="group mb-8">
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-500 group-hover:scale-110">
                                <Image
                                    src="/9anon-logo.webp"
                                    alt="9anon AI"
                                    className="object-cover"
                                    fill
                                    priority
                                    sizes="64px"
                                />
                            </div>
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                            {t("register.title")}
                        </h1>
                        <p className="mt-3 text-muted-foreground text-base">
                            {t("register.subtitle")}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="animate-reveal-up delay-100 glass-premium rounded-2xl p-8 sm:p-10 border-glow-emerald">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3.5 rounded-xl text-sm animate-slide-up">
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="register-name" className="block text-sm font-semibold text-foreground mb-2.5">
                                        {t("register.name")}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="register-name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full ps-12 pe-4 py-3.5 rounded-xl border border-border/60 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200 text-[15px]"
                                            placeholder={t("register.namePlaceholder")}
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="register-email" className="block text-sm font-semibold text-foreground mb-2.5">
                                        {t("register.email")}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="register-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full ps-12 pe-4 py-3.5 rounded-xl border border-border/60 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200 text-[15px]"
                                            placeholder={t("register.emailPlaceholder")}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="register-password" className="block text-sm font-semibold text-foreground mb-2.5">
                                        {t("register.password")}
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="register-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={6}
                                            className="w-full ps-12 pe-12 py-3.5 rounded-xl border border-border/60 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all duration-200 text-[15px]"
                                            placeholder={t("register.passwordPlaceholder")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 end-0 flex items-center pe-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground/60 flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {t("register.passwordHint")}
                                    </p>
                                </div>
                            </div>

                            {/* Terms agreement */}
                            <p className="text-xs text-muted-foreground/70 leading-relaxed">
                                {t("register.agreeTerms")}{" "}
                                <Link href="/tos" className="text-primary hover:underline underline-offset-2">{t("register.termsOfService")}</Link>
                                {" "}{t("register.and")}{" "}
                                <Link href="/privacy" className="text-primary hover:underline underline-offset-2">{t("register.privacyPolicy")}</Link>
                            </p>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 px-6 bg-gradient-to-r from-primary via-primary to-gold/80 text-primary-foreground rounded-xl font-semibold text-[15px] hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none transition-all duration-300 btn-premium"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        {t("register.submitting")}
                                    </span>
                                ) : t("register.submit")}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border/40" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-card/80 backdrop-blur-sm px-4 text-sm text-muted-foreground">
                                        {t("register.or")}
                                    </span>
                                </div>
                            </div>

                            {/* Continue without account */}
                            <Link
                                href="/chat"
                                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {t("register.continueWithout")}
                            </Link>
                        </form>
                    </div>

                    {/* Sign in link */}
                    <p className="animate-reveal-up delay-200 text-center text-muted-foreground text-sm">
                        {t("register.hasAccount")}{" "}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-semibold hover:underline underline-offset-4 transition-colors duration-200">
                            {t("register.signIn")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
