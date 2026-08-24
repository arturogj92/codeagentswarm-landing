'use client'

/**
 * The loader a terminal shows while it boots, copied from the app's
 * createTerminalLoader(): wordmark, the pulsing isotipo, and two lines of status.
 *
 * The second line matters more than it looks. A worktree is a full git checkout
 * and the agent then takes seconds to start, so the app says what it is waiting
 * on instead of leaving a mute spinner up.
 */
interface Props {
  /** "Loading terminal..." */
  label: string
  /** "Creating worktree...", or empty when there is no worktree to make. */
  status?: string
}

export default function TerminalLoader({ label, status }: Props) {
  return (
    <div className="terminal-loader demo-loader" role="status" aria-live="polite">
      <div style={{ textAlign: 'center' }}>
        <h1 className="terminal-loader-title logo-text">
          <span className="logo-text-code">CODE</span>
          <span className="logo-text-agent">AGENT</span>
          <span className="logo-text-swarm">SWARM</span>
        </h1>

        <div className="loader-spinner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/isotipo.png" alt="" aria-hidden="true" className="loader-spinner-icon" />
        </div>

        <div className="loader-text">{label}</div>
        <div className="loader-status">{status}</div>
      </div>
    </div>
  )
}
