import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-cursor-agent",
    "locale": "es",
    "title": "Cómo programar Cursor Agent: Automations o una tarea local",
    "metaTitle": "Programar Cursor Agent: Automations, cron y tareas locales",
    "metaDescription": "Las Automations de Cursor se ejecutan como agentes en la nube. Para programar Cursor Agent CLI en tu ordenador, usa cron con agent -p o CodeAgentSwarm.",
    "intro": "Cursor tiene Automations: disparadores, entre ellos una programación horaria, que arrancan un Cloud Agent de Cursor. Se ejecutan en la nube de Cursor y se cobran como uso de agentes en la nube. El CLI de Cursor Agent en tu ordenador no tiene programador. Esta guía compara las dos cosas y explica cómo programar el CLI en local.",
    "ctaText": "Programa Cursor Agent en CodeAgentSwarm 2.5.0 y mantén cada ejecución en tu ordenador, en un Chat que puedes continuar.",
    "ctaAgent": "cursor-agent",
    "highlightedWords": [
      "Cursor Agent"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-cursor-agent"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Cómo programo Cursor Agent?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/cursor-icon.svg",
          "alt": "Cursor Agent",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>En la nube de Cursor:</strong> una Automation con disparador de horario. El ordenador puede estar apagado.",
            "<strong>En tu ordenador, solo log:</strong> cron lanza el CLI en modo print.",
            "<strong>En tu ordenador, con conversación:</strong> CodeAgentSwarm ejecuta Cursor Agent CLI a las horas que pongas."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "Las Automations de Cursor",
      "content": [
        {
          "type": "paragraph",
          "text": "Las Automations se crean en la ventana de agentes, en cursor.com/automations o con <code>/automate</code> desde una sesión. El disparador de horario acepta atajos o una expresión cron; una ejecución puede empezar tarde, nunca antes. Cada ejecución es un Cloud Agent, cobrado por uso a precio de API, y los disparadores cron empiezan sin repositorio, así que tienes que elegir uno si la ejecución va a cambiar código. <a href=\"https://cursor.com/docs/cloud-agent/automations\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación de Automations</a>"
        },
        {
          "type": "paragraph",
          "text": "Es la herramienta adecuada para trabajo sobre un repositorio de GitHub que tiene que pasar con el portátil cerrado. Para trabajos que necesitan tu copia local o servicios que corren en tu ordenador, programa el propio CLI."
        }
      ]
    },
    {
      "id": "cron",
      "title": "Cursor Agent en cron en modo print",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 08:00\n0 8 * * 1-5 cd ~/code/mi-app && agent -p \"Pasa los tests y explica los fallos. No edites archivos.\" --output-format text >> ~/logs/cursor-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "El modo print solo propone cambios salvo que pases <code>--force</code>; usa <code>CURSOR_API_KEY</code> para autenticarte sin interacción. La documentación actual de Cursor llama al comando <code>agent</code>; las instalaciones anteriores usaban <code>cursor-agent</code>. <a href=\"https://cursor.com/docs/cli/headless\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación headless del CLI</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Cursor Agent en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Cursor Agent y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Cursor Agent</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con Cursor Agent",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 08:00: pasar los tests de la rama local y explicar los fallos.",
            "Cada 6 horas: revisar el log del servidor de desarrollo y resumir los errores nuevos.",
            "Los viernes a las 16:00: buscar componentes sin tests y listarlos por tamaño."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Cursor Agent que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/cursor-agent-cli-acp-codeagentswarm\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cursor Agent CLI: instalación y ACP</a>",
            "<a href=\"/es/guias/precios-y-uso-cursor-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Precios y uso de Cursor CLI</a>",
            "<a href=\"/es/guias/historial-conversaciones-cursor-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Historial de conversaciones de Cursor CLI</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Las Automations de Cursor se ejecutan en mi ordenador?",
      "answer": "No. Cada ejecución es un Cloud Agent en la nube de Cursor, cobrado como uso de agentes en la nube."
    },
    {
      "question": "¿Cursor Agent CLI se puede programar?",
      "answer": "No por sí solo. Lánzalo desde cron en modo print o prográmalo en CodeAgentSwarm."
    },
    {
      "question": "¿Cuál elijo?",
      "answer": "Automations para trabajo sobre el repositorio que tiene que ejecutarse con el portátil apagado. Una tarea local para trabajo que necesita tus archivos, herramientas y servicios en marcha."
    }
  ]
}

export default guide
