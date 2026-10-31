import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "tareas-programadas-antigravity-cli",
    "locale": "es",
    "title": "Cómo programar Antigravity CLI (agy): cron y ejecuciones periódicas",
    "metaTitle": "Programar Antigravity CLI (agy): cron y tareas periódicas",
    "metaDescription": "Antigravity CLI no documenta un programador. Ejecuta agy a una hora con agy -p en cron o con CodeAgentSwarm, en un Chat que puedes continuar.",
    "intro": "Antigravity CLI de Google (<code>agy</code>, el sucesor de Gemini CLI) no tiene una forma documentada de ejecutarse a una hora. Su changelog menciona una herramienta de programación que el agente usa dentro de una sesión, pero ninguna página de la documentación la explica. Para lanzar agy cada mañana tienes dos opciones sólidas: cron con el modo sin interfaz o las conversaciones programadas de CodeAgentSwarm.",
    "ctaText": "Programa Antigravity CLI en CodeAgentSwarm 2.5.0 y lee cada ejecución en su propio Chat.",
    "ctaAgent": "antigravity",
    "highlightedWords": [
      "Antigravity CLI"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "schedule-antigravity-cli"
  },
  "sections": [
    {
      "id": "respuesta-rapida",
      "title": "¿Antigravity CLI se puede programar?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/antigravity-icon.png",
          "alt": "Antigravity CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "No como función documentada. Usa una de estas:"
        },
        {
          "type": "list",
          "items": [
            "<strong>cron con <code>agy -p</code>.</strong> El modo sin interfaz ejecuta un prompt e imprime la respuesta.",
            "<strong>CodeAgentSwarm.</strong> Elige Antigravity CLI como agente, pon las horas y lee cada ejecución en un Chat que puedes continuar."
          ]
        }
      ]
    },
    {
      "id": "nativo",
      "title": "Lo que ofrece Antigravity CLI hoy",
      "content": [
        {
          "type": "paragraph",
          "text": "La documentación oficial cubre el modo sin interfaz, pero no un programador. El <a href=\"https://raw.githubusercontent.com/google-antigravity/antigravity-cli/refs/heads/main/CHANGELOG.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">changelog</a> incluye una herramienta <code>schedule</code> con temporizadores periódicos y de una vez dentro del agente, sin una página que diga cuánto duran. Tómala como una ayuda dentro de la sesión, no como sustituto de cron, hasta que Google la documente."
        }
      ]
    },
    {
      "id": "cron",
      "title": "agy en cron con el modo sin interfaz",
      "content": [
        {
          "type": "paragraph",
          "text": "Inicia sesión una vez de forma interactiva y después cron puede lanzar el modo sin interfaz:"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: de lunes a viernes a las 09:00\n0 9 * * 1-5 cd ~/code/mi-app && agy -p \"Explica cualquier test que falle. No edites archivos.\" --output-format text >> ~/logs/agy-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Tiene opciones como <code>--output-format text|json|stream-json</code> y <code>--model</code>. Saltarse los permisos en un trabajo desatendido es arriesgado; mantén el prompt en solo lectura. <a href=\"https://antigravity.google/docs/cli/headless\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación del modo headless</a>"
        }
      ]
    },
    {
      "id": "configurar",
      "title": "Programar Antigravity CLI en CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Abre <strong>Scheduled</strong> en la barra superior y pulsa <strong>New schedule</strong>. También puedes escribir el prompt en un Chat de Antigravity CLI y elegir <strong>Schedule this prompt…</strong> en el menú de enviar.",
            "Elige el <strong>Project</strong> y <strong>Antigravity CLI</strong> como agente. Modelo, razonamiento y permisos son opcionales: déjalos en Default o elígelos como en el Chat.",
            "Escribe el prompt que el agente ejecutará cada vez.",
            "En <strong>When</strong>, elige <em>At set times</em> (hasta 24 al día), <em>Every few hours</em> (1, 2, 3, 4, 6, 8 o 12) o <em>When I run it</em>, y los días.",
            "Elige <strong>Visible</strong> (abre un Chat) o <strong>Headless</strong> (sin pestaña, el resultado queda en Scheduled), y si cada ejecución sigue la misma conversación o empieza una nueva. Pulsa <strong>Create schedule</strong>."
          ]
        },
        {
          "type": "image",
          "src": "/images/guides/schedule-agent-picker.webp",
          "alt": "Editor de tareas programadas de CodeAgentSwarm con la lista de agentes abierta: Claude Code, Codex CLI, Antigravity CLI, opencode y Kimi Code",
          "caption": "Antigravity CLI aparece en la lista cuando agy está instalado. Captura real de CodeAgentSwarm 2.5.0.",
          "size": "full"
        }
      ]
    },
    {
      "id": "ejemplos",
      "title": "Prompts que merece la pena programar con Antigravity CLI",
      "content": [
        {
          "type": "list",
          "items": [
            "De lunes a viernes a las 09:00: leer los issues abiertos y preparar un plan para el más importante, sin editar archivos.",
            "Cada 8 horas: pasar los tests y explicar cualquier fallo con palabras claras.",
            "Los domingos a las 20:00: revisar los commits de la semana y señalar los cambios con riesgo."
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
            "Con <strong>Continue the same conversation</strong>, una ejecución visible va al agente de Antigravity CLI que ya tiene la conversación, sin abrir una segunda copia. Con <strong>Start a new conversation</strong>, cada ejecución abre un agente nuevo. Si está ocupado, <strong>Skip if still working</strong> (activado por defecto) se salta esa hora; si lo desactivas, el prompt espera en la cola.",
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
            "<a href=\"/es/guias/como-usar-antigravity-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cómo usar Antigravity CLI (agy)</a>",
            "<a href=\"/es/guias/modo-yolo-antigravity\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Permisos y modo YOLO de Antigravity CLI</a>",
            "<a href=\"/es/guias/historial-conversaciones-antigravity\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Historial de conversaciones de Antigravity CLI</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Antigravity CLI tiene programador?",
      "answer": "No uno documentado. El changelog menciona una herramienta de programación dentro de la sesión, pero la documentación solo describe el modo sin interfaz, que puedes lanzar desde cron."
    },
    {
      "question": "¿Cómo ejecuto agy desde cron?",
      "answer": "Inicia sesión una vez y añade una línea al crontab que entre en el proyecto y ejecute agy -p con tu prompt, guardando la salida en un log."
    },
    {
      "question": "¿Puedo programar Antigravity CLI y seguir la conversación?",
      "answer": "Sí, en CodeAgentSwarm. Con Continue the same conversation, cada ejecución llega al mismo Chat de Antigravity y puedes responderle."
    }
  ]
}

export default guide
