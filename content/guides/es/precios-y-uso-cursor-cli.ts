import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-uso-cursor-cli',
    locale: 'es',
    title: 'Precios y uso de Cursor CLI: planes, pozos de uso y agentes en paralelo',
    metaTitle: 'Precios de Cursor CLI 2026: planes, uso y coste por agente',
    metaDescription: 'Precios de Cursor CLI: Free, Plus 8 $, Premium 30 $, Super 100 $, Ultra 200 $, Teams desde 30 $. Y qué le hacen a tu bolsa de uso varias sesiones a la vez.',
    intro: `Cursor Agent CLI utiliza tu cuenta de Cursor. Ejecutarlo mediante ACP no genera una factura independiente de modelos en CodeAgentSwarm. Inicias sesión con <code>cursor-agent login</code> o proporcionas <code>CURSOR_API_KEY</code>, y Cursor aplica la suscripción y el uso asociados a esa cuenta.

Según la página de precios de Cursor del 31 de octubre de 2026, los planes actuales son Free, Plus por 8 $ al mes, Premium por 30 $, Super por 100 $ y Ultra por 200 $. Teams cuesta 30 $, 100 $ o 200 $ por asiento al mes. Los antiguos Hobby, Pro y Pro+ siguen solo para quien ya era cliente. Los precios y el uso incluido pueden cambiar, así que consulta la <a href="https://cursor.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de precios de Cursor</a> antes de comprar.`,
    ctaText: 'Usa tu propia cuenta de Cursor en CodeAgentSwarm y supervisa sesiones de Cursor Agent sin trasladar la facturación de modelos fuera de Cursor.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Precios', 'Uso'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-10-31',
    alternateSlug: 'cursor-cli-pricing',
  },
  sections: [
    {
      id: 'planes-resumen',
      title: 'Resumen de los planes de Cursor',
      content: [
        { type: 'table', headers: ['Plan', 'Precio o posición de uso publicada', 'Qué puede verificar esta guía'], rows: [
          ['Free', '0 $', 'Agent y Chat con uso limitado; sin modelos de terceros'],
          ['Plus', '8 $ al mes', 'Solo modelos de Cursor: Grok 4.7, Grok 4.6, Grok 4.5 y Composer 2.5'],
          ['Premium', '30 $ al mes', '4x el uso de Plus; modelos de terceros a precio de lista de la API'],
          ['Super', '100 $ al mes', '15x el uso de Plus y acceso prioritario a modelos en horas punta'],
          ['Ultra', '200 $ al mes', '50x el uso de Plus y acceso anticipado a productos y modelos nuevos'],
          ['Teams', '30 $, 100 $ o 200 $ por asiento al mes', 'Uso compartido por el equipo'],
          ['Planes antiguos', 'Solo clientes actuales', 'Hobby, Pro, Pro+, el Ultra anterior y los asientos Teams mantienen dos pozos mensuales'],
        ], caption: 'Según cursor.com/pricing y la documentación de precios de Cursor, verificados el 31 de octubre de 2026. Comprueba la página actual y tu cuenta antes de preparar un presupuesto.' },
        { type: 'callout', variant: 'warning', content: 'La tabla recoge lo que Cursor publicaba el 31 de octubre de 2026. No promete un número fijo de solicitudes ni una asignación concreta de modelos. Cursor vende ahora los mismos cinco niveles que The X Subscription de xAI, con una bolsa compartida entre Cursor y Grok.' },
      ],
    },
    {
      id: 'acceso-cli',
      title: 'Cómo se factura el acceso a Cursor Agent CLI',
      content: [
        { type: 'paragraph', text: 'Cursor Agent CLI forma parte del ecosistema de cuentas de Cursor. El uso interactivo empieza con <code>cursor-agent login</code>. Una configuración no interactiva puede usar <code>CURSOR_API_KEY</code>. En ambos casos, la autenticación y el uso permanecen en Cursor.' },
        { type: 'paragraph', text: 'CodeAgentSwarm inicia la CLI oficial mediante <code>cursor-agent acp</code>. Presenta las respuestas en streaming, las herramientas y los permisos, pero Cursor sigue siendo el proveedor del modelo.' },
        { type: 'paragraph', text: 'La instalación, los modos, la selección de modelos y la configuración MCP se explican en la <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía ACP de Cursor Agent CLI</a>.' },
      ],
    },
    {
      id: 'pozos-uso',
      title: 'Cómo funcionan los pozos de uso actuales',
      content: [
        { type: 'paragraph', text: 'Cada plan de pago actual incluye <strong>una bolsa semanal para los modelos propios de Cursor</strong>: Grok 4.7, Grok 4.6, Grok 4.5 y Composer 2.5. Según la <a href="https://cursor.com/docs/account/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de precios de Cursor</a>, esa bolsa se comparte entre Agent en el editor, la CLI, Cloud Agents, Grok Bot y las apps de Grok. Los modelos de terceros como Claude, GPT y Gemini no entran en la bolsa: en Premium y superiores se cobran al precio de lista de la API desde la primera petición, con crédito prepago.' },
        { type: 'paragraph', text: 'Cursor también documenta una tarifa propia de 0,25 $ por millón de tokens en las peticiones elegibles a modelos de terceros. Se suma al precio de la API del modelo; los modelos propios de Cursor, incluidos Grok y Composer, quedan exentos. Los planes antiguos mantienen el esquema anterior: dos pozos mensuales, Cursor Models y Other Models, con uso bajo demanda en vez de recargas.' },
        { type: 'paragraph', text: 'El consumo real depende del trabajo, del modelo seleccionado y del número de sesiones activas. Una investigación larga de un repositorio puede consumir más que una pregunta breve, y varios agentes paralelos consumen uso de forma independiente.' },
        { type: 'callout', variant: 'info', content: 'Consulta la información de uso dentro de tu cuenta de Cursor para conocer la asignación que se aplica a tu caso. Las etiquetas públicas de los planes no sustituyen los datos de uso específicos de la cuenta.' },
      ],
    },
    {
      id: 'agentes-paralelos',
      title: 'Presupuesta el uso de varios agentes de Cursor',
      content: [
        { type: 'paragraph', text: 'Un flujo paralelo puede terminar antes varias tareas independientes, pero también tiene más sesiones leyendo código e invocando modelos. Asigna a cada agente una tarea clara y detén las sesiones que ya no tengan trabajo útil.' },
        { type: 'table', headers: ['Sesiones a la vez', 'Qué esperar', 'Qué vigilar'], rows: [
          ['1', 'Una sesión consumiendo del uso incluido. El ritmo depende del modelo que hayas elegido.', 'Grok y Composer consumen de la bolsa semanal; los modelos de terceros se cobran a precio de lista de la API.'],
          ['2 a 3', 'Dos o tres sesiones consumen de la misma bolsa semanal a la vez, así que el uso incluido baja entre dos y tres veces más rápido en el mismo tiempo.', 'Una investigación larga de un repositorio consume mucho más que una pregunta breve, así que vigila la sesión que lleva más tiempo.'],
          ['4 o más', 'El consumo sigue al número de sesiones que trabajan de verdad, no al número de sesiones abiertas. Cursor no publica un límite de sesiones.', 'Detén las sesiones sin trabajo útil y mira la vista de uso de tu cuenta en vez de la etiqueta del plan.'],
        ], caption: 'Es una regla aproximada, no una tarifa publicada. Cursor mide una bolsa de uso y no sesiones, y esa bolsa se comparte con las apps de Grok, así que el consumo real depende del modelo, del trabajo y de lo demás que uses.' },
        { type: 'paragraph', text: 'La <a href="/es/guias/enjambre-de-agentes-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de Cursor Agent</a> cubre los límites de las tareas, los modos, los permisos y la cancelación. Esos controles ayudan a evitar el gasto de uso en trabajo duplicado.' },
      ],
    },
    {
      id: 'coste-historial',
      title: '¿Reanudar una sesión de Cursor afecta al uso?',
      content: [
        { type: 'paragraph', text: 'Una sesión reanudada sigue utilizando modelos de Cursor bajo la misma cuenta. CodeAgentSwarm no crea una cuota diferente para las conversaciones reanudadas.' },
        { type: 'paragraph', text: 'La reanudación ACP depende de que la CLI instalada informe de <code>loadSession</code>. La <a href="/es/guias/historial-conversaciones-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Cursor CLI</a> explica cómo gestiona CodeAgentSwarm las versiones antiguas.' },
      ],
    },
    {
      id: 'comparar-con-otros-agentes',
      title: 'Cómo se compara el precio de Cursor CLI con las demás CLI de agentes',
      content: [
        { type: 'paragraph', text: 'Cursor pone ahora sus niveles individuales igual que xAI: gratis abajo, 8 $ para empezar y 200 $ arriba. Lo que cambia entre las siete CLI de agentes comparadas aquí no es la cifra de portada, sino cómo te mide cada una, y eso es lo que decide la factura en cuanto tienes varias sesiones a la vez.' },
        { type: 'table', headers: ['Agente', 'Nivel gratuito', 'Pago más barato', 'Nivel individual más alto', 'Cómo se factura'], rows: [
          ['Claude Code', 'No (el plan Free no incluye Claude Code)', 'Pro, 20 $/mes', 'Ultra, 200 $/mes', 'Plan de Claude con límites de 5 horas y semanales (las cuentas Ultra verificadas no tienen límite de 5 horas); tokens de API opcionales'],
          ['Codex CLI', 'Limitado', 'Go, 8 $/mes', 'Pro, 500 $/mes', 'Plan de ChatGPT compartido entre la CLI, la web y el IDE; tokens de API opcionales'],
          ['Kimi Code', 'La CLI es gratis, el uso del modelo no', 'Plus, 99 ¥/mes', 'Ultra, 1.399 ¥/mes', 'Créditos de membresía más un límite de 5 horas en Kimi Code; API por token'],
          ['OpenCode', 'La CLI es gratis y de código abierto', 'OpenCode Go, 10 $/mes', 'Go Plus, 40 $/mes', 'Tu propia clave de proveedor, créditos prepago de Console por token o una suscripción Go'],
          ['Antigravity', 'Sí, con límites de frecuencia semanales', 'Google AI Plus, 4,99 $/mes', 'Google AI Ultra 20x, 199,99 $/mes', 'Plan de Google AI con límites de frecuencia y créditos'],
          ['Grok Build', 'Sí, con uso limitado', 'X Subscription Plus, 8 $/mes', 'X Subscription Ultra, 200 $/mes', 'Bolsa de X Subscription compartida con Grok y Cursor; API por token'],
          ['Cursor Agent', 'Free, uso limitado', 'Plus, 8 $/mes', 'Ultra, 200 $/mes', 'Bolsa semanal para los modelos de Cursor; los modelos de terceros se cobran por uso'],
        ], caption: 'Niveles de entrada y superiores de cada CLI de agente, verificados el 31 de octubre de 2026. Los precios cambian a menudo; cada guía enlazada lleva su propia fecha de verificación.' },
        { type: 'paragraph', text: 'Cada cifra de esa tabla tiene su propia página con la lista completa de niveles y la letra pequeña: <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a> y <a href="/es/guias/precios-y-acceso-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a>.' },
      ],
    },
    {
      id: 'elegir-plan',
      title: 'Elige un plan con tu propia carga de trabajo',
      content: [
        { type: 'list', items: ['Empieza por el plan disponible en tu cuenta y prueba trabajo representativo del repositorio.', 'Observa el uso de la cuenta de Cursor con una sesión antes de añadir agentes paralelos.', 'Compara los requisitos individuales y de Teams en la página oficial de precios actual.', 'Vuelve a comprobar los precios antes de renovar o desplegar en un equipo porque las condiciones pueden cambiar.'] },
        { type: 'paragraph', text: 'Una página de precios no puede predecir el coste de tu repositorio. Mide una semana normal de tareas y elige el plan más pequeño que cubra esa carga con un margen razonable.' },
      ],
    },
  ],
  faq: [
    { question: '¿Cursor Agent CLI es gratis?', answer: 'Cursor muestra un plan Free con uso limitado de Agent y Chat a fecha de 31 de octubre de 2026, sin modelos de terceros. La CLI usa tu cuenta de Cursor, y el uso disponible puede cambiar. Consulta cursor.com/pricing para conocer las condiciones actuales.' },
    { question: '¿Cuánto cuestan los planes individuales de Cursor?', answer: 'A 31 de octubre de 2026 Cursor muestra Plus por 8 $, Premium por 30 $, Super por 100 $ y Ultra por 200 $ al mes. Premium da 4x el uso de Plus, Super 15x y Ultra 50x. Los antiguos Pro y Pro+ siguen solo para quien ya era cliente.' },
    { question: '¿Cuánto cuesta Cursor Teams?', answer: 'Cursor muestra Teams por 30 $, 100 $ o 200 $ por asiento al mes a fecha de 31 de octubre de 2026, con el uso compartido por el equipo. Los antiguos asientos Teams Standard y Premium siguen para quien ya era cliente.' },
    { question: '¿Cómo mide Cursor el uso incluido?', answer: 'Los planes de pago actuales tienen una bolsa semanal para los modelos propios de Cursor, Grok y Composer, compartida con el editor, la CLI, Cloud Agents y las apps de Grok. En Premium y superiores, los modelos de terceros se cobran por uso a su precio de lista de la API. Los planes antiguos mantienen los pozos separados Cursor Models y Other Models.' },
    { question: '¿CodeAgentSwarm cobra por los modelos de Cursor?', answer: 'La integración ACP no crea un cargo independiente por uso del modelo. La autenticación, la suscripción y el uso permanecen en tu cuenta de Cursor o CURSOR_API_KEY.' },
    { question: '¿Cursor CLI cuesta algo aparte del plan de Cursor?', answer: 'No. Cursor Agent CLI usa la suscripción y el uso que ya tiene tu cuenta de Cursor, tanto si entras con cursor-agent login como si defines CURSOR_API_KEY. CodeAgentSwarm inicia la CLI oficial mediante ACP y no crea una factura de modelos aparte.' },
    { question: '¿Qué plan de Cursor necesito para ejecutar varias sesiones de Cursor Agent a la vez?', answer: 'Cursor no publica un límite de sesiones, así que la respuesta sale de tu propio consumo. Cada plan de pago tiene una bolsa semanal para los modelos propios de Cursor, y las sesiones paralelas consumen de ella de forma independiente, así que más sesiones agotan antes el uso incluido. Mira la vista de uso de tu cuenta antes de comprometerte con un nivel.' },
  ],
}

export default guide
