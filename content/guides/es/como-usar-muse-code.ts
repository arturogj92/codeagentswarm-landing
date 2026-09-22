import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "como-usar-muse-code",
    "locale": "es",
    "title": "Cómo usar Muse Code: instalación, login y primera tarea",
    "metaTitle": "Cómo usar Muse Code: instalación, login y primera tarea",
    "metaDescription": "Instala Muse Code, elige Muse Spark 1.3 y verifica tu primera tarea de programación. Aprende a usar reglas, reanudar sesiones y comprobar el estado de la beta.",
    "intro": "Muse Code es el agente de programación de Meta para terminal. Empieza con un repositorio pequeño que conozcas, pídele que lo inspeccione y comprueba su primer cambio con una prueba que puedas ejecutar tú. Esta guía recorre la instalación y la primera conversación que podrás retomar.",
    "socialImage": "/images/guides/muse-code-og-es.png",
    "ctaText": "El soporte de Muse está en pruebas beta para una próxima versión de CodeAgentSwarm. El botón descarga la app pública actual; consulta sus notas para comprobar la disponibilidad de Muse.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-22",
    "alternateSlug": "how-to-use-muse-code"
  },
  "sections": [
    {
      "id": "install",
      "title": "Instala Muse Code y comprueba su versión",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "En macOS o Linux, usa el instalador enlazado en la <a href=\"https://dev.meta.ai/docs/muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía oficial de Muse Code</a>. Después, comprueba la versión instalada antes de copiar comandos de un tutorial. Los ejemplos de esta guía se contrastaron con los comandos disponibles en Muse 1.3.0."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "curl -fsSL https://dev.meta.ai/install.sh | sh\nmuse --version\nmuse --help"
        },
        {
          "type": "paragraph",
          "text": "Usa un terminal normal con tu propia cuenta. Si no encuentra el comando tras instalarlo, abre un terminal nuevo para que reciba el PATH actualizado. Anota la versión cuando comuniques un fallo. Para los comandos nativos de PowerShell y las diferencias entre plataformas, consulta <a href=\"/es/guias/muse-code-en-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse Code en Windows</a>."
        }
      ]
    },
    {
      "id": "login",
      "title": "Abre un proyecto e inicia sesión",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "cd /ruta/a/tu/proyecto\nmuse --model muse-spark-1.3 --reasoning-effort medium"
        },
        {
          "type": "paragraph",
          "text": "Sustituye la ruta de ejemplo por la de tu proyecto. Elige el acceso con navegador que ofrece Muse o usa tu propia clave de la API de Meta. El comando interactivo <code>/login</code> vuelve a abrir la autenticación. Una clave existente puede tener prioridad sobre las credenciales del navegador; revisa la <a href=\"https://dev.meta.ai/docs/muse-code/auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">documentación de autenticación</a> si aparece otra cuenta o forma de facturación."
        },
        {
          "type": "paragraph",
          "text": "El modelo explícito permite repetir este ejemplo. Algunas páginas de configuración siguen indicando Spark 1.2 como predeterminado, mientras que el catálogo actual incluye 1.3. Comprueba el modelo mostrado en la sesión y consulta la <a href=\"/es/guias/muse-code-modelos-precios-privacidad\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de modelos, precios y privacidad</a> antes de cambiar de modalidad."
        }
      ]
    },
    {
      "id": "first-request",
      "title": "Haz una primera petición fácil de comprobar",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Lee README.md y la configuración de compilación del proyecto.\nExplica cómo arranca la aplicación e identifica un comando de tests\nque ya exista. Cita los archivos consultados. No edites archivos."
        },
        {
          "type": "paragraph",
          "text": "Elige un repositorio que conozcas. Si no tiene README, indica su punto de entrada o un archivo de configuración real. Compara la respuesta con los archivos del disco. El comando de tests debe existir en ese proyecto y corresponder al paquete que quieres cambiar. Una respuesta convincente no basta para darlo por válido."
        },
        {
          "type": "paragraph",
          "text": "Para la segunda petición, elige un defecto observable, como un mensaje de validación incorrecto. Describe la entrada que lo provoca y el resultado esperado. Pide a Muse que revise quién usa ese código, haga la corrección mínima y ejecute la comprobación adecuada. Revisa tú mismo <code>git diff</code> antes de aceptar el resultado. Esa tarea también servirá para comparar modelos más adelante."
        }
      ]
    },
    {
      "id": "project-rules",
      "title": "Añade instrucciones sin sustituir las reglas existentes",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "muse init --dry-run"
        },
        {
          "type": "paragraph",
          "text": "Examina primero las instrucciones propuestas. La simulación no crea ningún archivo. Si no existe <code>AGENTS.md</code> y la propuesta es correcta, ejecuta <code>muse init</code> y revisa el archivo generado. Si el repositorio ya contiene un <code>AGENTS.md</code>, lee y modifica ese archivo de forma deliberada. Conserva información útil: la carpeta del paquete, el comando de tests y una restricción concreta del proyecto. La <a href=\"https://dev.meta.ai/docs/muse-code/configuration\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de configuración y contexto</a> explica cómo carga Muse estos archivos."
        },
        {
          "type": "paragraph",
          "text": "Cuando Muse lo solicite, concede confianza al espacio de trabajo correcto. Esa decisión incluye las instrucciones y los hooks del proyecto. Escribir “no edites” expresa el alcance de tu petición, pero no cambia por sí solo el perfil de permisos. Consulta los <a href=\"https://dev.meta.ai/docs/muse-code/permissions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">permisos de Muse</a> cuando necesites restringir las herramientas a la lectura."
        }
      ]
    },
    {
      "id": "resume",
      "title": "Reanuda la tarea original y comprueba su estado",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "muse resume --last"
        },
        {
          "type": "paragraph",
          "text": "Ejecuta el comando desde el proyecto adecuado cuando vuelvas. Antes de pedir más cambios, explica qué ha ocurrido fuera de la conversación: una actualización de dependencias, un commit de otra persona o una edición manual. El historial no garantiza que los archivos actuales coincidan con lo que se habló antes."
        },
        {
          "type": "paragraph",
          "text": "Si interrumpes una edición, revisa el diff antes de enviar otra petición. Cancelar una respuesta no implica que todos los archivos sigan intactos. Pide al agente que explique el estado actual y continúa a partir de esa evidencia. La referencia de <a href=\"https://dev.meta.ai/docs/muse-code/interactive\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">controles interactivos</a> cubre la gestión y la interrupción de sesiones."
        }
      ]
    },
    {
      "id": "next",
      "title": "Cuando la primera tarea funcione",
      "content": [
        {
          "type": "paragraph",
          "text": "Mantén la configuración pequeña hasta tener una edición comprobada. Añade <a href=\"/es/guias/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">herramientas MCP, skills o workflows</a> cuando una tarea real lo requiera. Para repetir una revisión, conserva la petición exacta y su condición de aceptación; te permitirá comparar resultados entre sesiones."
        },
        {
          "type": "callout",
          "variant": "info",
          "content": "La integración de Muse se está probando para una próxima versión de CodeAgentSwarm. Sigue los pasos de la CLI independiente de esta guía y consulta las notas de versión antes de esperar soporte de Muse en la app descargada."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Muse Code ejecuta los modelos enteramente en mi ordenador?",
      "answer": "La CLI se ejecuta localmente y trabaja con archivos locales, pero las peticiones a Muse Spark usan el servicio alojado de Meta. Abrir un terminal local no hace que el modelo funcione sin conexión."
    },
    {
      "question": "¿Por qué se indica muse-spark-1.3 explícitamente?",
      "answer": "Así queda identificado el modelo del ejemplo aunque cambien los valores predeterminados o la documentación. Comprueba los modelos disponibles en tu cuenta antes de empezar una tarea real."
    },
    {
      "question": "¿Puedo empezar pidiendo que Muse reescriba todo el proyecto?",
      "answer": "Un cambio pequeño permite evaluar mejor el resultado. Verifica una edición y su test antes de ampliar el alcance, una vez que entiendas cómo funcionan los permisos, el contexto y la revisión."
    }
  ]
}

export default guide
