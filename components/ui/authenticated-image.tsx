"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

interface AuthenticatedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
}

/**
 * An image component that fetches the image over an authenticated connection
 * using the user's JWT token, allowing secure display of protected files.
 */
export function AuthenticatedImage({ src, alt, className = "", ...props }: AuthenticatedImageProps) {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (!src) return;

        // If it's already a local object/data URL, use it directly without auth
        if (src.startsWith('blob:') || src.startsWith('data:')) {
            setObjectUrl(src);
            return;
        }

        if (!token) return;

        let isMounted = true;

        fetch(src, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to load image");
                return res.blob();
            })
            .then(blob => {
                if (isMounted) {
                    setObjectUrl(URL.createObjectURL(blob));
                }
            })
            .catch(err => {
                console.error("Error loading authenticated image:", err);
                // Fallback to trying to render it directly if fetch fails
                if (isMounted) setObjectUrl(src);
            });

        return () => {
            isMounted = false;
            // Note: Not constantly revoking object URL here to prevent flicker on re-renders,
            // but in a heavily memory constrained app we might want to clean up.
        };
    }, [src, token]);

    if (!objectUrl) {
        // Show a skeleton while loading the authenticated asset
        return <div className={`animate-pulse bg-white/10 ${className}`} aria-label="Loading image..." />;
    }

    return <img src={objectUrl} alt={alt} className={className} loading="lazy" {...props} />;
}
