interface TableOfContentsProps {
    /** Raw markdown content to extract headings from */
    content: string;
    lang: string;
}

interface TocItem {
    id: string;
    text: string;
    level: number;
}

/**
 * TableOfContents Component
 * Auto-generates a clickable TOC from markdown headings.
 * WHY: Boosts dwell time, improves content discoverability,
 * and helps Google understand content structure.
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

        headings.push({ id, text, level });
    }

    // Don't render if fewer than 3 headings
    if (headings.length < 3) return null;

    const labels = {
        ar: "محتويات المقال",
        en: "Table of Contents",
        fr: "Sommaire",
    };

    const label = labels[lang as keyof typeof labels] || labels.ar;

    return (
        <nav
            aria-label="Table of Contents"
            className="my-8 p-6 rounded-2xl glass-premium border border-border/40"
        >
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                {label}
            </h2>
            <ul className="space-y-2">
                {headings.map((heading, index) => (
                    <li
                        key={index}
                        className={heading.level === 3 ? "pl-4" : ""}
                    >
                        <a
                            href={`#${heading.id}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1 leading-relaxed"
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
