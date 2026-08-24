'use client'

import type { ReactNode } from 'react'
import { useDemoDownload, type DemoDownloadPosition } from './useDemoDownload'

interface Props {
  position: DemoDownloadPosition
  className?: string
  children: ReactNode
}

/**
 * A demo button that downloads the app and reports it as a download.
 *
 * It is a component rather than a bare hook call in each parent because the
 * hook fetches the release list, and the parents bail out early: the homepage
 * section returns null on phones. A hook cannot live behind that return, so a
 * hook called there would fire the request for every phone visitor who never
 * sees the demo at all. Inside a child, it only runs where the link renders.
 */
export default function DemoDownloadLink({ position, className, children }: Props) {
  const download = useDemoDownload(position)
  return (
    <a href={download.href} onClick={download.onClick} className={className}>
      {children}
    </a>
  )
}
