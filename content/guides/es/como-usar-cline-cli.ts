import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'como-usar-cline-cli',
    locale: 'es',
    title: 'Cómo instalar y usar Cline CLI',
    metaTitle: 'Cline CLI: cómo instalarlo, iniciar sesión y usarlo',
    metaDescription: 'Instala Cline CLI con npm, conecta un proveedor con cline auth, retoma sesiones y usa Cline en Chat o en la terminal junto a tus otros agentes.',
    intro: 'Cline es un agente de código open source que nació como extensión de VS Code y ahora también es el comando <code>cline</code>. En esta guía verás cómo se instala, cómo se inicia sesión, qué opciones vas a usar a diario, dónde guarda sus archivos y cómo lo ejecuta CodeAgentSwarm 2.5.0, en beta. Los datos de Cline se comprobaron en su documentación oficial y en el paquete de npm (versión 3.0.74) el 31 de octubre de 2026.',
    ctaText: 'Elige Cline en el selector de agentes, deja que CodeAgentSwarm lo instale y ten sus sesiones junto a Claude Code, Codex y el resto.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline CLI'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'how-to-use-cline-cli',
    relatedSlug: 'cline-vs-claude-code',
    socialImage: '/images/guides/cline-cli-og-es.png',
  },
  sections: [
    {
      id: 'what-it-is',
      title: 'Qué es Cline CLI',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'paragraph',
          text: `Cline CLI es un agente de terminal: lee tu proyecto, edita archivos y ejecuta comandos. Con <code>cline</code> a secas abres su interfaz interactiva; con <code>cline "tu tarea"</code> hace una tarea y termina. Es el mismo agente que la extensión de Cline para VS Code y JetBrains, y los dos comparten reglas y skills. El paquete de npm se publica con licencia Apache-2.0.`,
        },
        {
          type: 'paragraph',
          text: 'Cline no te ata a un solo proveedor de modelos. Puedes usar el proveedor de Cline, que cobra la inferencia por uso, o traer tu propia clave de Anthropic, OpenAI, Google Gemini, OpenRouter, AWS Bedrock, GCP Vertex, Groq, Cerebras o cualquier endpoint compatible con OpenAI. Es el motivo principal por el que mucha gente lo prefiere a una CLI de un solo proveedor.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Instalar Cline CLI',
      content: [
        { type: 'code', language: 'bash', code: 'npm install -g cline\ncline version' },
        {
          type: 'paragraph',
          text: `El paquete trae binarios nativos para macOS, Linux y Windows en x64 y ARM64, y npm elige el adecuado mediante una dependencia opcional. La ${link('https://docs.cline.bot/cline-cli/installation', 'documentación de instalación')} pide Node.js 20 o posterior y recomienda la 22. Hay una versión nightly en <code>cline@nightly</code>. Para actualizar más adelante, ejecuta <code>cline update</code>.`,
        },
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Cline seleccionado en el selector de agentes de CodeAgentSwarm con su etiqueta beta',
          caption: 'Captura real de la demo de la versión 2.5.0 de CodeAgentSwarm: Cline seleccionado en el selector de agentes, listo para arrancar en vista CLI o Chat.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'En CodeAgentSwarm no necesitas la terminal para esto. Elige Cline en el selector de agentes, o pulsa Install en Settings > Providers, y la app instala por ti el paquete oficial de npm. Antes comprueba que tienes Node.js 22.19 o posterior (en Windows y Linux puede preparar su propio Node; en macOS usa el Node.js que ya tengas) y al final verifica el resultado con <code>cline --version</code>. Settings > Providers te dice el siguiente paso de cada agente: Install, Sign in o Ready.',
        },
      ],
    },
    {
      id: 'sign-in',
      title: 'Conecta un proveedor de modelos con cline auth',
      content: [
        { type: 'code', language: 'bash', code: 'cline auth' },
        {
          type: 'paragraph',
          text: 'Si ejecutas <code>cline auth</code> sin opciones, te guía para elegir proveedor, clave o cuenta y modelo por defecto. Las credenciales se guardan en <code>~/.cline/data/settings/</code> y las reutilizan todas las sesiones siguientes, también el Chat de CodeAgentSwarm. Con proveedores OAuth, ejecuta antes <code>cline auth</code>: un arranque normal no abre el navegador.',
        },
        {
          type: 'paragraph',
          text: 'Si abres Cline en el Chat sin haber iniciado sesión, CodeAgentSwarm abre la terminal y te da el comando <code>cline auth</code> para que lo ejecutes. El uso lo factura tu proveedor; CodeAgentSwarm no revende acceso a modelos.',
        },
      ],
    },
    {
      id: 'everyday-flags',
      title: 'Las opciones que vas a usar a diario',
      content: [
        {
          type: 'table',
          headers: ['Opción o comando', 'Para qué sirve'],
          rows: [
            ['<code>cline</code>', 'Abre la interfaz interactiva en la terminal'],
            ['<code>cline "arregla el test que falla"</code>', 'Hace una tarea y termina'],
            ['<code>-p</code>, <code>--plan</code>', 'Arranca en modo plan en lugar de modo act'],
            ['<code>-m</code>, <code>--model</code>', 'Elige el modelo del proveedor seleccionado'],
            ['<code>--thinking</code>', 'Fija el esfuerzo de razonamiento: none, low, medium, high o xhigh'],
            ['<code>--auto-approve true|false</code>', 'Activa o desactiva la aprobación automática de herramientas'],
            ['<code>--id &lt;session-id&gt;</code>', 'Retoma una sesión guardada'],
            ['<code>cline history</code>', 'Lista las sesiones guardadas'],
            ['<code>--worktree</code>', 'Ejecuta la tarea en un git worktree separado'],
          ],
          caption: `Fuente: ${link('https://docs.cline.bot/cli/cli-reference', 'referencia de Cline CLI')}, consultada el 31 de octubre de 2026.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Según la referencia de la CLI, la aprobación automática viene activada por defecto, salvo en modo ACP, donde viene desactivada. Si quieres revisar cada herramienta en la terminal, arranca Cline con <code>--auto-approve false</code>.',
        },
      ],
    },
    {
      id: 'chat-and-terminal',
      title: 'Usa Cline en Chat o en la terminal',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm le da a Cline dos vistas. La de terminal ejecuta la interfaz normal de <code>cline</code>. El Chat habla con Cline a través de su servidor Agent Client Protocol (<code>cline --acp</code>) y te enseña los modelos de tu proveedor, los modos plan y act, adjuntos de imagen, un botón para parar y cada solicitud de permiso.',
        },
        {
          type: 'list',
          items: [
            '<strong>Ask before actions</strong>: Cline espera tu aprobación antes de editar un archivo o ejecutar un comando.',
            '<strong>Auto-accept edits</strong>: las ediciones en el proyecto pasan solas; los comandos y las acciones delicadas siguen preguntando.',
            '<strong>Full access</strong>: sin preguntas, igual que <code>--auto-approve true</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El Chat siempre arranca Cline con la aprobación automática desactivada y aplica el modo que elijas. La app recuerda tu última elección para Cline y la usa en las sesiones nuevas. En la terminal solo añade <code>--auto-approve true</code> si esa última elección fue Full access; si no, Cline sigue su propia configuración.',
        },
      ],
    },
    {
      id: 'files',
      title: 'Dónde guarda Cline sus archivos',
      content: [
        {
          type: 'table',
          headers: ['Qué', 'Dónde'],
          rows: [
            ['Carpeta de configuración', '<code>~/.cline</code> (o <code>CLINE_DIR</code>)'],
            ['Proveedores y claves', '<code>~/.cline/data/settings/providers.json</code>'],
            ['Servidores MCP', '<code>~/.cline/data/settings/cline_mcp_settings.json</code>'],
            ['Reglas y skills globales', '<code>~/.cline/rules/</code> y <code>~/.cline/skills/</code>'],
            ['Reglas del proyecto', '<code>.clinerules/</code>, <code>.cline/rules/</code> o <code>AGENTS.md</code> en la raíz del proyecto'],
            ['Índice de sesiones', '<code>~/.cline/data/db/sessions.db</code>'],
          ],
          caption: 'Rutas de la referencia de Cline CLI y de su documentación de reglas, consultadas el 31 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: 'Si lo permites en Settings > Privacy, CodeAgentSwarm añade sus herramientas de tareas y títulos como una entrada MCP, un archivo de reglas corto en <code>~/.cline/rules/codeagentswarm.md</code> y unos hooks pequeños que avisan cuando una tarea termina y qué archivos han cambiado. Tus servidores y tus hooks no cambian, y al desactivar cada opción solo se quita lo que añadió la app.',
        },
      ],
    },
    {
      id: 'beta-limits',
      title: 'Lo que la beta de la 2.5.0 todavía no hace',
      content: [
        {
          type: 'list',
          items: [
            'Cline informa del coste y los tokens de cada sesión, así que el panel de uso muestra el gasto por sesión. No hay cuota de cuenta que leer, de modo que Cline no tiene anillo de porcentaje ni presupuesto diario.',
            'Los títulos de conversación y los mensajes de commit necesitan una ejecución sin herramientas, y Cline no la ofrece. Usa otro proveedor para esas dos ayudas.',
            'Las bifurcaciones nativas de conversación de Cline no están disponibles dentro de CodeAgentSwarm.',
            'Si tu versión de Cline no puede cargar una sesión antigua por ACP, el Chat te lo dice en vez de abrir una vacía. Actualiza Cline o abre la sesión en la terminal.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Más sobre Cline en CodeAgentSwarm:',
        },
        {
          type: 'list',
          items: [
            `${link('/es/guias/cline-vs-claude-code', 'Cline vs Claude Code')}: precio, modelos, reglas y permisos frente a frente.`,
            `${link('/es/guias/enjambre-de-agentes-cline', 'Varias sesiones de Cline en paralelo')}, cada una en su carpeta o worktree.`,
            `${link('/es/guias/cline-cli-en-windows-y-linux', 'Cline CLI en Windows y Linux')}: instalación, Node.js y rutas.`,
            `${link('/es/guias/historial-conversaciones-cline', 'Historial de conversaciones de Cline')}: encuentra, busca y retoma sesiones antiguas.`,
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cline CLI es gratis?',
      answer: 'La CLI es open source y se instala gratis. Pagas el modelo que uses: con el proveedor de Cline, que cobra la inferencia por uso, o con tu propia clave de proveedor. CodeAgentSwarm no incluye uso de modelos.',
    },
    {
      question: '¿Cómo se instala Cline CLI?',
      answer: 'Ejecuta npm install -g cline con Node.js 20 o posterior (se recomienda la 22) y después cline auth para conectar un proveedor. En CodeAgentSwarm, al elegir Cline en el selector de agentes se instala solo.',
    },
    {
      question: '¿Cómo retomo una sesión de Cline?',
      answer: 'Ejecuta cline history para ver las sesiones y cline --id seguido del id para retomar una. CodeAgentSwarm muestra esas mismas sesiones en el historial de conversaciones y las reabre en Chat o en la terminal.',
    },
    {
      question: '¿Cline CLI lee AGENTS.md?',
      answer: 'Sí. Cline lee AGENTS.md en la raíz del proyecto junto con .clinerules y .cline/rules, además de las reglas globales de ~/.cline/rules.',
    },
    {
      question: '¿Cline es estable en CodeAgentSwarm?',
      answer: 'Cline llega a CodeAgentSwarm 2.5.0 con la etiqueta beta. Funcionan la instalación, el Chat, el historial, los permisos y el gasto por sesión; los títulos, los mensajes de commit y las bifurcaciones nativas todavía no.',
    },
  ],
}

export default guide
