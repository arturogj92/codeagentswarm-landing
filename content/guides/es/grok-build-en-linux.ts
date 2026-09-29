import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-en-linux',
    locale: 'es',
    title: 'Cómo instalar Grok Build en Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'Cómo instalar Grok Build en Linux: instalación, login y errores (2026)',
    metaDescription: 'Instala la CLI Grok Build de xAI en Linux con una línea. Requisitos, primer inicio de sesión, login por SSH con código de dispositivo, errores comunes y cómo usar varias sesiones de Grok Build a la vez.',
    intro: `Grok Build, el agente de programación de xAI para el terminal, funciona de forma nativa en Linux. Abre un terminal, ejecuta "curl -fsSL https://x.ai/cli/install.sh | bash", entra en la carpeta de tu proyecto, escribe "grok" e inicia sesión. El instalador trae binarios para x64 y ARM64 y no necesita sudo ni Node.js.

En esta guía vemos la instalación en una línea, qué toca el instalador en tu sistema, cómo iniciar sesión en un servidor sin navegador y los errores más habituales en Linux.

Cuando lo tengas funcionando, también te enseñamos a pasar de un terminal a varias sesiones de Grok Build trabajando en paralelo en la misma máquina Linux.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varios terminales de Grok Build en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'grok-build-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Grok Build en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el instalador oficial en cualquier terminal. Sin sudo y sin Node.js. Cuando termine, abre un terminal nuevo, escribe <code>grok</code> en tu proyecto e inicia sesión.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalador oficial
curl -fsSL https://x.ai/cli/install.sh | bash

# Comprueba la instalación
grok --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
grok`,
        },
        {
          type: 'paragraph',
          text: 'Para actualizar más adelante, usa <code>grok update</code>. Los comandos de esta guía salen de la <a href="https://docs.x.ai/build/overview" target="_blank" rel="noopener noreferrer" class="' + link + '">documentación oficial de Grok Build</a> y del <a href="https://github.com/xai-org/grok-build" target="_blank" rel="noopener noreferrer" class="' + link + '">repositorio oficial grok-build</a>, donde está la guía de usuario completa.',
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
            'Un Linux de 64 bits en x64 (x86_64) o ARM64 (aarch64). El instalador se detiene con cualquier otra arquitectura.',
            '<code>curl</code> o <code>wget</code>, además de Bash para ejecutar el script.',
            'Una cuenta de grok.com para el login en el navegador, o una API key de xAI sacada de <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" class="' + link + '">console.x.ai</a>.',
            'Conexión a internet.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No necesitas Node.js ni permisos de root. Grok Build es un binario nativo y el instalador solo escribe dentro de tu carpeta personal. Los planes y límites de uso cambian a menudo, así que revisa la <a href="/es/guias/precios-y-acceso-grok-build" class="' + link + '">guía de precios y acceso a Grok Build</a> antes de llevarlo a un equipo.',
        },
      ],
    },
    {
      id: 'que-hace-el-instalador',
      title: 'Qué cambia el instalador en tu sistema',
      content: [
        {
          type: 'list',
          items: [
            'Descarga el binario para tu arquitectura y lo enlaza como <code>~/.grok/bin/grok</code>, junto con un alias <code>agent</code>.',
            'Añade <code>~/.grok/bin</code> a tu PATH en <code>~/.bashrc</code>, <code>~/.zshrc</code> o la configuración de fish, según tu shell, e instala el autocompletado.',
            'Si <code>~/.local/bin</code> o <code>/usr/local/bin</code> ya están en tu PATH y puedes escribir en ellos, también crea ahí un enlace, así que <code>grok</code> funciona al momento.',
            'La configuración, las credenciales y las sesiones van en <code>~/.grok/</code>. Si quieres moverlas a otro sitio, define <code>GROK_HOME</code>.',
          ],
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
            'Abre un terminal en la carpeta de un proyecto y escribe <code>grok</code>.',
            'Se abre el navegador para que entres con tu cuenta de grok.com. Las credenciales se guardan en <code>~/.grok/auth.json</code> y se renuevan solas.',
            'En un servidor, por SSH o dentro de un contenedor, ejecuta <code>grok login --device-auth</code>. Te muestra una URL y un código: abre la URL en cualquier otro dispositivo, introduce el código y Grok Build detecta el login.',
            'Para CI o scripts, exporta <code>XAI_API_KEY</code>. Grok Build la usa cuando no hay una sesión activa.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Login sin navegador con código de dispositivo
grok login --device-auth

# O usa una API key
export XAI_API_KEY="xai-..."
grok`,
        },
        {
          type: 'paragraph',
          text: 'La <a href="https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/02-authentication.md" target="_blank" rel="noopener noreferrer" class="' + link + '">guía oficial de autenticación</a> explica también el SSO de empresa con OIDC y los scripts de autenticación externos.',
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
            '<strong>"grok: command not found" tras instalar:</strong> tu shell actual todavía no ha leído el nuevo PATH. Abre un terminal nuevo o ejecuta <code>export PATH="$HOME/.grok/bin:$PATH"</code>.',
            '<strong>"Either curl or wget is required but neither is installed":</strong> las imágenes mínimas suelen venir sin ninguno de los dos. Instala uno con tu gestor de paquetes y repite la instalación.',
            '<strong>"Unsupported architecture" o "Grok is not yet available for your system":</strong> no hay binario para tu máquina. Solo se publican versiones de 64 bits para x86_64 y aarch64.',
            '<strong>"Authentication failed":</strong> ejecuta <code>grok logout</code> para borrar las credenciales guardadas y después <code>grok login</code> (o <code>grok login --device-auth</code> por SSH).',
            '<strong>Copiar y pegar, los colores o las teclas fallan en tmux, por SSH o en Wayland:</strong> ejecuta <code>grok doctor</code> en tu shell, o <code>/doctor</code> dentro de Grok Build. Revisa el terminal, el multiplexor y el portapapeles y te dice cómo arreglar lo que encuentre.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Necesitas más detalle? Ejecuta <code>GROK_LOG_FILE=/tmp/grok.log RUST_LOG=debug grok</code> y sigue el log con <code>tail -f /tmp/grok.log</code>.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Grok Build en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Con Grok Build funcionando, el siguiente límite llega rápido: un terminal solo lleva una tarea a la vez. Le das un trabajo a Grok y esperas. Abrir más pestañas en GNOME Terminal o en tmux ayuda, hasta que pierdes la cuenta de qué sesión ha terminado, cuál espera tu aprobación y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'Varios terminales de agentes de IA en paralelo en una ventana de CodeAgentSwarm',
          src: '/images/guides/multi-terminal.png',
          caption: 'Varios terminales de agentes en paralelo en una ventana de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de las demás distros), en x64 y ARM64. Se descarga gratis. Elige Grok Build en cualquier terminal y úsalo junto a Claude Code, Codex y otros agentes, con notificaciones cuando un agente termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/como-usar-grok-build" class="' + link + '">cómo usar Grok Build</a> para los comandos del día a día, y <a href="/es/guias/grok-build-headless-ci" class="' + link + '">Grok Build en modo headless y CI</a> si tu máquina Linux es un servidor de builds.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Grok Build está a un comando curl, y <code>grok login --device-auth</code> resuelve los servidores sin navegador. Ejecuta <code>grok doctor</code> si algo falla, y cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varios a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Grok Build funciona en Linux?',
      answer: 'Sí. xAI publica binarios de Grok Build para Linux en x64 y ARM64. Se instalan con el script oficial de x.ai/cli/install.sh.',
    },
    {
      question: '¿Cómo instalo Grok Build en Ubuntu?',
      answer: 'Ejecuta "curl -fsSL https://x.ai/cli/install.sh | bash" en un terminal, abre otro terminal y escribe "grok". El mismo comando sirve en Debian, Fedora y otras distribuciones.',
    },
    {
      question: '¿Cómo inicio sesión en Grok Build por SSH?',
      answer: 'Ejecuta "grok login --device-auth" en el servidor. Te muestra una URL y un código; abre la URL en cualquier otro dispositivo y introduce el código. Para scripts y CI también puedes definir la variable de entorno XAI_API_KEY.',
    },
    {
      question: '¿Necesito sudo o Node.js para instalar Grok Build en Linux?',
      answer: 'No. Grok Build es un binario nativo y el instalador lo deja en ~/.grok/bin, dentro de tu carpeta personal, así que no necesita root ni Node.js.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de las demás distros, en x64 y ARM64. Usa el Grok Build que ya tienes instalado y te deja trabajar con varias sesiones en paralelo.',
    },
  ],
}

export default guide
