# Search Console SEO review: August 2026

## Source and scope

- Export: `codeagentswarm.com-Performance-on-Search-2026-08-11.zip`
- Search type: Web
- Period: May 10 through August 9, 2026 (92 days)
- Files reviewed: chart, queries, pages, countries, devices, search appearance and filters
- The query export is capped at 1,000 rows and omits anonymized queries. Its rows account for 2,367 of 9,098 clicks, so query totals must not be treated as site totals.
- Page totals can exceed chart totals because Search Console aggregates dimensions differently and includes URL variants such as fragments.

## Current performance

| Metric | 92 days | Previous 30 days | Latest 30 days | Change |
| --- | ---: | ---: | ---: | ---: |
| Clicks | 9,098 | 2,116 | 5,778 | +173% |
| Impressions | 1,068,829 | 345,464 | 529,695 | +53% |
| CTR | 0.85% | 0.61% | 1.09% | +0.48 points |
| Average position | 7.14 | 9.09 | 5.91 | 3.18 positions better |

Organic visibility is growing quickly. The main opportunity is not emergency index repair; it is converting existing first-page impressions into more clicks while keeping URLs and search intent stable.

## Highest-impact page opportunities

The upside estimate below is the additional clicks over the exported period if CTR improves by 0.5 percentage points while impressions stay constant. It is a prioritization aid, not a forecast.

