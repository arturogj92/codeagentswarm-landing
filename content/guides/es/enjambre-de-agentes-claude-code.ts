import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-claude-code',
    locale: 'es',
    title: 'Enjambre de agentes Claude Code: ejecuta varios agentes de Claude en paralelo',
    metaTitle: 'Enjambre de agentes Claude Code: varios agentes de Claude en paralelo (2026)',
    metaDescription: 'Un enjambre de agentes Claude ejecuta varias sesiones de Claude Code a la vez. En qué se diferencia de los subagentes, las 3 formas de montarlo y cómo evitar el caos de merges.',
    intro: `Un enjambre de agentes Claude Code no es más que varias sesiones independientes de Claude Code funcionando a la vez, cada una con su tarea. Cada vez que ejecutas <code>claude</code> obtienes un proceso separado con su propia conversación y su propia ventana de contexto, así que nada te impide tener cuatro trabajando en el mismo repositorio.

Lo primero que conviene aclarar: esto no es lo mismo que los subagentes que Claude Code trae de serie. Esos viven dentro de una sesión y comparten su contexto y su consumo. Un enjambre son varias sesiones que no saben nada unas de otras. La diferencia decide cuál te interesa de verdad, así que la primera sección va sobre eso.

Lo segundo es que arrancar los procesos es trivial y supervisarlos no. Tres agentes de Claude terminan en momentos distintos, se paran a pedir permisos distintos y de vez en cuando editan el mismo archivo. En esta guía te cuento las tres formas reales de montar un enjambre, dónde se rompe cada una y cómo evitar que los agentes en paralelo se pisen. Para el mismo montaje con otras CLI, mira la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> o la guía del <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Codex</a>.`,
    ctaText: 'Ejecuta tu enjambre de agentes Claude en CodeAgentSwarm. Varios terminales de Claude Code en una ventana, con notificaciones de escritorio, diffs en vivo y permisos por terminal.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Enjambre de agentes Claude Code', 'varios agentes'],
    publishedAt: '2026-07-31',
    updatedAt: '2026-07-31',
    alternateSlug: 'claude-code-agent-swarm',
  },
  sections: [
    {
      id: 'enjambre-vs-subagentes',
      title: 'Enjambre o subagentes: la distinción que va primero',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando buscas un enjambre de agentes Claude aparecen dos cosas distintas mezcladas. No son intercambiables, y elegir la que no era cuesta mucho tiempo.',
        },
        {
          type: 'table',
          headers: ['', 'Subagentes / agent teams', 'Un enjambre de Claude'],
          rows: [
            ['Qué es', 'Ayudantes lanzados dentro de una sesión de Claude Code', 'Varias sesiones separadas de Claude Code'],
            ['Quién manda', 'Claude los orquesta por ti', 'Tú repartes el trabajo'],
            ['Contexto', 'Compartido con la sesión padre', 'Cada uno el suyo, aislado del resto'],
            ['Duración', 'Efímeros, mueren con la tarea', 'Lo que mantengas la sesión abierta'],
            ['Ideal para', 'Partir una tarea en pasos paralelos', 'Varias tareas sin relación entre sí'],
            ['Mezclar proveedores', 'No, todo Claude', 'Sí, Claude con Codex, opencode y otros'],
          ],
        },
        {
          type: 'paragraph',
          text: 'La regla práctica: si el trabajo es <strong>un problema</strong> que se puede descomponer, usa subagentes y deja que Claude coordine. Si son <strong>varios problemas sin relación</strong>, monta un enjambre para que cada uno tenga su ventana de contexto limpia y no contamine a los demás.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No compiten, se suman. Un terminal de tu enjambre puede estar ejecutando una sesión de Claude que a su vez lanza sus propios subagentes. La <a href="/es/guias/agent-teams-de-claude-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">comparativa con agent teams</a> lo desarrolla.',
        },
      ],
    },
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: sí, y no hay ningún modo especial',
      content: [
        {
          type: 'image',
          alt: 'Varias sesiones independientes de Claude Code funcionando en paralelo dentro de un mismo espacio de trabajo de CodeAgentSwarm',
          src: '/images/guides/multi-terminal.png',
          caption: 'Un enjambre de agentes Claude: varias sesiones independientes de Claude Code una al lado de otra.',
        },
        {
          type: 'paragraph',
          text: 'Una sesión de <a href="https://docs.claude.com/en/docs/claude-code/overview" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> es simplemente un proceso. La arrancas con <code>claude</code>, inicias sesión una vez y a partir de ahí esa sesión tiene su conversación, su ventana de contexto y su directorio de trabajo. Dos sesiones no saben nada la una de la otra.',
        },
        {
          type: 'paragraph',
          text: 'Así que no hay nada que desbloquear. Abre un segundo terminal, ejecuta <code>claude</code> otra vez y ya tienes dos agentes independientes. Uno puede estar migrando un esquema mientras el otro escribe tests. Añade un tercero y un cuarto y tienes un enjambre.',
        },
        {
          type: 'paragraph',
          text: 'Tampoco te limitas a Claude. Como cada agente es su propio proceso, puedes poner Claude Code en unos terminales y Codex CLI u opencode en otros, todos sobre el mismo repositorio, y elegir el agente que mejor encaje con cada tarea.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cada agente usa tu suscripción de Anthropic de forma independiente. No hay plan de enjambre ni recargo por paralelismo. Cuatro agentes durante una hora cuestan aproximadamente lo mismo que un agente durante cuatro horas, solo que terminas antes. Lo que sí consumes más rápido es tu límite de uso, que es el techo real del tamaño del enjambre.',
        },
      ],
    },
    {
      id: 'metodo-pestanas',
      title: 'Método 1: varias pestañas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'Lo evidente. Abres varias pestañas, entras en tu proyecto en cada una y arrancas Claude Code. Nada que instalar.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1\ncd ~/mi-proyecto\nclaude\n\n# Pestaña 2\ncd ~/mi-proyecto\nclaude\n\n# Pestaña 3\ncd ~/mi-proyecto\nclaude',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es un agente independiente. Le das una tarea distinta a cada uno y vas cambiando entre ellas mientras trabajan.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A favor',
          id: 'pestanas-pros',
        },
        {
          type: 'list',
          items: [
            'Gratis, no hay nada que instalar además de Claude Code',
            'Funciona al instante con el terminal que ya tienes',
            'Fácil de razonar: una pestaña, un agente',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'En contra',
          id: 'pestanas-cons',
        },
        {
          type: 'list',
          items: [
            'Todas las pestañas se llaman igual, así que pierdes la pista enseguida',
            'Ninguna notificación cuando un agente termina o se para a pedir permiso',
            'Hay agentes parados esperando un sí que no has visto',
            'No hay vista conjunta, tienes que entrar en cada pestaña',
            'No puedes buscar en el historial de varios agentes a la vez',
            'Si dos agentes editan el mismo archivo, el lío es tuyo',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para dos agentes va bien. A partir de ahí, el rato que pasas buscando la pestaña bloqueada se come la velocidad que ganaste al paralelizar. La guía de <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">varias sesiones de Claude Code</a> entra en más detalle.',
        },
      ],
    },
    {
      id: 'metodo-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si vives en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> divide una ventana en paneles y mantiene las sesiones vivas en segundo plano, así ves varios agentes a la vez sin saltar de pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Nueva sesión de tmux\ntmux new-session -s enjambre-claude\n\n# Dividir en horizontal\ntmux split-window -h\n\n# Dividir el panel derecho en vertical\ntmux split-window -v\n\n# Ya tienes 3 paneles: ejecuta claude en cada uno',
        },
        {
          type: 'paragraph',
          text: 'tmux además permite desconectar y volver a conectar, así que los agentes siguen funcionando aunque cierres la ventana. Muy útil para refactors largos.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A favor',
          id: 'tmux-pros',
        },
        {
          type: 'list',
          items: [
            'Gratis y disponible en casi cualquier máquina Unix',
            'Varios paneles a la vista, sin cambiar de pestaña',
            'Las sesiones sobreviven a las desconexiones',
            'Se puede scriptar una distribución de enjambre reutilizable',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'En contra',
          id: 'tmux-cons',
        },
        {
          type: 'list',
          items: [
            'Curva de aprendizaje real si nunca has usado tmux',
            'Sigue sin haber notificación cuando un agente termina o pide permiso',
            'No hay historial buscable entre agentes',
            'Los paneles de texto se quedan pequeños con tres o cuatro agentes',
            'Ni tablero de tareas ni capa de organización',
            'Los conflictos de archivos entre agentes siguen siendo cosa tuya',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es un multiplexor excelente que nunca se diseñó para supervisar agentes de IA. En cuanto un agente del panel 3 se para a pedir permiso mientras tú lees el panel 1, notas el hueco.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio hecha justo para esto: ejecutar y supervisar un enjambre de agentes CLI en un solo sitio. Funciona en macOS y Windows, te da varios terminales en un mismo espacio de trabajo y te deja elegir el agente por terminal. Para un enjambre de Claude eliges "claude code" en el selector SELECT AI AGENT de cada terminal.',
        },
        {
          type: 'image',
          alt: 'Selector SELECT AI AGENT de CodeAgentSwarm mostrando las opciones claude code, codex cli y opencode junto al interruptor de Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Eliges el agente por terminal. Pon todos en claude code para un enjambre puro de Claude, o mezcla agentes donde encajen mejor.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio cuando un agente te necesita',
          id: 'notificaciones',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que más arregla un enjambre. Cuando un agente de Claude termina o se para a pedir permiso, recibes una notificación nativa del sistema. Dejas de vigilar paneles y son los agentes los que te llaman, que es justo el sentido de ejecutarlos en paralelo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Títulos dinámicos en vez de seis pestañas idénticas',
          id: 'titulos-dinamicos',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su título con lo que su agente está haciendo ahora mismo. En lugar de pestañas todas llamadas "claude", lees "Migrando el esquema de usuarios", "Escribiendo tests de la API", "Refactorizando auth", y ves el estado del enjambre de un vistazo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'diffs',
        },
        {
          type: 'paragraph',
          text: 'Ves en tiempo real los cambios que hace cada agente, por terminal y a nivel de proyecto. Cuando dos agentes tocan el mismo archivo lo ves mientras pasa, en lugar de descubrirlo en un diff doloroso más tarde. Es la función que más importa según crece el enjambre.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial buscable de todos los agentes',
          id: 'historial',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación de cada terminal se guarda y se puede buscar, incluso entre agentes de proveedores distintos. Puedes encontrar qué decidió un agente ayer, retomarlo o rastrear qué agente hizo un cambio concreto. La <a href="/es/guias/guia-completa-historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Claude Code</a> explica cómo se guardan las sesiones por debajo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode con permisos por terminal',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Claude Code puede saltarse las peticiones de permiso con <code>--dangerously-skip-permissions</code>, que es lo que hace que un enjambre fluya sin interrupciones constantes y también lo que lo vuelve peligroso. CodeAgentSwarm envuelve eso en Turbo Mode con permisos por terminal, así dejas correr solos a los agentes seguros y sigues controlando a los que tocan código de producción. La <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode</a> cuenta los riesgos sin adornos.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un tablero de tareas que actualizan los propios agentes',
          id: 'tablero',
        },
        {
          type: 'paragraph',
          text: 'Un tablero kanban se sitúa junto a los terminales y los agentes mueven sus propias tarjetas por MCP. Creas tareas, se las asignas a terminales y miras el tablero en vez de llevar el plan en la cabeza.',
        },
      ],
    },
    {
      id: 'evitar-conflictos',
      title: 'Que el enjambre no acabe en un caos de merges',
      content: [
        {
          type: 'paragraph',
          text: 'El fallo del que nadie te avisa no es que se caiga un agente. Es que tres agentes editen el mismo archivo pisándose entre ellos, y solo te enteras cuando revientan los tests. Dos defensas prácticas:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dale a cada agente su propio git worktree',
          id: 'worktrees',
        },
        {
          type: 'paragraph',
          text: 'Un worktree de git es un segundo checkout del mismo repositorio en su propia rama y su propio directorio. Le das uno a cada agente y físicamente no pueden tocar los archivos de los demás. Al final haces merge como con cualquier rama.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Un worktree por agente, cada uno en su rama\ngit worktree add ../proy-auth  -b feature/auth\ngit worktree add ../proy-tests -b feature/tests\n\n# Y arrancas un agente en cada directorio\ncd ../proy-auth && claude',
        },
        {
          type: 'paragraph',
          text: 'Es lo más efectivo que puedes hacer en un enjambre de más de dos agentes. La <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de worktrees</a> explica el flujo, y <a href="/es/guias/git-worktree-vs-rama-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">worktree o rama</a> aclara cuándo basta con una rama normal.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Reparte por módulo, no por capa',
          id: 'repartir-por-modulo',
        },
        {
          type: 'paragraph',
          text: 'Si tienes que compartir un solo checkout, asigna a cada agente un directorio en vez de un rol. "El agente 1 lleva /auth y el agente 2 lleva /billing" casi no produce colisiones. "El agente 1 escribe el código y el agente 2 los tests" produce colisiones todo el rato, porque los dos necesitan los mismos archivos.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'No ejecutes varios agentes en full-auto sobre un checkout compartido sin worktrees. Funciona hasta que dos de ellos refactorizan el mismo módulo, y entonces tardas más en reconciliar el desastre de lo que ganaste paralelizando.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'table',
          headers: ['', 'Pestañas', 'tmux', 'CodeAgentSwarm'],
          rows: [
            ['Coste', 'Gratis', 'Gratis', 'Plan gratuito, Pro para lo avanzado'],
            ['Configuración', 'Ninguna', '10-30 min de aprendizaje', 'Un par de minutos'],
            ['Notificaciones', 'Ninguna', 'Ninguna', 'Nativas de escritorio'],
            ['Historial', 'Se pierde con la pestaña', 'Sin búsqueda', 'Guardado y buscable'],
            ['Diffs en vivo', 'No', 'No', 'Por terminal, en tiempo real'],
            ['Control de permisos', 'Todo o nada', 'Todo o nada', 'Por terminal'],
            ['Curva de aprendizaje', 'Ninguna', 'De media a alta', 'Baja'],
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Si nunca vas a necesitar más de dos agentes de Claude, las pestañas van perfectas y no deberías instalar nada. Si ya vives en tmux, meter sesiones de Claude en tus paneles es lo natural. En cuanto ejecutas tres o más agentes de forma habitual y quieres ver qué hace cada uno sin ir clicando, CodeAgentSwarm te quita el coste de coordinación que las otras dos opciones te dejan encima.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un enjambre de agentes Claude Code?',
      answer: 'Un enjambre de agentes Claude Code son varias sesiones independientes de Claude Code ejecutándose en paralelo en lugar de una detrás de otra. Cada sesión es su propio proceso, con su conversación y su ventana de contexto, así que pueden trabajar en tareas distintas del mismo repositorio a la vez. No es una función de Claude que actives, sino una forma de trabajar que puedes montar con pestañas, tmux o una herramienta como CodeAgentSwarm.',
    },
    {
      question: '¿Un enjambre de Claude es lo mismo que los subagentes o los agent teams?',
      answer: 'No. Los subagentes y los agent teams son ayudantes que se lanzan dentro de una sola sesión de Claude Code, comparten su contexto y su consumo, y los orquesta Claude para partir una tarea. Un enjambre son varias sesiones completamente separadas, con contexto aislado, a las que repartes el trabajo tú. Usa subagentes para un problema que se descompone y un enjambre para varios problemas sin relación. Se combinan sin problema: cualquier terminal de tu enjambre puede ejecutar una sesión que use subagentes.',
    },
    {
      question: '¿Cuántos agentes de Claude Code puedo ejecutar a la vez?',
      answer: 'Claude Code no impone un límite, así que los topes técnicos son la memoria de tu máquina y tu límite de uso de Anthropic, que varios agentes en paralelo consumen bastante más rápido que uno solo. En la práctica te topas antes con otro techo: a partir de tres o cuatro agentes el cuello de botella suele ser tu propia atención, porque cada agente que se para a pedir permiso está esperándote a ti. Ese es justo el límite que empujan las notificaciones y los permisos por terminal.',
    },
    {
      question: '¿Ejecutar un enjambre de Claude cuesta más?',
      answer: 'No hay recargo por paralelizar. Cada agente usa tu suscripción de Anthropic y pagas por el trabajo que hace cada uno, igual que si los ejecutaras en serie. Hacerlo a la vez termina antes, no cambia el coste por agente. Lo que sí hace es agotar los límites de uso más rápido, que es la restricción de verdad.',
    },
    {
      question: '¿Cómo evito que agentes de Claude en paralelo se sobrescriban?',
      answer: 'Dale a cada agente su propio git worktree, que es un checkout separado en su propia rama, para que físicamente no puedan tocar los mismos archivos y al final hagas merge como con ramas normales. Si compartes un solo checkout, asigna a cada agente un directorio en vez de un rol, porque repartir por módulo produce muchísimas menos colisiones que separar código de tests. Los diffs en vivo por terminal también te permiten pillar un solape mientras ocurre en vez de después.',
    },
    {
      question: '¿Puedo mezclar Claude Code con Codex u opencode en un mismo enjambre?',
      answer: 'Sí. Cada agente es un proceso separado, así que puedes ejecutar Claude Code en unos terminales y Codex CLI, opencode o Kimi Code en otros, todos sobre el mismo proyecto. En CodeAgentSwarm eliges el agente por terminal, así que el enjambre mixto es lo normal y no un apaño.',
    },
  ],
}

export default guide
