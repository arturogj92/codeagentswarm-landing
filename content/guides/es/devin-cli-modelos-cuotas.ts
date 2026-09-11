import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "devin-cli-modelos-cuotas",
    "locale": "es",
    "title": "Modelos y cuotas de Devin CLI: entiende cada indicador",
    "metaTitle": "Modelos, límites de uso y cuotas de Devin CLI",
    "metaDescription": "Elige modelo en Devin CLI y distingue los tokens de contexto de las cuotas diarias y semanales. Mira el selector y el panel de uso de CodeAgentSwarm beta.",
    "intro": "La elección del modelo, el contexto de una conversación y la cuota de la cuenta responden a preguntas distintas. Léelos por separado antes de empezar una tarea larga. Esta guía explica los controles y cómo los muestra la beta de CodeAgentSwarm.",
    "ctaText": "El selector de modelos y el panel de cuotas de Devin están en pruebas beta de CodeAgentSwarm. Consulta su disponibilidad en las notas del release público; la descarga no incluye una suscripción a Devin.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-11",
    "alternateSlug": "devin-cli-models-usage-limits",
    "socialImage": "/images/guides/devin-cli-og-es.png"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Elige entre los modelos que muestra tu cuenta",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "devin models list"
        },
        {
          "type": "paragraph",
          "text": "Dentro de la CLI, usa <code>/model</code> para abrir el selector. El catálogo puede cambiar y la organización puede restringirlo. Adaptive es una opción de selección automática, no la promesa de usar siempre el mismo modelo. <a href=\"https://docs.devin.ai/cli/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Documentación oficial de modelos</a>."
        }
      ]
    },
    {
      "id": "model-picker",
      "title": "El selector de modelos en el Chat",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-models-beta.webp",
          "alt": "Selector de modelos de Devin en la beta de CodeAgentSwarm",
          "caption": "Captura real de la beta. Los nombres corresponden a la cuenta y CLI de esta sesión; tu catálogo puede ser distinto.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "Comprueba el modelo seleccionado antes de enviar una petición. Para comparar, mantén la misma tarea y proyecto y revisa la corrección y las comprobaciones que pasan. Una respuesta rápida que menciona un archivo inexistente no es un buen resultado."
        }
      ]
    },
    {
      "id": "meters",
      "title": "El contexto no es la cuota de la cuenta",
      "content": [
        {
          "type": "table",
          "headers": [
            "Indicador",
            "Qué indica"
          ],
          "rows": [
            [
              "Tokens de contexto",
              "Cuánto contexto de conversación está usando la sesión."
            ],
            [
              "Cuota diaria / semanal",
              "Asignación de la cuenta consumida dentro del periodo indicado."
            ],
            [
              "Reinicio",
              "Cuándo se renueva la asignación indicada."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Una conversación puede tener mucho contexto disponible y la cuenta tener poca cuota restante. Del mismo modo, empezar otra conversación puede reducir su contexto sin renovar la asignación de la cuenta."
        }
      ]
    },
    {
      "id": "quota-panel",
      "title": "Consulta el uso diario y semanal en la beta",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-quota-beta.webp",
          "alt": "Panel de cuota diaria y semanal de Devin en la beta de CodeAgentSwarm",
          "caption": "Interfaz real de la beta con valores de cuota de demostración: 75% diario y 20% semanal. Son valores ilustrativos, no el saldo real de una cuenta ni la asignación de un plan.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "La beta de CodeAgentSwarm consulta el perfil actual de Devin CLI y muestra los periodos de uso que devuelve. Los porcentajes indican cuota consumida. Una respuesta ausente o fallida no debe interpretarse como consumo cero."
        }
      ]
    },
    {
      "id": "plans",
      "title": "Comprueba el plan antes de asumir un límite",
      "content": [
        {
          "type": "paragraph",
          "text": "Devin documenta asignaciones diarias y semanales para Pro y puestos completos de Teams, y una asignación semanal sin límite diario para Max. La cuota incluida puede compartirse entre productos de Devin; los créditos adicionales tienen reglas de facturación propias. Consulta <a href=\"https://docs.devin.ai/admin/billing/self-serve\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">la facturación de Devin</a> para conocer las condiciones actuales."
        },
        {
          "type": "paragraph",
          "text": "La suscripción a CodeAgentSwarm no se convierte en crédito de Devin. Consulta el panel de tu cuenta de Devin para verificar el plan, la facturación y cualquier consumo adicional antes de continuar una tarea grande."
        }
      ]
    },
    {
      "id": "practical-check",
      "title": "Una comprobación antes de una tarea larga",
      "content": [
        {
          "type": "list",
          "items": [
            "Confirma la cuenta de Devin en el equipo que ejecuta la sesión.",
            "Revisa el modelo y los periodos de cuota disponibles.",
            "Divide la tarea en cambios que puedas revisar y probar por separado."
          ]
        },
        {
          "type": "paragraph",
          "text": "Si falta la autenticación, vuelve a <a href=\"/es/guias/como-usar-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">instalación y login</a>. Para retomar una tarea, usa el <a href=\"/es/guias/devin-cli-mcp-historial\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">historial y la reanudación</a> en lugar de pegar una y otra vez el contexto del proyecto."
        }
      ]
    },
    {
      "id": "codeagentswarm-beta",
      "title": "Devin en CodeAgentSwarm: estado de la beta",
      "content": [
        {
          "type": "paragraph",
          "text": "La integración está en pruebas para un próximo release de CodeAgentSwarm. Las capturas muestran esa beta y no anuncian que el instalador público actual ya incluya Devin. Inicia sesión con la CLI oficial de Devin en el ordenador donde se ejecuta el agente."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Los tokens de contexto son la cuota de Devin?",
      "answer": "No. El contexto describe la conversación actual. La cuota de la cuenta describe el uso dentro de los periodos de asignación de tu plan."
    },
    {
      "question": "¿Todos los planes de Devin tienen límite diario?",
      "answer": "No. La documentación actual de Devin describe Max con cuota semanal sin límite diario. Comprueba tu plan y el panel de tu cuenta."
    },
    {
      "question": "¿CodeAgentSwarm incluye el consumo de Devin?",
      "answer": "No. El acceso y consumo de la cuenta de Devin son independientes de la suscripción a CodeAgentSwarm. La integración está en pruebas beta."
    }
  ]
}

export default guide
