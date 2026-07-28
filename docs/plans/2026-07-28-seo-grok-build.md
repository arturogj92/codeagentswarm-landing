# SEO Plan: Grok Build as 6th agent

**Date:** 2026-07-28  
**Last revised:** 2026-07-28 (Opus SEO review applied)  
**Product name (canonical):** Grok Build  
**CLI command:** `grok` (xAI Grok Build TUI)  
**Agent id in app:** `grok`  
**Vendor:** xAI  

> Goal: own the long-tail around Grok Build + multi-session / swarm / Plan Mode / Windows / pricing the same way we own it for Kimi Code and OpenCode, and make the landing tell Google (and answer engines) that CodeAgentSwarm is the supervised desktop workspace for Grok Build alongside the other five CLIs.

**This cluster is a better opportunity than Kimi was.** Modifier `xai` carries volume (`grok build xai` >> bare `grok build`). Product is still early; third-party coverage of Plan Mode and subagents is thin. Do not treat this as a routine sixth-agent copy-paste.

---

## 0. Product facts (copy source of truth)

| Fact | Value | Status |
|------|--------|--------|
| Display name | **Grok Build** (not bare “Grok” in H1s; not “Grok Code”) | Canonical |
| CLI binary | `grok` | Verified (`grok --help`) |
| Vendor | xAI | Canonical |
| Install | Official xAI CLI installer (see x.ai/cli / current docs) | Confirm URL at publish time |
| Access | SuperGrok or X Premium+ (beta-era public framing) | Confirm before pricing guide ships |
| Data root | `~/.grok` (relocatable via `GROK_HOME`) | Verified in app integration |
| Global rules | markdown under `~/.grok/rules/` | App writes `codeagentswarm.md` there |
| MCP config | `~/.grok/config.toml` → `[mcp_servers.<name>]` | Verified in app |
| Skills | `~/.grok/skills/` (agentskills.io) | Verified in app |
| YOLO-ish flag | `--always-approve` | Verified (`grok --help`) |
| Resume | `--continue` / `--resume` | **Verified** 2026-07-28 via `grok --help` |
| Headless | `grok -p` / print-style non-interactive (confirm flags at write time) | Check docs when writing headless guide |
| Plan Mode | Graph-style planning with approval gates (xAI marketing) | Confirm wording against current docs |
| Native subagents | Grok Build has native subagents (worktree-aware); distinct from CAS multi-terminal | Confirm wording against current docs |
| Config compat | Reads Claude-style skills/hooks patterns in some cases; CAS may pin `compat.claude.hooks=false` | App-specific; do not overclaim |
| CAS role | Workspace **on top of** Grok Build. We do not replace the CLI. | Canonical |

### 0b. Entity disambiguation (mandatory in every Grok guide intro)

Three different things are called “Grok”:

1. **Grok the chatbot** (xAI consumer chat)
2. **Grok Build** — xAI’s official coding CLI (`grok`) — **this is what we support**
3. Unaffiliated community tools named `grok-cli` on GitHub

Every guide’s first paragraph must disambiguate (1)/(2)/(3). GEO win; almost nobody else does it.

**Positioning one-liner (EN):**  
CodeAgentSwarm runs multiple Grok Build terminals in parallel (and next to Claude Code, Codex, Antigravity, OpenCode, Kimi Code), with live visibility, desktop notifications, searchable history and per-terminal diffs. That is different from Grok Build’s own native subagents, which stay inside one vendor session.

**Positioning one-liner (ES):**  
CodeAgentSwarm ejecuta varios terminales de Grok Build en paralelo (y junto a Claude Code, Codex, Antigravity, OpenCode y Kimi Code), con visibilidad en vivo, notificaciones, historial buscable y diffs por terminal. Eso es distinto de los subagentes nativos de Grok Build, que viven dentro de una sola sesión del vendor.

---

## 1. Phased rollout

