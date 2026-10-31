import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-acceso-grok-build',
    locale: 'es',
    title: 'Precios y acceso de Grok Build: planes, coste de API y agentes en paralelo',
    metaTitle: 'Precios de Grok Build 2026: gratis, SuperGrok y API',
    metaDescription: 'Grok Build se prueba gratis. X Subscription desde 8 $, API de Grok 4.7 a 2 $ entrada y 6 $ salida. Y qué le hacen a tus límites varias sesiones a la vez.',
    intro: `Grok Build se puede probar gratis. Desde el 12 de octubre de 2026, xAI ofrece a los clientes nuevos <a href="https://x.ai/news/x-subscription" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">The X Subscription</a>: Plus por 8 $/mes, Premium por 30 $, Super por 100 $ y Ultra por 200 $, con una única bolsa de uso de modelos Grok compartida entre Grok y Cursor. Quien ya tenía SuperGrok conserva su plan. Para automatización existe una vía aparte de pago por token mediante la API de xAI.

Antes de nada, la desambiguación que casi ninguna página hace. Hay tres cosas distintas que se llaman Grok: el <strong>chatbot Grok</strong> (la app de chat de consumo de xAI), <strong>Grok Build</strong> (la CLI oficial de programación de xAI, el comando <code>grok</code>, que es de lo que va esta página y lo que soporta CodeAgentSwarm), y varios proyectos de la comunidad en GitHub sin relación con xAI llamados <code>grok-cli</code>. Si instalas el que no es, nada de lo que hay aquí aplica.

Las fuentes vigentes son la <a href="https://x.ai/build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de Grok Build</a> y el <a href="https://x.ai/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">comparador de planes</a> de xAI. Los artículos que presentan Grok Build como una herramienta solo de pago, o SuperGrok como la única forma de entrar, ya están desactualizados.`,
    ctaText: 'CodeAgentSwarm es un espacio de trabajo sobre tu acceso a xAI, no un revendedor. Tú aportas una cuenta de xAI o una clave de API; nosotros añadimos supervisión multi-terminal, visibilidad de cuota e historial buscable.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Precios', 'acceso', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-10-31',
    alternateSlug: 'grok-build-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'Grok Build se puede probar gratis y los planes de pago suben los límites. Desde el 12 de octubre de 2026, The X Subscription está disponible para clientes nuevos. Esta es la oferta a 31 de octubre de 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Grok Build', 'Notas'],
          rows: [
            ['Free', '0 $', 'Sí', 'Uso limitado; no incluye Grok 4.7 Fast'],
            ['Plus', '8 $/mes', 'Desde la bolsa Grok del plan', 'Más uso de Grok y Cursor'],
            ['Premium', '30 $/mes', 'Desde la bolsa Grok del plan', '4x el uso de Plus; incluye las ventajas de SuperGrok'],
            ['Super', '100 $/mes', 'Desde la bolsa Grok del plan', '15x el uso de Plus'],
            ['Ultra', '200 $/mes', 'Desde la bolsa Grok del plan', '50x el uso de Plus'],
            ['Planes SuperGrok', 'Suscriptores actuales', 'Sí', 'Nada cambia para quien ya está suscrito; cambiar es opcional'],
            ['API de xAI', 'Por token', 'Sí, headless', 'Para CI y automatización'],
          ],
          caption: 'Vías de acceso a Grok Build según el anuncio de The X Subscription del 12 de octubre de 2026 y la documentación de la API de Grok, verificadas el 31 de octubre de 2026. Revisa el checkout en vivo de xAI antes de presupuestar un despliegue.',
        },
        {
          type: 'paragraph',
          text: 'No hace falta pagar para evaluar la herramienta. La escalera de pago es ahora un conjunto de múltiplos de Plus: Premium da 4x, Super 15x y Ultra 50x, y xAI dice que cada plan incluye al menos el doble de uso de programación con sus modelos que el plan comparable de Cursor. El uso por encima del plan se cobra a precio de lista de la API mediante recargas. El anuncio no desglosa la bolsa compartida por producto, así que no dice cuánto de ella puede gastar Grok Build por sí solo.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'xAI cambia sus planes con rapidez. Trata la tabla como una foto fechada y confirma el checkout antes de comprometer a un equipo. Si una página dice que Grok Build es solo de pago, presenta SuperGrok como la única vía de pago o cita peticiones exactas sin una fuente primaria de xAI, dala por caducada.',
        },
      ],
    },
    {
      id: 'lo-que-no-se-sabe',
      title: 'Qué está publicado y qué no',
      content: [
        {
          type: 'paragraph',
          text: 'Esta guía da los precios que xAI publica. No inventa una cuota de peticiones porque xAI describe los límites de forma relativa y no publica una cifra estable para cada nivel de Grok Build.',
        },
        {
          type: 'paragraph',
          text: 'El consejo práctico sigue siendo válido: tu ritmo de consumo depende de cuántos agentes lleves en paralelo, porque cada uno lee ficheros, ejecuta herramientas y razona por su cuenta. Consulta la vista de uso de tu cuenta en vez de presupuestar desde un artículo antiguo.',
        },
        {
          type: 'paragraph',
          text: 'Si estás presupuestando un flujo de agentes en paralelo, ese es el número que decide tu nivel, y es el argumento que desarrolla <a href="/es/guias/enjambre-de-agentes-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Grok Build</a>.',
        },
      ],
    },
    {
      id: 'via-api',
      title: 'La vía de pago por token: la API de xAI',
      content: [
        {
          type: 'paragraph',
          text: 'Para trabajo sin supervisión, <code>XAI_API_KEY</code> es la vía headless y cambia los límites de la cuenta por facturación por token. Grok 4.7 es el modelo predeterminado de Grok Build. Su <a href="https://docs.x.ai/developers/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tarifa estándar de API</a> es de 2 $ por millón de tokens de entrada, 0,50 $ por millón de entrada en caché y 6 $ por millón de salida, y sube a 4 $, 1 $ y 12 $ cuando el prompt llega a 200K tokens.',
        },
        {
          type: 'paragraph',
          text: 'Grok 4.7 tiene una ventana de contexto de 500K. Su entrada de 2 $ iguala a Claude Sonnet 5.5 y su salida de 6 $ cuesta menos que los 10 $ de Sonnet. Grok 4.7 Fast solo está en Cursor y Grok Build, se cobra a través de tu plan y no entra en el nivel gratuito. Compáralo con <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">las tarifas de Claude Code</a> antes de elegir un modelo para CI.',
        },
        {
          type: 'paragraph',
          text: 'La clave de API sigue funcionando mientras haya saldo y margen de uso, así que la automatización necesita presupuesto y alertas. Pon un límite de gasto en xAI y guarda la clave en el gestor de secretos de CI, no en la shell donde programas.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Interactivo: login por navegador en el primer arranque\ngrok\n\n# Headless / CI\nexport XAI_API_KEY=...\ngrok -p "ejecuta la migración y dime qué ha cambiado"',
        },
      ],
    },
    {
      id: 'agentes-paralelos',
      title: 'Qué le hace al coste ejecutar varias sesiones de Grok Build a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Con un plan, las sesiones extra no añaden ninguna tarifa. Consumen más rápido la misma asignación de la cuenta, porque cada agente lee ficheros, ejecuta herramientas y razona por su cuenta. Cuatro terminales de Grok Build beben exactamente de la asignación de la que beberían cuatro terminales sueltos, así que el número que decide es cuántos agentes tienes ocupados, no en qué app se ejecutan.',
        },
        {
          type: 'paragraph',
          text: 'Con una clave de API el efecto es un coste directo en vez de un muro más temprano. Grok 4.7 cobra 2 $ por millón de tokens de entrada, 0,50 $ por millón de entrada en caché y 6 $ por millón de salida en el tramo estándar de contexto, con precio mayor por encima de 200K, así que el gasto de una hora sigue al número de agentes realmente trabajando.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Qué esperar', 'Qué vigilar'],
          rows: [
            ['1', 'Una sesión contra los límites de tu plan, o un solo flujo de tokens contra la clave de API.', 'Nada raro. Consulta la vista de uso de tu cuenta para ver los límites que te aplican.'],
            ['2 a 3', 'Los límites del plan llegan entre dos y tres veces antes. En la API, el gasto en tokens sube más o menos en la misma proporción.', 'Las peticiones por encima de 200K de contexto cuestan más, y las investigaciones largas llegan antes a ese tramo.'],
            ['4 o más', 'No hay tarifa de enjambre por el lado de xAI, pero la asignación compartida se vacía al ritmo de los agentes ocupados.', 'Con clave de API, pon un límite de gasto en xAI antes de dejar agentes sin supervisión.'],
          ],
          caption: 'Es una regla aproximada, no una cuota publicada. xAI describe los límites de forma relativa y no publica una cifra estable de peticiones para cada nivel de Grok Build.',
        },
        {
          type: 'paragraph',
          text: 'Cómo repartir el trabajo entre esas sesiones, y cómo evitar que se pisen entre ellas, está en <a href="/es/guias/enjambre-de-agentes-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Grok Build</a>.',
        },
      ],
    },
    {
      id: 'coste-de-cas',
      title: 'Qué cuesta CodeAgentSwarm por encima',
      content: [
        {
          type: 'paragraph',
          text: 'Nada por el lado del modelo. <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> no revende tokens de Grok ni se mete entre tú y xAI. Le pagas a xAI o a X por el acceso al modelo, exactamente igual que si ejecutaras <code>grok</code> en un terminal pelado.',
        },
        {
          type: 'paragraph',
          text: 'Ejecutar cuatro terminales de Grok Build dentro de CodeAgentSwarm no añade por tanto ninguna tarifa de enjambre por el lado de xAI. Bebe de la misma asignación de la que beberían cuatro terminales sueltos, solo que con las sesiones etiquetadas, su estado a la vista y su historial buscable.',
        },
        {
          type: 'paragraph',
          text: 'Lo que sí añade es visibilidad del uso: la app muestra el consumo de xAI junto al de tus otros agentes para que puedas reaccionar antes de que una sesión se pare.',
        },
      ],
    },
    {
      id: 'comparacion',
      title: 'Cómo se compara el precio de Grok Build',
      content: [
        {
          type: 'paragraph',
          text: 'Frente a las demás CLI, Grok Build empieza gratis y el tramo estándar de su API cuesta 2 $ por millón de entrada, 0,50 $ por entrada en caché y 6 $ por salida.',
        },
        {
          type: 'list',
          items: [
            '<strong>La evaluación empieza en 0 $.</strong> La página oficial dice que Grok Build está disponible para probar gratis.',
            '<strong>Los planes de pago empiezan en 8 $.</strong> X Subscription Plus está por debajo del plan de entrada de 20 $ de <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, y no necesitas pagar para una primera prueba.',
            '<strong>Premium cuesta 30 $, Super 100 $ y Ultra 200 $.</strong> Dan 4x, 15x y 50x el uso de Plus, de una bolsa compartida con Grok y Cursor.',
            '<strong>La API actual cuesta 2 $ de entrada y 6 $ de salida.</strong> La entrada en caché cuesta 0,50 $ por millón de tokens y las peticiones por encima de 200K de contexto cuestan más.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La lectura práctica: usa el acceso gratuito para probar Grok Build, paga por límites mayores solo cuando el consumo de tu cuenta lo justifique y reserva la API para automatización controlada. Ejecutarlo junto a otro agente también te da límites de proveedores separados, que es el argumento de <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre multi-CLI</a>.',
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
          text: 'Cada cifra de esa tabla tiene su propia página con la lista completa de niveles y la letra pequeña: <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a> y <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI</a>.',
        },
      ],
    },
    {
      id: 'como-verificar',
      title: 'Cómo verificarlo en tu máquina',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# ¿Qué CLI tienes en realidad?\ngrok --version\n\n# El primer arranque interactivo saca la autenticación si no has entrado\ngrok',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si falla la autenticación, comprueba que la cuenta de xAI tenga acceso a Grok Build o que la clave de API tenga saldo antes de depurar la instalación.',
        },
        {
          type: 'paragraph',
          text: 'Grok Build guarda sus datos en <code>~/.grok</code>, reubicable con <code>GROK_HOME</code>. Ahí es también donde viven las sesiones, cosa que importa cuando quieres encontrar una antigua: mira <a href="/es/guias/historial-conversaciones-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del historial de conversaciones de Grok Build</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Grok Build es gratis?',
      answer: 'Sí. xAI indica que Grok Build está disponible para probar gratis, aunque el nivel gratuito no incluye Grok 4.7 Fast. The X Subscription, desde 8 $/mes, aumenta los límites, mientras una clave de API de xAI ofrece pago por token para trabajo headless.',
    },
    {
      question: '¿Cuánto cuesta Grok Build al mes?',
      answer: 'A 31 de octubre de 2026, Grok Build se puede probar gratis. The X Subscription, disponible para clientes nuevos, tiene Plus por 8 $/mes, Premium por 30 $, Super por 100 $ y Ultra por 200 $. Quien ya tenía SuperGrok conserva su plan. Verifica el precio del checkout antes de pagar.',
    },
    {
      question: '¿Qué añade SuperGrok Plus para Grok Build?',
      answer: 'Desde el 12 de octubre de 2026, xAI ofrece a los clientes nuevos The X Subscription, y nada cambia para quien ya tiene SuperGrok. En la nueva escalera, Premium por 30 $/mes incluye las ventajas de SuperGrok, y Super por 100 $/mes da 15x el uso de Plus, compartido entre Grok y Cursor.',
    },
    {
      question: '¿Cuántas peticiones permite Grok Build?',
      answer: 'xAI no publica una cifra estable de peticiones para todos los niveles de Grok Build. Los límites varían por plan y pueden cambiar, así que consulta la vista de uso de tu cuenta. Los agentes en paralelo consumen la misma asignación más rápido que un terminal.',
    },
    {
      question: '¿Puedo usar una clave de API en vez de una suscripción?',
      answer: 'Sí. La API de Grok 4.7 cuesta 2 $ por millón de tokens de entrada, 0,50 $ por millón de entrada en caché y 6 $ por millón de salida por debajo de 200K tokens de prompt, y 4 $, 1 $ y 12 $ por encima. Usa una clave con tope en el pipeline y el login de cuenta para el trabajo interactivo.',
    },
    {
      question: '¿CodeAgentSwarm incluye consumo de Grok?',
      answer: 'No. CodeAgentSwarm es el espacio de trabajo, no un revendedor. El consumo del modelo lo factura xAI o va contra tu propia clave de API, y ejecutar cuatro terminales de Grok Build no añade ninguna tarifa de enjambre por encima de tu asignación.',
    },
    {
      question: '¿Hay suscripción de Grok Build?',
      answer: 'No una propia. Grok Build se puede probar gratis, y el uso de pago sale de The X Subscription: Plus por 8 $/mes, Premium por 30 $, Super por 100 $ y Ultra por 200 $, una bolsa compartida entre Grok y Cursor. La clave de API de xAI es la vía aparte de pago por token para trabajo headless.',
    },
    {
      question: '¿Grok Build cuesta más si ejecuto varias sesiones a la vez?',
      answer: 'Con un plan no hay tarifa extra, pero los límites compartidos de la cuenta llegan antes porque cada sesión lee ficheros, ejecuta herramientas y razona por su cuenta. Con clave de API es coste directo: Grok 4.7 cobra 2 $ por millón de tokens de entrada y 6 $ por millón de salida por debajo de 200K tokens de prompt, y el doble por encima.',
    },
  ],
}

export default guide
