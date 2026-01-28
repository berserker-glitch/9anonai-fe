"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

export default function SetupPage() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();
    const { setLanguage } = useLanguage();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // State
    const [spokenLanguage, setSpokenLanguage] = useState("auto");
    const [selectedTones, setSelectedTones] = useState<string[]>([]);
    const [customInstructions, setCustomInstructions] = useState("");
    const [marketingSource, setMarketingSource] = useState("");

    const TONE_OPTIONS = [
        { id: "Professional", label: "Professional", desc: "Formal and precise" },
        { id: "Friendly", label: "Friendly", desc: "Warm and approachable" },
        { id: "Concise", label: "Concise", desc: "Short and to the point" },
        { id: "Detailed", label: "Detailed", desc: "Comprehensive explanations" },
        { id: "Simplifying", label: "Simple Language", desc: "Explain like I'm 5" },
        { id: "Legal-Focused", label: "Legal Citations", desc: "Heavy on references" }
    ];

    const MARKETING_OPTIONS = [
        "Social Media (Instagram, LinkedIn, etc.)",
        "Friend / Colleague",
        "Search Engine (Google)",
        "Advertisement",
        "Other"
    ];

    // Redirect if already onboarded or not logged in
    useEffect(() => {
        if (!user && !loading) {
            // Wait just in case auth is loading... but auth context handles it. 
            // If auth context is loading, user might be null. 
        }
        if (user?.isOnboarded) {
            router.push("/chat");
        }
    }, [user, router]);

    const handleFinish = async () => {
        setLoading(true);
        setError("");

        try {
            // Prepare personalization JSON
            const personalizationData = JSON.stringify({
                tones: selectedTones,
                customInstructions,
                spokenLanguage
            });

            const res = await updateProfile({
                personalization: personalizationData,
                marketingSource,
                isOnboarded: true
            });

            if (res.success) {
                router.push("/chat");
            } else {
                setError(res.error || "Failed to save setup.");
            }
        } catch (e) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl p-8">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-2 flex-1 rounded-full mx-1 transition-all ${s <= step ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                        Step {step} of 3
                    </p>
                </div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {step === 1 && (
                        <div className="space-y-6 fade-in">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold mb-2">Welcome to 9anon! 👋</h1>
                                <p className="text-muted-foreground">Let's personalize your legal assistant experience.</p>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium">Which language do you prefer to speak?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: "auto", label: "Auto-detect (Recommended)", icon: "✨" },
                                        { id: "ar", label: "Arabic (Agreed)", icon: "🇲🇦" },
                                        { id: "fr", label: "French", icon: "🇫🇷" },
                                        { id: "en", label: "English", icon: "🇬🇧" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => setSpokenLanguage(opt.id)}
                                            className={`p-4 rounded-xl border text-left transition-all ${spokenLanguage === opt.id
                                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{opt.icon}</div>
                                            <div className="font-medium">{opt.label}</div>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    The AI will adapt to this choice. Auto-detect works best for mixed conversations.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 fade-in">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold mb-2">How should the AI behave?</h1>
                                <p className="text-muted-foreground">Customize the personality and response style.</p>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium">Communication Style (Select multiple)</label>
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
                                                className={`p-3 rounded-lg border text-left transition-all ${isSelected
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-muted/30 border-border hover:bg-muted"
                                                    }`}
                                            >
                                                <div className="text-sm font-medium">{tone.label}</div>
                                                <div className={`text-xs ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                                    {tone.desc}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="block text-sm font-medium">Additional Instructions (Optional)</label>
                                    <textarea
                                        value={customInstructions}
                                        onChange={(e) => setCustomInstructions(e.target.value)}
                                        placeholder="e.g. Always clarify legal jargon, prioritise labor law..."
                                        className="w-full h-24 px-3 py-2 bg-muted/50 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 fade-in">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold mb-2">One last thing...</h1>
                                <p className="text-muted-foreground">Where did you hear about 9anon?</p>
                            </div>

                            <div className="space-y-3 max-w-md mx-auto">
                                {MARKETING_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setMarketingSource(opt)}
                                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${marketingSource === opt
                                            ? "border-primary bg-primary/5 ring-2 ring-primary/20 font-medium"
                                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                                            }`}
                                    >
                                        {opt}
                                        {marketingSource === opt && (
                                            <span className="text-primary">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-border">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(step - 1)}
                            disabled={step === 1 || loading}
                            className={`text-sm font-medium text-muted-foreground hover:text-foreground ${step === 1 ? "invisible" : ""
                                }`}
                        >
                            Back
                        </button>

                        {/* Skip button for Arabic users */}
                        {spokenLanguage === "ar" && (
                            <button
                                onClick={handleFinish}
                                disabled={loading}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                تخطي
                            </button>
                        )}
                    </div>

                    {error && (
                        <span className="text-sm text-red-500">{error}</span>
                    )}

                    <button
                        onClick={() => {
                            if (step < 3) setStep(step + 1);
                            else handleFinish();
                        }}
                        disabled={loading || (step === 3 && !marketingSource)}
                        className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            "Saving..."
                        ) : step === 3 ? (
                            "Get Started 🚀"
                        ) : (
                            spokenLanguage === "ar" ? "تابع" : "Continue"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
