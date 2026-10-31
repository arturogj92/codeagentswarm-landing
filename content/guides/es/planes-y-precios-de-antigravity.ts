import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-antigravity',
    locale: 'es',
    title: 'Planes y precios de Antigravity: nivel gratuito, límites y agentes en paralelo',
    metaTitle: 'Precios de Antigravity 2026: Free, Pro, Ultra y límites',
    metaDescription: 'Precios de Antigravity: nivel gratuito, Plus 4,99 $, Pro 19,99 $, Ultra 5x 99,99 $ y 20x 199,99 $. Y qué le hacen al límite semanal varias sesiones a la vez.',
    intro: `Antigravity no tiene suscripción propia. El acceso viaja dentro de un plan de Google AI y, a 31 de octubre de 2026, eso significa: nivel gratuito, Google AI Plus por 4,99 $/mes, Google AI Pro por 19,99 $, Google AI Ultra 5x por 99,99 $, Google AI Ultra 20x por 199,99 $ y una vía para organizaciones mediante Google Cloud.

El nivel gratuito es lo interesante aquí. A diferencia de <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, que no está en su nivel gratuito en absoluto, el plan gratis de Antigravity te da acceso a varios modelos de agente, autocompletado ilimitado y peticiones de comando ilimitadas, con límites de frecuencia semanales como única barrera, no funciones capadas. Se puede trabajar de verdad sin pagar.

Hay una pega que conviene conocer antes de montar un flujo de trabajo encima, y no es sutil: <strong>Google ha recortado los límites gratuitos varias veces desde el lanzamiento</strong>. Esta guía cubre los niveles, qué permite hoy el plan gratuito, cómo funciona el bote de créditos y cuánto de todo eso deberías considerar estable.`,
    ctaText: 'Antigravity te mide por límites de frecuencia y no por factura, así que saber cómo de cerca estás importa. CodeAgentSwarm lee la cuota real de Antigravity y la muestra por terminal, junto a todos los demás agentes que ejecutes.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'antigravity-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'El acceso a Antigravity va empaquetado en las suscripciones de Google AI en vez de venderse por separado. A 31 de octubre de 2026 la escalera en EE. UU. queda así:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Qué cambia'],
          rows: [
            ['Individual (gratis)', '0 $', 'Varios modelos de agente, límites semanales básicos'],
            ['Google AI Plus', '4,99 $/mes', 'Peticiones de agente limitadas, los mismos modelos que el gratuito'],
            ['Google AI Pro', '19,99 $/mes', 'Límites ampliados, Gemini 4 Argon, Claude Opus y Sonnet 5.5, bote de créditos flexible'],
            ['Google AI Ultra 5x', '99,99 $/mes', 'Más peticiones de agente'],
            ['Google AI Ultra 20x', '199,99 $/mes', 'El máximo de peticiones de agente'],
            ['Organización', 'Vía Google Cloud', 'Asientos Standard o Plus desde 30 $/mes, o pago por uso sin cuota por asiento'],
          ],
          caption: 'Niveles de acceso a Antigravity según antigravity.google/pricing, la documentación de modelos de Antigravity y la página de planes de Google AI en EE. UU., verificados el 31 de octubre de 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Google no publica los precios mensuales en la propia página de precios de Antigravity, que enumera los niveles y sus funciones pero deja los números a la <a href="https://one.google.com/intl/en_us/about/google-ai-plans/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de planes de Google AI</a>. Las cifras de arriba son los precios de EE. UU. que aparecían allí el 31 de octubre de 2026. Verifícalos en tu propia cuenta de Google antes de pagar: los precios cambian según el país, y Google ya ha cambiado esta escalera más de una vez.',
        },
        {
          type: 'paragraph',
          text: 'La oferta en vivo de Google One llama ahora a los dos planes superiores Google AI Ultra 5x y Google AI Ultra 20x. Las comparativas antiguas pueden llamar Ultra Max al nivel de 200 $ o citar 250 $; comprueba el checkout actual de tu cuenta antes de comprar.',
        },
        {
          type: 'paragraph',
          text: 'Google describe ahora el acceso a Antigravity como limitado, ampliado, más alto y máximo según el nivel. Es una comparación relativa, no una cifra publicada de peticiones, así que elige desde el consumo que muestre tu cuenta y no conviertas los nombres 5x y 20x en cuotas inventadas.',
        },
      ],
    },
    {
      id: 'nivel-gratuito',
      title: 'El nivel gratuito: qué permite y qué le han quitado',
      content: [
        {
          type: 'paragraph',
          text: 'El plan gratuito es inusualmente generoso sobre el papel. Según la <a href="https://antigravity.google/docs/models" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de modelos de Antigravity</a>, los usuarios gratuitos y de Plus tienen <strong>Gemini 3.8 Flash</strong>, más Claude Sonnet 4.6, Claude Opus 4.6 y GPT-OSS 120B hasta que Google retire esos tres el 2 de noviembre de 2026. El autocompletado y las peticiones de comando son ilimitados. La barrera son los límites de frecuencia semanales en las peticiones del agente, no un muro de funciones.',
        },
        {
          type: 'paragraph',
          text: 'Esa combinación es realmente rara, al menos hasta el 2 de noviembre. Gemini 4 Argon y los modelos Claude 5.5 requieren Google AI Pro o superior, así que tras la retirada el nivel gratuito se queda solo con un modelo Flash. Para evaluar si un flujo de trabajo agéntico te encaja, sigue siendo una de las mejores opciones gratuitas de la categoría.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Los límites del nivel gratuito se han recortado varias veces desde que Antigravity salió en noviembre de 2025, y las reducciones han sido bruscas, no graduales. Sea cual sea la asignación diaria o semanal vigente cuando leas esto, trátala como una foto fija y no como un compromiso, y no montes un flujo de equipo que dependa de que el nivel gratuito se quede donde está.',
        },
        {
          type: 'paragraph',
          text: 'La lectura honesta de ese historial: Google todavía está buscando el nivel sostenible al que regalar acceso agéntico a modelos de frontera, y ha ajustado a la baja cada vez que ha descubierto que la respuesta era "menos que esto". Eso no es una crítica al producto, es una razón para planificar contando con que el nivel gratuito encoja y no crezca.',
        },
        {
          type: 'paragraph',
          text: 'La consecuencia práctica para quien ejecuta varios agentes: el nivel gratuito está dimensionado para una persona llevando un agente con cabeza. No está dimensionado para el patrón de agentes en paralelo, y lo vas a notar dentro de la misma sesión.',
        },
      ],
    },
    {
      id: 'creditos',
      title: 'El bote de créditos: qué pasa cuando se acaba la cuota incluida',
      content: [
        {
          type: 'paragraph',
          text: 'Google documenta créditos de IA adicionales para usuarios de Pro y Ultra una vez agotada la cuota incluida. El consumo sigue la tarifa estándar de API y varía según el modelo y la complejidad de la tarea, así que no existe una conversión plana y fiable de 0,01 $ para cada petición de Antigravity.',
        },
        {
          type: 'paragraph',
          text: 'Esto coloca a Antigravity en la misma categoría general que <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a> y los planes de pago de Claude: puedes financiar trabajo fuera de la cuota incluida en vez de esperar siempre al reinicio. Que eso sea una buena noticia depende de si estaba en tu presupuesto.',
        },
        {
          type: 'paragraph',
          text: 'La regla también se traslada: si compras créditos con regularidad, subir de nivel es casi seguro más barato que la costumbre. Los créditos tienen precio de comodidad, no de volumen.',
        },
        {
          type: 'paragraph',
          text: 'El nivel gratuito no tiene bote de créditos. Cuando se agotan los límites gratuitos, toca esperar.',
        },
      ],
    },
    {
      id: 'agentes-paralelos',
      title: 'Qué le hace al coste ejecutar varias sesiones de Antigravity a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity te mide por límites de frecuencia semanales y no por una factura en marcha, así que los agentes en paralelo no generan una factura mayor. Generan un muro más temprano. Todas las sesiones de agy beben de la misma asignación de la cuenta, de modo que el límite llega en proporción a cuántas estén trabajando de verdad.',
        },
        {
          type: 'paragraph',
          text: 'Lo que pasa al llegar a ese muro depende de tu plan. Pro y Ultra pueden seguir tirando del bote de créditos, que sigue la tarifa estándar de API y varía según el modelo y la complejidad de la tarea. El nivel gratuito no tiene bote de créditos, así que cuando se agotan los límites semanales todas las sesiones se paran y toca esperar al reinicio.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Qué esperar', 'Qué vigilar'],
          rows: [
            ['1', 'Es más o menos para lo que está dimensionado el nivel gratuito: una persona llevando un agente con cabeza.', 'Poco. Los límites semanales solo se notan en una semana intensa.'],
            ['2 a 3', 'Los límites de frecuencia semanales llegan entre dos y tres veces antes que con una sola sesión.', 'En el nivel gratuito es donde los límites empiezan a molestar a mitad de sesión, sin créditos a los que recurrir.'],
            ['4 o más', 'El patrón de agentes en paralelo no es para lo que está dimensionado el nivel gratuito, y se nota dentro de una misma sesión.', 'En Pro y Ultra el exceso cae en créditos, con precio según modelo y complejidad, así que presupuéstalos o sube de nivel.'],
          ],
          caption: 'Es una regla aproximada, no una cuota publicada. Google describe el acceso a Antigravity de forma relativa y no como una cifra de peticiones, así que consulta el consumo que muestre tu cuenta.',
        },
        {
          type: 'paragraph',
          text: 'Cómo repartir el trabajo entre esas sesiones está en <a href="/es/guias/enjambre-de-agentes-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Antigravity</a>, y el montaje en sí está en <a href="/es/guias/ejecutar-multiples-sesiones-antigravity-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo ejecutar varias sesiones de Antigravity CLI</a>.',
        },
      ],
    },
    {
      id: 'visibilidad-de-cuota',
      title: 'El problema de visibilidad, y una cosa que rompe',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity te mide por límites de frecuencia y no por una factura en marcha, lo que hace que saber tu posición importe más que en un agente de pago por token. Quedarte sin cuota es una parada, no un cargo.',
        },
        {
          type: 'paragraph',
          text: 'Aquí hay una trampa concreta que merece señalarse, porque le cuesta a la gente tiempo real de depuración. Antigravity expone su estado a través de un servidor de lenguaje local, y <strong>una sesión con la sesión caducada es indistinguible desde fuera de una sesión que no está corriendo</strong>. Cualquier herramienta que lea ese estado, incluidas las integraciones del propio Antigravity, dirá "no está corriendo" cuando la respuesta verdadera es "está corriendo, pero tus credenciales han caducado".',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si tu indicador de cuota dice de repente que Antigravity está apagado mientras ves al agente trabajando delante de ti, comprueba si sigues con la sesión iniciada antes de ponerte a buscar un bug. Ese modo de fallo es con diferencia la causa más habitual, y desde fuera es invisible.',
        },
        {
          type: 'paragraph',
          text: 'La misma arquitectura hace que leer la cuota dependa de la plataforma: el mecanismo de descubrimiento que localiza el servidor local es distinto en macOS, Linux y Windows, y cualquier herramienta que asuma utilidades de proceso de Unix simplemente no informará de nada en Windows en vez de fallar de forma ruidosa. Si la cuota aparece en una de tus máquinas y en otra no, esa suele ser la razón y no un problema de cuenta.',
        },
      ],
    },
    {
      id: 'comparacion',
      title: 'Cómo se compara el precio de Antigravity',
      content: [
        {
          type: 'paragraph',
          text: 'Puesto al lado de las demás CLI de la categoría, Antigravity ocupa una posición clara en la entrada y otra menos distintiva por encima.',
        },
        {
          type: 'list',
          items: [
            '<strong>Frente a Claude Code</strong>: Antigravity gana de forma rotunda a 0 $, porque Claude Code no tiene nivel gratuito. A 20 $ contra 20 $ la comparación pasa a ser sobre los modelos y el agente, no sobre el precio.',
            '<strong>Frente a Codex</strong>: estructura parecida, los dos medidos con recarga de créditos. Google AI Plus por 4,99 $ queda por debajo de Codex Go por 8 $, pero Plus solo tiene peticiones de agente limitadas; Antigravity también gana en el nivel gratuito.',
            '<strong>Frente a <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a></strong>: filosofías completamente distintas. Antigravity te da una asignación gratuita acotada sin factura; OpenCode te da una factura sin acotar sin muro. El trabajo a ráfagas encaja con OpenCode, el trabajo predecible con Antigravity.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La conclusión útil de verdad es que <strong>Antigravity es la mejor opción gratuita y una opción de pago del montón</strong>. Usa el nivel gratuito para evaluar la programación agéntica sin comprometerte a nada, y toma la decisión de pagar por los méritos del agente y no por el precio, porque alrededor de 20 $ y 100 $ toda la categoría cobra prácticamente lo mismo.',
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
          text: 'Cada cifra de esa tabla tiene su propia página con la lista completa de niveles y la letra pequeña: <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/es/guias/precios-y-acceso-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> y <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI</a>.',
        },
      ],
    },
    {
      id: 'vigilar-la-cuota',
      title: 'Vigilar la cuota de Antigravity mientras trabajan los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'En un plan por límites de frecuencia, el muro llega sin avisar y para al agente a mitad de tarea. Con un terminal es una interrupción. Con varios significa averiguar qué sesiones se han parado, por dónde iba cada una y si alguna ha dejado un cambio aplicado a medias.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, el espacio de trabajo de escritorio para ejecutar varios agentes de IA de terminal en paralelo, lee la cuota real de Antigravity desde su endpoint local y la muestra junto al consumo de tus otros agentes, con el descubrimiento específico de cada plataforma ya resuelto en macOS, Linux y Windows. Ves venir el muro mientras los agentes trabajan.',
        },
        {
          type: 'paragraph',
          text: 'Encaja con la mitigación que sí funciona en un plan gratuito o Pro: ten un segundo agente en otro contador para el desbordamiento. Antigravity, Claude y Codex facturan de botes completamente separados, así que agotar uno rara vez detiene la sesión, que es el patrón de <a href="/es/guias/enjambre-de-agentes-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Antigravity</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Antigravity es gratis?',
      answer: 'Sí, de verdad. El nivel gratuito da acceso a varios modelos de agente, autocompletado ilimitado y peticiones de comando ilimitadas, con límites de frecuencia semanales como única barrera en vez de funciones capadas. Es el nivel gratuito más utilizable de la categoría, aunque los límites se han reducido varias veces desde el lanzamiento.',
    },
    {
      question: '¿Cuánto cuesta Antigravity al mes?',
      answer: 'No existe una suscripción a Antigravity. El acceso viene con un plan de Google AI. En EE. UU., a 31 de octubre de 2026: gratis, Plus por 4,99 $/mes, Pro por 19,99 $, Ultra 5x por 99,99 $ y Ultra 20x por 199,99 $. Verifica el precio vigente en tu cuenta antes de pagar.',
    },
    {
      question: '¿Cuántas peticiones permite el nivel gratuito de Antigravity?',
      answer: 'Google lo ha cambiado varias veces desde el lanzamiento en noviembre de 2025, siempre a la baja, así que cualquier número concreto caduca rápido. La estructura son límites de frecuencia semanales en las peticiones del agente, con autocompletado y peticiones de comando ilimitados. Consulta tu cuenta para ver la asignación actual en vez de fiarte de un artículo, incluido este.',
    },
    {
      question: '¿Qué son los créditos de Antigravity y cuándo se usan?',
      answer: 'Los usuarios de Pro y Ultra pueden comprar créditos de IA adicionales cuando se agota la cuota incluida. El consumo sigue la tarifa estándar de API y varía según el modelo y la complejidad, no tiene un precio fijo por petición. El nivel gratuito espera al reinicio.',
    },
    {
      question: '¿Por qué mi indicador de cuota dice que Antigravity no está corriendo si sí lo está?',
      answer: 'Casi siempre porque tu sesión ha caducado. Antigravity expone su estado a través de un servidor de lenguaje local, y una sesión sin iniciar se ve desde fuera exactamente igual que no tener ninguna sesión. Comprueba que sigues autenticado antes de dar por hecho que la herramienta está rota.',
    },
    {
      question: '¿Antigravity es más barato que Claude Code?',
      answer: 'En el nivel gratuito, rotundamente sí, porque Claude Code no tiene nivel gratuito. En los niveles de pago los dos cuestan prácticamente lo mismo (19,99 $ frente a 20 $, 99,99 $ frente a 100 $), así que la decisión debería ir sobre los modelos y el agente, no sobre la factura.',
    },
    {
      question: '¿Qué planes tiene Antigravity?',
      answer: 'No existe una suscripción a Antigravity. El acceso viaja dentro de un plan de Google AI: gratis, Plus por 4,99 $/mes, Pro por 19,99 $, Ultra 5x por 99,99 $ y Ultra 20x por 199,99 $ en EE. UU., más una vía para organizaciones por Google Cloud. Google no publica esos precios en la propia página de Antigravity, así que verifícalos en tu cuenta antes de pagar.',
    },
    {
      question: '¿Necesito Google AI Pro para usar Antigravity CLI (agy)?',
      answer: 'No. El nivel gratuito ya da acceso a modelos de agente, autocompletado ilimitado y peticiones de comando ilimitadas, con límites de frecuencia semanales como única barrera en vez de funciones capadas. Pro sube esos límites, añade Gemini 4 Argon y los modelos Claude 5.5, y añade el bote de créditos que te deja seguir trabajando más allá de la cuota incluida.',
    },
    {
      question: '¿Qué le pasa al límite cuando ejecuto varias sesiones de agy a la vez?',
      answer: 'Todas beben de la misma asignación de la cuenta, así que los límites de frecuencia semanales llegan antes en proporción a cuántas sesiones estén realmente ocupadas. En Pro y Ultra el exceso pasa a créditos. En el nivel gratuito no hay bote de créditos, así que todas las sesiones se paran hasta que el límite se reinicie.',
    },
  ],
}

export default guide
