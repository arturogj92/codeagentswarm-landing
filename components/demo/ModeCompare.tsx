'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ChatPane from './ChatPane'
import { CHAT_MOMENT, CLI_MOMENT } from './compare-moment'
import './demo-app.css'
import './mode-compare.css'

/**
 * The Chat ⇄ Terminal comparison: one conversation, one second, two views, with
 * a divider you drag across it.
 *
 * The before/after slider is the right shape for this because the two sides are
 * not two features to weigh up — they are the same session rendered twice, and
 * that is exactly what a wipe shows and a pair of screenshots cannot. Whatever
 * sentence is under the divider is under it on both sides.
 *
 * Both panes are inert (`pointer-events: none`): the interactive one is the
 * simulator further up the page. Here the only thing to touch is the handle,
 * and a composer that swallowed the drag would be a trap.
 */

/** Where the divider sits on arrival: enough chat to read, enough CLI to notice. */
const INITIAL_SPLIT = 52
const KEY_STEP = 4

interface Props {
  chatLabel: string
  terminalLabel: string
  hint: string
  ariaLabel: string
}

export default function ModeCompare({ chatLabel, terminalLabel, hint, ariaLabel }: Props) {
  const [split, setSplit] = useState(INITIAL_SPLIT)
  const [dragging, setDragging] = useState(false)
  const frame = useRef<HTMLDivElement>(null)

  const setFromClientX = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect()
    if (!box || box.width === 0) return
    const pct = ((clientX - box.left) / box.width) * 100
    // Never let a side vanish completely: at 0 or 100 the control looks broken
    // rather than finished.
    setSplit(Math.min(94, Math.max(6, pct)))
  }, [])

  useEffect(() => {
    if (!dragging) return
    const move = (event: PointerEvent) => setFromClientX(event.clientX)
    const up = () => setDragging(false)
    // On window, not on the handle: the pointer routinely leaves the small hit
    // area mid-drag, and a listener on the handle would drop the gesture there.
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [dragging, setFromClientX])

  return (
    <div className="compare-wrap">
    <div
      className={`compare cas-demo${dragging ? ' is-dragging' : ''}`}
      data-theme="dark"
      ref={frame}
      onPointerDown={(event) => {
        // Clicking anywhere on the frame jumps the divider there, which is how
        // these comparisons behave everywhere else.
        setFromClientX(event.clientX)
        setDragging(true)
      }}
    >
      {/* Terminal underneath, full width. */}
      <div className="compare-layer compare-cli">
        {/*
          The transcript is centred, not flush left. The chat's own column is
          centred too, so this is what puts the same sentence under the divider
          on both sides — left-aligned, the whole terminal sat behind the chat
          and the right half of the frame was empty black.
        */}
        <pre className="compare-cli-screen">
          <code className="compare-cli-col">
            {CLI_MOMENT.map((line, index) => (
              <div key={index} className={`cli-line${line.tone ? ` is-${line.tone}` : ''}`}>
                {line.text}
                {line.trail ? <span className="cli-trail">{line.trail}</span> : null}
              </div>
            ))}
          </code>
        </pre>
        {/*
          The CLI's own floor: the input box and the permissions line every
          agent pins under its transcript. Not decoration — it is what the chat's
          composer is being compared against, and giving both sides a floor of
          the same height is what keeps the transcripts level above it.
        */}
        <div className="compare-cli-input">
          <span className="compare-cli-caret">›</span>
          <span className="compare-cli-cursor" />
        </div>
        <div className="compare-cli-footer">
          <span className="is-selected">▸▸</span> bypass permissions on{' '}
          <span className="cli-trail">(shift+tab to cycle)</span>
        </div>
      </div>

      {/* Chat on top, revealed from the left up to the divider. */}
      <div className="compare-layer compare-chat" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <ChatPane terminal={CHAT_MOMENT} onAnswer={() => {}} />
      </div>

      <span className="compare-tag compare-tag-chat">{chatLabel}</span>
      <span className="compare-tag compare-tag-cli">{terminalLabel}</span>

      <div
        className="compare-divider"
        style={{ left: `${split}%` }}
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        aria-valuetext={`${Math.round(split)}% ${chatLabel}`}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') setSplit((v) => Math.max(6, v - KEY_STEP))
          else if (event.key === 'ArrowRight') setSplit((v) => Math.min(94, v + KEY_STEP))
          else if (event.key === 'Home') setSplit(6)
          else if (event.key === 'End') setSplit(94)
          else return
          event.preventDefault()
        }}
      >
        <span className="compare-handle" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 6-6 6 6 6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </span>
      </div>

    </div>
      <span className="compare-hint">{hint}</span>
    </div>
  )
}
