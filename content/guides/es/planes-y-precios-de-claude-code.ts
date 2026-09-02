import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-claude-code',
    locale: 'es',
    title: 'Precios de Claude Code: cada plan y cuál necesitas para agentes en paralelo',
    metaTitle: 'Precios de Claude Code 2026: planes, límites y coste real',
    metaDescription: 'Pro 20 $, Max 5x 100 $, Max 20x 200 $, asientos Team y pago por token. Y lo que la web oficial no cuenta: qué plan aguanta 3 o 4 agentes a la vez.',
    intro: `Claude Code viene con una suscripción de Claude, y a agosto de 2026 los planes son: Free (sin Claude Code), Pro por 20 $/mes, Max 5x desde 100 $/mes, Max 20x por 200 $/mes, Team desde 20 $/asiento y Enterprise. También existe la vía de pago por token a través de la API de Anthropic si prefieres no suscribirte.

Esa es la respuesta de un párrafo. El dinero está en los detalles: Anthropic publica multiplicadores, no recuentos de tokens, así que "5x" es relativo a Pro y no un número contra el que puedas presupuestar. Hay dos capas de cuota apiladas, una ventana móvil de 5 horas y un ciclo semanal, y el ciclo semanal son en realidad dos topes distintos. Tu uso de Claude Code y tu uso del chat de Claude salen del mismo bote, así que un día intenso en la app de chat se come tu presupuesto de programación.

Esta guía deja claro lo que se sabe, fecha cada número y señala qué partes conviene volver a mirar en la página oficial de precios antes de pagar.`,
    ctaText: 'Llevar varios agentes de Claude Code contra una cuota semanal compartida da mucho menos estrés cuando puedes verla. CodeAgentSwarm muestra tu consumo real de Claude por terminal, junto al de todos los demás agentes que ejecutes.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-09-01',
    alternateSlug: 'claude-code-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'A agosto de 2026, esta es la oferta en la propia página de precios de Anthropic. La columna importante es la última: Claude Code no está en el nivel gratuito, ni siquiera de forma limitada.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Claude Code', 'Uso'],
          rows: [
            ['Free', '0 $', 'No', 'Solo chat'],
            ['Pro', '17 $/mes anual, 20 $/mes mensual', 'Sí', 'La base 1x'],
            ['Max 5x', 'Desde 100 $/mes', 'Sí', '5x Pro'],
            ['Max 20x', '200 $/mes', 'Sí', '20x Pro'],
            ['Team', '20 $/asiento anual, 25 $/asiento mensual', 'Sí', 'Más que Pro'],
            ['Team asiento premium', '100 $/asiento anual, 125 $/asiento mensual', 'Sí', 'Cupo de nivel Max por asiento'],
            ['Enterprise', 'A medida, asiento más consumo', 'Sí', 'Escala con el contrato'],
          ],
          caption: 'Planes de Anthropic según claude.com/pricing, agosto de 2026.',
        },
        {
          type: 'paragraph',
          text: 'Dos cosas importan más que los multiplicadores. Primero, <strong>un solo bote por cuenta</strong>: Claude Code, las apps de escritorio y web de Claude y todo lo demás de tu suscripción beben de la misma asignación, así que una tarde de conversaciones largas en el chat reduce directamente cuánto puedes programar esa semana. Segundo, <strong>los multiplicadores describen capacidad relativa, no tokens</strong>. Anthropic no publica deliberadamente una cuota en tokens para ningún plan, porque el ritmo de consumo depende del tamaño de tu contexto, del modelo que elijas y de cuánto lee el agente antes de actuar.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'El descuento anual de Pro es real y se pasa por alto a menudo: 17 $/mes facturado anualmente frente a 20 $/mes facturado mes a mes, o sea 204 $ el año en vez de 240 $. En Team la diferencia en valor absoluto es mayor: 20 $ frente a 25 $ por asiento y mes.',
        },
      ],
    },
    {
      id: 'como-funciona-la-cuota',
      title: 'Cómo funciona la cuota de verdad: una ventana de 5 horas y dos topes semanales',
      content: [
        {
          type: 'paragraph',
          text: 'La cuota de Claude Code tiene dos capas y vas a notar las dos. La primera es una <strong>ventana móvil de 5 horas</strong>. Empieza con tu primer mensaje, no a una hora fija del reloj, y se va desplazando. Una tarde intensa puede agotarla mientras tu asignación semanal está casi intacta. Puedes esperar a que la ventana avance o, en un plan de pago compatible, activar créditos de uso para continuar fuera del límite incluido.',
        },
        {
          type: 'paragraph',
          text: 'La segunda capa es un <strong>ciclo semanal</strong>, y aquí es donde casi todo el mundo se equivoca: no es un tope, son dos. Hay un límite semanal para todos los modelos combinados y un segundo límite semanal que acota Opus en concreto. Puedes quedarte bloqueado en Opus el resto de la semana teniendo de sobra en la asignación combinada para Sonnet. Ambos se reinician a una hora fija ligada a tu cuenta, que puedes ver en Ajustes y luego Uso. Nada se acumula de una semana a otra.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Este modelo de dos capas es la razón de que "si apenas lo he usado esta semana" y "has alcanzado tu límite" puedan ser ciertas a la vez. Antes de dar por hecho que algo se ha roto, mira cuál de los tres topes has tocado en realidad: la ventana de 5 horas, el límite semanal combinado o el límite semanal del modelo concreto.',
        },
        {
          type: 'paragraph',
          text: 'Anthropic introdujo los límites semanales en agosto de 2025 y ha dicho que afectan a menos del 5% de sus suscriptores, lo cual es cierto para quien usa el chat y bastante menos tranquilizador para quien ejecuta agentes de programación. Un solo agente trabajando en una refactorización grande consume más en una hora que un usuario de chat en toda una semana.',
        },
        {
          type: 'paragraph',
          text: 'Para saber dónde estás, escribe <code>/usage</code> dentro de una sesión de Claude Code. Te dice tu consumo actual y qué ventanas están cerca del techo.',
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
          text: 'La forma honesta de elegir: si llevas un agente a la vez y sobre todo revisas lo que produce, Pro te sobra y Max es dinero que no necesitas gastar. Si mantienes tres o cuatro agentes ocupados en proyectos distintos, Pro te va a frenar a diario y Max 5x es el punto de entrada real. Max 20x es para quien tiene agentes trabajando prácticamente sin parar, o para un equipo pequeño compartiendo una cuenta, cosa que los términos de Anthropic no fomentan.',
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
            ['2 o 3 sesiones', 'Max 5x, desde 100 $/mes', 'Dos o tres agentes vacían la misma ventana de 5 horas unas dos o tres veces más rápido que uno'],
            ['4 o más sesiones', 'Max 20x, 200 $/mes', 'Cuatro agentes llegan al techo de 5 horas unas cuatro veces antes, y los topes semanales llegan con ellos'],
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
          text: 'No estás obligado a suscribirte. Claude Code acepta una clave de API de Anthropic y factura por token, sin cuota mensual y sin muro semanal. A agosto de 2026 estas son las tarifas por millón de tokens:',
        },
        {
          type: 'table',
          headers: ['Modelo', 'Entrada', 'Salida'],
          rows: [
            ['Claude Opus 5', '5,00 $', '25,00 $'],
            ['Claude Sonnet 5', '2,00 $', '10,00 $'],
            ['Claude Haiku 4.5', '1,00 $', '5,00 $'],
          ],
          caption: 'Tarifas de la API propia de Anthropic, agosto de 2026. Bedrock y Vertex los operan terceros y tienen precios aparte.',
        },
        {
          type: 'paragraph',
          text: 'El número que decide si esto sale barato o ruinoso es la <strong>caché de prompts</strong>. Las lecturas de caché cuestan alrededor de una décima parte del precio base de entrada, y los agentes de programación reenvían en cada turno un contexto grande y bastante estable, que es justo el tráfico para el que se diseñaron las cachés. Una sesión de agente que se porta bien se apoya sobre todo en la tarifa cacheada. Un agente que no para de invalidar su caché, no.',
        },
        {
          type: 'paragraph',
          text: 'La contrapartida es la evidente: el uso medido puede convertir un agente desbocado en una factura desbocada. La suscripción solo mantiene un coste predecible mientras los créditos de uso estén desactivados; si los activas, el trabajo que supera el límite incluido se cobra con las tarifas estándar de API. Para picos, CI y evaluaciones, una clave de API separada es más fácil de presupuestar y limitar.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Puedes cambiar por proyecto. Claude Code lee ANTHROPIC_API_KEY cuando está definida, así que un trabajo de CI puede facturar por token mientras tu portátil sigue usando la suscripción. Eso sí, cuidado con dejarte esa variable exportada en la shell donde programas, o pagarás dos veces sin enterarte.',
        },
      ],
    },
    {
      id: 'comparar-con-otros-agentes',
      title: 'Cómo se compara el precio de Claude Code con las demás CLI de agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Un precio solo significa algo al lado de las alternativas. Claude Code es la única de las siete sin ninguna vía gratuita, y su precio de entrada está en la mitad de la tabla, no arriba del todo. Esta es toda la categoría, una línea por agente, revisada el mismo día.',
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
          text: 'El presupuesto realista: evaluar Claude Code cuesta 20 $ o menos, usarlo a diario como asistente de un solo agente cuesta 20 $/mes, y montarlo como flujo de agentes en paralelo cuesta 100 $/mes.',
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
      answer: 'A agosto de 2026: Pro 20 $ (o 17 $ facturado anualmente), Max 5x desde 100 $, Max 20x 200 $ y Team desde 20 $ por asiento facturado anualmente. Todos incluyen Claude Code y todos comparten un único bote de uso con las apps de chat de Claude.',
    },
    {
      question: '¿Cuál es la diferencia entre Max 5x y Max 20x?',
      answer: 'Solo la cantidad de uso: 5x y 20x la asignación de Pro respectivamente, por 100 $ y 200 $ al mes. Los dos incluyen los mismos modelos y las mismas funciones. Elige por cuántos agentes llevas en paralelo, no por cuántas horas trabajas.',
    },
    {
      question: '¿Qué es el límite de 5 horas de Claude Code?',
      answer: 'Una ventana móvil que arranca con tu primer mensaje y se va desplazando, montada encima de los límites semanales. Un uso intenso dentro de cualquier tramo de 5 horas puede agotarla, y entonces Claude Code se para hasta que la ventana avanza. Varias sesiones de agente en paralelo llegan ahí varias veces más rápido que un solo terminal.',
    },
    {
      question: '¿Por qué me bloquea Opus pero Sonnet sigue funcionando?',
      answer: 'Porque el límite semanal son en realidad dos límites: uno para todos los modelos combinados y otro aparte que acota Opus. Tocar el tope de Opus deja intacta tu asignación combinada, así que Sonnet sigue funcionando el resto de la semana.',
    },
    {
      question: '¿La cuota de Claude Code que no gasto se acumula?',
      answer: 'No. Tanto la ventana de 5 horas como el ciclo semanal se reinician sin arrastrar nada. Aunque no gastes nada en toda la semana, empiezas el siguiente ciclo con la misma asignación.',
    },
    {
      question: '¿Cómo consulto mi consumo de Claude Code?',
      answer: 'Escribe /usage dentro de una sesión de Claude Code, o abre Ajustes y luego Uso en la web de Claude para ver la hora de reinicio semanal. Si ejecutas Claude Code dentro de CodeAgentSwarm, la app te lleva las ventanas y te las enseña en su indicador de cuota.',
    },
    {
      question: '¿Qué suscripción de Claude necesito para Claude Code?',
      answer: 'Cualquiera de pago. Pro por 20 $/mes es la entrada, Max 5x desde 100 $ y Max 20x por 200 $ añaden uso por encima, y los asientos de Team empiezan en 20 $. El plan Free no incluye Claude Code. Elige por cuántas sesiones mantienes abiertas a la vez, no por cuántas horas trabajas.',
    },
    {
      question: '¿Existe un plan aparte de Claude Code o son los mismos planes de Claude?',
      answer: 'Son los mismos. No hay una suscripción de Claude Code: viene incluido en los planes de Claude y sale del mismo bote de uso que las apps de chat. La única vía de facturación aparte es una clave de API de Anthropic, que cobra por token.',
    },
    {
      question: '¿Cuál es la forma más barata de llevar varios agentes de Claude Code a la vez?',
      answer: 'Max 5x por 100 $/mes es el punto de entrada realista para tres o cuatro sesiones en paralelo, porque Pro te va a frenar a diario. Más barato todavía es repartir: deja Claude para lo difícil y mueve el trabajo rutinario a un agente con otro contador, ya que las cuotas son independientes.',
    },
  ],
}

export default guide
