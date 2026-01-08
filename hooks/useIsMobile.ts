'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect if the device is mobile based on screen width.
 * Used to disable heavy animations and effects on mobile for better performance.
 *
 * Returns false during SSR to avoid hydration mismatch.
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkIsMobile()

    // Listen for resize events with debounce for performance
    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkIsMobile, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [breakpoint])

  return isMobile
}

/**
 * Hook to detect if user prefers reduced motion.
 * Respects system accessibility settings.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Combined hook for performance optimization.
 * Returns true if animations should be reduced (mobile or reduced motion preference).
 */
export function useShouldReduceMotion(): boolean {
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()

  return isMobile || prefersReducedMotion
}
