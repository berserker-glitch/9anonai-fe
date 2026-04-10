# SEO Domination Plan: Rank #1 for Morocco Legal + "9anoun AI"

## Current Situation Analysis

### Google Search Console Key Metrics
- **Total Impressions**: ~114K | **Total Clicks**: ~1,512 | **Avg CTR**: ~1.3% | **Avg Position**: ~6.0
- **Top Traffic Source**: Morocco (1,207 clicks / 32,263 impressions)
- **Devices**: 72% Mobile, 27% Desktop
- **Growth**: Exponential — from ~0 clicks/day in Dec 2025 to **87 clicks/day** by April 2026

### Brand Keyword Performance
| Query | Clicks | Impressions | Position | Issue |
|-------|--------|-------------|----------|-------|
| `9anon ai` | 212 | 3,319 | **2.92** | ⚠️ Not #1 — needs to be position 1.0 |
| `9anoun ai` | 19 | 618 | **5.67** | ❌ Competitor's name — we rank #5.67 |
| `9anon.ia` | 19 | 765 | **4.26** | ❌ Variant — not #1 |
| `9anoun.ia` | 3 | 247 | **6.47** | ❌ Variant — not #1 |
| `9anoun.ai` | 2 | 50 | **6.04** | ❌ Competitor domain variant |
| `9anon maroc` | 11 | 73 | **3.4** | ⚠️ Close to #1 |
| `kanoun ai` | — | — | **9** | ❌ Not ranking well |
| `qanoun ai` | — | 12 | **8.25** | ❌ Not ranking well |

### High-Value Legal Queries We Should Dominate (but don't)
| Query | Impressions | Position | Opportunity |
|-------|------------|----------|-------------|
| `tax compliance morocco` | 648 | 7.89 | 🔥 HIGH |
| `mahakim.ma` (and variants) | 500+ | 6+ | 🔥 HIGH |
| `divorce in morocco` | 17 | 11.94 | 🔥 HIGH |
| `code du travail maroc` | 16 | 30.56 | 🔥 HIGH |
| `morocco citizenship` | 11 | 48.64 | 🔥 HIGH |
| `company registration morocco` | 11 | 32.09 | 🔥 HIGH |
| `moroccan family code` | 189 | 2.59 | ⚠️ Close |
| `قانون الكراء في المغرب 2026` | 224 | 4.4 | ⚠️ Close |

---

## Proposed Changes

### Phase 1: Technical SEO Fixes (Immediate Impact)

#### [MODIFY] [layout.tsx](file:///home/yasser/9anonai/FE/app/layout.tsx)
**Critical fix: `dir` attribute is hardcoded to "ltr"**
- Line 272: `dir="ltr"` even when Arabic is detected — this hurts Arabic SEO rendering and Google's understanding of RTL content
- Fix: Use dynamic `dir={dir}` based on detected language
- Add more brand keyword variants to keywords array, especially competitor misspellings
- Add `9anoun ai` more prominently in alternateName in JSON-LD schemas

#### [MODIFY] [middleware.ts](file:///home/yasser/9anonai/FE/middleware.ts)
- Add `/vs-9anoun` to the SEO page slugs so it gets locale-based rewriting (currently excluded)
- This means we lose trilingual indexing for this important comparison page

#### [MODIFY] [sitemap.ts](file:///home/yasser/9anonai/FE/app/sitemap.ts)  
- Add `/about` page with trilingual hreflang alternates
- Add `/contract-builder` page to sitemap
- Ensure vs-9anoun gets trilingual variants
- Add `x-default` hreflang pointing to root

---

### Phase 2: Brand Keyword Domination ("9anoun AI" hijacking)

#### [MODIFY] [vs-9anoun/page.tsx](file:///home/yasser/9anonai/FE/app/vs-9anoun/page.tsx)
**Major rewrite to become the definitive "9anoun AI" search result:**
- Add massive amounts of semantic content about "9anoun AI" vs "9anon AI"
- Add FAQ schema with questions like "What is 9anoun AI?", "Is 9anon AI better than 9anoun AI?"
- Include a comprehensive comparison table with more rows
- Add JSON-LD FAQPage structured data for rich snippets
- Add all competitor brand misspellings in keywords: `9anoun`, `9anouni`, `kanoun.ia`, `qanoun.ia`, `9anon.ia`, `9anonai`, `9anounai`
- Add Arabic content sections (currently English-only — huge miss for Moroccan users)
- Add French content sections
- **Make it trilingual** to capture FR/AR searchers too

#### [NEW] Content Strategy: Add competitor comparison content in blog
Create blog posts that specifically target "9anoun AI" queries:
- Blog: "9anon AI vs 9anoun AI: Which Moroccan Legal AI is Better?" (en/fr/ar)
- Blog: "Best Free Legal AI in Morocco 2026" (en/fr/ar)  
- Blog: "استشارة قانونية مجانية بالذكاء الاصطناعي في المغرب" (ar)

---

### Phase 3: Legal Query Domination

#### [MODIFY] Root layout JSON-LD schemas
- Add `sameAs` links to social profiles in Organization schema
- Add `BreadcrumbList` JSON-LD on all pages for better SERP display
- Add proper `WebSite` schema with SearchAction for sitelinks searchbox
- Make `AggregateRating` values more realistic or remove (Google penalizes fake ratings)

