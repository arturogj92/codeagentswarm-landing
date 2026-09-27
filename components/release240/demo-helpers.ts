// Shared helpers for the "New in 2.4.0" demos. Ported from the approved proposal
// docs/plans/2026-09-26-release-240-features-design.html. The demos are imperative
// on purpose (same timelines as the proposal); everything here is scoped to one
// demo root so the same demo can mount twice on a page.

export const ICON = '/icons/apps/'

export type AgentKey = 'claude' | 'codex' | 'kimi' | 'opencode' | 'grok' | 'cursor'

export const AG: Record<AgentKey, { name: string; short: string; icon: string; model?: string }> = {
  claude: { name: 'Claude Code', short: 'Claude', icon: 'claude-icon.svg', model: 'Opus 5.5' },
  codex: { name: 'Codex CLI', short: 'Codex', icon: 'codex-icon.svg', model: 'GPT-5.5' },
  kimi: { name: 'Kimi Code', short: 'Kimi', icon: 'kimi-icon.png' },
  opencode: { name: 'OpenCode', short: 'OpenCode', icon: 'opencode-icon.svg' },
  grok: { name: 'Grok Build', short: 'Grok', icon: 'grok-icon.svg' },
  cursor: { name: 'Cursor Agent', short: 'Cursor', icon: 'cursor-icon.svg' },
}

// Composer placeholder names ("Message Codex...").
export const PH: Record<AgentKey, string> = {
  claude: 'Claude Code', codex: 'Codex', kimi: 'Kimi Code', opencode: 'OpenCode', grok: 'Grok Build', cursor: 'Cursor Agent',
}

export const ORCH = '<path d="M12 8.2 15.3 10.1v3.8L12 15.8l-3.3-1.9v-3.8Z"/><path d="M12 8.2V6M15.3 13.9l2 1.2M8.7 13.9l-2 1.2"/><circle cx="12" cy="3.8" r="2.2"/><circle cx="19.2" cy="16.2" r="2.2"/><circle cx="4.8" cy="16.2" r="2.2"/><path d="M16.7 4.7a9.2 9.2 0 0 1 4.5 6.8M16.5 20.1a9.2 9.2 0 0 1-9 0M2.8 11.5a9.2 9.2 0 0 1 4.5-6.8"/>'
export const PULSE = '<svg class="i" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
export const CHECK = '<svg class="i" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>'
export const CHEV = '<svg class="i chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>'
export const SPARK = `<svg class="spark" viewBox="0 0 24 24">${Array.from({ length: 8 }, (_, i) => {
  const a = i / 8 * Math.PI * 2
  return `<circle cx="${12 + Math.cos(a) * 8}" cy="${12 + Math.sin(a) * 8}" r="${1 + i * .17}" opacity="${.25 + i * .09}"/>`
}).join('')}</svg>`

export const ico = (k: AgentKey, cls = 'agent-ico') => `<span class="${cls}"><img src="${ICON + AG[k].icon}" alt=""></span>`

// Message segments: ['plain text'], ['b', 'bold'], ['c', 'code'].
export type Seg = [string] | [string, string]
export const segHtml = (s: Seg) => s[0] === 'b' ? `<b>${s[1]}</b>` : s[0] === 'c' ? `<code>${s[1]}</code>` : s[0]
// Same tokens as the proposal's split(/(?<=\s)/): each word keeps its trailing space.
const words = (t: string) => t.match(/\S*\s|\S+$/g) || []

export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export class Cancel extends Error {}

export type Runtime = ReturnType<typeof createRuntime>

