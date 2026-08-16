import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-cursor-cli',
    locale: 'es',
    title: 'Historial de Cursor CLI: cómo encontrar y reanudar sesiones',
    metaTitle: 'Historial de Cursor CLI y reanudación de sesiones (2026)',
    metaDescription: 'Encuentra el historial de Cursor CLI, comprueba la reanudación ACP y vuelve a abrir sesiones compatibles de Cursor Agent en CodeAgentSwarm.',
    intro: `Cursor Agent CLI conserva sesiones a las que puedes volver más tarde. La compatibilidad con la reanudación mediante ACP depende de la versión instalada de Cursor. Una versión reciente puede anunciar <code>agentCapabilities.loadSession: true</code> y volver a abrir una sesión en Chat. Las versiones antiguas todavía pueden iniciar chats nuevos, pero no deberían ofrecer una acción de reanudación que terminará agotando el tiempo de espera.

CodeAgentSwarm comprueba esa capacidad antes de activar la reanudación en Chat. Puedes consultar las conversaciones de Cursor junto al historial de tus otros agentes y volver a abrir una sesión compatible, o continuar en un terminal cuando sea necesario actualizar la CLI instalada.`,
    ctaText: 'Mantén las sesiones de Cursor Agent visibles junto a tus otros agentes, con controles de reanudación adaptados a la capacidad que anuncia la CLI instalada.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Historial', 'Reanudar'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-cli-conversation-history',
  },
  sections: [
    {
      id: 'como-funciona-historial',
      title: 'Cómo funciona el historial de conversaciones de Cursor CLI',
      content: [
        { type: 'callout', variant: 'tip', content: 'Respuesta rápida: CodeAgentSwarm encuentra los registros de sesión de Cursor en el historial local. ACP carga la sesión elegida en Chat solo cuando el saludo inicial de la CLI confirma la capacidad <code>loadSession</code>.' },
        { type: 'paragraph', text: 'Una sesión guardada de Cursor Agent contiene el contexto acumulado durante una conversación. Volver a abrirla puede evitar que repitas el objetivo del proyecto, las decisiones anteriores y el trabajo que ya se completó.' },
        { type: 'paragraph', text: 'CodeAgentSwarm presenta las sesiones de Cursor en la misma vista de historial que tus otros agentes compatibles. Así tienes un lugar donde encontrar trabajo por proyecto y fecha, mientras Cursor sigue siendo responsable de la sesión y del uso del modelo.' },
      ],
    },
    {
      id: 'comprobar-reanudacion',
      title: 'Comprueba si tu Cursor CLI puede reanudar mediante ACP',
      content: [
        { type: 'paragraph', text: 'Los clientes ACP conocen la compatibilidad con la reanudación durante el saludo inicial. CodeAgentSwarm busca <code>agentCapabilities.loadSession: true</code>. No presupone que todas las versiones instaladas de Cursor admiten <code>session/load</code>.' },
        { type: 'code', language: 'bash', code: 'cursor-agent --version\ncursor-agent status\ncursor-agent update' },
        { type: 'callout', variant: 'info', content: 'Si la reanudación en Chat está desactivada, actualiza Cursor Agent y vuelve a abrir el Historial. Los chats nuevos siguen funcionando en versiones antiguas, así que la falta de esta capacidad no impide usar Cursor Agent.' },
      ],
    },
    {
      id: 'reanudar-codeagentswarm',
      title: 'Reanuda una sesión de Cursor Agent en CodeAgentSwarm',
      content: [
        { type: 'list', items: ['Abre el Historial desde un terminal de CodeAgentSwarm.', 'Elige una conversación de Cursor Agent.', 'Selecciona Chat cuando la reanudación esté disponible, o Terminal cuando la CLI instalada no la anuncie.', 'Continúa con el contexto anterior después de que Cursor cargue la sesión.'] },
        { type: 'paragraph', text: 'La comprobación de capacidad evita el tiempo de espera agotado de <code>session/load</code> que aparece con versiones antiguas de Cursor. Cuando no se puede reanudar en Chat, la app explica que debes ejecutar <code>cursor-agent update</code> en lugar de dejar la sesión esperando.' },
        { type: 'paragraph', text: 'Para consultar la instalación, la autenticación, los modos y el comportamiento de MCP, lee la <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Cursor Agent CLI mediante ACP</a>.' },
      ],
    },
    {
      id: 'historial-enjambre',
      title: 'Mantén un historial útil al ejecutar varios agentes',
      content: [
        { type: 'paragraph', text: 'El historial gana valor cuando un proyecto tiene varias sesiones activas. Da a cada Cursor Agent una tarea concreta y usa el contexto del proyecto y de la sesión para volver al hilo correcto en vez de abrir otro chat vacío.' },
        { type: 'paragraph', text: 'La <a href="/es/guias/enjambre-de-agentes-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de Cursor Agent</a> explica cómo repartir trabajo entre sesiones. Si estás configurando otro equipo, la guía de <a href="/es/guias/cursor-cli-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI en Windows</a> cubre el instalador nativo y el conflicto de comandos que puede afectar a la detección.' },
      ],
    },
    {
      id: 'privacidad-propiedad',
      title: 'Quién controla la sesión y su uso',
      content: [
        { type: 'paragraph', text: 'Cursor autentica tu cuenta mediante <code>cursor-agent login</code> o <code>CURSOR_API_KEY</code>. Sus modelos, la suscripción y el uso permanecen en Cursor. CodeAgentSwarm actúa como cliente ACP que muestra y supervisa la conversación.' },
        { type: 'paragraph', text: 'La configuración MCP del usuario y del proyecto sigue procediendo de <code>.cursor/mcp.json</code>. Reanudar una sesión no exige duplicar esa configuración en CodeAgentSwarm.' },
        { type: 'paragraph', text: 'Para conocer los planes actuales y los límites de la información pública sobre el uso, consulta <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">precios y uso de Cursor CLI</a>.' },
      ],
    },
  ],
  faq: [
    { question: '¿Puede Cursor CLI reanudar conversaciones antiguas?', answer: 'Puede hacerlo cuando la versión instalada de Cursor anuncia la capacidad ACP loadSession. CodeAgentSwarm la comprueba antes de activar la reanudación en Chat.' },
    { question: '¿Por qué está desactivada la reanudación en Chat para una conversación de Cursor?', answer: 'Es posible que tu Cursor CLI no anuncie agentCapabilities.loadSession. Ejecuta cursor-agent update y vuelve a abrir el Historial. Mientras tanto, puedes iniciar un Chat nuevo de Cursor.' },
    { question: '¿Debo proteger el trabajo importante antes de actualizar Cursor Agent?', answer: 'Sí. Haz commit o guarda un punto de control de los cambios importantes y consulta las notas de Cursor si te preocupa conservar las sesiones. Cursor controla el almacenamiento; CodeAgentSwarm no lo reescribe durante la actualización.' },
    { question: '¿Puedo ver las sesiones de Cursor junto a conversaciones de otros agentes?', answer: 'Sí. CodeAgentSwarm presenta las sesiones de Cursor Agent en su historial común junto a los demás agentes compatibles.' },
    { question: '¿Una sesión reanudada consume el uso de mi plan de Cursor?', answer: 'Sí. La autenticación y el uso del modelo permanecen en tu cuenta de Cursor o CURSOR_API_KEY, tanto al iniciar una sesión nueva como al reanudar una compatible.' },
  ],
}

export default guide
