import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-desde-claude-code',
    locale: 'es',
    title: 'Usar Grok Build viniendo de Claude Code',
    metaTitle: 'Grok Build desde Claude Code (xAI): notas de migración (2026)',
    metaDescription: 'Pasar de Claude Code a Grok Build: AGENTS.md, rutas de skills (~/.grok/skills), diferencias de hooks/MCP y ejecutar ambos en CodeAgentSwarm.',
    intro: `Si ya vives en Claude Code, Grok Build se sentirá en parte familiar: instrucciones de proyecto, skills, MCP, prompts de permiso. Las rutas y defaults cambian, y algunas superficies de compat Claude pueden disparar hooks dos veces si no tienes cuidado.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chatbot Grok.`,
    ctaText: 'Mantén Claude Code y añade Grok Build en CodeAgentSwarm en lugar de sustituir todo el stack de un día para otro.',
    ctaAgent: 'multi',
    highlightedWords: ['Claude Code', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-from-claude-code',
  },
  sections: [
    {
      id: 'modelo',
      title: 'Modelo mental',
      content: [
        { type: 'paragraph', text: 'Claude Code guarda mucho en <code>~/.claude/</code>. Grok Build usa <code>~/.grok/</code>. Las skills de Grok van en <code>~/.grok/skills/</code>. La guía de proyecto suele funcionar vía <code>AGENTS.md</code> y convenciones relacionadas. No asumas que cada hook de Claude se dispara limpio bajo Grok sin revisar.' },
        { type: 'callout', variant: 'warning', content: 'Grok puede importar superficies compatibles con Claude. CodeAgentSwarm puede desactivar ciertos hooks de Claude en terminales Grok para no duplicar title-gates o notifiers de Stop.' },
      ],
    },
    {
      id: 'skills',
      title: 'Skills y MCP',
      content: [
        { type: 'paragraph', text: 'Copia o reinstala skills en <code>~/.grok/skills/</code>. Los MCP de Grok van en <code>~/.grok/config.toml</code> bajo tablas <code>[mcp_servers.*]</code>. CodeAgentSwarm puede instalar su MCP de tareas para Grok igual que para otros agentes.' },
      ],
    },
    {
      id: 'ambos',
      title: 'Ejecuta ambos, no fuerces el corte',
      content: [
        { type: 'paragraph', text: 'La mayoría de equipos no deberían migrar todo el día uno. Pon Grok Build en tareas exploratorias o favorecidas por SuperGrok mientras Claude Code mantiene el camino crítico.' },
      ],
    },
  ],
  faq: [
    { question: '¿Grok Build lee CLAUDE.md?', answer: 'Grok entiende patrones comunes de instrucciones de proyecto incluyendo estilos AGENTS.md. Verifica en tu versión.' },
    { question: '¿Dónde viven las skills de Grok?', answer: 'Normalmente ~/.grok/skills/.' },
    { question: '¿Desinstalo Claude Code?', answer: 'Normalmente no. Usa ambos hasta saber qué tareas prefieren cada agente.' },
  ],
}

export default guide
