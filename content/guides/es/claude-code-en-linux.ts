import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-en-linux',
    locale: 'es',
    title: 'Cómo instalar Claude Code en Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'Cómo instalar Claude Code en Linux: Ubuntu, Debian, Fedora (2026)',
    metaDescription: 'Instala Claude Code en Linux con una línea o desde los repositorios oficiales apt, dnf y apk. Requisitos, login por SSH, errores comunes y cómo usar varias sesiones de Claude Code a la vez.',
    intro: `Claude Code funciona de forma nativa en Linux. Abre un terminal, ejecuta "curl -fsSL https://claude.ai/install.sh | bash", entra en la carpeta de tu proyecto, escribe "claude" e inicia sesión. Funciona en x64 y ARM64, y Anthropic da soporte oficial a Ubuntu 20.04+, Debian 10+ y Alpine 3.19+, con repositorios firmados para Debian, Ubuntu, Fedora, RHEL y Alpine.

En esta guía vemos la instalación en una línea, los repositorios apt y dnf (y cuándo conviene usarlos), cómo iniciar sesión en un servidor sin navegador, los errores más habituales y dónde encaja la app oficial de Claude para Linux.

Cuando lo tengas funcionando, también te enseñamos a pasar de un terminal a varias sesiones de Claude Code trabajando en paralelo en la misma máquina Linux.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varios terminales de Claude Code en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'claude-code-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Claude Code en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el instalador oficial en cualquier terminal. Sin sudo y sin Node.js. Cuando termine, abre un terminal nuevo, escribe <code>claude</code> en tu proyecto e inicia sesión.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalador nativo oficial (recomendado)
curl -fsSL https://claude.ai/install.sh | bash

# Comprueba la instalación
claude --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
claude`,
        },
        {
          type: 'paragraph',
          text: 'El instalador deja el lanzador en <code>~/.local/bin/claude</code> y se actualiza solo en segundo plano. Todos los comandos de esta guía salen de la <a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer" class="' + link + '">documentación oficial de instalación de Claude Code</a>.',
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
            'Un Linux de 64 bits en x64 o ARM64. Con soporte oficial: Ubuntu 20.04+, Debian 10+ y Alpine Linux 3.19+. Fedora y RHEL tienen repositorio dnf oficial.',
            'Al menos 4 GB de RAM y conexión a internet.',
            'Bash o Zsh.',
            'Una cuenta Claude Pro, Max, Team, Enterprise o Console. El plan gratuito de claude.ai no incluye Claude Code.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No necesitas Node.js. El paquete de npm sigue existiendo, pero solo descarga el mismo binario nativo, así que el instalador de una línea es más sencillo.',
        },
      ],
    },
    {
      id: 'gestores-de-paquetes',
      title: 'Instalar con apt o dnf (repositorios oficiales)',
      content: [
        {
          type: 'paragraph',
          text: 'Si prefieres que las actualizaciones lleguen con el resto del sistema, Anthropic publica repositorios firmados. A cambio, estas instalaciones no se actualizan solas: las actualizas como cualquier otro paquete.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ubuntu y Debian (apt)',
          id: 'apt',
        },
        {
          type: 'code',
          language: 'bash',
          code: `sudo apt install curl gnupg
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl -fsSL https://downloads.claude.ai/keys/claude-code.asc \\
  -o /etc/apt/keyrings/claude-code.asc
echo "deb [signed-by=/etc/apt/keyrings/claude-code.asc] https://downloads.claude.ai/claude-code/apt/stable stable main" \\
  | sudo tee /etc/apt/sources.list.d/claude-code.list
sudo apt update
sudo apt install claude-code

# Más adelante: sudo apt update && sudo apt upgrade claude-code`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Fedora y RHEL (dnf)',
          id: 'dnf',
        },
        {
          type: 'code',
          language: 'bash',
          code: `sudo tee /etc/yum.repos.d/claude-code.repo <<'EOF'
[claude-code]
name=Claude Code
baseurl=https://downloads.claude.ai/claude-code/rpm/stable
enabled=1
gpgcheck=1
gpgkey=https://downloads.claude.ai/keys/claude-code.asc
EOF
sudo dnf install claude-code

# Más adelante: sudo dnf upgrade claude-code`,
        },
        {
          type: 'paragraph',
          text: 'Los dos usan el canal <code>stable</code>, que suele ir una semana por detrás y se salta las versiones con fallos graves. Alpine también tiene repositorio apk, pero antes tienes que instalar <code>bash</code>, <code>curl</code>, <code>libgcc</code>, <code>libstdc++</code> y <code>ripgrep</code>.',
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
            'Abre un terminal en la carpeta de un proyecto y escribe <code>claude</code>.',
            'Se abre el navegador con el login de Anthropic. Entra con tu cuenta de Claude.',
            'En un servidor o por SSH, donde no se puede abrir un navegador, pulsa <code>c</code> para copiar la URL de login y ábrela en cualquier otro dispositivo.',
            'Si tienes definida la variable de entorno <code>ANTHROPIC_API_KEY</code>, Claude Code te pide aprobar esa clave una vez en lugar de abrir el navegador.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si después algo no cuadra, <code>claude doctor</code> muestra un informe de solo lectura de la instalación, los ajustes y el último intento de actualización.',
        },
      ],
    },
    {
      id: 'claude-desktop-en-linux',
      title: '¿Y la app de escritorio de Claude en Linux?',
      content: [
        {
          type: 'paragraph',
          text: 'Anthropic ya tiene una <a href="https://code.claude.com/docs/en/desktop-linux" target="_blank" rel="noopener noreferrer" class="' + link + '">app de escritorio de Claude para Linux</a> en beta, para Ubuntu 22.04+ y Debian 12+ en x64 y ARM64, e incluye Claude Code. Si quieres la app gráfica oficial para una conversación de Claude a la vez, empieza por ahí.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm resuelve otra cosa: tener varios agentes de terminal trabajando a la vez y no perderles la pista. Usa el CLI de Claude Code que acabas de instalar, lo combina con Codex y otros agentes en la misma ventana y también se distribuye como AppImage, así que funciona en Fedora y en la mayoría de distros.',
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
            '<strong>"claude: command not found" tras instalar:</strong> <code>~/.local/bin</code> todavía no está en tu PATH. Abre un terminal nuevo o añade <code>export PATH="$HOME/.local/bin:$PATH"</code> a tu <code>~/.bashrc</code> o <code>~/.zshrc</code>.',
            '<strong>"NO_PUBKEY BAA929FF1A7ECACE" al hacer apt update:</strong> la clave de firma no se descargó. Comprueba que tu red llega a <code>downloads.claude.ai</code> y repite la descarga de la clave.',
            '<strong>"not found" al lanzar el instalador en Alpine:</strong> Alpine no trae <code>bash</code> ni <code>curl</code> de serie. Instálalos con <code>apk add bash curl libgcc libstdc++ ripgrep</code>.',
            '<strong>La búsqueda dentro de Claude Code falla:</strong> Claude Code usa ripgrep. En distros con musl instálalo con tu gestor de paquetes y pon <code>USE_BUILTIN_RIPGREP=0</code>.',
            '<strong>Errores de permisos con npm:</strong> nunca uses <code>sudo npm install -g</code>. Pásate al instalador nativo, que no necesita root.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para todo lo demás, la <a href="https://code.claude.com/docs/en/troubleshoot-install" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de problemas de instalación</a> recoge cada error conocido con su solución.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Claude Code en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Con Claude Code funcionando, el siguiente límite llega rápido: un terminal solo lleva una tarea a la vez. Le das un trabajo a Claude y esperas. Abrir más pestañas en GNOME Terminal o en tmux ayuda, hasta que pierdes la cuenta de qué sesión ha terminado, cuál espera permiso y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de distros), en x64 y ARM64. Pone varios terminales de Claude Code uno al lado del otro y añade notificaciones cuando un agente termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/como-usar-varios-terminales-claude-code" class="' + link + '">cómo usar varios terminales de Claude Code</a> y <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="' + link + '">ejecutar múltiples sesiones de Claude Code</a>. ¿Vas a instalar Codex en la misma máquina? Mira <a href="/es/guias/codex-cli-en-linux" class="' + link + '">Codex CLI en Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Claude Code está a un comando curl, o a un apt o dnf si prefieres que lo gestione el sistema. Ejecuta <code>claude doctor</code> si algo falla, y cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varios a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Claude Code funciona en Linux?',
      answer: 'Sí. Claude Code funciona de forma nativa en Linux, en x64 y ARM64. Anthropic da soporte oficial a Ubuntu 20.04+, Debian 10+ y Alpine 3.19+, y publica repositorios firmados apt, dnf y apk, que cubren también Fedora y RHEL.',
    },
    {
      question: '¿Cómo instalo Claude Code en Ubuntu?',
      answer: 'Ejecuta "curl -fsSL https://claude.ai/install.sh | bash" en un terminal, abre otro terminal y escribe "claude". Si prefieres apt, añade el repositorio oficial de Claude Code y ejecuta "sudo apt install claude-code". La versión de apt no se actualiza sola.',
    },
    {
      question: '¿Necesito Node.js para usar Claude Code en Linux?',
      answer: 'No. El instalador nativo y los paquetes apt, dnf y apk instalan un binario independiente. Node.js solo entra en juego si eliges el paquete de npm, e incluso entonces el binario no usa Node al ejecutarse.',
    },
    {
      question: '¿Puedo usar Claude Code en un servidor Linux por SSH?',
      answer: 'Sí. Instálalo igual, ejecuta "claude" y, cuando te pida iniciar sesión, pulsa "c" para copiar la URL y ábrela en el navegador de cualquier otro dispositivo. También puedes usar una API key con la variable de entorno ANTHROPIC_API_KEY.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de distros, en x64 y ARM64. Usa el Claude Code que ya tienes instalado y te deja trabajar con varias sesiones en paralelo.',
    },
  ],
}

export default guide
