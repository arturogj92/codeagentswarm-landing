import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

const guide: Guide = {
  meta: {
    slug: 'muse-wonder-para-programar',
    locale: 'es',
    title: 'Muse Wonder para programar: el nuevo modelo de Meta, sin atarte a él',
    metaTitle: 'Muse Wonder para programar: precios, acceso y cómo usarlo',
    metaDescription: 'Meta lanzó Muse Wonder y Wonder Full el 12 de octubre de 2026. Precios de la API, qué planes de Muse Code incluyen Full y cómo probarlo sin atarte a un LLM.',
    intro: 'Muse Wonder es el nuevo modelo de frontera de Meta para agentes. Lo lanzó el 12 de octubre de 2026 junto a una versión más grande, Muse Wonder Full. Puedes usar Wonder desde la API de modelos de Meta y desde Muse Code, el agente de programación de Meta para el terminal. Full solo está disponible con una suscripción a Muse Code. Esta guía explica cuánto cuesta cada modelo, cómo empezar una tarea de código con Wonder y cómo usarlo en CodeAgentSwarm junto a Claude Code, Codex y otros agentes. Si el mes que viene sale un modelo mejor, cambias de agente, no de herramientas.',
    socialImage: '/images/guides/muse-code-og-es.png',
    ctaText: 'Usa Muse Wonder en CodeAgentSwarm junto a Claude Code, Codex y otros agentes, y cambia cuando salga un modelo mejor. El acceso y la facturación de Meta son independientes.',
    ctaAgent: 'muse',
    highlightedWords: ['Muse Wonder'],
    publishedAt: '2026-10-13',
    updatedAt: '2026-10-13',
    alternateSlug: 'muse-wonder-for-coding',
    relatedSlug: 'muse-code-modelos-precios-privacidad',
  },
  sections: [
    {
      id: 'que-lanzo-meta',
      title: 'Qué lanzó Meta el 12 de octubre',
      content: [
        {
          type: 'image',
          src: '/icons/apps/muse-icon.svg',
          alt: 'Muse Code',
          size: 'inline',
        },
        {
          type: 'paragraph',
          text: 'El <a href="https://about.fb.com/news/2026/10/introducing-muse-wonder-models/" class="' + link + '">anuncio de Meta</a> presenta dos modelos pensados para agentes. Meta destaca dos capacidades: la <strong>memoria activa</strong>, que conserva los datos relevantes entre conversaciones, y el <strong>foco activo</strong>, que mantiene al agente centrado en el objetivo cuando la tarea se complica. Para programar importa sobre todo la segunda: probar otro enfoque, recuperarse de un error y terminar la tarea.',
        },
        {
          type: 'table',
          headers: ['Modelo', 'Dónde se puede usar', 'Qué conviene saber'],
          rows: [
            ['Muse Wonder (<code>muse-wonder-1.0</code>)', 'API de modelos de Meta y Muse Code', 'Solo en modalidad Standard. Ventana de contexto de 1.048.576 tokens.'],
            ['Muse Wonder Full', 'Solo con suscripción a Muse Code', 'No se sirve por la API. Según Engadget, entra en los planes Power Usage de 50 USD y Maximum Usage de 200 USD.'],
            ['Muse Spark 1.3 (<code>muse-spark-1.3</code>)', 'API de modelos de Meta y Muse Code', 'Modelo anterior y más barato. También existe en variante Contributor.'],
          ],
          caption: 'Fuentes: anuncio de Meta, catálogo de modelos de Meta y Engadget, consultados el 13 de octubre de 2026.',
        },
        {
          type: 'paragraph',
          text: 'Meta compara los dos modelos con Claude Fable 5.1, GPT-6 Astra y Claude Opus 5.5. La siguiente sección muestra los resultados de programación.',
        },
      ],
    },
    {
      id: 'benchmarks',
      title: 'Benchmarks de Muse Wonder para programar',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://research.meta.ai/static/muse-wonder-model-card" class="' + link + '">model card de Muse Wonder</a> incluye una tabla de resultados. Todos los modelos usaron el razonamiento máximo. Meta eligió los benchmarks y algunas pruebas de la competencia las hizo ella misma de forma orientativa, así que tómalas como la visión del fabricante.',
        },
        {
          type: 'image',
          src: '/images/guides/muse-wonder-benchmarks-es.webp',
          alt: 'Gráfico de barras con benchmarks de programación de Muse Wonder Full, Muse Wonder, Claude Fable 5.1, GPT-6 Astra y Claude Opus 5.5',
          size: 'full',
          caption: 'Gráfico de CodeAgentSwarm con los datos de la model card de Muse Wonder publicada por Meta el 12 de octubre de 2026.',
        },
        {
          type: 'table',
          headers: ['Benchmark', 'Wonder Full', 'Wonder', 'Fable 5.1', 'GPT-6 Astra', 'Opus 5.5'],
          rows: [
            ['Terminal-Bench 4.0-AA', '57,1', '52,0', '52,0', '59,1', '59,6'],
            ['DeepSWE 1.1', '79,0', '78,8', '67,4', '74,1', '74,2'],
            ['SWE-Marathon', '57,5', '53,1', '45,6', '42,5', '46,3'],
            ['ProgramBench', '59,0', '50,0', '55,5', '52,5', '70,5'],
            ['MemoryBench', '85,5', '85,6', '79,0', '81,4', '81,5'],
            ['Artificial Analysis Index', '56', '52', '53', '53', '58'],
          ],
          caption: 'Fuente: model card de Muse Wonder. MemoryBench es un benchmark interno de Meta. SWE-Marathon mezcla entornos de agente y Wonder Full usó el nivel xhigh.',
        },
        {
          type: 'paragraph',
          text: 'En programación, el resultado es desigual. Muse Wonder va por delante en tareas largas: 78,8 en DeepSWE 1.1 frente a 74,2 de Opus 5.5, y 53,1 en SWE-Marathon frente a 46,3. Va por detrás de Opus 5.5 en Terminal-Bench 4.0 (52,0 frente a 59,6) y en ProgramBench, que reconstruye programas desde cero (50,0 frente a 70,5).',
        },
        {
          type: 'paragraph',
          text: 'El Artificial Analysis Index es la única cifra independiente. <a href="https://artificialanalysis.ai/models/muse-wonder" class="' + link + '">Artificial Analysis</a> da a Muse Wonder 52 puntos, el noveno de 216 modelos de su ranking, y a Wonder Full 56. Claude Opus 5.5 saca 58. Ningún modelo gana en todas las filas, así que prueba los mejores en tu propio repositorio.',
        },
      ],
    },
    {
      id: 'precios',
      title: 'Cuánto cuesta Muse Wonder',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://dev.meta.ai/docs/pricing-rate-limits" class="' + link + '">tabla de precios de la API</a> da estas tarifas en dólares por cada millón de tokens. La entrada sin caché de Wonder cuesta 3,2 veces la de Spark, y la salida, 4,7 veces.',
        },
        {
          type: 'table',
          headers: ['Tipo de token', 'Muse Wonder 1.0', 'Muse Spark 1.3'],
          rows: [
            ['Entrada sin caché', '4,00 USD', '1,25 USD'],
            ['Entrada en caché', '0,20 USD', '0,15 USD'],
            ['Salida', '20,00 USD', '4,25 USD'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Imagina una tarea pequeña que gasta 200.000 tokens de entrada sin caché y 20.000 de salida. Con Wonder cuesta <code>0,2 × 4 + 0,02 × 20 = 1,20 USD</code>. Con Spark cuesta <code>0,2 × 1,25 + 0,02 × 4,25 = 0,335 USD</code>. Es la cuenta de una carga concreta, no una previsión. Un modelo más capaz puede salir más barato por tarea terminada si necesita menos intentos.',
        },
        {
          type: 'paragraph',
          text: 'Las suscripciones de Muse Code son otra vía. Meta ofrece los planes Everyday Usage, High Usage, Power Usage y Maximum Usage, y avisa de que las ventajas pueden cambiar según la región. Mira el precio que te aparezca al darte de alta. La <a href="/es/guias/muse-code-modelos-precios-privacidad" class="' + link + '">guía de modelos, precios y privacidad</a> explica la diferencia entre la credencial de la suscripción y una clave de API.',
        },
      ],
    },
    {
      id: 'probar-en-muse-code',
      title: 'Empieza una tarea de código con Muse Wonder',
      content: [
        {
          type: 'paragraph',
          text: 'Primero instala Muse Code e inicia sesión. La <a href="/es/guias/como-usar-muse-code" class="' + link + '">guía de la primera tarea</a> explica los dos pasos. Después abre una sesión en tu proyecto y elige Wonder de forma explícita:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'cd /ruta/a/tu/proyecto\nmuse --model muse-wonder-1.0 --reasoning-effort high',
        },
        {
          type: 'paragraph',
          text: 'Dentro de una sesión abierta, usa <code>/models</code> para cambiar de modelo. Desde Muse Code 1.4.5 también funciona <code>/model muse-wonder-1.0</code>. Si tu plan incluye Wonder Full, búscalo en <code>/models</code>. El catálogo de Meta no publica su identificador, así que esta guía no inventa uno.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'La lista de modelos depende de tu cuenta y del despliegue de Meta. El 13 de octubre de 2026, nuestra cuenta de prueba con Muse Code 1.4.6 aún mostraba solo <code>muse-spark-1.3</code>. Comprueba <code>/models</code> antes de poner el identificador de Wonder en un script.',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Averigua por qué falla el test de exportación CSV con fechas anteriores a 1970.\nExplica la cadena de llamadas antes de editar.\nHaz una sola corrección y ejecuta el test afectado.\nResume el diff, el resultado del test y cualquier suposición pendiente.',
        },
        {
          type: 'paragraph',
          text: 'Un encargo así tiene una meta clara. Eso facilita comparar Wonder con el modelo que usas hoy.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Usa Muse Wonder dentro de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/es" class="' + link + '">CodeAgentSwarm</a> incluye Muse Code como uno de sus agentes desde la versión 2.4.0, en macOS, Windows y Linux. No sustituye a la CLI ni vende acceso a modelos: arranca el programa oficial <code>muse</code> con tu propia cuenta de Meta. En la vista Chat, el menú de modelo muestra los modelos que devuelve tu cuenta de Muse. Cuando Wonder aparece en esa lista, lo eliges como cualquier otro.',
        },
        {
          type: 'image',
          src: '/images/guides/muse-wonder-chat.webp',
          alt: 'CodeAgentSwarm en modo List con un Chat de Muse Code usando muse-wonder-1.0 junto a sesiones de otros agentes',
          size: 'full',
          caption: 'Captura ilustrativa: tareas de ejemplo y lista de modelos simulada. Tu menú muestra los modelos que devuelve tu cuenta de Muse.',
        },
        {
          type: 'list',
          items: [
            'Instala Muse Code e inicia sesión una vez desde un terminal normal.',
            'En CodeAgentSwarm, pulsa New Agent y elige Muse Code.',
            'Abre el menú de modelo en el cuadro de texto del Chat y elige <code>muse-wonder-1.0</code> si tu cuenta lo ofrece.',
            'Ajusta el nivel de razonamiento al lado. Los niveles altos gastan más tokens.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Las sesiones nuevas de Muse empiezan con <code>muse-spark-1.3</code> salvo que elijas otro modelo, y CodeAgentSwarm nunca te pasa a Contributor sin preguntar. La vista Terminal ejecuta la misma CLI, así que <code>/models</code> también funciona ahí.',
        },
      ],
    },
    {
      id: 'sin-atarte',
      title: 'El mejor modelo de hoy no lo será siempre',
      content: [
        {
          type: 'paragraph',
          text: 'Cada vez salen modelos de frontera nuevos con más frecuencia. Hoy Muse Wonder puede ser lo que mejor encaja con tu trabajo. El mes que viene puede ser un nuevo modelo de Claude, GPT o Gemini. Si tus herramientas solo hablan con un proveedor, cada cambio supone empezar de cero con otra configuración y un historial vacío.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm funciona sobre las CLI oficiales: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi y Devin CLI. Los proyectos, el tablero de tareas, las notificaciones y el historial con búsqueda siguen igual elijas el agente que elijas. Cada proveedor conserva su propio login y su facturación.',
        },
        {
          type: 'image',
          src: '/images/guides/muse-wonder-model-menu.webp',
          alt: 'Menú de modelo del Chat de CodeAgentSwarm con los modelos de Muse y la sección Continue in another LLM con Claude Code, Codex, Antigravity y OpenCode',
          size: 'full',
          caption: 'Captura ilustrativa con lista de modelos simulada: primero los modelos de Muse y después, en Continue in another LLM, los demás agentes instalados.',
        },
        {
          type: 'paragraph',
          text: 'Ese mismo menú tiene la sección <strong>Continue in another LLM</strong>. Si eliges ahí Claude Code o Codex, por ejemplo, CodeAgentSwarm abre una sesión nueva con ese agente. Le pasa un resumen con la petición original, tus últimas indicaciones y los puntos clave, además de la transcripción completa como referencia local. La conversación de Muse se queda como estaba. Sirve para pedir una segunda revisión de un diff de Muse o para seguir trabajando cuando un proveedor llega a su límite de uso.',
        },
      ],
    },
    {
      id: 'comparar',
      title: 'Compara Wonder con el modelo que usas ahora',
      content: [
        {
          type: 'paragraph',
          text: 'Lanza la misma tarea dos veces desde el mismo commit: una con Muse Wonder y otra con tu agente actual. Usa worktrees de Git separados para que los cambios no choquen. CodeAgentSwarm puede crear un worktree para cada sesión.',
        },
        {
          type: 'list',
          items: [
            '¿La corrección es buena y el test afectado pasa?',
            '¿Cuánto tiempo te llevó revisarla?',
            '¿Cuántos tokens o cuánto uso del plan consumió la tarea entera, contando los intentos fallidos?',
          ],
        },
        {
          type: 'paragraph',
          text: 'Quédate con el ganador para ese tipo de tarea y repite la prueba cuando salga el siguiente modelo. Para las condiciones de datos de cada modelo de Muse, lee <a href="/es/guias/muse-code-modelos-precios-privacidad" class="' + link + '">Muse Code: modelos, precios y privacidad</a>. Para trabajar con varios agentes a la vez, mira <a href="/es/guias/enjambre-de-agentes-cli-ia" class="' + link + '">la guía del enjambre de agentes CLI</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es Muse Wonder?',
      answer: 'Muse Wonder es el nuevo modelo de frontera de Meta para agentes, lanzado el 12 de octubre de 2026. Está disponible en la API de modelos de Meta y en Muse Code con el identificador muse-wonder-1.0.',
    },
    {
      question: '¿Qué diferencia hay entre Muse Wonder y Muse Wonder Full?',
      answer: 'Wonder está disponible en la API y en Muse Code. Wonder Full es la versión más grande y solo está disponible para suscriptores de Muse Code. Meta no ofrece Full por la API.',
    },
    {
      question: '¿Muse Wonder programa mejor que Claude Opus 5.5?',
      answer: 'Depende de la tarea. En la tabla de Meta, Muse Wonder supera a Opus 5.5 en DeepSWE 1.1 (78,8 frente a 74,2) y en SWE-Marathon (53,1 frente a 46,3), pero queda por detrás en Terminal-Bench 4.0 (52,0 frente a 59,6) y en ProgramBench (50,0 frente a 70,5). Prueba los dos en tu propio repositorio.',
    },
    {
      question: '¿Cuánto cuesta Muse Wonder?',
      answer: 'En la API de modelos de Meta cuesta 4,00 USD por millón de tokens de entrada sin caché, 0,20 USD por millón de tokens de entrada en caché y 20,00 USD por millón de tokens de salida, consultado el 13 de octubre de 2026.',
    },
    {
      question: '¿Puedo usar Muse Wonder en CodeAgentSwarm?',
      answer: 'Sí, desde CodeAgentSwarm 2.4.0, cuando tu cuenta de Muse ofrezca el modelo. Elige muse-wonder-1.0 en el menú de modelo del Chat o usa /models en la vista Terminal. El acceso y la facturación siguen en tu cuenta de Meta.',
    },
    {
      question: '¿CodeAgentSwarm me ata a Muse?',
      answer: 'No. CodeAgentSwarm ejecuta las CLI oficiales de varios proveedores, como Claude Code, Codex CLI y Muse Code. Puedes abrir otro agente cuando quieras o continuar una conversación en otro LLM desde el menú de modelo del Chat.',
    },
  ],
}

export default guide
