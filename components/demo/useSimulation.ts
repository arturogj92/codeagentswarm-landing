'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import type {
  AgentKey,
  ChatRow,
  DemoEvent,
  DemoProject,
  DemoScript,
  DemoTerminal,
  PaneMode,
  SimulationState,
} from './types'

/** How long the visitor keeps the wheel after touching something. */
const HANDOVER_MS = 15_000
/**
 * Terminals do not all exist at second zero: they drop in one after another so
 * the visitor watches the workspace assemble instead of arriving at a finished
 * picture. This is the gap between arrivals.
 */
const BOOT_STAGGER_MS = 260

interface Options {
  /** False while the demo is off-screen, so an unseen page costs nothing. */
  active: boolean
}

interface Simulation extends SimulationState {
  /** True while the script is driving. False while the visitor is. */
  autoplay: boolean
  /** Focus a terminal by hand. Takes the wheel from the script. */
  select: (id: number) => void
  /** Answer a blocked agent's question, sending it back to work. */
  answer: (id: number, optionIndex: number) => void
  /** Open a fresh terminal, as the Run button does. Returns its id. */
  open: (agent: AgentKey, project: DemoProject) => number
  /** Close a terminal, as the × on its row does. */
  close: (id: number) => void
  /** Flip one terminal between the chat view and the raw CLI. */
  setMode: (id: number, mode: PaneMode) => void
  /**
   * Ref for the progress hairline's element. The loop writes its transform
   * directly instead of going through state — see the tick for why.
   */
  progressEl: MutableRefObject<HTMLDivElement | null>
}

function initialState(script: DemoScript): SimulationState {
  return {
    terminals: script.terminals.map((t) => ({ ...t })),
    selectedId: script.initialSelection,
    screens: Object.fromEntries(script.terminals.map((t) => [t.id, [...(t.backlog ?? [])]])),
  }
}

/**
 * Replays the script against an in-memory state machine.
 *
 * The clock is driven by requestAnimationFrame rather than an interval on
 * purpose: browsers freeze rAF on hidden tabs, so a backgrounded landing page
 * stops burning CPU without any bookkeeping of our own.
 */
