import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-grok-build',
    locale: 'es',
    title: 'Enjambre de agentes Grok Build: varios terminales grok en paralelo',
    metaTitle: 'Enjambre de agentes Grok Build: varios terminales grok (2026)',
    metaDescription: 'Ejecuta varias sesiones de Grok Build (xAI) en paralelo. Cómo difieren los subagentes nativos de un enjambre multi-terminal, y comparación tabs, tmux y CodeAgentSwarm.',
    intro: `Un enjambre de agentes Grok Build son varias sesiones independientes de <code>grok</code> a la vez: una migra un servicio, otra escribe tests, otra revisa diffs. Cada sesión es su propio proceso con su contexto. Eso es distinto de los subagentes nativos de Grok Build, que viven dentro de una sesión padre.

Grok Build es la CLI de código de xAI (comando <code>grok</code>), no el chatbot Grok ni paquetes comunitarios no oficiales llamados grok-cli.

Esta guía es el pilar del paralelismo con Grok Build: pestañas, tmux y CodeAgentSwarm, y cuándo bastan los subagentes nativos.`,
    ctaText: 'Monta un enjambre entero de Grok Build en CodeAgentSwarm: varios terminales grok, notificaciones al terminar e historial buscable entre todos.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build', 'enjambre'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-08-23',
    alternateSlug: 'grok-build-agent-swarm',
  },
  sections: [
    {
      id: 'que-es',
      title: '¿Qué cuenta como enjambre de Grok Build?',
      content: [
        { type: 'image', alt: 'Varios terminales Grok Build en CodeAgentSwarm', src: '/images/guides/multi-cli-agent-selector.png', caption: 'Varias sesiones grok independientes en un solo workspace.' },
        { type: 'paragraph', text: 'Un enjambre son N procesos CLI independientes. Abre tres terminales, ejecuta <code>grok</code> en cada uno, da una tarea distinta: ya es un enjambre. Los subagentes nativos (desactivables con <code>--no-subagents</code>) son otra herramienta: la sesión padre lanza hijos que controla. Ambos sirven; resuelven problemas distintos. Ver <a href="/es/guias/subagentes-grok-build-vs-enjambre" class="text-neon-cyan hover:text-neon-purple transition-colors">subagentes vs enjambre</a>.' },
        { type: 'callout', variant: 'info', content: 'xAI no cobra un recargo separado por cada sesión en paralelo. Todas consumen los mismos límites de la cuenta gratuita o de pago, o el mismo presupuesto de API.' },
      ],
    },
    {
      id: 'pestanas',
      title: 'Método 1: pestañas de terminal',
      content: [
        { type: 'paragraph', text: 'Abre varias pestañas, <code>cd</code> al proyecto, <code>grok</code> en cada una.' },
        { type: 'code', language: 'bash', code: '# Pestaña 1\ncd ~/mi-proyecto && grok "migra el módulo de auth"\n\n# Pestaña 2\ncd ~/mi-proyecto && grok "añade tests de integración de auth"' },
        { type: 'list', items: ['Pros: cero herramientas extra', 'Contras: se te escapan los prompts de permiso; sin historial unificado; malo a partir de 3-4 sesiones'] },
      ],
    },
    {
      id: 'tmux',
      title: 'Método 2: tmux',
      content: [
        { type: 'paragraph', text: 'tmux mantiene paneles vivos y permite detach. Bien para migraciones largas. Sigue siendo un multiplexor general, no un supervisor de agentes.' },
        { type: 'code', language: 'bash', code: 'tmux new-session -s grok\ntmux split-window -h\n# grok en cada panel' },
      ],
    },
    {
      id: 'cas',
      title: 'Método 3: CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm está hecho para supervisar CLIs de IA. Elige Grok Build en el selector de cada terminal. Obtienes rejilla de terminales, notificaciones de escritorio, diffs en vivo, historial buscable y puedes mezclar Grok Build con Claude Code o Codex en la misma ventana.' },
        { type: 'callout', variant: 'tip', content: 'Si solo necesitas una sesión de Grok Build con ayudantes internos, bastan los subagentes nativos. Si necesitas varios trabajadores visibles (o multi-vendor), usa un enjambre multi-terminal de verdad.' },
      ],
    },
  ],
  faq: [
    { question: '¿Puedo ejecutar varias sesiones de Grok Build a la vez?', answer: 'Sí. Cada proceso grok es independiente. Usa pestañas, tmux o CodeAgentSwarm.' },
    { question: '¿Es lo mismo que los subagentes de Grok?', answer: 'No. Los subagentes viven dentro de una sesión. Un enjambre son varios procesos grok de primer nivel.' },
    { question: '¿CodeAgentSwarm soporta Grok Build?', answer: 'Sí. Elige Grok Build por terminal como cualquier otro agente de primera clase.' },
  ],
}

export default guide
