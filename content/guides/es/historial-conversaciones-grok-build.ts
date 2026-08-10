import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-grok-build',
    locale: 'es',
    title: 'Historial de conversaciones de Grok Build: encontrar y reanudar',
    metaTitle: 'Historial de Grok Build (xAI): encontrar y reanudar (2026)',
    metaDescription: 'Encuentra y reanuda sesiones de Grok Build con grok --continue, --resume, grok sessions list/search, export y el historial buscable de CodeAgentSwarm.',
    intro: `Grok Build persiste sesiones bajo su data root para continuar después. La CLI expone <code>--continue</code>, <code>--resume</code>, <code>grok sessions</code> y <code>grok export</code>. CodeAgentSwarm añade un historial buscable entre agentes encima.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chatbot Grok. Resume verificado con <code>grok --help</code> (<code>-c/--continue</code>, <code>-r/--resume</code>).`,
    ctaText: 'Reanuda Grok Build en la CLI, o navega los chats de todos los agentes desde el historial de CodeAgentSwarm.',
    ctaAgent: 'grok-build',
    highlightedWords: ['historial', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-conversation-history',
  },
  sections: [
    {
      id: 'cli-resume',
      title: 'Reanudar desde la CLI',
      content: [
        { type: 'code', language: 'bash', code: 'grok --continue\ngrok --resume\ngrok --resume "refactor auth"\ngrok --resume SESSION --fork-session' },
        { type: 'paragraph', text: '<code>grok sessions list</code> y <code>search</code> ayudan a encontrar trabajo antiguo. <code>grok export</code> saca un Markdown compartible.' },
      ],
    },
    {
      id: 'storage',
      title: 'Dónde vive el historial',
      content: [
        { type: 'paragraph', text: 'Las sesiones viven bajo <code>~/.grok/</code> (o <code>GROK_HOME</code>). No borres ese árbol a la ligera si te importa reanudar.' },
      ],
    },
    {
      id: 'cas-history',
      title: 'Historial en CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'CAS indexa conversaciones de Claude Code, Codex, OpenCode, Kimi Code, Grok Build y más para buscar desde un modal y reabrir en un terminal.' },
      ],
    },
  ],
  faq: [
    { question: '¿Cómo continúo la última sesión?', answer: 'grok --continue en el mismo directorio de proyecto.' },
    { question: '¿Cómo encuentro una sesión vieja?', answer: 'grok sessions list o search, luego grok --resume con id o título.' },
    { question: '¿CAS guarda historial de Grok?', answer: 'CAS ofrece historial buscable entre agentes, incluidas sesiones Grok Build indexadas en tu máquina.' },
  ],
}

export default guide
