import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'coordinador-agentes-ia',
    locale: 'es',
    title: 'Coordinador de agentes IA: un agente que planifica y dirige a los demás',
    metaTitle: 'Coordinador de agentes IA: un agente que dirige a todo tu equipo (2026)',
    metaDescription: 'Un agente coordinador divide tu objetivo, abre sesiones con el agente y el modelo adecuados para cada parte y te responde en un solo Chat. Modo proyecto y global.',
    intro: `Tener cinco agentes en paralelo está genial hasta que te das cuenta de quién los coordina de verdad: tú. Escribes cinco prompts, eliges cinco modelos, llevas cinco contextos en la cabeza y copias respuestas de una sesión a otra.

CodeAgentSwarm 2.4.0 trae coordinadores. Un coordinador es un Chat con un único trabajo: coger lo que pides, planificarlo y repartir las piezas entre sesiones de trabajo. Elige el agente y el modelo que encajan con cada pieza, abre esas sesiones en segundo plano y tú sigues hablando con una sola conversación. Las sesiones pueden ser de LLM distintos, una de Codex junto a una de Claude junto a una de Kimi, y se pueden hacer preguntas entre ellas cuando lo necesitan.

En esta guía te explico los dos tipos de coordinador, cómo arrancar uno, qué hace y qué no, y unos cuantos prompts que enseñan para qué sirve.`,
    highlightedWords: ['Coordinador', 'agentes IA'],
    publishedAt: '2026-09-27',
    updatedAt: '2026-09-27',
    ctaText: 'Arranca un coordinador, dale un objetivo real y deja que abra él las sesiones de trabajo.',
    ctaAgent: 'multi',
    alternateSlug: 'ai-coding-agent-coordinator',
  },
  sections: [
    {
      id: 'what-a-coordinator-is',
      title: 'Qué es un coordinador de agentes IA',
      content: [
        {
          type: 'paragraph',
          text: 'Un coordinador es un Chat normal de CodeAgentSwarm con un papel especial. Le das un objetivo con tus palabras. Él decide qué puede hacer solo y qué conviene pasar a sesiones de trabajo aparte, abre esas sesiones, le manda a cada una su encargo y les sigue la pista. Tú te quedas en una conversación en lugar de ir saltando entre muchas.',
        },
        {
          type: 'demo',
          demo: 'coordinators',
          caption: 'Un coordinador planifica el trabajo, abre sesiones en segundo plano y te responde en el mismo Chat.',
        },
        {
          type: 'paragraph',
          text: 'No es una caja negra. Cada sesión de trabajo es una sesión real que puedes abrir, leer y a la que puedes escribir. Los mensajes que el coordinador manda a una sesión aparecen marcados en su Chat con una franja Coordinator y el tipo de mensaje, como Assignment, Follow-up o Correction. Siempre sabes qué instrucciones son tuyas y cuáles del coordinador.',
        },
        {
          type: 'paragraph',
          text: `Si nunca has trabajado con agentes en paralelo, empieza por la <a href="/es/guias/enjambre-de-agentes-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes de Claude Code</a>. El coordinador es el siguiente paso: el mismo enjambre, con un agente al mando de los traspasos.`,
        },
      ],
    },
    {
      id: 'project-vs-global-coordinator',
      title: 'Coordinador de proyecto o coordinador global',
      content: [
        {
          type: 'paragraph',
          text: 'Hay dos tipos, y puedes tener los dos funcionando a la vez.',
        },
        {
          type: 'table',
          headers: ['', 'Coordinador de proyecto', 'Coordinador global'],
          rows: [
            ['Alcance', 'Un proyecto, con sus worktrees', 'Todos tus proyectos locales, desde un Chat'],
            ['Ve', 'Los Chats abiertos de ese proyecto', 'Todos los proyectos configurados, incluidos los nuevos'],
            ['Reparte a', 'Sesiones de trabajo', 'Coordinadores de proyecto o sesiones de trabajo directamente'],
            ['Cuántos', 'Uno por proyecto', 'Uno'],
            ['Ideal para', 'Una funcionalidad, una tanda de bugs, un refactor en un repo', 'Trabajo que cruza varios repos: web, API y móvil'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Si ya existe un coordinador para ese alcance, la app te ofrece "Open coordinator" y te lleva a la misma conversación en lugar de crear otra. Los coordinadores aparecen fijados delante del resto de sesiones en Grid, Tabs y List. En Tabs y List llevan un borde de color, y List tiene su propio grupo Coordinators.',
        },
      ],
    },
    {
      id: 'start-a-coordinator',
      title: 'Cómo arrancar un coordinador',
      content: [
        {
          type: 'list',
          items: [
            'Activa Session communication en Settings › Privacy. Los coordinadores lo necesitan, y solo se aplica a las sesiones nuevas.',
            'Pulsa New agent.',
            'Para un coordinador global, elige "Global coordinator" encima del buscador de proyectos. Para uno de proyecto, elige el proyecto y activa "Coordinator" en las opciones de arranque.',
            'Elige el agente sobre el que corre el coordinador y pulsa "Start coordinator".',
            'Elige el modelo dentro del Chat, como en cualquier otra sesión de Chat.',
            'Escribe tu objetivo. El primer mensaje de verdad es el objetivo. Un "hola" o una pregunta sobre el propio asistente no cuentan, así que puedes saludar primero sin arrancar ningún plan.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'También puedes arrancar un coordinador desde la app móvil: New session › Coordinator, luego Project o Global y el agente. Se ejecuta en tu ordenador.',
        },
      ],
    },
    {
      id: 'what-the-coordinator-does',
      title: 'Qué hace el coordinador con tu objetivo',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Divide el trabajo y se encarga él de lo pequeño',
          id: 'splits-the-work',
        },
        {
          type: 'paragraph',
          text: 'No todo necesita una sesión nueva. Leer un archivo para contestar una pregunta, un arreglo de una línea o mirar el estado de git lo hace el coordinador solo. Reparte las piezas gordas: implementación que necesita tests, trabajo de horas, partes independientes que pueden ir en paralelo o cualquier cosa que le pidas expresamente en su propia sesión. Si ya hay una sesión abierta que sirve, la reutiliza antes de abrir otra.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Abre sesiones en segundo plano, con el agente y el modelo adecuados',
          id: 'opens-workers',
        },
        {
          type: 'paragraph',
          text: 'Para cada pieza, el coordinador abre una sesión de trabajo con el agente y el modelo que encajan. Puede ser un LLM distinto al del propio coordinador. Las sesiones se abren en segundo plano: tu conversación actual, tu pestaña y el foco del teclado se quedan donde estaban. Entra en una sesión cuando quieras verla trabajar o meter mano.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Las sesiones hablan entre ellas',
          id: 'sessions-talk',
        },
        {
          type: 'paragraph',
          text: 'Las sesiones con Session communication pueden hacerle a otra sesión una pregunta concreta y recibir la respuesta, que aparece como una tarjeta de petición en el Chat. La sesión del frontend puede preguntarle a la de la API qué devuelve un endpoint, en lugar de adivinarlo o esperarte a ti.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Te responde en el mismo Chat',
          id: 'reports-back',
        },
        {
          type: 'paragraph',
          text: 'Las sesiones de trabajo guardan sus resultados y sus bloqueos. El coordinador no las vigila en segundo plano: cuando reparte, termina su turno y te espera. Cuando le preguntas "¿cómo va?", revisa las sesiones y te contesta en el mismo Chat. El icono junto al título del Chat abre Coordinator settings, con el proyecto principal, los encargos y las pruebas que ha dejado cada sesión.',
        },
        {
          type: 'paragraph',
          text: 'El resto de la app también se maneja desde el Chat. Cualquier agente puede abrir sesiones, crear atajos, cambiar de vista o buscarte una conversación antigua, así que el coordinador puede preparar el espacio de trabajo además del trabajo.',
        },
      ],
    },
    {
      id: 'example-prompts',
      title: 'Prompts de ejemplo que enseñan lo que puede hacer',
      content: [
        {
          type: 'paragraph',
          text: 'Los mejores prompts para un coordinador describen el resultado y las condiciones, no los pasos. Cuatro ejemplos:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sacar una página de precios en web, API y móvil',
          id: 'prompt-pricing-page',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Vamos a lanzar un plan anual. Añádelo a la página de precios del proyecto web, mete el precio y la opción de pago en la API y enséñalo en la pantalla de mejora de la app móvil. Usa Claude para la API, Codex para la web y un modelo más barato para los textos del móvil. Avísame cuando las tres partes estén listas para revisar.',
        },
        {
          type: 'paragraph',
          text: 'Esto es trabajo para el coordinador global, porque toca tres proyectos.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: `Las sesiones de trabajo siguen tu preferencia guardada de Git worktree. Déjala activada cuando dos sesiones tocan el mismo repo, así nunca editan la misma carpeta. La <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de worktrees</a> explica por qué.`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Arreglar una tanda de bugs',
          id: 'prompt-bug-batch',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Aquí tienes seis bugs reportados esta semana. Agrupa los que tengan la misma causa, arregla cada grupo en su propia sesión con un test de regresión y dame un único resumen con lo que ha cambiado y lo que no has podido reproducir.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Preparar una release',
          id: 'prompt-release',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Prepara la versión 3.2. Una sesión pasa los tests y arregla lo que falle, otra actualiza el changelog con los commits desde la 3.1 y otra revisa la documentación de las pantallas que han cambiado. No subas nada. Lo reviso y lo publico yo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Comparar dos enfoques antes de elegir',
          id: 'prompt-compare',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Tenemos que cambiar la librería de fechas. Que una sesión pruebe la migración con la librería A y otra con la librería B, y dame una comparativa: tamaño del diff, tests que fallan y cualquier cosa que parezca arriesgada.',
        },
      ],
    },
    {
      id: 'coordinator-vs-auto-kanban-vs-sessions',
      title: '¿Coordinador, Kanban automático o sesiones en paralelo?',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm te da tres formas de trabajar en paralelo. Cada una resuelve un problema distinto.',
        },
        {
          type: 'table',
          headers: ['Usa', 'Cuándo'],
          rows: [
            ['Coordinador', 'Un objetivo que hay que dividir, con partes que dependen unas de otras, agentes distintos para cada parte y un solo sitio donde preguntar cómo va.'],
            ['Kanban automático', 'Una lista de tareas independientes que ya conoces. Las encolas con los ajustes de cada una y arrancan solas.'],
            ['Sesiones en paralelo', 'Unos pocos trabajos que quieres llevar tú, prompt a prompt.'],
          ],
        },
        {
          type: 'paragraph',
          text: `La <a href="/es/guias/kanban-automatico-agentes-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del Kanban automático</a> explica la cola en detalle, y <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> cubre la forma manual. Se combinan bien: un coordinador para la funcionalidad y el carril Auto para la lista de arreglos pequeños.`,
        },
      ],
    },
    {
      id: 'limits-and-safety',
      title: 'Límites y seguridad: qué necesita tu confirmación',
      content: [
        {
          type: 'paragraph',
          text: 'Un coordinador puede hacer mucho, así que conviene saber dónde están los límites:',
        },
        {
          type: 'list',
          items: [
            'Cerrar una sesión que sigue trabajando, tiene mensajes en cola o espera una aprobación necesita tu confirmación en la app de escritorio. Un coordinador solo puede cerrar las sesiones que abrió él.',
            'El Chat del coordinador mantiene sus permisos normales de archivos, comandos y aprobaciones. Ser coordinador no le da permisos extra.',
            'No hace sondeos ni se despierta solo. Entre tus mensajes no pasa nada salvo el trabajo que hacen las sesiones.',
            'Las correcciones a una sesión en mitad de un turno funcionan de forma nativa con Claude y Codex. Los demás agentes reciben los mensajes del coordinador cuando están libres.',
            'Cerrar el Chat del coordinador termina su papel. Las sesiones en marcha no se interrumpen y la conversación queda en History.',
            'Los coordinadores se ejecutan en tu ordenador. Los hosts de CAS Cloud y las máquinas remotas emparejadas no los ofrecen.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `Cada sesión de trabajo gasta la cuota de su proveedor. Un plan con cinco sesiones puede gastar mucho en una tarde. Un <a href="/es/guias/limite-semanal-claude-code-presupuesto-diario" class="text-neon-cyan hover:text-neon-purple transition-colors">presupuesto diario por proveedor</a> lo mantiene a raya.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un coordinador de agentes IA?',
      answer: 'Es un agente cuyo trabajo es planificar y repartir. En CodeAgentSwarm, un coordinador es un Chat que coge tu objetivo, lo divide, abre sesiones de trabajo con el agente y el modelo que encajan con cada parte y te responde en la misma conversación.',
    },
    {
      question: '¿Qué diferencia hay entre un coordinador de proyecto y uno global?',
      answer: 'Un coordinador de proyecto trabaja dentro de un proyecto y sus worktrees. Uno global cubre todos tus proyectos locales desde un Chat y puede dirigir coordinadores de proyecto o sesiones de trabajo directamente. Puedes tener un coordinador global y uno por proyecto.',
    },
    {
      question: '¿Las sesiones de trabajo pueden usar agentes y modelos distintos?',
      answer: 'Sí. El coordinador elige el agente y el modelo de cada sesión, así que un coordinador en Claude puede abrir sesiones de Codex, Kimi o Grok, cada una con su modelo.',
    },
    {
      question: '¿El coordinador revisa las sesiones automáticamente?',
      answer: 'No. Después de repartir, espera a tu siguiente mensaje. Las sesiones guardan sus informes y, cuando le pides novedades, el coordinador las revisa y te contesta en el mismo Chat.',
    },
    {
      question: '¿Un coordinador puede cerrar mis sesiones?',
      answer: 'Solo las que abrió él. Si alguna sigue trabajando, tiene mensajes en cola o espera una aprobación, la app de escritorio te pide confirmación antes.',
    },
    {
      question: '¿Qué tengo que activar antes?',
      answer: 'Session communication, en Settings › Privacy. Se aplica a las sesiones nuevas, así que actívalo antes de arrancar el coordinador.',
    },
  ],
}

export default guide
