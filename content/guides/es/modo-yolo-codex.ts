import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-yolo-codex',
    locale: 'es',
    title: 'Modo YOLO de Codex CLI: comandos, aprobaciones y sandbox',
    metaTitle: 'Modo YOLO de Codex: --yolo, permisos y sandbox (2026)',
    metaDescription: 'Qué desactiva codex --yolo, cómo conservar el sandbox sin peticiones de aprobación y por qué el antiguo --full-auto depende de tu versión de Codex CLI.',
    intro: 'Codex acepta --yolo como alias de --dangerously-bypass-approvals-and-sandbox: desactiva las peticiones de aprobación y el sandbox. Si buscas que trabaje con menos interrupciones dentro del proyecto, configura el sandbox y las aprobaciones por separado.\n\nAquí tienes los comandos, qué pasa con el antiguo --full-auto y cómo supervisar varias sesiones desde CodeAgentSwarm. Una interfaz de escritorio no convierte un comando peligroso en uno seguro.',
    ctaText: 'Supervisa tus sesiones de Codex en CodeAgentSwarm: consulta qué necesita respuesta, busca conversaciones y revisa los cambios del proyecto. Descarga la app para macOS o Windows y usa tu cuenta de Codex.',
    ctaAgent: 'codex',
    highlightedWords: [
      'Codex CLI',
      'modo YOLO',
    ],
    publishedAt: '2026-06-07',
    updatedAt: '2026-09-25',
    alternateSlug: 'codex-yolo-mode',
  },
  sections: [
    {
      id: 'que-es-modo-yolo-codex',
      title: 'Comando de Codex YOLO y alternativa con sandbox',
      content: [
        {
          type: 'paragraph',
          text: 'Para trabajar dentro del proyecto y consultar las ampliaciones de permisos, inicia Codex con esta configuración explícita:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --sandbox workspace-write --ask-for-approval on-request "Revisa el proyecto y ejecuta los tests"',
        },
        {
          type: 'paragraph',
          text: 'Si necesitas una ejecución sin preguntas, puedes conservar el sandbox con <code>--ask-for-approval never</code>. Las operaciones bloqueadas no se convierten en peticiones de permiso: fallan.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --sandbox workspace-write --ask-for-approval never "Ejecuta los tests existentes"',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El comando <code>codex --yolo</code> también omite el sandbox. Resérvalo para un entorno aislado externamente, sin acceso a credenciales ni datos de producción. Una rama de Git no proporciona ese aislamiento.',
        },
        {
          type: 'paragraph',
          text: 'Si lo que necesitas es ver qué está haciendo Codex, la <a href="/es/guias/interfaz-grafica-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">interfaz gráfica de Codex</a> permite trabajar con varias conversaciones en una ventana. Para repartir tareas, sigue la guía de <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">varias sesiones de Codex</a>.',
        },
      ],
    },
    {
      id: 'que-hacen-los-modos',
      title: 'Qué hacen las aprobaciones, el sandbox y --full-auto',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'espectro-aprobaciones',
          text: 'Cuándo pregunta Codex',
        },
        {
          type: 'table',
          headers: [
            'Configuración',
            'Comportamiento',
          ],
          rows: [
            [
              '--sandbox workspace-write -a on-request',
              'Trabaja dentro de los límites configurados y puede pedir permiso para ampliarlos.',
            ],
            [
              '--sandbox workspace-write -a never',
              'Conserva los límites y no pide ampliaciones; las operaciones bloqueadas fallan.',
            ],
            [
              '--yolo',
              'Alias de --dangerously-bypass-approvals-and-sandbox. Omite ambas protecciones.',
            ],
            [
              '--full-auto',
              'Flag antiguo. Su disponibilidad depende de la versión y del subcomando.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'En Codex CLI 0.156.0 comprobamos que <code>codex --full-auto --help</code> rechaza el argumento, mientras que <code>codex --yolo --help</code> lo acepta. La referencia oficial de <code>codex exec</code> todavía describe <code>--full-auto</code> como compatibilidad obsoleta. Usa opciones explícitas y comprueba la ayuda del comando que vas a ejecutar.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --version\ncodex --help\ncodex exec --help',
        },
        {
          type: 'heading',
          level: 3,
          id: 'dial-sandbox',
          text: 'Qué limita el sandbox',
        },
        {
          type: 'paragraph',
          text: 'El sandbox limita los recursos a los que puede acceder el proceso. Las aprobaciones controlan las peticiones para actuar fuera de sus límites. Desactivar preguntas no implica por sí solo acceso completo. <code>workspace-write</code> permite modificar el área de trabajo; también puede permitir borrar archivos de esa área. Conserva una copia del trabajo importante.',
        },
        {
          type: 'paragraph',
          text: 'Fuentes verificadas el 25 de septiembre de 2026: <a href="https://learn.chatgpt.com/docs/developer-commands?surface=cli" class="text-neon-cyan hover:text-neon-purple transition-colors">referencia de comandos de OpenAI</a>; <a href="https://learn.chatgpt.com/docs/sandboxing" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación del sandbox</a>.',
        },
      ],
    },
    {
      id: 'riesgos-reales',
      title: 'Riesgos que siguen existiendo',
      content: [
        {
          type: 'list',
          items: [
            'Los archivos editables pueden sobrescribirse o borrarse aunque haya sandbox.',
            'Las credenciales, servicios y rutas accesibles determinan qué operaciones puede alcanzar un comando.',
            'Una rama separa el historial de Git, pero no aísla procesos, secretos ni servicios externos.',
            'Las instrucciones de AGENTS.md orientan al agente; no sustituyen restricciones de acceso.',
          ],
        },
      ],
    },
    {
      id: 'ejecutar-con-seguridad',
      title: 'Cómo supervisar Codex desde CodeAgentSwarm',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'metodo-flag-crudo',
          text: '1. Empieza con permisos acotados',
        },
        {
          type: 'paragraph',
          text: 'Abre el proyecto y selecciona Codex. Puedes usar Chat o el terminal. Comprueba el modo de permisos de esa sesión antes de enviar la tarea. En el terminal, usa las opciones de Codex que se explican al principio de esta guía.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'metodo-sandbox',
          text: '2. Revisa el trabajo de cada sesión',
        },
        {
          type: 'paragraph',
          text: 'Abre otra sesión para una tarea independiente, revisa los cambios del proyecto y consulta las conversaciones guardadas. Si ambas tareas van a editar los mismos archivos, utiliza <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">worktrees</a> para separar las copias de trabajo.',
        },
        {
          type: 'image',
          src: '/images/guides/parallel-workspace-codex.webp',
          alt: 'Cuatro sesiones de Codex en CodeAgentSwarm, con Chat y terminal en la misma cuadrícula',
          caption: 'Cada sesión tiene su tarea y sus controles. La captura ilustra la supervisión, no un aislamiento de seguridad.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'metodo-turbo-mode',
          text: '3. Comprueba qué implica Turbo Mode',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Turbo Mode en el terminal de Codex usa <code>--dangerously-bypass-approvals-and-sandbox</code>. No lo actives esperando que CodeAgentSwarm bloquee automáticamente un push o un borrado. La supervisión visual no restaura el sandbox que has desactivado.',
        },
        {
          type: 'paragraph',
          text: 'La <a href="/es/guias/interfaz-grafica-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">interfaz gráfica de Codex</a> explica cómo abrir la app, iniciar sesión y revisar el trabajo. CodeAgentSwarm se descarga por separado de Codex y usa tu cuenta del proveedor.',
        },
      ],
    },
    {
      id: 'buenas-practicas',
      title: 'Antes de dejar una tarea ejecutándose',
      content: [
        {
          type: 'list',
          items: [
            'Guarda el trabajo pendiente y revisa git status antes de empezar.',
            'Elige un proyecto y una tarea concretos. Evita credenciales de producción en el entorno de trabajo.',
            'Mantén el sandbox y comprueba los permisos efectivos de la sesión.',
            'Revisa el diff y ejecuta los tests antes de integrar o publicar los cambios.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Existe el flag codex --yolo?',
      answer: 'Sí. --yolo es un alias de --dangerously-bypass-approvals-and-sandbox. Omite las aprobaciones y el sandbox. Está pensado para entornos aislados externamente.',
    },
    {
      question: '¿Qué hace --full-auto en Codex?',
      answer: 'Es un flag antiguo. La referencia de codex exec lo marca como compatibilidad obsoleta; el comando interactivo de Codex CLI 0.156.0 que verificamos lo rechaza. Usa --sandbox workspace-write y elige la política de aprobación de forma explícita.',
    },
    {
      question: '¿Cómo ejecuto Codex sin preguntas y con sandbox?',
      answer: 'Usa codex --sandbox workspace-write --ask-for-approval never. Codex no pedirá ampliar permisos; una operación bloqueada fallará. Los archivos que sí sean editables siguen expuestos a cambios y borrados.',
    },
    {
      question: '¿Cuál es la diferencia entre sandbox y aprobaciones?',
      answer: 'El sandbox limita los recursos accesibles. La política de aprobación controla cuándo se pide permiso para ampliar ese acceso. Puedes conservar el sandbox aunque no quieras preguntas.',
    },
    {
      question: '¿Turbo Mode de CodeAgentSwarm bloquea comandos peligrosos de Codex?',
      answer: 'No debes asumirlo. El modo Turbo del terminal de Codex usa el flag que omite aprobaciones y sandbox. Usa los permisos normales si necesitas esas restricciones.',
    },
    {
      question: '¿Cómo superviso varias sesiones de Codex?',
      answer: 'CodeAgentSwarm ofrece sesiones independientes, historial de conversaciones y revisión de cambios del proyecto en una app para macOS y Windows. Configura los permisos de cada sesión y usa worktrees cuando debas separar archivos.',
    },
  ],
}

export default guide
