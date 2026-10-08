import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-en-windows',
    locale: 'es',
    title: 'GitHub Copilot CLI en Windows: instalación, PATH, PowerShell e inicio de sesión',
    metaTitle: 'GitHub Copilot CLI en Windows: instalación, PATH y login',
    metaDescription: 'Instala GitHub Copilot CLI en Windows x64 o ARM64 con WinGet, MSI, zip o npm. Corrige el PATH, prepara PowerShell, inicia sesión con un código y actualízalo.',
    intro: 'GitHub Copilot CLI funciona de forma nativa en Windows, tanto en x64 como en ARM64. Esta guía explica las cuatro formas de instalarlo, los problemas de PATH que hacen que PowerShell no reconozca <code>copilot</code>, la versión de PowerShell que espera Copilot, el inicio de sesión y las actualizaciones. Comprobamos los comandos con la documentación oficial el 8 de octubre de 2026.',
    ctaText: 'A partir de la versión que sigue a la 2.4.3, instala GitHub Copilot CLI en Windows desde el selector de agentes, inicia sesión desde Chat y trabaja con varias sesiones de Copilot a la vez en CodeAgentSwarm.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-on-windows',
    relatedSlug: 'como-usar-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'respuesta-rapida',
      title: 'La versión corta: WinGet',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: 'Abre PowerShell y ejecuta estas dos líneas. WinGet elige por ti la compilación x64 o ARM64. Cierra la terminal y abre otra antes de lanzar <code>copilot --version</code>, para que vea el PATH actualizado.',
        },
        { type: 'code', language: 'powershell', code: 'winget install GitHub.Copilot\ncopilot --version' },
        {
          type: 'paragraph',
          text: `GitHub pide dos cosas en Windows: una suscripción activa a Copilot y PowerShell 6 o posterior (${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli', 'documentación de instalación de GitHub')}, revisada el 8 de octubre de 2026). El recorrido general para todas las plataformas está en ${link('/es/guias/como-usar-github-copilot-cli', 'cómo instalar y usar GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'metodos-instalacion',
      title: 'Cuatro formas de instalarlo en Windows',
      content: [
        {
          type: 'table',
          headers: ['Método', 'Qué ejecutas o descargas'],
          rows: [
            ['WinGet', '<code>winget install GitHub.Copilot</code>'],
            ['Instalador MSI', '<code>copilot-x64.msi</code> o <code>copilot-arm64.msi</code>'],
            ['Zip', '<code>copilot-win32-x64.zip</code> o <code>copilot-win32-arm64.zip</code>, cada uno con un único <code>copilot.exe</code>'],
            ['npm (Node.js 22 o posterior)', '<code>npm install -g @github/copilot</code>'],
          ],
          caption: 'Nombres de archivo de la versión v1.0.93 publicada en GitHub.',
        },
        {
          type: 'paragraph',
          text: `Los archivos MSI y zip están en la ${link('https://github.com/github/copilot-cli/releases', 'página de versiones de copilot-cli')}, junto a <code>SHA256SUMS.txt</code>. Elige el que corresponda a tu procesador: lo ves en Configuración > Sistema > Información, en Tipo de sistema. Para las versiones preliminares, usa <code>winget install GitHub.Copilot.Prerelease</code> o <code>npm install -g @github/copilot@prerelease</code>.`,
        },
        {
          type: 'paragraph',
          text: 'Solo el paquete de npm necesita Node.js. WinGet, el MSI y el zip instalan el binario independiente.',
        },
      ],
    },
    {
      id: 'instalar-zip',
      title: 'Instalación manual desde el zip',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: '$dir = "$env:LOCALAPPDATA\\copilot-cli"\n$base = "https://github.com/github/copilot-cli/releases/latest/download"\nInvoke-WebRequest "$base/copilot-win32-x64.zip" -OutFile copilot.zip\nInvoke-WebRequest "$base/SHA256SUMS.txt" -OutFile SHA256SUMS.txt\n(Get-FileHash copilot.zip -Algorithm SHA256).Hash\nSelect-String -Path SHA256SUMS.txt -Pattern "copilot-win32-x64.zip"\nExpand-Archive copilot.zip -DestinationPath $dir\n$userPath = [Environment]::GetEnvironmentVariable("Path", "User")\n[Environment]::SetEnvironmentVariable("Path", "$userPath;$dir", "User")',
        },
        {
          type: 'paragraph',
          text: 'En un equipo ARM64, cambia <code>x64</code> por <code>arm64</code> en los dos nombres de archivo. Los dos hashes tienen que coincidir; PowerShell muestra el suyo en mayúsculas y el archivo lo trae en minúsculas, y eso no importa. Las dos últimas líneas añaden la carpeta al PATH de tu usuario, así que abre una terminal nueva al terminar.',
        },
        {
          type: 'paragraph',
          text: 'La carpeta <code>%LOCALAPPDATA%\\copilot-cli</code> es solo una sugerencia. Es la misma que usa el instalador de CodeAgentSwarm, así lo tienes todo en un sitio si cambias más adelante.',
        },
      ],
    },
    {
      id: 'no-se-reconoce',
      title: 'Cuando PowerShell no reconoce copilot',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: 'Get-Command copilot -All\nwhere.exe copilot\nnpm prefix -g',
        },
        {
          type: 'list',
          items: [
            '<strong>La terminal estaba abierta durante la instalación.</strong> Cada ventana conserva el PATH con el que arrancó. Abre otra y reinicia cualquier app que lance Copilot por ti.',
            `<strong>Instalaste con npm.</strong> En Windows, npm deja los comandos globales directamente en la carpeta que muestra <code>npm prefix -g</code>, por defecto <code>%AppData%\\npm</code> (${link('https://docs.npmjs.com/cli/v11/configuring-npm/folders', 'documentación de carpetas de npm')}, revisada el 8 de octubre de 2026). Esa carpeta tiene que estar en el PATH.`,
            '<strong>Descomprimiste el zip.</strong> Nadie añade la carpeta al PATH por ti. Usa las dos últimas líneas del ejemplo del zip.',
            '<strong>Aparecen varias copias.</strong> Ejecuta <code>copilot --version</code> desde cada ruta que muestre <code>Get-Command</code> y quédate con la que quieras. Dos instalaciones que se actualizan con herramientas distintas acaban con versiones diferentes.',
          ],
        },
      ],
    },
    {
      id: 'powershell',
      title: 'PowerShell es la shell que usa Copilot',
      content: [
        {
          type: 'paragraph',
          text: `En Windows, Copilot ejecuta sus comandos con PowerShell. Prefiere PowerShell 7 o posterior (<code>pwsh</code>) y, si no lo encuentra, usa Windows PowerShell (<code>powershell.exe</code>) (${link('https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference', 'referencia de configuración de GitHub')}, revisada el 8 de octubre de 2026). Windows PowerShell 5.1 es la versión que viene con Windows, y es anterior a PowerShell 6, el mínimo que pide GitHub. Comprueba cuál tienes e instala PowerShell 7 si hace falta:`,
        },
        {
          type: 'code',
          language: 'powershell',
          code: '$PSVersionTable.PSVersion\nwinget install --id Microsoft.PowerShell --source winget',
        },
        {
          type: 'paragraph',
          text: `El comando de instalación sale de la ${link('https://learn.microsoft.com/es-es/powershell/scripting/install/install-powershell-on-windows', 'guía de instalación de PowerShell de Microsoft')}, revisada el 8 de octubre de 2026. PowerShell 7 convive con Windows PowerShell 5.1; no lo sustituye. El ajuste <code>powershellFlags</code> de <code>settings.json</code>, dentro de la carpeta <code>.copilot</code> de tu perfil de usuario, decide cómo arranca Copilot PowerShell. El valor por defecto es:`,
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "powershellFlags": ["-NoProfile", "-NoLogo"]\n}',
        },
        {
          type: 'paragraph',
          text: 'Con <code>-NoProfile</code> no se carga tu perfil de PowerShell, así que Copilot no ve los alias ni las funciones que tengas definidos ahí. Deja el valor por defecto salvo que un comando dependa de verdad de tu perfil. El archivo admite comentarios, y <code>COPILOT_HOME</code> cambia de sitio la carpeta entera.',
        },
      ],
    },
    {
      id: 'iniciar-sesion',
      title: 'Inicia sesión con un código de dispositivo',
      content: [
        { type: 'code', language: 'powershell', code: 'copilot login --device-code' },
        {
          type: 'paragraph',
          text: `En un escritorio de Windows normal, <code>copilot login</code> abre el navegador. Con <code>--device-code</code> muestra <code>https://github.com/login/device</code> y un código de un solo uso, que también sirve por SSH o en una sesión remota. Copilot guarda el token en el llavero del sistema. Tienes los detalles en la ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli', 'documentación de autenticación de GitHub')}.`,
        },
        {
          type: 'list',
          items: [
            'No admite los tokens personales clásicos que empiezan por <code>ghp_</code>. Usa un token detallado (fine-grained) con el permiso Copilot Requests y pásalo con <code>copilot login --with-token</code>.',
            'Si existe <code>COPILOT_GITHUB_TOKEN</code>, <code>GH_TOKEN</code> o <code>GITHUB_TOKEN</code>, Copilot lo usa antes que el llavero, en ese orden. Si no hay ninguno, recurre a GitHub CLI si tiene una sesión iniciada.',
            '<code>/logout</code> borra el token local, pero no lo revoca.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: '¿Has iniciado sesión con una cuenta y Copilot usa otra? Busca un <code>GH_TOKEN</code> o <code>GITHUB_TOKEN</code> guardado en las variables de usuario de Windows. Tiene prioridad sobre la cuenta con la que acabas de entrar.',
        },
      ],
    },
    {
      id: 'actualizaciones',
      title: 'Mantenlo actualizado',
      content: [
        {
          type: 'table',
          headers: ['Instalado con', 'Cómo se actualiza'],
          rows: [
            ['WinGet', '<code>winget upgrade GitHub.Copilot</code>'],
            ['Zip', '<code>copilot update</code>, o deja que la actualización automática se aplique en el siguiente arranque'],
            ['npm', '<code>npm install -g @github/copilot</code> (Copilot solo avisa de que hay una versión nueva)'],
            ['Instalador de CodeAgentSwarm', 'La app actualiza su propia copia, y las instalaciones de WinGet o npm con esas herramientas'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Las instalaciones independientes descargan las actualizaciones solas y las aplican la próxima vez que arranca Copilot. Para desactivarlo, arranca Copilot con <code>--no-auto-update</code> o define <code>COPILOT_AUTO_UPDATE=false</code>. <code>copilot update prerelease</code> cambia a las versiones preliminares. GitHub no explica cómo se actualiza la instalación MSI, así que comprueba <code>copilot --version</code> después.',
        },
      ],
    },
    {
      id: 'gh-copilot',
      title: 'copilot no es gh copilot',
      content: [
        {
          type: 'paragraph',
          text: 'Si ya usabas GitHub CLI, puede que aún tengas la antigua extensión <code>gh copilot</code>. Solo sugería y explicaba comandos de shell. GitHub Copilot CLI es otro programa: el comando es <code>copilot</code>, y lee tu proyecto, edita archivos y ejecuta comandos cuando los apruebas.',
        },
        {
          type: 'paragraph',
          text: 'Así que si <code>gh copilot suggest</code> funciona pero PowerShell no reconoce <code>copilot</code>, tienes la extensión antigua y no el agente. Instala Copilot CLI con cualquiera de los métodos anteriores. Lo único que comparten: una sesión iniciada en GitHub CLI puede dar a Copilot CLI la cuenta que usa.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'GitHub Copilot CLI en CodeAgentSwarm para Windows',
      content: [
        {
          type: 'paragraph',
          text: 'El soporte de Copilot llega en la versión de CodeAgentSwarm posterior a la 2.4.3. No está en la 2.4.3 ni en versiones anteriores. Así funciona en la versión de desarrollo actual, probada en macOS.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-install.webp',
          alt: 'Diálogo de instalación de GitHub Copilot CLI en CodeAgentSwarm',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm. Al pulsar Install, la app descarga el archivo oficial y comprueba su SHA-256 antes de extraerlo.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            '<strong>Instalación</strong>: elige GitHub Copilot CLI en el selector de agentes o pulsa Install en Settings > Providers. En Windows, la app descarga el zip x64 o ARM64, lo verifica con <code>SHA256SUMS</code> y deja <code>copilot.exe</code> en <code>%LOCALAPPDATA%\\copilot-cli</code>. Si ya lo instalaste con WinGet o npm, la app detecta esa copia y la actualiza con la misma herramienta.',
            '<strong>Inicio de sesión</strong>: pulsa Sign in en Chat. Usa el código de dispositivo, así que solo abres la página de GitHub y escribes el código.',
            '<strong>Chat o terminal</strong>: Chat muestra los modelos que ofrece tu cuenta, los modos Agent, Plan y Autopilot y las solicitudes de permiso. La vista de terminal ejecuta la interfaz normal de <code>copilot</code>, y una sesión de Chat sigue ahí con <code>--resume</code>.',
            '<strong>Historial y uso</strong>: Conversation History lista tus sesiones de Copilot por proyecto, y el panel Usage muestra tu cupo mensual y la fecha de renovación junto a tus otros agentes.',
          ],
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'Una conversación de Chat reanudada en la terminal de GitHub Copilot CLI con la pregunta de confianza en la carpeta',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm: una sesión iniciada en Chat sigue en la terminal, y Copilot pregunta la primera vez si confías en la carpeta.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: `Cada sesión puede vivir en su propio proyecto o worktree de git, junto a Claude Code, Codex y el resto de agentes. Lee ${link('/es/guias/enjambre-de-agentes-github-copilot-cli', 'cómo montar un enjambre de agentes con GitHub Copilot CLI')} para organizarlo, ${link('/es/guias/modo-yolo-github-copilot-cli', 'el modo YOLO de GitHub Copilot CLI')} antes de aprobarlo todo y ${link('/es/guias/github-copilot-cli-en-linux', 'GitHub Copilot CLI en Linux')} si también trabajas en WSL o en un servidor.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Necesito WSL para usar GitHub Copilot CLI en Windows?',
      answer: 'No. GitHub publica compilaciones nativas de Windows para x64 y ARM64, además de un paquete de WinGet y un MSI. Dentro de WSL usarías la compilación de Linux, que es una instalación aparte.',
    },
    {
      question: '¿GitHub Copilot CLI funciona en Windows ARM?',
      answer: 'Sí. Hay un zip y un MSI nativos para ARM64. WinGet y el instalador de CodeAgentSwarm eligen la compilación que corresponde al equipo.',
    },
    {
      question: '¿Qué shell usa Copilot para los comandos en Windows?',
      answer: 'PowerShell. Prefiere PowerShell 7 o posterior (pwsh) y, si no está instalado, usa Windows PowerShell. GitHub pide PowerShell 6 o posterior, así que instala PowerShell 7 si solo tienes la 5.1 que trae Windows.',
    },
    {
      question: '¿Por qué PowerShell no reconoce copilot justo después de instalarlo?',
      answer: 'Casi siempre es porque la terminal se abrió antes de la instalación y conserva el PATH anterior. Abre una nueva. Si instalaste con npm, la carpeta que muestra npm prefix -g tiene que estar en el PATH; con el zip, la añades tú.',
    },
    {
      question: '¿gh copilot es lo mismo que GitHub Copilot CLI?',
      answer: 'No. gh copilot es una antigua extensión de GitHub CLI que sugería y explicaba comandos de shell. GitHub Copilot CLI es el comando copilot, un agente que edita archivos y ejecuta comandos cuando los apruebas.',
    },
  ],
}

export default guide
