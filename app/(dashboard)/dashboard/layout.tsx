import type { Metadata } from 'next'
import Link from 'next/link'
import DashboardNav from './DashboardNav'
import LogoutButton from './LogoutButton'

export const metadata: Metadata = {
  title: 'Operations - CodeAgentSwarm',
  robots: { index: false, follow: false },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[100dvh] bg-[#090909] text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#111111]/95 backdrop-blur">
        <div className="mx-auto grid min-h-14 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 px-4 py-2 sm:flex sm:px-6 lg:px-8">
          <Link
            href="/dashboard/users"
            className="flex min-w-0 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-400/25 bg-amber-400/10 font-mono text-sm font-bold text-amber-300">
              @
            </span>
            <span className="truncate text-sm font-semibold text-white/90">
              CodeAgentSwarm <span className="font-normal text-white/55">/ Operations</span>
            </span>
          </Link>

          <div className="order-3 col-span-2 w-full sm:order-none sm:ml-auto sm:w-auto">
            <DashboardNav />
          </div>

          <div className="justify-self-end sm:ml-2">
            <LogoutButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
