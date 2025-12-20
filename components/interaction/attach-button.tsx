"use client";

import { useRef } from "react";
import { IconButton } from "../ui/icon-button";

interface AttachButtonProps {
    onFilesSelected?: (files: FileList) => void;
    accept?: string;
    className?: string;
}

export function AttachButton({
    onFilesSelected,
    accept = "image/*,.pdf,.doc,.docx,.txt,.md",
    className = ""
}: AttachButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelected?.(e.target.files);
            // Reset input so same file can be selected again
            e.target.value = "";
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />
            <IconButton
                label="Attach file"
                onClick={handleClick}
                variant="secondary"
                size="md"
                className={`shrink-0 ${className}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
            </IconButton>
        </>
    );
}
