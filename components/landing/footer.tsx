"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/language-context";

const legalLinks1 = [
  { href: "/family-law",       key: "footer.familyLaw" },
  { href: "/labor-law",        key: "footer.laborLaw" },
  { href: "/divorce-law",      key: "footer.divorceLaw" },
  { href: "/traffic-law",      key: "footer.trafficLaw" },
  { href: "/employee-rights",  key: "footer.employeeRights" },
  { href: "/tenant-rights",    key: "footer.tenantRights" },
  { href: "/inheritance-law",  key: "footer.inheritanceLaw" },
  { href: "/immigration-law",  key: "footer.immigrationLaw" },
];

const legalLinks2 = [
  { href: "/business-legal",  key: "footer.businessLegal" },
  { href: "/tax-legal",       key: "footer.taxLaw" },
  { href: "/rental-law",      key: "footer.realEstateLaw" },
  { href: "/real-estate-law", key: "footer.realEstateLaw" },
  { href: "/crypto-law",      key: "footer.cryptoLaw" },
  { href: "/commercial-law",  key: "footer.businessLegal" },
];

const productLinks = [
  { href: "#features",         key: "footer.features" },
  { href: "/about",            key: "footer.howItWorks" },
  { href: "/chat",             key: "footer.startChat" },
  { href: "/blog",             key: "footer.blog" },
  { href: "/vs-9anoun",        key: "footer.compare" },
];

const socialLinks = [
  {
    href: "https://web.facebook.com/profile.php?id=61587241558455",
    label: "Facebook",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/9anonai/",
    label: "Instagram",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/9anonAi",
    label: "X",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/9anon-ai",
    label: "GitHub",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useTranslation("landing");

  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 bg-muted/10 pointer-events-none" />
      {/* Primary gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 lg:gap-12 mb-14">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4 lg:pr-12">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-border/30 group-hover:ring-primary/30 transition-all">
                <Image src="/9anon-logo.webp" alt="9anon" fill className="object-cover" sizes="36px" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold tracking-tight">9anon</span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground -mt-0.5">قانون</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-7">
              {t("footer.description")}
            </p>
            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-border/40 bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-5">
              {t("footer.product")}
            </h4>
            <nav className="flex flex-col gap-3">
              {productLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {t(l.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Topics 1 */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-5">
              {t("footer.topLegalTopics")}
            </h4>
            <nav className="flex flex-col gap-3">
              {legalLinks1.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {t(l.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal Topics 2 */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-5 opacity-0 select-none" aria-hidden>
              &nbsp;
            </h4>
            <nav className="flex flex-col gap-3">
              {legalLinks2.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {t(l.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal / Policy */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-5">
              {t("footer.legal")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/privacy"                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t("footer.privacy")}</Link>
              <Link href="/tos"                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t("footer.terms")}</Link>
              <Link href="mailto:9anonai@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{t("footer.contact")}</Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/25 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60">{t("footer.copyright")}</p>
          <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
            {t("footer.madeWith")}
            <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            {t("footer.inMorocco")}
          </p>
        </div>
      </div>
    </footer>
  );
}
