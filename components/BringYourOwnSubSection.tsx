'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLocale } from 'next-intl'
import { Check } from 'lucide-react'

export default function BringYourOwnSubSection() {
  const locale = useLocale()
  const es = locale === 'es'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const g = (en: string, esp: string) => (es ? esp : en)

  const agents = [
    { name: 'Claude Code', command: 'claude', icon: '/icons/apps/claude-icon.svg' },
    { name: 'Codex CLI', command: 'codex', icon: '/icons/apps/codex-icon.svg' },
    { name: 'Antigravity CLI', command: 'agy', icon: '/icons/apps/antigravity-icon.png' },
    { name: 'opencode', command: 'opencode', icon: '/icons/apps/opencode-icon.svg' },
    { name: 'Kimi Code', command: 'kimi', icon: '/icons/apps/kimi-icon.png' },
    { name: 'Grok Build', command: 'grok', icon: '/icons/apps/grok-icon.svg' },
  ]

  const claims = [
    g('No keys resold. No quota caps.', 'Sin claves revendidas. Sin límites nuestros.'),
    g('Mix vendors in the same swarm.', 'Mezcla proveedores en el mismo enjambre.'),
    g('Runs local. Your code never leaves your machine.', 'Todo local. Tu código no sale de tu máquina.'),
  ]

  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 mb-6">
            {g('Bring your own sub', 'Trae tu propia suscripción')}
          </span>
          <h2 className="heading-lg mb-5 max-w-3xl">
            <span className="text-white">{g("We don't resell tokens. ", 'No revendemos tokens. ')}</span>
            <span className="gradient-text">{g('You keep your plan.', 'Tu plan sigue siendo tuyo.')}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            {g(
              'Plug in the agents you already pay for. CodeAgentSwarm runs them on your machine, with your credentials, and orchestrates the whole swarm from one window.',
              'Conecta los agentes que ya pagas. CodeAgentSwarm los ejecuta en tu máquina, con tus credenciales, y orquesta todo el enjambre desde una sola ventana.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mt-11">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex items-center gap-3 rounded-2xl glass border border-white/10 p-4 transition-colors hover:border-neon-cyan/40"
            >
              <img src={agent.icon} alt="" aria-hidden="true" className="w-7 h-7 shrink-0 object-contain" />
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-white leading-tight">{agent.name}</div>
                <div className="text-xs text-neon-cyan/70 font-mono mt-1">{agent.command}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mt-7 h-px bg-gradient-to-r from-neon-cyan/35 via-white/[0.06] to-transparent" />
          <div className="flex flex-wrap gap-x-10 gap-y-3 mt-6">
            {claims.map(claim => (
              <div key={claim} className="flex items-center gap-2.5 text-white/70">
                <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                <span>{claim}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
