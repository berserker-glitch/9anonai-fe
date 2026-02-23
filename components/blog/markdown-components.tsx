import { Components } from "react-markdown";

export const generateIdFromText = (text: string, index?: number): string => {
    const id = text
        .toLowerCase()
        .replace(/[^\w\s\u0600-\u06FF-]/g, "") // Keep Arabic chars
        .replace(/\s+/g, "-")
        .substring(0, 60);
    return id || `heading-${index ?? Math.random().toString(36).substring(7)}`;
};

/**
 * Custom ReactMarkdown components to enhance the styling and functionality
 * of blog posts (e.g. adding IDs to headings for the Table of Contents).
 */
export const getMarkdownComponents = (isRtl: boolean): Components => ({
    // Headings with auto-generated IDs
    h1: ({ node, children, ...props }) => (
        <h1 id={generateIdFromText(children?.toString() || "")} className="font-display text-4xl sm:text-5xl font-bold mb-6 text-foreground leading-tight" {...props}>
            {children}
        </h1>
    ),
    h2: ({ node, children, ...props }) => (
        <h2 id={generateIdFromText(children?.toString() || "")} className="font-display text-2xl sm:text-3xl font-bold mt-12 mb-6 text-foreground border-b border-border/40 pb-2 flex items-center gap-3" {...props}>
            <span className="w-2 h-8 bg-primary rounded-full hidden sm:block"></span>
            {children}
        </h2>
    ),
    h3: ({ node, children, ...props }) => (
        <h3 id={generateIdFromText(children?.toString() || "")} className="font-display text-xl sm:text-2xl font-bold mt-8 mb-4 text-foreground/90" {...props}>
            {children}
        </h3>
    ),

    // Paragraphs and text
    p: ({ node, children, ...props }) => (
        <p className={`text-muted-foreground leading-relaxed mb-6 ${isRtl ? 'text-lg' : 'text-base'}`} {...props}>
            {children}
        </p>
    ),

    // Blockquotes for legal quotes or important notes
    blockquote: ({ node, children, ...props }) => (
        <blockquote className={`my-8 border-l-4 ${isRtl ? 'border-r-4 border-l-0 pl-0 pr-6' : 'pl-6'} border-primary bg-primary/5 py-4 px-6 rounded-r-xl rtl:rounded-l-xl rtl:rounded-r-none font-medium italic text-foreground`} {...props}>
            {children}
        </blockquote>
    ),

    // Lists
    ul: ({ node, children, ...props }) => (
        <ul className="list-none space-y-3 my-6 text-muted-foreground" {...props}>
            {children}
        </ul>
    ),
    ol: ({ node, children, ...props }) => (
        <ol className="list-decimal list-inside space-y-3 my-6 text-muted-foreground marker:text-primary marker:font-bold" {...props}>
            {children}
        </ol>
    ),
    li: ({ node, children, ordered, ...props }: any) => {
        if (ordered) {
            return <li className="pl-2 rtl:pr-2 leading-relaxed" {...props}>{children}</li>
        }
        return (
            <li className={`relative ${isRtl ? 'pr-6' : 'pl-6'} leading-relaxed`} {...props}>
                <span className={`absolute top-2.5 ${isRtl ? 'right-0' : 'left-0'} w-2 h-2 rounded-full bg-primary/50`}></span>
                {children}
            </li>
        )
    },

    // Links
    a: ({ node, children, href, ...props }) => (
        <a
            href={href}
            className="text-primary hover:text-emerald-500 font-medium underline underline-offset-4 decoration-primary/30 hover:decoration-emerald-500 transition-colors"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        >
            {children}
        </a>
    ),

    // Strong/Bold
    strong: ({ node, children, ...props }) => (
        <strong className="font-bold text-foreground bg-primary/10 px-1 rounded" {...props}>
            {children}
        </strong>
    ),
});
