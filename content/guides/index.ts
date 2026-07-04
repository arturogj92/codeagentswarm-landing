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
import enHowToUseAntigravity from './en/how-to-use-antigravity-cli'
import enRunMultipleAntigravity from './en/run-multiple-antigravity-cli-sessions'
import enAntigravityVsGemini from './en/antigravity-cli-vs-gemini-cli'
import enCodexYolo from './en/codex-yolo-mode'
import enAgentTeams from './en/claude-code-agent-teams-vs-codeagentswarm'
import enClaudeGui from './en/claude-code-gui'
import enMultipleChats from './en/run-multiple-claude-chats'
import enClaudeCodeOnWindows from './en/claude-code-on-windows'
import enBestSetupWindows from './en/best-claude-code-setup-windows'
import enCodexVsCursor from './en/codex-cli-vs-cursor'
import enCodexHistory from './en/codex-cli-conversation-history'
import enCodexWindows from './en/codex-cli-on-windows'
import enOpenCodeAgentSwarm from './en/opencode-agent-swarm'
import enRunMultipleOpenCode from './en/run-multiple-opencode-sessions'
import enOpenCodeVsCursor from './en/opencode-vs-cursor'
import enOpenCodeWindows from './en/opencode-on-windows'
import enOpenCodeYolo from './en/opencode-yolo-mode'
import enOpenCodeHistory from './en/opencode-conversation-history'
import enShareSkills from './en/share-skills-between-claude-code-codex-antigravity'
import enGitWorktrees from './en/git-worktrees-for-ai-coding-agents'
import enGitWorktreeVsBranch from './en/git-worktree-vs-branch-parallel-ai-agents'

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
import esComoUsarAntigravity from './es/como-usar-antigravity-cli'
import esEjecutarMultiplesAntigravity from './es/ejecutar-multiples-sesiones-antigravity-cli'
import esAntigravityVsGemini from './es/antigravity-cli-vs-gemini-cli'
import esCodexYolo from './es/modo-yolo-codex'
import esAgentTeams from './es/agent-teams-de-claude-code-vs-codeagentswarm'
import esClaudeGui from './es/interfaz-grafica-claude-code'
import esMultipleChats from './es/varios-chats-de-claude-a-la-vez'
import esClaudeCodeEnWindows from './es/claude-code-en-windows'
import esMejorSetupWindows from './es/mejor-setup-claude-code-windows'
import esCodexVsCursor from './es/codex-cli-vs-cursor'
import esCodexHistory from './es/historial-conversaciones-codex'
import esCodexWindows from './es/codex-cli-en-windows'
import esOpenCodeAgentSwarm from './es/enjambre-de-agentes-opencode'
import esRunMultipleOpenCode from './es/ejecutar-multiples-sesiones-opencode'
import esOpenCodeVsCursor from './es/opencode-vs-cursor'
import esOpenCodeWindows from './es/opencode-en-windows'
import esOpenCodeYolo from './es/modo-yolo-opencode'
import esOpenCodeHistory from './es/historial-conversaciones-opencode'
import esShareSkills from './es/compartir-skills-entre-claude-code-codex-antigravity'
import esGitWorktrees from './es/git-worktrees-para-agentes-de-ia'
import esGitWorktreeVsBranch from './es/git-worktree-vs-rama-agentes-ia-en-paralelo'

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
    'how-to-use-antigravity-cli': enHowToUseAntigravity,
    'run-multiple-antigravity-cli-sessions': enRunMultipleAntigravity,
    'antigravity-cli-vs-gemini-cli': enAntigravityVsGemini,
    'codex-yolo-mode': enCodexYolo,
    'claude-code-agent-teams-vs-codeagentswarm': enAgentTeams,
    'claude-code-gui': enClaudeGui,
    'run-multiple-claude-chats': enMultipleChats,
    'claude-code-on-windows': enClaudeCodeOnWindows,
    'best-claude-code-setup-windows': enBestSetupWindows,
    'codex-cli-vs-cursor': enCodexVsCursor,
    'codex-cli-conversation-history': enCodexHistory,
    'codex-cli-on-windows': enCodexWindows,
    'opencode-agent-swarm': enOpenCodeAgentSwarm,
    'run-multiple-opencode-sessions': enRunMultipleOpenCode,
    'opencode-vs-cursor': enOpenCodeVsCursor,
    'opencode-on-windows': enOpenCodeWindows,
    'opencode-yolo-mode': enOpenCodeYolo,
    'opencode-conversation-history': enOpenCodeHistory,
    'share-skills-between-claude-code-codex-antigravity': enShareSkills,
    'git-worktrees-for-ai-coding-agents': enGitWorktrees,
    'git-worktree-vs-branch-parallel-ai-agents': enGitWorktreeVsBranch,
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
    'como-usar-antigravity-cli': esComoUsarAntigravity,
    'ejecutar-multiples-sesiones-antigravity-cli': esEjecutarMultiplesAntigravity,
    'antigravity-cli-vs-gemini-cli': esAntigravityVsGemini,
    'modo-yolo-codex': esCodexYolo,
    'agent-teams-de-claude-code-vs-codeagentswarm': esAgentTeams,
    'interfaz-grafica-claude-code': esClaudeGui,
    'varios-chats-de-claude-a-la-vez': esMultipleChats,
    'claude-code-en-windows': esClaudeCodeEnWindows,
    'mejor-setup-claude-code-windows': esMejorSetupWindows,
    'codex-cli-vs-cursor': esCodexVsCursor,
    'historial-conversaciones-codex': esCodexHistory,
    'codex-cli-en-windows': esCodexWindows,
    'enjambre-de-agentes-opencode': esOpenCodeAgentSwarm,
    'ejecutar-multiples-sesiones-opencode': esRunMultipleOpenCode,
    'opencode-vs-cursor': esOpenCodeVsCursor,
    'opencode-en-windows': esOpenCodeWindows,
    'modo-yolo-opencode': esOpenCodeYolo,
    'historial-conversaciones-opencode': esOpenCodeHistory,
    'compartir-skills-entre-claude-code-codex-antigravity': esShareSkills,
    'git-worktrees-para-agentes-de-ia': esGitWorktrees,
    'git-worktree-vs-rama-agentes-ia-en-paralelo': esGitWorktreeVsBranch,
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
