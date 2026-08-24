import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'varias-cuentas-claude-code-codex',
    locale: 'es',
    title: 'Cómo usar varias cuentas de Claude Code y Codex',
    metaTitle: 'Varias cuentas de Claude Code y Codex en un ordenador (2026)',
    metaDescription: 'Usa varias cuentas de Claude Code y Codex en un ordenador sin cerrar sesión. Aísla credenciales, conserva el historial y consulta la cuota por cuenta.',
    intro: `Puedes usar varias cuentas de Claude Code y varias cuentas de Codex en el mismo ordenador sin cerrar la sesión de una cada vez que necesitas otra. CodeAgentSwarm crea un perfil de credenciales aislado para cada cuenta gestionada y mantiene disponible tu Current CLI profile.

Aquí conviene separar dos conceptos. Una cuenta es la identidad de Claude u OpenAI que tiene la suscripción y la cuota. Una sesión es una conversación o un agente en ejecución. Puedes abrir varias sesiones con una sola cuenta o vincular conversaciones distintas a cuentas distintas.

Esta guía explica cómo añadir cuentas de Claude Code y Codex, elegir la predeterminada para conversaciones nuevas, cambiar la cuenta de un Chat inactivo sin perder su historial nativo y consultar la cuota de la cuenta que está trabajando.`,
    ctaText: 'Mantén iniciadas tus cuentas personales y de trabajo de Claude Code o Codex, y elige la adecuada para cada conversación.',
    ctaAgent: 'multi',
    highlightedWords: ['varias cuentas', 'Claude Code', 'Codex'],
    publishedAt: '2026-08-24',
    updatedAt: '2026-08-24',
    alternateSlug: 'multiple-claude-code-accounts',
  },
  sections: [
    {
      id: 'cuentas-vs-sesiones',
      title: 'Varias cuentas no es lo mismo que varias sesiones',
      content: [
        {
          type: 'paragraph',
          text: 'Ejecutar tres sesiones de Claude Code no significa que estés usando tres cuentas de Claude. Son tres procesos consumiendo la cuota de la cuenta que comparten. Varias cuentas resuelven otro problema: mantener iniciadas a la vez identidades personales, de trabajo o con suscripciones distintas.',
        },
        {
          type: 'paragraph',
          text: 'Si buscas trabajar en paralelo con un solo login, consulta la guía para <a href="/es/guias/ejecutar-multiples-sesiones-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">ejecutar varias sesiones de Claude Code</a> o la de <a href="/es/guias/ejecutar-multiples-sesiones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">varias sesiones de Codex</a>. También puedes combinar ambas ideas, por ejemplo con dos conversaciones de trabajo en una cuenta y una conversación personal en otra.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: '<strong>Cuenta</strong> significa identidad y cuota. <strong>Sesión</strong> significa conversación y proceso en ejecución. Puedes usar cada función por separado o combinar ambas.',
        },
      ],
    },
    {
      id: 'anadir-cuenta',
      title: 'Cómo añadir una cuenta de Claude Code o Codex',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm usa el inicio de sesión normal de cada proveedor. Pon a cada cuenta un nombre local para reconocerla en las conversaciones y en las vistas de cuota.',
        },
        {
          type: 'image',
          src: '/images/guides/provider-accounts-multilogin.webp',
          alt: 'Gestión de varias cuentas de Claude Code en Settings, Providers, con los perfiles Personal y Work',
          caption: 'La cuenta Default se usa en conversaciones nuevas. Los Chats ya abiertos conservan la cuenta que tienen vinculada.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            'Abre <strong>Settings</strong> y entra en <strong>Providers</strong>.',
            'Despliega <strong>Claude Code</strong> o <strong>Codex</strong>.',
            'Pulsa <strong>Add account</strong> y ponle un nombre reconocible, como Trabajo o Personal.',
            'Completa el inicio de sesión del proveedor en el navegador.',
            'Pulsa <strong>Make default</strong> si quieres que las conversaciones nuevas usen esa cuenta automáticamente.',
            'Repite el proceso con cada cuenta que quieras mantener disponible.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: '<strong>Current CLI profile</strong> no se sustituye. Sigue disponible junto a las cuentas gestionadas.',
        },
      ],
    },
    {
      id: 'aislamiento-credenciales',
      title: 'Cómo separa CodeAgentSwarm los inicios de sesión',
      content: [
        {
          type: 'paragraph',
          text: 'Cada cuenta gestionada de Claude Code o Codex tiene su propio directorio de credenciales de la CLI. CodeAgentSwarm inicia el proveedor con el directorio vinculado a la conversación, así que un login no sobrescribe otro. Los tokens permanecen en esos perfiles aislados de la CLI y no se copian a los ajustes de CodeAgentSwarm.',
        },
        {
          type: 'paragraph',
          text: 'Claude Code usa su separación compatible por directorio de configuración y Codex usa su separación compatible por directorio principal. El directorio seleccionado pertenece al proceso del proveedor, no a toda la aplicación, por lo que dos conversaciones pueden usar cuentas distintas a la vez.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Conecta solo cuentas tuyas o que tengas autorización para utilizar. Las condiciones de suscripción y los límites de uso de cada proveedor siguen aplicándose.',
        },
      ],
    },
    {
      id: 'elegir-y-cambiar',
      title: 'Elige una cuenta para conversaciones nuevas y existentes',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'predeterminada-conversaciones-nuevas',
          text: 'Define la cuenta predeterminada para conversaciones nuevas',
        },
        {
          type: 'paragraph',
          text: 'Las conversaciones nuevas usan la cuenta marcada como <strong>Default</strong>. Cuando el proveedor crea el id nativo de la conversación, CodeAgentSwarm vincula esa cuenta a la conversación. Al volver a abrirla se usa la misma cuenta, no la que resulte ser predeterminada en ese momento.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'cambiar-cuenta-conversacion',
          text: 'Cambia la cuenta de un Chat existente',
        },
        {
          type: 'paragraph',
          text: 'Espera a que termine la respuesta actual. Abre el selector de cuenta del indicador de cuota y elige otra cuenta, o pulsa <strong>Cmd+P</strong> y ejecuta <strong>Switch current conversation to &lt;nombre&gt;</strong>. CodeAgentSwarm detiene el proceso inactivo del proveedor y retoma el mismo id nativo con la cuenta elegida.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm reinicia el proceso inactivo con el id nativo original y el historial compartido. Codex ya ha superado una prueba real entre cuentas. Claude usa el mismo mecanismo, pero aún necesita la misma prueba con dos cuentas distintas.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'No puedes cambiar de cuenta mientras el proveedor está respondiendo. Espera a que termine el turno para retomar la conversación con seguridad sobre el mismo id.',
        },
      ],
    },
    {
      id: 'historial-y-cuota',
      title: 'El historial nativo sigue a la conversación; la cuota, a la cuenta',
      content: [
        {
          type: 'paragraph',
          text: 'Los perfiles gestionados aíslan las credenciales y conservan el historial nativo del proveedor. La reanudación por id exacto mantiene la transcripción real de Claude Code o el thread de Codex, en lugar de reconstruirlo desde texto exportado. Puedes ampliar esta parte en la <a href="/es/guias/guia-completa-historial-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Claude Code</a> y en la <a href="/es/guias/historial-conversaciones-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">guía del historial de Codex</a>.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm también separa la cuota por proveedor y cuenta. Claude Trabajo, Claude Personal y Codex Trabajo no se mezclan en una sola lectura. Las guías de <a href="/es/guias/planes-y-precios-de-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">planes de Claude Code</a> y <a href="/es/guias/planes-y-precios-de-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">planes de Codex</a> explican qué significan los límites de cada proveedor.',
        },
      ],
    },
    {
      id: 'proveedores-compatibles',
      title: '¿Qué proveedores admiten cuentas gestionadas?',
      content: [
        {
          type: 'paragraph',
          text: 'Las cuentas gestionadas funcionan actualmente con Claude Code y Codex. Los demás proveedores siguen usando el login actual de la máquina dentro de CodeAgentSwarm.',
        },
        {
          type: 'table',
          headers: ['Proveedor', 'Cuentas gestionadas', 'Comportamiento actual'],
          rows: [
            ['Claude Code', 'Sí', 'Añadir, nombrar, elegir predeterminada y cambiar Chats inactivos'],
            ['Codex', 'Sí', 'Añadir, nombrar, elegir predeterminada y cambiar Chats inactivos'],
            ['Grok, Kimi Code y OpenCode', 'Todavía no', 'Usa Current CLI profile'],
            ['Cursor y Antigravity', 'Todavía no', 'Usa Current CLI profile'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Settings no muestra <strong>Add account</strong> para un proveedor limitado al perfil actual. Su login existente de la CLI sigue funcionando con normalidad.',
        },
      ],
    },
  ],
  faq: [
    {
      question: '¿Puedo usar varias cuentas de Claude Code en un ordenador?',
      answer: 'Sí. Añade cada login de Claude Code en Settings, Providers. CodeAgentSwarm asigna a cada cuenta gestionada un perfil de credenciales aislado y mantiene disponible tu Current CLI profile.',
    },
    {
      question: '¿Cómo cambio de cuenta de Claude Code sin cerrar sesión?',
      answer: 'Añade primero las dos cuentas. En un Chat inactivo, elige la cuenta desde el selector de cuota o usa Cmd+P y selecciona “Switch current conversation to <nombre>”.',
    },
    {
      question: '¿Cambiar de cuenta inicia una conversación nueva?',
      answer: 'CodeAgentSwarm reinicia el proveedor con el id nativo original y el historial compartido en lugar de crear otra conversación. Codex ya ha superado una prueba real entre cuentas; Claude aún necesita la misma prueba con dos cuentas distintas.',
    },
    {
      question: '¿Puedo usar varias cuentas de Codex a la vez?',
      answer: 'Sí. Añade cuentas gestionadas de Codex, elige una predeterminada para conversaciones nuevas y vincula conversaciones distintas a cuentas distintas.',
    },
    {
      question: '¿Se mezclan las cuotas de varias cuentas?',
      answer: 'No. CodeAgentSwarm separa las lecturas de cuota por proveedor y cuenta, de acuerdo con la cuenta vinculada a cada conversación.',
    },
    {
      question: '¿Funciona con Grok, Kimi Code, OpenCode, Cursor o Antigravity?',
      answer: 'Todavía no como cuentas gestionadas. Esos proveedores siguen limitados al perfil actual. La versión actual admite Claude Code y Codex.',
    },
  ],
}

export default guide
