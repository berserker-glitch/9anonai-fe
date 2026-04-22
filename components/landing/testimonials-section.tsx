"use client";

import { useTranslation, useLanguage } from "@/lib/language-context";
import { Star } from "lucide-react";

const testimonials = [
  { textKey: "testimonials.t1Text", authorKey: "testimonials.t1Author", cityKey: "testimonials.t1City", gradient: "from-primary/20 to-primary/5" },
  { textKey: "testimonials.t2Text", authorKey: "testimonials.t2Author", cityKey: "testimonials.t2City", gradient: "from-primary/15 to-primary/5" },
  { textKey: "testimonials.t3Text", authorKey: "testimonials.t3Author", cityKey: "testimonials.t3City", gradient: "from-primary/20 to-primary/5" },
];

export function TestimonialsSection() {
  const { t } = useTranslation("landing");
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-primary/40" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("testimonials.tag")}</span>
            <span className="w-8 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-4">
            {t("testimonials.title")}{" "}
            <span className="text-gradient-emerald">{t("testimonials.titleHighlight")}</span>
          </h2>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="relative bg-muted/20 hover:bg-muted/40 rounded-2xl p-8 transition-all duration-300 overflow-hidden flex flex-col scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700 testimonial-quote"
            >
              {/* Stars */}
              <div className={`flex gap-1 mb-6 ${isArabic ? "flex-row-reverse" : ""}`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote
                className={`text-foreground/85 leading-relaxed mb-8 flex-1 text-base ${isArabic ? "text-right" : ""}`}
              >
                &ldquo;{t(item.textKey)}&rdquo;
              </blockquote>

              {/* Author row */}
              <div className={`flex items-center gap-3 pt-6 border-t border-border/20 ${isArabic ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {t(item.authorKey).charAt(0)}
                  </span>
                </div>
                <div className={isArabic ? "text-right" : ""}>
                  <p className="text-sm font-semibold">{t(item.authorKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(item.cityKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
