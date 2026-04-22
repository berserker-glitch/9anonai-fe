"use client";

import { useTranslation, useLanguage } from "@/lib/language-context";

export function SocialProofMarquee() {
  const { t } = useTranslation("landing");
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const items = [
    t("marquee.users"),
    t("marquee.questions"),
    t("marquee.accuracy"),
    t("marquee.languages"),
    t("marquee.sources"),
    t("marquee.free"),
  ];

  // Duplicate items for seamless infinite scroll
  const duplicated = [...items, ...items];

  return (
    <section className="py-6 border-y border-border/30 bg-muted/10 overflow-hidden select-none">
      <div
        className={`flex gap-8 whitespace-nowrap ${isArabic ? "animate-marquee-reverse" : "animate-marquee"}`}
        aria-label="Social proof statistics"
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-medium text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
