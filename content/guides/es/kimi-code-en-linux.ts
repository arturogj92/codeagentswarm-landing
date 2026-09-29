import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-en-linux',
    locale: 'es',
    title: 'Cómo instalar Kimi Code en Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'Cómo instalar Kimi Code en Linux: instalación, login y errores (2026)',
    metaDescription: 'Instala Kimi Code en Linux con el script oficial de una línea o con npm. Requisitos, soporte x64 y ARM64, login por SSH, el caso de Alpine, errores comunes y cómo usar varias sesiones de Kimi Code a la vez.',
    intro: `Kimi Code funciona en Linux con un solo comando. Abre un terminal, ejecuta "curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash", abre otro terminal, entra en la carpeta de tu proyecto, escribe "kimi" e inicia sesión con /login. El instalador trae binarios nativos para x64 y ARM64 y no necesita Node.js.

En esta guía vemos la instalación en una línea, la alternativa con npm (y el único caso en el que la necesitas), cómo iniciar sesión en un servidor sin navegador, los errores más habituales y dónde guarda Kimi Code sus datos.

Cuando lo tengas funcionando, también te enseñamos a pasar de un terminal a varias sesiones de Kimi Code trabajando en paralelo en la misma máquina Linux.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varios terminales de Kimi Code en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'kimi-code-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Kimi Code en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el script oficial en cualquier terminal. Sin sudo y sin Node.js. Cuando termine, abre un terminal nuevo, escribe <code>kimi</code> en tu proyecto y ejecuta <code>/login</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Script de instalación oficial (recomendado)
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash

# Abre un terminal nuevo y comprueba la instalación
kimi --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
kimi`,
        },
        {
          type: 'paragraph',
          text: 'El script descarga la última versión para tu arquitectura, comprueba el checksum, la instala en <code>~/.kimi-code/bin</code> y añade esa carpeta a tu PATH en <code>~/.bashrc</code>, <code>~/.zshrc</code> o la configuración de fish. Los pasos de instalación y login de esta guía salen de la <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/guides/getting-started" target="_blank" rel="noopener noreferrer" class="' + link + '">guía oficial de primeros pasos de Kimi Code</a>.',
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
            'Un Linux de 64 bits en x64 o ARM64 con glibc. Eso incluye Ubuntu, Debian, Fedora y la mayoría de distros habituales.',
            '<code>curl</code> o <code>wget</code> para descargar, y <code>sha256sum</code> (o <code>shasum</code>) para que el script pueda verificar la descarga.',
            'Bash, Zsh o fish.',
            'Una cuenta de Kimi si usas un plan de suscripción, o una API key de la plataforma de Kimi si pagas por tokens.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Solo necesitas Node.js 22.19.0 o superior si lo instalas con npm en vez de con el script. El script instala un binario independiente.',
        },
      ],
    },
    {
      id: 'instalar-con-npm',
      title: 'Instalar con npm (y el caso de Alpine)',
      content: [
        {
          type: 'paragraph',
          text: 'Si ya gestionas tus herramientas de terminal con Node, Kimi Code está en npm como <code>@moonshot-ai/kimi-code</code>. Ojo con el nombre: el paquete de PyPI llamado <code>kimi-code</code> instala el antiguo kimi-cli de Python, no este.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Necesita Node.js 22.19.0 o superior
node --version

npm install -g @moonshot-ai/kimi-code
# o bien
pnpm add -g @moonshot-ai/kimi-code`,
        },
        {
          type: 'paragraph',
          text: 'En Alpine y otras distros con musl, npm es la única vía: el script solo trae binarios para glibc y se detiene al detectar musl. Las actualizaciones funcionan igual en los dos casos: ejecuta <code>kimi upgrade</code>, o <code>npm install -g @moonshot-ai/kimi-code@latest</code> si usaste npm.',
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
            'Abre un terminal en la carpeta de un proyecto y escribe <code>kimi</code>.',
            'Dentro de la sesión, ejecuta <code>/login</code> y elige cómo entrar.',
            '<strong>Cuenta de Kimi:</strong> un flujo con código de dispositivo. Kimi Code te muestra un enlace y un código; abre el enlace en cualquier dispositivo, inicia sesión e introduce el código. Como el navegador no tiene que estar en la misma máquina, también funciona en un servidor por SSH.',
            '<strong>API key:</strong> pega una clave de <code>platform.kimi.com</code> o <code>platform.kimi.ai</code> si pagas por tokens.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Kimi Code guarda sus datos en <code>~/.kimi-code/</code>: la configuración en <code>config.toml</code>, los tokens OAuth en <code>credentials/</code>, las sesiones en <code>sessions/</code> y un log de diagnóstico en <code>logs/kimi-code.log</code>. Para moverlo todo a otra carpeta, usa la variable <code>KIMI_CODE_HOME</code>. Para borrar tus credenciales, ejecuta <code>/logout</code>. La <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/configuration/data-locations.html" target="_blank" rel="noopener noreferrer" class="' + link + '">referencia oficial de ubicaciones de datos</a> detalla cada archivo.',
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
            '<strong>"kimi: command not found" tras instalar:</strong> tu shell todavía no ha leído el nuevo PATH. Abre un terminal nuevo o comprueba que tu configuración de shell tiene la línea <code>export PATH="$HOME/.kimi-code/bin:$PATH"</code>.',
            '<strong>"Alpine / musl Linux is not currently supported":</strong> el script solo trae binarios para glibc. Instala Node.js 22.19 o superior y usa <code>npm install -g @moonshot-ai/kimi-code</code>.',
            '<strong>"curl or wget is required" o "shasum or sha256sum required to verify download":</strong> pasa a menudo en contenedores mínimos. Instala curl y coreutils con tu gestor de paquetes y vuelve a lanzar el script.',
            '<strong>"unsupported architecture":</strong> el script solo cubre x64 y ARM64. En cualquier otra, prueba con el paquete de npm.',
            '<strong><code>kimi --version</code> muestra 1.4x:</strong> estás usando el antiguo kimi-cli de Python. Kimi Code muestra una versión 0.x. El script renombra el <code>kimi</code> antiguo a <code>kimi-legacy</code> para que se use el nuevo.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si más adelante una sesión da problemas, mira primero <code>~/.kimi-code/logs/kimi-code.log</code>. Para los comandos y opciones del día a día, tienes <a href="/es/guias/como-usar-kimi-code" class="' + link + '">cómo usar Kimi Code</a>.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Kimi Code en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Con Kimi Code funcionando, el siguiente límite llega rápido: un terminal solo lleva una tarea a la vez. Le das un trabajo a Kimi y esperas. Abrir más pestañas en GNOME Terminal o en tmux ayuda, hasta que pierdes la cuenta de qué sesión ha terminado, cuál espera tu aprobación y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'Varios terminales de agentes de IA en paralelo en una ventana de CodeAgentSwarm',
          src: '/images/guides/multi-terminal.png',
          caption: 'Varios terminales de agentes en paralelo en una ventana de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de las demás distros), en x64 y ARM64. Pone varios terminales de Kimi Code uno al lado del otro y añade notificaciones cuando un agente termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal. También puedes mezclar agentes: Kimi Code en un terminal y Claude Code o Codex en el de al lado.',
        },
        {
          type: 'paragraph',
          text: 'Siguiente paso: <a href="/es/guias/ejecutar-multiples-sesiones-kimi-code" class="' + link + '">ejecutar múltiples sesiones de Kimi Code</a>. ¿Vas a instalar Claude Code en la misma máquina? Mira <a href="/es/guias/claude-code-en-linux" class="' + link + '">Claude Code en Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Kimi Code está a un comando curl, o a un npm install si usas Alpine o prefieres Node. Inicia sesión con <code>/login</code>, que también funciona por SSH, revisa <code>~/.kimi-code/logs</code> si algo falla, y cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varios a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Kimi Code funciona en Linux?',
      answer: 'Sí. El script oficial de instalación funciona en Linux x64 y ARM64 con glibc, lo que incluye Ubuntu, Debian, Fedora y la mayoría de distros habituales. En Alpine y otras distros con musl, instálalo con npm.',
    },
    {
      question: '¿Cómo instalo Kimi Code en Ubuntu?',
      answer: 'Ejecuta "curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash" en un terminal, abre otro terminal y escribe "kimi". Si prefieres npm, ejecuta "npm install -g @moonshot-ai/kimi-code" con Node.js 22.19 o superior. Para actualizar, usa "kimi upgrade".',
    },
    {
      question: '¿Necesito Node.js para usar Kimi Code en Linux?',
      answer: 'No. El script instala un binario independiente en ~/.kimi-code/bin. Solo necesitas Node.js 22.19.0 o superior si eliges el paquete de npm, que también es la vía para Alpine.',
    },
    {
      question: '¿Puedo iniciar sesión en Kimi Code en un servidor Linux por SSH?',
      answer: 'Sí. Ejecuta "kimi", luego "/login" y elige la opción de cuenta de Kimi. Usa un código de dispositivo: abre el enlace en cualquier dispositivo, inicia sesión e introduce el código. También puedes pegar una API key de la plataforma de Kimi.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de las demás distros, en x64 y ARM64. Usa el Kimi Code que ya tienes instalado y te deja trabajar con varias sesiones en paralelo, junto a Claude Code, Codex y otros agentes.',
    },
  ],
}

export default guide
