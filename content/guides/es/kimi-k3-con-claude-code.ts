import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-k3-con-claude-code',
    locale: 'es',
    title: 'Cómo usar Kimi K3 con Claude Code: guía de configuración completa',
    metaTitle: 'Kimi K3 con Claude Code: configuración, variables y límites reales (2026)',
    metaDescription: 'Ejecuta Kimi K3 de Moonshot dentro de Claude Code con el endpoint compatible con Anthropic. Las dos configuraciones, las variables que importan y los límites que nadie cuenta.',
    intro: `Moonshot sacó Kimi K3 el 16 de julio de 2026 y la primera pregunta de todo el mundo fue si se podía apuntar Claude Code hacia él. La respuesta es sí, y el 23 de octubre de 2026 la misma pregunta volvió con K3.1 Pro. Moonshot publica un endpoint compatible con Anthropic, así que Claude Code habla con Kimi K3 con un par de variables de entorno y sin aprender una herramienta nueva. Mantienes la CLI que ya conoces, tus hooks, tus servidores MCP y tu memoria muscular, y cambias el modelo de debajo.

Esta guía cubre las dos formas de hacerlo, porque hay dos endpoints distintos con dos variables de autenticación distintas y dos ids de modelo distintos, y confundirlos es el motivo más común por el que la gente acaba mirando un 401. También cubre la parte que casi todos los posts se saltan: qué cambia cuando te pasas. Tool Search conviene apagarlo, WebFetch puede no funcionar y el soporte de imágenes depende del modelo y del endpoint que elijas. Son renuncias reales y conviene saberlas antes de mover un proyecto de verdad a esto.

Todo lo de abajo se ha vuelto a contrastar con la documentación oficial de Moonshot en octubre de 2026. Sus modelos y planes cambian a menudo, así que si algo baila, su documentación manda.`,
    ctaText: 'Tener Kimi K3 en un terminal y Claude en otro es la forma más rápida de descubrir qué modelo encaja en cada trabajo. CodeAgentSwarm ejecuta los dos a la vez, cada uno en su terminal, con diffs en vivo, notificaciones de escritorio e historial buscable en todos.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Kimi K3', 'Claude Code'],
    publishedAt: '2026-07-17',
    updatedAt: '2026-10-31',
    alternateSlug: 'kimi-k3-with-claude-code',
  },
  sections: [
    {
      id: 'que-es-kimi-k3',
      title: 'Qué es Kimi K3 y por qué meterlo en Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi K3 es el modelo que Moonshot AI lanzó el 16 de julio de 2026: un Mixture of Experts de 2,8 billones de parámetros con una ventana de contexto de 1.048.576 tokens, visión nativa y pesos abiertos. El 23 de octubre de 2026 Moonshot sacó K3.1 Pro, una versión de K3 con más post-entrenamiento y la misma ventana de 1M, y ahora llama a K3 su insignia de la generación anterior. Todo lo de esta guía vale para los dos; solo cambia el id del modelo.',
        },
        {
          type: 'paragraph',
          text: 'El detalle que más se nota en el día a día es que K3 razona siempre. En el lanzamiento <code>reasoning_effort</code> solo aceptaba <code>max</code>. Moonshot ha añadido después <code>low</code> y <code>high</code>, y K3.1 Pro ofrece los mismos tres niveles. En K3.1 Pro el razonamiento no se puede apagar: las peticiones sin él se rechazan. Dentro de Claude Code cambias de nivel con <code>/effort</code>, como explica la <a href="https://www.kimi.com/code/docs/en/third-party-tools/claude-code.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de configuración de Claude Code</a> de Moonshot.',
        },
        {
          type: 'paragraph',
          text: 'Las tarifas por token de K3 y K3.1 Pro están en la <a href="https://platform.kimi.ai/docs/pricing/chat" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de precios</a> de Moonshot. La caché de contexto es automática y los aciertos se cobran al precio de entrada en caché, más barato, algo que importa mucho en un agente que reenvía el contexto de un repo grande en cada turno.',
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
        {
          type: 'paragraph',
          text: 'Si lo que quieres es probar la CLI propia de Moonshot, la cubrimos aparte: <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo instalar y usar Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">qué incluye de verdad cada plan de Kimi</a> y el cara a cara <a href="/es/guias/kimi-code-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code vs Claude Code</a>. Tampoco tienes que elegir una sola herramienta: CodeAgentSwarm ejecuta Kimi Code como agente de primera junto a Claude Code, un terminal en cada uno, sobre el mismo proyecto.',
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
          text: 'Pagas una cuota mensual fija y tienes un cupo. El endpoint es <code>https://api.kimi.ai/coding/</code> (<code>https://api.kimi.com/coding/</code> para cuentas de China continental), te autenticas con <code>ANTHROPIC_API_KEY</code> usando una clave de la consola de Kimi Code, y el id de modelo es <code>k3.1-pro</code>, o <code>k3.1-pro[1m]</code> para la ventana completa de 1M (<code>k3</code> y <code>k3[1m]</code> siguen funcionando para K3). En los planes que Moonshot lanzó en octubre de 2026 ya no hay cupo semanal: quedan una ventana móvil de 5 horas y el total mensual de la membresía. Los planes antiguos mantienen la renovación cada 7 días. La <a href="https://www.kimi.com/code/docs/en/kimi-code/membership.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de membresía</a> tiene las reglas actuales.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Opción B: la Open Platform de Moonshot',
          id: 'opcion-plataforma',
        },
        {
          type: 'paragraph',
          text: 'Pagas por token sin compromiso mensual. El endpoint es <code>https://api.moonshot.ai/anthropic</code>, te autenticas con <code>ANTHROPIC_AUTH_TOKEN</code> usando una clave de platform.kimi.ai, y el <a href="https://platform.kimi.ai/docs/guide/claude-code-kimi" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">ejemplo oficial para Claude Code</a> de Moonshot usa <code>kimi-k3[1m]</code>. Los modelos insignia se desbloquean tras una recarga mínima de 1 dólar, y tu recarga acumulada fija el nivel de la cuenta, que decide la concurrencia y las peticiones por minuto. Los niveles bajos se quedan cortos para trabajo agéntico, así que lee la página de <a href="https://platform.kimi.ai/docs/pricing/limits" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">recargas y límites</a> antes de juzgar la velocidad.',
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
          code: 'export ANTHROPIC_BASE_URL=https://api.kimi.ai/coding/\nexport ANTHROPIC_API_KEY=tu_clave_de_kimi_code\nexport ANTHROPIC_MODEL="k3.1-pro[1m]"\nexport ANTHROPIC_DEFAULT_OPUS_MODEL=$ANTHROPIC_MODEL\nexport ANTHROPIC_DEFAULT_SONNET_MODEL=$ANTHROPIC_MODEL\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL=$ANTHROPIC_MODEL\nexport ANTHROPIC_DEFAULT_FABLE_MODEL=$ANTHROPIC_MODEL\nexport CLAUDE_CODE_SUBAGENT_MODEL=$ANTHROPIC_MODEL\nexport CLAUDE_CODE_EFFORT_LEVEL=high\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1048576\nexport CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576',
        },
        {
          type: 'paragraph',
          text: 'Luego ejecuta <code>claude</code> y escribe <code>/status</code>. La base URL que muestre debería ser <code>https://api.kimi.ai/coding/</code>. Si sigue apareciendo la de Anthropic, tus exports no llegaron al proceso, y eso casi siempre significa que los pusiste en un shell distinto del que lanzó la CLI.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El contexto de 1M está limitado por tu plan. K3.1 Pro y K3 te dan 262.144 tokens en Plus (el antiguo Moderato) y el 1M completo solo en Pro (el antiguo Allegretto) o superior. En el plan inferior quita el sufijo <code>[1m]</code> y pon las dos variables de contexto a 262144. Si le dices a Claude Code que tiene una ventana que tu plan no da, Moonshot avisa de errores por desbordamiento de contexto; si te quedas corto, compacta demasiado pronto.',
        },
        {
          type: 'paragraph',
          text: 'Ese límite conviene entenderlo antes de suscribirte, porque el contexto de 1M es uno de los grandes argumentos de venta y no está en el plan de entrada para programar. Moonshot renombró sus planes en octubre de 2026 (Plus y Pro sustituyen a Moderato y Allegretto para los miembros nuevos, y Go no incluye cupo de programación), así que mira la <a href="https://www.kimi.com/code/docs/en/kimi-code/membership.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de membresía</a> al pagar en vez de fiarte de cualquier tabla de un blog, esta incluida.',
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
          code: 'unset ANTHROPIC_API_KEY\n\nexport ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic\nexport ANTHROPIC_AUTH_TOKEN=tu_clave_de_plataforma\nexport ANTHROPIC_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_OPUS_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_SONNET_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_FABLE_MODEL="kimi-k3[1m]"\nexport CLAUDE_CODE_SUBAGENT_MODEL="kimi-k3[1m]"\nexport CLAUDE_CODE_EFFORT_LEVEL=max\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1000000\nexport ENABLE_TOOL_SEARCH=false',
        },
        {
          type: 'paragraph',
          text: 'Las líneas <code>ANTHROPIC_DEFAULT_*</code> importan más de lo que parece. Claude Code elige modelos distintos para trabajos distintos, y si solo pones <code>ANTHROPIC_MODEL</code> puede intentar tirar de un id de Haiku o Sonnet que no existe en el endpoint de Moonshot. Apuntarlas todas al mismo modelo de Kimi, más <code>CLAUDE_CODE_SUBAGENT_MODEL</code> para los subagentes, mantiene funcionando cada llamada interna. El ejemplo de Moonshot manda el nivel Haiku a <code>kimi-k2.7-code</code>, pero los modelos K2 dejan de estar disponibles para cuentas nuevas de la plataforma desde el 31 de octubre de 2026 y Moonshot prevé retirarlos a finales de diciembre, así que esta configuración deja todos los niveles en K3.',
        },
        {
          type: 'paragraph',
          text: 'Cuando arranque, recuerda que los límites de la plataforma dependen de tu recarga acumulada, no de un plan que elijas. Si una sesión agéntica parece rota más que lenta, mira tu nivel en la página de <a href="https://platform.kimi.ai/docs/pricing/limits" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">recargas y límites</a> antes de culpar al modelo.',
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
          text: 'Tool Search, mejor apagado',
          id: 'tool-search-off',
        },
        {
          type: 'paragraph',
          text: 'Tool Search es el ajuste a vigilar. Desde Claude Code v2.1.304, tool search viene activado por defecto cuando <code>ANTHROPIC_BASE_URL</code> apunta a un gateway, así que las peticiones llevan campos <code>defer_loading</code> y bloques <code>tool_reference</code> que un endpoint que no es de Anthropic puede no aceptar (<a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación MCP de Claude Code</a>). Las versiones nuevas reintentan sin tool search tras un 400 que no reconocen, a costa de una petición rechazada extra. Poner <code>ENABLE_TOOL_SEARCH=false</code> carga todas las herramientas MCP desde el principio y se ahorra esas peticiones fallidas. Además hay un reporte abierto en el tracker de Moonshot de sesiones del endpoint de suscripción atascadas en HTTP 400 tras bloques <code>tool_reference</code>. Está sin confirmar, pero el <code>false</code> explícito de la configuración de arriba no te cuesta nada.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'WebFetch da error',
          id: 'sin-webfetch',
        },
        {
          type: 'paragraph',
          text: 'Versiones anteriores de la FAQ de Moonshot decían que WebFetch no estaba disponible en el endpoint de Kimi y que devolvía un error de "temporarily unavailable" o una respuesta vacía. La FAQ actual de Kimi Code ya no lo menciona, y no hemos podido confirmar si la limitación sigue. Prueba una llamada a WebFetch en tu endpoint antes de depender de ella. Si falla, pega el contenido de la página en el chat o usa una herramienta MCP de scraping.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Las imágenes dependen del endpoint que elegiste',
          id: 'asimetria-imagenes',
        },
        {
          type: 'paragraph',
          text: 'Esto es más turbio de lo que la mayoría de posts da a entender. Hay una petición abierta pidiendo que el endpoint de suscripción soporte imágenes desde herramientas de terceros, y menciona a Claude Code, Roo Code y Cursor como afectados. Pero es la petición de un solo usuario, sin respuesta oficial, y la evidencia real desmiente que haya un bloqueo total: hay sesiones documentadas de ese mismo endpoint decodificando PNG y JPEG en base64 sin problema, y solo rechaza webp y gif. Cuando un cliente de terceros no consigue pasarle imágenes, el problema suele estar en el lado del cliente, no en que el endpoint rechace imágenes sin más.',
        },
        {
          type: 'paragraph',
          text: 'El endpoint de plataforma de pago por token documenta visión, porque K3 y K3.1 Pro son multimodales de forma nativa. Su guía de visión muestra imágenes en base64 y ficheros subidos por file id (ids <code>ms://</code>). Si una imagen pegada falla en las herramientas de Kimi, su FAQ dice que el modelo actual no admite imágenes y que cambies a uno con visión.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si las capturas son parte de cómo trabajas, prueba el pegado de imágenes con tu propio cliente en el endpoint que elijas antes de comprometerte. El de plataforma tiene la visión documentada; el de suscripción es donde los reportes de terceros se vuelven turbios.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cada petición piensa, y lo pagas',
          id: 'siempre-razonando',
        },
        {
          type: 'paragraph',
          text: 'En el lanzamiento K3 solo admitía esfuerzo de razonamiento máximo, y las preguntas baratas costaban dinero de verdad: la prueba de Simon Willison gastó 13.241 tokens de razonamiento para producir 3.417 tokens de respuesta. Ahora que existen low y high, elige el nivel por tarea con <code>/effort</code>. La guía de suscripción de Moonshot recomienda high para K3.1 Pro y K3. En un agente de código que lanza muchas tool calls pequeñas, el esfuerzo suma de una forma que una comparación de precio por token no enseña.',
        },
      ],
    },
    {
      id: 'en-paralelo',
      title: 'Ejecuta Kimi K3 y Claude a la vez en vez de elegir',
      content: [
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: 'La respuesta honesta a "¿es Kimi K3 mejor que Claude para lo mío?" es que los benchmarks no te lo van a decir. Cada lanzamiento trae sus gráficas, y lo que de verdad importa en un agente de código, llamar bien a herramientas cuando la conversación se alarga, casi nunca aparece en ellas. Willison lo dijo tal cual en el lanzamiento de K3.',
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
            '<strong>HTTP 400 permanente que no se recupera</strong>: pon ENABLE_TOOL_SEARCH=false. Desde Claude Code v2.1.304 tool search viene activado por defecto con un ANTHROPIC_BASE_URL propio, y un endpoint que no es de Anthropic puede rechazar sus bloques tool_reference. Después abre una sesión nueva.',
            '<strong>El contexto se compacta demasiado pronto o se desborda</strong>: tu ajuste de contexto no cuadra con lo que te da tu plan. En Plus o en el antiguo Moderato usa 262144, no 1048576.',
            '<strong>Tienes puestas a la vez una API key y un auth token</strong>: en el endpoint de plataforma, quita ANTHROPIC_API_KEY. Moonshot documenta el conflicto de forma explícita.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Se puede usar Kimi K3 con Claude Code?',
      answer: 'Sí. Moonshot publica endpoints compatibles con Anthropic, así que Claude Code habla con Kimi K3 o K3.1 Pro solo con variables de entorno y sin ninguna CLI nueva. Con una clave de suscripción de Kimi Code, pon ANTHROPIC_BASE_URL a https://api.kimi.ai/coding/ (https://api.kimi.com/coding/ en China continental) y ANTHROPIC_MODEL a k3.1-pro o k3. Con una clave de pago por token de la plataforma, usa https://api.moonshot.ai/anthropic y kimi-k3[1m].',
    },
    {
      question: '¿Por qué me da 401 al usar mi clave de Kimi con Claude Code?',
      answer: 'Casi siempre porque la clave y el endpoint no coinciden. Moonshot tiene dos plataformas independientes, y una clave de platform.kimi.ai devuelve 401 en platform.kimi.com y al revés. Además el endpoint de suscripción usa ANTHROPIC_API_KEY mientras que el de pago por token usa ANTHROPIC_AUTH_TOKEN, y Moonshot dice que quites ANTHROPIC_API_KEY en el endpoint de plataforma porque las dos entran en conflicto.',
    },
    {
      question: '¿Kimi K3 soporta el contexto completo de 1M en Claude Code?',
      answer: 'Solo con el plan adecuado. K3.1 Pro y K3 dan 262.144 tokens en Plus (el antiguo Moderato) y los 1.048.576 tokens completos en Pro (el antiguo Allegretto) o superior. Poner CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576 en un plan que solo da 256K provoca errores de contexto, así que en el plan inferior usa 262144 y el id de modelo sin [1m].',
    },
    {
      question: '¿Qué deja de funcionar al ejecutar Kimi K3 en Claude Code?',
      answer: 'Pon ENABLE_TOOL_SEARCH=false: desde Claude Code v2.1.304 tool search viene activado por defecto con una base URL propia, y un endpoint que no es de Anthropic puede rechazar sus bloques tool_reference. FAQs anteriores de Moonshot decían que WebFetch no estaba disponible en el endpoint de Kimi; la FAQ actual ya no lo dice, así que pruébalo una vez. Las imágenes solo funcionan con modelos con visión, y el endpoint de plataforma documenta imágenes en base64 e ids de fichero ms://.',
    },
    {
      question: '¿Kimi K3 es más barato que Claude para programar?',
      answer: 'Depende de tu carga de trabajo. Moonshot publica las tarifas por token de K3 y K3.1 Pro en su página oficial de precios, y los aciertos de caché se cobran más baratos. El esfuerzo de razonamiento pesa tanto como la tarifa: en el lanzamiento K3 solo admitía esfuerzo máximo, y ahora K3 y K3.1 Pro ofrecen low, high y max. Tenerlo unos días en un terminal al lado de tu configuración normal te dice más que cualquier tabla de precios.',
    },
    {
      question: '¿Kimi K3 es lo mismo que Kimi Code CLI?',
      answer: 'No. Kimi K3 es el modelo, y lo puedes ejecutar dentro de Claude Code como describe esta guía. Kimi Code CLI es el agente de terminal propio de Moonshot, un producto aparte que compite con Claude Code y que tiene su propia configuración, sus hooks y sus sesiones. No lo necesitas para usar K3.',
    },
  ],
}

export default guide
