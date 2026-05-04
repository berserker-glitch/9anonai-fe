"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

// ─────────────────────────────────────────────────────────────────────────────
// Inline trilingual translations — self-contained, no async loading needed
// ─────────────────────────────────────────────────────────────────────────────
const REFERRALS_PER_MONTH = 5;

const T = {
    ar: {
        title: "ادعُ أصدقاءك",
        subtitle: "ادعُ 5 أصدقاء وستحصل على شهر مجاني كامل حين تُطلق الاشتراكات",
        close: "إغلاق",
        stats_invited: "صديق مدعو",
        stats_earned: "شهر مجاني مكسوب",
        stats_none: "لا أحد بعد",
        progress_label: "نحو شهرك المجاني القادم",
        progress_done: "أحسنت! لقد ربحت شهراً مجانياً",
        link_label: "رابطك الشخصي للدعوة",
        code_label: "رمز الدعوة",
        copy: "نسخ",
        copied: "تم النسخ ✓",
        whatsapp: "شارك عبر واتساب",
        whatsapp_msg: "أهلاً! استخدم 9anon AI لأسئلتك القانونية — أذكى مساعد قانوني. سجّل عبر رابطي: ",
        how_title: "كيف يعمل؟",
        s1_title: "شارك رابطك",
        s1_desc: "أرسل رابطك الشخصي لأصدقائك أو عائلتك أو زملائك عبر واتساب أو أي وسيلة أخرى",
        s2_title: "يُسجّل صديقك",
        s2_desc: "عندما ينشئ أي شخص حساباً جديداً باستخدام رابطك، يُحسب تلقائياً كإحالة ناجحة ومعتمدة",
        s3_title: "تحصل على مكافأتك",
        s3_desc: "كل 5 إحالات ناجحة = شهر مجاني كامل على أي خطة اشتراك مدفوعة عند الإطلاق الرسمي",
        reward_label: "شرط المكافأة",
        reward_value: "5 دعوات = شهر مجاني",
        note: "تُطبَّق المكافآت تلقائياً عند إطلاق الخطط المدفوعة — لا حاجة لأي إجراء إضافي",
        loading: "جاري التحميل...",
        of: "من",
    },
    fr: {
        title: "Invitez vos amis",
        subtitle: "Invitez 5 amis et gagnez 1 mois gratuit au lancement des abonnements",
        close: "Fermer",
        stats_invited: "ami(s) invité(s)",
        stats_earned: "mois gratuit(s) gagné(s)",
        stats_none: "Aucun encore",
        progress_label: "Progression vers votre prochain mois gratuit",
        progress_done: "Bravo ! Vous avez gagné un mois gratuit",
        link_label: "Votre lien de parrainage personnel",
        code_label: "Code de parrainage",
        copy: "Copier",
        copied: "Copié ✓",
        whatsapp: "Partager sur WhatsApp",
        whatsapp_msg: "Salut ! Essaie 9anon AI pour tes questions juridiques — le meilleur assistant juridique. Inscris-toi via mon lien : ",
        how_title: "Comment ça marche ?",
        s1_title: "Partagez votre lien",
        s1_desc: "Envoyez votre lien personnel à vos amis, famille ou collègues via WhatsApp ou tout autre canal",
        s2_title: "Ils s'inscrivent",
        s2_desc: "Dès qu'une personne crée un compte avec votre lien, cela est automatiquement compté comme un parrainage valide",
        s3_title: "Vous recevez votre récompense",
        s3_desc: "5 parrainages validés = 1 mois gratuit sur n'importe quel abonnement payant au lancement officiel",
        reward_label: "Condition de la récompense",
        reward_value: "5 parrainages = 1 mois gratuit",
        note: "Les récompenses sont créditées automatiquement sur votre compte au lancement — aucune action requise",
        loading: "Chargement...",
        of: "sur",
    },
    en: {
        title: "Invite Friends",
        subtitle: "Invite 5 friends and earn 1 free month when paid plans launch",
        close: "Close",
        stats_invited: "friend(s) invited",
        stats_earned: "free month(s) earned",
        stats_none: "None yet",
        progress_label: "Progress toward your next free month",
        progress_done: "You've earned a free month!",
        link_label: "Your personal referral link",
        code_label: "Referral code",
        copy: "Copy link",
        copied: "Copied ✓",
        whatsapp: "Share on WhatsApp",
        whatsapp_msg: "Hey! Try 9anon AI for your legal questions — the smartest legal assistant. Sign up with my link: ",
        how_title: "How it works",
        s1_title: "Share your link",
        s1_desc: "Send your personal referral link to friends, family, or colleagues via WhatsApp or any other channel",
        s2_title: "They sign up",
        s2_desc: "When someone creates a new account using your link, it is automatically counted as a valid referral",
        s3_title: "You earn your reward",
        s3_desc: "Every 5 successful referrals = 1 full free month on any paid subscription plan when we officially launch",
        reward_label: "Reward condition",
        reward_value: "5 referrals = 1 free month",
        note: "Rewards are applied automatically to your account when paid plans launch — no action needed",
        loading: "Loading...",
        of: "of",
    },
} as const;

