import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'cline-vs-claude-code',
    locale: 'es',
    title: 'Cline vs Claude Code: qué agente CLI usar',
    metaTitle: 'Cline vs Claude Code: precio, modelos y CLI comparados',
    metaDescription: 'Cline CLI frente a Claude Code: precio, modelos, archivos de reglas, permisos, MCP y cómo retomar sesiones, y cómo usar los dos a la vez en un mismo sitio.',
    intro: 'Cline y Claude Code son agentes de código que se usan desde la terminal. Claude Code es el agente de Anthropic para los modelos Claude. Cline es un agente open source que funciona con muchos proveedores de modelos, y su CLI es el comando <code>cline</code>. Aquí comparamos las dos CLI punto por punto. Los datos de Cline se comprobaron en su documentación oficial el 31 de octubre de 2026; los de Claude Code salen de la documentación de Anthropic, consultada el 8 de octubre de 2026.',
    ctaText: 'No tienes que elegir: ejecuta Cline y Claude Code a la vez en CodeAgentSwarm y dale a cada uno la tarea que mejor le va.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline', 'Claude Code'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'cline-vs-claude-code',
    relatedSlug: 'como-usar-cline-cli',
    socialImage: '/images/guides/cline-cli-og-es.png',
  },
  sections: [
    {
      id: 'at-a-glance',
      title: 'Cline vs Claude Code de un vistazo',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'table',
          headers: ['Pregunta', 'Cline CLI', 'Claude Code'],
          rows: [
            ['Comando', '<code>cline</code>', '<code>claude</code>'],
            ['Cómo pagas', 'Proveedor de Cline con cobro por uso, suscripción ClinePass o tu propia clave de proveedor', 'Suscripción de Claude, Claude Console (facturación por API) o un proveedor cloud'],
            ['Modelos', 'Anthropic, OpenAI, Gemini, OpenRouter, Bedrock, Vertex, Groq, Cerebras y endpoints compatibles con OpenAI', 'Modelos Claude'],
            ['Instrucciones del proyecto', '<code>.clinerules/</code>, <code>.cline/rules/</code> o <code>AGENTS.md</code>', '<code>CLAUDE.md</code>, o <code>AGENTS.md</code> si no hay <code>CLAUDE.md</code>'],
            ['Retomar', '<code>cline --id &lt;id&gt;</code> o <code>cline history</code>', '<code>claude --resume</code> o <code>--continue</code>'],
            ['Servidor ACP', '<code>cline --acp</code>', 'No aparece en la documentación oficial'],
          ],
          caption: 'Cline: referencia de la CLI y documentación de reglas e instalación, consultadas el 31 de octubre de 2026. Claude Code: documentación oficial, consultada el 8 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: 'En resumen: elige Cline si quieres decidir tú el proveedor de modelos o ya usas la extensión de Cline en tu editor. Elige Claude Code si ya pagas Claude y las reglas de tu proyecto viven en <code>CLAUDE.md</code>.',
        },
      ],
    },
    {
      id: 'pricing',
      title: 'Precio: pago por uso o un plan de Claude',
      content: [
        {
          type: 'paragraph',
          text: `Cline en sí es gratis. Lo que pagas es la inferencia: con el proveedor de Cline, que cobra por uso, con ClinePass, una suscripción mensual de cuota fija, o con tu propia clave a los precios de cada proveedor. Fuente: ${link('https://docs.cline.bot/cline-cli/installation', 'documentación de instalación de Cline')} y ${link('https://cline.bot/pricing', 'precios de Cline')}, consultadas el 31 de octubre de 2026.`,
        },
        {
          type: 'paragraph',
          text: `Claude Code inicia sesión con una suscripción Claude Pro o Max, un puesto de Claude for Teams o Enterprise, una cuenta de Claude Console facturada por API o un proveedor cloud como Amazon Bedrock. Fuente: ${link('https://code.claude.com/docs/en/authentication', 'documentación de autenticación de Claude Code')}, consultada el 8 de octubre de 2026. Los planes los tienes en ${link('/es/guias/planes-y-precios-de-claude-code', 'planes y precios de Claude Code')}.`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'No se excluyen. Cline puede usar tu clave de API de Anthropic y ejecutar modelos Claude, pero eso se factura en la API, no en tu plan Claude Pro o Max.',
        },
      ],
    },
    {
      id: 'models',
      title: 'Modelos: un proveedor o muchos',
      content: [
        {
          type: 'paragraph',
          text: 'Cline usa el proveedor que conectes con <code>cline auth</code>, y puedes cambiarlo en cada ejecución con <code>-P</code> (proveedor) y <code>-m</code> (modelo). El esfuerzo de razonamiento se fija con <code>--thinking</code>, de none a xhigh. Así es fácil probar un modelo abierto en una tarea y un modelo puntero en la siguiente.',
        },
        {
          type: 'paragraph',
          text: `Claude Code ejecuta modelos Claude. Eliges uno con <code>--model</code> y un alias como <code>sonnet</code>, <code>opus</code> o <code>haiku</code>, y el esfuerzo con <code>--effort</code>. Fuente: ${link('https://code.claude.com/docs/en/cli-reference', 'referencia de la CLI de Claude Code')}, consultada el 8 de octubre de 2026.`,
        },
      ],
    },
    {
      id: 'permissions',
      title: 'Permisos y modo plan',
      content: [
        {
          type: 'paragraph',
          text: 'Cline tiene dos modos, plan y act, y un único interruptor para aprobar herramientas, <code>--auto-approve</code>. Según la referencia de la CLI viene activado por defecto, y desactivado en modo ACP. Usa <code>--auto-approve false</code> si quieres revisar cada herramienta en la terminal.',
        },
        {
          type: 'paragraph',
          text: `Claude Code tiene más modos: Manual (<code>default</code>), <code>acceptEdits</code>, <code>plan</code>, <code>auto</code>, <code>dontAsk</code> y <code>bypassPermissions</code>, que alternas con Shift+Tab o fijas con <code>--permission-mode</code>. Fuente: ${link('https://code.claude.com/docs/en/permission-modes', 'modos de permisos de Claude Code')}, consultada el 8 de octubre de 2026.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `Saltarse todas las confirmaciones es arriesgado en las dos herramientas. Antes de activarlo, lee ${link('/es/guias/modo-yolo-claude-code-explicado', 'el modo YOLO de Claude Code explicado')}.`,
        },
      ],
    },
    {
      id: 'mcp-rules',
      title: 'MCP, reglas y extras',
      content: [
        {
          type: 'table',
          headers: ['Qué', 'Cline CLI', 'Claude Code'],
          rows: [
            ['Servidores MCP del usuario', '<code>~/.cline/data/settings/cline_mcp_settings.json</code>, gestionados con <code>cline mcp</code>', '<code>~/.claude.json</code>'],
            ['Instrucciones globales', '<code>~/.cline/rules/</code>', '<code>~/.claude/CLAUDE.md</code>'],
            ['Skills', '<code>~/.cline/skills/</code> y <code>.cline/skills/</code>', '<code>~/.claude/skills/</code> y <code>.claude/skills/</code>'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Cline trae además algunos extras alrededor del agente: <code>cline kanban</code> abre una app de tablero, <code>cline schedule</code> lanza agentes con un cron y <code>cline connect</code> enlaza una sesión con Telegram, Slack, Discord y otras apps de mensajería.',
        },
      ],
    },
    {
      id: 'both',
      title: 'Usa los dos en el mismo espacio',
      content: [
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Cline seleccionado en el selector de agentes de CodeAgentSwarm junto a otros agentes',
          caption: 'Captura real de la demo de la versión 2.5.0 de CodeAgentSwarm. Cada sesión elige su propio agente.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: `CodeAgentSwarm 2.5.0 añade Cline, en beta, a los agentes que ejecuta en paralelo. Eliges el agente en cada sesión, así que Cline puede probar una refactorización con un modelo más barato mientras Claude Code revisa otra rama, cada uno en su carpeta o git worktree. Los dos aparecen en un mismo ${link('/es/guias/historial-conversaciones-cline', 'historial de conversaciones')} y en un mismo panel de uso: Claude con su anillo de cuota y Cline con el gasto por sesión.`,
        },
        {
          type: 'paragraph',
          text: `¿Empiezas con Cline? Mira ${link('/es/guias/como-usar-cline-cli', 'cómo instalar y usar Cline CLI')}. Para comparar más agentes, tienes ${link('/es/guias/github-copilot-cli-vs-claude-code', 'GitHub Copilot CLI vs Claude Code')} y ${link('/es/guias/cursor-cli-vs-claude-code', 'Cursor CLI vs Claude Code')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cline es mejor que Claude Code?',
      answer: 'Ninguno gana en todo. Cline es open source y te deja elegir cualquier proveedor de modelos. Claude Code está pensado para los modelos Claude y una suscripción de Claude. Mucha gente usa los dos para tareas distintas.',
    },
    {
      question: '¿Qué diferencia hay entre Cline CLI y Claude Code?',
      answer: 'Los dos son agentes de código para la terminal. Cline CLI funciona con muchos proveedores, lee .clinerules y AGENTS.md y retoma sesiones con cline --id. Claude Code ejecuta modelos Claude, lee CLAUDE.md y retoma con claude --resume.',
    },
    {
      question: '¿Cline puede usar modelos Claude?',
      answer: 'Sí, con el proveedor de Cline o con tus credenciales de Anthropic, Bedrock o Vertex. Ese uso lo factura la API o el proveedor, no una suscripción Claude Pro o Max.',
    },
    {
      question: '¿Cline es gratis?',
      answer: 'El agente es gratis y open source. El modelo lo pagas con el proveedor de Cline, con una suscripción ClinePass o con tu propia clave de proveedor.',
    },
    {
      question: '¿Puedo usar Cline y Claude Code a la vez?',
      answer: 'Sí. En CodeAgentSwarm 2.5.0 eliges el agente en cada sesión y los ejecutas en paralelo, cada uno en su carpeta o worktree. El soporte de Cline está en beta.',
    },
  ],
}

export default guide
