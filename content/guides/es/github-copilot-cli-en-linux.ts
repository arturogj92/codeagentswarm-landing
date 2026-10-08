import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-en-linux',
    locale: 'es',
    title: 'Cómo instalar GitHub Copilot CLI en Linux (e iniciar sesión por SSH)',
    metaTitle: 'GitHub Copilot CLI en Linux: instalación, login por SSH y errores',
    metaDescription: 'Instala GitHub Copilot CLI en Linux con el script oficial, Homebrew o npm, úsalo en Alpine, entra por SSH con un código o un token y corrige los errores típicos.',
    intro: 'GitHub Copilot CLI funciona en Linux como un único binario llamado <code>copilot</code>. En esta guía vemos los tres métodos de instalación, el caso de Alpine (musl) que el script no resuelve, cómo iniciar sesión en un servidor sin navegador, los tokens para máquinas sin pantalla, los modelos locales, las actualizaciones y los errores que más te vas a encontrar. Comprobamos los comandos con el script de instalación de la 1.0.93 y la documentación de GitHub el 8 de octubre de 2026.',
    ctaText: '¿Usas Copilot en tu escritorio Linux? A partir de la versión que sigue a la 2.4.3, CodeAgentSwarm te instala la compilación correcta, glibc o musl, y mantiene varias sesiones de Copilot en paralelo junto a tus otros agentes.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-on-linux',
    relatedSlug: 'como-usar-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'instalacion-rapida',
      title: 'Respuesta rápida: instala GitHub Copilot CLI en Linux',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: ejecuta el script oficial, sin sudo. Instala <code>~/.local/bin/copilot</code> y comprueba la descarga con las sumas de verificación que publica GitHub. Después entra en un proyecto, escribe <code>copilot</code> e inicia sesión.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Script oficial para Linux y macOS (también vale wget -qO-)
curl -fsSL https://gh.io/copilot-install | bash

# Comprueba la instalación
copilot --version

