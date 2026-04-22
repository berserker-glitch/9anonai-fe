"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation, useLanguage } from "@/lib/language-context";
import { MessageSquare, FileSignature } from "lucide-react";

const tabs = [
  { id: "chat"     as const, labelKey: "showcase.tabChat",     descKey: "showcase.chatDesc",     Icon: MessageSquare, href: "/chat" },
  { id: "contract" as const, labelKey: "showcase.tabContract", descKey: "showcase.contractDesc", Icon: FileSignature, href: "/contract-builder" },
];

function ChatMockup({ t }: { t: (k: string) => string }) {
  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-end">
        <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-br-sm max-w-[72%] text-sm shadow-sm shadow-primary/10" dir="rtl">
          {t("chat.userQuestion")}
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
          <span className="text-primary font-display font-bold text-sm">٩</span>
        </div>
        <div className="glass-premium px-4 py-3.5 rounded-2xl rounded-bl-sm max-w-[78%] border border-border/30 text-sm leading-relaxed text-muted-foreground" dir="rtl">
          {t("chat.aiResponse")}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/25 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span className="text-gold font-medium">{t("chat.sources")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractMockup() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-mono text-muted-foreground">contract-generator.ai · Generating…</span>
      </div>
      <div className="space-y-0 border border-border/30 rounded-xl overflow-hidden">
        {[
          { label: "Type",         value: "Employment Contract (CDI)" },
          { label: "Jurisdiction", value: "Kingdom of Morocco" },
          { label: "Language",     value: "French / Arabic" },
          { label: "Status",       value: "Draft ready" },
        ].map((row, i) => (
          <div key={row.label} className={`flex items-center justify-between px-4 py-3 text-sm ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl bg-muted/20 border border-border/25 space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Generating contract</span>
          <span className="text-primary font-medium">75%</span>
        </div>
        <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-primary to-gold rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  const { t } = useTranslation("landing");
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeTab, setActiveTab] = useState<"chat" | "contract">("chat");

  const active = tabs.find((tab) => tab.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-[0.06] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header — centered */}
        <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/8 text-gold text-xs font-semibold rounded-full mb-6 border border-gold/15 uppercase tracking-[0.15em]">
            {t("showcase.tag")}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-4">
            {t("showcase.title")}{" "}
            <span className="text-gradient-gold">{t("showcase.titleHighlight")}</span>
          </h2>
        </div>

        {/* Browser mockup */}
        <div className="max-w-4xl mx-auto scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
          <div className="glass-premium rounded-2xl border border-border/40 overflow-hidden shadow-2xl shadow-black/10">
            {/* Chrome bar */}
            <div className="bg-muted/40 px-4 py-3.5 border-b border-border/25 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/55" />
                <div className="w-3 h-3 rounded-full bg-gold/55" />
                <div className="w-3 h-3 rounded-full bg-primary/55" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 bg-background/60 rounded-md text-[11px] text-muted-foreground font-mono">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  9anonai.com/{active.href.replace("/", "")}
                </div>
              </div>
            </div>

            {/* Tab bar */}
            <div className={`flex border-b border-border/25 ${isArabic ? "flex-row-reverse" : ""}`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all duration-300 relative ${
                    activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                  }`}
                >
                  <tab.Icon className="w-4 h-4" />
                  <span>{t(tab.labelKey)}</span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-gold" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="min-h-[300px] bg-background/30">
              {activeTab === "chat"     && <ChatMockup t={t} />}
              {activeTab === "contract" && <ContractMockup />}
            </div>

            {/* Description bar */}
            <div className="px-6 py-4 border-t border-border/25 bg-muted/20 flex items-center justify-between gap-4">
              <p className={`text-sm text-muted-foreground flex-1 ${isArabic ? "text-right" : ""}`}>
                {t(active.descKey)}
              </p>
              <Link
                href={active.href}
                className="shrink-0 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                {t("hero.ctaPrimary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
