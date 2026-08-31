# SEO status

Last updated: 2026-08-31

Release state: the August 31 conversion, comparison and media changes passed production validation. Start post-release measurement only after the master deployment reports success.

## Current state

Organic acquisition is growing quickly. The main constraint has moved from discovery to conversion, measurement and link quality.

| Signal | Current baseline |
| --- | ---: |
| Search Console clicks, 92 days | 9,098 |
| Search Console impressions, 92 days | 1,068,829 |
| CTR, 92 days | 0.85% |
| Average position, 92 days | 7.14 |
| Latest 30-day clicks vs previous 30 days | +173% |
| Latest 30-day impressions vs previous 30 days | +53% |
| Clean Umami pageviews, 90 days | 36,864 |
| Clean Umami visitors, 90 days | 29,308 |
| Visitors acquired by organic search | 22,226, or 75.84% |
| Guide share of clean pageviews | 30,552, or 82.92% |
| Home visitor to download click | 21.86% |
| Guide pageview to direct download click | 0.635% |
| Guide pageview to direct download click, Aug 24-30 | 71 / 6,034, or 1.177% |
| Sitemap URLs returning 200 in the production build | 182 / 182 |
| Guide First Load JS | 185 kB, down from about 746 kB |
| Static pages generated | 221, down from 382 |
| Domain Rating in SEO MCP | 4.6 |
| Referring domains in SEO MCP | 473 |
| Referring domains marked follow | 9% |

The SEO MCP follow fields are percentages, not counts. The previous status incorrectly reported `4` dofollow referring domains. At 9%, the rounded estimate is about 43 follow referring domains, but only the percentage should be treated as measured.

The detailed evidence and decisions live in [the August 23 growth and conversion audit](../diagnostics/seo-growth-conversion-authority-2026-08-23.md). The earlier Search Console baseline remains in [the August Search Console review](../diagnostics/search-console-seo-2026-08.md).

## Completed in this worktree

- Repaired both Beta CTAs. They now reach the real download section instead of targeting a form that is not rendered.
- Moved the primary Beta CTA above the product image so it appears in the first desktop and mobile viewport.
- Stopped the Linux waitlist from showing and recording success after an HTTP or network failure.
- Corrected stale Beta claims in English and Spanish about required subscriptions, supported platforms and founder pricing.
- Removed the full 166-guide registry from the client bundle while preserving the same on-topic related-guide selection.
- Added self-canonical, localized, `noindex,follow` metadata to the survey pages.
- Added the six indexable legal pages to the sitemap.
- Updated the public GitHub repository descriptions, homepages and topics to use the same category language.
- Corrected stale Gemini wording in two open awesome-list PR descriptions without sending follow-up comments.
- Replaced stale outreach drafts with a reviewed, factual and manual-only outreach plan.
- Added privacy-safe real-user Core Web Vitals to the existing Umami tracker.
- Converted the seven largest and most reused guide screenshots to responsive Next.js image output.
- Removed 166 duplicate guide prerenders while preserving permanent wrong-language redirects.
- Added localized About pages, creator and organization structured data, footer links and sitemap entries.
- Corrected Mobile Connect access facts across sixteen English and Spanish comparison pages.
- Refreshed pricing and access facts across twenty-four English and Spanish guides using current xAI, Anthropic, Moonshot, Google, OpenAI and Cursor sources.
- Prepared five page-specific editorial pitches for explicit approval. Nothing has been sent.
- Confirmed that the separate aggregate installation funnel already measures download requests, fresh launches, first terminals and seven-day returns.
- Revalidated volatile pricing, plan, model and token facts in the English and Spanish Cursor, Kimi, OpenCode, Grok, Claude and Codex guides against first-party sources.
- Corrected the Grok Build `llms.txt` claim: it is available on every xAI plan, including Free; SuperGrok tiers raise limits.
- Refreshed public repository metrics and current product scope across the English and Spanish comparison guides, including major Conductor, Superset and T3 changes.
- Added `node scripts/competitor-refresh.mjs --check` plus a regression check for verification dates on volatile pricing and comparison content.
- Reused every guide's existing intent-specific `ctaText` once, in the inline download CTA, without changing event names, positions, URLs or snippets.
- Refreshed GitHub activity and star counts on August 31 across four bilingual comparisons and the bilingual category ranking. Product facts remain dated August 25 where they were not rechecked.
- Added responsive image output for the remaining reused `resume-conversation.png` screenshot.
- Replaced the obsolete 5.67 MB homepage showcase clip with the existing current 82 KB clip.
- Made below-fold instructional videos user-initiated with metadata-only preload; the early intent-matched product block is unchanged.
- Confirmed from current [Vercel Bot Management documentation](https://vercel.com/docs/bot-management) that Bot Protection and Attack Challenge Mode exclude verified bots. Recent Search Console crawling shows Google can reach the site, so no firewall weakening was justified. The current dashboard session cannot access the production project, so project traffic logs were not inspected.

## Open priorities

1. Measure the inline guide CTA after 14 complete post-deployment days. Its Aug 24-30 baseline is 18 / 6,034 pageviews, or 0.298%; the initial success threshold is at least 0.358% without reducing total guide conversion below 1.177%.
2. Review the aggregate installation funnel after cohorts mature. Do not invent person-level acquisition attribution without a separate privacy decision.
3. Keep the high-impression snippets stable until the full September 9 Search Console review.
4. Export Search Console query-by-page data before consolidating similar guides.
5. After explicit approval, send the four revalidated editorial pitches and the two prepared GitHub reminders, then record accepted links and their attributes. Keep Zevyn and the AI-assisted DEV draft on hold.
6. Inspect production Vercel firewall logs with the owning account only if verified-bot crawling or indexing declines. Do not add a broad bypass based on generic curl challenges.
7. Revisit the remaining homepage video and lower-frequency screenshots only if real-user performance data shows they are still a bottleneck.
8. Design a localized lead capture for Spanish traffic, which currently converts better in guides but records no email leads.

## Guardrails

- Do not change a ranking URL, canonical or hreflang target without page-level Search Console evidence and a redirect plan.
- Do not bulk-rewrite titles because of character count alone.
- Do not publish another broad guide cluster while existing pages already cover the intent.
- Do not count an email event, download click or contact click as a lead unless delivery or activation is confirmed.
- Do not buy directory bundles or links. Revalidate each paid placement immediately before purchase.

## Next update

Earliest full snippet review: 2026-09-09. Review the inline CTA after 14 complete post-deployment days.
