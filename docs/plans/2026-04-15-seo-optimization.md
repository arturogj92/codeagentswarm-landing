# SEO Optimization Plan - codeagentswarm.com

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Triple organic traffic by optimizing existing content CTR and expanding content coverage for high-volume search queries.

**Architecture:** Next.js 15 App Router with TypeScript. Content lives in `/content/guides/` as TS modules. Metadata generated via `generateMetadata()` in page files. JSON-LD injected as script tags. Bilingual EN/ES with next-intl.

**Tech Stack:** Next.js 15, TypeScript, next-intl, Tailwind CSS

**Baseline Metrics (Jan-Apr 2026, 3 months):**
- 89,496 impressions / 872 clicks / 0.93% CTR / Position 8.3
- Growth: 170 imp/day (Jan) -> 1,800 imp/day (Apr) = 10x in 3 months
- Desktop 84% / Mobile 16%
- Top markets: USA, UK, Spain, Germany, France

---

## Phase 1: Quick Wins - Title & Meta Description Optimization

**Rationale:** 89K impressions with 0.93% CTR. The History guide alone has 25,421 impressions and 0.20% CTR. Optimizing titles/metas is the highest ROI action - no new content needed, just changing strings.

**Key principle:** Remove "CodeAgentSwarm" from guide titles. Users search "claude code [problem]", not "CodeAgentSwarm [problem]". Mention the product as the solution inside the article, not in the search result title.

### Task 1: Optimize History Guide Title & Meta (EN)

**Files:**
- Modify: `content/guides/en/claude-code-history.ts` (lines 7-9)

**Step 1: Update meta fields**

```typescript
// OLD:
title: 'How to Use Claude Code History to Recover Context and Save Time',
metaTitle: 'How to Use Claude Code History in CodeAgentSwarm to Recover Context and Save Time',
metaDescription: 'Learn how to use Claude Code history in CodeAgentSwarm to search past conversations, recover context in seconds, and avoid repeating the same explanations.',

// NEW:
title: 'Claude Code Conversation History: Find, Search & Resume Past Sessions',
metaTitle: 'Claude Code Conversation History: Find, Search & Resume Past Sessions (2026)',
metaDescription: 'How to find Claude Code conversation history, search past sessions, and resume old conversations. Step-by-step guide to accessing and managing your Claude Code chat history.',
```

**Why these changes:**
- Removes "CodeAgentSwarm" from title (nobody searches that + problem)
- Targets the exact query cluster: "claude code conversation history", "claude code find old conversation", "claude code search history", "claude code resume conversation"
- Adds year for freshness signal
- Meta description answers the search query directly and includes multiple keyword variants

**Step 2: Verify build compiles**

Run: `cd codeagentswarm-landing && npm run build`
Expected: Build succeeds with no errors

**Step 3: Commit**

```bash
git add content/guides/en/claude-code-history.ts
git commit -m "seo: optimize history guide title and meta for search intent"
```

### Task 2: Optimize History Guide Title & Meta (ES)

**Files:**
- Modify: `content/guides/es/historial-claude-code.ts`

**Step 1: Update meta fields**

```typescript
// NEW:
title: 'Historial de conversaciones de Claude Code: buscar, encontrar y retomar sesiones',
metaTitle: 'Historial de Claude Code: como buscar y retomar conversaciones anteriores (2026)',
metaDescription: 'Como acceder al historial de conversaciones de Claude Code, buscar sesiones anteriores y retomar chats antiguos. Guia paso a paso para gestionar tu historial de Claude Code.',
```

**Step 2: Commit**

```bash
git add content/guides/es/historial-claude-code.ts
git commit -m "seo: optimize history guide title and meta (ES)"
```

### Task 3: Optimize YOLO Mode Guide Title & Meta (EN)

**Files:**
- Modify: `content/guides/en/claude-code-yolo-turbo-mode.ts`

**Step 1: Update meta fields**

