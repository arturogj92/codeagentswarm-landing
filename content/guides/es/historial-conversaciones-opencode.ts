import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-opencode',
    locale: 'es',
    title: 'Historial de conversaciones de OpenCode: cómo encontrarlo y retomarlo',
    metaTitle: 'Historial de conversaciones de OpenCode: ver y retomar sesiones (2026)',
    metaDescription: 'Encuentra el historial de conversaciones de opencode, retoma la última sesión con --continue o una concreta con --session, y busca cualquier conversación de opencode por palabra clave entre proyectos.',
    intro: `opencode guarda un historial de tus sesiones. Cada conversación se almacena en local mientras trabajas, y puedes retomar una anterior para continuar donde lo dejaste. Retoma la sesión más reciente con \`opencode --continue\`, o salta directamente a una concreta con \`opencode --session <id>\`. Solo eso ya te ahorra tener que explicarle el mismo módulo a opencode una y otra vez.

La limitación aparece cuando acumulas decenas de sesiones de opencode repartidas en varios proyectos. El historial nativo está bien para continuar tu última conversación, pero no tiene búsqueda por contenido, no muestra de qué iba realmente cada sesión y te obliga a recordar ids de sesión para llegar a cualquier cosa más allá de la última.

En resumen: tu historial de opencode ya está en tu máquina y puedes retomarlo. CodeAgentSwarm convierte ese historial en una memoria buscable y multiproyecto que puedes retomar desde cualquier terminal, aunque la conversación pertenezca a otra sesión de opencode, a otro proyecto o incluso a otro agente.`,
    ctaText: 'Deja de revisar tus sesiones de opencode una por una. Busca todo tu historial de opencode por palabra clave y retoma la conversación correcta desde cualquier terminal en CodeAgentSwarm.',
    highlightedWords: ['historial', 'OpenCode', 'retomar'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'opencode-conversation-history',
  },
  sections: [
    {
      id: 'que-es-historial-opencode',
      title: 'Qué es el historial de conversaciones de opencode',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: opencode guarda tus sesiones en local mientras trabajas. Retoma la última con <code>opencode --continue</code> o una concreta con <code>opencode --session &lt;id&gt;</code>. El resto de la guía muestra cómo retomar de forma nativa y cómo hacer buscable cada conversación de opencode en todos tus proyectos.',
        },
        {
          type: 'image',
          alt: 'Historial de conversaciones buscable de CodeAgentSwarm mostrando sesiones pasadas de opencode organizadas por proyecto con buscador y fechas',
          src: '/images/guides/conversation-history.png',
          caption: 'Historial de conversaciones buscable en CodeAgentSwarm, con tus sesiones de opencode organizadas por proyecto y fecha.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'El historial de conversaciones de opencode es el registro de tus sesiones pasadas con el agente: lo que pediste, lo que hizo opencode y el contexto que se fue acumulando por el camino. Como cada sesión de opencode es su propia conversación, ese historial es justo lo que te permite volver a un trabajo más tarde en lugar de explicarlo todo desde cero.',
        },
        {
          type: 'paragraph',
          text: 'Si ya usas <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a>, el agente de terminal de código abierto de SST, seguramente has retomado una sesión anterior alguna vez. Ese resume nativo es muy útil, pero está pensado para el caso simple: volver a una conversación reciente. En cuanto acumulas muchas sesiones de opencode en varios proyectos, necesitas una forma de encontrar la correcta, y ahí es donde sigue esta guía.',
        },
      ],
    },
    {
      id: 'historial-nativo-opencode',
      title: 'Historial y resume nativo de opencode',
      content: [
        {
          type: 'paragraph',
          text: 'opencode almacena tus sesiones en tu máquina mientras trabajas, así que una conversación no se pierde en cuanto cierras el terminal. A diferencia de otros agentes, opencode incluye comandos de resume claros, así que no tienes que adivinar flags: continúa tu sesión más reciente o abre una concreta por su id.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Retoma tu sesión de opencode más reciente
opencode --continue    # forma corta: -c

# Retoma una sesión concreta por su id
opencode --session <session-id>    # forma corta: -s`,
        },
        {
          type: 'paragraph',
          text: 'En la práctica, esto significa que puedes:',
        },
        {
          type: 'list',
          items: [
            'Volver a tu última sesión con <code>opencode --continue</code> y seguir donde paraste',
            'Elegir una sesión concreta con <code>opencode --session &lt;id&gt;</code> si conoces su id',
            'Conservar el contexto que construyó una sesión: decisiones, explicaciones y la forma del código que discutisteis',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'opencode es agnóstico de proveedor y se configura desde <code>~/.config/opencode/opencode.json</code>. Dónde se guardan exactamente las sesiones en disco, y cualquier herramienta extra de historial, están en la documentación oficial de opencode. Los comandos de resume de arriba son la parte que usas en el día a día.',
        },
        {
          type: 'paragraph',
          text: 'Es la misma idea que retomar una conversación de Claude Code, pero para opencode. Si también usas Claude Code, la guía hermana sobre el <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones de Claude Code</a> cubre el flujo equivalente para ese agente.',
        },
      ],
    },
    {
      id: 'el-problema',
      title: 'Dónde empieza a molestar el historial nativo de opencode',
      content: [
        {
          type: 'paragraph',
          text: 'El resume nativo es perfecto cuando la conversación que quieres es la última. <code>opencode --continue</code> clava ese caso. La fricción empieza cuando no lo es. En cuanto usas opencode en serio, en varios proyectos y con muchas sesiones, las limitaciones se acumulan rápido:',
        },
        {
          type: 'list',
          items: [
            '<strong>Sin búsqueda por contenido.</strong> No puedes buscar "esa sesión de migración de base de datos de la semana pasada" en tu historial de opencode. Te toca recordar qué sesión era.',
            '<strong>Necesitas el id de la sesión.</strong> Retomar una sesión concreta implica pasar <code>--session &lt;id&gt;</code>, y los ids de sesión no se memorizan. Más allá de la última conversación, primero tienes que cazar el id antes de poder retomar.',
            '<strong>Sin vista previa del contenido.</strong> Un id o una lista pelada dicen poco de lo que contenía una sesión, así que abres la equivocada y vuelves atrás más de una vez.',
            '<strong>Sin vista multiproyecto.</strong> El historial queda anclado a donde corrió la sesión. Encontrar trabajo de otro proyecto implica ir allí primero.',
            '<strong>Sin vista entre agentes.</strong> Si además usas Claude Code o Codex, cada agente guarda su propio historial en su propio sitio, así que no hay un único lugar donde mirar.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si usas opencode en un proyecto de vez en cuando, nada de esto importa. Si opencode forma parte de tu día a día en muchos repositorios, empiezas a perder tiempo de verdad solo intentando encontrar la conversación que quieres retomar.',
        },
      ],
    },
    {
      id: 'historial-buscable-codeagentswarm',
      title: 'Historial de opencode buscable entre agentes con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> ejecuta tus agentes de opencode en un escritorio y lee las sesiones que opencode ya guarda en local: lo que escribiste, lo que hizo opencode, en qué proyecto estabas y cuándo ocurrió. Ese registro se convierte en un historial buscable que funciona en todos los proyectos y, lo importante, entre todos los agentes. La misma vista reúne tus conversaciones de opencode, Claude Code y Codex.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Búsqueda por contenido en cada conversación de opencode',
          id: 'busqueda-por-contenido',
        },
        {
          type: 'paragraph',
          text: 'Escribe lo que recuerdes - el nombre de un módulo, un bug, una tecnología - y CodeAgentSwarm busca dentro del contenido de todas tus conversaciones, no solo en los títulos. Los resultados muestran el título, el proyecto, la fecha y los mensajes que coinciden, para que confirmes que es la sesión de opencode correcta antes de abrirla. Sin necesidad de ningún id de sesión.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Filtra por proyecto',
          id: 'filtra-por-proyecto',
        },
        {
          type: 'paragraph',
          text: 'Las conversaciones se organizan por proyecto, cada uno con su color, así que un historial largo sigue siendo legible. Cuando trabajas en varios repositorios a la vez, puedes filtrar por un único proyecto y ver solo las sesiones de opencode que le pertenecen, en lugar de una lista plana gigante.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Funciona entre agentes, no solo con opencode',
          id: 'entre-agentes',
        },
        {
          type: 'paragraph',
          text: 'Como CodeAgentSwarm te deja elegir el agente por terminal, tu historial no queda aislado por herramienta. Busca "refactor de auth" y verás la sesión de opencode donde lo empezaste y la de Claude Code donde lo terminaste, una al lado de la otra. Para la visión completa de ejecutar agentes mezclados, mira el resumen del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>, y para opencode en concreto la guía del <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes opencode</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Retoma desde cualquier terminal',
          id: 'retoma-cualquier-terminal',
        },
        {
          type: 'paragraph',
          text: '¿Has encontrado la conversación que necesitas? Ábrela y CodeAgentSwarm la recupera con su contexto previo, en cualquier terminal, sin importar en qué proyecto empezó. No tienes que navegar hasta un directorio ni pegar un id de sesión a mano. Buscas, seleccionas y sigues trabajando.',
        },
      ],
    },
    {
      id: 'como-abrir-historial',
      title: 'Cómo abrir tu historial de opencode desde cualquier terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Estés en el terminal de opencode que estés, el historial está a un clic:',
        },
        {
          type: 'list',
          items: [
            'En cualquier terminal, pulsa el botón "Historial".',
            'Se abre un modal con tus conversaciones recientes de todos los proyectos y agentes.',
            'Desde ahí puedes buscar por contenido, filtrar por proyecto y abrir cualquier conversación.',
          ],
        },
        {
          type: 'image',
          alt: 'Modal de historial abierto desde un terminal de opencode en CodeAgentSwarm con un buscador arriba y una lista de conversaciones pasadas debajo',
          src: '/images/guides/conversation-history-button.png',
          caption: 'El botón Historial te da acceso inmediato a cada conversación pasada de opencode, con búsqueda y filtros por proyecto.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'retomar-conversacion-opencode',
      title: 'Cómo retomar una conversación pasada de opencode',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando abres un proyecto en CodeAgentSwarm puedes elegir el modo retomar en lugar de empezar una conversación en blanco. En modo retomar ves todas tus conversaciones recientes de ese proyecto y eliges exactamente qué sesión de opencode continuar.',
        },
        {
          type: 'paragraph',
          text: 'Desde esa vista puedes:',
        },
        {
          type: 'list',
          items: [
            'Ver todas tus conversaciones anteriores organizadas por fecha',
            'Buscar por contenido para encontrar una sesión concreta, no solo recorrer la lista',
            'Elegir exactamente qué conversación de opencode continuar',
            'O empezar una conversación nueva si es lo que prefieres',
          ],
        },
        {
          type: 'image',
          alt: 'Una conversación pasada de opencode reabierta en un terminal de CodeAgentSwarm con los mensajes previos visibles y el campo de entrada listo para continuar',
          src: '/images/guides/resume-conversation.png',
          caption: 'Retoma cualquier conversación de opencode justo donde la dejaste, con su contexto previo cargado.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Si buscaste primero, al seleccionar una conversación se muestran los mensajes donde aparecen tus términos de búsqueda, para que confirmes que es la correcta antes de abrirla. Una vez la eliges, CodeAgentSwarm la reabre con el contexto previo, de modo que opencode recuerda lo que decidisteis y lo que construisteis, y sigues como si no hubiera pasado el tiempo.',
        },
      ],
    },
    {
      id: 'por-que-importa',
      title: 'Por qué el historial de opencode cambia tu forma de trabajar',
      content: [
        {
          type: 'paragraph',
          text: 'Tratar tu historial de opencode como una memoria buscable, y no como un montón de sesiones viejas, tiene un efecto directo en el día a día:',
        },
        {
          type: 'list',
          items: [
            '<strong>Deja de reexplicar módulos.</strong> Si dedicaste quince minutos a darle a opencode el contexto de tu capa de auth, retoma esa sesión en vez de explicarla otra vez desde cero.',
            '<strong>Mantén las decisiones coherentes.</strong> Las decisiones de arquitectura se acumulan entre sesiones. Retomar la correcta evita que contradigas una decisión que tomaste hace días.',
            '<strong>Ahorra tokens y tiempo.</strong> Reexplicar contexto consume ambos. Continuar una sesión que ya lo tiene es más barato y más rápido.',
            '<strong>Lleva muchos proyectos con calma.</strong> Cuando puedes buscar y retomar cualquier conversación de opencode de cualquier proyecto, cambiar de repositorio deja de ser un impuesto de contexto.',
            '<strong>No pierdas nunca un arreglo.</strong> Esa solución ingeniosa de anoche está en tu historial. Búscala, retómala, reúsala.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El historial rinde aún más cuando ejecutas varios agentes de opencode a la vez. Si esa es tu configuración, la guía sobre <a href="/es/guias/ejecutar-multiples-sesiones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de opencode</a> explica cómo mantener un enjambre organizado.',
        },
      ],
    },
    {
      id: 'nativo-vs-codeagentswarm',
      title: 'Resume nativo de opencode vs historial de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Ambos te dejan retomar una conversación pasada de opencode. La diferencia es lo fácil que es encontrar la correcta cuando tienes muchas:',
        },
        {
          type: 'list',
          items: [
            '<strong>Retomar tu última sesión:</strong> opencode nativo lo resuelve bien con <code>--continue</code>.',
            '<strong>Encontrar una sesión antigua por palabra clave:</strong> el nativo te obliga a conocer el id para <code>--session</code>; CodeAgentSwarm busca dentro del contenido.',
            '<strong>Trabajar entre proyectos:</strong> el historial nativo queda anclado a donde corrió la sesión; CodeAgentSwarm te da una vista única multiproyecto.',
            '<strong>Trabajar entre agentes:</strong> cada CLI guarda su propio historial; CodeAgentSwarm reúne las conversaciones de opencode, Claude Code y Codex.',
            '<strong>Retomar desde cualquier sitio:</strong> el nativo implica navegar hasta el lugar correcto; CodeAgentSwarm retoma cualquier conversación desde cualquier terminal.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si solo vuelves a tu sesión de opencode más reciente, el resume nativo es todo lo que necesitas. En cuanto te pones a buscar "¿en qué sesión arreglé eso?", el historial buscable es la mejor respuesta.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿opencode guarda el historial de conversaciones?',
      answer: 'Sí. opencode conserva tus sesiones en local mientras trabajas, así que una conversación no se pierde al cerrar el terminal. Retoma la más reciente con opencode --continue, o una concreta con opencode --session <id>, para continuarla con su contexto previo.',
    },
    {
      question: '¿Cómo retomo una sesión anterior de opencode?',
      answer: 'Ejecuta opencode --continue (forma corta -c) para retomar tu sesión más reciente, o opencode --session <id> (forma corta -s) para retomar una concreta por su id. En CodeAgentSwarm abres la vista de Historial o el modo retomar, encuentras la conversación y la reabres en cualquier terminal con su contexto previo cargado.',
    },
    {
      question: '¿Dónde se guarda el historial de opencode?',
      answer: 'opencode almacena las sesiones en local en tu máquina, y la ubicación exacta está en la documentación oficial de opencode. CodeAgentSwarm lee esas sesiones para que puedas buscar y retomar entre proyectos y agentes sin tocar rutas de archivos.',
    },
    {
      question: '¿Puedo buscar en todas mis conversaciones de opencode?',
      answer: 'El historial nativo de opencode no tiene búsqueda por contenido, así que dependes de los ids de sesión o de la memoria. CodeAgentSwarm ofrece búsqueda por contenido instantánea en cada conversación de opencode, en todos los proyectos, con vista previa de los mensajes para confirmar la sesión correcta antes de abrirla.',
    },
    {
      question: '¿El historial de opencode funciona entre distintos proyectos?',
      answer: 'El historial nativo de opencode queda anclado a donde corrió cada sesión, así que encontrar trabajo de otro proyecto implica ir allí primero. CodeAgentSwarm organiza las conversaciones por proyecto, te deja filtrar por uno y retoma cualquiera desde cualquier terminal.',
    },
    {
      question: '¿Puedo ver juntos el historial de opencode y de Claude Code?',
      answer: 'Sí, en CodeAgentSwarm. Como eliges el agente por terminal, el historial no queda aislado por herramienta. La misma vista buscable reúne tus conversaciones de opencode, Claude Code y Codex, así que puedes rastrear y retomar el trabajo sin importar qué agente lo hizo.',
    },
  ],
}

export default guide
