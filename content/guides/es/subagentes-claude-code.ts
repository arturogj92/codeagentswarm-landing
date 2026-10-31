import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'subagentes-claude-code',
    locale: 'es',
    title: 'Subagentes de Claude Code: qué son y cómo usarlos',
    metaTitle: 'Subagentes de Claude Code: qué son y cómo usarlos (2026)',
    metaDescription: 'Qué son los subagentes de Claude Code, cuáles trae de serie, cómo crear los tuyos en .claude/agents y cómo ver cada subagente, su modelo y su paso.',
    intro: `Un subagente es un ayudante al que Claude Code le pasa una tarea secundaria. Trabaja con su propia ventana de contexto, se encarga de la parte ruidosa (buscar en el código, leer logs, revisar un diff) y devuelve solo el resultado, así que tu conversación principal sigue corta y centrada.\n\nEn esta guía tienes lo que dice la documentación de Anthropic sobre los subagentes, cómo escribir los tuyos y cómo CodeAgentSwarm te enseña cada subagente mientras trabaja, con su modelo y su paso actual, y deja que los agentes abran subagentes con cualquier modelo en el que tengas sesión iniciada.`,
    ctaText: 'Abre un Chat de Claude Code en CodeAgentSwarm y sigue cada subagente, su modelo y su paso actual, en lugar de una sola línea de "delegando".',
    ctaAgent: 'claude-code',
    highlightedWords: ['Subagentes', 'Claude Code'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'claude-code-subagents',
    relatedSlug: 'agent-teams-de-claude-code-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'que-son',
      title: 'Qué son los subagentes',
      content: [
        {
          type: 'paragraph',
          text: `Según la <a href="https://code.claude.com/docs/en/sub-agents" ${EXT}>documentación de subagentes</a> de Anthropic, cada subagente se ejecuta en su propia ventana de contexto, con un prompt de sistema propio, acceso a herramientas concretas y permisos independientes. Cuando una tarea encaja con la descripción de un subagente, Claude se la delega y recibe el resultado.`,
        },
        {
          type: 'list',
          items: [
            '<strong>Contexto limpio</strong>: el subagente no ve el historial de tu conversación. Lee lo que necesita y devuelve un resumen.',
            '<strong>Herramientas limitadas</strong>: puedes darle a un revisor solo herramientas de lectura y dejar fuera Edit y Write.',
            '<strong>Su propio modelo</strong>: una búsqueda rápida puede ir en un modelo más pequeño mientras la sesión principal sigue en uno más grande.',
            '<strong>Mismos límites de uso</strong>: un subagente hace sus propias peticiones, y cuentan para los mismos límites que tu conversación principal.',
          ],
        },
      ],
    },
    {
      id: 'de-serie',
      title: 'Los subagentes que vienen de serie',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Explore</strong>: un agente rápido y de solo lectura para buscar y analizar el código.',
            '<strong>Plan</strong>: un agente de investigación de solo lectura que se usa en el modo plan para reunir contexto antes de proponer un plan.',
            '<strong>general-purpose</strong>: para tareas complejas de varios pasos que piden explorar y también hacer cambios.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Claude los elige solo. También puedes pedir uno a propósito, por ejemplo: "usa el subagente Explore para encontrar todos los sitios donde leemos la cookie de sesión".',
        },
      ],
    },
    {
      id: 'crear',
      title: 'Cómo crear tu propio subagente',
      content: [
        {
          type: 'paragraph',
          text: 'Un subagente es un archivo Markdown con frontmatter YAML. Ponlo en <code>.claude/agents/</code> para compartirlo con un proyecto, o en <code>~/.claude/agents/</code> para usarlo en todos tus proyectos. Solo <code>name</code> y <code>description</code> son obligatorios.',
        },
        {
          type: 'code',
          language: 'markdown',
          code: '---\nname: revisor-de-codigo\ndescription: Revisa el código buscando calidad y buenas prácticas\ntools: Read, Glob, Grep\nmodel: sonnet\n---\n\nEres un revisor de código. Cuando te llamen, analiza el código y da\nfeedback concreto y accionable sobre calidad, seguridad y buenas prácticas.',
        },
        {
          type: 'list',
          items: [
            '<code>description</code> le dice a Claude cuándo delegar. Que sea corta y concreta.',
            '<code>tools</code> limita lo que puede usar el subagente. Si lo quitas, hereda las herramientas disponibles.',
            '<code>model</code> acepta <code>sonnet</code>, <code>opus</code>, <code>haiku</code>, <code>fable</code>, un ID de modelo completo o <code>inherit</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'No hace falta escribir el archivo a mano. Pídele a Claude Code que cree el subagente y revisa lo que escribe.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Los subagentes pueden ir en primer plano, bloqueando la conversación principal hasta que terminan, o en segundo plano mientras sigues trabajando.',
        },
      ],
    },
    {
      id: 'subagentes-vs-equipos',
      title: 'Subagentes, Agent Teams y sesiones separadas',
      content: [
        {
          type: 'paragraph',
          text: `Los subagentes viven dentro de una sesión y le devuelven el resultado. Agent Teams coordina varias sesiones de Claude Code con una sesión líder (mira <a href="/es/guias/agent-teams-de-claude-code-vs-codeagentswarm" ${A}>Agent Teams de Claude Code vs CodeAgentSwarm</a>). Las sesiones separadas son totalmente independientes, y aun así puedes pedirle a un agente que planifique el trabajo y lo reparta con un <a href="/es/guias/coordinador-agentes-ia" ${A}>coordinador</a>.`,
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Ve cada subagente en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'En un terminal normal, un subagente es una línea que dice que se ha delegado trabajo, y lo que hace no se ve. El Chat de CodeAgentSwarm le da a cada turno un bloque de subagentes. Cada fila muestra:',
        },
        {
          type: 'list',
          items: [
            'El icono del agente y el nombre del subagente.',
            'Lo que está haciendo en ese momento.',
            'Su modelo y nivel de razonamiento, cuando el agente los informa (en Claude Code, cuando la llamada nombra un modelo como Haiku).',
            'Su estado y cuánto tiempo lleva.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Pulsa una fila para abrir la conversación de ese subagente: sus instrucciones, sus respuestas y las herramientas que ha usado. Una ruta arriba te devuelve a la conversación principal. Junto a la caja de mensaje, un contador te dice cuántos subagentes están en marcha; muestra primero los que te esperan, luego los que siguen trabajando y después los terminados, para que puedas abrir cualquiera más tarde.',
        },
        { type: 'heading', level: 3, id: 'cualquier-modelo', text: 'Subagentes con cualquier modelo en el que tengas sesión' },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm también da a cada agente una forma de abrir sus propios subagentes, y pueden usar cualquier modelo en el que tengas sesión iniciada en CodeAgentSwarm, no solo el del agente principal. Las reglas son sencillas:',
        },
        {
          type: 'list',
          items: [
            'Si nombras un agente o un modelo ("pide a un subagente de Codex que revise esto"), usa ese.',
            'Si no, el subagente usa el mismo agente, modelo y razonamiento que el principal.',
            'El agente solo elige otro proveedor cuando una segunda opinión o un modelo más adecuado ayudan de verdad, y solo si a ese proveedor le queda cuota.',
            'Te dice el motivo en una línea, y estos subagentes muestran cuándo están esperando una respuesta tuya.',
          ],
        },
        {
          type: 'paragraph',
          text: `Si eres tú quien pide pasar el trabajo a otro agente, CodeAgentSwarm lo abre como una sesión normal y visible, para que la sigas como cualquier otra. Para llevar muchas sesiones a la vez, mira <a href="/es/guias/enjambre-de-agentes-claude-code" ${A}>enjambre de agentes de Claude Code</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es un subagente en Claude Code?',
      answer: 'Un ayudante especializado con su propia ventana de contexto, prompt de sistema, herramientas y permisos. Claude le delega una tarea y recibe solo el resultado, lo que mantiene centrada la conversación principal.',
    },
    {
      question: '¿Dónde pongo mis subagentes?',
      answer: 'En .claude/agents/ para un proyecto o en ~/.claude/agents/ para todos tus proyectos. Cada subagente es un archivo Markdown con name y description en el frontmatter, y opcionalmente tools y model.',
    },
    {
      question: '¿Los subagentes gastan más de mi plan?',
      answer: 'Hacen sus propias peticiones, y esas peticiones cuentan para los mismos límites de uso que tu conversación principal.',
    },
    {
      question: '¿Un subagente puede usar otro modelo?',
      answer: 'Sí. Pon model en el frontmatter (sonnet, opus, haiku, fable, un ID de modelo completo o inherit). En CodeAgentSwarm, los agentes también pueden abrir subagentes con otro proveedor en el que tengas sesión, como Codex.',
    },
    {
      question: '¿Cómo veo lo que está haciendo un subagente?',
      answer: 'En el Chat de CodeAgentSwarm, cada subagente aparece como una fila con su paso actual, modelo, estado y tiempo. Púlsala para abrir su conversación completa.',
    },
  ],
}

export default guide
