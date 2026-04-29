"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserSubscription {
    status: string;
    planName: string;
    planDisplayName: string;
    currentPeriodEnd: string;
    cancelledAt: string | null;
    messagesPerConversation: number; // 0 = unlimited
    contractsPerMonth: number;        // 0 = unlimited
}

export interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
    personalization?: string;
    isOnboarded?: boolean;
    marketingSource?: string;
    feedbackDismissed?: boolean;
    country?: string;
    plan?: string;           // "free" | "basic" | "pro" | "enterprise"
    subscription?: UserSubscription | null;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    loginWithGoogle: (credential: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (data: { name?: string; personalization?: string; isOnboarded?: boolean; marketingSource?: string }) => Promise<{ success: boolean; error?: string }>;
    changePassword: (current: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
    dismissFeedback: () => Promise<void>;
    refetchUser: () => Promise<void>;
    isLoading: boolean;
    isPaidPlan: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            // Verify token and get user
            fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.user) {
                        setUser(data.user);
                    } else {
                        localStorage.removeItem("token");
                        setToken(null);
                    }
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setToken(null);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error || "Login failed" };
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: "Something went wrong" };
        }
    };

    const loginWithGoogle = async (credential: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error || "Google sign-in failed" };
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return { success: true };
        } catch {
            return { success: false, error: "Something went wrong" };
        }
    };

    const register = async (email: string, password: string, name?: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error || "Registration failed" };
            }

            // Auto-login after registration
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser(data.user);
            return { success: true };
        } catch (error) {
            return { success: false, error: "Something went wrong" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const updateProfile = async (updates: { name?: string; personalization?: string; isOnboarded?: boolean; marketingSource?: string }) => {
        const url = `${API_URL}/auth/update-profile`;
        console.log("[updateProfile] Calling:", url);
        console.log("[updateProfile] Token exists:", !!token);
        console.log("[updateProfile] Updates:", updates);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updates),
            });

            console.log("[updateProfile] Response status:", res.status, res.statusText);

            // Get raw text first to debug
            const rawText = await res.text();
            console.log("[updateProfile] Raw response:", rawText.substring(0, 500));

            // Try to parse as JSON
            let data;
            try {
                data = JSON.parse(rawText);
            } catch (parseError) {
                console.error("[updateProfile] JSON parse failed, raw response:", rawText);
                return { success: false, error: `Server error (${res.status}): Response is not JSON` };
            }

            console.log("[updateProfile] Response data:", data);

            if (!res.ok) {
                console.error("[updateProfile] Failed:", res.status, data);
                return { success: false, error: data.error || `HTTP ${res.status}: ${res.statusText}` };
            }
            setUser(data.user);
            return { success: true };
        } catch (e) {
            console.error("[updateProfile] Exception:", e);
            return { success: false, error: "Failed to update profile: " + (e instanceof Error ? e.message : String(e)) };
        }
    };

    const changePassword = async (current: string, newPass: string) => {
        try {
            const res = await fetch(`${API_URL}/auth/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword: current, newPassword: newPass }),
            });
            const data = await res.json();
            if (!res.ok) return { success: false, error: data.error };
            return { success: true };
        } catch (e) {
            return { success: false, error: "Failed to change password" };
        }
    };

    const dismissFeedback = async () => {
        if (!token) return;
        try {
            await fetch(`${API_URL}/auth/dismiss-feedback`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(prev => prev ? { ...prev, feedbackDismissed: true } : null);
        } catch (e) {
            console.error("Failed to dismiss feedback modal", e);
        }
    };

    /** Re-fetches /auth/me to refresh plan and subscription data after payment. */
    const refetchUser = async () => {
        const storedToken = token || localStorage.getItem("token");
        if (!storedToken) return;
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            const data = await res.json();
            if (data.user) setUser(data.user);
        } catch (e) {
            console.error("Failed to refetch user", e);
        }
    };

    const isPaidPlan = !!(user?.plan && user.plan !== 'free');

    return (
        <AuthContext.Provider value={{ user, token, login, loginWithGoogle, register, logout, updateProfile, changePassword, dismissFeedback, refetchUser, isLoading, isPaidPlan }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
