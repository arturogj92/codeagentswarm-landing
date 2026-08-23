# SEO, conversion and authority audit

Date: 2026-08-23

## Executive conclusion

CodeAgentSwarm does not have a traffic problem. It has a capture and authority-quality problem.

- Organic visibility reached 1,068,829 impressions and 9,098 clicks in 92 days.
- Clean pageviews grew from 102 per day in the first measured week to 952 per day in the last, a 9.3x increase.
- Organic search acquired 75.84% of clean visitors.
- Guides generated 82.92% of pageviews, but only 0.635% of guide pageviews produced a direct download click.
- The historical email event cannot be treated as a confirmed lead because it fired before the API response.
- Authority improved to DR 4.6 and 473 referring domains, but only 9% of referring domains are marked follow.

The highest-return action is to convert and measure existing demand, not publish another broad content cluster.

Two implementation waves were completed on August 23. The first reached production through commit `7f20aa1`; the second adds trust, real-user performance measurement and lighter guide rendering.

## Measurement method

### Umami

Window: 2026-05-25 00:00 UTC through 2026-08-23 00:00 UTC, covering 90 complete days through August 22.

Two contaminated windows were removed:

- 2026-08-10: 494 pageviews removed because tracking was unavailable for about 11 hours.
- 2026-08-03 02:00 through 06:00 UTC: 512 pageviews removed as an automated spike. Eighty percent of those sessions shared one Linux, Chrome, 1920x1080 and en-US fingerprint; 94.3% viewed one page.

Clean baseline:

| Metric | Value |
| --- | ---: |
| Pageviews | 36,864 |
| Visitors | 29,308 |
| Organic-search visitors | 22,226 |
| Organic share | 75.84% |
| Home pageviews | 5,928 |
| Home visitors | 4,464 |
| Guide pageviews | 30,552 |
| Guide visitors | 26,376 |

### Search Console

The current 92-day export is the source of truth for impressions, clicks, CTR and average position. Third-party keyword tools are used only to suggest topics, not override observed demand.

### Authority

The SEO MCP snapshot is dated 2026-08-23. Its follow fields are percentages, not absolute counts. Earlier documentation interpreted them incorrectly.

## Acquisition

First source per clean visitor:

| Channel | Visitors | Share |
| --- | ---: | ---: |
| Organic search | 22,226 | 75.84% |
| Direct or internal | 6,090 | 20.78% |
| Other | 427 | 1.46% |
| AI assistants | 392 | 1.34% |
| Social | 173 | 0.59% |

The last clean week produced 952 pageviews per day, compared with 102 in the first measured week. The last 30-day block grew another 128.9% over the previous block after normalizing for the tracking outage.

## Conversion

| Signal | Result | Interpretation |
| --- | ---: | --- |
| Home visitors reaching a download click | 976 / 4,464, or 21.86% | Strong once a visitor reaches home |
| Home download events vs all clean visitors | 1,003 / 29,308, or 3.42% | Most organic visitors never see home |
| Direct guide downloads | 194 / 30,552 pageviews, or 0.635% | Main conversion gap |
| Legacy guide intent events | 538 / 30,552, or 1.76% | Includes CTA, product block and navigation clicks |
| Historical waitlist events | 24 | Not confirmed leads because the event fired before the API response |
| Contact clicks | 43 | Click intent only, not delivered leads |
| Beta CTA clicks | 66 | Previously targeted a form absent from the page |
| Beta form submits | 0 | Expected because the form was not rendered |

Of 203 guide downloads with position metadata:

- Product block: 127, or 62.6%.
- Inline CTA: 58, or 28.6%.
- Final CTA: 18, or 8.9%.

The early product block and inline CTA generate 91% of guide downloads. The final CTA is not the main lever.

Spanish produces about one tenth of English traffic but converts 39% to 44% better in guides. It recorded no email leads, so localized capture is a larger opportunity than blindly translating more pages.

## Search demand

Current Search Console totals:

