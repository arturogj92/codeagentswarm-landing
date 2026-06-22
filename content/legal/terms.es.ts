import type { LegalDoc } from './types'

const termsEs: LegalDoc = {
  slug: 'terms',
  locale: 'es',
  title: 'Términos del Servicio',
  metaTitle: 'Términos del Servicio | CodeAgentSwarm',
  metaDescription:
    'Los términos que rigen el uso de la aplicación de escritorio y el sitio web de CodeAgentSwarm, incluyendo uso aceptable, herramientas de IA de terceros, garantías y responsabilidad.',
  lastUpdated: '2026-06-22',
  intro:
    'Estos Términos del Servicio ("Términos") rigen tu uso de la aplicación de escritorio CodeAgentSwarm, el sitio web y los servicios relacionados (en conjunto, el "Servicio"). Léelos con atención. Al descargar, instalar o usar el Servicio aceptas estos Términos. Si no estás de acuerdo, no uses el Servicio.',
  sections: [
    {
      id: 'provider',
      title: 'Quiénes somos',
      blocks: [
        {
          type: 'paragraph',
          text: 'El Servicio lo presta Arturo García, persona física con domicilio en Ciudad Real, España (el "Proveedor", "nosotros"). Puedes contactarnos en hello@codeagentswarm.com.',
        },
      ],
    },
    {
      id: 'service',
      title: 'Qué es el Servicio',
      blocks: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm es una aplicación de escritorio que te permite ejecutar y gestionar en paralelo varias herramientas de IA de línea de comandos de terceros (como Claude Code, OpenAI Codex y Gemini CLI), con gestión de tareas, seguimiento de cambios y funciones relacionadas. El Servicio es un cliente que orquesta esas herramientas en tu propio ordenador.',
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'CodeAgentSwarm no es un modelo de IA y no produce por sí mismo resultados de IA. Las herramientas de IA que ejecutas las operan sus propios proveedores bajo sus propios términos. Eres responsable de disponer de una cuenta o clave de API válida para cada herramienta que uses.',
        },
      ],
    },
    {
      id: 'eligibility',
      title: 'Requisitos de uso',
      blocks: [
        {
          type: 'paragraph',
          text: 'Debes tener al menos 16 años y capacidad para celebrar un acuerdo vinculante para usar el Servicio. Si usas el Servicio en nombre de una organización, confirmas que estás autorizado para aceptar estos Términos en su nombre.',
        },
      ],
    },
    {
      id: 'accounts',
      title: 'Cuentas',
      blocks: [
        {
          type: 'paragraph',
          text: 'Algunas funciones requieren una cuenta, creada mediante un inicio de sesión de terceros (GitHub, Google o Discord). Eres responsable de la actividad de tu cuenta y de mantener su acceso seguro. Avísanos con prontitud de cualquier uso no autorizado.',
        },
      ],
    },
    {
      id: 'license',
      title: 'Licencia de uso del Servicio',
      blocks: [
        {
          type: 'paragraph',
          text: 'Te concedemos una licencia personal, limitada, no exclusiva, intransferible y revocable para instalar y usar el Servicio con fines propios de desarrollo de software, sujeta a estos Términos. Nos reservamos todos los derechos que no se te conceden expresamente.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Uso aceptable',
      blocks: [
        {
          type: 'paragraph',
          text: 'Te comprometes a no:',
        },
        {
          type: 'list',
          items: [
            'Usar el Servicio con fines ilícitos o en infracción de cualquier ley aplicable.',
            'Realizar ingeniería inversa, descompilar o intentar extraer el código fuente del Servicio, salvo en la medida en que esta restricción esté prohibida por la ley.',
            'Revender, sublicenciar o redistribuir comercialmente el Servicio sin nuestro permiso.',
            'Interferir, sobrecargar o intentar acceder sin autorización al Servicio, a nuestro backend o a otros usuarios.',
            'Usar el Servicio para construir un producto directamente competidor copiándolo.',
            'Abusar del asistente de ayuda dentro de la app, por ejemplo intentando eludir los límites de uso o extraer el sistema subyacente.',
          ],
        },
      ],
    },
    {
      id: 'third-party',
      title: 'Herramientas y servicios de terceros',
      blocks: [
        {
          type: 'paragraph',
          text: 'El Servicio funciona junto con herramientas y servicios de terceros, incluidas las CLIs de IA (Anthropic Claude Code, OpenAI Codex, Google Gemini CLI), proveedores OAuth (GitHub, Google, Discord), procesamiento de pagos (Stripe) y otros. Tu uso de ellos se rige por sus propios términos y políticas de privacidad. No somos responsables de su disponibilidad, contenido, resultados, precios o conducta, y no los controlamos.',
        },
      ],
    },
    {
      id: 'ai-output',
      title: 'Resultados de la IA y tu responsabilidad',
      blocks: [
        {
          type: 'callout',
          variant: 'warning',
          text: 'El código, las sugerencias y demás contenido generado por las herramientas de IA que ejecutas pueden ser inexactos, inseguros o incompletos. Eres el único responsable de revisar, probar y decidir si usar cualquier resultado generado por IA. No ejecutes comandos ni publiques código que no entiendas. No somos responsables de las consecuencias de los resultados generados por IA, incluida la pérdida de datos o daños a tus sistemas.',
        },
      ],
    },
    {
      id: 'subscriptions',
      title: 'Planes, pagos y reembolsos',
      blocks: [
        {
          type: 'paragraph',
          text: 'El Servicio puede ofrecerse de forma gratuita y/o mediante planes de pago. Si contratas un plan de pago, se mostrarán el precio, el periodo de facturación y las funciones en el momento de la compra. Los pagos los procesa Stripe. Salvo que se indique lo contrario, las suscripciones se renuevan automáticamente hasta que se cancelan, y puedes cancelar en cualquier momento con efecto al final del periodo de facturación en curso.',
        },
        {
          type: 'paragraph',
          text: 'Si eres consumidor en la UE, dispones de un derecho legal de desistimiento de 14 días desde la compra, sujeto a las excepciones legales para el contenido digital cuyo uso ya hayas iniciado. Estos Términos no afectan a tus derechos imperativos como consumidor según la legislación española y de la UE.',
        },
      ],
    },
    {
      id: 'ip',
      title: 'Propiedad intelectual',
      blocks: [
        {
          type: 'paragraph',
          text: 'El Servicio, incluido su software, diseño, marcas y contenido, es propiedad del Proveedor o de sus licenciantes y está protegido por las leyes de propiedad intelectual. Estos Términos no te transfieren ninguna titularidad. Lo que crees usando el Servicio (como tu propio código) sigue siendo tuyo.',
        },
      ],
    },
    {
      id: 'warranty',
      title: 'Exclusión de garantías',
      blocks: [
        {
          type: 'paragraph',
          text: 'El Servicio se presta "tal cual" y "según disponibilidad", sin garantías de ningún tipo, ya sean expresas o implícitas, incluidas, entre otras, las de idoneidad para un fin concreto, comerciabilidad, exactitud y no infracción. No garantizamos que el Servicio sea ininterrumpido, esté libre de errores o sea seguro, ni que cumpla tus requisitos. Esto no excluye ninguna garantía que no pueda excluirse conforme a la ley aplicable.',
        },
      ],
    },
    {
      id: 'liability',
      title: 'Limitación de responsabilidad',
      blocks: [
        {
          type: 'paragraph',
          text: 'En la máxima medida permitida por la ley, el Proveedor no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de la pérdida de datos, beneficios, ingresos o negocio, derivados o relacionados con tu uso (o imposibilidad de uso) del Servicio, aun habiendo sido advertido de su posibilidad. En la medida en que se nos considere responsables, nuestra responsabilidad total agregada se limita al mayor de: el importe que nos hayas pagado por el Servicio en los doce meses anteriores al hecho que origina la reclamación, o cincuenta euros (50 EUR).',
        },
        {
          type: 'paragraph',
          text: 'Nada en estos Términos limita la responsabilidad que no pueda limitarse por ley, como la responsabilidad por dolo, negligencia grave o muerte o lesiones personales causadas por negligencia, ni tus derechos imperativos como consumidor.',
        },
      ],
    },
    {
      id: 'indemnity',
      title: 'Indemnización',
      blocks: [
        {
          type: 'paragraph',
          text: 'Aceptas mantener indemne al Proveedor frente a cualquier reclamación, daño o gasto derivado de tu uso indebido del Servicio o de tu incumplimiento de estos Términos o de la ley aplicable.',
        },
      ],
    },
    {
      id: 'termination',
      title: 'Resolución',
      blocks: [
        {
          type: 'paragraph',
          text: 'Puedes dejar de usar el Servicio en cualquier momento. Podemos suspender o cancelar tu acceso si incumples estos Términos o usas el Servicio de una forma que pueda perjudicarnos a nosotros, a otros usuarios o a terceros. Las disposiciones que por su naturaleza deban sobrevivir a la resolución (como la propiedad intelectual, las exclusiones de garantía y la limitación de responsabilidad) seguirán aplicándose.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Cambios en estos Términos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Podemos actualizar estos Términos periódicamente. Actualizaremos la fecha de "Última actualización" y, para cambios sustanciales, daremos un aviso razonable. Seguir usando el Servicio después de que los cambios entren en vigor implica que aceptas los Términos actualizados.',
        },
      ],
    },
    {
      id: 'law',
      title: 'Ley aplicable y jurisdicción',
      blocks: [
        {
          type: 'paragraph',
          text: 'Estos Términos se rigen por la ley española. Cualquier controversia se someterá a los juzgados y tribunales de Ciudad Real, España, salvo cuando la normativa imperativa de protección al consumidor te otorgue el derecho de acudir a los tribunales de tu lugar de residencia dentro de la UE.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contacto',
      blocks: [
        {
          type: 'paragraph',
          text: 'Las preguntas sobre estos Términos pueden enviarse a hello@codeagentswarm.com.',
        },
      ],
    },
  ],
}

export default termsEs
