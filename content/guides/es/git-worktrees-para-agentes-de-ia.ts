import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'git-worktrees-para-agentes-de-ia',
    locale: 'es',
    title: 'Git worktrees para agentes de IA: da a cada agente su propio checkout',
    metaTitle: 'Git worktrees para agentes de IA: ejecuta varios agentes en un repo (2026)',
    metaDescription: 'Ejecutar varios agentes de IA en un mismo repo hace que se peleen por los mismos archivos. Los git worktrees dan a cada agente su propio checkout. Aquí ves cómo.',
    intro: `Ejecuta más de un agente de código de IA en el mismo repositorio y chocas con un muro enseguida: editan los mismos archivos y se sobrescriben los cambios sin commitear. Claude Code va por la mitad de un refactor, Codex CLI guarda encima de uno de esos archivos, y ahora ninguno de los dos tiene un estado limpio desde el que trabajar.

Los git worktrees son la solución limpia. Un mismo repositorio puede tener varios árboles de trabajo a la vez, cada uno con su propia rama, todos compartiendo un único <code>.git</code>. Dale a cada agente su propio worktree y dejan de pisarse, sin que tengas que clonar el repo cinco veces.

En esta guía explico el problema en concreto, qué es de verdad un git worktree, cómo crear uno a mano y cómo CodeAgentSwarm monta uno por terminal de forma automática, para que un enjambre de agentes en paralelo funcione sin más. Si quieres la vista general de ejecutar varios agentes a la vez, empieza por la introducción al <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>.`,
    ctaText: 'Activa Git Worktree por terminal en CodeAgentSwarm y cada agente tendrá su propio checkout aislado, en su propia rama, sin configuración y sin dejar nada en tu git status.',
    highlightedWords: ['Git worktrees', 'agentes de IA'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'git-worktrees-for-ai-coding-agents',
  },
  sections: [
    {
      id: 'the-problem',
      title: 'El problema: varios agentes, una sola copia de trabajo',
      content: [
        {
          type: 'image',
          alt: 'Nueve terminales de agentes de código de IA ejecutándose en paralelo en un solo workspace de CodeAgentSwarm, cada uno aislado en su propio git worktree',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'Varios agentes ejecutándose en paralelo en una ventana de CodeAgentSwarm. Con un worktree por terminal, cada uno edita su propio checkout en vez de pelearse por uno compartido.',
        },
        {
          type: 'paragraph',
          text: 'Un checkout es el conjunto de archivos que hay ahora mismo en la carpeta de tu proyecto. Cuando un agente trabaja en esa carpeta, todo va bien. El lío empieza en cuanto un segundo agente trabaja en la misma carpeta a la vez. Los dos leen y escriben exactamente los mismos archivos.',
        },
        {
          type: 'paragraph',
          text: 'Imagina que Claude Code está reescribiendo <code>auth.ts</code> y aún no ha hecho commit. En otro terminal, Codex CLI abre el mismo archivo, hace su propia edición y guarda. El trabajo a medias de Claude Code acaba de perderse en parte, y Codex está construyendo sobre un archivo que va a cambiar bajo sus pies. Ninguno de los dos hizo nada mal. Simplemente no pueden ser dueños los dos de una sola copia de trabajo.',
        },
        {
          type: 'paragraph',
          text: 'Esto no es cosa de una herramienta concreta. Ejecutes <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a> u Antigravity CLI, en cuanto dos cualesquiera comparten un checkout y tocan archivos que se solapan, sus cambios sin commitear chocan.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Si tus agentes solo editan archivos distintos, un checkout está bien y no necesitas worktrees. El problema es real cuando los agentes se solapan, o cuando quieres que dos trabajen la misma zona en ramas separadas a la vez.',
        },
        {
          type: 'paragraph',
          text: 'La solución obvia es dar a cada agente su propia carpeta. Podrías clonar el repo varias veces, pero eso es pesado y un desperdicio. Git ya trae una respuesta más ligera de fábrica: los worktrees.',
        },
      ],
    },
    {
      id: 'what-is-a-worktree',
      title: '¿Qué es un git worktree?',
      content: [
        {
          type: 'paragraph',
          text: 'Un repositorio de git tiene exactamente un directorio <code>.git</code>. Ahí vive todo el historial: cada commit, cada rama, el almacén de objetos completo. Un <strong>worktree</strong> es un árbol de trabajo de ese repositorio, una carpeta con los archivos checkouteados, y un repo puede tener más de uno a la vez.',
        },
        {
          type: 'paragraph',
          text: 'Lo importante es que todos los worktrees comparten ese único <code>.git</code>. Hay un solo historial, un solo conjunto de objetos, un solo remoto. Lo que cambia es la copia de trabajo: cada worktree está checkouteado en su propia rama, en su propia carpeta. Así puedes tener <code>main</code> checkouteado en una carpeta y <code>feature-login</code> en otra, una al lado de la otra, respaldadas por el mismo repositorio.',
        },
        {
          type: 'paragraph',
          text: 'El comando para añadir uno es <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktree</a>:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Desde dentro de tu repo, crea un nuevo árbol de trabajo\n# en ../feature-x, checkouteado en una nueva rama feature-x\ngit worktree add ../feature-x -b feature-x',
        },
        {
          type: 'paragraph',
          text: 'Eso te da una segunda carpeta, <code>../feature-x</code>, con los archivos del proyecto checkouteados en una rama <code>feature-x</code> nueva. Edita ahí y no toca para nada tu carpeta original. Cuando terminas, la eliminas:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Lista los worktrees que tiene este repo\ngit worktree list\n\n# Elimina uno cuando hayas terminado con él\ngit worktree remove ../feature-x',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Por qué worktrees y no clones',
          id: 'worktrees-vs-clones',
        },
        {
          type: 'paragraph',
          text: 'Podrías conseguir carpetas aisladas ejecutando <code>git clone</code> varias veces, pero cada clon es una copia completa: su propio <code>.git</code>, su historial duplicado, su remoto que mantener sincronizado y su propio espacio en disco. Los worktrees se saltan todo eso. Comparten el almacén de objetos del único repositorio, así que un worktree nuevo solo cuesta los archivos checkouteados, no otra copia del historial. Para dar a cinco agentes cinco carpetas, esa diferencia suma rápido.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Una regla que conviene saber: dos worktrees no pueden tener checkouteada la misma rama a la vez. Cada worktree necesita su propia rama. Eso es justo lo que quieres para agentes en paralelo de todas formas, una rama por agente, pero conviene saberlo antes de intentar añadir un worktree sobre una rama que ya está checkouteada en otro sitio.',
        },
      ],
    },
    {
      id: 'the-manual-way',
      title: 'A mano: un worktree por agente',
      content: [
        {
          type: 'paragraph',
          text: 'Sabiendo el comando, puedes montar un enjambre aislado a mano. Dale a cada agente su propio worktree en su propia rama, y luego arranca el agente dentro de esa carpeta.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Desde tu repo, un worktree por agente\ngit worktree add ../agente-auth -b agente-auth\ngit worktree add ../agente-tests -b agente-tests\ngit worktree add ../agente-docs -b agente-docs\n\n# Luego arranca un agente en cada carpeta\ncd ../agente-auth && claude\n# (nuevo terminal)\ncd ../agente-tests && codex\n# (nuevo terminal)\ncd ../agente-docs && opencode',
        },
        {
          type: 'paragraph',
          text: 'Ahora cada agente tiene su propio checkout en su propia rama. Todos pueden editar <code>auth.ts</code> si quieren, porque cada uno edita una copia distinta. Nada choca, y fusionas las ramas de vuelta cuando el trabajo está bien.',
        },
        {
          type: 'paragraph',
          text: 'Esto funciona, y si solo levantas un enjambre de vez en cuando es perfectamente razonable. La fricción está en la contabilidad. Creas una carpeta y una rama por agente, recuerdas qué agente está en qué carpeta, limpias los worktrees cuando terminas y mantienes esas carpetas extra fuera de tu editor y de tu git status. Hazlo varias veces al día entre proyectos y el montaje empieza a costar más de lo que ahorra.',
        },
      ],
    },
    {
      id: 'automatic-in-codeagentswarm',
      title: 'Cómo lo hace CodeAgentSwarm automáticamente',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar un enjambre de agentes CLI de IA en un solo sitio. Funciona sobre las CLIs oficiales (Claude Code, Codex CLI, opencode, Antigravity CLI), así que no es un proveedor de modelos, orquesta los agentes que ya usas. Y puede crear un worktree por terminal por ti, así consigues el aislamiento de arriba sin tocar un solo comando de git.',
        },
        {
          type: 'image',
          alt: 'Configuración de sesión por terminal de CodeAgentSwarm con una fila OPTIONS que muestra un interruptor Git Worktree junto a Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Al configurar un terminal, la fila OPTIONS tiene un interruptor Git Worktree. Actívalo y el agente de ese terminal se ejecuta en su propio worktree aislado.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'El interruptor Git Worktree',
          id: 'the-toggle',
        },
        {
          type: 'paragraph',
          text: 'En la configuración de sesión por terminal hay una fila OPTIONS con un interruptor <strong>Git Worktree</strong>. Para los agentes que admiten Modo Turbo se sitúa justo al lado de Turbo; para opencode solo aparece la opción Git Worktree. Actívalo en un terminal y, al lanzarlo, ese agente arranca dentro de su propio worktree en lugar del checkout compartido.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Qué crea',
          id: 'what-it-creates',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación obtiene un worktree en <code>&lt;repoRoot&gt;/.codeagentswarm/worktrees/&lt;slug&gt;/</code>, checkouteado en una nueva rama llamada <code>cas/&lt;slug&gt;</code> partida desde el HEAD local de tu repo. Así el agente arranca justo desde donde estás ahora, en una rama nueva, en una carpeta propia. Es el mismo montaje de <code>git worktree add ... -b ...</code> de arriba, hecho por ti y con un nombre consistente.',
        },
        {
          type: 'paragraph',
          text: 'Para que esos worktrees no ensucien tu repositorio, CodeAgentSwarm añade <code>.codeagentswarm/</code> al <code>.gitignore</code> del repo automáticamente. Las carpetas de los worktrees viven ahí debajo, así que nunca aparecen en tu git status ni acaban en un commit por accidente.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Es a prueba de fallos. Si el directorio no es un repositorio de git, o la creación del worktree falla por lo que sea, el terminal simplemente se abre en el directorio normal. Nunca acabas con un terminal que se niega a arrancar por un problema de git.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Siempre activo y limpieza',
          id: 'always-on-and-cleanup',
        },
        {
          type: 'paragraph',
          text: 'Si quieres que todos los terminales usen un worktree sin marcar la casilla cada vez, hay un ajuste global en Ajustes (<code>alwaysUseWorktree</code>, desactivado por defecto) que lo activa en todos. Y cuando un trabajo está hecho, no tienes que volver a la línea de comandos: desde Ajustes puedes fusionar un worktree de vuelta o eliminarlo.',
        },
        {
          type: 'paragraph',
          text: 'Así todo el ciclo de vida, crear una rama, checkoutear una carpeta aislada, mantenerla fuera de git status, fusionar o eliminar al final, se gestiona en la app. El método manual sigue estando debajo; CodeAgentSwarm solo lo ejecuta por ti en cada terminal.',
        },
        {
          type: 'image',
          alt: 'El panel Git Projects de CodeAgentSwarm agrupando cada repositorio y listando sus git worktrees, cada uno en su propia rama cas/ con una etiqueta WORKTREE y un botón Open',
          src: '/images/guides/git-worktrees-panel.png',
          caption: 'El panel Git Projects agrupa cada repo y lista sus worktrees, cada uno en su rama cas/. Ábrelos, revisa los cambios o fusiónalos y elimínalos desde un solo sitio.',
        },
      ],
    },
    {
      id: 'why-it-unlocks-a-swarm',
      title: 'Por qué esto habilita un enjambre de agentes de verdad',
      content: [
        {
          type: 'paragraph',
          text: 'El aislamiento es lo que convierte "varios terminales abiertos" en un enjambre en el que de verdad puedes confiar. En cuanto cada agente tiene su propio worktree en su propia rama, todos pueden ir a máxima velocidad, sobre partes que se solapan del código, sin un solo choque en el trabajo sin commitear. Dejas de racionar qué agente puede tocar qué archivo.',
        },
        {
          type: 'paragraph',
          text: 'También encaja con cómo revisas el trabajo. Cada agente deja sus cambios en su propia rama <code>cas/&lt;slug&gt;</code>, así que miras cada uno como un diff autocontenido y fusionas los buenos. Nada queda enredado en una copia de trabajo compartida, así que una mala tanda en una rama nunca envenena las demás.',
        },
        {
          type: 'paragraph',
          text: 'Los worktrees son la capa de aislamiento; el resto de CodeAgentSwarm es la capa de visibilidad encima. Sigues teniendo notificaciones de escritorio cuando un agente termina, historial buscable de todos ellos y diffs en vivo por terminal, ahora con la garantía de que los agentes no se están sobrescribiendo por debajo. Si quieres sopesar los worktrees frente a solo cambiar de rama o clonar el repo, la <a href="/es/guias/git-worktree-vs-rama-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">comparativa git worktree vs rama</a> explica cuándo tiene sentido cada uno.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Nuevo en ejecutar varios agentes a la vez? Mira <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> para Claude en concreto, o la guía del <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes opencode</a> si opencode es tu agente principal. Los worktrees se aplican igual a todos.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un git worktree?',
      answer: 'Un git worktree es un árbol de trabajo adicional de un mismo repositorio: una carpeta con archivos checkouteados en su propia rama, respaldada por el mismo .git que el original. Un repo puede tener varios worktrees a la vez, cada uno en una rama distinta, todos compartiendo un solo historial y almacén de objetos. Creas uno con git worktree add <ruta> -b <rama> y lo eliminas con git worktree remove <ruta>.',
    },
    {
      question: '¿Cómo ayudan los git worktrees a ejecutar varios agentes de IA en un repo?',
      answer: 'Ejecutar varios agentes en un checkout hace que lean y escriban los mismos archivos, así que sus cambios sin commitear se sobrescriben. Dale a cada agente su propio worktree en su propia rama y cada uno edita una copia aislada. Pueden trabajar la misma zona del código en paralelo sin choques, y fusionas cada rama de vuelta cuando esté lista.',
    },
    {
      question: '¿Son mejores los git worktrees que clonar el repo para cada agente?',
      answer: 'Para este fin, sí, normalmente. Varios clones cargan cada uno una copia completa del historial, su propio remoto que sincronizar y su propio uso de disco. Los worktrees comparten el único almacén de objetos de un repositorio, así que un worktree nuevo solo cuesta los archivos checkouteados. Consigues el mismo aislamiento de carpetas por una fracción del peso.',
    },
    {
      question: '¿Cómo usa CodeAgentSwarm los git worktrees?',
      answer: 'Cada terminal tiene un interruptor Git Worktree en su fila OPTIONS. Actívalo y ese agente se ejecuta en un worktree en <repoRoot>/.codeagentswarm/worktrees/<slug>/, en una nueva rama cas/<slug> partida desde tu HEAD local. CodeAgentSwarm añade .codeagentswarm/ a tu .gitignore para que quede fuera del git status, y es a prueba de fallos: si la carpeta no es un repo de git, el terminal se abre con normalidad. Un ajuste global puede activar los worktrees en todos los terminales, y puedes fusionar o eliminar un worktree desde Ajustes.',
    },
    {
      question: '¿Siempre necesito worktrees para ejecutar agentes en paralelo?',
      answer: 'No. Si tus agentes solo editan archivos distintos, un checkout compartido funciona bien y Git gestiona los merges. Los worktrees se ganan su sitio cuando los agentes se solapan sobre los mismos archivos, o cuando quieres que dos trabajen la misma zona en ramas separadas a la vez. Ahí es donde el aislamiento total corta los choques antes de que pasen.',
    },
  ],
}

export default guide
