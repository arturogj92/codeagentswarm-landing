import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-muse-code",
    "locale": "es",
    "title": "Cómo programar Muse Code: /loop, muse exec en cron y CodeAgentSwarm",
    "metaTitle": "Programar Muse Code: /loop, cron con muse exec o CodeAgentSwarm",
    "metaDescription": "El /loop de Muse Code solo repite dentro de una sesión. Ejecuta Muse Code de Meta a una hora con muse exec en cron o con CodeAgentSwarm.",
    "intro": "Muse Code, el agente de terminal de Meta, tiene <code>/loop</code> para repetir un prompt dentro de una sesión interactiva. Nada en su documentación arranca Muse solo a una hora fija sin una sesión abierta. Para eso, usa cron con <code>muse exec</code> o las conversaciones programadas de CodeAgentSwarm.",
    "ctaText": "Programa Muse Code en CodeAgentSwarm 2.5.0 y lee cada ejecución en un Chat que puedes continuar.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse Code"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-muse-code"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Muse Code se puede programar?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Dentro de una sesión:</strong> <code>/loop</code>, con atajos como 1h o una expresión cron.",
            "<strong>A horas fijas sin nada abierto:</strong> cron con <code>muse exec</code> o CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "El /loop de Muse Code",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>/loop</code> acepta atajos (5m, 1h, 2d) o una expresión cron de cinco campos, y por defecto se repite cada 10 minutos. Vive en la sesión interactiva y los trabajos periódicos caducan a los 7 días. <a href=\"https://dev.meta.ai/docs/muse-code/interactive\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación interactiva de Muse Code</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "Muse Code en cron con muse exec",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 09:00\n0 9 * * 1-5 cd ~/code/mi-app && muse exec \"Lee los issues nuevos y propón arreglos rápidos. No edites archivos.\" >> ~/logs/muse-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>--json</code> da salida legible por máquina y <code>--prompt-file</code> lee un prompt largo desde un archivo. <code>--disable-approval</code> mantiene el sandbox; <code>--yolo</code> quita aprobaciones y sandbox, así que no lo uses en trabajos desatendidos. <a href=\"https://dev.meta.ai/docs/muse-code/extending\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Automatización de Muse Code</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Muse Code en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Muse Code y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Muse Code</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
            "Escribe el prompt que el agente ejecutará cada vez.",
            "En <strong>When</strong>, elige <em>At set times</em> (hasta 24 al día), <em>Every few hours</em> (1, 2, 3, 4, 6, 8 o 12) o <em>When I run it</em>, y los días.",
            "Elige <strong>Visible</strong> (abre un Chat) o <strong>Headless</strong> (sin pestaña, el resultado queda en Scheduled), y si cada ejecución sigue la misma conversación o empieza una nueva. Pulsa <strong>Create schedule</strong>."
          ]
        },
        {
          "type": "image",
          "src": "/images/guides/schedule-editor-times.webp",
          "alt": "Editor de tareas programadas de CodeAgentSwarm en At set times, todos los días a las 21:00, con las tres próximas ejecuciones y la opción Visible",
          "caption": "El editor enseña las próximas ejecuciones antes de guardar. Captura real de CodeAgentSwarm 2.5.0.",
          "size": "full"
        }
      ]
    },
    {
      "id": "ejemplos",
      "title": "Prompts que merece la pena programar con Muse Code",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 09:00: leer los issues nuevos y proponer cuáles se arreglan rápido.",
            "Cada 6 horas: pasar los tests y explicar cualquier fallo.",
            "Los sábados a las 10:00: revisar la carpeta de documentación y listar las páginas que citan funciones eliminadas."
          ]
        }
      ]
    },
    {
      "id": "que-pasa",
      "title": "Qué pasa en cada ejecución",
      "content": [
        {
          "type": "list",
          "items": [
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Muse Code que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
            "El Chat marca cada ejecución programada, así distingues tus mensajes de los programados y puedes responder a una ejecución como a cualquier mensaje.",
            "Si CodeAgentSwarm estaba cerrado o el ordenador en reposo a esa hora, <strong>If missed, run when the app opens</strong> la ejecuta una vez, con retraso. Una semana fuera da una ejecución, no siete.",
            "Las tareas se ejecutan en tu ordenador, así que CodeAgentSwarm tiene que estar abierto. Desde el móvil puedes verlas, editarlas y lanzarlas en la pestaña <strong>Scheduled</strong>."
          ]
        }
      ]
    },
    {
      "id": "relacionado",
      "title": "Para seguir",
      "content": [
        {
          "type": "paragraph",
          "text": "Para ver todos los agentes juntos, las reglas de repetición y el móvil, lee la <a href=\"/es/guias/tareas-programadas-agentes-ia\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de tareas programadas para agentes de IA</a>."
        },
        {
          "type": "list",
          "items": [
            "<a href=\"/es/guias/como-usar-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cómo usar Muse Code</a>",
            "<a href=\"/es/guias/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP, skills y flujos de Muse Code</a>",
            "<a href=\"/es/guias/muse-code-modelos-precios-privacidad\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Modelos, precios y privacidad de Muse Code</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿El /loop de Muse Code es un cron?",
      "answer": "No. Repite un prompt dentro de una sesión interactiva y los trabajos periódicos caducan a los 7 días. No arranca Muse si no hay sesión abierta."
    },
    {
      "question": "¿Cómo ejecuto Muse Code desde cron?",
      "answer": "Añade una línea al crontab que entre en el proyecto y ejecute muse exec con tu prompt, guardando la salida en un log."
    },
    {
      "question": "¿Puedo programar Muse Code en Windows?",
      "answer": "Sí. Las tareas de CodeAgentSwarm funcionan igual en macOS, Windows y Linux."
    }
  ]
}

export default guide
