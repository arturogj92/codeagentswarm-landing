import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'como-usar-antigravity-cli',
    locale: 'es',
    title: 'Cómo usar Antigravity CLI (agy): instalación, comandos y varias sesiones',
    metaTitle: 'Cómo usar Antigravity CLI (agy): instalación y comandos (2026)',
    metaDescription: 'Guía completa de Antigravity CLI (el comando agy), el sucesor de Gemini CLI de Google. Qué es, cómo instalarlo, los comandos esenciales y cómo ejecutar varias sesiones en paralelo.',
    intro: `Si usabas Gemini CLI y fuiste a buscarlo hace poco, ya no estaba. Google retiró Gemini CLI en junio de 2026 y lo reemplazó por Antigravity CLI, el comando <code>agy</code>. Esta guía es el recorrido práctico: qué es Antigravity CLI de verdad, cómo instalarlo en macOS, Linux y Windows, los comandos que usarás cada día y cómo recupera tu configuración antigua de Gemini en el primer arranque.

Antigravity CLI es un único binario compilado, sin runtime de Node ni de Python que gestionar, y trae ocho modelos en el mismo terminal en lugar de uno. Además es multiagente por defecto, así que una sola sesión de agy reparte y coordina sus propios sub-agentes dentro de una tarea en vez de funcionar como un chat lineal.

Al terminar te manejarás con Antigravity CLI por tu cuenta, y sabrás cómo ejecutar varias sesiones de agy independientes en paralelo cuando un solo terminal se te quede corto.`,
    ctaText: 'Ejecuta varias sesiones de Antigravity CLI en un mismo espacio de trabajo de CodeAgentSwarm, cada una en su propio proyecto, con avisos de escritorio en cuanto una sesión termina e historial buscable entre todas.',
    highlightedWords: ['Antigravity CLI', 'agy'],
    publishedAt: '2026-06-29',
    updatedAt: '2026-06-29',
    alternateSlug: 'how-to-use-antigravity-cli',
  },
  sections: [
    {
      id: 'what-is-antigravity-cli',
      title: '¿Qué es Antigravity CLI?',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity CLI es el agente de programación oficial de línea de comandos de Google, que se invoca con el comando <code>agy</code>. Es el sucesor directo de Gemini CLI. Google anunció la transición en el <a href="https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Google Developers Blog</a>, retiró Gemini CLI el 18 de junio de 2026 y a partir de ahí mandó a todo el mundo a Antigravity. Si tienes por ahí una instalación antigua de <code>gemini</code>, está al final de su vida. Ahora lo que usas es <code>agy</code>.',
        },
        {
          type: 'paragraph',
          text: 'Hay tres cosas que diferencian a Antigravity CLI de la herramienta que reemplaza, y vale la pena entenderlas antes de instalarlo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un binario, sin runtime',
          id: 'single-binary',
        },
        {
          type: 'paragraph',
          text: 'Antigravity CLI viene como un único binario compilado. No hay que instalar antes Node.js ni Python, no hay desajustes de versión que perseguir, no hay paquete global de npm que mantener actualizado. Sueltas un ejecutable y lo lanzas. Solo eso ya quita casi todo el dolor de instalación que la gente tenía con el CLI antiguo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ocho modelos en un terminal',
          id: 'eight-models',
        },
        {
          type: 'paragraph',
          text: 'Donde Gemini CLI te daba Gemini, Antigravity CLI pone ocho modelos detrás del mismo comando: la familia Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6 y GPT-OSS 120B. Arranca por defecto con Gemini 3.5 Flash y selecciona solo el modelo adecuado para el trabajo, así que no hay ningún flag <code>--model</code> que memorizar. Tener más modelos en un solo CLI es el cambio estrella, y significa que casi nunca tienes que salir de agy para ir a por otro modelo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiagente por defecto',
          id: 'multi-agent-default',
        },
        {
          type: 'paragraph',
          text: 'Una sola sesión de agy no es un chat lineal. Por defecto reparte y coordina sub-agentes dentro de una tarea, divide el trabajo en piezas y las gestiona él mismo. Le das un objetivo y organiza los pasos por debajo. Eso es un cambio real respecto al modelo mental de un solo hilo que usan la mayoría de CLIs.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Multiagente dentro de una tarea es distinto de ejecutar varias sesiones a la vez. agy coordina sus propios sub-agentes para el trabajo que tiene delante. Cuando quieres trabajar en varios proyectos o tareas independientes al mismo tiempo, ejecutas varias sesiones de agy independientes en paralelo, que es justo de lo que va <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">un enjambre de agentes CLI de IA</a>. Más sobre esto en la última sección.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Cómo instalar Antigravity CLI',
      content: [
        {
          type: 'paragraph',
          text: 'Instalar Antigravity CLI es cosa de una línea en cualquier plataforma. Como es un único binario, no hay ningún runtime que montar antes.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'macOS y Linux',
          id: 'install-mac-linux',
        },
        {
          type: 'paragraph',
          text: 'Ejecuta el script oficial de instalación desde tu terminal. Descarga el binario, lo deja en tu PATH y listo.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'curl -fsSL https://antigravity.google/cli/install.sh | bash',
        },
        {
          type: 'paragraph',
          text: 'Cuando termine, abre un terminal nuevo y ejecuta <code>agy</code> para confirmar que está en tu PATH. El primer arranque se encarga del inicio de sesión y, si antes tenías Gemini CLI, te ofrece traer tu configuración antigua (lo vemos en la siguiente sección).',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Windows',
          id: 'install-windows',
        },
        {
          type: 'paragraph',
          text: 'En Windows, usa el instalador de PowerShell. Descarga el binario y lo instala en <code>%LOCALAPPDATA%</code>, sin permisos de administrador ni runtime extra.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: 'irm https://antigravity.google/cli/install.ps1 | iex',
        },
        {
          type: 'paragraph',
          text: 'Después abre una ventana nueva de PowerShell o de terminal para que coja el PATH actualizado, y ejecuta <code>agy</code> para empezar.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Nada de Node, ni Python, ni gestor de paquetes. Si tienes scripts o CI que todavía instalan Gemini CLI con npm, esa vía está muerta. Cámbiala por el script de instalación de arriba y llama a <code>agy</code> en lugar de <code>gemini</code>.',
        },
      ],
    },
    {
      id: 'first-run-migrate',
      title: 'Primer arranque y migración desde Gemini CLI',
      content: [
        {
          type: 'paragraph',
          text: 'La primera vez que ejecutas <code>agy</code>, inicia sesión con tu cuenta de Google y luego busca una configuración existente de Gemini CLI. Antigravity reutiliza el mismo directorio home <code>~/.gemini</code>, así que sabe exactamente dónde mirar.',
        },
        {
          type: 'paragraph',
          text: 'Si <code>~/.gemini</code> existe, agy te ofrece importar tu configuración antigua automáticamente. Eso incluye tus servidores MCP, tus comandos permitidos sin confirmación, tus atajos de teclado y tu tema. Acepta el aviso y tu setup de siempre pasa sin que tengas que volver a meter nada.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde vive la configuración',
          id: 'config-paths',
        },
        {
          type: 'list',
          items: [
            '<code>~/.gemini</code> - el directorio home compartido que Antigravity reutiliza, así que tus datos e historial siguen justo donde los dejaste',
            '<code>~/.gemini/GEMINI.md</code> - tu archivo de instrucciones globales, leído en cada sesión, igual que lo usaba el CLI antiguo',
            '<code>~/.gemini/antigravity-cli/settings.json</code> - el archivo de ajustes de Antigravity CLI, donde se guarda la configuración propia de agy',
          ],
        },
        {
          type: 'paragraph',
          text: 'Como <code>GEMINI.md</code> sigue siendo el archivo de instrucciones globales, cualquier convención de proyecto o persona que escribieras para Gemini CLI sigue funcionando bajo agy sin tocar nada. Deja ahí tus reglas y cada sesión las lee.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Si nunca usaste Gemini CLI, no hay nada que migrar. agy simplemente inicia sesión y empieza de cero, y puedes añadir un <code>~/.gemini/GEMINI.md</code> más tarde cuando quieras instrucciones globales.',
        },
      ],
    },
    {
      id: 'essential-commands',
      title: 'Comandos esenciales de Antigravity CLI',
      content: [
        {
          type: 'paragraph',
          text: 'Puedes hacer casi todo con un puñado de comandos y flags. Estos son los que vale la pena conocer desde el primer día.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Iniciar una sesión nueva en el proyecto actual\nagy\n\n# Continuar tu última conversación\nagy -c\n\n# Retomar una conversación concreta por id\nagy --conversation <id>\n\n# Modo turbo: auto-aprueba acciones, sin avisos de confirmación\nagy --dangerously-skip-permissions',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Iniciar y retomar sesiones',
          id: 'start-resume',
        },
        {
          type: 'paragraph',
          text: '<code>agy</code> a secas inicia una sesión nueva en el directorio en el que estés. <code>agy -c</code> retoma tu conversación más reciente justo donde la dejaste, que es la que más vas a usar. Cuando tienes varias conversaciones y quieres una concreta más antigua, <code>agy --conversation &lt;id&gt;</code> la retoma por id.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Modo turbo (saltar permisos)',
          id: 'turbo-skip-permissions',
        },
        {
          type: 'paragraph',
          text: 'El flag <code>--dangerously-skip-permissions</code> es el modo turbo de auto-aprobación. agy deja de pedir confirmación y simplemente ejecuta. Es la forma más rápida de trabajar, y es exactamente tan arriesgada como dice el nombre, así que úsalo en tareas de confianza donde te parezca bien que el agente actúe sin un punto de control en cada paso.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'La selección de modelo es automática',
          id: 'auto-model',
        },
        {
          type: 'paragraph',
          text: 'No pasas ningún flag de modelo. agy arranca por defecto con Gemini 3.5 Flash y selecciona solo entre sus ocho modelos según la tarea. Eso mantiene el comando corto y hace que no tengas que decidir entre Gemini, Claude Sonnet 4.6, Claude Opus 4.6 o GPT-OSS 120B en cada ejecución.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Servidores MCP',
          id: 'mcp-servers',
        },
        {
          type: 'paragraph',
          text: 'Antigravity CLI admite servidores MCP, y si importaste tu configuración de Gemini CLI ya están conectados. Viven en tu archivo de ajustes, así que añadir uno nuevo es cuestión de editar el JSON.',
        },
        {
          type: 'code',
          language: 'json',
          code: '// ~/.gemini/antigravity-cli/settings.json\n{\n  "mcpServers": {\n    "my-server": {\n      "command": "npx",\n      "args": ["-y", "@my/mcp-server"]\n    }\n  }\n}',
        },
        {
          type: 'paragraph',
          text: 'Una vez que un servidor está en el archivo de ajustes, agy se conecta a él en la siguiente sesión y sus herramientas pasan a estar disponibles dentro del agente. Es el mismo modelo de MCP que usaba el CLI antiguo, y por eso la importación trae tus servidores sin tocar nada.',
        },
      ],
    },
    {
      id: 'multiple-sessions',
      title: 'Ejecutar varias sesiones de Antigravity CLI en paralelo',
      content: [
        {
          type: 'paragraph',
          text: 'Una sesión de agy coordina sub-agentes para la tarea que tiene delante. Pero muchas veces quieres avanzar en varios frentes a la vez: una feature en un proyecto, un arreglo de bug en otro, documentación en un tercero. Cada uno de esos es su propia sesión de agy, su propio proceso, con su conversación y su contexto. Ejecutarlas a la vez es donde un espacio de trabajo visual se gana su sitio.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con las opciones claude-code, codex cli y antigravity, para que cada terminal ejecute un agente distinto',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en antigravity para ejecutar varias sesiones de agy en un mismo espacio de trabajo, o mezcla Claude Code y Codex CLI.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para macOS y Windows hecha justo para esto. Te da varios terminales en una ventana, y en el selector SELECT AI AGENT eliges el agente por terminal: claude-code, codex cli o antigravity. Pon varios terminales en antigravity y tienes una sala de control para sesiones de agy en paralelo, todo en un mismo sitio.',
        },
        {
          type: 'image',
          alt: 'Varias sesiones de Antigravity CLI ejecutándose en paralelo dentro de una ventana de CodeAgentSwarm, cada terminal un proceso agy independiente trabajando en un proyecto distinto',
          src: '/images/guides/antigravity-agent-swarm.png',
          caption: 'Varias sesiones de Antigravity CLI independientes ejecutándose una al lado de otra en una ventana de CodeAgentSwarm, cada proceso agy en su propia tarea.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm no es un proveedor de modelos. Cada sesión de agy sigue usando tu propio inicio de sesión de Google y tu propia instalación de Antigravity. La app solo le da un hogar a las sesiones y añade lo que importa cuando tienes más de una en marcha:',
        },
        {
          type: 'list',
          items: [
            'Títulos dinámicos por terminal, para que en vez de pestañas "agy" idénticas veas qué está haciendo cada sesión ahora mismo',
            'Avisos de escritorio en cuanto una sesión termina o se para a preguntarte algo, para que dejes de estar pendiente de las pestañas (más en la <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de notificaciones</a>)',
            'Historial de conversaciones buscable entre todas las sesiones, para rastrear qué hizo cualquier sesión de agy y retomarla más tarde (mira la <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de historial de conversaciones</a>)',
            'Un tablero kanban que tus propias sesiones actualizan por MCP, manteniendo la foto general en una sola vista',
            'Turbo Mode con permisos granulares, para que una sesión vaya rápida en operaciones seguras mientras las arriesgadas quedan controladas (mira la <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode</a>)',
            'Diffs de archivos en vivo por terminal, para que las ediciones que se solapan entre sesiones nunca te pillen por sorpresa (mira la <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de cambios en tiempo real</a>)',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para el paso a paso de ejecutar varias sesiones de agy a la vez, mira <a href="/es/guias/ejecutar-multiples-sesiones-antigravity-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Antigravity CLI</a>. Si todavía estás decidiendo si pasarte de la herramienta antigua, <a href="/es/guias/antigravity-cli-vs-gemini-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity CLI vs Gemini CLI</a> te detalla exactamente qué cambió. Y como antigravity está al lado de Claude Code y Codex CLI en el mismo selector, el mismo espacio de trabajo también ejecuta <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">varias sesiones de Claude Code</a> y <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">varias sesiones de Codex</a> cuando una tarea encaja mejor con alguno de ellos.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Empieza con una sola sesión de agy para coger el punto al comportamiento multiagente. Cuando te descubras queriendo una segunda y una tercera a la vez, ábrelas como terminales separados en CodeAgentSwarm y deja que los títulos dinámicos y los avisos te mantengan orientado. La <a href="/es/guias/enjambre-de-agentes-gemini" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del concepto de enjambre de agentes</a> cubre el flujo que nació con el antiguo Gemini CLI y se aplica igual de bien a agy.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es Antigravity CLI (agy)?',
      answer: 'Antigravity CLI es el agente de programación oficial de línea de comandos de Google, que se ejecuta con el comando agy. Es el sucesor directo de Gemini CLI, que Google retiró en junio de 2026. agy viene como un único binario compilado, incluye ocho modelos en un terminal y es multiagente por defecto, lo que significa que una sola sesión coordina sus propios sub-agentes dentro de una tarea.',
    },
    {
      question: '¿Cómo instalo Antigravity CLI?',
      answer: 'En macOS y Linux, ejecuta curl -fsSL https://antigravity.google/cli/install.sh | bash. En Windows, ejecuta el instalador de PowerShell con irm https://antigravity.google/cli/install.ps1 | iex, que lo instala en %LOCALAPPDATA%. Es un único binario, así que no hay runtime de Node ni de Python que montar antes. Abre un terminal nuevo después y ejecuta agy para empezar.',
    },
    {
      question: '¿Antigravity CLI es gratis?',
      answer: 'Sí. Inicias sesión con una cuenta de Google y tienes un plan gratuito generoso. CodeAgentSwarm no cambia eso, porque no es un proveedor de modelos. Cada sesión de agy sigue usando tu propio inicio de sesión de Google, ya ejecutes una sesión o varias en paralelo.',
    },
    {
      question: '¿Antigravity CLI reemplaza a Gemini CLI?',
      answer: 'Sí. Google retiró Gemini CLI el 18 de junio de 2026 y lo reemplazó por Antigravity CLI, según anunció en el Google Developers Blog. agy reutiliza el mismo directorio home ~/.gemini y lee las instrucciones globales de ~/.gemini/GEMINI.md, así que tu configuración y convenciones antiguas pasan sin problema. En el primer arranque incluso te ofrece importar tus servidores MCP, comandos permitidos, atajos de teclado y tema de Gemini CLI.',
    },
    {
      question: '¿Qué modelos admite Antigravity CLI?',
      answer: 'Antigravity CLI te da ocho modelos en el mismo terminal: la familia Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6 y GPT-OSS 120B. Arranca por defecto con Gemini 3.5 Flash y selecciona solo el modelo adecuado para la tarea, así que no hay ningún flag --model que gestionar.',
    },
    {
      question: '¿Cómo ejecuto varias sesiones de Antigravity CLI a la vez?',
      answer: 'Cada sesión de agy es un proceso independiente, así que puedes abrir varias al mismo tiempo, una por proyecto o tarea. La forma más limpia es CodeAgentSwarm, una app de escritorio donde pones cada terminal en antigravity en el selector SELECT AI AGENT y tienes títulos dinámicos, avisos de escritorio e historial buscable entre todas en un mismo espacio de trabajo.',
    },
    {
      question: '¿Antigravity CLI funciona en Windows?',
      answer: 'Sí. Windows está soportado mediante un instalador de PowerShell que coloca el binario en %LOCALAPPDATA% sin permisos de administrador ni runtime extra. CodeAgentSwarm también funciona en Windows, así que ahí puedes ejecutar varias sesiones de agy en paralelo en el mismo espacio de trabajo visual.',
    },
  ],
}

export default guide
