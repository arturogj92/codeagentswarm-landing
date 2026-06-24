import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-codex',
    locale: 'es',
    title: 'Cómo ver y retomar el historial de conversaciones de Codex CLI',
    metaTitle: 'Cómo ver y retomar el historial de conversaciones de Codex CLI (2026)',
    metaDescription: 'Cómo encontrar el historial de conversaciones de Codex CLI, retomar una sesión anterior y buscar cualquier conversación de Codex por palabra clave. Resume nativo de Codex más el historial buscable de CodeAgentSwarm para todos tus agentes.',
    intro: `Codex CLI guarda un historial de tus sesiones. Cada conversación se almacena en local mientras trabajas, y puedes retomar una sesión anterior para continuar donde lo dejaste en lugar de empezar de cero cada vez. Solo eso ya te ahorra tener que explicarle el mismo módulo a Codex una y otra vez.

La limitación aparece cuando acumulas decenas de sesiones de Codex repartidas en varios proyectos. El historial nativo está bien para volver a tu última conversación, pero no tiene búsqueda por contenido, no muestra de qué iba realmente cada sesión y no ofrece una vista única que cruce todos los proyectos.

En resumen: tu historial de Codex CLI ya está en tu máquina y puedes retomarlo. CodeAgentSwarm convierte ese historial en una memoria buscable y multiproyecto que puedes retomar desde cualquier terminal, aunque la conversación pertenezca a otra sesión de Codex, a otro proyecto o incluso a otro agente.`,
    ctaText: 'Deja de revisar tus sesiones de Codex una por una. Busca todo tu historial de Codex CLI por palabra clave y retoma la conversación correcta desde cualquier terminal en CodeAgentSwarm.',
    highlightedWords: ['historial', 'Codex CLI', 'retomar'],
    publishedAt: '2026-06-24',
    updatedAt: '2026-06-24',
    alternateSlug: 'codex-cli-conversation-history',
  },
  sections: [
    {
      id: 'que-es-historial-codex',
      title: 'Qué es el historial de conversaciones de Codex CLI',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: Codex CLI guarda tus sesiones en local mientras trabajas, y puedes retomar una sesión anterior para continuarla con su contexto previo intacto. El resto de la guía muestra cómo retomar de forma nativa y cómo hacer buscable cada conversación de Codex en todos tus proyectos.',
        },
        {
          type: 'image',
          alt: 'Historial de conversaciones buscable de CodeAgentSwarm mostrando sesiones pasadas de Codex CLI organizadas por proyecto con buscador y fechas',
          src: '/images/guides/conversation-history.png',
          caption: 'Historial de conversaciones buscable en CodeAgentSwarm, con tus sesiones de Codex organizadas por proyecto y fecha.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'El historial de conversaciones de Codex CLI es el registro de tus sesiones pasadas con el agente: lo que pediste, lo que hizo Codex y el contexto que se fue acumulando por el camino. Como cada sesión de Codex es su propio proceso con su propia conversación, ese historial es justo lo que te permite volver a un trabajo más tarde en lugar de explicarlo todo desde cero.',
        },
        {
          type: 'paragraph',
          text: 'Si ya usas <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, seguramente has retomado una sesión anterior alguna vez. Ese resume nativo es muy útil, pero está pensado para el caso simple: volver a una conversación reciente. En cuanto acumulas muchas sesiones de Codex en varios proyectos, necesitas una forma de encontrar la correcta, y ahí es donde sigue esta guía.',
        },
      ],
    },
    {
      id: 'historial-nativo-codex',
      title: 'Historial y resume nativo de Codex CLI',
      content: [
        {
          type: 'paragraph',
          text: 'Codex CLI almacena tus sesiones en tu máquina mientras trabajas, así que una conversación no se pierde en cuanto cierras el terminal. La capacidad central que tienes de serie es poder retomar una sesión anterior: en lugar de abrir una conversación nueva, continúas una existente con su contexto acumulado.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica, esto significa que puedes:',
        },
        {
          type: 'list',
          items: [
            'Retomar tu sesión de Codex más reciente y seguir donde paraste',
            'Elegir una sesión anterior para continuarla, en vez de empezar siempre de cero',
            'Conservar el contexto que construyó una sesión: decisiones, explicaciones y la forma del código que discutisteis',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Los flags de resume y las rutas de almacenamiento cambian entre versiones de Codex CLI, así que consulta <code>codex --help</code> y la documentación oficial de Codex para el comando exacto de tu versión. La capacidad es constante: Codex conserva tus sesiones y te deja continuar una anterior.',
        },
        {
          type: 'paragraph',
          text: 'Es la misma idea que retomar una conversación de Claude Code, pero para Codex. Si también usas Claude Code, la guía hermana sobre el <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones de Claude Code</a> cubre el flujo equivalente para ese agente.',
        },
      ],
    },
    {
      id: 'el-problema',
      title: 'Dónde empieza a molestar el historial nativo de Codex',
      content: [
        {
          type: 'paragraph',
          text: 'El resume nativo es perfecto cuando la conversación que quieres es la última o está cerca. La fricción empieza cuando no lo es. En cuanto usas Codex en serio, en varios proyectos y con muchas sesiones, las limitaciones se acumulan rápido:',
        },
        {
          type: 'list',
          items: [
            '<strong>Sin búsqueda por contenido.</strong> No puedes buscar "esa sesión de migración de base de datos de la semana pasada" en tu historial de Codex. Te toca recorrer una lista o recordar qué sesión era.',
            '<strong>Sin vista previa del contenido.</strong> Una lista de sesiones dice poco de lo que contenía cada una, así que abres la equivocada y vuelves atrás más de una vez.',
            '<strong>Sin vista multiproyecto.</strong> El historial queda anclado a donde corrió la sesión. Encontrar trabajo de otro proyecto implica ir allí primero.',
            '<strong>Sin filtros.</strong> No puedes acotar por proyecto, por fecha ni por el tema de la conversación.',
            '<strong>Sin vista entre agentes.</strong> Si además usas Claude Code o Gemini CLI, cada agente guarda su propio historial en su propio sitio, así que no hay un único lugar donde mirar.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si usas Codex en un proyecto de vez en cuando, nada de esto importa. Si Codex forma parte de tu día a día en muchos repositorios, empiezas a perder tiempo de verdad solo intentando encontrar la conversación que quieres retomar.',
        },
      ],
    },
    {
      id: 'historial-buscable-codeagentswarm',
      title: 'Historial de Codex buscable entre agentes con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> ejecuta tus agentes de Codex CLI en un escritorio y guarda cada conversación de forma automática: lo que escribiste, lo que hizo Codex, en qué proyecto estabas y cuándo ocurrió. Ese registro se convierte en un historial buscable que funciona en todos los proyectos y, lo importante, entre todos los agentes. La misma vista reúne tus conversaciones de Codex, Claude Code y Gemini CLI.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Búsqueda por contenido en cada conversación de Codex',
          id: 'busqueda-por-contenido',
        },
        {
          type: 'paragraph',
          text: 'Escribe lo que recuerdes - el nombre de un módulo, un bug, una tecnología - y CodeAgentSwarm busca dentro del contenido de todas tus conversaciones, no solo en los títulos. Los resultados muestran el título, el proyecto, la fecha y los mensajes que coinciden, para que confirmes que es la sesión de Codex correcta antes de abrirla.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Filtra por proyecto',
          id: 'filtra-por-proyecto',
        },
        {
          type: 'paragraph',
          text: 'Las conversaciones se organizan por proyecto, cada uno con su color, así que un historial largo sigue siendo legible. Cuando trabajas en varios repositorios a la vez, puedes filtrar por un único proyecto y ver solo las sesiones de Codex que le pertenecen, en lugar de una lista plana gigante.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Funciona entre agentes, no solo con Codex',
          id: 'entre-agentes',
        },
        {
          type: 'paragraph',
          text: 'Como CodeAgentSwarm te deja elegir el agente por terminal, tu historial no queda aislado por herramienta. Busca "refactor de auth" y verás la sesión de Codex donde lo empezaste y la de Claude Code donde lo terminaste, una al lado de la otra. Para la visión completa de ejecutar agentes mezclados, mira el resumen del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>, y para Codex en concreto la guía del <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Codex</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Retoma desde cualquier terminal',
          id: 'retoma-cualquier-terminal',
        },
        {
          type: 'paragraph',
          text: '¿Has encontrado la conversación que necesitas? Ábrela y CodeAgentSwarm la recupera con su contexto previo, en cualquier terminal, sin importar en qué proyecto empezó. No tienes que navegar hasta un directorio ni recordar un id de sesión a mano. Buscas, seleccionas y sigues trabajando.',
        },
      ],
    },
    {
      id: 'como-abrir-historial',
      title: 'Cómo abrir tu historial de Codex desde cualquier terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Estés en el terminal de Codex que estés, el historial está a un clic:',
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
          alt: 'Modal de historial abierto desde un terminal de Codex en CodeAgentSwarm con un buscador arriba y una lista de conversaciones pasadas debajo',
          src: '/images/guides/conversation-history-button.png',
          caption: 'El botón Historial te da acceso inmediato a cada conversación pasada de Codex, con búsqueda y filtros por proyecto.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'retomar-conversacion-codex',
      title: 'Cómo retomar una conversación pasada de Codex',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando abres un proyecto en CodeAgentSwarm puedes elegir el modo retomar en lugar de empezar una conversación en blanco. En modo retomar ves todas tus conversaciones recientes de ese proyecto y eliges exactamente qué sesión de Codex continuar.',
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
            'Elegir exactamente qué conversación de Codex continuar',
            'O empezar una conversación nueva si es lo que prefieres',
          ],
        },
        {
          type: 'image',
          alt: 'Una conversación pasada de Codex reabierta en un terminal de CodeAgentSwarm con los mensajes previos visibles y el campo de entrada listo para continuar',
          src: '/images/guides/resume-conversation.png',
          caption: 'Retoma cualquier conversación de Codex justo donde la dejaste, con su contexto previo cargado.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Si buscaste primero, al seleccionar una conversación se muestran los mensajes donde aparecen tus términos de búsqueda, para que confirmes que es la correcta antes de abrirla. Una vez la eliges, CodeAgentSwarm la reabre con el contexto previo, de modo que Codex recuerda lo que decidisteis y lo que construisteis, y sigues como si no hubiera pasado el tiempo.',
        },
      ],
    },
    {
      id: 'por-que-importa',
      title: 'Por qué el historial de Codex cambia tu forma de trabajar',
      content: [
        {
          type: 'paragraph',
          text: 'Tratar tu historial de Codex como una memoria buscable, y no como un montón de sesiones viejas, tiene un efecto directo en el día a día:',
        },
        {
          type: 'list',
          items: [
            '<strong>Deja de reexplicar módulos.</strong> Si dedicaste quince minutos a darle a Codex el contexto de tu capa de auth, retoma esa sesión en vez de explicarla otra vez desde cero.',
            '<strong>Mantén las decisiones coherentes.</strong> Las decisiones de arquitectura se acumulan entre sesiones. Retomar la correcta evita que contradigas una decisión que tomaste hace días.',
            '<strong>Ahorra tokens y tiempo.</strong> Reexplicar contexto consume ambos. Continuar una sesión que ya lo tiene es más barato y más rápido.',
            '<strong>Lleva muchos proyectos con calma.</strong> Cuando puedes buscar y retomar cualquier conversación de Codex de cualquier proyecto, cambiar de repositorio deja de ser un impuesto de contexto.',
            '<strong>No pierdas nunca un arreglo.</strong> Esa solución ingeniosa de anoche está en tu historial. Búscala, retómala, reúsala.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El historial rinde aún más cuando ejecutas varios agentes de Codex a la vez. Si esa es tu configuración, la guía sobre <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de Codex</a> explica cómo mantener un enjambre organizado.',
        },
      ],
    },
    {
      id: 'nativo-vs-codeagentswarm',
      title: 'Resume nativo de Codex vs historial de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Ambos te dejan retomar una conversación pasada de Codex. La diferencia es lo fácil que es encontrar la correcta cuando tienes muchas:',
        },
        {
          type: 'list',
          items: [
            '<strong>Retomar tu última sesión:</strong> Codex nativo lo resuelve bien por sí solo.',
            '<strong>Encontrar una sesión antigua por palabra clave:</strong> el nativo no tiene búsqueda por contenido; CodeAgentSwarm busca dentro del contenido.',
            '<strong>Trabajar entre proyectos:</strong> el historial nativo queda anclado a donde corrió la sesión; CodeAgentSwarm te da una vista única multiproyecto.',
            '<strong>Trabajar entre agentes:</strong> cada CLI guarda su propio historial; CodeAgentSwarm reúne las conversaciones de Codex, Claude Code y Gemini.',
            '<strong>Retomar desde cualquier sitio:</strong> el nativo implica navegar hasta el lugar correcto; CodeAgentSwarm retoma cualquier conversación desde cualquier terminal.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si solo vuelves a tu sesión de Codex más reciente, el resume nativo es todo lo que necesitas. En cuanto te pones a buscar "¿en qué sesión arreglé eso?", el historial buscable es la mejor respuesta.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Codex CLI guarda el historial de conversaciones?',
      answer: 'Sí. Codex CLI conserva tus sesiones en local mientras trabajas, así que una conversación no se pierde al cerrar el terminal. Puedes retomar una sesión anterior para continuarla con su contexto previo. Consulta codex --help y la documentación oficial de Codex para el comando exacto de retomar en tu versión.',
    },
    {
      question: '¿Cómo retomo una sesión anterior de Codex?',
      answer: 'De forma nativa, Codex CLI te permite retomar una sesión pasada para continuarla en lugar de empezar de cero. El flag exacto depende de tu versión de Codex, así que consulta codex --help. En CodeAgentSwarm abres la vista de Historial o el modo retomar, encuentras la conversación y la reabres en cualquier terminal con su contexto previo cargado.',
    },
    {
      question: '¿Dónde se guarda el historial de Codex CLI?',
      answer: 'Codex CLI almacena las sesiones en local en tu máquina, y la ubicación exacta puede cambiar entre versiones, así que confírmala en la documentación oficial de Codex para tu instalación. CodeAgentSwarm guarda su propia copia buscable de cada conversación para que puedas buscar y retomar entre proyectos y agentes sin depender de rutas de archivos.',
    },
    {
      question: '¿Puedo buscar en todas mis conversaciones de Codex?',
      answer: 'El historial nativo de Codex no tiene búsqueda por contenido, así que recorres la lista o tiras de memoria. CodeAgentSwarm ofrece búsqueda por contenido instantánea en cada conversación de Codex, en todos los proyectos, con vista previa de los mensajes para confirmar la sesión correcta antes de abrirla.',
    },
    {
      question: '¿El historial de Codex funciona entre distintos proyectos?',
      answer: 'El historial nativo de Codex queda anclado a donde corrió cada sesión, así que encontrar trabajo de otro proyecto implica ir allí primero. CodeAgentSwarm organiza las conversaciones por proyecto, te deja filtrar por uno y retoma cualquiera desde cualquier terminal.',
    },
    {
      question: '¿Puedo ver juntos el historial de Codex y de Claude Code?',
      answer: 'Sí, en CodeAgentSwarm. Como eliges el agente por terminal, el historial no queda aislado por herramienta. La misma vista buscable reúne tus conversaciones de Codex, Claude Code y Gemini CLI, así que puedes rastrear y retomar el trabajo sin importar qué agente lo hizo.',
    },
  ],
}

export default guide
