'use client'

// "01 Coordinators" demo: a fake CodeAgentSwarm window where a coordinator plans,
// opens worker sessions and reports back. Product UI text stays in English.

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import './release240-demos.css'
import { AG, CHECK, ICON, ORCH, PH, PULSE, createRuntime, ignoreCancel, reduced, type AgentKey, type Seg } from './demo-helpers'

type Worker = { a: AgentKey; t: string; p: string; f: number; d: number; assign: string; first: Seg[]; steps: [string, string]; done: string }
type Goal = { prompt: string; plan: Seg[]; workers: Worker[]; summary: Seg[]; report: Seg[] }

const CPROJ: Record<string, [string, string]> = {
  'api-server': ['A', '#22c55e'], 'mobile-app': ['M', '#ef4444'], 'landing-site': ['L', '#3b82f6'],
  'web-app': ['W', '#a855f7'], 'e2e-suite': ['E', '#14b8a6'], 'desktop-app': ['D', '#ec4899'],
}

const CG: Record<string, Goal> = {
  pricing: {
    prompt: 'Ship the pricing page: landing hero, a /pricing API endpoint and the mobile paywall.',
    plan: [['Three independent pieces. I will open one worker per project and keep coordinating from here.']],
    workers: [
      { a: 'claude', t: 'Pricing endpoint', p: 'api-server', f: 3000, d: 9500,
        assign: 'Add a GET /pricing endpoint that returns the three plans with monthly and yearly prices.',
        first: [['Adding '], ['c', 'GET /pricing'], [' in '], ['c', 'src/routes/pricing.ts'], [' with the Free, Pro and Team plans. Writing the route tests next.']],
        steps: ['Adding the pricing endpoint', 'Writing the route tests'], done: 'Endpoint live with 6 route tests passing' },
      { a: 'codex', t: 'Mobile paywall', p: 'mobile-app', f: 1500, d: 11500,
        assign: 'Build the mobile paywall with a monthly and yearly toggle. Read prices from GET /pricing.',
        first: [['Building the paywall in '], ['c', 'PaywallScreen.tsx'], ['. The yearly toggle goes in once the layout is done.']],
        steps: ['Building the paywall screen', 'Adding the yearly toggle'], done: 'Paywall ready on iOS and Android' },
      { a: 'kimi', t: 'Pricing hero copy', p: 'landing-site', f: 1800, d: 7500,
        assign: 'Rewrite the pricing hero so the yearly plan and its discount stand out.',
        first: [['Rewriting the landing hero. Three headline options first, then the annual badge.']],
        steps: ['Rewriting the landing hero', 'Adding the annual badge'], done: 'New hero copy ready for review' },
    ],
    summary: [['Three workers are running in the background: '], ['b', 'Pricing endpoint'], [', '], ['b', 'Mobile paywall'], [' and '], ['b', 'Pricing hero copy'], ['. Ask me for a status update whenever you like.']],
    report: [['All three are done. '], ['b', 'Pricing endpoint'], [' returns monthly and yearly prices with its tests passing, '], ['b', 'Mobile paywall'], [' has the yearly toggle on iOS and Android, and the new '], ['b', 'hero copy'], [' is ready for your review.']],
  },
  checkout: {
    prompt: 'Customers report three checkout bugs. Find them, fix them and add tests.',
    plan: [['Two fixes and a test pass. Each one gets its own worker so they do not step on each other.']],
    workers: [
      { a: 'claude', t: 'Double charge on retry', p: 'api-server', f: 3000, d: 10000,
        assign: 'Customers get charged twice when a payment retries. Find the cause and fix it.',
        first: [['The retry path creates a second intent. Adding an '], ['c', 'idempotencyKey'], [' to '], ['c', 'createPayment()'], [' so a retry reuses the first one.']],
        steps: ['Tracing the retry path', 'Adding an idempotency key'], done: 'No more double charges' },
      { a: 'opencode', t: 'Coupon field resets', p: 'web-app', f: 1600, d: 7800,
        assign: 'The coupon field clears when the address changes. Keep it.',
        first: [['The form remounts when the address changes. Moving the coupon into '], ['c', 'useCheckoutForm'], [' so it survives.']],
        steps: ['Reproducing the reset', 'Keeping the coupon in form state'], done: 'Coupon stays put, test added' },
      { a: 'grok', t: 'Checkout e2e tests', p: 'e2e-suite', f: 1900, d: 11500,
        assign: 'Add end-to-end tests for retries and coupons in checkout.',
        first: [['Writing '], ['c', 'checkout-retry.spec.ts'], [' and '], ['c', 'checkout-coupon.spec.ts'], [' against staging.']],
        steps: ['Writing the retry scenario', 'Writing the coupon scenario'], done: '14 checkout tests passing' },
    ],
    summary: [['Three workers on it: '], ['b', 'Double charge on retry'], [', '], ['b', 'Coupon field resets'], [' and '], ['b', 'Checkout e2e tests'], ['. I will tell you when they are all green.']],
    report: [['All three checkout bugs are handled. Retries reuse the first payment, the coupon survives address changes, and '], ['b', '14 new end-to-end tests'], [' guard both paths.']],
  },
  release: {
    prompt: 'Get release 2.5 ready: changelog, version bump with a signed build, and fresh screenshots.',
    plan: [['Three separate jobs. The changelog and the screenshots can run while the build does.']],
    workers: [
      { a: 'claude', t: 'Version bump and build', p: 'desktop-app', f: 3000, d: 11500,
        assign: 'Bump to 2.5.0 and run the signed release build.',
        first: [['Bumping '], ['c', 'package.json'], [' to '], ['c', '2.5.0'], [' and starting the signed build.']],
        steps: ['Bumping to 2.5.0', 'Running the signed build'], done: 'Signed build ready' },
      { a: 'codex', t: 'Changelog draft', p: 'desktop-app', f: 1500, d: 8000,
        assign: 'Draft the 2.5 changelog from the commits since 2.4, grouped by feature.',
        first: [['Reading 212 commits since '], ['c', 'v2.4.0'], ['. Grouping them by feature before writing.']],
        steps: ['Reading the commits since 2.4', 'Writing the changelog'], done: 'Changelog drafted' },
      { a: 'cursor', t: 'Release screenshots', p: 'landing-site', f: 1900, d: 9500,
        assign: 'Capture the new 2.5 screens and update the landing images.',
        first: [['Capturing the four new screens at 2x, then swapping the landing images.']],
        steps: ['Capturing the new screens', 'Updating the landing images'], done: 'Screenshots in place' },
    ],
    summary: [['Three workers started: '], ['b', 'Version bump and build'], [', '], ['b', 'Changelog draft'], [' and '], ['b', 'Release screenshots'], ['.']],
    report: [['Release 2.5 is ready to ship. The changelog is drafted, '], ['b', '2.5.0'], [' has a signed build, and the landing has the new screenshots.']],
  },
}

