import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-agent-cli-acp-codeagentswarm',
    locale: 'es',
    title: 'Cursor Agent CLI en CodeAgentSwarm: configuración ACP',
    metaTitle: 'Cursor Agent CLI en CodeAgentSwarm: configuración ACP (2026)',
    metaDescription: 'Ejecuta Cursor Agent CLI en CodeAgentSwarm mediante ACP. Instala cursor-agent, inicia sesión, supervisa herramientas y usa Agent, Plan o Ask en una app.',
    intro: `Cursor Agent CLI puede funcionar como agente de primera clase dentro de CodeAgentSwarm mediante el Agent Client Protocol (ACP) oficial. Mantienes tu cuenta de Cursor, modelos, reglas, skills y configuración MCP. CodeAgentSwarm añade una interfaz Chat supervisada para respuestas en streaming, herramientas, permisos y cancelación.

El comando importante es <code>cursor-agent</code>. CodeAgentSwarm no usa el comando genérico <code>agent</code> porque otra CLI instalada puede ser su propietaria.`,
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
      title: 'MCP, reglas, skills y extensiones de Cursor',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm lee los servidores MCP de usuario y proyecto desde <code>.cursor/mcp.json</code> sin modificar ninguno de los archivos. Las entradas del proyecto prevalecen sobre las de usuario con el mismo nombre, y los servidores combinados se envían mediante el campo nativo <code>mcpServers</code> de ACP. Las reglas y skills siguen perteneciendo a Cursor.' },
        { type: 'paragraph', text: 'El adaptador ACP también entiende las solicitudes específicas de Cursor para preguntas, planes, todos, tareas delegadas e imágenes generadas. Se convierten en elementos nativos de la conversación en vez de aparecer como JSON sin procesar.' },
      ],
    },
    {
      id: 'reanudar',
      title: 'Historial y compatibilidad entre versiones',
      content: [
        { type: 'paragraph', text: 'Las versiones de Cursor difieren en su soporte de reanudación por ACP. CodeAgentSwarm habilita <code>session/load</code> solo cuando el handshake informa <code>agentCapabilities.loadSession: true</code>. Así no muestra un botón de reanudar que nunca podría funcionar.' },
        { type: 'code', language: 'bash', code: 'cursor-agent update\n# cursor-agent upgrade también funciona' },
        { type: 'callout', variant: 'info', content: 'Una versión antigua de Cursor CLI aún puede iniciar un Chat nuevo. CodeAgentSwarm muestra cómo actualizar y no guarda ese Chat como reanudable hasta que la capacidad esté disponible.' },
      ],
    },
    {
      id: 'paralelo',
      title: 'Ejecutar Cursor Agent junto a otros agentes',
      content: [
        { type: 'paragraph', text: 'Crea un Chat de Cursor para una tarea e inicia Codex, Claude Code u otra CLI compatible para la siguiente. Cada agente tiene su propia sesión y contexto de proyecto, mientras CodeAgentSwarm mantiene visibles el estado, permisos, avance de tareas e historial.' },
        { type: 'paragraph', text: 'Es útil cuando quieres los modelos y reglas de proyecto de Cursor sin mover cada tarea al editor, o cuando un flujo con varios agentes necesita una superficie común de supervisión.' },
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
