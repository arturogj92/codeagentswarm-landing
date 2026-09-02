import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-kimi-code',
    locale: 'es',
    title: 'Precios de Kimi Code: cada plan, los límites y qué cuestan los agentes en paralelo',
    metaTitle: 'Precios de Kimi Code 2026: coding plan, límites y API',
    metaDescription: 'Andante 49 ¥, Moderato 99 ¥, Allegretto 199 ¥, Allegro 699 ¥ y API por token. Y lo que la tabla oficial no dice: qué pasa con varios agentes a la vez.',
    intro: `A 25 de agosto de 2026, la tabla oficial de Kimi tiene cuatro niveles: Andante por 49 ¥ al mes, Moderato por 99 ¥, Allegretto por 199 ¥ y Allegro por 699 ¥. Todos incluyen Kimi Code. K3 está disponible desde Moderato, mientras que Allegretto y los niveles superiores desbloquean hasta un millón de tokens de contexto en Kimi Code.

También existe la vía de pago por token mediante Kimi Open Platform. Sus tarifas públicas actuales para K3 son 2 ¥ por entrada en caché, 20 ¥ por entrada sin caché y 100 ¥ por salida, todo por millón de tokens. K2.7 Code cuesta 1,30 ¥, 6,50 ¥ y 27 ¥, respectivamente.

Esta guía separa ambos sistemas de facturación y enlaza cada cifra cambiante con la documentación oficial de Kimi. Los precios pueden cambiar: usa la fecha anterior y confirma el total en el checkout antes de pagar.`,
    ctaText: 'Ejecutar agentes de Kimi Code contra límites de uso estresa menos cuando puedes verlos. CodeAgentSwarm muestra el uso de Kimi junto al del resto de tus agentes.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'Precios'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-09-01',
    alternateSlug: 'kimi-code-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Planes de Kimi Code de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://www.kimi.com/en/help/membership/membership-overview" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de membresías de Kimi</a> muestra estos cuatro planes de pago a 25 de agosto de 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio mensual publicado', 'Posición', 'Kimi Code'],
          rows: [
            ['Andante', '49 ¥', 'Uso cotidiano', 'Incluido; K2.7 Code'],
            ['Moderato', '99 ¥', 'Productividad', 'Incluido; K3 hasta 256K'],
            ['Allegretto', '199 ¥', 'Profesional', 'Incluido; K3 hasta 1M'],
            ['Allegro', '699 ¥', 'Uso intensivo', 'Incluido; K3 hasta 1M'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Los créditos del plan se consumen según el uso real de tokens. Kimi Code, Kimi Work, Deep Research, Slides, webs y las demás funciones consumen un mismo pozo mensual, por lo que el uso intenso fuera de Kimi Code puede reducir lo que queda para programar.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El centro de ayuda oficial publica estos precios en yuanes. Kimi puede adaptar el checkout al mercado, así que confirma en tu cuenta la moneda, los impuestos y el descuento anual antes de pagar.',
        },
      ],
    },
    {
      id: 'como-funcionan-los-limites',
      title: 'Cómo funcionan los límites de Kimi Code',
      content: [
        {
          type: 'paragraph',
          text: 'Hay dos contadores importantes. Los créditos de la membresía se reinician al empezar cada ciclo mensual de facturación. Kimi Code tiene además una <strong>asignación semanal y un límite propio de 5 horas</strong>. Ese límite de Kimi Code no consume los límites de otras funciones, pero el pozo de créditos base sí es compartido.',
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
          text: 'Kimi no publica un número de sesiones por nivel, así que nadie te puede decir honestamente que Moderato equivalga a una cantidad fija de agentes. Lo que Kimi sí publica es la forma de los límites: un pozo mensual de créditos compartido con las demás funciones, una asignación semanal de Kimi Code y un límite de 5 horas. Con eso basta para saber contra qué techo chocas primero.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Qué esperar', 'Qué vigilar'],
          rows: [
            ['1 sesión', 'El límite de 5 horas rara vez se cruza en tu camino', 'El pozo mensual de créditos, porque Kimi Work, Deep Research y Slides beben del mismo'],
            ['2 o 3 sesiones', 'El límite de 5 horas empieza a apretar antes de que acabe el mes, ya que los terminales en paralelo llegan antes que uno solo', 'Consulta /usage entre tareas y tira de la opción k3-256k para el trabajo rutinario, que consume menos cuota'],
            ['4 o más sesiones', 'Cuenta con que la asignación semanal de Kimi Code pese tanto como la de 5 horas', 'La variante HighSpeed de K2.7 Code consume unas tres veces más cuota, así que déjala fuera del trabajo en volumen'],
          ],
          caption: 'Kimi no publica un número fijo de sesiones por nivel. Esta es la forma de los límites documentada a 25 de agosto de 2026; la vista en vivo de /usage en tu cuenta es la autoridad final.',
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
          text: 'La <a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de modelos de Kimi Code</a> muestra ahora K3 como modelo predeterminado. Moderato incluye K3 con hasta 256K de contexto; Allegretto y los niveles superiores desbloquean hasta 1M. La opción <code>k3-256k</code> consume menos cuota en el trabajo cotidiano.',
        },
        {
          type: 'paragraph',
          text: 'K2.7 Code sigue disponible para todos los miembros de pago bajo <code>kimi-for-coding</code>, con 262.144 tokens de contexto. Su variante HighSpeed requiere Allegretto o superior y consume unas tres veces más cuota. Desactivar el razonamiento dirige las peticiones de K3 o K2.7 a K2.6.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'K3 y K2.7 Code tienen ventanas de contexto, permisos de plan y precios por token distintos. Registra el identificador de modelo usado por cada agente antes de comparar coste o consumo de cuota.',
        },
      ],
    },
    {
      id: 'pago-por-token',
      title: 'Precio de la API de Kimi K3 y K2.7 Code',
      content: [
        {
          type: 'paragraph',
          text: 'Si prefieres pagar por uso, Kimi Open Platform publica estas tarifas a 25 de agosto de 2026:',
        },
        {
          type: 'list',
          items: [
            '<strong>K3:</strong> 2 ¥ por entrada en caché, 20 ¥ por entrada sin caché y 100 ¥ por salida, por millón de tokens; contexto de hasta 1M',
            '<strong>K2.7 Code:</strong> 1,30 ¥ por entrada en caché, 6,50 ¥ por entrada sin caché y 27 ¥ por salida, por millón de tokens; contexto de 256K',
          ],
        },
        {
          type: 'paragraph',
          text: 'La caché automática abarata el contexto repetido de un repositorio. La API no tiene un techo mensual fijo, así que configura presupuestos en la plataforma antes de dejar un agente autónomo sin supervisión.',
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
            ['Claude Code', 'No (el plan Free no incluye Claude Code)', 'Pro, 20 $/mes', 'Max 20x, 200 $/mes', 'Suscripción con ventanas de 5 horas y semanales; tokens de API opcionales'],
            ['Codex CLI', 'Limitado', 'Go, 8 $/mes', 'Pro, 200 $/mes', 'Suscripción de ChatGPT compartida con la web y el IDE; tokens de API opcionales'],
            ['Kimi Code', 'El CLI es gratis, el uso del modelo no', 'Andante, 49 ¥/mes', 'Allegro, 699 ¥/mes', 'Membresía con límites semanales y de 5 horas; API por token'],
            ['OpenCode', 'El CLI es gratis y de código abierto', 'Ninguno, pago por uso', 'Ninguno', 'Tu propia clave de proveedor, o OpenCode Zen prepago por token'],
            ['Antigravity', 'Sí, con límites de uso semanales', 'Google AI Plus, unos 8 $/mes', 'Google AI Ultra 20x, 200 $/mes', 'Plan de Google AI con límites de uso y créditos'],
            ['Grok Build', 'Sí, uso limitado', 'SuperGrok, 30 $/mes', 'SuperGrok Plus, 100 $/mes', 'Límites de uso del plan de xAI; API por token'],
            ['Cursor Agent', 'Hobby, gratis', 'Pro, 20 $/mes', 'Ultra, 200 $/mes', 'Plan de Cursor con bolsas de uso por modelo'],
          ],
          caption: 'Niveles de entrada y máximos de cada CLI de agente, todos verificados el 25 de agosto de 2026. Los precios cambian a menudo; cada guía enlazada lleva su propia fecha de verificación.',
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
          text: 'El CLI de Kimi Code es open source bajo licencia MIT y se instala gratis. El uso del modelo se factura aparte. La tabla oficial actual de membresías empieza en Andante por 49 ¥ al mes, y la API cobra por token.',
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
      answer: 'El CLI de Kimi Code es gratis y open source. El uso del modelo se factura aparte mediante una membresía Kimi o la API. A 25 de agosto de 2026, la tabla oficial empieza en Andante por 49 ¥ al mes.',
    },
    {
      question: '¿Cuánto cuesta Kimi Code al mes?',
      answer: 'El centro de ayuda oficial muestra Andante por 49 ¥, Moderato por 99 ¥, Allegretto por 199 ¥ y Allegro por 699 ¥ al mes. Consulta tu cuenta para ver la moneda local, los impuestos y el precio anual.',
    },
    {
      question: '¿Qué plan de Kimi incluye Kimi Code?',
      answer: 'Los cuatro niveles de pago incluyen Kimi Code. K3 está disponible desde Moderato. La documentación de Kimi Code concede el contexto K3 de hasta 1M a Allegretto y niveles superiores.',
    },
    {
      question: '¿Cuándo se reinician los límites de Kimi Code?',
      answer: 'Los créditos de la membresía se reinician al empezar cada ciclo mensual de facturación. Kimi Code tiene además una asignación semanal y un límite de 5 horas. Consulta /usage dentro de Kimi Code para ver los límites y la capacidad restante de tu cuenta.',
    },
    {
      question: '¿Qué modelo usa Kimi Code?',
      answer: 'K3 es el modelo predeterminado actual de Kimi Code. K2.7 Code sigue disponible como kimi-for-coding con 262.144 tokens de contexto. El nivel del plan controla el acceso a K3 y su contexto máximo.',
    },
    {
      question: '¿Cuánto cuestan Kimi K3 y K2.7 Code mediante la API?',
      answer: 'Kimi Open Platform muestra K3 por 2 ¥ de entrada en caché, 20 ¥ de entrada y 100 ¥ de salida por millón de tokens. K2.7 Code cuesta 1,30 ¥, 6,50 ¥ y 27 ¥.',
    },
    {
      question: '¿Qué es el coding plan de Kimi?',
      answer: 'No hay un plan de programación aparte que comprar. Kimi Code viene incluido en los cuatro niveles de membresía: Andante por 49 ¥/mes, Moderato por 99 ¥, Allegretto por 199 ¥ y Allegro por 699 ¥. K3 está disponible desde Moderato, y Allegretto o superior desbloquea el contexto de hasta 1M en Kimi Code.',
    },
    {
      question: '¿Qué es el plan por tokens de Kimi?',
      answer: 'Es la vía de pago por uso mediante Kimi Open Platform, que factura por token en vez de por membresía. A 25 de agosto de 2026, K3 cuesta 2 ¥ de entrada en caché, 20 ¥ de entrada sin caché y 100 ¥ de salida por millón de tokens, y K2.7 Code cuesta 1,30 ¥, 6,50 ¥ y 27 ¥. No tiene techo mensual fijo, así que configura antes un presupuesto en la plataforma.',
    },
    {
      question: '¿Qué suscripción de Kimi necesito para Kimi Code?',
      answer: 'Cualquiera de los cuatro niveles de pago lo incluye. Andante por 49 ¥ te da K2.7 Code, Moderato por 99 ¥ añade K3 con hasta 256K de contexto, y Allegretto por 199 ¥ o Allegro por 699 ¥ desbloquean K3 hasta 1M. Kimi no publica cuántas sesiones en paralelo aguanta cada nivel, así que consulta /usage en tu cuenta.',
    },
    {
      question: '¿Cuáles son los límites de Kimi Moderato?',
      answer: 'Moderato cuesta 99 ¥ al mes e incluye Kimi Code con K3 hasta 256K de contexto. Como todos los niveles, se mide con un pozo mensual de créditos compartido con las demás funciones, más una asignación semanal de Kimi Code y un límite de 5 horas. Kimi no publica un número de peticiones, así que escribe /usage dentro de Kimi Code para ver cómo va tu cuenta.',
    },
  ],
}

export default guide
