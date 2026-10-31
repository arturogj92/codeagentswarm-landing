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
    updatedAt: '2026-10-31',
    alternateSlug: 'grok-build-from-claude-code',
  },
  sections: [
    {
      id: 'modelo',
      title: 'Modelo mental',
      content: [
        { type: 'paragraph', text: 'Claude Code guarda mucho en <code>~/.claude/</code>. Grok Build usa <code>~/.grok/</code>, pero también lee los archivos de Claude Code sin configurar nada. Según la <a href="https://docs.x.ai/build/features/skills-plugins-marketplaces" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de compatibilidad de xAI</a>, Grok carga skills, plugins, marketplaces, servidores MCP, agentes, hooks y archivos de instrucciones de Claude Code (<code>CLAUDE.md</code>, <code>CLAUDE.local.md</code>, <code>.claude/rules/</code>) junto a <code>AGENTS.md</code> y <code>.grok/</code>. Como los hooks también se cargan, revisa qué hooks de Claude quieres que se disparen bajo Grok.' },
        { type: 'callout', variant: 'warning', content: 'Grok puede importar superficies compatibles con Claude. CodeAgentSwarm puede desactivar ciertos hooks de Claude en terminales Grok para no duplicar title-gates o notifiers de Stop.' },
      ],
    },
    {
      id: 'skills',
      title: 'Skills y MCP',
      content: [
        { type: 'paragraph', text: 'Tus skills de Claude ya aparecen en Grok. Pon las skills solo para Grok en <code>~/.grok/skills/</code> o <code>.grok/skills/</code>, y ejecuta <code>grok inspect</code> para ver qué skills, reglas, hooks y servidores MCP encontró Grok en la carpeta actual. Los MCP propios de Grok van en <code>~/.grok/config.toml</code> bajo tablas <code>[mcp_servers.*]</code>; Grok también lee <code>~/.claude.json</code> y el <code>.mcp.json</code> del proyecto por debajo. Para traer trabajo anterior, <code>grok import</code> importa sesiones de Claude Code y <code>/import-claude</code> abre una pantalla para importar ajustes. CodeAgentSwarm puede instalar su MCP de tareas para Grok igual que para otros agentes.' },
        { type: 'callout', variant: 'tip', content: 'Ver también <a href="/es/guias/compartir-skills-entre-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">compartir skills entre agentes</a> para el patrón multi-CLI.' },
      ],
    },
    {
      id: 'ambos',
      title: 'Ejecuta ambos, no fuerces el corte',
      content: [
        { type: 'paragraph', text: 'La mayoría de equipos no deberían migrar todos los flujos el primer día. Usa Grok Build con Grok 4.7, su modelo por defecto, para tareas exploratorias mientras Claude Code mantiene el camino crítico y amplía desde resultados medidos.' },
      ],
    },
  ],
  faq: [
    { question: '¿Grok Build lee CLAUDE.md?', answer: 'Sí. Grok Build lee CLAUDE.md, Claude.md, CLAUDE.local.md y .claude/rules/ junto a AGENTS.md en cada carpeta desde la raíz del repo hasta donde lo arrancas. Ejecuta grok inspect para ver los archivos exactos que cargó.' },
    { question: '¿Dónde viven las skills de Grok?', answer: 'Las skills solo para Grok van en ~/.grok/skills/ o en una carpeta .grok/skills/ del proyecto. Grok también recoge automáticamente las skills de Claude Code y ~/.agents/skills/.' },
    { question: '¿Desinstalo Claude Code?', answer: 'Normalmente no. Usa ambos hasta saber qué tareas prefieren cada agente.' },
  ],
}

export default guide
