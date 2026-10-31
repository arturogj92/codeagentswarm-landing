import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-cline",
    "locale": "es",
    "title": "Cómo programar Cline: cline schedule o CodeAgentSwarm",
    "metaTitle": "Programar Cline: cline schedule, cron y CodeAgentSwarm",
    "metaDescription": "El CLI de Cline tiene su propio programador, cline schedule. Qué hace, en qué se diferencia de programar Cline en CodeAgentSwarm y cuándo usar cada uno.",
    "intro": "Cline es de los pocos agentes con un programador de verdad: <code>cline schedule</code>, en el CLI de Cline, ejecuta agentes con expresiones cron, mantiene las tareas tras reiniciar y no necesita una terminal abierta. Esta guía enseña el comando nativo y cuándo encajan mejor las conversaciones programadas de CodeAgentSwarm.",
    "ctaText": "Programa Cline junto a tus otros agentes en CodeAgentSwarm 2.5.0 y lee cada ejecución en un Chat.",
    "ctaAgent": "multi",
    "highlightedWords": [
      "Cline"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-cline"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Cómo programo Cline?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/cline-icon.svg",
          "alt": "Cline",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Solo Cline, desde la terminal:</strong> <code>cline schedule create</code>.",
            "<strong>Cline junto a otros agentes, con cada ejecución en un Chat al que puedes responder y control desde el móvil:</strong> CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "cline schedule",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "cline schedule create \"triaje entre semana\" \\\n  --cron \"0 9 * * MON-FRI\" \\\n  --prompt \"Ordena los issues nuevos por prioridad. No edites archivos.\" \\\n  --workspace ~/code/mi-app"
        },
        {
          "type": "paragraph",
          "text": "Las tareas se ejecutan a través del hub de Cline, que arranca solo, usan tu zona horaria local y sobreviven a los reinicios. Otros subcomandos: <code>list</code>, <code>trigger</code>, <code>pause</code>, <code>resume</code>, <code>delete</code> y <code>executions</code>. Las ejecuciones programadas aprueban solas sus herramientas, así que escribe el prompt pensando en eso. Está en el CLI, el SDK y el Kanban de Cline, no en las extensiones de VS Code o JetBrains. <a href=\"https://docs.cline.bot/cli/scheduling\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación de programación de Cline</a>"
        },
        {
          "type": "paragraph",
          "text": "Si Cline es tu único agente y te gusta la terminal, <code>cline schedule</code> te basta. CodeAgentSwarm añade un mismo editor para todos tus agentes, ejecuciones visibles o en segundo plano, un Chat por ejecución que puedes continuar y una pestaña Scheduled en el móvil."
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Cline en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Cline y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Cline</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con Cline",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 08:30: pasar los tests y explicar los fallos nuevos, sin editar archivos.",
            "Cada 6 horas: revisar los pull requests abiertos y resumir los comentarios de revisión.",
            "Los domingos a las 10:00: listar las dependencias con una versión mayor nueva y qué se rompería."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Cline que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
      "question": "¿Cline tiene programador?",
      "answer": "Sí. El CLI de Cline tiene cline schedule, que ejecuta agentes con expresiones cron a través del hub de Cline y mantiene las tareas tras reiniciar."
    },
    {
      "question": "¿cline schedule funciona en la extensión de VS Code?",
      "answer": "No. Cline lo documenta para el CLI, el SDK y el Kanban, no para las extensiones de VS Code o JetBrains."
    },
    {
      "question": "¿Por qué programar Cline en CodeAgentSwarm?",
      "answer": "Cuando programas varios agentes en un mismo sitio, quieres cada ejecución en un Chat al que responder o quieres gestionar las tareas desde el móvil."
    }
  ]
}

export default guide
