import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cambio-rapido-de-proyecto-claude-code',
    locale: 'es',
    title: 'Cambio rápido de proyecto en Claude Code: salta entre proyectos en un clic',
    metaTitle: 'Cambio rápido de proyecto en Claude Code: salta entre proyectos en un clic (2026)',
    metaDescription: 'Un cambiador de proyectos para Claude Code que abre cualquier repo en un clic. Guarda accesos directos en la barra con su color, icono y presets como resume o Turbo.',
    intro: `Si saltas entre varios repos a lo largo del día, seguramente conoces este pequeño ritual: abres un terminal, haces cd a la carpeta correcta, ejecutas claude, recuerdas si querías retomar la última sesión o empezar de cero, y repites eso cada vez que cambias de proyecto.

No es difícil, es simplemente fricción. Y cuando lo haces veinte veces al día entre cinco o seis repos, esa fricción se acumula y va rompiendo tu flujo sin que te des cuenta.

CodeAgentSwarm tiene accesos directos de proyecto en la barra de navegación justo para esto. Guardas un acceso directo para un proyecto, le pones su propio color e icono, y a partir de ahí un solo clic abre un terminal ya situado en ese proyecto, con los ajustes que elegiste. En esta guía te enseño cómo funciona el cambiador de proyectos y cómo configurarlo para que cambiar de repo deje de ser una molestia.`,
    highlightedWords: ['cambio rápido', 'en un clic'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'claude-code-project-switcher',
    ctaText: 'Guarda un acceso directo para cada repo en el que trabajas y cambia entre proyectos de Claude Code con un solo clic, ya en el modo que quieras.',
  },
  sections: [
    {
      id: 'what-it-is',
      title: 'Qué es el cambiador de proyectos de Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'El cambiador de proyectos de CodeAgentSwarm es una fila de botones de acceso directo en la barra de navegación. Cada botón representa uno de tus proyectos. Haces clic y la app abre un terminal nuevo ya dentro de ese proyecto, ejecutando Claude Code (o el agente CLI que configures), con las opciones que guardaste para él.',
        },
        {
          type: 'image',
          alt: 'Barra de navegación de CodeAgentSwarm con una fila de botones de acceso directo de proyecto, cada uno con su color e icono, además de iconos pequeños de preset para modo resume y modo Turbo',
          src: '/images/guides/project-shortcuts.png',
          caption: 'Cada acceso directo es un proyecto. Los iconos pequeños de al lado indican los presets con los que se abre, como resume y modo Turbo.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Así que en lugar de abrir un terminal en blanco, navegar hasta la carpeta y teclear el mismo comando cada vez, haces un solo clic. El proyecto, el agente y los ajustes de arranque están todos integrados en el acceso directo.',
        },
        {
          type: 'paragraph',
          text: 'Esto está pensado para quien hace malabares con varios repos a la vez. Si tienes varias sesiones en paralelo, el cambiador encaja de forma natural con <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de Claude Code</a>, ya que cada clic puede abrir otro terminal en un proyecto distinto. Si no conoces todavía <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, es la herramienta de coding agéntico de Anthropic que se ejecuta en tu terminal.',
        },
      ],
    },
    {
      id: 'how-to-save-a-shortcut',
      title: 'Cómo guardar un acceso directo de proyecto',
      content: [
        {
          type: 'paragraph',
          text: 'Configurar un acceso directo lleva unos segundos y solo lo haces una vez por proyecto. El flujo es así:',
        },
        {
          type: 'list',
          items: [
            'Elige la carpeta del proyecto a la que quieres que apunte el acceso directo.',
            'Asígnale un color y un icono para reconocerlo al instante en la barra.',
            'Elige los ajustes de arranque: qué agente ejecuta y si se abre en modo resume, en modo Turbo o en una sesión nueva y limpia.',
            'Guárdalo. El acceso directo ya vive en la barra, listo para hacer clic.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El color y el icono no son solo decoración. Cuando tienes cinco o seis accesos directos en fila, reconocer "el hexágono morado es el backend" o "la langosta es mi proyecto personal" es mucho más rápido que leer nombres de carpetas. Acabas navegando por forma y color, casi sin pensar.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Da a los proyectos relacionados colores visualmente distintos en vez de cinco tonos de azul. La idea es distinguirlos de un vistazo, así que haz que las diferencias sean evidentes.',
        },
      ],
    },
    {
      id: 'presets',
      title: 'Presets: modo resume, modo Turbo y más',
      content: [
        {
          type: 'paragraph',
          text: 'La parte que más tiempo ahorra son los presets. Un acceso directo no solo abre un proyecto, lo abre de la forma en la que quieres trabajar en ese proyecto.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Modo resume',
          id: 'resume-mode',
        },
        {
          type: 'paragraph',
          text: 'Si es un proyecto al que vuelves constantemente, puedes configurar su acceso directo para que se abra en modo resume, que continúa la última sesión de Claude Code en lugar de empezar de cero. Un clic y vuelves justo donde lo dejaste, con el contexto anterior ya cargado. Sin tener que reexplicar lo que estabas haciendo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Modo Turbo',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Para los repos en los que confías en que la IA vaya rápido, puedes preconfigurar el acceso directo para que arranque directamente en modo Turbo, de modo que Claude pueda ejecutar comandos y editar archivos sin pararse a pedir permiso en cada paso. Si quieres la foto completa de lo que hace ese modo y cómo mantenerlo seguro, lee la <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del modo Turbo</a> antes de activarlo para un proyecto.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Sé deliberado con qué proyectos llevan un preset de Turbo. Es genial para un sandbox o un proyecto personal, menos para un repo de producción donde quieres revisar cada acción. Reserva los accesos directos con Turbo solo para los repos en los que te sientes cómodo dejando que la IA corra.',
        },
        {
          type: 'paragraph',
          text: 'Puedes combinarlos a tu gusto. Un proyecto puede tener un acceso directo tranquilo de "abre y pregúntame", y otro uno de "retoma y ve rápido". La idea es que cada repo se abra en el modo que encaja con cómo trabajas realmente en él.',
        },
      ],
    },
    {
      id: 'why-it-matters',
      title: 'Por qué un cambiador de un clic importa de verdad',
      content: [
        {
          type: 'paragraph',
          text: 'Por sí solo, abrir un terminal y hacer cd a una carpeta es trivial. El coste no está en ninguna vez concreta que lo haces, está en la repetición y en el cambio de contexto que la rodea.',
        },
        {
          type: 'paragraph',
          text: 'Cada vez que cambias de proyecto a mano tienes que recordar la ruta, recordar el comando correcto, recordar si querías retomar o empezar limpio, y volver a cargar todo eso en tu cabeza. El cambiador de proyectos coge esas pequeñas decisiones y las congela en un botón, así que cambiar de repo cuesta un clic y cero pensamiento.',
        },
        {
          type: 'list',
          items: [
            'Dejas de teclear los mismos comandos cd y claude decenas de veces al día.',
            'Dejas de dudar si retomar la última sesión, porque el acceso directo ya lo decidió.',
            'Puedes levantar varios proyectos en paralelo rápido, cada uno en su propio modo.',
            'Tu barra se convierte en un mapa de los repos en los que realmente trabajas, con código de color y a un clic.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Es una función pequeña que notas cada día, sobre todo si eres de los que tienen cuatro o cinco repos abiertos en cualquier momento.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'Los accesos directos de proyecto convierten la tarea constante de cambiar de repo en un solo clic. Cada acceso directo lleva su propio color, icono y ajustes de arranque, así que el proyecto se abre exactamente como quieres: retomando la última sesión, yendo rápido en modo Turbo, o empezando limpio y desde cero.',
        },
        {
          type: 'paragraph',
          text: 'Si trabajas con varios repos en Claude Code, configura un acceso directo para cada uno que toques con frecuencia. Después de un día o dos te vas a preguntar cómo aguantabas reescribir los mismos comandos cada vez que cambiabas de proyecto.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo cambio entre proyectos en Claude Code?',
      answer: 'Con CodeAgentSwarm, guardas un acceso directo para cada proyecto en la barra de navegación y haces clic en él para abrir un terminal ya dentro de ese proyecto ejecutando Claude Code. No hace falta abrir un terminal en blanco, hacer cd a la carpeta ni reescribir el comando, el acceso directo hace todo eso en un clic.',
    },
    {
      question: '¿Qué son los accesos directos de proyecto en CodeAgentSwarm?',
      answer: 'Los accesos directos de proyecto son botones en la barra de navegación, uno por proyecto, cada uno con su propio color e icono. Al hacer clic en uno se abre un terminal nuevo en ese proyecto con los ajustes de arranque que guardaste, como qué agente se ejecuta y si empieza en modo resume o Turbo. Funcionan como un cambiador de proyectos de un clic.',
    },
    {
      question: '¿Puede un acceso directo retomar mi última sesión?',
      answer: 'Sí. Al crear el acceso directo puedes configurarlo para que se abra en modo resume, que continúa la última sesión de Claude Code de ese proyecto en lugar de empezar de cero. Un clic te devuelve con el contexto anterior ya cargado.',
    },
    {
      question: '¿Puede un acceso directo arrancar en modo Turbo?',
      answer: 'Sí. Puedes preconfigurar un acceso directo para que arranque directamente en modo Turbo, de modo que Claude pueda ejecutar comandos y editar archivos sin pedir permiso en cada paso. Úsalo para repos en los que confías en que la IA vaya rápido, y lee la guía del modo Turbo para entender cómo mantenerlo seguro.',
    },
    {
      question: '¿Cuántos accesos directos puedo guardar?',
      answer: 'Puedes guardar un acceso directo para cada proyecto en el que trabajas y ponerlos en fila en la barra de navegación. En la práctica mantienes uno por repo que tocas con frecuencia, así la fila queda legible y navegas por color e icono de un vistazo.',
    },
  ],
}

export default guide
