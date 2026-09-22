# Pi, Devin/SWE-2 and Muse Code editorial release

## Scope and evidence

Prepare content for the upcoming app release. Preserve the public beta/availability
qualification until the release actually ships. No homepage launch announcement
or provider subscription is implied by the guide download buttons.

Inventory: nine existing bilingual intent pairs, 18 URLs, plus six Pi mention
pages (OpenCode swarm, Paseo comparison and multi-agent tools, EN/ES), both guide
hubs, sitemap and llms.txt. No Muse guide exists in the baseline bf20274.

Keyword research on 2026-09-22: 30 seo-mcp generator seeds and 14 difficulty
checks, US English and Spain Spanish. Pi coding agent is in the >1,000 bucket,
KD 48; Pi vs OpenCode is >100, KD 0. Devin CLI is >100; SWE-2 and Muse
install/Windows/pricing/MCP are <100 with unknown difficulty. The other difficulty
checks returned null, including Devin CLI and Muse queries. Spanish Muse models
and privacy probes returned no ideas. Missing data is not zero demand or an easy
ranking. No search-volume claim is made for the Muse launch.

Umami API audit: June 22 through September 21 UTC (92 calendar days), excluding
August 10's tracking outage and August 3 02:00–06:00 UTC bot window. Clean retained
segments contain 68,411 pageviews. Page-filtered English traffic: Devin pricing
300 views, SWE-2 benchmarks 274, Pi/OpenCode 114, Pi Windows 61, Pi models 59,
Pi setup 44. These pages only have about 7–17 observed days, so totals are not
comparable to mature guides with a full period. No Muse path was observed.
Umami supplies visits/referrers, not Search Console query rankings or CTR.
Download-event samples of 0–2 per page are too small for conversion conclusions.
On this Umami deployment `path` filters work; `url` is silently ignored.

## Intent ownership

All slugs below have an English and Spanish counterpart registered in the guide
catalog. Existing canonical URLs remain unchanged.

| Intent | Decision | Owner / reason |
| --- | --- | --- |
| Pi install and first task | Optimize | how-to-use-pi-coding-agent; install/login before imagery, command diagnosis. No duplicate installation URL. |
| Pi versus OpenCode | Optimize | pi-vs-opencode; strongest keyword signal and Pi page traffic, immediate decision table. |
| Pi models/subscriptions | Optimize | pi-coding-agent-models-subscriptions; catalog inspection and account boundaries. |
| Pi Windows | Optimize | pi-coding-agent-on-windows; dedicated social metadata and capture-caption correction. |
| Devin install, Windows, MCP/history | Retain and link | Existing three pairs own these intents; no duplicate starter pages. |
| Devin pricing / free SWE-2 | Optimize | devin-cli-models-usage-limits; current official date discrepancy, stable model selection instructions. |
| SWE-2 comparison/benchmark | Optimize | swe-2-benchmarks; model/agent/benchmark distinction and original acceptance-test worksheet. |
| Muse install/login/first task | Create | how-to-use-muse-code; missing launch entry point, standalone CLI first. |
| Muse Windows diagnosis | Create | muse-code-on-windows; native executable/PATH, PowerShell and platform limitations warrant a separate practical guide. General setup links here. |
| Muse models/prices/privacy | Create | muse-code-models-pricing-privacy; owns pricing, subscription/API and Standard/Contributor choice together. |
| Muse MCP/skills/workflows | Create | muse-code-mcp-skills-workflows; substantial configuration and verification workflow, with build/rollout limits. No extra thin pages for each feature. |
| Pi extensions, separate SWE-2 pricing, Muse comparison | Skip | No additional distinct intent established; existing pages or official documentation cover the need. |
| Separate Muse model-only/privacy-only/workflow-only pages | Skip | Consolidated into the relevant guide; sparse keyword data does not justify a larger cluster. |

The keyword-only minimum recommendation was two Muse pairs. The final four-pair
scope additionally covers the user's upcoming release with substantive native
Windows troubleshooting and tool-configuration workflows. This is a product
onboarding decision supported by distinct tasks, not a claim of high search volume.

## Sources and reproducible facts

- Pi CLI locally reports 0.85.1; `pi --help` confirms `--list-models`, `-c`, `-r`.
  [Pi Windows](https://pi.dev/docs/latest/windows),
  [providers](https://pi.dev/docs/latest/providers),
  [OpenCode agents](https://opencode.ai/docs/agents/).
- Devin CLI locally reports 3000.10.31. [Model selection](https://docs.devin.ai/cli/models)
  documents that `swe` follows the latest family version, not a permanent SWE-2 pin.
- [Devin pricing](https://devin.ai/pricing) still says October 10, 2026;
  [model documentation](https://docs.devin.ai/desktop/models) says October 15.
  Both were checked September 22; guide explicitly preserves that disagreement.
- [Cognition SWE-2 announcement](https://cognition.com/blog/swe-2) matches the four
  existing table rows. Scores remain vendor-reported, not our own benchmark.
- Muse CLI locally reports 1.3.0 (1.3.0-R3401.1). `muse --help`, `muse exec --help`,
  `muse init --help` and `muse resume --help` verify the documented commands.
  This local build does not advertise the workflows subcommand.
  [Muse overview](https://dev.meta.ai/docs/muse-code),
  [configuration](https://dev.meta.ai/docs/muse-code/configuration),
  [workflows](https://dev.meta.ai/docs/muse-code/workflows),
  [models](https://dev.meta.ai/docs/models).
- App-specific boundaries: the app checkout's docs/systems/muse-msp-agent.md
  explicitly marks the integration unshipped, with unresolved native fork gates.
  Guide copy must not claim fork, all-platform parity or a shipped release.

## Validation and release handoff

Completed: eight new Muse articles (four bilingual topics), twelve existing Pi/SWE-2/Devin pages improved, four social cards and a Muse family in the guide hub. Reused the existing guide renderer, metadata/schema, sitemap and CTA mechanisms.

Validation completed on the final content:
- `npm run build`: passes, 194 prerendered guide pages. Integrated lint and type checks pass; existing image/hook and Next deprecation warnings remain.
- `node scripts/check-pi-seo.mjs`, `check-devin-seo.mjs`, `check-muse-seo.mjs`: all 26 cluster pages pass rendered metadata, translated alternates, schema/FAQ, sitemap, llms, assets and internal-link checks. Muse also checks its guide-hub links and final release-availability CTA.
- The five existing SEO/conversion/video/IndexNow test files: 23 passing tests.
- Native `muse skills validate` accepts the exact English and Spanish tutorial examples.
- Independent writing reviewer read all new articles and changed Pi/Devin articles. Resolved all findings: Contributor content restrictions, complete MCP and skill examples, minor translation/duplication fixes. No forbidden long dashes in visible cluster copy.
- Headless Chromium production-page checks at 1440×1000 and 390×844, EN/ES: eight page/viewport combinations return 200, one H1, no document overflow or missing visible images. Both hubs contain the four Muse links. Inspected actual page screenshots and 1200×630 social images.

Preview is the local production server at http://localhost:3097. Browser evidence is in `/tmp/cas-seo-evidence/`, with results in `/tmp/cas-seo-browser-results.log`. The browser wait uses DOM readiness rather than network idle because external requests need not become idle for a rendered article.

Research, implementation, editorial review and local validation are complete. Delivery uses a draft pull request for the upcoming release, with production publication left to that release.
Publish/indexing is separate from compilation; no ranking or indexing guarantee.
After publication, measure the preserved/new URLs over matched complete windows,
keeping guide download events separate from home downloads.
