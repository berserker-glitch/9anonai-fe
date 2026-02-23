import { ScrollSpyToc } from "./scroll-spy-toc";

interface TableOfContentsProps {
    /** Raw markdown content to extract headings from */
    content: string;
    lang: string;
}

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

/**
 * TableOfContents Component
 * Parses markdown on the server and passes headings to the client-side scroll spy TOC.
 */
export function TableOfContents({ content, lang }: TableOfContentsProps) {
    // Extract headings from markdown (## and ### only)
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].replace(/[*_`]/g, "").trim(); // Strip markdown formatting
        const id = text
            .toLowerCase()
            .replace(/[^\w\s\u0600-\u06FF-]/g, "") // Keep Arabic chars
            .replace(/\s+/g, "-")
            .substring(0, 60);

        // Add a fallback for empty ids
        const finalId = id || `heading-${headings.length}`;

        headings.push({ id: finalId, text, level });
    }

    if (headings.length < 3) return null;

    return <ScrollSpyToc headings={headings} lang={lang} />;
}
