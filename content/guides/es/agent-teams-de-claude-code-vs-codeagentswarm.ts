import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'agent-teams-de-claude-code-vs-codeagentswarm',
    locale: 'es',
    title: 'Agent Teams de Claude Code vs CodeAgentSwarm: cuál es la diferencia',
    metaTitle: 'Agent Teams de Claude Code vs CodeAgentSwarm: diferencias',
    metaDescription: 'Compara los equipos de sesiones independientes de Claude Code con CodeAgentSwarm: contexto, coordinación, proveedores y cómo activar Agent Teams.',
    intro: 'Agent Teams coordina varias sesiones de Claude Code con contexto propio. CodeAgentSwarm reúne sesiones de distintos proveedores en un espacio de trabajo de escritorio para macOS, Windows y Linux. Ambos permiten delegar trabajo: en CodeAgentSwarm puedes supervisarlo directamente o recurrir a un <a href="/es/guias/coordinador-agentes-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">coordinador de CodeAgentSwarm</a>.\n\nLa diferencia útil es el entorno de trabajo, los proveedores y cómo revisas los resultados. Esta comparativa explica también cómo activar la función experimental de Claude Code.',
    ctaText: 'Coordina sesiones de Claude Code y Codex desde CodeAgentSwarm, con tareas, historial y revisión de cambios en un mismo espacio.',
    ctaAgent: 'comparison',
    highlightedWords: [
      'Agent Teams de Claude Code',
      'CodeAgentSwarm',
    ],
    publishedAt: '2026-06-07',
    updatedAt: '2026-10-31',
    alternateSlug: 'claude-code-agent-teams-vs-codeagentswarm',
    relatedSlug: 'coordinador-agentes-ia',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: 'Agent Teams organiza un equipo de sesiones de Claude Code; CodeAgentSwarm organiza sesiones de varios proveedores y añade un espacio visual para supervisarlas y coordinarlas.',
        },
      ],
    },
    {
      id: 'what-are-agent-teams',
      title: 'Qué son los Agent Teams de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Según la documentación de <a href="https://code.claude.com/docs/en/agent-teams" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code Agent Teams</a>, cada compañero mantiene su propia ventana de contexto. Una sesión lidera el equipo con una lista de tareas compartida y mensajes, y los compañeros también pueden escribirse entre sí. Puedes hablar con cualquier compañero sin pasar por el líder.',
        },
        {
          type: 'paragraph',
          text: 'Los subagentes son otra forma de delegación: trabajan dentro de una sesión, con contexto propio, y devuelven resultados al agente que los llamó. No hay que confundirlos con los compañeros de un Agent Team.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Agent Teams sigue siendo experimental y está desactivado por defecto (comprobado en la documentación oficial el 31 de octubre de 2026). Límites conocidos: /resume y /rewind no recuperan a los compañeros en proceso, el estado de las tareas puede ir con retraso, el cierre puede tardar, hay un solo equipo por sesión, los compañeros no pueden crear sus propios equipos y el líder no se puede cambiar.',
        },
      ],
    },
    {
      id: 'enable-agent-teams',
      title: 'Cómo activar Agent Teams',
      content: [
        {
          type: 'paragraph',
          text: 'Pon CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS a 1 en tu shell o en el bloque env de settings.json. Los compañeros solo se crean en sesiones interactivas, no con la opción -p. En macOS o Linux:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude',
        },
        {
          type: 'paragraph',
          text: 'En PowerShell:',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"\nclaude',
        },
        {
          type: 'paragraph',
          text: 'Después pide un equipo con responsabilidades concretas, por ejemplo, revisar por separado la accesibilidad y los tests de un cambio. Con la función activa, un subagente al que Claude pone nombre por su cuenta puede arrancar como compañero, así que se puede formar un equipo aunque no lo hayas pedido.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué aporta CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm permite ejecutar sesiones independientes, consultar su historial, revisar cambios y seguir las tareas desde una aplicación de escritorio. Puedes combinar Claude Code, Codex y otros agentes compatibles sin compartir automáticamente sus conversaciones.',
        },
        {
          type: 'paragraph',
          text: 'Si quieres delegar la organización, el <a href="/es/guias/coordinador-agentes-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">coordinador de CodeAgentSwarm</a> recibe un objetivo, abre sesiones de trabajo y les reparte encargos. También puedes trabajar directamente con cada sesión.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Comparación y cuándo usar cada opción',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'compare-relation',
          text: 'Cómo se relacionan los agentes',
        },
        {
          type: 'paragraph',
          text: 'En Agent Teams, un líder coordina compañeros de Claude Code. En CodeAgentSwarm, puedes manejar sesiones directamente o encargar la coordinación a otro agente.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-control',
          text: 'Quién dirige el trabajo',
        },
        {
          type: 'paragraph',
          text: 'Ambos permiten delegar. Define el alcance, comprueba las decisiones y revisa el resultado antes de integrarlo.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-vendors',
          text: 'Proveedores',
        },
        {
          type: 'paragraph',
          text: 'Agent Teams pertenece a Claude Code. CodeAgentSwarm permite elegir entre varios agentes y proveedores en el mismo espacio de trabajo.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-context',
          text: 'Contexto y consumo',
        },
        {
          type: 'paragraph',
          text: 'Los contextos independientes no significan cuotas independientes. Los agentes autenticados con la misma cuenta pueden consumir sus límites compartidos. Anthropic indica que Agent Teams gasta bastantes más tokens que una sola sesión, y el consumo crece con el número de compañeros activos.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-fit',
          text: 'Cuándo encaja cada uno',
        },
        {
          type: 'paragraph',
          text: 'Usa Agent Teams para colaboración dentro de Claude Code. Considera CodeAgentSwarm cuando necesites combinar proveedores, organizar varios proyectos o revisar las sesiones desde una interfaz común.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-visibility',
          text: 'Visibilidad',
        },
        {
          type: 'paragraph',
          text: 'Claude Code permite consultar a los compañeros. CodeAgentSwarm añade una vista del conjunto, historial buscable, notificaciones y revisión de cambios entre sesiones.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Usar ambas opciones',
      content: [
        {
          type: 'paragraph',
          text: 'Puedes iniciar Claude Code en una terminal de CodeAgentSwarm y habilitar su función nativa de Agent Teams. El modo por defecto, en proceso, funciona en cualquier terminal y muestra a los compañeros en un panel bajo el prompt. Los paneles divididos necesitan tmux o iTerm2 y no funcionan en VS Code, Windows Terminal ni Ghostty. Los compañeros no aparecen como sesiones independientes de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Define qué archivos o tareas posee cada equipo. Para cambios que se puedan solapar, usa ramas y checkouts separados y revisa los diffs antes de integrar.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué son los Agent Teams de Claude Code?',
      answer: 'Son equipos de sesiones de Claude Code con contexto propio, coordinadas mediante un líder, una lista de tareas compartida y mensajes. Los compañeros también pueden escribirse entre sí.',
    },
    {
      question: '¿Son lo mismo que los subagentes?',
      answer: 'No. Los subagentes delegan trabajo dentro de una sesión y devuelven resultados a su llamador; también tienen contexto propio. Agent Teams coordina varias sesiones.',
    },
    {
      question: '¿Cómo se activan?',
      answer: 'Configura CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 en tu entorno o en el bloque env de settings.json y abre una sesión interactiva de Claude Code. A 31 de octubre de 2026 la función sigue siendo experimental y está desactivada por defecto.',
    },
    {
      question: '¿CodeAgentSwarm también puede coordinar agentes?',
      answer: 'Sí. Un coordinador puede planificar trabajo y abrir sesiones con agentes y modelos distintos. El usuario también puede supervisar y dirigir cada sesión.',
    },
    {
      question: '¿Varias sesiones dan más cuota?',
      answer: 'No. Separar conversaciones no amplía los límites de una cuenta. El consumo depende del proveedor, la autenticación y el trabajo de cada agente.',
    },
  ],
}

export default guide
