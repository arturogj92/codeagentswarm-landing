import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-cursor-cli',
    locale: 'es',
    title: 'Cómo ejecutar un enjambre de Cursor Agent',
    metaTitle: 'Enjambre de Cursor Agent: varias sesiones CLI (2026)',
    metaDescription: 'Ejecuta varias sesiones de Cursor Agent CLI en CodeAgentSwarm. Reparte tareas, usa Agent, Plan o Ask y supervisa permisos sin perder tu MCP de Cursor.',
    intro: `Un enjambre de Cursor Agent es un grupo de sesiones de Cursor CLI que trabajan al mismo tiempo en tareas distintas. Cada sesión tiene su propia conversación y contexto de proyecto. CodeAgentSwarm reúne esas sesiones en un espacio de escritorio para que veas cuál está trabajando, esperando un permiso o lista para recibir instrucciones.

Esta configuración usa el comando oficial <code>cursor-agent</code> y su transporte ACP. Tu inicio de sesión, suscripción, uso de modelos y configuración de <code>.cursor/mcp.json</code> permanecen en Cursor.`,
    ctaText: 'Ejecuta sesiones especializadas de Cursor Agent en paralelo y supervisa su progreso, permisos e historial desde un solo espacio.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor Agent', 'Enjambre'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-agent-swarm',
  },
  sections: [
    {
      id: 'que-es-enjambre-cursor',
      title: '¿Qué es un enjambre de Cursor Agent?',
      content: [
        { type: 'callout', variant: 'tip', content: 'Un enjambre útil asigna una tarea acotada a cada Cursor Agent. Las sesiones paralelas ayudan cuando sus responsabilidades son lo bastante claras para evitar que editen el mismo código a ciegas.' },
        { type: 'paragraph', text: 'La palabra enjambre describe el flujo de trabajo, no un producto diferente de Cursor. Inicias varias sesiones oficiales de Cursor Agent CLI, asignas trabajo independiente y supervisas los resultados en conjunto.' },
        { type: 'paragraph', text: 'CodeAgentSwarm inicia Cursor mediante <code>cursor-agent acp</code>. El texto, la actividad de herramientas, las solicitudes de permisos y la cancelación circulan por ACP mientras cada sesión sigue usando tu cuenta de Cursor.' },
      ],
    },
    {
      id: 'preparar-cursor',
      title: 'Prepara Cursor Agent CLI',
      content: [
        { type: 'code', language: 'bash', code: 'cursor-agent --version\ncursor-agent login\ncursor-agent status' },
        { type: 'paragraph', text: 'Puedes usar <code>CURSOR_API_KEY</code> en lugar del inicio de sesión interactivo cuando corresponda. CodeAgentSwarm detecta <code>cursor-agent</code> de forma explícita, algo importante en equipos donde el comando genérico <code>agent</code> pertenece a Grok.' },
        { type: 'paragraph', text: 'La instalación y el flujo ACP completos están en la <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de configuración de Cursor Agent CLI</a>. La instalación nativa en Windows tiene su propia guía de <a href="/es/guias/cursor-cli-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI en Windows</a>.' },
      ],
    },
    {
      id: 'repartir-trabajo',
      title: 'Reparte el trabajo entre sesiones paralelas de Cursor',
      content: [
        { type: 'paragraph', text: 'Empieza por tareas con archivos distintos o puntos de entrega claros. Una sesión puede investigar una prueba que falla mientras otra redacta documentación. Una tercera puede usar el modo Plan para estudiar un cambio mayor antes de que alguien edite código.' },
        { type: 'list', items: ['Usa el modo Agent para implementar con herramientas y cambios de archivos.', 'Usa el modo Plan para investigar y preparar un enfoque antes de ejecutarlo.', 'Usa el modo Ask para explicaciones y preguntas que no deberían iniciar una tarea de código.', 'Asigna a cada sesión un resultado concreto y una ruta de proyecto.', 'Revisa las solicitudes de permisos y los archivos modificados antes de combinar trabajo relacionado.'] },
        { type: 'callout', variant: 'warning', content: 'Dos agentes que editan las mismas líneas todavía pueden entrar en conflicto. Separa el trabajo por componente, conjunto de archivos u orden de dependencias y después intégralo con una revisión normal de control de versiones.' },
      ],
    },
    {
      id: 'supervisar-enjambre',
      title: 'Supervisa el streaming, los permisos y la cancelación',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm muestra en streaming el texto y las llamadas de herramientas de Cursor dentro de cada Chat. Una solicitud de permiso permanece visible y se puede aprobar o rechazar desde la app, por lo que una sesión en espera no queda escondida entre pestañas de terminal.' },
        { type: 'paragraph', text: 'Cancela la respuesta activa cuando una tarea va en la dirección equivocada. La cancelación detiene ese turno sin obligarte a cerrar todo el espacio de trabajo.' },
        { type: 'paragraph', text: 'Las extensiones de Cursor para preguntas, planes, tareas pendientes, tareas delegadas e imágenes generadas aparecen como elementos estructurados cuando la CLI activa las expone.' },
      ],
    },
    {
      id: 'mcp-modelos',
      title: 'Conserva los servidores MCP, modelos e imágenes de Cursor',
      content: [
        { type: 'paragraph', text: 'Cursor lee la configuración MCP del proyecto o del usuario desde <code>.cursor/mcp.json</code>. CodeAgentSwarm pasa la configuración combinada mediante ACP en vez de pedirte que mantengas otra copia.' },
        { type: 'paragraph', text: 'Cada Chat puede usar los modos y modelos que exponga la sesión de Cursor. Los archivos de imagen están disponibles cuando la versión instalada de Cursor anuncia esa compatibilidad.' },
        { type: 'paragraph', text: 'El uso de las sesiones paralelas se descuenta de tu cuenta de Cursor. Consulta <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">precios y uso de Cursor CLI</a> antes de decidir cuántos agentes mantendrás activos.' },
      ],
    },
    {
      id: 'historial-reanudacion',
      title: 'Vuelve a la sesión correcta de Cursor',
      content: [
        { type: 'paragraph', text: 'Varias sesiones paralelas producen varios historiales. Describe bien el trabajo y usa la vista común de Historial para volver a la sesión que ya conoce la tarea.' },
        { type: 'paragraph', text: 'La reanudación ACP en Chat solo se activa cuando Cursor informa de <code>agentCapabilities.loadSession: true</code>. La <a href="/es/guias/historial-conversaciones-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Cursor CLI</a> explica la alternativa para versiones antiguas.' },
      ],
    },
  ],
  faq: [
    { question: '¿Puedo ejecutar varias sesiones de Cursor Agent a la vez?', answer: 'Sí. Cada proceso cursor-agent puede realizar una tarea distinta y CodeAgentSwarm reúne esas sesiones en un espacio para ver estado, streaming, permisos e historial.' },
    { question: '¿Un enjambre de Cursor Agent exige otra cuenta de Cursor?', answer: 'No. Las sesiones se autentican con tu inicio de sesión existente de Cursor o CURSOR_API_KEY y consumen la suscripción o el uso de esa cuenta.' },
    { question: '¿Qué modo de Cursor debería usar cada agente?', answer: 'Usa Agent para implementar, Plan para investigar y planificar, y Ask para preguntas o explicaciones. Las opciones disponibles proceden de la sesión ACP de Cursor.' },
    { question: '¿Los servidores MCP de Cursor funcionan en cada sesión del enjambre?', answer: 'CodeAgentSwarm lee los archivos .cursor/mcp.json del usuario y del proyecto y pasa la configuración combinada mediante ACP a las sesiones de Cursor.' },
    { question: '¿Cómo evito conflictos entre agentes de Cursor?', answer: 'Asigna componentes, archivos o fases de trabajo diferentes. Revisa los permisos y los cambios antes de integrar trabajo que afecte a código relacionado.' },
  ],
}

export default guide
