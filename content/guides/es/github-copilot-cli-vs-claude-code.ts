import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-vs-claude-code',
    locale: 'es',
    title: 'GitHub Copilot CLI vs Claude Code: cuál usar',
    metaTitle: 'GitHub Copilot CLI vs Claude Code: precio, modelos y config',
    metaDescription: 'Compara GitHub Copilot CLI y Claude Code en precio, modelos, permisos, MCP, archivos de instrucciones y reanudación, y dónde encajan Gemini CLI y Codex CLI.',
    intro: 'GitHub Copilot CLI y Claude Code son agentes de terminal: leen tu proyecto, editan archivos y ejecutan comandos. Se diferencian en cómo pagas, qué modelos tienes y dónde guardan su configuración. Esta guía los compara punto por punto, con un repaso breve a Gemini CLI y Codex CLI. Los datos de Claude Code, Gemini CLI y Codex CLI se revisaron en su documentación oficial el 8 de octubre de 2026.',
    ctaText: 'Usa GitHub Copilot CLI y Claude Code a la vez en CodeAgentSwarm y dale a cada uno la tarea que mejor le encaja.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-vs-claude-code',
    relatedSlug: 'como-usar-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'de-un-vistazo',
      title: 'GitHub Copilot CLI vs Claude Code de un vistazo',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: `GitHub Copilot CLI es el comando <code>copilot</code> de GitHub. Claude Code es el comando <code>claude</code> de Anthropic. Si todavía no tienes Copilot instalado, empieza por ${link('/es/guias/como-usar-github-copilot-cli', 'cómo instalar y usar GitHub Copilot CLI')}.`,
        },
        {
          type: 'table',
          headers: ['Pregunta', 'GitHub Copilot CLI', 'Claude Code'],
          rows: [
            ['Comando', '<code>copilot</code>', '<code>claude</code>'],
            ['Cómo pagas', 'Créditos de IA mensuales de un plan de GitHub Copilot', 'Suscripción de Claude, Claude Console (facturación por API) o un proveedor en la nube'],
            ['Modelos', 'Claude, GPT, Gemini, Grok y otros, según plan y política', 'Modelos Claude'],
            ['Instrucciones personales', '<code>~/.copilot/copilot-instructions.md</code>', '<code>~/.claude/CLAUDE.md</code>'],
            ['Instrucciones del proyecto', '<code>AGENTS.md</code> y archivos relacionados', '<code>CLAUDE.md</code>, o <code>AGENTS.md</code> si no hay <code>CLAUDE.md</code>'],
            ['Reanudar', '<code>copilot --resume</code> o <code>--continue</code>', '<code>claude --resume</code> o <code>--continue</code>'],
            ['Servidor ACP', '<code>copilot --acp --stdio</code> (versión preliminar pública)', 'No aparece en la documentación oficial'],
          ],
          caption: 'Revisado el 8 de octubre de 2026 con GitHub Copilot CLI 1.0.93 y la documentación oficial de Claude Code.',
        },
        {
          type: 'paragraph',
          text: 'Ninguno gana en todos los casos. Copilot CLI encaja si tu equipo ya paga GitHub Copilot y quiere cambiar de proveedor de modelos sin cambiar de herramienta. Claude Code encaja si tu trabajo y tus reglas ya giran alrededor de Anthropic y de <code>CLAUDE.md</code>.',
        },
      ],
    },
    {
      id: 'precio',
      title: 'Precio: créditos de IA frente a suscripción de Claude',
      content: [
        {
          type: 'paragraph',
          text: `Copilot CLI gasta los créditos de IA de tu plan de GitHub Copilot. Pro cuesta 10 $ al mes con 1.500 créditos, Pro+ 39 $ con 7.000 y Max 100 $ con 20.000. Copilot Free no incluye créditos de IA: la CLI funciona con selección automática de modelo dentro de una cuota mensual limitada de Chat. Los créditos se reinician a las 00:00 UTC del día 1 de cada mes, los que no usas se pierden y, si fijas un presupuesto, el uso extra cuesta 0,01 $ por crédito. Fuente: ${link('https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals', 'facturación de GitHub para particulares')}, revisada el 8 de octubre de 2026. El detalle completo está en ${link('/es/guias/github-copilot-cli-modelos-creditos-ia', 'modelos y créditos de IA de GitHub Copilot CLI')}.`,
        },
        {
          type: 'paragraph',
          text: `Claude Code inicia sesión con una suscripción Claude Pro o Max, una plaza de Claude for Teams o Enterprise, una cuenta de Claude Console facturada por API o un proveedor en la nube como Amazon Bedrock, Google Cloud's Agent Platform o Microsoft Foundry. Fuente: ${link('https://code.claude.com/docs/en/authentication', 'documentación de autenticación de Claude Code')}, revisada el 8 de octubre de 2026. Los planes están en ${link('/es/guias/planes-y-precios-de-claude-code', 'planes y precios de Claude Code')}.`,
        },
        {
          type: 'image',
          src: '/images/guides/copilot-usage-panel.webp',
          alt: 'Cuota mensual de GitHub Copilot CLI en el panel de uso de CodeAgentSwarm',
          caption: 'Interfaz real de una versión de desarrollo de CodeAgentSwarm. El 7 % restante que se ve es un valor de prueba, no una cuenta real.',
          size: 'medium',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Son dos bolsas separadas. Quedarte sin créditos de Copilot no toca tu uso de Claude, ni al revés.',
        },
      ],
    },
    {
      id: 'modelos',
      title: 'Modelos: un proveedor o varios',
      content: [
        {
          type: 'paragraph',
          text: `Copilot CLI envía las peticiones a modelos de varios proveedores. El 8 de octubre de 2026, la ${link('https://docs.github.com/en/copilot/reference/ai-models/supported-models', 'página de modelos compatibles de GitHub')} mostraba en Copilot CLI modelos Claude de Anthropic, GPT de OpenAI, Gemini de Google, Grok de xAI, Kimi de Moonshot AI y MAI de Microsoft. Lo que ves depende de tu plan y de la política de tu organización. Elige uno con <code>--model</code> o <code>/model</code>, o usa <code>auto</code> y deja que Copilot decida.`,
        },
        {
          type: 'paragraph',
          text: `Claude Code usa modelos Claude. Eliges uno con <code>--model</code> y un alias como <code>sonnet</code>, <code>opus</code> o <code>haiku</code>, o el nombre completo del modelo, y ajustas el esfuerzo con <code>--effort</code>. Fuente: ${link('https://code.claude.com/docs/en/cli-reference', 'referencia de la CLI de Claude Code')}, revisada el 8 de octubre de 2026. En Copilot CLI, el esfuerzo de razonamiento es una opción de arranque, <code>--reasoning-effort</code>.`,
        },
      ],
    },
    {
      id: 'permisos',
      title: 'Permisos y modos de aprobación',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot CLI pregunta antes de actuar, y el acceso a archivos empieza limitado a la carpeta actual, sus subcarpetas y la carpeta temporal del sistema. Puedes permitir o bloquear herramientas por patrón con <code>--allow-tool</code> y <code>--deny-tool</code>, por ejemplo <code>shell(git:*)</code>. Un bloqueo siempre gana, incluso frente a <code>--allow-all</code>. <code>--yolo</code> equivale a permitir todas las herramientas, rutas y URL. Copilot también tiene los modos Plan y Autopilot.',
        },
        {
          type: 'paragraph',
          text: `Claude Code usa modos de permisos que vas cambiando con Shift+Tab o fijas con <code>--permission-mode</code>: Manual (<code>default</code>), <code>acceptEdits</code>, <code>plan</code>, <code>auto</code>, <code>dontAsk</code> y <code>bypassPermissions</code>. Las reglas de bloqueo se aplican en todos los modos, incluido <code>bypassPermissions</code>. Fuente: ${link('https://code.claude.com/docs/en/permission-modes', 'modos de permisos de Claude Code')}, revisada el 8 de octubre de 2026.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `Saltarte todas las confirmaciones es arriesgado en las dos herramientas. Lee ${link('/es/guias/modo-yolo-github-copilot-cli', 'el modo yolo de GitHub Copilot CLI')} y ${link('/es/guias/modo-yolo-claude-code-explicado', 'el modo yolo de Claude Code explicado')} antes de activarlo.`,
        },
      ],
    },
    {
      id: 'mcp-instrucciones',
      title: 'MCP, archivos de instrucciones y skills',
      content: [
        {
          type: 'table',
          headers: ['Qué', 'GitHub Copilot CLI', 'Claude Code'],
          rows: [
            ['Servidores MCP del usuario', '<code>~/.copilot/mcp-config.json</code>', '<code>~/.claude.json</code> (ámbito user o local)'],
            ['Servidores MCP del proyecto', '<code>.mcp.json</code> o <code>.github/mcp.json</code>', '<code>.mcp.json</code> en la raíz del proyecto'],
            ['Añadir un servidor', '<code>copilot mcp add</code>', '<code>claude mcp add</code>'],
            ['Instrucciones personales', '<code>~/.copilot/copilot-instructions.md</code>', '<code>~/.claude/CLAUDE.md</code>'],
            ['Instrucciones del proyecto', '<code>AGENTS.md</code> y archivos relacionados desde la raíz de git y la carpeta actual', '<code>./CLAUDE.md</code> o <code>./.claude/CLAUDE.md</code>'],
            ['Skills del proyecto', '<code>.github/skills/</code>, <code>.agents/skills/</code> o <code>.claude/skills/</code>', '<code>.claude/skills/</code>'],
          ],
          caption: 'Rutas de Claude Code según su documentación oficial de MCP y memoria, revisada el 8 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: `Algunos archivos sirven para los dos. Copilot lee skills de <code>.claude/skills/</code>, y ambos buscan un <code>.mcp.json</code> en el proyecto. Claude Code solo lee <code>AGENTS.md</code> cuando no hay ningún <code>CLAUDE.md</code> en la carpeta ni por encima, y solo desde la versión 2.1.277. Copilot no carga un <code>AGENTS.md</code> de tu carpeta personal. Fuentes: ${link('https://code.claude.com/docs/en/memory', 'documentación de memoria de Claude Code')} y ${link('https://code.claude.com/docs/en/mcp', 'documentación de MCP de Claude Code')}. La parte de Copilot está en ${link('/es/guias/github-copilot-cli-mcp-historial', 'MCP e historial de GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'historial-acp',
      title: 'Historial, reanudación y ACP',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot guarda cada sesión en <code>~/.copilot/session-state/&lt;id&gt;/</code>. Reanuda con <code>copilot --resume</code> y un id, nombre o prefijo, o abre la última con <code>--continue</code>.',
        },
        {
          type: 'paragraph',
          text: `Claude Code guarda las transcripciones en JSONL dentro de <code>~/.claude/projects/&lt;project&gt;/</code> y las conserva 30 días salvo que cambies <code>cleanupPeriodDays</code>. <code>claude --continue</code> reabre la última conversación de la carpeta y <code>claude --resume</code> abre un selector o acepta un id o un nombre. Fuente: ${link('https://code.claude.com/docs/en/sessions', 'documentación de sesiones de Claude Code')}, revisada el 8 de octubre de 2026.`,
        },
        {
          type: 'paragraph',
          text: `El Agent Client Protocol (ACP) permite que otra app controle un agente por un canal estándar. Copilot CLI tiene servidor ACP, <code>copilot --acp --stdio</code>, que GitHub marca como ${link('https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server', 'versión preliminar pública')}. Los comandos que necesitan un selector, como <code>/login</code>, <code>/resume</code> y <code>/diff</code>, no están disponibles por ACP. No encontramos un modo de servidor ACP en la documentación oficial de Claude Code el 8 de octubre de 2026; para scripts, Claude Code ofrece <code>claude -p</code> con salida JSON y el Agent SDK.`,
        },
      ],
    },
    {
      id: 'gemini-codex',
      title: 'Dónde encajan Gemini CLI y Codex CLI',
      content: [
        { type: 'heading', level: 3, text: 'Copilot CLI vs Gemini CLI', id: 'copilot-cli-vs-gemini-cli' },
        {
          type: 'paragraph',
          text: `Gemini CLI es el agente de terminal de Google y se instala con <code>npm install -g @google/gemini-cli</code>. Lee archivos <code>GEMINI.md</code>, y el ajuste <code>context.fileName</code> puede añadir <code>AGENTS.md</code>. Los servidores MCP van en <code>~/.gemini/settings.json</code>, <code>gemini --resume</code> reabre una sesión y <code>gemini --acp</code> arranca el modo ACP. La documentación oficial indica que, para usuarios del nivel gratuito y de Google One, Antigravity CLI sustituyó a Gemini CLI el 18 de junio de 2026. Fuentes: ${link('https://geminicli.com/docs/', 'documentación de Gemini CLI')} y ${link('https://github.com/google-gemini/gemini-cli', 'el repositorio de Gemini CLI')}, revisadas el 8 de octubre de 2026. Sobre ese cambio, mira ${link('/es/guias/antigravity-cli-vs-gemini-cli', 'Antigravity CLI vs Gemini CLI')}.`,
        },
        { type: 'heading', level: 3, text: 'Copilot CLI vs Codex CLI', id: 'copilot-cli-vs-codex-cli' },
        {
          type: 'paragraph',
          text: `Codex CLI es el agente de terminal de OpenAI. Inicia sesión con una cuenta de ChatGPT o con una clave de API de OpenAI facturada a precio de API, y la página de precios de OpenAI incluye la CLI en los planes a partir de Plus. Lee <code>AGENTS.md</code> de <code>~/.codex</code> y del proyecto, guarda los servidores MCP en <code>~/.codex/config.toml</code> (se añaden con <code>codex mcp add</code>) y reabre conversaciones con <code>codex resume</code>. No encontramos un modo de servidor ACP en su documentación oficial. Fuentes: ${link('https://learn.chatgpt.com/docs/codex/cli', 'documentación de Codex CLI')}, ${link('https://learn.chatgpt.com/docs/pricing', 'precios de Codex')} y ${link('https://learn.chatgpt.com/docs/extend/mcp', 'documentación de MCP de Codex')}, revisadas el 8 de octubre de 2026. Los planes están en ${link('/es/guias/planes-y-precios-de-codex', 'planes y precios de Codex')}.`,
        },
        {
          type: 'paragraph',
          text: 'La diferencia principal es la misma que con Claude Code: Copilot CLI te da modelos de varios proveedores con un solo plan de GitHub, mientras que Gemini CLI y Codex CLI se centran cada uno en su propio proveedor.',
        },
      ],
    },
    {
      id: 'a-la-vez',
      title: 'Usa Copilot CLI y Claude Code a la vez en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'No tienes que quedarte con uno. CodeAgentSwarm te deja elegir el agente en cada sesión, así que Copilot puede llevar una tarea mientras Claude Code trabaja en otra, cada uno en su propio proyecto o git worktree. Cada sesión muestra su propio estado y manda sus propias notificaciones.',
        },
        {
          type: 'image',
          src: '/images/guides/workspace-list.webp',
          alt: 'Vista List de CodeAgentSwarm con varias sesiones de agentes',
          caption: 'Interfaz real de CodeAgentSwarm con sesiones de ejemplo.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            'Instala Copilot desde el selector de agentes o desde Settings > Providers. La app descarga la versión oficial, comprueba su SHA-256 y la instala, o usa tu copia de npm, Homebrew o WinGet.',
            'Inicia sesión desde Chat con un código de dispositivo. Chat usa Copilot por ACP, con selector de modelo, modos Agent, Plan y Autopilot, y solicitudes de permiso.',
            'Conversation History muestra juntas las sesiones de Copilot y de Claude Code, filtradas por agente y proyecto, y las reabre en Chat o en la terminal.',
            'El panel de uso muestra la cuota mensual de Copilot junto a la de tus otros agentes.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: `El soporte de GitHub Copilot CLI llega en la versión de CodeAgentSwarm posterior a la 2.4.3. Con Copilot, Chat no tiene selector de razonamiento y la app no puede generar títulos de conversación ni mensajes de commit, así que usa otro proveedor para eso, como Claude Code (mira ${link('/es/guias/mensajes-de-commit-con-ia-claude-code', 'mensajes de commit con IA en Claude Code')}). Para repartir trabajo entre sesiones en paralelo, lee ${link('/es/guias/enjambre-de-agentes-github-copilot-cli', 'la guía del enjambre de agentes con GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'como-elegir',
      title: 'Cómo elegir',
      content: [
        {
          type: 'list',
          items: [
            'Elige Copilot CLI si tu equipo ya paga GitHub Copilot o quiere Claude, GPT y otros modelos con un solo plan.',
            'Elige Claude Code si tus proyectos ya usan <code>CLAUDE.md</code>, skills de Claude Code y facturación de Anthropic.',
            'Elige Codex CLI si ya tienes un plan de ChatGPT, y mira Antigravity CLI si usabas Gemini CLI en el nivel gratuito.',
            'Usa más de uno cuando cada tarea encaje mejor con una herramienta y puedas revisar lo que hacen en paralelo.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Prueba cada herramienta con una tarea real de tu repositorio. Compara el flujo de permisos, el trabajo de revisión y el diff final, no solo la primera respuesta.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿GitHub Copilot CLI es lo mismo que Claude Code?',
      answer: 'No. Copilot CLI es el agente de GitHub y gasta créditos de IA de GitHub Copilot con modelos de varios proveedores. Claude Code es el agente de Anthropic y usa modelos Claude con una suscripción de Claude, una cuenta de Console o un proveedor en la nube.',
    },
    {
      question: '¿GitHub Copilot CLI puede usar modelos Claude?',
      answer: 'Sí. La página de modelos compatibles de GitHub incluye modelos Claude en Copilot CLI. Cuáles ves depende de tu plan de Copilot y de la política de tu organización, y gastan créditos de IA de Copilot, no tu uso de Claude.',
    },
    {
      question: '¿Copilot CLI lee CLAUDE.md?',
      answer: 'Sí, desde el repositorio, junto a AGENTS.md y GEMINI.md. Las instrucciones personales van en ~/.copilot/copilot-instructions.md. Sí lee skills de .claude/skills/. Si quieres un único archivo compartido, AGENTS.md funciona en Copilot, en Codex y en Claude Code cuando no hay CLAUDE.md.',
    },
    {
      question: '¿Cuál tiene soporte ACP?',
      answer: 'Copilot CLI tiene servidor ACP, copilot --acp --stdio, en versión preliminar pública. Gemini CLI tiene gemini --acp. No encontramos un modo de servidor ACP en la documentación oficial de Claude Code ni de Codex el 8 de octubre de 2026.',
    },
    {
      question: '¿Puedo usar Copilot CLI y Claude Code a la vez?',
      answer: 'Sí. En CodeAgentSwarm eliges el agente en cada sesión y los usas en paralelo, cada uno en su propio proyecto o worktree. El soporte de Copilot llega en la versión posterior a la 2.4.3.',
    },
  ],
}

export default guide
