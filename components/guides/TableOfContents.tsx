'use client'

import { useState, useEffect } from 'react'
import { List } from 'lucide-react'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
  locale: 'en' | 'es'
}

export default function TableOfContents({ items, locale }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const title = locale === 'es' ? 'Contenido' : 'Contents'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="sticky top-24">
      <div className="flex items-center gap-2 mb-4 text-white/60">
        <List className="w-4 h-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
      </div>
      <ul className="space-y-2 border-l border-white/10 pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                block text-sm transition-all duration-200
                ${item.level === 3 ? 'ml-3 text-xs' : ''}
                ${
                  activeId === item.id
                    ? 'text-neon-cyan font-medium'
                    : 'text-white/60 hover:text-white'
                }
              `}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                  setActiveId(item.id)
                }
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
