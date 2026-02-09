import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

/**
 * SEO Metadata for the Traffic Law page
 * Targets: مدونة السير, code de la route, traffic fines morocco
 */
export const metadata: Metadata = {
    title: "Moroccan Traffic Law AI | مدونة السير - 9anon AI قانون",
    description: "Free AI for Moroccan Traffic Law (مدونة السير / Code de la Route). Get help with traffic fines, accidents, driver's license issues, and road violation penalties.",
    keywords: [
        "مدونة السير",
        "مدونة السير المغربية",
        "code de la route maroc",
        "moroccan traffic law",
        "قانون السير المغربي",
        "مخالفات السير",
        "traffic fines morocco",
        "permis de conduire maroc",
        "9anon ai traffic",
        "حوادث السير المغرب"
    ],
    alternates: {
        canonical: "https://9anonai.com/traffic-law",
    },
    openGraph: {
        title: "Moroccan Traffic Law AI | مدونة السير",
        description: "Free AI for Code de la Route. Ask about fines, accidents, and driving regulations.",
        type: "website",
        url: "https://9anonai.com/traffic-law",
        siteName: "9anon AI - قانون",
    },
};

export default function TrafficLawPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden" dir="ltr">
            <Header />
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
            <Footer />
        </div>
    );
}
