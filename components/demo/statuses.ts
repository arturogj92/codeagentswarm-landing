import type { StatusDef, StatusKey } from './types'

/**
 * The work-phase catalogue, mirroring the app's terminal_statuses table.
 * `order` is attention-first: whatever is blocked on a human floats to the top,
 * finished work sinks. That single rule is most of why the list reads at a glance.
 */
export const STATUSES: Record<StatusKey, StatusDef> = {
  needs_input: { key: 'needs_input', label: 'Needs input', color: '#f97316', icon: 'message-circle-question', order: 1 },
  needs_testing: { key: 'needs_testing', label: 'Needs testing', color: '#3b82f6', icon: 'flask-conical', order: 2 },
  working: { key: 'working', label: 'Working', color: '#fbbf24', icon: 'hammer', order: 3 },
  pushed: { key: 'pushed', label: 'Pushed', color: '#38bdf8', icon: 'git-branch', order: 4 },
  idle: { key: 'idle', label: 'Idle', color: '#6b7280', icon: 'circle-dashed', order: 5 },
}

export const statusOrder = (key: StatusKey) => STATUSES[key]?.order ?? 99
