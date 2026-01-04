"use client";

import { ReactNode, useEffect } from "react";
import { Button } from "../ui/button";
import { IconButton } from "../ui/icon-button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    children?: ReactNode;
    footer?: ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
}: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`
          relative z-10
          w-[90%] ${sizeClasses[size]}
          bg-card text-card-foreground
          border border-border
          rounded-xl shadow-2xl
          animate-in fade-in-0 zoom-in-95 duration-200
        `}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-4 border-b border-border">
                    <div>
                        {title && (
                            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                        )}
                        {description && (
                            <p className="text-sm text-muted-foreground mt-1">{description}</p>
                        )}
                    </div>
                    <IconButton
                        label="Close"
                        onClick={onClose}
                        variant="ghost"
                        size="sm"
                        className="-mt-1 -mr-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </IconButton>
                </div>

                {/* Body */}
                {children && <div className="p-4">{children}</div>}

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-2 p-4 border-t border-border">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "default",
}: ConfirmModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === "destructive" ? "destructive" : "primary"}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </Button>
                </>
            }
        />
    );
}
