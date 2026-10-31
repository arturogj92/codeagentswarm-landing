import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'mejores-herramientas-agentes-ia-en-paralelo',
    locale: 'es',
    title: 'Las mejores herramientas para ejecutar varios agentes de IA en paralelo (2026)',
    metaTitle: 'Mejores herramientas para agentes de IA en paralelo (2026)',
    metaDescription: 'CodeAgentSwarm, T3 Code, Superset (Paradev), Paseo, Conductor, Claude Squad y más: estrellas, último commit y licencia. Datos verificados el 31 de octubre de 2026.',
    intro: 'Si quieres ejecutar varios agentes de programación con IA a la vez y seguir sabiendo qué hace cada uno, las herramientas hechas para eso son CodeAgentSwarm, T3 Code, Superset, Paseo, Conductor, Vibe Kanban, Claude Squad y Nimbalyst. Son aplicaciones que lanzan y supervisan CLIs de programación como Claude Code, Codex CLI y OpenCode. No son lo mismo que LangGraph, CrewAI o AutoGen, que son librerías para construir sistemas de agentes escribiendo código y no abren un terminal por ti.\n\nAntes de nada, transparencia: nosotros hacemos CodeAgentSwarm, así que somos una de las herramientas de la lista. Justo por eso los criterios son idénticos para todas y nuestras limitaciones están escritas en la misma sección que nuestras ventajas. Los datos de producto, licencia, agentes soportados y GitHub se verificaron el 31 de octubre de 2026 contra la web, la documentación y el repositorio de cada proyecto. Nada de lo que leas aquí viene de la página de marketing de un competidor sin decirlo. La disponibilidad y los agentes compatibles de CodeAgentSwarm se actualizaron el 5 de octubre de 2026.\n\nQué ha cambiado desde agosto: Superset ahora se llama Paradev, Paseo pasó de AGPL-3.0 a Apache 2.0, Conductor y Paradev sacaron app para iPhone, y Vibe Kanban anunció su cierre aunque sigue recibiendo commits de la comunidad.',
    ctaText: 'Si quieres sesiones en paralelo supervisadas con Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI en macOS, Windows o Linux, con notificaciones, historial compartido y un kanban que actualizan los propios agentes, CodeAgentSwarm es gratis durante la beta. Descárgalo y júzgalo con la tabla de arriba delante.',
    ctaAgent: 'comparison',
    highlightedWords: ['agentes de IA', 'paralelo'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'best-tools-to-run-multiple-ai-coding-agents',
  },
  sections: [
    {
      id: 'what-category',
      title: 'Qué es esta categoría y qué no es',
      content: [
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: 'Todas las herramientas de esta guía hacen el mismo trabajo. Lanzan CLIs de programación que ya pagas, ejecutan varios a la vez y te dan un sitio desde el que mirarlos, revisarlos y dirigirlos. Unas se llaman orquestadores, otras planos de control, otras espacios de trabajo o editores. La definición práctica no cambia: el agente sigue siendo Claude Code, Codex CLI u OpenCode, y la herramienta es la capa de alrededor que hace que tener siete funcionando a la vez sea algo que una persona pueda seguir.',
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
          text: 'Si buscas un espacio de escritorio en Windows o Linux que combine Claude Code y Codex, CodeAgentSwarm es una opción: admite diez agentes, estados de sesión, notificaciones, historial con búsqueda y revisión de cambios. Es de código cerrado y gratis con Pro durante la beta abierta; el consumo de los proveedores va aparte. Esta guía la publica su creador. Compara las alternativas según tu plataforma, licencia y forma de trabajar.',
        },
        {
          type: 'paragraph',
          text: 'Aquí no hay un ganador único, y cualquier lista que te dé uno te está vendiendo algo. Lo que te conviene depende de qué restricción pesa más en tu caso: la licencia, la plataforma, dónde quieres estar sentado cuando revisas el trabajo y cuántos agentes ejecutas de verdad a la vez.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres un plano de control open source y sin instalar nada</strong>: T3 Code. Lo puedes probar con <code>npx t3@latest</code> en una máquina donde no está instalado, y su licencia es MIT.',
            '<strong>Trabajas con diez agentes o más y quieres un espacio con forma de IDE</strong>: Superset, que ahora se llama Paradev. Su propuesta es ejecutar muchos agentes en paralelo, un git worktree por tarea, con revisión, un tablero de tareas y planes de pago para equipos.',
            '<strong>Quieres supervisar desde el móvil o alojarlo tú mismo</strong>: Paseo. Funciona con un demonio autoalojado y clientes de escritorio, móvil, web y CLI, tiene apps en la App Store de iOS y en Google Play, y su licencia es Apache 2.0.',
            '<strong>Quieres sandboxes cloud gestionados y colaboración multiplayer</strong>: Conductor. Su app local es solo para macOS, pero sus workspaces cloud siguen ejecutando agentes después de cerrarla.',
            '<strong>Vives en el terminal y quieres tmux y SSH, no una interfaz gráfica</strong>: Claude Squad. Gestiona los agentes como sesiones de tmux, así que funciona por SSH en una máquina sin escritorio.',
            '<strong>Quieres organizar el trabajo en un kanban</strong>: evalúa Vibe Kanban sabiendo que se está cerrando oficialmente y que ahora lo mantiene la comunidad. A finales de octubre de 2026 seguía recibiendo commits.',
            '<strong>Quieres editar visualmente lo que producen los agentes</strong>: Nimbalyst. Se posiciona como editor visual para Claude Code y Codex, tanto para markdown, mockups y diagramas como para código.',
            '<strong>Quieres un escritorio supervisado con varios proveedores, notificaciones, historial compartido y un kanban que actualizan los propios agentes</strong>: CodeAgentSwarm. Diez CLIs en macOS, Windows y Linux, a cambio de ser código cerrado.',
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
          headers: ['Herramienta', 'Estrellas en GitHub (31 oct 2026)', 'Último commit público', 'Plataformas', 'Agentes soportados', 'Open source'],
          rows: [
            [
              'CodeAgentSwarm',
              'Sin repo público',
              'Código cerrado',
              'macOS, Windows y Linux',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI',
              'No, propietaria',
            ],
            [
              'T3 Code',
              'Unas 33.800',
              '31 de octubre de 2026',
              'Escritorio para macOS, Windows y Linux; web; iOS y Android',
              'Claude Code, Codex, Cursor, Grok Build, OpenCode y Antigravity, además de agentes ACP como Pi',
              'Sí, MIT',
            ],
            [
              'Superset (ahora Paradev)',
              'Unas 15.800 (repo ParadevAI/Paradev)',
              '31 de octubre de 2026',
              'macOS; AppImage experimental para Linux; Windows previsto; app para iPhone y iPad con Pro',
              '21 integrados, entre ellos Claude Code, Codex, Antigravity, OpenCode, Kimi Code, Grok, Cursor Agent y Gemini CLI, más cualquier CLI',
              'Código disponible, Elastic License 2.0',
            ],
            [
              'Paseo',
              'Unas 22.600',
              '31 de octubre de 2026',
              'Demonio autoalojado con escritorio para macOS, Windows y Linux, apps para iOS y Android, web y CLI',
              'Claude Code, Codex, OpenCode, Pi, Antigravity y Muse Code de forma nativa, y decenas más por ACP (Copilot, Cursor, Kimi, Grok, Devin)',
              'Sí, Apache 2.0 desde el 27 de agosto de 2026',
            ],
            [
              'Vibe Kanban',
              'Unas 28.500',
              '28 de octubre de 2026',
              'Se ejecuta en local en el navegador (npx), su documentación cubre macOS, Windows y Linux; autoalojable con Docker',
              'Diez, entre ellos Claude Code, Codex, GitHub Copilot, Gemini CLI, Amp, Cursor Agent CLI y OpenCode',
              'Sí, Apache-2.0',
            ],
            [
              'opcode',
              'Unas 22.400',
              '18 de septiembre de 2026, solo el README (último cambio de código el 16 de octubre de 2025)',
              'Builds para macOS y Linux en su última versión, v0.2.0 (31 de agosto de 2025)',
              'Claude Code',
              'Sí, AGPL-3.0',
            ],
            [
              'Claude Squad',
              'Unas 8.700',
              '20 de agosto de 2026',
              'Terminal, basado en tmux, sin interfaz gráfica; macOS y Linux, Windows mediante WSL',
              'Claude Code, Codex, Gemini, Aider y cualquier comando local',
              'Sí, AGPL-3.0',
            ],
            [
              'Nimbalyst',
              'Unas 2.000',
              '31 de octubre de 2026',
              'macOS, Windows y Linux; app para iOS',
              'Claude Code y Codex; OpenCode, Copilot, Grok Build y Cursor Agent en alpha',
              'Sí, MIT',
            ],
            [
              'Conductor',
              'Sin repo público',
              'Sin repo público',
              'App para macOS en local; workspaces gestionados en la nube; app para iOS desde octubre de 2026',
              'Claude Code, Codex, Cursor, OpenCode',
              'No, propietaria',
            ],
          ],
          caption: 'Los datos de producto, licencias y agentes soportados se leyeron de la web, la documentación o el repositorio de cada proyecto el 31 de octubre de 2026. Las estrellas y el último commit de GitHub se comprobaron el mismo día.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Todos los datos de esta tabla se verificaron el 31 de octubre de 2026. Las estrellas se mueven, los repos cambian de nombre o se archivan, los productos se renombran y una herramienta que estaba parada en septiembre puede publicar en octubre. Si una fila está desfasada o mal, dínoslo: la corregimos y ponemos la fecha del cambio.',
        },
        {
          type: 'paragraph',
          text: 'Cuando un proyecto no documenta algo, esta guía dice "no documentado" en lugar de "no". No vamos a afirmar que una herramienta no soporta Linux o no tiene cliente móvil solo porque no lo hayamos encontrado en cinco minutos. Que algo no esté documentado no es lo mismo que no exista, y la diferencia importa cuando lo que escribes está pensado para que lo citen.',
        },
      ],
    },
    {
      id: 'popular-vs-alive',
      title: 'Popular no es lo mismo que vivo',
      content: [
        {
          type: 'paragraph',
          text: 'Las estrellas miden interés acumulado, no el estado del software. Dos ejemplos de la revisión del 31 de octubre. Vibe Kanban tiene unas 28.500 estrellas y commits del 28 de octubre de 2026, pero su README y su web dicen que el proyecto se está cerrando y que seguirá como open source mantenido por la comunidad, como explican en su <a href="https://www.vibekanban.com/blog/shutdown" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">anuncio de cierre</a>. opcode tiene unas 22.400 estrellas, pero su último cambio de código es del 16 de octubre de 2025; desde entonces solo hay una <a href="https://github.com/winfunc/opcode/commit/d1ca30a3c0c39fff01fde2f86c2d5af6a1db658b" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">edición del README</a> del 18 de septiembre de 2026, y su última versión, v0.2.0, es del 31 de agosto de 2025.',
        },
        {
          type: 'paragraph',
          text: 'Las estrellas y las fechas de la tabla se leyeron el 31 de octubre de 2026. Antes de elegir, revisa los cambios recientes, las versiones y las incidencias relevantes para tu flujo de trabajo. La cifra de hoy tampoco será actual el mes que viene.',
        },
        {
          type: 'paragraph',
          text: 'Aquí esto pesa más que en otras categorías de software, por un motivo concreto: los productos que estas herramientas envuelven se mueven por debajo. Claude Code, Codex CLI y el resto cambian flags, formato de salida, estructura de los ficheros de sesión y prompts de permisos en cuestión de semanas. Un envoltorio sin mantenimiento no te avisa de que ha dejado de serlo: sigue funcionando un tiempo, hasta que llega una actualización del CLI y la vista de diffs se queda en blanco, o el resume deja de encontrar conversaciones, y la issue se queda abierta. Antes de casarte con cualquiera de estas herramientas, abre su repositorio y mira la fecha del último commit, no el número de estrellas.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Abre los commits y comprueba qué cambiaron. Contrasta después las versiones y las respuestas a incidencias. Un push o una edición de README no equivale a una nueva versión funcional.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'CodeAgentSwarm: sesiones en paralelo supervisadas con diez CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'Esta es nuestra herramienta, así que lee esta sección sabiéndolo. CodeAgentSwarm es una app de escritorio para macOS, Windows y Linux que ejecuta varios CLIs de programación como terminales independientes en un mismo espacio de trabajo. Eliges el agente terminal a terminal, así que Claude Code puede estar con un refactor en uno mientras Codex CLI escribe tests en otro y OpenCode lee un módulo desconocido en un tercero. Cada terminal es su propio proceso y su propia conversación. No comparten nada entre ellos salvo lo que tú compartas.',
        },
        {
          type: 'video',
          src: '/videos/guides/25-terminals.mp4',
          caption: 'Muchos terminales funcionando a la vez en un mismo espacio de CodeAgentSwarm, cada uno con su agente, su proyecto y su conversación.',
        },
        {
          type: 'paragraph',
          text: 'Las diez CLIs compatibles son Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI. La ventaja está en la profundidad de las integraciones: CodeAgentSwarm entiende las sesiones, permisos y capacidades de cada agente en vez de tratar cada comando como un proceso de terminal intercambiable.',
        },
        {
          type: 'image',
          alt: 'Tablero Kanban actual con columnas Pending, Auto, In Progress, In Testing y Completed',
          src: '/images/guides/task-board-current.webp',
          caption: 'Tareas de ejemplo de tres proyectos, con sus colores y la cola Auto visible.',
        },
        {
          type: 'paragraph',
          text: 'Las funciones que existen porque supervisar varios agentes es más difícil que arrancarlos: notificaciones de escritorio cuando un agente termina o se para a preguntarte algo, diffs de ficheros en vivo por terminal para que los cambios solapados se vean antes de convertirse en conflictos, control de permisos con un modo Turbo que aprueba solo las operaciones seguras y frena las peligrosas, un git worktree por sesión para que dos agentes no se peleen por el mismo árbol de trabajo, y un tablero kanban que actualizan los propios agentes por MCP en vez de que copies tú su estado a mano.',
        },
        {
          type: 'image',
          alt: 'Historial actual con filtros de agente y conversaciones de ejemplo agrupadas por fecha',
          src: '/images/guides/history-browse-current.webp',
          caption: 'Conversaciones de ejemplo de varios proyectos, agrupadas por fecha con indicadores de agente y proyecto.',
        },
        {
          type: 'paragraph',
          text: 'Dos cosas más que merecen nombre propio. El historial de conversaciones es transversal: las sesiones de los diez CLIs caen en un mismo sitio buscable y se pueden retomar desde ahí cuando el agente lo permite, que no es lo mismo que cada CLI guardando su historial en su formato en disco. Y el indicador de cuota lee las ventanas de uso reales de cada proveedor, así que ves qué agente está a punto de quedarse sin presupuesto antes de que se pare a mitad de tarea, y no después.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde gana:</strong>',
        },
        {
          type: 'list',
          items: [
            'Diez CLIs en un mismo espacio, elegidas terminal a terminal, incluidas Cursor Agent, Antigravity CLI, Kimi Code y Grok Build',
            'Notificaciones cuando un agente termina o necesita algo, que es lo que de verdad te deja irte de la ventana',
            'Un solo historial buscable y retomable con todos los agentes, en vez de diez por separado',
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
            'Mobile Connect sigue en alpha. La beta web está disponible para todas las cuentas, el acceso nativo para iOS y Android es bajo petición y el escritorio debe permanecer abierto.',
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
      title: 'T3 Code: el plano de control open source',
      content: [
        {
          type: 'paragraph',
          text: 'T3 Code se define como el plano de control open source para agentes de programación. El repositorio pingdotgg/t3code se creó el 8 de febrero de 2026 y tenía unas 33.800 estrellas el 31 de octubre de 2026, frente a unas 21.100 dos meses antes, con commits y una versión (v0.1.6) ese mismo día. Su README sigue diciendo que el proyecto está en una fase muy temprana.',
        },
        {
          type: 'paragraph',
          text: 'La distribución es la más flexible de todas: npx t3@latest en una máquina sin nada instalado, o la app de escritorio, con winget y Scoop en Windows, un cask de Homebrew en macOS, AUR y Nix en Linux, además de una app web y apps móviles. Según su README a 31 de octubre de 2026 controla Claude Code, Codex, Cursor, Grok Build, OpenCode y Antigravity, y su documentación añade agentes del registro ACP. Ofrece git worktrees, un panel de diffs, terminal y navegador integrados, modo plan, acceso remoto y un camino de Commit, Push y Create PR al terminar una sesión.',
        },
        {
          type: 'paragraph',
          text: 'Su licencia es MIT y es gratis, sin plan de pago; usas tus propias suscripciones. Su acceso remoto T3 Connect es gratis por ahora para hasta tres máquinas. Si estás eligiendo entre las dos, la diferencia honesta es licencia y facilidad de instalación frente a funciones de supervisión, y lo explicamos con calma en <a href="/es/guias/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">nuestra comparativa detallada con T3 Code</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde gana:</strong>',
        },
        {
          type: 'list',
          items: [
            'Licencia MIT y gratis de verdad, con tus propias suscripciones',
            'Se ejecuta con npx sin instalar nada, algo que no ofrece ninguna otra de la lista',
            'Empaquetada para macOS, Windows y Linux, con apps web y móviles',
            'Commit, Push y Create PR en un clic al terminar una sesión',
            'Unas 12.700 estrellas nuevas en dos meses y commits a diario',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde se queda corta:</strong>',
        },
        {
          type: 'list',
          items: [
            'Su README dice que el proyecto está en una fase muy temprana y avisa de que habrá bugs',
            'Kimi Code, Devin CLI y Muse Code no son proveedores integrados; algunos solo están disponibles a través del registro ACP',
            'Un proyecto tan joven se mueve muy rápido, y eso corta por los dos lados',
          ],
        },
      ],
    },
    {
      id: 'superset',
      title: 'Superset (ahora Paradev): un IDE pensado para muchos agentes en paralelo',
      content: [
        {
          type: 'paragraph',
          text: 'Superset cambió su nombre a <a href="https://paradev.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Paradev</a> el 12 de octubre de 2026; el <a href="https://paradev.com/blog" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">anuncio</a> dice que solo cambia el nombre, y superset.sh redirige ahora a paradev.com. Se define como el IDE para agentes en paralelo, con un git worktree por tarea, revisión, pull requests, navegador integrado y automatizaciones. Donde CodeAgentSwarm toma el terminal como unidad y Paseo el dispositivo, Paradev toma el IDE como el sitio donde vives.',
        },
        {
          type: 'paragraph',
          text: 'El repositorio, ahora ParadevAI/Paradev, tenía unas 15.800 estrellas y un commit del 31 de octubre de 2026. Su README da 21 agentes integrados como totalmente soportados, entre ellos Claude Code, Codex, Antigravity, OpenCode, Kimi Code, Grok, Cursor Agent y Gemini CLI, y se puede añadir cualquier CLI como agente propio. La app de escritorio es gratis; Pro cuesta 20 $ por usuario al mes, Team 60 $ y Ultra 200 $. La licencia merece precisión: Elastic License 2.0. El código está en GitHub y lo puedes leer, pero Elastic 2.0 no está aprobada por la OSI, así que lo correcto es decir código disponible y no open source. Si tu empresa tiene política de licencias, esa es la distinción que saldrá en la revisión.',
        },
        {
          type: 'paragraph',
          text: 'Si ejecutar muchos agentes a la vez es la carga que tienes de verdad, esta es una herramienta seria. La comparamos con nuestro espacio de trabajo en <a href="/es/guias/superset-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset vs CodeAgentSwarm</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dónde gana:</strong>',
        },
        {
          type: 'list',
          items: [
            'Pensada para muchos agentes a la vez, con 21 agentes integrados y cualquier CLI como agente propio',
            'Espacio con forma de IDE, con tablero de tareas, medidores de cuota y app para iPhone con Pro',
            'El código está en GitHub y recibe commits de forma activa',
            'Planes para equipos, automatizaciones y workspaces en la nube (beta) para quien trabaja en equipo',
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
            'Todavía no hay versión para Windows; Linux es un AppImage experimental, según su FAQ a 31 de octubre de 2026',
            'Las funciones de equipo y las automatizaciones van en planes de pago, desde 20 $ por usuario al mes',
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
          text: 'Paseo se define como un entorno de desarrollo agéntico, y su parte móvil no es una palabra de marketing. Tiene apps reales en la App Store de iOS y en Google Play, apoyadas en un demonio autoalojado que también sirve a los clientes de escritorio, web y CLI; la app de escritorio arranca el demonio por ti. Esa arquitectura es todo su argumento: los agentes corren en tu máquina y tú los revisas desde donde estés.',
        },
        {
          type: 'paragraph',
          text: 'El repositorio getpaseo/paseo tenía unas 22.600 estrellas y un commit del 31 de octubre de 2026, y desde el 27 de agosto de 2026 su código propio usa licencia <a href="https://github.com/getpaseo/paseo/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Apache 2.0</a>, en lugar de AGPL-3.0. Ejecuta Claude Code, Codex, OpenCode, Pi, Antigravity y Muse Code de forma nativa y decenas más a través de ACP, como Copilot, Cursor, Kimi, Grok y Devin, la lista de agentes publicada más amplia de esta guía. Te da git worktrees, revisión de diffs, salida de los agentes en directo y entrada por voz local, y dice claramente que no tiene telemetría ni login obligatorio.',
        },
        {
          type: 'paragraph',
          text: 'Paseo sigue ganando limpiamente en disponibilidad móvil pública y autoalojamiento. Mobile Connect de CodeAgentSwarm está en alpha, con beta web para todas las cuentas y acceso nativo bajo petición, y el escritorio debe permanecer abierto. Paseo ya publica clientes nativos alrededor de un daemon que alojas tú. El resto del intercambio, sobre todo el comportamiento nativo en Windows y el historial transversal, está en <a href="/es/guias/paseo-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo vs CodeAgentSwarm</a>.',
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
            'Apache 2.0, open source completo',
            'Seis agentes nativos y decenas más por ACP, incluidos todos los CLIs que soportamos',
            'Sin telemetría y sin login obligatorio, según su propia web',
            'Entrada por voz que funciona en local',
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
            'Algunos agentes funcionan con adaptadores ACP y no con la CLI del proveedor; su documentación dice que Antigravity solo funciona en modo de acceso total',
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
          text: 'Conductor es software propietario con una app para macOS, sandboxes gestionados en la nube y, desde octubre de 2026, una app para iOS, para Claude Code, Codex, Cursor y OpenCode. Pro añade workspaces en la nube que siguen funcionando cuando cierras la app, colaboración multijugador para hasta cinco usuarios Pro y una API HTTP en beta; el precio empieza en 0 $ en local y 50 $/mes en Pro. Su documentación de instalación dice que aún no está disponible para Windows ni Linux, y no tiene repositorio público. Comparativa completa en <a href="/es/guias/conductor-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Claude Squad',
          id: 'tool-claude-squad',
        },
        {
          type: 'paragraph',
          text: 'Claude Squad gestiona varios agentes de terminal, como Claude Code, Codex, Gemini y Aider, como sesiones de tmux, y puede lanzar un comando local cualquiera. Tiene licencia AGPL-3.0 y unas 8.700 estrellas a 31 de octubre de 2026. Su último commit y su última versión, v1.0.20, son del 20 de agosto de 2026; en octubre se seguían abriendo incidencias y pull requests. No tiene interfaz gráfica, lo que es una ventaja si quieres usarlo en una máquina remota por SSH y un problema si buscabas diffs y notificaciones en el escritorio. Para los puristas del terminal es la opción más natural. Comparamos los dos enfoques en <a href="/es/guias/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Vibe Kanban',
          id: 'tool-vibe-kanban',
        },
        {
          type: 'paragraph',
          text: 'Vibe Kanban ofrece un flujo de tareas tipo kanban y publica su código con licencia Apache-2.0. Su README y su web dicen que se está cerrando tras el cierre de bloop en abril de 2026 y que seguirá como open source mantenido por la comunidad (<a href="https://www.vibekanban.com/blog/shutdown" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">anuncio</a>). Siguió recibiendo commits hasta el 28 de octubre de 2026, pero su última versión en GitHub es la v0.1.44, del 24 de abril. Revisa las versiones y las incidencias actuales antes de adoptarlo. Más detalle en <a href="/es/guias/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Nimbalyst',
          id: 'tool-nimbalyst',
        },
        {
          type: 'paragraph',
          text: 'Nimbalyst es un espacio de trabajo visual open source para Claude Code y Codex: sesiones en paralelo, revisión de diffs de IA, un kanban de sesiones y edición de markdown, mockups, diagramas y código, con OpenCode, Copilot, Grok Build y Cursor Agent en alpha. La app es MIT y gratuita; el plan de pago Wiki Teams cuesta 20 $ por usuario al mes. El repositorio tenía unas 2.000 estrellas y un commit del 31 de octubre de 2026. Tiene pocas estrellas porque el repositorio es nuevo, no el proyecto: es la herramienta que antes se llamaba Crystal, y el repo antiguo tiene unas 3.100 estrellas. Si tu trabajo con agentes produce documentos y diagramas tan a menudo como código, es la que está pensada para eso. Más en <a href="/es/guias/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'opcode',
          id: 'tool-opcode',
        },
        {
          type: 'paragraph',
          text: 'opcode es una interfaz de escritorio y toolkit para Claude Code con licencia AGPL-3.0, con builds para macOS y Linux en su última versión, v0.2.0, del 31 de agosto de 2025. Su último commit en la rama principal, comprobado el 31 de octubre de 2026, es una <a href="https://github.com/winfunc/opcode/commit/d1ca30a3c0c39fff01fde2f86c2d5af6a1db658b" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">edición del README del 18 de septiembre</a>; el último cambio de código es del 16 de octubre de 2025. Eso no demuestra que su integración con Claude Code haya seguido el ritmo de un año de versiones de Claude Code. Revisa las versiones y los cambios funcionales antes de decidir si te encaja.',
        },
      ],
    },
    {
      id: 'also-worth-knowing',
      title: 'Herramientas pequeñas, cambios de nombre y cierres',
      content: [
        {
          type: 'paragraph',
          text: '<strong>Pane</strong> (runpane.com, ahora publicado por Greenfield, antes Dcouple; repo greenfield-inc/Pane) es un gestor de agentes orientado al terminal, con licencia AGPL-3.0, para Claude Code, Codex, Cursor Agent, Aider o cualquier agente CLI, en macOS, Windows y Linux, con un modo Remote Pane para el móvil. Tenía unas 600 estrellas y una versión (v2.4.212) del 31 de octubre de 2026. Pequeño y con trabajo activo. La combinación de cualquier agente y cualquier sistema operativo es más rara de lo que parece.',
        },
        {
          type: 'paragraph',
          text: '<strong>Parallel Code</strong> (parallelcode.app, repo johannesjo/parallel-code) se describe como el espacio de trabajo open source para programar en paralelo con IA, dando a cada agente su propio git worktree. Es MIT, ejecuta Claude Code, Codex CLI, OpenCode, Copilot CLI y Antigravity CLI, está para macOS y Linux sin versión para Windows todavía, y tenía unas 1.100 estrellas y una versión v5.1.0 del 29 de octubre de 2026. También mantiene una página comparativa de la categoría, que es por donde llega mucha gente a estas herramientas, y por eso importa que los datos de esas páginas sean correctos.',
        },
        {
          type: 'paragraph',
          text: '<strong>Crystal ahora es Nimbalyst.</strong> El repositorio antiguo stravu/crystal (MIT, unas 3.100 estrellas, último commit del 26 de febrero de 2026) lo dice directamente y enlaza a nimbalyst.com. Si encuentras una guía que recomienda Crystal, no está mal, solo está desactualizada. El repositorio actual es nimbalyst/nimbalyst. <strong>Superset ahora es Paradev</strong> por lo mismo: mismo producto, nombre nuevo desde el 12 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: '<strong>Terragon ha cerrado.</strong> terragonlabs.com sirve ahora una página titulada "Terragon Shutdown" sobre su cierre del 9 de febrero de 2026, y el repositorio terragon-labs/terragon-oss describe el producto en pasado: era un orquestador remoto de agentes en segundo plano para ejecutar Claude Code, Codex y otros CLIs de programación en la nube. Aparece en listas antiguas de esta categoría, así que conviene saber por qué ya no es una opción.',
        },
        {
          type: 'paragraph',
          text: '<strong>Los proveedores también ejecutan sesiones en paralelo.</strong> <a href="https://code.claude.com/docs/en/desktop" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code Desktop</a> ejecuta sesiones en paralelo con aislamiento de Git, cada una en su propio worktree, en macOS y Windows, con una beta para Linux. La <a href="https://developers.openai.com/codex/app" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de la app de Codex</a> de OpenAI lleva a la app de escritorio de ChatGPT, que ejecuta proyectos en paralelo en macOS, Windows y Linux y documenta los git worktrees. Dentro de la CLI, Claude Code tiene además los <a href="/es/guias/agent-teams-de-claude-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Agent Teams</a> experimentales. Cada una ejecuta solo el agente de su proveedor. Si usas un único agente, empieza por ahí; las herramientas de esta guía tienen sentido cuando mezclas proveedores.',
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
      question: '¿Qué herramienta permite usar Claude Code y Codex juntos en Windows o Linux?',
      answer: 'CodeAgentSwarm admite ambos agentes en macOS, Windows y Linux. Puedes supervisar sesiones separadas en un espacio y usar Git worktrees para aislar cambios. Es de código cerrado y gratis durante la beta abierta; necesitas tu propio acceso a los proveedores. Compara los datos de plataforma y licencia de la tabla, con sus fechas, antes de elegir una alternativa.',
    },
    {
      question: '¿CodeAgentSwarm es open source?',
      answer: 'No. CodeAgentSwarm es de código cerrado y no hay repositorio público de la app. Es gratis durante la beta, con las funciones Pro incluidas. Si el open source es un requisito, T3 Code (MIT), Paseo (Apache 2.0), Nimbalyst (MIT), Claude Squad (AGPL-3.0) y Vibe Kanban (Apache-2.0) son alternativas open source de la misma categoría, y Superset, ahora Paradev, es código disponible con la Elastic License 2.0.',
    },
    {
      question: '¿Cuáles de estas herramientas se mantienen activamente en 2026?',
      answer: 'Comprobado el 31 de octubre de 2026: Paradev (antes Superset), Paseo, Nimbalyst, Pane y Parallel Code tuvieron commits en la última semana. Vibe Kanban tuvo commits el 28 de octubre, pero anunció oficialmente su cierre y ahora lo mantiene la comunidad. El último commit y la última versión de Claude Squad son del 20 de agosto de 2026. El último cambio de código de opcode es del 16 de octubre de 2025, y desde entonces solo hay una edición del README. CodeAgentSwarm y Conductor no tienen historial público de commits de la aplicación para esta comparativa.',
    },
    {
      question: '¿LangGraph, CrewAI o AutoGen son alternativas a estas herramientas?',
      answer: 'No. LangGraph, CrewAI y AutoGen son frameworks para construir sistemas de agentes escribiendo código: los importas en un programa que escribes tú. Las herramientas de esta guía son aplicaciones que ejecutan y supervisan CLIs de programación como Claude Code y Codex en tu máquina, con diffs, notificaciones y gestión de sesiones. Resuelven problemas distintos y puedes usar las dos cosas a la vez.',
    },
    {
      question: '¿Qué ha pasado con Crystal?',
      answer: 'Crystal pasó a llamarse Nimbalyst. El repositorio antiguo stravu/crystal dice que Crystal ahora es Nimbalyst y enlaza a nimbalyst.com. El repositorio actual es nimbalyst/nimbalyst, con licencia MIT, unas 2.000 estrellas y un commit del 31 de octubre de 2026. Los artículos antiguos que recomiendan Crystal hablan del mismo producto con su nombre anterior.',
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
