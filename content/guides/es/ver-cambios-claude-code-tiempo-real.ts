import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ver-cambios-claude-code-tiempo-real',
    locale: 'es',
    title: 'Cómo ver los cambios de Claude Code en tiempo real (y saber qué está haciendo la IA)',
    metaTitle: 'Cómo ver los cambios de Claude Code en tiempo real (diff por terminal, diff Git y títulos dinámicos)',
    metaDescription: 'Aprende cómo ver en tiempo real qué está cambiando Claude Code en tu código con el diff por sesión de CodeAgentSwarm, cómo revisar los cambios a nivel de proyecto con el visor de diff de Git y cómo usar los títulos dinámicos para saber qué está haciendo la IA en cada terminal.',
    intro: `Si usas Claude Code para hacer cambios en tu código, hay algo que seguramente te ha pasado más de una vez.

Le pides que refactorice un módulo entero, o que implemente una feature completa, te responde con un "all done" bastante convincente, pero tú te quedas con la duda: vale, pero qué narices has tocado exactamente en el repo.

Y si encima tienes varios terminales trabajando a la vez, la duda se divide en dos: qué está haciendo ahora mismo la IA en cada terminal, y qué ha cambiado exactamente en el código.

En CodeAgentSwarm la idea es justo evitar esa sensación de caja negra. La app combina tres cosas: un diff en vivo por terminal para ver los cambios de Claude Code en tiempo real en esa sesión concreta, un visor de diff de Git para ver los cambios a nivel de proyecto frente al repositorio, y títulos dinámicos en los terminales (con historial) para saber qué está haciendo la IA en cada momento.`,
    alternateSlug: 'view-claude-code-changes-real-time',
    introVideo: '/see-claude-code-changes-real-time.mp4',
  },
  sections: [
    {
      id: 'tres-formas-ver-cambios',
      title: 'Tres formas de ver qué ha cambiado y saber qué está haciendo la IA',
      content: [
        {
          type: 'paragraph',
          text: 'Resumen rápido del sistema:',
        },
        {
          type: 'list',
          items: [
            'El diff en vivo por terminal te dice: esto es exactamente lo que ha cambiado Claude en esta sesión, en estos archivos',
            'El diff de Git te dice: esto es todo lo que ha cambiado en el proyecto respecto a Git, vengas de Claude o de cambios manuales',
            'Los títulos dinámicos te dicen: este terminal está ahora mismo con X tarea, módulo o parte del sistema, y además puedes ver el historial de títulos',
          ],
        },
        {
          type: 'paragraph',
          text: 'Los tres juntos responden a: qué está haciendo la IA ahora mismo, qué ha cambiado en esta sesión, y qué ha cambiado en el proyecto en general.',
        },
      ],
    },
    {
      id: 'diff-en-vivo-terminal',
      title: 'Diff en vivo por terminal: ver qué cambia Claude en esa sesión',
      content: [
        {
          type: 'paragraph',
          text: 'Imagina que tienes un terminal de Claude Code trabajando en algo concreto, por ejemplo "refactorizar el módulo de notificaciones".',
        },
        {
          type: 'paragraph',
          text: 'Mientras Claude va escribiendo archivos, CodeAgentSwarm engancha todo lo que hace usando los hooks de Claude Code:',
        },
        {
          type: 'list',
          items: [
            'Cada vez que usa Write o Edit sobre un archivo',
            'Cada vez que hace cambios vía Bash (sed, echo, redirecciones...)',
          ],
        },
        {
          type: 'paragraph',
          text: 'Esos cambios se guardan en memoria, asociados al terminal donde está trabajando y el archivo que ha tocado.',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal tiene su propia sesión aislada, así que si tienes cuatro terminales a la vez, cada uno acumula sus cambios por separado. Esto es clave si quieres ver los cambios de Claude Code en tiempo real por sesión sin mezclar contextos.',
        },
        {
          type: 'paragraph',
          text: 'En la UI lo ves con un botón en la barra del terminal con un contador de cambios, y un modal específico de esa sesión.',
        },
        {
          type: 'video',
          src: '/claude-code-session-changes.mp4',
          caption: 'El contador de cambios sube mientras Claude trabaja. Haz clic para ver el diff de esa sesión.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Qué ves dentro del modal de Session file changes',
          id: 'session-file-changes-modal',
        },
        {
          type: 'paragraph',
          text: 'Dentro del modal de Session file changes tienes:',
        },
        {
          type: 'list',
          items: [
            'Un panel lateral con el listado de archivos que Claude ha tocado en esa sesión',
            'Un diff por archivo con líneas añadidas y eliminadas',
            'Secciones colapsadas para no tragarte todo el archivo si es muy grande',
            'Un botón de Clear session para resetear cuando empiezas una nueva tarea',
          ],
        },
        {
          type: 'paragraph',
          text: 'Lo importante aquí: solo ves lo que ha cambiado ese terminal concreto, no mezcla cambios de otros terminales, y no dependes de que el proyecto tenga Git configurado.',
        },
        {
          type: 'paragraph',
          text: 'Es una lupa puesta encima de lo que está haciendo esa instancia de Claude Code. Si te preguntas cómo ver qué ha cambiado Claude Code antes de aplicar nada o antes de seguir pidiéndole cosas, este es el sitio.',
        },
      ],
    },
    {
      id: 'diff-git',
      title: 'Diff de Git: ver los cambios a nivel de proyecto',
      content: [
        {
          type: 'paragraph',
          text: 'El otro visor de diffs de CodeAgentSwarm es el clásico que esperas cuando trabajas con repos Git.',
        },
        {
          type: 'paragraph',
          text: 'Compara el estado actual de tus archivos contra:',
        },
        {
          type: 'list',
          items: [
            'El staging area, para ver los cambios que tienes preparados para commit',
            'El working tree, para ver cambios que todavía no has añadido al staging',
          ],
        },
        {
          type: 'paragraph',
          text: 'Y te los enseña en un modal de diff con dos formas de verlo:',
        },
        {
          type: 'list',
          items: [
            'Vista en columnas, original a la izquierda y modificado a la derecha',
            'Vista unificada, todo en una sola columna con líneas añadidas y eliminadas',
          ],
        },
        {
          type: 'video',
          src: '/see-git-diff-claude-code.mp4',
          caption: 'El visor de diff de Git te da la foto completa de los cambios en el proyecto.',
        },
        {
          type: 'paragraph',
          text: 'Desde la interfaz sueles llegar a este diff desde el panel de Git del proyecto o desde botones de Diff asociados a archivos modificados.',
        },
        {
          type: 'paragraph',
          text: 'Este diff no distingue si los cambios vienen de Claude, de ti o de un script externo. Es la foto global del proyecto frente al repositorio, y es la respuesta a la pregunta clásica de antes de hacer commit: qué voy a subir exactamente.',
        },
      ],
    },
    {
      id: 'titulos-dinamicos',
      title: 'Cómo saber qué está haciendo la IA en cada terminal (títulos dinámicos e historial)',
      content: [
        {
          type: 'paragraph',
          text: 'Hasta ahora hemos hablado de qué ha cambiado. Pero hay otra parte igual de importante: saber qué está haciendo la IA ahora mismo en cada terminal.',
        },
        {
          type: 'paragraph',
          text: 'Ahí entran los títulos dinámicos de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Claude, mientras trabaja, puede ir actualizando el título del terminal con lo que está haciendo. Algo tipo:',
        },
        {
          type: 'list',
          items: [
            'Refactor notifications service',
            'Implement checkout flow',
            'Write tests for payment retries',
            'Clean up old feature flags',
          ],
        },
        {
          type: 'paragraph',
          text: 'Eso te da contexto instantáneo: abres la vista de terminales, lees los títulos, y sabes al momento qué está atacando cada uno, sin tener que leer 200 líneas de logs.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'El historial de títulos',
          id: 'historial-titulos',
        },
        {
          type: 'paragraph',
          text: 'Además de eso, CodeAgentSwarm guarda un historial de títulos por terminal. Si quieres ver qué ha ido haciendo la IA a lo largo del tiempo en ese terminal, puedes revisar la lista de títulos anteriores y reconstruir de forma bastante clara la línea temporal de tareas que ha ido tocando.',
        },
        {
          type: 'paragraph',
          text: 'Los títulos dinámicos:',
        },
        {
          type: 'list',
          items: [
            'Reflejan la tarea o el objetivo de ese terminal',
            'Te ayudan a identificar rápidamente: este es el de pagos, este el de notificaciones, este el de tests',
            'Y con el historial de títulos te permiten ver cómo ha ido evolucionando el trabajo en ese terminal',
          ],
        },
        {
          type: 'paragraph',
          text: 'Se combinan muy bien con los diffs: ves el título actual o el histórico de títulos para entender qué estaba haciendo Claude, abres el diff de sesión para ver qué ha cambiado en esa etapa, y usas el diff de Git para ver cómo encaja todo en el proyecto.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Los títulos no dependen de Git ni del sistema de diffs. Son otro canal de información, centrado en el contexto de tarea y en la línea temporal de lo que ha ido haciendo la IA en ese terminal.',
        },
      ],
    },
    {
      id: 'varios-terminales',
      title: 'Cómo encaja esto cuando trabajas con varios terminales a la vez',
      content: [
        {
          type: 'paragraph',
          text: 'Donde todo esto se nota más es cuando haces lo que CodeAgentSwarm está pensado para hacer, que es trabajar con varios terminales de Claude Code en paralelo.',
        },
        {
          type: 'paragraph',
          text: 'Ejemplo con tres terminales:',
        },
        {
          type: 'list',
          items: [
            'Terminal 1 - título dinámico: Refactor notifications service - diff de sesión: cambios solo del módulo de notificaciones',
            'Terminal 2 - título dinámico: Implement profile page UI - diff de sesión: cambios en componentes de frontend',
            'Terminal 3 - título dinámico: Add integration tests for X - diff de sesión: solo tests',
          ],
        },
        {
          type: 'paragraph',
          text: 'Con esa combinación: los títulos dinámicos te dicen qué está haciendo la IA en cada sitio, el diff en vivo por terminal te dice qué ha cambiado en esa sesión concreta, y el diff de Git te da la foto completa del proyecto antes de commitear nada.',
        },
        {
          type: 'paragraph',
          text: 'Dejas de tener la sensación de "tengo tres IAs haciendo cosas y no sé muy bien qué está pasando en el repo".',
        },
        {
          type: 'video',
          src: '/claude-terminal-titles.mp4',
          caption: 'Los títulos dinámicos actualizándose mientras Claude trabaja en diferentes tareas en cada terminal.',
        },
      ],
    },
    {
      id: 'cuando-usar-cada-cosa',
      title: 'Cuándo usar cada cosa',
      content: [
        {
          type: 'paragraph',
          text: 'Forma simple de verlo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa el diff en vivo por terminal cuando',
          id: 'usar-diff-terminal',
        },
        {
          type: 'list',
          items: [
            'Quieres ver qué ha cambiado Claude en esa sesión concreta',
            'Estás probando una idea y quieres revisar sus cambios antes de seguir',
            'Estás en un proyecto sin Git pero quieres control sobre los cambios de la IA',
            'Quieres ver los cambios de Claude Code en tiempo real por terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa el diff de Git cuando',
          id: 'usar-diff-git',
        },
        {
          type: 'list',
          items: [
            'Estás preparando un commit',
            'Quieres revisar todos los cambios del proyecto, vengan de Claude o de ti',
            'Quieres ver el antes y el después a nivel repositorio',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Apóyate en los títulos dinámicos y su historial cuando',
          id: 'usar-titulos',
        },
        {
          type: 'list',
          items: [
            'Tienes varios terminales a la vez y quieres saber rápidamente qué hace cada uno',
            'Quieres volver a un terminal concreto del que te acuerdas por la tarea, no por el número',
            'Quieres reconstruir qué ha ido haciendo la IA a lo largo del tiempo en ese terminal',
            'Quieres que el workspace sea legible de un vistazo sin abrir diffs todo el rato',
          ],
        },
      ],
    },
    {
      id: 'ventajas-limites',
      title: 'Ventajas y límites de cada enfoque',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Diff en vivo por terminal',
          id: 'ventajas-diff-terminal',
        },
        {
          type: 'paragraph',
          text: 'Ventajas:',
        },
        {
          type: 'list',
          items: [
            'No depende de Git',
            'Te enseña exactamente lo que ha hecho Claude en esa sesión',
            'Está aislado por terminal, ideal cuando trabajas en paralelo',
            'Puedes resetearlo cuando cambias de tarea',
          ],
        },
        {
          type: 'paragraph',
          text: 'Limitaciones:',
        },
        {
          type: 'list',
          items: [
            'Solo ve cambios que hace Claude Code, no tus ediciones manuales',
            'Los datos viven en memoria, si cierras la app se pierden',
            'En archivos muy grandes puede tardar un poco en calcular el diff',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Diff de Git',
          id: 'ventajas-diff-git',
        },
        {
          type: 'paragraph',
          text: 'Ventajas:',
        },
        {
          type: 'list',
          items: [
            'Es el diff Git de toda la vida, integrado en el workspace',
            'Te enseña la foto lista para commit o cambios que hay en el working tree',
            'Incluye tanto cambios de Claude como tuyos',
          ],
        },
        {
          type: 'paragraph',
          text: 'Limitaciones:',
        },
        {
          type: 'list',
          items: [
            'Necesita que el proyecto sea un repositorio Git',
            'No te dice qué parte vino de Claude y qué parte vino de ti',
            'No está organizado por sesión de terminal',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo puedo ver los cambios de Claude Code en tiempo real en CodeAgentSwarm?',
      answer: 'Abres el terminal donde está trabajando Claude, haces clic en el botón de cambios de archivo y se abre el modal de diff en vivo de esa sesión. Ahí ves archivo por archivo qué ha cambiado en esa sesión concreta.',
    },
    {
      question: '¿Cómo sé qué está haciendo la IA en cada terminal?',
      answer: 'Por los títulos dinámicos y el diff de cambios de sesión. Los títulos dinámicos te muestran en qué está trabajando Claude en cada momento, mientras que el botón de cambios de sesión en la barra del terminal te permite ver exactamente qué archivos se han modificado en esa sesión.',
    },
    {
      question: '¿Puedo ver qué ha cambiado Claude antes de aplicar un commit?',
      answer: 'Sí, con dos niveles. Primero revisas el diff en vivo del terminal para ver qué ha hecho la IA en esa sesión y luego usas el diff de Git para revisar todo el conjunto de cambios que van a entrar en el repo.',
    },
    {
      question: '¿Necesito Git para ver los diffs de Claude Code?',
      answer: 'Para el diff en vivo por terminal, no. Funciona aunque el proyecto no tenga Git. Para el visor de diff de Git, sí, se apoya en el repo para comparar contra HEAD o el staging area.',
    },
    {
      question: '¿El diff en vivo por terminal también ve cambios que hago yo a mano en el editor?',
      answer: 'No. Ese diff está pensado para seguirle la pista a lo que hace Claude Code desde los hooks. Tus cambios manuales entran luego en el diff de Git, no en el diff de sesión.',
    },
  ],
}

export default guide
