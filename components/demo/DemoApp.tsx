'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { LayoutGroup } from 'framer-motion'
import TerminalLauncher from './TerminalLauncher'
import DemoNotifications from './DemoNotifications'
import DemoHeader from './DemoHeader'
import TerminalList from './TerminalList'
import TerminalPanel from './TerminalPanel'
import { PROJECT_LIST } from './projects'
import script from './script'
import { useResizableSidebar } from './useResizableSidebar'
import { useScrollOwnership } from './useScrollOwnership'
import { useSimulation } from './useSimulation'
import type { AgentKey, ViewMode } from './types'
import './demo-app.css'
import './demo-shell.css'
import 'xterm/css/xterm.css'

interface Props {
  /** Full height layout for /demo; a shorter, embeddable one for the homepage. */
  variant?: 'embedded' | 'full'
}

/** Terminals shown at once in Grid. Four is the app's own comfortable default,
 *  and each one is a live terminal, so the number is also the cost. */
const GRID_SIZE = 4


/**
 * The interactive product demo: a simulated CodeAgentSwarm session running in
 * the page. No server, no model, no shell. See ./script.ts for what it plays.
 */
export default function DemoApp({ variant = 'embedded' }: Props) {
  const t = useTranslations('interactiveDemo')
  const rootRef = useRef<HTMLDivElement>(null)
  /** Off-screen demos are frozen: an unread page should cost nothing. */
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  /** Run opens the two-step launcher. */
  const [launcherOpen, setLauncherOpen] = useState(false)
  /**
   * Which workspace view is on. The app offers Grid, Tabs and List; the demo
   * ships Tabs and List, which are the two that share a single terminal pane.
   */
  const [view, setView] = useState<ViewMode>('sidebar')
  /** Compact density: one-line rows instead of title, goal and activity. */
  const [compact, setCompact] = useState(false)
  /** Collapsed: the list shrinks to a rail of project initials. */
  const [collapsed, setCollapsed] = useState(false)
  /**
   * Id of a terminal still booting. A real terminal does not appear fully formed:
   * the CLI has to start, and showing that beat is most of why opening one feels
   * like the app rather than like adding a row to a list.
   */
  const [booting, setBooting] = useState<number | null>(null)

  const sim = useSimulation(script, { active: visible })

  /**
   * Umami, four events, no more.
   *
   * The question this has to answer is whether the demo pays for itself, so it
   * measures reach (seen), engagement (touched) and depth (dwell), and lets the
   * existing download events close the loop. Anything finer would be data nobody
   * looks at, on a page that already tracks scroll depth.
   */
  const seen = useRef(false)
  const touched = useRef(false)
  const enteredAt = useRef(0)

  useEffect(() => {
    if (!visible) {
      // Dwell is only worth reporting once it means something. Under five
      // seconds is someone scrolling past, not someone watching.
      if (enteredAt.current) {
        const seconds = Math.round((performance.now() - enteredAt.current) / 1000)
        if (seconds >= 5) window.umami?.track('demo_dwell', { seconds, variant })
        enteredAt.current = 0
      }
      return
    }
    enteredAt.current = performance.now()
    if (!seen.current) {
      seen.current = true
      window.umami?.track('demo_seen', { variant })
    }
  }, [visible, variant])

  /** Fired once per visit, on the first thing they actually do. */
  const trackTouch = useCallback(
    (what: string) => {
      if (touched.current) return
      touched.current = true
      window.umami?.track('demo_touched', { what, variant })
    },
    [variant]
  )
  /**
   * The four terminals Grid shows. The focused one is always among them, so
   * clicking a notification or pressing a digit never points at a pane that is
   * not on screen; the rest fill in from the top of the sorted list.
   */
  const gridTerminals = (() => {
    const focused = sim.terminals.find((term) => term.id === sim.selectedId)
    const rest = sim.terminals.filter((term) => term.id !== sim.selectedId)
    return [...(focused ? [focused] : []), ...rest].slice(0, GRID_SIZE)
  })()
  const sidebar = useResizableSidebar(() => setCollapsed(true))
  // The demo lives inside a page the visitor is trying to scroll past.
  useScrollOwnership(rootRef)
  const selected = sim.terminals.find((term) => term.id === sim.selectedId) ?? sim.terminals[0]

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Number keys jump between terminals, exactly like Cmd+1..9 in the app. They
  // are bound only while the pointer is over the demo: a landing page must never
  // swallow keystrokes meant for the page itself. While an agent is asking a
  // question the digits belong to its selector, so this stands down.
  const answering = Boolean(selected?.prompt)
  useEffect(() => {
    if (!hovered || answering) return
    const onKey = (event: KeyboardEvent) => {
      const index = Number(event.key)
      if (!Number.isInteger(index) || index < 1 || index > sim.terminals.length) return
      const ordered = [...sim.terminals].sort((a, b) => a.id - b.id)
      event.preventDefault()
      sim.select(ordered[index - 1].id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hovered, answering, sim])

  const answer = useCallback(
    (index: number) => {
      if (!selected) return
      trackTouch('answer')
      // The one interaction worth counting on its own: answering an agent is
      // the moment the visitor stops watching and starts using it.
      window.umami?.track('demo_answered', { variant })
      sim.answer(selected.id, index)
    },
    [selected, sim, trackTouch, variant]
  )

  /**
   * A shortcut chip always starts a NEW session on its project with its own
   * agent. It is a launcher, not a way to jump to a terminal you already have,
   * which is the whole reason you can have several open on the same project.
   */
  const openShortcut = useCallback(
    (projectName: string, agent: AgentKey) => {
      trackTouch('shortcut')
      const project = PROJECT_LIST.find((item) => item.name === projectName)
      if (!project) return
      const id = sim.open(agent, project)
      setBooting(id)
      window.setTimeout(() => setBooting((current) => (current === id ? null : current)), 1500)
    },
    [sim, trackTouch]
  )

  if (!selected) return null

  const cwd = `~/code/${selected.project.name}`

  return (
    <div
      ref={rootRef}
      className={`cas-demo demo-root demo-${variant}`}
      data-theme="dark"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <DemoHeader
        onShortcut={openShortcut}
        onRun={() => {
          trackTouch('run')
          setLauncherOpen(true)
        }}
        view={view}
        onView={setView}
      />

      <div
        className={[
          'demo-body',
          `demo-view-${view}`,
          sidebar.dragging ? 'is-resizing' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {view !== 'grid' && (
        <LayoutGroup>
          <div
            className={[
              'tabbed-layout-container',
              `tab-navigation-${view === 'tabs' ? 'tabs' : 'sidebar'}`,
              compact ? 'tab-list-compact' : '',
              collapsed ? 'tab-sidebar-collapsed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            // A collapsed list is a fixed rail, so the dragged width steps aside.
            style={view === 'sidebar' && !collapsed ? { flexBasis: sidebar.width } : undefined}
          >
            <TerminalList
              view={view === 'tabs' ? 'tabs' : 'sidebar'}
              terminals={sim.terminals}
              selectedId={sim.selectedId}
              onSelect={(id) => {
                trackTouch('select')
                sim.select(id)
              }}
              onClose={sim.close}
              onNew={() => {
                trackTouch('new')
                setLauncherOpen(true)
              }}
              compact={compact}
              onCompact={() => setCompact((on) => !on)}
              collapsed={collapsed}
              onCollapse={() => setCollapsed((on) => !on)}
            />
          </div>
        </LayoutGroup>
        )}

        {view === 'sidebar' && !collapsed && (
          <div
            className="tab-sidebar-resize-handle demo-resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label={t('resize')}
            onPointerDown={sidebar.onPointerDown}
            onDoubleClick={sidebar.reset}
          />
        )}

        {view === 'grid' ? (
          <div className="demo-grid">
            {gridTerminals.map((terminal) => (
              <TerminalPanel
                key={terminal.id}
                terminal={terminal}
                chunks={sim.screens[terminal.id] ?? []}
                booting={booting === terminal.id}
                // Only the focused panel listens for keys, so a digit or an
                // answer never lands in two terminals at once.
                keyboardActive={hovered && terminal.id === sim.selectedId}
                onAnswer={(index) => sim.answer(terminal.id, index)}
                onMode={(mode) => {
                  trackTouch('mode')
                  sim.setMode(terminal.id, mode)
                }}
                focused={terminal.id === sim.selectedId}
                onFocus={() => sim.select(terminal.id)}
              />
            ))}
          </div>
        ) : (
          <TerminalPanel
            terminal={selected}
            chunks={sim.screens[selected.id] ?? []}
            booting={booting === selected.id}
            keyboardActive={hovered}
            onAnswer={answer}
            onMode={(mode) => {
              trackTouch('mode')
              sim.setMode(selected.id, mode)
            }}
          />
        )}
      </div>

      <div className="demo-footer">
        {/*
          The strip says nothing until there is something to press.

          It has been three things in turn: a narrator describing the moment on
          screen, then four chapters arguing the product. Both were wrong for
          the same reason, which only became obvious once the section above the
          Mac was written properly: THAT is where the argument lives, and this
          was repeating it two hundred pixels below, in a smaller font, out of
          the corner of the reader's eye. Two voices saying the same thing do
          not reinforce each other, they make the reader wonder what they
          missed.

          So the footer keeps only what nothing else can do: tell you which key
          to press, at the moment an agent is waiting on you.
        */}
        <span className="demo-hint">
          {/* From the prompt on screen, not from the script: the three
              selectors do not all offer the same number of options, and this
              line used to promise "1, 2 or 3" in front of a two-option one. */}
          {/* Only in the terminal view: the chat answers with a click on the
              option and a press of Answer, so promising a number key there
              would be telling the visitor to press something inert. */}
          {answering && (selected.mode ?? 'chat') === 'terminal'
            ? t('hintAnswer', { options: selected.prompt?.options.length ?? 0 })
            : ''}
        </span>
        {/* No download button in here any more. There is one immediately under
            the machine, and a second copy of it INSIDE the screen was both a
            duplicate and a lie about the product: the real app has no "download
            it free" button in its status bar. The strip is empty most of the
            time now, and it is kept rather than removed so that its height
            never changes - the terminal refits and replays its transcript
            whenever the pane grows or shrinks. */}
      </div>

      <DemoNotifications terminals={sim.terminals} onOpen={sim.select} />

      <div className="demo-progress" style={{ transform: `scaleX(${sim.progress})` }} />


      {launcherOpen && (
        <TerminalLauncher
          onLaunch={(agent, project) => {
            const id = sim.open(agent, project)
            setLauncherOpen(false)
            setBooting(id)
            window.setTimeout(() => setBooting((current) => (current === id ? null : current)), 1500)
          }}
          onClose={() => setLauncherOpen(false)}
        />
      )}
    </div>
  )
}

