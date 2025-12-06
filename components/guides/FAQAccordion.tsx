'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '@/content/guides/types'

interface FAQAccordionProps {
  items: FAQItem[]
  locale: 'en' | 'es'
}

function FAQItemComponent({
  item,
  index,
}: {
  item: FAQItem
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border-b border-white/10 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-medium text-white group-hover:text-neon-cyan transition-colors pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-white/50 transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-white/70 leading-relaxed">{item.answer}</p>
      </div>
    </motion.div>
  )
}

export default function FAQAccordion({ items, locale }: FAQAccordionProps) {
  const title = locale === 'es' ? 'Preguntas frecuentes' : 'FAQ'

  if (!items || items.length === 0) return null

  return (
    <section id="faq" className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>
      <div className="relative">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20" />
        <div className="relative rounded-2xl glass p-6">
          {items.map((item, index) => (
            <FAQItemComponent key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
