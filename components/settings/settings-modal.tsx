"use client";

import { useState, ReactNode } from "react";
import { Modal } from "../utility/modal";
import { useLanguage, languages, Language } from "@/lib/language-context";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: { name?: string; email?: string } | null;
    onLogout: () => void;
}

type SettingsTab = "general" | "notifications" | "personalization" | "account" | "data" | "security";

export function SettingsModal({ isOpen, onClose, user, onLogout }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const { language, setLanguage } = useLanguage();

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
                            onClick={() => setActiveTab(tab.id)}
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
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">General</h2>

                            {/* Appearance */}
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div>
                                    <p className="text-sm font-medium">Appearance</p>
                                    <p className="text-xs text-muted-foreground">Theme mode</p>
                                </div>
                                <span className="text-sm text-muted-foreground">System</span>
                            </div>

                            {/* Accent Color */}
                            <div className="flex items-center justify-between py-3 border-b border-border">
                                <div>
                                    <p className="text-sm font-medium">Accent color</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary" />
                                    <span className="text-sm text-muted-foreground">Default</span>
                                </div>
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
                                    <span className="text-sm text-muted-foreground">Auto-detect</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    For best results, select the language you mainly speak. If it&apos;s not listed, it may still be supported via auto-detection.
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
                                Customize how 9anon responds to you based on your preferences.
                            </p>
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
                            <div className="py-3 border-b border-border">
                                <p className="text-sm font-medium">Two-factor authentication</p>
                                <p className="text-xs text-muted-foreground mt-1">Add an extra layer of security to your account</p>
                                <button className="mt-3 px-4 py-2 text-sm bg-accent hover:bg-accent/80 rounded-lg transition-colors">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "account" && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold">Account</h2>

                            <div className="py-3 border-b border-border">
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
                            </div>

                            <div className="py-3 border-b border-border">
                                <p className="text-sm font-medium">Name</p>
                                <p className="text-sm text-muted-foreground mt-1">{user?.name || "Not set"}</p>
                            </div>

                            <div className="py-3 border-b border-border">
                                <p className="text-sm font-medium">Plan</p>
                                <p className="text-sm text-muted-foreground mt-1">Free Plan</p>
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
