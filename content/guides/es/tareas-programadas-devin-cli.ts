import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-devin-cli",
    "locale": "es",
    "title": "Cómo programar Devin CLI: Automations en la nube o ejecuciones locales",
    "metaTitle": "Programar Devin CLI: Automations en la nube o cron en local",
    "metaDescription": "Las Automations de Devin programan sesiones en la nube; Devin CLI no tiene programador. Ejecútalo en local con devin -p en cron o con CodeAgentSwarm.",
    "intro": "Devin puede ejecutarse a una hora, pero desde su aplicación web: las Automations arrancan sesiones en la nube con un temporizador o con eventos. Devin CLI, que trabaja en tu proyecto local, no tiene comando de programación. Esta guía cubre las dos cosas y explica cómo programar el CLI en tu ordenador.",
    "ctaText": "Programa Devin CLI en CodeAgentSwarm 2.5.0 y mantén cada ejecución en tu ordenador, en un Chat que puedes continuar.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin CLI"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-devin-cli"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Devin CLI se puede programar?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Devin en la nube:</strong> sí, con Automations (disparadores de horario, Slack, GitHub, Linear o webhook).",
            "<strong>Devin CLI en tu ordenador:</strong> no por sí solo. Usa cron con <code>devin -p</code> o CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "Automations y sesiones programadas de Devin",
      "content": [
        {
          "type": "paragraph",
          "text": "Las Automations pueden repetirse cada N minutos, horas, días, semanas o meses, seguir una regla RRULE o ejecutarse una vez. El límite por defecto es de 50 ejecuciones por hora, y puedes poner un tope al cómputo (ACU) de cada sesión. Las antiguas Scheduled Sessions siguen funcionando, pero están marcadas como legacy. <a href=\"https://docs.devin.ai/product-guides/automations\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Automations de Devin</a>"
        },
        {
          "type": "paragraph",
          "text": "La <a href=\"https://docs.devin.ai/cli/reference/commands.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">referencia de comandos de Devin CLI</a> no incluye ningún comando de programación, así que las Automations son una función de Devin en la nube, aparte del CLI que ejecutas en una carpeta local."
        }
      ]
    },
    {
      "id": "cron",
      "title": "Devin CLI en cron con devin -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 08:00\n0 8 * * 1-5 cd ~/code/mi-app && devin -p \"Pasa los tests y explica los fallos. No edites archivos.\" >> ~/logs/devin-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "En una carpeta en la que Devin todavía no confía, una ejecución no interactiva necesita además <code>--respect-workspace-trust false</code>. Mantén el modo de permisos por defecto en trabajos desatendidos salvo que el proyecto sea desechable."
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Devin CLI en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Devin CLI y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Devin CLI</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con Devin CLI",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 08:00: pasar los tests en esta copia local y explicar lo que falle.",
            "Cada 8 horas: leer la carpeta de logs local y resumir los errores nuevos.",
            "Los viernes a las 17:00: listar los archivos cambiados esta semana que no tienen tests."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Devin CLI que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/como-usar-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cómo usar Devin CLI</a>",
            "<a href=\"/es/guias/devin-cli-modelos-cuotas\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Modelos y cuotas de Devin CLI</a>",
            "<a href=\"/es/guias/devin-cli-mcp-historial\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP e historial de Devin CLI</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Devin se puede programar?",
      "answer": "Devin en la nube sí, con Automations. Devin CLI no tiene comando de programación; ejecútalo desde cron o CodeAgentSwarm."
    },
    {
      "question": "¿Las Automations de Devin usan mis archivos locales?",
      "answer": "Arrancan sesiones de Devin, no tu CLI local. Para trabajar sobre tu copia local, programa Devin CLI en tu ordenador."
    },
    {
      "question": "¿Cómo ejecuto Devin CLI desde cron?",
      "answer": "Añade una línea al crontab que entre en el proyecto y ejecute devin -p con tu prompt, guardando la salida en un log."
    }
  ]
}

export default guide
