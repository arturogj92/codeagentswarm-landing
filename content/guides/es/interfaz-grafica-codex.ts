import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'interfaz-grafica-codex',
    locale: 'es',
    title: 'Interfaz gráfica para Codex: una app de escritorio visual para OpenAI Codex CLI',
    metaTitle: 'Interfaz gráfica para Codex CLI: app de escritorio (2026)',
    metaDescription: 'Una interfaz gráfica para Codex es una app de escritorio sobre OpenAI Codex CLI. CodeAgentSwarm le da a Codex un workspace visual, tablero, diffs y avisos.',
    intro: `Una interfaz gráfica para Codex (un Codex GUI) es una app de escritorio que ejecuta OpenAI Codex CLI dentro de un workspace visual en lugar de un terminal pelado. El agente de debajo sigue siendo exactamente el mismo: mismo CLI, mismo modelo, misma cuenta de OpenAI, solo que con una capa visual a su alrededor.

Esa capa es lo que el terminal no te puede dar. Codex CLI es texto pasando por una sola ventana, algo que está bien para una sesión y se vuelve incómodo en cuanto ejecutas dos o tres, olvidas cuál está haciendo qué y subes por el scrollback a buscar qué cambió.

CodeAgentSwarm es justo ese tipo de interfaz para Codex. Funciona en macOS y Windows, le da a Codex varios terminales en paralelo, un tablero de tareas, historial buscable, diffs en vivo, notificaciones de escritorio y controles de permisos pulsables. No reemplaza a Codex CLI y no cambia cómo trabaja el agente. Le da al mismo CLI un panel.`,
    ctaText: 'Dale a OpenAI Codex una app de escritorio de verdad: un workspace visual con varios terminales de Codex, un tablero de tareas, diffs en vivo y notificaciones, todo sobre el CLI y la cuenta de OpenAI que ya usas.',
    highlightedWords: ['interfaz gráfica para Codex', 'app de escritorio'],
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    alternateSlug: 'codex-gui',
  },
  sections: [
    {
      id: 'what-is-a-codex-gui',
      title: '¿Qué es una interfaz gráfica para Codex?',
      content: [
        {
          type: 'image',
          alt: 'Varios terminales de OpenAI Codex CLI ejecutándose en paralelo en una ventana de CodeAgentSwarm, el workspace visual que es el núcleo de una interfaz gráfica para Codex',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'Una interfaz gráfica para Codex: varias sesiones de Codex CLI en sus propios terminales en una sola ventana visual, la parte que un terminal a secas no te puede dar.',
        },
        {
          type: 'paragraph',
          text: 'Una interfaz gráfica para Codex es una interfaz visual que envuelve el <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">CLI de OpenAI Codex</a> dentro de una app de escritorio. El agente en sí no cambia: sigue ejecutándose en un terminal de verdad, sigue leyendo y escribiendo archivos en tu repositorio, sigue iniciando sesión con <code>codex login</code> y usando tu propia cuenta de OpenAI. La interfaz añade una capa visual encima para que veas qué hace cada sesión de Codex y la controles con clics en lugar de memorizar flags y scrollback.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una interfaz gráfica para Codex en este sentido. Es una app de escritorio para macOS y Windows que le da al CLI un workspace de verdad: varios terminales en paralelo, un tablero de tareas, historial de conversaciones buscable, diffs de archivos en vivo, notificaciones nativas, controles de permisos, accesos directos a proyectos y un marketplace de skills y de MCP. Nada de eso reemplaza al agente. Es un panel y un gestor de OpenAI Codex construido alrededor de la herramienta que ya ejecutas.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Una interfaz no es un modelo distinto ni un plan distinto. CodeAgentSwarm funciona sobre tu cuenta de OpenAI, y el mismo workspace puede manejar Claude Code, Gemini CLI y opencode junto a Codex. Conservas toda la potencia del CLI, solo ganas una capa visual a su alrededor.',
        },
        {
          type: 'paragraph',
          text: 'Si lo que más quieres es ejecutar más de un agente de Codex a la vez, las guías más a fondo son <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Codex CLI</a> y la guía del <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Codex</a>. Esta página responde a qué es un Codex GUI por sí mismo: qué te da la capa gráfica que un terminal pelado no.',
        },
      ],
    },
    {
      id: 'what-you-get-in-the-gui',
      title: 'Qué te da una app con interfaz gráfica para Codex',
      content: [
        {
          type: 'paragraph',
          text: 'El sentido de una interfaz para Codex es sacar a la luz lo que el terminal esconde. Esto es lo que te da de verdad la capa visual, capacidad a capacidad.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un workspace visual con varios terminales de Codex',
          id: 'visual-workspace',
        },
        {
          type: 'paragraph',
          text: 'En vez de un terminal en una ventana, tienes una rejilla de terminales en una sola app. Cada uno ejecuta su propia sesión independiente de Codex CLI, sobre el mismo proyecto o sobre proyectos distintos, y cada terminal tiene un selector de agente para que decidas qué corre en cada sitio. Puedes organizarlos, centrarte en uno y echar un vistazo al resto, que es el núcleo de cualquier panel de Codex usable. El montaje paso a paso está en <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Codex CLI</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un tablero de tareas que los agentes actualizan solos',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'Un tablero kanban se sitúa sobre el workspace, y los agentes lo actualizan por MCP a medida que trabajan. Tú creas las tareas, se las das a los terminales y ves las tarjetas moverse por en curso y hecho, así que tienes un registro visual de lo que se construyó sin leer logs. Cuando varias sesiones de Codex avanzan features relacionadas, el tablero mantiene el plan a la vista en lugar de vivir en tu cabeza.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial buscable de todas las sesiones',
          id: 'searchable-history',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación se guarda y se puede buscar en un solo sitio, en vez de esfumarse al cerrar una pestaña de terminal. Puedes encontrar lo que decidió una sesión de Codex la semana pasada, retomarla y rastrear qué terminal hizo un cambio concreto. Es una de las mayores carencias que cubre una interfaz gráfica para Codex, y la <a href="/es/guias/historial-conversaciones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de conversaciones de Codex</a> la trata a fondo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs en vivo de lo que cambió Codex',
          id: 'live-diffs',
        },
        {
          type: 'paragraph',
          text: 'Puedes observar en tiempo real los cambios de archivos que hace cada sesión de Codex, por terminal y a nivel de proyecto. Se acabó adivinar qué tocó el agente: ves el diff a medida que ocurre y puedes revisarlo antes de hacer commit. Cuando dos sesiones editan el mismo archivo, te enteras mientras pasa en lugar de descubrirlo después en un diff enredado.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notifications',
        },
        {
          type: 'paragraph',
          text: 'Cuando una sesión de Codex termina su tarea o se para a pedirte una aprobación, recibes una notificación de escritorio nativa. Puedes trabajar en un terminal y dejar que el resto te avise cuando te necesite, en lugar de estar pendiente de un prompt que puede tardar minutos en responder.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Controles de aprobaciones y permisos que puedes pulsar',
          id: 'permission-controls',
        },
        {
          type: 'paragraph',
          text: 'Codex tiene sus propios modos de aprobación, desde solo sugerir hasta full auto con <code>--full-auto</code>, más un sandbox. La interfaz se sitúa encima con Turbo Mode y permisos por terminal, así puedes dejar una sesión trabajar sin supervisión en las operaciones seguras mientras las peligrosas quedan bajo tu aprobación. Lo configuras en la interfaz en lugar de hacer malabares con flags de línea de comandos, algo que importa más en cuanto hay varias sesiones actuando a la vez.',
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
      id: 'codex-cli-vs-codex-gui',
      title: 'Codex CLI vs Codex GUI',
      content: [
        {
          type: 'paragraph',
          text: 'La pregunta de Codex CLI vs Codex GUI tiene una respuesta honesta y simple: no es una cosa o la otra. La interfaz ejecuta el CLI real por debajo, así que la comparación va en realidad de qué añade la capa visual y cuándo merece la pena tenerla.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Lo que el CLI de Codex pelado ya hace bien',
          id: 'cli-strengths',
        },
        {
          type: 'list',
          items: [
            'Ya está instalado en cuanto tienes Codex, no hace falta nada más',
            'Para una sola sesión centrada en una tarea, es todo lo que necesitas',
            'Toda la potencia del agente, un envoltorio no esconde ni quita nada',
            'Se programa y se encadena con pipes como cualquier otra herramienta de línea de comandos',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde el terminal se vuelve incómodo',
          id: 'cli-pain',
        },
        {
          type: 'list',
          items: [
            'Varias sesiones de Codex a la vez se convierten en un montón de pestañas que parecen iguales',
            'Sin aviso cuando una sesión termina o se para a pedir una aprobación',
            'El historial es scrollback, que no puedes buscar entre sesiones ni entre días',
            'Lees texto para averiguar qué cambió, en lugar de ver un diff',
            'Los modos de aprobación y el contexto viven en flags y en tu memoria, no en una UI visible',
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
          text: 'La interfaz no quita nada. Por debajo sigue ejecutando Codex CLI de verdad en un terminal de verdad, con el mismo modelo y la misma cuenta de OpenAI. Lo que añade es todo lo que rodea al prompt: un workspace que puedes ver, un tablero de tareas, historial buscable, diffs en vivo, notificaciones y permisos pulsables. Si solo vas a ejecutar una sesión de Codex a la vez, el terminal pelado está bien y no le des más vueltas. En cuanto ejecutas varias, o pierdes la cuenta de qué hizo cada una, la capa visual es lo que quita esa fricción.',
        },
        {
          type: 'image',
          alt: 'Panel de CodeAgentSwarm mostrando un tablero kanban de tareas con columnas, sobre los terminales de agentes CLI de IA',
          src: '/images/guides/task-board-kanban.png',
          caption: 'Una de las superficies de la GUI: un tablero kanban que los agentes actualizan mientras trabajan.',
          size: 'medium',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Como la interfaz maneja el CLI en lugar de reemplazarlo, puedes volver a un terminal pelado cuando quieras. Nada de CodeAgentSwarm encierra a Codex: es una capa, no un fork. Si tu agente principal es Claude Code, la misma idea se cubre en la <a href="/es/guias/interfaz-grafica-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de la interfaz gráfica de Claude Code</a>.',
        },
      ],
    },
    {
      id: 'codex-gui-download',
      title: 'Descargar una interfaz gráfica para Codex: primeros pasos',
      content: [
        {
          type: 'paragraph',
          text: 'Tener una interfaz gráfica para Codex funcionando lleva un par de minutos. CodeAgentSwarm se descarga gratis desde la página de inicio, para macOS y Windows, y funciona con el CLI de Codex que ya tienes instalado.',
        },
        {
          type: 'list',
          items: [
            'Descarga CodeAgentSwarm desde la página de inicio e instálalo como cualquier app de escritorio',
            'Abre un terminal en el workspace y apúntalo a tu proyecto',
            'Elige "codex cli" en el selector SELECT AI AGENT de ese terminal',
            'Si aún no has iniciado sesión, ejecuta <code>codex login</code> una vez y trabaja como siempre',
          ],
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con las opciones claude-code, gemini cli y codex cli más un toggle de Enable Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Cada terminal tiene su propio selector de agente. Ponlo en codex cli y el terminal se convierte en una sesión de Codex dentro de la GUI.',
        },
        {
          type: 'paragraph',
          text: 'A partir de ahí, todo lo de esta guía queda a un clic: abre más terminales para más sesiones de Codex, saca el tablero de tareas, busca en conversaciones pasadas y observa los diffs mientras el agente trabaja. Hay un plan gratuito, con Pro para funciones avanzadas, y tu uso de Codex lo factura OpenAI como siempre.',
        },
        {
          type: 'paragraph',
          text: 'Sobre plataformas: la interfaz gráfica para Codex hoy es cosa de macOS y Windows. Ahora mismo no hay interfaz gráfica de CodeAgentSwarm para Codex en Linux, así que en Linux las opciones prácticas siguen siendo el terminal y multiplexores como tmux.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un Codex GUI?',
      answer: 'Un Codex GUI es una app de escritorio gráfica que ejecuta OpenAI Codex CLI dentro de un workspace visual. El agente de debajo es el CLI real, sin cambios, usando tu propia cuenta de OpenAI. La interfaz añade la capa que le falta al terminal: varios terminales de Codex en paralelo, un tablero de tareas, historial de conversaciones buscable, diffs de archivos en vivo, notificaciones de escritorio y controles de permisos pulsables. CodeAgentSwarm es una interfaz gráfica para Codex exactamente en este sentido.',
    },
    {
      question: '¿Hay una interfaz gráfica para Codex en Windows?',
      answer: 'Sí. CodeAgentSwarm es una app de escritorio tanto para Windows como para macOS. Se instala en local, ejecuta el CLI de Codex en tu máquina y usa tu cuenta de OpenAI. No hay ningún modelo ni plan aparte, así que una interfaz gráfica para Codex en Windows funciona igual que en un Mac.',
    },
    {
      question: '¿Hay una interfaz gráfica para Codex en Linux?',
      answer: 'De CodeAgentSwarm, hoy no. La app se distribuye actualmente solo para macOS y Windows, así que ahora mismo no hay interfaz gráfica para Codex en Linux. En Linux, la forma práctica de ejecutar varias sesiones de Codex sigue siendo el propio terminal, con herramientas como tmux para dividir paneles.',
    },
    {
      question: '¿Una interfaz gráfica reemplaza a Codex CLI?',
      answer: 'No. Una interfaz como CodeAgentSwarm ejecuta Codex CLI en un terminal de verdad por debajo y añade una capa visual a su alrededor. El agente, el modelo y tu cuenta de OpenAI siguen exactamente iguales. La interfaz es un panel y un gestor sobre el CLI, no una herramienta distinta, y puedes volver a un terminal pelado cuando quieras.',
    },
    {
      question: '¿Funciona con mi suscripción actual de ChatGPT u OpenAI?',
      answer: 'Sí. CodeAgentSwarm no es un proveedor de modelos. Cada terminal de Codex inicia sesión con codex login y usa tu cuenta de OpenAI, exactamente igual que el CLI en un terminal pelado. Tu uso de Codex lo factura OpenAI como siempre, y la interfaz no añade ningún recargo encima.',
    },
    {
      question: '¿Dónde descargo una interfaz gráfica para Codex?',
      answer: 'CodeAgentSwarm se descarga gratis desde la página de inicio de codeagentswarm.com, para macOS y Windows. Instálalo, abre un terminal en el workspace, elige codex cli en el selector SELECT AI AGENT, y el terminal se convierte en una sesión de Codex con toda la capa visual alrededor. Hay un plan gratuito, con Pro para funciones avanzadas.',
    },
    {
      question: '¿La misma interfaz puede ejecutar Claude Code y Gemini también?',
      answer: 'Sí. CodeAgentSwarm no está atado a un solo proveedor. Cada terminal tiene un selector de agente, así que puedes poner uno en Codex CLI, otro en Claude Code, otro en Gemini CLI o en opencode, todo en el mismo workspace visual. Un montaje mixto es lo normal, no un apaño, y la guía del enjambre de agentes Codex cubre cómo ejecutar varios agentes en paralelo.',
    },
  ],
}

export default guide
