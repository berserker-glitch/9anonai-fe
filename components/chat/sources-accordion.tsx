"use client";

import { useState } from "react";

interface Source {
    document_name: string;
    category: string;
    text: string;
}

interface SourcesAccordionProps {
    sources: Source[];
}

export function SourcesAccordion({ sources }: SourcesAccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Handle sources that might be a string (JSON) or already parsed
    let parsedSources: Source[] = [];
    if (typeof sources === "string") {
        try {
            parsedSources = JSON.parse(sources);
        } catch {
            parsedSources = [];
        }
    } else if (Array.isArray(sources)) {
        parsedSources = sources;
    }

    if (!parsedSources || parsedSources.length === 0) return null;

    return (
        <div className="mt-3 border-t border-border/50 pt-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
            >
                <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 18 6-6-6-6" />
                </svg>
                <span className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Sources
                    <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full text-[10px] font-medium">
                        {parsedSources.length}
                    </span>
                </span>
            </button>

            {isOpen && (
                <div className="mt-3 space-y-2 animate-fade-in">
                    {parsedSources.map((source, index) => (
                        <div
                            key={index}
                            className="bg-card/50 border border-border/50 rounded-lg p-2 text-xs"
                        >
                            <div className="flex items-center gap-2">
                                <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0">
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-foreground truncate">
                                        {source.document_name}
                                    </p>
                                    <p className="text-muted-foreground text-[10px]">
                                        {source.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
