import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'limite-semanal-claude-code-presupuesto-diario',
    locale: 'es',
    title: 'Límite semanal de Claude Code: un presupuesto diario para que la cuota te dure toda la semana',
    metaTitle: 'Límite semanal de Claude Code: presupuesto diario para cada agente (2026)',
    metaDescription: 'No gastes el límite semanal de Claude Code en dos días. Pon un presupuesto diario por proveedor, reparte lo que queda hasta el reinicio y pausa el trabajo nuevo.',
    intro: `El límite que duele es el semanal. La ventana de cinco horas se reinicia mientras comes, pero la semanal va a su ritmo. Si el lunes y el martes tienes cuatro agentes a tope, el miércoles por la mañana te quedas bloqueado hasta el reinicio, con media semana por delante.

El problema no es que la cuota sea pequeña. Es que nada te impide gastarte la semana entera en uno o dos días. Y con agentes en paralelo es mucho peor, porque todos tiran de la misma bolsa.

CodeAgentSwarm 2.4.0 añade un presupuesto diario para cada proveedor que informa de su cuota. Tú decides cuánto de la semana puede gastar cada día: una parte fija o un Smart pace que reparte lo que queda hasta el reinicio. Cuando llegas al límite de hoy, la app puede avisarte, pausar el trabajo nuevo o pararlo. En esta guía te cuento cómo funciona, cómo configurarlo y unos cuantos hábitos para seguir trabajando hasta el viernes.`,
    highlightedWords: ['Límite semanal', 'presupuesto diario'],
    publishedAt: '2026-09-27',
    updatedAt: '2026-09-27',
    ctaText: 'Activa un presupuesto diario para tu agente principal y llega al viernes con semana de sobra.',
    ctaAgent: 'multi',
    alternateSlug: 'claude-code-weekly-limit-daily-budget',
  },
  sections: [
    {
      id: 'why-the-weekly-limit-runs-out',
      title: 'Por qué el límite semanal se acaba el miércoles',
      content: [
        {
          type: 'paragraph',
          text: 'Casi todas las suscripciones de agentes de programación miden el uso en dos capas. Claude Code tiene una ventana corta de unas cinco horas y, por encima, un límite semanal. Codex funciona de forma parecida. Cursor mide una ventana mensual. La ventana corta te frena una tarde. La larga te puede bloquear varios días.',
        },
        {
          type: 'paragraph',
          text: `La trampa es sencilla. Justo después del reinicio semanal vas sobrado, así que abres más sesiones, dejas que los agentes trabajen más rato y usas el modelo más grande para todo. Dos días fuertes después, la semana se ha acabado. Si quieres el detalle de cada plan y sus ventanas, lo tienes en la <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de planes y precios de Claude Code</a> y en la <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de planes de Codex</a>.`,
        },
        {
          type: 'demo',
          demo: 'daily-budget',
          caption: 'Un presupuesto diario por proveedor: el límite de hoy, lo que queda de semana y qué pasa cuando llegas.',
        },
        {
          type: 'paragraph',
          text: 'Un presupuesto diario no cambia tu plan, cambia la costumbre. Convierte una bolsa semanal grande en una asignación diaria, para que un lunes intenso no se coma el jueves.',
        },
      ],
    },
    {
      id: 'how-the-daily-budget-works',
      title: 'Cómo funciona el presupuesto diario',
      content: [
        {
          type: 'paragraph',
          text: 'El presupuesto diario está en Settings › Providers, dentro de la sección Quota Indicator, en el bloque "Usage budget". Cada proveedor con una cuota medible tiene su propia fila con su propio interruptor. Viene desactivado, así que no cambia nada hasta que lo enciendes.',
        },
        {
          type: 'paragraph',
          text: 'La unidad es el propio porcentaje del proveedor. Un límite del 15% en Claude significa que hoy puedes gastar como mucho 15 puntos de la ventana semanal. No hay conversión a euros ni a tokens, porque los proveedores no los informan de forma fiable. CodeAgentSwarm lee la cuota que te queda según el proveedor y suma cuánto ha bajado hoy.',
        },
        {
          type: 'paragraph',
          text: 'Cada fila tiene una opción Cap con dos modos:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Daily: el mismo límite cada día',
          id: 'daily-mode',
        },
        {
          type: 'paragraph',
          text: 'Eliges un número y se aplica todos los días. Si tu semana tiene siete días y quieres algo de margen, empezar con un 14% o un 15% al día es razonable. Es predecible y fácil de entender.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Smart pace: reparte lo que queda hasta el reinicio',
          id: 'smart-pace',
        },
        {
          type: 'paragraph',
          text: 'Smart pace mira cuánto te queda de semana y cuántos días faltan para el reinicio, y te sugiere una parte diaria: más o menos lo que queda dividido entre los días que faltan. Si el lunes fue intenso, la sugerencia para el resto de la semana baja. Si tuviste un día tranquilo, sube. Puedes escribir tu propio número, y el botón "auto" te devuelve a la sugerencia en vivo.',
        },
        {
          type: 'paragraph',
          text: 'Smart pace también te avisa cuando a tu ritmo actual la ventana se vaciaría antes del reinicio, así que te enteras el martes y no el jueves.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'El día del presupuesto termina a medianoche en tu hora local, la de tu sistema. El reinicio del proveedor va aparte: la ventana semanal se sigue reiniciando cuando lo diga el proveedor.',
        },
      ],
    },
    {
      id: 'which-providers-are-covered',
      title: 'Qué proveedores tienen presupuesto diario',
      content: [
        {
          type: 'paragraph',
          text: 'El presupuesto funciona con todos los proveedores que CodeAgentSwarm puede medir, no solo con Claude. Solo aparecen las filas de los que tienes instalados.',
        },
        {
          type: 'table',
          headers: ['Proveedor', 'Ventana que reparte el presupuesto'],
          rows: [
            ['Claude', 'Semanal'],
            ['Codex', 'Semanal'],
            ['Antigravity', 'Semanal'],
            ['Kimi Code', 'Semanal'],
            ['Grok Build', 'Semanal'],
            ['Cursor Agent', 'Mensual'],
            ['Devin CLI', 'Semanal'],
            ['Muse Code', 'Su ventana de cuota larga'],
            ['opencode, Pi', 'Sin presupuesto: no informan de un porcentaje de cuota'],
          ],
          caption: 'Cada fila dice qué ventana mide, así siempre sabes si un porcentaje es de la semana o del mes.',
        },
        {
          type: 'paragraph',
          text: `Si usas varias cuentas del mismo proveedor, el límite que pones se aplica al proveedor y cada cuenta se cuenta por separado. Tienes más sobre trabajar con varios logins en la guía de <a href="/es/guias/varias-cuentas-claude-code-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">varias cuentas de Claude Code y Codex</a>.`,
        },
      ],
    },
    {
      id: 'what-happens-at-the-limit',
      title: 'Qué pasa cuando llegas al límite de hoy',
      content: [
        {
          type: 'paragraph',
          text: 'Cada fila tiene una opción "On limit". Decide qué hace CodeAgentSwarm cuando llegas al límite de hoy:',
        },
        {
          type: 'table',
          headers: ['On limit', 'Qué hace'],
          rows: [
            ['Notify only', 'Te avisa al 80% y al llegar al límite. No bloquea nada.'],
            ['Pause new work', 'Lo que está en marcha termina. Las sesiones nuevas con ese proveedor no arrancan desde la app hasta medianoche, y las tareas de Auto que lo usan esperan.'],
            ['Stop work', 'Igual que Pause new work y, además, para el trabajo que está en marcha con ese proveedor.'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Pause new work es la que suele querer casi todo el mundo. No se corta nada de lo que tienes a medias, pero la siguiente sesión espera a mañana. El carril Auto del Kanban te explica por qué una tarea no arranca: muestra el proveedor como retenido por el límite de uso.',
        },
        {
          type: 'paragraph',
          text: 'Hay dos límites de la función que conviene saber desde el principio:',
        },
        {
          type: 'list',
          items: [
            'El uso desde otras apps cuenta. Si también usas Claude Code en otro terminal, en el navegador o en el móvil, ese uso sale de la misma cuota, así que aparece en el total de hoy.',
            'CodeAgentSwarm solo puede pausar el trabajo que lanza él. No puede parar una sesión de Claude Code que abriste en otro sitio.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Además, ves el uso de hoy sin abrir Settings. Cuando un proveedor tiene presupuesto, el popover de cuota de la barra superior añade una línea "Today" debajo de ese proveedor, junto a sus datos semanales.',
        },
      ],
    },
    {
      id: 'extra-five-percent-and-hard-cap',
      title: '+5% today y el hard cap opcional',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Cuando hoy necesitas un poco más',
          id: 'plus-five-today',
        },
        {
          type: 'paragraph',
          text: 'A veces llegas al límite diez minutos antes de terminar algo. Cuando el límite pausa o para el trabajo, el aviso te ofrece "+5% today", y el mismo botón aparece en el popover y en la fila de Settings. Cada pulsación suma cinco puntos solo al límite de hoy. Mañana vuelves a tu número de siempre. Con Smart pace, ese extra se reparte: los días siguientes tienen un poco menos, y la fila de Settings te enseña lo que le cuesta la ampliación al resto de la semana.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hard cap: guarda una parte de la semana',
          id: 'hard-cap',
        },
        {
          type: 'paragraph',
          text: 'El campo Hard cap es opcional y mide otra cosa. Es un límite sobre toda la ventana, no sobre hoy. Si lo pones en 80%, la acción de On limit salta cuando la ventana del proveedor llega al 80% de uso, aunque hoy todavía tengas margen. Se mantiene hasta que se reinicia la ventana del proveedor, no a medianoche, y +5% today no lo levanta. Úsalo si siempre quieres tener un trozo de la semana en reserva para un arreglo urgente.',
        },
      ],
    },
    {
      id: 'set-up-a-daily-budget',
      title: 'Cómo configurar el presupuesto diario, paso a paso',
      content: [
        {
          type: 'list',
          items: [
            'Abre Settings › Providers y baja hasta la sección Quota Indicator.',
            'Busca "Usage budget" y enciende el interruptor del proveedor que quieres controlar, por ejemplo Claude.',
            'En Cap, elige "Daily" para una parte fija o "Smart pace" para repartir lo que queda hasta el reinicio.',
            'Pon el %/day. Con Smart pace puedes quedarte con la sugerencia o escribir el tuyo.',
            'En On limit, elige "Notify only", "Pause new work" o "Stop work". Pause new work es un buen punto de partida.',
            'Opcional: escribe un Hard cap si quieres guardar una parte de la ventana en reserva.',
            'Repite con cualquier otro proveedor que uses. Cada fila va por su cuenta.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Empieza dos o tres días con Notify only. Así ves cuánto gasta de verdad un día normal antes de que se pause nada.',
        },
      ],
    },
    {
      id: 'practical-plays',
      title: 'Formas prácticas de que la semana te dure',
      content: [
        {
          type: 'paragraph',
          text: 'El presupuesto es una herramienta. Estos son los hábitos que más partido le sacan.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dale menos presupuesto a tu agente secundario',
          id: 'smaller-budget-secondary',
        },
        {
          type: 'paragraph',
          text: 'Si Claude es tu agente principal y Codex el que usas para revisiones o tareas sueltas, dale a Codex una parte fija ajustada y a Claude un Smart pace. El trabajo secundario nunca se come al agente del que dependes para lo difícil.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pasa el trabajo a un agente que aún tenga margen',
          id: 'move-work-to-another-agent',
        },
        {
          type: 'paragraph',
          text: `Cuando Claude llega al límite de hoy, pasa el ratón por el anillo de cuota de la barra superior: el popover muestra tus otros proveedores y cuánto llevan gastado de su ventana, así ves cuál tiene margen. Abre la siguiente sesión con ese. Desde History, "Continue with another LLM" lleva una conversación existente a otro agente. Y en el <a href="/es/guias/kanban-automatico-agentes-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">Kanban automático</a> cada tarea puede tener su propio agente, así que puedes encolar las siguientes con un proveedor que no esté en su límite.`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Deja que el trabajo en cola espere a mañana',
          id: 'queued-work-waits',
        },
        {
          type: 'paragraph',
          text: 'Con Pause new work, las tareas del carril Auto de un proveedor que ha llegado a su límite se quedan en cola. Pasada la medianoche empieza el nuevo día y arrancan solas. Puedes llenar la cola por la tarde y dejar que el presupuesto decida cuánto se ejecuta hoy.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Controla el ritmo de todo un equipo de agentes',
          id: 'pace-a-team',
        },
        {
          type: 'paragraph',
          text: `Un <a href="/es/guias/coordinador-agentes-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">coordinador</a> puede abrir varias sesiones de trabajo a la vez, y cada una gasta la cuota de su proveedor. Un presupuesto diario por proveedor evita que un plan grande se gaste la semana en una tarde. Para ver el panorama completo de trabajar con agentes en paralelo, echa un ojo a la <a href="/es/guias/enjambre-de-agentes-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes de Claude Code</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es el límite semanal de Claude Code?',
      answer: 'Las suscripciones de Claude Code tienen una ventana corta de unas cinco horas y, por encima, un límite semanal. Cuando se acaba el semanal tienes que esperar al reinicio, aunque la ventana de cinco horas esté libre. El presupuesto diario de CodeAgentSwarm te ayuda a repartir ese límite semanal a lo largo de la semana.',
    },
    {
      question: '¿Cómo mide el uso el presupuesto diario?',
      answer: 'Usa las lecturas de cuota del propio proveedor. Un presupuesto diario del 15% en Claude significa que hoy puedes gastar como mucho 15 puntos de la ventana semanal. No hay conversión a dinero ni a tokens.',
    },
    {
      question: '¿Qué diferencia hay entre Daily y Smart pace?',
      answer: 'Daily aplica el mismo porcentaje todos los días. Smart pace divide lo que queda de la ventana entre los días que faltan para el reinicio, así que la parte diaria se adapta a cómo has usado la semana de verdad. Puedes ajustar el número de Smart pace o volver a la sugerencia con "auto".',
    },
    {
      question: '¿Cuenta el uso fuera de CodeAgentSwarm?',
      answer: 'Sí. El presupuesto lee la cuota real que te queda según el proveedor, así que el uso desde otras apps o dispositivos cuenta para hoy. Pero CodeAgentSwarm solo puede pausar el trabajo que ha lanzado él.',
    },
    {
      question: '¿Cuándo se reinicia el presupuesto diario?',
      answer: 'A medianoche en tu hora local, la de tu sistema. El reinicio semanal o mensual del proveedor va aparte. La excepción es el Hard cap opcional: espera al reinicio de la ventana del proveedor, no a la medianoche.',
    },
    {
      question: '¿Qué proveedores admiten presupuesto diario?',
      answer: 'Todos los que informan de una cuota medible: Claude, Codex, Antigravity, Kimi Code, Grok Build, Cursor Agent, Devin CLI y Muse Code. opencode y Pi no tienen presupuesto porque no informan de un porcentaje de cuota.',
    },
  ],
}

export default guide
