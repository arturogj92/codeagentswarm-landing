import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "devin-cli-mcp-historial",
    "locale": "es",
    "title": "MCP e historial de Devin CLI: conecta herramientas y retoma tareas",
    "metaTitle": "Devin CLI: MCP, historial y reanudar sesiones",
    "metaDescription": "Configura MCP en Devin CLI, revisa las herramientas y reanuda conversaciones guardadas. Incluye historial y MCP opcional en CodeAgentSwarm 2.4.0.",
    "intro": "MCP conecta herramientas al agente; el historial conserva la conversación que quieres continuar. Resuelven problemas distintos. Configura una herramienta de confianza, comprueba que Devin puede verla y verifica después que puedes reabrir la conversación.",
    "ctaText": "El historial de Devin, la reanudación y el MCP opcional de CodeAgentSwarm están disponibles desde CodeAgentSwarm 2.4.0.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-24",
    "alternateSlug": "devin-cli-mcp-history",
    "socialImage": "/images/guides/devin-cli-og-es.png"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Revisa herramientas y sesiones guardadas",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "devin mcp list\ndevin list\ndevin -c"
        },
        {
          "type": "paragraph",
          "text": "Usa <code>devin -c</code> para la última sesión del directorio actual, o <code>devin -r SESSION_ID</code> para una sesión concreta. <a href=\"https://docs.devin.ai/cli/reference/commands\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Referencia de comandos</a>."
        }
      ]
    },
    {
      "id": "history-preview",
      "title": "Encuentra la conversación antes de empezar de cero",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-history-beta.webp",
          "alt": "Conversaciones de Devin en el historial de la beta de CodeAgentSwarm",
          "caption": "Captura real del historial de la beta. Selecciona la conversación original para continuar la misma tarea.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "En CodeAgentSwarm, las conversaciones de Devin aparecen en el historial, la búsqueda y los marcadores. Un acceso directo guardado puede reabrir la conversación asociada. Comprueba el proyecto y los mensajes anteriores al reanudar para que la siguiente petición tenga el contexto correcto."
        }
      ]
    },
    {
      "id": "mcp-scopes",
      "title": "Elige dónde configurar el servidor MCP",
      "content": [
        {
          "type": "table",
          "headers": [
            "Ámbito",
            "Archivo de configuración"
          ],
          "rows": [
            [
              "Local",
              "<code>.devin/mcp_config.local.json</code>"
            ],
            [
              "Proyecto",
              "<code>.devin/mcp_config.json</code>"
            ],
            [
              "Usuario",
              "<code>~/.config/devin/mcp_config.json</code> / <code>%APPDATA%\\devin\\mcp_config.json</code>"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Usa el ámbito local para la configuración de tu directorio de trabajo y el de proyecto solo para ajustes que se puedan compartir. La CLI actual usa archivos específicos de MCP. <a href=\"https://docs.devin.ai/cli/extensibility/mcp/configuration\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Configuración oficial de MCP</a>."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "devin mcp add docs https://your-mcp-server.example/mcp\ndevin mcp list"
        },
        {
          "type": "paragraph",
          "text": "Sustituye la URL de ejemplo por la dirección de un servidor de confianza. Es un marcador de ejemplo, no un servicio disponible. Autentícate si el servidor lo requiere y comprueba sus herramientas antes de pedir a Devin que las use."
        }
      ]
    },
    {
      "id": "cas-mcp",
      "title": "El MCP de CodeAgentSwarm es opcional",
      "content": [
        {
          "type": "paragraph",
          "text": "CodeAgentSwarm puede conectar Devin a las herramientas de CodeAgentSwarm para las acciones compatibles de sesión y espacio de trabajo. El ajuste de la app controla esta integración. Si lo desactivas, los nuevos arranques de Devin deben respetarlo; no lo vuelvas a añadir manualmente solo para que funcione una petición de prueba."
        },
        {
          "type": "paragraph",
          "text": "Instalar un servidor y autorizar una de sus acciones son decisiones distintas. Lee la acción y su destino antes de permitir un cambio, especialmente si la herramienta puede modificar un servicio remoto."
        }
      ]
    },
    {
      "id": "resume-check",
      "title": "Comprueba la reanudación con una pregunta pequeña",
      "content": [
        {
          "type": "list",
          "items": [
            "Pide a Devin que identifique el comando de tests de tu proyecto de ejemplo.",
            "Cierra la conversación cuando haya terminado la respuesta.",
            "Ábrela desde el historial y pregunta qué comando encontró.",
            "Confirma que siguen coincidiendo los mensajes originales y el proyecto."
          ]
        },
        {
          "type": "paragraph",
          "text": "Si la sesión no aparece en Windows, comprueba la <a href=\"/es/guias/devin-cli-en-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">ubicación del historial nativo</a>. Si se abre pero no puede ejecutar otro turno, revisa <a href=\"/es/guias/devin-cli-modelos-cuotas\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">la cuenta y la cuota</a> por separado del historial guardado."
        }
      ]
    },
    {
      "id": "codeagentswarm-beta",
      "title": "Devin en CodeAgentSwarm: disponible en la 2.4.0",
      "content": [
        {
          "type": "paragraph",
          "text": "Devin está disponible en CodeAgentSwarm 2.4.0 para macOS y Windows. Las capturas se tomaron durante las pruebas beta. Inicia sesión con la CLI oficial de Devin en el ordenador donde se ejecuta el agente."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Reanudar crea otra conversación?",
      "answer": "La reanudación apunta a la sesión guardada. Comprueba el proyecto y los mensajes anteriores antes de continuar, especialmente si tienes varias tareas similares."
    },
    {
      "question": "¿Necesito el MCP de CodeAgentSwarm para usar Devin?",
      "answer": "No. La integración MCP de CodeAgentSwarm es opcional en CodeAgentSwarm. Devin también admite su propia configuración MCP."
    },
    {
      "question": "¿Debo guardar credenciales personales de MCP en Git?",
      "answer": "No. Mantén los secretos personales fuera de la configuración compartida y usa el mecanismo local o de autenticación de cuenta que corresponda."
    }
  ]
}

export default guide