```typescript
// OLD:
metaTitle: 'Claude Code YOLO mode safely: enable dangerously-skip-permissions with permissions and Git guardrails',
metaDescription: 'A practical guide to Claude Code YOLO mode...',

// NEW:
metaTitle: 'Claude Code YOLO Mode: How to Enable --dangerously-skip-permissions Safely',
metaDescription: 'Enable Claude Code YOLO mode (--dangerously-skip-permissions) without risking your codebase. Configure safe auto-approve with granular permissions, Git guardrails, and MCP tool controls.',
```

**Why:** Targets "claude code yolo mode", "claude code --dangerously-skip-permissions", "enable yolo mode claude code" - cluster of ~2,000 impressions currently at position 10-20.

**Step 2: Commit**

```bash
git add content/guides/en/claude-code-yolo-turbo-mode.ts
git commit -m "seo: optimize yolo mode guide title and meta for search intent"
```

### Task 4: Optimize YOLO Mode Guide Title & Meta (ES)

**Files:**
- Modify: `content/guides/es/claude-code-yolo-turbo-mode.ts`

**Step 1: Update meta fields to match EN intent**

**Step 2: Commit**

```bash
git add content/guides/es/claude-code-yolo-turbo-mode.ts
git commit -m "seo: optimize yolo mode guide title and meta (ES)"
```

### Task 5: Optimize Multiple Terminals Guide Title & Meta (EN)

**Files:**
- Modify: `content/guides/en/how-to-use-multiple-claude-code-terminals.ts`

```typescript
// NEW:
metaTitle: 'Run Multiple Claude Code Terminals in Parallel - Step by Step Guide',
metaDescription: 'How to run multiple Claude Code sessions simultaneously. Set up parallel terminals, manage concurrent AI agents, and resolve conflicts automatically. Works with Codex and Gemini CLI too.',
```

**Why:** Targets "multiple claude code terminals", "can you run multiple claude chats at once", "claude code multiple sessions" - cluster of ~1,500 impressions at position 6-8.

**Step 2: Commit**

### Task 6: Optimize Multiple Terminals Guide Title & Meta (ES)

**Files:**
- Modify: `content/guides/es/como-usar-varios-terminales-claude-code.ts`

**Step 1: Update meta fields to match EN intent**

**Step 2: Commit**

### Task 7: Optimize Real-Time Changes Guide Title & Meta (EN)

**Files:**
- Modify: `content/guides/en/view-claude-code-changes-real-time.ts`

```typescript
// NEW:
metaTitle: 'View Claude Code Changes in Real Time: Live Diff, Git Diff & Terminal Tracking',
metaDescription: 'See exactly what Claude Code changes in your codebase in real time. Three methods: session live diff, project-level Git diff viewer, and dynamic terminal titles showing AI activity.',
```

**Why:** Targets "claude code see changes", "claude code diff view", "claude code show diff" - cluster with decent impressions and best current CTR (1.87%).

**Step 2: Commit**

### Task 8: Optimize Real-Time Changes Guide Title & Meta (ES)

**Step 1: Update meta fields to match EN intent**
**Step 2: Commit**

### Task 9: Optimize Notifications Guide Title & Meta (EN)

**Files:**
- Modify: `content/guides/en/codeagentswarm-notifications.ts`

```typescript
// NEW:
metaTitle: 'Claude Code Notifications: Know When AI Finishes Without Watching the Terminal',
metaDescription: 'Set up desktop notifications for Claude Code so you know instantly when the AI finishes a task or needs your input. Stop wasting time watching the terminal.',
```

**Why:** Targets "claude code notifications", "want to be notified when claude responds?" (165 impressions!) - currently at position 10.8 with only 3 clicks.

**Step 2: Commit**

### Task 10: Optimize Notifications Guide Title & Meta (ES)

**Step 1: Update meta fields to match EN intent**
**Step 2: Commit**

---

## Phase 2: Structured Data (JSON-LD Schema)

**Rationale:** Missing structured data = missing rich snippets in Google. FAQPage schema alone can double SERP real estate. SoftwareApplication gives star ratings and app info in search.

