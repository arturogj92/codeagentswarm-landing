import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'como-usar-github-copilot-cli',
    locale: 'es',
    title: 'Cómo instalar y usar GitHub Copilot CLI',
    metaTitle: 'GitHub Copilot CLI: instalación, inicio de sesión y uso',
    metaDescription: 'Instala GitHub Copilot CLI en macOS, Windows o Linux, inicia sesión con un código de dispositivo y úsalo en Chat o en la terminal con historial reanudable.',
    intro: 'GitHub Copilot CLI es el agente de programación que GitHub distribuye como el comando <code>copilot</code>. Esta guía explica la instalación, el inicio de sesión, los modelos, MCP, el historial y los límites que encontramos al probar la versión 1.0.93 el 8 de octubre de 2026.',
    ctaText: 'Instala GitHub Copilot CLI desde el selector de agentes, inicia sesión desde Chat y guarda sus sesiones junto a tus otros agentes en CodeAgentSwarm.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'how-to-use-github-copilot-cli',
    relatedSlug: 'github-copilot-cli-modelos-creditos-ia',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'que-es',
      title: 'Qué es GitHub Copilot CLI',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: `GitHub Copilot CLI es un agente de terminal: lee tu proyecto, edita archivos y ejecuta comandos cuando los apruebas. El comando es <code>copilot</code> y el paquete de npm es <code>@github/copilot</code>. También funciona como servidor del Agent Client Protocol con <code>copilot --acp --stdio</code>, que GitHub publica como ${link('https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server', 'versión preliminar pública')}.`,
        },
        {
          type: 'paragraph',
          text: 'No es la antigua extensión <code>gh copilot</code>, que solo sugería y explicaba comandos de shell.',
        },
      ],
    },
    {
      id: 'instalar',
      title: 'Instálalo en macOS, Linux o Windows',
      content: [
        {
          type: 'table',
          headers: ['Método', 'Comando'],
          rows: [
            ['Script oficial (macOS, Linux)', '<code>curl -fsSL https://gh.io/copilot-install | bash</code>'],
            ['Homebrew (macOS, Linux)', '<code>brew install --cask copilot-cli</code>'],
            ['WinGet (Windows)', '<code>winget install GitHub.Copilot</code>'],
            ['npm (Node.js 22 o posterior)', '<code>npm install -g @github/copilot</code>'],
          ],
        },
        {
          type: 'paragraph',
          text: `Fuente: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli', 'documentación de instalación de GitHub')}, revisada el 8 de octubre de 2026. Sin permisos de administrador, el script instala <code>~/.local/bin/copilot</code>. Comprueba el resultado con <code>copilot --version</code>.`,
        },
        {
          type: 'image',
          src: '/images/guides/copilot-install.webp',
          alt: 'Diálogo de instalación de GitHub Copilot CLI en CodeAgentSwarm',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm. El botón Install automatically descarga el archivo oficial de la versión y comprueba su SHA-256 antes de extraerlo.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'En CodeAgentSwarm, elige GitHub Copilot CLI en el selector de agentes o pulsa Install en Settings > Providers. La app descarga el archivo oficial para tu sistema desde la versión publicada en GitHub, lo verifica con las sumas de comprobación publicadas y deja el binario en la misma carpeta <code>~/.local/bin</code> que usa el script. Las actualizaciones siguen el método que usaste: npm, Homebrew, WinGet o el instalador de la app.',
        },
      ],
    },
    {
      id: 'windows',
      title: 'Windows en x64 y ARM64',
      content: [
        {
          type: 'paragraph',
          text: 'GitHub publica compilaciones distintas para Windows x64 y ARM64. WinGet elige la correcta. El instalador de CodeAgentSwarm descarga el zip que corresponde, lo comprueba y extrae <code>copilot.exe</code> en <code>%LOCALAPPDATA%\\copilot-cli</code>. Si ya existe una instalación de WinGet o npm, la detecta y usa esa.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'En Windows, Copilot ejecuta los comandos con PowerShell. El ajuste <code>powershellFlags</code> controla cómo se inicia.',
        },
      ],
    },
    {
      id: 'iniciar-sesion',
      title: 'Inicia sesión con un código de dispositivo',
      content: [
        { type: 'code', language: 'bash', code: 'copilot login --device-code' },
        {
          type: 'paragraph',
          text: 'El comando muestra <code>https://github.com/login/device</code> y un código de un solo uso. Abre la página, escribe el código y aprueba el acceso. Chat ejecuta el mismo proceso cuando pulsas Sign in, así que no tienes que pegar nada de vuelta.',
        },
        {
          type: 'paragraph',
          text: `Copilot guarda el token en el llavero del sistema. También acepta <code>COPILOT_GITHUB_TOKEN</code>, <code>GH_TOKEN</code> y <code>GITHUB_TOKEN</code>, en ese orden, y si no hay ninguno usa la cuenta de GitHub CLI (<code>gh</code>) con sesión iniciada. Consulta la ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli', 'documentación de autenticación de GitHub')}.`,
        },
        {
          type: 'paragraph',
          text: 'Con un proveedor de modelos propio (BYOK) mediante las variables <code>COPILOT_PROVIDER_*</code> no necesitas iniciar sesión en GitHub.',
        },
      ],
    },
    {
      id: 'chat',
      title: 'Úsalo en Chat o en la terminal',
      content: [
        {
          type: 'image',
          src: '/images/guides/copilot-chat-real.webp',
          alt: 'GitHub Copilot CLI respondiendo en Chat de CodeAgentSwarm',
          caption: 'Respuesta real de GitHub Copilot CLI 1.0.93 en una versión de desarrollo de CodeAgentSwarm, con un mensaje de prueba.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Chat se comunica con el servidor ACP. Muestra los modelos que ofrece tu cuenta, los modos Agent, Plan y Autopilot, las solicitudes de permiso que puedes aprobar, los adjuntos de imagen y un botón para detener el turno. La vista de terminal ejecuta la interfaz normal de <code>copilot</code>, y una sesión iniciada en Chat continúa en la terminal.',
        },
        {
          type: 'list',
          items: [
            '<strong>Ask before actions</strong>: cada edición y cada comando esperan tu aprobación.',
            '<strong>Auto-approve edits</strong>: las ediciones pasan; los comandos siguen preguntando.',
            '<strong>Always approve</strong>: equivale a <code>copilot --yolo</code>.',
          ],
        },
      ],
    },
    {
      id: 'historial',
      title: 'Historial, reanudar y confianza en la carpeta',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot guarda cada sesión en <code>~/.copilot/session-state/&lt;id&gt;/</code>. CodeAgentSwarm muestra esas sesiones en el historial de conversaciones, las filtra por agente y proyecto, busca en sus mensajes y reabre cualquiera en Chat o con <code>copilot --resume &lt;id&gt;</code>. Los turnos de un subagente quedan dentro de la sesión que lo lanzó, así que cada fila es una conversación que puedes reanudar.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-history.webp',
          alt: 'Conversaciones de GitHub Copilot CLI filtradas en el historial de CodeAgentSwarm',
          caption: 'Interfaz real con una conversación de ejemplo creada para pruebas.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'La primera vez que la terminal abre Copilot en una carpeta, Copilot pregunta si confías en ella. Esa pregunta es del propio Copilot; respóndela una vez o pide que recuerde la carpeta.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'Conversación de Chat reanudada en la terminal de GitHub Copilot CLI con la pregunta de confianza en la carpeta',
          caption: 'Captura real: la sesión iniciada en Chat continúa en la terminal y Copilot pide confianza en la carpeta.',
          size: 'full',
        },
      ],
    },
    {
      id: 'mcp',
      title: 'Servidores MCP, instrucciones y skills',
      content: [
        {
          type: 'table',
          headers: ['Qué', 'Dónde'],
          rows: [
            ['Servidores MCP', '<code>~/.copilot/mcp-config.json</code>, además de <code>.mcp.json</code> o <code>.github/mcp.json</code> en un proyecto'],
            ['Instrucciones personales', '<code>~/.copilot/copilot-instructions.md</code>'],
            ['Skills', '<code>~/.copilot/skills/</code>, <code>.github/skills/</code>, <code>.agents/skills/</code> o <code>.claude/skills/</code>'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Ejecuta <code>copilot mcp list</code> y <code>copilot instruction list</code> para ver qué cargará una sesión. <code>COPILOT_HOME</code> mueve toda la carpeta <code>~/.copilot</code>.',
        },
        {
          type: 'paragraph',
          text: 'Si lo permites en Settings > Privacy, CodeAgentSwarm añade sus herramientas de tareas y títulos como una entrada MCP y una sección breve de instrucciones. Tus servidores no cambian, y al desactivar la opción solo se quita esa entrada.',
        },
      ],
    },
    {
      id: 'limites',
      title: 'Límites que conviene conocer',
      content: [
        {
          type: 'list',
          items: [
            'El esfuerzo de razonamiento es una opción de arranque (<code>--reasoning-effort</code>), así que Chat no muestra un selector de esfuerzo para Copilot. Si elegiste un nivel en otro sitio, se aplica al abrir la terminal.',
            'Los títulos de conversación y los mensajes de commit necesitan una ejecución sin herramientas. Copilot 1.0.93 se bloqueaba en ese modo, así que elige otro proveedor para esas dos ayudas.',
            'El servidor ACP es una versión preliminar. Los comandos que abren un selector, como <code>/login</code> o <code>/resume</code>, no funcionan dentro de Chat.',
            'El texto de un subagente puede aparecer en Chat antes de la respuesta principal.',
          ],
        },
        {
          type: 'paragraph',
          text: `Los planes y el uso están en ${link('/es/guias/github-copilot-cli-modelos-creditos-ia', 'modelos, créditos de IA y límites de GitHub Copilot CLI')}. Para compararlo con otras herramientas, consulta ${link('/es/guias/mejores-herramientas-agentes-ia-en-paralelo', 'las mejores herramientas para usar varios agentes de IA en paralelo')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿GitHub Copilot CLI es gratis?',
      answer: 'Copilot Free no tiene créditos de IA, pero Copilot CLI funciona con selección automática de modelo dentro de una asignación mensual limitada de Chat. Los planes de pago añaden créditos de IA que Copilot CLI consume. CodeAgentSwarm no incluye una suscripción a Copilot.',
    },
    {
      question: '¿Necesito Node.js para instalar GitHub Copilot CLI?',
      answer: 'Solo para el paquete de npm, que requiere Node.js 22 o posterior. El script oficial, Homebrew, WinGet y el instalador de CodeAgentSwarm usan el binario independiente.',
    },
    {
      question: '¿GitHub Copilot CLI funciona en Windows ARM64?',
      answer: 'Sí. GitHub publica compilaciones de Windows para x64 y ARM64, y tanto WinGet como el instalador de CodeAgentSwarm eligen la que corresponde al equipo.',
    },
    {
      question: '¿Dónde guarda GitHub Copilot CLI sus sesiones?',
      answer: 'En ~/.copilot/session-state, una carpeta por sesión. Define COPILOT_HOME para moverla. CodeAgentSwarm lee esa carpeta para listar, buscar y reanudar sesiones.',
    },
    {
      question: '¿Por qué Copilot usa mi cuenta de GitHub CLI?',
      answer: 'Copilot recurre a las credenciales de GitHub CLI cuando no tiene un inicio de sesión ni un token propios. Ejecuta copilot login para entrar con otra cuenta.',
    },
  ],
}

export default guide