export function useSimulation(script: DemoScript, { active }: Options): Simulation {
  const [state, setState] = useState<SimulationState>(() => initialState(script))
  const [autoplay, setAutoplay] = useState(true)

  /** Index of the next event to apply. */
  const cursor = useRef(0)
  /** Script time already consumed, kept across pauses so scrolling away does not skip ahead. */
  const elapsed = useRef(0)
  const lastFrame = useRef<number | null>(null)
  /**
   * The hairline's DOM node. Written to directly by the loop.
   *
   * It used to be React state. That made a three-pixel bar the most expensive
   * thing on the page: every update re-rendered the whole demo — nine terminal
   * rows, the pane, the composer — and it updated on every frame. Throttling it
   * to 10/s helped; writing a transform straight to the node removes the
   * re-render entirely, and a transform is composited on the GPU without
   * touching layout.
   */
  const progressEl = useRef<HTMLDivElement | null>(null)
  const paintProgress = (value: number) => {
    if (progressEl.current) progressEl.current.style.transform = `scaleX(${value})`
  }
  /** Wall-clock deadline after which the script takes the wheel back. */
  const handoverUntil = useRef(0)
  /**
   * Mirror of `autoplay` for the animation loop. Reading the state variable there
   * would put it in the effect's dependencies, and the effect also writes it, so
   * every handover would tear down and rebuild the rAF loop mid-flight.
   */
  const autoplayRef = useRef(true)
  /**
   * How many of the script's terminals have arrived. Kept in a ref as well as in
   * state for the same reason as autoplay: the animation loop reads it every
   * frame and must not be a dependency of its own effect.
   */
  // Starts at 1, not 0: the pane always needs a terminal to show, and a frame
  // with none would render the demo with an empty right-hand side.
  const [booted, setBooted] = useState(1)
  const bootedRef = useRef(1)

  const events = useMemo(
    () => [...script.events].sort((a, b) => a.at - b.at),
    [script]
  )

  const applyEvent = useCallback((prev: SimulationState, event: DemoEvent, scriptDriving: boolean): SimulationState => {
    switch (event.kind) {
      case 'status':
        return {
          ...prev,
          terminals: prev.terminals.map((t) => (t.id === event.id ? { ...t, status: event.status } : t)),
        }
      case 'activity':
        return {
          ...prev,
          terminals: prev.terminals.map((t) => (t.id === event.id ? { ...t, activity: event.text } : t)),
        }
      case 'goal':
        return {
          ...prev,
          terminals: prev.terminals.map((t) => (t.id === event.id ? { ...t, goal: event.text } : t)),
        }
      case 'notify':
        return {
          ...prev,
          terminals: prev.terminals.map((t) => (t.id === event.id ? { ...t, notified: event.on } : t)),
        }
      case 'ask':
        return {
          ...prev,
          terminals: prev.terminals.map((t) => (t.id === event.id ? { ...t, prompt: event.prompt } : t)),
        }
      case 'todo':
        return {
          ...prev,
          terminals: prev.terminals.map((t) => (t.id === event.id ? { ...t, todoIndex: event.index } : t)),
        }
      case 'write':
        return {
          ...prev,
          screens: { ...prev.screens, [event.id]: [...(prev.screens[event.id] ?? []), event.text] },
        }
      case 'chat':
        return {
          ...prev,
          terminals: prev.terminals.map((t) =>
            t.id === event.id ? { ...t, chat: [...(t.chat ?? []), event.row] } : t
          ),
        }
      case 'select':
        // The one event the visitor can veto: while they are steering, the script
        // must not yank the view to another terminal mid-read.
        return scriptDriving ? { ...prev, selectedId: event.id } : prev
      default:
        return prev
    }
  }, [])

  useEffect(() => {
    if (!active) {
      lastFrame.current = null
      return
    }

    let raf = 0

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)

      if (lastFrame.current === null) {
        lastFrame.current = now
        return
      }
      const delta = now - lastFrame.current
      lastFrame.current = now

      // A tab that was hidden comes back with a huge delta. Clamping keeps the
      // loop from fast-forwarding through half the script on return.
      elapsed.current += Math.min(delta, 250)

      const scriptDriving = now >= handoverUntil.current
      if (autoplayRef.current !== scriptDriving) {
        autoplayRef.current = scriptDriving
        setAutoplay(scriptDriving)
      }

      if (elapsed.current >= script.duration) {
        elapsed.current = 0
        cursor.current = 0
        setState(initialState(script))
        paintProgress(0)
        // The workspace assembles again on every loop, so a visitor who arrives
        // mid-cycle still gets to see it happen.
        bootedRef.current = 1
        setBooted(1)
        return
      }

      paintProgress(elapsed.current / script.duration)

      // Reveal one more terminal every BOOT_STAGGER_MS until they are all in.
      const shouldShow = Math.min(
        script.terminals.length,
        Math.floor(elapsed.current / BOOT_STAGGER_MS) + 1
      )
      if (shouldShow !== bootedRef.current) {
        bootedRef.current = shouldShow
        setBooted(shouldShow)
      }

      const due: DemoEvent[] = []
      while (cursor.current < events.length && events[cursor.current].at <= elapsed.current) {
        due.push(events[cursor.current])
        cursor.current += 1
      }
      if (due.length === 0) return

      setState((prev) => due.reduce((acc, event) => applyEvent(acc, event, scriptDriving), prev))
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lastFrame.current = null
    }
  }, [active, applyEvent, events, script])

  /** Hand control to the visitor for a while. */
  const takeOver = useCallback(() => {
    handoverUntil.current = performance.now() + HANDOVER_MS
    autoplayRef.current = false
    setAutoplay(false)
  }, [])

  const select = useCallback(
    (id: number) => {
      takeOver()
      setState((prev) => ({ ...prev, selectedId: id }))
    },
    [takeOver]
  )

  /**
   * The one place a visitor changes the outcome rather than the view: picking an
   * option clears the block, writes the agent's reply and sends it back to work.
   */
  const answer = useCallback(
    (id: number, optionIndex: number) => {
      takeOver()
      setState((prev) => {
        const terminal = prev.terminals.find((t) => t.id === id)
        const option = terminal?.prompt?.options[optionIndex]
        if (!option) return prev
        // The chat has to record the exchange too: which option was picked, and
        // what the agent said back. Otherwise answering from the chat made the
        // card vanish and left no trace of the decision in the transcript.
        const answered: ChatRow[] = [
          { id: `ans-${id}-${optionIndex}`, kind: 'user', text: option.label },
          ...(option.chatReply
            ? [{ id: `rep-${id}-${optionIndex}`, kind: 'assistant' as const, text: option.chatReply }]
            : []),
        ]
        return {
          ...prev,
          terminals: prev.terminals.map((t) =>
            t.id === id
              ? {
                  ...t,
                  chat: [...(t.chat ?? []), ...answered],
                  prompt: undefined,
                  status: 'working',
                  notified: false,
                  activity: option.activity,
                  // Answering unblocks the step the agent was stuck on, so its
                  // task list moves on with it.
                  todoIndex: Math.min((t.todoIndex ?? 0) + 1, Math.max(0, (t.todos?.length ?? 1) - 1)),
                }
              : t
          ),
          screens: { ...prev.screens, [id]: [...(prev.screens[id] ?? []), option.reply] },
        }
      })
    },
    [takeOver]
  )

  /**
   * Open a fresh terminal on a project, the way Run does in the app.
   *
   * The id is computed OUTSIDE the state updater and returned, so the caller can
   * show the boot loader over the right pane. Deriving it inside would leave the
   * caller with nothing to point at, and React may run an updater more than once.
   */
  const nextId = useRef(1000)
  const open = useCallback(
    (agent: AgentKey, project: DemoProject) => {
      takeOver()
      const id = (nextId.current += 1)
      setState((prev) => {
        const terminal: DemoTerminal = {
          id,
          title: `${project.name} terminal`,
          goal: '',
          activity: 'Waiting for your first instruction',
          project,
          agent,
          // A terminal nobody has given work to is Idle, not Working: the app
          // makes the same distinction, and it is why a new row does not
          // pretend to be busy.
          status: 'idle',
          elapsed: 'now',
        }
        return {
          ...prev,
          terminals: [...prev.terminals, terminal],
          selectedId: id,
          screens: { ...prev.screens, [id]: [] },
        }
      })
      return id
    },
    [takeOver]
  )

  /**
   * Chat ⇄ Terminal, per terminal rather than globally: the two views are the
   * same session seen two ways, and which one you want depends on what that
   * agent is doing right now.
   */
  const setMode = useCallback(
    (id: number, mode: PaneMode) => {
      takeOver()
      setState((prev) => ({
        ...prev,
        terminals: prev.terminals.map((t) => (t.id === id ? { ...t, mode } : t)),
      }))
    },
    [takeOver]
  )

  const close = useCallback(
    (id: number) => {
      takeOver()
      setState((prev) => {
        // Never leave the pane pointing at a terminal that is gone.
        const remaining = prev.terminals.filter((t) => t.id !== id)
        if (remaining.length === 0) return prev
        return {
          ...prev,
          terminals: remaining,
          selectedId: prev.selectedId === id ? remaining[0].id : prev.selectedId,
        }
      })
    },
    [takeOver]
  )

  /**
   * Terminals the visitor can see. Anything the script opened later (Run, a
   * shortcut) is always visible: it did not come from the boot sequence, and
   * hiding it would make the button look broken.
   */
  const scripted = new Set(script.terminals.map((t) => t.id))
  const terminals = state.terminals.filter(
    (terminal, index) => !scripted.has(terminal.id) || index < booted
  )

  return { ...state, terminals, autoplay, select, answer, open, close, setMode, progressEl }
}
