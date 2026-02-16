"use client";

import { useState } from "react";

/**
 * @description Individual FAQ item shape for the FAQ section
 * @property {string} question - The question text (displayed as H3)
 * @property {string} answer - The answer text (displayed when expanded)
 */
export interface FAQItem {
    question: string;
    answer: string;
}

/**
 * @description Props for the FAQSection component
 * @property {FAQItem[]} items - Array of FAQ question/answer pairs
 * @property {string} title - Section heading (defaults to "Frequently Asked Questions")
 * @property {string} [dir] - Text direction ('ltr' or 'rtl')
 */
interface FAQSectionProps {
    items: FAQItem[];
    title: string;
    dir?: "ltr" | "rtl";
}

/**
 * @description Reusable FAQ accordion component with SEO-optimized HTML structure.
 * Uses semantic HTML (details/summary) for native accordion behavior.
 * FAQ JSON-LD schema is injected at the page level, not here (to avoid
 * duplicate schemas when multiple FAQ sections exist on a page).
 *
 * WHY: FAQ sections with real content are critical for SEO — they target
 * long-tail "how to" and "what is" queries that Google surfaces as
 * "People Also Ask" results and featured snippets.
 */
export function FAQSection({ items, title, dir = "ltr" }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    /**
     * Toggle an FAQ item open/closed
     * @param {number} index - Index of the FAQ item to toggle
     */
    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 sm:py-20" dir={dir}>
            <div className="max-w-4xl mx-auto px-6 sm:px-8">
                {/* Section heading — uses H2 for proper heading hierarchy */}
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
                    {title}
                </h2>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="glass-premium rounded-xl border border-border/40 overflow-hidden transition-all duration-300"
                        >
                            {/* Question button — uses H3 for SEO heading hierarchy */}
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="font-semibold text-base sm:text-lg pr-4">
                                    {item.question}
                                </h3>
                                <svg
                                    className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Answer — rendered in DOM always for SEO crawlability */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
