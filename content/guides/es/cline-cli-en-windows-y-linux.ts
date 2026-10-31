import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'cline-cli-en-windows-y-linux',
    locale: 'es',
    title: 'Cline CLI en Windows y Linux: instalación, Node.js y rutas',
    metaTitle: 'Instalar Cline CLI en Windows y Linux (x64 y ARM64)',
    metaDescription: 'Instala Cline CLI en Windows o Linux, x64 o ARM64: qué Node.js necesitas, errores de permisos de npm, problemas de PATH, configuración y actualizaciones.',
    intro: 'Cline CLI es un paquete de npm con binarios nativos para Windows y Linux en x64 y ARM64, así que en los dos sistemas se instala con el mismo comando. Lo que cambia es cómo está montado Node.js y npm en cada uno. Esta guía cubre los dos, más los problemas de PATH y de permisos que más se repiten. Los datos de Cline se comprobaron en su documentación oficial y en el registro de npm el 31 de octubre de 2026.',
    ctaText: 'En Windows o Linux, deja que CodeAgentSwarm instale Cline y su Node.js por ti y úsalo junto a tus otros agentes.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline CLI'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'cline-cli-on-windows-and-linux',
    relatedSlug: 'como-usar-cline-cli',
    socialImage: '/images/guides/cline-cli-og-es.png',
  },
  sections: [
    {
      id: 'requirements',
      title: 'Qué necesitas',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'table',
          headers: ['Sistema', 'Binario nativo dentro del paquete de npm'],
          rows: [
            ['Windows x64', '<code>@cline/cli-windows-x64</code>'],
            ['Windows ARM64', '<code>@cline/cli-windows-arm64</code>'],
            ['Linux x64', '<code>@cline/cli-linux-x64</code>'],
            ['Linux ARM64', '<code>@cline/cli-linux-arm64</code>'],
          ],
          caption: 'Dependencias opcionales del paquete cline 3.0.74 en el registro de npm, consultado el 31 de octubre de 2026. npm solo instala la que corresponde a tu equipo.',
        },
        {
          type: 'paragraph',
          text: `Para instalarlo necesitas Node.js y npm. La ${link('https://docs.cline.bot/cline-cli/installation', 'documentación de instalación de Cline')} pide Node.js 20 o posterior y recomienda la 22. Comprueba qué versión tienes con <code>node --version</code>.`,
        },
      ],
    },
    {
      id: 'windows',
      title: 'Instalar Cline CLI en Windows',
      content: [
        { type: 'code', language: 'powershell', code: 'node --version\nnpm install -g cline\ncline version' },
        {
          type: 'paragraph',
          text: 'Ejecútalo en PowerShell o en Windows Terminal. npm deja un lanzador <code>cline.cmd</code> en <code>%APPDATA%\\npm</code>, carpeta que el instalador de Node.js añade al PATH. Si justo después de instalar no encuentra <code>cline</code>, abre una terminal nueva para que lea el PATH actualizado.',
        },
        {
          type: 'paragraph',
          text: 'Cline guarda su configuración en la carpeta <code>.cline</code> de tu perfil de usuario. Las reglas globales también pueden ir en <code>Documents\\Cline\\Rules</code>, y Cline mira además la carpeta Documentos de OneDrive cuando Windows la redirige allí.',
        },
      ],
    },
    {
      id: 'linux',
      title: 'Instalar Cline CLI en Linux',
      content: [
        { type: 'code', language: 'bash', code: 'node --version\nnpm install -g cline\ncline version' },
        {
          type: 'paragraph',
          text: 'Si <code>npm install -g</code> falla con <code>EACCES</code>, tu carpeta global de npm pertenece a root. No lo arregles con <code>sudo</code>; apunta npm a una carpeta tuya:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'npm config set prefix ~/.npm-global\necho \'export PATH="$HOME/.npm-global/bin:$PATH"\' >> ~/.bashrc\nsource ~/.bashrc\nnpm install -g cline',
        },
        {
          type: 'paragraph',
          text: 'Un gestor de versiones de Node como nvm también evita el problema, porque instala Node en tu carpeta personal. En un servidor o por SSH, inicia sesión con <code>cline auth</code> y una clave de API de tu proveedor.',
        },
      ],
    },
    {
      id: 'path',
      title: 'Cuando un editor o una app no encuentra cline',
      content: [
        {
          type: 'paragraph',
          text: `Las apps que lanzan Cline como servidor Agent Client Protocol no siempre heredan el PATH de tu shell. La ${link('https://docs.cline.bot/usage/acp', 'documentación de ACP de Cline')} recomienda usar en ese caso la ruta absoluta que da <code>which cline</code> (o <code>where cline</code> en Windows).`,
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm busca solo en los sitios habituales: el PATH, la carpeta global de npm (<code>%APPDATA%\\npm</code> en Windows, <code>~/.local/bin</code> y <code>/usr/local/bin</code> en Linux) y el Node que gestiona la propia app.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Deja que CodeAgentSwarm lo instale',
      content: [
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Cline seleccionado en el selector de agentes de CodeAgentSwarm',
          caption: 'Captura real de la demo de la versión 2.5.0 de CodeAgentSwarm. Si eliges un agente que no está instalado, se abre su instalador.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'En CodeAgentSwarm 2.5.0, donde Cline está en beta, elige Cline en el selector de agentes o pulsa Install en Settings > Providers. En Windows y Linux la app puede descargar su propio Node.js si el tuyo falta o es anterior a la 22.19, instala el paquete oficial <code>cline</code> con el binario de tu equipo y lo comprueba con <code>cline --version</code>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Durante el desarrollo de la 2.5.0 el instalador se probó en Windows ARM64 y Linux ARM64. Si ves algo raro en un equipo x64, cuéntanoslo desde Settings > Feedback.',
        },
        {
          type: 'paragraph',
          text: `Siguientes pasos: ${link('/es/guias/como-usar-cline-cli', 'conecta un proveedor y aprende las opciones del día a día')} o ${link('/es/guias/enjambre-de-agentes-cline', 'ejecuta varias sesiones de Cline en paralelo')}. ¿Usas más agentes en Linux? Mira ${link('/es/guias/github-copilot-cli-en-linux', 'GitHub Copilot CLI en Linux')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cline CLI funciona en Windows?',
      answer: 'Sí. El paquete de npm incluye binarios nativos de Windows para x64 y ARM64. Instálalo con npm install -g cline desde PowerShell o Windows Terminal.',
    },
    {
      question: '¿Cline CLI funciona en Linux ARM64?',
      answer: 'Sí. El paquete trae un binario para Linux ARM64, y npm lo elige solo en equipos ARM64.',
    },
    {
      question: '¿Qué versión de Node.js necesita Cline CLI?',
      answer: 'La documentación de instalación de Cline pide Node.js 20 o posterior y recomienda la 22. CodeAgentSwarm usa Node.js 22.19 o posterior cuando instala Cline.',
    },
    {
      question: '¿Cómo actualizo Cline CLI?',
      answer: 'Ejecuta cline update, o vuelve a lanzar npm install -g cline. Usa cline@nightly si quieres la versión nightly.',
    },
    {
      question: '¿Por qué npm install -g cline falla con EACCES en Linux?',
      answer: 'Tu carpeta global de npm pertenece a root. Fija un prefijo de usuario con npm config set prefix ~/.npm-global y añade su carpeta bin al PATH, o usa un gestor de versiones de Node como nvm.',
    },
  ],
}

export default guide
