import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'nimbalyst-vs-codeagentswarm',
    locale: 'es',
    title: 'Nimbalyst vs CodeAgentSwarm: comparativa honesta (2026)',
    metaTitle: 'Nimbalyst (Crystal) vs CodeAgentSwarm: comparativa honesta',
    metaDescription: 'Nimbalyst, antes Crystal, es un editor visual de lo que producen Claude Code y Codex. CodeAgentSwarm supervisa diez CLI de agentes. Comparativa verificada en 2026.',
    intro: `Nimbalyst, el proyecto que antes se llamaba Crystal, es un espacio de trabajo visual y de código abierto para Claude Code, Codex y otros agentes de programación, pensado para editar lo que producen. CodeAgentSwarm es un espacio de supervisión para diez CLI de agentes, montado alrededor de las terminales y no de los documentos.

CodeAgentSwarm lo hacemos nosotros, así que esta comparativa tiene parte interesada y conviene que la contrastes. También por eso somos generosos donde Nimbalyst lo merece (es código abierto, funciona en Linux, tiene app para iOS y notificaciones de escritorio, y recibió un commit público el mismo día que lo verificamos) y por eso nuestros límites están en la página: código cerrado, Mobile Connect aún en alpha, todavía en beta, y tú pones tus suscripciones de agentes. Cada dato de terceros se verificó el 31 de octubre de 2026 en nimbalyst.com (portada, precios, descargas, página móvil y documentación), el README público de Nimbalyst y los datos públicos de GitHub.

Elige Nimbalyst si lo que te importa es el artefacto: markdown, mockups, diagramas, documentos que quieres editar junto al agente. Elige CodeAgentSwarm si lo que te importa son las sesiones: varias CLI de agentes a la vez y tú necesitando saber qué hace cada una.`,
    ctaText: 'Si quieres supervisar diez CLI de agentes distintas a la vez, con notificaciones, diffs en vivo por terminal y un único historial buscable, descarga CodeAgentSwarm y compáralo con Nimbalyst en tu día a día.',
    ctaAgent: 'comparison',
    highlightedWords: ['Nimbalyst', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'nimbalyst-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Nimbalyst, antes Crystal, es un espacio de trabajo visual y de código abierto para Claude Code, Codex y otros agentes de programación, que te deja revisar y editar el markdown, los mockups y los diagramas junto al agente, mientras que CodeAgentSwarm es un espacio de supervisión para diez CLI de agentes, montado alrededor de las terminales en marcha.',
        },
        {
          type: 'paragraph',
          text: 'Son las dos mitades honestas de un mismo día de trabajo. Para ver el panorama completo, lee <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA</a>, y si lo que te interesa es ver aterrizar los cambios, nuestra guía para <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">ver los cambios de Claude Code en tiempo real</a> cubre nuestra parte.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Aviso: CodeAgentSwarm es nuestro producto. Todos los datos de terceros de esta página se verificaron el 31 de octubre de 2026 en nimbalyst.com, su documentación, el README público de nimbalyst/nimbalyst y los datos públicos de GitHub, incluido el cambio de nombre desde Crystal. Cuando su documentación no menciona algo, decimos que no está documentado en vez de afirmar que no existe.',
        },
      ],
    },
    {
      id: 'what-is-nimbalyst',
      title: 'Qué es Nimbalyst (y su historia como Crystal)',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://nimbalyst.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst</a> presenta ahora dos productos en su web: Nimbalyst Wiki, un plugin gratuito con el que tus agentes escriben una wiki de notas, preguntas abiertas y decisiones (funciona en Claude Code, Codex, Cowork, Cursor, VS Code o cualquier agente MCP, sin necesidad de la app), y la Nimbalyst App, un espacio de trabajo visual para agentes, tareas, documentos, wiki, diagramas y código. Esta página compara la app. Su README describe editores WYSIWYG integrados para markdown, mockups con anotaciones, Mermaid, Excalidraw, CSV, modelos de datos y código con Monaco, donde apruebas los cambios del agente como diffs en rojo y verde, y luego los editas y anotas.',
        },
        {
          type: 'paragraph',
          text: 'Es el proyecto que antes se llamaba Crystal. El repositorio antiguo, <a href="https://github.com/stravu/crystal" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">stravu/crystal</a>, sigue diciendo en su propia descripción que Crystal ahora es Nimbalyst y apunta a nimbalyst.com. Ese repositorio es MIT, tiene unas 3.100 estrellas y su último commit público fue el 26 de febrero de 2026. El desarrollo se movió a <a href="https://github.com/nimbalyst/nimbalyst" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">nimbalyst/nimbalyst</a>, también MIT, con unas 2.000 estrellas a 31 de octubre de 2026, un commit público ese mismo día y una última versión, la v0.82.4, del 27 de octubre. Si te acuerdas de Crystal, parece que el número de estrellas ha bajado: no ha bajado, el proyecto cambió de dirección.',
        },
        {
          type: 'list',
          items: [
            'Código abierto con licencia MIT y builds para macOS (Apple Silicon e Intel), Windows y Linux (.deb y AppImage) según su README',
            'Una app para iOS en la App Store, para iPhone y iPad, con panel de sesiones, respuestas por voz o texto, revisión de diffs deslizando y notificaciones push cuando los agentes te necesitan. Su página móvil dice que Android está previsto',
            'Notificaciones de escritorio cuando termina una sesión, con aviso del sistema cuando Nimbalyst no es la ventana activa y sonidos opcionales al terminar, según su documentación',
            'Gestión de sesiones: ejecutarlas en paralelo, buscarlas y reanudarlas, enlazarlas con los archivos que tocaron y verlas en vista kanban',
            'Seguimiento de tareas que puede editar tanto el agente como tú',
            'Herramientas para desarrollo: gestión del estado de git, mensajes de commit con IA, worktrees y una terminal Ghostty integrada',
            'Un sistema de extensiones con editores enchufables, más soporte de servidores MCP',
          ],
        },
        {
          type: 'paragraph',
          text: 'Su documentación lista Claude Agent (su propio agente de Claude integrado), OpenAI Codex y un proveedor opcional de Claude Code CLI, más proveedores en alpha para OpenCode, GitHub Copilot, Grok Build, Cursor Agent y Gemini a través de Antigravity. La lista más corta de su README sigue nombrando Codex, Claude Code, Opencode (alpha) y Copilot (alpha). Su página de precios dice que la app y tu wiki personal son gratis, sin límites de funciones, y que pones tu propia suscripción de Claude Code o Codex, una clave de API o modelos locales con LM Studio. El plan de pago es Wiki Teams, una wiki compartida para tu equipo, a 20 dólares por usuario al mes o 200 dólares por usuario al año, gratis mientras esté en beta.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Cada terminal es un proceso de agente real, y eliges por terminal entre Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: 'El diseño empieza por la terminal. Tienes notificaciones de escritorio cuando un agente termina o necesita respuesta, historial de conversaciones buscable de los diez agentes con reanudación cuando el agente la admite, diffs de archivos en vivo por terminal, control de permisos con modo Turbo para las operaciones en las que confías, un tablero kanban que los agentes actualizan por MCP, git worktrees por sesión, cambio entre proyectos, mensajes de commit con IA, indicador de cuota del proveedor y marketplaces de skills y de MCP compartidos entre agentes.',
        },
        {
          type: 'paragraph',
          text: 'Y los límites: código cerrado y sin repositorio público, Mobile Connect aún en alpha (beta web para todas las cuentas, acceso nativo para iOS y Android bajo petición y el escritorio debe seguir abierto), todavía en beta con Pro incluido y sin modelos propios, así que el trabajo lo hacen tus suscripciones actuales.',
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
            ['Plataformas', 'Escritorio para macOS (Apple Silicon e Intel), Windows y Linux, más una app para iOS en iPhone y iPad (Android previsto), según su README y su web', 'Escritorio para macOS, Windows y Linux. Mobile Connect en alpha: beta web para todas las cuentas, acceso nativo para iOS y Android bajo petición y el escritorio debe seguir abierto'],
            ['Interfaz', 'App de escritorio construida sobre editores visuales, con kanban de sesiones, terminal integrada y una wiki que escriben tus agentes', 'Espacio de trabajo de escritorio construido sobre terminales de agentes en vivo'],
            ['Agentes soportados', 'Claude Agent, Codex y un Claude Code CLI opcional, más OpenCode, GitHub Copilot, Grok Build, Cursor Agent y Gemini a través de Antigravity en alpha, según su documentación', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI'],
            ['Modelo de aislamiento', 'Sesiones en paralelo, cada una en su propio git worktree, según su README', 'Un proceso separado por terminal, con git worktrees opcionales por sesión'],
            ['Notificaciones', 'Notificaciones de escritorio cuando termina una sesión, sonidos opcionales al terminar y notificaciones push en su app para iOS, según su documentación', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'Búsqueda y reanudación de sesiones, con las sesiones enlazadas a los archivos que tocaron', 'Historial buscable de los diez agentes, con reanudación cuando el agente la admite'],
            ['Gestión de tareas', 'Seguimiento de tareas más una vista kanban de sesiones, editable por ti y por el agente', 'Tablero kanban que los agentes actualizan por MCP'],
            ['Código abierto', 'Sí, MIT, unas 2.000 estrellas en el repositorio actual', 'No, código cerrado y sin repositorio público de la app'],
            ['Precio', 'App y wiki personal gratis. Wiki Teams cuesta 20 dólares por usuario al mes o 200 dólares por usuario al año, gratis durante la beta. Tú pones tu suscripción o clave de API', 'Gratis durante la beta con Pro incluido, y tú pones tus suscripciones de agentes'],
            ['Último commit público (verificado el 31 oct 2026)', '31 de octubre de 2026 en nimbalyst/nimbalyst (última versión v0.82.4, del 27 de octubre); 26 de febrero de 2026 en el antiguo stravu/crystal', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Todos los datos de Nimbalyst y de sus repositorios se verificaron el 31 de octubre de 2026 en nimbalyst.com, su documentación y los datos públicos de GitHub.',
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
            '<strong>Quieres código abierto.</strong> MIT, repositorio público, y además muy activo: hubo un commit público el 31 de octubre de 2026, el mismo día que lo comprobamos, y varias versiones en la última semana de octubre. CodeAgentSwarm es de código cerrado.',
            '<strong>Quieres una app móvil nativa pública hoy.</strong> Su app para iOS, en la App Store para iPhone y iPad, ofrece panel de sesiones, notificaciones push, respuestas por voz o texto y aprobación de diffs deslizando. Mobile Connect de CodeAgentSwarm sigue en alpha: hay beta web, el acceso nativo para iOS y Android es bajo petición y el escritorio debe seguir abierto.',
            '<strong>Hay gente que no programa en el equipo.</strong> Producto y diseño pueden trabajar sobre documentos y mockups en la misma herramienta, y Wiki Teams deja que el equipo lea y edite páginas compartidas en el navegador. Un espacio de terminales no permite eso de verdad.',
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
            '<strong>Usas agentes que Nimbalyst no lista.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI son ciudadanos de primera aquí. Kimi Code, Muse Code, Pi y Devin CLI no aparecen entre los proveedores de la documentación de Nimbalyst a 31 de octubre de 2026, y OpenCode, Copilot, Grok Build, Cursor Agent y Gemini siguen en alpha allí.',
            '<strong>Quieres las terminales, no una capa por encima.</strong> Cada sesión es una CLI real en un panel que puedes leer, desplazar y en el que puedes escribir, algo que importa cuando un agente hace algo inesperado. En Nimbalyst la integración de Claude por defecto es su propio Claude Agent, y el Claude Code CLI tal cual es un proveedor opcional.',
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
      answer: 'Sí, es el mismo proyecto con otro nombre. El repositorio antiguo stravu/crystal dice en su propia descripción que Crystal ahora es Nimbalyst y enlaza a nimbalyst.com. Crystal es MIT, tiene unas 3.100 estrellas y su último commit público fue el 26 de febrero de 2026, mientras que el desarrollo continúa en nimbalyst/nimbalyst, también MIT, con unas 2.000 estrellas y un commit público del 31 de octubre de 2026. Todo esto se verificó el 31 de octubre de 2026.',
    },
    {
      question: '¿Nimbalyst es código abierto?',
      answer: 'Sí. El repositorio nimbalyst/nimbalyst se publica con licencia MIT y tiene unas 2.000 estrellas (2.006 al comprobarlo el 31 de octubre de 2026). Su README aclara que el servidor de sincronización que hay detrás de sus funciones de equipo es un proyecto aparte. CodeAgentSwarm es de código cerrado y no tiene repositorio público de la aplicación, así que si el código abierto es un requisito, ese punto lo gana Nimbalyst.',
    },
    {
      question: '¿Nimbalyst se mantiene activamente?',
      answer: 'Al comprobarlo el 31 de octubre de 2026, el repositorio nimbalyst/nimbalyst tenía un commit público de ese mismo día y su última versión, la v0.82.4, era del 27 de octubre, así que estaba muy activo en el momento de la verificación. El repositorio anterior, stravu/crystal, tuvo su último commit público el 26 de febrero de 2026, algo esperable tras el cambio de nombre. Mira el repositorio por tu cuenta antes de montar un flujo de trabajo sobre cualquier herramienta.',
    },
    {
      question: '¿Nimbalyst soporta Antigravity CLI o Kimi Code?',
      answer: 'Kimi Code no aparece entre los proveedores de la documentación de Nimbalyst a 31 de octubre de 2026. Para Antigravity ofrecen Gemini a través de Antigravity en alpha, que usa el servidor de lenguaje que incluye la app de escritorio de Antigravity de Google y no el Antigravity CLI. Su documentación también lista Claude Agent, Codex y un Claude Code CLI opcional, más OpenCode, GitHub Copilot, Grok Build y Cursor Agent en alpha. CodeAgentSwarm ejecuta Antigravity CLI y Kimi Code de forma directa, junto a otras ocho CLI de agentes.',
    },
  ],
}

export default guide
