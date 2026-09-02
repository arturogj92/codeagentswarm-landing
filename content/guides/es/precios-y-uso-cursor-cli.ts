import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-uso-cursor-cli',
    locale: 'es',
    title: 'Precios y uso de Cursor CLI: planes, pozos de uso y agentes en paralelo',
    metaTitle: 'Precios de Cursor CLI 2026: planes, uso y coste por agente',
    metaDescription: 'Precios de Cursor CLI: Hobby gratis, Pro 20 $, Pro+ 60 $, Ultra 200 $, Teams desde 40 $. Y qué le hacen a tus pozos de uso varias sesiones a la vez.',
    intro: `Cursor Agent CLI utiliza tu cuenta de Cursor. Ejecutarlo mediante ACP no genera una factura independiente de modelos en CodeAgentSwarm. Inicias sesión con <code>cursor-agent login</code> o proporcionas <code>CURSOR_API_KEY</code>, y Cursor aplica la suscripción y el uso asociados a esa cuenta.

Según la documentación de precios de Cursor del 25 de agosto de 2026, Hobby es Gratis, Pro cuesta 20 $ al mes, Pro+ 60 $ y Ultra 200 $. Teams empieza en 40 $ al mes por usuario. Los precios y el uso incluido pueden cambiar, así que consulta la <a href="https://cursor.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de precios de Cursor</a> antes de comprar.`,
    ctaText: 'Usa tu propia cuenta de Cursor en CodeAgentSwarm y supervisa sesiones de Cursor Agent sin trasladar la facturación de modelos fuera de Cursor.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Precios', 'Uso'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-09-01',
    alternateSlug: 'cursor-cli-pricing',
  },
  sections: [
    {
      id: 'planes-resumen',
      title: 'Resumen de los planes de Cursor',
      content: [
        { type: 'table', headers: ['Plan', 'Precio o posición de uso publicada', 'Qué puede verificar esta guía'], rows: [
          ['Hobby', 'Gratis', 'El plan individual gratuito de entrada'],
          ['Pro', '20 $ al mes', 'Incluye los pozos Cursor Models y Other Models'],
          ['Pro+', '60 $ al mes', 'Más uso incluido para trabajar a diario con Agent'],
          ['Ultra', '200 $ al mes', 'El nivel individual para uso intensivo'],
          ['Teams Standard', '40 $ al mes por usuario', 'Administración y controles de equipo'],
          ['Teams Premium', '120 $ al mes por usuario', 'Cinco veces los límites de Agent de Standard'],
        ], caption: 'Los precios de Cursor cambian con el tiempo. Comprueba la página actual y tu cuenta antes de preparar un presupuesto.' },
        { type: 'callout', variant: 'warning', content: 'La tabla recoge lo que Cursor documentaba el 25 de agosto de 2026. No promete un número fijo de solicitudes ni una asignación concreta de modelos.' },
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
        { type: 'paragraph', text: 'Pro, Pro+ y Ultra incluyen ahora dos pozos mensuales. Cursor Models cubre los modelos Grok y Composer. Other Models cubre modelos de terceros a sus tarifas de API. Por eso el modelo elegido cambia la velocidad a la que consumes el uso incluido.' },
        { type: 'paragraph', text: 'Cursor también documenta una tarifa propia de 0,25 $ por millón de tokens para modelos de terceros en Teams y Enterprise. Se suma al precio de la API del modelo; los modelos propios de Cursor quedan exentos.' },
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
          ['1', 'Una sesión consumiendo del uso incluido. El ritmo depende del modelo que hayas elegido.', 'Cursor Models cubre los modelos Grok y Composer; Other Models se descuenta a las tarifas de API de terceros.'],
          ['2 a 3', 'Dos o tres sesiones consumen de los mismos pozos mensuales a la vez, así que el uso incluido baja entre dos y tres veces más rápido en el mismo tiempo.', 'Una investigación larga de un repositorio consume mucho más que una pregunta breve, así que vigila la sesión que lleva más tiempo.'],
          ['4 o más', 'El consumo sigue al número de sesiones que trabajan de verdad, no al número de sesiones abiertas. Cursor no publica un límite de sesiones.', 'Detén las sesiones sin trabajo útil y mira la vista de uso de tu cuenta en vez de la etiqueta del plan.'],
        ], caption: 'Es una regla aproximada, no una tarifa publicada. Cursor mide pozos de uso y no sesiones, así que el consumo real depende del modelo y del trabajo.' },
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
        { type: 'paragraph', text: 'Cursor pone sus niveles individuales en los mismos puntos que casi toda la categoría: gratis abajo, 20 $ en medio, 200 $ arriba. Lo que cambia entre las siete CLI de agentes no es la cifra de portada, sino cómo te mide cada una, y eso es lo que decide la factura en cuanto tienes varias sesiones a la vez.' },
        { type: 'table', headers: ['Agente', 'Nivel gratuito', 'Pago más barato', 'Nivel individual más alto', 'Cómo te facturan'], rows: [
          ['Claude Code', 'No (el plan Free no incluye Claude Code)', 'Pro, 20 $/mes', 'Max 20x, 200 $/mes', 'Suscripción con ventanas de 5 horas y semanales; tokens de API opcionales'],
          ['Codex CLI', 'Limitado', 'Go, 8 $/mes', 'Pro, 200 $/mes', 'Suscripción de ChatGPT compartida con la web y el IDE; tokens de API opcionales'],
          ['Kimi Code', 'La CLI es gratis, el uso del modelo no', 'Andante, 49 ¥/mes', 'Allegro, 699 ¥/mes', 'Membresía con límites semanales y de 5 horas; API por token'],
          ['OpenCode', 'La CLI es gratis y de código abierto', 'Ninguno, pago por uso', 'Ninguno', 'Tu propia clave de proveedor, o saldo prepago por token en OpenCode Zen'],
          ['Antigravity', 'Sí, con límites de frecuencia semanales', 'Google AI Plus, unos 8 $/mes', 'Google AI Ultra 20x, 200 $/mes', 'Plan de Google AI con límites de frecuencia y créditos'],
          ['Grok Build', 'Sí, con uso limitado', 'SuperGrok, 30 $/mes', 'SuperGrok Plus, 100 $/mes', 'Límites del plan de xAI; API por token'],
          ['Cursor Agent', 'Hobby, gratis', 'Pro, 20 $/mes', 'Ultra, 200 $/mes', 'Plan de Cursor con pozos de uso por modelo'],
        ], caption: 'Niveles de entrada y superiores de cada CLI de agente, verificados el 25 de agosto de 2026. Los precios cambian a menudo; cada guía enlazada lleva su propia fecha de verificación.' },
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
    { question: '¿Cursor Agent CLI es gratis?', answer: 'Cursor muestra un plan Hobby Gratis a fecha de 25 de agosto de 2026. La CLI usa tu cuenta de Cursor, y las funciones o el uso disponibles pueden cambiar. Consulta cursor.com/pricing para conocer las condiciones actuales.' },
    { question: '¿Cuánto cuestan los planes individuales de Cursor?', answer: 'Cursor muestra Pro por 20 $, Pro+ por 60 $ y Ultra por 200 $ al mes a fecha de 25 de agosto de 2026.' },
    { question: '¿Cuánto cuesta Cursor Teams?', answer: 'Cursor muestra Teams Standard por 40 $ y Teams Premium por 120 $ al mes por usuario a fecha de 25 de agosto de 2026.' },
    { question: '¿Cómo mide Cursor el uso incluido?', answer: 'Los planes individuales actuales separan el uso entre Cursor Models y Other Models. El modelo elegido cambia el consumo porque los modelos de terceros se descuentan a sus tarifas de API.' },
    { question: '¿CodeAgentSwarm cobra por los modelos de Cursor?', answer: 'La integración ACP no crea un cargo independiente por uso del modelo. La autenticación, la suscripción y el uso permanecen en tu cuenta de Cursor o CURSOR_API_KEY.' },
    { question: '¿Cursor CLI cuesta algo aparte del plan de Cursor?', answer: 'No. Cursor Agent CLI usa la suscripción y el uso que ya tiene tu cuenta de Cursor, tanto si entras con cursor-agent login como si defines CURSOR_API_KEY. CodeAgentSwarm inicia la CLI oficial mediante ACP y no crea una factura de modelos aparte.' },
    { question: '¿Qué plan de Cursor necesito para ejecutar varias sesiones de Cursor Agent a la vez?', answer: 'Cursor no publica un límite de sesiones, así que la respuesta sale de tu propio consumo. Pro, Pro+ y Ultra incluyen los pozos Cursor Models y Other Models, y las sesiones paralelas consumen de ellos de forma independiente, así que más sesiones agotan antes el uso incluido. Mira la vista de uso de tu cuenta antes de comprometerte con un nivel.' },
  ],
}

export default guide
