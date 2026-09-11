import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "swe-2-benchmarks-comparativa",
    "locale": "es",
    "title": "Benchmarks de SWE-2: resultados, límites y cómo probarlo",
    "metaTitle": "Benchmarks de SWE-2: comparativa con Fable y GPT-6",
    "metaDescription": "Compara los benchmarks publicados de SWE-2, Fable 5.1 y GPT-6 Astra. Revisa la metodología y prepara una prueba en tu repositorio antes de elegir un modelo.",
    "intro": "Para elegir un modelo de programación conviene mirar qué tareas resuelve, cuánto tarda y cuánto trabajo deja al revisor. Esta guía reúne resultados publicados y un método sencillo para comprobar si SWE-2 encaja en tu proyecto.",
    "ctaText": "Prueba el selector de Devin y compara conversaciones en la beta de CodeAgentSwarm. La integración está en pruebas para una próxima versión; consulta su disponibilidad en las notas de la versión pública.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "SWE-2"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-11",
    "alternateSlug": "swe-2-benchmarks",
    "socialImage": "/images/guides/devin-cli-og-es.png"
  },
  "sections": [
    {
      "id": "published-results",
      "title": "Resultados publicados por Cognition",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "<a href=\"https://cognition.com/blog/swe-2\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cognition publicó esta comparación</a> el 10 de septiembre de 2026. Son cifras del fabricante, no pruebas ejecutadas por CodeAgentSwarm."
        },
        {
          "type": "table",
          "headers": [
            "Benchmark",
            "SWE-2",
            "Fable 5.1",
            "GPT-6 Astra"
          ],
          "rows": [
            [
              "FrontierCode 1.1 Main",
              "50,0%",
              "50,9%",
              "53,3%"
            ],
            [
              "DeepSWE 1.1",
              "73,0%",
              "67,4%",
              "74,1%"
            ],
            [
              "Terminal-Bench 2.1",
              "92,8%",
              "91,4%",
              "89,9%"
            ],
            [
              "Terminal-Bench 4",
              "27,3%",
              "55,8%",
              "57,9%"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "SWE-2 destaca en Terminal-Bench 2.1, pero queda bastante por detrás en Terminal-Bench 4. La elección depende del tipo de tarea."
        }
      ]
    },
    {
      "id": "methodology",
      "title": "Cómo leer esta comparación",
      "content": [
        {
          "type": "paragraph",
          "text": "El <a href=\"https://cognition.com/blog/swe-2#appendix-a-evaluation-methodology\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">apéndice metodológico</a> combina resultados públicos y evaluaciones internas, utiliza distintos agentes y elige el mejor nivel de esfuerzo por modelo. No es una prueba con configuración idéntica."
        },
        {
          "type": "paragraph",
          "text": "<a href=\"https://cognition.com/blog/frontier-code-1.1\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">FrontierCode 1.1 Main</a> contiene las 100 tareas más difíciles de Extended. Cognition desarrolla tanto este benchmark como SWE-2. Ten en cuenta esa relación al interpretar los resultados."
        },
        {
          "type": "paragraph",
          "text": "Conserva el nombre y la versión de cada prueba al comparar cifras. Tampoco conviertas una puntuación agregada en la probabilidad de que el agente resuelva tu siguiente bug: tu proyecto puede usar otras herramientas, lenguajes y restricciones."
        }
      ]
    },
    {
      "id": "reasoning",
      "title": "Elige un nivel de esfuerzo concreto",
      "content": [
        {
          "type": "paragraph",
          "text": "La <a href=\"https://docs.devin.ai/desktop/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">documentación de modelos</a> enumera SWE-2 Medium, High y Max. Anota cuál pruebas para poder repetir la comparación."
        },
        {
          "type": "image",
          "src": "/images/guides/devin-models-beta.webp",
          "alt": "Selector de modelos de Devin en CodeAgentSwarm beta",
          "caption": "Captura real de la beta. Documenta el selector; no representa una ejecución de los benchmarks.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "Empieza con el esfuerzo que usarías habitualmente y repite solo los fallos que merezcan más tiempo. Si cambias de nivel, registra también esa ejecución fallida: descartarla haría que la comparación pareciera mejor de lo que fue."
        }
      ]
    },
    {
      "id": "your-repository",
      "title": "Una prueba pequeña en tu repositorio",
      "content": [
        {
          "type": "paragraph",
          "text": "Esta es nuestra propuesta de evaluación local; no hemos ejecutado este protocolo como benchmark de SWE-2. Elige un bug reproducible, un cambio de interfaz y una tarea de mantenimiento que conozcas bien."
        },
        {
          "type": "list",
          "items": [
            "Prepara el mismo commit inicial, dependencias y pruebas para cada intento.",
            "Entrega la misma petición y permite las mismas herramientas. Mantén separados los cambios de cada modelo.",
            "Registra tiempo total, intervención humana y consumo real, incluidos los reintentos.",
            "Revisa el diff y ejecuta las pruebas antes de puntuar la solución."
          ]
        },
        {
          "type": "code",
          "language": "text",
          "code": "Tarea | Modelo + esfuerzo | Pruebas superadas | Correcciones de revisión | Tiempo total | Consumo\nCorrección de bug | SWE-2 High | ... | ... | ... | ..."
        },
        {
          "type": "paragraph",
          "text": "Un resultado útil es una solución que aceptarías en el proyecto. Cuenta los arreglos que hiciste tú y el tiempo de revisión; una respuesta rápida puede resultar cara si necesita correcciones."
        }
      ]
    },
    {
      "id": "price",
      "title": "Valora el coste después de comprobar la calidad",
      "content": [
        {
          "type": "paragraph",
          "text": "Para el precio de Pro, la promoción temporal y sus fechas, consulta <a href=\"/es/guias/devin-cli-modelos-cuotas\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">la guía de modelos y cuotas de Devin</a>. Guarda las condiciones que tenía tu cuenta el día de la prueba para que el resultado siga siendo interpretable cuando cambie la oferta."
        },
        {
          "type": "paragraph",
          "text": "Si aún no has instalado el agente, empieza por <a href=\"/es/guias/como-usar-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">instalación y login de Devin CLI</a>."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Estos benchmarks los ha ejecutado CodeAgentSwarm?",
      "answer": "No. La tabla recoge resultados publicados por Cognition. La prueba local propuesta es una forma de evaluar el modelo en tu propio proyecto."
    },
    {
      "question": "¿SWE-2 es el mejor modelo para cualquier tarea?",
      "answer": "La tabla no permite afirmarlo. Prueba tareas representativas y valora corrección, revisión humana, tiempo y consumo antes de elegir."
    },
    {
      "question": "¿Puedo comparar la beta de CodeAgentSwarm con otra CLI?",
      "answer": "Sí, pero estarás comparando el modelo junto con su entorno de ejecución. Anota las herramientas, permisos y configuración de cada entorno."
    }
  ]
}

export default guide
