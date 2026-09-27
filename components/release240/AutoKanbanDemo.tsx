'use client'

// "03 Auto Kanban" demo: tasks are queued into the Auto lane with their own agent,
// Auto starts them, the agents view shows them working and they land in testing.
// Product UI text stays in English.

import { useEffect, useId, useRef } from 'react'
import { useTranslations } from 'next-intl'
import './release240-demos.css'
import { AG, CHECK, ICON, PH, PULSE, createRuntime, ignoreCancel, reduced, type AgentKey, type Seg } from './demo-helpers'

type TaskDef = { id: number; p: string; t: string; desc: string; agent: AgentKey; d: number; mid: number; first: Seg[]; second: Seg[]; steps: [string, string]; done: string; branch: string }
type Work = { id: number; finish(): void }
type Task = Omit<TaskDef, 'agent'> & { agent: AgentKey; def: AgentKey; card: HTMLElement; act?: string; log?: HTMLElement; rw?: HTMLElement; row?: HTMLElement; work?: Work; queuedAt?: number }
type KScene = {
  tasks: Record<string, Task>; limit: number; timers: number[]; active: number | null
  modal: null | { T: Task; agent: AgentKey }; lastAgent: AgentKey; pumping: boolean; step: number; rgen: number; lastStart?: number
  clock(): string; tick(): void; doneIds: Set<number>; waiters: (() => void)[]; gh: Record<'work' | 'done', HTMLElement>
}

const KPROJ: Record<string, [string, string]> = { 'api-server': ['A', '#3b82f6'], 'landing-site': ['L', '#d97706'], 'mobile-app': ['M', '#22c55e'], 'web-app': ['W', '#a855f7'] }
const KMODEL: Record<AgentKey, [string, string]> = { claude: ['Opus 5.5', 'high'], codex: ['GPT-5.5', 'high'], kimi: ['Default', 'Default'], opencode: ['Default', 'Default'], grok: ['Default', 'Default'], cursor: ['Default', 'Default'] }
const KAGENTS: AgentKey[] = ['claude', 'codex', 'kimi', 'opencode', 'grok', 'cursor']
const KTASKS: TaskDef[] = [
  { id: 1, p: 'api-server', t: 'Add rate limiting to the public API', desc: '100 requests per minute per token, return 429 with Retry-After.', agent: 'claude', d: 18000, mid: .45,
    first: [['I will add a token-bucket limiter in '], ['c', 'src/middleware/rate-limit.ts'], [', keyed by API token.']],
    second: [['The limiter is in. Now returning '], ['c', '429'], [' with a '], ['c', 'Retry-After'], [' header and adding tests.']],
    steps: ['Adding the token-bucket limiter', 'Returning 429 with Retry-After'], done: 'Rate limiting is live with 8 tests passing', branch: 'cas/add-rate-limiting-to-the-public-api' },
  { id: 2, p: 'landing-site', t: 'Redesign the pricing page hero', desc: 'New headline, annual toggle and a lighter background.', agent: 'codex', d: 21000, mid: .7,
    first: [['Starting with the headline, then the monthly and annual toggle in '], ['c', 'PricingHero.tsx'], ['.']],
    second: [['Headline done. Building the toggle and moving the background to '], ['c', 'zinc-900'], ['.']],
    steps: ['Writing the new headline', 'Building the monthly/annual toggle'], done: 'The new hero is ready for review', branch: 'cas/redesign-the-pricing-page-hero' },
  { id: 3, p: 'mobile-app', t: 'Fix push notification badge count on iOS', desc: 'Badge stays at 1 after reading all messages.', agent: 'codex', d: 15000, mid: .5,
    first: [['The badge count comes from '], ['c', 'unreadCount'], [' before the read receipts sync. I will recompute it in '], ['c', 'NotificationService.swift'], ['.']],
    second: [['Recomputed after '], ['c', 'markAllRead()'], ['. Adding a regression test.']],
    steps: ['Recomputing the badge after reads', 'Adding a regression test'], done: 'The badge now clears after reading', branch: 'cas/fix-push-notification-badge-count' },
  { id: 4, p: 'api-server', t: 'Write migration for the user preferences table', desc: 'Add a nullable JSON column and backfill defaults.', agent: 'opencode', d: 12000, mid: .5,
    first: [['Adding a nullable '], ['c', 'preferences'], [' JSON column in a new migration.']],
    second: [['Column added. Backfilling defaults in batches of 1,000.']],
    steps: ['Writing the migration', 'Backfilling defaults'], done: 'Migration ready and backfill tested', branch: 'cas/write-migration-for-user-preferences' },
]
const ZAP = '<svg class="i" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
const INBOX = '<svg class="i" viewBox="0 0 24 24"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/></svg>'
const LANES = ['pending', 'auto', 'progress', 'testing'] as const
// Tasks dragged into Auto use the lane defaults; the lightning button picks settings for one task.
const AUTO_DEFAULT: AgentKey = 'codex'