| Page | Clicks | Impressions | CTR | Position | Approx. upside |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/en/guides/claude-code-history-complete-guide` | 1,078 | 241,382 | 0.45% | 6.01 | +1,207 |
| `/en/guides/run-multiple-claude-code-sessions` | 694 | 137,297 | 0.51% | 5.94 | +686 |
| `/en/guides/run-multiple-claude-chats` | 483 | 76,049 | 0.64% | 4.16 | +380 |
| `/en/guides/claude-code-history` | 296 | 66,118 | 0.45% | 8.85 | +331 |
| `/en/guides/codex-yolo-mode` | 994 | 58,281 | 1.71% | 5.85 | +291 |
| `/en/guides/claude-code-yolo-mode-explained` | 161 | 49,801 | 0.32% | 9.15 | +249 |
| `/en/guides/kimi-code-plans-and-pricing` | 245 | 42,372 | 0.58% | 6.46 | +212 |
| `/en/guides/opencode-conversation-history` | 622 | 31,533 | 1.97% | 4.87 | +158 |

The snippets of the first seven pages were updated without changing their URLs, canonical targets or H1 intent. OpenCode history was left unchanged because its CTR is already materially stronger.

## Query findings

- Brand queries: 740 clicks, 1,925 impressions, 38.44% CTR and average position 2.53.
- Non-brand rows in the capped export: 1,627 clicks, 137,000 impressions, 1.19% CTR and position 5.78.
- Strong clusters: Codex, Claude, OpenCode, history, YOLO/auto mode and multi-session searches.
- Clear snippet opportunities include `claude yolo mode`, `codex auto mode`, `codex yolo mode`, `claude code history`, `can you run multiple claude chats at once` and Kimi pricing/model searches.
- ADE and Grok Build have too little mature query data to judge. Do not rename or retire those pages until they have had a clean post-launch measurement window.

## Changes made from the review

- Preserved every indexed URL; no redirects, merges or slug changes.
- Differentiated the native Claude history guide from the CodeAgentSwarm product-history guide through titles and descriptions.
- Rewrote snippets for the highest-impression history, parallel-session and YOLO pages around the actual queries in Search Console.
- Corrected Kimi Code pricing and model claims against current official Kimi sources. K2.7 Code is the default, with 256K context and current API rates, rather than the older K3 assumptions.
- Added visible editorial attribution plus `author` and `image` to Article structured data.
- Removed references to a nonexistent X/Twitter account and ignored `keywords` metadata.
- Corrected claims about Linux availability and how code reaches third-party AI providers.
- Made related-guide recommendations stay inside the same topic.
- Added truthful `lastmod` dates to the guide hubs and removed build-time dates as a fallback for undated guides.
- Restored the two guide URLs missing from `llms.txt` and updated the six-agent product roster.

## Second technical sweep

A production build was crawled locally from its generated sitemap before deployment:

- 160 of 160 sitemap URLs returned HTTP 200.
- The sitemap contains 160 unique URLs: 154 guides and 6 static pages.
- All 160 pages have unique titles and descriptions.
- No broken internal link was found across 166 unique internal targets.
- No broken local asset was found across 40 direct targets; the broader responsive-asset pass covered 58 generated variants.
- Forty-two unique external links were checked: 40 resolved successfully, while `claude.ai` and `x.ai` returned crawler-specific 403 responses rather than missing-page responses.
- The root redirects to `/en`, an invented URL returns 404, and `robots.txt` exposes the sitemap without blocking guide paths.
- Every rendered guide has one canonical URL, English/Spanish/x-default alternates, indexable robots directives, one H1, a visible byline and Article structured data.
- `llms.txt` contains exactly the same 154 guide URLs as the sitemap.
- TypeScript and the production build pass. The repository's existing `next lint` command cannot run because ESLint is not installed; this review did not add an unrelated dependency change.

The sweep found and corrected two current issues: the English and Spanish guide hubs inherited the home page `og:url`, and the Skills Marketplace guide still described the retired three-agent selector. The marketplace copy now matches the six destinations present in the app: Claude, Codex, Antigravity, OpenCode, Kimi Code and Grok Build. Its old screenshot remains clearly labelled as a transition-era image rather than presented as current UI.

Some titles and descriptions remain outside generic character-count guidelines. They were not rewritten in bulk because length alone is not a ranking penalty, Search Console shows strong growth, and changing proven query intent without page-level evidence creates more risk than value.

## SEO MCP snapshot

The SEO MCP added useful directional context but did not replace Search Console:

| Metric | Snapshot |
| --- | ---: |
| Domain rating | 3.6 |
| Backlinks | 863 |
| Referring domains | 420 |
| Dofollow backlinks | 8 |
| Dofollow referring domains | 4 |

The large gap between total referring domains and dofollow referring domains makes relevant editorial authority the clearest remaining off-page priority. Treat this as a third-party snapshot and verify the underlying links before making removal or outreach decisions.

The keyword endpoint placed `claude code history` above 100 monthly searches in the US, while exact variants such as `multiple claude code sessions`, `codex yolo mode` and `kimi code pricing` fell below 100. Those broad buckets support the existing Search Console clusters, but are not precise enough to justify new URL changes. Difficulty and traffic estimates returned no data, so no credits were spent repeating those calls.

## Manual actions not performed

- Check Vercel firewall logs for verified Googlebot and Bingbot traffic. Generic command-line requests currently receive a challenge, but Search Console growth shows Google is crawling the site; do not weaken the firewall without bot-verification evidence.
- Send the five listicle outreach drafts only after personal review. The drafts were updated for Grok Build, but no external message was sent.
- Validate the backlink snapshot, then pursue relevant editorial dofollow links. This cannot be fixed safely in source code.
- Inspect the Search Console query-by-page report before consolidating any similar guide. Separate query and page CSV files cannot prove cannibalization.

## Measurement plan

1. Annotate the production deployment date.
2. Compare each edited page over equal 28-day windows in Search Console.
3. Watch clicks, impressions, CTR and position together; a CTR gain with a large position loss is not a win.
4. Keep URL changes off the table unless the query-by-page report shows sustained cannibalization.
5. Reassess ADE and Grok Build after at least four clean post-launch weeks.

## Generative AI follow-up: August 21

The dedicated Search Generative AI export covers May 20 through August 19, 2026. It reports 381,708 property-level impressions from AI Overviews and AI Mode. The latest 28 days produced 198,997 impressions, 72.2 percent more than the previous 28 days.

Visibility is concentrated:

- The top three pages account for 51.1 percent of page-level impressions.
- Claude pages account for about 71 percent when pages are grouped by slug.
- English pages account for 93.6 percent.
- Desktop accounts for 95.4 percent of property-level impressions.

The page table totals 401,900 impressions because it counts each URL separately, while the property chart counts one property impression when several URLs appear in the same generative result.

### Conversion check

Umami was measured over equal July 2 to July 26 and July 27 to August 20 windows. The known bot interval on August 3 and the August 10 tracking outage were excluded from the post-release data.

| Signal | Before guide CTA release | After guide CTA release |
| --- | ---: | ---: |
| Guide pageviews | 7,839 | 14,827 |
| Comparable guide CTA clicks | 145 | 352 |
| CTA click rate | 1.85% | 2.37% |
| Direct guide downloads | 0 | 182 |

The comparable CTA rate improved by 28.3 percent. Of 134 product-block clicks inspected, 113 produced a direct installer event. Nineteen of the 21 unmatched clicks came from Linux, Android or iOS, where no direct desktop installer was available. The direct-download resolver is therefore working as designed for supported platforms.

### Intent decisions

| Candidate | Decision | Reason |
| --- | --- | --- |
| Claude history and multiple-chat winners | Optimize existing | Add direct bilingual links to the matching Codex and OpenCode clusters without changing the winning URL or search intent. |
| Codex and OpenCode clusters | Optimize existing | They already have indexed history and parallel-session pages. New URLs would duplicate proven intents. |
| Similar Claude history and multiple-session pages | Skip consolidation | The exports do not contain query-by-page data, so they cannot prove cannibalization. |
| High-impression titles and descriptions | Skip for now | They were updated on August 11. Measure a complete 28-day window before changing them again. |
| New broad guide cluster | Skip | Existing pages cover the supported intents, and the current conversion system is improving. |

The smallest supported change is internal linking from the two highest-visibility Claude entry pages to the existing Codex and OpenCode pages. No canonical, slug, hreflang, title or description changes are warranted by this report.
