import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-kimi-code",
    "locale": "es",
    "title": "Cómo programar Kimi Code: cron en la sesión, kimi -p y CodeAgentSwarm",
    "metaTitle": "Programar Kimi Code: cron con kimi -p o CodeAgentSwarm",
    "metaDescription": "Kimi Code solo repite prompts dentro de una sesión abierta. Ejecútalo a una hora con kimi -p en cron o con CodeAgentSwarm en tu ordenador.",
    "intro": "Kimi Code puede repetir un prompt dentro de una sesión con sus herramientas cron, y esas herramientas están ligadas a la sesión. Para ejecutar Kimi Code cada mañana sin nada abierto, usa cron con <code>kimi -p</code> o las conversaciones programadas de CodeAgentSwarm.",
    "ctaText": "Programa Kimi Code en CodeAgentSwarm 2.5.0 y lee cada ejecución en un Chat que puedes continuar.",
    "ctaAgent": "kimi-code",
    "highlightedWords": [
      "Kimi Code"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-kimi-code"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Kimi Code se puede programar?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/kimi-icon.png",
          "alt": "Kimi Code",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Dentro de una sesión:</strong> sí, el agente puede poner prompts que se repiten mientras la sesión exista.",
            "<strong>Sin nada abierto:</strong> usa cron con <code>kimi -p</code> o CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "El cron de Kimi Code dentro de la sesión",
      "content": [
        {
          "type": "paragraph",
          "text": "Kimi Code tiene las herramientas CronCreate, CronList y CronDelete, que vuelven a enviar un prompt a la misma sesión. Esas tareas están ligadas a la sesión y siguen activas cuando la retomas con <code>kimi --session</code>. Caben 50 por sesión, las periódicas caducan a los 7 días y <code>KIMI_DISABLE_CRON=1</code> las desactiva. <a href=\"https://www.kimi.com/code/docs/en/kimi-code-cli/reference/tools.html\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Referencia de herramientas de Kimi Code</a>"
        },
        {
          "type": "paragraph",
          "text": "Sirve para \"revisa la build cada 10 minutos mientras trabajo\". Para un trabajo que tiene que arrancar a las 07:30 cada día laborable, necesitas algo fuera de la sesión."
        }
      ]
    },
    {
      "id": "cron",
      "title": "Kimi Code en cron con kimi -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 07:30\n30 7 * * 1-5 cd ~/code/mi-app && kimi -p \"Clasifica los issues nuevos en bug, mejora y duda. No edites archivos.\" >> ~/logs/kimi-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>--output-format stream-json</code> da una salida legible por máquina. Kimi recomienda usar <code>--yolo</code> solo en espacios de trabajo de confianza y con control de versiones. <a href=\"https://www.kimi.com/resources/kimi-code-cheat-sheet\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Chuleta de Kimi Code</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Kimi Code en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Kimi Code y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Kimi Code</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con Kimi Code",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 07:30: leer los issues nuevos y clasificar cada uno como bug, mejora o duda en una lista corta.",
            "Cada 6 horas: pasar los tests y explicar cualquier fallo nuevo.",
            "Los viernes a las 18:00: resumir qué ha cambiado en el repositorio esta semana."
          ]
        },
        {
          "type": "paragraph",
          "text": "Cada ejecución programada usa tu plan de Kimi Code como cualquier otra sesión. Reparte los trabajos pesados a lo largo del día con <em>Every few hours</em> en vez de ponerlos todos a la misma hora."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Kimi Code que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/como-usar-kimi-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cómo usar Kimi Code CLI</a>",
            "<a href=\"/es/guias/planes-y-precios-de-kimi-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Planes y límites de Kimi Code</a>",
            "<a href=\"/es/guias/historial-conversaciones-kimi-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Historial de conversaciones de Kimi Code</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Kimi Code tiene cron?",
      "answer": "Dentro de una sesión: el agente puede programar prompts que se repiten en esa sesión, y los periódicos caducan a los 7 días. Para programar sin nada abierto, usa cron o CodeAgentSwarm."
    },
    {
      "question": "¿Cómo ejecuto Kimi Code desde cron?",
      "answer": "Añade una línea al crontab que entre en el proyecto y ejecute kimi -p con tu prompt, guardando la salida en un log."
    },
    {
      "question": "¿Las ejecuciones programadas gastan cuota de Kimi Code?",
      "answer": "Sí. Cada ejecución usa tu plan de Kimi Code como una sesión normal, así que reparte los trabajos pesados a lo largo del día."
    }
  ]
}

export default guide
