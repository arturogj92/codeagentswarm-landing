import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'vibe-kanban-vs-codeagentswarm',
    locale: 'es',
    title: 'Vibe Kanban vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'Vibe Kanban vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'Vibe Kanban convierte el trabajo de los agentes en un kanban de issues. CodeAgentSwarm te deja pilotar sus terminales. Comparativa honesta verificada en julio de 2026.',
    intro: `Vibe Kanban convierte el trabajo de los agentes en un kanban de issues para equipos. CodeAgentSwarm te deja mirar y pilotar las propias terminales de los agentes, con el tablero como una función más y no como el producto entero.

CodeAgentSwarm lo hacemos nosotros, y conviene que leas esta página sabiéndolo. Por eso aquí verás nuestros límites (código cerrado, solo macOS y Windows, sin app móvil, todavía en beta, y tú pones tus suscripciones de agentes) y también el crédito que Vibe Kanban merece en lo que hace mejor, empezando por ser código abierto y tener con diferencia la comunidad más grande de esta categoría. Cada dato de terceros se verificó el 26 de julio de 2026 en la web del fabricante, su README público y los datos públicos de GitHub, incluido un cambio de estado público que contamos entero.

Si tu cuello de botella es planificar y revisar el trabajo en equipo, una herramienta que arranca por el kanban tiene la forma correcta. Si tu cuello de botella es seguir el ritmo de varias sesiones de agentes a la vez, la forma correcta es un espacio de supervisión.`,
    ctaText: 'Si quieres ver qué está haciendo cada agente ahora mismo, enterarte en el momento en que uno te necesita y tener un tablero que los agentes actualizan solos, descarga CodeAgentSwarm y pruébalo en tu próxima sesión en paralelo.',
    ctaAgent: 'comparison',
    highlightedWords: ['Vibe Kanban', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-11',
    alternateSlug: 'vibe-kanban-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Vibe Kanban convierte el trabajo de los agentes en un kanban de issues que un equipo puede planificar y revisar, mientras que CodeAgentSwarm te deja ejecutar y supervisar las propias terminales de los agentes, con el tablero de tareas como una parte más de un espacio de trabajo mayor.',
        },
        {
          type: 'paragraph',
          text: 'Dicho de otra forma: su producto es el tablero, el nuestro es la sala donde trabajan los agentes. Para ver el panorama completo, tienes <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA</a>, y si lo que te interesa es el tablero en sí, nuestra guía de <a href="/es/guias/gestion-de-tareas-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">gestión de tareas con Claude Code</a> enseña cómo los agentes actualizan tareas por MCP.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Aviso: CodeAgentSwarm es nuestro producto, así que léelo como una comparativa con parte interesada y verifica lo que decimos. Todos los datos de terceros se comprobaron el 26 de julio de 2026 en vibekanban.com, el README público de BloopAI/vibe-kanban y los datos públicos de GitHub. Cuando su documentación no cubre algo, decimos que no está documentado en vez de afirmar que le falta.',
        },
      ],
    },
    {
      id: 'what-is-vibe-kanban',
      title: 'Qué es Vibe Kanban',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://vibekanban.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban</a> se define como gestión de proyectos para equipos que construyen con agentes de programación con IA. Planificas el trabajo como issues de kanban y luego creas un workspace donde el agente ejecuta: su README dice que cada workspace le da al agente una rama, una terminal y un servidor de desarrollo. Revisas el diff, dejas comentarios en línea que van directos al agente, previsualizas la app en un navegador integrado y abres una pull request con descripción escrita por IA.',
        },
        {
          type: 'paragraph',
          text: 'Se arranca con un solo comando, <code>npx vibe-kanban</code>, y su README lista soporte para más de diez agentes: Claude Code, Codex, Gemini CLI, GitHub Copilot, Amp, Cursor, OpenCode, Droid, CCR y Qwen Code. Su documentación también cubre un servidor MCP propio, integraciones con GitHub y Azure Repos, una extensión de VSCode y autohospedaje con Docker Compose.',
        },
        {
          type: 'list',
          items: [
            'Código abierto con licencia Apache-2.0 y unas 27.500 estrellas en GitHub (27.524 el 26 de julio de 2026), la comunidad más grande de esta comparativa',
            'Las issues del kanban como unidad principal de trabajo, pensadas para equipos y no para una sola persona',
            'Revisión de diffs con comentarios en línea que vuelven al agente sin salir de la interfaz',
            'Un navegador integrado con devtools, modo inspección y emulación de dispositivos',
            'Creación y merge de pull requests desde la propia herramienta',
            'Último commit público en la rama principal: 24 de abril de 2026',
          ],
        },
        {
          type: 'paragraph',
          text: 'Hay un dato más que deberías tener antes de elegirlo, y sale de su propia web. El 10 de abril de 2026, bloop, la empresa detrás de Vibe Kanban, publicó <a href="https://www.vibekanban.com/blog/shutdown" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">un anuncio</a> de cierre en el que explicaba que el proyecto continuaría como código abierto mantenido por la comunidad. El mismo anuncio dice que los servicios remotos siguieron disponibles 30 días y que después Vibe Kanban pasó a una arquitectura totalmente local, con la retirada de las issues del kanban, los comentarios, los proyectos y las organizaciones en remoto, mientras que los workspaces locales siguen funcionando. El README de su rama principal lleva un aviso de cierre que enlaza a ese artículo.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Aquí damos fechas, no veredictos. Un proyecto Apache-2.0 con 27.500 estrellas no se evapora, y hay software mantenido por la comunidad que sobrevive a su empresa. Lee el anuncio, mira tú mismo la actividad del repositorio y decide qué significa eso para la forma de trabajar de tu equipo.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS y Windows, cada terminal es un proceso de agente real y eliges el agente por terminal entre Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build.',
        },
        {
          type: 'image',
          alt: 'El tablero kanban de CodeAgentSwarm con tareas que los propios agentes mueven entre columnas por MCP',
          src: '/images/guides/task-board-kanban.png',
          caption: 'Nuestro kanban es una función más del espacio de trabajo: los agentes crean y mueven sus propias tareas por MCP mientras tú vigilas las terminales al lado.',
        },
        {
          type: 'paragraph',
          text: 'El tablero existe, pero no es el eje. El eje es la supervisión: notificaciones de escritorio cuando un agente termina o necesita respuesta, historial de conversaciones buscable de los seis agentes con reanudación, diffs de archivos en vivo por terminal, control de permisos con modo Turbo, git worktrees por sesión, cambio entre proyectos, mensajes de commit con IA, indicador de cuota del proveedor y marketplaces de skills y de MCP compartidos entre agentes.',
        },
        {
          type: 'paragraph',
          text: 'Nuestros límites, sin rodeos: código cerrado y sin repositorio público, solo macOS y Windows, sin app móvil, todavía en beta (gratis y con Pro incluido durante la beta) y no somos proveedor de modelos, así que pones tus propias suscripciones.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'table',
          headers: ['', 'Vibe Kanban', 'CodeAgentSwarm'],
          rows: [
            ['Plataformas', 'Se ejecuta en local con npx vibe-kanban y se usa desde el navegador; autohospedaje documentado con Docker Compose', 'App de escritorio para macOS y Windows'],
            ['Interfaz', 'Tablero kanban e interfaz de workspaces en el navegador, con previsualización integrada de la app', 'Espacio de trabajo de escritorio con paneles de terminal en vivo'],
            ['Agentes soportados', 'Claude Code, Codex, Gemini CLI, GitHub Copilot, Amp, Cursor, OpenCode, Droid, CCR y Qwen Code según su README', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build'],
            ['Modelo de aislamiento', 'Un workspace por issue, cada uno con su rama, su terminal y su servidor de desarrollo', 'Un proceso separado por terminal, con git worktrees opcionales por sesión'],
            ['Notificaciones', 'No documentado en su web a 26 de julio de 2026', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'Sesiones por workspace con interfaz de chat y panel de cambios, documentadas por workspace', 'Historial buscable de los seis agentes, con reanudación'],
            ['Gestión de tareas', 'Es el producto entero: issues de kanban, filtros, personalización del tablero, asignación en equipo', 'Una función más del espacio de trabajo: un kanban que los agentes actualizan por MCP'],
            ['Código abierto', 'Sí, Apache-2.0, unas 27.500 estrellas', 'No, código cerrado y sin repositorio público de la app'],
            ['Precio', 'Código abierto y autohospedable; las suscripciones de pago en la nube se cancelaron según su anuncio del 10 de abril de 2026', 'Gratis durante la beta con Pro incluido, y tú pones tus suscripciones de agentes'],
            ['Último commit público (verificado el 26 jul 2026)', '24 de abril de 2026', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Verificado el 26 de julio de 2026 en vibekanban.com, su README público, su documentación y GitHub.',
        },
      ],
    },
    {
      id: 'when-vibe-kanban',
      title: 'Cuándo Vibe Kanban es mejor opción',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Tu unidad de trabajo es una issue, no una sesión.</strong> Si el trabajo consiste en planificar y repartir tickets y los agentes son la forma de completarlos, una herramienta que arranca por el kanban encaja mejor que un espacio de terminales.',
            '<strong>Quieres código abierto que puedas hospedar.</strong> Apache-2.0, unas 27.500 estrellas y autohospedaje documentado con Docker Compose. Nuestra app es de código cerrado y no hay nada que hospedar.',
            '<strong>Revisas en el navegador.</strong> Los comentarios en línea sobre un diff que vuelven directos al agente, más una previsualización integrada con devtools y emulación de dispositivos, están muy bien y nosotros no tenemos equivalente.',
            '<strong>Quieres más agentes donde elegir.</strong> Su README lista más de diez, incluidos Cursor, Amp, Droid y Qwen Code. Nuestra lista es de seis.',
            '<strong>Quieres gestionar las pull requests dentro de la herramienta.</strong> Abrir una PR con descripción escrita por IA y hacer merge desde la misma interfaz forma parte de su flujo.',
            '<strong>No estás en macOS ni en Windows.</strong> Se lanza con npx allí donde haya Node, así que una máquina Linux vale. CodeAgentSwarm no está disponible ahí.',
          ],
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'Cuándo CodeAgentSwarm es mejor opción',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Quieres ver trabajar a los agentes.</strong> Paneles de terminal en vivo, diffs de archivos por terminal según ocurren y títulos que te dicen en qué anda cada sesión ahora mismo.',
            '<strong>Prefieres que te interrumpan a estar mirando.</strong> Las notificaciones de escritorio te avisan en cuanto un agente termina o se para a preguntar algo.',
            '<strong>Usas Antigravity CLI o Kimi Code.</strong> Ninguno aparece entre los agentes del README de Vibe Kanban a 26 de julio de 2026. Aquí los dos son ciudadanos de primera, junto a Claude Code, Codex CLI y OpenCode.',
            '<strong>Quieres un historial buscable entre proveedores.</strong> Todas las conversaciones de todos los agentes en un mismo buscador, con reanudación desde cualquier punto.',
            '<strong>Quieres control de permisos por operación.</strong> El modo Turbo aprueba solo lo que tú confías y deja el resto bajo revisión, en vez de un interruptor de todo o nada.',
            '<strong>Quieres saber tu cuota antes de que el agente se quede a medias.</strong> El indicador de cuota del proveedor te enseña cuánto te queda.',
            '<strong>Quieres una app de escritorio mantenida en Windows.</strong> Publicamos builds firmadas para macOS y Windows y las actualizamos con regularidad.',
          ],
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Usar los dos',
      content: [
        {
          type: 'paragraph',
          text: 'Es una combinación razonable. Planificas y priorizas el backlog del equipo en Vibe Kanban, y supervisas la ejecución real en CodeAgentSwarm, donde puedes vigilar varios agentes a la vez y enterarte cuando uno te necesita. Los dos trabajan sobre ramas de git, así que no tienes que cambiar nada de la estructura del repositorio.',
        },
        {
          type: 'paragraph',
          text: '¿Comparas más de dos? La <a href="/es/guias/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">comparativa con Claude Squad</a> cubre el enfoque de terminal, y <a href="/es/guias/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst, antes Crystal</a>, cubre el enfoque de editor visual.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Vibe Kanban es código abierto?',
      answer: 'Sí. Vibe Kanban se publica en github.com/BloopAI/vibe-kanban con licencia Apache-2.0 y unas 27.500 estrellas (27.524 al verificarlo el 26 de julio de 2026), la comunidad más grande de todas las herramientas comparadas aquí. CodeAgentSwarm es de código cerrado y no tiene repositorio público de la aplicación.',
    },
    {
      question: '¿Vibe Kanban sigue mantenido?',
      answer: 'Estos son los datos con fecha, verificados el 26 de julio de 2026. El 10 de abril de 2026, bloop, la empresa detrás de Vibe Kanban, anunció su cierre y que el proyecto continuaría como código abierto mantenido por la comunidad. El último commit público en la rama principal fue el 24 de abril de 2026, y el README lleva un aviso de cierre que enlaza a ese anuncio. El código sigue siendo Apache-2.0 y autohospedable, así que la pregunta es cuánto te fías de un mantenimiento comunitario, no si el software desaparece.',
    },
    {
      question: '¿Puedo seguir usando la nube y las funciones de equipo de Vibe Kanban?',
      answer: 'Su anuncio del 10 de abril de 2026 dice que los servicios remotos siguieron disponibles 30 días y luego se retiraron, y que Vibe Kanban pasó a una arquitectura totalmente local. Las piezas remotas que se retiran son las issues del kanban, los comentarios, los proyectos y las organizaciones; las suscripciones de pago se cancelaron con reembolso de los últimos 30 días, y los workspaces locales siguen funcionando. La versión de entonces incluía una función de exportación de datos. Consulta su web para ver el estado actual antes de plantear un despliegue de equipo.',
    },
    {
      question: '¿Vibe Kanban soporta Antigravity CLI o Kimi Code?',
      answer: 'Ninguno aparece entre los agentes de programación del README de Vibe Kanban a 26 de julio de 2026, que menciona Claude Code, Codex, Gemini CLI, GitHub Copilot, Amp, Cursor, OpenCode, Droid, CCR y Qwen Code. CodeAgentSwarm soporta Antigravity CLI y Kimi Code de forma directa, junto a Claude Code, Codex CLI y OpenCode.',
    },
  ],
}

export default guide
