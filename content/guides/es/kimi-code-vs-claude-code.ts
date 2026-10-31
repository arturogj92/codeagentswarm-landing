import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-vs-claude-code',
    locale: 'es',
    title: 'Kimi Code vs Claude Code: ¿qué agente de terminal te conviene?',
    metaTitle: 'Kimi Code vs Claude Code: comparativa honesta (2026)',
    metaDescription: 'Kimi Code vs Claude Code: modelo, precios, configuración, hooks, MCP y madurez. Dónde gana cada uno, qué se aprovecha del otro y por qué quizá quieras los dos.',
    intro: `Kimi Code es el agente de programación en terminal de Moonshot AI, y es el competidor más directo de Claude Code que ha salido hasta ahora. Y no en plan vago de "otro CLI con IA": Kimi Code clona los nombres de las herramientas de Claude Code tal cual (Bash, Write, Edit, Read, incluso el prefijo mcp__ para las herramientas MCP), puede importar tus skills de Claude Code en un paso y acepta el mismo .mcp.json a nivel de proyecto. Si sabes usar Claude Code, ya sabes usar casi todo Kimi Code.

Las diferencias existen, eso sí, y cortan en ambas direcciones. El id de modelo por defecto de Kimi Code sirve ahora K2.8 Preview con hasta 1M de contexto, y el insignia más reciente de Moonshot, K3.1 Pro, está a un comando. Claude Code ejecuta los modelos Claude de Anthropic con un arnés mucho más maduro. Una herramienta lleva años de rodaje en producción; la otra saltó de la 0.43 a la 2.0 en septiembre de 2026 y sigue cambiando deprisa.

En esta comparativa repaso qué hace mejor cada uno, qué se transfiere entre ellos y la configuración a la que mucha gente acaba llegando: no elegir, y ejecutar los dos a la vez.`,
    ctaText: 'La forma más rápida de zanjar el Kimi Code vs Claude Code es ejecutar los dos a la vez. CodeAgentSwarm le da a cada agente su propio terminal, con diffs en vivo, notificaciones de escritorio e historial buscable en todas las sesiones.',
    ctaAgent: 'multi',
    highlightedWords: ['Kimi Code', 'Claude Code'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-10-31',
    alternateSlug: 'kimi-code-vs-claude-code',
  },
  sections: [
    {
      id: 'panorama',
      title: 'Dos agentes de terminal, un linaje evidente',
      content: [
        {
          type: 'paragraph',
          text: '<strong><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a></strong> es el CLI agéntico de Anthropic. Se ejecuta en tu terminal, lee tu repositorio, edita archivos, lanza comandos e itera hasta terminar la tarea. Lleva tiempo siendo la referencia entre los agentes de terminal, con un ecosistema profundo de hooks, servidores MCP, skills y conocimiento de comunidad.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a></strong> es la respuesta de Moonshot AI. Misma forma: un agente TUI que arrancas con el comando <code>kimi</code> dentro de un proyecto, y que luego planifica, edita, ejecuta y repite. Es open source (MIT, TypeScript), se mueve rápido, y su id de modelo por defecto, <code>kimi-for-coding</code>, sirve ahora K2.8 Preview, con K3.1 Pro disponible desde <code>/model</code>.',
        },
        {
          type: 'paragraph',
          text: 'El linaje no es nada sutil. Las herramientas internas de Kimi Code llevan exactamente los mismos nombres que las de Claude Code: <code>Bash</code>, <code>Write</code>, <code>Edit</code>, <code>Read</code>, y las herramientas MCP aparecen como <code>mcp__servidor__herramienta</code>, idéntico al naming de Claude. Para ti eso son buenas noticias: los flujos de trabajo, el modelo mental e incluso algunos archivos de configuración se transfieren entre los dos casi sin fricción.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'No confundas Kimi Code con kimi-cli. Moonshot tiene dos CLIs: kimi-cli es el agente antiguo en Python, ya archivado y sin mantenimiento, y Kimi Code es el actual en TypeScript. Los dos instalan un binario llamado kimi. Ejecuta kimi --version para comprobarlo: 2.x significa que tienes el Kimi Code actual (saltó de la 0.43 a la 2.0.0 en septiembre de 2026), 1.x significa que estás en la herramienta antigua en Python. Nuestra <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de instalación de Kimi Code</a> explica cómo no instalar la equivocada.',
        },
      ],
    },
    {
      id: 'kimi-code',
      title: 'Kimi Code',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Qué es',
          id: 'kimi-code-que-es',
        },
        {
          type: 'paragraph',
          text: 'El id de modelo por defecto de Kimi Code, <code>kimi-for-coding</code>, sirve K2.8 Preview desde el 11 de septiembre de 2026, en lugar de K2.7 Code. Ofrece esfuerzo de razonamiento low, high y max y hasta 1M tokens de contexto en todos los planes. Desde Plus puedes cambiar con <code>/model</code> a K3.1 Pro, el insignia más reciente de Moonshot desde el 23 de octubre de 2026, o a K3; su ventana de 1M necesita Pro o superior. La <a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">lista oficial de modelos</a> tiene los ids y límites actuales.',
        },
        {
          type: 'paragraph',
          text: 'Se instala con un script de una línea o con <code>npm install -g @moonshot-ai/kimi-code</code>, inicias sesión con OAuth o con una API key, y ejecutas <code>kimi</code> en tu proyecto. Las sesiones se guardan como archivos JSONL planos en disco, organizadas por proyecto, y <code>kimi --continue</code> retoma la última sesión del directorio actual.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Puntos fuertes',
          id: 'kimi-code-fuertes',
        },
        {
          type: 'list',
          items: [
            '<strong>Una opción de pago por token</strong>: Moonshot publica las tarifas por token de sus modelos K3 en su <a href="https://platform.kimi.ai/docs/pricing/chat" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de precios</a>, con caché de contexto automática',
            '<strong>Hasta 1M de contexto</strong> con el modelo por defecto en todos los planes, y con K3.1 Pro a partir del plan Pro',
            '<strong>Familiar por diseño</strong>: nombres de herramientas al estilo Claude, soporte del .mcp.json de proyecto y un skill integrado, <code>/import-from-cc-codex</code>, que copia a Kimi Code las instrucciones, skills y ajustes MCP de Claude Code y Codex',
            '<strong>Más superficie de hooks que Claude Code</strong>: 16 eventos de ciclo de vida configurados en TOML, validables con kimi doctor',
            '<strong>Open source y en movimiento constante</strong>: licencia MIT, repo público y versiones nuevas cada pocos días',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde flojea',
          id: 'kimi-code-flojea',
        },
        {
          type: 'list',
          items: [
            '<strong>Madurez</strong>: se mueve muy rápido y se nota. Pasó de la 0.43 a la 2.0 en septiembre de 2026 y renombró sus modos de permiso por el camino. Hay usuarios que reportan sesiones que se cuelgan en silencio tras un rate limit o un stream parado, algo doloroso cuando no estás mirando el terminal',
            '<strong>Windows está verde</strong>: exige Git for Windows como shell y hay un issue abierto conocido en el que la TUI imprime códigos ANSI en crudo en algunos terminales de Windows. En <a href="/es/guias/kimi-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code en Windows</a> están los rodeos',
            '<strong>Sin subagentes personalizados</strong>: tienes tres integrados (coder, explore, plan) y nada más',
            '<strong>K3.1 Pro razona siempre</strong>: puedes bajar el esfuerzo a low o high, pero las peticiones con el razonamiento apagado se rechazan',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Precios',
          id: 'kimi-code-precios',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code funciona con una membresía Kimi de pago o con una API key facturada por token. En los planes que Moonshot lanzó en octubre de 2026, Kimi Code necesita Plus o superior (Go no tiene cupo de programación), y los miembros nuevos ya no tienen cupo semanal: se aplican una ventana móvil de 5 horas y el total mensual de la membresía. Los precios están en la página de planes de Kimi y las reglas en la <a href="https://www.kimi.com/code/docs/en/kimi-code/membership.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de membresía</a>. El desglose con fecha está en <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">planes y precios de Kimi Code</a>.',
        },
      ],
    },
    {
      id: 'claude-code',
      title: 'Claude Code',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Qué es',
          id: 'claude-code-que-es',
        },
        {
          type: 'paragraph',
          text: 'Claude Code es la herramienta de programación agéntica de Anthropic, con los modelos Claude debajo (Opus 5.5, Sonnet 5.5 y Haiku 5.5 en la API de Anthropic, más Fable donde está disponible). Estableció la mayoría de las convenciones que ahora sigue Kimi Code: instrucciones en lenguaje natural en un terminal, ediciones autónomas de varios ficheros, ejecución de comandos, integraciones MCP y un sistema de permisos que te mantiene al tanto.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Puntos fuertes',
          id: 'claude-code-fuertes',
        },
        {
          type: 'list',
          items: [
            '<strong>Madurez</strong>: años de uso en producción, releases estables y comportamiento predecible bajo carga. Cuando algo se rompe, alguien ya ha escrito sobre ello',
            '<strong>Los modelos Claude</strong>: Opus y Fable para razonamiento duro, Sonnet y Haiku para velocidad, con control de esfuerzo para que las tareas simples no se pasen de pensar',
            '<strong>Profundidad de ecosistema</strong>: hooks, skills, subagentes (incluidos los totalmente personalizados), MCP y una biblioteca enorme de configuraciones y guías de la comunidad',
            '<strong>Multiplataforma</strong>: soporte nativo sólido en macOS, Linux y <a href="/es/guias/claude-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Windows</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dónde flojea',
          id: 'claude-code-flojea',
        },
        {
          type: 'list',
          items: [
            '<strong>Precio por token de API</strong>: compara las páginas oficiales de precios de Anthropic y Moonshot para los modelos que de verdad vayas a usar; el valor de la suscripción depende de tu carga real',
            '<strong>Un solo proveedor</strong>: ejecuta modelos Claude. Si quieres probar otro modelo frontera, necesitas otro arnés (o el truco del endpoint de más abajo)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Precios',
          id: 'claude-code-precios',
        },
        {
          type: 'paragraph',
          text: 'Claude Code viene con Claude Pro (20 $/mes, o 17 $/mes con pago anual), Max (100 $/mes) o Ultra (200 $/mes), o con pago por uso a través de la API de Anthropic. Mira la <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de precios de Anthropic</a> para los límites actuales.',
        },
      ],
    },
    {
      id: 'cara-a-cara',
      title: 'Cara a cara: qué cambia de verdad',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Archivo de instrucciones',
          id: 'compara-instrucciones',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: CLAUDE.md (global y por proyecto)',
            '<strong>Kimi Code</strong>: la convención AGENTS.md (global en ~/.kimi-code/AGENTS.md, compartido en ~/.agents/AGENTS.md, por proyecto en AGENTS.md). No existe un KIMI.md y no lee CLAUDE.md de forma nativa, aunque trae un skill /import-from-cc-codex para migrar tu configuración una vez',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hooks',
          id: 'compara-hooks',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: 8 eventos de ciclo de vida, configurados en JSON',
            '<strong>Kimi Code</strong>: 16 eventos, configurados como bloques [[hooks]] en un archivo TOML, con kimi doctor para validar lo que escribas. Más superficie, pero tus hooks de Claude hay que reescribirlos, no copiarlos',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Servidores MCP',
          id: 'compara-mcp',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: soporte MCP completo, config de proyecto en .mcp.json',
            '<strong>Kimi Code</strong>: soporte MCP completo también, y esta es la mejor parte: lee el mismo <code>.mcp.json</code> de la raíz del repo que usa Claude Code, y expone las herramientas con los mismos nombres mcp__servidor__herramienta. Un archivo configura a los dos agentes',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Skills',
          id: 'compara-skills',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: skills en ~/.claude/skills y en el .claude/skills del proyecto',
            '<strong>Kimi Code</strong>: lee las carpetas compartidas ~/.agents/skills/ y .agents/skills/ más su propia ~/.kimi-code/skills/, pero no ~/.claude/skills. Su skill /import-from-cc-codex copia tus skills de Claude Code una vez. Si mantienes skills en varias CLIs, mira <a href="/es/guias/compartir-skills-entre-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">compartir skills entre agentes</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Subagentes',
          id: 'compara-subagentes',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: subagentes integrados y totalmente personalizados',
            '<strong>Kimi Code</strong>: solo tres integrados (coder, explore, plan); los agentes personalizados se eliminaron a propósito',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sesiones e historial',
          id: 'compara-sesiones',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: transcripts JSONL por proyecto, se retoman con claude --resume',
            '<strong>Kimi Code</strong>: también JSONL en disco, por proyecto, con kimi --continue y kimi --session, más un comando /title para nombrar sesiones. Los detalles están en <a href="/es/guias/historial-conversaciones-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones de Kimi Code</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Autonomía',
          id: 'compara-autonomia',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: pide permisos por defecto, con un flag de bypass que la gente llama <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">modo YOLO</a>',
            '<strong>Kimi Code</strong>: mismo modelo. Pregunta por defecto, <code>--yolo</code> para aprobarlo todo, y reglas de permisos en TOML como término medio. Mira <a href="/es/guias/modo-yolo-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">el modo YOLO de Kimi Code</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Plataformas',
          id: 'compara-plataformas',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: macOS, Linux y Windows (nativo y WSL)',
            '<strong>Kimi Code</strong>: macOS y Linux van finos. Windows necesita Git for Windows y tiene un problema de renderizado conocido en algunos terminales, todavía abierto en octubre de 2026',
          ],
        },
      ],
    },
    {
      id: 'camino-intermedio',
      title: 'El camino intermedio: Kimi K3 dentro de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Hay una tercera opción sin la que esta comparativa quedaría coja. Moonshot mantiene endpoints compatibles con Anthropic, así que puedes apuntar el propio Claude Code a Kimi K3 con unas pocas variables de entorno. Te quedas con el arnés maduro de Claude Code, tus hooks, tu CLAUDE.md y tu configuración MCP, y cambias el modelo por debajo.',
        },
        {
          type: 'paragraph',
          text: 'Ese camino tiene sus propios matices (dos endpoints distintos, variables de autenticación diferentes y algunas funciones de Claude Code que se comportan distinto contra un backend que no es de Anthropic), y tenemos una guía completa de configuración: <a href="/es/guias/kimi-k3-con-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo usar Kimi K3 con Claude Code</a>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Una forma útil de plantearlo: si lo que quieres es el modelo K3, Claude Code ya puede ejecutarlo. Si lo que quieres es el arnés de Kimi Code (sus hooks, su TUI, su cuota de suscripción), para eso está el CLI kimi.',
        },
      ],
    },
    {
      id: 'veredicto',
      title: 'Veredicto: quién gana en 2026',
      content: [
        {
          type: 'paragraph',
          text: 'Una llamada honesta, no un empate de compromiso: <strong>Claude Code sigue siendo el mejor arnés</strong>. Es más estable, funciona en más plataformas, tiene subagentes personalizados y su ecosistema es mucho más profundo. Si solo vas a usar un agente de terminal para trabajo serio diario, Claude Code sigue siendo la opción segura.',
        },
        {
          type: 'paragraph',
          text: '<strong>Kimi Code es un aspirante creíble</strong>, y no ha terminado de crecer. Su modelo por defecto tiene ya hasta 1M de contexto en todos los planes, K3.1 Pro está a un comando, y el arnés imita a propósito suficientes convenciones de Claude Code como para que probarlo cueste poco aprendizaje.',
        },
        {
          type: 'paragraph',
          text: 'La respuesta práctica para muchos desarrolladores es dejar de tratarlo como una elección binaria. Los dos agentes pueden compartir el .mcp.json de tu repo, y Kimi Code puede importar tus skills de Claude Code. Usa Claude Code en el trabajo que no puedes permitirte vigilar, prueba Kimi Code en tareas de mucho volumen donde su precio encaje, y compara resultados en tu propio repositorio en vez de en benchmarks.',
        },
      ],
    },
    {
      id: 'los-dos-en-codeagentswarm',
      title: 'Ejecuta los dos a la vez en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Justo para esto existe <a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>. Es un workspace de escritorio (macOS, Windows y Linux) que ejecuta varios terminales de CLIs de IA en paralelo, y Kimi Code es un agente de primera clase dentro de él, junto a Claude Code, Codex CLI, Antigravity CLI, opencode y Grok Build.',
        },
        {
          type: 'list',
          items: [
            '<strong>Eliges el agente por terminal</strong>: Claude Code en uno, Kimi Code en el siguiente, sobre el mismo proyecto',
            '<strong>Notificaciones de escritorio</strong> cuando cualquier agente termina o necesita una aprobación, para que un cuelgue silencioso de Kimi no te coma la tarde',
            '<strong>Diffs en vivo por terminal</strong>, para auditar qué ha cambiado cada modelo de verdad',
            '<strong>Historial buscable entre agentes</strong>: cada sesión de Claude y de Kimi en un mismo buscador',
            '<strong>Seguimiento de cuota</strong> que entiende las ventanas de cuota de Kimi, para ver venir el muro antes de chocar',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si quieres profundizar en configuraciones multiagente, empieza por <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Kimi Code</a> o por la panorámica del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Kimi Code es una copia de Claude Code?',
      answer: 'Está fuertemente inspirado en él, hasta el punto de usar los mismos nombres de herramientas internas (Bash, Write, Edit, Read) y el mismo naming mcp__ para las herramientas MCP. No es un fork: es su propio código open source en TypeScript, con su propio sistema de hooks y su formato de sesión. Su id por defecto, kimi-for-coding, sirve ahora K2.8 Preview, y K3.1 Pro está disponible con /model.',
    },
    {
      question: '¿Kimi Code lee CLAUDE.md?',
      answer: 'De forma nativa no. Kimi Code sigue la convención AGENTS.md: un AGENTS.md global en su carpeta de configuración, el compartido ~/.agents/AGENTS.md y un AGENTS.md por proyecto. Incluye un skill /import-from-cc-codex que migra tu configuración de Claude Code o Codex una vez, con confirmación.',
    },
    {
      question: '¿Los skills de Claude Code funcionan en Kimi Code?',
      answer: 'En su mayoría sí, tras un paso. Kimi Code lee la carpeta compartida ~/.agents/skills/ y sus propias carpetas de skills, pero no ~/.claude/skills, así que ejecuta su skill /import-from-cc-codex o mueve los skills multi-agente a ~/.agents/skills/. Como sus herramientas se llaman como las de Claude, los skills que usan Bash, Write o Edit funcionan como esperas. Los hooks son la excepción: los de Claude son JSON y los de Kimi son TOML con otros payloads, así que hay que reescribirlos.',
    },
    {
      question: '¿Kimi Code es más barato que Claude Code?',
      answer: 'Depende del modelo y de la carga de trabajo. Las dos empresas publican sus tarifas por token de API en sus páginas oficiales de precios, y los modelos K2 de Moonshot, K2.7 Code incluido, dejan de estar disponibles para cuentas nuevas de API desde el 31 de octubre de 2026. Las suscripciones no se comparan directamente porque sus cupos y límites son distintos. Mira la guía de precios de Kimi Code para el desglose con fecha.',
    },
    {
      question: '¿Puedo ejecutar Kimi Code y Claude Code a la vez?',
      answer: 'Sí. Son procesos separados, pueden incluso compartir el mismo .mcp.json del repositorio, y ejecutarlos en paralelo es la forma más rápida de aprender qué modelo encaja con qué tarea. CodeAgentSwarm los ejecuta lado a lado en un mismo workspace, con diffs por terminal, notificaciones e historial buscable.',
    },
    {
      question: '¿Debería cambiarme de Claude Code a Kimi Code?',
      answer: 'Cambiarte del todo, probablemente todavía no: Kimi Code se mueve muy rápido y tiene aristas en Windows y con cuelgues silenciosos. Añadirlo junto a Claude Code sí puede tener sentido: aprenderlo cuesta poco, su modelo por defecto tiene hasta 1M de contexto en todos los planes, y tus servidores MCP se mantienen mientras los skills se importan en un paso.',
    },
  ],
}

export default guide
