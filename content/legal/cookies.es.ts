import type { LegalDoc } from './types'

const cookiesEs: LegalDoc = {
  slug: 'cookies',
  locale: 'es',
  title: 'Política de Cookies',
  metaTitle: 'Política de Cookies | CodeAgentSwarm',
  metaDescription:
    'CodeAgentSwarm usa analítica sin cookies y respetuosa con la privacidad, y no utiliza cookies de seguimiento ni de publicidad. Esto es exactamente lo que usamos y lo que no.',
  lastUpdated: '2026-06-22',
  intro:
    'Esta Política de Cookies explica las cookies y tecnologías similares que se usan en el sitio web y en la aplicación de escritorio de CodeAgentSwarm. La versión corta: no usamos cookies de seguimiento ni de publicidad, y nuestra analítica no usa cookies.',
  sections: [
    {
      id: 'summary',
      title: 'Resumen',
      blocks: [
        {
          type: 'callout',
          variant: 'tip',
          text: 'No usamos cookies de publicidad, marketing ni de seguimiento entre sitios, y no compartimos datos con redes publicitarias. Por eso no mostramos un banner de consentimiento de cookies. Solo usamos tecnologías estrictamente necesarias para que el sitio y la app funcionen, además de una analítica respetuosa con la privacidad que no usa cookies.',
        },
      ],
    },
    {
      id: 'analytics',
      title: 'Analítica del sitio web (sin cookies)',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nuestro sitio web usa Umami, una herramienta de analítica centrada en la privacidad que alojamos nosotros mismos. Umami no usa cookies: no instala cookies, no recoge datos personales y no te rastrea entre otros sitios web. Nos da estadísticas agregadas y anónimas, como cuánta gente visita una página, qué páginas son populares y de qué país procede aproximadamente una visita. Esto nos ayuda a mejorar el sitio sin elaborar perfiles de personas.',
        },
      ],
    },
    {
      id: 'functional',
      title: 'Almacenamiento estrictamente necesario y funcional',
      blocks: [
        {
          type: 'paragraph',
          text: 'Para que el sitio funcione podemos usar tecnologías estrictamente necesarias que no requieren consentimiento según la normativa de la UE, por ejemplo:',
        },
        {
          type: 'list',
          items: [
            'Una pequeña preferencia que recuerda el idioma que has elegido (español o inglés).',
            'Si inicias sesión, una cookie o token de sesión que te mantiene identificado mientras usas el sitio.',
          ],
        },
      ],
    },
    {
      id: 'app',
      title: 'La aplicación de escritorio',
      blocks: [
        {
          type: 'paragraph',
          text: 'La aplicación de escritorio no es un navegador web y no usa cookies de sitio. Guarda algunos valores localmente en tu dispositivo (por ejemplo un identificador de sesión aleatorio usado para la analítica anónima de uso y tus ajustes locales). Estos no salen de tu dispositivo salvo en la forma descrita en nuestra Política de Privacidad.',
        },
      ],
    },
    {
      id: 'managing',
      title: 'Gestión de cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Puedes bloquear o eliminar cookies desde los ajustes de tu navegador en cualquier momento. Como no dependemos de cookies de seguimiento, hacerlo no romperá la experiencia principal, aunque puede afectar a preferencias funcionales como la elección de idioma.',
        },
      ],
    },
    {
      id: 'changes',
      title: 'Cambios y contacto',
      blocks: [
        {
          type: 'paragraph',
          text: 'Si en el futuro introducimos cookies adicionales, actualizaremos este aviso y, cuando la ley lo exija, te pediremos primero tu consentimiento. Para cualquier consulta, escribe a hello@codeagentswarm.com. Consulta nuestra Política de Privacidad para todos los detalles sobre cómo tratamos los datos.',
        },
      ],
    },
  ],
}

export default cookiesEs
