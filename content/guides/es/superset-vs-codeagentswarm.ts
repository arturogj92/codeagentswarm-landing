import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'superset-vs-codeagentswarm',
    locale: 'es',
    title: 'Superset vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'Superset vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'Superset es un editor source available para 10+ agentes en paralelo. CodeAgentSwarm supervisa seis agentes CLI. Comparativa honesta de 2026.',
    intro: `Superset es un editor de código source available construido para ejecutar diez o más agentes en paralelo, cada uno aislado en su propio worktree de git, mientras que CodeAgentSwarm es una app de escritorio de código cerrado construida para supervisar agentes de seis proveedores CLI concretos, con notificaciones del sistema, historial buscable entre agentes y un tablero kanban que los propios agentes actualizan por MCP.

Transparencia por delante: CodeAgentSwarm lo hacemos nosotros. Por eso esta página dice dónde Superset es mejor en vez de disimularlo, y por eso nuestras limitaciones (código cerrado, sin build de Linux, sin cliente móvil ni remoto, todavía en beta) están en la misma tabla que el resto. Las dos herramientas se juzgan con los mismos criterios. Todos los datos de terceros se verificaron el 26 de julio de 2026 en superset.sh y en los datos públicos de GitHub, y lo que no pudimos comprobar está marcado como tal.

Resumen rápido: elige Superset si quieres un entorno con forma de editor, soporte de Linux y código que puedas leer. Elige CodeAgentSwarm si trabajas con Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build y necesitas notificaciones, historial y un tablero para no perderles el hilo.`,
    ctaText: 'Las dos se empiezan gratis, así que pruébalas una semana sobre el mismo repositorio. CodeAgentSwarm es gratis durante la beta, con Pro incluido, para macOS y Windows.',
    ctaAgent: 'comparison',
    highlightedWords: ['Superset', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-11',
    alternateSlug: 'superset-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Superset es un entorno con forma de editor para ejecutar muchos agentes en paralelo aislados en worktrees de git, mientras que CodeAgentSwarm es un espacio de supervisión para un conjunto cerrado de seis agentes CLI, pensado para que te enteres en cuanto uno de ellos te necesita.',
        },
        {
          type: 'paragraph',
          text: 'Las dos parten de la misma premisa: ir de un agente en un agente desperdicia tu tiempo, y trabajar en paralelo exige aislamiento. Donde no coinciden es en qué construir encima. Superset construye un editor con revisión, automatizaciones y un servidor MCP para control programático. CodeAgentSwarm construye una capa de atención con notificaciones, historial y un tablero compartido. Para ver el panorama completo tienes el repaso de <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA en paralelo</a>, y la comparativa hermana de <a href="/es/guias/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code vs CodeAgentSwarm</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Aviso: CodeAgentSwarm es nuestro producto. Todo lo que se afirma aquí sobre Superset se verificó el 26 de julio de 2026 en su propia web (superset.sh) y en los datos públicos de GitHub del repositorio superset-sh/superset. Cuando algo no está documentado públicamente, lo decimos así en lugar de afirmar que Superset no lo tiene.',
        },
      ],
    },
    {
      id: 'what-is-superset',
      title: 'Qué es Superset',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://superset.sh" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset</a> abre con una promesa muy concreta: ejecutar más de diez agentes en paralelo en tu máquina, lanzar tareas nuevas mientras el agente actual sigue trabajando y saltar rápido entre tareas según cuál te reclame. Su repositorio, <a href="https://github.com/superset-sh/superset" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">superset-sh/superset</a>, describe el producto como un "editor de código para la era de los agentes de IA".',
        },
        {
          type: 'paragraph',
          text: 'La licencia merece precisión, porque es fácil contarla mal. Superset es source available bajo la Elastic License 2.0, que no es una licencia de código abierto aprobada por la OSI: puedes leer el código y autoalojarlo dentro de sus términos, pero no tienes todas las libertades del software libre. Su propia FAQ lo explica igual. El repositorio rondaba las 12.600 estrellas el 26 de julio de 2026, con su último commit ese mismo día, y es público desde el 21 de octubre de 2025.',
        },
        {
          type: 'list',
          items: [
            'Cada agente corre en su propio worktree de git aislado, así el trabajo en paralelo no choca',
            'Revisión de diffs y vista de pull request, para aprobar los cambios en vez de descubrirlos',
            'Terminales persistentes que siguen vivos mientras saltas de una tarea a otra',
            'Automatizaciones programadas y un servidor MCP para control programático, según su propia descripción del servicio',
            'Abrir el worktree en cualquier IDE con un clic: VS Code, Cursor, Xcode, JetBrains, Finder o un terminal normal',
            'Un plan gratuito, con planes de pago y una opción enterprise listados en su web',
          ],
        },
        {
          type: 'paragraph',
          text: 'Sobre agentes, su FAQ es deliberadamente abierta: Superset funciona con cualquier agente de programación por CLI, y nombra Claude Code, OpenCode y OpenAI Codex; su frase es que si corre en un terminal, corre en Superset. El selector de agentes que enseñan en su portada muestra además Gemini, Cursor Agent, Mistral Vibe y Kimi Code. En plataformas, los datos estructurados de superset.sh declaran macOS, Windows y Linux, y el botón de descarga ofrece macOS.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS y Windows, es de código cerrado y es gratis durante la beta con Pro incluido. Nunca te vende acceso a modelos: cada terminal usa una suscripción CLI que ya tienes.',
        },
        {
          type: 'image',
          alt: 'Selector de agentes de CodeAgentSwarm mostrando los seis agentes CLI soportados que puedes asignar a un terminal',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Eligiendo qué agente CLI corre en un terminal. CodeAgentSwarm integra seis proveedores concretos en lugar de aceptar cualquier comando.',
        },
        {
          type: 'paragraph',
          text: 'En vez de aceptar cualquier comando de terminal, CodeAgentSwarm integra seis agentes a propósito: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build. Ese alcance más estrecho es lo que paga el resto de funciones: notificaciones cuando un agente termina o necesita respuesta, historial buscable de los seis con opción de retomar, diffs en vivo por terminal, permisos con modos Turbo y YOLO, worktrees de git por sesión, marketplaces de skills y de MCP, indicador de cuota, mensajes de commit con IA, cambio rápido entre proyectos y un kanban que los agentes actualizan solos por MCP. Si de momento solo usas un proveedor, la guía para <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> es la versión pequeña de esta idea.',
        },
        {
          type: 'paragraph',
          text: 'Las limitaciones, sin rodeos: código cerrado y sin repositorio público, sin build de Linux, sin cliente móvil ni remoto, software en beta, hacen falta tus propias suscripciones CLI y no hay botón de PR con un clic. Si necesitas leer el código de la herramienta que gobierna tus agentes, Superset te deja hacerlo y nosotros no.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'paragraph',
          text: 'Una sola regla para esta tabla: contar solo lo que documenta cada fabricante. Un "no documentado" no dice nada sobre si la función existe.',
        },
        {
          type: 'table',
          headers: ['', 'Superset', 'CodeAgentSwarm'],
          rows: [
            ['Plataformas', 'macOS, Windows y Linux según los datos estructurados de superset.sh. Su botón de descarga ofrece macOS', 'macOS y Windows. Sin build de Linux'],
            ['Instalación y distribución', 'Descarga de escritorio desde superset.sh. Autoalojarlo desde el código está permitido dentro de la Elastic License 2.0', 'Instalador de escritorio para macOS y Windows'],
            ['Interfaz', 'Con forma de editor de código, con revisión de diffs y PR y opción de abrir en cualquier IDE (VS Code, Cursor, Xcode, JetBrains)', 'Workspace multiterminal con kanban, historial y diffs por terminal'],
            ['Agentes soportados', 'Cualquier agente por CLI. Su FAQ nombra Claude Code, OpenCode y OpenAI Codex; su selector de portada muestra además Gemini, Cursor Agent, Mistral Vibe y Kimi Code', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build, integrados uno a uno'],
            ['Modelo de aislamiento', 'Un worktree de git aislado por agente, una rama por tarea', 'Worktrees de git por sesión, un proceso por terminal'],
            ['Notificaciones', 'No documentado en su web a 26 de julio de 2026', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'No documentado en su web a 26 de julio de 2026', 'Historial buscable de los seis agentes, con opción de retomar'],
            ['Gestión de tareas', 'Cambio entre tareas en paralelo, automatizaciones programadas y servidor MCP para control programático', 'Kanban que los agentes actualizan por MCP. Sin botón de PR con un clic'],
            ['Código abierto', 'No. Source available (Elastic License 2.0), que no está aprobada por la OSI', 'No. Código cerrado, sin repositorio público'],
            ['Precio', 'Plan gratuito, con planes de pago y enterprise en su web', 'Gratis durante la beta con Pro incluido. Pones tus suscripciones CLI'],
            ['Último commit público (verificado el 26 jul 2026)', '26 de julio de 2026. Unas 12.600 estrellas, público desde el 21 de octubre de 2025', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Todos los datos de terceros verificados el 26 de julio de 2026 en superset.sh y en los datos públicos de GitHub.',
        },
      ],
    },
    {
      id: 'when-superset',
      title: 'Cuándo Superset es mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'En varios de estos casos te mandaríamos a Superset sin pensarlo dos veces.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres un editor, no una rejilla de terminales.</strong> Superset tiene forma de editor, con navegación de archivos, revisión de diffs y vista de PR en la misma ventana. Si quieres leer y tocar el código sin salir de la app, encaja mejor que la nuestra.',
            '<strong>Trabajas en Linux.</strong> Sus datos estructurados listan Linux como plataforma soportada. CodeAgentSwarm no tiene build de Linux, así que aquí no hay término medio.',
            '<strong>Quieres ejecutar cualquier agente CLI, no una lista cerrada.</strong> Su postura es que si corre en un terminal, corre en Superset. Nosotros integramos seis proveedores: mejor para esos seis, peor para el resto.',
            '<strong>Quieres leer el código.</strong> La Elastic License 2.0 no es código abierto, pero source available gana a un binario cerrado si necesitas auditar el comportamiento o autoalojarlo dentro de sus términos.',
            '<strong>Quieres automatizaciones programadas y control programático.</strong> Su servidor MCP y sus automatizaciones apuntan a flujos desatendidos que CodeAgentSwarm no documenta.',
            '<strong>Quieres diez agentes o más a la vez.</strong> Es su objetivo de diseño explícito, y llevan publicando contra él desde octubre de 2025.',
          ],
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'Cuándo CodeAgentSwarm es mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'Nuestras ventajas vienen del alcance estrecho: seis agentes integrados uno a uno y un workspace diseñado alrededor del momento en que un agente se para y te espera.',
        },
        {
          type: 'list',
          items: [
            '<strong>Usas Antigravity CLI.</strong> No aparece entre los agentes de superset.sh a 26 de julio de 2026, y CodeAgentSwarm lo soporta directamente. Kimi Code sí está en las dos, así que esta fila no es un pleno.',
            '<strong>Prefieres que te interrumpan a estar comprobando.</strong> Las notificaciones saltan cuando cualquier agente termina o necesita respuesta, y eso pesa más cuantas más tareas en paralelo tengas que vigilar.',
            '<strong>Quieres un único historial buscable.</strong> Las conversaciones de los seis agentes se guardan, se buscan y se retoman desde el mismo sitio, en vez de vivir en seis formatos distintos.',
            '<strong>Quieres que el tablero lo mantengan los agentes.</strong> El kanban está expuesto por MCP, así que los agentes mueven sus propias tareas mientras trabajan.',
            '<strong>Vigilas la cuota.</strong> El indicador te dice cuánto margen le queda a cada suscripción antes de lanzar una tanda larga en paralelo.',
            '<strong>Quieres permisos graduados con diffs en vivo.</strong> Los diffs por terminal muestran en tiempo real qué toca cada agente, y el modo Turbo aprueba solo lo seguro mientras lo arriesgado sigue parándose a preguntar.',
          ],
        },
      ],
    },
    {
      id: 'use-both',
      title: '¿Se pueden usar las dos?',
      content: [
        {
          type: 'paragraph',
          text: 'Son aplicaciones independientes, sin integración ni estado compartido, así que "usar las dos" significa ejecutar las dos, no combinarlas. Y es razonable: Superset tiene plan gratuito y CodeAgentSwarm es gratis durante la beta, así que probarlas te cuesta tiempo, no dinero.',
        },
        {
          type: 'paragraph',
          text: 'Pruébalas sobre el mismo repositorio y en la misma semana. Las dos aíslan a los agentes en worktrees de git, así que ninguna tiene que tocar tu copia principal. Después de unas cuantas tareas reales vas a saber qué fricción te molestó más: revisar y entregar el código, o seguir la pista de qué agente te necesita ahora.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Superset es gratis y de código abierto?',
      answer: 'Superset tiene plan gratuito, además de planes de pago y enterprise listados en su web. Sobre la licencia, la respuesta precisa es que es source available bajo la Elastic License 2.0, que no está aprobada por la OSI: puedes inspeccionar el código y autoalojarlo dentro de sus términos, pero no es open source en sentido estricto. CodeAgentSwarm es gratis durante la beta con Pro incluido, y es de código cerrado y sin repositorio público.',
    },
    {
      question: '¿Superset soporta Antigravity CLI o Kimi Code?',
      answer: 'Kimi Code aparece en el selector de agentes de superset.sh, y su FAQ dice que Superset funciona con cualquier agente por CLI, así que un terminal con Kimi Code entra ahí. Antigravity CLI no aparece en su web a 26 de julio de 2026. CodeAgentSwarm soporta los dos como integraciones de primer nivel, junto a Claude Code, Codex CLI y OpenCode.',
    },
    {
      question: '¿Cuál se mantiene de forma más activa?',
      answer: 'Las dos están activas y esta fila no la gana nadie. El repositorio público superset-sh/superset tuvo su último commit el 26 de julio de 2026, el mismo día en que se verificó esta página, con unas 12.600 estrellas y un historial público desde el 21 de octubre de 2025. CodeAgentSwarm es de código cerrado, así que no hay historial que consultar: nuestro ritmo te lo tienes que creer.',
    },
    {
      question: '¿Puedo probar las dos gratis?',
      answer: 'Sí. Superset ofrece un plan gratuito y una descarga de escritorio desde superset.sh, y CodeAgentSwarm es gratis durante la beta con Pro incluido en macOS y Windows. Ninguna revende acceso a modelos, así que en los dos casos sigues usando las suscripciones CLI que ya pagas, y compararlas solo te cuesta tiempo.',
    },
  ],
}

export default guide
