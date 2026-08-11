# SEO status

Last updated: 2026-08-11

Release state: published to the production branch `master` on 2026-08-11.

## Current state

**Healthy and growing.** Organic visibility is rising, the rendered site is technically clean, and the current work is ready for the production branch. The next phase is post-deployment measurement, not another broad rewrite.

| Signal | Current baseline |
| --- | ---: |
| Search Console clicks, 92 days | 9,098 |
| Search Console impressions, 92 days | 1,068,829 |
| CTR, 92 days | 0.85% |
| Average position, 92 days | 7.14 |
| Latest 30-day clicks vs previous 30 days | +173% |
| Latest 30-day impressions vs previous 30 days | +53% |
| Sitemap URLs returning 200 | 160 / 160 |
| Broken internal links | 0 |
| Duplicate rendered titles or descriptions | 0 |
| Referring domains in SEO MCP snapshot | 420 |
| Dofollow referring domains in SEO MCP snapshot | 4 |

The detailed baseline, page opportunities, methodology and full change log live in [the August 2026 Search Console review](../diagnostics/search-console-seo-2026-08.md).

## Completed

- Preserved all indexed URLs, canonical targets and language alternates.
- Improved snippets on the highest-impression Search Console opportunities.
- Corrected stale Kimi, Linux, privacy and six-agent product claims.
- Added visible authorship and stronger Article structured data to every guide.
- Corrected sitemap dates, guide-hub social URLs and `llms.txt` parity.
- Crawled all 160 sitemap URLs and checked internal links, local assets, metadata, robots, headings, language alternates and structured data.
- Updated the Skills Marketplace guide to the six current agent destinations while labelling its older screenshot truthfully.

## Open priorities

1. **Measure the release after 28 complete days.** Compare edited pages against an equal previous period in Search Console, watching clicks, impressions, CTR and position together.
2. **Earn relevant editorial dofollow links.** The SEO MCP snapshot shows 420 referring domains but only 4 dofollow referring domains, which is now the clearest off-page gap.
3. **Export Search Console query-by-page data.** Use it before merging or redirecting similar guides; separate query and page exports cannot prove cannibalization.
4. **Check verified crawler traffic in Vercel firewall logs.** Do not relax the firewall based only on generic command-line challenges.
5. **Replace transition-era product screenshots when fresh captures are available.** The current captions disclose which images show retired UI, so this is a freshness improvement rather than an indexing blocker.

## Guardrails

- Do not change a ranking URL, canonical or hreflang target without page-level Search Console evidence and a redirect plan.
- Do not bulk-rewrite titles because of character count alone. Prioritize pages with impressions, stable position and weak CTR.
- Do not treat third-party keyword or backlink estimates as more authoritative than Search Console and verified link data.
- Update this file after every meaningful SEO deployment or monthly measurement review.

## Next update

Earliest full 28-day review: 2026-09-09. Review sooner if indexing, crawl or traffic alerts show a material regression.
