"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface UseAdminFetchResult<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useAdminFetch<T>(
    endpoint: string,
    range: string = "30d"
): UseAdminFetchResult<T> {
    const { token, user } = useAuth();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!token || user?.role !== "superadmin") return;

        setIsLoading(true);
        setError(null);

        try {
            const separator = endpoint.includes("?") ? "&" : "?";
            const url = `${API_URL}${endpoint}${separator}range=${range}`;
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            const json = await res.json();
            setData(json);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch data";
            setError(message);
            console.error(`[useAdminFetch] Error fetching ${endpoint}:`, err);
        } finally {
            setIsLoading(false);
        }
    }, [token, user, endpoint, range]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}
