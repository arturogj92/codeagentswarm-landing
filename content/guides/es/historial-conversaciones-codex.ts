import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-codex',
    locale: 'es',
    title: 'Cómo ver y retomar el historial de conversaciones de Codex CLI',
    metaTitle: 'Cómo ver y retomar el historial de conversaciones de Codex CLI (2026)',
    metaDescription: 'Cómo encontrar el historial de conversaciones de Codex CLI, retomar una sesión anterior y buscar cualquier conversación de Codex por palabra clave. Resume nativo de Codex más el historial buscable de CodeAgentSwarm para todos tus agentes.',
    intro: 'Ejecuta codex resume para elegir una conversación guardada, codex resume --last para continuar la más reciente o codex resume --all para incluir otros proyectos. Las transcripciones se guardan en $CODEX_HOME/sessions, por defecto ~/.codex/sessions.\n\nEsta guía explica cómo retomar una sesión y reunir las conversaciones de distintos agentes en CodeAgentSwarm.',
    ctaText: 'Busca tus conversaciones de Codex por contenido y filtra por proyecto en CodeAgentSwarm. Abre la sesión que necesitas junto a tus otras tareas. Disponible para macOS y Windows.',
    ctaAgent: 'codex',
    highlightedWords: ['historial', 'Codex CLI', 'retomar'],
    publishedAt: '2026-06-24',
    updatedAt: '2026-09-25',
    alternateSlug: 'codex-cli-conversation-history',
  },
  sections: [
    {
      id: 'que-es-historial-codex',
      title: 'Qué es el historial de conversaciones de Codex CLI',
      content: [
        {
          type: 'paragraph',
          text: 'Para volver a una conversación, abre el selector de sesiones:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex resume',
        },
        {
          type: 'paragraph',
          text: 'Si la conversación no aparece, prueba <code>codex resume --all</code> para quitar el filtro del directorio actual. Comprueba también que estás usando la misma configuración de <code>CODEX_HOME</code>.',
        },
        {
          type: 'paragraph',
          text: 'Para buscar conversaciones entre agentes desde una ventana, consulta la <a href="/es/guias/interfaz-grafica-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">interfaz gráfica para Codex</a>. Si quieres continuar varias tareas a la vez, sigue la guía de <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">sesiones de Codex en paralelo</a>.',
        },
      ],
    },
    {
      id: 'historial-nativo-codex',
      title: 'Historial y resume nativo de Codex CLI',
      content: [
        {
          type: 'table',
          headers: [
            'Comando',
            'Uso',
          ],
          rows: [
            [
              'codex resume',
              'Abre el selector de sesiones.',
            ],
            [
              'codex resume --last',
              'Continúa la sesión más reciente.',
            ],
            [
              'codex resume --all',
              'Incluye sesiones de otros directorios.',
            ],
            [
              'codex resume SESSION_ID',
              'Retoma una sesión por su ID.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Opciones comprobadas con <code>codex resume --help</code> en Codex CLI 0.156.0 el 25 de septiembre de 2026. Revisa la ayuda de tu instalación si se comporta de otra forma.',
        },
        {
          type: 'paragraph',
          text: 'Las transcripciones están en <code>$CODEX_HOME/sessions</code>, por defecto <code>~/.codex/sessions</code>. Consulta las <a href="https://learn.chatgpt.com/docs/reference/troubleshooting" class="text-neon-cyan hover:text-neon-purple transition-colors">rutas documentadas por OpenAI</a>. Conserva una copia privada de las conversaciones importantes antes de cambiar o limpiar esos archivos.',
        },
      ],
    },
    {
      id: 'el-problema',
      title: 'Cuándo ayuda un historial compartido entre agentes',
      content: [
        {
          type: 'paragraph',
          text: 'El selector nativo de Codex ya permite retomar sesiones de otros proyectos con <code>--all</code>. Si también trabajas con Claude Code u otros agentes, CodeAgentSwarm reúne las conversaciones disponibles en una vista con búsqueda por contenido y filtros de proyecto y agente.',
        },
      ],
    },
    {
      id: 'historial-buscable-codeagentswarm',
      title: 'Historial de Codex buscable entre agentes con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> ejecuta tus agentes de Codex CLI en un escritorio y guarda cada conversación de forma automática: lo que escribiste, lo que hizo Codex, en qué proyecto estabas y cuándo ocurrió. Ese registro se convierte en un historial buscable que funciona en todos los proyectos y, lo importante, entre todos los agentes. La misma vista reúne tus conversaciones de Codex, Claude Code y Antigravity CLI.',
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
          alt: 'Historial de conversaciones actual de CodeAgentSwarm con buscador, filtros de agente y proyecto, y sesiones anteriores seleccionables',
          src: '/images/guides/resume-conversation.png',
          caption: 'Busca, filtra y selecciona la conversación de Codex que quieras retomar desde el Historial de conversaciones actual.',
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
          text: 'Codex CLI permite elegir una sesión, continuar la última o consultar otros proyectos. CodeAgentSwarm añade una vista compartida de las conversaciones de varios agentes. Puedes usar el selector nativo para una sesión concreta y la app para organizar tu trabajo entre proyectos.',
        },
      ],
    },

  ],
  faq: [
    {
      question: '¿Codex CLI guarda el historial de conversaciones?',
      answer: 'Sí. Puedes continuar una conversación guardada con codex resume. Conserva una copia privada si necesitas proteger el historial frente a borrados o cambios de configuración.',
    },
    {
      question: '¿Cómo retomo una sesión anterior de Codex?',
      answer: 'Ejecuta codex resume para elegirla, codex resume --last para continuar la más reciente o codex resume SESSION_ID si conoces su identificador.',
    },
    {
      question: '¿Dónde se guarda el historial de Codex CLI?',
      answer: 'Las transcripciones están en $CODEX_HOME/sessions, por defecto ~/.codex/sessions. Si has cambiado CODEX_HOME, comprueba esa ubicación.',
    },
    {
      question: '¿Puedo buscar en todas mis conversaciones de Codex?',
      answer: 'CodeAgentSwarm permite buscar por contenido en las conversaciones disponibles y filtrar por proyecto y agente. Para elegir una sesión desde Codex CLI, usa codex resume.',
    },
    {
      question: '¿El historial de Codex funciona entre distintos proyectos?',
      answer: 'Sí. Ejecuta codex resume --all para incluir sesiones de otros directorios. CodeAgentSwarm también ofrece filtros de proyecto en su historial compartido entre agentes.',
    },
    {
      question: '¿Puedo ver juntos el historial de Codex y de Claude Code?',
      answer: 'Sí, en CodeAgentSwarm. Como eliges el agente por terminal, el historial no queda aislado por herramienta. La misma vista buscable reúne tus conversaciones de Codex, Claude Code y Antigravity CLI, así que puedes rastrear y retomar el trabajo sin importar qué agente lo hizo.',
    },
  ],
}

export default guide
