'use client'

import { useEffect, useRef, useState } from 'react'
import { AGENT_CHAT, defaultChatConfig } from './chat'
import { AGENT_ICON } from './TerminalRow'
import type { AgentKey, ChatTool, ChatWork, DemoPrompt, DemoTerminal } from './types'

/**
 * The chat view of a session.
 *
 * Every class name here is the app's own, and the stylesheet is the app's own too
 * (components/demo/demo-app.css, generated from chat-panel.css by
 * scripts/sync-demo-css.mjs). So this file only has to produce the same shape of
 * markup; none of the look is re-authored, and a redesign in the app arrives in
 * the demo with one command.
 *
 * What it deliberately does NOT reimplement: markdown, attachments, image
 * annotation, slash commands, diffs, sign-in cards. None of them are visible in
 * the ninety seconds a visitor watches, and each one is a second implementation
 * to keep in sync.
 */

interface Props {
  terminal: DemoTerminal
  /** Answer the agent's pending question. Same handler the terminal uses. */
  onAnswer: (index: number) => void
}

const SVG = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** The glyph leading a work row, picked from its tool category — as in the app. */
function WorkIcon({ tool }: { tool: ChatTool }) {
  switch (tool) {
    case 'reasoning':
      return (
        <svg {...SVG}>
          <path d="M12 2a7 7 0 0 0-4 12.7V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.3A7 7 0 0 0 12 2z" />
          <path d="M9 22h6" />
        </svg>
      )
    case 'command':
      return (
        <svg {...SVG}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      )
    case 'file_read':
      return (
        <svg {...SVG}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )
    case 'file_change':
      return (
        <svg {...SVG}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
        </svg>
      )
    case 'plan':
      return (
        <svg {...SVG}>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <path d="M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      )
    default:
      return (
        <svg {...SVG}>
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
      )
  }
}

function CheckIcon() {
  return (
    <svg {...SVG} strokeWidth={2.2}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg {...SVG} strokeWidth={2.1}>
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  )
}

function PaperclipIcon() {
  return (
    <svg {...SVG}>
      <path d="m21.4 11.6-8.9 8.9a6 6 0 0 1-8.5-8.5l9.6-9.6a4 4 0 0 1 5.7 5.7l-9.6 9.6a2 2 0 0 1-2.8-2.8l8.9-8.9" />
    </svg>
  )
}

function TodoListIcon() {
  return (
    <svg {...SVG} strokeWidth={1.8}>
      <path d="M9 6h12M9 12h12M9 18h12" />
      <path d="m3 6 1.5 1.5L7 5" />
      <path d="m3 12 1.5 1.5L7 11" />
      <circle cx="4.5" cy="18" r="1" />
    </svg>
  )
}

/** Close a popover on outside click and on Escape, the way the app's pickers do. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])
  return ref
}

interface PickerProps {
  className: string
  /** The app's trigger class is NOT `${className}-trigger` — it drops "-picker". */
  triggerClass: string
  trigger: React.ReactNode
  title: string
  options: { id: string; label: string; description?: string }[]
  value: string
  onChange: (id: string) => void
  menuClass: string
  optionClass: string
  dot?: boolean
}

