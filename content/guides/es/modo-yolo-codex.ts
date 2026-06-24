import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-yolo-codex',
    locale: 'es',
    title: 'Modo YOLO de Codex CLI: aprobaciones full-auto explicadas y cómo ejecutarlo con seguridad',
    metaTitle: 'Modo YOLO de Codex CLI: aprobaciones full-auto explicadas (y formas más seguras de usarlo) (2026)',
    metaDescription: 'Qué significa "modo YOLO" en OpenAI Codex CLI: aprobaciones full-auto, el flag --full-auto, el sandbox, los riesgos reales de ejecutar sin aprobaciones y cómo mantener un enjambre de Codex rápido y seguro.',
    intro: `Si usas OpenAI Codex CLI más de unos minutos, las peticiones de aprobación cansan rápido. Cada escritura de archivo, cada comando de shell, cada llamada de red se para a esperar que digas que sí. Así que la gente tira de full auto y apaga las aprobaciones, y la comunidad empezó a llamar a eso "modo YOLO".

Codex nunca trae un botón oficial llamado YOLO. El término solo describe un estado: Codex funcionando con las aprobaciones desactivadas para que pueda leer, escribir y ejecutar comandos sin supervisión. La velocidad es real, y para trabajo bien acotado se siente genial. El riesgo también es real, porque una vez apagadas las aprobaciones no hay nada entre Codex y un comando destructivo.

Esta guía explica qué ofrece Codex de verdad, desde solo-sugerir hasta full auto y el sandbox, qué se rompe en serio cuando ejecutas sin aprobaciones y cómo conseguir la velocidad del full-auto sin perder el control. Esa última parte es donde entran los permisos por terminal y el Turbo Mode de CodeAgentSwarm, para que puedas ejecutar todo un enjambre de Codex en full auto y aun así mantener guardarraíles en las operaciones peligrosas.`,
    ctaText: 'Ejecuta Codex CLI en full auto sin jugártela. Turbo Mode más permisos por terminal te dejan autoaprobar el trabajo seguro y bloquear los comandos peligrosos, en todos los terminales de Codex a la vez.',
    highlightedWords: ['Codex CLI', 'modo YOLO'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'codex-yolo-mode',
  },
  sections: [
    {
      id: 'que-es-modo-yolo-codex',
      title: 'Qué significa "modo YOLO" en Codex CLI',
      content: [
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT con claude-code, gemini cli y codex cli, además de un interruptor Enable Turbo Mode para tiradas seguras en full-auto',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm pones un terminal en codex cli y activas Enable Turbo Mode para la velocidad del full auto, mientras los permisos por terminal siguen frenando las operaciones peligrosas. Eso es full auto estilo YOLO sin perder el control.',
        },
        {
          type: 'paragraph',
          text: '"Modo YOLO" es el apodo de la comunidad para ejecutar <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a> con las aprobaciones desactivadas, para que trabaje en full auto sin pararse a preguntarte. OpenAI no lo llama así. El nombre cuajó porque capta la sensación: solo se vive una vez, así que apaga las peticiones y deja que el agente corra.',
        },
        {
          type: 'paragraph',
          text: 'La motivación es la misma con la que se topa cualquier agente de código. Cuando Codex itera sobre una funcionalidad, arregla un bug o refactoriza, se detiene antes de cada acción: escribir un archivo, ejecutar un test, instalar un paquete, tocar la red. En una tarea real son decenas de confirmaciones, y la mayoría acaba dándole a que sí de todas formas, lo que en silencio tira por tierra el sentido de tener aprobaciones.',
        },
        {
          type: 'paragraph',
          text: 'Ejecutar sin aprobaciones elimina todo eso. Codex lee, escribe y ejecuta comandos por su cuenta. Para trabajo repetitivo o muy acotado se siente como si el agente por fin funcionara a toda velocidad. El precio es que quitas todos los guardarraíles a la vez, incluidos los que sí querrías conservar.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'YOLO es el término informal. Lo que Codex expone de verdad es un conjunto de modos de aprobación más un sandbox. Entender esos dos diales, aprobaciones y sandboxing, es lo que te permite ir rápido sin ir a ciegas.',
        },
        {
          type: 'paragraph',
          text: 'Si lo que de verdad buscas es ejecutar varios agentes de Codex a la vez y no solo uno en full auto, la guía del <a href="/es/guias/enjambre-de-agentes-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes Codex</a> cubre ese lado, y la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> lo compara en todas las CLI.',
        },
      ],
    },
    {
      id: 'que-hacen-los-modos',
      title: 'Qué hacen en realidad los modos de aprobación de Codex',
      content: [
        {
          type: 'paragraph',
          text: 'Codex CLI no tiene un único interruptor de encendido/apagado. Tiene un abanico de comportamientos de aprobación que deciden cuánto pregunta antes de actuar, junto a un sandbox que decide cuánto puede tocar. Las etiquetas exactas y los nombres de los flags cambian entre versiones de Codex, así que toma los nombres de abajo como la forma del sistema y no como algo que memorizar. Mira siempre <code>codex --help</code> para los flags que usa tu versión instalada.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'El espectro de aprobaciones',
          id: 'espectro-aprobaciones',
        },
        {
          type: 'list',
          items: [
            '<strong>Sugerir / preguntar</strong> - Codex propone cambios y comandos pero espera a que apruebes cada uno. El extremo más cauto, y el más lento.',
            '<strong>Auto / al fallar</strong> - Codex hace el trabajo rutinario por su cuenta y solo se para a preguntar cuando algo parece más arriesgado o cuando un comando falla. Un punto medio que recorta casi todas las peticiones.',
            '<strong>Full auto</strong> - Codex actúa sin preguntar, ejecutando comandos y editando archivos por su cuenta. Este es el nivel al que se refiere la gente cuando dice "modo YOLO".',
          ],
        },
        {
          type: 'paragraph',
          text: 'Codex CLI expone un nivel de full auto mediante un flag, normalmente <code>--full-auto</code>, que le deja trabajar sin pararse a por aprobaciones. También hay una forma de saltarse las aprobaciones por completo para tiradas totalmente sin supervisión, pensada para entornos en sandbox o desechables. Como los nombres exactos de los flags cambian entre versiones, confírmalos con la salida de ayuda en lugar de copiar un flag que viste en un post antiguo.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Comprueba qué admite de verdad tu versión instalada\ncodex --help\n\n# Tirada estilo full-auto (verifica el flag exacto de tu versión)\ncodex --full-auto "refactoriza el módulo de auth"',
        },
        {
          type: 'heading',
          level: 3,
          text: 'El dial del sandbox',
          id: 'dial-sandbox',
        },
        {
          type: 'paragraph',
          text: 'Las aprobaciones deciden si Codex pregunta. El sandbox decide qué puede alcanzar Codex cuando sí actúa. Codex puede ejecutarse con el acceso al sistema de archivos y a la red limitado, así que incluso en full auto queda restringido a un área de trabajo definida en vez de a toda tu máquina. Apretar el sandbox es una de las formas más seguras de correr en full auto, porque acota el radio de impacto aunque no haya un humano en el bucle.',
        },
        {
          type: 'paragraph',
          text: 'El modelo mental importante son dos diales independientes. Uno controla cada cuánto se para Codex a preguntar. El otro controla hasta dónde puede llegar cuando no pregunta. El "modo YOLO" suele girar el primer dial hasta el tope, a full auto. El error es dejar también el segundo dial abierto de par en par al mismo tiempo.',
        },
      ],
    },
    {
      id: 'riesgos-reales',
      title: 'Los riesgos reales de ejecutar Codex sin aprobaciones',
      content: [
        {
          type: 'paragraph',
          text: 'Esto no son hipótesis. Cuando ejecutas Codex en full auto sobre un repo en uso con un historial de Git de verdad y datos de verdad, cualquiera de estas cosas puede pasar dentro de una sola sesión, sin ninguna petición que la frene antes.',
        },
        {
          type: 'list',
          items: [
            '<strong>Push de Git a la rama equivocada</strong> - Codex decide hacer commit y push de trabajo a medias a main, o hace force-push y machaca a un compañero.',
            '<strong>Borrado de archivos o directorios</strong> - Una instrucción malinterpretada se convierte en <code>rm -rf</code> sobre una ruta que no querías eliminar.',
            '<strong>Comandos de shell irreversibles</strong> - <code>DROP TABLE</code>, <code>docker system prune</code> o cualquier cosa que no se pueda deshacer una vez se ejecuta.',
            '<strong>Instalar la dependencia equivocada</strong> - <code>npm install</code> sobre un paquete con typosquatting o comprometido que a simple vista parecía correcto.',
            '<strong>Llamadas de red no deseadas</strong> - Golpear endpoints de producción, enviar datos a servicios externos o disparar webhooks que no esperabas.',
            '<strong>Sobrescribir trabajo sin commitear</strong> - Codex edita archivos que estabas tocando y tu trabajo sin commitear desaparece antes de que te des cuenta.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'El problema de fondo es que los modos de aprobación en crudo son casi de todo o nada. Puedes preguntar por todo o saltarte casi todo, pero no puedes decir con facilidad "autoaprueba ediciones de archivos y tests, pero párate siempre antes de git push" solo con los flags. Ese hueco es justo donde viven los accidentes del full auto.',
        },
        {
          type: 'paragraph',
          text: 'El full auto no es malo en sí. Es el ajuste correcto para mucho trabajo. El riesgo viene de ejecutarlo sin una capa que mantenga frenadas las operaciones de verdad peligrosas mientras todo lo seguro pasa de largo. La siguiente sección va sobre construir esa capa.',
        },
      ],
    },
    {
      id: 'ejecutar-con-seguridad',
      title: 'Cómo ejecutar Codex en full auto con seguridad',
      content: [
        {
          type: 'paragraph',
          text: 'Hay varios enfoques, del menos controlado al más. El objetivo es el mismo en todos: mantener la velocidad del full auto en las operaciones seguras sin dejar nunca que un comando destructivo se ejecute sin supervisión.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 1: el flag de full auto en crudo (vale para trabajo desechable)',
          id: 'metodo-flag-crudo',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --full-auto "renombra este símbolo en todas partes"',
        },
        {
          type: 'paragraph',
          text: 'Esto va bien para tareas rápidas y aisladas en las que confías en que no puede pasar nada destructivo, sobre una rama desechable o un proyecto de pruebas. Para cualquier cosa que toque Git, borrados o la red en un repo real, ejecutar el flag en crudo con el sandbox abierto de par en par es una apuesta.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 2: full auto más un sandbox apretado',
          id: 'metodo-sandbox',
        },
        {
          type: 'paragraph',
          text: 'Un punto de partida mejor es combinar full auto con un sandbox restringido, para que aunque Codex no pregunte, no pueda salir de un área de trabajo definida ni hacer llamadas de red arbitrarias. Esto acota el radio de impacto. La pega es que el sandbox es tosco: limita dónde puede actuar Codex, pero no entiende que "git push" es distinto de "git status", así que no puede bloquear de forma selectiva el único comando peligroso de Git mientras permite los seguros.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 3: Turbo Mode de CodeAgentSwarm más permisos por terminal (recomendado)',
          id: 'metodo-turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm se coloca por encima de Codex CLI y añade la capa que les falta a los flags en crudo. Ejecutas Codex en cada terminal, activas Turbo Mode para la velocidad del full auto y luego usas los permisos por terminal para decidir exactamente qué operaciones se autoaprueban y cuáles se paran siempre. Es la diferencia entre un interruptor tosco y una política de verdad. Eliges codex cli en el selector SELECT AI AGENT que aparece al principio de esta guía, y el interruptor Enable Turbo Mode justo al lado es lo que activa ese full auto rápido pero con guardarraíles.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que te da esa capa por encima de Codex:',
        },
        {
          type: 'list',
          items: [
            '<strong>Alcance por terminal</strong> - Cada terminal de Codex tiene su propia política de permisos. Puedes tener un agente abierto de par en par en una rama desechable y otro bien candado sobre el repo principal, en la misma ventana.',
            '<strong>Permisos granulares por categoría</strong> - Pon Permitir, Preguntar o Denegar de forma independiente para operaciones de archivos, comandos de shell, acciones de Git y acceso de red, en lugar de un único encendido/apagado global.',
            '<strong>Guardarraíles de Git</strong> - Mantén status, diff y log en autoaprobado mientras bloqueas push, force-push, merge y borrado de ramas. Este único ajuste evita los desastres más comunes del full auto.',
            '<strong>Diffs de archivos en vivo</strong> - Observa qué está cambiando cada agente de Codex en tiempo real, por terminal, para que una tirada en full auto nunca sea una caja negra.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El efecto práctico es que consigues la velocidad de ejecutar Codex sin aprobaciones, sin la parte en la que una instrucción malinterpretada te vuela la rama. Configuras la política una vez y Codex pasa de largo por el trabajo seguro mientras los comandos peligrosos siguen parándose para ti. Para un recorrido paso a paso del mismo sistema de permisos del lado de Claude Code, la <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode YOLO de Claude Code</a> cubre cada pantalla de configuración, y funciona igual tanto si el agente es Codex como Claude Code.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Como la política de permisos es por terminal, esto es lo que hace que un enjambre de Codex en full auto sea de verdad seguro. Puedes ejecutar varios agentes de Codex a la vez, todos en Turbo Mode, cada uno con el push de Git bloqueado, y supervisarlo todo desde una sola ventana en lugar de vigilar peticiones.',
        },
      ],
    },
    {
      id: 'buenas-practicas',
      title: 'Buenas prácticas para tiradas de Codex en full auto',
      content: [
        {
          type: 'paragraph',
          text: 'Sea cual sea el método que uses, estos hábitos mantienen fuera de la mesa los peores accidentes del full auto:',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabaja siempre en una rama de feature, nunca en main.</strong> Si Codex la lía, tiras la rama. Si la lía en main, lo nota todo el equipo.',
            '<strong>Haz commit antes de empezar una tirada en full auto.</strong> Un punto de restauración limpio significa que <code>git checkout .</code> te devuelve al instante si algo sale mal.',
            '<strong>Bloquea las operaciones peligrosas de Git.</strong> Push, force-push, merge y borrado de ramas deberían pararse siempre a pedir confirmación, incluso en full auto. Son las acciones de mayor impacto y más difíciles de deshacer.',
            '<strong>Aprieta el sandbox.</strong> Restringe el acceso al sistema de archivos y a la red para que ni siquiera una tirada sin supervisión pueda salir del área de trabajo.',
            '<strong>Vigila el diff.</strong> Una vista de cambios de archivos en vivo y por terminal convierte el full auto de caja negra en algo que de verdad puedes supervisar.',
            '<strong>Mantén los prompts acotados.</strong> "Refactoriza el middleware de auth para usar JWT" es mucho más seguro en full auto que "mejora el código". Cuanto más estrecho el alcance, menos margen tiene Codex para irse por las ramas.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Rama de feature más push de Git bloqueado más un diff en vivo te dan casi toda la velocidad del full auto con casi nada del riesgo. La mayoría de quien monta esto no vuelve a ejecutar el flag en crudo con todo abierto.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es el modo YOLO de Codex CLI?',
      answer: 'El modo YOLO es el apodo de la comunidad para ejecutar OpenAI Codex CLI con las aprobaciones desactivadas, para que trabaje en full auto sin pararse a preguntar antes de cada acción. OpenAI no usa el término oficialmente. Lo que Codex expone de verdad es un conjunto de modos de aprobación, desde solo-sugerir hasta full auto, más un sandbox que limita lo que puede alcanzar.',
    },
    {
      question: '¿Qué hace --full-auto en Codex?',
      answer: 'El nivel de full auto deja que Codex ejecute comandos y edite archivos sin pararse a pedir aprobación en cada acción. Codex CLI suele exponerlo mediante un flag --full-auto, aunque los nombres exactos cambian entre versiones, así que confírmalo con codex --help. También hay una forma aparte de saltarse las aprobaciones por completo para tiradas totalmente sin supervisión, pensada para entornos en sandbox.',
    },
    {
      question: '¿Es seguro ejecutar Codex sin aprobaciones?',
      answer: 'Ejecutar sin aprobaciones es rápido pero quita todos los guardarraíles a la vez, así que acciones destructivas como git push, rm -rf o DROP TABLE pueden ejecutarse sin ninguna petición. Es razonable en una rama desechable con un sandbox apretado. En un repo real, combina el full auto con una capa de permisos como Turbo Mode de CodeAgentSwarm que autoapruebe el trabajo seguro mientras sigue bloqueando los comandos peligrosos de Git y de shell.',
    },
    {
      question: '¿Cuál es la diferencia entre los modos de aprobación de Codex y el sandbox?',
      answer: 'Los modos de aprobación controlan cada cuánto se para Codex a preguntarte antes de actuar, desde solo-sugerir hasta full auto. El sandbox controla qué puede alcanzar Codex cuando sí actúa, restringiendo el acceso al sistema de archivos y a la red. Son diales independientes. El modo YOLO suele poner las aprobaciones en full auto, y el error común es dejar el sandbox abierto de par en par al mismo tiempo.',
    },
    {
      question: '¿Cómo ejecuto un enjambre de Codex en full auto sin perder el control?',
      answer: 'Ejecuta Codex CLI en CodeAgentSwarm, elige codex cli en el selector SELECT AI AGENT en cada terminal y activa Turbo Mode. Los permisos por terminal te dejan autoaprobar las operaciones seguras mientras bloqueas push, force-push, merge y borrado de ramas en cada agente. Consigues la velocidad del full auto en varios agentes de Codex a la vez, supervisados desde una sola ventana.',
    },
    {
      question: '¿Puede el full auto borrar mis archivos o hacer push a la rama equivocada?',
      answer: 'Sí. Con las aprobaciones desactivadas y sin capa de permisos, Codex puede ejecutar rm -rf, sobrescribir trabajo sin commitear y hacer commit o force-push a la rama equivocada, todo sin preguntar. Bloquear las operaciones peligrosas de Git y trabajar en una rama de feature son los dos cambios que evitan los accidentes más comunes.',
    },
    {
      question: '¿Es YOLO una función oficial de Codex?',
      answer: 'No. YOLO es un término informal de la comunidad para ejecutar sin aprobaciones. Las funciones reales son los modos de aprobación y el sandbox. Usa codex --help para ver los flags y modos exactos que admite tu versión instalada, ya que OpenAI cambia los nombres entre versiones.',
    },
    {
      question: '¿Existe un flag codex --yolo?',
      answer: 'No hay un flag literal --yolo. El modo YOLO es solo el apodo. La forma real de ejecutar Codex sin aprobaciones es el nivel de full auto, normalmente el flag --full-auto, o una opción aparte para saltarse las aprobaciones por completo en tiradas sin supervisión. Ejecuta codex --help para confirmar el flag exacto de tu versión instalada.',
    },
    {
      question: '¿Qué es el modo auto y el auto-approve de Codex?',
      answer: 'El modo auto es el punto intermedio del espectro de aprobaciones de Codex: ejecuta el trabajo rutinario por su cuenta y solo se para a preguntarte en acciones más arriesgadas o cuando falla un comando, en vez de aprobar cada paso o ninguno. El auto-approve es dejar pasar acciones concretas sin preguntar. En CodeAgentSwarm puedes autoaprobar categorías seguras como ediciones de archivos y tests por terminal mientras sigues bloqueando los comandos peligrosos de Git y de shell.',
    },
    {
      question: '¿Cómo ejecuto Codex en modo YOLO?',
      answer: 'Ejecuta Codex sin aprobaciones usando su nivel de full auto (revisa codex --help para el flag exacto, normalmente --full-auto), idealmente en una rama de feature y con un sandbox apretado. Para un setup más seguro, ejecuta Codex dentro de CodeAgentSwarm, activa Turbo Mode y configura permisos por terminal para que el trabajo seguro se autoapruebe mientras push, force-push y borrados siguen parándose para que los revises.',
    },
  ],
}

export default guide