> [!WARNING]
> The current `aggregateRating` shows `ratingValue: "4.9"` with `ratingCount: "1200"`. If Google cannot verify these ratings come from a real review system, this could trigger a manual action. Consider removing or implementing a real review collection system.

#### [NEW] New SEO Landing Pages (High-Value Legal Topics)
Based on Search Console data showing high impressions but 0 clicks, create new pages:

1. **`/inheritance-law`** — `قانون الإرث في المغرب` (800+ impressions from GSC, blog exists but no landing page)
2. **`/company-registration`** — 6,000+ impressions for starting business queries
3. **`/citizenship-law`** — Morocco citizenship/nationality queries (1,000+ impressions)
4. **`/real-estate-law`** — Property buying/selling law (high interest)
5. **`/criminal-law`** — Penal code queries

Each should be a trilingual SEO landing page similar to existing ones (legal-ai, divorce-law).

#### [MODIFY] SEO Data Files
- [seo-page-types.ts](file:///home/yasser/9anonai/FE/lib/seo-page-types.ts) — Add new page slugs
- [seo-pages-registry.ts](file:///home/yasser/9anonai/FE/lib/seo-pages-registry.ts) — Register new pages
- Create new data files for additional landing pages

---

### Phase 4: Content & CTR Optimization

#### [MODIFY] Blog post meta descriptions
Many blog pages have high impressions but 0% CTR. This means our title tags and meta descriptions aren't compelling enough:

- Divorce procedure blog: 3,164 impressions, only 10 clicks (0.32% CTR)
- Starting business blog: 6,216 impressions, only 2 clicks (0.03% CTR)
- Understanding Moudawana blog: 2,631 impressions, 0 clicks (0% CTR)

**Action**: Rewrite meta titles/descriptions for top 20 blog posts to include:
- Numbers and dates ("2026 Guide")
- Power words ("Free", "Complete", "Step-by-Step")
- Question format matching user intent
- Arabic/French-first titles for AR/FR content

#### [MODIFY] Internal Linking Strategy
Currently the blog posts link to related posts, but there's no systematic internal linking to:
- SEO landing pages from blog posts
- Blog posts from SEO landing pages
- The comparison page from relevant content

---

### Phase 5: Quick Wins Implementation

#### [MODIFY] [layout.tsx](file:///home/yasser/9anonai/FE/app/layout.tsx) — Fix HTML dir attribute
```tsx
// Line 272: BEFORE
<html lang={lang} dir="ltr" suppressHydrationWarning>
// AFTER  
<html lang={lang} dir={dir} suppressHydrationWarning>
```

#### [MODIFY] [robots.ts](file:///home/yasser/9anonai/FE/app/robots.ts)
- Remove `/chat/` from disallow — Google can index the chat page for brand queries
- Currently chat page is disallowed but it has 60 impressions

#### [MODIFY] [next.config.ts](file:///home/yasser/9anonai/FE/next.config.ts)
- Add trailing slash configuration for URL consistency
- Add security headers for better PageRank signals

---

## Open Questions

> [!IMPORTANT]
> 1. **Aggregate Rating**: The JSON-LD has a fake-looking `4.9/5 with 1200 reviews`. Do you have a real review system? If not, should we remove this to avoid Google penalties?
> 2. **New SEO Landing Pages**: Should I prioritize creating all 5 new landing pages, or start with the top 2-3 (inheritance, company registration, citizenship)?
> 3. **Blog Meta Rewrites**: Should I rewrite meta titles/descriptions for the top 20 underperforming blog posts, or do you want to handle content separately?
> 4. **vs-9anoun page**: Making it trilingual is a significant change. Should I create `/ar/vs-9anoun`, `/fr/vs-9anoun`, `/en/vs-9anoun` routes, or keep it as a single page with all three languages?
> 5. **Chat page in robots**: Currently `/chat/` is disallowed. Should we allow Google to index it? It could capture branded queries like "9anon ai chat".

## Verification Plan

### Automated Tests
- Build the Next.js app (`npm run build`) to verify no broken pages
- Validate all JSON-LD schemas using Google's Rich Results Test
- Check sitemap.xml output for correct URLs and hreflang

### Manual Verification
- Google Search Console: Monitor position changes for key queries over 2-4 weeks
- Check Google rich results preview for FAQ snippets
- Verify all new pages render correctly in all 3 languages
- Test Core Web Vitals after changes (LCP, CLS, FID)

## Priority Execution Order
1. ⚡ **Fix `dir="ltr"` bug** — Immediate, affects all Arabic SEO
2. ⚡ **Enhance vs-9anoun page** — Targets competitor brand stealing
3. 🔥 **Add FAQ schema** — Quick win for rich snippets
4. 🔥 **Fix robots.txt** — Allow /chat indexing
5. 📈 **Create new SEO landing pages** — Medium-term traffic growth
6. 📈 **Rewrite blog meta descriptions** — CTR improvement
7. 🏗️ **Trilingual vs-9anoun** — Long-term brand defense