| Metric | Value |
| --- | ---: |
| Clicks | 9,098 |
| Impressions | 1,068,829 |
| CTR | 0.85% |
| Average position | 7.14 |
| Latest 30-day clicks vs previous period | +173% |
| Latest 30-day impressions vs previous period | +53% |

Highest-impression opportunities:

| Page or topic | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| Claude Code history complete guide | 1,078 | 241,382 | 0.45% | 6.01 |
| Run multiple Claude Code sessions | 694 | 137,297 | 0.51% | 5.94 |
| Run multiple Claude chats | 483 | 76,049 | 0.64% | 4.16 |
| Claude Code history | 296 | 66,118 | 0.45% | 8.85 |
| Codex YOLO mode | 994 | 58,281 | 1.71% | 5.85 |
| Claude Code YOLO explained | 161 | 49,801 | 0.32% | 9.15 |
| Kimi Code pricing | 245 | 42,372 | 0.58% | 6.46 |
| OpenCode conversation history | 622 | 31,533 | 1.97% | 4.87 |

The highest-visibility snippets changed on August 11. Changing them again before the September 9 review would destroy the measurement window. No bulk title rewrite is justified.

## Authority

Current snapshot:

| Signal | 2026-08-11 | 2026-08-23 | Change |
| --- | ---: | ---: | ---: |
| Domain Rating | 3.6 | 4.6 | +1.0 |
| Backlinks | 863 | 987 | +14% |
| Referring domains | 420 | 473 | +13% |
| Follow backlinks | 8% | 13% | +5 points |
| Follow referring domains | 4% | 9% | +5 points |

The gap is quality and follow share, not raw backlink volume. Competing domains in the category sit around DR 43 to 68 with 43% to 73% follow referring domains.

Verified follow sources already include the self-owned GitHub Pages site, Uneed, ToolIndex, BitShovel and TrackAwesomeList. Three relevant awesome-list PRs remain open. The merged awesome-gemini-cli entry is inaccurate because it still claims Gemini CLI support and needs an explicit remove-or-correct decision.

## Technical findings

### Fixed

1. The main and pricing Beta CTAs targeted `#beta-signup-form`, but the Beta page did not render that form. Both now link to the real `#download` section and retain analytics.
2. The Beta CTA sat below a large product image. It now appears in the first desktop and mobile viewport.
3. The Linux waitlist recorded success before receiving an accepted API response and still showed success after failures. It now records success only for HTTP success or an already-registered response, and shows a retry path for real failures.
4. `GuideLayout` was a client component importing the complete 166-guide registry. Related-guide selection now runs on the server and sends only slug, title and intro to the client.
5. Survey pages inherited the home canonical and index directive. They now have localized, self-canonical `noindex,follow` metadata plus matching social metadata.
6. Six indexable legal pages were missing from the sitemap. The sitemap now contains 178 canonical URLs.
7. Beta copy incorrectly said Claude Code powered every agent, omitted Windows in onboarding and promised the founder price forever. English and Spanish now match the multiprovider product and first-year promise.
8. Real-user Core Web Vitals now flow through the existing privacy-safe Umami tracker as `web_vital` events with metric, rounded value, unit and rating.
9. Seven of the largest and most reused guide screenshots now use responsive Next.js image output with intrinsic dimensions and `sizes`. Those assets appear in about 139 guide placements.
10. English and Spanish guide prerenders are gated by their parent locale. Historical wrong-language paths remain permanent redirects instead of duplicate static pages.
11. A localized About page now identifies Arturo García, explains the product and editorial method, links official identities and publishes AboutPage, Organization and Person structured data.
12. Sixteen English and Spanish comparison pages now state the current Mobile Connect alpha access model and distinguish the August 23 product update from third-party facts last verified on July 26.

### Measured impact

- Guide First Load JS: about 746 kB before, 185 kB after.
- Reduction: about 75%.
- The former 2.2 MB raw client chunk containing unrelated guide bodies is gone.
- Static output: 218 pages, down from 382. The locale cross-product no longer creates 166 duplicate guide prerenders.
- Sitemap: 180 canonical URLs after adding the English and Spanish About pages.
- Local crawl: 180 of 180 sitemap URLs returned HTTP 200.

