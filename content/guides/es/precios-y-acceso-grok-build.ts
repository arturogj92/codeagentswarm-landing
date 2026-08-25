import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-acceso-grok-build',
    locale: 'es',
    title: 'Precios y acceso de Grok Build: qué te da cada plan de xAI',
    metaTitle: 'Precios de Grok Build: gratis, SuperGrok y API (2026)',
    metaDescription: 'Grok Build se puede probar gratis. Compara Free, SuperGrok por 30 $, SuperGrok Plus por 100 $ y el precio actual de la API de Grok 4.6.',
    intro: `Grok Build ya se puede probar gratis. xAI también ofrece SuperGrok por 30 $/mes y SuperGrok Plus por 100 $/mes para obtener más uso, además de otros niveles individuales y empresariales en su comparador en vivo. Para automatización existe una vía aparte de pago por token mediante la API de xAI.

Antes de nada, la desambiguación que casi ninguna página hace. Hay tres cosas distintas que se llaman Grok: el <strong>chatbot Grok</strong> (la app de chat de consumo de xAI), <strong>Grok Build</strong> (la CLI oficial de programación de xAI, el comando <code>grok</code>, que es de lo que va esta página y lo que soporta CodeAgentSwarm), y varios proyectos de la comunidad en GitHub sin relación con xAI llamados <code>grok-cli</code>. Si instalas el que no es, nada de lo que hay aquí aplica.

Las fuentes vigentes son la <a href="https://x.ai/build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página de Grok Build</a> y el <a href="https://x.ai/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">comparador de planes</a> de xAI. Los artículos que presentan Grok Build como una herramienta solo de pago ya están desactualizados.`,
    ctaText: 'CodeAgentSwarm es un espacio de trabajo sobre tu acceso a xAI, no un revendedor. Tú aportas una cuenta de xAI o una clave de API; nosotros añadimos supervisión multi-terminal, visibilidad de cuota e historial buscable.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Precios', 'acceso', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-08-25',
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
  ],
}

export default guide
