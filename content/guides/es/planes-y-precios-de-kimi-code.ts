import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'planes-y-precios-de-kimi-code',
    locale: 'es',
    title: 'Precios de Kimi Code: coste mensual, anual y por API',
    metaTitle: 'Precios de Kimi Code: mensual, anual y API (2026)',
    metaDescription: 'Compara los planes mensuales y anuales de Kimi Code, créditos, límites semanales y de 5 horas, y los precios actuales de la API de Kimi K2.7 Code.',
    intro: `A 11 de agosto de 2026, Kimi ofrece cuatro niveles de pago. Los precios mensuales van de 19 a 199 dólares; con facturación anual, el coste mensual efectivo baja a entre 15 y 159 dólares. La capacidad de Kimi Code escala 1x, 5x, 15x y 30x. Todas las funciones de la membresía comparten un pozo de créditos, mientras Kimi Code tiene además su propia asignación semanal y un límite de 5 horas.

También existe la vía de pago por token. El modelo de programación predeterminado actual, Kimi K2.7 Code, cuesta 0,19 dólares por millón de tokens de entrada en caché, 0,95 dólares sin caché y 4 dólares por millón de tokens de salida a través de la API de Kimi. Su ventana de contexto es de 262.144 tokens.

Esta guía separa ambos sistemas de facturación y enlaza cada cifra cambiante con la documentación oficial de Kimi. Los precios pueden cambiar: usa la fecha anterior y confirma el total en el checkout antes de pagar.`,
    ctaText: 'Ejecutar agentes de Kimi Code contra límites de uso estresa menos cuando puedes verlos. CodeAgentSwarm muestra el uso de Kimi junto al del resto de tus agentes.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'Precios'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-08-11',
    alternateSlug: 'kimi-code-plans-and-pricing',
  },
  sections: [
    {
      id: 'planes-de-un-vistazo',
      title: 'Planes de Kimi Code de un vistazo',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://www.kimi.com/help/membership/membership-pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">página oficial de precios de Kimi</a> muestra estos cuatro planes de pago a 11 de agosto de 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Mensual', 'Anual, coste mensual efectivo', 'Créditos de Kimi Code'],
          rows: [
            ['Moderato', '19 $', '15 $ (180 $/año)', '1x'],
            ['Allegretto', '39 $', '31 $ (372 $/año)', '5x'],
            ['Allegro', '99 $', '79 $ (948 $/año)', '15x'],
            ['Vivace', '199 $', '159 $ (1.908 $/año)', '30x'],
          ],
        },
        {
          type: 'paragraph',
          text: 'El multiplicador indica capacidad relativa, no una cantidad pública de tokens. La <a href="https://www.kimi.com/help/membership/membership-overview" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">descripción oficial de la membresía</a> explica que Kimi Code, Kimi Work, Deep Research, Slides, webs y las demás funciones consumen un mismo pozo de créditos. Un uso intenso fuera de Kimi Code puede reducir lo que queda para programar.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Los importes de 15, 31, 79 y 159 dólares son equivalentes mensuales al pagar un año completo. Mes a mes, los precios son 19, 39, 99 y 199 dólares. El checkout puede añadir impuestos.',
        },
      ],
    },
    {
      id: 'como-funcionan-los-limites',
      title: 'Cómo funcionan los límites de Kimi Code',
      content: [
        {
          type: 'paragraph',
          text: 'Hay dos contadores importantes. Los créditos de la membresía se reinician al empezar cada ciclo mensual de facturación. Kimi Code tiene además una <strong>asignación semanal y un límite propio de 5 horas</strong>. Ese límite de Kimi Code no consume los límites de otras funciones, pero el pozo de créditos base sí es compartido.',
        },
        {
          type: 'paragraph',
          text: 'Kimi no publica una cantidad fija de tokens para cada multiplicador 1x porque el consumo cambia según la tarea. Una sesión larga sobre un repositorio puede gastar más créditos que una edición corta, y varios terminales en paralelo alcanzan el límite de 5 horas antes que uno solo.',
        },
        {
          type: 'paragraph',
          text: 'Escribe <code>/usage</code> dentro de la interfaz de Kimi Code para consultar los límites de tu cuenta. Considera esa vista en vivo como la autoridad final sobre la capacidad que te queda.',
        },
      ],
    },
    {
      id: 'modelo-actual',
      title: 'Modelo actual de Kimi Code y ventana de contexto',
      content: [
        {
          type: 'paragraph',
          text: 'La <a href="https://www.kimi.com/es-419/resources/kimi-k2-7-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">documentación de Kimi K2.7 Code</a> indica que K2.7 Code es ahora el modelo predeterminado de Kimi Code. Tiene una ventana de contexto de 256K (262.144 tokens), un billón de parámetros totales y 32.000 millones de parámetros activos por token.',
        },
        {
          type: 'paragraph',
          text: 'K2.7 Code siempre se ejecuta con razonamiento. Si desactivas el razonamiento en Kimi Code, la petición pasa a K2.6. Por eso ya no son correctas las afirmaciones antiguas de que Kimi Code siempre ejecuta K3 con un millón de tokens de contexto.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Kimi K3 es otro modelo y sigue disponible en productos de Kimi. No uses el precio de K3 ni su contexto de un millón de tokens para calcular una sesión predeterminada de Kimi Code con K2.7 Code.',
        },
      ],
    },
    {
      id: 'pago-por-token',
      title: 'Precio de la API de Kimi K2.7 Code',
      content: [
        {
          type: 'paragraph',
          text: 'Si prefieres pagar por uso, la API de Kimi expone el modelo <code>kimi-k2.7-code</code>. La página oficial de K2.7 Code publica estas tarifas a 11 de agosto de 2026:',
        },
        {
          type: 'list',
          items: [
            '<strong>0,19 $ por millón de tokens de entrada</strong> con acierto de caché',
            '<strong>0,95 $ por millón de tokens de entrada</strong> sin acierto de caché',
            '<strong>4,00 $ por millón de tokens de salida</strong>',
            '<strong>Ventana de contexto de 262.144 tokens</strong>',
          ],
        },
        {
          type: 'paragraph',
          text: 'La caché automática abarata el contexto repetido de un repositorio: un token de entrada con acierto cuesta una quinta parte que uno sin caché. La contrapartida es que la API no tiene un techo mensual fijo, así que configura presupuestos en la plataforma antes de dejar un agente autónomo sin supervisión.',
        },
        {
          type: 'paragraph',
          text: 'Si quieres dirigir específicamente el modelo K3 mediante un cliente compatible con Anthropic, consulta <a href="/es/guias/kimi-k3-con-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K3 con Claude Code</a>. Su modelo, límites y precios no deben mezclarse con las cifras de K2.7 Code anteriores.',
        },
      ],
    },
    {
      id: 'nivel-gratuito',
      title: '¿Kimi Code es gratis?',
      content: [
        {
          type: 'paragraph',
          text: 'El CLI de Kimi Code es open source bajo licencia MIT y se instala gratis. El uso del modelo se factura aparte. La tabla oficial actual de membresías empieza en Moderato, a 19 dólares mes a mes o 15 dólares mensuales con pago anual, y la API cobra por token.',
        },
        {
          type: 'paragraph',
          text: 'Kimi puede ofrecer pruebas o promociones, pero cambian y no son un presupuesto de producción fiable. Confirma cualquier cuota gratuita dentro de tu cuenta en vez de asumir que una oferta antigua de Adagio sigue activa.',
        },
      ],
    },
    {
      id: 'vigilar-uso',
      title: 'Vigilar el uso de Kimi mientras trabajan los agentes',
      content: [
        {
          type: 'paragraph',
          text: 'Los límites se convierten en un problema operativo cuando varios agentes los comparten: normalmente descubres el muro cuando el trabajo se detiene. <a href="/es" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> muestra el uso del proveedor junto a los terminales paralelos para que puedas redistribuir el trabajo antes de que una sesión se pare.',
        },
        {
          type: 'paragraph',
          text: 'Esto encaja con el flujo de la <a href="/es/guias/enjambre-de-agentes-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del enjambre de agentes Kimi Code</a>: usa Kimi donde encaje, conserva otro proveedor para desbordamiento y vigila los límites compartidos en vez de adivinarlos.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Kimi Code es gratis?',
      answer: 'El CLI de Kimi Code es gratis y open source. El uso del modelo se factura aparte mediante una membresía Kimi o la API. A 11 de agosto de 2026, la tabla oficial de pago empieza en 19 dólares mes a mes o 15 dólares al mes con facturación anual.',
    },
    {
      question: '¿Cuánto cuesta Kimi Code al mes?',
      answer: 'Los planes mensuales son Moderato 19 $, Allegretto 39 $, Allegro 99 $ y Vivace 199 $. Con pago anual, sus costes mensuales efectivos son 15, 31, 79 y 159 dólares. Los créditos de Kimi Code escalan 1x, 5x, 15x y 30x.',
    },
    {
      question: '¿Qué plan de Kimi incluye Kimi Code?',
      answer: 'Los cuatro niveles de pago de la tabla oficial actual incluyen créditos de Kimi Code: Moderato 1x, Allegretto 5x, Allegro 15x y Vivace 30x.',
    },
    {
      question: '¿Cuándo se reinician los límites de Kimi Code?',
      answer: 'Los créditos de la membresía se reinician al empezar cada ciclo mensual de facturación. Kimi Code tiene además una asignación semanal y un límite de 5 horas. Consulta /usage dentro de Kimi Code para ver los límites y la capacidad restante de tu cuenta.',
    },
    {
      question: '¿Qué modelo usa Kimi Code?',
      answer: 'Kimi K2.7 Code es el predeterminado a 11 de agosto de 2026. Siempre razona y tiene una ventana de contexto de 262.144 tokens. Las peticiones con el razonamiento desactivado pasan a K2.6.',
    },
    {
      question: '¿Cuánto cuesta la API de Kimi K2.7 Code?',
      answer: 'Las tarifas oficiales son 0,19 $ por millón de tokens de entrada en caché, 0,95 $ sin caché y 4 $ por millón de tokens de salida para el modelo kimi-k2.7-code, con un contexto de 262.144 tokens.',
    },
  ],
}

export default guide
