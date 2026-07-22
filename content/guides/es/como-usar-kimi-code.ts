import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'como-usar-kimi-code',
    locale: 'es',
    title: 'Cómo usar Kimi Code: instalación, login, comandos y la trampa de kimi-cli',
    metaTitle: 'Cómo usar Kimi Code CLI: instalación y comandos (2026)',
    metaDescription: 'Guía práctica de Kimi Code, el agente de terminal de Moonshot AI con Kimi K3: cómo instalarlo, iniciar sesión, los comandos clave y cómo no instalar el kimi equivocado.',
    intro: `Kimi Code es el agente de programación de línea de comandos de Moonshot AI, la herramienta que quieres cuando prefieres tener Kimi K3 trabajando en tu terminal en vez de en una ventana de chat. Lo instalas, ejecutas <code>kimi</code> dentro de un proyecto, y lee tu código, edita archivos y lanza comandos igual que hacen Claude Code o Codex CLI.

Hay una cosa que debes saber antes de escribir ni un solo comando de instalación: Moonshot ha publicado dos productos distintos que instalan un binario llamado <code>kimi</code>, y los nombres de paquete están cruzados de una forma que manda a mucha gente al equivocado. Esta guía empieza por esa trampa, porque es la forma más habitual de que una instalación de Kimi Code salga torcida, y después recorre la instalación, el login, los flags y convenciones que usarás de verdad, y cómo ejecutar Kimi Code dentro de CodeAgentSwarm junto al resto de tus agentes.

Kimi Code se mueve rápido, con versiones nuevas casi a diario, así que donde algo tenga pinta de poder cambiar te lo diré y te apuntaré a la documentación oficial.`,
    ctaText: 'Ejecuta Kimi Code como agente de primera en CodeAgentSwarm, junto a Claude Code, Codex y los demás. Terminales en paralelo, notificaciones de escritorio, historial buscable y diffs en vivo, con la cuota semanal y de 5 horas de Kimi siempre a la vista.',
    highlightedWords: ['Kimi Code'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'how-to-use-kimi-code',
  },
  sections: [
    {
      id: 'que-es-kimi-code',
      title: '¿Qué es Kimi Code?',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi Code es el agente de programación oficial para terminal de <a href="https://github.com/MoonshotAI/kimi-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Moonshot AI</a>, la empresa detrás de los modelos Kimi. Es open source con licencia MIT, está escrito en TypeScript y se invoca con el comando <code>kimi</code>. Lo ejecutas dentro de la carpeta de un proyecto, le cuentas qué quieres, y planifica, edita archivos y ejecuta comandos de shell con tu aprobación.',
        },
        {
          type: 'paragraph',
          text: 'Por debajo funciona con Kimi K3, el modelo que Moonshot lanzó el 16 de julio de 2026: un Mixture of Experts de 2,8 billones de parámetros con una ventana de contexto de hasta 1.048.576 tokens y visión nativa. K3 siempre razona antes de responder, lo que lo hace fuerte en trabajo difícil de varios pasos. Si quieres el detalle del modelo y lo que cuesta, la <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de planes y precios</a> entra a fondo en eso.',
        },
        {
          type: 'paragraph',
          text: 'Si ya usas Claude Code, Kimi Code te resultará familiar a propósito. Sus tools llevan los mismos nombres (Bash, Read, Write, Edit), sigue la convención AGENTS.md para las instrucciones de proyecto, y su configuración de MCP es compatible con el archivo <code>.mcp.json</code> que Claude Code ya lee. La comparativa <a href="/es/guias/kimi-code-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code vs Claude Code</a> cubre exactamente en qué se diferencian.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Kimi Code está en versión pre-1.0 y publica más o menos una release al día. Ese ritmo hace que los arreglos lleguen rápido, y también que los detalles de cualquier guía (esta incluida) puedan quedarse atrás. Ante la duda, la <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/guides/getting-started" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de Kimi Code</a> es la fuente de verdad.',
        },
      ],
    },
    {
      id: 'la-trampa-de-los-dos-kimis',
      title: 'Antes de instalar: la trampa de los dos kimis',
      content: [
        {
          type: 'paragraph',
          text: 'Moonshot ha publicado dos agentes de terminal, y los dos instalan un binario llamado <code>kimi</code>. Equivocarse aquí es la forma número uno de acabar confundido, y la mayoría de posts sobre Kimi Code ni lo mencionan.',
        },
        {
          type: 'list',
          items: [
            '<strong>kimi-cli (legacy):</strong> el agente original en Python, en el repositorio MoonshotAI/kimi-cli, con sus datos en <code>~/.kimi/</code>. Está en retirada, pero acumula años de estrellas y de posts apuntándole, así que los buscadores y los asistentes de IA siguen mandando gente allí.',
            '<strong>Kimi Code (actual):</strong> el agente en TypeScript del que va esta guía, en el repositorio MoonshotAI/kimi-code, con sus datos en <code>~/.kimi-code/</code>. Este es el que está en desarrollo activo.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Los nombres de paquete lo empeoran, porque están cruzados. El paquete de PyPI llamado <code>kimi-code</code> es un meta-paquete vacío que instala el agente legacy en Python. El Kimi Code de verdad vive en npm como <code>@moonshot-ai/kimi-code</code>. O sea: instalar "kimi-code" desde pip te da el producto viejo, y el producto nuevo llega por npm o por el script oficial de instalación.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Comprueba qué kimi tienes en realidad\nkimi --version\n\n# 0.x  -> Kimi Code, el CLI actual en TypeScript (esta guía)\n# 1.4x -> kimi-cli, el agente legacy en Python',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'No decidas por el nombre del comando, decide por la versión. Si <code>kimi --version</code> imprime una versión 0.x tienes Kimi Code; una 1.4x significa el kimi-cli legacy en Python. El instalador oficial gestiona las colisiones por ti: detecta shims del Python legacy en tu PATH, renombra el primero a <code>kimi-legacy</code> y elimina los duplicados, así que tras una instalación limpia <code>kimi</code> significa Kimi Code.',
        },
      ],
    },
    {
      id: 'instalacion',
      title: 'Cómo instalar Kimi Code',
      content: [
        {
          type: 'paragraph',
          text: 'El camino recomendado es el script oficial de instalación, que no requiere Node.js. Descarga la última release, verifica el checksum y deja el ejecutable <code>kimi</code> en tu PATH (el binario en sí queda en <code>~/.kimi-code/bin/</code>).',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# macOS y Linux\ncurl -fsSL https://code.kimi.com/kimi-code/install.sh | bash',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '# Windows (PowerShell)\nirm https://code.kimi.com/kimi-code/install.ps1 | iex',
        },
        {
          type: 'paragraph',
          text: 'Si prefieres un gestor de paquetes, Kimi Code está en npm. Esta vía necesita Node.js 22.19.0 o superior:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Comprueba primero tu versión de Node\nnode --version\n\n# npm\nnpm install -g @moonshot-ai/kimi-code\n\n# o pnpm\npnpm add -g @moonshot-ai/kimi-code',
        },
        {
          type: 'paragraph',
          text: 'En cualquiera de los dos casos, abre un terminal nuevo después y confirma la instalación con <code>kimi --version</code>. Deberías ver una versión 0.x. Para actualizar más adelante, ejecuta <code>kimi upgrade</code> y el propio CLI busca la última versión, o reinstala con <code>npm install -g @moonshot-ai/kimi-code@latest</code>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'En Windows, instala Git for Windows antes del primer arranque: Kimi Code usa Git Bash como su entorno de shell. La <a href="/es/guias/kimi-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Kimi Code en Windows</a> cubre ese requisito, los problemas de renderizado actuales y la vía WSL en detalle.',
        },
      ],
    },
    {
      id: 'login',
      title: 'Primer arranque e inicio de sesión',
      content: [
        {
          type: 'paragraph',
          text: 'Arranca Kimi Code dentro de la carpeta de un proyecto escribiendo <code>kimi</code>. En el primer arranque, usa el comando <code>/login</code> dentro del TUI. Abre un selector con dos opciones:',
        },
        {
          type: 'list',
          items: [
            '<strong>Iniciar sesión con tu cuenta de Kimi:</strong> un flujo OAuth de código de dispositivo. Kimi Code te enseña un enlace, confirmas en el navegador y el CLI recoge la sesión. Esta es la vía de los planes de suscripción de Kimi.',
            '<strong>API key:</strong> pega una clave de la plataforma de Moonshot si pagas por token en vez de suscribirte.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Las credenciales se guardan en local bajo <code>~/.kimi-code/</code>. Una vez logueado, cada sesión nueva de <code>kimi</code> en cualquier carpeta las reutiliza. Dentro del TUI, <code>/usage</code> te enseña cómo vas de cuota, que en las suscripciones funciona como una asignación semanal más una ventana rodante de 5 horas.',
        },
      ],
    },
    {
      id: 'uso-diario',
      title: 'Uso diario: los comandos y flags que importan',
      content: [
        {
          type: 'paragraph',
          text: 'En el día a día vivirás dentro de la sesión interactiva, con un puñado de flags para arrancar, retomar y automatizar:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Arranca una sesión en el proyecto actual\nkimi\n\n# Continúa la última sesión de esta carpeta\nkimi --continue        # o: kimi -c\n\n# Retoma una sesión concreta por id\nkimi --session <id>\n\n# Ejecución headless de un solo tiro (sin TUI), como claude -p\nkimi -p "explica qué hace este repo"\n\n# Modos\nkimi --plan     # planifica antes de actuar\nkimi --auto     # más autonomía, aún con puertas\nkimi --yolo     # aprueba todo solo (cuidado)',
        },
        {
          type: 'paragraph',
          text: 'Algunos detalles de entrada que conviene saber: Enter envía el mensaje, y Ctrl-J o Alt-Enter insertan un salto de línea. <code>/title</code> pone nombre a la sesión actual, lo que facilita mucho encontrarla después. Y si retomas una sesión pasando <code>--yolo</code>, <code>--auto</code> o <code>--plan</code>, el flag sobreescribe el modo con el que la sesión se guardó. El flag <code>--yolo</code> merece su propia conversación sobre riesgos, que es justo para lo que está la <a href="/es/guias/modo-yolo-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del modo YOLO de Kimi Code</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Instrucciones de proyecto: AGENTS.md',
          id: 'agents-md',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code sigue la convención AGENTS.md. Lee un archivo global en <code>~/.kimi-code/AGENTS.md</code>, uno compartido en <code>~/.agents/AGENTS.md</code> y el <code>AGENTS.md</code> de tu proyecto. No existe KIMI.md, y no lee CLAUDE.md de forma nativa, aunque trae un skill de importación que convierte una configuración existente de Claude Code o Codex una sola vez, con tu confirmación.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Los skills se comparten, no se portan',
          id: 'skills',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code lee skills de forma nativa desde <code>~/.agents/skills/</code>, la misma carpeta compartida que usan otros agentes CLI, además de su propia <code>~/.kimi-code/skills/</code> y las carpetas de skills por proyecto. Si ya mantienes skills para Claude Code o Codex, Kimi Code los recoge sin portar nada. Eso hace que el flujo de <a href="/es/guias/compartir-skills-entre-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">compartir skills entre agentes</a> aplique a Kimi tal cual.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Servidores MCP',
          id: 'mcp',
        },
        {
          type: 'paragraph',
          text: 'La configuración de MCP va por archivos. Kimi Code lee un <code>~/.kimi-code/mcp.json</code> global, después el <code>.mcp.json</code> de tu repositorio en la raíz del git (el mismo archivo que usa Claude Code, así que un solo archivo puede servir a los dos agentes), y después un <code>.kimi-code/mcp.json</code> por proyecto, ganando el archivo más específico. Los nombres de tools siguen el mismo patrón <code>mcp__servidor__tool</code> que Claude Code. No hay flag <code>--mcp-config</code>, la configuración vive solo en archivos. Para automatización más profunda hay además un sistema completo de hooks, configurado en TOML dentro de <code>~/.kimi-code/config.toml</code> y validado con <code>kimi doctor</code>.',
        },
      ],
    },
    {
      id: 'kimi-code-en-codeagentswarm',
      title: 'Ejecutar Kimi Code dentro de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Una sesión de Kimi Code es un proceso trabajando en una tarea. En cuanto quieres una segunda tarea avanzando a la vez, ya estás en varios terminales, y ahí es donde entra <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>. Es una app de escritorio para macOS y Windows que ejecuta varios terminales de agentes CLI en un espacio de trabajo visual, y Kimi Code es un agente de primera en ella, junto a Claude Code, Codex CLI, Antigravity CLI y opencode.',
        },
        {
          type: 'paragraph',
          text: 'Eliges el agente por terminal, así que puedes correr tres sesiones de Kimi Code una al lado de otra, o mezclar Kimi con Claude Code en el mismo proyecto y comparar cómo resuelve cada uno su tarea. Encima de los terminales tienes notificaciones de escritorio cuando un agente termina o pide algo, historial de conversaciones buscable entre todos los agentes, diffs en vivo por terminal con lo que cambió cada sesión, un tablero kanban que los agentes actualizan por MCP, y un indicador de cuota que lee las ventanas semanal y de 5 horas de Kimi para que veas venir el muro antes de chocarte con él.',
        },
        {
          type: 'paragraph',
          text: 'Desde aquí, los siguientes pasos naturales son <a href="/es/guias/ejecutar-multiples-sesiones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Kimi Code</a> para la mecánica, y la <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes de Kimi Code</a> para el flujo en paralelo completo. Si prefieres quedarte con tu harness de siempre y usar solo el modelo, también puedes <a href="/es/guias/kimi-k3-con-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar Kimi K3 dentro de Claude Code</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es Kimi Code?',
      answer: 'Kimi Code es el agente de programación open source para terminal de Moonshot AI, que se ejecuta con el comando kimi. Funciona como Claude Code o Codex CLI: lo arrancas dentro de un proyecto, le describes qué quieres, y lee código, edita archivos y ejecuta comandos con tu aprobación. Funciona con Kimi K3, el modelo estrella de Moonshot con una ventana de contexto de hasta 1M de tokens.',
    },
    {
      question: '¿Cómo instalo Kimi Code CLI?',
      answer: 'En macOS y Linux ejecuta el script oficial: curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash. En PowerShell de Windows: irm https://code.kimi.com/kimi-code/install.ps1 | iex. O instálalo desde npm con npm install -g @moonshot-ai/kimi-code, que necesita Node.js 22.19 o superior. Verifica con kimi --version y actualiza después con kimi upgrade.',
    },
    {
      question: '¿Cuál es la diferencia entre kimi-cli y Kimi Code?',
      answer: 'kimi-cli es el agente legacy de Moonshot en Python, en retirada. Kimi Code es el agente actual en TypeScript, en desarrollo activo. Los dos instalan un binario llamado kimi y, para liarlo más, el paquete de PyPI llamado kimi-code instala el producto legacy en Python. El Kimi Code de verdad llega por el script oficial de instalación o por el paquete de npm @moonshot-ai/kimi-code. Compruébalo con kimi --version: 0.x es Kimi Code, 1.4x es el kimi-cli legacy.',
    },
    {
      question: '¿Kimi Code es gratis?',
      answer: 'El CLI en sí es open source (MIT) y gratis de instalar. Usarlo requiere una suscripción de Kimi o una API key de la plataforma de Moonshot facturada por token. Kimi tiene un nivel gratuito y planes de pago desde 19 dólares al mes, con un uso que funciona como cuota semanal más una ventana rodante de 5 horas. Qué planes incluyen Kimi Code ha ido cambiando, así que consulta la página de precios de Moonshot para el detalle actual.',
    },
    {
      question: '¿Kimi Code funciona con mi configuración existente de Claude Code?',
      answer: 'Buena parte se aprovecha. Kimi Code lee el mismo archivo .mcp.json en la raíz de tu repositorio para los servidores MCP, usa el mismo esquema de nombres mcp__servidor__tool, y lee los skills compartidos de ~/.agents/skills/ de forma nativa. Las instrucciones de proyecto usan AGENTS.md en vez de CLAUDE.md, y hay un skill de importación de un solo uso para convertir una configuración existente de Claude Code o Codex.',
    },
    {
      question: '¿Cómo ejecuto varias sesiones de Kimi Code a la vez?',
      answer: 'Cada sesión de kimi es un proceso independiente, así que puedes correr una por terminal. CodeAgentSwarm lo hace manejable: es una app de escritorio para macOS y Windows donde Kimi Code es un agente soportado, y añade notificaciones de escritorio, historial buscable, diffs en vivo y un indicador de cuota sobre todas tus sesiones en paralelo.',
    },
  ],
}

export default guide
