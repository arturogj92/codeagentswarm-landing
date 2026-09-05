import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'pi-coding-agent-modelos-suscripciones',
    locale: 'es',
    title: 'Modelos y suscripciones de Pi: ChatGPT, Claude y proveedores locales',
    metaTitle: 'Modelos de Pi: ChatGPT, Claude y suscripciones',
    metaDescription: 'Conecta Pi con ChatGPT, Claude, APIs o modelos locales. Entiende la facturación, inicia sesión con /login y resuelve proveedores ausentes en el selector.',
    intro: 'Pi puede usar varios proveedores de modelos, pero la cuenta que conectas determina los modelos disponibles y cómo se factura el consumo. Primero elige el proveedor y después el modelo. Ver el nombre de un modelo Claude no basta para saber qué servicio atiende la petición.',
    ctaText: 'El soporte de Pi en CodeAgentSwarm está en pruebas beta. La descarga corresponde a la app pública actual; consulta sus notas de versión para comprobar la disponibilidad de Pi.',
    ctaAgent: 'pi',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-06',
    alternateSlug: 'pi-coding-agent-models-subscriptions',
  },
  sections: [
    {
      id: 'subscription',
      title: '¿Pi puede usar una suscripción que ya tengo?',
      content: [
        {
          type: 'table',
          headers: [
            'Conexión',
            'Qué esperar',
          ],
          rows: [
            [
              'ChatGPT Plus o Pro',
              'Pi admite login con suscripción mediante su proveedor OpenAI Codex.',
            ],
            [
              'Claude Pro o Max',
              'Pi documenta el uso desde harnesses externos como consumo adicional por tokens, fuera de los límites incluidos.',
            ],
            [
              'GitHub Copilot',
              'Inicia sesión con GitHub; los modelos dependen de la cuenta y del acceso habilitado.',
            ],
            [
              'Clave API del proveedor',
              'El consumo sigue la facturación de esa cuenta API.',
            ],
            [
              'Servidor de modelos local',
              'Conecta tu propio servidor de inferencia y un modelo que pueda servir.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Son conexiones con proveedores, no una suscripción que venda Pi. Revisa <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">la documentación de proveedores de Pi</a> y <a href="https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">las reglas de Anthropic para acceso desde terceros</a> antes de usar una cuenta de pago. Poder iniciar sesión no garantiza que el consumo esté incluido.',
        },
      ],
    },
    {
      id: 'login',
      title: 'Conectar ChatGPT u otro proveedor',
      content: [
        {
          type: 'list',
          items: [
            'Arranca <code>pi</code> en tu proyecto. Si falta la instalación, sigue la <a href="/es/guias/como-usar-pi-coding-agent" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de primeros pasos</a>.',
            'Escribe <code>/login</code> dentro de Pi y elige proveedor y método de autenticación.',
            'Completa el flujo de navegador o código que muestre Pi.',
            'Abre <code>/model</code> y elige entre los modelos disponibles para esa conexión.',
          ],
        },
        {
          type: 'paragraph',
          text: 'En la beta de Pi de CodeAgentSwarm, hazlo desde la vista CLI y abre después un Chat nuevo de Pi. Chat muestra el modelo junto a su proveedor. Autenticar Codex en otra parte de CAS no autentica Pi: cada agente conserva sus propias credenciales.',
        },
      ],
    },
    {
      id: 'models',
      title: '¿Qué modelos puede usar Pi?',
      content: [
        {
          type: 'paragraph',
          text: 'Los proveedores compatibles incluyen OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Kimi y pasarelas como OpenRouter. Los identificadores cambian y el catálogo de un proveedor no garantiza que tu cuenta pueda usar cada entrada. Elige desde el catálogo de tu instalación de Pi en lugar de copiar un nombre desactualizado.',
        },
        {
          type: 'paragraph',
          text: 'Un modelo puede aparecer a través de distintos proveedores. Compara también el proveedor cuando quieras que pague una suscripción o cuenta API concreta. El razonamiento y la entrada de imágenes dependen asimismo del modelo seleccionado.',
        },
      ],
    },
    {
      id: 'missing-provider',
      title: '¿Por qué solo aparece un proveedor?',
      content: [
        {
          type: 'paragraph',
          text: 'Comprueba la configuración del equipo que ejecuta Pi. Una entrada en <code>~/.pi/agent/models.json</code> puede añadir una pasarela junto a los proveedores integrados. En CAS Chat, un sufijo como <code>· mi-pasarela</code> identifica ese proveedor; no es otro agente de programación.',
        },
        {
          type: 'list',
          items: [
            'Confirma que has iniciado sesión dentro de Pi y con el proveedor deseado.',
            'Comprueba qué equipo tiene el chat: el escritorio y CAS Cloud tienen configuración local independiente.',
            'Conserva los proveedores personalizados al añadir una conexión. No borres toda la configuración para cambiar de modelo.',
            'Después de iniciar sesión desde CLI, abre un Chat nuevo de Pi para que CAS reciba una lista actualizada.',
          ],
        },
        {
          type: 'paragraph',
          text: 'No publiques <code>auth.json</code> ni claves API en una consulta de soporte. El nombre del proveedor y el identificador del modelo bastan para empezar a investigar una opción ausente.',
        },
      ],
    },
    {
      id: 'local-models',
      title: 'Conectar un modelo local',
      content: [
        {
          type: 'paragraph',
          text: 'Pi puede conectarse a Ollama, LM Studio u otro endpoint compatible mediante <code>models.json</code>. Arranca primero el servidor y usa su endpoint e identificador de modelo reales. Un servidor local sin clave puede necesitar una credencial de relleno para que el modelo aparezca en Pi. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Configuración de modelos personalizados</a>.',
        },
        {
          type: 'paragraph',
          text: 'Prueba las llamadas a herramientas en un proyecto desechable antes de encargarle una tarea mayor. Que un servidor acepte mensajes no demuestra que ese modelo maneje correctamente herramientas de programación o imágenes. Para comparar el comportamiento de los agentes, consulta <a href="/es/guias/pi-vs-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi vs OpenCode</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Iniciar sesión en Codex dentro de CAS también conecta Pi?',
      answer: 'No. Pi tiene credenciales propias por proveedor. Inicia sesión desde su CLI con /login y abre después un Chat nuevo de Pi.',
    },
    {
      question: '¿Claude Max incluye todo el consumo de Pi?',
      answer: 'No lo des por hecho. Pi documenta el uso de Claude desde harnesses externos como consumo adicional por tokens, y Anthropic puede cobrar el acceso de terceros con créditos de uso.',
    },
    {
      question: '¿Por qué el mismo modelo tiene otro sufijo de proveedor?',
      answer: 'El sufijo identifica la conexión que sirve el modelo. Una pasarela personalizada y un proveedor directo pueden ofrecer modelos de nombre similar con cuentas y facturación distintas.',
    },
  ],
}

export default guide
