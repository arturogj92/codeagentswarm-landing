'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const ITEMS = [
  { href: '/dashboard/users', label: 'Users' },
  { href: '/dashboard/realtime', label: 'Real-time activity' },
  { href: '/dashboard/emails', label: 'Emails' },
  { href: '/dashboard/emails/automation', label: 'Automation' },
  { href: '/dashboard/cloudflare', label: 'Cloudflare' },
]

function isCurrent(pathname: string, href: string): boolean {
  if (href === '/dashboard/emails') {
    return pathname.startsWith(href) && !pathname.startsWith('/dashboard/emails/automation')
  }
  return pathname.startsWith(href)
}

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Operations" className="grid min-w-0 grid-cols-2 gap-1 sm:flex">
      {ITEMS.map((item) => {
        const current = isCurrent(pathname, item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? 'page' : undefined}
            className={`min-w-0 rounded-lg px-2.5 py-1.5 text-center text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] sm:px-3 ${
              current
                ? 'bg-amber-400/12 text-amber-300'
                : 'text-white/50 hover:bg-white/[0.05] hover:text-white/80'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
