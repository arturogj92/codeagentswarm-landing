import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-codex',
    locale: 'es',
    title: 'Precios de Codex CLI: cada plan y cuál necesitas para agentes en paralelo',
    metaTitle: 'Precios de Codex CLI 2026: planes, límites y coste real',
    metaDescription: 'Nivel gratuito, Go 8 $, Plus 20 $, Pro 100 $ o 200 $, Business y créditos. Y lo que no cuentan: qué plan aguanta 3 o 4 sesiones de Codex a la vez.',
    intro: `No existe una suscripción a Codex. Codex viaja dentro del plan de ChatGPT que ya tengas, y a agosto de 2026 la oferta es: Free (Codex limitado), Go por 8 $/mes, Plus por 20 $/mes, Pro por 100 $/mes con 5x de uso o por 200 $/mes con 20x, Business por 25 $/usuario/mes y Enterprise. Si prefieres no suscribirte, Codex también acepta una clave de API de OpenAI y factura por token.

Esa es la respuesta de un párrafo, y ya contiene lo que casi todos los artículos comparativos se equivocan: <strong>Pro son ahora dos precios distintos</strong>. OpenAI añadió un nivel Pro de 100 $ en abril de 2026, entre Plus y el Pro original de 200 $, y los dos se diferencian en el multiplicador de uso y en qué más traen empaquetado, no en qué modelos te dan.

El resto del detalle es donde llega la sorpresa: la CLI, la versión web y la extensión del IDE beben todas de una única cuota compartida, esa cuota tiene ventana de 5 horas y tope semanal, y quedarte sin ella no te para si tienes créditos en la cuenta.`,
    ctaText: 'La cuota de Codex se comparte entre la CLI, la web y el IDE, así que se vacía más rápido de lo que esperas cuando hay varias sesiones a la vez. CodeAgentSwarm te enseña lo que gasta cada terminal, junto a todos los demás agentes que ejecutes.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-09-01',
    alternateSlug: 'codex-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'A agosto de 2026, el acceso a Codex se reparte así entre los planes de ChatGPT. No hay ningún plan que puedas comprar que te dé Codex y nada más.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Acceso a Codex', 'Uso'],
          rows: [
            ['Free', '0 $', 'Limitado', 'Suficiente para probarlo, no para trabajar'],
            ['Go', '8 $/mes', 'Sí', 'El acceso real más barato'],
            ['Plus', '20 $/mes', 'Sí', 'La base 1x a la que casi todos se refieren'],
            ['Pro', '100 $/mes', 'Sí', '5x Plus'],
            ['Pro', '200 $/mes', 'Sí', '20x Plus, más el resto del paquete Pro'],
            ['Business', '25 $/usuario/mes (20 $ anual, mín. 2 usuarios)', 'Sí', 'Bote de equipo y administración'],
            ['Enterprise', 'A medida', 'Sí', 'Negociado'],
          ],
          caption: 'Planes de ChatGPT y acceso a Codex, agosto de 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El nivel Pro de 100 $ es nuevo desde abril de 2026 y es la fuente más habitual de consejos desactualizados sobre el precio de Codex. Cualquier artículo que diga "Pro cuesta 200 $" sin matizar es anterior a ese cambio. Comprueba la oferta vigente antes de pagar, porque OpenAI ha movido esta escalera más de una vez en el último año.',
        },
        {
          type: 'paragraph',
          text: 'Los dos niveles Pro te dan <strong>el mismo conjunto de modelos</strong>. La diferencia es el multiplicador, 5x contra 20x, y qué más viene en la caja: el nivel de 200 $ empaqueta el resto del paquete Pro mientras que el de 100 $ es a propósito la opción centrada en programar. Si Codex es la única razón por la que pagas, 100 $ es el nivel que existe para ti.',
        },
        {
          type: 'paragraph',
          text: 'Go por 8 $/mes merece una mención porque es sinceramente la forma más barata de ejecutar un agente de programación de verdad entre todos los grandes proveedores. Va justo, pero no es una demo.',
        },
      ],
    },
    {
      id: 'cuota-compartida',
      title: 'La trampa: una sola cuota para la CLI, la web y el IDE',
      content: [
        {
          type: 'paragraph',
          text: 'Este es el detalle que pilla a la gente, y merece ir por delante de la mecánica de las ventanas: <strong>el uso de la CLI de Codex sale de los mismos límites que Codex en la web y Codex en tu IDE</strong>. Son tres puertas de entrada a una única asignación.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica eso significa que una mañana llevando Codex desde la interfaz web reduce directamente lo que tu terminal puede hacer esa tarde, y que la extensión del IDE funcionando en segundo plano descuenta del agente que creías que tenía la cuota para él solo. Si usas más de una superficie, tu asignación efectiva es más pequeña de lo que sugiere cualquier estimación hecha con una sola.',
        },
        {
          type: 'paragraph',
          text: 'Añade terminales en paralelo encima y la aritmética se pone dura rápido. Cuatro sesiones de Codex más una extensión de IDE son cinco consumidores en un mismo contador.',
        },
      ],
    },
    {
      id: 'como-funciona-la-cuota',
      title: 'Cómo funciona la cuota de verdad: ventana de 5 horas más tope semanal',
      content: [
        {
          type: 'paragraph',
          text: 'Como casi toda su competencia, Codex te mide en dos capas. La primera es una <strong>ventana móvil de 5 horas</strong>: una sesión intensa puede agotarla mientras tu asignación semanal está casi intacta, y el remedio es esperar a que la ventana se desplace.',
        },
        {
          type: 'paragraph',
          text: 'La segunda es un <strong>tope semanal</strong> por encima. Las dos se aplican a la vez, así que estar bloqueado no te dice por sí solo con cuál de los dos techos has chocado.',
        },
        {
          type: 'paragraph',
          text: 'Lo raro de Codex es que las cifras publicadas se dan <strong>por modelo y como rangos</strong>, no como un número único. En Plus, por ejemplo, los rangos documentados por cada cinco horas cambian bastante entre los modelos que razonan mucho y los rápidos, porque un modelo que piensa más tiempo consume más de la misma asignación. La consecuencia práctica es que tu elección de modelo cambia tu cuota efectiva más de lo que cambia tu factura, que es justo lo contrario de cómo funciona el pago por token.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si chocas con el muro a menudo, prueba a bajar a un modelo más rápido para el trabajo rutinario antes de subir de nivel. En una suscripción el modelo barato no te ahorra dinero, te compra más peticiones dentro de la misma ventana, que suele ser lo que querías en realidad.',
        },
      ],
    },
    {
      id: 'agentes-en-paralelo',
      title: 'Qué plan necesitas cuando tienes varias sesiones de Codex a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Como la CLI, la versión web y la extensión del IDE comparten una única asignación, la pregunta que decide tu nivel no es cuántas horas programas, sino <strong>cuántas sesiones de Codex están consumiendo a la vez</strong>. Cada terminal extra es otro consumidor en el mismo contador, y la extensión del IDE que olvidaste abierta también.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Nivel que suele aguantar', 'Por qué'],
          rows: [
            ['1 sesión', 'Go por 8 $/mes, o Plus por 20 $/mes', 'Plus es la base 1x a la que casi todos se refieren; Go va justo pero es acceso real, no una demo'],
            ['2 o 3 sesiones', 'Pro por 100 $/mes, 5x Plus', 'Dos o tres sesiones vacían la misma ventana de 5 horas dos o tres veces más rápido, y cada superficie que uses suma encima'],
            ['4 o más sesiones', 'Pro por 200 $/mes, 20x Plus', 'Cuatro terminales más una extensión de IDE son cinco consumidores en un contador, así que el tope semanal llega pronto'],
          ],
          caption: 'Regla aproximada deducida de los multiplicadores publicados, no un número de sesiones que prometa OpenAI. Codex publica rangos por modelo en vez de cifras fijas, así que tu elección de modelo también mueve esto.',
        },
        {
          type: 'paragraph',
          text: 'Antes de subir de nivel, prueba las dos palancas baratas que ya cubre esta guía: baja a un modelo más rápido para el trabajo rutinario, que te compra más peticiones dentro de la misma ventana, y guarda los créditos para la entrega urgente puntual. La mecánica de llevar varios terminales está en <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Codex</a>, y el flujo completo en <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Codex</a>.',
        },
      ],
    },
    {
      id: 'creditos',
      title: 'Créditos: la válvula de escape encima del plan',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando te pasas de la asignación incluida, Codex no se para sin más si tienes créditos en la cuenta. Los créditos son un saldo de recarga que se traduce en consumo de tokens, con precios separados para tokens de entrada, entrada cacheada y salida, y cuestan alrededor de 0,04 $ cada uno a agosto de 2026.',
        },
        {
          type: 'paragraph',
          text: 'Es un diseño útil: en Codex puedes comprar tu salida de una entrega urgente. Los planes de pago de Claude ya permiten algo parecido mediante créditos de uso, así que la diferencia real está en cómo mide y cobra cada proveedor el exceso. Trata los créditos como un rescate ocasional y no como capacidad normal, o una suscripción de 20 $ deja de ser un presupuesto de 20 $.',
        },
        {
          type: 'paragraph',
          text: 'La regla honesta: si compras créditos más de una o dos veces al mes, subir de nivel sale más barato que la costumbre.',
        },
      ],
    },
    {
      id: 'pago-por-token',
      title: 'La alternativa de pago por token: una clave de API de OpenAI',
      content: [
        {
          type: 'paragraph',
          text: 'Codex acepta una clave de API de OpenAI en lugar de un inicio de sesión de ChatGPT, lo que cambia todo el sistema de cuotas por facturación por token. A agosto de 2026, GPT-5.3-Codex cuesta 1,75 $ por millón de tokens de entrada y 14,00 $ por millón de tokens de salida.',
        },
        {
          type: 'paragraph',
          text: 'Para trabajo interactivo suele ser el peor trato: los agentes de programación generan mucha salida y la salida es donde muerde el pago por token. Donde gana es en la <strong>automatización</strong>. Un trabajo de CI, una refactorización programada, un lote de migraciones de repositorio, cualquier cosa que corra sin supervisión y que no puede fallar porque a una persona se le haya agotado su cuota personal, va en una clave de API con un límite de gasto puesto en la consola de OpenAI.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Los dos caminos no se excluyen. Deja tu portátil con la suscripción y dale a tu pipeline de CI su propia clave de API, y así ninguno puede dejar sin comer al otro. Eso sí, que la clave viva en el gestor de secretos de CI y no en el perfil de shell donde programas.',
        },
      ],
    },
    {
      id: 'comparar-con-otros-agentes',
      title: 'Cómo se compara el precio de Codex con las demás CLI de agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Un precio solo significa algo al lado de las alternativas. El nivel Go de 8 $ convierte a Codex en la entrada real más barata de la categoría, y Codex es además el único cuya cuota se comparte con una app web y una extensión de IDE. Esta es toda la categoría, una línea por agente, revisada el mismo día.',
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
          text: 'Cada fila tiene su propia guía con la escalera completa y la mecánica de cuotas detrás: <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/es/guias/precios-y-acceso-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> y <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent</a>.',
        },
      ],
    },
    {
      id: 'es-gratis',
      title: '¿Codex es gratis? Qué permite de verdad el nivel gratuito',
      content: [
        {
          type: 'paragraph',
          text: 'En parte. La CLI de Codex es una descarga gratuita y de código abierto, y ChatGPT Free incluye algo de acceso a Codex. A diferencia de <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, que no está en su nivel gratuito en absoluto, Codex se puede probar de verdad sin pagar.',
        },
        {
          type: 'paragraph',
          text: 'Lo que no puedes es trabajar con él. La asignación gratuita está dimensionada para que te formes una opinión, no para sacar adelante un proyecto. Cuenta con tocar techo en tu primera tarea real.',
        },
        {
          type: 'paragraph',
          text: 'El presupuesto realista: evaluar Codex cuesta 0 $, usarlo a diario como asistente de un solo agente cuesta entre 8 y 20 $/mes, y montarlo como flujo de agentes en paralelo cuesta 100 $/mes. Ese nivel Go de 8 $ convierte a Codex en el punto de entrada serio más barato de la categoría.',
        },
      ],
    },
    {
      id: 'vigilar-la-cuota',
      title: 'Vigilar la cuota de Codex mientras trabajan los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Una cuota compartida entre tres superficies, medida en dos ventanas y con rangos por modelo en vez de cifras fijas, no es algo que puedas llevar en la cabeza. Y el modo de fallo es el de siempre: te enteras cuando el agente se para.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, el espacio de trabajo de escritorio para ejecutar varios agentes de IA de terminal en paralelo, muestra tu consumo de Codex junto a la cuota de tus otros agentes, para que veas venir el muro mientras trabajan en lugar de descubrirlo por un terminal parado.',
        },
        {
          type: 'paragraph',
          text: 'Encaja con el patrón de <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Codex</a>: reparte el trabajo entre agentes que van a contadores distintos, para que agotar un proveedor no detenga toda la sesión. Codex y Claude facturan de botes completamente separados, lo cual es mejor razón para usar los dos que cualquier benchmark.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Codex es gratis?',
      answer: 'La CLI es gratuita y de código abierto, y ChatGPT Free incluye acceso limitado a Codex, así que se puede probar de verdad sin pagar. Está dimensionado para evaluar, no para trabajar: cuenta con tocar techo en tu primera tarea real. El acceso de pago empieza en 8 $/mes con el plan Go.',
    },
    {
      question: '¿Cuánto cuesta Codex al mes?',
      answer: 'A agosto de 2026 depende de tu plan de ChatGPT: Go 8 $, Plus 20 $, Pro 100 $ (5x Plus) o 200 $ (20x Plus), Business 25 $ por usuario (20 $ facturado anualmente, mínimo dos usuarios). No existe una suscripción independiente a Codex.',
    },
    {
      question: '¿Qué diferencia hay entre ChatGPT Pro de 100 $ y el de 200 $?',
      answer: 'El multiplicador de uso y el resto del paquete, no los modelos. Los dos dan el mismo conjunto de modelos; 100 $ da 5x el uso de Plus y es la opción centrada en programar, 200 $ da 20x más el paquete Pro completo. El nivel de 100 $ salió en abril de 2026, y por eso los artículos antiguos solo mencionan 200 $.',
    },
    {
      question: '¿La CLI de Codex tiene cuota propia separada de Codex en la web?',
      answer: 'No, y esto pilla a mucha gente. La CLI, la versión web y la extensión del IDE salen todas de una única asignación compartida en tu plan de ChatGPT. Una mañana en la web reduce lo que tu terminal puede hacer esa tarde.',
    },
    {
      question: '¿Qué pasa cuando me quedo sin uso de Codex?',
      answer: 'Si tienes créditos en la cuenta, Codex sigue funcionando y factura contra ellos a unos 0,04 $ por crédito. Si no los tienes, se para hasta que se reinicia la ventana. Los planes de pago de Claude también pueden activar créditos de uso, así que compara las tarifas y controles de exceso de cada proveedor.',
    },
    {
      question: '¿Uso un plan de ChatGPT o una clave de API para Codex?',
      answer: 'Suscripción para el trabajo interactivo, clave de API para la automatización. El pago por token castiga la salida y los agentes de programación producen mucha, pero un trabajo de CI no debería fallar porque una persona se haya quedado sin su cuota personal. Usar los dos a la vez es un montaje válido.',
    },
    {
      question: '¿Cuáles son los planes de Codex?',
      answer: 'No hay un plan de Codex por separado. Codex va dentro de tu plan de ChatGPT: Free con acceso limitado, Go por 8 $/mes, Plus por 20 $, Pro por 100 $ (5x Plus) o 200 $ (20x Plus), Business por 25 $ por usuario y Enterprise. La alternativa de pago por token es una clave de API de OpenAI.',
    },
    {
      question: '¿Necesito una suscripción a ChatGPT para usar Codex CLI?',
      answer: 'No del todo. ChatGPT Free incluye acceso limitado a Codex, y Codex también acepta una clave de API de OpenAI y factura por token. Para el trabajo diario la suscripción sale más barata y más predecible, desde 8 $/mes con el plan Go.',
    },
    {
      question: '¿Qué plan de Codex necesito para llevar varias sesiones en paralelo?',
      answer: 'Plus por 20 $ lleva una sesión con holgura. Dos o tres suelen pedir Pro por 100 $, que es 5x Plus, y cuatro o más apuntan a Pro por 200 $. Recuerda que la asignación se comparte con Codex en la web y en el IDE, así que esas superficies cuentan como sesiones extra.',
    },
  ],
}

export default guide
