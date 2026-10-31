import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-yolo-opencode',
    locale: 'es',
    title: 'Modo YOLO de OpenCode: ¿existe? Los permisos explicados',
    metaTitle: 'Modo YOLO de OpenCode: permisos por configuración (2026)',
    metaDescription: 'Cómo hacer bypass permissions en opencode: el flag --auto aprueba todo lo que no esté denegado, o pon permission en allow en opencode.json. Riesgos y ajustes seguros.',
    intro: `Si usas cualquier agente de código en terminal más de unos minutos, las peticiones de aprobación cansan rápido. Cada escritura de archivo, cada comando de shell se para a esperar que digas que sí. Con Claude Code y Codex, la gente tira de un bypass de un solo flag, y la comunidad empezó a llamar a eso "modo YOLO".

opencode toma un camino distinto. No hay <code>--yolo</code> ni ningún flag dangerously-skip-permissions, pero opencode sí trae <code>--auto</code>, que aprueba cualquier petición de permiso que una regla no deniegue de forma explícita. Para lo permanente, opencode lee cuánta libertad le diste desde su configuración de permisos: en un archivo de config decides qué tipos de acciones se ejecutan solas, cuáles preguntan primero y cuáles se bloquean. <code>--auto</code> o una config todo-en-allow es lo más parecido al "modo YOLO", y los dos conllevan los mismos riesgos que cualquier flag de bypass.

Esta guía explica cómo funcionan juntos el flag y la config, qué se rompe en serio cuando permites todo y cómo conseguir la velocidad del full-auto sin perder el control. Esa última parte es donde entra CodeAgentSwarm: no añade un interruptor de Turbo Mode para opencode, porque opencode gestiona su autonomía con su propio flag y su config, pero sí mantiene supervisada una sesión permisiva de opencode con diffs en vivo, notificaciones de escritorio e historial buscable.`,
    ctaText: 'Ejecuta opencode con una config permisiva sin ir a ciegas. CodeAgentSwarm le da a cada terminal de opencode diffs en vivo, notificaciones de escritorio e historial buscable, para que el trabajo en full auto nunca se convierta en una caja negra.',
    ctaAgent: 'opencode',
    highlightedWords: ['OpenCode', 'modo YOLO'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'opencode-yolo-mode',
  },
  sections: [
    {
      id: 'que-es-modo-yolo-opencode',
      title: 'Qué significa "modo YOLO" y la respuesta corta para opencode',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'opencode bypass permissions: ¿existe una bandera?',
          id: 'opencode-bypass-permissions',
        },
        {
          type: 'paragraph',
          text: 'Sí: <code>--auto</code>. Arranca <code>opencode --auto</code>, o <code>opencode run --auto</code> para una tarea suelta, y opencode aprueba cualquier petición de permiso que no esté denegada de forma explícita. No hay <code>--yolo</code> ni ninguna opción dangerously-skip-permissions. Para un ajuste duradero, usa <code>opencode.json</code>: pon cada tipo de acción en allow, ask o deny, o pon <code>"permission": "allow"</code> para permitirlo todo de una vez.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Sesión interactiva\nopencode --auto\n\n# Tarea suelta\nopencode run --auto "Ejecuta los tests y arregla los fallos"',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm en modo lista con agentes, estados, actividad y accesos a proyectos',
          src: '/images/guides/workspace-list.webp',
          caption: 'Vista de lista de CodeAgentSwarm: cada sesión muestra su agente, estado y actividad. Tareas de ejemplo.',
        },
        {
          type: 'paragraph',
          text: '"Modo YOLO" es el apodo de la comunidad para ejecutar un agente de código con las aprobaciones desactivadas, para que trabaje sin pararse a preguntarte. El nombre viene de herramientas como Claude Code y Codex, donde un único flag apaga las peticiones. La idea cuajó porque capta la sensación: solo se vive una vez, así que apaga las peticiones y deja que el agente corra.',
        },
        {
          type: 'paragraph',
          text: 'La respuesta corta para <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a> es el flag <code>--auto</code>, descrito en la <a href="https://opencode.ai/docs/permissions/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de permisos de opencode</a> (revisada el 31 de octubre de 2026). Solo cambia las peticiones que de otro modo pedirían aprobación, así que las reglas deny explícitas se siguen aplicando. En la TUI también puedes elegir Enable auto-approve permissions o Disable auto-approve permissions para cambiar de modo durante una sesión.',
        },
        {
          type: 'paragraph',
          text: 'Para un ajuste que valga en todas las sesiones, la respuesta es un archivo de config. Le dices a opencode qué tipos de acciones se autoejecutan, cuáles preguntan primero y cuáles se deniegan, y se comporta así en cada sesión.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Antes de tirar de --auto, mira qué sigue preguntando. Según la documentación oficial, la mayoría de los permisos de opencode ya vienen en allow por defecto. doom_loop y external_directory vienen en ask, y leer archivos .env pide aprobación. Así que --auto sobre todo quita esas peticiones y las reglas ask que hayas añadido tú.',
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
          text: 'La autonomía duradera de opencode vive en la configuración; <code>--auto</code> solo cambia la sesión que arrancas con él. Los permisos se definen en <code>opencode.json</code>. Hay una config global en <code>~/.config/opencode/opencode.json</code>, además de config por proyecto y config por agente, así que distintos agentes pueden ejecutarse con distinta cantidad de libertad. Un agente de refactor de confianza puede correr más suelto que uno general, y tu repo del trabajo puede quedarse más estricto que un proyecto paralelo.',
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
          text: 'Poner todo en allow, con <code>"permission": "allow"</code>, es la versión en config de <code>--auto</code>. Hace que opencode lea, escriba y ejecute comandos por su cuenta, sin ninguna petición de por medio. La velocidad es real, y el riesgo también: una config todo-en-allow conlleva exactamente el mismo peligro que cualquier flag de bypass, porque no queda nada que frene un comando destructivo.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'En qué se diferencia de Claude Code y Codex',
          id: 'en-que-se-diferencia',
        },
        {
          type: 'paragraph',
          text: 'Claude Code tiene <code>--dangerously-skip-permissions</code> y Codex tiene <code>--yolo</code>, que además quita el sandbox de Codex. <code>--auto</code> en opencode es más acotado: las reglas deny explícitas siguen bloqueando. La <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Turbo Mode YOLO de Claude Code</a> explica en detalle el modelo de Claude.',
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
          content: 'Una config todo-en-allow, o <code>--auto</code> sin reglas deny, es exactamente igual de peligrosa que cualquier flag YOLO. La ventaja de opencode es que las reglas deny sobreviven a <code>--auto</code>: puedes dejar que las ediciones de archivos corran mientras <code>git push</code> o <code>rm</code> siguen denegados, así que el trabajo seguro pasa de largo mientras los comandos peligrosos siguen parándose.',
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
          text: 'Arranca <code>opencode --auto</code> o pon todos los permisos en allow, y deja que opencode corra sin supervisión. Esto va bien para proyectos de pruebas y ramas desechables, donde confías en que nada destructivo puede importar y puedes tirarlo todo a la basura. En un repo real con historial de verdad, correr del todo abierto es una apuesta, porque una sola instrucción malinterpretada alcanza Git, borrados y la red sin ninguna petición de por medio.',
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
          text: 'Que quede claro: CodeAgentSwarm no ofrece Turbo Mode para las sesiones de opencode. opencode controla su autonomía con su propio flag <code>--auto</code> y su config de permisos, así que ahí es donde decides qué se autoejecuta. Lo que CodeAgentSwarm añade en su lugar es supervisión alrededor de tu configuración permisiva de opencode, para que el trabajo en full auto nunca sea una caja negra.',
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
            '<strong>Mantén en ask las acciones destructivas de Git y de shell.</strong> Aunque todo lo demás esté en allow, push, force-push, merge, borrado de ramas y los comandos de shell irreversibles deberían seguir parándose a pedir confirmación. Si arrancas con <code>--auto</code>, las reglas ask se aprueban solas, así que ponlas en deny. Son las acciones de mayor impacto y más difíciles de deshacer.',
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
      answer: 'Casi. El flag --auto aprueba cualquier petición de permiso que no esté denegada de forma explícita, y poner "permission": "allow" en opencode.json hace lo mismo en todas las sesiones. No hay flag --yolo ni dangerously-skip-permissions, y las reglas deny siguen aplicándose con --auto.',
    },
    {
      question: '¿Existe un flag opencode --yolo o --full-auto?',
      answer: 'No. opencode no tiene --yolo, ni --full-auto, ni ningún flag dangerously-skip-permissions. Su equivalente es --auto: opencode --auto, u opencode run --auto, aprueba cualquier petición de permiso que una regla no deniegue de forma explícita. Para un ajuste permanente, usa los permisos de opencode.json.',
    },
    {
      question: '¿Cómo hago que opencode se ejecute sin pedir aprobación?',
      answer: 'Arráncalo con opencode --auto, u opencode run --auto para una tarea suelta. Para todas las sesiones, pon los permisos en allow en opencode.json: "permission": "allow" lo permite todo, mientras que { "permission": { "edit": "allow", "bash": "ask" } } mantiene en ask los comandos de shell. Revisa la documentación oficial de opencode para el esquema que admite tu versión instalada.',
    },
    {
      question: '¿Cómo hago bypass permissions en opencode?',
      answer: 'Usa el flag --auto, que aprueba cualquier petición que no esté denegada de forma explícita, o pon los permisos en allow en opencode.json. Con --auto las reglas deny explícitas siguen bloqueando, y esa es la diferencia principal con --dangerously-skip-permissions de Claude Code. Revisa la documentación oficial de opencode para el esquema que admite tu versión instalada.',
    },
    {
      question: '¿Tiene opencode una bandera --dangerously-skip-permissions?',
      answer: 'No. Esa bandera es de Claude Code, y Codex usa --yolo. Lo más parecido en opencode es --auto, que mantiene en vigor las reglas deny explícitas. El comportamiento duradero de allow, ask y deny vive en opencode.json.',
    },
    {
      question: '¿Cómo hago que opencode se salte las confirmaciones de permisos?',
      answer: 'Arranca opencode con --auto, o pon en allow los tipos de acción que quieras sin supervisión en opencode.json, de forma global en ~/.config/opencode/opencode.json o por proyecto y por agente. Una config selectiva es la versión más segura: permite las ediciones de archivos para que el trabajo rutinario vuele, y mantén en ask las acciones de shell y las destructivas de Git, o en deny si usas --auto.',
    },
    {
      question: '¿Es seguro poner todos los permisos de opencode en allow?',
      answer: 'Una config todo-en-allow, o --auto sin reglas deny, es rápida pero exactamente igual de peligrosa que cualquier flag YOLO: opencode puede ejecutar git push, rm -rf o DROP TABLE sin ninguna petición. Es razonable en una rama desechable. En un repo real, permite las ediciones de archivos y deja en ask (o en deny con --auto) las acciones peligrosas de shell y de Git, y supervisa la tirada con diffs en vivo.',
    },
    {
      question: '¿Dónde vive la config de permisos de opencode?',
      answer: 'La config global está en ~/.config/opencode/opencode.json, siguiendo el layout XDG. También hay config por proyecto y config por agente, así que distintos agentes y distintos repos pueden ejecutarse con distinta cantidad de libertad. Las instrucciones permanentes van en AGENTS.md, el archivo de instrucciones común entre herramientas que hereda cada sesión.',
    },
    {
      question: '¿En qué se diferencia opencode --auto de Codex --yolo o de Claude Code --dangerously-skip-permissions?',
      answer: '--dangerously-skip-permissions de Claude Code y --yolo de Codex se saltan sus controles en esa tirada, y --yolo además quita el sandbox de Codex. opencode --auto solo aprueba las peticiones que de otro modo preguntarían, así que las reglas deny explícitas siguen bloqueando. Su política duradera vive en opencode.json, un archivo que puedes leer y commitear, en lugar de un flag que alguien teclea con prisa y olvida.',
    },
    {
      question: '¿Tiene CodeAgentSwarm Turbo Mode para opencode?',
      answer: 'No. CodeAgentSwarm no ofrece Turbo Mode para las sesiones de opencode; opencode gestiona su autonomía con su propio flag --auto y su config de permisos. Lo que CodeAgentSwarm añade para opencode es supervisión: diffs en vivo por terminal, notificaciones de escritorio cuando un agente termina o se atasca, títulos dinámicos e historial buscable y reanudable.',
    },
    {
      question: '¿Puede opencode borrar archivos o hacer push a la rama equivocada en full auto?',
      answer: 'Sí, si se lo permites. Con las acciones de shell y de Git en allow, o con --auto y sin reglas deny, opencode puede ejecutar rm -rf, sobrescribir trabajo sin commitear y hacer commit o force-push a la rama equivocada, todo sin preguntar. Mantener en ask (en deny con --auto) las acciones destructivas de Git y de shell, trabajar en una rama de feature y hacer commit antes de una tirada son los guardarraíles que evitan los accidentes más comunes.',
    },
  ],
}

export default guide
