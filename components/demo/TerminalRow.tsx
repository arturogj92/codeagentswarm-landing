'use client'

import { motion } from 'framer-motion'
import { STATUSES } from './statuses'
import type { AgentKey, DemoTerminal } from './types'

/**
 * One row of the terminal list.
 *
 * The class names are not a coincidence: they are the app's own, and the styles
 * come from demo-app.css, extracted straight out of the product. Keep this markup
 * in step with createTerminalTab() in the app's renderer.js when the row changes.
 */

const AGENT_ICON: Record<AgentKey, { src: string; label: string }> = {
  claude: { src: '/icons/apps/claude-icon.svg', label: 'Claude Code' },
  codex: { src: '/icons/apps/codex-icon.svg', label: 'Codex CLI' },
  antigravity: { src: '/icons/apps/antigravity-icon.png', label: 'Antigravity CLI' },
  opencode: { src: '/icons/apps/opencode-icon.svg', label: 'opencode' },
  kimi: { src: '/icons/apps/kimi-icon.png', label: 'Kimi Code' },
}

interface Props {
  terminal: DemoTerminal
  /** Rows only slide between status groups in the vertical list. */
  animate: boolean
  active: boolean
  onSelect: (id: number) => void
  onClose: (id: number) => void
}

/** Up to three letters, the way the app labels a collapsed row. */
function compactLabel(projectName: string) {
  return projectName.slice(0, 3).toUpperCase()
}

export default function TerminalRow({ terminal, animate, active, onSelect, onClose }: Props) {
  const status = STATUSES[terminal.status]
  const agent = AGENT_ICON[terminal.agent]

  return (
    <motion.div
      // layout is what makes a row SLIDE to its new group when its status changes,
      // instead of teleporting. It is the whole reason the list feels alive.
      layout={animate}
      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      className={[
        'terminal-tab',
        active ? 'active' : '',
        terminal.notified ? 'tab-has-notification' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-terminal-id={terminal.id - 1}
      data-status-key={terminal.status}
      onClick={() => onSelect(terminal.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(terminal.id)
        }
      }}
      aria-label={`${terminal.title}, ${status.label}`}
    >
      <div className="terminal-tab-content">
        <span
          className={`tab-status-bar${terminal.status === 'working' ? ' is-working' : ''}`}
          style={{ ['--status-color' as string]: status.color }}
          title={status.label}
        />
        {/* All that survives once the list is collapsed: the project's initials.
            Same rule as the app's getTerminalTabCompactLabel. */}
        <span className="tab-collapsed-label">{compactLabel(terminal.project.name)}</span>
        {/* badge-custom-icon: no colour disc, just the project's own mark. */}
        <span className="project-badge badge-small badge-custom-icon" title={terminal.project.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={terminal.project.icon} alt="" aria-hidden="true" />
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="terminal-tab-agent-icon"
          src={agent.src}
          width={14}
          height={14}
          alt={agent.label}
          title={agent.label}
          style={{ marginRight: 6, borderRadius: 3, opacity: 0.8 }}
        />
        <span className="tab-copy">
          <span className="tab-title">{terminal.title}</span>
          <span className="tab-meta">{terminal.project.name}</span>
          <span className="tab-goal">
            <svg
              className="tab-goal-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span className="tab-goal-tag">Goal</span>
            <span className="tab-goal-text">{terminal.goal}</span>
          </span>
          <span className="tab-activity">{terminal.activity}</span>
        </span>
      </div>
      <span className="tab-elapsed">{terminal.elapsed}</span>
      <button
        className="tab-close-btn"
        aria-label={`Close ${terminal.title}`}
        onClick={(e) => {
          e.stopPropagation()
          onClose(terminal.id)
        }}
      >
        ×
      </button>
    </motion.div>
  )
}
