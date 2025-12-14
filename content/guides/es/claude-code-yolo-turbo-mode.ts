import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-yolo-turbo-mode',
    locale: 'es',
    title: 'Turbo Mode en Claude Code: cómo saltar confirmaciones sin perder control',
    metaTitle: 'Turbo Mode en Claude Code: cómo saltar confirmaciones sin perder control (permisos y Git)',
    metaDescription: 'Guía práctica para usar el modo YOLO de Claude Code (`--dangerously-skip-permissions`) con seguridad: Turbo Mode en CodeAgentSwarm, permisos granulares por herramienta y MCP, y bloqueos para evitar git push o merge por accidente.',
    intro: `Si trabajas con Claude Code a diario, sabes que las confirmaciones hacen que vayas algo más lento, muchas veces apruebas los cambios sin ni siquiera saber bien lo que está haciendo.

Por eso mucha gente acaba tirando del modo YOLO de Claude Code, normalmente asociado al flag \`--dangerously-skip-permissions\`. La idea es simple: saltar confirmaciones en Claude Code para que el flujo sea continuo.

El riesgo también es simple: si lo activas sin control, un comando mal planteado, un borrado o una acción de Git pueden liarte una buena en segundos.

En CodeAgentSwarm lo planteamos como Turbo Mode (skip confirmations) más un sistema de permisos. Tú decides qué se auto aprueba y qué queda bloqueado, para poder ir muy rápido y seguro.`,
    ctaText: 'Activa Turbo Mode con permisos configurados y trabaja con Claude Code a máxima velocidad sin sacrificar seguridad.',
    alternateSlug: 'claude-code-yolo-turbo-mode',
  },
  sections: [
    {
      id: 'que-es-modo-yolo',
      title: 'Qué es el modo YOLO de Claude Code y qué hace `--dangerously-skip-permissions`',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando se habla de "YOLO mode" en Claude Code, normalmente se está hablando de reducir prompts de confirmación. En Claude Code se utiliza con el flag `--dangerously-skip-permissions`.',
        },
        {
          type: 'paragraph',
          text: 'En la práctica significa: Claude no se para a preguntarte cada vez que quiere usar una herramienta o ejecutar un comando. Y eso acelera tareas, porque dejas de estar confirmando cada acción una por una.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Matiz importante',
          id: 'matiz-importante',
        },
        {
          type: 'paragraph',
          text: 'Aunque actives el modo "accept edits on", Claude te va a seguir pidiendo confirmación en bastantes puntos. Por eso, incluso en YOLO mode, el flujo puede seguir siendo más lento de lo que te gustaría si estás en tareas largas o repetitivas.',
        },
      ],
    },
    {
      id: 'riesgos-reales',
      title: 'Riesgos reales al trabajar con dangerously-skip-permissions',
      content: [
        {
          type: 'paragraph',
          text: 'Esto es lo que cambia cuando de verdad decides ir a tope:',
        },
        {
          type: 'list',
          items: [
            'borrar ficheros o carpetas donde no toca',
            'sobreescribir archivos con un script',
            'ejecutar comandos peligrosos',
            'tocar Git en el momento equivocado: push, merge o crear o borrar ramas sin querer',
            'usar MCPs con acceso a datos y ejecutar operaciones no deseadas',
          ],
        },
      ],
    },
    {
      id: 'turbo-mode-codeagentswarm',
      title: 'Turbo Mode en CodeAgentSwarm: qué cambia',
      content: [
        {
          type: 'paragraph',
          text: 'Turbo Mode en CodeAgentSwarm es "skip confirmations", pero con control de permisos. No se trata de activar el caos. Se trata de evitar fricción donde no aporta valor y mantener control donde sí importa.',
        },
        {
          type: 'paragraph',
          text: 'Dicho fácil: que puedas ir rápido, pero que la app te proteja de lo típico. Que no te haga un push sin querer, que no borre archivos, que no toque ramas.',
        },
        {
          type: 'paragraph',
          text: 'La diferencia práctica es:',
        },
        {
          type: 'list',
          items: [
            'Puedes acelerar el flujo, pero seguir bloqueando lo peligroso.',
            'Puedes permitir lecturas y diffs sin confirmación, y bloquear lo que tenga impacto real.',
            'Puedes aplicar el mismo control a MCPs.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Y aquí viene el típico "pero"',
          id: 'el-pero',
        },
        {
          type: 'paragraph',
          text: 'El problema de ir con Turbo Mode es que, si no tienes visibilidad, a veces ni te enteras de qué ha tocado Claude hasta que ya ha hecho un buen destrozo.',
        },
        {
          type: 'paragraph',
          text: 'Por eso, si vas a usar Turbo Mode, combínalo con el visor de cambios en tiempo real por terminal. Puedes ver cómo funciona en esta guía: <a href="/es/guias/como-ver-cambios-de-claude-code-en-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">ver cambios de Claude Code en tiempo real</a>.',
        },
      ],
    },
    {
      id: 'como-activar-turbo-mode',
      title: 'Cómo activar Turbo Mode',
      content: [
        {
          type: 'paragraph',
          text: 'En la pantalla de inicio del proyecto, activa "Enable Turbo Mode (skip confirmations)".',
        },
        {
          type: 'image',
          alt: 'Activar Turbo Mode (skip confirmations) al iniciar una sesión en CodeAgentSwarm',
          src: '/images/guides/turbo-mode-enable.png',
          caption: 'Activar Turbo Mode al empezar una sesión o al reanudar un proyecto.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'presets-seguridad',
      title: 'Presets de seguridad para Git y comandos destructivos',
      content: [
        {
          type: 'paragraph',
          text: 'En Global Permissions Manager puedes empezar con presets. La idea es configurar rápido lo típico:',
        },
        {
          type: 'list',
          items: [
            'Allow All Tools',
            'Block Dangerous Git (merge, branch, push)',
            'Block Delete Commands (rm, del, etc.)',
          ],
        },
        {
          type: 'paragraph',
          text: 'Con un clic te aplica la política. Y detalle importante: tienes que reiniciar la sesión de Claude para que el cambio aplique del todo.',
        },
        {
          type: 'image',
          alt: 'Global Permissions Manager con presets: Allow All Tools, Block Dangerous Git, Block Delete Commands',
          src: '/images/guides/permissions-global-presets.png',
          caption: 'Presets rápidos para mantener velocidad sin tener sustos.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Si tuviera que elegir uno para casi todo el mundo: Block Dangerous Git. Es el error más caro y el más fácil de pasar por alto cuando vas con prisa.',
        },
      ],
    },
    {
      id: 'permisos-herramientas',
      title: 'Permisos de herramientas: Allow, Ask, Deny',
      content: [
        {
          type: 'paragraph',
          text: 'Después puedes afinar por categoría y por herramienta. El modelo es:',
        },
        {
          type: 'list',
          items: [
            'Allow: auto run',
            'Ask: confirmación',
            'Deny: bloqueado',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Nota sobre "Ask" en Turbo Mode',
          id: 'ask-turbo-mode',
        },
        {
          type: 'paragraph',
          text: '"Ask" se comporta como "Allow" en la práctica, porque si estás en modo "skip confirmations", no te va a pedir confirmación.',
        },
        {
          type: 'image',
          alt: 'Categorías de permisos por herramientas: System, Network, Development, Search, Web',
          src: '/images/guides/tool-permissions-categories.png',
          caption: 'Permisos por categorías: System, Network, Development, Search, Web.',
          size: 'medium',
        },
        {
          type: 'image',
          alt: 'Permisos para File Operations con Allow, Ask y Deny',
          src: '/images/guides/permissions-global-presets.png',
          caption: 'Ejemplo de File Operations con Allow, Ask y Deny.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'La forma de pensar esto sin liarte:',
        },
        {
          type: 'list',
          items: [
            'Si algo te da igual que pase automáticamente, pon Allow.',
            'Si algo NO quieres que pase nunca sin que tú lo veas, pon Deny.',
            'Ask configúralo solo si en algunas situaciones no usas Turbo Mode.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Y un detalle práctico si trabajas en paralelo',
          id: 'trabajar-en-paralelo',
        },
        {
          type: 'paragraph',
          text: 'Turbo Mode se aprovecha todavía más cuando trabajas con varios terminales a la vez. El problema es que, en ese escenario, es facilísimo perder de vista qué terminal ha terminado, cuál está trabajando o cuál se ha quedado bloqueado.',
        },
        {
          type: 'paragraph',
          text: 'Ahí las notificaciones marcan la diferencia. Lo ideal es activarlas para que la app te avise cuando un terminal termina o necesita algo de ti. Puedes configurarlas siguiendo esta guía: <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">notificaciones de CodeAgentSwarm</a>.',
        },
      ],
    },
    {
      id: 'permisos-mcp',
      title: 'Permisos de MCP: el mismo enfoque, pero más importante todavía',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando conectas MCPs, Claude no solo toca archivos. Puede tocar datos, hacer inserts en base de datos y cosas bastante peligrosas. Aquí el control de permisos es más importante, no menos.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm permite gestionar permisos de MCP por servidor y por herramienta.',
        },
        {
          type: 'image',
          alt: 'Panel de permisos MCP con lista de servidores (Supabase, Playwright, Brave Search, PostgreSQL, Notion)',
          src: '/images/guides/mcp-permissions-modal.png',
          caption: 'Panel de permisos MCP por servidor.',
          size: 'medium',
        },
        {
          type: 'image',
          alt: 'Permisos por tool dentro del MCP de Supabase (list_projects, get_project, execute_sql, etc.)',
          src: '/images/guides/mcp-permissions-supabase-tools.png',
          caption: 'Permisos por tool dentro de un MCP (ejemplo: Supabase).',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Regla simple que suele funcionar bien:',
        },
        {
          type: 'list',
          items: [
            'listar y leer: Allow',
            'acciones destructivas (escribir, borrar): Deny',
          ],
        },
      ],
    },
    {
      id: 'configuracion-recomendada',
      title: 'Configuración recomendada (rápida y segura)',
      content: [
        {
          type: 'paragraph',
          text: 'Si quieres una configuración que funciona en la mayoría de casos:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Git',
          id: 'config-git',
        },
        {
          type: 'list',
          items: [
            'status/diff/log: Allow',
            'commit: Deny',
            'push/merge/branch: Deny',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'File operations',
          id: 'config-file-ops',
        },
        {
          type: 'list',
          items: [
            'ReadFile/Edit: Allow',
            'WriteFile: Allow',
            'DeleteFile: Deny',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Network',
          id: 'config-network',
        },
        {
          type: 'list',
          items: [
            'casi todo: Deny',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'MCP',
          id: 'config-mcp',
        },
        {
          type: 'list',
          items: [
            'read/list: Allow',
            'write/migrate: Deny',
            'delete: Deny',
          ],
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'La gracia de Turbo Mode no es "vivir en peligro". Es quitar fricción donde solo te corta el ritmo.',
        },
        {
          type: 'paragraph',
          text: 'Si configuras permisos de Claude Code con cabeza, el flujo queda así: Claude avanza. Tú revisas lo que tiene impacto. Y reduces confirmaciones sin convertir tu repo en una ruleta.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo activar dangerously-skip-permissions en Claude Code?',
      answer: 'En CodeAgentSwarm, activa "Enable Turbo Mode (skip confirmations)" en la pantalla de inicio del proyecto. Esto habilita el comportamiento equivalente a --dangerously-skip-permissions pero con un sistema de permisos granular que te permite controlar qué acciones se auto-aprueban.',
    },
    {
      question: '¿Qué significa dangerously-skip-permissions en Claude Code?',
      answer: 'Es un flag que hace que Claude Code salte las confirmaciones de permisos para herramientas y comandos. Acelera el flujo de trabajo pero puede ser peligroso sin controles adicionales. CodeAgentSwarm implementa este concepto como Turbo Mode con permisos configurables.',
    },
    {
      question: '¿Es lo mismo Turbo Mode que el modo YOLO de Claude Code?',
      answer: 'Sí, conceptualmente. YOLO mode y --dangerously-skip-permissions se refieren a saltar confirmaciones. Turbo Mode en CodeAgentSwarm añade un sistema de permisos granular para que puedas ir rápido sin sacrificar seguridad.',
    },
    {
      question: '¿Cómo evito que Claude haga git push o merge por accidente?',
      answer: 'Usa el preset "Block Dangerous Git" en Global Permissions Manager. Esto bloquea automáticamente push, merge, y creación/eliminación de ramas. Puedes seguir permitiendo status, diff y log para ver cambios sin riesgo.',
    },
    {
      question: '¿Cómo funcionan los permisos de Claude Code (Allow, Ask, Deny)?',
      answer: 'Allow: la acción se ejecuta automáticamente. Ask: pide confirmación (pero en Turbo Mode actúa como Allow). Deny: bloquea la acción completamente. Puedes configurar estos permisos por categoría y por herramienta individual.',
    },
    {
      question: '¿Cómo funcionan los permisos de MCP en CodeAgentSwarm?',
      answer: 'Los permisos de MCP funcionan igual que los permisos de herramientas (Allow/Ask/Deny), pero se configuran por servidor MCP y por tool individual. Esto te permite, por ejemplo, permitir lectura en Supabase pero bloquear escrituras o migraciones.',
    },
  ],
}

export default guide
