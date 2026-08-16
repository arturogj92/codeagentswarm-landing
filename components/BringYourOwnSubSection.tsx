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
    { name: 'Cursor Agent', command: 'cursor-agent', icon: '/icons/apps/cursor-icon.svg' },
  ]

  /**
   * Three claims, one line, on purpose.
   *
   * They used to carry a second sentence each and came to 1163px inside a
   * 1152px row, so the third one dropped to a line of its own and sat there
   * looking abandoned. Cutting the second sentences fixed the wrap and read
   * better anyway: "your plan's limits" already says we add none.
   */
  const claims = [
    // Positive form of the same fact: the old "no keys resold" made the reader
    // stop to picture a company that does resell keys.
    g("Your plan's limits, not ours.", 'Tus límites son los de tu plan.'),
    g('Mix vendors in the same swarm.', 'Mezcla proveedores en el mismo enjambre.'),
    g(
      'CodeAgentSwarm never receives or stores your code.',
      'CodeAgentSwarm no recibe ni almacena tu código.'
    ),
  ]

  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Centred, like every other section header on the page. This one was
            the only left-aligned block on the home, which is what made it read
            as pasted in from somewhere else: the badge, the heading and the
            paragraph all started on a margin nothing else uses. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 mb-6">
            {g('Bring your own sub', 'Trae tu propia suscripción')}
          </span>
          {/* Says the thing plainly. The headline used to open with "we don't
              resell tokens", which plants a suspicion the visitor did not
              arrive with and then denies it - the reader has to work out what
              reselling tokens even means before the sentence pays off. */}
          <h2 className="heading-lg mb-4">
            <span className="text-white">{g('Works with ', 'Funciona con ')}</span>
            <span className="gradient-text">
              {g('the subscription you already have.', 'la suscripción que ya tienes.')}
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {g(
              'The agents you already pay for, running on your machine with your credentials. We just put them in one window.',
              // "Corriendo en tu máquina" era un calco de "running": en español
              // un programa se ejecuta, no corre. Y sobraba: basta con decir
              // dónde está.
              'Los agentes que ya pagas, en tu máquina y con tus credenciales. Nosotros solo los juntamos en una ventana.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 mt-11">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex items-center gap-3 rounded-2xl glass border border-white/10 p-5 transition-colors hover:border-neon-cyan/40"
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
          {/* Fades out at BOTH ends now. A rule that starts solid on the left
              and dies on the right anchors the eye to a left margin, which is
              exactly the pull this section had to lose. */}
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/[0.09] to-transparent" />
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mt-8">
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
