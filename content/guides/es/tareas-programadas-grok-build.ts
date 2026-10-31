import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-grok-build",
    "locale": "es",
    "title": "Cómo programar Grok Build: /loop, grok -p en cron y CodeAgentSwarm",
    "metaTitle": "Programar Grok Build: /loop, cron con grok -p o CodeAgentSwarm",
    "metaDescription": "El /loop de Grok Build solo repite dentro de una sesión. Ejecuta Grok Build a una hora con grok -p en cron o en local con CodeAgentSwarm.",
    "intro": "Grok Build tiene <code>/loop</code>, que repite un prompt mientras la sesión está abierta. No arranca Grok solo mañana a las 08:00. Para eso, usa cron con <code>grok -p</code> o las conversaciones programadas de CodeAgentSwarm.",
    "ctaText": "Programa Grok Build en CodeAgentSwarm 2.5.0 y recibe cada ejecución en un Chat al que puedes responder.",
    "ctaAgent": "grok-build",
    "highlightedWords": [
      "Grok Build"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-grok-build"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Grok Build se puede programar?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/grok-icon.svg",
          "alt": "Grok Build",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Con una sesión abierta:</strong> <code>/loop 30m &lt;prompt&gt;</code>.",
            "<strong>A horas fijas sin nada abierto:</strong> cron con <code>grok -p</code> o CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "El /loop de Grok Build",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>/loop [intervalo] &lt;prompt&gt;</code> se ejecuta en local dentro de la sesión. El intervalo acepta s, m, h o d con un mínimo de 60 segundos, los bucles caducan a los 7 días y caben 50 por sesión. xAI avisa de que <code>/loop</code> aparece cuando la función está disponible en tu cuenta. <a href=\"https://docs.x.ai/build/features/background-tasks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Tareas en segundo plano de Grok Build</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "Grok Build en cron con grok -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 09:00\n0 9 * * 1-5 cd ~/code/mi-app && grok -p \"Revisa los commits de ayer y señala los cambios con riesgo.\" --output-format plain >> ~/logs/grok-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "En scripts usa <code>XAI_API_KEY</code> para autenticarte y <code>--no-auto-update</code> para que el trabajo no se pare a actualizar. La <a href=\"/es/guias/grok-build-headless-ci\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de Grok Build sin interfaz</a> explica las opciones. <a href=\"https://docs.x.ai/build/cli/headless-scripting\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación de xAI</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Grok Build en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Grok Build y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Grok Build</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con Grok Build",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 09:00: revisar los commits de ayer y señalar lo que necesita otra mirada.",
            "Cada 4 horas: pasar los tests y explicar los fallos nuevos, sin editar archivos.",
            "Los domingos a las 11:00: actualizar las partes del README que ya no cuadran con el código y enseñar el diff."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Grok Build que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/grok-build-headless-ci\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Grok Build sin interfaz para scripts y CI</a>",
            "<a href=\"/es/guias/como-usar-grok-build\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cómo usar Grok Build</a>",
            "<a href=\"/es/guias/historial-conversaciones-grok-build\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Historial de conversaciones de Grok Build</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿El /loop de Grok Build es un cron?",
      "answer": "No. Repite un prompt dentro de una sesión abierta, con al menos 60 segundos entre ejecuciones, durante un máximo de 7 días. Si cierras la sesión, se para."
    },
    {
      "question": "¿Cómo ejecuto Grok Build desde cron?",
      "answer": "Añade una línea al crontab que entre en el proyecto y ejecute grok -p con tu prompt. Pon XAI_API_KEY y --no-auto-update para ejecuciones desatendidas."
    },
    {
      "question": "¿Puedo programar Grok Build en Windows?",
      "answer": "Sí. Las tareas de CodeAgentSwarm funcionan igual en macOS, Windows y Linux, sin pasar por el Programador de tareas."
    }
  ]
}

export default guide