// One runtime per mounted demo: cancellable timelines plus tracked timers,
// frames and listeners, all released by destroy() on unmount.
export function createRuntime(root: HTMLElement) {
  const doc = root.ownerDocument
  const ctl: Record<string, number> = {}
  const timeouts = new Set<number>()
  const intervals = new Set<number>()
  const frames = new Set<number>()
  const abort = new AbortController()
  let dead = false

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => { timeouts.delete(id); if (!dead) fn() }, ms)
    timeouts.add(id)
    return id
  }
  const every = (fn: () => void, ms: number) => { const id = window.setInterval(fn, ms); intervals.add(id); return id }
  const stopEvery = (id: number) => { window.clearInterval(id); intervals.delete(id) }
  const frame = (fn: (now: number) => void) => {
    const id = window.requestAnimationFrame(now => { frames.delete(id); if (!dead) fn(now) })
    frames.add(id)
    return id
  }
  const cancelFrame = (id: number) => { window.cancelAnimationFrame(id); frames.delete(id) }

  const begin = (key: string) => (ctl[key] = (ctl[key] || 0) + 1)
  const gen = (key: string) => ctl[key]
  const alive = (key: string, g: number) => !dead && ctl[key] === g
  const sleep = (key: string, g: number, ms: number) => new Promise<void>((res, rej) => {
    if (!alive(key, g)) return rej(new Cancel())
    later(() => (alive(key, g) ? res() : rej(new Cancel())), reduced() ? 0 : ms)
  })

  const $ = (sel: string, r: ParentNode = root) => r.querySelector(sel) as HTMLElement
  const $$ = (sel: string, r: ParentNode = root) => Array.from(r.querySelectorAll(sel)) as HTMLElement[]
  const el = (html: string) => {
    const t = doc.createElement('template')
    t.innerHTML = html.trim()
    return t.content.firstElementChild as HTMLElement
  }
  const make = (tag: string) => doc.createElement(tag)
  const on = (target: EventTarget, type: string, fn: (e: Event) => void) => target.addEventListener(type, fn, { signal: abort.signal })

  function swapText(box: HTMLElement, html: string) {
    const old = Array.from(box.children)
    const n = el(`<span class="pre">${html}</span>`)
    box.appendChild(n)
    frame(() => frame(() => n.classList.remove('pre')))
    old.forEach(o => { o.classList.add('out'); later(() => o.remove(), 380) })
  }

  function flipKids(container: HTMLElement, mutate: () => void, ms = 520) {
    const kids = Array.from(container.children) as HTMLElement[]
    const before = kids.map(k => k.getBoundingClientRect().top)
    mutate()
    if (reduced()) return
    kids.forEach((k, i) => {
      if (!k.isConnected) return
      const d = before[i] - k.getBoundingClientRect().top
      if (Math.abs(d) > .5) k.animate([{ transform: `translateY(${d}px)` }, { transform: 'none' }], { duration: ms, easing: 'cubic-bezier(.22,.8,.2,1)' })
    })
  }

  // FLIP for items that can move in both axes (sidebar rows, Kanban cards).
  function flipItems(items: HTMLElement[], mutate: () => void, duration: number, zIndex?: number) {
    const before = new Map(items.map(i => [i, i.getBoundingClientRect()]))
    mutate()
    if (reduced()) return
    items.forEach(i => {
      const a = before.get(i)!, b = i.getBoundingClientRect()
      const dx = a.left - b.left, dy = a.top - b.top
      if (Math.abs(dx) + Math.abs(dy) <= 1) return
      const z = zIndex === undefined ? {} : { zIndex }
      i.animate([{ transform: `translate(${dx}px,${dy}px)`, ...z }, { transform: 'none', ...z }], { duration, easing: 'cubic-bezier(.22,.8,.2,1)' })
    })
  }

  const groupHeader = (label: string) =>
    el(`<div class="rw gh"><div><div class="grp-h"><svg class="i" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>${label} <span class="n">0</span></div></div></div>`)

  const openRw = (rw: HTMLElement, open = true) => { frame(() => frame(() => rw.classList.toggle('in', open))) }

  // Chat log helpers shared by the Coordinators and Auto Kanban windows.
  function logAppend(log: HTMLElement, node: HTMLElement, live: boolean) {
    const doIt = () => { log.appendChild(node); while (log.children.length > 9) log.firstElementChild!.remove() }
    if (live) { node.classList.add('enter'); flipKids(log, doIt) } else doIt()
    return node
  }

  function addWork(log: HTMLElement, clock: string, live: boolean) {
    const node = logAppend(log, el(`<div class="m m-work">${SPARK}<span class="lbl">Working for <b>1</b>s</span>${CHEV}<span class="sp"></span><span class="ts">${clock}</span></div>`), live)
    let n = 1
    const b = $('b', node)
    const id = every(() => { n++; b.textContent = String(n) }, 1000)
    return { id, finish() { stopEvery(id); node.classList.add('fin'); $('.lbl', node).textContent = `Worked for ${n}s` } }
  }

  // Streams an agent message word by word. skipHidden: when the log stops being
  // visible mid-message, the rest lands at once (the Kanban behaviour).
  async function stream(key: string, g: number, log: HTMLElement, segs: Seg[], o: { clock: string; isLive: () => boolean; delay: number; skipHidden?: boolean; cls?: string }) {
    const m = logAppend(log, el(`<div class="m m-agent ${o.cls || ''}"><p></p><div class="ts">${o.clock}</div></div>`), o.isLive())
    const p = $('p', m)
    if (!o.isLive()) { p.innerHTML = segs.map(segHtml).join(''); return }
    for (const s of segs) {
      const target = s[0] === 'b' ? p.appendChild(make('b')) : p
      const tokens = s[0] === 'c' ? [s[1] as string] : words(s[0] === 'b' ? s[1] as string : s[0])
      for (const tk of tokens) {
        if (o.skipHidden && !o.isLive()) { const w = make(s[0] === 'c' ? 'code' : 'span'); w.textContent = tk; target.appendChild(w); continue }
        const h = p.offsetHeight
        const kids = Array.from(log.children) as HTMLElement[], tops = kids.map(k => k.getBoundingClientRect().top)
        const w = make(s[0] === 'c' ? 'code' : 'span'); w.className = 'w'; w.textContent = tk
        target.appendChild(w)
        if (p.offsetHeight !== h && o.isLive()) kids.forEach((k, i) => {
          const d = tops[i] - k.getBoundingClientRect().top
          if (Math.abs(d) > .5) k.animate([{ transform: `translateY(${d}px)` }, { transform: 'none' }], { duration: 280, easing: 'ease-out' })
        })
        await sleep(key, g, o.delay)
      }
    }
  }

  // Scroll a horizontal sidebar (mobile layout) so a row is in view.
  function revealIn(side: HTMLElement, row: HTMLElement) {
    if (side.scrollWidth <= side.clientWidth + 1) return false
    const r = row.getBoundingClientRect(), b = side.getBoundingClientRect()
    if (r.left >= b.left && r.right <= b.right) return false
    side.scrollTo({ left: side.scrollLeft + r.left - b.left - 8, behavior: reduced() ? 'auto' : 'smooth' })
    return true
  }

  // Reset the fake cursor to a resting point without animating.
  function parkCursor(cursor: HTMLElement, app: HTMLElement, fx: number, fy: number) {
    cursor.classList.remove('show')
    cursor.style.transition = 'none'
    const r = app.getBoundingClientRect()
    cursor.style.transform = `translate(${r.width * fx}px, ${r.height * fy}px)`
    cursor.getBoundingClientRect()
    cursor.style.transition = ''
  }

  function click(cursor: HTMLElement) {
    cursor.classList.remove('click'); void cursor.offsetWidth; cursor.classList.add('click')
  }

  // Starts `play` the first time the target is at least 35% visible.
  function startWhenVisible(target: HTMLElement, play: () => void) {
    const io = new IntersectionObserver(es => {
      if (es.some(e => e.isIntersecting)) { io.disconnect(); play() }
    }, { threshold: .35 })
    io.observe(target)
    abort.signal.addEventListener('abort', () => io.disconnect())
  }

  function destroy() {
    dead = true
    Object.keys(ctl).forEach(k => { ctl[k]++ })
    timeouts.forEach(id => window.clearTimeout(id))
    intervals.forEach(id => window.clearInterval(id))
    frames.forEach(id => window.cancelAnimationFrame(id))
    timeouts.clear(); intervals.clear(); frames.clear()
    abort.abort()
  }

  return {
    begin, gen, alive, sleep, later, every, stopEvery, frame, cancelFrame, on,
    $, $$, el, make, swapText, flipKids, flipItems, groupHeader, openRw,
    logAppend, addWork, stream, revealIn, parkCursor, click, startWhenVisible, destroy,
  }
}

// Swallow timeline cancellations; anything else is a real bug.
export const ignoreCancel = (e: unknown) => { if (!(e instanceof Cancel)) throw e }
