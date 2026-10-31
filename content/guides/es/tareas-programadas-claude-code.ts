import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-claude-code",
    "locale": "es",
    "title": "Cómo programar Claude Code: /schedule, cron y tareas locales",
    "metaTitle": "Programar Claude Code: /schedule, cron y tareas locales",
    "metaDescription": "Cómo programar tareas de Claude Code: tareas en la nube con /schedule, tareas locales en Claude Desktop, /loop, cron con claude -p o CodeAgentSwarm.",
    "intro": "Claude Code tiene más formas de programarse que cualquier otro agente: tareas en la nube que creas con <code>/schedule</code>, tareas locales en Claude Desktop y <code>/loop</code> dentro de una sesión. También puedes meter <code>claude -p</code> en cron. Esta guía explica qué hace cada una, dónde se ejecuta y cuándo encajan mejor las conversaciones programadas de CodeAgentSwarm.",
    "ctaText": "Programa Claude Code junto a tus otros agentes en CodeAgentSwarm 2.5.0 y lee cada ejecución en un Chat que puedes continuar.",
    "ctaAgent": "claude-code",
    "highlightedWords": [
      "Claude Code"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-claude-code"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Cómo programo Claude Code?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/claude-icon.svg",
          "alt": "Claude Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Depende de dónde tenga que ejecutarse:"
        },
        {
          "type": "list",
          "items": [
            "<strong>El portátil puede estar apagado:</strong> una tarea en la nube (<code>/schedule</code>). Se ejecuta en la nube de Anthropic sobre un clon nuevo de tu repositorio de GitHub.",
            "<strong>Necesita tus archivos locales y solo usas Claude Code:</strong> una tarea local en Claude Desktop.",
            "<strong>Repetir algo mientras trabajas:</strong> <code>/loop</code> en la sesión abierta.",
            "<strong>También programas Codex, Cursor u otro agente, o quieres gestionarlo desde la app móvil de CodeAgentSwarm:</strong> las conversaciones programadas de CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "Lo que trae Claude Code de serie",
      "content": [
        {
          "type": "table",
          "headers": [
            "",
            "Tarea en la nube (<code>/schedule</code>)",
            "Tarea local de Desktop",
            "<code>/loop</code>"
          ],
          "rows": [
            [
              "Dónde se ejecuta",
              "Nube de Anthropic, clon nuevo",
              "Tu ordenador",
              "Tu ordenador, dentro de la sesión"
            ],
            [
              "Ordenador encendido",
              "No hace falta",
              "Sí, con la app abierta y sin reposo",
              "Sí, con la sesión abierta"
            ],
            [
              "Archivos locales",
              "No",
              "Sí",
              "Sí"
            ],
            [
              "Intervalo mínimo",
              "1 hora",
              "1 hora en el formulario, 1 minuto si lo pone Claude",
              "1 minuto"
            ],
            [
              "Ejecuciones perdidas",
              "No aplica",
              "Una de recuperación de los últimos 7 días",
              "Se pierden con la sesión"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Las tareas en la nube se llamaban routines hasta hace poco; <code>/routines</code> sigue funcionando. Están disponibles en los planes Pro, Max, Ultra, Team y Enterprise y necesitan acceso a GitHub para clonar tus repositorios. <a href=\"https://code.claude.com/docs/en/routines\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Tareas en la nube</a> · <a href=\"https://code.claude.com/docs/en/desktop-scheduled-tasks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Tareas de Desktop</a> · <a href=\"https://code.claude.com/docs/en/scheduled-tasks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">/loop</a>"
        },
        {
          "type": "paragraph",
          "text": "Las tareas locales de Desktop se parecen mucho a lo que CodeAgentSwarm hace con todos los agentes: se ejecutan en una carpeta local, pueden usar un worktree y recuperan una ejecución tras el reposo. Si solo usas Claude Code y ya trabajas en Claude Desktop, son buena opción."
        }
      ]
    },
    {
      "id": "cron",
      "title": "Claude Code en cron con claude -p",
      "content": [
        {
          "type": "paragraph",
          "text": "Sin ninguna app, cron puede lanzar Claude Code en modo print. Ejecuta un prompt y sale:"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 08:30\n30 8 * * 1-5 cd ~/code/mi-app && claude -p \"Resume los fallos de CI de ayer. No edites archivos.\" >> ~/logs/claude-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Es barato y local, pero lo que obtienes es texto en un log. Nadie responde a una petición de permiso, así que limita las herramientas permitidas, y si el Mac estaba en reposo a las 08:30, cron se la salta."
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Claude Code en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Claude Code y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Claude Code</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
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
      "title": "Prompts que merece la pena programar con Claude Code",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "De lunes a viernes a las 08:30\nLee los issues abiertos con la etiqueta \"bug\" y los fallos de CI de ayer.\nAgrúpalos por causa y dime cuál arreglar primero. No edites archivos."
        },
        {
          "type": "list",
          "items": [
            "Cada noche: pasar los tests y explicar cualquier fallo nuevo desde la última vez.",
            "Cada 4 horas entre semana: revisar la auditoría de dependencias y resumir lo nuevo.",
            "Los viernes a las 17:00: escribir el changelog de la semana a partir de los commits."
          ]
        },
        {
          "type": "paragraph",
          "text": "En las primeras ejecuciones deja los permisos en Default o en modo de preguntar antes. Cuando el resultado sea bueno, la tarea puede usar los permisos en los que confíes, y la opción <strong>Git Worktree</strong> mantiene sus cambios fuera de tu copia de trabajo."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Claude Code que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/modo-yolo-claude-code-explicado\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Modos de permisos y YOLO de Claude Code</a>",
            "<a href=\"/es/guias/guia-completa-historial-claude-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Encontrar y retomar conversaciones de Claude Code</a>",
            "<a href=\"/es/guias/limite-semanal-claude-code-presupuesto-diario\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Mantener las ejecuciones dentro de un presupuesto diario</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Qué hace /schedule en Claude Code?",
      "answer": "Crea una tarea programada en la nube (antes llamada routine). Se ejecuta en la nube de Anthropic sobre un clon nuevo de tu repositorio de GitHub, con al menos una hora entre ejecuciones, aunque el ordenador esté apagado."
    },
    {
      "question": "¿Puede Claude Code ejecutar tareas programadas en mi ordenador?",
      "answer": "Sí, con las tareas locales de Claude Desktop o con /loop en una sesión abierta. CodeAgentSwarm también programa Claude Code en local, junto al resto de agentes que soporta."
    },
    {
      "question": "¿Cómo pongo Claude Code en cron?",
      "answer": "Añade una línea al crontab que entre en la carpeta del proyecto y ejecute claude -p con tu prompt, guardando la salida en un log. Permite solo las herramientas que necesite."
    },
    {
      "question": "¿Para qué usar CodeAgentSwarm si Claude Desktop ya programa tareas?",
      "answer": "Cuando programas más de un agente, quieres cada ejecución en el mismo Chat que tus otras sesiones o quieres editar y lanzar las tareas desde la app móvil de CodeAgentSwarm."
    }
  ]
}

export default guide
