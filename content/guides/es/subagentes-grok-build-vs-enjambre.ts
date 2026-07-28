import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'subagentes-grok-build-vs-enjambre',
    locale: 'es',
    title: 'Subagentes de Grok Build vs enjambre: qué paralelismo usar',
    metaTitle: 'Subagentes Grok Build vs enjambre de agentes (xAI, 2026)',
    metaDescription: 'Subagentes nativos de Grok Build vs enjambre multi-terminal: cuándo usar --no-subagents, worktrees y terminales supervisados en CodeAgentSwarm.',
    intro: `Grok Build puede paralelizar de dos formas que la gente mezcla. Los subagentes nativos nacen dentro de una sesión <code>grok</code>. Un enjambre son varios procesos <code>grok</code> de primer nivel (o vendors distintos) que un humano supervisa. Ambos son reales. No son la misma feature.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chat Grok de consumo.`,
    ctaText: 'Usa subagentes nativos para trabajo que Grok puede coordinar solo; usa CodeAgentSwarm cuando necesitas varios trabajadores visibles o multi-vendor.',
    highlightedWords: ['subagentes', 'enjambre'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-subagents-vs-agent-swarm',
  },
  sections: [
    {
      id: 'dos-modelos',
      title: 'Dos modelos de paralelismo',
      content: [
        { type: 'list', items: ['<strong>Subagentes nativos:</strong> una sesión padre de Grok Build delega en hijos (se desactivan con <code>--no-subagents</code>). Hay opciones con worktree vía <code>--worktree</code>.', '<strong>Enjambre:</strong> varios terminales independientes con <code>grok</code> (o Claude/Codex/…), supervisados en pestañas, tmux o CodeAgentSwarm.'] },
      ],
    },
    {
      id: 'elegir',
      title: 'Cómo elegir',
      content: [
        { type: 'paragraph', text: 'Elige subagentes cuando la tarea es una sola historia con patas paralelas que Grok puede coordinar. Elige enjambre cuando quieres aislamiento duro, vendors distintos o dirigir tú cada trabajador.' },
        { type: 'code', language: 'bash', code: 'grok --no-subagents "mantén esto lineal"\ngrok --worktree=feat-auth "implementa auth"' },
      ],
    },
    {
      id: 'cas',
      title: 'Dónde entra CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm es la capa de enjambre. No sustituye los subagentes de Grok; ejecuta sesiones CLI enteras. Puedes dejar subagentes en un terminal y otro terminal con segundo Grok o Claude Code.' },
      ],
    },
  ],
  faq: [
    { question: '¿Debo desactivar subagentes con CodeAgentSwarm?', answer: 'No por defecto. Se apilan. Desactívalos solo si quieres un trabajador lineal.' },
    { question: '¿Un enjambre son más subagentes?', answer: 'No. Los subagentes los posee una sesión. Los terminales del enjambre son procesos independientes.' },
  ],
}

export default guide
