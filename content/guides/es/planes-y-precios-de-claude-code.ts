import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-claude-code',
    locale: 'es',
    title: 'Precios de Claude Code: cada plan y cuál necesitas para agentes en paralelo',
    metaTitle: 'Precios de Claude Code 2026: planes, límites y coste real',
    metaDescription: 'Pro 20 $, Max 100 $, Ultra 200 $, asientos Team y pago por token. Y lo que la web oficial no cuenta: qué plan aguanta 3 o 4 agentes a la vez.',
    intro: `Claude Code viene con una suscripción de Claude. A 31 de octubre de 2026, <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">la página de precios de Anthropic</a> lista: Free (sin Claude Code), Pro por 20 $/mes, Max por 100 $/mes, Ultra por 200 $/mes, Team desde 20 $/asiento y Enterprise. También existe la vía de pago por token a través de la API de Anthropic si prefieres no suscribirte.

Esa es la respuesta de un párrafo, y ya incluye el cambio que la mayoría de comparativas se salta: <strong>Max 5x y Max 20x ya no aparecen en la página</strong>. Max es ahora un único nivel de 100 $ con 5x el uso de Pro, y el nivel de 200 $ se llama Ultra: da 10x el uso semanal de Pro y no tiene límite de 5 horas en las cuentas verificadas.

El dinero está en los detalles. Anthropic publica multiplicadores, no recuentos de tokens, así que "5x" es relativo a Pro y no un número contra el que puedas presupuestar. La mayoría de planes apilan dos capas, una ventana móvil de 5 horas y un ciclo semanal, y Max y Ultra añaden un límite semanal aparte para Fable. Tu uso de Claude Code y tu uso del chat de Claude salen del mismo bote, así que un día intenso en la app de chat se come tu presupuesto de programación.

Esta guía deja claro lo que se sabe, fecha cada número y señala qué partes conviene volver a mirar en la página oficial de precios antes de pagar.`,
    ctaText: 'Llevar varios agentes de Claude Code contra una cuota semanal compartida da mucho menos estrés cuando puedes verla. CodeAgentSwarm muestra tu consumo real de Claude por terminal, junto al de todos los demás agentes que ejecutes.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'claude-code-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'A 31 de octubre de 2026, esta es la oferta en la propia página de precios de Anthropic. Dos columnas importan más: Claude Code no está en el nivel gratuito, ni siquiera de forma limitada, y solo Ultra elimina el límite de 5 horas.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Claude Code', 'Uso'],
          rows: [
            ['Free', '0 $', 'No', 'Solo chat'],
            ['Pro', '17 $/mes anual, 20 $/mes mensual', 'Sí', 'La base 1x, cada 5 horas y cada semana'],
            ['Max', '100 $/mes', 'Sí', '5x Pro cada 5 horas y cada semana'],
            ['Ultra', '200 $/mes', 'Sí', '10x Pro cada semana, sin límite de 5 horas en cuentas verificadas'],
            ['Team asiento estándar', '20 $/asiento anual, 25 $/asiento mensual', 'Sí', 'Más que Pro'],
            ['Team asiento premium', '100 $/asiento anual, 125 $/asiento mensual', 'Sí', '5x un asiento estándar'],
            ['Enterprise', '20 $/asiento anual (mínimo 20 asientos) más consumo a precio de API', 'Sí', 'Escala con el modelo y la tarea'],
          ],
          caption: 'Planes de Anthropic según claude.com/pricing, verificados el 31 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: 'Dos cosas importan más que los multiplicadores. Primero, <strong>un solo bote por cuenta</strong>: Claude Code, las apps de escritorio y web de Claude y todo lo demás de tu suscripción beben de la misma asignación, así que una tarde de conversaciones largas en el chat reduce directamente cuánto puedes programar esa semana. Segundo, <strong>los multiplicadores describen capacidad relativa, no tokens</strong>. Anthropic no publica deliberadamente una cuota en tokens para ningún plan, porque el ritmo de consumo depende del tamaño de tu contexto, del modelo que elijas y de cuánto lee el agente antes de actuar.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'El descuento anual de Pro es real y se pasa por alto a menudo: 200 $ pagados por adelantado por el año, o 17 $/mes, frente a 20 $/mes facturado mes a mes, o sea 200 $ el año en vez de 240 $. Max y Ultra solo se facturan mes a mes. En Team la diferencia es de 20 $ frente a 25 $ por asiento estándar y mes.',
        },
      ],
    },
    {
      id: 'como-funciona-la-cuota',
      title: 'Cómo funciona la cuota de verdad: una ventana de 5 horas y dos topes semanales',
      content: [
        {
          type: 'paragraph',
          text: 'En Pro y Max, la cuota de Claude Code tiene dos capas y vas a notar las dos. La primera es una <strong>ventana móvil de 5 horas</strong>. Empieza con tu primer mensaje, no a una hora fija del reloj, y se va desplazando. Una tarde intensa puede agotarla mientras tu asignación semanal está casi intacta. Puedes esperar a que la ventana avance o activar créditos de uso para continuar fuera del límite incluido. Ultra es la excepción: Anthropic dice que las cuentas Ultra verificadas no tienen límite de 5 horas, solo el semanal.',
        },
        {
          type: 'paragraph',
          text: 'La segunda capa es un <strong>ciclo semanal</strong>, y aquí es donde casi todo el mundo se equivoca: no siempre es un solo tope. Hay un límite semanal para todos los modelos combinados y, en Max y Ultra, un límite semanal aparte para Fable, que puede usar hasta la mitad de tu asignación semanal. Claude Code también puede avisar de un límite de un modelo concreto, como "You\'ve hit your Opus limit", y en ese caso cambiar a un modelo de otra familia te deja seguir. La hora del reinicio semanal va ligada a tu cuenta y se ve en Ajustes y luego Uso. Nada se acumula de una semana a otra.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Este modelo por capas es la razón de que "si apenas lo he usado esta semana" y "has alcanzado tu límite" puedan ser ciertas a la vez. Antes de dar por hecho que algo se ha roto, mira qué tope has tocado en realidad: la ventana de 5 horas, el límite semanal combinado o el límite de un modelo concreto. Cambiar de modelo solo sirve para el último.',
        },
        {
          type: 'paragraph',
          text: 'Anthropic introdujo los límites semanales en agosto de 2025 y ha dicho que afectan a menos del 5% de sus suscriptores, lo cual es cierto para quien usa el chat y bastante menos tranquilizador para quien ejecuta agentes de programación. Un solo agente trabajando en una refactorización grande consume más en una hora que un usuario de chat en toda una semana.',
        },
        {
          type: 'paragraph',
          text: 'Para saber dónde estás, escribe <code>/usage</code> dentro de una sesión de Claude Code. Con una suscripción muestra las barras de uso de tu plan y un desglose de lo que las ha gastado, como subagentes, servidores MCP o contexto largo, con cambios sugeridos (<a href="https://code.claude.com/docs/en/costs" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de Claude Code</a>).',
        },
      ],
    },
    {
      id: 'agentes-en-paralelo',
      title: 'El multiplicador que importa de verdad: cuántos agentes ejecutas',
      content: [
        {
          type: 'paragraph',
          text: 'La comparación que todo el mundo hace es Pro contra Max, planteada como "¿programo lo suficiente para justificar 100 $?". Ese es el eje equivocado. La pregunta que decide tu nivel es <strong>cuántas sesiones de Claude Code tienes abiertas a la vez</strong>.',
        },
        {
          type: 'paragraph',
          text: 'Un terminal con Pro va cómodo para casi todo el mundo casi todos los días. Cuatro terminales trabajando en paralelo se comen una ventana de 5 horas unas cuatro veces más rápido, porque cada uno lee ficheros, ejecuta herramientas y razona por su cuenta. El multiplicador de tu plan no va tanto de cuántas horas trabajas como de cuánta anchura abres.',
        },
        {
          type: 'paragraph',
          text: 'La forma honesta de elegir: si llevas un agente a la vez y sobre todo revisas lo que produce, Pro te sobra y Max es dinero que no necesitas gastar. Si mantienes dos o tres agentes ocupados en proyectos distintos, Pro te va a frenar a diario y Max es el punto de entrada real. Ultra es para quien tiene agentes trabajando prácticamente sin parar: sin límite de 5 horas, una racha de cuatro agentes ya no se corta a media tarde, aunque el límite semanal sigue ahí.',
        },
        {
          type: 'paragraph',
          text: 'Ese patrón es exactamente lo que cubre <a href="/es/guias/enjambre-de-agentes-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Claude Code</a>. Vigilar la cuota sigue importando porque el uso incluido puede desaparecer rápido, pero los planes de pago ya pueden activar <a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">créditos de uso</a> en vez de esperar al reinicio.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Nivel que suele aguantar', 'Por qué'],
          rows: [
            ['1 sesión', 'Pro, 20 $/mes', 'La base 1x está pensada para un agente que llevas y revisas mientras trabaja'],
            ['2 o 3 sesiones', 'Max, 100 $/mes', 'Dos o tres agentes vacían la misma ventana de 5 horas unas dos o tres veces más rápido que uno, y Max da 5x Pro en las dos capas'],
            ['4 o más sesiones', 'Ultra, 200 $/mes', 'Cuatro agentes llegarían a un techo de 5 horas unas cuatro veces antes; las cuentas Ultra verificadas no lo tienen, así que solo queda vigilar el límite semanal de 10x'],
          ],
          caption: 'Regla aproximada deducida de los multiplicadores que publica Anthropic, no un número de sesiones que prometa. El consumo real depende del tamaño del contexto, del modelo y de cuánto lee cada agente antes de actuar.',
        },
        {
          type: 'paragraph',
          text: 'Tómatelo como punto de partida, no como garantía. Anthropic publica multiplicadores y no recuentos de tokens, así que la única prueba honesta es una semana en el nivel más barato con <code>/usage</code> a mano. Si acabas la semana sin chocar con el muro, subir de nivel es dinero que no necesitas gastar.',
        },
      ],
    },
    {
      id: 'pago-por-token',
      title: 'La alternativa de pago por token: la API de Anthropic',
      content: [
        {
          type: 'paragraph',
          text: 'No estás obligado a suscribirte. Claude Code acepta una clave de API de Anthropic y factura por token, sin cuota mensual y sin muro semanal. A 31 de octubre de 2026 los modelos actuales cuestan, por millón de tokens:',
        },
        {
          type: 'table',
          headers: ['Modelo', 'Entrada', 'Salida'],
          rows: [
            ['Claude Fable 5.1', '10,00 $', '50,00 $'],
            ['Claude Opus 5.5', '4,00 $', '20,00 $'],
            ['Claude Sonnet 5.5', '2,00 $', '10,00 $'],
            ['Claude Haiku 5.5', '0,10 $ (0,50 $ con prompts de más de 100K tokens)', '0,50 $ (2,50 $ con prompts de más de 100K tokens)'],
          ],
          caption: 'Tarifas de la API propia de Anthropic según su documentación oficial de precios, verificadas el 31 de octubre de 2026. Bedrock y Google Cloud los operan terceros y tienen precios aparte.',
        },
        {
          type: 'paragraph',
          text: 'El número que decide si esto sale barato o ruinoso es la <strong>caché de prompts</strong>. En Opus 5.5 y Sonnet 5.5 los aciertos de caché cuestan 0,05x el precio base de entrada, una vigésima parte, y en Fable 5.1 0,025x (<a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de precios de Anthropic</a>). Los agentes de programación reenvían en cada turno un contexto grande y bastante estable, que es justo el tráfico para el que se diseñaron las cachés. Una sesión de agente que se porta bien se apoya sobre todo en la tarifa cacheada. Un agente que no para de invalidar su caché, no.',
        },
        {
          type: 'paragraph',
          text: 'La contrapartida es la evidente: el uso medido puede convertir un agente desbocado en una factura desbocada. La suscripción solo mantiene un coste predecible mientras los créditos de uso estén desactivados; si los activas, el trabajo que supera el límite incluido se cobra con las tarifas estándar de API. Para picos, CI y evaluaciones, una clave de API separada es más fácil de presupuestar y limitar.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Puedes cambiar por proyecto. Claude Code lee ANTHROPIC_API_KEY cuando está definida, así que un trabajo de CI puede facturar por token mientras tu portátil sigue usando la suscripción. Eso sí, cuidado con dejarte esa variable exportada en la shell donde programas, o pagarás dos veces sin enterarte. Otra trampa: los 100 $ y 200 $ mensuales de créditos de API que traen Max y Ultra no sirven en Claude Code ni en las apps de Claude, solo en la Claude Platform.',
        },
      ],
    },
    {
      id: 'comparar-con-otros-agentes',
      title: 'Cómo se compara el precio de Claude Code con las demás CLI de agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Un precio solo significa algo al lado de las alternativas. Claude Code es la única de las siete comparadas aquí sin ninguna vía gratuita, y su precio de entrada está en la mitad de la tabla, no arriba del todo. Estos son los agentes comparados, una línea por agente, revisada el mismo día.',
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
          text: 'Cada fila tiene su propia guía con la escalera completa y la mecánica de cuotas detrás: <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/es/guias/precios-y-acceso-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> y <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent</a>.',
        },
      ],
    },
    {
      id: 'es-gratis',
      title: '¿Claude Code es gratis? La respuesta honesta',
      content: [
        {
          type: 'paragraph',
          text: 'No. Este es el punto donde Claude se separa de casi todos sus rivales: <strong>el nivel gratuito de Claude no incluye Claude Code en absoluto</strong>. OpenCode es gratis y de código abierto, Antigravity tiene un nivel gratuito de verdad y Codex está limitado pero presente en ChatGPT Free. Claude Code empieza en 20 $/mes, y punto.',
        },
        {
          type: 'paragraph',
          text: 'La CLI en sí es una descarga gratuita y se instala en una línea. Lo que no puedes es ejecutarla sin un plan de pago o una clave de API con saldo. Si quieres evaluar Claude Code antes de pagar, el camino honesto más barato es un mes de Pro por 20 $, o una recarga pequeña de API, que para evaluar suele quedarse en unos pocos dólares.',
        },
        {
          type: 'paragraph',
          text: 'El presupuesto realista: evaluar Claude Code cuesta 20 $ o menos, usarlo a diario como asistente de un solo agente cuesta 20 $/mes, y montarlo como flujo de agentes en paralelo cuesta de 100 a 200 $/mes.',
        },
      ],
    },
    {
      id: 'vigilar-la-cuota',
      title: 'Vigilar la cuota de Claude mientras trabajan los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Los sistemas de cuota con ventanas móviles tienen un problema operativo: te enteras de que has chocado con el muro cuando el agente se para. Con un terminal es molesto y con varios sale caro de verdad, porque los agentes en paralelo multiplican tu ritmo de consumo contra el mismo bote compartido, y un agente que se detiene a mitad de una refactorización te deja a ti la tarea de averiguar por dónde iba.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, el espacio de trabajo de escritorio para ejecutar varios agentes de IA de terminal en paralelo, lee tu consumo real de Claude y lo muestra junto a la cuota de tus otros agentes: un anillo de uso en la barra y un desglose por proveedor. Ves venir el muro mientras los agentes trabajan, en vez de descubrirlo por un terminal parado.',
        },
        {
          type: 'paragraph',
          text: 'Además encaja con la mitigación evidente: cuando Claude está cerca de su techo semanal, mueve el trabajo menos exigente a otro agente durante un día en vez de subir un nivel que solo necesitas de vez en cuando. <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a> factura por token sin muro, y <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a> tiene su propia cuota independiente, así que un montaje mixto casi nunca se para del todo.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Claude Code es gratis?',
      answer: 'No. A diferencia de casi todas las CLI rivales, Claude Code no está incluido en el nivel gratuito de Claude. La entrada más barata es Pro por 20 $/mes (17 $/mes facturado anualmente), o una clave de API de Anthropic con pago por token.',
    },
    {
      question: '¿Cuánto cuesta Claude Code al mes?',
      answer: 'A 31 de octubre de 2026: Pro 20 $ (o 17 $ facturado anualmente), Max 100 $, Ultra 200 $ y Team desde 20 $ por asiento facturado anualmente. Todos incluyen Claude Code y todos comparten un único bote de uso con las apps de chat de Claude.',
    },
    {
      question: '¿Cuál es la diferencia entre Max 5x y Max 20x?',
      answer: 'La página de precios de Anthropic ya no lista Max 20x. Ahora vende Max por 100 $ al mes, con 5x el uso de Pro cada 5 horas y cada semana, y Ultra por 200 $ al mes, con 10x el uso semanal de Pro y sin límite de 5 horas en las cuentas verificadas. Elige por cuántos agentes llevas en paralelo, no por cuántas horas trabajas.',
    },
    {
      question: '¿Qué es el límite de 5 horas de Claude Code?',
      answer: 'Una ventana móvil que arranca con tu primer mensaje y se va desplazando, montada encima de los límites semanales en Pro y Max. Un uso intenso dentro de cualquier tramo de 5 horas puede agotarla, y entonces Claude Code se para hasta que la ventana avanza o usas créditos de uso. Varias sesiones de agente en paralelo llegan ahí varias veces más rápido que un solo terminal. Las cuentas Ultra verificadas no tienen límite de 5 horas.',
    },
    {
      question: '¿Por qué me bloquea Opus pero Sonnet sigue funcionando?',
      answer: 'Porque has tocado un límite de un modelo concreto, no tu límite de sesión ni el semanal. Claude Code lo muestra como "You\'ve hit your Opus limit", y cambiar a un modelo de otra familia, como Sonnet, te deja seguir. Los límites de sesión y semanal son comunes a todos los modelos, así que cambiar de modelo no ayuda cuando tocas uno de esos.',
    },
    {
      question: '¿La cuota de Claude Code que no gasto se acumula?',
      answer: 'No. Tanto la ventana de 5 horas como el ciclo semanal se reinician sin arrastrar nada. Aunque no gastes nada en toda la semana, empiezas el siguiente ciclo con la misma asignación.',
    },
    {
      question: '¿Cómo consulto mi consumo de Claude Code?',
      answer: 'Escribe /usage dentro de una sesión de Claude Code: con una suscripción muestra las barras de uso de tu plan y en qué se han ido. Ajustes y luego Uso, en la web de Claude, muestra la hora de reinicio semanal. Si ejecutas Claude Code dentro de CodeAgentSwarm, la app te lleva las ventanas y te las enseña en su indicador de cuota.',
    },
    {
      question: '¿Qué suscripción de Claude necesito para Claude Code?',
      answer: 'Cualquiera de pago. Pro por 20 $/mes es la entrada, Max por 100 $ y Ultra por 200 $ añaden uso por encima, y los asientos de Team empiezan en 20 $. El plan Free no incluye Claude Code. Elige por cuántas sesiones mantienes abiertas a la vez, no por cuántas horas trabajas.',
    },
    {
      question: '¿Existe un plan aparte de Claude Code o son los mismos planes de Claude?',
      answer: 'Son los mismos. No hay una suscripción de Claude Code: viene incluido en los planes de Claude y sale del mismo bote de uso que las apps de chat. La única vía de facturación aparte es una clave de API de Anthropic, que cobra por token.',
    },
    {
      question: '¿Cuál es la forma más barata de llevar varios agentes de Claude Code a la vez?',
      answer: 'Max por 100 $/mes es el punto de entrada realista para dos o tres sesiones en paralelo, porque Pro te va a frenar a diario. Para cuatro o más, Ultra por 200 $ quita el límite de 5 horas en las cuentas verificadas. Más barato todavía es repartir: deja Claude para lo difícil y mueve el trabajo rutinario a un agente con otro contador, ya que las cuotas son independientes.',
    },
  ],
}

export default guide
