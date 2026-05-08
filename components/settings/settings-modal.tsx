import { useState, ReactNode, useEffect, useCallback } from "react";
import { Modal } from "../utility/modal";
import { useLanguage, languages, Language } from "@/lib/language-context";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "../providers/theme-provider";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
const REFERRAL_MILESTONE = 5;

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name?: string; email?: string; personalization?: string } | null;
    onLogout: () => void;
}

type SettingsTab = "general" | "notifications" | "personalization" | "account" | "data" | "security" | "subscription" | "referral";

// ─── Trilingual UI strings ────────────────────────────────────────────────────

const S: Record<string, Record<string, string>> = {
    // Tabs
    tab_general:          { fr: "Général",          ar: "عام",                en: "General" },
    tab_notifications:    { fr: "Notifications",    ar: "الإشعارات",          en: "Notifications" },
    tab_personalization:  { fr: "Personnalisation", ar: "التخصيص",            en: "Personalization" },
    tab_data:             { fr: "Données",          ar: "البيانات",           en: "Data controls" },
    tab_security:         { fr: "Sécurité",         ar: "الأمان",             en: "Security" },
    tab_account:          { fr: "Compte",           ar: "الحساب",             en: "Account" },
    tab_subscription:     { fr: "Abonnement",       ar: "الاشتراك",           en: "Subscription" },
    tab_referral:         { fr: "Parrainage",       ar: "الإحالة",            en: "Referral" },

    // Referral tab
    ref_title:            { fr: "Parrainage",           ar: "برنامج الإحالة",        en: "Referral" },
    ref_story_title:      { fr: "Notre histoire",       ar: "قصتنا",                en: "Our story" },
    ref_story:            { fr: "Nous sommes une petite équipe qui croit que chacun mérite d'avoir accès à des réponses juridiques, quel que soit son budget. Nous n'en sommes qu'au début et nous avons besoin de votre soutien pour continuer.", ar: "نحن فريق صغير نؤمن بأن لكل شخص الحق في الحصول على إجابات قانونية بغض النظر عن ميزانيته. نحن في بداياتنا ونحتاج دعمكم للاستمرار.", en: "We're a small team that believes everyone deserves access to legal answers regardless of their budget. We're just getting started and we need your support to keep going." },
    ref_milestone:        { fr: "Progression vers la récompense", ar: "تقدّمك نحو المكافأة", en: "Progress toward reward" },
    ref_done_title:       { fr: "Objectif atteint ! 🎉",  ar: "أحسنت! لقد فعلتها 🎉",  en: "You did it! 🎉" },
    ref_done_sub:         { fr: "1 mois gratuit vous attend au lancement", ar: "شهر مجاني ينتظرك عند الإطلاق", en: "1 free month waiting for you at launch" },
    ref_link_label:       { fr: "Votre lien de parrainage", ar: "رابطك الشخصي",        en: "Your referral link" },
    ref_copy:             { fr: "Copier",               ar: "نسخ",                   en: "Copy" },
    ref_copied:           { fr: "Copié ✓",              ar: "تم النسخ ✓",             en: "Copied ✓" },
    ref_code:             { fr: "Code",                 ar: "الرمز",                 en: "Code" },
    ref_whatsapp:         { fr: "Partager sur WhatsApp", ar: "شارك عبر واتساب",       en: "Share on WhatsApp" },
    ref_whatsapp_msg:     { fr: "Salut ! J'utilise 9anon AI pour des réponses juridiques gratuites. Inscris-toi via mon lien : ", ar: "أهلاً! أنا أستخدم 9anon AI للحصول على إجابات قانونية مجانية. سجّل عبر رابطي: ", en: "Hey! I use 9anon AI for free legal answers. Sign up with my link: " },
    ref_reward_title:     { fr: "Votre récompense",     ar: "مكافأتك",               en: "Your reward" },
    ref_reward_value:     { fr: "1 mois gratuit",       ar: "شهر مجاني",             en: "1 free month" },
    ref_reward_desc:      { fr: "Dès que 5 personnes s'inscrivent via votre lien, vous obtenez automatiquement 1 mois gratuit au lancement des abonnements.", ar: "بمجرد تسجيل 5 أشخاص عبر رابطك، ستحصل تلقائياً على شهر مجاني عند إطلاق الاشتراكات.", en: "Once 5 people sign up using your link, you automatically get 1 free month when paid plans launch." },
    ref_loading:          { fr: "Chargement...",        ar: "جاري التحميل...",        en: "Loading..." },

    // Subscription tab
    sub_title:            { fr: "Abonnement",           ar: "الاشتراك",              en: "Subscription" },
    sub_current_plan:     { fr: "Plan actuel",           ar: "الخطة الحالية",         en: "Current plan" },
    sub_free_label:       { fr: "Majjani — Gratuit",     ar: "مجاني — Majjani",       en: "Majjani — Free" },
    sub_basic_label:      { fr: "Asasi — 49 MAD/mois",  ar: "أساسي — 49 د.م/شهر",   en: "Asasi — 49 MAD/mo" },
    sub_pro_label:        { fr: "Mihani — 149 MAD/mois",ar: "مهني — 149 د.م/شهر",   en: "Mihani — 149 MAD/mo" },
    sub_ent_label:        { fr: "Mouassasa — Sur devis",ar: "مؤسسة — تواصل معنا",    en: "Enterprise — Custom" },
    sub_renews:           { fr: "Renouvellement le",     ar: "يتجدد في",              en: "Renews on" },
    sub_cancelled:        { fr: "Annulé — accès jusqu'au", ar: "ملغى — الوصول حتى",  en: "Cancelled — access until" },
    sub_upgrade:          { fr: "Voir les plans",        ar: "عرض الخطط",             en: "See plans" },
    sub_free_limit:       { fr: "5 messages / conversation",  ar: "5 رسائل / محادثة",   en: "5 messages per conversation" },
    sub_basic_limit:      { fr: "Messages illimités + export PDF", ar: "رسائل غير محدودة + تصدير PDF", en: "Unlimited messages + PDF export" },
    sub_pro_limit:        { fr: "Tout illimité + téléversement de fichiers", ar: "كل شيء غير محدود + رفع ملفات", en: "Everything unlimited + file uploads" },

    // General tab
    general_title:        { fr: "Général",                      ar: "الإعدادات العامة",          en: "General" },
    appearance:           { fr: "Apparence",                    ar: "المظهر",                    en: "Appearance" },
    theme_mode:           { fr: "Mode d'affichage",             ar: "وضع العرض",                 en: "Theme mode" },
    theme_light:          { fr: "Clair",                        ar: "فاتح",                      en: "Light" },
    theme_dark:           { fr: "Sombre",                       ar: "داكن",                      en: "Dark" },
    theme_system:         { fr: "Système",                      ar: "تلقائي",                    en: "System" },
    language_label:       { fr: "Langue de l'interface",        ar: "لغة الواجهة",               en: "Interface language" },
    language_desc:        { fr: "La langue utilisée dans toute l'application", ar: "اللغة المستخدمة في جميع أنحاء التطبيق", en: "The language used across the whole app" },
    spoken_language:      { fr: "Langue parlée",                ar: "لغة المحادثة",              en: "Spoken language" },
    spoken_desc:          { fr: "L'IA détectera la langue que vous utilisez. En mode automatique, la réponse correspond à votre saisie.", ar: "سيكتشف الذكاء الاصطناعي اللغة التي تستخدمها. في الوضع التلقائي، تتطابق الاستجابة مع مدخلاتك.", en: "The AI will detect the language you speak. If auto-detect is on, response will match your input." },
    spoken_auto:          { fr: "Détection automatique",        ar: "كشف تلقائي",                en: "Auto-detect" },

    // Notifications tab
    notif_title:          { fr: "Notifications",                ar: "الإشعارات",                 en: "Notifications" },
    email_notif:          { fr: "Notifications par e-mail",     ar: "إشعارات البريد الإلكتروني", en: "Email notifications" },
    email_notif_desc:     { fr: "Recevoir des mises à jour par e-mail", ar: "تلقي التحديثات عبر البريد الإلكتروني", en: "Receive updates via email" },

    // Personalization tab
    person_title:         { fr: "Personnalisation",             ar: "التخصيص",                   en: "Personalization" },
    person_desc:          { fr: "Personnalisez la façon dont 9anon vous répond. Ces paramètres adaptent le comportement de l'IA.", ar: "خصّص طريقة رد 9anon عليك. ستتكيف هذه الإعدادات مع سلوك الذكاء الاصطناعي.", en: "Customize how 9anon responds to you. These settings will adapt the AI's behavior." },
    comm_style:           { fr: "Style de communication",       ar: "أسلوب التواصل",             en: "Communication Style" },
    custom_instructions:  { fr: "Instructions personnalisées",  ar: "تعليمات مخصصة",             en: "Additional Custom Instructions" },
    custom_placeholder:   { fr: "Règles spécifiques, ex. 'Toujours clarifier le jargon juridique', 'Priorité aux articles du code du travail'...", ar: "قواعد محددة، مثل 'توضيح المصطلحات القانونية دائماً'، 'إعطاء الأولوية لمواد قانون الشغل'...", en: "Specific rules, e.g. 'Always clarify legal jargon', 'Prioritize labor code articles'..." },
    save_prefs:           { fr: "Enregistrer les préférences",  ar: "حفظ التفضيلات",             en: "Save Preferences" },
    saving:               { fr: "Enregistrement...",            ar: "جارٍ الحفظ...",              en: "Saving..." },

    // Tone options
    tone_professional:    { fr: "Professionnel",                ar: "احترافي",                   en: "Professional" },
    tone_friendly:        { fr: "Convivial",                    ar: "ودّي",                      en: "Friendly" },
    tone_concise:         { fr: "Concis",                       ar: "موجز",                      en: "Concise" },
    tone_detailed:        { fr: "Détaillé",                     ar: "مفصّل",                     en: "Detailed" },
    tone_simple:          { fr: "Langage simple",               ar: "لغة بسيطة",                 en: "Simple Language" },
    tone_legal:           { fr: "Citations légales",            ar: "استشهادات قانونية",          en: "Legal Citations" },

    // Data tab
    data_title:           { fr: "Contrôle des données",         ar: "التحكم في البيانات",        en: "Data controls" },
    chat_history:         { fr: "Historique des conversations", ar: "سجل المحادثات",             en: "Chat history" },
    chat_history_desc:    { fr: "Enregistrer l'historique pour référence future", ar: "احفظ سجل المحادثات للرجوع إليه لاحقاً", en: "Save chat history for future reference" },
    delete_history:       { fr: "Supprimer tout l'historique",  ar: "حذف كل سجل المحادثات",     en: "Delete all chat history" },

    // Security tab
    security_title:       { fr: "Sécurité",                     ar: "الأمان",                    en: "Security" },
    change_password:      { fr: "Changer le mot de passe",      ar: "تغيير كلمة المرور",         en: "Change Password" },
    current_password:     { fr: "Mot de passe actuel",          ar: "كلمة المرور الحالية",       en: "Current Password" },
    new_password:         { fr: "Nouveau mot de passe",         ar: "كلمة المرور الجديدة",       en: "New Password" },
    confirm_password:     { fr: "Confirmer le mot de passe",    ar: "تأكيد كلمة المرور",         en: "Confirm New Password" },
    change_btn:           { fr: "Changer",                      ar: "تغيير",                     en: "Change Password" },
    changing:             { fr: "Modification...",              ar: "جارٍ التغيير...",            en: "Changing..." },

    // Account tab
    account_title:        { fr: "Compte",                       ar: "الحساب",                    en: "Account" },
    email_label:          { fr: "Adresse e-mail",               ar: "البريد الإلكتروني",         en: "Email" },
    name_label:           { fr: "Nom",                          ar: "الاسم",                     en: "Name" },
    name_not_set:         { fr: "Non défini",                   ar: "غير محدد",                  en: "Not set" },
    edit_btn:             { fr: "Modifier",                     ar: "تعديل",                     en: "Edit" },
    save_btn:             { fr: "Enregistrer",                  ar: "حفظ",                       en: "Save" },
    cancel_btn:           { fr: "Annuler",                      ar: "إلغاء",                     en: "Cancel" },
    logout_btn:           { fr: "Se déconnecter",               ar: "تسجيل الخروج",              en: "Log out" },
    delete_account:       { fr: "Supprimer le compte",          ar: "حذف الحساب",               en: "Delete account" },

    // Status messages
    profile_saved:        { fr: "Profil mis à jour",            ar: "تم تحديث الملف الشخصي",     en: "Profile updated successfully" },
    profile_error:        { fr: "Échec de la mise à jour",      ar: "فشل تحديث الملف الشخصي",    en: "Failed to update profile" },
    prefs_saved:          { fr: "Préférences enregistrées",     ar: "تم حفظ التفضيلات",          en: "Preferences saved successfully" },
    prefs_error:          { fr: "Échec de l'enregistrement",    ar: "فشل حفظ التفضيلات",         en: "Failed to save preferences" },
    pw_changed:           { fr: "Mot de passe modifié",         ar: "تم تغيير كلمة المرور",      en: "Password changed successfully" },
    pw_mismatch:          { fr: "Les mots de passe ne correspondent pas", ar: "كلمتا المرور غير متطابقتين", en: "New passwords do not match" },
    pw_short:             { fr: "Au moins 6 caractères requis", ar: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل", en: "Password must be at least 6 characters" },
    pw_error:             { fr: "Échec du changement",          ar: "فشل تغيير كلمة المرور",     en: "Failed to change password" },
};

function s(key: string, lang: string): string {
    return S[key]?.[lang] ?? S[key]?.["fr"] ?? key;
}

// ─────────────────────────────────────────────────────────────────────────────

export function SettingsModal({ isOpen, onClose, user: propUser, onLogout }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const { user: authUser, updateProfile, changePassword, token } = useAuth();
    const { language, setLanguage } = useLanguage();

    // Profile State
    const [name, setName] = useState(propUser?.name || "");
    const [personalizationInput, setPersonalizationInput] = useState("");
    const [selectedTones, setSelectedTones] = useState<string[]>([]);
    const [spokenLanguage, setSpokenLanguage] = useState("auto");
    const [isEditingName, setIsEditingName] = useState(false);
    const { theme, setTheme } = useTheme();

    const TONE_OPTIONS: { id: string; labelKey: string }[] = [
        { id: "Professional",   labelKey: "tone_professional" },
        { id: "Friendly",       labelKey: "tone_friendly" },
        { id: "Concise",        labelKey: "tone_concise" },
        { id: "Detailed",       labelKey: "tone_detailed" },
        { id: "Simplifying",    labelKey: "tone_simple" },
        { id: "Legal-Focused",  labelKey: "tone_legal" },
    ];

    // Password State
    const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    // Referral State
    const [referralData, setReferralData] = useState<{ code: string | null; credits: number; referralCount: number } | null>(null);
    const [referralLoading, setReferralLoading] = useState(false);
    const [referralCopied, setReferralCopied] = useState(false);

    // Language flags
    const langIcons: Record<Language, string> = {
        ar: "🇲🇦",
        en: "🇬🇧",
        fr: "🇫🇷",
    };

    useEffect(() => {
        if (propUser) {
            if (propUser.name) setName(propUser.name);
            if (propUser.personalization) {
                try {
                    const parsed = JSON.parse(propUser.personalization);
                    if (typeof parsed === "object" && parsed !== null) {
                        setSelectedTones(parsed.tones || []);
                        setPersonalizationInput(parsed.customInstructions || "");
                        setSpokenLanguage(parsed.spokenLanguage || "auto");
                    } else {
                        setPersonalizationInput(String(parsed));
                    }
                } catch {
                    setPersonalizationInput(propUser.personalization);
                }
            }
        }
    }, [propUser]);

    useEffect(() => {
        if (!isOpen) {
            setStatus(null);
            setPasswordData({ current: "", new: "", confirm: "" });
            setIsEditingName(false);
            if (propUser?.personalization) setPersonalizationInput(propUser.personalization);
        }
    }, [isOpen, propUser]);

    // Fetch referral data when tab is active
    useEffect(() => {
        if (activeTab !== "referral" || !isOpen) return;
        const t = token || localStorage.getItem("token");
        if (!t) return;
        setReferralLoading(true);
        fetch(`${API_URL}/referrals/me`, { headers: { Authorization: `Bearer ${t}` } })
            .then((r) => r.json())
            .then((data) => setReferralData(data))
            .catch(() => {})
            .finally(() => setReferralLoading(false));
    }, [activeTab, isOpen, token]);

    const handleReferralCopy = useCallback(() => {
        if (!referralData?.code) return;
        const link = `${window.location.origin}/register?ref=${referralData.code}`;
        navigator.clipboard.writeText(link).then(() => {
            setReferralCopied(true);
            setTimeout(() => setReferralCopied(false), 2000);
        });
    }, [referralData]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        setStatus(null);
        const res = await updateProfile({ name });
        setLoading(false);
        if (res.success) {
            setStatus({ type: "success", message: s("profile_saved", language) });
            setIsEditingName(false);
        } else {
            setStatus({ type: "error", message: s("profile_error", language) });
        }
    };

    const handleUpdatePersonalization = async () => {
        setLoading(true);
        setStatus(null);
        const data = JSON.stringify({ tones: selectedTones, customInstructions: personalizationInput, spokenLanguage });
        const res = await updateProfile({ personalization: data });
        setLoading(false);
        if (res.success) {
            setStatus({ type: "success", message: s("prefs_saved", language) });
        } else {
            setStatus({ type: "error", message: s("prefs_error", language) });
        }
    };

    const handleSpokenLanguageChange = async (val: string) => {
        setSpokenLanguage(val);
        const data = JSON.stringify({ tones: selectedTones, customInstructions: personalizationInput, spokenLanguage: val });
        await updateProfile({ personalization: data });
    };

    const handleChangePassword = async () => {
        if (passwordData.new !== passwordData.confirm) {
            setStatus({ type: "error", message: s("pw_mismatch", language) });
            return;
        }
        if (passwordData.new.length < 6) {
            setStatus({ type: "error", message: s("pw_short", language) });
            return;
        }
        setLoading(true);
        setStatus(null);
        const res = await changePassword(passwordData.current, passwordData.new);
        setLoading(false);
        if (res.success) {
            setStatus({ type: "success", message: s("pw_changed", language) });
            setPasswordData({ current: "", new: "", confirm: "" });
        } else {
            setStatus({ type: "error", message: s("pw_error", language) });
        }
    };

    const tabs: { id: SettingsTab; labelKey: string; icon: ReactNode }[] = [
        {
            id: "general",
            labelKey: "tab_general",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            id: "notifications",
            labelKey: "tab_notifications",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
        },
        {
            id: "personalization",
            labelKey: "tab_personalization",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
        },
        {
            id: "data",
            labelKey: "tab_data",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
            ),
        },
        {
            id: "security",
            labelKey: "tab_security",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            id: "account",
            labelKey: "tab_account",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            id: "subscription",
            labelKey: "tab_subscription",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
        {
            id: "referral",
            labelKey: "tab_referral",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="flex h-[500px] -m-4">
                {/* Sidebar */}
                <div className="w-48 border-r border-border bg-muted/30 py-2 shrink-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setStatus(null); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                                activeTab === tab.id
                                    ? "bg-accent text-foreground font-medium"
                                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            }`}
                        >
                            {tab.icon}
                            {s(tab.labelKey, language)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {status && (
                        <div className={`mb-4 p-3 rounded-lg text-sm ${
                            status.type === "success"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600"
                        }`}>
                            {status.message}
                        </div>
                    )}

                    {/* ── General ── */}
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">{s("general_title", language)}</h2>

                            {/* Appearance */}
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div>
                                    <p className="text-sm font-medium">{s("appearance", language)}</p>
                                    <p className="text-xs text-muted-foreground">{s("theme_mode", language)}</p>
                                </div>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value as any)}
                                    className="bg-accent border border-border rounded-lg px-3 py-1.5 text-sm"
                                >
                                    <option value="light">{s("theme_light", language)}</option>
                                    <option value="dark">{s("theme_dark", language)}</option>
                                    <option value="system">{s("theme_system", language)}</option>
                                </select>
                            </div>

                            {/* Interface Language */}
                            <div className="py-3 border-b border-border">
                                <div className="flex items-center justify-between mb-1">
                                    <div>
                                        <p className="text-sm font-medium">{s("language_label", language)}</p>
                                        <p className="text-xs text-muted-foreground">{s("language_desc", language)}</p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {(Object.keys(languages) as Language[]).map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => setLanguage(lang)}
                                                title={languages[lang].nativeName}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-all ${
                                                    language === lang
                                                        ? "bg-primary text-primary-foreground border-primary font-medium"
                                                        : "bg-accent border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                                                }`}
                                            >
                                                <span>{langIcons[lang]}</span>
                                                <span>{languages[lang].nativeName}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Spoken Language */}
                            <div className="py-3 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{s("spoken_language", language)}</p>
                                    <select
                                        value={spokenLanguage}
                                        onChange={(e) => handleSpokenLanguageChange(e.target.value)}
                                        className="bg-accent border border-border rounded-lg px-3 py-1.5 text-sm"
                                    >
                                        <option value="auto">{s("spoken_auto", language)}</option>
                                        <option value="ar">العربية</option>
                                        <option value="fr">Français</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1.5">{s("spoken_desc", language)}</p>
                            </div>
                        </div>
                    )}

                    {/* ── Notifications ── */}
                    {activeTab === "notifications" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">{s("notif_title", language)}</h2>
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div>
                                    <p className="text-sm font-medium">{s("email_notif", language)}</p>
                                    <p className="text-xs text-muted-foreground">{s("email_notif_desc", language)}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* ── Personalization ── */}
                    {activeTab === "personalization" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">{s("person_title", language)}</h2>
                            <p className="text-sm text-muted-foreground">{s("person_desc", language)}</p>

                            <div className="space-y-4">
                                {/* Tone chips */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{s("comm_style", language)}</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {TONE_OPTIONS.map((tone) => {
                                            const isSelected = selectedTones.includes(tone.id);
                                            return (
                                                <button
                                                    key={tone.id}
                                                    onClick={() => {
                                                        setSelectedTones(isSelected
                                                            ? selectedTones.filter(t => t !== tone.id)
                                                            : [...selectedTones, tone.id]);
                                                    }}
                                                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                                                        isSelected
                                                            ? "bg-primary text-primary-foreground border-primary"
                                                            : "bg-muted/30 border-border hover:bg-muted text-muted-foreground"
                                                    }`}
                                                >
                                                    {s(tone.labelKey, language)}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Custom instructions */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">{s("custom_instructions", language)}</label>
                                    <textarea
                                        value={personalizationInput}
                                        onChange={(e) => setPersonalizationInput(e.target.value)}
                                        placeholder={s("custom_placeholder", language)}
                                        className="w-full h-32 px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <button
                                    onClick={handleUpdatePersonalization}
                                    disabled={loading}
                                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {loading ? s("saving", language) : s("save_prefs", language)}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Data controls ── */}
                    {activeTab === "data" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">{s("data_title", language)}</h2>
                            <div className="py-3 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">{s("chat_history", language)}</p>
                                        <p className="text-xs text-muted-foreground">{s("chat_history_desc", language)}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                            <button className="text-sm text-destructive hover:underline">
                                {s("delete_history", language)}
                            </button>
                        </div>
                    )}

                    {/* ── Security ── */}
                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">{s("security_title", language)}</h2>
                            <div className="py-3">
                                <p className="text-sm font-medium mb-4">{s("change_password", language)}</p>
                                <div className="space-y-3">
                                    <input
                                        type="password"
                                        placeholder={s("current_password", language)}
                                        value={passwordData.current}
                                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="password"
                                        placeholder={s("new_password", language)}
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="password"
                                        placeholder={s("confirm_password", language)}
                                        value={passwordData.confirm}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={handleChangePassword}
                                        disabled={loading || !passwordData.current || !passwordData.new}
                                        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? s("changing", language) : s("change_btn", language)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Account ── */}
                    {activeTab === "account" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">{s("account_title", language)}</h2>

                            <div className="py-3 border-b border-border">
                                <p className="text-sm font-medium">{s("email_label", language)}</p>
                                <p className="text-sm text-muted-foreground mt-1">{propUser?.email}</p>
                            </div>

                            <div className="py-3 border-b border-border">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium">{s("name_label", language)}</p>
                                    {!isEditingName && (
                                        <button
                                            onClick={() => setIsEditingName(true)}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            {s("edit_btn", language)}
                                        </button>
                                    )}
                                </div>
                                {isEditingName ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="flex-1 px-3 py-1.5 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        <button
                                            onClick={handleUpdateProfile}
                                            disabled={loading}
                                            className="px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90"
                                        >
                                            {s("save_btn", language)}
                                        </button>
                                        <button
                                            onClick={() => { setIsEditingName(false); setName(propUser?.name || ""); }}
                                            className="px-3 py-1.5 bg-accent text-accent-foreground text-xs rounded-lg hover:bg-accent/80"
                                        >
                                            {s("cancel_btn", language)}
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        {propUser?.name || s("name_not_set", language)}
                                    </p>
                                )}
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={() => { onLogout(); onClose(); }}
                                    className="w-full px-4 py-2.5 text-sm font-medium bg-accent hover:bg-accent/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    {s("logout_btn", language)}
                                </button>
                                <button className="w-full px-4 py-2.5 text-sm font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 rounded-lg transition-colors">
                                    {s("delete_account", language)}
                                </button>
                            </div>
                        </div>
                    )}
                    {/* ── Subscription ── */}
                    {activeTab === "subscription" && (() => {
                        const plan = authUser?.plan ?? 'free';
                        const sub = authUser?.subscription;
                        const planLabel = plan === 'enterprise' ? s("sub_ent_label", language)
                            : plan === 'pro' ? s("sub_pro_label", language)
                            : plan === 'basic' ? s("sub_basic_label", language)
                            : s("sub_free_label", language);
                        const planDetail = plan === 'pro' ? s("sub_pro_limit", language)
                            : plan === 'basic' ? s("sub_basic_limit", language)
                            : s("sub_free_limit", language);
                        const periodEnd = sub?.currentPeriodEnd
                            ? new Date(sub.currentPeriodEnd).toLocaleDateString()
                            : null;

                        return (
                            <div className="space-y-6">
                                <h2 className="text-lg font-semibold">{s("sub_title", language)}</h2>

                                {/* Current plan card */}
                                <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{s("sub_current_plan", language)}</p>
                                    <p className="text-sm font-semibold">{planLabel}</p>
                                    <p className="text-xs text-muted-foreground">{planDetail}</p>
                                    {periodEnd && sub?.status === 'active' && !sub.cancelledAt && (
                                        <p className="text-xs text-muted-foreground">{s("sub_renews", language)} {periodEnd}</p>
                                    )}
                                    {sub?.cancelledAt && periodEnd && (
                                        <p className="text-xs text-amber-600">{s("sub_cancelled", language)} {periodEnd}</p>
                                    )}
                                </div>

                                {/* CTA */}
                                <Link
                                    href="/pricing"
                                    onClick={onClose}
                                    className="block w-full px-4 py-2.5 text-sm font-medium text-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                                >
                                    {s("sub_upgrade", language)}
                                </Link>
                            </div>
                        );
                    })()}
                    {/* ── Referral ── */}
                    {activeTab === "referral" && (() => {
                        const count = referralData?.referralCount ?? 0;
                        const milestoneReached = count >= REFERRAL_MILESTONE;
                        const dotsCount = Math.min(count, REFERRAL_MILESTONE);
                        const referralLink = referralData?.code
                            ? `${typeof window !== "undefined" ? window.location.origin : ""}/register?ref=${referralData.code}`
                            : "";

                        return (
                            <div className="space-y-5">
                                <h2 className="text-lg font-semibold">{s("ref_title", language)}</h2>

                                {referralLoading ? (
                                    <p className="text-sm text-muted-foreground">{s("ref_loading", language)}</p>
                                ) : (
                                    <>
                                        {/* Story */}
                                        <div className="py-3 border-b border-border">
                                            <p className="text-sm font-medium mb-1">{s("ref_story_title", language)}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{s("ref_story", language)}</p>
                                        </div>

                                        {/* Progress */}
                                        <div className="py-3 border-b border-border">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-sm font-medium">{s("ref_milestone", language)}</p>
                                                <span className="text-xs font-semibold text-primary">{count} / {REFERRAL_MILESTONE}</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {Array.from({ length: REFERRAL_MILESTONE }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-2 flex-1 rounded-full transition-colors ${
                                                            i < dotsCount
                                                                ? milestoneReached ? "bg-emerald-500" : "bg-primary"
                                                                : "bg-muted"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            {milestoneReached && (
                                                <div className="mt-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                                    <p className="text-xs font-semibold text-emerald-600">{s("ref_done_title", language)}</p>
                                                    <p className="text-xs text-emerald-600/80 mt-0.5">{s("ref_done_sub", language)}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Referral link */}
                                        <div className="py-3 border-b border-border space-y-2">
                                            <p className="text-sm font-medium">{s("ref_link_label", language)}</p>
                                            <div className="flex gap-2">
                                                <input
                                                    readOnly
                                                    value={referralLink}
                                                    className="flex-1 px-3 py-1.5 bg-muted/50 border border-border rounded-lg text-xs text-muted-foreground focus:outline-none truncate"
                                                />
                                                <button
                                                    onClick={handleReferralCopy}
                                                    className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors shrink-0"
                                                >
                                                    {referralCopied ? s("ref_copied", language) : s("ref_copy", language)}
                                                </button>
                                            </div>
                                            {referralData?.code && (
                                                <p className="text-xs text-muted-foreground">
                                                    {s("ref_code", language)}: <span className="font-mono font-semibold text-foreground">{referralData.code}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* WhatsApp */}
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent(s("ref_whatsapp_msg", language) + referralLink)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#22c55e] transition-colors w-full justify-center"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                            </svg>
                                            {s("ref_whatsapp", language)}
                                        </a>

                                        {/* Reward callout */}
                                        <div className={`p-3 rounded-lg border ${milestoneReached ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"}`}>
                                            <div className="flex items-start gap-2">
                                                <span className="text-lg">{milestoneReached ? "🎉" : "🎁"}</span>
                                                <div>
                                                    <p className={`text-xs font-semibold ${milestoneReached ? "text-emerald-600" : "text-amber-600"}`}>
                                                        {s("ref_reward_title", language)} — {s("ref_reward_value", language)}
                                                    </p>
                                                    <p className={`text-xs mt-0.5 ${milestoneReached ? "text-emerald-600/80" : "text-amber-600/80"}`}>
                                                        {s("ref_reward_desc", language)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </Modal>
    );
}
