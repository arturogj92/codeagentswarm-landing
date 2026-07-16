import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-codex',
    locale: 'es',
    title: 'Enjambre de agentes Codex: ejecuta varios agentes de Codex CLI en paralelo',
    metaTitle: 'Enjambre de agentes Codex: ejecuta varios agentes de Codex CLI en paralelo (2026)',
    metaDescription: 'Un enjambre de agentes Codex ejecuta varios agentes de Codex CLI en paralelo. Aprende 3 formas: pestañas, tmux y CodeAgentSwarm, con modo full-auto y supervisión.',
    intro: `Un enjambre de agentes Codex no es más que varios agentes de Codex CLI trabajando en paralelo en lugar de uno detrás de otro. Como cada sesión de Codex es su propio proceso, nada te impide tener un puñado funcionando a la vez, cada uno con su tarea.

El truco no está en arrancar los procesos. Está en no perderles la pista cuando ya tienes tres o cuatro agentes editando archivos, pidiendo aprobaciones y terminando en momentos distintos. Ahí es donde suelen romperse los enjambres mal montados.

En esta guía te explico las tres formas reales de ejecutar un enjambre de Codex, las comparo de forma honesta y te muestro dónde empieza a doler cada una. Si quieres la foto completa de todas las CLI, empieza por la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>, y si tu agente principal es Claude Code mira cómo <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>.`,
    ctaText: 'Ejecuta tu enjambre de agentes Codex en CodeAgentSwarm. Varios terminales de Codex CLI en full-auto, con Turbo Mode y permisos por terminal para mantenerlos a raya.',
    highlightedWords: ['enjambre de agentes Codex', 'Codex CLI'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'codex-agent-swarm',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: sí, puedes montar un enjambre de Codex',
      content: [
        {
          type: 'image',
          alt: 'Varios terminales de OpenAI Codex CLI ejecutándose en paralelo en un único espacio de trabajo de CodeAgentSwarm, cada uno una sesión de Codex independiente',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'Un enjambre de agentes Codex: varias sesiones de Codex CLI independientes ejecutándose a la vez en una sola ventana de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Una sesión de <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a> es solo un proceso. La arrancas con el comando <code>codex</code>, inicias sesión una vez con <code>codex login</code> y, a partir de ahí, cada sesión tiene su propia conversación, su propio contexto y su propio directorio de trabajo. Dos sesiones no saben nada la una de la otra.',
        },
        {
          type: 'paragraph',
          text: 'Así que un enjambre de agentes Codex no es un modo especial que desbloqueas. Es simplemente más de un agente de Codex CLI funcionando al mismo tiempo. Abre un segundo terminal, ejecuta <code>codex</code> otra vez y ya tienes dos agentes independientes. Uno puede estar migrando una capa de base de datos mientras el otro escribe tests de integración. Añade un tercero y un cuarto y tienes un pequeño enjambre.',
        },
        {
          type: 'paragraph',
          text: 'Y no te limita a Codex. Como cada agente es su propio proceso, puedes poner Codex CLI en algunos terminales y Claude Code o Gemini CLI en otros, todos trabajando sobre el mismo repositorio.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cada agente de Codex usa tu cuenta de OpenAI de forma independiente. No hay un plan "de enjambre" aparte ni un sobrecoste por tener varios agentes en paralelo. Pagas por lo que cada agente hace en realidad.',
        },
        {
          type: 'paragraph',
          text: 'El trabajo de verdad es gestionar el enjambre cuando crece. Los agentes de Codex se paran para pedir aprobaciones, terminan en momentos distintos y a veces tocan los mismos archivos. Los tres métodos de abajo resuelven esa coordinación con muy distinta cantidad de fricción.',
        },
      ],
    },
    {
      id: 'metodo-ventanas-terminal',
      title: 'Método 1: varias ventanas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'La forma más obvia de montar un enjambre de Codex es abrir varias pestañas de terminal, entrar en tu proyecto en cada una y arrancar Codex CLI. No hay nada que instalar más allá del propio Codex.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1\ncd ~/mi-proyecto\ncodex\n\n# Pestaña 2\ncd ~/mi-proyecto\ncodex\n\n# Pestaña 3\ncd ~/mi-proyecto\ncodex',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es ahora un agente de Codex independiente. Puedes darle una tarea distinta a cada uno e ir cambiando entre ellos mientras trabajan. Si ejecutas Codex en un modo de aprobación en lugar de full auto, cada pestaña se detendrá a esperar tu aprobación, lo que te obliga a saltar de pestaña en pestaña para que sigan avanzando.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ventajas',
          id: 'ventanas-terminal-ventajas',
        },
        {
          type: 'list',
          items: [
            'Gratis, nada que configurar más allá de Codex CLI',
            'Funciona al instante con herramientas que ya tienes',
            'Fácil de razonar: una pestaña es un agente',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desventajas',
          id: 'ventanas-terminal-desventajas',
        },
        {
          type: 'list',
          items: [
            'Pierdes la pista de qué pestaña hace qué casi de inmediato',
            'Sin aviso cuando un agente de Codex termina o se para a pedir una aprobación',
            'Sin vista compartida: tienes que entrar en cada pestaña para ver el progreso',
            'No hay forma de buscar en el historial de conversación de los distintos agentes',
            'Si dos agentes editan el mismo archivo, desliarlo es cosa tuya',
            'Con tres pestañas o más todas se ven iguales',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para dos agentes va bien. A partir de ahí, el tiempo que pasas buscando la pestaña que necesita una aprobación empieza a comerse la velocidad que ganaste al ir en paralelo.',
        },
      ],
    },
    {
      id: 'metodo-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si vives en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te deja dividir una ventana en paneles y mantener sesiones vivas en segundo plano. Puedes ver varios agentes de Codex a la vez sin cambiar de pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inicia una sesión nueva de tmux\ntmux new-session -s codex-swarm\n\n# Divide en horizontal\ntmux split-window -h\n\n# Divide el panel derecho en vertical\ntmux split-window -v\n\n# Ahora tienes 3 paneles - ejecuta codex en cada uno',
        },
        {
          type: 'paragraph',
          text: 'tmux también te deja desconectarte y volver a conectarte, así que tus agentes de Codex siguen funcionando aunque cierres la ventana del terminal. Eso es muy útil para migraciones o refactors largos que corren en full auto.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ventajas',
          id: 'tmux-ventajas',
        },
        {
          type: 'list',
          items: [
            'Gratis y disponible en casi cualquier máquina Unix',
            'Ves varios paneles a la vez, sin cambiar de pestaña',
            'Las sesiones sobreviven a las desconexiones, ideal para tiradas largas en full auto',
            'Programable y configurable hasta el último atajo de teclado',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desventajas',
          id: 'tmux-desventajas',
        },
        {
          type: 'list',
          items: [
            'Curva de aprendizaje real si nunca has usado tmux',
            'Sigue sin haber aviso de escritorio cuando un agente termina o pide aprobación',
            'Sin historial de conversación ni búsqueda entre agentes',
            'Los paneles de solo texto se quedan estrechos pasando de tres o cuatro agentes de Codex',
            'No hay tablero de tareas ni capa de organización encima',
            'Rehaces el layout a mano en cada sesión, salvo que lo programes',
            'Los conflictos entre agentes que tocan el mismo archivo siguen siendo tu problema',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es un gran multiplexor de propósito general y muchos developers ya lo usan. Pero nunca se diseñó para supervisar agentes de IA en concreto. En el momento en que un agente de Codex en el panel 3 se para en silencio a pedir una aprobación mientras tú lees el panel 1, notas el hueco.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio hecha justo para esto: ejecutar y supervisar un enjambre de agentes CLI de IA en un solo sitio. Funciona en macOS y en Windows, te da varios terminales en un mismo espacio de trabajo y te deja elegir el agente por terminal. Para un enjambre de Codex solo tienes que elegir "codex cli" en el selector SELECT AI AGENT de cada terminal que quieras con Codex.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con claude-code, gemini cli y codex cli, además de un interruptor Enable Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en codex cli para montar un enjambre de Codex, con un interruptor de Turbo Mode para el modo full-auto.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que ganas cuando todos los agentes son Codex (o una mezcla):',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Varios agentes de Codex en paralelo',
          id: 'seis-terminales',
        },
        {
          type: 'paragraph',
          text: 'Pon cada terminal en "codex cli" para un enjambre 100% Codex, o mezcla Claude Code y Gemini CLI donde encajen mejor. Cada terminal es un proceso de Codex totalmente independiente, con su propia conversación y contexto de proyecto. CodeAgentSwarm funciona por encima de tus suscripciones actuales, así que no es un proveedor de modelos: solo orquesta los agentes que ya pagas.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'titulos-dinamicos',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su propio título para reflejar lo que está haciendo su agente de Codex en ese momento. En lugar de varias pestañas etiquetadas todas como "codex", lees títulos como "Migrando esquema de usuarios", "Escribiendo tests de API" o "Refactorizando auth". Sabes qué agente lleva qué tarea sin entrar en ninguno.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notificaciones-escritorio',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que más arregla un enjambre. Cuando un agente de Codex termina su tarea o se para a pedir una aprobación, recibes una notificación nativa de escritorio. Dejas de vigilar paneles y dejas que los agentes te llamen cuando de verdad te necesitan, que es justo el sentido de tenerlos en paralelo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial completo de conversaciones, con búsqueda',
          id: 'historial-conversaciones',
        },
        {
          type: 'paragraph',
          text: 'Cada conversación de cada terminal se guarda y se puede buscar, también entre agentes distintos. Puedes volver atrás y encontrar qué decidió ayer un agente de Codex, retomarlo o rastrear exactamente qué agente hizo un cambio concreto. Con un enjambre en marcha, ese rastro es lo que mantiene legible todo el conjunto.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tablero de tareas integrado',
          id: 'tablero-tareas',
        },
        {
          type: 'paragraph',
          text: 'Un tablero kanban de tareas vive junto a tus terminales, y los propios agentes lo actualizan por MCP. Creas tareas, se las pasas a los terminales y ves moverse las tarjetas a medida que cada agente de Codex coge, trabaja y termina. Cuando varios agentes avanzan sobre funcionalidades relacionadas, el tablero mantiene el plan a la vista en lugar de solo en tu cabeza. La capa visual completa, función a función, está en la <a href="/es/guias/interfaz-grafica-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de la interfaz gráfica de Codex</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode y permisos granulares',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Codex tiene sus propios modos de aprobación, desde solo-sugerir hasta full auto con <code>--full-auto</code>, además de un sandbox. CodeAgentSwarm se coloca por encima con Turbo Mode y permisos por terminal, así que puedes dejar que los agentes corran en full auto en las operaciones seguras mientras frenas las peligrosas. Esa es la forma práctica de tener un enjambre de Codex rápido sin dejarlo sin supervisión. La <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode</a> cubre la configuración.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'diffs-archivos',
        },
        {
          type: 'paragraph',
          text: 'Puedes ver en tiempo real los cambios de archivos que va haciendo cada agente de Codex, por terminal y a nivel de proyecto. Cuando dos agentes editan el mismo archivo, lo ves mientras pasa en lugar de descubrirlo más tarde en un diff hecho un lío. Git sigue encargándose del merge, pero esa visibilidad hace que las ediciones solapadas nunca te pillen por sorpresa.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Es la primera vez que ejecutas varios terminales a la vez? La <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de múltiples terminales</a> repasa el layout y el flujo de trabajo, y se aplica igual tanto si el agente es Codex como Claude Code.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así quedan las tres formas de ejecutar un enjambre de Codex en lo que de verdad molesta cuando pasas de dos agentes:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Coste',
          id: 'comparar-coste',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Gratis',
            '<strong>tmux/screen:</strong> Gratis',
            '<strong>CodeAgentSwarm:</strong> Plan gratuito disponible, Pro para funciones avanzadas. Tu uso de Codex lo factura OpenAI como siempre.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tiempo de configuración',
          id: 'comparar-configuracion',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Cero, solo abrir pestañas y ejecutar codex',
            '<strong>tmux/screen:</strong> De 10 a 30 minutos para lo básico, más para programar un layout reutilizable',
            '<strong>CodeAgentSwarm:</strong> Un par de minutos para descargar, abrir y elegir codex cli por terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones',
          id: 'comparar-notificaciones',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Ninguna',
            '<strong>tmux/screen:</strong> Ninguna salvo que programes algo a medida',
            '<strong>CodeAgentSwarm:</strong> Notificaciones nativas de escritorio cuando un agente termina o necesita una aprobación',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversaciones',
          id: 'comparar-historial',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Se pierde al cerrar la pestaña',
            '<strong>tmux/screen:</strong> Se mantiene mientras la sesión viva, sin búsqueda',
            '<strong>CodeAgentSwarm:</strong> Guardado de forma permanente y con búsqueda entre todos los agentes',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Supervisión en full-auto',
          id: 'comparar-supervision',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Todo recae en ti, pestaña a pestaña',
            '<strong>tmux/screen:</strong> Visible en paneles, pero sin guardarraíles ni política por agente',
            '<strong>CodeAgentSwarm:</strong> Turbo Mode más permisos granulares para que el full-auto siga siendo seguro',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Curva de aprendizaje',
          id: 'comparar-aprendizaje',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Ninguna',
            '<strong>tmux/screen:</strong> De media a pronunciada, con atajos y archivos de configuración',
            '<strong>CodeAgentSwarm:</strong> Baja, una interfaz visual con patrones familiares',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Si nunca necesitas más de dos agentes de Codex a la vez, las pestañas de terminal van perfectamente. Si ya pasas el día dentro de tmux, meter unas cuantas sesiones de Codex en tus paneles es lo natural. Pero en cuanto ejecutas tres o más agentes de Codex en full auto de forma habitual y quieres ver de verdad qué hace cada uno, CodeAgentSwarm te quita la carga de coordinación que las otras dos te dejan encima.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un enjambre de agentes Codex?',
      answer: 'Un enjambre de agentes Codex es simplemente varios agentes de OpenAI Codex CLI funcionando en paralelo en lugar de uno detrás de otro. Cada agente es su propio proceso con su propia conversación y contexto, así que pueden trabajar en tareas distintas dentro del mismo repositorio al mismo tiempo. No es una función especial de Codex, solo una forma de trabajar que puedes montar con pestañas de terminal, con tmux o con una herramienta como CodeAgentSwarm.',
    },
    {
      question: '¿Se pueden ejecutar varias sesiones de Codex CLI a la vez?',
      answer: 'Sí. Cada vez que ejecutas el comando codex obtienes una sesión independiente, así que puedes abrir varios terminales y ejecutar Codex CLI en cada uno. No comparten contexto ni se pisan entre sí salvo que editen los mismos archivos. CodeAgentSwarm admite varios terminales para que supervises todo el enjambre en una sola ventana.',
    },
    {
      question: '¿Puedo mezclar Codex CLI y Claude Code en un mismo enjambre?',
      answer: 'Sí. Como cada agente es solo un proceso aparte, puedes ejecutar Codex CLI en algunos terminales y Claude Code o Gemini CLI en otros, todos sobre el mismo proyecto. En CodeAgentSwarm eliges el agente por terminal con el selector SELECT AI AGENT, así que un enjambre mixto es lo normal y no un apaño.',
    },
    {
      question: '¿Ejecutar varios agentes de Codex cuesta más?',
      answer: 'No hay recargo por ejecutar agentes en paralelo. Cada agente de Codex usa tu cuenta de OpenAI y se te factura por el trabajo que cada uno hace en realidad, igual que si los ejecutaras uno tras otro. Hacerlo a la vez termina antes, no cambia el coste por agente.',
    },
    {
      question: '¿Enjambre de agentes Codex frente a tmux?',
      answer: 'tmux puede alojar perfectamente un enjambre de Codex en paneles divididos, y es gratis. Lo que le falta es todo lo pensado para agentes de IA: ningún aviso de escritorio cuando un agente termina o pide una aprobación, ningún historial con búsqueda entre agentes, ningún título dinámico, ningún tablero de tareas y ninguna capa de permisos para las tiradas en full auto. CodeAgentSwarm añade todo eso por encima, que es lo que más importa justo cuando ejecutas varios agentes de Codex a la vez.',
    },
  ],
}

export default guide
