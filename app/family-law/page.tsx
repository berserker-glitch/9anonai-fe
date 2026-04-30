import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { FAQSection } from "@/components/landing/faq-section";

/**
 * SEO Metadata for the Family Law page
 * Targets: Moudawana, مدونة الأسرة, marriage, divorce, inheritance
 */
export const metadata: Metadata = {
    title: "Moroccan Family Law AI | Moudawana مدونة الأسرة - 9anon AI قانون",
    description: "Free private AI for Moroccan Family Law (Moudawana / مدونة الأسرة). Get anonymous help with marriage, divorce, child custody, and inheritance questions. Available in Arabic, French, and English.",
    keywords: [
        "مدونة الأسرة", "Moroccan Legal AI", "IA Juridique Marocaine",
        "مدونة الأسرة المغربية", "moudawana", "moudawana maroc",
        "moroccan family law", "قانون الأسرة المغربي", "الطلاق في المغرب",
        "الزواج المغرب", "الإرث المغرب", "divorce maroc",
        "حضانة الأطفال", "divorce lawyer Morocco online",
        "inheritance law Morocco help", "droit successoral Maroc",
    ],
    alternates: { canonical: "https://9anonai.com/family-law" },
    openGraph: {
        title: "Moroccan Family Law AI | Moudawana مدونة الأسرة",
        description: "Private AI for Moudawana. Ask anonymously about marriage, divorce, custody, and inheritance.",
        type: "website",
        url: "https://9anonai.com/family-law",
        siteName: "9anon AI - قانون",
    },
};

/** FAQ items for the Family Law page */
const familyLawFAQ = [
    { question: "What is the Moudawana?", answer: "The Moudawana (مدونة الأسرة) is Morocco's Family Code, reformed in 2004 to modernize family law. It governs marriage, divorce, child custody, inheritance, and other family matters. The reform granted women greater rights including the right to initiate divorce and increased protections for children." },
    { question: "How does divorce work in Morocco?", answer: "Morocco recognizes several types of divorce: mutual consent divorce (khol'), judicial divorce for discord (shiqaq), and divorce for specific causes like harm or absence. Both spouses can initiate divorce proceedings. The process involves mandatory reconciliation attempts before a judge." },
    { question: "How is child custody decided?", answer: "Under the Moudawana, custody priority goes to the mother for young children, then the father, then the maternal grandmother. The court always considers the child's best interest and may modify custody arrangements based on circumstances such as the custodial parent's remarriage or relocation." },
    { question: "How does inheritance work under Moroccan law?", answer: "Inheritance follows Islamic law principles codified in the Moudawana. Shares are distributed according to fixed proportions (faraid) based on the heir's relationship to the deceased. Surviving spouses, children, parents, and siblings each have specific entitlements defined by law." },
    { question: "What is the legal marriage age in Morocco?", answer: "The legal marriage age in Morocco is 18 for both men and women. However, a judge may authorize marriage for minors under 18 in exceptional circumstances, a provision that has been subject to ongoing reform discussions." },
    { question: "Can women initiate divorce in Morocco?", answer: "Yes. Since the 2004 reform, women have the right to divorce without the husband's consent through the shiqaq (discord) procedure. They can also request khol' (mutual consent) divorce or divorce for specific legal causes like harm or non-maintenance." },
];

/** JSON-LD FAQPage schema for rich search snippets */
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: familyLawFAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
};

export default function FamilyLawPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden" dir="ltr">
            {/* FAQ structured data for Google rich results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Header />

            {/* === HERO SECTION === */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
                <div className="absolute inset-0 bg-dots opacity-30" />
                <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] opacity-40" />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-emerald mb-8">
                        <span className="text-sm font-medium text-gradient-emerald">Moudawana - مدونة الأسرة</span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                        Private & Safe Guide to <br />
                        <span className="text-gradient-emerald">Moroccan Family Law</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                        Sensitive questions about marriage, divorce, or inheritance?
                        Get accurate, anonymous information from the Moudawana instantly.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r from-primary via-emerald-600 to-teal-500 text-white rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <span>Ask Anonymously Free</span>
                        <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* === CONTENT SECTION (SEO depth) === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Understanding the Moudawana</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
                        The Moudawana (مدونة الأسرة) is Morocco&apos;s comprehensive Family Code, significantly reformed in 2004 under King Mohammed VI. The reform represented a landmark shift in women&apos;s rights, introducing judicial divorce for women, raising the marriage age to 18, and establishing shared responsibility between spouses. The code covers marriage contracts, divorce procedures, child custody arrangements, inheritance distribution (faraid), and maintenance obligations.
                    </p>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Key Areas of Moroccan Family Law</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
                        Moroccan family law touches every major life event: marriage requires specific legal formalities including a notarized contract (acte de mariage); divorce proceedings involve mandatory reconciliation attempts and can take several forms including consensual, judicial, or fault-based; child custody follows a defined priority order but always prioritizes the child&apos;s welfare; and inheritance follows Islamic faraid rules with specific shares allocated to each category of heir. 9anon AI helps you navigate all these areas instantly and confidentially.
                    </p>
                </div>
            </section>

            {/* === FAQ SECTION === */}
            <FAQSection
                items={familyLawFAQ}
                title="Family Law — Frequently Asked Questions"
            />

            {/* === INTERNAL LINKS === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Related Legal Topics</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { href: "/divorce-law", label: "Divorce Law Guide" },
                            { href: "/labor-law", label: "Labor Law" },
                            { href: "/traffic-law", label: "Traffic Law" },
                            { href: "/legal-ai", label: "AI Legal Assistant" },
                            { href: "/employee-rights", label: "Employee Rights" },
                            { href: "/tenant-rights", label: "Tenant Rights" },
                        ].map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="inline-flex items-center px-5 py-2.5 rounded-full glass-premium border border-border/40 text-sm font-medium hover:border-primary/50 hover:text-primary transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
