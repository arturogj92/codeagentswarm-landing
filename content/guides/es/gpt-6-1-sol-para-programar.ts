import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

const guide: Guide = {
  meta: {
    slug: 'gpt-6-1-sol-para-programar',
    locale: 'es',
    title: 'GPT-6.1 Sol para programar: precio, benchmarks y cómo usarlo en Codex',
    metaTitle: 'GPT-6.1 Sol para programar: precio, benchmarks y Codex',
    metaDescription: 'OpenAI lanzó GPT-6.1 Sol el 29 de septiembre de 2026. Precios de la API, benchmarks independientes y cómo usarlo en Codex CLI y en CodeAgentSwarm.',
    intro: 'GPT-6.1 Sol es una alternativa de OpenAI más barata que GPT-6 Astra para programar con agentes. OpenAI lo lanzó el 29 de septiembre de 2026, en su DevDay, y asegura que se acerca a GPT-6 Astra por la quinta parte del precio por token de Astra. Puedes usarlo en Codex con los planes Plus, Pro, Business, Enterprise o Edu, y en la API como <code>gpt-6.1-sol</code>.',
    ctaText: 'Usa GPT-6.1 Sol en Codex dentro de CodeAgentSwarm, junto a Claude Code y otros agentes, y cambia de modelo cuando la tarea lo pida.',
    ctaAgent: 'codex',
    highlightedWords: ['GPT-6.1 Sol'],
    publishedAt: '2026-10-13',
    updatedAt: '2026-10-13',
    alternateSlug: 'gpt-6-1-sol-for-coding',
    relatedSlug: 'planes-y-precios-de-codex',
  },
  sections: [
    {
      id: 'que-es-gpt-6-1-sol',
      title: 'Qué es GPT-6.1 Sol',
      content: [
        {
          type: 'paragraph',
          text: 'GPT-6.1 Sol es la nueva versión de GPT-6 Sol, una opción de OpenAI más barata que Astra para tareas largas de código y agentes. GPT-6 Astra sigue siendo la opción más capaz y más cara. Según recoge <a href="https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/" class="' + link + '">TechCrunch</a>, OpenAI dice que el nuevo modelo ofrece casi el mismo nivel que GPT-6 Astra en programación con agentes, uso del ordenador y trabajo profesional, a la quinta parte del precio estándar por token.',
        },
        {
          type: 'table',
          headers: ['Dato', 'GPT-6.1 Sol'],
          rows: [
            ['Identificador en la API', '<code>gpt-6.1-sol</code>'],
            ['Lanzamiento', '29 de septiembre de 2026'],
            ['Dónde usarlo', 'Codex y ChatGPT Work con los planes Plus, Pro, Business, Enterprise y Edu; API de OpenAI'],
            ['Ventana de contexto', '1.050.000 tokens, con hasta 128.000 de salida'],
            ['Fecha de corte del conocimiento', '30 de abril de 2026'],
            ['Niveles de razonamiento en la API', 'low, medium (predeterminado), high, xhigh, max'],
          ],
          caption: 'Fuente: documentación del modelo de OpenAI, consultada el 13 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: 'OpenAI cita además dos mejoras frente a GPT-6 Sol. En DeepSWE, un benchmark de ingeniería de software con tareas largas, el nuevo modelo saca 6,4 puntos más e iguala a Astra con cerca de la quinta parte del coste. Su tasa de errores factuales con razonamiento bajo pasó del 11,4 % al 7,7 %. Son mediciones de la propia OpenAI.',
        },
      ],
    },
    {
      id: 'precios',
      title: 'Cuánto cuesta GPT-6.1 Sol',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://developers.openai.com/api/docs/models/gpt-6.1-sol" class="' + link + '">página del modelo</a> da estos precios de la API en dólares por cada millón de tokens.',
        },
        {
          type: 'table',
          headers: ['Tipo de token', 'GPT-6.1 Sol', 'GPT-6 Astra'],
          rows: [
            ['Entrada', '2,00 USD', '10,00 USD'],
            ['Entrada en caché', '0,10 USD', '1,00 USD'],
            ['Salida', '10,00 USD', '50,00 USD'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Imagina una tarea que gasta 200.000 tokens de entrada y 20.000 de salida. Con Sol cuesta <code>0,2 × 2 + 0,02 × 10 = 0,60 USD</code>. Con Astra cuesta <code>0,2 × 10 + 0,02 × 50 = 3,00 USD</code>. Por encima de 272.000 tokens de entrada se aplica una tarifa de contexto largo a toda la petición: el doble por la entrada y la entrada en caché, y 1,5 veces por la salida. OpenAI indica ese umbral en la página de Astra; compruébalo para Sol.',
        },
        {
          type: 'paragraph',
          text: 'En Codex con una cuenta de ChatGPT no pagas por token. Cada tarea consume parte de los límites de tu plan. La <a href="/es/guias/planes-y-precios-de-codex" class="' + link + '">guía de planes y precios de Codex</a> explica esos límites.',
        },
      ],
    },
    {
      id: 'benchmarks',
      title: 'Benchmarks de GPT-6.1 Sol',
      content: [
        {
          type: 'image',
          src: '/images/guides/gpt-6-1-sol-score-price-es.webp',
          alt: 'Gráficos de barras con el Artificial Analysis Intelligence Index y el precio de salida en la API de GPT-6.1 Sol, GPT-6 Astra, Claude Opus 5.5 y Muse Wonder',
          size: 'full',
          caption: 'Gráfico de CodeAgentSwarm con las puntuaciones de Artificial Analysis y los precios publicados de las API, 13 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: '<a href="https://artificialanalysis.ai/models/gpt-6-1-sol" class="' + link + '">Artificial Analysis</a> hace sus propias pruebas. Le da a GPT-6.1 Sol 52 puntos. GPT-6 Astra saca 53, Muse Wonder 52 y Claude Opus 5.5 va primero con 58. Sol queda un punto por debajo de Astra y cuesta la quinta parte por token.',
        },
        {
          type: 'table',
          headers: ['Benchmark de Vals AI', 'GPT-6.1 Sol', 'Puesto'],
          rows: [
            ['Vals Index', '61,15 %', '9 de 47'],
            ['Terminal-Bench 4.0', '55,05 %', '7 de 47'],
            ['Vibe Code Bench v1.1', '88,93 %', '8 de 112'],
            ['SRE Bench', '50,76 %', '2 de 33'],
          ],
          caption: 'Fuente: página del modelo en Vals AI, razonamiento máximo, consultada el 13 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: '<a href="https://www.vals.ai/models/openai_gpt-6.1-sol" class="' + link + '">Vals AI</a> es otro evaluador independiente. Sol queda entre los primeros en trabajo de terminal y de operaciones, pero no en cabeza. Cada evaluador usa su propia configuración, así que compara las cifras dentro de una misma fuente, no entre fuentes.',
        },
        {
          type: 'paragraph',
          text: 'GPT-6.1 Sol no es el modelo más potente, pero da resultados cercanos a los mejores por mucho menos dinero. Por eso es buena opción por defecto para tareas largas o frecuentes. Reserva un modelo más potente para los problemas más difíciles.',
        },
      ],
    },
    {
      id: 'usar-en-codex',
      title: 'Usa GPT-6.1 Sol en Codex CLI',
      content: [
        {
          type: 'paragraph',
          text: 'Arranca Codex con el modelo elegido, o cámbialo dentro de una sesión con <code>/model</code>, que también ajusta el nivel de razonamiento:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'cd /ruta/a/tu/proyecto\ncodex -m gpt-6.1-sol',
        },
        {
          type: 'paragraph',
          text: 'Para dejarlo como predeterminado, ponlo en <code>~/.codex/config.toml</code>:',
        },
        {
          type: 'code',
          language: 'toml',
          code: 'model = "gpt-6.1-sol"\nmodel_reasoning_effort = "high"',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'El 13 de octubre de 2026, una cuenta ChatGPT Pro con Codex CLI 0.159.0 ya mostraba <code>gpt-6.1-sol</code> como modelo predeterminado. Codex ofrecía también el nivel <code>ultra</code>, que no aparece en la página del modelo de la API. Comprueba <code>/model</code> con tu plan.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Usa GPT-6.1 Sol dentro de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> ejecuta la CLI oficial de Codex con tu propia cuenta de ChatGPT. No vende acceso a modelos. En la vista Chat, el menú de modelo muestra los modelos que devuelve tu cuenta de Codex, así que GPT-6.1 Sol aparece ahí en cuanto tu plan lo incluye.',
        },
        {
          type: 'image',
          src: '/images/guides/gpt-6-1-sol-codex-model-menu.webp',
          alt: 'Chat de CodeAgentSwarm con Codex usando GPT-6.1-Sol y el menú de modelo con GPT-6.1-Sol, GPT-6-Astra, GPT-6-Sol, GPT-6-Luna y modelos GPT-5.6',
          size: 'full',
          caption: 'Codex en CodeAgentSwarm con GPT-6.1-Sol seleccionado. La lista de modelos es la que devolvió una cuenta ChatGPT Pro el 13 de octubre de 2026. Conversación de ejemplo.',
        },
        {
          type: 'list',
          items: [
            'Instala Codex CLI y ejecuta <code>codex login</code> una vez.',
            'En CodeAgentSwarm, pulsa New Agent y elige Codex.',
            'Abre el menú de modelo en el cuadro de texto del Chat y elige GPT-6.1-Sol.',
            'Ajusta el nivel de razonamiento al lado. Los niveles altos gastan más de tu plan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La vista Terminal ejecuta la misma CLI, así que <code>/model</code> también funciona ahí. Los proyectos, el tablero de tareas, las notificaciones y el historial con búsqueda funcionan igual con todos los agentes.',
        },
      ],
    },
    {
      id: 'sin-atarte',
      title: 'Elige el modelo para cada tarea, no para cada herramienta',
      content: [
        {
          type: 'paragraph',
          text: 'La clasificación cambia a menudo. Hoy GPT-6.1 Sol es el más barato de los cuatro modelos del gráfico, Claude Opus 5.5 lidera el índice de Artificial Analysis y Meta asegura que <a href="/es/guias/muse-wonder-para-programar" class="' + link + '">Muse Wonder</a> lidera sus benchmarks de tareas largas de programación. El mes que viene el orden puede volver a cambiar.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm ejecuta Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI a la vez. Lanza la misma tarea con Sol y con otro agente en worktrees de Git separados, compara los cambios y quédate con el ganador para ese tipo de trabajo. Desde el menú de modelo, <strong>Continue in another LLM</strong> abre una sesión nueva con otro agente instalado y le pasa un resumen y la transcripción completa.',
        },
        {
          type: 'paragraph',
          text: 'Para trabajar con varios agentes a la vez, mira <a href="/es/guias/enjambre-de-agentes-cli-ia" class="' + link + '">la guía del enjambre de agentes CLI</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es GPT-6.1 Sol?',
      answer: 'GPT-6.1 Sol es un modelo de OpenAI para programar con agentes y para trabajo profesional, lanzado el 29 de septiembre de 2026. Es la nueva versión de GPT-6 Sol y está disponible en Codex, en ChatGPT Work y en la API como gpt-6.1-sol.',
    },
    {
      question: '¿Cuánto cuesta GPT-6.1 Sol?',
      answer: 'En la API de OpenAI cuesta 2,00 USD por millón de tokens de entrada, 0,10 USD por millón de tokens de entrada en caché y 10,00 USD por millón de tokens de salida, consultado el 13 de octubre de 2026. En Codex con un plan de ChatGPT, el uso consume parte de los límites del plan.',
    },
    {
      question: '¿GPT-6.1 Sol es mejor que GPT-6 Astra?',
      answer: 'No del todo. Artificial Analysis da a Sol 52 puntos y a Astra 53. Sol cuesta la quinta parte por token, así que suele compensar más en tareas largas o frecuentes.',
    },
    {
      question: '¿Cómo uso GPT-6.1 Sol en Codex CLI?',
      answer: 'Ejecuta codex -m gpt-6.1-sol, elígelo con /model dentro de una sesión o pon model = "gpt-6.1-sol" en ~/.codex/config.toml.',
    },
    {
      question: '¿Puedo usar GPT-6.1 Sol en CodeAgentSwarm?',
      answer: 'Sí. CodeAgentSwarm ejecuta Codex CLI con tu cuenta de ChatGPT. Elige GPT-6.1-Sol en el menú de modelo del Chat o usa /model en la vista Terminal.',
    },
  ],
}

export default guide
