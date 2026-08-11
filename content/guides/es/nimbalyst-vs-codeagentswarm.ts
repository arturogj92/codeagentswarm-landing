import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'nimbalyst-vs-codeagentswarm',
    locale: 'es',
    title: 'Nimbalyst vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'Nimbalyst (antes Crystal) vs CodeAgentSwarm: comparativa honesta (2026)',
    metaDescription: 'Nimbalyst, antes Crystal, es un editor visual de lo que producen Claude Code y Codex. CodeAgentSwarm supervisa seis CLI de agentes. Comparativa verificada en 2026.',
    intro: `Nimbalyst, el proyecto que antes se llamaba Crystal, es un editor visual de lo que producen Claude Code y Codex. CodeAgentSwarm es un espacio de supervisión para seis CLI de agentes, montado alrededor de las terminales y no de los documentos.

CodeAgentSwarm lo hacemos nosotros, así que esta comparativa tiene parte interesada y conviene que la contrastes. También por eso somos generosos donde Nimbalyst lo merece (es código abierto, funciona en Linux, tiene app móvil y el día que lo verificamos estaba recibiendo commits) y por eso nuestros límites están en la página: código cerrado, solo macOS y Windows, sin app móvil, todavía en beta, y tú pones tus suscripciones de agentes. Cada dato de terceros se verificó el 26 de julio de 2026 en nimbalyst.com, el README público de Nimbalyst y los datos públicos de GitHub.

Elige Nimbalyst si lo que te importa es el artefacto: markdown, mockups, diagramas, documentos que quieres editar junto al agente. Elige CodeAgentSwarm si lo que te importa son las sesiones: varias CLI de agentes a la vez y tú necesitando saber qué hace cada una.`,
    ctaText: 'Si quieres supervisar seis CLI de agentes distintas a la vez, con notificaciones, diffs en vivo por terminal y un único historial buscable, descarga CodeAgentSwarm y compáralo con Nimbalyst en tu día a día.',
    ctaAgent: 'comparison',
    highlightedWords: ['Nimbalyst', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-11',
    alternateSlug: 'nimbalyst-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Nimbalyst, antes Crystal, es un editor visual de lo que producen Claude Code y Codex, que te deja revisar y editar el markdown, los mockups y los diagramas junto al agente, mientras que CodeAgentSwarm es un espacio de supervisión para seis CLI de agentes, montado alrededor de las terminales en marcha.',
        },
        {
          type: 'paragraph',
          text: 'Son las dos mitades honestas de un mismo día de trabajo. Para ver el panorama completo, lee <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA</a>, y si lo que te interesa es ver aterrizar los cambios, nuestra guía para <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">ver los cambios de Claude Code en tiempo real</a> cubre nuestra parte.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Aviso: CodeAgentSwarm es nuestro producto. Todos los datos de terceros de esta página se verificaron el 26 de julio de 2026 en nimbalyst.com, el README público de nimbalyst/nimbalyst y los datos públicos de GitHub, incluido el cambio de nombre desde Crystal. Cuando su documentación no menciona algo, decimos que no está documentado en vez de afirmar que no existe.',
        },
      ],
    },
    {
      id: 'what-is-nimbalyst',
      title: 'Qué es Nimbalyst (y su historia como Crystal)',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://nimbalyst.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst</a> se presenta como el editor visual para Claude Code y Codex: ejecutar sesiones en paralelo, revisar los diffs de la IA y editar markdown, mockups, diagramas y código. Su README describe editores WYSIWYG integrados para markdown, mockups con anotaciones, Mermaid, Excalidraw, CSV, modelos de datos y código con Monaco, donde apruebas los cambios del agente como diffs en rojo y verde, y luego los editas y anotas.',
        },
        {
          type: 'paragraph',
          text: 'Es el proyecto que antes se llamaba Crystal. El repositorio antiguo, <a href="https://github.com/stravu/crystal" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">stravu/crystal</a>, sigue diciendo en su propia descripción que Crystal ahora es Nimbalyst y apunta a nimbalyst.com. Ese repositorio es MIT, tiene unas 3.100 estrellas (3.106) y su último commit público fue el 26 de febrero de 2026. El desarrollo se movió a <a href="https://github.com/nimbalyst/nimbalyst" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">nimbalyst/nimbalyst</a>, también MIT, con unas 1.300 estrellas (1.327) y un commit público del 26 de julio de 2026, el mismo día en que verificamos esta página. Si te acuerdas de Crystal, parece que el número de estrellas ha bajado: no ha bajado, el proyecto cambió de dirección.',
        },
        {
          type: 'list',
          items: [
            'Código abierto con licencia MIT y builds para macOS (Apple Silicon e Intel), Windows y Linux según su README',
            'Una app móvil con panel de sesiones, respuestas por voz o texto, revisión de diffs deslizando y notificaciones push cuando los agentes te necesitan',
            'Gestión de sesiones: ejecutarlas en paralelo, buscarlas y reanudarlas, enlazarlas con los archivos que tocaron y verlas en vista kanban',
            'Seguimiento de tareas que puede editar tanto el agente como tú',
            'Herramientas para desarrollo: gestión del estado de git, mensajes de commit con IA, worktrees y una terminal integrada',
            'Un sistema de extensiones con editores enchufables, y secciones de Teams y Pricing en su web',
          ],
        },
        {
          type: 'paragraph',
          text: 'Sus agentes de programación soportados, según su README, son Codex, Claude Code, Opencode (alpha) y Copilot (alpha). Su web dice que la app de escritorio es gratis para uso individual y funciona con tu suscripción o clave de API de Claude Code o Codex. Su navegación también incluye secciones de Teams y Pricing, así que existe un plan de pago para equipos; no damos cifras porque no verificamos ninguna.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Cada terminal es un proceso de agente real, y eliges por terminal entre Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build.',
        },
        {
          type: 'image',
          alt: 'Una terminal de CodeAgentSwarm mostrando el título de lo que está haciendo el agente y la lista de archivos que ha cambiado',
          src: '/images/guides/terminal-title-and-changes.png',
          caption: 'Cada terminal cuenta en qué está trabajando y muestra los archivos que ha cambiado esa sesión, así puedes supervisar varios agentes sin abrir todos los diffs.',
        },
        {
          type: 'paragraph',
          text: 'El diseño empieza por la terminal. Tienes notificaciones de escritorio cuando un agente termina o necesita respuesta, historial de conversaciones buscable de los seis agentes con reanudación, diffs de archivos en vivo por terminal, control de permisos con modo Turbo para las operaciones en las que confías, un tablero kanban que los agentes actualizan por MCP, git worktrees por sesión, cambio entre proyectos, mensajes de commit con IA, indicador de cuota del proveedor y marketplaces de skills y de MCP compartidos entre agentes.',
        },
        {
          type: 'paragraph',
          text: 'Y los límites: código cerrado y sin repositorio público, solo macOS y Windows (nada de Linux), sin app móvil, todavía en beta y gratis con Pro incluido durante ese periodo, y sin modelos propios, así que el trabajo lo hacen tus suscripciones actuales.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'table',
          headers: ['', 'Nimbalyst (antes Crystal)', 'CodeAgentSwarm'],
          rows: [
            ['Plataformas', 'macOS (Apple Silicon e Intel), Windows y Linux, más una app móvil, según su README', 'macOS y Windows, sin Linux y sin app móvil'],
            ['Interfaz', 'App de escritorio construida sobre editores visuales, con kanban de sesiones y terminal integrada', 'Espacio de trabajo de escritorio construido sobre terminales de agentes en vivo'],
            ['Agentes soportados', 'Codex, Claude Code, Opencode (alpha) y Copilot (alpha), según su README', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build'],
            ['Modelo de aislamiento', 'Sesiones en paralelo con soporte de git worktrees, según su README', 'Un proceso separado por terminal, con git worktrees opcionales por sesión'],
            ['Notificaciones', 'Notificaciones push en su app móvil, según su README. Las notificaciones de escritorio no están documentadas en su web a 26 de julio de 2026', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'Búsqueda y reanudación de sesiones, con las sesiones enlazadas a los archivos que tocaron', 'Historial buscable de los seis agentes, con reanudación'],
            ['Gestión de tareas', 'Seguimiento de tareas más una vista kanban de sesiones, editable por ti y por el agente', 'Tablero kanban que los agentes actualizan por MCP'],
            ['Código abierto', 'Sí, MIT, unas 1.300 estrellas en el repositorio actual', 'No, código cerrado y sin repositorio público de la app'],
            ['Precio', 'Gratis para uso individual según su web; existe un plan de pago para equipos según la navegación de su web (no verificamos ninguna cifra)', 'Gratis durante la beta con Pro incluido, y tú pones tus suscripciones de agentes'],
            ['Último commit público (verificado el 26 jul 2026)', '26 de julio de 2026 en nimbalyst/nimbalyst; 26 de febrero de 2026 en el antiguo stravu/crystal', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Verificado el 26 de julio de 2026 en nimbalyst.com, el README público de Nimbalyst y los datos de GitHub de ambos repositorios.',
        },
      ],
    },
    {
      id: 'when-nimbalyst',
      title: 'Cuándo Nimbalyst es mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'Nimbalyst gana varias de estas de calle, y si alguna es tu caso deberías usarlo a él y no a nosotros.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres editar visualmente lo que produce el agente.</strong> Markdown, mockups con anotaciones, Mermaid, Excalidraw, CSV y modelos de datos en editores WYSIWYG, aprobando los cambios como diffs en rojo y verde. Nosotros no tenemos nada equivalente.',
            '<strong>Quieres código abierto.</strong> MIT, repositorio público, y además activo: hubo un commit público el 26 de julio de 2026, el día que lo verificamos. CodeAgentSwarm es de código cerrado.',
            '<strong>Estás en Linux.</strong> Ellos publican build de Linux. Nosotros no.',
            '<strong>Quieres el móvil dentro del bucle.</strong> Su app móvil ofrece panel de sesiones, notificaciones push, respuestas por voz o texto y aprobación de diffs deslizando. Nosotros no tenemos app móvil.',
            '<strong>Hay gente que no programa en el equipo.</strong> Producto y diseño pueden trabajar sobre documentos y mockups en la misma herramienta, algo que un espacio de terminales no permite de verdad.',
            '<strong>Quieres extender la herramienta.</strong> Su sistema de extensiones te deja construir editores a medida para tus propios tipos de archivo.',
          ],
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'Cuándo CodeAgentSwarm es mejor opción',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Usas más de dos proveedores de agentes.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code y Grok Build son ciudadanos de primera aquí. Antigravity CLI, Kimi Code y Grok Build no aparecen entre los agentes soportados del README de Nimbalyst a 26 de julio de 2026.',
            '<strong>Quieres las terminales, no una capa por encima.</strong> Cada sesión es una CLI real en un panel que puedes leer, desplazar y en el que puedes escribir, algo que importa cuando un agente hace algo inesperado.',
            '<strong>Quieres notificaciones de escritorio sin coger el móvil.</strong> Las nuestras saltan en la misma máquina en la que estás trabajando.',
            '<strong>Quieres un solo historial de todos los proveedores.</strong> Buscas una frase y encuentras la sesión, la haya ejecutado el agente que la haya ejecutado, y la reanudas ahí mismo.',
            '<strong>Quieres control de permisos con grano fino.</strong> El modo Turbo aprueba automáticamente lo que tú confías y deja el resto bajo revisión, en vez de aprobarlo todo o nada.',
            '<strong>Te chocas una y otra vez con los límites del plan.</strong> El indicador de cuota del proveedor te dice cuánto te queda antes de que un agente se pare a medias.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Una forma directa de elegir: si tu día es sobre todo editar los artefactos que rodean al código, Nimbalyst está hecho para eso. Si tu día es sobre todo mantener en marcha varias sesiones de agentes, para eso hicimos lo nuestro.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Usar los dos',
      content: [
        {
          type: 'paragraph',
          text: 'Los dos son apps de escritorio que trabajan sobre los mismos repositorios y los dos soportan git worktrees, así que tenerlos abiertos a la vez es sencillo. Un reparto práctico: CodeAgentSwarm para las sesiones de agentes en paralelo y la supervisión alrededor, y Nimbalyst cuando quieres sentarte con un documento, un mockup o un diagrama e iterarlo visualmente.',
        },
        {
          type: 'paragraph',
          text: '¿Sigues comparando? La <a href="/es/guias/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">comparativa con Claude Squad</a> cubre el enfoque de solo terminal y la <a href="/es/guias/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">comparativa con Vibe Kanban</a> cubre el de kanban primero.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Nimbalyst es lo mismo que Crystal?',
      answer: 'Sí, es el mismo proyecto con otro nombre. El repositorio antiguo stravu/crystal dice en su propia descripción que Crystal ahora es Nimbalyst y enlaza a nimbalyst.com. Crystal es MIT, tiene unas 3.100 estrellas y su último commit público fue el 26 de febrero de 2026, mientras que el desarrollo continúa en nimbalyst/nimbalyst, también MIT, con unas 1.300 estrellas y un commit público del 26 de julio de 2026. Todo verificado el 26 de julio de 2026.',
    },
    {
      question: '¿Nimbalyst es código abierto?',
      answer: 'Sí. El repositorio nimbalyst/nimbalyst se publica con licencia MIT y tiene unas 1.300 estrellas (1.327 al verificarlo el 26 de julio de 2026). Su README aclara que el servidor de sincronización que hay detrás de sus funciones de equipo es un proyecto aparte. CodeAgentSwarm es de código cerrado y no tiene repositorio público de la aplicación, así que si el código abierto es un requisito, ese punto lo gana Nimbalyst.',
    },
    {
      question: '¿Nimbalyst se mantiene activamente?',
      answer: 'El 26 de julio de 2026, el día que lo comprobamos, el repositorio nimbalyst/nimbalyst tenía un commit público de ese mismo día, así que estaba activo en el momento de la verificación. El repositorio anterior, stravu/crystal, tuvo su último commit público el 26 de febrero de 2026, algo esperable tras el cambio de nombre. Como siempre, mira el repositorio por tu cuenta antes de montar un flujo de trabajo sobre cualquier herramienta.',
    },
    {
      question: '¿Nimbalyst soporta Antigravity CLI o Kimi Code?',
      answer: 'Ninguno aparece entre los agentes de programación soportados en el README de Nimbalyst a 26 de julio de 2026, que menciona Codex, Claude Code, Opencode (alpha) y Copilot (alpha). CodeAgentSwarm soporta Antigravity CLI y Kimi Code de forma directa, junto a Claude Code, Codex CLI y OpenCode, que es la principal diferencia de amplitud entre las dos herramientas.',
    },
  ],
}

export default guide
