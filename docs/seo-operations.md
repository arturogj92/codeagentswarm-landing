# SEO publishing and download measurement

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
