# Performance Optimization Scripts

This directory contains automation scripts to optimize the CodeAgentSwarm landing page assets for better SEO performance.

## Prerequisites

Install required tools:

```bash
# macOS
brew install ffmpeg webp imagemagick

# Ubuntu/Debian
sudo apt-get install ffmpeg webp imagemagick

# Windows (using Chocolatey)
choco install ffmpeg webp imagemagick
```

## Scripts

### 1. optimize-videos.sh

Compresses all MP4 videos to ~50% of original size while maintaining visual quality.

**What it does:**
- Creates MP4 versions optimized with H.264 codec (CRF 28)
- Generates WebM versions for better compression
- Extracts poster images (first frame) for lazy loading
- Backs up originals to `public/video-originals/`

**Usage:**
```bash
cd scripts
./optimize-videos.sh
```

**Expected Results:**
- kanban.mp4: 4.0MB → ~2.0MB
- demo-video.mp4: 2.0MB → ~1.0MB
- terminals.mp4: 2.0MB → ~1.0MB
- notifications.mp4: 1.5MB → ~800KB
- gitmanager.mp4: 1.1MB → ~600KB

**Total savings: ~5MB (48% reduction)**

---

### 2. optimize-images.sh

Converts PNG images to WebP and creates proper favicon sizes.

**What it does:**
- Converts logo.png to logo.webp (~70-80% smaller)
- Creates multiple favicon sizes (16x16, 32x32, 48x48)
- Generates Apple touch icon (180x180)
- Creates Android chrome icons (192x192, 512x512)
- Converts avatars to WebP format
- Backs up originals to `public/image-originals/`

**Usage:**
```bash
cd scripts
./optimize-images.sh
```

**Expected Results:**
- logo.png: 237KB → ~50KB (WebP)
- avatars: 13KB → ~5KB each (WebP)

**Total savings: ~200KB**

---

## After Running Scripts

### 1. Review Generated Files

Check the quality of optimized assets:
- Open videos in browser to verify quality
- Compare WebP images with originals
- Test poster images load correctly

### 2. Update Code

#### For Videos
Update components to use WebM with MP4 fallback:

```tsx
<video poster="/terminals-poster.jpg">
  <source src="/terminals.webm" type="video/webm" />
  <source src="/terminals.mp4" type="video/mp4" />
</video>
```

#### For Images
Update `next.config.js`:

```js
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
}
```

Update `layout.tsx` for favicons:

```tsx
icons: {
  icon: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: '/apple-touch-icon.png',
}
```

### 3. Replace Originals

Once you're satisfied with quality:

```bash
cd public

# Replace videos
mv optimized-*.mp4 *.mp4

# Keep WebP alongside PNG (Next.js will serve best format)
# No action needed - both formats will coexist
```

---

## Troubleshooting

### Script Permission Denied

```bash
chmod +x scripts/optimize-videos.sh
chmod +x scripts/optimize-images.sh
```

### FFmpeg Not Found

```bash
# macOS
brew install ffmpeg

# Check installation
ffmpeg -version
```

### WebP Not Found

```bash
# macOS
brew install webp

# Check installation
cwebp -version
```

### ImageMagick Not Found

```bash
# macOS
brew install imagemagick

# Check installation
convert -version
```

---

## Performance Impact

Running both scripts will:

- **Reduce initial page load**: 11.5MB → 6.0MB (48% reduction)
- **Improve FCP**: ~2.5s → ~1.2s (52% faster)
- **Improve LCP**: ~4.0s → ~2.0s (50% faster)
- **Boost Lighthouse score**: +20-30 points

---

## Additional Resources

- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [WebP Documentation](https://developers.google.com/speed/webp)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Video Optimization Guide](https://web.dev/fast/#optimize-your-videos)

---

## ai-citation-scan.mjs

Measures whether AI answer engines (Perplexity, ChatGPT search, Google AI Mode) recommend
CodeAgentSwarm and cite codeagentswarm.com when someone asks a real decision question about
running several AI coding agents at once.

### Usage

```bash
# Scan every prompt in Perplexity (the default engine)
node scripts/ai-citation-scan.mjs

# Same prompts, different engine
node scripts/ai-citation-scan.mjs --engine chatgpt
node scripts/ai-citation-scan.mjs --engine google-ai

# Only one prompt
node scripts/ai-citation-scan.mjs --prompt category-manage-agents-2026

# Print the latest status per prompt and engine, with the trend vs the previous scan
node scripts/ai-citation-scan.mjs --report
```

### How it works

For each prompt the script opens the engine in your browser, you read the answer, and it asks
you three quick questions: is CodeAgentSwarm cited, mentioned but not cited, or absent; which
tools the answer recommended; which domains it cited. Each answer is appended as one JSON line
to `docs/seo/ai-citation-log.jsonl`.

### Rules

- The prompts in `scripts/ai-citation-prompts.json` are frozen. Do not reword them between
  scans or the trend data becomes meaningless. To track something new, add a new prompt id.
- Results only ever get appended, never rewritten, so `--report` can compare scans over time.
- It costs nothing. There are no paid APIs involved: the script just opens the engines and you
  record what you see.

---

## competitor-refresh.mjs

Checks the competitor numbers quoted in the comparison guides against the public GitHub API.

`scripts/competitor-facts.json` holds the canonical verified facts (stars, last public commit,
licence, site, repo) for every tool in the category comparison. The script reads that file, asks
GitHub for the current values, and prints one row per tool with the recorded value, the current
value and any flags: `DATA-STALE` when the last push date has moved, `STARS-DRIFT` when stars
changed more than 10 percent, and `NOW-STALLED` when a repo has been quiet for over 60 days.

### Usage

```bash
node scripts/competitor-refresh.mjs
node scripts/competitor-refresh.mjs --check
node scripts/competitor-refresh.mjs --help
```

Use `--check` in validation: it exits non-zero when stars, push dates or API access no longer
match the recorded snapshot.

### When to run it

Before every citation scan, and monthly at the very least. The comparison guides print visible
verification dates, so a stale number is a credibility problem, not a cosmetic one. When something
changed, update the guide tables (EN and ES), the visible dates and `competitor-facts.json`
together in the same commit.

The API is called unauthenticated, so a run can hit the GitHub rate limit. If it does, wait an
hour and run it again.
