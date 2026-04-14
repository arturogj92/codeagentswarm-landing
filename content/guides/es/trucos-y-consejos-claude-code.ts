import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'trucos-y-consejos-claude-code',
    locale: 'es',
    title: '20 trucos y consejos de Claude Code para mejorar tu productividad',
    metaTitle: '20 trucos y consejos de Claude Code que ojalá hubieras conocido antes (2026)',
    metaDescription: 'Mejora tu productividad con Claude Code con 20 trucos y consejos: archivos CLAUDE.md, atajos de teclado, sesiones en paralelo, gestión del historial, servidores MCP y flujos avanzados. Actualizado 2026.',
    intro: `La mayoría de la gente empieza a usar Claude Code y lo primero que hace es pedirle que "arregle cosas". Funciona, pero estás dejando mucha productividad sobre la mesa.

Después de meses de uso diario en decenas de proyectos, estos son los 20 trucos que realmente marcan la diferencia. Algunos son funciones nativas de Claude Code que quizá no conocías, otros son patrones de trabajo que se acumulan con el tiempo.

Tanto si acabas de empezar como si ya usas Claude Code a diario, aquí hay algo para ti. Vamos a ello.`,
    ctaText: 'Lleva tu flujo de trabajo con Claude Code al siguiente nivel con CodeAgentSwarm. Múltiples terminales, notificaciones, historial y mucho más.',
    highlightedWords: ['trucos', 'Claude Code'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'claude-code-tips-and-tricks',
  },
  sections: [
    {
      id: 'empezar-bien',
      title: 'Empezar con buen pie',
      content: [
        {
          type: 'paragraph',
          text: 'Antes de pedirle a Claude que escriba una sola línea de código, estos cinco hábitos te prepararán para obtener resultados consistentemente mejores. Se implementan en minutos y dan resultados en cada sesión.',
        },
        {
          type: 'list',
          items: [
            '<strong>Consejo 1: Crea un archivo CLAUDE.md en cada proyecto.</strong> Claude lee este archivo automáticamente cuando inicia una sesión. Pon tus decisiones de arquitectura, convenciones de nombres, stack tecnológico y todo lo que Claude debería saber siempre. Es lo que más impacto tiene porque le da a Claude contexto persistente sin que tengas que repetirte.',
            '<strong>Consejo 2: Usa mensajes iniciales claros y específicos.</strong> "Arregla el bug de expiración del JWT en el middleware de auth" siempre dará mejores resultados que "arregla el bug del login". Cuanto más preciso sea tu primer mensaje, menos ida y vuelta necesitas. Piénsalo como escribir un buen título de ticket.',
            '<strong>Consejo 3: Una tarea por conversación.</strong> Resiste la tentación de amontonar tareas sin relación en la misma sesión. Una conversación enfocada por tarea mantiene el contexto limpio, evita confusiones y hace que tu <a href="/es/guias/guia-completa-historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones</a> sea realmente buscable después.',
            '<strong>Consejo 4: Trabaja siempre en una rama de feature.</strong> Nunca dejes que Claude trabaje directamente en main. Crea una rama primero, deja que Claude haga lo suyo, revisa los cambios y luego haz merge. Si algo sale mal, puedes descartar la rama sin ningún riesgo.',
            '<strong>Consejo 5: Haz commit antes de tareas complejas.</strong> Antes de pedir a Claude un refactor grande o un cambio en múltiples archivos, haz commit de tu trabajo actual. Esto crea un punto de restauración al que puedes volver con <code>git reset</code> si Claude se desvía. Un seguro barato.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'El archivo CLAUDE.md también soporta archivos anidados. Puedes tener uno global en ~/.claude/CLAUDE.md y otros específicos por proyecto en la raíz de cada repositorio. Claude los lee todos.',
        },
      ],
    },
    {
      id: 'atajos-productividad',
      title: 'Atajos de productividad',
      content: [
        {
          type: 'paragraph',
          text: 'Estos son los comandos y patrones que más tiempo te ahorran en el día a día. La mayoría de usuarios de Claude Code solo los descubren después de semanas de uso.',
        },
        {
          type: 'list',
          items: [
            '<strong>Consejo 6: Usa <code>claude -c</code> para retomar tu última conversación.</strong> En lugar de empezar de cero y volver a explicar en qué estabas trabajando, simplemente retómala. Claude continúa justo donde lo dejaste con todo el contexto. Retomar es casi siempre mejor que reiniciar.',
            '<strong>Consejo 7: Usa <code>/compact</code> para reducir el contexto cuando las conversaciones se alargan.</strong> Las conversaciones largas consumen la ventana de contexto y ralentizan a Claude. El comando /compact resume la conversación hasta el momento y libera espacio. Úsalo cada vez que notes que Claude empieza a perder el hilo.',
            '<strong>Consejo 8: Pasa archivos directamente a Claude por pipe.</strong> No tienes que copiar y pegar código en el chat. Pasa archivos, logs y salida de errores directamente desde tu terminal.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `cat src/auth/middleware.py | claude "explain this code"
npm test 2>&1 | claude "fix the failing tests"
git diff | claude "review these changes"`,
        },
        {
          type: 'list',
          items: [
            '<strong>Consejo 9: Usa <code>--print</code> para preguntas rápidas de una sola vez.</strong> Cuando solo necesitas una respuesta rápida sin iniciar una sesión interactiva, usa el flag print. Sin overhead de conversación, solo la respuesta.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `claude --print "what does this regex do: ^[a-z]+$"
claude --print "convert this curl to fetch: curl -X POST https://api.example.com/data"`,
        },
        {
          type: 'list',
          items: [
            '<strong>Consejo 10: Crea comandos slash personalizados.</strong> Pon prompts reutilizables en tu directorio <code>.claude/commands/</code> e invócalos como comandos slash. Ideal para flujos repetitivos como generar tests, escribir documentación o ejecutar revisiones de código con los estándares de tu equipo.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Los comandos personalizados son simplemente archivos markdown. Crea <code>.claude/commands/review.md</code> con tus criterios de revisión y luego usa <code>/project:review</code> en cualquier sesión.',
        },
      ],
    },
    {
      id: 'flujos-avanzados',
      title: 'Flujos de trabajo avanzados',
      content: [
        {
          type: 'paragraph',
          text: 'Una vez que domines lo básico, estas técnicas te ayudarán a trabajar en varias cosas a la vez e integrar Claude en el resto de tus herramientas.',
        },
        {
          type: 'list',
          items: [
            '<strong>Consejo 11: Ejecuta varias sesiones de Claude Code en paralelo.</strong> No esperes a que una tarea termine para empezar otra. Abre un segundo terminal, inicia una nueva sesión y trabaja en otra cosa mientras la primera se ejecuta. Si quieres una configuración adecuada para esto, mira la guía sobre <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar múltiples sesiones de Claude Code</a>.',
            '<strong>Consejo 12: Configura servidores MCP para tus herramientas.</strong> MCP (Model Context Protocol) permite que Claude interactúe directamente con servicios como GitHub, Supabase, Notion y bases de datos. En lugar de copiar y pegar datos entre herramientas, Claude puede consultarlos y actuar sobre ellos directamente. Mira la guía de <a href="/es/guias/mejores-servidores-mcp-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">mejores servidores MCP para Claude Code</a>.',
            '<strong>Consejo 13: Usa YOLO mode con inteligencia y con protecciones.</strong> Saltarse las confirmaciones hace que Claude sea mucho más rápido, pero necesitas protecciones. Bloquea operaciones peligrosas como git push y borrado de archivos mientras permites que lecturas y ediciones se auto-aprueben. Tutorial completo en la <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de YOLO mode</a>.',
            '<strong>Consejo 14: Usa <code>/init</code> para generar el CLAUDE.md automáticamente.</strong> Si empiezas con un proyecto nuevo y no quieres escribir el CLAUDE.md desde cero, ejecuta <code>/init</code>. Claude analizará la estructura del proyecto, las dependencias y los patrones de código, y luego generará un CLAUDE.md por ti. Es un buen punto de partida que puedes refinar.',
            '<strong>Consejo 15: Revisa los cambios en tiempo real.</strong> No esperes a que Claude diga "listo" para ver qué cambió. Usa un visor de diffs en vivo para ver las modificaciones mientras ocurren. Esto te permite detectar problemas pronto en lugar de revisar un diff enorme al final. Aquí te explicamos cómo <a href="/es/guias/ver-cambios-claude-code-tiempo-real" class="text-neon-cyan hover:text-neon-purple transition-colors">ver los cambios de Claude Code en tiempo real</a>.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Cuando ejecutes sesiones en paralelo que toquen los mismos archivos, ten cuidado con los conflictos de merge. Asigna cada sesión a una zona diferente del código o usa ramas separadas.',
        },
      ],
    },
    {
      id: 'secretos-usuario-avanzado',
      title: 'Secretos de usuario avanzado',
      content: [
        {
          type: 'paragraph',
          text: 'Estos son los trucos que separan al usuario casual del que ha integrado Claude Code en cada parte de su flujo de trabajo. Cada uno desbloquea un tipo diferente de ventaja.',
        },
        {
          type: 'list',
          items: [
            '<strong>Consejo 16: Usa el historial de conversaciones como documentación.</strong> Cada sesión de Claude Code registra las decisiones que tomaste, las alternativas que consideraste y el razonamiento detrás de tu código. Eso es documentación que obtienes gratis. Busca en tu <a href="/es/guias/guia-completa-historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">historial de conversaciones</a> cuando necesites recordar por qué algo se construyó de cierta manera.',
            '<strong>Consejo 17: Configura notificaciones para dejar de mirar el terminal.</strong> Si Claude está trabajando en una tarea larga, no necesitas quedarte mirando el terminal esperando. Configura notificaciones de escritorio para que te avise cuando Claude termina, encuentra un error o necesita tu input. Más detalles en la <a href="/es/guias/notificaciones-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de notificaciones</a>.',
            '<strong>Consejo 18: Usa Claude Code para revisar código.</strong> Pásale un diff o PR y pídele una revisión completa. Claude detectará bugs, sugerirá mejoras y señalará posibles problemas. Funciona especialmente bien cuando se hace directamente por pipe desde git.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `git diff main..feature/auth | claude "review these changes, focus on security"
gh pr diff 42 | claude "review this PR"`,
        },
        {
          type: 'list',
          items: [
            '<strong>Consejo 19: Automatiza tareas repetitivas con hooks y scripts.</strong> Si te encuentras dando a Claude las mismas instrucciones una y otra vez, automatízalo. Usa comandos personalizados, hooks o incluso scripts de shell que pasen contexto a Claude por pipe. Cuanto menos escribas manualmente, más produces.',
            '<strong>Consejo 20: Usa CodeAgentSwarm para orquestar todo.</strong> Todos los trucos de arriba funcionan por separado, pero funcionan todavía mejor juntos. CodeAgentSwarm te da múltiples terminales en un solo espacio de trabajo, notificaciones cuando las sesiones terminan, historial buscable en todas las sesiones, un tablero de tareas y marketplace de MCP. Es el centro de control que conecta todo el flujo de trabajo.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'No tienes que adoptar los 20 consejos de golpe. Empieza con los consejos 1-5, añade los atajos de los consejos 6-10 cuando sean relevantes, y ve incorporando los flujos avanzados cuando te sientas cómodo.',
        },
      ],
    },
    {
      id: 'referencia-rapida',
      title: 'Hoja de referencia rápida',
      content: [
        {
          type: 'paragraph',
          text: 'Un resumen rápido de los comandos y patrones más útiles de esta guía.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Resume last conversation
claude -c

# One-shot question (no interactive session)
claude --print "your question here"

# Pipe files and output to Claude
cat file.py | claude "explain this"
npm test 2>&1 | claude "fix these"
git diff | claude "review this"

# Bootstrap CLAUDE.md for a new project
claude
> /init

# Compact a long conversation
> /compact

# Use a custom command
> /project:your-command`,
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Esa es la lista completa. Estos 20 trucos cubren todo, desde tu primera sesión hasta un flujo de trabajo con múltiples terminales y múltiples proyectos. Lo mejor es que se acumulan: cada truco que adoptas hace que los demás sean más efectivos.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Cuál es el consejo más importante de Claude Code?',
      answer: 'Crear un archivo CLAUDE.md en la raíz de tu proyecto. Le da a Claude contexto persistente sobre tu arquitectura, convenciones y stack tecnológico para que no tengas que repetirte en cada sesión. Este único hábito mejora cada interacción.',
    },
    {
      question: '¿Cómo hago que Claude Code sea más rápido?',
      answer: 'Usa YOLO mode o Turbo Mode para operaciones seguras y que Claude se salte las confirmaciones. Retoma conversaciones con claude -c en lugar de volver a explicar el contexto. Usa /compact para liberar la ventana de contexto en sesiones largas. Ejecuta sesiones en paralelo para tareas independientes.',
    },
    {
      question: '¿Puede Claude Code hacer revisiones de código?',
      answer: 'Sí. Pasa un diff o PR directamente a Claude por pipe y pide una revisión. Por ejemplo: git diff main..feature | claude "review these changes". Claude analizará el código, señalará posibles bugs y sugerirá mejoras.',
    },
    {
      question: '¿Qué es CLAUDE.md?',
      answer: 'Un archivo markdown que colocas en la raíz de tu proyecto y que Claude lee automáticamente al inicio de cada sesión. Úsalo para documentar tu arquitectura, convenciones de nombres, stack tecnológico y decisiones clave. También puedes tener uno global en ~/.claude/CLAUDE.md para preferencias que apliquen a todos tus proyectos.',
    },
    {
      question: '¿Cómo gestiono múltiples proyectos con Claude Code?',
      answer: 'Usa CodeAgentSwarm para gestionar múltiples proyectos. Te da terminales separados para cada proyecto o tarea, historial de conversaciones buscable en todas las sesiones, un tablero de tareas para hacer seguimiento del trabajo y notificaciones para no tener que estar pendiente de cada terminal.',
    },
    {
      question: '¿Cuáles son los mejores atajos de teclado de Claude Code?',
      answer: 'Los comandos más útiles son /compact para reducir el uso de contexto, /clear para iniciar una conversación desde cero, /init para generar un CLAUDE.md para tu proyecto, y los comandos slash personalizados desde tu directorio .claude/commands/ para flujos de trabajo específicos del proyecto.',
    },
  ],
}

export default guide
