# SEO publishing and download measurement

## Product discovery review, September 25

The home FAQ and About page now state current product availability, separate provider costs and when the workspace fits. The existing Claude GUI, Codex GUI and Claude dashboard guides in both languages acknowledge official desktop interfaces and native history. They explain the shared-provider workflow without claiming those native features are absent. Their titles, descriptions, canonical URLs, language alternates and section anchors are preserved. The four Claude guides receive a new review date; the two Codex guides retain the September 25 review already published in PR #25. The existing conversion layout and event attribution are unchanged.

The About page links to the existing dashboard, Codex GUI and worktree example. `llms.txt` mirrors the public product facts; it is not treated as a ranking mechanism. No new indexable page, hidden content, review score, paid backlink, mass submission or outreach message is introduced.

Sources checked: [OpenAI crawlers](https://developers.openai.com/api/docs/bots), [Codex CLI](https://learn.chatgpt.com/docs/codex/cli), [OpenAI developer commands](https://learn.chatgpt.com/docs/developer-commands), [Claude Code Desktop](https://code.claude.com/docs/en/desktop), and [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features). Product quota availability is corroborated by the app's Claude quota reader; it is not a billing report.

Validation: `npm run lint`, `npm run build`, `node scripts/check-release-agents.mjs`, `node scripts/check-product-discovery.mjs` and the existing `components/seo-conversion-regressions.test.mjs` checks. The product check inspects generated HTML for ten EN/ES pages and requires FAQ answers to match both the visible page and its structured data.

Initial local validation passed on September 25: production build, all 13 conversion regressions, release checks and product discovery checks. Lint reports existing image/hook warnings in untouched components. Browser QA used EN/ES at 1440×1000 and 390×844, without feature flags, with analytics requests blocked. About and the home FAQ worked in both languages; the English dashboard and Spanish Codex guide returned 200 with one H1. No horizontal overflow or JavaScript errors were observed. Desktop/mobile About captures are in `/tmp/cas-discovery-about-1440.png` and `/tmp/cas-discovery-about-390.png`. These are local checks, not a production deployment or a measured visibility lift.

Publication integration preserves PR #25 (production commit `4997667`), including its Codex guide rewrite and inline download changes. The two Codex GUI guides only gain an official OpenAI documentation link in this publication. The integrated production build, all 14 conversion regressions, release checks and ten-page discovery checks passed. All six guides preserve their existing titles, descriptions, slugs, language alternates, publication dates and section anchors.

### Measuring recommendations

No ChatGPT recommendation baseline has been collected. Web search results and assistant referral visits are not substitutes. Use these ten fixed questions for a baseline and subsequent checks in new chats, without naming CodeAgentSwarm or adding this repository as context:

1. What desktop tools can manage Claude Code and Codex together?
2. How can I supervise several AI coding agents on Windows?
3. Which apps organize coding agent conversations and tasks across projects?
4. What are my options for a graphical interface for Codex?
5. When would I use an agent workspace instead of tmux?
6. ¿Qué aplicaciones permiten gestionar Claude Code y Codex juntos?
7. ¿Cómo puedo supervisar varios agentes de programación en Windows?
8. ¿Qué herramientas reúnen conversaciones y tareas de agentes por proyecto?
9. ¿Qué opciones tengo para usar Codex con una interfaz gráfica?
10. ¿Cuándo conviene usar un espacio para agentes en lugar de tmux?

Record date, exact prompt, model, language, personalization settings, whether search actually ran, recommended products and cited URLs. Keep search and non-search results separate, with two new-chat runs per prompt and condition. Record failed runs as unavailable. Count product recommendations, incidental mentions and website citations separately. Repeat weekly with the same settings; compare recommendation rates only within matching conditions. Do not infer global visibility or causality from this small sample.

Record the actual production deployment date. Compare 28 complete post-deployment days against 28 complete pre-deployment days for these guide URLs in Search Console and Umami, splitting locale and device. Review clicks, impressions, position and guide download clicks per pageview together. A fall needs investigation of query mix and ranking before attribution to these edits. No ranking or mention increase is guaranteed.

## Release 2.4.0 availability (2026-09-24)

Muse Code, Pi and Devin CLI are available in the public macOS and Windows app from 2.4.0. The EN/ES homepage, agent cards, guide CTAs, availability sections and `llms.txt` reflect this release. Historical beta screenshot captions and provider-specific limitations remain accurate; they are not availability gates. Earlier beta rollout notes below are historical.

After `npm run build`, run `node scripts/check-release-agents.mjs` plus the existing `check-pi-seo.mjs`, `check-devin-seo.mjs` and `check-muse-seo.mjs`. Together these validate homepage availability and the 26 bilingual agent guide pages, including canonical URLs, language alternates, structured data, sitemap entries, images and internal links. Publishing through the existing Vercel Git integration triggers the production IndexNow workflow; acceptance does not guarantee indexing or rankings.


## Daily report

`node scripts/seo-daily-report.mjs` uses the existing Umami and Telegram credentials configured in the scheduled workflow. It reports the previous complete UTC day and compares it with the same weekday seven days earlier. Installer requests use exactly those UTC dates too; a missing date is zero, not the last nonempty day.

- Home and guide download events remain separate. Guide totals include Apple Silicon, Intel, Windows x64 and Windows ARM64, across all existing CTA positions.
- Guide click rates divide direct download clicks by guide pageviews. They are event/pageview rates, not unique-user conversion or confirmed installations.
- Pageviews come from `/metrics/expanded?type=path`, using `name` and `pageviews` (the latter can be a numeric string). The basic `/metrics?type=path` endpoint counts visitors per URL; summing it undercounts pageviews and overstates the click rate. The September 12 correction also ranks the top five by actual pageviews. Recalculate historical daily-report rates before comparing them with corrected reports.
- The five most viewed guides show their own download-click counts using Umami's page filter. Guide indexes are excluded from article pageviews.
- Installer requests are reported separately. Bots, retries and repeat visitors can produce multiple requests. First app launch and activation remain in the existing aggregate installation funnel.
- Scroll-depth and legacy CTA events remain available in Umami, but do not substitute for direct downloads or pageviews.
- Malformed data or a result reaching the 10,000-row metrics ceiling is unavailable, not a guessed zero. Raise the ceiling/use pagination if this site reaches it.

For a private local preview, use `node scripts/seo-daily-report.mjs --dry-run`. This prints the report without sending Telegram and needs only the Umami credentials. Do not print real traffic reports in public Actions logs. Importing the module has no network or delivery side effects.

For installation follow-up, keep website clicks, installer requests and observed fresh launches separate. The existing `installation_activation_v1` RPC measures first-terminal activation within seven days, but its `returned_after_1d` and `returned_after_7d` fields have no fixed upper bound. They are not fixed-window retention. Compare mature cohorts with the same observation window, exclude update-harness versions `90.0.x`, and account for the late-August rollout of installation telemetry. Installation identifiers do not attribute app use to a particular guide or acquisition source.

## Guide download block (September 12)

The approved compact block puts the platform download before the workspace preview. It applies to the existing eligible guides, including articles covering macOS. Download detection still selects Apple Silicon, Intel, Windows x64 or Windows ARM64; native “Other platforms” links reuse the same resolved release list and tracking. Existing Cursor/Pi/Devin showcase exclusions stay in place. General workspace imagery reuses the existing English `list-mode-demo-poster.jpg`, showing eight agent sessions in List mode, including in the enlarged preview; feature-specific history/worktree videos retain their matching footage.

Below 768px the block reuses the home email form and `/api/download-link`. `mobile_link_offer_view`, `mobile_link_submit` and `mobile_link_error` now carry `source`, plus `guide` and `position: product_block` for guide traffic. A submit is successful only when the endpoint acknowledges `emailSent: true`. Keep those email events separate from installer clicks; the existing backend email/download-link tracking remains unchanged.

Run the focused browser check against a local production build:

```sh
npm run build
npm run start -- --port 3016 --hostname 127.0.0.1
# In a second terminal; uses Playwright from this repo or the sibling app.
node scripts/check-guide-downloads.cjs
```

`PLAYWRIGHT_MODULE` can point to an existing Playwright installation. `GUIDE_EVIDENCE_DIR` selects the screenshot/result directory (default `/tmp/guide-download-evidence`). The check intercepts email, download and notification requests, verifies all four architectures plus English/Spanish mobile states and home reuse, and makes no real send or installer request. This is landing browser coverage; the Desktop live verifier does not exercise this surface. The shared `landing-release` recipe supplies the build, lint and existing landing checks.

### Additional CTA placements

The redundant download link inside the feature-video overlay is removed; the interactive demo keeps its separate download. The same approved block appears once after the homepage feature videos (`source: home`, `position: feature_videos`) and once after the first guide-index group (`source: guides_index`, `position: after_first_group`). Article endings use a compact version without media (`source: guide`, `position: final`), preserving the original agent-specific availability text, including Pi and Devin beta caveats.

Direct-download events use `download_app_home_*`, `download_app_guides_index_*` and the existing `download_app_guide_*` respectively. All carry `source` and `position`; only article events carry `guide`. The mobile offer/view, submit and error events use the same placement fields. The existing home download section is `home:download_section`. Compare each placement separately; do not count guide-index traffic as article traffic. The focused `check-guide-downloads.cjs` browser check covers all three placements on desktop/mobile, event attribution, unique email input IDs and preserved availability text.

## IndexNow

`.github/workflows/indexnow.yml` listens for successful GitHub deployment statuses with environment `Production`, which matches this site's Vercel integration. Preview and failed deployments do not submit URLs. No deployment token or paid dependency is added.

The workflow checks out the deployed commit and compares it with the prior successful production deployment. Changes to a guide notify its canonical URL and localized guide index, including deleted guides. Shared guide UI changes notify guide URLs; shared site UI/translations notify all deployed sitemap URLs. Report scripts and docs alone do not notify pages. With no successful baseline in the last 100 production deployments, it submits the deployed sitemap once.

After a successful production deployment, CI builds the exact deployed commit and reads its generated sitemap and existing public key with `--deployed-build`. This avoids Vercel bot challenges on server-side requests without changing site protection. IndexNow still verifies ownership using the public key URL. Manual submissions without this flag check the live key before sending. Only canonical HTTPS URLs on `www.codeagentswarm.com` are accepted. A 200/202 means the request was accepted, not that a URL is indexed or ranked.

Local read-only inspection, after fetching the relevant commits and running `npm run build`:

```sh
node scripts/indexnow-ping.mjs --dry-run --deployed-build --since FULL_PREVIOUS_DEPLOYMENT_SHA
```

Recovery after a verified successful production deployment:

```sh
node scripts/indexnow-ping.mjs https://www.codeagentswarm.com/en/guides/UPDATED-SLUG
```

References: [GitHub deployment status events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#deployment_status), [IndexNow protocol](https://www.indexnow.org/documentation), [Umami metrics and page filters](https://docs.umami.is/docs/api/website-stats).

### Bing discovery access correction (2026-09-25)

Scope clarification after accessing the signed-in Bing UI: the supplied warning
screenshot belongs to **megakill.app**, not CodeAgentSwarm. The independently
verified CodeAgentSwarm access correction below remains valid, but does not resolve
megakill.app's warnings. Its public sitemap has 35 URLs, all returning HTTP 200;
its Bing Sitemaps screen had no registered sitemaps when inspected. Registration
and crawl diagnostics for that property remain pending.

Unauthenticated automated requests to `robots.txt`, `sitemap.xml` and the IndexNow
ownership file returned Vercel's HTTP 429 bot challenge. The files already existed;
adding another sitemap would not fix their accessibility. This reproduced a public
discovery problem, not proof that verified Bingbot was challenged: Vercel excludes
verified search bots from its managed bot protection.

Published Vercel Firewall version 2 with one custom rule, **Allow public search
discovery files** (`rule_allow_public_search_discovery_files_9w0x6A`):

- Host is exactly `codeagentswarm.com` or `www.codeagentswarm.com`.
- Method is `GET` or `HEAD`.
- Path is exactly `/robots.txt`, `/sitemap.xml` or
  `/23805737595743fe97240d74cb15ff20.txt`.
- Action is `bypass`, with `bypassSystem: false`. System DDoS protection remains
  enabled, and the existing managed bot challenge is unchanged for other paths.

Read-back confirmed the rule is active, with no pending draft. GET and HEAD now
return 200 for all three files on both hosts, following apex-to-www redirects.
The sitemap parses as XML and contains 208 unique canonical HTTPS www URLs; robots
advertises that sitemap and the ownership file matches the public IndexNow key.
Generic automated requests to a guide and `/api/releases` still receive the
challenge, confirming the exception did not open the rest of the site.

Production deployment `dpl_D4H3gb9vNKivj12jPBvoE5QpXaoL` was READY at commit
`49976674da913a473d54e8ee81048aad9b8acba5`. After the firewall correction,
`node scripts/indexnow-ping.mjs --sitemap` submitted all 208 URLs and received
HTTP 200. Acceptance is not evidence of indexing or removal of Bing's warnings.

Read-only access regression check, using Python's standard library:

```sh
python3 - <<'PY'
from urllib.request import Request, urlopen
for host in ('codeagentswarm.com', 'www.codeagentswarm.com'):
    for path in ('robots.txt', 'sitemap.xml', '23805737595743fe97240d74cb15ff20.txt'):
        for method in ('GET', 'HEAD'):
            with urlopen(Request(f'https://{host}/{path}', method=method), timeout=30) as response:
                assert response.status == 200, (host, path, method, response.status)
                assert not response.headers.get('x-vercel-mitigated'), (host, path, method)
                print(method, host, path, response.status)
PY
node scripts/indexnow-ping.mjs --dry-run --sitemap
```

To roll back, disable only the named custom rule, inspect the pending firewall
diff and publish it. Do not revert unrelated rules or disable global protection.
This configuration lives in Vercel, not in the application deployment.

**Still pending:** the accessible Bing Webmaster Tools browser is signed out.
Once authenticated, submit `https://www.codeagentswarm.com/sitemap.xml` in the
correct property, inspect its processing result and use URL Inspection/Site
Explorer to diagnose the limited-crawl warning. Do not increase crawl limits
without seeing the actual errors and crawl-control settings. The warning about
high-quality inbound links requires relevant external editorial links; neither
this firewall change nor IndexNow fixes it. Existing outreach and its approval
history are recorded in `docs/seo/listicle-outreach.md`; no additional messages
were sent during this correction.

References: [Vercel bot management](https://vercel.com/docs/bot-management),
[firewall rule actions](https://vercel.com/docs/vercel-firewall/firewall-concepts),
[Bing sitemap submission](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed),
[Bing crawl control](https://www.bing.com/webmasters/help/crawl-control-55a30303).

## September content and conversion review

The September 5 change corrects the bilingual Claude history cluster, adds an actual worktree isolation check to the existing bilingual worktree guide, and links that check from the parallel-session guides. It preserves their SEO titles, descriptions, canonical URLs and existing section anchors. Product-block copy follows the existing history, parallel-session and worktree video selection. Other guide intents keep their existing copy.

Record the production deployment time as the experiment start. Exclude the partial rollout day. Compare 28 complete post-deployment days with 28 complete days ending before deployment, splitting English and Spanish:

- Search Console: clicks, impressions, CTR and position for the changed history/session pages; obtain query-by-page data before attributing the change to a search intent.
- Umami: direct guide downloads per pageview for history/session/worktree pages, plus total guide downloads. Review product-block position metadata separately to detect clicks moving between CTA locations.
- Use pricing pages as an unchanged-copy reference, not a randomized control: their audience and query mix differ.
- Interpret any change alongside ranking, traffic and device mix. Do not claim causality from a before/after aggregate.

Pricing titles were recently revised on September 1. Keep them stable until there is a full measurement window; the September 3 export cannot evaluate that revision. No ranking or download lift has been measured for this deployment yet. Raw Google/Bing exports and the traffic diagnostic stay local.

## Reproducible product check

The worktree case records a local check against the actual app worktree service: two branches, different edits to the same filename, original file unchanged. It does not claim model accuracy, faster development or merge-conflict prevention. The public example independently reproduces the underlying Git invariant with Node.js and Git, creates only a temporary repository, and removes it afterward.

```sh
node public/examples/worktree-isolation.mjs
node --test scripts/seo-report-indexnow.test.mjs components/guides/guide-video.test.mjs content/guides/generative-ai-crosslinks.test.mjs content/guides/cursor-seo-links.test.mjs
npm run lint
npm run build
```

## Pi editorial launch, September 6

Pi has four distinct search intents, each with an English and Spanish guide:
installation/first task, models/subscriptions, comparison with OpenCode, and
native Windows setup. Each pair uses matching section structure, reciprocal
hreflang, dated Article metadata and FAQPage data generated from the same visible
answers. The guide index has a Pi family, established OpenCode guides link into
the cluster, and llms.txt references the eight canonical URLs.

The guides describe Pi support in CAS as beta testing. Their inline and final
download copy explicitly identifies the current public app rather than promising
Pi availability. No Pi footage is fabricated: the existing exclusion for agents
without a real capture also excludes Pi. Homepage agent lists and promotion remain
unchanged; the future landing announcement is a separate unpublished change.

Facts were checked against Pi's README, provider, models, Windows and RPC
documentation and OpenCode's agent, permissions and ACP references on September 6.
Product-specific claims use the Pi 0.85.1 integration checks recorded in the app's
docs/systems/pi-rpc-agent.md. This does not claim every upstream paid provider
was tested. No private account configuration appears in the articles.

Build validation exposed a pre-existing prerender gap: the leaf guide generators
guarded on a parent locale, but this build supplied no parent locale and emitted
zero guide HTML pages. Both route generators now return explicit locale and slug
pairs. The resulting build contains all 176 guide pages; wrong-language legacy
routes retain their runtime redirects. The old source-regex regression check
asserted the ineffective guard; it now executes the generator with a stub catalog.
A separate stale pricing test accepts review dates newer than its baseline rather
than requiring an obsolete exact date. No pricing content was rewritten.

Validation:
- npm run build and npm run lint (existing image warnings remain).
- node scripts/check-pi-seo.mjs after building: eight bilingual guides, matching
  FAQs, metadata, canonical/hreflang, internal links, indexability and discovery;
  also checks every sitemap guide is actually prerendered.
- node --test scripts/seo-report-indexnow.test.mjs components/guides/guide-video.test.mjs content/guides/generative-ai-crosslinks.test.mjs content/guides/cursor-seo-links.test.mjs components/seo-conversion-regressions.test.mjs: 23 passing tests.
- Local production browser checks at 1440x1000 and 390x844, English/Spanish,
  confirm readable guides without horizontal overflow and no visible Pi on either
  homepage.

Publish through the existing production deployment and IndexNow workflow. Record
the successful deployment and submission separately from actual indexing. Search
or answer-engine visibility is not guaranteed by schema, crawler access or
llms.txt. Measure Pi URLs and queries in Search Console and guide visits/downloads
in the existing analytics after complete reporting days.

### Pi guide visual follow-up (2026-09-06)

All eight Pi articles now include a direct answer, Pi icon, practical task or diagnosis section, and a captioned capture from the running macOS beta. The setup article shows both Chat and the model picker; the Windows article explicitly identifies the image as macOS Chat, not Windows evidence. Captures use a disposable sample project and a real Pi process connected through its OpenAI Codex provider. No customer conversations, account identifiers or credentials are included. This remains separate from the unpublished home-page announcement in draft PR #20.

The existing image component supplies intrinsic dimensions and responsive Next image variants. `node scripts/check-pi-seo.mjs` additionally checks the icon, screenshot files, captions and rendered alternative text in every language.
