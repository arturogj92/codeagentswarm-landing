'use client'

import { useTranslations } from 'next-intl'
import ChatPane from './ChatPane'
import TerminalLoader from './TerminalLoader'
import TerminalPane from './TerminalPane'
import { AGENTS } from './agents'
import type { DemoTerminal, PaneMode } from './types'

/**
 * One terminal: header, transcript, input box and status line.
 *
 * Pulled out of DemoApp so Grid can mount several of them. Each one owns a live
 * xterm instance, which is the whole point of Grid and also its cost.
 */
interface Props {
  terminal: DemoTerminal
  chunks: string[]
  /** True while this terminal is still starting up. */
  booting: boolean
  /** Bound only for the focused terminal, so keys go to one place. */
  keyboardActive: boolean
  onAnswer: (index: number) => void
  /** Grid marks the focused panel and lets you click another to focus it. */
  focused?: boolean
  onFocus?: () => void
  /** Flip this pane between the chat view and the raw CLI. */
  onMode: (mode: PaneMode) => void
}

export default function TerminalPanel({
  terminal,
  chunks,
  booting,
  keyboardActive,
  onAnswer,
  focused,
  onFocus,
  onMode,
}: Props) {
  const t = useTranslations('interactiveDemo')
  const cwd = `~/code/${terminal.project.name}`
  const skin = AGENTS[terminal.agent]
  // Chat unless this terminal was explicitly switched: it is the view someone
  // who has never opened a coding CLI can actually read, and the tools, the task
  // list and the questions are all legible in it.
  const chat = (terminal.mode ?? 'chat') === 'chat'

  return (
    <div
      className={`demo-terminal-panel${focused ? ' is-focused' : ''}${chat ? ' is-chat' : ''}`}
      onClick={onFocus}
      role={onFocus ? 'button' : undefined}
      tabIndex={onFocus ? 0 : undefined}
    >
      <div className="demo-terminal-header">
        <span className="demo-terminal-title">{terminal.title}</span>
        <span className="demo-terminal-path">{cwd}</span>
        {/*
          One switch, in the header, for both directions.

          It started as an overlay pinned inside the chat pane — which is where
          it sits in the app — and the notification toasts land in exactly that
          corner and swallowed the click. In the header there is nothing to
          collide with, and the control does not move when the view flips.
        */}
        <button
          type="button"
          className="demo-mode-switch"
          title={chat ? 'Open in Terminal view' : 'Open in Chat view'}
          aria-label={chat ? 'Open in Terminal view' : 'Open in Chat view'}
          onClick={(event) => {
            event.stopPropagation()
            onMode(chat ? 'terminal' : 'chat')
          }}
        >
          {chat ? (
            // Lucide `panel-bottom-open`, the glyph the app's own Terminal-view
            // button uses. A different icon would teach the wrong control.
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M3 15h18" />
              <path d="m9 10 3-3 3 3" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>

      {chat ? (
        <div className="demo-pane-stack">
          {booting && <TerminalLoader label={t('loading')} status={t('loadingWorktree')} />}
          <ChatPane terminal={terminal} onAnswer={onAnswer} />
        </div>
      ) : (
        <>
      <div className="demo-pane-stack">
        {booting && <TerminalLoader label={t('loading')} status={t('loadingWorktree')} />}
        <TerminalPane
          terminalId={terminal.id}
          agent={terminal.agent}
          title={terminal.title}
          cwd={cwd}
          chunks={chunks}
          prompt={terminal.prompt}
          onAnswer={onAnswer}
          keyboardActive={keyboardActive}
          activity={terminal.activity}
          todos={terminal.todos}
          todoIndex={terminal.todoIndex}
          busy={terminal.status === 'working'}
        />
      </div>

      {/* The input box and status line every CLI pins under its transcript. */}
      <div className="demo-terminal-input">
        <span className="demo-input-caret" dangerouslySetInnerHTML={{ __html: ansiToHtml(skin.prompt) }} />
        <span className="demo-input-cursor" />
      </div>
      <div className="demo-terminal-footer" dangerouslySetInnerHTML={{ __html: ansiToHtml(skin.footer) }} />
        </>
      )}
    </div>
  )
}

/**
 * The agent footers are authored as ANSI so they live next to the rest of each
 * CLI's skin. Outside the terminal they need to become markup, and only the
 * truecolor/bold/italic/reset sequences this project emits are handled. The
 * input is ours, never a visitor's, so there is nothing here to escape.
 */
function ansiToHtml(input: string): string {
  return input
    .replace(/\[38;2;(\d+);(\d+);(\d+)m/g, (_m, r, g, b) => `<span style="color:rgb(${r},${g},${b})">`)
    .replace(/\[1m/g, '<span style="font-weight:600">')
    .replace(/\[3m/g, '<span style="font-style:italic">')
    .replace(/\[0m/g, '</span>')
}
