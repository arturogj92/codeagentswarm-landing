import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ejecutar-multiples-sesiones-kimi-code',
    locale: 'es',
    title: 'Cómo ejecutar varias sesiones de Kimi Code a la vez',
    metaTitle: 'Cómo ejecutar varias sesiones de Kimi Code a la vez (3 métodos, 2026)',
    metaDescription: 'Ejecuta varias sesiones de Kimi Code a la vez. Cómo funcionan las sesiones, --continue y /title, 3 métodos prácticos y qué le hacen los agentes en paralelo a tu cuota de K3.',
    intro: `Sí, puedes ejecutar varias sesiones de Kimi Code a la vez. Cada vez que ejecutas el comando <code>kimi</code> arrancas una sesión independiente con su propia conversación y su propio contexto, así que dos o más pueden trabajar en tareas distintas del mismo repositorio al mismo tiempo sin compartir nada.

Lo que pide un poco de cabeza no es arrancar los procesos, es mantener las sesiones legibles: qué terminal lleva qué tarea, cuál está esperando un permiso y a qué ritmo se están bebiendo la única cuota que comparten todas. Kimi Code te da buenas piezas para esto (las sesiones se guardan en disco por proyecto, puedes nombrarlas con <code>/title</code> y retomarlas con <code>--continue</code>), pero de serie nada las une.

Esta guía cubre cómo funcionan de verdad las sesiones de Kimi Code, las tres formas prácticas de ejecutar varias en paralelo y qué le hace el paralelismo a tu cuota. Para la foto completa de un enjambre, mira la guía del <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Kimi Code</a>.`,
    ctaText: 'Ejecuta varias sesiones de Kimi Code a la vez en CodeAgentSwarm. Varios terminales en una ventana, notificaciones de escritorio cuando una sesión termina, historial buscable y una vista en vivo de tu cuota compartida de Kimi.',
    highlightedWords: ['varias sesiones de Kimi Code', 'a la vez'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'run-multiple-kimi-code-sessions',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'Respuesta corta: sí, cada proceso kimi es su propia sesión',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://github.com/MoonshotAI/kimi-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a> es el agente de código para terminal de Moonshot AI, con Kimi K3 debajo. Lo instalas una vez (<code>curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash</code>, o <code>npm install -g @moonshot-ai/kimi-code</code> con Node 22.19+), haces login una vez con <code>/login</code> y lo arrancas con el comando <code>kimi</code>. Cada invocación es un proceso aparte con su propia conversación, su contexto y su directorio de trabajo.',
        },
        {
          type: 'paragraph',
          text: 'Así que ejecutar varias sesiones de Kimi Code a la vez no es un modo especial. Abre un segundo terminal, ejecuta <code>kimi</code> otra vez y ya tienes dos sesiones independientes. Una puede estar migrando una capa de base de datos mientras la otra escribe tests de integración. Si Kimi Code te pilla de nuevas, empieza por <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo usar Kimi Code</a> y vuelve.',
        },
        {
          type: 'paragraph',
          text: 'Tampoco estás limitado a Kimi. Como cada agente es su propio proceso, puedes ejecutar Kimi Code en unos terminales y Claude Code o Codex CLI en otros, todos sobre el mismo repositorio. La visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> muestra cómo encajan las distintas herramientas.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Todas tus sesiones de Kimi Code entran con la misma cuenta y comparten una única cuota de suscripción, con renovación semanal y una ventana móvil de 5 horas. Las sesiones en paralelo no cuestan más, solo gastan el mismo fondo más rápido. Más abajo entramos en detalle.',
        },
      ],
    },
    {
      id: 'como-funcionan-sesiones',
      title: 'Cómo funcionan las sesiones de Kimi Code: disco, --continue y /title',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi Code guarda cada sesión en disco como archivos planos, organizadas por directorio de proyecto dentro de <code>~/.kimi-code/sessions/</code>. Cada sesión conserva sus metadatos (título, fechas) y el transcript completo. Esto es lo que hace manejables las sesiones en paralelo: son cosas reales, con nombre y retomables, no solo scrollback.',
        },
        {
          type: 'list',
          items: [
            '<code>kimi</code> arranca una sesión nueva en el directorio actual',
            '<code>kimi --continue</code> (o <code>-c</code>) retoma la sesión más reciente de ese directorio',
            '<code>kimi --session &lt;id&gt;</code> retoma una sesión concreta por su id',
            '<code>/title Mi migración</code> dentro de una sesión le pone nombre, para distinguir tus terminales después',
          ],
        },
        {
          type: 'paragraph',
          text: 'Dos hábitos se amortizan en cuanto ejecutas más de una sesión. Primero, ponle título a cada sesión nada más arrancarla: tres sesiones sin nombre en un mismo repo se vuelven indistinguibles en una hora. Segundo, ten en cuenta que <code>--continue</code> va por directorio, así que si ejecutas varias sesiones en la misma carpeta retoma la última, que no tiene por qué ser la que querías. Cuando esa ambigüedad muerda, retoma por id. El <a href="/es/guias/historial-conversaciones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones de Kimi Code</a> profundiza en dónde viven las sesiones y cómo encontrar las antiguas.',
        },
      ],
    },
    {
      id: 'metodo-ventanas-terminal',
      title: 'Método 1: varias pestañas de terminal (gratis, básico)',
      content: [
        {
          type: 'paragraph',
          text: 'La forma más directa de ejecutar dos sesiones de Kimi Code a la vez es abrir varias pestañas de terminal, entrar en tu proyecto en cada una y arrancar kimi.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Pestaña 1\ncd ~/mi-proyecto\nkimi\n# y dentro: /title Tests de la API\n\n# Pestaña 2\ncd ~/mi-proyecto\nkimi\n# y dentro: /title Migración del esquema',
        },
        {
          type: 'paragraph',
          text: 'Cada pestaña es ahora una sesión de Kimi Code independiente. Dale a cada una una tarea distinta y ve cambiando entre ellas mientras trabajan. Cuando una sesión se para a pedir aprobación antes de un comando o una escritura de archivo, esa pestaña se queda esperándote en silencio, así que acabas saltando de pestaña en pestaña para que la cosa avance.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ventajas',
          id: 'ventanas-terminal-ventajas',
        },
        {
          type: 'list',
          items: [
            'Gratis, nada que configurar más allá de Kimi Code',
            'Funciona al instante con herramientas que ya tienes',
            'Fácil de razonar: una pestaña es una sesión',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desventajas',
          id: 'ventanas-terminal-desventajas',
        },
        {
          type: 'list',
          items: [
            'Pierdes la pista de qué pestaña hace qué casi de inmediato',
            'Sin aviso cuando una sesión termina o se para en un permiso',
            'Sin vista compartida: hay que entrar en cada pestaña para ver el progreso',
            'No hay forma de buscar en el historial de las distintas sesiones',
            'Si dos sesiones editan el mismo archivo, desliarlo es cosa tuya',
          ],
        },
      ],
    },
    {
      id: 'metodo-tmux',
      title: 'Método 2: tmux o screen (gratis, avanzado)',
      content: [
        {
          type: 'paragraph',
          text: 'Si vives en el terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> te deja dividir una ventana en paneles y mantener sesiones vivas en segundo plano, así que puedes ver varias sesiones de Kimi Code a la vez sin cambiar de pestaña.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inicia una sesión nueva de tmux\ntmux new-session -s kimi\n\n# Divide en horizontal\ntmux split-window -h\n\n# Divide el panel derecho en vertical\ntmux split-window -v\n\n# Ahora tienes 3 paneles - ejecuta kimi en cada uno',
        },
        {
          type: 'paragraph',
          text: 'Desconectar y volver a conectar funciona como siempre, así que las sesiones sobreviven a cerrar la ventana. Las pegas son las de siempre con tmux: sin notificaciones de escritorio, sin búsqueda entre sesiones y paneles que se quedan pequeños a partir de tres o cuatro. Y una cautela específica de Kimi: hay reportes abiertos upstream de sesiones que se cuelgan en silencio cuando una petición se atasca, y en un panel desconectado de tmux una sesión colgada se ve exactamente igual que una ocupada.',
        },
      ],
    },
    {
      id: 'git-worktrees',
      title: '¿Mismo repo o worktrees separados?',
      content: [
        {
          type: 'paragraph',
          text: 'Ejecutar varias sesiones sobre la misma copia de trabajo va bien mientras sus tareas toquen zonas distintas. En cuanto dos sesiones editan los mismos archivos, el merge te lo comes tú. Si piensas tener varias sesiones de Kimi Code ocupadas horas en el mismo repositorio, dale a cada una su propio git worktree: mismo repo, carpetas separadas, ramas separadas, cero pisotones.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'git worktree add ../mi-proyecto-tests feature/tests\ngit worktree add ../mi-proyecto-migracion feature/migracion\n\n# Sesión 1\ncd ../mi-proyecto-tests && kimi\n\n# Sesión 2\ncd ../mi-proyecto-migracion && kimi',
        },
        {
          type: 'paragraph',
          text: 'Como extra, los worktrees quitan la ambigüedad a <code>--continue</code>, porque cada sesión vive en su propio directorio. La guía de <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees para agentes de IA</a> cubre el montaje completo, y <a href="/es/guias/git-worktree-vs-rama-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">worktree contra rama</a> explica cuándo compensa cada uno.',
        },
      ],
    },
    {
      id: 'cuota',
      title: 'Qué le hacen las sesiones en paralelo a tu cuota',
      content: [
        {
          type: 'paragraph',
          text: 'Todas las sesiones de Kimi Code tiran del mismo fondo de suscripción: una cuota que se renueva en ciclos semanales más una ventana móvil de 5 horas por encima. Tres sesiones a pleno rendimiento consumen más o menos tres veces más rápido que una, así que las ráfagas intensas en paralelo suelen chocar primero con la ventana de 5 horas, incluso con cuota semanal de sobra. Al llegar no se rompe nada: esperas a que la ventana ruede.',
        },
        {
          type: 'paragraph',
          text: 'Puedes consultar el consumo con <code>/usage</code> dentro de cualquier sesión. El consejo práctico: usa sesiones en paralelo para tareas de verdad independientes, y quédate en las dos o tres que puedas supervisar de verdad. La guía de <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">planes y precios de Kimi Code</a> tiene el detalle de niveles y multiplicadores.',
        },
      ],
    },
    {
      id: 'metodo-codeagentswarm',
      title: 'Método 3: CodeAgentSwarm (visual, completo)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para macOS y Windows construida para ejecutar y supervisar varias sesiones CLI de IA en un solo sitio. Kimi Code es un agente de primera clase junto a Claude Code, Codex CLI, Antigravity CLI y opencode: eliges el agente por terminal, así que ejecutar tres sesiones de Kimi Code es abrir tres terminales y elegir Kimi Code en cada uno.',
        },
        {
          type: 'paragraph',
          text: 'Lo que añade sobre los terminales a pelo:',
        },
        {
          type: 'list',
          items: [
            '<strong>Títulos dinámicos:</strong> cada terminal muestra en qué está su sesión ahora mismo, en lugar de tres pestañas etiquetadas "kimi"',
            '<strong>Notificaciones de escritorio:</strong> aviso nativo cuando una sesión termina o se para a pedir un permiso, se acabó hacer de niñera de pestañas',
            '<strong>Historial buscable:</strong> CodeAgentSwarm lee las sesiones que Kimi Code guarda en local, así que buscas y retomas conversaciones de todos los terminales y todos los agentes',
            '<strong>Indicador de cuota:</strong> una vista en vivo de tu cuota compartida de Kimi, ciclo semanal y ventana de 5 horas, para todas las sesiones juntas',
            '<strong>Diffs de archivos en vivo:</strong> mira lo que cambia cada sesión en tiempo real, por terminal y por proyecto',
            '<strong>Tablero de tareas:</strong> un kanban junto a tus terminales que los propios agentes actualizan por MCP',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si tu agente principal es Claude Code, el mismo montaje está cubierto en <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a>, y los montajes mixtos funcionan igual: un agente distinto por terminal y todo supervisado en una ventana.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: '¿Nuevo en esto de varios terminales a la vez? La guía de <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">varios terminales en paralelo</a> repasa el layout y el flujo de trabajo, y aplica igual tanto si el agente es Kimi Code como Claude Code.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedo ejecutar varias sesiones de Kimi Code a la vez?',
      answer: 'Sí. Cada vez que ejecutas el comando kimi obtienes una sesión independiente con su propia conversación y contexto, así que puedes abrir varios terminales y ejecutar kimi en cada uno. No comparten estado ni se pisan salvo que editen los mismos archivos. CodeAgentSwarm soporta varios terminales para que supervises varias sesiones de Kimi Code en una sola ventana.',
    },
    {
      question: '¿Cómo retomo una sesión concreta de Kimi Code?',
      answer: 'Usa kimi --continue (o -c) para retomar la sesión más reciente del directorio actual, o kimi --session con el id de la sesión para retomar una en concreto. Las sesiones se guardan por proyecto en ~/.kimi-code/sessions/, y ponerles nombre con /title sobre la marcha hace mucho más fácil encontrar la buena.',
    },
    {
      question: '¿Cuestan más varias sesiones de Kimi Code?',
      answer: 'No hay sobrecoste por ejecutar sesiones en paralelo, pero todas tiran de la misma cuota de suscripción, que se renueva cada semana y tiene además una ventana móvil de 5 horas. Las sesiones en paralelo terminan el trabajo antes gastando el fondo común más rápido, así que las ráfagas intensas notan primero la ventana de 5 horas. El trabajo total que te da tu plan no cambia.',
    },
    {
      question: '¿Puedo ejecutar Kimi Code y Claude Code juntos?',
      answer: 'Sí. Cada agente es un proceso aparte, así que puedes ejecutar Kimi Code en unos terminales y Claude Code o Codex CLI en otros, sobre el mismo proyecto. En CodeAgentSwarm eliges el agente por terminal, así que el montaje mixto es lo normal. También existe otra opción si quieres un solo harness: ejecutar el modelo K3 dentro de Claude Code, cubierta en la guía de Kimi K3 con Claude Code.',
    },
    {
      question: '¿Sesiones de Kimi Code en paralelo en el mismo repo o con worktrees?',
      answer: 'El mismo repo va bien mientras las tareas toquen zonas distintas. Para trabajo en paralelo largo, mejor git worktrees: cada sesión tiene su carpeta y su rama, las sesiones nunca editan la misma copia de trabajo, y --continue deja de ser ambiguo porque cada directorio tiene su propio historial de sesiones.',
    },
    {
      question: '¿Cuántas sesiones de Kimi Code puedo ejecutar a la vez?',
      answer: 'Kimi Code no impone un límite duro, cada sesión es solo un proceso. En la práctica te limitan la cuota compartida y tu atención: la ventana móvil de 5 horas frena las ráfagas intensas, y las sesiones sin supervisar acumulan permisos pendientes. De dos a cuatro sesiones supervisadas es el punto dulce para la mayoría del trabajo.',
    },
  ],
}

export default guide
