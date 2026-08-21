import type { Metadata } from 'next'
import RealtimeActivityClient from './RealtimeActivityClient'

export const metadata: Metadata = {
  title: 'Real-time activity - CodeAgentSwarm',
  robots: { index: false, follow: false },
}

export default function RealtimeActivityPage() {
  return <RealtimeActivityClient />
}
