# SEO status

Last updated: 2026-11-23

Release state: the August 31 conversion, comparison and media changes passed production validation. Start post-release measurement only after the master deployment reports success.

## November 23 weekly data refresh

Competitors (GitHub API, READMEs and vendor sites, November 23): stars, last commits, releases and agent lists refreshed in the ranking and six comparison pairs, plus `scripts/competitor-facts.json`; visible verification dates moved from October 31 to November 23. Material changes: Paradev relicensed from Elastic 2.0 to MIT on November 4 (licence rows, pros and cons, FAQs rewritten); T3 Code went from about 33,800 to 72,800 stars, its README no longer says "very early" and now lists Kiro, Pi, Muse Code and fx; Paseo supports GitHub Copilot natively; Vibe Kanban shipped v0.1.46 on November 15, its first release since April; opcode had its first code change in almost a year on November 6; Claude Squad committed on November 13 (last release still August 20). The November 16 run left these changes uncommitted in its worktree and never pushed.

Pricing (first-party pages only): new Claude Fable 5.2 API row ($8/$40); GPT-6.2 Astra replaces GPT-6 Astra as OpenAI's top model in the Sol guide; Copilot Free has an unquantified AI credit allowance; Cursor Teams seats are not pooled (Enterprise is), the $0.25 Cursor Token Rate applies only to Teams and Enterprise, legacy list adds Start; OpenCode Go uses one shared allowance, Go Teams needs two members, GLM-5.3-Flash is no longer free; Antigravity removes the free Claude 4.6 and GPT-OSS models on November 30, not November 2; Moonshot's Claude Code example now routes Haiku to `kimi-k3[1m]`; Devin Teams has no per-member allowance; Cline adds ClinePass ($9.99). The shared cross-agent table is unchanged except its date, identical in all 14 files.

