import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '@/content/guides/types'

interface FAQAccordionProps {
  items: FAQItem[]
  locale: 'en' | 'es'
}

export default function FAQAccordion({ items, locale }: FAQAccordionProps) {
  if (!items || items.length === 0) return null

  return (
    <section id="faq" className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {locale === 'es' ? 'Preguntas frecuentes' : 'FAQ'}
      </h2>
      <div className="rounded-2xl bg-neutral-950 border border-white/10 p-6">
        {items.map((item, index) => (
          <details key={index} className="group border-b border-white/10 last:border-b-0">
            <summary className="flex items-center justify-between py-4 text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="font-medium text-white group-hover:text-neon-cyan transition-colors pr-4">
                {item.question}
              </span>
              <ChevronDown className="w-5 h-5 text-white/50 transition-transform flex-shrink-0 group-open:rotate-180" />
            </summary>
            <p className="text-white/70 leading-relaxed pb-4">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
