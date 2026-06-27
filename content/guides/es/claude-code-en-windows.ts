import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-en-windows',
    locale: 'es',
    title: 'Cómo ejecutar Claude Code en Windows: instalación nativa o WSL',
    metaTitle: 'Cómo instalar y usar Claude Code en Windows (nativo o WSL) - Guía 2026',
    metaDescription: 'Claude Code funciona de forma nativa en Windows, sin WSL. Instalación en una línea de PowerShell, requisitos, setup con WSL 2, solución de errores y cómo ejecutar varias sesiones a la vez.',
    intro: `Sí, Claude Code funciona de forma nativa en Windows. Ya no necesitas WSL: abre PowerShell y ejecuta "irm https://claude.ai/install.ps1 | iex", luego escribe "claude" para iniciar sesión. Funciona en Windows 10 (1809 o posterior) y Windows 11, solo con PowerShell o con Git Bash si tienes Git para Windows instalado.

WSL sigue siendo una opción válida, y en algunos casos la mejor. En esta guía cubrimos los dos caminos: la instalación nativa paso a paso, la instalación en WSL 2, cuándo elegir cada una y cómo arreglar los errores más comunes específicos de Windows.

Y cuando lo tengas funcionando, también te enseñamos cómo pasar de un terminal de Claude Code a varios trabajando en paralelo en Windows.`,
    ctaText: 'CodeAgentSwarm ya está disponible para Windows. Descárgalo gratis y ejecuta varios terminales de Claude Code en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    highlightedWords: ['Claude Code', 'Windows'],
    publishedAt: '2026-06-12',
    updatedAt: '2026-06-12',
    alternateSlug: 'claude-code-on-windows',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Claude Code en Windows en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: abre PowerShell (sin permisos de administrador) y ejecuta el instalador oficial. Cuando termine, escribe <code>claude</code> e inicia sesión con tu cuenta de Anthropic en la ventana del navegador que se abre.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: `# PowerShell (recomendado)
irm https://claude.ai/install.ps1 | iex

# O con WinGet
winget install Anthropic.ClaudeCode

# Verifica la instalación
claude --version`,
        },
        {
          type: 'paragraph',
          text: 'Eso es toda la instalación nativa. Sin WSL, sin configurar Node.js, sin permisos de administrador. El instalador añade Claude Code a tu PATH automáticamente y la versión nativa se actualiza sola en segundo plano.',
        },
        {
          type: 'paragraph',
          text: 'Todos los comandos de esta guía salen de la <a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de instalación de Claude Code</a>.',
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
            'Windows 10 (versión 1809 o posterior) o Windows 11, de 64 bits. Windows de 32 bits no está soportado.',
            'PowerShell, que viene preinstalado con Windows.',
            'Git para Windows: opcional pero recomendado. Con él, Claude Code usa Git Bash como shell, lo que da mejor compatibilidad con comandos bash. Sin él, Claude Code usa PowerShell.',
            'Una cuenta de Anthropic (suscripción Claude Pro/Max o acceso por API).',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'NO necesitas Node.js ni npm para el instalador nativo. Ese requisito solo aplica al método antiguo de instalación por npm.',
        },
      ],
    },
    {
      id: 'instalacion-nativa-paso-a-paso',
      title: 'Instalación nativa paso a paso',
      content: [
        {
          type: 'paragraph',
          text: 'La instalación nativa lleva más o menos un minuto:',
        },
        {
          type: 'list',
          items: [
            'Abre Windows Terminal o PowerShell. No hace falta ejecutarlo como administrador.',
            'Ejecuta el instalador: <code>irm https://claude.ai/install.ps1 | iex</code>',
            'Espera a que el script termine. Instala Claude Code en tu perfil de usuario y lo añade al PATH.',
            'Cierra y vuelve a abrir el terminal para que el cambio del PATH haga efecto.',
            'Ejecuta <code>claude --version</code> para confirmar que está instalado.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si prefieres CMD en lugar de PowerShell, hay un instalador equivalente:',
        },
        {
          type: 'code',
          language: 'batch',
          code: 'curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Nota sobre actualizaciones: el instalador nativo se actualiza solo en segundo plano. Si instalas con WinGet, las actualizaciones son manuales: ejecuta <code>winget upgrade Anthropic.ClaudeCode</code> de vez en cuando.',
        },
      ],
    },
    {
      id: 'primer-arranque-login',
      title: 'Primer arranque: iniciar sesión',
      content: [
        {
          type: 'list',
          items: [
            'Abre un terminal en la carpeta de un proyecto y escribe <code>claude</code>.',
            'Tu navegador se abre con el login de Anthropic. Inicia sesión con tu cuenta de Claude.',
            'Si el navegador no se abre, pulsa <code>c</code> en el terminal para copiar la URL de login y pégala en el navegador a mano.',
            'De vuelta en el terminal, ya está: pídele a Claude algo sobre tu código.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si algo no va bien después de instalar, <code>claude doctor</code> ejecuta un diagnóstico que detecta la mayoría de los problemas de configuración habituales.',
        },
      ],
    },
    {
      id: 'instalacion-wsl',
      title: 'Instalar Claude Code en WSL (y cuándo es mejor opción)',
      content: [
        {
          type: 'paragraph',
          text: 'Antes de que existiera el soporte nativo para Windows, WSL era la única forma de usar Claude Code en Windows. Sigue estando totalmente soportado y hay dos escenarios donde sigue siendo la mejor opción:',
        },
        {
          type: 'list',
          items: [
            '<strong>Tu proyecto depende de herramientas de Linux.</strong> Si tu cadena de build, scripts o dependencias asumen Linux, ejecuta Claude Code donde realmente corre tu proyecto.',
            '<strong>Quieres ejecución de comandos con sandbox.</strong> El sandboxing de Claude Code funciona en WSL 2 pero no en Windows nativo (ni en WSL 1).',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para instalar dentro de WSL, abre el terminal de tu distribución WSL (no PowerShell) y ejecuta el instalador de Linux:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'curl -fsSL https://claude.ai/install.sh | bash',
        },
        {
          type: 'paragraph',
          text: 'Luego lanza <code>claude</code> desde dentro del terminal de WSL. Un detalle con el login: en WSL el navegador a veces te muestra un código en lugar de redirigir automáticamente. Pega ese código en el terminal cuando te lo pida.',
        },
      ],
    },
    {
      id: 'nativo-vs-wsl',
      title: 'Windows nativo vs WSL: ¿cuál usar?',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Windows nativo:</strong> lo mejor para proyectos nativos de Windows (.NET, Unity, desarrollo web con herramientas de Windows). Setup más simple, se actualiza solo, funciona con PowerShell o Git Bash.',
            '<strong>WSL 2:</strong> lo mejor para toolchains de Linux y para ejecución con sandbox. Tus archivos viven en el sistema de archivos de Linux, así que los proyectos Linux-first se comportan exactamente igual que en un servidor.',
            '<strong>WSL 1:</strong> solo si WSL 2 no está disponible en tu máquina. No soporta sandboxing y tiene problemas conocidos ejecutando binarios nativos.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si no lo tienes claro, empieza con la nativa. Es el camino con menos fricción y siempre puedes añadir una instalación en WSL después; las dos pueden convivir en la misma máquina.',
        },
      ],
    },
    {
      id: 'solucion-de-errores',
      title: 'Errores comunes en Windows y cómo arreglarlos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"Claude Code on Windows requires either Git for Windows (for bash) or PowerShell":</strong> PowerShell no está en tu PATH o estás en un shell raro. Usa el Windows PowerShell estándar, o instala Git para Windows.',
            '<strong>Git Bash instalado pero no detectado:</strong> apunta Claude Code a él explícitamente en tu settings.json: <code>{"env": {"CLAUDE_CODE_GIT_BASH_PATH": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe"}}</code>',
            '<strong>"The process cannot access the file" durante la instalación:</strong> otro proceso está bloqueando la descarga. Borra la carpeta <code>%USERPROFILE%\\.claude\\downloads</code> y vuelve a ejecutar el instalador.',
            '<strong>Errores SSL/TLS en Windows 10 antiguo:</strong> ejecuta <code>[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12</code> en PowerShell antes de instalar.',
            '<strong>"Exec format error" en WSL:</strong> estás en WSL 1. Actualiza la distribución a WSL 2 con <code>wsl --set-version &lt;distro&gt; 2</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para cualquier otra cosa, la <a href="https://code.claude.com/docs/en/troubleshoot-install" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de troubleshooting</a> cubre la lista completa de problemas de instalación conocidos.',
        },
      ],
    },
    {
      id: 'varios-terminales-en-windows',
      title: 'Ejecutar varias sesiones de Claude Code en Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Con Claude Code funcionando, el siguiente cuello de botella aparece rápido: un terminal significa una tarea a la vez. Le das algo que hacer a Claude, y a esperar. La mayoría acaba abriendo varias pestañas de terminal y perdiendo la pista de qué agente terminó, cuál está esperando un permiso y qué cambió cada uno.',
        },
        {
          type: 'paragraph',
          text: 'Ese es el problema que resuelve <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, y ya funciona en Windows. Te da varios terminales de Claude Code en paralelo con notificaciones de escritorio cuando un agente termina o necesita tu input, historial buscable de todas las sesiones y un diff en vivo de lo que cambió cada terminal.',
        },
        {
          type: 'paragraph',
          text: 'Si quieres tirar por ese camino, estas dos guías son el siguiente paso natural: <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo usar varios terminales de Claude Code</a> y <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Ejecutar múltiples sesiones de Claude Code</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'Ejecutar Claude Code en Windows pasó de "configura WSL primero" a una instalación de una línea en PowerShell. La nativa es la opción correcta por defecto para la mayoría de desarrolladores en Windows; WSL 2 está ahí para cuando necesitas herramientas de Linux o sandboxing.',
        },
        {
          type: 'paragraph',
          text: 'Instálalo, ejecuta <code>claude doctor</code> si algo no cuadra, y cuando un solo terminal se te quede corto, ya sabes dónde encontrarnos.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Necesito WSL para usar Claude Code en Windows?',
      answer: 'No. Claude Code soporta Windows de forma nativa desde 2025. WSL 2 solo hace falta si quieres ejecución de comandos con sandbox o tu proyecto depende de herramientas de Linux.',
    },
    {
      question: '¿Necesito tener Git para Windows instalado?',
      answer: 'No, es opcional. Sin él, Claude Code usa PowerShell como shell. Con él, Claude Code usa Git Bash, que maneja mejor los comandos estilo bash. Instalarlo es recomendable.',
    },
    {
      question: '¿Cómo se actualiza Claude Code en Windows?',
      answer: 'El instalador nativo se actualiza solo en segundo plano al arrancar. Si instalaste con WinGet, ejecuta "winget upgrade Anthropic.ClaudeCode" manualmente, o define CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1 para activar las actualizaciones automáticas.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Windows?',
      answer: 'Sí. CodeAgentSwarm está disponible para Windows (x64 y ARM64) y macOS. Funciona sobre tu instalación existente de Claude Code y te permite supervisar varios terminales en paralelo.',
    },
    {
      question: '¿Puedo ejecutar OpenAI Codex CLI en Windows también?',
      answer: 'Sí. Codex CLI funciona en Windows, y puedes ejecutarlo junto a Claude Code dentro de CodeAgentSwarm. Para una guía de instalación y configuración específica de Codex, mira <a href="/es/guias/codex-cli-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo ejecutar Codex CLI en Windows</a>.',
    },
  ],
}

export default guide
