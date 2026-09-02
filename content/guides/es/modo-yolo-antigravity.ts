import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-yolo-antigravity',
    locale: 'es',
    title: 'Modo YOLO de Antigravity: cómo funciona de verdad --dangerously-skip-permissions',
    metaTitle: 'Modo YOLO de Antigravity (agy): saltar permisos (2026)',
    metaDescription: 'Cómo ejecutar Antigravity CLI en modo YOLO con --dangerously-skip-permissions, qué se salta en realidad, cuándo compensa y cómo acotar el radio de daño.',
    intro: `El modo YOLO de Antigravity es un flag: <code>agy --dangerously-skip-permissions</code>. Desactiva la confirmación en cada acción que toma el agente, así que <code>agy</code> deja de preguntar y simplemente ejecuta.

El nombre no es marketing. Google podría haberlo llamado auto-aprobar, y otros proveedores lo hacen, pero el flag está escrito así a propósito para que no puedas teclearlo por accidente ni dejarlo en un script sin enterarte. Esa honestidad merece respeto: este es el modo en el que el agente edita, borra, instala y ejecuta sin punto de control.

Esta guía cubre qué se salta el flag en realidad, por qué cambia lo rápido que se siente Antigravity y no lo capaz que es, las tres situaciones en las que se gana su sitio de verdad, y las estrategias de contención que lo hacen lo bastante seguro como para dejarlo corriendo.`,
    ctaText: 'El modo YOLO es más rápido cuando hay varios agentes a la vez y ninguno se para a preguntar. CodeAgentSwarm ejecuta todo un enjambre de sesiones de Antigravity en paralelo, con una notificación en cuanto cualquiera de ellas termina.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'modo', 'YOLO'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-09-01',
    alternateSlug: 'antigravity-yolo-mode',
  },
  sections: [
    {
      id: 'el-flag',
      title: 'El flag, y qué hace en realidad',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'agy --dangerously-skip-permissions: qué salta la bandera',
          id: 'agy-skip-permissions',
        },
        {
          type: 'paragraph',
          text: '<code>agy --dangerously-skip-permissions</code> se salta la confirmación en cada acción que cambia algo: escribir un fichero, borrarlo, ejecutar un comando de shell, instalar una dependencia. agy deja de preguntar y simplemente ejecuta. Es el mismo agente tomando las mismas decisiones, así que lo que quita la bandera es tu derecho a veto, no la prudencia del agente.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Normal: agy pregunta antes de actuar\nagy\n\n# YOLO / turbo: aprueba todo automáticamente, sin confirmaciones\nagy --dangerously-skip-permissions',
        },
        {
          type: 'paragraph',
          text: 'Por defecto, <code>agy</code> se detiene antes de las acciones que cambian algo y espera a que las apruebes. Leer un fichero es gratis; escribir uno, borrarlo, ejecutar un comando de shell o instalar una dependencia, no. Cada una de esas cosas para al agente hasta que dices que sí.',
        },
        {
          type: 'paragraph',
          text: '<code>--dangerously-skip-permissions</code> elimina esa barrera por completo. El agente sigue decidiendo qué hacer exactamente igual y es exactamente igual de capaz que antes. <strong>Lo que cambia es la latencia entre su decisión y la acción</strong>, y por tanto hasta dónde puede llegar sin ti.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El flag no hace al agente más agresivo, ni más autónomo al planificar, ni más dispuesto a intentar cosas arriesgadas. Solo elimina tu derecho a veto. Un agente que iba a proponer borrar el directorio equivocado lo sigue proponiendo; lo que pasa es que tú no estás para decir que no.',
        },
        {
          type: 'paragraph',
          text: 'Esa distinción importa al decidir si usarlo. La pregunta no es "¿me fío más del agente en este modo?", porque es el mismo agente. La pregunta es "¿voy a cazar una acción mala en el aviso, o le habría dado a sí de todas formas?".',
        },
      ],
    },
    {
      id: 'por-que-importa',
      title: 'Por qué las confirmaciones cuestan más de lo que parecen costar',
      content: [
        {
          type: 'paragraph',
          text: 'Responder a una confirmación lleva un segundo. La razón de que el modo YOLO se sienta transformador y no marginalmente cómodo es que el coste no es el segundo, es la <strong>interrupción</strong>.',
        },
        {
          type: 'paragraph',
          text: 'Un agente sacando adelante una refactorización puede tocar treinta ficheros. En modo de aprobación eso son treinta momentos en los que el agente está parado esperando a un humano, y treinta momentos en los que tú no puedes estar haciendo otra cosa porque el agente está bloqueado en ti. El agente trabaja al ritmo de tu atención en vez de al suyo.',
        },
        {
          type: 'paragraph',
          text: 'Esto empeora muchísimo con agentes en paralelo, que es el caso que motiva el flag de verdad. Cuatro sesiones de Antigravity en modo de aprobación no te dan cuatro veces el rendimiento; te dan un humano dando vueltas entre cuatro procesos bloqueados, y los agentes se pasan la mayor parte del tiempo esperando. <strong>El modo de aprobación no escala más allá de un agente.</strong> Ese es el argumento real a favor de YOLO, y es el mismo que aplica en <a href="/es/guias/enjambre-de-agentes-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del enjambre de agentes de Antigravity</a>.',
        },
        {
          type: 'paragraph',
          text: 'La otra cara es honesta: en modo de aprobación ves cada acción antes de que ocurra, que es un proceso de revisión de verdad. YOLO cambia la revisión continua por una única revisión al final, y ese cambio solo sale bien si el estado final es algo que puedas revisar de verdad.',
        },
      ],
    },
    {
      id: 'cuando-usarlo',
      title: 'Las tres situaciones en las que YOLO se gana su sitio',
      content: [
        {
          type: 'paragraph',
          text: 'Los consejos genéricos en cualquiera de las dos direcciones no sirven aquí. Estos son los casos en los que el intercambio compensa:',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabajo mecánico con una meta clara.</strong> Renombrar un símbolo en todo el código, migrar una API obsoleta, actualizar imports después de mover ficheros. El agente va a hacer decenas de ediciones casi idénticas, las habrías aprobado todas, y el diff final es fácil de leer.',
            '<strong>Cualquier cosa con una suite de tests como red de seguridad.</strong> Si la barrera real es que los tests pasen en verde, la confirmación es una versión peor de la misma comprobación. Deja trabajar al agente y que juzguen los tests.',
            '<strong>Sesiones en paralelo.</strong> En cuanto llevas más de un agente, el modo de aprobación deja de ser una función de seguridad y pasa a ser un cuello de botella que mantiene parados a todos los agentes.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Y los casos en los que no:',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabajo exploratorio</strong>, cuando todavía estás decidiendo cuál es el cambio correcto. Los avisos son donde diriges.',
            '<strong>Cualquier cosa que toque infraestructura, credenciales o producción</strong>. El radio de daño de una acción equivocada no lo acota <code>git</code>.',
            '<strong>Un código que no conoces</strong>, donde todavía no sabes distinguir una edición razonable de una que no lo es leyendo el diff.',
          ],
        },
      ],
    },
    {
      id: 'contencion',
      title: 'Acotar el radio de daño',
      content: [
        {
          type: 'paragraph',
          text: 'El modo YOLO es seguro en proporción a lo fácil que te sea deshacerlo. Tres costumbres hacen casi todo el trabajo, y ninguna consiste en fiarte más del agente.',
        },
        {
          type: 'paragraph',
          text: '<strong>Haz commit antes de empezar.</strong> Esta es toda la estrategia en una línea. Un árbol de trabajo limpio antes de una ejecución sin supervisión significa que toda la salida del agente es un diff que puedes leer, preparar selectivamente o tirar con un solo comando. Cuesta cinco segundos y convierte "qué le ha hecho a mis ficheros" en una revisión de código normal.',
        },
        {
          type: 'paragraph',
          text: '<strong>Dale a cada agente su propio worktree.</strong> Si varias sesiones YOLO comparten un mismo checkout, se van a editar los ficheros entre ellas y no vas a poder saber de quién era cada cambio. Un worktree de git por agente le da a cada uno un directorio aislado en su propia rama, y eso lo cubre <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía de worktrees</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Acota la tarea, no los permisos.</strong> Una tarea bien especificada es mejor mecanismo de seguridad que una confirmación sobre una tarea vaga. "Actualiza estos cuatro ficheros para usar el cliente nuevo" falla de forma segura. "Limpia el código" no, en ningún modo.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'No metas --dangerously-skip-permissions en un alias de shell para agy. El flag es largo a propósito, y esconderlo tras un alias corto significa que tarde o temprano vas a lanzar una sesión exploratoria en modo YOLO sin darte cuenta. Deja el coste de teclearlo; está haciendo su trabajo.',
        },
      ],
    },
    {
      id: 'flags-de-sesion',
      title: 'Los otros flags que conviene conocer al lado',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# Empezar una sesión nueva en el proyecto actual\nagy\n\n# Continuar tu conversación más reciente\nagy -c\n\n# Retomar una conversación concreta por id\nagy --conversation <id>',
        },
        {
          type: 'paragraph',
          text: 'Estos importan para YOLO en concreto porque una ejecución sin supervisión es justo el tipo de sesión a la que vas a querer volver. <code>agy -c</code> retoma tu conversación más reciente donde la dejaste, que es la que vas a buscar después de revisar un diff y decidir que el agente necesita otra pasada.',
        },
        {
          type: 'paragraph',
          text: 'Cuando tengas varias sesiones y necesites una más antigua, <code>agy --conversation &lt;id&gt;</code> la retoma por id. Encontrar ese id es un problemilla aparte, y lo cubre <a href="/es/guias/historial-conversaciones-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del historial de conversaciones de Antigravity</a>.',
        },
      ],
    },
    {
      id: 'varios-a-la-vez',
      title: 'Ejecutar varios agentes YOLO sin perder el hilo',
      content: [
        {
          type: 'paragraph',
          text: 'El momento en que el modo YOLO compensa es también el momento en que se vuelve difícil de supervisar. Los agentes que nunca se paran a preguntar tampoco se anuncian, así que una sesión que terminó hace veinte minutos tiene exactamente la misma pinta que una que sigue trabajando, y una sesión que ha salido mal tiene exactamente la misma pinta que una que va bien.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, el espacio de trabajo de escritorio para ejecutar varios agentes de IA de terminal en paralelo, le da a cada sesión de Antigravity su propio terminal con estado en vivo, así que ves de un vistazo qué agentes trabajan, cuáles esperan y cuáles han terminado, y lanza una notificación de escritorio en cuanto cualquiera acaba. Junto con un worktree por agente, eso es lo que convierte un enjambre de sesiones YOLO en algo supervisable y no solo rápido.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es el modo YOLO en Antigravity CLI?',
      answer: 'Es el modo de aprobación automática, que se activa con agy --dangerously-skip-permissions. Antigravity deja de pedir confirmación antes de las acciones que cambian cosas (escribir ficheros, ejecutar comandos, instalar dependencias) y simplemente las ejecuta.',
    },
    {
      question: '¿El modo YOLO hace a Antigravity más capaz?',
      answer: 'No. Es exactamente el mismo agente tomando exactamente las mismas decisiones. Lo único que cambia es que se elimina tu paso de aprobación, así que el agente llega más lejos sin esperarte. No se vuelve más agresivo ni más autónomo al planificar.',
    },
    {
      question: '¿Es seguro --dangerously-skip-permissions?',
      answer: 'Es tan seguro como tu capacidad de deshacerlo. Haz commit antes de empezar para que la salida del agente sea un diff revisable, dale a cada agente su propio worktree de git para que las sesiones en paralelo no choquen, y mantén la tarea bien acotada. No lo uses en infraestructura, credenciales, producción, ni en un código que no puedas revisar leyendo el diff.',
    },
    {
      question: '¿Cómo ejecuto agy con --dangerously-skip-permissions?',
      answer: 'Teclea la bandera entera al iniciar la sesión: agy --dangerously-skip-permissions. A partir de ahí agy aprueba automáticamente cada acción de esa tirada. Haz commit antes de empezar para que la salida sea un diff revisable, mantén la tarea bien acotada y dale a cada sesión en paralelo su propio worktree de git.',
    },
    {
      question: '¿Existe una bandera agy skip permissions?',
      answer: 'Sí, y es --dangerously-skip-permissions, no hay otra. No existe una opción más corta: la bandera está escrita así a propósito para que no puedas teclearla por accidente ni dejarla en un script sin enterarte. Se salta la confirmación al escribir ficheros, borrarlos, ejecutar comandos de shell e instalar dependencias.',
    },
    {
      question: '¿Por qué el flag tiene un nombre tan alarmante?',
      answer: 'A propósito, para que no puedas teclearlo por accidente ni dejarlo en un script sin enterarte. Por eso mismo no deberías esconderlo tras un alias de shell: el coste de teclearlo está haciendo su trabajo.',
    },
    {
      question: '¿Cuándo compensa de verdad el modo YOLO?',
      answer: 'Tres casos: trabajo mecánico con meta clara (renombrados masivos, migraciones de API), cualquier cosa donde la barrera real sea una suite de tests, y siempre que ejecutes más de un agente a la vez. El modo de aprobación no escala más allá de un solo agente, porque un humano no puede desbloquear cuatro procesos en espera.',
    },
    {
      question: '¿Cómo ejecuto varias sesiones YOLO de Antigravity a la vez?',
      answer: 'Cada sesión de agy es un proceso independiente, así que puedes abrir varias. Dale a cada una su propio worktree de git para que no se editen los ficheros entre ellas, y usa un espacio de trabajo como CodeAgentSwarm para mantener todas las sesiones visibles con su estado y recibir una notificación cuando alguna termine.',
    },
  ],
}

export default guide
