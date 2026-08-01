'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Terminal } from 'xterm'
import { AGENTS, renderLive, renderPrompt, type RenderedPrompt } from './agents'
import { HIDE_CURSOR, rewind, typeUnits } from './ansi'
import type { AgentKey, DemoPrompt } from './types'

/** How often the live status block redraws itself. */
const LIVE_TICK_MS = 420
/**
 * Typing cadence. Around 135 characters a second: fast enough that a tool result
 * does not outstay its welcome, slow enough to read as it lands. It used to run
 * at 250, which looked less like an agent working and more like text being
 * pasted in.
 */
const TYPE_TICK_MS = 22
const UNITS_PER_TICK = 3

interface Props {
  /** Which terminal is on screen. Switching resets and replays its backlog. */
  terminalId: number
  agent: AgentKey
  title: string
  cwd: string
  /** Everything written to this terminal so far, ANSI included. */
  chunks: string[]
  /** Set while this agent is blocked on a decision. */
  prompt?: DemoPrompt
  /** Called with the chosen option index. */
  onAnswer: (index: number) => void
  /** True while the pointer is over the demo, so keys are only bound then. */
  keyboardActive: boolean
  /** Present-tense activity, shown beside the spinner while the agent works. */
  activity: string
  /** The agent's task list and which entry is in progress. */
  todos?: string[]
  todoIndex?: number
  /** False when the agent is waiting or finished: the spinner stands down. */
  busy: boolean
}

/**
 * A real xterm.js instance, the same library and major version the desktop app
 * runs. Recreating a terminal with divs would look close but never right: the
 * cell grid, the ANSI palette and the block cursor are what make a screenshot of
 * this indistinguishable from the product.
 */

/** The app's dark terminal palette. */
const THEME = {
  background: '#0d0d12',
  foreground: '#e4e4eb',
  cursor: '#fbbf24',
  cursorAccent: '#0d0d12',
  selectionBackground: 'rgba(251, 191, 36, 0.25)',
  black: '#0d0d12',
  red: '#f87171',
  green: '#4ac27a',
  yellow: '#fbbf24',
  blue: '#60a5fa',
  magenta: '#a78bfa',
  cyan: '#22d3ee',
  white: '#e4e4eb',
  brightBlack: '#7a7a84',
  brightRed: '#fca5a5',
  brightGreen: '#86efac',
  brightYellow: '#fde68a',
  brightBlue: '#93c5fd',
  brightMagenta: '#c4b5fd',
  brightCyan: '#67e8f9',
  brightWhite: '#ffffff',
}

