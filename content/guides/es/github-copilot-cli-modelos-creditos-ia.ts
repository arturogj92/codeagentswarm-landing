import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-modelos-creditos-ia',
    locale: 'es',
    title: 'Modelos, créditos de IA y límites de GitHub Copilot CLI',
    metaTitle: 'GitHub Copilot CLI: modelos, créditos de IA y límites',
    metaDescription: 'Cómo gasta GitHub Copilot CLI los créditos de IA en Free, Pro, Pro+ y Max, cómo elegir modelo y nivel de razonamiento y cómo ver el uso mensual.',
    intro: 'Copilot CLI gasta los créditos de IA mensuales de tu plan de GitHub Copilot. Aquí tienes qué incluye cada plan, cómo elegir modelo y dónde ver lo que te queda. Las cifras se comprobaron con la documentación de GitHub el 8 de octubre de 2026.',
    ctaText: 'Consulta la asignación mensual de GitHub Copilot CLI junto a tus otros agentes y cambia de modelo desde Chat en CodeAgentSwarm.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-models-ai-credits',
    relatedSlug: 'como-usar-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-es.png',
  },
  sections: [
    {
      id: 'planes',
      title: 'Qué incluye cada plan de Copilot',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'table',
          headers: ['Plan de Copilot', 'Precio', 'Créditos de IA al mes'],
          rows: [
            ['Free', 'Gratis', 'Ninguno; Copilot CLI usa selección automática de modelo dentro de una asignación mensual limitada de Chat'],
            ['Pro', '10 $ al mes', '1.500 (1.000 base + 500 flexibles)'],
            ['Pro+', '39 $ al mes', '7.000 (3.900 base + 3.100 flexibles)'],
            ['Max', '100 $ al mes', '20.000 (10.000 base + 10.000 flexibles)'],
          ],
        },
        {
          type: 'paragraph',
          text: `Copilot CLI, Copilot Chat, los agentes en la nube y Spark gastan créditos de IA. Las sugerencias de código del editor no. La asignación vuelve al total a las 00:00 UTC del primer día de cada mes y los créditos sin usar no se acumulan. Si defines un presupuesto, el uso adicional cuesta 0,01 $ por crédito. Fuente: ${link('https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals', 'facturación de GitHub para particulares')}.`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Las cuentas en la plataforma de facturación antigua ven <strong>premium requests</strong> en lugar de créditos de IA. Copilot CLI muestra lo que corresponda a tu cuenta.',
        },
      ],
    },
    {
      id: 'modelos',
      title: 'Elige un modelo',
      content: [
        { type: 'code', language: 'bash', code: 'copilot --model auto' },
        {
          type: 'paragraph',
          text: 'Dentro de la CLI, <code>/model</code> abre el selector y muestra el coste relativo de cada modelo. <code>auto</code> deja que Copilot elija en cada petición. El catálogo depende de tu plan y de la política de tu organización, así que la lista que ves puede ser distinta de la de otra persona. Copilot Free solo ofrece la selección automática.',
        },
        {
          type: 'paragraph',
          text: 'En Chat de CodeAgentSwarm, el selector de modelos muestra el catálogo que Copilot comunica al iniciar la sesión. La elección se recuerda para las nuevas conversaciones con Copilot.',
        },
      ],
    },
    {
      id: 'razonamiento',
      title: 'El esfuerzo de razonamiento se fija al arrancar',
      content: [
        { type: 'code', language: 'bash', code: 'copilot --reasoning-effort high' },
        {
          type: 'paragraph',
          text: 'Los niveles válidos son <code>none</code>, <code>minimal</code>, <code>low</code>, <code>medium</code>, <code>high</code>, <code>xhigh</code> y <code>max</code>. En el servidor ACP que usa Chat el nivel también es una opción de arranque y no un ajuste de cada sesión, por eso CodeAgentSwarm no muestra un selector de esfuerzo para Copilot en Chat. Los niveles altos suelen tardar más y pueden gastar más créditos.',
        },
      ],
    },
    {
      id: 'contexto-o-asignacion',
      title: 'El contexto no es tu asignación mensual',
      content: [
        {
          type: 'table',
          headers: ['Dónde', 'Qué te dice'],
          rows: [
            ['<code>/context</code>', 'Cuánto ocupa la ventana de contexto de la conversación actual.'],
            ['<code>/usage</code>', 'Créditos y tokens que ha usado esta sesión.'],
            ['Cuota en la barra inferior o en <code>/statusline</code>', 'Lo que queda de la asignación mensual de tu plan.'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Empezar una conversación nueva vacía la ventana de contexto, pero no devuelve créditos. Una sesión puede tener mucho contexto libre mientras la cuenta está casi sin créditos.',
        },
      ],
    },
    {
      id: 'panel-de-uso',
      title: 'Consulta la asignación mensual en CodeAgentSwarm',
      content: [
        {
          type: 'image',
          src: '/images/guides/copilot-usage-panel.webp',
          alt: 'Uso mensual de GitHub Copilot CLI en el panel de uso de CodeAgentSwarm',
          caption: 'Interfaz real con valores de prueba: el 7 % restante es un dato de ejemplo, no el saldo de una cuenta real.',
          size: 'small',
        },
        {
          type: 'paragraph',
          text: 'El panel de uso muestra cuánto queda de la asignación mensual y cuándo se reinicia, junto a tus otros agentes. Lee la misma información de cuenta que usan los clientes de Copilot, con un token de <code>COPILOT_GITHUB_TOKEN</code>, <code>GH_TOKEN</code>, <code>GITHUB_TOKEN</code> o GitHub CLI. Nunca abre el llavero del sistema, porque macOS te pediría permiso cada vez.',
        },
        {
          type: 'paragraph',
          text: 'Si solo iniciaste sesión con <code>copilot login</code> y no tienes GitHub CLI, el panel muestra la asignación como no disponible. Significa que no pudo leerla, no que tengas uso ilimitado. En Copilot Free, que no tiene créditos de IA, el panel muestra esa asignación mensual de Chat.',
        },
      ],
    },
    {
      id: 'antes-de-una-tarea-larga',
      title: 'Una comprobación rápida antes de una tarea larga',
      content: [
        {
          type: 'list',
          items: [
            'Confirma qué cuenta de GitHub usa Copilot. Si <code>gh</code> tiene una sesión iniciada y Copilot no tiene la suya, usa la cuenta de GitHub CLI.',
            'Revisa la asignación que queda y la fecha de reinicio.',
            'Elige tú el modelo en lugar de suponer que <code>auto</code> eligió uno barato.',
            'Define un presupuesto en GitHub si una tarea grande puede superar la asignación.',
          ],
        },
        {
          type: 'paragraph',
          text: `La instalación y el inicio de sesión están en ${link('/es/guias/como-usar-github-copilot-cli', 'cómo instalar y usar GitHub Copilot CLI')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿GitHub Copilot CLI usa créditos de IA o premium requests?',
      answer: 'Créditos de IA en la plataforma de facturación actual. Las cuentas que siguen en la plataforma antigua ven premium requests. En ambos casos, Copilot CLI descuenta de la misma asignación mensual que Copilot Chat.',
    },
    {
      question: '¿Cuántos créditos de IA incluye Copilot Pro?',
      answer: 'Copilot Pro incluye 1.500 créditos de IA al mes (1.000 base y 500 flexibles) por 10 $. Pro+ incluye 7.000 por 39 $ y Max incluye 20.000 por 100 $, a fecha de 8 de octubre de 2026.',
    },
    {
      question: '¿Cuándo se reinician los créditos de IA de GitHub Copilot?',
      answer: 'A las 00:00 UTC del primer día de cada mes natural. Los créditos sin usar se pierden.',
    },
    {
      question: '¿Puedo elegir modelo en Copilot Free?',
      answer: 'No. Copilot Free solo usa la selección automática de modelo. Los planes de pago pueden elegir modelo con /model o con la opción --model.',
    },
    {
      question: '¿Por qué CodeAgentSwarm muestra mi uso de Copilot como no disponible?',
      answer: 'Necesita un token de COPILOT_GITHUB_TOKEN, GH_TOKEN, GITHUB_TOKEN o una sesión de GitHub CLI. No lee el llavero, así que un inicio de sesión hecho solo con copilot login no basta.',
    },
  ],
}

export default guide
