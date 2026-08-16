import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'conductor-vs-codeagentswarm',
    locale: 'es',
    title: 'Conductor vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'Conductor vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'Conductor es una app solo para Mac con agentes Claude Code, Codex y Cursor en paralelo. CodeAgentSwarm mueve siete CLIs en macOS y Windows. Comparativa honesta.',
    intro: `Conductor es una app solo para macOS que lanza agentes de Claude Code, Codex y Cursor en paralelo dentro de workspaces aislados; CodeAgentSwarm es una app de escritorio para macOS y Windows que ejecuta siete CLIs de agentes en terminales paralelos. Misma idea, distinto alcance.

Aviso: CodeAgentSwarm lo hacemos nosotros. Aun así, aquí se le reconoce a Conductor lo que hace bien, y cuando su web no documenta algo lo decimos como "no documentado" en lugar de afirmar que la función no existe. Todos los datos de terceros se comprobaron el 26 de julio de 2026 en conductor.build, incluidas su FAQ y los datos estructurados que publican en su portada.

Resumen rápido: si tú y tu equipo estáis todos en Mac y queréis una app nativa construida alrededor de revisar y mergear el trabajo de los agentes, Conductor es una elección seria y muy centrada. Si alguien toca Windows, o quieres más de tres CLIs de agentes, CodeAgentSwarm cubre terreno que Conductor no pisa.`,
    ctaText: '¿Necesitas un workspace de agentes en paralelo que también funcione en Windows y con siete CLIs en vez de tres? Descarga CodeAgentSwarm y monta tu primera tanda de terminales en paralelo.',
    ctaAgent: 'comparison',
    highlightedWords: ['Conductor', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-11',
    alternateSlug: 'conductor-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Conductor es una app solo para Mac que crea agentes de Claude Code, Codex y Cursor en paralelo dentro de workspaces aislados para que revises y mergees sus cambios; CodeAgentSwarm es una app de escritorio para macOS y Windows que ejecuta siete CLIs de agentes en terminales paralelos, con notificaciones, diffs en vivo y un tablero de tareas compartido.',
        },
        {
          type: 'paragraph',
          text: 'Los dos parten de la misma idea: darle a cada agente su espacio aislado y luego hacer que el resultado sea revisable. Se separan en el alcance. Conductor apuesta del todo por el Mac y por tres agentes, y de esa concentración saca un producto nativo muy afinado. CodeAgentSwarm se reparte entre dos sistemas operativos y siete proveedores, lo cual pesa si tus máquinas y tus CLIs son variadas. Para el panorama general, empieza por <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para agentes de IA en paralelo</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Transparencia: CodeAgentSwarm es nuestro, así que léelo como una comparativa escrita por parte interesada. Todos los datos de terceros se verificaron el 26 de julio de 2026 en conductor.build, con sus propios textos, su FAQ y los datos estructurados que publican. Conductor no tiene repositorio público, así que varias filas aparecen como "no documentado" en vez de rellenarse a ojo.',
        },
      ],
    },
    {
      id: 'what-is-conductor',
      title: 'Qué es Conductor',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://conductor.build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor</a> se describe con estas palabras suyas: "Create parallel Claude Code, Codex, and Cursor agents in isolated workspaces. See at a glance what they are working on, then review and merge their changes". Es decir, agentes en paralelo dentro de workspaces aislados, con una vista de qué hace cada uno para luego revisar y mergear. Lo desarrolla Melty Labs, una empresa de Y Combinator con sede en San Francisco, y su web indica macOS como sistema operativo.',
        },
        {
          type: 'paragraph',
          text: 'El flujo que documentan es corto. Añades un repositorio, Conductor lo clona y trabaja íntegramente en tu Mac. Cada agente que levantas recibe un workspace aislado, y su FAQ explica qué hay debajo: "each Conductor workspace is a new git worktree", cada workspace es un worktree nuevo de git. Su propia descripción añade que además lleva su rama, su entorno de ejecución y una carpeta de contexto compartido. Después miras una lista que enseña quién trabaja y qué necesita atención, y revisas el código.',
        },
        {
          type: 'list',
          items: [
            '<strong>Enfoque nativo en Mac:</strong> una sola plataforma, un solo objetivo de diseño, sin concesiones multiplataforma',
            '<strong>Workspaces aislados:</strong> un worktree de git, una rama, un entorno de ejecución y una carpeta de contexto compartido por agente',
            '<strong>Revisar y mergear dentro de la app:</strong> el producto gira alrededor de meter en la rama lo que hizo el agente, no solo de lanzarlo',
            '<strong>Agentes de Cursor:</strong> uno de sus tres agentes compatibles y también una integración de primera clase en CodeAgentSwarm mediante el servidor ACP oficial de Cursor',
            '<strong>Usa tu sesión actual:</strong> su FAQ dice que Conductor utiliza Claude Code tal y como ya hayas iniciado sesión, sea con API key o con un plan Claude Pro o Max',
          ],
        },
        {
          type: 'paragraph',
          text: 'Y lo que no hemos podido verificar. Conductor no tiene repositorio público, así que no hay historial de commits ni estrellas que citar, y su web no publica página de precios (la ruta /pricing devolvía un 404 el 26 de julio de 2026). El historial de conversaciones, un tablero de tareas y las notificaciones de escritorio tampoco están documentados en su web a esa fecha. Eso no significa que no existan. Significa que no te vamos a decir ni que sí ni que no.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS y Windows, no es un proveedor de modelos, y pilota las CLIs de agentes que instalas tú: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent.',
        },
        {
          type: 'image',
          alt: 'Panel de worktrees de git en CodeAgentSwarm, donde cada sesión de agente en paralelo tiene su propio worktree para que no compartan directorio de trabajo',
          src: '/images/guides/git-worktrees-panel.png',
          caption: 'Worktrees por sesión en CodeAgentSwarm. Los dos productos llegan a la misma pieza de aislamiento, porque tener agentes compartiendo directorio acaba mal.',
        },
        {
          type: 'list',
          items: [
            'Terminales en paralelo, cada uno con su agente, su proyecto y su conversación',
            'Notificaciones de escritorio cuando un agente termina o se para a preguntarte algo',
            'Historial buscable de los siete agentes, con reanudación cuando el agente la admite',
            'Diffs de ficheros en vivo por terminal, mientras el agente sigue trabajando',
            'Control de permisos, con un modo Turbo para cuando no quieras aprobar cada paso',
            'Un tablero kanban que los propios agentes actualizan por MCP',
            'Worktrees de git por sesión, además de marketplaces de skills y de MCP',
            'Indicador de cuota, mensajes de commit con IA y cambio rápido entre proyectos',
          ],
        },
        {
          type: 'paragraph',
          text: 'Y las limitaciones, por delante: código cerrado sin repositorio público, sin versión para Linux, sin cliente móvil ni remoto, todavía en beta, y necesitas tus propias suscripciones para las CLIs que uses. Conductor también es cerrado, pero es una app nativa de Mac hecha por una empresa financiada, y si trabajas solo en Mac esa concentración vale algo.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'table',
          headers: ['', 'Conductor', 'CodeAgentSwarm'],
          rows: [
            [
              '<strong>Plataformas</strong>',
              'Solo macOS, según su propia web',
              'macOS y Windows. Sin versión para Linux',
            ],
            [
              '<strong>Interfaz</strong>',
              'App de Mac con una lista de workspaces que muestra quién trabaja y qué necesita atención, más revisión de código',
              'Workspace de escritorio con terminales en paralelo, diffs en vivo y tablero',
            ],
            [
              '<strong>Agentes soportados</strong>',
              'Claude Code, Codex y Cursor, según su FAQ',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent',
            ],
            [
              '<strong>Modelo de aislamiento</strong>',
              'Un worktree de git por workspace, más su rama, su entorno de ejecución y una carpeta de contexto compartido',
              'Worktree de git por sesión y un proceso independiente por terminal',
            ],
            [
              '<strong>Notificaciones</strong>',
              'Su web dice que la vista de workspaces enseña qué necesita atención. Las notificaciones de escritorio no están documentadas a 26 de julio de 2026',
              'Notificaciones de escritorio cuando un agente termina o necesita intervención',
            ],
            [
              '<strong>Historial de conversaciones</strong>',
              'No documentado en su web a 26 de julio de 2026',
              'Buscable en los siete agentes, con reanudación cuando cada agente la admite',
            ],
            [
              '<strong>Gestión de tareas</strong>',
              'No documentado en su web a 26 de julio de 2026',
              'Tablero kanban que los propios agentes actualizan por MCP',
            ],
            [
              '<strong>Open source</strong>',
              'Sin repositorio público a 26 de julio de 2026. Desarrollado por Melty Labs',
              'No. Código cerrado, sin repositorio público de la app',
            ],
            [
              '<strong>Precio</strong>',
              'No publicado como texto en su web a 26 de julio de 2026. Su FAQ sí dice que Conductor usa tu sesión existente de Claude Code',
              'Gratis durante la beta con Pro incluido, y pones tú las suscripciones de las CLIs',
            ],
            [
              '<strong>Último commit público</strong>',
              'Sin repositorio público',
              'Código cerrado, sin repositorio público',
            ],
          ],
          caption: 'Todos los datos de Conductor se comprobaron el 26 de julio de 2026 en conductor.build, incluidas su FAQ y los datos estructurados de su portada. Las filas marcadas como "no documentado" significan que no lo hemos encontrado publicado, no que la función no exista.',
        },
      ],
    },
    {
      id: 'when-conductor',
      title: 'Cuándo Conductor es la mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'Centrarse también es una virtud, y Conductor eligió su carril a conciencia. Hay casos en los que ese carril es el tuyo.',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabajas solo en Mac y quieres una app nativa.</strong> Conductor apunta a una única plataforma, y eso se suele notar en el día a día.',
            '<strong>Tu cuello de botella es revisar, no lanzar.</strong> Su producto está montado alrededor de ver qué hizo cada agente y mergearlo, la parte que más gente subestima.',
            '<strong>Quieres agentes de Cursor.</strong> Cursor es uno de sus tres agentes soportados. CodeAgentSwarm no mueve Cursor.',
            '<strong>Te convence el workspace aislado como concepto central.</strong> Una rama, un worktree, un entorno de ejecución y una carpeta de contexto compartido por agente es un modelo mental limpio.',
            '<strong>Quieres menos piezas.</strong> Tres agentes en lugar de siete es menos que configurar y mantener al día, y a algunos equipos les compensa.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Sobre madurez: Conductor lo hace una empresa de Y Combinator y cuentan que construyeron Conductor usando Conductor. CodeAgentSwarm es software en beta de una operación mucho más pequeña. Es un factor legítimo, y preferimos que lo valores con la información real delante.',
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'Cuándo CodeAgentSwarm es la mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'La comparativa cambia de lado justo en los bordes de ese enfoque: el sistema operativo, el número de proveedores y lo que pasa cuando el agente deja de escribir.',
        },
        {
          type: 'list',
          items: [
            '<strong>Tú o tu equipo usáis Windows.</strong> Conductor es solo macOS según su web. CodeAgentSwarm funciona en macOS y Windows, algo que pesa en cuanto una persona del equipo no está en Mac.',
            '<strong>Quieres siete CLIs de agentes.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent, mezclados entre terminales. Antigravity, OpenCode, Kimi y Grok no están entre los agentes que documenta Conductor.',
            '<strong>Quieres un único historial buscable entre proveedores,</strong> con cualquier conversación recuperable en un terminal vivo.',
            '<strong>Quieres que sean los agentes quienes mantengan el tablero.</strong> El kanban lo actualizan ellos por MCP mientras trabajan, no tú después.',
            '<strong>Quieres que te avisen, no estar mirando.</strong> Las notificaciones saltan cuando un agente termina o necesita algo.',
            '<strong>Andas justo de cuota.</strong> El indicador te enseña cómo vas antes de que un agente se quede a medias.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Alternativas a Conductor en Windows',
          id: 'windows-alternative',
        },
        {
          type: 'paragraph',
          text: 'Si descubriste Conductor, te gustó la idea y luego viste que es solo para macOS, esta es la sección que buscabas. Su web indica macOS como sistema operativo, así que a 26 de julio de 2026 no hay versión de Windows a la que esperar. Te quedan unas cuantas opciones honestas.',
        },
        {
          type: 'list',
          items: [
            '<strong>CodeAgentSwarm</strong> funciona en macOS y Windows, con terminales en paralelo, worktrees por sesión, diffs en vivo, notificaciones de escritorio y tablero compartido. Es nuestro, es cerrado y está en beta, tenlo en cuenta.',
            '<strong>Paseo</strong> publica builds de escritorio para Windows y Linux además de macOS, es open source bajo AGPLv3 y añade clientes móviles y web. Lo desglosamos en <a href="/es/guias/paseo-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo vs CodeAgentSwarm</a>.',
            '<strong>T3 Code</strong> también sale de macOS. Lo comparamos en <a href="/es/guias/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code vs CodeAgentSwarm</a>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Elijas la que elijas, la pieza de aislamiento es la que usa Conductor, y merece la pena entenderla antes de dejar varios agentes sueltos sobre un repositorio. En <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees para agentes de IA</a> está explicada sin depender de ningún producto.',
        },
      ],
    },
    {
      id: 'use-both',
      title: '¿Puedes usar los dos?',
      content: [
        {
          type: 'paragraph',
          text: 'En Mac, sí. Ninguno es proveedor de modelos y los dos pilotan CLIs instaladas en tu máquina con tus credenciales, así que puedes dejar Conductor para los repositorios donde te interesa su flujo de revisar y mergear, y CodeAgentSwarm para aquellos en los que quieres siete agentes y un tablero compartido.',
        },
        {
          type: 'paragraph',
          text: 'La regla es la de siempre con dos orquestadores: no apuntes los dos a la misma rama del mismo repositorio a la vez. Worktrees separados o proyectos separados, y no se estorban. En Windows la duda ni aparece, porque de los dos solo funciona uno.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Conductor funciona en Windows?',
      answer: 'No. Conductor indica macOS como sistema operativo en su propia web y su titular habla de ejecutar agentes en paralelo en tu Mac, así que a 26 de julio de 2026 no hay versión para Windows. CodeAgentSwarm funciona en macOS y Windows, que es la razón principal por la que mucha gente que compara los dos acaba aquí. Ninguno de los dos tiene versión para Linux.',
    },
    {
      question: '¿Conductor es open source?',
      answer: 'No hay repositorio público de Conductor a 26 de julio de 2026. Es una app de Mac propietaria desarrollada por Melty Labs, una empresa de Y Combinator con sede en San Francisco, así que no hay historial de commits que puedas inspeccionar. CodeAgentSwarm también es de código cerrado y sin repositorio público, o sea que ninguno de los dos te da acceso al código. Si el open source es requisito, mira Paseo, que publica el suyo bajo AGPLv3.',
    },
    {
      question: '¿Qué agentes soporta cada uno?',
      answer: 'Conductor soporta Claude Code, Codex y Cursor, según la FAQ de su web. CodeAgentSwarm soporta siete CLIs: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build y Cursor Agent. Los dos ejecutan Cursor; CodeAgentSwarm también ejecuta Antigravity CLI, OpenCode, Kimi Code y Grok Build.',
    },
    {
      question: '¿Hay forma de probar los dos gratis?',
      answer: 'CodeAgentSwarm es gratis durante la beta, con Pro incluido, y pones tú las suscripciones de las CLIs. En el caso de Conductor, su web no publica precios como texto a 26 de julio de 2026 y la ruta /pricing devuelve un 404, así que no vamos a afirmar nada sobre lo que cuesta. Su FAQ sí documenta que Conductor usa tu sesión existente de Claude Code, sea con API key o con un plan Claude Pro o Max. Consulta conductor.build para ver las condiciones actuales.',
    },
  ],
}

export default guide
