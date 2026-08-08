import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'como-usar-grok-build',
    locale: 'es',
    title: 'Cómo usar Grok Build: instalación, login y comandos',
    metaTitle: 'Cómo usar Grok Build de xAI: instalación y comandos (2026)',
    metaDescription: 'Grok Build es el agente de código en terminal de xAI (comando grok). Instálalo, inicia sesión con SuperGrok o X Premium+, aprende los comandos clave y supervísalo en CodeAgentSwarm.',
    intro: `Grok Build es el agente de código en terminal de xAI: un TUI que lee tu repo, edita archivos, ejecuta comandos, busca en la web y gestiona trabajo de varios pasos desde la shell. Instalas el binario <code>grok</code>, te autenticas y trabajas dentro de un proyecto igual que con Claude Code o Codex CLI.

Tres productos distintos se llaman Grok: el chatbot de consumo Grok, la CLI oficial de código de xAI llamada Grok Build (el comando <code>grok</code> de esta guía) y herramientas comunitarias no oficiales llamadas grok-cli en GitHub. CodeAgentSwarm integra Grok Build, no el chat.

Esta guía cubre instalación, primer login, los flags que usarás de verdad, reanudar sesiones y cómo CodeAgentSwarm ejecuta Grok Build como agente de primera clase junto al resto del enjambre.`,
    ctaText: 'Elige Grok Build en cualquier terminal de CodeAgentSwarm y ejecútalo junto a Claude Code, Codex, OpenCode o Kimi Code. Notificaciones, historial buscable y diffs en vivo incluidos.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'how-to-use-grok-build',
  },
  sections: [
    {
      id: 'que-es',
      title: '¿Qué es Grok Build?',
      content: [
        { type: 'paragraph', text: 'Grok Build es la CLI de código oficial de <a href="https://x.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">xAI</a>. Funciona como TUI interactivo, como comando headless con <code>grok -p</code> o como proceso agente para editores. <code>grok --version</code> imprime algo como <code>grok 0.2.x</code>.' },
        { type: 'paragraph', text: 'Los datos viven en <code>~/.grok/</code> por defecto (config, auth, sesiones, skills, rules). Puedes mover el árbol con <code>GROK_HOME</code>. Las skills siguen agentskills.io en <code>~/.grok/skills/</code> y los MCP se configuran en <code>~/.grok/config.toml</code>.' },
        { type: 'callout', variant: 'info', content: 'Grok Build evoluciona rápido. Si algo no cuadra con esta página, manda la documentación oficial de xAI y <code>grok --help</code> en tu máquina.' },
      ],
    },
    {
      id: 'instalar',
      title: 'Instalar Grok Build',
      content: [
        { type: 'paragraph', text: 'La vía recomendada es el script oficial. Funciona en macOS y Linux, y en Windows con Git Bash o el instalador nativo de PowerShell.' },
        { type: 'code', language: 'bash', code: '# macOS / Linux / Git Bash\ncurl -fsSL https://x.ai/cli/install.sh | bash\n\n# Verificar\ngrok --version' },
        { type: 'code', language: 'powershell', code: '# Windows PowerShell\nirm https://x.ai/cli/install.ps1 | iex' },
        { type: 'paragraph', text: 'El instalador deja el binario en <code>~/.grok/bin</code> (o <code>%USERPROFILE%\\.grok\\bin</code> en Windows) y lo añade al PATH. Actualiza después con <code>grok update</code>.' },
        { type: 'callout', variant: 'tip', content: 'Tras instalar, ejecuta <code>grok doctor</code> para revisar terminal, portapapeles y color antes de una sesión larga.' },
      ],
    },
    {
      id: 'login',
      title: 'Primer arranque y autenticación',
      content: [
        { type: 'paragraph', text: 'Desde un directorio de proyecto, ejecuta <code>grok</code>. En el primer arranque la CLI abre el navegador para autenticarte. Las credenciales van a <code>~/.grok/auth.json</code> y se renuevan solas.' },
        { type: 'paragraph', text: 'En CI o entornos sin navegador, usa una API key:' },
        { type: 'code', language: 'bash', code: 'export XAI_API_KEY="xai-..."\ngrok -p "Resume este repositorio"' },
        { type: 'callout', variant: 'warning', content: 'El uso interactivo depende del plan de tu cuenta xAI (en la era beta se habla de SuperGrok o X Premium+). Confirma el acceso actual en xAI antes de un despliegue de equipo. Ver la <a href="/es/guias/precios-y-acceso-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de precios y acceso</a>.' },
      ],
    },
    {
      id: 'comandos',
      title: 'Comandos y flags que importan',
      content: [
        { type: 'paragraph', text: 'No necesitas todos los flags. Estos son los del día a día:' },
        { type: 'list', items: ['<code>grok</code> - TUI interactivo en el directorio actual', '<code>grok "arregla el test flaky"</code> - TUI con prompt inicial', '<code>grok -p "..."</code> - prompt headless a stdout', '<code>grok --continue</code> / <code>-c</code> - continuar la sesión más reciente de este cwd', '<code>grok --resume</code> / <code>-r</code> - reanudar por id o título', '<code>grok --always-approve</code> - auto-aprobar tools (estilo YOLO; con cuidado)', '<code>grok --worktree=nombre</code> - sesión en un git worktree nuevo', '<code>grok --no-plan</code> / <code>--no-subagents</code> - desactivar plan mode o subagentes nativos', '<code>grok sessions list</code> / <code>search</code> - buscar sesiones', '<code>grok export</code> - exportar transcript a Markdown'] },
        { type: 'paragraph', text: 'Los modos de permiso incluyen <code>default</code>, <code>acceptEdits</code>, <code>auto</code>, <code>dontAsk</code>, <code>bypassPermissions</code> y <code>plan</code>. Plan Mode se detalla en la <a href="/es/guias/modo-plan-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Plan Mode</a>.' },
      ],
    },
    {
      id: 'cas',
      title: 'Grok Build dentro de CodeAgentSwarm',
      content: [
        { type: 'image', alt: 'Selector SELECT AI AGENT de CodeAgentSwarm incluyendo Grok Build', src: '/images/guides/multi-cli-agent-selector.png', caption: 'Elige Grok Build por terminal como cualquier otro agente.' },
        { type: 'paragraph', text: 'CodeAgentSwarm es un workspace de escritorio encima de las CLIs oficiales. Instala Grok Build, abre CodeAgentSwarm y elige <strong>Grok Build</strong> en el selector de agente de ese terminal. Obtienes notificaciones de escritorio, historial buscable, diffs en vivo y la posibilidad de mezclar Grok Build con Claude Code, Codex, Antigravity, OpenCode y Kimi Code en una ventana.' },
        { type: 'paragraph', text: 'Eso es distinto de los subagentes nativos de Grok Build, que viven dentro de una sola sesión del vendor. Un enjambre de CodeAgentSwarm son varios terminales independientes que supervisas tú. Ver la <a href="/es/guias/enjambre-de-agentes-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de enjambre</a> y la <a href="/es/guias/subagentes-grok-build-vs-enjambre" class="text-neon-cyan hover:text-neon-purple transition-colors">comparación subagentes vs enjambre</a>.' },
      ],
    },
  ],
  faq: [
    { question: '¿Grok Build es lo mismo que el chatbot Grok?', answer: 'No. Grok Build es la CLI de código de xAI (comando grok). El chatbot Grok es otro producto. CodeAgentSwarm integra la CLI.' },
    { question: '¿Cómo instalo Grok Build?', answer: 'En macOS y Linux: curl -fsSL https://x.ai/cli/install.sh | bash. En Windows PowerShell: irm https://x.ai/cli/install.ps1 | iex. Luego grok --version.' },
    { question: '¿Funciona con CodeAgentSwarm?', answer: 'Sí. Instala la CLI, elige Grok Build en el selector y úsalo como cualquier otro agente soportado con notificaciones, historial y diffs.' },
    { question: '¿Cómo reanudo una sesión?', answer: 'grok --continue para la última del directorio, o grok --resume con id o título. grok sessions list ayuda a encontrarlas.' },
  ],
}

export default guide
