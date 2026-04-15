"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ContractToolbar } from "./contract-toolbar";

interface ContractPreviewPanelProps {
    htmlContent: string;
    version: number;
    isLoading: boolean;
    onDownloadPdf: () => void;
    className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML builder — generates the same document the PDF pipeline produces
// ─────────────────────────────────────────────────────────────────────────────

function buildPreviewDocument(htmlContent: string): string {
    const isRTL = /[\u0600-\u06FF]/.test(htmlContent);
    const dir = isRTL ? "rtl" : "ltr";
    const textAlign = isRTL ? "right" : "left";
    const fontFamily = isRTL
        ? "'Amiri', 'Traditional Arabic', Arial, serif"
        : "'Times New Roman', Georgia, serif";

    return `<!DOCTYPE html>
<html lang="${isRTL ? "ar" : "fr"}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link
    href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap"
    rel="stylesheet"
  />
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 100%;
      height: 100%;
      background: transparent;
    }

    body {
      font-family: ${fontFamily};
      font-size: 12pt;
      line-height: 1.8;
      color: #1a1a1a;
      direction: ${dir};
      text-align: ${textAlign};
      padding: 0;
    }

    /* ── Headings ── */
    h1 {
      font-size: 17pt;
      font-weight: 700;
      text-align: center;
      margin: 0 0 24px;
      color: #111;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    h2 {
      font-size: 11pt;
      font-weight: 700;
      margin: 26px 0 8px;
      color: #111;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1.5px solid #222;
      padding-bottom: 3px;
    }

    h3 {
      font-size: 11pt;
      font-weight: 700;
      margin: 18px 0 6px;
      color: #222;
    }

    h4 {
      font-size: 11pt;
      font-weight: 700;
      margin: 14px 0 4px;
      color: #333;
    }

    /* ── Paragraphs ── */
    p {
      margin: 5px 0;
      text-align: justify;
      hyphens: auto;
    }

    /* ── Lists ── */
    ol, ul {
      margin: 8px 0;
      padding-${isRTL ? "right" : "left"}: 28px;
    }

    li {
      margin: 4px 0;
    }

    /* ── Tables ── */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 11pt;
    }

    th, td {
      border: 1px solid #aaa;
      padding: 7px 12px;
      text-align: ${textAlign};
    }

    th {
      background: #f0f0f0;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 10pt;
      letter-spacing: 0.03em;
    }

    tr:nth-child(even) td {
      background: #fafafa;
    }

    /* ── Emphasis ── */
    strong, b {
      font-weight: 700;
    }

    em, i {
      font-style: italic;
    }

    /* ── Horizontal rule ── */
    hr {
      border: none;
      border-top: 1px solid #ccc;
      margin: 20px 0;
    }

    /* ── Signature blocks ── */
    .signature-row {
      display: flex;
      justify-content: space-between;
      margin-top: 48px;
      gap: 20px;
    }

    .signature-block {
      text-align: center;
      flex: 1;
      border-top: 1px solid #333;
      padding-top: 8px;
    }

    /* ── Inline placeholders styling ── */
    [data-placeholder], *:empty {
      /* intentionally blank */
    }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Empty state illustration
// ─────────────────────────────────────────────────────────────────────────────

function EmptyPreview() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground/40 select-none">
            {/* Document illustration */}
            <svg
                width="72"
                height="88"
                viewBox="0 0 72 88"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="1" y="1" width="70" height="86" rx="5" fill="white" stroke="currentColor" strokeWidth="1.5" />
                {/* Folded corner */}
                <path d="M50 1 L70 22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M50 1 L50 22 L70 22" fill="#f3f4f6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Lines */}
                <line x1="12" y1="36" x2="58" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="46" x2="58" y2="46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="56" x2="58" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="66" x2="40" y2="66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="text-center">
                <p className="text-sm font-medium">Contract preview</p>
                <p className="text-xs mt-1 opacity-70">
                    Your document will appear here once the AI drafts it
                </p>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function ContractPreviewPanel({
    htmlContent,
    version,
    isLoading,
    onDownloadPdf,
    className,
}: ContractPreviewPanelProps) {
    const [scale, setScale] = useState(0.9);
    const [isDownloading, setIsDownloading] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [iframeHeight, setIframeHeight] = useState(1122); // 297mm in px at 96dpi ≈ 1122px

    // Build the full HTML document for the iframe
    const previewDoc = htmlContent ? buildPreviewDocument(htmlContent) : null;

    // Resize the iframe to match the actual content height
    const handleIframeLoad = useCallback(() => {
        try {
            const doc = iframeRef.current?.contentDocument;
            if (doc?.body) {
                const h = Math.max(
                    doc.body.scrollHeight,
                    doc.documentElement.scrollHeight,
                    1122 // minimum A4 height
                );
                setIframeHeight(h + 40); // add a little breathing room at the bottom
            }
        } catch {
            // cross-origin guard — shouldn't happen with srcdoc
        }
    }, []);

    // Re-measure whenever content changes
    useEffect(() => {
        if (iframeRef.current && previewDoc) {
            // give the iframe a moment to render before measuring
            const t = setTimeout(handleIframeLoad, 120);
            return () => clearTimeout(t);
        }
    }, [previewDoc, handleIframeLoad]);

    const handleZoomIn = () => setScale((p) => Math.min(+(p + 0.1).toFixed(1), 2));
    const handleZoomOut = () => setScale((p) => Math.max(+(p - 0.1).toFixed(1), 0.4));

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await onDownloadPdf();
        } finally {
            setIsDownloading(false);
        }
    };

    // A4 dimensions in pixels at 96 dpi: 794 × 1122px
    const A4_WIDTH_PX = 794;

    return (
        <div className={cn("flex flex-col h-full", className)}>
            {/* ── Toolbar ── */}
            <ContractToolbar
                onDownload={handleDownload}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                scale={scale}
                version={version}
                isDownloading={isDownloading}
            />

            {/* ── Viewer area ── */}
            <div
                className="flex-1 overflow-auto"
                style={{ background: "#6b7280" }} /* PDF viewer gray */
            >
                {!htmlContent ? (
                    <div className="h-full" style={{ background: "#6b7280" }}>
                        <EmptyPreview />
                    </div>
                ) : (
                    /* Page container — centers and scales the A4 page */
                    <div
                        className="flex justify-center py-8 px-4"
                        style={{ minHeight: "100%" }}
                    >
                        {/* White A4 page */}
                        <div
                            style={{
                                width: A4_WIDTH_PX,
                                minHeight: iframeHeight,
                                transformOrigin: "top center",
                                transform: `scale(${scale})`,
                                marginBottom: scale < 1 ? `${(scale - 1) * iframeHeight}px` : 0,
                                // When scaled up, add bottom space so the page stays scrollable
                                paddingBottom: scale > 1 ? `${(scale - 1) * iframeHeight}px` : 0,
                                flexShrink: 0,
                            }}
                        >
                            {/* Drop shadow like a real PDF viewer */}
                            <div
                                style={{
                                    width: "100%",
                                    minHeight: iframeHeight,
                                    background: "white",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.2)",
                                    position: "relative",
                                }}
                            >
                                {/* Loading shimmer overlay while streaming */}
                                {isLoading && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                                            backgroundSize: "200% 100%",
                                            animation: "shimmer 1.5s infinite",
                                            zIndex: 2,
                                            pointerEvents: "none",
                                        }}
                                    />
                                )}

                                {/*
                                  IFRAME with srcdoc — gives us a fully isolated rendering
                                  environment that matches the PDF output exactly.
                                  sandbox="allow-same-origin" lets us measure content height;
                                  no scripts, forms, or popups are allowed.
                                */}
                                <iframe
                                    ref={iframeRef}
                                    srcDoc={previewDoc!}
                                    sandbox="allow-same-origin"
                                    onLoad={handleIframeLoad}
                                    title="Contract Preview"
                                    style={{
                                        width: "100%",
                                        height: iframeHeight,
                                        border: "none",
                                        display: "block",
                                        padding: "20mm", // match PDF margins
                                        background: "white",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Keyframe for shimmer — injected once */}
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position:  200% 0; }
                }
            `}</style>
        </div>
    );
}
