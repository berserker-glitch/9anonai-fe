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
    const { dir } = useLanguage();

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
        <div className="min-h-screen bg-background flex items-center justify-center" dir={dir}>
            {/* Subtle background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-primary/8 to-transparent rounded-full blur-[100px] -translate-y-1/2" />
            </div>

            {/* Language Switcher */}
            <div className="fixed top-5 end-5 z-20">
                <LanguageSwitcher />
            </div>

            <div className="relative z-10 w-full max-w-[400px] mx-auto px-5 py-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-primary/15 mx-auto hover:scale-105 transition-transform">
                            <Image src="/9anon-logo.webp" alt="9anon AI" className="object-cover" fill priority sizes="56px" />
                        </div>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                        {t("register.title")}
                    </h1>
                    <p className="mt-2 text-muted-foreground text-[15px]">
                        {t("register.subtitle")}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="flex items-center gap-2.5 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm">
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Name */}
                    <div>
                        <label htmlFor="register-name" className="block text-sm font-medium text-foreground mb-2">
                            {t("register.name")}
                        </label>
                        <input
                            id="register-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-[15px]"
                            placeholder={t("register.namePlaceholder")}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="register-email" className="block text-sm font-medium text-foreground mb-2">
                            {t("register.email")}
                        </label>
                        <input
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-[15px]"
                            placeholder={t("register.emailPlaceholder")}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="register-password" className="block text-sm font-medium text-foreground mb-2">
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
                                className="w-full px-4 py-3 pe-11 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-[15px]"
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
                        <Link href="/tos" className="text-primary hover:underline underline-offset-2">{t("register.termsOfService")}</Link>
                        {" "}{t("register.and")}{" "}
                        <Link href="/privacy" className="text-primary hover:underline underline-offset-2">{t("register.privacyPolicy")}</Link>
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-[15px] hover:opacity-90 disabled:opacity-50 transition-opacity"
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

                {/* Footer link */}
                <p className="mt-8 text-center text-muted-foreground text-sm">
                    {t("register.hasAccount")}{" "}
                    <Link href="/login" className="text-primary font-semibold hover:underline underline-offset-4">
                        {t("register.signIn")}
                    </Link>
                </p>
            </div>
        </div>
    );
}
