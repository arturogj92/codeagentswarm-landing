'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  LayoutGrid,
  SquareStack,
  History,
  PanelLeft,
  PanelsTopLeft,
  Plus,
  Settings,
  SquarePlus,
  Terminal,
  User,
} from 'lucide-react'
import QuotaCluster from './QuotaCluster'
import { PROJECTS } from './projects'
import type { AgentKey, DemoProject, ViewMode } from './types'

/**
 * The app's real header, rebuilt for the browser.
 *
 * Class names, icon choices and structure all come from the app's index.html, so
 * the styles pulled into demo-app.css land on the right elements. The buttons do
 * nothing: this is the frame of the product, not a second implementation of it.
 * If the app's header changes, this is the file to update alongside the CSS sync.
 */

const AGENT_ICON: Record<AgentKey, string> = {
  claude: '/icons/apps/claude-icon.svg',
  codex: '/icons/apps/codex-icon.svg',
  antigravity: '/icons/apps/antigravity-icon.png',
  opencode: '/icons/apps/opencode-icon.svg',
  kimi: '/icons/apps/kimi-icon.png',
}

const AGENT_LABEL: Record<AgentKey, string> = {
  claude: 'Claude Code',
  codex: 'Codex CLI',
  antigravity: 'Antigravity CLI',
  opencode: 'opencode',
  kimi: 'Kimi Code',
}

/**
 * Project shortcut chips. Each one opens a terminal on a project with a chosen
 * agent, which is why the chip carries both marks. Deliberately generic projects:
 * this ships on a public page.
 */
const SHORTCUTS: {
  project: DemoProject
  agent: AgentKey
  worktree?: boolean
  turbo?: boolean
}[] = [
  { project: PROJECTS.swarm, agent: 'claude', worktree: true, turbo: true },
  { project: PROJECTS.memois, agent: 'codex', turbo: true },
  { project: PROJECTS.diskito, agent: 'claude', worktree: true },
  { project: PROJECTS.megakill, agent: 'antigravity' },
  { project: PROJECTS.ghosty, agent: 'kimi', worktree: true, turbo: true },
  { project: PROJECTS.bones, agent: 'opencode', turbo: true },
]

/** The workspace views, in the app's own order. */
const VIEWS: { key: ViewMode; icon: typeof PanelLeft; title: string; hint: string }[] = [
  { key: 'grid', icon: LayoutGrid, title: 'Grid', hint: 'All terminals at once' },
  { key: 'tabs', icon: SquareStack, title: 'Tabs', hint: 'Navigation above the terminal' },
  { key: 'sidebar', icon: PanelLeft, title: 'List', hint: 'Navigation beside the terminal' },
]

interface Props {
  /** Rendered at the far right, where the app has no equivalent. */
  badge?: React.ReactNode
  /** Which workspace view is on. */
  view: ViewMode
  onView: (view: ViewMode) => void
  /** A shortcut chip was clicked: open that project with that agent. */
  onShortcut?: (projectName: string, agent: AgentKey) => void
  /** The Run button was clicked. */
  onRun?: () => void
}

