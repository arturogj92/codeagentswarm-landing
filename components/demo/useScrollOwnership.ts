'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Elements inside the demo that are allowed to own the wheel.
 *
 * Deliberately NOT the terminal itself. Its viewport is a scroller with a
 * backlog, so it can almost always scroll up, which means a visitor scrolling
 * back up the page over the big pane would never get past the demo. The
 * terminal here is a moving picture, not a document you browse; the lists are.
 */
const SCROLLERS = '.terminal-tabs, .quota-popover, .demo-launcher-list'

/** A scroller at its end reports scrollTop within a pixel of the boundary. */
const EDGE = 1

function canScroll(element: Element, delta: number): boolean {
  if (delta < 0) return element.scrollTop > EDGE
  return element.scrollTop + element.clientHeight < element.scrollHeight - EDGE
}

/** Wheel deltas come in three units; the page only understands pixels. */
function toPixels(event: WheelEvent): number {
  if (event.deltaMode === 1) return event.deltaY * 16 // lines
  if (event.deltaMode === 2) return event.deltaY * window.innerHeight // pages
  return event.deltaY
}

/**
 * Decides, per wheel event, whether the demo or the page gets to scroll.
 *
 * The browser's own answer is "whoever is under the pointer, for the whole
 * gesture". That is why the demo felt sticky: the terminal list would take a
 * flick, hit its end, and then swallow the rest of the flick in silence. The
 * page only moved once you lifted your fingers and started again, which reads
 * as the page being stuck rather than as the list being finished.
 *
 * So we answer it ourselves, on every event: an inner list keeps the wheel only
 * while it can still move in that direction, and the moment it cannot the page
 * takes over mid-gesture. Nothing to lift, nothing to aim around.
 */
export function useScrollOwnership(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const onWheel = (event: WheelEvent) => {
      // A horizontal flick (the tab strip) is none of our business.
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

      let node = event.target as Element | null
      while (node && node !== root) {
        if (node.matches?.(SCROLLERS) && canScroll(node, event.deltaY)) return
        node = node.parentElement
      }

      // Nothing inside wants it. Hand it to the page before the inner scroller
      // or xterm's own handler can claim it, and scroll the page by hand:
      // preventDefault alone would just drop the event on the floor.
      event.preventDefault()
      event.stopPropagation()
      // 'instant' is not a detail: globals.css puts `scroll-behavior: smooth` on
      // <html>, so the default would start an ANIMATION per wheel event, and the
      // next event a dozen milliseconds later would cancel it half-finished. A
      // twenty-event flick then travels about one event's worth, which feels
      // exactly like the page refusing to move.
      window.scrollBy({ top: toPixels(event), behavior: 'instant' })
    }

    // Capture, so we decide before xterm's viewport does. Not passive, because
    // the whole point is being able to preventDefault.
    root.addEventListener('wheel', onWheel, { capture: true, passive: false })
    return () => root.removeEventListener('wheel', onWheel, { capture: true })
  }, [rootRef])
}
