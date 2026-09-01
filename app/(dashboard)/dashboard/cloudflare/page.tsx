import type { Metadata } from 'next'
import CloudflareUsageClient from './CloudflareUsageClient'

export const metadata: Metadata = {
  title: 'Cloudflare usage - CodeAgentSwarm',
  robots: { index: false, follow: false },
}

export default function CloudflareUsagePage() {
  return <CloudflareUsageClient />
}