// ─────────────────────────────────────────────────────────────────────────────

interface ReferralData {
    code: string | null;
    credits: number;
    referralCount: number;
}

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
    const { token } = useAuth();
    const { language, dir } = useLanguage();
    const t = T[language as keyof typeof T] ?? T.en;
    const isRtl = dir === "rtl";

    const [data, setData] = useState<ReferralData | null>(null);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReferralData = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/referrals/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) setData(await res.json());
        } catch { /* silent */ } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (isOpen) fetchReferralData();
    }, [isOpen, fetchReferralData]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const referralLink = data?.code ? `${origin}/register?ref=${data.code}` : null;

    const handleCopy = async () => {
        if (!referralLink) return;
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleWhatsApp = () => {
        if (!referralLink) return;
        const msg = encodeURIComponent(`${t.whatsapp_msg}${referralLink}`);
        window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
    };

    if (!isOpen) return null;

    const count = data?.referralCount ?? 0;
    const freeMonths = Math.floor(count / REFERRALS_PER_MONTH);
    const progressCount = count % REFERRALS_PER_MONTH;
    const progressPct = (progressCount / REFERRALS_PER_MONTH) * 100;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" dir={isRtl ? "rtl" : "ltr"}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal card */}
            <div className="relative z-10 w-full sm:max-w-lg bg-background border border-border/60 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]">

                {/* ── Hero banner ─────────────────────────────────────────── */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ background: "linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%)" }}>

                    {/* Decorative orbs */}
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
                    <div className="absolute -bottom-10 -left-6 w-32 h-32 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />

                    {/* Subtle grid */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }} />

                    <div className={`relative flex items-start justify-between p-6 pb-5 gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <div className={isRtl ? "text-right" : ""}>
                            {/* Icon badge */}
                            <div className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                9anon Referral
                            </div>

                            <h2 className="text-2xl font-bold text-white leading-tight mb-1.5">
                                {t.title}
                            </h2>
                            <p className="text-white/80 text-sm leading-relaxed max-w-[280px]">
                                {t.subtitle}
                            </p>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            title={t.close}
                            className="flex-shrink-0 p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Stats strip */}
                    <div className={`flex border-t border-white/20 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <div className={`flex-1 flex flex-col items-center py-4 gap-0.5 ${!isRtl ? "border-r" : "border-l"} border-white/20`}>
                            <span className="text-3xl font-black text-white tabular-nums">{count}</span>
                            <span className="text-white/70 text-xs font-medium text-center px-2">
                                {count === 0 ? t.stats_none : t.stats_invited}
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col items-center py-4 gap-0.5">
                            <span className="text-3xl font-black text-emerald-200 tabular-nums">{freeMonths}</span>
                            <span className="text-white/70 text-xs font-medium text-center px-2">
                                {freeMonths === 0 ? t.stats_none : t.stats_earned}
                            </span>
                        </div>
                    </div>

                    {/* Progress bar toward next free month */}
                    <div className="px-5 pb-4 border-t border-white/10 pt-3">
                        <div className={`flex items-center justify-between mb-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                            <span className="text-white/70 text-xs">
                                {progressCount === 0 && freeMonths > 0 ? t.progress_done : t.progress_label}
                            </span>
                            <span className="text-white text-xs font-bold tabular-nums">
                                {progressCount} {t.of} {REFERRALS_PER_MONTH}
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                    width: `${progressCount === 0 && freeMonths > 0 ? 100 : progressPct}%`,
                                    background: "linear-gradient(90deg, #6ee7b7, #fff)",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Scrollable body ──────────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    <div className="p-5 space-y-5">

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                <svg className="animate-spin w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                <span className="text-sm text-muted-foreground">{t.loading}</span>
                            </div>
                        ) : (
                            <>
                                {/* ── Referral link ─────────────────────────────── */}
                                <div className="space-y-2.5">
                                    <label className={`text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 ${isRtl ? "flex-row-reverse justify-end" : ""}`}>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        {t.link_label}
                                    </label>

                                    {/* Link box */}
                                    <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                                        <div className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border/60 font-mono text-xs text-muted-foreground truncate select-all cursor-text" title={referralLink ?? ""}>
                                            {referralLink ?? "—"}
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            disabled={!referralLink}
                                            className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs text-white disabled:opacity-40 transition-all active:scale-95"
                                            style={{ background: copied ? "#059669" : "linear-gradient(135deg, #059669, #0891b2)" }}
                                        >
                                            {copied ? (
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {copied ? t.copied : t.copy}
                                        </button>
                                    </div>

                                    {/* Referral code badge */}
                                    {data?.code && (
                                        <div className={`flex items-center gap-2 text-xs text-muted-foreground ${isRtl ? "flex-row-reverse" : ""}`}>
                                            <span className="opacity-60">{t.code_label}:</span>
                                            <span className="font-mono font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md tracking-widest">{data.code}</span>
                                        </div>
                                    )}

                                    {/* WhatsApp button */}
                                    <button
                                        onClick={handleWhatsApp}
                                        disabled={!referralLink}
                                        className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-semibold text-sm text-white bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-40 transition-all active:scale-[0.98] ${isRtl ? "flex-row-reverse" : ""}`}
                                    >
                                        {/* WhatsApp icon */}
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        {t.whatsapp}
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-border/50" />

                                {/* ── How it works ──────────────────────────────── */}
                                <div>
                                    <p className={`text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {t.how_title}
                                    </p>

                                    <div className="space-y-0">
                                        {[
                                            { num: "1", icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", title: t.s1_title, desc: t.s1_desc },
                                            { num: "2", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", title: t.s2_title, desc: t.s2_desc },
                                            { num: "3", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7", title: t.s3_title, desc: t.s3_desc },
                                        ].map((step, i) => (
                                            <div key={i} className={`flex gap-3.5 relative ${isRtl ? "flex-row-reverse" : ""}`}>
                                                {/* Connector line */}
                                                {i < 2 && (
                                                    <div className={`absolute top-8 ${isRtl ? "right-[18px]" : "left-[18px]"} w-px h-[calc(100%-8px)] bg-border/60`} />
                                                )}

                                                {/* Step bubble */}
                                                <div
                                                    style={{ background: i === 2 ? "linear-gradient(135deg, #059669, #0891b2)" : undefined }}
                                                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm z-10 ${i === 2 ? "text-white" : "bg-muted text-muted-foreground border border-border/60"}`}
                                                >
                                                    {i === 2 ? (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : step.num}
                                                </div>

                                                {/* Content */}
                                                <div className={`pb-5 flex-1 min-w-0 ${isRtl ? "text-right" : ""}`}>
                                                    <p className="text-sm font-bold text-foreground mb-0.5">{step.title}</p>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Reward callout ────────────────────────────── */}
                                <div className="rounded-2xl overflow-hidden border border-amber-200/30 dark:border-amber-400/20">
                                    <div className="flex items-center gap-3 bg-amber-50/80 dark:bg-amber-950/30 px-4 py-3.5" style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
                                        <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0 text-lg">
                                            🎁
                                        </div>
                                        <div className={`flex-1 min-w-0 ${isRtl ? "text-right" : ""}`}>
                                            <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">{t.reward_label}</p>
                                            <p className="text-base font-black text-amber-900 dark:text-amber-200">{t.reward_value}</p>
                                        </div>
                                        <div className="shrink-0 text-2xl">✨</div>
                                    </div>
                                    <div className={`px-4 py-3 bg-amber-50/40 dark:bg-amber-950/10 border-t border-amber-200/30 dark:border-amber-400/10 ${isRtl ? "text-right" : ""}`}>
                                        <p className="text-xs text-amber-700/80 dark:text-amber-400/70 leading-relaxed">{t.note}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
