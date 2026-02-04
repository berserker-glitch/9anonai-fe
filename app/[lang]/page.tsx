"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ExpandedLandingSections } from "@/components/landing/expanded-sections";
import { useTranslation, useLanguage } from "@/lib/language-context";

/**
 * Landing Page - Complete Rebuild
 * Premium design with emerald/gold color theme matching /chat
 * Features: Hero with animated elements, bento grid features, 
 * animated stats, modern how-it-works, and strong CTA
 */
export default function LandingPage() {
  const { t } = useTranslation("landing");
  const { dir } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scroll-reveal');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div dir={dir}>
        <Header />
      </div>

      {/* ============================================
          HERO SECTION - Full viewport with gradient mesh
          ============================================ */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />

          {/* Animated gradient orbs */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary/40 via-primary/20 to-transparent rounded-full blur-[100px] opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-gold/30 via-gold/10 to-transparent rounded-full blur-[80px] opacity-50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/10 via-transparent to-gold/10 rounded-full blur-[120px] opacity-40" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-24 h-24 border border-primary/20 rounded-3xl rotate-12 animate-float-gentle opacity-30" style={{ '--float-rotate': '12deg' } as React.CSSProperties} />
          <div className="absolute top-[25%] right-[12%] w-16 h-16 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl -rotate-12 animate-float-gentle opacity-40" style={{ animationDelay: '-2s', '--float-rotate': '-12deg' } as React.CSSProperties} />
          <div className="absolute bottom-[20%] left-[8%] w-12 h-12 border border-gold/20 rounded-xl rotate-45 animate-float-gentle opacity-25" style={{ animationDelay: '-4s', '--float-rotate': '45deg' } as React.CSSProperties} />
          <div className="absolute bottom-[30%] right-[15%] w-8 h-8 bg-primary/15 rounded-lg rotate-12 animate-float-gentle opacity-30" style={{ animationDelay: '-3s', '--float-rotate': '12deg' } as React.CSSProperties} />

          {/* Glowing dots */}
          <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
          <div className="absolute top-[40%] right-[25%] w-3 h-3 bg-gold rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[35%] left-[20%] w-2 h-2 bg-primary rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-24 pb-20">
          {/* Animated badge */}
          <div className={`inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 shadow-lg shadow-primary/5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm font-medium text-foreground/90">{t("hero.badge")}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{t("hero.badgeEn")}</span>
          </div>

          {/* Main headline */}
          <h1 className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="block text-foreground">{t("hero.title1")}</span>
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
              {t("hero.title2")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t("hero.description")}
            <span className="block mt-2 text-base sm:text-lg opacity-80">{t("hero.descriptionEn")}</span>
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link
              href="/chat"
              className="group relative w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-lg font-semibold rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">{t("hero.ctaPrimary")}</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto px-10 py-5 bg-card/50 backdrop-blur-xl text-foreground text-lg font-medium rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("hero.ctaSecondary")}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {[t("hero.free"), t("hero.noRegistration"), t("hero.available247")].map((item, i) => (
              <span key={i} className="flex items-center gap-2 hover:text-foreground transition-colors cursor-default">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2.5 bg-muted-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION - Floating cards style
          ============================================ */}
      <section className="relative py-24 bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: t("stats.activeUsersValue"), label: t("stats.activeUsers"), color: "primary" },
              { value: t("stats.questionsAnsweredValue"), label: t("stats.questionsAnswered"), color: "gold" },
              { value: t("stats.accuracyValue"), label: t("stats.accuracy"), color: "primary" },
              { value: t("stats.languagesValue"), label: t("stats.languages"), color: "gold" },
            ].map((stat, i) => (
              <div
                key={i}
                className="scroll-animate opacity-0 translate-y-8 group relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 text-center"
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color === 'gold' ? 'from-gold/5 to-transparent' : 'from-primary/5 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <p className={`relative text-5xl sm:text-6xl font-display font-bold mb-3 ${stat.color === 'gold' ? 'text-gradient-gold' : 'text-gradient-emerald'}`}>
                  {stat.value}
                </p>
                <p className="relative text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION - Bento Grid Layout
          ============================================ */}
      <section id="features" className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20">
              {t("features.sectionTag")}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("features.sectionTitle")} <span className="text-gradient-emerald">{t("features.brand")}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("features.sectionDescription")}
            </p>
          </div>

          {/* Bento Grid - 12 column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[280px]">
            {/* Feature 1 - Expert (Large) */}
            <div className="scroll-animate opacity-0 translate-y-8 lg:col-span-7 group relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">{t("features.expertTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{t("features.expertDesc")}</p>
              </div>
            </div>

            {/* Feature 2 - Multilingual */}
            <div className="scroll-animate opacity-0 translate-y-8 lg:col-span-5 group relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-gold/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-gold/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full flex flex-col">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">{t("features.multilingualTitle")}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{t("features.multilingualDesc")}</p>
              </div>
            </div>

            {/* Feature 3 - Instant */}
            <div className="scroll-animate opacity-0 translate-y-8 lg:col-span-4 group relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{t("features.instantTitle")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{t("features.instantDesc")}</p>
              </div>
            </div>

            {/* Feature 4 - Sources */}
            <div className="scroll-animate opacity-0 translate-y-8 lg:col-span-4 group relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-gold/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-gold/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{t("features.sourcesTitle")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{t("features.sourcesDesc")}</p>
              </div>
            </div>

            {/* Feature 5 - Secure */}
            <div className="scroll-animate opacity-0 translate-y-8 lg:col-span-4 group relative bg-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{t("features.secureTitle")}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{t("features.secureDesc")}</p>
              </div>
            </div>

            {/* Feature 6 - Free (Wide) */}
            <div className="scroll-animate opacity-0 translate-y-8 lg:col-span-12 group relative bg-gradient-to-r from-primary/10 via-card/80 to-gold/10 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-gold/30 overflow-hidden transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold/20 to-primary/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-display font-bold mb-2">{t("features.freeTitle")}</h3>
                  <p className="text-muted-foreground text-lg">{t("features.freeDesc")}</p>
                </div>
                <div className="md:ml-auto shrink-0">
                  <Link href="/chat" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                    {t("hero.ctaPrimary")}
                    <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS - Modern timeline style
          ============================================ */}
      <section id="about" className="relative py-32 bg-muted/30 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-gold/10 rounded-full blur-[150px] opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-20 scroll-animate opacity-0 translate-y-8">
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-6 border border-gold/20">
              {t("howItWorks.sectionTag")}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("howItWorks.sectionTitle")} <span className="text-gradient-gold">{t("howItWorks.simple")}</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: "١", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
              { step: "٢", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
              { step: "٣", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
            ].map((item, i) => (
              <div key={i} className="scroll-animate opacity-0 translate-y-8 relative text-center group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary/40 via-gold/30 to-transparent" />
                )}

                <div className="relative z-10">
                  {/* Step number */}
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-gold/80 text-primary-foreground font-display text-4xl font-bold flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30 group-hover:shadow-primary/50 group-hover:scale-110 transition-all duration-300 cursor-default">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-lg max-w-xs mx-auto">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION - Gradient card style
          ============================================ */}
      <section className="relative py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-gold/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary/20 via-transparent to-gold/20 rounded-full blur-[150px] opacity-50" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 translate-y-8">
          {/* CTA Card */}
          <div className="relative bg-card/60 backdrop-blur-2xl rounded-[2.5rem] p-12 md:p-16 border border-border/50 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl opacity-40" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-gold/20 to-transparent rounded-full blur-3xl opacity-30" />

            <div className="relative">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                {t("cta.title")}
                <span className="block mt-3 bg-gradient-to-r from-primary via-primary to-gold bg-clip-text text-transparent">
                  {t("cta.titleHighlight")}
                </span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg lg:text-xl">
                {t("cta.description")}
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-primary via-primary to-gold text-primary-foreground text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all duration-300 group"
              >
                <span>{t("cta.button")}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ExpandedLandingSections />
      <div dir={dir}>
        <Footer />
      </div>
    </div>
  );
}
