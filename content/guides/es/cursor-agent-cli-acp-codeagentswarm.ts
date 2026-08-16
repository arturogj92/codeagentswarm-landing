import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-agent-cli-acp-codeagentswarm',
    locale: 'es',
    title: 'Guía de Cursor CLI: instalación, modo Agent y ACP',
    metaTitle: 'Guía de Cursor CLI: instala Cursor Agent y usa ACP',
    metaDescription: 'Instala Cursor CLI, inicia sesión y ejecuta cursor-agent mediante ACP. Usa Agent, Plan o Ask con streaming, permisos, MCP, Skills e imágenes.',
    intro: `Cursor Agent CLI puede funcionar como agente de primera clase dentro de CodeAgentSwarm mediante el Agent Client Protocol (ACP) oficial. Mantienes tu cuenta de Cursor, modelos, reglas, skills y configuración MCP. CodeAgentSwarm añade una interfaz Chat supervisada para respuestas en streaming, herramientas, permisos y cancelación.

El comando importante es <code>cursor-agent</code>. CodeAgentSwarm no usa el alias genérico <code>agent</code> porque otra CLI instalada puede ser su propietaria. Cursor IDE y Cursor Agent CLI pertenecen al mismo producto, pero son interfaces distintas: el IDE es el editor y <code>cursor-agent</code> funciona desde un terminal o un cliente ACP.`,
    ctaText: 'Ejecuta Cursor Agent junto al resto de tus agentes con Chat en streaming, permisos visibles, historial por proyecto y un solo sitio para supervisarlo todo.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor Agent CLI', 'ACP'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-agent-cli-acp-codeagentswarm',
  },
  sections: [
    {
      id: 'que-hace',
      title: 'Qué hace la integración de Cursor por ACP',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm inicia <code>cursor-agent acp</code> por stdio y habla JSON-RPC. Cursor sigue siendo el proveedor de modelos y herramientas. La app presenta cada turno, llamada de herramienta y decisión en el mismo espacio que Claude Code, Codex CLI, OpenCode, Kimi Code, Antigravity CLI y Grok Build.' },
        { type: 'list', items: ['Muestra texto y herramientas en streaming mientras Cursor trabaja', 'Permite aprobar o rechazar comandos sin bloquear la sesión', 'Cancela una respuesta activa', 'Expone los modos Agent, Plan y Ask de Cursor', 'Permite elegir los modelos de la sesión activa', 'Acepta imágenes cuando la versión instalada anuncia esa capacidad'] },
      ],
    },
    {
      id: 'instalar',
      title: 'Instalar y autenticar Cursor Agent CLI',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm detecta <code>cursor-agent</code> de forma explícita y puede ejecutar el instalador oficial de Cursor para macOS, Linux o Windows nativo cuando falta la CLI.' },
        { type: 'code', language: 'bash', code: '# macOS o Linux\ncurl https://cursor.com/install -fsS | bash\n\n# PowerShell en Windows nativo\nirm \'https://cursor.com/install?win32=true\' | iex\n\ncursor-agent --version\ncursor-agent login\ncursor-agent status' },
        { type: 'paragraph', text: 'Para CI u otro entorno no interactivo, Cursor también admite <code>CURSOR_API_KEY</code>. En el escritorio, el login del navegador usa tu cuenta de Cursor y su suscripción o consumo.' },
        { type: 'callout', variant: 'info', content: 'En Windows, CodeAgentSwarm descarga el instalador PowerShell oficial de Cursor y verifica el cursor-agent.cmd nativo antes de iniciar Chat. Nunca usa como alternativa un comando agent genérico.' },
      ],
    },
    {
      id: 'mcp',
      title: 'Usar los modos Agent, Plan y Ask',
      content: [
        { type: 'paragraph', text: 'Elige la interacción antes de enviar el prompt. <strong>Agent</strong> puede inspeccionar y modificar el proyecto, <strong>Plan</strong> prepara el enfoque de implementación antes de editar y <strong>Ask</strong> es la opción de solo lectura para explicaciones e investigación. CodeAgentSwarm conserva la selección al reabrir el Chat o pasar una sesión de la vista terminal a Chat.' },
        { type: 'paragraph', text: 'El mismo Chat muestra los modelos de Cursor y permite adjuntar imágenes cuando la versión conectada anuncia esas capacidades ACP. Las respuestas, herramientas y solicitudes de permiso aparecen mientras ocurren, y Detener cancela el turno activo.' },
      ],
    },
    {
      id: 'mcp-configuracion',
      title: 'MCP, reglas, skills y extensiones de Cursor',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm lee los servidores MCP de usuario y proyecto desde <code>.cursor/mcp.json</code> sin modificar ninguno de los archivos. Las entradas del proyecto prevalecen sobre las de usuario con el mismo nombre, y los servidores combinados se envían mediante el campo nativo <code>mcpServers</code> de ACP. Las reglas y skills siguen perteneciendo a Cursor.' },
        { type: 'paragraph', text: 'El adaptador ACP también entiende las solicitudes específicas de Cursor para preguntas, planes, todos, tareas delegadas e imágenes generadas. Se convierten en elementos nativos de la conversación en vez de aparecer como JSON sin procesar.' },
        { type: 'paragraph', text: 'La instalación, los modos, MCP y Skills pertenecen a esta guía. Para flujos concretos, sigue con el <a href="/es/guias/historial-conversaciones-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de Cursor CLI</a>, el <a href="/es/guias/enjambre-de-agentes-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de Cursor Agent</a> o la guía de <a href="/es/guias/cursor-cli-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI en Windows</a>.' },
      ],
    },
    {
      id: 'reanudar',
      title: 'Historial y compatibilidad entre versiones',
      content: [
        { type: 'paragraph', text: 'Las versiones de Cursor difieren en su soporte de reanudación por ACP. CodeAgentSwarm habilita <code>session/load</code> solo cuando el handshake informa <code>agentCapabilities.loadSession: true</code>. Así no muestra un botón de reanudar que nunca podría funcionar.' },
        { type: 'code', language: 'bash', code: 'cursor-agent update\n# cursor-agent upgrade también funciona' },
        { type: 'callout', variant: 'info', content: 'Una versión antigua de Cursor CLI aún puede iniciar un Chat nuevo. CodeAgentSwarm muestra cómo actualizar y no guarda ese Chat como reanudable hasta que la capacidad esté disponible.' },
        { type: 'paragraph', text: 'La guía de <a href="/es/guias/historial-conversaciones-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">historial y reanudación</a> explica qué cambia cuando una versión ACP antigua informa <code>loadSession: false</code>.' },
      ],
    },
    {
      id: 'paralelo',
      title: 'Ejecutar Cursor Agent junto a otros agentes',
      content: [
        { type: 'paragraph', text: 'Crea un Chat de Cursor para una tarea e inicia Codex, Claude Code u otra CLI compatible para la siguiente. Cada agente tiene su propia sesión y contexto de proyecto, mientras CodeAgentSwarm mantiene visibles el estado, permisos, avance de tareas e historial.' },
        { type: 'paragraph', text: 'Es útil cuando quieres los modelos y reglas de proyecto de Cursor sin mover cada tarea al editor, o cuando un flujo con varios agentes necesita una superficie común de supervisión.' },
        { type: 'paragraph', text: 'Consulta la guía del <a href="/es/guias/enjambre-de-agentes-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de Cursor Agent</a> para patrones de aislamiento y reparto de tareas, o compara el flujo en <a href="/es/guias/cursor-cli-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI vs Claude Code</a>.' },
      ],
    },
  ],
  faq: [
    { question: '¿CodeAgentSwarm usa la CLI oficial de Cursor Agent?', answer: 'Sí. Inicia el binario oficial cursor-agent en modo ACP mediante stdio y JSON-RPC.' },
    { question: '¿Cursor Agent consume mi suscripción de Cursor?', answer: 'Sí. Inicia sesión con cursor-agent login o usa CURSOR_API_KEY. La autenticación y el consumo siguen perteneciendo a Cursor.' },
    { question: '¿Sigue funcionando la configuración MCP de Cursor?', answer: 'Sí. CodeAgentSwarm lee los archivos .cursor/mcp.json de usuario y proyecto sin modificarlos y envía los servidores combinados mediante ACP.' },
    { question: '¿CodeAgentSwarm puede reanudar cualquier conversación de Cursor?', answer: 'Solo cuando la versión instalada de Cursor CLI anuncia soporte ACP para loadSession. Las versiones antiguas pueden iniciar chats nuevos, pero muestran una instrucción de actualización en vez de una acción rota.' },
    { question: '¿Cursor Agent CLI funciona en Windows?', answer: 'Sí. CodeAgentSwarm puede instalar y ejecutar Cursor Agent de forma nativa en Windows con el instalador PowerShell oficial de Cursor.' },
  ],
}

export default guide
