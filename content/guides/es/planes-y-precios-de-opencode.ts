import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-opencode',
    locale: 'es',
    title: 'Planes y precios de OpenCode: el que no tiene suscripción',
    metaTitle: 'Precios de OpenCode: BYOK, Zen y coste real (2026)',
    metaDescription: 'Los precios de OpenCode explicados: la CLI es gratis y de código abierto, traer tu propia clave cuesta lo que cobre tu proveedor, y OpenCode Zen es pago por uso sin cuota mensual.',
    intro: `OpenCode es el raro de la categoría, y la respuesta corta es de verdad corta: <strong>no hay suscripción y no hay cuota mensual</strong>. La CLI es gratis y de código abierto. O traes tu propia clave de API de cualquier proveedor, y entonces ese proveedor te factura directamente y OpenCode no se lleva nada, o usas OpenCode Zen, una pasarela con precios por token de pago por uso y sin margen sobre las peticiones.

Eso significa que no hay tabla de planes que comparar, ni ventana de 5 horas, ni tope semanal, ni nivel que se te quede pequeño. Tampoco hay techo: OpenCode nunca te va a parar porque se haya agotado una cuota, y tampoco te va a parar porque una factura se haya puesto grande.

Esta guía cubre lo que cuesta de verdad cada vía, los modelos gratuitos que lleva Zen, el número que decide tu factura y el intercambio honesto frente a una CLI de suscripción como <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>.`,
    ctaText: 'Pagar por uso significa que nada frena a un agente desbocado salvo que tú lo estés mirando. CodeAgentSwarm mantiene visibles todas tus sesiones de OpenCode en un solo espacio, así siempre sabes qué está corriendo y desde cuándo.',
    ctaAgent: 'opencode',
    highlightedWords: ['OpenCode', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-25',
    alternateSlug: 'opencode-plans-and-pricing',
  },
  sections: [
    {
      id: 'dos-vias',
      title: 'Dos vías, y ninguna es una suscripción',
      content: [
        {
          type: 'paragraph',
          text: 'Todo el precio de OpenCode se reduce a cuál de estas dos eliges, y puedes cambiar de una a otra por proyecto o por sesión.',
        },
        {
          type: 'table',
          headers: ['Vía', 'Qué pagas', 'Quién te factura', 'Cuota mensual'],
          rows: [
            ['Tu propia clave (BYOK)', 'Las tarifas de API normales de tu proveedor', 'Anthropic, OpenAI, Google, quien sea', 'Ninguna'],
            ['OpenCode Zen', 'Tarifas por token sobre un saldo prepago', 'Zen, sin margen sobre las peticiones', 'Ninguna'],
          ],
          caption: 'Vías de pago de OpenCode, agosto de 2026.',
        },
        {
          type: 'paragraph',
          text: '<strong>BYOK</strong> es la forma más pura: OpenCode es solo un cliente. Lo apuntas a una clave de Anthropic o de OpenAI que ya tengas y los tokens los factura directamente ese proveedor, exactamente igual que si hubieras llamado tú a su API. OpenCode no está en la ruta del pago y no se lleva comisión.',
        },
        {
          type: 'paragraph',
          text: '<strong>Zen</strong> es una pasarela curada. Añades saldo, usas los modelos que quieras a tarifas por token publicadas, y se recarga sola cuando te quedas corto. Zen funciona dentro de OpenCode como cualquier otro proveedor, así que pasarte a ella es un cambio de configuración, no una migración.',
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
      title: 'Lo que cuesta de verdad OpenCode Zen',
      content: [
        {
          type: 'paragraph',
          text: 'Zen publica tarifas por millón de tokens separadas en entrada, salida, lecturas de caché y escrituras de caché. La horquilla del catálogo es enorme, y eso es lo más útil que hay que entender. A 25 de agosto de 2026:',
        },
        {
          type: 'table',
          headers: ['Modelo', 'Entrada / 1M', 'Salida / 1M'],
          rows: [
            ['Big Pickle, MiMo-V2.5 Free y otros modelos gratuitos temporales', '0,00 $', '0,00 $'],
            ['GPT 5.6 Luna', '0,20 $', '1,20 $'],
            ['Claude Sonnet 5', '2,00 $', '10,00 $'],
            ['GPT 5.5 Pro', '30,00 $', '180,00 $'],
          ],
          caption: 'Una muestra de las tarifas de OpenCode Zen, verificada el 25 de agosto de 2026. El catálogo completo está en la documentación de Zen.',
        },
        {
          type: 'paragraph',
          text: 'Vuelve a leer esa tabla, porque la horquilla es justo el asunto: <strong>lo más caro del catálogo cuesta 150 veces el nivel económico en salida</strong>. En una CLI de suscripción, elegir modelo cambia lo rápido que quemas una asignación fija. Aquí cambia tu factura directamente y por dos órdenes de magnitud. Escoger el modelo adecuado para cada tarea no es una microoptimización en Zen, es toda la historia del coste.',
        },
        {
          type: 'paragraph',
          text: 'Zen ofrece además modelos publicados con coste cero en entrada y salida. OpenCode marca varios como ofertas por tiempo limitado, así que comprueba el catálogo actual antes de depender de uno en un flujo duradero.',
        },
        {
          type: 'paragraph',
          text: 'Zen <strong>no cobra margen sobre las peticiones</strong>. Lo que sí traslada, a precio de coste, son las comisiones de tarjeta: 4,4% más 0,30 $ por transacción. Eso es una comisión de pago, no de servicio, y es el argumento para recargar cantidades más grandes con menos frecuencia en vez de ir haciendo recargas pequeñas.',
        },
      ],
    },
    {
      id: 'recarga-automatica',
      title: 'La recarga automática por defecto, y por qué cambiarla',
      content: [
        {
          type: 'paragraph',
          text: 'Por defecto, cuando tu saldo de Zen baja de 5 $, el sistema recarga automáticamente 20 $. Es cómodo y es también el mecanismo por el que un agente que se porta mal se gasta dinero real por la noche sin que nadie lo vea.',
        },
        {
          type: 'paragraph',
          text: 'Tanto el umbral como el importe se pueden ajustar, y la recarga automática se puede desactivar del todo. <strong>Desactivarla convierte tu saldo en un límite de gasto duro</strong>, que es lo más parecido que tiene OpenCode a la seguridad de una suscripción: el agente se para cuando se acaba el dinero, igual que al chocar con un límite semanal, salvo que el número lo has elegido tú.',
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
      id: 'contra-suscripcion',
      title: 'Pago por uso contra suscripción: cuándo gana cada uno',
      content: [
        {
          type: 'paragraph',
          text: 'La comparación que se suele hacer es el gasto mensual total, y eso es solo la mitad. La diferencia de verdad está en <strong>qué pasa en los extremos</strong>.',
        },
        {
          type: 'paragraph',
          text: 'Una suscripción empieza como un coste fijo con capacidad incluida. Muchos proveedores ya permiten activar exceso de pago, así que el techo es opcional y la factura final puede dejar de ser fija. El pago por uso no tiene suelo mensual: una semana sin trabajar cuesta cero y una semana de refactorización dura cuesta lo que cueste.',
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
          text: 'Lo que cuesta dinero es el modelo que va detrás. Zen mantiene ahora una vía sin coste mediante modelos gratuitos temporales, pero el catálogo puede cambiar.',
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
            '<strong>Ajusta el modelo a la tarea.</strong> La horquilla de 150x en salida del catálogo de Zen convierte el trabajo rutinario con un modelo de frontera en el error más caro que tienes a mano.',
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
      answer: 'Sí. La CLI es gratuita y de código abierto, sin edición de pago. El uso del modelo se factura aparte. OpenCode Zen ofrece ahora modelos temporales a 0 $ de entrada y 0 $ de salida, pero su disponibilidad puede cambiar.',
    },
    {
      question: '¿Cuánto cuesta OpenCode al mes?',
      answer: 'No hay cuota mensual. O traes tu propia clave de API y le pagas directamente a tu proveedor, o usas OpenCode Zen con un saldo prepago a tarifas por token. Un mes tranquilo cuesta 0 $, algo que ninguna CLI de suscripción puede ofrecer.',
    },
    {
      question: '¿Qué es OpenCode Zen?',
      answer: 'Una pasarela curada de modelos comparados con precios por token de pago por uso y sin margen sobre las peticiones. Añades saldo y se recarga sola cuando te quedas corto. Dentro de OpenCode se comporta como cualquier otro proveedor, así que cambiarte es un cambio de configuración.',
    },
    {
      question: '¿OpenCode tiene límites de uso o cuota semanal?',
      answer: 'No. No hay ventana de 5 horas, ni tope semanal, ni niveles. Lo único que te para es quedarte sin saldo, y solo si has desactivado la recarga automática.',
    },
    {
      question: '¿Cómo evito que un agente de OpenCode gaste de más?',
      answer: 'Desactiva la recarga automática para que tu saldo sea un límite duro, y elige el modelo a conciencia. Las tarifas de Zen van de 0 $ a 180 $ por millón de tokens de salida, así que hacer trabajo rutinario con un modelo de frontera es con diferencia el error más caro disponible.',
    },
    {
      question: '¿OpenCode sale más barato que Claude Code o Codex?',
      answer: 'Depende por completo de cuánto lo uses. El trabajo a ráfagas u ocasional sale más barato en OpenCode porque las semanas tranquilas no cuestan nada. El uso diario pesado y constante con un modelo de frontera suele costar más que una suscripción de 100 $. La respuesta buena más habitual es usar los dos: suscripción para el día a día y OpenCode para el desbordamiento y la automatización.',
    },
  ],
}

export default guide
