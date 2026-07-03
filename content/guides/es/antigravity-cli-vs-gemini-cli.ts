import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-vs-gemini-cli',
    locale: 'es',
    title: 'Antigravity CLI vs Gemini CLI: qué cambió y cómo migrar',
    metaTitle: 'Antigravity CLI vs Gemini CLI: qué cambió y cómo migrar (2026)',
    metaDescription: 'Gemini CLI se retiró y lo reemplazó Antigravity CLI. Mira qué cambió entre los dos, si tienes que migrar y los pasos exactos para hacerlo sin perder tu configuración.',
    intro: `Si abriste un terminal esperando el comando gemini y no estaba, no te lo imaginas. Google retiró Gemini CLI y lo reemplazó por Antigravity CLI, el nuevo agente que corre bajo el comando agy. La buena noticia es que el cambio se diseñó para ser fácil, y la mayor parte de tu configuración antigua viene contigo.

Esta guía es una comparación directa más un recorrido de migración. Primero te cuento qué pasó realmente con Gemini CLI y cuándo. Luego repaso las diferencias reales entre Antigravity CLI y Gemini CLI, dimensión por dimensión, para que sepas qué ganas y qué cambió bajo tus pies. Después tienes los pasos exactos de migración, incluido el aviso de importación que se trae tu configuración antigua.

Gemini CLI fue una buena herramienta y se ganó a su público, así que esto no es una pieza de hype sobre un reemplazo. Como Gemini CLI está apagado, migrar a Antigravity CLI es simplemente el camino hacia delante, y como verás, ese camino es corto.`,
    ctaText: 'Pasar de Gemini CLI a Antigravity CLI no significa perder tu flujo de varias sesiones. Ejecuta varios terminales de Antigravity CLI a la vez en CodeAgentSwarm, junto a Claude Code y Codex CLI, en un mismo espacio de trabajo.',
    highlightedWords: ['Antigravity CLI', 'Gemini CLI', 'migrar'],
    publishedAt: '2026-06-29',
    updatedAt: '2026-06-29',
    alternateSlug: 'antigravity-cli-vs-gemini-cli',
  },
  sections: [
    {
      id: 'gemini-cli-retired',
      title: 'Qué pasó: Gemini CLI se retiró',
      content: [
        {
          type: 'paragraph',
          text: 'Gemini CLI fue el primer agente de programación en terminal de Google. Venía como una herramienta de código abierto basada en Node que instalabas desde npm y ejecutabas con el comando <code>gemini</code>, iniciabas sesión con una cuenta de Google y apuntabas a un proyecto. Se hizo popular rápido porque era gratis para empezar, tenía una ventana de contexto grande por sesión y vivía en el terminal donde ya trabajaban los desarrolladores.',
        },
        {
          type: 'paragraph',
          text: 'El 18 de junio de 2026, Google retiró Gemini CLI y lo transicionó a <a href="https://antigravity.google" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity CLI</a>, el sucesor oficial que corre bajo el comando <code>agy</code>. Se anunció con antelación en el blog de desarrolladores de Google, y el repositorio del proyecto tiene una discusión fijada que explica el cambio y los plazos.',
        },
        {
          type: 'list',
          items: [
            '<a href="https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">An important update: transitioning Gemini CLI to Antigravity CLI</a> (el anuncio oficial)',
            '<a href="https://github.com/google-gemini/gemini-cli/discussions/27274" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">La discusión en GitHub</a> del repo de gemini-cli, con el razonamiento y las notas de migración',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Versión corta: Gemini CLI no va a recibir funciones nuevas, y el comando <code>gemini</code> se está retirando. Antigravity CLI es donde Google pone ahora su trabajo de agente en terminal. Si usabas Gemini CLI, el siguiente paso es instalar Antigravity CLI y dejar que importe tu configuración antigua, que es justo lo que recorre el resto de esta guía.',
        },
        {
          type: 'paragraph',
          text: 'El motivo del cambio es más que un renombrado. Antigravity CLI es otra arquitectura: un único binario compilado en vez de un paquete de Node, varios modelos en el mismo terminal en vez de solo Gemini, y un diseño multiagente en vez de un único chat lineal. La siguiente sección desglosa esas diferencias.',
        },
      ],
    },
    {
      id: 'what-changed',
      title: 'Antigravity CLI vs Gemini CLI: qué cambió',
      content: [
        {
          type: 'paragraph',
          text: 'Así se compara Antigravity CLI con Gemini CLI en las cosas que de verdad afectan a tu día. Cada dimensión muestra el comportamiento antiguo y el nuevo, para que veas exactamente qué se movió.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Runtime e instalación',
          id: 'compare-runtime',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> un paquete de npm que necesitaba Node instalado. Lo actualizabas como cualquier otra herramienta de Node, y tu versión dependía de tu runtime local.',
            '<strong>Antigravity CLI:</strong> un único binario compilado, sin runtime de Node ni de Python. Lo instalas con un solo script y ejecutas <code>agy</code> directamente.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Instala Antigravity CLI (un binario, sin Node)\ncurl -fsSL https://antigravity.google/cli/install.sh | bash\n\n# Luego ejecútalo\nagy',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Modelos',
          id: 'compare-models',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> solo modelos Gemini. La idea entera era un agente de terminal con tecnología Gemini, y elegías el modelo Gemini que querías.',
            '<strong>Antigravity CLI:</strong> ocho modelos en el mismo terminal, entre ellos Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6 y GPT-OSS 120B. Usa Gemini 3.5 Flash por defecto y autoselecciona el modelo adecuado para la tarea, así que no hay flag <code>--model</code> que gestionar.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Este es el cambio práctico más grande. Antigravity CLI ya no es una herramienta solo de Gemini. Sigue liderando con Gemini y usa Gemini 3.5 Flash por defecto, pero puede enviar una tarea a un modelo Claude o de pesos abiertos cuando encaja mejor, todo desde la misma sesión de <code>agy</code>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiagente vs chat único',
          id: 'compare-multi-agent',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> un único chat lineal. Una conversación, un agente, avanzando por tu petición paso a paso.',
            '<strong>Antigravity CLI:</strong> multiagente por defecto. Puede despachar y coordinar subagentes para trabajar en partes de una tarea, en lugar de ejecutar todo como un solo hilo.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Configuración y directorio home',
          id: 'compare-config',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> guardaba sus ajustes, los servidores MCP registrados y las preferencias bajo el home <code>~/.gemini</code>.',
            '<strong>Antigravity CLI:</strong> reutiliza el mismo home <code>~/.gemini</code> y, en el primer arranque, ofrece importar automáticamente tu configuración antigua de Gemini CLI a <code>~/.gemini/antigravity-cli/settings.json</code>. Eso es lo que hace que la migración sea indolora.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Flags y comandos del día a día',
          id: 'compare-flags',
        },
        {
          type: 'list',
          items: [
            '<strong>Turbo / saltar permisos:</strong> ejecuta <code>agy --dangerously-skip-permissions</code> para una sesión desatendida que autoaprueba. Como con cualquier flag estilo yolo, úsalo con cuidado, porque el agente ejecutará acciones que quizá habrías querido revisar.',
            '<strong>Continuar la última conversación:</strong> <code>agy -c</code>.',
            '<strong>Retomar una conversación concreta:</strong> <code>agy --conversation &lt;id&gt;</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si quieres un recorrido más completo de la herramienta nueva por sí sola, la guía de <a href="/es/guias/como-usar-antigravity-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo usar Antigravity CLI</a> cubre lo básico de principio a fin.',
        },
      ],
    },
    {
      id: 'how-to-migrate',
      title: 'Cómo migrar de Gemini CLI a Antigravity CLI',
      content: [
        {
          type: 'paragraph',
          text: 'La migración es corta a propósito. En la práctica son dos cosas: instalar Antigravity CLI y aceptar el aviso de importación en el primer arranque. Aquí tienes los pasos.',
        },
        {
          type: 'heading',
          level: 3,
          text: '1. Instala Antigravity CLI',
          id: 'migrate-install',
        },
        {
          type: 'paragraph',
          text: 'Ejecuta el script de instalación. Deja un único binario, así que no tienes que tocar Node ni tu antigua instalación por npm de Gemini CLI.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'curl -fsSL https://antigravity.google/cli/install.sh | bash',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Arranca agy y acepta el aviso de importación',
          id: 'migrate-import',
        },
        {
          type: 'paragraph',
          text: 'La primera vez que ejecutas <code>agy</code>, detecta tu home <code>~/.gemini</code> existente y ofrece importar tu configuración de Gemini CLI. Acéptalo. Tus ajustes se escriben en <code>~/.gemini/antigravity-cli/settings.json</code>, así que la herramienta antigua y la nueva conviven en el mismo home.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Primer arranque - te pedirá importar tu config antigua de Gemini CLI\nagy',
        },
        {
          type: 'paragraph',
          text: 'Lo que trae la importación:',
        },
        {
          type: 'list',
          items: [
            'Tus servidores MCP registrados, para que tus herramientas estén disponibles al momento',
            'Tus comandos permitidos sin confirmación, para que no vuelvas a aprobar todo',
            'Tus atajos de teclado',
            'Tu tema',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Como Antigravity CLI reutiliza <code>~/.gemini</code>, no empiezas con una config en blanco. Si dedicaste tiempo a cablear servidores MCP o a afinar qué comandos corren sin aviso en Gemini CLI, ese trabajo se traslada en vez de tirarse a la basura.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Comprueba que funciona',
          id: 'migrate-verify',
        },
        {
          type: 'paragraph',
          text: 'Abre un proyecto, arranca una sesión y confirma que tus servidores MCP y tus aprobaciones se comportan como antes. Prueba a continuar tu última conversación y a retomar una concreta para asegurarte de que tu historial es accesible.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Continúa tu última conversación\nagy -c\n\n# Retoma una conversación concreta por id\nagy --conversation <id>',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'No des por hecho que la importación ocurrió si te saltaste el aviso. Si te faltan los servidores MCP o las aprobaciones, probablemente declinaste o te perdiste la importación en el primer arranque. Comprueba que <code>~/.gemini/antigravity-cli/settings.json</code> existe y contiene tus servidores, y vuelve a lanzar el flujo de importación si no es así.',
        },
        {
          type: 'paragraph',
          text: 'Esa es toda la migración. Como Gemini CLI está retirado, este es el movimiento que te mantiene al día, y cuesta un par de minutos.',
        },
      ],
    },
    {
      id: 'running-both',
      title: 'Ejecutar Antigravity CLI (y Claude y Codex) en un mismo espacio',
      content: [
        {
          type: 'paragraph',
          text: 'Si ejecutabas varias sesiones de Gemini CLI a la vez, lo que no quieres perder en el cambio es ese flujo de varias sesiones. Las sesiones de Antigravity CLI siguen siendo procesos independientes, así que puedes ejecutar muchas, y puedes tenerlas en un solo sitio con CodeAgentSwarm.',
        },
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT, donde eliges Antigravity CLI para un terminal junto a las opciones de Claude Code y Codex CLI',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm eliges el agente por terminal. Pon un terminal en Antigravity CLI y ejecútalo junto a Claude Code o Codex CLI en la misma ventana.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar varias sesiones de CLI de IA en paralelo con visibilidad real. Funciona en macOS y Windows, y no es un proveedor de modelos, así que cada sesión de Antigravity CLI sigue usando tu propio inicio de sesión de Google y tu propia instalación de <code>agy</code>. La app solo le da un sitio donde vivir a las sesiones: varios terminales en un espacio de trabajo, con el agente elegido por terminal desde el selector SELECT AI AGENT.',
        },
        {
          type: 'image',
          alt: 'Varias sesiones de Antigravity CLI ejecutándose en paralelo dentro de un único espacio de trabajo de CodeAgentSwarm, cada terminal un proceso agy independiente',
          src: '/images/guides/antigravity-agent-swarm.png',
          caption: 'Varias sesiones de Antigravity CLI en paralelo: procesos agy independientes ejecutándose a la vez en una sola ventana de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Esto importa sobre todo durante una transición. Si tu equipo tenía sesiones de Gemini CLI repartidas por pestañas, puedes pasarlas a Antigravity CLI y mantener exactamente la misma configuración de varias sesiones, sin hacer malabares con terminales a mano. Y como el agente es por terminal, no te quedas encerrado: un terminal en Antigravity CLI, otro en Claude Code, un tercero en Codex CLI, todos compartiendo un mismo historial con búsqueda.',
        },
        {
          type: 'list',
          items: [
            'Ejecuta varias sesiones de Antigravity CLI a la vez, cada una independiente',
            'Mezcla Antigravity CLI con Claude Code y Codex CLI por terminal',
            'Recibe una notificación de escritorio cuando una sesión termina o necesita tu intervención',
            'Mantén un historial de conversaciones con búsqueda en todos los terminales',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Para el paso a paso de ejecutar muchas sesiones de Antigravity a la vez, mira <a href="/es/guias/ejecutar-multiples-sesiones-antigravity-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Antigravity CLI</a>. Para el patrón más amplio entre proveedores, empieza por <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">el hub del enjambre de agentes CLI de IA</a>.',
        },
        {
          type: 'paragraph',
          text: 'Si vienes de las guías antiguas de Gemini, las de <a href="/es/guias/ejecutar-multiples-sesiones-gemini" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Gemini CLI</a> y <a href="/es/guias/enjambre-de-agentes-gemini" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Gemini</a> describen el mismo flujo que ahora puedes trasladar a Antigravity CLI.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Gemini CLI está muerto o descontinuado?',
      answer: 'Sí. Google retiró Gemini CLI el 18 de junio de 2026 y lo transicionó a Antigravity CLI, que corre bajo el comando agy. Gemini CLI no va a recibir funciones nuevas, y Antigravity CLI es el sucesor oficial. El anuncio está en el blog de desarrolladores de Google y hay una discusión fijada en el repo de gemini-cli en GitHub con los detalles.',
    },
    {
      question: '¿Tengo que migrar de Gemini CLI a Antigravity CLI?',
      answer: 'En la práctica, sí, porque Gemini CLI está apagado y no recibirá actualizaciones. La parte buena es que migrar es corto: instala Antigravity CLI con un script y acepta el aviso de importación en el primer arranque. Tu configuración existente se traslada, así que no reconstruyes tu setup desde cero.',
    },
    {
      question: '¿Se trasladan mi configuración y mis servidores MCP de Gemini CLI?',
      answer: 'Sí. Antigravity CLI reutiliza el mismo home ~/.gemini y, en el primer arranque, ofrece importar tu configuración de Gemini CLI a ~/.gemini/antigravity-cli/settings.json. Esa importación trae tus servidores MCP registrados, tus comandos permitidos sin confirmación, tus atajos de teclado y tu tema. Si después falta algo, probablemente te saltaste el aviso y conviene volver a lanzar la importación.',
    },
    {
      question: '¿Cuál es la diferencia entre Antigravity CLI y Gemini CLI?',
      answer: 'Antigravity CLI viene como un único binario compilado sin runtime de Node ni de Python, mientras que Gemini CLI era una herramienta de npm/Node. Antigravity CLI ejecuta ocho modelos en el mismo terminal, entre ellos Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6 y GPT-OSS 120B, mientras que Gemini CLI era solo Gemini. Antigravity CLI es multiagente por defecto y puede coordinar subagentes, mientras que Gemini CLI era un único chat lineal. Además reutiliza el home ~/.gemini e importa tu config antigua.',
    },
    {
      question: '¿Antigravity CLI es mejor que Gemini CLI?',
      answer: 'Es el sucesor con soporte, así que es el que va a seguir mejorando. Suma capacidades reales sobre Gemini CLI: instalación de un solo binario sin runtime de Node, varios modelos en un mismo terminal con selección automática, y un diseño multiagente. Si cada cambio encaja con tu flujo es cosa tuya, pero como Gemini CLI está retirado, Antigravity CLI es la herramienta actual a usar.',
    },
    {
      question: '¿Puedo seguir usando Gemini CLI?',
      answer: 'Una instalación existente de Gemini CLI quizá siga funcionando por ahora, pero está retirada y sin mantenimiento, así que no recibirá actualizaciones ni funciones nuevas. El camino recomendado es instalar Antigravity CLI e importar tu config. Trata cualquier uso continuado de Gemini CLI como algo temporal, no como un setup a largo plazo.',
    },
    {
      question: '¿Antigravity CLI usa modelos Gemini?',
      answer: 'Sí, y lidera con ellos. Antigravity CLI usa Gemini 3.5 Flash por defecto y autoselecciona el mejor modelo para la tarea, sin flag --model que gestionar. También va más allá de Gemini: el mismo terminal puede usar Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6 y GPT-OSS 120B, entre ocho modelos en total.',
    },
  ],
}

export default guide
