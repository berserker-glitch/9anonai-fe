"use client";

import { useEffect, useState } from "react";

export function FontSwitcher() {
    const [currentFont, setCurrentFont] = useState("Cairo");
    const [isVisible, setIsVisible] = useState(false);

    const fonts = [
        { name: "Cairo", var: "--font-cairo" },
        { name: "Tajawal", var: "--font-tajawal" },
        { name: "IBM Plex", var: "--font-ibm-arabic" },
        { name: "System", var: "sans-serif" },
    ];

    const handleFontChange = (font: typeof fonts[0]) => {
        setCurrentFont(font.name);
        // Overwrite the specific Arabic font variable used in globals.css
        // We previously set --font-sans to include var(--font-cairo).
        // The trick is: we will update the --font-cairo variable itself to point to the new font family string
        // OR we update the --font-sans variable on the body.

        // Let's try updating a custom property that maps to the font family.
        // In layout.tsx, the variables correspond to font-family strings like '__Cairo_...'
        // So we need to grab the value of the target variable (e.g. --font-tajawal) and assign it to --font-cairo
        // which is the 'slot' we are using in the main stack.

        const root = document.documentElement;
        const body = document.body;

        // Get the font family value from the selected font variable
        const computedStyle = getComputedStyle(body);
        let newFontFamily = font.var === "sans-serif" ? "sans-serif" : computedStyle.getPropertyValue(font.var);

        if (!newFontFamily && font.var !== "sans-serif") {
            console.warn(`Variable ${font.var} not found`);
            return;
        }

        // Force update the --font-cairo variable style on inline body to override
        // This effectively swaps the font used in the second slot of our font stack
        if (font.name === "Cairo") {
            body.style.removeProperty("--font-cairo"); // Reset to default loading
        } else {
            body.style.setProperty("--font-cairo", newFontFamily);
        }
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 z-[9999] bg-red-600 text-white p-2 rounded-full text-xs shadow-lg"
            >
                🅰️
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-[9999] bg-white text-black p-4 rounded-lg shadow-xl border border-gray-200 w-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm">Valid Font Debugger</h3>
                <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <div className="space-y-2">
                {fonts.map((f) => (
                    <button
                        key={f.name}
                        onClick={() => handleFontChange(f)}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex justify-between items-center ${currentFont === f.name ? "bg-red-50 text-red-600 border border-red-200" : "hover:bg-gray-50"
                            }`}
                    >
                        <span>{f.name}</span>
                        <span className="text-[14px] text-gray-400" style={{ fontFamily: `var(${f.var})` }}>مثال للنص العربي</span>
                    </button>
                ))}
            </div>
            <p className="mt-3 text-[10px] text-gray-500 border-t pt-2">
                Click to switch the Arabic font fallback. Using overwrite of --font-cairo.
            </p>
        </div>
    );
}