### Not changed yet

- Similar guide pairs were not merged because separate query and page exports cannot prove cannibalization.
- The home video remains about 4.2 to 4.6 MB with weak cache headers from its CDN.
- Lower-frequency guide screenshots still use their original files. Convert more only if real-user data shows image transfer or LCP remains a bottleneck.
- Landing analytics cannot join a specific anonymous visit or download click to an installed app without adding a cross-surface identifier.

## Activation measurement

The app and backend already shipped a privacy-safe aggregate installation funnel on August 23:

- Download requests.
- Fresh app launches.
- First terminal created within seven days.
- Return after at least one day and within seven days.

This closes the aggregate download-to-activation gap. It deliberately does not identify a person across the website, installer and app, so acquisition source cannot be attributed to a specific installation. Do not duplicate this funnel in the landing site or weaken that privacy boundary without a separate product decision.

## Free authority work

Completed on 2026-08-23:

- Aligned the public GitHub info and landing repositories with the same category description, canonical homepage and relevant topics.
- Removed stale Gemini wording from the private repository description and topics.
- Corrected the descriptions of awesome-ai-devtools PR 759 and awesome-mac PR 2250.
- Revalidated five current editorial category pages.
- Replaced the stale outreach document with reviewed product facts, a manual send checklist and five page-specific drafts.

Next manual batch:

1. Ask Singularity Society to turn its existing plain-text mention into a factual linked entry.
2. Ask Tembo for an editorial evaluation.
3. Ask Zevyn Studio, AgentsRoom and amux with the page-specific drafts.
4. Publish a useful DEV article with an early contextual link.
5. Verify StackShare, SaaSGrow and MCP client listing eligibility before submitting duplicates.

Nothing has been sent to these editors and no new directory form has been submitted.

## Budget

No money was spent.

The 150 EUR budget should remain untouched until the free editorial batch lands or fails and links are remeasured for two to four weeks. If paid placements are discussed later, revalidate price, VAT, traffic and live link attributes at checkout. Do not buy bulk directory packages.

## Validation

- Thirteen SEO and guide tests plus twelve dashboard tests passed.
- The production build completed and type checking passed. The repository still lacks ESLint, so the build reports that linting is unavailable.
- The production build generated 218 pages and all 180 sitemap URLs returned HTTP 200 locally.
- English and Spanish Beta CTAs navigated to the real download section in Playwright.
- A mocked HTTP 500 kept the waitlist in an error state; a mocked duplicate response produced success.
- The high-traffic guide retained its related recommendation without shipping unrelated guide text to client chunks.
- The high-traffic comparison served its large screenshots through responsive `/_next/image` URLs with intrinsic dimensions and `sizes`.
- A mocked Umami client received real TTFB and FCP `web_vital` events from a production build.
- Both historical wrong-language guide paths returned HTTP 308 to their canonical localized paths.
- The localized About page rendered without horizontal overflow at 390 and 1440 pixels, exposed the expected structured data and linked from the footer.
- Desktop and mobile visual checks showed the primary Beta CTA in the first viewport.
- Final browser checks reported zero console errors on the changed Beta pages.

## Measurement plan after deployment

After seven complete days, compare against the previous seven weekdays:

- `beta_cta_click` and `beta_pricing_cta_click` per Beta visitor.
- Confirmed `fomo_email_submit` and `fomo_email_error` per waitlist view.
- Direct guide downloads per guide pageview, split by product block, inline and final position.
- Home download clicks per home visitor.
- Spanish and English conversion separately.
- Real-user LCP, INP and CLS by rating. TTFB and FCP are diagnostic, not business outcomes.
- Aggregate download requests, fresh launches, first terminals and seven-day returns from the installation activation funnel.

After 28 complete days, review Search Console clicks, impressions, CTR and position together. A CTR increase with a position decline is not automatically a win, and a click decline with lost impressions is not a snippet problem.
