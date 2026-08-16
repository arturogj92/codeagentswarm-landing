import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-uso-cursor-cli',
    locale: 'es',
    title: 'Precios y uso de Cursor CLI explicados',
    metaTitle: 'Precios, planes y uso de Cursor CLI (2026)',
    metaDescription: 'Entiende los precios y el uso de Cursor CLI: Hobby Gratis, Pro desde 20 $ al mes, Teams por 40 $ al mes por usuario y opciones actuales de 3x y 20x.',
    intro: `Cursor Agent CLI utiliza tu cuenta de Cursor. Ejecutarlo mediante ACP no genera una factura independiente de modelos en CodeAgentSwarm. Inicias sesión con <code>cursor-agent login</code> o proporcionas <code>CURSOR_API_KEY</code>, y Cursor aplica la suscripción y el uso asociados a esa cuenta.

Según la página de precios de Cursor del 16 de agosto de 2026, Hobby es Gratis, Pro empieza en 20 $ al mes y Teams cuesta 40 $ al mes por usuario. Cursor también muestra opciones individuales con 3x y 20x de uso. Los precios y el uso incluido pueden cambiar, así que consulta la <a href="https://cursor.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de precios de Cursor</a> antes de comprar.`,
    ctaText: 'Usa tu propia cuenta de Cursor en CodeAgentSwarm y supervisa sesiones de Cursor Agent sin trasladar la facturación de modelos fuera de Cursor.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Precios', 'Uso'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-cli-pricing',
  },
  sections: [
    {
      id: 'planes-resumen',
      title: 'Resumen de los planes de Cursor',
      content: [
        { type: 'table', headers: ['Plan', 'Precio o posición de uso publicada', 'Qué puede verificar esta guía'], rows: [
          ['Hobby', 'Gratis', 'El plan individual gratuito de entrada'],
          ['Pro', 'Desde 20 $ al mes', 'El plan individual de pago de entrada'],
          ['Pro+', '3x los límites de Agent de Pro', 'El nivel individual de mayor uso'],
          ['Ultra', '20x los límites de Agent de Pro', 'El nivel para usuarios intensivos'],
          ['Teams', '40 $ al mes por usuario', 'Precio por usuario para equipos'],
        ], caption: 'Los precios de Cursor cambian con el tiempo. Comprueba la página actual y tu cuenta antes de preparar un presupuesto.' },
        { type: 'callout', variant: 'warning', content: 'La tabla recoge lo que Cursor mostraba el 16 de agosto de 2026. No promete un precio fijo, un número de solicitudes ni una asignación concreta de modelos.' },
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
      id: 'multiplicadores-uso',
      title: 'Qué significan las etiquetas de uso 3x y 20x',
      content: [
        { type: 'paragraph', text: 'Cursor presenta actualmente opciones individuales superiores con etiquetas de uso 3x y 20x. Esos multiplicadores describen el uso incluido de forma relativa en la página de precios. No son una promesa verificada de un número fijo de solicitudes al agente.' },
        { type: 'paragraph', text: 'El consumo real depende del trabajo, del modelo seleccionado y del número de sesiones activas. Una investigación larga de un repositorio puede consumir más que una pregunta breve, y varios agentes paralelos consumen uso de forma independiente.' },
        { type: 'callout', variant: 'info', content: 'Consulta la información de uso dentro de tu cuenta de Cursor para conocer la asignación que se aplica a tu caso. Las etiquetas públicas de los planes no sustituyen los datos de uso específicos de la cuenta.' },
      ],
    },
    {
      id: 'agentes-paralelos',
      title: 'Presupuesta el uso de varios agentes de Cursor',
      content: [
        { type: 'paragraph', text: 'Un flujo paralelo puede terminar antes varias tareas independientes, pero también tiene más sesiones leyendo código e invocando modelos. Asigna a cada agente una tarea clara y detén las sesiones que ya no tengan trabajo útil.' },
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
      id: 'elegir-plan',
      title: 'Elige un plan con tu propia carga de trabajo',
      content: [
        { type: 'list', items: ['Empieza por el plan disponible en tu cuenta y prueba trabajo representativo del repositorio.', 'Observa el uso de la cuenta de Cursor con una sesión antes de añadir agentes paralelos.', 'Compara los requisitos individuales y de Teams en la página oficial de precios actual.', 'Vuelve a comprobar los precios antes de renovar o desplegar en un equipo porque las condiciones pueden cambiar.'] },
        { type: 'paragraph', text: 'Una página de precios no puede predecir el coste de tu repositorio. Mide una semana normal de tareas y elige el plan más pequeño que cubra esa carga con un margen razonable.' },
      ],
    },
  ],
  faq: [
    { question: '¿Cursor Agent CLI es gratis?', answer: 'Cursor muestra un plan Hobby Gratis a fecha de 16 de agosto de 2026. La CLI usa tu cuenta de Cursor, y las funciones o el uso disponibles pueden cambiar. Consulta cursor.com/pricing para conocer las condiciones actuales.' },
    { question: '¿Cuánto cuesta Cursor Pro?', answer: 'Cursor muestra Pro desde 20 $ al mes a fecha de 16 de agosto de 2026. Comprueba la página oficial porque los precios y el uso incluido pueden cambiar.' },
    { question: '¿Cuánto cuesta Cursor Teams?', answer: 'Cursor muestra Teams por 40 $ al mes por usuario a fecha de 16 de agosto de 2026. Confirma las condiciones de facturación actuales con Cursor antes de desplegarlo en un equipo.' },
    { question: '¿Qué significan 3x y 20x en los precios de Cursor?', answer: 'Son etiquetas relativas de uso para opciones individuales superiores. Esta guía no las convierte en un número fijo de solicitudes al agente.' },
    { question: '¿CodeAgentSwarm cobra por los modelos de Cursor?', answer: 'La integración ACP no crea un cargo independiente por uso del modelo. La autenticación, la suscripción y el uso permanecen en tu cuenta de Cursor o CURSOR_API_KEY.' },
  ],
}

export default guide
