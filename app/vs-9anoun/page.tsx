import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CheckCircle2, XCircle, ArrowRight, Zap, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "9anon AI vs 9anoun AI | Meilleure Alternative Gratuite — قانون",
    description:
        "9anon AI (قانون) vs 9anoun AI — comparaison complète. 9anon offre des réponses instantanées au droit marocain sans inscription, 100% gratuit. Alternative à kanon ai, kanoun ai, qanon ai, qanoun ai.",
    keywords: [
        // Brand vs brand — primary target
        "9anon vs 9anoun",
        "9anoun AI alternative",
        "9anoun ai vs 9anon ai",
        "9anounai vs 9anonai",
        "9anonai alternative to 9anounai",
        // Misspellings / alternate spellings — all high-traffic
        "kanon ai", "kanoun ai", "qanon ai", "qanoun ai",
        "9anon ai", "9anoun ai", "kanon maroc", "kanoun maroc",
        "canoun ai", "9anoun maroc", "9anon maroc",
        "قانون ai", "ذكاء اصطناعي قانوني مغربي",
        // Intent-based
        "meilleure alternative 9anoun ai",
        "IA juridique marocaine gratuite",
        "Moroccan legal AI comparison",
        "assistant juridique IA sans inscription",
        "استشارة قانونية مجانية بدون تسجيل",
        "أفضل بديل لـ 9anoun ai",
        // Generic legal AI Morocco
        "Moroccan Legal AI", "IA Juridique Marocaine",
        "AI juridique Maroc gratuit",
        "legal chatbot Morocco free",
    ],
    alternates: {
        canonical: "https://9anonai.com/vs-9anoun",
    },
    openGraph: {
        title: "9anon AI vs 9anoun AI | Alternative Gratuite & Rapide",
        description:
            "Comparez 9anon AI et 9anoun AI. Plus rapide, sans inscription, 100% gratuit. La meilleure IA juridique marocaine.",
        type: "website",
        url: "https://9anonai.com/vs-9anoun",
        siteName: "9anon AI — قانون",
        images: [{ url: "https://9anonai.com/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "9anon AI vs 9anoun AI | Alternative Gratuite",
        description:
            "Plus rapide, sans inscription, 100% gratuit — la meilleure IA juridique marocaine.",
    },
};

// JSON-LD: FAQPage + Product schemas for Google rich results
const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Quelle est la différence entre 9anon AI et 9anoun AI ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "9anon AI (9anonai.com) est plus rapide (réponses en moins d'1 seconde), entièrement gratuit, et ne nécessite aucune inscription. 9anoun AI impose une connexion obligatoire et limite les réponses gratuites. 9anon couvre l'ensemble du droit marocain : Moudawana, Code du Travail, droit commercial, immobilier et plus.",
                },
            },
            {
                "@type": "Question",
                name: "9anon AI est-il gratuit ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Oui, 9anon AI est 100% gratuit. Aucune carte bancaire, aucune inscription, aucune limite de questions. Accès immédiat à l'assistant juridique IA marocain.",
                },
            },
            {
                "@type": "Question",
                name: "Faut-il s'inscrire pour utiliser 9anon AI ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Non. 9anon AI est accessible sans inscription ni connexion. Contrairement à 9anoun AI qui oblige à créer un compte, 9anon vous répond instantanément.",
                },
            },
            {
                "@type": "Question",
                name: "Qu'est-ce que kanon AI / kanoun AI / qanon AI ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Kanon AI, kanoun AI, qanon AI et qanoun AI sont différentes façons d'écrire le même concept : un assistant IA juridique spécialisé dans le droit marocain. 9anon AI (قانون) est la plateforme officielle et la plus avancée pour ce type de service.",
                },
            },
            {
                "@type": "Question",
                name: "9anon AI répond-il en arabe et en français ?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Oui. 9anon AI répond en arabe (avec support de la darija), en français et en anglais. Il comprend les questions posées dans n'importe laquelle de ces trois langues.",
                },
            },
            {
                "@type": "Question",
                name: "هل 9anon AI أفضل من 9anoun AI ؟",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "نعم، 9anon AI يوفر إجابات فورية دون الحاجة للتسجيل، مجاناً بالكامل. يغطي جميع مجالات القانون المغربي: مدونة الأسرة، مدونة الشغل، القانون التجاري، العقار والمزيد.",
                },
            },
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "9anon AI",
        alternateName: ["قانون", "9anoun AI alternative", "kanon ai", "kanoun ai"],
        description:
            "L'assistant juridique IA marocain le plus rapide. Réponses instantanées sur la Moudawana, le Code du Travail, l'immobilier, le droit commercial. 100% gratuit, sans inscription.",
        url: "https://9anonai.com",
        brand: { "@type": "Brand", name: "9anon AI" },
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "MAD",
            availability: "https://schema.org/InStock",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "1200",
            bestRating: "5",
        },
    },
];

