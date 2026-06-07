import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ejecutar-multiples-sesiones-gemini',
    locale: 'es',
    title: 'Cómo ejecutar varias sesiones de Gemini CLI en paralelo',
    metaTitle: 'Cómo ejecutar varias sesiones de Gemini CLI en paralelo (2026)',
    metaDescription: 'Aprende a ejecutar varias sesiones de Gemini CLI en paralelo. Tres métodos comparados: pestañas de terminal, tmux y CodeAgentSwarm. Paso a paso, con pros y contras.',
    intro: `Ejecutar varias sesiones de Gemini CLI en paralelo es sencillo en cuanto conoces los pasos. Cada sesión es su propio proceso, así que puedes abrir el comando gemini en varios terminales y apuntar cada uno a una tarea distinta. Lo difícil es mantenerlas organizadas cuando ya tienes más de dos a la vez.

Esto es una guía práctica, no una pieza de concepto. Te enseño las tres formas de ejecutar Gemini CLI en paralelo, con los comandos exactos de cada una: pestañas de terminal nativas, tmux y CodeAgentSwarm. De cada método tienes los pasos, los pros y los contras.

Al terminar sabrás qué enfoque encaja con tu forma de trabajar, ya quieras dos sesiones rápidas, una configuración de terminal persistente o un espacio de trabajo visual que además te deja ejecutar Gemini y Claude Code juntos.`,
    ctaText: 'Ejecuta varias sesiones de Gemini CLI en paralelo con CodeAgentSwarm. Seis terminales, un mismo espacio de trabajo y un aviso en cuanto cada sesión termina.',
    highlightedWords: ['varias sesiones de Gemini CLI', 'paralelo'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'run-multiple-gemini-sessions',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Respuesta corta: abre el comando gemini más de una vez',
      content: [
        {
          type: 'image',
          alt: 'Seis sesiones de Gemini CLI ejecutándose en paralelo dentro de un único espacio de trabajo de CodeAgentSwarm, cada terminal un proceso gemini independiente',
          src: '/images/guides/gemini-agent-swarm.png',
          caption: 'Varias sesiones de Gemini CLI en paralelo: seis procesos gemini independientes ejecutándose a la vez en una sola ventana de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Para ejecutar varias sesiones de Gemini CLI en paralelo, abre un terminal, ejecuta <code>gemini</code>, luego abre otro terminal y ejecuta <code>gemini</code> otra vez. Cada sesión de <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Gemini CLI</a> es un proceso independiente, con su propia conversación, su propia ventana de contexto y su propio estado de trabajo. No comparten nada entre ellas.',
        },
        {
          type: 'paragraph',
          text: 'Esa independencia es lo que hace seguro el paralelismo. Una sesión puede refactorizar tu capa de API mientras otra escribe tests y una tercera actualiza la documentación. No chocarán salvo que dos de ellas editen el mismo archivo. Google te inicia sesión con tu cuenta de Google y te da un plan gratuito generoso y una ventana de contexto grande por sesión, así que levantar varias a la vez es práctico y no te dispara un presupuesto por uso.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No hay ningún plan multisesión que comprar. Cada terminal usa tu propio inicio de sesión de Google. Los tres métodos de abajo solo se diferencian en cómo mantienes las sesiones organizadas una vez tienes varias en marcha. Para el concepto de ejecutarlas como un grupo coordinado, mira <a href="/es/guias/enjambre-de-agentes-gemini" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes Gemini</a>.',
        },
        {
          type: 'paragraph',
          text: 'El resto de la guía va de ese problema de organización. Aquí tienes los tres métodos, del más simple al más completo.',
        },
      ],
    },
    {
      id: 'method-terminal-tabs',
      title: 'Método 1: varias pestañas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'La forma más rápida de ejecutar Gemini CLI en paralelo es la que ya conoces. Abre unas cuantas pestañas o ventanas de terminal, entra en tu proyecto en cada una y arranca una sesión con <code>gemini</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1\ncd ~/mi-proyecto\ngemini\n\n# Pestaña 2\ncd ~/mi-proyecto\ngemini\n\n# Pestaña 3\ncd ~/mi-proyecto\ngemini',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña tiene ahora una sesión de Gemini CLI independiente. Cambias entre ellas y le das a cada una una instrucción distinta. Si quieres que una sesión siga sin pararse a pedir confirmación en cada acción, Gemini CLI tiene un modo de auto aprobación estilo yolo para ejecuciones desatendidas. Úsalo con cuidado, porque una sesión que aprueba sola ejecutará comandos que quizá querías revisar antes.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A favor',
          id: 'terminal-tabs-pros',
        },
        {
          type: 'list',
          items: [
            'Gratis, no instalas nada más allá del propio Gemini CLI',
            'Funciona en cuanto abres una pestaña, cero configuración',
            'Fácil de razonar: una pestaña es una sesión',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'En contra',
          id: 'terminal-tabs-cons',
        },
        {
          type: 'list',
          items: [
            'Enseguida pierdes la pista de qué pestaña ejecuta qué tarea',
            'Sin aviso cuando una sesión termina o se para a preguntar algo',
            'Sin vista compartida, entras a cada pestaña para revisarla',
            'No hay forma de buscar en el historial de conversación de varias sesiones',
            'Si dos sesiones editan el mismo archivo, el conflicto es tuyo',
            'Con tres pestañas o más, todas empiezan a verse iguales',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para dos sesiones va perfecto. Más allá de ahí, el tiempo que pasas buscando entre pestañas empieza a comerse el tiempo que las sesiones en paralelo deberían ahorrarte. Si primero estás eligiendo entre proveedores, la guía de <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> replica este mismo método para Claude.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si te manejas bien en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te da paneles divididos y sesiones persistentes. Puedes ver varias sesiones de Gemini CLI en una sola pantalla sin saltar entre pestañas.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inicia una nueva sesión de tmux\ntmux new-session -s gemini\n\n# Divide en horizontal\ntmux split-window -h\n\n# Divide el panel derecho en vertical\ntmux split-window -v\n\n# Ya tienes 3 paneles - ejecuta gemini en cada uno',
        },
        {
          type: 'paragraph',
          text: 'tmux también te deja desconectarte y volver a conectarte, así que tus sesiones de Gemini CLI siguen corriendo aunque cierres la ventana del terminal. Eso ayuda cuando una sesión está avanzando una migración larga en modo auto aprobación y quieres alejarte un rato.',
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
            'Gratis y disponible casi en todas partes',
            'Ves varios paneles a la vez sin cambiar de pestaña',
            'Sesiones persistentes que sobreviven a las desconexiones',
            'Muy configurable a través de tus dotfiles',
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
            'Curva de aprendizaje real si tmux es nuevo para ti',
            'Sigue sin haber notificación de escritorio cuando una sesión Gemini termina',
            'Sin historial de conversación ni búsqueda entre sesiones',
            'Los paneles solo de texto se quedan estrechos pasadas 3 o 4 sesiones',
            'Sin tablero de tareas ni capa de organización del trabajo',
            'Reconstruyes la disposición de paneles a mano cada vez',
            'La resolución de conflictos entre sesiones sigue siendo cosa tuya',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es una gran herramienta y mucha gente vive en ella. Pero se creó como multiplexor de terminal general, no como sala de control para sesiones de IA en paralelo. Las carencias se notan en cuanto ejecutas tres sesiones de Gemini CLI o más a diario.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, con todo incluido)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una aplicación de escritorio creada justo para esto: ejecutar varias sesiones de CLI de IA en paralelo con visibilidad y control reales. Funciona en macOS y Windows, te da hasta seis terminales en un mismo espacio de trabajo y te deja elegir el agente por terminal. Para ejecutar Gemini CLI en paralelo solo eliges "gemini cli" en cada terminal que quieras, y puedes mezclar Claude Code o Codex CLI junto a él.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con claude-code, gemini cli y codex cli, además de un interruptor Enable Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en gemini cli para ejecutar varias sesiones de Gemini en un mismo espacio de trabajo.',
        },
        {
          type: 'paragraph',
          text: 'Funciona sobre lo que ya tienes. CodeAgentSwarm no es un proveedor de modelos, así que cada sesión Gemini sigue usando tu propio inicio de sesión de Google y tu Gemini CLI. La app solo le da a las sesiones un sitio donde vivir. Esto es lo que suma:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hasta 6 sesiones de Gemini en paralelo',
          id: 'six-terminals',
        },
        {
          type: 'paragraph',
          text: 'Ejecuta hasta seis terminales a la vez y pon cada uno en gemini cli desde el selector SELECT AI AGENT. Cada sesión es independiente, con su propia conversación y su contexto de proyecto. Si una tarea encaja mejor con otro modelo, apuntas ese terminal a Claude Code o Codex CLI, todo en la misma ventana.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su propio título según lo que la sesión está haciendo en ese momento. En vez de seis pestañas "gemini" idénticas, ves títulos como "Migrando capa de BD", "Escribiendo tests de API" o "Refactorizando router". De un vistazo sabes qué hace cada sesión.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'Cuando una sesión Gemini termina su tarea o necesita tu intervención, recibes una notificación de escritorio nativa. Dejas de vigilar pestañas para saber si algo ha acabado. Te concentras en una sesión y dejas que las demás te avisen cuando de verdad necesitan atención. La <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del sistema de notificaciones</a> entra en más detalle.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversación buscable entre sesiones',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación de cada terminal se guarda y se puede buscar. Puedes encontrar lo que hizo una sesión Gemini ayer, retomar un hilo o revisar el historial completo de cambios. Cuando ejecutas muchas sesiones, poder rastrear qué pasó y dónde es lo que evita que el flujo de trabajo se convierta en ruido.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un tablero kanban que las sesiones actualizan por MCP',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'Un tablero estilo kanban se conecta a tus terminales, y las propias sesiones lo actualizan por MCP. Creas tareas, las asignas y ves cómo el tablero se mueve según avanza el trabajo. Cuando dos sesiones Gemini construyen funcionalidades relacionadas, el tablero mantiene la foto completa en un solo sitio.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode con permisos granulares',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Ejecutar varias sesiones significa más acciones a la vez, y eso hace que los permisos importen más. Turbo Mode aprueba en automático las operaciones seguras y mantiene bajo control las arriesgadas, así una sesión Gemini avanza rápido sin que tengas que dar luz verde a todo a ciegas. Tú pones la línea entre lo automático y lo que aún necesita un sí. La <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode</a> cubre la configuración completa.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'Cuando dos sesiones tocan el mismo archivo, lo ves mientras ocurre. CodeAgentSwarm sigue los cambios de archivos en vivo por terminal y a nivel de proyecto, así las ediciones solapadas no te sorprenden después. La <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de cambios en tiempo real</a> tiene más sobre esto.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Ejecutar Gemini en paralelo es una variante de un patrón más amplio. Para la foto completa entre proveedores empieza por <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">el hub del enjambre de agentes de CLI de IA</a>, y luego compáralo con <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Codex CLI</a>.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así quedan las tres formas de ejecutar varias sesiones de Gemini CLI en lo que de verdad importa en cuanto pasas de dos:',
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
            '<strong>CodeAgentSwarm:</strong> Plan gratuito disponible, Pro para funciones avanzadas, corre sobre tu cuenta de Gemini',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tiempo de configuración',
          id: 'compare-setup',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Cero, solo abres pestañas',
            '<strong>tmux/screen:</strong> De 10 a 30 minutos para lo básico, más para personalizar',
            '<strong>CodeAgentSwarm:</strong> Unos 2 minutos para descargar y abrir',
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
            '<strong>tmux/screen:</strong> Ninguna salvo que programes algo a medida',
            '<strong>CodeAgentSwarm:</strong> Notificaciones de escritorio nativas cuando una sesión termina o necesita intervención',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversación',
          id: 'compare-history',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Se pierde al cerrar la pestaña',
            '<strong>tmux/screen:</strong> Se mantiene mientras la sesión vive, sin búsqueda',
            '<strong>CodeAgentSwarm:</strong> Se guarda de forma permanente y se puede buscar en todas las sesiones',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mezclar agentes',
          id: 'compare-mixing',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Posible, pero lo controlas de memoria',
            '<strong>tmux/screen:</strong> Posible con paneles con nombre, sigue siendo manual',
            '<strong>CodeAgentSwarm:</strong> Eliges gemini cli, claude-code o codex cli por terminal desde un único selector',
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
            '<strong>tmux/screen:</strong> De moderada a pronunciada (atajos, archivos de configuración, gestión de paneles)',
            '<strong>CodeAgentSwarm:</strong> Baja, una interfaz visual con patrones familiares',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Si solo necesitas dos sesiones de Gemini de vez en cuando, las pestañas de terminal van bien. Si ya vives en tmux, sumar sesiones de Gemini CLI a tu configuración es natural. Pero en cuanto ejecutas tres sesiones o más a diario y quieres ver de verdad qué hace cada una, CodeAgentSwarm quita la fricción que las otras dos opciones dejan por el camino.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo ejecuto varias sesiones de Gemini CLI en paralelo?',
      answer: 'Abre un terminal, ejecuta gemini, luego abre otro terminal y ejecuta gemini otra vez. Cada sesión es un proceso independiente con su propia conversación y su contexto. Puedes hacerlo con pestañas de terminal sueltas, con paneles divididos de tmux o en CodeAgentSwarm, que ejecuta hasta seis terminales a la vez y te deja poner cada uno en gemini cli desde el selector SELECT AI AGENT.',
    },
    {
      question: '¿Se pueden ejecutar varios agentes Gemini al mismo tiempo?',
      answer: 'Sí. Como cada sesión de Gemini CLI es un proceso separado, puedes ejecutar tantos agentes como aguante tu máquina. No comparten memoria y solo chocan si editan los mismos archivos. Un agente puede refactorizar código mientras otro escribe tests y un tercero actualiza la documentación.',
    },
    {
      question: '¿Cómo ejecuto Gemini CLI en varios terminales?',
      answer: 'En cada terminal, entra en el directorio de tu proyecto y ejecuta gemini. Con eso basta. tmux te deja dividir una ventana en varios paneles para ver todas las sesiones a la vez, y CodeAgentSwarm te da hasta seis terminales visuales en un mismo espacio de trabajo con títulos dinámicos para distinguirlos de un vistazo.',
    },
    {
      question: '¿Puedo ejecutar Gemini y Claude Code juntos?',
      answer: 'Sí. Como cada terminal es independiente, puedes correr una sesión de Gemini CLI junto a una de Claude Code y otra de Codex CLI. En CodeAgentSwarm eliges el agente por terminal desde el selector SELECT AI AGENT, así que una configuración mixta vive en un mismo espacio de trabajo con un historial compartido y buscable.',
    },
    {
      question: '¿Cuántas sesiones de Gemini CLI puedo ejecutar a la vez?',
      answer: 'Gemini CLI no impone un límite duro, ya que cada sesión es solo un proceso. En la práctica, los recursos de tu máquina, el espacio de pantalla y los límites de tu cuenta de Google son las restricciones. CodeAgentSwarm soporta hasta seis terminales simultáneos con una disposición que mantiene todo legible.',
    },
    {
      question: '¿El plan gratuito de Gemini CLI da para ejecutar varias sesiones?',
      answer: 'Para muchos flujos de trabajo, sí. Google ofrece un plan gratuito generoso con inicio de sesión de Google, lo que hace práctico ejecutar varias sesiones de Gemini en paralelo sin una factura por cada llamada. El uso intenso o sostenido puede tocar los límites, así que para configuraciones grandes o de larga duración vigila tu cuota y los límites de tu cuenta.',
    },
    {
      question: '¿Qué pasa si dos sesiones de Gemini editan el mismo archivo?',
      answer: 'No comparten memoria, así que un conflicto solo aparece cuando dos sesiones escriben en el mismo archivo. La segunda escritura puede sobrescribir la primera o crear un conflicto de Git que resuelves tú. Para evitarlo, dale a cada sesión una parte distinta del código. CodeAgentSwarm añade diffs de archivos en vivo por terminal para que veas las ediciones solapadas mientras ocurren.',
    },
  ],
}

export default guide
