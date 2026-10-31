import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'superset-vs-codeagentswarm',
    locale: 'es',
    title: 'Superset (Paradev) vs CodeAgentSwarm: comparativa honesta 2026',
    metaTitle: 'Superset (Paradev) vs CodeAgentSwarm: comparativa honesta 2026',
    metaDescription: 'Superset, ahora Paradev, es un IDE source available para 100+ agentes en paralelo. CodeAgentSwarm supervisa doce agentes CLI. Comparativa honesta.',
    intro: `Superset ahora se llama Paradev. El equipo anunció el nombre nuevo el 12 de octubre de 2026 y dice que solo ha cambiado el nombre: mismo producto, misma cuenta y mismos workspaces. superset.sh redirige ahora a paradev.com, el repositorio de GitHub pasó a ParadevAI/Paradev y el comando de la CLI sigue siendo superset. Mantenemos el nombre antiguo en el título porque es lo que la mayoría sigue buscando, y abajo decimos Paradev cuando describimos el producto tal y como es hoy.

Superset (ahora Paradev) es un IDE de escritorio source available para ejecutar muchos agentes CLI en paralelo, cada tarea en su propio worktree de git, con revisión de código, pull requests, navegador integrado, automatizaciones y app para iPhone. CodeAgentSwarm es una app de escritorio de código cerrado para supervisar doce agentes CLI compatibles, con notificaciones del sistema, historial buscable entre agentes y un tablero kanban que los propios agentes actualizan por MCP.

Transparencia por delante: CodeAgentSwarm lo hacemos nosotros. Por eso esta página dice dónde Paradev es mejor en vez de disimularlo, y por eso nuestras limitaciones (código cerrado, Mobile Connect aún en alpha, todavía en beta) están en la misma tabla que el resto. Todos los datos de terceros se verificaron el 31 de octubre de 2026 en paradev.com, docs.paradev.com y el repositorio público ParadevAI/Paradev, y lo que no pudimos comprobar está marcado como tal. La disponibilidad y los agentes compatibles de CodeAgentSwarm se actualizaron el 5 de octubre de 2026.

Resumen rápido: elige Paradev si quieres un entorno con forma de IDE, código que puedas leer, planes para equipos o una app de iPhone ya. Elige CodeAgentSwarm si necesitas Windows hoy, historial buscable entre agentes y permisos graduados, con Pro incluido gratis durante la beta.`,
    ctaText: 'Las dos se empiezan gratis, así que pruébalas una semana sobre el mismo repositorio. CodeAgentSwarm es gratis durante la beta, con Pro incluido, para macOS, Windows y Linux.',
    ctaAgent: 'comparison',
    highlightedWords: ['Superset', 'Paradev', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'superset-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'La diferencia en una frase',
      content: [
        {
          type: 'paragraph',
          text: 'Superset (ahora Paradev) es un IDE para ejecutar muchos agentes en paralelo aislados en worktrees de git y revisar lo que entregan, mientras que CodeAgentSwarm es un espacio de supervisión para un conjunto cerrado de doce agentes CLI, pensado para que te enteres en cuanto uno de ellos te necesita.',
        },
        {
          type: 'paragraph',
          text: 'Las dos parten de la misma premisa: ir de un agente en un agente desperdicia tu tiempo, y trabajar en paralelo exige aislamiento. Hoy se parecen más que antes: las dos muestran el estado de cada agente, envían notificaciones, leen la cuota de la suscripción y dan a los agentes un tablero de tareas por MCP. Donde siguen sin coincidir es en la forma. Paradev construye un IDE con revisión, navegador integrado, automatizaciones, workspaces remotos y en la nube, y planes para equipos. CodeAgentSwarm construye un espacio de supervisión con historial entre agentes, permisos graduados y un tablero local, y funciona en Windows. Para ver el panorama completo tienes el repaso de <a href="/es/guias/mejores-herramientas-agentes-ia-en-paralelo" class="text-neon-cyan hover:text-neon-purple transition-colors">las mejores herramientas para ejecutar varios agentes de IA en paralelo</a>, y la comparativa hermana de <a href="/es/guias/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code vs CodeAgentSwarm</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Aviso: CodeAgentSwarm es nuestro producto. Todo lo que se afirma aquí sobre Superset (ahora Paradev) se verificó el 31 de octubre de 2026 en su propia web (paradev.com), en su documentación (docs.paradev.com) y en los datos públicos de GitHub del repositorio ParadevAI/Paradev, antes superset-sh/superset. Cuando algo no está documentado públicamente, lo decimos así en lugar de afirmar que Paradev no lo tiene.',
        },
      ],
    },
    {
      id: 'what-is-superset',
      title: 'Qué es Superset (ahora Paradev)',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://paradev.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Paradev</a>, antes Superset, se presenta ahora como "el IDE para agentes en paralelo" y promete escalar a más de 100 agentes a la vez. Su repositorio, <a href="https://github.com/ParadevAI/Paradev" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">ParadevAI/Paradev</a> (la antigua dirección superset-sh/superset redirige ahí), lo describe como "un IDE agéntico para orquestar más de 100 agentes de programación en paralelo". Su README aclara que no es un agente: pones tus propias suscripciones y claves de API, y no hace de intermediario en las llamadas al modelo. Tampoco tiene nada que ver con Apache Superset, la herramienta de business intelligence.',
        },
        {
          type: 'paragraph',
          text: 'La licencia merece precisión, porque es fácil contarla mal. Paradev es source available bajo la Elastic License 2.0, que no es una licencia de código abierto aprobada por la OSI: puedes leer el código, hacer un fork y autoalojarlo para tu equipo, pero no revenderlo como servicio, y no tienes todas las libertades del software libre. Su README dice que la app de escritorio es "gratis para siempre" para ejecutar agentes en tu propia máquina. El 31 de octubre de 2026 el repositorio tenía unas 15.800 estrellas, su último commit público ese mismo día y la versión de escritorio v2.0.2 del 29 de octubre de 2026. Es público desde el 21 de octubre de 2025.',
        },
        {
          type: 'list',
          items: [
            'Un worktree de git, una rama y sus propios terminales por tarea, así el trabajo en paralelo no choca',
            'Un panel Changes para revisar, hacer commit y push, y un panel de pull requests con checks, hilos de revisión y merge',
            'Un navegador integrado que previsualiza el servidor de desarrollo de cada workspace, además de un editor de archivos y un panel de chat',
            'Estado de cada agente en la barra lateral, sonidos al terminar, distintivos en el dock y notificaciones cuando un agente termina o necesita respuesta',
            'Retomar una sesión tras un cierre inesperado o un reinicio, duplicarla con fork o pasar su contexto a otro agente',
            'Una vista Tasks con lista y tablero kanban (Linear, issues de GitHub y tareas propias), y un servidor MCP con herramientas para que los agentes creen y actualicen esas tareas',
            'Medidores de cuota para cuentas de Claude Code, Codex, Grok, Antigravity y OpenCode, y una página de consumo de tokens',
            'Automatizaciones programadas o por evento, máquinas remotas, workspaces en la nube (beta) y app para iPhone y iPad, todo en planes de pago',
            'Una CLI, un SDK de TypeScript y la opción de abrir el trabajo con un clic en Cursor, VS Code o cualquier editor',
          ],
        },
        {
          type: 'paragraph',
          text: 'Su README lista 21 agentes integrados como totalmente soportados: Amp Code, Antigravity CLI, Claude Code, Codex CLI, Cursor Agent, Devin, Droid, fx, Gemini CLI, GitHub Copilot, Grok, Hermes, Kimi Code, Kiro, Mastra Code, Mistral Vibe, Muse Code, Oh My Pi, OpenCode, Pi y Polygraph, y cualquier otro agente CLI funciona como agente personalizado. Su documentación reconoce que la integración no es igual de profunda en todos: algunos informan de su estado, se retoman y muestran consumo, y otros corren como un programa de terminal sin más. La app de escritorio funciona en macOS (Apple Silicon e Intel); para Linux hay un AppImage x64 experimental; Windows está previsto sin fecha. La app de iPhone y iPad está en la App Store y necesita Paradev Pro e iOS 26 o posterior. Android tiene lista de espera.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'Qué es CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una app de escritorio para ejecutar y supervisar varios agentes de programación con IA en paralelo. Funciona en macOS, Windows y Linux, es de código cerrado y es gratis durante la beta con Pro incluido. Nunca te vende acceso a modelos: cada terminal usa una suscripción CLI que ya tienes.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: 'En vez de aceptar cualquier comando de terminal, CodeAgentSwarm integra doce agentes a propósito: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi, Devin CLI, GitHub Copilot CLI y Cline. Ese alcance más estrecho es lo que paga el resto de funciones: notificaciones cuando un agente termina o necesita respuesta, historial buscable de los doce con opción de retomar cuando el proveedor lo permite, diffs en vivo por terminal, permisos con modos Turbo y YOLO, worktrees de git por sesión, marketplaces de skills y de MCP, indicador de cuota, mensajes de commit con IA, cambio rápido entre proyectos y un kanban que los agentes actualizan solos por MCP. Si de momento solo usas un proveedor, la guía para <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> es la versión pequeña de esta idea.',
        },
        {
          type: 'paragraph',
          text: 'Las limitaciones, sin rodeos: código cerrado y sin repositorio público, Mobile Connect aún en alpha (beta web para todas las cuentas, acceso nativo para iOS y Android bajo petición y el escritorio debe seguir abierto), software en beta, hacen falta tus propias suscripciones CLI y no hay botón de PR con un clic. Si necesitas leer el código de la herramienta que gobierna tus agentes, Paradev te deja hacerlo y nosotros no.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Cara a cara',
      content: [
        {
          type: 'paragraph',
          text: 'Una sola regla para esta tabla: contar solo lo que documenta cada fabricante. Un "no documentado" no dice nada sobre si la función existe.',
        },
        {
          type: 'table',
          headers: ['', 'Superset (ahora Paradev)', 'CodeAgentSwarm'],
          rows: [
            ['Plataformas', 'macOS (Apple Silicon e Intel); AppImage x64 experimental para Linux; Windows previsto sin fecha; app para iPhone y iPad (Pro, iOS 26 o posterior); Android en lista de espera', 'macOS, Windows y Linux'],
            ['Instalación y distribución', 'Descarga de escritorio desde paradev.com o las releases de GitHub, más una CLI independiente. Autoalojarlo desde el código está permitido dentro de la Elastic License 2.0', 'Instalador de escritorio para macOS y Windows; .deb y AppImage para Linux'],
            ['Interfaz', 'IDE ("el IDE para agentes en paralelo") con terminales, panel Changes, panel de PR, navegador integrado, editor de archivos y panel de chat, además de abrir en cualquier IDE', 'Workspace multiterminal con kanban, historial y diffs por terminal'],
            ['Agentes soportados', '21 agentes integrados listados como totalmente soportados, entre ellos Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok, Cursor Agent, Muse Code, Pi, Devin, Gemini CLI y GitHub Copilot, más cualquier CLI como agente personalizado. El soporte de estado, retomar y consumo varía según el agente', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi, Devin CLI, GitHub Copilot CLI y Cline, integrados uno a uno'],
            ['Modelo de aislamiento', 'Un worktree de git, una rama y sus terminales por tarea; máquinas remotas y workspaces en la nube (beta) en planes de pago', 'Worktrees de git por sesión, un proceso por terminal'],
            ['Notificaciones', 'Estado en la barra lateral, sonidos al terminar, distintivos en el dock y notificaciones cuando un agente termina o necesita respuesta (el aviso de respuesta depende del agente). Las notificaciones push en el móvil figuran como próximamente', 'Notificaciones de escritorio cuando un agente termina o necesita respuesta'],
            ['Historial de conversaciones', 'Documentan retomar tras un reinicio, fork y pasar la sesión a otro agente. Un historial buscable entre agentes no está documentado en su web a 31 de octubre de 2026', 'Historial buscable de los doce agentes, con opción de retomar cuando el agente la admite'],
            ['Gestión de tareas', 'Vista Tasks con lista y tablero kanban (Linear, issues de GitHub, tareas propias), herramientas de tareas en su servidor MCP alojado y automatizaciones en planes de pago', 'Kanban que los agentes actualizan por MCP. Sin botón de PR con un clic'],
            ['Código abierto', 'No. Source available (Elastic License 2.0), que no está aprobada por la OSI', 'No. Código cerrado, sin repositorio público'],
            ['Precio', 'Free: 0 $ para 1 usuario con workspaces locales, app de escritorio y CLI. Pro 20 $ por usuario y mes (16 $ con pago anual), Team 60 $ (54 $ anual), Ultra 200 $, Enterprise a medida', 'Gratis durante la beta con Pro incluido. Pones tus suscripciones CLI'],
            ['Actividad del repo público (verificado el 31 oct 2026)', 'ParadevAI/Paradev: último commit el 31 de octubre de 2026, unas 15.800 estrellas, público desde el 21 de octubre de 2025', 'Código cerrado, sin repositorio público'],
          ],
          caption: 'Datos de producto, precios y GitHub verificados el 31 de octubre de 2026 en paradev.com, docs.paradev.com y github.com/ParadevAI/Paradev.',
        },
      ],
    },
    {
      id: 'when-superset',
      title: 'Cuándo Superset (ahora Paradev) es mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'En varios de estos casos te mandaríamos a Paradev sin pensarlo dos veces.',
        },
        {
          type: 'list',
          items: [
            '<strong>Quieres un IDE, no una rejilla de terminales.</strong> Paradev junta terminales, revisión de diffs, un panel de PR con checks y merge, un navegador integrado y un editor de archivos en la misma ventana. Si quieres revisar, previsualizar y entregar lo que escriben tus agentes sin salir de la app, encaja mejor que la nuestra.',
            '<strong>Quieres ejecutar cualquier agente CLI, no una lista cerrada.</strong> Paradev lista 21 agentes integrados y acepta cualquier otro agente de terminal como personalizado. Nosotros integramos doce agentes CLI: mejor para esos doce, peor para el resto.',
            '<strong>Quieres leer el código.</strong> La Elastic License 2.0 no es código abierto, pero source available gana a un binario cerrado si necesitas auditar el comportamiento o autoalojarlo dentro de sus términos.',
            '<strong>Quieres automatizaciones y máquinas remotas o en la nube.</strong> Las automatizaciones programadas o por evento, las máquinas remotas y los workspaces en la nube apuntan a flujos desatendidos que CodeAgentSwarm no documenta. Necesitan un plan de pago.',
            '<strong>Trabajas en equipo o necesitas app de iPhone ya.</strong> Los planes Team y Enterprise, el SSO, los registros de auditoría y el informe SOC 2 Type II están en su página de precios, y la app de iPhone y iPad ya está en la App Store.',
            '<strong>Quieres muchísimos agentes a la vez.</strong> Más de 100 agentes en paralelo es su objetivo de diseño declarado, y llevan publicando contra él desde octubre de 2025.',
          ],
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'Cuándo CodeAgentSwarm es mejor opción',
      content: [
        {
          type: 'paragraph',
          text: 'Nuestras ventajas vienen del alcance estrecho: doce agentes integrados uno a uno y un workspace diseñado alrededor del momento en que un agente se para y te espera. Algunas cosas que antes poníamos aquí, como las notificaciones, la cuota o un tablero que actualizan los agentes, Paradev ya las documenta también, así que ya no las contamos como diferencias.',
        },
        {
          type: 'list',
          items: [
            '<strong>Necesitas Windows hoy.</strong> Paradev indica que Windows está previsto sin fecha. CodeAgentSwarm sí publica una app de escritorio para Windows.',
            '<strong>Quieres un único historial buscable.</strong> Las conversaciones de los doce agentes se guardan y se buscan en el mismo sitio, en vez de vivir en doce formatos distintos, y se retoman cuando el agente lo permite. Paradev documenta retomar, fork y pasar la sesión a otro agente, pero no un historial buscable entre agentes.',
            '<strong>Quieres que el tablero se quede en tu máquina.</strong> Nuestro kanban se expone con un servidor MCP local, así que los agentes mueven sus propias tareas mientras trabajan. Las herramientas de tareas de Paradev corren en su servidor MCP alojado, ligadas a tu organización.',
            '<strong>Quieres permisos graduados con diffs en vivo.</strong> Los diffs por terminal muestran en tiempo real qué toca cada agente, y el modo Turbo aprueba solo lo seguro mientras lo arriesgado sigue parándose a preguntar. Los comandos por defecto de Paradev para Claude Code y Codex desactivan las confirmaciones, algo que puedes cambiar en sus ajustes.',
            '<strong>Quieres las funciones de pago sin un plan por usuario, de momento.</strong> CodeAgentSwarm es gratis durante la beta con Pro incluido. En Paradev, el acceso remoto, las automatizaciones y el móvil empiezan en 16 $ por usuario y mes con pago anual.',
          ],
        },
      ],
    },
    {
      id: 'use-both',
      title: '¿Se pueden usar las dos?',
      content: [
        {
          type: 'paragraph',
          text: 'Son aplicaciones independientes, sin integración ni estado compartido, así que "usar las dos" significa ejecutar las dos, no combinarlas. Y es razonable: Paradev tiene plan gratuito y CodeAgentSwarm es gratis durante la beta, así que probarlas te cuesta tiempo, no dinero.',
        },
        {
          type: 'paragraph',
          text: 'Pruébalas sobre el mismo repositorio y en la misma semana. Las dos aíslan a los agentes en worktrees de git, así que ninguna tiene que tocar tu copia principal. Después de unas cuantas tareas reales vas a saber qué fricción te molestó más: revisar y entregar el código, o seguir la pista de qué agente te necesita ahora.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Superset es gratis y de código abierto?',
      answer: 'Superset ahora se llama Paradev. Tiene un plan gratuito de 0 $ para un usuario, con workspaces locales, app de escritorio y CLI. Los planes de pago empiezan en 20 $ por usuario y mes (16 $ con pago anual) para Pro, que añade acceso remoto, automatizaciones y la app móvil. Sobre la licencia, la respuesta precisa es que Paradev es source available bajo la Elastic License 2.0, que no está aprobada por la OSI: puedes inspeccionar el código, hacer un fork y autoalojarlo para tu equipo, pero no es open source en sentido estricto. CodeAgentSwarm es gratis durante la beta con Pro incluido, y es de código cerrado y sin repositorio público.',
    },
    {
      question: '¿Superset soporta Antigravity CLI, Kimi Code o Grok?',
      answer: 'Sí. El README de Paradev (antes Superset) muestra Antigravity CLI, Kimi Code y Grok como totalmente soportados, junto a Claude Code, Codex CLI, Cursor Agent, OpenCode y otros. Su documentación indica que Antigravity no informa del estado "necesita respuesta" y que Kimi Code no tiene ahí historial de consumo ni medidor de cuota. CodeAgentSwarm también integra los tres.',
    },
    {
      question: '¿Cuál se mantiene de forma más activa?',
      answer: 'Las dos están activas y esta fila no la gana nadie. El 31 de octubre de 2026 el repositorio público ParadevAI/Paradev (antes superset-sh/superset) tenía su último commit ese mismo día, unas 15.800 estrellas, la versión de escritorio v2.0.2 del 29 de octubre de 2026 y un historial público desde el 21 de octubre de 2025. CodeAgentSwarm es de código cerrado, así que no hay historial que consultar: nuestro ritmo te lo tienes que creer.',
    },
    {
      question: '¿Puedo probar las dos gratis?',
      answer: 'Sí. Paradev, antes Superset, ofrece un plan gratuito y una descarga de escritorio desde paradev.com, y CodeAgentSwarm es gratis durante la beta con Pro incluido en macOS, Windows y Linux. Ninguna revende acceso a modelos, así que en los dos casos sigues usando las suscripciones CLI que ya pagas, y compararlas solo te cuesta tiempo.',
    },
  ],
}

export default guide
