import type { DemoProject } from './types'

/**
 * The projects the simulated session is spread across.
 *
 * These are Arturo's own projects and their own icon files, lifted from
 * ~/.codeagentswarm/project-icons. Invented projects with generated marks read
 * as stock art the moment you put them next to the real thing, which is the one
 * thing this demo cannot afford. Excluded on purpose: arturo-management (asked
 * for), plus anything belonging to a client or left over from testing.
 *
 * One definition, used by the row badges, the header's shortcut chips AND the
 * launcher, because in the app they are the same project seen from three places.
 *
 * The icon is an image file, never an emoji: the app paints a project mark as a
 * rounded square with no colour disc behind it. `color` survives only as the
 * tab's accent.
 */
export const PROJECTS = {
  swarm: {
    name: 'codeagentswarm',
    color: '#8b5cf6',
    icon: '/demo/projects/codeagentswarm.png',
    path: '~/Development/art0xdev/codeagentswarm',
    lastUsed: '11m',
  },
  memois: {
    name: 'memois',
    color: '#10b981',
    icon: '/demo/projects/memois.png',
    path: '~/Development/memois',
    lastUsed: '2h',
  },
  diskito: {
    name: 'diskito',
    color: '#06b6d4',
    icon: '/demo/projects/diskito.png',
    path: '~/Development/diskito-dl/DISKITO',
    lastUsed: '5h',
  },
  megakill: {
    name: 'MEGAKILL',
    color: '#ef4444',
    icon: '/demo/projects/megakill.png',
    path: '~/Development/MEGAKILL',
    lastUsed: '1 day',
  },
  ghosty: {
    name: 'ghosty',
    color: '#a78bfa',
    icon: '/demo/projects/ghosty.png',
    path: '~/Development/ghosty',
    lastUsed: '3 days',
  },
  bones: {
    name: 'bones',
    color: '#f97316',
    icon: '/demo/projects/bones.png',
    path: '~/Development/bones',
    lastUsed: '6 days',
  },
} satisfies Record<string, DemoProject>

export const PROJECT_LIST = Object.values(PROJECTS)
