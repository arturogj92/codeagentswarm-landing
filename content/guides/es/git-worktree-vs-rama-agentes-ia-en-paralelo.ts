import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'git-worktree-vs-rama-agentes-ia-en-paralelo',
    locale: 'es',
    title: 'Git worktree vs rama para agentes de IA en paralelo: cuál usar',
    metaTitle: 'Git worktree vs rama: la mejor forma de ejecutar agentes de IA en paralelo (2026)',
    metaDescription: '¿Cambiar de rama, clonar el repo o git worktrees? Aquí ves por qué los worktrees ganan para ejecutar agentes de IA en paralelo, y cuándo basta con una rama.',
    intro: `Si quieres varios agentes de código de IA trabajando a la vez, la pregunta de fondo es de git: ¿cómo consigue cada agente un sitio donde trabajar sin sobrescribir a los demás? Hay tres respuestas honestas. Un solo árbol de trabajo y vas cambiando de rama. Varios clones completos del repo. O git worktrees.

Solo una de ellas deja de verdad que N agentes se ejecuten a la vez de forma limpia, y no es la que la mayoría prueba primero. En esta guía comparo cambiar de rama, varios clones y los worktrees para agentes en paralelo en concreto, con una nota honesta sobre cuándo basta con una rama, y cómo CodeAgentSwarm usa los worktrees por debajo.

Para la explicación desde cero de qué es un worktree y por qué importa el aislamiento, lee primero la guía de <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees para agentes de IA</a>. Esta página es la comparativa.`,
    ctaText: 'Deja de hacer malabares con las ramas. CodeAgentSwarm da a cada terminal su propio worktree en su propia rama con un solo interruptor, así tus agentes van en paralelo sin pisarse.',
    highlightedWords: ['Git worktree vs rama', 'agentes de IA en paralelo'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'git-worktree-vs-branch-parallel-ai-agents',
  },
  sections: [
    {
      id: 'the-real-question',
      title: 'La verdadera pregunta con agentes en paralelo',
      content: [
        {
          type: 'image',
          alt: 'Varios agentes de código de IA ejecutándose en paralelo en un workspace de CodeAgentSwarm, cada uno en su propia rama en su propio git worktree',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'Un enjambre de agentes en paralelo. El montaje de debajo decide si de verdad se ejecutan a la vez o van por turnos peleándose por una sola copia de trabajo.',
        },
        {
          type: 'paragraph',
          text: 'Un solo agente de IA en una sola carpeta nunca tiene este problema. Edita archivos, hace commit, sigue. El problema es enteramente ejecutar más de uno a la vez sobre el mismo repositorio. Cada agente necesita un sitio donde hacer cambios que los demás no estén cambiando también.',
        },
        {
          type: 'paragraph',
          text: 'Hay tres formas de darles ese espacio, y no son iguales para el trabajo en paralelo. Cambiar de rama comparte un solo árbol de trabajo. Varios clones dan a cada agente una copia completa del repo. Los git worktrees dan a cada agente su propio árbol de trabajo sobre un mismo repositorio compartido. Vamos con ellas en ese orden.',
        },
      ],
    },
    {
      id: 'switching-branches',
      title: 'Opción A: un árbol de trabajo, cambiar de rama',
      content: [
        {
          type: 'paragraph',
          text: 'El instinto de mucha gente son las ramas. Haz una rama por tarea, y deja que cada agente trabaje en la suya. Es la idea correcta para mantener el trabajo separado en el historial, pero se rompe en cuanto quieres que los agentes se ejecuten a la vez.',
        },
        {
          type: 'paragraph',
          text: 'La razón es que una rama no es un sitio donde trabajar, es una etiqueta sobre un commit. Sigues teniendo un solo árbol de trabajo, un solo conjunto de archivos en disco. <code>git checkout otra-rama</code> intercambia los archivos de esa única carpeta para que coincidan con la otra rama. Dos agentes en esa carpeta siguen compartiendo exactamente los mismos archivos, por muchas ramas que existan.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Un árbol de trabajo. checkout intercambia sus archivos en el sitio.\ngit checkout -b agente-auth   # la carpeta ahora en agente-auth\n# ...otro agente...\ngit checkout -b agente-tests  # la MISMA carpeta, ahora en agente-tests',
        },
        {
          type: 'paragraph',
          text: 'Así que si dos agentes intentan trabajar a la vez, pasa una de dos cosas. O van por turnos, haciendo checkout, avanzando un poco, commiteando o guardando en stash, y volviendo a hacer checkout, que no es nada en paralelo, es una copia de trabajo compartida a ratos. O los dos editan la carpeta mientras está en una rama y vuelves al choque original, con la confusión añadida de ramas que ya no coinciden con lo que hay en disco.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Las ramas organizan el historial, no te dan workspaces en paralelo. No puedes tener la misma carpeta checkouteada en dos ramas a la vez. Este es justo el hueco que los worktrees existen para llenar.',
        },
      ],
    },
    {
      id: 'multiple-clones',
      title: 'Opción B: un clon completo por agente',
      content: [
        {
          type: 'paragraph',
          text: 'La siguiente idea es dar a cada agente una copia de verdad separada: ejecuta <code>git clone</code> unas cuantas veces y apunta un agente a cada carpeta. Esto sí da aislamiento real. Cada carpeta tiene sus propios archivos, su propia rama, su propio todo, así que los agentes no pueden chocar.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Una copia completa e independiente por agente\ngit clone git@github.com:me/app.git app-auth\ngit clone git@github.com:me/app.git app-tests\ngit clone git@github.com:me/app.git app-docs',
        },
        {
          type: 'paragraph',
          text: 'Funciona, pero es pesado. Cada clon carga una copia completa del historial y del almacén de objetos, un remoto aparte que hacer fetch y push, y su propio espacio en disco. En un repo grande eso es mucha duplicación para lo que intentas hacer. Además ahora mantienes varias copias independientes: traer actualizaciones, mantener los remotos sincronizados y limpiarlos se multiplican por el número de agentes.',
        },
        {
          type: 'paragraph',
          text: 'Para un par de copias de larga vida está bien. Para levantar tres o cuatro workspaces de agente de corta vida varias veces al día, clonar el repo entero cada vez es más maquinaria de la que el trabajo necesita.',
        },
      ],
    },
    {
      id: 'worktrees',
      title: 'Opción C: git worktrees, un solo repo compartido',
      content: [
        {
          type: 'paragraph',
          text: 'Los git worktrees son el camino intermedio que encaja con los agentes en paralelo justo. Un <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">worktree</a> es un árbol de trabajo extra de un repositorio. Sigue habiendo un único <code>.git</code> compartido por todos, pero cada worktree es una carpeta separada checkouteada en su propia rama. Consigues el aislamiento de carpetas real de los clones sin duplicar el historial.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Un repo, varios árboles de trabajo ligeros\ngit worktree add ../agente-auth -b agente-auth\ngit worktree add ../agente-tests -b agente-tests\ngit worktree add ../agente-docs -b agente-docs\n\n# Limpia uno cuando su trabajo esté fusionado\ngit worktree remove ../agente-auth',
        },
        {
          type: 'paragraph',
          text: 'Ahora N agentes pueden ejecutarse de verdad a la vez. Cada uno edita su propio checkout, en su propia rama, así que las ediciones solapadas son imposibles. Como comparten un solo almacén de objetos, un worktree nuevo solo cuesta los archivos checkouteados, no otra copia del repo, así que añadir un agente es barato. Y comparten un remoto y un historial, así que el fetch y el push siguen siendo simples.',
        },
        {
          type: 'paragraph',
          text: 'Esa es toda la razón de ser de los worktrees: varios árboles de trabajo respaldados por un solo repositorio. Es el montaje que se corresponde directamente con "varios agentes, un repo, todos a la vez".',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'La única restricción: dos worktrees no pueden tener checkouteada la misma rama a la vez, así que cada agente necesita su propia rama. Para agentes en paralelo eso no es una limitación, es justo como quieres tenerlos organizados.',
        },
      ],
    },
    {
      id: 'quick-comparison',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Las tres opciones según lo que importa cuando quieres agentes ejecutándose a la vez:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Paralelismo real',
          id: 'compare-parallel',
        },
        {
          type: 'list',
          items: [
            '<strong>Cambiar de rama:</strong> No, un solo árbol de trabajo significa que los agentes van por turnos o chocan',
            '<strong>Varios clones:</strong> Sí, cada carpeta es totalmente independiente',
            '<strong>Worktrees:</strong> Sí, cada agente tiene su propio checkout en su propia rama',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Peso y disco',
          id: 'compare-weight',
        },
        {
          type: 'list',
          items: [
            '<strong>Cambiar de rama:</strong> Lo más ligero, pero no resuelve el problema',
            '<strong>Varios clones:</strong> Pesado, un historial completo y un remoto copiados por agente',
            '<strong>Worktrees:</strong> Ligero, un almacén de objetos compartido, solo los archivos checkouteados por agente',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Remotos e historial',
          id: 'compare-remotes',
        },
        {
          type: 'list',
          items: [
            '<strong>Cambiar de rama:</strong> Uno, pero compartido de forma insegura entre agentes',
            '<strong>Varios clones:</strong> Uno por clon, cada uno con su fetch y su sincronización aparte',
            '<strong>Worktrees:</strong> Un remoto y un historial compartidos por todos los worktrees',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Limpieza',
          id: 'compare-cleanup',
        },
        {
          type: 'list',
          items: [
            '<strong>Cambiar de rama:</strong> Nada que eliminar, pero nada quedó aislado',
            '<strong>Varios clones:</strong> Borrar carpetas enteras, y antes desenredar cualquier estado solo local',
            '<strong>Worktrees:</strong> git worktree remove, un comando por workspace de agente',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Cambiar de rama es la herramienta equivocada para ejecutar agentes a la vez. Varios clones funcionan pero son más pesados de lo que el trabajo necesita. Los worktrees son el encaje: aislamiento real, baratos de añadir, un solo repo que mantener.',
        },
      ],
    },
    {
      id: 'when-a-branch-is-fine',
      title: 'Cuándo basta con una rama',
      content: [
        {
          type: 'paragraph',
          text: 'Nada de esto significa que los worktrees sean siempre la respuesta. Si ejecutas un agente cada vez, una rama por tarea no solo está bien, es lo correcto. Haz una rama, deja que el agente trabaje, haz commit, cambia a la siguiente tarea. No hay choque porque nada más está tocando la carpeta, y consigues todas las ventajas de siempre de las ramas para organizar y revisar el historial.',
        },
        {
          type: 'paragraph',
          text: 'Incluso con varios agentes, si solo editan archivos claramente distintos, un checkout compartido puede aguantar: las ediciones no se solapan, así que nada sobrescribe nada, y Git fusiona limpio. Los worktrees empiezan a importar en concreto cuando los agentes se ejecutan a la vez y pueden tocar los mismos archivos, o cuando quieres que dos trabajen la misma zona en ramas separadas. Tira del aislamiento cuando los choques son reales, no por defecto.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Regla general: un agente cada vez, usa ramas. Varios agentes que puedan solaparse, un worktree para cada uno. La guía del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> cubre el flujo más amplio de ejecutar varios agentes juntos.',
        },
      ],
    },
    {
      id: 'in-codeagentswarm',
      title: 'Cómo usa los worktrees CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar un enjambre de agentes CLI de IA (Claude Code, Codex CLI, opencode, Antigravity CLI) en un solo sitio, y mete la opción de worktree directamente en cada terminal, así nunca ejecutas los comandos tú mismo.',
        },
        {
          type: 'image',
          alt: 'Configuración de sesión por terminal de CodeAgentSwarm con una fila OPTIONS que muestra un interruptor Git Worktree junto a Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'La fila OPTIONS en la configuración de un terminal tiene un interruptor Git Worktree. Actívalo y ese agente se ejecuta aislado en su propia rama.',
        },
        {
          type: 'paragraph',
          text: 'En la configuración de sesión por terminal, la fila OPTIONS tiene un interruptor <strong>Git Worktree</strong> (junto a Turbo para los agentes que lo admiten; para opencode solo aparece Git Worktree). Actívalo y esa conversación obtiene un worktree en <code>&lt;repoRoot&gt;/.codeagentswarm/worktrees/&lt;slug&gt;/</code> en una nueva rama <code>cas/&lt;slug&gt;</code>, partida desde tu HEAD local. Es la Opción C de arriba, un comando por agente, hecho por ti y con un nombre consistente.',
        },
        {
          type: 'paragraph',
          text: 'También te quita el desorden de en medio. CodeAgentSwarm añade <code>.codeagentswarm/</code> a tu <code>.gitignore</code> para que los worktrees nunca aparezcan en git status, y es a prueba de fallos: si la carpeta no es un repo de git, el terminal se abre con normalidad. Un ajuste global puede activar los worktrees en todos los terminales, y puedes fusionar o eliminar un worktree desde Ajustes cuando el trabajo esté hecho. Consigues el paralelismo de los worktrees sin los malabares con las ramas ni la limpieza.',
        },
        {
          type: 'image',
          alt: 'El panel Git Projects de CodeAgentSwarm agrupando cada repositorio y listando sus git worktrees, cada uno en su propia rama cas/ con una etiqueta WORKTREE y un botón Open',
          src: '/images/guides/git-worktrees-panel.png',
          caption: 'CodeAgentSwarm mantiene cada worktree a la vista: el panel Git Projects los agrupa por repo, cada uno en su rama cas/, listos para abrir o fusionar.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Git worktree vs rama: ¿cuál es la diferencia para agentes en paralelo?',
      answer: 'Una rama es una etiqueta sobre un commit; no te da un sitio separado donde trabajar. Con un solo árbol de trabajo, cambiar de rama intercambia los archivos de esa única carpeta, así que dos agentes no pueden usarla los dos a la vez sin chocar o ir por turnos. Un worktree es una carpeta separada de verdad, checkouteada en su propia rama. Para ejecutar agentes a la vez necesitas worktrees (árboles de trabajo separados), no solo ramas separadas.',
    },
    {
      question: '¿Puedo simplemente cambiar de rama para ejecutar varios agentes de IA?',
      answer: 'No para paralelismo real. Cambiar de rama trabaja sobre un solo árbol de trabajo, así que los agentes comparten un conjunto de archivos. O van por turnos haciendo checkout y stash, que no es paralelo, o editan la misma carpeta y se sobrescriben. Para ejecutar varios agentes de verdad a la vez das a cada uno su propio árbol de trabajo, que es lo que dan los worktrees.',
    },
    {
      question: '¿Son mejores los git worktrees que clonar el repo para cada agente?',
      answer: 'Para agentes en paralelo, normalmente sí. Varios clones dan aislamiento real pero cada uno carga una copia completa del historial, su propio remoto que sincronizar y su propio uso de disco. Los worktrees dan el mismo aislamiento de carpetas compartiendo un solo repositorio, así que un worktree nuevo solo cuesta los archivos checkouteados y mantienes un solo remoto e historial. Los clones tienen sentido para copias independientes de larga vida; los worktrees encajan con workspaces de agente de corta vida.',
    },
    {
      question: '¿Cuándo basta con una rama?',
      answer: 'Cuando ejecutas un agente cada vez, o cuando varios agentes solo editan archivos claramente distintos. En esos casos una rama por tarea mantiene el historial organizado y nada choca en el checkout compartido. Los worktrees se ganan su sitio en concreto cuando los agentes se ejecutan a la vez y podrían tocar los mismos archivos.',
    },
    {
      question: '¿Cómo gestiona los worktrees CodeAgentSwarm?',
      answer: 'Cada terminal tiene un interruptor Git Worktree en su fila OPTIONS. Actívalo y ese agente se ejecuta en un worktree en <repoRoot>/.codeagentswarm/worktrees/<slug>/ en una nueva rama cas/<slug> desde tu HEAD local. Añade .codeagentswarm/ a tu .gitignore para que quede fuera del git status, vuelve al directorio normal si la carpeta no es un repo de git, y te deja fusionar o eliminar worktrees desde Ajustes. Un ajuste global puede activarlo en todos los terminales.',
    },
  ],
}

export default guide
