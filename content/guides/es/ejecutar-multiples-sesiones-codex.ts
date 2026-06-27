import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ejecutar-multiples-sesiones-codex',
    locale: 'es',
    title: 'Cómo ejecutar varias sesiones de Codex CLI a la vez',
    metaTitle: 'Cómo ejecutar varias sesiones de Codex CLI a la vez (3 métodos, 2026)',
    metaDescription: 'Ejecuta varias sesiones de Codex CLI a la vez. 3 métodos prácticos: pestañas de terminal, tmux y CodeAgentSwarm, y cómo usar Codex y Claude Code juntos.',
    intro: `Sí, puedes ejecutar varias sesiones de Codex CLI a la vez. Cada sesión de Codex es su propio proceso, así que dos o más pueden trabajar en tareas distintas sobre el mismo repositorio al mismo tiempo sin compartir contexto.

La parte que requiere pensar un poco no es arrancar los procesos, es no perderles la pista cuando ya tienes varios agentes de Codex editando archivos, parándose para pedir aprobaciones y terminando en momentos distintos.

En esta guía te explico las tres formas reales de ejecutar varias sesiones de Codex CLI en paralelo: pestañas de terminal, tmux y CodeAgentSwarm. Las comparo de forma honesta y te muestro dónde empieza a frenarte cada una.`,
    ctaText: 'Ejecuta varias sesiones de Codex CLI a la vez en CodeAgentSwarm. Varios terminales en una ventana, con notificaciones de escritorio y full-auto controlado por permisos por terminal.',
    highlightedWords: ['varias sesiones de Codex CLI', 'a la vez'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'run-multiple-codex-sessions',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: cada sesión de Codex es su propio proceso',
      content: [
        {
          type: 'image',
          alt: 'Varios terminales de OpenAI Codex CLI ejecutándose en paralelo en un único espacio de trabajo de CodeAgentSwarm, cada uno una sesión de Codex independiente',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'Varias sesiones de Codex CLI independientes ejecutándose a la vez en una sola ventana de CodeAgentSwarm, cada una con su tarea.',
        },
        {
          type: 'paragraph',
          text: 'Una sesión de <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a> es solo un proceso. La arrancas con el comando <code>codex</code>, inicias sesión una vez con <code>codex login</code> y, a partir de ahí, cada sesión tiene su propia conversación, su propio contexto y su propio directorio de trabajo. Dos sesiones no saben nada la una de la otra.',
        },
        {
          type: 'paragraph',
          text: 'Así que ejecutar varias sesiones de Codex CLI a la vez no es un modo especial que tengas que desbloquear. Abre un segundo terminal, ejecuta <code>codex</code> otra vez y ya tienes dos sesiones independientes. Una puede estar migrando una capa de base de datos mientras la otra escribe tests de integración. Si quieres la foto completa de cómo se ve esto a mayor escala, la guía del <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Codex</a> explica el concepto en profundidad.',
        },
        {
          type: 'paragraph',
          text: 'Y no te limita a Codex. Como cada agente es su propio proceso, puedes ejecutar Codex CLI en algunos terminales y Claude Code o Gemini CLI en otros, todos sobre el mismo repositorio. Usar Codex y Claude Code juntos es una configuración habitual, y la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> muestra cómo encajan las distintas herramientas en paralelo.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cada sesión de Codex usa tu cuenta de OpenAI de forma independiente. No hay un plan aparte ni un sobrecoste por ejecutar varias sesiones en paralelo. Pagas por lo que cada sesión hace en realidad.',
        },
        {
          type: 'paragraph',
          text: 'La cuestión real es cómo mantienes varias sesiones bajo control una vez que pasas de una o dos. De eso van los tres métodos de abajo.',
        },
      ],
    },
    {
      id: 'metodo-ventanas-terminal',
      title: 'Método 1: varias pestañas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'La forma más directa de ejecutar dos sesiones de Codex a la vez es abrir varias pestañas de terminal, entrar en tu proyecto en cada una e iniciar Codex CLI. No hay nada que instalar más allá de Codex.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\ncodex\n\n# Terminal tab 2\ncd ~/my-project\ncodex\n\n# Terminal tab 3\ncd ~/my-project\ncodex',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es ahora una sesión independiente de Codex. Dale a cada una una tarea distinta y ve alternando entre ellas mientras trabajan. Si ejecutas Codex en un modo de aprobación en lugar de full auto, cada pestaña se para y espera a que apruebes las acciones, así que acabas saltando de pestaña en pestaña solo para mantenerlas en marcha.',
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
            'Gratis, no hay nada que configurar más allá de Codex CLI',
            'Funciona al instante con herramientas que ya tienes',
            'Fácil de razonar, una pestaña es una sesión',
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
            'Pierdes el control de qué pestaña ejecuta qué tarea casi de inmediato',
            'Sin notificaciones cuando una sesión de Codex termina o se para a pedir una aprobación',
            'Sin vista compartida, tienes que hacer clic en cada pestaña para ver el progreso',
            'No hay forma de buscar en el historial de conversaciones de distintas sesiones',
            'Si dos sesiones editan el mismo archivo, desenredarlo es cosa tuya',
            'Con tres o más pestañas todas se ven iguales',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para dos sesiones de Codex esto va bien. Más allá de eso, el tiempo que pasas buscando la pestaña que espera una aprobación empieza a comerse la velocidad que ganaste al trabajar en paralelo.',
        },
      ],
    },
    {
      id: 'metodo-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si te manejas bien en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te deja dividir una ventana en paneles y mantener sesiones vivas en segundo plano. Puedes vigilar varias sesiones de Codex CLI a la vez sin saltar entre pestañas, lo que se parece más a ejecutar Codex CLI en paralelo de lo que las pestañas consiguen.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s codex\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run codex in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux también te deja desconectarte y reconectarte, así que tus sesiones de Codex siguen funcionando aunque cierres la ventana del terminal. Eso es muy útil para migraciones o refactors largos que corren en full auto.',
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
            'Gratis y disponible en casi cualquier máquina Unix',
            'Ves varios paneles a la vez, sin cambiar de pestaña',
            'Las sesiones sobreviven a desconexiones, bien para tiradas largas en full-auto',
            'Programable y configurable hasta el último atajo de teclado',
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
            'Curva de aprendizaje real si nunca has usado tmux',
            'Sigue sin haber notificación de escritorio cuando una sesión termina o pide aprobación',
            'Sin historial de conversaciones ni búsqueda entre sesiones',
            'Los paneles de solo texto se quedan pequeños pasadas tres o cuatro sesiones de Codex',
            'Sin tablero de tareas ni capa de organización encima',
            'Reconstruyes el diseño a mano cada sesión salvo que lo programes',
            'Los conflictos entre sesiones que tocan el mismo archivo siguen siendo tu problema',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es un multiplexor de propósito general excelente y muchos desarrolladores ya lo usan. Pero nunca se diseñó para supervisar agentes de IA en concreto. En el momento en que una sesión de Codex en el panel 3 se para en silencio a pedir una aprobación mientras lees el panel 1, notas la carencia.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio hecha exactamente para esto: ejecutar y supervisar varias sesiones de CLI de IA en un solo sitio. Funciona en macOS y Windows, te da varios terminales en un único espacio de trabajo y te deja elegir el agente por terminal. Para ejecutar Codex CLI en paralelo solo tienes que elegir "codex cli" en el selector SELECT AI AGENT de cada terminal donde quieras correr Codex.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con las opciones claude-code, gemini cli y codex cli más un interruptor Enable Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en codex cli para ejecutar varias sesiones de Codex, con un interruptor de Turbo Mode para las tiradas en full-auto.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que te da cuando tienes varias sesiones de Codex funcionando a la vez:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Varias sesiones de Codex en paralelo',
          id: 'seis-terminales',
        },
        {
          type: 'paragraph',
          text: 'Pon todos los terminales en "codex cli" para ejecutar varias sesiones de Codex a la vez, o mezcla Claude Code y Gemini CLI donde encajen mejor. Cada terminal es un proceso de Codex totalmente independiente, con su propia conversación y contexto de proyecto. CodeAgentSwarm funciona sobre tus suscripciones existentes, así que no es un proveedor de modelos, solo orquesta los agentes que ya pagas. Si tu agente principal es Claude Code, la misma configuración se cubre en la guía para <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'titulos-dinamicos',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su propio título para reflejar lo que su sesión de Codex está haciendo en ese momento. En vez de varias pestañas con la etiqueta "codex", lees títulos como "Migrando el esquema de usuarios", "Escribiendo tests de API", "Refactorizando Auth". Sabes qué sesión está en qué tarea sin hacer clic en ninguna.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notificaciones-escritorio',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que más arregla cuando ejecutas varias sesiones. Cuando una sesión de Codex termina su tarea o se para a pedir una aprobación, recibes una notificación nativa de escritorio. Dejas de hacer de niñera de los paneles y dejas que las sesiones te avisen cuando de verdad te necesitan, que es todo el sentido de ejecutarlas en paralelo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial completo de conversaciones con búsqueda',
          id: 'historial-conversaciones',
        },
        {
          type: 'paragraph',
          text: 'Todas las conversaciones de todos los terminales se guardan y se pueden buscar, incluso entre distintos agentes. Puedes volver atrás y encontrar qué decidió ayer una sesión de Codex, retomarla o rastrear exactamente qué sesión hizo un cambio concreto. Con varias sesiones funcionando, ese registro es lo que mantiene todo legible.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tablero de tareas integrado',
          id: 'tablero-tareas',
        },
        {
          type: 'paragraph',
          text: 'Un tablero de tareas estilo kanban se sitúa junto a tus terminales, y los propios agentes lo actualizan por MCP. Creas tareas, se las pasas a los terminales y ves cómo se mueven las tarjetas a medida que cada sesión de Codex la coge, trabaja y termina. Cuando varias sesiones van avanzando en funcionalidades relacionadas, el tablero mantiene el plan a la vista en lugar de en tu cabeza.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode y permisos granulares',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Codex tiene sus propios modos de aprobación, desde solo sugerir hasta full auto con <code>--full-auto</code>, además de un sandbox. CodeAgentSwarm se sitúa por encima con Turbo Mode y permisos por terminal, así que puedes dejar que las sesiones corran en full auto en las operaciones seguras mientras sigues controlando las peligrosas. Esa es la forma práctica de mantener varias sesiones de Codex rápidas sin dejarlas sin supervisión. La <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode</a> cubre la configuración.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'diffs-archivos',
        },
        {
          type: 'paragraph',
          text: 'Puedes ver los cambios de archivos que hace cada sesión de Codex en tiempo real, por terminal y a nivel de proyecto. Cuando dos sesiones editan el mismo archivo, lo ves en el momento en lugar de descubrirlo más tarde en un diff hecho un lío. Git sigue gestionando el merge, pero la visibilidad hace que las ediciones superpuestas nunca te pillen por sorpresa.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Es la primera vez que ejecutas varios terminales a la vez? La <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía multi-terminal</a> repasa el diseño y el flujo de trabajo, y se aplica igual tanto si el agente es Codex como Claude Code.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así se comparan las tres formas de ejecutar varias sesiones de Codex CLI en los aspectos que de verdad molestan cuando pasas de dos:',
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
            '<strong>CodeAgentSwarm:</strong> Plan gratuito disponible, Pro para funcionalidades avanzadas. Tu uso de Codex lo factura OpenAI como siempre.',
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
            '<strong>Pestañas de terminal:</strong> Cero, solo abre pestañas y ejecuta codex',
            '<strong>tmux/screen:</strong> 10-30 minutos para aprender lo básico, más para programar un diseño reutilizable',
            '<strong>CodeAgentSwarm:</strong> Un par de minutos para descargar, abrir y elegir codex cli por terminal',
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
            '<strong>tmux/screen:</strong> Ninguna salvo que programes algo personalizado',
            '<strong>CodeAgentSwarm:</strong> Notificaciones nativas de escritorio cuando una sesión termina o necesita una aprobación',
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
            '<strong>tmux/screen:</strong> Se conserva mientras la sesión viva, sin búsqueda',
            '<strong>CodeAgentSwarm:</strong> Guardado de forma permanente y con búsqueda en todas las sesiones',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Supervisión en full-auto',
          id: 'comparar-supervision',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Todo recae en ti, una pestaña cada vez',
            '<strong>tmux/screen:</strong> Visible en los paneles, pero sin barreras ni política por sesión',
            '<strong>CodeAgentSwarm:</strong> Turbo Mode más permisos granulares para que el full-auto siga siendo seguro',
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
            '<strong>tmux/screen:</strong> Moderada a alta, con atajos de teclado y archivos de configuración',
            '<strong>CodeAgentSwarm:</strong> Baja, una interfaz visual con patrones familiares',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Si solo necesitas dos sesiones de Codex de vez en cuando, las pestañas de terminal van perfectamente bien. Si ya vives dentro de tmux, meter unas cuantas sesiones de Codex en tus paneles existentes es natural. Pero en cuanto ejecutas habitualmente tres o más sesiones de Codex en full auto y quieres ver de verdad qué hace cada una, CodeAgentSwarm elimina la carga de coordinación que las otras dos te dejan encima.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Se pueden ejecutar varias sesiones de Codex CLI a la vez?',
      answer: 'Sí. Cada vez que ejecutas el comando codex obtienes una sesión independiente con su propia conversación y contexto, así que puedes abrir varios terminales y ejecutar Codex CLI en cada uno. No comparten estado ni se pisan entre sí salvo que editen los mismos archivos. CodeAgentSwarm soporta varios terminales para que puedas supervisar varias sesiones de Codex en una sola ventana.',
    },
    {
      question: '¿Cómo ejecuto dos sesiones de Codex al mismo tiempo?',
      answer: 'Abre dos pestañas de terminal, entra en tu proyecto en cada una con cd y ejecuta codex en las dos. Cada pestaña es ahora una sesión de Codex separada a la que puedes dar instrucciones distintas. Para más de dos, los paneles divididos de tmux o CodeAgentSwarm hacen que las sesiones extra sean mucho más fáciles de seguir.',
    },
    {
      question: '¿Ejecutar varias sesiones de Codex cuesta más?',
      answer: 'No hay sobrecoste por ejecutar sesiones en paralelo. Cada sesión de Codex usa tu cuenta de OpenAI existente y se te factura por el trabajo que cada una hace en realidad, igual que si las ejecutaras una detrás de otra. Ejecutarlas a la vez termina antes, no cambia el coste por sesión.',
    },
    {
      question: '¿Puedo usar Codex y Claude Code juntos?',
      answer: 'Sí. Como cada agente es solo un proceso aparte, puedes ejecutar Codex CLI en algunos terminales y Claude Code o Gemini CLI en otros, todos sobre el mismo proyecto. En CodeAgentSwarm eliges el agente por terminal con el selector SELECT AI AGENT, así que una configuración mixta de Codex y Claude Code es lo normal, no un apaño.',
    },
    {
      question: '¿Cómo ejecuto sesiones de Codex CLI en full auto?',
      answer: 'Codex tiene sus propios modos de aprobación, desde solo sugerir hasta full auto, al que llegas con el flag --full-auto, respaldado por un sandbox. Cuando ejecutas varias sesiones en full auto a la vez, el riesgo es que actúen sin que las estés vigilando. CodeAgentSwarm añade Turbo Mode y permisos por terminal por encima, así que puedes aprobar automáticamente las operaciones seguras mientras sigues controlando las peligrosas.',
    },
    {
      question: '¿Cuántas sesiones de Codex puedo ejecutar a la vez?',
      answer: 'No hay un límite estricto por parte de Codex CLI, ya que cada sesión es solo un proceso. En la práctica, los recursos de tu máquina y el espacio en pantalla son las restricciones. CodeAgentSwarm soporta varios terminales simultáneos con un diseño que mantiene varias sesiones de Codex manejables en una sola ventana.',
    },
    {
      question: 'Ejecutar varias sesiones de Codex frente a tmux, ¿qué es mejor?',
      answer: 'tmux puede alojar varias sesiones de Codex en paneles divididos y es gratis, y si ya lo usas funciona bien. Lo que le falta es cualquier cosa pensada para agentes de IA: sin notificación de escritorio cuando una sesión termina o pide una aprobación, sin historial con búsqueda entre sesiones, sin títulos dinámicos, sin tablero de tareas y sin capa de permisos para las tiradas en full-auto. CodeAgentSwarm añade todo eso, que es justo lo que más importa cuando ejecutas varias sesiones de Codex a la vez.',
    },
  ],
}

export default guide