export default function AutoKanbanDemo() {
  const t = useTranslations('release240.demo')
  const rootRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const rt = createRuntime(root)
    const { $, $$, el, sleep, begin } = rt
    const ref = (k: string) => $(`[data-ref="${k}"]`)
    const kApp = ref('app'), kBoard = ref('board'), kSide = ref('side'), kLogs = ref('logs'), kCursor = ref('cursor')
    const kScrBoard = ref('scr-board'), kScrAgents = ref('scr-agents'), kModal = ref('modal'), kBackdrop = ref('backdrop')
    const kLane = (k: string) => $(`.kb-lane[data-lane="${k}"] .kb-cards`, kBoard)
    let KS = undefined as unknown as KScene

    const kLive = (log: HTMLElement) => log.classList.contains('on') && !kScrAgents.classList.contains('off') && !reduced()
    const kAppend = (log: HTMLElement, node: HTMLElement) => rt.logAppend(log, node, kLive(log))
    const kStream = (K: string, gen: number, log: HTMLElement, segs: Seg[]) =>
      rt.stream(K, gen, log, segs, { clock: KS.clock(), isLive: () => kLive(log), delay: 45, skipHidden: true })
    const kWork = (log: HTMLElement) => { const w = rt.addWork(log, KS.clock(), kLive(log)); KS.timers.push(w.id); return w }
    const kFlip = (mutate: () => void) => rt.flipItems($$('.kb-card', kBoard), mutate, 700, 3)
    const kSideFlip = (mutate: () => void) => rt.flipItems($$('.rw', kSide), mutate, 650)

    function kSetSt(T: Task, html: string) { const st = $('.kc-run .st', T.card); if (st.dataset.v === html) return; st.dataset.v = html; rt.swapText(st, html) }
    function kRender() {
      const empty: Record<string, string> = { pending: 'Backlog is clear', auto: `${ZAP}Drag a task here or use its lightning button. It starts on its own.`, progress: `${INBOX}No tasks in progress`, testing: `${INBOX}Finished work waits here for review` }
      for (const k of LANES) {
        const c = kLane(k), n = $$('.kb-card', c).length
        $(`.kb-lane[data-lane="${k}"] .n`, kBoard).textContent = String(n)
        const em = $('.kb-empty', c)
        if (!n && !em) c.appendChild(el(`<div class="kb-empty">${empty[k]}</div>`))
        if (n && em) em.remove()
      }
      const running = $$('.kb-card', kLane('progress')).length, queued = $$('.kb-card', kLane('auto')).length
      const next = kNext()
      $$('.kb-card', kLane('auto')).forEach(c => {
        kSetSt(KS.tasks[c.dataset.id!], c === next ? '<span class="spin" style="width:10px;height:10px"></span><em>Starting</em>' : '<em>Next up</em>')
      })
      ref('runchip').innerHTML = `<i></i>${running} running · ${queued} queued`
    }
    function kCard(T: TaskDef) {
      const [L, C] = KPROJ[T.p]
      return el(`<div class="kb-card" data-id="${T.id}" data-where="pending">
        <div class="kc-body"><div class="kc-top"><span class="tag" style="background:${C}"><i>${L}</i>${T.p}</span><span class="num">#${T.id}</span></div>
          <div class="kc-title">${T.t}</div><div class="kc-desc">${T.desc}</div></div>
        <div class="kc-foot"><span>9/26/2026</span><span class="sp"></span>
          <button type="button" class="kc-act zap" aria-label="Run “${T.t}” automatically" title="Run automatically">${ZAP}</button>
          <span class="kc-act"><svg class="i" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg></span>
          <span class="kc-act"><svg class="i" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg></span></div>
        <div class="kc-run"><img alt=""><span class="model"></span><span class="rz"></span><span class="st"></span></div>
        <div class="kc-prog"><i></i></div></div>`)
    }
    function kBuild() {
      (KS?.timers || []).forEach(rt.stopEvery)
      begin('kbrun')
      let minute = 14
      KS = {
        tasks: {}, limit: 3, timers: [], active: null, modal: null, lastAgent: AUTO_DEFAULT, pumping: false, step: -1, rgen: rt.gen('kbrun'),
        clock: () => `14:${String(minute).padStart(2, '0')}`, tick: () => { minute++ }, doneIds: new Set(), waiters: [],
        gh: { work: rt.groupHeader('WORKING'), done: rt.groupHeader('DONE') },
      }
      for (const k of LANES) kLane(k).innerHTML = ''
      KTASKS.forEach(d => { const T: Task = { ...d, agent: d.agent, def: d.agent, card: kCard(d) }; KS.tasks[T.id] = T; kLane('pending').appendChild(T.card) })
      Array.from(kSide.children).forEach(c => { if (!c.classList.contains('side-h')) c.remove() })
      kSide.append(KS.gh.work, KS.gh.done)
      kLogs.innerHTML = ''; ref('count').textContent = '0'
      ref('tray-title').textContent = ''; ref('tray-act').innerHTML = ''
      kCloseModal()
      kShow('board')
      kSetStep(-1)
      kRender()
      rt.parkCursor(kCursor, kApp, .7, .7)
    }
    function kSetStep(i: number) { KS.step = i; $$('.kb-step', ref('steps')).forEach((s, k) => { s.classList.toggle('cur', k === i); s.classList.toggle('past', k < i) }) }
    function kShow(which: 'board' | 'agents') {
      const toAgents = which === 'agents'
      kScrBoard.classList.toggle('off', toAgents); kScrAgents.classList.toggle('off', !toAgents)
      if (toAgents && !KS.active) { const first = Object.values(KS.tasks).find(T => T.row); if (first) kSelect(first.id) }
    }
    /* --- Run automatically modal --- */
    function kFillField(box: HTMLElement, html: string) { if (box.dataset.v === html) return; box.dataset.v = html; rt.swapText(box, html) }
    function kPickAgent(a: AgentKey) {
      KS.modal!.agent = a
      $$('.mo-agent', kModal).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.a === a)))
      const [m, r] = KMODEL[a]
      kFillField(ref('mo-model'), `<img src="${ICON + AG[a].icon}" alt="">${m}`)
      kFillField(ref('mo-reason'), `<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${r}`)
    }
    function kOpenModal(T: Task) {
      const [L, C] = KPROJ[T.p]
      KS.modal = { T, agent: KS.lastAgent }
      ref('mo-task').innerHTML = `<span class="tag" style="background:${C}"><i>${L}</i>${T.p}</span><span>#${T.id} · ${T.t}</span>`
      ref('mo-agents').innerHTML = KAGENTS.map(a => `<button type="button" class="mo-agent" data-a="${a}" aria-pressed="false"><img src="${ICON + AG[a].icon}" alt="">${PH[a]}</button>`).join('')
      const mm = ref('mo-model'), mr = ref('mo-reason')
      mm.dataset.v = ''; mr.dataset.v = ''; mm.innerHTML = ''; mr.innerHTML = ''
      kPickAgent(KS.lastAgent)
      T.card.classList.add('hl')
      kBackdrop.classList.add('on'); kModal.classList.add('on')
    }
    function kCloseModal() {
      if (KS?.modal) KS.modal.T.card.classList.remove('hl')
      if (KS) KS.modal = null
      kBackdrop.classList.remove('on'); kModal.classList.remove('on')
    }
    function kQueueWith(T: Task, agent: AgentKey) {
      T.agent = agent
      T.queuedAt = performance.now()
      const [m, r] = KMODEL[agent]
      ;($('.kc-run img', T.card) as HTMLImageElement).src = ICON + AG[agent].icon
      $('.kc-run .model', T.card).textContent = m === 'Default' ? AG[agent].short : m
      $('.kc-run .rz', T.card).textContent = r === 'Default' ? '' : `· ${r}`
      kFlip(() => {
        T.card.classList.remove('dragging'); T.card.style.transform = ''
        T.card.dataset.where = 'auto'; kLane('auto').appendChild(T.card); kRender()
      })
      kPump()
    }
    function kQueue() {
      const { T, agent } = KS.modal!
      kCloseModal()
      kQueueWith(T, agent)
    }
    /* --- The Auto runner --- */
    // The Auto lane is always running: the first queued card starts whenever a slot is free.
    function kNext() {
      if ($$('.kb-card', kLane('progress')).length >= KS.limit) return null
      return $('.kb-card', kLane('auto'))
    }
    // A queued card waits a beat in Auto, and starts are spaced out, so the lane visibly fills and drains.
    const DWELL = 3800, SPACING = 700
    function kPump() {
      const next = kNext()
      if (KS.pumping || !next) return
      KS.pumping = true
      const rgen = KS.rgen, now = performance.now()
      const T = KS.tasks[next.dataset.id!]
      const wait = Math.max((T.queuedAt || now) + DWELL - now, (KS.lastStart || 0) + SPACING - now, 0)
      rt.later(() => {
        if (rt.gen('kbrun') !== rgen) return
        KS.pumping = false
        const n = kNext()
        if (n) { KS.lastStart = performance.now(); kStart(KS.tasks[n.dataset.id!]) }
        kPump()
      }, reduced() ? 0 : wait)
    }
    function kSetAct(T: Task, html: string) {
      T.act = html; kSetSt(T, html)
      if (T.row) rt.swapText($('.ta', T.row), html)
      if (KS.active === T.id) rt.swapText(ref('tray-act'), html)
    }
    function kGroupCount(key: 'work' | 'done', n: number) {
      $('.n', KS.gh[key]).textContent = String(n)
      if (n > 0 && !KS.gh[key].classList.contains('in')) rt.openRw(KS.gh[key], true)
      if (n === 0) KS.gh[key].classList.remove('in')
    }
    const workingCount = () => Object.values(KS.tasks).filter(x => x.row && !KS.doneIds.has(x.id)).length
    function kStart(T: Task) {
      if (KS.step < 1) kSetStep(1)
      kFlip(() => { T.card.dataset.where = 'progress'; kLane('progress').appendChild(T.card); kRender() })
      const [L, C] = KPROJ[T.p]
      T.log = el(`<div class="log" data-id="${T.id}"></div>`); kLogs.appendChild(T.log)
      T.rw = el(`<div class="rw row-w"><div><div class="row" data-id="${T.id}" data-state="working" style="--pc:${C}" tabindex="0" role="button" aria-label="Open ${T.t}">
        <span class="sbar"></span><span class="av">${L}</span><span class="ai"><img src="${ICON + AG[T.agent].icon}" alt=""></span>
        <span class="tx"><span class="tt">${T.t}</span><span class="ta"><span>${PULSE}<em>Starting ${AG[T.agent].name}</em></span></span></span><span class="tm">now</span></div></div></div>`)
      T.row = $('.row', T.rw)
      const working = workingCount()
      kSideFlip(() => { kSide.insertBefore(T.rw!, KS.gh.done); kGroupCount('work', working) })
      rt.openRw(T.rw)
      ref('count').textContent = String(Object.values(KS.tasks).filter(x => x.row).length)
      kAppend(T.log, el(`<div class="m m-user"><div class="bubble task"># Task #${T.id}: ${T.t}\n\n## Description\n${T.desc}</div><div class="ts">${KS.clock()}</div></div>`))
      T.work = kWork(T.log)
      kSetAct(T, `${PULSE}<em>${T.steps[0]}</em>`)
      kRun(T).catch(ignoreCancel)
    }
    async function kRun(T: Task) {
      const K = 'kbrun', gen = KS.rgen, t0 = performance.now(), log = T.log!
      const until = (t: number) => sleep(K, gen, Math.max(0, t - performance.now()))
      const bar = $('.kc-prog i', T.card)
      const pt = rt.every(() => { bar.style.width = `${Math.min(100, (performance.now() - t0) / T.d * 100)}%` }, 400); KS.timers.push(pt)
      await sleep(K, gen, 2600)
      T.work!.finish(); await kStream(K, gen, log, T.first); T.work = kWork(log)
      await until(t0 + T.d * T.mid)
      kSetAct(T, `${PULSE}<em>${T.steps[1]}</em>`)
      T.work.finish(); await kStream(K, gen, log, T.second); T.work = kWork(log)
      await until(t0 + T.d)
      rt.stopEvery(pt); bar.style.width = '100%'
      T.work.finish(); KS.tick()
      await kStream(K, gen, log, [['Done. '], [T.done + '.']])
      T.row!.dataset.state = 'done'; KS.doneIds.add(T.id)
      if (KS.active === T.id) ref('send').classList.remove('busy')
      kSetAct(T, `${CHECK}<em>Ready to review</em>`)
      await sleep(K, gen, 400)
      kFlip(() => { T.card.dataset.where = 'testing'; kLane('testing').prepend(T.card); kRender() })
      const working = workingCount()
      kSideFlip(() => { kSide.appendChild(T.rw!); kGroupCount('work', working); kGroupCount('done', KS.doneIds.size) })
      KS.waiters.forEach(w => w())
      kPump()
    }
    function kSelect(id: number | string) {
      const T = KS.tasks[id]; if (!T || !T.row || KS.active === T.id) return
      KS.active = T.id
      Object.values(KS.tasks).forEach(x => { if (x.row) { x.row.classList.toggle('active', x === T); x.log!.classList.toggle('on', x === T) } })
      if (kSide.scrollWidth > kSide.clientWidth + 1) { const r = T.row.getBoundingClientRect(), b = kSide.getBoundingClientRect(); kSide.scrollTo({ left: kSide.scrollLeft + r.left - b.left - 8, behavior: reduced() ? 'auto' : 'smooth' }) }
      ref('tray-title').textContent = T.t
      rt.swapText(ref('tray-act'), T.act || '')
      const [m, r] = KMODEL[T.agent]
      ref('input').dataset.ph = `Message ${PH[T.agent]}...`
      ;(ref('model-ico') as HTMLImageElement).src = ICON + AG[T.agent].icon
      ref('model').textContent = m === 'Default' ? AG[T.agent].short : m
      ref('reason').textContent = r === 'Default' ? 'Default' : r
      ref('send').classList.toggle('busy', !KS.doneIds.has(T.id))
      $('span', ref('branch')).textContent = T.branch
    }
    /* --- The director: a scripted walk-through the visitor can take over --- */
    async function kCursorTo(K: string, gen: number, target: HTMLElement, fx = .5, fy = .5, ms = 1000) {
      const a = kApp.getBoundingClientRect(), r = target.getBoundingClientRect()
      kCursor.classList.add('show')
      kCursor.style.transitionDuration = `${ms * .95 / 1000}s, .35s`
      kCursor.style.transform = `translate(${r.left - a.left + r.width * fx}px, ${r.top - a.top + r.height * fy}px)`
      await sleep(K, gen, ms)
      rt.click(kCursor)
      await sleep(K, gen, 180)
    }
    // Grab a card, carry it into Auto together with the cursor, and drop it with the lane defaults.
    async function kDrag(K: string, gen: number, T: Task) {
      const card = T.card, title = $('.kc-title', card)
      await kCursorTo(K, gen, title, .25, .5, 520)
      const app = kApp.getBoundingClientRect(), a = card.getBoundingClientRect(), lane = kLane('auto')
      const last = $$('.kb-card', lane).pop()
      const lb = lane.getBoundingClientRect()
      const tx = lb.left + 10 - a.left, ty = (last ? last.getBoundingClientRect().bottom + 9 : lb.top) - a.top
      const t = title.getBoundingClientRect()
      card.classList.add('dragging')
      card.style.transform = `translate(${tx}px, ${ty}px) rotate(1.2deg)`
      kCursor.style.transform = `translate(${t.left - app.left + t.width * .25 + tx}px, ${t.top - app.top + t.height * .5 + ty}px)`
      kCursor.style.transitionDuration = '.46s, .35s'
      await sleep(K, gen, reduced() ? 0 : 480)
      kQueueWith(T, AUTO_DEFAULT)
    }
    function kAllDone(ids: number[]) {
      return new Promise<void>(res => { const check = () => { if (ids.every(i => KS.doneIds.has(i))) res() }; KS.waiters.push(check); check() })
    }
    async function playKanban() {
      const K = 'kanban', gen = begin(K)
      kBuild()
      try {
        await sleep(K, gen, 900)
        kSetStep(0)
        {
          const T = KS.tasks[1]
          const zap = $('.kc-act.zap', T.card)
          zap.classList.add('hit')
          await kCursorTo(K, gen, zap)
          zap.classList.remove('hit')
          kOpenModal(T)
          await sleep(K, gen, 750)
          await kCursorTo(K, gen, $(`.mo-agent[data-a="${T.def}"]`, kModal), .4, .55)
          kPickAgent(T.def)
          await sleep(K, gen, 900)
          const q = ref('mo-queue')
          await kCursorTo(K, gen, q, .45, .55)
          q.classList.add('press'); await sleep(K, gen, 140); q.classList.remove('press')
          kQueue()
          await sleep(K, gen, 900)
        }
        for (const id of [2, 3]) {
          await kDrag(K, gen, KS.tasks[id])
          await sleep(K, gen, 150)
        }
        kCursor.classList.remove('show')
        await sleep(K, gen, 4000)
        kSetStep(2)
        const back = ref('to-agents')
        back.classList.add('hit'); await kCursorTo(K, gen, back); back.classList.remove('hit')
        kShow('agents')
        kSelect(1)
        await sleep(K, gen, 6500)
        await kCursorTo(K, gen, KS.tasks[2].row!, .45, .55)
        kSelect(2)
        await sleep(K, gen, 6500)
        await kCursorTo(K, gen, ref('to-board'))
        kShow('board')
        kCursor.classList.remove('show')
        kSetStep(3)
        await kAllDone([1, 2, 3])
        await sleep(K, gen, 1200)
        $('.kc-act.zap', KS.tasks[4].card).classList.add('hit')
        await sleep(K, gen, 9000)
        if (!reduced()) playKanban()
      } catch (e) { ignoreCancel(e) }
    }
    function kTakeOver() { begin('kanban'); kCursor.classList.remove('show') }
    const target = (e: Event) => e.target as HTMLElement
    rt.on(kBoard, 'click', e => {
      const z = target(e).closest<HTMLElement>('.kc-act.zap'); if (!z) return
      kTakeOver(); kCloseModal(); z.classList.remove('hit')
      kOpenModal(KS.tasks[z.closest<HTMLElement>('.kb-card')!.dataset.id!])
    })
    rt.on(kModal, 'click', e => {
      const agent = target(e).closest<HTMLElement>('.mo-agent')
      if (agent) { kTakeOver(); kPickAgent(agent.dataset.a as AgentKey) }
      if (target(e).closest('[data-ref="mo-queue"]')) { kTakeOver(); if (KS.modal) kQueue() }
      if (target(e).closest('[data-ref="mo-cancel"]')) { kTakeOver(); kCloseModal() }
    })
    rt.on(kBackdrop, 'click', () => { kTakeOver(); kCloseModal() })
    rt.on(ref('to-agents'), 'click', () => { kTakeOver(); kShow('agents') })
    rt.on(ref('to-board'), 'click', () => { kTakeOver(); kShow('board') })
    rt.on(kSide, 'click', e => { const r = target(e).closest<HTMLElement>('.row'); if (r) { kTakeOver(); kSelect(r.dataset.id!) } })
    rt.on(ref('replay'), 'click', () => { playKanban() })

    kBuild()
    rt.startWhenVisible(kApp, () => { playKanban() })
    return () => rt.destroy()
  }, [])

  return (
    <div className="r240" ref={rootRef}>
      <div className="stage-wrap">
        <div className="kb-steps" data-ref="steps" aria-hidden="true">
          <div className="kb-step"><b>1</b>{t('steps.s1')}</div>
          <div className="kb-step"><b>2</b>{t('steps.s2')}</div>
          <div className="kb-step"><b>3</b>{t('steps.s3')}</div>
          <div className="kb-step"><b>4</b>{t('steps.s4')}</div>
        </div>
        <div className="coord-try">
          <span className="seg-lbl">{t('yourTurn')}</span>
          <span className="sp" />
          <button type="button" className="icon-btn" data-ref="replay" aria-label="Replay the Kanban demo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>{t('replay')}
          </button>
        </div>
        <div className="app kb-app" data-ref="app" aria-label="CodeAgentSwarm Kanban with the Auto lane">
          {/* Screen 1: Kanban */}
          <div className="scr" data-ref="scr-board">
            <header className="kb-top">
              <div className="traffic"><i /><i /><i /></div>
              <span className="kb-brand"><img src="/isotipo.png" alt="" />KANBAN</span>
              <span className="kb-search"><svg className="i" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>Search tasks...</span>
              <span className="kb-proj"><svg className="i" viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>Project:<span className="sel">All Projects<svg className="i" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></span></span>
              <span className="sp" />
              <span className="kb-btn opt">Create Project</span>
              <span className="kb-btn primary"><svg className="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>Add Task</span>
              <span className="kb-btn opt"><svg className="i" viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>Refresh</span>
              <button type="button" className="kb-btn" data-ref="to-agents"><svg className="i" viewBox="0 0 24 24"><path d="m4 17 6-5-6-5M12 19h8" /></svg><span className="long">Back to Agents</span></button>
            </header>
            <div className="kb-board" data-ref="board">
              <div className="kb-lane" data-lane="pending"><div className="kb-lh"><span className="bar" /><b>PENDING</b><span className="n">0</span><span className="sp" /><span className="tools"><svg className="i" viewBox="0 0 24 24"><path d="M3 16l4 4 4-4M7 20V4M13 8l4-4 4 4M17 4v16" /></svg><svg className="i" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg></span></div><div className="kb-cards" /></div>
              <div className="kb-lane" data-lane="auto"><div className="kb-lh"><span className="zapbox"><svg className="i" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg></span><b>AUTO</b><span className="n">0</span><span className="sp" /><span className="defchip" title="Auto defaults"><img src="/icons/apps/codex-icon.svg" alt="" />GPT-5.5</span></div><div className="kb-autosub"><span className="runchip" data-ref="runchip" /></div><div className="kb-cards" /></div>
              <div className="kb-lane" data-lane="progress"><div className="kb-lh"><span className="bar" /><b>IN PROGRESS</b><span className="n">0</span></div><div className="kb-cards" /></div>
              <div className="kb-lane" data-lane="testing"><div className="kb-lh"><span className="bar" /><b>IN TESTING</b><span className="n">0</span></div><div className="kb-cards" /></div>
              <div className="kb-lane kb-collapsed" aria-hidden="true"><span className="bar" /><b>COMPLETED</b><span className="n">12</span></div>
            </div>
            <div className="kb-backdrop" data-ref="backdrop" />
            <div className="kb-modal" data-ref="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
              <div className="mo-body">
                <div className="mo-h" id={titleId}><svg className="i" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>Run automatically</div>
                <p className="mo-sub">Choose settings for this task. Your Auto defaults stay the same.</p>
                <div className="mo-task" data-ref="mo-task" />
                <div className="mo-box">
                  <div className="lbl">▾ Agent and workspace</div>
                  <div className="mo-agents" data-ref="mo-agents" role="group" aria-label="Agent" />
                  <div className="mo-grid">
                    <div className="mo-f"><span>Model</span><div className="mo-sel" data-ref="mo-model" /></div>
                    <div className="mo-f"><span>Reasoning</span><div className="mo-sel" data-ref="mo-reason" /></div>
                    <div className="mo-f mo-wide"><span>Permissions</span><div className="mo-sel"><span><svg className="i" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>Ask for approval</span></div></div>
                  </div>
                  <div className="mo-ws"><div className="sel">◉ Git worktree<small>Separate working copy</small></div><div>○ Project folder<small>Use the existing folder</small></div></div>
                </div>
              </div>
              <div className="mo-foot"><button type="button" className="mo-btn" data-ref="mo-cancel">Cancel</button><button type="button" className="mo-btn primary" data-ref="mo-queue">Queue task</button></div>
            </div>
          </div>
          {/* Screen 2: Agents */}
          <div className="scr off" data-ref="scr-agents">
            <header className="app-top">
              <div className="traffic"><i /><i /><i /></div>
              <span className="app-logo"><img src="/isotipo.png" alt="" /></span>
              <nav className="app-nav">
                <button type="button" data-ref="to-board" className="on" aria-label="Open Kanban" style={{ background: 'none', border: 0, padding: 4, color: 'inherit' }}><svg className="i" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg></button>
                <svg className="i" viewBox="0 0 24 24" style={{ marginTop: 4 }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8M8 12h8" /></svg>
                <svg className="i" viewBox="0 0 24 24" style={{ marginTop: 4 }}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></svg>
              </nav>
              <span className="sp" />
              <div className="top-ctl" aria-hidden="true">
                <span className="new-agent"><svg className="i" viewBox="0 0 24 24"><path d="m4 17 6-5-6-5M12 19h8" /></svg>NEW AGENT</span>
                <span className="top-avatar" />
              </div>
            </header>
            <div className="app-main">
              <aside className="app-side" data-ref="side">
                <div className="side-h"><svg className="i" viewBox="0 0 24 24"><path d="M3 16l4 4 4-4M7 20V4M13 8l4-4 4 4M17 4v16" /></svg>AGENTS<span className="count" data-ref="count">0</span><span className="sp" /></div>
              </aside>
              <section className="app-chat">
                <div className="logs" data-ref="logs" />
                <div className="tray worker" data-ref="tray">
                  <div className="tray-t"><span className="tb" /><span data-ref="tray-title" /></div>
                  <div className="tray-a" data-ref="tray-act" />
                </div>
                <div className="composer">
                  <div className="c-input" data-ref="input" data-ph="Message Codex..." />
                  <div className="c-bar">
                    <svg className="i" viewBox="0 0 24 24"><path d="m21.4 11-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l8.5-8.5a3.7 3.7 0 0 1 5.2 5.2l-8.5 8.5a1.8 1.8 0 0 1-2.6-2.6l7.8-7.8" /></svg>
                    <span className="c-model"><img data-ref="model-ico" src="/icons/apps/codex-icon.svg" alt="" /><span data-ref="model">GPT-5.5</span><svg className="i" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></span>
                    <span className="c-chip opt" data-ref="reason">high</span>
                    <span className="c-chip opt"><svg className="i" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>Ask for approval</span>
                    <span className="sp" />
                    <span className="c-send busy" data-ref="send"><svg className="i arrow" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg><i className="stop" /></span>
                  </div>
                </div>
                <div className="c-foot" aria-hidden="true">
                  <svg className="i" viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                  <span className="sp" />
                  <span className="branch" data-ref="branch"><svg className="i" viewBox="0 0 24 24"><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="8" r="2" /><path d="M6 8v8M18 10c0 4-6 3-10 6" /></svg><span /></span>
                </div>
              </section>
            </div>
          </div>
          <div className="cursor" data-ref="cursor" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 3l14 8-6.5 1.5L9 19z" fill="#fff" stroke="#000" strokeWidth="1.4" strokeLinejoin="round" /></svg></div>
        </div>
      </div>
    </div>
  )
}