/** The shared body of the model and permission dropdowns. */
function Picker({
  className,
  triggerClass,
  trigger,
  title,
  options,
  value,
  onChange,
  menuClass,
  optionClass,
  dot,
}: PickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useDismiss(open, () => setOpen(false))

  return (
    <div className={className} ref={ref} data-disabled="false">
      <button type="button" className={triggerClass} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {trigger}
        <span className="cas-model-caret" aria-hidden="true">
          ⌄
        </span>
      </button>
      {open && (
        <div className={menuClass} role="listbox" aria-label={title}>
          <div className="cas-model-menu-title">{title}</div>
          {options.map((option) => {
            const active = option.id === value
            return (
              <button
                type="button"
                role="option"
                aria-selected={active}
                key={option.id}
                className={`${optionClass}${active ? ' is-selected' : ''}`}
                onClick={() => {
                  onChange(option.id)
                  setOpen(false)
                }}
              >
                {dot && <span className={`cas-permission-dot is-${option.id}`} aria-hidden="true" />}
                <span className="cas-model-option-copy">
                  <span className="cas-model-option-name">{option.label}</span>
                  {option.description && <span className="cas-model-option-desc">{option.description}</span>}
                </span>
                <span className="cas-model-option-state" aria-hidden="true">
                  {active ? <CheckIcon /> : null}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** One collapsible line of the work log. */
function WorkRow({ row }: { row: ChatWork }) {
  const [open, setOpen] = useState(false)
  const expandable = Boolean(row.input || row.output)

  return (
    <div className="cas-work">
      <button
        type="button"
        className={`cas-wrow${expandable ? ' is-clickable' : ''}`}
        aria-expanded={expandable ? open : undefined}
        onClick={expandable ? () => setOpen((v) => !v) : undefined}
      >
        <span className={`cas-wico${row.status === 'running' ? ' is-running' : ''}`}>
          <WorkIcon tool={row.tool} />
        </span>
        <span className="cas-wlabel">
          <span className="cas-wverb">{row.verb}</span>
          <span className="cas-wtarget">{row.target}</span>
        </span>
        <span className="cas-wtrail">
          {expandable && (
            <span className="cas-chev" aria-hidden="true">
              {open ? '▾' : '▸'}
            </span>
          )}
          {row.status === 'running' ? (
            <span className="cas-st-run">running</span>
          ) : row.status === 'failed' ? (
            <span className="cas-st-fail">✕</span>
          ) : (
            <span className="cas-st-ok">
              <CheckIcon />
            </span>
          )}
        </span>
      </button>
      {open && expandable && (
        <div className="cas-wdetails">
          {row.input && (
            <div className="cas-wsection">
              <div className="cas-wsection-label">Input</div>
              <pre>{row.input}</pre>
            </div>
          )}
          {row.output && (
            <div className="cas-wsection">
              <div className="cas-wsection-label">Output</div>
              <pre>{row.output}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/** The grouped work log, collapsed by default once its steps are done. */
function WorkGroup({ rows }: { rows: ChatWork[] }) {
  const running = rows.filter((row) => row.status === 'running').length
  const [open, setOpen] = useState(running > 0)

  return (
    <section className="cas-work-group">
      <button type="button" className="cas-work-group-summary" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="cas-work-group-chevron" aria-hidden="true">
          ›
        </span>
        <span className="cas-work-group-state">
          {running > 0 && <span className="cas-work-group-running" aria-label="Step running" />}
        </span>
        <span className="cas-work-group-title">Work log</span>
        <span className="cas-work-group-count">{`${rows.length} ${rows.length === 1 ? 'step' : 'steps'}`}</span>
        <span className="cas-work-group-stats">
          <span>{running ? `${running} running` : `${rows.length} completed`}</span>
        </span>
      </button>
      {open && (
        <div className="cas-work-group-details">
          {rows.map((row, index) => (
            <WorkRow key={`${row.verb}-${index}`} row={row} />
          ))}
        </div>
      )}
    </section>
  )
}

/**
 * The agent's checklist, pinned over the composer.
 *
 * Built from the terminal's own `todos` / `todoIndex` rather than from a chat
 * row: the terminal draws the same list under its spinner, and two sources would
 * be two things to keep in step.
 */
function TodoList({ todos, index }: { todos: string[]; index: number }) {
  const [collapsed, setCollapsed] = useState(false)
  const done = Math.min(index, todos.length)
  const percent = todos.length === 0 ? 0 : Math.round((done / todos.length) * 100)

  return (
    <section className={`cas-todos is-pinned${done === todos.length ? ' is-complete' : ''}`}>
      <button
        type="button"
        className="cas-todos-head"
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((v) => !v)}
      >
        <span className="cas-todos-ico" aria-hidden="true">
          <TodoListIcon />
        </span>
        <span className="cas-todos-title">Todos</span>
        <span className="cas-todos-bar" role="progressbar" aria-valuemin={0} aria-valuemax={todos.length} aria-valuenow={done}>
          <i style={{ width: `${percent}%` }} />
        </span>
        <span className="cas-todos-count">{`${done}/${todos.length}`}</span>
        {collapsed && todos[index] && (
          <span className="cas-todos-now" title={todos[index]}>
            {todos[index]}
          </span>
        )}
        <span className="cas-todos-trail">
          <span className="cas-todos-chevron" aria-hidden="true">
            ›
          </span>
        </span>
      </button>
      {!collapsed && (
        <ol className="cas-todos-body">
          {todos.map((step, i) => (
            <li key={step} className={`cas-todo ${i < index ? 'is-done' : i === index ? 'is-active' : 'is-pending'}`}>
              <span className="cas-todo-mark" aria-hidden="true">
                {i < index ? (
                  <svg {...SVG} strokeWidth={2.2}>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : i === index ? (
                  <span className="cas-todo-spin" />
                ) : (
                  <svg {...SVG}>
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                )}
              </span>
              <span className="cas-todo-text">{step}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

/**
 * The agent's question, as a card.
 *
 * Fed by the terminal's `prompt`, so the visitor sees the same question whichever
 * view they are in, and answering it here is the same state change as pressing
 * the number in the terminal.
 */
function QuestionCard({ prompt, agentLabel, onAnswer }: { prompt: DemoPrompt; agentLabel: string; onAnswer: (index: number) => void }) {
  const [picked, setPicked] = useState<number | null>(null)

  return (
    <div className="cas-question">
      <div className="cas-q-head">
        <span className="cas-q-chip">?</span>
        <span className="cas-q-title">{`${agentLabel} has a question`}</span>
      </div>
      <div className="cas-q-block">
        <div className="cas-q-text">{prompt.question}</div>
        {prompt.options.map((option, index) => (
          <button
            type="button"
            key={option.label}
            className={`cas-q-option ${picked === index ? 'is-selected' : ''}`}
            aria-pressed={picked === index}
            onClick={() => setPicked(index)}
          >
            <span className="cas-q-num">{index + 1}</span>
            <span className="cas-q-option-body">
              <span className="cas-q-option-label">{option.label}</span>
              <span className="cas-q-option-desc">{option.description}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="cas-q-actions">
        <button
          type="button"
          className="cas-q-btn is-primary"
          disabled={picked === null}
          onClick={() => picked !== null && onAnswer(picked)}
        >
          Answer
        </button>
      </div>
    </div>
  )
}

export default function ChatPane({ terminal, onAnswer }: Props) {
  const config = AGENT_CHAT[terminal.agent]
  const [settings, setSettings] = useState(() => defaultChatConfig(terminal.agent))
  const scroller = useRef<HTMLDivElement>(null)
  const rows = terminal.chat ?? []
  const working = terminal.status === 'working'

  // A new row should land in view, but only by nudging THIS pane — the demo sits
  // inside a page the visitor is scrolling, and `scrollIntoView` would drag the
  // whole document.
  useEffect(() => {
    const node = scroller.current
    if (node) node.scrollTop = node.scrollHeight
  }, [rows.length, terminal.prompt, terminal.todoIndex])

  // Switching to a terminal with a different CLI has to reset the composer:
  // gpt-5.6-sol is not one of Claude's models.
  useEffect(() => {
    setSettings(defaultChatConfig(terminal.agent))
  }, [terminal.agent])

  const modelLabel =
    config.models.find((model) => model.id === settings.model)?.name ?? config.models[0].name
  const permission =
    config.permissions.find((mode) => mode.id === settings.permission) ?? config.permissions[0]

  return (
    <div className="cas-chat">
      <div className="cas-chat-scroll" ref={scroller}>
        <div className="cas-chat-col">
          {/*
            Before the first message, the same welcome the app shows: brand
            seal, eyebrow, the question, and the identity pill naming which
            agent is about to work in which project. A terminal you just opened
            is a real state of the product, not a gap in the demo.
          */}
          {rows.length === 0 && (
            <div className="cas-empty">
              <span className="cas-empty-brand" aria-hidden="true">
                <img className="cas-empty-brand-flat" src="/isotipo.png" alt="" />
              </span>
              <div className="cas-empty-eyebrow">Chat Mode</div>
              <h1 className="cas-empty-title">What should we work on?</h1>
              <div className="cas-empty-sub">
                Bring an idea, a problem, or a task. Your agent is ready to build alongside you.
              </div>
              <div
                className="cas-empty-identity"
                role="img"
                aria-label={`${AGENT_ICON[terminal.agent].label} in ${terminal.project.name}`}
              >
                <span
                  className="cas-empty-context-part cas-empty-context-agent"
                  title={`Agent: ${AGENT_ICON[terminal.agent].label}`}
                >
                  <span className="cas-empty-agent-mark">
                    <img src={AGENT_ICON[terminal.agent].src} alt="" />
                  </span>
                </span>
                <span className="cas-empty-context-link" aria-hidden="true">
                  in
                </span>
                <span className="cas-empty-context-part" title={`Project: ${terminal.project.name}`}>
                  <span className="cas-empty-project-mark">
                    <img src={terminal.project.icon} alt="" />
                  </span>
                </span>
              </div>
            </div>
          )}

          {rows.map((row) => {
            if (row.kind === 'user') {
              return (
                <div className="cas-user" key={row.id}>
                  <div className="cas-user-bubble">
                    <div>{row.text}</div>
                  </div>
                </div>
              )
            }
            if (row.kind === 'assistant') {
              return (
                <div className="cas-assist" key={row.id}>
                  <div className="cas-chat-prose">
                    {row.text.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )
            }
            return <WorkGroup key={row.id} rows={row.rows} />
          })}

          {terminal.prompt && (
            <QuestionCard
              prompt={terminal.prompt}
              agentLabel={AGENT_ICON[terminal.agent].label}
              onAnswer={onAnswer}
            />
          )}

          {working && !terminal.prompt && (
            <div className="cas-working">
              <span className="cas-dots">
                <i />
                <i />
                <i />
              </span>
              <span>{terminal.activity}</span>
            </div>
          )}
        </div>
      </div>

      <div className="cas-chat-cwrap">
        {/*
          The checklist stands down while a question is on screen. Both are
          pinned above the composer, and in a pane this size the two together
          push the question off the top — the one thing the visitor is being
          asked to read. The list is still in the terminal view, and comes back
          the moment the question is answered.
        */}
        {!terminal.prompt && terminal.todos && terminal.todos.length > 0 && (
          <TodoList todos={terminal.todos} index={terminal.todoIndex ?? 0} />
        )}

        <div className="cas-chat-composer">
          <textarea
            className="cas-chat-input"
            rows={1}
            placeholder={`Message ${AGENT_ICON[terminal.agent].label}…`}
            readOnly
          />
          <div className="cas-chat-cfoot">
            <button type="button" className="cas-attach" aria-label="Attach images or files">
              <PaperclipIcon />
            </button>

            <Picker
              className="cas-model-picker"
              triggerClass="cas-model-trigger"
              menuClass="cas-model-menu"
              optionClass="cas-model-option"
              title="Model"
              trigger={
                <>
                  {/* The agent's own mark, exactly as the app's ModelPicker
                      shows it. It is the one place in the composer that says
                      WHOSE conversation this is, and leaving it out made every
                      agent's chat look identical. */}
                  <span className="cas-model-agent-icon" aria-hidden="true">
                    <img src={AGENT_ICON[terminal.agent].src} alt="" />
                  </span>
                  <span className="cas-model-trigger-label">{modelLabel}</span>
                </>
              }
              options={config.models.map((model) => ({
                id: model.id,
                label: model.name,
                description: model.description,
              }))}
              value={settings.model}
              onChange={(model) => setSettings((s) => ({ ...s, model }))}
            />

            {config.efforts && (
              <>
                <span className="cas-vsep" />
                <label className="cas-gselect-wrap cas-provider-select">
                  <span className="cas-sr-only">Reasoning</span>
                  <select
                    className="cas-gselect"
                    value={settings.effort}
                    onChange={(event) => setSettings((s) => ({ ...s, effort: event.target.value }))}
                  >
                    {config.efforts.map((effort) => (
                      <option key={effort.id} value={effort.id}>
                        {effort.label}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}

            {config.plan && (
              <>
                <span className="cas-vsep" />
                <button
                  type="button"
                  className={`cas-gbtn cas-interaction-mode${settings.plan ? ' is-plan' : ''}`}
                  title={settings.plan ? 'Plan mode: switch back to Build' : 'Build mode: switch to Plan'}
                  onClick={() => setSettings((s) => ({ ...s, plan: !s.plan }))}
                >
                  {settings.plan ? 'Plan' : 'Build'}
                </button>
              </>
            )}

            <span className="cas-vsep" />
            <Picker
              className="cas-permission-picker"
              triggerClass="cas-permission-trigger"
              menuClass="cas-permission-menu"
              optionClass="cas-permission-option"
              title="Permissions for this conversation"
              dot
              trigger={
                <>
                  <span className={`cas-permission-dot is-${permission.id}`} aria-hidden="true" />
                  <span>{permission.label}</span>
                </>
              }
              options={config.permissions}
              value={settings.permission}
              onChange={(mode) => setSettings((s) => ({ ...s, permission: mode }))}
            />

            <button type="button" className="cas-send" aria-label="Send">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
