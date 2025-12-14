import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'notificaciones-codeagentswarm',
    locale: 'es',
    title: 'Cómo usar las notificaciones de CodeAgentSwarm para no perder foco con Claude Code',
    metaTitle: 'Cómo usar las notificaciones de CodeAgentSwarm para no perder foco con Claude Code',
    metaDescription: 'Aprende a usar las notificaciones de CodeAgentSwarm para saber cuándo Claude Code termina o necesita tu atención, sin tener que estar pendiente del terminal.',
    intro: `Si usas Claude Code mientras trabajas en otras cosas, seguro que esto te suena:

Le pides a Claude que implemente algo relativamente grande, ves que va a tardar unos minutos, y piensas: "mientras tanto miro el correo / reviso Slack / toco otro repo".

Cuando te quieres dar cuenta, Claude llevaba 10 minutos esperando tu respuesta. Si esto lo sumas a todas las interacciones que tienes con Claude Code durante el día, vas a perder una barbaridad de tiempo en total.

Sí, Claude tiene sus propias notificaciones dentro del terminal, pero seamos sinceros, no funcionan nada bien.

Con CodeAgentSwarm la idea es justo la contraria: Tú sigues a lo tuyo y es la app la que te avisa cuando Claude termina o necesita algo de ti.

En esta guía te cuento cómo funcionan las notificaciones de CodeAgentSwarm y cómo usarlas para no perder el foco mientras trabajas con Claude Code.`,
    introVideo: '/terminal-notifications.mp4',
    ctaText: 'Activa las notificaciones de CodeAgentSwarm y deja de estar pendiente del terminal. La app te avisará cuando Claude termine o necesite tu atención.',
    highlightedWords: ['notificaciones', 'CodeAgentSwarm'],
    alternateSlug: 'codeagentswarm-notifications',
  },
  sections: [
    {
      id: 'el-problema-real',
      title: 'El problema real: esperar a la IA sin saber cuándo vuelve',
      content: [
        {
          type: 'paragraph',
          text: 'Trabajar con Claude Code "a pelo" suele ser algo así:',
        },
        {
          type: 'list',
          items: [
            'Le pides una implementación grande o un refactor serio.',
            'El modelo tarda varios minutos en procesarlo.',
            'Tú cambias de contexto: abres otra pestaña, revisas código, miras una incidencia, lo que sea.',
            'Cuando vuelves al terminal, descubres que Claude ya había terminado hace rato... y tú ni te habías enterado.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Esto, una vez, no pasa nada. Pero cuando lo repites muchas veces al día, se convierte en:',
        },
        {
          type: 'list',
          items: [
            'Tiempo muerto acumulado',
            'Microinterrupciones constantes',
            'Esa sensación de "no estoy aprovechando bien la IA"',
          ],
        },
        {
          type: 'paragraph',
          text: 'Y si encima haces divide & conquer - varios terminales de Claude Code en paralelo, cada uno con una tarea distinta, y tú saltando entre proyectos... sin un sistema de notificaciones decente es cuestión de tiempo que pierdas el hilo.',
        },
        {
          type: 'paragraph',
          text: 'La pregunta es simple: ¿quién controla a quién? ¿Tú a la IA, o la IA trabaja y la app te avisa cuando hace falta?',
        },
      ],
    },
    {
      id: 'que-hacen-las-notificaciones',
      title: 'Qué hacen exactamente las notificaciones de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'La app te avisa en los momentos que de verdad importan:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cuando Claude termina la tarea que le pediste',
          id: 'cuando-claude-termina',
        },
        {
          type: 'list',
          items: [
            'Implementa una funcionalidad.',
            'Completa un refactor.',
            'Deja listos unos tests.',
            'Termina la parte que le habías asignado.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cuando Claude se queda esperando algo de ti',
          id: 'cuando-claude-espera',
        },
        {
          type: 'list',
          items: [
            'Necesita una confirmación para seguir.',
            'Te pide que elijas entre varias opciones.',
            'Requiere más contexto o datos antes de continuar.',
          ],
        },
        {
          type: 'paragraph',
          text: 'En lugar de tener que estar pendiente del terminal, CodeAgentSwarm te dice claramente: "Oye, este terminal ya ha terminado" o "Este terminal está esperando tu decisión".',
        },
      ],
    },
    {
      id: 'ver-estado-terminales',
      title: 'Ver el estado de varios terminales de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'Además de las notificaciones, CodeAgentSwarm te enseña el estado de los terminales de forma visual.',
        },
        {
          type: 'paragraph',
          text: 'La idea es que puedas mirar la app un segundo y saber:',
        },
        {
          type: 'list',
          items: [
            'Qué terminales siguen trabajando',
            'Cuáles ya han terminado',
            'Cuáles están bloqueados esperando algo de ti',
          ],
        },
        {
          type: 'paragraph',
          text: 'Por ejemplo:',
        },
        {
          type: 'list',
          items: [
            'Terminal "Notificaciones backend" en estado terminado.',
            'Terminal "Panel de UI" aún generando código.',
            'Terminal "Tests" esperando tu confirmación antes de aplicar cambios.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Ese estado se refleja con colores y estados claros en la UI del terminal, para que no tengas que adivinar nada.',
        },
        {
          type: 'image',
          alt: 'Varios terminales con diferentes colores y estados (ejecutando, terminado, esperando) mostrando cómo se identifica rápidamente cuál ha terminado una tarea concreta',
          src: '/images/guides/terminal-status-indicators.png',
          caption: 'Los colores y estados te permiten ver de un vistazo qué está pasando en cada terminal.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'como-activar-notificaciones',
      title: 'Cómo activar las notificaciones de Claude Code en CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Si te preguntas cómo activar las notificaciones de Claude Code para no perderte cuando termina, CodeAgentSwarm lo gestiona desde un único sitio: los ajustes de notificaciones de la app.',
        },
        {
          type: 'paragraph',
          text: 'La idea es que el flujo sea algo así:',
        },
        {
          type: 'list',
          items: [
            'Abre CodeAgentSwarm y entra con tu cuenta como siempre.',
            'Ve a la sección de ajustes / configuración de la app.',
            'Busca el apartado de notificaciones.',
            'Activa las notificaciones de Claude Code cuando un terminal termine una tarea, y cuando un terminal se quede esperando algo de ti.',
          ],
        },
        {
          type: 'paragraph',
          text: 'En algunos sistemas puede que tengas que darle permiso también al propio sistema operativo para mostrar notificaciones de escritorio. Si la app te lo pide, dale acceso para que puedan aparecer los avisos mientras trabajas en otras ventanas.',
        },
        {
          type: 'image',
          alt: 'Apartado de notificaciones en CodeAgentSwarm mostrando cómo activar el toggle de notificaciones',
          src: '/images/guides/enable-notifications-settings.jpg',
          caption: 'Activa las notificaciones desde la configuración de la app.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'Las notificaciones de CodeAgentSwarm no están ahí "porque queda bien tenerlas". Están para evitar justo lo que pasa cuando trabajas con Claude Code sin ningún control: tiempo muerto, pestañas olvidadas y respuestas que llegan tarde.',
        },
        {
          type: 'paragraph',
          text: 'Cuando las tienes bien configuradas:',
        },
        {
          type: 'list',
          items: [
            'Puedes pedirle a Claude tareas más grandes sin miedo a olvidarte',
            'Puedes usar varios terminales en paralelo sin perder el hilo',
            'Y puedes seguir a lo tuyo sabiendo que, si pasa algo, te vas a enterar',
          ],
        },
        {
          type: 'paragraph',
          text: 'La IA se encarga de trabajar en segundo plano. CodeAgentSwarm se encarga de avisarte justo cuando te vuelve a necesitar. Tú solo tienes que decidir cuál es el siguiente paso.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Las notificaciones funcionan aunque tenga la app minimizada?',
      answer: 'Sí. Las notificaciones de escritorio aparecen aunque la app esté minimizada o estés en otra ventana, siempre que hayas dado los permisos necesarios al sistema operativo.',
    },
    {
      question: '¿Puedo desactivar las notificaciones si no las quiero?',
      answer: 'Sí. Desde la configuración de la app puedes activar o desactivar las notificaciones cuando quieras.',
    },
    {
      question: '¿Las notificaciones funcionan con varios terminales a la vez?',
      answer: 'Sí. Cada terminal envía sus propias notificaciones de forma independiente, así que puedes saber exactamente cuál ha terminado o cuál te necesita.',
    },
    {
      question: '¿Qué pasa si hago clic en una notificación?',
      answer: 'Te lleva directamente al terminal que la generó. No tienes que buscar cuál era, la app te posiciona automáticamente.',
    },
  ],
}

export default guide