| Phase | What | Status |
|-------|------|--------|
| **A – Landing + cross-vendor pillar** | Grok Build in every agent list; short titles; FAQ a16 with real entities; Works with card → refreshed `ai-cli-agent-swarm` (Grok mentioned, Gemini retired from meta); `llms.txt` facts; guides index meta | **Done in worktree (not pushed)** |
| **B – SEO guide cluster** | Inventory below (Opus-revised); register; wire Works with to pillar | **Done in worktree (11 EN + 11 ES, registered, Works with → pillar)** |
| **C – Visuals** | Real Grok Build multi-terminal + picker screenshots | Planned |
| **D – Internal linking** | From swarm pillar, skills guide, other agents into Grok guides | After B |
| **E – Publish** | Commit/push only when Arturo says so | Blocked on review |

---

## 2. Keyword strategy

### Head (do not fight day one)
- “Grok”, “Grok AI”, “xAI” brand SERPs → owned by xAI. Use as entities + modifiers.

### Modifier rule
**Every metaTitle must contain “xAI” or “x.ai”** when natural. The `xai` modifier carries the volume.

### Long-tail primary targets
1. how to use / install Grok Build + xAI  
2. Grok Build vs Claude Code (and running both)  
3. agent swarm / multiple grok terminals (one merged pillar)  
4. Plan Mode  
5. native subagents vs supervised multi-terminal swarm  
6. pricing / SuperGrok / X Premium+ requirements  
7. Windows  
8. from Claude Code / CLAUDE.md compat  
9. vs Cursor  
10. headless / CI  
11. conversation history (only after resume verified — **verified 2026-07-28**)

---

## 3. Guide cluster (Phase B) — Opus-revised inventory

Merge former “run multiple sessions” into the swarm pillar. Fold YOLO/`--always-approve` into Plan Mode. Un-defer pricing (no invented numbers). Promote vs-cursor. History unblocked (resume exists).

| # | EN slug | ES slug | Angle | Priority |
|---|---------|---------|-------|----------|
| 1 | `how-to-use-grok-build` | `como-usar-grok-build` | Install, SuperGrok/X Premium+ login, core commands, disambiguation | P0 |
| 2 | `grok-build-vs-claude-code` | `grok-build-vs-claude-code` | Honest comparison + run both in one swarm | P0 |
| 3 | `grok-build-agent-swarm` | `enjambre-de-agentes-grok-build` | **Merged pillar** (absorbs multi-session: tabs / tmux / CAS) | P0 |
| 4 | `grok-build-plan-mode` | `modo-plan-grok-build` | Plan Mode, approval gates, `--always-approve` tradeoff | P1 |
| 5 | `grok-build-subagents-vs-agent-swarm` | `subagentes-grok-build-vs-enjambre` | Native subagents vs supervised multi-terminal | P1 |
| 6 | `grok-build-pricing` | `precios-y-acceso-grok-build` | SuperGrok / X Premium+, beta, no invented quotas | P1 |
| 7 | `grok-build-on-windows` | `grok-build-en-windows` | Native vs WSL | P1 |
| 8 | `grok-build-from-claude-code` | `grok-build-desde-claude-code` | CLAUDE.md / skills / AGENTS.md migration intent | P2 |
| 9 | `grok-build-vs-cursor` | `grok-build-vs-cursor` | Same pattern as Codex/OpenCode vs-cursor | P2 |
| 10 | `grok-build-headless-ci` | `grok-build-headless-ci` | `grok -p`, automation | P2 |
| 11 | `grok-build-conversation-history` | `historial-conversaciones-grok-build` | Find & resume (`--continue` / `--resume`) + CAS history | P2 |

**Deleted from v1 inventory:** standalone `run-multiple-grok-build-sessions`, standalone `grok-build-yolo-mode`.

### Writing order
1 → 2 → 3 (unblocks Works with dedicated pillar) → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11.

If holding at 7 guides: ship 1–7; drop 8–11 to a later batch.

### Title / meta formulas (char-conscious)

