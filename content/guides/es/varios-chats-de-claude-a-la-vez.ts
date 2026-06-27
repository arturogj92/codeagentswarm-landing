import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'varios-chats-de-claude-a-la-vez',
    locale: 'es',
    title: '¿Puedes tener varios chats de Claude a la vez?',
    metaTitle: '¿Puedes tener varios chats de Claude a la vez? Sí, así se hace (2026)',
    metaDescription: 'Sí, puedes tener varios chats de Claude a la vez. En claude.ai usa pestañas del navegador o Proyectos. Con Claude Code en el terminal, cada sesión es su propio proceso que puedes ejecutar en paralelo.',
    intro: `Sí, puedes tener varios chats de Claude a la vez, y hay dos formas distintas según lo que quieras hacer. Si te refieres a la app web claude.ai, puedes abrir varias conversaciones al mismo tiempo en pestañas separadas del navegador, y los Proyectos te permiten organizar cada chat alrededor de sus propios archivos y contexto. Si te refieres a Claude Code en tu terminal, cada sesión es un proceso independiente, así que puedes ejecutar varias en paralelo en la misma máquina, sin necesidad de ningún plan especial.

Son dos preguntas distintas que comparten la misma búsqueda, así que esta guía responde a las dos. La parte de la app web es corta porque la respuesta es sencilla: abre más pestañas. La parte del terminal entra en más detalle, porque ejecutar varias sesiones de Claude Code en paralelo es donde la cosa se vuelve de verdad útil, y donde una herramienta como CodeAgentSwarm marca la diferencia.

Elige el camino que encaja con lo que intentas hacer. Si chateas en el navegador, lee la siguiente sección. Si programas en el terminal, salta a la sección para desarrolladores más abajo.`,
    ctaText: 'Ejecuta varias sesiones de Claude Code en paralelo en un solo workspace de CodeAgentSwarm, con notificaciones, historial buscable y diffs en vivo para que no se pierda nada.',
    highlightedWords: ['varios chats de Claude', 'a la vez'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'run-multiple-claude-chats',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Respuesta corta: sí, de las dos formas',
      content: [
        {
          type: 'image',
          alt: 'Dos terminales de CodeAgentSwarm funcionando a la vez, uno de ellos una sesión de Claude Code, con el selector SELECT AI AGENT abierto',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Dos terminales a la vez en CodeAgentSwarm, uno ejecutando una sesión de Claude Code, con el selector de agente por terminal abierto.',
        },
        {
          type: 'paragraph',
          text: 'Hay dos cosas que la gente quiere decir con "tener varios chats de Claude a la vez", y las dos son posibles.',
        },
        {
          type: 'list',
          items: [
            '<strong>La app web claude.ai:</strong> abre varias conversaciones en pestañas separadas del navegador, o usa Proyectos para mantener cada chat ligado a sus propios archivos e instrucciones. Cada conversación es independiente.',
            '<strong>Claude Code en el terminal:</strong> cada sesión es su propio proceso con su propia conversación y su propio contexto, así que puedes ejecutar varias en paralelo en una misma máquina y que trabajen a la vez.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No hay un plan especial de "multichat" ni un coste extra por ejecutar conversaciones en paralelo. Tanto en el navegador como en el terminal, estás usando la misma suscripción de Claude desde más de un sitio.',
        },
        {
          type: 'paragraph',
          text: 'El resto de la página se divide por público. Si trabajas en el navegador, la siguiente sección es para ti. Si programas en el terminal, salta a la sección para desarrolladores, donde las sesiones en paralelo empiezan de verdad a merecer la pena.',
        },
      ],
    },
    {
      id: 'web-app',
      title: 'Si te refieres a la app web claude.ai',
      content: [
        {
          type: 'paragraph',
          text: 'En <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">claude.ai</a>, cada conversación es independiente, así que ejecutar varias a la vez es simplemente cuestión de abrir más.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa pestañas separadas del navegador',
          id: 'separate-tabs',
        },
        {
          type: 'paragraph',
          text: 'La forma más sencilla es abrir claude.ai en una segunda pestaña y empezar un chat nuevo allí. Cada pestaña tiene su propia conversación con su propio contexto, y no comparten memoria. Puedes tener una pestaña redactando un correo mientras otra te ayuda a planear un viaje, y cambiar entre ellas como con cualquier otra pestaña del navegador.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa Proyectos para mantener los chats organizados',
          id: 'projects',
        },
        {
          type: 'paragraph',
          text: 'Si vuelves una y otra vez al mismo tema, los Proyectos encajan mejor que las pestañas sueltas. Un Proyecto agrupa conversaciones relacionadas y te deja adjuntar archivos e instrucciones personalizadas que ven todos los chats de ese Proyecto. Puedes tener varios Proyectos a la vez, cada uno su propio espacio, así que un chat sobre tus finanzas no se mezcla con un chat sobre tu novela.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Una cosa que conviene saber: las conversaciones separadas no comparten contexto. Si quieres que dos chats conozcan el mismo trasfondo, o repites el contexto en cada uno o pones el material compartido en un Proyecto para que todos los chats de dentro lo vean.',
        },
        {
          type: 'paragraph',
          text: 'Eso es todo en cuanto a la app web. Varios chats a la vez significa varias pestañas o varios Proyectos. Si eso responde a tu pregunta, ya está. Si en realidad estás aquí por programar en el terminal, sigue leyendo.',
        },
      ],
    },
    {
      id: 'developer',
      title: 'Si te refieres a Claude Code en el terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Aquí es donde las sesiones en paralelo se vuelven de verdad potentes. <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> es el agente de código por línea de comandos, y cada sesión que inicias con <code>claude</code> es su propio proceso independiente. Tiene su propio hilo de conversación, su propia ventana de contexto y su propio estado de trabajo. No se comparte nada entre sesiones.',
        },
        {
          type: 'paragraph',
          text: 'Eso significa que puedes abrir un segundo terminal, ejecutar <code>claude</code> otra vez y tener ya dos sesiones de Claude Code completamente separadas funcionando al mismo tiempo. Una puede refactorizar tu módulo de autenticación mientras la otra escribe pruebas para tu capa de API. No saben una de otra, y eso es justo lo que hace posible el trabajo en paralelo.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña de terminal 1\ncd ~/mi-proyecto\nclaude\n\n# Pestaña de terminal 2 (una segunda sesión, independiente)\ncd ~/mi-proyecto\nclaude',
        },
        {
          type: 'paragraph',
          text: 'Para solo dos sesiones, las pestañas del terminal funcionan bien. La fricción aparece cuando ejecutas tres o más: pierdes el hilo de qué hace cada pestaña, tienes que entrar en cada una para ver el progreso, no hay avisos cuando una sesión termina o necesita tu respuesta, y las ediciones que se solapan sobre el mismo archivo te pueden pillar por sorpresa. El desglose completo de las opciones gratuitas frente a una herramienta dedicada está en la <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de varias sesiones de Claude Code</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde encaja CodeAgentSwarm',
          id: 'codeagentswarm',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio hecha específicamente para ejecutar sesiones de código con IA en paralelo y con visibilidad real. Te da varios terminales en un solo workspace, y funciona sobre tu suscripción existente, así que no es un proveedor de modelos. Esto es lo que añade frente a un montón de pestañas de terminal.',
        },
        {
          type: 'list',
          items: [
            '<strong>Varios terminales en paralelo:</strong> ejecuta varias sesiones de Claude Code a la vez, y elige un agente distinto por terminal si quieres mezclar Codex CLI o Gemini CLI.',
            '<strong>Títulos dinámicos:</strong> cada terminal muestra lo que está haciendo su sesión en ese momento, como "Refactorizando autenticación" o "Escribiendo pruebas de API", en vez de varias pestañas idénticas.',
            '<strong>Notificaciones de escritorio:</strong> cuando una sesión termina o se para a preguntarte algo, recibes una notificación nativa, así puedes centrarte en un terminal y dejar que el resto te avise.',
            '<strong>Historial buscable:</strong> cada conversación de todos los terminales se guarda y se puede buscar, así puedes rastrear qué hizo una sesión ayer o retomarla después.',
            '<strong>Diffs de archivos en vivo:</strong> observa los cambios que hace cada sesión en tiempo real, por terminal y a nivel de proyecto, así las ediciones que se solapan se ven antes de convertirse en un problema de merge.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Como cada conversación se guarda, puedes dejar una sesión y retomarla más tarde, o rebuscar en lo que hizo de verdad un chat anterior. La <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de conversaciones</a> entra más a fondo en cómo funciona ese historial entre sesiones en paralelo. Y si quieres montar un esquema mixto con Claude Code, Codex y Gemini juntos en vez de solo varias sesiones de Claude Code, la <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes CLI de IA</a> cubre ese flujo entre proveedores en detalle.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Cuando dos sesiones tocan el mismo archivo, el segundo guardado choca con un conflicto de Git y Claude Code suele resolverlo por su cuenta. Los diffs en vivo de CodeAgentSwarm te dejan ver las ediciones que se solapan pronto, antes de que se conviertan en limpieza manual.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedes tener varios chats de Claude a la vez?',
      answer: 'Sí. En la app web claude.ai puedes abrir varias conversaciones en pestañas separadas del navegador, o usar Proyectos para organizar cada chat alrededor de sus propios archivos. Con Claude Code en el terminal, cada sesión es un proceso independiente, así que puedes ejecutar varias en paralelo en la misma máquina.',
    },
    {
      question: '¿Puedo tener dos chats de Claude a la vez?',
      answer: 'Sí. En el navegador, abre claude.ai en una segunda pestaña y empieza una conversación nueva, y ya tienes dos chats independientes. En el terminal, abre un segundo terminal y ejecuta claude otra vez para tener una segunda sesión de Claude Code independiente.',
    },
    {
      question: '¿Puedo tener varias conversaciones de Claude a la vez?',
      answer: 'Sí. En claude.ai cada conversación es independiente, así que varias pestañas o varios Proyectos te dan tantas conversaciones en paralelo como quieras. Ten en cuenta que las conversaciones separadas no comparten contexto a menos que pongas el material compartido en un Proyecto.',
    },
    {
      question: '¿Cómo ejecuto Claude en paralelo para programar?',
      answer: 'Abre más de un terminal y ejecuta claude en cada uno. Cada sesión de Claude Code es su propio proceso con su propio contexto, así que funcionan en paralelo sin interferir. CodeAgentSwarm lo hace más fácil al darte varios terminales en un solo workspace, con notificaciones, historial buscable y diffs de archivos en vivo.',
    },
    {
      question: '¿Puede Claude ejecutar varios chats al mismo tiempo?',
      answer: 'Sí. Tanto si te refieres a conversaciones del navegador como a sesiones del terminal, Claude gestiona cada una de forma independiente. No hay un plan especial de multichat ni un coste extra por ejecutarlas en paralelo, solo estás usando la misma suscripción desde más de un sitio.',
    },
    {
      question: '¿Los chats separados de Claude comparten memoria o contexto?',
      answer: 'No. Cada conversación en claude.ai es independiente y no ve lo que hablaron otros chats, y cada sesión de Claude Code en el terminal tiene su propia ventana de contexto. Si necesitas contexto compartido en la app web, usa un Proyecto para que todos los chats de dentro vean los mismos archivos e instrucciones.',
    },
  ],
}

export default guide
