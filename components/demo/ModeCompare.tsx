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
const INITIAL_SPLIT = 44
/**
 * The opening sweep: the section arrives as the FULL terminal, holds there long
 * enough to read the banner — mascot, model line, working directory — and then
 * the divider travels right-to-left, revealing the chat from the right edge.
 *
 * This order is the story told in one gesture: "this is the CLI you already
 * know; watch what it becomes." The CLI owns the LEFT half precisely so the
 * mascot — which lives at the left edge of the terminal's screen — stays on
 * show not just during the hold but after the divider settles.
 *
 * Slow on purpose. Under a second it reads as a glitch; at this pace it reads
 * as a reveal, and it teaches that the divider is draggable without a word.
 */
const SWEEP_START = 94
/** Held on the terminal before anything moves, so the banner registers. */
const SWEEP_HOLD_MS = 1000
/** The reveal itself: the chat wipes in from the left. */
const SWEEP_MS = 1800
const KEY_STEP = 4

/** Eased at both ends, so each leg leaves gently and arrives gently. */
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

interface Props {
  chatLabel: string
  terminalLabel: string
  hint: string
  ariaLabel: string
}

/** Two of the five, because two is enough to show it is not one agent's feature. */
const AGENTS: CompareAgent[] = ['claude', 'codex']

export default function ModeCompare({ chatLabel, terminalLabel, hint, ariaLabel }: Props) {
  // Starts where the sweep starts — all terminal. Mounting anywhere else and
  // then jumping to the sweep's start would flash the other layout for a frame.
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
   * The opening sweep: hold on the full terminal, then reveal the chat.
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
      const t = now - start - SWEEP_HOLD_MS

      if (t < 0) {
        // Still holding on the full terminal.
      } else if (t < SWEEP_MS) {
        // The chat wipes in from the right, easing at both ends.
        setSplit(SWEEP_START + (INITIAL_SPLIT - SWEEP_START) * easeInOut(t / SWEEP_MS))
      } else {
        setSplit(INITIAL_SPLIT)
        return
      }
      sweep.current = requestAnimationFrame(step)
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
    // Never let a side vanish completely: at the extremes the control looks
    // broken rather than finished.
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

      {/* Chat on top, its LEFT edge riding the divider. Not a clipped
          screenshot: the pane is a live layout that reflows to whatever width
          the divider gives it, the way a real split view resizes — so the WHOLE
          chat mode is on show at every divider position, and dragging fully
          left yields the entire chat filling the frame. */}
      <div className="compare-layer compare-chat" style={{ left: `${split}%` }}>
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
        aria-valuenow={Math.round(100 - split)}
        aria-valuetext={`${Math.round(100 - split)}% ${chatLabel}`}
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
