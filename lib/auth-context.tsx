"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
    personalization?: string;
    isOnboarded?: boolean;
    marketingSource?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (data: { name?: string; personalization?: string; isOnboarded?: boolean; marketingSource?: string }) => Promise<{ success: boolean; error?: string }>;
    changePassword: (current: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
    isLoading: boolean;
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
        const url = `${API_URL}/auth/profile`;
        console.log("[updateProfile] Calling:", url);
        console.log("[updateProfile] Token exists:", !!token);
        console.log("[updateProfile] Updates:", updates);

        try {
            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updates),
            });

            console.log("[updateProfile] Response status:", res.status, res.statusText);

            const data = await res.json();
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

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, updateProfile, changePassword, isLoading }}>
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
