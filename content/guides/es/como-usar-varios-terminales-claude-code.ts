import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'como-usar-varios-terminales-claude-code',
    locale: 'es',
    title: 'Cómo usar varios terminales de Claude Code sin complicarte la vida',
    metaTitle: 'Cómo usar varios terminales de Claude Code en paralelo',
    metaDescription: 'Aprende a trabajar con varios terminales de Claude Code en paralelo usando CodeAgentSwarm. Guía práctica con consejos para gestionar sesiones de IA concurrentes.',
    intro: `Si alguna vez has intentado tener varias conversaciones de Claude Code simultaneas, ya sabes cómo acaba la película: pestañas abiertas por todos lados, pierdes el hilo y terminas pensando "¿pero en qué punto iba yo?".

Yo he pasado por eso. Y justo para evitar ese caos monté CodeAgentSwarm: para que trabajar en paralelo sea algo normal, cómodo y sin saturarte.

En esta guía te explico, tal cual se lo contaría a un amigo, cómo usar varios terminales a la vez de forma sencilla y sin complicarte la vida.`,
    ctaText: 'La próxima vez que tengas varias tareas en paralelo, abre varios terminales y deja que cada uno trabaje en lo suyo. Vas a notar la diferencia.',
    alternateSlug: 'how-to-use-multiple-claude-code-terminals',
  },
  sections: [
    {
      id: 'por-que-usar-varios-terminales-claude-code',
      title: '¿Por qué usar varios terminales de Claude Code?',
      content: [
        {
          type: 'paragraph',
          text: 'Hay días que haces una única cosa y listo. Y hay otros días en los que estás tocando backend, interfaz, tests y docs al mismo tiempo.',
        },
        {
          type: 'paragraph',
          text: 'O incluso estás haciendo varias features simultáneas. Imagínate que estás haciendo un nuevo proyecto y has implementado un chat.',
        },
        {
          type: 'paragraph',
          text: 'Seguramente quieras hacer varias cosas simultáneas en esta implementación, como poner imagen de los usuarios, añadir un selector de emojis, añadir notificaciones. Pues en la forma tradicional tendrías un solo terminal de Claude Code e irías haciendo todo esto de forma secuencial.',
        },
        {
          type: 'paragraph',
          text: 'Usar varios terminales de Claude Code en paralelo te permite:',
        },
        {
          type: 'list',
          items: [
            'Separar bien las tareas para ir más rápido',
            'Cada terminal tendrá su propio contexto, con una gestión más eficiente',
            'Ver los cambios que está haciendo cada terminal de forma aislada',
            'Claude gestiona muy bien los conflictos, los resolverá siempre automáticamente sin ningún problema, es muy fiable',
            'Te enterarás cuando uno termina o necesita confirmación porque te lanzará una notificación',
          ],
        },
        {
          type: 'paragraph',
          text: 'Cuando le pillas el punto, se nota muchísimo la diferencia. Además de que es muy satisfactorio conseguir resolver 6 tareas en one shot.',
        },
      ],
    },
    {
      id: 'como-se-ve-en-la-practica',
      title: '¿Cómo se ve esto en la práctica?',
      content: [
        {
          type: 'paragraph',
          text: 'Siguiendo con el ejemplo del chat, podrías tener algo así:',
        },
        {
          type: 'list',
          items: [
            'Terminal 1: Implementando el avatar de los usuarios',
            'Terminal 2: Añadiendo notificaciones push',
            'Terminal 3: Permitiendo editar mensajes enviados',
            'Terminal 4: Poder enviar gifs fácilmente',
          ],
        },
        {
          type: 'image',
          alt: 'Vista en cuadrícula con varios terminales de Claude Code trabajando en paralelo',
          src: '/images/guides/multi-terminal.png',
          caption: 'Varios terminales trabajando simultáneamente, cada uno en su feature.',
        },
        {
          type: 'paragraph',
          text: 'Lo ves todo avanzando a la vez. Es muy satisfactorio ver cómo cada terminal va completando su parte mientras tú supervisas o sigues dando instrucciones.',
        },
        {
          type: 'paragraph',
          text: 'Y cuando hay conflictos en el código (porque dos terminales tocaron el mismo archivo), Claude los resuelve automáticamente. No tienes que hacer nada.',
        },
      ],
    },
    {
      id: 'que-ofrece-codeagentswarm',
      title: '¿Qué te ofrece CodeAgentSwarm?',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es la herramienta que hace todo esto posible de forma cómoda. De serie tienes:',
        },
        {
          type: 'list',
          items: [
            'Hasta 6 terminales de Claude Code en paralelo',
            'Historial completo de conversaciones con buscador integrado para recuperar conversaciones antiguas',
            'Notificaciones cuando un terminal termina o necesita tu atención',
            'Vista en cuadrícula para ver todo lo que pasa a la vez o modo pestañas',
            'Títulos dinámicos que van cambiando automáticamente según lo que esté haciendo cada terminal',
          ],
        },
        {
          type: 'paragraph',
          text: 'En lugar de tener pestañas sueltas o ventanas por ahí perdidas, tienes todo en un solo sitio.',
        },
      ],
    },
    {
      id: 'como-empezar-paso-a-paso',
      title: 'Cómo empezar (paso a paso)',
      content: [
        {
          type: 'heading',
          level: 3,
          text: '1. Abre CodeAgentSwarm y crea tus terminales',
          id: 'paso-abre-crea',
        },
        {
          type: 'paragraph',
          text: 'Abres la app y creas hasta 6 terminales pulsando en el siguiente botón:',
        },
        {
          type: 'image',
          alt: 'Botón para crear un nuevo terminal en CodeAgentSwarm',
          src: '/images/guides/create_terminal_button_image.png',
          size: 'inline',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'También puedes crear las tareas desde el kanban y crear los terminales desde ahí, enviando la tarea directamente.',
        },
        {
          type: 'image',
          alt: 'Crear terminal desde el kanban en CodeAgentSwarm',
          src: '/images/guides/open-terminal-from-kanban.png',
          caption: 'Abre un terminal directamente desde una tarea del kanban.',
          size: 'small',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Dale instrucciones a cada terminal',
          id: 'paso-instrucciones',
        },
        {
          type: 'paragraph',
          text: 'Cada terminal tiene su propio contexto. Le explicas una vez lo que tiene que hacer y se pone a trabajar. No mezcla nada con los otros.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Mira cómo avanzan',
          id: 'paso-supervisa',
        },
        {
          type: 'paragraph',
          text: 'Conforme cada terminal empiece a trabajar, irá cambiando el título dinámicamente para mostrarte en qué está trabajando en cada momento. También puedes ver los cambios actuales que está haciendo.',
        },
        {
          type: 'image',
          alt: 'Terminal mostrando título dinámico y cambios actuales en CodeAgentSwarm',
          src: '/images/guides/terminal-title-and-changes.png',
          caption: '1. El título cambia según lo que esté haciendo. 2. Haciendo click en el botón puedes ver los cambios que hace el terminal en tiempo real en formato diff para no perder contexto de lo que hace la IA.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'consejos-practicos',
      title: 'Consejos prácticos',
      content: [
        {
          type: 'list',
          items: [
            'No hace falta usar los 6 terminales siempre, usa los que necesites',
            'Si una tarea es grande, divídela en subtareas y dale cada una a un terminal',
            'Cierra los terminales que ya terminaron para mantener el workspace limpio',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Claude mezcla contextos entre terminales?',
      answer: 'No. Cada terminal es totalmente independiente. Lo que le dices a uno no afecta a los otros.',
    },
    {
      question: '¿Y si dos terminales tocan el mismo archivo?',
      answer: 'Claude gestiona los conflictos automáticamente. Lo hemos probado mucho y es muy fiable. No tienes que hacer nada.',
    },
    {
      question: '¿Cuántos terminales puedo usar a la vez?',
      answer: 'Hasta 6 en paralelo. Pero no hace falta usar todos, usa los que necesites para tu tarea.',
    },
    {
      question: '¿Necesito una suscripción especial de Claude?',
      answer: 'Necesitas tener Claude Code activo. CodeAgentSwarm funciona encima de tu suscripción existente.',
    },
    {
      question: '¿Es realmente más rápido que un solo terminal?',
      answer: 'Sí, bastante. Sobre todo cuando tienes varias cosas independientes que hacer. En vez de esperar a que termine una para empezar otra, van todas a la vez.',
    },
  ],
}

export default guide
