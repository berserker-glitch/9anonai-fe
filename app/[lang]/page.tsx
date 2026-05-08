"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { useTranslation, useLanguage } from "@/lib/language-context";
import { SocialProofMarquee } from "@/components/landing/social-proof-marquee";
import { BentoFeatures } from "@/components/landing/bento-features";
import { LegalTopicsGrid } from "@/components/landing/legal-topics-grid";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { BlogHighlights } from "@/components/landing/blog-highlights";
import { FAQSection } from "@/components/landing/faq-section";
import { Search, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const { t, isLoading } = useTranslation("landing");
  const { language: lang } = useLanguage();
  const isArabic = lang === "ar";
  const router = useRouter();

  const [heroInput, setHeroInput] = useState("");

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-scroll-reveal");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Timeline connector activation on scroll
  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".timeline-connector, .timeline-connector-v")
              .forEach((el) => el.classList.add("active"));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(heroInput.trim() ? `/chat?q=${encodeURIComponent(heroInput.trim())}` : "/chat");
  };

  // FAQ items from translation keys
  const faqItems = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
  ];

  return (
    <div
      className="min-h-screen bg-background"
      style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.25s ease-in" }}
    >
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-mesh-gradient" />
        <div className="absolute inset-0 bg-background/40" />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 text-center">
          {/* Badge */}
          <div className="animate-reveal-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-border/40 mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {t("hero.badge")}
            </span>
          </div>

          {/* Headline — overflow-visible + pb prevents descender clip on g/y/p */}
          <div className="overflow-visible pb-3">
            <h1 className="animate-reveal-up delay-100 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.028em] mb-6 leading-[1.15]">
              <span className="block text-foreground">{t("hero.title1")}</span>
              <span className="block text-gradient-emerald italic pb-[0.2em] -mb-[0.2em] pr-[0.1em] [filter:drop-shadow(0_0_52px_oklch(0.55_0.16_160/0.38))]">{t("hero.title2")}</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="animate-reveal-up delay-200 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.description")}
          </p>

          {/* Interactive search input — links to /chat */}
          <form
            onSubmit={handleHeroSubmit}
            className="animate-reveal-up delay-300 max-w-xl mx-auto mb-10"
          >
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl px-5 py-3 shadow-xl shadow-primary/5 hover:border-primary/30 focus-within:border-primary/50 transition-colors">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={heroInput}
                onChange={(e) => setHeroInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className={`flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60 text-base ${
                  isArabic ? "text-right" : ""
                }`}
                dir={isArabic ? "rtl" : "ltr"}
              />
              <button
                type="submit"
                className="shrink-0 p-2.5 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-transform"
                aria-label="Start chat"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Trust badges */}
          <div className="animate-reveal-up delay-400 flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground">
            {[
              t("hero.free"),
              t("hero.noRegistration"),
              t("hero.available247"),
            ].map((badge, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ─── BENTO FEATURES ─── */}
      <BentoFeatures />

      {/* ─── LEGAL TOPICS GRID ─── */}
      <LegalTopicsGrid />

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-8 h-px bg-primary/40" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("howItWorks.sectionTag")}</span>
              <span className="w-8 h-px bg-primary/40" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-4">
              {t("howItWorks.sectionTitle")}{" "}
              <span className="text-gradient-emerald">{t("howItWorks.simple")}</span>
            </h2>
          </div>

          {/* Steps — 3-col grid */}
          <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { step: "01", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
              { step: "02", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
              { step: "03", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-muted/20 hover:bg-muted/40 rounded-2xl p-8 lg:p-10 transition-all duration-300 scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700"
              >
                {/* Step number */}
                <span className="block font-mono text-xs font-bold tracking-widest text-primary/40 mb-6 uppercase">
                  {item.step}
                </span>
                <h3 className={`font-display font-bold text-xl mb-3 ${isArabic ? "text-right" : ""}`}>
                  {t(item.titleKey)}
                </h3>
                <p className={`text-muted-foreground text-sm leading-relaxed ${isArabic ? "text-right" : ""}`}>
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection />

      {/* ─── PRICING ─── */}
      <PricingSection />

      {/* ─── BLOG HIGHLIGHTS ─── */}
      <BlogHighlights lang={lang} />

      {/* ─── FAQ ─── */}
      <FAQSection
        items={faqItems}
        title={t("faq.title")}
        dir={isArabic ? "rtl" : "ltr"}
      />

      {/* ─── FINAL CTA ─── */}
      <section className="py-28 lg:py-40 relative overflow-hidden">
        {/* Bold layered background — mirrors hero */}
        <div className="absolute inset-0 bg-mesh-gradient" />
        <div className="absolute inset-0 bg-background/40" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">

          {/* Section tag */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="w-8 h-px bg-primary/40" />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-premium border border-border/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("hero.badge")}</span>
            </div>
            <span className="w-8 h-px bg-primary/40" />
          </div>

          {/* Headline — hero-scale */}
          <h2 className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-tight leading-[1.08] mb-6 ${isArabic ? "text-right" : ""}`}>
            {t("cta.title")}
            <span className="block text-gradient-emerald mt-2 pb-[0.2em] -mb-[0.2em] pr-[0.1em]">{t("cta.titleHighlight")}</span>
          </h2>

          {/* Description */}
          <p className={`text-muted-foreground mb-12 max-w-2xl mx-auto text-lg lg:text-xl leading-relaxed ${isArabic ? "text-right" : ""}`}>
            {t("cta.description")}
          </p>

          {/* Trust badges row — glass cards */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
            {[t("hero.free"), t("hero.noRegistration"), t("hero.available247")].map((badge, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2.5 glass-premium border border-border/40 rounded-xl text-sm font-medium text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                {badge}
              </span>
            ))}
          </div>

          {/* CTA button — bold & large */}
          <Link
            href="/chat"
            className="inline-flex items-center gap-3 btn-premium px-12 py-6 text-xl font-bold bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/30 group"
          >
            <span>{t("cta.button")}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
