import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'interfaz-grafica-codex',
    locale: 'es',
    title: 'Interfaz gráfica para Codex: una app de escritorio visual para OpenAI Codex CLI',
    metaTitle: 'Interfaz gráfica para Codex CLI: app de escritorio (2026)',
    metaDescription: 'Una interfaz gráfica para Codex es una app de escritorio sobre OpenAI Codex CLI. CodeAgentSwarm le da a Codex un workspace visual, tablero, diffs y avisos.',
    intro: 'CodeAgentSwarm es una app independiente para trabajar con Codex en macOS y Windows. Puedes abrir sesiones en Chat o terminal, consultar conversaciones guardadas y revisar los cambios del proyecto desde una ventana.\n\nUsa tu cuenta de Codex. La descarga de CodeAgentSwarm no incluye acceso a modelos ni sustituye la facturación del proveedor. Esta guía explica cuándo te ayuda una interfaz gráfica y cómo empezar con tu proyecto.',
    ctaText: 'Abre tu proyecto y crea una sesión de Codex en CodeAgentSwarm. Revisa una tarea y sus cambios antes de añadir más agentes. La app está disponible para macOS y Windows.',
    ctaAgent: 'codex',
    highlightedWords: [
      'interfaz gráfica para Codex',
      'app de escritorio',
    ],
    publishedAt: '2026-07-13',
    updatedAt: '2026-09-25',
    alternateSlug: 'codex-gui',
  },
  sections: [
    {
      id: 'what-is-a-codex-gui',
      title: 'Cuándo usar una interfaz gráfica para Codex',
      content: [
        {
          type: 'paragraph',
          text: 'Si buscas un comando o quieres continuar una única sesión, puedes hacerlo desde Codex CLI. CodeAgentSwarm resulta útil cuando quieres ver varias sesiones, cambiar de proyecto o encontrar una conversación entre distintos agentes. Es una aplicación independiente. Para la interfaz de escritorio de OpenAI, consulta la <a href="https://learn.chatgpt.com/docs/developer-commands" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de codex app</a>.',
        },
        {
          type: 'table',
          headers: [
            'Tu objetivo',
            'Por dónde empezar',
          ],
          rows: [
            [
              'Ejecutar una tarea en el terminal',
              'Usa Codex CLI con el proyecto y los permisos adecuados.',
            ],
            [
              'Supervisar varias sesiones',
              '<a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Configura varias sesiones de Codex</a>',
            ],
            [
              'Encontrar y continuar una conversación',
              '<a href="/es/guias/historial-conversaciones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Consulta la guía de historial</a>',
            ],
            [
              'Empezar desde Windows',
              '<a href="/es/guias/codex-cli-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Revisa la configuración de Codex en Windows</a>',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Para probar la app, descarga CodeAgentSwarm con el botón de esta página, abre tu proyecto y elige Codex al crear una sesión. Usa Chat para una conversación integrada o el terminal si prefieres la interfaz de la CLI.',
        },
      ],
    },
    {
      id: 'what-you-get-in-the-gui',
      title: 'Qué puedes hacer en CodeAgentSwarm',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'visual-workspace',
          text: 'Ver sesiones independientes',
        },
        {
          type: 'paragraph',
          text: 'Cada sesión puede trabajar en una tarea o proyecto. Puedes consultar sus títulos y estados desde la cuadrícula o la lista, y abrir la conversación que necesita tu atención. Si dos tareas modifican los mismos archivos, prepara worktrees separados.',
        },
        {
          type: 'image',
          src: '/images/guides/parallel-workspace-codex.webp',
          alt: 'Sesiones de Codex en Chat y terminal dentro de CodeAgentSwarm',
          caption: 'Una ventana con varias tareas de Codex. Cada sesión conserva sus propios controles.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'task-board',
          text: 'Organizar tareas',
        },
        {
          type: 'paragraph',
          text: 'El tablero permite organizar el trabajo. Con el MCP de CodeAgentSwarm configurado, puedes pedir al agente que consulte y actualice las tareas correspondientes. Comprueba el resultado antes de dar una tarea por cerrada.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'searchable-history',
          text: 'Buscar conversaciones',
        },
        {
          type: 'paragraph',
          text: 'Busca texto en las conversaciones guardadas y filtra por proyecto o agente. Abre el resultado para recuperar el contexto. Codex también tiene comandos propios de reanudación; la app añade una vista compartida entre agentes.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'live-diffs',
          text: 'Revisar cambios',
        },
        {
          type: 'paragraph',
          text: 'Revisa los archivos modificados y el diff del proyecto antes de hacer commit. Las sesiones que comparten una carpeta también comparten sus archivos: abrir dos chats no separa sus cambios automáticamente.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'notifications',
          text: 'Atender avisos',
        },
        {
          type: 'paragraph',
          text: 'Usa las notificaciones y los estados de las sesiones para volver a una conversación cuando necesita respuesta. Revisa los permisos de notificación del sistema si no recibes avisos.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'permission-controls',
          text: 'Elegir los permisos',
        },
        {
          type: 'paragraph',
          text: 'Comprueba el modo de permisos de cada sesión. Turbo Mode en el terminal de Codex omite aprobaciones y sandbox; no añade un bloqueo automático de comandos peligrosos. La guía de <a href="/es/guias/modo-yolo-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex YOLO y sandbox</a> explica las opciones.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'shortcuts-marketplace',
          text: 'Configurar proyectos y herramientas',
        },
        {
          type: 'paragraph',
          text: 'Guarda los proyectos que usas y añade las skills o conexiones MCP que necesites. Las herramientas externas pueden requerir su propia configuración y cuenta.',
        },
      ],
    },
    {
      id: 'codex-cli-vs-codex-gui',
      title: 'Codex CLI o interfaz gráfica',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'cli-strengths',
          text: 'Una tarea desde el terminal',
        },
        {
          type: 'paragraph',
          text: 'La CLI ofrece conversación, ejecución de comandos y reanudación de sesiones. Si ese flujo ya te funciona, puedes seguir utilizándolo. No necesitas una app adicional para activar las opciones de Codex.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'cli-pain',
          text: 'Varios proyectos y agentes',
        },
        {
          type: 'paragraph',
          text: 'Cuando alternas entre tareas, una vista compartida te ayuda a encontrar la conversación correcta y comprobar qué está pendiente. Ese es el motivo para probar CodeAgentSwarm con trabajo real.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'gui-adds',
          text: 'Probarlo con una tarea conocida',
        },
        {
          type: 'paragraph',
          text: 'Empieza con un proyecto que conozcas y una tarea pequeña. Comprueba cómo se ven los mensajes, dónde encuentras el historial y cómo revisas el diff. Añade una segunda sesión cuando tengas claro el recorrido.',
        },
      ],
    },
    {
      id: 'codex-gui-download',
      title: 'Descargar y configurar CodeAgentSwarm para Codex',
      content: [
        {
          type: 'list',
          items: [
            'Descarga el instalador de CodeAgentSwarm para tu sistema con el botón de esta página. En el móvil puedes enviarte el enlace por email.',
            'Instala la app y abre o añade la carpeta de tu proyecto.',
            'Crea una sesión, selecciona Codex y elige Chat o terminal.',
            'Completa la configuración y el inicio de sesión de Codex si todavía faltan. Usa tu cuenta del proveedor.',
            'Comprueba los permisos, envía una tarea pequeña y revisa los cambios antes de continuar.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La app pública está disponible para macOS y Windows. El acceso a modelos y sus límites dependen de tu cuenta de Codex. CodeAgentSwarm no incluye una suscripción de OpenAI.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es una interfaz gráfica de Codex?',
      answer: 'Es una interfaz visual para trabajar con Codex. CodeAgentSwarm ofrece Chat, terminales, historial y revisión de cambios del proyecto en una app independiente para macOS y Windows.',
    },
    {
      question: '¿CodeAgentSwarm es la app oficial de OpenAI?',
      answer: 'No. Es una aplicación independiente que integra Codex junto con otros agentes. Usa tu cuenta del proveedor y no incluye acceso adicional a modelos.',
    },
    {
      question: '¿Puedo usar CodeAgentSwarm con Codex en Windows?',
      answer: 'Sí. Descarga el instalador de Windows, abre tu proyecto, selecciona Codex y completa su configuración e inicio de sesión.',
    },
    {
      question: '¿Hay una versión de CodeAgentSwarm para Linux?',
      answer: 'La app pública de CodeAgentSwarm está disponible para macOS y Windows. Para usar Codex en Linux, consulta sus opciones nativas.',
    },
    {
      question: '¿Tengo que usar Turbo Mode?',
      answer: 'No. Puedes trabajar con los permisos normales. Turbo Mode del terminal de Codex omite aprobaciones y sandbox, y no es necesario para abrir varias sesiones.',
    },
    {
      question: '¿Puedo usar mi cuenta de Codex?',
      answer: 'Sí. Usa tu cuenta de Codex y los límites que te correspondan. CodeAgentSwarm no sustituye el acceso ni la facturación del proveedor.',
    },
  ],
}

export default guide
