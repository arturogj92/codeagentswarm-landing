import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'mensajes-de-commit-con-ia-claude-code',
    locale: 'es',
    title: 'Mensajes de commit con IA: genera un buen commit desde tu diff de Claude Code',
    metaTitle: 'Generador de mensajes de commit con IA integrado en tu workspace de Claude Code (2026)',
    metaDescription: 'Genera un mensaje de commit claro con IA a partir de tu diff staged, y luego haz stage, commit y push sin salir de CodeAgentSwarm. Un Git Manager integrado para Claude Code.',
    intro: `Si ejecutas varias sesiones de Claude Code en paralelo, sabes cómo es el final de una sesión: un montón de archivos cambiados, tres o cuatro agentes que han tocado partes distintas del repo, y un commit esperando a que lo escribas.

Ese es el momento en el que casi todo el mundo se relaja. Escribes "wip", o "arreglos", o "cosas", y sigues adelante. Una semana después estás mirando el git log intentando recordar qué hacía exactamente "arreglos 2".

CodeAgentSwarm tiene un Git Manager integrado justo para esto. Lee tus archivos en staging y el diff, genera un mensaje de commit claro con IA, y te deja hacer stage, commit, push y pull sin salir de la app. Puedes obtener un mensaje corto y conciso o uno más detallado con cuerpo. En esta guía te enseño cómo funciona y cómo lo uso yo después de una sesión movida.`,
    highlightedWords: ['Mensajes de commit con IA', 'commit', 'Claude Code'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'ai-commit-messages-claude-code',
    ctaText: 'La próxima vez que tus agentes dejen un montón de cambios, abre el Git Manager, genera el mensaje de commit con IA y haz commit sin salir de CodeAgentSwarm.',
  },
  sections: [
    {
      id: 'que-es',
      title: 'Qué hace el generador de mensajes de commit con IA',
      content: [
        {
          type: 'paragraph',
          text: 'Versión corta: CodeAgentSwarm lee los cambios que tienes en staging, mira el diff real, y escribe un mensaje de commit que describe qué ha cambiado. Lo revisas, lo ajustas si quieres, y haces commit. Sin copiar y pegar diffs en una ventana de chat, sin cambiar a un cliente de Git aparte.',
        },
        {
          type: 'image',
          alt: 'Git Manager de CodeAgentSwarm mostrando la lista de archivos cambiados a un lado y el control de generar mensaje de commit con IA, con un mensaje generado en la caja de commit',
          src: '/images/guides/ai-commit-message.png',
          caption: 'El Git Manager: archivos cambiados a la izquierda, el mensaje de commit generado con IA listo para revisar y confirmar.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'La idea es quitar la fricción al final de la sesión. La IA ha hecho el trabajo pesado en el código, y ahora escribir un mensaje de commit decente es un clic en lugar de una tarea que te saltas. Si eres nuevo en <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, es la herramienta de coding agéntico de Anthropic que se ejecuta en tu terminal y edita archivos por todo tu proyecto.',
        },
      ],
    },
    {
      id: 'como-funciona',
      title: 'Cómo funciona: de archivos cambiados a un mensaje confirmado',
      content: [
        {
          type: 'paragraph',
          text: 'El Git Manager trabaja sobre tu repositorio real, así que lo que ves es lo que ve Git. El flujo es este:',
        },
        {
          type: 'list',
          items: [
            'Abre el Git Manager del proyecto en el que estás trabajando.',
            'Revisa la lista de archivos cambiados. Puedes hacer stage de los que quieras incluir y dejar el resto fuera.',
            'Pulsa el control para generar el mensaje de commit con IA.',
            'Lee los cambios en staging y el diff, y luego escribe un mensaje que resume qué ha cambiado.',
            'Léelo, edítalo si algo no encaja, y haz commit. Desde ahí también puedes hacer push.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Como lee el diff real y no solo los nombres de los archivos, el mensaje refleja lo que hace el código, no un genérico "archivos actualizados". Si renombraste una función, añadiste una guarda, o corregiste un off by one, eso suele aparecer en el mensaje.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Haz stage solo de lo que va en este commit antes de generar. La IA escribe el mensaje a partir de lo que está en staging, así que un staging limpio te da un mensaje limpio y enfocado en lugar de uno que intenta resumir diez cosas sin relación.',
        },
      ],
    },
    {
      id: 'conciso-vs-detallado',
      title: 'Conciso o detallado: elige el mensaje que necesitas',
      content: [
        {
          type: 'paragraph',
          text: 'No todos los commits merecen el mismo trato. A veces quieres una sola línea ordenada. A veces el cambio es lo bastante grande como para que tu yo del futuro agradezca un párrafo explicando el porqué.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm te deja obtener cualquiera de los dos:',
        },
        {
          type: 'list',
          items: [
            'Conciso: un resumen corto de una sola línea. Bueno para cambios pequeños y autoexplicativos, y para repos que prefieren un historial limpio de una línea.',
            'Detallado: una línea de asunto más un cuerpo que explica qué cambió y, cuando puede inferirlo, por qué. Bueno para refactors grandes, features, o cualquier cosa que tengas que justificar en una review.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Mi regla: conciso para lo pequeño, detallado cuando una sola línea mentiría sobre cuánto cambió de verdad. En cualquier caso puedes editar el resultado antes de hacer commit, así que tómalo como un buen primer borrador y no como algo que tengas que aceptar tal cual.',
        },
      ],
    },
    {
      id: 'por-que-importa',
      title: 'Por qué importa cuando hay varios agentes trabajando',
      content: [
        {
          type: 'paragraph',
          text: 'Esta función se gana su sitio cuando trabajas en paralelo. Con un terminal, escribir un commit a mano no es para tanto. Con cuatro o seis agentes, cada uno habiendo tocado un módulo distinto, el diff del final puede ser grande y estar repartido por todo el repo.',
        },
        {
          type: 'paragraph',
          text: 'Leer todo eso y condensarlo en una frase es justo el tipo de resumen en el que la IA es buena. En lugar de recorrer el diff entero para recordar qué pasó, dejas que ella redacte el mensaje y centras tu atención en si es preciso. Si quieres aprender a montar esas sesiones para empezar, mira esta guía: <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo ejecutar varias sesiones de Claude Code en paralelo</a>.',
        },
        {
          type: 'paragraph',
          text: 'Aquí hay un orden natural que funciona bien: primero revisas, luego haces commit. Miras qué ha cambiado con los visores de diff, confirmas que es lo que querías, y luego generas el mensaje y haces commit. Si no has visto cómo funciona la parte del diff, lee esto: <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo ver los cambios de Claude Code en tiempo real</a>.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Un mensaje generado es un borrador, no la verdad absoluta. Léelo siempre antes de hacer commit, sobre todo en los mensajes detallados donde la IA infiere intención. Si afirma que hiciste algo que no hiciste, corrige la línea. Es más rápido que reescribir desde cero, pero no sustituye una lectura rápida.',
        },
      ],
    },
    {
      id: 'commit-push-pull',
      title: 'Stage, commit, push y pull sin salir de la app',
      content: [
        {
          type: 'paragraph',
          text: 'El Git Manager no es solo un generador de mensajes de commit pegado a un lado. Cubre el bucle diario de Git para que no tengas que saltar a un terminal o a un cliente aparte para las operaciones comunes:',
        },
        {
          type: 'list',
          items: [
            'Haz stage y unstage de archivos desde la lista de cambios.',
            'Haz commit con el mensaje que generaste o escribiste.',
            'Haz push de tus commits al remoto.',
            'Haz pull para traerte cambios antes de empezar, o antes de hacer push.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Tenerlo todo en un sitio importa más de lo que parece. Cuando estás haciendo malabares con varios terminales, cada cambio de contexto te cuesta un poco de foco. Hacer el commit justo donde ocurrieron los cambios, al lado de los agentes que los hicieron, te mantiene en el flujo en lugar de andar con alt tab para pelearte con Git en otra ventana.',
        },
        {
          type: 'paragraph',
          text: 'Esto funciona tanto en macOS como en Windows, sobre tu configuración de Git existente. La generación de mensajes con IA está disponible en el plan Pro, y se apoya en las suscripciones que ya pagas, así que no hay que gestionar una clave de modelo aparte solo para los commits.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cómo genero un mensaje de commit con IA?',
      answer: 'Abre el Git Manager en CodeAgentSwarm, haz stage de los archivos que quieras en el commit, y pulsa el control para generar el mensaje de commit con IA. Lee el diff en staging y escribe un mensaje que puedes revisar, editar y confirmar.',
    },
    {
      question: '¿CodeAgentSwarm tiene integración con Git?',
      answer: 'Sí. Tiene un Git Manager integrado que te deja hacer stage y unstage de archivos, revisar cambios, hacer commit, push y pull sin salir de la app, además de la generación de mensajes de commit con IA por encima.',
    },
    {
      question: '¿Puede escribir el mensaje de commit a partir de mi diff?',
      answer: 'Sí. El generador lee tus cambios en staging y el diff real, no solo los nombres de los archivos, así que el mensaje refleja lo que hace el código en lugar de un texto genérico.',
    },
    {
      question: '¿Puedo hacer commit y push desde la app?',
      answer: 'Sí. Después de generar o editar el mensaje puedes hacer commit y push directamente desde el Git Manager, y también puedes hacer pull para traerte cambios del remoto. No necesitas un cliente de Git aparte para el bucle del día a día.',
    },
    {
      question: 'Mensajes de commit concisos o detallados: ¿cuál uso?',
      answer: 'Usa una sola línea concisa para cambios pequeños y autoexplicativos. Usa un mensaje detallado con cuerpo para refactors y features más grandes donde quieras explicar qué cambió y por qué. Puedes editar cualquiera de los dos resultados antes de hacer commit.',
    },
    {
      question: '¿El generador de mensajes de commit con IA está en macOS y Windows?',
      answer: 'Sí, CodeAgentSwarm funciona tanto en macOS como en Windows. El Git Manager y la generación de mensajes con IA funcionan en ambos, sobre tu instalación de Git existente. La generación con IA forma parte del plan Pro.',
    },
  ],
}

export default guide
