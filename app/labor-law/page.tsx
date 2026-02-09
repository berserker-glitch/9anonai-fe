import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

/**
 * SEO Metadata for the Labor Law page
 * Targets: مدونة الشغل, code du travail, moroccan labor law AI
 */
export const metadata: Metadata = {
    title: "Moroccan Labor Law AI | مدونة الشغل - 9anon AI قانون",
    description: "Free AI assistant for Moroccan Labor Law (مدونة الشغل / Code du Travail). Get instant answers about CDI/CDD contracts, wrongful termination, vacation rights, and employee protections.",
    keywords: [
        "مدونة الشغل",
        "Moroccan Legal AI",
        "IA Juridique Marocaine",
        "مدونة الشغل المغربية",
        "code du travail maroc",
        "moroccan labor law",
        "قانون العمل المغربي",
        "CDI CDD maroc",
        "عقد الشغل",
        "9anon ai labor",
        "kanoun ai travail",
        "droits des salariés maroc"
    ],
    alternates: {
        canonical: "https://9anonai.com/labor-law",
    },
    openGraph: {
        title: "Moroccan Labor Law AI | مدونة الشغل",
        description: "Free AI assistant for Code du Travail. Ask about contracts, termination, and worker rights.",
        type: "website",
        url: "https://9anonai.com/labor-law",
        siteName: "9anon AI - قانون",
    },
};

export default function LaborLawPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden" dir="ltr">
            <Header />
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
            <Footer />
        </div>
    );
}
