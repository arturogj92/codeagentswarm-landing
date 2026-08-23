import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-vs-cursor-vs-codex',
    locale: 'es',
    title: 'Claude Code vs Cursor vs Codex CLI: Comparativa de herramientas de IA para programar',
    metaTitle: 'Claude Code vs Cursor vs Codex CLI: ¿cuál usar en 2026?',
    metaDescription: 'Uno es un IDE, dos son agentes de terminal y la diferencia de precio es real. Qué hace mejor cada herramienta, dónde flojea cada una y cómo elegir bien en 2026.',
    intro: `El ecosistema de herramientas de IA para programar ha crecido muchísimo. Claude Code, Cursor y Codex CLI son tres de las opciones más populares, pero son herramientas fundamentalmente distintas diseñadas para flujos de trabajo diferentes.

Esta guía compara qué hace cada una, dónde encaja y cuánto cuesta para que elijas un flujo o combines varias con intención.`,
    ctaText: '¿Usas Claude Code, Codex CLI o Antigravity CLI? Ejecútalos todos en paralelo con CodeAgentSwarm. Varios terminales, un solo workspace.',
    ctaAgent: 'multi',
    highlightedWords: ['Claude Code', 'Cursor', 'Codex CLI'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-08-23',
    alternateSlug: 'claude-code-vs-cursor-vs-codex',
  },
  sections: [
    {
      id: 'panorama-general',
      title: 'Tres herramientas distintas para tres flujos de trabajo diferentes',
      content: [
        {
          type: 'paragraph',
          text: 'Lo primero que hay que entender es que Claude Code, Cursor y Codex CLI no son competidores directos en el sentido tradicional. Cada uno aborda la programación asistida por IA desde un ángulo diferente y cubre necesidades distintas.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a></strong> es un agente CLI. Se ejecuta en tu terminal, lee tu código fuente, hace cambios en múltiples archivos, ejecuta comandos y gestiona tareas complejas de varios pasos de forma autónoma. Está desarrollado por Anthropic y funciona con los modelos Claude Sonnet y Opus.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://cursor.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor</a></strong> es un IDE. Concretamente, es un fork de VS Code con IA profundamente integrada en la experiencia de edición. Ofrece autocompletado en línea, un chat lateral, un modo agente para tareas más grandes y agentes en segundo plano. Soporta múltiples modelos de IA.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a></strong> es el agente de terminal de OpenAI. Similar en concepto a Claude Code, se ejecuta en tu terminal, lee tu repositorio y hace cambios. Funciona con los modelos de OpenAI y está incluido en las suscripciones de ChatGPT.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Una distinción importante: esta página compara el IDE de Cursor con dos agentes de terminal. Cursor también ofrece una CLI independiente llamada <code>cursor-agent</code>. Consulta la <a href="/es/guias/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">guía de Cursor CLI</a> o la comparativa <a href="/es/guias/cursor-cli-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI vs Claude Code</a>.',
        },
      ],
    },
    {
      id: 'claude-code',
      title: 'Claude Code',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Qué es',
          id: 'claude-code-que-es',
        },
        {
          type: 'paragraph',
          text: 'Claude Code es la herramienta de programación agéntica de Anthropic. Se ejecuta completamente en tu terminal como una aplicación CLI. Le das instrucciones en lenguaje natural, y él lee tu código, planifica una estrategia, edita archivos, ejecuta tests e itera hasta completar la tarea.',
        },
        {
          type: 'paragraph',
          text: 'Funciona con Claude Sonnet (para velocidad) y Claude Opus (para razonamiento complejo). La palabra clave aquí es "agéntico": Claude Code no solo sugiere código, sino que actúa. Crea archivos, modifica los existentes, ejecuta comandos de shell y encadena múltiples pasos para completar una tarea.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Puntos fuertes',
          id: 'claude-code-puntos-fuertes',
        },
        {
          type: 'list',
          items: [
            '<strong>Inspección del código:</strong> Claude Code puede inspeccionar archivos del proyecto, seguir sus relaciones y mantener contexto durante una sesión',
            '<strong>Flujos de trabajo agénticos de varios pasos:</strong> Planifica, ejecuta e itera. Pídele que refactorice un módulo y leerá el código, planificará los cambios, editará múltiples archivos, ejecutará tests y corregirá errores',
            '<strong>Integraciones MCP:</strong> Soporte completo para servidores de Model Context Protocol, permitiéndote conectar Claude Code a bases de datos, APIs, navegadores y otras herramientas',
            '<strong>Nativo de terminal:</strong> Funciona en cualquier terminal. Sin dependencia de editor. Úsalo junto a VS Code, Neovim, JetBrains o lo que prefieras',
            '<strong>Continuidad de conversación:</strong> Mantiene el contexto dentro de las sesiones y puede retomar conversaciones anteriores',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Precios',
          id: 'claude-code-precios',
        },
        {
          type: 'paragraph',
          text: 'Claude Code requiere una suscripción a Claude Pro ($20/mes, o $17/mes con facturación anual) o Claude Max ($100/mes con 5x el uso de Pro, $200/mes con 20x). El plan Pro te da un uso más que suficiente para el desarrollo del día a día. Max es para sesiones intensivas de programación durante todo el día donde necesitas límites de uso más altos.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ideal para',
          id: 'claude-code-ideal-para',
        },
        {
          type: 'paragraph',
          text: 'Refactorizaciones complejas, cambios en múltiples archivos, flujos de trabajo agénticos, desarrolladores que prefieren trabajar en terminal, y cualquiera que quiera una IA capaz de actuar de forma autónoma en su código.',
        },
      ],
    },
    {
      id: 'cursor',
      title: 'Cursor',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Qué es',
          id: 'cursor-que-es',
        },
        {
          type: 'paragraph',
          text: 'Cursor es un IDE completo construido sobre VS Code. Se ve y se siente como VS Code (extensiones, temas y atajos de teclado se mantienen), pero con capacidades de IA integradas en cada parte de la experiencia de edición.',
        },
        {
          type: 'paragraph',
          text: 'Esta comparativa usa <strong>Cursor</strong> para referirse al IDE: el editor con sugerencias en línea, Chat y modo Agent. Cursor también ofrece una CLI separada llamada <code>cursor-agent</code>. Compara esa interfaz directamente en <a href="/es/guias/cursor-cli-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI vs Claude Code</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Puntos fuertes',
          id: 'cursor-puntos-fuertes',
        },
        {
          type: 'list',
          items: [
            '<strong>Experiencia de IDE familiar:</strong> Cursor se basa en VS Code y muchas extensiones y configuraciones son compatibles',
            '<strong>Autocompletado con Tab:</strong> El autocompletado de Cursor predice tu siguiente edición mientras escribes. Acepta sugerencias con Tab, algo que se siente muy natural para editar línea a línea',
            '<strong>Soporte multimodelo:</strong> usa modelos actuales de Claude, GPT, Gemini y Grok, y cambia según la tarea',
            '<strong>Modo agente:</strong> Para tareas más grandes, el modo agente de Cursor puede hacer cambios en múltiples archivos, ejecutar comandos e iterar, similar a lo que hacen los agentes CLI',
            '<strong>Agentes en segundo plano:</strong> Ejecuta tareas en segundo plano mientras sigues programando en primer plano',
            '<strong>Funciones de equipo:</strong> Controles de administración, analíticas de uso y configuraciones compartidas para equipos',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Precios',
          id: 'cursor-precios',
        },
        {
          type: 'paragraph',
          text: 'Cursor tiene un plan Hobby gratuito para evaluar. A 23 de agosto de 2026, los planes individuales son Pro por 20 $/mes, Pro Plus por 60 $/mes y Ultra por 200 $/mes. Teams Standard cuesta 40 $ por usuario/mes y Teams Premium 120 $ por usuario/mes. El uso incluido depende del coste en tokens del modelo y el consumo bajo demanda puede continuar después con el límite de gasto que configures.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ideal para',
          id: 'cursor-ideal-para',
        },
        {
          type: 'paragraph',
          text: 'Desarrolladores que quieren asistencia de IA directamente dentro de su editor, gente que valora las sugerencias de código en línea mientras escribe, equipos que necesitan controles de administración, y cualquiera que prefiera el enfoque IDE frente a los agentes de terminal.',
        },
      ],
    },
    {
      id: 'codex-cli',
      title: 'Codex CLI',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Qué es',
          id: 'codex-cli-que-es',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI es el agente de programación de terminal open source de OpenAI. Conceptualmente es similar a Claude Code: lo ejecutas en tu terminal, lo apuntas a un repositorio y lee archivos, hace cambios y ejecuta comandos. Los modelos actuales de Codex incluyen GPT-5.6 Sol, Terra y Luna.',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI tiene un fuerte enfoque en ser ligero y estar aislado. Por defecto, se ejecuta en un entorno sandbox con red deshabilitada, lo que significa que puede experimentar con cambios en el código de forma segura sin afectar tu sistema.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Puntos fuertes',
          id: 'codex-cli-puntos-fuertes',
        },
        {
          type: 'list',
          items: [
            '<strong>Incluido con ChatGPT:</strong> ChatGPT Plus y Pro incluyen Codex CLI dentro de los límites de uso del plan',
            '<strong>Instalable mediante npm:</strong> Instálalo, apúntalo a tu repositorio e inicia una sesión de terminal',
            '<strong>Open source:</strong> El código público permite inspección y contribuciones de la comunidad',
            '<strong>Soporte MCP:</strong> Al igual que Claude Code, Codex CLI soporta Model Context Protocol para integraciones con herramientas externas',
            '<strong>Ejecución en sandbox:</strong> Se ejecuta en un sandbox por defecto, lo que lo hace más seguro para cambios experimentales',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Precios',
          id: 'codex-cli-precios',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI viene incluido con ChatGPT Free, Go (8 $/mes), Plus (20 $/mes) y Pro, que se ofrece desde 100 $/mes con 5x de uso o 200 $/mes con 20x. El uso incluido se mide en créditos compartidos entre las funciones agénticas de OpenAI y se puede ampliar con más créditos. También puedes usar una clave de API de OpenAI para pagar por uso.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ideal para',
          id: 'codex-cli-ideal-para',
        },
        {
          type: 'paragraph',
          text: 'Desarrolladores que ya están en el ecosistema de OpenAI, tareas rápidas de programación en terminal, cualquiera que quiera un agente CLI ligero sin suscripciones adicionales más allá de ChatGPT, y desarrolladores que valoran las herramientas open-source. Para una comparativa enfocada y cara a cara solo entre estos dos, mira <a href="/es/guias/codex-cli-vs-cursor" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI vs Cursor</a>.',
        },
      ],
    },
    {
      id: 'comparativa',
      title: 'Comparativa lado a lado',
      content: [
        {
          type: 'paragraph',
          text: 'Así se comparan las tres herramientas en las dimensiones que más importan para el desarrollo del día a día:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tipo de herramienta y enfoque',
          id: 'comparativa-tipo',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Agente CLI (se ejecuta en tu terminal)',
            '<strong>Cursor:</strong> IDE completo (fork de VS Code con IA integrada)',
            '<strong>Codex CLI:</strong> Agente CLI (se ejecuta en tu terminal)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Precios',
          id: 'comparativa-precios',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Claude Pro $20/mes, Max $100/mes (5x) o $200/mes (20x)',
            '<strong>Cursor:</strong> Hobby gratis, Pro 20 $/mes, Pro Plus 60 $/mes, Ultra 200 $/mes, Teams Standard 40 $/usuario y Premium 120 $/usuario',
            '<strong>Codex CLI:</strong> limitado en ChatGPT Free, Go 8 $/mes, Plus 20 $/mes; Pro desde 100 $/mes (5x) o 200 $/mes (20x)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Soporte de modelos de IA',
          id: 'comparativa-modelos',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Solo modelos Claude (Sonnet, Opus)',
            '<strong>Cursor:</strong> varios modelos actuales de Claude, GPT, Gemini y Grok',
            '<strong>Codex CLI:</strong> solo modelos OpenAI, incluidos GPT-5.6 Sol, Terra y Luna',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Soporte MCP',
          id: 'comparativa-mcp',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Integración MCP completa',
            '<strong>Cursor:</strong> Soporte MCP limitado',
            '<strong>Codex CLI:</strong> Integración MCP completa',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Programación agéntica',
          id: 'comparativa-agéntica',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Fuerte. Construido desde cero como herramienta agéntica',
            '<strong>Cursor:</strong> Bueno. Modo agente y agentes en segundo plano disponibles, pero la experiencia principal es IDE-first',
            '<strong>Codex CLI:</strong> Bueno. Capacidades agénticas sólidas con ejecución en sandbox',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Autocompletado en línea',
          id: 'comparativa-autocompletado',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> No (es un agente de terminal, no un editor)',
            '<strong>Cursor:</strong> Sí. Las sugerencias con Tab son una de sus funciones más potentes',
            '<strong>Codex CLI:</strong> No (es un agente de terminal, no un editor)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Flujo de trabajo en terminal',
          id: 'comparativa-terminal',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Herramienta nativa de terminal',
            '<strong>Cursor:</strong> Tiene un terminal integrado, pero la experiencia principal es el editor',
            '<strong>Codex CLI:</strong> Herramienta nativa de terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Historial de conversaciones',
          id: 'comparativa-historial',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Historial nativo básico (retomar última sesión). Historial completo y buscable con CodeAgentSwarm',
            '<strong>Cursor:</strong> Historial de chat dentro de sesiones',
            '<strong>Codex CLI:</strong> Historial de conversaciones básico',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sesiones paralelas múltiples',
          id: 'comparativa-sesiones',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Sí, ejecuta múltiples instancias. Varios terminales organizados con CodeAgentSwarm',
            '<strong>Cursor:</strong> Limitado. Los agentes en segundo plano ayudan, pero básicamente trabajas en un solo editor',
            '<strong>Codex CLI:</strong> Sí, ejecuta múltiples instancias en terminales separados',
          ],
        },
      ],
    },
    {
      id: 'cuando-usar-cada-una',
      title: 'Cuándo usar cada herramienta',
      content: [
        {
          type: 'paragraph',
          text: 'No hay una herramienta "mejor" aquí. Cada una encaja en situaciones y preferencias distintas.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa Cursor si...',
          id: 'cuando-cursor',
        },
        {
          type: 'list',
          items: [
            'Quieres asistencia de IA directamente dentro de tu editor mientras escribes',
            'Te encantan las sugerencias con Tab para autocompletado rápido',
            'Prefieres una interfaz familiar de VS Code y quieres mantener tus extensiones actuales',
            'Trabajas en un equipo que necesita controles de administración y gestión de uso',
            'Quieres cambiar entre modelos actuales de Claude, GPT, Gemini y Grok según la tarea',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa Claude Code si...',
          id: 'cuando-claude-code',
        },
        {
          type: 'list',
          items: [
            'Prefieres trabajar en terminal y quieres una IA que opere junto a tu editor, no dentro de él',
            'Necesitas capacidades agénticas profundas para tareas complejas de varios pasos',
            'Trabajas en refactorizaciones grandes que tocan muchos archivos y requieren planificación e iteración',
            'Dependes de integraciones MCP para conectar tu IA a bases de datos, navegadores o servicios externos',
            'Quieres seguir usando tu editor preferido (Neovim, JetBrains, VS Code) sin pasarte a Cursor',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa Codex CLI si...',
          id: 'cuando-codex',
        },
        {
          type: 'list',
          items: [
            'Ya pagas ChatGPT y quieres un agente de terminal sin coste adicional',
            'Prefieres los modelos de OpenAI y te sientes cómodo en ese ecosistema',
            'Quieres un agente CLI ligero y open-source',
            'Valoras la ejecución en sandbox para experimentar de forma más segura',
            'Quieres un agente de terminal rápido para tareas de programación sencillas',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Usa varias herramientas a la vez',
          id: 'cuando-varias',
        },
        {
          type: 'paragraph',
          text: 'Esto es lo que hacen muchos desarrolladores con experiencia en la práctica: usan más de una herramienta. Una configuración habitual es Cursor para ediciones en línea y sugerencias rápidas mientras programas, más Claude Code o Codex CLI para tareas más grandes que requieren cambios en múltiples archivos y ejecución autónoma.',
        },
        {
          type: 'paragraph',
          text: 'Estas herramientas no se excluyen. Cursor puede cubrir la asistencia en línea mientras Claude Code o Codex CLI ejecuta tareas grandes de varios archivos en otro terminal.',
        },
      ],
    },
    {
      id: 'todas-juntas-codeagentswarm',
      title: 'Ejecútalas todas juntas con CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Si usas agentes CLI como Claude Code, Codex CLI o Antigravity CLI, hay un problema práctico: gestionar múltiples sesiones de terminal se vuelve un caos rápidamente. Pierdes la pista de qué terminal está haciendo qué, no te enteras de cuándo un agente termina, y cambiar entre sesiones es un cambio de contexto constante.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> resuelve esto dándote un workspace unificado donde puedes ejecutar varios terminales de agentes de IA simultáneamente, organizados en un diseño visual limpio.',
        },
        {
          type: 'list',
          items: [
            '<strong>Mezcla diferentes herramientas CLI en el mismo workspace:</strong> Ejecuta Claude Code en el terminal 1, Codex CLI en el terminal 2, Antigravity CLI en el terminal 3 y bash normal en el terminal 4. Todo visible a la vez',
            '<strong>Notificaciones en tiempo real:</strong> Recibe una notificación cuando un agente termina o necesita tu input para detectar antes cuándo ha acabado',
            '<strong>Historial de conversaciones de todas las sesiones:</strong> Busca y retoma cualquier conversación pasada, organizada por proyecto y fecha',
            '<strong>Ve lo que cada agente está cambiando:</strong> Rastrea los cambios de archivos en tiempo real para cada terminal de forma independiente',
            '<strong>Seguimiento de tareas:</strong> Sabes en qué está trabajando cada terminal de un vistazo',
          ],
        },
        {
          type: 'paragraph',
          text: 'La idea es sencilla: no deberías tener que elegir una sola herramienta CLI. Los modelos tienen fortalezas distintas. A veces Claude gestiona mejor una tarea y a veces lo hace un GPT actual. Con CodeAgentSwarm, los ejecutas todos y dejas que cada uno haga lo que mejor sabe hacer.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Para una guía paso a paso sobre cómo configurar múltiples terminales, consulta <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cómo usar varios terminales de Claude Code en paralelo</a>.',
        },
        {
          type: 'paragraph',
          text: 'Ya seas un usuario avanzado de Claude Code, un entusiasta de Codex CLI, o alguien que le gusta mezclar herramientas según la tarea, CodeAgentSwarm te da un workspace que mantiene todo organizado y visible. Se acabó perder la pista de lo que están haciendo tus agentes.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Es Claude Code mejor que Cursor?',
      answer: 'Son herramientas diferentes. Claude Code es un agente de terminal diseñado para tareas de programación agénticas y de varios pasos. Cursor es un IDE con IA integrada para asistencia en línea y sugerencias de código. Muchos desarrolladores usan ambas: Cursor para edición diaria y Claude Code para refactorizaciones complejas de múltiples archivos.',
    },
    {
      question: '¿Es Codex CLI gratis?',
      answer: 'Sí, con uso limitado en ChatGPT Free. También viene incluido con ChatGPT Go, Plus y Pro, y puedes ampliar el uso incluido con créditos.',
    },
    {
      question: '¿Puedo usar Claude Code y Cursor juntos?',
      answer: 'Sí, y muchos desarrolladores hacen exactamente eso. Puedes usar Cursor como tu editor principal para sugerencias en línea y ediciones rápidas, mientras ejecutas Claude Code en un terminal aparte para tareas complejas de múltiples archivos y flujos de trabajo agénticos.',
    },
    {
      question: '¿Cuál es la mejor herramienta de IA para programar para principiantes?',
      answer: 'Cursor es generalmente la opción más amigable para principiantes porque se ve y funciona como VS Code. Recibes sugerencias en línea mientras escribes y un panel de chat para preguntas. Requiere menos conocimiento de terminal comparado con Claude Code o Codex CLI.',
    },
    {
      question: '¿Puedo ejecutar Claude Code y Codex CLI al mismo tiempo?',
      answer: 'Sí. Puedes ejecutarlos en ventanas de terminal separadas. CodeAgentSwarm lo hace aún más fácil, permitiéndote ejecutar Claude Code, Codex CLI y Antigravity CLI uno al lado del otro en varios terminales organizados con notificaciones, historial y seguimiento de cambios de archivos para cada uno.',
    },
    {
      question: '¿Cursor soporta MCP?',
      answer: 'Cursor tiene algo de soporte MCP, pero es más limitado comparado con la integración MCP completa de Claude Code. Claude Code y Codex CLI ofrecen capacidades MCP más profundas para conectar con herramientas externas como bases de datos, navegadores y APIs.',
    },
    {
      question: '¿Cuál es la configuración de IA para programar más barata?',
      answer: 'Cursor Hobby y el uso limitado de Codex en ChatGPT Free empiezan en 0 $. Claude Code empieza con Pro por 20 $/mes o con uso de API medido. Prueba primero las opciones gratuitas y paga por el flujo cuyos límites alcances de verdad.',
    },
  ],
}

export default guide
