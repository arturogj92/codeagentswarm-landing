import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-cli-ia',
    locale: 'es',
    title: 'Enjambre de agentes CLI de IA: ejecuta varios agentes de código en paralelo',
    metaTitle: 'Enjambre de agentes CLI de IA: ejecuta Claude Code, Codex y Gemini juntos (2026)',
    metaDescription: 'Un enjambre de agentes CLI de IA son varios agentes de código (Claude Code, Codex, Gemini) en paralelo en un solo sitio. Aquí ves cómo gestionarlos.',
    intro: `Un enjambre de agentes CLI de IA es lo que tienes cuando dejas de pensar en un solo agente de código en un terminal y empiezas a ejecutar varios a la vez. Claude Code en un terminal, Codex CLI en otro, Gemini CLI en un tercero, todos trabajando en el mismo proyecto al mismo tiempo.

La idea suena caótica, y mal hecha lo es. El objetivo de esta guía es enseñarte a hacerlo bien: cómo ejecutar de verdad varios agentes de código en paralelo, cómo decidir qué agente se encarga de qué, y cómo no perder la visibilidad de un workspace donde tres o cuatro agentes editan archivos a la vez.

Yo trabajo con enjambres mixtos casi todos los días. Aquí te cuento qué es realmente un enjambre de agentes CLI de IA, los compromisos honestos de cada forma de montarlo, y dónde un workspace hecho a propósito se gana su sitio frente a las pestañas del terminal o tmux.`,
    ctaText: 'Ejecuta Claude Code, Codex y Gemini en paralelo en un solo workspace de CodeAgentSwarm. Varios agentes, visibilidad compartida y un único sitio desde el que vigilarlos.',
    highlightedWords: ['enjambre de agentes CLI de IA', 'en paralelo'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'ai-cli-agent-swarm',
  },
  sections: [
    {
      id: 'what-is-it',
      title: '¿Qué es un enjambre de agentes CLI de IA?',
      content: [
        {
          type: 'image',
          alt: 'OpenAI Codex, Google Gemini CLI y Anthropic Claude Code ejecutándose a la vez como terminales separados en una sola ventana de CodeAgentSwarm',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'Un enjambre multifabricante: Codex, Gemini CLI y Claude Code funcionando juntos en un mismo espacio de trabajo de CodeAgentSwarm, cada uno en su propio terminal.',
        },
        {
          type: 'paragraph',
          text: 'Un enjambre de agentes CLI de IA son varios agentes de código por línea de comandos, independientes, ejecutándose en paralelo en un solo sitio, con visibilidad compartida de lo que hace cada uno. En vez de un único agente en un único terminal, tienes un puñado de ellos, cada uno con su propio proceso, su propia conversación y su propio contexto, trabajando en tareas a la vez.',
        },
        {
          type: 'paragraph',
          text: 'Los agentes son herramientas de línea de comandos que seguramente ya usas: <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> de Anthropic, <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a> de OpenAI y <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Gemini CLI</a> de Google. Cada uno ejecuta <code>claude</code>, <code>codex</code> o <code>gemini</code> en su propio terminal. No saben unos de otros. El enjambre es la capa que pones alrededor para poder ejecutarlos juntos sin perder el hilo.',
        },
        {
          type: 'paragraph',
          text: 'Un enjambre de verdad es más que "varios terminales abiertos". Lo que lo hace usable es el contexto compartido: un sitio donde ves en qué trabaja cada agente, recibes un aviso cuando uno termina o necesita tu respuesta, buscas en el historial de todos, observas los cambios de archivos que hace cada uno y controlas qué pueden hacer sin tu confirmación. Sin esa capa solo tienes muchos terminales y mucho adivinar.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Un enjambre funciona sobre las suscripciones que ya pagas. Cada terminal usa tu plan de Claude, OpenAI o Google de forma independiente. No hay un plan especial de "enjambre" ni un coste extra por agente por ejecutarlos en paralelo.',
        },
        {
          type: 'paragraph',
          text: 'Si solo te interesa un proveedor, las guías por herramienta entran en más detalle: <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>, el <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Codex</a> y el <a href="/es/guias/enjambre-de-agentes-gemini" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Gemini</a>. Esta página es la vista entre proveedores, donde los mezclas.',
        },
      ],
    },
    {
      id: 'which-agent-for-what',
      title: '¿Qué CLI de código conviene para cada cosa?',
      content: [
        {
          type: 'paragraph',
          text: 'La respuesta honesta es que ningún agente es el mejor en todo, y por eso compensa ejecutar un enjambre. Asignas cada trabajo al agente que suele hacerlo bien, en lugar de forzar a una sola herramienta a cubrirlo todo. Así suelo repartirlo yo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Claude Code para refactors profundos y razonamiento',
          id: 'claude-for-refactors',
        },
        {
          type: 'paragraph',
          text: 'A Claude Code recurro cuando un cambio toca muchos archivos y necesita razonar con cuidado: refactorizar un módulo, seguir un bug a través de varias capas o reescribir algo donde me importa la estructura del resultado. Tiende a mantener un modelo mental coherente en un cambio grande y gestiona bien los conflictos de Git cuando comparte proyecto con otros agentes.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Codex CLI para tareas concretas y acotadas',
          id: 'codex-for-tasks',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI encaja bien en trabajos bien delimitados: implementa esta función, añade este endpoint, escribe tests para este archivo, arregla este fallo concreto. Cuando la tarea está acotada y la especificación es clara, llega rápido a un resultado que funciona. Suelo darle las piezas que ya tengo decididas mientras Claude está ocupado con el refactor grande.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Gemini CLI para trabajo de mucho contexto',
          id: 'gemini-for-context',
        },
        {
          type: 'paragraph',
          text: 'En Gemini CLI me apoyo cuando hay mucho que leer de golpe: entender una base de código que no conozco, resumir un conjunto grande de archivos o responder preguntas que necesitan una visión amplia del proyecto. Su gran ventana de contexto te deja meterle más antes de tener que empezar a recortar lo que ve.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'No tienes que elegir una vez y quedarte ahí. Por cada tarea, pregúntate cuál es la forma más barata y fiable de obtener un resultado correcto, y mándala a ese agente. Un enjambre solo ayuda si de verdad aprovechas la diferencia entre los agentes.',
        },
        {
          type: 'paragraph',
          text: 'Nada de esto es una regla fija, los modelos cambian de un mes a otro. Tómalo como un sesgo inicial, no como una ley, y ajústalo según lo que veas en tus propios proyectos.',
        },
      ],
    },
    {
      id: 'worktrees-and-teams',
      title: 'Dos preguntas que aparecen las primeras',
      content: [
        {
          type: 'heading',
          level: 3,
          text: '¿Necesito git worktrees para ejecutar agentes en paralelo?',
          id: 'do-i-need-worktrees',
        },
        {
          type: 'paragraph',
          text: 'No, los worktrees son opcionales. Una preocupación habitual es que varios agentes en el mismo repo se pisen entre ellos, así que la gente recurre a los <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees</a> para dar a cada agente su propio checkout. Eso puede venir bien cuando dos agentes hacen cambios grandes y en conflicto sobre la misma rama. Pero no hace falta para empezar.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica puedes ejecutar varios terminales contra un mismo workspace y un mismo checkout. Cuando los agentes editan archivos distintos no hay conflicto. Cuando tocan el mismo archivo, Git gestiona el merge y los agentes resuelven los conflictos bastante bien. Los worktrees son una herramienta para los casos raros en los que quieres aislamiento total, no un requisito para montar un enjambre.',
        },
        {
          type: 'heading',
          level: 3,
          text: '¿Es lo mismo que los agent teams de Claude Code?',
          id: 'is-this-agent-teams',
        },
        {
          type: 'paragraph',
          text: 'No, son cosas distintas. Los agent teams de Anthropic son subagentes dentro de una sola sesión de Claude Code: un agente principal lanza ayudantes que le reportan, todo dentro de un proceso y un proveedor. Un enjambre de agentes CLI de IA son varios agentes independientes que supervisas tú directamente, cada uno en su terminal, posiblemente de proveedores distintos (Claude Code, Codex, Gemini). Uno es delegación dentro de una sesión, el otro eres tú ejecutando y vigilando varias sesiones reales a la vez. Pueden convivir, pero resuelven problemas diferentes.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Método 1: varias ventanas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'El enjambre más simple es el que puedes montar ahora mismo. Abre unas cuantas pestañas de terminal, ve a tu proyecto en cada una y arranca un agente distinto en cada pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1 - refactor profundo\ncd ~/mi-proyecto\nclaude\n\n# Pestaña 2 - tarea concreta\ncd ~/mi-proyecto\ncodex\n\n# Pestaña 3 - leer la base de código\ncd ~/mi-proyecto\ngemini',
        },
        {
          type: 'paragraph',
          text: 'Eso ya es un enjambre de tres agentes funcionando. Cada pestaña es un agente independiente sobre el mismo proyecto, y cambias entre ellas para dar instrucciones.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A favor',
          id: 'terminal-windows-pros',
        },
        {
          type: 'list',
          items: [
            'Gratis, no necesitas herramientas extra',
            'Funciona al momento, sin configuración',
            'Puedes mezclar proveedores desde el primer minuto',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'En contra',
          id: 'terminal-windows-cons',
        },
        {
          type: 'list',
          items: [
            'Pierdes rápido la cuenta de qué pestaña ejecuta qué agente y qué tarea',
            'Sin aviso cuando un agente termina o se para a preguntarte algo',
            'Sin vista compartida, tienes que entrar en cada pestaña para ver el estado',
            'Sin búsqueda en el historial de los distintos agentes',
            'Las ediciones que se solapan entre agentes te pillan por sorpresa',
            'Con tres o más pestañas todas empiezan a parecer iguales',
          ],
        },
        {
          type: 'paragraph',
          text: 'Bien para dos agentes. A partir de ahí, el tiempo que pasas cambiando y comprobando empieza a comerse el que te ahorró el paralelismo.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si vives en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te da paneles divididos y sesiones persistentes, así que ves varios agentes a la vez sin saltar entre pestañas.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inicia una sesión de tmux para el enjambre\ntmux new-session -s swarm\n\n# Divide en paneles\ntmux split-window -h\ntmux split-window -v\n\n# Ejecuta un agente distinto en cada panel: claude, codex, gemini',
        },
        {
          type: 'paragraph',
          text: 'También puedes desconectarte y volver a conectarte, así que el enjambre sobrevive a cerrar la ventana del terminal. Para un montaje multiproveedor hecho a mano, esto es casi lo mejor que vas a conseguir gratis.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A favor',
          id: 'tmux-pros',
        },
        {
          type: 'list',
          items: [
            'Gratis y disponible casi en cualquier sitio',
            'Ves varios paneles a la vez, sin cambiar de pestaña',
            'Las sesiones persisten aunque te desconectes',
            'Muy automatizable si quieres montar tu propio diseño',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'En contra',
          id: 'tmux-cons',
        },
        {
          type: 'list',
          items: [
            'Curva de aprendizaje pronunciada si tmux es nuevo para ti',
            'Sigue sin haber notificaciones de escritorio cuando un agente termina',
            'Sin historial buscable entre los distintos agentes',
            'Solo texto, los paneles se quedan estrechos pasando de tres o cuatro agentes',
            'Sin tablero de tareas ni capa de organización',
            'Montas el diseño a mano cada vez',
            'Vigilar conflictos entre agentes queda enteramente de tu lado',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es un gran multiplexor de propósito general, pero nunca se hizo para supervisar agentes de código de IA. Las carencias salen en cuanto ejecutas un enjambre mixto de tres o más agentes de forma habitual.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio hecha justo para esto: ejecutar un enjambre de agentes CLI de IA con visibilidad y control de verdad. Funciona en macOS y Windows, te da varios terminales en un solo workspace y te deja elegir el agente por terminal. Funciona sobre tus suscripciones, no es un proveedor de modelos, así que tus planes de Claude, OpenAI y Google siguen funcionando tal cual.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con claude-code, gemini cli y codex cli, además de un interruptor Enable Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Elección de agente por terminal: pon cada terminal en claude-code, codex cli o gemini cli, para que un mismo enjambre mezcle los tres fabricantes.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que te da el workspace para gestionar un enjambre mixto:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Varios agentes en paralelo, tú eliges por terminal',
          id: 'six-agents',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal tiene un selector SELECT AI AGENT que ofrece claude-code, codex cli y gemini cli. Pon un terminal en Claude Code para un refactor, otro en Codex para una tarea acotada y otro en Gemini para lectura de mucho contexto, todo en el mismo workspace y sobre el mismo proyecto. Tú decides la mezcla y puedes cambiarla por terminal cuando quieras.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su título para reflejar lo que está haciendo su agente en ese momento. En lugar de tres terminales idénticos, ves "Refactorizando Auth", "Escribiendo tests de API", "Leyendo módulo de pagos", y de un vistazo sabes qué agente está en qué tarea sin entrar.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio de todos los agentes',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'Cuando cualquier agente termina su tarea o se para a preguntarte algo, recibes una notificación de escritorio nativa. Puedes centrarte en un terminal y dejar que el resto te avise cuando te necesite, que es justo el sentido de ejecutar un enjambre. La <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del sistema de notificaciones</a> entra en el detalle.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial buscable de todos los agentes',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación, de cada agente y cada proveedor, se guarda y se puede buscar en un solo sitio. Puedes encontrar lo que hizo Codex ayer, retomar una sesión de Gemini o rastrear qué agente hizo un cambio en todo el enjambre. La <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de conversaciones</a> explica cómo funciona.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'Puedes observar en tiempo real los cambios de archivos que hace cada agente, por terminal y a nivel de proyecto. En un enjambre mixto esto es lo que evita que las ediciones solapadas te sorprendan: ves cuándo dos agentes van hacia el mismo archivo antes de que se convierta en un problema de merge. Más en la <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de cambios en tiempo real</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Modo Turbo con permisos granulares',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Más agentes significa más acciones ocurriendo a la vez, así que el control de permisos importa más, no menos. El Modo Turbo aprueba automáticamente las operaciones seguras y mantiene bajo control las peligrosas, con control granular sobre qué puede hacer cada terminal sin supervisión. La <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del Modo Turbo</a> tiene la configuración completa.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un tablero de tareas compartido y herramientas de proyecto',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'Un tablero kanban se sitúa sobre el enjambre, y los agentes lo actualizan ellos mismos por MCP a medida que trabajan. Suma los accesos directos a proyectos, un marketplace de skills, un marketplace de MCP y mensajes de commit de Git generados por IA, y el workspace se convierte en el único sitio desde el que coordinas todo el enjambre, en lugar de hacer malabares con pestañas.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Para el paso a paso de cómo abrir y organizar terminales, mira la <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de varios terminales</a>. El mismo workspace ejecuta también terminales de Codex y Gemini.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Cómo se comparan las tres formas de ejecutar un enjambre en lo que de verdad importa cuando varios agentes trabajan a la vez:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Coste',
          id: 'compare-cost',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Gratis',
            '<strong>tmux/screen:</strong> Gratis',
            '<strong>CodeAgentSwarm:</strong> Plan gratuito disponible, Pro para funciones avanzadas, funciona sobre tus suscripciones de agentes',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mezclar proveedores',
          id: 'compare-mixing',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Posible, pero recuerdas de memoria qué agente está dónde',
            '<strong>tmux/screen:</strong> Posible, los paneles no están etiquetados por agente',
            '<strong>CodeAgentSwarm:</strong> Selector de agente por terminal, con el agente activo visible en todo momento',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones',
          id: 'compare-notifications',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Ninguna',
            '<strong>tmux/screen:</strong> Ninguna salvo que la programes tú',
            '<strong>CodeAgentSwarm:</strong> Notificaciones de escritorio nativas cuando cualquier agente termina o necesita tu respuesta',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial entre agentes',
          id: 'compare-history',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Se pierde al cerrar la pestaña',
            '<strong>tmux/screen:</strong> Se mantiene mientras vive la sesión, sin búsqueda',
            '<strong>CodeAgentSwarm:</strong> Guardado de forma permanente y buscable entre todos los agentes y proveedores',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad de cambios de archivos',
          id: 'compare-diffs',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Lo que imprima cada agente, nada compartido',
            '<strong>tmux/screen:</strong> Igual, sin vista entre agentes',
            '<strong>CodeAgentSwarm:</strong> Diffs en vivo por terminal y a nivel de proyecto, así las ediciones solapadas se ven pronto',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Curva de aprendizaje',
          id: 'compare-learning',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Ninguna',
            '<strong>tmux/screen:</strong> De moderada a pronunciada (atajos, configuración, gestión de paneles)',
            '<strong>CodeAgentSwarm:</strong> Baja, una interfaz visual con patrones familiares',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Si solo vas a ejecutar dos agentes, las pestañas del terminal están bien y no le des más vueltas. Si ya vives en tmux, añadir un par de agentes a tu montaje es natural. Pero en cuanto ejecutes un enjambre mixto de tres o más agentes de forma habitual, y quieras ver qué hace cada uno, que te avisen cuando te necesiten y cazar las ediciones solapadas antes de que muerdan, un workspace hecho a propósito quita la fricción que los otros métodos dejan ahí.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un enjambre de agentes CLI de IA?',
      answer: 'Son varios agentes de código por línea de comandos, independientes (como Claude Code, Codex CLI y Gemini CLI), ejecutándose en paralelo en un solo sitio, con visibilidad compartida de lo que hace cada uno. Cada agente es su propio proceso, con su conversación y su contexto, y el enjambre es la capa a su alrededor que añade notificaciones, historial buscable, visibilidad de cambios de archivos y control de permisos.',
    },
    {
      question: '¿Puedo ejecutar Claude Code, Codex y Gemini a la vez?',
      answer: 'Sí. Cada agente se ejecuta como un proceso CLI independiente, así que puedes tener Claude Code, Codex CLI y Gemini CLI a la vez sobre el mismo proyecto. CodeAgentSwarm te deja elegir el agente por terminal y ejecutar varios a la vez en un solo workspace, así que mezclas proveedores con total libertad.',
    },
    {
      question: '¿Qué CLI de código uso para cada cosa?',
      answer: 'No hay un único agente mejor, y por eso ayuda un enjambre. Como sesgo inicial: Claude Code para refactors profundos y cambios que necesitan razonar con cuidado entre muchos archivos, Codex CLI para tareas concretas y bien delimitadas como implementar una función o arreglar un fallo específico, y Gemini CLI para trabajo de mucho contexto como entender una base de código desconocida. Los modelos cambian a menudo, así que tómalo como punto de partida y ajústalo según tus propios resultados.',
    },
    {
      question: '¿Necesito git worktrees para ejecutar agentes en paralelo?',
      answer: 'No, los worktrees son opcionales. Puedes ejecutar varios agentes contra un mismo workspace y un mismo checkout. Cuando editan archivos distintos no hay conflicto, y cuando tocan el mismo archivo Git gestiona el merge y los agentes lo resuelven bastante bien. Los git worktrees son útiles cuando quieres aislamiento total para cambios grandes y en conflicto, pero no son un requisito para montar un enjambre.',
    },
    {
      question: '¿Un enjambre de agentes CLI de IA es lo mismo que los agent teams de Claude Code?',
      answer: 'No. Los agent teams de Claude Code son subagentes dentro de una sola sesión de Claude Code, todo dentro de un proceso y un proveedor. Un enjambre de agentes CLI de IA son varios agentes independientes que supervisas tú directamente, cada uno en su terminal, posiblemente de proveedores distintos. Uno es delegación dentro de una sesión, el otro es ejecutar y vigilar varias sesiones reales a la vez. Resuelven problemas diferentes y pueden convivir.',
    },
  ],
}

export default guide
