import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-antigravity',
    locale: 'es',
    title: 'Planes y precios de Antigravity: qué te da de verdad el nivel gratuito',
    metaTitle: 'Precios de Antigravity CLI: Free, Pro y Ultra explicados (2026)',
    metaDescription: 'Los precios de Antigravity explicados: el nivel gratuito y qué permite de verdad, Google AI Pro y Ultra, el bote de créditos y por qué han recortado los límites gratuitos varias veces.',
    intro: `Antigravity no tiene suscripción propia. El acceso viaja dentro de un plan de Google AI y, a 25 de agosto de 2026, eso significa: nivel gratuito, Google AI Plus, Google AI Pro, Google AI Ultra 5x, Google AI Ultra 20x y una vía para organizaciones mediante Google Cloud con precio por consumo.

El nivel gratuito es lo interesante aquí. A diferencia de <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, que no está en su nivel gratuito en absoluto, el plan gratis de Antigravity te da acceso a varios modelos de frontera, autocompletado ilimitado y peticiones de comando ilimitadas, con límites de frecuencia semanales como única barrera, no funciones capadas. Se puede trabajar de verdad sin pagar.

Hay una pega que conviene conocer antes de montar un flujo de trabajo encima, y no es sutil: <strong>Google ha recortado los límites gratuitos varias veces desde el lanzamiento</strong>. Esta guía cubre los niveles, qué permite hoy el plan gratuito, cómo funciona el bote de créditos y cuánto de todo eso deberías considerar estable.`,
    ctaText: 'Antigravity te mide por límites de frecuencia y no por factura, así que saber cómo de cerca estás importa. CodeAgentSwarm lee la cuota real de Antigravity y la muestra por terminal, junto a todos los demás agentes que ejecutes.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Planes', 'precios'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-25',
    alternateSlug: 'antigravity-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'El acceso a Antigravity va empaquetado en las suscripciones de Google AI en vez de venderse por separado. A agosto de 2026 la escalera queda así:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Qué cambia'],
          rows: [
            ['Individual (gratis)', '0 $', 'Todos los modelos, límites semanales básicos'],
            ['Google AI Plus', 'Unos 8 $/mes', 'Más peticiones de Antigravity'],
            ['Google AI Pro', '20 $/mes', 'Límites más generosos, bote de créditos flexible'],
            ['Google AI Ultra 5x', '100 $/mes', 'Peticiones de Antigravity más altas'],
            ['Google AI Ultra 20x', '200 $/mes', 'Las peticiones de Antigravity más altas'],
            ['Organización', 'Vía Google Cloud', 'Precio de API por consumo'],
          ],
          caption: 'Niveles de acceso a Antigravity, agosto de 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Google no publica los precios mensuales en la propia página de precios de Antigravity, que enumera los niveles y sus funciones pero deja los números a las páginas de suscripción de Google AI. Las cifras de arriba son coherentes entre fuentes a agosto de 2026, pero esta es la única tabla de esta guía que deberías verificar en tu propia cuenta de Google antes de pagar, entre otras cosas porque Google ya ha cambiado esta escalera de precios al menos una vez.',
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
          text: 'El plan gratuito es inusualmente generoso sobre el papel. Trae <strong>acceso a varios modelos de frontera</strong>, incluidos modelos Gemini y Claude, además de autocompletado ilimitado y peticiones de comando ilimitadas. La barrera son los límites de frecuencia semanales en las peticiones del agente, no un muro de funciones.',
        },
        {
          type: 'paragraph',
          text: 'Esa combinación es realmente rara. La mayoría de niveles gratuitos te limitan al modelo más barato del proveedor; el de Antigravity no. Para evaluar si un flujo de trabajo agéntico te encaja, es la mejor opción gratuita de la categoría.',
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
            '<strong>Frente a Codex</strong>: estructura parecida, los dos medidos con recarga de créditos. Codex gana en el primer nivel de pago gracias a su plan Go de 8 $; Antigravity gana en el nivel gratuito.',
            '<strong>Frente a <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a></strong>: filosofías completamente distintas. Antigravity te da una asignación gratuita acotada sin factura; OpenCode te da una factura sin acotar sin muro. El trabajo a ráfagas encaja con OpenCode, el trabajo predecible con Antigravity.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La conclusión útil de verdad es que <strong>Antigravity es la mejor opción gratuita y una opción de pago del montón</strong>. Usa el nivel gratuito para evaluar la programación agéntica sin comprometerte a nada, y toma la decisión de pagar por los méritos del agente y no por el precio, porque a 20 $ y 100 $ toda la categoría cobra prácticamente lo mismo.',
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
      answer: 'Sí, de verdad. El nivel gratuito da acceso a varios modelos de frontera, autocompletado ilimitado y peticiones de comando ilimitadas, con límites de frecuencia semanales como única barrera en vez de funciones capadas. Es el nivel gratuito más utilizable de la categoría, aunque los límites se han reducido varias veces desde el lanzamiento.',
    },
    {
      question: '¿Cuánto cuesta Antigravity al mes?',
      answer: 'No existe una suscripción a Antigravity. El acceso viene con un plan de Google AI: gratis, Plus desde unos 8 $/mes, Pro por unos 20 $/mes, Ultra 5x por unos 100 $/mes y Ultra 20x por unos 200 $/mes. Verifica el precio vigente en tu cuenta antes de pagar.',
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
      answer: 'En el nivel gratuito, rotundamente sí, porque Claude Code no tiene nivel gratuito. En los niveles de pago los dos cuestan prácticamente lo mismo (20 $ y 100 $), así que la decisión debería ir sobre los modelos y el agente, no sobre la factura.',
    },
  ],
}

export default guide
