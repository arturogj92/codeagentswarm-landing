import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-codex',
    locale: 'es',
    title: 'Precios de Codex CLI: cada plan y cuál necesitas para agentes en paralelo',
    metaTitle: 'Precios de Codex CLI 2026: planes, límites y coste real',
    metaDescription: 'Nivel gratuito, Go 8 $, Plus 20 $, Pro de 100 a 500 $, Business y créditos. Y lo que no cuentan: qué plan aguanta 3 o 4 sesiones de Codex a la vez.',
    intro: `No existe una suscripción a Codex. Codex viaja dentro del plan de ChatGPT que ya tengas, y a 31 de octubre de 2026 <a href="https://learn.chatgpt.com/docs/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">la página de precios de Codex</a> lista: Free (tareas rápidas), Go por 8 $/mes, Plus por 20 $/mes, Pro por 100, 200 o 500 $/mes, Business por 25 $/usuario/mes (20 $ con facturación anual) y Enterprise. Si prefieres no suscribirte, Codex también acepta una clave de API de OpenAI y factura por token.

Esa es la respuesta de un párrafo, y ya contiene lo que casi todos los artículos comparativos se equivocan: <strong>Pro son ahora tres precios distintos</strong>, y de momento ninguno tiene límite de 5 horas. Plus sí lo tiene, con un rango publicado de mensajes por modelo.

El resto del detalle es donde llega la sorpresa: Codex en la web, en la CLI y en el IDE sale de una única asignación del plan, Plus añade un tope semanal encima de la ventana de 5 horas, y quedarte sin ella no te para si tienes créditos en la cuenta.`,
    ctaText: 'La cuota de Codex se comparte entre la CLI, la web y el IDE, así que se vacía más rápido de lo que esperas cuando hay varias sesiones a la vez. CodeAgentSwarm te enseña lo que gasta cada terminal, junto a todos los demás agentes que ejecutes.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'codex-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'A 31 de octubre de 2026, el acceso a Codex se reparte así entre los planes de ChatGPT. No hay ningún plan que puedas comprar que te dé Codex y nada más.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Acceso a Codex', 'Uso'],
          rows: [
            ['Free', '0 $', 'Limitado', 'Tareas rápidas con GPT-6 Luna'],
            ['Go', '8 $/mes', 'Sí', 'Tareas ligeras con GPT-6 Luna'],
            ['Plus', '20 $/mes', 'Sí', 'GPT-6.1 Sol y GPT-6 Luna, con límite de 5 horas y límites semanales'],
            ['Pro', '100 $/mes', 'Sí', 'Sin límite de 5 horas por ahora; puede haber límites semanales'],
            ['Pro', '200 $/mes', 'Sí', 'Sin límite de 5 horas por ahora; puede haber límites semanales'],
            ['Pro', '500 $/mes', 'Sí', 'Lo mismo, más el modo Ultrafast'],
            ['Business', '25 $/usuario/mes (20 $ anual, mín. 2 usuarios)', 'Sí', 'Espacio de equipo y administración'],
            ['Enterprise y Edu', 'Contactar con ventas', 'Sí', 'Procesamiento prioritario y controles de empresa'],
          ],
          caption: 'Planes de ChatGPT y acceso a Codex según learn.chatgpt.com/docs/pricing, verificados el 31 de octubre de 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Pro es la fuente más habitual de consejos desactualizados sobre el precio de Codex. Cualquier artículo que diga "Pro cuesta 200 $" sin matizar, o que se quede en los niveles de 100 $ y 200 $, va por detrás: la página de precios lista ahora 100, 200 y 500 $. Comprueba la oferta vigente antes de pagar, porque OpenAI ha movido esta escalera más de una vez este año.',
        },
        {
          type: 'paragraph',
          text: 'La página de precios de Codex <strong>no</strong> publica un multiplicador de uso para cada nivel Pro. Te manda al artículo de ayuda de Pro de OpenAI para comparar límites. Lo que sí dice: los planes Pro no tienen ahora límite de 5 horas, puede haber límites semanales y solo Pro de 500 $ tiene el modo Ultrafast. Si Codex es la única razón por la que pagas, empieza en 100 $ y sube solo cuando el límite semanal te pare.',
        },
        {
          type: 'paragraph',
          text: 'Go por 8 $/mes es la puerta de pago más barata, pero OpenAI lo plantea para tareas ligeras y le asigna GPT-6 Luna, no GPT-6.1 Sol. Sirve para trabajos pequeños, no para una jornada.',
        },
      ],
    },
    {
      id: 'cuota-compartida',
      title: 'La trampa: una sola cuota para la CLI, la web y el IDE',
      content: [
        {
          type: 'paragraph',
          text: 'Este es el detalle que pilla a la gente, y merece ir por delante de la mecánica de las ventanas: <strong>el uso de la CLI de Codex sale de la misma asignación del plan que Codex en la web y Codex en tu IDE</strong>. La página de precios de OpenAI dice que los mensajes locales y los chats en la nube comparten la asignación de tu plan, y que ChatGPT Work y Codex también comparten uso.',
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
          text: 'En Plus y Business, Codex te mide en dos capas. La primera es una <strong>ventana móvil de 5 horas</strong>: una sesión intensa puede agotarla mientras tu asignación semanal está casi intacta, y el remedio es esperar a que la ventana se desplace. Los planes Pro se saltan ahora esta capa.',
        },
        {
          type: 'paragraph',
          text: 'La segunda es un <strong>tope semanal</strong> por encima, que según OpenAI "también puede aplicarse" en todos los planes. Cuando se aplican las dos, estar bloqueado no te dice por sí solo con cuál de los dos techos has chocado.',
        },
        {
          type: 'paragraph',
          text: 'Lo raro de Codex es que las cifras publicadas se dan <strong>por modelo y como rangos</strong>, no como un número único. En Plus, OpenAI calcula de 15 a 160 mensajes locales cada 5 horas con GPT-6.1 Sol, de 35 a 285 con GPT-6.1 Terra y de 350 a 3.000 con GPT-6 Luna, porque un modelo que piensa más tiempo consume más de la misma asignación. La consecuencia práctica es que tu elección de modelo cambia tu cuota efectiva más de lo que cambia tu factura, que es justo lo contrario de cómo funciona el pago por token.',
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
            ['1 sesión', 'Plus por 20 $/mes, o Go por 8 $/mes para trabajo ligero', 'Plus tiene GPT-6.1 Sol y un rango publicado por modelo; Go está pensado para tareas ligeras'],
            ['2 o 3 sesiones', 'Pro por 100 $/mes', 'Dos o tres sesiones vaciarían una ventana de 5 horas de Plus dos o tres veces más rápido; Pro no tiene ahora límite de 5 horas'],
            ['4 o más sesiones', 'Pro por 200 o 500 $/mes', 'Cuatro terminales más una extensión de IDE son cinco consumidores en un contador, así que el límite semanal pasa a ser el muro'],
          ],
          caption: 'Regla aproximada, no un número de sesiones que prometa OpenAI. La página de precios de Codex publica rangos por modelo para Plus y ningún multiplicador por nivel Pro, así que tu elección de modelo también mueve esto.',
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
          text: 'Cuando te pasas de la asignación incluida, Codex no se para sin más si tienes créditos en la cuenta. Los créditos son un saldo de recarga que se traduce en consumo de tokens, con precios separados para tokens de entrada, entrada cacheada y salida: GPT-6.1 Sol cuesta 50 créditos por millón de tokens de entrada y 250 por millón de salida, y el modo Fast duplica la tarifa. OpenAI dice que el precio de compra de un crédito depende de tu plan o acuerdo, así que míralo en tu cuenta.',
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
          text: 'Codex acepta una clave de API de OpenAI en lugar de un inicio de sesión de ChatGPT, lo que cambia todo el sistema de cuotas por facturación por token. A 31 de octubre de 2026, <a href="https://developers.openai.com/api/docs/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">los precios de la API de OpenAI</a> ponen GPT-6.1 Sol a 2,00 $ por millón de tokens de entrada, 0,10 $ la entrada cacheada y 10,00 $ por millón de tokens de salida, y GPT-6 Luna a 0,10 $ de entrada y 0,50 $ de salida.',
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
          text: 'Un precio solo significa algo al lado de las alternativas. El nivel Go de 8 $ deja a Codex en la parte baja de la categoría, junto a los planes Plus de 8 $ de Cursor y xAI y Google AI Plus por 4,99 $, y su asignación se comparte con ChatGPT en la web y en tu IDE. Esta es toda la categoría, una línea por agente, revisada el mismo día.',
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
          text: 'El presupuesto realista: evaluar Codex cuesta 0 $, usarlo a diario como asistente de un solo agente cuesta 20 $/mes, con Go por 8 $ para trabajo ligero, y montarlo como flujo de agentes en paralelo cuesta 100 $/mes o más.',
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
      answer: 'La CLI es gratuita y de código abierto, y ChatGPT Free incluye acceso limitado a Codex para tareas rápidas, así que se puede probar de verdad sin pagar. Está dimensionado para evaluar, no para trabajar: cuenta con tocar techo en tu primera tarea real. El acceso de pago empieza en 8 $/mes con el plan Go.',
    },
    {
      question: '¿Cuánto cuesta Codex al mes?',
      answer: 'A 31 de octubre de 2026 depende de tu plan de ChatGPT: Go 8 $, Plus 20 $, Pro 100, 200 o 500 $, Business 25 $ por usuario (20 $ facturado anualmente, mínimo dos usuarios). No existe una suscripción independiente a Codex.',
    },
    {
      question: '¿Qué diferencia hay entre ChatGPT Pro de 100 $ y el de 200 $?',
      answer: 'Sobre todo la cantidad de uso. La página de precios de Codex lista Pro por 100, 200 y 500 $ al mes, dice que los planes Pro no tienen ahora límite de 5 horas y reserva el modo Ultrafast para Pro de 500 $. No publica un multiplicador por nivel en esa página, así que compara los límites en el artículo de ayuda de Pro de OpenAI antes de subir.',
    },
    {
      question: '¿La CLI de Codex tiene cuota propia separada de Codex en la web?',
      answer: 'No, y esto pilla a mucha gente. OpenAI dice que los mensajes locales y los chats en la nube comparten la asignación de tu plan, así que la CLI, la versión web y la extensión del IDE salen todas de tu plan de ChatGPT. Una mañana en la web reduce lo que tu terminal puede hacer esa tarde.',
    },
    {
      question: '¿Qué pasa cuando me quedo sin uso de Codex?',
      answer: 'Si tienes créditos en la cuenta, Codex sigue funcionando y factura contra ellos con una tarifa por modelo, por ejemplo 250 créditos por millón de tokens de salida con GPT-6.1 Sol. Si no los tienes, se para hasta que se reinicia la ventana. Los planes de pago de Claude también pueden activar créditos de uso, así que compara las tarifas y controles de exceso de cada proveedor.',
    },
    {
      question: '¿Uso un plan de ChatGPT o una clave de API para Codex?',
      answer: 'Suscripción para el trabajo interactivo, clave de API para la automatización. El pago por token castiga la salida y los agentes de programación producen mucha, pero un trabajo de CI no debería fallar porque una persona se haya quedado sin su cuota personal. Usar los dos a la vez es un montaje válido.',
    },
    {
      question: '¿Cuáles son los planes de Codex?',
      answer: 'No hay un plan de Codex por separado. Codex va dentro de tu plan de ChatGPT: Free con acceso limitado, Go por 8 $/mes, Plus por 20 $, Pro por 100, 200 o 500 $, Business por 25 $ por usuario y Enterprise. La alternativa de pago por token es una clave de API de OpenAI.',
    },
    {
      question: '¿Necesito una suscripción a ChatGPT para usar Codex CLI?',
      answer: 'No del todo. ChatGPT Free incluye acceso limitado a Codex, y Codex también acepta una clave de API de OpenAI y factura por token. Para el trabajo diario la suscripción sale más barata y más predecible, desde 8 $/mes con el plan Go.',
    },
    {
      question: '¿Qué plan de Codex necesito para llevar varias sesiones en paralelo?',
      answer: 'Plus por 20 $ lleva una sesión con holgura. Dos o tres suelen pedir Pro por 100 $, que ahora no tiene límite de 5 horas, y cuatro o más apuntan a Pro por 200 o 500 $. Recuerda que la asignación se comparte con Codex en la web y en el IDE, así que esas superficies cuentan como sesiones extra.',
    },
  ],
}

export default guide
