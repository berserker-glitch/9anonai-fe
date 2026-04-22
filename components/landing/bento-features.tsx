"use client";

import { useTranslation, useLanguage } from "@/lib/language-context";
import { Scale, Languages, Zap, FileText, ShieldCheck, Heart } from "lucide-react";

const features = [
  { titleKey: "features.expertTitle",       descKey: "features.expertDesc",       Icon: Scale,       num: "01", accent: "var(--primary)" },
  { titleKey: "features.multilingualTitle",  descKey: "features.multilingualDesc",  Icon: Languages,   num: "02", accent: "#10b981" },
  { titleKey: "features.instantTitle",      descKey: "features.instantDesc",      Icon: Zap,         num: "03", accent: "var(--primary)" },
  { titleKey: "features.sourcesTitle",      descKey: "features.sourcesDesc",      Icon: FileText,    num: "04", accent: "#10b981" },
  { titleKey: "features.secureTitle",       descKey: "features.secureDesc",       Icon: ShieldCheck, num: "05", accent: "var(--primary)" },
  { titleKey: "features.freeTitle",         descKey: "features.freeDesc",         Icon: Heart,       num: "06", accent: "#10b981" },
];

export function BentoFeatures() {
  const { t } = useTranslation("landing");
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/15 via-transparent to-muted/15 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header — centered like the hero */}
        <div className="text-center mb-20 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-primary/40" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("features.sectionTag")}</span>
            <span className="w-8 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-4">
            {t("features.sectionTitle")}{" "}
            <span className="text-gradient-emerald">{t("features.brand")}</span>?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            {t("features.sectionDescription")}
          </p>
        </div>

        {/* Features — 3-col desktop, 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feature, i) => (
            <div
              key={feature.num}
              className="group relative bg-muted/20 hover:bg-muted/40 rounded-2xl p-8 lg:p-10 transition-all duration-300 scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700 overflow-hidden"
            >
              {/* Number + Icon row */}
              <div className={`flex items-center gap-3 mb-5 ${isArabic ? "flex-row-reverse" : ""}`}>
                <span className="font-mono text-xs font-bold tracking-widest text-primary/40">
                  {feature.num}
                </span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <feature.Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                </div>
              </div>

              {/* Title */}
              <h3 className={`font-display font-bold text-lg mb-3 ${isArabic ? "text-right" : ""}`}>
                {t(feature.titleKey)}
              </h3>

              {/* Description */}
              <p className={`text-muted-foreground text-sm leading-relaxed ${isArabic ? "text-right" : ""}`}>
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
