import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-kimi-code',
    locale: 'es',
    title: 'Precios de Kimi Code: cada plan, los límites y qué cuestan los agentes en paralelo',
    metaTitle: 'Precios de Kimi Code 2026: coding plan, límites y API',
    metaDescription: 'Kimi Code viene con Plus 99 ¥, Pro 199 ¥, Max 699 ¥ y Ultra 1.399 ¥, más API por token. Y lo que la tabla no dice: qué pasa con varios agentes.',
    intro: `A 31 de octubre de 2026, la página oficial de membresías de Kimi lista cinco planes: Go por 49 ¥ al mes, Plus por 99 ¥, Pro por 199 ¥, Max por 699 ¥ y Ultra por 1.399 ¥. <strong>Go no incluye Kimi Code</strong>, así que la entrada real para programar es Plus por 99 ¥. Pro y los niveles superiores desbloquean hasta un millón de tokens de contexto en Kimi Code. Los antiguos Andante, Moderato, Allegretto y Allegro siguen solo para quien ya estaba suscrito.

También existe la vía de pago por token mediante la plataforma de API de Kimi. Sus tarifas actuales para K3.1 Pro son 1,30 ¥ por acierto de caché, 13 ¥ por entrada y 68 ¥ por salida, todo por millón de tokens. K3 cuesta 2 ¥, 20 ¥ y 100 ¥.

Esta guía separa ambos sistemas de facturación y enlaza cada cifra cambiante con la documentación oficial de Kimi. Los precios pueden cambiar: usa la fecha anterior y confirma el total en el checkout antes de pagar.`,
    ctaText: 'Ejecutar agentes de Kimi Code contra límites de uso estresa menos cuando puedes verlos. CodeAgentSwarm muestra el uso de Kimi junto al del resto de tus agentes.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'Precios'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-10-31',
    alternateSlug: 'kimi-code-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Planes de Kimi Code de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://www.kimi.com/en/help/membership/membership-overview" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de membresías de Kimi</a> muestra estos cinco planes a 31 de octubre de 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio mensual publicado', 'Créditos de agente', 'Kimi Code'],
          rows: [
            ['Go', '49 ¥ (39 ¥ con pago anual)', 'Más que Free', 'No incluido'],
            ['Plus', '99 ¥ (79 ¥ con pago anual)', '2x', 'Incluido; K3.1 Pro, K3 y K2.8 Preview'],
            ['Pro', '199 ¥ (159 ¥ con pago anual)', '4x', 'Incluido; hasta 1M de contexto y modelos Highspeed'],
            ['Max', '699 ¥ (559 ¥ con pago anual)', '14x', 'Incluido; hasta 1M de contexto'],
            ['Ultra', '1.399 ¥ (1.119 ¥ con pago anual)', '28x', 'Incluido; hasta 1M de contexto'],
          ],
          caption: 'Planes de membresía de Kimi según su centro de ayuda oficial y la documentación de modelos de Kimi Code, verificados el 31 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: 'Los créditos del plan se consumen según el uso real de tokens. Kimi Code, Kimi Work, Deep Research, Slides, webs y las demás funciones consumen un mismo pozo mensual, por lo que el uso intenso fuera de Kimi Code puede reducir lo que queda para programar.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El centro de ayuda oficial presenta estos como los planes actuales para China y los publica en yuanes. Kimi puede adaptar el checkout al mercado, así que confirma en tu cuenta la moneda, los impuestos y el descuento anual antes de pagar.',
        },
      ],
    },
    {
      id: 'como-funcionan-los-limites',
      title: 'Cómo funcionan los límites de Kimi Code',
      content: [
        {
          type: 'paragraph',
          text: 'Hay dos contadores importantes. Los créditos de la membresía se renuevan en cada ciclo de facturación y los que no usas no se acumulan. En los planes nuevos, Kimi Code añade un <strong>límite móvil de 5 horas y ningún límite semanal</strong>; los planes antiguos conservan el límite de 5 horas y el semanal. El pozo de créditos es compartido, así que agotarlo en otras funciones también para Kimi Code.',
        },
        {
          type: 'paragraph',
          text: 'Kimi no publica una cantidad fija de tokens por crédito de agente porque el consumo cambia según la tarea. Una sesión larga sobre un repositorio puede gastar más créditos que una edición corta, y varios terminales en paralelo alcanzan el límite de 5 horas antes que uno solo.',
        },
        {
          type: 'paragraph',
          text: 'Escribe <code>/usage</code> dentro de la interfaz de Kimi Code para consultar los límites de tu cuenta. Considera esa vista en vivo como la autoridad final sobre la capacidad que te queda.',
        },
      ],
    },
    {
      id: 'agentes-en-paralelo',
      title: 'Qué plan necesitas cuando tienes varias sesiones de Kimi Code a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi no publica un número de sesiones por nivel, así que nadie te puede decir honestamente que Plus equivalga a una cantidad fija de agentes. Lo que Kimi sí publica es la forma de los límites: un pozo mensual de créditos compartido con las demás funciones, un límite de 5 horas en Kimi Code y, solo en los planes antiguos, una asignación semanal. Con eso basta para saber contra qué techo chocas primero.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Qué esperar', 'Qué vigilar'],
          rows: [
            ['1 sesión', 'El límite de 5 horas rara vez se cruza en tu camino', 'El pozo mensual de créditos, porque Kimi Work, Deep Research y Slides beben del mismo'],
            ['2 o 3 sesiones', 'El límite de 5 horas empieza a apretar, ya que los terminales en paralelo llegan antes que uno solo', 'Consulta /usage entre tareas y tira de k3-256k para el trabajo rutinario, porque k3 consume más o menos el doble de cuota'],
            ['4 o más sesiones', 'Los planes nuevos no tienen límite semanal, así que el pozo mensual de créditos pasa a ser el techo real', 'Los modelos Highspeed consumen de 2x (K3.1 Pro) a 3x (K2.7 Code) la cuota, así que déjalos fuera del trabajo en volumen'],
          ],
          caption: 'Kimi no publica un número fijo de sesiones por nivel. Esta es la forma de los límites documentada a 31 de octubre de 2026; los planes antiguos conservan además un límite semanal, y la vista en vivo de /usage en tu cuenta es la autoridad final.',
        },
        {
          type: 'paragraph',
          text: 'Como el consumo se mide en créditos y no en peticiones, subir de nivel te compra un pozo más grande, no un número documentado de agentes en paralelo. El montaje práctico está en <a href="/es/guias/ejecutar-multiples-sesiones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Kimi Code</a>, y el flujo completo en <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes Kimi Code</a>.',
        },
      ],
    },
    {
      id: 'modelo-actual',
      title: 'Modelos actuales de Kimi Code y ventanas de contexto',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de modelos de Kimi Code</a> lista ahora seis identificadores de modelo. K3.1 Pro (<code>k3.1-pro</code>), K3 (<code>k3</code>) y K2.8 Preview (<code>kimi-for-coding</code>) están disponibles desde Plus, y Pro o superior tiene hasta 1M de contexto en K3.1 Pro y K3. La opción <code>k3-256k</code> limita el contexto a 256K y consume menos cuota, mientras que <code>k3</code> consume más o menos el doble.',
        },
        {
          type: 'paragraph',
          text: 'Los modelos Highspeed requieren Pro o superior en los planes nuevos. <code>k3.1-pro-highspeed</code> va unas 2 o 3 veces más rápido y consume más o menos el doble de cuota; <code>kimi-for-coding-highspeed</code>, que es K2.7 Code Highspeed, va unas 5 o 6 veces más rápido y consume unas tres veces más. K3.1 Pro rechaza las peticiones con el razonamiento desactivado, mientras que la serie K3 y K2.8 Preview las pasan a K2.8 Preview sin razonamiento.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'K3.1 Pro, K3, K2.8 Preview y K2.7 Code tienen ventanas de contexto, permisos de plan y consumos de cuota distintos. Registra el identificador de modelo usado por cada agente antes de comparar coste o consumo de cuota.',
        },
      ],
    },
    {
      id: 'pago-por-token',
      title: 'Precio de la API de Kimi K3.1 Pro, K3 y K2.7 Code',
      content: [
        {
          type: 'paragraph',
          text: 'Si prefieres pagar por uso, la <a href="https://platform.kimi.com/docs/pricing/chat" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de precios de la API de Kimi</a> muestra estas tarifas a 31 de octubre de 2026:',
        },
        {
          type: 'list',
          items: [
            '<strong>K3.1 Pro:</strong> 1,30 ¥ por acierto de caché, 13 ¥ por entrada y 68 ¥ por salida, por millón de tokens; contexto de hasta 1M',
            '<strong>K3:</strong> 2 ¥ por acierto de caché, 20 ¥ por entrada y 100 ¥ por salida, por millón de tokens; contexto de hasta 1M',
            '<strong>K2.7 Code:</strong> 1,30 ¥ por acierto de caché, 6,50 ¥ por entrada y 27 ¥ por salida, por millón de tokens; contexto de 256K. Kimi dice que los modelos de la serie K2 dejan de admitir registros nuevos el 31 de octubre de 2026 y está previsto retirarlos a finales de diciembre',
          ],
        },
        {
          type: 'paragraph',
          text: 'La caché automática abarata el contexto repetido de un repositorio; en la serie K3 las escrituras de caché se facturan aparte, y K3.1 Pro y K3 admiten la Batch API al 60% del precio estándar. La API no tiene un techo mensual fijo, así que configura presupuestos en la plataforma antes de dejar un agente autónomo sin supervisión.',
        },
        {
          type: 'paragraph',
          text: 'Si quieres dirigir específicamente el modelo K3 mediante un cliente compatible con Anthropic, consulta <a href="/es/guias/kimi-k3-con-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K3 con Claude Code</a>. Su modelo, límites y precios no deben mezclarse con las cifras de K2.7 Code anteriores.',
        },
      ],
    },
    {
      id: 'comparar-con-otros-agentes',
      title: 'Cómo se compara el precio de Kimi Code con las demás CLI de agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Un precio solo significa algo al lado de las alternativas. Kimi publica en yuanes, entra por abajo, tiene un CLI open source que puedes instalar antes de pagar nada y es de los pocos que nunca publica un número fijo de peticiones. Esta es toda la categoría, una línea por agente, revisada el mismo día.',
        },
        {
          type: 'table',
          headers: ['Agente', 'Nivel gratuito', 'Pago más barato', 'Nivel individual más alto', 'Cómo se factura'],
          rows: [
            ['Claude Code', 'No (el plan Free no incluye Claude Code)', 'Pro, 20 $/mes', 'Ultra, 200 $/mes', 'Plan de Claude con límites de 5 horas y semanales (las cuentas Ultra verificadas no tienen límite de 5 horas); tokens de API opcionales'],
            ['Codex CLI', 'Limitado', 'Go, 8 $/mes', 'Pro, 500 $/mes', 'Plan de ChatGPT compartido entre la CLI, la web y el IDE; tokens de API opcionales'],
            ['Kimi Code', 'La CLI es gratis, el uso del modelo no', 'Plus, 99 ¥/mes', 'Ultra, 1.399 ¥/mes', 'Créditos de membresía más un límite de 5 horas en Kimi Code; API por token'],
            ['OpenCode', 'La CLI es gratis y de código abierto', 'OpenCode Go, 10 $/mes', 'Go Plus, 40 $/mes', 'Tu propia clave de proveedor, créditos prepago de Console por token o una suscripción Go'],
            ['Antigravity', 'Sí, con límites de frecuencia semanales', 'Google AI Plus, 4,99 $/mes', 'Google AI Ultra 20x, 199,99 $/mes', 'Plan de Google AI con límites de frecuencia y créditos'],
            ['Grok Build', 'Sí, con uso limitado', 'X Subscription Plus, 8 $/mes', 'X Subscription Ultra, 200 $/mes', 'Bolsa de X Subscription compartida con Grok y Cursor; API por token'],
            ['Cursor Agent', 'Free, uso limitado', 'Plus, 8 $/mes', 'Ultra, 200 $/mes', 'Bolsa semanal para los modelos de Cursor; los modelos de terceros se cobran por uso'],
          ],
          caption: 'Niveles de entrada y superiores de cada CLI de agente, verificados el 31 de octubre de 2026. Los precios cambian a menudo; cada guía enlazada lleva su propia fecha de verificación.',
        },
        {
          type: 'paragraph',
          text: 'Cada fila tiene su propia guía con la escalera completa y la mecánica de cuotas detrás: <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/es/guias/precios-y-acceso-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> y <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent</a>.',
        },
      ],
    },
    {
      id: 'nivel-gratuito',
      title: '¿Kimi Code es gratis?',
      content: [
        {
          type: 'paragraph',
          text: 'El CLI de Kimi Code es open source bajo licencia MIT y se instala gratis. El uso del modelo se factura aparte. La membresía más barata, Go por 49 ¥ al mes, no incluye Kimi Code, así que para programar se empieza en Plus por 99 ¥, y la API cobra por token.',
        },
        {
          type: 'paragraph',
          text: 'Kimi puede ofrecer pruebas o promociones, pero cambian y no son un presupuesto de producción fiable. Confirma cualquier cuota gratuita dentro de tu cuenta en vez de asumir que una oferta antigua de Adagio sigue activa.',
        },
      ],
    },
    {
      id: 'vigilar-uso',
      title: 'Vigilar el uso de Kimi mientras trabajan los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Los límites se convierten en un problema operativo cuando varios agentes los comparten: normalmente descubres el muro cuando el trabajo se detiene. <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> muestra el uso del proveedor junto a los terminales paralelos para que puedas redistribuir el trabajo antes de que una sesión se pare.',
        },
        {
          type: 'paragraph',
          text: 'Esto encaja con la <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes Kimi Code</a>: usa Kimi donde encaje y conserva otro proveedor para desbordamiento. Si Cursor es la alternativa, compara su suscripción en la guía de <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">precios de Cursor CLI</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Kimi Code es gratis?',
      answer: 'El CLI de Kimi Code es gratis y open source. El uso del modelo se factura aparte mediante una membresía Kimi o la API. A 31 de octubre de 2026, la membresía más barata con Kimi Code es Plus por 99 ¥ al mes; Go por 49 ¥ no lo incluye.',
    },
    {
      question: '¿Cuánto cuesta Kimi Code al mes?',
      answer: 'El centro de ayuda oficial muestra Plus por 99 ¥, Pro por 199 ¥, Max por 699 ¥ y Ultra por 1.399 ¥ al mes, todos con Kimi Code, y Go por 49 ¥ sin él. El pago anual rebaja cada uno, por ejemplo Plus a 79 ¥ al mes. Consulta tu cuenta para ver la moneda local y los impuestos.',
    },
    {
      question: '¿Qué plan de Kimi incluye Kimi Code?',
      answer: 'Plus, Pro, Max y Ultra incluyen Kimi Code; Go no. La documentación de Kimi Code concede a Pro y niveles superiores el contexto de hasta 1M y los modelos Highspeed. Los planes antiguos desde Andante conservan Kimi Code para quien ya estaba suscrito.',
    },
    {
      question: '¿Cuándo se reinician los límites de Kimi Code?',
      answer: 'Los créditos de la membresía se renuevan en cada ciclo de facturación y no se acumulan. En los planes nuevos Kimi Code tiene un límite móvil de 5 horas y ningún límite semanal; los planes antiguos conservan también el semanal. Consulta /usage dentro de Kimi Code para ver los límites y la capacidad restante de tu cuenta.',
    },
    {
      question: '¿Qué modelo usa Kimi Code?',
      answer: 'Kimi Code lista K3.1 Pro, K3, una variante de K3 con 256K y K2.8 Preview (kimi-for-coding) desde Plus, más variantes Highspeed desde Pro. El nivel del plan controla los modelos Highspeed y el contexto máximo.',
    },
    {
      question: '¿Cuánto cuestan Kimi K3 y K2.7 Code mediante la API?',
      answer: 'La API de Kimi muestra K3 por 2 ¥ de acierto de caché, 20 ¥ de entrada y 100 ¥ de salida por millón de tokens, y el nuevo K3.1 Pro por 1,30 ¥, 13 ¥ y 68 ¥. K2.7 Code cuesta 1,30 ¥, 6,50 ¥ y 27 ¥, pero la serie K2 deja de admitir registros nuevos el 31 de octubre de 2026.',
    },
    {
      question: '¿Qué es el coding plan de Kimi?',
      answer: 'No hay un plan de programación aparte que comprar. Kimi Code viene incluido en cuatro de los cinco niveles de membresía: Plus por 99 ¥/mes, Pro por 199 ¥, Max por 699 ¥ y Ultra por 1.399 ¥. Go por 49 ¥ lo deja fuera, y Pro o superior desbloquea el contexto de hasta 1M en Kimi Code.',
    },
    {
      question: '¿Qué es el plan por tokens de Kimi?',
      answer: 'Es la vía de pago por uso mediante la API de Kimi, que factura por token en vez de por membresía. A 31 de octubre de 2026, K3.1 Pro cuesta 1,30 ¥ de acierto de caché, 13 ¥ de entrada y 68 ¥ de salida por millón de tokens, y K3 cuesta 2 ¥, 20 ¥ y 100 ¥. No tiene techo mensual fijo, así que configura antes un presupuesto en la plataforma.',
    },
    {
      question: '¿Qué suscripción de Kimi necesito para Kimi Code?',
      answer: 'Plus por 99 ¥ o superior. Plus te da K3.1 Pro, K3 y K2.8 Preview, y Pro por 199 ¥, Max por 699 ¥ y Ultra por 1.399 ¥ añaden hasta 1M de contexto y los modelos Highspeed. Go por 49 ¥ no incluye Kimi Code. Kimi no publica cuántas sesiones en paralelo aguanta cada nivel, así que consulta /usage en tu cuenta.',
    },
    {
      question: '¿Cuáles son los límites de Kimi Moderato?',
      answer: 'Moderato es ahora un plan antiguo: quien ya lo tiene puede mantenerlo y renovarlo, y conserva un límite de 5 horas y otro semanal en Kimi Code. El plan actual del mismo precio, 99 ¥, es Plus, que tiene límite de 5 horas y ninguno semanal. Kimi no publica un número de peticiones para ninguno de los dos, así que escribe /usage dentro de Kimi Code para ver cómo va tu cuenta.',
    },
  ],
}

export default guide
