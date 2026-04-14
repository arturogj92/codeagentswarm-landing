// Guide registry - maps slugs to guide content

import type { Guide } from './types'

// English guides
import enMultipleTerminals from './en/how-to-use-multiple-claude-code-terminals'
import enClaudeCodeHistory from './en/claude-code-history'
import enNotifications from './en/codeagentswarm-notifications'
import enRealTimeChanges from './en/view-claude-code-changes-real-time'
import enTurboMode from './en/claude-code-yolo-turbo-mode'
import enHistoryCompleteGuide from './en/claude-code-history-complete-guide'
import enRunMultipleSessions from './en/run-multiple-claude-code-sessions'
import enTipsAndTricks from './en/claude-code-tips-and-tricks'
import enYoloModeExplained from './en/claude-code-yolo-mode-explained'
import enClaudeCodeVsCursorVsCodex from './en/claude-code-vs-cursor-vs-codex'
import enBestMcpServers from './en/best-mcp-servers-claude-code'

// Spanish guides
import esMultipleTerminals from './es/como-usar-varios-terminales-claude-code'
import esHistorialClaudeCode from './es/historial-claude-code'
import esNotificaciones from './es/notificaciones-codeagentswarm'
import esRealTimeChanges from './es/ver-cambios-claude-code-tiempo-real'
import esTurboMode from './es/claude-code-yolo-turbo-mode'
import esHistorialCompleteGuide from './es/guia-completa-historial-claude-code'
import esRunMultipleSessions from './es/ejecutar-multiples-sesiones-claude-code'
import esTipsAndTricks from './es/trucos-y-consejos-claude-code'
import esYoloModeExplained from './es/modo-yolo-claude-code-explicado'
import esClaudeCodeVsCursorVsCodex from './es/claude-code-vs-cursor-vs-codex'
import esBestMcpServers from './es/mejores-servidores-mcp-claude-code'

// Registry of all guides by locale and slug
export const guides: Record<string, Record<string, Guide>> = {
  en: {
    'how-to-use-multiple-claude-code-terminals': enMultipleTerminals,
    'claude-code-history': enClaudeCodeHistory,
    'codeagentswarm-notifications': enNotifications,
    'view-claude-code-changes-real-time': enRealTimeChanges,
    'claude-code-yolo-turbo-mode': enTurboMode,
    'claude-code-history-complete-guide': enHistoryCompleteGuide,
    'run-multiple-claude-code-sessions': enRunMultipleSessions,
    'claude-code-tips-and-tricks': enTipsAndTricks,
    'claude-code-yolo-mode-explained': enYoloModeExplained,
    'claude-code-vs-cursor-vs-codex': enClaudeCodeVsCursorVsCodex,
    'best-mcp-servers-claude-code': enBestMcpServers,
  },
  es: {
    'como-usar-varios-terminales-claude-code': esMultipleTerminals,
    'historial-claude-code': esHistorialClaudeCode,
    'notificaciones-codeagentswarm': esNotificaciones,
    'ver-cambios-claude-code-tiempo-real': esRealTimeChanges,
    'claude-code-yolo-turbo-mode': esTurboMode,
    'guia-completa-historial-claude-code': esHistorialCompleteGuide,
    'ejecutar-multiples-sesiones-claude-code': esRunMultipleSessions,
    'trucos-y-consejos-claude-code': esTipsAndTricks,
    'modo-yolo-claude-code-explicado': esYoloModeExplained,
    'claude-code-vs-cursor-vs-codex': esClaudeCodeVsCursorVsCodex,
    'mejores-servidores-mcp-claude-code': esBestMcpServers,
  },
}

// Get a guide by locale and slug
export function getGuide(locale: string, slug: string): Guide | null {
  return guides[locale]?.[slug] ?? null
}

// Get all guide slugs for a locale (for static generation)
export function getGuideSlugs(locale: string): string[] {
  return Object.keys(guides[locale] ?? {})
}

// Get all guides for a locale
export function getAllGuides(locale: string): Guide[] {
  return Object.values(guides[locale] ?? {})
}

// Check if a slug exists for a locale
export function guideExists(locale: string, slug: string): boolean {
  return !!guides[locale]?.[slug]
}

export { extractTOC } from './types'
export type { Guide, GuideMeta, GuideSection, ContentBlock, FAQItem } from './types'
