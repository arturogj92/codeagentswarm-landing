'use client'

import { ArrowDownWideNarrow, PanelLeftClose, PanelLeftOpen, Plus, Rows4 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import TerminalRow from './TerminalRow'
import { STATUSES, statusOrder } from './statuses'
import type { DemoTerminal, StatusKey } from './types'

interface Props {
  /** Which workspace view is on; Tabs has no group headings. */
  view: 'sidebar' | 'tabs'
  terminals: DemoTerminal[]
  selectedId: number
  onSelect: (id: number) => void
  onClose: (id: number) => void
  /** The + in the list toolbar opens the launcher, same as Run. */
  onNew: () => void
  compact: boolean
  onCompact: () => void
  collapsed: boolean
  onCollapse: () => void
}

type ListItem =
  | { kind: 'heading'; status: StatusKey }
  | { kind: 'row'; terminal: DemoTerminal }

/**
 * The sidebar list, sorted by work phase with a heading at every change of phase.
 *
 * Headings and rows are FLAT SIBLINGS, exactly as the app builds them. That is
 * not a stylistic choice: framer-motion can only slide an element to a new
 * position while it keeps the same parent, so wrapping each group in its own
 * container would make a row that changes status unmount and reappear elsewhere,
 * which is the teleport we are trying to avoid.
 *
 * Sorting is stable within a group, so a row only ever moves when its OWN status
 * changes. Otherwise unrelated rows would shuffle past each other and the list
 * would read as noise instead of progress.
 */
export default function TerminalList({ view, terminals, selectedId, onSelect, onClose, onNew, compact, onCompact, collapsed, onCollapse }: Props) {
  /*
   * Rows slide between status groups via layout animation, which is the most
   * expensive thing in the list — every reorder measures and tweens nine
   * elements. Honour the OS setting: someone who asked for less motion gets
   * instant reordering, and on a loaded machine that is also the cheapest path.
   */
  const reduced = useReducedMotion()
  const items = useMemo<ListItem[]>(() => {
    const sorted = [...terminals].sort((a, b) => {
      const byStatus = statusOrder(a.status) - statusOrder(b.status)
      return byStatus !== 0 ? byStatus : a.id - b.id
    })

    const out: ListItem[] = []
    let previous: StatusKey | null = null
    for (const terminal of sorted) {
      // A horizontal strip has no room for a heading between tabs, and the app
      // does not draw them there either.
      if (view === 'sidebar' && terminal.status !== previous) {
        out.push({ kind: 'heading', status: terminal.status })
        previous = terminal.status
      }
      out.push({ kind: 'row', terminal })
    }
    return out
  }, [terminals, view])

  /**
   * Keep the focused row in view.
   *
   * Rows move between groups as their status changes, and a brand new terminal
   * lands at the bottom under Idle, so the row the pane is showing can easily be
   * scrolled out of sight. Done by hand against this container rather than with
   * scrollIntoView, which would happily scroll the whole landing page instead.
   */
  const scrollerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // Deferred a frame: the rows animate their own position (framer-motion
    // `layout`), so a rect read during the switch is a moving target and the
    // active tab ends up parked half off the edge.
    const frame = requestAnimationFrame(() => {
    const scroller = scrollerRef.current
    const row = scroller?.querySelector<HTMLElement>('.terminal-tab.active')
    if (!scroller || !row) return

    // The strip scrolls down in List and sideways in Tabs, so the axis has to
    // follow the view or the scroll silently does nothing.
    const margin = 12
    const horizontal = view === 'tabs'
    // Measured with rects, not offsetTop/offsetLeft: those are relative to the
    // offsetParent, which is not necessarily this scroller, and the mismatch
    // left the active tab parked half off the left edge.
    const rowBox = row.getBoundingClientRect()
    const viewBox = scroller.getBoundingClientRect()
    const viewStart = horizontal ? scroller.scrollLeft : scroller.scrollTop
    const viewSize = horizontal ? scroller.clientWidth : scroller.clientHeight
    const viewEnd = viewStart + viewSize
    const start = viewStart + (horizontal ? rowBox.left - viewBox.left : rowBox.top - viewBox.top)
    const end = start + (horizontal ? rowBox.width : rowBox.height)

    const scrollTo = (value: number) =>
      scroller.scrollTo(horizontal ? { left: value, behavior: 'smooth' } : { top: value, behavior: 'smooth' })

      if (start < viewStart + margin) scrollTo(Math.max(0, start - margin))
      else if (end > viewEnd - margin) scrollTo(end - viewSize + margin)
    })
    return () => cancelAnimationFrame(frame)
    // NOT on every `terminals` change. The list re-renders constantly as agents
    // update their activity, and re-running this on each of those fought the
    // wheel: every few frames it yanked the strip back, which is the shudder you
    // feel scrolling to the end. Only a change of FOCUS or of VIEW justifies
    // moving the scroll on the visitor's behalf.
  }, [selectedId, view])

  return (
    <div className="terminal-tabs-bar">
      {collapsed && view === 'sidebar' && (
        <div className="terminal-tabs-toolbar">
          <button
            className="tab-sidebar-collapse-btn"
            type="button"
            aria-label="Expand terminal list"
            onClick={onCollapse}
          >
            <PanelLeftOpen />
          </button>
          <button className="btn-new-tab" type="button" aria-label="New terminal" onClick={onNew}>
            <Plus />
          </button>
        </div>
      )}
      {view === 'sidebar' && !collapsed && (
        /* The app's own toolbar: sort, the heading with its count, then density,
           collapse and new-terminal. Rebuilt from index.html rather than
           improvised, because an invented control is the fastest way to make a
           replica read as a mock-up. */
        <div className="terminal-tabs-toolbar">
          <button className="sort-tabs-btn on" type="button" tabIndex={-1} aria-label="Sort tabs by status">
            <ArrowDownWideNarrow />
          </button>
          <div className="terminal-tabs-sidebar-heading">
            <span>Terminals</span>
            <span className="terminal-tabs-count">{terminals.length}</span>
          </div>
          <button
            className={`list-density-btn${compact ? ' on' : ''}`}
            type="button"
            aria-pressed={compact}
            aria-label="Toggle terminal list density"
            onClick={onCompact}
          >
            <Rows4 />
          </button>
          <button
            className="tab-sidebar-collapse-btn"
            type="button"
            aria-label="Collapse terminal list"
            onClick={onCollapse}
          >
            <PanelLeftClose />
          </button>
          <button className="btn-new-tab" type="button" aria-label="New terminal" onClick={onNew}>
            <Plus />
          </button>
        </div>
      )}

      <div className="terminal-tabs" ref={scrollerRef}>
        {items.map((item) =>
          item.kind === 'heading' ? (
            <motion.div
              key={`heading-${item.status}`}
              layout
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              className="tab-status-group-label"
              data-status-key={item.status}
            >
              {STATUSES[item.status].label}
            </motion.div>
          ) : (
            <TerminalRow
              key={item.terminal.id}
              terminal={item.terminal}
              animate={view === 'sidebar' && !reduced}
              active={item.terminal.id === selectedId}
              onSelect={onSelect}
              onClose={onClose}
            />
          )
        )}
      </div>
    </div>
  )
}
