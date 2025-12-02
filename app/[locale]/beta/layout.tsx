import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodeAgentSwarm Open Beta – Free Pro Access for Developers',
  description: 'Join the open beta, get the full Pro tier for free, and help shape the future of multi-agent coding workflows.',
}

export default function BetaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
