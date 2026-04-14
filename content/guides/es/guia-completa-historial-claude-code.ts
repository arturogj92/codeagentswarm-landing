import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'guia-completa-historial-claude-code',
    locale: 'es',
    title: 'Historial de Claude Code: guia completa para encontrar conversaciones',
    metaTitle: 'Historial de Claude Code: encontrar conversaciones, buscar sesiones y retomar chats (2026)',
    metaDescription: 'Todo sobre el historial de conversaciones de Claude Code: donde se guardan, como encontrar sesiones anteriores, buscar chats antiguos, retomar conversaciones y gestionar tu historial. Actualizado para 2026.',
    intro: `Si llevas un tiempo usando Claude Code, seguro que en algun momento te has preguntado: donde fue a parar esa conversacion?

Puede que resolvieras un bug complicado la semana pasada, tomaras una decision de arquitectura hace tres dias, o pasaras 20 minutos explicandole un modulo a Claude y ahora necesitas retomar donde lo dejaste.

Claude Code si guarda tu historial de conversaciones. Pero encontrar, buscar y retomar sesiones anteriores no es tan facil como deberia, a menos que uses las herramientas adecuadas.`,
    ctaText: 'Prueba a gestionar tu historial de Claude Code con CodeAgentSwarm. Busca cualquier conversacion, filtra por proyecto y retoma con un clic.',
    highlightedWords: ['historial', 'Claude Code', 'conversaciones'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'claude-code-history-complete-guide',
  },
  sections: [
    {
      id: 'donde-se-guarda',
      title: 'Donde guarda Claude Code tus conversaciones?',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code guarda todo el historial de conversaciones en local, en tu maquina, en <code>~/.claude/projects/</code>. Cada proyecto tiene su propio subdirectorio (basado en la ruta absoluta), y cada conversacion se guarda como un archivo JSONL con un ID de sesion unico.',
        },
        {
          type: 'paragraph',
          text: 'Las herramientas nativas para acceder a este historial son sencillas:',
        },
        {
          type: 'list',
          items: [
            '<code>/history</code> - Lista las sesiones recientes dentro de una sesion activa de Claude Code',
            '<code>claude -c</code> - Retoma la conversacion mas reciente del proyecto actual',
            '<code>claude -r SESSION_ID</code> - Retoma una conversacion especifica por su ID',
          ],
        },
        {
          type: 'paragraph',
          text: 'Estos comandos funcionan, pero tienen limitaciones reales en cuanto empiezas a usar Claude Code en serio con multiples proyectos.',
        },
      ],
    },
    {
      id: 'el-problema',
      title: 'El problema del historial nativo de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'El historial nativo esta pensado para lo basico: retomar tu ultima conversacion o listar sesiones recientes. En cuanto necesitas mas, la cosa se complica:',
        },
        {
          type: 'list',
          items: [
            '<strong>Sin busqueda.</strong> No puedes buscar "esa discusion sobre autenticacion de la semana pasada" en tus conversaciones. Tendrias que hacer grep en archivos JSONL manualmente.',
            '<strong>Sin acceso cross-proyecto.</strong> El historial esta vinculado al directorio donde empezo la conversacion. Para buscar en otro proyecto, tienes que navegar alli primero.',
            '<strong>Sin vision general.</strong> No hay forma de ver todas tus conversaciones de un vistazo, organizadas por proyecto o fecha.',
            '<strong>Sin vista previa.</strong> Ves IDs de sesion y timestamps, pero no de que trataba realmente la conversacion.',
            '<strong>Sin filtros.</strong> No puedes filtrar por proyecto, rango de fechas o contenido.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si usas Claude Code en un solo proyecto de vez en cuando, esto es suficiente. Pero si trabajas en multiples proyectos a diario y Claude Code es tu herramienta principal de desarrollo, necesitas algo mejor.',
        },
      ],
    },
    {
      id: 'historial-completo-codeagentswarm',
      title: 'Historial completo de conversaciones con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> envuelve Claude Code con un sistema completo de historial que resuelve todas las limitaciones anteriores. Cada conversacion, en cada terminal, en cada proyecto, se guarda automaticamente, es buscable y se puede retomar.',
        },
        {
          type: 'image',
          alt: 'Historial de conversaciones de CodeAgentSwarm mostrando todas las sesiones de Claude Code organizadas por proyecto con busqueda y filtros',
          src: '/images/guides/conversation_history.png',
          caption: 'Todas tus conversaciones de Claude Code en un solo lugar, organizadas por proyecto y con busqueda completa.',
          size: 'full',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Busca cualquier conversacion al instante',
          id: 'buscar-cualquier-conversacion',
        },
        {
          type: 'paragraph',
          text: 'Escribe lo que recuerdes - un nombre de modulo, una descripcion de bug, una tecnologia - y CodeAgentSwarm busca en todas tus conversaciones de todos los proyectos. Los resultados muestran el titulo, proyecto, fecha y los mensajes coincidentes para que sepas al instante si es la conversacion correcta.',
        },
        {
          type: 'paragraph',
          text: 'Se acabo hacer grep en archivos JSONL. Se acabo adivinar a que proyecto pertenece una conversacion.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial visual organizado por proyecto',
          id: 'historial-visual-por-proyecto',
        },
        {
          type: 'paragraph',
          text: 'En lugar de una lista plana de IDs de sesion, ves todas tus conversaciones organizadas por proyecto y fecha. Cada proyecto tiene su propio color, asi que escanear el historial es rapido incluso cuando tienes docenas de conversaciones.',
        },
        {
          type: 'list',
          items: [
            'Conversaciones agrupadas por proyecto con codigo de color',
            'Las mas recientes primero, con fechas visibles',
            'Cadenas de conversacion agrupadas (continuaciones del mismo hilo)',
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
          text: 'Encontraste la conversacion que necesitas? Haz clic y CodeAgentSwarm abre un nuevo terminal con todo el contexto anterior cargado. Claude recuerda todo: el codigo que discutisteis, las decisiones que tomasteis, las explicaciones que diste. Sin <code>cd</code> al directorio correcto, sin <code>claude -r</code> con un ID de sesion. Solo clic y a seguir trabajando.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Busqueda cross-proyecto',
          id: 'busqueda-cross-proyecto',
        },
        {
          type: 'paragraph',
          text: 'Esta es la funcionalidad que marca la mayor diferencia para desarrolladores que trabajan en multiples proyectos. Busca "migracion de base de datos" y ve resultados de tu proyecto de backend, tu microservicio y ese side project donde configuraste Knex. Todo en una vista, sin cambiar de directorio.',
        },
        {
          type: 'image',
          alt: 'Resultados de busqueda mostrando conversaciones de multiples proyectos con vista previa de mensajes',
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
          text: 'Cuando abres un proyecto en CodeAgentSwarm, puedes elegir el modo retomar. En lugar de empezar una conversacion en blanco, ves todas tus conversaciones recientes de ese proyecto y eliges cual continuar. Busca dentro de ellas para encontrar exactamente el hilo que necesitas.',
        },
        {
          type: 'image',
          alt: 'Modo retomar mostrando conversaciones recientes de un proyecto con busqueda y vista previa',
          src: '/images/guides/resume-selected-conversation.png',
          caption: 'Elige exactamente que conversacion continuar cuando abres un proyecto.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Para una guia detallada de todas estas funcionalidades, consulta nuestra guia dedicada: <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Usar el historial de conversaciones en CodeAgentSwarm</a>.',
        },
      ],
    },
    {
      id: 'por-que-importa',
      title: 'Por que el historial de conversaciones cambia tu forma de trabajar con Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'No es cuestion de comodidad. Es un cambio fundamental en lo productivo que puedes ser con Claude Code:',
        },
        {
          type: 'list',
          items: [
            '<strong>Deja de re-explicar modulos.</strong> Pasaste 15 minutos explicandole tu sistema de autenticacion a Claude el martes. Con historial, retomas esa conversacion en vez de explicarlo otra vez desde cero.',
            '<strong>Manten decisiones consistentes.</strong> Las decisiones de arquitectura se acumulan en conversaciones. Sin historial, puedes contradecir una decision de hace tres dias sin darte cuenta.',
            '<strong>Ahorra tokens.</strong> Cada vez que re-explicas contexto, estas quemando tokens y tiempo. Retomar una conversacion con contexto existente es mas barato y rapido.',
            '<strong>Trabaja en multiples proyectos con confianza.</strong> Cuando puedes buscar y retomar cualquier conversacion de cualquier proyecto, cambiar entre proyectos deja de ser una pesadilla de cambio de contexto.',
            '<strong>Nunca pierdas una solucion.</strong> Ese fix ingenioso que se te ocurrio a las 11 de la noche? Esta en tu historial. Buscalo, encuentralo, reutilizalo.',
          ],
        },
      ],
    },
    {
      id: 'consejos',
      title: 'Consejos para sacar mas partido a tu historial',
      content: [
        {
          type: 'paragraph',
          text: 'Independientemente de que herramientas uses, estos habitos hacen tu historial de conversaciones mucho mas util:',
        },
        {
          type: 'list',
          items: [
            '<strong>Empieza conversaciones con contexto especifico.</strong> "Arregla el bug de expiracion del token JWT en el middleware de auth" es mucho mas facil de encontrar despues que "Arregla el bug del login".',
            '<strong>Un tema por conversacion.</strong> Mezclar tareas no relacionadas dificulta encontrar y retomar trabajo concreto despues.',
            '<strong>Retoma en vez de re-explicar.</strong> Si ya le explicaste un modulo a Claude, retoma esa conversacion la proxima vez. El contexto ya esta ahi.',
            '<strong>Usa CLAUDE.md para contexto permanente.</strong> Pon decisiones de arquitectura y convenciones en CLAUDE.md como "memoria permanente". Usa el historial como "memoria de trabajo" para tareas concretas.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si trabajas con varios terminales de Claude Code en paralelo, el historial de conversaciones se vuelve aun mas valioso. Consulta nuestra guia sobre <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varios terminales de Claude Code en paralelo</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Donde guarda Claude Code el historial de conversaciones?',
      answer: 'Claude Code guarda todas las conversaciones localmente en ~/.claude/projects/ en tu maquina. Cada proyecto tiene su propio subdirectorio, y las conversaciones se guardan como archivos JSONL con IDs de sesion unicos.',
    },
    {
      question: 'Claude Code guarda el historial automaticamente?',
      answer: 'Si. Cada conversacion se guarda automaticamente. No necesitas activar nada, el historial esta habilitado por defecto.',
    },
    {
      question: 'Como encuentro conversaciones antiguas de Claude Code?',
      answer: 'Con herramientas nativas, usa /history dentro de una sesion o navega por los archivos en ~/.claude/projects/. Con CodeAgentSwarm, tienes busqueda de texto completo en todas las conversaciones y todos los proyectos con retomar en un clic.',
    },
    {
      question: 'Como retomo una conversacion anterior de Claude Code?',
      answer: 'Usa "claude -c" para continuar tu conversacion mas reciente, o "claude -r SESSION_ID" para una sesion especifica. En CodeAgentSwarm, simplemente haz clic en cualquier conversacion en la vista de historial para retomarla.',
    },
    {
      question: 'Puedo buscar en todas mis conversaciones de Claude Code?',
      answer: 'Claude Code nativo no tiene busqueda integrada. Tendrias que hacer grep en archivos JSONL manualmente. CodeAgentSwarm proporciona busqueda instantanea de texto completo en todas las conversaciones, todos los proyectos, con vista previa y filtrado.',
    },
    {
      question: 'El historial de Claude Code funciona entre diferentes proyectos?',
      answer: 'El historial nativo esta vinculado a cada directorio de proyecto por separado. Necesitas navegar al proyecto primero. CodeAgentSwarm proporciona busqueda cross-proyecto y retomar desde cualquier terminal.',
    },
    {
      question: 'Como hago backup del historial de conversaciones de Claude Code?',
      answer: 'Copia el directorio ~/.claude/projects/ a tu ubicacion de backup. Todas las conversaciones son archivos locales, asi que los metodos estandar de backup funcionan.',
    },
    {
      question: 'Puedo transferir el historial a un ordenador nuevo?',
      answer: 'Si. Copia ~/.claude/ de la maquina antigua a la nueva. Las rutas son absolutas, asi que funciona mejor cuando tu estructura de directorios es la misma.',
    },
    {
      question: 'El historial ocupa mucho espacio en disco?',
      answer: 'No. Cada conversacion ocupa unos cientos de KB a unos pocos MB. Incluso usuarios intensivos raramente superan los 500MB en total.',
    },
    {
      question: 'Cual es la diferencia entre /history y claude -c?',
      answer: '/history lista sesiones recientes y sus IDs dentro de una sesion activa. "claude -c" inicia Claude Code retomando automaticamente la conversacion mas reciente del proyecto actual.',
    },
  ],
}

export default guide