const GOALS: [string, string][] = [['pricing', 'Ship the pricing page'], ['checkout', 'Fix the checkout bugs'], ['release', 'Prepare release 2.5']]

type Work = { id: number; finish(): void }
type Sess = { row: HTMLElement; log: HTMLElement; title: string; agent: AgentKey; act: string; busy: boolean; w?: Worker; rw?: HTMLElement; work?: Work }
type Scene = {
  sess: Record<string, Sess>; active: string; timers: number[]; userDrove: boolean; pendingReport: null | (() => void)
  done: number; clock(): string; tick(): void; gh: Record<'coord' | 'work' | 'done', HTMLElement>
}

export default function CoordinatorsDemo() {
  const t = useTranslations('release240.demo')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const rt = createRuntime(root)
    const { $, $$, el, sleep, begin } = rt
    const ref = (k: string) => $(`[data-ref="${k}"]`)
    const aApp = ref('app'), aSide = ref('side'), aLogs = ref('logs'), aCursor = ref('cursor')
    const aTray = ref('tray'), aTrayTitle = ref('tray-title'), aTrayAct = ref('tray-act'), aInput = ref('input')
    const aModelIco = ref('model-ico') as HTMLImageElement, aModel = ref('model'), aSend = ref('send'), aCount = ref('count')
    let goalKey = 'pricing'
    let S = undefined as unknown as Scene

    const live = (log: HTMLElement) => log.classList.contains('on') && !reduced()
    const logAppend = (log: HTMLElement, node: HTMLElement) => rt.logAppend(log, node, live(log))
    const stream = (K: string, gen: number, log: HTMLElement, segs: Seg[]) =>
      rt.stream(K, gen, log, segs, { clock: S.clock(), isLive: () => live(log), delay: 42 })
    const addWork = (log: HTMLElement) => { const w = rt.addWork(log, S.clock(), live(log)); S.timers.push(w.id); return w }

    function setSendState(state: 'ready' | 'busy' | 'idle') { aSend.classList.toggle('ready', state === 'ready'); aSend.classList.toggle('busy', state === 'busy') }
    function setActivity(id: string, html: string) {
      const ss = S.sess[id]; ss.act = html
      if (ss.row && id !== 'coord') rt.swapText($('.ta', ss.row), html)
      if (S.active === id) rt.swapText(aTrayAct, html)
    }
    function renderTray(id: string) {
      const ss = S.sess[id]
      aTray.classList.toggle('worker', id !== 'coord')
      aTrayTitle.textContent = ss.title
      rt.swapText(aTrayAct, ss.act || '')
      aInput.dataset.ph = `Message ${PH[ss.agent] || AG[ss.agent].name}...`
      aModelIco.src = ICON + AG[ss.agent].icon
      aModel.textContent = AG[ss.agent].model || AG[ss.agent].short
      setSendState(ss.busy ? 'busy' : 'idle')
    }
    function selectRow(id: string) {
      if (!S || !S.sess[id] || S.active === id) return
      S.active = id
      rt.revealIn(aSide, S.sess[id].row)
      Object.entries(S.sess).forEach(([k, ss]) => { ss.row.classList.toggle('active', k === id); ss.log.classList.toggle('on', k === id) })
      renderTray(id)
      if (id === 'coord') { S.sess.coord.row.classList.remove('reply'); if (S.pendingReport) S.pendingReport() }
    }
    function bumpCount(n: number) { aCount.textContent = String(n); aCount.classList.add('bump'); rt.later(() => aCount.classList.remove('bump'), 700) }
    const sideFlip = (mutate: () => void) => rt.flipItems(rt.$$('.rw', aSide), mutate, 650)

    function buildScene(G: Goal) {
      (S?.timers || []).forEach(rt.stopEvery)
      let minute = 13
      S = {
        sess: {}, active: 'coord', timers: [], userDrove: false, pendingReport: null, done: 0,
        clock: () => `14:${String(minute).padStart(2, '0')}`, tick: () => { minute++ },
        gh: { coord: rt.groupHeader('COORDINATORS'), work: rt.groupHeader('WORKING'), done: rt.groupHeader('DONE') },
      }
      Array.from(aSide.children).forEach(c => { if (!c.classList.contains('side-h')) c.remove() })
      aLogs.innerHTML = ''
      aCount.textContent = '1'
      $('.n', S.gh.coord).textContent = '1'
      const coordRow = el(`<div class="rw row-w in"><div><div class="row coord active" data-id="coord" tabindex="0" role="button" aria-label="Open Global coordinator">
        <span class="reply-lbl">REPLY</span><svg class="i orb" viewBox="0 0 24 24">${ORCH}</svg><span class="ai"><img src="${ICON}claude-icon.svg" alt=""></span>
        <span class="tx"><span class="tt">Global coordinator</span><span class="sub">Across projects</span></span></div></div></div>`)
      S.gh.coord.classList.add('in')
      aSide.append(S.gh.coord, coordRow, S.gh.work, S.gh.done)
      const coordLog = el('<div class="log on" data-id="coord"></div>'); aLogs.appendChild(coordLog)
      S.sess.coord = { row: $('.row', coordRow), log: coordLog, title: 'Global coordinator', agent: 'claude', act: 'Waiting for your goal', busy: false }
      G.workers.forEach((w, i) => {
        const id = 'w' + i, [L, C] = CPROJ[w.p]
        const log = el(`<div class="log" data-id="${id}"></div>`); aLogs.appendChild(log)
        const rw = el(`<div class="rw row-w"><div><div class="row" data-id="${id}" data-state="starting" style="--pc:${C}" tabindex="0" role="button" aria-label="Open ${w.t}">
            <span class="sbar"></span><span class="av">${L}</span><span class="ai"><img src="${ICON + AG[w.a].icon}" alt=""></span>
            <span class="tx"><span class="tt">${w.t}</span><span class="ta"><span>${PULSE}<em>Starting ${AG[w.a].name}</em></span></span></span><span class="tm">now</span></div></div></div>`)
        S.sess[id] = { w, log, rw, row: $('.row', rw), title: w.t, agent: w.a, act: `${PULSE}<em>Starting ${AG[w.a].name}</em>`, busy: true }
      })
      aInput.textContent = ''; aInput.classList.remove('caret')
      renderTray('coord')
      rt.parkCursor(aCursor, aApp, .62, .55)
    }
    function setGroupCount(key: 'work' | 'done', n: number) {
      $('.n', S.gh[key]).textContent = String(n)
      if (n > 0 && !S.gh[key].classList.contains('in')) rt.openRw(S.gh[key], true)
      if (n === 0) S.gh[key].classList.remove('in')
    }
    async function cursorTo(K: string, gen: number, target: HTMLElement) {
      if (S.userDrove) return false
      if (rt.revealIn(aSide, target)) await sleep(K, gen, 450)
      const a = aApp.getBoundingClientRect(), r = target.getBoundingClientRect()
      aCursor.classList.add('show')
      aCursor.style.transform = `translate(${r.left - a.left + Math.min(r.width * .55, 150)}px, ${r.top - a.top + r.height * .55}px)`
      await sleep(K, gen, 1050)
      if (S.userDrove) return false
      rt.click(aCursor)
      await sleep(K, gen, 200)
      return true
    }
    const gLen = () => CG[goalKey].workers.length
    async function runWorker(K: string, gen: number, i: number) {
      const id = 'w' + i, ss = S.sess[id], w = ss.w!
      ss.row.dataset.state = 'working'
      setActivity(id, `${PULSE}<em>${w.steps[0]}</em>`)
      await sleep(K, gen, w.f)
      ss.work!.finish()
      await stream(K, gen, ss.log, w.first)
      ss.work = addWork(ss.log)
      await sleep(K, gen, w.d * .45)
      setActivity(id, `${PULSE}<em>${w.steps[1]}</em>`)
      await sleep(K, gen, w.d * .55)
      ss.work.finish()
      await stream(K, gen, ss.log, [['Done. '], [w.done + '.']])
      ss.busy = false; ss.row.dataset.state = 'done'
      if (S.active === id) setSendState('idle')
      setActivity(id, `${CHECK}<em>${w.done}</em>`)
      await sleep(K, gen, 500)
      S.done++
      sideFlip(() => { aSide.appendChild(ss.rw!); setGroupCount('work', gLen() - S.done); setGroupCount('done', S.done) })
    }

    async function playCoord() {
      const K = 'coord', gen = begin(K), G = CG[goalKey]
      $$('.chip[data-goal]').forEach(c => c.setAttribute('aria-pressed', String(c.dataset.goal === goalKey)))
      buildScene(G)
      const C = S.sess.coord, input = aInput
      try {
        await sleep(K, gen, 700)
        input.classList.add('caret')
        if (reduced()) input.textContent = G.prompt
        else for (const ch of G.prompt) { input.textContent += ch; setSendState('ready'); await sleep(K, gen, 24) }
        setSendState('ready')
        await sleep(K, gen, 450)
        aSend.classList.add('press'); await sleep(K, gen, 140); aSend.classList.remove('press')
        input.textContent = ''; input.classList.remove('caret')
        C.busy = true; setSendState('busy')
        logAppend(C.log, el(`<div class="m m-user"><div class="bubble">${G.prompt}</div><div class="ts">${S.clock()}</div></div>`))
        setActivity('coord', '<span class="spin" style="width:11px;height:11px"></span>Planning the work')
        await sleep(K, gen, 350)
        let work = addWork(C.log)
        await sleep(K, gen, 1300)
        work.finish()
        await stream(K, gen, C.log, G.plan)
        await sleep(K, gen, 350)
        work = addWork(C.log)
        setActivity('coord', `${PULSE}Opening worker sessions`)
        for (let i = 0; i < G.workers.length; i++) {
          await sleep(K, gen, i ? 650 : 400)
          const ss = S.sess['w' + i]
          sideFlip(() => { aSide.insertBefore(ss.rw!, S.gh.done); setGroupCount('work', i + 1) })
          rt.openRw(ss.rw!)
          bumpCount(i + 2)
          logAppend(ss.log, el(`<div class="m m-user"><div class="bubble assign"><div class="origin"><svg class="i" viewBox="0 0 24 24">${ORCH}</svg><span class="role">Coordinator</span><span>Global coordinator</span><span class="kind">ASSIGNMENT</span></div>${ss.w!.assign}</div><div class="ts">${S.clock()}</div></div>`))
          ss.work = addWork(ss.log)
        }
        await sleep(K, gen, 700)
        work.finish()
        await stream(K, gen, C.log, G.summary)
        C.busy = false; if (S.active === 'coord') setSendState('idle')
        setActivity('coord', `${PULSE}${G.workers.length} workers running`)
        S.tick()
        const runs = G.workers.map((_, i) => runWorker(K, gen, i))
        await sleep(K, gen, 900)
        if (await cursorTo(K, gen, S.sess.w0.row)) selectRow('w0')
        await Promise.all(runs)
        S.tick()
        setActivity('coord', `${CHECK}All ${G.workers.length} workers done`)
        await new Promise<void>((res, rej) => {
          const deliver = async () => {
            S.pendingReport = null
            try { const wk = addWork(C.log); await sleep(K, gen, 900); wk.finish(); await stream(K, gen, C.log, G.report); res() } catch (e) { rej(e) }
          }
          if (S.active === 'coord') deliver()
          else { S.pendingReport = deliver; C.row.classList.add('reply') }
          ;(async () => {
            try {
              await sleep(K, gen, 1100)
              if (S.pendingReport && await cursorTo(K, gen, C.row)) selectRow('coord')
            } catch { /* cancelled */ }
          })()
        })
        await sleep(K, gen, 600)
        aCursor.classList.remove('show')
        // Landing loop: move on to the next goal unless the visitor took over.
        await sleep(K, gen, 6500)
        if (!S.userDrove && !reduced()) {
          const keys = Object.keys(CG); goalKey = keys[(keys.indexOf(goalKey) + 1) % keys.length]; playCoord()
        }
      } catch (e) { ignoreCancel(e) }
    }

    $$('.chip[data-goal]').forEach(c => rt.on(c, 'click', () => { goalKey = c.dataset.goal!; playCoord() }))
    rt.on(ref('replay'), 'click', () => { playCoord() })
    const takeOver = (r: HTMLElement) => { S.userDrove = true; aCursor.classList.remove('show'); selectRow(r.dataset.id!) }
    rt.on(aSide, 'click', e => {
      const r = (e.target as HTMLElement).closest<HTMLElement>('.row'); if (!r || !S) return
      takeOver(r)
    })
    rt.on(aSide, 'keydown', e => {
      const k = (e as KeyboardEvent).key
      const r = (e.target as HTMLElement).closest<HTMLElement>('.row'); if (!r || !S || (k !== 'Enter' && k !== ' ')) return
      e.preventDefault(); takeOver(r)
    })
    rt.startWhenVisible(aApp, () => { playCoord() })
    return () => rt.destroy()
  }, [])

  return (
    <div className="r240" ref={rootRef}>
      <div className="stage-wrap">
        <div className="coord-try" role="group" aria-label="Pick a goal for the coordinator">
          <span className="seg-lbl">{t('tryGoal')}</span>
          {GOALS.map(([k, label]) => (
            <button key={k} type="button" className="chip" data-goal={k} aria-pressed={k === 'pricing'}>{t(`goals.${k}`)}</button>
          ))}
          <span className="sp" />
          <button type="button" className="icon-btn" data-ref="replay" aria-label="Replay the coordinator demo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>{t('replay')}
          </button>
        </div>
        <div className="app" data-ref="app" aria-label="CodeAgentSwarm window showing a coordinator at work">
          <header className="app-top">
            <div className="traffic"><i /><i /><i /></div>
            <span className="app-logo"><img src="/isotipo.png" alt="" /></span>
            <nav className="app-nav" aria-hidden="true">
              <svg className="i" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              <svg className="i" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8M8 12h8" /></svg>
              <svg className="i" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></svg>
              <svg className="i" viewBox="0 0 24 24"><rect x="3" y="3" width="13" height="13" rx="2" /><circle cx="17" cy="17" r="3" /><path d="m21 21-1.8-1.8" /></svg>
            </nav>
            <span className="sp" />
            <div className="top-ctl" aria-hidden="true">
              <span className="top-plus"><svg className="i" viewBox="0 0 24 24"><path d="M12 6v12M6 12h12" /></svg></span>
              <span className="top-view"><svg className="i" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg><svg className="i" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></span>
              <span className="new-agent"><svg className="i" viewBox="0 0 24 24"><path d="m4 17 6-5-6-5M12 19h8" /></svg>NEW AGENT</span>
              <span className="top-avatar" />
              <svg className="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></svg>
            </div>
          </header>
          <div className="app-main">
            <aside className="app-side" data-ref="side">
              <div className="side-h">
                <svg className="i" viewBox="0 0 24 24"><path d="M3 16l4 4 4-4M7 20V4M13 8l4-4 4 4M17 4v16" /></svg>AGENTS<span className="count" data-ref="count">1</span>
                <span className="sp" />
                <span className="tools"><svg className="i" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg><svg className="i" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg><svg className="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span>
              </div>
            </aside>
            <section className="app-chat">
              <div className="logs" data-ref="logs" />
              <div className="tray" data-ref="tray">
                <div className="tray-t"><span className="tb" /><svg className="i orch" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ORCH }} /><span data-ref="tray-title">Global coordinator</span></div>
                <div className="tray-a" data-ref="tray-act" />
              </div>
              <div className="composer">
                <div className="c-input" data-ref="input" data-ph="Message Claude Code..." />
                <div className="c-bar">
                  <svg className="i" viewBox="0 0 24 24"><path d="m21.4 11-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l8.5-8.5a3.7 3.7 0 0 1 5.2 5.2l-8.5 8.5a1.8 1.8 0 0 1-2.6-2.6l7.8-7.8" /></svg>
                  <span className="c-model"><img data-ref="model-ico" src="/icons/apps/claude-icon.svg" alt="" /><span data-ref="model">Opus 5.5</span><svg className="i" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></span>
                  <span className="c-chip opt">Build</span>
                  <span className="c-chip opt"><svg className="i" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>Manual<svg className="i" viewBox="0 0 24 24" style={{ width: 11, height: 11 }}><path d="m6 9 6 6 6-6" /></svg></span>
                  <span className="sp" />
                  <svg className="i" viewBox="0 0 24 24"><path d="M3 6h13M3 12h9M3 18h6" /><circle cx="17.5" cy="16.5" r="3.5" /><path d="M17.5 15v1.5l1 .7" /></svg>
                  <span className="c-send" data-ref="send"><svg className="i arrow" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg><i className="stop" /></span>
                </div>
              </div>
              <div className="c-foot" aria-hidden="true">
                <svg className="i" viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                <svg className="i" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></svg>
                <svg className="i" viewBox="0 0 24 24"><path d="m8 6-6 6 6 6M16 6l6 6-6 6" /></svg>
                <span className="sp" />
                <svg className="i" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                <svg className="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="8" cy="10" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16" cy="10" r="1" /></svg>
                <svg className="i" viewBox="0 0 24 24"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z" /><circle cx="12" cy="13" r="3" /></svg>
                <svg className="i" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
                <svg className="i" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" /></svg>
                <svg className="i" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </div>
            </section>
          </div>
          <div className="cursor" data-ref="cursor" aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 3l14 8-6.5 1.5L9 19z" fill="#fff" stroke="#000" strokeWidth="1.4" strokeLinejoin="round" /></svg></div>
        </div>
      </div>
    </div>
  )
}
