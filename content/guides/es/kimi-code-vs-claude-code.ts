import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-vs-claude-code',
    locale: 'es',
    title: 'Kimi Code vs Claude Code: ¿qué agente de terminal te conviene?',
    metaTitle: 'Kimi Code vs Claude Code: comparativa honesta (2026)',
    metaDescription: 'Kimi Code vs Claude Code: modelo, precios, configuración, hooks, MCP y madurez. Dónde gana cada uno, qué se aprovecha del otro y por qué quizá quieras los dos.',
    intro: `Kimi Code es el agente de programación en terminal de Moonshot AI, y es el competidor más directo de Claude Code que ha salido hasta ahora. Y no en plan vago de "otro CLI con IA": Kimi Code clona los nombres de las herramientas de Claude Code tal cual (Bash, Write, Edit, Read, incluso el prefijo mcp__ para las herramientas MCP), lee la misma carpeta compartida de skills y acepta el mismo .mcp.json a nivel de proyecto. Si sabes usar Claude Code, ya sabes usar casi todo Kimi Code.

Las diferencias existen, eso sí, y cortan en ambas direcciones. Kimi Code ejecuta Kimi K3, un modelo de 2,8 billones de parámetros con una ventana de contexto de hasta un millón de tokens y precios muy agresivos. Claude Code ejecuta la familia Claude de Anthropic con un arnés mucho más maduro alrededor. Una de estas herramientas lleva años de rodaje en producción; la otra lanzó su modelo estrella el 16 de julio de 2026 y ahora mismo publica una release casi cada día.

En esta comparativa repaso qué hace mejor cada uno, qué se transfiere entre ellos y la configuración a la que mucha gente acaba llegando: no elegir, y ejecutar los dos a la vez.`,
    ctaText: 'La forma más rápida de zanjar el Kimi Code vs Claude Code es ejecutar los dos a la vez. CodeAgentSwarm le da a cada agente su propio terminal, con diffs en vivo, notificaciones de escritorio e historial buscable en todas las sesiones.',
    highlightedWords: ['Kimi Code', 'Claude Code'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
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
          text: '<strong><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a></strong> es la respuesta de Moonshot AI. Misma forma: un agente TUI que arrancas con el comando <code>kimi</code> dentro de un proyecto, y que planifica, edita, ejecuta y repite. Es open source (MIT, TypeScript), se mueve rapidísimo (decenas de releases en sus dos primeros meses) y está pensado para lucir a Kimi K3, el modelo que Moonshot lanzó el 16 de julio de 2026.',
        },
        {
          type: 'paragraph',
          text: 'El linaje no es nada sutil. Las herramientas internas de Kimi Code llevan exactamente los mismos nombres que las de Claude Code: <code>Bash</code>, <code>Write</code>, <code>Edit</code>, <code>Read</code>, y las herramientas MCP aparecen como <code>mcp__servidor__herramienta</code>, idéntico al naming de Claude. Para ti eso son buenas noticias: los flujos de trabajo, el modelo mental e incluso algunos archivos de configuración se transfieren entre los dos casi sin fricción.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'No confundas Kimi Code con kimi-cli. Moonshot tiene dos CLIs: kimi-cli es el agente antiguo en Python, ya en retirada, y Kimi Code es el actual en TypeScript. Los dos instalan un binario llamado kimi. Ejecuta kimi --version para comprobarlo: 0.x significa que tienes el Kimi Code actual, 1.4x significa que estás en el legacy de Python. En la <a href="/es/guias/como-usar-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de instalación de Kimi Code</a> explico cómo evitar instalar el equivocado.',
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
          text: 'Kimi Code es un agente de terminal impulsado por Kimi K3: un modelo Mixture of Experts de 2,8 billones de parámetros con una ventana de contexto de 1.048.576 tokens y visión nativa. K3 siempre razona. A julio de 2026, <code>reasoning_effort</code> solo acepta <code>max</code>, así que cada petición piensa a máxima profundidad. Eso lo hace fuerte en problemas realmente difíciles y más lento de lo necesario en los triviales.',
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
            '<strong>El precio de Kimi K3 es agresivo</strong>: en la plataforma de pago por token, 0,30 $ por millón de tokens en aciertos de caché, 3,00 $ en fallos y 15,00 $ la salida, plano en toda la ventana de 1M',
            '<strong>Hasta 1M de tokens de contexto</strong>, con la nota honesta de que la ventana completa depende del plan de suscripción (256k en el plan más barato)',
            '<strong>Familiar por diseño</strong>: nombres de herramientas al estilo Claude, soporte del .mcp.json de proyecto y lectura nativa de la carpeta compartida ~/.agents/skills/',
            '<strong>Más superficie de hooks que Claude Code</strong>: 16 eventos de ciclo de vida configurados en TOML, validables con kimi doctor',
            '<strong>Open source y en movimiento constante</strong>: licencia MIT, repo público y releases casi diarias',
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
            '<strong>Madurez</strong>: es pre-1.0 y se nota. Hay usuarios que reportan sesiones que se cuelgan en silencio tras un rate limit o un stream parado, algo doloroso cuando no estás mirando el terminal',
            '<strong>Windows está verde</strong>: exige Git for Windows como shell y hay un issue abierto conocido en el que la TUI imprime códigos ANSI en crudo en algunos terminales de Windows. En <a href="/es/guias/kimi-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code en Windows</a> están los rodeos',
            '<strong>Sin subagentes personalizados</strong>: tienes tres integrados (coder, explore, plan) y nada más',
            '<strong>El razonamiento siempre activo</strong> no tiene aún modo de esfuerzo bajo, así que las ediciones rápidas queman más tiempo y cuota del que deberían',
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
          text: 'Kimi Code funciona con una suscripción Kimi (planes desde gratis hasta 199 $/mes, compartiendo un único pozo de créditos con el resto de la membresía Kimi) o con API keys de pago por token. La cuota se refresca cada semana con una ventana rodante de 5 horas por encima. El desglose completo, incluido qué plan desbloquea qué, está en <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">planes y precios de Kimi Code</a>.',
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
          text: 'Claude Code es la herramienta de programación agéntica de Anthropic, con Claude Sonnet y Opus debajo. Estableció la mayoría de las convenciones que Kimi Code ahora sigue: instrucciones en lenguaje natural en un terminal, ediciones autónomas multi-archivo, ejecución de comandos, integraciones MCP y un sistema de permisos que te mantiene al mando.',
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
            '<strong>Los modelos Claude</strong>: Opus para razonamiento duro, Sonnet para velocidad, con control de esfuerzo para que las tareas simples no sobrepiensen',
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
            '<strong>Precio por unidad de trabajo</strong>: el uso de Claude es premium comparado con las tarifas por token de K3, sobre todo en trabajo de contexto largo',
            '<strong>Ventana de contexto</strong>: Claude Code no alcanza el techo de 1M de tokens de K3',
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
          text: 'Claude Code viene con la suscripción Claude Pro (20 $/mes) o Claude Max (100 $/mes con 5x de uso, 200 $/mes con 20x), o con pago por uso a través de la API de Anthropic.',
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
            '<strong>Claude Code</strong>: skills en ~/.claude/skills y la convención compartida ~/.agents/skills',
            '<strong>Kimi Code</strong>: lee ~/.agents/skills/ de forma nativa, además de sus propias carpetas. Los skills que escribiste para el ecosistema Claude en gran parte funcionan sin más. Si mantienes skills en varios CLIs, mira <a href="/es/guias/compartir-skills-entre-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">compartir skills entre agentes</a>',
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
            '<strong>Kimi Code</strong>: macOS y Linux van finos. Windows necesita Git for Windows y tiene un problema de renderizado conocido en algunos terminales a julio de 2026',
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
          text: '<strong>Kimi Code es el aspirante más creíble hasta la fecha</strong>, y no ha terminado de crecer. Publica releases casi a diario, el precio de K3 recorta muchísimo el coste por token frente a Claude, el techo de 1M de contexto es real (en el plan adecuado) y, como imita deliberadamente las convenciones de Claude Code, probarlo te cuesta casi cero tiempo de aprendizaje.',
        },
        {
          type: 'paragraph',
          text: 'La respuesta práctica para muchos desarrolladores es dejar de tratarlo como una elección binaria. Los dos agentes ya comparten tu .mcp.json y tu carpeta de skills. Deja a Claude Code el trabajo que no puedes permitirte vigilar, dale a Kimi Code las tareas de contexto largo o alto volumen donde el precio de K3 brilla, y compara resultados en tu propio repositorio en vez de en benchmarks.',
        },
      ],
    },
    {
      id: 'los-dos-en-codeagentswarm',
      title: 'Ejecuta los dos a la vez en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Justo para esto existe <a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>. Es un workspace de escritorio (macOS y Windows) que ejecuta varios terminales de CLIs de IA en paralelo, y Kimi Code es un agente de primera clase dentro de él, junto a Claude Code, Codex CLI, Antigravity CLI y opencode.',
        },
        {
          type: 'list',
          items: [
            '<strong>Eliges el agente por terminal</strong>: Claude Code en uno, Kimi Code en el siguiente, sobre el mismo proyecto',
            '<strong>Notificaciones de escritorio</strong> cuando cualquier agente termina o necesita una aprobación, para que un cuelgue silencioso de Kimi no te coma la tarde',
            '<strong>Diffs en vivo por terminal</strong>, para auditar qué ha cambiado cada modelo de verdad',
            '<strong>Historial buscable entre agentes</strong>: cada sesión de Claude y de Kimi en un mismo buscador',
            '<strong>Seguimiento de cuota</strong> que entiende las ventanas semanales y de 5 horas de Kimi, para ver venir el muro antes de chocar',
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
      answer: 'Está fuertemente inspirado en él, hasta el punto de usar los mismos nombres de herramientas internas (Bash, Write, Edit, Read) y el mismo naming mcp__ para las herramientas MCP. Pero no es un fork: es su propio código open source en TypeScript, con su propio sistema de hooks (16 eventos configurados en TOML), su propio formato de sesiones y Kimi K3 de Moonshot como modelo.',
    },
    {
      question: '¿Kimi Code lee CLAUDE.md?',
      answer: 'De forma nativa no. Kimi Code sigue la convención AGENTS.md: un AGENTS.md global en su carpeta de configuración, el compartido ~/.agents/AGENTS.md y un AGENTS.md por proyecto. Incluye un skill /import-from-cc-codex que migra tu configuración de Claude Code o Codex una vez, con confirmación.',
    },
    {
      question: '¿Los skills de Claude Code funcionan en Kimi Code?',
      answer: 'En su mayoría sí. Kimi Code lee de forma nativa la carpeta compartida ~/.agents/skills/, que es donde viven los skills multi-agente, y como sus herramientas se llaman igual que las de Claude, los skills que mencionan Bash, Write o Edit se comportan como esperas. La excepción son los hooks: los de Claude son JSON y los de Kimi son TOML con payloads distintos, así que esos hay que reescribirlos.',
    },
    {
      question: '¿Kimi Code es más barato que Claude Code?',
      answer: 'En precio por token, sí, y por bastante a julio de 2026: Kimi K3 cuesta 0,30 $ por millón de tokens en aciertos de caché, 3,00 $ en fallos y 15,00 $ la salida. Las suscripciones son más difíciles de comparar directamente porque los planes de Kimi comparten un único pozo de créditos con toda la membresía Kimi, con refresco semanal más una ventana rodante de 5 horas. En la guía de planes y precios de Kimi Code está el cuadro completo.',
    },
    {
      question: '¿Puedo ejecutar Kimi Code y Claude Code a la vez?',
      answer: 'Sí. Son procesos separados, pueden incluso compartir el mismo .mcp.json del repositorio, y ejecutarlos en paralelo es la forma más rápida de aprender qué modelo encaja con qué tarea. CodeAgentSwarm los ejecuta lado a lado en un mismo workspace, con diffs por terminal, notificaciones e historial buscable.',
    },
    {
      question: '¿Debería cambiarme de Claude Code a Kimi Code?',
      answer: 'Cambiarte del todo, probablemente todavía no: Kimi Code es pre-1.0, se mueve muy rápido y tiene aristas conocidas en Windows y con cuelgues silenciosos. Añadirlo junto a Claude Code, muy posiblemente sí: el coste de aprenderlo es mínimo, el precio de K3 es agresivo y tus servidores MCP y skills se aprovechan casi enteros.',
    },
  ],
}

export default guide
