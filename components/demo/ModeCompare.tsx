'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import ChatPane from './ChatPane'
import { chatMoment, cliBanner, cliFooter, cliMoment, type CompareAgent } from './compare-moment'
import { AGENT_ICON } from './TerminalRow'
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

/** Where the divider comes to rest: enough chat to read, enough CLI to notice. */
const INITIAL_SPLIT = 52
/**
 * The opening sweep, in order.
 *
 * It arrives as chat and nothing else — that is the view being argued for, and
 * it is what the section's own heading has just promised. Then the divider pulls
 * left and the terminal comes out from under it, banner and mascot first,
 * before settling back to the resting split.
 *
 * Reversing this was not cosmetic. Starting on the terminal made the first thing
 * a visitor saw a wall of monospace, which is precisely the thing chat mode
 * exists to soften.
 */
const SWEEP_START = 94
/** How far left it pulls: enough of the terminal to read its banner. */
const SWEEP_REVEAL = 32
/** A beat of stillness first, so the chat registers before anything moves. */
const SWEEP_HOLD_MS = 420
const SWEEP_OUT_MS = 900
const SWEEP_BACK_MS = 620
const KEY_STEP = 4

interface Props {
  chatLabel: string
  terminalLabel: string
  hint: string
  ariaLabel: string
}

/** Two of the five, because two is enough to show it is not one agent's feature. */
const AGENTS: CompareAgent[] = ['claude', 'codex']

export default function ModeCompare({ chatLabel, terminalLabel, hint, ariaLabel }: Props) {
  // Starts where the sweep starts — all chat. Mounting at the resting split and
  // then jumping to 94% to begin would show the terminal for one frame before
  // hiding it again.
  const [split, setSplit] = useState(SWEEP_START)
  const [dragging, setDragging] = useState(false)
  /**
   * Which agent is running this conversation.
   *
   * Same words on both settings: what changes is whose CLI it is — the mark in
   * the composer, the model, the bullet, how a tool call is printed and what the
   * status line says. That is the honest difference, and it is the point: the
   * chat view is not a Claude feature.
   */
  const [agent, setAgent] = useState<CompareAgent>('claude')
  const frame = useRef<HTMLDivElement>(null)
  /** The opening sweep's frame handle, so a touch can cut it short. */
  const sweep = useRef(0)

  /**
   * The opening sweep: hold on chat, pull left to uncover the terminal, settle.
   *
   * Three beats rather than one straight slide, because a single move from chat
   * to the resting split never uncovers the terminal's banner — the mascot and
   * the model line live on the left of the screen, behind the chat at 52%. The
   * pull-and-return shows them, then gives back the reading position.
   */
  useEffect(() => {
    const node = frame.current
    if (!node) return
    // Someone who asked for less motion gets the resting split and no wipe.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSplit(INITIAL_SPLIT)
      return
    }

    let start = 0

    const step = (now: number) => {
      if (!start) start = now
      const elapsed = now - start

      if (elapsed < SWEEP_HOLD_MS) {
        sweep.current = requestAnimationFrame(step)
        return
      }

      const t = elapsed - SWEEP_HOLD_MS
      if (t < SWEEP_OUT_MS) {
        // Out: quick off the mark, easing as the terminal comes into view.
        const p = 1 - Math.pow(1 - t / SWEEP_OUT_MS, 3)
        setSplit(SWEEP_START + (SWEEP_REVEAL - SWEEP_START) * p)
        sweep.current = requestAnimationFrame(step)
        return
      }

      const back = Math.min((t - SWEEP_OUT_MS) / SWEEP_BACK_MS, 1)
      // Back: eased at both ends, so it reads as settling rather than snapping.
      const p = back < 0.5 ? 2 * back * back : 1 - Math.pow(-2 * back + 2, 2) / 2
      setSplit(SWEEP_REVEAL + (INITIAL_SPLIT - SWEEP_REVEAL) * p)
      if (back < 1) sweep.current = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        // Once only: a wipe that replays every time the section scrolls back
        // into view stops reading as an invitation and starts reading as a loop.
        observer.disconnect()
        setSplit(SWEEP_START)
        sweep.current = requestAnimationFrame(step)
      },
      { threshold: 0.35 }
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(sweep.current)
    }
  }, [])

  const setFromClientX = useCallback((clientX: number) => {
    // The hand wins over the animation: without this, a visitor who grabs the
    // divider mid-sweep is fighting a rAF loop that keeps overwriting them.
    cancelAnimationFrame(sweep.current)
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

  const terminal = chatMoment(agent)

  return (
    <div className="compare-wrap">
      <div className="compare-agents" role="tablist" aria-label={ariaLabel}>
        {AGENTS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={agent === key}
            className={`compare-agent${agent === key ? ' is-active' : ''}`}
            onClick={() => setAgent(key)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={AGENT_ICON[key].src} alt="" aria-hidden="true" />
            {AGENT_ICON[key].label}
          </button>
        ))}
      </div>
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
      <div className="compare-layer compare-cli" data-agent={agent}>
        {/*
          The transcript is centred, not flush left. The chat's own column is
          centred too, so this is what puts the same sentence under the divider
          on both sides — left-aligned, the whole terminal sat behind the chat
          and the right half of the frame was empty black.
        */}
        <pre className="compare-cli-screen">
          <span className="compare-cli-stack">
            <code className="compare-cli-banner">
              {cliBanner(agent).map((line, index) => (
                <div key={index} className={`cli-line${line.tone ? ` is-${line.tone}` : ''}`}>
                  {line.text}
                  {line.trail ? (
                    <span className={`cli-trail${line.trailTone ? ` is-${line.trailTone}` : ''}`}>
                      {line.trail}
                    </span>
                  ) : null}
                </div>
              ))}
            </code>
          <code className="compare-cli-col">
            {cliMoment(agent).map((line, index) => (
              <div key={index} className={`cli-line${line.tone ? ` is-${line.tone}` : ''}`}>
                {line.text}
                {line.trail ? (
                  <span className={`cli-trail${line.trailTone ? ` is-${line.trailTone}` : ''}`}>
                    {line.trail}
                  </span>
                ) : null}
              </div>
            ))}
          </code>
          </span>
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
          <span className="is-selected">▸▸</span> {cliFooter(agent)}{' '}
          <span className="cli-trail">(shift+tab to cycle)</span>
        </div>
      </div>

      {/* Chat on top, revealed from the left up to the divider. */}
      <div className="compare-layer compare-chat" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <ChatPane terminal={terminal} onAnswer={() => {}} />
      </div>

      {/* Both tags name the agent, so it reads the same whichever half you are
          looking at when the divider is near an edge. */}
      <span className="compare-tag compare-tag-chat">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AGENT_ICON[agent].src} alt="" aria-hidden="true" />
        {chatLabel} · {AGENT_ICON[agent].label}
      </span>
      <span className="compare-tag compare-tag-cli">
        {terminalLabel} · {AGENT_ICON[agent].label}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AGENT_ICON[agent].src} alt="" aria-hidden="true" />
      </span>

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
