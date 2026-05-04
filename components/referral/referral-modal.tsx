"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

// ─────────────────────────────────────────────────────────────────────────────
// The milestone: invite 5 people → unlock 1 free month (one-time reward)
// ─────────────────────────────────────────────────────────────────────────────
const MILESTONE = 5;

const T = {
    ar: {
        badge: "ادعُ أصدقاءك",
        title: "ساعدنا ننمو",
        subtitle: "ادعُ 5 أشخاص — واحصل على شهر مجاني",

        story_title: "قصتنا",
        story: "نحن فريق صغير نؤمن بأن لكل شخص الحق في الحصول على إجابات قانونية، بغض النظر عن ميزانيته. أنشأنا 9anon لسد هذه الفجوة، ونحن في بداياتنا الأولى ونحتاج دعمكم. كل شخص تدعوه يساعدنا على الاستمرار في تقديم المساعدة القانونية المجانية لكل من يحتاجها.",

        milestone_label: "تقدّمك نحو المكافأة",
        milestone_done_title: "أحسنت! لقد فعلتها 🎉",
        milestone_done_sub: "شهر مجاني كامل ينتظرك عند إطلاق الاشتراكات",
        milestone_remaining: (n: number) => `${n} شخص متبقٍ للحصول على مكافأتك`,
        friend: "صديق",

        reward_title: "مكافأتك",
        reward_value: "شهر مجاني",
        reward_desc: "بمجرد دعوة 5 أشخاص وتسجيلهم عبر رابطك، ستحصل على شهر مجاني كامل عند إطلاق خططنا المدفوعة — تلقائياً وبدون أي إجراء منك.",

        link_label: "رابطك الخاص",
        code_label: "الرمز",
        copy: "نسخ الرابط",
        copied: "تم النسخ ✓",
        whatsapp: "شارك عبر واتساب",
        whatsapp_msg: "أهلاً! أنا أستخدم 9anon AI للحصول على إجابات قانونية مجانية — هو حقاً رائع. يستحق التجربة! سجّل عبر رابطي: ",
        close: "إغلاق",
        loading: "جاري التحميل...",
        invited_count: (n: number) => `دعوت ${n} ${n === 1 ? "شخصاً" : "أشخاص"} حتى الآن`,
    },
    fr: {
        badge: "Parrainez vos amis",
        title: "Aidez-nous à grandir",
        subtitle: "Invitez 5 personnes — obtenez 1 mois gratuit",

        story_title: "Notre histoire",
        story: "Nous sommes une petite équipe qui croit que chacun mérite d'avoir accès à des réponses juridiques, quel que soit son budget. 9anon a été créé pour combler ce vide, et nous n'en sommes qu'au début. Nous avons besoin de votre soutien. Chaque personne que vous invitez nous aide à continuer à offrir une assistance juridique gratuite à tous ceux qui en ont besoin.",

        milestone_label: "Votre progression vers la récompense",
        milestone_done_title: "Bravo, vous l'avez fait ! 🎉",
        milestone_done_sub: "Un mois gratuit vous attend au lancement des abonnements",
        milestone_remaining: (n: number) => `Encore ${n} personne${n > 1 ? "s" : ""} pour débloquer votre récompense`,
        friend: "ami",

        reward_title: "Votre récompense",
        reward_value: "1 mois gratuit",
        reward_desc: "Dès que 5 personnes s'inscrivent via votre lien, vous obtenez automatiquement 1 mois gratuit sur n'importe quel abonnement payant au lancement — sans aucune action de votre part.",

        link_label: "Votre lien personnel",
        code_label: "Code",
        copy: "Copier le lien",
        copied: "Copié ✓",
        whatsapp: "Partager sur WhatsApp",
        whatsapp_msg: "Salut ! J'utilise 9anon AI pour obtenir des réponses juridiques gratuites — c'est vraiment utile. Ça vaut le coup d'essayer ! Inscris-toi via mon lien : ",
        close: "Fermer",
        loading: "Chargement...",
        invited_count: (n: number) => `Vous avez invité ${n} personne${n > 1 ? "s" : ""} jusqu'ici`,
    },
    en: {
        badge: "Refer friends",
        title: "Help us grow",
        subtitle: "Invite 5 people — get 1 free month",

        story_title: "Our story",
        story: "We're a small team that believes everyone deserves access to legal answers — regardless of their budget. 9anon was built to fill that gap, and we're just getting started. We need your support. Every person you invite helps us keep going and reach more people who need legal help but can't afford a lawyer.",

        milestone_label: "Your progress toward the reward",
        milestone_done_title: "You did it! 🎉",
        milestone_done_sub: "A free month is waiting for you when paid plans launch",
        milestone_remaining: (n: number) => `${n} more person${n > 1 ? "s" : ""} to unlock your reward`,
        friend: "friend",

        reward_title: "Your reward",
        reward_value: "1 free month",
        reward_desc: "Once 5 people sign up using your link, you automatically get 1 full free month on any paid plan when we launch — no action needed from you.",

        link_label: "Your referral link",
        code_label: "Code",
        copy: "Copy link",
        copied: "Copied ✓",
        whatsapp: "Share on WhatsApp",
        whatsapp_msg: "Hey! I use 9anon AI to get free legal answers — it's genuinely great. Worth trying! Sign up with my link: ",
        close: "Close",
        loading: "Loading...",
        invited_count: (n: number) => `You've invited ${n} person${n !== 1 ? "s" : ""} so far`,
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
    const milestoneReached = count >= MILESTONE;
    const dotsCount = Math.min(count, MILESTONE);
    const remaining = MILESTONE - dotsCount;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" dir={isRtl ? "rtl" : "ltr"}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <div className="relative z-10 w-full sm:max-w-lg bg-background border border-border/60 sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]">

                {/* ── Hero ─────────────────────────────────────────────────── */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ background: "linear-gradient(135deg, #047857 0%, #0d9488 55%, #0284c7 100%)" }}>

                    {/* Dot grid */}
                    <div className="absolute inset-0 opacity-[0.08]" style={{
                        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }} />
                    {/* Glow orbs */}
                    <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #6ee7b7 0%, transparent 70%)" }} />

                    <div className={`relative p-6 pb-4 flex items-start justify-between gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                        <div className={isRtl ? "text-right" : ""}>
                            {/* Badge */}
                            <div className={`inline-flex items-center gap-1.5 text-white/80 text-[11px] font-semibold uppercase tracking-widest mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                {t.badge}
                            </div>
                            <h2 className="text-[28px] font-black text-white leading-tight tracking-tight mb-1">
                                {t.title}
                            </h2>
                            <p className="text-emerald-200 text-sm font-semibold">
                                {t.subtitle}
                            </p>
                        </div>
                        <button onClick={onClose} className="shrink-0 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* ── Milestone tracker ─────────────────────────────────── */}
                    <div className="px-6 pb-5">
                        <div className={`flex items-center justify-between mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                            <span className="text-white/70 text-xs font-medium">{t.milestone_label}</span>
                            <span className="text-white text-xs font-bold">{dotsCount}/{MILESTONE}</span>
                        </div>

                        {/* 5 progress dots */}
                        <div className={`flex gap-2 mb-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                            {Array.from({ length: MILESTONE }).map((_, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                                    <div
                                        className="w-full h-2 rounded-full transition-all duration-500"
                                        style={{
                                            background: i < dotsCount
                                                ? "linear-gradient(90deg, #6ee7b7, #fff)"
                                                : "rgba(255,255,255,0.2)",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Status text */}
                        {milestoneReached ? (
                            <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                                <div className="w-5 h-5 rounded-full bg-emerald-300 flex items-center justify-center shrink-0">
                                    <svg className="w-3 h-3 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className={isRtl ? "text-right" : ""}>
                                    <p className="text-white text-xs font-bold leading-tight">{t.milestone_done_title}</p>
                                    <p className="text-white/70 text-[11px] leading-tight">{t.milestone_done_sub}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-white/70 text-xs">{t.milestone_remaining(remaining)}</p>
                        )}
                    </div>
                </div>

                {/* ── Scrollable body ──────────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <svg className="animate-spin w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        </div>
                    ) : (
                        <div className="p-5 space-y-5">

                            {/* ── Our story ─────────────────────────────────── */}
                            <div className={`rounded-2xl bg-muted/40 border border-border/40 p-4 space-y-2 ${isRtl ? "text-right" : ""}`}>
                                <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                                    <span className="text-base">💚</span>
                                    <p className="text-xs font-bold text-foreground uppercase tracking-widest">{t.story_title}</p>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{t.story}</p>
                            </div>

                            {/* ── Invited count (if any) ─────────────────────── */}
                            {count > 0 && (
                                <div className={`flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 ${isRtl ? "flex-row-reverse" : ""}`}>
                                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">{t.invited_count(count)}</p>
                                </div>
                            )}

                            {/* ── Referral link ─────────────────────────────── */}
                            <div className="space-y-2">
                                <label className={`text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 ${isRtl ? "flex-row-reverse" : ""}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    {t.link_label}
                                </label>

                                <div className={`flex gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
                                    <div className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-muted/50 border border-border/60 font-mono text-xs text-muted-foreground truncate select-all cursor-text">
                                        {referralLink ?? "—"}
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        disabled={!referralLink}
                                        style={{ background: copied ? "#059669" : "linear-gradient(135deg, #047857, #0284c7)" }}
                                        className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-white text-xs font-bold disabled:opacity-40 transition-all active:scale-95"
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

                                {/* Code badge */}
                                {data?.code && (
                                    <div className={`flex items-center gap-2 text-xs text-muted-foreground ${isRtl ? "flex-row-reverse" : ""}`}>
                                        <span className="opacity-60">{t.code_label}:</span>
                                        <span className="font-mono font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md tracking-widest">{data.code}</span>
                                    </div>
                                )}

                                {/* WhatsApp */}
                                <button
                                    onClick={handleWhatsApp}
                                    disabled={!referralLink}
                                    className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-40 transition-all active:scale-[0.98] ${isRtl ? "flex-row-reverse" : ""}`}
                                >
                                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    {t.whatsapp}
                                </button>
                            </div>

                            {/* ── Reward callout ────────────────────────────── */}
                            <div className={`rounded-2xl overflow-hidden border ${milestoneReached ? "border-emerald-400/30 dark:border-emerald-500/30" : "border-amber-200/30 dark:border-amber-400/20"}`}>
                                <div
                                    className={`flex items-center gap-3 px-4 py-3.5 ${isRtl ? "flex-row-reverse" : ""}`}
                                    style={{ background: milestoneReached ? "rgba(16,185,129,0.1)" : "rgba(251,191,36,0.08)" }}
                                >
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xl" style={{ background: milestoneReached ? "rgba(16,185,129,0.15)" : "rgba(251,191,36,0.12)" }}>
                                        {milestoneReached ? "🎉" : "🎁"}
                                    </div>
                                    <div className={`flex-1 min-w-0 ${isRtl ? "text-right" : ""}`}>
                                        <p className={`text-[11px] font-bold uppercase tracking-wide ${milestoneReached ? "text-emerald-600 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}>
                                            {t.reward_title}
                                        </p>
                                        <p className={`text-base font-black ${milestoneReached ? "text-emerald-800 dark:text-emerald-200" : "text-amber-900 dark:text-amber-200"}`}>
                                            {t.reward_value}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-2xl">{milestoneReached ? "✅" : "✨"}</span>
                                </div>
                                <div
                                    className={`px-4 py-3 border-t ${milestoneReached ? "border-emerald-400/20 dark:border-emerald-500/20" : "border-amber-200/20 dark:border-amber-400/10"} ${isRtl ? "text-right" : ""}`}
                                    style={{ background: milestoneReached ? "rgba(16,185,129,0.05)" : "rgba(251,191,36,0.04)" }}
                                >
                                    <p className={`text-xs leading-relaxed ${milestoneReached ? "text-emerald-700/80 dark:text-emerald-400/70" : "text-amber-700/80 dark:text-amber-400/70"}`}>
                                        {t.reward_desc}
                                    </p>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
