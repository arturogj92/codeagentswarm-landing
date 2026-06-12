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
import enCodexAgentSwarm from './en/codex-agent-swarm'
import enGeminiAgentSwarm from './en/gemini-agent-swarm'
import enAiCliAgentSwarm from './en/ai-cli-agent-swarm'
import enSkillsMarketplace from './en/claude-code-skills-marketplace'
import enTaskManagement from './en/claude-code-task-management'
import enProjectSwitcher from './en/claude-code-project-switcher'
import enAiCommits from './en/ai-commit-messages-claude-code'
import enRunMultipleCodex from './en/run-multiple-codex-sessions'
import enRunMultipleGemini from './en/run-multiple-gemini-sessions'
import enCodexYolo from './en/codex-yolo-mode'
import enAgentTeams from './en/claude-code-agent-teams-vs-codeagentswarm'
import enClaudeGui from './en/claude-code-gui'
import enMultipleChats from './en/run-multiple-claude-chats'
import enClaudeCodeOnWindows from './en/claude-code-on-windows'
import enBestSetupWindows from './en/best-claude-code-setup-windows'

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
import esCodexAgentSwarm from './es/enjambre-de-agentes-codex'
import esGeminiAgentSwarm from './es/enjambre-de-agentes-gemini'
import esAiCliAgentSwarm from './es/enjambre-de-agentes-cli-ia'
import esSkillsMarketplace from './es/marketplace-de-skills-claude-code'
import esTaskManagement from './es/gestion-de-tareas-claude-code'
import esProjectSwitcher from './es/cambio-rapido-de-proyecto-claude-code'
import esAiCommits from './es/mensajes-de-commit-con-ia-claude-code'
import esRunMultipleCodex from './es/ejecutar-multiples-sesiones-codex'
import esRunMultipleGemini from './es/ejecutar-multiples-sesiones-gemini'
import esCodexYolo from './es/modo-yolo-codex'
import esAgentTeams from './es/agent-teams-de-claude-code-vs-codeagentswarm'
import esClaudeGui from './es/interfaz-grafica-claude-code'
import esMultipleChats from './es/varios-chats-de-claude-a-la-vez'
import esClaudeCodeEnWindows from './es/claude-code-en-windows'
import esMejorSetupWindows from './es/mejor-setup-claude-code-windows'

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
    'codex-agent-swarm': enCodexAgentSwarm,
    'gemini-agent-swarm': enGeminiAgentSwarm,
    'ai-cli-agent-swarm': enAiCliAgentSwarm,
    'claude-code-skills-marketplace': enSkillsMarketplace,
    'claude-code-task-management': enTaskManagement,
    'claude-code-project-switcher': enProjectSwitcher,
    'ai-commit-messages-claude-code': enAiCommits,
    'run-multiple-codex-sessions': enRunMultipleCodex,
    'run-multiple-gemini-sessions': enRunMultipleGemini,
    'codex-yolo-mode': enCodexYolo,
    'claude-code-agent-teams-vs-codeagentswarm': enAgentTeams,
    'claude-code-gui': enClaudeGui,
    'run-multiple-claude-chats': enMultipleChats,
    'claude-code-on-windows': enClaudeCodeOnWindows,
    'best-claude-code-setup-windows': enBestSetupWindows,
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
    'enjambre-de-agentes-codex': esCodexAgentSwarm,
    'enjambre-de-agentes-gemini': esGeminiAgentSwarm,
    'enjambre-de-agentes-cli-ia': esAiCliAgentSwarm,
    'marketplace-de-skills-claude-code': esSkillsMarketplace,
    'gestion-de-tareas-claude-code': esTaskManagement,
    'cambio-rapido-de-proyecto-claude-code': esProjectSwitcher,
    'mensajes-de-commit-con-ia-claude-code': esAiCommits,
    'ejecutar-multiples-sesiones-codex': esRunMultipleCodex,
    'ejecutar-multiples-sesiones-gemini': esRunMultipleGemini,
    'modo-yolo-codex': esCodexYolo,
    'agent-teams-de-claude-code-vs-codeagentswarm': esAgentTeams,
    'interfaz-grafica-claude-code': esClaudeGui,
    'varios-chats-de-claude-a-la-vez': esMultipleChats,
    'claude-code-en-windows': esClaudeCodeEnWindows,
    'mejor-setup-claude-code-windows': esMejorSetupWindows,
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
