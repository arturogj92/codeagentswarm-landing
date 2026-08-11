import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'paseo-vs-codeagentswarm',
    locale: 'es',
    title: 'Paseo vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'Paseo vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'Paseo es un orquestador open source autoalojado que controlas desde el móvil. CodeAgentSwarm es una app de escritorio para macOS y Windows con seis CLIs de agentes.',
    intro: `Paseo es un orquestador open source que montas tú mismo y que puedes supervisar desde el móvil; CodeAgentSwarm es una app de escritorio para macOS y Windows que ejecuta seis CLIs de agentes en terminales paralelos. Ahí está la diferencia en una frase, y casi toda la decisión sale de ahí.

Aviso: CodeAgentSwarm lo hacemos nosotros. Precisamente por eso esta página dice sin rodeos en qué gana Paseo, en vez de fingir que nos llevamos todas las filas. Los dos se miden con los mismos criterios, nuestras limitaciones están junto a nuestras funciones, y todos los datos de terceros se comprobaron el 26 de julio de 2026 en paseo.sh, en el repositorio público getpaseo/paseo y en los datos públicos de GitHub.

Resumen rápido: si quieres lanzar una tarea en el escritorio y revisarla desde el tren, o necesitas software que puedas alojar y auditar tú, Paseo encaja mejor. Si trabajas en un Mac o en un Windows y quieres seis CLIs de agentes, un tablero compartido y un historial buscable de todas ellas, ahí es donde CodeAgentSwarm tiene sentido.`,
    ctaText: 'Si tu trabajo pasa delante del ordenador, en macOS o Windows, y quieres seis CLIs de agentes, diffs en vivo y un tablero compartido en una sola ventana, descarga CodeAgentSwarm y lanza tu próxima tanda de agentes en paralelo.',
    ctaAgent: 'comparison',
    highlightedWords: ['Paseo', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-11',
    alternateSlug: 'paseo-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Paseo es un orquestador open source y autoalojado, con clientes de escritorio, móvil, web y CLI que hablan con un daemon en tu propia máquina; CodeAgentSwarm es una app de escritorio de código cerrado para macOS y Windows que ejecuta seis CLIs de agentes a la vez en terminales paralelos.',
        },
        {
          type: 'paragraph',
          text: 'Los dos te dejan tener varios agentes trabajando al mismo tiempo. En lo que no coinciden es en dónde estás tú mientras eso pasa. Paseo da por hecho que puedes estar en cualquier sitio y te pone el móvil como mando. CodeAgentSwarm da por hecho que estás delante del ordenador y se concentra en lo que cabe en una pantalla: terminales, diffs en vivo, notificaciones y un tablero. Si aún estás ubicando la categoría, mira las <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">mejores herramientas para agentes de IA en paralelo</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Transparencia: CodeAgentSwarm es nuestro, así que léelo como lo que es, una comparativa escrita por parte interesada. Todo lo que se afirma aquí sobre Paseo se verificó el 26 de julio de 2026 en paseo.sh, en su repositorio público y en los datos públicos de GitHub. Cuando algo no está documentado en abierto, lo decimos en vez de inventarlo.',
        },
      ],
    },
    {
      id: 'what-is-paseo',
      title: 'Qué es Paseo',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://paseo.sh" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo</a> se define como una forma de orquestar agentes de programación desde el escritorio y desde el móvil. Por dentro es un daemon local que gestiona los agentes, más clientes de escritorio, móvil, web y CLI que se conectan a él. Instalas el daemon en la máquina donde vive tu código y tus credenciales, y llegas a ella desde el dispositivo que tengas a mano, por red local, con un relay cifrado de extremo a extremo o con tu propio túnel.',
        },
        {
          type: 'paragraph',
          text: 'El repositorio público es <a href="https://github.com/getpaseo/paseo" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">getpaseo/paseo</a>. En el momento de la comprobación tenía unas 11.400 estrellas (11.428 exactamente) y su último commit público era del 26 de julio de 2026, el mismo día en que se escribió esta página. El fichero LICENSE sitúa el código bajo AGPLv3, con los componentes de terceros bajo sus propias licencias.',
        },
        {
          type: 'list',
          items: [
            '<strong>Multiplataforma de verdad:</strong> apps nativas de iOS y Android, más escritorio, web y una CLI scriptable',
            '<strong>Autoalojado por diseño:</strong> el daemon y los agentes corren en tu portátil, tu VM o tu servidor',
            '<strong>Varios proveedores:</strong> su FAQ menciona Claude Code, Codex, Cursor, OpenCode y Pi, y el README añade GitHub Copilot',
            '<strong>Worktrees de git:</strong> opcionales por agente, para que cada uno trabaje en su rama',
            '<strong>Notificaciones push:</strong> en el repositorio hay código de push y de avisos de "el agente te necesita"',
            '<strong>Voz en local</strong> y una política declarada de cero telemetría, cero tracking y ningún login obligatorio',
          ],
        },
        {
          type: 'paragraph',
          text: 'Es un producto potente y no vamos a disimularlo. Lo del móvil, sobre todo, no es una casilla marcada por marcar: presumen de paridad entre la app del teléfono y la de escritorio. CodeAgentSwarm no tiene nada parecido.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS y Windows, no es un proveedor de modelos, y pilota las CLIs de agentes que ya tienes instaladas: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build.',
        },
        {
          type: 'image',
          alt: 'Pestañas de terminal de CodeAgentSwarm con indicadores de estado que muestran qué agentes trabajan, cuáles piden intervención y cuáles han terminado',
          src: '/images/guides/terminal-status-indicators.png',
          caption: 'Indicadores de estado en cada pestaña: todo el workspace está pensado para ver en qué anda cada agente sin salir de una pantalla.',
        },
        {
          type: 'list',
          items: [
            'Terminales en paralelo, cada uno con su agente, su proyecto y su conversación',
            'Notificaciones de escritorio cuando un agente termina o se para a preguntarte algo',
            'Historial buscable de los seis agentes, con opción de retomar cualquier conversación en un terminal',
            'Diffs de ficheros en vivo por terminal, mientras el agente sigue trabajando',
            'Control de permisos, con un modo Turbo para cuando no quieras aprobar cada paso',
            'Un tablero kanban que los propios agentes actualizan por MCP',
            'Worktrees de git por sesión, para que los agentes en paralelo no se peleen por el mismo directorio',
            'Marketplaces de skills y de MCP, indicador de cuota, mensajes de commit con IA y cambio rápido de proyecto',
          ],
        },
        {
          type: 'paragraph',
          text: 'Las limitaciones, sin adornos: código cerrado y sin repositorio público, sin versión para Linux, sin cliente móvil ni remoto, todavía en beta, y necesitas tus propias suscripciones para las CLIs que uses. Si alguna de esas cosas es innegociable para ti, la recomendación honesta es Paseo.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'table',
          headers: ['', 'Paseo', 'CodeAgentSwarm'],
          rows: [
            [
              '<strong>Plataformas</strong>',
              'Escritorio en macOS, Windows y Linux, apps de iOS y Android, web y CLI',
              'App de escritorio para macOS y Windows. Sin versión para Linux',
            ],
            [
              '<strong>Interfaz</strong>',
              'Daemon autoalojado más clientes de escritorio, móvil, web y CLI',
              'Un único workspace de escritorio con terminales, diffs y tablero',
            ],
            [
              '<strong>Agentes soportados</strong>',
              'Claude Code, Codex, Cursor, OpenCode y Pi según su FAQ, más GitHub Copilot en el README',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build',
            ],
            [
              '<strong>Modelo de aislamiento</strong>',
              'Worktree de git opcional por agente, una rama por tarea',
              'Worktree de git por sesión y un proceso independiente por terminal',
            ],
            [
              '<strong>Notificaciones</strong>',
              'Notificaciones push, también al móvil (el código de push y de avisos de atención es público en el repo)',
              'Notificaciones de escritorio cuando un agente termina o necesita intervención',
            ],
            [
              '<strong>Historial de conversaciones</strong>',
              'No documentado en su web a 26 de julio de 2026',
              'Buscable en los seis agentes, y se puede retomar cualquiera',
            ],
            [
              '<strong>Gestión de tareas</strong>',
              'Su documentación habla de schedules y flujos de orquestación. Un tablero no está documentado a 26 de julio de 2026',
              'Tablero kanban que los propios agentes actualizan por MCP',
            ],
            [
              '<strong>Open source</strong>',
              'Sí. Repositorio público bajo AGPLv3, autoalojable y sin telemetría',
              'No. Código cerrado, sin repositorio público de la app',
            ],
            [
              '<strong>Precio</strong>',
              'Su FAQ dice que Paseo es gratis y open source, y que pones tú las credenciales de los agentes',
              'Gratis durante la beta con Pro incluido, y pones tú las suscripciones de las CLIs',
            ],
            [
              '<strong>Último commit público</strong>',
              '26 de julio de 2026, en un repo con unas 11.400 estrellas',
              'Código cerrado, sin repositorio público',
            ],
          ],
          caption: 'Todos los datos de Paseo se comprobaron el 26 de julio de 2026 en paseo.sh, en el repositorio getpaseo/paseo y en los datos públicos de GitHub. Las filas marcadas como "no documentado" significan que no lo hemos encontrado publicado, no que la función no exista.',
        },
      ],
    },
    {
      id: 'when-paseo',
      title: 'Cuándo Paseo es la mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'Hay un perfil para el que esta comparativa no está ni reñida, y preferimos decírtelo antes de que pierdas la tarde.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres supervisar agentes desde el móvil.</strong> Paseo tiene apps nativas de iOS y Android. CodeAgentSwarm es solo de escritorio, así que aquí no hay nada que comparar.',
            '<strong>Necesitas autoalojarlo.</strong> Paseo es un daemon que levantas en tu portátil, tu VM o tu servidor. Esa es su arquitectura, no un extra.',
            '<strong>El open source es un requisito.</strong> El código está bajo AGPLv3: lo puedes leer y seguir usando pase lo que pase con la empresa. Con nosotros te toca fiarte.',
            '<strong>Te importan la telemetría y los logins obligatorios.</strong> Paseo declara que no tiene ninguna de las dos cosas, respuesta fácil si te lo pregunta compras.',
            '<strong>Usas GitHub Copilot o Pi.</strong> Los dos aparecen en su documentación y ninguno está entre las seis CLIs que movemos.',
            '<strong>Trabajas en Linux.</strong> Paseo publica build de Linux. Nosotros no.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Una prueba rápida: imagínate a veinte minutos de tu mesa con un agente a mitad de tarea. Si esa escena te importa, eso es terreno de Paseo, y por muy pulido que esté un escritorio no lo sustituye.',
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'Cuándo CodeAgentSwarm es la mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'La otra cara es un flujo que ocurre delante del ordenador, en macOS o Windows, donde el cuello de botella no es el acceso sino la atención: demasiados agentes y pocos ojos.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres Antigravity CLI o Kimi Code.</strong> Ninguno aparece entre los agentes que documenta Paseo a 26 de julio de 2026. Nosotros ejecutamos los dos, junto a Claude Code, Codex CLI y OpenCode.',
            '<strong>Quieres un único historial buscable entre proveedores,</strong> con cualquier conversación recuperable en un terminal vivo.',
            '<strong>Quieres que sean los agentes quienes mantengan el tablero.</strong> El kanban lo escriben ellos por MCP mientras trabajan.',
            '<strong>Revisas sobre la marcha.</strong> Los diffs en vivo cazan el desvío durante la tarea, no en la pull request.',
            '<strong>Andas justo de cuota.</strong> El indicador te dice cómo vas antes de que un agente se quede tirado.',
            '<strong>Lo quieres todo en una pantalla,</strong> sin montar un daemon y sus clientes.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Lo de los worktrees merece una nota, porque los dos productos se lo toman en serio y es lo que hace soportable tener agentes en paralelo. Si nunca lo has montado, en <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees para agentes de IA</a> está el patrón explicado al margen de cualquier herramienta. Y si estás en Mac y miras opciones nativas, la comparativa hermana es <a href="/es/guias/conductor-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor vs CodeAgentSwarm</a>.',
        },
      ],
    },
    {
      id: 'use-both',
      title: '¿Puedes usar los dos?',
      content: [
        {
          type: 'paragraph',
          text: 'Sí, y es menos raro de lo que suena, porque ninguno de los dos es proveedor de modelos. Los dos pilotan las CLIs que ya tienes instaladas con tus credenciales, así que Paseo puede llevar las tareas que quieras vigilar desde el móvil y CodeAgentSwarm las sesiones largas de escritorio.',
        },
        {
          type: 'paragraph',
          text: 'Un aviso: no apuntes dos orquestadores al mismo repositorio y la misma rama a la vez. Dale a cada uno su worktree, o su proyecto, y conviven. Si eso te parece más coordinación de la que quieres, quédate con el que encaje con el sitio donde de verdad trabajas.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Paseo es open source?',
      answer: 'Sí. Paseo se desarrolla en abierto en github.com/getpaseo/paseo y su fichero LICENSE sitúa el código bajo AGPLv3, con los componentes de terceros bajo sus licencias originales. A 26 de julio de 2026 el repositorio tenía unas 11.400 estrellas. CodeAgentSwarm, en cambio, es de código cerrado y no tiene repositorio público de la aplicación.',
    },
    {
      question: '¿Puedo supervisar CodeAgentSwarm desde el móvil?',
      answer: 'No. CodeAgentSwarm es una aplicación de escritorio para macOS y Windows, sin app móvil ni cliente remoto. Aquí gana Paseo con claridad: tiene apps nativas de iOS y Android más un cliente web, todos conectados a un daemon que alojas tú, así que puedes lanzar una tarea en tu mesa y seguirla desde cualquier sitio. Si buscas supervisión desde el móvil, elige Paseo.',
    },
    {
      question: '¿Paseo soporta Antigravity CLI o Kimi Code?',
      answer: 'Ninguno de los dos aparece entre los agentes documentados por Paseo a 26 de julio de 2026. Su FAQ menciona Claude Code, Codex, Cursor, OpenCode y Pi, y el README añade GitHub Copilot. CodeAgentSwarm sí soporta Antigravity CLI y Kimi Code, junto a Claude Code, Codex CLI y OpenCode. Paseo anuncia más proveedores en su web, así que revisa su documentación actual.',
    },
    {
      question: '¿Están los dos proyectos mantenidos?',
      answer: 'Paseo lo está de forma verificable: su último commit público en el momento de la comprobación fue del 26 de julio de 2026, el mismo día en que se recogieron estos datos. CodeAgentSwarm también está en desarrollo activo, pero al ser de código cerrado no hay historial público que puedas inspeccionar para confirmarlo por tu cuenta. Esa asimetría cuenta.',
    },
  ],
}

export default guide
