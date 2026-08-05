import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-en-windows',
    locale: 'es',
    title: 'Antigravity CLI en Windows: nativo o WSL, y las trampas',
    metaTitle: 'Cómo ejecutar Antigravity CLI en Windows (nativo o WSL) (2026)',
    metaDescription: 'Antigravity CLI en Windows: nativo frente a WSL, dónde vive de verdad ~/.gemini, la trampa de las rutas UNC, por qué el indicador de cuota puede mentir y Windows en ARM.',
    intro: `Antigravity CLI funciona en Windows, y el titular honesto es que funciona bien. La CLI actual está hecha en Go, o sea un único binario nativo en vez de un runtime que tengas que mantener sano, y eso elimina casi toda la fricción clásica de Windows antes de que llegues a ella.

La decisión que sí tienes que tomar es <strong>Windows nativo o WSL</strong>, y a diferencia de otros agentes, aquí no hay una respuesta obviamente correcta. Depende de dónde viva tu código, no de cuál es mejor.

Esta guía cubre esa decisión, dónde guarda Antigravity sus ficheros en Windows, las dos trampas de rutas que producen fallos confusos, por qué tu indicador de cuota puede insistir en que Antigravity no está corriendo mientras lo ves trabajar, y qué cambia en Windows sobre ARM.`,
    ctaText: 'La multiplexación de terminales en Windows es donde la plataforma se queda de verdad atrás. CodeAgentSwarm ejecuta varias sesiones de Antigravity en paralelo en Windows dentro de una sola ventana, con estado por sesión y notificaciones.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Windows'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    alternateSlug: 'antigravity-cli-on-windows',
  },
  sections: [
    {
      id: 'nativo-o-wsl',
      title: 'Nativo o WSL: decide por dónde vive tu código',
      content: [
        {
          type: 'paragraph',
          text: 'La regla es corta y gana a cualquier otra consideración: <strong>ejecuta el agente en el mismo lado de la frontera del sistema de ficheros que tu repositorio</strong>.',
        },
        {
          type: 'list',
          items: [
            '<strong>Código en <code>C:\\Users\\tuusuario\\proyectos</code></strong> → ejecuta Antigravity nativo en Windows.',
            '<strong>Código en <code>~/proyectos</code> dentro de WSL</strong> → ejecuta Antigravity dentro de WSL.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Cruzar esa frontera es donde está el dolor. Un agente nativo de Windows metiendo mano en ficheros de WSL, o un agente de WSL metiendo mano en <code>/mnt/c</code>, funciona pero va lo bastante lento como para cambiar el comportamiento del agente: lecturas de fichero que deberían ser instantáneas tardan lo suficiente como para que un agente escaneando un repositorio se pase la mayor parte del tiempo en E/S. En un código grande la diferencia no es sutil.',
        },
        {
          type: 'paragraph',
          text: 'Más allá de la velocidad, cruzar la frontera también rompe cosas sin hacer ruido. La vigilancia de ficheros no se propaga de forma fiable, los permisos no se mapean limpiamente y los finales de línea se convierten en una molestia recurrente.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Si tu cadena de herramientas tiene forma de Linux (Docker, make, scripts de shell que asumen un entorno POSIX), pon el código y el agente en WSL. Si compilas .NET, usas herramientas nativas de Windows o tu equipo es Windows primero, quédate en nativo. No intentes tenerlo de las dos formas; esa es la configuración que produce todas las quejas.',
        },
      ],
    },
    {
      id: 'donde-viven-los-ficheros',
      title: 'Dónde guarda Antigravity sus ficheros en Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity reutiliza el directorio de inicio de Gemini, así que en Windows sus datos viven en <code>%USERPROFILE%\\.gemini</code>, que normalmente es <code>C:\\Users\\tunombre\\.gemini</code>. Las conversaciones están en la carpeta <code>antigravity-cli</code> dentro de él.',
        },
        {
          type: 'paragraph',
          text: 'Dos consecuencias que conviene saber. Primera, el nombre del directorio empieza por punto, y Windows no lo trata como oculto igual que Unix, así que lo vas a ver a simple vista en tu carpeta de usuario. Segunda, y más importante: <strong>Windows nativo y WSL tienen directorios de inicio completamente separados</strong>. Una conversación empezada en WSL no es visible desde una sesión nativa de Windows ni al revés, porque están mirando dos directorios <code>.gemini</code> distintos en dos sistemas de ficheros distintos.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Esto pilla a quien cambia de entorno a mitad de un proyecto: tu historial "desaparece" cuando ejecutas agy desde el otro lado. No se ha perdido nada, simplemente estás mirando otro directorio de inicio. Es un argumento más para elegir un lado y quedarte ahí.',
        },
        {
          type: 'paragraph',
          text: 'El resto del comportamiento de almacenamiento, incluido el diseño plano de las conversaciones y cómo se registra el proyecto, es igual en todas las plataformas y lo cubre <a href="/es/guias/historial-conversaciones-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">la guía del historial de conversaciones</a>.',
        },
      ],
    },
    {
      id: 'trampas-de-rutas',
      title: 'Las dos trampas de rutas',
      content: [
        {
          type: 'paragraph',
          text: '<strong>Rutas UNC.</strong> Si arrancas el agente desde un directorio al que llegas por un recurso de red o por el puente de WSL, el directorio de trabajo es una ruta UNC (<code>\\\\wsl$\\Ubuntu\\home\\tu\\proyecto</code> o <code>\\\\servidor\\recurso</code>) en vez de una letra de unidad. Muchas herramientas manejan mal las rutas UNC, y el fallo rara vez es un error claro: los comandos fallan con mensajes raros sobre el directorio actual, o se ejecutan en silencio en un sitio distinto del que esperabas.',
        },
        {
          type: 'paragraph',
          text: 'La solución es darle a la ruta una letra de unidad. Mapea el recurso con <code>net use</code>, o simplemente trabaja desde un directorio local de verdad. Si estás metiendo mano en WSL a través de <code>\\\\wsl$</code>, esa es de todas formas la configuración que la sección anterior te ha dicho que evites.',
        },
        {
          type: 'paragraph',
          text: '<strong>Espacios y rutas largas.</strong> Windows sigue teniendo un límite de 260 caracteres de ruta salvo que actives el soporte de rutas largas, y un árbol profundo de <code>node_modules</code> dentro de un proyecto ya anidado en <code>C:\\Users\\tunombre\\Documentos\\...</code> llega ahí antes de lo que crees. Un agente que no consigue escribir un fichero sin motivo aparente en un proyecto muy anidado suele estar chocando con esto.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Guardar los repositorios en algo corto como C:\\dev\\ o C:\\src\\ en vez de dentro de Documentos evita los dos problemas para siempre, y no cuesta nada.',
        },
      ],
    },
    {
      id: 'indicador-de-cuota',
      title: 'Por qué el indicador de cuota puede insistir en que Antigravity no está corriendo',
      content: [
        {
          type: 'paragraph',
          text: 'Este merece sección propia porque hace perder tiempo real de depuración. Antigravity expone su estado a través de un <strong>servidor de lenguaje local</strong>, y cualquier cosa que quiera leer tu cuota tiene que encontrar ese servidor primero.',
        },
        {
          type: 'paragraph',
          text: 'En macOS y Linux ese descubrimiento se hace normalmente con utilidades de procesos de Unix. En Windows esas utilidades no existen, así que cualquier herramienta que las dé por hechas <strong>no informa de nada en vez de fallar de forma ruidosa</strong>: tu indicador de cuota dice "Antigravity no está corriendo" mientras el agente trabaja visiblemente delante de ti. El enfoque correcto en Windows es enumerar los puertos a la escucha, que es lo que hace <code>netstat</code>.',
        },
        {
          type: 'paragraph',
          text: 'Hay un segundo fallo que se ve idéntico y no depende de la plataforma: <strong>una sesión con las credenciales caducadas es indistinguible desde fuera de no tener sesión</strong>. El servidor se comporta igual tanto si tus credenciales expiraron como si nunca arrancaste Antigravity.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Así que cuando un indicador de cuota diga que Antigravity está apagado y tú lo veas trabajar, comprueba dos cosas en este orden: si sigues autenticado, y si la herramienta usa un método de descubrimiento apropiado para Windows. Entre las dos cubren casi todos los casos de este aviso.',
        },
      ],
    },
    {
      id: 'windows-en-arm',
      title: 'Windows sobre ARM',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity en sí va bien en Windows sobre ARM, y un binario de Go es justo el tipo de cosa que se porta limpiamente. Lo que no siempre va bien es el ecosistema de alrededor.',
        },
        {
          type: 'paragraph',
          text: 'El problema recurrente son los <strong>módulos nativos</strong>: cualquier cosa de tu proyecto que compile contra una arquitectura concreta, siendo los enlaces de SQLite el ejemplo clásico, necesita una compilación para ARM64. Un binario precompilado descargado para x64 fallará al cargar con un error que menciona el módulo y no la arquitectura, lo que manda a la gente a buscar en el sitio equivocado.',
        },
        {
          type: 'paragraph',
          text: 'Si te topas con eso, la solución es recompilar los módulos nativos para tu arquitectura real, no reinstalar el agente. El agente no es lo que está roto.',
        },
      ],
    },
    {
      id: 'varias-sesiones',
      title: 'Ejecutar varias sesiones de Antigravity en Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Cada sesión de <code>agy</code> es un proceso independiente, así que nada te impide ejecutar varias. Lo que te frena en la práctica es la gestión de terminales de Windows: varias ventanas de PowerShell sin ninguna indicación de cuál es cuál, sin estado por sesión y sin notificación cuando alguna termina.',
        },
        {
          type: 'paragraph',
          text: 'Esto es genuinamente peor que en macOS o Linux, donde <code>tmux</code> es una respuesta razonable que la mayoría de desarrolladores de Windows no tiene montada. Es la razón principal de que los flujos de agentes en paralelo se sientan más difíciles en Windows de lo que realmente son.',
        },
        {
          type: 'paragraph',
          text: '<a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> funciona en Windows de forma nativa y le da a cada sesión de Antigravity su propio terminal etiquetado en una sola ventana, con estado en vivo, notificaciones de escritorio cuando una sesión termina e historial buscable de todas ellas. Gestiona el descubrimiento de cuota específico de Windows descrito arriba, así que el indicador refleja lo que pasa de verdad y no lo que informaría una comprobación con forma de Unix.',
        },
        {
          type: 'paragraph',
          text: 'Junto con un worktree de git por agente, que importa igual en Windows que en cualquier otro sitio, eso es lo que hace práctico <a href="/es/guias/enjambre-de-agentes-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">un enjambre de agentes de Antigravity</a> en la plataforma.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Antigravity CLI funciona en Windows?',
      answer: 'Sí, y bien. La CLI actual es un binario nativo de Go, así que no hay runtime que mantener sano y casi toda la fricción clásica de Windows no aplica. Funciona tanto en nativo como dentro de WSL.',
    },
    {
      question: '¿Ejecuto Antigravity nativo en Windows o en WSL?',
      answer: 'Ejecútalo en el mismo lado de la frontera del sistema de ficheros que tu código. Código en C:\\ significa nativo, código en ~/ dentro de WSL significa WSL. Cruzar la frontera funciona pero va lo bastante lento como para cambiar el comportamiento del agente, y la vigilancia de ficheros no se propaga de forma fiable.',
    },
    {
      question: '¿Dónde guarda Antigravity sus ficheros en Windows?',
      answer: 'En %USERPROFILE%\\.gemini, normalmente C:\\Users\\tunombre\\.gemini, con las conversaciones en la carpeta antigravity-cli dentro. Ojo: Windows nativo y WSL tienen directorios de inicio completamente separados, así que el historial empezado en un lado no se ve desde el otro.',
    },
    {
      question: '¿Por qué desaparece mi historial de Antigravity al cambiar entre WSL y Windows?',
      answer: 'No ha desaparecido. Windows nativo y WSL tienen cada uno su propio directorio .gemini en su propio sistema de ficheros, así que una sesión empezada en uno es invisible para el otro. Elige un lado y quédate ahí.',
    },
    {
      question: '¿Por qué mi indicador de cuota dice que Antigravity no está corriendo si sí lo está?',
      answer: 'Dos causas habituales. O tu sesión ha caducado, cosa indistinguible desde fuera de no tener sesión, o la herramienta está descubriendo el servidor de lenguaje local de Antigravity con utilidades de procesos de Unix que no existen en Windows, y entonces no informa de nada en vez de fallar. Enumerar los puertos a la escucha con netstat es el enfoque apropiado en Windows.',
    },
    {
      question: '¿Cómo ejecuto varias sesiones de Antigravity a la vez en Windows?',
      answer: 'Cada sesión de agy es su propio proceso, así que puedes abrir varias. Lo difícil es la gestión de terminales de Windows, porque la mayoría de desarrolladores no tiene tmux montado. CodeAgentSwarm funciona de forma nativa en Windows y le da a cada sesión un terminal etiquetado con estado en vivo, notificaciones e historial buscable en una sola ventana.',
    },
  ],
}

export default guide
