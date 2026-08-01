'use client'

import { useState } from 'react'
import type { AgentKey } from './types'

/**
 * The navbar quota indicator: one depleting ring per agent, and the per-provider
 * breakdown that opens on hover.
 *
 * Class names and structure mirror the app's renderQuota(), so the styles pulled
 * into demo-app.css land where they should. The numbers are made up but shaped
 * like real readings, including one provider that is nearly out, because a panel
 * where everything sits at a comfortable 20% says nothing about why it exists.
 */

const ICON: Record<AgentKey, string> = {
  claude: '/icons/apps/claude-icon.svg',
  codex: '/icons/apps/codex-icon.svg',
  antigravity: '/icons/apps/antigravity-icon.png',
  opencode: '/icons/apps/opencode-icon.svg',
  kimi: '/icons/apps/kimi-icon.png',
}

interface Window {
  name: string
  pct: number
  reset: string
  critical?: boolean
}

interface Provider {
  agent: AgentKey
  label: string
  plan: string
  /** Rings are only drawn for agents with a usage cap. */
  ring?: number
  windows?: Window[]
  /** Shown instead of bars, for providers that have no quota to report. */
  note?: string
}

const PROVIDERS: Provider[] = [
  {
    agent: 'claude',
    label: 'Claude',
    plan: 'Max 20x',
    ring: 0.67,
    windows: [
      { name: '5-hour window · used', pct: 67, reset: 'resets in 19m' },
      { name: 'Weekly · used', pct: 67, reset: 'resets in 3d 14h' },
      { name: 'Weekly · Fable · used', pct: 82, reset: 'resets in 3d 14h' },
    ],
  },
  {
    agent: 'codex',
    label: 'Codex',
    plan: 'Plus',
    ring: 0.98,
    windows: [{ name: 'Weekly · used', pct: 98, reset: 'almost out · resets in 21h 23m', critical: true }],
  },
  {
    agent: 'kimi',
    label: 'Kimi Code',
    plan: '',
    ring: 0.17,
    windows: [
      { name: '5-hour window · used', pct: 0, reset: 'resets in 14m' },
      { name: 'Weekly · used', pct: 17, reset: 'resets in 3d 19h' },
    ],
  },
  {
    agent: 'antigravity',
    label: 'Antigravity',
    plan: '',
    ring: 0.04,
    windows: [
      { name: 'Weekly · used', pct: 0, reset: 'resets in 2d 1h' },
      { name: '5-hour window · used', pct: 0, reset: 'resets in 3h 31m' },
    ],
  },
  {
    agent: 'opencode',
    label: 'opencode',
    plan: 'no quota',
    note: 'Pay-as-you-go / free models. Latest session: $0.00 · 47K tokens',
  },
]

const RADIUS = 15
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * A ring never renders completely empty: a 0%-used arc reads as "no ring at all"
 * rather than "nothing used yet", so a sliver always shows. Same rule as the app.
 */
const MIN_ARC = 0.06

function Ring({ agent, used }: { agent: AgentKey; used: number }) {
  const offset = CIRCUMFERENCE * (1 - Math.max(used, MIN_ARC))
  return (
    <div className="quota-ring">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r={RADIUS} fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="2.5" />
        <circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke={used >= 0.9 ? '#d97706' : '#fbbf24'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE.toFixed(2)}
          strokeDashoffset={offset.toFixed(2)}
        />
      </svg>
      <span className="quota-tile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ICON[agent]} alt="" aria-hidden="true" />
      </span>
    </div>
  )
}

export default function QuotaCluster() {
  // The app opens this panel by toggling a class from JS rather than with :hover,
  // so the popover can stay up while the pointer travels across the gap to it.
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`quota-cluster${open ? ' quota-cluster--open' : ''}`}
      tabIndex={0}
      role="button"
      aria-label="Quota per provider"
      aria-expanded={open}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* Only the busiest agent gets a ring in the bar; the rest live in the panel. */}
      <Ring agent="claude" used={0.67} />

      <div className="quota-popover">
        <div className="quota-pop-head">
          <span className="quota-pop-title">Quota per provider</span>
        </div>

        {PROVIDERS.map((provider) => (
          <div key={provider.agent} className={`quota-prov${provider.note ? ' quota-prov--nq' : ''}`}>
            <div className="quota-prov-top">
              <span className="quota-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ICON[provider.agent]} alt="" aria-hidden="true" />
              </span>
              <span className="quota-prov-name">{provider.label}</span>
              {provider.plan && <span className="quota-plan">{provider.plan}</span>}
            </div>

            {provider.note && <div className="quota-nqline">{provider.note}</div>}

            {provider.windows?.map((win) => (
              <div key={win.name} className={`quota-win${win.critical ? ' quota-win--crit' : ''}`}>
                <div className="quota-win-row">
                  <span className="quota-win-name">{win.name}</span>
                  <span className="quota-win-val">{win.pct}%</span>
                </div>
                <div className="quota-win-track">
                  <div className="quota-win-fill" style={{ width: `${win.pct}%` }} />
                </div>
                <div className="quota-win-reset">{win.reset}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
