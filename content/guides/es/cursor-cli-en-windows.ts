import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-en-windows',
    locale: 'es',
    title: 'Cómo instalar y ejecutar Cursor CLI en Windows',
    metaTitle: 'Cursor CLI en Windows: instalación nativa (2026)',
    metaDescription: 'Instala Cursor Agent CLI de forma nativa en Windows con PowerShell, inicia sesión, evita el conflicto con agent de Grok y abre un Chat ACP.',
    intro: `Cursor ofrece un instalador nativo para Cursor Agent CLI en Windows. Ejecuta el comando oficial de PowerShell, verifica el ejecutable explícito <code>cursor-agent</code> e inicia sesión con tu cuenta de Cursor. No necesitas sustituirlo por el comando genérico <code>agent</code>.

Ese nombre de comando importa. En un equipo Windows que también tenga Grok, <code>agent</code> puede pertenecer a Grok. El binario documentado de Cursor es <code>cursor-agent</code>, y CodeAgentSwarm detecta exactamente ese ejecutable.`,
    ctaText: 'Instala Cursor Agent de forma nativa en Windows y ejecuta su Chat ACP junto a tus otros agentes en CodeAgentSwarm.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Windows'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-cli-on-windows',
  },
  sections: [
    {
      id: 'requisitos',
      title: 'Qué necesitas antes de instalar Cursor CLI',
      content: [
        { type: 'list', items: ['Una cuenta de usuario de Windows que pueda ejecutar comandos de PowerShell', 'Una cuenta de Cursor para el inicio de sesión interactivo, o CURSOR_API_KEY', 'Una carpeta de proyecto a la que Cursor Agent pueda acceder', 'CodeAgentSwarm si quieres la interfaz Chat ACP y supervisión de varios agentes'] },
        { type: 'callout', variant: 'info', content: 'Cursor describe actualmente Cursor Agent CLI como software beta. Los comandos y capacidades pueden cambiar entre versiones, así que consulta la documentación oficial de Cursor cuando actualices.' },
      ],
    },
    {
      id: 'instalar-nativo',
      title: 'Instala Cursor Agent con el comando oficial de Windows',
      content: [
        { type: 'paragraph', text: 'Abre PowerShell y ejecuta el instalador nativo de Cursor:' },
        { type: 'code', language: 'powershell', code: "irm 'https://cursor.com/install?win32=true' | iex" },
        { type: 'paragraph', text: 'Cierra y vuelve a abrir PowerShell si el instalador ha cambiado tu PATH. Después, comprueba el comando instalado:' },
        { type: 'code', language: 'powershell', code: 'cursor-agent --version\nGet-Command cursor-agent' },
        { type: 'paragraph', text: 'CodeAgentSwarm puede ejecutar el mismo instalador oficial cuando falta Cursor Agent. La app comprueba el archivo nativo <code>cursor-agent.cmd</code> antes de iniciar Chat.' },
      ],
    },
    {
      id: 'autenticar',
      title: 'Inicia sesión y comprueba la autenticación',
      content: [
        { type: 'code', language: 'powershell', code: 'cursor-agent login\ncursor-agent status' },
        { type: 'paragraph', text: 'El flujo de acceso conecta la CLI con tu cuenta de Cursor, que consume la suscripción o el uso asociado a esa cuenta. En un entorno no interactivo, proporciona <code>CURSOR_API_KEY</code> mediante tu proceso habitual de gestión de secretos.' },
        { type: 'paragraph', text: 'Usa <code>cursor-agent logout</code> cuando necesites eliminar el inicio de sesión actual del equipo.' },
      ],
    },
    {
      id: 'evitar-conflicto-agent',
      title: 'Evita el conflicto del comando agent con Grok',
      content: [
        { type: 'paragraph', text: 'No uses <code>agent</code> como atajo para Cursor. Otra CLI instalada puede controlar ese comando, y Grok es un ejemplo conocido. Una respuesta correcta de <code>agent --version</code> no demuestra que Cursor esté instalado.' },
        { type: 'code', language: 'powershell', code: 'Get-Command cursor-agent\nGet-Command agent -ErrorAction SilentlyContinue\n\n# Inicia Cursor de forma explícita\ncursor-agent' },
        { type: 'callout', variant: 'warning', content: 'Si <code>agent</code> apunta a Grok, déjalo así. Usa <code>cursor-agent</code> para Cursor y permite que cada producto conserve su propio ejecutable.' },
      ],
    },
    {
      id: 'ejecutar-codeagentswarm',
      title: 'Inicia un Chat ACP de Cursor en CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'Selecciona Cursor Agent al crear un Chat. CodeAgentSwarm lanza <code>cursor-agent acp</code> mediante stdio, completa el saludo ACP y muestra el texto y las llamadas de herramientas en streaming dentro de la conversación.' },
        { type: 'paragraph', text: 'Puedes usar Agent, Plan o Ask cuando la sesión exponga esos modos, elegir los modelos disponibles, responder a solicitudes de permisos y cancelar una respuesta activa. Los servidores MCP del proyecto y del usuario se leen desde <code>.cursor/mcp.json</code>.' },
        { type: 'paragraph', text: 'Para ver todas las funciones, lee la <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía ACP de Cursor Agent CLI</a>. Para organizar varias sesiones de Windows, continúa con la <a href="/es/guias/enjambre-de-agentes-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de Cursor Agent</a>.' },
      ],
    },
    {
      id: 'solucion-problemas',
      title: 'Resuelve problemas comunes de Cursor CLI en Windows',
      content: [
        { type: 'list', items: ['<strong>Windows no reconoce cursor-agent:</strong> vuelve a abrir PowerShell después de instalar y ejecuta <code>Get-Command cursor-agent</code>. Si sigue sin aparecer, repite el instalador oficial.', '<strong>Se abre el agente equivocado:</strong> confirma que has escrito <code>cursor-agent</code>, no <code>agent</code>. Usa <code>Get-Command</code> para ver qué ejecutable resolvió Windows.', '<strong>Falla la autenticación:</strong> ejecuta <code>cursor-agent status</code> y después repite <code>cursor-agent login</code> o comprueba CURSOR_API_KEY.', '<strong>El Historial en Chat agota el tiempo de espera:</strong> ejecuta <code>cursor-agent update</code>. Las versiones ACP antiguas pueden no anunciar <code>loadSession</code>.', '<strong>Faltan herramientas MCP:</strong> comprueba el archivo <code>.cursor/mcp.json</code> del proyecto o del usuario y reinicia la sesión después de corregirlo.'] },
        { type: 'paragraph', text: 'La <a href="/es/guias/historial-conversaciones-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Cursor CLI</a> explica por qué la reanudación es condicional. Los detalles sobre planes y uso están en <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">precios y uso de Cursor CLI</a>.' },
      ],
    },
  ],
  faq: [
    { question: '¿Cursor Agent CLI funciona de forma nativa en Windows?', answer: 'Sí. Cursor ofrece un instalador oficial nativo para PowerShell en https://cursor.com/install?win32=true.' },
    { question: '¿Qué comando instala Cursor CLI en Windows?', answer: "Ejecuta irm 'https://cursor.com/install?win32=true' | iex en PowerShell, vuelve a abrir la consola y comprueba cursor-agent --version." },
    { question: '¿Debo ejecutar agent o cursor-agent?', answer: 'Ejecuta cursor-agent. El comando genérico agent puede pertenecer a otro producto como Grok, así que no es una forma fiable de iniciar Cursor.' },
    { question: '¿Cómo inicio sesión en Cursor CLI en Windows?', answer: 'Ejecuta cursor-agent login y confirma el estado con cursor-agent status. Los entornos no interactivos pueden usar CURSOR_API_KEY.' },
    { question: '¿Por qué puedo iniciar un Chat nuevo de Cursor pero no reanudar uno?', answer: 'Tu versión instalada de Cursor puede admitir sesiones ACP nuevas sin anunciar loadSession. Ejecuta cursor-agent update y vuelve a comprobarlo.' },
  ],
}

export default guide
