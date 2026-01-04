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

    const TONE_OPTIONS = [
        { id: "Professional", label: "Professional" },
        { id: "Friendly", label: "Friendly" },
        { id: "Concise", label: "Concise" },
        { id: "Detailed", label: "Detailed" },
        { id: "Simplifying", label: "Simple Language" },
        { id: "Legal-Focused", label: "Legal Citations" }
    ];

    // Password State
    const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (propUser) {
            if (propUser.name) setName(propUser.name);

            if (propUser.personalization) {
                try {
                    const parsed = JSON.parse(propUser.personalization);
                    if (typeof parsed === 'object' && parsed !== null) {
                        setSelectedTones(parsed.tones || []);
                        setPersonalizationInput(parsed.customInstructions || "");
                        setSpokenLanguage(parsed.spokenLanguage || "auto");
                    } else {
                        // Legacy: it was just a string
                        setPersonalizationInput(String(parsed));
                    }
                } catch (e) {
                    // Plain text fallback
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
            setStatus({ type: "success", message: "Profile updated successfully" });
            setIsEditingName(false);
        } else {
            setStatus({ type: "error", message: res.error || "Failed to update profile" });
        }
    };

    const handleUpdatePersonalization = async () => {
        setLoading(true);
        setStatus(null);

        const data = JSON.stringify({
            tones: selectedTones,
            customInstructions: personalizationInput,
            spokenLanguage // Include this
        });

        const res = await updateProfile({ personalization: data });
        setLoading(false);
        if (res.success) {
            setStatus({ type: "success", message: "Preferences saved successfully" });
        } else {
            setStatus({ type: "error", message: res.error || "Failed to save preferences" });
        }
    };

    const handleSpokenLanguageChange = async (val: string) => {
        setSpokenLanguage(val);
        // Auto-save
        const data = JSON.stringify({
            tones: selectedTones,
            customInstructions: personalizationInput,
            spokenLanguage: val
        });
        await updateProfile({ personalization: data });
    };

    const handleChangePassword = async () => {
        if (passwordData.new !== passwordData.confirm) {
            setStatus({ type: "error", message: "New passwords do not match" });
            return;
        }
        if (passwordData.new.length < 6) {
            setStatus({ type: "error", message: "Password must be at least 6 characters" });
            return;
        }

        setLoading(true);
        setStatus(null);
        const res = await changePassword(passwordData.current, passwordData.new);
        setLoading(false);
        if (res.success) {
            setStatus({ type: "success", message: "Password changed successfully" });
            setPasswordData({ current: "", new: "", confirm: "" });
        } else {
            setStatus({ type: "error", message: res.error || "Failed to change password" });
        }
    };

    const tabs: { id: SettingsTab; label: string; icon: ReactNode }[] = [
        {
            id: "general",
            label: "General",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
        {
            id: "notifications",
            label: "Notifications",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
        },
        {
            id: "personalization",
            label: "Personalization",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            ),
        },
        {
            id: "data",
            label: "Data controls",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
            ),
        },
        {
            id: "security",
            label: "Security",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            id: "account",
            label: "Account",
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
    ];

    // Language flags
    const langIcons: Record<Language, string> = {
        ar: "🇲🇦",
        en: "🇬🇧",
        fr: "🇫🇷",
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="flex h-[500px] -m-4">
                {/* Sidebar */}
                <div className="w-48 border-r border-border bg-muted/30 py-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setStatus(null); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${activeTab === tab.id
                                ? "bg-accent text-foreground font-medium"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {status && (
                        <div className={`mb-4 p-3 rounded-lg text-sm ${status.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>
                            {status.message}
                        </div>
                    )}

                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">General</h2>

                            {/* Appearance */}
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div>
                                    <p className="text-sm font-medium">Appearance</p>
                                    <p className="text-xs text-muted-foreground">Theme mode</p>
                                </div>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value as any)}
                                    className="bg-accent border border-border rounded-lg px-3 py-1.5 text-sm"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="system">System</option>
                                </select>
                            </div>

                            {/* Language */}
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div>
                                    <p className="text-sm font-medium">Language</p>
                                    <p className="text-xs text-muted-foreground">Interface language</p>
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as Language)}
                                    className="bg-accent border border-border rounded-lg px-3 py-1.5 text-sm"
                                >
                                    {(Object.keys(languages) as Language[]).map((lang) => (
                                        <option key={lang} value={lang}>
                                            {langIcons[lang]} {languages[lang].nativeName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Spoken Language */}
                            <div className="py-3 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Spoken language</p>
                                    </div>
                                    <select
                                        value={spokenLanguage}
                                        onChange={(e) => handleSpokenLanguageChange(e.target.value)}
                                        className="bg-accent border border-border rounded-lg px-3 py-1.5 text-sm"
                                    >
                                        <option value="auto">Auto-detect</option>
                                        <option value="ar">Arabic (العربية)</option>
                                        <option value="fr">French (Français)</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    The AI will detect the language you speak. If auto-detect is on, response will match your input.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Notifications</h2>
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div>
                                    <p className="text-sm font-medium">Email notifications</p>
                                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === "personalization" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Personalization</h2>
                            <p className="text-sm text-muted-foreground">
                                Customize how 9anon responds to you. These settings will adapt the AI's behavior.
                            </p>

                            <div className="space-y-4">
                                {/* Tones Selection */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Communication Style</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {TONE_OPTIONS.map((tone) => {
                                            const isSelected = selectedTones.includes(tone.id);
                                            return (
                                                <button
                                                    key={tone.id}
                                                    onClick={() => {
                                                        if (isSelected) {
                                                            setSelectedTones(selectedTones.filter(t => t !== tone.id));
                                                        } else {
                                                            setSelectedTones([...selectedTones, tone.id]);
                                                        }
                                                    }}
                                                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${isSelected
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-muted/30 border-border hover:bg-muted text-muted-foreground"
                                                        }`}
                                                >
                                                    {tone.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Custom Instructions */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Additional Custom Instructions</label>
                                    <textarea
                                        value={personalizationInput}
                                        onChange={(e) => setPersonalizationInput(e.target.value)}
                                        placeholder="Specific rules, e.g. 'Always clarify legal jargon', 'Prioritize labor code articles'..."
                                        className="w-full h-32 px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <button
                                    onClick={handleUpdatePersonalization}
                                    disabled={loading}
                                    className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Preferences"}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "data" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Data controls</h2>
                            <div className="py-3 border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium">Chat history</p>
                                        <p className="text-xs text-muted-foreground">Save chat history for future reference</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                            <button className="text-sm text-destructive hover:underline">
                                Delete all chat history
                            </button>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Security</h2>
                            <div className="py-3">
                                <p className="text-sm font-medium mb-4">Change Password</p>
                                <div className="space-y-3">
                                    <input
                                        type="password"
                                        placeholder="Current Password"
                                        value={passwordData.current}
                                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={passwordData.confirm}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        className="w-full px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={handleChangePassword}
                                        disabled={loading || !passwordData.current || !passwordData.new}
                                        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {loading ? "Changing..." : "Change Password"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "account" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Account</h2>

                            <div className="py-3 border-b border-border">
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground mt-1">{propUser?.email}</p>
                            </div>

                            <div className="py-3 border-b border-border">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-medium">Name</p>
                                    {!isEditingName && (
                                        <button
                                            onClick={() => setIsEditingName(true)}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Edit
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
                                            Save
                                        </button>
                                        <button
                                            onClick={() => { setIsEditingName(false); setName(propUser?.name || ""); }}
                                            className="px-3 py-1.5 bg-accent text-accent-foreground text-xs rounded-lg hover:bg-accent/80"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">{propUser?.name || "Not set"}</p>
                                )}
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    onClick={() => {
                                        onLogout();
                                        onClose();
                                    }}
                                    className="w-full px-4 py-2.5 text-sm font-medium bg-accent hover:bg-accent/80 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Log out
                                </button>
                                <button className="w-full px-4 py-2.5 text-sm font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 rounded-lg transition-colors">
                                    Delete account
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
