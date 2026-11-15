import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-yolo-kimi-code',
    locale: 'es',
    title: 'Modo YOLO de Kimi Code: el flag --yolo, modos y uso seguro',
    metaTitle: 'Modo YOLO de Kimi Code: flag --yolo, permisos y seguridad (2026)',
    metaDescription: 'Modo YOLO de Kimi Code: qué aprueba hoy kimi --yolo, por qué --auto es el bypass total de verdad y cómo usarlo sin destrozar un repo.',
    intro: `Kimi Code tiene un modo YOLO de verdad, y es un solo flag: <code>kimi --yolo</code>. Lo lanzas así y Kimi Code deja de pedir aprobación para las escrituras de ficheros y los comandos rutinarios. Eso sí, ya no es un bypass total: las versiones actuales lo llaman Ask When Needed, y las acciones arriesgadas siguen parando. El modo que no pregunta nada es <code>kimi --auto</code>. A diferencia de opencode, donde la autonomía vive en un fichero de configuración, Moonshot AI fue por el mismo camino que Claude Code y Codex: flags de arranque que bajan o apagan las preguntas.

Ese interruptor es tan útil como peligroso, en la misma proporción que el flag de bypass de cualquier otro agente. Esta guía cubre qué hacen exactamente <code>--yolo</code> y <code>--auto</code>, cómo se relacionan con <code>--plan</code>, un gotcha al reanudar sesiones que pisa en silencio el modo que la sesión tenía guardado, y el camino intermedio que casi nadie usa: pre-aprobar herramientas concretas con reglas de permisos en <code>config.toml</code> en vez de abrirlo todo de golpe.

También cubre lo que importa una vez apagadas las preguntas: cómo mantener vigilada una ejecución en full auto. Kimi Code es un agente de primera clase en CodeAgentSwarm, así que una sesión YOLO corre con diffs en vivo por terminal, notificaciones de escritorio e historial buscable en vez de ser una caja negra.`,
    ctaText: 'Ejecuta kimi --yolo sin ir a ciegas. CodeAgentSwarm corre Kimi Code como agente de primera clase, con diffs en vivo por terminal, notificaciones de escritorio e historial buscable vigilando cada ejecución en full auto.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'modo YOLO'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-10-31',
    alternateSlug: 'kimi-code-yolo-mode',
  },
  sections: [
    {
      id: 'respuesta-corta',
      title: 'La respuesta corta: sí, Kimi Code tiene flag YOLO',
      content: [
        {
          type: 'paragraph',
          text: '"Modo YOLO" es el apodo que la comunidad le puso a ejecutar un agente de código con las aprobaciones desactivadas. Claude Code tiene <code>--dangerously-skip-permissions</code> y Codex tiene <code>--yolo</code> (<code>--dangerously-bypass-approvals-and-sandbox</code>). Kimi Code parte la idea en dos: <code>--yolo</code> aprueba solo el trabajo rutinario pero sigue parando en las acciones arriesgadas, y <code>--auto</code> lo aprueba todo y nunca pregunta. La <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/guides/interaction.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de modos de permiso</a> los llama Ask When Needed y Never Ask.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Full auto: sin preguntas de aprobación\nkimi --yolo\n\n# Forma corta\nkimi -y',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code es el agente de código en terminal de <a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Moonshot AI</a>. Su id de modelo por defecto, <code>kimi-for-coding</code>, sirve ahora K2.8 Preview, y K3.1 Pro está a un <code>/model</code> de distancia (<a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">lista de modelos</a>). Si todavía no lo tienes montado, la guía de <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo usar Kimi Code</a> cubre la instalación y el login. Esta guía asume que ya lo tienes funcionando y quieres saber hasta dónde abrirlo.',
        },
        {
          type: 'paragraph',
          text: 'Existen además dos alias ocultos, <code>--yes</code> y <code>--auto-approve</code>, que hacen lo mismo que <code>--yolo</code>. Están para que los scripts y la memoria muscular de otras herramientas sigan funcionando, pero ojo con lo que hacen hoy: arrancan Ask When Needed, no un bypass total. Si un script antiguo contaba con que <code>--yolo</code> lo aprobaba todo, cámbialo a <code>--auto</code>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Kimi Code publica versiones cada pocos días (la 2.4.1 salió el 30 de octubre de 2026) y ya ha renombrado una vez sus modos de permiso, así que los flags pueden moverse. Si un flag de esta guía no responde como esperas, ejecuta <code>kimi --help</code> y fíate de tu versión instalada antes que de cualquier post, este incluido.',
        },
      ],
    },
    {
      id: 'yolo-auto-plan',
      title: 'YOLO vs auto vs plan: los tres modos de ejecución',
      content: [
        {
          type: 'paragraph',
          text: 'El flag <code>--yolo</code> es uno de los tres interruptores de modo que Kimi Code acepta al arrancar, y conviene saber dónde cae en el espectro:',
        },
        {
          type: 'list',
          items: [
            '<strong>Por defecto (sin flag): Always Ask.</strong> Las acciones de solo lectura van solas; cada edición y cada comando de shell se para a preguntar, y tú apruebas o rechazas cada una.',
            '<strong>--plan.</strong> Modo plan. El agente explora con herramientas de solo lectura y te presenta un plan, y ese plan espera tu revisión en cualquier modo de permisos. Ideal para acotar un cambio antes de dejarle tocar nada.',
            '<strong>--auto: Never Ask.</strong> Se aprueban todas las llamadas a herramientas, incluidos ficheros sensibles y comandos como <code>rm -rf</code>, y el agente nunca te pregunta nada. Solo un plan del modo plan sigue esperando. Este es el bypass total de verdad.',
            '<strong>--yolo: Ask When Needed.</strong> Las ediciones y comandos rutinarios se ejecutan solos, mientras que los ficheros sensibles como <code>.env</code> o las claves SSH, los comandos peligrosos como <code>rm -rf</code> o <code>shutdown</code>, las preguntas y los planes siguen preguntando.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Un flujo sano combina varios. Acota un cambio arriesgado con <code>--plan</code>, haz el trabajo rutinario con <code>--yolo</code>, y guarda <code>--auto</code> para tareas con el radio de daño acotado: una rama de usar y tirar, un repo desechable o un worktree aislado.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'El gotcha al reanudar: los flags de modo pisan la sesión guardada',
          id: 'gotcha-reanudar',
        },
        {
          type: 'paragraph',
          text: 'Las sesiones de Kimi Code recuerdan el modo en el que corrían. Cuando reanudas una con <code>kimi --continue</code> o <code>kimi --session &lt;id&gt;</code>, normalmente vuelve en ese modo guardado. Pero si pasas <code>--yolo</code>, <code>--auto</code> o <code>--plan</code> junto al flag de reanudar, gana el flag y el modo guardado queda pisado.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Esto corta en los dos sentidos. Reanuda una sesión interactiva prudente con un <code>-y</code> olvidado en el historial de tu shell y se convierte en silencio en una sesión YOLO. Reanuda una sesión YOLO con <code>--plan</code> y deja de ejecutar. Revisa qué flags van en el comando cada vez que reanudes, sobre todo si relanzas desde el historial.',
        },
        {
          type: 'paragraph',
          text: 'Reanudar sesiones tiene su propia mecánica (dónde viven en disco, cómo encontrar una antigua, cómo ponerles nombre). La guía del <a href="/es/guias/historial-conversaciones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones de Kimi Code</a> lo cubre entero.',
        },
      ],
    },
    {
      id: 'riesgos-reales',
      title: 'Qué puede hacerle --yolo a tu máquina',
      content: [
        {
          type: 'paragraph',
          text: 'Con las aprobaciones apagadas, Kimi Code corre sobre un repo vivo, con historia de Git real y una shell real. Nada de esto es hipotético; son los modos de fallo estándar de cualquier agente en full auto, y basta una instrucción mal leída:',
        },
        {
          type: 'list',
          items: [
            '<strong>Push a la rama equivocada.</strong> Trabajo a medias commiteado y pusheado a main, o un force-push encima de un compañero.',
            '<strong>Ficheros y directorios borrados.</strong> Un <code>rm -rf</code> sobre una ruta que no era, ejecutado sin ninguna pregunta que lo frene.',
            '<strong>Comandos irreversibles.</strong> Borrados de base de datos, <code>docker system prune</code>, cualquier cosa que no se pueda deshacer una vez corre.',
            '<strong>Dependencias equivocadas.</strong> Un paquete con typosquatting que parecía correcto de un vistazo, instalado e importado antes de que te des cuenta.',
            '<strong>Llamadas de red no buscadas.</strong> Endpoints de producción tocados, webhooks disparados, datos enviados donde no esperabas.',
            '<strong>Trabajo sin commitear sobrescrito.</strong> Tus ficheros a medio cambiar editados por debajo, sin ninguna pregunta de por medio.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Hay un modo de fallo más, específico de las ejecuciones desatendidas: Kimi Code tiene issues abiertas donde una petición limitada por rate limit o un stream parado pueden dejar la sesión colgada en silencio en vez de fallar con error. En una sesión interactiva lo ves. En una sesión YOLO que dejaste sola una hora, un agente colgado parece exactamente un agente trabajando. Es uno de los argumentos más fuertes para ejecutar el full auto en un sitio con visibilidad de verdad.',
        },
      ],
    },
    {
      id: 'reglas-de-permisos',
      title: 'El camino intermedio: reglas de permisos en vez de YOLO total',
      content: [
        {
          type: 'paragraph',
          text: 'La mayor parte del tiempo no quieres que se apruebe todo. Quieres que lo rutinario (editar ficheros, leer, tu runner de tests) pase volando, y que lo peligroso siga parándose. Kimi Code soporta exactamente eso con entradas <code>[[permission.rules]]</code> en su fichero de configuración, <code>~/.kimi-code/config.toml</code>, que pre-aprueban herramientas concretas para que dejen de preguntar, sin tocar nada más.',
        },
        {
          type: 'paragraph',
          text: 'Eso te da una escalera con peldaños en vez de un interruptor binario: Always Ask con unas pocas herramientas pre-aprobadas molesta muchísimo menos que Always Ask a pelo, y es muchísimo más seguro que <code>--auto</code>. La sintaxis exacta de las reglas está en la documentación oficial de Kimi Code, y cambia con sus versiones frecuentes, así que mira la documentación de tu versión instalada en vez de copiar un snippet de un post antiguo.',
        },
        {
          type: 'paragraph',
          text: 'Para un control más fino están los hooks: Kimi Code trae un sistema de hooks completo, configurado como bloques TOML <code>[[hooks]]</code> en el mismo <code>config.toml</code>, con 20 eventos de ciclo de vida. El que importa para la seguridad es <code>PreToolUse</code>: un script de hook que sale con código 2 bloquea la llamada a la herramienta y devuelve su stderr como motivo. Eso te deja escribir tus propias barreras, como bloquear force-pushes o proteger un directorio, que aguantan incluso en <code>--auto</code>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Después de editar config.toml, ejecuta <code>kimi doctor</code>. Valida la configuración y pilla una regla o un hook mal formados antes de que te enteres a mitad de sesión. Otro detalle importante: los errores de hook distintos de exit 2 fallan en abierto, así que un script de barrera que casca no bloquea nada. Prueba tus hooks a propósito.',
        },
        {
          type: 'paragraph',
          text: 'Las instrucciones permanentes van en <code>AGENTS.md</code>, la convención de fichero de instrucciones multi-herramienta que sigue Kimi Code (no lee CLAUDE.md de forma nativa). Las reglas de la casa ahí, tipo "nunca hagas push sin preguntar", llegan a todas las sesiones sin re-escribirlas, aunque a diferencia de un hook PreToolUse son guía para el modelo, no un bloqueo impuesto.',
        },
      ],
    },
    {
      id: 'ejecutar-seguro',
      title: 'Cómo ejecutar kimi --yolo con seguridad',
      content: [
        {
          type: 'paragraph',
          text: 'El patrón que funciona es el mismo que funciona con Claude Code y Codex en full auto: contener el radio de daño, tener un punto de restauración y no perder de vista la ejecución.',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabaja en una rama, nunca en main.</strong> Si la ejecución sale mal, tiras la rama y ya.',
            '<strong>Commitea antes de empezar.</strong> Con el árbol limpio, <code>git checkout .</code> es un deshacer de una línea para todo lo que no sea un push.',
            '<strong>Usa un git worktree para aislar de verdad.</strong> Un worktree separado le da al agente su propia copia del repo, así que ni una ejecución agresiva puede tocar los ficheros que tú estás editando. La guía de <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees para agentes de IA</a> explica el montaje.',
            '<strong>Acota los prompts.</strong> "Migra estos tres ficheros a la API nueva" es una tarea YOLO razonable. "Mejora el código" no lo es.',
            '<strong>Pon hooks PreToolUse en tus líneas rojas.</strong> Force-push, configs de producción, dotfiles: lo que no deba pasar nunca, imponlo con un hook de exit 2 en vez de confiar.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'YOLO vigilado en CodeAgentSwarm',
          id: 'yolo-vigilado',
        },
        {
          type: 'paragraph',
          text: 'Queda el problema de la visibilidad. Una sesión YOLO en una ventana de terminal suelta es una caja negra: te enteras de lo que pasó cuando vuelves y lees el scrollback. CodeAgentSwarm corre Kimi Code como agente de primera clase (junto a Claude Code, Codex CLI, Antigravity CLI, OpenCode, Grok Build, Cursor Agent, Muse Code, Pi, Devin CLI, GitHub Copilot CLI y Cline) y envuelve cada terminal con la supervisión que el full auto necesita:',
        },
        {
          type: 'list',
          items: [
            '<strong>Diffs en vivo por terminal.</strong> Ves qué ficheros está cambiando cada agente de Kimi Code mientras corre, no después.',
            '<strong>Notificaciones de escritorio.</strong> Te avisa cuando un agente termina o se queda parado, lo que además caza el fallo del cuelgue silencioso en vez de dejarle quemar una hora.',
            '<strong>Historial buscable.</strong> Audita qué hizo de verdad una sesión YOLO a posteriori, y reanúdala si se quedó a medias.',
            '<strong>Varios agentes lado a lado.</strong> Un terminal de Kimi Code interactivo y prudente y otro en YOLO sobre una rama desechable, en la misma ventana y de un vistazo.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si lo tuyo va más hacia varios agentes de Kimi Code a la vez y no uno solo muy rápido, eso tiene guía propia: mira <a href="/es/guias/ejecutar-multiples-sesiones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de Kimi Code</a> y el <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes de Kimi Code</a>.',
        },
      ],
    },
    {
      id: 'comparado-con-otros',
      title: 'Cómo se compara el YOLO de Kimi Code con los otros CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'Si usas más de un agente, los flags de bypass se mezclan fácil. Los modelos difieren más que los flags:',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> <code>--dangerously-skip-permissions</code>, más reglas de allow granulares en settings. Lo cubre la <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del modo YOLO de Claude Code</a>.',
            '<strong>Codex CLI:</strong> <code>--yolo</code>, <code>--approve-for-me</code> y modos de aprobación. Explicado en <a href="/es/guias/modo-yolo-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">modo YOLO de Codex</a>.',
            '<strong>opencode:</strong> sin flag; la autonomía va por configuración. Mira <a href="/es/guias/modo-yolo-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">modo YOLO de opencode</a>.',
            '<strong>Kimi Code:</strong> <code>--auto</code> para el bypass total, <code>--yolo</code> / <code>-y</code> para Ask When Needed, reglas de permisos y hooks en config.toml para la versión graduada, y flags de modo que pisan el modo guardado de una sesión al reanudarla.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Kimi Code queda pegado a Claude Code, y no es casualidad: su set de herramientas sigue de cerca a Claude Code, hasta en nombres como <code>Read</code>, <code>Edit</code> y <code>Bash</code>. La consecuencia práctica es que los hábitos se transfieren. Si ya tienes un flujo YOLO seguro con Claude Code, la misma higiene de ramas, el aislamiento con worktrees y la supervisión pasan tal cual a <code>kimi -y</code> y <code>kimi --auto</code>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Tiene Kimi Code modo YOLO?',
      answer: 'Sí. kimi --yolo (forma corta -y) arranca Ask When Needed: las ediciones y comandos rutinarios van sin preguntas, pero los ficheros sensibles, los comandos peligrosos, las preguntas y los planes siguen preguntando. El bypass total es kimi --auto (Never Ask), que aprueba todas las llamadas a herramientas y nunca te pregunta nada. Los alias ocultos --yes y --auto-approve se comportan como --yolo.',
    },
    {
      question: '¿Qué diferencia hay entre kimi --yolo, --auto y --plan?',
      answer: '--plan hace que el agente explore en solo lectura y proponga un plan que siempre espera tu revisión. Sin flag tienes Always Ask, donde las ediciones y los comandos necesitan aprobación. --yolo es Ask When Needed: el trabajo rutinario va solo y las acciones arriesgadas siguen preguntando. --auto es Never Ask: todo se aprueba y el agente nunca pregunta. También puedes pasar estos flags al reanudar una sesión, y el flag pisa el modo que la sesión tenía guardado.',
    },
    {
      question: '¿Es seguro usar kimi --yolo?',
      answer: 'Es tan seguro como el radio de daño que le des. --yolo sigue preguntando antes de comandos peligrosos y ficheros sensibles, y --auto no. En una rama propia o en un git worktree aislado, con un commit limpio detrás, una ejecución acotada es un intercambio razonable. En main, en un repo con trabajo sin commitear o con un prompt abierto, --auto puede hacer push, borrar y sobrescribir sin que nada lo pare. Acótalo, ten un punto de restauración y mira el diff.',
    },
    {
      question: '¿Cómo hago que Kimi Code deje de pedir permiso sin ir a YOLO total?',
      answer: 'Con reglas de permisos. Las entradas [[permission.rules]] en ~/.kimi-code/config.toml pre-aprueban herramientas concretas para que dejen de preguntar mientras el resto sigue pidiendo aprobación. Eso suele quitar casi toda la fricción sin abrir la shell ni las acciones de Git. Ejecuta kimi doctor después de editar la config para validarla.',
    },
    {
      question: '¿Puedo bloquear acciones concretas incluso en modo YOLO?',
      answer: 'Sí, con hooks. Kimi Code soporta bloques TOML [[hooks]] en config.toml sobre 20 eventos de ciclo de vida, y un hook PreToolUse que sale con código 2 bloquea la llamada a la herramienta con tu mensaje de stderr como motivo. Es una barrera real, a diferencia de las instrucciones de AGENTS.md, que el modelo sigue como guía pero que nada obliga a cumplir. Ojo: los scripts de hook que fallan con cualquier otro error dejan pasar la llamada.',
    },
    {
      question: '¿CodeAgentSwarm soporta ejecuciones YOLO de Kimi Code?',
      answer: 'Kimi Code es un agente de primera clase en CodeAgentSwarm, así que puedes correr sesiones YOLO dentro con supervisión alrededor: diffs de ficheros en vivo por terminal, notificaciones de escritorio cuando un agente termina o se queda parado, títulos dinámicos e historial buscable para auditar qué hizo la ejecución. Correr en full auto con visibilidad es justo la gracia.',
    },
  ],
}

export default guide
