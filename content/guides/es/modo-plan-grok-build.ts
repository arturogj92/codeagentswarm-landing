import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-plan-grok-build',
    locale: 'es',
    title: 'Modo Plan de Grok Build: revisa y aprueba antes de que pique código',
    metaTitle: 'Modo Plan de Grok Build (xAI): revisa antes de codear (2026)',
    metaDescription: 'Modo Plan de Grok Build explicado: /plan y Shift+Tab, la pantalla de aprobación, --no-plan y cuándo --always-approve es mala idea.',
    intro: `El Modo Plan es la forma de Grok Build de pensar antes de reescribir media base de código. En lugar de lanzarse a tools, el agente planifica pasos que puedes revisar. Es lo contrario del YOLO ciego, y es una de las features que la gente busca al evaluar la CLI de xAI.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chat Grok de consumo.

Esta guía cubre cómo entrar en plan mode, cómo funciona la pantalla de aprobación, cuándo desactivarlo, cómo encaja <code>--always-approve</code> y cómo CodeAgentSwarm avisa cuando el plan espera por ti.`,
    ctaText: 'Ejecuta sesiones de Grok Build en Modo Plan dentro de CodeAgentSwarm y recibe un aviso de escritorio cuando el plan espera aprobación.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Modo Plan', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-10-31',
    alternateSlug: 'grok-build-plan-mode',
  },
  sections: [
    {
      id: 'que-es',
      title: 'Para qué sirve el Modo Plan',
      content: [
        { type: 'paragraph', text: 'Los cambios multi-archivo arriesgados se benefician de un plan escrito antes de editar. En el TUI, escribe <code>/plan</code> (o <code>/plan</code> seguido de una descripción para arrancar directamente), o pulsa <code>Shift+Tab</code> una vez desde el modo Normal. Mientras planifica, Grok solo puede editar el archivo de plan de la sesión; lecturas, comandos de shell y MCP siguen tu modo de permisos, así que una redirección de shell aún puede escribir archivos. Grok también puede entrar en plan mode por su cuenta si la tarea parece ambigua. Usa <code>--no-plan</code> para desactivarlo cuando quieras ir rápido en una tarea bien acotada.' },
        { type: 'code', language: 'bash', code: '# Dentro del TUI de grok\n/plan Refactoriza el módulo de billing\n\n# O desactiva el plan para un arreglo concreto\ngrok --no-plan "Arregla el null check en src/api.ts"' },
        { type: 'paragraph', text: 'Cuando el plan está listo, Grok abre una vista previa: pulsa <code>a</code> para aprobar y empezar, <code>s</code> para pedir cambios, <code>c</code> para comentar una línea y <code>q</code> para salir de plan mode. <code>/view-plan</code> la reabre después. La <a href="https://docs.x.ai/build/features/plan-mode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación oficial de Plan Mode</a> lista todas las teclas.' },
      ],
    },
    {
      id: 'yolo',
      title: 'Dónde encaja --always-approve',
      content: [
        { type: 'paragraph', text: '<code>--always-approve</code> (alias <code>--yolo</code>) auto-aprueba tools. Es autonomía estilo YOLO: útil en un worktree aislado con tarea clara, peligrosa en main con secretos de prod cerca. No se salta la revisión del plan: si plan mode está activo, sigues aprobando el plan antes de que Grok edite código.' },
        { type: 'callout', variant: 'warning', content: 'No combines auto-approve ciego con credenciales de producción. Prefiere Modo Plan o permisos por defecto cuando el radio de explosión no está claro. El Turbo Mode de CodeAgentSwarm es un control aparte para auto-acciones seguras; no sustituye pensar en los flags de Grok.' },
        { type: 'code', language: 'bash', code: '# Solo si aceptas el riesgo\ngrok --always-approve --worktree=exp "prueba la migración"' },
      ],
    },
    {
      id: 'cas',
      title: 'Modo Plan + CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'Cuando el plan espera por ti, una pestaña olvidada cuesta horas. CodeAgentSwarm muestra estado y notificaciones de escritorio para que un terminal Grok Build que necesita input no se pierda.' },
      ],
    },
  ],
  faq: [
    { question: '¿Cómo activo el Modo Plan?', answer: 'Escribe /plan en el TUI de Grok Build o pulsa Shift+Tab una vez desde el modo Normal. Usa --no-plan para desactivar plan mode en una sesión.' },
    { question: '¿--always-approve es lo mismo?', answer: 'No. El Modo Plan te hace revisar un plan antes de editar. --always-approve auto-aprueba las llamadas a tools, pero si plan mode está activo sigue mostrando la revisión del plan. Úsalo solo si el riesgo es aceptable.' },
    { question: '¿Ayuda CodeAgentSwarm?', answer: 'Sí. Te avisa cuando un terminal Grok Build necesita input.' },
  ],
}

export default guide
