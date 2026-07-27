import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-squad-vs-codeagentswarm',
    locale: 'es',
    title: 'Claude Squad vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'Claude Squad vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'Claude Squad gestiona agentes de IA en paralelo dentro de tu terminal. CodeAgentSwarm hace lo mismo desde el escritorio. Comparativa honesta verificada en julio de 2026.',
    intro: `Claude Squad gestiona varios agentes de programación con IA dentro de tu terminal. CodeAgentSwarm le da a ese mismo paralelismo una interfaz de escritorio, con notificaciones, historial buscable entre agentes y un tablero kanban que los propios agentes actualizan.

Antes de seguir, transparencia total: CodeAgentSwarm lo hacemos nosotros. Justo por eso esta página dice dónde gana Claude Squad y enumera nuestros límites en voz alta (código cerrado, solo macOS y Windows, sin app móvil, todavía en beta, y tú pones tus propias suscripciones de agentes). Los dos se juzgan con los mismos criterios, y cada dato de terceros se verificó el 26 de julio de 2026 en la web del fabricante, su README público y los datos públicos de GitHub.

Resumen rápido: si vives en la terminal, trabajas por SSH en máquinas remotas y quieres código abierto AGPL, Claude Squad te encaja mejor. Si prefieres una ventana de escritorio con notificaciones, historial entre agentes, diffs en vivo y cinco proveedores en el mismo sitio, eso es lo que construimos nosotros.`,
    ctaText: 'Si quieres los mismos agentes en paralelo pero con ventana de escritorio, notificaciones e historial buscable de todos los agentes, descarga CodeAgentSwarm y pruébalo junto a Claude Squad.',
    highlightedWords: ['Claude Squad', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    alternateSlug: 'claude-squad-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Squad gestiona varios agentes de programación con IA dentro de tu terminal, mientras que CodeAgentSwarm le da a ese mismo paralelismo una app de escritorio con notificaciones, historial de conversaciones buscable entre agentes y tablero kanban.',
        },
        {
          type: 'paragraph',
          text: 'Todo lo demás sale de ahí. Uno es una aplicación de terminal que abres con una tecla por SSH, el otro es una ventana que dejas abierta en el segundo monitor. Si prefieres la foto completa de la categoría, empieza por <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA</a>, y la guía del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> explica el flujo de trabajo en sí.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Nosotros hacemos CodeAgentSwarm, así que léelo como lo que es, una comparativa con parte interesada, y comprueba los datos por tu cuenta. Todos los datos de terceros de esta página se verificaron el 26 de julio de 2026 en la web del fabricante, su README público y los datos públicos de GitHub. Cuando algo no está documentado, lo decimos en vez de inventarlo.',
        },
      ],
    },
    {
      id: 'what-is-claude-squad',
      title: 'Qué es Claude Squad',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://smtg-ai.github.io/claude-squad/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad</a> es una aplicación de terminal que gestiona varios agentes de IA. El repositorio <a href="https://github.com/smtg-ai/claude-squad" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">smtg-ai/claude-squad</a> lo describe como una forma de gestionar agentes tipo Claude Code, Codex, OpenCode y Amp, y su README añade Gemini y otros agentes locales como Aider, que lanzas por sesión con el flag de programa o con un perfil con nombre.',
        },
        {
          type: 'paragraph',
          text: 'El README explica cómo funciona por dentro: tmux para crear una sesión de terminal aislada por agente, git worktrees para que cada sesión trabaje en su propia rama, y una interfaz de texto para moverte entre ellas. Se instala con Homebrew o con un script de shell, queda como el binario <code>cs</code>, y tmux y la CLI de GitHub aparecen como requisitos previos.',
        },
        {
          type: 'list',
          items: [
            'Código abierto con licencia AGPL-3.0 y unas 8.200 estrellas en GitHub (8.186 el 26 de julio de 2026)',
            'Último commit público el 17 de junio de 2026',
            'Una sesión de tmux y un git worktree por tarea, así las ramas no chocan',
            'Una pestaña de diff para revisar cambios, más teclas para commitear, hacer push, pausar y reanudar una sesión',
            'Un modo de aceptación automática en segundo plano (el flag autoyes) para los agentes que preguntan sin parar',
            'Gratis, sin cuenta y sin componente de servidor',
          ],
        },
        {
          type: 'paragraph',
          text: 'Es un diseño realmente bueno para quien ya trabaja en la terminal. No instalas nada más allá de un binario, se ejecuta en la máquina donde vive tu código, y todo es auditable porque el código fuente es público.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS y Windows, cada terminal es un proceso de agente real, y eliges el agente por terminal: Claude Code, Codex CLI, Antigravity CLI, OpenCode o Kimi Code.',
        },
        {
          type: 'image',
          alt: 'Tres agentes de programación con IA distintos ejecutándose como terminales independientes lado a lado en una ventana de CodeAgentSwarm',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'CodeAgentSwarm ejecuta varias CLI de agentes a la vez en una ventana, cada terminal con su propio proceso y su propia conversación.',
        },
        {
          type: 'list',
          items: [
            'Notificaciones de escritorio cuando un agente termina o se para a preguntarte algo',
            'Historial de conversaciones buscable de los cinco agentes, con reanudación desde cualquier entrada',
            'Diffs de archivos en vivo por terminal, para ver qué toca cada agente mientras trabaja',
            'Control de permisos, con un modo Turbo para las operaciones que quieras aprobar automáticamente',
            'Un tablero kanban que los propios agentes actualizan por MCP',
            'Git worktrees por sesión, cambio entre proyectos, mensajes de commit con IA e indicador de cuota del proveedor',
            'Marketplaces de skills y de MCP compartidos entre los agentes que uses',
          ],
        },
        {
          type: 'paragraph',
          text: 'Nuestros límites, sin adornos: la app es de código cerrado y no tiene repositorio público, solo se distribuye para macOS y Windows, no hay app móvil, sigue en beta (gratis y con Pro incluido durante ese periodo) y no somos proveedor de modelos, así que pones tus suscripciones de Claude, OpenAI u otras.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'table',
          headers: ['', 'Claude Squad', 'CodeAgentSwarm'],
          rows: [
            ['Plataformas', 'Entornos de terminal con tmux y la CLI de GitHub instalados, vía Homebrew o script de shell. Una instalación nativa en Windows no está documentada en su web a 26 de julio de 2026', 'App de escritorio para macOS y Windows'],
            ['Interfaz', 'Interfaz de terminal, guiada por teclado', 'Espacio de trabajo gráfico de escritorio con paneles de terminal'],
            ['Agentes soportados', 'Claude Code, Codex, Gemini, Amp, OpenCode y otros agentes locales como Aider, elegidos por sesión', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code'],
            ['Modelo de aislamiento', 'Una sesión de tmux y un git worktree por tarea, con una rama para cada una', 'Un proceso separado por terminal, con git worktrees opcionales por sesión'],
            ['Notificaciones', 'No documentado en su web a 26 de julio de 2026', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'Las sesiones se pueden pausar y reanudar en la app. Un historial buscable entre agentes no está documentado en su web a 26 de julio de 2026', 'Historial buscable de los cinco agentes, con reanudación'],
            ['Gestión de tareas', 'Lista de sesiones con su estado. Un tablero kanban no está documentado en su web a 26 de julio de 2026', 'Tablero kanban que los agentes actualizan por MCP'],
            ['Código abierto', 'Sí, AGPL-3.0', 'No, código cerrado y sin repositorio público de la app'],
            ['Precio', 'Gratis', 'Gratis durante la beta con Pro incluido, y tú pones tus suscripciones de agentes'],
            ['Último commit público (verificado el 26 jul 2026)', '17 de junio de 2026', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Verificado el 26 de julio de 2026 en la web de Claude Squad, su README público y GitHub. Evitamos a propósito afirmar que le falta algo: donde su documentación no dice nada, esta tabla tampoco.',
        },
      ],
    },
    {
      id: 'when-claude-squad',
      title: 'Cuándo Claude Squad es mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'Son ventajas de verdad, no concesiones de cortesía. Si alguna te describe, Claude Squad gana y deberías usarlo.',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabajas en máquinas remotas.</strong> Claude Squad se ejecuta donde vive tu código. Por SSH contra un servidor de desarrollo, un VPS o una estación Linux, una app de terminal tiene la forma correcta y una interfaz de escritorio directamente no está.',
            '<strong>Quieres código abierto.</strong> AGPL-3.0, repositorio público y unas 8.200 estrellas. Puedes leer cada línea, hacer un fork y auditar qué hace con tu código. CodeAgentSwarm no puede ofrecerte eso.',
            '<strong>Quieres Linux.</strong> CodeAgentSwarm solo se distribuye para macOS y Windows. Si tu máquina diaria es Linux, Claude Squad está disponible para ti y nosotros no.',
            '<strong>Ya vives en tmux.</strong> Si tu memoria muscular es de teclado y te molesta pasar al ratón, una interfaz de texto con gestión de sesiones a una tecla te va a parecer más rápida que cualquier ventana.',
            '<strong>Quieres cero peso de instalación.</strong> Un binario, sin cuenta, sin actualizador y sin runtime de escritorio empaquetado.',
            '<strong>Quieres Aider u otro agente local.</strong> Su flag de programa lanza cualquier comando de agente local, algo más amplio que nuestra lista fija de cinco.',
          ],
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'Cuándo CodeAgentSwarm es mejor opción',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Prefieres que te avisen a estar mirando.</strong> Las notificaciones de escritorio saltan cuando un agente termina o necesita respuesta, así puedes irte a otra cosa en vez de vigilar un panel.',
            '<strong>Usas cinco proveedores.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode y Kimi Code están soportados directamente, incluidos Antigravity y Kimi, que no aparecen entre los agentes del README de Claude Squad a 26 de julio de 2026.',
            '<strong>Quieres un historial que se pueda buscar.</strong> Todas las conversaciones de todos los agentes se buscan desde un solo sitio, y puedes reanudar cualquiera donde la dejaste.',
            '<strong>Quieres ver los diffs en vivo.</strong> Los diffs por terminal se actualizan mientras el agente edita, así ves pronto si dos agentes se pisan en vez de descubrirlo al revisar.',
            '<strong>Quieres el trabajo registrado.</strong> El tablero kanban lo actualizan los propios agentes por MCP, así que refleja lo que ha pasado de verdad.',
            '<strong>Estás en Windows.</strong> CodeAgentSwarm es una app de Windows de primera clase, mientras que una instalación nativa en Windows de Claude Squad no está documentada en su web a 26 de julio de 2026.',
            '<strong>Te chocas con los límites del plan.</strong> El indicador de cuota te enseña cuánto te queda del proveedor antes de que un agente se quede a medias.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Una forma justa de decidir: si prefieres pulsar una tecla antes que hacer clic, quédate con Claude Squad. Si prefieres que te interrumpa una notificación antes que acordarte de mirar, quédate con CodeAgentSwarm.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Usar los dos',
      content: [
        {
          type: 'paragraph',
          text: 'No se estorban. Un reparto habitual es Claude Squad en la máquina remota, donde una app de terminal es la única opción sensata, y CodeAgentSwarm en el portátil para los proyectos que estás supervisando activamente. Los dos usan git worktrees, así que la organización de ramas te resulta familiar en cualquiera de los dos.',
        },
        {
          type: 'paragraph',
          text: 'Si estás valorando más de dos herramientas, la <a href="/es/guias/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">comparativa con Vibe Kanban</a> cubre el enfoque de kanban primero para el mismo problema, y <a href="/es/guias/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst, antes Crystal</a>, cubre el enfoque de editor visual.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Claude Squad es código abierto?',
      answer: 'Sí. Claude Squad se publica en github.com/smtg-ai/claude-squad con licencia AGPL-3.0 y unas 8.200 estrellas (8.186 al verificarlo el 26 de julio de 2026). CodeAgentSwarm es de código cerrado y no tiene repositorio público de la aplicación, lo cual es un punto real a favor de Claude Squad si te importa auditar el código o hacer un fork.',
    },
    {
      question: '¿Claude Squad sigue mantenido?',
      answer: 'Su último commit público en la rama principal fue el 17 de junio de 2026, verificado el 26 de julio de 2026, es decir algo más de un mes antes de escribir esta página. Es un dato, no un veredicto: muchas herramientas de terminal estables se quedan calladas durante semanas. Mira tú mismo el repositorio antes de montar un flujo de trabajo encima.',
    },
    {
      question: '¿Claude Squad soporta Antigravity CLI o Kimi Code?',
      answer: 'Ninguno aparece entre sus agentes soportados en el README de Claude Squad a 26 de julio de 2026, que menciona Claude Code, Codex, Gemini, Amp, OpenCode y otros agentes locales como Aider. Su flag de programa sí lanza un comando local arbitrario, así que apuntarlo a otra CLI puede funcionar, pero no está documentado. CodeAgentSwarm soporta Antigravity CLI y Kimi Code de forma directa, junto a Claude Code, Codex CLI y OpenCode.',
    },
    {
      question: '¿Necesito saber tmux para usar Claude Squad?',
      answer: 'Su README lista tmux y la CLI de GitHub como requisitos previos y explica que tmux es lo que crea la sesión aislada de cada agente, mientras los git worktrees aíslan el código. No hace falta que seas experto en tmux, porque la interfaz de texto crea y cambia de sesión con teclas sueltas, pero sí necesitas tener tmux instalado y estar cómodo trabajando en una terminal. CodeAgentSwarm resuelve ese aislamiento equivalente dentro de una app de escritorio.',
    },
  ],
}

export default guide
