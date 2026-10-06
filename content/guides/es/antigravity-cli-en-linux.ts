import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-en-linux',
    locale: 'es',
    title: 'Cómo instalar Antigravity CLI en Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'Cómo instalar Antigravity CLI (agy) en Linux: Ubuntu, Debian, Fedora (2026)',
    metaDescription: 'Instala Antigravity CLI en Linux con una línea. Requisitos, inicio de sesión por SSH o con API key, errores comunes en Linux como el keyring bloqueado y cómo usar varias sesiones de agy a la vez.',
    intro: `Antigravity CLI funciona de forma nativa en Linux. Abre un terminal, ejecuta "curl -fsSL https://antigravity.google/cli/install.sh | bash", entra en la carpeta de tu proyecto, escribe "agy" e inicia sesión con tu cuenta de Google. Es un único binario, así que no tienes que instalar Node.js ni Python antes.

En esta guía vemos los requisitos (el que importa es tu versión de glibc), qué hace el instalador, cómo iniciar sesión en un escritorio, por SSH o con una API key, y los errores de Linux más habituales.

Cuando lo tengas funcionando, también te enseñamos a pasar de un terminal a varias sesiones de Antigravity trabajando en paralelo en la misma máquina Linux.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varios terminales de Antigravity CLI en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'antigravity-cli-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Antigravity CLI en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el instalador oficial en cualquier terminal. Sin sudo y sin Node.js. Cuando termine, abre un terminal nuevo, escribe <code>agy</code> en tu proyecto e inicia sesión.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalador oficial para macOS y Linux
curl -fsSL https://antigravity.google/cli/install.sh | bash

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
agy`,
        },
        {
          type: 'paragraph',
          text: 'Es el mismo comando que usa CodeAgentSwarm cuando instala Antigravity por ti en Linux. Todos los comandos de esta guía salen de la <a href="https://antigravity.google/docs/getting-started?tab=cli" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de primeros pasos de Antigravity CLI</a> y de su <a href="https://antigravity.google/docs/cli/install" target="_blank" rel="noopener noreferrer" class="' + link + '">guía de instalación y autenticación</a>.',
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
            'Un Linux de 64 bits en x64 o ARM64.',
            'glibc 2.28 o superior y glibcxx 3.4.25 o superior. Google pone como ejemplo Ubuntu 20, Debian 10, Fedora 36 y RHEL 8.',
            'Bash o Zsh, y <code>curl</code> para lanzar el instalador.',
            'Una cuenta de Google. Antigravity tiene un plan gratuito, y los planes de pago de Google AI suben los límites. En máquinas sin interfaz puedes usar una API key de Gemini.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Comprueba tu glibc con <code>ldd --version</code>. El requisito es glibc, así que las distros basadas en musl, como Alpine, no están en la lista de soporte.',
        },
      ],
    },
    {
      id: 'instalacion',
      title: 'Qué hace el instalador',
      content: [
        {
          type: 'paragraph',
          text: 'El script descarga el binario <code>agy</code> en <code>~/.local/bin/agy</code> y añade esa carpeta al PATH en el perfil de tu shell. No toca directorios del sistema, así que no necesita root. Por eso también conviene abrir un terminal nuevo al acabar: el que tienes abierto aún no ha leído el perfil actualizado.',
        },
        {
          type: 'paragraph',
          text: 'agy se actualiza solo en segundo plano, así que no hay paquete apt ni dnf que actualizar. Si prefieres controlar tú las versiones, define <code>AGY_CLI_DISABLE_AUTO_UPDATE=true</code> en tu entorno para desactivar el actualizador.',
        },
        {
          type: 'paragraph',
          text: 'Antigravity guarda sus ajustes y conversaciones en <code>~/.gemini</code>, la misma carpeta que usaba Gemini CLI. Si tenías Gemini CLI, el primer arranque te ofrece importar tu configuración antigua. La <a href="/es/guias/como-usar-antigravity-cli" class="' + link + '">guía para usar Antigravity CLI</a> explica esa importación y los comandos del día a día.',
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
            'Abre un terminal en la carpeta de un proyecto y escribe <code>agy</code>. El primer arranque te pregunta el esquema de colores, el modo de renderizado y si confías en el espacio de trabajo.',
            'En un escritorio Linux, agy guarda tus credenciales en el keyring del sistema mediante Secret Service (GNOME Keyring o KWallet). Según el caso, inicia sesión sin preguntarte o abre el navegador con el login de Google.',
            'Por SSH, agy muestra una URL de inicio de sesión. Ábrela en el navegador de tu ordenador y pega en el terminal el código que te da.',
            'En servidores sin interfaz o en CI, exporta <code>GEMINI_API_KEY</code> y pon <code>{"modelProvider": "gemini"}</code> en <code>~/.gemini/antigravity-cli/settings.json</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para cerrar sesión, ejecuta <code>/logout</code> dentro de agy. Desconecta tu cuenta y borra las credenciales guardadas.',
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
            '<strong>"bash: agy: command not found" tras instalar:</strong> <code>~/.local/bin</code> todavía no está en tu PATH. Abre un terminal nuevo o añade <code>export PATH="$HOME/.local/bin:$PATH"</code> a tu <code>~/.bashrc</code> o <code>~/.zshrc</code> y recárgalo con <code>source</code>.',
            '<strong>"secret keyring is locked":</strong> GNOME Keyring o KWallet está bloqueado o no responde. Desbloquéalo y, en una sesión sin interfaz o por SSH, arranca antes una sesión de D-Bus con <code>export $(dbus-launch)</code>. En servidores, la opción de la API key evita el keyring por completo.',
            '<strong>"local pasteboard is empty or unreachable over SSH connection":</strong> SSH no reenvía el portapapeles por sí solo. Usa un terminal que lo soporte, como Ghostty o iTerm2, y si trabajas dentro de tmux añade <code>set -s set-clipboard on</code> a su configuración.',
            '<strong>"another background updater process is already active (update.lock)":</strong> una actualización anterior se cayó y dejó el bloqueo puesto. Bórralo con <code>rm -f ~/.gemini/antigravity-cli/updater/update.lock</code> y comprueba que puedes escribir en <code>~/.local/bin</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para todo lo demás, consulta la <a href="https://antigravity.google/docs/cli/troubleshooting" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de solución de problemas de Antigravity CLI</a>.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Antigravity en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Una sesión de agy ya coordina sus propios subagentes para la tarea que tiene delante. Pero un terminal sigue siendo una sola tarea. Cuando quieres una funcionalidad en un proyecto y un arreglo en otro, abres más pestañas en GNOME Terminal o en tmux, y enseguida pierdes la cuenta de qué sesión ha terminado, cuál espera tu aprobación y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de las demás distros), en x64 y ARM64. Pone varios terminales de Antigravity uno al lado del otro y añade notificaciones cuando un agente termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal. Puedes combinar agy con Claude Code, Codex y otros agentes en la misma ventana, y cada sesión sigue usando tu propia cuenta de Google.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/ejecutar-multiples-sesiones-antigravity-cli" class="' + link + '">ejecutar múltiples sesiones de Antigravity CLI</a> y, si también trabajas en Windows, <a href="/es/guias/antigravity-cli-en-windows" class="' + link + '">Antigravity CLI en Windows</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Antigravity CLI está a un comando curl. Comprueba tu versión de glibc, abre un terminal nuevo después de instalar e inicia sesión con el navegador, con el código por SSH o con una API key. Cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varias sesiones de agy a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Antigravity CLI funciona en Linux?',
      answer: 'Sí. Antigravity CLI funciona de forma nativa en Linux, en x64 y ARM64. Necesita glibc 2.28 o superior, lo que cubre Ubuntu 20, Debian 10, Fedora 36, RHEL 8 y versiones posteriores.',
    },
    {
      question: '¿Cómo instalo Antigravity CLI en Ubuntu?',
      answer: 'Ejecuta "curl -fsSL https://antigravity.google/cli/install.sh | bash" en un terminal, abre otro terminal y escribe "agy". El binario se instala en ~/.local/bin/agy y se actualiza solo, así que no necesitas sudo ni un repositorio de paquetes.',
    },
    {
      question: '¿Necesito Node.js o Python para usar Antigravity CLI en Linux?',
      answer: 'No. Antigravity CLI es un único binario compilado. A diferencia de Gemini CLI, que se instalaba con npm, no hay ningún entorno que preparar antes.',
    },
    {
      question: '¿Puedo usar Antigravity CLI en un servidor Linux por SSH?',
      answer: 'Sí. Instálalo igual y ejecuta "agy". Por SSH muestra una URL de inicio de sesión que abres en el navegador de tu ordenador, y luego pegas el código en el terminal. Para un uso totalmente sin interfaz, define la variable de entorno GEMINI_API_KEY y elige el proveedor gemini en ~/.gemini/antigravity-cli/settings.json.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de las demás distros, en x64 y ARM64. Usa el Antigravity que ya tienes instalado y te deja trabajar con varias sesiones de agy en paralelo.',
    },
  ],
}

export default guide
