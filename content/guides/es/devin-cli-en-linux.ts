import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'devin-cli-en-linux',
    locale: 'es',
    title: 'Cómo instalar Devin CLI en Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'Devin CLI en Linux: instalación, login por SSH y errores (2026)',
    metaDescription: 'Instala Devin CLI en Linux con el script oficial de una línea. Requisitos, dónde se instala, login en un servidor por SSH, errores habituales y cómo usar varias sesiones de Devin a la vez.',
    intro: `Devin CLI funciona de forma nativa en Linux. Abre un terminal, ejecuta "curl -fsSL https://cli.devin.ai/install.sh | bash", sigue el asistente de configuración que se abre al final, entra en la carpeta de tu proyecto y escribe "devin". El instalador es compatible con equipos x64 y ARM64.

En esta guía vemos la instalación, qué deja en tu sistema, cómo iniciar sesión en un servidor sin navegador, los errores que más te vas a encontrar y cómo revisar tu configuración.

Cuando lo tengas funcionando, también te enseñamos a usar varias sesiones de Devin en paralelo en la misma máquina Linux, junto a otros agentes como Claude Code o Codex.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis, instala Devin CLI desde la app y usa varios terminales de Devin en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'devin',
    highlightedWords: ['Devin CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'devin-cli-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Devin CLI en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el instalador oficial en cualquier terminal. No hace falta sudo. Al terminar lanza <code>devin setup</code>, un asistente corto para el login y MCP. Después abre un terminal nuevo y escribe <code>devin</code> en tu proyecto.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalador oficial para macOS, Linux y WSL
curl -fsSL https://cli.devin.ai/install.sh | bash

# Comprueba la instalación
devin --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
devin`,
        },
        {
          type: 'paragraph',
          text: 'Los comandos de esta guía salen de la <a href="https://docs.devin.ai/cli" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de instalación de Devin CLI</a> y de la <a href="https://docs.devin.ai/cli/reference/commands" target="_blank" rel="noopener noreferrer" class="' + link + '">referencia oficial de comandos</a>.',
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
            'Un Linux de 64 bits en x64 (x86_64) o ARM64 (aarch64). En cualquier otra arquitectura el instalador se detiene con "Unsupported platform".',
            'Bash y <code>curl</code>, además de <code>tar</code> y <code>sha256sum</code> (o <code>shasum</code>). El instalador los usa para descargar la versión y comprobar su checksum.',
            'Una cuenta de Devin con acceso a la CLI. En los planes Enterprise, tu administrador tiene que asignarte un rol con el permiso "Use Devin CLI".',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cognition no publica una lista de distribuciones compatibles. El instalador solo mira el sistema operativo y la arquitectura, así que el mismo comando sirve en Ubuntu, Debian, Fedora y WSL.',
        },
      ],
    },
    {
      id: 'que-se-instala',
      title: 'Qué deja el instalador en tu sistema',
      content: [
        {
          type: 'table',
          headers: ['Elemento', 'Ubicación en Linux'],
          rows: [
            ['Lanzador', '<code>~/.local/bin/devin</code>'],
            ['Versiones instaladas', '<code>~/.local/share/devin/cli/_versions</code>'],
            ['Token de sesión', '<code>~/.local/share/devin/credentials.toml</code>'],
          ],
          caption: 'Si tienes definida XDG_DATA_HOME, las dos últimas carpetas cuelgan de ella en lugar de ~/.local/share.',
        },
        {
          type: 'paragraph',
          text: 'Todo se queda en tu carpeta personal, por eso no necesitas sudo. Para actualizar más adelante, ejecuta <code>devin update</code>. Añade <code>--force</code> si quieres reinstalar la versión actual.',
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
            'El instalador lanza <code>devin setup</code> al terminar. Te guía por el login y la configuración de MCP. Puedes volver a ejecutarlo cuando quieras.',
            'Para iniciar sesión por separado, ejecuta <code>devin auth login</code>. Abre el login en el navegador.',
            'En un servidor o por SSH, donde no se puede abrir un navegador, ejecuta <code>devin auth login --force-manual-token-flow</code> y pega el token a mano. <code>devin setup --force-manual-token-flow</code> hace lo mismo dentro del asistente.',
            'Comprueba el resultado con <code>devin auth status</code>. <code>devin auth logout</code> borra las credenciales guardadas.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El token de <code>credentials.toml</code> no caduca por defecto. Cualquiera que pueda leer ese archivo puede usar tu cuenta, así que no lo metas en copias de seguridad que compartas y nunca lo subas a un repositorio.',
        },
        {
          type: 'paragraph',
          text: 'Si usas Enterprise, elige "Log in with Devin for Enterprise" para entrar con el proveedor de identidad de tu empresa. Mira la <a href="https://docs.devin.ai/cli/enterprise/devin-auth" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de autenticación</a>.',
        },
      ],
    },
    {
      id: 'solucion-de-problemas',
      title: 'Errores habituales en Linux y cómo arreglarlos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"devin: command not found" después de instalar:</strong> <code>~/.local/bin</code> no está en tu PATH. Abre un terminal nuevo o añade <code>export PATH="$HOME/.local/bin:$PATH"</code> a tu <code>~/.bashrc</code> o <code>~/.zshrc</code>.',
            '<strong>"Error: Unsupported platform":</strong> tu máquina no es x86_64 ni aarch64. Compruébalo con <code>uname -m</code>. Los sistemas de 32 bits no tienen soporte.',
            '<strong>"Cannot verify checksum (no sha256sum or shasum)":</strong> instala coreutils (que trae <code>sha256sum</code>) con tu gestor de paquetes y vuelve a lanzar el instalador.',
            '<strong>"Failed to fetch manifest":</strong> la máquina no llega a los servidores de descarga de Devin. Revisa el proxy o el cortafuegos y prueba otra vez.',
            '<strong>El login no termina nunca por SSH:</strong> el flujo del navegador no puede llegar a tu servidor. Usa <code>--force-manual-token-flow</code> como se explica arriba.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para todo lo demás, ejecuta <code>devin doctor</code>. Revisa tu configuración local y termina con error si algo falla.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Devin en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Con Devin funcionando, el siguiente límite llega rápido: un terminal solo lleva una tarea a la vez. Le das un trabajo a Devin y esperas. Abrir más pestañas en GNOME Terminal o en tmux ayuda, hasta que pierdes la cuenta de qué sesión ha terminado, cuál te está esperando y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de las demás distros), en x64 y ARM64. En Linux puede instalarte Devin CLI y lanzarlo. Pone varios terminales de agentes uno al lado del otro, mezcla Devin con Claude Code, Codex y otros agentes, y añade notificaciones de escritorio, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/como-usar-devin-cli" class="' + link + '">cómo usar Devin CLI</a> para tus primeras tareas y <a href="/es/guias/devin-cli-mcp-historial" class="' + link + '">MCP e historial en Devin CLI</a> para retomar conversaciones y añadir herramientas.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Devin CLI está a un comando curl y vive en tu carpeta personal. Usa <code>--force-manual-token-flow</code> para iniciar sesión por SSH, <code>devin doctor</code> cuando algo no cuadre y <code>devin update</code> para tenerlo al día. Cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varios a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Devin CLI funciona en Linux?',
      answer: 'Sí. El instalador oficial es compatible con Linux en x64 y ARM64, y también funciona dentro de WSL. Cognition no publica una lista de distribuciones compatibles; el instalador solo comprueba la arquitectura.',
    },
    {
      question: '¿Cómo instalo Devin CLI en Ubuntu?',
      answer: 'Ejecuta "curl -fsSL https://cli.devin.ai/install.sh | bash" en un terminal, completa el asistente de configuración, abre otro terminal y escribe "devin". El mismo comando sirve en Debian, Fedora y otras distribuciones.',
    },
    {
      question: '¿Puedo iniciar sesión en Devin CLI en un servidor por SSH?',
      answer: 'Sí. Ejecuta "devin auth login --force-manual-token-flow" para saltarte el navegador y pegar el token a mano. Después comprueba el resultado con "devin auth status".',
    },
    {
      question: '¿Cómo actualizo Devin CLI en Linux?',
      answer: 'Ejecuta "devin update". Busca una versión nueva y la instala. Usa "devin update --force" para reinstalar la versión actual.',
    },
    {
      question: '¿CodeAgentSwarm es compatible con Devin en Linux?',
      answer: 'CodeAgentSwarm funciona en Linux como .deb o AppImage, en x64 y ARM64, y puede instalar y lanzar Devin CLI en Linux. Puedes usar varias sesiones de Devin en paralelo y mezclarlas con otros agentes.',
    },
  ],
}

export default guide
