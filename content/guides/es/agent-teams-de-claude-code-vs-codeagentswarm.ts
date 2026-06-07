import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'agent-teams-de-claude-code-vs-codeagentswarm',
    locale: 'es',
    title: 'Agent Teams de Claude Code vs CodeAgentSwarm: cuál es la diferencia',
    metaTitle: 'Agent Teams de Claude Code vs CodeAgentSwarm: cuál es la diferencia (2026)',
    metaDescription: 'Los agent teams de Claude Code son subagentes dentro de una sola sesión de Claude. CodeAgentSwarm ejecuta varios agentes CLI independientes en paralelo. Esta es la diferencia real y cómo usar ambos.',
    intro: `Los agent teams de Claude Code y CodeAgentSwarm parecen competir, pero resuelven problemas distintos y funcionan bien juntos. Los agent teams son la función nativa de Anthropic para que una sola sesión de Claude genere sus propios subagentes y reparta una única tarea. CodeAgentSwarm es un espacio de trabajo de escritorio que ejecuta varias terminales CLI totalmente independientes en paralelo, cada una su propio proceso y conversación.

La confusión es comprensible. Ambos hablan de "varios agentes". La diferencia está en quién manda y en cuánta independencia tiene cada agente de verdad. Con los agent teams, una sola sesión de Claude orquesta ayudantes efímeros que comparten tu contexto y tu consumo. Con CodeAgentSwarm, tú mismo supervisas varias sesiones separadas, y pueden ser incluso de distintos proveedores.

Esta guía explica qué es cada cosa, cuándo recurrir a una o a otra, y por qué no tienes que elegir. Puedes ejecutar los agent teams nativos dentro de una terminal que aloja CodeAgentSwarm y quedarte con lo mejor de ambos.`,
    ctaText: 'Usa los agent teams de Claude Code para delegar dentro de una sesión, y CodeAgentSwarm para ejecutar varios agentes independientes en paralelo. Descarga CodeAgentSwarm y supervisa todo el espacio de trabajo desde un único sitio.',
    highlightedWords: ['Agent Teams de Claude Code', 'CodeAgentSwarm'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'claude-code-agent-teams-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una sola frase',
      content: [
        {
          type: 'image',
          alt: 'OpenAI Codex, Google Gemini CLI y Anthropic Claude Code ejecutándose lado a lado como tres terminales separadas e independientes en un mismo espacio de trabajo de CodeAgentSwarm',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'CodeAgentSwarm ejecuta agentes independientes en paralelo: Codex, Gemini CLI y Claude Code como procesos separados en un mismo espacio de trabajo. Los agent teams nativos, en cambio, viven dentro de una sola sesión de Claude.',
        },
        {
          type: 'paragraph',
          text: 'Los agent teams de Claude Code son subagentes dentro de una sola sesión de Claude Code que delegan partes de una única tarea, mientras que CodeAgentSwarm es un espacio de trabajo de escritorio que ejecuta varios agentes CLI independientes en paralelo, cada uno su propio proceso, conversación y (si quieres) proveedor.',
        },
        {
          type: 'paragraph',
          text: 'Esa es toda la comparación en una frase. Uno es delegación que ocurre dentro de una sesión que ya tienes abierta. El otro eres tú ejecutando y vigilando varias sesiones reales a la vez. Son complementarios, no rivales, y el resto de la guía explica por qué. Si primero quieres la visión global multiproveedor, la introducción al <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> pone el contexto.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'CodeAgentSwarm no es un proveedor de modelos. Funciona sobre tus suscripciones de Claude, OpenAI y Google que ya pagas. Los agent teams nativos también funcionan con tu plan de Claude. Ninguno de los dos añade una tarifa aparte de "multiagente".',
        },
      ],
    },
    {
      id: 'what-are-agent-teams',
      title: 'Qué son los agent teams de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Los agent teams de Claude Code (también descritos como subagentes o delegación tipo swarm) son una función nativa de <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>. A grandes rasgos, una sesión principal de Claude puede generar agentes ayudantes, dar a cada uno una parte del trabajo y volver a juntar sus resultados. Tú das una sola instrucción y Claude decide internamente cómo dividirla y delegarla.',
        },
        {
          type: 'paragraph',
          text: 'Los rasgos que la definen, descritos a alto nivel para no exagerar el funcionamiento interno: los ayudantes los genera y gestiona la sesión principal, suelen ser efímeros (se crean para la tarea y luego desaparecen), comparten tu contexto y tu consumo de Claude, y todo es autónomo. Tú no diriges cada ayudante a mano. Lo hace el agente principal.',
        },
        {
          type: 'list',
          items: [
            'Un proveedor, una sesión: todo ocurre dentro de un único proceso de Claude Code',
            'Delegación autónoma: el agente principal divide la tarea y reparte las piezas',
            'Contexto y consumo compartidos: los ayudantes beben de la misma conversación y del mismo plan de Claude',
            'Ayudantes efímeros: los subagentes se crean para hacer un trabajo y luego desaparecen',
            'Ideal para una tarea: cuando un único objetivo se divide de forma natural en partes paralelas',
          ],
        },
        {
          type: 'paragraph',
          text: 'Esto es realmente útil. Si una tarea se descompone con claridad (buscar en estos diez archivos en paralelo, redactar estos tres módulos, recopilar contexto de varios sitios a la vez), dejar que una sola sesión de Claude reparta el trabajo y lo recomponga es más rápido que hacerlo en serie tú mismo. Es delegación hecha por ti, dentro de la sesión que ya tienes abierta.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Piensa en los agent teams como un experto que puede clonarse a sí mismo para un trabajo. Los clones rinden cuentas a la misma persona, comparten los mismos apuntes y se disuelven cuando el trabajo termina. Las decisiones siguen saliendo de un único sitio.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es un espacio de trabajo de escritorio, para macOS y Windows, que ejecuta hasta seis terminales CLI independientes en paralelo. Cada terminal es su propio proceso y su propia conversación, y eliges el agente por terminal: Claude Code en una, Codex CLI en otra, Gemini CLI en una tercera. No comparten contexto entre ellas y tú las supervisas directamente.',
        },
        {
          type: 'paragraph',
          text: 'La clave es el paralelismo supervisado por una persona entre sesiones separadas, posiblemente entre proveedores distintos. No le pides a un agente que delegue. Ejecutas varios agentes reales a la vez, cada uno en su propia tarea, y el espacio de trabajo es la capa que mantiene todo legible. Si tu agente principal es Claude Code, la guía de <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de Claude Code</a> profundiza más, y también existe una guía paralela del <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Codex</a>.',
        },
        {
          type: 'list',
          items: [
            'Multiproveedor: combina Claude Code, Codex CLI y Gemini CLI en un mismo espacio, a tu elección por terminal',
            'Sesiones independientes: cada terminal es un proceso separado con su propia conversación y contexto',
            'Supervisado por ti: tú asignas y vigilas el trabajo, ningún agente está orquestando a los demás',
            'Notificaciones de escritorio: te avisa cuando cualquier agente termina o se detiene a preguntarte algo',
            'Historial con búsqueda: cada conversación, de cada agente y proveedor, guardada y buscable en un mismo sitio',
            'Diffs de archivos en vivo por terminal: observa lo que cambia cada agente, para ver pronto las ediciones que se solapan',
            'Control de permisos: el modo Turbo aprueba automáticamente las operaciones seguras y bloquea las peligrosas',
            'Un tablero de tareas compartido: un kanban que los propios agentes actualizan vía MCP a medida que trabajan',
          ],
        },
        {
          type: 'paragraph',
          text: 'Así que donde los agent teams son una sesión dividiendo una tarea, CodeAgentSwarm son varias sesiones ejecutando varias tareas, con la visibilidad y el control que necesitas para seguirles el ritmo a todas. Es la diferencia entre clonar a un experto para un trabajo y gestionar un pequeño equipo de especialistas que trabaja cada uno en lo suyo.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Una comparación honesta lado a lado, y cuándo usar cada una',
      content: [
        {
          type: 'paragraph',
          text: 'Ninguna de las dos es "mejor". Responden a preguntas distintas. Así se alinean en lo que de verdad importa, seguido de una regla sencilla para decidir.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cómo se relacionan los agentes',
          id: 'compare-relation',
        },
        {
          type: 'list',
          items: [
            '<strong>Agent teams de Claude Code:</strong> una sesión principal orquesta sus propios subagentes',
            '<strong>CodeAgentSwarm:</strong> varias sesiones independientes que tú supervisas en paralelo',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Quién tiene el control',
          id: 'compare-control',
        },
        {
          type: 'list',
          items: [
            '<strong>Agent teams de Claude Code:</strong> el agente principal, de forma autónoma',
            '<strong>CodeAgentSwarm:</strong> tú, directamente, por terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Proveedores',
          id: 'compare-vendors',
        },
        {
          type: 'list',
          items: [
            '<strong>Agent teams de Claude Code:</strong> solo Claude, dentro de una sola sesión de Claude',
            '<strong>CodeAgentSwarm:</strong> combina Claude Code, Codex CLI y Gemini CLI con libertad',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Contexto y consumo',
          id: 'compare-context',
        },
        {
          type: 'list',
          items: [
            '<strong>Agent teams de Claude Code:</strong> los ayudantes comparten tu contexto y tu consumo de Claude',
            '<strong>CodeAgentSwarm:</strong> cada terminal tiene su propio contexto y usa su propio plan de forma independiente',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mejor encaje',
          id: 'compare-fit',
        },
        {
          type: 'list',
          items: [
            '<strong>Agent teams de Claude Code:</strong> una tarea que se divide de forma natural en partes paralelas que quieres delegar',
            '<strong>CodeAgentSwarm:</strong> varias tareas separadas, o varios proyectos, que quieres ejecutar a la vez',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad y notificaciones',
          id: 'compare-visibility',
        },
        {
          type: 'list',
          items: [
            '<strong>Agent teams de Claude Code:</strong> la sesión principal informa en su propia salida',
            '<strong>CodeAgentSwarm:</strong> títulos dinámicos, notificaciones de escritorio, diffs en vivo e historial buscable entre todos los agentes',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'La regla práctica: recurre a los agent teams cuando tengas un objetivo que se descompone en piezas paralelas y te parezca bien que Claude las delegue por ti. Recurre a CodeAgentSwarm cuando tengas varios trabajos distintos en marcha, quieras combinar proveedores o simplemente quieras ver y controlar lo que hace cada agente a la vez. La mayoría de las semanas querrás ambos.',
        },
      ],
    },
    {
      id: 'use-both',
      title: '¿Puedes usar ambos a la vez? Sí.',
      content: [
        {
          type: 'paragraph',
          text: 'Esta es la parte que se le escapa a mucha gente: los agent teams y CodeAgentSwarm no son una cosa o la otra. Los agent teams nativos son una función de Claude Code, y CodeAgentSwarm ejecuta terminales de Claude Code. Así que puedes abrir una terminal en CodeAgentSwarm, arrancar Claude Code y dejar que esa sesión use agent teams internamente, mientras otras terminales ejecutan Codex, Gemini u otra sesión de Claude en paralelo.',
        },
        {
          type: 'paragraph',
          text: 'Un montaje realista: la terminal 1 es una sesión de Claude Code abordando una refactorización grande, y dentro de ella Claude usa agent teams para repartirse los archivos afectados. La terminal 2 es Codex CLI escribiendo tests para otro módulo. La terminal 3 es Gemini CLI leyendo y resumiendo una parte desconocida del código. La delegación nativa se encarga del interior de una tarea; CodeAgentSwarm se encarga de ejecutar y vigilar las tres a la vez.',
        },
        {
          type: 'list',
          items: [
            'Ejecuta agent teams dentro de cualquier terminal de Claude Code que aloje CodeAgentSwarm',
            'Deja que otras terminales ejecuten tareas distintas, o proveedores distintos, en paralelo',
            'Recibe una notificación cuando la sesión de Claude (con teams y todo) termina, igual que con cualquier otro agente',
            'Mantén el historial buscable y los diffs en vivo en todo, incluida la sesión guiada por teams',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'La delegación nativa se encarga del interior de una tarea. CodeAgentSwarm se encarga del exterior, ejecutando y supervisando varias tareas a la vez. Apilar ambos te da reparto autónomo dentro de un trabajo y supervisión humana entre trabajos.',
        },
        {
          type: 'paragraph',
          text: 'Así que la respuesta honesta a "¿agent teams o CodeAgentSwarm?" suele ser "ambos, para cosas distintas". Anthropic construyó una forma sólida de delegar dentro de una sesión. CodeAgentSwarm te da una forma de ejecutar varias sesiones, entre proveedores, sin perder de vista ninguna.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué son los agent teams de Claude Code?',
      answer: 'Los agent teams de Claude Code son una función nativa de Claude Code en la que una sesión principal de Claude genera sus propios subagentes (agentes ayudantes) para dividir una única tarea. Los ayudantes son autónomos, efímeros y comparten tu contexto y tu consumo de Claude. Es delegación que ocurre dentro de una sola sesión y un solo proveedor, gestionada por el agente principal y no por ti.',
    },
    {
      question: '¿Cuál es la diferencia entre los agent teams de Claude Code y CodeAgentSwarm?',
      answer: 'Los agent teams de Claude Code son subagentes dentro de una sola sesión de Claude que delegan partes de una única tarea de forma autónoma. CodeAgentSwarm es un espacio de trabajo de escritorio que ejecuta varios agentes CLI independientes en paralelo, cada uno su propio proceso y conversación, que tú supervisas directamente y que pueden ser de distintos proveedores (Claude Code, Codex, Gemini). Uno es delegación dentro de una sesión; el otro es ejecutar y vigilar varias sesiones separadas a la vez.',
    },
    {
      question: '¿Es CodeAgentSwarm una alternativa a los agent teams de Claude?',
      answer: 'No exactamente, porque resuelven problemas distintos. Los agent teams delegan partes de una tarea dentro de una sola sesión de Claude. CodeAgentSwarm ejecuta varias sesiones independientes en paralelo bajo tu supervisión. Son complementarios: puedes ejecutar agent teams nativos dentro de una terminal de Claude Code que aloja CodeAgentSwarm, mientras otras terminales se ocupan de otras tareas u otros proveedores.',
    },
    {
      question: '¿Puedo usar los agent teams de Claude Code dentro de CodeAgentSwarm?',
      answer: 'Sí. Los agent teams son una función de Claude Code, y CodeAgentSwarm ejecuta terminales de Claude Code. Abre una terminal, arranca Claude Code y esa sesión puede usar agent teams internamente igual que lo haría por su cuenta. Mientras tanto, tus otras terminales pueden ejecutar Codex, Gemini u otra sesión de Claude en paralelo, todo vigilado desde un mismo espacio de trabajo.',
    },
    {
      question: '¿El modo swarm de Claude Code cuesta más?',
      answer: 'No hay tarifa aparte para ninguno de los dos enfoques. Los agent teams nativos funcionan con tu plan de Claude actual y beben del mismo consumo que la sesión principal. CodeAgentSwarm funciona sobre las suscripciones que ya pagas y no es un proveedor de modelos, así que cada terminal usa tu propio plan de Claude, OpenAI o Google de forma independiente. Ejecutar agentes en paralelo termina el trabajo antes, no añade un recargo por agente.',
    },
    {
      question: '¿Cuándo debería usar agent teams y cuándo CodeAgentSwarm?',
      answer: 'Usa los agent teams de Claude Code cuando tengas un objetivo que se divide de forma natural en piezas paralelas y quieras que Claude las delegue por ti. Usa CodeAgentSwarm cuando tengas varias tareas o proyectos distintos a la vez, cuando quieras combinar proveedores, o cuando quieras notificaciones, historial buscable, diffs de archivos en vivo y control directo sobre cada agente. Muchos desarrolladores usan ambos, con agent teams dentro de las terminales individuales que ejecuta CodeAgentSwarm.',
    },
    {
      question: '¿Los subagentes de Claude Code son lo mismo que ejecutar varias sesiones de Claude Code?',
      answer: 'No. Los subagentes (agent teams) viven dentro de una sola sesión de Claude Code y los gestiona el agente principal, compartiendo su contexto y su consumo. Ejecutar varias sesiones de Claude Code significa lanzar varios procesos de Claude independientes, cada uno con su propio contexto y conversación, que tú mismo supervisas. CodeAgentSwarm está pensado para el segundo caso, permitiéndote ejecutar hasta seis terminales independientes lado a lado.',
    },
  ],
}

export default guide
