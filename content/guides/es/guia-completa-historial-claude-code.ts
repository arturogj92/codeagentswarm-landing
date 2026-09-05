import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'guia-completa-historial-claude-code',
    locale: 'es',
    title: 'Historial de Claude Code: dónde se guarda y cómo encontrarlo, respaldarlo y retomarlo',
    metaTitle: 'Historial de Claude Code: encontrar y retomar sesiones (2026)',
    metaDescription: 'Encuentra los archivos de sesión de Claude Code, busca el historial JSONL, retoma conversaciones y crea copias antes de que la limpieza automática las borre.',
    intro: `Claude Code guarda las transcripciones locales en ~/.claude/projects/ por defecto. Ejecuta claude -c para continuar la última conversación del directorio actual, o claude --resume para elegir una sesión anterior.

Esta guía explica cómo encontrar, buscar y respaldar conversaciones. Si trabajas con varios agentes o proyectos, también muestra cómo reunir su historial en el escritorio de CodeAgentSwarm.`,
    ctaText: 'Prueba a gestionar tu historial de Claude Code con CodeAgentSwarm. Busca cualquier conversación, filtra por proyecto y retoma con un clic.',
    ctaAgent: 'claude-code',
    highlightedWords: ['historial', 'Claude Code', 'conversaciones'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-09-05',
    alternateSlug: 'claude-code-history-complete-guide',
  },
  sections: [
    {
      id: 'donde-se-guarda',
      title: '¿Dónde guarda Claude Code tus conversaciones?',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code guarda todo el historial de conversaciones en local, en tu máquina, en <code>~/.claude/projects/</code>. Cada proyecto tiene su propio subdirectorio (basado en la ruta absoluta), y cada conversación se guarda como un archivo JSONL con un ID de sesión único. En Windows la misma carpeta vive bajo tu perfil de usuario (<code>C:\\Users\\tu-usuario\\.claude\\projects\\</code>) - si trabajas ahí, la <a href="/es/guias/claude-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Claude Code en Windows</a> cubre la configuración específica de la plataforma.',
        },
        {
          type: 'paragraph',
          text: 'Las herramientas nativas para acceder a este historial son sencillas:',
        },
        {
          type: 'list',
          items: [
            '<code>/resume</code> - Lista las sesiones recientes dentro de una sesión activa de Claude Code',
            '<code>claude -c</code> - Retoma la conversación más reciente del proyecto actual',
            '<code>claude -r SESSION_ID</code> - Retoma una conversación específica por su ID',
          ],
        },
        {
          type: 'paragraph',
          text: 'Puedes encontrar todos los detalles sobre estos comandos en la <a href="https://code.claude.com/docs/en/cli-reference" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de Claude Code</a>. Los comandos y el selector se comprobaron con la documentación oficial el 5 de septiembre de 2026.',
        },
      ],
    },
    {
      id: 'historial-borrado-30-dias',
      title: '¿Por qué desaparece el historial de Claude Code a los 30 días?',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code borra por defecto las transcripciones con más de 30 días. Antes de dar una sesión por borrada, comprueba su proyecto y <code>CLAUDE_CONFIG_DIR</code>. Consulta las <a href="https://code.claude.com/docs/en/claude-directory#application-data" class="text-neon-cyan hover:text-neon-purple transition-colors">reglas de retención y sus excepciones</a>.',
        },
        {
          type: 'paragraph',
          text: 'Puedes cambiar el periodo de retención con el ajuste <code>cleanupPeriodDays</code> en <code>~/.claude/settings.json</code>. Añade este valor conservando los demás ajustes. Ampliar la retención no sustituye las copias de seguridad:',
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "cleanupPeriodDays": 3650\n}',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Cambia este ajuste antes de necesitarlo. Controla las limpiezas futuras, pero no puede recuperar transcripciones ya borradas - para esas, tus únicas opciones son una copia de seguridad de ~/.claude/projects/ o una herramienta que las archivara mientras aún existían.',
        },
      ],
    },
    {
      id: 'el-problema',
      title: 'Cómo buscar y previsualizar el historial nativo de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'El <a href="https://code.claude.com/docs/en/sessions#use-the-session-picker" class="text-neon-cyan hover:text-neon-purple transition-colors">selector actual</a> permite buscar y previsualizar: escribe para filtrar, pulsa Espacio para previsualizar o Ctrl+A para incluir otros proyectos. Para buscar prompts anteriores, usa Ctrl+R en la entrada: consulta el <a href="https://code.claude.com/docs/en/interactive-mode#command-history" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de comandos</a>.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm añade una vista de escritorio compartida entre tus agentes, con búsqueda por contenido, filtros por proyecto y conversaciones que puedes retomar junto a tus terminales activos.',
        },
      ],
    },
    {
      id: 'backup-and-restore',
      title: 'Cómo hacer una copia y restaurar el historial de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Cierra las sesiones que quieras respaldar y copia la carpeta projects a una ubicación de backup separada, conservando sus subdirectorios. Si defines CLAUDE_CONFIG_DIR, usa su carpeta projects. Protege la copia: las transcripciones pueden contener código y salidas de herramientas. Para restaurar, respalda primero la carpeta actual y copia solo los archivos de sesión que falten a su subdirectorio original, sin sobrescribir archivos más recientes. Conserva la ruta del proyecto cuando sea posible y comprueba la sesión con claude --resume. Ampliar la retención no recupera un archivo borrado.',
        },
      ],
    },
    {
      id: 'historial-completo-codeagentswarm',
      title: 'Historial completo de conversaciones con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/es#download" class="text-neon-cyan hover:text-neon-purple transition-colors">Descarga CodeAgentSwarm</a> para buscar contenido, filtrar por proyecto y agente y retomar una sesión junto a tus otros terminales. Sigue el flujo de esta guía con tus conversaciones existentes.',
        },
        {
          type: 'image',
          alt: 'Historial de conversaciones de CodeAgentSwarm mostrando todas las sesiones de Claude Code organizadas por proyecto con búsqueda y filtros',
          src: '/images/guides/conversation_history.png',
          caption: 'Todas tus conversaciones de Claude Code en un solo lugar, organizadas por proyecto y con búsqueda completa.',
          size: 'full',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Busca cualquier conversación al instante',
          id: 'buscar-cualquier-conversacion',
        },
        {
          type: 'paragraph',
          text: 'Escribe lo que recuerdes - un nombre de módulo, una descripción de bug, una tecnología - y CodeAgentSwarm busca en todas tus conversaciones de todos los proyectos. Los resultados muestran el título, proyecto, fecha y los mensajes coincidentes para que sepas al instante si es la conversación correcta.',
        },
        {
          type: 'paragraph',
          text: 'Se acabó hacer grep en archivos JSONL. Se acabó adivinar a qué proyecto pertenece una conversación.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial visual organizado por proyecto',
          id: 'historial-visual-por-proyecto',
        },
        {
          type: 'paragraph',
          text: 'En lugar de una lista plana de IDs de sesión, ves todas tus conversaciones organizadas por proyecto y fecha. Cada proyecto tiene su propio color, así que escanear el historial es rápido incluso cuando tienes docenas de conversaciones.',
        },
        {
          type: 'list',
          items: [
            'Conversaciones agrupadas por proyecto con código de color',
            'Las más recientes primero, con fechas visibles',
            'Cadenas de conversación agrupadas (continuaciones del mismo hilo)',
            'Acceso con un clic desde cualquier terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Retoma con un clic',
          id: 'retomar-un-clic',
        },
        {
          type: 'paragraph',
          text: '¿Encontraste la conversación que necesitas? Haz clic y CodeAgentSwarm abre un nuevo terminal con todo el contexto anterior cargado. La conversación guardada aporta contexto; las sesiones largas pueden haberse compactado. Sin <code>cd</code> al directorio correcto, sin <code>claude -r</code> con un ID de sesión. Solo clic y a seguir trabajando.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Búsqueda cross-proyecto',
          id: 'busqueda-cross-proyecto',
        },
        {
          type: 'paragraph',
          text: 'Esta es la funcionalidad que marca la mayor diferencia para desarrolladores que trabajan en múltiples proyectos. Busca "migración de base de datos" y ve resultados de tu proyecto de backend, tu microservicio y ese side project donde configuraste Knex. Todo en una vista, sin cambiar de directorio.',
        },
        {
          type: 'image',
          alt: 'Resultados de búsqueda mostrando conversaciones de múltiples proyectos con vista previa de mensajes',
          src: '/images/guides/mcp-marketplace-search.png',
          caption: 'Busca en todos los proyectos a la vez. Ve los mensajes coincidentes antes de abrir.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Modo retomar al abrir un proyecto',
          id: 'modo-retomar',
        },
        {
          type: 'paragraph',
          text: 'Cuando abres un proyecto en CodeAgentSwarm, puedes elegir el modo retomar. En lugar de empezar una conversación en blanco, ves todas tus conversaciones recientes de ese proyecto y eliges cuál continuar. Busca dentro de ellas para encontrar exactamente el hilo que necesitas.',
        },
        {
          type: 'image',
          alt: 'Modo retomar mostrando conversaciones recientes de un proyecto con búsqueda y vista previa',
          src: '/images/guides/resume-selected-conversation.png',
          caption: 'Elige exactamente qué conversación continuar cuando abres un proyecto.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Para verlo en detalle, consulta cómo <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">usar el historial en CodeAgentSwarm</a>. Si trabajas con varias CLI, las guías relacionadas cubren el <a href="/es/guias/historial-conversaciones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de Codex</a> y el <a href="/es/guias/historial-conversaciones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de OpenCode</a>. Los usuarios de Cursor deben seguir la guía específica del <a href="/es/guias/historial-conversaciones-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de Cursor CLI</a> porque la reanudación ACP depende de la versión instalada.',
        },
      ],
    },
    {
      id: 'por-que-importa',
      title: 'Por qué el historial de conversaciones cambia tu forma de trabajar con Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'No es cuestión de comodidad. Es un cambio fundamental en lo productivo que puedes ser con Claude Code:',
        },
        {
          type: 'list',
          items: [
            '<strong>Deja de re-explicar módulos.</strong> Pasaste 15 minutos explicándole tu sistema de autenticación a Claude el martes. Con historial, retomas esa conversación en vez de explicarlo otra vez desde cero.',
            '<strong>Mantén decisiones consistentes.</strong> Las decisiones de arquitectura se acumulan en conversaciones. Sin historial, puedes contradecir una decisión de hace tres días sin darte cuenta.',
            '<strong>Reutiliza el contexto.</strong> Retomar ahorra explicaciones, pero un historial largo sigue consumiendo contexto y tokens.',
            '<strong>Trabaja en múltiples proyectos con confianza.</strong> Cuando puedes buscar y retomar cualquier conversación de cualquier proyecto, cambiar entre proyectos deja de ser una pesadilla de cambio de contexto.',
            '<strong>Nunca pierdas una solución.</strong> ¿Ese fix ingenioso que se te ocurrió a las 11 de la noche? Está en tu historial. Búscalo, encuéntralo, reutilízalo.',
          ],
        },
      ],
    },
    {
      id: 'consejos',
      title: 'Consejos para sacar más partido a tu historial',
      content: [
        {
          type: 'paragraph',
          text: 'Independientemente de qué herramientas uses, estos hábitos hacen tu historial de conversaciones mucho más útil:',
        },
        {
          type: 'list',
          items: [
            '<strong>Empieza conversaciones con contexto específico.</strong> "Arregla el bug de expiración del token JWT en el middleware de auth" es mucho más fácil de encontrar después que "Arregla el bug del login".',
            '<strong>Un tema por conversación.</strong> Mezclar tareas no relacionadas dificulta encontrar y retomar trabajo concreto después.',
            '<strong>Retoma en vez de re-explicar.</strong> Si ya le explicaste un módulo a Claude, retoma esa conversación la próxima vez. El contexto ya está ahí.',
            '<strong>Usa CLAUDE.md para contexto permanente.</strong> Pon decisiones de arquitectura y convenciones en CLAUDE.md como "memoria permanente". Usa el historial como "memoria de trabajo" para tareas concretas.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si trabajas con varios terminales de Claude Code en paralelo, el historial de conversaciones se vuelve aún más valioso. Consulta nuestra guía sobre <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varios terminales de Claude Code en paralelo</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Dónde guarda Claude Code el historial de conversaciones?',
      answer: 'Claude Code guarda todas las conversaciones localmente en ~/.claude/projects/ en tu máquina. Cada proyecto tiene su propio subdirectorio, y las conversaciones se guardan como archivos JSONL con IDs de sesión únicos.',
    },
    {
      question: '¿Claude Code guarda el historial automáticamente?',
      answer: 'Sí. Cada conversación se guarda automáticamente. No necesitas activar nada, el historial está habilitado por defecto.',
    },
    {
      question: '¿Cómo encuentro conversaciones antiguas de Claude Code?',
      answer: 'Abre claude --resume desde tu shell o /resume desde una sesión. También puedes consultar los archivos JSONL locales. CodeAgentSwarm integra la búsqueda de conversaciones junto a tus terminales.',
    },
    {
      question: '¿Cómo retomo una conversación anterior de Claude Code?',
      answer: 'Usa "claude -c" para continuar tu conversación más reciente, o "claude -r SESSION_ID" para una sesión específica. En CodeAgentSwarm, simplemente haz clic en cualquier conversación en la vista de historial para retomarla.',
    },
    {
      question: '¿Puedo buscar en todas mis conversaciones de Claude Code?',
      answer: 'Sí. El selector nativo permite filtrar y previsualizar. CodeAgentSwarm ofrece búsqueda por contenido en su vista de historial junto a tus otros agentes.',
    },
    {
      question: '¿El historial de Claude Code funciona entre diferentes proyectos?',
      answer: 'Sí. El selector nativo puede incluir otros proyectos. CodeAgentSwarm ofrece filtros por proyecto y agente en una vista de escritorio.',
    },
    {
      question: '¿Cómo hago backup del historial de conversaciones de Claude Code?',
      answer: 'Copia el directorio ~/.claude/projects/ a tu ubicación de backup. Todas las conversaciones son archivos locales, así que los métodos estándar de backup funcionan.',
    },
    {
      question: '¿Puedo transferir el historial a un ordenador nuevo?',
      answer: 'Respalda primero el destino y transfiere la carpeta projects de forma privada, conservando las rutas de proyecto cuando sea posible. Inicia sesión por separado en el nuevo ordenador. Evita copiar credenciales o sobrescribir transcripciones más recientes.',
    },
    {
      question: '¿El historial ocupa mucho espacio en disco?',
      answer: 'Depende de la duración de las sesiones y de las salidas de herramientas. Comprueba el tamaño de tu carpeta projects antes de elegir dónde respaldarla; no hay un límite de tamaño universal útil.',
    },
    {
      question: '¿Cuál es la diferencia entre /resume y claude -c?',
      answer: 'Usa /resume para elegir una sesión. El comando claude -c continúa la última conversación del directorio actual.',
    },
    {
      question: '¿Por qué ha desaparecido mi historial de Claude Code?',
      answer: 'Claude Code borra por defecto las transcripciones con más de 30 días. Añade "cleanupPeriodDays" con un valor más alto en ~/.claude/settings.json para conservar las sesiones más tiempo. Las transcripciones ya borradas solo se recuperan desde una copia de seguridad de ~/.claude/projects/.',
    },
    {
      question: '¿Cómo evito que Claude Code borre conversaciones antiguas?',
      answer: 'Configura "cleanupPeriodDays" en ~/.claude/settings.json con un número grande, por ejemplo 3650. Esto amplía la ventana de retención de las limpiezas futuras y tus transcripciones se quedan en disco.',
    },
  ],
}

export default guide
