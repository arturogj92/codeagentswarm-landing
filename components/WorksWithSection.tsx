'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function WorksWithSection() {
  const locale = useLocale()
  const es = locale === 'es'
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const g = (en: string, esp: string) => (es ? esp : en)
  const guidePath = (enSlug: string, esSlug: string) =>
    es ? `/es/guias/${esSlug}` : `/en/guides/${enSlug}`

  const tools = [
    {
      name: 'Claude Code',
      desc: g(
        'Run several Claude Code sessions in parallel, each on its own task.',
        'Ejecuta varias sesiones de Claude Code en paralelo, cada una en su tarea.'
      ),
      href: guidePath('run-multiple-claude-code-sessions', 'ejecutar-multiples-sesiones-claude-code'),
      icon: '/icons/apps/claude-icon.svg',
    },
    {
      name: 'Codex CLI',
      desc: g(
        'Spin up a Codex agent swarm in full-auto, supervised from one place.',
        'Monta un enjambre de agentes Codex en full-auto, supervisado desde un solo sitio.'
      ),
      href: guidePath('codex-agent-swarm', 'enjambre-de-agentes-codex'),
      icon: '/icons/apps/codex-icon.svg',
    },
    {
      name: 'Gemini CLI',
      desc: g(
        'Run a Gemini agent swarm with its large context window, in parallel.',
        'Ejecuta un enjambre de agentes Gemini con su gran contexto, en paralelo.'
      ),
      href: guidePath('gemini-agent-swarm', 'enjambre-de-agentes-gemini'),
      icon: '/icons/apps/gemini-icon.svg',
    },
  ]

  const umbrellaHref = guidePath('ai-cli-agent-swarm', 'enjambre-de-agentes-cli-ia')

  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 mb-6">
            {g('Works with', 'Funciona con')}
          </span>
          <h2 className="heading-lg mb-4">
            <span className="text-white">{g('Run a swarm of ', 'Monta un enjambre de ')}</span>
            <span className="gradient-text">{g('AI coding agents', 'agentes de código IA')}</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {g(
              'One workspace for Claude Code, Codex CLI and Gemini CLI. Run them in parallel, mix vendors, and watch all of them from one place.',
              'Un espacio de trabajo para Claude Code, Codex CLI y Gemini CLI. Ejecútalos en paralelo, mezcla proveedores y vigílalos todos desde un sitio.'
            )}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <Link
                href={tool.href}
                className="group block h-full rounded-2xl glass border border-white/10 p-6 transition-colors hover:border-neon-cyan/40"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <img src={tool.icon} alt="" aria-hidden="true" className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {tool.name}
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">{tool.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-neon-cyan">
                  {g('Read the guide', 'Ver la guía')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href={umbrellaHref}
            className="inline-flex items-center gap-2 text-white/80 hover:text-neon-cyan transition-colors font-medium"
          >
            {g('See how an AI CLI agent swarm works', 'Mira cómo funciona un enjambre de agentes CLI de IA')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
