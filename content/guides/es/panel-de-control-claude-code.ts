import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'panel-de-control-claude-code',
    locale: 'es',
    title: 'Panel de control de Claude Code: gestiona todas tus sesiones desde una ventana',
    metaTitle: 'Panel de control de Claude Code: gestiona tus sesiones (2026)',
    metaDescription: 'Un panel de control de Claude Code te deja supervisar y gestionar todas tus sesiones desde una ventana: estado por terminal, tablero kanban, avisos e historial.',
    intro: `Un panel de control de Claude Code es una sola ventana desde la que supervisas y gestionas todas tus sesiones de Claude Code en marcha: qué terminal está trabajando, cuál terminó, cuál se quedó parado esperando tu respuesta y en qué tarea está cada uno. En lugar de ir pestaña por pestaña comprobando cada agente, miras una pantalla y sabes cómo está todo.

Y eso importa porque Claude Code por sí solo no te da nada de esto. Anthropic lo distribuye como un CLI, así que cada sesión es un muro de texto en su propia ventana, y en cuanto ejecutas tres o cuatro el trabajo de verdad pasa a ser recordar quién está haciendo qué.

CodeAgentSwarm es ese panel. Es una app de escritorio gratuita para macOS y Windows que ejecuta tus sesiones en un solo workspace y añade la capa de supervisión encima: estado por terminal, un tablero kanban de tareas que los propios agentes actualizan, notificaciones de escritorio, historial buscable, cambios de archivos en vivo y cambio de proyecto con un clic. Esta guía va de usarlo como gestor de Claude Code: verlo todo, pillar al vuelo el terminal que te necesita y mantener bajo control un enjambre de agentes.`,
    ctaText: 'Pon todas tus sesiones de Claude Code en un solo panel: ve de un vistazo el estado de cada terminal, sus tareas y sus cambios, y deja que las sesiones te avisen cuando te necesiten.',
    highlightedWords: ['Panel de control de Claude Code', 'todas tus sesiones'],
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    alternateSlug: 'claude-code-dashboard',
  },
  sections: [
    {
      id: 'the-status-problem',
      title: 'El problema del estado: muchas sesiones, cero visibilidad',
      content: [
        {
          type: 'paragraph',
          text: 'Imagina una tarde normal en paralelo. Una sesión de Claude Code está refactorizando el módulo de auth, otra escribe tests, una tercera migra un esquema de base de datos. En un terminal a secas, las tres parecen iguales: una pestaña llamada "claude" con texto pasando. Para saber cómo va cualquiera de ellas tienes que entrar, leer la última pantalla de salida y reconstruir qué pasó.',
        },
        {
          type: 'paragraph',
          text: 'Mientras tanto, los fallos se acumulan en silencio. La sesión de tests terminó hace ocho minutos y lleva parada desde entonces. La de la migración se topó con una pregunta de permisos justo después de que cambiaras de pestaña, así que lleva todo ese rato esperando un sí tuyo. De ninguna de las dos te enteras hasta que por casualidad pinchas en la pestaña correcta. Ejecutar agentes en paralelo iba a ahorrarte tiempo, y lo acabas gastando en patrullar pestañas.',
        },
        {
          type: 'paragraph',
          text: 'Esto es un problema de gestión, no de código. Los agentes van bien, lo que pasa es que no los ves. Un gestor de sesiones de Claude Code existe para responder tres preguntas de forma continua y sin que las hagas: qué está haciendo cada sesión, cuáles han terminado y cuál está bloqueada esperándome.',
        },
        {
          type: 'paragraph',
          text: 'Si lo que buscas en realidad es una explicación de las interfaces gráficas para el CLI en general, esa es otra pregunta y tiene su propia página: <a href="/es/guias/interfaz-grafica-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía de la interfaz gráfica de Claude Code</a>. Esta asume que ya ejecutas sesiones y se centra en supervisarlas a escala.',
        },
      ],
    },
    {
      id: 'what-the-dashboard-shows',
      title: 'Qué te enseña el panel',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm pone toda la respuesta en una pantalla. Esto es lo que el panel saca a la luz, capacidad a capacidad.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Todos los terminales en una ventana, cada uno con su estado',
          id: 'terminals-with-status',
        },
        {
          type: 'paragraph',
          text: 'Todas tus sesiones corren como terminales dentro de un solo workspace, así que se acabó cazar pestañas. Cada terminal lleva un título dinámico que refleja qué está haciendo el agente ("Refactorizando auth", "Escribiendo tests de la API") más un estado visual: sigue trabajando, terminó o está esperando algo tuyo. Un segundo mirando la rejilla te dice qué terminales necesitan atención. El montaje en sí se explica en <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>.',
        },
        {
          type: 'image',
          alt: 'Panel de CodeAgentSwarm mostrando varios terminales con colores y estados distintos, unos trabajando, otros terminados y otros esperando entrada',
          src: '/images/guides/terminal-status-indicators.png',
          caption: 'El núcleo del panel: cada sesión con su estado visible, para que la que está bloqueada no pueda esconderse.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un tablero de tareas conectado a tus terminales',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'El tablero de tareas es un kanban con cuatro columnas: Pendiente, En progreso, En testing y Completada. Tú creas tareas y las asignas a terminales, y los propios agentes mueven las tarjetas por MCP mientras trabajan: escriben un plan al empezar, dejan un resumen de la implementación al terminar y aparcan la tarjeta en En testing para que la revises. El tablero es tu vista del enjambre a nivel de proyecto, y la <a href="/es/guias/gestion-de-tareas-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de gestión de tareas</a> lo cubre a fondo.',
        },
        {
          type: 'image',
          alt: 'El tablero de tareas de CodeAgentSwarm con columnas kanban Pendiente, En progreso, En testing y Completada, con cada tarjeta ligada a un terminal',
          src: '/images/guides/task-board-kanban.png',
          caption: 'Tareas ligadas a terminales: el tablero muestra qué debería estar haciendo cada sesión, y los agentes lo mantienen al día.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Avisos cuando un agente termina o se atasca',
          id: 'notifications',
        },
        {
          type: 'paragraph',
          text: 'Cuando una sesión completa su tarea o se para a preguntarte algo, recibes una notificación de escritorio nativa. Eso le da la vuelta al modelo de gestión: en lugar de ir tú a comprobar las sesiones, las sesiones te avisan a ti. Puedes darle toda tu atención a un terminal y confiar en que el resto levantará la mano cuando termine o se bloquee.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial buscable de todas las conversaciones',
          id: 'searchable-history',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación de cada terminal se guarda y se puede buscar en un solo sitio. Cuando necesitas saber qué sesión tocó el flujo de pagos el martes pasado, lo buscas, lees la conversación y la retomas si quieres seguir. Un gestor solo es útil si también cubre lo que pasó ayer, y la <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de conversaciones</a> enseña hasta dónde llega.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cambios de archivos de un vistazo',
          id: 'file-changes',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal expone los cambios de archivos que está haciendo su sesión, en formato diff, por terminal y a nivel de proyecto. Cuando dos sesiones trabajan cerca la una de la otra en el mismo repo, ves el solapamiento formándose en lugar de descubrirlo a la hora del commit.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cambio de proyecto con un clic',
          id: 'project-switching',
        },
        {
          type: 'paragraph',
          text: 'Los accesos directos a proyectos de la barra superior abren un terminal nuevo ya dentro de un proyecto concreto, con el agente y los ajustes de arranque que guardaste para él. Gestionar sesiones en varios repos deja de significar "navega a la carpeta y reescribe el comando" y pasa a ser un clic por proyecto.',
        },
      ],
    },
    {
      id: 'managing-a-real-session',
      title: 'Gestionar una sesión de trabajo real desde el panel',
      content: [
        {
          type: 'paragraph',
          text: 'Esto es lo que parece un rato de trabajo concreto con el panel delante, en vez de una lista de funciones.',
        },
        {
          type: 'list',
          items: [
            'Abres CodeAgentSwarm y pulsas dos accesos directos de proyecto: un terminal se abre en tu repo de la API y otro en la web. Añades un tercer terminal en el repo de la API para los tests.',
            'Creas tres tareas en el tablero y asignas una a cada terminal. Las tres empiezan en Pendiente.',
            'Los agentes cogen sus tareas, mueven las tarjetas a En progreso y cada uno escribe su plan. Los títulos de los terminales se actualizan para reflejar el trabajo.',
            'Te centras en el terminal de la web. Veinte minutos después una notificación te dice que el terminal de tests terminó: su tarjeta está en En testing con un resumen de la implementación de lo que cambió.',
            'Otra notificación: el terminal de la API está esperando una confirmación. Su estado aparece bloqueado, así que entras, respondes y sigue. Nada de tiempo perdido en vacío.',
            'Antes de revisar el trabajo de los tests, miras los cambios de archivos de ese terminal para ver exactamente qué archivos tocó.',
            'El resultado tiene buena pinta, así que mueves la tarjeta a Completada. El tablero ahora dice: una Completada, dos En progreso, y sabes exactamente cómo van esas dos.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Nada en ese flujo exigió leer scrollback del terminal para averiguar estados. El estado vino a ti: de los indicadores de los terminales, del tablero, de las notificaciones. Esa es la diferencia entre ejecutar sesiones y gestionarlas.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'El panel no es solo para Claude. Cada terminal tiene un selector de agente, así que el mismo tablero y los mismos estados funcionan cuando algunas de tus sesiones ejecutan Codex, Gemini CLI u opencode junto a Claude Code.',
        },
      ],
    },
    {
      id: 'dashboard-vs-plain-terminals',
      title: 'Panel vs malabares con terminales sueltos',
      content: [
        {
          type: 'paragraph',
          text: 'Las pestañas de terminal y los paneles de tmux pueden contener varias sesiones. Lo que no pueden es gestionarlas, porque nunca se construyeron para saber qué está haciendo un agente de IA. La comparación honesta va de supervisión, no de ejecución.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Lo que pestañas y tmux te dejan a ti',
          id: 'tabs-tmux-gaps',
        },
        {
          type: 'list',
          items: [
            'Estado: el sistema de estado eres tú. Saber si una sesión terminó significa entrar y leer la salida.',
            'Sesiones bloqueadas: una pregunta de permisos en una pestaña de fondo espera en silencio hasta que la encuentras.',
            'Seguimiento de tareas: qué sesión lleva qué parte del trabajo vive en tu cabeza o en otra herramienta.',
            'Historial: el scrollback muere con la pestaña, y no puedes buscar entre sesiones ni entre días.',
            'Cambios: averiguar qué modificó un agente significa leer su salida o tirar de git tú mismo.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Lo que el panel asume por ti',
          id: 'dashboard-takes-over',
        },
        {
          type: 'list',
          items: [
            'El estado por terminal y los títulos dinámicos responden "qué está haciendo cada uno" de un vistazo.',
            'Las notificaciones sacan a la luz las sesiones terminadas y bloqueadas en el momento en que ocurre.',
            'El tablero liga cada sesión a una tarjeta, con un plan y un resumen escritos por el agente.',
            'El historial se guarda y se busca en todos los terminales, y las conversaciones se pueden retomar.',
            'Los cambios de archivos se ven por terminal y por proyecto, en formato diff.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para una sesión suelta de vez en cuando, las pestañas van bien y no necesitas nada de esto. El panel se gana su sitio en el punto en que comprobar tus sesiones empieza a costarte más de lo que las sesiones te ahorran, que en la práctica llega alrededor del tercer agente en paralelo.',
        },
      ],
    },
    {
      id: 'getting-started',
      title: 'Cómo empezar con el panel',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una descarga gratuita para macOS y Windows, disponible desde la página principal. Se instala en local, ejecuta el CLI real de Claude Code en terminales de verdad y usa tu suscripción de Claude de siempre. No hay plan aparte ni modelo distinto: el panel es una capa sobre la herramienta que ya usas, no un reemplazo.',
        },
        {
          type: 'paragraph',
          text: 'Llegar a un montaje gestionado lleva unos minutos: abre la app, apunta un terminal a tu proyecto y arranca Claude Code dentro. Añade más terminales según los necesites, crea tareas en el tablero y activa las notificaciones. A partir de ahí la supervisión es ambiental: estados, tarjetas y avisos en lugar de repasar pestañas.',
        },
        {
          type: 'paragraph',
          text: 'Y como cada terminal tiene un selector de agente, el mismo panel gestiona también sesiones de Codex, Gemini CLI y opencode. Una ventana, todos los agentes, todos los estados.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Existe un panel de control oficial de Anthropic para Claude Code?',
      answer: 'No. Anthropic distribuye Claude Code como una herramienta de línea de comandos, y no incluye un panel gráfico para supervisar sesiones. Los paneles vienen de apps de escritorio construidas alrededor del CLI. CodeAgentSwarm es una de ellas: ejecuta el Claude Code real en terminales de verdad y añade la capa de gestión encima, con estado por terminal, un tablero de tareas, notificaciones e historial buscable.',
    },
    {
      question: '¿Puedo gestionar varias sesiones de Claude Code desde un solo panel?',
      answer: 'Sí, para eso existe CodeAgentSwarm. Todas tus sesiones corren como terminales en un solo workspace, cada una con un título dinámico y un estado visible. Asignas tareas a los terminales en el tablero kanban, recibes un aviso cuando una sesión termina o necesita algo, y buscas en el historial de todas las conversaciones desde un solo sitio.',
    },
    {
      question: '¿El panel muestra el consumo o el coste en tokens de Claude Code?',
      answer: 'No. CodeAgentSwarm es un panel de sesiones y tareas, no una herramienta de analítica de costes. Te enseña qué está haciendo cada sesión, su estado, sus tareas, su historial de conversaciones y sus cambios de archivos. No mide consumo de tokens ni gasto. Si buscas paneles de uso en ese sentido de facturación, eso es otra categoría de herramienta.',
    },
    {
      question: '¿El panel cambia cómo funciona Claude Code?',
      answer: 'No. Por debajo es el mismo CLI de Claude Code corriendo en un terminal de verdad, con el mismo modelo y tu propia suscripción de Claude. El panel añade visibilidad y control a su alrededor: estados, tareas, notificaciones, historial y diffs. Puedes volver a un terminal pelado cuando quieras, nada queda encerrado.',
    },
    {
      question: '¿El mismo panel puede gestionar agentes que no sean Claude Code?',
      answer: 'Sí. Cada terminal de CodeAgentSwarm tiene un selector de agente, así que el mismo workspace puede ejecutar Claude Code, Codex, Gemini CLI y opencode en paralelo. El tablero de tareas, los estados, las notificaciones y el historial funcionan igual sea cual sea el agente de cada terminal.',
    },
    {
      question: '¿Cómo me avisa el panel de que una sesión necesita mi respuesta?',
      answer: 'De dos formas. El propio terminal muestra un estado de espera, así que un vistazo al workspace revela qué sesión está bloqueada. Y salta una notificación de escritorio nativa cuando una sesión se para a preguntarte algo o termina su tarea, así que te enteras aunque estés centrado en otro terminal o en otra app.',
    },
  ],
}

export default guide
