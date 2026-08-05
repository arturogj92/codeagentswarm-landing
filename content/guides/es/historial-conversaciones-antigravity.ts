import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-antigravity',
    locale: 'es',
    title: 'Historial de conversaciones de Antigravity CLI: dónde vive y cómo retomarlas',
    metaTitle: 'Historial y resume de conversaciones en Antigravity CLI (2026)',
    metaDescription: 'Cómo guarda Antigravity CLI las conversaciones, por qué viven en ~/.gemini, cómo retomarlas con agy -c y --conversation, y por qué el transcript no sabe a qué proyecto pertenece.',
    intro: `Antigravity CLI guarda todas las conversaciones, y se retoman con dos comandos: <code>agy -c</code> para la más reciente y <code>agy --conversation &lt;id&gt;</code> para una concreta.

Por debajo, el almacenamiento tiene una rareza que sorprende la primera vez que vas a buscarlo: <strong>las conversaciones de Antigravity viven en <code>~/.gemini</code></strong>, no en un directorio con el nombre de Antigravity. Es una herencia de su linaje, y significa que tus datos e historial de siempre están justo donde los dejaste.

Hay una segunda rareza, menos evidente y más importante si llevas varios proyectos: <strong>el transcript de la conversación no registra a qué proyecto pertenece</strong>. Las conversaciones se guardan en plano, en un único directorio, sin estructura de carpeta por proyecto y sin campo de directorio de trabajo en el propio transcript. Esta guía cubre dónde está todo de verdad, cómo retomar de forma fiable y qué hacer con el problema del proyecto.`,
    ctaText: 'Encontrar una conversación vieja de agy por id es un incordio cuando tienes decenas repartidas por varios proyectos. CodeAgentSwarm te da historial buscable de todas las sesiones de Antigravity, con el proyecto correcto asociado a cada una.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'historial', 'conversaciones'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    alternateSlug: 'antigravity-cli-conversation-history',
  },
  sections: [
    {
      id: 'retomar',
      title: 'Retomar una conversación: los dos comandos',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# Empezar una sesión nueva en el directorio actual\nagy\n\n# Continuar tu conversación más reciente, donde la dejaras\nagy -c\n\n# Retomar una conversación concreta por id\nagy --conversation <id>',
        },
        {
          type: 'paragraph',
          text: '<code>agy -c</code> es el que vas a usar el noventa por ciento de las veces. Retoma tu conversación más reciente exactamente donde acabó, con todo el contexto intacto, que es lo que quieres después de irte a comer o de revisar un diff y decidir que el agente necesita otra pasada.',
        },
        {
          type: 'paragraph',
          text: '<code>agy --conversation &lt;id&gt;</code> es para todo lo demás: la sesión del martes, la del otro proyecto, la que abandonaste a medias y ahora quieres terminar. Necesita el id de la conversación, y conseguir ese id es la parte que nadie documenta.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Retomar no es lo mismo que empezar una sesión nueva y pegarle el contexto. Una conversación retomada conserva la comprensión acumulada que el agente tiene del código, que suele valer más que los tokens que costó construirla. Tirar de -c casi siempre sale más barato que volver a explicarse.',
        },
      ],
    },
    {
      id: 'donde-vive',
      title: 'Dónde vive el historial de verdad',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity reutiliza <code>~/.gemini</code> como directorio de inicio, y las conversaciones están en <code>~/.gemini/antigravity-cli/</code>.',
        },
        {
          type: 'paragraph',
          text: 'El dato estructural importante es que se guardan <strong>en plano</strong>. No hay un directorio por proyecto ni anidamiento por espacio de trabajo: todas las conversaciones de todos los proyectos en los que hayas trabajado caen en la misma carpeta, identificadas solo por su id. Si vienes de agentes que organizan el historial en una carpeta por repositorio, esto te va a parecer un error la primera vez que lo veas.',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación se representa con dos cosas: un transcript en JSONL, que es el registro limpio y legible del intercambio, y una base de datos SQLite por conversación con el nombre del id. El transcript es lo que leerías; la base de datos es donde se esconden los metadatos interesantes.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Como el almacenamiento se comparte con el directorio de inicio general de Gemini, no "limpies" ~/.gemini esperando borrar solo datos de Antigravity. Borrar ese directorio elimina el historial de conversaciones de todo lo demás que lo use.',
        },
      ],
    },
    {
      id: 'problema-del-proyecto',
      title: 'El problema del proyecto: el transcript no sabe dónde se ejecutó',
      content: [
        {
          type: 'paragraph',
          text: 'Aquí está el detalle que convierte el almacenamiento plano en algo genuinamente incómodo y no solo desordenado: <strong>el transcript limpio no lleva directorio de trabajo ni campo de espacio de trabajo</strong>. Abre un JSONL de conversación y podrás leer todos los mensajes, pero nada en él te dice en qué repositorio estaba trabajando el agente.',
        },
        {
          type: 'paragraph',
          text: 'Con un proyecto eso da igual. Con cinco, tienes una única carpeta plana de conversaciones y ninguna forma de saber por el transcript cuáles pertenecen a cada código, que es justo cuando más necesitas encontrar una sesión antigua.',
        },
        {
          type: 'paragraph',
          text: 'La información sí existe, pero está en la base de datos de la conversación y no en el transcript, y llega por una de dos vías según cómo se arrancara la sesión:',
        },
        {
          type: 'list',
          items: [
            '<strong>Con espacio de trabajo registrado.</strong> Cuando <code>agy</code> arranca dentro de un espacio de trabajo que reconoce, la base de datos registra ese espacio como una ruta absoluta <code>file:///</code> en sus metadatos de trayectoria. Es la respuesta autoritativa cuando está presente.',
            '<strong>Sin espacio de trabajo registrado.</strong> Las sesiones que no se arrancaron en un espacio reconocido, lo que incluye <code>agy</code> lanzado desde un directorio de proyecto normal, no tienen esa ruta. Para esas, la única señal es el directorio de trabajo en el que se ejecutaron los propios comandos de shell del agente, registrado paso a paso en la base de datos.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La consecuencia práctica: <strong>una herramienta que lea solo el transcript no puede etiquetar tus conversaciones correctamente</strong>, y acaba tirando de una etiqueta genérica. Recuperar el proyecto real exige leer la base de datos y quedarse con la que esté disponible de esas dos señales.',
        },
      ],
    },
    {
      id: 'habitos-practicos',
      title: 'Dos costumbres que te ahorran la arqueología',
      content: [
        {
          type: 'paragraph',
          text: 'Casi todo lo anterior se puede evitar cambiando cómo trabajas en vez de escarbando en SQLite.',
        },
        {
          type: 'paragraph',
          text: '<strong>Tira de <code>-c</code> antes que de un id.</strong> La conversación más reciente está siempre a una tecla y no necesita búsqueda. Si eres disciplinado y terminas un hilo antes de empezar otro, rara vez vas a necesitar retomar por id.',
        },
        {
          type: 'paragraph',
          text: '<strong>Apunta el id cuando una sesión importe.</strong> Si paras a mitad de algo a lo que sin duda vas a volver, el id vale treinta segundos en un fichero de notas o en un mensaje de commit. Encontrarlo después cuesta bastante más que eso.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Este es un buen argumento para terminar una tarea en una sola conversación en vez de repartirla entre varias. Antigravity retoma limpiamente, así que un hilo largo sobre un mismo trabajo es a la vez más fácil de encontrar después y más barato de continuar que una sesión nueva que tiene que volver a aprenderse el código.',
        },
      ],
    },
    {
      id: 'historial-buscable',
      title: 'Historial buscable en todas las sesiones',
      content: [
        {
          type: 'paragraph',
          text: 'La combinación de almacenamiento plano y proyecto ausente es manejable con un agente y un proyecto, y genuinamente dolorosa en cuanto tienes decenas de conversaciones repartidas por varios repositorios. Acabas sabiendo que existe una sesión en la que resolviste un problema, y sin una forma razonable de encontrarla.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, el espacio de trabajo de escritorio para ejecutar varios agentes de IA de terminal en paralelo, indexa las conversaciones de Antigravity y te da búsqueda de texto completo sobre todas ellas, con cada conversación asociada a su proyecto real. Resuelve el proyecto leyendo la base de datos de la conversación y quedándose con el espacio de trabajo registrado cuando existe, y con el directorio de trabajo dominante de los propios comandos de shell de la sesión cuando no, que es el mismo enfoque de dos señales descrito arriba.',
        },
        {
          type: 'paragraph',
          text: 'Desde ahí puedes reabrir cualquier conversación directamente en un terminal, sin ir a cazar un id. Funciona igual con tus otros agentes, así que un montaje mixto de sesiones de Antigravity, Claude y Codex es buscable desde un mismo sitio, algo que encaja con el patrón de <a href="/es/guias/enjambre-de-agentes-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Antigravity</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo retomo una conversación en Antigravity CLI?',
      answer: 'Usa agy -c para continuar tu conversación más reciente exactamente donde acabó, o agy --conversation <id> para retomar una concreta por su id. Retomar conserva la comprensión acumulada que el agente tiene del código, que suele valer más que los tokens que costó construirla.',
    },
    {
      question: '¿Dónde guarda Antigravity CLI el historial de conversaciones?',
      answer: 'En ~/.gemini/antigravity-cli/. Antigravity reutiliza el directorio de inicio ~/.gemini, y por eso la ruta no menciona a Antigravity por ningún lado. Cada conversación tiene un transcript en JSONL más una base de datos SQLite propia con el nombre de su id.',
    },
    {
      question: '¿Por qué están todas mis conversaciones de Antigravity en una sola carpeta?',
      answer: 'Porque Antigravity las guarda en plano: no hay directorio por proyecto ni anidamiento por espacio de trabajo. Todas las conversaciones de todos los proyectos caen en la misma carpeta, identificadas solo por su id.',
    },
    {
      question: '¿Cómo sé a qué proyecto pertenece una conversación antigua de agy?',
      answer: 'Por el transcript no, porque no lleva directorio de trabajo ni campo de espacio de trabajo. La información vive en la base de datos de la conversación: como ruta absoluta file:/// del espacio de trabajo en los metadatos de trayectoria, o, para las sesiones arrancadas fuera de un espacio reconocido, como el directorio de trabajo registrado en los propios comandos de shell del agente.',
    },
    {
      question: '¿Puedo borrar ~/.gemini para limpiar el historial de Antigravity?',
      answer: 'Puedes, pero con cuidado: ese directorio es compartido y no exclusivo de Antigravity, así que borrarlo elimina historial y datos de cualquier otra cosa que use el mismo directorio de inicio. Borrar solo ~/.gemini/antigravity-cli/ es la opción más acotada.',
    },
    {
      question: '¿Cómo busco entre todas mis conversaciones de Antigravity?',
      answer: 'Antigravity no trae búsqueda entre sesiones. CodeAgentSwarm las indexa y ofrece búsqueda de texto completo con cada conversación asociada a su proyecto real, resuelto desde la base de datos de la conversación y no desde el transcript, y te deja reabrir cualquiera en un terminal sin buscar el id.',
    },
  ],
}

export default guide
