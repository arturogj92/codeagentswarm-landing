import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-en-windows',
    locale: 'es',
    title: 'Cómo ejecutar Grok Build en Windows',
    metaTitle: 'Grok Build en Windows (xAI): instalación y setup (2026)',
    metaDescription: 'Instala Grok Build en Windows con PowerShell o Git Bash, notas de PATH en %USERPROFILE%\\.grok\\bin, tips WSL y CodeAgentSwarm en Windows.',
    intro: `Grok Build corre en Windows. La vía oficial es el instalador de PowerShell (o bash bajo Git Bash / WSL). Los datos van a <code>%USERPROFILE%\\.grok\\</code> salvo que definas <code>GROK_HOME</code>.

Grok Build es la CLI de código de xAI (<code>grok</code>), no el chat Grok de consumo.`,
    ctaText: 'CodeAgentSwarm soporta Windows 10/11: instala Grok Build, elígelo en el launcher y supervísalo junto al resto de CLIs.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Windows', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-10-31',
    alternateSlug: 'grok-build-on-windows',
  },
  sections: [
    {
      id: 'instalar-win',
      title: 'Instalar en Windows',
      content: [
        { type: 'code', language: 'powershell', code: '# PowerShell\nirm https://x.ai/cli/install.ps1 | iex\ngrok --version' },
        { type: 'paragraph', text: 'El instalador añade <code>%USERPROFILE%\\.grok\\bin</code> al PATH de usuario. Abre un terminal nuevo después. También puedes usar Git Bash con el script curl, o WSL para un entorno tipo Linux. xAI también publica un paquete de WinGet, <code>xAI.GrokBuild</code>. Si instalas por esa vía, actualiza con <code>winget upgrade --id xAI.GrokBuild -e</code> en lugar de <code>grok update</code>, y cuenta con que las versiones nuevas llegan a WinGet unos días después (ver la <a href="https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/01-getting-started.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">guía oficial de primeros pasos</a>).' },
        { type: 'callout', variant: 'tip', content: 'Si no encuentra <code>grok</code>, cierra y abre el terminal, o comprueba que <code>%USERPROFILE%\\.grok\\bin</code> está en el PATH.' },
      ],
    },
    {
      id: 'wsl',
      title: 'WSL vs nativo',
      content: [
        { type: 'paragraph', text: 'WSL instala el binario Linux y usa el home Linux para <code>~/.grok</code>. En nativo la config queda en el perfil de Windows. Elige un home por proyecto para no partir el historial.' },
      ],
    },
    {
      id: 'cas-win',
      title: 'CodeAgentSwarm en Windows',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm en Windows lanza Grok Build si la CLI está en el PATH. Usa el mismo selector de agente que en macOS. Para evitar problemas de rutas con el historial, mantén las rutas de proyecto coherentes (no mezcles rutas de WSL y nativas para el mismo repo).' },
      ],
    },
  ],
  faq: [
    { question: '¿Grok Build soporta Windows?', answer: 'Sí. Usa el instalador de PowerShell, el paquete de WinGet xAI.GrokBuild o Git Bash / WSL con el script bash.' },
    { question: '¿Dónde está la config en Windows?', answer: 'Normalmente %USERPROFILE%\\.grok salvo GROK_HOME.' },
  ],
}

export default guide
