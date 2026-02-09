import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

/**
 * SEO Metadata for the Family Law page
 * Targets: Moudawana, مدونة الأسرة, marriage, divorce, inheritance
 */
export const metadata: Metadata = {
    title: "Moroccan Family Law AI | Moudawana مدونة الأسرة - 9anon AI قانون",
    description: "Free private AI for Moroccan Family Law (Moudawana / مدونة الأسرة). Get anonymous help with marriage, divorce, child custody, and inheritance questions.",
    keywords: [
        "مدونة الأسرة",
        "مدونة الأسرة المغربية",
        "moudawana",
        "moudawana maroc",
        "moroccan family law",
        "قانون الأسرة المغربي",
        "الطلاق في المغرب",
        "الزواج المغرب",
        "الإرث المغرب",
        "divorce maroc",
        "9anon ai family",
        "حضانة الأطفال"
    ],
    alternates: {
        canonical: "https://9anonai.com/family-law",
    },
    openGraph: {
        title: "Moroccan Family Law AI | Moudawana مدونة الأسرة",
        description: "Private AI for Moudawana. Ask anonymously about marriage, divorce, custody, and inheritance.",
        type: "website",
        url: "https://9anonai.com/family-law",
        siteName: "9anon AI - قانون",
    },
};

export default function FamilyLawPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden" dir="ltr">
            <Header />
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
                <div className="absolute inset-0 bg-dots opacity-30" />
                <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px] opacity-40" />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-gold mb-8">
                        <span className="text-sm font-medium text-gradient-gold">Moudawana - مدونة الأسرة</span>
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
                        Private & Safe Guide to <br />
                        <span className="text-gradient-gold">Moroccan Family Law</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                        Sensitive questions about marriage, divorce, or inheritance?
                        Get accurate, anonymous information from the Moudawana instantly.
                    </p>

                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r from-gold via-yellow-500 to-amber-500 text-white rounded-2xl shadow-xl shadow-gold/20 hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        <span>Ask Anonymously Free</span>
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
