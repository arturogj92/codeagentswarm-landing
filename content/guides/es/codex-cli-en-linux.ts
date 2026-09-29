import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'codex-cli-en-linux',
    locale: 'es',
    title: 'Cómo instalar y usar Codex CLI en Linux',
    metaTitle: 'Cómo instalar OpenAI Codex CLI en Linux (Ubuntu, Fedora) - 2026',
    metaDescription: 'Instala OpenAI Codex CLI en Linux con el script oficial o con npm, inicia sesión por SSH con device auth, arregla los errores típicos de PATH y npm y usa varias sesiones de Codex en paralelo.',
    intro: `Codex CLI funciona de forma nativa en Linux. Lo más rápido es el script de instalación de OpenAI: ejecuta "curl -fsSL https://chatgpt.com/codex/install.sh | sh", escribe "codex" en la carpeta de tu proyecto e inicia sesión con tu cuenta de ChatGPT o con una API key. Si ya usas Node.js, "npm install -g @openai/codex" funciona igual de bien.

En esta guía vemos los dos métodos de instalación, cómo iniciar sesión en un servidor sin navegador, los errores más habituales en Linux y en qué se diferencia la nueva app de escritorio de ChatGPT para Linux.

Cuando Codex esté funcionando, también te enseñamos a tener varias sesiones de Codex en paralelo en la misma máquina Linux sin perderles la pista.`,
    ctaText: 'CodeAgentSwarm ya funciona en Linux (deb y AppImage, x64 y ARM64). Descárgalo gratis y ejecuta varios terminales de Codex CLI en paralelo, con notificaciones, historial buscable y diffs en tiempo real.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'codex-cli-on-linux',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala Codex CLI en Linux',
      content: [
        {
          type: 'image',
          alt: 'Varios terminales de OpenAI Codex CLI en paralelo en un único espacio de trabajo de CodeAgentSwarm',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'Varias sesiones de Codex CLI en paralelo en una ventana de CodeAgentSwarm.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el script oficial, abre un terminal nuevo, lanza <code>codex</code> dentro de un proyecto y elige cómo iniciar sesión.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Script oficial de instalación (sin Node.js)
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# O con npm, si ya tienes Node.js
npm install -g @openai/codex

# Comprueba y arranca
codex --version
cd ~/mi-proyecto
codex`,
        },
        {
          type: 'paragraph',
          text: 'Codex también se puede instalar con Homebrew en Linux o con binarios ya compilados. Las opciones cambian de vez en cuando, así que revisa la <a href="https://developers.openai.com/codex/cli" target="_blank" rel="noopener noreferrer" class="' + link + '">documentación oficial de Codex CLI</a> para ver la lista actual.',
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
            'Un Linux de 64 bits en x64 o ARM64. Funciona en Ubuntu, Debian y Fedora.',
            'Node.js solo si instalas con npm. El script y los binarios no lo necesitan.',
            'Un plan de ChatGPT que incluya Codex, o una API key de OpenAI.',
            'Git, muy recomendable: trabaja dentro de un repositorio para revisar y deshacer con facilidad cada cambio de Codex.',
          ],
        },
      ],
    },
    {
      id: 'iniciar-sesion',
      title: 'Iniciar sesión, también por SSH',
      content: [
        {
          type: 'paragraph',
          text: 'La primera vez que ejecutas <code>codex</code> te pregunta cómo iniciar sesión: con tu cuenta de ChatGPT o con una API key. En un ordenador con escritorio, si eliges ChatGPT se abre el navegador y el login vuelve solo al terminal.',
        },
        {
          type: 'paragraph',
          text: 'En un servidor, un contenedor o una sesión SSH, la redirección del navegador no llega al CLI. Usa la autenticación por dispositivo:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex login --device-auth',
        },
        {
          type: 'paragraph',
          text: 'Abre en cualquier dispositivo el enlace que aparece, inicia sesión y escribe el código de un solo uso. Algunos espacios de trabajo de ChatGPT tienen que activar antes el login por código en sus ajustes de seguridad. Si no lo tienes disponible, la <a href="https://developers.openai.com/codex/auth" target="_blank" rel="noopener noreferrer" class="' + link + '">documentación de autenticación</a> explica las alternativas.',
        },
      ],
    },
    {
      id: 'chatgpt-desktop-en-linux',
      title: '¿Y la app de escritorio de ChatGPT en Linux?',
      content: [
        {
          type: 'paragraph',
          text: 'OpenAI ha sacado su app de escritorio de ChatGPT para Linux en versión preview, e incluye Codex. Está pensada para Ubuntu, Debian y Fedora en x64 y ARM64, y algunas funciones, como Computer Use, aún no están disponibles en Linux. Si quieres la app de OpenAI, merece la pena probarla.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm no la sustituye. Está pensado para el CLI de Codex que acabas de instalar: varios terminales de Codex a la vez, junto a Claude Code y otros agentes si los usas, con un solo sitio donde ver qué agente ha terminado y qué ha cambiado cada uno.',
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
            '<strong>"codex: command not found":</strong> la carpeta de instalación aún no está en tu PATH. Abre primero un terminal nuevo. Con npm, ejecuta <code>npm prefix -g</code> y asegúrate de que su carpeta <code>bin</code> está en el PATH.',
            '<strong>Errores EACCES con <code>npm install -g</code>:</strong> no uses sudo. Instala Node.js con nvm, o apunta npm a una carpeta tuya con <code>npm config set prefix ~/.npm-global</code> y añade <code>~/.npm-global/bin</code> al PATH. O sáltate npm y usa el script.',
            '<strong>El login se queda colgado en una máquina remota:</strong> la redirección del navegador no llega al servidor. Usa <code>codex login --device-auth</code>.',
            '<strong>Cuenta equivocada o sesión caducada:</strong> ejecuta <code>codex logout</code> y luego <code>codex login</code> otra vez.',
          ],
        },
      ],
    },
    {
      id: 'varias-sesiones-en-linux',
      title: 'Varias sesiones de Codex en Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando Codex ya funciona, un solo terminal se te queda corto enseguida: le das una tarea y esperas. Más pestañas o un tmux ayudan, hasta que olvidas qué sesión ha terminado, cuál espera una aprobación y qué ha tocado cada una.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> es una app de escritorio para tener varios terminales de agentes a la vez, y ya funciona en Linux como .deb (Ubuntu, Debian y derivadas) o AppImage (Fedora y la mayoría de distros), en x64 y ARM64. Eliges Codex en cada terminal y tienes notificaciones cuando un agente termina o necesita algo, historial buscable de todas las sesiones y un diff en tiempo real por terminal.',
        },
        {
          type: 'paragraph',
          text: 'Siguientes pasos: <a href="/es/guias/enjambre-de-agentes-codex" class="' + link + '">montar un enjambre de agentes Codex</a> y <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="' + link + '">ejecutar múltiples sesiones de Codex</a>. ¿Quieres Claude Code en la misma máquina? Mira <a href="/es/guias/claude-code-en-linux" class="' + link + '">Claude Code en Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'Codex CLI en Linux está a un script o a un npm install. Inicia sesión con ChatGPT en el escritorio o con device auth en un servidor, trabaja dentro de un repositorio git y, cuando un terminal no te baste, lanza varios en paralelo en CodeAgentSwarm.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Codex CLI funciona en Linux?',
      answer: 'Sí. OpenAI Codex CLI funciona de forma nativa en Linux, en x64 y ARM64. Puedes instalarlo con el script oficial, con npm, con Homebrew o con binarios ya compilados.',
    },
    {
      question: '¿Cómo instalo Codex en Ubuntu?',
      answer: 'Ejecuta "curl -fsSL https://chatgpt.com/codex/install.sh | sh", abre un terminal nuevo y lanza "codex" dentro de la carpeta de un proyecto. Si ya usas Node.js, "npm install -g @openai/codex" también funciona.',
    },
    {
      question: '¿Cómo inicio sesión en Codex en un servidor Linux sin navegador?',
      answer: 'Ejecuta "codex login --device-auth", abre el enlace que aparece en cualquier dispositivo, inicia sesión y escribe el código de un solo uso. Algunos espacios de trabajo de ChatGPT tienen que activar antes el login por código en sus ajustes de seguridad.',
    },
    {
      question: '¿Hay app de escritorio de Codex para Linux?',
      answer: 'La app de escritorio de ChatGPT de OpenAI, que incluye Codex, está disponible para Linux en versión preview. CodeAgentSwarm es otra app de escritorio que ejecuta tu Codex CLI en varios terminales a la vez, junto a otros agentes.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Linux?',
      answer: 'Sí. CodeAgentSwarm funciona en Linux como .deb para Ubuntu, Debian y derivadas o como AppImage para Fedora y la mayoría de distros, en x64 y ARM64. Usa el Codex CLI que ya tienes instalado.',
    },
  ],
}

export default guide
