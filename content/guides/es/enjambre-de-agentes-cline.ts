import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-cline',
    locale: 'es',
    title: 'Ejecuta varias sesiones de Cline en paralelo (enjambre de agentes Cline)',
    metaTitle: 'Enjambre de agentes Cline: varias sesiones de Cline CLI',
    metaDescription: 'Usa varias sesiones de Cline CLI a la vez sin que choquen: una carpeta o git worktree por sesión, modelos distintos y un sitio donde ver cuál te espera.',
    intro: 'Una sesión de Cline se sigue sin problema. Tres o cuatro a la vez, cada una con su tarea, ya es otra historia: cuál espera tu aprobación, cuál ha terminado, qué rama ha tocado cada una. En esta guía verás cómo ejecutar Cline en paralelo con terminales normales y con CodeAgentSwarm 2.5.0, donde Cline llega en beta.',
    ctaText: 'Abre una sesión de Cline por tarea en CodeAgentSwarm, dale a cada una su worktree y vuelve solo cuando alguna te necesite.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'cline-agent-swarm',
    relatedSlug: 'como-usar-cline-cli',
    socialImage: '/images/guides/cline-cli-og-es.png',
  },
  sections: [
    {
      id: 'why',
      title: 'Por qué tener varias sesiones de Cline',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'paragraph',
          text: 'Un agente pasa casi todo el tiempo leyendo archivos y esperando al modelo. Mientras una sesión de Cline escribe tests, otra puede arreglar un bug y una tercera puede preparar la documentación. Como Cline te deja elegir proveedor en cada ejecución, también puedes poner un modelo barato en la tarea rutinaria y uno más potente en la difícil.',
        },
        {
          type: 'paragraph',
          text: 'La regla que lo hace seguro: nunca dejes que dos sesiones editen la misma copia de trabajo. Dale a cada una su carpeta o su git worktree.',
        },
      ],
    },
    {
      id: 'plain-terminals',
      title: 'Con terminales normales',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# terminal 1\ncd ~/code/app && cline --worktree "añade tests al módulo de facturación"\n\n# terminal 2\ncd ~/code/app && cline --worktree -m <model-id> "arregla el bug al leer fechas"',
        },
        {
          type: 'paragraph',
          text: `<code>--worktree</code> ejecuta la tarea en un git worktree separado dentro de <code>~/.cline/worktrees/</code>, así que las dos sesiones nunca tocan los archivos de la otra. El resultado lo fusionas tú cuando te convenza. Fuente: ${link('https://docs.cline.bot/cli/cli-reference', 'referencia de Cline CLI')}, consultada el 31 de octubre de 2026.`,
        },
        {
          type: 'paragraph',
          text: 'Funciona, pero tienes que vigilar todas las terminales para saber qué sesión te espera y cuál ha terminado.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Monta un enjambre de Cline en CodeAgentSwarm',
      content: [
        {
          type: 'image',
          src: '/images/guides/workspace-list.webp',
          alt: 'Vista List de CodeAgentSwarm con varias sesiones de agentes, su estado y su actividad actual',
          caption: 'Vista List de CodeAgentSwarm con sesiones de ejemplo. Muestra el espacio de trabajo general, no una configuración solo con Cline.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm reúne todas las sesiones en una ventana. Elige Cline en el selector de agentes para cada sesión que quieras, decide si la quieres en vista CLI o Chat y activa Git Worktree para que tenga su propia rama. Las sesiones de Cline conviven con Claude Code, Codex, OpenCode, Kimi Code, Antigravity, Grok Build, Cursor Agent, Muse Code, Pi, Devin CLI y GitHub Copilot CLI, así que puedes mezclar agentes en el mismo proyecto.',
        },
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Arranque de una sesión de Cline en CodeAgentSwarm con la vista CLI y la opción Git Worktree',
          caption: 'Captura real de la demo de la versión 2.5.0 de CodeAgentSwarm: Cline seleccionado, con las vistas CLI y Chat y debajo las opciones Coordinator y Git Worktree.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            '<strong>Ves quién te necesita</strong>: cada sesión muestra si está trabajando o esperando, y recibes una notificación de escritorio cuando una tarea de Cline termina.',
            '<strong>Revisas los cambios sobre la marcha</strong>: la app sigue los archivos que edita Cline, así que puedes mirar el diff antes de fusionar.',
            '<strong>Apruebas desde un solo sitio</strong>: en el Chat, cada solicitud de permiso aparece en su sesión, con Ask before actions, Auto-accept edits o Full access.',
            '<strong>Controlas el gasto</strong>: el panel de uso muestra lo que ha costado cada sesión de Cline, con los datos de tokens y coste del propio Cline.',
          ],
        },
        {
          type: 'paragraph',
          text: `Más sobre las piezas comunes: ${link('/es/guias/git-worktrees-para-agentes-de-ia', 'git worktrees para agentes de IA')} y ${link('/es/guias/notificaciones-codeagentswarm', 'notificaciones de CodeAgentSwarm')}.`,
        },
      ],
    },
    {
      id: 'isolation',
      title: 'Cómo separa CodeAgentSwarm las sesiones de Cline',
      content: [
        {
          type: 'paragraph',
          text: 'Por defecto, Cline puede compartir un mismo proceso de fondo entre sesiones. CodeAgentSwarm arranca cada sesión de Cline en modo local, de forma que cada una tiene su propio proceso y las herramientas de CodeAgentSwarm siempre saben qué sesión las ha llamado.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cline también tiene sus propios subagentes. Se ejecutan dentro de la sesión que los lanzó, y el historial de conversaciones solo muestra la sesión principal, así que cada fila es algo que puedes retomar.',
        },
      ],
    },
    {
      id: 'tips',
      title: 'Consejos para un enjambre de Cline tranquilo',
      content: [
        {
          type: 'list',
          items: [
            'Una tarea por sesión, escrita para que pueda terminar sin ti: qué cambiar, cómo comprobarlo y cuándo parar.',
            'Arranca las sesiones delicadas en modo plan (<code>-p</code> en la terminal o el selector de modo plan en el Chat) y pasa a act cuando el plan te convenza.',
            'Guarda las reglas comunes en <code>AGENTS.md</code> o en <code>.clinerules/</code> para que todas las sesiones sigan las mismas convenciones.',
            'Limita cuántas sesiones editan código a la vez. Cuatro sesiones bien enfocadas suelen rendir más que diez que no puedes revisar.',
          ],
        },
        {
          type: 'paragraph',
          text: `¿Empiezas con Cline? Lee antes ${link('/es/guias/como-usar-cline-cli', 'cómo instalar y usar Cline CLI')}. Para la visión con todos los agentes, mira ${link('/es/guias/enjambre-de-agentes-cli-ia', 'cómo funciona un enjambre de agentes CLI de IA')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedo ejecutar varias sesiones de Cline CLI a la vez?',
      answer: 'Sí. Cada proceso de cline es independiente. Dale a cada uno su carpeta o su git worktree, por ejemplo con cline --worktree, para que no editen los mismos archivos.',
    },
    {
      question: '¿Qué es un enjambre de agentes Cline?',
      answer: 'Varias sesiones de Cline trabajando en tareas distintas al mismo tiempo, normalmente en worktrees separados, con una persona que revisa y fusiona los resultados.',
    },
    {
      question: '¿Cada sesión de Cline puede usar un modelo distinto?',
      answer: 'Sí. En la terminal pasas -m (y -P para el proveedor) en cada ejecución, y en el Chat de CodeAgentSwarm eliges el modelo por sesión.',
    },
    {
      question: '¿CodeAgentSwarm muestra los límites de uso de Cline?',
      answer: 'Muestra lo que ha gastado cada sesión, con los datos de coste y tokens del propio Cline. Cline no tiene una cuota de cuenta que leer, así que no hay anillo de porcentaje ni presupuesto diario.',
    },
  ],
}

export default guide