export default function TerminalPane({
  terminalId,
  agent,
  title,
  cwd,
  chunks,
  prompt,
  onAnswer,
  keyboardActive,
  activity,
  todos,
  todoIndex = 0,
  busy,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<Terminal | null>(null)
  /** Which terminal the on-screen buffer belongs to, and how much of it is drawn. */
  const painted = useRef<{ id: number; count: number }>({ id: -1, count: 0 })
  /** The selector block currently on screen, so it can be rewound and redrawn. */
  const drawn = useRef<RenderedPrompt | null>(null)
  /**
   * Output waiting to be typed out, split into units that never cut an escape
   * sequence. Writing a whole chunk at once is what made the pane read as a
   * slideshow; a real agent lays its answer down as it produces it.
   */
  const queue = useRef<string[]>([])
  const [typing, setTyping] = useState(false)
  /**
   * The terminal is built asynchronously, so the paint effect below runs once
   * with nothing to draw on. This state re-runs it the moment xterm exists;
   * without it the pane stays blank until the script happens to write again.
   */
  const [ready, setReady] = useState(false)
  /** Bumped when a resize changed the row count, to force a repaint. */
  const [resizes, setResizes] = useState(0)
  const [highlight, setHighlight] = useState(0)
  /** Screen geometry of the option rows, for the click targets. */
  const [hitAreas, setHitAreas] = useState<{ top: number; height: number }[]>([])

  useEffect(() => {
    let disposed = false
    let observer: ResizeObserver | null = null
    let cleanupZoom: (() => void) | null = null

    // xterm reaches for `self` and the DOM at import time, so it can only be
    // loaded in the browser. Dynamic import also keeps it out of the main bundle
    // for every visitor who never scrolls this far.
    ;(async () => {
      const [{ Terminal }, { FitAddon }] = await Promise.all([
        import('xterm'),
        import('xterm-addon-fit'),
      ])
      if (disposed || !hostRef.current) return

      // Wait for the host to actually have a size before opening the terminal.
      // xterm derives its row and column count from the box it is handed, and a
      // pane built against a zero-height container ends up one row tall with
      // everything written into it thrown away. Grid mounts three panes at the
      // exact moment the layout changes, which is when this bites.
      await new Promise<void>((resolve) => {
        const host = hostRef.current
        if (!host || host.clientHeight > 40) return resolve()
        const wait = new ResizeObserver(() => {
          if (host.clientHeight > 40) {
            wait.disconnect()
            resolve()
          }
        })
        wait.observe(host)
        // Never hang on it: a pane that stays collapsed still gets a terminal,
        // and the resize handler below will repaint it if it ever opens up.
        window.setTimeout(() => {
          wait.disconnect()
          resolve()
        }, 1000)
      })
      if (disposed || !hostRef.current) return

      const term = new Terminal({
        theme: THEME,
        fontFamily: '"SF Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 12,
        lineHeight: 1.35,
        // The blinking block belongs to the input box below the pane, not to the
        // transcript. Two cursors on screen is the tell that this is not a real
        // session.
        cursorBlink: false,
        cursorInactiveStyle: 'none',
        disableStdin: true,
        convertEol: true,
        scrollback: 400,
      })
      const fit = new FitAddon()
      term.loadAddon(fit)
      term.open(hostRef.current)
      term.write(HIDE_CURSOR)
      fit.fit()

      termRef.current = term
      painted.current = { id: -1, count: 0 }

      /**
       * Refit, and replay the transcript whenever the GRID changed.
       *
       * Both dimensions matter, and only watching the rows was a real bug: the
       * text in the buffer is wrapped at the column count it was written with,
       * so a pane that got narrower without losing a row kept its old line
       * breaks and spilled past its container. Zoom the browser and you would
       * see a word split down the middle, half of it clipped off the edge.
       */
      const refit = () => {
        try {
          const wasRows = term.rows
          const wasCols = term.cols
          fit.fit()
          if (term.rows !== wasRows || term.cols !== wasCols) {
            painted.current = { id: -1, count: 0 }
            setResizes((n) => n + 1)
          }
        } catch {
          // A fit during an unmount animation can land on a zero-sized host.
        }
      }

      observer = new ResizeObserver(refit)
      observer.observe(hostRef.current)

      /**
       * Browser zoom does not always resize the host, but it does change how
       * wide a character is, so the grid has to be recomputed from scratch.
       * This is the media query that fires when the device pixel ratio moves,
       * which is what Cmd +/- actually changes.
       */
      const dpr = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      dpr.addEventListener('change', refit)
      cleanupZoom = () => dpr.removeEventListener('change', refit)
      setReady(true)
    })()

    return () => {
      disposed = true
      observer?.disconnect()
      cleanupZoom?.()
      termRef.current?.dispose()
      termRef.current = null
      setReady(false)
    }
  }, [])

  /** Row height in pixels, read from the DOM rather than xterm's internals. */
  const cellHeight = useCallback(() => {
    const row = hostRef.current?.querySelector('.xterm-rows')?.firstElementChild as HTMLElement | null
    return row?.offsetHeight ?? 16
  }, [])

  /** Draw (or redraw in place) the selector, and place the click targets over it. */
  const paintPrompt = useCallback(
    (selected: number, redraw: boolean) => {
      const term = termRef.current
      if (!term || !prompt) return

      const block = renderPrompt(agent, prompt.question, prompt.options, selected, term.cols)
      if (redraw && drawn.current) term.write(rewind(drawn.current.height))
      drawn.current = block

      // xterm parses writes on its own schedule, so the cursor does not move
      // until the data has actually been consumed. Measuring before that
      // callback fires reads the PREVIOUS cursor position, and the click
      // targets land nowhere.
      term.write(block.text, () => {
        const host = hostRef.current
        if (!host) return
        // The block is the last thing written, so its rows end at the cursor.
        const blockTop = term.buffer.active.cursorY - block.height
        const h = cellHeight()
        const padTop = parseFloat(getComputedStyle(host).paddingTop) || 0
        setHitAreas(
          block.optionRows.map((row) => ({
            top: padTop + (blockTop + row.start) * h,
            height: row.height * h,
          }))
        )
        term.scrollToBottom()
      })
    },
    [agent, prompt, cellHeight]
  )

  // Paint only what is new. Switching terminals replays that terminal's whole
  // backlog from scratch, which is also what the app does when you change tab.
  useEffect(() => {
    const term = termRef.current
    if (!term) return

    if (painted.current.id !== terminalId) {
      // Switching terminals REPLAYS the backlog instantly rather than typing it
      // out. Two reasons: a transcript you already saw should be there the
      // moment you land on it, and anything still queued belongs to the terminal
      // you just left, which is what leaked stray characters over the new
      // banner. Stop the typewriter before the reset, not after.
      queue.current = []
      setTyping(false)
      term.reset()
      term.write(HIDE_CURSOR + AGENTS[agent].banner(cwd) + '\r\n\r\n')
      // Trailing blank lines are trimmed before the replay. Every block ends
      // with one for spacing, and in a Grid tile the viewport is only nine rows
      // tall: scrolled to the bottom, those blanks are the whole screen, which
      // is why three of the four tiles looked empty while holding text.
      term.write(chunks.join('').replace(/(\r?\n)+$/, '\r\n'))
      term.scrollToBottom()
      painted.current = { id: terminalId, count: chunks.length }
      drawn.current = null
      return
    }

    if (painted.current.count === chunks.length) return

    // New output has to land ABOVE whatever live block is currently pinned to
    // the bottom, so rewind it first. The block redraws itself on its next tick.
    if (drawn.current) {
      term.write(rewind(drawn.current.height))
      drawn.current = null
    }
    for (let i = painted.current.count; i < chunks.length; i++) {
      queue.current.push(...typeUnits(chunks[i]))
    }
    painted.current.count = chunks.length
    setTyping(true)
  }, [terminalId, agent, cwd, chunks, ready, resizes])

  /**
   * Drains the queue a few units per frame.
   *
   * Deliberately not one character per frame: at 60fps that reads as a stutter
   * rather than as typing, and a long tool result would take a minute to land.
   */
  useEffect(() => {
    if (!typing) return
    const term = termRef.current
    if (!term) return

    // Driven by rAF rather than by setInterval, which matters on a busy machine.
    // An interval insists every 22ms whether or not the last write has been
    // painted, so when the CPU is loaded its callbacks pile up and fight the
    // renderer — that is the stutter. This writes at most once per frame, and
    // when frames come late it carries the backlog into the next one, so the
    // text lands at the same speed with a fraction of the writes.
    let raf = 0
    let last = performance.now()
    let owed = 0

    const step = (now: number) => {
      raf = requestAnimationFrame(step)
      owed += now - last
      last = now
      if (owed < TYPE_TICK_MS) return

      // Cap the catch-up: after a long stall, dumping the whole backlog at once
      // would undo the typing effect entirely.
      const ticks = Math.min(Math.floor(owed / TYPE_TICK_MS), 4)
      owed = 0

      if (queue.current.length === 0) {
        setTyping(false)
        return
      }
      term.write(queue.current.splice(0, UNITS_PER_TICK * ticks).join(''))
      term.scrollToBottom()
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [typing])

  /**
   * Owns the slot at the bottom of the transcript, and draws the selector into
   * it when there is a question.
   *
   * Whatever is down there belongs to the state the agent was in a moment ago,
   * so it comes DOWN before anything else claims the space. Only nulling the
   * reference, as this used to, left the spinner stranded on screen: an agent
   * that had finished or was now asking you something still showed a live
   * counter ticking above the question.
   */
  useEffect(() => {
    if (!ready) return
    const term = termRef.current
    if (term && drawn.current) {
      term.write(rewind(drawn.current.height))
      drawn.current = null
    }
    setHitAreas([])
    // The selector belongs after the text that introduces it, so it waits for
    // the typewriter to finish landing that text.
    if (!prompt || typing) return
    setHighlight(0)
    paintPrompt(0, false)
    // `resizes` is in here because a resize REPLAYS the buffer from the backlog,
    // and the selector is not in the backlog: it is drawn on top of it. Without
    // this dependency the replay wiped the question off the screen and nothing
    // ever put it back, so an agent that was waiting on you looked like an agent
    // that had simply stopped.
    // Redrawing on every highlight change is handled by the keyboard/mouse
    // handlers, so this effect must not depend on `highlight`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, prompt, typing, terminalId, busy, resizes])

  /**
   * The live status block: spinner, activity, elapsed time, tokens and todos.
   *
   * It shares `drawn` with the selector because only one of the two can be at
   * the bottom of the transcript at a time: an agent is either working or
   * waiting on you. Sharing the slot is also what keeps the rewind honest, since
   * whatever is there knows its own height.
   */
  const liveStart = useRef<number>(0)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    if (!ready || !busy || prompt) return
    liveStart.current = performance.now()
    setFrame(0)
    const id = window.setInterval(() => setFrame((f) => f + 1), LIVE_TICK_MS)
    return () => window.clearInterval(id)
  }, [ready, busy, prompt, terminalId, activity])

  useEffect(() => {
    const term = termRef.current
    // While output is still being typed, the bottom of the transcript belongs to
    // the typewriter; drawing the live block there would strand it mid-text as
    // soon as the next unit lands.
    if (!term || !ready || !busy || prompt || typing) return

    const seconds = Math.floor((performance.now() - liveStart.current) / 1000)
    const block = renderLive(
      agent,
      {
        activity,
        seconds,
        // Tokens climb with time so the number never sits still, which is what
        // a real turn looks like.
        tokens: 400 + seconds * 137 + frame * 23,
        todos: (todos ?? []).map((text, i) => ({
          text,
          done: i < todoIndex,
          active: i === todoIndex,
        })),
      },
      frame,
      term.cols
    )

    if (drawn.current) term.write(rewind(drawn.current.height))
    drawn.current = block
    term.write(block.text, () => term.scrollToBottom())
  }, [frame, ready, busy, prompt, typing, agent, activity, todos, todoIndex])

  const move = useCallback(
    (next: number) => {
      if (!prompt) return
      const count = prompt.options.length + 1
      const wrapped = ((next % count) + count) % count
      setHighlight(wrapped)
      paintPrompt(wrapped, true)
    },
    [prompt, paintPrompt]
  )

  useEffect(() => {
    if (!prompt || !keyboardActive) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        move(highlight + 1)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        move(highlight - 1)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        if (highlight < prompt.options.length) onAnswer(highlight)
      } else {
        const digit = Number(event.key)
        if (Number.isInteger(digit) && digit >= 1 && digit <= prompt.options.length) {
          event.preventDefault()
          onAnswer(digit - 1)
        }
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [prompt, keyboardActive, highlight, move, onAnswer])

  return (
    <div className="demo-terminal-host" ref={hostRef} aria-label={`${title} terminal output`}>
      {/* Transparent targets laid over the selector's rows: the options live
          inside the terminal buffer, which cannot receive a click of its own.
          Driven by the OPTIONS, not by the measured areas: switching to an agent
          asking a shorter question would otherwise leave a stale extra target
          pointing at an option that no longer exists. */}
      {prompt?.options.map((option, i) => {
        const area = hitAreas[i]
        if (!area) return null
        return (
          <button
            key={option.label}
            type="button"
            className="demo-prompt-hit"
            style={{ top: area.top, height: area.height }}
            onMouseEnter={() => move(i)}
            onClick={() => onAnswer(i)}
          >
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