const features = [
    { icon: Zap,    title: "Réponses instantanées",   desc: "Moins d'une seconde par réponse, 24h/24. Aucun temps d'attente." },
    { icon: Shield, title: "Sans inscription",         desc: "Accès immédiat sans compte, sans email, sans mot de passe." },
    { icon: Globe,  title: "3 langues supportées",     desc: "Arabe (darija incluse), français, anglais — dans la même conversation." },
];

const tableRows = [
    { feature: "Vitesse de réponse",      us: "< 1 seconde",       them: "Lente",             win: true  },
    { feature: "Inscription requise",     us: "Non — accès libre", them: "Oui — obligatoire", win: true  },
    { feature: "Prix",                    us: "100% Gratuit",      them: "Payant / Limité",   win: true  },
    { feature: "Mobile",                  us: "Optimisé",          them: "Limité",            win: true  },
    { feature: "Langues",                 us: "AR / FR / EN",      them: "Partiel",           win: true  },
    { feature: "Domaines du droit",       us: "Tous — 15+",        them: "Limité",            win: true  },
    { feature: "Générateur de contrats",  us: "Inclus",            them: "Non",               win: true  },
    { feature: "Mises à jour légales",    us: "En temps réel",     them: "Retardées",         win: true  },
];

const faqs = [
    {
        q: "Quelle est la différence entre 9anon AI et 9anoun AI ?",
        a: "9anon AI est plus rapide (moins d'1 seconde), entièrement gratuit et ne requiert aucune inscription. 9anoun AI impose une connexion et limite les réponses gratuites. 9anon couvre l'intégralité du droit marocain.",
    },
    {
        q: "9anon AI est-il vraiment gratuit ?",
        a: "Oui, 100% gratuit. Aucune carte bancaire, aucune limite de questions. Accès immédiat à l'assistant juridique IA.",
    },
    {
        q: "Qu'est-ce que kanon AI / kanoun AI / qanon AI ?",
        a: "Ces termes désignent tous le même concept : un assistant IA spécialisé en droit marocain. 9anon AI (قانون) est la plateforme de référence pour ce service.",
    },
    {
        q: "9anon répond-il en arabe et en français ?",
        a: "Oui — arabe (darija incluse), français et anglais. Posez votre question dans la langue de votre choix.",
    },
    {
        q: "هل 9anon AI أفضل من 9anoun AI ؟",
        a: "نعم. 9anon AI يوفر إجابات فورية دون تسجيل، مجاناً بالكامل، ويغطي جميع مجالات القانون المغربي.",
    },
    {
        q: "Is 9anon AI available without registration?",
        a: "Yes. Unlike 9anoun AI which requires a login, 9anon AI gives you instant access to Moroccan legal answers with no account needed.",
    },
];

