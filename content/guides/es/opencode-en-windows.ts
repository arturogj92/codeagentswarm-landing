import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-en-windows',
    locale: 'es',
    title: 'Cómo ejecutar OpenCode en Windows: instalación nativa o WSL',
    metaTitle: 'Cómo ejecutar OpenCode en Windows (nativo o WSL) (2026)',
    metaDescription: 'Ejecuta opencode en Windows. Instálalo con npm en PowerShell o úsalo dentro de WSL, soluciona los errores típicos de Windows y aprende a correr varias sesiones de opencode en paralelo.',
    intro: `Sí, puedes ejecutar opencode en Windows. El camino más simple es instalarlo con npm en PowerShell, conectar un proveedor de modelos una vez y escribir "opencode" dentro de la carpeta de cualquier proyecto. Como opencode es agnóstico al proveedor, ese proveedor puede ser Anthropic, OpenAI, Google o incluso un modelo local, el que ya uses.

Si tu stack depende de herramientas de Linux, puedes ejecutar exactamente el mismo opencode dentro de WSL, donde los proyectos Linux-first se comportan como en un servidor. En esta guía cubrimos los dos caminos: la instalación nativa en Windows con Node.js y npm, el setup con WSL, cuándo conviene cada uno y cómo arreglar los errores específicos de Windows que más suelen liar a la gente.

Y cuando tengas opencode funcionando, también te enseñamos cómo pasar de un solo terminal de opencode a varios agentes trabajando en paralelo en Windows, sin perder la pista de qué está haciendo cada uno.`,
    ctaText: 'CodeAgentSwarm es una app de escritorio nativa para Windows. Descárgala gratis y ejecuta varios terminales de opencode en paralelo en un espacio de trabajo visual, con notificaciones, historial buscable y diffs en tiempo real.',
    highlightedWords: ['OpenCode', 'Windows'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'opencode-on-windows',
  },
  sections: [
    {
      id: 'respuesta-rapida',
      title: 'Respuesta rápida: sí, opencode funciona en Windows',
      content: [
        {
          type: 'image',
          alt: 'Varios terminales de opencode ejecutándose en paralelo en un único espacio de trabajo de CodeAgentSwarm en el escritorio',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'opencode en el escritorio: varias sesiones independientes, una al lado de otra, en una sola ventana de CodeAgentSwarm.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: instala Node.js, abre PowerShell e instala <code>opencode-ai</code> globalmente con npm. Cuando termine, ejecuta <code>opencode</code> dentro de la carpeta de un proyecto y conecta tu proveedor (Anthropic, OpenAI, Google o un modelo local).',
        },
        {
          type: 'code',
          language: 'powershell',
          code: `# PowerShell - instala opencode globalmente con npm
npm install -g opencode-ai

# Verifica la instalación
opencode --version

# Arranca opencode dentro de la carpeta de un proyecto
opencode`,
        },
        {
          type: 'paragraph',
          text: 'Eso es todo el camino nativo en Windows: Node.js y una instalación con npm. No necesitas WSL solo para ejecutar opencode. WSL pasa a ser la mejor opción únicamente cuando tu propio proyecto depende de herramientas de Linux, algo que vemos más abajo.',
        },
        {
          type: 'paragraph',
          text: 'opencode es el agente de terminal open source de SST. Para los comandos exactos de instalación y las últimas opciones, consulta la <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">web oficial de opencode</a> y el <a href="https://github.com/sst/opencode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">repositorio de opencode en GitHub</a>, ya que el método de instalación va cambiando con el tiempo. Esta guía es el espejo de nuestra <a href="/es/guias/claude-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Claude Code en Windows</a> y de la <a href="/es/guias/codex-cli-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Codex CLI en Windows</a>, pero para opencode.',
        },
      ],
    },
    {
      id: 'requisitos',
      title: 'Qué necesitas antes de instalar',
      content: [
        {
          type: 'list',
          items: [
            'Windows 10 o Windows 11, de 64 bits. opencode es una herramienta de línea de comandos que ejecutas desde un terminal.',
            'Node.js (una versión LTS reciente) y npm, que viene con Node.js. Es lo que necesita la instalación nativa en Windows.',
            'Un terminal: Windows Terminal o PowerShell, los dos vienen con Windows. PowerShell sirve perfectamente para instalar y ejecutar opencode.',
            'Una cuenta o clave de API con al menos un proveedor de modelos (Anthropic, OpenAI, Google o un modelo local). opencode es agnóstico al proveedor, así que se conecta al que elijas la primera vez que lo ejecutes.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Si aún no tienes Node.js, instálalo desde la web oficial de Node.js o con un gestor de paquetes de Windows como WinGet (<code>winget install OpenJS.NodeJS.LTS</code>). Después de instalarlo, cierra y vuelve a abrir el terminal para que <code>node</code> y <code>npm</code> queden en tu PATH.',
        },
      ],
    },
    {
      id: 'instalacion-nativa-paso-a-paso',
      title: 'Instalación nativa en Windows paso a paso',
      content: [
        {
          type: 'paragraph',
          text: 'Con Node.js ya en su sitio, instalar opencode de forma nativa en Windows lleva más o menos un minuto:',
        },
        {
          type: 'list',
          items: [
            'Abre Windows Terminal o PowerShell. No hace falta ejecutarlo como administrador.',
            'Comprueba que Node.js está listo con <code>node --version</code> y <code>npm --version</code>.',
            'Instala opencode globalmente: <code>npm install -g opencode-ai</code>',
            'Cierra y vuelve a abrir el terminal para que el nuevo comando quede en tu PATH.',
            'Ejecuta <code>opencode --version</code> para confirmar que está instalado.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para actualizar opencode más adelante, vuelve a ejecutar el mismo comando de npm, que descarga la última versión publicada:',
        },
        {
          type: 'code',
          language: 'powershell',
          code: 'npm install -g opencode-ai@latest',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Si <code>npm install -g</code> falla con un error de permisos, evita ejecutar PowerShell como administrador solo para forzarlo. La solución más limpia es una configuración de Node.js donde tu carpeta global de npm viva dentro de tu perfil de usuario, algo que el instalador estándar de Node.js en Windows ya deja resuelto.',
        },
      ],
    },
    {
      id: 'primer-arranque',
      title: 'Primer arranque: conectar un proveedor',
      content: [
        {
          type: 'list',
          items: [
            'Abre un terminal en la carpeta de un proyecto y escribe <code>opencode</code>.',
            'Conecta un proveedor (por ejemplo con <code>opencode auth login</code>): elige Anthropic, OpenAI, Google u otro proveedor, y luego inicia sesión o pega una clave de API.',
            'Una vez conectado el proveedor, pídele a opencode algo sobre tu código y déjalo trabajar.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Una vez que conectas un proveedor, opencode guarda esas credenciales, así que la próxima vez que ejecutes <code>opencode</code> en cualquier carpeta arranca directamente. Su configuración global vive en <code>~/.config/opencode</code> dentro de tu perfil de usuario, y cada terminal que abras es su propia sesión de opencode independiente. El comando de autenticación exacto puede cambiar, así que consulta la <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de opencode</a> si el flujo se ve distinto en tu versión.',
        },
      ],
    },
    {
      id: 'instalacion-wsl',
      title: 'Ejecutar opencode en WSL (y cuándo es mejor opción)',
      content: [
        {
          type: 'paragraph',
          text: 'WSL (Subsistema de Windows para Linux) te permite ejecutar un entorno Linux real dentro de Windows. opencode funciona ahí exactamente igual, y hay dos escenarios donde WSL es la mejor opción:',
        },
        {
          type: 'list',
          items: [
            '<strong>Tu proyecto depende de herramientas de Linux.</strong> Si tu cadena de build, scripts o dependencias asumen Linux, ejecuta opencode donde realmente corre tu proyecto para que las rutas y los comandos de shell coincidan.',
            '<strong>Quieres el comportamiento de comandos nativos de Linux.</strong> Cierto sandboxing y algunos comandos de shell solo encajan bien dentro de un entorno Linux, que en Windows significa WSL 2.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para ejecutar opencode dentro de WSL, abre el terminal de tu distribución WSL (no PowerShell), asegúrate de que Node.js y npm están instalados dentro de ese entorno Linux e instala opencode ahí:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Dentro de tu terminal de WSL (Linux)\nnpm install -g opencode-ai\n\n# Luego ejecútalo desde tu proyecto\nopencode',
        },
        {
          type: 'paragraph',
          text: 'Un detalle a tener en cuenta en WSL: conectar tu proveedor desde un terminal de Linux a veces te muestra un código o una URL para completar en el navegador de Windows en lugar de redirigir automáticamente. Si pasa, termina el flujo en el navegador y vuelve al terminal, y mantén los archivos del proyecto dentro del sistema de archivos de Linux para el mejor rendimiento.',
        },
      ],
    },
    {
      id: 'nativo-vs-wsl',
      title: 'Windows nativo vs WSL: ¿cuál usar?',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Windows nativo:</strong> lo mejor para proyectos nativos de Windows (.NET, Unity, desarrollo web con herramientas de Windows). Setup más simple, solo Node.js más una instalación con npm, y se ejecuta directamente desde PowerShell.',
            '<strong>WSL 2:</strong> lo mejor para toolchains de Linux y para el comportamiento de comandos nativos de Linux. Tus archivos viven en el sistema de archivos de Linux, así que los proyectos Linux-first se comportan exactamente igual que en un servidor.',
            '<strong>WSL 1:</strong> solo si WSL 2 no está disponible en tu máquina. Tiene problemas conocidos ejecutando binarios nativos, así que usa WSL 2 siempre que puedas.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si no lo tienes claro, empieza con la nativa. Es el camino con menos fricción en Windows y siempre puedes añadir una instalación en WSL después; las dos pueden convivir en la misma máquina, e incluso puedes apuntar distintos terminales de opencode a distintos setups.',
        },
      ],
    },
    {
      id: 'solucion-de-errores',
      title: 'Errores comunes en Windows y cómo arreglarlos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"opencode is not recognized as a command":</strong> la carpeta global de binarios de npm no está en tu PATH, o no reabriste el terminal después de instalar. Cierra y vuelve a abrir PowerShell, y confirma que <code>npm config get prefix</code> apunta a una carpeta que esté en tu PATH.',
            '<strong>"npm is not recognized":</strong> Node.js no está instalado o no está en tu PATH. Instala Node.js LTS, reabre el terminal y comprueba <code>node --version</code>.',
            '<strong>Errores EACCES o de permisos en <code>npm install -g</code>:</strong> tu carpeta global de npm no es escribible por tu usuario. Reinstala Node.js con el instalador oficial de Windows o configura un prefix de npm dentro de tu perfil de usuario en lugar de forzarlo con permisos de administrador.',
            '<strong>Proxy corporativo o errores SSL durante la instalación:</strong> configura npm con los datos de tu proxy, o haz la instalación desde una red que no esté detrás del proxy y actualiza después.',
            '<strong>Errores de autenticación del proveedor:</strong> normalmente una clave de API incorrecta o ausente, o el proveedor equivocado seleccionado. Vuelve a ejecutar el flujo de autenticación y comprueba qué proveedor está configurado en <code>~/.config/opencode/opencode.json</code>.',
            '<strong>opencode se comporta raro con rutas o comandos de Windows:</strong> es probable que tu proyecto espere un shell de Unix. Ejecuta opencode dentro de WSL para ese proyecto, así las rutas y los comandos coinciden.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para cualquier otra cosa, el <a href="https://github.com/sst/opencode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">repositorio oficial de opencode</a> registra los problemas conocidos y las instrucciones de instalación actuales, que es la fuente de verdad a medida que la herramienta evoluciona.',
        },
      ],
    },
    {
      id: 'varios-terminales-en-windows',
      title: 'Ejecutar varias sesiones de opencode en Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Con opencode funcionando, el siguiente cuello de botella aparece rápido: un terminal significa una tarea a la vez. Le das algo que hacer a opencode, y a esperar. La mayoría acaba abriendo varias pestañas de terminal y perdiendo la pista de qué agente terminó, cuál está esperando un permiso y qué cambió cada uno.',
        },
        {
          type: 'paragraph',
          text: 'Ese es el problema que resuelve <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, y es una app de escritorio nativa tanto para Windows como para macOS. Ejecuta tus sesiones de opencode dentro de un espacio de trabajo visual, así que los desarrolladores en Windows tienen una GUI de verdad más varios terminales de opencode en paralelo, con notificaciones de escritorio cuando un agente termina o necesita tu input, historial buscable de todas las sesiones y un diff en vivo de lo que cambió cada terminal. Además lee las sesiones locales de opencode, así que las conversaciones anteriores siguen siendo buscables y puedes retomarlas.',
        },
        {
          type: 'image',
          alt: 'Terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT donde eliges el agente por terminal, incluido opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Selecciona opencode en cada uno para ejecutar un enjambre completo de opencode en Windows.',
        },
        {
          type: 'paragraph',
          text: 'Si quieres tirar por ese camino, estas guías son el siguiente paso natural: <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar un enjambre de agentes opencode</a>, <a href="/es/guias/ejecutar-multiples-sesiones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de opencode</a> y la visión más amplia del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> en cualquier CLI.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'Ejecutar opencode en Windows es sencillo: instala Node.js, ejecuta una instalación con npm y arráncalo desde PowerShell. La nativa es la opción correcta por defecto para la mayoría de desarrolladores en Windows; WSL 2 está ahí para cuando tu proyecto depende de herramientas de Linux o quieres el comportamiento de comandos nativos de Linux. En cualquier caso, conectas un proveedor una vez y opencode lo recuerda.',
        },
        {
          type: 'paragraph',
          text: 'Instálalo, conecta tu proveedor una vez, y cuando un solo terminal se te quede corto, CodeAgentSwarm te da una GUI nativa de Windows para ejecutar varios agentes de opencode en paralelo sin perder el hilo.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿opencode funciona en Windows?',
      answer: 'Sí. Puedes instalar opencode de forma nativa en Windows con npm en PowerShell, siempre que tengas Node.js instalado. También puedes ejecutarlo dentro de WSL si tu proyecto depende de herramientas de Linux. Las dos formas funcionan y pueden convivir en la misma máquina.',
    },
    {
      question: '¿Necesito WSL para ejecutar opencode en Windows?',
      answer: 'No. El camino nativo es instalar opencode con npm y ejecutarlo desde PowerShell. WSL solo es la mejor opción cuando tu propio proyecto depende de herramientas de Linux o quieres el comportamiento de comandos nativos de Linux. Para la mayoría de proyectos nativos de Windows puedes saltarte WSL por completo.',
    },
    {
      question: '¿Cómo instalo opencode en Windows?',
      answer: 'Instala Node.js (una versión LTS reciente), abre PowerShell y ejecuta "npm install -g opencode-ai". Reabre el terminal, ejecuta "opencode --version" para confirmar, y luego ejecuta "opencode" dentro de la carpeta de un proyecto y conecta tu proveedor (Anthropic, OpenAI, Google o un modelo local). Consulta la documentación oficial de opencode para los comandos exactos más recientes.',
    },
    {
      question: '¿Puedo ejecutar varias sesiones de opencode a la vez en Windows?',
      answer: 'Sí. Cada sesión de opencode es su propio proceso, así que puedes abrir varios terminales y ejecutar opencode en cada uno sobre el mismo proyecto. CodeAgentSwarm es una app de escritorio nativa para Windows que supervisa varios terminales de opencode en un único espacio de trabajo visual, con notificaciones, historial buscable y diffs en vivo.',
    },
    {
      question: '¿CodeAgentSwarm funciona en Windows?',
      answer: 'Sí. CodeAgentSwarm es una app de escritorio nativa para Windows (x64 y ARM64) y macOS. Funciona sobre tu instalación existente de opencode y permite a los desarrolladores en Windows supervisar varios terminales de opencode en paralelo con una GUI de verdad.',
    },
  ],
}

export default guide
