import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-claude-code',
    locale: 'es',
    title: 'Cómo usar el historial de Claude Code para recuperar contexto y ahorrar tiempo',
    metaTitle: 'Cómo usar el historial de Claude Code en CodeAgentSwarm para recuperar contexto y ahorrar tiempo',
    metaDescription: 'Aprende a usar el historial de Claude Code en CodeAgentSwarm para buscar conversaciones antiguas, recuperar contexto en segundos y evitar repetir trabajo.',
    intro: `En CodeAgentSwarm, cada vez que trabajas con un terminal de Claude Code, el sistema guarda automáticamente todo: lo que escribes, lo que responde Claude, el proyecto en el que estabas y cuándo ocurrió.

Todo eso forma tu historial de conversaciones de Claude Code. Es como una memoria larga de todo lo que has ido haciendo con la IA, organizada y lista para buscar o retomar cuando te haga falta.

La idea es simple: Todo lo que hablas con Claude Code queda guardado, organizado por proyecto y listo para buscar o retomar cuando quieras.`,
    ctaText: 'Usa el historial de conversaciones la próxima vez que retomes un proyecto. Vas a notar enseguida lo cómodo que es no tener que explicar todo desde cero a Claude.',
    highlightedWords: ['historial', 'Claude Code'],
    alternateSlug: 'claude-code-history',
  },
  sections: [
    {
      id: 'que-es-historial',
      title: 'Qué es el historial de Claude Code en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'El historial de Claude Code en CodeAgentSwarm es la funcionalidad que guarda automáticamente todas tus conversaciones con Claude: lo que escribes, lo que responde, el proyecto en el que estabas y cuándo ocurrió.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica, es una memoria larga de todo lo que has ido construyendo con la IA, organizada por proyecto y fecha para que puedas buscar, filtrar y retomar cualquier conversación en segundos.',
        },
        {
          type: 'paragraph',
          text: 'Si ya usas Claude Code, quizás conozcas el comando "claude -r" que permite retomar la última conversación. El historial nativo de Claude Code existe, pero es muy básico: no tiene buscador, no puedes buscar por contenido y solo funciona dentro de cada proyecto por separado. En CodeAgentSwarm, el historial va mucho más allá: buscador de texto completo, filtros por proyecto, vista global de todas tus conversaciones y la posibilidad de retomar cualquier conversación de cualquier proyecto desde cualquier terminal.',
        },
      ],
    },
    {
      id: 'por-que-es-importante',
      title: 'Por qué el historial es tan importante',
      content: [
        {
          type: 'paragraph',
          text: 'Claude no es solo un chat que responde cosas. Cuando vas usando la misma conversación para una parte concreta del sistema, ahí se acumulan:',
        },
        {
          type: 'list',
          items: [
            'Decisiones de diseño',
            'Explicaciones que ya diste',
            'Contexto funcional',
            'Matices del dominio que no quieres repetir',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si pierdes esa conversación, te toca explicarle desde cero cómo funciona tu módulo, rehacer razonamientos y arriesgarte a tomar decisiones distintas sin querer.',
        },
        {
          type: 'paragraph',
          text: 'Con el historial de CodeAgentSwarm puedes volver a esas conversaciones y seguir construyendo sobre lo que ya hiciste, sin reiniciar la película cada vez.',
        },
        {
          type: 'paragraph',
          text: 'En un proyecto pequeño esto puede no parecer imprescindible. Pero en proyectos grandes, donde hay módulos complejos y darle contexto a Claude de una parte específica del sistema puede llevar varios mensajes, el historial se vuelve indispensable. Es la diferencia entre perder 10 minutos explicando lo mismo otra vez o retomar en segundos exactamente donde lo dejaste.',
        },
      ],
    },
    {
      id: 'como-se-organiza',
      title: 'Cómo se organiza el historial por proyecto y fecha',
      content: [
        {
          type: 'paragraph',
          text: 'Para que no sea una lista infinita sin sentido, el historial se organiza así:',
        },
        {
          type: 'list',
          items: [
            'Por proyecto',
            'Por fecha, mostrando primero lo más reciente',
            'Por cadena de conversación, agrupando continuaciones',
            'Con colores por proyecto para reconocerlos rápido',
          ],
        },
        {
          type: 'image',
          alt: 'Vista general del historial de Claude Code con lista de conversaciones, colores por proyecto y fechas visibles',
          src: '/images/guides/conversation-history.png',
          caption: 'Vista del historial con conversaciones organizadas por proyecto y fecha.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'como-acceder',
      title: 'Cómo acceder al historial desde un terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Da igual en qué terminal estés, el acceso al historial es siempre sencillo:',
        },
        {
          type: 'list',
          items: [
            'En cualquier terminal de Claude Code, haz clic en el botón "History".',
            'Se abrirá un modal con tus conversaciones recientes.',
            'Desde ahí puedes buscar, filtrar y abrir conversaciones.',
          ],
        },
        {
          type: 'image',
          alt: 'Modal de History abierto desde un terminal con buscador arriba y lista de conversaciones debajo',
          src: '/images/guides/conversation-history-button.png',
          caption: 'El modal de historial te da acceso rápido a todas tus conversaciones pasadas.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'buscar-conversaciones',
      title: 'Cómo buscar conversaciones antiguas por texto y proyecto',
      content: [
        {
          type: 'paragraph',
          text: 'El buscador del historial no se limita al título. Puede buscar dentro de lo que se habló.',
        },
        {
          type: 'paragraph',
          text: 'Puedes buscar por:',
        },
        {
          type: 'list',
          items: [
            'Frases que escribiste tú - como "Add dark mode" o "Fix auth bug"',
            'Conceptos funcionales - como "authentication" o "migración base de datos"',
            'Nombres de módulos de tu dominio - como "MCP Marketplace"',
            'Y además filtrar por proyecto cuando trabajas en varios a la vez',
          ],
        },
      ],
    },
    {
      id: 'ejemplo-mcp-marketplace',
      title: 'Ejemplo real: buscando conversaciones sobre MCP Marketplace',
      content: [
        {
          type: 'paragraph',
          text: 'En mi caso, en el proyecto de trabajo tenemos una parte del sistema que se llama MCP Marketplace.',
        },
        {
          type: 'paragraph',
          text: 'Es una zona del código con bastante complejidad: integraciones, reglas de negocio, modelos de datos. No es algo que quieras explicar desde cero a Claude cada semana.',
        },
        {
          type: 'paragraph',
          text: 'En lugar de abrir un chat nuevo y soltarle toda la historia otra vez, el flujo ideal es:',
        },
        {
          type: 'list',
          items: [
            'Abrir el historial desde un terminal.',
            'Buscar "MCP Marketplace".',
            'Ver todas las conversaciones donde ya se ha trabajado esa parte.',
            'Entrar en la conversación que más te encaja.',
            'Retomar el trabajo a partir de ahí.',
          ],
        },
        {
          type: 'image',
          alt: 'Resultados de búsqueda de MCP Marketplace con varias conversaciones mostrando título, proyecto y fecha',
          src: '/images/guides/mcp-marketplace-search.png',
          caption: 'Encontrar trabajo anterior es tan simple como buscar el nombre del módulo.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'retomar-conversaciones',
      title: 'Qué pasa cuando seleccionas una conversación',
      content: [
        {
          type: 'paragraph',
          text: 'Al seleccionar una conversación, si has usado el buscador, verás los mensajes donde aparecen tus términos de búsqueda. Así puedes confirmar rápidamente si es la conversación que buscabas antes de abrirla.',
        },
        {
          type: 'paragraph',
          text: 'Una vez que eliges la conversación que quieres continuar:',
        },
        {
          type: 'list',
          items: [
            'CodeAgentSwarm abre un nuevo terminal con todo el contexto cargado.',
            'Claude recuerda lo que se decidió y lo que se hizo en esa conversación.',
            'Sigues trabajando como si no hubiera pasado el tiempo.',
          ],
        },
        {
          type: 'image',
          alt: 'Vista de selección de conversación al abrir proyecto en modo resume mostrando lista de conversaciones recientes con buscador y preview de mensajes',
          src: '/images/guides/resume-selected-conversation.png',
          caption: 'Al seleccionar una conversación, ves los mensajes que coinciden con tu búsqueda para confirmar que es la correcta.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'seleccionar-conversacion-al-reanudar',
      title: 'Cómo seleccionar qué conversación retomar al abrir un proyecto',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando abres un proyecto, puedes elegir entre modo normal (conversación nueva) o modo resume. Si eliges modo resume, CodeAgentSwarm te muestra una vista con todas tus conversaciones recientes de ese proyecto para que elijas cuál retomar.',
        },
        {
          type: 'paragraph',
          text: 'Desde esta vista puedes:',
        },
        {
          type: 'list',
          items: [
            'Ver todas tus conversaciones anteriores organizadas por fecha',
            'Buscar conversaciones específicas por texto',
            'Elegir exactamente qué conversación continuar',
            'O empezar una conversación nueva si lo prefieres',
          ],
        },
        {
          type: 'image',
          alt: 'Conversación antigua abierta en un terminal nuevo con mensajes anteriores visibles y el input listo para continuar',
          src: '/images/guides/resume-conversation.png',
          caption: 'Retoma cualquier conversación exactamente donde la dejaste.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Esto te da control total sobre tu contexto. No tienes que adivinar dónde estaba la conversación que necesitas - la buscas, la seleccionas y sigues trabajando.',
        },
      ],
    },
    {
      id: 'beneficios-reales',
      title: 'Beneficios reales de usar bien el historial',
      content: [
        {
          type: 'paragraph',
          text: 'Usar el historial de Claude Code de esta forma tiene impacto directo en tu día a día:',
        },
        {
          type: 'list',
          items: [
            'Nunca pierdes contexto en partes críticas del sistema',
            'Dejas de repetir explicaciones a Claude cada semana',
            'Mantienes consistencia en decisiones de arquitectura',
            'Trabajar con varios proyectos a la vez es mucho más manejable',
            'El tiempo de "poner en contexto a la IA" baja una barbaridad',
            'Ahorras tokens al no tener que repetir contexto que ya existe en conversaciones anteriores',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si ya dominas el historial y quieres multiplicar tu productividad con varias sesiones, consulta esta guía: <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo usar varios terminales de Claude Code sin complicarte la vida</a>.',
        },
      ],
    },
    {
      id: 'casos-de-uso',
      title: 'Casos de uso típicos',
      content: [
        {
          type: 'paragraph',
          text: 'Algunos escenarios donde el historial brilla:',
        },
        {
          type: 'list',
          items: [
            '"¿Cómo solucionamos ese bug de auth hace 3 días?" - Buscas "auth" y ves exactamente qué se hizo.',
            '"Quiero seguir con lo que estaba haciendo ayer" - Abres History y entras en la conversación más reciente relevante.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para saber exactamente qué cambió en cada sesión o en el proyecto antes de seguir trabajando, consulta esta guía: <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo ver los cambios de Claude Code en tiempo real (y saber qué está haciendo la IA)</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'El historial de Claude Code en CodeAgentSwarm no es una lista de chats viejos sin más. Es la memoria de cómo has ido construyendo tus proyectos con la IA.',
        },
        {
          type: 'paragraph',
          text: 'La próxima vez que tengas que tocar alguna funcionalidad, en lugar de volver a contarle todo a Claude cómo funciona, usa el historial de conversaciones y rescata la conversación.',
        },
        {
          type: 'paragraph',
          text: 'Y si además quieres trabajar en paralelo con varias partes del proyecto a la vez, puedes leer también la guía <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo usar varios terminales de Claude Code sin complicarte la vida</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Se guarda todo automáticamente o tengo que marcar algo a mano?',
      answer: 'Se guarda todo automáticamente. No tienes que hacer nada especial.',
    },
    {
      question: '¿Puedo buscar por cosas que escribió Claude, no solo por lo que escribí yo?',
      answer: 'Sí. El buscador tiene en cuenta el contenido completo de la conversación.',
    },
    {
      question: '¿Qué pasa si trabajo en muchos proyectos a la vez?',
      answer: 'Mejor. El historial se organiza por proyecto, así que es fácil localizar de dónde es cada conversación.',
    },
    {
      question: '¿El historial desaparece si cierro la app?',
      answer: 'No. Es un historial persistente. Cierra la app, apaga el portátil, vuelve mañana. Todo seguirá ahí.',
    },
  ],
}

export default guide
