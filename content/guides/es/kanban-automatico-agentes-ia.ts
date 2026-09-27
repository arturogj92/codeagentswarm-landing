import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kanban-automatico-agentes-ia',
    locale: 'es',
    title: 'Kanban automático para agentes IA: tareas que arrancan solas',
    metaTitle: 'Kanban automático para agentes IA: encola tareas y los agentes las hacen (2026)',
    metaDescription: 'Suelta tareas en el carril Auto y cada una arranca su sesión con el agente, modelo, razonamiento y permisos que elijas. Lo terminado llega a In Testing.',
    intro: `Un tablero de tareas te dice qué hay que hacer. Hasta ahora no podía hacer nada al respecto. Seguías teniendo que abrir una sesión, elegir un agente, pegar la tarea y esperar, tarjeta a tarjeta.

CodeAgentSwarm 2.4.0 añade un carril Auto al Kanban. Sueltas una tarea ahí y la app la arranca por ti: se abre una sesión nueva con el agente, el modelo, el razonamiento y los permisos que elegiste para esa tarea, en un Git worktree o en la carpeta del proyecto, y el agente se pone a trabajar. Cuando termina, la tarjeta pasa a In Testing, donde la revisas tú.

En esta guía te cuento cómo encolar tareas, qué ajustes puede llevar cada una, cuántas se ejecutan a la vez, qué recibe el agente y un flujo sencillo para que tu backlog avance mientras haces otra cosa.`,
    highlightedWords: ['Kanban automático', 'agentes IA'],
    publishedAt: '2026-09-27',
    updatedAt: '2026-09-27',
    ctaText: 'Encola tres tareas en el carril Auto esta noche y revísalas mañana en In Testing.',
    ctaAgent: 'multi',
    relatedSlug: 'coordinador-agentes-ia',
    alternateSlug: 'auto-kanban-ai-coding-agents',
  },
  sections: [
    {
      id: 'what-is-the-auto-lane',
      title: 'Qué es el carril Auto',
      content: [
        {
          type: 'paragraph',
          text: 'El carril Auto es una columna del Kanban, entre Pending e In Progress, marcada con un icono de rayo. Las tareas que están ahí esperan a que alguien las coja. En cuanto hay un hueco libre, la app abre una sesión para la siguiente tarea y la pasa a In Progress.',
        },
        {
          type: 'demo',
          demo: 'auto-kanban',
          caption: 'Las tareas del carril Auto arrancan solas, cada una con su agente y su modelo.',
        },
        {
          type: 'paragraph',
          text: `Todo lo demás del tablero funciona igual que antes: proyectos, etiquetas, subtareas y agentes que actualizan sus propias tarjetas. Si el tablero es nuevo para ti, lee primero la <a href="/es/guias/gestion-de-tareas-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de gestión de tareas</a>. Esta solo cubre lo que añade el carril Auto.`,
        },
      ],
    },
    {
      id: 'queue-a-task',
      title: 'Cómo encolar una tarea',
      content: [
        {
          type: 'paragraph',
          text: 'Hay tres formas de meter una tarea en Auto:',
        },
        {
          type: 'list',
          items: [
            'Arrastra una tarjeta de Pending al carril Auto. Usa tus ajustes por defecto de Auto.',
            'Pulsa el botón del rayo de una tarjeta en Pending ("Run automatically"). Abre los ajustes solo para esa tarea. Cambia lo que necesites y pulsa "Queue task". Tus ajustes por defecto no cambian.',
            'Al crear una tarea, activa "Start automatically". La tarea se guarda directamente en el carril Auto y arranca en cuanto hay un hueco libre.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La tarea necesita un proyecto, porque ahí es donde se ejecuta la sesión. Si no tiene, la app te pide que le asignes uno antes de meterla en Auto. También puedes encolar tareas desde la app móvil, y un agente puede crear una tarea ya encolada cuando se lo pides.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'El engranaje de la cabecera del carril Auto abre Auto settings, donde defines los ajustes por defecto que usa cada arrastre. La pequeña etiqueta de al lado te enseña de un vistazo el agente y el espacio de trabajo por defecto.',
        },
      ],
    },
    {
      id: 'run-automatically-settings',
      title: 'Los ajustes que lleva cada tarea',
      content: [
        {
          type: 'paragraph',
          text: 'Los ajustes de "Run automatically" van con la tarea, así que cada tarjeta puede ejecutarse de una forma distinta:',
        },
        {
          type: 'table',
          headers: ['Ajuste', 'Qué controla'],
          rows: [
            ['Agent', 'Qué agente instalado hace la tarea: Claude, Codex, Kimi Code, Grok Build y el resto.'],
            ['Model', 'El modelo de ese agente, de la misma lista que enseña el selector del Chat.'],
            ['Reasoning', 'El nivel de razonamiento, cuando el modelo elegido lo tiene. Si no, el campo aparece desactivado.'],
            ['Permissions', 'Los mismos modos de permisos que en el Chat, desde pedir aprobación hasta acceso total, según lo que admita el agente.'],
            ['Workspace', '"Git worktree" para una copia de trabajo aparte, o "Project folder" para usar la carpeta que ya existe.'],
            ['Work style', '"Normal", "Ask only for blockers" o "Use best judgment".'],
          ],
        },
        {
          type: 'paragraph',
          text: 'El Work style decide cuánto debe pararse el agente a preguntar. "Normal" no añade nada a la tarea. Los otros dos añaden una instrucción corta, y puedes leer el texto exacto en "Instructions added to the task" antes de encolar. "Use best judgment" es el de las tareas que quieres terminadas sin preguntas, mientras que "Ask only for blockers" sigue parándose cuando falta un dato o una decisión que de verdad bloquea el trabajo.',
        },
        {
          type: 'paragraph',
          text: `Los worktrees solo se usan cuando el proyecto los admite. Si no, por ejemplo en un repositorio sin commits todavía, Auto usa la carpeta del proyecto y te dice por qué. Por qué importan los worktrees cuando varios agentes trabajan en un mismo repo lo tienes en la <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Git worktrees</a>.`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cuando una tarea está en cola, sus ajustes son de solo lectura. Para cambiarlos, saca la tarjeta de Auto, edítala y vuelve a encolarla.',
        },
      ],
    },
    {
      id: 'how-many-run-at-once',
      title: 'Cuántas tareas se ejecutan a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Por defecto Auto no tiene límite: cada tarea en cola tiene su propia sesión cuando hay sitio, en el mismo proyecto o en proyectos distintos. Si quieres menos a la vez, abre Auto settings › Advanced settings y pon "Maximum tasks in parallel" en Custom con un número. Ese máximo se aplica a todos tus proyectos locales juntos. Bajarlo nunca interrumpe el trabajo que ya está en marcha.',
        },
        {
          type: 'paragraph',
          text: 'El límite de sesiones de tu plan se sigue aplicando. La cabecera del carril enseña el recuento en vivo, por ejemplo "2 running · 3 queued", más el máximo si has puesto uno.',
        },
        {
          type: 'paragraph',
          text: `La recogida de tareas se hace cada pocos segundos, incluso con la ventana del Kanban cerrada, así que puedes encolar trabajo y olvidarte del tablero. Si usas un <a href="/es/guias/limite-semanal-claude-code-presupuesto-diario" class="text-neon-cyan hover:text-neon-purple transition-colors">presupuesto diario</a> con "Pause new work", las tareas de un proveedor que ha llegado a su límite se quedan en cola y la cabecera te dice que están retenidas por el límite de uso. Vuelven a arrancar cuando empieza el nuevo día.`,
        },
      ],
    },
    {
      id: 'what-the-session-receives',
      title: 'Qué recibe la sesión de la tarea',
      content: [
        {
          type: 'paragraph',
          text: 'Cada tarea abre una sesión de Chat con el agente y los ajustes de la tarjeta. El primer mensaje es la propia tarea:',
        },
        {
          type: 'list',
          items: [
            'El número y el título de la tarea.',
            'La descripción, si la tiene.',
            'Las imágenes adjuntas a la tarea.',
            'Las instrucciones del Work style, si elegiste "Ask only for blockers" o "Use best judgment".',
            'Una última línea que marca la tarea como In Progress y la enlaza con esa sesión.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Nada más. Cuanto mejor sea la descripción, mejor el resultado, así que escribe las tareas como si se las pasaras a un compañero: qué cambiar, dónde y cómo sabrás que funciona.',
        },
        {
          type: 'paragraph',
          text: 'Mientras se ejecuta, la tarjeta de In Progress tiene un botón "Go to session" que te lleva directo a la conversación, para mirar o contestar una pregunta.',
        },
      ],
    },
    {
      id: 'when-a-task-finishes',
      title: 'Cuando una tarea termina',
      content: [
        {
          type: 'paragraph',
          text: 'El agente sigue el flujo normal de tareas: cuando acaba, escribe su resumen y pasa la tarjeta a In Testing. Auto nunca marca nada como Completed. Ese paso es tuyo, después de revisar el resultado.',
        },
        {
          type: 'paragraph',
          text: 'La sesión sigue abierta después de la tarea, así que puedes leer qué ha pasado, pedir un cambio o hacer el commit. El hueco queda libre y arranca la siguiente tarea de la cola.',
        },
        {
          type: 'paragraph',
          text: 'Cuando algo sale mal, Auto tiene cuidado de no ejecutar la misma tarea dos veces:',
        },
        {
          type: 'list',
          items: [
            'Si cierras una sesión antes de que la tarea termine, o la sesión no llega a arrancar, la tarjeta se queda donde está y sale de Auto. No lo reintenta por su cuenta.',
            'Si la app se reinicia en mitad de una tarea, no la vuelve a lanzar, porque abriría una conversación duplicada. Puedes encolarla otra vez o retomar tú la conversación.',
            'Una sesión que espera tu respuesta conserva su hueco mientras espera.',
          ],
        },
      ],
    },
    {
      id: 'overnight-backlog-workflow',
      title: 'Un flujo práctico: encola el backlog y revisa por la mañana',
      content: [
        {
          type: 'paragraph',
          text: 'El carril Auto brilla con una lista de tareas pequeñas y bien descritas. Una rutina que funciona:',
        },
        {
          type: 'list',
          items: [
            'Al final del día, escribe o repasa de cinco a diez tareas pequeñas: bugs, tests, cambios de texto, refactors pequeños.',
            'Elige el agente de cada tarea. Claude para el refactor delicado, Codex para los tests, un modelo más rápido para los textos.',
            'Usa un Git worktree para cada una, así nunca se pisan.',
            'Pon el Work style en "Use best judgment" en las tareas que quieres terminadas sin preguntas.',
            'Encólalas y pon un presupuesto diario para que la cola no se coma la cuota de mañana.',
            'Por la mañana, abre In Testing y revisa cada tarjeta con su resumen y su sesión.',
          ],
        },
        {
          type: 'paragraph',
          text: `Cuando el trabajo es un objetivo grande y no una lista, con partes que dependen unas de otras, un <a href="/es/guias/coordinador-agentes-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">coordinador</a> es mejor herramienta. Y para compararlo con otras formas de tener agentes en paralelo, mira la <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes CLI de IA</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es el carril Auto del Kanban?',
      answer: 'Es una columna entre Pending e In Progress. Las tareas que pones ahí arrancan solas: la app abre una sesión con el agente, el modelo y los ajustes elegidos para esa tarea, y el agente la va haciendo.',
    },
    {
      question: '¿Cada tarea puede usar un agente y un modelo distintos?',
      answer: 'Sí. Cada tarea lleva su propio agente, modelo, razonamiento, permisos, espacio de trabajo y Work style. Arrastrar usa tus ajustes por defecto de Auto, y el botón del rayo te deja elegirlos para una sola tarea.',
    },
    {
      question: '¿Cuántas tareas de Auto se ejecutan a la vez?',
      answer: 'Por defecto Auto no tiene límite. Puedes poner un máximo en Auto settings › Advanced settings, que se aplica a todos tus proyectos locales. El límite de sesiones de tu plan se sigue aplicando.',
    },
    {
      question: '¿Auto marca las tareas como Completed?',
      answer: 'No. El agente pasa la tarjeta a In Testing cuando termina, y tú la pasas a Completed después de revisarla.',
    },
    {
      question: '¿Qué pasa si una tarea falla o cierro su sesión?',
      answer: 'La tarjeta se queda en su columna y sale de Auto. Auto no lo reintenta solo, así que la misma tarea nunca se ejecuta dos veces por accidente. Puedes volver a encolarla cuando quieras.',
    },
    {
      question: '¿Puedo ocultar el carril Auto?',
      answer: 'Sí. En Auto settings tienes "Hide Auto column". Las tareas en cola siguen funcionando. Para recuperar la columna, ve a Settings › General › Kanban › Show Auto column.',
    },
  ],
}

export default guide
