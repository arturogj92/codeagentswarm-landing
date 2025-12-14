// Guide registry - maps slugs to guide content

import type { Guide } from './types'

// English guides
import enMultipleTerminals from './en/how-to-use-multiple-claude-code-terminals'
import enClaudeCodeHistory from './en/claude-code-history'
import enNotifications from './en/codeagentswarm-notifications'
import enRealTimeChanges from './en/view-claude-code-changes-real-time'
import enTurboMode from './en/claude-code-yolo-turbo-mode'

// Spanish guides
import esMultipleTerminals from './es/como-usar-varios-terminales-claude-code'
import esHistorialClaudeCode from './es/historial-claude-code'
import esNotificaciones from './es/notificaciones-codeagentswarm'
import esRealTimeChanges from './es/ver-cambios-claude-code-tiempo-real'
import esTurboMode from './es/claude-code-yolo-turbo-mode'

// Registry of all guides by locale and slug
export const guides: Record<string, Record<string, Guide>> = {
  en: {
    'how-to-use-multiple-claude-code-terminals': enMultipleTerminals,
    'claude-code-history': enClaudeCodeHistory,
    'codeagentswarm-notifications': enNotifications,
    'view-claude-code-changes-real-time': enRealTimeChanges,
    'claude-code-yolo-turbo-mode': enTurboMode,
  },
  es: {
    'como-usar-varios-terminales-claude-code': esMultipleTerminals,
    'historial-claude-code': esHistorialClaudeCode,
    'notificaciones-codeagentswarm': esNotificaciones,
    'ver-cambios-claude-code-tiempo-real': esRealTimeChanges,
    'claude-code-yolo-turbo-mode': esTurboMode,
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
