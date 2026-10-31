import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-vs-cursor',
    locale: 'es',
    title: 'Grok Build vs Cursor: ¿agente CLI o IDE con IA?',
    metaTitle: 'Grok Build vs Cursor (CLI xAI vs IDE con IA, 2026)',
    metaDescription: 'Grok Build (agente de terminal xAI) vs IDE Cursor: productos distintos. Cuándo quieres un enjambre CLI frente a un editor con IA, y dónde encaja CodeAgentSwarm.',
    intro: `Cursor es un IDE nativo de IA. Grok Build es un agente de código en terminal de xAI. Compararlos como si uno sustituyera al otro falla: uno domina la UX del editor, el otro un bucle CLI autónomo que puedes scriptear, usar por SSH y meter en un enjambre.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chatbot Grok.`,
    ctaText: 'Quédate con Cursor si amas el IDE. Añade terminales Grok Build en CodeAgentSwarm cuando quieras agentes CLI supervisados en paralelo.',
    ctaAgent: 'multi',
    highlightedWords: ['Grok Build', 'Cursor'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-10-31',
    alternateSlug: 'grok-build-vs-cursor',
  },
  sections: [
    {
      id: 'categoria',
      title: 'Categorías distintas',
      content: [
        { type: 'list', items: ['<strong>Cursor:</strong> fork de VS Code con chat/edición IA dentro del editor. También tiene un agente de terminal, <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent</a>, y xAI indica que <a href="https://docs.x.ai/developers/grok-4-7" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok 4.7</a> está disponible en Cursor en todos los planes.', '<strong>Grok Build:</strong> agente TUI/CLI con tools, headless, multi-sesión, subagentes.', '<strong>CodeAgentSwarm:</strong> supervisor de escritorio para muchos agentes CLI, no un IDE.'] },
      ],
    },
    {
      id: 'cuando',
      title: 'Cuándo gana cada uno',
      content: [
        { type: 'paragraph', text: 'Cursor gana cuando quieres completions inline, chat dentro del editor y un único IDE pulido. Grok Build gana con bucles largos en terminal, ejecuciones CI/headless, experimentos con worktrees o varios agentes en paralelo bajo un supervisor.' },
        { type: 'paragraph', text: 'Mucha gente usa ambos: Cursor para editar de forma interactiva y Grok Build (y compañía) para trabajo multiagente en segundo plano dentro de CodeAgentSwarm.' },
      ],
    },
  ],
  faq: [
    { question: '¿Grok Build es alternativa a Cursor?', answer: 'Solo en parte. Es un agente CLI, no un IDE completo. Mucha gente usa ambos.' },
    { question: '¿CAS sustituye a Cursor?', answer: 'No. CAS supervisa agentes CLI; no es un editor de código.' },
  ],
}

export default guide
