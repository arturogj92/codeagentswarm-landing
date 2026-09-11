import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "devin-cli-en-windows",
    "locale": "es",
    "title": "Devin CLI en Windows: instalación nativa y solución de errores",
    "metaTitle": "Devin CLI en Windows: instalar, login y corregir PATH",
    "metaDescription": "Configura Devin CLI nativo en Windows con PowerShell. Comprueba PATH, inicia sesión y localiza sus archivos con capturas de la beta de CodeAgentSwarm.",
    "intro": "Una instalación nativa permite a Devin usar las rutas y la cuenta de tu entorno Windows. Empieza en PowerShell, comprueba el ejecutable e inicia sesión. WSL es otro entorno y debe tratarse como una instalación independiente.",
    "ctaText": "El soporte nativo de Devin en Windows está en pruebas beta de CodeAgentSwarm. Descarga la app pública actual y consulta sus notas antes de esperar esta integración.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-11",
    "alternateSlug": "devin-cli-on-windows",
    "socialImage": "/images/guides/devin-cli-og-es.png"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Instala desde PowerShell",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Abre PowerShell y ejecuta el instalador oficial. Después, vuelve a abrir el terminal. <a href=\"https://docs.devin.ai/cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Instrucciones de instalación de Cognition</a>."
        },
        {
          "type": "code",
          "language": "powershell",
          "code": "irm https://static.devin.ai/cli/setup.ps1 | iex\ndevin --version"
        }
      ]
    },
    {
      "id": "native-preview",
      "title": "Devin en la beta de Windows",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-windows-beta.webp",
          "alt": "Diálogo de instalación de Devin CLI en CodeAgentSwarm para Windows",
          "caption": "Captura real del diálogo de instalación en la beta de Windows. La app pública puede no incluir aún Devin.",
          "size": "full"
        }
      ]
    },
    {
      "id": "check-path",
      "title": "Si Windows no encuentra devin",
      "content": [
        {
          "type": "code",
          "language": "powershell",
          "code": "Get-Command devin -All\nwhere.exe devin"
        },
        {
          "type": "paragraph",
          "text": "Si no devuelven resultados, cierra y vuelve a abrir el terminal tras la instalación. Si el terminal encuentra Devin pero CodeAgentSwarm no, vuelve a abrir también CodeAgentSwarm. Un proceso abierto antes del instalador puede conservar el PATH anterior."
        },
        {
          "type": "paragraph",
          "text": "Si aparecen varios ejecutables, compara sus rutas y versiones. En nuestra verificación nativa de Windows comprobamos por separado la detección del instalador y la ejecución: encontrar un archivo solo sirve si ese ejecutable puede arrancar."
        }
      ]
    },
    {
      "id": "login-project",
      "title": "Conecta la cuenta y abre un proyecto de Windows",
      "content": [
        {
          "type": "code",
          "language": "powershell",
          "code": "devin auth login\ndevin auth status\nSet-Location C:\\Projects\\sample-app\ndevin"
        },
        {
          "type": "paragraph",
          "text": "Usa la ruta real de tu proyecto. En la beta de CodeAgentSwarm, selecciona ese mismo proyecto al crear una sesión de Devin. Si te autenticaste dentro de WSL, repite el login en la CLI nativa de Windows antes de esperar que lo use la app nativa."
        }
      ]
    },
    {
      "id": "windows-files",
      "title": "Localiza los archivos de configuración e historial",
      "content": [
        {
          "type": "table",
          "headers": [
            "Datos",
            "Ubicación nativa en Windows"
          ],
          "rows": [
            [
              "Configuración",
              "<code>%APPDATA%\\devin</code>"
            ],
            [
              "Historial",
              "<code>%APPDATA%\\devin\\cli\\sessions.db</code>"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Estas son las ubicaciones verificadas con nuestra instalación nativa de Windows. El ejecutable puede instalarse en Local mientras Devin guarda los datos de cuenta y sesiones en Roaming. La beta de CodeAgentSwarm resuelve estas ubicaciones por separado."
        },
        {
          "type": "paragraph",
          "text": "No muevas archivos de cuenta entre esas carpetas para corregir la detección. Comprueba primero la versión de la CLI y el entorno real. Para los archivos y ámbitos de MCP, consulta <a href=\"/es/guias/devin-cli-mcp-historial\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP e historial</a>."
        }
      ]
    },
    {
      "id": "verify",
      "title": "Comprueba el recorrido completo",
      "content": [
        {
          "type": "list",
          "items": [
            "Pide a Devin que lea un archivo conocido y comprueba la respuesta.",
            "Cierra la conversación y encuéntrala en el historial.",
            "Reanúdala y pregunta por el turno anterior.",
            "Comprueba el modelo seleccionado y la cuota de la cuenta antes de una tarea larga."
          ]
        },
        {
          "type": "paragraph",
          "text": "La <a href=\"/es/guias/como-usar-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de inicio</a> incluye una primera petición pequeña. La <a href=\"/es/guias/devin-cli-modelos-cuotas\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de cuotas</a> explica por qué una instalación válida puede encontrarse con un límite de cuenta."
        }
      ]
    },
    {
      "id": "codeagentswarm-beta",
      "title": "Devin en CodeAgentSwarm: estado de la beta",
      "content": [
        {
          "type": "paragraph",
          "text": "La integración está en pruebas para un próximo release de CodeAgentSwarm. Las capturas muestran esa beta y no anuncian que el instalador público actual ya incluya Devin. Inicia sesión con la CLI oficial de Devin en el ordenador donde se ejecuta el agente."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Devin CLI necesita WSL?",
      "answer": "La CLI oficial ofrece un instalador nativo de Windows. WSL es un entorno alternativo, no un requisito de la instalación nativa."
    },
    {
      "question": "¿Por qué Devin está instalado pero no se detecta?",
      "answer": "Comprueba Get-Command devin -All y vuelve a abrir el terminal y la app tras instalar. Pueden conservar el PATH anterior a la instalación."
    },
    {
      "question": "¿Dónde está el historial de Windows?",
      "answer": "Nuestra instalación nativa guardó las sesiones en %APPDATA%\\devin\\cli\\sessions.db, separadas de la configuración de %APPDATA%\\devin."
    }
  ]
}

export default guide
