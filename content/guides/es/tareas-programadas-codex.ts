import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-codex",
    "locale": "es",
    "title": "Tareas programadas de Codex: qué hacen y cómo programar Codex CLI",
    "metaTitle": "Tareas programadas de Codex: programar Codex CLI con cron",
    "metaDescription": "Las tareas programadas de Codex están en la app de ChatGPT, no en el CLI. Cómo programar Codex CLI con codex exec en cron o con CodeAgentSwarm en local.",
    "intro": "Codex tiene tareas programadas (antes se llamaban automations), pero se crean en la app de escritorio de ChatGPT o en la web. El CLI de Codex no trae programador propio. Esta guía cubre la opción nativa, cron con <code>codex exec</code> y cómo programar Codex CLI en CodeAgentSwarm.",
    "ctaText": "Programa Codex CLI en CodeAgentSwarm 2.5.0 y recibe cada ejecución en un Chat al que puedes responder.",
    "ctaAgent": "codex",
    "highlightedWords": [
      "Codex"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-codex"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Se puede programar Codex?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/codex-icon.svg",
          "alt": "Codex",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Sí, de tres formas:"
        },
        {
          "type": "list",
          "items": [
            "<strong>Tareas programadas en la app de escritorio de ChatGPT.</strong> Se ejecutan en local en tu proyecto o en un worktree nuevo, con el ordenador encendido y la app abierta.",
            "<strong>cron con <code>codex exec</code>.</strong> Funciona solo con el CLI; obtienes un log.",
            "<strong>CodeAgentSwarm.</strong> Programa el Codex CLI que ya usas, en un Chat que puedes continuar, con el mismo editor que tus otros agentes."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "Tareas programadas de Codex en la app de ChatGPT",
      "content": [
        {
          "type": "paragraph",
          "text": "Se gestionan en <strong>Scheduled</strong> dentro de la app de escritorio de ChatGPT o en la web. En la app de escritorio una tarea se ejecuta en tu proyecto local o en un worktree nuevo, y OpenAI pide mantener el ordenador encendido y la app abierta cuando la tarea necesita archivos locales. Las tareas web no llegan a carpetas de tu ordenador. Las Team Tasks, que configuran los administradores del espacio de trabajo, se ejecutan en la nube. La disponibilidad depende del plan y de la configuración del espacio de trabajo."
        },
        {
          "type": "paragraph",
          "text": "La documentación lo dice claro: ni el CLI de Codex ni la extensión del IDE tienen la interfaz de tareas programadas. <a href=\"https://learn.chatgpt.com/docs/automations?surface=app\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">OpenAI: tareas programadas</a>"
        },
        {
          "type": "paragraph",
          "text": "Si pasas el día en la app de ChatGPT, sus tareas programadas son lo natural. Si usas Codex desde la terminal, o junto a Claude Code y otros agentes, CodeAgentSwarm programa directamente el CLI."
        }
      ]
    },
    {
      "id": "cron",
      "title": "Codex en cron con codex exec",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>codex exec</code> ejecuta una tarea sin la interfaz interactiva. Por defecto usa un sandbox de solo lectura; añade <code>--sandbox workspace-write</code> solo si el trabajo tiene que editar archivos."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: todos los días a las 07:00\n0 7 * * * cd ~/code/mi-app && codex exec \"Lista los tests que fallan y la causa probable. No edites archivos.\" >> ~/logs/codex-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Para CI, OpenAI recomienda su GitHub Action. <a href=\"https://learn.chatgpt.com/docs/non-interactive-mode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Modo no interactivo</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Codex en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Codex y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Codex CLI</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
            "Escribe el prompt que el agente ejecutará cada vez.",
            "En <strong>When</strong>, elige <em>At set times</em> (hasta 24 al día), <em>Every few hours</em> (1, 2, 3, 4, 6, 8 o 12) o <em>When I run it</em>, y los días.",
            "Elige <strong>Visible</strong> (abre un Chat) o <strong>Headless</strong> (sin pestaña, el resultado queda en Scheduled), y si cada ejecución sigue la misma conversación o empieza una nueva. Pulsa <strong>Create schedule</strong>."
          ]
        },
        {
          "type": "image",
          "src": "/images/guides/schedule-run-chat.webp",
          "alt": "Chat de Codex en CodeAgentSwarm con el separador Schedule, el prompt programado y Codex listando lo pendiente",
          "caption": "Una ejecución programada de Codex llegando a su Chat. Captura real de CodeAgentSwarm 2.5.0.",
          "size": "full"
        }
      ]
    },
    {
      "id": "ejemplos",
      "title": "Prompts que merece la pena programar con Codex",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Todos los días a las 21:00\nReview my notes for pending items and tell me what's left."
        },
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 09:00: resumir los pull requests pendientes de revisión.",
            "Cada 6 horas: pasar el linter y el comprobador de tipos, y arreglar solo el formato.",
            "Los lunes a las 08:00: listar los TODO añadidos la semana pasada con archivo y línea."
          ]
        },
        {
          "type": "paragraph",
          "text": "El primer prompt es el de la captura de arriba. Codex lee la carpeta de notas de ese proyecto y responde en el mismo Chat cada noche."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Codex que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/modo-yolo-codex\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Aprobaciones, sandbox y modo automático de Codex</a>",
            "<a href=\"/es/guias/historial-conversaciones-codex\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Encontrar y retomar conversaciones de Codex</a>",
            "<a href=\"/es/guias/ejecutar-multiples-sesiones-codex\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Varias sesiones de Codex a la vez</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Dónde están las tareas programadas de Codex?",
      "answer": "En Scheduled, dentro de la app de escritorio de ChatGPT y en la web. Antes se llamaban automations. El CLI de Codex no tiene interfaz de programación."
    },
    {
      "question": "¿Las tareas programadas de Codex se ejecutan en local?",
      "answer": "Las de la app de escritorio sí, en tu proyecto o en un worktree nuevo, con el ordenador encendido y la app abierta. Las web no acceden a carpetas locales y las Team Tasks van en la nube."
    },
    {
      "question": "¿Cómo pongo Codex CLI en cron?",
      "answer": "Llama a codex exec con tu prompt desde una línea del crontab, después de entrar en la carpeta del proyecto. Es de solo lectura salvo que le pases un sandbox con escritura."
    },
    {
      "question": "¿CodeAgentSwarm puede programar Codex con un modelo concreto?",
      "answer": "Sí. La tarea puede fijar modelo, razonamiento y permisos, o dejarlos en Default para seguir tu configuración de Codex."
    }
  ]
}

export default guide
