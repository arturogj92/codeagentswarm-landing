import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ejecutar-multiples-sesiones-claude-code',
    locale: 'es',
    title: '¿Se pueden ejecutar varias sesiones de Claude Code a la vez? Sí, y así se hace',
    metaTitle: '¿Se pueden ejecutar varias sesiones de Claude Code a la vez? 3 métodos comparados (2026)',
    metaDescription: 'Sí, puedes ejecutar varias sesiones de Claude Code en paralelo. Aprende 3 métodos: pestañas de terminal, tmux/screen y CodeAgentSwarm. Pros, contras y paso a paso de cada uno.',
    intro: `Si alguna vez te has preguntado si puedes tener más de una sesión de Claude Code funcionando al mismo tiempo, la respuesta es sí. Cada sesión es un proceso independiente con su propia conversación y contexto.

La verdadera pregunta no es si se puede, sino cómo deberías hacerlo. Hay varios enfoques distintos y cada uno tiene sus ventajas y desventajas. Algunos son gratuitos y minimalistas, otros te dan visibilidad y control real.

En esta guía te explico los tres métodos principales, los comparo de forma honesta y te ayudo a elegir el que mejor se adapte a tu forma de trabajar.`,
    ctaText: 'Prueba a ejecutar varias sesiones de Claude Code con CodeAgentSwarm. Seis terminales, un solo espacio de trabajo, cero cambios de contexto.',
    highlightedWords: ['varias sesiones', 'Claude Code'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'run-multiple-claude-code-sessions',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: sí, se puede',
      content: [
        {
          type: 'paragraph',
          text: 'Las sesiones de <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> son procesos independientes. Cuando abres un terminal y ejecutas <code>claude</code>, esa sesión tiene su propio hilo de conversación, su propia ventana de contexto y su propio estado. No comparte nada con otras sesiones.',
        },
        {
          type: 'paragraph',
          text: 'Eso significa que puedes abrir un segundo terminal, ejecutar <code>claude</code> otra vez, y ya tienes dos sesiones de IA completamente separadas funcionando en paralelo. Una puede estar refactorizando tu módulo de autenticación mientras la otra escribe tests para tu capa de API. No saben nada la una de la otra.',
        },
        {
          type: 'paragraph',
          text: 'Esto no se limita a Claude Code. El mismo principio aplica a Codex CLI y Gemini CLI. Incluso puedes mezclar distintos agentes en paralelo si tu flujo de trabajo lo requiere.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cada sesión de terminal usa tu suscripción de Claude de forma independiente. No hay ningún plan especial de "multisesión" ni coste extra por ejecutar sesiones en paralelo.',
        },
        {
          type: 'paragraph',
          text: 'La cuestión real es cómo gestionas esas sesiones una vez que tienes más de una o dos funcionando. Ahí es donde entran los tres métodos que te explico a continuación.',
        },
      ],
    },
    {
      id: 'metodo-ventanas-terminal',
      title: 'Método 1: Varias ventanas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'El enfoque más simple es uno que probablemente ya conoces. Abre varias pestañas o ventanas de terminal, navega al directorio de tu proyecto en cada una e inicia una sesión de Claude Code.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nclaude\n\n# Terminal tab 2\ncd ~/my-project\nclaude\n\n# Terminal tab 3\ncd ~/my-project\nclaude',
        },
        {
          type: 'paragraph',
          text: 'Eso es todo. Cada pestaña tiene ahora una sesión independiente de Claude Code. Puedes alternar entre pestañas y dar instrucciones diferentes a cada una.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ventajas',
          id: 'ventanas-terminal-ventajas',
        },
        {
          type: 'list',
          items: [
            'Gratis, no necesitas herramientas adicionales',
            'Funciona de inmediato, sin configuración',
            'Fácil de entender',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desventajas',
          id: 'ventanas-terminal-desventajas',
        },
        {
          type: 'list',
          items: [
            'Pierdes el control rápidamente de qué pestaña está haciendo qué',
            'Sin notificaciones cuando una sesión termina o necesita tu atención',
            'Sin visibilidad compartida entre sesiones, tienes que hacer clic en cada pestaña para comprobar',
            'No puedes buscar en el historial de conversaciones de distintas sesiones',
            'Si dos sesiones editan el mismo archivo, tienes que resolver los conflictos manualmente',
            'Las pestañas empiezan a verse idénticas, especialmente con tres o más',
          ],
        },
        {
          type: 'paragraph',
          text: 'Este método funciona bien para dos sesiones. Cuando pasas de ahí, el coste de ir cambiando y rastreando cada pestaña empieza a comerse el tiempo que ganaste al trabajar en paralelo.',
        },
      ],
    },
    {
      id: 'metodo-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si te manejas bien en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te da paneles divididos y sesiones persistentes. Puedes ver varias sesiones de Claude Code en pantalla al mismo tiempo sin cambiar de pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s coding\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run claude in each one',
        },
        {
          type: 'paragraph',
          text: 'Con tmux también puedes desconectarte de una sesión y reconectarte después, lo que significa que tus sesiones de Claude Code sobreviven aunque cierres la ventana del terminal.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ventajas',
          id: 'tmux-ventajas',
        },
        {
          type: 'list',
          items: [
            'Gratis y ampliamente disponible',
            'Ves varios paneles a la vez sin cambiar de pestaña',
            'Sesiones persistentes que sobreviven a desconexiones',
            'Altamente personalizable con archivos de configuración',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desventajas',
          id: 'tmux-desventajas',
        },
        {
          type: 'list',
          items: [
            'Curva de aprendizaje pronunciada si nunca has usado tmux',
            'Sigue sin haber notificaciones de escritorio cuando una sesión termina',
            'Sin historial de conversaciones ni búsqueda entre sesiones',
            'Interfaz de solo texto, los paneles se quedan pequeños con más de 3-4 sesiones',
            'Sin capa de gestión de tareas ni organización',
            'Configuración manual cada vez que empiezas una nueva sesión de trabajo',
            'La resolución de conflictos entre sesiones sigue siendo cosa tuya',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es una herramienta sólida y muchos desarrolladores ya la usan a diario. Pero fue diseñada como un multiplexor de terminal de propósito general, no específicamente para gestionar agentes de IA programando en paralelo. Las carencias se notan cuando ejecutas tres o más sesiones de Claude Code de forma habitual.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm se construyó específicamente para este problema: ejecutar varias sesiones de IA en paralelo con visibilidad y control reales. Es una app de escritorio que te da hasta seis terminales en un solo espacio de trabajo, con funcionalidades diseñadas en torno a cómo se comportan realmente los agentes de IA en paralelo.',
        },
        {
          type: 'image',
          alt: 'Seis terminales de Claude Code ejecutándose en paralelo en el espacio de trabajo de CodeAgentSwarm',
          src: '/images/guides/multi-terminal.png',
          caption: 'Seis terminales de IA funcionando simultáneamente, cada uno con su propio contexto, título dinámico y estado en tiempo real.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que incluye de serie:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hasta 6 terminales de IA en paralelo',
          id: 'seis-terminales',
        },
        {
          type: 'paragraph',
          text: 'Ejecuta Claude Code, Codex CLI o Gemini CLI en cualquier combinación. Cada terminal es independiente, con su propia conversación y contexto de proyecto. Puedes mezclar y combinar agentes según la tarea.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'titulos-dinamicos',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza automáticamente su título según lo que el agente está haciendo en ese momento. En vez de seis pestañas idénticas con "claude", ves títulos como "Refactorizando Auth", "Escribiendo Tests API", "Arreglando CSS Layout". De un vistazo, sabes exactamente en qué está trabajando cada sesión.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notificaciones-escritorio',
        },
        {
          type: 'paragraph',
          text: 'Cuando una sesión termina su tarea o necesita tu atención, recibes una notificación nativa de escritorio. Se acabó eso de ir cambiando de pestaña para ver si algo ha terminado. Puedes concentrarte en un terminal y dejar que los demás te avisen cuando necesiten algo. Para más detalles sobre cómo funciona, consulta la <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del sistema de notificaciones</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial completo de conversaciones con búsqueda',
          id: 'historial-conversaciones',
        },
        {
          type: 'paragraph',
          text: 'Todas las conversaciones de todos los terminales se guardan y se pueden buscar. Puedes volver atrás y ver qué hizo una sesión ayer, retomar una conversación o revisar el historial completo de cambios. Esto es especialmente útil cuando ejecutas muchas sesiones en paralelo y necesitas rastrear qué pasó y dónde. Más detalles en la <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de conversaciones</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tablero de tareas integrado',
          id: 'tablero-tareas',
        },
        {
          type: 'paragraph',
          text: 'Organiza tu trabajo con un tablero de tareas estilo kanban conectado directamente a tus terminales. Crea tareas, asígnalas a terminales y haz seguimiento visual del progreso. Cuando dos terminales trabajan en funcionalidades relacionadas, el tablero de tareas te ayuda a mantener la visión global.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Control de permisos con Turbo Mode',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Ejecutar varias sesiones implica más acciones en paralelo, lo que hace más importante la gestión de permisos. Turbo Mode te permite aprobar automáticamente las operaciones seguras mientras las peligrosas siguen requiriendo confirmación. Tú decides qué se aprueba automáticamente y qué necesita tu visto bueno. Consulta la <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode</a> para la configuración completa.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Detección de conflictos',
          id: 'deteccion-conflictos',
        },
        {
          type: 'paragraph',
          text: 'Cuando dos terminales tocan el mismo archivo, CodeAgentSwarm te ayuda a verlo en el momento. Puedes rastrear los cambios de archivos en tiempo real por terminal y a nivel de proyecto, para que las ediciones superpuestas no te pillen por sorpresa. Claude gestiona bien los conflictos de Git por sí solo, pero tener visibilidad de lo que cambia cada sesión hace que todo el flujo de trabajo sea más fluido. Más información en la <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de cambios en tiempo real</a>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Para una guía detallada sobre cómo configurar y usar varios terminales, consulta la <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía completa de multi-terminal</a>.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así se comparan los tres métodos en los aspectos que importan cuando ejecutas varias sesiones de IA programando:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Coste',
          id: 'comparar-coste',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Gratis',
            '<strong>tmux/screen:</strong> Gratis',
            '<strong>CodeAgentSwarm:</strong> Plan gratuito disponible, Pro para funcionalidades avanzadas',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tiempo de configuración',
          id: 'comparar-configuracion',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Cero, solo abre pestañas',
            '<strong>tmux/screen:</strong> 10-30 minutos para aprender lo básico, más para personalizar',
            '<strong>CodeAgentSwarm:</strong> 2 minutos para descargar y abrir',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones',
          id: 'comparar-notificaciones',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Ninguna',
            '<strong>tmux/screen:</strong> Ninguna (salvo que programes algo personalizado)',
            '<strong>CodeAgentSwarm:</strong> Notificaciones nativas de escritorio cuando las sesiones terminan o necesitan tu atención',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversaciones',
          id: 'comparar-historial',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Se pierde al cerrar la pestaña',
            '<strong>tmux/screen:</strong> Se conserva mientras la sesión esté activa, sin búsqueda',
            '<strong>CodeAgentSwarm:</strong> Historial completo guardado permanentemente, con búsqueda en todas las sesiones',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Múltiples proyectos',
          id: 'comparar-proyectos',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Posible pero desorganizado',
            '<strong>tmux/screen:</strong> Posible con sesiones con nombre',
            '<strong>CodeAgentSwarm:</strong> Espacios de trabajo con gestión por proyecto y seguimiento de archivos por proyecto',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Curva de aprendizaje',
          id: 'comparar-aprendizaje',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Ninguna',
            '<strong>tmux/screen:</strong> Moderada a alta (atajos de teclado, archivos de configuración, gestión de paneles)',
            '<strong>CodeAgentSwarm:</strong> Baja, interfaz visual con patrones familiares',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Si solo necesitas dos sesiones de vez en cuando, las pestañas de terminal funcionan bien. Si ya vives en tmux, añadir sesiones de Claude Code a tu configuración existente es natural. Pero si ejecutas habitualmente tres o más sesiones en paralelo y quieres visibilidad real de lo que hace cada una, CodeAgentSwarm elimina la fricción que los otros enfoques dejan sin resolver.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Se pueden ejecutar dos chats de Claude Code al mismo tiempo?',
      answer: 'Sí. Cada terminal ejecuta un proceso independiente de Claude Code con su propia conversación y contexto. Puedes ejecutar tantos como tu máquina pueda manejar.',
    },
    {
      question: '¿Ejecutar varias sesiones de Claude Code cuesta más?',
      answer: 'Cada sesión usa tu suscripción de Claude de forma normal. No hay coste extra por ejecutar sesiones en paralelo, simplemente estás usando la misma suscripción desde varios terminales.',
    },
    {
      question: '¿Pueden varios terminales de Claude Code trabajar en el mismo proyecto?',
      answer: 'Sí, y este es uno de los casos de uso más potentes. Dos o más sesiones pueden trabajar en el mismo código simultáneamente. Cuando editan archivos diferentes no hay ningún problema. Cuando tocan el mismo archivo, Git gestiona el merge y Claude resuelve los conflictos automáticamente. CodeAgentSwarm añade visibilidad para que puedas ver qué archivos está cambiando cada sesión en tiempo real.',
    },
    {
      question: '¿Qué pasa cuando dos sesiones de Claude Code editan el mismo archivo?',
      answer: 'La segunda sesión en guardar encontrará un conflicto de Git. Claude Code es bastante bueno detectando y resolviendo estos conflictos automáticamente. En la práctica, lo gestiona de forma fiable sin intervención manual.',
    },
    {
      question: '¿Puedo combinar Claude Code con Codex CLI o Gemini CLI?',
      answer: 'Sí. Como cada terminal es independiente, puedes ejecutar distintos agentes de IA en distintos terminales. CodeAgentSwarm soporta Claude Code, Codex CLI y Gemini CLI en el mismo espacio de trabajo, así que puedes usar el agente que mejor se adapte a cada tarea.',
    },
    {
      question: '¿Cuántas sesiones de Claude Code puedo ejecutar a la vez?',
      answer: 'No hay un límite estricto por parte de Claude Code, cada sesión es simplemente un proceso. En la práctica, los recursos de tu máquina y el espacio en pantalla son las restricciones. CodeAgentSwarm soporta hasta 6 terminales simultáneos con un diseño visual que mantiene todo manejable.',
    },
    {
      question: '¿Es tmux mejor que CodeAgentSwarm para múltiples terminales?',
      answer: 'tmux es un excelente multiplexor de terminal y es gratuito. Si ya lo usas y solo necesitas dividir paneles, funciona bien. CodeAgentSwarm añade capas que tmux no tiene: notificaciones de escritorio, historial de conversaciones con búsqueda, títulos dinámicos que muestran qué está haciendo cada agente, un tablero de tareas y seguimiento de cambios de archivos en tiempo real. Para gestionar agentes de IA programando específicamente, CodeAgentSwarm está diseñado para ese flujo de trabajo.',
    },
  ],
}

export default guide