### Task 11: Add FAQPage Schema to Guide Pages

**Files:**
- Modify: `app/[locale]/guides/[slug]/page.tsx` (lines 103-119)
- Modify: `app/[locale]/guias/[slug]/page.tsx` (equivalent)

**Step 1: Extend JSON-LD to include FAQPage when guide has FAQ**

In `app/[locale]/guides/[slug]/page.tsx`, update the jsonLd block:

```typescript
// Build JSON-LD array (Article + optional FAQPage)
const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: guide.meta.title,
  description: guide.meta.metaDescription,
  url: `${baseUrl}/en/guides/${slug}`,
  ...(guide.meta.publishedAt && { datePublished: guide.meta.publishedAt }),
  ...(guide.meta.updatedAt && { dateModified: guide.meta.updatedAt }),
  publisher: {
    '@type': 'Organization',
    name: 'CodeAgentSwarm',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${baseUrl}/en/guides/${slug}`,
  },
}

const jsonLdFaq = guide.faq && guide.faq.length > 0 ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: guide.faq.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
} : null
```

Then render both:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
/>
{jsonLdFaq && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
  />
)}
```

**Step 2: Add datePublished and updatedAt to all guide metas**

Add to each guide's meta object:
```typescript
publishedAt: '2026-02-15', // approximate original publish date
updatedAt: '2026-04-15',   // today
```

**Step 3: Repeat for Spanish guide page** (`app/[locale]/guias/[slug]/page.tsx`)

**Step 4: Verify with build**

Run: `npm run build`

**Step 5: Commit**

```bash
git commit -m "seo: add FAQPage schema and datePublished/dateModified to guides"
```

### Task 12: Add SoftwareApplication Schema to Homepage

**Files:**
- Modify: `app/[locale]/page.tsx` or `app/[locale]/layout.tsx`

**Step 1: Add SoftwareApplication JSON-LD to the homepage**

```typescript
const jsonLdApp = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CodeAgentSwarm',
  description: 'AI coding workspace for Claude Code, Codex and Gemini CLI terminals',
  url: 'https://www.codeagentswarm.com',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free with Pro features included',
  },
  publisher: {
    '@type': 'Organization',
    name: 'CodeAgentSwarm',
    url: 'https://www.codeagentswarm.com',
  },
}
```

**Step 2: Add FAQPage schema for homepage FAQ section**

Extract the FAQ items from the homepage component and add as FAQPage JSON-LD (same pattern as Task 11).

**Step 3: Commit**

```bash
git commit -m "seo: add SoftwareApplication and FAQPage schema to homepage"
```

### Task 13: Add BreadcrumbList Schema to Guide Pages

**Files:**
- Modify: `app/[locale]/guides/[slug]/page.tsx`
- Modify: `app/[locale]/guias/[slug]/page.tsx`

**Step 1: Add BreadcrumbList JSON-LD**

```typescript
const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}/en`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Guides',
      item: `${baseUrl}/en/guides`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: guide.meta.title,
      item: `${baseUrl}/en/guides/${slug}`,
    },
  ],
}
```

**Step 2: Commit**

```bash
git commit -m "seo: add BreadcrumbList schema to guide pages"
```

---

## Phase 3: Technical SEO Fixes

### Task 14: Fix Canonical Duplication (/ vs /en)

**Files:**
- Modify: `app/sitemap.ts`

**Problem:** Sitemap lists both `https://www.codeagentswarm.com` (priority 1.0) and `https://www.codeagentswarm.com/en` (priority 0.9). This creates canonical confusion.

**Step 1: Remove the root URL or make /en the priority 1.0**

Since the canonical on the page points to `/en`, make the sitemap consistent:

```typescript
// Remove the bare baseUrl entry OR redirect / to /en
const staticPages: MetadataRoute.Sitemap = [
  {
    url: `${baseUrl}/en`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    url: `${baseUrl}/es`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  // ... beta pages
]
```

