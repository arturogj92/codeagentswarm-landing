# SEO status

Last updated: 2026-08-23

Release state: validated in the current worktree. Deployment and post-release measurement remain pending.

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
| Sitemap URLs returning 200 in the production build | 178 / 178 |
| Guide First Load JS | 185 kB, down from about 746 kB |
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

## Open priorities

1. Deploy this worktree, then compare Beta CTA, confirmed waitlist and guide download events against an equal pre-release window.
2. Connect landing acquisition to account creation, install and first activation. Download clicks are not customers.
3. Keep the high-impression snippets stable until the full September 9 Search Console review.
4. Export Search Console query-by-page data before consolidating similar guides.
5. Run the reviewed free editorial outreach manually and record accepted links plus their attributes.
6. Optimize the largest guide images and the homepage video after measuring real Core Web Vitals.
7. Design a localized lead capture for Spanish traffic, which currently converts better in guides but records no email leads.

## Guardrails

- Do not change a ranking URL, canonical or hreflang target without page-level Search Console evidence and a redirect plan.
- Do not bulk-rewrite titles because of character count alone.
- Do not publish another broad guide cluster while existing pages already cover the intent.
- Do not count an email event, download click or contact click as a lead unless delivery or activation is confirmed.
- Do not buy directory bundles or links. Revalidate each paid placement immediately before purchase.

## Next update

Earliest full snippet review: 2026-09-09. Review conversion sooner after seven complete post-deployment days.