# Arráncalo dentro de un proyecto
cd ~/mi-proyecto
copilot`,
        },
        {
          type: 'paragraph',
          text: `Fuentes: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli', 'documentación de instalación de GitHub')} y ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli', 'documentación de autenticación de GitHub')}, revisadas el 8 de octubre de 2026. Si buscas una visión general del agente, lee ${link('/es/guias/como-usar-github-copilot-cli', 'cómo instalar y usar GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'metodos-de-instalacion',
      title: 'Script, Homebrew o npm',
      content: [
        {
          type: 'table',
          headers: ['Método', 'Comando', 'Qué conviene saber'],
          rows: [
            ['Script oficial', '<code>curl -fsSL https://gh.io/copilot-install | bash</code>', 'Binario independiente. <code>~/.local/bin</code> como usuario normal, <code>/usr/local/bin</code> como root.'],
            ['Homebrew', '<code>brew install --cask copilot-cli</code>', 'Versión preliminar: <code>copilot-cli@prerelease</code>.'],
            ['npm', '<code>npm install -g @github/copilot</code>', 'Necesita Node.js 22 o posterior. Versión preliminar: <code>@github/copilot@prerelease</code>.'],
          ],
          caption: 'Métodos de instalación que recoge la documentación de GitHub, revisada el 8 de octubre de 2026.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Instala en la carpeta que elijas y fija una versión
curl -fsSL https://gh.io/copilot-install | VERSION="v1.0.93" PREFIX="$HOME/tools" bash
# El binario queda en $HOME/tools/bin/copilot`,
        },
        {
          type: 'paragraph',
          text: 'El script lee dos variables. <code>PREFIX</code> elige la carpeta base y el binario va a <code>$PREFIX/bin</code>. <code>VERSION</code> elige una versión publicada (por defecto, la última; <code>prerelease</code> también funciona si tienes <code>git</code>). Si encuentra <code>sha256sum</code> o <code>shasum</code>, el script verifica el archivo con <code>SHA256SUMS.txt</code> antes de extraerlo y se detiene si la suma no coincide.',
        },
      ],
    },
    {
      id: 'alpine-musl',
      title: 'Alpine y otras distribuciones con musl',
      content: [
        {
          type: 'paragraph',
          text: `GitHub publica dos compilaciones de Linux para cada arquitectura: <code>copilot-linux-x64</code> y <code>copilot-linux-arm64</code> para distribuciones con glibc (Ubuntu, Debian, Fedora y casi todas las demás), y <code>copilot-linuxmusl-x64</code> y <code>copilot-linuxmusl-arm64</code> para distribuciones con musl como Alpine. Cuando leímos el ${link('https://gh.io/copilot-install', 'script de instalación')} el 8 de octubre de 2026, siempre descargaba la compilación de glibc. En Alpine, descarga tú mismo el archivo musl desde la ${link('https://github.com/github/copilot-cli/releases', 'página de versiones')}:`,
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Alpine en x64 (en ARM64 usa copilot-linuxmusl-arm64)
BASE=https://github.com/github/copilot-cli/releases/latest/download
curl -fsSLO $BASE/copilot-linuxmusl-x64.tar.gz
curl -fsSLO $BASE/SHA256SUMS.txt
grep copilot-linuxmusl-x64.tar.gz SHA256SUMS.txt | sha256sum -c -
mkdir -p ~/.local/bin
tar -xz -C ~/.local/bin -f copilot-linuxmusl-x64.tar.gz
copilot --version`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: '¿No sabes cuál tienes? Ejecuta <code>ldd --version</code>. Si la salida menciona musl, o existe <code>/etc/alpine-release</code>, usa la compilación musl. En Alpine también puedes usar el paquete de npm si ya tienes Node.js 22 o posterior.',
        },
      ],
    },
    {
      id: 'iniciar-sesion-por-ssh',
      title: 'Inicia sesión por SSH con un código de dispositivo',
      content: [
        {
          type: 'paragraph',
          text: 'En un escritorio, <code>copilot login</code> abre el navegador. Por SSH, en contenedores de desarrollo, en CI y en un Linux sin entorno gráfico usa por defecto el flujo de código de dispositivo, así que puedes iniciar sesión desde cualquier otro aparato.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `copilot login                 # código de dispositivo por defecto en SSH
copilot login --device-code   # fuerza el código de dispositivo
copilot login --web-flow      # fuerza el navegador`,
        },
        {
          type: 'list',
          items: [
            'El comando muestra <code>https://github.com/login/device</code> y un código de un solo uso. Abre esa página en el portátil o el móvil, escribe el código y aprueba el acceso.',
            'Dentro de la interfaz interactiva, <code>/login</code> hace lo mismo. <code>/user list</code> y <code>/user switch</code> gestionan varias cuentas.',
            'Con GitHub Enterprise Cloud y residencia de datos, añade <code>--host https://example.ghe.com</code> (con tu dominio) o define <code>COPILOT_GH_HOST</code>.',
            'La primera vez que abres Copilot en una carpeta, te pide confirmar que confías en ella. Responde una vez o pide que recuerde la carpeta.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Copilot guarda el token en el llavero del sistema. Un servidor sin entorno gráfico muchas veces no tiene llavero (por ejemplo, le falta <code>libsecret</code>). En ese caso Copilot pregunta si quieres guardar el token en texto plano en <code>~/.copilot/config.json</code>. Acepta solo en una máquina que controles y deja ese archivo fuera de las copias que compartas. <code>/logout</code> borra el token local, pero no lo revoca en GitHub.',
        },
      ],
    },
    {
      id: 'token-sin-pantalla',
      title: 'Máquinas sin pantalla y CI: COPILOT_GITHUB_TOKEN',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando nadie puede escribir un código de dispositivo, dale a Copilot un token. Tiene que ser un token de acceso personal de grano fino (fine-grained) con el permiso <strong>Copilot Requests</strong>:',
        },
        {
          type: 'list',
          items: [
            `Abre ${link('https://github.com/settings/personal-access-tokens/new', 'la página de tokens fine-grained')} en GitHub.`,
            'En Resource owner, elige tu cuenta personal.',
            'En Account permissions, añade <strong>Copilot Requests</strong> y genera el token.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Opción 1: variable de entorno, no se guarda nada en disco
export COPILOT_GITHUB_TOKEN="github_pat_..."
copilot

# Opción 2: guárdalo una vez (se lee por la entrada estándar)
copilot login --with-token < ~/copilot-token.txt`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Los tokens clásicos que empiezan por <code>ghp_</code> no funcionan. Copilot mira <code>COPILOT_GITHUB_TOKEN</code>, después <code>GH_TOKEN</code>, después <code>GITHUB_TOKEN</code>, luego el llavero y por último una sesión de GitHub CLI. Si el servidor ya exporta un <code>GITHUB_TOKEN</code> para otra cosa, Copilot puede usarlo; define <code>COPILOT_GITHUB_TOKEN</code> para dejar clara la elección.',
        },
      ],
    },
    {
      id: 'modelo-propio-sin-conexion',
      title: 'Tu propio modelo, o sin conexión',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot CLI puede hablar con tu propio proveedor (BYOK) en lugar de con los modelos de GitHub, y entonces no necesita iniciar sesión en GitHub. <code>COPILOT_PROVIDER_TYPE</code> acepta <code>openai</code> (el valor por defecto, para cualquier endpoint compatible con la API Chat Completions de OpenAI), <code>azure</code> o <code>anthropic</code>. Un proveedor remoto también pide <code>COPILOT_PROVIDER_API_KEY</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Ejemplo de la documentación de GitHub: un servidor Ollama local
export COPILOT_PROVIDER_BASE_URL=http://localhost:11434
export COPILOT_MODEL=YOUR-MODEL-NAME
# Opcional: no contactar nunca con los servidores de GitHub
export COPILOT_OFFLINE=true
copilot`,
        },
        {
          type: 'list',
          items: [
            'El modelo tiene que admitir llamadas a herramientas y streaming. GitHub recomienda una ventana de contexto de al menos 128k tokens.',
            '<code>COPILOT_OFFLINE=true</code> exige un proveedor local. GitHub avisa de que el modo sin conexión solo te aísla del todo si el proveedor también corre en local o dentro de la misma red aislada.',
            '<code>--model</code> en la línea de comandos hace lo mismo que <code>COPILOT_MODEL</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: `Fuente: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-byok-models', 'documentación de GitHub sobre modelos BYOK')}, revisada el 8 de octubre de 2026.`,
        },
      ],
    },
    {
      id: 'actualizaciones',
      title: 'Actualizaciones, y cómo apagarlas en CI',
      content: [
        {
          type: 'table',
          headers: ['Instalado con', 'Cómo se actualiza'],
          rows: [
            ['Script o archivo de la versión', 'Descarga las actualizaciones solo y las aplica en el siguiente arranque. <code>copilot update</code> lo hace al momento.'],
            ['npm', 'Solo avisa de que hay una versión nueva. Actualiza con <code>npm install -g @github/copilot</code>.'],
            ['Homebrew', 'Actualiza con <code>brew upgrade --cask copilot-cli</code>.'],
          ],
          caption: 'En CI la actualización automática ya viene apagada por defecto.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `copilot update              # última versión estable
copilot update prerelease   # última versión preliminar

# Mantén una versión fija en un servidor compartido o una imagen de build
copilot --no-auto-update
export COPILOT_AUTO_UPDATE=false`,
        },
        {
          type: 'paragraph',
          text: 'En una imagen de build, fija la versión con <code>VERSION</code> al instalar y deja la actualización automática apagada, así todos los trabajos usan el mismo binario.',
        },
      ],
    },
    {
      id: 'errores-comunes',
      title: 'Errores habituales en Linux y cómo arreglarlos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"copilot: command not found" después de instalar:</strong> <code>~/.local/bin</code> no está en tu PATH. El script se ofrece a añadirlo a <code>~/.profile</code>, <code>~/.bash_profile</code> o <code>~/.zprofile</code>. Si no, añade tú <code>export PATH="$HOME/.local/bin:$PATH"</code> y abre una shell nueva.',
            '<strong>"Error: Unsupported architecture":</strong> el script solo admite x86_64 y aarch64. Compruébalo con <code>uname -m</code>.',
            '<strong>El binario está, pero no arranca en Alpine:</strong> tienes la compilación de glibc en un sistema con musl. Instala el archivo <code>linuxmusl</code> como se explica arriba.',
            '<strong>"Could not create directory ... You may not have write permissions":</strong> pon en <code>PREFIX</code> una carpeta tuya, o ejecuta el script como root para instalar en <code>/usr/local/bin</code>.',
            '<strong>"No sha256sum or shasum found, skipping checksum validation":</strong> instala coreutils con tu gestor de paquetes y vuelve a ejecutar el script.',
            '<strong>El login no termina nunca por SSH:</strong> fuerza <code>copilot login --device-code</code>.',
            '<strong>Rechaza el token:</strong> seguramente es un token clásico <code>ghp_</code>, o uno fine-grained sin el permiso Copilot Requests.',
            '<strong>El paquete de npm no se instala o no arranca:</strong> revisa <code>node --version</code>. El paquete necesita Node.js 22 o posterior.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Los registros están en <code>~/.copilot/logs/</code>. Sube el nivel de detalle con <code>--log-level</code> o guárdalos en otra carpeta con <code>--log-dir</code>.',
        },
      ],
    },
    {
      id: 'servidor-remoto-y-codeagentswarm',
      title: 'En un servidor remoto y en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'En un servidor remoto, arranca Copilot dentro de <code>tmux</code> o <code>screen</code> para que un corte de SSH no termine la sesión. Si aun así se corta, <code>copilot --continue</code> reabre la última sesión y <code>copilot --resume &lt;id&gt;</code> reabre una concreta. Las sesiones se guardan en <code>~/.copilot/session-state/</code> de ese servidor.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-install.webp',
          alt: 'Diálogo de instalación de GitHub Copilot CLI en CodeAgentSwarm',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm. Al pulsar Install, la app descarga el archivo oficial y comprueba su SHA-256 antes de extraerlo.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: `En un escritorio Linux, ${link('/es', 'CodeAgentSwarm')} añade GitHub Copilot CLI en la versión que sigue a la 2.4.3. Elige GitHub Copilot CLI en el selector de agentes o instálalo desde Settings > Providers: la app descarga el archivo oficial para tu equipo, glibc o musl, verifica <code>SHA256SUMS</code> e instala <code>~/.local/bin/copilot</code>. Si ya instalaste Copilot con npm o Homebrew, la app lo detecta y lo actualiza con esa misma herramienta. Inicias sesión desde Chat con un código de dispositivo, y una sesión empezada en Chat continúa en la vista de terminal.`,
        },
        {
          type: 'image',
          src: '/images/guides/copilot-usage-panel.webp',
          alt: 'Asignación mensual de GitHub Copilot CLI en el panel de uso de CodeAgentSwarm',
          caption: 'Interfaz real de una versión de desarrollo de CodeAgentSwarm. El 7 % restante que se ve sale de datos de prueba, no de una cuenta real.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: `El panel de uso muestra tu asignación mensual de Copilot y la fecha de renovación junto a tus otros agentes. La lee con un token del entorno o con una sesión de GitHub CLI, nunca del llavero. Puedes tener varias sesiones de Copilot en paralelo, cada una en su proyecto o en su ${link('/es/guias/git-worktrees-para-agentes-de-ia', 'git worktree')}, junto a Claude Code, Codex y los demás agentes compatibles. Siguiente paso: ${link('/es/guias/github-copilot-cli-mcp-historial', 'MCP e historial en Copilot CLI')} y ${link('/es/guias/github-copilot-cli-modelos-creditos-ia', 'modelos y créditos de IA')}.`,
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'En casi cualquier Linux, una línea de <code>curl</code> instala GitHub Copilot CLI en tu carpeta personal. Alpine necesita el archivo musl a mano. Por SSH el código de dispositivo es el flujo por defecto, las máquinas sin pantalla usan un token fine-grained en <code>COPILOT_GITHUB_TOKEN</code>, y <code>COPILOT_OFFLINE=true</code> con un modelo local deja todo dentro de tu red. Apaga la actualización automática donde necesites una versión fija.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo instalo GitHub Copilot CLI en Linux?',
      answer: 'Ejecuta "curl -fsSL https://gh.io/copilot-install | bash". Instala el binario en ~/.local/bin como usuario normal, o en /usr/local/bin como root. También funcionan Homebrew ("brew install --cask copilot-cli") y npm ("npm install -g @github/copilot", con Node.js 22 o posterior).',
    },
    {
      question: '¿GitHub Copilot CLI funciona en Alpine Linux?',
      answer: 'Sí. GitHub publica compilaciones musl para x64 y ARM64 (copilot-linuxmusl-x64 y copilot-linuxmusl-arm64). El script de instalación que revisamos el 8 de octubre de 2026 siempre bajaba la de glibc, así que descarga el archivo musl desde la página de versiones o usa npm.',
    },
    {
      question: '¿Cómo inicio sesión en Copilot CLI en un servidor sin navegador?',
      answer: 'Ejecuta "copilot login". Por SSH usa por defecto el código de dispositivo: muestra github.com/login/device y un código que escribes en cualquier otro aparato. En máquinas donde nadie puede escribir, exporta COPILOT_GITHUB_TOKEN con un token fine-grained que tenga el permiso Copilot Requests.',
    },
    {
      question: '¿Puedo usar GitHub Copilot CLI sin conexión?',
      answer: 'Sí, con tu propio modelo local. Define COPILOT_PROVIDER_BASE_URL y COPILOT_MODEL para el proveedor local y después COPILOT_OFFLINE=true. El modelo debe admitir llamadas a herramientas y streaming. Con esa configuración no hace falta iniciar sesión en GitHub.',
    },
    {
      question: '¿Cómo evito que GitHub Copilot CLI se actualice solo?',
      answer: 'Arráncalo con --no-auto-update o define COPILOT_AUTO_UPDATE=false. En CI la actualización automática ya viene apagada por defecto. Las instalaciones de npm nunca se actualizan solas; solo avisan de que hay una versión nueva.',
    },
  ],
}

export default guide
