"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ExpandedLandingSections } from "@/components/landing/expanded-sections";
import { useTranslation, useLanguage } from "@/lib/language-context";

export default function LandingPage() {
  const { t } = useTranslation("landing");
  const { dir } = useLanguage();

  const heroRef = useRef<HTMLDivElement>(null);
  const chatPreviewRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-background overflow-hidden">
      <div dir={dir}>
        <Header />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
        {/* Background Layers - Enhanced */}
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-muted/40" />

        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

        {/* Floating Orbs - More dramatic */}
        <div className="absolute top-10 right-[5%] w-[600px] h-[600px] bg-gradient-to-br from-primary/30 via-primary/15 to-gold/20 rounded-full blur-[150px] animate-morph opacity-70 animate-orb-1" />
        <div className="absolute bottom-0 left-[0%] w-[500px] h-[500px] bg-gradient-to-br from-gold/25 via-gold/10 to-primary/15 rounded-full blur-[120px] animate-morph opacity-60 animate-orb-2" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-primary/15 via-gold/5 to-transparent rounded-full blur-[180px] will-change-transform opacity-50" />

        {/* Decorative Elements - Geometric shapes */}
        <div className="absolute top-28 left-[12%] w-20 h-20 border-2 border-gold/20 rounded-2xl rotate-12 animate-float-gentle opacity-30 backdrop-blur-sm bg-gold/5" style={{ '--float-rotate': '12deg' } as React.CSSProperties} />
        <div className="absolute top-48 right-[15%] w-14 h-14 bg-gradient-to-br from-primary/25 to-primary/5 rounded-xl -rotate-12 animate-float-gentle opacity-40 backdrop-blur-sm shadow-xl shadow-primary/10" style={{ animationDelay: '-2s', '--float-rotate': '-12deg' } as React.CSSProperties} />
        <div className="absolute bottom-32 left-[22%] w-10 h-10 border border-primary/25 rounded-lg rotate-45 animate-float-gentle opacity-25 backdrop-blur-sm bg-primary/5" style={{ animationDelay: '-3s', '--float-rotate': '45deg' } as React.CSSProperties} />
        <div className="absolute top-[60%] right-[8%] w-6 h-6 bg-gold/20 rounded rotate-12 animate-float-gentle opacity-35" style={{ animationDelay: '-1.5s', '--float-rotate': '12deg' } as React.CSSProperties} />

        {/* Floating particles */}
        <div className="absolute top-1/4 left-[18%] w-2 h-2 bg-primary/50 rounded-full animate-pulse-subtle" />
        <div className="absolute top-1/3 right-[25%] w-3 h-3 bg-gold/40 rounded-full animate-pulse-subtle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/4 left-[35%] w-2 h-2 bg-primary/60 rounded-full animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[45%] left-[45%] w-1.5 h-1.5 bg-gold/50 rounded-full animate-pulse-subtle" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-5xl mx-auto" ref={heroRef}>
            {/* Badge - Enhanced */}
            <div className="animate-reveal-up inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-premium border-glow-gold mb-10 hover:scale-105 transition-transform duration-300 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-sm font-medium">
                <span className="text-gradient-gold">{t("hero.badge")}</span>
                <span className="mx-2 text-border">•</span>
                <span className="text-muted-foreground">{t("hero.badgeEn")}</span>
              </span>
            </div>

            {/* Main Headline - Enhanced with gradient text */}
            <h1 className="animate-reveal-up delay-100 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[1.05]">
              <span className="block text-foreground drop-shadow-sm">
                {t("hero.title1")}
              </span>
              <span className="block text-gradient-emerald drop-shadow-glow">
                {t("hero.title2")}
              </span>
            </h1>

            <p className="animate-reveal-up delay-200 text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              {t("hero.description")}
              <span className="block mt-3 text-base sm:text-lg opacity-75">
                {t("hero.descriptionEn")}
              </span>
            </p>

            {/* CTA Buttons - Enhanced */}
            <div className="animate-reveal-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href="/chat"
                className="group w-full sm:w-auto btn-premium px-10 py-5 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-105 flex items-center justify-center gap-3"
              >
                <span>{t("hero.ctaPrimary")}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto px-10 py-5 text-lg font-medium glass-premium rounded-2xl hover:border-primary/30 hover:scale-105 hover:bg-primary/5 transition-[transform,colors,border-color,background-color] duration-300 border border-border/50 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t("hero.ctaSecondary")}
              </Link>
            </div>

            {/* Trust badges - Enhanced */}
            <p className="animate-reveal-up delay-400 text-sm text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 group cursor-default">
                <svg className="w-4 h-4 text-primary group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.free")}
              </span>
              <span className="flex items-center gap-1.5 group cursor-default">
                <svg className="w-4 h-4 text-primary group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.noRegistration")}
              </span>
              <span className="flex items-center gap-1.5 group cursor-default">
                <svg className="w-4 h-4 text-primary group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.available247")}
              </span>
            </p>
          </div>

          {/* Chat Preview - Enhanced */}
          <div className="mt-20 lg:mt-28 max-w-4xl mx-auto perspective-1000" ref={chatPreviewRef}>
            <div className="animate-reveal-scale delay-500 relative tilt-3d group">
              {/* Glow Effect - Enhanced */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-primary/20 via-gold/15 to-primary/20 rounded-[2rem] blur-2xl opacity-60 animate-gradient-shift group-hover:opacity-80 transition-opacity duration-500" />

              {/* Chat Window */}
              <div className="relative glass-premium rounded-2xl shadow-2xl overflow-hidden border-glow-emerald hover:shadow-3xl transition-shadow duration-500">
                {/* Browser Bar */}
                <div className="bg-muted/30 px-5 py-4 border-b border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/70 hover:scale-110 transition-transform cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-gold/70 hover:scale-110 transition-transform cursor-pointer" />
                    <div className="w-3 h-3 rounded-full bg-primary/70 hover:scale-110 transition-transform cursor-pointer" />
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-background/50 rounded-lg text-xs text-muted-foreground font-mono hover:bg-background/80 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    9anonai.com/chat
                  </div>
                  <div className="w-20" />
                </div>

                {/* Chat Messages */}
                <div className="p-6 sm:p-8 space-y-6 bg-gradient-to-b from-transparent to-muted/10">
                  {/* User Message - Enhanced */}
                  <div className="flex justify-end group/message">
                    <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-5 py-3.5 rounded-2xl rounded-br-md max-w-sm shadow-lg shadow-primary/20 group-hover/message:scale-105 transition-transform duration-300">
                      <p className="text-right font-medium" dir="rtl">{t("chat.userQuestion")}</p>
                    </div>
                  </div>

                  {/* AI Response - Enhanced */}
                  <div className="flex justify-start group/message">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-gold/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover/message:scale-110 transition-transform duration-300">
                        <span className="text-gradient-emerald font-display font-bold text-lg">٩</span>
                      </div>
                      <div className="glass-premium px-5 py-4 rounded-2xl rounded-bl-md max-w-md border border-border/30 group-hover/message:shadow-lg group-hover/message:shadow-primary/10 transition-all duration-300">
                        <p className="text-right leading-relaxed" dir="rtl">
                          {t("chat.aiResponse")}
                        </p>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30 text-xs text-muted-foreground">
                          <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gradient-gold font-medium">{t("chat.sources")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Bar - Enhanced */}
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-3 bg-muted/30 border border-border/40 rounded-xl px-5 py-4 group/input hover:border-primary/50 transition-colors duration-300">
                    <input
                      type="text"
                      placeholder={t("chat.placeholder")}
                      className="flex-1 bg-transparent outline-none text-right placeholder:text-muted-foreground/60"
                      dir="rtl"
                      disabled
                    />
                    <button className="p-2.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with animated counters */}
      <section className="py-20 border-y border-border/20 bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {[
              { valueKey: "stats.activeUsersValue", labelKey: "stats.activeUsers", color: "primary" },
              { valueKey: "stats.questionsAnsweredValue", labelKey: "stats.questionsAnswered", color: "gold" },
              { valueKey: "stats.accuracyValue", labelKey: "stats.accuracy", color: "primary" },
              { valueKey: "stats.languagesValue", labelKey: "stats.languages", color: "gold" },
            ].map((stat, i) => (
              <div key={i} className="text-center group scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700 hover:scale-105">
                <div className="relative inline-block">
                  <p className={`text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-3 ${stat.color === 'gold' ? 'text-gradient-gold' : 'text-gradient-emerald'} drop-shadow-sm`}>
                    {t(stat.valueKey)}
                  </p>
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full ${stat.color === 'gold' ? 'bg-gold/50' : 'bg-primary/50'} group-hover:w-20 transition-all duration-300`} />
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 mt-2">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-transparent to-muted/20" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] opacity-50 animate-pulse-gentle" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 lg:mb-20 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6 border border-primary/20 hover:bg-primary/20 transition-colors duration-300">
              {t("features.sectionTag")}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("features.sectionTitle")} <span className="text-gradient-emerald">{t("features.brand")}</span>؟
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t("features.sectionDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
                titleKey: "features.expertTitle",
                descKey: "features.expertDesc",
                color: "primary",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                ),
                titleKey: "features.multilingualTitle",
                descKey: "features.multilingualDesc",
                color: "gold",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                titleKey: "features.instantTitle",
                descKey: "features.instantDesc",
                color: "primary",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                titleKey: "features.sourcesTitle",
                descKey: "features.sourcesDesc",
                color: "gold",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                titleKey: "features.secureTitle",
                descKey: "features.secureDesc",
                color: "primary",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                titleKey: "features.freeTitle",
                descKey: "features.freeDesc",
                color: "gold",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="scroll-animate opacity-0 transform translate-y-8 group relative glass-premium rounded-2xl p-8 hover:border-primary/40 transition-[opacity,transform,border-color,box-shadow] duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${feature.color === 'gold'
                  ? 'bg-gradient-to-br from-gold/20 to-gold/5 text-gold border border-gold/20 group-hover:shadow-lg group-hover:shadow-gold/20'
                  : 'bg-gradient-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20'
                  }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-foreground transition-colors">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">{t(feature.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section id="about" className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-zellige opacity-5" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] opacity-40 animate-pulse-gentle" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16 lg:mb-20 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
            <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-6 border border-gold/20 hover:bg-gold/20 transition-colors duration-300">
              {t("howItWorks.sectionTag")}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("howItWorks.sectionTitle")} <span className="text-gradient-gold">{t("howItWorks.simple")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { step: "١", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
              { step: "٢", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
              { step: "٣", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
            ].map((item, i) => (
              <div key={i} className="relative text-center group scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-gold/80 text-primary-foreground font-display text-3xl font-bold flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/25 group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-300 cursor-default">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-4 group-hover:text-foreground transition-colors">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground text-lg group-hover:text-foreground/90 transition-colors">{t(item.descKey)}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-20px)] h-0.5 bg-gradient-to-r from-primary/40 via-gold/30 to-transparent animate-shimmer" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-gold/5 to-primary/10" />
        <div className="absolute inset-0 bg-zellige opacity-5" />
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-gold/10 rounded-full blur-[200px] -translate-y-1/2 -translate-x-1/2 opacity-60 animate-morph" />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight drop-shadow-sm">
            {t("cta.title")}
            <span className="block text-gradient-emerald mt-2 drop-shadow-glow">{t("cta.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg lg:text-xl">
            {t("cta.description")}
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-3 btn-premium px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-primary to-gold/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:shadow-gold/30 hover:scale-105 transition-[transform,box-shadow] duration-300 group"
          >
            <span>{t("cta.button")}</span>
            <svg className="w-5 h-5 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <ExpandedLandingSections />
      <div dir={dir}>
        <Footer />
      </div>
    </div>
  );
}
