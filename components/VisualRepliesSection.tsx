'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLocale } from 'next-intl'

// Release 2.5.0: Visual Replies. Copy lives here (not in messages/*.json) so this
// block stays self-contained while other release branches edit the shared files.
// The clip is the real app capture from release-notes/2.5.0/visual-replies.gif.
const COPY = {
  en: {
    eyebrow: 'New in 2.5.0',
    titlePre: 'Agents that answer with',
    titleHighlight: 'something you can touch',
    description:
      'Ask for a comparison, a plan or a report and the agent can reply in the Chat with a chart, a diagram, a timeline, a small interactive tool or even a 3D view. It works with every agent you run in CodeAgentSwarm.',
    checks: [
      'Click an option inside a reply and it lands in your message box, ready to send',
      'Charts, diagrams, timelines and small tools, drawn by the agent for your question',
      'Images the agent finds on the web show up right in the Chat',
    ],
    videoLabel: 'An agent answering with an interactive 3D chart in the CodeAgentSwarm Chat',
  },
  es: {
    eyebrow: 'Nuevo en 2.5.0',
    titlePre: 'Agentes que responden con',
    titleHighlight: 'algo que puedes tocar',
    description:
      'Pide una comparativa, un plan o un informe y el agente puede contestarte en el Chat con una gráfica, un diagrama, una línea de tiempo, una pequeña herramienta interactiva o incluso una vista en 3D. Funciona con todos los agentes que usas en CodeAgentSwarm.',
    checks: [
      'Pulsa una opción dentro de la respuesta y aparece en tu caja de mensaje, lista para enviar',
      'Gráficas, diagramas, líneas de tiempo y herramientas pequeñas, hechas para tu pregunta',
      'Las imágenes que el agente encuentra en la web se ven dentro del Chat',
    ],
    videoLabel: 'Un agente respondiendo con una gráfica 3D interactiva en el Chat de CodeAgentSwarm',
  },
} as const

export default function VisualRepliesSection() {
  const c = COPY[useLocale() === 'es' ? 'es' : 'en']
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(videoRef, { margin: '-80px' })
  const reduceMotion = useReducedMotion()

  // Decode only while visible, and never autoplay under reduced motion.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView && reduceMotion === false) void video.play().catch(() => {})
    else video.pause()
  }, [inView, reduceMotion])

  return (
    <section id="visual-replies" aria-labelledby="visual-replies-title" className="relative py-20 md:py-28 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-cyan/80 mb-3.5">
            {c.eyebrow}
          </span>
          <h2 id="visual-replies-title" className="text-white font-bold text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1] tracking-[-0.025em] mb-4">
            {c.titlePre} <span className="gradient-text">{c.titleHighlight}</span>
          </h2>
          <p className="text-white/70 text-base leading-[1.7]">{c.description}</p>
          <ul className="mt-6 grid gap-2.5">
            {c.checks.map(text => (
              <li key={text} className="flex items-start gap-2.5 text-white/70 text-[14.5px]">
                <span className="flex-none mt-px w-[18px] h-[18px] rounded-md bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan">
                  <Check className="w-[11px] h-[11px]" strokeWidth={3} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="min-w-0"
        >
          <div className="relative aspect-[960/714] rounded-2xl overflow-hidden bg-[#050505] border border-white/[0.08] shadow-[0_0_40px_rgba(34,211,238,0.06)]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/visual-replies-poster.webp"
              aria-label={c.videoLabel}
            >
              <source src="/videos/visual-replies.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