**Step 2: Commit**

```bash
git commit -m "seo: fix canonical duplication in sitemap, remove bare root URL"
```

### Task 15: Add Outbound Links to Guides

**Files:**
- Modify: All 5 English guides in `content/guides/en/`
- Modify: All 5 Spanish guides in `content/guides/es/`

**Step 1: Add relevant outbound links to each guide**

Each guide should link to at least 2-3 authoritative external sources. Add as paragraph blocks with inline links:

- **History guide:** Link to Claude Code official docs, Anthropic docs on conversation persistence
- **YOLO mode guide:** Link to `--dangerously-skip-permissions` Anthropic docs, Claude Code CLI reference
- **Multiple terminals guide:** Link to Claude Code docs, Codex CLI docs, Gemini CLI docs
- **Real-time changes guide:** Link to Git diff documentation, Claude Code docs
- **Notifications guide:** Link to Claude Code docs on notifications

**Step 2: Commit per guide pair (EN+ES)**

---

## Phase 4: New Content - Blog Articles (High-Volume Keywords)

**Rationale:** Current 5 guides are product-focused. Need informational content that targets the broader keyword space where users haven't heard of CodeAgentSwarm yet.

### Task 16: Create New Guide - "Claude Code History Complete Guide" (Pillar Content)

**Target keywords:**
- `claude code history` (334 imp, pos 10.9)
- `claude code terminal session history` (543 imp, pos 8.7)
- `claude code conversation history` (20+ imp, pos 11.9)
- `where does claude code store conversation history` (43 imp, pos 10.6)
- `claude code find old conversation` (52 imp, pos 9.6)
- `claude code search history` (47 imp, pos 10.0)
- Plus 50+ long-tail variants totaling ~5,000 impressions

**Files:**
- Create: `content/guides/en/claude-code-history-complete-guide.ts`
- Create: `content/guides/es/guia-completa-historial-claude-code.ts`
- Modify: `content/guides/index.ts` (register new guide)

**Content outline (EN):**
```
Title: "Claude Code History: The Complete Guide to Finding & Managing Past Conversations"
metaTitle: "Claude Code History: Find Past Conversations, Search Sessions & Resume Chats"
metaDescription: "Everything about Claude Code conversation history: where it's stored, how to search past sessions, view old chats, resume conversations, and manage your history effectively."

Sections:
1. Where Claude Code Stores Conversation History
   - Default file locations (~/.claude/conversations/)
   - Session files structure
   - How Claude Code organizes sessions

2. How to View Claude Code History (Built-in Methods)
   - The /history command
   - claude -r (resume last)
   - claude --resume flag
   - Limitations of native history

3. How to Search Past Conversations
   - Native search limitations
   - Using grep/find on history files
   - Better alternatives (CodeAgentSwarm searchable history)

4. How to Resume Old Claude Code Conversations
   - Resume last session
   - Resume a specific session
   - Resume across projects

5. Managing History Across Multiple Projects
   - Project-based organization
   - Cross-project search
   - Managing parallel sessions

6. Advanced: Exporting and Backing Up History
   - File formats
   - Backup strategies
   - Migration between machines

7. FAQ (targeting long-tail queries)
   - "Where does Claude Code store history?"
   - "Can I search Claude Code conversations?"
   - "How to find an old Claude Code chat?"
   - "Does Claude Code save conversation history?"
   - "How to resume a Claude Code conversation?"
   - "Can I export Claude Code history?"
```

**Word count target: 3,000+ words**

This article should be comprehensive enough to rank for ALL the history-related queries. It starts with pure Claude Code information (what users search for) and naturally introduces CodeAgentSwarm as the solution for advanced history management.

**Step 1: Write the full guide content in EN**
**Step 2: Write the ES translation**
**Step 3: Register in index.ts**
**Step 4: Build and verify**
**Step 5: Commit**

### Task 17: Create New Guide - "Can You Run Multiple Claude Code Sessions at Once?"

