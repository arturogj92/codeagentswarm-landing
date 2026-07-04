import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-opencode',
    locale: 'es',
    title: 'Enjambre de agentes OpenCode: ejecuta varios agentes opencode en paralelo',
    metaTitle: 'Enjambre de agentes OpenCode: varios agentes opencode en paralelo (2026)',
    metaDescription: 'Un enjambre de agentes opencode ejecuta varios agentes en paralelo. Aprende 3 formas: pestañas, tmux y CodeAgentSwarm, con cada agente en el proveedor que quieras.',
    intro: `Un enjambre de agentes opencode no es más que varios agentes de opencode trabajando en paralelo en lugar de uno detrás de otro. Como cada sesión de opencode es su propio proceso, nada te impide tener un puñado funcionando a la vez, cada uno con su tarea.

El truco no está en arrancar los procesos. Está en no perderles la pista cuando ya tienes tres o cuatro agentes editando archivos, esperando permisos y terminando en momentos distintos. Ahí es donde suelen romperse los enjambres mal montados. opencode añade un matiz que conviene saber de entrada: como es agnóstico de proveedor, los agentes de tu enjambre ni siquiera tienen que compartir el mismo proveedor de modelos.

En esta guía te explico las tres formas reales de ejecutar un enjambre de opencode, las comparo de forma honesta y te muestro dónde empieza a doler cada una. Si quieres la foto completa de todas las CLI, empieza por la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>, y si quieres la mecánica de las sesiones en paralelo en concreto mira cómo <a href="/es/guias/ejecutar-multiples-sesiones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de opencode</a>.`,
    ctaText: 'Ejecuta tu enjambre de agentes opencode en CodeAgentSwarm. Varios terminales de opencode en paralelo, en el proveedor de modelos que quieras, con diffs en vivo y notificaciones de escritorio para mantener a raya a cada agente.',
    highlightedWords: ['Enjambre de agentes OpenCode', 'opencode'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'opencode-agent-swarm',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: sí, puedes montar un enjambre de opencode',
      content: [
        {
          type: 'image',
          alt: 'Varios terminales de opencode ejecutándose en paralelo en un único espacio de trabajo de CodeAgentSwarm, cada uno una sesión de opencode independiente',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'Un enjambre de agentes opencode: varias sesiones de opencode independientes ejecutándose a la vez en una sola ventana de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Una sesión de <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a> es solo un proceso. La arrancas con el comando <code>opencode</code>, conectas un proveedor de modelos una vez (consulta la documentación oficial de opencode para el flujo exacto de autenticación, algo del estilo <code>opencode auth login</code>) y, a partir de ahí, cada sesión tiene su propia conversación, su propio contexto y su propio directorio de trabajo. Dos sesiones no saben nada la una de la otra.',
        },
        {
          type: 'paragraph',
          text: 'Así que un enjambre de agentes opencode no es un modo especial que desbloqueas. Es simplemente más de un agente de opencode funcionando al mismo tiempo. Abre un segundo terminal, ejecuta <code>opencode</code> otra vez y ya tienes dos agentes independientes. Uno puede estar migrando una capa de base de datos mientras el otro escribe tests de integración. Añade un tercero y un cuarto y tienes un pequeño enjambre.',
        },
        {
          type: 'paragraph',
          text: 'opencode tiene una propiedad que la mayoría de agentes CLI no: es agnóstico de proveedor, así que funciona con Anthropic, OpenAI, Google y modelos locales. Eso significa que un enjambre no tiene por qué ser de un solo proveedor a nivel de modelo. Puedes apuntar un terminal a Anthropic, otro a OpenAI, un tercero a Google y un cuarto a un modelo local, todos sobre el mismo repositorio. Cada agente elige el modelo que mejor le va a su tarea, y a ninguno le importa con qué corren los demás.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'opencode es de código abierto. Cada agente usa la cuenta de proveedor que le conectaste, así que no hay un plan "de enjambre" aparte ni un sobrecoste por tener varios agentes en paralelo. Le pagas a cada proveedor por lo que cada agente hace en realidad.',
        },
        {
          type: 'paragraph',
          text: 'El trabajo de verdad es gestionar el enjambre cuando crece. Según tu configuración de permisos, los agentes de opencode se paran a pedir aprobación en algunas acciones, terminan en momentos distintos y a veces tocan los mismos archivos. Los tres métodos de abajo resuelven esa coordinación con muy distinta cantidad de fricción.',
        },
      ],
    },
    {
      id: 'metodo-ventanas-terminal',
      title: 'Método 1: varias ventanas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'La forma más obvia de montar un enjambre de opencode es abrir varias pestañas de terminal, entrar en tu proyecto en cada una y arrancar opencode. No hay nada que instalar más allá del propio opencode (<code>npm install -g opencode-ai</code>).',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1\ncd ~/mi-proyecto\nopencode\n\n# Pestaña 2\ncd ~/mi-proyecto\nopencode\n\n# Pestaña 3\ncd ~/mi-proyecto\nopencode',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es ahora un agente de opencode independiente. Puedes darle una tarea distinta a cada uno e ir cambiando entre ellos mientras trabajan. Si tu configuración de permisos hace que los agentes pregunten antes de ejecutar comandos o escribir archivos, cada pestaña se detendrá a esperarte, lo que te obliga a saltar de pestaña en pestaña para que sigan avanzando. Si además apuntas cada pestaña a un proveedor distinto, tienes que acordarte de qué modelo hay detrás de cada una.',
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
            'Gratis, nada que configurar más allá de opencode',
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
            'Sin aviso cuando un agente de opencode termina o se para a pedir un permiso',
            'Sin vista compartida: tienes que entrar en cada pestaña para ver el progreso',
            'No hay forma de buscar en el historial de conversación de los distintos agentes',
            'Si dos agentes editan el mismo archivo, desliarlo es cosa tuya',
            'Con tres pestañas o más todas se ven iguales, y nada indica qué proveedor usa cada una',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para dos agentes va bien. A partir de ahí, el tiempo que pasas buscando la pestaña que necesita tu atención empieza a comerse la velocidad que ganaste al ir en paralelo.',
        },
      ],
    },
    {
      id: 'metodo-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si vives en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te deja dividir una ventana en paneles y mantener sesiones vivas en segundo plano. Puedes ver varios agentes de opencode a la vez sin cambiar de pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inicia una sesión nueva de tmux\ntmux new-session -s opencode-swarm\n\n# Divide en horizontal\ntmux split-window -h\n\n# Divide el panel derecho en vertical\ntmux split-window -v\n\n# Ahora tienes 3 paneles - ejecuta opencode en cada uno',
        },
        {
          type: 'paragraph',
          text: 'tmux también te deja desconectarte y volver a conectarte, así que tus agentes de opencode siguen funcionando aunque cierres la ventana del terminal. Eso es muy útil para migraciones o refactors largos, sobre todo cuando un panel corre en un modelo más lento o más barato que los demás y tarda más en terminar.',
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
            'Las sesiones sobreviven a las desconexiones, ideal para tiradas largas',
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
            'Sigue sin haber aviso de escritorio cuando un agente termina o pide un permiso',
            'Sin historial de conversación ni búsqueda entre agentes',
            'Los paneles de solo texto se quedan estrechos pasando de tres o cuatro agentes de opencode',
            'No hay tablero de tareas ni capa de organización encima',
            'Rehaces el layout a mano en cada sesión, salvo que lo programes',
            'Los conflictos entre agentes que tocan el mismo archivo siguen siendo tu problema',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es un gran multiplexor de propósito general y muchos developers ya lo usan. Pero nunca se diseñó para supervisar agentes de IA en concreto. En el momento en que un agente de opencode en el panel 3 se para en silencio a pedir un permiso mientras tú lees el panel 1, notas el hueco.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio hecha justo para esto: ejecutar y supervisar un enjambre de agentes CLI de IA en un solo sitio. Funciona en macOS, Linux y Windows, te da varios terminales en un mismo espacio de trabajo y te deja elegir el agente por terminal. Para un enjambre de opencode solo tienes que elegir "opencode" en el selector SELECT AI AGENT de cada terminal que quieras con opencode.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT donde eliges el agente por terminal, incluido opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en opencode para montar un enjambre de opencode.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que ganas cuando todos los agentes son opencode (o una mezcla):',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Varios agentes de opencode en paralelo',
          id: 'seis-terminales',
        },
        {
          type: 'paragraph',
          text: 'Pon cada terminal en "opencode" para un enjambre 100% opencode, o mezcla Claude Code y Codex CLI donde encajen mejor. Cada terminal es un proceso de opencode totalmente independiente, con su propia conversación y contexto de proyecto, y cada uno puede apuntar al proveedor que le conectaste. CodeAgentSwarm funciona por encima de tus cuentas actuales, así que no es un proveedor de modelos: solo orquesta los agentes que ya pagas.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'titulos-dinamicos',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su propio título para reflejar lo que está haciendo su agente de opencode en ese momento. En lugar de varias pestañas etiquetadas todas como "opencode", lees títulos como "Migrando esquema de usuarios", "Escribiendo tests de API" o "Refactorizando auth". Sabes qué agente lleva qué tarea sin entrar en ninguno.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notificaciones-escritorio',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que más arregla un enjambre. Cuando un agente de opencode termina su tarea o se para a pedir un permiso, recibes una notificación nativa de escritorio. Dejas de vigilar paneles y dejas que los agentes te llamen cuando de verdad te necesitan, que es justo el sentido de tenerlos en paralelo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial completo de conversaciones, con búsqueda',
          id: 'historial-conversaciones',
        },
        {
          type: 'paragraph',
          text: 'opencode guarda sus sesiones en local, y CodeAgentSwarm las lee, así que cada conversación de opencode se guarda y se puede buscar, también entre agentes distintos. Puedes volver atrás y encontrar qué decidió ayer un agente de opencode, retomarlo o rastrear exactamente qué agente hizo un cambio concreto. La <a href="/es/guias/historial-conversaciones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de conversaciones de opencode</a> explica cómo funciona. Con un enjambre en marcha, ese rastro es lo que mantiene legible todo el conjunto.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tablero de tareas integrado',
          id: 'tablero-tareas',
        },
        {
          type: 'paragraph',
          text: 'Un tablero kanban de tareas vive junto a tus terminales, y los propios agentes lo actualizan por MCP. Creas tareas, se las pasas a los terminales y ves moverse las tarjetas a medida que cada agente de opencode coge, trabaja y termina. Cuando varios agentes avanzan sobre funcionalidades relacionadas, el tablero mantiene el plan a la vista en lugar de solo en tu cabeza.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Modo full auto según la configuración de opencode',
          id: 'full-auto-config',
        },
        {
          type: 'paragraph',
          text: 'opencode no tiene un único flag de full-auto ni de saltarse las confirmaciones. Cómo de autónomo corre un agente lo decide su configuración de permisos en <code>opencode.json</code>, que puedes fijar de forma global en <code>~/.config/opencode/opencode.json</code>, por proyecto o por agente. Así que la forma de ejecutar un enjambre sin intervención es aflojar los permisos en esa configuración, no pulsar un interruptor. Por eso CodeAgentSwarm no añade un toggle de Turbo Mode para opencode como sí hace con Claude Code y Codex. En su lugar mantiene supervisada una configuración permisiva de opencode: tienes los diffs en vivo y las notificaciones de escritorio de abajo para que una configuración sin intervención nunca corra a ciegas. La <a href="/es/guias/modo-yolo-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del modo YOLO de opencode</a> tiene la foto completa sobre autonomía y permisos.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'diffs-archivos',
        },
        {
          type: 'paragraph',
          text: 'Puedes ver en tiempo real los cambios de archivos que va haciendo cada agente de opencode, por terminal y a nivel de proyecto. Cuando dos agentes editan el mismo archivo, lo ves mientras pasa en lugar de descubrirlo más tarde en un diff hecho un lío. Git sigue encargándose del merge, pero esa visibilidad hace que las ediciones solapadas nunca te pillen por sorpresa. Con opencode esto importa más precisamente porque no hay un interruptor de full-auto en el que apoyarse: los diffs en vivo son la forma de mantener responsable una configuración permisiva.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Es la primera vez que ejecutas varios terminales a la vez? La <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de múltiples terminales</a> repasa el layout y el flujo de trabajo, y se aplica igual tanto si el agente es opencode como Claude Code.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así quedan las tres formas de ejecutar un enjambre de opencode en lo que de verdad molesta cuando pasas de dos agentes:',
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
            '<strong>CodeAgentSwarm:</strong> Plan gratuito disponible, Pro para funciones avanzadas. Tu uso de opencode lo facturan los proveedores que conectes.',
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
            '<strong>Pestañas de terminal:</strong> Cero, solo abrir pestañas y ejecutar opencode',
            '<strong>tmux/screen:</strong> De 10 a 30 minutos para lo básico, más para programar un layout reutilizable',
            '<strong>CodeAgentSwarm:</strong> Un par de minutos para descargar, abrir y elegir opencode por terminal',
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
            '<strong>CodeAgentSwarm:</strong> Notificaciones nativas de escritorio cuando un agente termina o necesita un permiso',
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
            '<strong>CodeAgentSwarm:</strong> Lee las sesiones que opencode guarda en local y las hace buscables entre todos los agentes',
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
            '<strong>tmux/screen:</strong> Visible en paneles, pero sin guardarraíles encima',
            '<strong>CodeAgentSwarm:</strong> La configuración de opencode decide la autonomía, CodeAgentSwarm añade diffs en vivo, notificaciones y visibilidad por terminal para que las configuraciones permisivas sigan supervisadas',
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
          text: 'Si nunca necesitas más de dos agentes de opencode a la vez, las pestañas de terminal van perfectamente. Si ya pasas el día dentro de tmux, meter unas cuantas sesiones de opencode en tus paneles es lo natural. Pero en cuanto ejecutas tres o más agentes de opencode de forma habitual, sobre todo repartidos entre distintos proveedores de modelos, y quieres ver de verdad qué hace cada uno, CodeAgentSwarm te quita la carga de coordinación que las otras dos te dejan encima.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un enjambre de agentes opencode?',
      answer: 'Un enjambre de agentes opencode es simplemente varios agentes de opencode funcionando en paralelo en lugar de uno detrás de otro. Cada agente es su propio proceso con su propia conversación y contexto, así que pueden trabajar en tareas distintas dentro del mismo repositorio al mismo tiempo. No es una función especial de opencode, solo una forma de trabajar que puedes montar con pestañas de terminal, con tmux o con una herramienta como CodeAgentSwarm.',
    },
    {
      question: '¿Se pueden ejecutar varias sesiones de opencode a la vez?',
      answer: 'Sí. Cada vez que ejecutas el comando opencode obtienes una sesión independiente, así que puedes abrir varios terminales y ejecutar opencode en cada uno. No comparten contexto ni se pisan entre sí salvo que editen los mismos archivos. CodeAgentSwarm admite varios terminales para que supervises todo el enjambre en una sola ventana.',
    },
    {
      question: '¿Puedo mezclar opencode y Claude Code en un mismo enjambre?',
      answer: 'Sí. Como cada agente es solo un proceso aparte, puedes ejecutar opencode en algunos terminales y Claude Code o Codex CLI en otros, todos sobre el mismo proyecto. En CodeAgentSwarm eliges el agente por terminal con el selector SELECT AI AGENT, así que un enjambre mixto es lo normal y no un apaño.',
    },
    {
      question: '¿Puede cada agente de opencode usar un proveedor de modelos distinto?',
      answer: 'Sí, y es una de las fortalezas de opencode. opencode es agnóstico de proveedor, así que funciona con Anthropic, OpenAI, Google y modelos locales. En un enjambre puedes poner cada terminal en un proveedor distinto: un agente en Anthropic, otro en OpenAI, otro en un modelo local, todos en el mismo repositorio. Cada agente corre en el proveedor que le conectaste, así que puedes ajustar el modelo a la tarea en lugar de quedarte atado a un único proveedor.',
    },
    {
      question: '¿Ejecutar varios agentes de opencode cuesta más?',
      answer: 'No hay recargo por ejecutar agentes en paralelo. Cada agente de opencode usa la cuenta de proveedor que le conectaste, y cada proveedor te factura por el trabajo que su agente hace en realidad, igual que si los ejecutaras uno tras otro. Hacerlo a la vez termina antes, no cambia el coste por agente.',
    },
    {
      question: '¿Enjambre de agentes opencode frente a tmux?',
      answer: 'tmux puede alojar perfectamente un enjambre de opencode en paneles divididos, y es gratis. Lo que le falta es todo lo pensado para agentes de IA: ningún aviso de escritorio cuando un agente termina o pide un permiso, ningún historial con búsqueda entre agentes, ningún título dinámico, ningún tablero de tareas y ningún diff en vivo para mantener responsable una configuración permisiva de opencode. CodeAgentSwarm añade todo eso por encima, que es lo que más importa justo cuando ejecutas varios agentes de opencode a la vez, quizá en distintos proveedores.',
    },
  ],
}

export default guide
