import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'enjambre-de-agentes-antigravity',
    locale: 'es',
    title: 'Enjambre de agentes Antigravity: varias sesiones de agy en paralelo',
    metaTitle: 'Enjambre de agentes Antigravity: varias sesiones de agy (2026)',
    metaDescription: 'Cómo ejecutar varios agentes de Antigravity CLI a la vez: aislamiento con worktrees, por qué el modo de aprobación no escala, cómo repartir el trabajo y mantener todo supervisable.',
    intro: `Un enjambre de Antigravity son varias sesiones de <code>agy</code> trabajando a la vez, cada una en su tarea y cada una en su directorio aislado. Cada sesión es un proceso independiente, así que nada dentro de Antigravity te impide hacerlo hoy mismo.

Lo que frena a casi todo el mundo no es el agente, es todo lo que hay alrededor: agentes editándose los ficheros entre ellos, cuatro terminales sin forma de saber cuál es cuál, ninguna notificación cuando alguno termina, y confirmaciones que convierten cuatro agentes trabajando en cuatro procesos esperando a un humano.

Esta guía cubre las tres cosas que hacen que un enjambre funcione de verdad y no solo se ejecute: aislamiento para que los agentes no choquen, autonomía para que no se bloqueen en ti, y visibilidad para que puedas supervisarlos sin tener que mirarlos.`,
    ctaText: 'Un enjambre solo sirve si lo puedes ver. CodeAgentSwarm ejecuta cada sesión de Antigravity en su propio terminal etiquetado con estado en vivo, notificaciones de escritorio e historial buscable de todas ellas.',
    ctaAgent: 'antigravity',
    highlightedWords: ['enjambre', 'agentes', 'Antigravity'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    alternateSlug: 'antigravity-agent-swarm',
  },
  sections: [
    {
      id: 'por-que-en-paralelo',
      title: 'Por qué agentes en paralelo, y de dónde sale la ganancia de verdad',
      content: [
        {
          type: 'paragraph',
          text: 'La razón intuitiva para ejecutar varios agentes es el rendimiento: cuatro agentes deberían sacar cuatro veces el trabajo. En la práctica no es de ahí de donde viene la mayor parte de la ganancia, porque tú sigues siendo el cuello de botella al revisar lo que producen.',
        },
        {
          type: 'paragraph',
          text: 'La ganancia real es <strong>eliminar tu propio tiempo muerto</strong>. Un solo agente te deja esperando: piensa, lee ficheros, ejecuta una suite de tests, y durante todo eso tú no haces nada útil. Con tres sesiones, prácticamente siempre hay una que necesita tu atención, y las otras dos siguen trabajando mientras la atiendes. Dejas de esperar a los agentes y los agentes empiezan a esperarte a ti, que es la dirección correcta de esa relación.',
        },
        {
          type: 'paragraph',
          text: 'Ese replanteamiento te dice cómo repartir el trabajo. Las tareas independientes y largas son ideales, porque maximizan el tiempo que cada agente pasa sin necesitarte. Las tareas que piden dirección constante van peor en enjambre que en solitario, porque acabas cambiando de contexto entre tres planes a medio formar.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Tres agentes es el punto dulce para casi todo el mundo. Dos no bastan para eliminar el tiempo muerto; cinco o más pasan del punto en que una sola persona puede tener tres bases de código en la cabeza, y la cola de revisión se convierte en el nuevo cuello de botella.',
        },
      ],
    },
    {
      id: 'aislamiento',
      title: 'Aislamiento: un worktree por agente, no un solo checkout',
      content: [
        {
          type: 'paragraph',
          text: 'Esta es la parte que la gente se salta y luego lamenta. Si dos sesiones de <code>agy</code> corren en el mismo directorio, editan los mismos ficheros. Ninguna sabe de la otra, así que el agente A lee un fichero, el agente B lo reescribe, y el agente A escribe encima una versión basada en lo que leyó hace un minuto. No falla nada. Simplemente acabas con un árbol de trabajo que contiene dos cambios aplicados a medias y sin forma de separarlos.',
        },
        {
          type: 'paragraph',
          text: 'La solución es un <strong>worktree de git por agente</strong>: cada sesión tiene su propio directorio en su propia rama, compartiendo un único repositorio y un único almacén de objetos.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Un worktree por tarea, cada uno en su rama\ngit worktree add ../proy-auth  -b feature/auth\ngit worktree add ../proy-api   -b feature/api\ngit worktree add ../proy-docs  -b chore/docs\n\n# Y luego un agente en cada uno\ncd ../proy-auth && agy\ncd ../proy-api  && agy\ncd ../proy-docs && agy',
        },
        {
          type: 'paragraph',
          text: 'Esto te da tres propiedades que importan: los agentes físicamente no pueden tocarse los ficheros entre ellos, cada uno produce una rama que puedes revisar y fusionar por separado, y una sesión que sale mal se descarta borrando un worktree en vez de desenredando un árbol compartido.',
        },
        {
          type: 'paragraph',
          text: 'La mecánica completa, incluida la trampa en la que un worktree confunde a las herramientas haciéndoles creer que es otro proyecto, está en <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía de worktrees</a>.',
        },
      ],
    },
    {
      id: 'autonomia',
      title: 'Autonomía: el modo de aprobación no escala más allá de un agente',
      content: [
        {
          type: 'paragraph',
          text: 'Por defecto <code>agy</code> pregunta antes de cambiar nada. Con un agente eso es un proceso de revisión razonable. Con cuatro es un desastre, y la aritmética merece decirse claramente: <strong>cuatro agentes en modo de aprobación no te dan cuatro veces el rendimiento, te dan un humano dando vueltas entre cuatro procesos bloqueados</strong>. Cada agente se pasa la mayor parte de su vida parado, esperando a una persona que está ocupada desbloqueando a otro.',
        },
        {
          type: 'paragraph',
          text: 'El flag que lo arregla es <code>agy --dangerously-skip-permissions</code>, que aprueba todo automáticamente. Eso es un intercambio de verdad, no un regalo: renuncias a ver cada acción antes de que ocurra a cambio de que los agentes trabajen de verdad. Solo es un buen intercambio cuando el estado final es revisable, que es exactamente lo que garantiza el montaje con worktrees de arriba.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Haz commit antes de arrancar cada sesión. Con un árbol limpio y un worktree dedicado, un agente sin supervisión produce un diff que puedes leer, preparar selectivamente o tirar entero. Sin eso, el modo YOLO repartido entre varios agentes es genuinamente temerario y no solo rápido.',
        },
        {
          type: 'paragraph',
          text: 'El razonamiento detrás de ese intercambio, incluido cuándo no aceptarlo, está en <a href="/es/guias/modo-yolo-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del modo YOLO de Antigravity</a>.',
        },
      ],
    },
    {
      id: 'cuota',
      title: 'La restricción que nadie planifica: la cuota compartida',
      content: [
        {
          type: 'paragraph',
          text: 'Cuatro agentes de Antigravity beben de una única asignación de Google AI, y beben unas cuatro veces más rápido. Esta es la restricción que decide cómo de grande puede ser tu enjambre en realidad, y es invisible hasta que te para.',
        },
        {
          type: 'paragraph',
          text: 'En el nivel gratuito llega enseguida: el plan gratis está dimensionado para una persona llevando un agente con cabeza, no para un enjambre, y lo vas a notar dentro de la misma sesión. En Pro va cómodo para un enjambre pequeño. Los detalles de los niveles y del bote de créditos están en <a href="/es/guias/planes-y-precios-de-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía de planes y precios de Antigravity</a>.',
        },
        {
          type: 'paragraph',
          text: 'La mitigación que funciona mejor que subir de nivel es <strong>mezclar proveedores</strong>. Antigravity, Claude y Codex facturan de botes completamente separados, así que un enjambre repartido entre dos agentes rara vez se para del todo: agotar un proveedor deja al otro funcionando. Esa es mejor razón para montar un setup mixto que cualquier comparativa de benchmarks, y es por lo que el patrón multiagente de <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre multi-CLI</a> es más robusto que uno de un solo proveedor.',
        },
      ],
    },
    {
      id: 'visibilidad',
      title: 'Visibilidad: el problema que aparece a las tres sesiones',
      content: [
        {
          type: 'paragraph',
          text: 'Una vez que los agentes están aislados y son autónomos, aparece un problema nuevo, y es el que mata de verdad la mayoría de intentos de enjambre. Los agentes que nunca se paran a preguntar tampoco se anuncian.',
        },
        {
          type: 'paragraph',
          text: 'Una sesión que terminó hace veinte minutos se ve idéntica a una que sigue trabajando. Una sesión atascada en un bucle se ve idéntica a una que avanza. Y cuando por fin notas algo, estás mirando un muro de ventanas de terminal casi idénticas intentando averiguar cuál es la refactorización de autenticación. En la práctica la gente responde a esto mirando un agente y olvidándose de los demás, lo que tira por la borda todo el sentido de ejecutar varios.',
        },
        {
          type: 'paragraph',
          text: 'Hay tres cosas que lo arreglan, y ninguna es una función de la propia CLI:',
        },
        {
          type: 'list',
          items: [
            '<strong>Una etiqueta por sesión</strong>, para saber qué hace cada agente sin leerte su scrollback.',
            '<strong>Un estado por sesión</strong>, que distinga de un vistazo entre trabajando, esperando y terminado.',
            '<strong>Una notificación cuando una sesión termina</strong>, para poder hacer otra cosa de verdad en vez de ir sondeando cuatro terminales.',
          ],
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, el espacio de trabajo de escritorio hecho justo para esto, le da a cada sesión de Antigravity su propio terminal etiquetado con estado en vivo y lanza una notificación de escritorio en cuanto cualquiera termina. Además indexa las conversaciones para que puedas buscar después en todas las sesiones, algo que importa más en Antigravity que en la mayoría de agentes por cómo guarda su historial, tal y como cuenta <a href="/es/guias/historial-conversaciones-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del historial de conversaciones</a>.',
        },
        {
          type: 'paragraph',
          text: 'Y como cada terminal puede llevar un agente distinto, la misma ventana gestiona un enjambre mixto: Antigravity en una tarea, Claude en otra, Codex en una tercera, cada uno con su cuota y todos visibles a la vez.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedo ejecutar varias sesiones de Antigravity CLI a la vez?',
      answer: 'Sí. Cada sesión de agy es un proceso independiente, así que nada te impide abrir varias. Lo que hay que añadir es aislamiento (un worktree de git por agente), autonomía (aprobación automática, o los agentes se bloquean en ti) y visibilidad (etiquetas, estado y notificaciones).',
    },
    {
      question: '¿Cómo evito que dos agentes de Antigravity editen los mismos ficheros?',
      answer: 'Dale a cada uno su propio worktree de git, para que cada sesión tenga un directorio separado en su propia rama compartiendo un único repositorio. Sin eso, dos agentes en un mismo checkout se van a pisar los cambios en silencio, sin ningún error que te avise.',
    },
    {
      question: '¿Cuántos agentes de Antigravity debería ejecutar a la vez?',
      answer: 'Tres es el punto dulce para casi todo el mundo. Dos no bastan para eliminar tu tiempo muerto; cinco o más se pasan de lo que una persona puede revisar, y entonces la cola de revisión se convierte en el nuevo cuello de botella. Tu nivel de cuota es el otro límite.',
    },
    {
      question: '¿Necesito el modo YOLO para montar un enjambre de Antigravity?',
      answer: 'En la práctica sí. El modo de aprobación no escala más allá de un agente: cuatro agentes esperando confirmaciones significan un humano dando vueltas entre cuatro procesos bloqueados. Usa agy --dangerously-skip-permissions, pero haz commit antes y dale a cada agente su propio worktree para que la salida siga siendo revisable.',
    },
    {
      question: '¿Ejecutar varios agentes de Antigravity me va a fundir la cuota?',
      answer: 'Sí, aproximadamente en proporción a cuántos ejecutes, porque comparten una única asignación de Google AI. El nivel gratuito está dimensionado para un agente, no para un enjambre. La mitigación más eficaz es mezclar proveedores, ya que Antigravity, Claude y Codex facturan de botes completamente separados.',
    },
    {
      question: '¿Cómo controlo varias sesiones de Antigravity?',
      answer: 'Necesitas una etiqueta, un estado y una notificación de fin por sesión, y la CLI no ofrece ninguna de las tres. CodeAgentSwarm le da a cada sesión su propio terminal etiquetado con estado en vivo, te avisa cuando una termina e indexa todas las conversaciones para buscarlas luego.',
    },
  ],
}

export default guide
