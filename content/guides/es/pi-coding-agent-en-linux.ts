import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'
const docs = 'https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs'

export const guide: Guide = {
  meta: {
    slug: 'pi-coding-agent-en-linux',
    locale: 'es',
    title: 'Cómo instalar Pi coding agent en Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'Cómo instalar Pi coding agent en Linux (2026)',
    metaDescription: 'Instala Pi coding agent en Linux con el instalador oficial o con npm. Requisitos, /login por SSH, errores comunes en Linux y cómo usar varias sesiones de Pi a la vez.',
    intro: `Pi funciona en Linux. Instálalo con el instalador oficial ("curl -fsSL https://pi.dev/install.sh | sh") o con npm, abre un terminal en tu proyecto, escribe "pi" y ejecuta /login para conectar un proveedor de modelos.

En esta guía vemos los dos métodos de instalación, la versión de Node.js que necesita Pi, cómo iniciar sesión en un servidor sin navegador, los errores más habituales en Linux y cómo tener varias sesiones de Pi en paralelo cuando un terminal se te queda corto.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varios terminales de Pi en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'pi',
    highlightedWords: ['Pi', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'pi-coding-agent-on-linux',
  },
  sections: [
    {
      id: 'respuesta-rapida',
      title: 'Respuesta rápida: instala Pi en Linux',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el instalador oficial, o instala el paquete de npm si ya tienes Node.js 22.19 o posterior. Después escribe <code>pi</code> dentro de la carpeta del proyecto y ejecuta <code>/login</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instalador oficial para macOS y Linux
curl -fsSL https://pi.dev/install.sh | sh

# O con npm (Node.js 22.19 o posterior)
npm install -g --ignore-scripts @earendil-works/pi-coding-agent

# Comprueba la instalación
pi --version`,
        },
        {
          type: 'paragraph',
          text: 'Todos los comandos de esta guía salen de la <a href="' + docs + '/quickstart.md" target="_blank" rel="noopener noreferrer" class="' + link + '">guía de inicio rápido oficial de Pi</a>.',
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
            'Una máquina Linux con terminal. El instalador oficial es para macOS y Linux.',
            'Node.js 22.19 o posterior si instalas con npm. CodeAgentSwarm verificó Pi 0.85.1 con esa versión de Node.',
            'Acceso a un modelo: una suscripción, una API key o un modelo local a través de un proveedor compatible.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Pi no vende ninguna suscripción propia. El proveedor que conectes decide qué modelos puedes usar y cómo te cobran. Consulta <a href="/es/guias/pi-coding-agent-modelos-suscripciones" class="' + link + '">modelos y suscripciones de Pi</a>.',
        },
      ],
    },
    {
      id: 'instalacion',
      title: 'Instalar con npm o con el instalador oficial',
      content: [
        {
          type: 'paragraph',
          text: 'Los dos métodos te dejan el mismo comando <code>pi</code>. Usa el instalador si quieres que te guíe. Usa npm si ya gestionas Node.js con tu distro o con un gestor de versiones y quieres tener Pi junto al resto de paquetes globales.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `node --version
npm --version
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
pi --version`,
        },
        {
          type: 'paragraph',
          text: 'El flag <code>--ignore-scripts</code> forma parte del comando oficial: Pi no necesita los scripts de ciclo de vida de sus dependencias para una instalación normal con npm. Algunos tutoriales antiguos todavía usan el nombre anterior del paquete, <code>@mariozechner</code>.',
        },
        {
          type: 'paragraph',
          text: 'Para quitar Pi más adelante, ejecuta <code>npm uninstall -g @earendil-works/pi-coding-agent</code>, o vuelve a lanzar el instalador y elige <strong>Uninstall Pi</strong> si lo usaste.',
        },
      ],
    },
    {
      id: 'primer-arranque-y-login',
      title: 'Primer arranque e inicio de sesión (también por SSH)',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: `cd ~/mi-proyecto
pi`,
        },
        {
          type: 'list',
          items: [
            'Dentro de Pi, ejecuta <code>/login</code>, elige un proveedor y sigue su flujo de suscripción o de API key.',
            'Ejecuta <code>/model</code> para elegir un modelo al que tenga acceso tu cuenta.',
            'En un servidor o por SSH, puede que la redirección de OAuth no llegue a Pi. Cuando te lo pida, pega en Pi la URL de redirección final o el código de autorización.',
            'También puedes saltarte <code>/login</code> y definir la clave del proveedor como variable de entorno, por ejemplo <code>ANTHROPIC_API_KEY</code> u <code>OPENAI_API_KEY</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Pi guarda las credenciales en <code>auth.json</code>, dentro de su directorio de agente. Ese archivo puede contener API keys y tokens de OAuth, así que mantenlo privado y no lo subas nunca al repositorio. Tienes los detalles en la <a href="' + docs + '/providers.md" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial de autenticación de proveedores</a>.',
        },
        {
          type: 'paragraph',
          text: 'Pi guarda las sesiones automáticamente. Ejecuta <code>pi --continue</code> para retomar la última sesión de la misma carpeta, o <code>/resume</code> para elegir otra.',
        },
      ],
    },
    {
      id: 'solucion-de-problemas',
      title: 'Errores comunes en Linux y cómo solucionarlos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"pi: command not found" tras instalar:</strong> abre primero un terminal nuevo. Si sigue fallando, ejecuta <code>command -v pi</code> y <code>npm config get prefix</code> y comprueba que la carpeta bin global de npm está en tu PATH.',
            '<strong>Pi instalado con otro Node:</strong> los gestores de versiones como nvm tienen paquetes globales distintos para cada versión de Node. Revisa <code>node --version</code> y reinstala Pi en el Node que usas de verdad.',
            '<strong>Node.js demasiado antiguo:</strong> el paquete de npm necesita Node.js 22.19 o posterior. Los paquetes de las distros suelen ir por detrás, así que comprueba la versión antes de instalar.',
            '<strong>El login se queda colgado en una máquina remota:</strong> la redirección del navegador no llega al servidor. Pega en Pi la URL de redirección o el código cuando te lo pida, o usa una API key en una variable de entorno.',
            '<strong>Shift+Enter envía el mensaje dentro de tmux:</strong> tmux puede confundir las teclas modificadas con un Enter normal. Activa las teclas extendidas como explica la <a href="' + docs + '/tmux.md" target="_blank" rel="noopener noreferrer" class="' + link + '">página oficial sobre tmux</a>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Las herramientas de Pi se ejecutan con los permisos del proceso de Pi, y Pi no te pide confirmación antes de cada una. Para repositorios que no sean de confianza o trabajo desatendido, ejecútalo en un contenedor u otro sandbox.',
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Pi en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando Pi ya funciona, el siguiente límite es el tiempo: un terminal solo hace una tarea a la vez. Abrir más pestañas o paneles de tmux ayuda hasta que pierdes la pista de qué sesión ha terminado, cuál te necesita y qué ha cambiado cada una.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio gratuita pensada para eso, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o como AppImage (Fedora y la mayoría de las demás distros), para x64 y ARM64. Pone varios terminales de Pi en paralelo, con notificaciones de escritorio cuando un agente termina o necesita tu respuesta, historial buscable de todas las sesiones y un diff en tiempo real de lo que ha cambiado cada terminal. Puedes combinar Pi con Claude Code, Codex y otros agentes en la misma ventana.',
        },
        {
          type: 'paragraph',
          text: 'En Linux, CodeAgentSwarm instala Pi con su propio Node incluido en x64 y ARM64, usando el mismo paquete oficial: <code>npm install -g --ignore-scripts @earendil-works/pi-coding-agent</code>. Las credenciales siguen saliendo del <code>/login</code> de Pi.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/como-usar-pi-coding-agent" class="' + link + '">cómo usar Pi coding agent</a> para tu primera tarea real, y <a href="/es/guias/pi-coding-agent-modelos-suscripciones" class="' + link + '">modelos y suscripciones de Pi</a> para elegir proveedor.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En Linux, Pi se instala con un solo comando del instalador oficial o con npm. Comprueba tu versión de Node, ejecuta <code>/login</code> y pega la URL de redirección cuando trabajes por SSH. Cuando un solo terminal ya no te baste, CodeAgentSwarm ejecuta varias sesiones de Pi a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Funciona Pi coding agent en Linux?',
      answer: 'Sí. Pi funciona en un terminal de Linux. Puedes instalarlo con el instalador oficial para macOS y Linux o con el paquete de npm @earendil-works/pi-coding-agent.',
    },
    {
      question: '¿Qué versión de Node.js necesita Pi?',
      answer: 'El paquete de npm necesita Node.js 22.19 o posterior. CodeAgentSwarm verificó Pi 0.85.1 con esa versión.',
    },
    {
      question: '¿Puedo iniciar sesión en Pi en un servidor por SSH?',
      answer: 'Sí. Ejecuta /login. Si la redirección de OAuth no llega al servidor, pega en Pi la URL de redirección final o el código de autorización cuando te lo pida. También puedes usar la API key del proveedor en una variable de entorno.',
    },
    {
      question: '¿Dónde guarda Pi mis credenciales en Linux?',
      answer: 'En auth.json, dentro del directorio de agente de Pi. Puede contener API keys y tokens de OAuth, así que mantenlo privado y fuera del control de versiones.',
    },
    {
      question: '¿CodeAgentSwarm es compatible con Pi en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb o AppImage, en x64 y ARM64, y Pi está disponible en él para macOS, Windows y Linux. Instala Pi con su propio Node incluido y te deja ejecutar varias sesiones de Pi en paralelo.',
    },
  ],
}

export default guide
