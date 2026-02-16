import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { FAQSection } from "@/components/landing/faq-section";

/**
 * SEO Metadata for the Labor Law page
 * Targets: مدونة الشغل, code du travail, moroccan labor law AI
 */
export const metadata: Metadata = {
    title: "Moroccan Labor Law AI | مدونة الشغل - 9anon AI قانون",
    description: "Free AI assistant for Moroccan Labor Law (مدونة الشغل / Code du Travail). Get instant answers about CDI/CDD contracts, wrongful termination, vacation rights, minimum wage, and employee protections.",
    keywords: [
        "مدونة الشغل", "Moroccan Legal AI", "IA Juridique Marocaine",
        "مدونة الشغل المغربية", "code du travail maroc", "moroccan labor law",
        "قانون العمل المغربي", "CDI CDD maroc", "عقد الشغل",
        "droits des salariés maroc", "employee rights Morocco",
        "labor law advice Morocco", "droit du travail Maroc conseil",
        "licenciement abusif Maroc", "حقوق الموظف في المغرب",
    ],
    alternates: { canonical: "https://9anonai.com/labor-law" },
    openGraph: {
        title: "Moroccan Labor Law AI | مدونة الشغل",
        description: "Free AI assistant for Code du Travail. Ask about contracts, termination, and worker rights.",
        type: "website",
        url: "https://9anonai.com/labor-law",
        siteName: "9anon AI - قانون",
    },
};

/** FAQ items for the Labor Law page */
const laborLawFAQ = [
    { question: "What types of employment contracts exist in Morocco?", answer: "Morocco's Code du Travail recognizes two main types: CDI (Contrat à Durée Indéterminée) for permanent positions and CDD (Contrat à Durée Déterminée) for temporary work. CDDs are limited to 1 year (or 2 years in some cases) and automatically convert to CDI if the employee continues working after expiry." },
    { question: "Can my employer fire me without cause?", answer: "No. Under Morocco's Code du Travail, termination must be for serious professional misconduct (faute grave) or legitimate economic reasons. Wrongful dismissal (licenciement abusif) entitles the employee to damages, notice period compensation, and seniority indemnity." },
    { question: "What is the minimum wage (SMIG) in Morocco?", answer: "The SMIG (Salaire Minimum Interprofessionnel Garanti) is set by government decree and updated periodically. It applies to all sectors. Employers paying below SMIG face legal penalties. Agricultural workers have a separate minimum wage (SMAG)." },
    { question: "How many vacation days am I entitled to?", answer: "After 6 months of continuous service, employees receive 1.5 working days of paid annual leave per month of service (18 days/year). This increases by 1.5 days for every 5 years of seniority. Employees under 18 receive 2 days per month." },
    { question: "What happens if my employer doesn't pay me on time?", answer: "Delayed wages are a violation of the Code du Travail. Employees can file a complaint with the labor inspector (Inspecteur du Travail) or bring a case before the labor tribunal. Interest may be owed on delayed payments." },
    { question: "What are my rights during the notice period?", answer: "During the notice period (préavis), you're entitled to 2 hours off per day (or 8 hours per week) to seek new employment. The employer must continue paying full salary. If the employer terminates without notice, they owe notice period compensation." },
];

/** JSON-LD FAQPage schema for rich search snippets */
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: laborLawFAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
};

export default function LaborLawPage() {
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
                        <span className="text-sm font-medium text-gradient-emerald">Code du Travail - مدونة الشغل</span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                        Your AI Assistant for <br />
                        <span className="text-gradient-emerald">Moroccan Labor Law</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                        Questions about wrongful termination, contracts (CDI/CDD), or vacation rights?
                        Get instant answers based on the official Code du Travail.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <span>Ask about Labor Law Free</span>
                        <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* === CONTENT SECTION (SEO depth) === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Understanding Morocco&apos;s Code du Travail</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
                        Morocco&apos;s Code du Travail (مدونة الشغل) provides comprehensive protections for workers. Enacted in 2003, it covers employment contracts, working hours, minimum wage, workplace safety, social security, and termination procedures. Whether you&apos;re an employee facing wrongful termination or an employer ensuring compliance, understanding the labor code is essential. 9anon AI gives you instant answers grounded in the actual text of the law.
                    </p>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Key Employee Protections</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
                        The Code du Travail guarantees several critical protections: the right to written employment contracts, a maximum 44-hour work week, overtime compensation at 125-150% of normal rate, paid annual leave that increases with seniority, protection against wrongful dismissal (licenciement abusif), mandatory notice periods, and CNSS social security coverage. Employees also have the right to form and join unions and to collective bargaining.
                    </p>
                </div>
            </section>

            {/* === FAQ SECTION === */}
            <FAQSection
                items={laborLawFAQ}
                title="Labor Law — Frequently Asked Questions"
            />

            {/* === INTERNAL LINKS === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Related Legal Topics</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { href: "/employee-rights", label: "Employee Rights Guide" },
                            { href: "/family-law", label: "Family Law" },
                            { href: "/traffic-law", label: "Traffic Law" },
                            { href: "/contract-review", label: "Contract Review" },
                            { href: "/business-legal", label: "Business Legal" },
                            { href: "/legal-ai", label: "AI Legal Assistant" },
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
