import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-en-linux',
    locale: 'es',
    title: 'Cómo instalar Cursor CLI (Cursor Agent) en Linux',
    metaTitle: 'Cursor CLI en Linux: instala Cursor Agent en Ubuntu, Debian y Fedora (2026)',
    metaDescription: 'Instala Cursor CLI (Cursor Agent) en Linux con el instalador oficial de una línea. Requisitos, PATH, login por SSH, errores comunes y cómo usar varias sesiones de Cursor Agent a la vez.',
    intro: `Cursor CLI, también llamado Cursor Agent, funciona de forma nativa en Linux. Abre un terminal, ejecuta "curl https://cursor.com/install -fsS | bash", abre otro terminal y escribe "agent" (o "cursor-agent") dentro de la carpeta de tu proyecto. El instalador funciona en x64 y ARM64 y no necesita root.

En esta guía vemos la instalación, los dos nombres de comando que crea y cuál te conviene, cómo iniciar sesión en un servidor sin navegador y los errores más habituales en Linux.

Cuando lo tengas funcionando, también te enseñamos a tener varias sesiones de Cursor Agent en paralelo en la misma máquina Linux, junto a Claude Code, Codex y otros agentes.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varias sesiones de Cursor Agent en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'cursor-cli-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Cursor CLI en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el instalador oficial en cualquier terminal. Sin sudo. Cuando termine, abre un terminal nuevo, escribe <code>agent</code> en tu proyecto e inicia sesión con tu cuenta de Cursor.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalador oficial (macOS, Linux y WSL)
curl https://cursor.com/install -fsS | bash

# Comprueba la instalación
agent --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
agent`,
        },
        {
          type: 'paragraph',
          text: 'El instalador descarga la versión para tu arquitectura en <code>~/.local/share/cursor-agent</code> y crea dos enlaces en <code>~/.local/bin</code>: <code>agent</code> y <code>cursor-agent</code>. Los comandos de esta guía salen de la <a href="https://cursor.com/docs/cli/installation" target="_blank" rel="noopener noreferrer" class="' + link + '">documentación oficial de instalación de Cursor CLI</a> y de la <a href="https://cursor.com/docs/cli/reference/authentication" target="_blank" rel="noopener noreferrer" class="' + link + '">referencia de autenticación</a>.',
        },
      ],
    },
    {
      id: 'requisitos',
      title: 'Requisitos',
      content: [
        {
          type: 'list',
          items: [
            'Un Linux de 64 bits en x64 o ARM64. En cualquier otra arquitectura el instalador se para con "Unsupported architecture".',
            '<code>curl</code>, <code>tar</code> y <code>bash</code>, que la mayoría de distros traen de serie.',
            'Una cuenta de Cursor para el login con navegador, o una API key de usuario del panel de Cursor para servidores y CI.',
            '<code>~/.local/bin</code> en tu PATH. Si falta, el instalador te avisa.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No necesitas tener instalado el editor Cursor. El CLI se descarga aparte y funciona por su cuenta, también en un servidor sin entorno gráfico.',
        },
      ],
    },
    {
      id: 'agent-o-cursor-agent',
      title: '¿agent o cursor-agent? Qué comando usar',
      content: [
        {
          type: 'paragraph',
          text: 'Los dos nombres apuntan al mismo binario. La documentación de Cursor usa ahora <code>agent</code> como nombre principal y mantiene <code>cursor-agent</code> como nombre heredado. Para el día a día te vale cualquiera.',
        },
        {
          type: 'paragraph',
          text: 'El problema: <code>agent</code> es un nombre muy genérico y otro CLI de tu máquina puede quedárselo. Grok es un caso conocido. Si tienes varios agentes instalados, usa <code>cursor-agent</code> en tus scripts y comprueba a qué apunta cada nombre:',
        },
        {
          type: 'code',
          language: 'bash',
          code: `command -v cursor-agent
command -v agent
cursor-agent --version`,
        },
        {
          type: 'paragraph',
          text: 'Por eso CodeAgentSwarm lanza siempre <code>cursor-agent</code>, así nunca abre la herramienta equivocada.',
        },
      ],
    },
    {
      id: 'primer-arranque-y-login',
      title: 'Primer arranque e inicio de sesión (también por SSH)',
      content: [
        {
          type: 'list',
          items: [
            'Ejecuta <code>agent login</code>. Se abre tu navegador y entras con tu cuenta de Cursor.',
            'En un servidor o por SSH, donde no se puede abrir un navegador, ejecuta <code>NO_OPEN_BROWSER=1 agent login</code> y abre en cualquier otro dispositivo la URL que aparece.',
            'Para CI o scripts, crea una API key de usuario en el panel de Cursor y expórtala como <code>CURSOR_API_KEY</code>, o pásala con <code>--api-key</code>.',
            'Ejecuta <code>agent status</code> para confirmar que has iniciado sesión y ver qué cuenta está activa. <code>agent logout</code> borra el login guardado.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Login sin navegador
NO_OPEN_BROWSER=1 agent login

# O con una API key
export CURSOR_API_KEY=tu_api_key

agent status`,
        },
        {
          type: 'paragraph',
          text: 'A partir de ahí, <code>agent</code> abre una sesión interactiva, <code>agent "tu prompt"</code> la abre con una tarea y <code>agent -p "tu prompt"</code> imprime la respuesta sin pantalla interactiva. Con <code>agent ls</code> y <code>agent resume</code> recuperas conversaciones anteriores.',
        },
      ],
    },
    {
      id: 'solucion-de-errores',
      title: 'Errores comunes en Linux y cómo arreglarlos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"agent: command not found" tras instalar:</strong> <code>~/.local/bin</code> todavía no está en tu PATH. Abre un terminal nuevo o añade <code>export PATH="$HOME/.local/bin:$PATH"</code> a tu <code>~/.bashrc</code> o <code>~/.zshrc</code>.',
            '<strong>"agent" abre otra herramienta:</strong> otro CLI se ha quedado ese nombre. Ejecuta <code>command -v agent</code> para ver cuál es y arranca Cursor con <code>cursor-agent</code>.',
            '<strong>"Unsupported architecture" al instalar:</strong> Cursor solo publica versiones para x64 y ARM64. Las de 32 bits y otras arquitecturas no tienen soporte.',
            '<strong>"Download failed" al instalar:</strong> tu máquina no llega al servidor de descargas de Cursor. Revisa la red o el proxy y vuelve a lanzar el instalador.',
            '<strong>El login no abre el navegador:</strong> usa <code>NO_OPEN_BROWSER=1 agent login</code> y abre tú la URL.',
            '<strong>Falla la autenticación:</strong> ejecuta <code>agent status</code> y después <code>agent login</code> otra vez, o comprueba que <code>CURSOR_API_KEY</code> tiene una clave válida.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El CLI se actualiza solo por defecto. Si quieres forzarlo, ejecuta <code>agent update</code> o vuelve a lanzar el instalador de una línea, que deja la última versión.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Cursor Agent en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Con Cursor Agent funcionando, el siguiente límite llega rápido: un terminal solo lleva una tarea a la vez. Le das un trabajo al agente y esperas. Abrir más pestañas en GNOME Terminal o en tmux ayuda, hasta que pierdes la cuenta de qué sesión ha terminado, cuál espera permiso y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de las demás distros), en x64 y ARM64. Pone varias sesiones de agentes una al lado de otra y añade notificaciones cuando una termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada una. Puedes combinar Cursor Agent con Claude Code, Codex y otros agentes en la misma ventana.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: la <a href="/es/guias/enjambre-de-agentes-cursor-cli" class="' + link + '">guía del enjambre de agentes con Cursor CLI</a> y la <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="' + link + '">guía de Cursor Agent CLI con ACP</a>, que explica cómo funciona el Chat con Cursor.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Cursor CLI está a un comando curl. Usa <code>cursor-agent</code> si otra herramienta ya tiene <code>agent</code>, inicia sesión con <code>NO_OPEN_BROWSER=1</code> en servidores y, cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varios a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cursor CLI funciona en Linux?',
      answer: 'Sí. Cursor CLI (Cursor Agent) funciona de forma nativa en Linux, en x64 y ARM64. Cursor lo instala con el mismo script de una línea que usa para macOS y WSL.',
    },
    {
      question: '¿Cómo instalo Cursor CLI en Ubuntu?',
      answer: 'Ejecuta "curl https://cursor.com/install -fsS | bash" en un terminal, abre otro terminal y escribe "agent". Si no encuentra el comando, añade ~/.local/bin a tu PATH en ~/.bashrc.',
    },
    {
      question: '¿Uso agent o cursor-agent en Linux?',
      answer: 'Los dos arrancan el mismo programa. agent es el nombre principal en la documentación de Cursor y cursor-agent es el nombre heredado. Si otro CLI, como Grok, ya tiene agent, usa cursor-agent.',
    },
    {
      question: '¿Puedo usar Cursor CLI en un servidor Linux por SSH?',
      answer: 'Sí. Ejecuta "NO_OPEN_BROWSER=1 agent login" y abre en cualquier otro dispositivo la URL que aparece, o define la variable de entorno CURSOR_API_KEY con una API key de usuario del panel de Cursor.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de las demás distros, en x64 y ARM64. Usa el Cursor Agent que ya tienes instalado y te deja trabajar con varias sesiones en paralelo.',
    },
  ],
}

export default guide
