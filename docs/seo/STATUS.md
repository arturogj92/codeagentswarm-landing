# SEO status

Last updated: 2026-09-08

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
| Domain Rating in SEO MCP | 5 |
| Referring domains in SEO MCP | 367 |
| Follow referring domains in SEO MCP | 17 |

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

## September 1 pricing and query-match pass

Arturo asked to push the pricing cluster now instead of waiting for the September 9 snippet review, so the snippet-stability guardrail was lifted for these pages only. Evidence from the September 1 Search Console export (92 days to August 29): every pricing query sat in positions 8 to 9 with CTR near 0.1% (`claude code pricing` 9,146 impressions, 13 clicks; `claude pricing` 7,628 / 8; `claude plans` 4,828 / 3; `kimi coding plan` 4,561 / 9), and the seven English pricing guides together held about 330,000 impressions for about 1,350 clicks. The AI Overview already answers the official price table, so the pages now lead with what it does not: which tier survives several sessions running together, and one cross-agent comparison table shared by all seven pricing guides, which also turns the cluster into a linked hub.

Changed, English and Spanish, 22 files, all `updatedAt: 2026-09-01`:

- Seven pricing guides: keyword-first `metaTitle` under 62 characters, `metaDescription` with prices first and the parallel-agent hook second, a new sessions table framed as a rule of thumb, the shared cross-agent table with links to the other six pricing guides, and FAQ entries that match the exact queries (`claude subscription`, `claude plans`, `codex plans`, `kimi coding plan`, `kimi token plan`, `kimi subscription`, `kimi moderato limits`, `antigravity plans`). No figure was added that the guides did not already carry; all facts keep the August 25, 2026 verification date.
- Antigravity how-to and YOLO guides, OpenCode YOLO and history guides: an H3 plus first-sentence answer and FAQ entries matching `agy install`, `agy --dangerously-skip-permissions`, `opencode bypass permissions` and `opencode resume session`, which already ranked in positions 3 to 6 without containing the words.
- `public/llms.txt` titles resynced for the 18 guides whose `metaTitle` changed. That file is maintained by hand and had drifted before this pass.

Authority actions the same day: the four listicle pitches were sent (see `listicle-outreach.md`) and reminders were posted on awesome-ai-devtools PR 759 and awesome-agent-orchestrators PR 142.

Measure from September 15 onward: pricing cluster CTR and position per page and per query against the figures above; `agy` and `opencode` query CTR; whether the cross links move the weakest pricing pages (Grok, position 9.8; Cursor, position 6.3 with 954 impressions).

## September 8 review and query-match pass

Evidence from the September 5 Search Console export (92 days to September 3) and Umami. Clicks per day flattened for the first time since May: 410 in the week of August 20 to 26, 385 the following week, while impressions per day kept climbing from 45,558 to 47,258 and reached 62,851 to 66,048 on September 2 and 3. Blended CTR fell from 0.90% to 0.78%. The new visibility arrives on data queries, mostly pricing, that the AI Overview answers without a click. Average position improved to 5.8, so this is not a ranking loss. The pricing pass from September 1 cannot show in this export; judge it from September 15 as planned.

Other findings: `claude-code-history-complete-guide` remains the largest single loss (339,502 impressions, 1,741 clicks, 0.51% CTR, position 5.55). Codex queries bring 1,523 clicks against 951 for Claude with half the impressions; `codex auto mode` is the first non-brand query with 271 clicks in position 3.7. The United States holds 27% of impressions with 0.46% CTR in position 8.1, while Germany, Spain, the United Kingdom and France convert about three times better in positions 5.5 to 6.3. SEO MCP now reports Domain Rating 5, 782 backlinks, 367 referring domains and 17 follow referring domains, counted this time rather than estimated from a percentage. The three awesome-list pull requests (759, 142, 2250) stay open without review and the four September 1 pitches have no reply. One follow-up between September 11 and 15 remains the limit.

Changed, without touching any metaTitle or metaDescription, so the September 9 snippet guardrail holds:

- `kimi-code-on-windows` and `kimi-code-en-windows`: the literal query `irm https://code.kimi.com/kimi-code/install.ps1` had 3,137 impressions in position 8 and one click. Both guides already contained the command inside longer blocks; they now carry an H3, a one-line code block and an FAQ entry whose question is the command itself, mirroring what was done for `agy install`.
- `modo-yolo-claude-code-explicado`: the one-word query `modoyolo` had 2,338 impressions in position 8.7 and one click, and no page contained the token. Added an FAQ entry that defines it and points to the safe alternatives.
- `updatedAt` set to 2026-09-08 on the three files so the sitemap `lastmod` reflects the change.

Not changed on purpose: `claude-code-yolo-mode-explained` (56,669 impressions, 0.40% CTR, position 8.2) and the history guides are high-impression non-pricing snippets and stay frozen until the September 9 review. `t3code` and `t3 code` (5,135 impressions, 0.1% CTR) are a competitor brand and are not pursued. The competitor star counts drift under 5% since August 31 and were not refreshed.

## Open priorities

1. Measure the inline guide CTA after 14 complete post-deployment days. Its Aug 24-30 baseline is 18 / 6,034 pageviews, or 0.298%; the initial success threshold is at least 0.358% without reducing total guide conversion below 1.177%.
2. Review the aggregate installation funnel after cohorts mature. Do not invent person-level acquisition attribution without a separate privacy decision.
3. Keep the high-impression non-pricing snippets stable until the full September 9 Search Console review. The pricing cluster was already rewritten on September 1; judge it from September 15. On September 9, start with `claude-code-yolo-mode-explained` (`claude yolo mode` 7,880 impressions, 0.29% CTR, position 4.1) and the `kimi` non-pricing pages (34,650 impressions, 0.6% CTR).
4. Export Search Console query-by-page data before consolidating similar guides.
5. The four editorial pitches and the two GitHub reminders went out on September 1. Record accepted links and their attributes; one follow-up between September 11 and 15 at most. Keep Zevyn and the AI-assisted DEV draft on hold.
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
