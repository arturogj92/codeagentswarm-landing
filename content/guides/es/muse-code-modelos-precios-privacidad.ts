import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "muse-code-modelos-precios-privacidad",
    "locale": "es",
    "title": "Muse Code: modelos, precios y privacidad de tu código",
    "metaTitle": "Muse Code: modelos, precios y privacidad de tu código",
    "metaDescription": "Compara Standard y Contributor en Muse Code, precios por tokens y suscripciones. Revisa entrenamiento, retención y credenciales antes de enviar tu código.",
    "intro": "Elegir un modelo de Muse también determina cómo se trata el contenido del proyecto. Conviene separar esa decisión de la forma de pago. Esta guía explica los identificadores de modelo, un cálculo de coste de API y las comprobaciones de cuenta que evitan usar una clave aparte por error.",
    "socialImage": "/images/guides/muse-code-og-es.png",
    "ctaText": "El soporte de Muse está en pruebas beta para una próxima versión de CodeAgentSwarm. El botón descarga la app pública actual; consulta sus notas para comprobar la disponibilidad de Muse.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-22",
    "alternateSlug": "muse-code-models-pricing-privacy"
  },
  "sections": [
    {
      "id": "model",
      "title": "Elige el modelo y la modalidad de datos explícitamente",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Para una sesión Standard, indica el modelo al arrancar. El <a href=\"https://dev.meta.ai/docs/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">catálogo oficial</a> incluye Muse Spark 1.3 y su variante Contributor. El sufijo tiene consecuencias: cambiar de modelo puede cambiar las condiciones aplicables a tus peticiones y respuestas."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "muse --model muse-spark-1.3 --reasoning-effort medium"
        },
        {
          "type": "table",
          "headers": [
            "Identificador del modelo",
            "Modalidad",
            "Entrenamiento"
          ],
          "rows": [
            [
              "muse-spark-1.3",
              "Standard",
              "Peticiones y respuestas excluidas del entrenamiento."
            ],
            [
              "muse-spark-1.3-contributor",
              "Contributor",
              "Permite entrenar con peticiones y respuestas."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "En un proyecto de equipo, anota el modelo junto al resultado de la tarea. Si una petición falla por disponibilidad o cuota, resuelve ese problema antes de cambiar de modalidad. Un modelo más barato no es una alternativa equivalente cuando sus condiciones de datos cambian. Esa elección debe hacerla explícitamente la persona responsable del proyecto."
        },
        {
          "type": "paragraph",
          "text": "No envíes información sensible, personal ni confidencial a Contributor, incluido el código que debas mantener confidencial. Comprueba también la disponibilidad regional y el consentimiento para entrenamiento. Estas restricciones figuran en la <a href=\"https://dev.meta.ai/legal/terms-of-service\">sección 6.2 de las condiciones de Meta</a>."
        }
      ]
    },
    {
      "id": "api-prices",
      "title": "Precios por tokens y ejemplo de cálculo",
      "content": [
        {
          "type": "paragraph",
          "text": "Las <a href=\"https://dev.meta.ai/docs/pricing-rate-limits\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">tarifas publicadas de la API</a> consultadas el 22 de septiembre de 2026 se expresan en dólares estadounidenses por millón de tokens. Son precios de consumo de API, no cuotas mensuales de suscripción."
        },
        {
          "type": "table",
          "headers": [
            "Categoría de tokens",
            "Standard",
            "Contributor"
          ],
          "rows": [
            [
              "Entrada sin caché",
              "1,25 USD",
              "0,10 USD"
            ],
            [
              "Entrada en caché",
              "0,15 USD",
              "0,002 USD"
            ],
            [
              "Salida",
              "4,25 USD",
              "0,20 USD"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Supongamos una evaluación que consume 200.000 tokens de entrada sin caché y 20.000 de salida. Standard costaría <code>0,2 × 1,25 + 0,02 × 4,25 = 0,335 USD</code> en tokens. Contributor costaría <code>0,2 × 0,10 + 0,02 × 0,20 = 0,024 USD</code>. Es el cálculo de ese consumo concreto, no una predicción de cuánto cuesta corregir un bug."
        },
        {
          "type": "paragraph",
          "text": "Un agente puede consultar el modelo varias veces mientras lee archivos y prueba un cambio. Mide la tarea completa, incluidos los intentos fallidos, antes de estimar un presupuesto semanal. El ejemplo excluye cargos independientes de herramientas, impuestos y ajustes de la cuenta. Aplica el precio de caché solo cuando el consumo la identifique."
        }
      ]
    },
    {
      "id": "subscription",
      "title": "La suscripción está vinculada a su credencial de Muse",
      "content": [
        {
          "type": "paragraph",
          "text": "Meta documenta los planes Everyday Usage, High Usage y Power Usage. La disponibilidad y las ventajas pueden variar por región: comprueba el precio y la capacidad mostrados al contratar desde tu cuenta. La <a href=\"https://dev.meta.ai/docs/muse-code/subscriptions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">documentación de suscripciones</a> no establece un precio mensual único para todos los usuarios."
        },
        {
          "type": "paragraph",
          "text": "El acceso por suscripción utiliza la credencial conectada durante la configuración inicial de Muse Code. Las claves adicionales creadas en la cuenta se facturan por consumo. Antes de comparar facturas, identifica qué acceso usó cada tarea. Basta con anotar fecha, modelo y si se ejecutó con la credencial de la suscripción o con una clave de API aparte."
        },
        {
          "type": "paragraph",
          "text": "Una clave de API en el entorno tiene prioridad sobre la sesión del navegador. Revisa la <a href=\"https://dev.meta.ai/docs/muse-code/auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">prioridad de autenticación</a> si has iniciado sesión pero el consumo aparece en otra cuenta. Comprueba la configuración del shell o de CI y la facturación de la cuenta sin mostrar la credencial."
        }
      ]
    },
    {
      "id": "privacy",
      "title": "Excluir el entrenamiento no implica retención cero",
      "content": [
        {
          "type": "paragraph",
          "text": "Standard excluye las peticiones y respuestas del entrenamiento. Eso no establece por sí solo retención cero. Las <a href=\"https://dev.meta.ai/legal/terms-of-service\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">condiciones de Model API</a> describen la retención y otros tratamientos, incluidos el funcionamiento del servicio y su seguridad. Revísalas para la modalidad elegida antes de enviar código privado."
        },
        {
          "type": "paragraph",
          "text": "Separa tres preguntas: si el proveedor puede entrenar con el contenido, cómo conserva lo enviado y qué guardan las herramientas locales. Una opción de registro local no resuelve la pregunta sobre retención del proveedor. Borrar una conversación del ordenador tampoco demuestra que el servicio haya borrado las peticiones recibidas."
        },
        {
          "type": "paragraph",
          "text": "Para evaluar el producto, utiliza un repositorio que tengas autorización para enviar. Evita credenciales de producción y datos de clientes en las peticiones de ejemplo. Si necesitas aportar un log, reduce su contenido a las líneas que reproducen el problema y elimina los secretos antes de compartirlo con el agente. También facilitará revisar el diagnóstico."
        }
      ]
    },
    {
      "id": "compare",
      "title": "Compara modelos con la misma condición de aceptación",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Encuentra la causa de este caso de validación que falla.\nExplica quién usa ese código antes de editarlo.\nHaz una corrección y ejecuta el test específico existente.\nEntrega el diff, el resultado y las suposiciones sin resolver."
        },
        {
          "type": "paragraph",
          "text": "Ejecuta una tarea representativa en un proyecto limpio y guarda el commit inicial. Compara la corrección del cambio, el tiempo de revisión y el consumo total. Una respuesta rápida que introduce otro defecto es un mal resultado aunque cueste pocos tokens. Repite la comparación cuando cambien lo suficiente la tarea o la configuración."
        },
        {
          "type": "paragraph",
          "text": "Mantén el mismo modelo al diagnosticar la <a href=\"/es/guias/muse-code-en-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">instalación en Windows</a> o añadir <a href=\"/es/guias/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP y skills</a>. Cambiar modelo, credenciales y herramientas a la vez dificulta identificar la causa de un resultado diferente."
        }
      ]
    },
    {
      "id": "beta",
      "title": "Qué establece la beta de CodeAgentSwarm",
      "content": [
        {
          "type": "callout",
          "variant": "info",
          "content": "La próxima integración de Muse selecciona Standard explícitamente salvo que el usuario elija otro modelo, sin cambiar a Contributor de forma silenciosa. Sigue en pruebas beta. El consumo observado en un equipo no equivale a una cuota verificada de toda la cuenta; una vista vacía tampoco significa capacidad ilimitada."
        },
        {
          "type": "paragraph",
          "text": "Usa la <a href=\"/es/guias/como-usar-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de primera tarea</a> para validar la CLI independiente antes de añadir una integración de escritorio. Consulta las notas públicas de CodeAgentSwarm para comprobar la disponibilidad de Muse."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Muse Code es gratis?",
      "answer": "La CLI se conecta a un servicio con facturación por consumo o acceso mediante una suscripción disponible para tu cuenta. Comprueba la oferta actual: instalarla no demuestra que tengas un uso gratuito incluido."
    },
    {
      "question": "¿Una suscripción cubre cualquier clave de API que cree?",
      "answer": "La documentación vincula la suscripción a la credencial de Muse Code conectada durante la configuración inicial. Las claves adicionales se facturan por consumo."
    },
    {
      "question": "¿Standard significa que Meta no conserva nada?",
      "answer": "No. La exclusión del entrenamiento y las condiciones de retención son cuestiones separadas. Consulta las condiciones actuales de Model API y los acuerdos aplicables a tu cuenta."
    },
    {
      "question": "¿Conviene cambiar a Contributor cuando alcanzo un límite?",
      "answer": "Comprueba primero las restricciones de contenido y la disponibilidad regional. Aceptar el entrenamiento no permite enviar código confidencial ni datos personales. Diagnostica el límite antes de decidir si la tarea puede usar Contributor."
    }
  ]
}

export default guide
