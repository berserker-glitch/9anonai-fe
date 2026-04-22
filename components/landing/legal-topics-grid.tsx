"use client";

import Link from "next/link";
import { useTranslation, useLanguage } from "@/lib/language-context";
import {
  Heart, Briefcase, Car, Divide, Landmark, UserCheck,
  Home, Plane, Key, Building2, ShoppingBag, Scale,
  Receipt, Bitcoin, ShieldAlert,
} from "lucide-react";

type Lang = "ar" | "fr" | "en";

const legalTopics: {
  href: string;
  ar: string;
  fr: string;
  en: string;
  Icon: typeof Heart;
}[] = [
  { href: "/family-law",        ar: "مدونة الأسرة",       fr: "Droit de la Famille", en: "Family Law",        Icon: Heart       },
  { href: "/labor-law",         ar: "مدونة الشغل",        fr: "Code du Travail",     en: "Labor Law",         Icon: Briefcase   },
  { href: "/traffic-law",       ar: "مدونة السير",        fr: "Code de la Route",    en: "Traffic Law",       Icon: Car         },
  { href: "/divorce-law",       ar: "الطلاق",             fr: "Divorce",             en: "Divorce Law",       Icon: Divide      },
  { href: "/inheritance-law",   ar: "الإرث",              fr: "Droit Successoral",   en: "Inheritance Law",   Icon: Landmark    },
  { href: "/employee-rights",   ar: "حقوق العامل",        fr: "Droits Salariés",     en: "Employee Rights",   Icon: UserCheck   },
  { href: "/tenant-rights",     ar: "حقوق المكتري",       fr: "Droits Locataire",    en: "Tenant Rights",     Icon: Home        },
  { href: "/immigration-law",   ar: "الإقامة والتأشيرة",  fr: "Immigration",         en: "Immigration Law",   Icon: Plane       },
  { href: "/rental-law",        ar: "قانون الكراء",       fr: "Bail & Location",     en: "Rental Law",        Icon: Key         },
  { href: "/real-estate-law",   ar: "العقار",             fr: "Immobilier",          en: "Real Estate Law",   Icon: Building2   },
  { href: "/commercial-law",    ar: "القانون التجاري",    fr: "Droit Commercial",    en: "Commercial Law",    Icon: ShoppingBag },
  { href: "/business-legal",    ar: "قانون الأعمال",      fr: "Droit des Affaires",  en: "Business Legal",    Icon: Scale       },
  { href: "/tax-legal",         ar: "الضرائب",            fr: "Fiscalité",           en: "Tax Law",           Icon: Receipt     },
  { href: "/crypto-law",        ar: "العملات الرقمية",    fr: "Cryptomonnaies",      en: "Crypto Law",        Icon: Bitcoin     },
  { href: "/cybersecurity-law", ar: "الأمن السيبراني",   fr: "Cybersécurité",       en: "Cybersecurity Law", Icon: ShieldAlert },
];

export function LegalTopicsGrid() {
  const { t } = useTranslation("landing");
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 scroll-animate opacity-0 transform translate-y-8 transition-all duration-700">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-8 h-px bg-primary/40" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{t("legalTopics.tag")}</span>
            <span className="w-8 h-px bg-primary/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] mb-4">
            {t("legalTopics.title")}{" "}
            <span className="text-gradient-emerald">{t("legalTopics.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("legalTopics.subtitle")}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {legalTopics.map((topic) => {
            const label = topic[language as Lang] ?? topic.en;
            return (
              <Link
                key={topic.href}
                href={topic.href}
                className={`group flex items-center gap-4 px-5 py-4 rounded-xl bg-muted/25 hover:bg-muted/50 transition-all duration-200 scroll-animate opacity-0 transform translate-y-8 transition-[opacity,transform] duration-700 ${isArabic ? "flex-row-reverse" : ""}`}
              >
                <topic.Icon
                  className="w-5 h-5 text-primary shrink-0"
                  strokeWidth={2}
                />
                <span className={`text-sm font-semibold text-foreground/80 ${isArabic ? "text-right" : ""}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
