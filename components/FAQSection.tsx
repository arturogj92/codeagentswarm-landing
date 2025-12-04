'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
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
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium text-white group-hover:text-neon-cyan transition-colors pr-4 text-lg">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-48 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-white/70 leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  )
}

export default function FAQSection() {
  const t = useTranslations('faq')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const faqs = [
    { q: t('items.q1'), a: t('items.a1') },
    { q: t('items.q2'), a: t('items.a2') },
    { q: t('items.q3'), a: t('items.a3') },
    { q: t('items.q4'), a: t('items.a4') },
    { q: t('items.q5'), a: t('items.a5') },
    { q: t('items.q6'), a: t('items.a6') },
    { q: t('items.q7'), a: t('items.a7') },
  ]

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900/50 to-black" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 mb-6">
            {t('badge')}
          </span>
          <h2 className="heading-lg mb-4">
            <span className="text-white">{t('titlePre')} </span>
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20" />
          <div className="relative rounded-2xl glass p-8 md:p-10">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.q}
                answer={faq.a}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
