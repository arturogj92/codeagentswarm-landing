# SEO publishing and download measurement

## Daily report

`node scripts/seo-daily-report.mjs` uses the existing Umami and Telegram credentials configured in the scheduled workflow. It reports the previous complete UTC day and compares it with the same weekday seven days earlier. Installer requests use exactly those UTC dates too; a missing date is zero, not the last nonempty day.

- Home and guide download events remain separate. Guide totals include Apple Silicon, Intel, Windows x64 and Windows ARM64, across all existing CTA positions.
- Guide click rates divide direct download clicks by guide pageviews. They are event/pageview rates, not unique-user conversion or confirmed installations.
- The five most viewed guides show their own download-click counts using Umami's page filter. Guide indexes are excluded from article pageviews.
- Installer requests are reported separately. Bots, retries and repeat visitors can produce multiple requests. First app launch and activation remain in the existing aggregate installation funnel.
- Scroll-depth and legacy CTA events remain available in Umami, but do not substitute for direct downloads or pageviews.
- Malformed data or a result reaching the 10,000-row metrics ceiling is unavailable, not a guessed zero. Raise the ceiling/use pagination if this site reaches it.

For a private local preview, use `node scripts/seo-daily-report.mjs --dry-run`. This prints the report without sending Telegram and needs only the Umami credentials. Do not print real traffic reports in public Actions logs. Importing the module has no network or delivery side effects.

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
