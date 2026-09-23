import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "devin-cli-modelos-cuotas",
    "locale": "es",
    "title": "Devin Pro: precio, SWE-2 gratis y cuotas de la CLI",
    "metaTitle": "Devin Pro: precio, SWE-2 gratis y límites de uso",
    "metaDescription": "Consulta el precio de Devin Pro, la promoción de SWE-2 y sus fechas oficiales discrepantes. Aprende a leer modelos, contexto y cuotas diarias y semanales.",
    "intro": "¿Buscas SWE-2 ilimitado con Devin Pro? La oferta vigente permite usarlo gratis temporalmente en Desktop y CLI. Comprueba la fecha y el modelo antes de contratar. Revisado el 22 de septiembre de 2026.",
    "ctaText": "El selector de modelos y el panel de cuotas de Devin están en pruebas beta de CodeAgentSwarm. Consulta su disponibilidad en las notas del release público; la descarga no incluye una suscripción a Devin.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-22",
    "alternateSlug": "devin-cli-models-usage-limits",
    "socialImage": "/images/guides/devin-cli-og-es.png"
  },
  "sections": [
    {
      "id": "pro-swe-2",
      "title": "Devin Pro cuesta 20 USD al mes",
      "content": [
        {
          "type": "paragraph",
          "text": "La <a href=\"https://devin.ai/pricing\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">página oficial de precios</a> anuncia Pro por <strong>20 USD al mes</strong> y SWE-2 gratis en Desktop y CLI hasta el <strong>10 de octubre de 2026</strong>."
        },
        {
          "type": "paragraph",
          "text": "El 10 de septiembre, <a href=\"https://x.com/devindesktop/status/2098092331140296972\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin Desktop anunció en X un mes de uso ilimitado</a> para Pro y Teams. La oferta corresponde a SWE-2 en Desktop y CLI."
        },
        {
          "type": "callout",
          "variant": "info",
          "content": "Hay una discrepancia: <a href=\"https://docs.devin.ai/desktop/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">la documentación de modelos</a> indica el <strong>15 de octubre de 2026</strong>. Confirma las condiciones en el selector y tu cuenta antes de pagar."
        },
        {
          "type": "paragraph",
          "text": "Según <a href=\"https://docs.devin.ai/desktop/accounts/quota\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">la documentación de cuotas</a>, los modelos gratuitos no descuentan cuota. Mientras SWE-2 figure como gratuito, esa es la ventaja práctica de la promoción. Los demás modelos de pago siguen consumiendo su asignación; el anuncio no acredita Devin Cloud gratuito ni disponibilidad sin restricciones."
        },
        {
          "type": "paragraph",
          "text": "Para valorar su rendimiento, consulta <a href=\"/es/guias/swe-2-benchmarks-comparativa\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">los benchmarks de SWE-2 y una prueba reproducible en tu proyecto</a>."
        }
      ]
    },
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
      "id": "choose-swe-2",
      "title": "Cómo elegir SWE-2 sin adivinar el identificador",
      "content": [
        {
          "type": "paragraph",
          "text": "Abre <code>/model</code> en la CLI interactiva, elige una entrada de SWE-2 disponible para tu cuenta y anota su nivel de razonamiento. El alias <code>swe</code> apunta al modelo más reciente de esa familia: no fija SWE-2 para siempre. Para repetir una comparación, guarda la entrada exacta del catálogo y la versión de la CLI."
        },
        {
          "type": "paragraph",
          "text": "Adaptive y Fusion son opciones distintas de una sesión con SWE-2 fijo. Si quieres evaluar SWE-2, revisa la selección antes de cada intento en lugar de suponer que todas las respuestas de Devin utilizan ese modelo. Consulta la <a href=\"https://docs.devin.ai/cli/models\">selección de modelos de Devin</a>."
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
    },
    {
      "id": "after-promotion",
      "title": "Qué cambia al terminar la promoción",
      "content": [
        {
          "type": "paragraph",
          "text": "La <a href=\"https://docs.devin.ai/desktop/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">tabla de modelos</a> publica estas tarifas posteriores por millón de tokens: 3 USD de entrada, 15 USD de salida y 0,30 USD de entrada en caché. Comprueba el precio vigente en el selector. Es una tarifa de consumo, separada de la suscripción mensual."
        },
        {
          "type": "paragraph",
          "text": "Haz tu presupuesto para cuando acabe la promoción. Guarda una tarea representativa, sus resultados y el consumo observado; así podrás decidir si te compensa continuar cuando el modelo deje de aparecer gratis."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿SWE-2 es ilimitado para siempre con Devin Pro?",
      "answer": "No hay una promesa permanente. La promoción es temporal y las fuentes oficiales discrepan entre el 10 y el 15 de octubre de 2026. Confirma la fecha y la etiqueta de precio en tu cuenta."
    },
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
