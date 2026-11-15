import type { Guide } from '../types'

const link = (href: string, text: string) =>
  `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'tareas-programadas-agentes-ia',
    locale: 'es',
    title: 'Cómo programar agentes de IA para que trabajen solos: cron para Claude Code, Codex y 10 más',
    metaTitle: 'Tareas programadas para agentes de IA: Claude Code, Codex y más',
    metaDescription: 'Programa un agente de IA para que trabaje solo: su propio programador, cron con un CLI sin interfaz o las conversaciones programadas de CodeAgentSwarm.',
    intro: 'Quieres que un agente haga el mismo trabajo cada mañana, cada pocas horas o cada domingo sin volver a escribir el prompt. Hay tres caminos: el programador que trae tu agente (si trae uno), cron con un comando sin interfaz o las conversaciones programadas de CodeAgentSwarm 2.5.0. Esta guía los compara y explica cómo se configura en CodeAgentSwarm, que funciona igual con los 12 agentes que soporta.',
    ctaText: 'Crea tu primera tarea programada en CodeAgentSwarm 2.5.0: elige proyecto, agente y prompt, y deja que arranque solo.',
    ctaAgent: 'multi',
    highlightedWords: ['programar', 'cron'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'schedule-ai-coding-agents',
    socialImage: '/images/guides/schedule-editor-times.webp',
  },
  sections: [
    {
      id: 'respuesta-rapida',
      title: '¿Cómo hago que un agente de IA se ejecute a una hora?',
      content: [
        {
          type: 'paragraph',
          text: 'Elige según dónde tenga que pasar el trabajo:',
        },
        {
          type: 'list',
          items: [
            '<strong>El programador del propio agente.</strong> Claude Code, Codex, Cursor, Devin y Cline tienen uno que funciona sin una sesión abierta, unos en local y otros en la nube del proveedor. Antigravity CLI, Kimi Code y Copilot CLI repiten prompts dentro de la conversación actual, y los bucles de Grok Build y Muse Code caducan a los 7 días. En las guías de cada agente, más abajo, está lo que ofrece cada uno.',
            '<strong>cron con un comando sin interfaz.</strong> Casi todos los CLI pueden ejecutar un prompt y salir (por ejemplo <code>claude -p</code> o <code>codex exec</code>). cron lo lanza a la hora que digas. Es gratis y local, pero lo que obtienes es un log, no una conversación.',
            '<strong>Conversaciones programadas de CodeAgentSwarm.</strong> Una tarea programada es un proyecto, un agente, un prompt y una regla de repetición. Cuando llega la hora, el prompt va al agente en tu ordenador, en un Chat normal que puedes leer y continuar. La misma configuración para todos los agentes.',
          ],
        },
        {
          type: 'video',
          src: '/videos/features/scheduled-conversations.mp4',
          poster: '/videos/features/scheduled-conversations-poster.webp',
          caption: 'Captura real de CodeAgentSwarm 2.5.0: una tarea diaria a las 21:00 para Codex y la ejecución llegando a su Chat.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Programador nativo, cron o CodeAgentSwarm',
      content: [
        {
          type: 'table',
          headers: ['', 'Programador nativo', 'cron + CLI sin interfaz', 'CodeAgentSwarm'],
          rows: [
            ['Dónde se ejecuta', 'Depende del agente: Cursor y Devin en su nube; Claude Desktop y la app de escritorio de ChatGPT con tareas locales; Cline a través de su hub', 'En tu ordenador', 'En tu ordenador, en la carpeta del proyecto'],
            ['Agentes', 'Solo el de ese proveedor', 'Cualquier CLI con modo sin interfaz', 'Los 12 agentes soportados'],
            ['Resultado', 'Una sesión o un PR en la app del proveedor', 'Texto en un log', 'Un Chat que puedes leer, responder y continuar'],
            ['Ordenador apagado a esa hora', 'Las de la nube siguen; las locales esperan o se saltan', 'Esa ejecución se pierde', 'Una ejecución tardía al abrir la app (opcional)'],
            ['Cambiarlo desde el móvil', 'Depende del proveedor', 'No', 'Sí, en la pestaña Scheduled'],
          ],
        },
        {
          type: 'paragraph',
          text: 'No se excluyen. Una rutina en la nube es lo adecuado para trabajo que tiene que hacerse con el portátil cerrado. CodeAgentSwarm es para trabajo que necesita tus archivos locales, tus herramientas y tus CLI con sesión iniciada, y que quieres leer como cualquier otra conversación.',
        },
      ],
    },
    {
      id: 'agentes',
      title: 'Guía de programación para cada agente',
      content: [
        {
          type: 'paragraph',
          text: 'Cada guía revisa qué ofrece el agente por su cuenta, según su documentación oficial, y explica cómo programarlo en CodeAgentSwarm.',
        },
        {
          type: 'table',
          headers: ['Agente', 'Programación propia', 'Guía'],
          rows: [
            ['Claude Code', 'Sí: tareas en la nube (<code>/schedule</code>), tareas locales en Claude Desktop y <code>/loop</code> en la sesión', link('/es/guias/tareas-programadas-claude-code', 'Programar Claude Code')],
            ['Codex', 'Sí: tareas programadas en la app de ChatGPT, no en el CLI', link('/es/guias/tareas-programadas-codex', 'Tareas programadas de Codex')],
            ['Cline', 'Sí: <code>cline schedule</code> en el CLI', link('/es/guias/tareas-programadas-cline', 'Programar Cline')],
            ['Cursor Agent', 'Automations, como agentes en la nube; no en el CLI', link('/es/guias/tareas-programadas-cursor-agent', 'Programar Cursor Agent')],
            ['Devin CLI', 'Automations en Devin en la nube; no en el CLI', link('/es/guias/tareas-programadas-devin-cli', 'Programar Devin CLI')],
            ['GitHub Copilot CLI', '<code>/every</code> experimental dentro de la sesión; GitHub Actions', link('/es/guias/tareas-programadas-github-copilot-cli', 'Programar Copilot CLI')],
            ['Kimi Code', 'Herramientas cron solo dentro de la sesión', link('/es/guias/tareas-programadas-kimi-code', 'Programar Kimi Code')],
            ['Grok Build', '<code>/loop</code>, caduca a los 7 días', link('/es/guias/tareas-programadas-grok-build', 'Programar Grok Build')],
            ['Muse Code', '<code>/loop</code>, caduca a los 7 días', link('/es/guias/tareas-programadas-muse-code', 'Programar Muse Code')],
            ['Antigravity CLI', '<code>/schedule</code> dentro de la conversación; sidecars programados documentados para la app de Antigravity', link('/es/guias/tareas-programadas-antigravity-cli', 'Programar Antigravity CLI')],
            ['opencode', 'Nada en el CLI; GitHub Action con disparador schedule', link('/es/guias/tareas-programadas-opencode', 'Programar opencode')],
            ['Pi', 'No trae', link('/es/guias/tareas-programadas-pi-coding-agent', 'Programar Pi')],
          ],
          caption: 'Revisado en la documentación oficial el 31-10-2026. "Dentro de la sesión" o "de la conversación" significa que la programación pertenece a esa sesión.',
        },
      ],
    },
    {
      id: 'configurar',
      title: 'Crear una tarea programada en CodeAgentSwarm',
      content: [
        {
          type: 'list',
          items: [
            'Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. En cualquier Chat, el menú de enviar también tiene <strong>Schedule this prompt…</strong>, que parte del prompt que ya has escrito.',
            'Elige el <strong>Project</strong> y el <strong>Agent</strong>. Modelo, razonamiento y permisos son opcionales y usan las mismas opciones que el Chat; si los dejas en Default, se usan los del agente.',
            'Escribe el <strong>Prompt</strong>: lo que el agente debe hacer en cada ejecución. El nombre es opcional; si no lo pones, se usan las primeras palabras del prompt.',
            'Configura <strong>When</strong>: <em>When I run it</em>, <em>At set times</em> o <em>Every few hours</em>, y los días.',
            'Elige <strong>How it runs</strong> (Visible o Headless) y qué hace <strong>Each run</strong> (seguir la misma conversación o empezar una nueva), y pulsa <strong>Create schedule</strong>.',
          ],
        },
        {
          type: 'image',
          src: '/images/guides/schedule-agent-picker.webp',
          alt: 'Editor New Scheduled Conversation con la lista de agentes abierta: Claude Code, Codex CLI, Antigravity CLI, opencode, Kimi Code',
          caption: 'La lista muestra todos los agentes instalados en ese ordenador.',
          size: 'full',
        },
      ],
    },
    {
      id: 'repeticion',
      title: 'Cuándo se repite: horas fijas, cada pocas horas o a mano',
      content: [
        {
          type: 'table',
          headers: ['Opción', 'Qué hace'],
          rows: [
            ['When I run it', 'Nunca arranca sola. Sirve para un prompt que lanzas tú con <strong>Run now</strong>.'],
            ['At set times', 'Hasta 24 horas al día (formato 24 horas, como 07:30 y 21:00) los días que elijas.'],
            ['Every few hours', 'Cada 1, 2, 3, 4, 6, 8 o 12 horas los días que elijas.'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Para los días hay tres atajos, <strong>Every day</strong>, <strong>Weekdays</strong> y <strong>Weekends</strong>, y un botón por cada día. Antes de guardar, el editor enseña las tres próximas ejecuciones, así compruebas que la regla hace lo que querías.',
        },
        {
          type: 'image',
          src: '/images/guides/schedule-editor-times.webp',
          alt: 'Editor de la tarea en At set times, Every day, 21:00, con las próximas ejecuciones y Visible seleccionado',
          caption: 'Todos los días a las 21:00. Las próximas ejecuciones aparecen debajo de las horas.',
          size: 'full',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Las horas son las del reloj del ordenador que ejecuta el agente. Si editas una tarea desde el móvil en otra zona horaria, la pestaña Scheduled te indica qué reloj usan.',
        },
      ],
    },
    {
      id: 'visible-headless',
      title: 'Visible o en segundo plano, seguir o empezar de cero',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Visible</strong> abre un agente con el prompt, como una sesión que hubieras empezado tú. Si ese agente ya está abierto y libre, el prompt le llega directamente; nunca abre una segunda copia.',
            '<strong>Headless</strong> se ejecuta sin pestaña. El resultado aparece en la ventana Scheduled, y <strong>Open as agent</strong> lo convierte en una sesión normal cuando quieras seguir.',
            '<strong>Continue the same conversation</strong> manda cada ejecución al mismo hilo, así el agente recuerda lo de ayer. Si cambias de agente, modelo, razonamiento o permisos, la siguiente ejecución empieza una conversación nueva en vez de alimentar una sesión antigua con la configuración antigua.',
            '<strong>Start a new conversation</strong> da a cada ejecución un contexto limpio.',
          ],
        },
        {
          type: 'image',
          src: '/images/guides/schedule-run-chat.webp',
          alt: 'Chat de Codex con un separador Schedule, el prompt y la respuesta del agente con las tareas pendientes',
          caption: 'Una ejecución visible: el Chat la marca como programada (primera vez o de nuevo) y puedes responder como siempre.',
          size: 'full',
        },
      ],
    },
    {
      id: 'perdidas-ocupado',
      title: 'Qué pasa si la app está cerrada o el agente sigue trabajando',
      content: [
        {
          type: 'list',
          items: [
            '<strong>If missed, run when the app opens</strong> (activado por defecto). Si una hora pasó con la app cerrada o el ordenador en reposo, se ejecuta una vez, marcada como tardía. Una semana fuera da una ejecución tardía, no siete.',
            'Si lo desactivas, las horas perdidas se saltan y la tarea espera a la siguiente.',
            '<strong>Skip if still working</strong> (activado por defecto). Si la ejecución anterior sigue trabajando, esa hora se salta. Si lo desactivas, el prompt espera en la cola del agente. <strong>Run now</strong> siempre se pone en cola.',
            '<strong>Git Worktree</strong> da a cada agente nuevo su propio worktree, así una tarea programada no toca la copia en la que estás trabajando.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Las tareas se ejecutan en tu ordenador, no en la nube. CodeAgentSwarm tiene que estar abierto y el ordenador despierto a esa hora; si no, la opción de ejecución tardía se pone al día cuando vuelves.',
        },
      ],
    },
    {
      id: 'agentes-movil',
      title: 'Que un agente o tu móvil gestionen las tareas',
      content: [
        {
          type: 'paragraph',
          text: 'Los agentes tienen cuatro herramientas en el servidor MCP de CodeAgentSwarm: <code>list_schedules</code>, <code>save_schedules</code>, <code>run_schedule</code> y <code>delete_schedules</code>. Pídeselo con tus palabras y el agente crea o cambia la tarea; solo toca tareas cuando tú se lo pides. Swarmi, el asistente de la app, usa las mismas herramientas.',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Crea una tarea programada para este proyecto: de lunes a viernes\na las 08:30, Codex revisa los fallos de CI de ayer y abre una tarea\npor cada uno. Visible, siguiendo la misma conversación.',
        },
        {
          type: 'paragraph',
          text: 'La app móvil de CodeAgentSwarm tiene una pestaña <strong>Scheduled</strong> para cada ordenador conectado. Desde ahí ves las tareas, las editas, las pausas, pulsas Run now y abres la conversación de cada ejecución.',
        },
        {
          type: 'image',
          src: '/images/guides/scheduled-window.webp',
          alt: 'Ventana Scheduled con las tareas agrupadas por proyecto, las próximas ejecuciones, Run now y Edit',
          caption: 'La ventana Scheduled: tareas por proyecto, próximas ejecuciones y estado de cada una.',
          size: 'full',
        },
      ],
    },
    {
      id: 'ideas',
      title: 'Trabajos que encajan bien en una tarea programada',
      content: [
        {
          type: 'list',
          items: [
            'De lunes a viernes a las 08:30: leer el feedback o los issues nuevos y crear una tarea por cada uno en el tablero.',
            'Cada 6 horas: pasar los tests y explicar cualquier fallo nuevo.',
            'Cada noche: revisar actualizaciones y avisos de seguridad de las dependencias, sin cambiar archivos.',
            'Los domingos a las 10:00: limpiar cachés de compilación y contar qué se ha borrado.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Empieza en solo lectura. Mira dos o tres ejecuciones y, si te fías del resultado, dale más permisos. Combina la tarea con las ' + link('/es/guias/notificaciones-codeagentswarm', 'notificaciones') + ' para enterarte cuando una ejecución necesita respuesta, y con ' + link('/es/guias/git-worktrees-para-agentes-de-ia', 'Git worktrees') + ' cuando toque código.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedo poner un agente de IA en cron?',
      answer: 'Sí. Casi todos los CLI de agentes tienen un modo sin interfaz que ejecuta un prompt y sale, y cron puede lanzarlo. Obtienes un log, no una conversación. CodeAgentSwarm te da la programación y además un Chat que puedes continuar.',
    },
    {
      question: '¿CodeAgentSwarm ejecuta las tareas con el ordenador apagado?',
      answer: 'No. Se ejecutan en tu ordenador mientras CodeAgentSwarm está abierto. Con "If missed, run when the app opens" activado, una hora perdida se ejecuta una vez al abrir la app.',
    },
    {
      question: '¿Qué agentes puedo programar en CodeAgentSwarm?',
      answer: 'Los 12 que soporta: Claude Code, Codex, Antigravity CLI, opencode, Kimi Code, Grok Build, Cursor Agent, Pi, Devin CLI, Muse Code, Cline y GitHub Copilot CLI.',
    },
    {
      question: '¿Cada cuánto puede ejecutarse una tarea?',
      answer: 'Hasta 24 horas fijas al día los días que elijas, o cada 1, 2, 3, 4, 6, 8 o 12 horas. Una tarea manual solo se ejecuta cuando pulsas Run now.',
    },
    {
      question: '¿Qué pasa si la ejecución anterior sigue trabajando?',
      answer: 'Por defecto esa hora se salta. Si desactivas "Skip if still working", el nuevo prompt espera en la cola del agente.',
    },
  ],
}

export default guide
