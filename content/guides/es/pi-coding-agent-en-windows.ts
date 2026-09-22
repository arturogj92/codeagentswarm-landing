import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'pi-coding-agent-en-windows',
    locale: 'es',
    title: 'Usar Pi coding agent en Windows: instalación y PowerShell',
    metaTitle: 'Pi Coding Agent en Windows: instalación y PowerShell',
    metaDescription: 'Instala Pi coding agent en Windows, elige Git Bash o la herramienta PowerShell, resuelve problemas de PATH y conoce el funcionamiento de Pi en CAS beta.',
    intro: 'Pi funciona en Windows, pero el terminal desde el que lo abres y el shell que utiliza su modelo son elecciones distintas. Esta guía cubre la instalación y la herramienta PowerShell, y explica el comportamiento verificado en la beta de Windows de CodeAgentSwarm.',
    ctaText: 'El soporte de Pi en CodeAgentSwarm está en pruebas beta. La descarga corresponde a la app pública actual; consulta sus notas de versión para comprobar la disponibilidad de Pi.',
    ctaAgent: 'pi',
    socialImage: '/images/guides/pi-coding-agent-og-es.png',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-22',
    alternateSlug: 'pi-coding-agent-on-windows',
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
          content: 'Pi funciona en Windows nativo. Instala el paquete npm actual y elige Git Bash o configura su herramienta PowerShell. En Chat de CodeAgentSwarm beta, la integración selecciona la herramienta PowerShell nativa para Windows.',
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
          caption: 'Captura real de CodeAgentSwarm beta en macOS: Pi ejecutándose con un proyecto de ejemplo. La imagen no anuncia disponibilidad en la descarga pública. Se muestra la interfaz Chat; no es una captura de Windows.',
        },
        {
          type: 'paragraph',
          text: 'El selector muestra el modelo y su proveedor. Puedes revisar esa conexión sin salir del proyecto, mientras Chat conserva los mensajes y las herramientas de la tarea.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Instalar el paquete actual de Pi',
      content: [
        {
          type: 'paragraph',
          text: 'Para la versión verificada por CodeAgentSwarm, Pi 0.85.1, usa Node.js 22.19.0 o posterior. Abre PowerShell y comprueba Node y npm antes de instalar. No necesitas empezar en un terminal con permisos elevados de administrador.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: 'node --version\nnpm --version\nnpm install -g --ignore-scripts @earendil-works/pi-coding-agent\npi --version',
        },
        {
          type: 'paragraph',
          text: 'Si el comando no aparece después de instalar, vuelve a abrir el terminal antes de cambiar ajustes del sistema. La <a href="/es/guias/como-usar-pi-coding-agent" class="text-neon-cyan hover:text-neon-purple transition-colors">guía general de Pi</a> explica cómo empezar con tu proyecto y una sesión.',
        },
      ],
    },
    {
      id: 'shell',
      title: 'Ventana de PowerShell y herramienta de comandos del modelo',
      content: [
        {
          type: 'paragraph',
          text: 'Arrancar Pi desde PowerShell no sustituye automáticamente su herramienta <code>bash</code>. La configuración documentada por defecto en Windows utiliza Git Bash. Si quieres Bash, instala Git for Windows. Si prefieres comandos nativos de PowerShell, Pi admite una herramienta <code>powershell</code>.',
        },
        {
          type: 'paragraph',
          text: 'Incorpora este ajuste a <code>~/.pi/agent/settings.json</code> conservando los demás ajustes. El directorio <code>~</code> es tu perfil de usuario de Windows.',
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "defaultTools": ["read", "powershell", "edit", "write"]\n}',
        },
        {
          type: 'paragraph',
          text: 'La herramienta usa <code>pwsh.exe</code> si está disponible y, en caso contrario, Windows PowerShell. Los atajos interactivos <code>!</code> y <code>!!</code> de Pi siguen usando Bash. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/windows.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Configuración oficial de Windows</a>.',
        },
      ],
    },
    {
      id: 'login',
      title: 'Iniciar sesión y verificar una tarea pequeña',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: 'Set-Location C:\\ruta\\al\\proyecto\npi',
        },
        {
          type: 'list',
          items: [
            'Dentro de Pi, escribe <code>/login</code> y conecta tu proveedor.',
            'Usa <code>/model</code> para elegir un modelo al que tu cuenta tenga acceso.',
            'Pídele que liste los archivos del proyecto con la herramienta de shell seleccionada.',
            'Antes de encargar ediciones, pregunta qué comando de pruebas define el proyecto y comprueba la respuesta.',
          ],
        },
        {
          type: 'paragraph',
          text: 'El proveedor determina el acceso a modelos y la facturación. Consulta <a href="/es/guias/pi-coding-agent-modelos-suscripciones" class="text-neon-cyan hover:text-neon-purple transition-colors">las suscripciones y modelos de Pi</a> para conectar ChatGPT, Claude o una API.',
        },
      ],
    },
    {
      id: 'practical-check',
      title: 'Comprobar el shell de Windows antes de editar',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: 'Get-Command pi -All\nnode --version\npi --version',
        },
        {
          type: 'paragraph',
          text: 'Dentro de Pi, pide que muestre el directorio de trabajo y liste los archivos con la herramienta de comandos elegida. Revisa el nombre de la herramienta y su salida. Después pide que lea el script de pruebas antes de ejecutar algo que modifique archivos.',
        },
        {
          type: 'paragraph',
          text: 'Si cambias a WSL, trátalo como otro entorno: su directorio personal, el comando Pi instalado y las credenciales pueden ser diferentes a los de Windows nativo. Elige el entorno que utiliza el proyecto y completa allí la configuración.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Resolver problemas de comandos y rutas',
      content: [
        {
          type: 'list',
          items: [
            '<strong>No se reconoce Pi:</strong> ejecuta <code>Get-Command pi -All</code> y <code>npm config get prefix</code>. Confirma que la carpeta de comandos npm pertenece a esta instalación y está en PATH.',
            '<strong>Falta Bash:</strong> elige Git Bash o configura la herramienta PowerShell. Abrir un terminal PowerShell no cambia la herramienta predeterminada de Pi.',
            '<strong>Instalación equivocada:</strong> varias instalaciones de Node pueden exponer comandos Pi distintos. Comprueba la ruta resuelta antes de iniciar sesión o actualizar.',
            '<strong>El proyecto espera Linux:</strong> utiliza un entorno Linux adecuado, como WSL. Mantén juntos su instalación de Pi, configuración y archivos.',
          ],
        },
        {
          type: 'paragraph',
          text: 'No resuelvas la instalación de un agente relajando globalmente la política de ejecución del equipo. Usa la configuración documentada de herramientas y revisa primero el error concreto.',
        },
      ],
    },
    {
      id: 'cas-windows',
      title: 'Qué hace la beta de Windows de CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<strong>El soporte de Pi está en pruebas beta y todavía no se ha anunciado para la descarga pública estándar.</strong> En la integración Chat comprobada, la extensión gestionada selecciona la herramienta PowerShell nativa de Pi en Windows. La ejecución de herramientas en Chat no necesita Git Bash.',
        },
        {
          type: 'paragraph',
          text: 'La vista CLI de CAS conserva el comportamiento del terminal de Pi. La verificación beta utilizó un proceso real de Pi en Windows 11 ARM64 con un endpoint de modelo local para comprobar comandos, aprobación y rechazo, diffs de ediciones y reanudación. Eso verifica los flujos ejecutados, no la disponibilidad de todos los proveedores externos.',
        },
        {
          type: 'paragraph',
          text: 'Para comparar flujos de trabajo en lugar de instalaciones, continúa con <a href="/es/guias/pi-vs-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi vs OpenCode</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Necesito WSL para ejecutar Pi en Windows?',
      answer: 'No para el uso nativo. Elige la configuración documentada de Git Bash o la herramienta PowerShell de Pi. Usa WSL si el propio proyecto necesita Linux.',
    },
    {
      question: '¿Abrir Pi desde PowerShell hace que sus comandos usen PowerShell?',
      answer: 'No. Configura la herramienta powershell en Pi independiente. En Chat de CAS beta, la extensión gestionada la selecciona en Windows.',
    },
    {
      question: '¿Está probado el soporte de Windows en CodeAgentSwarm?',
      answer: 'La integración beta de Pi se comprobó con Pi real en Windows 11 ARM64, incluyendo comandos, permisos y reanudación. Su disponibilidad en la descarga pública es una decisión de lanzamiento aparte.',
    },
  ],
}

export default guide
