import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'modo-yolo-github-copilot-cli',
    locale: 'es',
    title: 'Modo YOLO, permisos y autopilot en GitHub Copilot CLI',
    metaTitle: 'Modo YOLO de Copilot CLI: --yolo, permisos y autopilot',
    metaDescription: 'Qué permiten de verdad copilot --yolo y --allow-all, cómo aprobar solo git o las ediciones con reglas --allow-tool y cuándo se detiene el modo autopilot.',
    intro: 'De serie, GitHub Copilot CLI te pregunta antes de editar un archivo o ejecutar un comando, y solo trabaja en la carpeta donde lo abriste. <code>--yolo</code> quita todo eso de golpe. En esta guía verás qué permite cada opción de permisos, cómo aprobar solo las herramientas que necesita una tarea y cómo funciona el modo autopilot. Lo hemos comprobado con Copilot CLI 1.0.93 y la documentación de GitHub el 8 de octubre de 2026.',
    ctaText: 'Elige Ask before actions, Auto-approve edits o Always approve en cada sesión de GitHub Copilot CLI dentro de CodeAgentSwarm y ve de un vistazo qué agente te está esperando.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-yolo-mode',
    relatedSlug: 'como-usar-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'que-hace-yolo',
      title: 'Qué hace --yolo en GitHub Copilot CLI',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: 'Sin tocar nada, Copilot pide aprobación antes de usar una herramienta, y el acceso a archivos se limita a la carpeta actual, sus subcarpetas y la carpeta temporal del sistema. <code>--yolo</code> y <code>--allow-all</code> son la misma opción. Las dos equivalen a tres opciones sueltas:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --yolo\n\n# equivale a\ncopilot --allow-all-tools --allow-all-paths --allow-all-urls',
        },
        {
          type: 'table',
          headers: ['Opción o variable', 'Qué permite'],
          rows: [
            ['<code>--allow-all-tools</code>', 'Todas las herramientas se ejecutan sin preguntar: comandos de shell, escritura de archivos y herramientas MCP.'],
            ['<code>--allow-all-paths</code>', 'Desactiva la comprobación de rutas, así que Copilot puede leer y escribir en cualquier parte del disco.'],
            ['<code>--allow-all-urls</code>', 'Cualquier URL, sin confirmación.'],
            ['<code>--allow-all</code> o <code>--yolo</code>', 'Las tres anteriores.'],
            ['<code>COPILOT_ALLOW_ALL=true</code>', 'Aprueba las herramientas sin preguntar y además confía en la carpeta de trabajo, así que Copilot carga sus skills, plugins, servidores MCP y hooks.'],
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `GitHub recomienda usar estas opciones solo en un entorno aislado y desaconseja crear un alias que las añada cada vez que abres Copilot (${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools', 'Allowing and denying tool use')}, revisado el 8 de octubre de 2026).`,
        },
        {
          type: 'paragraph',
          text: `Dentro de una sesión abierta, <code>/allow-all</code> activa el mismo modo sin reiniciar. Si todavía no has instalado Copilot, empieza por ${link('/es/guias/como-usar-github-copilot-cli', 'cómo instalar y usar GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'reglas-granulares',
      title: 'Más seguro: aprueba solo lo que necesita la tarea',
      content: [
        {
          type: 'paragraph',
          text: '<code>--allow-tool</code> evita la pregunta para las herramientas que coinciden con un patrón. <code>--deny-tool</code> las bloquea. Los patrones tienen la forma <code>tipo(argumento)</code>, y el argumento es opcional.',
        },
        {
          type: 'table',
          headers: ['Patrón', 'Qué cubre'],
          rows: [
            ['<code>shell(git:*)</code>', 'Cualquier comando de git. El sufijo <code>:*</code> busca por prefijo.'],
            ['<code>shell(git push)</code>', 'Solo <code>git push</code>.'],
            ['<code>write</code>', 'Todas las herramientas que crean o modifican archivos, salvo los comandos de shell.'],
            ['<code>write(ruta)</code>', 'Escrituras en esa ruta.'],
            ['<code>&lt;servidor-mcp&gt;(herramienta)</code>', 'Una herramienta de un servidor MCP, o todas si no pones el nombre de la herramienta.'],
            ['<code>url(dominio)</code>', 'Peticiones a ese dominio.'],
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: "# git sin preguntas, salvo push\ncopilot --allow-tool='shell(git:*)' --deny-tool='shell(git push)'\n\n# todo sin preguntas, pero sin push\ncopilot --allow-all-tools --deny-tool='shell(git push)'",
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'La denegación siempre gana. Una regla <code>--deny-tool</code> se sigue aplicando con <code>--allow-all</code> o <code>--yolo</code>, y también por encima de las aprobaciones que guardaste antes.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'ocultar-herramientas',
          text: 'Ocultar herramientas al modelo',
        },
        {
          type: 'paragraph',
          text: '<code>--available-tools</code> y <code>--excluded-tools</code> actúan un paso antes: deciden qué herramientas puede ver el modelo. <code>--available-tools</code> deja solo las que indicas. <code>--excluded-tools</code> quita solo las que indicas. Una regla de permiso nunca recupera una herramienta que hayas filtrado así.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'aprobaciones-guardadas',
          text: 'Aprobaciones que guardaste antes',
        },
        {
          type: 'paragraph',
          text: `Cuando apruebas una herramienta para la ubicación actual, Copilot lo guarda en <code>~/.copilot/permissions-config.json</code>. <code>/reset-allowed-tools</code> retira lo que concediste en la sesión actual. Para borrar las aprobaciones de otra ubicación, edita o elimina su entrada en ese archivo. Fuente: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools', 'documentación de GitHub')}, revisada el 8 de octubre de 2026.`,
        },
      ],
    },
    {
      id: 'rutas-y-confianza',
      title: 'Rutas, carpetas extra y confianza en la carpeta',
      content: [
        {
          type: 'paragraph',
          text: 'Si una tarea necesita otra carpeta, como una librería compartida junto a tu repositorio, da acceso a esa carpeta en lugar de a todo el disco. <code>--disallow-temp-dir</code> quita además el acceso por defecto a la carpeta temporal del sistema.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --add-dir ../shared-lib\ncopilot --disallow-temp-dir',
        },
        {
          type: 'paragraph',
          text: 'La primera vez que abres Copilot en modo interactivo en una carpeta, te pide confirmar que confías en ella: Yes, Yes recordando la carpeta para futuras sesiones, o No. <code>COPILOT_ALLOW_ALL=true</code> se salta esa pregunta y confía en la carpeta por ti.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Confiar en una carpeta carga sus skills, plugins, servidores MCP y hooks. Revisa un repositorio clonado de otra persona antes de confiar en él, y no definas <code>COPILOT_ALLOW_ALL=true</code> de forma global.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'GitHub Copilot CLI pidiendo confirmar la confianza en la carpeta con tres opciones',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm: Copilot pide confianza la primera vez que la terminal lo abre en una carpeta de prueba.',
          size: 'full',
        },
      ],
    },
    {
      id: 'autopilot',
      title: 'Modo autopilot y --max-autopilot-continues',
      content: [
        {
          type: 'paragraph',
          text: `Autopilot deja que Copilot siga con una tarea sin esperarte después de cada paso. Pulsa Shift+Tab hasta llegar a él, o arranca con <code>--autopilot</code> o <code>--mode autopilot</code>. Al entrar, Copilot te ofrece activar todos los permisos. Si eliges la aprobación manual, rechaza automáticamente cualquier herramienta que necesite aprobación, y la tarea puede quedarse a medias (${link('https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot', 'documentación de autopilot de GitHub')}, revisada el 8 de octubre de 2026).`,
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --autopilot --max-autopilot-continues 3',
        },
        {
          type: 'list',
          items: [
            'Se detiene cuando Copilot considera que la tarea está terminada.',
            'Se detiene si surge un problema o pulsas Ctrl+C.',
            'Por defecto se pausa tras 5 mensajes de continuación automáticos. <code>--max-autopilot-continues</code> cambia ese número.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: `Cada continuación es otra llamada al modelo, así que autopilot gasta créditos de IA sin que envíes ningún mensaje. Un límite bajo lo mantiene a raya. Los planes y créditos están en ${link('/es/guias/github-copilot-cli-modelos-creditos-ia', 'modelos y créditos de IA de GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Modos de permiso en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'El soporte de Copilot llega en la versión de CodeAgentSwarm posterior a la 2.4.3. En Chat, la app habla con Copilot a través de su servidor ACP y te muestra cada solicitud de permiso para que la apruebes o la rechaces. En cada sesión eliges uno de estos tres modos:',
        },
        {
          type: 'table',
          headers: ['Modo', 'Qué pasa'],
          rows: [
            ['Ask before actions', 'Cada edición y cada comando esperan tu aprobación.'],
            ['Auto-approve edits', 'Las ediciones pasan; los comandos siguen preguntando.'],
            ['Always approve', 'Lo mismo que <code>copilot --yolo</code>.'],
          ],
        },
        {
          type: 'image',
          src: '/images/guides/copilot-chat-real.webp',
          alt: 'GitHub Copilot CLI en Chat de CodeAgentSwarm con el modo Always approve seleccionado',
          caption: 'Captura real de una versión de desarrollo de CodeAgentSwarm: GitHub Copilot CLI 1.0.93 en Chat con Always approve seleccionado, respondiendo a un mensaje de prueba.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: `La vista de terminal ejecuta la interfaz normal de <code>copilot</code>, así que las opciones y la pregunta de confianza de esta guía funcionan igual ahí. Puedes tener varias sesiones de Copilot a la vez, cada una en su proyecto o en su propio ${link('/es/guias/git-worktrees-para-agentes-de-ia', 'git worktree')}, y ver cuál espera una aprobación. ${link('/es/guias/enjambre-de-agentes-github-copilot-cli', 'Enjambre de agentes con GitHub Copilot CLI')} explica cómo montarlo.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Always approve le da a Copilot la misma libertad que <code>--yolo</code>. CodeAgentSwarm no añade un sandbox encima, así que no dejes credenciales de producción al alcance de esa sesión.',
        },
      ],
    },
    {
      id: 'antes-de-activar',
      title: 'Antes de activar YOLO',
      content: [
        {
          type: 'list',
          items: [
            'Haz commit o stash de tu trabajo y revisa <code>git status</code>.',
            'Prueba antes una regla concreta, como <code>--allow-tool=\'shell(git:*)\'</code> o <code>--allow-tool=write</code>.',
            'Añade <code>--deny-tool</code> para los comandos que nunca quieres que se ejecuten sin ti, como <code>git push</code>.',
            'Usa <code>--add-dir</code> para una carpeta extra en lugar de <code>--allow-all-paths</code>.',
            'En autopilot, pon un <code>--max-autopilot-continues</code> bajo y revisa el diff antes de fusionar.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es el modo YOLO de GitHub Copilot CLI?',
      answer: 'Es la opción --yolo, también llamada --allow-all. Copilot ejecuta cualquier herramienta sin preguntar y puede acceder a cualquier ruta y a cualquier URL. Equivale a --allow-all-tools --allow-all-paths --allow-all-urls. Dentro de una sesión, /allow-all hace lo mismo.',
    },
    {
      question: '¿--allow-all-tools es lo mismo que --yolo?',
      answer: 'No. --allow-all-tools solo quita las preguntas de las herramientas. El acceso a archivos sigue limitado a la carpeta actual y las URL siguen preguntando. --yolo añade --allow-all-paths y --allow-all-urls.',
    },
    {
      question: '¿Cómo permito todo menos git push?',
      answer: "Ejecuta copilot --allow-all-tools --deny-tool='shell(git push)'. Las reglas de denegación siempre ganan, incluso con --yolo, así que Copilot seguirá sin poder hacer push.",
    },
    {
      question: '¿Qué es el modo autopilot de Copilot CLI?',
      answer: 'Un modo en el que Copilot sigue con la tarea sin esperarte después de cada paso. Se activa con Shift+Tab, --autopilot o --mode autopilot. Por defecto se pausa tras 5 continuaciones automáticas; --max-autopilot-continues cambia ese límite.',
    },
    {
      question: '¿Dónde guarda Copilot las aprobaciones que marqué para no volver a preguntar?',
      answer: 'En ~/.copilot/permissions-config.json, por ubicación. /reset-allowed-tools retira lo que concediste en la sesión actual. Para otras ubicaciones, edita o elimina su entrada en ese archivo.',
    },
  ],
}

export default guide
