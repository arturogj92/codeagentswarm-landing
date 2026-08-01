'use client'

import type { ReactNode } from 'react'
import MacMenuBar from './MacMenuBar'
import './mac-frame.css'

/**
 * A MacBook around the demo.
 *
 * Drawn entirely in CSS rather than with an image: a device mockup is one of the
 * few things on a landing page that a visitor looks at closely, and a PNG bezel
 * either blurs on a retina screen or costs half a megabyte to avoid it. Borders
 * and gradients stay sharp at any size and cost nothing.
 *
 * The screen itself is a plain slot, so everything inside keeps working exactly
 * as it did before the frame existed.
 */
export default function MacFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mac-frame">
      <div className="mac-lid">
        {/* The notch cuts INTO the screen, as it does on the real machine. The
            strip it sits on is the demo's equivalent of the menu bar: black,
            empty, and there precisely so the notch has somewhere to be without
            covering the app's toolbar. */}
        <div className="mac-screen">
          <MacMenuBar />
          {children}
        </div>
      </div>
      {/* The wedge under the lid, plus the notch where a thumb opens it. */}
      <div className="mac-base" aria-hidden="true">
        <span className="mac-base-notch" />
      </div>
      {/* Contact shadow: what makes it sit on a surface instead of float. */}
      <div className="mac-shadow" aria-hidden="true" />
    </div>
  )
}
