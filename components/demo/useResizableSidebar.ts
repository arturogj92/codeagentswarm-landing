'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const MIN = 220
const MAX = 460
const DEFAULT = 296
/** Drag narrower than this and the list collapses to its rail. */
const COLLAPSE_AT = 200

/**
 * Drag-to-resize for the terminal list, the way the app's sidebar works.
 *
 * The move and release listeners go on the WINDOW rather than the handle: a
 * pointer dragged faster than React re-renders leaves the handle behind, and a
 * release outside the frame would otherwise never arrive, leaving the demo stuck
 * in drag mode.
 */
export function useResizableSidebar(onCollapse?: () => void) {
  const [width, setWidth] = useState(DEFAULT)
  const [dragging, setDragging] = useState(false)
  const origin = useRef({ x: 0, width: DEFAULT })

  const onPointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault()
      origin.current = { x: event.clientX, width }
      setDragging(true)
    },
    [width]
  )

  useEffect(() => {
    if (!dragging) return

    const onMove = (event: PointerEvent) => {
      const next = origin.current.width + (event.clientX - origin.current.x)
      // Dragging past the minimum collapses instead of just stopping, which is
      // the gesture people expect from a sidebar and what the app does.
      if (next < COLLAPSE_AT && onCollapse) {
        setDragging(false)
        setWidth(DEFAULT)
        onCollapse()
        return
      }
      setWidth(Math.max(MIN, Math.min(MAX, next)))
    }
    const stop = () => setDragging(false)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', stop)
    window.addEventListener('pointercancel', stop)
    // A drag that runs over text would otherwise select it across the page.
    const previousSelect = document.body.style.userSelect
    document.body.style.userSelect = 'none'

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', stop)
      window.removeEventListener('pointercancel', stop)
      document.body.style.userSelect = previousSelect
    }
  }, [dragging, onCollapse])

  return { width, dragging, onPointerDown, reset: () => setWidth(DEFAULT) }
}
