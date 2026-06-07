import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-gemini',
    locale: 'es',
    title: 'Enjambre de agentes Gemini: ejecuta varios agentes de Gemini CLI a la vez',
    metaTitle: 'Enjambre de agentes Gemini: ejecuta varios agentes de Gemini CLI a la vez (2026)',
    metaDescription: 'Sí, puedes montar un enjambre de agentes Gemini. Ejecuta varios agentes de Gemini CLI en paralelo con tres métodos: pestañas, tmux y CodeAgentSwarm.',
    intro: `Un "enjambre de agentes Gemini" suena más sofisticado de lo que es. En el fondo solo significa varios agentes de Gemini CLI corriendo en paralelo, cada uno trabajando en su parte del código mientras tú supervisas. Google trae el comando <code>gemini</code>, inicias sesión con tu cuenta de Google y obtienes un plan gratuito generoso y una ventana de contexto grande. Nada te impide abrir ese comando más de una vez.

Así que la pregunta no es si puedes montar un enjambre de agentes Gemini. Puedes. La pregunta es cómo los controlas cuando ya tienes tres, cuatro o seis corriendo al mismo tiempo, cada uno masticando una tarea distinta.

En esta guía repaso las tres formas prácticas de ejecutar varios agentes de Gemini CLI juntos, las comparo con honestidad y explico por qué un espacio de trabajo pensado para esto (donde además eliges "gemini cli" por terminal) suele ganarle a hacer malabares con terminales sueltos cuando el enjambre crece.`,
    ctaText: 'Ejecuta tu enjambre de agentes Gemini en CodeAgentSwarm. Elige gemini cli por terminal, míralos todos a la vez y recibe un aviso cuando cada uno termina.',
    highlightedWords: ['enjambre de agentes Gemini', 'Gemini CLI'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'gemini-agent-swarm',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'La respuesta corta: sí, puedes montar un enjambre de Gemini',
      content: [
        {
          type: 'image',
          alt: 'Seis terminales de Google Gemini CLI ejecutándose en paralelo en un único espacio de trabajo de CodeAgentSwarm, cada uno una sesión de Gemini independiente',
          src: '/images/guides/gemini-agent-swarm.png',
          caption: 'Un enjambre de agentes Gemini: seis sesiones de Gemini CLI independientes ejecutándose a la vez en una sola ventana de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Sí. Puedes ejecutar un enjambre de agentes Gemini en paralelo, y montarlo es más sencillo de lo que da a entender el término. Cada sesión de <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Gemini CLI</a> es su propio proceso, con su propia conversación, su propio contexto y su propio estado de trabajo. Cuando abres un terminal y ejecutas <code>gemini</code>, ese agente no sabe nada de los demás agentes que tengas en marcha.',
        },
        {
          type: 'paragraph',
          text: 'Esa independencia es todo el truco. Abre un segundo terminal, ejecuta <code>gemini</code> otra vez y ya tienes dos agentes Gemini separados trabajando a la vez. Uno puede estar migrando una capa de base de datos mientras el otro escribe tests de integración. No comparten memoria, así que no se pisarán salvo que toquen los mismos archivos.',
        },
        {
          type: 'paragraph',
          text: 'Como Google ofrece un plan gratuito generoso con inicio de sesión de Google, levantar varios agentes no te dispara el presupuesto de inmediato como pasaría con algunas APIs por uso. Súmale una ventana de contexto grande por agente y un enjambre de agentes de Gemini CLI se vuelve una forma realmente práctica de paralelizar el trabajo.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Un enjambre de agentes Gemini no es lo mismo que un producto multiagente alojado en la nube. Cada agente corre en local en tu máquina, con tu propia cuenta de Google y el Gemini CLI. No hay ningún "plan de enjambre" que comprar.',
        },
        {
          type: 'paragraph',
          text: 'La parte difícil nunca es arrancar los agentes. Es no perderles la pista una vez están corriendo. Los tres métodos de abajo van justo a eso.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Método 1: varias ventanas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'La forma más directa de montar un enjambre de Gemini es la que ya conoces. Abre unas cuantas pestañas o ventanas de terminal, entra en tu proyecto en cada una y arranca un agente de Gemini CLI en cada pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1\ncd ~/mi-proyecto\ngemini\n\n# Pestaña 2\ncd ~/mi-proyecto\ngemini\n\n# Pestaña 3\ncd ~/mi-proyecto\ngemini',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es ahora un agente Gemini independiente. Cambias entre ellas, le das a cada una una instrucción distinta y ya tienes un pequeño enjambre en marcha. Si quieres que un agente siga sin parar a pedir confirmación en cada acción, Gemini CLI tiene un modo de auto aprobación estilo yolo para ejecuciones desatendidas. Úsalo con cuidado, porque un agente que aprueba solo ejecutará encantado comandos que quizá querías revisar.',
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
            'Gratis, no instalas nada más allá del propio Gemini CLI',
            'Funciona en cuanto abres una pestaña, cero configuración',
            'Fácil de razonar: una pestaña es un agente',
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
            'Enseguida olvidas qué pestaña ejecuta qué tarea',
            'Sin aviso cuando un agente termina o se para a preguntar algo',
            'Sin vista compartida del enjambre, entras a cada pestaña para revisar',
            'No hay forma de buscar en el historial de conversación de varios agentes',
            'Si dos agentes editan el mismo archivo, el conflicto lo resuelves tú',
            'Con tres pestañas o más, todas se ven iguales',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para dos agentes esto va perfecto. Más allá de ahí, el tiempo que pasas buscando entre pestañas empieza a comerse el tiempo que los agentes en paralelo deberían ahorrarte.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si te manejas bien en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te da paneles divididos y sesiones persistentes. Puedes ver varios agentes Gemini en una sola pantalla sin saltar entre pestañas.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inicia una nueva sesión de tmux\ntmux new-session -s enjambre-gemini\n\n# Divide en horizontal\ntmux split-window -h\n\n# Divide el panel derecho en vertical\ntmux split-window -v\n\n# Ya tienes 3 paneles - ejecuta gemini en cada uno',
        },
        {
          type: 'paragraph',
          text: 'tmux también te deja desconectarte y volver a conectarte, así que tus agentes Gemini siguen corriendo aunque cierres la ventana del terminal. Eso viene bien cuando tienes un agente avanzando una migración larga en modo auto aprobación y quieres alejarte un rato.',
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
            'Sigue sin haber notificación de escritorio cuando un agente Gemini termina',
            'Sin historial de conversación ni búsqueda en todo el enjambre',
            'Los paneles solo de texto se quedan estrechos pasados 3 o 4 agentes',
            'Sin tablero de tareas ni capa de organización del trabajo',
            'Reconstruyes la disposición a mano cada sesión',
            'La resolución de conflictos entre agentes sigue siendo cosa tuya',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es una gran herramienta y mucha gente vive en ella. Pero se creó como multiplexor de terminal general, no como sala de control para agentes de IA en paralelo. Las carencias se notan en cuanto tu enjambre de Gemini son tres agentes o más que ejecutas a diario.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, con todo incluido)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una aplicación de escritorio creada justo para este problema: ejecutar varios agentes de CLI de IA en paralelo con visibilidad y control reales. Funciona en macOS y Windows, te da hasta seis terminales en un mismo espacio de trabajo y te deja elegir el agente por terminal. Para un enjambre de Gemini solo eliges "gemini cli" en cada terminal que quieras, y puedes mezclar Claude Code o Codex CLI junto a él.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con claude-code, gemini cli y codex cli, además de un interruptor Enable Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en gemini cli para montar un enjambre de Gemini, todo en un mismo espacio de trabajo.',
        },
        {
          type: 'paragraph',
          text: 'Funciona sobre lo que ya tienes. CodeAgentSwarm no es un proveedor de modelos, así que tus agentes Gemini siguen usando tu propio inicio de sesión de Google y tu Gemini CLI. La app solo le da al enjambre un sitio donde vivir. Esto es lo que suma:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hasta 6 agentes Gemini en paralelo',
          id: 'six-terminals',
        },
        {
          type: 'paragraph',
          text: 'Ejecuta hasta seis terminales a la vez y pon cada uno en gemini cli desde el selector SELECT AI AGENT. Cada agente es independiente, con su propia conversación y su contexto de proyecto. Si una tarea encaja mejor con otro modelo, apuntas ese terminal a Claude Code o Codex CLI, todo en la misma ventana.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su propio título según lo que el agente está haciendo en ese momento. En vez de seis pestañas "gemini" idénticas, ves títulos como "Migrando capa de BD", "Escribiendo tests de API" o "Refactorizando router". De un vistazo sabes qué hace cada agente del enjambre.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'Cuando un agente Gemini termina su tarea o necesita tu intervención, recibes una notificación de escritorio nativa. Dejas de vigilar pestañas para saber si algo ha acabado. Te concentras en un agente y dejas que el resto del enjambre te avise cuando de verdad necesitan atención. La <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del sistema de notificaciones</a> entra en más detalle.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversación buscable entre agentes',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación de cada terminal se guarda y se puede buscar. Puedes encontrar lo que hizo un agente Gemini ayer, retomar un hilo o revisar el historial completo de cambios. Cuando el enjambre es grande, poder rastrear qué pasó y dónde es lo que evita que todo se convierta en ruido.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un tablero kanban que los agentes actualizan por MCP',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'Un tablero estilo kanban se conecta a tus terminales, y los propios agentes lo actualizan por MCP. Creas tareas, las asignas y ves cómo el tablero se mueve mientras el enjambre trabaja. Cuando dos agentes Gemini construyen funcionalidades relacionadas, el tablero mantiene la foto completa en un solo sitio.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode con permisos granulares',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Ejecutar un enjambre significa más acciones a la vez, y eso hace que los permisos importen más. Turbo Mode aprueba en automático las operaciones seguras y mantiene bajo control las arriesgadas, así un agente Gemini avanza rápido sin que tengas que dar luz verde a todo a ciegas. Tú pones la línea entre lo automático y lo que aún necesita un sí. La <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode</a> cubre la configuración completa.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'conflict-awareness',
        },
        {
          type: 'paragraph',
          text: 'Cuando dos agentes tocan el mismo archivo, lo ves mientras ocurre. CodeAgentSwarm sigue los cambios de archivos en vivo por terminal y a nivel de proyecto, así las ediciones solapadas dentro del enjambre no te sorprenden después. La <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de cambios en tiempo real</a> tiene más sobre esto.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Un enjambre de agentes Gemini es una variante de una idea más amplia. Para la foto completa entre proveedores, empieza por <a href="/es/guias/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">el hub del enjambre de agentes de CLI de IA</a>, y luego compáralo con <a href="/es/guias/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">el enjambre de agentes Codex</a> y con <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así quedan las tres formas de ejecutar un enjambre de agentes Gemini en lo que de verdad importa cuando el enjambre crece:',
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
            '<strong>CodeAgentSwarm:</strong> Notificaciones de escritorio nativas cuando un agente termina o necesita intervención',
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
            '<strong>CodeAgentSwarm:</strong> Se guarda de forma permanente y se puede buscar en todos los agentes',
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
          text: 'Si solo necesitas dos agentes Gemini de vez en cuando, las pestañas de terminal van bien. Si ya vives en tmux, sumar agentes de Gemini CLI a tu configuración es natural. Pero en cuanto ejecutas tres agentes o más a diario y quieres ver de verdad qué hace cada uno, CodeAgentSwarm quita la fricción que las otras dos opciones dejan por el camino.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un enjambre de agentes Gemini?',
      answer: 'Un enjambre de agentes Gemini son varios agentes de Gemini CLI corriendo en paralelo, cada uno en su propio terminal con su conversación y su contexto, mientras tú los supervisas. No hay ningún producto especial que comprar. Arrancas el comando gemini más de una vez y coordinas los agentes, ya sea a mano o a través de un espacio de trabajo como CodeAgentSwarm.',
    },
    {
      question: '¿Se pueden ejecutar varias sesiones de Gemini CLI a la vez?',
      answer: 'Sí. Cada sesión de Gemini CLI es un proceso independiente, así que puedes ejecutar tantas como aguante tu máquina. No comparten memoria y solo chocan si editan los mismos archivos. CodeAgentSwarm ejecuta hasta seis terminales a la vez y te deja poner cada uno en gemini cli.',
    },
    {
      question: '¿Cómo ejecuto un enjambre de agentes Gemini?',
      answer: 'Elige una de tres formas. Abre varias pestañas de terminal y ejecuta gemini en cada una. Usa tmux para dividir paneles y mantener sesiones persistentes. O usa CodeAgentSwarm, donde abres hasta seis terminales, eliges gemini cli por terminal en el selector SELECT AI AGENT y obtienes visibilidad compartida, notificaciones e historial buscable en todo el enjambre.',
    },
    {
      question: '¿Puedo ejecutar Gemini CLI y Claude Code al mismo tiempo?',
      answer: 'Sí. Como cada terminal es independiente, puedes correr un agente Gemini junto a uno de Claude Code y otro de Codex. En CodeAgentSwarm eliges el agente por terminal desde el selector SELECT AI AGENT, así que un enjambre mixto vive en un mismo espacio de trabajo con un historial compartido.',
    },
    {
      question: '¿El plan gratuito de Gemini CLI da para un enjambre?',
      answer: 'Para muchos flujos de trabajo, sí. Google ofrece un plan gratuito generoso con inicio de sesión de Google, lo que hace práctico ejecutar varios agentes Gemini en paralelo sin una factura por cada llamada. El uso intenso o sostenido puede tocar los límites, así que para enjambres grandes o de larga duración vigila tu cuota y los límites de tu cuenta.',
    },
  ],
}

export default guide
