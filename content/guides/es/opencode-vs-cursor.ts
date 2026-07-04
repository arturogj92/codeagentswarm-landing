import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-vs-cursor',
    locale: 'es',
    title: 'OpenCode vs Cursor: agente de terminal open source vs IDE con IA',
    metaTitle: 'OpenCode vs Cursor: ¿qué herramienta de IA te encaja? (2026)',
    metaDescription: 'OpenCode vs Cursor, comparados de forma honesta. Uno es un agente de terminal open source que funciona con cualquier proveedor de modelos, el otro un IDE con IA. 2026.',
    intro: `OpenCode vs Cursor no es realmente una pelea entre dos versiones de lo mismo. Son herramientas con formas distintas. opencode es un agente de programación de código abierto que vive en tu terminal y funciona con cualquier proveedor de modelos, mientras que Cursor es un editor con IA dentro del cual programas de verdad.

Esa diferencia lo cambia todo: cómo das las instrucciones, a qué modelos puedes llegar, cuánto se ejecuta de forma automática y dónde encaja cada uno en tu día a día. Elegir al "ganador" depende por completo de cómo te guste trabajar, y muchos desarrolladores acaban usando los dos.

En esta guía los comparo por capacidad y flujo de trabajo en lugar de perseguir números de benchmarks, y luego te muestro cómo CodeAgentSwarm te deja ejecutar opencode junto a Claude Code y Codex CLI en paralelo.`,
    ctaText: '¿Te gusta opencode pero quieres más de un terminal? Ejecuta varios agentes de opencode en paralelo con CodeAgentSwarm, junto a Claude Code y Codex CLI, todo en un solo workspace.',
    highlightedWords: ['OpenCode', 'Cursor'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'opencode-vs-cursor',
  },
  sections: [
    {
      id: 'panorama-general',
      title: 'Dos formas distintas de herramienta',
      content: [
        {
          type: 'paragraph',
          text: 'Antes de comparar funcionalidades, conviene ser honestos sobre qué es cada herramienta, porque opencode y Cursor no son el mismo tipo de producto. Resuelven problemas que se solapan, pero desde direcciones opuestas.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a></strong> es <a href="https://github.com/sst/opencode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">el agente de programación de terminal de código abierto de SST</a>. Lo ejecutas con el comando <code>opencode</code>, lo apuntas a un repositorio y describes lo que quieres en lenguaje natural. Lee tus archivos, planifica un enfoque, edita en todo el código, ejecuta comandos e itera. Vive en tu shell, así que es scriptable y funciona junto al editor que ya uses. Y a diferencia de la mayoría de agentes, no está atado a los modelos de un solo proveedor: conectas el que prefieras.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://cursor.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor</a></strong> es un IDE con la IA en el centro, un fork de VS Code con IA tejida en la experiencia de edición. Programas dentro de él. Mientras escribes, te sugiere autocompletado en línea con Tab, un chat lateral responde preguntas sobre tu código y un modo agente puede asumir tareas grandes de varios archivos. Soporta varios modelos de IA, incluidos los de OpenAI y Claude.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'La distinción clave: opencode es un agente de terminal (trabaja junto a tu editor y se ejecuta en tu shell), mientras que Cursor es un editor dentro del cual programas. Es la misma división que cubre nuestra <a href="/es/guias/claude-code-vs-cursor-vs-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">comparativa de Claude Code vs Cursor vs Codex CLI</a>, aquí acotada a estos dos.',
        },
      ],
    },
    {
      id: 'opencode',
      title: 'opencode',
      content: [
        {
          type: 'image',
          alt: 'opencode ejecutándose en un terminal dentro de CodeAgentSwarm, con varias sesiones disponibles en paralelo',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'opencode vive en tu shell, así que puedes correr varias sesiones en paralelo, cada una con su propia tarea.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Qué es',
          id: 'opencode-que-es',
        },
        {
          type: 'paragraph',
          text: 'opencode es un agente de código abierto creado por el equipo de SST. Se ejecuta como una TUI en tu terminal, y conectas una vez el proveedor de modelos que prefieras (por ejemplo con <code>opencode auth login</code>, aunque conviene consultar la documentación oficial de opencode para los comandos exactos). A partir de ahí, cada sesión mantiene su propia conversación y directorio de trabajo.',
        },
        {
          type: 'paragraph',
          text: 'Lee las instrucciones del proyecto desde un archivo AGENTS.md, un estándar entre herramientas para que tus reglas viajen con el proyecto en lugar de quedar atadas a un solo agente. La configuración global vive en <code>~/.config/opencode/opencode.json</code>, con configuración a nivel de proyecto y por agente por encima.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Puntos fuertes',
          id: 'opencode-fuertes',
        },
        {
          type: 'list',
          items: [
            '<strong>Vive en tu terminal</strong> - Funciona junto a cualquier editor (VS Code, Neovim, JetBrains, incluso el propio Cursor) sin atarte a ninguno',
            '<strong>Código abierto, sin caja negra</strong> - El código es público, así que tienes transparencia, contribuciones de la comunidad y ningún runtime propietario en el que confiar a ciegas',
            '<strong>Agnóstico de proveedor</strong> - Conecta Anthropic, OpenAI, Google o modelos locales, el punto fuerte que ni Codex ni Cursor igualan, ya que Codex es solo de OpenAI y Cursor es una app propietaria',
            '<strong>Agéntico por diseño</strong> - Planifica, edita varios archivos, ejecuta comandos e itera ante los fallos en lugar de pasarte fragmentos para pegar',
            '<strong>Permisos por configuración</strong> - Decide qué se ejecuta automáticamente y qué pregunta primero, definido en opencode.json de forma global, por proyecto o por agente',
            '<strong>Soporte de MCP</strong> - Conéctalo a bases de datos, navegadores y otras herramientas con el Model Context Protocol',
            '<strong>Estándar AGENTS.md</strong> - Tus instrucciones viajan entre herramientas en lugar de quedar atadas al formato de configuración de un solo agente',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde se queda corto',
          id: 'opencode-limites',
        },
        {
          type: 'list',
          items: [
            'No hay experiencia de edición en línea. No tiene autocompletado con Tab mientras escribes, porque no es un editor',
            'Asume que estás cómodo en la terminal, lo que puede ser una barrera si prefieres una interfaz gráfica',
            'Una sesión es un agente en un terminal. Arrancar varios a la vez es fácil, pero seguirles la pista se complica rápido',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ideal para',
          id: 'opencode-ideal',
        },
        {
          type: 'paragraph',
          text: 'Desarrolladores cómodos en la terminal que quieren un agente autónomo para cambios en varios archivos, quienes quieren elegir o cambiar de proveedor de modelos (o ejecutar modelos locales), gente que prefiere herramientas de código abierto y quienes quieren mantener su editor actual. Si quieres escalarlo, mira cómo <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">montar un enjambre de agentes opencode</a>.',
        },
      ],
    },
    {
      id: 'cursor',
      title: 'Cursor',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Qué es',
          id: 'cursor-que-es',
        },
        {
          type: 'paragraph',
          text: 'Cursor es un IDE completo construido sobre VS Code. Se ve y se siente como VS Code, así que tus extensiones, temas y atajos de teclado se mantienen casi todos, pero con la IA integrada en cada parte de la edición. Programas dentro de él y la IA te ayuda mientras avanzas.',
        },
        {
          type: 'paragraph',
          text: 'A diferencia de opencode, Cursor no es una herramienta de terminal que ejecutas junto a un editor. Es el editor. La IA aparece como sugerencias en línea, un panel de chat y un modo agente para tareas más grandes, todo dentro de una misma app gráfica.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Puntos fuertes',
          id: 'cursor-fuertes',
        },
        {
          type: 'list',
          items: [
            '<strong>Experiencia de IDE familiar</strong> - Si ya usas VS Code, Cursor se siente como casa y tu configuración actual casi siempre funciona tal cual',
            '<strong>Autocompletado en línea con Tab</strong> - Cursor predice tu siguiente edición mientras escribes y la aceptas con Tab, algo genial para programar línea a línea',
            '<strong>Soporte multimodelo</strong> - Cambia entre modelos de OpenAI, Claude, Gemini y otros dentro de la app según la tarea',
            '<strong>Modo agente</strong> - Para trabajos más grandes, Cursor puede hacer cambios en varios archivos y ejecutar comandos, más cerca de lo que hace un agente CLI',
            '<strong>Revisión visual del código</strong> - Ves los diffs, aceptas o rechazas cambios en línea y te quedas en una sola ventana todo el rato',
            '<strong>Funciones para equipos</strong> - Controles de administración, analíticas de uso y configuración compartida para equipos',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde se queda corto',
          id: 'cursor-limites',
        },
        {
          type: 'list',
          items: [
            'Es un editor entero, así que adoptarlo significa cambiar de IDE en lugar de añadir una herramienta al que ya tienes',
            'Menos natural de scriptar o automatizar desde la shell que un agente CLI',
            'Si prefieres Neovim o JetBrains, renuncias a tu editor para tener la experiencia completa',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ideal para',
          id: 'cursor-ideal',
        },
        {
          type: 'paragraph',
          text: 'Desarrolladores que quieren la IA directamente dentro de su editor, gente a la que le encanta el autocompletado en línea mientras escribe, quienes están contentos de hacer de Cursor su IDE principal y equipos que necesitan controles de administración y un flujo de trabajo gráfico.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa lado a lado',
      content: [
        {
          type: 'paragraph',
          text: 'Así se comparan opencode y Cursor en las dimensiones que más importan en el día a día. El resumen honesto: son fuertes en cosas distintas, así que la elección correcta depende de cómo trabajes.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tipo de herramienta',
          id: 'comparativa-tipo',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Agente de programación de terminal (se ejecuta en tu shell, junto a cualquier editor)',
            '<strong>Cursor</strong> - IDE con la IA en el centro (un fork de VS Code dentro del cual programas)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde se ejecuta',
          id: 'comparativa-ejecucion',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Cualquier terminal en macOS, Linux o Windows, encima de tu editor y flujo de trabajo actuales',
            '<strong>Cursor</strong> - Su propia aplicación de escritorio, que pasa a ser tu editor',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Autocompletado en línea',
          id: 'comparativa-autocompletado',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - No. Es un agente, no un editor, así que no hay autocompletado con Tab',
            '<strong>Cursor</strong> - Sí. El autocompletado con Tab mientras escribes es uno de sus puntos más fuertes',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tareas agénticas y autónomas',
          id: 'comparativa-agentico',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Fuerte. Diseñado como agente, con permisos por configuración que deciden cuánto se ejecuta sin supervisión',
            '<strong>Cursor</strong> - Bueno. El modo agente gestiona tareas de varios archivos, pero la experiencia central es la del editor',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Automatización y scripting',
          id: 'comparativa-scripting',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Fuerte. Al ser una CLI encaja de forma natural en scripts y pipelines',
            '<strong>Cursor</strong> - Limitado. Es una app gráfica, pensada para uso interactivo más que para scripting',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Soporte de modelos de IA',
          id: 'comparativa-modelos',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Cualquier proveedor importante (Anthropic, OpenAI, Google) más modelos locales, tú eliges',
            '<strong>Cursor</strong> - Varios modelos dentro de una app propietaria (OpenAI, Claude, Gemini y más)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Código abierto',
          id: 'comparativa-open-source',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Totalmente de código abierto, código público que puedes leer, forkear y al que puedes contribuir',
            '<strong>Cursor</strong> - Propietario. Usas la app tal cual se distribuye, sin acceso a su código fuente',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Soporte de MCP',
          id: 'comparativa-mcp',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Integración completa de MCP',
            '<strong>Cursor</strong> - Soporte de MCP, aunque más limitado que un agente CLI dedicado',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Atadura al editor',
          id: 'comparativa-atadura',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Ninguna. Mantén Neovim, JetBrains, VS Code o lo que prefieras',
            '<strong>Cursor</strong> - Adoptas Cursor como tu editor para tener la experiencia completa',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Precios',
          id: 'comparativa-precios',
        },
        {
          type: 'paragraph',
          text: 'opencode en sí es gratuito y de código abierto: pagas el proveedor de modelos que conectes, mediante una clave de API o una suscripción que ya tengas. Cursor ofrece un plan gratuito más planes de pago. En lugar de dar cifras que quedan desactualizadas, consulta la web oficial de cada herramienta para ver los precios actuales antes de decidir.',
        },
      ],
    },
    {
      id: 'cuando-usar',
      title: 'Cuándo usar cada uno',
      content: [
        {
          type: 'paragraph',
          text: 'Aquí no hay un único ganador. La pregunta más útil es qué forma encaja con el trabajo que tienes delante.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa opencode si...',
          id: 'cuando-opencode',
        },
        {
          type: 'list',
          items: [
            'Prefieres trabajar en la terminal y quieres la IA junto a tu editor, no como tu editor',
            'El código abierto te importa y quieres poder leer o forkear la herramienta de la que dependes',
            'Quieres elegir tu proveedor de modelos, o ejecutar modelos locales, en lugar de quedar atado a un único proveedor',
            'Quieres mantener tu editor actual (Neovim, JetBrains, VS Code o incluso el propio Cursor)',
            'Quieres autonomía por configuración, decidiendo en opencode.json qué se ejecuta solo y qué pregunta primero',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa Cursor si...',
          id: 'cuando-cursor',
        },
        {
          type: 'list',
          items: [
            'Quieres la asistencia de la IA directamente dentro de tu editor mientras escribes',
            'Te encanta el autocompletado en línea con Tab para programar rápido, línea a línea',
            'Estás contento de hacer de Cursor tu IDE principal',
            'Quieres cambiar entre modelos (OpenAI, Claude, Gemini) dentro de una sola app',
            'Trabajas en un equipo que necesita controles de administración y un flujo de trabajo gráfico',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa los dos a la vez',
          id: 'cuando-ambos',
        },
        {
          type: 'paragraph',
          text: 'Estas herramientas no son excluyentes. Un montaje habitual es Cursor para ediciones en línea y sugerencias rápidas mientras escribes, más opencode en un terminal para tareas grandes que necesitan ejecución autónoma en varios archivos. Usar una no te impide ejecutar la otra.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica, el editor y el agente de terminal cubren momentos distintos del mismo flujo de trabajo. Te quedas en Cursor para la edición a mano y delegas el trabajo más pesado, repetitivo o de larga duración a opencode en segundo plano. Cursor incluso tiene un terminal integrado dentro del cual podrías ejecutar opencode.',
        },
      ],
    },
    {
      id: 'saltarse-la-eleccion-codeagentswarm',
      title: 'Sáltate la elección a nivel de enjambre con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Hay un tercer ángulo que merece la pena conocer. Si tu pregunta real es "cómo le saco el máximo partido a los agentes de programación de terminal", tampoco tienes que elegir una sola CLI. Una vez opencode está haciendo trabajo de verdad, el siguiente problema es ejecutar más de uno sin perderle la pista.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> es una app de escritorio para ejecutar y supervisar un enjambre de agentes CLI de IA en un solo workspace. Tienes varios terminales a la vez y eliges el agente por terminal. Ponlos todos en opencode para un enjambre puro de opencode, o mezcla Claude Code y Codex CLI donde encajen mejor.',
        },
        {
          type: 'image',
          alt: 'Selector SELECT AI AGENT de CodeAgentSwarm donde eliges el agente por terminal, incluido opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon cada uno en opencode para un enjambre de opencode.',
        },
        {
          type: 'list',
          items: [
            '<strong>Varios agentes en paralelo</strong> - Ejecuta varias sesiones de opencode a la vez, cada una un proceso independiente con su propia tarea y contexto',
            '<strong>Notificaciones de escritorio</strong> - Recibe un aviso cuando un agente termina o se para a pedir una aprobación, para dejar de estar pendiente de los terminales',
            '<strong>Títulos dinámicos de terminal</strong> - Cada terminal muestra lo que su agente está haciendo ahora mismo, así lees "Migrando esquema de usuarios" en vez de varias pestañas con el mismo "opencode"',
            '<strong>Historial de conversaciones buscable</strong> - opencode guarda sus sesiones en local, y CodeAgentSwarm las lee para que cada conversación de cada terminal quede guardada, buscable y reanudable dentro de la app',
            '<strong>Diffs de archivos en vivo por terminal</strong> - Mira qué está cambiando cada agente en tiempo real, así las ediciones que se solapan nunca te pillan por sorpresa',
            '<strong>Supervisión para configuraciones permisivas</strong> - La autonomía de opencode viene de sus propios permisos en opencode.json, y CodeAgentSwarm la mantiene visible con diffs en vivo y notificaciones',
          ],
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm no es un proveedor de modelos. Funciona encima de las cuentas que ya pagas y solo orquesta los agentes. Así que OpenCode vs Cursor deja de ser un o lo uno o lo otro: quédate con Cursor como editor si te gusta y deja que CodeAgentSwarm ejecute una flota de agentes de opencode en segundo plano.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Quieres la foto completa de todos los agentes CLI? Empieza por la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> y luego entra en cómo <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">montar un enjambre de agentes opencode</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Es OpenCode mejor que Cursor?',
      answer: 'Ninguno es estrictamente mejor, porque son herramientas con formas distintas. opencode es un agente de programación de terminal de código abierto que trabaja junto a tu editor, ejecuta tareas autónomas de varios pasos y se conecta a cualquier proveedor de modelos. Cursor es un IDE con la IA en el centro dentro del cual programas, con autocompletado en línea mientras escribes. La elección correcta depende de si prefieres la terminal o un editor gráfico, y muchos desarrolladores usan los dos.',
    },
    {
      question: '¿Cuál es la diferencia entre OpenCode y Cursor?',
      answer: 'opencode es el agente de terminal de código abierto de SST: lo ejecutas en tu shell, lo apuntas a un repo y lee archivos, edita en todo el código y ejecuta comandos, usando el proveedor de modelos que conectes. Cursor es un editor, un fork de VS Code con IA integrada, donde escribes código y tienes autocompletado en línea con Tab, un panel de chat y un modo agente. Uno vive en la terminal junto a tu editor, el otro es el editor.',
    },
    {
      question: '¿Puedo usar OpenCode y Cursor a la vez?',
      answer: 'Sí, y es un montaje habitual. Puedes usar Cursor como editor para programar a mano y recibir sugerencias en línea, mientras ejecutas opencode en un terminal para tareas autónomas más grandes. No entran en conflicto, y Cursor incluso tiene un terminal integrado dentro del cual podrías ejecutar opencode.',
    },
    {
      question: '¿Funciona OpenCode con cualquier editor?',
      answer: 'Sí. Como opencode vive en tu terminal, funciona junto a cualquier editor, incluidos VS Code, Neovim, JetBrains y el propio Cursor. No te ata a ningún editor, que es una de las diferencias principales frente a adoptar Cursor como tu IDE.',
    },
    {
      question: '¿Qué modelos soporta OpenCode?',
      answer: 'opencode es agnóstico de proveedor. Conectas el proveedor de modelos que prefieras, incluidos Anthropic, OpenAI y Google, y también puede ejecutar modelos locales. Esa es una diferencia clave frente a Codex, que es solo de OpenAI, y frente a Cursor, que ofrece varios modelos pero dentro de una app propietaria. Consulta la documentación oficial de opencode para saber cómo conectar un proveedor.',
    },
    {
      question: '¿Puedo ejecutar varios agentes de OpenCode a la vez?',
      answer: 'Sí. Cada sesión de opencode es su propio proceso, así que puedes ejecutar varias en terminales separados al mismo tiempo, cada una con una tarea distinta. CodeAgentSwarm lo hace práctico al darte varios terminales organizados con notificaciones de escritorio, historial buscable y reanudable, y diffs de archivos en vivo para cada agente.',
    },
    {
      question: '¿Cuánto cuestan OpenCode y Cursor?',
      answer: 'opencode en sí es gratuito y de código abierto: pagas el proveedor de modelos que conectes, mediante una clave de API o una suscripción. Cursor tiene un plan gratuito más planes de pago. Los precios cambian con el tiempo, así que consulta la web oficial de cada herramienta para ver las cifras actuales en lugar de fiarte de números que pueden estar desactualizados.',
    },
  ],
}

export default guide
