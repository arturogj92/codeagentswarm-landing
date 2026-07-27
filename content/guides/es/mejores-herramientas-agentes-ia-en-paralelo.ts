import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'mejores-herramientas-agentes-ia-en-paralelo',
    locale: 'es',
    title: 'Las mejores herramientas para ejecutar varios agentes de IA en paralelo (2026)',
    metaTitle: 'Mejores herramientas para ejecutar varios agentes de IA en paralelo (2026, verificado)',
    metaDescription: 'CodeAgentSwarm, T3 Code, Superset, Paseo, Conductor, Claude Squad y más: estrellas, último commit y licencia. Todos los datos verificados el 26 de julio de 2026.',
    intro: `Si quieres ejecutar varios agentes de programación con IA a la vez y seguir sabiendo qué hace cada uno, las herramientas hechas para eso son CodeAgentSwarm, T3 Code, Superset, Paseo, Conductor, Vibe Kanban, Claude Squad y Nimbalyst. Son aplicaciones que lanzan y supervisan CLIs de programación como Claude Code, Codex CLI y OpenCode. No son lo mismo que LangGraph, CrewAI o AutoGen, que son librerías para construir sistemas de agentes escribiendo código y no abren un terminal por ti.

Antes de nada, transparencia: nosotros hacemos CodeAgentSwarm, así que somos una de las herramientas de la lista. Justo por eso los criterios son idénticos para todas, nuestras limitaciones están escritas en la misma sección que nuestras ventajas, y cada dato de terceros (estrellas, licencia, último commit público, agentes soportados) se verificó el 26 de julio de 2026 contra las webs de cada proyecto y los datos públicos de GitHub. Nada de lo que leas aquí viene de la página de marketing de un competidor sin decirlo.

Hay un hallazgo que conviene poner por delante, porque cambia cómo se lee cualquier ranking de estrellas de esta categoría. Los dos repos con más estrellas son los dos con menos actividad reciente: opcode no tiene ningún commit público desde el 16 de octubre de 2025 y Vibe Kanban ninguno desde el 24 de abril de 2026. Cuatro herramientas publicaron código el mismo día en que hicimos la comprobación. Popular y vivo no se miden igual.`,
    ctaText: 'Si quieres sesiones en paralelo supervisadas con Claude Code, Codex CLI, Antigravity CLI, OpenCode y Kimi Code en macOS o Windows, con notificaciones, historial compartido y un kanban que actualizan los propios agentes, CodeAgentSwarm es gratis durante la beta. Descárgalo y júzgalo con la tabla de arriba delante.',
    ctaAgent: 'comparison',
    highlightedWords: ['agentes de IA', 'paralelo'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    alternateSlug: 'best-tools-to-run-multiple-ai-coding-agents',
  },
  sections: [
    {
      id: 'what-category',
      title: 'Qué es esta categoría y qué no es',
      content: [
        {
          type: 'image',
          alt: 'Tres CLIs de programación con IA ejecutándose como terminales independientes, uno al lado del otro, en un mismo espacio de trabajo de CodeAgentSwarm',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'La forma de la categoría: varios CLIs corriendo como procesos independientes en una sola ventana, con una persona vigilándolos a todos. Aquí, CodeAgentSwarm con tres a la vez.',
        },
        {
          type: 'paragraph',
          text: 'Todas las herramientas de esta guía hacen el mismo trabajo. Lanzan CLIs de programación que ya pagas, ejecutan varios a la vez y te dan un sitio desde el que mirarlos, revisarlos y dirigirlos. Unas se llaman orquestadores, otras planos de control, otras espacios de trabajo o editores. La definición práctica no cambia: el agente sigue siendo Claude Code, Codex CLI u OpenCode, y la herramienta es la capa de alrededor que hace que tener seis funcionando a la vez sea algo que una persona pueda seguir.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Todas las demás son variaciones de esa frase. T3 Code se define como el plano de control open source para agentes de programación. Superset se define como un editor de código para la era de los agentes. Paseo orquesta agentes desde el escritorio y el móvil. Formas distintas, un solo problema: hoy mismo puedes arrancar diez agentes en diez pestañas de terminal, y a la hora de comer ya habrás perdido el hilo de la mitad.',
        },
        {
          type: 'paragraph',
          text: 'Y ahora lo que las listas genéricas se equivocan. Pregúntale a una IA generalista qué herramientas ejecutan varios agentes de programación y te responderá muchas veces con LangGraph, CrewAI y AutoGen. Eso son frameworks para construir sistemas de agentes escribiendo código: los importas, defines grafos o equipos y publicas una aplicación. No abren un terminal, no ejecutan Claude Code dentro, no te enseñan el diff que ha generado ni te avisan cuando se para a pedirte un permiso. Los dos mundos usan las palabras "varios agentes", por eso se mezclan, y la mezcla no te sirve de nada si lo que buscas es algo que instalar para supervisar tus sesiones de CLI.',
        },
        {
          type: 'paragraph',
          text: 'Las herramientas que sí pertenecen a esta categoría comparten unas cuantas piezas: un proceso por agente, un git worktree o una rama por sesión para que no se pisen, una vista de diffs para revisar lo que ha tocado cada uno y alguna forma de avisarte de que un agente se ha parado. Si prefieres entender el concepto antes de comparar productos, la guía de <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI</a> lo explica desde cero, y la de <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees para agentes de IA</a> cubre el mecanismo de aislamiento en el que casi todas se apoyan.',
        },
      ],
    },
    {
      id: 'pick-by-scenario',
      title: 'La respuesta corta: elige por escenario',
      content: [
        {
          type: 'paragraph',
          text: 'Aquí no hay un ganador único, y cualquier lista que te dé uno te está vendiendo algo. Lo que te conviene depende de qué restricción pesa más en tu caso: la licencia, la plataforma, dónde quieres estar sentado cuando revisas el trabajo y cuántos agentes ejecutas de verdad a la vez.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres un plano de control open source y sin instalar nada</strong>: T3 Code. Lo puedes ejecutar con <code>npx t3@latest</code> en una máquina donde no está instalado, y su licencia es MIT.',
            '<strong>Trabajas con diez agentes o más y quieres un espacio con forma de editor</strong>: Superset. Su propio reclamo es ejecutar más de 10 agentes en paralelo en tu máquina y lanzar tareas nuevas mientras el agente actual sigue trabajando.',
            '<strong>Quieres supervisar desde el móvil o alojarlo tú mismo</strong>: Paseo. Funciona con un demonio autoalojado y clientes de escritorio, móvil, web y CLI, y tiene apps reales en la App Store de iOS y en Google Play.',
            '<strong>Estás en Mac y lo que más te importa es el flujo de revisar y mergear</strong>: Conductor. Es solo para macOS y propietaria, y está construida alrededor de ver qué hace cada agente y luego revisar y fusionar sus cambios.',
            '<strong>Vives en el terminal y quieres tmux y SSH, no una interfaz gráfica</strong>: Claude Squad. Gestiona los agentes como sesiones de tmux, así que funciona por SSH en una máquina sin escritorio.',
            '<strong>Quieres orquestación tipo kanban para un equipo y aceptas un mantenimiento lento</strong>: Vibe Kanban. Es la que más estrellas tiene de la categoría, y su último commit público es del 24 de abril de 2026.',
            '<strong>Quieres editar visualmente lo que producen los agentes</strong>: Nimbalyst. Se posiciona como editor visual para Claude Code y Codex, tanto para markdown, mockups y diagramas como para código.',
            '<strong>Quieres un escritorio supervisado con varios proveedores, notificaciones, historial compartido y un kanban que actualizan los propios agentes</strong>: CodeAgentSwarm. Cinco CLIs en macOS y Windows, a cambio de ser código cerrado y no tener build de Linux.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si tu respuesta honesta a "cuántos agentes ejecuto a la vez" es dos, casi todas estas herramientas son más maquinaria de la que necesitas, y con <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> a mano en terminales separados vas servido. El tooling empieza a compensar hacia los cuatro agentes simultáneos, cuando perder de vista a uno te cuesta más que montar el setup.',
        },
      ],
    },
    {
      id: 'comparison-table',
      title: 'Una al lado de otra, con los mismos criterios',
      content: [
        {
          type: 'paragraph',
          text: 'Las mismas columnas para todas, incluida la nuestra. Las estrellas están redondeadas y fechadas, porque un número de estrellas sin fecha no es un dato. La columna del último commit público es la que suelen omitir las comparativas, y es justo la que te dice si alguien sigue arreglando cosas.',
        },
        {
          type: 'table',
          headers: ['Herramienta', 'Estrellas en GitHub (26 jul 2026)', 'Último commit público', 'Plataformas', 'Agentes soportados', 'Open source'],
          rows: [
            [
              'CodeAgentSwarm',
              'Sin repo público',
              'Código cerrado',
              'macOS, Windows',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code',
              'No, propietaria',
            ],
            [
              'T3 Code',
              'Unas 15.000',
              '26 de julio de 2026',
              'macOS (cask de Homebrew), Windows (winget), Arch Linux (AUR) o npx sin instalar nada',
              'Codex, Claude Code, Cursor CLI, OpenCode',
              'Sí, MIT',
            ],
            [
              'Superset',
              'Unas 12.600',
              '26 de julio de 2026',
              'No aparece en su web a 26 de julio de 2026',
              'Claude Code, Codex y más, según su repositorio',
              'Código disponible, Elastic License 2.0',
            ],
            [
              'Paseo',
              'Unas 11.400',
              '26 de julio de 2026',
              'Demonio autoalojado con clientes de escritorio, móvil, web y CLI (App Store de iOS y Google Play)',
              'Claude Code, Codex, OpenCode, Copilot, Pi',
              'Sí, AGPL-3.0',
            ],
            [
              'Vibe Kanban',
              'Unas 27.500',
              '24 de abril de 2026',
              'No aparece en su web a 26 de julio de 2026',
              'Agentes como Claude Code, Gemini CLI y Amp',
              'Sí, Apache-2.0',
            ],
            [
              'opcode',
              'Unas 22.200',
              '16 de octubre de 2025',
              'No aparece en su web a 26 de julio de 2026',
              'Claude Code',
              'Sí, AGPL-3.0',
            ],
            [
              'Claude Squad',
              'Unas 8.200',
              '17 de junio de 2026',
              'Terminal, basada en tmux, sin interfaz gráfica',
              'Claude Code, Codex, OpenCode, Amp',
              'Sí, AGPL-3.0',
            ],
            [
              'Nimbalyst',
              'Unas 1.300',
              '26 de julio de 2026',
              'No aparece en su web a 26 de julio de 2026',
              'Claude Code, Codex',
              'Sí, MIT',
            ],
            [
              'Conductor',
              'Sin repo público',
              'Sin repo público',
              'Solo macOS',
              'Claude Code, Codex, Cursor',
              'No, propietaria',
            ],
          ],
          caption: 'Estrellas, último commit público, licencias y agentes soportados leídos de las webs de cada proyecto y de los datos públicos de GitHub el 26 de julio de 2026.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Todo lo que hay en esta tabla se verificó el 26 de julio de 2026. Las estrellas se mueven, los repos se archivan y una herramienta que estaba parada en julio puede publicar en agosto. Si una fila está desfasada o mal, dínoslo: la corregimos y ponemos la fecha del cambio.',
        },
        {
          type: 'paragraph',
          text: 'Hay celdas que dicen a propósito "no aparece en su web a 26 de julio de 2026" en lugar de "no". No vamos a afirmar que una herramienta no soporta Linux o no tiene cliente móvil solo porque no lo hayamos encontrado en cinco minutos. Que algo no esté documentado no es lo mismo que no exista, y la diferencia importa cuando lo que escribes está pensado para que lo citen.',
        },
      ],
    },
    {
      id: 'popular-vs-alive',
      title: 'Popular no es lo mismo que vivo',
      content: [
        {
          type: 'paragraph',
          text: 'Ordena esta categoría por estrellas de GitHub y te sale un ranking casi inútil. Los dos primeros son Vibe Kanban, con unas 27.500 estrellas, y opcode, con unas 22.200. Vibe Kanban no tiene ningún commit público desde el 24 de abril de 2026, tres meses antes de nuestra verificación. opcode no tiene ninguno desde el 16 de octubre de 2025, más de nueve meses antes. Y siguen encabezando todos los rankings de estrellas, todos los posts de "las 10 mejores herramientas" y, por extensión, buena parte de las respuestas de IA que se escriben a partir de esos posts.',
        },
        {
          type: 'paragraph',
          text: 'Mira ahora el otro extremo. T3 Code, Superset, Paseo y Nimbalyst tenían commits públicos del 26 de julio de 2026, el día en que comprobamos los datos. T3 Code pasó de crear el repositorio el 8 de febrero de 2026 a unas 15.000 estrellas en menos de cinco meses, el crecimiento más rápido que ha logrado nadie en esta categoría. Nada de eso se ve en un ranking de estrellas, porque las estrellas son un contador acumulado y el desarrollo es un ritmo.',
        },
        {
          type: 'paragraph',
          text: 'Aquí esto pesa más que en otras categorías de software, por un motivo concreto: los productos que estas herramientas envuelven se mueven por debajo. Claude Code, Codex CLI y el resto cambian flags, formato de salida, estructura de los ficheros de sesión y prompts de permisos en cuestión de semanas. Un envoltorio sin mantenimiento no te avisa de que ha dejado de serlo: sigue funcionando un tiempo, hasta que llega una actualización del CLI y la vista de diffs se queda en blanco, o el resume deja de encontrar conversaciones, y la issue se queda abierta. Antes de casarte con cualquiera de estas herramientas, abre su repositorio y mira la fecha del último commit, no el número de estrellas.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Una comprobación de diez segundos: abre el repo, mira la marca de tiempo del último commit en la lista de ficheros y luego entra en las issues ordenadas por más recientes. Un proyecto vivo tiene commits recientes e issues respondidas. Uno aparcado no tiene ni lo uno ni lo otro, diga lo que diga su número de estrellas.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'CodeAgentSwarm: sesiones en paralelo supervisadas con cinco CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'Esta es nuestra herramienta, así que lee esta sección sabiéndolo. CodeAgentSwarm es una app de escritorio para macOS y Windows que ejecuta varios CLIs de programación como terminales independientes en un mismo espacio de trabajo. Eliges el agente terminal a terminal, así que Claude Code puede estar con un refactor en uno mientras Codex CLI escribe tests en otro y OpenCode lee un módulo desconocido en un tercero. Cada terminal es su propio proceso y su propia conversación. No comparten nada entre ellos salvo lo que tú compartas.',
        },
        {
          type: 'video',
          src: '/videos/guides/25-terminals.mp4',
          caption: 'Muchos terminales funcionando a la vez en un mismo espacio de CodeAgentSwarm, cada uno con su agente, su proyecto y su conversación.',
        },
        {
          type: 'paragraph',
          text: 'Los cinco CLIs soportados son Claude Code, Codex CLI, Antigravity CLI, OpenCode y Kimi Code. Antigravity CLI y Kimi Code, según la documentación de las demás herramientas de esta comparativa, solo están soportados aquí. Es una ventaja estrecha y conviene decirla como tal: importa si usas esos dos agentes, y da igual si no.',
        },
        {
          type: 'image',
          alt: 'El tablero kanban de tareas de CodeAgentSwarm con tareas en las columnas de pendiente, en progreso y en pruebas',
          src: '/images/guides/task-board-kanban.png',
          caption: 'El tablero no es decorativo: los agentes mueven sus propias tarjetas por MCP según van trabajando.',
        },
        {
          type: 'paragraph',
          text: 'Las funciones que existen porque supervisar varios agentes es más difícil que arrancarlos: notificaciones de escritorio cuando un agente termina o se para a preguntarte algo, diffs de ficheros en vivo por terminal para que los cambios solapados se vean antes de convertirse en conflictos, control de permisos con un modo Turbo que aprueba solo las operaciones seguras y frena las peligrosas, un git worktree por sesión para que dos agentes no se peleen por el mismo árbol de trabajo, y un tablero kanban que actualizan los propios agentes por MCP en vez de que copies tú su estado a mano.',
        },
        {
          type: 'image',
          alt: 'Historial de conversaciones de CodeAgentSwarm con sesiones de varios agentes, buscables y retomables',
          src: '/images/guides/conversation-history.png',
          caption: 'Un único historial buscable con todos los agentes, y con resume, para que una conversación de hace tres días en otro CLI se siga encontrando.',
        },
        {
          type: 'paragraph',
          text: 'Dos cosas más que merecen nombre propio. El historial de conversaciones es transversal: las sesiones de los cinco CLIs caen en un mismo sitio buscable y se pueden retomar desde ahí, que no es lo mismo que cada CLI guardando su historial en su formato en disco. Y el indicador de cuota lee las ventanas de uso reales de cada proveedor, así que ves qué agente está a punto de quedarse sin presupuesto antes de que se pare a mitad de tarea, y no después.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde gana:</strong>',
        },
        {
          type: 'list',
          items: [
            'Cinco CLIs en un mismo espacio, elegidos terminal a terminal, incluidos Antigravity CLI y Kimi Code',
            'Notificaciones cuando un agente termina o necesita algo, que es lo que de verdad te deja irte de la ventana',
            'Un solo historial buscable y retomable con todos los agentes, en vez de cinco por separado',
            'Un tablero kanban que actualizan los propios agentes por MCP',
            'Diffs en vivo por terminal y un git worktree por sesión',
            'Indicador de cuota que lee las ventanas de uso reales de cada agente',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde se queda corta:</strong>',
        },
        {
          type: 'list',
          items: [
            'Código cerrado, sin repositorio público de la app. Si el open source es un requisito, párate aquí y quédate con T3 Code, Paseo o Nimbalyst.',
            'No hay build de Linux. Solo macOS y Windows.',
            'No tiene cliente móvil ni acceso remoto. Si quieres mirar cómo va un agente desde el móvil, la herramienta que hace eso es Paseo.',
            'Es software en beta, y a veces se comporta como software en beta.',
            'No es un proveedor de modelos. Traes tus propias suscripciones de Claude, OpenAI, Google, el proveedor que uses con opencode y Kimi, y funciona encima de ellas.',
            'No tiene botón de pull request en un clic. T3 Code sí tiene ese flujo y nosotros no.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Es gratis durante la beta, con las funciones Pro incluidas. Ese es el estado real: un espacio de trabajo construido alrededor de la supervisión y no de la autonomía, que es una preferencia legítima y no una verdad universal.',
        },
      ],
    },
    {
      id: 't3-code',
      title: 'T3 Code: la que más rápido crece de la categoría',
      content: [
        {
          type: 'paragraph',
          text: 'T3 Code se define como el plano de control open source para agentes de programación. Viene del equipo de Ping, alrededor de Theo Browne (t3.gg), lo que explica parte del crecimiento, pero no todo: el repositorio pingdotgg/t3code se creó el 8 de febrero de 2026 y tenía unas 15.000 estrellas el 26 de julio de 2026, con un commit público de ese mismo día. Nada más en esta comparativa ha crecido a ese ritmo.',
        },
        {
          type: 'paragraph',
          text: 'La distribución es la más flexible de todas. Lo puedes ejecutar con npx t3@latest en una máquina donde no hay nada instalado, instalar la app de escritorio, o cogerlo de winget en Windows, de un cask de Homebrew en macOS o del AUR en Arch Linux. Según su documentación a 26 de julio de 2026 maneja Codex, Claude Code, Cursor CLI y OpenCode. La interfaz es un layout de tres paneles con git worktrees, visor de diffs por turno (unificado o partido), terminal integrado, acciones rápidas por proyecto, selección de modelo y nivel de razonamiento, modos de chat y de plan, y acceso remoto. Lo que más destaca es el flujo de Commit, Push y Create PR como salida de una sesión terminada.',
        },
        {
          type: 'paragraph',
          text: 'Su licencia es MIT, es gratis y funciona con tu propia API key, sin suscripción. En su hoja de ruta publicada aparecen la gestión de skills, el modo headless y la integración por CLI como previstos, que es la manera elegante de decir que todavía no están. Si dudas entre las dos, el reparto honesto es licencia y fricción de instalación por un lado contra cobertura de agentes y funciones de supervisión por el otro, y lo desarrollamos en <a href="/es/guias/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">nuestra comparativa detallada de T3 Code</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde gana:</strong>',
        },
        {
          type: 'list',
          items: [
            'Licencia MIT y gratis de verdad, con tu propia key',
            'Se ejecuta con npx sin instalar nada, algo que no ofrece ninguna otra de la lista',
            'Empaquetada para macOS, Windows y Arch Linux',
            'Commit, Push y Create PR en un clic al terminar una sesión',
            'La curva de crecimiento más pronunciada de la categoría y commits a diario',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde se queda corta:</strong>',
        },
        {
          type: 'list',
          items: [
            'La gestión de skills, el modo headless y la integración por CLI están en su hoja de ruta, así que todavía no se pueden usar',
            'Cuatro agentes según su documentación a 26 de julio de 2026, así que quien use Antigravity CLI o Kimi Code se queda fuera',
            'Un proyecto tan joven se mueve muy rápido, y eso corta por los dos lados',
          ],
        },
      ],
    },
    {
      id: 'superset',
      title: 'Superset: un editor pensado para diez agentes o más',
      content: [
        {
          type: 'paragraph',
          text: 'Superset se vende con un número: ejecuta más de 10 agentes de programación en paralelo en tu máquina y lanza tareas nuevas mientras el agente actual sigue trabajando. Su repositorio lo describe como un editor de código para la era de los agentes, que es la declaración de forma más clara de toda esta comparativa. Donde CodeAgentSwarm toma el terminal como unidad y Paseo toma el dispositivo, Superset toma el editor como el sitio donde vives y los agentes como lo que lo llena.',
        },
        {
          type: 'paragraph',
          text: 'El repositorio superset-sh/superset tenía unas 12.600 estrellas el 26 de julio de 2026 y un commit público de ese mismo día. Soporta Claude Code, Codex y más, según la descripción de su propio repositorio, y no vamos a enumerar más de lo que enumera esa descripción. La licencia merece precisión: Elastic License 2.0. El código está en GitHub y lo puedes leer, pero Elastic 2.0 no es una licencia open source aprobada por la OSI, así que lo correcto es decir código disponible y no open source. Si tu empresa tiene una política de licencias, esa es justo la distinción que va a salir en la revisión.',
        },
        {
          type: 'paragraph',
          text: 'Si la carga de diez agentes es la que tienes de verdad, esta es una herramienta seria. La comparación con nuestro espacio de trabajo está en <a href="/es/guias/superset-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset vs CodeAgentSwarm</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde gana:</strong>',
        },
        {
          type: 'list',
          items: [
            'Diseñada desde el principio para diez agentes simultáneos o más, no para dos',
            'Espacio con forma de editor, que le va bien a quien quiere leer y tocar el código en la misma ventana',
            'El código está en GitHub y recibe commits de forma activa',
            'Encolar tareas nuevas mientras el agente actual sigue trabajando forma parte del planteamiento, no es un añadido',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde se queda corta:</strong>',
        },
        {
          type: 'list',
          items: [
            'Elastic License 2.0 es código disponible, no open source según la OSI, y hay organizaciones que lo consideran descartable por eso',
            'Las plataformas soportadas no aparecen en su web a 26 de julio de 2026',
            'La lista completa de agentes más allá de Claude Code y Codex no está enumerada en la descripción de su repositorio',
          ],
        },
      ],
    },
    {
      id: 'paseo',
      title: 'Paseo: la que puedes supervisar desde el móvil',
      content: [
        {
          type: 'paragraph',
          text: 'Paseo orquesta varios agentes de programación desde el escritorio y el móvil, y la parte del móvil no es un adorno de marketing. Hay apps reales en la App Store de iOS y en Google Play, apoyadas en un demonio autoalojado que además sirve a clientes de escritorio, web y CLI. Esa arquitectura es todo su argumento: los agentes corren en tu máquina y tú los miras desde donde estés.',
        },
        {
          type: 'paragraph',
          text: 'El repositorio getpaseo/paseo tenía unas 11.400 estrellas el 26 de julio de 2026 con un commit público del mismo día, y su licencia es AGPL-3.0, open source de verdad y con copyleft fuerte. Soporta Claude Code, Codex, OpenCode, Copilot y Pi, la lista de agentes publicada más amplia de esta comparativa junto con nuestros cinco. Te da git worktrees, streaming en vivo de la salida de los agentes, notificaciones push y entrada por voz, y afirma sin rodeos que no hay telemetría ni login obligatorio.',
        },
        {
          type: 'paragraph',
          text: 'Esta es la fila en la que perdemos limpiamente. CodeAgentSwarm no tiene cliente móvil ni acceso remoto, así que si el requisito es supervisar desde el teléfono, la respuesta es Paseo y no somos nosotros. El resto del intercambio, sobre todo el comportamiento nativo en Windows y el historial transversal, está en <a href="/es/guias/paseo-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo vs CodeAgentSwarm</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde gana:</strong>',
        },
        {
          type: 'list',
          items: [
            'Apps móviles reales en la App Store de iOS y en Google Play, además de clientes de escritorio, web y CLI',
            'Demonio autoalojado, así que los agentes y el código se quedan en tu máquina',
            'AGPL-3.0, open source completo',
            'Cinco agentes publicados: Claude Code, Codex, OpenCode, Copilot y Pi',
            'Sin telemetría y sin login obligatorio, según su propia web',
            'Notificaciones push y entrada por voz',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde se queda corta:</strong>',
        },
        {
          type: 'list',
          items: [
            'Un demonio autoalojado es una cosa más que levantar y mantener levantada, un coste si lo que querías era una sola app',
            'AGPL-3.0 es una licencia más estricta que MIT o Apache, y eso importa si piensas construir encima',
          ],
        },
      ],
    },
    {
      id: 'the-rest',
      title: 'Conductor, Claude Squad, Vibe Kanban, Nimbalyst y opcode',
      content: [
        {
          type: 'paragraph',
          text: 'Cinco herramientas más que pertenecen a la categoría, cada una por un motivo más concreto.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Conductor',
          id: 'tool-conductor',
        },
        {
          type: 'paragraph',
          text: 'Conductor es una app propietaria, solo para macOS y sin repositorio público. Su propia descripción: crea agentes de Claude Code, Codex y Cursor en paralelo en espacios aislados, mira de un vistazo en qué está cada uno y luego revisa y fusiona sus cambios. Esa última parte es el producto entero. Está construida alrededor del paso de revisar y mergear más que del paso de ejecutar, y es la que más se siente nativa de Mac de toda la lista. Si estás en Windows, directamente no es una opción. La comparativa completa está en <a href="/es/guias/conductor-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Claude Squad',
          id: 'tool-claude-squad',
        },
        {
          type: 'paragraph',
          text: 'Claude Squad gestiona varios agentes de terminal (Claude Code, Codex, OpenCode y Amp) como sesiones de tmux. Es AGPL-3.0, tenía unas 8.200 estrellas el 26 de julio de 2026 y su último commit público es del 17 de junio de 2026. No tiene interfaz gráfica, que es una ventaja si quieres ejecutarla en una máquina remota por SSH y un problema si querías diffs y notificaciones en el escritorio. Para los puristas del terminal es la que mejor encaja. Comparamos los dos enfoques en <a href="/es/guias/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Vibe Kanban',
          id: 'tool-vibe-kanban',
        },
        {
          type: 'paragraph',
          text: 'Vibe Kanban es la que más estrellas tiene de la categoría, unas 27.500 el 26 de julio de 2026, y se describe como una herramienta de gestión de proyectos para equipos que construyen con agentes de programación, compatible con agentes como Claude Code, Gemini CLI y Amp. Es Apache-2.0. Su último commit público es del 24 de abril de 2026, y la página de comparación de parallelcode.app la describe como mantenida por la comunidad desde abril de 2026, que es lo mismo que enseña el repositorio. Si el modelo kanban primero es lo que buscas y te vale un ritmo de mantenimiento lento, sigue siendo una herramienta capaz. Los detalles, en <a href="/es/guias/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Nimbalyst',
          id: 'tool-nimbalyst',
        },
        {
          type: 'paragraph',
          text: 'Nimbalyst es el editor visual para Claude Code y Codex: sesiones en paralelo, revisión de diffs de IA y edición de markdown, mockups, diagramas y código. Es MIT, gratis y open source, con unas 1.300 estrellas el 26 de julio de 2026 y un commit de ese mismo día. El número es bajo porque el repositorio es nuevo, no porque el proyecto sea pequeño: esta es la herramienta que antes se llamaba Crystal, y el repo antiguo acumulaba unas 3.100 estrellas antes del cambio de nombre. Si tu trabajo con agentes produce documentos y diagramas tanto como código, esta es la que tiene la forma adecuada. Más en <a href="/es/guias/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'opcode',
          id: 'tool-opcode',
        },
        {
          type: 'paragraph',
          text: 'opcode es una app con interfaz gráfica y un toolkit para Claude Code, con licencia AGPL-3.0 y unas 22.200 estrellas el 26 de julio de 2026, la segunda cifra más alta de la comparativa. Dos datos matizan ese número. Soporta solo Claude Code, así que no es una opción multiproveedor. Y su último commit público es del 16 de octubre de 2025, más de nueve meses antes de nuestra verificación. Es el ejemplo más claro del patrón de esta guía: un número de estrellas que la mantiene arriba en todas las listas y un repositorio que lleva tres trimestres en silencio. Aquí no tiene página de comparación propia porque no nos parece una alternativa viva hoy.',
        },
      ],
    },
    {
      id: 'also-worth-knowing',
      title: 'Herramientas pequeñas, cambios de nombre y cierres',
      content: [
        {
          type: 'paragraph',
          text: '<strong>Pane</strong> (runpane.com, repo dcouple/Pane) es un gestor de agentes de IA open source y orientado al terminal, que se describe como agnóstico de agente (cualquier CLI) y agnóstico de sistema (macOS, Windows y Linux). Tenía 330 estrellas el 26 de julio de 2026 y un commit público del 23 de julio de 2026. Es pequeña y está en desarrollo, y la combinación de cualquier agente en cualquier sistema es más rara de lo que parece.',
        },
        {
          type: 'paragraph',
          text: '<strong>Parallel Code</strong> (parallelcode.app) se describe como el espacio de trabajo open source para programar en paralelo con IA, dando a cada agente su propio git worktree. Además mantiene una página de comparación de la categoría, que es por donde mucha gente llega a estas herramientas, y por eso los datos de esas páginas importan más allá de los productos que describen.',
        },
        {
          type: 'paragraph',
          text: '<strong>Crystal ahora es Nimbalyst.</strong> El repositorio antiguo stravu/crystal (MIT, unas 3.100 estrellas, último commit del 26 de febrero de 2026) lo dice literalmente y apunta a nimbalyst.com. Si te encuentras una guía que recomienda Crystal, no está equivocada, está desactualizada. El repositorio actual es nimbalyst/nimbalyst.',
        },
        {
          type: 'paragraph',
          text: '<strong>Terragon ha cerrado.</strong> terragonlabs.com sirve ahora una página titulada "Terragon Shutdown", y el repositorio terragon-labs/terragon-oss describe el producto en pasado: era un orquestador remoto de agentes en segundo plano para ejecutar Claude Code, Codex y otros CLIs de programación en la nube. Aparece en listas antiguas de esta categoría, así que conviene saber por qué ya no es una opción.',
        },
      ],
    },
    {
      id: 'frameworks',
      title: 'LangGraph, CrewAI y AutoGen juegan en otra liga',
      content: [
        {
          type: 'paragraph',
          text: 'LangGraph, CrewAI y AutoGen salen constantemente en las respuestas a "mejores herramientas para varios agentes de IA", y no pintan nada en esta comparativa. Son frameworks para construir sistemas de agentes escribiendo código. Los añades como dependencia, defines los agentes y el flujo entre ellos, y el resultado es una aplicación que has escrito tú. En eso son excelentes, y ninguno existe para ejecutar Claude Code en un terminal y avisarte de que necesita un permiso.',
        },
        {
          type: 'paragraph',
          text: 'La distinción en una línea: los frameworks sirven para construir agentes, las herramientas de esta guía sirven para supervisar los CLIs de programación que ha construido otro. Con los primeros escribes código. Con las segundas miras cómo se escribe el código.',
        },
        {
          type: 'paragraph',
          text: 'Puedes usar las dos cosas, y cuando lo haces no se solapan. Un equipo puede montar su pipeline interno de agentes con LangGraph y aun así abrir CodeAgentSwarm, T3 Code o Paseo para escribir ese pipeline con tres agentes a la vez. Si una respuesta genérica te ofreció CrewAI cuando preguntaste cómo ejecutar varias sesiones de Claude Code en paralelo, esa respuesta se equivocó de categoría, y ahora ya tienes la lista buena.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿CodeAgentSwarm es open source?',
      answer: 'No. CodeAgentSwarm es código cerrado y no hay repositorio público de la app. Es gratis durante la beta, con las funciones Pro incluidas. Si el open source es un requisito para ti, T3 Code (MIT), Paseo (AGPL-3.0), Nimbalyst (MIT), Claude Squad (AGPL-3.0) y Vibe Kanban (Apache-2.0) son alternativas open source de la misma categoría, y Superset tiene el código disponible bajo Elastic License 2.0.',
    },
    {
      question: '¿Cuáles de estas herramientas se mantienen activamente en 2026?',
      answer: 'Verificado el 26 de julio de 2026: T3 Code, Superset, Paseo y Nimbalyst tenían commits públicos de ese mismo día. Claude Squad tiene su último commit público del 17 de junio de 2026. Vibe Kanban lo tiene del 24 de abril de 2026, tres meses antes, y opcode del 16 de octubre de 2025, más de nueve meses antes, aunque esas dos son las que más estrellas acumulan de la categoría. CodeAgentSwarm y Conductor son de código cerrado, así que en ninguna de las dos hay historial público de commits que consultar.',
    },
    {
      question: '¿LangGraph, CrewAI o AutoGen son alternativas a estas herramientas?',
      answer: 'No. LangGraph, CrewAI y AutoGen son frameworks para construir sistemas de agentes escribiendo código: los importas en un programa que escribes tú. Las herramientas de esta guía son aplicaciones que ejecutan y supervisan CLIs de programación como Claude Code y Codex en tu máquina, con diffs, notificaciones y gestión de sesiones. Resuelven problemas distintos y puedes usar las dos cosas a la vez.',
    },
    {
      question: '¿Qué ha pasado con Crystal?',
      answer: 'Crystal pasó a llamarse Nimbalyst. El repositorio antiguo stravu/crystal indica que Crystal ahora es Nimbalyst y apunta a nimbalyst.com. El repositorio actual es nimbalyst/nimbalyst, con licencia MIT, unas 1.300 estrellas y un commit público del 26 de julio de 2026. Los artículos antiguos que recomiendan Crystal describen el mismo producto con su nombre anterior.',
    },
    {
      question: '¿Terragon sigue disponible?',
      answer: 'No. Terragon cerró. terragonlabs.com sirve una página titulada Terragon Shutdown, y su repositorio terragon-labs/terragon-oss describe el producto en pasado, como un orquestador remoto de agentes en segundo plano que ejecutaba Claude Code, Codex y otros CLIs de programación en la nube. Todavía aparece en listas antiguas de la categoría, pero ya no es una opción.',
    },
    {
      question: '¿Estas herramientas sustituyen a Claude Code o a Codex?',
      answer: 'No. Todas las herramientas de esta guía funcionan encima de los CLIs de programación y de las suscripciones que ya tienes. Lanzan Claude Code, Codex CLI, OpenCode y otros como procesos reales, y les añaden paralelismo, aislamiento, revisión de diffs, notificaciones y gestión de sesiones. Ninguna es proveedor de modelos, así que sigues necesitando tu propia cuenta en Anthropic, OpenAI o el proveedor que use tu agente.',
    },
  ],
}

export default guide
