import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-yolo-opencode',
    locale: 'es',
    title: 'Modo YOLO de OpenCode: ¿existe? Los permisos explicados',
    metaTitle: 'Modo YOLO de OpenCode: permisos por configuración (2026)',
    metaDescription: '¿Tiene opencode un modo YOLO? No hay un único flag. La autonomía se configura en opencode.json. Cómo ejecutar opencode en full auto con seguridad sin ir a ciegas.',
    intro: `Si usas cualquier agente de código en terminal más de unos minutos, las peticiones de aprobación cansan rápido. Cada escritura de archivo, cada comando de shell se para a esperar que digas que sí. Con Claude Code y Codex, la gente tira de un bypass de un solo flag, y la comunidad empezó a llamar a eso "modo YOLO".

opencode toma un camino distinto. No hay <code>--yolo</code>, no hay <code>--full-auto</code>, no hay ningún flag de saltarse-nada-peligrosamente. En vez de un interruptor tosco, opencode lee cuánta libertad le diste desde su configuración de permisos. Tú decides, en un archivo de config, qué tipos de acciones se ejecutan solas, cuáles preguntan primero y cuáles se bloquean. Lo más parecido al "modo YOLO" es poner todo en allow, y eso conlleva exactamente los mismos riesgos que cualquier flag de bypass.

Esta guía explica cómo es de verdad ese modelo por configuración, qué se rompe en serio cuando permites todo y cómo conseguir la velocidad del full-auto sin perder el control. Esa última parte es donde entra CodeAgentSwarm: no añade un interruptor de Turbo Mode para opencode, porque la propia config de opencode es el plano de control, pero sí mantiene supervisada una config permisiva de opencode con diffs en vivo, notificaciones de escritorio e historial buscable.`,
    ctaText: 'Ejecuta opencode con una config permisiva sin ir a ciegas. CodeAgentSwarm le da a cada terminal de opencode diffs en vivo, notificaciones de escritorio e historial buscable, para que el trabajo en full auto nunca se convierta en una caja negra.',
    highlightedWords: ['OpenCode', 'modo YOLO'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'opencode-yolo-mode',
  },
  sections: [
    {
      id: 'que-es-modo-yolo-opencode',
      title: 'Qué significa "modo YOLO" y la respuesta corta para opencode',
      content: [
        {
          type: 'image',
          alt: 'Un terminal de CodeAgentSwarm mostrando el selector SELECT AI AGENT donde eliges el agente por terminal, incluido opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'En CodeAgentSwarm pones un terminal en opencode. Lo autónomo que se ejecuta viene de la propia config de permisos de opencode, y CodeAgentSwarm mantiene la tirada supervisada con diffs en vivo y notificaciones.',
        },
        {
          type: 'paragraph',
          text: '"Modo YOLO" es el apodo de la comunidad para ejecutar un agente de código con las aprobaciones desactivadas, para que trabaje sin pararse a preguntarte. El nombre viene de herramientas como Claude Code y Codex, donde un único flag apaga las peticiones. La idea cuajó porque capta la sensación: solo se vive una vez, así que apaga las peticiones y deja que el agente corra.',
        },
        {
          type: 'paragraph',
          text: 'La respuesta corta para <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a> es que no existe ese flag. No hay <code>--yolo</code>, no hay <code>--full-auto</code>, no hay ninguna opción de saltarse-nada-peligrosamente. opencode, el agente de terminal de código abierto de SST, no trae ningún bypass de un solo interruptor. En su lugar, lee cuánta libertad le diste desde su configuración de permisos.',
        },
        {
          type: 'paragraph',
          text: 'Eso significa que la pregunta "¿cómo activo el modo YOLO en opencode?" no tiene un flag como respuesta. La respuesta es un archivo de config. Le dices a opencode qué tipos de acciones se autoejecutan, cuáles preguntan primero y cuáles se deniegan, y se comporta así en cada sesión.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Esto es una diferencia de diseño, no una función que falte. En vez de un interruptor tosco que tecleas con prisa, opencode te pide que digas qué tipos de acciones se autoejecutan, cuáles preguntan y cuáles se bloquean. El estado permisivo pasa a ser algo explícito que configuras y no un flag que activas.',
        },
        {
          type: 'paragraph',
          text: 'Si lo que de verdad buscas es ejecutar varios agentes de opencode a la vez y no solo uno en full auto, la guía del <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes opencode</a> cubre ese lado, y la visión general del <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">enjambre de agentes CLI de IA</a> lo compara en todas las CLI.',
        },
      ],
    },
    {
      id: 'como-funcionan-los-permisos',
      title: 'Cómo funcionan en realidad los permisos de opencode',
      content: [
        {
          type: 'paragraph',
          text: 'La autonomía de opencode vive en la configuración, no en un flag. Los permisos se definen en <code>opencode.json</code>. Hay una config global en <code>~/.config/opencode/opencode.json</code>, además de config por proyecto y config por agente, así que distintos agentes pueden ejecutarse con distinta cantidad de libertad. Un agente de refactor de confianza puede correr más suelto que uno general, y tu repo del trabajo puede quedarse más estricto que un proyecto paralelo.',
        },
        {
          type: 'paragraph',
          text: 'Los valores siguen un patrón de allow, ask, deny por tipo de acción. Decides, por ejemplo, que las ediciones de archivos se ejecutan solas mientras los comandos de shell se paran a preguntar primero. Una config mínima tiene esta pinta:',
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "permission": {\n    "edit": "allow",\n    "bash": "ask"\n  }\n}',
        },
        {
          type: 'paragraph',
          text: 'Tómalo como ilustrativo. Las claves y los valores exactos evolucionan entre versiones de opencode, y el esquema crece con el tiempo, así que la <a href="https://opencode.ai/docs" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de opencode</a> es la fuente de verdad para lo que admite tu versión instalada. No copies una config que viste en un post antiguo sin contrastarla con la documentación actual.',
        },
        {
          type: 'paragraph',
          text: 'Poner todo en allow es lo más parecido que tiene opencode a un modo YOLO. Hace que opencode lea, escriba y ejecute comandos por su cuenta, sin ninguna petición de por medio. La velocidad es real, y el riesgo también: una config todo-en-allow conlleva exactamente el mismo peligro que cualquier flag de bypass, porque no queda nada que frene un comando destructivo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'En qué se diferencia de Claude Code y Codex',
          id: 'en-que-se-diferencia',
        },
        {
          type: 'paragraph',
          text: 'Claude Code y Codex exponen un bypass de un solo flag. Claude Code tiene <code>--dangerously-skip-permissions</code>, Codex tiene <code>--full-auto</code>. Tecleas el flag y las aprobaciones se apagan para esa tirada. La <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode YOLO de Claude Code</a> de CodeAgentSwarm recorre ese modelo en detalle.',
        },
        {
          type: 'paragraph',
          text: 'El enfoque por configuración de opencode es, siendo justos, más sensato. El estado permisivo es explícito, versionable y acotado: vive en un archivo que puedes leer, commitear y compartir, en lugar de un flag que alguien teclea con prisa y olvida. Ves de un vistazo qué acciones autoaprueba tu proyecto, y mantienes esa política consistente en cada sesión en vez de depender de acordarte de añadir o quitar un flag cada vez.',
        },
      ],
    },
    {
      id: 'riesgos-reales',
      title: 'Los riesgos reales de permitir todo',
      content: [
        {
          type: 'paragraph',
          text: 'Esto no son hipótesis. Con todo puesto en allow, opencode se ejecuta sobre un repo en uso con un historial de Git de verdad y datos de verdad, y cualquiera de estas cosas puede pasar dentro de una sola sesión, sin ninguna petición que la frene antes.',
        },
        {
          type: 'list',
          items: [
            '<strong>Push de Git a la rama equivocada</strong> - opencode decide hacer commit y push de trabajo a medias a main, o hace force-push y machaca a un compañero.',
            '<strong>Borrado de archivos o directorios</strong> - Una instrucción malinterpretada se convierte en <code>rm -rf</code> sobre una ruta que no querías eliminar.',
            '<strong>Comandos de shell irreversibles</strong> - <code>DROP TABLE</code>, <code>docker system prune</code> o cualquier cosa que no se pueda deshacer una vez se ejecuta.',
            '<strong>Instalar la dependencia equivocada</strong> - <code>npm install</code> sobre un paquete con typosquatting o comprometido que a simple vista parecía correcto.',
            '<strong>Llamadas de red no deseadas</strong> - Golpear endpoints de producción, enviar datos a servicios externos o disparar webhooks que no esperabas.',
            '<strong>Sobrescribir trabajo sin commitear</strong> - opencode edita archivos que estabas tocando y tu trabajo sin commitear desaparece antes de que te des cuenta.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'La config todo-en-allow es exactamente igual de peligrosa que cualquier flag YOLO. La ventaja del modelo de opencode es que no tienes que ir a todo o nada: la config te deja permitir las ediciones de archivos mientras mantienes las acciones peligrosas de shell o de Git en ask, así que el trabajo seguro pasa de largo mientras los comandos peligrosos siguen parándose.',
        },
        {
          type: 'paragraph',
          text: 'El full auto no es malo en sí. Es el ajuste correcto para mucho trabajo. El riesgo viene de poner todo en allow sin mantener frenadas las operaciones de verdad peligrosas. La siguiente sección va justo sobre eso.',
        },
      ],
    },
    {
      id: 'ejecutar-con-seguridad',
      title: 'Cómo ejecutar opencode en full auto con seguridad',
      content: [
        {
          type: 'paragraph',
          text: 'Hay varios enfoques, del menos controlado al más. El objetivo es el mismo en todos: mantener la velocidad del full auto en las operaciones seguras sin dejar nunca que un comando destructivo se ejecute sin supervisión.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 1: permitir todo en trabajo desechable',
          id: 'metodo-permitir-todo',
        },
        {
          type: 'paragraph',
          text: 'Pon todos los permisos en allow y deja que opencode corra sin supervisión. Esto va bien para proyectos de pruebas y ramas desechables, donde confías en que nada destructivo puede importar y puedes tirarlo todo a la basura. En un repo real con historial de verdad, correr del todo abierto es una apuesta, porque una sola instrucción malinterpretada alcanza Git, borrados y la red sin ninguna petición de por medio.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 2: una config de permisos selectiva (el punto dulce)',
          id: 'metodo-config-selectiva',
        },
        {
          type: 'paragraph',
          text: 'Un punto de partida mejor es una config selectiva. Permite las ediciones y lecturas de archivos para que el trabajo rutinario pase de largo, pero mantén los comandos de shell, o al menos los destructivos, en ask. Ponlo por proyecto o por agente, para que un agente de refactor de confianza corra más suelto que uno general, y tu repo principal se quede más estricto que un proyecto de pruebas. Luego mete tus normas de la casa en <code>AGENTS.md</code>, el archivo de instrucciones común entre herramientas, para que cada sesión herede la misma guía sin que la repitas.',
        },
        {
          type: 'paragraph',
          text: 'Este es el punto dulce porque conserva las partes del full auto que de verdad ahorran tiempo mientras frena el puñado de acciones que causan daño real. A diferencia de un solo flag de bypass, no te obliga a elegir entre preguntar por todo y no preguntar por nada.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Método 3: ejecutar la config permisiva dentro de CodeAgentSwarm (recomendado para enjambres)',
          id: 'metodo-codeagentswarm',
        },
        {
          type: 'paragraph',
          text: 'Que quede claro: CodeAgentSwarm no expone un interruptor de Turbo Mode para opencode. El Turbo Mode existe para Claude Code y Codex, que tienen un flag de bypass que activar. opencode no tiene ese flag, así que su propia config de permisos es el plano de control y no hay nada que un interruptor pueda cambiar. Lo que CodeAgentSwarm añade en su lugar es supervisión alrededor de tu config permisiva de opencode, para que el trabajo en full auto nunca sea una caja negra.',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que te da esa supervisión por encima de opencode:',
        },
        {
          type: 'list',
          items: [
            '<strong>Varios terminales de opencode en una ventana</strong> - Ejecuta todo un enjambre de opencode en paralelo en lugar de hacer malabares con ventanas sueltas.',
            '<strong>Diffs de archivos en vivo por terminal</strong> - Observa exactamente qué está cambiando cada agente de opencode en tiempo real, para que una config permisiva nunca corra sin verse.',
            '<strong>Notificaciones de escritorio</strong> - Recibe un aviso cuando un agente termina o se atasca esperando input, en vez de vigilar cada terminal.',
            '<strong>Títulos dinámicos</strong> - Cada terminal muestra en qué está trabajando su agente, para que distingas el enjambre de un vistazo.',
            '<strong>Historial buscable y reanudable</strong> - Audita qué hizo un agente después de los hechos y retoma una sesión con el propio soporte de reanudación de opencode.',
          ],
        },
        {
          type: 'paragraph',
          text: 'La combinación de una config selectiva más supervisión en tiempo real es lo que hace viable un enjambre permisivo de opencode. La config decide qué se autoejecuta; CodeAgentSwarm se asegura de que puedas ver y auditar cada una de esas tiradas. Para ejecutar muchos agentes de opencode a la vez, la guía de <a href="/es/guias/ejecutar-multiples-sesiones-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de opencode</a> cubre el montaje de principio a fin.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'La config por proyecto significa que tu repo del trabajo puede quedarse estricto mientras un proyecto paralelo corre abierto de par en par, y CodeAgentSwarm muestra ambos tipos de terminal lado a lado en la misma ventana, cada uno con su propio diff en vivo.',
        },
      ],
    },
    {
      id: 'buenas-practicas',
      title: 'Buenas prácticas para tiradas de opencode en full auto',
      content: [
        {
          type: 'paragraph',
          text: 'Sea cual sea el método que uses, estos hábitos mantienen fuera de la mesa los peores accidentes del full auto:',
        },
        {
          type: 'list',
          items: [
            '<strong>Trabaja siempre en una rama de feature, nunca en main.</strong> Si opencode la lía, tiras la rama. Si la lía en main, lo nota todo el equipo.',
            '<strong>Haz commit antes de empezar una tirada permisiva.</strong> Un punto de restauración limpio significa que <code>git checkout .</code> te devuelve al instante si algo sale mal.',
            '<strong>Mantén en ask las acciones destructivas de Git y de shell.</strong> Aunque todo lo demás esté en allow, push, force-push, merge, borrado de ramas y los comandos de shell irreversibles deberían pararse a pedir confirmación. Son las acciones de mayor impacto y más difíciles de deshacer.',
            '<strong>Mete las instrucciones permanentes en AGENTS.md.</strong> Las normas de la casa en el archivo de instrucciones común hacen que cada sesión de opencode herede los mismos guardarraíles sin que los repitas.',
            '<strong>Vigila el diff en vivo.</strong> Una vista de cambios de archivos por terminal convierte una config permisiva de caja negra en algo que de verdad puedes supervisar.',
            '<strong>Mantén los prompts acotados.</strong> "Refactoriza el middleware de auth para usar JWT" es mucho más seguro en full auto que "mejora el código". Cuanto más estrecho el alcance, menos margen tiene opencode para irse por las ramas.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Una config selectiva más una rama de feature más un diff en vivo te dan casi toda la velocidad del full auto con casi nada del riesgo. La mayoría de quien monta esto no vuelve a permitir todo sobre un repo real.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Tiene opencode un modo YOLO?',
      answer: 'No como un único flag. "Modo YOLO" es el apodo de la comunidad para ejecutar un agente de código con las aprobaciones desactivadas, y opencode no tiene un bypass de un solo interruptor. En su lugar, la autonomía se configura: en opencode.json pones qué tipos de acciones se ejecutan solas, cuáles preguntan primero y cuáles se deniegan. Poner todo en allow es lo más cerca que llega opencode del modo YOLO.',
    },
    {
      question: '¿Existe un flag opencode --yolo o --full-auto?',
      answer: 'No. A diferencia de Claude Code o Codex, opencode no trae un flag --yolo, --full-auto ni dangerously-skip-permissions. No hay nada que teclear para apagar las aprobaciones en una tirada. Configuras la autonomía a través de los ajustes de permisos de opencode en opencode.json, que es donde vive todo su comportamiento de allow, ask y deny.',
    },
    {
      question: '¿Cómo hago que opencode se ejecute sin pedir aprobación?',
      answer: 'Pon los permisos en allow en opencode.json. Un ejemplo mínimo es { "permission": { "edit": "allow", "bash": "ask" } }, y permitir todos los tipos de acción es la versión totalmente sin supervisión. Como las claves y los valores exactos cambian entre versiones, revisa la documentación oficial de opencode para el esquema que admite tu versión instalada antes de fiarte de una config.',
    },
    {
      question: '¿Es seguro poner todos los permisos de opencode en allow?',
      answer: 'Una config todo-en-allow es rápida pero exactamente igual de peligrosa que cualquier flag YOLO: sin nada en ask, opencode puede ejecutar git push, rm -rf o DROP TABLE sin ninguna petición. Es razonable en una rama desechable. En un repo real, usa una config selectiva que permita las ediciones de archivos mientras mantiene las acciones peligrosas de shell y de Git en ask, y supervisa la tirada con diffs en vivo.',
    },
    {
      question: '¿Dónde vive la config de permisos de opencode?',
      answer: 'La config global está en ~/.config/opencode/opencode.json, siguiendo el layout XDG. También hay config por proyecto y config por agente, así que distintos agentes y distintos repos pueden ejecutarse con distinta cantidad de libertad. Las instrucciones permanentes van en AGENTS.md, el archivo de instrucciones común entre herramientas que hereda cada sesión.',
    },
    {
      question: '¿En qué se diferencia el enfoque de opencode de Codex --full-auto o Claude Code --dangerously-skip-permissions?',
      answer: 'Codex y Claude Code saltan las aprobaciones con un único flag que tecleas por tirada. opencode no tiene ese flag; su autonomía se configura a través de opencode.json. La diferencia práctica es que el estado permisivo es explícito, versionable y acotado en un archivo que puedes leer y commitear, en lugar de un flag que alguien teclea con prisa y olvida.',
    },
    {
      question: '¿Tiene CodeAgentSwarm Turbo Mode para opencode?',
      answer: 'No, y es a propósito. El Turbo Mode existe para Claude Code y Codex porque esos tienen un flag de bypass que activar. La propia config de permisos de opencode dirige su autonomía, así que no hay nada que un interruptor pueda cambiar. Lo que CodeAgentSwarm añade para opencode en su lugar es supervisión: diffs en vivo por terminal, notificaciones de escritorio cuando un agente termina o se atasca, títulos dinámicos e historial buscable y reanudable.',
    },
    {
      question: '¿Puede opencode borrar archivos o hacer push a la rama equivocada en full auto?',
      answer: 'Sí, si se lo permites. Con las acciones de shell y de Git en allow, opencode puede ejecutar rm -rf, sobrescribir trabajo sin commitear y hacer commit o force-push a la rama equivocada, todo sin preguntar. Mantener en ask las acciones destructivas de Git y de shell, trabajar en una rama de feature y hacer commit antes de una tirada son los guardarraíles que evitan los accidentes más comunes.',
    },
  ],
}

export default guide
