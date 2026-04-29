"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const T: Record<string, Record<string, string>> = {
    title: {
        ar: "سياسة الاسترداد",
        fr: "Politique de remboursement",
        en: "Refund Policy",
    },
    updated: {
        ar: "آخر تحديث: 29 أبريل 2026",
        fr: "Dernière mise à jour : 29 avril 2026",
        en: "Last updated: April 29, 2026",
    },
    // Section titles
    s1_title: {
        ar: "1. ضمان استرداد الأموال لمدة 14 يوماً",
        fr: "1. Garantie de remboursement de 14 jours",
        en: "1. 14-Day Money-Back Guarantee",
    },
    s1_body: {
        ar: "إذا لم تكن راضياً عن اشتراكك في 9anon AI لأي سبب كان، يمكنك طلب استرداد كامل خلال 14 يوماً من تاريخ أول دفعة. لا أسئلة، لا قيود.",
        fr: "Si vous n'êtes pas satisfait de votre abonnement 9anon AI pour quelque raison que ce soit, vous pouvez demander un remboursement complet dans les 14 jours suivant votre premier paiement. Sans questions, sans conditions.",
        en: "If you are not satisfied with your 9anon AI subscription for any reason, you may request a full refund within 14 days of your first payment. No questions asked.",
    },
    s2_title: {
        ar: "2. كيفية طلب الاسترداد",
        fr: "2. Comment demander un remboursement",
        en: "2. How to Request a Refund",
    },
    s2_body: {
        ar: "أرسل بريداً إلكترونياً إلى contact@9anonai.com من العنوان المرتبط بحسابك، مع ذكر 'استرداد' في الموضوع. سيتم معالجة طلبك خلال 3 أيام عمل، وستتلقى المبلغ على بطاقتك الأصلية خلال 5-10 أيام عمل حسب مزود الدفع.",
        fr: "Envoyez un e-mail à contact@9anonai.com depuis l'adresse associée à votre compte, avec 'Remboursement' en objet. Votre demande sera traitée dans les 3 jours ouvrés ; le montant sera recrédité sur votre moyen de paiement d'origine sous 5 à 10 jours ouvrés selon votre prestataire bancaire.",
        en: "Send an email to contact@9anonai.com from the address linked to your account, with 'Refund' in the subject line. Your request will be processed within 3 business days; the amount will be returned to your original payment method within 5–10 business days depending on your bank.",
    },
    s3_title: {
        ar: "3. الاشتراكات المتجددة",
        fr: "3. Renouvellements d'abonnement",
        en: "3. Subscription Renewals",
    },
    s3_body: {
        ar: "تُجدَّد الاشتراكات تلقائياً كل شهر. يمكنك إلغاء اشتراكك في أي وقت من صفحة الإعدادات قبل تاريخ التجديد لتجنب الرسوم التالية. لا يُسترد المبلغ عن فترات التجديد بعد انقضاء 14 يوماً من تاريخ كل تجديد.",
        fr: "Les abonnements se renouvellent automatiquement chaque mois. Vous pouvez annuler à tout moment depuis la page Paramètres avant la date de renouvellement pour éviter la prochaine facturation. Les frais de renouvellement ne sont pas remboursables après le délai de 14 jours suivant chaque renouvellement.",
        en: "Subscriptions renew automatically each month. You may cancel at any time from the Settings page before your renewal date to avoid the next charge. Renewal charges are non-refundable after 14 days from each renewal date.",
    },
    s4_title: {
        ar: "4. الاستثناءات",
        fr: "4. Exceptions",
        en: "4. Exceptions",
    },
    s4_body: {
        ar: "لا يسري ضمان الاسترداد في الحالات التالية: سوء الاستخدام أو انتهاك شروط الخدمة، أو الطلبات المقدَّمة بعد انقضاء 14 يوماً، أو الحسابات التي سبق أن استفادت منه سابقاً.",
        fr: "La garantie de remboursement ne s'applique pas en cas d'abus ou de violation des Conditions d'utilisation, de demandes soumises après le délai de 14 jours, ou de comptes en ayant déjà bénéficié.",
        en: "The money-back guarantee does not apply in cases of abuse or violation of the Terms of Service, requests submitted after 14 days, or accounts that have previously benefited from it.",
    },
    s5_title: {
        ar: "5. معالج الدفع",
        fr: "5. Traitement des paiements",
        en: "5. Payment Processor",
    },
    s5_body: {
        ar: "تُعالَج جميع المدفوعات بواسطة Paddle.com Market Limited، وهي التاجر القانوني المسؤول (Merchant of Record) عن جميع معاملاتنا. قد تحمل كشوفاتك البنكية اسم 'Paddle.com' بدلاً من 9anon AI. يخضع استرداد الأموال لسياسات Paddle الإضافية المتاحة على paddle.com.",
        fr: "Tous les paiements sont traités par Paddle.com Market Limited, marchand de référence légal (Merchant of Record) pour l'ensemble de nos transactions. Votre relevé bancaire peut mentionner 'Paddle.com' plutôt que 9anon AI. Les remboursements sont également soumis aux politiques complémentaires de Paddle disponibles sur paddle.com.",
        en: "All payments are processed by Paddle.com Market Limited, the legal Merchant of Record for all our transactions. Your bank statement may show 'Paddle.com' instead of 9anon AI. Refunds are also subject to Paddle's additional policies available at paddle.com.",
    },
    s6_title: {
        ar: "6. التواصل معنا",
        fr: "6. Nous contacter",
        en: "6. Contact Us",
    },
    s6_body: {
        ar: "لأي استفسار بشأن الفواتير أو الاستردادات، تواصل معنا عبر:",
        fr: "Pour toute question concernant la facturation ou les remboursements, contactez-nous via :",
        en: "For any billing or refund questions, contact us at:",
    },
    back_pricing: {
        ar: "عرض خطط الأسعار",
        fr: "Voir les tarifs",
        en: "View pricing plans",
    },
};

function t(key: string, lang: string): string {
    return T[key]?.[lang] ?? T[key]?.["en"] ?? key;
}

const SECTIONS = [
    "s1", "s2", "s3", "s4", "s5", "s6",
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function RefundPolicyPage() {
    const { language, dir } = useLanguage();

    return (
        <div className="min-h-screen bg-background flex flex-col" dir={dir}>
            <Header />

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-16 md:py-24">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {t("title", language)}
                    </h1>
                    <p className="text-sm text-muted-foreground">{t("updated", language)}</p>
                </div>

                {/* Guarantee badge */}
                <div className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-5 flex items-start gap-4">
                    <span className="text-3xl shrink-0">🛡️</span>
                    <div>
                        <p className="font-semibold text-sm mb-1">{t("s1_title", language)}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t("s1_body", language)}</p>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                    {(["s2", "s3", "s4", "s5"] as const).map((key) => (
                        <section key={key}>
                            <h2 className="text-base font-semibold mb-2">{t(`${key}_title`, language)}</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{t(`${key}_body`, language)}</p>
                        </section>
                    ))}

                    {/* Contact section */}
                    <section>
                        <h2 className="text-base font-semibold mb-2">{t("s6_title", language)}</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t("s6_body", language)}</p>
                        <a
                            href="mailto:contact@9anonai.com"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            contact@9anonai.com
                        </a>
                    </section>
                </div>

                {/* Back to pricing */}
                <div className="mt-12 pt-8 border-t border-border">
                    <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        ← {t("back_pricing", language)}
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
