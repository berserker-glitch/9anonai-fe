"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/language-context";

export function ExpandedLandingSections() {
    const { t } = useTranslation("landing");

    return (
        <>
            {/* Target Audience / Use Cases */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                            Who uses <span className="text-gradient-emerald">9anon AI</span>?
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Designed for everyone who needs quick, reliable legal guidance in Morocco.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Employees", desc: "Understand labor rights, contracts & wrongful termination.", icon: "👨‍💼" },
                            { title: "Tenants & Landlords", desc: "Rental agreements, disputes & eviction procedures.", icon: "🏠" },
                            { title: "Entrepreneurs", desc: "Company creation, taxation & commercial law.", icon: "🚀" },
                            { title: "Expats", desc: "Residency, visas & marriage laws in Morocco.", icon: "🌍" },
                        ].map((item, i) => (
                            <div key={i} className="glass-premium p-8 rounded-2xl hover:border-primary/40 transition-all hover:-translate-y-1 duration-300">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Teaser */}
            <section className="py-24 bg-muted/20 relative">
                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="glass-premium rounded-3xl p-8 sm:p-12 lg:p-16 border-glow-gold text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-[100px]" />

                        <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
                            Stop waiting for answers. <br />
                            9anon AI is <span className="text-gradient-gold">Instant</span>.
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="w-3 h-3 rounded-full bg-red-500/50" />
                                Other Tools: Force Login • Slow
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-border" />
                            <div className="flex items-center gap-2 text-foreground font-medium">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                                9anon AI: No Login • 0.8s
                            </div>
                        </div>

                        <Link
                            href="/vs-9anoun"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
                        >
                            <span>See the full comparison</span>
                            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 relative">
                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 text-center">
                        Trusted by Moroccans Daily
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { text: "Fastest legal answer I ever got. Helped me ensure my rental contract was valid.", author: "Karim, Casablanca" },
                            { text: "I was confused about the new labor laws. This explained it instantly.", author: "Salma, Rabat" },
                            { text: "Better than waiting for an appointment. Good for initial guidance.", author: "Mehdi, Tangier" },
                        ].map((t, i) => (
                            <div key={i} className="glass-premium p-8 rounded-2xl relative">
                                <span className="absolute top-4 right-6 text-6xl text-primary/10 font-serif leading-none">"</span>
                                <p className="text-lg text-muted-foreground mb-6 relative z-10">{t.text}</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                        {t.author[0]}
                                    </div>
                                    <span className="font-medium">{t.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-muted/30">
                <div className="max-w-3xl mx-auto px-6 sm:px-8">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {[
                            { q: "Is 9anon AI free?", a: "Yes, you can use 9anon AI for free without any login required. We believe legal information should be accessible to everyone." },
                            { q: "Is the information accurate?", a: "We use official Moroccan legal texts and codes. However, this is an AI assistant for guidance, not a substitute for a human lawyer for complex cases." },
                            { q: "Can I ask in Darija?", a: "Yes! 9anon AI understands and speaks Darija, Arabic, French, and English fluently." },
                        ].map((faq, i) => (
                            <div key={i} className="glass-premium rounded-xl px-8 py-6 cursor-default hover:bg-background/60 transition-colors">
                                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
