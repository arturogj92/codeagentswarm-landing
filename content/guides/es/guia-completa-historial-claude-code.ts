import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'guia-completa-historial-claude-code',
    locale: 'es',
    title: 'Historial de Claude Code: dónde se guarda y cómo encontrarlo, respaldarlo y retomarlo',
    metaTitle: '¿Dónde se guarda el historial de Claude Code? Encontrar, respaldar y retomar sesiones (2026)',
    metaDescription: 'Todo sobre el historial de conversaciones de Claude Code: dónde se guardan, cómo encontrar sesiones anteriores, buscar chats antiguos, retomar conversaciones y gestionar tu historial. Actualizado para 2026.',
    intro: `Si llevas un tiempo usando Claude Code, seguro que en algún momento te has preguntado: ¿dónde fue a parar esa conversación?

Puede que resolvieras un bug complicado la semana pasada, tomaras una decisión de arquitectura hace tres días, o pasaras 20 minutos explicándole un módulo a Claude y ahora necesitas retomar donde lo dejaste.

La respuesta corta: Claude Code guarda cada sesión en local en ~/.claude/projects/, y puedes retomar la más reciente con "claude -c" o una concreta con "claude -r". La respuesta larga, cómo encontrar, buscar, respaldar y retomar cualquier conversación anterior, es lo que cubre esta guía.`,
    ctaText: 'Prueba a gestionar tu historial de Claude Code con CodeAgentSwarm. Busca cualquier conversación, filtra por proyecto y retoma con un clic.',
    highlightedWords: ['historial', 'Claude Code', 'conversaciones'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'claude-code-history-complete-guide',
  },
  sections: [
    {
      id: 'donde-se-guarda',
      title: '¿Dónde guarda Claude Code tus conversaciones?',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code guarda todo el historial de conversaciones en local, en tu máquina, en <code>~/.claude/projects/</code>. Cada proyecto tiene su propio subdirectorio (basado en la ruta absoluta), y cada conversación se guarda como un archivo JSONL con un ID de sesión único.',
        },
        {
          type: 'paragraph',
          text: 'Las herramientas nativas para acceder a este historial son sencillas:',
        },
        {
          type: 'list',
          items: [
            '<code>/history</code> - Lista las sesiones recientes dentro de una sesión activa de Claude Code',
            '<code>claude -c</code> - Retoma la conversación más reciente del proyecto actual',
            '<code>claude -r SESSION_ID</code> - Retoma una conversación específica por su ID',
          ],
        },
        {
          type: 'paragraph',
          text: 'Puedes encontrar todos los detalles sobre estos comandos en la <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de Claude Code</a>. Estos comandos funcionan, pero tienen limitaciones reales en cuanto empiezas a usar Claude Code en serio con múltiples proyectos.',
        },
      ],
    },
    {
      id: 'el-problema',
      title: 'El problema del historial nativo de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'El historial nativo está pensado para lo básico: retomar tu última conversación o listar sesiones recientes. En cuanto necesitas más, la cosa se complica:',
        },
        {
          type: 'list',
          items: [
            '<strong>Sin búsqueda.</strong> No puedes buscar "esa discusión sobre autenticación de la semana pasada" en tus conversaciones. Tendrías que hacer grep en archivos JSONL manualmente.',
            '<strong>Sin acceso cross-proyecto.</strong> El historial está vinculado al directorio donde empezó la conversación. Para buscar en otro proyecto, tienes que navegar allí primero.',
            '<strong>Sin visión general.</strong> No hay forma de ver todas tus conversaciones de un vistazo, organizadas por proyecto o fecha.',
            '<strong>Sin vista previa.</strong> Ves IDs de sesión y timestamps, pero no de qué trataba realmente la conversación.',
            '<strong>Sin filtros.</strong> No puedes filtrar por proyecto, rango de fechas o contenido.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si usas Claude Code en un solo proyecto de vez en cuando, esto es suficiente. Pero si trabajas en múltiples proyectos a diario y Claude Code es tu herramienta principal de desarrollo, necesitas algo mejor.',
        },
      ],
    },
    {
      id: 'historial-completo-codeagentswarm',
      title: 'Historial completo de conversaciones con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> envuelve Claude Code con un sistema completo de historial que resuelve todas las limitaciones anteriores. Cada conversación, en cada terminal, en cada proyecto, se guarda automáticamente, es buscable y se puede retomar.',
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
          text: '¿Encontraste la conversación que necesitas? Haz clic y CodeAgentSwarm abre un nuevo terminal con todo el contexto anterior cargado. Claude recuerda todo: el código que discutisteis, las decisiones que tomasteis, las explicaciones que diste. Sin <code>cd</code> al directorio correcto, sin <code>claude -r</code> con un ID de sesión. Solo clic y a seguir trabajando.',
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
          text: 'Para una guía detallada de todas estas funcionalidades, consulta nuestra guía dedicada: <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Usar el historial de conversaciones en CodeAgentSwarm</a>.',
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
            '<strong>Ahorra tokens.</strong> Cada vez que re-explicas contexto, estás quemando tokens y tiempo. Retomar una conversación con contexto existente es más barato y rápido.',
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
      answer: 'Con herramientas nativas, usa /history dentro de una sesión o navega por los archivos en ~/.claude/projects/. Con CodeAgentSwarm, tienes búsqueda de texto completo en todas las conversaciones y todos los proyectos con retomar en un clic.',
    },
    {
      question: '¿Cómo retomo una conversación anterior de Claude Code?',
      answer: 'Usa "claude -c" para continuar tu conversación más reciente, o "claude -r SESSION_ID" para una sesión específica. En CodeAgentSwarm, simplemente haz clic en cualquier conversación en la vista de historial para retomarla.',
    },
    {
      question: '¿Puedo buscar en todas mis conversaciones de Claude Code?',
      answer: 'Claude Code nativo no tiene búsqueda integrada. Tendrías que hacer grep en archivos JSONL manualmente. CodeAgentSwarm proporciona búsqueda instantánea de texto completo en todas las conversaciones, todos los proyectos, con vista previa y filtrado.',
    },
    {
      question: '¿El historial de Claude Code funciona entre diferentes proyectos?',
      answer: 'El historial nativo está vinculado a cada directorio de proyecto por separado. Necesitas navegar al proyecto primero. CodeAgentSwarm proporciona búsqueda cross-proyecto y retomar desde cualquier terminal.',
    },
    {
      question: '¿Cómo hago backup del historial de conversaciones de Claude Code?',
      answer: 'Copia el directorio ~/.claude/projects/ a tu ubicación de backup. Todas las conversaciones son archivos locales, así que los métodos estándar de backup funcionan.',
    },
    {
      question: '¿Puedo transferir el historial a un ordenador nuevo?',
      answer: 'Sí. Copia ~/.claude/ de la máquina antigua a la nueva. Las rutas son absolutas, así que funciona mejor cuando tu estructura de directorios es la misma.',
    },
    {
      question: '¿El historial ocupa mucho espacio en disco?',
      answer: 'No. Cada conversación ocupa unos cientos de KB a unos pocos MB. Incluso usuarios intensivos raramente superan los 500MB en total.',
    },
    {
      question: '¿Cuál es la diferencia entre /history y claude -c?',
      answer: '/history lista sesiones recientes y sus IDs dentro de una sesión activa. "claude -c" inicia Claude Code retomando automáticamente la conversación más reciente del proyecto actual.',
    },
  ],
}

export default guide
