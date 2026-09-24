import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "como-usar-devin-cli",
    "locale": "es",
    "title": "Devin CLI: instalación, login y tu primera tarea de código",
    "metaTitle": "Devin CLI: instalación, login y primera tarea",
    "metaDescription": "Instala Devin CLI, inicia sesión y prueba una primera tarea verificable. Descubre modelos, cuotas e historial con capturas reales de la beta de CodeAgentSwarm.",
    "intro": "Devin CLI lleva un agente de programación a tu proyecto local. Empieza con una tarea pequeña, comprueba que puede leer los archivos correctos y conserva la conversación para el siguiente paso. Esta guía cubre la CLI independiente y la integración en CodeAgentSwarm 2.4.0.",
    "ctaText": "El Chat de Devin, su instalación y el historial están disponibles en CodeAgentSwarm 2.4.0 para macOS y Windows.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-24",
    "alternateSlug": "how-to-use-devin-cli",
    "socialImage": "/images/guides/devin-cli-og-es.png"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "¿Qué necesitas para empezar?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Instala la CLI oficial, autentícate con Devin y abre la carpeta de un proyecto. Devin CLI trabaja con archivos locales; Devin Cloud se ejecuta en un entorno separado. <a href=\"https://docs.devin.ai/cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Guía oficial de inicio</a>."
        }
      ]
    },
    {
      "id": "chat-preview",
      "title": "Una tarea real en la beta de CodeAgentSwarm",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-chat-beta.webp",
          "alt": "Devin explicando un proyecto de ejemplo en el Chat de CodeAgentSwarm",
          "caption": "Captura real de la beta en macOS con un proyecto de ejemplo. Devin está disponible desde CodeAgentSwarm 2.4.0.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "El Chat reúne la petición, la respuesta y los controles del modelo. Usa una condición de aceptación concreta: el agente debe identificar el comando de tests real del repositorio, en lugar de adivinar uno que parezca razonable."
        }
      ]
    },
    {
      "id": "install",
      "title": "Instalación en macOS o Linux",
      "content": [
        {
          "type": "paragraph",
          "text": "Ejecuta el instalador publicado por Cognition desde un terminal del sistema. Después, vuelve a abrir el terminal y comprueba que el comando está disponible. En Windows, sigue la <a href=\"/es/guias/devin-cli-en-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de instalación nativa</a>."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "curl -fsSL https://cli.devin.ai/install.sh | bash\ndevin --version"
        },
        {
          "type": "paragraph",
          "text": "CodeAgentSwarm también ofrece controles para instalar y actualizar Devin. Si no lo detecta después de una instalación correcta en el sistema, vuelve a abrir la app para que reciba el entorno actualizado."
        }
      ]
    },
    {
      "id": "login",
      "title": "Inicia sesión antes de abrir el Chat",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "devin auth login\ndevin auth status\ncd /path/to/project\ndevin"
        },
        {
          "type": "paragraph",
          "text": "Completa el login del navegador con la cuenta que quieras usar. En CodeAgentSwarm, haz este paso en la vista CLI de Devin y abre después un nuevo Chat de Devin. La autenticación pertenece a Devin en ese equipo. <a href=\"https://docs.devin.ai/cli/enterprise/devin-auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Autenticación de Devin</a>."
        }
      ]
    },
    {
      "id": "first-task",
      "title": "Prueba una tarea con un resultado comprobable",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Lee README.md y package.json. Explica qué hace este proyecto\ny dame el comando exacto de tests. No cambies ningún archivo."
        },
        {
          "type": "list",
          "items": [
            "Comprueba la ruta del proyecto antes de enviar la petición.",
            "Compara la respuesta con los scripts de package.json.",
            "Para la siguiente petición, pide un cambio y revisa su diff y el resultado del test."
          ]
        },
        {
          "type": "paragraph",
          "text": "Esta primera petición de lectura permite distinguir un problema de cuenta o de carpeta de un problema al editar. Si falla, resuelve ese requisito antes de pedir cambios de código."
        }
      ]
    },
    {
      "id": "next-steps",
      "title": "Elige modelo y conserva la conversación",
      "content": [
        {
          "type": "paragraph",
          "text": "Consulta la <a href=\"/es/guias/devin-cli-modelos-cuotas\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de modelos y cuotas</a> para entender el selector y los límites de la cuenta. Cuando vuelvas a una tarea, utiliza el <a href=\"/es/guias/devin-cli-mcp-historial\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">historial y la reanudación</a> para continuar la conversación original."
        },
        {
          "type": "paragraph",
          "text": "Si dos agentes van a editar archivos que se solapan, asígnales worktrees de Git separados. Tener chats distintos no aísla el directorio de trabajo."
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
        },
        {
          "type": "paragraph",
          "text": "Antes de elegir modelo, consulta <a href=\"/es/guias/swe-2-benchmarks-comparativa\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">los benchmarks y la prueba práctica de SWE-2</a>."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Devin CLI es lo mismo que Devin Cloud?",
      "answer": "No. Devin CLI trabaja en tu entorno local; Devin Cloud usa un entorno separado en la nube. Esta guía trata sobre la CLI local."
    },
    {
      "question": "¿Inicio sesión desde CodeAgentSwarm?",
      "answer": "En CodeAgentSwarm, ejecuta el login oficial de Devin desde su vista CLI. Después, abre un nuevo Chat de Devin en el mismo equipo."
    },
    {
      "question": "¿La app pública actual incluye Devin?",
      "answer": "Sí. Devin está incluido en CodeAgentSwarm 2.4.0 para macOS y Windows."
    }
  ]
}

export default guide