**Target keywords:**
- `can claude run multiple chats at once` (277 imp, pos 8.4)
- `can you run multiple claude chats at once` (207 imp, pos 8.4)
- `can i run multiple claude chats at once` (164 imp, pos 7.0)
- `can you have multiple claude chats at once` (145 imp, pos 7.9)
- `claude code multiple sessions` (9 imp, pos 31.7)
- Plus variants ~1,000+ total impressions

**Files:**
- Create: `content/guides/en/run-multiple-claude-code-sessions.ts`
- Create: `content/guides/es/ejecutar-multiples-sesiones-claude-code.ts`
- Modify: `content/guides/index.ts`

**Content outline (EN):**
```
Title: "Can You Run Multiple Claude Code Sessions at Once? Yes - Here's How"
metaTitle: "Run Multiple Claude Code Sessions at Once: 3 Methods Compared"
metaDescription: "Yes, you can run multiple Claude Code chats simultaneously. Learn 3 methods: native terminal tabs, tmux/screen, and CodeAgentSwarm. Pros, cons, and step-by-step setup for each."

Sections:
1. The Short Answer: Yes, You Can
2. Method 1: Multiple Terminal Windows/Tabs (Free, Basic)
3. Method 2: tmux or screen (Free, Advanced)
4. Method 3: CodeAgentSwarm (GUI, Full Featured)
5. Comparison Table (features, difficulty, cost)
6. Common Issues with Multiple Sessions
7. FAQ
```

**Word count target: 2,000+ words**

### Task 18: Create New Guide - "Claude Code YOLO Mode Explained"

**Target keywords:**
- `claude code yolo mode` (174 imp, pos 14.5)
- `claude yolo mode` (219 imp, pos 12.9)
- `claude code --dangerously-skip-permissions` (54 imp, pos 8.7)
- `yolo mode meaning` (16 imp, pos 5)
- Plus 30+ variants ~2,000+ total impressions

**Files:**
- Create: `content/guides/en/claude-code-yolo-mode-explained.ts`
- Create: `content/guides/es/modo-yolo-claude-code-explicado.ts`
- Modify: `content/guides/index.ts`

**Content outline (EN):**
```
Title: "Claude Code YOLO Mode Explained: What It Is, Risks & How to Enable It"
metaTitle: "Claude Code YOLO Mode: What --dangerously-skip-permissions Does & How to Enable It Safely"
metaDescription: "Everything about Claude Code YOLO mode: what --dangerously-skip-permissions actually does, the real risks, how to enable it, safer alternatives, and best practices for auto-approve workflows."

Sections:
1. What Is YOLO Mode in Claude Code?
2. What --dangerously-skip-permissions Actually Does
3. Real Risks of Running YOLO Mode
4. How to Enable YOLO Mode (Step by Step)
5. Safer Alternatives: Granular Permissions
6. Best Practices for Auto-Approve Workflows
7. FAQ
```

**Word count target: 2,500+ words**

NOTE: This is different from the existing turbo mode guide. The existing guide is product-focused ("how to use Turbo Mode in CodeAgentSwarm"). This new guide is search-intent focused ("what is YOLO mode in Claude Code") and naturally leads readers to CodeAgentSwarm as the safer alternative.

### Task 19: Create New Guide - "Claude Code vs Cursor vs Codex CLI: AI Coding Tools Compared"

**Target keywords:**
- `claude code vs cursor` (high search volume, competitive)
- `best ai coding tools 2026` (high volume)
- `codex cli vs claude code` (emerging)
- `ai terminal tools comparison`

**Files:**
- Create: `content/guides/en/claude-code-vs-cursor-vs-codex.ts`
- Create: `content/guides/es/claude-code-vs-cursor-vs-codex.ts`
- Modify: `content/guides/index.ts`

