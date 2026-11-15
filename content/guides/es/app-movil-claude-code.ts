import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'app-movil-claude-code',
    locale: 'es',
    title: 'App móvil de Claude Code: qué existe y cuál usar',
    metaTitle: 'App móvil de Claude Code: qué existe y cuál usar (2026)',
    metaDescription: '¿Hay app móvil de Claude Code? Qué hace la pestaña Code de la app de Claude, sesiones en la nube frente a Remote Control y cuándo encaja CodeAgentSwarm.',
    intro: `Si buscas "Claude Code" en App Store, no vas a encontrar una app aparte. Anthropic mete Claude Code en el móvil dentro de la app normal de Claude, en una pestaña que se llama Code. Lo que puedes hacer ahí depende de dónde corre el trabajo: en la nube de Anthropic o en tu propio ordenador.\n\nEn esta guía tienes las opciones oficiales, con sus requisitos, y dónde encaja la app de CodeAgentSwarm para el móvil si usas Claude Code junto a otros agentes en tu ordenador.`,
    ctaText: 'Ejecuta Claude Code en CodeAgentSwarm en tu ordenador y lleva todas tus sesiones de Chat en el bolsillo con la app de CodeAgentSwarm para el móvil.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'App móvil'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'claude-code-mobile-app',
    relatedSlug: 'controlar-claude-code-desde-el-movil',
  },
  sections: [
    {
      id: 'hay-app',
      title: '¿Existe una app móvil de Claude Code?',
      content: [
        {
          type: 'paragraph',
          text: `No como app aparte. La documentación de <a href="https://code.claude.com/docs/en/mobile" ${EXT}>Claude Code en el móvil</a> lo dice claro: las sesiones en la nube y Remote Control están en la pestaña <strong>Code</strong> de la app de Claude para iOS y Android. La app es un cliente de sesiones de Claude Code. El código nunca se ejecuta en el teléfono.`,
        },
        {
          type: 'paragraph',
          text: 'Para instalarla, ejecuta <code>/mobile</code> en una sesión de Claude Code. Te enseña un código QR que abre la tienda de tu móvil. Inicia sesión con la misma cuenta de claude.ai que usas en Claude Code. Si no ves la pestaña Code, puede que tu plan o tu organización no la incluyan.',
        },
      ],
    },
    {
      id: 'opciones-oficiales',
      title: 'A qué se puede conectar la pestaña Code',
      content: [
        {
          type: 'table',
          headers: ['Opción', 'Dónde corre el trabajo', 'Para qué sirve'],
          rows: [
            ['Sesiones en la nube', 'Infraestructura en la nube de Anthropic', 'Repositorios en GitHub; la tarea sigue con el portátil cerrado'],
            ['Remote Control', 'Una sesión de Claude Code en tu ordenador', 'Trabajo que necesita tus archivos, herramientas o servidores MCP locales'],
            ['Dispatch', 'La app Claude Desktop en tu ordenador', 'Mandar una tarea y dejar que Dispatch decida cómo ejecutarla (Pro, Max o Ultra)'],
            ['Proyectos', 'La nube', 'Una línea de trabajo relacionada repartida en hilos paralelos'],
          ],
          caption: 'Fuente: Claude Code on mobile, documentación de Anthropic.',
        },
        {
          type: 'paragraph',
          text: 'Las sesiones en la nube y Remote Control necesitan una cuenta de claude.ai. No funcionan con una clave de API de Console ni a través de proveedores como Amazon Bedrock.',
        },
        { type: 'heading', level: 3, id: 'sesiones-nube', text: 'Sesiones en la nube' },
        {
          type: 'paragraph',
          text: 'Eliges un repositorio y una rama, describes la tarea y la envías. La sesión corre en la nube, así que sigue cuando guardas el móvil, y la puedes retomar después desde el portátil. Las sesiones en la nube y los proyectos son las opciones que siguen funcionando con el ordenador apagado.',
        },
        { type: 'heading', level: 3, id: 'remote-control', text: 'Remote Control' },
        {
          type: 'paragraph',
          text: `Arrancas <code>claude remote-control</code> en el ordenador y llevas esa sesión desde el móvil. Los archivos, las herramientas y los servidores MCP se quedan en tu máquina, y las fotos que adjuntas en la app llegan a la sesión local. Los pasos están en <a href="/es/guias/controlar-claude-code-desde-el-movil" ${A}>cómo controlar Claude Code desde el móvil</a>.`,
        },
        { type: 'heading', level: 3, id: 'limites', text: 'Límites de la app oficial' },
        {
          type: 'list',
          items: [
            'Los comandos que solo existen en el terminal, como <code>/plugin</code> y <code>/resume</code>, no funcionan desde la app.',
            'Desde la app no se puede elegir Bypass permissions. Las sesiones en la nube ofrecen Accept edits, Plan y Auto; Remote Control añade Manual.',
            'Dispatch no está disponible en los planes Team ni Enterprise.',
          ],
        },
      ],
    },
    {
      id: 'app-codeagentswarm',
      title: 'Dónde encaja la app de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para macOS, Windows y Linux en la que ejecutas Claude Code, Codex, OpenCode y otros agentes de programación uno al lado del otro. Su app para el móvil se empareja una vez con esa app de escritorio, con un código QR, y a partir de ahí muestra cada sesión que tengas abierta en la vista Chat.',
        },
        {
          type: 'image',
          alt: 'App de CodeAgentSwarm para el móvil, modo demo: sesiones de Chat agrupadas por proyecto con su estado',
          src: '/images/guides/phone-app-demo-sessions.webp',
          caption: 'App de CodeAgentSwarm para el móvil en modo demo, con datos de ejemplo. Tus sesiones de Chat, agrupadas por proyecto.',
          size: 'small',
        },
        {
          type: 'list',
          items: [
            'Tus sesiones de Chat en una lista, agrupadas por proyecto, con su estado.',
            'Responder, contestar preguntas y aprobaciones, y abrir sesiones nuevas en tus proyectos.',
            'Adjuntar fotos, dibujar encima, adjuntar archivos o dictar una nota de voz.',
            'Avisos en iPhone y Android cuando una sesión te necesita.',
            'Cifrado de extremo a extremo entre móvil y ordenador: el relay no puede leer tus conversaciones.',
          ],
        },
        {
          type: 'image',
          alt: 'App de CodeAgentSwarm para el móvil, modo demo: una respuesta de Codex y una pregunta esperando respuesta',
          src: '/images/guides/phone-app-demo-chat.webp',
          caption: 'Modo demo, datos de ejemplo: lees la respuesta y contestas la pregunta que el agente está esperando.',
          size: 'small',
        },
        {
          type: 'paragraph',
          text: `Descárgala en <a href="https://apps.apple.com/app/codeagentswarm/id6801180696" ${EXT}>App Store</a> (iPhone y Apple Watch), pide la beta de Android en el <a href="https://discord.com/channels/1444798143672750164/1540046825938096140" ${EXT}>canal #mobile-relay-beta de Discord</a> o abre <a href="https://web.codeagentswarm.com" ${EXT}>web.codeagentswarm.com</a> en cualquier navegador.`,
        },
      ],
    },
    {
      id: 'cual-usar',
      title: '¿Cuál te conviene?',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Vas a tener el ordenador apagado</strong>: sesiones en la nube o proyectos en la app de Claude.',
            '<strong>Usas una sesión de Claude Code en un terminal</strong>: Remote Control en la app de Claude.',
            '<strong>Usas varios agentes o muchas sesiones en tu ordenador</strong>: la app de CodeAgentSwarm, emparejada con CodeAgentSwarm.',
          ],
        },
        {
          type: 'paragraph',
          text: `¿También usas Codex? OpenAI tiene su propia opción dentro de la app de ChatGPT. La tienes en <a href="/es/guias/app-movil-codex" ${A}>app móvil de Codex</a>. Si buscas una interfaz de escritorio para Claude Code, mira <a href="/es/guias/interfaz-grafica-claude-code" ${A}>interfaz gráfica para Claude Code</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Hay una app de Claude Code para iPhone o Android?',
      answer: 'No como app aparte. Claude Code está en la pestaña Code de la app de Claude para iOS y Android. Desde ahí llegas a las sesiones en la nube y, con Remote Control, a las sesiones que corren en tu ordenador.',
    },
    {
      question: '¿Puedo programar desde el móvil con Claude Code?',
      answer: 'Puedes dar instrucciones y revisar resultados, pero el código se ejecuta en otro sitio: en las sesiones en la nube de Anthropic o en tu propio ordenador con Remote Control.',
    },
    {
      question: '¿La app móvil de Claude Code funciona con clave de API?',
      answer: 'No. Las sesiones en la nube y Remote Control requieren una cuenta de claude.ai y no funcionan con una clave de API de Console ni con proveedores como Amazon Bedrock.',
    },
    {
      question: '¿Qué es la app de CodeAgentSwarm para el móvil?',
      answer: 'Una compañera de la app de escritorio de CodeAgentSwarm. La emparejas una vez y desde ahí sigues y contestas todas las sesiones de agentes que usas en la vista Chat de tu ordenador, incluidos Claude Code y Codex. Las sesiones que cambias a la vista Terminal (CLI) no se ven desde el móvil. Está en App Store para iPhone, en beta para Android y como app web.',
    },
  ],
}

export default guide
