'use client'

// "04 Budget" demo: one usage line per agent climbing toward its own daily cap
// across a scripted day. Claude hits its cap, Grok hits its cap and takes +5%.
// Product UI text stays in English.

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import './release240-demos.css'
import { AG, Cancel, ICON, createRuntime, ico, ignoreCancel, reduced, type AgentKey } from './demo-helpers'

// Smooth usage: a steady base plus a gaussian burst of work, so curves bend instead of jumping.
const burst = (h: number, at: number, amp: number, w: number) => amp * Math.exp(-((h - at) ** 2) / (2 * w * w))
type Prov = { k: AgentKey; col: string; cap: number; left: string; rate: (h: number) => number }
const BPROV: Prov[] = [
  { k: 'claude', col: '#f97316', cap: 32, left: '64% left · resets in 2d', rate: h => .8 + burst(h, 11, 8, 1.4) },
  { k: 'codex', col: '#34d399', cap: 17, left: '85% left · resets in 5d', rate: h => .5 + burst(h, 10, .6, 1) },
  { k: 'grok', col: '#f472b6', cap: 13, left: '76% left · resets in 6d', rate: h => .25 + burst(h, 15, 3.6, 1.2) },
]
const BNAME: Partial<Record<AgentKey, string>> = { claude: 'Claude', codex: 'Codex', grok: 'Grok' }
const H = 220, PAD = { l: 34, r: 44, t: 14, b: 22 }, YMAX = 38

