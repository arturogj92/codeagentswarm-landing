import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-pi-coding-agent",
    "locale": "es",
    "title": "Cómo programar Pi coding agent: cron con pi -p o CodeAgentSwarm",
    "metaTitle": "Programar Pi coding agent: cron con pi -p o CodeAgentSwarm",
    "metaDescription": "Pi no trae programador. Mete pi -p en cron para tener un log, o programa Pi en CodeAgentSwarm y lee cada ejecución en un Chat que puedes continuar.",
    "intro": "Pi es un arnés de programación pequeño y extensible, y no intenta ser un programador de tareas. Para ejecutar Pi cada mañana, lanza su modo print desde cron o deja que CodeAgentSwarm lo arranque a las horas que elijas y guarde cada ejecución como una conversación.",
    "ctaText": "Programa Pi en CodeAgentSwarm 2.5.0 con el proveedor que ya usas y lee cada ejecución en un Chat.",
    "ctaAgent": "pi",
    "highlightedWords": [
      "Pi"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-pi-coding-agent"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Cómo pongo Pi en cron?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/pi-icon.svg",
          "alt": "Pi",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Solo log:</strong> una línea de crontab con <code>pi -p</code>.",
            "<strong>Una conversación que puedes continuar:</strong> las conversaciones programadas de CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "Lo que trae Pi",
      "content": [
        {
          "type": "paragraph",
          "text": "El README y la documentación del CLI de Pi describen el modo print, el modo JSON y el modo RPC, pero ningún programador. Podrías escribir una extensión que programe prompts; hoy no hay nada oficial. <a href=\"https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación del CLI de Pi</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "Pi en cron con pi -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: todos los días a las 08:30\n30 8 * * * cd ~/code/mi-app && pi -p \"Lee TODO.md y propón los tres siguientes pasos.\" >> ~/logs/pi-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>-p</code> escribe la respuesta final en stdout y sale; <code>--mode json</code> escribe eventos JSONL, por si un script va a leer la salida. <a href=\"https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación del CLI de Pi</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Pi en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Pi y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Pi</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con Pi",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 08:30: leer el archivo TODO del proyecto y proponer los tres siguientes pasos.",
            "Cada 12 horas: pasar los tests y explicar cualquier fallo nuevo.",
            "Los domingos a las 09:00: buscar dependencias desactualizadas y listarlas con el enlace a su changelog."
          ]
        },
        {
          "type": "paragraph",
          "text": "Pi usa el proveedor con el que hayas iniciado sesión. Elige el modelo en la tarea si un trabajo no debe cambiar cuando cambies el modelo por defecto de Pi."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Pi que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/como-usar-pi-coding-agent\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cómo usar Pi coding agent</a>",
            "<a href=\"/es/guias/pi-coding-agent-modelos-suscripciones\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Modelos y suscripciones de Pi</a>",
            "<a href=\"/es/guias/pi-vs-opencode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Pi vs opencode</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Pi coding agent tiene programador?",
      "answer": "No en su documentación. La documentación oficial del CLI describe los modos print, JSON y RPC, pero no la programación. Usa cron con pi -p o CodeAgentSwarm."
    },
    {
      "question": "¿Puedo programar Pi con un modelo concreto?",
      "answer": "Sí. En CodeAgentSwarm la tarea puede fijar el modelo; si no, Pi usa su proveedor y modelo por defecto."
    },
    {
      "question": "¿Tengo que volver a iniciar sesión para las ejecuciones programadas?",
      "answer": "No. Usan la sesión de Pi del ordenador que las ejecuta, como cualquier otra sesión de Pi."
    }
  ]
}

export default guide
