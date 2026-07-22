import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-kimi-code',
    locale: 'es',
    title: 'Planes y precios de Kimi Code: qué te da cada nivel de verdad',
    metaTitle: 'Planes y precios de Kimi Code: todos los niveles (2026)',
    metaDescription: 'Todos los planes de Kimi Code explicados: el nivel gratis, los de pago de 19 $ a 199 $, los multiplicadores de uso, la cuota semanal con ventana de 5 horas y el pago por token.',
    intro: `Kimi Code funciona con una suscripción Kimi, y a julio de 2026 los planes son estos: Adagio (gratis), Moderato a 19 $/mes, Allegretto a 39 $/mes, Allegro a 99 $/mes y Vivace a 199 $/mes. Los niveles de pago escalan tu uso de Kimi Code aproximadamente 1x, 5x, 15x y 30x, y todos tiran de un único pozo de créditos compartido con el resto de tu membresía Kimi. Si prefieres no suscribirte, existe la vía de pago por token a través de la Moonshot Open Platform.

Esa es la respuesta en un párrafo. Los detalles son donde la gente se lleva sorpresas: la cuota se refresca en ciclos semanales pero hay además una ventana rodante de 5 horas que puede pararte con cuota semanal de sobra, el famoso contexto de un millón de tokens no está disponible en todos los planes, y las propias páginas de Moonshot no siempre se han puesto de acuerdo sobre qué nivel desbloquea Kimi Code.

Esta guía ordena lo que se sabe, le pone fecha a cada número y marca las partes que deberías reconfirmar en la página oficial de precios antes de pagar, porque Moonshot está iterando esto muy deprisa.`,
    ctaText: 'Ejecutar agentes de Kimi Code contra una cuota semanal estresa mucho menos cuando la ves. CodeAgentSwarm sigue las ventanas reales semanales y de 5 horas de Kimi por terminal, junto a las del resto de agentes que uses.',
    highlightedWords: ['Kimi Code', 'Planes', 'Precios'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'kimi-code-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'Moonshot bautiza sus niveles de suscripción con tempos musicales. A julio de 2026, la membresía Kimi queda así:',
        },
        {
          type: 'list',
          items: [
            '<strong>Adagio</strong>: gratis. La puerta de entrada a Kimi, con límites estrechos',
            '<strong>Moderato</strong>: 19 $/mes. El primer nivel de pago, uso 1x de Kimi Code',
            '<strong>Allegretto</strong>: 39 $/mes, aproximadamente 5x de uso',
            '<strong>Allegro</strong>: 99 $/mes, aproximadamente 15x de uso',
            '<strong>Vivace</strong>: 199 $/mes, aproximadamente 30x de uso',
          ],
        },
        {
          type: 'paragraph',
          text: 'Hay dos cosas que importan más que los multiplicadores. Primera: hay <strong>un único pozo de créditos por membresía</strong>. Kimi Code, la app de chat de Kimi y todo lo demás de la membresía beben del mismo saldo, así que un día intenso de chat se come tu presupuesto de programación. Segunda: los multiplicadores describen capacidad relativa, no recuentos exactos de tokens, y Moonshot ha retocado los detalles de los planes más de una vez desde que Kimi K3 salió el 16 de julio de 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Las propias páginas de Moonshot se han contradicho sobre qué plan desbloquea Kimi Code: algunos materiales señalaban a Moderato y otras páginas a Allegretto. Los planes se están moviendo rápido. Antes de pagar, confirma en la página oficial de precios de Kimi qué nivel incluye acceso a Kimi Code y cuánto uso te da.',
        },
      ],
    },
    {
      id: 'como-funciona-la-cuota',
      title: 'Cómo funciona la cuota: refresco semanal más ventana de 5 horas',
      content: [
        {
          type: 'paragraph',
          text: 'La cuota de Kimi Code tiene dos capas, y vas a notar las dos. La primera es un <strong>ciclo semanal</strong>: tu cuota se refresca cada 7 días contados desde la fecha de tu suscripción, y lo que no gastes no se acumula. Puedes no quemar nada en toda la semana y el ciclo siguiente empiezas con la misma asignación.',
        },
        {
          type: 'paragraph',
          text: 'La segunda capa es una <strong>ventana rodante de 5 horas</strong> por encima. Aunque tengas casi toda la cuota semanal intacta, una sesión intensa puede tocar el techo de 5 horas y pararte hasta que la ventana avance. Esta es la capa que sorprende a quien ejecuta varios agentes en paralelo: cuatro terminales de un K3 que siempre razona devoran una ventana de 5 horas en nada.',
        },
        {
          type: 'paragraph',
          text: 'Si te quedas sin cuota, Moonshot vende <strong>recargas booster</strong>: un saldo de monedero que puedes gastar para seguir trabajando más allá de lo incluido. Los boosters son un parche; si los necesitas a menudo, el siguiente nivel o la plataforma de pago por token suele salir más barato.',
        },
        {
          type: 'paragraph',
          text: 'Para ver por dónde vas, escribe <code>/usage</code> dentro de la TUI de Kimi Code. A julio de 2026 no existe un subcomando <code>kimi usage</code> de shell, así que se consulta desde dentro de la sesión. La lectura muestra tu uso actual, tus límites y ventanas, y el saldo booster si lo tienes.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'El modelo de 7 días más 5 horas es casi idéntico a cómo mide Anthropic el uso de Claude. Si ya sabes dosificar Claude Code con sus límites semanales y de 5 horas, tu instinto vale tal cual para Kimi Code.',
        },
      ],
    },
    {
      id: 'contexto-por-plan',
      title: 'El contexto de 1M depende del plan',
      content: [
        {
          type: 'paragraph',
          text: 'El titular de Kimi K3 es su ventana de contexto de 1.048.576 tokens. Lo que el titular se salta: <strong>en Moderato tienes 256k tokens de contexto, y el 1M completo exige Allegretto o superior</strong>, a julio de 2026.',
        },
        {
          type: 'paragraph',
          text: 'Esto importa especialmente para trabajo con agentes. Un cuarto de millón de tokens sigue siendo mucho, pero si elegiste Kimi por el contexto de repositorio completo o por refactors gigantes, el plan de pago más barato no te da justo aquello a lo que venías. Peor aún: un agente que cree tener 1M de tokens mientras corre contra un techo de 256k empieza a compactar su historial antes de lo que esperas, y las tareas largas pierden contexto que dabas por seguro.',
        },
        {
          type: 'paragraph',
          text: 'Si la ventana de 1M es tu motivo para estar aquí, presupuesta Allegretto (39 $/mes) como el precio de entrada real, o usa la plataforma de pago por token, donde el modelo sirve su ventana completa.',
        },
      ],
    },
    {
      id: 'pago-por-token',
      title: 'La alternativa de pago por token: Moonshot Open Platform',
      content: [
        {
          type: 'paragraph',
          text: 'No hace falta suscribirse. La Moonshot Open Platform sirve Kimi K3 (id de modelo <code>kimi-k3</code>) con API key y facturación por token. A julio de 2026 las tarifas son:',
        },
        {
          type: 'list',
          items: [
            '<strong>0,30 $ por millón de tokens de entrada</strong> en aciertos de caché',
            '<strong>3,00 $ por millón de tokens de entrada</strong> en fallos de caché',
            '<strong>15,00 $ por millón de tokens de salida</strong>',
            '<strong>Plano en toda la ventana de 1M</strong>: sin recargos por contexto largo',
          ],
        },
        {
          type: 'paragraph',
          text: 'El número que hay que interiorizar es la brecha de 10x entre acierto y fallo de caché. Los agentes de código reenvían en cada turno un contexto grande y casi estable, que es exactamente el tráfico que adoran las cachés de prompt. En la práctica, una sesión de agente bien llevada se apoya sobre todo en la tarifa de 0,30 $, y por eso K3 recorta el coste de la mayoría de modelos frontera en cargas de agente reales, no solo sobre el papel.',
        },
        {
          type: 'paragraph',
          text: 'La contrapartida: el pago por token no tiene techo mensual plano, así que un agente desbocado es una factura desbocada. Los rate limits de la plataforma además escalan con tu recarga acumulada, y el nivel de entrada se queda corto para trabajo con agentes. Para el día a día, el coste predecible de la suscripción suele ganar; para picos puntuales o evaluación, la plataforma es más limpia.',
        },
        {
          type: 'paragraph',
          text: 'Una opción relacionada pero distinta: Moonshot también mantiene endpoints compatibles con Anthropic, así que puedes apuntar Claude Code a K3 y saltarte el CLI de Kimi Code por completo. Ese montaje, con sus dos endpoints y variables de autenticación distintas, está explicado en <a href="/es/guias/kimi-k3-con-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K3 con Claude Code</a>.',
        },
      ],
    },
    {
      id: 'nivel-gratis',
      title: '¿Kimi Code es gratis? La realidad de Adagio',
      content: [
        {
          type: 'paragraph',
          text: 'El CLI de Kimi Code en sí es gratis y open source (licencia MIT, se instala en una línea; mira <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía de instalación</a>). Lo que cuesta dinero es el modelo que hay detrás.',
        },
        {
          type: 'paragraph',
          text: 'El nivel gratuito Adagio existe y, según la promoción del momento, puede incluir algo de uso de Kimi Code, pero tómalo como una cata y no como una asignación de trabajo: servir un modelo de 2,8 billones de parámetros que siempre razona es caro, y las cuotas gratis para él son proporcionalmente pequeñas. Da para evaluar si la calidad de K3 justifica un plan de pago en tu trabajo, y poco más.',
        },
        {
          type: 'paragraph',
          text: 'El encuadre honesto de presupuesto: evaluar Kimi Code cuesta de 0 a 19 $, y usarlo como agente de programación diario empieza de forma realista en 19 a 39 $/mes, según qué nivel lleve el acceso a Kimi Code en ese momento y si necesitas la ventana de contexto completa.',
        },
      ],
    },
    {
      id: 'vigilar-la-cuota',
      title: 'Vigilar la cuota de Kimi mientras los agentes trabajan',
      content: [
        {
          type: 'paragraph',
          text: 'Los sistemas de cuota con ventanas rodantes tienen un problema operativo: te enteras de que chocaste con el muro cuando el agente se para. Con un terminal es molesto; con varios es caro, porque los agentes en paralelo multiplican tu ritmo de gasto contra el mismo pozo compartido.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, el workspace de escritorio para ejecutar varios CLIs de IA en paralelo, lee la cuota real de Kimi (el ciclo semanal y la ventana de 5 horas, del propio endpoint de uso de Moonshot) y la muestra junto a las cuotas del resto de tus agentes: un aro de uso en la barra superior y un desglose por proveedor. Ves acercarse el muro mientras los agentes trabajan, en vez de descubrirlo por un terminal parado.',
        },
        {
          type: 'paragraph',
          text: 'Eso casa de forma natural con el patrón multiagente de <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de Kimi Code</a>: pon a Kimi donde su precio brilla, deja <a href="/es/guias/kimi-code-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> u otro agente en el resto, y que el indicador de cuota te diga cuándo reequilibrar.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Kimi Code es gratis?',
      answer: 'El CLI es gratis y open source, y el nivel gratuito Adagio te deja probar un poco el modelo K3. Para trabajo real necesitas un plan Kimi de pago (desde 19 $/mes a julio de 2026) o una API key de pago por token de la Moonshot Open Platform.',
    },
    {
      question: '¿Cuánto cuesta Kimi Code al mes?',
      answer: 'A julio de 2026: Moderato 19 $, Allegretto 39 $, Allegro 99 $ y Vivace 199 $ al mes, con un uso de Kimi Code que escala aproximadamente 1x, 5x, 15x y 30x entre esos niveles. Todos comparten un único pozo de créditos con el resto de tu membresía Kimi.',
    },
    {
      question: '¿Qué plan de Kimi incluye Kimi Code?',
      answer: 'Las propias páginas de Moonshot han sido inconsistentes: unas señalaban a Moderato (19 $) y otras a Allegretto (39 $). Confírmalo en la página oficial de precios en el momento de suscribirte. Si quieres el contexto completo de 1M de tokens en vez de 256k, cuenta con Allegretto o superior en cualquier caso.',
    },
    {
      question: '¿La cuota de Kimi Code que no uso se acumula?',
      answer: 'No. La cuota se refresca cada 7 días desde tu fecha de suscripción y lo no usado se pierde en el reinicio. Además hay una ventana rodante de 5 horas por encima, así que puedes quedar bloqueado temporalmente incluso con cuota semanal restante.',
    },
    {
      question: '¿Qué es el límite de 5 horas de Kimi Code?',
      answer: 'Una ventana de ritmo rodante superpuesta a la cuota semanal. Un uso intenso dentro de cualquier tramo de 5 horas puede alcanzarla, y en ese punto Kimi Code se para hasta que la ventana avanza. Las sesiones de agentes en paralelo la alcanzan mucho antes que un solo terminal.',
    },
    {
      question: '¿Cómo consulto mi uso de Kimi Code?',
      answer: 'Escribe /usage dentro de una sesión de Kimi Code. A julio de 2026 no hay subcomando kimi usage de shell. Si ejecutas Kimi Code dentro de CodeAgentSwarm, la app sigue por ti las ventanas semanal y de 5 horas y las muestra en su indicador de cuota.',
    },
  ],
}

export default guide
