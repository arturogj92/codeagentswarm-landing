import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'historial-conversaciones-kimi-code',
    locale: 'es',
    title: 'Historial de conversaciones de Kimi Code: encontrar y reanudar sesiones',
    metaTitle: 'Historial de Kimi Code: reanudar y buscar sesiones (2026)',
    metaDescription: 'Dónde guarda Kimi Code tus sesiones en disco, cómo reanudar la última con kimi --continue o cualquiera con --session, y cómo buscar en todo tu historial.',
    intro: `Kimi Code guarda todas tus sesiones en tu máquina, y puedes volver a cualquiera cuando quieras. Reanuda la sesión más reciente del proyecto actual con <code>kimi --continue</code>, o abre una concreta con <code>kimi --session &lt;id&gt;</code>. Las sesiones se guardan por proyecto como ficheros planos bajo <code>~/.kimi-code/sessions/</code>, así que cerrar el terminal no pierde nada.

Las herramientas nativas resuelven bien el caso simple: volver a tu última conversación. Se quedan cortas en cuanto acumulas historial de verdad. No hay búsqueda de texto completo entre sesiones, los ids de sesión no los recuerda nadie, y la única herramienta para encontrar una sesión más adelante es ponerle nombre tú mismo con <code>/title</code> mientras sigue abierta.

Esta guía explica dónde vive exactamente el historial de Kimi Code en disco (es más inspeccionable que el de la mayoría de agentes), los flags de reanudación y sus trampas, y cómo CodeAgentSwarm convierte ese mismo historial en una memoria buscable, entre proyectos y entre agentes, que puedes reabrir desde cualquier terminal.`,
    ctaText: 'Deja de cazar ids de sesión. CodeAgentSwarm busca en todo tu historial de Kimi Code por palabra clave, junto a tus conversaciones de Claude Code, Codex y opencode, y reanuda la correcta desde cualquier terminal.',
    highlightedWords: ['Kimi Code', 'historial', 'reanudar'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'kimi-code-conversation-history',
  },
  sections: [
    {
      id: 'respuesta-rapida',
      title: 'La respuesta rápida: reanuda con --continue o --session',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: Kimi Code guarda las sesiones en local y por proyecto. <code>kimi --continue</code> (forma corta <code>-c</code>) reabre la sesión más reciente del directorio en el que estás. <code>kimi --session &lt;id&gt;</code> reabre una concreta. Ponle nombre a la sesión en la que estás con <code>/title</code> para poder encontrarla luego.',
        },
        {
          type: 'paragraph',
          text: 'El historial de conversaciones de Kimi Code es el registro de todo lo que contuvo una sesión: qué pediste, qué hizo el agente y el contexto que se fue construyendo por el camino. Como el contexto es la parte cara de trabajar con un agente de código, poder reabrir una sesión en vez de re-explicar un módulo desde cero vale tiempo y tokens de verdad.',
        },
        {
          type: 'paragraph',
          text: 'Si todavía estás montando el CLI, empieza por la guía de <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo usar Kimi Code</a>. Todo lo de abajo asume que ya tienes sesiones a las que merece la pena volver.',
        },
      ],
    },
    {
      id: 'flags-de-reanudar',
      title: 'Reanudar: los flags y sus trampas',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: `# Reabrir la sesión más reciente del directorio actual
kimi --continue    # forma corta: -c

# Reabrir una sesión concreta por id
kimi --session <session-id>`,
        },
        {
          type: 'paragraph',
          text: 'Aquí importan dos detalles. Primero, <code>--continue</code> va ligado al directorio desde el que lo lanzas: reabre la última sesión de ese proyecto, no la última sesión global. Lánzalo en el repo equivocado y te sale la conversación equivocada. Segundo, <code>-r</code> y <code>--resume</code> existen como alias ocultos de <code>--session</code>, así que los hábitos de Claude Code casi se transfieren, pero la forma documentada es <code>--session</code>.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Los flags de modo pisan la sesión reanudada. Si pasas <code>--yolo</code>, <code>--auto</code> o <code>--plan</code> al reanudar, el flag sustituye el modo que la sesión tenía guardado. Una sesión prudente reanudada con un <code>-y</code> olvidado se convierte en silencio en una sesión full auto. La guía del <a href="/es/guias/modo-yolo-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">modo YOLO de Kimi Code</a> lo cubre a fondo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ponles nombre con /title mientras aún te acuerdas',
          id: 'nombrar-con-title',
        },
        {
          type: 'paragraph',
          text: 'Dentro de una sesión, <code>/title &lt;texto&gt;</code> le pone nombre, y ese nombre se persiste en disco con la sesión. Es el hábito más útil para el historial de Kimi Code: una sesión llamada "migración de auth a JWT" se encuentra en una semana; un id anónimo, no. Titular cuesta cinco segundos con el contexto fresco y ahorra minutos cada vez que buscas después.',
        },
      ],
    },
    {
      id: 'donde-vive-el-historial',
      title: 'Dónde guarda Kimi Code las sesiones en disco',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi Code es inusualmente transparente con su historial: las sesiones son ficheros planos, organizados por proyecto, sin base de datos de por medio. Todo vive bajo <code>~/.kimi-code/sessions/</code>, con un directorio por proyecto y un subdirectorio por sesión:',
        },
        {
          type: 'code',
          language: 'bash',
          code: `~/.kimi-code/
  session_index.jsonl              # indice global: id de sesion -> directorio + proyecto
  sessions/
    <workDirKey>/                  # un bucket por proyecto (derivado de su ruta)
      <sessionId>/
        state.json                 # titulo, timestamps, estado de la sesion
        agents/main/wire.jsonl     # el transcript real, un evento por linea`,
        },
        {
          type: 'paragraph',
          text: 'Las piezas encajan así: el <code>workDirKey</code> se deriva de un hash de la ruta normalizada del proyecto, así que cada proyecto tiene su propio bucket. Dentro de una sesión, <code>state.json</code> guarda el título (incluido lo que fijes con <code>/title</code>) y los timestamps, mientras que <code>agents/main/wire.jsonl</code> es el transcript en sí, un stream JSONL de todo lo que pasó. El <code>session_index.jsonl</code> global de arriba mapea cada id de sesión a su directorio y su proyecto, que es la forma más barata de enumerar todas las sesiones de todos los proyectos.',
        },
        {
          type: 'paragraph',
          text: 'Como todo es JSONL plano, puedes inspeccionarlo con herramientas estándar. Un <code>grep</code> rápido sobre los <code>wire.jsonl</code> responde "qué sesión mencionaba el webhook de pagos" sin tooling especial, aunque llegado a ese punto te estás construyendo tu propio buscador comando a comando.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Toma este layout como informativo, no como contrato. Kimi Code publica versiones casi a diario y sigue en pre-1.0, así que rutas y formatos pueden cambiar. Los flags de reanudar y <code>/title</code> son la superficie estable y documentada.',
        },
      ],
    },
    {
      id: 'donde-duele',
      title: 'Dónde empieza a doler el historial nativo',
      content: [
        {
          type: 'paragraph',
          text: 'La reanudación nativa borda el caso común: tu última sesión en el proyecto actual, a un flag de distancia. La fricción empieza en cuanto la sesión que quieres no es esa:',
        },
        {
          type: 'list',
          items: [
            '<strong>Sin búsqueda de texto completo.</strong> No hay forma nativa de buscar entre sesiones "aquella conversación de la migración de la semana pasada". Tus opciones son acordarte, titular con disciplina o grepear JSONL a mano.',
            '<strong>Los ids de sesión no se recuerdan.</strong> Cualquier cosa anterior a la última sesión necesita un id para <code>--session</code>, y primero tienes que ir a buscar ese id.',
            '<strong>El historial es por proyecto.</strong> El layout por proyecto mantiene el orden, pero implica que encontrar trabajo de otro repo empieza por hacer cd allí.',
            '<strong>Sin vista entre agentes.</strong> Si también usas Claude Code, Codex u opencode, cada uno guarda su historial en su formato y en su sitio. Cuatro agentes son cuatro sitios donde mirar.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Un uso ocasional no choca nunca con estos muros. Un uso diario entre varios repositorios choca con todos, normalmente en la misma semana.',
        },
      ],
    },
    {
      id: 'historial-buscable-codeagentswarm',
      title: 'Historial de Kimi Code buscable con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> corre Kimi Code como agente de primera clase y lee el historial de sesiones que ya guarda en local. Ese historial se convierte en un archivo buscable que abarca todos los proyectos y todos los agentes: tus conversaciones de Kimi Code, Claude Code, Codex, Antigravity CLI y opencode, juntas en una vista.',
        },
        {
          type: 'list',
          items: [
            '<strong>Búsqueda de texto completo.</strong> Escribe lo que recuerdes (un módulo, un bug, una librería) y busca dentro del contenido de cada conversación, mostrando los mensajes que coinciden para confirmar la sesión antes de abrirla. Sin ids de por medio.',
            '<strong>Filtro por proyecto.</strong> Las conversaciones se agrupan por proyecto, cada uno con su color, así que el historial se mantiene legible aunque crezca.',
            '<strong>Vista entre agentes.</strong> Busca "refactor de auth" y ve la sesión de Kimi Code donde lo exploraste al lado de la de Claude Code donde lo terminaste.',
            '<strong>Reanudar desde cualquier terminal.</strong> Abre una conversación encontrada en un terminal con su contexto, sin navegar al directorio correcto ni copiar un id de sesión.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El flujo dentro de la app es un clic: el botón de History en cualquier terminal abre la vista buscable, y el modo resume al abrir un proyecto lista sus conversaciones pasadas para que elijas exactamente dónde continuar. Es el mismo flujo para todos los agentes, y esa es la gracia: una memoria, no cuatro.',
        },
        {
          type: 'paragraph',
          text: 'Si corres varios agentes de Kimi Code a la vez, el historial importa el doble, porque "qué hizo ese terminal mientras miraba el otro" pasa a ser pregunta diaria. La guía de <a href="/es/guias/ejecutar-multiples-sesiones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">múltiples sesiones de Kimi Code</a> cubre ese flujo.',
        },
      ],
    },
    {
      id: 'nativo-vs-codeagentswarm',
      title: 'Reanudación nativa vs historial buscable: cuándo basta cada una',
      content: [
        {
          type: 'paragraph',
          text: 'Las dos vías reabren una conversación pasada de Kimi Code con su contexto. La diferencia está en cómo la encuentras:',
        },
        {
          type: 'list',
          items: [
            '<strong>Volver a tu última sesión:</strong> el <code>kimi --continue</code> nativo es perfecto. Nada que mejorar.',
            '<strong>Una sesión antigua bien titulada:</strong> lo nativo funciona si encuentras el id; lo difícil era el título y ya lo hiciste.',
            '<strong>Una sesión antigua por contenido:</strong> lo nativo no tiene búsqueda; CodeAgentSwarm la encuentra por palabra clave con vista previa de mensajes.',
            '<strong>Trabajo de otro proyecto:</strong> lo nativo implica ir allí primero; CodeAgentSwarm busca entre proyectos estés donde estés.',
            '<strong>Trabajo de otro agente:</strong> el historial nativo va en silos por herramienta; CodeAgentSwarm los junta todos en una vista.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El resumen honesto: si Kimi Code es tu único agente y titulas sesiones con disciplina, lo nativo te lleva lejos. En cuanto mezclas agentes o proyectos, un único historial buscable deja de ser un lujo. Y si quieres el mismo truco para otros CLIs, las guías hermanas de <a href="/es/guias/historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de Claude Code</a> y de <a href="/es/guias/historial-conversaciones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de opencode</a> cubren sus equivalentes nativos.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Guarda Kimi Code el historial de conversaciones?',
      answer: 'Sí. Cada sesión se guarda en local como ficheros planos bajo ~/.kimi-code/sessions/, organizada por proyecto, con un índice global en ~/.kimi-code/session_index.jsonl. Cerrar el terminal no pierde nada: reanuda la última sesión de un proyecto con kimi --continue o una concreta con kimi --session <id>.',
    },
    {
      question: '¿Cómo reanudo una sesión anterior de Kimi Code?',
      answer: 'Ejecuta kimi --continue (forma corta -c) en el directorio del proyecto para reabrir su sesión más reciente, o kimi --session <id> para una concreta (-r y --resume existen como alias ocultos). Cuidado con los flags de modo: pasar --yolo, --auto o --plan al reanudar pisa el modo que la sesión tenía guardado.',
    },
    {
      question: '¿Dónde guarda Kimi Code sus sesiones en disco?',
      answer: 'Bajo ~/.kimi-code/sessions/<workDirKey>/<sessionId>/, donde el workDirKey se deriva de un hash de la ruta del proyecto. Cada sesión tiene un state.json con su título y timestamps y el transcript completo en agents/main/wire.jsonl en formato JSONL. El layout puede cambiar entre versiones, así que tómalo como inspeccionable, no garantizado.',
    },
    {
      question: '¿Cómo le pongo nombre a una sesión de Kimi Code?',
      answer: 'Dentro de la sesión, ejecuta /title <texto>. El título se persiste con la sesión en disco, y es lo que te permite reconocer la conversación después. Titular las sesiones con el contexto fresco es la mejor defensa nativa contra cazar ids anónimos una semana más tarde.',
    },
    {
      question: '¿Puedo buscar en todas mis conversaciones de Kimi Code?',
      answer: 'Nativamente no: Kimi Code no trae búsqueda de texto completo entre sesiones. Como los transcripts son JSONL plano, puedes grepearlos a mano. CodeAgentSwarm indexa ese mismo historial y te da búsqueda por palabra clave con vista previa de mensajes en todos los proyectos, y también en tus otros agentes.',
    },
    {
      question: '¿Puedo ver el historial de Kimi Code y el de Claude Code juntos?',
      answer: 'Sí, en CodeAgentSwarm. Como el agente se elige por terminal, el historial no va en silos por herramienta: la misma vista buscable junta las sesiones de Kimi Code, Claude Code, Codex, Antigravity CLI y opencode, y cualquiera se puede reabrir en un terminal desde ahí.',
    },
  ],
}

export default guide