**Content outline (EN):**
```
Title: "Claude Code vs Cursor vs Codex CLI: AI Coding Tools Compared (2026)"
metaTitle: "Claude Code vs Cursor vs Codex CLI: Honest Comparison for Developers (2026)"
metaDescription: "Detailed comparison of Claude Code, Cursor, and Codex CLI. Features, pricing, performance, and best use cases for each AI coding tool. Updated for 2026."

Sections:
1. Quick Overview: What Each Tool Does
2. Claude Code: Deep Dive
3. Cursor: Deep Dive
4. Codex CLI: Deep Dive
5. Feature Comparison Table
6. Pricing Comparison
7. When to Use Each Tool
8. How to Get the Best of All Worlds (CodeAgentSwarm)
9. FAQ
```

**Word count target: 3,000+ words**

### Task 20: Create New Guide - "Best MCP Servers for Claude Code"

**Target keywords:**
- `best mcp servers claude code` (emerging, low competition)
- `claude code mcp setup`
- `mcp servers list`
- `claude code integrations`

**Files:**
- Create: `content/guides/en/best-mcp-servers-claude-code.ts`
- Create: `content/guides/es/mejores-servidores-mcp-claude-code.ts`
- Modify: `content/guides/index.ts`

**Content outline (EN):**
```
Title: "Best MCP Servers for Claude Code: Top 12 Integrations You Need"
metaTitle: "Best MCP Servers for Claude Code: 12 Must-Have Integrations (2026)"
metaDescription: "The best MCP servers for Claude Code: GitHub, Notion, Slack, Supabase, Playwright, PostgreSQL and more. Setup guides, use cases, and tips for each integration."

Sections:
1. What Are MCP Servers?
2. Top 12 MCP Servers Ranked
   - GitHub MCP
   - Notion MCP
   - Slack MCP
   - Supabase MCP
   - Playwright MCP
   - PostgreSQL MCP
   - Brave Search MCP
   - Filesystem MCP
   - Google Drive MCP
   - Chrome DevTools MCP
   - Puppeteer MCP
   - Custom MCP Servers
3. How to Install and Configure MCP Servers
4. Managing Multiple MCPs (CodeAgentSwarm MCP Marketplace)
5. FAQ
```

**Word count target: 2,500+ words**

### Task 21: Create New Guide - "Claude Code Tips and Tricks"

**Target keywords:**
- `claude code tips` (emerging)
- `claude code tricks`
- `how to use claude code effectively`
- `claude code best practices`

**Files:**
- Create: `content/guides/en/claude-code-tips-and-tricks.ts`
- Create: `content/guides/es/trucos-y-consejos-claude-code.ts`
- Modify: `content/guides/index.ts`

**Content outline (EN):**
```
Title: "25 Claude Code Tips & Tricks to 10x Your Productivity"
metaTitle: "25 Claude Code Tips & Tricks You Wish You Knew Earlier (2026)"
metaDescription: "Boost your Claude Code productivity with these 25 tips and tricks: keyboard shortcuts, CLAUDE.md files, parallel sessions, history management, MCP servers, and advanced workflows."

Sections:
1. Getting Started Tips (1-5)
2. Productivity Shortcuts (6-10)
3. Project Management Tips (11-15)
4. Advanced Workflows (16-20)
5. Power User Secrets (21-25)
6. FAQ
```

**Word count target: 3,000+ words**

---

## Phase 5: Internal Linking Strategy

### Task 22: Cross-Link All Guides

**Files:**
- Modify: All guide content files (EN + ES)

**Step 1: Add "Related guides" callout blocks at strategic points**

Each guide should link to at least 3 other guides inline (not just at the bottom). Use the callout block type:

```typescript
{
  type: 'callout',
  variant: 'tip',
  content: 'Want to see changes from multiple terminals at once? Check our guide on <a href="/en/guides/how-to-use-multiple-claude-code-terminals">running multiple Claude Code terminals in parallel</a>.'
}
```

**Internal linking map:**