Not verified or left as published: x.ai/pricing and x.ai/cli return 403 (Grok facts confirmed through the x.ai news post, docs.x.ai and cursor.com); whether Codex CLI works on ChatGPT Free and Go (OpenAI's page names only the desktop app for those plans, so the table still says "Limited" and Go $8); Claude's 5 hour window "slides forward" (support article says it resets five hours after the first message, the costs page says rolling); Antigravity "unlimited command requests" (no longer on the plans page, not contradicted); Copilot effort levels (docs list five, CLI 1.0.114 accepts seven, guide kept). Muse Wonder Full plan prices still come only from Engadget.

Out of scope, needs a decision: `metaDescription` of the Superset pair still says "source available" and the ranking pair still says "Verified October 31, 2026"; Vibe Kanban and Claude Squad descriptions say "verified October 2026". The Sol guide presents GPT-6.1 Sol as the Codex pick while Codex now recommends GPT-6.2 Sol. Devin SWE-2 is free only through November 30, so the Devin guides go stale on December 1. Kimi Code CLI is at 2.7.2 (guide cites 2.4.1 as of October 30). The weekly-limit guide's "Cursor Agent: Monthly" row describes the app's quota window, while current Cursor plans are weekly.

## November 15 release 2.5.0 content published ahead of the app

Arturo asked to publish the 2.5.0 content before the app release, expected within a day, so the new pages start being crawled. Until 2.5.0 is downloadable the site describes Cline, GitHub Copilot CLI, Scheduled Conversations, Visual Replies and the phone app while the installer is still 2.4.3. If the release slips, revert the three merges or hold the homepage sections.

Merged PRs 30, 32 and 33 onto the November 15 master: 62 new guide pages in English and Spanish (13 Cline and Copilot CLI pairs, 13 scheduling pairs, 5 phone, screenshot and subagent pairs), the homepage sections for Scheduled Conversations, Visual Replies and the phone app, twelve agents across cards, comparison tables and `llms.txt`. The build now prerenders 345 pages.

Conflicts were limited to the guide family map, the homepage section list, `llms.txt` and an expected count; both sides were kept. `check-seo-editorial.mjs` now expects 54 editorial next steps: it had not been updated when the GPT-6.1 Sol and Muse Wonder guides were published on November 14.

Checked before publishing: type check, production build, the nine `scripts/check-*.mjs`, 27 node tests, `check-guide-downloads.cjs`, and the homepage in both languages on desktop and phone widths with no overflow or script errors. Spot-checked on November 15 against first-party pages: GitHub Copilot individual plans and AI credits (Pro $10 with 1,500, Pro+ $39 with 7,000, Max $100 with 20,000, $0.01 per extra credit) and the Cline CLI install command, Node.js requirement and `cline auth`. Every other third-party fact in these guides keeps its October verification date and is covered by the weekly data refresh.

A weekly scheduled session ("SEO landing: datos al día", Mondays 09:00) now refreshes competitor facts, agent pricing and verification dates and may push those data updates to master. Its scope excludes new guides, titles, slugs and design.

## November 15 internal links to the high-intent guides

Decision from the November 14 per-guide figures: `claude-code-gui` (11.3% download clicks per pageview), `codex-gui` (10.5%) and `claude-code-dashboard` (6.7%) convert five to ten times better than the guides that hold the traffic, yet they received 353, 191 and 331 pageviews in 30 days and few internal links. No new page was created; the existing pages already own these intents.

Ten source guides gained one sentence with a contextual link at the end of the section that already discusses the same need, in English and Spanish (24 links, 20 files). Titles, descriptions, slugs, anchors, `updatedAt` and every existing sentence are unchanged.

| Target | English guides linking to it, before | After | New sources |
| --- | ---: | ---: | --- |
| `claude-code-gui` | 3 | 6 | Claude pricing, Claude on Linux, Claude on Windows |
| `claude-code-dashboard` | 4 | 9 | Claude pricing, Claude on Linux, multiple chats, multiple accounts, multiple sessions |
| `codex-gui` | 5 | 9 | Codex on Windows, Codex on Linux, Codex pricing, GPT-6.1 Sol |

The nine existing sources held about 10,600 of the 43,237 guide pageviews in the last 30 days; the GPT-6.1 Sol guide is new. Each anchor names the target intent ("Claude Code GUI guide", "Claude Code dashboard guide", "Codex GUI guide") and each sentence says why the reader would go there.

Not done on purpose: no link from `codex-yolo-mode` or the history guides, which already link to these targets; no GUI page for OpenCode, Antigravity or Kimi, which needs keyword evidence first; no change to the Windows guides as targets, since their readers arrive from Windows queries and not from other guides.

Measure 28 complete days after deployment against the 28 before, per target and locale: Search Console position and clicks, Umami pageviews, and guide download clicks. Internal links move rankings slowly and the lift is not guaranteed; the direct effect to expect first is more pageviews on the three targets from readers who follow the link.

Open finding, not addressed here: `node scripts/competitor-refresh.mjs --check` now fails on star drift for one competitor (33,790 recorded on October 31, 60,658 on November 15). The comparison guides and `scripts/competitor-facts.json` need a refresh pass.

## November 14 measurement and Linux download fix

Umami, 30 days to November 14: 48,228 pageviews and 39,189 visitors, up 25% on the previous 30 days. Guide articles hold 43,237 pageviews (89.6%). The backend counted 2,476 installer requests in the same period.

Installer requests per visitor, by system (backend requests over Umami visitors, so directional: requests include retries and bots):

| System | Visitors | Share | Installer requests | Requests per visitor |
| --- | ---: | ---: | ---: | ---: |
| Windows | 18,015 | 46.0% | 1,459 | 8.1% |
| macOS | 8,388 | 21.4% | 667 | 8.0% |
| Linux | 7,109 | 18.1% | 350 | 4.9% |
| Android and iOS | 5,600 | 14.3% | 18, by email | 0.3% |

Linux was the gap. Downloads have been public since 2.4.1, but `detectDownloadTarget` returned no target for Linux, so every guide CTA sent Linux readers to the home download section instead of serving the installer, and "Other platforms" listed only macOS and Windows. Two thirds of the readers of the Linux setup guides use Linux (598 of 895 visitors on `opencode-on-linux`). No Umami event recorded a Linux download anywhere, so the per-guide rates of the Linux guides (0.0% to 0.6%) were a measurement gap, not a real rate.

Changed on `feat/linux-guide-downloads`:

- Guide, guide-index, home feature-video and demo CTAs detect Linux and serve the installer directly: `.deb` by default (chosen twice as often as AppImage on x64), AppImage when the browser names an RPM distribution, ARM64 when the browser reports it. "Other platforms" lists the visitor's own system first.
- New events `download_app_{home,guide,guides_index,demo}_linux_{x64,arm64}_{deb,appimage}`. The home Linux cards now send the home event too. The daily report already accepted these names.
- `scripts/check-guide-downloads.cjs` covers Linux x64 and ARM64, and no longer expects the Pi and Devin beta wording retired with 2.4.0.

Measure 14 complete days after deployment against the 14 days before: backend Linux installer requests per Linux visitor, target 6.5% or more. Do not compare Linux guide click rates across the deployment date; the event did not exist before.

Other findings from the same pull, not acted on:

- Intent decides conversion. Guide download clicks per pageview: `claude-code-gui` 11.3%, `codex-gui` 10.5%, `claude-code-on-windows` 9.2%, `claude-code-dashboard` 6.7%, against `claude-code-plans-and-pricing` 0.95% on 5,448 pageviews and `codex-yolo-mode` 0.28%. The high-intent pages hold under 1,600 pageviews together.
- Phones: 5,105 views of the email offer produced 42 submissions (0.8%) and 18 installer requests.
- Search Console has no export after October 1. The pricing snippet comparison and the October 31 pass still need a date-filtered export.

## October 31 freshness pass

Four parallel workers re-verified volatile facts against first-party sources fetched on October 31, 2026, then one integrated build was published. Slugs, alternates, section anchors and canonical URLs are unchanged; `updatedAt` moved only on materially changed guides, so sitemap `lastmod` marks exactly those pages.

- Pricing (14 guides + weekly-limit pair): Claude Max $100 (5x) and Ultra $200 (10x, no 5-hour limit for verified accounts) replace Max 5x/20x; ChatGPT Pro $100/$200/$500 with GPT-6.1 Sol/Terra and GPT-6 Luna; Kimi Plus/Pro (5-hour window, no weekly quota; Go has no coding quota); The X Subscription (Plus $8, Premium $30, Super $100, Ultra $200) for Grok and Cursor; Google AI Plus/Pro/Ultra for Antigravity; OpenCode Go plans. The shared cross-agent table is identical in all 14 files.
- Agent guides: Codex removed `--full-auto` (now `--approve-for-me`, `--yolo` still accepted in 0.159.0); OpenCode ships `--auto`; Claude auto mode is the default start mode; Kimi default model K2.8 Preview, `--yolo` vs `--auto`, endpoint api.kimi.ai/coding; Grok 4.7 and real permission modes; Antigravity free-tier Claude 4.6/GPT-OSS removal on 2026-11-02; Gemini CLI stopped serving personal accounts on 2026-06-18 but is not shut down; Pi 1.4.0; Devin SWE-2 free until 2026-11-30.
- Comparisons: Superset is now Paradev; Paseo moved to Apache 2.0 and supports more agents; Conductor shipped iOS; Vibe Kanban is sunsetting; stars refreshed. `competitor-refresh --check` now fails only on >10% star drift, a stalled repo or API errors.
- Technical: home `SoftwareApplication.operatingSystem` includes Linux; `llms.txt` titles resynced from metaTitles (51) and 16 missing guides added (Linux ES guides, coordinator, auto Kanban, weekly limit); guide tables no longer split words letter by letter on mobile.

Unverified and left as published: Grok Build "free to try" (x.ai/cli returns 403), per-tier ChatGPT Pro multipliers, whether Google AI Plus $4.99 is promotional, Kimi USD plans (only CNY published). Possible app follow-ups: Codex skills export path (~/.codex/skills is deprecated, still read), Kimi/Cursor quota labels (new plans have no weekly Kimi quota and a weekly Cursor pool), Muse driver never passes `--contributor-mode off`.

Measure 28 complete days after deployment against the 28 days before, per page and locale, before judging this pass.

## September 25 measurement

The [September 25 review](../diagnostics/seo-review-2026-09-25.md) uses the new Search Console export through September 22 and live Umami data through September 24.

- Google clicks increased from 8,422 to 12,725 across matched 28-day windows (+51.1%). Impressions increased 90.3%, while CTR fell from 0.972% to 0.772%.
- Across August 26–September 8 and September 9–22, direct guide download clicks increased from 115 to 260. Actual article pageviews increased from 13,775 to 15,144; click rate increased from 0.835% to 1.717%. These are download clicks, not installations or unique new users.
- The product block supplied 209 of 260 recent guide clicks. Keep it and review the complete September 13–26 window when available; September 5 and 12 changes prevent isolating the August 31 release.
- The inline CTA remains below target: 32/15,144 = 0.211%. The August 24–30 baseline was 6,581 actual pageviews, not 6,034: total baseline 71/6,581 = 1.079%, inline 18/6,581 = 0.274%, corrected +20% inline target 0.328%.
- Prioritize existing GUI, dashboard, Windows and parallel-session pages. Codex YOLO recorded 1 direct download click from 1,466 recent pageviews; Codex GUI recorded 12 from 154, with 12 observed sessions with a click.
- The exact before/after pricing CTR review still needs date-filtered page/query exports. The new Pages and Queries files contain only 92-day aggregates, not the required comparison.

The entries below preserve historical baselines and implementation context. Use the September 25 review for current conversion conclusions and priorities.

## September 25 implementation

Prepared on `seo/conversion-september-25`: bilingual corrections to Codex YOLO, GUI and history; contextual links from Claude history to dashboard/parallel sessions; an explicit product name on the inline download button. Existing slugs, alternates, anchors, platform destinations and event attribution are preserved. Product blocks and pricing snippets stay unchanged. See the review for the intent map and post-deployment measurement protocol.

## Historical baseline through September 8

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

## Priorities recorded September 8 (historical)

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

Review the complete September 13–26 conversion window when all days are available. Complete the pricing/snippet comparison with date-filtered page and query data; the September 25 aggregate export cannot isolate those changes.
