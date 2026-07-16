import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-yolo-claude-code-explicado',
    locale: 'es',
    title: 'Modo YOLO de Claude Code: qué es, los riesgos y cómo activarlo de forma segura',
    metaTitle: 'Modo YOLO de Claude Code: qué es y cómo activarlo seguro (2026)',
    metaDescription: 'Qué hace realmente --dangerously-skip-permissions, los riesgos reales, cómo se compara con Auto mode y la configuración paso a paso de Turbo Mode para ir rápido y seguro.',
    intro: `Si llevas más de un día trabajando con Claude Code, seguro que ya te has encontrado con la misma frustración: los prompts de confirmación constantes. Cada edición de archivo, cada comando de terminal, cada llamada a una herramienta MCP - Claude pide confirmación, y tú le das a "yes" sin ni siquiera leer lo que dice.

Ahí es donde entra el "modo YOLO". La comunidad empezó a llamarlo así por el flag \`--dangerously-skip-permissions\`, que hace exactamente lo que suena: salta todos los prompts de permisos para que Claude trabaje sin interrupciones.

La ganancia de velocidad es real. Pero los riesgos también. Esta guía cubre qué hace realmente el modo YOLO por dentro, qué puede salir mal, y cómo conseguir la misma velocidad de forma segura, ya sea con el Auto mode de Anthropic o con el Turbo Mode de CodeAgentSwarm con controles de permisos granulares.`,
    ctaText: 'Salta confirmaciones de forma segura con CodeAgentSwarm Turbo Mode. Permisos granulares, protecciones Git y controles MCP incluidos.',
    highlightedWords: ['YOLO mode', 'Claude Code'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-07-16',
    alternateSlug: 'claude-code-yolo-mode-explained',
  },
  sections: [
    {
      id: 'que-es-modo-yolo',
      title: '¿Qué es el modo YOLO en Claude Code?',
      content: [
        {
          type: 'paragraph',
          text: '"Modo YOLO" es el nombre que la comunidad le puso a ejecutar Claude Code con el flag <code>--dangerously-skip-permissions</code>. El nombre no es oficial, Anthropic no lo llama así, pero se quedó porque captura la idea perfectamente: solo se vive una vez, así que salta los prompts y deja que Claude haga lo suyo.',
        },
        {
          type: 'paragraph',
          text: 'La motivación principal es simple. Cuando estás iterando en una feature, arreglando bugs o refactorizando código, Claude pide permiso antes de cada acción: editar un archivo, ejecutar un test, instalar un paquete, usar una herramienta MCP. En una tarea típica, eso puede significar decenas de prompts. La mayoría de los desarrolladores simplemente le dan a "yes" a todo, lo que anula el propósito de tener protecciones.',
        },
        {
          type: 'paragraph',
          text: 'El modo YOLO elimina todos esos prompts de golpe. Claude lee, escribe, ejecuta comandos y llama herramientas sin preguntar. Para tareas repetitivas o bien definidas, se siente como desbloquear el verdadero potencial de un agente de código con IA.',
        },
        {
          type: 'paragraph',
          text: 'La contrapartida es que pierdes todas las protecciones. Cada acción se auto-aprueba, incluyendo las que normalmente querrías revisar. Por eso el flag se llama "dangerously" - es una advertencia honesta de Anthropic de que este modo intercambia seguridad por velocidad.',
        },
      ],
    },
    {
      id: 'que-hace-el-flag',
      title: 'Qué hace realmente --dangerously-skip-permissions',
      content: [
        {
          type: 'paragraph',
          text: 'Normalmente, Claude Code pide permiso explícito antes de realizar acciones en estas categorías:',
        },
        {
          type: 'list',
          items: [
            '<strong>Operaciones de archivos</strong> - Escribir, editar o crear archivos en tu proyecto',
            '<strong>Comandos de terminal</strong> - Ejecutar cualquier cosa en el terminal (npm install, comandos de git, scripts)',
            '<strong>Acceso a red</strong> - Hacer peticiones HTTP o acceder a servicios externos',
            '<strong>Herramientas MCP</strong> - Llamar herramientas de servidores MCP conectados (Supabase, Playwright, etc.)',
          ],
        },
        {
          type: 'paragraph',
          text: 'Con <code>--dangerously-skip-permissions</code>, todas estas acciones se auto-aprueban sin ningún prompt. Claude obtiene autonomía total sobre tu máquina dentro de la sesión.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cómo ejecutarlo',
          id: 'como-ejecutarlo',
        },
        {
          type: 'paragraph',
          text: 'La forma más simple es pasar el flag directamente:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --dangerously-skip-permissions "refactor the auth module"',
        },
        {
          type: 'paragraph',
          text: 'También puedes establecerlo como modo de permisos, que es equivalente:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --permission-mode bypassPermissions',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Auto mode - una alternativa más segura incluida de serie',
          id: 'alternativa-auto-mode',
        },
        {
          type: 'paragraph',
          text: 'Anthropic introdujo un punto intermedio llamado <a href="https://www.anthropic.com/engineering/claude-code-auto-mode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Auto mode</a>. En lugar de saltar todo o preguntar todo, usa un clasificador para decidir qué acciones son seguras para auto-aprobar y cuáles necesitan tu confirmación. Puedes conocer todas las opciones disponibles en la <a href="https://code.claude.com/docs/en/permission-modes" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de modos de permisos</a>:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --permission-mode auto',
        },
        {
          type: 'paragraph',
          text: 'Auto mode es un paso en la dirección correcta - reduce los prompts para acciones de bajo riesgo como leer archivos o ejecutar tests, mientras sigue preguntando por las más arriesgadas. Sin embargo, no controlas la clasificación. Lo que el clasificador considera "seguro" puede no coincidir con tus preferencias, y puede seguir interrumpiéndote en acciones que tú aprobarías sin problema.',
        },
      ],
    },
    {
      id: 'riesgos-reales',
      title: 'Los riesgos reales del modo YOLO',
      content: [
        {
          type: 'paragraph',
          text: 'Vamos a ser directos con esto: los riesgos no son teóricos. Son cosas que realmente pasan cuando los desarrolladores usan <code>--dangerously-skip-permissions</code> sin protecciones adicionales.',
        },
        {
          type: 'list',
          items: [
            '<strong>Git push a la rama equivocada</strong> - Claude decide hacer commit y push de tus cambios a medio terminar a main. O peor, hace force-push y sobreescribe el trabajo de tu equipo.',
            '<strong>Borrar archivos o directorios</strong> - Una instrucción mal interpretada lleva a un <code>rm -rf</code> en un directorio que no querías eliminar.',
            '<strong>Comandos de terminal destructivos</strong> - <code>DROP TABLE</code>, <code>docker system prune</code>, o cualquier comando que no se pueda deshacer.',
            '<strong>Instalar paquetes maliciosos</strong> - Claude ejecuta <code>npm install</code> para un paquete que parece correcto pero es un typosquat o una dependencia comprometida.',
            '<strong>Peticiones de red no deseadas</strong> - Llamadas API a endpoints de producción, envío de datos a servicios externos o disparar webhooks que no esperabas.',
            '<strong>Sobreescribir cambios sin commitear</strong> - Claude empieza a editar archivos en los que estabas trabajando y tus cambios no commiteados se pierden antes de que te des cuenta.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Estos no son casos extremos. En proyectos activos con datos reales e historiales de Git reales, cualquiera de estos puede pasar en una sola sesión. Cuanto más autónomo es Claude, más importante es tener algún tipo de protección.',
        },
        {
          type: 'paragraph',
          text: 'La clave es que el modo YOLO no es malo por naturaleza. El problema es que es todo o nada. O preguntas por todo o saltas todo, sin forma de decir "auto-aprueba ediciones de archivos pero bloquea git push" usando solo el flag nativo de la CLI.',
        },
      ],
    },
    {
      id: 'activar-de-forma-segura',
      title: 'Cómo activar el modo YOLO de forma segura',
      content: [
        {
          type: 'paragraph',
          text: 'Hay tres enfoques, del más arriesgado al más controlado.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 1: El flag directo (no recomendado para uso diario)',
          id: 'metodo-flag-directo',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --dangerously-skip-permissions "your prompt here"',
        },
        {
          type: 'paragraph',
          text: 'Esto funciona para tareas rápidas y aisladas donde tienes confianza de que Claude no va a hacer nada destructivo. Piensa en "renombra esta variable en todos lados" o "añade JSDoc a estas funciones." Para cualquier cosa que involucre operaciones de Git, borrado de archivos o llamadas de red, es una apuesta.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 2: Auto mode (la alternativa oficial más segura de Anthropic)',
          id: 'metodo-auto-mode',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --permission-mode auto',
        },
        {
          type: 'paragraph',
          text: 'Auto mode usa un clasificador interno para auto-aprobar acciones que considera seguras y pedir confirmación para las arriesgadas. Es mejor que el flag directo, pero no puedes personalizar qué cuenta como "seguro" - el clasificador decide por ti. Si quieres que las lecturas y diffs se auto-aprueben pero las operaciones de Git siempre pregunten, no puedes configurar eso con Auto mode.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 3: CodeAgentSwarm Turbo Mode (recomendado)',
          id: 'metodo-turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Turbo Mode en CodeAgentSwarm te da la velocidad del modo YOLO con el control que realmente necesitas. En lugar de un interruptor de encendido/apagado, tienes un sistema de permisos completo donde decides exactamente qué se auto-aprueba y qué se bloquea.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que lo diferencia:',
        },
        {
          type: 'list',
          items: [
            '<strong>Permisos granulares por categoría de herramienta</strong> - Establece Permitir, Preguntar o Denegar para operaciones de archivos, comandos de terminal, acciones de Git, acceso a red y más. Cada categoría es independiente.',
            '<strong>Protecciones de Git</strong> - Bloquea push, force-push, merge y borrado de ramas mientras mantienes status, diff y log en auto-aprobación. Esta sola configuración previene los desastres más comunes del modo YOLO.',
            '<strong>Permisos de herramientas MCP</strong> - Controla qué herramientas MCP pueden ejecutarse automáticamente y cuáles necesitan confirmación. Permite lecturas de Supabase pero bloquea migraciones, por ejemplo.',
            '<strong>Gestor visual de permisos</strong> - Una interfaz donde configuras todo en lugar de editar archivos JSON o recordar flags de la CLI.',
          ],
        },
        {
          type: 'image',
          alt: 'Presets de permisos en CodeAgentSwarm: Permitir Todo, Bloquear Git Peligroso, Bloquear Comandos de Borrado',
          src: '/images/guides/permissions-global-presets.png',
          caption: 'Los presets de un clic te dan un punto de partida seguro. "Block Dangerous Git" es la opción más popular.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'La diferencia práctica es significativa. Con el flag directo, o aceptas todo el riesgo o te pasas el día pulsando "yes." Con Turbo Mode, configuras una vez y obtienes la velocidad del modo YOLO donde es seguro, con bloqueos automáticos donde importa.',
        },
        {
          type: 'paragraph',
          text: 'En la siguiente sección tienes la configuración exacta, pantalla a pantalla.',
        },
      ],
    },
    {
      id: 'configurar-turbo-mode',
      title: 'Configurar Turbo Mode paso a paso',
      content: [
        {
          type: 'paragraph',
          text: 'Activarlo es un clic: en la pantalla de inicio del proyecto, marca "Enable Turbo Mode (skip confirmations)".',
        },
        {
          type: 'image',
          alt: 'Activar Turbo Mode (skip confirmations) al iniciar una sesión en CodeAgentSwarm',
          src: '/images/guides/turbo-mode-enable.png',
          caption: 'Activar Turbo Mode al empezar una sesión o al reanudar un proyecto.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Presets rápidos de seguridad',
          id: 'presets-seguridad',
        },
        {
          type: 'paragraph',
          text: 'Antes de dejar que nada corra sin supervisión, aplica un preset en el Global Permissions Manager:',
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
          text: 'Un clic aplica la política, y normalmente tendrás que reiniciar la sesión de Claude para que el cambio aplique del todo. Si solo eliges uno, que sea "Block Dangerous Git": un push o un merge en el momento equivocado es el accidente YOLO más caro y el más fácil de pasar por alto.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Permisos de herramientas: Allow, Ask, Deny',
          id: 'permisos-herramientas',
        },
        {
          type: 'paragraph',
          text: 'Puedes afinar los permisos por categoría y por herramienta individual. Allow ejecuta la acción automáticamente, Ask pide confirmación y Deny la bloquea por completo. Un matiz importante: con "skip confirmations" activo, Ask se comporta como Allow en la práctica, así que usa Deny para todo lo que nunca quieras que pase sin que tú lo veas.',
        },
        {
          type: 'image',
          alt: 'Categorías de permisos por herramientas: System, Network, Development, Search, Web',
          src: '/images/guides/tool-permissions-categories.png',
          caption: 'Los permisos se agrupan por categorías: System, Network, Development, Search, Web.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Permisos de MCP',
          id: 'permisos-mcp',
        },
        {
          type: 'paragraph',
          text: 'Con servidores MCP conectados, Claude puede tocar fuentes de datos reales, así que aquí el control de permisos importa todavía más. CodeAgentSwarm aplica el mismo modelo Allow/Ask/Deny por servidor MCP y por herramienta. Regla simple: listar y leer en Allow, acciones destructivas (escribir, migrar, borrar) en Deny.',
        },
        {
          type: 'image',
          alt: 'Panel de permisos MCP con lista de servidores (Supabase, Playwright, Brave Search, PostgreSQL, Notion)',
          src: '/images/guides/mcp-permissions-modal.png',
          caption: 'Los permisos MCP se configuran por servidor, y por tool dentro de cada servidor.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Una política recomendada, rápida y segura',
          id: 'configuracion-recomendada',
        },
        {
          type: 'list',
          items: [
            '<strong>Git</strong> - status, diff y log en Allow; commit, push, merge y branch en Deny',
            '<strong>Operaciones de archivos</strong> - leer, editar y escribir en Allow; borrar en Deny',
            '<strong>Red</strong> - casi todo en Deny',
            '<strong>MCP</strong> - listar y leer en Allow; escribir, migrar y borrar en Deny',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Varios terminales en paralelo',
          id: 'trabajar-en-paralelo',
        },
        {
          type: 'paragraph',
          text: 'Turbo Mode se aprovecha todavía más cuando trabajas con varios terminales a la vez. El problema es la visibilidad: es facilísimo perder de vista qué terminal ha terminado o cuál necesita algo de ti. Las notificaciones resuelven eso - actívalas y deja que la app te avise cuando algo termina o se queda bloqueado. Puedes configurarlas siguiendo la <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de notificaciones de CodeAgentSwarm</a>.',
        },
      ],
    },
    {
      id: 'buenas-practicas',
      title: 'Buenas prácticas para workflows de auto-aprobación',
      content: [
        {
          type: 'paragraph',
          text: 'Independientemente del método que uses, estos hábitos te van a salvar de los peores accidentes del modo YOLO:',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabaja siempre en una feature branch, nunca en main.</strong> Si Claude la lía, puedes tirar la rama. Si la lía en main, lo sufre todo tu equipo.',
            '<strong>Haz commit antes de empezar una sesión YOLO.</strong> Esto te da un punto de restauración limpio. Si algo sale mal, <code>git checkout .</code> te devuelve al estado anterior al instante.',
            '<strong>Bloquea operaciones peligrosas de Git.</strong> Push, force-push, merge y borrado de ramas deberían requerir confirmación manual incluso en modo YOLO. Son las acciones de mayor impacto y las más difíciles de deshacer.',
            '<strong>Revisa los cambios antes de hacer commit.</strong> Usa un visor de diffs en tiempo real para ver qué cambió Claude. En CodeAgentSwarm, el <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">rastreador de cambios por terminal</a> muestra exactamente qué se modificó durante la sesión.',
            '<strong>Empieza con el preset "Block Dangerous", afloja según necesites.</strong> Es mucho más seguro empezar restrictivo y abrir permisos específicos que empezar abierto e intentar bloquear cosas después de que algo salga mal.',
            '<strong>Mantén las sesiones enfocadas.</strong> Cuanto más específico sea tu prompt, menos probable es que Claude se desvíe. "Refactoriza el middleware de auth para usar JWT" es más seguro que "mejora el codebase."',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'La combinación de feature branches + bloqueo de git push + diff en tiempo real te da el 90% de la velocidad YOLO con casi ninguno de los riesgos. La mayoría de los desarrolladores que prueban esta configuración no vuelven al flag directo.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué hace --dangerously-skip-permissions en Claude Code?',
      answer: 'Salta todos los prompts de permisos. Claude Code auto-aprobará cada acción - ediciones de archivos, comandos de terminal, peticiones de red, llamadas a herramientas MCP - sin pedir tu confirmación. Esto da máxima velocidad pero elimina todas las protecciones de seguridad.',
    },
    {
      question: '¿Es seguro usar el modo YOLO?',
      answer: 'El flag --dangerously-skip-permissions directo es arriesgado porque auto-aprueba todo, incluyendo acciones destructivas como git push o borrado de archivos. Para alternativas más seguras, usa el Auto mode de Anthropic (que clasifica acciones por riesgo) o CodeAgentSwarm Turbo Mode (que te permite configurar permisos por categoría de herramienta).',
    },
    {
      question: '¿Cómo activo el modo YOLO en Claude Code?',
      answer: 'Ejecuta claude --dangerously-skip-permissions seguido de tu prompt, o usa claude --permission-mode bypassPermissions. Para un enfoque más seguro, usa claude --permission-mode auto o activa Turbo Mode en CodeAgentSwarm.',
    },
    {
      question: '¿Cuál es la diferencia entre el modo YOLO y Auto mode?',
      answer: 'El modo YOLO (--dangerously-skip-permissions) salta todos los prompts de permisos sin excepción. Auto mode (--permission-mode auto) usa un clasificador interno para auto-aprobar acciones que considera seguras mientras sigue preguntando por las arriesgadas. Auto mode es más seguro pero no puedes personalizar lo que considera "seguro."',
    },
    {
      question: '¿Puede el modo YOLO borrar mis archivos?',
      answer: 'Sí. Sin protecciones, Claude puede ejecutar rm -rf, borrar directorios, sobreescribir archivos y ejecutar cualquier comando destructivo de terminal, todo sin preguntar. Esta es una de las principales razones para usar un sistema de permisos como CodeAgentSwarm Turbo Mode en lugar del flag directo.',
    },
    {
      question: '¿Qué es Turbo Mode en CodeAgentSwarm?',
      answer: 'Turbo Mode es la implementación de auto-aprobación de CodeAgentSwarm para Claude Code, con controles de permisos granulares. Puedes establecer Permitir, Preguntar o Denegar por categoría de herramienta, bloquear operaciones específicas de Git y controlar permisos de herramientas MCP. Te da la velocidad del modo YOLO con seguridad configurable.',
    },
    {
      question: '¿Puedo usar el modo YOLO en VS Code?',
      answer: 'Sí. En los ajustes de la extensión Claude Code para VS Code, activa "Allow Dangerously Skip Permissions." Es el equivalente al flag --dangerously-skip-permissions de la CLI pero aplicado dentro de la extensión. Los mismos riesgos aplican.',
    },
    {
      question: '¿Cuál es la forma más segura de saltar confirmaciones en Claude Code?',
      answer: 'Usa CodeAgentSwarm Turbo Mode con el preset "Block Dangerous Git". Esto auto-aprueba ediciones y lecturas de archivos mientras bloquea push, force-push, merge y borrado de ramas. Combinado con trabajar en una feature branch, esto te da iteración rápida con riesgo mínimo.',
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
