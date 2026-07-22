import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-en-windows',
    locale: 'es',
    title: 'Cómo ejecutar Kimi Code en Windows: instalador, Git Bash y los bordes ásperos',
    metaTitle: 'Cómo ejecutar Kimi Code en Windows (nativo o WSL) (2026)',
    metaDescription: 'Ejecuta Kimi Code en Windows: el instalador de PowerShell, el requisito de Git for Windows, el bug de renderizado ANSI que debes conocer y WSL como plan B fiable.',
    intro: `Kimi Code funciona en Windows, y Moonshot publica un instalador oficial de PowerShell para ello. Pero la historia en Windows tiene dos peros que la de macOS no tiene: Kimi Code exige Git for Windows antes de su primer arranque, porque usa Git Bash como su entorno de shell, y las builds 0.26.x actuales arrastran un problema conocido de renderizado que puede volcar secuencias de escape en crudo en algunos terminales de Windows.

Esta guía recorre la versión honesta del setup: qué instalar y en qué orden, qué implica la dependencia de Git Bash, qué pinta tiene el bug de renderizado cuando muerde, y cuándo ejecutar Kimi Code dentro de WSL es sencillamente la opción más tranquila. Nada de esto es motivo para saltarse la herramienta, pero entrar con los ojos abiertos te ahorra una tarde de confusión.

Si estás montando otros agentes en la misma máquina, nuestras guías de <a href="/es/guias/claude-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code en Windows</a> y de <a href="/es/guias/opencode-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode en Windows</a> siguen el mismo esquema.`,
    ctaText: 'CodeAgentSwarm es una app de escritorio nativa para Windows que ejecuta tus agentes de código en terminales en paralelo, y Kimi Code es un agente soportado. Notificaciones, historial buscable y diffs en vivo, todo en un mismo espacio de trabajo.',
    highlightedWords: ['Kimi Code', 'Windows'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'kimi-code-on-windows',
  },
  sections: [
    {
      id: 'respuesta-rapida',
      title: 'Respuesta rápida: sí, con dos requisitos previos',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: instala primero <strong>Git for Windows</strong>, y después ejecuta el instalador oficial en PowerShell: <code>irm https://code.kimi.com/kimi-code/install.ps1 | iex</code>. Abre un terminal nuevo, ejecuta <code>kimi</code> dentro de la carpeta de un proyecto e inicia sesión con <code>/login</code>.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '# 1. Instala primero Git for Windows (obligatorio, Kimi Code usa Git Bash como shell)\nwinget install Git.Git\n\n# 2. Instala Kimi Code con el instalador oficial de PowerShell\nirm https://code.kimi.com/kimi-code/install.ps1 | iex\n\n# 3. Abre un terminal NUEVO y verifica\nkimi --version',
        },
        {
          type: 'paragraph',
          text: 'Ese es el camino corto. El orden importa: Git for Windows tiene que estar antes del primer arranque de Kimi Code, no después. Las secciones de abajo explican por qué, cubren la alternativa por npm y repasan el problema de renderizado que ahora mismo es la pega más específica de Windows.',
        },
        {
          type: 'paragraph',
          text: 'Si Kimi Code en sí te pilla de nuevas, empieza por <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo usar Kimi Code</a>, que además cubre la trampa de los dos CLIs de Moonshot que instalan un binario <code>kimi</code>.',
        },
      ],
    },
    {
      id: 'requisitos',
      title: 'Qué necesitas antes de instalar',
      content: [
        {
          type: 'list',
          items: [
            'Windows 10 o Windows 11 de 64 bits, y un terminal (Windows Terminal o PowerShell).',
            '<strong>Git for Windows.</strong> No es opcional. Kimi Code usa el Git Bash que viene incluido como su entorno de shell, así que debe estar instalado antes del primer arranque. Instálalo desde git-scm.com o con <code>winget install Git.Git</code>.',
            'Node.js 22.19.0 o superior, pero solo si eliges la vía de npm en vez del instalador de PowerShell. El instalador oficial no necesita Node para nada.',
            'Una cuenta de Kimi (para los planes de suscripción) o una API key de la plataforma de Moonshot (para pago por token).',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Si tu Git Bash vive en una ruta rara, define la variable de entorno <code>KIMI_SHELL_PATH</code> con la ruta absoluta de tu <code>bash.exe</code> para que Kimi Code encuentre su shell.',
        },
      ],
    },
    {
      id: 'instalacion-nativa',
      title: 'Instalación nativa paso a paso',
      content: [
        {
          type: 'paragraph',
          text: 'Con Git for Windows en su sitio, el instalador oficial es la vía recomendada porque no necesita runtime:',
        },
        {
          type: 'list',
          items: [
            'Abre PowerShell (sin permisos de administrador).',
            'Ejecuta <code>irm https://code.kimi.com/kimi-code/install.ps1 | iex</code>. Descarga la última release, verifica el checksum y deja el ejecutable <code>kimi</code> en tu PATH.',
            'Cierra y vuelve a abrir el terminal para que coja el cambio de PATH.',
            'Ejecuta <code>kimi --version</code>. Deberías ver una versión 0.x, lo que confirma que tienes el CLI actual en TypeScript y no el kimi-cli legacy en Python.',
            'Entra en la carpeta de un proyecto, ejecuta <code>kimi</code> e inicia sesión con <code>/login</code> (navegador para suscripciones, API key para pago por token).',
          ],
        },
        {
          type: 'paragraph',
          text: '¿Prefieres npm? También funciona en Windows, siempre que tengas Node.js 22.19 o superior:',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '# Comprueba Node primero\nnode --version\n\n# Instala globalmente\nnpm install -g @moonshot-ai/kimi-code\n\n# Verifica\nkimi --version',
        },
        {
          type: 'paragraph',
          text: 'Para actualizar más adelante, ejecuta <code>kimi upgrade</code>, o <code>npm install -g @moonshot-ai/kimi-code@latest</code> si instalaste por npm.',
        },
      ],
    },
    {
      id: 'bug-de-renderizado-ansi',
      title: 'El bug de renderizado que debes conocer',
      content: [
        {
          type: 'paragraph',
          text: 'Aquí viene la parte que la mayoría de artículos se salta. A fecha de las releases 0.26.x, el repositorio de Kimi Code tiene una issue abierta (#1792) en la que el TUI vuelca secuencias de escape ANSI en crudo en vez de renderizarlas, en Windows Terminal, PowerShell y cmd. Cuando pega, la pantalla se llena de secuencias tipo <code>[38;2;255m</code> en lugar de una interfaz usable.',
        },
        {
          type: 'paragraph',
          text: 'No muerde en todas las máquinas, y con un ritmo de una versión al día puede estar arreglado cuando leas esto. Pero si lanzas <code>kimi</code> en Windows y la salida parece basura en vez de una UI, no estás haciendo nada mal: es un problema conocido del proyecto. Mira el <a href="https://github.com/MoonshotAI/kimi-code/issues" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">issue tracker</a> para ver el estado actual antes de perder tiempo con tu configuración.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Si el TUI se te renderiza roto en los terminales nativos de Windows, hoy tienes dos salidas prácticas: ejecutar Kimi Code dentro de WSL, o usar el modelo en vez del CLI apuntando Claude Code a Kimi K3, como se explica en <a href="/es/guias/kimi-k3-con-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K3 con Claude Code</a>.',
        },
      ],
    },
    {
      id: 'via-wsl',
      title: 'La vía WSL: el plan B fiable',
      content: [
        {
          type: 'paragraph',
          text: 'WSL 2 te da un entorno Linux de verdad dentro de Windows, y ahí Kimi Code se comporta como en Linux: la dependencia de bash es nativa, y la ruta de renderizado es la que la mayoría de sus usuarios ejercita a diario. Si tu proyecto ya depende de herramientas de Linux, o el TUI nativo se porta mal en tu máquina, esta es la vía tranquila.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Dentro de tu terminal WSL (Linux)\ncurl -fsSL https://code.kimi.com/kimi-code/install.sh | bash\n\n# Y después, desde tu proyecto\nkimi',
        },
        {
          type: 'paragraph',
          text: 'Dos notas prácticas: mantén los archivos del proyecto dentro del sistema de archivos de Linux por rendimiento, y cuando el login OAuth te enseñe un enlace, termínalo en tu navegador de Windows y vuelve al terminal. Todo lo demás funciona igual que en el setup nativo.',
        },
      ],
    },
    {
      id: 'solucion-de-problemas',
      title: 'Errores típicos de Windows y sus arreglos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"kimi no se reconoce como comando":</strong> no reabriste el terminal tras instalar, o el cambio de PATH del instalador no cuajó. Abre una ventana nueva de PowerShell; si sigue, comprueba que la carpeta bin de Kimi Code está en tu PATH.',
            '<strong>Kimi Code se queja del shell o no consigue ejecutar comandos:</strong> falta Git for Windows o Git Bash está en una ruta rara. Instala Git for Windows, o apunta <code>KIMI_SHELL_PATH</code> a tu <code>bash.exe</code>.',
            '<strong>Pantalla llena de códigos de escape en crudo:</strong> es la issue #1792 de arriba, no tu configuración. Usa WSL o revisa el issue tracker por si ya hay release con arreglo.',
            '<strong><code>kimi --version</code> imprime 1.4x:</strong> tienes el kimi-cli legacy en Python, no Kimi Code. Instala con el script oficial o el paquete de npm <code>@moonshot-ai/kimi-code</code>; el instalador renombra los shims legacy a <code>kimi-legacy</code> por ti.',
            '<strong>npm falla por la versión de Node:</strong> Kimi Code necesita Node 22.19.0 o superior. Actualiza Node, o sáltate npm y usa el instalador de PowerShell, que lo trae todo.',
          ],
        },
      ],
    },
    {
      id: 'varias-sesiones-en-windows',
      title: 'Varias sesiones de Kimi Code en Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando Kimi Code ya funciona, el siguiente techo es un terminal, una tarea. Cada sesión de <code>kimi</code> es un proceso independiente, así que nada te impide abrir varios terminales y correr una sesión en cada uno. Lo difícil es no perder el hilo: qué agente terminó, cuál espera una aprobación y qué cambió cada uno.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> es una app de escritorio nativa para Windows y macOS construida para ese problema de supervisión. Kimi Code es un agente soportado en ella, junto a Claude Code, Codex CLI, Antigravity CLI y opencode, y el agente se elige por terminal. Tienes notificaciones de escritorio cuando una sesión termina o necesita algo, historial buscable entre todos los agentes, diffs en vivo por terminal, y un indicador de cuota que lee las ventanas semanal y de 5 horas de Kimi.',
        },
        {
          type: 'paragraph',
          text: 'Para el flujo en paralelo completo, sigue con <a href="/es/guias/ejecutar-multiples-sesiones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Kimi Code</a> y la <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes de Kimi Code</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Kimi Code funciona en Windows?',
      answer: 'Sí. Moonshot publica un instalador oficial de PowerShell (irm https://code.kimi.com/kimi-code/install.ps1 | iex), y hay paquete de npm para máquinas con Node 22.19 o superior. El requisito duro es Git for Windows, que debe estar instalado antes del primer arranque porque Kimi Code usa Git Bash como su entorno de shell.',
    },
    {
      question: '¿Por qué Kimi Code necesita Git for Windows?',
      answer: 'Kimi Code ejecuta sus comandos de shell a través de Git Bash en lugar de PowerShell o cmd, así que necesita el bash que viene con Git for Windows. Si tu Git Bash está instalado en una ruta poco habitual, define la variable de entorno KIMI_SHELL_PATH con la ruta absoluta de bash.exe.',
    },
    {
      question: '¿Por qué Kimi Code muestra texto roto o códigos de escape en Windows?',
      answer: 'Las builds 0.26.x actuales tienen una issue abierta conocida (#1792) en la que el TUI imprime secuencias ANSI en crudo en Windows Terminal, PowerShell y cmd en algunas máquinas. Es un bug del proyecto, no de tu configuración. Kimi Code publica versiones casi a diario, así que revisa el issue tracker de GitHub; hasta que se arregle en tu equipo, WSL es la vía fiable.',
    },
    {
      question: '¿Debería usar WSL para Kimi Code en Windows?',
      answer: 'Usa WSL 2 si tu proyecto depende de herramientas de Linux, o si el TUI nativo de Windows se renderiza mal en tu máquina. Dentro de WSL, Kimi Code se instala con el mismo script de una línea que en Linux y se comporta como para el grueso de sus usuarios. Para proyectos nativos de Windows donde el TUI se ve bien, la instalación nativa es más simple.',
    },
    {
      question: '¿Puedo ejecutar varias sesiones de Kimi Code a la vez en Windows?',
      answer: 'Sí. Cada sesión de kimi es su propio proceso, así que puedes correr una por terminal. CodeAgentSwarm, una app de escritorio nativa de Windows, te lo gestiona: Kimi Code es un agente soportado, y tienes notificaciones, historial buscable, diffs en vivo y un indicador de cuota de Kimi sobre todas tus sesiones en paralelo.',
    },
  ],
}

export default guide
