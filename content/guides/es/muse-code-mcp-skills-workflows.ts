import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "muse-code-mcp-skills-workflows",
    "locale": "es",
    "title": "Muse Code: configurar MCP, skills y workflows",
    "metaTitle": "Muse Code: configurar MCP, skills y workflows",
    "metaDescription": "Configura MCP y skills reutilizables en Muse Code. Diagnostica fallos de servidores requeridos y comprueba los workflows antes de repartir tareas entre agentes.",
    "intro": "Un servidor MCP da acceso a herramientas. Una skill aporta instrucciones reutilizables. Un workflow organiza varias tareas de agentes. Elige la incorporación más pequeña que resuelva tu problema actual y compruébala por separado antes de combinar las tres en un proyecto de producción.",
    "socialImage": "/images/guides/muse-code-og-es.png",
    "ctaText": "Usa Muse Code en CodeAgentSwarm 2.4.0 para macOS y Windows. El acceso y la facturación de Meta son independientes.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-24",
    "alternateSlug": "muse-code-mcp-skills-workflows"
  },
  "sections": [
    {
      "id": "choose",
      "title": "Elige la extensión adecuada para la tarea",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "table",
          "headers": [
            "Necesidad",
            "Punto de partida",
            "Primera comprobación"
          ],
          "rows": [
            [
              "Leer una incidencia o un documento externo",
              "Un servidor MCP de ese servicio",
              "Recuperar un elemento conocido."
            ],
            [
              "Repetir el procedimiento de revisión del equipo",
              "Una skill del proyecto",
              "Aplicarla a un diff pequeño."
            ],
            [
              "Revisar partes independientes de un cambio grande",
              "Un workflow disponible",
              "Obtener hallazgos con referencias a archivos."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Haz una prueba concreta. En un gestor de incidencias, utiliza una incidencia inocua que conozcas. Para una skill, elige un cambio existente con un defecto fácil de identificar. Así podrás distinguir una conexión que funciona de una explicación que simplemente parece convincente."
        }
      ]
    },
    {
      "id": "mcp",
      "title": "Conecta un servidor MCP y verifica sus herramientas",
      "content": [
        {
          "type": "paragraph",
          "text": "Muse lee los servidores del bloque <code>mcp_servers</code> de sus ajustes. La ruta habitual es <code>~/.config/muse/settings.json</code>. Conserva la configuración existente al añadir un servidor y mantén <code>schema_version: 1</code>. Usa el comando o la URL reales que publique su proveedor. La <a href=\"https://dev.meta.ai/docs/muse-code/extending\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">referencia de extensiones</a> documenta los transportes disponibles."
        },
        {
          "type": "paragraph",
          "text": "Integra esta entrada en tus ajustes actuales; no sustituyas el archivo entero. La URL es un ejemplo. Cámbiala por el endpoint MCP real de tu servidor antes de arrancar Muse. Aquí el servidor es obligatorio porque la tarea depende de él."
        },
        {
          "type": "code",
          "language": "json",
          "code": "{\n  \"schema_version\": 1,\n  \"mcp_servers\": {\n    \"issue-tracker\": {\n      \"transport\": \"streamable_http\",\n      \"url\": \"https://mcp.example.com/mcp\",\n      \"headers\": {},\n      \"enabled\": true,\n      \"mode\": \"required\"\n    }\n  }\n}"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "muse mcp login issue-tracker"
        },
        {
          "type": "paragraph",
          "text": "Este ejemplo presupone un servidor remoto ya configurado con el nombre <code>issue-tracker</code> que requiere OAuth. Sustituye el nombre por el de tu servidor. Autenticarse en Muse y autenticarse en una herramienta externa son comprobaciones separadas. Dentro de la sesión interactiva, abre <code>/mcp</code> y confirma la conexión antes de pedir datos."
        },
        {
          "type": "paragraph",
          "text": "Solicita un elemento conocido y compara sus campos con la fuente. No empieces pidiendo cambios en cien incidencias. Si el inventario de herramientas está vacío, conserva el nombre del servidor y su error de inicio; investiga la conexión antes de reescribir la petición."
        }
      ]
    },
    {
      "id": "startup",
      "title": "Por qué un servidor puede bloquear el arranque",
      "content": [
        {
          "type": "paragraph",
          "text": "El fallo de un servidor MCP requerido interrumpe el inicio. Marcarlo como opcional cambia ese comportamiento, así que decide según la dependencia real de la tarea. Un calendario puede ser opcional para revisar código. Una comprobación obligatoria de políticas no debería omitirse en silencio porque resulte incómoda de arrancar."
        },
        {
          "type": "paragraph",
          "text": "Comprueba la ruta del ejecutable, sus argumentos y el entorno disponible para el proceso que abre Muse. Un servidor que funciona desde tu shell puede depender de un perfil o una variable ausentes en una app de escritorio. Evita pegar tokens resueltos en ejemplos de configuración o logs de soporte. Cambia un ajuste cada vez y repite la misma lectura pequeña."
        },
        {
          "type": "paragraph",
          "text": "Si falla al retomar una sesión, distingue entre la conversación original y una bifurcación e incluye el error exacto. Parte de la conversación que contiene tu tarea en lugar de crear copias hasta que alguna se abra."
        }
      ]
    },
    {
      "id": "skills",
      "title": "Convierte una revisión repetida en una skill",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "muse skills list\nmuse skills inspect review-validation"
        },
        {
          "type": "paragraph",
          "text": "El segundo comando presupone que existe una skill con ese identificador. Una skill del proyecto puede guardarse en <code>.agents/skills/review-validation/SKILL.md</code>. Examina sus instrucciones antes de ejecutarla, sobre todo si procede de otro repositorio. Si no aparece en la lista, comprueba la ruta y la confianza concedida al proyecto."
        },
        {
          "type": "code",
          "language": "markdown",
          "code": "---\nname: review-validation\ndescription: Revisa cambios de validación y aporta evidencia sin modificar archivos.\n---\n\nRevisa el cambio de validación actual y quién usa ese código.\nIdentifica una entrada que deba fallar y otra que deba pasar.\nEjecuta el test específico existente cuando esté disponible.\nEntrega referencias a archivos y problemas pendientes. No edites."
        },
        {
          "type": "paragraph",
          "text": "Guarda el archivo en <code>.agents/skills/review-validation/SKILL.md</code>, valídalo y abre Muse en el proyecto de confianza. Ejecuta <code>/review-validation</code>. Pruébalo con un diff que contenga un caso límite conocido y comprueba que la revisión lo detecta."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "muse skills validate .agents/skills/review-validation\nmuse skills list"
        }
      ]
    },
    {
      "id": "workflows",
      "title": "Comprueba los workflows antes de depender de ellos",
      "content": [
        {
          "type": "callout",
          "variant": "info",
          "content": "Los workflows dependen de la versión instalada y de su despliegue. La ayuda de Muse 1.3.0 consultada para esta guía no mostraba el comando workflows. Comprueba muse --help y la paleta interactiva. No presupongas que todos los comandos documentados funcionan en cualquier instalación."
        },
        {
          "type": "paragraph",
          "text": "Si tu versión los admite, la <a href=\"https://dev.meta.ai/docs/muse-code/workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía oficial de workflows</a> explica los grupos paralelos y las fases dependientes. Prueba primero una revisión de lectura antes de permitir que varios agentes escriban. Exige evidencia para cada hallazgo y pide a un revisor final que descarte las afirmaciones sin fundamento."
        },
        {
          "type": "code",
          "language": "text",
          "code": "Si hay workflows disponibles, revisa este cambio con dos lectores.\nUno comprueba compatibilidad de API; otro, cobertura de tests.\nUn revisor final contrasta los hallazgos con el diff real.\nEntrega un informe con referencias a archivos. No edites ni hagas commits."
        },
        {
          "type": "paragraph",
          "text": "Si no están disponibles, haz esas dos revisiones en secuencia en una sesión normal. Mantén separadas las preguntas y sus resultados. El trabajo paralelo ahorra tiempo cuando las tareas son independientes; aporta poco a una edición pequeña con un único test claro."
        }
      ]
    },
    {
      "id": "sessions",
      "title": "Separa la coordinación del aislamiento de archivos",
      "content": [
        {
          "type": "paragraph",
          "text": "La <a href=\"https://dev.meta.ai/docs/muse-code/session-messaging\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">mensajería nativa entre sesiones</a> conecta sesiones locales compatibles en macOS y Linux; no está disponible en Windows. Un mensaje puede transmitir un hallazgo, pero no fusiona directorios ni aprueba acciones por el destinatario. Usa worktrees de Git distintos para agentes que escriban en paralelo y revisa los cambios antes de integrarlos."
        },
        {
          "type": "paragraph",
          "text": "Muse está disponible desde CodeAgentSwarm 2.4.0. Empieza con <a href=\"/es/guias/como-usar-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">una tarea verificada en la CLI</a> y revisa <a href=\"/es/guias/muse-code-modelos-precios-privacidad\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">el modelo y sus condiciones de datos</a> antes de conectar servicios privados."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Instalar una skill también configura MCP?",
      "answer": "Trata las instrucciones y las conexiones por separado. Lee la skill, configura deliberadamente los servidores necesarios y confirma sus herramientas antes de depender del flujo."
    },
    {
      "question": "¿Por qué Muse deja de responder al añadir MCP?",
      "answer": "Un servidor requerido que falla al iniciar puede detener la ejecución. Revisa el error y la configuración de ese servidor antes de cambiar repetidamente el modelo o la petición."
    },
    {
      "question": "¿Puedo usar workflows en todas las plataformas?",
      "answer": "No hay una disponibilidad universal confirmada. Comprueba tu versión y su despliegue: la ayuda de Muse 1.3.0 consultada no incluía la familia de comandos workflows."
    },
    {
      "question": "¿Las sesiones separadas evitan ediciones simultáneas de archivos?",
      "answer": "No. Dos sesiones en el mismo directorio pueden modificar los mismos archivos. Usa worktrees de Git separados para agentes que escriban en paralelo e integra sus cambios de forma deliberada."
    }
  ]
}

export default guide
