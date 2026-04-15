import { useState, ReactNode, useEffect } from "react";
import { Modal } from "../utility/modal";
import { useLanguage, languages, Language } from "@/lib/language-context";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "../providers/theme-provider";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name?: string; email?: string; personalization?: string } | null;
    onLogout: () => void;
}

type SettingsTab = "general" | "notifications" | "personalization" | "account" | "data" | "security";

// ─── Trilingual UI strings ────────────────────────────────────────────────────

const S: Record<string, Record<string, string>> = {
    // Tabs
    tab_general:          { fr: "Général",          ar: "عام",                en: "General" },
    tab_notifications:    { fr: "Notifications",    ar: "الإشعارات",          en: "Notifications" },
    tab_personalization:  { fr: "Personnalisation", ar: "التخصيص",            en: "Personalization" },
    tab_data:             { fr: "Données",          ar: "البيانات",           en: "Data controls" },
    tab_security:         { fr: "Sécurité",         ar: "الأمان",             en: "Security" },
    tab_account:          { fr: "Compte",           ar: "الحساب",             en: "Account" },

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
    const { language, setLanguage } = useLanguage();
    const { updateProfile, changePassword } = useAuth();

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
                </div>
            </div>
        </Modal>
    );
}
