import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-vs-claude-code',
    locale: 'es',
    title: 'Cursor CLI vs Claude Code: cuál encaja en tu flujo',
    metaTitle: 'Cursor CLI vs Claude Code: comparativa práctica (2026)',
    metaDescription: 'Compara Cursor CLI, Cursor IDE y Claude Code por interfaz, cuenta, configuración y trabajo con varios agentes. Elige según el flujo de tu equipo.',
    intro: `Cursor CLI y Claude Code son agentes de programación para terminal de proveedores distintos. Ambos pueden inspeccionar un proyecto, usar herramientas y ayudar con tareas de código, pero pertenecen a ecosistemas diferentes de cuentas, modelos y configuración.

Hay una segunda distinción importante. <strong>Cursor IDE</strong> es el editor. <strong>Cursor Agent CLI</strong> es el agente beta de Cursor para línea de comandos y se inicia con <code>cursor-agent</code>. <strong>Claude Code</strong> es el agente de programación para terminal de Anthropic. Esta guía compara las dos CLI y explica dónde encaja el editor de Cursor.`,
    ctaText: 'Ejecuta Cursor Agent y Claude Code en el mismo espacio de CodeAgentSwarm y elige el agente que encaje en cada tarea.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Claude Code'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-cli-vs-claude-code',
  },
  sections: [
    {
      id: 'comparativa-rapida',
      title: 'Cursor CLI vs Claude Code de un vistazo',
      content: [
        { type: 'table', headers: ['Pregunta', 'Cursor Agent CLI', 'Claude Code'], rows: [
          ['Proveedor', 'Cursor', 'Anthropic'],
          ['Comando', 'cursor-agent', 'claude'],
          ['Cuenta y uso', 'Cuenta de Cursor o CURSOR_API_KEY', 'Cuenta de Anthropic o configuración de API compatible'],
          ['Configuración del proyecto', 'Configuración de Cursor, incluido .cursor/mcp.json', 'Configuración de Claude Code'],
          ['Uso en CodeAgentSwarm', 'Chat ACP y flujos de terminal', 'Flujos compatibles en el mismo espacio'],
        ], caption: 'La diferencia práctica empieza por el ecosistema de proveedor que ya utilizas.' },
        { type: 'paragraph', text: 'Ninguna columna gana en todos los casos. Cursor CLI encaja de forma directa cuando tus proyectos y tu suscripción ya están en Cursor. Claude Code encaja cuando tu equipo se organiza alrededor de Anthropic y la configuración de Claude Code.' },
      ],
    },
    {
      id: 'cursor-ide-vs-cli',
      title: 'Cursor IDE y Cursor CLI son interfaces distintas',
      content: [
        { type: 'paragraph', text: 'Cursor IDE ofrece una interfaz de editor. Cursor Agent CLI lleva el agente de Cursor a un proceso de terminal. Pueden pertenecer a la misma cuenta y al mismo ecosistema de proyecto, pero instalar el editor no debe confundirse con ejecutar <code>cursor-agent</code>.' },
        { type: 'paragraph', text: 'CodeAgentSwarm integra la CLI mediante el comando ACP oficial <code>cursor-agent acp</code>. No automatiza el editor de Cursor. La <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de configuración ACP de Cursor Agent</a> cubre la integración exacta.' },
      ],
    },
    {
      id: 'cuentas-coste',
      title: 'Compara la cuenta y el uso que ya pagas',
      content: [
        { type: 'paragraph', text: 'Cursor CLI se autentica con <code>cursor-agent login</code> o <code>CURSOR_API_KEY</code> y consume tu suscripción o uso de Cursor. Claude Code puede usar una cuenta de Anthropic o una configuración compatible de API, nube o gateway; el uso sigue la vía que configure tu organización.' },
        { type: 'paragraph', text: 'Esa separación puede orientar la decisión más que una lista de funciones. Si tu organización ya gestiona un proveedor, añadir otro incorpora otra cuenta, política y bolsa de uso. Si utilizas ambos, las bolsas separadas también permiten repartir tareas según disponibilidad y preferencia.' },
        { type: 'paragraph', text: 'Para consultar los datos actuales de los planes de Cursor, lee <a href="/es/guias/precios-y-uso-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">precios y uso de Cursor CLI</a>. Los precios y el uso incluido pueden cambiar, así que verifica ambos proveedores antes de comprar.' },
      ],
    },
    {
      id: 'flujo-configuracion',
      title: 'Elige el flujo de proyecto que exige menos traducción',
      content: [
        { type: 'paragraph', text: 'Cursor Agent usa la configuración de Cursor del proyecto y del usuario. En CodeAgentSwarm, los servidores MCP de <code>.cursor/mcp.json</code> se pasan mediante ACP. Las sesiones de Cursor pueden exponer los modos Agent, Plan y Ask, selección de modelos y compatibilidad con imágenes.' },
        { type: 'paragraph', text: 'Claude Code tiene sus propias convenciones y herramientas de proyecto. Un equipo con instrucciones maduras para un agente puede obtener mejores resultados conservando esa configuración en vez de traducir todas las reglas inmediatamente.' },
        { type: 'callout', variant: 'tip', content: 'Prueba ambos agentes con una tarea representativa de tu repositorio. Compara el esfuerzo de revisión, el flujo de permisos y el cambio final, no solo la primera respuesta.' },
      ],
    },
    {
      id: 'uso-paralelo',
      title: 'Usa Cursor CLI y Claude Code juntos',
      content: [
        { type: 'paragraph', text: 'No tienes que elegir una sola herramienta. CodeAgentSwarm permite seleccionar un agente por sesión, por lo que Cursor puede investigar una tarea mientras Claude Code resuelve otra.' },
        { type: 'paragraph', text: 'Mantén separadas las responsabilidades y revisa el trabajo antes de integrarlo. La <a href="/es/guias/enjambre-de-agentes-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de Cursor Agent</a> muestra cómo repartir tareas paralelas sin enviar agentes a las mismas líneas.' },
        { type: 'paragraph', text: 'La continuidad de las conversaciones también depende del proveedor y de la versión. Lee la <a href="/es/guias/historial-conversaciones-cursor-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Cursor CLI</a> antes de depender de la reanudación ACP en una instalación antigua de Cursor.' },
      ],
    },
    {
      id: 'decision',
      title: 'Una forma práctica de elegir',
      content: [
        { type: 'list', items: ['Elige Cursor CLI si quieres llevar la cuenta, configuración y modelos de Cursor a un flujo de terminal.', 'Elige Claude Code si tus proyectos, políticas y uso ya se centran en Anthropic.', 'Usa Cursor IDE cuando la propia interfaz del editor forme parte del requisito.', 'Utiliza ambos cuando distintas tareas se beneficien de proveedores diferentes y tu equipo pueda revisar el trabajo paralelo.'] },
        { type: 'paragraph', text: 'La mejor opción depende del repositorio, las reglas del equipo, la suscripción y el tipo de tarea. Una prueba breve con trabajo real ofrece más información que una comparativa genérica.' },
      ],
    },
  ],
  faq: [
    { question: '¿Cursor CLI es lo mismo que Cursor IDE?', answer: 'No. Cursor IDE es el editor, mientras que Cursor Agent CLI es el agente beta para línea de comandos que se ejecuta con cursor-agent. Comparten el ecosistema de Cursor, pero ofrecen interfaces distintas.' },
    { question: '¿Cursor CLI es mejor que Claude Code?', answer: 'No hay un ganador universal. Cursor CLI encaja con las cuentas y la configuración de proyectos de Cursor, mientras Claude Code encaja con flujos de Anthropic. Prueba ambos con el trabajo real de tu equipo.' },
    { question: '¿Puedo ejecutar Cursor CLI y Claude Code al mismo tiempo?', answer: 'Sí. CodeAgentSwarm puede ejecutar sesiones separadas de Cursor Agent y Claude Code en un mismo espacio. Asigna tareas distintas y revisa los cambios antes de integrarlos.' },
    { question: '¿Cursor CLI usa mi suscripción de Cursor?', answer: 'Sí. Cursor Agent se autentica con tu inicio de sesión de Cursor o CURSOR_API_KEY y consume la suscripción o el uso de Cursor.' },
    { question: '¿Cursor CLI usa .cursor/mcp.json?', answer: 'Sí. CodeAgentSwarm respeta la configuración MCP del usuario y del proyecto en .cursor/mcp.json cuando inicia Cursor mediante ACP.' },
  ],
}

export default guide
