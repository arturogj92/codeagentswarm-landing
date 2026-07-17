import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-k3-con-claude-code',
    locale: 'es',
    title: 'Cómo usar Kimi K3 con Claude Code: guía de configuración completa',
    metaTitle: 'Kimi K3 con Claude Code: configuración, variables y límites reales (2026)',
    metaDescription: 'Ejecuta Kimi K3 de Moonshot dentro de Claude Code con el endpoint compatible con Anthropic. Las dos configuraciones, las variables que importan y los límites que nadie cuenta.',
    intro: `Moonshot sacó Kimi K3 el 16 de julio de 2026 y la primera pregunta de todo el mundo fue si se podía apuntar Claude Code hacia él. La respuesta es sí. Moonshot publica un endpoint compatible con Anthropic, así que Claude Code habla con Kimi K3 con un par de variables de entorno y sin aprender una herramienta nueva. Mantienes la CLI que ya conoces, tus hooks, tus servidores MCP y tu memoria muscular, y cambias el modelo de debajo.

Esta guía cubre las dos formas de hacerlo, porque hay dos endpoints distintos con dos variables de autenticación distintas y dos ids de modelo distintos, y confundirlos es el motivo más común por el que la gente acaba mirando un 401. También cubre la parte que casi todos los posts se saltan: qué deja de funcionar cuando cambias. Tool Search tiene que estar apagado, WebFetch desaparece y en uno de los dos endpoints las imágenes dejan de funcionar del todo. Son renuncias reales y conviene saberlas antes de mover un proyecto de verdad a esto.

Todo lo de abajo está contrastado con la documentación oficial de Moonshot. Su CLI saca ahora mismo casi una versión al día, así que si algo baila, su documentación manda.`,
    ctaText: 'Tener Kimi K3 en un terminal y Claude en otro es la forma más rápida de descubrir qué modelo encaja en cada trabajo. CodeAgentSwarm ejecuta los dos a la vez, cada uno en su terminal, con diffs en vivo, notificaciones de escritorio e historial buscable en todos.',
    highlightedWords: ['Kimi K3', 'Claude Code'],
    publishedAt: '2026-07-17',
    updatedAt: '2026-07-17',
    alternateSlug: 'kimi-k3-with-claude-code',
  },
  sections: [
    {
      id: 'que-es-kimi-k3',
      title: 'Qué es Kimi K3 y por qué meterlo en Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi K3 es el modelo insignia de Moonshot AI, lanzado el 16 de julio de 2026. Es un modelo Mixture of Experts de 2,8 billones de parámetros con una ventana de contexto de 1.048.576 tokens y visión nativa. Moonshot lo vende como el primer modelo abierto de la clase 3T y dice que los pesos completos salen antes del 27 de julio de 2026.',
        },
        {
          type: 'paragraph',
          text: 'El detalle que más se nota en el día a día es que K3 razona siempre. Ahora mismo <code>reasoning_effort</code> solo acepta <code>max</code> y no existe una variante sin razonamiento. Moonshot ha dicho que llegarán modos de esfuerzo bajo y alto, pero de salida cada petición piensa a fondo. Eso lo hace fuerte en problemas difíciles y lento y caro en los fáciles.',
        },
        {
          type: 'paragraph',
          text: 'El precio por token es de 0,30 dólares por millón de tokens en aciertos de caché, 3,00 en fallos de caché y 15,00 de salida, plano en todo el contexto de 1M y sin recargo por contexto largo. Ese descuento de 10x por acierto de caché importa mucho en un agente que reenvía el contexto de un repo grande en cada turno.',
        },
        {
          type: 'paragraph',
          text: '¿Y por qué ejecutarlo con <a href="/es/guias/interfaz-grafica-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> en vez de con la CLI propia de Moonshot? Porque Claude Code ya lo tienes configurado. Tus hooks, tus servidores MCP, tu <code>CLAUDE.md</code>, tus skills y tus comandos siguen funcionando. Cambiar el modelo es una variable de entorno. Cambiar de herramienta es un fin de semana.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No confundas el modelo con la CLI. Kimi K3 es el modelo. Kimi Code CLI es el agente de terminal propio de Moonshot, un producto aparte que compite con Claude Code. Esta guía va de ejecutar el modelo K3 dentro de Claude Code, que no necesita ninguna CLI nueva.',
        },
      ],
    },
    {
      id: 'dos-endpoints',
      title: 'Elige endpoint primero: suscripción o pago por token',
      content: [
        {
          type: 'paragraph',
          text: 'Este es el paso que la gente se salta y es la causa de casi todos los fallos de configuración. Moonshot tiene dos endpoints compatibles con Anthropic separados. Tienen hosts distintos, nombres de variable de autenticación distintos e ids de modelo distintos. Una clave de uno devuelve 401 en el otro. Decide en cuál estás antes de copiar ninguna config.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Opción A: la suscripción de Kimi Code',
          id: 'opcion-suscripcion',
        },
        {
          type: 'paragraph',
          text: 'Pagas una cuota mensual fija y tienes un cupo. El endpoint es <code>https://api.kimi.com/coding/</code>, te autenticas con <code>ANTHROPIC_API_KEY</code> usando una clave de la consola de Kimi Code, y el id de modelo es <code>k3[1m]</code>. El cupo se renueva cada 7 días desde la fecha de tu suscripción y no se acumula, y encima hay una ventana rodante de 5 horas, así que puedes chocarte contra un límite aunque te quede cupo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Opción B: la Open Platform de Moonshot',
          id: 'opcion-plataforma',
        },
        {
          type: 'paragraph',
          text: 'Pagas por token sin compromiso mensual. El endpoint es <code>https://api.moonshot.ai/anthropic</code>, te autenticas con <code>ANTHROPIC_AUTH_TOKEN</code> usando una clave de platform.kimi.ai, y el id de modelo es <code>kimi-k3</code>. Los límites van por niveles según cuánto has recargado en total, y el nivel de entrada es directamente inusable para trabajo agéntico: en el Tier 0 tienes 1 petición concurrente y 3 peticiones por minuto. Necesitas al menos 10 dólares de recarga acumulada para llegar al Tier 1 y sus 50 concurrentes.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'La variable de autenticación es distinta a propósito y se pelean entre ellas. El endpoint de plataforma usa ANTHROPIC_AUTH_TOKEN, y Moonshot dice explícitamente que quites ANTHROPIC_API_KEY si la tienes puesta, porque las dos entran en conflicto. Si alguna vez exportaste una clave de Anthropic en tu perfil de shell, quítala antes de probar.',
        },
      ],
    },
    {
      id: 'config-suscripcion',
      title: 'Configuración A: Kimi K3 en Claude Code con suscripción de Kimi Code',
      content: [
        {
          type: 'paragraph',
          text: 'Saca una clave de la consola de Kimi Code y exporta esto antes de lanzar Claude Code:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/\nexport ANTHROPIC_API_KEY=tu_clave_de_kimi_code\nexport ANTHROPIC_MODEL="k3[1m]"\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1048576\nexport CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576\nexport CLAUDE_CODE_EFFORT_LEVEL=max',
        },
        {
          type: 'paragraph',
          text: 'Luego ejecuta <code>claude</code> y escribe <code>/status</code>. La base URL que muestre debería ser <code>https://api.kimi.com/coding/</code>. Si sigue apareciendo la de Anthropic, tus exports no llegaron al proceso, y eso casi siempre significa que los pusiste en un shell distinto del que lanzó la CLI.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El contexto de 1M está limitado por tu plan. K3 te da 256k en Moderato y el 1M completo solo en Allegretto o superior. Si estás en el plan barato y copias CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576 igualmente, le estás diciendo a Claude Code que tiene una ventana que tu plan no te da, y Moonshot avisa de que eso provoca compactación prematura y errores. En Moderato usa 262144.',
        },
        {
          type: 'paragraph',
          text: 'Ese límite conviene entenderlo antes de suscribirte, porque el contexto de 1M es el argumento de venta principal y no está en el plan de entrada. Las propias páginas de Moonshot se contradicen ahora mismo sobre si el acceso a Kimi Code empieza en Moderato o en Allegretto, así que mira qué incluye tu plan en el momento de pagar en vez de fiarte de ninguna tabla que leas en un post, incluido este.',
        },
      ],
    },
    {
      id: 'config-plataforma',
      title: 'Configuración B: Kimi K3 en Claude Code pagando por token',
      content: [
        {
          type: 'paragraph',
          text: 'Saca una clave en platform.kimi.ai, asegúrate de que no hay ninguna <code>ANTHROPIC_API_KEY</code> puesta y exporta esto:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'unset ANTHROPIC_API_KEY\n\nexport ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic\nexport ANTHROPIC_AUTH_TOKEN=tu_clave_de_plataforma\nexport ANTHROPIC_MODEL=kimi-k3\nexport ANTHROPIC_DEFAULT_OPUS_MODEL=kimi-k3\nexport ANTHROPIC_DEFAULT_SONNET_MODEL=kimi-k3\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL=kimi-k3\nexport CLAUDE_CODE_SUBAGENT_MODEL=kimi-k3\nexport ENABLE_TOOL_SEARCH=false\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1048576',
        },
        {
          type: 'paragraph',
          text: 'Las tres líneas de <code>ANTHROPIC_DEFAULT_*</code> importan más de lo que parece. Claude Code elige modelos distintos para trabajos distintos, y si solo pones <code>ANTHROPIC_MODEL</code> puede seguir intentando tirar de un id de Haiku o de Sonnet que no existe en el endpoint de Moonshot. Apuntarlos todos a <code>kimi-k3</code>, más <code>CLAUDE_CODE_SUBAGENT_MODEL</code> para los subagentes, mantiene todas las llamadas internas en el mismo modelo.',
        },
        {
          type: 'paragraph',
          text: 'Cuando arranque, recuerda que la escalera de niveles va según tu recarga acumulada, no según un plan que elijas. El Tier 0 con 3 peticiones por minuto hace que una sesión agéntica parezca rota más que lenta, así que si vas a probar esto en serio, recarga hasta el Tier 1 primero.',
        },
      ],
    },
    {
      id: 'que-se-rompe',
      title: 'Qué deja de funcionar: la lista honesta',
      content: [
        {
          type: 'paragraph',
          text: 'Un endpoint compatible con Anthropic es compatible, no idéntico. Algunas funciones de Claude Code no sobreviven al cambio, y es mejor saberlo ahora que depurarlo a medianoche.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tool Search tiene que ir apagado, y no es opcional',
          id: 'tool-search-off',
        },
        {
          type: 'paragraph',
          text: 'La documentación de Moonshot dice que el endpoint todavía no soporta Tool Search y que hay que ponerlo en <code>false</code>. Eso suena a recomendación hasta que ves qué pasa si lo ignoras: hay un reporte abierto donde los mensajes <code>tool_reference</code> envenenan la sesión en el endpoint de suscripción y todas las peticiones siguientes fallan con un HTTP 400 permanente. La sesión no se recupera. La única salida es empezar una nueva. Pon <code>ENABLE_TOOL_SEARCH=false</code> y déjalo así.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'WebFetch desaparece',
          id: 'sin-webfetch',
        },
        {
          type: 'paragraph',
          text: 'WebFetch no está disponible ahora mismo en el endpoint de Kimi. Si tu forma de trabajar depende de que el agente se lea páginas de documentación por su cuenta, va a perder esa herramienta en silencio. No salta ningún error, simplemente la capacidad no está.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Las imágenes dependen del endpoint que elegiste',
          id: 'asimetria-imagenes',
        },
        {
          type: 'paragraph',
          text: 'Esta es una bifurcación de verdad. El endpoint de suscripción en api.kimi.com/coding no acepta imágenes de entrada en absoluto. Hay una petición abierta sobre ello, y se menciona que ni Claude Code ni Roo Code ni Cursor pueden pasarle imágenes. Así que si pegas una captura a tu agente como parte de tu rutina, eso deja de funcionar en la Opción A.',
        },
        {
          type: 'paragraph',
          text: 'El endpoint de plataforma de pago por token sí soporta visión, porque K3 es multimodal de forma nativa. Pero solo acepta base64 o ids de fichero <code>ms://</code>, nunca URLs públicas de imagen. Así que las imágenes sobreviven en la Opción B, con matiz.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si las capturas son parte de cómo trabajas, eso solo ya te decide el endpoint. El pago por token mantiene tus imágenes, la suscripción no.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cada petición piensa, y lo pagas',
          id: 'siempre-razonando',
        },
        {
          type: 'paragraph',
          text: 'Como K3 hoy solo admite esfuerzo de razonamiento máximo, las preguntas baratas cuestan dinero de verdad. La prueba de Simon Willison el día del lanzamiento gastó 13.241 tokens de razonamiento para producir 3.417 tokens de respuesta, y lo señaló como caro. Para un agente de código que dispara muchas llamadas pequeñas a herramientas, esto suma de una forma que una comparación de precio por token esconde.',
        },
      ],
    },
    {
      id: 'en-paralelo',
      title: 'Ejecuta Kimi K3 y Claude a la vez en vez de elegir',
      content: [
        {
          type: 'image',
          alt: 'El selector de agente de CodeAgentSwarm donde eliges qué CLI de IA corre en cada terminal',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Cada terminal de CodeAgentSwarm lleva su propio agente y su propio entorno, así que un terminal con Kimi K3 y otro con Claude pueden convivir en la misma ventana sobre el mismo repo.',
        },
        {
          type: 'paragraph',
          text: 'La respuesta honesta a "¿es Kimi K3 mejor que Claude para lo mío?" es que nadie lo sabe todavía. K3 tiene días, toda la señal de calidad que circula son primeras impresiones, y lo que de verdad importa en un agente de código, llamar a herramientas de forma fiable según se alarga la conversación, no tiene ningún dato público detrás. Willison señaló justo eso en el lanzamiento: los benchmarks que circulan ni lo tocan.',
        },
        {
          type: 'paragraph',
          text: 'O sea que la única prueba útil es tu repo, tus tareas, los dos modelos, a la vez. Eso es incómodo con un solo terminal, porque la configuración es un puñado de variables de entorno que tienes que ir cambiando. Deja de ser incómodo cuando cada terminal tiene su propio agente y su propio entorno.',
        },
        {
          type: 'paragraph',
          text: 'Eso es lo que hace <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>. Le das a un terminal el entorno de Kimi y a otro tu configuración normal de Claude, apuntas los dos a la misma tarea y miras. Cada terminal tiene diffs en vivo de lo que tocó su agente, una notificación de escritorio cuando te necesita, e historial buscable después, así que comparar dos ejecuciones es leer dos historiales en vez de fiarte de lo que recuerdas de hace veinte minutos.',
        },
        {
          type: 'paragraph',
          text: 'Si quieres el panorama completo, la comparación <a href="/es/guias/claude-code-vs-cursor-vs-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code vs Cursor vs Codex</a> cubre en qué se diferencian las herramientas, y <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> cubre el flujo en paralelo sobre el que se apoya esto.',
        },
      ],
    },
    {
      id: 'problemas',
      title: 'Resolver problemas de la configuración',
      content: [
        {
          type: 'list',
          items: [
            '<strong>401 Unauthorized</strong>: casi seguro estás usando una clave de la plataforma equivocada. Las claves de platform.kimi.ai y platform.kimi.com son completamente independientes, y una clave de una devuelve 401 en la otra. Lo mismo si mezclas una clave de la consola de Kimi Code con el endpoint de plataforma.',
            '<strong>/status sigue mostrando la base URL de Anthropic</strong>: tus exports no llegaron al proceso. Expórtalos en el mismo shell que lanza la CLI, o ponlos en tu perfil de shell y abre un terminal nuevo.',
            '<strong>HTTP 400 permanente que no se recupera</strong>: es el bug de Tool Search. Pon ENABLE_TOOL_SEARCH=false y empieza una sesión nueva, porque una sesión envenenada sigue envenenada.',
            '<strong>El contexto se compacta demasiado pronto</strong>: tu ajuste de contexto no cuadra con lo que te da tu plan. En Moderato usa 262144, no 1048576.',
            '<strong>Tienes puestas a la vez una API key y un auth token</strong>: en el endpoint de plataforma, quita ANTHROPIC_API_KEY. Moonshot documenta el conflicto de forma explícita.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Se puede usar Kimi K3 con Claude Code?',
      answer: 'Sí. Moonshot publica un endpoint compatible con Anthropic, así que Claude Code habla con Kimi K3 solo con variables de entorno y sin ninguna CLI nueva. Pon ANTHROPIC_BASE_URL a https://api.kimi.com/coding/ con una clave de suscripción de Kimi Code, o a https://api.moonshot.ai/anthropic con una clave de plataforma de pago por token, y luego pon ANTHROPIC_MODEL a k3[1m] o a kimi-k3 respectivamente.',
    },
    {
      question: '¿Por qué me da 401 al usar mi clave de Kimi con Claude Code?',
      answer: 'Casi siempre porque la clave y el endpoint no coinciden. Moonshot tiene dos plataformas independientes, y una clave de platform.kimi.ai devuelve 401 en platform.kimi.com y al revés. Además el endpoint de suscripción usa ANTHROPIC_API_KEY mientras que el de pago por token usa ANTHROPIC_AUTH_TOKEN, y Moonshot dice que quites ANTHROPIC_API_KEY en el endpoint de plataforma porque las dos entran en conflicto.',
    },
    {
      question: '¿Kimi K3 soporta el contexto completo de 1M en Claude Code?',
      answer: 'Solo con el plan adecuado. K3 da 256k de contexto en Moderato y los 1.048.576 tokens completos en Allegretto o superior. Poner CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576 en un plan que solo da 256k provoca compactación prematura y errores, así que usa 262144 en el plan inferior.',
    },
    {
      question: '¿Qué deja de funcionar al ejecutar Kimi K3 en Claude Code?',
      answer: 'Tool Search tiene que estar desactivado con ENABLE_TOOL_SEARCH=false, e ignorarlo puede envenenar una sesión hasta dejarla con errores HTTP 400 permanentes. WebFetch no está disponible en el endpoint de Kimi. Las imágenes no están soportadas en absoluto en el endpoint de suscripción, y en el de pago por token funcionan solo como base64 o ids de fichero ms://, nunca como URLs públicas.',
    },
    {
      question: '¿Kimi K3 es más barato que Claude para programar?',
      answer: 'Por token parece mucho más barato: 0,30 dólares por millón en aciertos de caché, 3,00 en fallos y 15,00 de salida. Pero K3 ahora mismo solo admite esfuerzo de razonamiento máximo, así que cada petición piensa a fondo y quema tokens de razonamiento incluso en preguntas simples. El coste real depende de tu carga de trabajo, y por eso tenerlo unos días en un terminal al lado de tu configuración normal te dice más que cualquier tabla de precios.',
    },
    {
      question: '¿Kimi K3 es lo mismo que Kimi Code CLI?',
      answer: 'No. Kimi K3 es el modelo, y lo puedes ejecutar dentro de Claude Code como describe esta guía. Kimi Code CLI es el agente de terminal propio de Moonshot, un producto aparte que compite con Claude Code y que tiene su propia configuración, sus hooks y sus sesiones. No lo necesitas para usar K3.',
    },
  ],
}

export default guide
