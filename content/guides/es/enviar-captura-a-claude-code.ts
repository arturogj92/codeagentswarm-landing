import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'enviar-captura-a-claude-code',
    locale: 'es',
    title: 'Cómo enviar una captura de pantalla a Claude Code',
    metaTitle: 'Cómo enviar una captura a Claude Code (Mac y Windows)',
    metaDescription: 'Cómo pasar una captura a Claude Code: pegar, arrastrar o dar la ruta, más captura directa al agente, Appshots y fotos del móvil en CodeAgentSwarm.',
    intro: `Una captura suele explicar un fallo antes que un párrafo: un diseño roto, un diálogo de error, una gráfica que no cuadra. Claude Code sabe leer imágenes, así que la única duda es cómo meter la imagen en la sesión sin guardar archivos en el escritorio y andar buscando rutas.\n\nEsta guía empieza por las tres formas que admite Claude Code por sí solo y después enseña cómo CodeAgentSwarm convierte una captura en un mensaje para un agente con un par de teclas.`,
    ctaText: 'Pulsa el atajo de Screenshot to Agent en CodeAgentSwarm, dibuja sobre la captura, añade una nota y envíala a la sesión que la necesita.',
    ctaAgent: 'claude-code',
    highlightedWords: ['captura', 'Claude Code'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'send-screenshot-to-claude-code',
    relatedSlug: 'trucos-y-consejos-claude-code',
  },
  sections: [
    {
      id: 'formas-integradas',
      title: 'Las tres formas que trae Claude Code',
      content: [
        {
          type: 'paragraph',
          text: `La página de <a href="https://code.claude.com/docs/en/common-workflows" ${EXT}>flujos de trabajo habituales</a> de Anthropic recoge tres formas de añadir una imagen a una sesión de Claude Code:`,
        },
        {
          type: 'list',
          items: [
            '<strong>Arrastrar y soltar</strong> el archivo de imagen en la ventana de Claude Code.',
            '<strong>Pegarla</strong> con <code>Ctrl+V</code>, o con <code>Alt+V</code> en Windows y WSL. En Mac es Control, no Comando.',
            '<strong>Darle la ruta</strong> en el mensaje, por ejemplo: <code>Analiza esta imagen: /ruta/a/tu/imagen.png</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Después hazle una pregunta concreta: "el botón de esta captura se monta encima del pie a 390 px, arregla el CSS" funciona mejor que "mira esto".',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Para copiar una zona de la pantalla directamente al portapapeles en macOS, usa <code>Cmd+Ctrl+Shift+4</code>. En Windows, <code>Win+Shift+S</code> hace lo mismo. Luego pégala en Claude Code.',
        },
      ],
    },
    {
      id: 'screenshot-to-agent',
      title: 'Screenshot to Agent en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para macOS, Windows y Linux que ejecuta Claude Code, Codex y otros agentes uno al lado del otro. Tiene un flujo de captura pensado justo para esto.',
        },
        {
          type: 'list',
          items: [
            'Pulsa <code>Cmd+Shift+P</code> en macOS o <code>Ctrl+Shift+P</code> en Windows y Linux. El atajo se puede cambiar en Settings.',
            'Arrastra sobre la parte de la pantalla que quieres, en cualquier monitor. La captura se hace al soltar el ratón.',
            'Se abre una vista previa. La sesión en la que estabas ya viene elegida, y puedes escoger otra sesión abierta o arrancar un agente nuevo en uno de tus proyectos.',
            'Pulsa en la imagen para dibujar encima con lápiz, flechas o texto, escribe qué falla y dale a Send.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El agente recibe tu nota y la ruta de la imagen en un solo mensaje, así que puede abrir el archivo por su cuenta. Funciona igual con Claude Code, Codex y el resto de agentes.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: '¿Tienes que capturar otra app? Pulsa el botón de la cámara en la parte de abajo de un Chat. Espera 5 segundos para que te dé tiempo a cambiar de ventana y luego abre el mismo selector. Vuelve a pulsarlo o pulsa Esc para cancelar.',
        },
      ],
    },
    {
      id: 'appshots',
      title: 'Appshots: captura una ventana entera con dos teclas (macOS)',
      content: [
        {
          type: 'paragraph',
          text: 'En Mac, pulsa las dos teclas Shift a la vez para capturar la ventana de la app que tienes delante, sin tener que seleccionar nada. Las capturas se van guardando en una pequeña bandeja. En cualquier Chat, el botón <strong>Add Appshots</strong>, junto a la cámara, las añade al mensaje que estás escribiendo, y todavía puedes editar las imágenes y el texto antes de enviarlo.',
        },
        {
          type: 'paragraph',
          text: 'Appshots necesita dos permisos de macOS: Monitorización de entrada y Grabación de pantalla. En <strong>Settings > Capture > Appshots</strong> puedes darlos, cambiar el par de teclas a las dos Comando o las dos Opción, o desactivar el gesto.',
        },
      ],
    },
    {
      id: 'pegar-en-codeagentswarm',
      title: 'Pegar y soltar también funcionan',
      content: [
        {
          type: 'list',
          items: [
            'En un terminal de CodeAgentSwarm, <code>Cmd+V</code> en Mac pega una imagen copiada. La app la guarda en un archivo temporal y le pasa la ruta al agente.',
            'Suelta un archivo de imagen sobre un terminal o un Chat para adjuntarlo.',
            'En el Chat, pulsa una imagen pendiente antes de enviarla para dibujar encima.',
          ],
        },
      ],
    },
    {
      id: 'desde-el-movil',
      title: 'Desde el móvil',
      content: [
        {
          type: 'paragraph',
          text: `Con la app de CodeAgentSwarm para el móvil emparejada con tu ordenador, puedes adjuntar una foto de la cámara o de la galería a cualquier sesión, dibujar encima y enviarla. Muy útil para un fallo que acabas de ver en un dispositivo real. Los pasos están en <a href="/es/guias/controlar-claude-code-desde-el-movil" ${A}>cómo controlar Claude Code desde el móvil</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo pego una captura en Claude Code en Mac?',
      answer: 'Copia la imagen y pulsa Ctrl+V (Control, no Comando) en el terminal de Claude Code. También puedes arrastrar el archivo a la ventana o escribir su ruta. En un terminal de CodeAgentSwarm también funciona Cmd+V.',
    },
    {
      question: '¿Cómo pego una imagen en Claude Code en Windows?',
      answer: 'Anthropic documenta Alt+V para pegar imágenes en Windows y WSL. Arrastrar y soltar y escribir la ruta también funcionan.',
    },
    {
      question: '¿Claude Code puede leer capturas de pantalla?',
      answer: 'Sí. Claude Code analiza las imágenes que añades a la conversación, como pantallas de error, maquetas de interfaz o diagramas.',
    },
    {
      question: '¿Screenshot to Agent funciona con Codex?',
      answer: 'Sí. En CodeAgentSwarm el flujo de captura envía la ruta de la imagen y tu nota a la sesión que elijas, incluidas Codex, OpenCode y el resto de agentes compatibles.',
    },
  ],
}

export default guide
