import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-cline',
    locale: 'es',
    title: 'Historial de conversaciones de Cline: encuentra, busca y retoma sesiones',
    metaTitle: 'Historial de Cline: busca y retoma sesiones de Cline CLI',
    metaDescription: 'Dónde guarda Cline CLI sus sesiones, cómo funcionan cline history y --id, y cómo buscar y reabrir conversaciones de Cline junto a tus otros agentes.',
    intro: 'Cline guarda todas las sesiones, pero dar con aquella en la que arreglaste un bug la semana pasada es otra cosa. En esta guía verás dónde guarda Cline CLI su historial, los comandos para listar y retomar sesiones y cómo CodeAgentSwarm 2.5.0, con Cline en beta, junta esas sesiones en un único historial buscable con el resto de tus agentes. Los datos de Cline se comprobaron en la referencia de su CLI el 31 de octubre de 2026.',
    ctaText: 'Busca cualquier sesión de Cline en CodeAgentSwarm y reabre la que necesitas en Chat o en la terminal en dos clics.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'cline-conversation-history',
    relatedSlug: 'como-usar-cline-cli',
    socialImage: '/images/guides/cline-cli-og-es.png',
  },
  sections: [
    {
      id: 'where',
      title: 'Dónde guarda Cline CLI su historial',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'table',
          headers: ['Qué', 'Dónde'],
          rows: [
            ['Índice de sesiones', '<code>~/.cline/data/db/sessions.db</code>'],
            ['Archivos de cada sesión', '<code>~/.cline/data/sessions/&lt;id&gt;/</code>'],
            ['Mover la carpeta de datos', '<code>CLINE_DATA_DIR</code> o <code>--data-dir</code>'],
          ],
          caption: `Fuente: ${link('https://docs.cline.bot/cli/cli-reference', 'referencia de Cline CLI')}, consultada el 31 de octubre de 2026.`,
        },
        {
          type: 'paragraph',
          text: 'El índice es una base de datos SQLite, y cada sesión guarda sus mensajes en su propia carpeta. Si cambias de equipo y quieres conservar el historial, copia entera la carpeta <code>~/.cline/data</code>.',
        },
      ],
    },
    {
      id: 'commands',
      title: 'Listar y retomar sesiones desde la terminal',
      content: [
        { type: 'code', language: 'bash', code: 'cline history            # lista las sesiones recientes\ncline history --limit 200\ncline history --json     # lista en JSON\ncline --id <session-id>  # retoma una' },
        {
          type: 'paragraph',
          text: '<code>cline history</code> (o <code>cline h</code>) muestra por defecto las últimas 50 sesiones. También tiene los subcomandos <code>export</code>, <code>delete</code> y <code>update</code>. Para seguir con una sesión, pasa su id a <code>--id</code>.',
        },
        {
          type: 'paragraph',
          text: 'El problema: cada herramienta tiene su lista. Si además usas Claude Code, Codex o Copilot, cada uno guarda su historial en su propio formato y no hay un sitio donde buscar en todos.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'El historial de Cline en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm lee el mismo índice de Cline, solo en modo lectura, y muestra tus sesiones de Cline en el historial de conversaciones junto a las del resto de agentes. Filtra por agente para ver solo Cline, filtra por proyecto o busca dentro de los mensajes. Los títulos salen de los datos de sesión del propio Cline.',
        },
        {
          type: 'image',
          src: '/images/guides/history-search-current.webp',
          alt: 'Resultados de búsqueda en el historial de conversaciones de CodeAgentSwarm',
          caption: 'Búsqueda en el historial con conversaciones de ejemplo de otros agentes. Las sesiones de Cline aparecen en la misma lista, con su propio filtro de agente.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Elige una sesión y reábrela donde quieras. La vista de terminal ejecuta <code>cline --id &lt;id&gt;</code>. El Chat carga la sesión a través del servidor ACP de Cline, así que conservas la conversación y puedes pasar de una vista a otra.',
        },
        {
          type: 'image',
          src: '/images/guides/history-reopen-current.webp',
          alt: 'Vista previa de una conversación con el menú para reabrir en CLI o Chat',
          caption: 'Al seleccionar una conversación, eliges CLI o Chat. Conversación de ejemplo; el mismo menú aparece en las sesiones de Cline.',
          size: 'full',
        },
      ],
    },
    {
      id: 'details',
      title: 'Detalles que conviene saber',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Solo sesiones principales</strong>: los subagentes de Cline se ejecutan dentro de la sesión que los lanzó, así que el historial muestra una fila por cada conversación que puedes retomar.',
            '<strong>Sesiones antiguas en el Chat</strong>: si tu versión de Cline no puede cargar una sesión por ACP, el Chat te lo dice en vez de abrir una vacía. Actualiza Cline o reábrela en la terminal.',
            '<strong>Limpieza</strong>: al borrar una conversación de Cline desde CodeAgentSwarm se eliminan los archivos de esa sesión y el índice compartido de Cline queda intacto.',
            '<strong>Sin bifurcaciones por ahora</strong>: las bifurcaciones nativas de conversación de Cline no están en la beta de la 2.5.0.',
          ],
        },
        {
          type: 'paragraph',
          text: `Guías relacionadas: ${link('/es/guias/como-usar-cline-cli', 'cómo instalar y usar Cline CLI')}, ${link('/es/guias/enjambre-de-agentes-cline', 'varias sesiones de Cline en paralelo')} y ${link('/es/guias/historial-claude-code', 'el historial de conversaciones de Claude Code')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Dónde guarda Cline CLI las conversaciones?',
      answer: 'En ~/.cline/data: un índice SQLite en db/sessions.db y una carpeta por sesión dentro de sessions/. Define CLINE_DATA_DIR para moverlo.',
    },
    {
      question: '¿Cómo veo mi historial de Cline?',
      answer: 'Ejecuta cline history, o cline h. Por defecto muestra las últimas 50 sesiones; añade --limit para ver más o --json para obtener la lista en JSON.',
    },
    {
      question: '¿Cómo retomo una sesión de Cline?',
      answer: 'Ejecuta cline --id seguido del id de la sesión. En CodeAgentSwarm, elige la sesión en el historial de conversaciones y reábrela en la terminal o en el Chat.',
    },
    {
      question: '¿Puedo buscar en las conversaciones de Cline?',
      answer: 'Desde la CLI no puedes buscar entre herramientas. CodeAgentSwarm busca en los mensajes de tus sesiones de Cline junto con los de tus otros agentes.',
    },
  ],
}

export default guide
