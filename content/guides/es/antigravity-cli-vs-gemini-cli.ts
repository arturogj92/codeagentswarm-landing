import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-vs-gemini-cli',
    locale: 'es',
    title: 'Antigravity CLI vs Gemini CLI: qué cambió y cómo migrar',
    metaTitle: 'Antigravity CLI vs Gemini CLI: qué cambió y cómo migrar (2026)',
    metaDescription: 'Google pasó a los usuarios gratuitos y de AI Pro de Gemini CLI a Antigravity CLI. Qué cambió, quién puede seguir con Gemini CLI y cómo migrar tu config.',
    intro: `Si abriste un terminal esperando el comando gemini y no estaba, no te lo imaginas. Google dejó de dar servicio a Gemini CLI en las cuentas personales y pasó a esos usuarios a Antigravity CLI, el nuevo agente que corre bajo el comando agy. La buena noticia es que el cambio se diseñó para ser fácil, y la mayor parte de tu configuración antigua viene contigo.

Esta guía es una comparación directa más un recorrido de migración. Primero te cuento qué pasó realmente con Gemini CLI y cuándo. Luego repaso las diferencias reales entre Antigravity CLI y Gemini CLI, dimensión por dimensión, para que sepas qué ganas y qué cambió bajo tus pies. Después tienes los pasos exactos de migración, incluido el aviso de importación que se trae tu configuración antigua.

Gemini CLI fue una buena herramienta y se ganó a su público, así que esto no es una pieza de hype sobre un reemplazo. Como Gemini CLI ya no da servicio a las cuentas personales, migrar a Antigravity CLI es simplemente el camino hacia delante, y como verás, ese camino es corto.`,
    ctaText: 'Pasar de Gemini CLI a Antigravity CLI no significa perder tu flujo de varias sesiones. Ejecuta varios terminales de Antigravity CLI a la vez en CodeAgentSwarm, junto a Claude Code y Codex CLI, en un mismo espacio de trabajo.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity CLI', 'Gemini CLI', 'migrar'],
    publishedAt: '2026-06-29',
    updatedAt: '2026-10-31',
    alternateSlug: 'antigravity-cli-vs-gemini-cli',
  },
  sections: [
    {
      id: 'gemini-cli-retired',
      title: 'Qué pasó: Gemini CLI se retiró para las cuentas personales',
      content: [
        {
          type: 'paragraph',
          text: 'Gemini CLI fue el primer agente de programación en terminal de Google. Venía como una herramienta de código abierto basada en Node que instalabas desde npm y ejecutabas con el comando <code>gemini</code>, iniciabas sesión con una cuenta de Google y apuntabas a un proyecto. Se hizo popular rápido porque era gratis para empezar, tenía una ventana de contexto grande por sesión y vivía en el terminal donde ya trabajaban los desarrolladores.',
        },
        {
          type: 'paragraph',
          text: 'El 18 de junio de 2026, Gemini CLI dejó de dar servicio a los usuarios gratuitos, a los suscriptores de Google AI Pro y Ultra y a Gemini Code Assist para particulares, y Google los pasó a <a href="https://antigravity.google" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity CLI</a>, el sucesor que corre bajo el comando <code>agy</code>. Google lo anunció en su blog de desarrolladores el 19 de mayo de 2026, y el repositorio del proyecto tiene una discusión fijada que explica el cambio y los plazos.',
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
          content: 'Versión corta: Gemini CLI sigue existiendo, pero solo para flujos empresariales de Gemini Code Assist en Google Cloud y claves de pago de la API de Gemini, como explican su <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">README</a> y el anuncio. Si usabas Gemini CLI con una cuenta personal de Google, el siguiente paso es instalar Antigravity CLI y dejar que importe tu configuración antigua, que es justo lo que recorre el resto de esta guía.',
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
            '<strong>Antigravity CLI:</strong> modelos de Gemini, Claude y de pesos abiertos en el mismo terminal, según tu plan. A octubre de 2026 la <a href="https://antigravity.google/docs/models" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">lista oficial de modelos</a> ofrece Gemini 3.8 Flash en todos los planes, Gemini 4 Argon, Claude Sonnet 5.5 y Claude Opus 5.5 en los planes de pago de Google AI, y Claude Sonnet 4.6, Claude Opus 4.6 y GPT-OSS 120B en el plan gratuito hasta el 2 de noviembre de 2026. Eliges con <code>/model</code> o <code>--model</code>.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Este es el cambio práctico más grande. Antigravity CLI ya no es una herramienta solo de Gemini. Sigue liderando con Gemini, pero puedes cambiar a un modelo Claude o de pesos abiertos cuando encaja mejor con la tarea, sin salir de <code>agy</code>.',
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
            '<strong>Antigravity CLI:</strong> reutiliza el mismo home <code>~/.gemini</code> y, en el primer arranque, ofrece convertir tus extensiones y ajustes antiguos de Gemini CLI. Los ajustes van a <code>~/.gemini/antigravity-cli/settings.json</code> y los servidores MCP a <code>~/.gemini/config/mcp_config.json</code>. Eso es lo que hace que la migración sea indolora.',
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
          text: 'La primera vez que ejecutas <code>agy</code>, detecta tu home <code>~/.gemini</code> existente y te enseña una lista de las extensiones y ajustes de Gemini CLI que puede convertir. Elige lo que quieras. Los ajustes acaban en <code>~/.gemini/antigravity-cli/settings.json</code>, los servidores MCP en <code>~/.gemini/config/mcp_config.json</code>, y la herramienta antigua y la nueva conviven en el mismo home.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Primer arranque - te pedirá importar tu config antigua de Gemini CLI\nagy',
        },
        {
          type: 'paragraph',
          text: 'Lo que trae la importación, según la <a href="https://antigravity.google/docs/cli/gcli-migration" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">guía oficial de migración</a>:',
        },
        {
          type: 'list',
          items: [
            'Tus servidores MCP, que pasan a <code>~/.gemini/config/mcp_config.json</code>',
            'Tus extensiones, convertidas en plugins de Antigravity (los comandos personalizados pasan a ser skills)',
            'Tus tokens de sesión, que pasan al llavero del sistema',
            'No siempre: los temas de terminal personalizados y las skills de proyecto en <code>.gemini/skills/</code>, que mueves a mano a <code>.agents/skills/</code>',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Como Antigravity CLI reutiliza <code>~/.gemini</code>, no empiezas con una config en blanco. Si dedicaste tiempo a cablear servidores MCP o a escribir un <code>~/.gemini/GEMINI.md</code> global en Gemini CLI, ese trabajo se traslada en vez de tirarse a la basura.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Comprueba que funciona',
          id: 'migrate-verify',
        },
        {
          type: 'paragraph',
          text: 'Abre un proyecto, arranca una sesión y confirma que tus servidores MCP y tus instrucciones se comportan como antes. Prueba a continuar tu última conversación y a retomar una concreta para asegurarte de que tu historial es accesible.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Continúa tu última conversación\nagy -c\n\n# Retoma una conversación concreta por id\nagy --conversation <id>',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'No des por hecho que la importación ocurrió si te saltaste el aviso. Si te faltan los servidores MCP o las extensiones, probablemente declinaste o te perdiste la importación en el primer arranque. Busca tus servidores en <code>~/.gemini/config/mcp_config.json</code>, o ejecuta <code>agy plugin import gemini</code> para convertirlos ahora.',
        },
        {
          type: 'paragraph',
          text: 'Esa es toda la migración. Como Gemini CLI ya no da servicio a las cuentas personales, este es el movimiento que te mantiene al día, y cuesta un par de minutos.',
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
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar varias sesiones de CLI de IA en paralelo con visibilidad real. Funciona en macOS, Windows y Linux, y no es un proveedor de modelos, así que cada sesión de Antigravity CLI sigue usando tu propio inicio de sesión de Google y tu propia instalación de <code>agy</code>. La app solo le da un sitio donde vivir a las sesiones: varios terminales en un espacio de trabajo, con el agente elegido por terminal desde el selector SELECT AI AGENT.',
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
          text: 'Si vienes del antiguo flujo de Gemini CLI, se traslada directamente: <a href="/es/guias/ejecutar-multiples-sesiones-antigravity-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Antigravity CLI</a> y la <a href="/es/guias/enjambre-de-agentes-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes de Antigravity</a> describen el mismo patrón sobre agy.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Gemini CLI está muerto o descontinuado?',
      answer: 'Para las cuentas personales, sí. El 18 de junio de 2026 Gemini CLI dejó de dar servicio a los usuarios gratuitos y a los suscriptores de Google AI Pro y Ultra, y Google los pasó a Antigravity CLI, que corre bajo el comando agy. Gemini CLI sigue mantenido para clientes empresariales de Gemini Code Assist en Google Cloud y funciona con claves de pago de la API de Gemini. El anuncio está en el blog de desarrolladores de Google y hay una discusión fijada en el repo de gemini-cli en GitHub con los detalles.',
    },
    {
      question: '¿Tengo que migrar de Gemini CLI a Antigravity CLI?',
      answer: 'Si usabas Gemini CLI con una cuenta personal de Google, sí, porque ya no da servicio a esas cuentas. Los clientes empresariales de Code Assist y quienes usan una clave de pago de la API pueden seguir con él. La parte buena es que migrar es corto: instala Antigravity CLI con un script y acepta el aviso de importación en el primer arranque. Tu configuración existente se traslada, así que no reconstruyes tu setup desde cero.',
    },
    {
      question: '¿Se trasladan mi configuración y mis servidores MCP de Gemini CLI?',
      answer: 'Casi todo. Antigravity CLI reutiliza el mismo home ~/.gemini y en el primer arranque ofrece convertir tus extensiones y ajustes de Gemini CLI. Los servidores MCP pasan a ~/.gemini/config/mcp_config.json y tu ~/.gemini/GEMINI.md global sigue funcionando. Los temas de terminal personalizados pueden no pasar, y las skills de proyecto en .gemini/skills/ hay que moverlas a .agents/skills/. Si falta algo, ejecuta agy plugin import gemini.',
    },
    {
      question: '¿Cuál es la diferencia entre Antigravity CLI y Gemini CLI?',
      answer: 'Antigravity CLI viene como un único binario compilado sin runtime de Node ni de Python, mientras que Gemini CLI era una herramienta de npm/Node. Antigravity CLI ofrece modelos de Gemini, Claude y de pesos abiertos en el mismo terminal, según tu plan, mientras que Gemini CLI era solo Gemini. Antigravity CLI es multiagente por defecto y puede coordinar subagentes, mientras que Gemini CLI era un único chat lineal. Además reutiliza el home ~/.gemini e importa tu config antigua.',
    },
    {
      question: '¿Antigravity CLI es mejor que Gemini CLI?',
      answer: 'Es el sucesor con soporte, así que es el que va a seguir mejorando. Suma capacidades reales sobre Gemini CLI: instalación de un solo binario sin runtime de Node, varias familias de modelos en un mismo terminal, y un diseño multiagente. Si cada cambio encaja con tu flujo es cosa tuya, pero para las cuentas personales Gemini CLI ya no funciona, así que Antigravity CLI es la herramienta actual a usar.',
    },
    {
      question: '¿Puedo seguir usando Gemini CLI?',
      answer: 'Solo en algunos casos. Gemini CLI sigue mantenido para clientes empresariales de Gemini Code Assist en Google Cloud y acepta claves de pago de la API de Gemini. Con una cuenta gratuita o una suscripción a Google AI Pro o Ultra dejó de atender peticiones el 18 de junio de 2026, así que el camino para esos usuarios es instalar Antigravity CLI e importar su config.',
    },
    {
      question: '¿Antigravity CLI usa modelos Gemini?',
      answer: 'Sí, y lidera con ellos. A octubre de 2026 Gemini 3.8 Flash está disponible en todos los planes y Gemini 4 Argon en los planes de pago de Google AI. También va más allá de Gemini: el mismo terminal ofrece modelos Claude y, en el plan gratuito hasta el 2 de noviembre de 2026, GPT-OSS 120B. Elige con /model o --model, y ejecuta agy models para ver lo que incluye tu plan.',
    },
  ],
}

export default guide
