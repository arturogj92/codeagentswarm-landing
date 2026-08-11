'use client'

// The loader's own styles live in the extracted app CSS (.terminal-loader,
// .logo-text), so both sheets are needed even though nothing else here is.
import './demo-app.css'
import './demo-shell.css'

/**
 * What fills the Mac's screen while the demo's own bundle is still downloading.
 *
 * It carries the SAME variant class as the real thing, so the frame is already
 * the right height before the demo arrives. Without that the lid renders around
 * an empty box and then snaps to size, which is the squashed look you get on a
 * cold load.
 *
 * The loader inside is the app's, so the wait reads as the product starting up
 * rather than as a web page still fetching itself.
 */
export default function DemoBooting({
  variant = 'embedded',
  label,
}: {
  variant?: 'embedded' | 'full'
  label: string
}) {
  return (
    <div className={`cas-demo demo-root demo-${variant}`} data-theme="dark">
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
          <div className="loader-status" />
        </div>
      </div>
    </div>
  )
}
