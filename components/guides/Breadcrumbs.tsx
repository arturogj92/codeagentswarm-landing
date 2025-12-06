'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  locale: 'en' | 'es'
}

export default function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const homeLabel = locale === 'es' ? 'Inicio' : 'Home'
  const homeHref = `/${locale}`

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-white/60">
        <li className="flex items-center">
          <Link
            href={homeHref}
            className="flex items-center gap-1 hover:text-neon-cyan transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{homeLabel}</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-white/40" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-neon-cyan transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
