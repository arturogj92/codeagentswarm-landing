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
        { type: 'paragraph', text: 'Cursor publica un instalador para macOS, Linux y Windows mediante WSL. CodeAgentSwarm detecta de forma explícita el binario <code>cursor-agent</code> resultante.' },
        { type: 'code', language: 'bash', code: 'curl https://cursor.com/install -fsS | bash\ncursor-agent --version\ncursor-agent login\ncursor-agent status' },
        { type: 'paragraph', text: 'Para CI u otro entorno no interactivo, Cursor también admite <code>CURSOR_API_KEY</code>. En el escritorio, el login del navegador usa tu cuenta de Cursor y su suscripción o consumo.' },
        { type: 'callout', variant: 'warning', content: 'En Windows nativo, instala y ejecuta Cursor CLI dentro de WSL. Cursor no documenta actualmente una instalación nativa de su CLI para Windows.' },
      ],
    },
    {
      id: 'mcp',
      title: 'MCP, reglas, skills y extensiones de Cursor',
      content: [
        { type: 'paragraph', text: 'Cursor Agent sigue leyendo los servidores MCP de proyecto o usuario desde <code>.cursor/mcp.json</code>. También aplica las reglas y skills de Cursor. CodeAgentSwarm no envía una segunda copia de esos servidores por ACP, así que tu configuración de Cursor sigue siendo la fuente de verdad.' },
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
    { question: '¿Sigue funcionando la configuración MCP de Cursor?', answer: 'Sí. Cursor Agent continúa leyendo .cursor/mcp.json a nivel de proyecto o usuario.' },
    { question: '¿CodeAgentSwarm puede reanudar cualquier conversación de Cursor?', answer: 'Solo cuando la versión instalada de Cursor CLI anuncia soporte ACP para loadSession. Las versiones antiguas pueden iniciar chats nuevos, pero muestran una instrucción de actualización en vez de una acción rota.' },
    { question: '¿Cursor Agent CLI funciona en Windows?', answer: 'Cursor documenta su CLI en Windows mediante WSL. CodeAgentSwarm informa de esta limitación en vez de intentar una instalación nativa.' },
  ],
}

export default guide
