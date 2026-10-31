import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-opencode',
    locale: 'es',
    title: 'Planes y precios de OpenCode: CLI gratis, plan Go opcional y lo que cuestan los agentes en paralelo',
    metaTitle: 'Precios de OpenCode 2026: CLI gratis, Zen, BYOK y coste real',
    metaDescription: 'La CLI de OpenCode es gratis y abierta. Go cuesta 10 o 40 $ al mes y los créditos de Zen se pagan por token. Y lo que hacen varios agentes con tu factura.',
    intro: `OpenCode es el raro de la categoría, y la respuesta corta es de verdad corta: <strong>la CLI es gratis y la suscripción es opcional</strong>. Puedes traer tu propia clave de API de cualquier proveedor, y entonces ese proveedor te factura directamente y OpenCode no se lleva nada. Puedes comprar créditos prepago en el servicio de pago por uso de OpenCode, que su documentación llama ahora OpenCode Console (la antigua documentación de Zen redirige ahí). O, a 31 de octubre de 2026, puedes suscribirte a <a href="https://opencode.ai/docs/go/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode Go</a> por 10 o 40 $ al mes.

Con tu propia clave o con créditos de Console no hay ventana de 5 horas, ni tope semanal, ni nivel que se te quede pequeño. Tampoco hay techo: OpenCode nunca te va a parar porque se haya agotado una cuota, solo porque se acabe el saldo. Go es la excepción, con límites de 5 horas, semanales y mensuales por modelo.

Esta guía cubre lo que cuesta de verdad cada vía, los modelos gratuitos que lleva Console, el número que decide tu factura y el intercambio honesto frente a una CLI de suscripción como <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>.`,
    ctaText: 'Pagar por uso significa que nada frena a un agente desbocado salvo que tú lo estés mirando. CodeAgentSwarm mantiene visibles todas tus sesiones de OpenCode en un solo espacio, así siempre sabes qué está corriendo y desde cuándo.',
    ctaAgent: 'opencode',
    highlightedWords: ['OpenCode', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'opencode-plans-and-pricing',
  },
  sections: [
    {
      id: 'dos-vias',
      title: 'Tres vías, y solo una es una suscripción',
      content: [
        {
          type: 'paragraph',
          text: 'Todo el precio de OpenCode se reduce a cuál de estas tres eliges, y puedes cambiar de una a otra por proyecto o por sesión.',
        },
        {
          type: 'table',
          headers: ['Vía', 'Qué pagas', 'Quién te factura', 'Cuota mensual'],
          rows: [
            ['Tu propia clave (BYOK)', 'Las tarifas de API normales de tu proveedor', 'Anthropic, OpenAI, Google, quien sea', 'Ninguna'],
            ['OpenCode Console (antes Zen)', 'Tarifas por token sobre créditos prepago', 'OpenCode, a precio de coste más una comisión de pago', 'Ninguna'],
            ['OpenCode Go', 'Go 10 $/mes, Go Plus 40 $/mes, Go Teams 20 $ por miembro', 'OpenCode', 'Sí, con límites por modelo'],
          ],
          caption: 'Vías de pago de OpenCode según su documentación oficial, verificadas el 31 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: '<strong>BYOK</strong> es la forma más pura: OpenCode es solo un cliente. Lo apuntas a una clave de Anthropic o de OpenAI que ya tengas y los tokens los factura directamente ese proveedor, exactamente igual que si hubieras llamado tú a su API. OpenCode no está en la ruta del pago y no se lleva comisión.',
        },
        {
          type: 'paragraph',
          text: '<strong>Console</strong>, el servicio que OpenCode llamaba Zen, es una pasarela curada. Añades créditos, usas los modelos que quieras a tarifas por token publicadas y puedes definir una regla de recarga automática. Funciona dentro de OpenCode como cualquier otro proveedor: ejecutas <code>/connect</code> y eliges el proveedor de pago por uso de OpenCode, así que pasarte a ella es un cambio de configuración, no una migración.',
        },
        {
          type: 'paragraph',
          text: '<strong>Go</strong> es la suscripción opcional. Te da una clave de API para una lista de modelos de programación, sobre todo abiertos, como GLM, Kimi, Qwen, DeepSeek y MiniMax, más Grok 4.7, GPT 6 Luna, Claude Haiku 5.5 y Gemini 4 Argon. Cada modelo tiene un límite mensual en dólares, y puedes gastar el 20% cada 5 horas y el 50% cada semana.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si ya pagas una clave de API de Anthropic o de OpenAI para otra cosa, BYOK no te cuesta nada extra por probar. Eso convierte a OpenCode en el agente más barato de evaluar de toda la categoría: puedes tenerlo funcionando en minutos sin crear una relación de facturación nueva.',
        },
      ],
    },
    {
      id: 'precios-de-zen',
      title: 'Lo que cuesta de verdad OpenCode Zen, ahora Console',
      content: [
        {
          type: 'paragraph',
          text: 'Console publica tarifas por millón de tokens separadas en entrada, salida, lecturas de caché y escrituras de caché. La horquilla del catálogo es enorme, y eso es lo más útil que hay que entender. A 31 de octubre de 2026:',
        },
        {
          type: 'table',
          headers: ['Modelo', 'Entrada / 1M', 'Salida / 1M'],
          rows: [
            ['Big Pickle, GLM-5.3-Flash Free y otros modelos gratuitos temporales', '0,00 $', '0,00 $'],
            ['GPT 6 Luna', '0,10 $', '0,50 $'],
            ['Claude Sonnet 5.5', '2,00 $', '10,00 $'],
            ['GPT 5.5 Pro', '30,00 $', '180,00 $'],
          ],
          caption: 'Una muestra de las tarifas de OpenCode Console, verificada el 31 de octubre de 2026. El catálogo completo está en la página de modelos de Console de la documentación de OpenCode.',
        },
        {
          type: 'paragraph',
          text: 'Vuelve a leer esa tabla, porque la horquilla es justo el asunto: <strong>lo más caro del catálogo cuesta 360 veces el nivel económico en salida</strong>. En una CLI de suscripción, elegir modelo cambia lo rápido que quemas una asignación fija. Aquí cambia tu factura directamente y por dos órdenes de magnitud. Escoger el modelo adecuado para cada tarea no es una microoptimización en Zen, es toda la historia del coste.',
        },
        {
          type: 'paragraph',
          text: 'Console ofrece además modelos publicados con coste cero en entrada y salida. OpenCode marca varios como ofertas por tiempo limitado, así que comprueba el catálogo actual antes de depender de uno en un flujo duradero.',
        },
        {
          type: 'paragraph',
          text: 'Console vende <strong>a precio de coste</strong>, con margen solo para cubrir el cobro: cada compra de créditos suma una comisión del 4,6% más 0,31 $, así que una recarga de 50 $ cuesta 52,61 $. Eso es una comisión de pago, no de servicio, y es el argumento para recargar cantidades más grandes con menos frecuencia en vez de ir haciendo recargas pequeñas.',
        },
      ],
    },
    {
      id: 'recarga-automatica',
      title: 'La regla de recarga automática, y cómo configurarla',
      content: [
        {
          type: 'paragraph',
          text: 'La recarga automática compra créditos cuando el saldo baja, con un umbral y un importe que defines en Settings, Billing. Es cómodo y es también el mecanismo por el que un agente que se porta mal se gasta dinero real por la noche sin que nadie lo vea.',
        },
        {
          type: 'paragraph',
          text: 'La recarga automática es una regla que añades y que puedes quitar. <strong>Sin ella, tu saldo se convierte en un límite de gasto duro</strong>: cuando llega a cero, las peticiones de pago fallan y el saldo nunca queda en negativo. Es lo más parecido que tiene OpenCode a la seguridad de una suscripción: el agente se para cuando se acaba el dinero, igual que al chocar con un límite semanal, salvo que el número lo has elegido tú.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Antes de dejar un agente de OpenCode corriendo solo por la noche o en CI, decide a propósito qué pasa cuando se vacíe el saldo. Con recarga automática activada la ejecución continúa y sigue cobrando; desactivada, se para. Ninguna de las dos está mal, pero enterarte de cuál tenías leyendo un extracto bancario es una mala forma de aprenderlo.',
        },
        {
          type: 'paragraph',
          text: 'Este es el contrapeso honesto al "no hay muro de cuota". Una suscripción te protege de tus propios agentes. El pago por uso no, salvo que te construyas tú la protección.',
        },
      ],
    },
    {
      id: 'agentes-paralelos',
      title: 'Qué le hace al coste ejecutar varias sesiones de OpenCode a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Con tu propia clave o con créditos de Console, OpenCode factura por token, así que no hay una asignación compartida que repartir ni un muro contra el que chocar. Go es la excepción: sus límites por modelo funcionan como una cuota de suscripción, así que varias sesiones con el mismo modelo de Go llegan antes a su parte de 5 horas. Dos agentes trabajando a la vez consumen tokens a la vez, y tu gasto en una hora sigue al número de agentes que están ocupados de verdad, no al número de terminales que tengas abiertos.',
        },
        {
          type: 'paragraph',
          text: 'Eso hace que un flujo en paralelo sea fácil de razonar y fácil de subestimar. El modelo importa más que la cantidad: tres sesiones con un modelo económico pueden costar menos que una sola con un modelo de frontera, vista la horquilla del catálogo de Console. Lo que sí cambia con la cantidad es lo rápido que se vacía el saldo, y por tanto cada cuánto salta la recarga automática.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Qué esperar', 'Qué vigilar'],
          rows: [
            ['1', 'El gasto sigue la tarifa por token del modelo que hayas elegido, y nada más.', 'La elección de modelo. La salida en Console va de 0 $ a 180 $ por millón de tokens.'],
            ['2 a 3', 'Entre dos y tres veces el gasto en tokens de una sola sesión en el mismo tiempo, porque cada agente lee ficheros, razona y llama a herramientas por su cuenta.', 'Tu umbral de recarga llega antes, y cada recarga suma la comisión del 4,6% más 0,31 $. En Go, la parte de 5 horas del límite de cada modelo también llega antes.'],
            ['4 o más', 'El gasto escala más o menos con el número de agentes ocupados. No hay cuota que agotar, así que nada para la ejecución salvo el saldo.', 'Desactiva la recarga automática antes de cualquier ejecución sin supervisión para que el saldo sea un límite duro.'],
          ],
          caption: 'Es una regla aproximada, no una tarifa publicada. OpenCode no cobra por sesión, así que el número real depende del modelo y del trabajo.',
        },
        {
          type: 'paragraph',
          text: 'La parte práctica está en <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de OpenCode</a>, y la mecánica de tener varias sesiones a la vez está en <a href="/es/guias/ejecutar-multiples-sesiones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo ejecutar varias sesiones de OpenCode</a>.',
        },
      ],
    },
    {
      id: 'contra-suscripcion',
      title: 'Pago por uso contra suscripción: cuándo gana cada uno',
      content: [
        {
          type: 'paragraph',
          text: 'La comparación que se suele hacer es el gasto mensual total, y eso es solo la mitad. La diferencia de verdad está en <strong>qué pasa en los extremos</strong>.',
        },
        {
          type: 'paragraph',
          text: 'Una suscripción empieza como un coste fijo con capacidad incluida. Muchos proveedores ya permiten activar exceso de pago, así que el techo es opcional y la factura final puede dejar de ser fija. El pago por uso no tiene suelo mensual: una semana sin trabajar cuesta cero y una semana de refactorización dura cuesta lo que cueste. OpenCode Go ofrece ahora también la opción de suscripción dentro de OpenCode, desde 10 $ al mes.',
        },
        {
          type: 'paragraph',
          text: 'Eso encaja bastante bien con cómo trabaja la gente de verdad:',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabajo a ráfagas u ocasional</strong>: gana OpenCode. Dos semanas intensas por trimestre con suscripción significa pagar también las diez tranquilas.',
            '<strong>Trabajo diario constante</strong>: gana la suscripción. El coste predecible vale más que el ahorro teórico, y dejas de pensar en ello.',
            '<strong>Automatización sin supervisión</strong>: gana el pago por uso, porque un pipeline de CI que muere por una cuota personal es peor que uno que cuesta unos dólares.',
            '<strong>Aprender y evaluar</strong>: gana OpenCode de calle, gracias a los modelos gratuitos y a BYOK.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El montaje que mejor funciona en la práctica es no elegir. Mantén una suscripción como caballo de batalla y OpenCode al lado para el desbordamiento, para las semanas en que tocas el tope semanal y para la automatización. Dos proveedores en dos contadores separados significan que casi nunca estás parado del todo, que es el argumento que desarrolla <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de OpenCode</a>.',
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
          text: 'Cada cifra de esa tabla tiene su propia página con la lista completa de niveles y la letra pequeña: <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/es/guias/precios-y-acceso-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> y <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI</a>.',
        },
      ],
    },
    {
      id: 'es-gratis',
      title: '¿OpenCode es gratis? Sí, de verdad',
      content: [
        {
          type: 'paragraph',
          text: 'La CLI es gratuita y de código abierto, sin edición de pago, sin funciones bajo llave y sin recuento de asientos. Esto no es el "nivel gratuito" que usan los demás proveedores, donde lo gratis es una versión recortada de lo de pago. No existe una versión de pago de OpenCode.',
        },
        {
          type: 'paragraph',
          text: 'Lo que cuesta dinero es el modelo que va detrás. Console mantiene ahora una vía sin coste mediante modelos gratuitos temporales, pero el catálogo puede cambiar.',
        },
        {
          type: 'paragraph',
          text: 'El presupuesto realista: evaluar OpenCode cuesta 0 $, usarlo en serio cuesta lo que cueste tu consumo de tokens, y no hay suelo mensual. Para un uso diario normal de un solo agente con un modelo de gama media, eso queda bastante por debajo de una suscripción de 20 $. Para trabajo pesado de agentes en paralelo con un modelo de frontera, queda bastante por encima.',
        },
      ],
    },
    {
      id: 'controlar-el-gasto',
      title: 'Mantener la factura honesta mientras trabajan los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Sin muro de cuota, lo único que hay entre tú y una sorpresa es la visibilidad. Tres costumbres hacen casi todo el trabajo:',
        },
        {
          type: 'list',
          items: [
            '<strong>Ajusta el modelo a la tarea.</strong> La horquilla de 360x en salida del catálogo de Console convierte el trabajo rutinario con un modelo de frontera en el error más caro que tienes a mano.',
            '<strong>Usa el saldo como límite.</strong> Desactiva la recarga automática antes de cualquier ejecución sin supervisión, para que un saldo vacío pare al agente en vez de rellenarse solo.',
            '<strong>Mira qué está corriendo de verdad.</strong> Los agentes en paralelo multiplican el gasto de forma lineal, y un agente atascado en un bucle tiene exactamente la misma pinta que un agente trabajando duro.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Ahí es donde ayuda un espacio de trabajo. <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, la app de escritorio para ejecutar varios agentes de IA de terminal en paralelo, mantiene visibles a la vez todas las sesiones de OpenCode con su estado y su actividad actual, así que una sesión que lleva cuarenta minutos ocupada en una tarea de cinco salta a la vista en vez de quedarse invisible.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿OpenCode es gratis?',
      answer: 'Sí. La CLI es gratuita y de código abierto, sin edición de pago. El uso del modelo se factura aparte. OpenCode Console, antes Zen, ofrece ahora modelos temporales a 0 $ de entrada y 0 $ de salida, pero su disponibilidad puede cambiar.',
    },
    {
      question: '¿Cuánto cuesta OpenCode al mes?',
      answer: 'Nada, salvo que elijas OpenCode Go por 10 o 40 $ al mes. Si no, traes tu propia clave de API y le pagas directamente a tu proveedor, o compras créditos de OpenCode Console (antes Zen) a tarifas por token. En esas vías un mes tranquilo cuesta 0 $, algo que ninguna CLI de suscripción puede ofrecer.',
    },
    {
      question: '¿Qué es OpenCode Zen?',
      answer: 'La pasarela de pago por uso que OpenCode documenta ahora como OpenCode Console: modelos probados a tarifas por token, vendidos a precio de coste más una comisión del 4,6% + 0,31 $ en cada compra de créditos. Añades créditos y puedes definir una regla de recarga automática. Dentro de OpenCode se comporta como cualquier otro proveedor, así que cambiarte es un cambio de configuración.',
    },
    {
      question: '¿OpenCode tiene límites de uso o cuota semanal?',
      answer: 'Con tu propia clave o con créditos de Console, no: no hay ventana de 5 horas ni tope semanal, y solo te para un saldo vacío. OpenCode Go sí tiene límites: por modelo, el 20% del límite mensual cada 5 horas y el 50% cada semana.',
    },
    {
      question: '¿Cómo evito que un agente de OpenCode gaste de más?',
      answer: 'Desactiva la recarga automática para que tu saldo sea un límite duro, y elige el modelo a conciencia. Las tarifas de Console van de 0 $ a 180 $ por millón de tokens de salida, así que hacer trabajo rutinario con un modelo de frontera es con diferencia el error más caro disponible.',
    },
    {
      question: '¿OpenCode sale más barato que Claude Code o Codex?',
      answer: 'Depende por completo de cuánto lo uses. El trabajo a ráfagas u ocasional sale más barato en OpenCode porque las semanas tranquilas no cuestan nada. El uso diario pesado y constante con un modelo de frontera suele costar más que una suscripción de 100 $. La respuesta buena más habitual es usar los dos: suscripción para el día a día y OpenCode para el desbordamiento y la automatización.',
    },
    {
      question: '¿Hay suscripción de OpenCode?',
      answer: 'Sí, una opcional: OpenCode Go cuesta 10 $/mes, Go Plus 40 $/mes y Go Teams 20 $ por miembro. Cubre una lista de modelos de programación, sobre todo abiertos, con límites por modelo. La CLI sigue siendo gratis, y tu propia clave o los créditos de Console no necesitan suscripción.',
    },
    {
      question: '¿Ejecutar varios agentes de OpenCode a la vez cuesta más?',
      answer: 'Sí, y más o menos en proporción. Cada agente lee ficheros, razona y llama a herramientas por su cuenta, así que el gasto en tokens de una hora sigue al número de agentes realmente ocupados. Con tu propia clave o con créditos de Console no hay muro de cuota, así que el saldo y la recarga automática son los únicos frenos. En Go, los límites de 5 horas y semanales de cada modelo te paran antes.',
    },
    {
      question: '¿Cuál es la forma más barata de usar OpenCode?',
      answer: 'La CLI en sí es gratis y de código abierto. Si ya pagas una clave de Anthropic o de OpenAI, traerla no te cuesta nada extra. Console, antes Zen, ofrece además modelos temporales a 0 $ de entrada y 0 $ de salida, aunque OpenCode marca varios como ofertas por tiempo limitado.',
    },
  ],
}

export default guide
