import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "muse-code-en-windows",
    "locale": "es",
    "title": "Muse Code en Windows: instalación y fallos de PowerShell",
    "metaTitle": "Muse Code en Windows: instalación y fallos de PowerShell",
    "metaDescription": "Instala Muse Code en Windows con PowerShell, comprueba el PATH e inicia sesión. Resuelve fallos de shell, sandbox y cuenta y conoce los límites actuales.",
    "intro": "Muse Code dispone de un instalador nativo para Windows. La primera comprobación útil es que PowerShell pueda abrir el comando instalado desde el proyecto que quieres editar. Separa la instalación, el login y la primera tarea para identificar la causa de cada fallo.",
    "socialImage": "/images/guides/muse-code-og-es.png",
    "ctaText": "El soporte de Muse está en pruebas beta para una próxima versión de CodeAgentSwarm. El botón descarga la app pública actual; consulta sus notas para comprobar la disponibilidad de Muse.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-22",
    "alternateSlug": "muse-code-on-windows"
  },
  "sections": [
    {
      "id": "install",
      "title": "Instala desde PowerShell",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Abre PowerShell con tu cuenta habitual de Windows y usa el <a href=\"https://dev.meta.ai/docs/muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">instalador oficial de Meta</a>. Estos comandos corresponden a PowerShell, no a Símbolo del sistema ni a Bash. Empieza por el instalador oficial antes de añadir scripts propios o copiar un ejecutable desde otro ordenador."
        },
        {
          "type": "code",
          "language": "powershell",
          "code": "irm https://dev.meta.ai/install.ps1 | iex\nmuse --version\nGet-Command muse -All"
        },
        {
          "type": "paragraph",
          "text": "La versión confirma que Muse arranca. <code>Get-Command</code> muestra cómo resuelve el shell su nombre. Si la instalación termina pero no encuentra el comando, abre otra ventana de PowerShell y repite ambas comprobaciones. Un terminal abierto antes de instalar puede conservar el PATH anterior. Comprueba primero qué comando encuentra antes de repetir la instalación."
        }
      ]
    },
    {
      "id": "path",
      "title": "Comprueba el ejecutable y la carpeta de trabajo",
      "content": [
        {
          "type": "code",
          "language": "powershell",
          "code": "Get-Command muse -All | Select-Object CommandType, Source\nGet-Location\nSet-Location \"C:\\src\\sample-project\"\nmuse --model muse-spark-1.3 --reasoning-effort medium"
        },
        {
          "type": "paragraph",
          "text": "Sustituye la ruta de ejemplo por un repositorio existente. Las comillas también permiten usar rutas con espacios. Si aparecen varios comandos de Muse, compara sus ubicaciones y versiones antes de borrar nada. Un script antiguo puede hacer que dos terminales parezcan ejecutar versiones distintas. La salida del comando permite comprobarlo directamente."
        },
        {
          "type": "paragraph",
          "text": "Abre la sesión desde el paquete que quieres revisar. Si el repositorio contiene varias aplicaciones, indica el subdirectorio en tu petición. Cuando Muse cite archivos, verifica que pertenecen a ese proyecto y no a otro con un nombre parecido en otra carpeta."
        }
      ]
    },
    {
      "id": "account",
      "title": "Comprueba la cuenta sin mostrar secretos",
      "content": [
        {
          "type": "paragraph",
          "text": "Completa el login con navegador de Muse en Windows. Usa <code>/login</code> dentro de la sesión interactiva para volver a abrirlo. Tener una sesión iniciada en un Mac no demuestra que Windows esté autenticado. Sigue el <a href=\"https://dev.meta.ai/docs/muse-code/auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">proceso oficial de autenticación</a> en cada ordenador."
        },
        {
          "type": "code",
          "language": "powershell",
          "code": "if (Test-Path Env:META_API_KEY) {\n  \"META_API_KEY existe en este proceso de PowerShell\"\n} else {\n  \"META_API_KEY no existe en este proceso de PowerShell\"\n}"
        },
        {
          "type": "paragraph",
          "text": "Esta comprobación indica si existe la variable sin enseñar su valor. Úsala si un login correcto parece seguir utilizando otra forma de facturación. Revisa dónde la define tu configuración del shell antes de cambiarla. Mantén las credenciales fuera de capturas, mensajes de soporte y archivos del repositorio. La guía de <a href=\"/es/guias/muse-code-modelos-precios-privacidad\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">facturación y privacidad</a> distingue el consumo de API del acceso por suscripción."
        }
      ]
    },
    {
      "id": "task",
      "title": "Pide comandos que funcionen en Windows",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Lee el README y la configuración de compilación del proyecto.\nIdentifica el comando de tests para Windows PowerShell.\nExplica qué pasos de configuración dependen de Bash. No edites archivos."
        },
        {
          "type": "paragraph",
          "text": "Si la respuesta propone <code>export</code> o una herramienta exclusiva de Unix, pide la alternativa de PowerShell y compárala con las instrucciones del proyecto para Windows. Que el lenguaje sea multiplataforma no garantiza que sus scripts también lo sean. Pueden depender de rutas Unix, reglas de comillas o ejecutables ausentes en este ordenador."
        },
        {
          "type": "paragraph",
          "text": "Para la siguiente tarea, elige un test que ya funcione en Windows. Conserva su salida antes de modificar código. Si aparece un fallo después, podrás distinguir una regresión de un problema previo del entorno. La <a href=\"/es/guias/como-usar-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de primeros pasos de Muse Code</a> desarrolla la secuencia completa de una primera sesión."
        }
      ]
    },
    {
      "id": "limits",
      "title": "Diferencias de Windows que afectan al uso",
      "content": [
        {
          "type": "table",
          "headers": [
            "Situación",
            "Qué comprobar"
          ],
          "rows": [
            [
              "Errores de sintaxis del shell",
              "Usa comandos de PowerShell y rutas entre comillas."
            ],
            [
              "Solicitud al iniciar el sandbox",
              "Confirma que la ventana de UAC corresponde a la instalación de Muse."
            ],
            [
              "Entrada de voz no disponible",
              "Escribe las peticiones en Windows."
            ],
            [
              "Sin mensajería entre sesiones",
              "Esta función de Muse está limitada a macOS y Linux."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Meta documenta una posible solicitud de UAC cuando se inicializa el sandbox de Windows. El uso normal no requiere un terminal de administrador. Investiga un fallo del sandbox como problema del entorno antes de cambiar los permisos. La <a href=\"https://dev.meta.ai/docs/muse-code/permissions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">referencia de permisos</a> describe sus límites y su arranque."
        },
        {
          "type": "paragraph",
          "text": "Los workflows también dependen de la versión instalada y de su despliegue. Comprueba qué comandos aparecen en <code>muse --help</code> antes de seguir un ejemplo. La <a href=\"/es/guias/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guía de MCP, skills y workflows</a> distingue las funciones no disponibles de las que están mal configuradas."
        }
      ]
    },
    {
      "id": "beta",
      "title": "Estado de Windows en CodeAgentSwarm",
      "content": [
        {
          "type": "callout",
          "variant": "info",
          "content": "El soporte de Muse se está preparando para una próxima versión de CodeAgentSwarm. Estos pasos corresponden a la CLI nativa oficial. Consulta las notas de la app pública para comprobar la disponibilidad de la integración en Windows; las pruebas beta no garantizan todas las funciones de Muse."
        },
        {
          "type": "paragraph",
          "text": "Para comunicar un problema, incluye la versión de Muse, la arquitectura de Windows, la ruta resuelta del comando y el error exacto. Indica si ocurrió antes del login, al iniciar el sandbox o tras enviar una petición. Ese informe permite reproducirlo sin exponer tu cuenta ni el contenido del proyecto."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "¿Necesito WSL para instalar Muse Code?",
      "answer": "El instalador oficial permite usar Windows de forma nativa con PowerShell. Una instalación dentro de WSL corresponde a otro entorno Linux y conviene diagnosticarla por separado."
    },
    {
      "question": "¿Por qué funciona Muse en un terminal y en otro no?",
      "answer": "Compara la salida de Get-Command y vuelve a abrir el terminal antiguo. Un PATH distinto, perfiles diferentes o varios scripts instalados pueden cambiar el ejecutable que arranca."
    },
    {
      "question": "¿El soporte nativo de Windows incluye voz y mensajes entre sesiones?",
      "answer": "No. Meta documenta actualmente ambas funciones como no disponibles en Windows. Usa peticiones escritas y comprueba la compatibilidad antes de organizar trabajo que dependa de mensajes entre sesiones."
    }
  ]
}

export default guide
