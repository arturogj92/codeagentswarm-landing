import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'app-movil-codex',
    locale: 'es',
    title: 'App móvil de Codex: cómo usar OpenAI Codex desde el móvil',
    metaTitle: 'App móvil de Codex: usa OpenAI Codex desde el móvil (2026)',
    metaDescription: 'Qué ofrece OpenAI para usar Codex en la app de ChatGPT, qué necesita y cómo llegar desde el móvil a las sesiones de Codex de tu ordenador.',
    intro: `OpenAI no tiene una app de Codex aparte para el móvil. Codex en el móvil vive dentro de la app de ChatGPT para iOS y Android, y se conecta a Codex Cloud o a un Mac o PC con Windows que tenga abierta la app de escritorio de ChatGPT.\n\nEso cubre a mucha gente. Lo que no cubre es Codex CLI en un terminal: la documentación de OpenAI dice que la conexión con el móvil no se puede configurar desde la CLI ni desde la extensión del IDE. En esta guía tienes primero la opción oficial y después cómo la app de CodeAgentSwarm para el móvil llega a las sesiones de Codex que corren en tu ordenador, sobre la Codex CLI que ya tienes instalada.`,
    ctaText: 'Ejecuta Codex en el Chat de CodeAgentSwarm en macOS, Windows o Linux y sigue todas tus sesiones de Codex desde la app de CodeAgentSwarm para el móvil.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex', 'App móvil'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'codex-mobile-app',
    relatedSlug: 'interfaz-grafica-codex',
  },
  sections: [
    {
      id: 'opcion-oficial',
      title: 'Lo que ofrece OpenAI: Codex en la app de ChatGPT',
      content: [
        {
          type: 'paragraph',
          text: `Según la página <a href="https://learn.chatgpt.com/docs/mobile" ${EXT}>Codex on mobile</a> de OpenAI, desde la app de ChatGPT para el móvil puedes empezar tareas, seguir su avance, mandar nuevas instrucciones, aprobar o rechazar comandos y revisar archivos cambiados, diffs y resultados de tests. Las tareas corren en Codex Cloud o en un ordenador conectado.`,
        },
        { type: 'heading', level: 3, id: 'configurar-oficial', text: 'Cómo se configura' },
        {
          type: 'list',
          items: [
            'En tu Mac o PC, abre la app de escritorio de ChatGPT y ve a <strong>Settings</strong> > <strong>Connections</strong> > <strong>Control this Mac or PC</strong>.',
            'Escanea el código QR con el móvil, inicia sesión con la misma cuenta y el mismo espacio de trabajo de ChatGPT y aprueba la conexión.',
            'En la app de ChatGPT, abre <strong>Codex</strong>, elige tu ordenador y empieza o continúa una tarea.',
          ],
        },
        { type: 'heading', level: 3, id: 'requisitos-oficial', text: 'Requisitos y límites' },
        {
          type: 'list',
          items: [
            'Acceso a Codex en tu cuenta y espacio de trabajo de ChatGPT, y la última versión de la app de ChatGPT en el móvil.',
            'El ordenador tiene que tener la app de escritorio de ChatGPT en macOS o Windows, y estar despierto, conectado y con la misma cuenta.',
            'Si usas Codex desde un espacio de trabajo, puede que tu administrador tenga que activar el acceso remoto. La disponibilidad depende del despliegue y de la configuración del espacio de trabajo.',
            `La página <a href="https://learn.chatgpt.com/docs/remote-connections" ${EXT}>Remote connections</a> de OpenAI dice que no se puede configurar desde Codex CLI ni desde la extensión del IDE, y no incluye Linux entre los equipos compatibles.`,
          ],
        },
      ],
    },
    {
      id: 'hueco-cli',
      title: 'Si usas Codex CLI en un terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Mucha gente usa Codex como CLI, a menudo junto a Claude Code, y a veces en Linux. En ese caso la opción oficial no aplica, porque empareja el móvil con la app de escritorio de ChatGPT, no con el comando <code>codex</code>.',
        },
        {
          type: 'paragraph',
          text: `CodeAgentSwarm cubre ese hueco. Es una app de escritorio para macOS, Windows y Linux en la que ejecutas Codex, Claude Code y otros agentes uno al lado del otro (mira <a href="/es/guias/interfaz-grafica-codex" ${A}>interfaz gráfica para Codex</a>). En su vista Chat, Codex funciona a través de la Codex CLI instalada en tu ordenador, con tu propia cuenta. La app para el móvil se empareja con CodeAgentSwarm, así que esas sesiones de Codex en Chat aparecen en el teléfono. Una sesión que cambias a la vista Terminal (CLI) no se ve desde el móvil hasta que la vuelves a poner en Chat.`,
        },
      ],
    },
    {
      id: 'app-codeagentswarm',
      title: 'Usa Codex desde la app de CodeAgentSwarm',
      content: [
        {
          type: 'image',
          alt: 'CodeAgentSwarm para iPhone y Apple Watch en App Store',
          src: '/og-app-store.png',
          caption: 'CodeAgentSwarm para iPhone y Apple Watch. Android está en beta y hay app web.',
          size: 'medium',
        },
        { type: 'heading', level: 3, id: 'configurar-cas', text: 'Configuración' },
        {
          type: 'list',
          items: [
            `Instala la app: <a href="https://apps.apple.com/app/codeagentswarm/id6801180696" ${EXT}>App Store</a> para iPhone, la beta de Android (pídela en el <a href="https://discord.com/channels/1444798143672750164/1540046825938096140" ${EXT}>canal #mobile-relay-beta de Discord</a>) o la app web en <a href="https://web.codeagentswarm.com" ${EXT}>web.codeagentswarm.com</a>.`,
            'En CodeAgentSwarm, en tu ordenador, inicia sesión, abre el menú de la cuenta y elige <strong>Connect a device</strong>.',
            'Escanea el QR (o escribe el código de un solo uso en la app web), comprueba que el código de verificación coincide en los dos dispositivos y acepta el móvil en el ordenador.',
          ],
        },
        { type: 'heading', level: 3, id: 'que-puedes-hacer', text: 'Qué puedes hacer' },
        {
          type: 'list',
          items: [
            'Ver cada sesión de Codex en Chat con su estado, junto a tus sesiones de Claude Code y de otros agentes.',
            'Responder, contestar preguntas y aprobaciones, y abrir una sesión nueva de Codex en uno de tus proyectos.',
            'Adjuntar fotos y archivos, o dictar una nota de voz que se convierte en texto editable.',
            'Recibir un aviso en iPhone o Android cuando una sesión te necesita.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Codex sigue corriendo en tu ordenador con la cuenta que ya tiene. El móvil y el ordenador hablan a través de un relay cifrado de extremo a extremo, así que el relay no puede leer tus conversaciones.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Las dos opciones, comparadas',
      content: [
        {
          type: 'table',
          headers: ['', 'Codex en la app de ChatGPT', 'App de CodeAgentSwarm'],
          rows: [
            ['En el ordenador', 'App de escritorio de ChatGPT (macOS, Windows) o Codex Cloud', 'CodeAgentSwarm (macOS, Windows, Linux)'],
            ['Usa la Codex CLI de tu ordenador', 'No es una configuración compatible', 'Sí, en las sesiones en vista Chat'],
            ['Otros agentes', 'Codex', 'Codex, Claude Code, OpenCode y el resto de agentes de CodeAgentSwarm'],
            ['Con el ordenador apagado', 'Sí, con Codex Cloud', 'No, el ordenador tiene que estar encendido'],
          ],
        },
        {
          type: 'paragraph',
          text: `Si vives en la app de escritorio de ChatGPT, la opción de OpenAI es la natural. Si tu Codex es una CLI, o lo usas con otros agentes, la app de CodeAgentSwarm es la que llega a él. ¿También usas Claude Code? Mira <a href="/es/guias/controlar-claude-code-desde-el-movil" ${A}>cómo controlar Claude Code desde el móvil</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Existe una app móvil de Codex?',
      answer: 'No como app aparte. Codex en el móvil forma parte de la app de ChatGPT para iOS y Android. Se conecta a Codex Cloud o a un Mac o PC con Windows que tenga la app de escritorio de ChatGPT.',
    },
    {
      question: '¿Puedo usar Codex CLI desde el móvil?',
      answer: 'La documentación de OpenAI dice que la conexión con el móvil no se puede configurar desde Codex CLI ni desde la extensión del IDE. Para llegar desde el móvil a Codex en tu ordenador, úsalo en el Chat de CodeAgentSwarm (funciona con tu Codex CLI instalada) y empareja su app para el móvil. Las sesiones en la vista Terminal (CLI) no se ven desde el móvil.',
    },
    {
      question: '¿Codex en el móvil funciona con Linux?',
      answer: 'La página Remote connections de OpenAI incluye como equipos la app de escritorio de ChatGPT en macOS y Windows, más los equipos SSH que añadas desde esa app. CodeAgentSwarm funciona en Linux, así que su app para el móvil llega a las sesiones de Codex en un ordenador con Linux.',
    },
    {
      question: '¿El ordenador tiene que seguir encendido?',
      answer: 'Para cualquier sesión que corra en tu ordenador, sí. Solo las tareas de Codex Cloud siguen con el ordenador apagado.',
    },
  ],
}

export default guide
