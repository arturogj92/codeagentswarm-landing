import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'marketplace-de-skills-claude-code',
    locale: 'es',
    title: 'Marketplace de Skills de Claude Code: explora e instala skills para tus agentes',
    metaTitle: 'Marketplace de Skills de Claude Code: explora e instala skills para agentes (2026)',
    metaDescription: 'Explora e instala skills de Claude Code con un clic desde un marketplace con decenas de miles de skills. Instala la misma skill en Claude, Gemini o Codex.',
    intro: `Si alguna vez has querido darle a Claude Code una capacidad reutilizable (una forma de escribir commits, lanzar una release, generar un changelog), probablemente has acabado copiando archivos SKILL.md a mano, soltando carpetas en directorios ocultos y rezando para que la ruta fuera la correcta.

CodeAgentSwarm trae un Marketplace de Skills integrado para que no tengas que hacer nada de eso. Replica un catálogo público enorme de skills para agentes (decenas de miles), te deja buscar y ordenar por estrellas, e instala la que quieras con un solo clic.

Lo que más me gusta: cuando instalas una skill, eliges dónde va. Puedes instalarla en Claude, en Gemini, en Codex o en todos a la vez. Así una skill que encuentras se convierte en una capacidad compartida por todos los agentes CLI que usas, en lugar de quedar atada a una sola herramienta.`,
    highlightedWords: ['Marketplace de Skills', 'skills', 'instala'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'claude-code-skills-marketplace',
    ctaText: 'Abre el Marketplace de Skills en CodeAgentSwarm, encuentra una skill que realmente quieras e instálala en Claude, Gemini o Codex con un clic.',
  },
  sections: [
    {
      id: 'que-es',
      title: 'Qué es el Marketplace de Skills de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'El Marketplace de Skills es una pantalla dentro de CodeAgentSwarm donde exploras skills para agentes y las instalas con un clic. Piénsalo como una tienda de aplicaciones de capacidades que puedes entregar a tus agentes CLI.',
        },
        {
          type: 'image',
          alt: 'Marketplace de Skills de CodeAgentSwarm mostrando una cuadrícula de tarjetas de skills, cada una con nombre, descripción, número de estrellas y un botón de Instalar',
          src: '/images/guides/skills-marketplace.png',
          caption: 'El Marketplace de Skills: una cuadrícula de tarjetas con búsqueda, número de estrellas y botones de instalación con un clic.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Una skill es un pequeño paquete: un archivo SKILL.md que describe qué hace la skill y cuándo usarla, más su carpeta de archivos de apoyo (scripts, plantillas, referencias). Cuando un agente tiene esa skill instalada, puede activarla automáticamente cuando la tarea encaja.',
        },
        {
          type: 'paragraph',
          text: 'El marketplace replica un catálogo público enorme, así que no te limitas a un puñado de ejemplos curados. Hay decenas de miles de skills para revisar, puedes buscar por palabra clave y puedes ordenar por estrellas para ver las que la gente realmente usa.',
        },
        {
          type: 'paragraph',
          text: 'Si eres nuevo con <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, es la herramienta de codificación agéntica de Anthropic que corre en tu terminal. Las skills son la forma de ampliar lo que sabe hacer sin reescribir las mismas instrucciones en cada sesión.',
        },
      ],
    },
    {
      id: 'como-instalar',
      title: 'Cómo instalar una skill de Claude Code (y dónde va)',
      content: [
        {
          type: 'paragraph',
          text: 'Instalar es la parte fácil. Abres el marketplace, encuentras una skill y haces clic en Instalar. Lo interesante es la elección que tienes sobre dónde instalarla.',
        },
        {
          type: 'paragraph',
          text: 'En la vista de detalle de una skill no tienes solo un botón de Instalar. Tienes un conjunto de destinos:',
        },
        {
          type: 'list',
          items: [
            'Instalar en Claude, dejando la skill en el directorio de skills de Claude Code',
            'Instalar en Gemini, para que el CLI de Gemini pueda usar la misma skill',
            'Instalar en Codex, para que el CLI de Codex también la pueda usar',
            'Instalar en todos, que coloca la skill en todos los agentes a la vez',
          ],
        },
        {
          type: 'image',
          alt: 'Vista de detalle de una skill en CodeAgentSwarm con botones Instalar en Claude, Instalar en Gemini, Instalar en Codex e Instalar en todos',
          src: '/images/guides/skills-install-multi-cli.png',
          caption: 'En la vista de detalle de una skill eliges el destino: Claude, Gemini, Codex o todos a la vez.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'El flujo práctico es así:',
        },
        {
          type: 'list',
          items: [
            'Abre el Marketplace de Skills en CodeAgentSwarm.',
            'Busca lo que necesitas, u ordena por estrellas para ver las populares.',
            'Abre una skill para leer su descripción y para qué sirve.',
            'Haz clic en Instalar en Claude (o Gemini, Codex, o Instalar en todos).',
            'Inicia una sesión y el agente podrá usar la skill desde ese momento.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si no estás seguro de con qué agente vas a usar una skill, elige Instalar en todos. La skill es ligera, y tenerla disponible en todas partes significa que no tienes que volver a instalarla luego para otro CLI.',
        },
      ],
    },
    {
      id: 'donde-se-guardan',
      title: 'Dónde se guardan las skills de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando instalas una skill en Claude, CodeAgentSwarm la escribe en tu directorio de skills de Claude Code, en ~/.claude/skills/. Cada skill vive en su propia carpeta ahí, con su SKILL.md y los archivos de apoyo al lado.',
        },
        {
          type: 'paragraph',
          text: 'Como son archivos normales en disco, no hay nada oculto ni mágico. Puedes abrir la carpeta, leer el SKILL.md, ajustarlo o borrar una skill que ya no quieras. El marketplace solo te ahorra la copia manual.',
        },
        {
          type: 'paragraph',
          text: 'Instalar en Gemini o Codex funciona igual: cada CLI tiene su propia ubicación de skills, y CodeAgentSwarm pone los archivos donde ese agente los espera. Ese es el sentido de la instalación multidestino: una fuente, escrita en el lugar correcto para cada herramienta.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Como las skills son solo carpetas, se llevan bien con el control de versiones. Si mantienes un repo de dotfiles, puedes versionar ahí tus skills instaladas y llevar tu configuración entre máquinas.',
        },
      ],
    },
    {
      id: 'entre-clis',
      title: 'Una biblioteca de skills compartida entre Claude, Gemini y Codex',
      content: [
        {
          type: 'paragraph',
          text: 'Esta es la razón por la que el marketplace importa más dentro de CodeAgentSwarm que como un catálogo independiente. CodeAgentSwarm está hecho para ejecutar varios agentes CLI en paralelo, múltiples terminales entre Claude Code, el CLI de Codex y el CLI de Gemini al mismo tiempo.',
        },
        {
          type: 'paragraph',
          text: 'Si tus skills solo funcionaran con un agente, acabarías con una buena caja de herramientas para Claude y una vacía para Gemini y Codex. La instalación multidestino lo arregla. Encuentra una skill útil una vez, instálala en todos, y cada agente de tu enjambre tiene la misma capacidad.',
        },
        {
          type: 'paragraph',
          text: 'Por ejemplo, una skill de "generar un changelog de release" instalada en los tres significa que da igual qué terminal se encargue de la release. El terminal de Codex, el de Gemini y el de Claude saben hacerlo de la misma manera.',
        },
        {
          type: 'paragraph',
          text: 'Si quieres la visión completa de ejecutar varios agentes CLI juntos, mira esta guía: <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo crear un enjambre de agentes CLI con Claude, Codex y Gemini</a>.',
        },
      ],
    },
    {
      id: 'skills-vs-mcp',
      title: 'Skills vs servidores MCP: cuándo usar cada uno',
      content: [
        {
          type: 'paragraph',
          text: 'A veces la gente confunde las skills con los servidores MCP porque ambos amplían lo que puede hacer un agente. Resuelven problemas distintos, y normalmente vas a querer los dos.',
        },
        {
          type: 'paragraph',
          text: 'Una skill es conocimiento e instrucciones, empaquetados. Le enseña al agente cómo hacer algo (un flujo, una convención, una receta) usando las herramientas que ya tiene. Es texto y archivos de apoyo, instalados en local.',
        },
        {
          type: 'paragraph',
          text: 'Un servidor MCP es una conexión a una capacidad o sistema externo: una base de datos, un gestor de incidencias, un navegador, una API. Le da al agente nuevas herramientas que llamar, no solo instrucciones que seguir.',
        },
        {
          type: 'paragraph',
          text: 'Una regla aproximada: si quieres que el agente sepa cómo hacer una tarea que ya podría intentar, tira de una skill. Si quieres que el agente alcance un sistema que de otra forma no puede tocar, tira de un servidor MCP. Para elegir servidores MCP, mira esta guía: <a href="/es/guias/mejores-servidores-mcp-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Los mejores servidores MCP para Claude Code</a>.',
        },
      ],
    },
    {
      id: 'crea-la-tuya',
      title: 'Crear y compartir tu propia skill',
      content: [
        {
          type: 'paragraph',
          text: 'Una vez que has usado unas cuantas skills instaladas, probablemente querrás crear las tuyas para los flujos propios de tus proyectos.',
        },
        {
          type: 'paragraph',
          text: 'Una skill es solo una carpeta con un archivo SKILL.md. El SKILL.md describe qué hace la skill, cuándo debería usarla el agente, y los pasos o reglas a seguir. Añade en la misma carpeta cualquier script, plantilla o archivo de referencia que la skill necesite.',
        },
        {
          type: 'list',
          items: [
            'Crea una carpeta para tu skill dentro del directorio de skills (para Claude, es ~/.claude/skills/).',
            'Escribe un SKILL.md que explique el propósito, el disparador ("usa esto cuando...") y los pasos.',
            'Añade los archivos de apoyo en los que se basa la skill.',
            'Inicia una sesión y pruébala. Refina el SKILL.md hasta que el agente la use como quieres.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Para compartir una skill, puedes publicarla en el catálogo público que el marketplace replica, o simplemente versionar la carpeta en un repo que tu equipo clone. En cualquier caso, el formato es el mismo, así que todo lo que crees es portable entre Claude, Gemini y Codex.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Empieza copiando una skill que ya tengas instalada y editándola. Leer un SKILL.md que funciona es la forma más rápida de aprender el formato antes de escribir uno desde cero.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué son las skills de Claude Code?',
      answer: 'Una skill de Claude Code es una capacidad reutilizable que le das al agente. Es un archivo SKILL.md que describe qué hace la skill y cuándo usarla, más una carpeta de archivos de apoyo (scripts, plantillas, referencias). Una vez instalada, Claude Code puede activar la skill automáticamente cuando una tarea encaja, en lugar de que tú reescribas las mismas instrucciones en cada sesión.',
    },
    {
      question: '¿Cómo instalo una skill de Claude Code?',
      answer: 'Abre el Marketplace de Skills dentro de CodeAgentSwarm, busca u ordena por estrellas para encontrar una skill, ábrela y haz clic en Instalar. En la vista de detalle eliges el destino: Instalar en Claude, Instalar en Gemini, Instalar en Codex o Instalar en todos. Los archivos se escriben en el lugar correcto automáticamente.',
    },
    {
      question: '¿Dónde se guardan las skills de Claude Code?',
      answer: 'Las skills instaladas en Claude viven en tu directorio de skills de Claude Code, en ~/.claude/skills/, cada una en su propia carpeta junto a su SKILL.md. Son archivos normales, así que puedes abrirlos, editarlos, versionarlos o borrarlos. Gemini y Codex tienen cada uno su propia ubicación de skills, y CodeAgentSwarm escribe los archivos donde cada agente los espera.',
    },
    {
      question: '¿Puedo usar la misma skill con Codex y Gemini?',
      answer: 'Sí. Cuando instalas una skill desde el marketplace eliges el destino, y puedes elegir Instalar en Codex, Instalar en Gemini, Instalar en Claude o Instalar en todos. Elegir Instalar en todos coloca la misma skill en todos los agentes CLI a la vez, así una biblioteca de skills funciona para todos ellos.',
    },
    {
      question: '¿Cómo creo mi propia skill?',
      answer: 'Crea una carpeta dentro de tu directorio de skills (para Claude, ~/.claude/skills/) y añade un SKILL.md que explique qué hace la skill, cuándo usarla y los pasos a seguir. Incluye en la misma carpeta los scripts o plantillas que la skill necesite. Inicia una sesión para probarla y refina el SKILL.md hasta que el agente se comporte como quieres. Lo más fácil es copiar una skill instalada y editarla.',
    },
    {
      question: '¿Cuántas skills hay en el marketplace?',
      answer: 'El marketplace replica un catálogo público enorme con decenas de miles de skills. Puedes buscar por palabra clave para acotar y ordenar por estrellas para ver las que la gente usa más.',
    },
    {
      question: '¿Cuál es la diferencia entre una skill y un servidor MCP?',
      answer: 'Una skill es conocimiento e instrucciones empaquetados: le enseña al agente cómo hacer una tarea con las herramientas que ya tiene. Un servidor MCP conecta al agente con un sistema externo (una base de datos, un navegador, una API) y le da nuevas herramientas que llamar. Se complementan, y normalmente usarás los dos.',
    },
  ],
}

export default guide
