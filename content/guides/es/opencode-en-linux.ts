import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'opencode-en-linux',
    locale: 'es',
    title: 'Cómo instalar OpenCode en Linux (Ubuntu, Debian, Fedora, Arch)',
    metaTitle: 'Cómo instalar OpenCode en Linux: Ubuntu, Debian, Fedora, Arch (2026)',
    metaDescription: 'Instala OpenCode en Linux con el script oficial de una línea, npm, Homebrew o pacman. Requisitos, cómo conectar un proveedor por SSH, arreglos de portapapeles y PATH, y cómo usar varias sesiones de OpenCode a la vez.',
    intro: `OpenCode funciona de forma nativa en Linux. Abre un terminal, ejecuta "curl -fsSL https://opencode.ai/install | bash", entra en la carpeta de tu proyecto, escribe "opencode" y conecta un proveedor de modelos con /connect. El script elige la versión correcta para x64 o ARM64, también en distros con musl como Alpine.

En esta guía vemos la instalación en una línea, las alternativas con gestores de paquetes (npm, Homebrew, pacman y AUR), cómo conectar un proveedor en un servidor sin navegador, los errores más habituales en Linux y dónde guarda OpenCode sus archivos.

Cuando lo tengas funcionando, también te enseñamos a pasar de un terminal a varias sesiones de OpenCode trabajando en paralelo en la misma máquina Linux.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varios terminales de OpenCode en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'opencode',
    highlightedWords: ['OpenCode', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'opencode-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala OpenCode en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el script oficial en cualquier terminal. Sin sudo y sin Node.js. Cuando termine, abre un terminal nuevo, escribe <code>opencode</code> en tu proyecto y ejecuta <code>/connect</code> para añadir un proveedor.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Script de instalación oficial (recomendado)
curl -fsSL https://opencode.ai/install | bash

# Comprueba la instalación
opencode --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
opencode`,
        },
        {
          type: 'paragraph',
          text: 'El script detecta tu arquitectura (x64 o ARM64) y si tu sistema usa musl, descarga el binario que toca y añade su carpeta al PATH en la configuración de tu shell. Es también el comando que usa CodeAgentSwarm cuando instala OpenCode por ti en Linux. Todos los comandos de esta guía salen de la <a href="https://opencode.ai/docs" target="_blank" rel="noopener noreferrer" class="' + link + '">documentación oficial de OpenCode</a>.',
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
            'Un Linux de 64 bits en x64 o ARM64. El script funciona en distros con glibc (Ubuntu, Debian, Fedora, Arch) y con musl, como Alpine.',
            '<code>curl</code> y <code>tar</code> para el script de instalación. Casi todas las distros traen los dos.',
            'Un emulador de terminal moderno. La documentación pone como ejemplo WezTerm, Alacritty, Ghostty y Kitty.',
            'Una cuenta o API key de al menos un proveedor de modelos (Anthropic, OpenAI, Google, GitHub Copilot u otro). OpenCode no te ata a un único proveedor.',
            'En un escritorio, una herramienta de portapapeles: <code>xclip</code> o <code>xsel</code> en X11, o <code>wl-clipboard</code> en Wayland.',
          ],
        },
      ],
    },
    {
      id: 'gestores-de-paquetes',
      title: 'Otras formas de instalarlo: npm, Homebrew, pacman',
      content: [
        {
          type: 'paragraph',
          text: 'Si prefieres un gestor de paquetes, OpenCode publica varias opciones oficiales. Elige una y quédate con ella, para no acabar con dos copias en el PATH.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# npm (también vale bun, pnpm o yarn)
npm install -g opencode-ai

# Homebrew en Linux
brew install anomalyco/tap/opencode

# Arch Linux (estable)
sudo pacman -S opencode

# Arch Linux, lo último desde AUR
paru -S opencode-bin`,
        },
        {
          type: 'paragraph',
          text: '¿Quieres el binario en una carpeta concreta? El script mira primero <code>$OPENCODE_INSTALL_DIR</code>, luego <code>$XDG_BIN_DIR</code>, luego <code>$HOME/bin</code>, y si no, usa <code>$HOME/.opencode/bin</code>. Por ejemplo: <code>XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://opencode.ai/install | bash</code>. Para actualizar más adelante, ejecuta <code>opencode upgrade</code>.',
        },
      ],
    },
    {
      id: 'primer-arranque-y-login',
      title: 'Primer arranque y conexión de un proveedor (también por SSH)',
      content: [
        {
          type: 'list',
          items: [
            'Abre un terminal en la carpeta de un proyecto y escribe <code>opencode</code>.',
            'Ejecuta <code>/connect</code>, busca tu proveedor y pega una API key, o sigue el inicio de sesión en el navegador si el proveedor lo ofrece (como ChatGPT Plus/Pro o GitHub Copilot).',
            'Ejecuta <code>/models</code> para elegir modelo y después <code>/init</code> para que OpenCode analice el proyecto y cree un archivo <code>AGENTS.md</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'En un servidor o por SSH, lo más sencillo es usar una API key: ejecuta <code>opencode auth login</code>, elige el proveedor y pega la clave. Varios proveedores también leen sus credenciales de variables de entorno, que puedes definir en el perfil de tu shell. Todo lo que añadas se guarda en <code>~/.local/share/opencode/auth.json</code>, y <code>opencode auth list</code> te dice qué proveedores tienes conectados.',
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
            '<strong>"opencode: command not found" tras instalar:</strong> tu shell aún no ha recargado el PATH. Abre un terminal nuevo o añade <code>export PATH=$HOME/.opencode/bin:$PATH</code> (o la carpeta que indicó el script) a tu <code>~/.bashrc</code> o <code>~/.zshrc</code>.',
            '<strong>"Error: \'tar\' is required but not installed":</strong> pasa en imágenes mínimas y contenedores. Instala <code>tar</code> con tu gestor de paquetes y vuelve a lanzar el script.',
            '<strong>Copiar y pegar no hace nada:</strong> en Linux OpenCode necesita una herramienta de portapapeles. Instala <code>wl-clipboard</code> en Wayland, o <code>xclip</code> o <code>xsel</code> en X11.',
            '<strong>ProviderInitError o configuración rota:</strong> borra <code>~/.local/share/opencode</code> y vuelve a conectar tu proveedor con <code>/connect</code>. Ojo, esto también borra las credenciales guardadas.',
            '<strong>Errores de llamadas a la API tras actualizar:</strong> puede que haya un paquete de proveedor antiguo en caché. Ejecuta <code>rm -rf ~/.cache/opencode</code> y vuelve a abrir OpenCode.',
            '<strong>No arranca:</strong> ejecuta <code>opencode --print-logs</code> para ver qué falla y asegúrate de tener la última versión con <code>opencode upgrade</code>. Los logs están en <code>~/.local/share/opencode/log/</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para todo lo demás, la <a href="https://opencode.ai/docs/troubleshooting/" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de problemas de OpenCode</a> explica los logs, el almacenamiento y las soluciones conocidas.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de OpenCode en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Con OpenCode funcionando, el siguiente límite llega rápido: un terminal solo lleva una tarea a la vez. Le das un trabajo a OpenCode y esperas. Abrir más pestañas en GNOME Terminal o en tmux ayuda, hasta que pierdes la cuenta de qué sesión ha terminado, cuál espera tu aprobación y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de las demás distros), en x64 y ARM64. Pone varios terminales de OpenCode uno al lado del otro y añade notificaciones cuando un agente termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal. Además puedes combinar OpenCode con Claude Code, Codex y otros agentes en la misma ventana.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/ejecutar-multiples-sesiones-opencode" class="' + link + '">ejecutar múltiples sesiones de OpenCode</a> y <a href="/es/guias/enjambre-de-agentes-opencode" class="' + link + '">montar un enjambre de agentes OpenCode</a>. ¿Vas a instalar otros agentes en la misma máquina? Mira <a href="/es/guias/claude-code-en-linux" class="' + link + '">Claude Code en Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, OpenCode está a un comando curl, o a un npm, brew o pacman si prefieres un gestor de paquetes. Conecta un proveedor con <code>/connect</code> o <code>opencode auth login</code>, instala una herramienta de portapapeles y revisa los logs si algo falla. Cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varios a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿OpenCode funciona en Linux?',
      answer: 'Sí. OpenCode funciona de forma nativa en Linux, en x64 y ARM64. El script oficial detecta también distros con musl como Alpine, y hay paquetes oficiales para npm, Homebrew, pacman y AUR.',
    },
    {
      question: '¿Cómo instalo OpenCode en Ubuntu?',
      answer: 'Ejecuta "curl -fsSL https://opencode.ai/install | bash" en un terminal, abre otro terminal y escribe "opencode". Si ya usas Node.js, "npm install -g opencode-ai" también funciona.',
    },
    {
      question: '¿Necesito Node.js para usar OpenCode en Linux?',
      answer: 'No. El script de instalación, Homebrew y pacman instalan un binario independiente. Node.js solo hace falta si eliges el paquete de npm, bun, pnpm o yarn.',
    },
    {
      question: '¿Puedo usar OpenCode en un servidor Linux por SSH?',
      answer: 'Sí. Instálalo igual, ejecuta "opencode auth login" y pega una API key de tu proveedor. No hace falta navegador. Las credenciales se guardan en ~/.local/share/opencode/auth.json.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de las demás distros, en x64 y ARM64. Funciona con OpenCode y te deja trabajar con varias sesiones en paralelo.',
    },
  ],
}

export default guide
