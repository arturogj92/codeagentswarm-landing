import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'muse-code-en-linux',
    locale: 'es',
    title: 'Cómo instalar Muse Code (Meta) en Linux',
    metaTitle: 'Cómo instalar Muse Code (Meta) en Linux: instalación, login y errores (2026)',
    metaDescription: 'Instala Muse Code de Meta en Linux con el instalador oficial de una línea. Requisitos, login con navegador o API key, servidores por SSH, errores comunes y cómo usar varias sesiones de Muse a la vez.',
    intro: `Muse Code, el agente de programación de Meta para el terminal, funciona en Linux. Abre un terminal, ejecuta "curl -fsSL https://dev.meta.ai/install.sh | bash", entra en la carpeta de tu proyecto, escribe "muse" e inicia sesión con tu cuenta de Meta o con una API key.

En esta guía vemos la instalación, qué cambia el instalador en tu sistema, cómo iniciar sesión en una máquina sin navegador, el sandbox de Linux y los errores con los que más te vas a encontrar.

Cuando lo tengas funcionando, también te enseñamos a usar varias sesiones de Muse en paralelo en la misma máquina Linux, junto a otros agentes como Claude Code o Codex.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64) y puede instalar y abrir Muse Code por ti. Descárgalo gratis y ejecuta varios terminales de agentes en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'muse',
    highlightedWords: ['Muse Code', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'muse-code-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Muse Code en Linux en una línea',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el instalador oficial en cualquier terminal. No necesitas sudo. Cuando termine, abre otro terminal, escribe <code>muse</code> en tu proyecto e inicia sesión.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalador oficial para macOS y Linux
curl -fsSL https://dev.meta.ai/install.sh | bash

# Comprueba la instalación
muse --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
muse`,
        },
        {
          type: 'paragraph',
          text: 'La documentación oficial pasa el script a <code>sh</code>, pero está escrito para Bash, así que pasárselo a <code>bash</code> es lo más seguro en Ubuntu y Debian, donde <code>sh</code> es otro shell. Es también lo que ejecuta CodeAgentSwarm cuando instala Muse por ti. Los comandos de esta guía salen de la <a href="https://dev.meta.ai/docs/muse-code" target="_blank" rel="noopener noreferrer" class="' + link + '">documentación oficial de Muse Code</a>.',
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
            'Un Linux con <code>curl</code> y <code>mktemp</code> disponibles. Si falta alguno, el instalador se para con "required command not found".',
            'Bash, Zsh o fish. El instalador añade Muse al PATH en el archivo de arranque que toque.',
            'Una cuenta de Meta para entrar con el navegador, o una API key de Meta.',
            'Un sandbox que funcione. En Linux, Muse Code ejecuta los comandos de shell dentro de un helper de bubblewrap que trae incluido.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'La documentación de Meta da a Linux las mismas funciones que a macOS, con entrada por voz y mensajes entre sesiones locales. Ninguna de las dos está disponible en Windows.',
        },
      ],
    },
    {
      id: 'que-cambia-el-instalador',
      title: 'Qué cambia el instalador',
      content: [
        {
          type: 'paragraph',
          text: 'El script descarga el lanzador de Muse, comprueba su checksum y lo deja en <code>~/.local/bin/muse</code>. Puedes elegir otra carpeta con la variable de entorno <code>MUSE_INSTALL_DIR</code>.',
        },
        {
          type: 'paragraph',
          text: 'Si <code>~/.local/bin</code> aún no está en tu PATH, añade una línea a <code>~/.bashrc</code>, <code>~/.zshrc</code>, tu configuración de fish o <code>~/.profile</code>, según tu shell. Define <code>MUSE_NO_MODIFY_PATH</code> si prefieres tocar el PATH tú.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalar en otra carpeta
curl -fsSL https://dev.meta.ai/install.sh | MUSE_INSTALL_DIR="$HOME/bin" bash`,
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
            'Abre un terminal en la carpeta de un proyecto y escribe <code>muse</code>.',
            'Muse te pregunta si confías en ese espacio de trabajo. Di que sí solo en carpetas tuyas.',
            'Elige entrar con el navegador para aprobar la sesión allí, o pega directamente una API key de Meta.',
            'Escribe <code>/login</code> dentro de una sesión para volver a ver las opciones de login, y ejecuta <code>muse logout</code> para borrar la sesión y la clave guardadas.',
          ],
        },
        {
          type: 'paragraph',
          text: 'En un servidor o por SSH, donde no se puede abrir un navegador, usa una API key. Exporta <code>META_API_KEY</code> y tendrá prioridad sobre cualquier clave o sesión guardada. Los usuarios de Meta Managed Account también tienen que usar API key, porque no pueden entrar con el navegador. Tienes los detalles en la <a href="https://dev.meta.ai/docs/muse-code/auth" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de autenticación</a>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Scripts y CI: sin interfaz interactiva
META_API_KEY="$MUSE_KEY" muse exec "Resume el README"`,
        },
      ],
    },
    {
      id: 'errores-comunes',
      title: 'Errores comunes en Linux y cómo arreglarlos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"muse: command not found" después de instalar:</strong> el cambio de PATH solo se aplica a shells nuevas. Abre otro terminal o ejecuta la línea <code>source</code> que te mostró el instalador.',
            '<strong>"required command not found: curl" o "mktemp":</strong> instala la herramienta que falta con tu gestor de paquetes y vuelve a lanzar el instalador.',
            '<strong>Todos los comandos de shell fallan como error de entorno:</strong> el helper de bubblewrap no funciona en esta máquina. Meta avisa de que una versión musl sin el helper falla igual.',
            '<strong>Muse no puede escribir en .git o .muse:</strong> es lo esperado. El sandbox da escritura en el espacio de trabajo y en una carpeta temporal, deja el resto del sistema en solo lectura y protege <code>.git</code>, <code>.muse</code> y <code>.agents</code>.',
            '<strong>El login con navegador funcionó pero se usa otra cuenta:</strong> mira si <code>META_API_KEY</code> está definida en tu shell. Tiene prioridad sobre la sesión del navegador.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La <a href="https://dev.meta.ai/docs/muse-code/permissions" target="_blank" rel="noopener noreferrer" class="' + link + '">referencia oficial de permisos y seguridad</a> explica con detalle los límites del sandbox.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Muse Code en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Con Muse funcionando, el siguiente límite llega rápido: un terminal solo lleva una tarea a la vez. Le das un trabajo a Muse y esperas. Abrir más pestañas en GNOME Terminal o en tmux ayuda, hasta que pierdes la cuenta de qué sesión ha terminado, cuál espera tu aprobación y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio pensada justo para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de las demás distros), en x64 y ARM64. Puede instalar y abrir Muse Code en Linux, pone varios terminales de agentes uno al lado del otro y añade notificaciones cuando un agente termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal. Puedes tener Muse junto a Claude Code, Codex y otros agentes en la misma ventana.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/como-usar-muse-code" class="' + link + '">cómo usar Muse Code</a> para tu primera tarea real, y <a href="/es/guias/muse-code-modelos-precios-privacidad" class="' + link + '">modelos, precios y privacidad de Muse Code</a> para entender la facturación antes de abrir varias sesiones.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Muse Code está a un comando curl. Entra con el navegador en tu escritorio y con <code>META_API_KEY</code> en servidores, y si fallan los comandos de shell, revisa primero el sandbox de bubblewrap. Cuando un solo terminal se te quede corto, CodeAgentSwarm te deja usar varios a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Muse Code funciona en Linux?',
      answer: 'Sí. Meta publica un único instalador para macOS y Linux, y su documentación indica que los dos tienen todas las funciones, incluida la entrada por voz y los mensajes entre sesiones.',
    },
    {
      question: '¿Cómo instalo Muse Code en Ubuntu o Fedora?',
      answer: 'Ejecuta "curl -fsSL https://dev.meta.ai/install.sh | bash" en un terminal, abre otro terminal y escribe "muse". Necesitas curl y Bash, que vienen en casi todas las distros.',
    },
    {
      question: '¿Puedo usar Muse Code en un servidor Linux por SSH?',
      answer: 'Sí. Instálalo igual e inicia sesión con una API key de Meta en lugar del navegador. Define la variable de entorno META_API_KEY o pega la clave cuando Muse te pida iniciar sesión. Para scripts y CI, usa "muse exec".',
    },
    {
      question: '¿Por qué fallan todos los comandos de shell dentro de Muse en Linux?',
      answer: 'Muse ejecuta los comandos de shell dentro de un sandbox de bubblewrap que trae incluido. Si ese helper no puede arrancar en tu máquina, Muse marca cada comando como error de entorno. Arregla el sandbox antes de tocar los permisos.',
    },
    {
      question: '¿CodeAgentSwarm es compatible con Muse Code en Linux?',
      answer: 'CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de las demás distros, en x64 y ARM64. Puede instalar y abrir Muse Code en Linux y usarlo junto a Claude Code, Codex y otros agentes.',
    },
  ],
}

export default guide
