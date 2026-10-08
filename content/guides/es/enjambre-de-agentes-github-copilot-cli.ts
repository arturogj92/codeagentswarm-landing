import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-github-copilot-cli',
    locale: 'es',
    title: 'Ejecuta varias sesiones de GitHub Copilot CLI en paralelo',
    metaTitle: 'Enjambre de agentes GitHub Copilot CLI: sesiones en paralelo',
    metaDescription: 'Ejecuta varias sesiones de GitHub Copilot CLI a la vez, una por proyecto o git worktree. En qué se diferencia de /fleet y /delegate y cómo vigilar tus créditos.',
    intro: `Puedes abrir tantas sesiones de <code>copilot</code> como quieras, cada una en su terminal y en su carpeta. Copilot también trae dos formas de trabajar en paralelo desde dentro de una sesión: <code>/fleet</code> lanza subagentes y <code>/delegate</code> pasa una tarea al agente en la nube de GitHub. En esta guía verás cuándo encaja cada una, cómo evitar que dos sesiones toquen los mismos archivos y por qué los créditos de IA del mes importan más cuando tienes varias sesiones a la vez. Si todavía no has instalado Copilot CLI, empieza por ${link('/es/guias/como-usar-github-copilot-cli', 'cómo instalar y usar GitHub Copilot CLI')}.`,
    ctaText: 'Abre una sesión de GitHub Copilot CLI por worktree en CodeAgentSwarm y recibe un aviso cuando cada una termine o necesite tu aprobación.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-agent-swarm',
    relatedSlug: 'github-copilot-cli-modelos-creditos-ia',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'Sí, puedes tener varias sesiones de Copilot CLI a la vez',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: 'Cada vez que ejecutas <code>copilot</code> arrancas una sesión distinta, con su conversación, su modelo y su carpeta de trabajo. Copilot la guarda en <code>~/.copilot/session-state/&lt;id&gt;/</code>, así que dos sesiones nunca comparten contexto. Abre otra terminal, vuelve a ejecutar <code>copilot</code> y ya tienes dos agentes trabajando al mismo tiempo.',
        },
        {
          type: 'paragraph',
          text: 'Es la forma más sencilla de montar un enjambre de Copilot. GitHub también ofrece dos opciones propias que funcionan desde dentro de una sola sesión. En la siguiente sección comparamos las tres.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'El soporte de GitHub Copilot CLI en CodeAgentSwarm llega en la versión siguiente a la 2.4.3. Lo que cuenta esta guía sobre la app sale de una versión de desarrollo.',
        },
      ],
    },
    {
      id: 'sesiones-fleet-delegate',
      title: 'Sesiones separadas, /fleet y /delegate',
      content: [
        {
          type: 'table',
          headers: ['Opción', 'Dónde se ejecuta el trabajo', 'Para qué sirve'],
          rows: [
            ['Varias sesiones de <code>copilot</code>', 'En tu equipo, un proceso por terminal, cada uno en su carpeta', 'Tareas independientes que quieres seguir y revisar una a una'],
            ['<code>/fleet</code> o <code>--fleet</code>', 'Dentro de una sesión: el agente principal divide el mensaje y lanza subagentes en paralelo', 'Una tarea que se puede partir en piezas independientes'],
            ['<code>/delegate</code> o el prefijo <code>&amp;</code>', 'El agente en la nube de Copilot en GitHub, en una rama nueva con un pull request en borrador', 'Trabajo que delegas y revisas más tarde como pull request'],
          ],
          caption: 'Fuentes: páginas de GitHub Docs sobre /fleet y /delegate, revisadas el 8 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: `Con ${link('https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet', '/fleet')}, el agente principal decide si el mensaje se puede dividir y coordina a los subagentes. GitHub avisa de que los subagentes usan por defecto un modelo de bajo coste y de que repartir el trabajo así puede gastar más créditos de IA que dejar que lo haga el agente principal. <code>/tasks</code> muestra las subtareas mientras se ejecutan. También puedes arrancar una sesión en modo fleet desde la línea de comandos:`,
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --fleet -p "Refactoriza el paquete utils y actualiza todo lo que lo usa" --allow-tool write',
        },
        {
          type: 'paragraph',
          text: `${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca', '/delegate')} manda la tarea a la nube. Copilot te ofrece guardar los cambios sin preparar como punto de control en una rama nueva, y luego el agente en la nube abre un pull request en borrador, trabaja en segundo plano y te pide revisión. Sigue trabajando aunque apagues el ordenador.`,
        },
        {
          type: 'paragraph',
          text: 'Estas opciones se pueden combinar. Los subagentes de <code>/fleet</code> viven dentro de su sesión, así que cualquier sesión de tu enjambre puede usar <code>/fleet</code>. Las sesiones separadas son la mejor opción cuando las tareas no tienen nada que ver entre sí y quieres ver cómo termina cada una por su cuenta.',
        },
      ],
    },
    {
      id: 'a-mano',
      title: 'Hacerlo a mano con pestañas de terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Sin herramientas extra, crea un git worktree por tarea y arranca una sesión con nombre en cada uno:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# un worktree por tarea\ngit worktree add ../app-auth -b feat/auth\ngit worktree add ../app-tests -b chore/tests\n\n# pestaña 1\ncd ../app-auth && copilot -n auth\n\n# pestaña 2\ncd ../app-tests && copilot -n tests\n\n# más tarde, retoma una sesión por su nombre\ncopilot --resume auth',
        },
        {
          type: 'paragraph',
          text: 'La primera vez que Copilot se abre en una carpeta nueva te pregunta si confías en ella, así que verás esa pregunta una vez por worktree. Después, las pestañas funcionan, pero el trabajo extra crece con cada sesión que añades:',
        },
        {
          type: 'list',
          items: [
            'Nadie te avisa cuando una sesión termina o se para a pedir aprobación.',
            'Las pestañas se parecen mucho, así que vas pinchando una a una hasta dar con la que espera.',
            'Para buscar en conversaciones antiguas tienes que revisar <code>~/.copilot/session-state</code> carpeta por carpeta.',
            'Tus otros agentes, como Claude Code o Codex, están en otras ventanas.',
          ],
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'El enjambre en CodeAgentSwarm',
      content: [
        {
          type: 'image',
          src: '/images/guides/workspace-list.webp',
          alt: 'Vista de lista de CodeAgentSwarm con varias sesiones de agentes, su estado y su actividad',
          caption: 'Vista de lista de CodeAgentSwarm con sesiones de ejemplo. Muestra el espacio de trabajo general, no una configuración solo con Copilot.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm reúne todas las sesiones en una ventana. Elige GitHub Copilot CLI en el selector de agentes para cada sesión que quieras y abre cada una en su propio proyecto o git worktree. Las sesiones de Copilot conviven con Claude Code, Codex, OpenCode, Kimi Code, Antigravity, Grok Build, Cursor Agent, Pi, Devin CLI y Muse Code.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cuadrícula, pestañas o lista',
          id: 'cuadricula-pestanas-lista',
        },
        {
          type: 'paragraph',
          text: 'La cuadrícula muestra varias sesiones una al lado de otra. Las pestañas dan a cada una toda la ventana. La lista enseña cada sesión como una fila con su agente, su estado y su actividad actual, y es la forma más rápida de repasar un enjambre grande.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Avisos y estado por sesión',
          id: 'avisos-estado',
        },
        {
          type: 'paragraph',
          text: `Cada sesión de Copilot tiene su propio estado, y recibes una notificación de escritorio cuando una termina o te espera. Dejas de revisar pestañas y vuelves solo cuando una sesión te necesita de verdad. Lo tienes explicado en ${link('/es/guias/notificaciones-codeagentswarm', 'notificaciones de CodeAgentSwarm')}.`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Chat o terminal en cada sesión',
          id: 'chat-o-terminal',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-chat-real.webp',
          alt: 'GitHub Copilot CLI respondiendo en Chat de CodeAgentSwarm',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm: respuesta de GitHub Copilot CLI 1.0.93 a un mensaje de prueba.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Chat habla con Copilot a través de su servidor ACP, con el selector de modelo, los modos Agent, Plan y Autopilot y las solicitudes de permiso que apruebas ahí mismo. La vista de terminal ejecuta la interfaz normal de <code>copilot</code>, y al cambiar de una a otra se mantiene la conversación. Lanza los mensajes con fleet desde la vista de terminal.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Un solo historial para todas las sesiones',
          id: 'historial',
        },
        {
          type: 'paragraph',
          text: 'El historial de conversaciones muestra tus sesiones de Copilot, las filtra por agente y proyecto, busca en sus mensajes y reabre cualquiera en Chat o en la terminal. Los turnos de los subagentes de <code>/fleet</code> quedan dentro de su conversación principal y no aparecen como filas aparte.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-history.webp',
          alt: 'Conversaciones de GitHub Copilot CLI filtradas en el historial de CodeAgentSwarm',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm, con una conversación de ejemplo creada para pruebas.',
          size: 'full',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: `El nivel de permiso Always approve equivale a <code>copilot --yolo</code>. En un enjambre te ahorra aprobaciones, pero cada sesión puede editar y ejecutar comandos sin preguntarte. Lee ${link('/es/guias/modo-yolo-github-copilot-cli', 'el modo YOLO de GitHub Copilot CLI')} antes de activarlo en todas.`,
        },
      ],
    },
    {
      id: 'repartir-trabajo',
      title: 'Cómo repartir el trabajo y evitar conflictos de archivos',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Una tarea por sesión.</strong> Una sesión con un objetivo claro se revisa mejor que una que lleva tres cambios a la vez.',
            '<strong>Un git worktree por sesión.</strong> Cada sesión edita su propia copia del repositorio en su propia rama, y cuando acaba fusionas con git.',
            '<strong>Pon nombre a las sesiones.</strong> Con <code>copilot -n auth</code> la encuentras y la retomas fácilmente después.',
            '<strong>Los archivos compartidos, en una sola sesión.</strong> Lockfiles, migraciones y configuración común deberían cambiar en una sesión, no en tres.',
            '<strong>Limita el acceso a carpetas.</strong> Por defecto Copilot solo puede tocar la carpeta de trabajo, sus subcarpetas y la carpeta temporal del sistema. <code>--add-dir</code> amplía ese acceso, así que úsalo solo cuando una tarea necesite de verdad otra carpeta.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Dos sesiones arrancadas en la misma carpeta trabajan sobre los mismos archivos y pueden pisarse los cambios. Con worktrees separados eso no pasa.',
        },
        {
          type: 'paragraph',
          text: `Para entrar en detalle con los worktrees, mira ${link('/es/guias/git-worktrees-para-agentes-de-ia', 'git worktrees para agentes de IA')} y ${link('/es/guias/git-worktree-vs-rama-agentes-ia-en-paralelo', 'git worktree frente a rama para agentes en paralelo')}.`,
        },
      ],
    },
    {
      id: 'creditos-ia',
      title: 'Vigila los créditos de IA del mes',
      content: [
        {
          type: 'paragraph',
          text: `Todas las sesiones de Copilot CLI tiran de la misma asignación mensual. Pro incluye 1.500 créditos de IA al mes, Pro+ 7.000 y Max 20.000. Copilot Free no tiene créditos de IA y usa la CLI con selección automática de modelo dentro de una asignación mensual limitada de Chat. La asignación se reinicia a las 00:00 UTC del primer día de cada mes y los créditos sin usar no se acumulan. Si defines un presupuesto, el uso adicional cuesta 0,01 $ por crédito. Fuente: ${link('https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals', 'facturación de GitHub para particulares')}, revisada el 8 de octubre de 2026.`,
        },
        {
          type: 'paragraph',
          text: 'Varias sesiones trabajando a la vez vacían esa bolsa antes que una sola. Algunos hábitos ayudan:',
        },
        {
          type: 'list',
          items: [
            'Mira el saldo restante en el pie de Copilot y ejecuta <code>/usage</code> en una sesión para ver lo que lleva gastado.',
            'Elige el modelo de cada sesión con <code>/model</code>. Con <code>auto</code>, Copilot decide el modelo de cada petición.',
            'Recuerda que <code>/fleet</code> puede gastar más créditos que la misma tarea hecha por un solo agente.',
            'En CodeAgentSwarm, el panel de uso muestra la asignación mensual de Copilot y la fecha de reinicio junto a tus otros agentes. La lee de un token en variable de entorno o de GitHub CLI con sesión iniciada, nunca del llavero.',
          ],
        },
        {
          type: 'paragraph',
          text: `Los planes, los modelos y el panel de uso están en ${link('/es/guias/github-copilot-cli-modelos-creditos-ia', 'modelos, créditos de IA y límites de GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'limites',
      title: 'Límites que conviene conocer',
      content: [
        {
          type: 'list',
          items: [
            'El servidor ACP que usa Chat es una versión preliminar pública. Los comandos que abren un selector, como <code>/login</code>, <code>/resume</code> o <code>/diff</code>, no funcionan dentro de Chat.',
            'El esfuerzo de razonamiento es una opción de arranque (<code>--reasoning-effort</code>), así que Chat no tiene selector de esfuerzo para Copilot.',
            'El texto de un subagente puede aparecer mezclado en el Chat.',
            'La terminal pide confianza una vez por carpeta, es decir, una vez por cada worktree nuevo.',
          ],
        },
        {
          type: 'paragraph',
          text: `Para comparar Copilot con otros agentes que puedes meter en el mismo enjambre, consulta ${link('/es/guias/github-copilot-cli-vs-claude-code', 'GitHub Copilot CLI frente a Claude Code')} y ${link('/es/guias/enjambre-de-agentes-cli-ia', 'enjambre de agentes CLI de IA')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedo tener varias sesiones de GitHub Copilot CLI a la vez?',
      answer: 'Sí. Cada comando copilot arranca una sesión independiente, con su conversación y su carpeta de trabajo. Abre varias terminales, mejor con un git worktree para cada una, y ejecuta copilot en cada una.',
    },
    {
      question: '¿Qué diferencia hay entre /fleet y tener varias sesiones?',
      answer: '/fleet funciona dentro de una sesión: el agente principal divide el mensaje en subtareas y las coordina mientras los subagentes trabajan en paralelo. Las sesiones separadas son totalmente independientes, cada una con su tarea, su carpeta y su conversación, y las sigues y revisas por separado.',
    },
    {
      question: '¿Qué hace /delegate en Copilot CLI?',
      answer: 'Pasa la tarea al agente en la nube de Copilot en GitHub. Copilot crea una rama, abre un pull request en borrador y trabaja en segundo plano, así que la tarea sigue aunque apagues el ordenador. El resultado lo revisas como pull request.',
    },
    {
      question: '¿Las sesiones en paralelo gastan más créditos de IA?',
      answer: 'Cada sesión gasta créditos por el trabajo que hace y todas salen de la misma asignación mensual, así que varias a la vez la agotan antes. GitHub también avisa de que /fleet puede gastar más créditos que un solo agente haciendo la misma tarea.',
    },
    {
      question: '¿CodeAgentSwarm ya es compatible con GitHub Copilot CLI?',
      answer: 'El soporte llega en la versión siguiente a la 2.4.3. Incluye la instalación, el inicio de sesión desde Chat, las vistas de Chat y terminal, el historial, los avisos y el estado de las sesiones de Copilot junto a tus otros agentes.',
    },
  ],
}

export default guide
