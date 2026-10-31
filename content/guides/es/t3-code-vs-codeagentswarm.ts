import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 't3-code-vs-codeagentswarm',
    locale: 'es',
    title: 'T3 Code vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'T3 Code vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'T3 Code es un panel de control open source que termina en una PR con un clic. CodeAgentSwarm supervisa diez agentes CLI. Comparativa honesta de 2026.',
    intro: `T3 Code es un panel de control open source con licencia MIT que reúne varios agentes de programación en una sola interfaz para escritorio, web y móvil y cierra cada hilo con una pull request de un clic, mientras que CodeAgentSwarm es una app de escritorio de código cerrado pensada para supervisar varios agentes CLI a la vez, con notificaciones del sistema, historial buscable entre agentes y un tablero kanban que los propios agentes actualizan por MCP.

Antes de nada, transparencia: CodeAgentSwarm lo hacemos nosotros. T3 Code gana varias filas de la tabla, y nuestras limitaciones (código cerrado, Mobile Connect aún en alpha, todavía en beta) aparecen en esa misma tabla. Todos los datos de terceros se comprobaron el 31 de octubre de 2026 en t3.codes, en el README y la documentación de usuario de T3 Code y en los datos públicos de GitHub, y lo que no pudimos verificar está marcado como tal en lugar de inventado. La disponibilidad y los agentes compatibles de CodeAgentSwarm se actualizaron el 5 de octubre de 2026.

Resumen rápido: elige T3 Code si te importan el código abierto y llegar rápido del diff a la pull request. Elige CodeAgentSwarm si trabajas con diez agentes CLI compatibles y necesitas notificaciones, historial y un tablero para no perderles la pista.`,
    ctaText: 'Prueba las dos sobre el mismo repositorio y quédate con la que encaje en tu semana. CodeAgentSwarm es gratis durante la beta, con Pro incluido, para macOS, Windows y Linux.',
    ctaAgent: 'comparison',
    highlightedWords: ['T3 Code', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 't3-code-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'T3 Code es un panel de control open source que envuelve varios agentes de programación en una interfaz para escritorio, web y móvil y optimiza el camino entre un diff terminado y una pull request, mientras que CodeAgentSwarm es una app de escritorio de código cerrado optimizada para supervisar muchos terminales de agente a la vez, con diez agentes CLI compatibles.',
        },
        {
          type: 'paragraph',
          text: 'Las dos herramientas se apoyan en los agentes CLI que ya pagas y ninguna revende tokens. La diferencia está en qué consideran la parte difícil. Para T3 Code, lo difícil es entregar el trabajo. Para CodeAgentSwarm, lo difícil es seguirle el ritmo a varios agentes. Si prefieres ver primero el panorama completo, tienes el repaso de <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA en paralelo</a>, y la comparativa hermana de <a href="/es/guias/superset-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset vs CodeAgentSwarm</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Aviso: CodeAgentSwarm es nuestro producto. Todo lo que decimos aquí de T3 Code se verificó el 31 de octubre de 2026 en su propia web (t3.codes), en el README y la documentación de usuario de pingdotgg/t3code y en los datos públicos de GitHub. Cuando una función no está documentada públicamente, lo decimos así en lugar de afirmar que T3 Code no la tiene.',
        },
      ],
    },
    {
      id: 'what-is-t3-code',
      title: 'Qué es T3 Code',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://t3.codes" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code</a> se define como "el panel de control open source para agentes de programación". Viene del equipo de Ping, alrededor de Theo Browne (t3.gg), y su código está en <a href="https://github.com/pingdotgg/t3code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">pingdotgg/t3code</a> con licencia MIT, a nombre de T3 Tools Inc. Su web resume la propuesta en dos ideas: trae tu propia suscripción y haz un fork de todo el producto si quieres.',
        },
        {
          type: 'paragraph',
          text: 'El impulso que llevan es real y conviene decirlo sin rodeos. El repositorio se creó el 8 de febrero de 2026. Tenía 21.084 estrellas el 31 de agosto de 2026 y unas 33.800 el 31 de octubre de 2026, así que sumó unas 12.700 en dos meses. Su último commit público y su versión v0.1.6 salieron el 31 de octubre de 2026, con varias builds nightly publicadas ese mismo día. Ese ritmo es un motivo legítimo para tomárselos en serio. Su README también es franco: el proyecto está en una fase muy temprana, hay que contar con fallos y, de momento, casi no aceptan contribuciones.',
        },
        {
          type: 'list',
          items: [
            'Hilos con terminal integrado y panel de navegador, más acceso remoto desde el móvil, un navegador u otra máquina mediante T3 Connect, emparejamiento en red local o Tailscale',
            'Worktrees de git, así cada hilo de agente trabaja en su rama sin pisar a los demás, con limpieza automática opcional',
            'Panel de diffs que muestra solo los cambios de cada turno, para revisar cada paso en vez de un diff gigante al final',
            'Commit, push y creación de PR con un clic, con título, cuerpo y changelog generados, incluidas PRs en borrador, apiladas y enmendadas, usando tu autenticación de GitHub',
            'Búsqueda de hilos entre entornos conectados por título, rama, pull request, proyecto o texto de los mensajes',
            'Selección de modelo y de nivel de razonamiento, comando <code>/plan</code>, skills en el menú de barra, acciones de proyecto, una vista de uso y límites de suscripción, y un comando <code>t3</code> que puede quedarse como servicio en segundo plano',
          ],
        },
        {
          type: 'paragraph',
          text: 'En agentes, su README y su web listan Claude Code, Codex, Cursor, Grok Build, OpenCode y Google Antigravity, y avisan de que suman harnesses cada semana. Su documentación añade Pi, Muse Code, fx y cualquier agente del ACP Registry. La distribución es especialmente generosa: apps de escritorio para macOS, Windows y Linux, app web en app.t3.codes y apps públicas para iOS y Android con notificaciones push. Es gratis, open source bajo MIT y usa tus suscripciones actuales de agentes.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS, Windows y Linux, es de código cerrado y es gratis durante la beta con Pro incluido. No es un proveedor de modelos: cada terminal usa una suscripción CLI que ya tienes.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: 'La idea de fondo es que a partir de dos o tres agentes el cuello de botella deja de ser el agente y pasas a serlo tú. Por eso las funciones giran en torno a tu atención: notificaciones cuando un agente termina o se para a preguntarte algo, historial buscable entre los diez agentes y con opción de retomar cuando el agente la admite, diffs en vivo por terminal, permisos con modos Turbo y YOLO, indicador de cuota, mensajes de commit con IA, worktrees de git por sesión, marketplaces de skills y de MCP, y un kanban que los agentes actualizan solos por MCP. Si por ahora usas un solo proveedor, la guía para <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> es la versión reducida de esta idea.',
        },
        {
          type: 'paragraph',
          text: 'Las limitaciones, sin adornos: código cerrado y sin repositorio público, Mobile Connect aún en alpha (beta web para todas las cuentas, acceso nativo para iOS y Android bajo petición y el escritorio debe seguir abierto), software en beta, hacen falta tus propias suscripciones CLI y no hay botón de PR con un clic (commiteas desde la app y abres la PR tú). Si algo de eso te bloquea, T3 Code te va a servir mejor.',
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
            ['Plataformas', 'Escritorio en macOS, Windows y Linux; web; iOS y Android', 'macOS, Windows y Linux. Mobile Connect en alpha'],
            ['Instalación y distribución', '<code>npx t3@latest</code> sin instalar nada, scripts de instalación, app de escritorio, winget, Scoop, cask de Homebrew, .deb, AUR, Nix y descargas directas', 'Instalador de escritorio para macOS y Windows; .deb y AppImage para Linux'],
            ['Interfaz', 'Hilos con panel de diffs, terminal integrado y panel de navegador, más acceso remoto por T3 Connect, red local o Tailscale', 'Workspace multiterminal con tablero kanban, navegador de historial y diffs por terminal'],
            ['Agentes soportados', 'Claude Code, Codex, Cursor, Grok Build, OpenCode y Google Antigravity en el README y en t3.codes; su documentación añade Pi, Muse Code, fx y agentes del ACP Registry', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI'],
            ['Modelo de aislamiento', 'Worktrees de git, una rama por hilo de agente, con limpieza automática opcional', 'Worktrees de git por sesión, un proceso por terminal'],
            ['Notificaciones', 'Avisos push en el móvil mediante T3 Connect cuando un agente termina, falla, necesita aprobación o pregunta algo. Notificaciones de escritorio no documentadas a 31 de octubre de 2026', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'Búsqueda de hilos entre entornos conectados por título, rama, pull request, proyecto o texto de los mensajes', 'Historial buscable de los diez agentes, con opción de retomar cuando el agente la admite'],
            ['Gestión de tareas', 'Acciones de proyecto y commit, push y PR con un clic (PRs en borrador, apiladas y enmendadas). Sin tablero kanban documentado a 31 de octubre de 2026', 'Kanban que los agentes actualizan por MCP. Sin botón de PR con un clic'],
            ['Código abierto', 'Sí, MIT (pingdotgg/t3code). De momento casi no aceptan contribuciones, según su README', 'No. Código cerrado, sin repositorio público'],
            ['Precio', 'Gratis y sin plan de pago, sigues pagando a tus proveedores de agentes. El acceso remoto T3 Connect es gratis por ahora para hasta 3 máquinas (según su FAQ)', 'Gratis durante la beta con Pro incluido. Pones tus suscripciones CLI'],
            ['Último commit público (verificado el 31 oct 2026)', '31 de octubre de 2026, el mismo día de la versión v0.1.6. Unas 33.800 estrellas desde el 8 de febrero de 2026', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Datos de producto verificados el 31 de octubre de 2026 en t3.codes y en el README y la documentación de usuario de T3 Code. Estrellas y actividad pública de GitHub comprobadas ese mismo día.',
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
            '<strong>Quieres instalarlo con tu gestor de paquetes.</strong> T3 Code está en winget, Scoop, Homebrew, el AUR y Nix. CodeAgentSwarm se instala con su propio instalador (en Linux, .deb o AppImage).',
            '<strong>Quieres probarlo en diez segundos.</strong> <code>npx t3@latest</code> lo arranca sin instalar nada, y no hay instalador que baje más la barrera.',
            '<strong>Tu cuello de botella es entregar, no supervisar.</strong> Un botón para commitear, hacer push y abrir la PR con título y cuerpo generados, incluyendo PRs en borrador y apiladas, gana a hacerlo a mano. Nosotros generamos el mensaje de commit, pero no tenemos botón de PR.',
            '<strong>Quieres apps móviles públicas.</strong> T3 Code ofrece apps para iOS y Android, con avisos push cuando un agente termina o te necesita, además de un cliente web. Mobile Connect de CodeAgentSwarm sigue en alpha.',
            '<strong>Te interesa la comunidad.</strong> Unas 33.800 estrellas, unas 12.700 de ellas sumadas entre el 31 de agosto y el 31 de octubre de 2026, más builds nightly y nuevas integraciones frecuentes, hacen que los fallos se detecten y se arreglen rápido.',
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
            '<strong>Quieres las CLI de cada proveedor, en su propio terminal.</strong> Cada sesión de CodeAgentSwarm ejecuta la CLI del agente en un terminal, un proceso por terminal. T3 Code, en cambio, maneja los agentes con sus propias integraciones de proveedor (Claude mediante el Agent SDK de Anthropic, según su FAQ).',
            '<strong>Prefieres que te avise el escritorio a estar mirando.</strong> Las notificaciones de escritorio saltan cuando cualquier agente termina o necesita respuesta, así que puedes irte y volver cuando de verdad ha pasado algo. T3 Code documenta avisos push en su app móvil, no notificaciones de escritorio, a 31 de octubre de 2026.',
            '<strong>Quieres un único historial buscable.</strong> Las conversaciones de los diez agentes se guardan y se buscan en el mismo sitio, y se retoman cuando el agente lo permite.',
            '<strong>Quieres que los agentes mantengan el tablero al día.</strong> El kanban está expuesto por MCP, así que los agentes mueven sus propias tareas mientras trabajan.',
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
      answer: 'Antigravity sí. Kimi Code, no como proveedor integrado. A 31 de octubre de 2026, su README lista Google Antigravity como proveedor soportado, que se configura desde Settings con inicio de sesión de Google y sin CLI. Kimi Code no aparece en su README, su web ni su documentación de usuario, pero su documentación dice que se pueden añadir agentes del ACP Registry, y ese registro incluye Kimi CLI. No hemos probado esa vía. CodeAgentSwarm soporta Antigravity CLI y Kimi Code como agentes integrados, además de Claude Code, Codex CLI y OpenCode.',
    },
    {
      question: '¿Cuál se mantiene de forma más activa?',
      answer: 'Las dos están activas, y esta fila no la gana nadie. El repositorio público t3code tuvo su último commit el 31 de octubre de 2026, el mismo día de la versión v0.1.6, y tenía unas 33.800 estrellas cuando lo comprobamos ese día. CodeAgentSwarm es de código cerrado, así que no hay historial público que inspeccionar, y esa es una crítica justa: nuestro ritmo te lo tienes que creer.',
    },
    {
      question: '¿Puedo probar las dos gratis?',
      answer: 'Sí. T3 Code se arranca con npx t3@latest sin instalar nada, o se instala como app de escritorio en macOS, Windows y Linux, y también tiene app web y apps para iOS y Android, y es gratis usando tus propias suscripciones. CodeAgentSwarm es gratis durante la beta con Pro incluido, para macOS, Windows y Linux. Ninguna revende tokens, así que en los dos casos sigues usando las suscripciones CLI que ya pagas.',
    },
  ],
}

export default guide
