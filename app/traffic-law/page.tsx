import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { FAQSection } from "@/components/landing/faq-section";

/**
 * SEO Metadata for the Traffic Law page
 * Targets: مدونة السير, code de la route, traffic fines morocco
 */
export const metadata: Metadata = {
    title: "Moroccan Traffic Law AI | مدونة السير - 9anon AI قانون",
    description: "Free AI for Moroccan Traffic Law (مدونة السير / Code de la Route). Get help with traffic fines, accidents, driver's license issues, road violations, and insurance claims. Instant answers.",
    keywords: [
        "مدونة السير", "Moroccan Legal AI", "IA Juridique Marocaine",
        "مدونة السير المغربية", "code de la route maroc", "moroccan traffic law",
        "قانون السير المغربي", "مخالفات السير", "traffic fines morocco",
        "permis de conduire maroc", "حوادث السير المغرب",
        "amende routière Maroc", "accident de route Maroc",
        "رخصة السياقة المغرب", "تأمين السيارات المغرب",
    ],
    alternates: { canonical: "https://9anonai.com/traffic-law" },
    openGraph: {
        title: "Moroccan Traffic Law AI | مدونة السير",
        description: "Free AI for Code de la Route. Ask about fines, accidents, and driving regulations.",
        type: "website",
        url: "https://9anonai.com/traffic-law",
        siteName: "9anon AI - قانون",
    },
};

/** FAQ items for the Traffic Law page */
const trafficLawFAQ = [
    { question: "What are the most common traffic fines in Morocco?", answer: "Common fines include: speeding (300-700 MAD depending on excess), running a red light (700 MAD), driving without seatbelt (300 MAD), using a phone while driving (300-700 MAD), and driving under the influence (up to 5,000 MAD + license suspension). Repeat offenses carry doubled fines." },
    { question: "What should I do after a traffic accident in Morocco?", answer: "Stay calm and secure the scene. Exchange insurance information with the other party. Fill out the accident report form (constat amiable). If there are injuries, call emergency services (15 or 150). Take photos of damage and gather witness information. Report to your insurance within 5 days." },
    { question: "How does the points system work for driving licenses?", answer: "Morocco's driving license starts with a capital of points. Violations cause point deductions. When all points are lost, the license is suspended. Points can be recovered through safe driving periods or by completing road safety training courses." },
    { question: "Can I dispute a traffic fine in Morocco?", answer: "Yes. You have the right to contest a fine within 30 days of notification. You can submit a written complaint to the relevant tribunal or appear in person. Providing evidence like dashcam footage or witness statements can support your case." },
    { question: "What happens if I drive without insurance in Morocco?", answer: "Driving without valid insurance is a serious offense in Morocco. Penalties include fines of 3,000-10,000 MAD, vehicle impoundment, and potential prison time. If an uninsured driver causes an accident, they are personally liable for all damages." },
    { question: "What are the penalties for drunk driving in Morocco?", answer: "Drunk driving penalties are severe: first offense carries a fine of 2,000-5,000 MAD and license suspension of 6-12 months. Repeat offenses can result in higher fines, 1-2 years imprisonment, and permanent license revocation. Refusal to take a breathalyzer test carries automatic penalties." },
];

/** JSON-LD FAQPage schema for rich search snippets */
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: trafficLawFAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
};

export default function TrafficLawPage() {
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
                <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px] opacity-40" />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-red-500/30 mb-8">
                        <span className="text-sm font-medium text-red-500">Code de la Route - مدونة السير</span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                        Instant Help with <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">Traffic Fines & Accidents</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                        Got a fine? Need to know the law about an accident?
                        Ask 9anon AI instantly and know your rights on the road.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white rounded-2xl shadow-xl shadow-red-500/20 hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <span>Check Traffic Law Free</span>
                        <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* === CONTENT SECTION (SEO depth) === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Morocco&apos;s Code de la Route</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
                        Morocco&apos;s traffic law (مدونة السير / Code de la Route) was significantly reformed in 2010 to address road safety challenges. The law introduced a points-based driving license system, harsher penalties for repeat offenders, mandatory vehicle safety inspections, and stricter rules around drunk driving. With Morocco having one of the highest traffic accident rates in the region, understanding the law can help protect you from violations and ensure you know your rights after an accident.
                    </p>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">What to Do After an Accident</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8">
                        After any traffic accident in Morocco, your first priority is safety. Secure the scene, check for injuries, and call emergency services if needed (dial 15 for SAMU or 150 for emergency services). You must complete a constat amiable (accident report form) with the other driver and report to your insurance company within 5 working days. Keep photos, witness contact details, and all documentation. 9anon AI can guide you through this process step by step, helping you understand what information to collect and what your insurance obligations are.
                    </p>
                </div>
            </section>

            {/* === FAQ SECTION === */}
            <FAQSection
                items={trafficLawFAQ}
                title="Traffic Law — Frequently Asked Questions"
            />

            {/* === INTERNAL LINKS === */}
            <section className="py-16 sm:py-20 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">Related Legal Topics</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { href: "/family-law", label: "Family Law" },
                            { href: "/labor-law", label: "Labor Law" },
                            { href: "/legal-ai", label: "AI Legal Assistant" },
                            { href: "/legal-chatbot", label: "Legal Chatbot" },
                            { href: "/tenant-rights", label: "Tenant Rights" },
                            { href: "/business-legal", label: "Business Legal" },
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
