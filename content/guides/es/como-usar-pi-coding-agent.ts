import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'como-usar-pi-coding-agent',
    locale: 'es',
    title: 'Pi coding agent: instalación, login y primera tarea',
    metaTitle: 'Pi Coding Agent: instalación, login y primeros pasos',
    metaDescription: 'Aprende qué hace Pi coding agent, instala el paquete npm actual, conecta un modelo y retoma sesiones. Incluye Pi en CodeAgentSwarm 2.4.0.',
    intro: 'Pi es un agente de programación de terminal que conecta un modelo de lenguaje con los archivos y herramientas de tu proyecto. Tú eliges el proveedor; Pi gestiona la conversación y la ejecución de herramientas. Primero vamos a arrancar Pi y después veremos la integración de CodeAgentSwarm.',
    ctaText: 'Usa Pi con tu proveedor de modelos en CodeAgentSwarm 2.4.0. Descarga la app para macOS o Windows.',
    ctaAgent: 'pi',
    socialImage: '/images/guides/pi-coding-agent-og-es.png',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-24',
    alternateSlug: 'how-to-use-pi-coding-agent',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'Respuesta rápida',
      content: [
        {
          type: 'image',
          src: '/icons/apps/pi-icon.svg',
          alt: 'Pi coding agent',
          size: 'inline',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Instala Pi, ábrelo en tu proyecto, conecta un proveedor con /login y elige un modelo con /model. Después encárgale una tarea pequeña que puedas comprobar. En CodeAgentSwarm puedes trabajar con ese agente desde las vistas Chat y CLI.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Instalar Pi en macOS o Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Usa Node.js 22.19.0 o posterior para la versión de Pi verificada por CodeAgentSwarm, la 0.85.1. Comprueba las versiones de Node y npm antes de instalar el paquete actual. Algunos tutoriales antiguos utilizan el nombre anterior del paquete, @mariozechner.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'node --version\nnpm --version\nnpm install -g --ignore-scripts @earendil-works/pi-coding-agent\npi --version',
        },
        {
          type: 'paragraph',
          text: 'Ejecuta los comandos en un shell del sistema y abre Pi desde la carpeta de un proyecto. Para PowerShell y la herramienta de comandos, consulta la <a href="/es/guias/pi-coding-agent-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Windows</a>.',
        },
      ],
    },
    {
      id: 'first-task',
      title: 'Conectar un proveedor y probar una tarea pequeña',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: 'cd /ruta/a/tu/proyecto\npi',
        },
        {
          type: 'list',
          items: [
            'Dentro de Pi, escribe <code>/login</code> y completa el inicio de sesión del proveedor elegido.',
            'Escribe <code>/model</code> y elige un modelo al que tu cuenta tenga acceso.',
            'Empieza con una petición acotada: "Lee este proyecto y dime qué comando ejecuta sus pruebas. No cambies archivos".',
            'Para la siguiente tarea, pide un cambio concreto, revisa el diff y ejecuta la comprobación correspondiente.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El login con suscripción y una clave API pueden tener facturación distinta. Consulta la <a href="/es/guias/pi-coding-agent-modelos-suscripciones" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de modelos y suscripciones</a> antes de elegir proveedor.',
        },
      ],
    },
    {
      id: 'pi-in-action',
      title: 'Pi en CodeAgentSwarm, en imágenes',
      content: [
        {
          type: 'image',
          src: '/images/guides/pi-chat-beta.webp',
          alt: 'Pi en Chat de CodeAgentSwarm con un proyecto de ejemplo',
          size: 'full',
          caption: 'Captura real de CodeAgentSwarm beta en macOS: Pi ejecutándose con un proyecto de ejemplo. Pi está disponible desde CodeAgentSwarm 2.4.0.',
        },
        {
          type: 'paragraph',
          text: 'El selector muestra el modelo y su proveedor. Puedes revisar esa conexión sin salir del proyecto, mientras Chat conserva los mensajes y las herramientas de la tarea.',
        },
        {
          type: 'image',
          src: '/images/guides/pi-model-picker-beta.webp',
          alt: 'Selector de modelos de Pi con el proveedor OpenAI Codex',
          size: 'full',
          caption: 'Los modelos dependen de la cuenta conectada. Captura de la beta en macOS.',
        },
      ],
    },
    {
      id: 'practical-check',
      title: 'Una primera tarea que puedes comprobar',
      content: [
        {
          type: 'paragraph',
          text: 'Usa un repositorio pequeño que conozcas. Empieza pidiendo a Pi que lea el README y el manifiesto del paquete, identifique el comando de pruebas y explique el proyecto sin modificar archivos. Así compruebas que trabaja en la carpeta correcta antes de pedir cambios.',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Lee README.md y package.json. Explica qué hace este proyecto\ny cómo ejecutar sus pruebas en tres puntos breves. No cambies archivos.',
        },
        {
          type: 'paragraph',
          text: 'Después pide un cambio con una condición de aceptación, por ejemplo añadir una prueba para mover una tarea a Hecho. Revisa los archivos modificados y ejecuta el comando de pruebas real. Una respuesta terminada en Chat no equivale a unas pruebas correctas.',
        },
      ],
    },
    {
      id: 'what-is-pi',
      title: 'Qué es Pi y qué hace el harness',
      content: [
        {
          type: 'paragraph',
          text: 'Un harness proporciona el entorno de trabajo que rodea al modelo: conversación, contexto del proyecto y herramientas. En Pi, una petición puede llevar a leer archivos, editar código y ejecutar un comando. El resultado depende del modelo seleccionado y de las instrucciones y herramientas disponibles.',
        },
        {
          type: 'paragraph',
          text: 'Puedes ampliar Pi con skills, plantillas de prompts y extensiones. Su flujo integrado no incluye un modo plan nativo ni un gestor de subagentes. Esa diferencia importa al compararlo con <a href="/es/guias/pi-vs-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Presentación de Pi</a>.',
        },
      ],
    },
    {
      "id": "installation-check",
      "title": "¿No se encuentra Pi o aparece otra versión?",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "command -v pi\nnpm list -g --depth=0 @earendil-works/pi-coding-agent\nnpm config get prefix\npi --version"
        },
        {
          "type": "paragraph",
          "text": "Compara el paquete instalado con el comando Pi que resuelve tu terminal. Vuelve a abrir el terminal después de instalar. Un gestor de versiones de Node puede dejar el paquete global en una instalación mientras la terminal utiliza otra. Reinstala en el entorno activo solo después de comprobar esa diferencia."
        },
        {
          "type": "paragraph",
          "text": "Si Pi arranca pero falla la primera petición, lee el error del proveedor y sigue con <a href=\"/es/guias/pi-coding-agent-modelos-suscripciones\">acceso a modelos y autenticación</a>. Reinstalar la CLI no añade saldo a una cuenta de API."
        }
      ]
    },
    {
      id: 'history',
      title: 'Retomar una conversación o repartir el trabajo',
      content: [
        {
          type: 'paragraph',
          text: 'Pi guarda las sesiones en <code>~/.pi/agent/sessions/</code>. Usa su selector para retomar trabajo anterior sin pegar toda la conversación en un chat nuevo.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'pi -c\n# O elige una sesión anterior\npi -r',
        },
        {
          type: 'paragraph',
          text: 'Dos procesos de Pi pueden trabajar de forma independiente, pero si editan el mismo checkout comparten los archivos. Usa <a href="/es/guias/git-worktrees-para-agentes-de-ia" class="text-neon-cyan hover:text-neon-purple transition-colors">Git worktrees</a> separados cuando sus cambios puedan coincidir. Separar conversaciones no aísla el sistema de archivos.',
        },
      ],
    },
    {
      id: 'codeagentswarm-beta',
      title: 'Pi en CodeAgentSwarm: disponible en la 2.4.0',
      content: [
        {
          type: 'paragraph',
          text: '<strong>Pi está disponible en CodeAgentSwarm 2.4.0 para macOS y Windows.</strong> CodeAgentSwarm muestra Pi en Chat y CLI, con streaming, selección de modelo, decisiones de permisos, historial y reanudación.',
        },
        {
          type: 'paragraph',
          text: 'La integración usa el modo RPC nativo de Pi. En CodeAgentSwarm, inicia sesión desde su vista CLI y abre un nuevo Chat de Pi para cargar los modelos disponibles. Las credenciales existentes de Codex y Claude CLI no se copian a Pi.',
        },
        {
          type: 'paragraph',
          text: 'El mismo controlador se ha comprobado en el paquete de CAS Cloud. La autenticación pertenece al equipo que ejecuta Pi; configurar tu Mac no inicia sesión en un servidor remoto. Consulta <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">el protocolo RPC de Pi</a> para conocer la integración.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Pi es un modelo o un agente de programación?',
      answer: 'Pi es un agente de programación y un harness. Conectas un proveedor compatible y eliges el modelo que usa la sesión.',
    },
    {
      question: '¿Qué paquete npm debo instalar?',
      answer: 'Usa @earendil-works/pi-coding-agent. CodeAgentSwarm verificó Pi 0.85.1 con Node.js 22.19.0 o posterior.',
    },
    {
      question: '¿Puedo usar Pi hoy en la descarga pública de CodeAgentSwarm?',
      answer: 'Pi está incluido en CodeAgentSwarm 2.4.0 para macOS y Windows.',
    },
  ],
}

export default guide
