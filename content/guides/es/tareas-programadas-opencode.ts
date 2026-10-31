import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-opencode",
    "locale": "es",
    "title": "Cómo programar opencode: cron con opencode run o CodeAgentSwarm",
    "metaTitle": "Programar opencode: cron con opencode run o CodeAgentSwarm",
    "metaDescription": "opencode no trae programador. Mete opencode run en cron, usa su GitHub Action con schedule o prográmalo en local con CodeAgentSwarm.",
    "intro": "opencode no incluye un programador en el CLI. Si buscas cómo poner opencode en cron, la respuesta es una de tres: una línea de crontab con <code>opencode run</code>, la GitHub Action oficial con un disparador <code>schedule</code> o las conversaciones programadas de CodeAgentSwarm en tu propio ordenador.",
    "ctaText": "Programa opencode en CodeAgentSwarm 2.5.0 con el proveedor que tengas conectado y lee cada ejecución en un Chat.",
    "ctaAgent": "opencode",
    "highlightedWords": [
      "opencode"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-opencode"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Cómo pongo opencode en cron?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/opencode-icon.svg",
          "alt": "opencode",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>En local, solo log:</strong> cron lanza <code>opencode run</code>.",
            "<strong>En los runners de GitHub:</strong> la GitHub Action oficial de opencode con <code>on: schedule</code>.",
            "<strong>En local, con conversación:</strong> CodeAgentSwarm ejecuta opencode a las horas que pongas y guarda cada ejecución en un Chat."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "Lo que trae opencode",
      "content": [
        {
          "type": "paragraph",
          "text": "La referencia del CLI no tiene comando de programación. La <a href=\"https://opencode.ai/docs/github/\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">integración oficial con GitHub</a> acepta un disparador cron <code>schedule</code>, que se ejecuta en las máquinas de GitHub sobre tu repositorio. Hay plugins de la comunidad que añaden programación, pero no forman parte de opencode."
        }
      ]
    },
    {
      "id": "cron",
      "title": "opencode en cron con opencode run",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: cada 6 horas\n0 */6 * * * cd ~/code/mi-app && opencode run \"Pasa los tests y explica los fallos nuevos. No edites archivos.\" >> ~/logs/opencode-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>opencode run</code> acepta <code>-m</code> para el modelo y <code>--format json</code> para una salida legible por máquina, y puede conectarse a un <code>opencode serve</code> en marcha. <a href=\"https://opencode.ai/docs/cli/\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación del CLI</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar opencode en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de opencode y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>opencode</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con opencode",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 08:00: traer lo último de main, pasar los tests y contar qué se rompió por la noche.",
            "Cada 12 horas: revisar el log de errores del proyecto y agrupar los nuevos por causa.",
            "Los sábados a las 10:00: buscar archivos y exports sin usar y listarlos, sin borrar nada."
          ]
        },
        {
          "type": "paragraph",
          "text": "opencode funciona con muchos proveedores. Fija el modelo en la tarea si un trabajo tiene que usar siempre el mismo; déjalo en Default para seguir tu configuración de opencode."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de opencode que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/ejecutar-multiples-sesiones-opencode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Varias sesiones de opencode a la vez</a>",
            "<a href=\"/es/guias/modo-yolo-opencode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Permisos y modo YOLO de opencode</a>",
            "<a href=\"/es/guias/historial-conversaciones-opencode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Historial de conversaciones de opencode</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿opencode tiene programador propio?",
      "answer": "No. El CLI no tiene comando de programación. Puedes usar cron con opencode run, la GitHub Action con schedule o CodeAgentSwarm."
    },
    {
      "question": "¿Puedo programar opencode con un proveedor distinto en cada tarea?",
      "answer": "Sí. En CodeAgentSwarm cada tarea puede fijar su modelo; en cron, pasa -m a opencode run."
    },
    {
      "question": "¿La GitHub Action se ejecuta en mi ordenador?",
      "answer": "No. Se ejecuta en los runners de GitHub Actions sobre el repositorio. Para archivos locales y tu configuración local, usa cron o CodeAgentSwarm."
    }
  ]
}

export default guide
