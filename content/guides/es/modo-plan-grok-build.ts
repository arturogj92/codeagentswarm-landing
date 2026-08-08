import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'modo-plan-grok-build',
    locale: 'es',
    title: 'Modo Plan de Grok Build: revisa y aprueba antes de que pique código',
    metaTitle: 'Modo Plan de Grok Build (xAI): revisa antes de codear (2026)',
    metaDescription: 'Modo Plan de Grok Build explicado: planning y gates de aprobación, --permission-mode plan, --no-plan y cuándo --always-approve es mala idea.',
    intro: `El Modo Plan es la forma de Grok Build de pensar antes de reescribir media base de código. En lugar de lanzarse a tools, el agente planifica pasos que puedes revisar. Es lo contrario del YOLO ciego, y es una de las features que la gente busca al evaluar la CLI de xAI.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chat Grok de consumo.

Esta guía cubre permisos orientados a plan, cuándo desactivar plan mode, cómo encaja <code>--always-approve</code> y cómo CodeAgentSwarm avisa cuando el plan espera por ti.`,
    ctaText: 'Ejecuta sesiones de Grok Build en Modo Plan dentro de CodeAgentSwarm y recibe un aviso de escritorio cuando el plan espera aprobación.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Modo Plan', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-plan-mode',
  },
  sections: [
    {
      id: 'que-es',
      title: 'Para qué sirve el Modo Plan',
      content: [
        { type: 'paragraph', text: 'Los cambios multi-archivo arriesgados se benefician de un plan escrito antes de editar. Grok Build expone comportamiento orientado a plan con <code>--permission-mode plan</code> y permite desactivar planning con <code>--no-plan</code>.' },
        { type: 'code', language: 'bash', code: 'grok --permission-mode plan "Refactoriza el módulo de billing"\ngrok --no-plan "Arregla el null check en src/api.ts"' },
      ],
    },
    {
      id: 'yolo',
      title: 'Dónde encaja --always-approve',
      content: [
        { type: 'paragraph', text: '<code>--always-approve</code> auto-aprueba tools. Es autonomía estilo YOLO: útil en un worktree aislado con tarea clara, peligrosa en main con secretos de prod cerca.' },
        { type: 'callout', variant: 'warning', content: 'No combines auto-approve ciego con credenciales de producción. Prefiere Modo Plan o permisos por defecto cuando el radio de explosión no está claro.' },
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
    { question: '¿Cómo activo el Modo Plan?', answer: 'Usa grok --permission-mode plan. Usa --no-plan para desactivar plan mode en una sesión.' },
    { question: '¿--always-approve es lo mismo?', answer: 'No. El Modo Plan enfatiza revisar antes de cambios grandes. --always-approve salta gates humanos.' },
    { question: '¿Ayuda CodeAgentSwarm?', answer: 'Sí. Te avisa cuando un terminal Grok Build necesita input.' },
  ],
}

export default guide
