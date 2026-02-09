import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

/**
 * SEO Metadata for the comparison page
 * Targets keywords: 9anon vs 9anoun, kanon ai alternative, qanon ai, etc.
 */
export const metadata: Metadata = {
    title: "9anon AI vs 9anoun AI | The Faster Free Alternative - قانون",
    description: "Compare 9anon AI (قانون) with 9anoun AI. Faster responses, no login required, free access to Moroccan law. Better than kanon ai, qanon ai alternatives.",
    keywords: [
        "9anon vs 9anoun",
        "9anoun alternative",
        "9anoun ai alternative",
        "kanon ai",
        "kanoun ai",
        "qanon ai",
        "qanoun ai",
        "9anonai vs 9anounai",
        "moroccan law ai comparison",
        "istichara ai",
        "استشارة قانونية مجانية"
    ],
    alternates: {
        canonical: "https://9anonai.com/vs-9anoun",
    },
    openGraph: {
        title: "9anon AI vs 9anoun AI | Faster & Free",
        description: "The faster, login-free alternative to 9anoun AI for Moroccan law. Compare features and see why users prefer 9anon AI.",
        type: "website",
        url: "https://9anonai.com/vs-9anoun",
        siteName: "9anon AI - قانون",
    },
    twitter: {
        card: "summary_large_image",
        title: "9anon AI vs 9anoun AI",
        description: "Faster, free alternative for Moroccan law AI assistance.",
    },
};

export default function ComparisonPage() {
    return (
        <div className="min-h-screen bg-background overflow-hidden" dir="ltr">
            <Header />

            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
                {/* Background Layers */}
                <div className="absolute inset-0 bg-dots opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />

                {/* Floating Orbs */}
                <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/25 to-gold/15 rounded-full blur-[120px] animate-morph opacity-60" />
                <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-gold/20 to-primary/10 rounded-full blur-[100px] animate-morph opacity-50" />

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border-glow-gold mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                            </span>
                            <span className="text-sm font-medium text-gradient-gold">Fast & Free Access</span>
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
                            The Fast Alternative to <br />
                            <span className="text-gradient-emerald">9anoun AI</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Don't get stuck behind a login wall. experience the fastest AI legal assistant in Morocco.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto perspective-1000">
                        <div className="glass-premium rounded-3xl p-1 sm:p-2 border-glow-emerald shadow-2xl overflow-hidden">
                            <div className="bg-background/40 backdrop-blur-sm rounded-2xl overflow-hidden">
                                <div className="grid grid-cols-3 p-6 border-b border-border/10 bg-muted/20">
                                    <div className="col-span-1 font-semibold text-lg text-muted-foreground">Feature</div>
                                    <div className="col-span-1 font-bold text-xl text-center text-primary">9anon AI (Us)</div>
                                    <div className="col-span-1 font-semibold text-lg text-center text-muted-foreground">Other Tools</div>
                                </div>

                                <div className="divide-y divide-border/10">
                                    <div className="grid grid-cols-3 p-6 hover:bg-muted/10 transition-colors">
                                        <div className="col-span-1 font-medium flex items-center">Speed</div>
                                        <div className="col-span-1 text-center font-bold text-emerald-500 bg-emerald-500/10 py-1 px-3 rounded-full mx-auto w-fit">
                                            Instant (0.8s)
                                        </div>
                                        <div className="col-span-1 text-center text-muted-foreground flex items-center justify-center">Slow</div>
                                    </div>

                                    <div className="grid grid-cols-3 p-6 hover:bg-muted/10 transition-colors">
                                        <div className="col-span-1 font-medium flex items-center">Mobile View</div>
                                        <div className="col-span-1 text-center font-bold text-emerald-500 bg-emerald-500/10 py-1 px-3 rounded-full mx-auto w-fit">
                                            Perfect
                                        </div>
                                        <div className="col-span-1 text-center text-muted-foreground flex items-center justify-center">Scattered</div>
                                    </div>

                                    <div className="grid grid-cols-3 p-6 hover:bg-muted/10 transition-colors">
                                        <div className="col-span-1 font-medium flex items-center">Login Required?</div>
                                        <div className="col-span-1 text-center font-bold text-emerald-500 bg-emerald-500/10 py-1 px-3 rounded-full mx-auto w-fit">
                                            Open Access
                                        </div>
                                        <div className="col-span-1 text-center text-destructive flex items-center justify-center">Forced Login</div>
                                    </div>

                                    <div className="grid grid-cols-3 p-6 hover:bg-muted/10 transition-colors">
                                        <div className="col-span-1 font-medium flex items-center">Cost</div>
                                        <div className="col-span-1 text-center font-bold text-emerald-500 bg-emerald-500/10 py-1 px-3 rounded-full mx-auto w-fit">
                                            Try Free
                                        </div>
                                        <div className="col-span-1 text-center text-muted-foreground flex items-center justify-center">Paid / Limited</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/chat"
                                className="inline-flex items-center gap-3 btn-premium px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-gold/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:shadow-gold/30 hover:scale-105 transition-all duration-300 group"
                            >
                                <span>Try It Free Now</span>
                                <svg className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <p className="mt-4 text-sm text-muted-foreground">No credit card required • Instant access</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
