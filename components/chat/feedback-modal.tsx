"use client";

/**
 * @fileoverview Feedback modal component displayed to active users (20+ messages).
 * Prompts them to fill out a Google Form for feedback, offering early access
 * to new features as an incentive. Dismissal is persisted in the database.
 * @module components/chat/feedback-modal
 */

import { Modal } from "../utility/modal";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/auth-context";

/** Google Form URL for user feedback collection */
const FEEDBACK_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdRwPmQo96kPe_etLP4eyxrKJxaQKAAHqk6mLQEvHLIwHg1ZQ/viewform?usp=header";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Modal shown to users with 20+ messages asking for product feedback.
 * On dismiss or CTA click, calls PATCH /api/auth/dismiss-feedback
 * to persist the dismissal in the database so it won't show again.
 *
 * @param {FeedbackModalProps} props - isOpen and onClose handlers
 */
export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    const { token } = useAuth();

    /**
     * Persists the feedback dismissal in the DB and closes the modal.
     * Called on both CTA click and modal close to ensure the flag is always set.
     */
    const handleDismiss = async () => {
        try {
            await fetch(`${API_URL}/auth/dismiss-feedback`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (e) {
            // Silently fail — worst case the modal shows again next session
            console.error("Failed to dismiss feedback modal", e);
        }
        onClose();
    };

    /**
     * Opens the Google Form in a new tab and then dismisses the modal.
     */
    const handleFillForm = () => {
        window.open(FEEDBACK_FORM_URL, "_blank", "noopener,noreferrer");
        handleDismiss();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleDismiss}
            title="📋 We'd Love Your Feedback!"
            description="Help us make 9anon even better for you."
            size="md"
            footer={
                <>
                    <Button variant="ghost" onClick={handleDismiss}>
                        Maybe Later
                    </Button>
                    <Button variant="primary" onClick={handleFillForm}>
                        Fill Out Feedback Form
                    </Button>
                </>
            }
        >
            <div className="space-y-4">
                <p className="text-sm text-foreground leading-relaxed">
                    Since you&apos;re an active user of our app, your feedback is invaluable!
                    Fill out this short form and you&apos;ll be granted access to{" "}
                    <span className="font-semibold text-primary">
                        early access features
                    </span>{" "}
                    when possible.
                </p>

                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        This feedback form takes less than 2 minutes to complete and helps
                        us prioritize the features you care about most.
                    </p>
                </div>
            </div>
        </Modal>
    );
}