```
how-to-use-grok-build
  metaTitle:  How to Use Grok Build (xAI): Install, Login and Commands (2026)
  metaDesc:   Grok Build is xAI's terminal coding agent (the grok command). Install it,
              sign in with SuperGrok or X Premium+, and learn the commands that matter,
              plus how to supervise several at once in CodeAgentSwarm.

grok-build-agent-swarm
  metaTitle:  Grok Build Agent Swarm: Run Multiple grok Terminals (2026)
  metaDesc:   Run several Grok Build sessions in parallel. How native subagents differ
              from a real multi-terminal swarm, and how tabs, tmux and CodeAgentSwarm compare.

grok-build-vs-claude-code
  metaTitle:  Grok Build vs Claude Code: Honest Comparison (2026)

grok-build-plan-mode
  metaTitle:  Grok Build Plan Mode (xAI): Review Before It Codes (2026)

grok-build-pricing
  metaTitle:  Grok Build Pricing: SuperGrok, X Premium+ and Access (2026)

ES how-to
  metaTitle:  Cómo usar Grok Build de xAI: instalación y comandos (2026)
```

Rule: **entity + xAI/binary in the first ~40 chars**, benefit second, year last. Prefer lowercase `grok` when targeting the binary (same pattern as `opencode` guides).

### Registration checklist
- [x] 11 EN + 11 ES guide files
- [x] `content/guides/index.ts`
- [x] `GuidesIndexPage` family `grok` (slugs pre-mapped)
- [x] `public/llms.txt` full rebuild including all Grok URLs
- [x] Works with card → `grok-build-agent-swarm` / `enjambre-de-agentes-grok-build`
- [ ] Screenshots under `public/images/guides/` (still placeholders / shared selector image)
- [x] No em dashes; specific `ctaText`; FAQ per guide
- [x] First paragraph entity disambiguation

---

## 4. Landing surface checklist (Phase A) — applied

| Surface | Status |
|---------|--------|
| Icon `public/icons/apps/grok-icon.svg` | Done |
| Hero agent stack | Done |
| Works with 6th card + New badge | Done; href → refreshed cross-vendor pillar |
| FAQ count 16 + a16 with real Grok entities | Done |
| Short home `<title>` / OG title (no 6-name list) | Done (~60 chars) |
| FAQ a3/a5/a6/a7/a8 thinned | Done |
| a10 display names normalized | Done |
| Cross-vendor pillar EN+ES refreshed (drop Gemini-from-meta, add Grok) | Done |
| Site + beta metadata + messages EN/ES | Done |
| Guides index `/en/guides` + `/es/guias` meta | Done |
| `llms.txt` full rebuild + Grok facts + subagents distinction | Done |
| ES accents in layout/beta where touched | Done |
| GuideProductBlock `grok` video keyword | Done |
| GuidesIndex family + slug map | Done (expanded inventory) |

**Ship blockers from Opus review — all addressed in worktree.**

---

## 5. Success criteria

- [x] No home title > ~65 chars with six brand names
- [x] Works with Grok destination page mentions Grok Build (≥3 times) — cross-vendor pillar refreshed
- [x] FAQ a16 carries `grok` binary + SuperGrok/X Premium+ + CAS benefits
- [x] `llms.txt` distinguishes native subagents vs multi-terminal swarm and lists Grok facts
- [x] Guides index meta not Claude-only
- [ ] Phase B guides published and registered
- [ ] Works with rewired to dedicated Grok pillar when written
- [ ] No push until Arturo approves

---

## 6. Suggested commit split (when ready)

1. `docs(seo): revise Grok Build SEO plan after Opus review`
2. `feat(landing): ship Grok Build as 6th agent + fix titles/FAQ/pillar`
3. `feat(seo): Grok Build guide cluster (batch 1)`  
4. `chore(seo): Grok screenshots + llms guide links`

---

## 7. Out of scope

- Desktop app wiring (`codeagentswarm-adding-a-cli-agent`)
- Inventing quota windows without public sources
- Push without Arturo approval

---

## 8. Agent set (current)

1. Claude Code  
2. Codex CLI  
3. Antigravity CLI  
4. OpenCode  
5. Kimi Code  
6. **Grok Build**

EN list: `Claude Code, Codex, Antigravity CLI, OpenCode, Kimi Code and Grok Build`  
ES list: `Claude Code, Codex, Antigravity CLI, OpenCode, Kimi Code y Grok Build`
