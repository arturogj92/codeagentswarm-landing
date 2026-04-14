import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'mejores-servidores-mcp-claude-code',
    locale: 'es',
    title: 'Los mejores servidores MCP para Claude Code: Top 10 integraciones imprescindibles',
    metaTitle: 'Los mejores servidores MCP para Claude Code: 10 integraciones imprescindibles (2026)',
    metaDescription: 'Los mejores servidores MCP para Claude Code: GitHub, Notion, Slack, Supabase, Playwright, PostgreSQL y más. Qué hace cada uno, por qué lo necesitas y cómo configurarlo.',
    intro: `Los servidores MCP son lo que convierte a Claude Code de un editor de código inteligente en una herramienta de desarrollo completamente conectada. Sin ellos, Claude puede leer tus archivos y ejecutar comandos en la terminal. Con servidores MCP, puede crear pull requests, consultar bases de datos, automatizar navegadores, buscar en la web y comunicarse con casi cualquier servicio que uses.

El problema es saber qué servidores MCP merece la pena instalar. Hay decenas disponibles, y configurarlos manualmente implica editar archivos JSON y reiniciar Claude Code cada vez.

Esta guía cubre los 10 servidores MCP más importantes para el desarrollo del día a día, qué hace cada uno y la forma más sencilla de gestionarlos todos.`,
    ctaText: 'Configura servidores MCP de forma visual con el MCP Marketplace de CodeAgentSwarm. Activa integraciones por proyecto con un solo clic.',
    highlightedWords: ['servidores MCP', 'Claude Code'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'best-mcp-servers-claude-code',
  },
  sections: [
    {
      id: 'que-son-los-servidores-mcp',
      title: 'Qué son los servidores MCP y por qué importan',
      content: [
        {
          type: 'paragraph',
          text: 'MCP significa <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Model Context Protocol</a>. Es un estándar abierto creado por Anthropic que permite a herramientas de IA como Claude Code conectarse a servicios externos y fuentes de datos a través de una interfaz unificada.',
        },
        {
          type: 'paragraph',
          text: 'Por defecto, Claude Code puede leer y escribir archivos en tu proyecto y ejecutar comandos de terminal. Eso ya es potente de por sí, pero significa que Claude está limitado a lo que ya tienes en tu máquina. Los servidores MCP eliminan esa limitación.',
        },
        {
          type: 'paragraph',
          text: 'Cada servidor MCP actúa como un puente entre Claude Code y una herramienta externa. Instala el servidor MCP de GitHub y Claude puede crear pull requests. Instala el de Supabase y Claude puede ejecutar migraciones de base de datos. Instala el de Playwright y Claude puede automatizar un navegador para probar tu frontend.',
        },
        {
          type: 'list',
          items: [
            '<strong>Sin MCP:</strong> Claude lee archivos, escribe código, ejecuta comandos de terminal',
            '<strong>Con MCP:</strong> Claude interactúa con GitHub, bases de datos, navegadores, APIs, plataformas de documentación, motores de búsqueda y más',
          ],
        },
        {
          type: 'paragraph',
          text: 'MCP es compatible con Claude Code, Codex CLI y un número creciente de herramientas de desarrollo con IA. Los servidores suelen ser open source y se ejecutan localmente en tu máquina, conectándose a los servicios con tus propias credenciales. Puedes explorar el catálogo completo de servidores disponibles en el <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">repositorio oficial de servidores MCP</a>.',
        },
      ],
    },
    {
      id: 'top-10-servidores-mcp',
      title: 'Los 10 mejores servidores MCP para Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Estos son los servidores MCP que marcan la mayor diferencia en el desarrollo del día a día. Cada uno conecta Claude Code a un servicio que probablemente ya usas.',
        },
        {
          type: 'heading',
          level: 3,
          text: '1. GitHub MCP',
          id: 'github-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de GitHub da a Claude Code acceso completo a tus flujos de trabajo en GitHub. Puede crear y revisar pull requests, abrir y gestionar issues, leer contenido de repositorios, navegar ramas y comentar código. Si tu equipo usa GitHub para code review y gestión de proyectos, este es el primer servidor MCP que deberías instalar.',
        },
        {
          type: 'list',
          items: [
            'Crear PRs con títulos, descripciones y revisores',
            'Leer y comentar pull requests existentes',
            'Abrir, etiquetar y cerrar issues',
            'Explorar archivos y ramas del repositorio sin necesidad de clonar',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Equipos que usan GitHub para code review, seguimiento de issues y gestión de proyectos.',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Supabase MCP',
          id: 'supabase-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Supabase conecta Claude Code directamente a tu proyecto de Supabase. Puede ejecutar consultas SQL, aplicar migraciones de base de datos, inspeccionar esquemas, gestionar Edge Functions y revisar logs, todo sin salir de tu editor.',
        },
        {
          type: 'list',
          items: [
            'Ejecutar consultas SQL e inspeccionar resultados',
            'Aplicar migraciones de esquema de forma segura',
            'Desplegar y gestionar Edge Functions',
            'Consultar los advisors de la base de datos para rendimiento y seguridad',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Proyectos que usan Supabase como backend y capa de base de datos.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Playwright MCP',
          id: 'playwright-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Playwright le da a Claude Code la capacidad de controlar un navegador real. Puede navegar páginas, hacer clic en elementos, rellenar formularios, tomar capturas de pantalla y ejecutar tests end-to-end. Es muy valioso para desarrollo frontend donde necesitas que Claude verifique que los cambios de UI realmente funcionan.',
        },
        {
          type: 'list',
          items: [
            'Automatizar interacciones del navegador para testing',
            'Tomar capturas de pantalla de páginas y componentes',
            'Rellenar formularios, hacer clic en botones y navegar flujos',
            'Extraer contenido web para obtención de datos',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Testing de frontend, verificación visual y tareas de web scraping.',
        },
        {
          type: 'heading',
          level: 3,
          text: '4. PostgreSQL MCP',
          id: 'postgresql-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de PostgreSQL conecta Claude Code directamente a cualquier base de datos PostgreSQL. Puede ejecutar consultas, inspeccionar esquemas de tablas, analizar datos y ayudar a depurar problemas relacionados con datos. A diferencia del MCP de Supabase, que es específico para proyectos de Supabase, este funciona con cualquier instancia de Postgres.',
        },
        {
          type: 'list',
          items: [
            'Ejecutar consultas SELECT para analizar datos',
            'Inspeccionar esquemas de tablas y relaciones',
            'Depurar problemas de datos sin cambiar a un cliente de base de datos',
            'Generar informes a partir de consultas de base de datos',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Depuración de problemas de datos, generación de informes y trabajo con cualquier base de datos PostgreSQL.',
        },
        {
          type: 'heading',
          level: 3,
          text: '5. Notion MCP',
          id: 'notion-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Notion permite a Claude Code leer y escribir páginas y bases de datos de Notion. Puede crear páginas de documentación, actualizar docs existentes, buscar en todo tu workspace y mantener la documentación de tu proyecto sincronizada con los cambios de código.',
        },
        {
          type: 'list',
          items: [
            'Crear y actualizar páginas de Notion automáticamente',
            'Buscar en todo tu workspace de Notion',
            'Consultar bases de datos de Notion para datos del proyecto',
            'Mantener la documentación sincronizada con los cambios de código',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Equipos que usan Notion para documentación, bases de conocimiento y gestión de proyectos.',
        },
        {
          type: 'heading',
          level: 3,
          text: '6. Slack MCP',
          id: 'slack-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Slack permite a Claude Code enviar mensajes, leer canales y publicar actualizaciones en tu workspace de Slack. Puedes usarlo para notificar a tu equipo cuando terminan los despliegues, publicar actualizaciones de estado o traer contexto de las conversaciones de Slack a tu flujo de desarrollo.',
        },
        {
          type: 'list',
          items: [
            'Enviar mensajes a canales e hilos',
            'Leer historial de canales para contexto',
            'Publicar notificaciones automáticas de despliegue o build',
            'Buscar en Slack conversaciones relevantes',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Flujos de trabajo en equipo, actualizaciones de estado automáticas y mantener la comunicación sincronizada con el desarrollo.',
        },
        {
          type: 'heading',
          level: 3,
          text: '7. Brave Search MCP',
          id: 'brave-search-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Brave Search le da a Claude Code la capacidad de buscar en la web. Esto es sorprendentemente útil, porque significa que Claude puede consultar documentación actualizada, revisar referencias de APIs, investigar mensajes de error y encontrar soluciones más recientes que sus datos de entrenamiento.',
        },
        {
          type: 'list',
          items: [
            'Buscar documentación actualizada y referencias de APIs',
            'Investigar mensajes de error y stack traces',
            'Encontrar las versiones más recientes de librerías y herramientas',
            'Buscar soluciones recientes a problemas comunes',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Depuración con información actualizada e investigación de APIs más allá de los datos de entrenamiento de Claude.',
        },
        {
          type: 'heading',
          level: 3,
          text: '8. Filesystem MCP',
          id: 'filesystem-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Filesystem amplía las operaciones de archivos de Claude Code más allá de las capacidades por defecto. Proporciona listado avanzado de directorios, vigilancia de archivos, operaciones recursivas y control detallado sobre permisos y metadatos de archivos.',
        },
        {
          type: 'list',
          items: [
            'Recorrido y listado avanzado de directorios',
            'Operaciones masivas de archivos entre directorios',
            'Vigilancia de cambios en archivos',
            'Controles de acceso detallados para gestión segura de archivos',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Operaciones masivas de archivos, trabajo entre directorios y proyectos con estructuras de archivos complejas.',
        },
        {
          type: 'heading',
          level: 3,
          text: '9. Puppeteer MCP',
          id: 'puppeteer-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Puppeteer proporciona control de navegador headless a través de la librería Puppeteer de Google. Es más ligero que Playwright e ideal para tareas rápidas de navegador como tomar capturas de pantalla, generar PDFs y automatización web sencilla sin la sobrecarga de un framework de testing completo.',
        },
        {
          type: 'list',
          items: [
            'Tomar capturas de pantalla de páginas web',
            'Generar PDFs a partir de contenido HTML',
            'Automatizar interacciones sencillas del navegador',
            'Evaluar JavaScript en un contexto de navegador',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Tareas rápidas de navegador, generación de capturas de pantalla y automatización ligera sin la configuración completa de Playwright.',
        },
        {
          type: 'heading',
          level: 3,
          text: '10. Google Drive MCP',
          id: 'google-drive-mcp',
        },
        {
          type: 'paragraph',
          text: 'El servidor MCP de Google Drive conecta Claude Code a tu Google Workspace. Puede leer y escribir Google Docs, interactuar con Sheets y gestionar archivos en Drive. Es útil para equipos que guardan especificaciones, notas de reuniones o datos en Google Workspace.',
        },
        {
          type: 'list',
          items: [
            'Leer contenido de Google Docs y Sheets',
            'Crear y actualizar documentos de forma programática',
            'Buscar y gestionar archivos en Google Drive',
            'Extraer datos de Sheets para análisis o generación de código',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Ideal para:</strong> Equipos que usan Google Workspace para documentación, especificaciones y gestión de datos.',
        },
      ],
    },
    {
      id: 'como-instalar',
      title: 'Cómo instalar servidores MCP',
      content: [
        {
          type: 'paragraph',
          text: 'La forma nativa de configurar servidores MCP en Claude Code es editando un archivo de configuración JSON. Añades cada servidor con su comando, argumentos y las variables de entorno que necesite.',
        },
        {
          type: 'paragraph',
          text: 'El archivo de configuración se encuentra en <code>~/.claude/claude_desktop_config.json</code>. Aquí tienes un ejemplo que configura los servidores MCP de GitHub y Brave Search:',
        },
        {
          type: 'code',
          language: 'json',
          code: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your_api_key_here"
      }
    }
  }
}`,
        },
        {
          type: 'paragraph',
          text: 'Después de editar la configuración, necesitas reiniciar Claude Code para que los cambios surtan efecto. Cada servidor MCP puede requerir distintas credenciales o API keys, que tendrás que obtener del servicio correspondiente.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Este enfoque manual funciona, pero puede resultar tedioso cuando gestionas múltiples servidores MCP en diferentes proyectos. Cada servidor tiene sus propios requisitos de configuración, y no hay una forma integrada de activar distintos servidores para distintos proyectos.',
        },
      ],
    },
    {
      id: 'mcp-codeagentswarm',
      title: 'Gestionar servidores MCP con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> incluye un MCP Marketplace que reemplaza el flujo manual de configuración JSON por una interfaz visual para gestionar todos tus servidores MCP.',
        },
        {
          type: 'paragraph',
          text: 'En vez de editar archivos de configuración y reiniciar Claude Code, navegas un catálogo de servidores MCP disponibles, activas los que necesitas y los configuras con unos pocos clics. Todo surte efecto inmediatamente sin reiniciar.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Gestión visual de servidores MCP',
          id: 'gestion-visual-mcp',
        },
        {
          type: 'paragraph',
          text: 'El MCP Marketplace muestra todos los servidores disponibles con descripciones de lo que hace cada uno. Activa o desactiva cualquier servidor con un toggle. Configura API keys y credenciales a través de la interfaz en lugar de buscar la sintaxis JSON correcta.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Configuración MCP por proyecto',
          id: 'configuracion-mcp-por-proyecto',
        },
        {
          type: 'paragraph',
          text: 'Cada proyecto necesita servidores MCP diferentes. Tu proyecto de frontend puede necesitar Playwright para testing, mientras que tu proyecto de backend necesita Supabase y PostgreSQL. CodeAgentSwarm te permite configurar qué servidores MCP están activos para cada proyecto de forma independiente. Se acabaron las configuraciones globales que cargan servidores innecesarios.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Control de permisos por herramienta',
          id: 'permisos-por-herramienta',
        },
        {
          type: 'paragraph',
          text: 'Cada servidor MCP expone múltiples herramientas. El servidor de GitHub, por ejemplo, tiene herramientas para crear PRs, leer repos, gestionar issues y más. CodeAgentSwarm te da control granular sobre cada herramienta individual con tres niveles de permisos: Allow (se ejecuta automáticamente), Ask (requiere confirmación) y Deny (bloqueado completamente).',
        },
        {
          type: 'image',
          alt: 'Panel de permisos MCP en CodeAgentSwarm mostrando servidores y controles de permisos por herramienta',
          src: '/images/guides/mcp-permissions-modal.png',
          caption: 'Configura permisos por herramienta - Allow, Ask o Deny - para tener control total sobre lo que puede hacer cada servidor MCP.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Esto significa que puedes dejar que Claude lea issues de GitHub automáticamente pero pedir confirmación antes de crear pull requests. O permitir consultas SELECT en Supabase libremente pero preguntar antes de ejecutar migraciones. Mantienes el control sin perder la velocidad de la automatización.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Combina los controles de permisos MCP con el <a href="/es/guias/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode</a> para máxima velocidad. Configura las operaciones de lectura como Allow y las de escritura como Ask, luego activa Turbo Mode para un flujo de desarrollo sin interrupciones.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Qué es MCP en Claude Code',
      answer: 'MCP significa Model Context Protocol. Es un estándar abierto de Anthropic que da a Claude Code acceso a herramientas y servicios externos como GitHub, bases de datos, navegadores y APIs a través de una interfaz unificada.',
    },
    {
      question: 'Los servidores MCP son gratuitos',
      answer: 'La mayoría de los servidores MCP oficiales son gratuitos y open source. Los servicios a los que se conectan pueden tener sus propios costes. Por ejemplo, el servidor MCP de GitHub es gratuito, pero GitHub en sí puede requerir un plan de pago para ciertas funcionalidades.',
    },
    {
      question: 'Cómo instalo servidores MCP para Claude Code',
      answer: 'Puedes editar ~/.claude/claude_desktop_config.json manualmente para añadir configuraciones de servidores MCP, o usar el MCP Marketplace de CodeAgentSwarm para una experiencia de configuración visual con configuración por proyecto.',
    },
    {
      question: 'Puedo usar varios servidores MCP a la vez',
      answer: 'Sí. Puedes tener tantos servidores MCP activos simultáneamente como necesites. Cada servidor se ejecuta de forma independiente y proporciona su propio conjunto de herramientas a Claude Code.',
    },
    {
      question: 'Los servidores MCP funcionan con Codex CLI',
      answer: 'Sí. Codex CLI también soporta MCP, junto con un número creciente de herramientas de desarrollo con IA que han adoptado el estándar Model Context Protocol.',
    },
    {
      question: 'Los servidores MCP pueden acceder a mis datos',
      answer: 'Los servidores MCP se ejecutan localmente en tu máquina y se conectan a los servicios usando tus propias credenciales. No envían datos a terceros. Tú controlas qué servicios están conectados y qué permisos tiene cada herramienta.',
    },
    {
      question: 'Qué es el MCP Marketplace de CodeAgentSwarm',
      answer: 'El MCP Marketplace es una interfaz visual dentro de CodeAgentSwarm que te permite explorar, activar y configurar servidores MCP por proyecto. Reemplaza el proceso manual de editar archivos de configuración JSON y reiniciar Claude Code.',
    },
  ],
}

export default guide