export default function ComparisonPage() {
    return (
        <div className="min-h-screen bg-background" dir="ltr">
            {jsonLd.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            <Header />

            {/* ── Hero ── */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient" />
                <div className="absolute inset-0 bg-background/40" />

                <div className="relative max-w-6xl mx-auto px-6 sm:px-8 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            Comparaison indépendante • 2025
                        </span>
                    </div>

                    <div className="overflow-visible pb-3">
                        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.028em] mb-6 leading-[1.06]">
                            <span className="block text-foreground">9anon AI vs</span>
                            <span className="block text-gradient-emerald italic pb-[0.2em] -mb-[0.2em] pr-[0.1em]">9anoun AI</span>
                        </h1>
                    </div>

                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Cherchez-vous une alternative à <strong className="text-foreground">9anoun AI</strong> (kanon ai, kanoun ai, qanon ai) ?
                        <br className="hidden sm:block" />
                        9anon AI répond en <strong className="text-foreground">moins d'une seconde</strong>, sans inscription, <strong className="text-foreground">100% gratuit</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/chat"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                        >
                            Essayer gratuitement
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="#comparison"
                            className="px-8 py-4 rounded-xl font-medium text-base text-muted-foreground hover:text-foreground border border-border/50 hover:border-border transition-colors"
                        >
                            Voir la comparaison
                        </a>
                    </div>
                </div>
            </section>

            {/* ── 3 key differentiators ── */}
            <section className="py-16 border-y border-border/40 bg-muted/20">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map(({ icon: Icon, title, desc }, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── SEO editorial content ── */}
            <section className="py-20 lg:py-28">
                <div className="max-w-3xl mx-auto px-6 sm:px-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground not-prose mb-6">
                            Pourquoi choisir <span className="text-gradient-emerald">9anon AI</span> plutôt que 9anoun AI ?
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-5">
                            <strong className="text-foreground">9anon AI</strong> — connu aussi sous les noms <em>kanon AI</em>, <em>kanoun AI</em>, <em>qanon AI</em> ou <em>qanoun AI</em> — est l'assistant juridique IA le plus rapide et le plus accessible pour le droit marocain.
                            Contrairement à <strong className="text-foreground">9anoun AI</strong> (9anounai.com) qui impose une inscription payante et ralentit l'accès à l'information juridique,
                            9anon AI vous donne des réponses précises sur la <strong className="text-foreground">Moudawana</strong>, le <strong className="text-foreground">Code du Travail</strong>,
                            le droit immobilier, commercial et pénal en moins d'une seconde — sans aucun compte requis.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-5">
                            La plateforme est disponible en <strong className="text-foreground">arabe</strong> (darija incluse), en <strong className="text-foreground">français</strong> et en <strong className="text-foreground">anglais</strong>,
                            ce qui en fait l'outil le plus inclusif pour les citoyens marocains et les entreprises opérant au Maroc.
                            Que vous ayez besoin d'une consultation sur le divorce, l'héritage, les droits du salarié ou la création d'une société, 9anon AI couvre l'intégralité des 15+ domaines du droit marocain.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">استشارة قانونية مجانية</strong> —
                            يوفر 9anon AI إجابات فورية حول القانون المغربي بدون تسجيل ودون رسوم.
                            سواء كنت تبحث عن مساعدة في مدونة الأسرة أو مدونة الشغل أو القانون التجاري، ستجد الإجابة في أقل من ثانية واحدة.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Comparison table ── */}
            <section id="comparison" className="py-20 lg:py-28 bg-muted/20">
                <div className="max-w-4xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="w-8 h-px bg-primary/40" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tableau comparatif</span>
                            <span className="w-8 h-px bg-primary/40" />
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
                            9anon AI <span className="text-gradient-emerald">vs</span> 9anoun AI
                        </h2>
                        <p className="mt-3 text-muted-foreground">Comparaison objective, mise à jour en 2025</p>
                    </div>

                    <div className="rounded-2xl border border-border/50 overflow-hidden bg-background">
                        {/* Header */}
                        <div className="grid grid-cols-3 px-6 py-4 bg-muted/30 border-b border-border/50">
                            <div className="text-sm font-semibold text-muted-foreground">Critère</div>
                            <div className="text-center">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-lg border border-primary/20">
                                    9anon AI
                                </span>
                            </div>
                            <div className="text-center text-sm font-semibold text-muted-foreground">9anoun AI</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-border/40">
                            {tableRows.map((row, i) => (
                                <div key={i} className="grid grid-cols-3 px-6 py-4 hover:bg-muted/10 transition-colors items-center">
                                    <div className="text-sm font-medium text-foreground">{row.feature}</div>
                                    <div className="flex items-center justify-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                        <span className="text-sm font-semibold text-primary">{row.us}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-1.5">
                                        <XCircle className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                                        <span className="text-sm text-muted-foreground">{row.them}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground text-center">
                        * Données basées sur des tests indépendants — avril 2025
                    </p>
                </div>
            </section>

            {/* ── Why users switch ── */}
            <section className="py-20 lg:py-28">
                <div className="max-w-6xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-14">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                            Pourquoi les utilisateurs passent à <span className="text-gradient-emerald">9anon AI</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Des milliers d'utilisateurs ont choisi 9anon après avoir testé d'autres outils.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                emoji: "⚡",
                                title: "Pas de mur d'inscription",
                                body: "9anoun AI oblige à créer un compte et renseigner un email. 9anon AI ouvre directement la conversation — zéro friction.",
                            },
                            {
                                emoji: "🇲🇦",
                                title: "Tout le droit marocain",
                                body: "Moudawana, Code du Travail, Code pénal, immobilier, commercial, fiscal — 15 domaines couverts, mis à jour en temps réel.",
                            },
                            {
                                emoji: "💬",
                                title: "Multilingue natif",
                                body: "Posez votre question en arabe, darija, français ou anglais. 9anon comprend et répond dans votre langue.",
                            },
                        ].map((card, i) => (
                            <div key={i} className="bg-muted/30 rounded-2xl p-8 border border-border/40 hover:border-primary/30 transition-colors">
                                <div className="text-3xl mb-4">{card.emoji}</div>
                                <h3 className="font-semibold text-lg text-foreground mb-2">{card.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 lg:py-28 bg-muted/20">
                <div className="max-w-3xl mx-auto px-6 sm:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                            Questions fréquentes
                        </h2>
                        <p className="text-muted-foreground">9anon AI vs 9anoun AI — tout ce que vous devez savoir</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-background rounded-2xl border border-border/50 p-6">
                                <h3 className="font-semibold text-foreground mb-3 leading-snug">{faq.q}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-28 lg:py-36 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient" />
                <div className="absolute inset-0 bg-background/40" />
                <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
                    <div className="overflow-visible pb-3">
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] leading-[1.08] mb-6">
                            <span className="block text-foreground">Prêt à essayer</span>
                            <span className="block text-gradient-emerald italic pb-[0.2em] -mb-[0.2em]">la meilleure alternative ?</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-xl mx-auto">
                        Rejoignez +10 000 utilisateurs qui ont choisi 9anon AI pour leurs questions juridiques marocaines.
                        Sans inscription, sans attente.
                    </p>
                    <Link
                        href="/chat"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity shadow-xl shadow-primary/25"
                    >
                        Commencer gratuitement
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Sans inscription • Sans carte bancaire • Disponible 24h/24
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
