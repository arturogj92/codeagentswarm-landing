import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'precios-y-acceso-grok-build',
    locale: 'es',
    title: 'Precios y acceso de Grok Build: qué te da cada plan de xAI',
    metaTitle: 'Precios de Grok Build: SuperGrok, X Premium+ y Heavy (2026)',
    metaDescription: 'Todas las vías de acceso a Grok Build: SuperGrok por 30 $, X Premium+ por 40 $, SuperGrok Heavy por 300 $, y la API de xAI para CI. Qué está verificado y qué no.',
    intro: `No existe una suscripción independiente a Grok Build. El acceso viaja dentro de un plan de xAI o de X, y a agosto de 2026 eso significa: SuperGrok por 30 $/mes, X Premium+ por 40 $/mes, o SuperGrok Heavy por 300 $/mes con los límites más altos. Para automatización hay una vía aparte de pago por token a través de la API de xAI.

Antes de nada, la desambiguación que casi ninguna página hace. Hay tres cosas distintas que se llaman Grok: el <strong>chatbot Grok</strong> (la app de chat de consumo de xAI), <strong>Grok Build</strong> (la CLI oficial de programación de xAI, el comando <code>grok</code>, que es de lo que va esta página y lo que soporta CodeAgentSwarm), y varios proyectos de la comunidad en GitHub sin relación con xAI llamados <code>grok-cli</code>. Si instalas el que no es, nada de lo que hay aquí aplica.

La historia del acceso ya ha cambiado una vez, y saberlo importa más que cualquier cifra suelta: Grok Build salió el 14 de mayo de 2026 restringido solo a SuperGrok Heavy, y diez días después xAI lo abrió a los niveles mucho más baratos SuperGrok y X Premium+. Todo lo escrito en esa primera ventana está desactualizado.`,
    ctaText: 'CodeAgentSwarm es un espacio de trabajo encima de tu acceso a xAI, no un revendedor. Tú aportas SuperGrok, X Premium+ o una clave de API; nosotros añadimos supervisión multi-terminal, visibilidad de cuota e historial buscable.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Precios', 'acceso', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-08-05',
    alternateSlug: 'grok-build-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Los planes de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'Grok Build va empaquetado en las suscripciones de xAI y de X en vez de venderse por su cuenta. A agosto de 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Precio', 'Grok Build', 'Notas'],
          rows: [
            ['Free', '0 $', 'No', 'Solo chat'],
            ['SuperGrok', '30 $/mes', 'Sí', 'La entrada más barata'],
            ['X Premium+', '40 $/mes', 'Sí', 'El mismo acceso a la CLI, con X incluido'],
            ['SuperGrok Heavy', '300 $/mes', 'Sí', 'Los límites más altos; el único nivel al lanzarse'],
            ['API de xAI', 'Por token', 'Sí, headless', 'Para CI y automatización'],
          ],
          caption: 'Vías de acceso a Grok Build, agosto de 2026. Verifícalo en tu cuenta de xAI antes de presupuestar un despliegue.',
        },
        {
          type: 'paragraph',
          text: 'Dos cosas que merece la pena destacar. Primera, <strong>SuperGrok por 30 $ y X Premium+ por 40 $ desbloquean la misma CLI</strong>, así que si por lo demás no te interesa X, SuperGrok es la puerta barata. Segunda, el nivel Heavy de 300 $ no es otro producto; es el mismo Grok Build con límites mucho más altos, cosa que solo importa si tienes agentes trabajando prácticamente sin parar.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'xAI se mueve rápido y ya ha cambiado el acceso a esta CLI una vez. Trata la tabla de arriba como algo fechado y no permanente, y confírmalo en tu propia cuenta antes de comprometer a un equipo. Si una página cita "peticiones por hora" exactas de Grok Build sin una fuente primaria de xAI, dala por caducada.',
        },
      ],
    },
    {
      id: 'lo-que-no-se-sabe',
      title: 'Qué está publicado y qué no',
      content: [
        {
          type: 'paragraph',
          text: 'Esta guía da precios porque los precios están publicados. Lo que no da a propósito es una cuota de peticiones, porque xAI no publica ninguna para Grok Build en ningún nivel, y todo artículo que dé un número concreto se lo ha inventado.',
        },
        {
          type: 'paragraph',
          text: 'Lo que sí se observa es la forma de la medición: <strong>el consumo se lleva en un ciclo semanal</strong>, igual que hacen Anthropic y Moonshot con sus agentes de programación. Así que el consejo práctico se traslada. Tu ritmo de consumo depende de cuántos agentes lleves en paralelo mucho más que de cuántas horas estés al teclado, porque cada agente lee ficheros, ejecuta herramientas y razona por su cuenta.',
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
          text: 'Para cualquier cosa sin supervisión, <code>XAI_API_KEY</code> es el camino headless y cambia la cuota de la suscripción por facturación por token. A agosto de 2026 el modelo de programación cuesta alrededor de 0,20 $ por millón de tokens de entrada y 1,50 $ por millón de salida.',
        },
        {
          type: 'paragraph',
          text: 'Son tarifas agresivas para lo que se estila en esta categoría, y eso hace la API genuinamente atractiva en vez de un recurso de emergencia. Compáralo con <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">las tarifas de Claude Code</a>, donde la salida va un orden de magnitud por encima.',
        },
        {
          type: 'paragraph',
          text: 'Aplica el intercambio de siempre: una suscripción se para cuando chocas con el muro, una clave de API sigue y te factura. Para un pipeline de CI eso es justo lo que quieres, porque una compilación no debería fallar porque a una persona se le haya agotado su asignación personal. Pon un límite de gasto en xAI y guarda la clave en el gestor de secretos de CI, no en la shell donde programas.',
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
          text: 'Lo que sí añade es lo que una cuota semanal hace valioso: la app lee tu consumo real de SuperGrok y lo muestra junto al de tus otros agentes, así ves venir el muro mientras los agentes trabajan en vez de descubrirlo por un terminal parado.',
        },
      ],
    },
    {
      id: 'comparacion',
      title: 'Cómo se compara el precio de Grok Build',
      content: [
        {
          type: 'paragraph',
          text: 'Frente a las demás CLI, Grok Build se sitúa en la parte cara del nivel de entrada y en la barata de la API.',
        },
        {
          type: 'list',
          items: [
            '<strong>El precio de entrada es el más alto de la categoría.</strong> 30 $ frente a los 20 $ de <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> y <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, y los 8 $ de <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a> en su plan Go.',
            '<strong>No hay nivel gratuito.</strong> Como Claude Code y al revés que Antigravity, no puedes evaluar Grok Build sin pagar.',
            '<strong>La API le gana a todos.</strong> A unos 0,20 $ y 1,50 $ por millón de tokens es drásticamente más barata por token que las alternativas de frontera, lo que la convierte en una buena candidata para automatización aunque uses otra cosa de forma interactiva.',
            '<strong>El nivel máximo juega en otra liga.</strong> 300 $ el Heavy frente a los 200 $ de los niveles más caros de Claude y ChatGPT.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La lectura honesta: Grok Build no es la forma más barata de tener un agente, y sí es una buena candidata para la mitad de automatización de un montaje mixto. Usarlo junto a otro agente además significa dos cuotas completamente separadas, así que agotar una rara vez detiene toda la sesión, que es el argumento de <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre multi-CLI</a>.',
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
          content: 'Si falla la autenticación, comprueba el estado de tu suscripción en la cuenta de xAI o de X antes de depurar cualquier otra cosa. Un plan caducado y una instalación rota se ven exactamente igual desde el terminal.',
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
      answer: 'No. No hay nivel gratuito ni suscripción independiente a Grok Build. La vía más barata es SuperGrok por 30 $/mes, con X Premium+ por 40 $/mes desbloqueando la misma CLI, o una clave de API de xAI de pago por token para uso headless.',
    },
    {
      question: '¿Cuánto cuesta Grok Build al mes?',
      answer: 'A agosto de 2026: SuperGrok 30 $, X Premium+ 40 $, y SuperGrok Heavy 300 $ para los límites más altos. Los tres desbloquean la misma CLI; los niveles se diferencian en cuánto puedes usarla.',
    },
    {
      question: '¿Qué diferencia hay entre SuperGrok y X Premium+ para Grok Build?',
      answer: 'Para el acceso a la CLI, ninguna: los dos desbloquean Grok Build. X Premium+ cuesta 10 $ más e incluye funciones de X. Si no las quieres, SuperGrok es la puerta barata.',
    },
    {
      question: '¿Cuántas peticiones permite Grok Build?',
      answer: 'xAI no publica una cuota de peticiones para Grok Build en ningún nivel, así que cualquier artículo que dé un número concreto se lo ha inventado. Lo que sí se observa es que el consumo se mide en un ciclo semanal, y que los agentes en paralelo lo queman varias veces más rápido que un solo terminal.',
    },
    {
      question: '¿Puedo usar una clave de API en vez de una suscripción?',
      answer: 'Sí, para uso headless y de CI con XAI_API_KEY, facturado por token a unos 0,20 $ por millón de entrada y 1,50 $ por millón de salida. El login interactivo por navegador sigue siendo lo normal para personas. Usar los dos es un montaje válido: la suscripción para tu portátil y una clave con tope para el pipeline.',
    },
    {
      question: '¿CodeAgentSwarm incluye consumo de Grok?',
      answer: 'No. CodeAgentSwarm es el espacio de trabajo, no un revendedor. El consumo del modelo lo factura xAI o va contra tu propia clave de API, y ejecutar cuatro terminales de Grok Build no añade ninguna tarifa de enjambre por encima de tu asignación.',
    },
  ],
}

export default guide
