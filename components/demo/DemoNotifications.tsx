'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { DemoTerminal } from './types'

/**
 * How long a notification stays up. Long on purpose: these are the product's
 * argument, not chrome, and one that flashes past is one nobody reads.
 */
const LIFETIME_MS = 7_500
/**
 * Quiet time after one leaves before the next may arrive.
 *
 * Combined with the one-at-a-time rule below, this is what turns a burst into a
 * sequence you can actually follow. The old version allowed a new one every
 * 3.5s while each lived for 9s, so three could be stacked on screen and the
 * whole thing read as an alarm going off rather than as agents reporting in.
 */
const GAP_MS = 2_500
/**
 * Notifications worth keeping if several agents change state at once. Beyond
 * this the oldest is dropped: a queue that drains for a minute is describing a
 * moment that has already passed.
 */
const MAX_PENDING = 2

type Kind = 'confirmation' | 'finished'

interface Toast {
  key: string
  id: number
  kind: Kind
  /** "Voice note sync - memois", the way the app builds its body line. */
  body: string
}

/**
 * The system notifications the app fires.
 *
 * Wording, structure and pacing copied from webhook-server.js: title is always
 * the app name, the subtitle says what happened ("Terminal needs confirmation" /
 * "Terminal finished") and the body names the terminal and its project. Inventing
 * friendlier copy here would have been the easy path and would have made the
 * demo lie about what the product actually shows you.
 */
export default function DemoNotifications({
  terminals,
  onOpen,
}: {
  terminals: DemoTerminal[]
  onOpen: (id: number) => void
}) {
  const t = useTranslations('interactiveDemo')
  const [toasts, setToasts] = useState<Toast[]>([])
  /**
   * What each terminal was last announced FOR. Without this the toast re-fires
   * on every render for as long as the agent stays in that state, which is most
   * of the loop.
   */
  const announced = useRef(new Map<number, Kind>())
  /** Queue, so two agents changing state together do not stack up at once. */
  const pending = useRef<Toast[]>([])
  /** When the last one left the screen, so the next can wait a beat. */
  const freeAt = useRef(0)
  /** Ids whose row has been seen at least once, so arriving is not an event. */
  const known = useRef(new Set<number>())

  useEffect(() => {
    for (const term of terminals) {
      const kind: Kind | null =
        term.status === 'needs_input'
          ? 'confirmation'
          : term.status === 'needs_testing' || term.status === 'pushed'
            ? 'finished'
            : null

      if (!kind) {
        announced.current.delete(term.id)
        known.current.add(term.id)
        continue
      }

      /**
       * A terminal that is ALREADY waiting when it first appears is not news.
       *
       * The workspace assembles at the start of every loop, and five of the
       * eight terminals arrive mid-question or already finished. Announcing
       * those was the burst: four notifications inside the first few seconds,
       * for things that had supposedly happened before the visitor arrived.
       * Only a change of state that happens while they are watching is an
       * event, so the first sighting is recorded and swallowed.
       */
      const seen = known.current.has(term.id)
      known.current.add(term.id)
      if (announced.current.get(term.id) === kind) continue
      announced.current.set(term.id, kind)
      if (!seen) continue

      pending.current.push({
        key: `${term.id}-${kind}-${term.title}`,
        id: term.id,
        kind,
        body: `${term.title} - ${term.project.name}`,
      })
      if (pending.current.length > MAX_PENDING) pending.current.shift()
    }
  }, [terminals])

  // One on screen at a time, and a beat of quiet between them.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (pending.current.length === 0) return
      const now = performance.now()
      if (now < freeAt.current) return

      const toast = pending.current.shift()!
      // Reserved for this one now, so the next tick cannot let a second through
      // while this one is still on screen.
      freeAt.current = now + LIFETIME_MS + GAP_MS
      setToasts([toast])
      window.setTimeout(
        () => setToasts((current) => current.filter((item) => item.key !== toast.key)),
        LIFETIME_MS
      )
    }, 400)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="demo-toasts" aria-live="polite">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.button
            key={toast.key}
            type="button"
            className="demo-toast"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={() => {
              onOpen(toast.id)
              setToasts((current) => current.filter((item) => item.key !== toast.key))
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="demo-toast-icon" src="/isotipo.png" alt="" aria-hidden="true" />
            <span className="demo-toast-text">
              <span className="demo-toast-head">
                <span className="demo-toast-app">CodeAgentSwarm</span>
                <span className="demo-toast-now">{t('toastNow')}</span>
              </span>
              <span className="demo-toast-title">{t(`toast.${toast.kind}`)}</span>
              <span className="demo-toast-body">{toast.body}</span>
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
