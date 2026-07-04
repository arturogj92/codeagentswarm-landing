import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'compartir-skills-entre-claude-code-codex-antigravity',
    locale: 'es',
    title: 'Cómo compartir tus skills entre Claude Code, Codex y Antigravity',
    metaTitle: 'Compartir skills entre Claude Code, Codex y Antigravity (CodeAgentSwarm, 2026)',
    metaDescription: 'Tus skills de Claude Code solo viven en Claude. Aquí tienes cómo copiar las mismas skills SKILL.md a Codex y Antigravity en un clic con CodeAgentSwarm, sin mover carpetas a mano.',
    intro: `Dedicaste tiempo a montar buenas skills para Claude Code. Luego abres Codex o Antigravity para una tarea y no aparece ninguna. Mismo formato SKILL.md, misma máquina, pero cada agente solo lee su propia carpeta.

Me pasó a mí usando varios agentes el mismo día, así que le añadí una solución a CodeAgentSwarm: eliges un agente origen, eliges a dónde quieres las skills, y las exportas en un clic.

En esta guía te explico, claro y sencillo, por qué tus skills se quedan atrapadas en un agente y cómo compartirlas entre Claude Code, Codex y Antigravity sin copiar carpetas a mano.`,
    ctaText: 'Monta tus skills una vez en Claude Code y expórtalas a Codex y Antigravity en un clic para que todos los agentes trabajen con el mismo set de herramientas.',
    highlightedWords: ['skills', 'Codex', 'Antigravity'],
    publishedAt: '2026-07-04',
    updatedAt: '2026-07-04',
    alternateSlug: 'share-skills-between-claude-code-codex-antigravity',
  },
  sections: [
    {
      id: 'por-que-las-skills-se-quedan-en-un-agente',
      title: 'Por qué tus skills se quedan atrapadas en un agente',
      content: [
        {
          type: 'paragraph',
          text: 'Una skill no es más que una carpeta con un archivo <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">SKILL.md</a> dentro. Lo bueno es que Claude Code, Codex, Antigravity y OpenCode leen exactamente el mismo formato. Lo incómodo es que cada uno lo lee de su propia carpeta.',
        },
        {
          type: 'list',
          items: [
            'Claude Code lee las skills de ~/.claude/skills',
            'Codex las lee de ~/.codex/skills',
            'Antigravity las lee de ~/.gemini/antigravity-cli/skills',
            'OpenCode las lee de ~/.config/opencode/skills',
          ],
        },
        {
          type: 'paragraph',
          text: 'Así que una skill que instalaste para Claude es sencillamente invisible para Codex y Antigravity. No está roto nada. Simplemente vive en una carpeta que los otros agentes nunca miran.',
        },
        {
          type: 'paragraph',
          text: 'Si solo usas un agente, esto nunca te pasa. Pero en cuanto saltas entre Claude Code, Codex y Antigravity en el mismo proyecto, notas que te falta la mitad del set de herramientas según cuál abriste.',
        },
      ],
    },
    {
      id: 'la-forma-manual',
      title: 'La forma manual (y por qué cansa)',
      content: [
        {
          type: 'paragraph',
          text: 'Como el formato es idéntico, puedes mover una skill a mano. Copias la carpeta de un agente al otro:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'cp -r ~/.claude/skills/mi-skill ~/.codex/skills/\ncp -r ~/.claude/skills/mi-skill ~/.gemini/antigravity-cli/skills/',
        },
        {
          type: 'paragraph',
          text: 'Eso vale para una skill. Cansa rápido cuando tienes veinte, cuando las quieres en dos agentes a la vez, y cuando tienes que acordarte de cuáles ya copiaste y cuáles editaste después.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Copiar carpetas a lo loco también sobrescribe una skill que quizá ajustaste para un agente concreto. Haciéndolo a mano es fácil pisar tus propios cambios sin darte cuenta.',
        },
      ],
    },
    {
      id: 'exportar-skills-en-un-clic',
      title: 'Exporta tus skills en un clic con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm hace esa misma copia, pero te enseña exactamente qué va a pasar y te deja elegir. Este es el flujo entero.',
        },
        {
          type: 'heading',
          level: 3,
          text: '1. Abre la pestaña Skills y pulsa Export to agent',
          id: 'paso-abrir',
        },
        {
          type: 'paragraph',
          text: 'Ve a Ajustes, abre la pestaña Skills y quédate en Installed. Junto a Refresh y Open Folder verás el botón Export to agent.',
        },
        {
          type: 'image',
          alt: 'El botón Export to agent en la pestaña Skills de CodeAgentSwarm',
          src: '/images/guides/export-skills-entry.png',
          caption: 'Export to agent está en la cabecera de Skills, junto a Refresh y Open Folder.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Elige el origen, elige los destinos, elige las skills',
          id: 'paso-elegir',
        },
        {
          type: 'paragraph',
          text: 'El modal te pregunta tres cosas. De dónde vienen las skills (el agente origen), a dónde deben ir (uno o varios agentes destino) y qué skills quieres de verdad. Todas empiezan marcadas, así que solo deseleccionas las que no necesitas.',
        },
        {
          type: 'image',
          alt: 'El modal Export skills de CodeAgentSwarm con los agentes origen y destino y la lista de skills',
          src: '/images/guides/export-skills-modal.png',
          caption: 'El origen a la izquierda, uno o varios destinos a la derecha, y la lista completa de skills abajo con buscador y seleccionar todas.',
        },
        {
          type: 'paragraph',
          text: 'Cada skill te dice si es Nueva en el destino o si Ya está, así que nunca adivinas qué estás a punto de sobrescribir.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Decide sobrescribir o saltar, y exporta',
          id: 'paso-sobrescribir',
        },
        {
          type: 'paragraph',
          text: 'El interruptor Overwrite existing controla qué pasa con las skills que ya están en un destino. Apagado (por defecto) las salta y deja lo que haya. Encendido las reemplaza con la versión del origen. Cuando lo tengas listo, pulsa Export y míralo avanzar, agente por agente.',
        },
        {
          type: 'image',
          alt: 'La pantalla de resultado tras exportar skills, con el desglose por agente',
          src: '/images/guides/export-skills-result.png',
          caption: 'Al terminar tienes un resumen por agente: qué se copió, qué se saltó y lo que haya fallado.',
        },
      ],
    },
    {
      id: 'sobrescribir-o-saltar',
      title: 'Sobrescribir o saltar: cuál elegir',
      content: [
        {
          type: 'paragraph',
          text: 'Una regla sencilla para no meterte en líos:',
        },
        {
          type: 'list',
          items: [
            'Deja Overwrite apagado cuando solo quieres que el destino tenga tus skills y no quieres tocar nada de lo que ya hay. Lo que exista se salta.',
            'Enciende Overwrite cuando editaste una skill en el origen y quieres que el destino quede igual. Reemplaza la copia del destino.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Apagado es el valor seguro a propósito. Nunca va a reemplazar en silencio una skill que ajustaste para un agente concreto.',
        },
      ],
    },
    {
      id: 'un-set-en-todos-los-agentes',
      title: 'Un mismo set de herramientas en todos los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'La idea es sencilla. Montas tus skills una vez, en el agente que prefieras, y luego todos los agentes que uses tienen el mismo set. Sin reinstalar la misma skill tres veces, sin malabares con carpetas.',
        },
        {
          type: 'paragraph',
          text: 'Si todavía estás armando tu colección de skills, el marketplace integrado es la forma más rápida de llenarla: <a href="/es/guias/marketplace-de-skills-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo buscar e instalar skills desde el marketplace de CodeAgentSwarm</a>. Instálalas una vez y luego expórtalas a todas partes.',
        },
        {
          type: 'paragraph',
          text: 'Y si tienes varios agentes trabajando a la vez, esto encaja bien con el flujo multi agente: <a href="/es/guias/enjambre-de-agentes-cli-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo ejecutar agentes de Claude Code, Codex y Gemini en paralelo</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Claude Code, Codex y Antigravity usan el mismo formato de skill?',
      answer: 'Sí. Los tres leen una carpeta con un archivo SKILL.md en el mismo formato. La única diferencia es la carpeta en la que mira cada uno, y por eso una skill instalada para uno no la ven los demás hasta que la copias.',
    },
    {
      question: '¿Puedo copiar mis skills de Claude Code a Codex o Antigravity?',
      answer: 'Sí. En CodeAgentSwarm abre la pestaña Skills, pulsa Export to agent, elige Claude como origen, marca Codex, Antigravity u OpenCode como destino y exporta. Copia las carpetas SKILL.md reales al agente destino, sin conversión de formato.',
    },
    {
      question: '¿Dónde guarda cada agente sus skills?',
      answer: 'Claude Code usa ~/.claude/skills, Codex usa ~/.codex/skills, Antigravity usa ~/.gemini/antigravity-cli/skills y OpenCode usa ~/.config/opencode/skills. Cada carpeta tiene una subcarpeta por skill con su SKILL.md dentro.',
    },
    {
      question: '¿Al exportar se sobrescriben las skills que ya edité en el destino?',
      answer: 'No, no por defecto. Las skills que ya existen en el destino se saltan, así que tus cambios están a salvo. Si de verdad quieres que el destino quede igual que el origen, enciende el interruptor Overwrite existing antes de exportar.',
    },
    {
      question: '¿Tengo que reinstalar cada skill del marketplace en cada agente?',
      answer: 'No. Instala una skill una vez y luego expórtala a los demás agentes. No hace falta volver a pasar por el marketplace para cada agente.',
    },
    {
      question: '¿Esto funciona en Windows y macOS?',
      answer: 'Sí. CodeAgentSwarm funciona en ambos y la exportación va igual en cada uno. Solo cambian las rutas de las carpetas de skills según el sistema operativo, y la app se encarga de eso por ti.',
    },
  ],
}

export default guide
