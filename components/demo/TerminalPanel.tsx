'use client'

import { useTranslations } from 'next-intl'
import TerminalLoader from './TerminalLoader'
import TerminalPane from './TerminalPane'
import { AGENTS } from './agents'
import type { DemoTerminal } from './types'

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
}

export default function TerminalPanel({
  terminal,
  chunks,
  booting,
  keyboardActive,
  onAnswer,
  focused,
  onFocus,
}: Props) {
  const t = useTranslations('interactiveDemo')
  const cwd = `~/code/${terminal.project.name}`
  const skin = AGENTS[terminal.agent]

  return (
    <div
      className={`demo-terminal-panel${focused ? ' is-focused' : ''}`}
      onClick={onFocus}
      role={onFocus ? 'button' : undefined}
      tabIndex={onFocus ? 0 : undefined}
    >
      <div className="demo-terminal-header">
        <span className="demo-terminal-title">{terminal.title}</span>
        <span className="demo-terminal-path">{cwd}</span>
      </div>

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
