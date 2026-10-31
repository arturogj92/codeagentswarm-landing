import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-github-copilot-cli",
    "locale": "es",
    "title": "Cómo programar GitHub Copilot CLI: /every, cron y GitHub Actions",
    "metaTitle": "Programar GitHub Copilot CLI: /every, cron y GitHub Actions",
    "metaDescription": "El /every de Copilot CLI es experimental y vive en una sesión. Programa Copilot CLI con copilot -p en cron, GitHub Actions o CodeAgentSwarm.",
    "intro": "GitHub Copilot CLI tiene un comando experimental, <code>/every</code>, que repite un prompt dentro de una sesión. Para ejecuciones desatendidas, la propia documentación de GitHub te manda a <code>copilot -p</code> con cron, el Programador de tareas o GitHub Actions. Esta guía cubre esas opciones y cómo programar Copilot CLI en CodeAgentSwarm.",
    "ctaText": "Programa GitHub Copilot CLI en CodeAgentSwarm 2.5.0 y lee cada ejecución en un Chat que puedes continuar.",
    "ctaAgent": "multi",
    "highlightedWords": [
      "GitHub Copilot CLI",
      "Copilot"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-github-copilot-cli"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿GitHub Copilot CLI se puede programar?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/copilot-icon.svg",
          "alt": "GitHub Copilot CLI",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Dentro de una sesión (experimental):</strong> <code>/every</code> y <code>/after</code>.",
            "<strong>Desatendido en tu ordenador:</strong> cron o el Programador de tareas con <code>copilot -p</code>, o CodeAgentSwarm.",
            "<strong>En los runners de GitHub:</strong> un workflow con disparador <code>on: schedule</code>."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "/every y /after en Copilot CLI",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>/every</code> (alias <code>/loop</code>) repite un prompt con un intervalo de entre 10 segundos y 1 día; <code>/after</code> lo ejecuta una vez más tarde. Los dos pertenecen a la sesión y vuelven con <code>--continue</code> o <code>--resume</code>. Necesitan el modo experimental (<code>/experimental on</code>). <a href=\"https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">GitHub: programar prompts</a>"
        },
        {
          "type": "paragraph",
          "text": "GitHub también documenta cómo ejecutar Copilot CLI desde un workflow programado de Actions con un token de permisos limitados. <a href=\"https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Automatizar con GitHub Actions</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "Copilot CLI en cron con copilot -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 09:00\n0 9 * * 1-5 cd ~/code/mi-app && copilot -p \"Resume los issues que tengo asignados en este repositorio.\" -s --no-ask-user >> ~/logs/copilot-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Permite solo las herramientas que necesite el trabajo con <code>--allow-tool</code>; GitHub desaconseja <code>--allow-all</code> fuera de un sandbox. <a href=\"https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Ejecutar Copilot CLI desde scripts</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar GitHub Copilot CLI en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de GitHub Copilot CLI y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>GitHub Copilot CLI</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con GitHub Copilot CLI",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 09:00: resumir los issues que tengo asignados en este repositorio y proponer un orden.",
            "Cada 4 horas: pasar los tests en local y explicar los fallos nuevos.",
            "Los viernes a las 17:00: preparar las notas de versión con los commits de la semana."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de GitHub Copilot CLI que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/enjambre-de-agentes-cli-ia\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Varios CLI de IA a la vez</a>",
            "<a href=\"/es/guias/git-worktrees-para-agentes-de-ia\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Git worktrees para agentes de IA</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Qué es /every en GitHub Copilot CLI?",
      "answer": "Un comando experimental que repite un prompt dentro de la sesión actual, desde cada 10 segundos hasta una vez al día. Necesita el modo experimental."
    },
    {
      "question": "¿Cómo pongo Copilot CLI en cron?",
      "answer": "Lanza copilot -p desde una línea del crontab o el Programador de tareas, permitiendo solo las herramientas necesarias. GitHub documenta este uso."
    },
    {
      "question": "¿CodeAgentSwarm puede programar Copilot CLI con mi cuenta de GitHub?",
      "answer": "Sí. Las ejecuciones programadas usan la sesión de Copilot CLI del ordenador que las ejecuta."
    }
  ]
}

export default guide
