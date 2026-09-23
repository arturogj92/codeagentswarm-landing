import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'pi-vs-opencode',
    locale: 'es',
    title: 'Pi vs OpenCode: modelos, herramientas, permisos e integración',
    metaTitle: 'Pi vs OpenCode: diferencias entre los agentes',
    metaDescription: 'Compara Pi y OpenCode por modelos, modo plan, permisos, MCP y protocolo de integración. Elige un flujo de programación sin confundir agentes con modelos.',
    intro: 'Pi y OpenCode pueden resolver el mismo tipo de tareas y conectarse a proveedores de modelos similares. Sus diferencias están en el flujo de trabajo que rodea al modelo. Esta comparación separa el acceso al modelo de la planificación, las herramientas y la integración.',
    ctaText: 'El soporte de Pi en CodeAgentSwarm está en pruebas beta. La descarga corresponde a la app pública actual; consulta sus notas de versión para comprobar la disponibilidad de Pi.',
    ctaAgent: 'pi',
    socialImage: '/images/guides/pi-coding-agent-og-es.png',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-22',
    alternateSlug: 'pi-vs-opencode',
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
          content: 'Pi ofrece una base pequeña que puedes ampliar; OpenCode incluye flujos de planificación y subagentes. Ambos conectan con distintos proveedores de modelos. Elige por el flujo que necesitas y compara una tarea real con la misma conexión al modelo.',
        },
      ],
    },
    {
      "id": "which-should-you-choose",
      "title": "Pi u OpenCode: ¿cuál elegir?",
      "content": [
        {
          "type": "paragraph",
          "text": "Elige Pi si quieres una configuración pequeña y estás dispuesto a añadir los flujos que necesites. Valora OpenCode si tu primera tarea ya requiere su agente Plan, subagentes o configuración MCP. Ninguna de esas diferencias demuestra qué modelo escribirá mejor código para tu proyecto."
        },
        {
          "type": "table",
          "headers": [
            "Tu necesidad inmediata",
            "Empieza por valorar",
            "Qué comprobar"
          ],
          "rows": [
            [
              "Entender un repositorio y arreglar un fallo concreto",
              "Cualquiera",
              "El mismo proveedor, modelo y pruebas del proyecto."
            ],
            [
              "Planificar antes de modificar archivos",
              "OpenCode",
              "Qué cambios y comandos permite Plan con tu configuración."
            ],
            [
              "Crear una herramienta o flujo propio",
              "Pi",
              "El código de la extensión, sus permisos y su mantenimiento."
            ],
            [
              "Conectar un servicio MCP existente",
              "OpenCode",
              "La autenticación del servidor y las herramientas que expone."
            ],
            [
              "Usar Pi desde un chat de escritorio",
              "CodeAgentSwarm beta",
              "La disponibilidad en la release y los límites documentados de la integración."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Usa esta tabla para elegir qué probar y comprueba el flujo que te importa. Instalar diez extensiones para reproducir una función que ya utilizas tiene un coste; adoptar un flujo más grande que nunca necesitas también."
        }
      ]
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
          caption: 'Captura real de CodeAgentSwarm beta en macOS: Pi ejecutándose con un proyecto de ejemplo. La imagen no anuncia disponibilidad en la descarga pública.',
        },
        {
          type: 'paragraph',
          text: 'El selector muestra el modelo y su proveedor. Puedes revisar esa conexión sin salir del proyecto, mientras Chat conserva los mensajes y las herramientas de la tarea.',
        },
      ],
    },
    {
      id: 'practical-check',
      title: 'Compararlos con una tarea concreta',
      content: [
        {
          type: 'list',
          items: [
            'Crea un worktree para Pi y otro para OpenCode desde el mismo commit.',
            'Usa el mismo proveedor y modelo cuando ambos admitan esa conexión.',
            'Da a ambos la misma condición de aceptación, como arreglar una prueba que falla sin cambiar la API pública.',
            'Compara el diff, los resultados de las pruebas, las aprobaciones y las correcciones que has tenido que pedir.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Anota las diferencias de permisos y herramientas junto al resultado. Si un agente dispone de instrucciones adicionales o de un servicio MCP que el otro no tiene, describe esa diferencia antes de atribuir el resultado al agente.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Pi y OpenCode de un vistazo',
      content: [
        {
          type: 'table',
          headers: [
            'Aspecto',
            'Pi',
            'OpenCode',
          ],
          rows: [
            [
              'Elección de modelo',
              'Varios proveedores, login con suscripción y conexiones API.',
              'Varios proveedores y modelos configurables.',
            ],
            [
              'Planificación y subagentes',
              'Las extensiones pueden añadir flujos; no son funciones nativas por defecto.',
              'Agentes Build y Plan integrados, además de subagentes.',
            ],
            [
              'Integración',
              'RPC nativo y un SDK.',
              'Integración ACP documentada.',
            ],
            [
              'MCP',
              'Mediante extensiones; CAS gestiona un puente limitado a Swarm.',
              'Configuración nativa de servidores MCP.',
            ],
            [
              'Permisos de herramientas',
              'En Chat de CAS beta, la extensión gestionada pide aprobación.',
              'Reglas configurables de permitir, preguntar y denegar.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Consulta la <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">presentación oficial de Pi</a>, los <a href="https://opencode.ai/docs/agents/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">agentes de OpenCode</a> y sus <a href="https://opencode.ai/docs/permissions/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">permisos</a>. La disponibilidad depende de la versión y configuración que ejecutes.',
        },
      ],
    },
    {
      id: 'same-model',
      title: 'El mismo modelo no hace idénticos a los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Un agente decide qué contexto enviar y expone las herramientas que el modelo puede utilizar. Aunque ambos menús contengan el mismo modelo, pueden cambiar el prompt, las herramientas, los permisos y el historial. Compáralos con una tarea pequeña en checkouts separados y revisa el diff y las pruebas.',
        },
        {
          type: 'paragraph',
          text: 'Usa la misma conexión de proveedor si quieres comparar el comportamiento de los agentes. Elegir una pasarela en uno y una suscripción en otro cambia más cosas que el harness. La <a href="/es/guias/pi-coding-agent-modelos-suscripciones" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de modelos y suscripciones de Pi</a> explica la etiqueta del proveedor y el inicio de sesión independiente.',
        },
      ],
    },
    {
      id: 'protocol',
      title: '¿Pi tiene ACP como OpenCode?',
      content: [
        {
          type: 'paragraph',
          text: 'La interfaz nativa de Pi entre procesos es <code>pi --mode rpc</code>, con líneas JSON para comandos y eventos. La beta de Pi en CodeAgentSwarm se conecta a esa interfaz. No arranca un adaptador ACP. OpenCode documenta por separado <code>opencode acp</code> para clientes ACP.',
        },
        {
          type: 'paragraph',
          text: 'Para integrar un agente, comprueba los comandos y eventos que necesitas: streaming, cambios de modelo, preguntas, aprobación de herramientas y reanudación. El nombre del protocolo no demuestra que todo funcione igual. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Referencia RPC de Pi</a>; <a href="https://opencode.ai/docs/acp/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">referencia ACP de OpenCode</a>.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Extensiones y límites de los permisos',
      content: [
        {
          type: 'paragraph',
          text: 'OpenCode tiene <a href="https://opencode.ai/docs/mcp-servers/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">configuración nativa de servidores MCP</a>. Pi puede añadir funciones mediante extensiones. En CAS beta, su extensión gestionada conecta únicamente el servidor MCP propio de Swarm y conserva la configuración ajena. Eso no significa que importe todos los servidores MCP personalizados a Pi.',
        },
        {
          type: 'paragraph',
          text: 'Chat de CAS beta aplica a las peticiones de Pi sus opciones manual, aprobación automática de ediciones y acceso completo. La vista CLI conserva el comportamiento propio de Pi. Estas aprobaciones no son un sandbox del sistema operativo. Si necesitas un entorno restringido, proporciónalo aparte.',
        },
      ],
    },
    {
      id: 'choose',
      title: '¿Qué flujo encaja con tu proyecto?',
      content: [
        {"type": "paragraph", "text": "Si también estás valorando el agente de Meta, la <a href=\"/es/guias/como-usar-muse-code\">guía de Muse Code</a> explica su cuenta y primera tarea. Decide si necesitas probarlo antes de ampliar la comparación entre Pi y OpenCode."},
        {
          type: 'list',
          items: [
            'Elige una configuración pequeña de Pi si quieres seleccionar proveedor y adaptar el trabajo con unas pocas extensiones.',
            'Evalúa OpenCode si la planificación integrada, los subagentes o la configuración MCP nativa son centrales para tu trabajo.',
            'Aísla los archivos cuando compares agentes sobre una misma tarea y revisa sus cambios, no solo el mensaje final.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Empieza por la <a href="/es/guias/como-usar-pi-coding-agent" class="text-neon-cyan hover:text-neon-purple transition-colors">instalación de Pi</a> o la <a href="/es/guias/enjambre-de-agentes-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de trabajo con OpenCode</a>. <strong>Pi en CodeAgentSwarm sigue en pruebas beta. Consulta las notas de versión para conocer su disponibilidad.</strong>',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Pi es un proveedor de modelos de OpenCode?',
      answer: 'No. Pi y OpenCode son agentes de programación separados. Ambos pueden conectarse a proveedores de modelos; el menú de proveedores no es el agente.',
    },
    {
      question: '¿CodeAgentSwarm conecta Pi mediante ACP?',
      answer: 'No. La beta de Pi usa su interfaz nativa RPC entre procesos. OpenCode tiene su propia interfaz ACP documentada.',
    },
    {
      question: '¿Cuál produce mejor código?',
      answer: 'Aquí no se establece un resultado universal. Compara una tarea definida con el mismo acceso al modelo, worktrees separados, revisión del diff y las pruebas del proyecto.',
    },
  ],
}

export default guide
