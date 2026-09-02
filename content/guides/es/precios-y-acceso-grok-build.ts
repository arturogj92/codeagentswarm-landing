import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-acceso-grok-build',
    locale: 'es',
    title: 'Precios y acceso de Grok Build: planes, coste de API y agentes en paralelo',
    metaTitle: 'Precios de Grok Build 2026: gratis, SuperGrok y API',
    metaDescription: 'Grok Build se prueba gratis. SuperGrok 30 $, SuperGrok Plus 100 $, API 2 $ entrada y 6 $ salida. Y qué le hacen a tus límites varias sesiones a la vez.',
    intro: `Grok Build ya se puede probar gratis. xAI también ofrece SuperGrok por 30 $/mes y SuperGrok Plus por 100 $/mes para obtener más uso, además de otros niveles individuales y empresariales en su comparador en vivo. Para automatización existe una vía aparte de pago por token mediante la API de xAI.

Antes de nada, la desambiguación que casi ninguna página hace. Hay tres cosas distintas que se llaman Grok: el <strong>chatbot Grok</strong> (la app de chat de consumo de xAI), <strong>Grok Build</strong> (la CLI oficial de programación de xAI, el comando <code>grok</code>, que es de lo que va esta página y lo que soporta CodeAgentSwarm), y varios proyectos de la comunidad en GitHub sin relación con xAI llamados <code>grok-cli</code>. Si instalas el que no es, nada de lo que hay aquí aplica.

Las fuentes vigentes son la <a href="https://x.ai/build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de Grok Build</a> y el <a href="https://x.ai/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">comparador de planes</a> de xAI. Los artículos que presentan Grok Build como una herramienta solo de pago ya están desactualizados.`,
    ctaText: 'CodeAgentSwarm es un espacio de trabajo sobre tu acceso a xAI, no un revendedor. Tú aportas una cuenta de xAI o una clave de API; nosotros añadimos supervisión multi-terminal, visibilidad de cuota e historial buscable.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Precios', 'acceso', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-09-01',
    alternateSlug: 'grok-build-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'xAI ofrece Grok Build en todos sus planes, incluido Free, y los planes de pago aportan límites mayores. Las páginas oficiales muestran esta oferta a 25 de agosto de 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Grok Build', 'Notas'],
          rows: [
            ['Free', '0 $', 'Sí', 'Disponible para probar con uso limitado'],
            ['SuperGrok', '30 $/mes', 'Sí', 'Límites de uso más altos'],
            ['SuperGrok Plus', '100 $/mes', 'Sí', 'Mucho más uso en Build y otras funciones de xAI'],
            ['Otros niveles individuales', 'Consulta el checkout', 'Comprueba tu cuenta', 'El precio público de Lite y Heavy puede variar o no aparecer en el texto de la página'],
            ['API de xAI', 'Por token', 'Sí, headless', 'Para CI y automatización'],
          ],
          caption: 'Vías de acceso a Grok Build verificadas el 25 de agosto de 2026. Revisa la página en vivo antes de presupuestar un despliegue.',
        },
        {
          type: 'paragraph',
          text: 'El cambio importante es que ya no hace falta pagar para evaluar la herramienta. SuperGrok aumenta los límites y SuperGrok Plus incluye mucho más uso en Build, Chat, Imagine y Voice. xAI muestra Lite y Heavy en su comparador, pero no publica un precio estable para todos los niveles en el texto de la página, así que usa el checkout en vivo para esos planes.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'xAI cambia sus planes con rapidez. Trata la tabla como una foto fechada y confirma el checkout antes de comprometer a un equipo. Si una página dice que Grok Build es solo de pago o cita peticiones exactas sin una fuente primaria de xAI, dala por caducada.',
        },
      ],
    },
    {
      id: 'lo-que-no-se-sabe',
      title: 'Qué está publicado y qué no',
      content: [
        {
          type: 'paragraph',
          text: 'Esta guía da los precios que xAI publica. No inventa una cuota de peticiones porque xAI describe los límites de forma relativa y no publica una cifra estable para cada nivel de Grok Build.',
        },
        {
          type: 'paragraph',
          text: 'El consejo práctico sigue siendo válido: tu ritmo de consumo depende de cuántos agentes lleves en paralelo, porque cada uno lee ficheros, ejecuta herramientas y razona por su cuenta. Consulta la vista de uso de tu cuenta en vez de presupuestar desde un artículo antiguo.',
        },
        {
          type: 'paragraph',
          text: 'Si estás presupuestando un flujo de agentes en paralelo, ese es el número que decide tu nivel, y es el argumento que desarrolla <a href="/es/guias/enjambre-de-agentes-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Grok Build</a>.',
        },
      ],
    },
    {
      id: 'via-api',
      title: 'La vía de pago por token: la API de xAI',
      content: [
        {
          type: 'paragraph',
          text: 'Para trabajo sin supervisión, <code>XAI_API_KEY</code> es la vía headless y cambia los límites de la cuenta por facturación por token. Grok Build usa ahora Grok 4.6. Su tarifa estándar es de 2 $ por millón de tokens de entrada, 0,50 $ por millón de entrada en caché y 6 $ por millón de salida, con un precio mayor cuando una petición supera 200K de contexto.',
        },
        {
          type: 'paragraph',
          text: 'Grok 4.6 tiene una ventana de contexto de 500K. Su entrada de 2 $ iguala a Claude Sonnet 5 y su salida de 6 $ cuesta menos. Compáralo con <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">las tarifas de Claude Code</a> antes de elegir un modelo para CI.',
        },
        {
          type: 'paragraph',
          text: 'La clave de API sigue funcionando mientras haya saldo y margen de uso, así que la automatización necesita presupuesto y alertas. Pon un límite de gasto en xAI y guarda la clave en el gestor de secretos de CI, no en la shell donde programas.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Interactivo: login por navegador en el primer arranque\ngrok\n\n# Headless / CI\nexport XAI_API_KEY=...\ngrok -p "ejecuta la migración y dime qué ha cambiado"',
        },
      ],
    },
    {
      id: 'agentes-paralelos',
      title: 'Qué le hace al coste ejecutar varias sesiones de Grok Build a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Con un plan, las sesiones extra no añaden ninguna tarifa. Consumen más rápido la misma asignación de la cuenta, porque cada agente lee ficheros, ejecuta herramientas y razona por su cuenta. Cuatro terminales de Grok Build beben exactamente de la asignación de la que beberían cuatro terminales sueltos, así que el número que decide es cuántos agentes tienes ocupados, no en qué app se ejecutan.',
        },
        {
          type: 'paragraph',
          text: 'Con una clave de API el efecto es un coste directo en vez de un muro más temprano. Grok 4.6 cobra 2 $ por millón de tokens de entrada, 0,50 $ por millón de entrada en caché y 6 $ por millón de salida en el tramo estándar de contexto, con precio mayor por encima de 200K, así que el gasto de una hora sigue al número de agentes realmente trabajando.',
        },
        {
          type: 'table',
          headers: ['Sesiones a la vez', 'Qué esperar', 'Qué vigilar'],
          rows: [
            ['1', 'Una sesión contra los límites de tu plan, o un solo flujo de tokens contra la clave de API.', 'Nada raro. Consulta la vista de uso de tu cuenta para ver los límites que te aplican.'],
            ['2 a 3', 'Los límites del plan llegan entre dos y tres veces antes. En la API, el gasto en tokens sube más o menos en la misma proporción.', 'Las peticiones por encima de 200K de contexto cuestan más, y las investigaciones largas llegan antes a ese tramo.'],
            ['4 o más', 'No hay tarifa de enjambre por el lado de xAI, pero la asignación compartida se vacía al ritmo de los agentes ocupados.', 'Con clave de API, pon un límite de gasto en xAI antes de dejar agentes sin supervisión.'],
          ],
          caption: 'Es una regla aproximada, no una cuota publicada. xAI describe los límites de forma relativa y no publica una cifra estable de peticiones para cada nivel de Grok Build.',
        },
        {
          type: 'paragraph',
          text: 'Cómo repartir el trabajo entre esas sesiones, y cómo evitar que se pisen entre ellas, está en <a href="/es/guias/enjambre-de-agentes-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Grok Build</a>.',
        },
      ],
    },
    {
      id: 'coste-de-cas',
      title: 'Qué cuesta CodeAgentSwarm por encima',
      content: [
        {
          type: 'paragraph',
          text: 'Nada por el lado del modelo. <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> no revende tokens de Grok ni se mete entre tú y xAI. Le pagas a xAI o a X por el acceso al modelo, exactamente igual que si ejecutaras <code>grok</code> en un terminal pelado.',
        },
        {
          type: 'paragraph',
          text: 'Ejecutar cuatro terminales de Grok Build dentro de CodeAgentSwarm no añade por tanto ninguna tarifa de enjambre por el lado de xAI. Bebe de la misma asignación de la que beberían cuatro terminales sueltos, solo que con las sesiones etiquetadas, su estado a la vista y su historial buscable.',
        },
        {
          type: 'paragraph',
          text: 'Lo que sí añade es visibilidad del uso: la app muestra el consumo de xAI junto al de tus otros agentes para que puedas reaccionar antes de que una sesión se pare.',
        },
      ],
    },
    {
      id: 'comparacion',
      title: 'Cómo se compara el precio de Grok Build',
      content: [
        {
          type: 'paragraph',
          text: 'Frente a las demás CLI, Grok Build empieza gratis y el tramo estándar de su API cuesta 2 $ por millón de entrada, 0,50 $ por entrada en caché y 6 $ por salida.',
        },
        {
          type: 'list',
          items: [
            '<strong>La evaluación empieza en 0 $.</strong> La página oficial dice que Grok Build está disponible para probar gratis.',
            '<strong>SuperGrok empieza en 30 $.</strong> Está por encima de los planes de entrada de 20 $ de <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> y Cursor, pero no necesitas pagarlo para una primera prueba.',
            '<strong>SuperGrok Plus cuesta 100 $.</strong> Añade mucho más uso en Build y otras funciones de xAI.',
            '<strong>La API actual cuesta 2 $ de entrada y 6 $ de salida.</strong> La entrada en caché cuesta 0,50 $ por millón de tokens y las peticiones por encima de 200K de contexto cuestan más.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La lectura práctica: usa el acceso gratuito para probar Grok Build, paga por límites mayores solo cuando el consumo de tu cuenta lo justifique y reserva la API para automatización controlada. Ejecutarlo junto a otro agente también te da límites de proveedores separados, que es el argumento de <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre multi-CLI</a>.',
        },
        {
          type: 'table',
          headers: ['Agente', 'Nivel gratuito', 'Pago más barato', 'Nivel individual más alto', 'Cómo te facturan'],
          rows: [
            ['Claude Code', 'No (el plan Free no incluye Claude Code)', 'Pro, 20 $/mes', 'Max 20x, 200 $/mes', 'Suscripción con ventanas de 5 horas y semanales; tokens de API opcionales'],
            ['Codex CLI', 'Limitado', 'Go, 8 $/mes', 'Pro, 200 $/mes', 'Suscripción de ChatGPT compartida con la web y el IDE; tokens de API opcionales'],
            ['Kimi Code', 'La CLI es gratis, el uso del modelo no', 'Andante, 49 ¥/mes', 'Allegro, 699 ¥/mes', 'Membresía con límites semanales y de 5 horas; API por token'],
            ['OpenCode', 'La CLI es gratis y de código abierto', 'Ninguno, pago por uso', 'Ninguno', 'Tu propia clave de proveedor, o saldo prepago por token en OpenCode Zen'],
            ['Antigravity', 'Sí, con límites de frecuencia semanales', 'Google AI Plus, unos 8 $/mes', 'Google AI Ultra 20x, 200 $/mes', 'Plan de Google AI con límites de frecuencia y créditos'],
            ['Grok Build', 'Sí, con uso limitado', 'SuperGrok, 30 $/mes', 'SuperGrok Plus, 100 $/mes', 'Límites del plan de xAI; API por token'],
            ['Cursor Agent', 'Hobby, gratis', 'Pro, 20 $/mes', 'Ultra, 200 $/mes', 'Plan de Cursor con pozos de uso por modelo'],
          ],
          caption: 'Niveles de entrada y superiores de cada CLI de agente, verificados el 25 de agosto de 2026. Los precios cambian a menudo; cada guía enlazada lleva su propia fecha de verificación.',
        },
        {
          type: 'paragraph',
          text: 'Cada cifra de esa tabla tiene su propia página con la lista completa de niveles y la letra pequeña: <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/es/guias/planes-y-precios-de-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/es/guias/planes-y-precios-de-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a> y <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI</a>.',
        },
      ],
    },
    {
      id: 'como-verificar',
      title: 'Cómo verificarlo en tu máquina',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# ¿Qué CLI tienes en realidad?\ngrok --version\n\n# El primer arranque interactivo saca la autenticación si no has entrado\ngrok',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si falla la autenticación, comprueba que la cuenta de xAI tenga acceso a Grok Build o que la clave de API tenga saldo antes de depurar la instalación.',
        },
        {
          type: 'paragraph',
          text: 'Grok Build guarda sus datos en <code>~/.grok</code>, reubicable con <code>GROK_HOME</code>. Ahí es también donde viven las sesiones, cosa que importa cuando quieres encontrar una antigua: mira <a href="/es/guias/historial-conversaciones-grok-build" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del historial de conversaciones de Grok Build</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Grok Build es gratis?',
      answer: 'Sí. xAI indica que Grok Build está disponible para probar gratis. SuperGrok por 30 $/mes y SuperGrok Plus por 100 $/mes aumentan los límites, mientras una clave de API de xAI ofrece pago por token para trabajo headless.',
    },
    {
      question: '¿Cuánto cuesta Grok Build al mes?',
      answer: 'A 25 de agosto de 2026, Grok Build está disponible en todos los planes, incluido Free. xAI muestra SuperGrok por 30 $/mes y SuperGrok Plus por 100 $/mes. Otros niveles individuales aparecen en el comparador en vivo, así que verifica sus precios de checkout antes de pagar.',
    },
    {
      question: '¿Qué añade SuperGrok Plus para Grok Build?',
      answer: 'xAI describe SuperGrok Plus como mucho más uso en Build, Chat, Imagine y Voice, además de acceso prioritario y respuestas más rápidas. Cuesta 100 $/mes frente a los 30 $/mes de SuperGrok.',
    },
    {
      question: '¿Cuántas peticiones permite Grok Build?',
      answer: 'xAI no publica una cifra estable de peticiones para todos los niveles de Grok Build. Los límites varían por plan y pueden cambiar, así que consulta la vista de uso de tu cuenta. Los agentes en paralelo consumen la misma asignación más rápido que un terminal.',
    },
    {
      question: '¿Puedo usar una clave de API en vez de una suscripción?',
      answer: 'Sí. La API de Grok 4.6 cuesta 2 $ por millón de tokens de entrada, 0,50 $ por millón de entrada en caché y 6 $ por millón de salida en el tramo estándar de contexto. Las peticiones por encima de 200K cuestan más. Usa una clave con tope en el pipeline y el login de cuenta para el trabajo interactivo.',
    },
    {
      question: '¿CodeAgentSwarm incluye consumo de Grok?',
      answer: 'No. CodeAgentSwarm es el espacio de trabajo, no un revendedor. El consumo del modelo lo factura xAI o va contra tu propia clave de API, y ejecutar cuatro terminales de Grok Build no añade ninguna tarifa de enjambre por encima de tu asignación.',
    },
    {
      question: '¿Hay suscripción de Grok Build?',
      answer: 'No una propia. Grok Build viene con tu plan de xAI: Free con uso limitado, SuperGrok por 30 $/mes y SuperGrok Plus por 100 $/mes, con otros niveles individuales en el comparador en vivo. La clave de API de xAI es la vía aparte de pago por token para trabajo headless.',
    },
    {
      question: '¿Grok Build cuesta más si ejecuto varias sesiones a la vez?',
      answer: 'Con un plan no hay tarifa extra, pero los límites compartidos de la cuenta llegan antes porque cada sesión lee ficheros, ejecuta herramientas y razona por su cuenta. Con clave de API es coste directo: Grok 4.6 cobra 2 $ por millón de tokens de entrada y 6 $ por millón de salida en el tramo estándar, y más por encima de 200K de contexto.',
    },
  ],
}

export default guide
