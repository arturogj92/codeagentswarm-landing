import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'gestion-de-tareas-claude-code',
    locale: 'es',
    title: 'Gestión de tareas en Claude Code: un tablero Kanban que tus agentes IA actualizan',
    metaTitle: 'Gestión de tareas en Claude Code: un tablero Kanban que tus agentes IA actualizan (2026)',
    metaDescription: 'Un tablero Kanban integrado para la gestión de tareas en Claude Code. Crea tareas, asígnalas a terminales y deja que tus agentes IA lean y actualicen el tablero por MCP.',
    intro: `Cuando ejecutas más de un agente de IA a la vez, lo difícil no es programar. Lo difícil es no perder de vista qué está haciendo cada agente. Un terminal está refactorizando, otro escribe tests, un tercero va a medias y esperando, y al cabo de veinte minutos ya no tienes ni idea de cómo está cada cosa.

CodeAgentSwarm incluye un tablero de tareas estilo Kanban (el Agent Task Board) con cuatro columnas: Pendiente, En progreso, En testing y Completada. Tú creas las tareas y las asignas a los terminales, igual que harías en cualquier tablero de proyecto. La diferencia es que los propios agentes de IA leen y actualizan el tablero. Mueven sus propias tarjetas entre columnas, escriben un plan antes de empezar, dejan un resumen de la implementación al terminar y crean subtareas cuando un trabajo resulta ser más grande de lo previsto.

En esta guía te explico qué es el tablero de tareas, cómo lo mantienen al día los agentes por su cuenta y por qué ese detalle cambia por completo la sensación de ejecutar varias sesiones de Claude Code a la vez.`,
    highlightedWords: ['Gestión de tareas', 'tablero Kanban', 'agentes IA'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    ctaText: 'Abre el Agent Task Board, asigna una tarea a un terminal y observa cómo la IA mueve su propia tarjeta de Pendiente a Completada.',
    alternateSlug: 'claude-code-task-management',
  },
  sections: [
    {
      id: 'what-is-the-task-board',
      title: 'Qué es el tablero de tareas de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'El Agent Task Board de CodeAgentSwarm es un tablero Kanban integrado en la app, con cuatro columnas que reflejan el ciclo real de una tarea de programación: Pendiente, En progreso, En testing y Completada. Cada tarjeta es una tarea con su título, su plan y su resumen de implementación, y pertenece a un proyecto.',
        },
        {
          type: 'image',
          alt: 'Agent Task Board de CodeAgentSwarm mostrando cuatro columnas Kanban (Pendiente, En progreso, En testing, Completada) con tarjetas de tareas distribuidas entre ellas',
          src: '/images/guides/task-board-kanban.png',
          caption: 'El Agent Task Board con sus cuatro columnas. Las tarjetas avanzan a medida que progresa el trabajo.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Hasta aquí suena como cualquier tablero de proyecto que ya hayas usado. Lo que lo hace distinto es quién lo mantiene al día. En un tablero normal arrastras tú las tarjetas. Aquí los agentes de IA son participantes de pleno derecho: leen el tablero para saber en qué tienen que trabajar y lo actualizan a medida que avanzan.',
        },
        {
          type: 'paragraph',
          text: 'Si todavía no conoces <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, es la herramienta de programación agéntica de Anthropic que corre en tu terminal y edita tu código directamente. CodeAgentSwarm te deja ejecutar varios de esos agentes en paralelo, y el tablero de tareas es lo que evita que se conviertan en un caos imposible de seguir. El tablero es una pieza de una capa de supervisión más amplia, explicada en la <a href="/es/guias/panel-de-control-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del panel de control de Claude Code</a>.',
        },
      ],
    },
    {
      id: 'agents-update-the-board',
      title: 'Los agentes actualizan el tablero ellos mismos',
      content: [
        {
          type: 'paragraph',
          text: 'Esta es la idea central, así que conviene ser preciso. Los agentes de IA no se limitan a ejecutar comandos mientras tú vigilas un tablero aparte. Leen y escriben el tablero directamente.',
        },
        {
          type: 'paragraph',
          text: 'Una tarea típica recorre las columnas así:',
        },
        {
          type: 'list',
          items: [
            'Tú creas una tarea y la asignas a un terminal. Empieza en Pendiente.',
            'Cuando el agente la coge, mueve la tarjeta a En progreso y escribe un plan corto de lo que piensa hacer.',
            'Mientras trabaja, puede crear subtareas para las piezas que resultan ser trabajos separados.',
            'Al terminar, escribe un resumen de la implementación (qué archivos tocó, qué cambió) y mueve la tarjeta a En testing.',
            'Tú revisas el resultado. Si está bien, la tarjeta pasa a Completada.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Fíjate en que el agente no salta directamente a Completada. El trabajo aterriza primero en En testing, lo que te da un punto de control claro para mirar lo que se hizo antes de darlo por terminado. Tú sigues siendo quien aprueba, el agente solo mantiene el tablero honesto sobre dónde están de verdad las cosas.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Como el agente escribe el plan antes de empezar y el resumen al terminar, la tarjeta se convierte en un pequeño registro del trabajo. Puedes abrir una tarea Completada semanas después y leer qué hizo la IA en realidad, sin rebuscar en los logs del terminal.',
        },
      ],
    },
    {
      id: 'how-agents-update-mcp',
      title: 'Cómo actualizan las tareas los agentes (el MCP detrás)',
      content: [
        {
          type: 'paragraph',
          text: 'La razón por la que los agentes pueden tocar el tablero es MCP, el Model Context Protocol. CodeAgentSwarm expone el tablero de tareas a cada agente como un conjunto de herramientas MCP, de modo que actualizar una tarea es algo que la IA puede hacer por su cuenta, igual que edita un archivo o ejecuta un comando.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica el agente dispone de herramientas para crear una tarea, iniciarla (moverla a En progreso), escribir su plan, registrar el resumen de la implementación, crear subtareas y enviar la tarea a testing. No tienes que conectar nada de esto a mano. Cuando ejecutas Claude Code dentro de CodeAgentSwarm, esas herramientas ya están ahí para que el agente las use.',
        },
        {
          type: 'paragraph',
          text: 'El efecto práctico es que el tablero se mantiene al día sin que tú hagas el papeleo. El agente que acaba de terminar un refactor es el que marca ese refactor como listo para testing, porque es quien sabe que acaba de terminarlo. No estás transcribiendo el estado de un terminal a un tablero, el agente reporta su propio estado directamente.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'MCP es también la forma de conectar otras herramientas a tus agentes (bases de datos, búsqueda, navegadores). Si quieres profundizar en eso, el tablero de tareas es un buen ejemplo de lo mucho que mejora todo cuando el agente puede actuar sobre un sistema en lugar de solo describirlo.',
        },
      ],
    },
    {
      id: 'projects-labels-subtasks',
      title: 'Proyectos, etiquetas y subtareas',
      content: [
        {
          type: 'paragraph',
          text: 'El tablero no es una sola lista plana. Las tareas se organizan por proyecto, así que cada repositorio o producto en el que trabajas tiene su propio conjunto de tarjetas en lugar de amontonarlo todo en una columna. Cuando tienes un agente corriendo en un proyecto, sus tareas aterrizan bajo ese proyecto automáticamente.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Etiquetas',
          id: 'labels',
        },
        {
          type: 'paragraph',
          text: 'Puedes añadir etiquetas a las tareas para agruparlas por tipo o área: bug, feature, refactor, tests, lo que encaje con cómo piensas el trabajo. Las etiquetas hacen escaneable un tablero cargado, de modo que ves de un vistazo qué tarjetas son bugs y cuáles son features nuevas sin leer cada título.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Subtareas',
          id: 'subtasks',
        },
        {
          type: 'paragraph',
          text: 'Las tareas admiten subtareas, y aquí es donde más rinde la capacidad del agente de actualizar el tablero. Cuando un agente empieza una tarea y se da cuenta de que en realidad son tres trabajos, puede dividirla en subtareas bajo la tarea padre. Las subtareas heredan el proyecto del padre, así que no tienes que reasignarlas, y obtienes una jerarquía limpia en lugar de una tarjeta gigante que no significa nada concreto.',
        },
        {
          type: 'paragraph',
          text: 'También puedes crear subtareas tú mismo, incluso bajo una tarea que ya está completada, lo cual es práctico cuando encuentras un seguimiento de algo que la IA entregó antes.',
        },
      ],
    },
    {
      id: 'why-it-matters',
      title: 'Por qué importa cuando ejecutas varios agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Un solo agente trabajando en una sola tarea no necesita realmente un tablero. El tablero se gana el sueldo en el momento en que tienes varios agentes a la vez, que es exactamente para lo que está hecho CodeAgentSwarm. Ejecuta varios terminales de CLI de IA (Claude Code, Codex CLI, Gemini CLI) en paralelo, y en cuanto tienes cuatro o cinco trabajando, "qué hace cada uno" deja de ser una pregunta que puedas responder de memoria.',
        },
        {
          type: 'paragraph',
          text: 'Con el tablero de tareas, esa pregunta tiene una respuesta visible. Echas un vistazo a las columnas y ves que dos tareas están En progreso, una está En testing esperando tu revisión y tres siguen Pendientes. Cada tarjeta En progreso tiene un plan que puedes leer. Cada tarjeta En testing tiene un resumen de lo que se hizo. El enjambre de agentes se convierte en un tablero que de verdad puedes mirar.',
        },
        {
          type: 'paragraph',
          text: 'Esto encaja de forma natural con el resto del espacio de trabajo. Para montar las sesiones en paralelo que hacen que el tablero merezca la pena, mira <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo ejecutar múltiples sesiones de Claude Code</a>. Y para la imagen completa de coordinar distintas herramientas CLI juntas, mira la guía sobre el <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>.',
        },
        {
          type: 'paragraph',
          text: 'El resumen honesto: el tablero no hace a los agentes más listos, los hace legibles. Tú sigues decidiendo qué se construye y sigues aprobando los resultados. El tablero solo significa que nunca tienes que preguntarte qué agente está en qué, porque los propios agentes te lo cuentan.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es el tablero de tareas de Claude Code?',
      answer: 'Es un tablero Kanban integrado en CodeAgentSwarm, llamado Agent Task Board, con cuatro columnas: Pendiente, En progreso, En testing y Completada. Tú creas las tareas y las asignas a los terminales que ejecutan Claude Code (o Codex y Gemini), y las tarjetas avanzan por las columnas a medida que progresa el trabajo.',
    },
    {
      question: '¿Pueden los agentes de IA actualizar el tablero Kanban ellos mismos?',
      answer: 'Sí. Esa es la clave. Los agentes leen el tablero para saber en qué trabajar y lo actualizan a medida que avanzan. Mueven sus propias tarjetas de Pendiente a En progreso y a En testing, escriben un plan antes de empezar, registran un resumen de la implementación al terminar y crean subtareas cuando un trabajo crece.',
    },
    {
      question: '¿Cómo actualizan las tareas los agentes (MCP)?',
      answer: 'CodeAgentSwarm expone el tablero de tareas a cada agente como un conjunto de herramientas MCP (Model Context Protocol). El agente dispone de herramientas para crear una tarea, iniciarla, escribir su plan, guardar un resumen de la implementación, crear subtareas y enviarla a testing. Cuando ejecutas Claude Code dentro de CodeAgentSwarm, esas herramientas están disponibles automáticamente, así que no tienes que configurar nada.',
    },
    {
      question: '¿Puedo organizar las tareas por proyecto?',
      answer: 'Sí. Las tareas se organizan por proyecto, de modo que cada repositorio o producto tiene su propio conjunto de tarjetas en lugar de un montón compartido. Cuando un agente corre dentro de un proyecto, las tareas que crea aterrizan bajo ese proyecto automáticamente.',
    },
    {
      question: '¿Admite subtareas?',
      answer: 'Sí. Las tareas admiten subtareas, y estas heredan el proyecto de su tarea padre. Un agente puede dividir una tarea en subtareas cuando resulta ser varios trabajos, y tú también puedes crear subtareas, incluso bajo una tarea que ya está completada.',
    },
    {
      question: '¿Tengo que mover yo las tarjetas?',
      answer: 'Puedes, pero normalmente no hace falta. Los agentes mueven sus propias tarjetas a medida que trabajan. Tu trabajo principal es revisar las tareas que aterrizan En testing y aprobarlas para que pasen a Completada. El tablero se mantiene al día sin que hagas el papeleo manual.',
    },
  ],
}

export default guide
