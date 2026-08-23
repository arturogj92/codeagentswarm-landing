import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 't3-code-vs-codeagentswarm',
    locale: 'es',
    title: 'T3 Code vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'T3 Code vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'T3 Code es un panel de control open source que termina en una PR con un clic. CodeAgentSwarm supervisa siete agentes CLI. Comparativa honesta de 2026.',
    intro: `T3 Code es un panel de control open source con licencia MIT que reúne varios agentes de programación en una sola interfaz de escritorio y cierra cada hilo con una pull request de un clic, mientras que CodeAgentSwarm es una app de escritorio de código cerrado pensada para supervisar varios agentes CLI a la vez, con notificaciones del sistema, historial buscable entre agentes y un tablero kanban que los propios agentes actualizan por MCP.

Antes de nada, transparencia: CodeAgentSwarm lo hacemos nosotros. T3 Code gana varias filas de la tabla, y nuestras limitaciones (código cerrado, sin build de escritorio para Linux, Mobile Connect aún en alpha, todavía en beta) aparecen en esa misma tabla. Todos los datos de terceros se comprobaron el 26 de julio de 2026 en t3.codes y en los datos públicos de GitHub, y lo que no pudimos verificar está marcado como tal en lugar de inventado. La disponibilidad de CodeAgentSwarm en esta página se actualizó el 23 de agosto de 2026.

Resumen rápido: elige T3 Code si te importan el código abierto, el soporte de Linux y llegar rápido del diff a la pull request. Elige CodeAgentSwarm si trabajas con agentes de siete proveedores distintos y necesitas notificaciones, historial y un tablero para no perderles la pista.`,
    ctaText: 'Prueba las dos sobre el mismo repositorio y quédate con la que encaje en tu semana. CodeAgentSwarm es gratis durante la beta, con Pro incluido, para macOS y Windows.',
    ctaAgent: 'comparison',
    highlightedWords: ['T3 Code', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-23',
    alternateSlug: 't3-code-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'T3 Code es un panel de control open source que envuelve varios agentes de programación en una interfaz de escritorio y optimiza el camino entre un diff terminado y una pull request, mientras que CodeAgentSwarm es una app de escritorio de código cerrado optimizada para supervisar muchos terminales de agente a la vez, con siete CLIs de proveedores distintos.',
        },
        {
          type: 'paragraph',
          text: 'Las dos herramientas se apoyan en los agentes CLI que ya pagas y ninguna revende tokens. La diferencia está en qué consideran la parte difícil. Para T3 Code, lo difícil es entregar el trabajo. Para CodeAgentSwarm, lo difícil es seguirle el ritmo a varios agentes. Si prefieres ver primero el panorama completo, tienes el repaso de <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA en paralelo</a>, y la comparativa hermana de <a href="/es/guias/superset-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset vs CodeAgentSwarm</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Aviso: CodeAgentSwarm es nuestro producto. Todo lo que decimos aquí de T3 Code se verificó el 26 de julio de 2026 en su propia web (t3.codes) y en los datos públicos de GitHub del repositorio pingdotgg/t3code. Cuando una función no está documentada públicamente, lo decimos así en lugar de afirmar que T3 Code no la tiene.',
        },
      ],
    },
    {
      id: 'what-is-t3-code',
      title: 'Qué es T3 Code',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://t3.codes" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code</a> se define como "el panel de control open source para agentes de programación". Viene del equipo de Ping, alrededor de Theo Browne (t3.gg), y su código está en <a href="https://github.com/pingdotgg/t3code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">pingdotgg/t3code</a> con licencia MIT. Su web resume la propuesta en dos ideas: trae tu propia suscripción y haz un fork de todo el producto si quieres.',
        },
        {
          type: 'paragraph',
          text: 'El impulso que llevan es real y conviene decirlo sin rodeos. El repositorio se creó el 8 de febrero de 2026 y el 26 de julio de 2026 rondaba las 15.000 estrellas, con su último commit público ese mismo día. Es el crecimiento más rápido de toda la categoría, y un motivo legítimo para tomárselos en serio.',
        },
        {
          type: 'list',
          items: [
            'Interfaz de escritorio de tres paneles con terminal integrado y acceso remoto a tus sesiones',
            'Worktrees de git, así cada hilo de agente trabaja en su rama sin pisar a los demás',
            'Visor de diffs por turno, unificado o partido, para revisar cada paso en vez de un diff gigante al final',
            'Commit, push y creación de PR con un clic, con título y cuerpo generados, usando tu autenticación de GitHub',
            'Selección de modelo y de nivel de razonamiento, además de modos chat y plan',
            'Acciones rápidas por proyecto y, según su hoja de ruta, gestión de skills, modo headless e integración por CLI',
          ],
        },
        {
          type: 'paragraph',
          text: 'En agentes, su web lista Claude Code, Codex, OpenCode, Cursor y Grok, y avisa de que suman harnesses cada semana. La distribución es especialmente generosa: puedes ejecutarlo con <code>npx t3@latest</code> sin instalar nada, o instalar la app con winget en Windows, un cask de Homebrew en macOS o el AUR en Arch. Su página de descargas ofrece además builds directas para macOS (Apple Silicon e Intel), Windows 10 y 11, y Linux en AppImage. Es gratis, con tus propias claves y sin suscripción.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS y Windows, es de código cerrado y es gratis durante la beta con Pro incluido. No es un proveedor de modelos: cada terminal usa una suscripción CLI que ya tienes.',
        },
        {
          type: 'image',
          alt: 'Varios terminales de agentes de IA funcionando a la vez en una misma ventana de CodeAgentSwarm, cada uno con su título y su estado',
          src: '/images/guides/multi-terminal.png',
          caption: 'Varios terminales de agente en un mismo workspace de CodeAgentSwarm. Cada uno es un proceso aparte, con su conversación, su título y su estado.',
        },
        {
          type: 'paragraph',
          text: 'La idea de fondo es que a partir de dos o tres agentes el cuello de botella deja de ser el agente y pasas a serlo tú. Por eso las funciones giran en torno a tu atención: notificaciones cuando un agente termina o se para a preguntarte algo, historial buscable entre los siete agentes y con opción de retomar cuando el agente la admite, diffs en vivo por terminal, permisos con modos Turbo y YOLO, indicador de cuota, mensajes de commit con IA, worktrees de git por sesión, marketplaces de skills y de MCP, y un kanban que los agentes actualizan solos por MCP. Si por ahora usas un solo proveedor, la guía para <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> es la versión reducida de esta idea.',
        },
        {
          type: 'paragraph',
          text: 'Las limitaciones, sin adornos: código cerrado y sin repositorio público, sin build de escritorio para Linux, Mobile Connect aún en alpha (beta web para todas las cuentas, acceso nativo para iOS y Android bajo petición y el escritorio debe seguir abierto), software en beta, hacen falta tus propias suscripciones CLI y no hay botón de PR con un clic (commiteas desde la app y abres la PR tú). Si algo de eso te bloquea, T3 Code te va a servir mejor.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'paragraph',
          text: 'Dos reglas para esta tabla: contar solo lo que documenta cada fabricante y marcar el resto. Un "no documentado" no dice nada sobre si la función existe.',
        },
        {
          type: 'table',
          headers: ['', 'T3 Code', 'CodeAgentSwarm'],
          rows: [
            ['Plataformas', 'macOS (Apple Silicon e Intel), Windows 10 y 11, Linux (AppImage)', 'macOS y Windows. Sin build de Linux'],
            ['Instalación y distribución', '<code>npx t3@latest</code> sin instalar nada, app de escritorio, winget, cask de Homebrew, AUR y descargas directas', 'Instalador de escritorio para macOS y Windows'],
            ['Interfaz', 'Diseño de tres paneles con terminal integrado y acceso remoto', 'Workspace multiterminal con tablero kanban, navegador de historial y diffs por terminal'],
            ['Agentes soportados', 'Claude Code, Codex, OpenCode, Cursor y Grok según t3.codes, y añaden harnesses cada semana', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent'],
            ['Modelo de aislamiento', 'Worktrees de git, una rama por hilo de agente', 'Worktrees de git por sesión, un proceso por terminal'],
            ['Notificaciones', 'No documentado en su web a 26 de julio de 2026', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'Visor de diffs por turno con modos chat y plan. Un historial buscable entre agentes no está documentado en su web a 26 de julio de 2026', 'Historial buscable de los siete agentes, con opción de retomar cuando el agente la admite'],
            ['Gestión de tareas', 'Acciones rápidas por proyecto y commit, push y PR con un clic', 'Kanban que los agentes actualizan por MCP. Sin botón de PR con un clic'],
            ['Código abierto', 'Sí, MIT (pingdotgg/t3code)', 'No. Código cerrado, sin repositorio público'],
            ['Precio', 'Gratis, con tus propias claves y sin suscripción (según ellos)', 'Gratis durante la beta con Pro incluido. Pones tus suscripciones CLI'],
            ['Último commit público (verificado el 26 jul 2026)', '26 de julio de 2026. Unas 15.000 estrellas desde el 8 de febrero de 2026', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Todos los datos de terceros verificados el 26 de julio de 2026 en t3.codes y en los datos públicos de GitHub.',
        },
      ],
    },
    {
      id: 'when-t3-code',
      title: 'Cuándo T3 Code es mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'Hay varios casos en los que te mandaríamos a T3 Code en lugar de a nuestra app, y ninguno es discutible.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres código abierto.</strong> Licencia MIT y fork libre: lees el código, lo parcheas y publicas tu propia build. CodeAgentSwarm no te ofrece nada de eso.',
            '<strong>Trabajas en Linux.</strong> T3 Code publica un AppImage y está en el AUR. CodeAgentSwarm no tiene build de Linux, así que aquí no hay término medio.',
            '<strong>Quieres probarlo en diez segundos.</strong> <code>npx t3@latest</code> lo arranca sin instalar nada, y no hay instalador que baje más la barrera.',
            '<strong>Tu cuello de botella es entregar, no supervisar.</strong> Un botón para commitear, hacer push y abrir la PR con título y cuerpo generados, incluyendo PRs en borrador y apiladas, gana a hacerlo a mano. Nosotros generamos el mensaje de commit, pero no tenemos botón de PR.',
            '<strong>Usas Cursor o Grok como agente.</strong> Los dos aparecen en su web. Ninguno está en CodeAgentSwarm.',
            '<strong>Te interesa la comunidad.</strong> Unas 15.000 estrellas en cinco meses y harnesses nuevos cada semana hacen que los fallos se detecten y se arreglen rápido.',
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
          text: 'Nuestras ventajas nacen todas del mismo sitio: muchos agentes a la vez, de proveedores distintos, que te reclaman en momentos impredecibles.',
        },
        {
          type: 'list',
          items: [
            '<strong>Usas Antigravity CLI o Kimi Code.</strong> Ninguno aparece entre los agentes de t3.codes a 26 de julio de 2026. CodeAgentSwarm soporta los dos, junto a Claude Code, Codex CLI y OpenCode.',
            '<strong>Prefieres que te avisen a estar mirando.</strong> Las notificaciones saltan cuando cualquier agente termina o necesita respuesta, así que puedes irte y volver cuando de verdad ha pasado algo.',
            '<strong>Quieres un único historial buscable.</strong> Las conversaciones de los siete agentes se guardan y se buscan en el mismo sitio, en vez de quedar repartidas en siete formatos distintos, y se retoman cuando el agente lo permite.',
            '<strong>Quieres que los agentes mantengan el tablero al día.</strong> El kanban está expuesto por MCP, así que los agentes mueven sus propias tareas mientras trabajan.',
            '<strong>Vigilas la cuota.</strong> El indicador te dice cuánto margen le queda a cada suscripción antes de lanzar una tanda larga.',
            '<strong>Quieres diffs en vivo con permisos graduados.</strong> Ves en tiempo real qué toca cada agente y el modo Turbo aprueba solo lo seguro, mientras que lo peligroso sigue parándose a preguntar.',
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
          text: 'Son dos aplicaciones de escritorio independientes, así que no hay integración entre ellas ni estado compartido. Pero nada te impide instalar las dos, porque las dos se pueden probar gratis: T3 Code es gratis con tus propias claves, y CodeAgentSwarm es gratis durante la beta.',
        },
        {
          type: 'paragraph',
          text: 'Compáralas sobre el mismo repositorio, en la misma semana y con el mismo tipo de trabajo. Las dos usan worktrees de git, así que ninguna tiene que tocar tu copia principal. Tras un par de tareas reales, pregúntate qué fricción notaste más: no saber qué hacían tus agentes, o los pasos manuales entre un diff bueno y una PR mergeada.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿T3 Code es gratis y de código abierto?',
      answer: 'Sí a las dos cosas. T3 Code es gratis, funciona con tus propias claves y no tiene suscripción, y su código está en github.com/pingdotgg/t3code con licencia MIT, aprobada por la OSI. CodeAgentSwarm es gratis durante la beta con Pro incluido, pero es de código cerrado y sin repositorio público.',
    },
    {
      question: '¿T3 Code soporta Antigravity CLI o Kimi Code?',
      answer: 'Ninguno aparece entre los agentes soportados en t3.codes a 26 de julio de 2026. Su web nombra Claude Code, Codex, OpenCode, Cursor y Grok, y avisa de que añaden harnesses cada semana, así que puede cambiar. CodeAgentSwarm soporta hoy Antigravity CLI y Kimi Code, además de Claude Code, Codex CLI y OpenCode.',
    },
    {
      question: '¿Cuál se mantiene de forma más activa?',
      answer: 'Las dos están activas, y esta fila no la gana nadie. El repositorio público t3code tuvo su último commit el 26 de julio de 2026, el mismo día en que se verificó esta comparativa, con unas 15.000 estrellas desde que se creó el 8 de febrero de 2026. CodeAgentSwarm es de código cerrado, así que no hay historial público que inspeccionar, y esa es una crítica justa: nuestro ritmo te lo tienes que creer.',
    },
    {
      question: '¿Puedo probar las dos gratis?',
      answer: 'Sí. T3 Code se arranca con npx t3@latest sin instalar nada, o se instala como app de escritorio en macOS, Windows y Linux, y es gratis usando tus propias suscripciones. CodeAgentSwarm es gratis durante la beta con Pro incluido, para macOS y Windows. Ninguna revende tokens, así que en los dos casos sigues usando las suscripciones CLI que ya pagas.',
    },
  ],
}

export default guide
