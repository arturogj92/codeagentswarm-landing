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
    alternateSlug: 'claude-code-history',
  },
  sections: [
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
      title: 'Cómo retomar una conversación antigua en un nuevo terminal',
      content: [
        {
          type: 'list',
          items: [
            'Encuentras la conversación que te interesa en el historial.',
            'Haces clic para abrirla.',
            'CodeAgentSwarm abre un nuevo terminal con todo el contexto cargado.',
            'Claude recuerda lo que se decidió y lo que se hizo en esa conversación.',
            'Sigues trabajando como si no hubiera pasado el tiempo.',
          ],
        },
        {
          type: 'image',
          alt: 'Conversación antigua abierta en un terminal nuevo con mensajes anteriores visibles y el input listo para continuar',
          src: '/images/guides/resume-conversation.png',
          caption: 'Retoma cualquier conversación exactamente donde la dejaste.',
          size: 'medium',
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