export default function DailyBudgetDemo() {
  const t = useTranslations('release240.demo')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const rt = createRuntime(root)
    const { $, sleep, begin } = rt
    const ref = (k: string) => $(`[data-ref="${k}"]`)
    const svg = ref('chart'), playBtn = ref('play'), time = ref('time') as HTMLInputElement
    const ban = ref('banner'), msg = ref('msg'), extraBtn = ref('extra')

    let bT = 8, bExtra: Record<string, number> = {}, bPlaying = false, bRaf = 0, bBannerProv: AgentKey | null = null
    let W = 440
    const X = (h: number) => PAD.l + (h - 8) / 14 * (W - PAD.l - PAD.r)
    const Y = (v: number) => H - PAD.b - v / YMAX * (H - PAD.t - PAD.b)
    const capAt = (p: Prov, h: number) => p.cap + (bExtra[p.k] !== undefined && h >= bExtra[p.k] ? 5 : 0)
    function simulate() {
      return BPROV.map(p => {
        const pts: [number, number][] = []; let u = 0, hitAt: number | null = null
        for (let h = 8; h <= 22.0001; h += .05) {
          const cap = capAt(p, h)
          if (u >= cap - 1e-6 && hitAt === null && bExtra[p.k] === undefined) hitAt = h
          if (u < cap) u = Math.min(cap, u + p.rate(h) * .05)
          pts.push([h, u])
        }
        return { p, pts, hitAt }
      })
    }
    // The banner keeps a fixed size; only its colour, text and the reserved +5% button change.
    let bKind: string | null = null
    function setBanner(cls: string, kind: string, text: string, showExtra: boolean) {
      extraBtn.classList.toggle('show', showExtra); extraBtn.tabIndex = showExtra ? 0 : -1
      if (kind === bKind) { if (msg.textContent !== text) msg.textContent = text; return }
      const first = bKind === null
      bKind = kind
      ban.className = `banner ${cls}`
      msg.textContent = text
      if (!first && !reduced()) msg.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.22,.8,.2,1)' })
    }
    function drawBudget() {
      W = Math.round(svg.getBoundingClientRect().width) || 440
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
      const now = simulate().map(s => {
        const upto = s.pts.filter(q => q[0] <= bT + 1e-6)
        const used = upto.length ? upto[upto.length - 1][1] : 0, cap = capAt(s.p, bT)
        return { ...s, upto, used, cap, atCap: used >= cap - .05 }
      })
      const ticks = [8, 11, 14, 17, 20, 22]
      let lines = '', caps = '', heads = ''
      const lbl = now.map(n => ({ n, y: Y(n.cap) + 3 })).sort((a, b) => a.y - b.y)
      for (let i = 1; i < lbl.length; i++) if (lbl[i].y - lbl[i - 1].y < 11) lbl[i].y = lbl[i - 1].y + 11
      lbl.forEach(({ n, y }) => { caps += `<text class="pcap-lbl" fill="${n.p.col}" x="${W - PAD.r + 6}" y="${y}">${n.cap}%</text>` })
      now.forEach(n => {
        const capY = Y(n.cap)
        caps += `<line class="pcap" stroke="${n.p.col}" x1="${PAD.l}" x2="${W - PAD.r}" y1="${capY}" y2="${capY}"/>`
        const d = n.upto.map((q, i) => `${i ? 'L' : 'M'}${X(q[0]).toFixed(1)} ${Y(q[1]).toFixed(1)}`).join(' ')
        lines += `<path class="pline${n.atCap ? ' at' : ''}" stroke="${n.p.col}" d="${d}"/>`
      })
      // The LLM icon sits right on the head of its own line.
      const hx = X(bT)
      now.forEach(n => {
        const c = n.atCap ? '#ef4444' : n.p.col
        heads += `<g class="phead${n.atCap ? ' at' : ''}" transform="translate(${hx} ${Y(n.used)})">
          <circle r="9" fill="#0b0b0b" stroke="${c}" stroke-width="2"/>
          <image href="${ICON + AG[n.p.k].icon}" x="-5.5" y="-5.5" width="11" height="11"/></g>`
      })
      svg.innerHTML = `
        <g class="grid">${[10, 20, 30].map(v => `<line x1="${PAD.l}" x2="${W - PAD.r}" y1="${Y(v)}" y2="${Y(v)}"/>`).join('')}</g>
        <g class="axis">${ticks.map(h => `<text x="${X(h)}" y="${H - 6}" text-anchor="middle">${String(h).padStart(2, '0')}:00</text>`).join('')}
          ${[0, 10, 20, 30].map(v => `<text x="${PAD.l - 6}" y="${Y(v) + 3}" text-anchor="end">${v}%</text>`).join('')}</g>
        ${caps}
        <line class="now" x1="${X(bT)}" x2="${X(bT)}" y1="${PAD.t}" y2="${Y(0)}"/>
        ${lines}${heads}`
      const hh = Math.floor(bT), mm = Math.round((bT - hh) * 60) % 60
      ref('clock').textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
      time.value = String(bT)
      // Banner: the latest agent paused at its cap wins; a fresh +5% shows its confirmation first.
      const recentExtra = Object.entries(bExtra).filter(([, t]) => bT >= t && bT - t < 1.3).sort((a, b) => b[1] - a[1])[0]
      const paused = now.filter(n => n.atCap && bExtra[n.p.k] === undefined).sort((a, b) => (b.hitAt ?? 0) - (a.hitAt ?? 0))
      const close = now.filter(n => !n.atCap && n.used / n.cap > .8).sort((a, b) => b.used / b.cap - a.used / a.cap)[0]
      bBannerProv = null
      if (recentExtra) setBanner('ok', 'extra-' + recentExtra[0], `${BNAME[recentExtra[0] as AgentKey]} gets 5% more today and picks up where it stopped.`, false)
      else if (paused.length) { bBannerProv = paused[0].p.k; setBanner('hit', 'hit-' + bBannerProv, `${BNAME[bBannerProv]} hit today’s budget. New work waits until tomorrow.`, true) }
      else if (close) setBanner('warn', 'close-' + close.p.k, `${BNAME[close.p.k]} has ${Math.max(1, Math.round(close.cap - close.used))}% left today.`, false)
      else setBanner('ok', 'ok', 'Every agent is on pace today.', false)
      ref('provs').innerHTML = now.map(n => {
        const { p } = n, used = Math.round(n.used)
        return `<div class="prov${n.atCap ? ' at' : ''}" style="--pc:${p.col}">${ico(p.k)}<strong>${BNAME[p.k]}</strong><span class="tog on"></span>
          <small>${used}% of ${n.cap}%${bExtra[p.k] !== undefined && bT >= bExtra[p.k] ? ' · +5% today' : ''} · ${p.left}</small>
          <span class="pbar"><i style="width:${Math.min(100, n.used / n.cap * 100)}%"></i></span></div>`
      }).join('')
    }
    function stopDay() { bPlaying = false; rt.cancelFrame(bRaf); playBtn.textContent = '▶' }
    function playDay() {
      stopDay(); bPlaying = true; playBtn.textContent = '❚❚'
      let last = performance.now()
      const step = (now: number) => {
        if (!bPlaying) return
        bT = Math.min(22, bT + (reduced() ? 22 : (now - last) / 1000 * 1.2)); last = now
        drawBudget()
        if (bT >= 22) return stopDay()
        bRaf = rt.frame(step)
      }
      bRaf = rt.frame(step)
    }
    function runDay(K: string, gen: number, done: () => boolean) {
      stopDay(); bPlaying = true; playBtn.textContent = '❚❚'
      return new Promise<void>((res, rej) => {
        let last = performance.now()
        const step = (now: number) => {
          if (!rt.alive(K, gen)) { stopDay(); return rej(new Cancel()) }
          bT = Math.min(22, bT + (reduced() ? 22 : (now - last) / 1000 * 1.2)); last = now
          drawBudget()
          if (done() || bT >= 22) { stopDay(); return res() }
          bRaf = rt.frame(step)
        }
        bRaf = rt.frame(step)
      })
    }
    const grokHit = () => simulate().find(s => s.p.k === 'grok')!.hitAt
    async function replayBudget() {
      const K = 'budget', gen = begin(K)
      try {
        bT = 8; bExtra = {}; bKind = null; drawBudget()
        await sleep(K, gen, 700)
        await runDay(K, gen, () => { const g = grokHit(); return g !== null && bT >= g + .35 })
        await sleep(K, gen, 1600)
        extraBtn.classList.add('press'); await sleep(K, gen, 160); extraBtn.classList.remove('press')
        bExtra.grok = bT; drawBudget()
        await sleep(K, gen, 600)
        await runDay(K, gen, () => false)
        await sleep(K, gen, 4500)
        if (!reduced()) replayBudget()
      } catch (e) { ignoreCancel(e) }
    }
    const bTakeOver = () => begin('budget')
    rt.on(extraBtn, 'click', () => { if (!bBannerProv) return; bTakeOver(); bExtra[bBannerProv] = bT; drawBudget(); if (!bPlaying && bT < 22) playDay() })
    rt.on(time, 'input', () => { bTakeOver(); stopDay(); bT = +time.value; Object.keys(bExtra).forEach(k => { if (bT < bExtra[k]) delete bExtra[k] }); drawBudget() })
    rt.on(playBtn, 'click', () => { bTakeOver(); if (bPlaying) stopDay(); else { if (bT >= 22) { bT = 8; bExtra = {} } playDay() } })
    rt.on(ref('replay'), 'click', () => { replayBudget() })
    let rz = 0
    rt.on(window, 'resize', () => { window.clearTimeout(rz); rz = rt.later(drawBudget, 80) })

    drawBudget()
    rt.startWhenVisible(ref('stage'), () => { replayBudget() })
    return () => rt.destroy()
  }, [])

  return (
    <div className="r240" ref={rootRef}>
      <div className="stage-wrap">
        <div className="stage" data-ref="stage">
          <div className="stage-bar">
            <div className="dots"><i /><i /><i /></div>
            <span className="lbl">Settings › Providers</span>
            <span className="sp" />
            <button type="button" className="icon-btn" data-ref="replay" aria-label="Replay the budget demo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>{t('replay')}
            </button>
          </div>
          <div className="bud-body">
            <div className="chart-pane">
              <div className="readout">
                <span className="rt">Usage today</span>
                <span className="auto">SMART PACE</span>
                <span className="clock" data-ref="clock">08:00</span>
              </div>
              <svg className="chart" data-ref="chart" viewBox="0 0 440 200" role="img" aria-label="Usage across the day against the daily budget" />
              <div className="scrub">
                <button type="button" className="icon-btn" data-ref="play" aria-label="Play the day">▶</button>
                <input type="range" data-ref="time" min="8" max="22" step="0.05" defaultValue="8" aria-label="Time of day" />
              </div>
              <div className="banner ok" data-ref="banner" aria-live="polite"><span className="b-msg" data-ref="msg">On pace.</span><button type="button" className="b-extra" data-ref="extra" tabIndex={-1}>+5% today</button></div>
            </div>
            <div className="prov-pane" data-ref="provs" />
          </div>
        </div>
      </div>
    </div>
  )
}