| Guide | Must link to |
|-------|-------------|
| History | Multiple terminals, Real-time changes, Tips & Tricks |
| YOLO mode | Real-time changes, Notifications, Multiple terminals |
| Multiple terminals | History, Real-time changes, Notifications |
| Real-time changes | Multiple terminals, History, YOLO mode |
| Notifications | Multiple terminals, Real-time changes, History |
| History Complete Guide | History (product guide), Multiple sessions, Tips |
| Multiple Sessions | Multiple terminals, History, Notifications |
| YOLO Explained | YOLO turbo mode, Real-time changes, Tips |
| VS Comparison | Multiple terminals, MCP servers, Tips |
| MCP Servers | Multiple terminals, YOLO mode, Tips |
| Tips & Tricks | ALL other guides |

**Step 2: Commit**

### Task 23: Update Homepage GuidesSection with New Content

**Files:**
- Modify: `components/GuidesSection.tsx`
- Modify: `messages/en.json`
- Modify: `messages/es.json`

**Step 1: Consider replacing featured guides with highest-search-volume ones**

Current featured: Multiple Terminals, View Changes, Turbo Mode
Consider replacing with: History Complete Guide, Multiple Sessions, VS Comparison (higher search volume)

**Step 2: Commit**

---

## Phase 6: Content Refresh & Expansion (Ongoing)

### Task 24: Add publishedAt and updatedAt Dates to All Guides

**Files:**
- Modify: All 10 guide files (5 EN + 5 ES)

**Step 1: Add dates to each guide meta**

```typescript
publishedAt: '2026-02-01', // Approximate original publish date
updatedAt: '2026-04-15',   // Current date
```

This enables datePublished/dateModified in the Article schema (Task 11), which Google uses for freshness ranking.

**Step 2: Commit**

---

## Execution Priority Order

**Week 1 (Quick Wins - Immediate Impact):**
1. Tasks 1-10: Title/meta optimization (all guides, EN+ES)
2. Task 14: Fix canonical duplication
3. Task 24: Add dates to all guides

**Week 2 (Structured Data):**
4. Task 11: FAQPage schema on guides
5. Task 12: SoftwareApplication + FAQPage on homepage
6. Task 13: BreadcrumbList schema

**Weeks 3-4 (New Content - Highest Volume First):**
7. Task 16: History Complete Guide (targets ~5,000 impressions cluster)
8. Task 17: Multiple Sessions guide (targets ~1,000 impressions cluster)
9. Task 18: YOLO Mode Explained (targets ~2,000 impressions cluster)

**Weeks 5-6 (New Content - Growth):**
10. Task 19: VS Comparison article
11. Task 20: MCP Servers guide
12. Task 21: Tips & Tricks article

**Week 7 (Linking & Polish):**
13. Task 15: Outbound links
14. Task 22: Internal cross-linking
15. Task 23: Homepage guide updates

---

## Expected Impact

| Phase | Action | Effort | Expected Impact |
|-------|--------|--------|-----------------|
| 1 | Title/meta optimization | 2-3 hours | CTR from 0.93% to 2-3% (~2x-3x clicks) |
| 2 | Structured data | 3-4 hours | Rich snippets, +20-30% CTR boost |
| 3 | Fix canonical | 30 min | Consolidate ranking signals |
| 4 | 6 new articles | 3-4 weeks | +5,000-10,000 new impressions/month |
| 5 | Internal linking | 2-3 hours | Better crawling, longer sessions |

**Conservative projection:** From ~872 clicks/3mo to ~3,000-4,000 clicks/3mo within 2-3 months of implementation.

---

## Monitoring & KPIs

Track weekly in Google Search Console:
- **CTR per page** (target: >2% for guides, >5% for homepage)
- **Position per target keyword cluster** (target: move from 8-12 to 3-7)
- **Total impressions** (target: 200K+ in next 3 months)
- **New pages indexed** (target: all new guides indexed within 2 weeks)

Track in Umami:
- **Organic traffic as % of total** (target: >50%)
- **Pages per session** (target: >1.5 with internal linking)
- **Download conversion from guide pages** (target: >3%)
