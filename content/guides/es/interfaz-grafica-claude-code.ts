import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'interfaz-grafica-claude-code',
    locale: 'es',
    title: 'Interfaz gráfica de Claude Code: una app de escritorio visual para tus CLIs de IA',
    metaTitle: 'Interfaz gráfica de Claude Code: app, tareas y diffs (2026)',
    metaDescription: 'Una interfaz gráfica de Claude Code es una app de escritorio sobre el CLI. CodeAgentSwarm le da a Claude Code un workspace visual, tablero, diffs y avisos.',
    intro: `Claude Code puede usarse desde el terminal o desde la interfaz de escritorio de Anthropic. Un espacio gráfico ayuda a seguir las sesiones y revisar cambios sin depender solo de pestañas de terminal.

CodeAgentSwarm es un espacio de trabajo independiente para macOS y Windows. Reúne Claude Code con otros agentes de programación, tareas por proyecto, historial de conversaciones buscable, diffs en vivo y notificaciones. Conservas tus cuentas de agente y decides qué trabajo debe hacer cada sesión.

Encaja cuando quieres supervisión compartida entre proveedores o proyectos. Para una sola sesión, tu CLI habitual o la app de Anthropic pueden ser suficientes. CodeAgentSwarm incluye Pro durante la beta abierta; el acceso y el consumo de los proveedores son independientes.`,
    ctaText: 'Supervisa Claude Code junto a tus otros agentes, con tareas, historial, diffs en vivo y notificaciones en un solo espacio.',
    ctaAgent: 'claude-code',
    highlightedWords: ['interfaz gráfica de Claude Code', 'app de escritorio'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-09-25',
    alternateSlug: 'claude-code-gui',
  },
  sections: [
    {
      id: 'what-is-a-claude-code-gui',
      title: '¿Qué es una interfaz gráfica de Claude Code?',
      content: [
        {
          type: 'image',
          alt: 'Tres agentes CLI de código de IA ejecutándose a la vez como terminales separados en una ventana de CodeAgentSwarm, el workspace visual que es el núcleo de una interfaz gráfica de Claude Code',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'Una interfaz gráfica de Claude Code: varios agentes en sus propios terminales en una sola ventana visual, la parte que un terminal a secas no te puede dar.',
        },
        {
          type: 'paragraph',
          text: 'Anthropic ofrece <a href="https://code.claude.com/docs/en/desktop" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code en su app de escritorio</a>, con sesiones paralelas y revisión visual de diffs. CodeAgentSwarm es un producto independiente creado por Arturo García, no una app oficial de Anthropic. Se centra en supervisar Claude Code y otros agentes de programación en el mismo espacio.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una interfaz gráfica de Claude Code en este sentido. Es una app de escritorio para macOS y Windows que le da al CLI un workspace de verdad: varios terminales en paralelo, un tablero de tareas, historial buscable, diffs de archivos en vivo, notificaciones nativas, controles de permisos, accesos directos a proyectos y un marketplace de skills y de MCP. Nada de eso reemplaza al agente. Es un <a href="/es/guias/panel-de-control-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">panel y un gestor de Claude Code</a> construido alrededor de la herramienta que ya usas. Y si tu CLI principal es Codex, la misma capa visual existe para él en la <a href="/es/guias/interfaz-grafica-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de la interfaz gráfica de Codex</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Una interfaz no es un modelo distinto ni un plan distinto. CodeAgentSwarm funciona sobre tu suscripción de Claude, y también puede manejar Codex CLI y Antigravity CLI en el mismo workspace. Conservas toda la potencia del CLI, solo ganas una capa visual a su alrededor.',
        },
        {
          type: 'paragraph',
          text: 'Si lo que más quieres es ejecutar más de un agente a la vez, la guía más a fondo es <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>, y la vista entre proveedores es la guía del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>. Esta página va sobre la capa gráfica en sí: qué te da una interfaz de Claude Code que un terminal pelado no.',
        },
      ],
    },
    {
      id: 'what-you-get-in-the-gui',
      title: 'Qué te da la interfaz',
      content: [
        {
          type: 'paragraph',
          text: 'El sentido de una interfaz de Claude Code es sacar a la luz lo que el terminal esconde. Esto es lo que te da de verdad la capa visual, capacidad a capacidad.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un workspace visual con varios terminales',
          id: 'visual-workspace',
        },
        {
          type: 'paragraph',
          text: 'En vez de un terminal en una ventana, tienes una rejilla de varios terminales en una sola app. Cada uno ejecuta su propia sesión de Claude Code, sobre el mismo proyecto o sobre proyectos distintos. Puedes organizarlos, centrarte en uno y echar un vistazo al resto, que es el núcleo de cualquier panel de Claude Code usable. Para montarlo paso a paso, mira <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un tablero de tareas que el agente actualiza solo',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'Un tablero kanban se sitúa sobre el workspace, y Claude Code lo actualiza por MCP a medida que trabaja. Tú creas las tareas, el agente las mueve por en curso y hecho, y tienes un registro visual de lo que se construyó sin leer logs. La <a href="/es/guias/gestion-de-tareas-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de gestión de tareas</a> explica cómo se mantienen sincronizados el tablero y el agente.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial buscable de todas las sesiones',
          id: 'searchable-history',
        },
        {
          type: 'paragraph',
          text: 'Claude Code ya guarda conversaciones y permite retomar sesiones anteriores. CodeAgentSwarm reúne los historiales de agentes compatibles en una interfaz con búsqueda entre proyectos. La <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Claude Code</a> explica la reanudación nativa y la búsqueda compartida.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs en vivo de lo que cambió el agente',
          id: 'live-diffs',
        },
        {
          type: 'paragraph',
          text: 'Puedes observar en tiempo real los cambios de archivos que hace cada sesión, por terminal y a nivel de proyecto. Se acabó adivinar qué tocó el agente: ves el diff a medida que ocurre y puedes revisarlo antes de hacer commit. La <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de cambios en tiempo real</a> entra en detalle en las vistas de diff en vivo y de diff de Git.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notifications',
        },
        {
          type: 'paragraph',
          text: 'Cuando una sesión termina su tarea o se para a preguntarte algo, recibes una notificación de escritorio nativa. Puedes trabajar en un terminal y dejar que el resto te avise cuando te necesite, en lugar de estar pendiente de un prompt que puede tardar minutos en responder.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Controles de permisos que puedes pulsar',
          id: 'permission-controls',
        },
        {
          type: 'paragraph',
          text: 'Los controles de permisos granulares te dejan decidir qué puede hacer el agente sin supervisión y qué queda bajo tu aprobación. Lo configuras en la interfaz en lugar de hacer malabares con flags de línea de comandos, algo que importa más en cuanto hay varias sesiones actuando a la vez.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Accesos directos a proyectos y un marketplace de skills + MCP',
          id: 'shortcuts-marketplace',
        },
        {
          type: 'paragraph',
          text: 'Los accesos directos a proyectos te dejan saltar directo a los repos en los que trabajas sin reescribir rutas. Un marketplace de skills integrado y un marketplace de MCP te dejan añadir capacidades y conectar herramientas externas desde la interfaz, así el workspace crece contigo en lugar de quedarse en un terminal pelado.',
        },
      ],
    },
    {
      id: 'how-it-compares-to-the-raw-terminal',
      title: 'Cómo se compara con el terminal pelado',
      content: [
        {
          type: 'paragraph',
          text: 'Una interfaz no es mejor que el CLI en algún sentido abstracto. Es el mismo CLI con una capa visual encima, y esa capa vale más cuantas más sesiones ejecutes. Esta es la comparación honesta.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Lo que el terminal pelado ya hace bien',
          id: 'terminal-strengths',
        },
        {
          type: 'list',
          items: [
            'No hace falta instalar otro espacio de trabajo si ya usas Claude Code',
            'Para una sola sesión, centrada en una tarea, es todo lo que necesitas',
            'Toda la potencia del agente, un envoltorio no esconde ni quita nada',
            'Se programa y se encadena con pipes como cualquier otra herramienta de línea de comandos',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde el terminal se vuelve incómodo',
          id: 'terminal-pain',
        },
        {
          type: 'list',
          items: [
            'Varias sesiones a la vez se convierten en un montón de pestañas que parecen iguales',
            'Los avisos dependen del terminal y de los hooks que configures',
            'Las conversaciones guardadas de distintos agentes están en historiales separados',
            'Revisar cambios de varias sesiones exige seguir sus repositorios y ramas',
            'Hay que revisar los permisos de cada sesión, uses la interfaz que uses',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Lo que añade la interfaz por encima',
          id: 'gui-adds',
        },
        {
          type: 'paragraph',
          text: 'La interfaz no quita nada. Por debajo sigue ejecutando Claude Code de verdad en un terminal de verdad, con el mismo modelo y la misma suscripción. Lo que añade es todo lo que rodea al prompt: un workspace que puedes ver, un tablero de tareas, historial buscable, diffs en vivo, notificaciones y permisos pulsables. Si solo vas a ejecutar una sesión a la vez, el terminal pelado está bien y no le des más vueltas. En cuanto ejecutas varias, o pierdes la cuenta de qué hizo cada una, la capa visual es lo que quita esa fricción.',
        },
        {
          type: 'image',
          alt: 'Panel de CodeAgentSwarm mostrando un tablero kanban de tareas con columnas, sobre los terminales de Claude Code',
          src: '/images/guides/task-board-kanban.png',
          caption: 'Una de las superficies de la GUI: un tablero kanban que el agente actualiza mientras trabaja.',
          size: 'medium',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Como la interfaz maneja el CLI en lugar de reemplazarlo, puedes volver a un terminal pelado cuando quieras. Nada de CodeAgentSwarm encierra al agente: es una capa, no un fork.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Existe una interfaz gráfica para Claude Code?',
      answer: 'Sí. Anthropic ofrece una interfaz de escritorio para Claude Code. CodeAgentSwarm es una opción independiente para macOS y Windows que reúne Claude Code con otros agentes, tareas por proyecto, historial buscable, diffs en vivo y notificaciones.',
    },
    {
      question: '¿Una interfaz gráfica de Claude Code reemplaza al CLI?',
      answer: 'No. Una interfaz como CodeAgentSwarm ejecuta Claude Code en un terminal de verdad por debajo y añade una capa visual a su alrededor. El agente, el modelo y tu suscripción siguen exactamente iguales. La interfaz es un panel y un gestor sobre el CLI, no una herramienta distinta ni un reemplazo.',
    },
    {
      question: '¿Cuál es la diferencia entre el terminal de Claude Code y un panel de Claude Code?',
      answer: 'El terminal es una sola ventana de texto donde se ejecuta el agente. Un panel es una capa gráfica que saca a la luz lo que el terminal esconde: varias sesiones de un vistazo, un tablero de tareas, historial buscable entre días, diffs de archivos en vivo y notificaciones de escritorio. El panel no cambia cómo trabaja el agente, solo hace que su actividad sea visible y pulsable.',
    },
    {
      question: '¿CodeAgentSwarm funciona con Claude Code en Windows y macOS?',
      answer: 'Sí. CodeAgentSwarm es una app de escritorio para macOS y Windows. Se instala en local, ejecuta el CLI de Claude Code en tu máquina y usa tu propia suscripción de Claude. No hay ningún modelo ni plan aparte.',
    },
    {
      question: '¿La misma interfaz puede ejecutar Codex y Antigravity también?',
      answer: 'Sí. CodeAgentSwarm no está atado a un solo proveedor. Cada terminal tiene un selector de agente, así que puedes poner uno en Claude Code, otro en Codex CLI y otro en Antigravity CLI, todo en el mismo workspace visual. El montaje entre proveedores se cubre en la guía del enjambre de agentes CLI de IA.',
    },
    {
      question: '¿Necesito una interfaz gráfica de Claude Code si solo ejecuto una sesión?',
      answer: 'No necesariamente. Para una sola sesión centrada en una tarea, el terminal pelado es suficiente. Una interfaz se gana su sitio en cuanto ejecutas varias sesiones, quieres avisos cuando el agente termina, necesitas historial buscable, o quieres ver diffs y gestionar permisos de forma visual en lugar de en el scrollback y los flags.',
    },
  ],
}

export default guide
