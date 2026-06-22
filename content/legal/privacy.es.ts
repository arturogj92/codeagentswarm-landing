import type { LegalDoc } from './types'

const privacyEs: LegalDoc = {
  slug: 'privacy',
  locale: 'es',
  title: 'Política de Privacidad',
  metaTitle: 'Política de Privacidad | CodeAgentSwarm',
  metaDescription:
    'Cómo trata CodeAgentSwarm tus datos: qué recogemos, qué no recogemos nunca, quién los procesa, cuánto los conservamos y cómo ejercer tus derechos RGPD.',
  lastUpdated: '2026-06-22',
  intro:
    'Esta Política de Privacidad explica qué datos personales recoge CodeAgentSwarm cuando usas la aplicación de escritorio y este sitio web, por qué los recogemos, con quién los compartimos y qué derechos tienes sobre ellos. La hemos redactado para que coincida exactamente con lo que hace nuestro software. Si algo no queda claro, escríbenos a hello@codeagentswarm.com.',
  sections: [
    {
      id: 'controller',
      title: 'Quién es responsable de tus datos',
      blocks: [
        {
          type: 'paragraph',
          text: 'El responsable del tratamiento es Arturo García, persona física con domicilio en Ciudad Real, España (el "Proveedor", "nosotros"). Puedes contactarnos sobre cualquier cuestión relacionada con tus datos en hello@codeagentswarm.com.',
        },
        {
          type: 'paragraph',
          text: 'Tratamos los datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).',
        },
      ],
    },
    {
      id: 'summary',
      title: 'La versión corta',
      blocks: [
        {
          type: 'callout',
          variant: 'tip',
          text: 'CodeAgentSwarm es una aplicación de escritorio que ejecuta herramientas de IA de terceros (Claude Code, OpenAI Codex, Gemini CLI y similares) en terminales dentro de tu propio ordenador. El código, los archivos, las instrucciones y las respuestas de IA que ocurren en esas terminales viajan directamente desde la CLI de tu máquina al proveedor de IA que elijas, usando tu propia cuenta o clave de API. Nosotros no estamos en medio de esa comunicación y no recibimos ni almacenamos ese contenido.',
        },
        {
          type: 'paragraph',
          text: 'Lo que sí recogemos se limita a: información anónima de uso y de errores que nos ayuda a mantener la app funcionando; los datos de cuenta que nos das si decides iniciar sesión; los mensajes que envías al asistente de ayuda dentro de la app o a nuestros formularios de soporte, feedback y encuestas; y el estado de facturación si algún día contratas un plan de pago. Cada uno se detalla más abajo.',
        },
      ],
    },
    {
      id: 'not-collected',
      title: 'Qué NO recogemos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Para que quede explícito, no recibimos, almacenamos ni tenemos acceso a:',
        },
        {
          type: 'list',
          items: [
            'El contenido de tus terminales, tu código fuente, tus archivos ni los datos de tus proyectos.',
            'Las instrucciones que envías ni las respuestas que recibes de las CLIs de IA que ejecutas (Claude Code, Codex, Gemini CLI, etc.). Eso se rige por la política de privacidad del proveedor que uses (Anthropic, OpenAI, Google).',
            'Tus claves de API o credenciales de los proveedores de IA. Se quedan en tu máquina.',
            'Cuando la app genera un mensaje de commit de git, ejecuta la CLI de Claude que ya tienes instalada en tu ordenador y le pasa el diff local de git. Eso ocurre en tu máquina; nosotros nunca vemos el diff.',
          ],
        },
      ],
    },
    {
      id: 'collected',
      title: 'Qué recogemos y por qué',
      blocks: [
        {
          type: 'heading',
          text: 'a) Analítica anónima de uso (app de escritorio)',
          id: 'collected-analytics',
        },
        {
          type: 'paragraph',
          text: 'En las versiones de producción, la app registra qué acciones se usan dentro de la app (por ejemplo, abrir una terminal o pulsar un botón), junto con la versión de la app y un identificador de sesión aleatorio guardado localmente en tu dispositivo. Esto se envía a nuestro propio backend. No incluye tu nombre, email, rutas de archivo, código ni contenido de las terminales. Si has iniciado sesión, estos eventos pueden asociarse a tu cuenta.',
        },
        {
          type: 'heading',
          text: 'b) Informes de errores y fallos (app de escritorio)',
          id: 'collected-errors',
        },
        {
          type: 'paragraph',
          text: 'En las versiones de producción, cuando la app encuentra un error inesperado envía un informe a nuestro backend para poder corregirlo. Un informe contiene el mensaje de error y la traza técnica (que puede incluir rutas de archivo de tu sistema), la versión de la app, el sistema operativo, la arquitectura y un identificador anónimo y aleatorio de instalación. No incluye el email de tu cuenta. Estos informes los recibe nuestro backend y se reenvían a nuestro proveedor de monitorización de errores, Sentry, para ayudarnos a diagnosticar y corregir problemas.',
        },
        {
          type: 'heading',
          text: 'c) Datos de cuenta (solo si inicias sesión)',
          id: 'collected-account',
        },
        {
          type: 'paragraph',
          text: 'Iniciar sesión es opcional y se realiza mediante proveedores OAuth de terceros (GitHub, Google o Discord). Cuando inicias sesión recibimos y almacenamos los datos de perfil que comparten esos proveedores: tu dirección de email, nombre, nombre de usuario, URL de avatar, el proveedor y su identificador de usuario, y los tokens OAuth de acceso y de refresco (que sirven para mantener tu sesión). También registramos la fecha de tu último inicio de sesión y, por cada sesión, tu dirección IP e información básica del dispositivo.',
        },
        {
          type: 'heading',
          text: 'd) Asistente de ayuda con IA dentro de la app ("Swarmi")',
          id: 'collected-swarmi',
        },
        {
          type: 'paragraph',
          text: 'Swarmi es el asistente de ayuda con IA integrado en la app que responde preguntas sobre cómo usar CodeAgentSwarm. Cuando le preguntas algo, tu pregunta y un breve historial reciente se envían a nuestro backend, que genera una respuesta. Almacenamos el texto de tus preguntas y de las respuestas del asistente para operar la función, vigilar la calidad y prevenir abusos. Para aplicar límites diarios de uso también guardamos una versión cifrada (no reversible) de tu IP y un identificador anónimo. Por favor, no pegues secretos ni datos personales sensibles en el asistente.',
        },
        {
          type: 'heading',
          text: 'e) Soporte, feedback, encuestas y alta en beta',
          id: 'collected-support',
        },
        {
          type: 'paragraph',
          text: 'Si nos contactas o envías un formulario de feedback, una encuesta o un alta en la beta, almacenamos lo que nos mandas: tu dirección de email, el mensaje, título, descripción o respuestas, las capturas que adjuntes y metadatos técnicos como tu IP, versión de la app y plataforma.',
        },
        {
          type: 'heading',
          text: 'f) Facturación (solo si contratas un plan de pago)',
          id: 'collected-billing',
        },
        {
          type: 'paragraph',
          text: 'Si ofrecemos planes de pago y los contratas, los pagos los procesa Stripe. Stripe gestiona los datos de tu tarjeta directamente; nosotros nunca recibimos ni almacenamos el número completo de tu tarjeta. Guardamos tu identificador de cliente de Stripe, el estado de la suscripción, el plan y las fechas asociadas para darte acceso a las funciones que has pagado.',
        },
        {
          type: 'heading',
          text: 'g) Comprobación de actualizaciones',
          id: 'collected-updates',
        },
        {
          type: 'paragraph',
          text: 'Para avisarte de nuevas versiones, la app pregunta periódicamente a nuestro servidor de actualizaciones si existe una actualización, enviando únicamente la versión actual, la plataforma y la arquitectura. No se envía ningún identificador personal ni de dispositivo en estas comprobaciones.',
        },
      ],
    },
    {
      id: 'legal-bases',
      title: 'Bases legales del tratamiento',
      blocks: [
        {
          type: 'paragraph',
          text: 'Conforme al RGPD nos basamos en las siguientes bases legales:',
        },
        {
          type: 'list',
          items: [
            'Ejecución de un contrato (art. 6.1.b): para proporcionarte tu cuenta, el asistente de ayuda y cualquier suscripción de pago que solicites.',
            'Interés legítimo (art. 6.1.f): para mantener la app segura y funcional, corregir errores, entender el uso de forma anónima y prevenir abusos, de manera proporcionada y sin prevalecer sobre tus derechos.',
            'Consentimiento (art. 6.1.a): cuando lo pedimos, por ejemplo analítica opcional o emails comerciales. Puedes retirarlo en cualquier momento.',
            'Obligación legal (art. 6.1.c): para cumplir con obligaciones contables, fiscales u otras cuando corresponda.',
          ],
        },
      ],
    },
    {
      id: 'subprocessors',
      title: 'Con quién compartimos tus datos',
      blocks: [
        {
          type: 'paragraph',
          text: 'No vendemos tus datos personales. Solo los compartimos con los proveedores de servicio ("encargados del tratamiento") que nos ayudan a operar el producto, y únicamente en lo necesario:',
        },
        {
          type: 'table',
          headers: ['Proveedor', 'Finalidad', 'Ubicación'],
          rows: [
            ['Railway', 'Alojamiento de nuestro backend y del servicio de analítica', 'Estados Unidos'],
            ['Sentry', 'Monitorización de errores y fallos (recibe los informes de error descritos arriba)', 'Estados Unidos'],
            ['Supabase', 'Base de datos y almacenamiento de archivos (cuentas, soporte, analítica)', 'Unión Europea / Estados Unidos'],
            ['Stripe', 'Procesamiento de pagos de los planes de pago', 'Estados Unidos / UE'],
            ['GitHub, Google, Discord', 'Inicio de sesión OAuth (solo si eliges iniciar sesión)', 'Estados Unidos'],
            ['Anthropic, OpenAI, Google', 'Las CLIs de IA que ejecutas se conectan directamente con tu propia cuenta', 'Estados Unidos'],
            ['Umami (auto-alojado)', 'Analítica web respetuosa con la privacidad y sin cookies', 'Alojado por nosotros en Railway'],
          ],
        },
        {
          type: 'paragraph',
          text: 'También podemos revelar datos si la ley lo exige, para atender un requerimiento legal o para proteger nuestros derechos, seguridad o propiedad.',
        },
      ],
    },
    {
      id: 'transfers',
      title: 'Transferencias internacionales de datos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Algunos de nuestros proveedores están ubicados fuera del Espacio Económico Europeo, principalmente en Estados Unidos. Cuando se transfieren datos personales allí, están protegidos por garantías adecuadas como las Cláusulas Contractuales Tipo de la Comisión Europea o mecanismos equivalentes ofrecidos por esos proveedores.',
        },
      ],
    },
    {
      id: 'retention',
      title: 'Cuánto tiempo conservamos tus datos',
      blocks: [
        {
          type: 'list',
          items: [
            'Datos de cuenta: mientras tu cuenta exista, y se eliminan cuando nos pides que los borremos.',
            'Mensajes de soporte, feedback y encuestas: se conservan mientras sean necesarios para atender tu solicitud y durante un periodo razonable posterior.',
            'Analítica anónima e informes de errores: se conservan de forma agregada para mejorar el producto.',
            'Registros de facturación: se conservan durante el tiempo que exija la ley por motivos contables y fiscales.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Cuando ejerces tu derecho de supresión, borramos los datos personales que tengamos sobre ti, salvo que estemos legalmente obligados a conservar parte de ellos (por ejemplo, las facturas).',
        },
      ],
    },
    {
      id: 'rights',
      title: 'Tus derechos y cómo ejercerlos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tienes los siguientes derechos sobre tus datos personales conforme al RGPD:',
        },
        {
          type: 'list',
          items: [
            'Acceso: obtener una copia de los datos que tenemos sobre ti.',
            'Rectificación: corregir datos inexactos o incompletos.',
            'Supresión ("derecho al olvido"): pedirnos que borremos tus datos.',
            'Limitación: pedirnos que restrinjamos cómo usamos tus datos.',
            'Portabilidad: recibir tus datos en un formato portable.',
            'Oposición: oponerte al tratamiento basado en nuestro interés legítimo.',
            'Retirar el consentimiento: en cualquier momento, cuando el tratamiento se base en el consentimiento.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Para ejercer cualquiera de estos derechos, incluido eliminar tu cuenta y tus datos, escribe a hello@codeagentswarm.com desde la dirección asociada a tu cuenta. Responderemos y actuaremos en el plazo de un mes. Es gratuito.',
        },
        {
          type: 'paragraph',
          text: 'Si consideras que no hemos tratado tus datos correctamente, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) o ante tu autoridad de control local.',
        },
      ],
    },
    {
      id: 'security',
      title: 'Seguridad',
      blocks: [
        {
          type: 'paragraph',
          text: 'Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, como conexiones cifradas (HTTPS), el cifrado de identificadores sensibles y controles de acceso. Ningún método de transmisión o almacenamiento es completamente seguro, por lo que no podemos garantizar una seguridad absoluta.',
        },
      ],
    },
    {
      id: 'children',
      title: 'Menores',
      blocks: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm está dirigido a desarrolladores y no a menores. Debes tener al menos 16 años para crear una cuenta. Si crees que un menor nos ha facilitado datos personales, contáctanos y los eliminaremos.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Cambios en esta política',
      blocks: [
        {
          type: 'paragraph',
          text: 'Podemos actualizar esta Política de Privacidad a medida que el producto evolucione o cambie la ley. Actualizaremos la fecha de "Última actualización" en la parte superior y, para cambios significativos, daremos un aviso más destacado. Seguir usando el servicio tras una actualización implica que aceptas la política revisada.',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contacto',
      blocks: [
        {
          type: 'paragraph',
          text: 'Para cualquier consulta o solicitud sobre privacidad, escribe a hello@codeagentswarm.com.',
        },
      ],
    },
  ],
}

export default privacyEs
