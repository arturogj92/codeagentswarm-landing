import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'mejor-setup-claude-code-windows',
    locale: 'es',
    title: 'El mejor setup de Claude Code para Windows: terminal, shell y flujo de trabajo',
    metaTitle: 'Mejor setup de Claude Code en Windows (2026): terminal, Git Bash y sesiones en paralelo',
    metaDescription: 'El setup de Windows que hace que Claude Code sea cómodo de verdad: Windows Terminal, Git Bash como shell, actualizaciones automáticas, cuándo añadir WSL 2 y cómo escalar a varias sesiones en paralelo.',
    intro: `La versión corta: instala Claude Code de forma nativa, usa Windows Terminal e instala Git para Windows para que Claude use Git Bash como shell en lugar de PowerShell. Esa combinación elimina la mayor parte de la fricción que la gente asocia con Claude Code en Windows.

Esta guía repasa cada pieza de ese setup y por qué importa: la elección de terminal, la configuración del shell, los canales de actualización, cuándo WSL 2 se gana su sitio y qué hacer cuando una sesión de Claude Code se te queda corta.

Da por hecho que ya tienes Claude Code instalado. Si no, empieza por nuestra guía de <a href="/es/guias/claude-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo instalar Claude Code en Windows</a> y vuelve.`,
    ctaText: '¿Listo para pasar de un terminal? Descarga CodeAgentSwarm para Windows gratis y ejecuta hasta 6 sesiones supervisadas de Claude Code en paralelo.',
    highlightedWords: ['Claude Code', 'Windows'],
    publishedAt: '2026-06-12',
    updatedAt: '2026-06-12',
    alternateSlug: 'best-claude-code-setup-windows',
  },
  sections: [
    {
      id: 'stack-recomendado',
      title: 'El stack recomendado de un vistazo',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Respuesta rápida: <strong>Windows Terminal + instalación nativa de Claude Code + Git para Windows (Git Bash como shell)</strong>. Añade WSL 2 solo si necesitas herramientas de Linux o ejecución con sandbox. Añade CodeAgentSwarm cuando quieras varias sesiones en paralelo.',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal:</strong> Windows Terminal (gratis, en la Microsoft Store) con perfiles de PowerShell 7 o Git Bash.',
            '<strong>Instalación de Claude Code:</strong> instalador nativo, que se actualiza solo en segundo plano.',
            '<strong>Shell para Claude:</strong> Git Bash vía Git para Windows, por su compatibilidad mucho mejor con comandos estilo bash.',
            '<strong>Opcional:</strong> WSL 2 para proyectos Linux-first o sandboxing.',
            '<strong>Para escalar:</strong> CodeAgentSwarm para supervisar varias sesiones a la vez.',
          ],
        },
      ],
    },
    {
      id: 'eleccion-de-terminal',
      title: 'Elige bien el terminal: Windows Terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code funciona en PowerShell a secas, CMD, Git Bash y shells de WSL. Pero la aplicación de terminal donde ejecutas esos shells importa para la comodidad del día a día, y en Windows el ganador claro es Windows Terminal: pestañas, paneles, renderizado correcto de Unicode y un copiar-pegar decente.',
        },
        {
          type: 'list',
          items: [
            'Instala Windows Terminal desde la Microsoft Store si no lo tienes.',
            'Si quieres un shell más moderno, instala PowerShell 7+ desde aka.ms/powershell; Claude Code también funciona bien con el Windows PowerShell de serie.',
            'Añade un perfil de Git Bash a Windows Terminal cuando instales Git para Windows, para poder elegir por pestaña.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: '¿No sabes en qué shell estás? Si el prompt empieza por <code>PS C:\\...</code> estás en PowerShell. Si es solo <code>C:\\...</code> estás en CMD.',
        },
      ],
    },
    {
      id: 'git-bash-como-shell',
      title: 'Instala Git para Windows y deja que Claude use Git Bash',
      content: [
        {
          type: 'paragraph',
          text: 'Este es el ajuste con más impacto de toda la guía. Sin Git para Windows, Claude Code usa PowerShell para ejecutar los comandos que lanza mientras trabaja en tu código. Funciona, pero una parte enorme del tooling de desarrollo, scripts y one-liners asumen un shell tipo bash. Con Git para Windows instalado, Claude Code usa Git Bash automáticamente, y muchos menos comandos necesitan traducción o fallan de formas raras.',
        },
        {
          type: 'list',
          items: [
            'Descarga Git para Windows desde git-scm.com e instálalo con las opciones por defecto.',
            'Reinicia el terminal. Claude Code detecta Git Bash automáticamente.',
            'Además te llevas git, que Claude Code necesita para cualquier cosa relacionada con control de versiones de todos modos.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Si Claude Code no detecta Git Bash (por ejemplo con una ruta de instalación de Git personalizada), apúntalo explícitamente en tu settings.json:',
        },
        {
          type: 'code',
          language: 'json',
          code: `{
  "env": {
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe"
  }
}`,
        },
      ],
    },
    {
      id: 'actualizaciones-y-canales',
      title: 'Mantenlo actualizado (y elige canal de releases)',
      content: [
        {
          type: 'list',
          items: [
            'Si usaste el instalador nativo, no tienes que hacer nada: se actualiza solo en segundo plano y aplica la actualización en el siguiente arranque.',
            'Si instalaste con WinGet, las actualizaciones son manuales (<code>winget upgrade Anthropic.ClaudeCode</code>), o define <code>CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1</code> para activarlas automáticas.',
            'Claude Code publica versiones muy rápido. Si prefieres menos sorpresas a tener las novedades el primer día, cambia el canal de "latest" a "stable" en tu configuración; stable va una semana por detrás y se salta las regresiones gordas.',
          ],
        },
      ],
    },
    {
      id: 'cuando-wsl2',
      title: 'Cuándo WSL 2 se gana un sitio en tu setup',
      content: [
        {
          type: 'paragraph',
          text: 'Para la mayoría del trabajo nativo en Windows no necesitas WSL para nada. Hay dos casos que lo justifican:',
        },
        {
          type: 'list',
          items: [
            '<strong>Proyectos Linux-first:</strong> si tu stack asume Linux (backends con mucho Docker, scripts de despliegue, Makefiles llenos de linuxismos), ejecuta Claude Code dentro de WSL 2, donde el proyecto se comporta como en producción.',
            '<strong>Sandboxing:</strong> la ejecución de comandos con sandbox de Claude Code solo funciona en WSL 2. Windows nativo y WSL 1 no la soportan. Si quieres más aislamiento cuando dejas a Claude ejecutar comandos con libertad, WSL 2 es el camino.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Las instalaciones nativa y de WSL conviven sin problema en la misma máquina, así que puedes mantener la nativa por defecto y usar WSL 2 para los proyectos que lo pidan. Más detalle en nuestra guía de <a href="/es/guias/claude-code-en-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo ejecutar Claude Code en Windows</a>.',
        },
      ],
    },
    {
      id: 'higiene-de-proyecto',
      title: 'Higiene de proyecto: CLAUDE.md y permisos',
      content: [
        {
          type: 'paragraph',
          text: 'Dos hábitos mejoran notablemente cada sesión de Claude Code, en cualquier sistema operativo:',
        },
        {
          type: 'list',
          items: [
            '<strong>Ten un CLAUDE.md en tu repo.</strong> Ejecuta <code>/init</code> una vez en un proyecto y Claude lo genera: comandos de build, convenciones, estructura. Cada sesión futura arranca con ese contexto gratis.',
            '<strong>Ajusta los permisos en lugar de aprobar todo a mano.</strong> Permite los comandos seguros y repetitivos (tu test runner, tu linter) y deja la confirmación para los destructivos. Si te tienta desactivarlo todo, lee antes nuestra guía sobre <a href="/es/guias/modo-yolo-claude-code-explicado" class="text-neon-cyan hover:text-neon-purple transition-colors">usar el modo YOLO / Turbo con cabeza</a>.',
          ],
        },
      ],
    },
    {
      id: 'flujo-multisesion',
      title: 'La mejora de verdad: de una sesión a varias',
      content: [
        {
          type: 'paragraph',
          text: 'Cuando tu setup de un solo terminal va fino, el cuello de botella pasa a ser el propio Claude: mientras trabaja, tú esperas. Los desarrolladores que más partido sacan a Claude Code en Windows ejecutan varias sesiones en paralelo: una arreglando un bug, otra escribiendo tests, otra con un refactor.',
        },
        {
          type: 'paragraph',
          text: 'Puedes hacerlo con pestañas de Windows Terminal a pelo, pero pierdes visibilidad rápido: sin notificación cuando un agente termina, sin vista de qué cambió cada uno, con el historial disperso por sesión.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> es una app de escritorio para Windows (y macOS) construida exactamente para esto: hasta 6 terminales de Claude Code en paralelo, notificaciones de escritorio cuando un agente termina o necesita tu input, historial buscable de todas las sesiones, diffs en vivo por terminal y un tablero kanban que los propios agentes mantienen al día. Funciona sobre tu instalación existente de Claude Code, así que todo lo de esta guía sigue aplicando.',
        },
        {
          type: 'paragraph',
          text: 'Para montar ese flujo, mira <a href="/es/guias/como-usar-varios-terminales-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">cómo usar varios terminales de Claude Code</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusión',
      content: [
        {
          type: 'paragraph',
          text: 'Un buen setup de Claude Code en Windows no es complicado: Windows Terminal para la comodidad, el instalador nativo para no pensar en actualizaciones, Git Bash para que los comandos simplemente funcionen, WSL 2 solo cuando el proyecto lo exige, y una herramienta multisesión cuando un terminal se queda corto.',
        },
        {
          type: 'paragraph',
          text: 'Móntalo una vez y Claude Code en Windows se siente igual de fino que en un Mac.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Uso PowerShell o Git Bash con Claude Code?',
      answer: 'Instala Git para Windows y deja que Claude Code use Git Bash: los comandos estilo bash, que es lo que asume la mayoría del tooling, funcionan de forma mucho más fiable. PowerShell sigue siendo un fallback perfectamente válido.',
    },
    {
      question: '¿WSL 2 es más rápido que Claude Code nativo en Windows?',
      answer: 'No como norma. Para proyectos nativos de Windows, el Claude Code nativo es más simple y evita el overhead de cruzar la frontera de sistemas de archivos. WSL 2 gana cuando el proyecto es Linux-first o cuando necesitas ejecución con sandbox.',
    },
    {
      question: '¿Puedo ejecutar varias sesiones de Claude Code a la vez en Windows?',
      answer: 'Sí. Cada terminal ejecuta su propia sesión independiente. Las pestañas de terminal a pelo funcionan pero no dan supervisión; CodeAgentSwarm para Windows te da hasta 6 sesiones con notificaciones, historial y diffs en vivo.',
    },
    {
      question: '¿Este setup necesita permisos de administrador?',
      answer: 'No. El instalador nativo de Claude Code, Windows Terminal y Git para Windows se instalan por usuario sin permisos de administrador.',
    },
  ],
}

export default guide