export default function DemoHeader({ badge, view, onView, onShortcut, onRun }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onAway = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false)
    }
    // Deferred so the click that opened the menu does not immediately close it.
    const id = window.setTimeout(() => document.addEventListener('mousedown', onAway), 0)
    return () => {
      window.clearTimeout(id)
      document.removeEventListener('mousedown', onAway)
    }
  }, [menuOpen])

  const current = VIEWS.find((item) => item.key === view) ?? VIEWS[2]
  const CurrentIcon = current.icon

  return (
    <header className="header">
      <div className="header-left">
        {/* On macOS the window buttons sit inside this bar, left of the logo. */}
        <span className="demo-traffic" aria-hidden="true">
          <i style={{ background: '#ff5f57' }} />
          <i style={{ background: '#febc2e' }} />
          <i style={{ background: '#28c840' }} />
        </span>
        <div className="logo-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/isotipo.png" alt="CodeAgentSwarm" className="app-logo" />
        </div>
        <div className="action-buttons">
          <button className="btn-layout" type="button" tabIndex={-1} aria-label="Kanban board">
            <PanelsTopLeft />
          </button>
          <button className="btn-layout" type="button" tabIndex={-1} aria-label="Create task">
            <SquarePlus />
          </button>
          <button className="btn-layout" type="button" tabIndex={-1} aria-label="Conversation history">
            <History />
          </button>
        </div>
      </div>

      <div className="navbar-shortcuts" id="navbar-shortcuts">
        {SHORTCUTS.map((shortcut) => (
          <button
            key={shortcut.project.name}
            type="button"
            className={[
              'shortcut-btn',
              'icon-only',
              shortcut.worktree ? 'worktree-active' : '',
              shortcut.turbo ? 'turbo-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            title={`${shortcut.project.name} · ${AGENT_LABEL[shortcut.agent]}`}
            onClick={() => onShortcut?.(shortcut.project.name, shortcut.agent)}
          >
            <div className="shortcut-project-indicator has-custom-icon">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="shortcut-indicator-img" src={shortcut.project.icon} alt="" aria-hidden="true" />
            </div>
            <div className="shortcut-mode-indicators">
              <div className={`agent-indicator ${shortcut.agent}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={AGENT_ICON[shortcut.agent]} width={12} height={12} alt="" aria-hidden="true" />
              </div>
            </div>
            {/* Flags notched into the chip's bottom edge: worktree and turbo. */}
            {(shortcut.worktree || shortcut.turbo) && (
              <span className="shortcut-legends">
                {shortcut.worktree && (
                  <span className="shortcut-legend-icon legend-worktree" title="Git worktree">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="6" y1="3" x2="6" y2="15" />
                      <circle cx="18" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M18 9a9 9 0 0 1-9 9" />
                    </svg>
                  </span>
                )}
                {shortcut.turbo && (
                  <span className="shortcut-legend-icon legend-turbo" title="Turbo">
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </span>
                )}
              </span>
            )}
          </button>
        ))}
        <button className="add-shortcut-btn" type="button" tabIndex={-1} aria-label="Add shortcut">
          <Plus />
        </button>
      </div>

      <div className="header-controls">
        <div className="terminal-management">
          {/* The face shows the view you are IN, and the chevron opens the rest. */}
          <div className="workspace-view-control workspace-view-active" ref={menuRef}>
            <button
              className="btn btn-layout btn-tabbed-mode"
              type="button"
              aria-label={`Workspace view: ${current.title}`}
              onClick={() => onView(view === 'sidebar' ? 'tabs' : 'sidebar')}
            >
              <CurrentIcon />
            </button>
            <button
              className="workspace-layout-menu-btn"
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label="Choose workspace view"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <ChevronDown />
            </button>
            {menuOpen && (
              <div className="workspace-layout-menu demo-view-menu" role="menu">
                {VIEWS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    role="menuitem"
                    className="workspace-layout-option"
                    // Grid is listed because the app has it, but it is not
                    // offered yet: the extra tiles render empty and the cause is
                    // still open. Better a visibly unavailable option than a
                    // view that looks broken.
                    disabled={item.key === 'grid'}
                    onClick={() => {
                      if (item.key === 'grid') return
                      onView(item.key)
                      setMenuOpen(false)
                    }}
                  >
                    <item.icon />
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.hint}</small>
                    </span>
                    {item.key === view && <Check className="workspace-layout-check" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="btn btn-add-terminal" type="button" aria-label="Run a new terminal" onClick={onRun}>
            <Terminal />
            <span className="add-terminal-label">Run</span>
          </button>
        </div>

        <QuotaCluster />

        <button className="btn-layout" type="button" tabIndex={-1} aria-label="Account">
          <User />
        </button>
        <button className="btn-layout" type="button" tabIndex={-1} aria-label="Settings">
          <Settings />
        </button>
        {badge}
      </div>
    </header>
  )
}
