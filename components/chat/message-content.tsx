import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MessageContentProps {
    content: string;
    className?: string;
}

// Detect if text contains significant Arabic characters
function isArabicText(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/g;
    const matches = text.match(arabicPattern);
    const arabicChars = matches ? matches.length : 0;
    // If more than 20% Arabic characters, treat as RTL
    return arabicChars > text.length * 0.2;
}

export function MessageContent({ content, className = "" }: MessageContentProps) {
    const isRTL = isArabicText(content);

    return (
        <div
            className={`text-[15px] leading-relaxed prose prose-sm dark:prose-invert max-w-none ${className}`}
            dir={isRTL ? "rtl" : "ltr"}
            style={isRTL ? { textAlign: "right" } : {}}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Custom styling for code blocks
                    pre: ({ children }) => (
                        <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto my-3" dir="ltr">
                            {children}
                        </pre>
                    ),
                    code: ({ className, children, ...props }) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className="bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.5 rounded text-sm" dir="ltr" {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className={className} dir="ltr" {...props}>
                                {children}
                            </code>
                        );
                    },
                    // Links open in new tab
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            {children}
                        </a>
                    ),
                    // Better list styling
                    ul: ({ children }) => (
                        <ul className="list-disc list-inside my-2 space-y-1">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-inside my-2 space-y-1">
                            {children}
                        </ol>
                    ),
                    // Better paragraph spacing
                    p: ({ children }) => (
                        <p className="my-2 first:mt-0 last:mb-0">
                            {children}
                        </p>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
