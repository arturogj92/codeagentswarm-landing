'use client'

import { useEffect, useState } from 'react'
import { Bluetooth, Wifi } from 'lucide-react'

/**
 * The macOS menu bar across the top of the screen, with the notch cut into it.
 *
 * It exists for one reason: it is the frame that tells you this is an app on
 * somebody's Mac rather than a web page pretending to be one. The app menu says
 * CodeAgentSwarm, which is the whole point.
 */

const MENUS = ['File', 'Edit', 'View', 'Window', 'Help']

export default function MacMenuBar() {
  /**
   * The visitor's own clock. Rendered empty on the first pass and filled in from
   * an effect: a timestamp baked at render would be the one detail in the whole
   * frame that is provably stale, and it is the one people glance at.
   */
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(
        now.toLocaleString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      )
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="mac-menubar" aria-hidden="true">
      <div className="mac-menubar-left">
        <span className="mac-apple">
          {/* The Apple glyph, drawn rather than typed: the character renders as
              a blank box on anything that is not macOS. */}
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.6.9-.7 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3.1.7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7 0 0-2.4-.9-2.4-3.7zM14.2 5.9c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.5 2.8-1.3z" />
          </svg>
        </span>
        <span className="mac-menu-app">CodeAgentSwarm</span>
        {MENUS.map((item) => (
          <span key={item} className="mac-menu-item">
            {item}
          </span>
        ))}
      </div>

      {/* The notch sits between the two halves, which is exactly how the real
          bar behaves: the menus stop short of it on both sides. */}
      <span className="mac-notch" />

      <div className="mac-menubar-right">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mac-status-icon" src="/icons/apps/claude-icon.svg" alt="" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="mac-status-icon" src="/icons/apps/codex-icon.svg" alt="" />
        <span className="mac-battery">
          <span className="mac-battery-shell">
            <span className="mac-battery-fill" />
          </span>
          100%
        </span>
        <Wifi className="mac-status-glyph" />
        <Bluetooth className="mac-status-glyph" />
        <span className="mac-clock">{clock}</span>
      </div>
    </div>
  )
}
