import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-acceso-grok-build',
    locale: 'es',
    title: 'Precios y acceso de Grok Build: SuperGrok, X Premium+ y lo que necesitas',
    metaTitle: 'Precios Grok Build: SuperGrok, X Premium+ y acceso (2026)',
    metaDescription: 'Qué necesitas para usar Grok Build (CLI grok de xAI): acceso SuperGrok o X Premium+, API keys para CI, y notas honestas sin inventar cuotas.',
    intro: `Los resultados de búsqueda sobre precios de Grok Build son un lío porque xAI mueve ficha rápido. Esta página no inventa topes mensuales. Documenta el modelo de acceso tal como se enmarca en público, auth para humanos vs CI, y qué factura o no CodeAgentSwarm.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chat Grok de consumo.`,
    ctaText: 'CodeAgentSwarm es un workspace encima de tu acceso xAI. Tú aportas SuperGrok o X Premium+ (o API key); nosotros la supervisión multi-terminal.',
    ctaAgent: 'grok-build',
    highlightedWords: ['precios', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-pricing',
  },
  sections: [
    {
      id: 'acceso',
      title: 'Requisitos de acceso (sin cuotas inventadas)',
      content: [
        { type: 'paragraph', text: 'En la era beta pública, el uso interactivo de Grok Build se enmarca en torno a planes tipo SuperGrok o X Premium+. Confirma el requisito vivo en xAI antes de presupuestar un equipo; esta guía no inventa precios por asiento ni rate limits.' },
        { type: 'paragraph', text: 'Para automatización, <code>XAI_API_KEY</code> es la vía headless. La facturación API sigue los términos de la API de xAI, que pueden diferir del chat.' },
        { type: 'callout', variant: 'warning', content: 'Si un blog cita "requests por hora" de Grok Build sin fuente primaria de xAI, trátarlo como obsoleto.' },
      ],
    },
    {
      id: 'coste-cas',
      title: 'Qué cuesta CodeAgentSwarm respecto a Grok',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm no vende tokens de Grok. Es un workspace de escritorio. Pagas a xAI (o X) el acceso al modelo y usas el plan/beta de CAS para la app supervisora.' },
      ],
    },
    {
      id: 'verificar',
      title: 'Cómo verificar en tu máquina',
      content: [
        { type: 'code', language: 'bash', code: 'grok --version\ngrok\nexport XAI_API_KEY=...\ngrok -p "ping"' },
      ],
    },
  ],
  faq: [
    { question: '¿Grok Build es gratis?', answer: 'No asumas uso ilimitado gratis. El acceso interactivo se ha ligado a planes SuperGrok / X Premium+ en beta. Confirma en xAI.' },
    { question: '¿CAS incluye uso de Grok?', answer: 'No. CAS es el workspace. El uso del modelo lo factura xAI / tu API key.' },
    { question: '¿Puedo usar API key en vez de SuperGrok?', answer: 'Para headless/CI sí con XAI_API_KEY. El login browser es el default humano.' },
  ],
}

export default guide
