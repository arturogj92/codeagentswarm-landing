import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-vs-claude-code',
    locale: 'es',
    title: 'Grok Build vs Claude Code: comparación honesta',
    metaTitle: 'Grok Build vs Claude Code: comparación honesta (2026)',
    metaDescription: 'Grok Build (CLI grok de xAI) vs Claude Code, comparación honesta: modelos, auth, permisos, subagentes, Windows y cuándo ejecutar ambos en CodeAgentSwarm.',
    intro: `La gente pregunta qué CLI de código usar: Grok Build de xAI o Claude Code de Anthropic. La respuesta honesta es que ambas son serias, optimizan ecosistemas distintos, y el mejor setup a menudo no es elegir una para siempre sino usar las dos cuando encajan.

Grok Build es la CLI de código de xAI (comando <code>grok</code>), no el chatbot Grok ni paquetes comunitarios no oficiales llamados grok-cli.

Esta comparación es práctica: instalación y auth, fortalezas, huecos y cómo CodeAgentSwarm te deja supervisar ambas en un solo workspace.`,
    ctaText: 'Ejecuta Grok Build y Claude Code a la vez en CodeAgentSwarm. Un workspace, dos vendors, notificaciones e historial compartidos.',
    ctaAgent: 'multi',
    highlightedWords: ['Grok Build', 'Claude Code'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-08-23',
    alternateSlug: 'grok-build-vs-claude-code',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'Respuesta corta',
      content: [
        { type: 'paragraph', text: 'Claude Code es la CLI nativa de Anthropic con un ecosistema enorme de skills, hooks y conocimiento comunitario. Grok Build es el TUI de código de xAI con modos headless y agent, plan mode, subagentes nativos y Grok 4.6. Ninguna sustituye a la otra.' },
        { type: 'paragraph', text: 'Si tu equipo ya vive en suscripciones Claude, Claude Code sigue siendo el punto de partida. Si quieres probar modelos Grok en terminal, Grok Build ya tiene acceso gratuito, planes de pago y API. Si usas ambos, CodeAgentSwarm evita cambiar de contexto sin parar.' },
      ],
    },
    {
      id: 'lado-a-lado',
      title: 'Lado a lado',
      content: [
        { type: 'list', items: ['<strong>Vendor:</strong> Claude Code → Anthropic. Grok Build → xAI.', '<strong>Binario:</strong> <code>claude</code> vs <code>grok</code>.', '<strong>Datos:</strong> <code>~/.claude/</code> vs <code>~/.grok/</code> (o <code>GROK_HOME</code>).', '<strong>Auth:</strong> cuenta/API Anthropic vs login browser grok.com o <code>XAI_API_KEY</code>.', '<strong>Permisos:</strong> modos Claude + hooks vs <code>--permission-mode</code>, <code>--always-approve</code>, plan mode.', '<strong>Paralelismo:</strong> agent teams de Claude vs subagentes nativos de Grok + enjambres multi-terminal.', '<strong>Headless:</strong> ambos; Grok expone <code>grok -p</code> y <code>grok agent</code> de forma explícita.', '<strong>Skills:</strong> ambos con paquetes estilo agentskills; rutas distintas.'] },
      ],
    },
    {
      id: 'cuando',
      title: 'Cuándo elegir cuál',
      content: [
        { type: 'heading', level: 3, text: 'Claude Code cuando', id: 'claude-cuando' },
        { type: 'paragraph', text: 'Necesitas el ecosistema más denso, el comportamiento de modelos Anthropic que ya confías, o un equipo estandarizado en permisos/MCP/skills de Claude.' },
        { type: 'heading', level: 3, text: 'Grok Build cuando', id: 'grok-cuando' },
        { type: 'paragraph', text: 'Quieres programar con Grok 4.6, plan mode y subagentes de xAI, o rutas headless y agent que encajen en tu automatización. También sirve para migrar desde Claude con cuidado; consulta <a href="/es/guias/grok-build-desde-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build desde Claude Code</a>.' },
        { type: 'heading', level: 3, text: 'Ambos cuando', id: 'ambos-cuando' },
        { type: 'paragraph', text: 'Tareas distintas se benefician de modelos distintos. CodeAgentSwarm deja un terminal en Claude Code y otro en Grok Build sobre el mismo repo.' },
      ],
    },
    {
      id: 'cas',
      title: 'Ambos en un enjambre',
      content: [
        { type: 'paragraph', text: 'Instala ambas CLIs, abre CodeAgentSwarm, pon el terminal A en Claude Code y el B en Grok Build. Ese es el patrón multi-vendor del producto. Sigue con el <a href="/es/guias/enjambre-de-agentes-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de Grok Build</a> y el <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre multi-vendor</a>.' },
      ],
    },
  ],
  faq: [
    { question: '¿Es Grok Build mejor que Claude Code?', answer: 'Ninguno es mejor en todo. Claude Code gana en madurez de ecosistema; Grok Build cuando quieres modelos xAI y su plan/subagentes. Mucha gente usa ambos.' },
    { question: '¿Puedo ejecutarlos a la vez?', answer: 'Sí. Son procesos separados. CodeAgentSwarm está hecho para eso: un agente por terminal, supervisados juntos.' },
    { question: '¿Las skills se transfieren?', answer: 'A menudo con adaptación. El layout es abierto pero las rutas cambian. Ver la guía desde Claude Code.' },
  ],
}

export default guide
