import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-kimi-code',
    locale: 'es',
    title: 'Enjambre de agentes Kimi Code: ejecuta varios agentes Kimi en paralelo',
    metaTitle: 'Enjambre de agentes Kimi Code: varios agentes Kimi en paralelo (2026)',
    metaDescription: 'Un enjambre de agentes Kimi Code ejecuta varias sesiones de kimi en paralelo. 3 formas: pestañas, tmux y CodeAgentSwarm, y cómo se comporta la cuota compartida de K3.',
    intro: `Un enjambre de agentes Kimi Code no es más que varios agentes de Kimi Code trabajando en paralelo en lugar de uno detrás de otro. Cada vez que ejecutas el comando <code>kimi</code> arrancas una sesión independiente con su propia conversación y su propio contexto, así que nada te impide tener tres o cuatro funcionando a la vez, cada uno con su tarea, todos con Kimi K3 debajo.

El truco no está en arrancar los procesos. Está en no perderles la pista cuando ya tienes varios agentes editando archivos, parándose a pedir permisos y terminando en momentos distintos. Y Kimi Code añade un matiz que las otras CLI no tienen con esta forma exacta: todos los agentes de tu enjambre tiran de la misma cuota de tu suscripción de Kimi, que se renueva cada semana y además tiene una ventana móvil de 5 horas. Un enjambre avanza más por hora, y también gasta ese fondo común más rápido.

En esta guía te explico las tres formas reales de montar un enjambre de Kimi Code, cómo se comporta la cuota compartida cuando vas en paralelo y dónde empieza a doler cada método. Para la foto completa de todas las CLI, empieza por la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>, y para la mecánica de sesiones en concreto mira cómo <a href="/es/guias/ejecutar-multiples-sesiones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Kimi Code</a>.`,
    ctaText: 'Ejecuta tu enjambre de agentes Kimi Code en CodeAgentSwarm. Varios terminales de kimi en paralelo, con diffs en vivo, notificaciones de escritorio y un indicador de cuota que muestra cuánto lleva gastado el enjambre de tus ventanas semanal y de 5 horas.',
    highlightedWords: ['Enjambre de agentes Kimi Code', 'Kimi'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'kimi-code-agent-swarm',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: sí, puedes montar un enjambre de Kimi Code',
      content: [
        {
          type: 'paragraph',
          text: 'Una sesión de <a href="https://github.com/MoonshotAI/kimi-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a> es solo un proceso. Instalas la CLI una vez (el script oficial es <code>curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash</code>, o <code>npm install -g @moonshot-ai/kimi-code</code> si ya tienes Node 22.19 o superior), haces login una vez con <code>/login</code> y, a partir de ahí, cada <code>kimi</code> que arrancas es un agente independiente con su propia conversación, su propio contexto y su propio directorio de trabajo. Dos sesiones no saben nada la una de la otra.',
        },
        {
          type: 'paragraph',
          text: 'Así que un enjambre de agentes Kimi Code no es un modo especial que desbloqueas. Es simplemente más de un agente de Kimi Code funcionando al mismo tiempo. Abre un segundo terminal, ejecuta <code>kimi</code> otra vez y ya tienes dos agentes independientes. Uno puede estar migrando una capa de base de datos mientras el otro escribe tests de integración. Añade un tercero y un cuarto y tienes un pequeño enjambre, todos con Kimi K3 y su ventana de contexto enorme.',
        },
        {
          type: 'paragraph',
          text: 'Cada sesión deja además rastro real en disco. Kimi Code guarda las sesiones como archivos planos en <code>~/.kimi-code/sessions/</code>, organizadas por proyecto, con el transcript y el título de la sesión. Para un enjambre eso importa: puedes ponerle nombre a cada sesión con <code>/title</code>, retomar la última de un directorio con <code>kimi --continue</code> y distinguir a tus agentes después. El <a href="/es/guias/historial-conversaciones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones de Kimi Code</a> cubre esa parte en detalle.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No confundas un enjambre con los subagentes de Kimi Code. Kimi Code trae tres subagentes integrados (coder, explore y plan) que corren dentro de una única sesión. Un enjambre es otra cosa: varias sesiones totalmente independientes, cada una con su terminal, su tarea y su transcript. Los subagentes paralelizan pasos de una tarea; un enjambre paraleliza tareas enteras.',
        },
        {
          type: 'paragraph',
          text: 'El trabajo de verdad es gestionar el enjambre cuando crece. Los agentes de Kimi Code se paran a pedir aprobación antes de acciones arriesgadas salvo que relajes los permisos, terminan en momentos distintos y a veces tocan los mismos archivos. Los tres métodos de abajo resuelven esa coordinación con muy distinta cantidad de fricción.',
        },
      ],
    },
    {
      id: 'cuota-compartida',
      title: 'Una suscripción, varios agentes: cómo se comporta la cuota',
      content: [
        {
          type: 'paragraph',
          text: 'Este es el dato específico de Kimi más importante antes de escalar. Todos los agentes de Kimi Code que ejecutes entran con la misma cuenta y tiran del mismo fondo de cuota. Esa cuota se renueva en ciclos semanales y, encima, hay una ventana móvil de 5 horas, así que una ráfaga de trabajo pesado en paralelo puede chocar con la ventana corta aunque te quede cuota semanal de sobra.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica, la ventana de 5 horas es el techo que un enjambre nota de verdad. Cuatro agentes masticando un repositorio grande a la vez consumen en una hora lo que un solo agente repartiría a lo largo de la tarde. No se rompe nada: simplemente llegas antes a la ventana y toca esperar a que ruede. Para el detalle completo de planes, multiplicadores y qué incluye cada nivel, mira la guía de <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">planes y precios de Kimi Code</a>.',
        },
        {
          type: 'list',
          items: [
            'Todos los agentes comparten un fondo: no hay cuota por terminal, así que un enjambre gasta más rápido que un agente solo',
            'Renovación semanal: el fondo se resetea en ciclos de 7 días desde la fecha de tu suscripción',
            'Ventana móvil de 5 horas: las ráfagas cortas se limitan aparte, y es lo primero que suele tocar el trabajo en paralelo',
            'Consulta el consumo en cualquier momento con el comando <code>/usage</code> dentro de cualquier sesión',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Ajusta el tamaño del enjambre al trabajo, no al revés. Dos o tres agentes en tareas de verdad independientes suele ser el punto dulce: progreso paralelo real sin fundirte la ventana de 5 horas en sobrecoste de coordinación.',
        },
      ],
    },
    {
      id: 'metodo-ventanas-terminal',
      title: 'Método 1: varias ventanas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'La forma más obvia de montar un enjambre de Kimi Code es abrir varias pestañas de terminal, entrar en tu proyecto en cada una y arrancar kimi. No hay nada que instalar más allá del propio Kimi Code.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1\ncd ~/mi-proyecto\nkimi\n\n# Pestaña 2\ncd ~/mi-proyecto\nkimi\n\n# Pestaña 3\ncd ~/mi-proyecto\nkimi',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es ahora un agente de Kimi Code independiente. Puedes darle una tarea distinta a cada uno e ir cambiando entre ellos mientras trabajan. Cuando un agente se para a pedir aprobación antes de ejecutar un comando o escribir un archivo, esa pestaña se queda ahí esperándote, así que acabas saltando de pestaña en pestaña para que el enjambre siga avanzando.',
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
            'Gratis, nada que configurar más allá de Kimi Code',
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
            'Sin aviso cuando un agente de Kimi Code termina o se para a pedir un permiso',
            'Sin vista compartida: tienes que entrar en cada pestaña para ver el progreso',
            'No hay forma de buscar en el historial de conversación de los distintos agentes',
            'Si dos agentes editan el mismo archivo, desliarlo es cosa tuya',
            'Nada te enseña cuánta cuota compartida lleva gastada el enjambre sin preguntar sesión a sesión',
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
          text: 'Si vives en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te deja dividir una ventana en paneles y mantener sesiones vivas en segundo plano. Puedes ver varios agentes de Kimi Code a la vez sin cambiar de pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inicia una sesión nueva de tmux\ntmux new-session -s kimi-swarm\n\n# Divide en horizontal\ntmux split-window -h\n\n# Divide el panel derecho en vertical\ntmux split-window -v\n\n# Ahora tienes 3 paneles - ejecuta kimi en cada uno',
        },
        {
          type: 'paragraph',
          text: 'tmux también te deja desconectar y volver a conectar, así que tus agentes de Kimi Code siguen funcionando aunque cierres la ventana del terminal. Un aviso honesto para tiradas desatendidas: Kimi Code es una CLI joven que se mueve muy rápido, y hay reportes abiertos upstream de sesiones que se quedan colgadas en silencio cuando una petición se atasca. Un panel colgado en una sesión de tmux desconectada se ve exactamente igual que uno trabajando, así que revisa las tiradas largas en lugar de asumir que el silencio es progreso.',
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
            'Las sesiones sobreviven a las desconexiones, útil para tiradas largas',
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
            'Sigue sin haber notificación de escritorio cuando un agente termina o pide un permiso',
            'Sin historial de conversación ni búsqueda entre agentes',
            'Los paneles de solo texto se quedan pequeños a partir de tres o cuatro agentes',
            'Un agente colgado en silencio se ve idéntico a uno ocupado',
            'Reconstruyes el layout a mano en cada sesión salvo que lo scriptees',
            'Los conflictos entre agentes que tocan el mismo archivo siguen siendo problema tuyo',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux es un multiplexor excelente y muchos desarrolladores ya lo usan. Pero no se construyó para supervisar agentes de IA. En el momento en que un agente de Kimi Code en el panel 3 se para en silencio a pedir un permiso mientras tú lees el panel 1, notas el hueco.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio construida exactamente para esto: ejecutar y supervisar un enjambre de agentes CLI de IA en un solo sitio. Funciona en macOS y Windows, te da varios terminales en un mismo espacio de trabajo y te deja elegir el agente por terminal. Kimi Code es un agente de primera clase junto a Claude Code, Codex CLI, Antigravity CLI y opencode, así que para un enjambre de Kimi solo tienes que elegir Kimi Code en el selector de agente de cada terminal.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que te da cuando todos los agentes son Kimi Code (o una mezcla):',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Varios agentes de Kimi Code en paralelo',
          id: 'varios-agentes-kimi',
        },
        {
          type: 'paragraph',
          text: 'Pon todos los terminales en Kimi Code para un enjambre puro de Kimi, o mezcla Claude Code y Codex CLI donde encajen mejor. Cada terminal es un proceso kimi totalmente independiente con su propia conversación y su contexto de proyecto. CodeAgentSwarm funciona encima de tu suscripción de Kimi, así que no es un proveedor de modelos: orquesta los agentes que ya pagas.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cuota visible para todo el enjambre',
          id: 'cuota-visible',
        },
        {
          type: 'paragraph',
          text: 'Como todos los agentes de Kimi vacían el mismo fondo, CodeAgentSwarm muestra un indicador de consumo que lee tu cuota real de Kimi, tanto el ciclo semanal como la ventana móvil de 5 horas. Ves de un vistazo cuánto lleva gastado el enjambre en lugar de escribir /usage en cada sesión y sumar de cabeza.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad en tiempo real con títulos dinámicos',
          id: 'titulos-dinamicos',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal actualiza su propio título para reflejar lo que su agente está haciendo ahora mismo. En lugar de varias pestañas etiquetadas "kimi", lees títulos como "Migrando el esquema de usuarios", "Escribiendo tests de la API", "Refactorizando el auth". Sabes qué agente lleva qué tarea sin entrar en ninguno.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notificaciones de escritorio',
          id: 'notificaciones-escritorio',
        },
        {
          type: 'paragraph',
          text: 'Este es el mayor arreglo para un enjambre. Cuando un agente de Kimi Code termina su tarea o se para a pedir un permiso, te llega una notificación nativa de escritorio. Dejas de hacer de niñera de paneles y dejas que los agentes te llamen cuando de verdad te necesitan. También es la respuesta práctica al problema de las sesiones colgadas: cuando un agente que debería haberte avisado lleva demasiado rato callado, te das cuenta.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversación completo y buscable',
          id: 'historial-conversacion',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code guarda sus sesiones en local como archivos planos, y CodeAgentSwarm los lee, así que cada conversación de Kimi queda guardada y buscable, incluso entre agentes y CLI distintas. Puedes volver atrás y encontrar lo que un agente decidió ayer, retomarlo o rastrear exactamente qué agente hizo un cambio concreto. Con un enjambre en marcha, ese rastro de auditoría es lo que mantiene todo legible.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tablero de tareas integrado',
          id: 'tablero-tareas',
        },
        {
          type: 'paragraph',
          text: 'Un tablero kanban vive junto a tus terminales, y los propios agentes lo actualizan por MCP. Kimi Code habla las mismas convenciones de tools MCP que Claude Code, así que la integración del tablero funciona igual: creas tareas, se las repartes a los terminales y ves moverse las tarjetas mientras cada agente coge trabajo, avanza y termina.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diffs de archivos en vivo por terminal',
          id: 'diffs-archivos',
        },
        {
          type: 'paragraph',
          text: 'Puedes ver en tiempo real los cambios de archivos que hace cada agente de Kimi Code, por terminal y a nivel de proyecto. Cuando dos agentes editan el mismo archivo, lo ves mientras pasa en lugar de descubrirlo después en un diff enrevesado. Esto importa aún más si ejecutas agentes con <code>--yolo</code>: la guía del <a href="/es/guias/modo-yolo-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">modo YOLO de Kimi Code</a> explica cómo mantener a raya a un agente que se autoaprueba todo.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Ejecutar agentes en el mismo repositorio puede seguir produciendo ediciones solapadas. Para enjambres grandes, dale a cada agente su propia copia del repo con git worktrees. La guía de <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees para agentes de IA</a> muestra el montaje.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Así se comparan las tres formas de montar un enjambre de Kimi Code en lo que de verdad muerde cuando pasas de dos agentes:',
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
            '<strong>CodeAgentSwarm:</strong> Tiene nivel gratuito, Pro para funciones avanzadas. Tu consumo de Kimi se factura por tu suscripción de Kimi en cualquiera de los casos.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tiempo de puesta en marcha',
          id: 'comparar-puesta-en-marcha',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Cero, abre pestañas y ejecuta kimi',
            '<strong>tmux/screen:</strong> 10-30 minutos para lo básico, más si scripteas un layout reutilizable',
            '<strong>CodeAgentSwarm:</strong> Un par de minutos para descargar, abrir y elegir Kimi Code por terminal',
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
            '<strong>tmux/screen:</strong> Ninguna salvo que scriptees algo a medida',
            '<strong>CodeAgentSwarm:</strong> Notificaciones nativas de escritorio cuando un agente termina o necesita un permiso',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibilidad de la cuota',
          id: 'comparar-cuota',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Escribe /usage en cada sesión y suma tú',
            '<strong>tmux/screen:</strong> Lo mismo, panel a panel',
            '<strong>CodeAgentSwarm:</strong> Un indicador que lee tus ventanas semanal y de 5 horas de Kimi para todo el enjambre',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversación',
          id: 'comparar-historial',
        },
        {
          type: 'list',
          items: [
            '<strong>Pestañas de terminal:</strong> Está en disco, pero sin nada con qué buscarlo',
            '<strong>tmux/screen:</strong> Igual, más el scrollback mientras vive el panel',
            '<strong>CodeAgentSwarm:</strong> Lee las sesiones locales de Kimi Code y las hace buscables entre todos los agentes',
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
            '<strong>tmux/screen:</strong> De moderada a empinada, con atajos y archivos de config',
            '<strong>CodeAgentSwarm:</strong> Baja, una interfaz visual con patrones familiares',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Si solo necesitas dos agentes de Kimi Code a la vez, las pestañas de terminal van perfectamente. Si ya vives dentro de tmux, meter unas cuantas sesiones de kimi en tus paneles es lo natural. Pero cuando ejecutas con regularidad tres o más agentes contra una misma cuota compartida y quieres ver de verdad qué hace y qué gasta cada uno, CodeAgentSwarm te quita de encima la coordinación que los otros dos te dejan a ti.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un enjambre de agentes Kimi Code?',
      answer: 'Un enjambre de agentes Kimi Code es simplemente varios agentes de Kimi Code funcionando en paralelo en lugar de uno detrás de otro. Cada agente es su propio proceso kimi con su propia conversación y contexto, así que pueden trabajar en tareas distintas del mismo repositorio al mismo tiempo. No es una función especial de Kimi Code, es una forma de trabajar que puedes montar con pestañas de terminal, tmux o una herramienta como CodeAgentSwarm.',
    },
    {
      question: '¿Puedo ejecutar varias sesiones de Kimi Code a la vez?',
      answer: 'Sí. Cada vez que ejecutas el comando kimi obtienes una sesión independiente, así que puedes abrir varios terminales y ejecutar kimi en cada uno. No comparten contexto ni se pisan entre sí salvo que editen los mismos archivos. CodeAgentSwarm soporta varios terminales para que supervises todo el enjambre en una sola ventana.',
    },
    {
      question: '¿Cuesta más ejecutar agentes de Kimi Code en paralelo?',
      answer: 'No hay sobrecoste por el paralelismo, pero sí un fondo compartido. Todos los agentes tiran de la misma cuota de tu suscripción de Kimi, que se renueva cada semana y además tiene una ventana móvil de 5 horas. Cuatro agentes a la vez terminan el trabajo antes consumiendo la cuota más rápido, así que los enjambres intensos suelen notar primero la ventana de 5 horas. La cantidad total de trabajo que te da tu plan no cambia.',
    },
    {
      question: '¿Un enjambre es lo mismo que los subagentes de Kimi Code?',
      answer: 'No. Kimi Code trae tres subagentes integrados (coder, explore y plan) que corren dentro de una única sesión y comparten el contexto y la cuota de esa sesión. Un enjambre son varias sesiones totalmente independientes, cada una en su terminal con su tarea y su transcript. Los subagentes paralelizan pasos dentro de una tarea; un enjambre paraleliza tareas enteras.',
    },
    {
      question: '¿Puedo mezclar Kimi Code y Claude Code en un mismo enjambre?',
      answer: 'Sí. Como cada agente es un proceso aparte, puedes ejecutar Kimi Code en unos terminales y Claude Code, Codex CLI u opencode en otros, todos sobre el mismo proyecto. En CodeAgentSwarm eliges el agente por terminal, así que un enjambre mixto es lo normal, no un apaño. Y si lo que quieres es el modelo K3 dentro del propio Claude Code, ese montaje también existe y lo cubre la guía de Kimi K3 con Claude Code.',
    },
    {
      question: '¿Enjambre de agentes Kimi Code o tmux?',
      answer: 'tmux puede alojar sin problema un enjambre de Kimi Code en paneles divididos, y es gratis. Lo que le falta es todo lo pensado para agentes de IA: sin notificación de escritorio cuando un agente termina o pide un permiso, sin historial buscable entre agentes, sin vista de cuota y sin diffs en vivo. Esos huecos pesan más con Kimi Code que con la mayoría de CLI, porque todos tus agentes vacían una misma cuota compartida y una sesión colgada puede quedarse muda en un panel pareciendo ocupada.',
    },
  ],
}

export default guide
