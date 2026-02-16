import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    /** JSON-LD BreadcrumbList schema for rich snippets in Google */
    jsonLd?: boolean;
}

/**
 * Breadcrumbs Component
 * Renders visual breadcrumb navigation AND injects BreadcrumbList JSON-LD
 * for Google rich snippet display in search results.
 */
export function Breadcrumbs({ items, jsonLd = true }: BreadcrumbsProps) {
    // Build JSON-LD structured data for BreadcrumbList
    const breadcrumbJsonLd = jsonLd
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.label,
                ...(item.href ? { item: `https://9anonai.com${item.href}` } : {}),
            })),
        }
        : null;

    return (
        <>
            {/* JSON-LD for Google rich snippets */}
            {breadcrumbJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
            )}

            {/* Visual breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <svg className="w-3.5 h-3.5 mx-1.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-foreground font-medium truncate max-w-[200px]">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
