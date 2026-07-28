import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-headless-ci',
    locale: 'es',
    title: 'Grok Build en modo headless para scripts y CI',
    metaTitle: 'Grok Build headless (xAI): grok -p para CI y scripts (2026)',
    metaDescription: 'Ejecuta Grok Build sin TUI con grok -p, formatos plain/json/streaming-json, auth con XAI_API_KEY y modo agent para automatización.',
    intro: `Grok Build no es solo un TUI. <code>grok -p</code> (un turno) imprime la respuesta y sale, ideal en scripts y CI. Los subcomandos agent exponen stdio y otros modos para editores y harnesses.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chatbot Grok.`,
    ctaText: 'Usa Grok Build headless en CI; usa CodeAgentSwarm cuando humanos supervisan sesiones interactivas largas.',
    ctaAgent: 'grok-build',
    highlightedWords: ['headless', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-headless-ci',
  },
  sections: [
    {
      id: 'un-turno',
      title: 'Headless de un turno',
      content: [
        { type: 'code', language: 'bash', code: 'export XAI_API_KEY="xai-..."\ngrok -p "Lista los tres riesgos top del repo"\ngrok -p "Resume el git diff" --output-format json' },
        { type: 'callout', variant: 'warning', content: 'Nunca dejes API keys de producción en logs públicos. Usa secrets de CI y sandboxes con el mínimo privilegio.' },
      ],
    },
    {
      id: 'agent',
      title: 'Modo agent',
      content: [
        { type: 'paragraph', text: '<code>grok agent</code> expone runtimes sin TUI (stdio, websocket headless, serve, leader). Úsalo al embeber Grok en un bridge de IDE. Ver <code>grok agent --help</code>.' },
      ],
    },
    {
      id: 'vs-cas',
      title: 'Headless vs CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'Headless es para máquinas. CodeAgentSwarm es para humanos que supervisan CLIs interactivas. Se complementan.' },
      ],
    },
  ],
  faq: [
    { question: '¿Cómo corro Grok Build en CI?', answer: 'Define XAI_API_KEY y usa grok -p con un modo de permisos no interactivo.' },
    { question: '¿-p es lo mismo que agent?', answer: 'No. -p es un helper de un turno. grok agent es para integraciones más largas.' },
  ],
}

export default guide
