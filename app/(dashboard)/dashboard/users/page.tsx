import type { Metadata } from 'next'
import UsersActivityClient from './UsersActivityClient'

export const metadata: Metadata = {
  title: 'Users - CodeAgentSwarm',
  robots: { index: false, follow: false },
}

export default function UsersPage() {
  return <UsersActivityClient />
}
