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
        ar: "1. فترة استرداد لمدة 14 يوماً",
        fr: "1. Fenêtre de remboursement de 14 jours",
        en: "1. 14-Day Refund Window",
    },
    s1_body: {
        ar: "كل دفعة للخطة المهنية هي رسوم شهرية منفردة لمرة واحدة بقيمة 5.00 دولارات أمريكية تشتري شهراً واحداً من الوصول. إذا لم تكن راضياً، يمكنك طلب الاسترداد خلال 14 يوماً من تلك الدفعة.",
        fr: "Chaque paiement Pro est une charge mensuelle unique et distincte de 5,00 $ US qui achète un mois d'accès. Si vous n'êtes pas satisfait, vous pouvez demander un remboursement dans les 14 jours suivant cette charge.",
        en: "Each Pro payment is a separate one-time US$5.00 monthly charge that buys one month of access. If you are not satisfied, you may request a refund within 14 days of that charge.",
    },
    s2_title: {
        ar: "2. كيفية طلب الاسترداد",
        fr: "2. Comment demander un remboursement",
        en: "2. How to Request a Refund",
    },
    s2_body: {
        ar: "أرسل بريداً إلكترونياً إلى contact@9anonai.com من العنوان المرتبط بحسابك، مع ذكر 'استرداد' في الموضوع. تُعاد الاستردادات المعتمدة عبر PayPal إلى وسيلة الدفع الأصلية؛ وقد يستغرق PayPal أو بنكك 5-10 أيام عمل لإظهار المبلغ.",
        fr: "Envoyez un e-mail à contact@9anonai.com depuis l'adresse associée à votre compte, avec 'Remboursement' en objet. Les remboursements approuvés sont effectués via PayPal sur votre moyen de paiement d'origine ; PayPal ou votre banque peut prendre 5 à 10 jours ouvrés pour afficher le remboursement.",
        en: "Send an email to contact@9anonai.com from the address linked to your account, with 'Refund' in the subject line. Approved refunds are returned through PayPal to your original payment method; PayPal or your bank may take 5-10 business days to post the refund.",
    },
    s3_title: {
        ar: "3. دفعات شهرية لمرة واحدة",
        fr: "3. Paiements mensuels uniques",
        en: "3. One-Time Monthly Payments",
    },
    s3_body: {
        ar: "تتجدد الخطة المهنية يدوياً كل شهر. لا توجد خصومات تلقائية ولا خطوة إلغاء: إذا لم تدفع الفاتورة الشهرية التالية، يعود حسابك إلى الخطة الأساسية المجانية بعد انتهاء الفترة المدفوعة مسبقاً.",
        fr: "Le plan Pro se renouvelle manuellement chaque mois. Il n'y a aucun prélèvement automatique ni étape de résiliation : si vous ne payez pas la prochaine facture mensuelle, votre compte revient au plan gratuit Basic après la fin de la période déjà payée.",
        en: "Pro renews manually each month. There are no automatic charges and no cancellation step: if you do not pay the next monthly invoice, your account returns to the free Basic plan after the period already paid for ends.",
    },
    s4_title: {
        ar: "4. الاستثناءات",
        fr: "4. Exceptions",
        en: "4. Exceptions",
    },
    s4_body: {
        ar: "لا تسري الاستردادات على الطلبات المقدَّمة بعد مرور أكثر من 14 يوماً على الدفعة، ولا على الحسابات التي سبق أن استفادت من استرداد، ولا على الحسابات المنهية بسبب انتهاك شروط الخدمة.",
        fr: "Les remboursements ne s'appliquent pas aux demandes faites plus de 14 jours après une charge, aux comptes ayant déjà bénéficié d'un remboursement, ni aux comptes résiliés pour violation des Conditions d'utilisation.",
        en: "Refunds do not apply to requests made more than 14 days after a charge, to accounts that have previously received a refund, or to accounts terminated for Terms of Service violations.",
    },
    s5_title: {
        ar: "5. مدفوعات PayPal",
        fr: "5. Paiements PayPal",
        en: "5. PayPal Payments",
    },
    s5_body: {
        ar: "تُعالَج المدفوعات بشكل آمن عبر PayPal. 9anon هي البائع والتاجر القانوني المسؤول عن جميع عمليات الشراء، وقد يُظهر كشف حسابك PayPal / 9anon. لا نخزّن بيانات البطاقة؛ وتصدر الاستردادات المعتمدة عبر PayPal إلى وسيلة الدفع الأصلية.",
        fr: "Les paiements sont traités de manière sécurisée via PayPal. 9anon est le vendeur et le marchand de référence pour tous les achats, et votre relevé peut afficher PayPal / 9anon. Nous ne stockons pas les données de carte ; les remboursements approuvés sont émis via PayPal vers le moyen de paiement d'origine.",
        en: "Payments are processed securely through PayPal. 9anon is the seller and merchant of record for all purchases, and your statement may show PayPal / 9anon. We do not store card details; approved refunds are issued through PayPal to the original payment method.",
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
