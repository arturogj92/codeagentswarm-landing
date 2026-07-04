import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ejecutar-multiples-sesiones-opencode',
    locale: 'es',
    title: 'Cómo ejecutar múltiples sesiones de OpenCode a la vez',
    metaTitle: 'Cómo ejecutar múltiples sesiones de OpenCode a la vez (3 métodos, 2026)',
    metaDescription: 'Ejecuta múltiples sesiones de opencode a la vez. 3 métodos prácticos: pestañas de terminal, tmux y CodeAgentSwarm, y cómo usar opencode junto a Claude Code o Codex.',
    intro: `Sí, puedes ejecutar múltiples sesiones de opencode a la vez. Cada sesión de opencode es su propio proceso, así que dos o más pueden trabajar en tareas distintas sobre el mismo repositorio al mismo tiempo sin compartir contexto.

La parte que requiere pensar un poco no es arrancar los procesos, es no perderles la pista cuando ya tienes varios agentes de opencode editando archivos, parándose para pedir permisos y terminando en momentos distintos. Y como opencode es agnóstico al proveedor, una sesión puede estar en Anthropic mientras otra corre en OpenAI o en un modelo local, algo potente pero también una cosa más que seguir.

En esta guía te explico las tres formas reales de ejecutar varias sesiones de opencode en paralelo: pestañas de terminal, tmux y CodeAgentSwarm. Las comparo de forma honesta y te muestro dónde empieza a frenarte cada una.`,
    ctaText: 'Ejecuta varias sesiones de opencode a la vez en CodeAgentSwarm. Varios terminales en una ventana, notificaciones de escritorio cuando una sesión termina e historial con búsqueda en todas ellas.',
    highlightedWords: ['múltiples sesiones de OpenCode', 'a la vez'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'run-multiple-opencode-sessions',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: cada sesión de opencode es su propio proceso',
      content: [
        {
          type: 'image',
          alt: 'Varios terminales de opencode ejecutándose en paralelo en un único espacio de trabajo de CodeAgentSwarm, cada uno una sesión de opencode independiente',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'Varias sesiones de opencode independientes ejecutándose a la vez en una sola ventana de CodeAgentSwarm, cada una con su tarea.',
        },
        {
          type: 'paragraph',
          text: 'Una sesión de <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a> es solo un proceso. opencode es el agente de código de IA de código abierto de SST para el terminal, se instala con <code>npm install -g opencode-ai</code> y se arranca con el comando <code>opencode</code>. Conectas un proveedor de modelos una vez (consulta la documentación oficial de opencode para el comando exacto de autenticación, normalmente algo como <code>opencode auth login</code>) y, a partir de ahí, cada sesión tiene su propia conversación, su propio contexto y su propio directorio de trabajo. Dos sesiones no saben nada la una de la otra.',
        },
        {
          type: 'paragraph',
          text: 'Así que ejecutar múltiples sesiones de opencode a la vez no es un modo especial que tengas que desbloquear. Abre un segundo terminal, ejecuta <code>opencode</code> otra vez y ya tienes dos sesiones independientes. Una puede estar migrando una capa de base de datos mientras la otra escribe tests de integración. Si quieres la foto completa de cómo se ve esto a mayor escala, la guía del <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes opencode</a> explica el concepto en profundidad.',
        },
        {
          type: 'paragraph',
          text: 'Y no te limita a opencode. Como cada agente es su propio proceso, puedes ejecutar opencode en algunos terminales y Claude Code o Codex CLI en otros, todos sobre el mismo repositorio. Usar opencode y Claude Code juntos es una configuración habitual, y la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> muestra cómo encajan las distintas herramientas en paralelo.',
        },
        {
          type: 'paragraph',
          text: 'Hay algo que aquí es genuinamente propio de opencode: como es agnóstico al proveedor, tus sesiones en paralelo no tienen por qué estar todas sobre el mismo modelo. Una sesión puede hablar con Anthropic, otra con OpenAI, otra con un modelo local, todo al mismo tiempo. Eso es algo que Codex CLI, atado a los modelos de OpenAI, no puede hacer.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No hay un plan aparte ni un sobrecoste por ejecutar varias sesiones de opencode en paralelo. Cada sesión factura por el proveedor que le conectaste, por el trabajo que hace en realidad. Ejecutarlas a la vez solo termina antes.',
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
          text: 'La forma más directa de ejecutar dos sesiones de opencode a la vez es abrir varias pestañas de terminal, entrar en tu proyecto en cada una e iniciar opencode. No hay nada que instalar más allá de opencode.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nopencode\n\n# Terminal tab 2\ncd ~/my-project\nopencode\n\n# Terminal tab 3\ncd ~/my-project\nopencode',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es ahora una sesión independiente de opencode. Dale a cada una una tarea distinta y ve alternando entre ellas mientras trabajan. Que una sesión se pare a preguntarte antes de actuar depende de tu configuración de permisos de opencode: con ajustes de tipo preguntar, cada pestaña se para y espera tu aprobación, así que acabas saltando de pestaña en pestaña solo para mantenerlas en marcha.',
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
            'Gratis, no hay nada que configurar más allá de opencode',
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
            'Sin notificaciones cuando una sesión de opencode termina o se para a pedir un permiso',
            'Sin vista compartida, tienes que hacer clic en cada pestaña para ver el progreso',
            'No hay forma de buscar en el historial de conversaciones de distintas sesiones',
            'Si dos sesiones editan el mismo archivo, desenredarlo es cosa tuya',
            'Con tres o más pestañas todas se ven iguales',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para dos sesiones de opencode esto va bien. Más allá de eso, el tiempo que pasas buscando la pestaña que espera un permiso empieza a comerse la velocidad que ganaste al trabajar en paralelo.',
        },
      ],
    },
    {
      id: 'metodo-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si te manejas bien en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te deja dividir una ventana en paneles y mantener sesiones vivas en segundo plano. Puedes vigilar varias sesiones de opencode a la vez sin saltar entre pestañas, lo que se parece más a ejecutar opencode en paralelo de lo que las pestañas consiguen.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s opencode\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run opencode in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux también te deja desconectarte y reconectarte, así que tus sesiones de opencode siguen funcionando aunque cierres la ventana del terminal. Eso es muy útil para migraciones o refactors largos en los que has configurado opencode para correr con pocos permisos.',
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
            'Las sesiones sobreviven a desconexiones, bien para tiradas largas sin supervisión',
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
            'Sigue sin haber notificación de escritorio cuando una sesión termina o pide un permiso',
            'Sin historial de conversaciones ni búsqueda entre sesiones',
            'Los paneles de solo texto se quedan pequeños pasadas tres o cuatro sesiones de opencode',
            'Sin tablero de tareas ni capa de organización encima',
            'Reconstruyes el diseño a mano cada sesión salvo que lo programes',
            'Los conflictos entre sesiones que tocan el mismo archivo siguen siendo tu problema',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es un multiplexor de propósito general excelente y muchos desarrolladores ya lo usan. Pero nunca se diseñó para supervisar agentes de IA en concreto. En el momento en que una sesión de opencode en el panel 3 se para en silencio a pedir un permiso mientras lees el panel 1, notas la carencia.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio hecha exactamente para esto: ejecutar y supervisar varias sesiones de CLI de IA en un solo sitio. Funciona en macOS y Windows, te da varios terminales en un único espacio de trabajo y te deja elegir el agente por terminal. Para ejecutar opencode en paralelo solo tienes que elegir "opencode" en el selector SELECT AI AGENT de cada terminal donde quieras correr opencode.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT donde eliges el agente por terminal, incluido opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en opencode para ejecutar varias sesiones de opencode en la misma ventana.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que te da cuando tienes varias sesiones de opencode funcionando a la vez:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Varias sesiones de opencode en paralelo',
          id: 'seis-terminales',
        },
        {
          type: 'paragraph',
          text: 'Pon todos los terminales en "opencode" para ejecutar varias sesiones de opencode a la vez, o mezcla Claude Code y Codex CLI donde encajen mejor. Cada terminal es un proceso de opencode totalmente independiente, con su propia conversación y contexto de proyecto, y como opencode es agnóstico al proveedor cada uno puede estar incluso sobre un proveedor de modelos distinto. CodeAgentSwarm funciona sobre tus cuentas y suscripciones existentes, así que no es un proveedor de modelos, solo orquesta los agentes que ya pagas. Si tu agente principal es Claude Code, la misma configuración se cubre en la guía para <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'titulos-dinamicos',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su propio título para reflejar lo que su sesión de opencode está haciendo en ese momento. En vez de varias pestañas con la etiqueta "opencode", lees títulos como "Migrando el esquema de usuarios", "Escribiendo tests de API", "Refactorizando Auth". Sabes qué sesión está en qué tarea sin hacer clic en ninguna.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notificaciones-escritorio',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que más arregla cuando ejecutas varias sesiones. Cuando una sesión de opencode termina su tarea o se para a pedir un permiso, recibes una notificación nativa de escritorio. Dejas de hacer de niñera de los paneles y dejas que las sesiones te avisen cuando de verdad te necesitan, que es todo el sentido de ejecutarlas en paralelo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial completo de conversaciones con búsqueda',
          id: 'historial-conversaciones',
        },
        {
          type: 'paragraph',
          text: 'opencode guarda sus sesiones en local, y CodeAgentSwarm las lee, así que todas las conversaciones de todos los terminales se guardan y se pueden buscar, incluso entre distintos agentes. Puedes volver atrás y encontrar qué decidió ayer una sesión de opencode, retomarla o rastrear exactamente qué sesión hizo un cambio concreto. La guía del <a href="/es/guias/historial-conversaciones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones de opencode</a> profundiza en cómo funciona. Con varias sesiones funcionando, ese registro es lo que mantiene todo legible.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tablero de tareas integrado',
          id: 'tablero-tareas',
        },
        {
          type: 'paragraph',
          text: 'Un tablero de tareas estilo kanban se sitúa junto a tus terminales, y los propios agentes lo actualizan por MCP. Creas tareas, se las pasas a los terminales y ves cómo se mueven las tarjetas a medida que cada sesión de opencode la coge, trabaja y termina. Cuando varias sesiones van avanzando en funcionalidades relacionadas, el tablero mantiene el plan a la vista en lugar de en tu cabeza.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full auto gobernado por la configuración de opencode',
          id: 'full-auto-config',
        },
        {
          type: 'paragraph',
          text: 'opencode no tiene un único flag de full auto, nada parecido a un interruptor de saltarse peligros de un tirón. Su autonomía se gobierna por configuración: fijas los permisos en <code>opencode.json</code>, de forma global, por proyecto o por agente, para decidir cuándo una sesión actúa por su cuenta y cuándo se para a preguntar. Por eso, CodeAgentSwarm no añade un interruptor de Turbo Mode para los terminales de opencode como sí lo hace para Claude Code y Codex. En su lugar mantiene tus configuraciones permisivas supervisadas, con diffs de archivos en vivo y notificaciones de escritorio, para que una sesión que corre con pocos permisos siga siendo una que puedes vigilar. La guía del <a href="/es/guias/modo-yolo-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">modo YOLO de opencode</a> repasa la parte de configuración.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'diffs-archivos',
        },
        {
          type: 'paragraph',
          text: 'Puedes ver los cambios de archivos que hace cada sesión de opencode en tiempo real, por terminal y a nivel de proyecto. Cuando dos sesiones editan el mismo archivo, lo ves en el momento en lugar de descubrirlo más tarde en un diff hecho un lío. Git sigue gestionando el merge, pero la visibilidad hace que las ediciones superpuestas nunca te pillen por sorpresa.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Es la primera vez que ejecutas varios terminales a la vez? La <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía multi-terminal</a> repasa el diseño y el flujo de trabajo, y se aplica igual tanto si el agente es opencode como Claude Code.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así se comparan las tres formas de ejecutar varias sesiones de opencode en los aspectos que de verdad molestan cuando pasas de dos:',
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
            '<strong>CodeAgentSwarm:</strong> Plan gratuito disponible, Pro para funcionalidades avanzadas. Tu uso de opencode lo facturan los proveedores que conectes.',
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
            '<strong>Pestañas de terminal:</strong> Cero, solo abre pestañas y ejecuta opencode',
            '<strong>tmux/screen:</strong> 10-30 minutos para aprender lo básico, más para programar un diseño reutilizable',
            '<strong>CodeAgentSwarm:</strong> Un par de minutos para descargar, abrir y elegir opencode por terminal',
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
            '<strong>CodeAgentSwarm:</strong> Notificaciones nativas de escritorio cuando una sesión termina o necesita un permiso',
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
            '<strong>CodeAgentSwarm:</strong> Lee las sesiones locales de opencode y las hace buscables en todos los terminales',
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
            '<strong>tmux/screen:</strong> Visible en los paneles, pero sin barreras ni vista compartida',
            '<strong>CodeAgentSwarm:</strong> la configuración de opencode decide la autonomía, y CodeAgentSwarm añade diffs en vivo, notificaciones y visibilidad por terminal por encima',
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
          text: 'Si solo necesitas dos sesiones de opencode de vez en cuando, las pestañas de terminal van perfectamente bien. Si ya vives dentro de tmux, meter unas cuantas sesiones de opencode en tus paneles existentes es natural. Pero en cuanto ejecutas habitualmente tres o más sesiones de opencode, muchas veces sobre proveedores distintos, y quieres ver de verdad qué hace cada una, CodeAgentSwarm elimina la carga de coordinación que las otras dos te dejan encima.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Se pueden ejecutar múltiples sesiones de opencode a la vez?',
      answer: 'Sí. Cada vez que ejecutas el comando opencode obtienes una sesión independiente con su propia conversación y contexto, así que puedes abrir varios terminales y ejecutar opencode en cada uno. No comparten estado ni se pisan entre sí salvo que editen los mismos archivos. CodeAgentSwarm soporta varios terminales para que puedas supervisar varias sesiones de opencode en una sola ventana.',
    },
    {
      question: '¿Cómo ejecuto dos sesiones de opencode al mismo tiempo?',
      answer: 'Abre dos pestañas de terminal, entra en tu proyecto en cada una con cd y ejecuta opencode en las dos. Cada pestaña es ahora una sesión de opencode separada a la que puedes dar instrucciones distintas, y como opencode es agnóstico al proveedor pueden correr incluso sobre modelos distintos. Para más de dos, los paneles divididos de tmux o CodeAgentSwarm hacen que las sesiones extra sean mucho más fáciles de seguir.',
    },
    {
      question: '¿Ejecutar varias sesiones de opencode cuesta más?',
      answer: 'No hay sobrecoste por ejecutar sesiones en paralelo. Cada sesión de opencode factura por el proveedor de modelos que le conectaste, por el trabajo que hace en realidad, igual que si las ejecutaras una detrás de otra. Ejecutarlas a la vez termina antes, no cambia el coste por sesión.',
    },
    {
      question: '¿Puedo usar opencode y Claude Code juntos?',
      answer: 'Sí. Como cada agente es solo un proceso aparte, puedes ejecutar opencode en algunos terminales y Claude Code o Codex CLI en otros, todos sobre el mismo proyecto. En CodeAgentSwarm eliges el agente por terminal con el selector SELECT AI AGENT, así que una configuración mixta de opencode y Claude Code es lo normal, no un apaño.',
    },
    {
      question: '¿Cómo ejecuto sesiones de opencode en full auto?',
      answer: 'opencode no tiene un único flag de full auto. Su autonomía se gobierna por configuración: fijas los permisos en opencode.json, de forma global, por proyecto o por agente, para decidir cuándo una sesión actúa por su cuenta y cuándo se para a preguntar. Cuando ejecutas varias sesiones con configuraciones permisivas a la vez, el riesgo es que actúen sin que las estés vigilando, así que CodeAgentSwarm mantiene esas tiradas supervisadas con diffs de archivos en vivo y notificaciones de escritorio en lugar de añadir un interruptor aparte.',
    },
    {
      question: '¿Cuántas sesiones de opencode puedo ejecutar a la vez?',
      answer: 'No hay un límite estricto por parte de opencode, ya que cada sesión es solo un proceso. En la práctica, los recursos de tu máquina y el espacio en pantalla son las restricciones. CodeAgentSwarm soporta varios terminales simultáneos con un diseño que mantiene varias sesiones de opencode manejables en una sola ventana.',
    },
    {
      question: 'Ejecutar varias sesiones de opencode frente a tmux, ¿qué es mejor?',
      answer: 'tmux puede alojar varias sesiones de opencode en paneles divididos y es gratis, y si ya lo usas funciona bien. Lo que le falta es cualquier cosa pensada para agentes de IA: sin notificación de escritorio cuando una sesión termina o pide un permiso, sin historial con búsqueda entre sesiones, sin títulos dinámicos y sin tablero de tareas. CodeAgentSwarm añade todo eso y lee las sesiones locales de opencode directamente, que es justo lo que más importa cuando ejecutas varias sesiones de opencode a la vez.',
    },
  ],
}

export default guide
