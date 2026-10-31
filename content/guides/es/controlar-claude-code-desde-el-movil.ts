import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'controlar-claude-code-desde-el-movil',
    locale: 'es',
    title: 'Cómo controlar Claude Code desde el móvil',
    metaTitle: 'Controlar Claude Code desde el móvil: 2 formas que funcionan',
    metaDescription: 'Controla Claude Code desde el móvil con Remote Control de Anthropic o con la app de CodeAgentSwarm. Pasos, requisitos y qué puedes hacer con cada una.',
    intro: `Lanzas una tarea larga en Claude Code y te tienes que ir de la mesa. El trabajo no tiene por qué parar. Hay dos formas de seguir llevando esa sesión desde el móvil mientras Claude Code sigue corriendo en tu ordenador, con tus archivos, tus herramientas y tus servidores MCP.\n\nLa primera es Remote Control, que Anthropic incluye en Claude Code. La segunda es la app de CodeAgentSwarm para el móvil, que se empareja con la app de escritorio de CodeAgentSwarm y además cubre Codex y el resto de agentes que uses ahí. En esta guía tienes cómo se configura cada una y cuándo encaja mejor.`,
    ctaText: 'Empareja el móvil con CodeAgentSwarm una vez y sigue todas tus sesiones de Claude Code desde la app de App Store, la beta de Android o la app web.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'móvil'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'control-claude-code-from-phone',
    relatedSlug: 'app-movil-claude-code',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta',
      content: [
        {
          type: 'paragraph',
          text: 'En las dos opciones el móvil hace de mando. Claude Code sigue corriendo en tu ordenador, así que el ordenador tiene que estar encendido y despierto. Elige según dónde trabajes ya:',
        },
        {
          type: 'list',
          items: [
            '<strong>Remote Control</strong>: usas Claude Code en un terminal y tienes un plan Pro, Max, Ultra, Team o Enterprise. Llevas la sesión desde la pestaña Code de la app de Claude.',
            '<strong>App de CodeAgentSwarm</strong>: usas varios agentes en CodeAgentSwarm (Claude Code, Codex, OpenCode y otros) y quieres tenerlos todos en el móvil, en una sola lista.',
          ],
        },
      ],
    },
    {
      id: 'remote-control',
      title: 'Opción 1: Remote Control de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: `<a href="https://code.claude.com/docs/en/remote-control" ${EXT}>Remote Control</a>, de Anthropic, conecta la app de Claude para iOS y Android, o claude.ai/code en un navegador, con una sesión de Claude Code en tu máquina. El código se ejecuta y los archivos se leen en local.`,
        },
        { type: 'heading', level: 3, id: 'requisitos-remote-control', text: 'Requisitos' },
        {
          type: 'list',
          items: [
            'Un plan Pro, Max, Ultra, Team o Enterprise. Con clave de API no funciona.',
            'En Team y Enterprise, un Owner tiene que activar antes Remote Control en los ajustes de administración de Claude Code.',
            'Claude Code con sesión iniciada en claude.ai (ejecuta <code>/login</code> si no la tienes).',
          ],
        },
        { type: 'heading', level: 3, id: 'iniciar-remote-control', text: 'Arrancar una sesión' },
        {
          type: 'paragraph',
          text: 'Ejecuta uno de estos comandos en el ordenador. El primero arranca un servidor que puede alojar varias sesiones; el segundo abre una sesión interactiva normal con Remote Control activado; el comando con barra lo activa en una sesión que ya tienes abierta.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude remote-control\n\n# o una sesión interactiva con Remote Control activado\nclaude --remote-control\n\n# o, dentro de una sesión en marcha\n/remote-control',
        },
        {
          type: 'paragraph',
          text: 'Después escanea el código QR que muestra el terminal, o abre la app de Claude, toca <strong>Code</strong> y elige la sesión de la lista.',
        },
        { type: 'heading', level: 3, id: 'limites-remote-control', text: 'Límites que conviene saber' },
        {
          type: 'list',
          items: [
            'Si cierras el terminal o paras el proceso <code>claude</code>, la sesión se queda sin conexión.',
            'Fuera del modo servidor, cada proceso de Claude Code admite una sola sesión remota a la vez.',
            'Desde el móvil puedes elegir los modos de permisos Manual, Accept edits, Plan o Auto, pero no Bypass permissions.',
            'Los comandos que solo existen en el terminal, como <code>/plugin</code> y <code>/resume</code>, no funcionan desde la app.',
          ],
        },
      ],
    },
    {
      id: 'app-codeagentswarm',
      title: 'Opción 2: la app de CodeAgentSwarm para el móvil',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para macOS, Windows y Linux que ejecuta tus agentes de programación uno al lado del otro. Su app para el móvil se empareja con esa app de escritorio, así que cada sesión que tengas abierta ahí aparece en el teléfono. Claude Code sigue corriendo en tu ordenador con la cuenta que ya tiene.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm para iPhone y Apple Watch en App Store',
          src: '/og-app-store.png',
          caption: 'La app de CodeAgentSwarm está en App Store para iPhone y Apple Watch. Android está en beta.',
          size: 'medium',
        },
        { type: 'heading', level: 3, id: 'descargar-app', text: 'Descarga la app' },
        {
          type: 'list',
          items: [
            `iPhone y Apple Watch: <a href="https://apps.apple.com/app/codeagentswarm/id6801180696" ${EXT}>CodeAgentSwarm en App Store</a>.`,
            `Android: en beta. Pide acceso en el <a href="https://discord.com/channels/1444798143672750164/1540046825938096140" ${EXT}>canal #mobile-relay-beta de Discord</a>.`,
            `Cualquier otro dispositivo: la app web en <a href="https://web.codeagentswarm.com" ${EXT}>web.codeagentswarm.com</a>.`,
          ],
        },
        { type: 'heading', level: 3, id: 'emparejar-movil', text: 'Empareja el móvil (una vez)' },
        {
          type: 'list',
          items: [
            'Abre CodeAgentSwarm en el ordenador e inicia sesión.',
            'Abre el menú de la cuenta y elige <strong>Connect a device</strong>. Aparecen un código QR y un código de un solo uso.',
            'Escanea el QR con el móvil. Desde un navegador, abre la app web y escribe el código de un solo uso.',
            'Comprueba que el mismo código de verificación sale en los dos dispositivos y acepta el móvil en el ordenador.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'En esa misma ventana, activa <strong>Keep this computer available</strong>. Evita que el ordenador se duerma mientras CodeAgentSwarm está abierto, para que el móvil pueda seguir llegando a él. La pantalla se puede bloquear igual.',
        },
      ],
    },
    {
      id: 'que-puedes-hacer',
      title: 'Qué puedes hacer desde el móvil',
      content: [
        {
          type: 'paragraph',
          text: 'Una vez emparejado, el móvil muestra tus sesiones agrupadas por proyecto, con el estado de cada una. Desde ahí puedes:',
        },
        {
          type: 'list',
          items: [
            'Abrir una sesión, leer lo que ha hecho Claude Code y mandar el siguiente mensaje.',
            'Contestar una pregunta o una aprobación que el agente está esperando.',
            'Abrir una sesión nueva con Claude Code, Codex u otro agente en uno de los proyectos de tu ordenador.',
            'Adjuntar fotos de la cámara o la galería, dibujar encima antes de enviarlas, o adjuntar archivos.',
            'Dictar un mensaje: la nota de voz se convierte en texto que puedes corregir antes de enviar.',
            'Recibir un aviso en iPhone o Android cuando una sesión te necesita y abrir esa conversación con un toque.',
          ],
        },
        {
          type: 'paragraph',
          text: `El móvil sirve sobre todo para esos momentos en los que un agente se para a preguntarte algo. En el ordenador, las <a href="/es/guias/notificaciones-codeagentswarm" ${A}>notificaciones de CodeAgentSwarm</a> hacen lo mismo mientras estás en la mesa.`,
        },
      ],
    },
    {
      id: 'cual-usar',
      title: '¿Cuál te conviene?',
      content: [
        {
          type: 'table',
          headers: ['', 'Remote Control', 'App de CodeAgentSwarm'],
          rows: [
            ['App en el móvil', 'App de Claude (pestaña Code)', 'CodeAgentSwarm para iPhone, beta de Android, web'],
            ['Agentes', 'Claude Code', 'Claude Code, Codex, OpenCode y el resto de agentes de CodeAgentSwarm'],
            ['Dónde corre el agente', 'En tu ordenador', 'En tu ordenador'],
            ['Cuenta', 'Plan de claude.ai (sin claves de API)', 'Cuenta de CodeAgentSwarm; cada agente usa su propio login'],
            ['Varias sesiones', 'Modo servidor, o una por proceso', 'Todas las sesiones abiertas, de todos los proyectos'],
          ],
        },
        {
          type: 'paragraph',
          text: `Si solo usas Claude Code en un terminal, Remote Control ya lo tienes. Si llevas varias sesiones o varios agentes a la vez, la app de CodeAgentSwarm te los junta en una lista. Para ver todas las opciones de móvil alrededor de Claude Code, incluidas las sesiones en la nube, lee <a href="/es/guias/app-movil-claude-code" ${A}>app móvil de Claude Code: qué existe</a>.`,
        },
      ],
    },
    {
      id: 'seguridad',
      title: '¿Es seguro?',
      content: [
        {
          type: 'paragraph',
          text: 'Con CodeAgentSwarm, el móvil y el ordenador hablan a través de un relay con cifrado de extremo a extremo. El relay mueve los mensajes, pero no puede leer tus conversaciones, comandos ni aprobaciones. No hace falta abrir puertos en el router ni estar en la misma wifi.',
        },
        {
          type: 'paragraph',
          text: 'Cada móvil nuevo necesita tu aprobación en el ordenador, y puedes desconectar un móvil desde esa misma ventana cuando quieras.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedo controlar Claude Code desde el móvil?',
      answer: 'Sí. Usa Remote Control en la app de Claude (ejecuta claude remote-control en el ordenador y abre la pestaña Code), o empareja la app de CodeAgentSwarm con CodeAgentSwarm en tu ordenador. En los dos casos Claude Code sigue corriendo en tu ordenador.',
    },
    {
      question: '¿El ordenador tiene que seguir encendido?',
      answer: 'Sí. El móvil solo manda mensajes a la sesión. Si el ordenador se duerme o la sesión se para, el móvil no llega a ella. CodeAgentSwarm tiene un interruptor Keep this computer available que evita que se duerma mientras la app está abierta.',
    },
    {
      question: '¿Remote Control funciona con una clave de API?',
      answer: 'No. Anthropic documenta Remote Control para los planes Pro, Max, Ultra, Team y Enterprise, y las claves de API no son compatibles.',
    },
    {
      question: '¿Hay versión de Android de la app de CodeAgentSwarm?',
      answer: 'Sí, en beta. Pide acceso en el canal #mobile-relay-beta del Discord de CodeAgentSwarm. También puedes usar la app web en web.codeagentswarm.com desde cualquier navegador.',
    },
    {
      question: '¿También puedo controlar Codex desde el móvil?',
      answer: 'Con CodeAgentSwarm, sí: las sesiones de Codex aparecen junto a las de Claude Code. En la guía de la app móvil de Codex tienes las opciones que ofrece OpenAI.',
    },
  ],
}

export default guide
