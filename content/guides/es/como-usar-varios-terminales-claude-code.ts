import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'como-usar-varios-terminales-claude-code',
    locale: 'es',
    title: 'Cómo usar varios terminales de Claude Code sin complicarte la vida',
    metaTitle: 'Cómo usar varios terminales de Claude Code en paralelo (Guía humana y práctica)',
    metaDescription: 'Guía muy humana y directa sobre cómo trabajar con varios terminales de Claude Code en paralelo usando CodeAgentSwarm. Natural, cercana y sin tono robótico.',
    intro: `Si alguna vez has intentado llevar varias conversaciones de Claude Code a la vez, ya sabes cómo acaba la película: pestañas abiertas por todos lados, pierdes el hilo y terminas pensando "¿pero en qué punto iba yo?".

Yo he pasado por eso. Y justo para evitar ese caos monté CodeAgentSwarm: para que trabajar en paralelo sea algo normal, cómodo y sin rayadas innecesarias.

En esta guía te explico, tal cual se lo contaría a un colega, cómo usar varios terminales a la vez de forma sencilla y sin complicarte la vida.`,
    alternateSlug: 'how-to-use-multiple-claude-code-terminals',
  },
  sections: [
    {
      id: 'por-que-varios-terminales',
      title: '¿Por qué usar varios terminales?',
      content: [
        {
          type: 'paragraph',
          text: 'Hay días que haces una única cosa y listo. Y hay otros días en los que estás tocando backend, interfaz, tests y docs al mismo tiempo.',
        },
        {
          type: 'paragraph',
          text: 'Usar varios terminales te permite:',
        },
        {
          type: 'list',
          items: [
            'separar bien las tareas',
            'que cada cosa tenga su propio contexto',
            'cambiar de una a otra sin perder el hilo',
            'dejar a Claude currando mientras tú sigues con otra cosa',
          ],
        },
        {
          type: 'paragraph',
          text: 'Cuando le pillas el punto, se nota muchísimo la diferencia.',
        },
      ],
    },
    {
      id: 'problemas-que-resuelve',
      title: 'Problemas reales que esto soluciona',
      content: [
        {
          type: 'heading',
          level: 3,
          text: '1. Cada cosa en su sitio',
          id: 'cada-cosa-en-su-sitio',
        },
        {
          type: 'paragraph',
          text: 'Un terminal para backend. Otro para la UI. Otro para los tests. Otro para documentación.',
        },
        {
          type: 'paragraph',
          text: 'Tu cabeza deja de hacer malabares con la información.',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Claude no mezcla contextos',
          id: 'claude-no-mezcla',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal tiene su propia historia y su propio contexto. No hay "¿por qué me está hablando ahora de otra cosa?".',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Lo ves todo en directo',
          id: 'ves-todo-en-directo',
        },
        {
          type: 'image',
          alt: 'Vista en cuadrícula con 4 terminales trabajando a la vez',
          src: '#',
          caption: 'Varios terminales abiertos a la vez, cada uno haciendo algo distinto.',
        },
        {
          type: 'paragraph',
          text: 'Es muy cómodo tener esa visión general y ver cómo avanza todo.',
        },
        {
          type: 'heading',
          level: 3,
          text: '4. No te rompe el foco',
          id: 'no-rompe-foco',
        },
        {
          type: 'paragraph',
          text: 'Cambias de terminal en un clic. Sin pestañas por ahí perdidas, sin scroll infinito.',
        },
      ],
    },
    {
      id: 'como-codeagentswarm-ayuda',
      title: 'Cómo CodeAgentSwarm te lo hace mucho más fácil',
      content: [
        {
          type: 'paragraph',
          text: 'De serie tienes:',
        },
        {
          type: 'list',
          items: [
            'Hasta 6 terminales en paralelo',
            'Historial completo en cada uno',
            'Indicadores en tiempo real de lo que está pasando',
            'Nombres personalizados para cada terminal',
            'Una vista clara y ordenada de todo tu workspace',
          ],
        },
        {
          type: 'image',
          alt: 'Popup para renombrar un terminal',
          src: '#',
          caption: 'Renombrar terminales es tan fácil como hacer un clic.',
        },
      ],
    },
    {
      id: 'ejemplo-real',
      title: 'Ejemplo real (por si te ayuda a visualizarlo)',
      content: [
        {
          type: 'paragraph',
          text: 'Mi setup típico cuando estoy metido en un proyecto suele ser algo así:',
        },
        {
          type: 'list',
          items: [
            '"Refactor API"',
            '"Ajustes UI"',
            '"Tests"',
            '"Docs"',
          ],
        },
        {
          type: 'paragraph',
          text: 'Mientras un terminal está generando algo, sigo dándole caña a otro. Nada se mezcla, nada se pierde.',
        },
        {
          type: 'paragraph',
          text: 'Se siente como tener varios mini-compañeros currando contigo, cada uno a lo suyo.',
        },
      ],
    },
    {
      id: 'paso-a-paso',
      title: 'Cómo usar varios terminales (paso a paso)',
      content: [
        {
          type: 'heading',
          level: 3,
          text: '1. Abre CodeAgentSwarm',
          id: 'paso-abre-app',
        },
        {
          type: 'paragraph',
          text: 'Abres la app y se carga lo último que tenías o un workspace vacío si empiezas de cero.',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Crea un terminal por cada tarea',
          id: 'paso-crea-terminales',
        },
        {
          type: 'paragraph',
          text: 'Lo ideal es no mezclar temas porque sí. Una cosa → un terminal.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Pon nombres claros y simples',
          id: 'paso-nombres',
        },
        {
          type: 'paragraph',
          text: 'Algo tipo:',
        },
        {
          type: 'list',
          items: [
            '"Backend API"',
            '"UI landing"',
            '"Tests login"',
            '"Docs onboarding"',
          ],
        },
        {
          type: 'image',
          alt: 'UI de renombrar terminal dentro de la app',
          src: '#',
          caption: 'Nombres claros = menos confusión.',
        },
        {
          type: 'heading',
          level: 3,
          text: '4. Deja que cada terminal mantenga su contexto',
          id: 'paso-contexto',
        },
        {
          type: 'paragraph',
          text: 'No hace falta repetir las cosas veinte veces en sitios distintos. Cada terminal "piensa" solo de lo suyo.',
        },
        {
          type: 'heading',
          level: 3,
          text: '5. Cambia entre terminales sin fricción',
          id: 'paso-cambiar',
        },
        {
          type: 'paragraph',
          text: 'Saltas de uno a otro cuando quieres ver resultados, corregir algo o dar nuevas instrucciones. Es muy fluido.',
        },
        {
          type: 'heading',
          level: 3,
          text: '6. Mira cómo avanza cada uno',
          id: 'paso-ver-avance',
        },
        {
          type: 'paragraph',
          text: 'Tener varios terminales currando en paralelo motiva bastante, la verdad.',
        },
      ],
    },
    {
      id: 'consejos',
      title: 'Consejos rápidos',
      content: [
        {
          type: 'list',
          items: [
            'Divide las tareas grandes en partes más pequeñas',
            'Usa nombres cortitos y claros',
            'Cierra los terminales que ya no aportan nada',
            'Evita mezclar temas completamente distintos en el mismo terminal',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Claude mezcla contextos entre terminales?',
      answer: 'No. Cada terminal es totalmente independiente del resto.',
    },
    {
      question: '¿Es más rápido que usar un solo terminal para todo?',
      answer: 'Sí, mucho más. Trabajas más claro y con menos ruido mental.',
    },
    {
      question: '¿También sirve para cosas pequeñas?',
      answer: 'Sí. Incluso para tareas pequeñas se nota la comodidad de tener cada cosa en su sitio.',
    },
  ],
}

export default guide
