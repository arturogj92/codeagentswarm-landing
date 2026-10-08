import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-mcp-historial',
    locale: 'es',
    title: 'GitHub Copilot CLI: MCP, instrucciones e historial de sesiones',
    metaTitle: 'MCP en GitHub Copilot CLI: configurar y reanudar sesiones',
    metaDescription: 'Añade servidores MCP a GitHub Copilot CLI con mcp-config.json o copilot mcp add, carga instrucciones y skills, y reanuda sesiones guardadas por ID o nombre.',
    intro: 'Los servidores MCP dan a GitHub Copilot CLI herramientas extra, los archivos de instrucciones le cuentan cómo funciona tu proyecto y las sesiones guardadas te dejan seguir donde lo dejaste. Esta guía explica dónde vive cada cosa y qué comandos sirven para comprobarla. La probamos con Copilot CLI 1.0.93 el 8 de octubre de 2026.',
    ctaText: 'Busca cualquier sesión de GitHub Copilot CLI y reábrela en Chat o en la terminal con CodeAgentSwarm, a partir de la versión que sigue a la 2.4.3.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-mcp-history',
    relatedSlug: 'como-usar-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'respuesta-rapida',
      title: 'Comprueba qué cargará una sesión',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: `Con tres comandos resuelves casi todas las dudas antes de empezar: qué servidores MCP hay configurados, qué archivos de instrucciones se aplican en esta carpeta y cómo seguir con tu última sesión. Si todavía no tienes Copilot instalado, empieza por ${link('/es/guias/como-usar-github-copilot-cli', 'cómo instalar y usar GitHub Copilot CLI')}.`,
        },
        { type: 'code', language: 'bash', code: 'copilot mcp list\ncopilot instruction list\ncopilot --continue' },
        {
          type: 'paragraph',
          text: 'Todo lo que verás aquí vive dentro de <code>~/.copilot</code>, salvo que definas <code>COPILOT_HOME</code>, que mueve la carpeta entera.',
        },
      ],
    },
    {
      id: 'mcp-config',
      title: 'Añade un servidor MCP en mcp-config.json',
      content: [
        {
          type: 'paragraph',
          text: 'Tus servidores MCP personales van en <code>~/.copilot/mcp-config.json</code>, dentro de la clave <code>mcpServers</code>. Un servidor local es un proceso que corre en tu equipo y se comunica por stdio, así que necesita <code>type: "local"</code>, el <code>command</code> que lo arranca y sus <code>args</code>. Este es el ejemplo de la documentación de GitHub:',
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "mcpServers": {\n    "playwright": {\n      "type": "local",\n      "command": "npx",\n      "args": ["@playwright/mcp@latest"],\n      "env": {},\n      "tools": ["*"]\n    }\n  }\n}',
        },
        {
          type: 'paragraph',
          text: `<code>"tools": ["*"]</code> expone todas las herramientas del servidor. Si pones nombres concretos, solo verá esos. Fuente: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers', 'Adding MCP servers for GitHub Copilot CLI')}, revisada el 8 de octubre de 2026.`,
        },
      ],
    },
    {
      id: 'mcp-add',
      title: 'Cómo añadir un servidor MCP desde la línea de comandos',
      content: [
        {
          type: 'paragraph',
          text: 'Si prefieres no tocar el JSON, <code>copilot mcp add</code> escribe en el mismo archivo de usuario por ti. Pon el comando de un servidor local después de <code>--</code>, o usa <code>--transport http</code> y una URL para uno remoto.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Servidor local (stdio)\ncopilot mcp add playwright -- npx @playwright/mcp@latest\n\n# Servidor remoto (HTTP)\ncopilot mcp add --transport http docs https://your-mcp-server.example/mcp\n\n# Comprueba el resultado\ncopilot mcp list\ncopilot mcp get playwright',
        },
        {
          type: 'paragraph',
          text: 'En la 1.0.93, <code>copilot mcp add</code> también acepta <code>--env CLAVE=VALOR</code> y <code>--header</code>, que puedes repetir, y <code>--tools</code> con <code>"*"</code> para todas las herramientas, una lista separada por comas o <code>""</code> para ninguna. Más adelante gestionas el servidor con <code>copilot mcp enable</code>, <code>disable</code> y <code>remove</code>. Dentro de una sesión, <code>/mcp</code> abre un panel con cada servidor y su estado, y <code>/mcp list</code> muestra lo mismo como texto.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `La URL HTTP del ejemplo es inventada, no un servicio real. Añade solo servidores de confianza y no dejes tokens en archivos que vayas a subir al repositorio. Añadir un servidor no aprueba sus acciones: Copilot sigue preguntando antes de usar sus herramientas salvo que las permitas, como explica ${link('/es/guias/modo-yolo-github-copilot-cli', 'el modo YOLO de GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'ambitos-mcp',
      title: 'Dónde puede vivir la configuración MCP',
      content: [
        {
          type: 'table',
          headers: ['Origen', 'Dónde', 'Para qué'],
          rows: [
            ['Usuario', '<code>~/.copilot/mcp-config.json</code>', 'Servidores que quieres en todos los proyectos'],
            ['Proyecto, local', '<code>.mcp.json</code> en el proyecto', 'Ajustes de una sola copia del repositorio'],
            ['Proyecto, compartido', '<code>.github/mcp.json</code> en el proyecto', 'Configuración que subes al repositorio para el equipo'],
            ['Una sesión', '<code>--additional-mcp-config</code>', 'Probar un servidor sin guardarlo'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Los plugins también pueden traer sus propios servidores. <code>--additional-mcp-config</code> admite una cadena JSON o la ruta de un archivo precedida de <code>@</code>, se puede repetir y se suma a tu configuración de usuario solo durante esa sesión.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --additional-mcp-config @./extra-mcp.json\ncopilot --disable-mcp-server playwright\ncopilot --disable-builtin-mcps',
        },
        { type: 'heading', level: 3, text: 'El servidor MCP de GitHub integrado', id: 'mcp-github-integrado' },
        {
          type: 'paragraph',
          text: 'Copilot CLI trae el servidor MCP de GitHub ya conectado, así que las herramientas de GitHub están disponibles sin configurar nada. Por defecto la CLI recibe solo una parte de esas herramientas; <code>--enable-all-github-mcp-tools</code> activa el resto (según <code>copilot help</code> en la 1.0.93). <code>--disable-builtin-mcps</code> apaga todos los servidores integrados, que en la 1.0.93 son <code>github-mcp-server</code> y <code>githubiq</code>. Para quitar uno solo, usa <code>--disable-mcp-server</code> con su nombre.',
        },
      ],
    },
    {
      id: 'instrucciones',
      title: 'Instrucciones propias: copilot-instructions.md y AGENTS.md',
      content: [
        {
          type: 'table',
          headers: ['Archivo', 'A quién se aplica'],
          rows: [
            ['<code>~/.copilot/copilot-instructions.md</code>', 'A ti, en todos los proyectos'],
            ['<code>.github/copilot-instructions.md</code>', 'A todo el que trabaje en el repositorio'],
            ['<code>.github/instructions/**/*.instructions.md</code>', 'Al repositorio, repartido en varios archivos'],
            ['<code>AGENTS.md</code>, <code>CLAUDE.md</code>, <code>GEMINI.md</code>', 'Al repositorio, compartido con otros agentes'],
          ],
        },
        {
          type: 'paragraph',
          text: `Copilot lee las instrucciones del repositorio desde la raíz de git y desde tu carpeta actual. Ojo con un detalle: un <code>AGENTS.md</code> en tu carpeta personal no se carga, así que tus reglas personales van en <code>copilot-instructions.md</code>. <code>COPILOT_CUSTOM_INSTRUCTIONS_DIRS</code> añade más carpetas y <code>--no-custom-instructions</code> arranca una sesión sin ninguna. Fuente: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions', 'Adding custom instructions for GitHub Copilot CLI')}, revisada el 8 de octubre de 2026.`,
        },
        { type: 'code', language: 'bash', code: 'copilot instruction list' },
      ],
    },
    {
      id: 'skills',
      title: 'Carpetas de skills',
      content: [
        {
          type: 'list',
          items: [
            'Skills del proyecto: <code>.github/skills/</code>, <code>.agents/skills/</code> o <code>.claude/skills/</code>.',
            'Skills personales: <code>~/.copilot/skills/</code> o <code>~/.agents/skills/</code>.',
            'Se gestionan con <code>copilot skill list</code>, <code>add</code>, <code>remove</code>, <code>enable</code> y <code>disable</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: `Como Copilot también lee <code>.claude/skills/</code> y <code>.agents/skills/</code>, un proyecto puede tener un único juego de skills para varios agentes. Mira ${link('/es/guias/compartir-skills-entre-claude-code-codex-antigravity', 'cómo compartir skills entre agentes')}.`,
        },
      ],
    },
    {
      id: 'sesiones',
      title: 'Dónde se guardan las sesiones y cómo reanudarlas',
      content: [
        {
          type: 'paragraph',
          text: 'Cada sesión tiene su propia carpeta. <code>workspace.yaml</code> guarda el ID, la carpeta de trabajo, el nombre y las fechas; <code>events.jsonl</code> guarda la conversación.',
        },
        {
          type: 'code',
          language: 'text',
          code: '~/.copilot/session-state/<id-de-sesion>/\n  workspace.yaml\n  events.jsonl',
        },
        {
          type: 'table',
          headers: ['Comando', 'Qué hace'],
          rows: [
            ['<code>copilot --resume</code>', 'Abre un selector con tus sesiones guardadas'],
            ['<code>copilot --resume=&lt;valor&gt;</code>', 'Reanuda por ID de sesión, prefijo del ID de 7 o más caracteres hexadecimales o nombre exacto (sin distinguir mayúsculas)'],
            ['<code>copilot --continue</code>', 'Reanuda la sesión más reciente'],
            ['<code>copilot --session-id=&lt;uuid&gt;</code>', 'Reanuda esa sesión o usa el UUID para una nueva'],
            ['<code>copilot -n "mi tarea"</code>', 'Pone nombre a una sesión nueva para reanudarla luego por nombre'],
          ],
          caption: 'Según copilot help en GitHub Copilot CLI 1.0.93.',
        },
        {
          type: 'paragraph',
          text: 'Dentro de una sesión, <code>/rename</code> le cambia el nombre. <code>copilot sessions import</code> importa una sesión guardada en JSONL. Añade <code>--allow-all-tools</code> al comando de reanudar solo si quieres que esa sesión use herramientas sin preguntarte.',
        },
      ],
    },
    {
      id: 'historial-codeagentswarm',
      title: 'Busca y reabre sesiones en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'El soporte de GitHub Copilot CLI llega en la versión de CodeAgentSwarm que sigue a la 2.4.3; todavía no está en ninguna versión publicada. Con ella, el historial de conversaciones muestra tus sesiones de Copilot junto a las de tus otros agentes. Puedes filtrar por agente y proyecto, buscar dentro de los mensajes, guardar una conversación en marcadores y reabrirla en Chat o en la terminal.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-history.webp',
          alt: 'Conversaciones de GitHub Copilot CLI filtradas en el historial de CodeAgentSwarm',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm, con una conversación de ejemplo creada para pruebas.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Los turnos de un subagente quedan dentro de la sesión que lo lanzó, así que cada fila es una conversación que puedes reanudar. Una sesión iniciada en Chat continúa en la terminal con <code>copilot --resume</code>. La primera vez que Copilot se abre en una carpeta, te pregunta si confías en ella; contesta una vez o pide que recuerde la carpeta.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'Conversación de Chat reanudada en la terminal de GitHub Copilot CLI con la pregunta de confianza en la carpeta',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm: la sesión iniciada en Chat continúa en la terminal y Copilot pide confianza en la carpeta.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'También puedes guardar una sesión como atajo y limpiar sesiones antiguas conversación a conversación.',
        },
      ],
    },
    {
      id: 'mcp-codeagentswarm',
      title: 'La entrada MCP de CodeAgentSwarm es opcional',
      content: [
        {
          type: 'paragraph',
          text: 'Si lo permites en Settings > Privacy, CodeAgentSwarm añade sus herramientas de tareas y títulos como una entrada en <code>~/.copilot/mcp-config.json</code> y una sección breve en <code>copilot-instructions.md</code>. Tus servidores no cambian.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Al desactivar la opción solo se quita la entrada de CodeAgentSwarm. Copilot funciona igual sin ella.',
        },
        {
          type: 'paragraph',
          text: `Para modelos y uso mensual, lee ${link('/es/guias/github-copilot-cli-modelos-creditos-ia', 'modelos, créditos de IA y límites de GitHub Copilot CLI')}. Para tener varias sesiones de Copilot a la vez, mira ${link('/es/guias/enjambre-de-agentes-github-copilot-cli', 'la guía del enjambre de agentes con GitHub Copilot CLI')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Dónde está el archivo de configuración MCP de GitHub Copilot CLI?',
      answer: 'Tus servidores personales están en ~/.copilot/mcp-config.json. Un proyecto puede añadir .mcp.json o .github/mcp.json. Ejecuta copilot mcp list para ver todos los servidores que cargará una sesión.',
    },
    {
      question: '¿Tengo que añadir yo el servidor MCP de GitHub?',
      answer: 'No. Viene integrado y funciona sin configurar nada. Arranca Copilot con --disable-builtin-mcps si quieres una sesión sin él.',
    },
    {
      question: '¿Copilot CLI lee AGENTS.md?',
      answer: 'Sí, el del repositorio: en la raíz de git y en tu carpeta actual. Un AGENTS.md en tu carpeta personal no se carga; para instrucciones personales usa ~/.copilot/copilot-instructions.md.',
    },
    {
      question: '¿Cómo reanudo una sesión de GitHub Copilot CLI?',
      answer: 'Ejecuta copilot --continue para la sesión más reciente, copilot --resume para elegir una de la lista, o copilot --resume con un ID, un prefijo del ID o un nombre para una concreta.',
    },
    {
      question: '¿CodeAgentSwarm puede reabrir sesiones que empecé en la terminal?',
      answer: 'Sí, a partir de la versión que sigue a la 2.4.3. El historial de conversaciones muestra las sesiones de Copilot, busca en sus mensajes y reabre cualquiera en Chat o en la terminal.',
    },
  ],
}

export default guide
